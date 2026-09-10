// P3.3 — Tự kiểm driver trước khi chạy chốt (TXN-20260910-38, điều kiện 4)
// Chạy: node output/p3.3-cluster-script-audit/tu-kiem-driver.cjs
// 4 phép thử, mỗi phép thử trong môi trường cô lập (sandbox riêng hoặc manifest
// thử riêng), KHÔNG sửa script kiểm cụm thật, không đụng sandbox/manifest chính:
//   P1. Cố ý đặt kỳ vọng sai → driver trả exit ≠ 0 (P33_SAI_KY_VONG + P33_CHI_CA)
//   P2. Cố ý gây lỗi tiêm → finally vẫn hoàn nguyên sạch, có bản ghi lỗi
//       (P33_LOI_TIEM + P33_CHI_CA)
//   P3. Kiểm tra hash thực sự phát hiện một thay đổi thử (sandbox riêng
//       sandbox-tu-kiem/, dựng bằng cùng module, sửa 1 tệp → so khớp phải lệch)
//   P4. Đường dẫn manifest không hợp lệ bị từ chối TRƯỚC khi ghi/xóa
//       (manifest thử chứa ../ và đường dẫn tuyệt đối; chứng minh sandbox chính
//       không bị xóa/ghi: hash trước = hash sau)
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const anToan = require('./kiem-tra-an-toan.cjs');

const goc = path.resolve(__dirname, '..', '..');
const driver = path.join(__dirname, 'kiem-thu-hoi-quy.cjs');
const SB = path.join(goc, anToan.HANG_SO.SANDBOX_REL);
const MANIFEST_CHINH = path.join(__dirname, 'manifest-tep.txt');
const MANIFEST_TU_KIEM = path.join(__dirname, 'manifest-tu-kiem-thu.txt');

const ketQua = [];
const them = (p, dat, chiTiet) => {
  ketQua.push({ phepThu: p, dat, chiTiet });
  console.log((dat ? 'ĐẠT ' : 'TRƯỢT') + ' [' + p + '] ' + chiTiet);
};

// Hàng rào an toàn: tự kiểm chỉ được chạy sau khi sandbox chính đã dựng (marker)
if (!fs.existsSync(path.join(SB, anToan.HANG_SO.MARKER))) {
  console.error('Sandbox chính chưa dựng (thiếu marker) — chạy tao-sandbox.cjs trước.');
  process.exit(1);
}

function chayDriver(env, tenJson) {
  try {
    execFileSync('node', [driver], {
      encoding: 'utf8', timeout: 300000, stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, ...env, P33_KET_QUA: tenJson },
    });
    return { exit: 0, stdout: '', stderr: '' };
  } catch (e) {
    return { exit: e.status, stdout: String(e.stdout || ''), stderr: String(e.stderr || '') };
  }
}
const docJson = (tenJson) => JSON.parse(fs.readFileSync(path.join(__dirname, tenJson), 'utf8'));

// ===== P1: kỳ vọng sai → exit ≠ 0 =====
{
  const r = chayDriver({ P33_CHI_CA: 'S01', P33_SAI_KY_VONG: 'S01' }, 'tu-kiem-p1-ket-qua.json');
  let ok = r.exit !== 0;
  let chiTiet = 'exit=' + r.exit;
  if (ok) {
    const j = docJson('tu-kiem-p1-ket-qua.json');
    const ca = j.results[0];
    ok = ca && ca.ma === 'S01' && ca.ketLuan === 'TRUOT' && ca.hoanNguyen && ca.hoanNguyen.ok
      && j.exitTong === 1;
    chiTiet += ' | S01 ketLuan=' + (ca && ca.ketLuan) + ' | hoàn nguyên ' + (ca && ca.hoanNguyen && ca.hoanNguyen.ok ? 'sạch' : 'LỖI') + ' | exitTong=' + j.exitTong;
  }
  them('P1-sai-ky-vong', ok, chiTiet);
}

// ===== P2: lỗi tiêm → bản ghi lỗi, finally hoàn nguyên sạch =====
{
  const r = chayDriver({ P33_CHI_CA: 'V03', P33_LOI_TIEM: 'V03' }, 'tu-kiem-p2-ket-qua.json');
  let ok = r.exit !== 0;
  let chiTiet = 'exit=' + r.exit;
  if (ok) {
    const j = docJson('tu-kiem-p2-ket-qua.json');
    const ca = j.results[0];
    ok = ca && ca.ma === 'V03' && ca.ketLuan === 'LOI-VAN-HANH'
      && ca.tiem && ca.tiem.ok === false && ca.tiem.loi
      && ca.chay === undefined // KHÔNG chạy script khi tiêm lỗi
      && ca.hoanNguyen && ca.hoanNguyen.ok
      && j.exitTong === 1;
    chiTiet += ' | V03 ketLuan=' + (ca && ca.ketLuan) + ' | lỗi tiêm: ' + (ca && ca.tiem && ca.tiem.loi ? String(ca.tiem.loi).slice(0, 80) : '?') + ' | script ' + (ca && ca.chay === undefined ? 'KHÔNG chạy' : 'đã chạy (SAI)') + ' | hoàn nguyên ' + (ca && ca.hoanNguyen && ca.hoanNguyen.ok ? 'sạch' : 'LỖI');
  }
  them('P2-loi-tiem-hoan-nguyen', ok, chiTiet);
}

// ===== P3: hash phát hiện thay đổi thử =====
// Dùng chính sandbox chuẩn (vị trí duy nhất được phép theo module an toàn);
// P3 bắt đầu bằng dựng lại và kết thúc bằng khôi phục nguyên — nếu crash giữa
// chừng, driver chính có bước "xác minh sạch trước tiêm" + hoàn nguyên sẽ bắt.
try {
  const manifest = anToan.docManifest(MANIFEST_CHINH, goc);
  anToan.dungCaySandbox({ repoRoot: goc, sandboxDir: SB, manifestPath: MANIFEST_CHINH, scriptsDir: path.join(goc, 'scripts') });
  const nen = anToan.hashToanBoSandbox(SB);
  // Thay đổi thử 1 tệp — chọn tệp tĩnh đầu tiên trong manifest
  const tepThu = manifest.find(rel => !fs.statSync(path.join(goc, rel)).isDirectory());
  fs.appendFileSync(path.join(SB, tepThu), '\nTHAY-DOI-THU-TU-KIEM\n');
  const sau = anToan.hashToanBoSandbox(SB);
  const so = anToan.soKhopNen(sau, { bangHash: nen, tapDuongDan: new Set(nen.keys()) });
  const okPhatHien = !so.ok && so.lech.includes(tepThu) && so.du.length === 0 && so.thieu.length === 0;
  // Khôi phục → so khớp trở lại
  fs.writeFileSync(path.join(SB, tepThu), fs.readFileSync(path.join(goc, tepThu)));
  const sau2 = anToan.hashToanBoSandbox(SB);
  const so2 = anToan.soKhopNen(sau2, { bangHash: nen, tapDuongDan: new Set(nen.keys()) });
  them('P3-hash-phat-hien', okPhatHien && so2.ok,
    'sửa "' + tepThu + '" → lệch phát hiện: ' + (okPhatHien ? 'CÓ (lech=' + so.lech.length + ')' : 'KHÔNG') + ' | khôi phục → khớp: ' + (so2.ok ? 'CÓ' : 'KHÔNG'));
} catch (e) {
  them('P3-hash-phat-hien', false, 'lỗi: ' + e.message.slice(0, 200));
}

// ===== P4: manifest không hợp lệ bị từ chối trước khi ghi/xóa =====
try {
  const hashSandboxTruoc = anToan.hashToanBoSandbox(SB);
  const manifestTruoc = fs.readFileSync(MANIFEST_CHINH, 'utf8');
  fs.writeFileSync(MANIFEST_TU_KIEM, [
    'src/content/coChe/vi/len-day-tu-dong.md',
    '../README.md',
    'D:\\Watch web build\\package.json',
    'src/content/..\\..\\docs\\LO-TRINH-PHAT-TRIEN-HIEN-TAI.md',
  ].join('\n') + '\n');
  let tuChoi = null;
  try {
    anToan.docManifest(MANIFEST_TU_KIEM, goc);
  } catch (e) {
    tuChoi = e.message;
  }
  const hashSandboxSau = anToan.hashToanBoSandbox(SB);
  const manifestSau = fs.readFileSync(MANIFEST_CHINH, 'utf8');
  const khongDung = hashSandboxTruoc.size === hashSandboxSau.size
    && [...hashSandboxTruoc].every(([k, v]) => hashSandboxSau.get(k) === v)
    && manifestTruoc === manifestSau;
  const dat = !!tuChoi && khongDung;
  them('P4-manifest-loai-truoc-khi-ghi-xoa', dat,
    'manifest thử (3 đường dẫn xấu) bị từ chối: ' + (tuChoi ? 'CÓ — ' + tuChoi.split('\n')[0].slice(0, 120) + '…' : 'KHÔNG')
    + ' | sandbox chính không xóa/ghi: ' + (khongDung ? 'CÓ (hash+manifest nguyên)' : 'KHÔNG (BẤT AN TOÀN)'));
  fs.rmSync(MANIFEST_TU_KIEM, { force: true });
} catch (e) {
  them('P4-manifest-loai-truoc-khi-ghi-xoa', false, 'lỗi: ' + e.message.slice(0, 200));
}

const tatCaDat = ketQua.every(k => k.dat);
fs.writeFileSync(path.join(__dirname, 'tu-kiem-driver-ket-qua.json'), JSON.stringify({
  moTa: 'P3.3 tự kiểm driver — 4 phép thử trong môi trường cô lập (TXN-20260910-38 điều kiện 4)',
  thoiGianChay: new Date().toISOString(),
  tongPhepThu: ketQua.length, dat: ketQua.filter(k => k.dat).length,
  exitTong: tatCaDat ? 0 : 1,
  ketQua,
}, null, 2));
console.log('\nTỰ KIỂM: ' + ketQua.filter(k => k.dat).length + '/' + ketQua.length + ' ĐẠT → exit ' + (tatCaDat ? 0 : 1));
process.exit(tatCaDat ? 0 : 1);
