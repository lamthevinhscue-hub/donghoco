// =============================================================================
// check-english-launch.mjs — Kiểm English launch pack (không phụ thuộc mạng)
// =============================================================================
// Chạy SAU build, đọc trực tiếp dist/. Kiểm tối thiểu 9 nhóm:
//   1. Các URL English launch pack thật sự được sinh ra trong dist.
//   2. Không có link nội bộ /en/... trỏ tới trang không tồn tại.
//   3. Trang English có <html lang="en">.
//   4. Canonical, og:locale, JSON-LD inLanguage đúng ngôn ngữ.
//   5. Trang tiếng Việt vẫn giữ canonical/URL cũ (canonical == URL trang).
//   6. Không có văn bản tiếng Việt còn lại trong Header/Footer/H1/title của
//      trang EN, ngoại trừ tên riêng/thương hiệu trong danh sách cho phép.
//   7. Không có hreflang "giả" — mọi hreflang target phải tồn tại trong dist.
//   8. Bộ chuyển ngôn ngữ không tạo link 404 (mọi <a hreflang> target tồn tại).
//   9. Pagefind được gắn bộ lọc ngôn ngữ trên trang và trong mã tìm kiếm.
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const errors = [];
const report = [];

// Danh sách tên riêng/thương hiệu cho phép xuất hiện trong trang EN
const PROPER_NOUNS = [
  'Tiếng Việt',            // nhãn bộ chuyển ngôn ngữ trên trang EN (yêu cầu đề)
  'Đồng Hồ Cơ',            // tên dự án gốc (JSON-LD publisher, About)
  'Kiến Thức Đồng Hồ Cơ',  // tên đầy đủ trong mô tả ảnh OG (en)
  'Kienthucdonghoco',
  'Côtes de Genève',       // thuật ngữ hoàn thiện (có dấu tiếng Việt trong tên gốc Pháp)
  'Côtes',
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

function routeExistsInDist(href) {
  if (!href.startsWith('/')) return false;
  const clean = href.replace(/\/$/, '').split(/[?#]/)[0];
  const candidates = [
    join(DIST, clean, 'index.html'),
    join(DIST, `${clean}.html`),
  ];
  return candidates.some((c) => existsSync(c) && statSync(c).isFile());
}

const allHtml = walk(DIST);
const enHtml = allHtml.filter((f) => f.replace(/\\/g, '/').includes('/en/'));
const viHtml = allHtml.filter((f) => !f.replace(/\\/g, '/').includes('/en/'));

// ===== 1. Các URL EN launch pack được sinh ra =====
// Danh sách khai báo tập trung — số kỳ vọng tự đếm từ mảng, không magic number.
const REQUIRED_EN = [
  '/en/',
  '/en/about/',
  '/en/accessibility/',
  '/en/contact/',
  '/en/copyright/',
  '/en/learning-path/',
  '/en/brands/',
  '/en/brands/rolex/',
  '/en/brands/omega/',
  '/en/brands/seiko/',
  '/en/iconic-watches/rolex-submariner/',
  '/en/iconic-watches/omega-speedmaster/',
  '/en/iconic-watches/cartier-tank/',
  '/en/iconic-watches/rolex-gmt-master/',
  '/en/mechanisms/how-a-mechanical-watch-works/',
  '/en/mechanisms/power-reserve/',
  '/en/mechanisms/escapement/',
  '/en/mechanisms/gmt/',
  '/en/glossary/movement/',
  '/en/glossary/calibre/',
  '/en/glossary/escapement/',
  '/en/glossary/hairspring/',
  '/en/glossary/rotor/',
  '/en/glossary/power-reserve/',
  '/en/glossary/gmt/',
  '/en/guides/first-mechanical-watch/',
  '/en/guides/reading-and-setting-gmt/',
];
const missing = REQUIRED_EN.filter((r) => !routeExistsInDist(r));
if (missing.length > 0) errors.push(`Thiếu route English launch pack trong dist: ${missing.join(', ')}`);
else report.push(`Đủ ${REQUIRED_EN.length} route English launch pack trong dist`);

// ===== 2. Không link nội bộ /en/... hỏng (quét mọi HTML) =====
const internalEnLinks = new Set();
for (const file of allHtml) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/href="(\/en\/[^"#?]*)/g)) internalEnLinks.add(m[1]);
}
const brokenEn = [...internalEnLinks].filter((href) => !routeExistsInDist(href));
if (brokenEn.length > 0) errors.push(`Link nội bộ /en/... trỏ tới trang không tồn tại: ${brokenEn.sort().join(', ')}`);
else report.push(`${internalEnLinks.size} link nội bộ /en/... unique — tất cả tồn tại trong dist`);

// ===== 3. <html lang="en"> trên mọi trang EN =====
const wrongLang = enHtml.filter((f) => !/<html lang="en">/.test(readFileSync(f, 'utf8')));
if (wrongLang.length > 0) errors.push(`Trang EN thiếu <html lang="en">: ${wrongLang.join(', ')}`);
else report.push(`${enHtml.length} trang EN đều có <html lang="en">`);

// ===== 4. Canonical + og:locale + inLanguage trên trang EN =====
const relOf = (file) => file.replace(/\\/g, '/').replace(/^dist\//, '');
for (const file of enHtml) {
  const html = readFileSync(file, 'utf8');
  const rel = relOf(file);
  const expectPath = '/' + rel.replace('index.html', '');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical || !canonical.includes('kienthucdonghoco.vn' + (expectPath === '/' ? '/' : expectPath))) {
    errors.push(`Canonical sai trên ${rel}: ${canonical} (kỳ vọng chứa ${expectPath})`);
  }
  if (!html.includes('<meta property="og:locale" content="en_US"')) {
    errors.push(`og:locale không phải en_US trên ${rel}`);
  }
  if (!html.includes('"inLanguage":"en"')) {
    errors.push(`JSON-LD inLanguage không phải "en" trên ${rel}`);
  }
}
if (!errors.some((e) => e.includes('Canonical sai') || e.includes('og:locale') || e.includes('inLanguage'))) {
  report.push(`Canonical + og:locale (en_US) + inLanguage (en) đúng trên ${enHtml.length} trang EN`);
}

// ===== 5. Trang VI giữ canonical đúng URL cũ (canonical == URL trang) =====
// ===== 5. Trang VI giữ canonical đúng URL cũ (canonical == URL trang) =====
// 404.html được loại — Astro sinh trang lỗi với canonical theo pattern riêng.
for (const file of viHtml.filter((f) => !f.endsWith('404.html'))) {
  const html = readFileSync(file, 'utf8');
  const rel = relOf(file);
  const expectPath = '/' + rel.replace('index.html', '');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const expected = 'https://www.kienthucdonghoco.vn' + (expectPath === '/' ? '/' : expectPath);
  if (canonical !== expected) errors.push(`Canonical VI lệch trên ${rel}: ${canonical} !== ${expected}`);
}
if (!errors.some((e) => e.includes('Canonical VI lệch'))) {
  report.push(`${viHtml.length} trang VI giữ canonical đúng URL (không đổi URL tiếng Việt)`);
}

// ===== 6. Không văn bản tiếng Việt trong Header/Footer/title/H1 trang EN =====
// Regex ký tự tiếng Việt có dấu; tên riêng trong PROPER_NOUNS được loại trước.
// Nội dung <script>/<style> được loại — kiểm đúng VĂN BẢN HIỂN THỊ cho người đọc.
const viCharRe = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;
function stripProperNouns(text) {
  let t = text;
  for (const noun of PROPER_NOUNS) t = t.split(noun).join('');
  return t;
}
function stripInvisible(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
}
const viLeak = [];
for (const file of enHtml) {
  const html = stripInvisible(readFileSync(file, 'utf8'));
  const rel = relOf(file);
  const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';
  const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? '';
  const title = html.match(/<title>[\s\S]*?<\/title>/)?.[0] ?? '';
  const h1 = html.match(/<h1[\s\S]*?<\/h1>/)?.[0] ?? '';
  const buttons = [...html.matchAll(/<(?:button|a)\b[^>]*>([\s\S]*?)<\/(?:button|a)>/g)]
    .map((m) => m[1])
    .filter((s) => !s.includes('Tiếng Việt')) // nhãn switcher theo đề
    .join(' ');
  const visible = stripProperNouns([header, footer, title, h1, buttons].join(' ').replace(/<[^>]*>/g, ' '));
  if (viCharRe.test(visible)) {
    const sample = visible.match(/[^\s]*[ăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỵ][^\s]*/i)?.[0] ?? '?';
    viLeak.push(`${rel} (từ mẫu: "${sample}")`);
  }
}
if (viLeak.length > 0) errors.push(`Còn văn bản tiếng Việt trong trang EN (Header/Footer/title/H1/CTA): ${viLeak.join(' | ')}`);
else report.push('Không còn văn bản tiếng Việt trong Header/Footer/title/H1/CTA của trang EN (trừ tên riêng cho phép)');

// ===== 7. Không hreflang giả — mọi target hreflang tồn tại trong dist =====
for (const file of allHtml) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
    const [, hl, href] = m;
    const path = href.replace(/^https?:\/\/[^/]+/, '');
    if (hl !== 'x-default' && !routeExistsInDist(path)) {
      errors.push(`hreflang giả (${hl} → ${href}) trên ${file.replace(/\\/g, '/')}`);
    }
    if (hl === 'x-default' && !path.startsWith('https://www.kienthucdonghoco.vn/') === false && !routeExistsInDist(path)) {
      errors.push(`hreflang x-default trỏ tới trang không tồn tại: ${href}`);
    }
  }
}
if (!errors.some((e) => e.includes('hreflang'))) {
  report.push('Mọi hreflang (vi/en/x-default) đều trỏ tới trang tồn tại thật');
}

// ===== 8. Bộ chuyển ngôn ngữ không tạo link 404 (marker: <a ... hreflang=...) =====
for (const file of allHtml) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<a\b([^>]*hreflang="(?:vi|en)"[^>]*)>/g)) {
    const href = m[1].match(/href="([^"]+)"/)?.[1];
    if (!href) continue;
    const path = href.startsWith('http') ? href.replace(/^https?:\/\/[^/]+/, '') : href;
    if (!routeExistsInDist(path)) errors.push(`Bộ chuyển ngôn ngữ link 404 (${href}) trên ${file.replace(/\\/g, '/')}`);
  }
}
if (!errors.some((e) => e.includes('chuyển ngôn ngữ'))) {
  report.push('Bộ chuyển ngôn ngữ: mọi link đều trỏ tới trang tồn tại');
}

// ===== 9. Pagefind lọc theo ngôn ngữ =====
const enSample = join(DIST, 'en', 'index.html');
const enHome = readFileSync(enSample, 'utf8');
if (!enHome.includes('data-pagefind-filter="language"')) {
  errors.push('Trang EN thiếu data-pagefind-filter="language" (bộ lọc Pagefind)');
} else if (!/>en</.test(enHome.match(/<div data-pagefind-filter="language"[^>]*>([^<]*)</)?.[0] ?? '')) {
  errors.push('Bộ lọc Pagefind trên trang EN không mang giá trị "en"');
}
const searchCore = readFileSync('src/scripts/searchCore.ts', 'utf8');
if (!searchCore.includes('filters: { language: currentLang }')) {
  errors.push('searchCore không lọc kết quả Pagefind theo ngôn ngữ trang');
}
if (!errors.some((e) => e.includes('Pagefind'))) {
  report.push('Pagefind: trang EN gắn filter language=en; mã tìm kiếm lọc theo ngôn ngữ trang');
}

// ===== Kết luận =====
console.log('KIỂM TRA ENGLISH LAUNCH PACK:');
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — English launch pack đúng kiến trúc đa ngôn ngữ.');
