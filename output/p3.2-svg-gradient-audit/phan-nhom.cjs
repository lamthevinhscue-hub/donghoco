// P3.2 — Sinh nhom-gradient.json từ kiem-ke-gradient.json
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('output/p3.2-svg-gradient-audit/kiem-ke-gradient.json', 'utf8'));
const sig = (d) => JSON.stringify([d.loai, d.gradientUnits, d.x1, d.y1, d.x2, d.y2, d.cx, d.cy, d.r, d.fr, d.fx, d.fy, d.gradientTransform, d.spreadMethod, d.stops.map((s) => [s.offset, s.bienMau || s.color, s.opacity, s.styleOpacity])]);
const nhom = {};
for (const d of j.defs.filter((x) => x.file.startsWith('src/'))) {
  const s = sig(d);
  (nhom[s] = nhom[s] || { thanhVien: [], dacTaNhien: d.stops.map((x) => x.bienMau || x.color).join(' → '), toaDo: (d.x1 ?? '0') + ',' + (d.y1 ?? '0') + '→' + (d.x2 ?? '1') + ',' + (d.y2 ?? '1'), loai: d.loai, tam: d.cx ? d.cx + ',' + d.cy + ' r=' + d.r : null, bienMauChinh: (d.stops[0].bienMau || d.stops[0].color || '').replace('var(--', '').replace(')', '') }).thanhVien.push({ file: d.file, id: d.id, line: d.line });
}
const nhomList = Object.entries(nhom).map(([sig, n], idx) => ({ nhom: 'N' + (idx + 1), ...n }));
nhomList.sort((a, b) => b.thanhVien.length - a.thanhVien.length);
const duongHong = nhomList.filter((n) => n.thanhVien.length >= 2);
const rieng = nhomList.filter((n) => n.thanhVien.length === 1);
// Cặp gần trùng (chênh offset/tọa độ nhỏ, cùng biến màu họ)
const capGanTrung = [
  { cap: ['inc-brass', 'mrp-brass'], khac: 'stop giữa offset 0.45 vs 0.5 — cùng biến màu brass-dọc', giai: 'giống hình thức, khác tham số nhỏ' },
  { cap: ['escBalance', 'hsBalance'], khac: 'escBalance 2 stop (0,1) vs hsBalance 3 stop (0,0.55,1) — cùng đường chéo ruby', giai: 'giống hình thức, khác số stop' },
  { cap: ['pc-dial', 'rot-movement'], khac: 'stop giữa offset 0.8 vs 0.78 — cùng radial --ig-bg', giai: 'giống hình thức, khác tham số nhỏ' },
  { cap: ['pc-dial', 'vph-balance'], khac: 'stop giữa offset 0.8 vs 0.78', giai: 'giống hình thức, khác tham số nhỏ' },
  { cap: ['chronoSteel', 'escSteel'], khac: 'chronoSteel dọc (0,0→0,1) offset 0.55; escSteel chéo (0,0→1,1) offset 0.5 — cùng biến --obs-steel', giai: 'giống hình thức, khác hướng' },
];
const out = {
  moTa: 'Phân nhóm 51 định nghĩa gradient nguồn theo chữ ký đầy đủ (loại + gradientUnits + tọa độ + transform + stops: offset/biến màu CSS/opacity). Hai định nghĩa cùng nhóm = trùng hoàn toàn về ngữ nghĩa render.',
  thoiGian: new Date().toISOString(),
  tongDinhNghiaNguon: j.defs.filter((x) => x.file.startsWith('src/')).length,
  soNhom: nhomList.length,
  nhomTrungHoanToan: duongHong,
  nhomRiengBiet: rieng,
  capGanTrungChuaGop: capGanTrung,
};
fs.writeFileSync('output/p3.2-svg-gradient-audit/nhom-gradient.json', JSON.stringify(out, null, 1));
console.log('Đã ghi nhom-gradient.json — nhóm trùng hoàn toàn: ' + duongHong.length + ' (' + duongHong.reduce((s, n) => s + n.thanhVien.length, 0) + ' defs) | nhóm riêng biệt: ' + rieng.length);
