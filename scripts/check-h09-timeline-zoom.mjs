#!/usr/bin/env node
// =============================================================================
// check-h09-timeline-zoom.mjs — Kiểm gói H09: hộp xem ảnh phóng to timeline
// =============================================================================
// H9-1  Nút phóng to chỉ có ở mốc CÓ ảnh: số nút [data-timeline-zoom] trên mỗi
//       trang === số mốc có tệp ảnh (jpg/svg) tính từ timeline.json
// H9-2  Nhãn điều khiển đúng ngôn ngữ: VI "Phóng to ảnh: …" / EN "Zoom in image: …",
//       không lẫn nhãn ngôn ngữ kia
// H9-3  4 slug H07-A không ảnh: thẻ không có nút phóng to, không có khung ảnh
// H9-4  Dialog: đúng 1; không mở sẵn (không attr open); có nút đóng có tên theo
//       ngôn ngữ; ảnh dialog KHÔNG có src sẵn (không request khi tải trang);
//       có chỗ giữ nhãn AI [data-zoom-ai] + chú thích [data-zoom-caption]
// H9-5  Không tăng ảnh: số khung .watch-image mỗi trang === số mốc có ảnh;
//       dialog không chứa sẵn nhiều <img>
// Chạy: node scripts/check-h09-timeline-zoom.mjs <thư-mục-dist>   (cần dist)
// Nối trong npm run build, sau check-h07. Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = process.cwd();
const distArg = process.argv.slice(2).find((a) => !a.startsWith('--'));
const DIST = distArg ? resolve(ROOT, distArg) : null;
if (!DIST) {
  console.error('H09 checker cần thư mục dist: node scripts/check-h09-timeline-zoom.mjs dist');
  process.exit(1);
}

const errors = [];
const ketqua = { thoiGian: new Date().toISOString(), ca: [], tongKet: null };
const kiem = (id, ten, dat, chiTiet = '') => {
  ketqua.ca.push({ id, ten, dat: dat === true, chiTiet });
  console.log(`  ${dat === true ? 'ĐẠT' : 'LỖI '} [${id}] ${ten}${dat === true ? '' : ` — ${chiTiet}`}`);
  if (dat !== true) errors.push(`[${id}] ${ten} — ${chiTiet}`);
};

// Số mốc có ảnh thật — tính lại đúng logic timelineImage của HistoryTimeline
const data = JSON.parse(readFileSync(join(ROOT, 'src', 'data', 'timeline.json'), 'utf8'));
const thuMucAnh = join(ROOT, 'public', 'images', 'timeline');
const coAnh = data.filter((m) => existsSync(join(thuMucAnh, `${m.slug}.jpg`)) || existsSync(join(thuMucAnh, `${m.slug}.svg`)));
const khongAnh = data.filter((m) => !coAnh.includes(m));
const soAnhMong = coAnh.length;

const TRANG = [
  { lang: 'vi', path: join(DIST, 'lich-su', 'index.html'), nhan: 'Phóng to ảnh:', close: 'Đóng hộp xem ảnh phóng to' },
  { lang: 'en', path: join(DIST, 'en', 'history', 'index.html'), nhan: 'Zoom in image:', close: 'Close the zoomed image viewer' },
];

for (const { lang, path, nhan, close } of TRANG) {
  if (!existsSync(path)) {
    errors.push(`[H9-DIST] Thiếu ${path}`);
    continue;
  }
  const html = readFileSync(path, 'utf8');
  const tag = lang.toUpperCase();

  // H9-1: số nút phóng to === số mốc có ảnh
  // (loại trừ chuỗi trong script: selector '[data-timeline-zoom]' có `]` liền sau)
  const soNut = (html.match(/data-timeline-zoom(?!])/g) ?? []).length;
  kiem(`H9-1-${tag}`, `Nút phóng to chỉ ở mốc có ảnh: ${soNut}/${soAnhMong}`, soNut === soAnhMong, `thực tế ${soNut}`);

  // H9-2: nhãn điều khiển đúng ngôn ngữ, không lẫn
  const dungNhan = (html.match(new RegExp(`aria-label="${nhan}`, 'g')) ?? []).length;
  const nhanNguonKhac = lang === 'vi' ? 'Zoom in image:' : 'Phóng to ảnh:';
  const soLan = (html.match(new RegExp(`aria-label="${nhanNguonKhac}`, 'g')) ?? []).length;
  kiem(`H9-2-${tag}`, `Nhãn điều khiển đúng ngôn ngữ (${nhan} ×${dungNhan}, lẫn ${soLan})`, dungNhan === soAnhMong && soLan === 0, `đúng=${dungNhan}, lẫn=${soLan}`);

  // H9-3: mốc không ảnh — không nút, không khung ảnh
  const lech = [];
  for (const m of khongAnh) {
    const i = data.indexOf(m);
    const mo = html.match(new RegExp(`<article[^>]*id="milestone-${i}"[\\s\\S]*?</article>`));
    if (!mo) { lech.push(`thiếu thẻ #milestone-${i} (${m.slug})`); continue; }
    if (mo[0].includes('data-timeline-zoom')) lech.push(`${m.slug} có nút phóng to`);
    if (mo[0].includes('watch-image')) lech.push(`${m.slug} có khung ảnh`);
  }
  kiem(`H9-3-${tag}`, `4 mốc không ảnh không có nút phóng to/khung ảnh`, lech.length === 0, lech.join(', ') || 'đủ');

  // H9-4: dialog
  const soDialog = (html.match(/<dialog id="timeline-zoom"/g) ?? []).length;
  const moSan = /<dialog[^>]*\sopen/.test(html);
  const coDong = new RegExp(`data-zoom-close[^>]*aria-label="${close}"`).test(html);
  const imgDialog = html.match(/<img data-zoom-img([^>]*)>/);
  const imgKhongSrc = !!imgDialog && !/\bsrc=/.test(imgDialog[1]);
  const coAiSlot = html.includes('data-zoom-ai');
  const coChuThich = html.includes('data-zoom-caption');
  kiem(`H9-4-${tag}`, 'Dialog: 1 hộp, không mở sẵn, nút đóng có tên, ảnh không src sẵn, có chỗ nhãn AI + chú thích',
    soDialog === 1 && !moSan && coDong && imgKhongSrc && coAiSlot && coChuThich,
    `dialog=${soDialog}, mởSẵn=${moSan}, đóng=${coDong}, imgSrc=${imgDialog ? imgDialog[1].trim() || '(trống)' : 'thiếu'}, ai=${coAiSlot}, chúThích=${coChuThich}`);

  // H9-5: không tăng khung ảnh; dialog không chứa sẵn nhiều <img>
  const soKhung = (html.match(/class="watch-image[ "]/g) ?? []).length;
  const soImgDialog = (html.match(/<img[^>]*data-zoom-img/g) ?? []).length;
  kiem(`H9-5-${tag}`, `Không tăng khung ảnh (${soKhung}/${soAnhMong}), dialog chỉ 1 <img>`, soKhung === soAnhMong && soImgDialog === 1, `khung=${soKhung}, img-dialog=${soImgDialog}`);
}

// ===== Kết luận =====
ketqua.tongKet = { tongCa: ketqua.ca.length, dat: errors.length === 0, loi: errors.length };
console.log(`  KẾT LUẬN H09: ${errors.length === 0 ? `ĐẠT — ${ketqua.ca.length}/${ketqua.ca.length} ca` : 'KHÔNG ĐẠT:'}`);
for (const e of errors) console.log(`    LỖI  ${e}`);
process.exit(errors.length === 0 ? 0 : 1);
