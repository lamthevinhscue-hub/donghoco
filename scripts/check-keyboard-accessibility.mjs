// =============================================================================
// check-keyboard-accessibility.mjs — Kiểm tra tĩnh tối thiểu cho khả năng
// dùng bàn phím/focus (WCAG 2.2), không cần trình duyệt hay package ngoài.
// =============================================================================
// Chạy: npm run check:a11y-keyboard
//
// Kiểm tra (đọc nguồn .astro trong src/):
// 1. BaseLayout có skip link trỏ tới #main-content; <main> có id tương ứng
//    và tabindex="-1" (để focus() vào được khi nhấn skip link).
// 2. Header có aria-controls cho menu mobile ("mobile-menu") và cho 2 dropdown.
// 3. SearchBox: nút mở có aria-controls="search-overlay" + aria-expanded;
//    dialog có role="dialog", aria-modal, focus trap (xử lý phím Tab).
// 4. Không dùng outline-none / focus:outline-none nếu trong cùng dòng không
//    có cơ chế focus thay thế (focus:border-*, focus:ring, focus-visible:outline).
//
// Giới hạn: kiểm tra TĨNH mã nguồn — hành vi thật (phím thật, focus thật,
// thứ tự tab) vẫn phải kiểm thủ công trên trình duyệt. Exit 1 nếu lỗi.
// =============================================================================

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const read = (p) => readFileSync(p, 'utf8');
const errors = [];
const ok = (msg) => console.log('ĐẠT  ' + msg);
const fail = (msg) => {
  errors.push(msg);
  console.log('LỖI  ' + msg);
};

// ----- 1. Skip link + main trong BaseLayout -----
{
  const s = read('src/layouts/BaseLayout.astro');
  if (/href="#main-content"/.test(s)) ok('BaseLayout: skip link trỏ tới #main-content');
  else fail('BaseLayout: thiếu skip link href="#main-content"');

  const mainTag = s.match(/<main[^>]*>/);
  if (mainTag && /id="main-content"/.test(mainTag[0])) ok('BaseLayout: <main> có id="main-content"');
  else fail('BaseLayout: <main> thiếu id="main-content"');
  if (mainTag && /tabindex="-1"/.test(mainTag[0])) ok('BaseLayout: <main> có tabindex="-1"');
  else fail('BaseLayout: <main> thiếu tabindex="-1"');
}

// ----- 2. Header: aria-controls cho menu mobile + dropdown -----
{
  const s = read('src/components/Header.astro');
  if (/aria-controls="mobile-menu"/.test(s)) ok('Header: nút hamburger có aria-controls="mobile-menu"');
  else fail('Header: nút hamburger thiếu aria-controls="mobile-menu"');

  const ddControls = [...s.matchAll(/aria-controls="(nav-dropdown-[a-z-]+)"/g)].map((m) => m[1]);
  const ddIds = [...s.matchAll(/id="(nav-dropdown-[a-z-]+)"/g)].map((m) => m[1]);
  if (ddControls.length >= 2 && ddIds.length >= 2 && ddControls.every((c) => ddIds.includes(c))) {
    ok('Header: 2 dropdown có aria-controls khớp id menu (' + ddControls.join(', ') + ')');
  } else {
    fail('Header: dropdown thiếu aria-controls hoặc id không khớp (controls: ' + ddControls + ', ids: ' + ddIds + ')');
  }
  if (/aria-expanded/.test(s)) ok('Header: có aria-expanded trên nút menu');
  else fail('Header: thiếu aria-expanded');
}

// ----- 3. SearchBox: dialog + focus trap -----
{
  const s = read('src/components/SearchBox.astro');
  if (/id="search-trigger"/.test(s)) {
    const btn = s.slice(s.indexOf('id="search-trigger"'), s.indexOf('>', s.indexOf('id="search-trigger"')));
    if (/aria-controls="search-overlay"/.test(btn)) ok('SearchBox: nút mở có aria-controls="search-overlay"');
    else fail('SearchBox: nút mở thiếu aria-controls="search-overlay"');
    if (/aria-expanded/.test(btn)) ok('SearchBox: nút mở có aria-expanded');
    else fail('SearchBox: nút mở thiếu aria-expanded');
  } else {
    fail('SearchBox: không tìm thấy nút mở (id="search-trigger")');
  }
  if (/role="dialog"/.test(s)) ok('SearchBox: dialog có role="dialog"');
  else fail('SearchBox: dialog thiếu role="dialog"');
  if (/aria-modal="true"/.test(s)) ok('SearchBox: dialog có aria-modal="true"');
  else fail('SearchBox: dialog thiếu aria-modal="true"');
  if (/aria-labelledby/.test(s)) ok('SearchBox: dialog có aria-labelledby');
  else fail('SearchBox: dialog thiếu aria-labelledby');
  // Focus trap: keydown xử lý Tab trong overlay
  const overlayIdx = s.indexOf("overlay.addEventListener('keydown'");
  if (overlayIdx !== -1 && s.slice(overlayIdx, overlayIdx + 300).includes("Tab")) {
    ok('SearchBox: có focus trap (keydown Tab trong overlay)');
  } else {
    fail('SearchBox: thiếu focus trap Tab trong overlay');
  }
}

// ----- 4. outline-none phải có cơ chế focus thay thế -----
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(astro|ts)$/.test(name)) out.push(p);
  }
  return out;
}
{
  const files = walk('src');
  let flagged = 0;
  for (const f of files) {
    const lines = read(f).split(/\r?\n/);
    lines.forEach((line, i) => {
      if (!/outline-none/.test(line)) return;
      const hasAlt =
        /focus:border-/.test(line) ||
        /focus:ring/.test(line) ||
        /focus-visible:outline/.test(line) ||
        /focus-visible:ring/.test(line);
      if (!hasAlt) {
        flagged++;
        fail(relative('.', f) + ':' + (i + 1) + ' dùng outline-none không có focus thay thế (focus:border-*/focus:ring/focus-visible:outline)');
      }
    });
  }
  if (flagged === 0) ok('Không có outline-none thiếu cơ chế focus thay thế trong src/');
}

console.log('');
if (errors.length > 0) {
  console.log('CÓ ' + errors.length + ' LỖI — xem trên.');
  process.exit(1);
}
console.log('Tất cả kiểm tra bàn phím tĩnh đạt. (Hành vi phím thật cần kiểm thủ công trên trình duyệt.)');
