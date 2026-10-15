// A4 — checker mô tả trang chủ VI/EN (v2 theo tái nghiệm thu TXN-20261015-37).
// Nguồn: tách frontmatter/markup của .astro — frontmatter bóc chú thích JS, markup bóc chú thích
//   HTML; prop CHỈ tính trong markup có hiệu lực (chú thích/frontmatter/chuỗi không tính).
// Dist: đọc DOM thật bằng parse5 (có sẵn trong node_modules) — chỉ phần tử <meta> trong <head> tính;
//   meta trong script/body/chú thích không tính. N3/N4 cùng cách đọc.
// N1: hai khóa home_meta_description + siteTagline VI/EN đúng nguyên văn trong khối vi:/en: tương ứng.
// N2: hai trang chủ truyền đúng 1 lần meta_description={tr.home_meta_description}; không trang khác dùng.
// N3: hai trang chủ dist có đúng 1 meta description, giá trị đúng nguyên văn sau giải mã entity, theo thuộc tính.
// N4: không trang nào khác trong dist nhận nhầm hai câu mới.
// Tham số lạ/thiếu giá trị → exit 1 mã A4-ARG.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parse5Parse } from 'parse5';

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const rawArgs = process.argv.slice(2);
let root = REPO;
let distDir = null;
for (let i = 0; i < rawArgs.length; i++) {
  const a = rawArgs[i];
  if (a === '--root' || a === '--dist') {
    const v = rawArgs[i + 1];
    if (v == null || v.startsWith('--')) { console.error(`KHONG DAT A4-ARG: ${a} thiếu giá trị`); process.exit(1); }
    if (a === '--root') root = resolve(v); else distDir = resolve(v);
    i++;
  } else { console.error(`KHONG DAT A4-ARG: tham số không hợp lệ "${a}" (dùng --root/--dist kèm giá trị)`); process.exit(1); }
}

const CAU_VI = 'Kiến thức đồng hồ cơ bằng tiếng Việt: bộ máy hoạt động ra sao, lịch sử, thương hiệu và mẫu tiêu biểu, giải thích dễ hiểu và có dẫn nguồn.';
const CAU_EN = 'Mechanical watch knowledge in Vietnamese and English: how movements work, watch history, brands and iconic models, explained clearly with sources.';
const TAGLINE_VI = 'Nền tảng nội dung tiếng Việt chuyên sâu về đồng hồ cơ';
const TAGLINE_EN = 'A practical, source-led guide to mechanical watches — from first principles to collecting.';

const loi = [];
const fail = (rule, msg) => loi.push(`${rule}: ${msg}`);

function boChuThichJs(s) {
  let out = '', i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === "'" || c === '"' || c === '`') {
      const kyTu = c; let j = i + 1;
      while (j < s.length) {
        if (s[j] === '\\') { j += 2; continue; }
        if (s[j] === kyTu) { j++; break; }
        j++;
      }
      out += s.slice(i, j); i = j; continue;
    }
    if (c === '/' && s[i + 1] === '*') { const ket = s.indexOf('*/', i + 2); i = ket === -1 ? s.length : ket + 2; continue; }
    if (c === '/' && s[i + 1] === '/') { const ket = s.indexOf('\n', i); i = ket === -1 ? s.length : ket; continue; }
    out += c; i++;
  }
  return out;
}
function boChuThichHtml(s) { return s.replace(/<!--[\s\S]*?-->/g, ' '); }

// tách tệp .astro: frontmatter (giữa hai dòng --- đầu) và markup (phần sau)
function tachAstro(s) {
  const dau = s.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!dau) return { frontmatter: '', markup: s };
  return { frontmatter: dau[1], markup: s.slice(dau[0].length) };
}

// ---- N1: ui.ts hai khóa đúng nguyên văn theo khối vi:/en: ----
const uiPath = join(root, 'src', 'i18n', 'ui.ts');
if (!existsSync(uiPath)) fail('A4-N1', `thiếu ${uiPath}`);
else {
  const ui = boChuThichJs(readFileSync(uiPath, 'utf8'));
  const mocEn = ui.indexOf('  en: {');
  if (mocEn === -1) fail('A4-N1', 'không tìm thấy khối en: trong ui.ts');
  const khoiVi = mocEn === -1 ? ui : ui.slice(0, mocEn);
  const khoiEn = mocEn === -1 ? '' : ui.slice(mocEn);
  for (const [ten, khoa, dung, khoi] of [
    ['home_meta_description VI', 'home_meta_description', CAU_VI, khoiVi],
    ['home_meta_description EN', 'home_meta_description', CAU_EN, khoiEn],
    ['siteTagline VI', 'siteTagline', TAGLINE_VI, khoiVi],
    ['siteTagline EN', 'siteTagline', TAGLINE_EN, khoiEn],
  ]) {
    const re = new RegExp(`${khoa}:\\s*'((?:[^'\\\\]|\\\\.)*)'`);
    const m = khoi.match(re);
    if (!m) fail('A4-N1', `không tìm thấy ${ten}`);
    else {
      const giaTri = m[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
      if (giaTri !== dung) fail('A4-N1', `${ten} lệch nguyên văn:\n  nhận: ${giaTri}\n  kỳ vọng: ${dung}`);
    }
  }
}

// ---- N2: hai trang chủ truyền prop trong MARKUP có hiệu lực; không trang khác ----
const haiTrang = [
  { file: join(root, 'src', 'pages', 'index.astro'), ten: 'src/pages/index.astro' },
  { file: join(root, 'src', 'pages', 'en', 'index.astro'), ten: 'src/pages/en/index.astro' },
];
for (const t of haiTrang) {
  if (!existsSync(t.file)) { fail('A4-N2', `thiếu ${t.ten}`); continue; }
  const { markup } = tachAstro(readFileSync(t.file, 'utf8'));
  const markupSach = boChuThichHtml(markup);
  const soLan = (markupSach.match(/<BaseLayout\s+meta_description=\{tr\.home_meta_description\}>/g) ?? []).length;
  if (soLan !== 1) fail('A4-N2', `${t.ten} phải truyền đúng 1 lần meta_description={tr.home_meta_description} trong markup có hiệu lực (thấy ${soLan})`);
}
function quetTrang(dir, cb) {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) quetTrang(p, cb);
    else if (f.name.endsWith('.astro')) cb(p, boChuThichHtml(tachAstro(readFileSync(p, 'utf8')).markup), boChuThichJs(tachAstro(readFileSync(p, 'utf8')).frontmatter));
  }
}
quetTrang(join(root, 'src', 'pages'), (p, markup, frontmatter) => {
  const laHaiTrang = haiTrang.some((t) => t.file === p);
  if (laHaiTrang) return;
  if (/meta_description/.test(markup) || /meta_description/.test(frontmatter)) {
    fail('A4-N2', `trang khác dùng prop ghi đè: ${p}`);
  }
});

// ---- N3/N4 dist: DOM thật bằng parse5 — chỉ meta element trong <head> tính ----
function giaiMaEntity(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&#x27;/gi, '&');
}
function metaDescriptionTrongHead(duongTep) {
  // trả { so_the, gia_tri } — chỉ phần tử meta name="description" là con trực tiếp/gián tiếp của <head>
  const dom = parse5Parse(readFileSync(duongTep, 'utf8'));
  const htmlNode = dom.childNodes.find((n) => n.nodeName === 'html');
  const headNode = htmlNode?.childNodes.find((n) => n.nodeName === 'head');
  if (!headNode) return { so_the: 0, gia_tri: null };
  const thes = [];
  const duyet = (node) => {
    for (const con of node.childNodes ?? []) {
      if (con.nodeName === 'meta') {
        const attrs = Object.fromEntries((con.attrs ?? []).map((a) => [a.name, a.value]));
        if (attrs.name === 'description') thes.push(attrs.content ?? null);
      }
      // KHÔNG duyệt vào <script>/<template> — chuỗi meta trong dữ liệu không tính
      if (con.nodeName !== 'script' && con.nodeName !== 'template') duyet(con);
    }
  };
  duyet(headNode);
  return { so_the: thes.length, gia_tri: thes.length === 1 ? thes[0] : null };
}

if (distDir != null) {
  for (const [ten, duong] of [['dist/index.html', join(distDir, 'index.html')], ['dist/en/index.html', join(distDir, 'en', 'index.html')]]) {
    if (!existsSync(duong)) { fail('A4-N3', `thiếu ${duong}`); continue; }
    const { so_the, gia_tri } = metaDescriptionTrongHead(duong);
    if (so_the !== 1) { fail('A4-N3', `${ten} phải có đúng 1 meta name="description" trong head DOM (thấy ${so_the})`); continue; }
    const dung = ten === 'dist/index.html' ? CAU_VI : CAU_EN;
    if (giaiMaEntity(gia_tri) !== dung) fail('A4-N3', `${ten} meta description lệch nguyên văn:\n  nhận: ${giaiMaEntity(gia_tri)}\n  kỳ vọng: ${dung}`);
  }
  // N4: mọi trang .html khác — meta description (DOM) không được bằng hai câu mới
  const quet = (dir, tienToDuong) => {
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, f.name);
      const duongTuongDoi = tienToDuong + '/' + f.name;
      if (f.isDirectory()) quet(p, duongTuongDoi);
      else if (f.name.endsWith('.html')) {
        const laHaiTrang = duongTuongDoi === '/index.html' || duongTuongDoi === '/en/index.html';
        if (laHaiTrang) continue;
        const { gia_tri } = metaDescriptionTrongHead(p);
        if (gia_tri === CAU_VI || gia_tri === CAU_EN) fail('A4-N4', `trang ngoài hai trang chủ nhận nhầm câu mới: ${duongTuongDoi}`);
      }
    }
  };
  quet(distDir, '');
}

if (loi.length) {
  console.error(`KHONG DAT bo kiem A4 (${loi.length} loi):`);
  for (const l of loi) console.error('  ' + l);
  process.exit(1);
}
console.log(`DAT bo kiem A4: hai khóa nguyên văn + hai trang chủ truyền prop trong markup + siteTagline giữ nguyên${distDir != null ? ' + dist DOM meta description đúng nguyên văn (head thật, không tính script/chú thích)' : ''}`);
