import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const faviconSvg = fs.readFileSync(path.join(publicDir, 'favicon.svg'));

async function png(size) {
  return sharp(faviconSvg).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
}

function pngSize(buf) {
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function encodeIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  let o = 6;
  let dataOffset = headerSize;
  const parts = [header];

  for (const buf of pngBuffers) {
    const { w, h } = pngSize(buf);
    header.writeUInt8(w >= 256 ? 0 : w, o);
    header.writeUInt8(h >= 256 ? 0 : h, o + 1);
    header.writeUInt8(0, o + 2);
    header.writeUInt8(0, o + 3);
    header.writeUInt16LE(1, o + 4);
    header.writeUInt16LE(32, o + 6);
    header.writeUInt32LE(buf.length, o + 8);
    header.writeUInt32LE(dataOffset, o + 12);
    o += 16;
    dataOffset += buf.length;
    parts.push(buf);
  }

  return Buffer.concat(parts);
}

const files = {
  'favicon-16.png': 16,
  'favicon-32.png': 32,
  'favicon-48.png': 48,
  'favicon-192.png': 192,
  'apple-touch-icon.png': 180,
  'favicon-512.png': 512,
};

for (const [name, size] of Object.entries(files)) {
  const buf = await png(size);
  fs.writeFileSync(path.join(publicDir, name), buf);
}

const ico = encodeIco([await png(16), await png(32), await png(48)]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);

console.log('Brand icons generated from favicon.svg (letter V).');
