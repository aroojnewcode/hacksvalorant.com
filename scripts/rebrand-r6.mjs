/**
 * MW4 Hack → R6 Hacks rebrand for hacksvalorant.com
 * Run from project root: node scripts/rebrand-r6.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');

const TEXT_EXTS = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.md',
  '.txt',
  '.svg',
  '.html',
  '.webmanifest',
  '.css',
  '.toml',
]);

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.seo-baseline', '_template']);

const R6_CHECKOUT =
  'https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Frainbow-six-siege-cheats';
const R6_CHECKOUT_ENCODED = '%2Fproducts%2Frainbow-six-siege-hacks';

/** Ordered longest-first replacements. */
const REPLACEMENTS = [
  ['https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Fmw4', R6_CHECKOUT],
  ['https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Fborderlands-3', R6_CHECKOUT],
  ['https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Fbodycam', R6_CHECKOUT],
  ['%2Fproducts%2Fmw4', R6_CHECKOUT_ENCODED],
  ['%2Fproducts%2Fborderlands-3', R6_CHECKOUT_ENCODED],
  ['%2Fproducts%2Fbodycam', R6_CHECKOUT_ENCODED],

  ['mw4hack.org', 'hacksvalorant.com'],
  ['mw4hack-org', 'r6hacks-org'],
  ['Mw4Hack', 'R6Hacks'],
  ['Mw4hack', 'R6hacks'],
  ['mw4hack', 'r6hacks'],

  ['/products/mw4-hacks', '/products/r6-hacks'],
  ['products/mw4-hacks', 'products/r6-hacks'],
  ['/mw4-hacks/', '/valorant-hacks/'],
  ['/mw4-hacks', '/r6-hacks'],
  ['mw4-hacks/', 'r6-hacks/'],
  ['mw4-hacks', 'r6-hacks'],

  ['/go/mw4/', '/go/valorant/'],
  ['/go/mw4', '/go/r6'],
  ['/go/borderlands/', '/go/valorant/'],
  ['/go/borderlands', '/go/r6'],
  ['/go/bodycam/', '/go/valorant/'],
  ['/go/bodycam', '/go/r6'],
  ['/go/fortnite/', '/go/valorant/'],
  ['/go/fortnite', '/go/r6'],

  ["checkoutPath('mw4')", "checkoutPath('r6')"],
  ['checkoutPath("mw4")', 'checkoutPath("r6")'],
  ["product: 'mw4'", "product: 'r6'"],
  ['  mw4:', '  r6:'],
  ['MW4_CHECKOUT_URL', 'R6_CHECKOUT_URL'],
  ['mw4CheatsLanding', 'r6HacksLanding'],
  ['zadeyoMw4ProductSeo', 'zadeyoR6ProductSeo'],
  ['zadeyo-mw4-hacks-product-seo', 'zadeyo-r6-hacks-product-seo'],

  ['Modern Warfare 4', 'Rainbow Six Siege'],
  ['modern warfare 4', 'rainbow six siege'],
  ['Modern Warfare', 'Rainbow Six Siege'],
  ['modern warfare', 'rainbow six siege'],

  ['MW4 Hacks', 'R6 Hacks'],
  ['MW4 Hack', 'R6 Hacks'],
  ['MW4 hacks', 'R6 hacks'],
  ['MW4 hack', 'R6 hack'],
  ['MW4 hacks', 'R6 hacks'],
  ['MW4 hack', 'R6 hack'],
  ['MW4 Lite', 'R6 Lite'],
  ['MW4 Pro', 'R6 Pro'],
  ['MW4 Elite', 'R6 Elite'],
  ['MW4 ', 'R6 '],
  [' mw4 ', ' r6 '],
  ['mw4 ', 'r6 '],
  ["'mw4", "'r6"],
  ['"mw4', '"r6'],
  ['blog/mw4-', 'blog/r6-'],
  ['mw4-', 'r6-'],

  ["TITLE_PREFIX = 'R6 Hacks'", "TITLE_PREFIX = 'R6 Hacks'"],
  ['PRODUCT_BASE = \'/products/mw4-hacks/\'', "PRODUCT_BASE = '/products/valorant-cheats/'"],
  ['FAVICON_VERSION = \'m2026\'', "FAVICON_VERSION = 'r6-2026'"],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function applyText(content) {
  let next = content;
  for (const [from, to] of REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

function renameIfExists(fromRel, toRel) {
  const from = path.join(root, fromRel);
  const to = path.join(root, toRel);
  if (fs.existsSync(from)) {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.renameSync(from, to);
    console.log('renamed', fromRel, '→', toRel);
  }
}

function renameLandingFile() {
  const from = path.join(root, 'src', 'data', 'mw4CheatsLanding.ts');
  const to = path.join(root, 'src', 'data', 'r6HacksLanding.ts');
  if (fs.existsSync(from)) {
    const content = applyText(fs.readFileSync(from, 'utf8'));
    fs.writeFileSync(to, content);
    fs.unlinkSync(from);
    console.log('renamed mw4CheatsLanding.ts → r6HacksLanding.ts');
  }
}

renameLandingFile();
renameIfExists('src/pages/go/mw4', 'src/pages/go/r6');
renameIfExists('src/pages/mw4-hacks', 'src/pages/r6-hacks');
renameIfExists('src/pages/products/mw4-hacks', 'src/pages/products/r6-hacks');
renameIfExists('src/config/zadeyoMw4ProductSeo.ts', 'src/config/zadeyoR6ProductSeo.ts');
renameIfExists('scripts/zadeyo-mw4-hacks-product-seo.mjs', 'scripts/zadeyo-r6-hacks-product-seo.mjs');
renameIfExists('scripts/install-mw4-hack-images.mjs', 'scripts/install-r6-hack-images.mjs');

const files = walk(root).filter((f) => TEXT_EXTS.has(path.extname(f).toLowerCase()));
let changed = 0;
for (const file of files) {
  if (file.includes(`${path.sep}rebrand-r6.mjs`)) continue;
  if (file.includes(`${path.sep}rebrand-mw4.mjs`)) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = applyText(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. Updated ${changed} text files.`);
