// =============================================================================
// check-3d-loading-budget.mjs — Chống hồi quy hiệu năng phần 3D /giai-phau
// =============================================================================
// Chạy SAU `astro build` (đọc dist/) — nằm trong chuỗi `npm run build`,
// KHÔNG nằm trong `npm run check` chạy trước build.
//
// Kiểm:
//   1. exploded3d.ts không còn import namespace `import * as THREE`.
//   2. trang giải phẫu chỉ mở engine bằng dynamic import sau thao tác chủ động
//      (chỉ được phép `import type` tĩnh — biên dịch xóa, không tạo runtime).
//   3. Không source/page/component nào khác import runtime Three.js.
//   4. Đồ thị chunk trong dist: từ chunk exploded3d dựng tập chunk 3D (kể cả
//      các chunk nó import — three core, OrbitControls); các trang KHÔNG liên
//      quan (trang chủ, thương hiệu, mẫu iconic, cơ chế) không tham chiếu
//      chunk nào trong tập này.
//   5. /giai-phau/ ở trạng thái HTML ban đầu không preload/tải chunk 3D và
//      không khởi tạo engine trước khi người dùng chọn tab.
//   6. Báo cáo raw/gzip từng asset 3D + kết quả từng route + kết luận.
//
// Exit code 1 nếu có hồi quy.
// =============================================================================

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const ASTRO = join(DIST, '_astro');
const errors = [];
const report = [];

// ===== 1. Không còn import namespace trong exploded3d.ts =====
const engineSrc = readFileSync('src/scripts/exploded3d.ts', 'utf8');
if (/import\s*\*\s*as\s*THREE/.test(engineSrc)) {
  errors.push('exploded3d.ts: import namespace `import * as THREE` đã quay trở lại');
} else {
  report.push('OK  exploded3d.ts: dùng named imports, không có import namespace THREE');
}

// ===== 2. Trang giải phẫu chỉ mở engine bằng dynamic import =====
const giaiPhauSrc = readFileSync('src/pages/giai-phau.astro', 'utf8');
const hasDynamic = /import\(\s*['"]\.\.\/scripts\/exploded3d['"]\s*\)/.test(giaiPhauSrc);
// import tĩnh bị cấm, TRỪ import type (biên dịch xóa — không tạo dependency runtime)
const staticImport = giaiPhauSrc.match(/^[ \t]*import\s+(?!type\b)[^;]*from\s+['"][^'"]*exploded3d['"]/m);
if (!hasDynamic) {
  errors.push('giai-phau.astro: không tìm thấy dynamic import "../scripts/exploded3d" — engine có thể bị tải tĩnh');
}
if (staticImport) {
  errors.push(`giai-phau.astro: phát hiện import tĩnh (không phải import type): ${staticImport[0].trim()}`);
}
if (hasDynamic && !staticImport) {
  report.push('OK  giai-phau.astro: engine chỉ mở bằng dynamic import (import tĩnh duy nhất là import type — đã xóa lúc biên dịch)');
}

// ===== 3. Không file nào khác import runtime Three.js =====
const srcDirs = ['src/scripts', 'src/pages', 'src/components', 'src/layouts', 'src/plugins'];
const threeRuntimeRe = /(?:^|[^.\w])import\s+(?!type\b)[^;]*(?:from\s*)?['"](three|three\/[^'"]+)['"]/;
const offenders = [];
function scanDir(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    let st;
    try { st = statSyncSafe(p); } catch { continue; }
    if (st.isDirectory()) scanDir(p);
    else if (/\.(ts|astro|mjs|js)$/.test(name)) {
      const t = readFileSync(p, 'utf8');
      // bỏ ghi chú: chỉ tính import three dạng runtime
      if (threeRuntimeRe.test(t) && p.replace(/\\/g, '/') !== 'src/scripts/exploded3d.ts') {
        offenders.push(p.replace(/\\/g, '/'));
      }
    }
  }
}
function statSyncSafe(p) { return statSync(p); }
for (const d of srcDirs) if (existsSync(d)) scanDir(d);
if (offenders.length > 0) {
  errors.push(`Three.js runtime bị import ở ngoài exploded3d.ts: ${offenders.join(', ')}`);
} else {
  report.push('OK  Chỉ src/scripts/exploded3d.ts import Three.js runtime');
}

// ===== 4. Đồ thị chunk trong dist — tập chunk 3D =====
const astroFiles = readdirSync(ASTRO).filter((f) => f.endsWith('.js'));
const explodedEntry = astroFiles.filter((f) => f.startsWith('exploded3d'));
if (explodedEntry.length !== 1) {
  errors.push(`dist/_astro: tìm thấy ${explodedEntry.length} chunk exploded3d (kỳ vọng 1)`);
}

// Dựng đồ thị: chunk -> các chunk nó import (cùng thư mục _astro)
function chunkImports(file) {
  const t = readFileSync(join(ASTRO, file), 'utf8');
  const deps = new Set();
  const re = /(?:from\s*|import\s*\(\s*|import\s+)["']\.\/([^"']+)["']/g;
  let m;
  while ((m = re.exec(t)) !== null) deps.add(m[1]);
  return deps;
}

const threeChunks = new Set();
if (explodedEntry.length === 1) {
  const queue = [explodedEntry[0]];
  while (queue.length > 0) {
    const cur = queue.pop();
    if (threeChunks.has(cur)) continue;
    threeChunks.add(cur);
    for (const dep of chunkImports(cur)) {
      if (astroFiles.includes(dep)) queue.push(dep);
    }
  }
}

// Phân biệt chunk THỰC SỰ chứa Three.js với chunk dùng chung của Vite
// (preload helper `hoisted.*` nằm trong đồ thị nhưng không chứa mã three —
// nó được mọi trang tải trong luồng chung, không phải tài nguyên 3D).
// Đặc trưng nhận diện: chuỗi literal "THREE." còn nguyên trong bản minified
// (three giữ tên class trong các chuỗi lỗi/cảnh báo nội bộ).
const threeChunksReport = new Set();
for (const f of threeChunks) {
  const isNamed3d = /^exploded3d\./.test(f) || /^OrbitControls\./.test(f);
  const hasThreeString = /THREE\./.test(readFileSync(join(ASTRO, f), 'utf8'));
  if (isNamed3d || hasThreeString) threeChunksReport.add(f);
}
if (explodedEntry.length === 1) {
  report.push(`OK  Tập chunk 3D (exploded3d + OrbitControls + chunk chứa three): ${[...threeChunksReport].sort().join(', ')}`);
}

// Kích thước raw/gzip từng asset 3D
const zlib = await import('node:zlib');
const sizes = [...threeChunksReport].sort().map((f) => {
  const raw = readFileSync(join(ASTRO, f));
  const gz = zlib.gzipSync(raw).length;
  return { file: f, rawKB: raw.length / 1024, gzipKB: gz / 1024 };
});
for (const s of sizes) {
  report.push(`    ${s.file} — raw ${s.rawKB.toFixed(1)} KB · gzip ${s.gzipKB.toFixed(1)} KB`);
}
const totalGzip = sizes.reduce((a, b) => a + b.gzipKB, 0);
report.push(`    Tổng gzip các chunk 3D: ${totalGzip.toFixed(1)} KB (chỉ tải khi người dùng mở tab 3D)`);

// ===== Route kiểm: không tham chiếu chunk 3D =====
// Và mạnh hơn: mọi chunk JS mà route tải ban đầu đều không được chứa mã three
// (bắt được three rò rỉ vào bundle dùng chung, bất kể đồ thị chunk).
const ROUTES = [
  ['Trang chủ', 'index.html'],
  ['Trang thương hiệu (Rolex)', 'thuong-hieu/rolex/index.html'],
  ['Mẫu iconic (rolex-submariner)', 'mau-iconic/rolex-submariner/index.html'],
  ['Bài cơ chế (bo-thoat)', 'co-che/bo-thoat/index.html'],
  ['Giải phẫu — 2D mặc định', 'giai-phau/index.html'],
];

if (explodedEntry.length === 1) {
  for (const [label, route] of ROUTES) {
    const p = join(DIST, route);
    if (!existsSync(p)) {
      errors.push(`Không tìm thấy route để kiểm: ${route}`);
      continue;
    }
    const html = readFileSync(p, 'utf8');
    const hit = [...threeChunksReport].filter((c) => html.includes(c));
    if (hit.length > 0) {
      errors.push(`${label} (${route}): tham chiếu chunk 3D trong tải ban đầu: ${hit.join(', ')}`);
      continue;
    }
    // Quét mọi chunk JS route này tải trực tiếp: không được chứa mã three
    const loaded = [...new Set([...html.matchAll(/\/_astro\/([A-Za-z0-9._-]+\.js)/g)].map((m) => m[1]))];
    const leaked = loaded.filter((c) => astroFiles.includes(c) && /THREE\./.test(readFileSync(join(ASTRO, c), 'utf8')));
    if (leaked.length > 0) {
      errors.push(`${label} (${route}): bundle dùng chung chứa mã Three.js: ${leaked.join(', ')}`);
    } else {
      report.push(`OK  ${label} (${route}): không tham chiếu chunk 3D, bundle tải ban đầu không chứa mã three (${loaded.length} chunk)`);
    }
  }

  // ===== 5. /giai-phau ban đầu: không khởi tạo engine trước khi chọn tab =====
  const giaiPhauHtml = readFileSync(join(DIST, 'giai-phau/index.html'), 'utf8');
  if (giaiPhauHtml.includes('mountExploded3D')) {
    errors.push('giai-phau/index.html: có khởi tạo/tên hàm mountExploded3D trong HTML ban đầu (phải nằm trong chunk động)');
  } else {
    report.push('OK  /giai-phau/ HTML ban đầu: không khởi tạo engine 3D — chỉ bấm tab mới tải');
  }
}

// ===== Kết luận =====
console.log('KIỂM TRA NGÂN SÁCH TẢI 3D (/giai-phau):');
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT — có hồi quy hiệu năng 3D:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — Three.js chỉ tải khi người dùng chủ động mở tab 3D; không route nào tải chunk 3D ban đầu.');
