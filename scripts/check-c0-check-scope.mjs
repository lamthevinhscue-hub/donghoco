// =============================================================================
// check-c0-check-scope.mjs — C0 (TXN-20261011-04): khóa phạm vi bộ kiểm tra mã
// =============================================================================
// Dùng: node scripts/check-c0-check-scope.mjs (nối trong `npm run check`, trước
// check:types). Chống hồi quy hai phía:
//   1) output/ phải nằm ngoài kiểm kiểu (tsconfig exclude) — lỗi thử trong
//      output/ không được astro check nhìn thấy;
//   2) chuỗi check/build không phụ thuộc dữ liệu trong output/ — dữ liệu chuẩn
//      G08 phải ở scripts/fixtures/ (bản có quản lý), không fallback về output/.
// Exit 1 nếu có lỗi.
// =============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const errors = [];
const dat = (ten, ok, chiTiet) => {
  console.log(`${ok ? 'ĐẠT' : 'KHÔNG ĐẠT'} ${ten}${chiTiet ? ' — ' + chiTiet : ''}`);
  if (!ok) errors.push(ten);
};

// ---- K1: tsconfig — exclude phải ĐÚNG TẬP ["dist","output"]: thêm bớt mẫu nào
// khác (src, scripts, …) đều FAIL — chống loại nhầm mã nguồn khỏi kiểm kiểu;
// extends/include phải khớp cấu hình đã duyệt từng nguyên văn.
const tsconfig = JSON.parse(readFileSync('tsconfig.json', 'utf8'));
const exclude = tsconfig.exclude ?? [];
dat(
  'K1a exclude đúng tập',
  exclude.length === 2 && exclude.includes('dist') && exclude.includes('output'),
  `exclude=[${exclude.join(', ')}] (bắt buộc đúng ["dist", "output"])`
);
const include = tsconfig.include ?? [];
dat(
  'K1b extends/include nguyên văn',
  tsconfig.extends === 'astro/tsconfigs/strict' &&
    include.length === 2 && include.includes('.astro/types.d.ts') && include.includes('**/*'),
  `extends=${tsconfig.extends}, include=[${include.join(', ')}]`
);

// ---- K2: G08 đọc fixture có quản lý, không fallback output/ (phân biệt mã sống
// với chú thích: bỏ khối /* */ và phần sau // ngoài chuỗi)
const g08 = readFileSync('scripts/check-g08-speedmaster-evolution.cjs', 'utf8');
const g08KhongChu = g08
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .split('\n')
  .map((line) => {
    let don = false;
    let kep = false;
    let out = '';
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === "'" && !kep) don = !don;
      else if (c === '"' && !don) kep = !kep;
      else if (c === '/' && line[i + 1] === '/' && !don && !kep) break;
      out += c;
    }
    return out;
  })
  .join('\n');
dat(
  'K2a G08 trỏ fixture',
  g08KhongChu.includes("'scripts/fixtures/g08-speedmaster-source-baseline.json'"),
  'hằng JSON_HO_SO trỏ scripts/fixtures/g08-speedmaster-source-baseline.json'
);
const g08DocOutput = g08KhongChu
  .split('\n')
  .filter((line) => line.includes('output/'))
  .map((line) => line.trim().slice(0, 120));
dat(
  'K2b G08 không đọc output/',
  g08DocOutput.length === 0,
  g08DocOutput.length ? 'mã sống còn: ' + g08DocOutput.join(' | ') : 'không còn tham chiếu output/ trong mã sống'
);

// ---- K3: fixture tồn tại, JSON hợp lệ, đúng 7 mốc, hash khớp bản chuẩn
// (hash được GPT Work kiểm tại lượt giao việc TXN-20261011-04)
const HASH_CHUAN = '96f5106389d5ed9801fe1276a7d23d11e3f7e75d85215bb3ed477e20c1355bea';
const TEP_FIXTURE = 'scripts/fixtures/g08-speedmaster-source-baseline.json';
let soMoc = -1;
let fixtureOk = false;
if (existsSync(TEP_FIXTURE)) {
  try {
    const fixture = JSON.parse(readFileSync(TEP_FIXTURE, 'utf8'));
    soMoc = (fixture.milestones ?? []).length;
    fixtureOk = soMoc === 7;
  } catch {
    fixtureOk = false;
  }
}
const hash = existsSync(TEP_FIXTURE) ? createHash('sha256').update(readFileSync(TEP_FIXTURE)).digest('hex') : '(thiếu tệp)';
dat(
  'K3 fixture G08',
  fixtureOk && hash === HASH_CHUAN,
  `milestones=${soMoc}, sha256=${hash.slice(0, 16)}…`
);

// ---- K4: chuỗi check giữ đủ mắt xích — checker C0 chạy TRƯỚC check:types;
// check:types vẫn là astro check; build vẫn gọi G08 + G09 baseline 69
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const checkScript = pkg.scripts.check ?? '';
const viTriC0 = checkScript.indexOf('node scripts/check-c0-check-scope.mjs');
const viTriTypes = checkScript.indexOf('npm run check:types');
dat(
  'K4a check trước check:types',
  viTriC0 !== -1 && viTriTypes !== -1 && viTriC0 < viTriTypes,
  `vị trí C0=${viTriC0}, check:types=${viTriTypes}`
);
dat(
  'K4b check:types astro check',
  (pkg.scripts['check:types'] ?? '').trim() === 'astro check',
  `check:types="${pkg.scripts['check:types']}"`
);
const buildScript = pkg.scripts.build ?? '';
dat(
  'K4c build giữ G08 + G09',
  buildScript.includes('node scripts/check-g08-speedmaster-evolution.cjs') &&
    buildScript.includes('node scripts/check-g09-id-unique.mjs'),
  'build vẫn gọi G08 và G09 (baseline 69 giữ nguyên, không sửa)'
);

// ---- K5: chuỗi check/build không phụ thuộc output/ trong mã sống — quét toàn
// bộ script `node scripts/...` trong hai chuỗi; bỏ chú thích trước khi tìm.
// Ngoại lệ có chủ đích: (1) dòng `const CAM = [` của check-h13-llms.mjs là DANH
// SÁCH CẤM rò dữ liệu trong llms.txt (nói "output/ không được xuất hiện"), không
// phải đọc tệp; (2) chính checker này có chuỗi tìm kiếm 'output/' làm logic kiểm
// — không đọc dữ liệu output/. Ngoài hai lệ này, bất kỳ tham chiếu output/ nào
// trong mã sống đều FAIL và phải dừng xin mở phạm vi, không tự sửa.
const chain = [
  ...new Set(
    [...checkScript.matchAll(/node (scripts\/[\w./-]+)/g), ...buildScript.matchAll(/node (scripts\/[\w./-]+)/g)].map((m) => m[1])
  ),
];
const LE_NGOAI = new Set(['scripts/check-c0-check-scope.mjs']);
const vongQuet = (src) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map((line) => {
      let don = false;
      let kep = false;
      let out = '';
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === "'" && !kep) don = !don;
        else if (c === '"' && !don) kep = !kep;
        else if (c === '/' && line[i + 1] === '/' && !don && !kep) break;
        out += c;
      }
      return out;
    })
    .join('\n');
const phuThuoc = [];
for (const tep of chain) {
  if (LE_NGOAI.has(tep)) continue;
  if (!existsSync(tep)) {
    phuThuoc.push(`${tep}: THIẾU TỆP trong chuỗi check/build`);
    continue;
  }
  const maSong = vongQuet(readFileSync(tep, 'utf8'));
  for (const line of maSong.split('\n')) {
    if (!line.includes('output/')) continue;
    const laDanhSachCam = tep === 'scripts/check-h13-llms.mjs' && /CAM\s*=\s*\[/.test(line);
    if (!laDanhSachCam) phuThuoc.push(`${tep}: ${line.trim().slice(0, 120)}`);
  }
}
dat(
  'K5 chuỗi check/build không đọc output/',
  phuThuoc.length === 0,
  phuThuoc.length ? `${phuThuoc.length} chỗ — dừng xin mở phạm vi: ${phuThuoc.slice(0, 3).join(' | ')}` : `${chain.length} script của chuỗi sạch`
);

if (errors.length) {
  console.log(`=> C0 THẤT BẠI: ${errors.length} phép kiểm (${errors.join('; ')})`);
  process.exit(1);
}
console.log('=> C0 ĐẠT: phạm vi bộ kiểm tra mã đúng — output/ ngoài kiểm kiểu, fixture G08 có quản lý.');
