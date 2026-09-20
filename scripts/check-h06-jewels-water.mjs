#!/usr/bin/env node
// =============================================================================
// check-h06-jewels-water.mjs — kiểm tra gói H06 (chân kính + chống nước)
// =============================================================================
// R1  Tệp nguồn tồn tại + cặp route trong contentRoutes + custom_slug EN
// R2  Dist tồn tại cho 6 route (2 chân kính + 4 chống nước)
// R3  Cấm suy luận từ số chân kính (source + dist, VI + EN): mọi câu khẳng định
//     "nhiều/khác chân kính ⇒ chất lượng/chính xác/bền/giá trị" không kèm phủ định
//     đều lỗi. Câu trích trong ngoặc kép được bóc trước khi quét (myth dẫn lại
//     kèm bác thì hợp lệ); câu hỏi được bỏ qua.
// R4  Chống nước: R4a — 4 bài đều còn phát biểu "không có bảng dùng chung";
//     R4b — cấm câu quy đổi BAR/mét → hoạt động KHÔNG kèm attribution hãng/nguồn
//     (câu hỏi và câu phủ định được bỏ qua).
// R5  Nguồn: 2 bài chân kính đúng 3 URL FHH; 4 bài nước giữ đủ 4 URL đã có; HTTPS.
// R6  Dist chất lượng trang chân kính: H1 đúng ngôn ngữ, canonical, hreflang hai
//     chiều, switcher EN→VI, EN không rò tiếng Việt (loại nhãn "Tiếng Việt").
// R7  Liên kết nội bộ trong 2 bài chân kính: đúng ngôn ngữ + đích tồn tại.
// R8  Câu Omega "heavy impacts": cấm dáng trích sai (liệt kê crown/pushers/valve);
//     câu đúng nguyên văn phải có ở cả VI + EN.
// R9  EOF newline cho 6 tệp nội dung + contentRoutes.ts.
// Trả exit 1 nếu có lỗi; in báo cáo + JSON tóm tắt khi quét xong.
// =============================================================================

import fs from 'node:fs';
import path from 'path';

const root = process.cwd();
const errors = [];
const report = [];

const FILES = {
  jewelVi: 'src/content/tuDien/vi/chan-kinh.md',
  jewelEn: 'src/content/tuDien/en/jewel.md',
  waterCoVi: 'src/content/coChe/vi/chong-nuoc.md',
  waterCoEn: 'src/content/coChe/en/water-resistance.md',
  waterHdVi: 'src/content/huongDan/vi/muc-chong-nuoc.md',
  waterHdEn: 'src/content/huongDan/en/water-resistance.md',
  routes: 'src/i18n/contentRoutes.ts',
};

const DIST = {
  jewelVi: 'dist/tu-dien/chan-kinh/index.html',
  jewelEn: 'dist/en/glossary/jewel/index.html',
  waterCoVi: 'dist/co-che/chong-nuoc/index.html',
  waterCoEn: 'dist/en/mechanisms/water-resistance/index.html',
  waterHdVi: 'dist/huong-dan/muc-chong-nuoc/index.html',
  waterHdEn: 'dist/en/guides/water-resistance/index.html',
};

const FHH_JEWELS = 'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/jewels';
const FHH_STONE = 'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/stone';
const FHH_GLOSS = 'https://www.hautehorlogerie.org/en/watches-and-culture/encyclopaedia/glossary-of-watchmaking/s/jewel-1/';
const WATER_SOURCES_CO = [
  'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/water-resistance',
  'https://www.omegawatches.com/en-us/customer-service/faq/using-your-omega-watch',
  'https://www.seikowatches.com/us-en/customerservice/faq/general-information-8',
  'https://www.iso.org/standard/45334.html',
];
// Hai bài huongDan từ trước nay dùng 3 nguồn (không FHH) — tầng FHH thuộc coChe.
const WATER_SOURCES_HD = WATER_SOURCES_CO.slice(1);

function fail(r, f, msg) {
  errors.push(`[${r}] ${f}: ${msg}`);
}

function read(rel) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, 'utf8');
}

function bodyNoFm(text) {
  const m = text.match(/^---\r?\n[\s\S]*?\r?\n---/);
  return m ? text.slice(m[0].length) : text;
}

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function htmlToText(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  ).replace(/\s+/g, ' ');
}

/** Bóc ngoặc kép (thẳng + cong), bỏ đậm markdown, tách câu. */
function sentences(text) {
  return text
    .replace(/"[^"\n]*"|“[^”\n]*”|‘[^’\n]*’|'[^'\n]*'/g, ' "" ')
    .replace(/^#{1,6}\s.*$/gm, ' ')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function hasNegationVi(s) {
  return /không\b|chưa\b|đừng\b/i.test(s);
}
function hasNegationEn(s) {
  return /\bnot\b|\bno\b|\bnever\b|\bwithout\b/i.test(s);
}

// --- R1: nguồn + route pair + custom_slug ---------------------------------
for (const key of Object.keys(FILES)) {
  if (!read(FILES[key])) fail('R1', FILES[key], 'tệp không tồn tại');
}
const routesText = read(FILES.routes) || '';
const routePairOk =
  routesText.includes("{ vi: '/tu-dien/chan-kinh', en: '/en/glossary/jewel/' }");
if (!routePairOk) {
  fail('R1', FILES.routes, "thiếu cặp { vi: '/tu-dien/chan-kinh', en: '/en/glossary/jewel/' }");
}
const jewelEnRaw = read(FILES.jewelEn) || '';
if (!/^custom_slug:\s*"jewel"\s*$/m.test(jewelEnRaw)) {
  fail('R1', FILES.jewelEn, 'thiếu custom_slug: "jewel"');
}
report.push(`R1: 7 tệp nguồn + cặp route + custom_slug ${errors.some((e) => e.includes('[R1]')) ? 'LỖI' : 'ĐẠT'}`);

// --- R2: dist tồn tại ------------------------------------------------------
for (const key of Object.keys(DIST)) {
  if (!read(DIST[key])) fail('R2', DIST[key], 'dist không tồn tại (cần npm run build trước)');
}
report.push(`R2: 6 route dist ${errors.some((e) => e.includes('[R2]')) ? 'LỖI' : 'ĐẠT'}`);

// --- R3: cấm suy luận từ số chân kính --------------------------------------
const JEWEL_RANK_PATTERNS = [
  {
    id: 'H06-R3-V1',
    lang: 'vi',
    re: /chân kính[^.?!]{0,120}(nghĩa là|cho biết|chứng tỏ|chứng minh|đồng nghĩa)[^.?!]{0,120}(chất lượng|tốt|xịn|chính xác|bền|giá trị)/i,
    neg: hasNegationVi,
  },
  {
    id: 'H06-R3-V2',
    lang: 'vi',
    re: /\d+\s*chân kính[^.?!]{0,120}(tốt hơn|xịn hơn|cao cấp hơn|chính xác hơn|bền hơn|giá trị hơn|chất lượng hơn|chất lượng cao hơn)/i,
    neg: hasNegationVi,
  },
  {
    id: 'H06-R3-V3',
    lang: 'vi',
    re: /(thang|thước)\s*(đo\s*)?(chất lượng|đẳng cấp|phân hạng|xếp hạng)/i,
    neg: hasNegationVi,
  },
  {
    id: 'H06-R3-E1',
    lang: 'en',
    re: /(more|higher)\s+jewels?[^.?!]{0,120}\b(mean|means|better|higher quality|more accurate|superior|more durable)\b/i,
    neg: hasNegationEn,
  },
  {
    id: 'H06-R3-E2',
    lang: 'en',
    re: /\d+[\s-]+jewels?[^.?!]{0,120}\b(better|superior|more accurate|higher quality|more durable|higher-grade)\b/i,
    neg: hasNegationEn,
  },
  {
    id: 'H06-R3-E3',
    lang: 'en',
    re: /(quality|ranking|grade)\s+scale/i,
    neg: hasNegationEn,
  },
];

function scanJewelRank(rel, text) {
  for (const p of JEWEL_RANK_PATTERNS) {
    for (const s of sentences(text)) {
      if (!p.re.test(s)) continue;
      if (s.endsWith('?')) continue;
      if (p.neg(s)) continue;
      fail('R3', rel, `${p.id}: câu suy chất lượng từ số chân kính: "${s.slice(0, 140)}"`);
    }
  }
}
scanJewelRank(FILES.jewelVi, bodyNoFm(read(FILES.jewelVi) || ''));
scanJewelRank(FILES.jewelEn, bodyNoFm(read(FILES.jewelEn) || ''));
scanJewelRank(DIST.jewelVi, htmlToText(read(DIST.jewelVi) || ''));
scanJewelRank(DIST.jewelEn, htmlToText(read(DIST.jewelEn) || ''));
report.push(`R3: suy luận chân kính (4 nguồn/dist × ${JEWEL_RANK_PATTERNS.length} mẫu) ${errors.some((e) => e.includes('[R3]')) ? 'LỖI' : 'ĐẠT'}`);

// --- R4: chống nước --------------------------------------------------------
const WATER_PAIRS = [
  { src: FILES.waterCoVi, dist: DIST.waterCoVi, lang: 'vi' },
  { src: FILES.waterCoEn, dist: DIST.waterCoEn, lang: 'en' },
  { src: FILES.waterHdVi, dist: DIST.waterHdVi, lang: 'vi' },
  { src: FILES.waterHdEn, dist: DIST.waterHdEn, lang: 'en' },
];

for (const { src, lang } of WATER_PAIRS) {
  const text = read(src) || '';
  const ok =
    lang === 'vi'
      ? /không có (một )?bảng/i.test(text)
      : /no shared table|no table converts/i.test(text);
  if (!ok) fail('R4', src, 'thiếu phát biểu "không có bảng dùng chung"');
}

const WATER_FIGURE = /\b\d[\d.,]*\s*(bar|atm|m|mét|met|metre|meter|meters)\b/i;
const WATER_ACTIVITY = /tắm|bơi|lặn|shower|swim|div/i;
const WATER_ATTRIBUTION = /seiko|omega|fhh|hãng|maker|manual|nihs|iso|công bố|manufacturer|the maker/i;
const WATER_NEGATION = /không (khẳng định|nghĩa|có nghĩa|suy|trả lời|tự động)|not (mean|automatically|guaranteed|asserted)|cannot be asserted|no universal answer/i;

function scanWaterGeneral(rel, text) {
  for (const s of sentences(text)) {
    const t = s.trim();
    if (!WATER_FIGURE.test(t) || !WATER_ACTIVITY.test(t)) continue;
    if (t.endsWith('?')) continue;
    if (WATER_ATTRIBUTION.test(t)) continue;
    if (WATER_NEGATION.test(t)) continue;
    fail('R4', rel, `quy đổi nước chung không attribution: "${t.slice(0, 140)}"`);
  }
}
for (const { src, dist } of WATER_PAIRS) {
  scanWaterGeneral(src, bodyNoFm(read(src) || ''));
  scanWaterGeneral(dist, htmlToText(read(dist) || ''));
}
report.push(`R4: bảng dùng chung + quy đổi không attribution (4 bài × source/dist) ${errors.some((e) => e.includes('[R4]')) ? 'LỖI' : 'ĐẠT'}`);

// --- R5: nguồn -------------------------------------------------------------
function sourcesOf(md) {
  const urls = [];
  for (const m of md.matchAll(/^ {2}- label:.*\r?\n {4}url:\s*"?([^"\s]+)"?\s*$/gm)) urls.push(m[1]);
  return urls;
}
for (const key of ['jewelVi', 'jewelEn']) {
  const md = read(FILES[key]) || '';
  const urls = sourcesOf(md);
  const want = [FHH_JEWELS, FHH_STONE, FHH_GLOSS].sort().join('\n');
  const got = [...urls].sort().join('\n');
  if (got !== want) fail('R5', FILES[key], `nguồn phải đúng 3 URL FHH jewels/stone/glossary, thấy: ${urls.length} URL`);
}
for (const [key, want] of [
  ['waterCoVi', WATER_SOURCES_CO],
  ['waterCoEn', WATER_SOURCES_CO],
  ['waterHdVi', WATER_SOURCES_HD],
  ['waterHdEn', WATER_SOURCES_HD],
]) {
  const md = read(FILES[key]) || '';
  const urls = sourcesOf(md);
  for (const u of want) {
    if (!urls.includes(u)) fail('R5', FILES[key], `mất nguồn ${u}`);
  }
}
for (const key of Object.keys(FILES).filter((k) => k !== 'routes')) {
  const md = read(FILES[key]) || '';
  for (const m of md.matchAll(/url:\s*"?([^"\s]+)"?/g)) {
    if (!m[1].startsWith('https://')) fail('R5', FILES[key], `nguồn không HTTPS: ${m[1]}`);
  }
}
report.push(`R5: nguồn 6 bài (3 FHH jewel + 4 nguồn nước + HTTPS) ${errors.some((e) => e.includes('[R5]')) ? 'LỖI' : 'ĐẠT'}`);

// --- R6: dist chất lượng trang chân kính ------------------------------------
const CANON_BASE = 'https://www.kienthucdonghoco.vn';
function h1Of(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return m ? decodeEntities(m[1].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim() : null;
}
function canonicalOf(html) {
  const m = html.match(/<link rel="canonical" href="([^"]+)">/i);
  return m ? m[1] : null;
}
function hreflangMap(html) {
  const map = {};
  for (const m of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/gi)) {
    map[m[1]] = m[2];
  }
  return map;
}

const jewelEnHtml = read(DIST.jewelEn) || '';
const h1En = h1Of(jewelEnHtml);
if (h1En !== 'Jewel') fail('R6', DIST.jewelEn, `H1 phải đúng "Jewel", thấy "${h1En}"`);
if (canonicalOf(jewelEnHtml) !== `${CANON_BASE}/en/glossary/jewel/`) {
  fail('R6', DIST.jewelEn, `canonical sai: ${canonicalOf(jewelEnHtml)}`);
}
const hfEn = hreflangMap(jewelEnHtml);
if (hfEn.vi !== `${CANON_BASE}/tu-dien/chan-kinh`) fail('R6', DIST.jewelEn, `hreflang vi sai: ${hfEn.vi}`);
if (hfEn.en !== `${CANON_BASE}/en/glossary/jewel/`) fail('R6', DIST.jewelEn, `hreflang en sai: ${hfEn.en}`);
if (!/<a href="\/tu-dien\/chan-kinh"/.test(jewelEnHtml)) {
  fail('R6', DIST.jewelEn, 'thiếu switcher EN→VI (a href="/tu-dien/chan-kinh")');
}
const jewelViHtml = read(DIST.jewelVi) || '';
const h1Vi = h1Of(jewelViHtml);
if (h1Vi !== 'Chân kính') fail('R6', DIST.jewelVi, `H1 phải đúng "Chân kính", thấy "${h1Vi}"`);
if (!(canonicalOf(jewelViHtml) || '').includes('/tu-dien/chan-kinh')) {
  fail('R6', DIST.jewelVi, `canonical sai: ${canonicalOf(jewelViHtml)}`);
}
const hfVi = hreflangMap(jewelViHtml);
if (hfVi.en !== `${CANON_BASE}/en/glossary/jewel/`) fail('R6', DIST.jewelVi, `hreflang en sai: ${hfVi.en}`);
if (!hfVi.vi) fail('R6', DIST.jewelVi, 'thiếu hreflang vi');

// Rò tiếng Việt trên trang EN: bóc nhãn "Tiếng Việt" (switcher) rồi quét dấu.
const enText = htmlToText(jewelEnHtml).replace(/tiếng việt/gi, ' ');
const viLeak = enText.match(/[\u0102\u0103\u0110\u0111\u01A0\u01A1\u01AF\u01B0\u1EA0-\u1EF9\u00C0-\u00DD\u00E0-\u00FD]/g);
if (viLeak) {
  const ctx = enText.match(/.{0,60}[\u0102\u0103\u0110\u0111\u01A0\u01A1\u01AF\u01B0\u1EA0-\u1EF9][^ ]* ?.{0,40}/i);
  fail('R6', DIST.jewelEn, `rò ký tự tiếng Việt (${viLeak.length}): "${ctx ? ctx[0] : '?'}"`);
}
report.push(`R6: H1/canonical/hreflang/switcher/rò VI ${errors.some((e) => e.includes('[R6]')) ? 'LỖI' : 'ĐẠT'}`);

// --- R7: liên kết nội bộ 2 bài chân kính ------------------------------------
function checkLinks(mdPath, lang) {
  const md = read(mdPath) || '';
  for (const m of md.matchAll(/\]\((\/[^)#\s]+)\)/g)) {
    const href = m[1];
    if (lang === 'vi' && href.startsWith('/en/')) fail('R7', mdPath, `bài VI trỏ route EN: ${href}`);
    if (lang === 'en' && !href.startsWith('/en/')) fail('R7', mdPath, `bài EN trỏ route VI: ${href}`);
    const rel = `dist${href.replace(/\/$/, '')}/index.html`;
    if (!read(rel)) fail('R7', mdPath, `đích không tồn tại trong dist: ${href}`);
  }
}
checkLinks(FILES.jewelVi, 'vi');
checkLinks(FILES.jewelEn, 'en');
report.push(`R7: liên kết nội bộ chân kính ${errors.some((e) => e.includes('[R7]')) ? 'LỖI' : 'ĐẠT'}`);

// --- R8: câu Omega va chạm ---------------------------------------------------
const MISQUOTE = /heavy impacts[^.!?]{0,80}on the crown, pushers or helium valve/i;
const ACCURATE = /heavy impacts are known to affect the water resistance and should be avoided/i;
for (const key of ['waterHdVi', 'waterHdEn']) {
  const src = (read(FILES[key]) || '').replace(/\*\*/g, '');
  const dist = htmlToText(read(DIST[key]) || '');
  if (MISQUOTE.test(src)) fail('R8', FILES[key], 'vẫn còn trích sai "heavy impacts on the crown, pushers or helium valve"');
  if (MISQUOTE.test(dist)) fail('R8', DIST[key], 'dist vẫn còn trích sai câu heavy impacts');
  if (!ACCURATE.test(src)) fail('R8', FILES[key], 'thiếu câu Omega đúng nguyên văn "heavy impacts are known to affect the water resistance and should be avoided"');
}
report.push(`R8: câu Omega va chạm (VI+EN, source+dist) ${errors.some((e) => e.includes('[R8]')) ? 'LỖI' : 'ĐẠT'}`);

// --- R9: EOF newline ---------------------------------------------------------
for (const key of Object.keys(FILES)) {
  const text = read(FILES[key]);
  if (text && !/\n$/.test(text)) fail('R9', FILES[key], 'thiếu newline cuối tệp');
}
report.push(`R9: EOF newline ${errors.some((e) => e.includes('[R9]')) ? 'LỖI' : 'ĐẠT'}`);

// --- Kết ---------------------------------------------------------------------
if (errors.length) {
  console.error(`H06 checker: ${errors.length} lỗi`);
  for (const e of errors) console.error('  ' + e);
  console.log(JSON.stringify({ tongLoi: errors.length }, null, 2));
  process.exit(1);
}
console.log('H06 checker: ĐẠT — ' + report.join(' | '));
console.log(JSON.stringify({ tongLoi: 0, soRule: 9 }, null, 2));
