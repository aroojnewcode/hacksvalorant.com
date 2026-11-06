import { SLUG_REDIRECTS } from './slug-redirects.mjs';

export const CANONICAL_ORIGIN = 'https://hacksvalorant.com';

/** Static 301 sources → final path (trailing slash on targets). */
const REDIRECT_ENTRIES = [
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/valorant-cheats/'],
  ['/cheats/', '/products/valorant-cheats/'],
  ['/cheats/lite', '/products/valorant-cheats/lite/'],
  ['/cheats/lite/', '/products/valorant-cheats/lite/'],
  ['/cheats/pro', '/products/valorant-cheats/pro/'],
  ['/cheats/pro/', '/products/valorant-cheats/pro/'],
  ['/cheats/elite', '/products/valorant-cheats/elite/'],
  ['/cheats/elite/', '/products/valorant-cheats/elite/'],
  ['/cheats/compare', '/blog/valorant-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/valorant-lite-vs-pro/'],
  ['/hacks', '/products/valorant-cheats/'],
  ['/hacks/', '/products/valorant-cheats/'],
  ['/hacks/lite', '/products/valorant-cheats/lite/'],
  ['/hacks/lite/', '/products/valorant-cheats/lite/'],
  ['/hacks/pro', '/products/valorant-cheats/pro/'],
  ['/hacks/pro/', '/products/valorant-cheats/pro/'],
  ['/hacks/elite', '/products/valorant-cheats/elite/'],
  ['/hacks/elite/', '/products/valorant-cheats/elite/'],
  ['/hacks/compare', '/blog/valorant-lite-vs-pro/'],
  ['/hacks/compare/', '/blog/valorant-lite-vs-pro/'],
  ['/products/valorant-cheats/utilities', '/products/valorant-cheats/utilities/'],
  ['/products/r6-cheats', '/products/valorant-cheats/'],
  ['/products/r6-cheats/', '/products/valorant-cheats/'],
  ['/products/r6-cheats/lite', '/products/valorant-cheats/lite/'],
  ['/products/r6-cheats/lite/', '/products/valorant-cheats/lite/'],
  ['/products/r6-cheats/pro', '/products/valorant-cheats/pro/'],
  ['/products/r6-cheats/pro/', '/products/valorant-cheats/pro/'],
  ['/products/r6-cheats/elite', '/products/valorant-cheats/elite/'],
  ['/products/r6-cheats/elite/', '/products/valorant-cheats/elite/'],
  ['/products/r6-cheats/hwid-spoofer', '/products/valorant-cheats/hwid-spoofer/'],
  ['/products/r6-cheats/hwid-spoofer/', '/products/valorant-cheats/hwid-spoofer/'],
  ['/products/r6-cheats/ugc', '/products/valorant-cheats/ugc/'],
  ['/products/r6-cheats/ugc/', '/products/valorant-cheats/ugc/'],
  ['/products/r6-cheats/unlock-all', '/products/valorant-cheats/unlock-all/'],
  ['/products/r6-cheats/unlock-all/', '/products/valorant-cheats/unlock-all/'],
  ['/products/r6-cheats/utilities', '/products/valorant-cheats/utilities/'],
  ['/products/r6-cheats/utilities/', '/products/valorant-cheats/utilities/'],
  ['/products/r6-hacks', '/products/valorant-cheats/'],
  ['/products/valorant-hacks/', '/products/valorant-cheats/'],
  ['/products/valorant-hacks/pro', '/products/valorant-cheats/pro/'],
  ['/products/valorant-hacks/pro/', '/products/valorant-cheats/pro/'],
  ['/products/valorant-hacks/lite', '/products/valorant-cheats/lite/'],
  ['/products/valorant-hacks/lite/', '/products/valorant-cheats/lite/'],
  ['/products/valorant-hacks/elite', '/products/valorant-cheats/elite/'],
  ['/products/valorant-hacks/elite/', '/products/valorant-cheats/elite/'],
  ['/products/valorant-cheats/account-recovery', '/products/valorant-cheats/ugc/'],
  ['/products/valorant-cheats/account-recovery/', '/products/valorant-cheats/ugc/'],
  ['/products/dota-2-hacks', '/products/valorant-cheats/'],
  ['/products/dota-2-hacks/', '/products/valorant-cheats/'],
  ['/products/dota-2-hacks/elite', '/products/valorant-cheats/elite/'],
  ['/products/dota-2-hacks/elite/', '/products/valorant-cheats/elite/'],
  ['/products/dota-2-hacks/utilities', '/products/valorant-cheats/utilities/'],
  ['/products/dota-2-hacks/utilities/', '/products/valorant-cheats/utilities/'],
  ...Object.entries(SLUG_REDIRECTS),
];

export const REDIRECT_301 = new Map(REDIRECT_ENTRIES);

export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return '/';
  if (TRAILING_SLASH_SKIP.test(pathname)) return pathname;
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

/** Follow 301 map to the final pathname (or null if no redirect). */
export function resolve301Redirect(pathname) {
  const start = pathname;
  let target = REDIRECT_301.get(pathname) ?? REDIRECT_301.get(normalizePathname(pathname));
  if (!target || target === start) return null;

  let hops = 0;
  while (hops < 12) {
    const next = REDIRECT_301.get(target);
    if (!next || next === target) break;
    target = next;
    hops += 1;
  }
  return target;
}

/** Trailing-slash normalization or 301 target (Node static server). */
export function resolvePathRedirect(pathname) {
  const direct = resolve301Redirect(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}

function isCanonicalProductionHost(host) {
  const h = host.toLowerCase();
  return h === 'hacksvalorant.com' || h === 'www.hacksvalorant.com';
}

/** @param {Headers} headers */
function requestUsedHttp(headers) {
  const forwarded = (headers.get('x-forwarded-proto') ?? '').split(',')[0].trim().toLowerCase();
  if (forwarded === 'http') return true;

  const cfVisitor = headers.get('cf-visitor');
  if (cfVisitor) {
    try {
      const parsed = JSON.parse(cfVisitor);
      if (parsed?.scheme === 'http') return true;
    } catch {
      /* ignore malformed header */
    }
  }

  return false;
}

/** Apply HTTPS, apex host, and path 301 map in one hop (SEO audit friendly). */
export function resolveCanonicalRedirect(request) {
  const url = new URL(request.url);
  const target = new URL(url.href);
  let changed = false;

  const host = target.hostname.toLowerCase();
  const production = isCanonicalProductionHost(host);
  const needsHttps =
    target.protocol === 'http:' || requestUsedHttp(request.headers);
  const needsApex = host === 'www.hacksvalorant.com';

  if (production && (needsHttps || needsApex)) {
    target.protocol = 'https:';
    target.hostname = 'hacksvalorant.com';
    changed = true;
  } else if (needsHttps) {
    target.protocol = 'https:';
    changed = true;
  }

  const pathTarget = resolve301Redirect(target.pathname);
  if (pathTarget) {
    target.pathname = pathTarget;
    target.search = url.search;
    if (production) {
      target.protocol = 'https:';
      target.hostname = 'hacksvalorant.com';
    }
    changed = true;
  }

  if (!changed) return null;
  return target.toString();
}

/** @deprecated Use resolveCanonicalRedirect */
export function canonicalRequestRedirectUrl(request) {
  return resolveCanonicalRedirect(request);
}
