// P3.1 — Script kiểm kê định dạng ảnh, chạy lại được (chặng A; mô tả sửa TXN-20260910-12)
// Cách chạy: node output/p3.1-image-audit/do-dinh-dang.mjs
// CHỨC NĂNG THỰC CỦA SCRIPT (chỉ 1 việc): kiểm kê public/ (định dạng, kích thước nội tại,
// alpha, byte đĩa) + đếm tham chiếu trong dist/ (HTML, CSS) và src/ — phân biệt tệp đang
// dùng với tệp mồ côi. Kết quả ghi output/p3.1-image-audit/kiem-ke.json.
// LƯU Ý: script KHÔNG đo mạng. Cách đo dung lượng truyền tái lập (đã dùng trong báo cáo,
// ghi chi tiết trong do-luong-truyen-tai.json): chạy `npm run preview`, KHÔNG chạy build
// đồng thời; với mỗi tệp dùng curl hai lần — (a) không Accept-Encoding: size_download =
// byte response không nén; (b) có "Accept-Encoding: gzip": size_download = byte truyền
// (thân nén). Ghi kèm HTTP status, Content-Encoding, Content-Type và điều kiện cache
// (thêm query ngẫu nhiên để buộc tải mới, hoặc xóa cache trước khi đo). Phân biệt rõ
// thân nén với tổng transferred size.
// (Nhánh --convert thử WebP/AVIF đã BỎ theo TXN-20260910-12 — không có ứng viên, không
// tạo chuyển đổi cho đủ việc; nếu chặng B được duyệt sẽ bổ sung theo danh sách duyệt.)
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import sharp from 'sharp';

const PUBLIC = 'public';
const DIST = 'dist';
const EXT = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];

function listFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...listFiles(p));
    else if (EXT.includes(extname(name).toLowerCase())) out.push(p);
  }
  return out;
}

function countRefs(needle) {
  const hit = { html: [0], css: [0], src: [0] };
  const scan = (dir, exts, target) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) scan(p, exts, target);
      else if (exts.some((e) => name.endsWith(e))) {
        if (readFileSync(p, 'utf8').includes(needle)) target[0]++;
      }
    }
  };
  if (existsSync(DIST)) { scan(join(DIST, '_astro'), ['.css'], hit.css); scan(DIST, ['.html'], hit.html); }
  if (existsSync('src')) scan('src', ['.astro', '.ts', '.md', '.mjs', '.css'], hit.src);
  return { html: hit.html[0], css: hit.css[0], src: hit.src[0] };
}

// ---- Kiểm kê ----
const files = listFiles(PUBLIC);
const result = [];
for (const f of files) {
  const byte = statSync(f).size;
  const urlPath = '/' + f.replace(/\\/g, '/').replace(/^public\//, '');
  let meta = { format: extname(f).slice(1), width: null, height: null, alpha: false };
  if (extname(f).toLowerCase() !== '.svg') {
    const m = await sharp(f).metadata();
    meta = { format: m.format, width: m.width, height: m.height, alpha: !!m.hasAlpha };
  } else {
    const head = readFileSync(f, 'utf8').slice(0, 600);
    const vb = head.match(/viewBox="([^"]*)"/);
    meta.viewBox = vb ? vb[1] : null;
  }
  const refs = countRefs(urlPath);
  result.push({
    file: f.replace(/\\/g, '/'), byte, ...meta,
    thamChieu: refs,
    trangThai: (refs.html + refs.css + refs.src > 0) ? 'DANG_DUNG' : 'MO_COI',
  });
}
result.sort((a, b) => b.byte - a.byte);
writeFileSync('output/p3.1-image-audit/kiem-ke.json', JSON.stringify({ thoiGian: new Date().toISOString(), soTep: result.length, tongByte: result.reduce((s, r) => s + r.byte, 0), tep: result }, null, 1));
console.log('Đã ghi output/p3.1-image-audit/kiem-ke.json — ' + result.length + ' tệp, tổng ' + result.reduce((s, r) => s + r.byte, 0) + ' byte');
for (const r of result.filter((x) => x.trangThai === 'MO_COI')) console.log('CHƯA TÌM THẤY THAM CHIẾU: ' + r.file + ' (' + r.byte + ' byte, tham chiếu html=' + r.thamChieu.html + ' css=' + r.thamChieu.css + ' src=' + r.thamChieu.src + ')');
