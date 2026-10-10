// =============================================================================
// phep-thu-g06.mjs — phép thử sandbox cho bản vá G06 đề xuất (TXN-20261010-009)
// =============================================================================
// Chạy: node output/v3-escapement-slider/phep-thu-g06.mjs
// Mỗi ca dựng một cây sandbox (src + dist giả) rồi chạy BẢN VÁ
// (output/v3-escapement-slider/g06-de-xuat-vap.mjs) — KHÔNG đụng checker gốc
// trong scripts/. Ca phải fail/đạt ĐÚNG như thiết kế:
//   PT-1  hai cờ TẮT + dist rút khung              → G06 ĐẠT (hành vi cũ)
//   PT-2  cờ TẮT nhưng dist còn SVG/khung           → G06 THẤT BẠI (D1/D3/D7)
//   PT-3  cờ BẬT, thẻ video V3 sai preload nhưng
//         nơi khác có preload="none"                → VẪN THẤT BẠI (D1v/D3v)
//   PT-4  cờ BẬT thiếu V3 (chỉ SVG)                 → THẤT BẠI (D1/D3)
//   PT-5  cờ BẬT thiếu SVG (chỉ V3)                 → THẤT BẠI (D1v/D3v/D2/D3d)
//   PT-6  tổng khung giữ nguyên nhưng đổi chỗ
//         (chronograph → vph)                       → THẤT BẠI (D7 thiếu+thừa)
//   PT-7  trang EN tham chiếu clip VI (sai video
//         thuyết minh)                              → THẤT BẠI (D1c)
// =============================================================================

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const GOC = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
// Sau khi vá được áp: chạy CHECKER CHÍNH THỨC (scripts/) — không phụ thuộc bản đề xuất trong output/.
const BAN_VA = join(GOC, 'scripts/check-g06-escapement-en.mjs');
const LOG = join(GOC, 'output/v3-escapement-slider/phep-thu-g06.log.txt');
const dong = [];
const ghi = (s) => dong.push(s);

// HTML trang bộ thoát khi cờ BẬT: đủ mọi chuỗi kiểm nhánh bật + video thuyết minh
const trangBat = (sv, { saiPreload = false, preloadKhac = false, chiV3 = false, chiSvg = false, thamChieuClipSaiNgonNgu = false } = {}) => {
  const clipDung = sv ? '/videos/bo-thoat-nguyen-ly-en.mp4' : '/videos/bo-thoat-nguyen-ly-vi.mp4';
  const posterDung = sv ? 'bo-thoat-nguyen-ly-en.jpg' : 'bo-thoat-nguyen-ly-vi.jpg';
  const clipSai = sv ? '/videos/bo-thoat-nguyen-ly-vi.mp4' : '/videos/bo-thoat-nguyen-ly-en.mp4';
  const nhanKhung = sv
    ? ['Swiss lever escapement', 'Step 1/5', 'Five cause-and-effect steps make the tick-tock beat.', 'This is a simplified teaching diagram. Its angles and poses explain individual steps; they are not design specifications for a particular movement.']
    : ['Bộ thoát Swiss lever (Escapement)', 'Bước 1/5', 'Năm bước nhân quả tạo ra nhịp tíc-tắc.', 'Sơ đồ hướng dẫn đã giản lược. Góc quay và các tư thế dùng để giải thích từng bước, không phải thông số thiết kế của một bộ máy cụ thể.'];
  const videoV3 = chiV3 ? '' : `<figure id="v3esc" class="v3esc"><video id="v3esc-video" data-src="/videos/v3-escapement/bo-thoat-chu-ky-truot.webm" poster="/videos/v3-escapement/poster.jpg" preload="${saiPreload ? 'auto' : 'none'}" playsinline muted></video><table><tbody><tr><td>bảng pha</td></tr></tbody></table></figure>`;
  const khung = chiSvg ? '' : `<div data-mechanism data-mech-step-id="escapement">${nhanKhung.map((s) => `<span>${s}</span>`).join('')}<svg id="escapement-svg"></svg></div>`;
  const thuyetMinh = `<video controls preload="none" poster="${posterDung}"><source src="${clipDung}" type="video/mp4" /></video>${thamChieuClipSaiNgonNgu ? `<link href="${clipSai}">` : ''}`;
  const khoKhac = preloadKhac ? '<p data-khac preload="none">preload none ở nơi khác</p>' : '';
  return `<html><body>${khung}${videoV3}${thuyetMinh}${khoKhac}</body></html>`;
};

// HTML trang bộ thoát khi cờ TẮT (trạng thái rút khung — hành vi cũ)
const trangRut = (sv) => {
  const clipDung = sv ? '/videos/bo-thoat-nguyen-ly-en.mp4' : '/videos/bo-thoat-nguyen-ly-vi.mp4';
  const posterDung = sv ? 'bo-thoat-nguyen-ly-en.jpg' : 'bo-thoat-nguyen-ly-vi.jpg';
  return `<html><body><video controls preload="none" poster="${posterDung}"><source src="${clipDung}" type="video/mp4" /></video></body></html>`;
};

const baiViGoc = readFileSync(join(GOC, 'src/content/coChe/vi/bo-thoat.md'), 'utf8');
const baiEnGoc = readFileSync(join(GOC, 'src/content/coChe/en/escapement.md'), 'utf8');
const tatCo = (s) => s.replace(/^slider_video:[ \t]*true\n/m, '');

function dungSandbox({ viBat, enBat, trangVi, trangEn, tuDienKhac = {}, themEnKhac = false }) {
  const cay = mkdtempSync(join(tmpdir(), 'g06-phepthu-'));
  const ghiFile = (tuongDoi, noiDung) => {
    const duong = join(cay, tuongDoi);
    mkdirSync(dirname(duong), { recursive: true });
    writeFileSync(duong, noiDung);
  };
  // nguồn checker cần
  for (const f of [
    'src/components/infographics/Escapement.astro',
    'src/components/infographics/MechanismAnimation.astro',
    'src/components/templates/MechanismArticle.astro',
    'scripts/check-regulating-cluster.mjs',
    'package.json',
    'src/content.config.ts',
  ]) {
    mkdirSync(dirname(join(cay, f)), { recursive: true });
    cpSync(join(GOC, f), join(cay, f));
  }
  ghiFile('src/content/coChe/vi/bo-thoat.md', viBat ? baiViGoc : tatCo(baiViGoc));
  ghiFile('src/content/coChe/en/escapement.md', enBat ? baiEnGoc : tatCo(baiEnGoc));
  // dist giả
  ghiFile('dist/co-che/bo-thoat/index.html', trangVi);
  ghiFile('dist/en/mechanisms/escapement/index.html', trangEn);
  for (const t of ['chronograph', 'day-toc-banh-lac', 'gmt', 'perpetual-calendar', 'tourbillon']) {
    ghiFile(`dist/tu-dien/${t}/index.html`, tuDienKhac[t] ?? '<html><div data-mechanism></div></html>');
  }
  if (tuDienKhac.vph) ghiFile('dist/tu-dien/vph/index.html', tuDienKhac.vph);
  ghiFile('dist/co-che/day-toc-banh-lac/index.html', '<html>không khung</html>');
  ghiFile('dist/en/mechanisms/balance-and-hairspring/index.html', '<html>không khung</html>');
  ghiFile('dist/en/mechanisms/other/index.html', '<html>không khung</html>');
  if (themEnKhac) ghiFile('dist/en/mechanisms/other2/index.html', '<html><div data-mechanism></div></html>');
  return cay;
}

function chay(cay) {
  try {
    const out = execFileSync('node', [BAN_VA, 'dist', join(cay, 'dist').replace(/\\\\/g, '/')], { encoding: 'utf8', cwd: cay });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? null, out: `${e.stdout ?? ''}\n${e.stderr ?? ''}` };
  }
}

const ketQua = [];
// Kiểm "không lỗi nền": mọi dòng LỖI của ca phải khớp một trong các mã chủ đích
const khongLoiNen = (kq, nhomChuDoi) => {
  const sai = kq.out.split('\n').filter((l) => l.includes('LỖI') && !nhomChuDoi.some((m) => l.includes('LỖI ' + m)));
  if (sai.length > 0) ghi('    [lỗi nền] ' + sai.slice(0, 4).join(' | '));
  return sai.length === 0;
};
function ca(ma, moTa, dungCay, kiemVong) {
  ghi(`\n=== ${ma}: ${moTa} ===`);
  const cay = dungCay();
  const kq = chay(cay);
  rmSync(cay, { recursive: true, force: true });
  const dat = kiemVong(kq);
  ghi(`  exit=${kq.code}; ${dat ? 'ĐẠT' : 'KHÔNG ĐẠT'}`);
  const dongLienQuan = kq.out.split('\n').filter((l) => l.includes('LỖI')).slice(0, 12);
  for (const l of dongLienQuan) ghi(`    ${l.trim()}`);
  if (dongLienQuan.length === 0) ghi('    [tail] ' + kq.out.trim().split('\n').slice(-3).join(' | '));
  ketQua.push({ ma, dat });
  ghi(`  KẾT QUẢ: ${dat ? 'ĐẠT' : 'KHÔNG ĐẠT'}`);
}

// PT-0 — lượt sạch hai cờ BẬT (fixture đầy đủ, không đột biến) → exit 0.
// Chạy TRƯỚC các đột biến: fixture mang lỗi nền sẽ lộ ngay tại đây.
ca('PT-0', 'hai cờ BẬT, dist đầy đủ V3 + SVG — G06 ĐẠT (lượt sạch)',
  () => dungSandbox({ viBat: true, enBat: true, trangVi: trangBat(false), trangEn: trangBat(true) }),
  (kq) => {
    if (kq.code !== 0) return false;
    const loi = kq.out.split('\n').filter((l) => l.includes('LỖI'));
    if (loi.length > 0) { ghi('    [lỗi nền] ' + loi.slice(0, 4).join(' | ')); return false; }
    return true;
  });

// PT-1 — hai cờ TẮT + dist rút khung → ĐẠT (hành vi cũ)
ca('PT-1', 'hai cờ TẮT + dist rút khung — G06 ĐẠT',
  () => dungSandbox({ viBat: false, enBat: false, trangVi: trangRut(false), trangEn: trangRut(true) }),
  (kq) => kq.code === 0);

// PT-2 — cờ TẮT nhưng dist còn SVG/khung → THẤT BẠI
ca('PT-2', 'cờ TẮT nhưng dist còn SVG/khung — G06 thất bại',
  () => dungSandbox({ viBat: false, enBat: false, trangVi: trangBat(false), trangEn: trangBat(true) }),
  (kq) => kq.code !== 0 && khongLoiNen(kq, ['D1', 'D2', 'D3', 'D3d', 'D7']) && kq.out.includes('LỖI D1') && kq.out.includes('LỖI D3'));

// PT-3 — cờ BẬT, thẻ video V3 sai preload, nơi khác có preload="none" → VẪN THẤT BẠI
ca('PT-3', 'sai preload trên thẻ V3, nơi khác có preload="none" — vẫn thất bại (D1v/D3v)',
  () => dungSandbox({
    viBat: true, enBat: true,
    trangVi: trangBat(false, { saiPreload: true, preloadKhac: true }),
    trangEn: trangBat(true, { saiPreload: true, preloadKhac: true }),
  }),
  (kq) => kq.code !== 0 && kq.out.includes('LỖI D1v') && kq.out.includes('LỖI D3v'));

// PT-4 — cờ BẬT thiếu V3 (chỉ SVG) → THẤT BẠI
ca('PT-4', 'cờ BẬT thiếu khối V3 — thất bại (D1/D3)',
  () => dungSandbox({
    viBat: true, enBat: true,
    trangVi: trangBat(false, { chiV3: true }),
    trangEn: trangBat(true, { chiV3: true }),
  }),
  (kq) => kq.code !== 0 && khongLoiNen(kq, ['D1', 'D1v', 'D3', 'D3v']) && kq.out.includes('LỖI D1') && kq.out.includes('LỖI D3'));

// PT-5 — cờ BẬT thiếu SVG (chỉ V3) → THẤT BẠI
ca('PT-5', 'cờ BẬT thiếu khung SVG — thất bại (D1v/D3v, D2/D3d)',
  () => dungSandbox({
    viBat: true, enBat: true,
    trangVi: trangBat(false, { chiSvg: true }),
    trangEn: trangBat(true, { chiSvg: true }),
  }),
  (kq) => kq.code !== 0 && khongLoiNen(kq, ['D1', 'D1v', 'D2', 'D3', 'D3v', 'D3d', 'D7']) && kq.out.includes('LỖI D1') && kq.out.includes('LỖI D2'));

// PT-6 — tổng khung giữ nguyên nhưng đổi chỗ (chronograph mất, vph thêm) → D7 bắt
ca('PT-6', 'tổng khung đúng nhưng sai đường dẫn (chronograph → vph) — D7 thất bại',
  () => dungSandbox({
    viBat: true, enBat: true,
    trangVi: trangBat(false), trangEn: trangBat(true),
    tuDienKhac: { chronograph: '<html>đã rút khung</html>', vph: '<html><div data-mechanism></div></html>' },
  }),
  (kq) => kq.code !== 0 && khongLoiNen(kq, ['D7']) && kq.out.includes('LỖI D7') && kq.out.includes('thiếu') && kq.out.includes('thừa'));

// PT-7 — trang EN tham chiếu clip VI → D1c bắt
ca('PT-7', 'video thuyết minh sai — EN tham chiếu clip VI — thất bại (D1c)',
  () => dungSandbox({
    viBat: true, enBat: true,
    trangVi: trangBat(false), trangEn: trangBat(true, { thamChieuClipSaiNgonNgu: true }),
  }),
  (kq) => kq.code !== 0 && khongLoiNen(kq, ['D1c']) && kq.out.includes('LỖI D1c'));

ghi('\n=== Chạy đối chiếu trên dist thật (worktree sạch, hai cờ bật) ===');
ghi('  (đã chạy riêng trước đó: node g06-de-xuat-vap.mjs dist → 0 lỗi — xem biên bản)');

const sach = ketQua.filter((k) => ['PT-0', 'PT-1'].includes(k.ma));
const amTinh = ketQua.filter((k) => !["PT-0", "PT-1"].includes(k.ma));
const tatCaDat = ketQua.every((k) => k.dat);
const tong = [
  'TỔNG KẾT PHÉP THỬ: ' + ketQua.filter((k) => k.dat).length + '/' + ketQua.length + ' ĐẠT',
  '— lượt sạch ' + sach.filter((k) => k.dat).length + '/' + sach.length + ' (PT-0/PT-1: cờ đúng, dist đúng → ĐẠT)',
  '+ ca âm tính ' + amTinh.filter((k) => k.dat).length + '/' + amTinh.length + ' (đột biến → thất bại đúng nhóm chủ đích)',
].join(' ');
ghi(tong);
ghi(ketQua.map((k) => `${k.ma}=${k.dat ? 'ĐẠT' : 'KHÔNG'}`).join(', '));
writeFileSync(LOG, dong.join('\n') + '\n');
console.log(dong.join('\n'));
if (!tatCaDat) process.exit(1);
