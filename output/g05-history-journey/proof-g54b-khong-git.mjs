// Chứng minh G5-4b theo yêu cầu TXN-20260913-14 — checker bảo toàn KHÔNG phụ thuộc Git.
// Các ca:
//   P1: repo chính CÓ lịch sử Git → đạt.
//   P2: bản sao nguồn KHÔNG .git (ở thư mục tạm ngoài repo — không thể tìm Git
//       ở thư mục cha) → đạt.
//   P3: sửa một trường VI trong bản sao → thất bại đúng G5-4b.
//   P3b: sửa một URL nguồn trong bản sao → thất bại đúng G5-4b.
//   P4: xóa fixture trong bản sao → thất bại rõ nguyên nhân "thiếu fixture".
//   P5: khôi phục fixture + dữ liệu trong chính bản sao đó → đạt trở lại.
//   P6: hồi quy zero dẫn đầu — chạy 12 tình huống G5-8b trên ĐÚNG hàm cũ
//       (Number <= 27) → phải bị bắt; trên hàm mới trích từ component → đạt.
// Sandbox tạm nằm ở os.tmpdir() (ngoài repo), chỉ chứa 6 tệp kiểm cần — không
// sao chép .env/secret. Dọn khi xong. Kết quả ghi proof-g54b-ket-qua.json.
import { mkdirSync, cpSync, rmSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..');
const sb = join(tmpdir(), 'g05-proof-khong-git');

const files = [
  ['scripts', 'check-g05-history-journey.mjs'],
  ['scripts/fixtures', 'timeline-baseline-aba250c.json'],
  ['src/data', 'timeline.json'],
  ['src/data', 'historyChapters.ts'],
  ['src/i18n', 'contentRoutes.ts'],
  ['src/components/history', 'HistoryTimeline.astro'],
];
function taoSbanh(copyFixture = true) {
  rmSync(sb, { recursive: true, force: true });
  for (const [thuMuc, ten] of files) {
    if (thuMuc === 'scripts/fixtures' && !copyFixture) continue;
    mkdirSync(join(sb, thuMuc), { recursive: true });
    cpSync(join(repo, thuMuc, ten), join(sb, thuMuc, ten));
  }
}
function chay(cwd) {
  try {
    const out = execFileSync('node', ['scripts/check-g05-history-journey.mjs', '--source-only'], { cwd, encoding: 'utf8' });
    return { exit: 0, out };
  } catch (e) {
    return { exit: e.status ?? -1, out: (e.stdout ?? '') + (e.stderr ?? '') };
  }
}
const loiCuoi = (out) => (out.match(/LỖI\s+\[(G5-[\w-]+)\]/)?.[1] ?? 'không');
function suaJson(fn) {
  const p = join(sb, 'src', 'data', 'timeline.json');
  const d = JSON.parse(readFileSync(p, 'utf8'));
  fn(d);
  writeFileSync(p, JSON.stringify(d, null, 2), 'utf8');
}
const coGit = (thuMuc) => {
  let dir = thuMuc;
  while (true) {
    if (existsSync(join(dir, '.git'))) return true;
    const cha = dirname(dir);
    if (cha === dir) return false;
    dir = cha;
  }
};

const ketQua = [];
// P1 — repo chính, có .git
{
  const r = chay(repo);
  const dat = r.exit === 0 && r.out.includes('[G5-4b]') && !r.out.includes('LỖI  [G5-4b]');
  ketQua.push({ ca: 'P1-repo chính (có .git)', kyVong: 'exit 0, G5-4b ĐẠT', exit: r.exit, g5_4b: r.out.includes('ĐẠT [G5-4b]'), dat, coGit: coGit(repo) });
}
// P2 — bản sao không .git (tmp ngoài repo)
taoSbanh();
{
  const r = chay(sb);
  ketQua.push({ ca: 'P2-bản sao KHÔNG .git (tmp ngoài repo, không Git thư mục cha)', kyVong: 'exit 0, G5-4b ĐẠT', exit: r.exit, g5_4b: r.out.includes('ĐẠT [G5-4b]'), dat: r.exit === 0 && r.out.includes('ĐẠT [G5-4b]'), coGit: coGit(sb) });
}
// P3 — sửa trường VI (title mốc 0)
taoSbanh();
suaJson((d) => { d[0].title = d[0].title + ' (bị sửa)'; });
{
  const r = chay(sb);
  ketQua.push({ ca: 'P3-sửa trường VI (title mốc 0)', kyVong: 'exit 1, bắt G5-4b', exit: r.exit, bat: loiCuoi(r.out), dat: r.exit === 1 && loiCuoi(r.out) === 'G5-4b' });
}
// P3b — sửa URL nguồn (mốc 0, nguồn 0 — vẫn https nên G5-4 đạt, G5-4b phải hỏng)
taoSbanh();
suaJson((d) => { d[0].sources[0].url = 'https://example-wrong.test/trang-sua'; });
{
  const r = chay(sb);
  const g54 = r.out.includes('ĐẠT [G5-4]');
  ketQua.push({ ca: 'P3b-sửa URL nguồn (mốc 0, nguồn 0 — còn https)', kyVong: 'exit 1, bắt G5-4b (G5-4 vẫn đạt)', exit: r.exit, bat: loiCuoi(r.out), g5_4_van_dat: g54, dat: r.exit === 1 && loiCuoi(r.out) === 'G5-4b' && g54 });
}
// P4 — xóa fixture
taoSbanh(false);
{
  const r = chay(sb);
  const ro = r.out.includes('thiếu fixture baseline');
  ketQua.push({ ca: 'P4-thiếu fixture', kyVong: 'exit 1, thông báo rõ "thiếu fixture" (không bỏ qua)', exit: r.exit, thongBao: ro, dat: r.exit === 1 && ro });
}
// P5 — khôi phục fixture + dữ liệu sạch trong chính bản sao đó
taoSbanh();
{
  const r = chay(sb);
  ketQua.push({ ca: 'P5-khôi phục fixture + dữ liệu sạch (cùng thư mục bản sao)', kyVong: 'exit 0 trở lại', exit: r.exit, dat: r.exit === 0 && r.out.includes('ĐẠT [G5-4b]') });
}
rmSync(sb, { recursive: true, force: true });
// P6 — hồi quy zero dẫn đầu: hàm cũ phải bị G5-8b bắt, hàm mới phải đạt
{
  const HAM_CU = `const hashHopLe = () => {
      if (/^#chuong-c[1-6]$/.test(location.hash)) return true;
      const m = location.hash.match(/^#milestone-(\\d+)$/);
      return m !== null && Number(m[1]) <= 27;
    };`;
  const HOP_LE = ['#milestone-0', '#milestone-12', '#milestone-27', '#chuong-c1', '#chuong-c6'];
  const SAI = ['#milestone-00', '#milestone-01', '#milestone-028', '#milestone-999', '#chuong-c7', '#hash-sai', ''];
  const chay12 = (fnSrc) => [...HOP_LE, ...SAI].map((h) => ({
    hash: h || '(không hash)',
    giu: new Function('location', `${fnSrc}\nreturn hashHopLe();`)({ hash: h }),
  }));
  const cu = chay12(HAM_CU);
  const cuBiBat = cu.some((k) => HOP_LE.includes(k.hash) ? k.giu !== true : k.giu !== false);
  const compRaw = readFileSync(join(repo, 'src', 'components', 'history', 'HistoryTimeline.astro'), 'utf8');
  const batDau = compRaw.indexOf('const hashHopLe = ');
  const mo = compRaw.indexOf('{', batDau);
  let sau = -1, dem = 0;
  for (let i = mo; i < compRaw.length; i++) {
    if (compRaw[i] === '{') dem++;
    else if (compRaw[i] === '}') { dem--; if (dem === 0) { sau = i; break; } }
  }
  const moi = chay12(compRaw.slice(batDau, sau + 1) + ';');
  const moiDat = moi.every((k) => HOP_LE.includes(k.hash) ? k.giu === true : k.giu === false);
  const saiCu = cu.filter((k) => ['(không hash)', '#milestone-0', '#milestone-12', '#milestone-27', '#chuong-c1', '#chuong-c6'].includes(k.hash) ? false : k.giu === true).map((k) => k.hash);
  ketQua.push({ ca: 'P6-hồi quy zero dẫn đầu', kyVong: 'hàm cũ bị bắt (giữ nhầm 00/01/028/999…), hàm mới đạt 12/12', hamCuBiBat: cuBiBat, hamCuGiuNham: saiCu, hamMoiDat: moiDat, dat: cuBiBat && moiDat });
}

const dat = ketQua.every((k) => k.dat);
const outPath = join(here, 'proof-g54b-ket-qua.json');
writeFileSync(outPath, JSON.stringify({ ketQua: dat ? 'DAT' : 'KHONG_DAT', thoiGian: new Date().toISOString(), ca: ketQua }, null, 2), 'utf8');
console.log(JSON.stringify({ ketQua: dat ? 'DAT' : 'KHONG_DAT', daGhi: outPath, ca: ketQua }, null, 2));
process.exit(dat ? 0 : 1);
