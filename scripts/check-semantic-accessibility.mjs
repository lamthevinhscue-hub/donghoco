// =============================================================================
// check-semantic-accessibility.mjs — Kiểm tra tĩnh cấu trúc ngữ nghĩa HTML tối
// thiểu (WCAG 1.3.1 / 4.1.2), không cần trình duyệt hay package ngoài.
// =============================================================================
// Chạy: npm run check:a11y-semantics
//
// Kiểm tra trên mã nguồn src/:
// 1. BaseLayout có lang trên <html>, skip link và <main>.
// 2. Mỗi template trang (.astro trong src/pages) có đúng MỘT <h1> (template
//    [slug] dùng chung cho nhiều bài — tính 1 h1 trên template).
// 3. Heading không nhảy quá một cấp trong cùng template (theo thứ tự xuất hiện).
// 4. input/textarea/select phải có <label for> tương ứng hoặc aria-label/title.
// 5. Form liên hệ: field required phải có aria-describedby nối với phần tử lỗi.
// 6. Nút chỉ có icon phải có aria-label hoặc nội dung sr-only.
//
// Giới hạn: kiểm tĩnh — nội dung Markdown/bảng do JS render cần xem thủ công.
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const errors = [];
const ok = (msg) => console.log('ĐẠT  ' + msg);
const fail = (msg) => {
  errors.push(msg);
  console.log('LỖI  ' + msg);
};
const read = (p) => readFileSync(p, 'utf8');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith('.astro')) out.push(p);
  }
  return out;
}

// ----- 1. BaseLayout: lang + skip link + main -----
{
  const s = read('src/layouts/BaseLayout.astro');
  if (/<html[^>]*\slang=/.test(s)) ok('BaseLayout: <html> có thuộc tính lang');
  else fail('BaseLayout: <html> thiếu lang');

  if (/href="#main-content"/.test(s)) ok('BaseLayout: có skip link tới #main-content');
  else fail('BaseLayout: thiếu skip link');

  const mainTag = s.match(/<main[^>]*>/);
  if (mainTag) ok('BaseLayout: có <main>');
  else fail('BaseLayout: thiếu <main>');
}

// ----- 2 + 3. Mỗi trang 1 h1; heading không nhảy quá 1 cấp -----
{
  const pages = walk('src/pages');
  let h1Bad = 0;
  let jumpBad = 0;
  for (const p of pages) {
    const s = read(p);
    // Chỉ phần template (sau frontmatter thứ nhất)
    const body = s.slice(s.indexOf('---', 3) + 3);
    const h1s = (body.match(/<h1[\s>]/g) || []).length;
    if (h1s > 1) {
      h1Bad++;
      fail(relative('.', p) + ': có ' + h1s + ' thẻ <h1> (chỉ cho phép 1)');
    }
    const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
    let prev = 0;
    for (const lvl of levels) {
      if (prev && lvl > prev + 1) {
        jumpBad++;
        fail(relative('.', p) + ': heading nhảy h' + prev + ' → h' + lvl);
      }
      prev = lvl;
    }
  }
  if (h1Bad === 0) ok('Mọi template trang có tối đa 1 <h1> (' + pages.length + ' trang)');
  if (jumpBad === 0) ok('Không có heading nhảy quá một cấp trong template');
}

// ----- 4. Input/textarea/select phải có label hoặc aria-label -----
{
  const files = walk('src');
  let noLabel = 0;
  for (const f of files) {
    const s = read(f);
    const tags = s.match(/<(input|textarea|select)\b[^>]*>/g) || [];
    tags.forEach((tag) => {
      if (/type="hidden"/.test(tag)) return;
      if (/aria-label=|aria-labelledby=/.test(tag)) return;
      const idM = tag.match(/\sid="([^"]+)"/);
      if (idM) {
        const id = idM[1];
        // Tìm label for tương ứng trong cùng file
        const labelRe = new RegExp('<label[^>]*for="' + id + '"');
        if (labelRe.test(s)) return;
      }
      if (/title=/.test(tag)) return;
      noLabel++;
      fail(relative('.', f) + ': <' + tag.slice(1, 9).trim() + '> thiếu label/aria-label: ' + tag.slice(0, 70).replace(/\s+/g, ' '));
    });
  }
  if (noLabel === 0) ok('Mọi input/textarea/select đều có label hoặc aria-label');
}

// ----- 5. Form liên hệ: required phải nối với phần tử lỗi qua aria-describedby -----
{
  const s = read('src/pages/lien-he.astro');
  const requireds = s.match(/<(input|textarea)\b[^>]*required[^>]*>/g) || [];
  let bad = 0;
  requireds.forEach((tag) => {
    const idM = tag.match(/\sid="([^"]+)"/);
    if (!idM) return;
    const described = tag.match(/aria-describedby="([^"]+)"/);
    const errId = idM[1] + '-error';
    if (!described || !described[1].includes(errId) || !s.includes('id="' + errId + '"')) {
      bad++;
      fail('lien-he.astro: field "' + idM[1] + '" required thiếu aria-describedby nối "' + errId + '"');
    }
  });
  if (bad === 0 && requireds.length > 0) {
    ok('Form liên hệ: ' + requireds.length + ' field required đều nối aria-describedby với phần tử lỗi');
  }
}

// ----- 5b. Field required phải có chữ "bắt buộc/required" trong label -----
{
  const s = read('src/pages/lien-he.astro');
  const requireds = s.match(/<(input|textarea)\b[^>]*required[^>]*>/g) || [];
  let bad = 0;
  requireds.forEach((tag) => {
    const idM = tag.match(/\sid="([^"]+)"/);
    if (!idM) return;
    const labelBlock = s.match(new RegExp('<label[^>]*for="' + idM[1] + '"[\\s\\S]*?</label>'));
    const labelText = labelBlock ? labelBlock[0] : '';
    if (!/bắt buộc|required/.test(labelText)) {
      bad++;
      fail('lien-he.astro: label của field "' + idM[1] + '" (required) thiếu text "bắt buộc/required" (hiện thị hoặc sr-only)');
    }
  });
  if (bad === 0 && requireds.length > 0) {
    ok('Form liên hệ: mọi field required đều có text "bắt buộc/required" trong label');
  }
}

// ----- 5c. Thẻ đóng không khớp: <div ...>...</hN> hoặc <hN ...>...</hM>/<div> -----
{
  const files = walk('src');
  let bad = 0;
  for (const f of files) {
    const lines = read(f).split(/\r?\n/);
    lines.forEach((line, i) => {
      // Bắt cặp mở/đóng trên cùng dòng: <div ...>nội dung</hN> hoặc <hN ...>nội dung</hM|/div>
      const m = line.match(/<(div|h[1-6])\b[^>]*>[^<]*<\/(div|h[1-6])>/);
      if (m && m[1] !== m[2]) {
        bad++;
        fail(relative('.', f) + ':' + (i + 1) + ': thẻ mở <' + m[1] + '> đóng bằng </' + m[2] + '> không khớp: ' + line.trim().slice(0, 70));
      }
    });
  }
  if (bad === 0) ok('Không có thẻ mở/đóng heading-div không khớp trong src/');
}

// ----- 6. Nút icon-only phải có aria-label / sr-only -----
{
  const files = walk('src');
  let noLabel = 0;
  for (const f of files) {
    const s = read(f);
    const tags = s.match(/<button[^>]*>(?:(?!<\/button>)[\s\S]){0,300}?<\/button>/g) || [];
    tags.forEach((t) => {
      const open = t.slice(0, t.indexOf('>'));
      const inner = t.slice(t.indexOf('>') + 1, t.lastIndexOf('</button>'));
      // Chỉ strip thẻ HTML — GIỮ nguyên biểu thức {biến} vì đó là text thật
      const textOnly = inner.replace(/<[^>]*>/g, '').trim();
      const hasVisibleText = textOnly.length > 0;
      const hasLabel = /aria-label/.test(open) || /sr-only/.test(inner);
      if (!hasVisibleText && !hasLabel) {
        noLabel++;
        fail(relative('.', f) + ': nút icon-only thiếu aria-label: ' + open.slice(0, 70).replace(/\s+/g, ' '));
      }
    });
  }
  if (noLabel === 0) ok('Mọi nút icon-only đều có aria-label hoặc nội dung sr-only');
}

console.log('');
if (errors.length > 0) {
  console.log('CÓ ' + errors.length + ' LỖI — xem trên.');
  process.exit(1);
}
console.log('Tất cả kiểm tra ngữ nghĩa tĩnh đạt. (Nội dung Markdown/bảng JS render cần kiểm thủ công.)');
