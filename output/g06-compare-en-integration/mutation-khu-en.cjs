// G06-B chặng 2 vòng sửa 3 — mutation HẸP: bỏ kiểm KHU VỰC route EN trong
// dungCapBai trong sandbox repo → ca tự kiểm "route EN sai khu" phải làm build
// THẤT BẠI đúng lý do. Bản sạch đạt (build cuối của repo).
// Chạy: node mutation-khu-en.cjs   (từ thư mục này)
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync, execFileSync } = require('child_process');

const GOC = path.resolve(__dirname, '..', '..');
const SB = path.join(__dirname, 'khu-en-sandbox');
const COMP = path.join('src', 'components', 'compare', 'CompareExperience.astro');
const LOAI_BO = ['node_modules', 'dist', '.git', '.astro', 'output'];

function taoSandbox() {
  fs.rmSync(SB, { recursive: true, force: true });
  fs.mkdirSync(SB, { recursive: true });
  for (const muc of fs.readdirSync(GOC, { withFileTypes: true })) {
    if (LOAI_BO.includes(muc.name)) continue;
    const tu = path.join(GOC, muc.name);
    const den = path.join(SB, muc.name);
    if (muc.isDirectory()) fs.cpSync(tu, den, { recursive: true });
    else fs.copyFileSync(tu, den);
  }
  execFileSync('powershell', [
    '-NoProfile', '-Command',
    "New-Item -ItemType Junction -Path '" + path.join(SB, 'node_modules') + "' -Target '" + path.join(GOC, 'node_modules') + "' | Out-Null",
  ]);
}
function build(sandbox) {
  // npx.cmd trên Windows cần shell:true — output đầy đủ để đối chiếu đúng lý do
  const r = spawnSync('npx.cmd', ['astro', 'build'], { cwd: sandbox, encoding: 'utf8', timeout: 600000, maxBuffer: 64 * 1024 * 1024, shell: true });
  return { exit: r.status ?? 1, out: (r.stdout ?? '') + (r.stderr ?? '') };
}

let ketQua = [];
const ghi = (ca, dat, chiTiet) => ketQua.push({ ca, dat: dat === true, chiTiet: String(chiTiet) });

taoSandbox();
let s = fs.readFileSync(path.join(SB, COMP), 'utf8');
const dongCu = ".filter((p) => p.vi.startsWith('/mau-iconic/') && p.en.startsWith('/en/iconic-watches/'))";
if (!s.includes(dongCu)) {
  console.error('không thấy dòng filter khu vực để tiêm lỗi');
  process.exit(1);
}
s = s.replace(dongCu, ".filter((p) => p.vi.startsWith('/mau-iconic/'))");
fs.writeFileSync(path.join(SB, COMP), s);

const r = build(SB);
// Đúng lý do: ca "route EN sai khu (slug có trong kho): bị loại" phải xuất
// hiện trong thông điệp tự kiểm (không suy từ sự hiện diện của chuỗi mã)
const dungLyDo = /tự kiểm capBai thất bại/.test(r.out) && /route EN sai khu \(slug có trong kho\): bị loại/.test(r.out);
ghi('M-khu bỏ kiểm khu route EN: build THẤT BẠI đúng ca "route EN sai khu"', r.exit !== 0 && dungLyDo, 'exit=' + r.exit + ', đúng lý do=' + dungLyDo);

fs.rmSync(SB, { recursive: true, force: true });
fs.writeFileSync(path.join(__dirname, 'khu-en-mutation-ket-qua.json'), JSON.stringify(ketQua, null, 2));
const dat = ketQua.filter((k) => k.dat).length;
console.log('MUTATION KHU-EN: ' + dat + '/' + ketQua.length + ' ca ĐẠT');
for (const k of ketQua) console.log((k.dat ? 'ĐẠT ' : 'LỖI ') + k.ca + ' — ' + k.chiTiet);
process.exit(dat === ketQua.length ? 0 : 1);
