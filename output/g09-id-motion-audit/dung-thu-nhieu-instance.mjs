// G09-B chặng 1 — dựng trang thử nghiệm NHIỀU INSTANCE cô lập (ngoài route xuất bản)
// Lấy placeholder SVG thật từ dist/lich-su, ghép 2 bản sao + 1 bản "phân kỳ" màu,
// phục vụ qua file:// — không tạo route. Kết quả đo bằng trình duyệt + ảnh.
import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('dist/lich-su/index.html', 'utf8');
// tách SVG đầu tiên trong .placeholder (nội dung giữa <svg ...>...</svg> của placeholder đầu)
const dau = html.indexOf('<div class="placeholder');
const svgStart = html.indexOf('<svg', dau);
const svgEnd = html.indexOf('</svg>', svgStart) + '</svg>'.length;
const svg = html.slice(svgStart, svgEnd);

const trang = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><title>Thử nghiệm cô lập — nhiều instance guilloche (ngoài route xuất bản)</title>
<style>
  body { font-family: sans-serif; background: #fff; margin: 16px; }
  .khung { display: flex; gap: 24px; }
  .watch-image { width: 220px; }
  .placeholder { display: block; }
  .nhan { font-size: 13px; margin: 4px 0 12px; }
  /* mô phỏng màu production (global.css): nền thép + nét hợp kim */
  .placeholder-bg { fill: #8a97a5; }
  .guilloche-stroke, .dial-ring, .dial-mark { color: #b8893c; }
</style></head>
<body>
  <p class="nhan" id="nhan-c">C (phân kỳ — pattern riêng cùng id "guilloche", màu Xanh đậm) — đứng TRƯỚC cùng</p>
  <div class="khung"><div class="watch-image"><div class="placeholder" style="display:block">${svg.replace(/stroke="currentColor"/g, 'stroke="#16323b"')}</div></div></div>
  <p class="nhan">A (bản sao sản phẩm — pattern mặc định) và B (bản sao sản phẩm — giống hệt A)</p>
  <div class="khung">
    <div class="watch-image"><div class="placeholder" style="display:block" id="khu-a">${svg}</div></div>
    <div class="watch-image"><div class="placeholder" style="display:block">${svg}</div></div>
  </div>
  <p class="nhan" id="ket-qua">—</p>
  <script>
    window.__doKhoiTao = function() {
      const cacId = document.querySelectorAll('#guilloche');
      const first = document.getElementById('guilloche');
      document.getElementById('ket-qua').textContent =
        'số id="guilloche": ' + cacId.length +
        ' · getElementById trả về phần tử thứ: ' + [...cacId].indexOf(first) +
        ' · cha WatchImage của nó: ' + (first.closest('.watch-image').parentElement === document.body ? 'khung-đầu' : 'không-xác-định');
    };
  </script>
</body></html>
`;

writeFileSync('output/g09-id-motion-audit/thu-nhieu-instance.html', trang);
console.log('Đã dựng output/g09-id-motion-audit/thu-nhieu-instance.html (SVG lấy từ dist/lich-su)');
