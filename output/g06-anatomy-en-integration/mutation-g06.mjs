// Mutation G06-A chặng 2 — sandbox cô lập (output/g06-anatomy-en-integration/mutation-sandbox).
// Bản sạch qua; từng ca lỗi exit 1 đúng luật; dọn sandbox khi xong.
//   C0 bản sạch | C-b thiếu dịch | C-c render lệch dữ liệu chung
//   C-d1 cặp route bị xóa | C-d2 đích nội bộ giả (dist) | C-e claim tái xuất hiện
//   C-f tải sớm engine 3D (dist)
import { mkdirSync, cpSync, rmSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..');
const sb = join(here, 'mutation-sandbox');

const tepNguon = [
  'scripts/check-g06-anatomy.mjs',
  'src/data/anatomy-parts.ts',
  'src/i18n/contentRoutes.ts',
  'src/components/anatomy/AnatomyExperience.astro',
  'src/components/WatchExplodedView.astro',
  'src/components/WatchExplodedView3D.astro',
  'src/pages/giai-phau.astro',
  'src/pages/en/anatomy.astro',
];

function taoSandbox(copyDist = false) {
  rmSync(sb, { recursive: true, force: true });
  for (const rel of tepNguon) {
    mkdirSync(join(sb, dirname(rel)), { recursive: true });
    cpSync(join(repo, rel), join(sb, rel));
  }
  if (copyDist) {
    // copy toàn bộ dist (~22MB) để D4 routeExists + D6 chunk kiểm đúng ngữ cảnh
    cpSync(join(repo, 'dist'), join(sb, 'dist'), { recursive: true });
  }
}
function chay(args) {
  try {
    const out = execFileSync('node', ['scripts/check-g06-anatomy.mjs', ...args], { cwd: sb, encoding: 'utf8' });
    return { exit: 0, out };
  } catch (e) {
    return { exit: e.status ?? -1, out: (e.stdout ?? '') + (e.stderr ?? '') };
  }
}
const loiCuoi = (out) => (out.match(/LỖI\s+\[(G6-[\w-]+)\]/)?.[1] ?? 'không');

const ketQua = [];

// C0 — bản sạch (source-only)
taoSandbox();
{
  const r = chay(['--source-only']);
  ketQua.push({ ca: 'C0-bản sạch (nguồn)', kyVong: 'exit 0', exit: r.exit, dat: r.exit === 0 });
}

// C-b — thiếu bản dịch (xóa en.role bộ thoát) → G6-1
taoSandbox();
{
  const f = join(sb, 'src', 'data', 'anatomy-parts.ts');
  let s = readFileSync(f, 'utf8');
  s = s.replace("    en: { name: 'Escapement', role: 'Fitted between the gear train and the regulator: it stops and releases the gears\\' motion at regular intervals and supplies energy to the balance.' },", '');
  writeFileSync(f, s, 'utf8');
  const r = chay(['--source-only']);
  const bat = loiCuoi(r.out);
  ketQua.push({ ca: 'C-b thiếu bản dịch (xóa en.role bộ thoát)', kyVong: 'exit 1, bắt G6-1', exit: r.exit, bat, dat: r.exit === 1 && bat === 'G6-1' });
}

// C-c — render lệch dữ liệu chung (data-role chữ cứng thay byId) → G6-7
taoSandbox();
{
  const f = join(sb, 'src', 'components', 'WatchExplodedView.astro');
  let s = readFileSync(f, 'utf8');
  s = s.replace("data-role={byId('escapement').role}", 'data-role="Chữ cứng mô tả bộ thoát"');
  writeFileSync(f, s, 'utf8');
  const r = chay(['--source-only']);
  const bat = loiCuoi(r.out);
  ketQua.push({ ca: 'C-c render lệch nguồn (data-role chữ cứng)', kyVong: 'exit 1, bắt G6-7', exit: r.exit, bat, dat: r.exit === 1 && bat === 'G6-7' });
}

// C-d1 — cặp route bị xóa khỏi contentRoutes → G6-3
taoSandbox();
{
  const f = join(sb, 'src', 'i18n', 'contentRoutes.ts');
  let s = readFileSync(f, 'utf8');
  s = s.replace(/\s*\{\s*vi:\s*'\/giai-phau',\s*en:\s*'\/en\/anatomy\/'\s*\},/, '\n');
  writeFileSync(f, s, 'utf8');
  const r = chay(['--source-only']);
  const bat = loiCuoi(r.out);
  ketQua.push({ ca: 'C-d1 cặp route bị xóa', kyVong: 'exit 1, bắt G6-3', exit: r.exit, bat, dat: r.exit === 1 && bat === 'G6-3' });
}

// C-d2 — đích nội bộ giả ở dist (/en/not-a-page/) → G6-D4 (lớp dist)
taoSandbox(true);
{
  const f = join(sb, 'dist', 'en', 'anatomy', 'index.html');
  let s = readFileSync(f, 'utf8');
  s = s.replace('/en/mechanisms/escapement/', '/en/not-a-page/');
  writeFileSync(f, s, 'utf8');
  const r = chay(['dist']);
  const bat = loiCuoi(r.out);
  ketQua.push({ ca: 'C-d2 đích nội bộ giả (dist)', kyVong: 'exit 1 lớp dist, bắt G6-D4', exit: r.exit, bat, dat: r.exit === 1 && bat === 'G6-D4' });
}

// C-e — claim đã loại tái xuất hiện ("80%") → G6-4
taoSandbox();
{
  const f = join(sb, 'src', 'data', 'anatomy-parts.ts');
  let s = readFileSync(f, 'utf8');
  s = s.replace("vi: { name: 'Mặt số', role: 'Hiển thị các chữ số, vạch khắc và thương hiệu — nơi người dùng đọc giờ trực tiếp.' },",
                "vi: { name: 'Mặt số', role: 'Quyết định 80% diện mạo.' },");
  writeFileSync(f, s, 'utf8');
  const r = chay(['--source-only']);
  const bat = loiCuoi(r.out);
  ketQua.push({ ca: 'C-e claim "80%" tái xuất hiện', kyVong: 'exit 1, bắt G6-4', exit: r.exit, bat, dat: r.exit === 1 && bat === 'G6-4' });
}

// C-f — tải sớm engine 3D ở dist (chèn tên chunk engine vào HTML ban đầu) → G6-D6
taoSandbox(true);
{
  // tìm tên chunk engine thật trong repo dist
  const { readdirSync } = await import('node:fs');
  const tenChunk = readdirSync(join(repo, 'dist', '_astro')).find((f) => /^(exploded3d|OrbitControls)\./.test(f)) ?? '';
  const f = join(sb, 'dist', 'giai-phau', 'index.html');
  let s = readFileSync(f, 'utf8');
  s = s.replace('</body>', `<script src="/_astro/${tenChunk}"></script></body>`);
  writeFileSync(f, s, 'utf8');
  const r = chay(['dist']);
  const bat = loiCuoi(r.out);
  ketQua.push({ ca: `C-f tải sớm engine 3D (chèn ${tenChunk})`, kyVong: 'exit 1 lớp dist, bắt G6-D6', exit: r.exit, bat, dat: r.exit === 1 && bat === 'G6-D6' });
}

// C-g — aria-label render rỗng (VI) → G6-D1; (EN) → G6-D2 (vòng sửa 1, TXN-20260913-30)
for (const [ten, tep, loi] of [
  ['C-g1 aria-label rỗng (VI)', ['dist', 'giai-phau', 'index.html'], 'G6-D1'],
  ['C-g2 aria-label rỗng (EN)', ['dist', 'en', 'anatomy', 'index.html'], 'G6-D2'],
]) {
  taoSandbox(true);
  const f = join(sb, ...tep);
  let s = readFileSync(f, 'utf8');
  const re = /(<svg[^>]*id="exploded-svg"[^>]*aria-label=")[^"]*(")/;
  if (!re.test(s)) throw new Error(ten + ': khong thay aria-label de rong hoa');
  s = s.replace(re, '$1$2');
  writeFileSync(f, s, 'utf8');
  const r = chay(['dist']);
  const bat = loiCuoi(r.out);
  ketQua.push({ ca: ten, kyVong: `exit 1 lớp dist, bắt ${loi}`, exit: r.exit, bat, dat: r.exit === 1 && bat === loi });
}

rmSync(sb, { recursive: true, force: true });
ketQua.push({ ca: 'dọn sandbox', kyVong: 'thư mục đã xóa', dat: !existsSync(sb) });

const dat = ketQua.every((k) => k.dat);
const outPath = join(here, 'mutation-ket-qua.json');
writeFileSync(outPath, JSON.stringify({ ketQua: dat ? 'DAT' : 'KHONG_DAT', ca: ketQua }, null, 2), 'utf8');
console.log(JSON.stringify({ ketQua: dat ? 'DAT' : 'KHONG_DAT', ca: ketQua }, null, 2));
process.exit(dat ? 0 : 1);
