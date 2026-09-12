// =============================================================================
// kiem-thu-sandbox.mjs — Chứng minh bộ kiểm G01 có thể BẮT lỗi (mutation test)
// =============================================================================
// Thực hiện trong SANDBOX CÔ LẬP (output/g01-navigation-i18n/sandbox) — không
// tiêm lỗi vào repo chính. Sandbox chứa bản sao src/ + public/ + cấu hình;
// node_modules được resolve từ repo (thư mục cha) — KHÔNG sao chép node_modules.
//
// Ba ca, mỗi ca: dựng mã sandbox → astro build trong sandbox → chạy
// scripts/check-g01-navigation.mjs với cwd = sandbox → xóa dist sandbox
// (bằng chứng không giữ dist):
//   S1  bản sạch (copy nguyên trạng working tree)  → kỳ vọng exit 0
//   M1  root mapping sai: bỏ quy "/" trong norm() — mô phỏng đúng bug gốc
//       (khóa bảng băm "" ≠ tra cứu "/") → kỳ vọng exit ≠ 0 với ca root
//   M2  Home khớp mọi pathname: isHome = true → kỳ vọng exit ≠ 0 với ca
//       "Home KHÔNG aria-current" trên trang danh sách/bài con/404
//
// Kết quả ghi: kiem-thu-sandbox-ket-qua.json + log stdout/stderr từng ca.
// Chạy: node output/g01-navigation-i18n/kiem-thu-sandbox.mjs (từ thư mục repo)
// =============================================================================

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const REPO = process.cwd();
const OUT = join(REPO, 'output', 'g01-navigation-i18n');
const SANDBOX = join(OUT, 'sandbox');
const ASTRO_JS = join(REPO, 'node_modules', 'astro', 'astro.js');
const CHECK_SCRIPT = join(REPO, 'scripts', 'check-g01-navigation.mjs');

if (!existsSync(ASTRO_JS)) {
  console.error('Không tìm thấy node_modules/astro/astro.js — cần npm install trước.');
  process.exit(1);
}

const ketQua = { thoiGian: new Date().toISOString(), sandbox: SANDBOX, cacCa: [] };
let coLoi = false;

function logCa(ten, dong) {
  ketQua.cacCa.push({ ca: ten, ...dong });
  console.log(`[${ten}] exit=${dong.exitCheck} kỳ-vọng=${dong.kyVong} → ${dong.dat ? 'ĐẠT' : 'KHÔNG ĐẠT'}${dong.chiTiet ? ' — ' + dong.chiTiet : ''}`);
  if (!dong.dat) coLoi = true;
}

// ----- Dựng sandbox: xóa cũ, copy cấu hình + src + public (KHÔNG node_modules/dist) -----
function taoSandbox() {
  rmSync(SANDBOX, { recursive: true, force: true });
  mkdirSync(SANDBOX, { recursive: true });
  for (const t of ['package.json', 'astro.config.mjs', 'tailwind.config.mjs', 'tsconfig.json']) {
    cpSync(join(REPO, t), join(SANDBOX, t));
  }
  cpSync(join(REPO, 'src'), join(SANDBOX, 'src'), { recursive: true });
  cpSync(join(REPO, 'public'), join(SANDBOX, 'public'), { recursive: true });
}

function xoaDistSandbox() {
  rmSync(join(SANDBOX, 'dist'), { recursive: true, force: true });
  rmSync(join(SANDBOX, '.astro'), { recursive: true, force: true });
}

function buildSandbox() {
  const out = { stdout: '', stderr: '' };
  try {
    out.stdout = execFileSync('node', [ASTRO_JS, 'build'], { cwd: SANDBOX, encoding: 'utf8' });
    out.exitBuild = 0;
  } catch (e) {
    out.stdout = e.stdout ?? '';
    out.stderr = (e.stderr ?? '') + String(e.message ?? '');
    out.exitBuild = e.status ?? null;
  }
  return out;
}

function checkSandbox(jsonPath) {
  const out = { stdout: '', stderr: '' };
  try {
    out.stdout = execFileSync('node', [CHECK_SCRIPT, 'dist', '--json', jsonPath], { cwd: SANDBOX, encoding: 'utf8' });
    out.exitCheck = 0;
  } catch (e) {
    out.stdout = e.stdout ?? '';
    out.stderr = (e.stderr ?? '') + String(e.message ?? '');
    out.exitCheck = e.status ?? null;
  }
  return out;
}

// Tiêm 1 thay đổi vào tệp trong sandbox; báo lỗi nếu chuỗi nguồn không có mặt
function tiem(relPath, tuChuoi, thanhChuoi) {
  const p = join(SANDBOX, relPath);
  const nd = readFileSync(p, 'utf8');
  if (!nd.includes(tuChuoi)) {
    throw new Error(`Không tìm thấy chuỗi tiêm trong ${relPath}: ${tuChuoi}`);
  }
  writeFileSync(p, nd.replace(tuChuoi, thanhChuoi), 'utf8');
}

const MUC_TIEU = {
  M1: {
    tep: 'src/i18n/contentRoutes.ts',
    // Mô phỏng ĐÚNG bug gốc: bảng băm tạo khóa bằng p.vi.replace(/\/$/, '')
    // (root thành "") trong khi tra cứu norm("/") = "/" — hai quy ước lệch nhau
    // làm mất cặp trang chủ. (Bỏ || '/' ở norm thì cả hai phía cùng dùng ""
    // nên vẫn nhất quán — không phải bug.)
    tu: "const byVi = new Map(ALL_PAIRS.map((p) => [norm(p.vi), p]));\nconst byEn = new Map(ALL_PAIRS.map((p) => [norm(p.en), p]));",
    thanh: "const byVi = new Map(ALL_PAIRS.map((p) => [p.vi.replace(/\\/$/, ''), p]));\nconst byEn = new Map(ALL_PAIRS.map((p) => [p.en.replace(/\\/$/, ''), p]));",
    kyVongKyVong: 'exit != 0 — ca root mapping (lớp 1) và/hoặc hreflang trang chủ (lớp 2) bị bắt',
  },
  M2: {
    tep: 'src/components/Header.astro',
    tu: 'const isHome = normalize(homeHref) === currentPath;',
    thanh: 'const isHome = true;',
    kyVongKyVong: 'exit != 0 — ca Home không active trên trang khác (lớp 2) bị bắt',
  },
};

// ----- Ca S1: bản sạch -----
{
  taoSandbox();
  const b = buildSandbox();
  const c = checkSandbox(join(OUT, 'sandbox-clean-ket-qua.json'));
  writeFileSync(join(OUT, 'log-sandbox-clean-stdout.txt'), b.stdout + c.stdout, 'utf8');
  writeFileSync(join(OUT, 'log-sandbox-clean-stderr.txt'), b.stderr + c.stderr, 'utf8');
  const dat = b.exitBuild === 0 && c.exitCheck === 0;
  logCa('S1 bản sạch', {
    exitBuild: b.exitBuild, exitCheck: c.exitCheck, kyVong: 'exit 0 cho cả build và check', dat,
    chiTiet: dat ? undefined : 'xem log-sandbox-clean-*.txt',
  });
  xoaDistSandbox();
}

// ----- Ca M1: root mapping sai -----
{
  taoSandbox();
  tiem(MUC_TIEU.M1.tep, MUC_TIEU.M1.tu, MUC_TIEU.M1.thanh);
  const b = buildSandbox();
  const c = checkSandbox(join(OUT, 'sandbox-m1-root-ket-qua.json'));
  writeFileSync(join(OUT, 'log-sandbox-m1-stdout.txt'), b.stdout + c.stdout, 'utf8');
  writeFileSync(join(OUT, 'log-sandbox-m1-stderr.txt'), b.stderr + c.stderr, 'utf8');
  // Bắt được lỗi: exit khác 0. Trích các ca root bị LỖI từ log để chứng minh đúng ca.
  const loiRoot = (c.stdout.match(/^ {2}LỖI .*$/gm) ?? []).filter((d) => /root|hreflang/i.test(d));
  const dat = b.exitBuild === 0 && c.exitCheck !== 0 && loiRoot.length > 0;
  logCa('M1 root mapping sai', {
    exitBuild: b.exitBuild, exitCheck: c.exitCheck, kyVong: MUC_TIEU.M1.kyVongKyVong, dat,
    chiTiet: dat ? `${loiRoot.length} ca root/hreflang bị bắt` : 'không thấy ca root trong danh sách lỗi',
  });
  xoaDistSandbox();
}

// ----- Ca M2: Home khớp mọi pathname -----
{
  taoSandbox();
  tiem(MUC_TIEU.M2.tep, MUC_TIEU.M2.tu, MUC_TIEU.M2.thanh);
  const b = buildSandbox();
  const c = checkSandbox(join(OUT, 'sandbox-m2-home-ket-qua.json'));
  writeFileSync(join(OUT, 'log-sandbox-m2-stdout.txt'), b.stdout + c.stdout, 'utf8');
  writeFileSync(join(OUT, 'log-sandbox-m2-stderr.txt'), b.stderr + c.stderr, 'utf8');
  const loiHome = (c.stdout.match(/^ {2}LỖI .*$/gm) ?? []).filter((d) => /Home/i.test(d));
  const dat = b.exitBuild === 0 && c.exitCheck !== 0 && loiHome.length > 0;
  logCa('M2 Home khớp mọi pathname', {
    exitBuild: b.exitBuild, exitCheck: c.exitCheck, kyVong: MUC_TIEU.M2.kyVongKyVong, dat,
    chiTiet: dat ? `${loiHome.length} ca Home-active sai bị bắt` : 'không thấy ca Home trong danh sách lỗi',
  });
  xoaDistSandbox();
}

// ----- Dọn sandbox (không giữ bản sao mã trong bằng chứng cuối) -----
rmSync(SANDBOX, { recursive: true, force: true });

ketQua.tongKet = coLoi ? 'KHÔNG ĐẠT' : 'ĐẠT — cả 3 ca đúng kỳ vọng';
writeFileSync(join(OUT, 'kiem-thu-sandbox-ket-qua.json'), JSON.stringify(ketQua, null, 2), 'utf8');
console.log(`KẾT LUẬN SANDBOX: ${ketQua.tongKet}`);
process.exit(coLoi ? 1 : 0);
