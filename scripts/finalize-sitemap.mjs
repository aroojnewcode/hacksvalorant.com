import fs from 'node:fs';
import path from 'node:path';
import { resolve301Redirect } from '../src/config/redirect-map.mjs';
import { resolveDistDir } from './dist-dir.mjs';

const SITE = 'https://hacksvalorant.com';
const dist = resolveDistDir();
const publicDir = path.join(process.cwd(), 'public');

function writeSeoAsset(relativeName, contents) {
  fs.writeFileSync(path.join(dist, relativeName), contents, 'utf8');
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, relativeName), contents, 'utf8');
}

function loadUrlsetXml(dir) {
  const zero = path.join(dir, 'sitemap-0.xml');
  if (fs.existsSync(zero)) return fs.readFileSync(zero, 'utf8');

  const single = path.join(dir, 'sitemap.xml');
  if (fs.existsSync(single)) {
    const xml = fs.readFileSync(single, 'utf8');
    if (xml.includes('<urlset')) return xml;
  }

  const indexPath = path.join(dir, 'sitemap-index.xml');
  if (fs.existsSync(indexPath)) {
    const indexXml = fs.readFileSync(indexPath, 'utf8');
    for (const match of indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const file = path.basename(new URL(match[1]).pathname);
      const child = path.join(dir, file);
      if (fs.existsSync(child)) {
        const childXml = fs.readFileSync(child, 'utf8');
        if (childXml.includes('<urlset')) return childXml;
      }
    }
  }

  return null;
}

const raw = loadUrlsetXml(dist);
if (!raw) {
  console.error(
    `finalize-sitemap: no urlset sitemap in ${dist} — run astro build first.`,
  );
  process.exit(1);
}

/** @typedef {{ loc: string, lastmod?: string, changefreq?: string, priority?: string }} SitemapUrl */

/** @returns {SitemapUrl[]} */
function parseUrls(xml) {
  const urls = [];
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  for (const block of blocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    if (!loc) continue;
    urls.push({
      loc,
      lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim(),
      changefreq: block.match(/<changefreq>([^<]+)<\/changefreq>/)?.[1]?.trim(),
      priority: block.match(/<priority>([^<]+)<\/priority>/)?.[1]?.trim(),
    });
  }
  return urls;
}

/** Normalize for GSC: https origin, trailing slash, drop junk. */
function normalizeUrl(loc) {
  let url;
  try {
    url = new URL(loc);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:') url.protocol = 'https:';
  url.hostname = 'hacksvalorant.com';
  url.hash = '';
  url.search = '';
  let pathname = url.pathname;
  if (!pathname.endsWith('/')) pathname += '/';
  if (pathname.includes('/404') || pathname.startsWith('/go/')) return null;
  if (pathname.startsWith('/forum/') && pathname !== '/forum/') return null;
  if (resolve301Redirect(pathname)) return null;
  return `${SITE}${pathname}`;
}

/** @param {string | undefined} value */
function formatLastmod(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

/** @param {SitemapUrl[]} urls */
function bucketFor(loc) {
  const path = new URL(loc).pathname;
  if (path.startsWith('/blog/')) return 'blog';
  if (path.startsWith('/products/')) return 'products';
  return 'pages';
}

/** @param {SitemapUrl[]} urls */
function renderUrlset(urls) {
  const body = urls
    .map((u) => {
      const lastmod = formatLastmod(u.lastmod);
      const lines = [`  <url>`, `    <loc>${u.loc}</loc>`];
      if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
      if (u.changefreq) lines.push(`    <changefreq>${u.changefreq}</changefreq>`);
      if (u.priority) lines.push(`    <priority>${u.priority}</priority>`);
      lines.push(`  </url>`);
      return lines.join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

/** @param {{ name: string, lastmod: string }[]} children */
function renderIndex(children) {
  const body = children
    .map(
      (c) =>
        c.lastmod
          ? `  <sitemap>
    <loc>${SITE}/${c.name}</loc>
    <lastmod>${c.lastmod}</lastmod>
  </sitemap>`
          : `  <sitemap>
    <loc>${SITE}/${c.name}</loc>
  </sitemap>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

const parsed = parseUrls(raw);
const byBucket = {
  pages: /** @type {SitemapUrl[]} */ ([]),
  products: /** @type {SitemapUrl[]} */ ([]),
  blog: /** @type {SitemapUrl[]} */ ([]),
};

const seen = new Set();
for (const item of parsed) {
  const loc = normalizeUrl(item.loc);
  if (!loc || seen.has(loc)) continue;
  seen.add(loc);
  byBucket[bucketFor(loc)].push({
    loc,
    lastmod: item.lastmod,
    changefreq: item.changefreq,
    priority: item.priority,
  });
}

const total = Object.values(byBucket).reduce((n, list) => n + list.length, 0);
if (total === 0) {
  console.error('finalize-sitemap: no valid URLs after normalize.');
  process.exit(1);
}

for (const list of Object.values(byBucket)) {
  list.sort((a, b) => a.loc.localeCompare(b.loc));
}

const childFiles = [
  { key: 'pages', name: 'sitemap-pages.xml' },
  { key: 'products', name: 'sitemap-products.xml' },
  { key: 'blog', name: 'sitemap-blog.xml' },
];

const written = [];
for (const child of childFiles) {
  const urls = byBucket[child.key];
  if (urls.length === 0) continue;
  const lastmods = urls.map((u) => formatLastmod(u.lastmod)).filter(Boolean).sort();
  const lastmod = lastmods.at(-1) ?? null;
  writeSeoAsset(child.name, renderUrlset(urls));
  written.push({ name: child.name, lastmod, count: urls.length });
}

const indexXml = renderIndex(written);
writeSeoAsset('sitemap.xml', indexXml);

for (const stale of ['sitemap-index.xml', 'sitemap-0.xml', 'sitemap-all.xml', 'sitemap-forum.xml']) {
  for (const dir of [dist, publicDir]) {
    const file = path.join(dir, stale);
    if (fs.existsSync(file)) fs.unlinkSync(file);
  }
}

console.log(`Sitemap finalized: ${total} URLs`);
for (const w of written) {
  console.log(`  ${w.name}: ${w.count}`);
}
console.log('  sitemap.xml → index');

const robotsTxt = `User-agent: *
Allow: /

Disallow: /go/

Sitemap: ${SITE}/sitemap.xml

# RSS: ${SITE}/rss.xml
`;
writeSeoAsset('robots.txt', robotsTxt);
console.log('  robots.txt → synced with sitemap index (dist + public)');
