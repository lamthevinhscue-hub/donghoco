// Mutation 5 ca cô lập cho check-g05-history-journey (G05-B).
// Sandbox: output/g05-history-journey/mutation-sandbox/ — chỉ chứa các tệp dữ liệu
// + bộ kiểm G05 (KHÔNG sao chép .env/secret). Bản sạch phải exit 0; từng ca lỗi
// phải exit 1 đúng luật. Dọn sandbox khi xong.
import { mkdirSync, cpSync, rmSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..');
const sb = join(here, 'mutation-sandbox');

const ketQua = [];
function taoSandbox(copyDist = false) {
  rmSync(sb, { recursive: true, force: true });
  mkdirSync(join(sb, 'scripts'), { recursive: true });
  mkdirSync(join(sb, 'src', 'data'), { recursive: true });
  mkdirSync(join(sb, 'src', 'i18n'), { recursive: true });
  mkdirSync(join(sb, 'src', 'components', 'history'), { recursive: true });
  cpSync(join(repo, 'scripts', 'check-g05-history-journey.mjs'), join(sb, 'scripts', 'check-g05-history-journey.mjs'));
  // fixture baseline G5-4b — checker không phụ thuộc Git nhưng cần fixture cố định
  mkdirSync(join(sb, 'scripts', 'fixtures'), { recursive: true });
  cpSync(join(repo, 'scripts', 'fixtures', 'timeline-baseline-aba250c.json'), join(sb, 'scripts', 'fixtures', 'timeline-baseline-aba250c.json'));
  cpSync(join(repo, 'src', 'data', 'timeline.json'), join(sb, 'src', 'data', 'timeline.json'));
  cpSync(join(repo, 'src', 'data', 'historyChapters.ts'), join(sb, 'src', 'data', 'historyChapters.ts'));
  cpSync(join(repo, 'src', 'i18n', 'contentRoutes.ts'), join(sb, 'src', 'i18n', 'contentRoutes.ts'));
  cpSync(join(repo, 'src', 'components', 'history', 'HistoryTimeline.astro'), join(sb, 'src', 'components', 'history', 'HistoryTimeline.astro'));
  if (copyDist) {
    // chỉ những tệp dist mà check-g05 đọc — không sao chép secret/.env
    cpSync(join(repo, 'dist', 'lich-su'), join(sb, 'dist', 'lich-su'), { recursive: true });
    cpSync(join(repo, 'dist', 'en', 'history'), join(sb, 'dist', 'en', 'history'), { recursive: true });
    mkdirSync(join(sb, 'dist', 'en'), { recursive: true });
    cpSync(join(repo, 'dist', 'en', 'index.html'), join(sb, 'dist', 'en', 'index.html'));
    cpSync(join(repo, 'dist', 'sitemap-0.xml'), join(sb, 'dist', 'sitemap-0.xml'));
  }
}
function chayLop(args) {
  try {
    const out = execFileSync('node', ['scripts/check-g05-history-journey.mjs', ...args], { cwd: sb, encoding: 'utf8' });
    return { exit: 0, out };
  } catch (e) {
    return { exit: e.status ?? -1, out: e.stdout ?? '' };
  }
}
const loiCuoi = (out) => (out.match(/LỖI\s+\[(G5-[\w-]+)\]/)?.[1] ?? 'không');
function chay() {
  return chayLop(['--source-only']);
}
function suaJson(fn) {
  const p = join(sb, 'src', 'data', 'timeline.json');
  const d = JSON.parse(readFileSync(p, 'utf8'));
  fn(d);
  writeFileSync(p, JSON.stringify(d, null, 2), 'utf8');
}

// ---- Ca 0: bản sạch ----
taoSandbox();
let r = chay();
const loiSan = r.exit === 0;
ketQua.push({ ca: 'C0-bản sạch', kyVong: 'exit 0', exit: r.exit, dat: loiSan });

// ---- C1: thiếu dịch nội dung/giới hạn ----
taoSandbox();
suaJson((d) => { delete d[0].description_en; });
r = chay();
const c1 = r.exit === 1 && r.out.includes('G5-2');
ketQua.push({ ca: 'C1-thiếu dịch (xóa description_en mốc 0)', kyVong: 'exit 1, bắt G5-2', exit: r.exit, bat: loiCuoi(r.out), dat: c1 });

// ---- C2: lệch chương (range c5 chồng c6) ----
taoSandbox();
{
  const p = join(sb, 'src', 'data', 'historyChapters.ts');
  let s = readFileSync(p, 'utf8');
  s = s.replace("range: [21, 25],", "range: [21, 26],");
  writeFileSync(p, s, 'utf8');
}
r = chay();
const c2 = r.exit === 1 && r.out.includes('G5-5');
ketQua.push({ ca: 'C2-lệch chương (range c5 = [21,26] chồng c6)', kyVong: 'exit 1, bắt G5-5', exit: r.exit, bat: loiCuoi(r.out), dat: c2 });

// ---- C3: sửa/mất nguồn VI (url http) ----
taoSandbox();
suaJson((d) => { d[0].sources[0].url = 'http://example.com/khong-an-toan'; });
r = chay();
const c3 = r.exit === 1 && r.out.includes('G5-4');
ketQua.push({ ca: 'C3-nguồn VI hỏng (url http://)', kyVong: 'exit 1, bắt G5-4', exit: r.exit, bat: loiCuoi(r.out), dat: c3 });

// ---- C4: link đọc tiếp EN giả (xóa cặp rolex khỏi bảng) ----
taoSandbox();
{
  const p = join(sb, 'src', 'i18n', 'contentRoutes.ts');
  let s = readFileSync(p, 'utf8');
  s = s.replace(/\s*\{\s*vi:\s*'\/thuong-hieu\/rolex',\s*en:\s*'\/en\/brands\/rolex\/'\s*\},/, '\n');
  writeFileSync(p, s, 'utf8');
}
r = chay();
const c4 = r.exit === 1 && r.out.includes('G5-6');
ketQua.push({ ca: 'C4-cặp EN giả (xóa cặp rolex)', kyVong: 'exit 1, bắt G5-6', exit: r.exit, bat: loiCuoi(r.out), dat: c4 });

// ---- C5: lệch nhãn thời gian (xóa timeLabel_en) ----
taoSandbox();
suaJson((d) => { delete d[27].timeLabel_en; });
r = chay();
const c5 = r.exit === 1 && r.out.includes('G5-3');
ketQua.push({ ca: 'C5-lệch timeLabel (xóa timeLabel_en mốc 27)', kyVong: 'exit 1, bắt G5-3', exit: r.exit, bat: loiCuoi(r.out), dat: c5 });

// ---- M6: đổi ranh giới HAI chương nhưng vẫn liên tiếp phủ 28 → bị bắt (khớp ranh giới duyệt) ----
taoSandbox();
{
  const p = join(sb, 'src', 'data', 'historyChapters.ts');
  let s = readFileSync(p, 'utf8');
  s = s.replace('range: [5, 9],', 'range: [5, 10],').replace('range: [9, 15],', 'range: [10, 15],');
  writeFileSync(p, s, 'utf8');
}
r = chay();
const m6 = r.exit === 1 && loiCuoi(r.out) === 'G5-5';
ketQua.push({ ca: 'M6-ranh giới lệch duyệt (c2 [5,10], c3 [10,15] — vẫn phủ 28)', kyVong: 'exit 1, bắt G5-5', exit: r.exit, bat: loiCuoi(r.out), dat: m6 });

// ---- M7: đích EN giả nhưng giữ số cặp → bị bắt ở lớp dist (kiểm đích thật) ----
taoSandbox(true);
{
  const p = join(sb, 'dist', 'en', 'history', 'index.html');
  let s = readFileSync(p, 'utf8');
  s = s.replace('/en/brands/rolex/', '/en/not-a-real-page/');
  writeFileSync(p, s, 'utf8');
}
r = chayLop(['dist']);
const m7 = r.exit === 1 && loiCuoi(r.out) === 'G5-D4';
ketQua.push({ ca: 'M7-đích EN giả (dist /en/not-a-real-page/, giữ số cặp)', kyVong: 'exit 1 lớp dist, bắt G5-D4', exit: r.exit, bat: loiCuoi(r.out), dat: m7 });

// ---- M8: VI hiển thị "2013–present" (lỗi timeLabel_en ở VI) → bị bắt ở lớp dist ----
taoSandbox(true);
{
  const p = join(sb, 'dist', 'lich-su', 'index.html');
  let s = readFileSync(p, 'utf8');
  s = s.split('2013–nay').join('2013–present');
  writeFileSync(p, s, 'utf8');
}
r = chayLop(['dist']);
const m8 = r.exit === 1 && loiCuoi(r.out) === 'G5-D1';
ketQua.push({ ca: 'M8-VI hiển thị "2013–present" (dist)', kyVong: 'exit 1 lớp dist, bắt G5-D1', exit: r.exit, bat: loiCuoi(r.out), dat: m8 });

// ---- Dọn sandbox ----
rmSync(sb, { recursive: true, force: true });
ketQua.push({ ca: 'dọn sandbox', kyVong: 'thư mục đã xóa', dat: !existsSync(sb) });

const dat = ketQua.every((k) => k.dat);
console.log(JSON.stringify({ ketQua: dat ? 'DAT' : 'KHONG_DAT', ca: ketQua }, null, 2));
process.exit(dat ? 0 : 1);
