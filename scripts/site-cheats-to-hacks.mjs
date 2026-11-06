/**
 * Site-wide: "cheats" → "hacks" in URLs, slugs, and user-facing copy.
 * Run: node scripts/site-cheats-to-hacks.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const SKIP = new Set(['node_modules', '.git', 'dist']);
const EXTS = new Set(['.ts', '.astro', '.mjs', '.js', '.json', '.md', '.txt', '.webmanifest', '.css', '.toml']);

const SLUG_REPLACEMENTS = [
  ['buy-r6-cheats', 'buy-r6-hacks'],
  ['r6-cheat-setup', 'r6-hack-setup'],
  ['/r6-cheats/', '/valorant-hacks/'],
  ['/r6-cheats', '/r6-hacks'],
  ['r6CheatsLanding', 'r6HacksLanding'],
  ['%2Fr6-cheats', '%2Fr6-hacks'],
];

const PROTECT = [];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (EXTS.has(path.extname(e.name).toLowerCase())) out.push(f);
  }
  return out;
}

function protectUrls(text) {
  let next = text;
  const urls = next.match(/https:\/\/[^\s'"<>]+/g) ?? [];
  for (const url of urls) {
    if (!url.includes('zadeyo') && !url.includes('supabase')) continue;
    const token = `__URL_${PROTECT.length}__`;
    PROTECT.push({ token, value: url });
    next = next.split(url).join(token);
  }
  return next;
}

function applyVocab(text) {
  let next = protectUrls(text);
  next = next.replace(/\bRainbow Six Siege cheats\b/gi, 'Rainbow Six Siege hacks');
  next = next.replace(/\brainbow six siege cheats\b/gi, 'rainbow six siege hacks');
  next = next.replace(/\bR6 Cheats\b/g, 'R6 Hacks');
  next = next.replace(/\bR6 cheats\b/g, 'R6 hacks');
  next = next.replace(/\br6 cheats\b/g, 'r6 hacks');
  next = next.replace(/\bbuy r6 cheats\b/gi, 'buy r6 hacks');
  next = next.replace(/\bBuy R6 cheats\b/g, 'Buy R6 hacks');
  next = next.replace(/\bCheats\b/g, 'Hacks');
  next = next.replace(/\bcheats\b/g, 'hacks');
  next = next.replace(/\bCheat\b/g, 'Hack');
  next = next.replace(/\bcheat\b/g, 'hack');
  for (const { token, value } of PROTECT) {
    next = next.split(token).join(value);
  }
  PROTECT.length = 0;
  return next;
}

function applySlugs(text) {
  let next = text;
  for (const [a, b] of SLUG_REPLACEMENTS) {
    if (next.includes(a)) next = next.split(a).join(b);
  }
  return next;
}

function renameLanding() {
  const from = path.join(root, 'src', 'data', 'r6CheatsLanding.ts');
  const to = path.join(root, 'src', 'data', 'r6HacksLanding.ts');
  if (fs.existsSync(from)) {
    fs.writeFileSync(to, applyVocab(applySlugs(fs.readFileSync(from, 'utf8'))));
    fs.unlinkSync(from);
    console.log('renamed r6CheatsLanding.ts → r6HacksLanding.ts');
  }
}

renameLanding();

const skipFiles = new Set([
  path.join(root, 'scripts', 'site-cheats-to-hacks.mjs'),
  path.join(root, 'scripts', 'vocab-cheats-to-hacks.mjs'),
  path.join(root, 'scripts', 'vocab-hack-to-cheats.mjs'),
]);

let n = 0;
for (const file of walk(root)) {
  if (skipFiles.has(file)) continue;
  if (file.includes(`${path.sep}node_modules${path.sep}`)) continue;
  const before = fs.readFileSync(file, 'utf8');
  let after = applySlugs(before);
  after = applyVocab(after);
  if (after !== before) {
    fs.writeFileSync(file, after);
    n++;
    console.log(path.relative(root, file));
  }
}

const fromPage = path.join(root, 'src', 'pages', 'r6-cheats');
const toPage = path.join(root, 'src', 'pages', 'r6-hacks');
if (fs.existsSync(fromPage) && !fs.existsSync(toPage)) {
  fs.renameSync(fromPage, toPage);
  console.log('renamed pages/r6-cheats → r6-hacks');
} else if (fs.existsSync(fromPage) && fs.existsSync(toPage)) {
  for (const name of fs.readdirSync(fromPage)) {
    fs.copyFileSync(path.join(fromPage, name), path.join(toPage, name));
  }
  fs.rmSync(fromPage, { recursive: true });
  console.log('merged pages/r6-cheats → r6-hacks');
}

console.log(`Done. Updated ${n} files.`);
