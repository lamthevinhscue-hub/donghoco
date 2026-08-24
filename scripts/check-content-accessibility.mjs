// =============================================================================
// check-content-accessibility.mjs — Kiểm tra tĩnh nội dung hình ảnh, reflow/
// zoom và nhãn link (WCAG 1.1.1, 1.4.4, 1.4.10, 2.4.4), không cần package ngoài.
// =============================================================================
// Chạy: npm run check:a11y-content
//
// Kiểm tra trên mã nguồn src/:
// 1. <img> thiếu thuộc tính alt → lỗi.
// 2. alt kém mô tả: là tên file (có đuôi ảnh), hoặc chỉ "image/ảnh/photo" → lỗi.
//    alt="" hợp lệ khi ảnh là trang trí (HTML semantics) — không bị flag.
// 3. Meta viewport chặn zoom (user-scalable=no / maximum-scale=1..1.0) → lỗi;
//    CSS chặn zoom trên toàn trang (html/body touch-action:none) → lỗi.
//    touch-action:none trên CONTROL kéo chủ đích (bezel, kim đồng hồ) là hợp lệ.
// 4. overflow-hidden đi cùng chiều cao cố định (h-[N] / height:Npx / max-h-[N])
//    trên phần tử có thể chứa văn bản → cảnh báo lỗi trừ khi thẻ có
//    data-a11y-overflow-note="..." ghi lý do ngoại lệ.
// 5. Link có nhãn quá chung chung (đọc độc lập: "đọc tiếp", "xem thêm",
//    "tại đây"...) và không có aria-label/aria-labelledby → lỗi.
//
// Giới hạn: kiểm tĩnh — cảm giác reflow thật ở 320px/zoom 200% cần kiểm
// thủ công trên trình duyệt. Exit 1 nếu lỗi.
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
    else if (/\.(astro|ts|css|md)$/.test(name)) out.push(p);
  }
  return out;
}

const files = walk('src');
const BAD_ALT = /^(image|ảnh|anh|photo|picture|hình ảnh|hình)$/i;
const FILENAME_ALT = /\.(jpe?g|png|webp|svg|gif|avif)$/i;

// ----- 1 + 2. img alt -----
{
  let noAlt = 0;
  let badAlt = 0;
  let imgCount = 0;
  for (const f of files) {
    if (!f.endsWith('.astro') && !f.endsWith('.md')) continue;
    const s = read(f);
    const tags = s.match(/<img\b[^>]*>/g) || [];
    tags.forEach((tag) => {
      imgCount++;
      // Tag <img> trần không attr (thường trong comment mã) — bỏ qua
      if (!/\ssrc=/.test(tag)) return;
      // Bắt cả alt="chuỗi tĩnh" lẫn alt={biểu thức Astro}
      const altM = tag.match(/\salt=({[^}]*}|"[^"]*")/);
      if (!altM) {
        noAlt++;
        fail(relative('.', f) + ': <img> thiếu alt: ' + tag.slice(0, 70));
        return;
      }
      // alt động ({...}) — giá trị do Astro render lúc build, không kiểm tĩnh được giá trị
      if (altM[1].startsWith('{')) return;
      const alt = altM[1].trim();
      if (alt === '') return; // trang trí — hợp lệ theo HTML
      if (BAD_ALT.test(alt) || FILENAME_ALT.test(alt)) {
        badAlt++;
        fail(relative('.', f) + ': alt kém mô tả "' + alt + '": ' + tag.slice(0, 60));
      }
    });
  }
  if (noAlt === 0) ok('Mọi <img> (' + imgCount + ') đều có thuộc tính alt');
  if (badAlt === 0) ok('Không có alt là tên file hoặc nhãn chung "image/ảnh/photo"');
}

// ----- 3. Zoom không bị chặn -----
{
  const s = read('src/layouts/BaseLayout.astro');
  const vp = s.match(/<meta name="viewport"[^>]*>/);
  if (vp && /user-scalable\s*=\s*no|maximum-scale\s*=\s*1(\.0)?["\s]/i.test(vp[0])) {
    fail('BaseLayout: meta viewport chặn zoom: ' + vp[0]);
  } else {
    ok('Meta viewport không chặn zoom (không có user-scalable=no / maximum-scale=1)');
  }
  let badCss = 0;
  for (const f of files.filter((x) => x.endsWith('.css') || x.endsWith('.astro'))) {
    const s2 = read(f);
    // touch-action:none trên html/body chặn cử chỉ toàn trang
    if (/(html|body)[^{]*\{[^}]*touch-action:\s*none/i.test(s2)) {
      badCss++;
      fail(relative('.', f) + ': touch-action:none áp lên html/body (chặn zoom/chạm toàn trang)');
    }
  }
  if (badCss === 0) ok('Không có CSS chặn zoom trên html/body (touch-action:none trên control kéo riêng là hợp lệ)');
}

// ----- 4. overflow-hidden + chiều cao cố định trên vùng văn bản -----
{
  let bad = 0;
  let flagged = 0;
  for (const f of files.filter((x) => x.endsWith('.astro'))) {
    const s = read(f);
    const tags = s.match(/<[a-z][^>]*>/g) || [];
    tags.forEach((tag) => {
      if (!/overflow-hidden/.test(tag)) return;
      const fixedH = /(?<![\w-])h-\[\d+(?:px|rem|vh)?\]|max-h-\[\d+|height:\s*\d+px/.test(tag);
      if (!fixedH) return;
      if (/data-a11y-overflow-note=/.test(tag)) return; // ngoại lệ có ghi chú
      flagged++;
      // Chỉ lỗi khi phần tử có vẻ chứa văn bản (có class chữ/text hoặc khoảng trắng nội dung)
      const looksTextual = /text-(?:xs|sm|base|lg|xl)|prose|line-clamp/.test(tag);
      if (looksTextual) {
        bad++;
        fail(relative('.', f) + ': overflow-hidden + chiều cao cố định trên vùng văn bản (thêm data-a11y-overflow-note nếu có lý do): ' + tag.slice(0, 70).replace(/\s+/g, ' '));
      }
    });
  }
  if (bad === 0) ok('Không có overflow-hidden + chiều cao cố định trên vùng văn bản' + (flagged ? ' (' + flagged + ' trường hợp không phải văn bản)' : ''));
}

// ----- 5. Link nhãn chung chung -----
{
  const GENERIC = /^(đọc tiếp|xem thêm|xem tiếp|xem chi tiết|chi tiết|tại đây|nhấn vào đây|here|click here|read more|view more|link)$/i;
  let bad = 0;
  let linkCount = 0;
  for (const f of files.filter((x) => x.endsWith('.astro'))) {
    const s = read(f);
    const tags = s.match(/<a\b[^>]*>(?:(?!<\/a>)[\s\S]){0,200}?<\/a>/g) || [];
    tags.forEach((t) => {
      linkCount++;
      const open = t.slice(0, t.indexOf('>'));
      if (/aria-label=|aria-labelledby=/.test(open)) return;
      const inner = t.slice(t.indexOf('>') + 1, t.lastIndexOf('</a>'));
      const textOnly = inner.replace(/<[^>]*>/g, '').replace(/\{[^}]*\}/g, '').replace(/[→\s]+/g, ' ').trim();
      if (textOnly && GENERIC.test(textOnly)) {
        bad++;
        fail(relative('.', f) + ': link nhãn chung chung "' + textOnly + '" thiếu ngữ cảnh/aria-label: ' + open.slice(0, 70).replace(/\s+/g, ' '));
      }
    });
  }
  if (bad === 0) ok('Không có link nhãn chung chung đọc độc lập (' + linkCount + ' link trong template)');
}

// ----- 6. Vùng cuộn bảng phải dùng được bằng bàn phím (WCAG 2.1.1) -----
{
  // Plugin bọc bảng tại build: wrapper phải đủ tabIndex + role region + ariaLabel
  const plugin = read('src/plugins/rehype-wrap-tables.mjs');
  const need = [/tabIndex:\s*0/, /role:\s*'region'/, /ariaLabel:\s*'/];
  const names = ['tabIndex: 0', "role: 'region'", 'ariaLabel'];
  const missingP = names.filter((n, i) => !need[i].test(plugin));
  if (missingP.length === 0) ok('rehype-wrap-tables: wrapper có tabIndex 0 + role region + ariaLabel');
  else fail('rehype-wrap-tables: wrapper thiếu ' + missingP.join(', '));

  // BaseLayout: bù thuộc tính cho wrapper sẵn có + điều khiển bàn phím 4 phím
  const base = read('src/layouts/BaseLayout.astro');
  const baseAttrs = /hasAttribute\('tabindex'\)/.test(base) && /hasAttribute\('role'\)/.test(base) && /hasAttribute\('aria-label'\)/.test(base);
  if (baseAttrs) ok('BaseLayout: bù tabindex/role/aria-label cho .table-scroll-wrap thiếu');
  else fail('BaseLayout: thiếu cơ chế bù tabindex/role/aria-label cho wrapper');

  const keyHandler = /ArrowRight/.test(base) && /ArrowLeft/.test(base) && /'Home'/.test(base) && /'End'/.test(base);
  if (keyHandler) ok('BaseLayout: .table-scroll-wrap xử lý ArrowLeft/ArrowRight/Home/End bằng bàn phím');
  else fail('BaseLayout: .table-scroll-wrap thiếu điều khiển bàn phím ArrowLeft/ArrowRight/Home/End');
}

console.log('');
if (errors.length > 0) {
  console.log('CÓ ' + errors.length + ' LỖI — xem trên.');
  process.exit(1);
}
console.log('Tất cả kiểm tra nội dung tĩnh đạt. (Reflow/zoom thật ở 320px/200% cần kiểm thủ công trên trình duyệt.)');
