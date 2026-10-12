// =============================================================================
// generate-a3-icons.mjs — A3 (TXN-20261012-10): sinh biểu tượng từ favicon.svg
// =============================================================================
// Đầu ra (có tính lặp lại — cùng nguồn/công cụ cho cùng bytes):
//   public/favicon-32x32.png   — PNG 32×32, nền trong suốt
//   public/favicon.ico         — ICO thật: 16×16 + 32×32 + 48×48 (PNG trong ICO)
//   public/apple-touch-icon.png — PNG 180×180, nền kín #16323b, hình 144×144 giữa
// Chạy: node scripts/generate-a3-icons.mjs
// =============================================================================
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const SVG = 'public/favicon.svg';
const NEN_APPLE = { r: 22, g: 50, b: 59, alpha: 1 }; // #16323b

const svg = readFileSync(SVG);

// 1. PNG 32×32 trong suốt
const png32 = await sharp(svg, { density: 300 }).resize(32, 32).png().toBuffer();
writeFileSync('public/favicon-32x32.png', png32);

// 2. PNG 48×48 (payload cho ICO)
const png48 = await sharp(svg, { density: 300 }).resize(48, 48).png().toBuffer();
// PNG 16×16 (payload cho ICO)
const png16 = await sharp(svg, { density: 300 }).resize(16, 16).png().toBuffer();

// 3. ICO đóng gói: ICONDIR + 3 ICONDIRENTRY (16/32/48, PNG payload)
// Cấu trúc ICO: ICONDIR (6 bytes) + n×ICONDIRENTRY (16 bytes mỗi entry) + data
function icoEntry(w, h, data, offset) {
  const b = Buffer.alloc(16);
  b.writeUInt8(w >= 256 ? 0 : w, 0); // width (0 = 256)
  b.writeUInt8(h >= 256 ? 0 : h, 1); // height
  b.writeUInt8(0, 2); // palette
  b.writeUInt8(0, 3); // reserved
  b.writeUInt16LE(1, 4); // planes
  b.writeUInt16LE(32, 6); // bitcount
  b.writeUInt32LE(data.length, 8); // size
  b.writeUInt32LE(offset, 12); // offset
  return b;
}
const payloads = [
  { w: 16, h: 16, data: png16 },
  { w: 32, h: 32, data: png32 },
  { w: 48, h: 48, data: png48 },
];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type icon
header.writeUInt16LE(payloads.length, 4); // count
const entries = [];
let offset = 6 + payloads.length * 16;
for (const p of payloads) {
  entries.push(icoEntry(p.w, p.h, p.data, offset));
  offset += p.data.length;
}
const ico = Buffer.concat([header, ...entries, ...payloads.map((p) => p.data)]);
writeFileSync('public/favicon.ico', ico);

// 4. Apple touch icon 180×180: nền kín #16323b, SVG 144×144 đặt giữa (lề 18px)
const inner = await sharp(svg, { density: 300 }).resize(144, 144).png().toBuffer();
const apple = await sharp({
  create: { width: 180, height: 180, channels: 4, background: NEN_APPLE },
})
  .composite([{ input: inner, top: 18, left: 18 }])
  .png()
  .toBuffer();
writeFileSync('public/apple-touch-icon.png', apple);

// báo cáo hash để đối chiếu tính lặp lại
const { createHash } = await import('node:crypto');
for (const f of ['public/favicon-32x32.png', 'public/favicon.ico', 'public/apple-touch-icon.png']) {
  console.log(f, createHash('sha256').update(readFileSync(f)).digest('hex').slice(0, 16));
}
