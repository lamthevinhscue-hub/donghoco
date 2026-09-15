#!/usr/bin/env node
// =============================================================================
// mutation-g06c2.cjs (vòng sửa TXN-20260915-11) — Mutation trong sandbox cô lập
// (os.tmpdir, KHÔNG tiêm repo chính). Luồng từng ca: SẠCH QUA (bản sạch mốc) →
// VÁ (ghi bản đã vá + hash) → KIỂM THẤT ĐÚNG LÝ DO (playwright đo) → HOÀN
// NGUYÊN CHÍNH BẢN ĐÃ VÁ (ghi lại nội dung gốc) → KIỂM ĐẠT TRỞ LẠI + hash
// sau-hoàn-nguyên KHỚP hash gốc.
// Các ca:
//   m3  vá render-only lộ VI (text mặc định panel → chuỗi tiếng Việt)
//   m4  xóa id gradient escSteel (4 tham chiếu url(#escSteel) mất đích)
//   m5  nhãn SVG rỗng (aria-label="")
//   m6  nhãn SVG sai ngôn ngữ (nhãn VI trên trang EN)
//   m7  xung đột aria-hidden="true" trên SVG có role="img"
// Cách chạy: node mutation-g06c2.cjs <setup|apply|revert> <ca>
// (m3,m4,m5,m6,m7). Trạng thái lưu sandbox-info.json.
// =============================================================================
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');

const GOC = path.resolve(__dirname, '../..');
const INFO = path.join(__dirname, 'sandbox-info.json');
const [lenh, ca] = process.argv.slice(2);
const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');

const trangTuongDoi = path.join('en', 'mechanisms', 'escapement', 'index.html');

const saoChepDist = (den) => {
  fs.mkdirSync(path.join(den, 'en/mechanisms/escapement'), { recursive: true });
  fs.cpSync(path.join(GOC, 'dist/_astro'), path.join(den, '_astro'), { recursive: true });
  fs.cpSync(path.join(GOC, 'dist/en/mechanisms/escapement'), path.join(den, 'en/mechanisms/escapement'), { recursive: true });
};

if (lenh === 'setup') {
  const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'g06c2-mut-'));
  for (const p of ['src', 'scripts']) fs.cpSync(path.join(GOC, p), path.join(sandbox, p), { recursive: true });
  fs.copyFileSync(path.join(GOC, 'package.json'), path.join(sandbox, 'package.json'));
  const distLive = path.join(sandbox, 'dist-live');
  saoChepDist(distLive);
  fs.copyFileSync(path.join(__dirname, 'server-tinh.cjs'), path.join(sandbox, 'server-tinh.cjs'));
  const html = fs.readFileSync(path.join(distLive, trangTuongDoi), 'utf8');
  fs.writeFileSync(INFO, JSON.stringify({
    sandbox, distLive,
    htmlGoc: html,
    hashGoc: sha256(Buffer.from(html)),
    ca: {},
    nguon: chayNguon(sandbox),
  }, null, 2));
  console.log('setup xong:', sandbox);
  return;
}

if (lenh === 'ham-quet') {
  // Mutation trên HÀM DÙNG CHUNG demTrangEnKhac (đường chạy sản phẩm):
  // vô hiệu hóa phát hiện khung → D5 tự kiểm (b) phải thất bại đúng lý do,
  // trong khi hàm nguyên vẹn trên cùng dist thì exit 0.
  const sb = fs.mkdtempSync(path.join(os.tmpdir(), 'g06c2-ham-'));
  fs.cpSync(path.join(GOC, 'src'), path.join(sb, 'src'), { recursive: true });
  fs.cpSync(path.join(GOC, 'scripts'), path.join(sb, 'scripts'), { recursive: true });
  fs.cpSync(path.join(GOC, 'dist'), path.join(sb, 'dist'), { recursive: true });
  fs.copyFileSync(path.join(GOC, 'package.json'), path.join(sb, 'package.json'));
  const checkerSb = path.join(sb, 'scripts', 'check-g06-escapement-en.mjs');
  const chay = (thamSo) => {
    try { execFileSync('node', thamSo, { cwd: sb, encoding: 'utf8' }); return { exit: 0, out: '' }; }
    catch (e) { return { exit: e.status ?? 1, out: String(e.stdout || '') + String(e.stderr || '') }; }
  };
  const goc = chay(['scripts/check-g06-escapement-en.mjs', 'dist']);
  let s = fs.readFileSync(checkerSb, 'utf8');
  const mau = "if (readFileSync(duong, 'utf8').includes('data-mechanism')) khac++;";
  const thay = "if (false) khac++; // mutation: bỏ phát hiện khung";
  if (!s.includes(mau)) { console.error('ham-quet: không tìm thấy mẫu phát hiện khung trong hàm dùng chung'); process.exit(1); }
  fs.writeFileSync(checkerSb, s.replace(mau, thay));
  const vo = chay(['scripts/check-g06-escapement-en.mjs', 'dist']);
  const ketQua = {
    hamNguyenExit: goc.exit,
    hamVoHieuExit: vo.exit,
    batDungLyDo: vo.exit !== 0 && vo.out.includes('D5 tự kiểm (b)'),
  };
  const info = JSON.parse(fs.readFileSync(INFO, 'utf8'));
  info.hamQuet = ketQua;
  fs.writeFileSync(INFO, JSON.stringify(info, null, 2));
  console.log('ham-quet:', JSON.stringify(ketQua));
  fs.rmSync(sb, { recursive: true, force: true });
  return;
}

if (lenh === 'apply' || lenh === 'revert') {
  const info = JSON.parse(fs.readFileSync(INFO, 'utf8'));
  const trang = path.join(info.distLive, trangTuongDoi);
  if (lenh === 'apply') {
    const goc = fs.readFileSync(trang, 'utf8');
    let mut = goc;
    let moTa = '';
    if (ca === 'm3') { mut = goc.replace('The part&#39;s English name and its role will appear here.', 'Tên tiếng Việt, tiếng Anh và vai trò của bộ phận sẽ hiện ở đây.'); moTa = 'text mặc định panel → chuỗi tiếng Việt (bề mặt tĩnh, JS không ghi đè)'; }
    else if (ca === 'm4') { mut = goc.replace('<linearGradient id="escSteel"', '<linearGradient data-id-da-xoa="escSteel"'); moTa = 'xóa id escSteel → url(#escSteel) mất đích'; }
    else if (ca === 'm5') { mut = goc.replace('aria-label="Step-by-step diagram of a Swiss lever escapement: escape wheel, lever, pallet jewels, balance and hairspring"', 'aria-label=""'); moTa = 'nhãn SVG rỗng'; }
    else if (ca === 'm6') { mut = goc.replace('aria-label="Step-by-step diagram of a Swiss lever escapement: escape wheel, lever, pallet jewels, balance and hairspring"', 'aria-label="Sơ đồ hướng dẫn bộ thoát Swiss lever theo năm bước: bánh thoát, ngựa, chân kính pallet, bánh lắc và dây tóc"'); moTa = 'nhãn SVG sai ngôn ngữ (VI trên trang EN)'; }
    else if (ca === 'm7') { mut = goc.replace('<svg viewBox="0 0 600 400"', '<svg aria-hidden="true" viewBox="0 0 600 400"'); moTa = 'xung đột aria-hidden=true trên SVG role=img'; }
    if (mut === goc) { console.error(`apply ${ca}: không khớp mẫu vá`); process.exit(1); }
    fs.writeFileSync(trang, mut, 'utf8');
    info.ca[ca] = { moTa, hashGoc: info.hashGoc, hashDaVa: sha256(fs.readFileSync(trang)), daHoanNguyen: false };
  } else {
    fs.writeFileSync(trang, info.htmlGoc, 'utf8');
    const hashSau = sha256(fs.readFileSync(trang));
    info.ca[ca].hashSauHoanNguyen = hashSau;
    info.ca[ca].daHoanNguyen = hashSau === info.ca[ca].hashGoc;
  }
  fs.writeFileSync(INFO, JSON.stringify(info, null, 2));
  console.log(`${lenh} ${ca} xong`);
  return;
}

function chayNguon(sandbox) {
  // M2-1/M2-2 tầng nguồn (checker đọc src/ theo cwd sandbox); mỗi ca:
  // sạch → vá → bắt đúng mã (S15/S9) → khôi phục → sạch lại
  const K = [];
  const D = 'DAT', ND = 'KHONG_DAT';
  const ghi = (ca2, trangThai, chiTiet = '') => K.push({ ca: ca2, trangThai, chiTiet });
  const chay = (thamSo) => {
    try { execFileSync('node', thamSo, { cwd: sandbox, encoding: 'utf8' }); return { exit: 0, out: '' }; }
    catch (e) { return { exit: e.status ?? 1, out: String(e.stdout || '') + String(e.stderr || '') }; }
  };
  const escSb = path.join(sandbox, 'src/components/infographics/Escapement.astro');
  const articleSb = path.join(sandbox, 'src/components/templates/MechanismArticle.astro');
  const escGoc = fs.readFileSync(escSb, 'utf8');
  const articleGoc = fs.readFileSync(articleSb, 'utf8');
  const kiem = ['scripts/check-g06-escapement-en.mjs'];

  {
    const sach = chay(kiem);
    fs.writeFileSync(escSb, escGoc.replace('data-name-en="Balance wheel"', 'data-nombre-en="Balance wheel"'));
    const lo = chay(kiem);
    fs.writeFileSync(escSb, escGoc);
    const phuc = chay(kiem);
    ghi('M2-1 gỡ data-name-en một bộ phận → checker nguồn S15 bắt', sach.exit === 0 && lo.exit !== 0 && lo.out.includes('S15') && phuc.exit === 0 ? D : ND, `sạch=${sach.exit === 0}, bắt S15=${lo.exit !== 0}, khôi phục=${phuc.exit === 0}`);
  }
  {
    const sach = chay(kiem);
    fs.writeFileSync(articleSb, articleGoc.replace("slug === 'escapement' && data.has_infographic", "slug === 'chronograph' && data.has_infographic"));
    const lo = chay(kiem);
    fs.writeFileSync(articleSb, articleGoc);
    const phuc = chay(kiem);
    ghi("M2-2 mở gate EN cho 'chronograph' (chưa dịch) → checker nguồn S9 bắt", sach.exit === 0 && lo.exit !== 0 && lo.out.includes('S9') && phuc.exit === 0 ? D : ND, `sạch=${sach.exit === 0}, bắt S9=${lo.exit !== 0}, khôi phục=${phuc.exit === 0}`);
  }
  // Mục 7 — đối chứng thu hẹp ngoại lệ nhãn động (check-motion):
  {
    const motion = ['scripts/check-motion-accessibility.mjs'];
    // (a) sạch: Bộ thoát (ngoại lệ duy nhất) qua, exit 0
    const sach = chay(motion);
    // (b) tiêm nhãn động vào component NGOÀI ngoại lệ → phải bị bắt
    const wrSb = path.join(sandbox, 'src/components/infographics/WaterResistance.astro');
    const wrGoc = fs.readFileSync(wrSb, 'utf8');
    fs.writeFileSync(wrSb, wrGoc + "\n<svg aria-label={''}></svg>\n");
    const lo = chay(motion);
    fs.writeFileSync(wrSb, wrGoc);
    const phuc = chay(motion);
    ghi('Mục 7a nhãn động ngoài ngoại lệ (WaterResistance) → check-motion bắt', sach.exit === 0 && lo.exit !== 0 && lo.out.includes('NGOÀI ngoại lệ G06-C') && phuc.exit === 0 ? D : ND, `sạch=${sach.exit === 0}, bắt=${lo.exit !== 0}, khôi phục=${phuc.exit === 0}`);
    ghi('Mục 7b Bộ thoát sạch qua check-motion (ngoại lệ duy nhất)', sach.exit === 0 ? D : ND, `exit=${sach.exit}`);
  }
  return K;
}
