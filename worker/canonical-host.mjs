import {
  CANONICAL_ORIGIN,
  resolveCanonicalRedirect,
} from '../src/config/redirect-map.mjs';

const HSTS_VALUE = 'max-age=31536000; includeSubDomains; preload';

function withSecurityHeaders(headers, url) {
  const host = url.hostname.toLowerCase();
  if (url.protocol === 'https:' && (host === 'hacksvalorant.com' || host.endsWith('.workers.dev'))) {
    headers.set('strict-transport-security', HSTS_VALUE);
  }
  return headers;
}

function trailingSlashPath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

/** Production uses hacksvalorant.com; Workers preview uses self-origin so audits match the crawl host. */
function seoOrigin(url) {
  const host = url.hostname.toLowerCase();
  if (host === 'hacksvalorant.com' || host === 'www.hacksvalorant.com') return CANONICAL_ORIGIN;
  if (host.endsWith('.workers.dev')) return url.origin;
  return CANONICAL_ORIGIN;
}

function originBase(url) {
  return seoOrigin(url).replace(/\/$/, '');
}

/** robots.txt: relative Sitemap lines → absolute on the request host (audit crawlers). */
function rewriteRobotsTxt(text, url) {
  const base = originBase(url);
  return text
    .replace(/^Sitemap:\s+\/(\S+)/gm, (_line, path) => `Sitemap: ${base}/${path}`)
    .replace(/# RSS: https:\/\/(?:r6hacks\.org|hacksvalorant\.com)\/rss\.xml/, `# RSS: ${base}/rss.xml`);
}

/** Sitemap index/urlset: on Workers preview, child <loc> must match the crawl host. */
function rewriteSitemapXml(text, url) {
  const base = originBase(url);
  if (base === CANONICAL_ORIGIN.replace(/\/$/, '')) return text;
  return text.replace(/https:\/\/(?:r6hacks\.org|hacksvalorant\.com)/g, base);
}

function rewriteHtmlSeoUrls(html, url) {
  const canonical = `${seoOrigin(url)}${trailingSlashPath(url.pathname)}`;
  return html
    .replace(/<link rel="canonical" href="[^"]*"/g, `<link rel="canonical" href="${canonical}"`)
    .replace(
      /<link rel="alternate" hreflang="(en|en-US|x-default)" href="[^"]*"/g,
      (_match, lang) => `<link rel="alternate" hreflang="${lang}" href="${canonical}"`,
    )
    .replace(/<meta property="og:url" content="[^"]*"/g, `<meta property="og:url" content="${canonical}"`);
}

function isSitemapOrFeedPath(pathname) {
  return pathname === '/rss.xml' || /^\/sitemap(-[\w-]+)?\.xml$/i.test(pathname);
}

function hasFileExtension(pathname) {
  return /\.[a-z0-9]+$/i.test(pathname);
}

function indexHtmlCandidates(pathname) {
  if (hasFileExtension(pathname)) return [];
  if (!pathname || pathname === '/') return ['/index.html'];
  if (pathname.endsWith('/')) return [`${pathname}index.html`];
  return [`${pathname}/index.html`, `${pathname}.html`];
}

async function fetchAsset(request, env) {
  let response = await env.ASSETS.fetch(request);
  if (response.status === 200) return response;

  const { pathname } = new URL(request.url);
  for (const candidate of indexHtmlCandidates(pathname)) {
    const indexUrl = new URL(request.url);
    indexUrl.pathname = candidate;
    const indexResponse = await env.ASSETS.fetch(new Request(indexUrl, request));
    if (indexResponse.status === 200) return indexResponse;
  }
  return response;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const redirectTarget = resolveCanonicalRedirect(request);
    if (redirectTarget) {
      return Response.redirect(redirectTarget, 301);
    }

    const response = await fetchAsset(request, env);

    if (url.pathname === '/robots.txt' && response.status === 200) {
      const text = await response.text();
      const body = rewriteRobotsTxt(text, url);
      const headers = new Headers(response.headers);
      headers.set('content-type', 'text/plain; charset=utf-8');
      headers.delete('content-length');
      withSecurityHeaders(headers, url);
      return new Response(body, { status: 200, headers });
    }

    if (isSitemapOrFeedPath(url.pathname)) {
      const headers = new Headers(response.headers);
      const isXml = url.pathname.endsWith('.xml');
      if (response.status === 200) {
        const raw = await response.text();
        const body =
          isXml && url.pathname.includes('sitemap') ? rewriteSitemapXml(raw, url) : raw;
        headers.set(
          'content-type',
          isXml ? 'application/xml; charset=utf-8' : 'application/rss+xml; charset=utf-8',
        );
        headers.delete('content-length');
        withSecurityHeaders(headers, url);
        return new Response(body, { status: 200, headers });
      }
      withSecurityHeaders(headers, url);
      return new Response(response.body, { status: response.status, headers });
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (response.status !== 200 || !contentType.includes('text/html')) {
      const headers = new Headers(response.headers);
      withSecurityHeaders(headers, url);
      return new Response(response.body, { status: response.status, headers });
    }

    const html = await response.text();
    let body = rewriteHtmlSeoUrls(html, url);
    const base = originBase(url);
    if (base !== CANONICAL_ORIGIN.replace(/\/$/, '')) {
      body = body.replace(/https:\/\/(?:r6hacks\.org|hacksvalorant\.com)/g, base);
    }
    const headers = new Headers(response.headers);
    headers.delete('content-length');
    withSecurityHeaders(headers, url);
    return new Response(body, { status: response.status, headers });
  },
};
