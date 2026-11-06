/**
 * Bodycam Hacks → Borderlands Hacks rebrand for borderlandscheats.com
 * Run from project root: node scripts/rebrand-borderlands.mjs
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

const PURCHASE_URL =
  'https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Frainbow-six-siege-cheats';

/** Ordered longest-first replacements. */
const REPLACEMENTS = [
  ['https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Frainbow-six-siege-cheats', PURCHASE_URL],
  ['https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Frainbow-six-siege-cheats', PURCHASE_URL],
  ['%2Fproducts%2Frainbow-six-siege-hacks', '%2Fproducts%2Frainbow-six-siege-hacks'],
  ['/products/bodycam-hacks', '/products/borderlands-hacks'],
  ['products/bodycam-hacks', 'products/borderlands-hacks'],
  ['/bodycam-hacks/', '/borderlands-hacks/'],
  ['/bodycam-hacks', '/borderlands-hacks'],
  ['bodycam-hacks/', 'borderlands-hacks/'],
  ['bodycamhack.net', 'borderlandscheats.com'],
  ['bodycamhack-net', 'borderlandscheats-com'],
  ['BodycamHack', 'BorderlandsCheats'],
  ['Bodycamhack', 'Borderlandscheats'],
  ['bodycamhack', 'borderlandscheats'],

  ['/go/valorant/', '/go/valorant/'],
  ['/go/r6', '/go/r6'],
  ["checkoutPath('bodycam')", "checkoutPath('borderlands')"],
  ['checkoutPath("bodycam")', 'checkoutPath("borderlands")'],
  ["product: 'bodycam'", "product: 'borderlands'"],
  ['  bodycam:', '  borderlands:'],
  ["'bodycam'", "'borderlands'"],
  ['"bodycam"', '"borderlands"'],
  ['BODYCAM_CHECKOUT_URL', 'BORDERLANDS_CHECKOUT_URL'],
  ['bodycamCheatsLanding', 'borderlandsCheatsLanding'],
  ['bodycam-hacks', 'borderlands-hacks'],
  ['Bodycam Hacks', 'Borderlands Hacks'],
  ['Bodycam hacks', 'Borderlands hacks'],
  ['bodycam hacks', 'borderlands hacks'],
  ['Bodycam Hack', 'Borderlands Hack'],
  ['bodycam hack', 'borderlands hack'],
  ['Bodycam Elite', 'Borderlands Elite'],
  ['Bodycam Pro', 'Borderlands Pro'],
  ['Bodycam Lite', 'Borderlands Lite'],
  ['Bodycam', 'Borderlands 3'],
  ['bodycam', 'borderlands'],
  ['bodycamhack-forum-vote:', 'borderlandscheats-forum-vote:'],
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

function renameDataFile() {
  const from = path.join(root, 'src', 'data', 'bodycamCheatsLanding.ts');
  const to = path.join(root, 'src', 'data', 'borderlandsCheatsLanding.ts');
  if (fs.existsSync(from) && !fs.existsSync(to)) {
    fs.renameSync(from, to);
    console.log('renamed bodycamCheatsLanding.ts → borderlandsCheatsLanding.ts');
  }
}

renameDataFile();

const files = walk(root).filter((f) => TEXT_EXTS.has(path.extname(f).toLowerCase()));
let changed = 0;
for (const file of files) {
  if (file.includes(`${path.sep}rebrand-borderlands.mjs`)) continue;
  if (file.includes(`${path.sep}rebrand-bodycam.mjs`)) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = applyText(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. Updated ${changed} text files.`);
