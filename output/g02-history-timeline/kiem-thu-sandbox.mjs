// =============================================================================
// kiem-thu-sandbox.mjs (G02) — Chứng minh bộ kiểm G02 có thể BẮT lỗi
// =============================================================================
// Sandbox cô lập: thư mục TẠM do chính script tạo bằng mkdtempSync trong
// os.tmpdir() — script chỉ ghi/xóa trong thư mục tạm đó, luôn dọn trong
// finally kể cả khi một ca lỗi; không đụng bất kỳ đường dẫn khác.
// node_modules resolve từ repo (thư mục cha của cwd) — không sao chép.
//
//   S1  bản sạch → kỳ vọng exit 0 (ca âm tính A1: dấu ~ và khoảng năm vẫn qua)
//   M1  xóa sources của mốc harwood → bị bắt (G2-3)
//   M2  year của peter-henlein thành chuỗi "~1510" → bị bắt (G2-1c)
//   M3  thêm "đầu tiên" vào description mốc context trench-watch → bị bắt (G2-5)
//   M4  readMore của blancpain thành route không tồn tại → bị bắt (G2-11)
//
// JSON/log bằng chứng ghi vào output/g02-history-timeline/ (chuẩn hóa:
// trailing whitespace bị loại khi ghi). Sau khi chạy: không còn thư mục
// sandbox ở đâu cả.
// Chạy: node output/g02-history-timeline/kiem-thu-sandbox.mjs (từ thư mục repo)
// =============================================================================

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const REPO = process.cwd();
const OUT = join(REPO, 'output', 'g02-history-timeline');
const ASTRO_JS = join(REPO, 'node_modules', 'astro', 'astro.js');
const CHECK = join(REPO, 'scripts', 'check-g02-history-timeline.mjs');
const TIMELINE = join('src', 'data', 'timeline.json');

if (!existsSync(ASTRO_JS)) {
  console.error('Không tìm thấy node_modules/astro/astro.js — cần npm install trước.');
  process.exit(1);
}

// Ghi tệp văn bản chuẩn hóa: loại space/tab cuối từng dòng
function ghiChuanHoa(duongDan, noiDung) {
  writeFileSync(duongDan, noiDung.replace(/[ \t]+(?=\r?\n)/g, '').replace(/[ \t]+$/, ''), 'utf8');
}

// Sandbox tạm: mkdtemp tạo thư mục DUY NHẤT trong os.tmpdir(); script chỉ
// xóa trong thư mục này. Dọn bằng try/finally với retries (Windows khóa tệp).
const SANDBOX = mkdtempSync(join(tmpdir(), 'g02-sandbox-'));
const ketQua = { thoiGian: new Date().toISOString(), sandbox: SANDBOX, cacCa: [] };
let coLoi = false;

try {
  function logCa(ten, dong) {
    ketQua.cacCa.push({ ca: ten, ...dong });
    console.log(`[${ten}] exitBuild=${dong.exitBuild} exitCheck=${dong.exitCheck} kỳ-vọng=${dong.kyVong} → ${dong.dat ? 'ĐẠT' : 'KHÔNG ĐẠT'}${dong.chiTiet ? ' — ' + dong.chiTiet : ''}`);
    if (!dong.dat) coLoi = true;
  }

  // Junction node_modules: astro.config.mjs (ESM) import plugin theo chuẩn
  // Node — từ thư mục tạm không tìm thấy node_modules nếu không có "thư mục"
  // này. Junction trên Windows không cần quyền đặc quyền; Node rm() gỡ link
  // mà KHÔNG đi vào đích — kèm kiểm an toàn node_modules của repo còn nguyên.
  const NM_SANDBOX = join(SANDBOX, 'node_modules');
  function goLinkNodeModules() {
    try { rmSync(NM_SANDBOX, { force: true, maxRetries: 5, retryDelay: 300 }); } catch { /* chưa tồn tại */ }
    if (!existsSync(NM_SANDBOX)) symlinkSync(join(REPO, 'node_modules'), NM_SANDBOX, 'junction');
  }

  function taoNoiDungSandbox() {
    rmSync(join(SANDBOX, 'src'), { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
    rmSync(join(SANDBOX, 'public'), { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
    for (const t of ['package.json', 'astro.config.mjs', 'tailwind.config.mjs', 'tsconfig.json']) {
      cpSync(join(REPO, t), join(SANDBOX, t));
    }
    cpSync(join(REPO, 'src'), join(SANDBOX, 'src'), { recursive: true });
    cpSync(join(REPO, 'public'), join(SANDBOX, 'public'), { recursive: true });
    goLinkNodeModules();
  }

  function xoaSandboxDist() {
    rmSync(join(SANDBOX, 'dist'), { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
    rmSync(join(SANDBOX, '.astro'), { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
  }

  function buildSandbox() {
    try {
      const out = execFileSync('node', [ASTRO_JS, 'build'], { cwd: SANDBOX, encoding: 'utf8' });
      return { exitBuild: 0, stdout: out };
    } catch (e) {
      return { exitBuild: e.status ?? null, stdout: (e.stdout ?? '') + (e.stderr ?? '') };
    }
  }

  function checkSandbox(jsonPath) {
    try {
      const out = execFileSync('node', [CHECK, 'dist', '--json', jsonPath], { cwd: SANDBOX, encoding: 'utf8' });
      return { exitCheck: 0, stdout: out };
    } catch (e) {
      return { exitCheck: e.status ?? null, stdout: (e.stdout ?? '') + (e.stderr ?? '') };
    }
  }

  // Tiêm thay đổi JSON theo chỉ dẫn (fn nhận mảng entry, trả mảng đã sửa)
  function tiemJson(fn) {
    const p = join(SANDBOX, TIMELINE);
    const data = JSON.parse(readFileSync(p, 'utf8'));
    writeFileSync(p, JSON.stringify(fn(data), null, 2), 'utf8');
  }

  // ----- S1: bản sạch (kèm ca âm tính A1) -----
  {
    taoNoiDungSandbox();
    const b = buildSandbox();
    const c = checkSandbox(join(OUT, 'sandbox-clean-ket-qua.json'));
    ghiChuanHoa(join(OUT, 'log-sandbox-clean-stdout.txt'), b.stdout + c.stdout);
    const dat = b.exitBuild === 0 && c.exitCheck === 0;
    logCa('S1 bản sạch (đủ ~, khoảng năm vẫn qua — A1)', {
      exitBuild: b.exitBuild, exitCheck: c.exitCheck, kyVong: 'exit 0 cả build và check', dat,
    });
    xoaSandboxDist();
  }

  // ----- M1: xóa sources của harwood -----
  {
    taoNoiDungSandbox();
    tiemJson((data) => data.map((m) => (m.slug === 'harwood-automatic' ? { ...m, sources: [] } : m)));
    const b = buildSandbox();
    const c = checkSandbox(join(OUT, 'sandbox-m1-ket-qua.json'));
    ghiChuanHoa(join(OUT, 'log-sandbox-m1-stdout.txt'), b.stdout + c.stdout);
    const dat = b.exitBuild === 0 && c.exitCheck !== 0 && /G2-3/.test(c.stdout);
    logCa('M1 xóa sources mốc harwood', {
      exitBuild: b.exitBuild, exitCheck: c.exitCheck, kyVong: 'exit != 0, bắt [G2-3]', dat,
    });
    xoaSandboxDist();
  }

  // ----- M2: year của peter-henlein thành chuỗi "~1510" -----
  {
    taoNoiDungSandbox();
    tiemJson((data) => data.map((m) => (m.slug === 'peter-henlein' ? { ...m, year: '~1510' } : m)));
    const b = buildSandbox();
    const c = checkSandbox(join(OUT, 'sandbox-m2-ket-qua.json'));
    ghiChuanHoa(join(OUT, 'log-sandbox-m2-stdout.txt'), b.stdout + c.stdout);
    const dat = b.exitBuild === 0 && c.exitCheck !== 0 && /G2-1c/.test(c.stdout);
    logCa('M2 chuỗi thời gian lọt vào trường year số', {
      exitBuild: b.exitBuild, exitCheck: c.exitCheck, kyVong: 'exit != 0, bắt [G2-1c]', dat,
    });
    xoaSandboxDist();
  }

  // ----- M3: thêm "đầu tiên" vào mốc context (trench-watch) -----
  {
    taoNoiDungSandbox();
    tiemJson((data) => data.map((m) => (m.slug === 'trench-watch' ? { ...m, description: m.description + ' Trench watch là chiếc đồng hồ đeo tay đầu tiên trong lịch sử quân đội.' } : m)));
    const b = buildSandbox();
    const c = checkSandbox(join(OUT, 'sandbox-m3-ket-qua.json'));
    ghiChuanHoa(join(OUT, 'log-sandbox-m3-stdout.txt'), b.stdout + c.stdout);
    const dat = b.exitBuild === 0 && c.exitCheck !== 0 && /G2-5/.test(c.stdout);
    logCa('M3 claim "đầu tiên" không có trạng thái/phạm vi', {
      exitBuild: b.exitBuild, exitCheck: c.exitCheck, kyVong: 'exit != 0, bắt [G2-5]', dat,
    });
    xoaSandboxDist();
  }

  // ----- M4: readMore trỏ route không tồn tại -----
  {
    taoNoiDungSandbox();
    tiemJson((data) => data.map((m) => (m.slug === 'blancpain' ? { ...m, readMore: '/khong-ton-tai-123' } : m)));
    const b = buildSandbox();
    const c = checkSandbox(join(OUT, 'sandbox-m4-ket-qua.json'));
    ghiChuanHoa(join(OUT, 'log-sandbox-m4-stdout.txt'), b.stdout + c.stdout);
    const dat = b.exitBuild === 0 && c.exitCheck !== 0 && /G2-11/.test(c.stdout);
    logCa('M4 link nội bộ hỏng', {
      exitBuild: b.exitBuild, exitCheck: c.exitCheck, kyVong: 'exit != 0, bắt [G2-11]', dat,
    });
    xoaSandboxDist();
  }

  ketQua.tongKet = coLoi ? 'KHÔNG ĐẠT' : 'ĐẠT — cả 5 ca đúng kỳ vọng';
} finally {
  // Luôn dọn sandbox tạm — kể cả khi một ca/build lỗi giữa chừng.
  // Gỡ junction node_modules TRƯỚC (chỉ unlink link, không theo đích),
  // kèm kiểm an toàn: node_modules của repo phải còn nguyên.
  try { rmSync(join(SANDBOX, 'node_modules'), { force: true, maxRetries: 5, retryDelay: 300 }); } catch { /* chưa tồn tại */ }
  if (!existsSync(join(REPO, 'node_modules', 'astro', 'astro.js'))) {
    console.error('AN TOÀN: node_modules của repo bị đụng tới — kiểm tra ngay!');
    process.exit(2);
  }
  rmSync(SANDBOX, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
}

writeFileSync(join(OUT, 'kiem-thu-sandbox-ket-qua.json'), JSON.stringify(ketQua, null, 2), 'utf8');
console.log(`KẾT LUẬN SANDBOX: ${ketQua.tongKet}`);
console.log(`SANDBOX ĐÃ DỌN: ${!existsSync(SANDBOX)}`);
process.exit(coLoi ? 1 : 0);
