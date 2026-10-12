// =============================================================================
// check-a3-icons.mjs — A3 (TXN-20261012-12): khóa biểu tượng trang
// =============================================================================
// Nguồn: SVG hash be34cebf… bắt buộc; ba tệp đúng kích thước; ICO giải mã
// đầy đủ header/directory/offset/length + payload PNG bằng sharp tới pixel;
// apple icon alpha mọi pixel nền kín; 4 thẻ trong head BaseLayout.
// Dist: 3 asset byte-match; mọi trang dùng BaseLayout (gồm 404.html) đủ thẻ.
// Exit 1 nếu có lỗi.
// =============================================================================
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const cheDoDist = process.argv[2] === 'dist';
const errors = [];
const dat = (ten, ok, moTa) => {
  console.log(`${ok ? 'ĐẠT' : 'KHÔNG ĐẠT'} ${ten}${moTa ? ' — ' + moTa : ''}`);
  if (!ok) errors.push(ten);
};
const SVG_HASH = 'be34cebf004c889f006ac11bf357bf4b17ceca1cf68de6e53660dbbf67cd464a';
const { createHash } = await import('node:crypto');
const boChuHTML = (html) => html.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));

// ---- NGUỒN ----
const svgHash = createHash('sha256').update(readFileSync('public/favicon.svg')).digest('hex');
dat('A3-N0 SVG hash chuẩn', svgHash === SVG_HASH, `sha256=${svgHash.slice(0, 16)}…`);

for (const [tep, [w, h]] of Object.entries({ 'public/favicon-32x32.png': [32, 32], 'public/apple-touch-icon.png': [180, 180] })) {
  if (!existsSync(tep)) { dat(`A3 tệp ${tep}`, false, 'không tồn tại'); continue; }
  // kiểm format PNG (signature) + giải mã TỚI PIXEL (không chỉ metadata)
  const sig = readFileSync(tep).subarray(0, 4).toString('hex');
  if (sig !== '89504e47') { dat(`A3 tệp ${tep}`, false, `không phải PNG (signature=${sig})`); continue; }
  try {
    const { data: px, info: inf } = await sharp(tep).raw().toBuffer({ resolveWithObject: true });
    const dung = inf.width === w && inf.height === h && px.length === inf.width * inf.height * inf.channels;
    dat(`A3 tệp ${tep}`, dung, `${inf.width}×${inf.height} px=${px.length} (kỳ vọng ${w}×${h})`);
  } catch (err) {
    dat(`A3 tệp ${tep}`, false, `sharp không giải mã được: ${String(err).slice(0, 60)}`);
  }
}

// ICO: giải mã đầy đủ — header, directory, offset/length, payload sharp pixel
function docIco(tep) {
  const data = readFileSync(tep);
  // kiểm độ dài tối thiểu: 6 (ICONDIR) trước khi đọc
  if (data.length < 6) return null;
  const res = data.readUInt16LE(0);
  const typ = data.readUInt16LE(2);
  const count = data.readUInt16LE(4);
  if (res !== 0 || typ !== 1) return null;
  if (count < 1 || count > 32) return null;
  // directory: 6 + count×16 bytes phải nằm trong tệp
  if (data.length < 6 + count * 16) return null;
  const entries = [];
  for (let i = 0; i < count; i++) {
    const e = data.subarray(6 + i * 16, 6 + (i + 1) * 16);
    const w = e[0] === 0 ? 256 : e[0];
    const h = e[1] === 0 ? 256 : e[1];
    const size = e.readUInt32LE(8);
    const offset = e.readUInt32LE(12);
    if (size === 0) return null; // size 0 = hỏng
    // offset phải sau directory
    if (offset < 6 + count * 16) return null;
    // entry không chồng lấn và nằm trong tệp
    if (offset + size > data.length) return null;
    if (entries.length > 0) {
      const prev = entries[entries.length - 1];
      if (offset < prev.offset + prev.size) return null;
    }
    entries.push({ w, h, size, offset });
  }
  return { count, entries, data };
}

const ico = existsSync('public/favicon.ico') ? docIco('public/favicon.ico') : null;
dat(
  'A3 ICO header + directory',
  !!ico && ico.count === 3 && JSON.stringify(ico.entries.map((e) => `${e.w}x${e.h}`)) === JSON.stringify(['16x16', '32x32', '48x48']),
  ico ? `count=${ico.count}, [${ico.entries.map((e) => `${e.w}x${e.h}@${e.offset}+${e.size}`).join(', ')}], entries không chồng lấn` : 'không giải mã được (header/directory/overlap)'
);

// payload: giải mã BẰNG SHARP tới PIXEL — không chỉ metadata/header
if (ico) {
  let payloadOk = ico.entries.length === 3;
  let chiTiet = '';
  for (const e of ico.entries) {
    const payload = ico.data.subarray(e.offset, e.offset + e.size);
    if (payload.subarray(0, 4).toString('hex') !== '89504e47') {
      payloadOk = false;
      chiTiet = `entry ${e.w}x${e.h}: không phải PNG`;
      break;
    }
    try {
      // giải mã tới RAW PIXEL — IDAT hỏng sẽ fail ở đây dù header đúng
      const { data: px, info: inf } = await sharp(payload).raw().toBuffer({ resolveWithObject: true });
      if (px.length !== inf.width * inf.height * inf.channels) {
        payloadOk = false;
        chiTiet = `entry ${e.w}x${e.h}: sharp pixel length ${px.length} không khớp ${inf.width}×${inf.height}×${inf.channels}`;
        break;
      }
      if (inf.width !== e.w || inf.height !== e.h) {
        payloadOk = false;
        chiTiet = `entry ${e.w}x${e.h}: sharp pixel ${inf.width}×${inf.height} lệch ${e.w}×${e.h}`;
        break;
      }
    } catch (err) {
      payloadOk = false;
      chiTiet = `entry ${e.w}x${e.h}: sharp không giải mã được (${String(err).slice(0, 60)})`;
      break;
    }
  }
  dat('A3 ICO payload sharp', payloadOk, payloadOk ? '3 payload giải mã sharp tới pixel đúng' : chiTiet);
}

// Apple icon: alpha MỌI pixel, nền kín, góc đúng
{
  const { data, info } = await sharp('public/apple-touch-icon.png').raw().toBuffer({ resolveWithObject: true });
  let alphaMin = 255;
  for (let i = 3; i < data.length; i += 4) alphaMin = Math.min(alphaMin, data[i]);
  const goc = [data[0], data[1], data[2], data[3]];
  const nenDung = goc[0] === 22 && goc[1] === 50 && goc[2] === 59 && goc[3] === 255;
  dat(
    'A3 apple icon nền kín (mọi pixel)',
    alphaMin === 255 && nenDung,
    `alpha min mọi pixel=${alphaMin}, góc=#${[goc[0], goc[1], goc[2]].map((v) => v.toString(16).padStart(2, '0')).join('')}`
  );
}

// BaseLayout: 4 thẻ thật trong <head> (bóc chú thích HTML)
const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
const dauHead = layout.indexOf('<head>');
const cuoiHead = layout.indexOf('</head>');
const head = layout.slice(dauHead, cuoiHead).replace(/<!--[\s\S]*?-->/g, ' ');
const THE = [
  ['icon', 'image/x-icon', '/favicon.ico', '16x16 32x32 48x48'],
  ['icon', 'image/png', '/favicon-32x32.png', '32x32'],
  ['icon', 'image/svg+xml', '/favicon.svg', null],
  ['apple-touch-icon', null, '/apple-touch-icon.png', '180x180'],
];
for (const [rel, type, href, sizes] of THE) {
  const tag = '<link rel="' + rel + '"'
    + (type ? ' type="' + type + '"' : '')
    + (sizes ? ' sizes="' + sizes + '"' : '')
    + ' href="' + href + '" />';
  const coMat = head.includes(tag);
  const dem = (head.match(new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) ?? []).length;
  dat(`A3 thẻ ${rel}${type ? ' ' + type : ''}`, coMat && dem === 1, coMat ? (dem === 1 ? 'đúng 1 thẻ trong head' : `lặp ${dem} lần`) : 'thiếu trong head');
}

// Nối generator + checker vào chuỗi check/build
const pkgTxt = readFileSync('package.json', 'utf8');
dat(
  'A3 nối generator + checker',
  pkgTxt.includes('node scripts/generate-a3-icons.mjs && npm run check') &&
    pkgTxt.includes('node scripts/check-a3-icons.mjs && npm run check:types') &&
    pkgTxt.includes('node scripts/check-a3-icons.mjs dist"'),
  'generator đầu build + checker nguồn sau A2 trước check:types + dist cuối build'
);

// ---- DIST ----
if (cheDoDist) {
  for (const tep of ['public/favicon.ico', 'public/favicon-32x32.png', 'public/apple-touch-icon.png']) {
    const dich = tep.replace('public/', 'dist/');
    const ok = existsSync(dich) && readFileSync(tep).equals(readFileSync(dich));
    dat(`A3 dist ${tep.replace('public/', '')}`, ok, ok ? 'khớp byte với public' : 'thiếu hoặc lệch bytes');
  }
  // mọi trang HTML dùng BaseLayout: đủ 4 thẻ trong head (bóc chú thích)
  const trang = [];
  const quet = (thu) => {
    for (const ten of readdirSync(thu)) {
      const duong = join(thu, ten);
      if (statSync(duong).isDirectory()) quet(duong);
      else if (ten === 'index.html') trang.push(duong);
      else if (ten.endsWith('.html')) trang.push(duong);
    }
  };
  quet('dist');
  let thieu = 0;
  for (const tep of trang) {
    const html = boChuHTML(readFileSync(tep, 'utf8'));
    const dauHead = html.indexOf('<head>');
    const cuoiHead = html.indexOf('</head>');
    const head = dauHead >= 0 && cuoiHead > dauHead ? html.slice(dauHead, cuoiHead) : '';
    let ok = true;
    for (const [rel, type, href, sizes] of THE) {
      const tag = '<link rel="' + rel + '"'
        + (type ? ' type="' + type + '"' : '')
        + (sizes ? ' sizes="' + sizes + '"' : '')
        + ' href="' + href + '">';
      if (!head.includes(tag)) { thieu += 1; ok = false; break; }
    }
    if (!ok) console.log(`   thiếu: ${tep.replace(/\\/g, '/')}`);
  }
  dat(
    'A3 dist thẻ favicon',
    thieu === 0,
    thieu === 0 ? `${trang.length} trang (gồm 404.html) đều đủ 4 thẻ` : `${thieu}/${trang.length} trang thiếu thẻ`
  );
}

if (errors.length) {
  console.log(`=> A3 THẤT BẠI (${cheDoDist ? 'nguồn+dist' : 'nguồn'}): ${errors.length} phép kiểm (${errors.join('; ')})`);
  process.exit(1);
}
console.log(`=> A3 ĐẠT (${cheDoDist ? 'nguồn+dist' : 'nguồn'}).`);
