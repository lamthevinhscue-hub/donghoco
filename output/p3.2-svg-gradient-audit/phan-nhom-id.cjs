// P3.2 — Phân nhóm chữ ký đầy đủ + kiểm tham chiếu trên TOÀN BỘ phần tử có ID trong tài liệu
// Chạy: node output/p3.2-svg-gradient-audit/phan-nhom-id.cjs
// Kết quả chi tiết ghi: output/p3.2-svg-gradient-audit/ket-qua-kiem-tra-tham-chieu.json
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('output/p3.2-svg-gradient-audit/kiem-ke-gradient.json', 'utf8'));
const out = { thoiGian: new Date().toISOString() };

// ===== 1. Phân nhóm chữ ký nguồn =====
// Chữ ký gồm: loại, gradientUnits, tọa độ, transform, spreadMethod, fx/fy, fr,
// và từng stop (offset, biến màu/đ màu, opacity attr, opacity trong style).
const sig = (d) => JSON.stringify([
  d.loai, d.gradientUnits, d.x1, d.y1, d.x2, d.y2, d.cx, d.cy, d.r, d.fr, d.fx, d.fy,
  d.gradientTransform, d.spreadMethod,
  d.stops.map((s) => [s.offset, s.bienMau || s.color, s.opacity, s.styleOpacity]),
]);
const nhom = {};
for (const d of j.defs.filter((x) => x.file.startsWith('src/'))) {
  const s = sig(d);
  (nhom[s] = nhom[s] || {
    thanhVien: [], loai: d.loai,
    toaDo: 'x1=' + (d.x1 ?? '-') + ' y1=' + (d.y1 ?? '-') + ' x2=' + (d.x2 ?? '-') + ' y2=' + (d.y2 ?? '-') + (d.cx ? ' | tâm cx=' + d.cx + ' cy=' + d.cy + ' r=' + (d.r ?? '-') + (d.fx ? ' fx=' + d.fx + ' fy=' + d.fy : '') : ''),
    stops: d.stops.map((x) => ({ offset: x.offset, mau: x.bienMau || x.color, opacity: x.opacity ?? x.styleOpacity ?? '-' })),
  }).thanhVien.push({ file: d.file, id: d.id, line: d.line });
}
const nhomList = Object.values(nhom).map((n, idx) => ({ nhom: 'N' + (idx + 1), ...n })).sort((a, b) => b.thanhVien.length - a.thanhVien.length);
out.soNhomNguon = nhomList.length;
out.nhomTrungHoanToan = nhomList.filter((n) => n.thanhVien.length >= 2);
out.nhomDocLap = nhomList.filter((n) => n.thanhVien.length === 1);
out.thuocTinhKhongXuatHienTrongDuLieu = {};
for (const tr of ['fr', 'fx', 'fy', 'spreadMethod', 'gradientTransform', 'gradientUnits']) {
  const co = j.defs.some((d) => d[tr]);
  out.thuocTinhKhongXuatHienTrongDuLieu[tr] = co ? 'CÓ xuất hiện' : 'không xuất hiện trong dữ liệu hiện hành';
}
out.gioiHanChuKy = 'Chữ ký chỉ chứng minh TRÙNG TRONG PHẠM VI ĐÃ KIỂM (thuộc tính tĩnh + biến màu CSS). Không tự động đồng nghĩa render tương đương trong mọi ngữ cảnh CSS (giá trị biến phụ thuộc theme/phạm vi) và chưa so ảnh render từng cặp.';

// ===== 2. Tham chiếu: tách nguồn + loại đích (dùng TOÀN BỘ phần tử có ID) =====
const LOAI_GRADIENT = new Set(['linearGradient', 'radialGradient']);
const phanLoai = (tag) => LOAI_GRADIENT.has(tag) ? 'gradient' : (tag === 'marker' ? 'marker' : tag === 'filter' ? 'filter' : tag === 'clipPath' ? 'clipPath' : tag === 'pattern' ? 'pattern' : 'khác (' + tag + ')');
const refsPhanLoai = [];
for (const r of j.refs) {
  const ids = j.idToanTaiLieu[r.file];
  let dich = 'không xác định được trong phạm vi quét tài liệu';
  let loaiDich = null;
  if (ids) {
    const found = ids.find((x) => x.id === r.id);
    dich = found ? phanLoai(found.tag) : 'KHÔNG TÌM THẤY trong tài liệu';
    loaiDich = found ? found.tag : null;
  }
  const nguon = r.file.startsWith('src/') ? 'src' : (r.file.startsWith('dist/') ? 'build (dist)' : 'tài sản SVG (public)');
  refsPhanLoai.push({ file: r.file, line: r.line, id: r.id, kieu: r.kieu, nguon, dich, loaiDich });
}
out.thamChieu = {
  tong: refsPhanLoai.length,
  theoNguon: {
    src: refsPhanLoai.filter((r) => r.nguon === 'src').length,
    build: refsPhanLoai.filter((r) => r.nguon === 'build (dist)').length,
    taiSanSvg: refsPhanLoai.filter((r) => r.nguon === 'tài sản SVG (public)').length,
  },
  theoDich: refsPhanLoai.reduce((acc, r) => { acc[r.dich] = (acc[r.dich] || 0) + 1; return acc; }, {}),
  chiTiet: refsPhanLoai,
};
out.luYTongHop = 'Số nguồn + số build là hai lớp khác nhau (định nghĩa nguồn và lần render trên route) — không cộng làm "số tham chiếu duy nhất trên website".';

// ===== 3. href/xlink:href TRÊN linearGradient/radialGradient (kế thừa gradient) =====
const keThua = j.defs.filter((d) => d.href);
out.gradientKeThuaQuaHref = { so: keThua.length, chiTiet: keThua.map((d) => ({ file: d.file, id: d.id, href: d.href })) };

// ===== 4. ID trùng trên TOÀN tài liệu dist (mọi phần tử, không chỉ gradient) =====
const idTrungToanTaiLieu = [];
for (const [doc, ids] of Object.entries(j.idToanTaiLieu)) {
  const dem = {};
  for (const x of ids) dem[x.id] = (dem[x.id] || 0) + 1;
  for (const [id, n] of Object.entries(dem)) if (n > 1) idTrungToanTaiLieu.push({ doc, id, soLan: n, tags: ids.filter((x) => x.id === id).map((x) => x.tag).join(',') });
}
out.idTrungToanTaiLieu = { soVanDe: idTrungToanTaiLieu.length, chiTiet: idTrungToanTaiLieu };

// ===== 5. url(#) thiếu đích (so với toàn bộ phần tử có ID) =====
const thieuDich = refsPhanLoai.filter((r) => r.nguon === 'build (dist)' && r.dich === 'KHÔNG TÌM THẤY trong tài liệu');
out.urlThieuDich = { so: thieuDich.length, chiTiet: thieuDich.map((r) => ({ file: r.file, line: r.line, id: r.id })) };

// ===== In tóm tắt =====
console.log('== PHÂN NHÓM NGUỒN ==');
console.log('Số nhóm chữ ký: ' + out.soNhomNguon + ' | nhóm trùng hoàn toàn: ' + out.nhomTrungHoanToan.length + ' (' + out.nhomTrungHoanToan.reduce((s, n) => s + n.thanhVien.length, 0) + ' defs) | độc lập: ' + out.nhomDocLap.length);
for (const n of out.nhomTrungHoanToan) console.log('  [' + n.thanhVien.length + '] ' + n.loai + ' ' + n.toaDo + ' | ' + n.stops.map((s) => s.offset + ':' + s.mau).join('→'));
console.log('Thuộc tính ít gặp: ' + JSON.stringify(out.thuocTinhKhongXuatHienTrongDuLieu));
console.log('');
console.log('== THAM CHIẾU ==');
console.log('Tổng: ' + out.thamChieu.tong + ' | theo nguồn: ' + JSON.stringify(out.thamChieu.theoNguon));
console.log('Theo loại đích: ' + JSON.stringify(out.thamChieu.theoDich));
console.log('Gradient kế thừa qua href: ' + out.gradientKeThuaQuaHref.so);
console.log('ID trùng toàn tài liệu: ' + out.idTrungToanTaiLieu.soVanDe + (out.idTrungToanTaiLieu.chiTiet.length ? ' → ' + JSON.stringify(out.idTrungToanTaiLieu.chiTiet) : ''));
console.log('url(#) thiếu đích: ' + out.urlThieuDich.so + (out.urlThieuDich.chiTiet.length ? ' → ' + JSON.stringify(out.urlThieuDich.chiTiet) : ''));

fs.writeFileSync('output/p3.2-svg-gradient-audit/ket-qua-kiem-tra-tham-chieu.json', JSON.stringify(out, null, 1));
console.log('Đã ghi ket-qua-kiem-tra-tham-chieu.json');
