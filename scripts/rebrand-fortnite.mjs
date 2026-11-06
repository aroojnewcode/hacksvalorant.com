/**
 * One-time DotaCheats → Fortnite Hacks rebrand.
 * Run from project root: node scripts/rebrand-fortnite.mjs
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
]);

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.seo-baseline']);

/** Ordered longest-first brand / path / slug replacements. */
const REPLACEMENTS = [
  ['dotacheats.com', 'fortnite-hacks.com'],
  ['DotaCheats', 'FortniteCheats'],
  ['Dotacheats', 'Fortnitecheats'],
  ['dotacheats', 'fortnitecheats'],

  ['/products/dota-2-hacks', '/products/fortnite-hacks'],
  ['products/dota-2-hacks', 'products/fortnite-hacks'],
  ['https://zadeyo.com/products/dota-2', 'https://zadeyo.com/products/fortnite'],
  ['%2Fproducts%2Fdota-2', '%2Fproducts%2Ffortnite'],
  ['/products/dota-2', '/products/fortnite'],
  ['/go/dota-2/', '/go/valorant/'],
  ['/go/dota-2', '/go/r6'],

  ["checkoutPath('dota2')", "checkoutPath('fortnite')"],
  ['checkoutPath("dota2")', 'checkoutPath("fortnite")'],
  ["product: 'dota2'", "product: 'fortnite'"],
  ["'dota2'", "'fortnite'"],
  ['"dota2"', '"fortnite"'],
  ['  dota2:', '  fortnite:'],
  ['dota2:', 'fortnite:'],

  ['how-to-buy-dota-2-hacks-2026', 'how-to-buy-fortnite-hacks-2026'],
  ['how-to-use-dota-2-hack-codes', 'how-to-use-fortnite-hack-codes'],
  ['dota-2-auto-combo-hero-scripts', 'fortnite-aimbot-combat-guide'],
  ['dota-2-console-commands-hacks', 'fortnite-console-commands-hacks'],
  ['dota-2-hack-codes-guide', 'fortnite-hack-codes-guide'],
  ['dota-2-console-hacks-tips', 'fortnite-console-hacks-tips'],
  ['dota-2-hacks-features-guide', 'fortnite-hacks-features-guide'],
  ['dota-2-hwid-spoofer-after-ban', 'fortnite-hwid-spoofer-after-ban'],
  ['dota-2-external-hack-guide', 'fortnite-external-hack-guide'],
  ['dota-2-stream-proof-setup', 'fortnite-stream-proof-setup'],
  ['dota-2-scripts-ranked-mmr', 'fortnite-aimbot-ranked-guide'],
  ['dota-2-skin-changer-guide', 'fortnite-skin-changer-guide'],
  ['dota-2-elite-tier-guide', 'fortnite-elite-tier-guide'],
  ['dota-2-map-hack-setup', 'fortnite-esp-wallhack-setup'],
  ['dota-2-zoom-hack-guide', 'fortnite-radar-hack-guide'],
  ['dota-2-lite-vs-pro', 'fortnite-lite-vs-pro'],
  ['valve-anti-hack-unable-to-verify', 'eac-bypass-fortnite-guide'],
  ['vac-patch-day-checklist', 'eac-patch-day-checklist'],
  ['dota-2-auto-kill-steal', 'fortnite-auto-aim'],
  ['dota-2-scripts-combo', 'fortnite-aimbot-combat'],
  ['dota-2-skin-changer', 'fortnite-skin-changer'],
  ['dota-2-hero-esp', 'fortnite-player-esp'],
  ['dota-2-map-hack', 'fortnite-esp-wallhack'],
  ['dota-2-zoom-hack', 'fortnite-radar-hack'],
  ['dota-2-farm-bot', 'fortnite-loot-radar'],
  ['dota-2-hacks', 'fortnite-hacks'],
  ["'dota-2'", "'fortnite'"],
  ['"dota-2"', '"fortnite"'],

  ['Dota Hacks & Hacks', 'Fortnite Hacks & Hacks'],
  ['Dota hacks & hacks', 'Fortnite hacks & hacks'],
  ['Dota Hacks', 'Fortnite Hacks'],
  ['Dota hacks', 'Fortnite hacks'],
  ['dota hacks', 'fortnite hacks'],
  ['Dota 2 Hacks', 'Fortnite Hacks'],
  ['Dota 2 hacks', 'Fortnite hacks'],
  ['dota 2 hacks', 'fortnite hacks'],
  ['Dota 2', 'Fortnite'],
  ['dota 2', 'fortnite'],
  ['Dota', 'Fortnite'],
  ['dota', 'fortnite'],

  ['Valve Anti-Hack', 'Easy Anti-Hack'],
  ['valve anti-hack', 'easy anti-hack'],
  ['VAC ban', 'EAC ban'],
  ['VAC update', 'EAC update'],
  ['VAC patch', 'EAC patch'],
  [' after VAC', ' after EAC'],
  [' a VAC', ' an EAC'],
  ['VAC/', 'EAC/'],
  ['/VAC', '/EAC'],
  [' VAC ', ' EAC '],
  ['(VAC)', '(EAC)'],
  ['"VAC"', '"EAC"'],
  ["'VAC'", "'EAC'"],

  ['Captains Mode', 'Ranked Arena'],
  ['All Pick', 'Battle Royale'],
];

const IMAGE_RENAMES = [
  ['dota-2-auto-kill-steal', 'fortnite-auto-aim'],
  ['dota-2-farm-bot', 'fortnite-loot-radar'],
  ['dota-2-hero-esp', 'fortnite-player-esp'],
  ['dota-2-map-hack', 'fortnite-esp-wallhack'],
  ['dota-2-scripts-combo', 'fortnite-aimbot-combat'],
  ['dota-2-skin-changer', 'fortnite-skin-changer'],
  ['dota-2-zoom-hack', 'fortnite-radar-hack'],
  ['how-to-buy-dota-2-hacks-2026', 'how-to-buy-fortnite-hacks-2026'],
  ['how-to-use-dota-2-hack-codes', 'how-to-use-fortnite-hack-codes'],
  ['dota-2-auto-combo-hero-scripts', 'fortnite-aimbot-combat-guide'],
  ['dota-2-hack-codes-guide', 'fortnite-hack-codes-guide'],
  ['dota-2-hacks-features-guide', 'fortnite-hacks-features-guide'],
  ['dota-2-console-hacks-tips', 'fortnite-console-hacks-tips'],
  ['dota-2-console-commands-hacks', 'fortnite-console-commands-hacks'],
  ['dota-2-elite-tier-guide', 'fortnite-elite-tier-guide'],
  ['dota-2-external-hack-guide', 'fortnite-external-hack-guide'],
  ['dota-2-hwid-spoofer-after-ban', 'fortnite-hwid-spoofer-after-ban'],
  ['dota-2-lite-vs-pro', 'fortnite-lite-vs-pro'],
  ['dota-2-map-hack-setup', 'fortnite-esp-wallhack-setup'],
  ['dota-2-scripts-ranked-mmr', 'fortnite-aimbot-ranked-guide'],
  ['dota-2-skin-changer-guide', 'fortnite-skin-changer-guide'],
  ['dota-2-stream-proof-setup', 'fortnite-stream-proof-setup'],
  ['dota-2-zoom-hack-guide', 'fortnite-radar-hack-guide'],
  ['vac-patch-day-checklist', 'eac-patch-day-checklist'],
  ['valve-anti-hack-unable-to-verify', 'eac-bypass-fortnite-guide'],
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

function renameImages() {
  const imageRoots = [
    path.join(root, 'public', 'images', 'gameplay'),
    path.join(root, 'public', 'images', 'blog'),
  ];
  for (const dir of imageRoots) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      for (const [from, to] of IMAGE_RENAMES) {
        if (name.startsWith(from)) {
          const dest = name.replace(from, to);
          const fromPath = path.join(dir, name);
          const toPath = path.join(dir, dest);
          if (fromPath !== toPath && !fs.existsSync(toPath)) {
            fs.renameSync(fromPath, toPath);
            console.log('rename image', name, '→', dest);
          }
          break;
        }
      }
    }
  }
}

function renameProductDir() {
  const from = path.join(root, 'src', 'pages', 'products', 'dota-2-hacks');
  const to = path.join(root, 'src', 'pages', 'products', 'fortnite-hacks');
  if (fs.existsSync(from) && !fs.existsSync(to)) {
    fs.renameSync(from, to);
    console.log('renamed product dir → fortnite-hacks');
  }
}

renameProductDir();
renameImages();

const files = walk(root).filter((f) => TEXT_EXTS.has(path.extname(f).toLowerCase()));
let changed = 0;
for (const file of files) {
  if (file.endsWith(`${path.sep}rebrand-fortnite.mjs`)) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = applyText(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. Updated ${changed} text files.`);
