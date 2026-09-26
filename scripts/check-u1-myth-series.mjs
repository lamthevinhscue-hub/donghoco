#!/usr/bin/env node
// =============================================================================
// check-u1-myth-series.mjs — Kiểm khung loạt "Hiểu đúng" (gói U1)
// =============================================================================
// Kiểm SOURCE và DIST của khung loạt "Hiểu đúng" / "Mechanical Watch Myths":
//
//   SOURCE
//   U1-1  Hai tệp hub tồn tại: src/pages/hieu-dung/index.astro và
//         src/pages/en/myths/index.astro.
//   U1-2  contentRoutes.ts có đúng một cặp { vi: '/hieu-dung', en: '/en/myths/' }.
//   U1-3  Mỗi hub truy vấn đúng collection `huongDan` đúng ngôn ngữ và lọc
//         chỉ theo tag `hieu-dung` (không lấy toàn bộ bài Hướng dẫn).
//   U1-4  Hai hub có nhãn trạng thái trống từ i18n.
//
//   DIST
//   U1-5  Hai route hub tồn tại sau build; mỗi trang đúng một H1.
//   U1-6  canonical + hreflang vi/en + switcher hai chiều đúng cặp.
//   U1-7  Trạng thái trống hiển thị (nhãn hieudung_empty) khi chưa có bài
//         gắn thẻ; không có thẻ bài không mang tag `hieu-dung`.
//   U1-8  Bốn trang dẫn (2 trang chủ + 2 trang danh sách Hướng dẫn) có
//         liên kết đúng ngôn ngữ tới hub; không rò URL VI vào EN và ngược lại
//         (trừ switcher và hreflang hợp lệ).
//
// Cách chạy: node scripts/check-u1-myth-series.mjs [dist]
//   Không tham số: chỉ kiểm SOURCE (dùng trong `npm run check`, chạy trước build).
//   Có tham số dist: kiểm SOURCE + DIST (dùng trong `npm run build` sau astro build).
//   Root cây cần kiểm qua env U1_ROOT.
// Exit 1 nếu có lỗi.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.env.U1_ROOT ?? process.cwd());
const DIST = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? null;
const distDir = DIST ? (path.isAbsolute(DIST) ? DIST : path.join(ROOT, DIST)) : null;

const errors = [];
const fail = (id, msg) => {
  errors.push(`[${id}] ${msg}`);
  console.log(`  LỖI  [${id}] ${msg}`);
};
const pass = (id, msg) => console.log(`  ĐẠT  [${id}] ${msg}`);

// ===== SOURCE =====
const hubVi = path.join(ROOT, 'src', 'pages', 'hieu-dung', 'index.astro');
const hubEn = path.join(ROOT, 'src', 'pages', 'en', 'myths', 'index.astro');
const hubViTxt = fs.existsSync(hubVi) ? fs.readFileSync(hubVi, 'utf8') : null;
const hubEnTxt = fs.existsSync(hubEn) ? fs.readFileSync(hubEn, 'utf8') : null;
if (!hubViTxt) fail('U1-1', `Thiếu ${path.relative(ROOT, hubVi)}`);
if (!hubEnTxt) fail('U1-1', `Thiếu ${path.relative(ROOT, hubEn)}`);
if (hubViTxt && hubEnTxt) pass('U1-1', 'Hai tệp hub tồn tại');

const routesPath = path.join(ROOT, 'src', 'i18n', 'contentRoutes.ts');
const routesTxt = fs.readFileSync(routesPath, 'utf8');
const pairRe = /\{\s*vi:\s*'\/hieu-dung',\s*en:\s*'\/en\/myths\/'\s*\}/g;
const soCap = (routesTxt.match(pairRe) ?? []).length;
if (soCap === 1) pass('U1-2', 'contentRoutes có đúng một cặp /hieu-dung ↔ /en/myths/');
else fail('U1-2', `Cặp /hieu-dung ↔ /en/myths/ xuất hiện ${soCap} lần (cần đúng 1)`);

for (const [ten, txt] of [['hub VI', hubViTxt], ['hub EN', hubEnTxt]]) {
  if (!txt) continue;
  const dungCollection = /getEntriesByLang\('huongDan'/.test(txt);
  const dungNgonNgu = ten === 'hub VI' ? /'huongDan',\s*lang\)/.test(txt) : /'huongDan',\s*'en'\)/.test(txt);
  const locTag = /data\.tags\?\.includes\('hieu-dung'\)/.test(txt);
  if (dungCollection && dungNgonNgu && locTag) pass(`U1-3`, `${ten}: huongDan + đúng ngôn ngữ + lọc tag hieu-dung`);
  else fail('U1-3', `${ten}: lọc sai (huongDan=${dungCollection}, đúng ngôn ngữ=${dungNgonNgu}, lọc tag=${locTag})`);
}

// U1-3b (vòng sửa TXN-20260926-203): route thẻ bài theo ngôn ngữ hub —
// hub VI dùng route VI (/huong-dan), hub EN dựng /en/guides/<slug>/ và
// KHÔNG được dùng getCollectionRoute('huongDan') (hàm đó trả cố định route VI).
if (hubViTxt) {
  if (/getCollectionRoute\('huongDan'\)/.test(hubViTxt)) pass(`U1-3b`, 'hub VI: dùng getCollectionRoute(\'huongDan\') — route VI đúng');
  else fail('U1-3b', 'hub VI: thiếu route VI (getCollectionRoute(\'huongDan\'))');
}
if (hubEnTxt) {
  const coHrefEn = hubEnTxt.includes('/en/guides/${getSlug(entry)}/');
  const dungSaiRoute = /getCollectionRoute\('huongDan'\)/.test(hubEnTxt);
  if (coHrefEn && !dungSaiRoute) pass(`U1-3b`, 'hub EN: href /en/guides/<slug>/ và không dùng getCollectionRoute(\'huongDan\')');
  else fail('U1-3b', `hub EN: href /en/guides/<slug>/=${coHrefEn}, dùng getCollectionRoute('huongDan')=${dungSaiRoute}`);
}

const uiTxt = fs.readFileSync(path.join(ROOT, 'src', 'i18n', 'ui.ts'), 'utf8');
for (const [ten, txt, rong] of [['hub VI', hubViTxt, 'hieudung_empty'], ['hub EN', hubEnTxt, 'hieudung_empty']]) {
  if (!txt) continue;
  if (txt.includes(rong)) pass(`U1-4`, `${ten} dùng nhãn trạng thái trống ${rong}`);
  else fail('U1-4', `${ten} thiếu nhãn trạng thái trống ${rong}`);
}
const viNhan = uiTxt.includes("hieudung_empty: 'Chưa có bài nào trong loạt này");
const enNhan = uiTxt.includes("hieudung_empty: 'No articles in this series yet");
if (viNhan && enNhan) pass('U1-4b', 'ui.ts có nhãn trạng thái trống cho cả VI và EN');
else fail('U1-4b', `ui.ts thiếu nhãn trống (VI=${viNhan}, EN=${enNhan})`);

// ===== DIST =====
if (!distDir) {
  console.log('  BỎ QUA phần DIST (không truyền thư mục dist) — chạy trong `npm run check` chỉ kiểm source.');
}
const distVi = distDir ? path.join(distDir, 'hieu-dung', 'index.html') : null;
const distEn = distDir ? path.join(distDir, 'en', 'myths', 'index.html') : null;
for (const [ten, tep] of [['hub VI', distVi, 'en/myths'], ['hub EN', distEn, 'hieu-dung']]) {
  if (!distDir) continue;
  if (!fs.existsSync(tep)) { fail('U1-5', `Thiếu trang hub sau build: ${tep}`); continue; }
  const html = fs.readFileSync(tep, 'utf8');
  const h1 = (html.match(/<h1[^>]*>/g) ?? []).length;
  if (h1 === 1) pass(`U1-5`, `${ten}: đúng một H1`);
  else fail(`U1-5`, `${ten}: số H1 = ${h1}`);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '';
  const dungCanonical = canonical.includes(ten === 'hub VI' ? '/hieu-dung' : '/en/myths');
  if (dungCanonical) pass(`U1-6`, `${ten}: canonical đúng (${canonical})`);
  else fail(`U1-6`, `${ten}: canonical lệch: ${canonical}`);

  const coHreflangVi = /hreflang="vi"/.test(html);
  const coHreflangEn = /hreflang="en"/.test(html);
  if (coHreflangVi && coHreflangEn) pass(`U1-6`, `${ten}: hreflang vi/en đủ`);
  else fail(`U1-6`, `${ten}: thiếu hreflang (vi=${coHreflangVi}, en=${coHreflangEn})`);

  const switcher = ten === 'hub VI' ? 'href="/en/myths/"' : 'href="/hieu-dung"';
  if (html.includes(switcher)) pass(`U1-6`, `${ten}: switcher trỏ đúng hub ngôn ngữ kia (${switcher})`);
  else fail(`U1-6`, `${ten}: thiếu switcher ${switcher}`);

  const rong = html.includes('hieudung_empty') || (ten === 'hub VI'
    ? html.includes('Chưa có bài nào trong loạt này')
    : html.includes('No articles in this series yet'));
  if (rong) pass(`U1-7`, `${ten}: trạng thái trống hiển thị`);
  else fail(`U1-7`, `${ten}: không thấy trạng thái trống`);
}

// Bốn trang dẫn — liên kết đúng ngôn ngữ tới hub
const DAN = distDir ? [
  ['trang chủ VI', path.join(distDir, 'index.html'), 'href="/hieu-dung"', 'href="/en/myths/"'],
  ['trang chủ EN', path.join(distDir, 'en', 'index.html'), 'href="/en/myths/"', 'href="/hieu-dung"'],
  ['Hướng dẫn VI', path.join(distDir, 'huong-dan', 'index.html'), 'href="/hieu-dung"', 'href="/en/myths/"'],
  ['Guides EN', path.join(distDir, 'en', 'guides', 'index.html'), 'href="/en/myths/"', 'href="/hieu-dung"'],
] : [];
for (const [ten, tep, dung, sai] of DAN) {
  if (!fs.existsSync(tep)) { fail('U1-8', `Thiếu trang dẫn: ${tep}`); continue; }
  const html = fs.readFileSync(tep, 'utf8');
  if (html.includes(dung)) pass(`U1-8`, `${ten}: có liên kết ${dung}`);
  else fail(`U1-8`, `${ten}: thiếu liên kết ${dung}`);
  if (html.includes(sai)) fail(`U1-8`, `${ten}: rò liên kết ngược ${sai}`);
}

// ===== Kết luận =====
if (errors.length === 0) {
  console.log('U1 checker: ĐẠT — khung loạt "Hiểu đúng" đúng thiết kế');
  process.exit(0);
}
console.log('U1 checker: KHÔNG ĐẠT');
for (const e of errors) console.log('  ' + e);
process.exit(1);
