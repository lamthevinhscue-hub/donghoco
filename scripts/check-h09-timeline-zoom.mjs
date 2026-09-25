#!/usr/bin/env node
// =============================================================================
// check-h09-timeline-zoom.mjs — Kiểm gói H09: hộp xem ảnh phóng to timeline
// =============================================================================
// H9-1  Nút phóng to chỉ có ở mốc CÓ ảnh: số nút [data-timeline-zoom] trên mỗi
//       trang === số mốc có tệp ảnh (jpg/svg) tính từ timeline.json
// H9-2  Nhãn điều khiển đúng ngôn ngữ: VI "Phóng to ảnh: …" / EN "Zoom in image: …",
//       không lẫn nhãn ngôn ngữ kia
// H9-3  Mốc không ảnh (số tính từ timeline.json + tệp ảnh thực tế — P0-C bỏ
//       ghi cứng): thẻ không có nút phóng to, không có khung ảnh
// H9-4  Dialog: đúng 1; không mở sẵn (không attr open); có nút đóng có tên theo
//       ngôn ngữ; ảnh dialog KHÔNG có src sẵn (không request khi tải trang);
//       có chỗ giữ nhãn AI [data-zoom-ai] + chú thích [data-zoom-caption]
// H9-5  Không tăng ảnh: số khung .watch-image mỗi trang === số mốc có ảnh;
//       dialog không chứa sẵn nhiều <img>
// H9-6  Mốc ảnh AI (map ANH_AI trích từ HistoryTimeline): nhãn AI ở thẻ đúng
//       ngôn ngữ + truyền vào hộp phóng to qua data-zoom-ai
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
// Nhãn AI minh bạch (B3.2.4) — dùng chung với map ANH_AI của HistoryTimeline
const NHAN_AI_VI = 'Minh họa AI tái dựng — không phải ảnh tư liệu';
const NHAN_AI_EN = 'AI reconstruction — not a historical photograph';

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

  // H9-3: mốc không ảnh — không nút, không khung ảnh (số mốc tính từ dữ liệu
  // + tệp ảnh thực tế trong public/images/timeline — P0-C: không ghi cứng)
  const lech = [];
  for (const m of khongAnh) {
    const i = data.indexOf(m);
    const mo = html.match(new RegExp(`<article[^>]*id="milestone-${i}"[\\s\\S]*?</article>`));
    if (!mo) { lech.push(`thiếu thẻ #milestone-${i} (${m.slug})`); continue; }
    if (mo[0].includes('data-timeline-zoom')) lech.push(`${m.slug} có nút phóng to`);
    if (mo[0].includes('watch-image')) lech.push(`${m.slug} có khung ảnh`);
  }
  kiem(`H9-3-${tag}`, `${khongAnh.length} mốc không ảnh (theo dữ liệu + tệp ảnh thực tế) không có nút phóng to/khung ảnh`, lech.length === 0, lech.join(', ') || 'đủ');

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

  // H9-6 (P0-C): mốc dùng ảnh AI (map ANH_AI của HistoryTimeline — trích từ
  // nguồn, không ghi cứng) phải có nhãn AI ở thẻ và truyền vào hộp phóng to
  // qua data-zoom-ai; nhãn đúng ngôn ngữ từng trang.
  const nguonComponent = readFileSync(join(ROOT, 'src', 'components', 'history', 'HistoryTimeline.astro'), 'utf8');
  const slugsAi = [...new Set([...nguonComponent.matchAll(/'([a-z0-9-]+)',\s*\{\s*vi: '/g)].map((m) => m[1]))];
  const nhanNgonNgu = lang === 'vi' ? NHAN_AI_VI : NHAN_AI_EN;
  const lechAi = [];
  for (const slug of slugsAi) {
    const m = data.find((x) => x.slug === slug);
    if (!m) { lechAi.push(`${slug}: không có trong timeline.json`); continue; }
    const i = data.indexOf(m);
    const mo = html.match(new RegExp(`<article[^>]*id="milestone-${i}"[\\s\\S]*?</article>`));
    if (!mo) { lechAi.push(`${slug}: thiếu thẻ #milestone-${i}`); continue; }
    if (!/data-zoom-ai="[^]/.test(mo[0])) lechAi.push(`${slug}: data-zoom-ai rỗng/thiếu trên nút phóng to`);
    if (!mo[0].includes(nhanNgonNgu)) lechAi.push(`${slug}: thiếu nhãn AI đúng ngôn ngữ ở thẻ`);
  }
  const soTruyen = (html.match(new RegExp(`data-zoom-ai="${nhanNgonNgu}`, 'g')) ?? []).length;
  kiem(`H9-6-${tag}`, `${slugsAi.length} mốc ảnh AI: nhãn ở thẻ + truyền vào hộp phóng to (×${soTruyen})`, lechAi.length === 0 && soTruyen === slugsAi.length, `${lechAi.join(', ') || 'đủ'}, truyền=${soTruyen}`);
}

// ===== Kết luận =====
ketqua.tongKet = { tongCa: ketqua.ca.length, dat: errors.length === 0, loi: errors.length };
console.log(`  KẾT LUẬN H09: ${errors.length === 0 ? `ĐẠT — ${ketqua.ca.length}/${ketqua.ca.length} ca` : 'KHÔNG ĐẠT:'}`);
for (const e of errors) console.log(`    LỖI  ${e}`);
process.exit(errors.length === 0 ? 0 : 1);
