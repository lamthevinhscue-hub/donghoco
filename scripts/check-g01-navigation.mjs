// =============================================================================
// check-g01-navigation.mjs — Kiểm gói G01: điều hướng + ánh xạ ngôn ngữ
// =============================================================================
// Hai lớp kiểm, đều dựa trên logic/đầu ra THẬT của website (không sao chép hàm
// "đúng" vào test):
//   Lớp 1 (logic): transpile src/i18n/contentRoutes.ts bằng esbuild (dependency
//     có sẵn của Astro) rồi import và gọi thẳng các hàm — chuẩn hóa root,
//     ranh giới khu vực EN, cặp dịch, hreflang, bộ chuyển ngôn ngữ.
//   Lớp 2 (đầu ra): đọc HTML trong dist/ — aria-current từng nav (desktop và
//     mobile tách riêng theo khối <nav>), hreflang hai chiều của trang chủ,
//     nhóm Explore EN kèm nhãn hiển thị "Vietnamese only", bộ chuyển ngôn ngữ
//     trang chưa dịch, trang 404 không làm Trang chủ active.
//
// Cần dist/ đã tồn tại — script được nối vào npm run build SAU `astro build`
// (không nối vào npm run check vì check phải chạy được cả khi chưa build).
// Cách chạy: node scripts/check-g01-navigation.mjs [thư-mục-dist] [--json tệp]
//   - thư-mục-dist: mặc định "dist" (tương đối cwd — cho phép chạy trong sandbox)
//   - --json tệp: ghi thêm kết quả JSON máy đọc được
// Exit 1 nếu có lỗi.
// =============================================================================

import { build } from 'esbuild';
import { readFileSync, existsSync, statSync, readdirSync, rmSync, mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();

// ----- Tham số dòng lệnh -----------------------------------------------------
const argv = process.argv.slice(2);
const jsonIdx = argv.indexOf('--json');
const jsonOut = jsonIdx !== -1 ? argv[jsonIdx + 1] : null;
const positional = argv.filter((a, i) => !a.startsWith('--') && (jsonIdx === -1 || i !== jsonIdx + 1));
const DIST = resolve(ROOT, positional[0] ?? 'dist');

const results = { thoiGian: new Date().toISOString(), root: ROOT, dist: DIST, logic: [], dauRa: [], tongKet: null };
const errors = [];

// =============================================================================
// LỚP 1 — LOGIC: gọi thẳng hàm trong src/i18n/contentRoutes.ts
// =============================================================================
const srcRoutes = join(ROOT, 'src', 'i18n', 'contentRoutes.ts');
if (!existsSync(srcRoutes)) {
  console.error(`LỖI  Không tìm thấy ${srcRoutes} — chạy từ thư mục repo (hoặc sandbox có src/).`);
  process.exit(1);
}

// Transpile vào thư mục tạm của hệ điều hành, xóa ngay sau khi import.
const tmpDir = mkdtempSync(join(tmpdir(), 'g01-routes-'));
const tmpOut = join(tmpDir, 'contentRoutes.mjs');
await build({ entryPoints: [srcRoutes], outfile: tmpOut, bundle: false, format: 'esm', logLevel: 'silent' });
const routes = await import(pathToFileURL(tmpOut).href);
rmSync(tmpDir, { recursive: true, force: true });

const {
  englishPathFor,
  vietnamesePathFor,
  localizedHref,
  switcherTarget,
  getAlternates,
  isEnglishPath,
} = routes;

// Mỗi ca: tên + hàm trả true khi ĐẠT. Ghi cả kết quả cụ thể để đối chiếu.
const logicCases = [
  ['root: "/" có bản EN là "/en/"', () => englishPathFor('/') === '/en/', () => String(englishPathFor('/'))],
  ['root: "/en/" có bản VI là "/"', () => vietnamesePathFor('/en/') === '/', () => String(vietnamesePathFor('/en/'))],
  ['root: "/en" (không slash cuối) vẫn nhận cặp → "/"', () => vietnamesePathFor('/en') === '/', () => String(vietnamesePathFor('/en'))],
  ['slash cuối: "/thuong-hieu/" tra được cặp EN', () => englishPathFor('/thuong-hieu/') === '/en/brands/', () => String(englishPathFor('/thuong-hieu/'))],
  ['bài có cặp: /huong-dan/muc-chong-nuoc → /en/guides/water-resistance/', () => englishPathFor('/huong-dan/muc-chong-nuoc') === '/en/guides/water-resistance/', () => String(englishPathFor('/huong-dan/muc-chong-nuoc'))],
  ['chiều ngược: /en/guides/water-resistance/ → /huong-dan/muc-chong-nuoc', () => vietnamesePathFor('/en/guides/water-resistance/') === '/huong-dan/muc-chong-nuoc', () => String(vietnamesePathFor('/en/guides/water-resistance/'))],
  ['cặp lịch sử (G05-B): /lich-su → /en/history/', () => englishPathFor('/lich-su') === '/en/history/', () => String(englishPathFor('/lich-su'))],
  ['cặp lịch sử chiều ngược: /en/history/ → /lich-su', () => vietnamesePathFor('/en/history/') === '/lich-su', () => String(vietnamesePathFor('/en/history/'))],
  ['cặp giải phẫu (G06-A): /giai-phau → /en/anatomy/', () => englishPathFor('/giai-phau') === '/en/anatomy/', () => String(englishPathFor('/giai-phau'))],
  ['cặp giải phẫu chiều ngược: /en/anatomy/ → /giai-phau', () => vietnamesePathFor('/en/anatomy/') === '/giai-phau', () => String(vietnamesePathFor('/en/anatomy/'))],
  ['cặp so sánh (G06-B chặng 2): /so-sanh → /en/compare/', () => englishPathFor('/so-sanh') === '/en/compare/', () => String(englishPathFor('/so-sanh'))],
  ['cặp so sánh chiều ngược: /en/compare/ → /so-sanh', () => vietnamesePathFor('/en/compare/') === '/so-sanh', () => String(vietnamesePathFor('/en/compare/'))],
  ['không còn route giả /en/so-sanh trong bảng', () => englishPathFor('/so-sanh') !== '/en/so-sanh' && englishPathFor('/so-sanh') !== undefined, () => String(englishPathFor('/so-sanh'))],
  ['localizedHref("/", "en") = "/en/" — trang chủ hai chiều có bản dịch', () => localizedHref('/', 'en') === '/en/', () => String(localizedHref('/', 'en'))],
  ['localizedHref("/", "vi") = "/"', () => localizedHref('/', 'vi') === '/', () => String(localizedHref('/', 'vi'))],
  ['localizedHref("/lich-su", "en") = "/en/history/" — cặp thật, không chế URL', () => localizedHref('/lich-su', 'en') === '/en/history/', () => String(localizedHref('/lich-su', 'en'))],
  ['isEnglishPath: "/en" và "/en/" là EN', () => isEnglishPath('/en') === true && isEnglishPath('/en/') === true, () => `${isEnglishPath('/en')}/${isEnglishPath('/en/')}`],
  ['isEnglishPath: "/en/brands/rolex/" là EN', () => isEnglishPath('/en/brands/rolex/') === true, () => String(isEnglishPath('/en/brands/rolex/'))],
  ['isEnglishPath: "/english" KHÔNG phải EN (ranh giới segment)', () => isEnglishPath('/english') === false, () => String(isEnglishPath('/english'))],
  ['isEnglishPath: "/en-other" KHÔNG phải EN', () => isEnglishPath('/en-other') === false, () => String(isEnglishPath('/en-other'))],
  ['isEnglishPath: "/thuong-hieu" không phải EN', () => isEnglishPath('/thuong-hieu') === false, () => String(isEnglishPath('/thuong-hieu'))],
  ['switcherTarget("/") → "/en/", translated=true (trang chủ là cặp thật)', () => { const s = switcherTarget('/'); return s.href === '/en/' && s.translated === true; }, () => JSON.stringify(switcherTarget('/'))],
  ['switcherTarget("/en/") → "/", translated=true', () => { const s = switcherTarget('/en/'); return s.href === '/' && s.translated === true; }, () => JSON.stringify(switcherTarget('/en/'))],
  ['switcherTarget("/lich-su/") → "/en/history/", translated=true (cặp thật G05-B)', () => { const s = switcherTarget('/lich-su/'); return s.href === '/en/history/' && s.translated === true; }, () => JSON.stringify(switcherTarget('/lich-su/'))],
  ['switcherTarget("/en/history/") → "/lich-su", translated=true', () => { const s = switcherTarget('/en/history/'); return s.href === '/lich-su' && s.translated === true; }, () => JSON.stringify(switcherTarget('/en/history/'))],
  ['switcherTarget("/english") KHÔNG bị coi là khu vực EN', () => { const s = switcherTarget('/english'); return s.href === '/en/' && s.translated === false; }, () => JSON.stringify(switcherTarget('/english'))],
  ['switcherTarget("/co-che/bo-thoat") → bài EN tương ứng', () => switcherTarget('/co-che/bo-thoat').href === '/en/mechanisms/escapement/', () => JSON.stringify(switcherTarget('/co-che/bo-thoat'))],
  ['getAlternates("/"): đủ vi "/" + en "/en/" (hreflang hai chiều)', () => { const a = getAlternates('/'); return a.vi === '/' && a.en === '/en/'; }, () => JSON.stringify(getAlternates('/'))],
  ['getAlternates("/en/"): đủ vi "/" + en "/en/"', () => { const a = getAlternates('/en/'); return a.vi === '/' && a.en === '/en/'; }, () => JSON.stringify(getAlternates('/en/'))],
  ['getAlternates("/en") chuẩn hóa về "/en/" (không khai báo URL không tồn tại)', () => { const a = getAlternates('/en'); return a.vi === '/' && a.en === '/en/'; }, () => JSON.stringify(getAlternates('/en'))],
  ['getAlternates("/lich-su"): đủ vi "/lich-su" + en "/en/history/" (cặp G05-B)', () => { const a = getAlternates('/lich-su'); return a.vi === '/lich-su' && a.en === '/en/history/'; }, () => JSON.stringify(getAlternates('/lich-su'))],
  ['getAlternates("/en/history/"): đủ vi "/lich-su" + en "/en/history/"', () => { const a = getAlternates('/en/history/'); return a.vi === '/lich-su' && a.en === '/en/history/'; }, () => JSON.stringify(getAlternates('/en/history/'))],
];

console.log('G01 — LỚP 1: LOGIC ÁNH XẠ NGÔN NGỮ (gọi thẳng src/i18n/contentRoutes.ts):');
for (const [ten, kiem, chiTiet] of logicCases) {
  let dat = false;
  try { dat = kiem() === true; } catch { dat = false; }
  const dong = { ca: ten, dat, chiTiet: chiTiet() };
  results.logic.push(dong);
  console.log(`  ${dat ? 'ĐẠT' : 'LỖI '} ${ten}${dat ? '' : ` — thực tế: ${dong.chiTiet}`}`);
  if (!dat) errors.push(`logic: ${ten} — thực tế: ${dong.chiTiet}`);
}

// =============================================================================
// LỚP 2 — ĐẦU RA: đọc HTML trong dist
// =============================================================================
if (!existsSync(DIST)) {
  console.error(`LỘI  Không tìm thấy ${DIST} — cần build trước khi kiểm đầu ra.`);
  process.exit(1);
}
const read = (rel) => readFileSync(join(DIST, ...rel.split('/')), 'utf8');
const has = (rel) => existsSync(join(DIST, ...rel.split('/')));

// Cắt khối <nav> desktop và <nav> mobile RIÊNG để không đếm nhầm bản đang ẩn
// thành mục hiển thị — khối desktop: nav có class lg:flex; khối mobile: id="mobile-menu".
function cutBlock(html, startRe) {
  const m = html.match(startRe);
  if (!m) return null;
  const start = m.index;
  const end = html.indexOf('</nav>', start);
  return end === -1 ? null : html.slice(start, end);
}
const desktopOf = (html) => cutBlock(html, /<nav[^>]*aria-label="[^"]*"[^>]*class="hidden[^"]*lg:flex"/);
const mobileOf = (html) => cutBlock(html, /<nav[^>]*id="mobile-menu"/);

// Đếm anchor trong một khối có href chỉ định và aria-current chỉ định
function countCurrent(block, href, value) {
  if (block === null) return -1;
  const re = new RegExp(`<a\\b[^>]*href="${href.replace(/[?]/g, '\\?')}"[^>]*aria-current="${value}"`, 'g');
  return (block.match(re) ?? []).length;
}
function countAnyCurrent(block, href) {
  if (block === null) return -1;
  const re = new RegExp(`<a\\b[^>]*href="${href.replace(/[?]/g, '\\?')}"[^>]*aria-current="`, 'g');
  return (block.match(re) ?? []).length;
}

const dauRa = [];
function kiemDauRa(ten, hopLe, chiTiet = '') {
  // hopLe có thể là boolean hoặc hàm trả boolean (ca cần tính trên HTML đã cắt)
  const ketQua = typeof hopLe === 'function' ? hopLe() === true : hopLe === true;
  const dong = { ca: ten, dat: ketQua, chiTiet };
  dauRa.push(dong);
  results.dauRa.push(dong);
  console.log(`  ${dong.dat ? 'ĐẠT' : 'LỖI '} ${ten}${dong.dat ? '' : ` — ${chiTiet}`}`);
  if (!dong.dat) errors.push(`đầu ra: ${ten}${chiTiet ? ` — ${chiTiet}` : ''}`);
}

console.log('G01 — LỚP 2: ĐẦU RA HTML TRONG DIST:');

// ---- Trang chủ VI ----
if (has('/index.html')) {
  const html = read('/index.html');
  const desktop = desktopOf(html);
  const mobile = mobileOf(html);
  kiemDauRa('Trang chủ VI: nav desktop và nav mobile đều được tìm thấy trong HTML', desktop !== null && mobile !== null, `desktop=${desktop !== null}, mobile=${mobile !== null}`);
  kiemDauRa('Trang chủ VI: Home desktop có aria-current="page" (1 mục)', countCurrent(desktop, '/', 'page') === 1, `count=${countCurrent(desktop, '/', 'page')}`);
  kiemDauRa('Trang chủ VI: Home mobile có aria-current="page" (1 mục)', countCurrent(mobile, '/', 'page') === 1, `count=${countCurrent(mobile, '/', 'page')}`);
  kiemDauRa('Trang chủ VI: không mục nào khác mang aria-current ngoài Home', countAnyCurrent(desktop, '/') + countAnyCurrent(mobile, '/') === 2, `tổng=${countAnyCurrent(desktop, '/') + countAnyCurrent(mobile, '/')}`);
  kiemDauRa('Trang chủ VI: hreflang đủ vi + en "/en/" + x-default → "/"', () => {
    const vi = /<link rel="alternate" hreflang="vi" href="https:\/\/www\.kienthucdonghoco\.vn\/">/.test(html);
    const en = /<link rel="alternate" hreflang="en" href="https:\/\/www\.kienthucdonghoco\.vn\/en\/">/.test(html);
    const xd = /<link rel="alternate" hreflang="x-default" href="https:\/\/www\.kienthucdonghoco\.vn\/">/.test(html);
    return vi && en && xd;
  }, 'cần 3 thẻ link alternate đúng URL');
  // nút nhóm cha không mang aria-current
  const btnCurrent = (html.match(/<button[^>]*data-dropdown-toggle[^>]*aria-current=/g) ?? []).length;
  kiemDauRa('Trang chủ VI: nút nhóm xổ không mang aria-current', btnCurrent === 0, `count=${btnCurrent}`);
} else {
  kiemDauRa('Trang chủ VI (dist/index.html)', false, 'thiếu tệp');
}

// ---- Trang danh sách VI: Home KHÔNG active, mục khu vực page ----
if (has('/thuong-hieu/index.html')) {
  const html = read('/thuong-hieu/index.html');
  const desktop = desktopOf(html);
  const mobile = mobileOf(html);
  kiemDauRa('Danh sách VI /thuong-hieu: Home desktop KHÔNG có aria-current', countAnyCurrent(desktop, '/') === 0, `count=${countAnyCurrent(desktop, '/')}`);
  kiemDauRa('Danh sách VI /thuong-hieu: Home mobile KHÔNG có aria-current', countAnyCurrent(mobile, '/') === 0, `count=${countAnyCurrent(mobile, '/')}`);
  kiemDauRa('Danh sách VI /thuong-hieu: mục Thương hiệu desktop aria-current="page" (1)', countCurrent(desktop, '/thuong-hieu', 'page') === 1, `count=${countCurrent(desktop, '/thuong-hieu', 'page')}`);
  kiemDauRa('Danh sách VI /thuong-hieu: mục Thương hiệu mobile aria-current="page" (1)', countCurrent(mobile, '/thuong-hieu', 'page') === 1, `count=${countCurrent(mobile, '/thuong-hieu', 'page')}`);
} else {
  kiemDauRa('Danh sách VI /thuong-hieu', false, 'thiếu tệp');
}

// ---- Trang con VI: khu vực = location, nút cha không gạch ----
if (has('/thuong-hieu/rolex/index.html')) {
  const html = read('/thuong-hieu/rolex/index.html');
  const desktop = desktopOf(html);
  const mobile = mobileOf(html);
  kiemDauRa('Bài con VI /thuong-hieu/rolex: mục Thương hiệu desktop aria-current="location" (không phải page)', countCurrent(desktop, '/thuong-hieu', 'location') === 1 && countCurrent(desktop, '/thuong-hieu', 'page') === 0, `location=${countCurrent(desktop, '/thuong-hieu', 'location')}, page=${countCurrent(desktop, '/thuong-hieu', 'page')}`);
  kiemDauRa('Bài con VI /thuong-hieu/rolex: mục Thương hiệu mobile aria-current="location"', countCurrent(mobile, '/thuong-hieu', 'location') === 1, `count=${countCurrent(mobile, '/thuong-hieu', 'location')}`);
  kiemDauRa('Bài con VI /thuong-hieu/rolex: Home desktop KHÔNG active', countAnyCurrent(desktop, '/') === 0, `count=${countAnyCurrent(desktop, '/')}`);
}
if (has('/co-che/bo-thoat/index.html')) {
  const html = read('/co-che/bo-thoat/index.html');
  const desktop = desktopOf(html);
  const mobile = mobileOf(html);
  kiemDauRa('Bài cơ chế /co-che/bo-thoat: mục Cơ chế (trong dropdown) aria-current="location"', countCurrent(desktop, '/co-che', 'location') === 1, `count=${countCurrent(desktop, '/co-che', 'location')}`);
  // Nút nhóm Kiến thức: không aria-current, không gạch active (không dùng border-brass)
  if (desktop === null) {
    kiemDauRa('Bài cơ chế /co-che/bo-thoat: nút nhóm cha đổi màu nhưng KHÔNG gạch active, KHÔNG aria-current', false, 'không tìm thấy khối nav desktop');
  } else {
    const btnRe = /<button[^>]*data-dropdown-toggle[^>]*>/g;
    let btns = '';
    for (const m of desktop.match(btnRe) ?? []) btns += m;
    const btnBrass = (btns.match(/border-brass/g) ?? []).length;
    const btnCurrent = (btns.match(/aria-current=/g) ?? []).length;
    kiemDauRa('Bài cơ chế /co-che/bo-thoat: nút nhóm cha đổi màu nhưng KHÔNG gạch active, KHÔNG aria-current', btnBrass === 0 && btnCurrent === 0, `border-brass=${btnBrass}, aria-current=${btnCurrent}`);
  }
  kiemDauRa('Bài cơ chế /co-che/bo-thoat: mục dropdown active có gạch chân (underline)', /<a[^>]*href="\/co-che"[^>]*class="[^"]*underline/.test(desktop), 'cần class underline trên mục dropdown active');
  kiemDauRa('Bài cơ chế /co-che/bo-thoat: Home mobile KHÔNG active', countAnyCurrent(mobile, '/') === 0, `count=${countAnyCurrent(mobile, '/')}`);
}

// ---- Trang chủ EN: Home EN active + hreflang hai chiều + Explore VI có nhãn ----
if (has('/en/index.html')) {
  const html = read('/en/index.html');
  const desktop = desktopOf(html);
  const mobile = mobileOf(html);
  kiemDauRa('Trang chủ EN: Home desktop (href="/en/") aria-current="page"', countCurrent(desktop, '/en/', 'page') === 1, `count=${countCurrent(desktop, '/en/', 'page')}`);
  kiemDauRa('Trang chủ EN: Home mobile aria-current="page"', countCurrent(mobile, '/en/', 'page') === 1, `count=${countCurrent(mobile, '/en/', 'page')}`);
  kiemDauRa('Trang chủ EN: hreflang đủ vi "/" + en "/en/" + x-default → "/"', () => {
    const vi = /<link rel="alternate" hreflang="vi" href="https:\/\/www\.kienthucdonghoco\.vn\/">/.test(html);
    const en = /<link rel="alternate" hreflang="en" href="https:\/\/www\.kienthucdonghoco\.vn\/en\/">/.test(html);
    const xd = /<link rel="alternate" hreflang="x-default" href="https:\/\/www\.kienthucdonghoco\.vn\/">/.test(html);
    return vi && en && xd;
  }, 'cần 3 thẻ link alternate đúng URL');
  // Explore EN sau G06-B chặng 2: cả ba mục Khám phá (/en/history/, /en/anatomy/,
  // /en/compare/) đều có đích thật — Explore EN không còn mục nào mang nhãn VI-only
  const anchorWithHref = (block, href) => {
    if (block === null) return null;
    const m = block.match(new RegExp(`<a\\b[^>]*href="${href}"[^>]*>[\\s\\S]*?</a>`));
    return m ? m[0] : null;
  };
  const exploreViOnly = []; // /lich-su, /giai-phau và /so-sanh (/en/compare/) đều đã có bản EN — G05-B/G06-A/G06-B
  for (const [tenNav, block] of [['desktop', desktop], ['mobile', mobile]]) {
    for (const target of exploreViOnly) {
      const re = new RegExp(`<a\\b[^>]*href="${target}"[^>]*>[\\s\\S]*?Vietnamese only[\\s\\S]*?</a>`);
      kiemDauRa(`Explore EN (${tenNav}): link "${target}" có nhãn hiển thị "Vietnamese only"`, block !== null && re.test(block), block === null ? 'không tìm thấy khối nav' : undefined);
    }
    // Kiểm TỪNG thẻ anchor: mục lịch sử trỏ route EN và thẻ ĐÓ không mang nhãn VI-only
    const hisA = anchorWithHref(block, '/en/history/');
    kiemDauRa(`Explore EN (${tenNav}): mục lịch sử trỏ route EN "/en/history/" (thẻ không mang nhãn VI-only)`, hisA !== null && !hisA.includes('Vietnamese only'), hisA === null ? 'không tìm thấy thẻ /en/history/' : 'thẻ còn nhãn VI-only');

    const anaA = anchorWithHref(block, '/en/anatomy/');
    kiemDauRa(`Explore EN (${tenNav}): mục Anatomy trỏ route EN "/en/anatomy/" (thẻ không mang nhãn VI-only)`, anaA !== null && !anaA.includes('Vietnamese only'), anaA === null ? 'không tìm thấy thẻ /en/anatomy/' : 'thẻ còn nhãn VI-only');

    const cmpA = anchorWithHref(block, '/en/compare/');
    kiemDauRa(`Explore EN (${tenNav}): mục Compare trỏ route EN "/en/compare/" (thẻ không mang nhãn VI-only)`, cmpA !== null && !cmpA.includes('Vietnamese only'), cmpA === null ? 'không tìm thấy thẻ /en/compare/' : 'thẻ còn nhãn VI-only');
  }
  // Bộ chuyển ngôn ngữ trên trang chủ EN: có cặp → link thẳng về "/" không mở hộp
  const swCount = (html.match(/data-lang-switch=/g) ?? []).length;
  kiemDauRa('Trang chủ EN: bộ chuyển ngôn ngữ là link thẳng (không có data-lang-switch)', swCount === 0, `count=${swCount}`);
  const swVi = (html.match(/href="\/"[\s\S]{0,400}?hreflang="vi"/g) ?? []).length;
  kiemDauRa('Trang chủ EN: switcher href="/" với hreflang="vi"', swVi >= 1, `count=${swVi}`);
} else {
  kiemDauRa('Trang chủ EN (dist/en/index.html)', false, 'thiếu tệp');
}

// ---- Trang EN bài: khu vực EN location, Explore vẫn có ----
if (has('/en/mechanisms/escapement/index.html')) {
  const html = read('/en/mechanisms/escapement/index.html');
  const desktop = desktopOf(html);
  const mobile = mobileOf(html);
  kiemDauRa('Bài EN /en/mechanisms/escapement: Home EN KHÔNG active', countAnyCurrent(desktop, '/en/') === 0, `count=${countAnyCurrent(desktop, '/en/')}`);
  kiemDauRa('Bài EN /en/mechanisms/escapement: mục Mechanisms (dropdown) aria-current="location"', countCurrent(desktop, '/en/mechanisms/', 'location') === 1, `count=${countCurrent(desktop, '/en/mechanisms/', 'location')}`);
  kiemDauRa('Bài EN /en/mechanisms/escapement: Explore EN desktop đủ 3 route EN, không còn mục VI-only', desktop !== null && /href="\/en\/history\/"/.test(desktop) && /href="\/en\/anatomy\/"/.test(desktop) && /href="\/en\/compare\/"/.test(desktop) && !/href="\/so-sanh"/.test(desktop) && !new RegExp(`href="/so-sanh"[\\s\\S]*?Vietnamese only`).test(desktop) && !new RegExp(`href="/giai-phau"[\\s\\S]*?Vietnamese only`).test(desktop), 'thiếu route EN hoặc còn nhãn VI-only');
  kiemDauRa('Bài EN /en/mechanisms/escapement: Explore EN mobile đủ 3 route EN, không còn mục VI-only', mobile !== null && /href="\/en\/history\/"/.test(mobile) && /href="\/en\/anatomy\/"/.test(mobile) && /href="\/en\/compare\/"/.test(mobile) && !/href="\/so-sanh"/.test(mobile) && !new RegExp(`href="/so-sanh"[\\s\\S]*?Vietnamese only`).test(mobile) && !new RegExp(`href="/giai-phau"[\\s\\S]*?Vietnamese only`).test(mobile), 'thiếu route EN hoặc còn nhãn VI-only');
}

// ---- Cặp lịch sử G05-B: /lich-su đã có bản dịch — switcher link thẳng + hreflang thật ----
if (has('/lich-su/index.html')) {
  const html = read('/lich-su/index.html');
  const swCount = (html.match(/data-lang-switch="untranslated"/g) ?? []).length;
  kiemDauRa('Cặp lịch sử /lich-su: bộ chuyển ngôn ngữ là link thẳng (không data-lang-switch)', swCount === 0, `count=${swCount}`);
  kiemDauRa('Cặp lịch sử /lich-su: switcher trỏ "/en/history/"', /href="\/en\/history\/"/.test(html), 'không tìm thấy link /en/history/');
  kiemDauRa('Cặp lịch sử /lich-su: hreflang đủ vi "/lich-su/" + en "/en/history/" + x-default → "/lich-su/"', () => {
    const vi = /<link rel="alternate" hreflang="vi" href="https:\/\/www\.kienthucdonghoco\.vn\/lich-su\/">/.test(html);
    const en = /<link rel="alternate" hreflang="en" href="https:\/\/www\.kienthucdonghoco\.vn\/en\/history\/">/.test(html);
    const xd = /<link rel="alternate" hreflang="x-default" href="https:\/\/www\.kienthucdonghoco\.vn\/lich-su\/">/.test(html);
    return vi && en && xd;
  }, 'cần 3 thẻ link alternate đúng URL');
  // Chỉ quét thẻ <noscript> — hộp thoại #lang-panel (hidden, không mở trên trang
  // đã dịch) vẫn chứa chuỗi tiêu đề theo khuôn hiện hành, không phải noscript.
  kiemDauRa('Cặp lịch sử /lich-su: không còn noscript "chưa có bản tiếng Anh"', !/<noscript>[\s\S]*?chưa có bản tiếng Anh[\s\S]*?<\/noscript>/.test(html), 'vẫn còn noscript trang chưa dịch');
  kiemDauRa('Cặp lịch sử /lich-su: cả hai switcher có đánh dấu giữ hash (data-lang-hash-keep)', (html.match(/data-lang-hash-keep/g) ?? []).length >= 2, `count=${(html.match(/data-lang-hash-keep/g) ?? []).length}`);
}

// ---- Cặp lịch sử G05-B: trang EN mới /en/history/ ----
if (has('/en/history/index.html')) {
  const html = read('/en/history/index.html');
  const desktop = desktopOf(html);
  const mobile = mobileOf(html);
  const swCount = (html.match(/data-lang-switch="untranslated"/g) ?? []).length;
  kiemDauRa('Cặp lịch sử /en/history: bộ chuyển ngôn ngữ là link thẳng về "/lich-su"', swCount === 0 && /href="\/lich-su"/.test(html), `count=${swCount}`);
  // Khuôn hreflang hiện hành: chiều VI phát vi theo pathname thực ("/lich-su/"),
  // chiều EN phát vi theo giá trị bảng ("/lich-su" không slash) — không nhất quán
  // dấu slash cuối là tiền tồn tại toàn site, không phải lỗi G05-B.
  kiemDauRa('Cặp lịch sử /en/history: hreflang đủ vi "/lich-su" + en "/en/history/" + x-default → "/lich-su" (khuôn getAlternates hiện hành)', () => {
    const vi = /<link rel="alternate" hreflang="vi" href="https:\/\/www\.kienthucdonghoco\.vn\/lich-su">/.test(html);
    const en = /<link rel="alternate" hreflang="en" href="https:\/\/www\.kienthucdonghoco\.vn\/en\/history\/">/.test(html);
    const xd = /<link rel="alternate" hreflang="x-default" href="https:\/\/www\.kienthucdonghoco\.vn\/lich-su">/.test(html);
    return vi && en && xd;
  }, 'cần 3 thẻ link alternate đúng URL');
  kiemDauRa('Cặp lịch sử /en/history: không noscript trang chưa dịch (tiếng Việt hoặc tiếng Anh)', !/<noscript>[\s\S]*?(chưa có bản tiếng Anh|not translated yet)[\s\S]*?<\/noscript>/.test(html), 'vẫn còn noscript trang chưa dịch');
  kiemDauRa('Cặp lịch sử /en/history: mục History desktop aria-current="page" (1)', countCurrent(desktop, '/en/history/', 'page') === 1, `count=${countCurrent(desktop, '/en/history/', 'page')}`);
  kiemDauRa('Cặp lịch sử /en/history: mục History mobile aria-current="page" (1)', countCurrent(mobile, '/en/history/', 'page') === 1, `count=${countCurrent(mobile, '/en/history/', 'page')}`);
} else {
  kiemDauRa('Cặp lịch sử /en/history (dist/en/history/index.html)', false, 'thiếu tệp');
}

// ---- Cặp giải phẫu G06-A: /giai-phau đã có bản dịch — switcher thẳng + hreflang thật ----
if (has('/giai-phau/index.html')) {
  const html = read('/giai-phau/index.html');
  const swCount = (html.match(/data-lang-switch="untranslated"/g) ?? []).length;
  kiemDauRa('Cặp giải phẫu /giai-phau: bộ chuyển ngôn ngữ là link thẳng (không data-lang-switch)', swCount === 0, `count=${swCount}`);
  kiemDauRa('Cặp giải phẫu /giai-phau: switcher trỏ "/en/anatomy/"', /href="\/en\/anatomy\/"/.test(html), 'không tìm thấy link /en/anatomy/');
  kiemDauRa('Cặp giải phẫu /giai-phau: hreflang đủ vi "/giai-phau/" + en "/en/anatomy/" + x-default → "/giai-phau/"', () => {
    const vi = /<link rel="alternate" hreflang="vi" href="https:\/\/www\.kienthucdonghoco\.vn\/giai-phau\/">/.test(html);
    const en = /<link rel="alternate" hreflang="en" href="https:\/\/www\.kienthucdonghoco\.vn\/en\/anatomy\/">/.test(html);
    const xd = /<link rel="alternate" hreflang="x-default" href="https:\/\/www\.kienthucdonghoco\.vn\/giai-phau\/">/.test(html);
    return vi && en && xd;
  }, 'cần 3 thẻ link alternate đúng URL');
  kiemDauRa('Cặp giải phẫu /giai-phau: không còn noscript "chưa có bản tiếng Anh"', !/<noscript>[\s\S]*?chưa có bản tiếng Anh[\s\S]*?<\/noscript>/.test(html), 'vẫn còn noscript trang chưa dịch');
}

// ---- Cặp giải phẫu G06-A: trang EN mới /en/anatomy/ ----
if (has('/en/anatomy/index.html')) {
  const html = read('/en/anatomy/index.html');
  const desktop = desktopOf(html);
  const mobile = mobileOf(html);
  const swCount = (html.match(/data-lang-switch="untranslated"/g) ?? []).length;
  kiemDauRa('Cặp giải phẫu /en/anatomy: bộ chuyển ngôn ngữ là link thẳng về "/giai-phau"', swCount === 0 && /href="\/giai-phau"/.test(html), `count=${swCount}`);
  // Khuôn hreflang hiện hành: chiều VI phát vi theo pathname ("/giai-phau/"),
  // chiều EN phát vi theo giá trị bảng ("/giai-phau" không slash) — tiền tồn tại toàn site.
  kiemDauRa('Cặp giải phẫu /en/anatomy: hreflang đủ vi "/giai-phau" + en "/en/anatomy/" + x-default → "/giai-phau" (khuôn getAlternates hiện hành)', () => {
    const vi = /<link rel="alternate" hreflang="vi" href="https:\/\/www\.kienthucdonghoco\.vn\/giai-phau">/.test(html);
    const en = /<link rel="alternate" hreflang="en" href="https:\/\/www\.kienthucdonghoco\.vn\/en\/anatomy\/">/.test(html);
    const xd = /<link rel="alternate" hreflang="x-default" href="https:\/\/www\.kienthucdonghoco\.vn\/giai-phau">/.test(html);
    return vi && en && xd;
  }, 'cần 3 thẻ link alternate đúng URL');
  kiemDauRa('Cặp giải phẫu /en/anatomy: không noscript trang chưa dịch (tiếng Việt hoặc tiếng Anh)', !/<noscript>[\s\S]*?(chưa có bản tiếng Anh|not translated yet)[\s\S]*?<\/noscript>/.test(html), 'vẫn còn noscript trang chưa dịch');
  kiemDauRa('Cặp giải phẫu /en/anatomy: mục Anatomy desktop aria-current="page" (1)', countCurrent(desktop, '/en/anatomy/', 'page') === 1, `count=${countCurrent(desktop, '/en/anatomy/', 'page')}`);
  kiemDauRa('Cặp giải phẫu /en/anatomy: mục Anatomy mobile aria-current="page" (1)', countCurrent(mobile, '/en/anatomy/', 'page') === 1, `count=${countCurrent(mobile, '/en/anatomy/', 'page')}`);
} else {
  kiemDauRa('Cặp giải phẫu /en/anatomy (dist/en/anatomy/index.html)', false, 'thiếu tệp');
}

// ---- Cặp so sánh G06-B chặng 2: /so-sanh ↔ /en/compare/ ----
// Lưu ý: bỏ comment HTML trước khi kiểm chuỗi hiển thị ("Vietnamese only" còn
// xuất hiện trong comment khuôn của Header, không phải nội dung hiển thị).
const boComment = (s) => (typeof s === 'string' ? s.replace(/<!--[\s\S]*?-->/g, '') : s);
if (has('/so-sanh/index.html')) {
  const html = boComment(read('/so-sanh/index.html'));
  const desktop = desktopOf(html);
  const swCount = (html.match(/data-lang-switch="untranslated"/g) ?? []).length;
  kiemDauRa('Cặp so sánh /so-sanh: bộ chuyển ngôn ngữ là link thẳng (không data-lang-switch)', swCount === 0, `count=${swCount}`);
  kiemDauRa('Cặp so sánh /so-sanh: switcher trỏ "/en/compare/"', /href="\/en\/compare\/"/.test(html), 'không tìm thấy link /en/compare/');
  kiemDauRa('Cặp so sánh /so-sanh: hreflang đủ vi "/so-sanh/" + en "/en/compare/" + x-default → "/so-sanh/"', () => {
    const vi = /<link rel="alternate" hreflang="vi" href="https:\/\/www\.kienthucdonghoco\.vn\/so-sanh\/">/.test(html);
    const en = /<link rel="alternate" hreflang="en" href="https:\/\/www\.kienthucdonghoco\.vn\/en\/compare\/">/.test(html);
    const xd = /<link rel="alternate" hreflang="x-default" href="https:\/\/www\.kienthucdonghoco\.vn\/so-sanh\/">/.test(html);
    return vi && en && xd;
  }, 'cần 3 thẻ link alternate đúng URL');
  kiemDauRa('Cặp so sánh /so-sanh: og:image là og-mau-iconic.jpg', /property="og:image" content="[^"]*\/images\/og\/og-mau-iconic\.jpg"/.test(html), 'og:image không phải og-mau-iconic.jpg');
  kiemDauRa('Cặp so sánh /so-sanh: vùng cuộn bảng tự quản (tabindex + role="region" ngay trong HTML)', /id="compare-table-wrap"[\s\S]{0,200}?tabindex="0"[\s\S]{0,60}?role="region"/.test(html), 'vùng cuộn không có tabindex/role trong HTML tĩnh');
  kiemDauRa('Cặp so sánh /so-sanh: Explore VI mục so sánh KHÔNG mang nhãn VI-only', (() => {
    const m = desktop ? desktop.match(/<a\b[^>]*href="\/so-sanh"[^>]*>[\s\S]*?<\/a>/) : null;
    return m !== null && !m[0].includes('Vietnamese only');
  })(), 'thẻ /so-sanh còn nhãn VI-only hoặc thiếu');
  kiemDauRa('Cặp so sánh /so-sanh: không còn "Vietnamese only" trong header hiển thị', !desktop.includes('Vietnamese only'), 'còn mục VI-only trong header');
} else {
  kiemDauRa('Cặp so sánh /so-sanh (dist/so-sanh/index.html)', false, 'thiếu tệp');
}

if (has('/en/compare/index.html')) {
  const html = boComment(read('/en/compare/index.html'));
  const desktop = desktopOf(html);
  const mobile = mobileOf(html);
  const swCount = (html.match(/data-lang-switch="untranslated"/g) ?? []).length;
  // Khuôn hiện hành: chiều EN switcher về VI dùng giá trị bảng không slash cuối
  kiemDauRa('Cặp so sánh /en/compare: bộ chuyển ngôn ngữ là link thẳng về "/so-sanh"', swCount === 0 && /href="\/so-sanh"/.test(html), `count=${swCount}`);
  kiemDauRa('Cặp so sánh /en/compare: hreflang đủ vi "/so-sanh" + en "/en/compare/" + x-default → "/so-sanh" (khuôn getAlternates hiện hành)', () => {
    const vi = /<link rel="alternate" hreflang="vi" href="https:\/\/www\.kienthucdonghoco\.vn\/so-sanh">/.test(html);
    const en = /<link rel="alternate" hreflang="en" href="https:\/\/www\.kienthucdonghoco\.vn\/en\/compare\/">/.test(html);
    const xd = /<link rel="alternate" hreflang="x-default" href="https:\/\/www\.kienthucdonghoco\.vn\/so-sanh">/.test(html);
    return vi && en && xd;
  }, 'cần 3 thẻ link alternate đúng URL');
  kiemDauRa('Cặp so sánh /en/compare: mục Compare desktop aria-current="page" (1)', countCurrent(desktop, '/en/compare/', 'page') === 1, `count=${countCurrent(desktop, '/en/compare/', 'page')}`);
  kiemDauRa('Cặp so sánh /en/compare: mục Compare mobile aria-current="page" (1)', countCurrent(mobile, '/en/compare/', 'page') === 1, `count=${countCurrent(mobile, '/en/compare/', 'page')}`);
  kiemDauRa('Cặp so sánh /en/compare: og:image là og-mau-iconic.jpg', /property="og:image" content="[^"]*\/images\/og\/og-mau-iconic\.jpg"/.test(html), 'og:image không phải og-mau-iconic.jpg');
  kiemDauRa('Cặp so sánh /en/compare: header không còn "Vietnamese only"', !desktop.includes('Vietnamese only'), 'còn mục VI-only trong header');
} else {
  kiemDauRa('Cặp so sánh /en/compare (dist/en/compare/index.html)', false, 'thiếu tệp');
}

// ---- 404: Home không active ----
if (has('/404.html')) {
  const html = read('/404.html');
  const desktop = desktopOf(html);
  const mobile = mobileOf(html);
  const homeCurrent = countAnyCurrent(desktop, '/') + countAnyCurrent(mobile, '/');
  kiemDauRa('404: Trang chủ KHÔNG active chỉ vì pathname bắt đầu bằng "/"', homeCurrent === 0, `count=${homeCurrent}`);
}

// ---- Toàn dist: giá trị aria-current chỉ page|location; nút xổ không aria-current ----
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}
const allHtml = walk(DIST);
let badCurrent = 0;
let btnCurrentAll = 0;
for (const file of allHtml) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/aria-current="([^"]*)"/g)) {
    if (m[1] !== 'page' && m[1] !== 'location') badCurrent += 1;
  }
  btnCurrentAll += (html.match(/<button[^>]*data-dropdown-toggle[^>]*aria-current=/g) ?? []).length;
}
kiemDauRa(`Toàn dist (${allHtml.length} trang): aria-current chỉ nhận "page"/"location"`, badCurrent === 0, `lệch=${badCurrent}`);
kiemDauRa(`Toàn dist: nút nhóm xổ không bao giờ mang aria-current`, btnCurrentAll === 0, `lệch=${btnCurrentAll}`);

// ---- Kết luận ----
const tongDat = results.logic.filter((c) => c.dat).length + dauRa.filter((c) => c.dat).length;
const tongCa = results.logic.length + dauRa.length;
results.tongKet = { tongCa, tongDat, tongLoi: errors.length, dat: errors.length === 0 };
console.log(`  KẾT LUẬN: ${errors.length === 0 ? `ĐẠT — ${tongDat}/${tongCa} ca` : 'KHÔNG ĐẠT:'}`);
for (const e of errors) console.log(`    LỖI  ${e}`);
if (jsonOut) {
  mkdirSync(join(jsonOut, '..'), { recursive: true });
  writeFileSync(jsonOut, JSON.stringify(results, null, 2), 'utf8');
  console.log(`  Đã ghi JSON: ${jsonOut}`);
}
process.exit(errors.length === 0 ? 0 : 1);
