// G06-B chặng 2 — runner mutation T1/T2/T3a/T3b trong sandbox cô lập.
// Bản sạch qua; bản tiêm lỗi bị checker bắt ĐÚNG lý do; dọn sạch sau chạy.
// Chạy: node mutation-g06b.cjs   (từ thư mục này; dist tại ../../dist)
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const GOC = path.resolve(__dirname, '..', '..');
const DIST = path.join(GOC, 'dist');
const CHECKER = path.join(GOC, 'scripts', 'check-g06-compare.mjs');
const TMP_GOC = path.join(__dirname, 'mutation-tmp');

const doc = (...p) => path.join(GOC, ...p);
const docStr = (...p) => fs.readFileSync(doc(...p), 'utf8');

function saoChepDist(ten) {
  const dich = path.join(TMP_GOC, ten);
  fs.rmSync(dich, { recursive: true, force: true });
  fs.cpSync(DIST, dich, { recursive: true });
  return dich;
}
function chayChecker(distDir) {
  // checker tính đường dẫn từ cwd (repo root) — truyền path TƯƠNG ĐỐI
  const dirTuongDoi = path.relative(GOC, distDir);
  try {
    const out = execFileSync('node', [CHECKER, 'dist', dirTuongDoi], { encoding: 'utf8', cwd: GOC });
    return { exit: 0, out };
  } catch (e) {
    return { exit: e.status ?? null, out: (e.stdout ?? '') + (e.stderr ?? '') };
  }
}
const ketQua = [];
const ghi = (ca, dat, chiTiet) => ketQua.push({ ca, dat: dat === true, chiTiet: String(chiTiet) });

// ===== Bản sạch: checker phải ĐẠT =====
{
  const dir = saoChepDist('sach');
  const r = chayChecker(dir);
  ghi('T0 bản sạch: checker ĐẠT trong sandbox (14/14 ca dist sau khi thêm D13/D14)', r.exit === 0 && /ĐẠT — 14\/14/.test(r.out), 'exit=' + r.exit);
}

// ===== T1: thiếu dịch — chuỗi VI lọt trang EN =====
{
  const dir = saoChepDist('t1');
  const f = path.join(dir, 'en', 'compare', 'index.html');
  let s = fs.readFileSync(f, 'utf8');
  s = s.replace('Add a model to compare:', 'Thêm mẫu để so sánh:');
  fs.writeFileSync(f, s);
  const r = chayChecker(dir);
  ghi('T1 chuỗi VI lọt EN → D4 bắt', r.exit === 1 && /\[D4\]/.test(r.out), 'exit=' + r.exit + ', có D4=' + /\[D4\]/.test(r.out));
}

// ===== T2: đích giả — link /en/so-sanh =====
{
  const dir = saoChepDist('t2');
  const f = path.join(dir, 'en', 'compare', 'index.html');
  let s = fs.readFileSync(f, 'utf8');
  s = s.replace('</section>', '<a href="/en/so-sanh">x</a></section>');
  fs.writeFileSync(f, s);
  const r = chayChecker(dir);
  ghi('T2 link /en/so-sanh → D7 bắt', r.exit === 1 && /\[D7\]/.test(r.out), 'exit=' + r.exit + ', có D7=' + /\[D7\]/.test(r.out));
}

// ===== T3a: mất câu giới hạn (CỔNG-1) =====
{
  const dir = saoChepDist('t3a');
  const f = path.join(dir, 'so-sanh', 'index.html');
  let s = fs.readFileSync(f, 'utf8');
  const cau = docStr('scripts', 'check-g06-compare.mjs').match(/const CAU_GIOI_HAN_VI = '([^']+)'/)[1];
  if (!s.includes(cau)) throw new Error('không tìm thấy câu giới hạn để xóa');
  s = s.split(cau).join(''); // gỡ Ở MỌI chỗ xuất hiện (đoạn tĩnh + blob dữ liệu)
  fs.writeFileSync(f, s);
  const r = chayChecker(dir);
  ghi('T3a gỡ câu giới hạn → D3 bắt', r.exit === 1 && /\[D3\]/.test(r.out), 'exit=' + r.exit + ', có D3=' + /\[D3\]/.test(r.out));
}

// ===== T3b: giá trị Tank lọt trở lại (movement có dữ liệu) dù nhãn chưa-dữ-liệu vẫn còn =====
{
  const dir = saoChepDist('t3b');
  const f = path.join(dir, 'en', 'compare', 'index.html');
  let s = fs.readFileSync(f, 'utf8');
  const i = s.indexOf('"slug":"cartier-tank"');
  if (i === -1) throw new Error('không thấy blob tank');
  const cua = s.indexOf('"movement":""', i);
  if (cua === -1 || cua > i + 800) throw new Error('không thấy movement rỗng của tank');
  s = s.slice(0, cua) + '"movement":"Calibre 430 MC"' + s.slice(cua + '"movement":""'.length);
  fs.writeFileSync(f, s);
  const r = chayChecker(dir);
  const nhanVanCon = s.includes('Not enough data to compare');
  ghi('T3b giá trị Tank lọt lại (nhãn vẫn còn) → D5 bắt', r.exit === 1 && /\[D5\]/.test(r.out) && nhanVanCon, 'exit=' + r.exit + ', có D5=' + /\[D5\]/.test(r.out) + ', nhãn vẫn còn=' + nhanVanCon);
}

// ===== Dọn =====
fs.rmSync(TMP_GOC, { recursive: true, force: true });

fs.writeFileSync(path.join(__dirname, 'mutation-ket-qua.json'), JSON.stringify(ketQua, null, 2));
const dat = ketQua.filter((k) => k.dat).length;
console.log('MUTATION: ' + dat + '/' + ketQua.length + ' ca ĐẠT');
for (const k of ketQua) console.log((k.dat ? 'ĐẠT ' : 'LỖI ') + k.ca + ' — ' + k.chiTiet);
process.exit(dat === ketQua.length ? 0 : 1);
