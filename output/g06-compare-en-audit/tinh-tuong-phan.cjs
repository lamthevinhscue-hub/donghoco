// Tính tỷ lệ tương phản các cặp màu đo được trên /so-sanh dark mode
'use strict';
const lum = ([r, g, b]) => {
  const f = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const tyLe = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
const trang = [255, 255, 255];
const chuGiaTri = [238, 240, 237]; // dark:text-dark-text
const chuNhan = [183, 192, 198];   // dark:text-dark-text-soft
const consoleLog = [
  ['giá trị (dark-text) trên nền TRẮNG (hàng chẵn dark)', tyLe(chuGiaTri, trang)],
  ['nhãn (dark-text-soft) trên nền TRẮNG (hàng chẵn dark)', tyLe(chuNhan, trang)],
];
for (const [ten, t] of consoleLog) console.log(ten + ': ' + t.toFixed(2) + ':1');
