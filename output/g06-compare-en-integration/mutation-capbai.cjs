// G06-B chặng 2 vòng sửa 2 — mutation TIẾM LỖI LOGIC dungCapBai trong sandbox
// repo (bản sao nguồn hiện hành + node_modules junction), chạy astro build:
//   M-a: slug EN trích từ route VI        → build phải thất bại, ca "khác slug" sai
//   M-b: bỏ lọc kho đích (khoEn.has)      → build phải thất bại, ca "đích không xuất bản" sai
// Bản sạch không tiêm — chứng minh "đạt" do build cuối của chính repo (log-build-vs2-final).
// Chạy: node mutation-capbai.cjs   (từ thư mục này)
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync, execFileSync } = require('child_process');

const GOC = path.resolve(__dirname, '..', '..');
const SANDBOX_GOC = path.join(__dirname, 'capbai-sandbox');
const COMP = path.join('src', 'components', 'compare', 'CompareExperience.astro');
const LOAI_BO = ['node_modules', 'dist', '.git', '.astro', 'output'];

function taoSandbox(ten) {
  const dich = path.join(SANDBOX_GOC, ten);
  fs.rmSync(dich, { recursive: true, force: true });
  fs.mkdirSync(dich, { recursive: true });
  // sao chép nguồn trừ các thư mục nặng/không cần
  for (const muc of fs.readdirSync(GOC, { withFileTypes: true })) {
    if (LOAI_BO.includes(muc.name)) continue;
    const tu = path.join(GOC, muc.name);
    const den = path.join(dich, muc.name);
    if (muc.isDirectory()) fs.cpSync(tu, den, { recursive: true });
    else fs.copyFileSync(tu, den);
  }
  // junction node_modules (Windows) — dùng PowerShell
  execFileSync('powershell', [
    '-NoProfile', '-Command',
    `New-Item -ItemType Junction -Path '${path.join(dich, 'node_modules')}' -Target '${path.join(GOC, 'node_modules')}' | Out-Null`,
  ]);
  return dich;
}
function docComponent(sandbox) {
  return fs.readFileSync(path.join(sandbox, COMP), 'utf8');
}
function ghiComponent(sandbox, noiDung) {
  fs.writeFileSync(path.join(sandbox, COMP), noiDung);
}
function build(sandbox) {
  // npx.cmd trên Windows cần shell:true — output đầy đủ để đối chiếu đúng lý do
  const r = spawnSync('npx.cmd', ['astro', 'build'], { cwd: sandbox, encoding: 'utf8', timeout: 600000, maxBuffer: 64 * 1024 * 1024, shell: true });
  const out = (r.stdout ?? '') + (r.stderr ?? '');
  return { exit: r.status ?? 1, out };
}

const ketQua = [];
const ghi = (ca, dat, chiTiet) => ketQua.push({ ca, dat: dat === true, chiTiet: String(chiTiet) });

const goc = docComponent(path.join(GOC)); // component hiện hành trong repo
const DAU_DE = 'tự kiểm capBai thất bại';
if (!goc.includes(DAU_DE)) { console.error('component hiện hành thiếu tự kiểm build-time'); process.exit(1); }

// ===== M-a: slug EN trích từ route VI =====
{
  const sb = taoSandbox('ma');
  let s = docComponent(sb);
  const cu = "{ vi: trich(p.vi), en: trich(p.en) }";
  if (!s.includes(cu)) { console.error('M-a: không thấy đoạn map'); process.exit(1); }
  ghiComponent(sb, s.replace(cu, '{ vi: trich(p.vi), en: trich(p.vi) }'));
  const r = build(sb);
  const dungLyDo = /tự kiểm capBai thất bại/.test(r.out) && /khác slug/.test(r.out);
  ghi('M-a slug EN trích từ route VI: build THẤT BẠI đúng lý do (tự kiểm capBai — ca khác slug)', r.exit !== 0 && dungLyDo, 'exit=' + r.exit + ', đúng lý do=' + dungLyDo);
}

// ===== M-b: bỏ lọc kho đích =====
{
  const sb = taoSandbox('mb');
  let s = docComponent(sb);
  const cu = '.filter((c) => khoVi.has(c.vi) && khoEn.has(c.en));';
  if (!s.includes(cu)) { console.error('M-b: không thấy đoạn filter'); process.exit(1); }
  ghiComponent(sb, s.replace(cu, '.filter((c) => khoVi.has(c.vi));'));
  const r = build(sb);
  const dungLyDo = /tự kiểm capBai thất bại/.test(r.out) && /đích EN không xuất bản/.test(r.out);
  ghi('M-b bỏ lọc kho đích: build THẤT BẠI đúng lý do (tự kiểm capBai — đích không xuất bản bị giữ)', r.exit !== 0 && dungLyDo, 'exit=' + r.exit + ', đúng lý do=' + dungLyDo);
}

// ===== Dọn =====
fs.rmSync(SANDBOX_GOC, { recursive: true, force: true });

fs.writeFileSync(path.join(__dirname, 'capbai-mutation-ket-qua.json'), JSON.stringify(ketQua, null, 2));
const dat = ketQua.filter((k) => k.dat).length;
console.log('MUTATION CAPBAI: ' + dat + '/' + ketQua.length + ' ca ĐẠT');
for (const k of ketQua) console.log((k.dat ? 'ĐẠT ' : 'LỖI ') + k.ca + ' — ' + k.chiTiet);
process.exit(dat === ketQua.length ? 0 : 1);
