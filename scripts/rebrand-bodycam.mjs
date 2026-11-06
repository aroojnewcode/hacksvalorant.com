/**
 * Fortnite Hacks → Bodycam Hacks rebrand for bodycamhack.net
 * Run from project root: node scripts/rebrand-bodycam.mjs
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

/** Ordered longest-first brand / path / slug replacements. */
const REPLACEMENTS = [
  ['fortnite-hacks.com', 'bodycamhack.net'],
  ['FortniteCheats', 'BodycamHack'],
  ['Fortnitecheats', 'Bodycamhack'],
  ['fortnitecheats', 'bodycamhack'],

  ['/products/fortnite-hacks', '/products/bodycam-hacks'],
  ['products/fortnite-hacks', 'products/bodycam-hacks'],
  ['https://zadeyo.com/go/QRH?to=%2Fproducts%2Ffortnite', 'https://zadeyo.com/go/QRH?to=%2Fproducts%2Frainbow-six-siege-cheats'],
  ['https://zadeyo.com/products/fortnite', 'https://zadeyo.com/products/bodycam'],
  ['%2Fproducts%2Ffortnite', '%2Fproducts%2Frainbow-six-siege-hacks'],
  ['/products/fortnite', '/products/bodycam'],
  ['/go/valorant/', '/go/valorant/'],
  ['/go/r6', '/go/r6'],

  ["checkoutPath('fortnite')", "checkoutPath('bodycam')"],
  ['checkoutPath("fortnite")', 'checkoutPath("bodycam")'],
  ["product: 'fortnite'", "product: 'bodycam'"],
  ["'fortnite'", "'bodycam'"],
  ['"fortnite"', '"bodycam"'],
  ['  fortnite:', '  bodycam:'],
  ['fortnite-hacks-com', 'bodycamhack-net'],

  ['how-to-buy-fortnite-hacks-2026', 'how-to-buy-bodycam-hacks-2026'],
  ['how-to-use-fortnite-hack-codes', 'how-to-use-bodycam-hack-codes'],
  ['fortnite-aimbot-combat-guide', 'bodycam-aimbot-combat-guide'],
  ['fortnite-console-commands-hacks', 'bodycam-console-commands-hacks'],
  ['fortnite-hack-codes-guide', 'bodycam-hack-codes-guide'],
  ['fortnite-console-hacks-tips', 'bodycam-console-hacks-tips'],
  ['fortnite-hacks-features-guide', 'bodycam-hacks-features-guide'],
  ['fortnite-hwid-spoofer-after-ban', 'bodycam-hwid-spoofer-after-ban'],
  ['fortnite-external-hack-guide', 'bodycam-external-hack-guide'],
  ['fortnite-stream-proof-setup', 'bodycam-stream-proof-setup'],
  ['fortnite-aimbot-ranked-guide', 'bodycam-aimbot-ranked-guide'],
  ['fortnite-skin-changer-guide', 'bodycam-skin-changer-guide'],
  ['fortnite-elite-tier-guide', 'bodycam-elite-tier-guide'],
  ['fortnite-esp-wallhack-setup', 'bodycam-esp-wallhack-setup'],
  ['fortnite-radar-hack-guide', 'bodycam-radar-hack-guide'],
  ['fortnite-lite-vs-pro', 'bodycam-lite-vs-pro'],
  ['eac-bypass-fortnite-guide', 'eac-bypass-bodycam-guide'],
  ['fortnite-auto-aim', 'bodycam-auto-aim'],
  ['fortnite-aimbot-combat', 'bodycam-aimbot-combat'],
  ['fortnite-skin-changer', 'bodycam-skin-changer'],
  ['fortnite-player-esp', 'bodycam-player-esp'],
  ['fortnite-esp-wallhack', 'bodycam-esp-wallhack'],
  ['fortnite-radar-hack', 'bodycam-radar-hack'],
  ['fortnite-loot-radar', 'bodycam-loot-radar'],
  ['fortnite-hacks', 'bodycam-hacks'],

  ['Fortnite Hacks & Hacks', 'Bodycam Hacks & Tools'],
  ['Fortnite hacks & hacks', 'Bodycam hacks & tools'],
  ['Fortnite Hacks', 'Bodycam Hacks'],
  ['Fortnite hacks', 'Bodycam hacks'],
  ['fortnite hacks', 'bodycam hacks'],
  ['Fortnite hack', 'Bodycam hack'],
  ['fortnite hack', 'bodycam hack'],
  ['Fortnite', 'Bodycam'],
  ['fortnite', 'bodycam'],

  ['Epic and EAC', 'Steam and EAC'],
  ['Epic/EAC', 'Steam/EAC'],
  ['Epic store', 'Steam inventory'],
  ['Epic ', 'Steam '],

  ['Battle Royale', 'Multiplayer'],
  ['Zero Build', 'Deathmatch'],
  ['Ranked Arena', 'Ranked'],
  ['Creative', 'Private Servers'],
  ['Loot / Chest ESP', 'Weapon / Ammo ESP'],
  ['loot ESP', 'ammo ESP'],
  ['Chest and floor-loot ESP', 'Weapon and ammo ESP'],
  ['chest ESP', 'weapon ESP'],
  ['Reboot van and supply drop hints', 'Ammo crate and pickup hints'],
  ['storm edge', 'map edge'],
  ['through walls and builds', 'through walls and cover'],
  ['Skin Changer', 'Loadout Changer'],
  ['skin changer', 'loadout changer'],
  ['Unlock All', 'Loadout Pack'],
  ['unlock all', 'loadout pack'],

  ['fortnitecheats-forum-vote:', 'bodycamhack-forum-vote:'],
];

const IMAGE_RENAMES = [
  ['fortnite-auto-aim', 'bodycam-auto-aim'],
  ['fortnite-loot-radar', 'bodycam-loot-radar'],
  ['fortnite-player-esp', 'bodycam-player-esp'],
  ['fortnite-esp-wallhack', 'bodycam-esp-wallhack'],
  ['fortnite-aimbot-combat', 'bodycam-aimbot-combat'],
  ['fortnite-skin-changer', 'bodycam-skin-changer'],
  ['fortnite-radar-hack', 'bodycam-radar-hack'],
  ['how-to-buy-fortnite-hacks-2026', 'how-to-buy-bodycam-hacks-2026'],
  ['how-to-use-fortnite-hack-codes', 'how-to-use-bodycam-hack-codes'],
  ['fortnite-aimbot-combat-guide', 'bodycam-aimbot-combat-guide'],
  ['fortnite-hack-codes-guide', 'bodycam-hack-codes-guide'],
  ['fortnite-hacks-features-guide', 'bodycam-hacks-features-guide'],
  ['fortnite-console-hacks-tips', 'bodycam-console-hacks-tips'],
  ['fortnite-console-commands-hacks', 'bodycam-console-commands-hacks'],
  ['fortnite-elite-tier-guide', 'bodycam-elite-tier-guide'],
  ['fortnite-external-hack-guide', 'bodycam-external-hack-guide'],
  ['fortnite-hwid-spoofer-after-ban', 'bodycam-hwid-spoofer-after-ban'],
  ['fortnite-lite-vs-pro', 'bodycam-lite-vs-pro'],
  ['fortnite-esp-wallhack-setup', 'bodycam-esp-wallhack-setup'],
  ['fortnite-aimbot-ranked-guide', 'bodycam-aimbot-ranked-guide'],
  ['fortnite-skin-changer-guide', 'bodycam-skin-changer-guide'],
  ['fortnite-stream-proof-setup', 'bodycam-stream-proof-setup'],
  ['fortnite-radar-hack-guide', 'bodycam-radar-hack-guide'],
  ['eac-bypass-fortnite-guide', 'eac-bypass-bodycam-guide'],
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

function ensureProductDir() {
  const from = path.join(root, 'src', 'pages', 'products', 'fortnite-hacks');
  const to = path.join(root, 'src', 'pages', 'products', 'bodycam-hacks');
  if (fs.existsSync(from) && !fs.existsSync(to)) {
    fs.renameSync(from, to);
    console.log('renamed product dir → bodycam-hacks');
  }
}

ensureProductDir();
renameImages();

const files = walk(root).filter((f) => TEXT_EXTS.has(path.extname(f).toLowerCase()));
let changed = 0;
for (const file of files) {
  if (file.endsWith(`${path.sep}rebrand-bodycam.mjs`)) continue;
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
