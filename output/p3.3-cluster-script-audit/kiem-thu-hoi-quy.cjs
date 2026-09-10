// P3.3 — Driver kiểm thử hồi quy 35 ca trên sandbox cô lập (TXN-20260910-31;
// TXN-20260910-38: bản ghi đầy đủ từng ca, hoàn nguyên + hash từng ca qua
// module an toàn dùng chung, sandboxBan phản ánh lỗi thật, exit ≠ 0 khi
// trượt hoặc lỗi vận hành)
// Chạy: node output/p3.3-cluster-script-audit/kiem-thu-hoi-quy.cjs
// Chế độ tự kiểm (dùng bởi tu-kiem-driver.cjs, không dùng cho chốt):
//   P33_CHI_CA=S01      — chỉ chạy 1 ca
//   P33_SAI_KY_VONG=S01 — cố ý sai kỳ vọng ca đó (chứng minh driver TRUỢT đúng)
//   P33_LOI_TIEM=V03    — cố ý ép lỗi tiêm ca đó (chứng minh finally hoàn nguyên)
//   P33_KET_QUA=t.json  — tên tệp JSON kết quả (mặc định kiem-thu-hoi-quy-ket-qua.json)
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const anToan = require('./kiem-tra-an-toan.cjs');

const goc = path.resolve(__dirname, '..', '..');
const SB = path.join(goc, anToan.HANG_SO.SANDBOX_REL);
const MANIFEST = path.join(__dirname, 'manifest-tep.txt');
const SCRIPTS_DIR = path.join(goc, 'scripts');

const CHI_CA = process.env.P33_CHI_CA || null;
const SAI_KY_VONG = process.env.P33_SAI_KY_VONG || null;
const LOI_TIEM = process.env.P33_LOI_TIEM || null;
const TEN_KET_QUA = process.env.P33_KET_QUA || 'kiem-thu-hoi-quy-ket-qua.json';

// ===== Danh sách 35 ca (giữ nguyên từ TXN-20260910-31) =====
const S = ['check-automatic-energy-cluster.mjs','check-brand-value-retention.mjs','check-calendar-complications-cluster.mjs','check-care-cluster.mjs','check-chronograph-cluster.mjs','check-daily-care-cluster.mjs','check-financial-claims-cluster.mjs','check-first-watch-cluster.mjs','check-high-complications-cluster.mjs','check-movement-finishing-cluster.mjs','check-precision-certification-cluster.mjs','check-protection-cluster.mjs','check-regulating-cluster.mjs'];
const nhom = (ten) => ({ nhom: ten });
const CLEAN = S.map((s, i) => ({ ...nhom('PHIEN-SACH'), ma: 'S' + String(i+1).padStart(2,'0'), script: s, fixture: null, action: null, inject: null, expectExit: 0, expectMsg: null }));

const VIOL = [
  { ma: 'V01', script: S[0], fixture: 'src/content/coChe/vi/len-day-tu-dong.md', inject: 'Harwood 1923 — mốc không nguồn.', expectMsg: 'Harwood' },
  { ma: 'V02', script: S[2], fixture: 'src/content/coChe/vi/perpetual-calendar.md', inject: 'Mudge 1762 — tiên phong không nguồn.', expectMsg: 'Mudge' },
  { ma: 'V03', script: S[4], fixture: 'src/content/coChe/vi/chronograph.md', inject: 'Hamilton', expectMsg: 'Hamilton' },
  { ma: 'V04', script: S[11], fixture: 'src/content/coChe/vi/chong-tu.md', inject: '4.800 gauss', expectMsg: '4.800 gauss' },
  { ma: 'V05', script: S[12], fixture: 'src/content/coChe/vi/bo-thoat.md', inject: 'Đây là phát minh quan trọng nhất của bộ máy.', expectMsg: 'quan trọng nhất' },
  { ma: 'V06', script: S[10], fixture: 'src/content/tuDien/vi/chronometer.md', inject: '±15 giây/ngày', expectMsg: '±' },
  { ma: 'V07', script: S[9], fixture: 'src/content/tuDien/vi/guilloche.md', inject: '| Cột | Giá trị |', expectMsg: 'bảng Markdown' },
  { ma: 'V08', script: S[1], fixture: 'src/content/thuongHieu/vi/tissot.md', action: 'insert-after', afterText: 'draft: false', inject: 'value_retention: "giá trị giữ giá cao"', expectMsg: 'value_retention_label' },
  { ma: 'V09', script: S[6], fixture: 'src/content/huongDan/vi/microbrand-la-gi.md', inject: 'Đây là khoản đầu tư an toàn.', expectMsg: 'nhận định đầu tư' },
  { ma: 'V10', script: S[7], fixture: 'src/content/huongDan/vi/chon-dong-ho-dau-tien.md', inject: 'Đây là lựa chọn giữ giá tốt.', expectMsg: 'giữ giá' },
  { ma: 'V11', script: S[8], fixture: 'src/content/coChe/vi/tourbillon.md', inject: 'Breguet phát minh tourbillon năm 1801.', expectMsg: 'Breguet' },
  { ma: 'V12', script: S[3], fixture: 'src/content/huongDan/vi/bao-duong-dong-ho.md', action: 'delete-text', deleteText: 'updated: "2026-09-02"', inject: null, expectMsg: 'updated' },
  { ma: 'V13', script: S[5], fixture: 'src/components/infographics/WaterResistance.astro', inject: '<p>Chịu 50 m khi bơi.</p>', expectMsg: 'R5c' },
].map(c => ({ ...nhom('VI-PHAM'), ...c, expectExit: 1 }));

const EXC = [
  { ma: 'E01', script: S[12], fixture: 'src/content/coChe/vi/bo-thoat.md', inject: 'Theo FHH, đây là mốc quan trọng nhất.', expectExit: 0, expectMsg: null },
  { ma: 'E02', script: S[5], fixture: 'src/content/huongDan/vi/len-day-dong-ho.md', inject: 'Không ghi số vòng, number of turns — theo manual.', expectExit: 0, expectMsg: null },
  { ma: 'E03', script: S[11], fixture: 'src/content/coChe/vi/chong-tu.md', inject: 'Mẫu chịu 15.000 gauss theo chứng nhận METAS.', expectExit: 0, expectMsg: null },
  { ma: 'E04', script: S[6], fixture: 'src/content/huongDan/vi/microbrand-la-gi.md', inject: 'Mục này chỉ mang tính tham khảo, không phải tư vấn đầu tư.', expectExit: 0, expectMsg: null },
].map(c => ({ ...nhom('NGOAI-LE'), ...c }));

const NEAR = [
  { ma: 'N01', script: S[12], fixture: 'src/content/coChe/vi/bo-thoat.md', inject: 'Theo FHH, lịch sử dài.\nĐây là phát minh quan trọng nhất của bộ máy.', expectMsg: 'quan trọng nhất', expectExit: 1 },
  { ma: 'N02', script: S[6], fixture: 'src/content/huongDan/vi/microbrand-la-gi.md', inject: 'Không phải tư vấn đầu tư. Nhưng mẫu này rẻ nhất.', expectMsg: 'rẻ nhất', expectExit: 1 },
].map(c => ({ ...nhom('CANH-NGOAI-LE'), ...c }));

const MISS = [
  { ma: 'M01', script: S[12], fixture: 'src/content/tuDien/vi/vph.md', action: 'delete-file', inject: null, expectMsg: 'Thiếu tệp phạm vi', expectExit: 1 },
  { ma: 'M02', script: S[5], fixture: 'src/content/huongDan/vi/len-day-dong-ho.md', action: 'delete-text', deleteText: '](/tu-dien/num-van)', inject: null, expectMsg: 'liên kết bắt buộc', expectExit: 1 },
  { ma: 'M03', script: S[7], fixture: 'src/content/huongDan/vi/chon-dong-ho-dau-tien.md', action: 'delete-text', deleteText: 'title:', inject: null, expectMsg: 'title', expectExit: 1 },
].map(c => ({ ...nhom('THIEU-TEP-TRUONG'), ...c }));

const TAT_CA = [...CLEAN, ...VIOL, ...EXC, ...NEAR, ...MISS];
const danhSach = CHI_CA ? TAT_CA.filter(c => c.ma === CHI_CA) : TAT_CA;
if (CHI_CA && !danhSach.length) {
  console.error('P33_CHI_CA không khớp ca nào: ' + CHI_CA);
  process.exit(1);
}

// ===== Đếm số lần chuỗi xuất hiện =====
const demLan = (noiDung, chu) => noiDung.split(chu).length - 1;

// ===== Phân tích thông báo: dòng, cụm rule, fixture, số dòng tệp script báo =====
function phanTichThongBao(stdout, stderr, expectMsg, fixture) {
  if (!expectMsg) return { ghiChu: 'ca không đặt expectMsg — không phân tích thông báo' };
  const vanBan = stdout + '\n' + stderr;
  const cacDong = [];
  const dongList = vanBan.split('\n');
  for (let i = 0; i < dongList.length; i++) {
    const dong = dongList[i];
    if (!dong.includes(expectMsg)) continue;
    const o = { soThuTuTrongOutput: i + 1, noiDung: dong.slice(0, 400), fixtureKhop: false, cuem: [], soDongFile: null };
    if (fixture && dong.includes(path.basename(fixture))) o.fixtureKhop = true;
    const cuem = dong.match(/\bR\d+[a-z]?\b/g);
    if (cuem) o.cuem = [...new Set(cuem)];
    const fileLine = dong.match(/([\w.\-/\\]+\.(?:md|astro|ts|mjs|json)):(\d+)/);
    if (fileLine) o.soDongFile = { tep: fileLine[1], dong: Number(fileLine[2]) };
    cacDong.push(o);
  }
  if (!cacDong.length) {
    return { cacDong: [], scriptKhongBaoDong: true, ghiChu: 'expectMsg không tìm thấy trong output — xem msgFound=false' };
  }
  const coSoDong = cacDong.some(d => d.soDongFile);
  return {
    cacDong,
    scriptKhongBaoDong: !coSoDong,
    ghiChu: coSoDong
      ? 'script báo tệp+dòng; kiểm dòng/cụm thuộc fixture ở cacDong'
      : 'script KHÔNG báo số dòng/tệp trong thông báo (đặc tính script, không phải driver) — kiểm theo nội dung dòng',
  };
}

// ===== Thực hiện tiêm — xác minh mục tiêu + số vị trí =====
function thucHienTiem(c) {
  const duongDan = path.join(SB, c.fixture);
  if (!fs.existsSync(duongDan)) {
    return { ok: false, loi: 'fixture không tồn tại: ' + c.fixture };
  }
  const noiDung = fs.readFileSync(duongDan, 'utf8');
  const ghi = { soViTriKyVong: null, soViTriThucTe: null };

  if (c.inject && !c.action) {
    // append — chuỗi tiêm xuất hiện thêm đúng 1 lần
    ghi.soViTriKyVong = demLan(noiDung, c.inject) + 1;
    fs.appendFileSync(duongDan, '\n' + c.inject + '\n');
    ghi.soViTriThucTe = demLan(fs.readFileSync(duongDan, 'utf8'), c.inject);
  } else if (c.action === 'insert-after') {
    const soLan = demLan(noiDung, c.afterText);
    if (soLan < 1) return { ok: false, loi: 'afterText không tìm thấy trong ' + c.fixture, ghi };
    ghi.soViTriKyVong = soLan; // afterText giữ nguyên số lần; chuỗi chèn xuất hiện +1
    const viTri = noiDung.indexOf(c.afterText);
    const cuoiDong = noiDung.indexOf('\n', viTri) + 1;
    fs.writeFileSync(duongDan, noiDung.slice(0, cuoiDong) + c.inject + '\n' + noiDung.slice(cuoiDong));
    const sau = fs.readFileSync(duongDan, 'utf8');
    ghi.soViTriThucTe = demLan(sau, c.afterText);
    if (demLan(sau, c.inject) !== demLan(noiDung, c.inject) + 1) {
      return { ok: false, loi: 'chèn không tăng đúng 1 lần chuỗi inject', ghi };
    }
  } else if (c.action === 'delete-text') {
    const soLan = demLan(noiDung, c.deleteText);
    if (soLan < 1) return { ok: false, loi: 'deleteText không tìm thấy trong ' + c.fixture, ghi };
    ghi.soViTriTruoc = soLan;
    fs.writeFileSync(duongDan, noiDung.split(c.deleteText).join(''));
    ghi.soViTriThucTe = demLan(fs.readFileSync(duongDan, 'utf8'), c.deleteText);
    ghi.soViTriKyVong = 0; // sau xóa phải còn 0 lần
  } else if (c.action === 'delete-file') {
    ghi.soViTriTruoc = 1;
    fs.rmSync(duongDan);
    ghi.soViTriThucTe = fs.existsSync(duongDan) ? 1 : 0;
    ghi.soViTriKyVong = 0; // sau xóa tệp phải không còn
  } else {
    return { ok: false, loi: 'ca không có thao tác tiêm hợp lệ' };
  }

  if (ghi.soViTriThucTe !== ghi.soViTriKyVong) {
    return { ok: false, loi: 'số vị trí thay đổi lệch: kỳ vọng ' + ghi.soViTriKyVong + ', thực tế ' + ghi.soViTriThucTe, ghi };
  }
  return { ok: true, ...ghi };
}

// ===== Chạy script trong sandbox =====
function chayScript(ten) {
  const t0 = new Date().toISOString();
  try {
    const r = execFileSync('node', [path.join('scripts', ten)],
      { cwd: SB, encoding: 'utf8', timeout: 60000, stdio: ['pipe', 'pipe', 'pipe'] });
    return {
      exit: 0, stdout: r || '', stderr: '', loiVanHanh: null,
      thoiDiemBatDau: t0, thoiDiemKetCham: new Date().toISOString(),
    };
  } catch (e) {
    const st = (e.status === undefined || e.status === null) ? null : e.status;
    const laTimeout = e.signal === 'SIGTERM';
    return {
      exit: st,
      stdout: String(e.stdout || ''),
      stderr: String(e.stderr || ''),
      loiVanHanh: laTimeout ? 'timeout' : (st === null ? ('launch-error: ' + (e.code || e.message)) : null),
      thoiDiemBatDau: t0, thoiDiemKetCham: new Date().toISOString(),
    };
  }
}

// ===== Main =====
const results = [];
let sandboxBan = false;
let loiBanNen = null;

console.log('== DỰNG BẢN NỀN SANDBOX (module an toàn dùng chung) ==');
let benNen = null;
try {
  benNen = anToan.xayBenNen({ repoRoot: goc, sandboxDir: SB, manifestPath: MANIFEST, scriptsDir: SCRIPTS_DIR });
  console.log('   bản nền: ' + benNen.soTep + ' tệp | manifest ' + benNen.manifestLines + ' dòng | hash script ' + benNen.scripts.khop + ' khớp | sanity ĐẠT');
} catch (e) {
  loiBanNen = e.message;
  console.error('LỖI BẢN NỀN — dừng: ' + e.message);
}

function hoanNguyen() {
  try {
    anToan.dungCaySandbox({ repoRoot: goc, sandboxDir: SB, manifestPath: MANIFEST, scriptsDir: SCRIPTS_DIR });
    const so = anToan.soKhopNen(anToan.hashToanBoSandbox(SB), benNen);
    return { ok: so.ok, hashKhop: so.hashKhop, duongDanKhop: so.duongDanKhop, chiTietLech: so.ok ? null : { thieu: so.thieu.slice(0, 5), du: so.du.slice(0, 5), lech: so.lech.slice(0, 5) } };
  } catch (e) {
    return { ok: false, hashKhop: false, duongDanKhop: false, chiTietLech: null, loi: e.message };
  }
}

function chay(c) {
  if (sandboxBan) {
    results.push({ ma: c.ma, nhom: c.nhom, ketLuan: 'BO-QUA', lyDo: 'sandbox bẩn từ ca trước — dừng các ca sau', hoanNguyen: null });
    console.log('BỎ   [' + c.ma + '] (sandbox bẩn)');
    return;
  }

  const batDau = new Date().toISOString();
  const ghi = {
    ma: c.ma, nhom: c.nhom, script: c.script,
    fixture: c.fixture || '(không)', action: c.action || (c.inject ? 'append' : '(không)'),
    noiDungTiem: c.inject || c.deleteText || '(không)',
    kyVong: { exit: c.expectExit, msg: c.expectMsg || '(không)' },
  };

  // 1) Xác minh sạch trước khi tiêm
  const sach = anToan.soKhopNen(anToan.hashToanBoSandbox(SB), benNen);
  ghi.sachTruocTiem = { ok: sach.ok, lech: sach.ok ? null : { thieu: sach.thieu.slice(0, 5), du: sach.du.slice(0, 5), lech: sach.lech.slice(0, 5) } };
  if (!sach.ok) {
    const hn = hoanNguyen();
    ghi.hoanNguyen = hn;
    ghi.ketLuan = 'LOI-VAN-HANH';
    ghi.lyDo = 'sandbox không sạch trước tiêm (hoàn nguyên ca trước không đạt)';
    ghi.thoiDiemKetCham = new Date().toISOString();
    const sachLai = anToan.soKhopNen(anToan.hashToanBoSandbox(SB), benNen);
    if (!sachLai.ok) sandboxBan = true;
    results.push(ghi);
    console.log('LOI  [' + c.ma + '] sandbox không sạch trước tiêm');
    return;
  }

  // 2) Tiêm + chạy trong try, hoàn nguyên trong finally
  let ketQuaTiem = { ok: true };
  let chayKetQua = null;
  let hoanNguyenKetQua = null;
  try {
    if (c.fixture) {
      const duongDan = path.join(SB, c.fixture);
      if (LOI_TIEM && c.ma === LOI_TIEM) {
        // Chế độ tự kiểm: ép fixture không tồn tại
        ketQuaTiem = thucHienTiem({ ...c, fixture: c.fixture + '.khong-ton-tai' });
      } else {
        ketQuaTiem = thucHienTiem(c);
      }
      ghi.tiem = ketQuaTiem;
      if (!ketQuaTiem.ok) {
        ghi.ketLuan = 'LOI-VAN-HANH';
        ghi.lyDo = 'lỗi thao tác tiêm: ' + ketQuaTiem.loi + ' — KHÔNG chạy script';
      }
    }
    if (ketQuaTiem.ok) {
      const caChay = { ...c };
      if (SAI_KY_VONG && c.ma === SAI_KY_VONG) {
        // Chế độ tự kiểm: cố ý sai kỳ vọng
        caChay.expectExit = c.expectExit + 1;
        ghi.kyVong = { exit: caChay.expectExit, msg: c.expectMsg || '(không)', saiKyVongCoY: 'kỳ vọng bị đổi +1 để chứng minh driver TRUỢT đúng' };
      }
      chayKetQua = chayScript(caChay.script);
      ghi.chay = chayKetQua;
      const msgFound = caChay.expectMsg ? (chayKetQua.stdout.includes(caChay.expectMsg) || chayKetQua.stderr.includes(caChay.expectMsg)) : null;
      ghi.msgFound = msgFound === null ? 'n/a' : msgFound;
      ghi.thongBao = phanTichThongBao(chayKetQua.stdout, chayKetQua.stderr, caChay.expectMsg, c.fixture);
      if (chayKetQua.loiVanHanh) {
        ghi.ketLuan = 'LOI-VAN-HANH';
        ghi.lyDo = 'lỗi khởi chạy/timeout khi chạy script (' + chayKetQua.loiVanHanh + ') — KHÔNG phải bắt được vi phạm nội dung';
      } else {
        const exitKhop = chayKetQua.exit === caChay.expectExit;
        const msgKhop = caChay.expectMsg ? msgFound : true;
        ghi.ketLuan = exitKhop && msgKhop ? 'DAT' : 'TRUOT';
        ghi.lyDo = ghi.ketLuan === 'DAT' ? null : 'exit ' + chayKetQua.exit + ' ≠ kỳ vọng ' + caChay.expectExit + (caChay.expectMsg && !msgFound ? ' hoặc expectMsg không có trong output' : '');
      }
    }
  } finally {
    hoanNguyenKetQua = hoanNguyen();
    ghi.hoanNguyen = hoanNguyenKetQua;
    ghi.thoiDiemBatDau = batDau;
    ghi.thoiDiemKetCham = new Date().toISOString();
    if (!hoanNguyenKetQua.ok) {
      sandboxBan = true;
      console.log('   HOÀN NGUYÊN LỖI — dừng các ca sau');
    }
  }

  if (!ghi.ketLuan) {
    ghi.ketLuan = 'LOI-VAN-HANH';
    ghi.lyDo = 'ca không hoàn thành đủ bước';
  }
  results.push(ghi);
  console.log((ghi.ketLuan === 'DAT' ? 'DAT  ' : ghi.ketLuan === 'TRUOT' ? 'TRUOT' : 'LOI  ') + ' [' + c.ma + '] exit=' + (ghi.chay ? String(ghi.chay.exit) : 'không chạy') + ' | hoàn nguyên: ' + (hoanNguyenKetQua.ok ? 'sạch' : 'LỖI'));
}

if (!loiBanNen) {
  const tenNhom = [
    ['PHIÊN SẠCH', 'PHIEN-SACH'], ['VI PHẠM', 'VI-PHAM'], ['NGOẠI LỆ', 'NGOAI-LE'],
    ['CẠNH NGOẠI LỆ', 'CANH-NGOAI-LE'], ['THIẾU TỆP/TRƯỜNG', 'THIEU-TEP-TRUONG'],
  ];
  for (const [ten, khoa] of tenNhom) {
    const nhomCa = danhSach.filter(c => c.nhom === khoa);
    if (!nhomCa.length) continue;
    console.log('== ' + ten + ': ' + nhomCa.length + ' ca ==');
    for (const c of nhomCa) chay(c);
  }
}

const dat = results.filter(r => r.ketLuan === 'DAT').length;
const truot = results.filter(r => r.ketLuan === 'TRUOT').length;
const loi = results.filter(r => r.ketLuan === 'LOI-VAN-HANH' || r.ketLuan === 'BO-QUA').length;
console.log('\nTONG: ' + results.length + ' ca | DAT: ' + dat + ' | TRUOT: ' + truot + ' | LOI-VAN-HANH/BO-QUA: ' + loi);
for (const r of results) {
  if (r.ketLuan !== 'DAT') console.log('  ' + r.ketLuan + ': ' + r.ma + ' (' + (r.lyDo || '') + ')');
}

const exitTong = (loiBanNen || truot > 0 || loi > 0 || sandboxBan) ? 1 : 0;
fs.writeFileSync(
  path.join(__dirname, TEN_KET_QUA),
  JSON.stringify({
    moTa: 'P3.3 hồi quy 13 script kiểm cụm trên sandbox cô lập — 35 ca; bản ghi đầy đủ stdout/stderr/thời gian/hoàn nguyên + hash từng ca',
    thoiGianChay: new Date().toISOString(),
    cheDoTuKiem: { chiCa: CHI_CA, saiKyVong: SAI_KY_VONG, loiTiem: LOI_TIEM },
    benNen: loiBanNen ? null : { soTep: benNen.soTep, manifestLines: benNen.manifestLines, sanity: benNen.sanity },
    loiBanNen,
    sandboxBan,
    exitTong,
    tongCa: results.length, dat, truot, loiVanHanh: loi,
    chiTietKhongDat: results.filter(r => r.ketLuan !== 'DAT').map(r => ({ ma: r.ma, ketLuan: r.ketLuan, lyDo: r.lyDo })),
    results,
  }, null, 2),
);
console.log('Đã ghi ' + TEN_KET_QUA);
process.exit(exitTong);
