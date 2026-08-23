// =============================================================================
// check-color-contrast.mjs — Kiểm tra tỷ lệ tương phản WCAG 2.2 AA của các cặp
// token màu quan trọng (chế độ sáng và tối), không cần trình duyệt.
// =============================================================================
// Chạy: npm run check:contrast
//
// - Chỉ kiểm tra CÁC CẶP TOKEN ĐÃ KHAI BÁO dưới đây (đơn nguồn: bảng màu
//   trong tailwind.config.mjs / src/styles/global.css, ghi lại tại đây để
//   script tự chạy không phụ thuộc build).
// - KHÔNG thay thế kiểm thử WCAG trên trình duyệt thật (bố cục thực, pha nền
//   chồng lớp, hover/focus... cần xem bằng công cụ chuyên).
// - Exit code 1 nếu một cặp bắt buộc không đạt ngưỡng.
// =============================================================================

// ----- Công thức WCAG 2.x -----
function srgbChannel(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function luminance([r, g, b]) {
  return 0.2126 * srgbChannel(r) + 0.7152 * srgbChannel(g) + 0.0722 * srgbChannel(b);
}
export function contrastRatio(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
const hex = (h) => {
  const s = h.replace('#', '');
  const f = s.length === 3 ? s.split('').map((c) => c + c).join('') : s;
  return [parseInt(f.slice(0, 2), 16), parseInt(f.slice(2, 4), 16), parseInt(f.slice(4, 6), 16)];
};
/** Pha màu foreground lên nền theo alpha (0-1) — mô phỏng class text-cream/75 */
const blend = (fg, bg, a) => fg.map((c, i) => Math.round(c * a + bg[i] * (1 - a)));

// ----- Bảng màu (đơn nguồn với tailwind.config.mjs / global.css) -----
const C = {
  // Chế sáng
  pageLight: hex('#FBFBF8'),
  surfaceLight: hex('#FFFFFF'),
  primaryLight: hex('#15191D'),
  secondaryLight: hex('#4F5962'),
  steelLight: hex('#234A73'),
  alloyLight: hex('#8A6A35'),
  lineLight: hex('#CCD1CE'),
  brassLight: hex('#D9BC8B'), // brass-light — đồng sáng cho heading/hover trên nền đậm
  cream: hex('#FBFBF8'),
  // Chế tối
  pageDark: hex('#111519'),
  surfaceDark: hex('#20272D'),
  primaryDark: hex('#EEF0ED'),
  secondaryDark: hex('#B7C0C6'),
  steelDark: hex('#8BB2DA'),
  alloyDark: hex('#D0B27B'),
  lineDark: hex('#66758A'),
};
// Nền footer: navy (sáng) và black/40 pha trên nền tối
const footerLightBg = C.steelLight;
const footerDarkBg = blend(hex('#000000'), C.pageDark, 0.4);

// ----- Các cặp bắt buộc -----
// type: 'text' (4.5:1) | 'ui' (3:1 — viền/focus/thành phần điều khiển)
const PAIRS = [
  // --- Chữ chính / phụ trên nền trang & bề mặt (2 chế) ---
  { name: 'SÁNG  primary/page', fg: [C.primaryLight, C.pageLight], type: 'text' },
  { name: 'SÁNG  secondary/page', fg: [C.secondaryLight, C.pageLight], type: 'text' },
  { name: 'SÁNG  primary/surface', fg: [C.primaryLight, C.surfaceLight], type: 'text' },
  { name: 'SÁNG  secondary/surface', fg: [C.secondaryLight, C.surfaceLight], type: 'text' },
  { name: 'TỐI   primary/page', fg: [C.primaryDark, C.pageDark], type: 'text' },
  { name: 'TỐI   secondary/page', fg: [C.secondaryDark, C.pageDark], type: 'text' },
  { name: 'TỐI   primary/surface', fg: [C.primaryDark, C.surfaceDark], type: 'text' },
  { name: 'TỐI   secondary/surface', fg: [C.secondaryDark, C.surfaceDark], type: 'text' },

  // --- Chữ phụ mờ theo ngữ cảnh thật (đo có pha alpha) ---
  { name: 'TỐI   secondary 70% trên page (nhãn phụ)', fg: [blend(C.secondaryDark, C.pageDark, 0.7), C.pageDark], type: 'text' },
  { name: 'TỐI   placeholder (secondary 70% trên surface)', fg: [blend(C.secondaryDark, C.surfaceDark, 0.7), C.surfaceDark], type: 'text' },
  { name: 'SÁNG  placeholder (secondary 90% trên surface)', fg: [blend(C.secondaryLight, C.surfaceLight, 0.9), C.surfaceLight], type: 'text' },

  // --- Liên kết trên nền tương ứng ---
  { name: 'SÁNG  link(alloy)/page', fg: [C.alloyLight, C.pageLight], type: 'text' },
  { name: 'SÁNG  link(steel)/page', fg: [C.steelLight, C.pageLight], type: 'text' },
  { name: 'TỐI   link(alloy sáng)/page', fg: [C.alloyDark, C.pageDark], type: 'text' },
  { name: 'TỐI   link(alloy sáng)/surface', fg: [C.alloyDark, C.surfaceDark], type: 'text' },
  { name: 'TỐI   link(steel sáng)/page', fg: [C.steelDark, C.pageDark], type: 'text' },

  // --- Footer ---
  { name: 'FOOTER SÁNG  chữ cream/80 trên navy', fg: [blend(C.cream, footerLightBg, 0.8), footerLightBg], type: 'text' },
  { name: 'FOOTER SÁNG  link cream/80 trên navy', fg: [blend(C.cream, footerLightBg, 0.8), footerLightBg], type: 'text' },
  { name: 'FOOTER SÁNG  heading + hover brass-light trên navy', fg: [C.brassLight, footerLightBg], type: 'text' },
  { name: 'FOOTER SÁNG  mô tả cream/75 trên navy', fg: [blend(C.cream, footerLightBg, 0.75), footerLightBg], type: 'text' },
  { name: 'FOOTER SÁNG  mô tả cream/70 trên navy', fg: [blend(C.cream, footerLightBg, 0.7), footerLightBg], type: 'text' },
  { name: 'FOOTER TỐI   chữ cream/80 trên đen-pha', fg: [blend(C.cream, footerDarkBg, 0.8), footerDarkBg], type: 'text' },
  { name: 'FOOTER TỐI   link cream/80 trên đen-pha', fg: [blend(C.cream, footerDarkBg, 0.8), footerDarkBg], type: 'text' },
  { name: 'FOOTER TỐI   heading brass-light trên đen-pha', fg: [C.brassLight, footerDarkBg], type: 'text' },
  { name: 'FOOTER TỐI   mô tả cream/75 trên đen-pha', fg: [blend(C.cream, footerDarkBg, 0.75), footerDarkBg], type: 'text' },
  // Khung bản tin footer: viền cream/15, KHÔNG lớp phủ — nền thực tế là navy thuần
  { name: 'FOOTER SÁNG  link brass-light trên nền khung bản tin', fg: [C.brassLight, footerLightBg], type: 'text' },
  { name: 'FOOTER SÁNG  chữ khung bản tin cream/75 trên navy', fg: [blend(C.cream, footerLightBg, 0.75), footerLightBg], type: 'text' },

  // --- CTA / nút ---
  { name: 'SÁNG  CTA cream trên steel(navy)', fg: [C.cream, C.steelLight], type: 'text' },
  { name: 'TỐI   CTA chữ tối trên steel sáng', fg: [C.primaryLight, C.steelDark], type: 'text' },

  // --- Focus ring / viền control (phi văn bản) ---
  { name: 'SÁNG  focus steel trên page', fg: [C.steelLight, C.pageLight], type: 'ui' },
  { name: 'SÁNG  focus steel trên surface', fg: [C.steelLight, C.surfaceLight], type: 'ui' },
  // Viền line (#CCD1CE) là viền TRANG TRÍ thẻ/khối — không thuộc nhóm bắt buộc 3:1
  { name: 'TỐI   focus steel trên page', fg: [C.steelDark, C.pageDark], type: 'ui' },
  { name: 'TỐI   viền line trên page', fg: [C.lineDark, C.pageDark], type: 'ui' },
  { name: 'TỐI   viền line trên bề mặt (input dark)', fg: [C.lineDark, C.surfaceDark], type: 'ui' },
  { name: 'SÁNG  viền input (ink-soft 70% trên page)', fg: [blend(C.secondaryLight, C.pageLight, 0.7), C.pageLight], type: 'ui' },
];

const THRESHOLD = { text: 4.5, 'text-large': 3, ui: 3 };

let fail = 0;
const W = 48;
console.log('Kiểm tra tương phản WCAG 2.2 AA — các cặp token bắt buộc\n');
for (const p of PAIRS) {
  const [fg, bg] = p.fg;
  const ratio = contrastRatio(fg, bg);
  const need = THRESHOLD[p.type];
  const ok = ratio >= need;
  if (!ok) fail++;
  console.log(
    `${ok ? 'ĐẠT' : 'LỖI'}  ${p.name.padEnd(W)} ${ratio.toFixed(2).padStart(5)}:1  (cần ≥ ${need.toFixed(1)}:1)`,
  );
}
console.log(`\n${PAIRS.length - fail}/${PAIRS.length} cặp đạt chuẩn.`);
if (fail > 0) {
  console.log(`CÓ ${fail} CẶP KHÔNG ĐẠT — xem dòng LỖI ở trên.`);
  process.exit(1);
}
console.log('Tất cả cặp token khai báo đạt ngưỡng AA.');
