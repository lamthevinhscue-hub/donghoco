const fs = require('fs');
const f = 'docs/nghiem-thu/G06-C-tich-hop-infographic-bo-thoat-en-2026-09-15.md';
let s = fs.readFileSync(f, 'utf8');

// Mục 3E: 8/8 → 11/11 + bảng mở rộng
s = s.replace(
  '### E. Mutation — `mutation-g06c2.cjs` + `pw-g06c2-mutation-dom.js` + `tong-ket-mutation.cjs`: **8/8 ĐẠT**',
  '### E. Mutation — `mutation-g06c2.cjs` + `pw-g06c2-mutation-dom.js` + `tong-ket-mutation.cjs`: **11/11 ĐẠT**'
);
const row22 = "| M2-2 (nguồn) | gate `'chronograph'` (chưa dịch) | S9 bắt |";
const themBang = [
  row22,
  "| Mục 7a (nguồn, vòng sửa checker) | tiêm `<svg aria-label={''}></svg>` vào WaterResistance (ngoài ngoại lệ) | check-motion bắt: \"SVG nhãn động NGOÀI ngoại lệ G06-C\" (+[thiếu role=\"img\"]) |",
  '| Mục 7b (nguồn, đối chứng) | Bộ thoát sạch qua check-motion | exit 0 — ngoại lệ duy nhất hoạt động |',
  '| Ham-quet (vòng sửa checker) | vô hiệu hóa phát hiện khung TRONG hàm dùng chung `demTrangEnKhac` (bản sao sandbox src+scripts+dist) | D5 tự kiểm (b) thất bại đúng lý do; hàm nguyên vẹn trên cùng dist exit 0 |',
].join('\n');
s = s.replace(row22, themBang);

// Mục 5: thêm vòng sửa 14
const cu5 = '- **Đã xử lý ở vòng sửa:** D5 phụ thuộc dấu `\\` Windows → path.relative + chuẩn hóa sep + tự kiểm cây giả + ghi số trang quét (66); mutation thiếu hoàn nguyên → luồng hoàn nguyên thật có hash (mục 3E); G4-4 thông báo/comment lỗi thời → đồng bộ chính sách 2 tệp; số ca nguồn/dist ghi trộn (55+82) → sửa thành 55 nguồn + 33 dist (đo lại sau khi thêm D5/D11); "mục 6" → đúng là **mục 7** của checker motion.';
const moi5 = cu5 + '\n- **Đã xử lý ở vòng sửa checker (TXN-20260915-14):** mục 7 motion bỏ qua MỌI SVG nhãn động (kể cả ngoài Bộ thoát; nhãn rỗng/thiếu role không bị bắt) → thu hẹp ngoại lệ còn `Escapement.astro`/`escapement-svg`, bắt thiếu role + báo "cần bổ sung checker dist" cho SVG khác (đối chứng mục 7a/7b); D5 tự kiểm dùng `quetGia` chép riêng (vô hiệu hóa hàm thật không làm tự kiểm fail) → tách hàm dùng chung `demTrangEnKhac`, ba cây thử qua cùng hàm + ca **Ham-quet** chứng minh mutation hàm làm tự kiểm thất bại đúng lý do; số ca dist đo lại 33 → 36.';
if (s.includes(cu5)) s = s.replace(cu5, moi5); else console.log('CẢNH BÁO: không thấy đoạn mục 5 gốc');

// Mục 6/7 số tệp + sweep
s = s.replace('- Số tệp gói: **64** = 8 tệp sửa + `check-g06-escapement-en.mjs` + biên bản này + 54 tệp `output/g06-escapement-en-integration/` (46 text + 8 PNG). Đếm bằng script.',
  '- Số tệp gói: **68** = 8 tệp sửa + `check-g06-escapement-en.mjs` + biên bản này + 57 tệp (49 text + 8 PNG) trong `output/g06-escapement-en-integration/`. Đếm bằng script.');
s = s.replace('- Whitespace/EOF: quét toàn bộ tệp gói dạng text (56 tệp kể cả log) — **SẠCH** (đã chuẩn hóa log build + sandbox-info).',
  '- Whitespace/EOF: quét toàn bộ tệp gói dạng text (59 tệp kể cả log) — **SẠCH** (đã chuẩn hóa 2 tệp log/info mới).');
s = s.replace('| `npm run check`/`build` trọn | **ĐẠT — exit 0** (sau khi mục 7 được chấp thuận sửa) |',
  '| `npm run check`/`build` trọn | **ĐẠT — exit 0** (v3, sau khi mục 7 thu hẹp ngoại lệ) |');
fs.writeFileSync(f, s);
console.log('đã cập nhật:', s.includes('11/11 ĐẠT'), s.includes('Ham-quet (vòng sửa checker)'), s.includes('TXN-20260915-14'), s.includes('**68**'), s.includes('59 tệp kể cả log'));
