// =============================================================================
// check-motion-accessibility.mjs — Kiểm tra tĩnh khả năng tiếp cận hoạt ảnh/
// infographic/3D (WCAG 2.2.2, 2.3.1, 2.5.1, 2.5.7, 2.5.8), không cần package ngoài.
// =============================================================================
// Chạy: npm run check:a11y-motion
//
// Kiểm tra trên mã nguồn src/:
// 1. global.css có khối @media (prefers-reduced-motion: reduce).
// 2. Wrapper hoạt ảnh chính (MechanismAnimation) có nút Play/Pause (aria-label
//    + aria-pressed) và KHÔNG tự phát (không gọi playBtn.click()/setPlaying(true)
//    khi khởi tạo).
// 3. exploded3d.ts: đọc prefers-reduced-motion (không auto-rotate/auto-chuyển
//    động khi bật) và cung cấp nút dừng chuyển động.
// 4. WatchExplodedView3D.astro: có đủ nút thay thế thao tác kéo
//    (xoay trái/phải, phóng to, thu nhỏ) + nút đặt lại + danh sách bộ phận
//    dạng button (text fallback cho người không dùng 3D).
// 5. WatchExplodedView.astro (2D): có quick-pick button + panel chi tiết
//    aria-live (thông tin bộ phận là text HTML thật).
// 6. Không để lặp vô hạn CSS (animation-iteration-count: infinite) trong src/
//    ngoài các gì global.css đã ép giảm về 0.01ms khi prefers-reduced-motion.
// 7. SVG trong infographic/interactive phải aria-hidden hoặc có text thay thế
//    (legend/panel) — kiểm tra mọi <svg> topLevel có aria-hidden.
//
// Giới hạn: kiểm tĩnh — cảm giác chuyển động thật, cảm ứng kéo 3D cần kiểm
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
    else if (name.endsWith('.astro') || name.endsWith('.ts')) out.push(p);
  }
  return out;
}

// ----- 1. global.css có prefers-reduced-motion -----
{
  const s = read('src/styles/global.css');
  if (/@media \(prefers-reduced-motion: reduce\)/.test(s)) {
    ok('global.css: có khối @media (prefers-reduced-motion: reduce)');
  } else {
    fail('global.css: thiếu @media (prefers-reduced-motion: reduce)');
  }
}

// ----- 2. MechanismAnimation: Play/Pause đầy đủ + không autoplay -----
{
  const s = read('src/components/infographics/MechanismAnimation.astro');
  if (/class="play-btn/.test(s) && /aria-label="Phát hoạt ảnh"/.test(s) && /aria-pressed/.test(s)) {
    ok('MechanismAnimation: nút Play/Pause có aria-label + aria-pressed');
  } else {
    fail('MechanismAnimation: nút Play/Pause thiếu aria-label/aria-pressed');
  }
  const autoplay = /setPlaying\(true\)(?!\s*\*)/.test(s) && !/playBtn\?\.click/.test(s);
  if (!/setPlaying\(true\)/.test(s.replace(/setPlaying\(!isPlaying\)/, ''))) {
    ok('MechanismAnimation: không tự phát khi tải trang (isPlaying mặc định false)');
  } else {
    fail('MechanismAnimation: phát hiện gọi setPlaying(true) khi khởi tạo (autoplay?)');
  }
  if (/md:sr-only/.test(s)) ok('MechanismAnimation: legend tên bộ phận là text thay thế (sr-only trên desktop)');
  else fail('MechanismAnimation: legend tên bộ phận thiếu (text thay thế cho SVG aria-hidden)');
}

// ----- 3. exploded3d.ts: reduced-motion + nút dừng chuyển động -----
{
  const s = read('src/scripts/exploded3d.ts');
  if (/prefers-reduced-motion/.test(s)) ok('exploded3d.ts: đọc prefers-reduced-motion (không auto-rotate/tự tách lớp)');
  else fail('exploded3d.ts: thiếu xử lý prefers-reduced-motion');

  const m = read('src/components/WatchExplodedView3D.astro');
  if (/motion-toggle-3d/.test(m) && /aria-pressed/.test(m)) {
    ok('WatchExplodedView3D: có nút "Chuyển động 3D" toggle (aria-pressed)');
  } else {
    fail('WatchExplodedView3D: thiếu nút dừng/chạy chuyển động');
  }
}

// ----- 4. WatchExplodedView3D: nút thay thế kéo + text fallback -----
{
  const s = read('src/components/WatchExplodedView3D.astro');
  const need = [
    ['rot-left-3d', 'nút xoay trái'],
    ['rot-right-3d', 'nút xoay phải'],
    ['zoom-in-3d', 'nút phóng to'],
    ['zoom-out-3d', 'nút thu nhỏ'],
    ['reset-view-3d', 'nút đặt lại góc nhìn'],
  ];
  let missing = [];
  for (const [id, name] of need) {
    if (!s.includes(id)) missing.push(name);
  }
  if (missing.length === 0) ok('WatchExplodedView3D: đủ nút thay thế thao tác kéo (xoay trái/phải, phóng to, thu nhỏ, đặt lại)');
  else fail('WatchExplodedView3D: thiếu ' + missing.join(', '));

  if (/part-quick-3d/.test(s)) ok('WatchExplodedView3D: có danh sách bộ phận dạng button (text fallback, không phụ thuộc WebGL)');
  else fail('WatchExplodedView3D: thiếu danh sách bộ phận text fallback');

  // Bản 2D vẫn còn là phương án thay thế
  const g = read('src/pages/giai-phau.astro');
  if (/WatchExplodedView(\s|\/>)/.test(g) && /tab-anatomy-2d/.test(g)) {
    ok('giai-phau: giữ bản 2D làm chế độ mặc định + phương án thay thế 3D');
  } else {
    fail('giai-phau: thiếu bản 2D mặc định');
  }
}

// ----- 5. WatchExplodedView 2D: aria-live + button chọn bộ phận -----
{
  const s = read('src/components/WatchExplodedView.astro');
  if (/id="detail-card"[^>]*aria-live="polite"/.test(s)) ok('WatchExplodedView 2D: panel chi tiết aria-live="polite" (text HTML thật)');
  else fail('WatchExplodedView 2D: panel chi tiết thiếu aria-live');
  if (/part-quick/.test(s) && /aria-pressed/.test(s)) ok('WatchExplodedView 2D: nút chọn bộ phận + aria-pressed');
  else fail('WatchExplodedView 2D: nút chọn bộ phận thiếu aria-pressed');
  if (/id="exploded-svg"[^>]*aria-hidden="true"/.test(s)) ok('WatchExplodedView 2D: SVG đánh dấu aria-hidden (có text thay thế)');
  else fail('WatchExplodedView 2D: SVG thiếu aria-hidden');
}

// ----- 6. Không animation CSS lặp vô hạn ngoài tầm kiểm soát RM -----
{
  const files = walk('src');
  let bad = 0;
  for (const f of files) {
    const s = read(f);
    if (/animation:[^;]*infinite/.test(s) || /animation-iteration-count:\s*infinite/.test(s)) {
      // Cho phép nếu CÙNG FILE có reduced-motion xử lý; global.css đã ép toàn site
      if (!/prefers-reduced-motion/.test(s) && !f.endsWith('global.css')) {
        bad++;
        fail(relative('.', f) + ': animation infinite không có xử lý reduced-motion trong file');
      }
    }
  }
  if (bad === 0) ok('Không có animation infinite lọt ngoài cơ chế reduced-motion toàn cục');
}

// ----- 7. SVG minh họa phải PHÂN LOẠI rõ: trang trí HOẶC có ý nghĩa -----
// Hai nhóm hợp lệ:
//   - Trang trí: aria-hidden="true" (thông tin có ở text HTML thay thế bên ngoài)
//   - Có ý nghĩa: role="img" + aria-label không rỗng
// Lỗi: SVG vừa aria-hidden vừa role="img"/aria-label (xung đột — SR bỏ qua
// dù có nhãn), hoặc chưa thuộc nhóm nào.
{
  const files = [...walk('src/components/infographics'), ...walk('src/components/interactive')];
  let bad = 0;
  for (const f of files) {
    const s = read(f);
    const opens = s.match(/<svg\b[^>]*>/g) || [];
    opens.forEach((tag) => {
      const hidden = /aria-hidden="true"/.test(tag);
      const hasRole = /role="img"/.test(tag);
      const labelM = tag.match(/aria-label="([^"]*)"/);
      const hasLabel = !!labelM && labelM[1].trim().length > 0;
      if (hidden && (hasRole || hasLabel)) {
        bad++;
        fail(relative('.', f) + ': SVG vừa aria-hidden vừa có role/aria-label (xung đột): ' + tag.slice(0, 70));
      } else if (!hidden && !(hasRole && hasLabel)) {
        bad++;
        fail(relative('.', f) + ': SVG chưa phân loại — cần aria-hidden (trang trí) HOẶC role="img" + aria-label (có ý nghĩa): ' + tag.slice(0, 70));
      }
    });
  }
  if (bad === 0) ok('Mọi SVG minh họa được phân loại đúng: aria-hidden (trang trí) hoặc role="img" + aria-label (có ý nghĩa)');
}

console.log('');
if (errors.length > 0) {
  console.log('CÓ ' + errors.length + ' LỖI — xem trên.');
  process.exit(1);
}
console.log('Tất cả kiểm tra hoạt ảnh tĩnh đạt. (Cảm giác chuyển động thật cần kiểm thủ công trên trình duyệt.)');
