#!/usr/bin/env node
// =============================================================================
// check-h14-production-chain.mjs (H14-B, TXN kế Đợt 3 sau H01–H14) — kiểm cụm
// ba bài song ngữ "nghề chế tác và chuỗi sản xuất" (manufacture/établisseur,
// ébauche, ETA/Sellita).
//
// Cách chạy: node scripts/check-h14-production-chain.mjs [dist]
//   dist: thư mục build (tùy chọn; chuỗi build truyền `dist`) — có thì chạy R6.
//   Root cây cần kiểm đặt qua biến môi trường H14B_ROOT (mặc định cwd) — dùng
//   cho mutation ngoài cây repo; root luôn là cwd như các checker gói trước.
//
// R1 — Đúng 6 tệp; ARTICLE_PAIRS chứa đúng 3 cặp; tệp EN không có liên kết
//      nội bộ trỏ route VI (markdown lẫn raw href/đường dẫn trong dấu nháy).
// R2 — Frontmatter bắt buộc (title, excerpt, category, difficulty, date,
//      draft:false, sources); liên kết chéo bắt buộc cùng ngôn ngữ.
// R3 — Mỗi bài đủ nguồn chuẩn theo ALLOWLIST từng bài (URL HTTPS lạ cũng
//      fail); cấm URL chưa phép (bản EN eta.ch 404, swatchgroup.com) và URL
//      không-HTTPS.
// R4 — Chặn claim cấm về chất lượng/xếp hạng/đầu tư/khuyến nghị và cụm tuyệt
//      đối không nguồn (theo 6 tệp của cụm; câu quote nguồn "always without"
//      không bị chặn).
// R5 — Chặn định nghĩa ébauche đứng trong bài ETA/Sellita (claim đó thuộc
//      nguồn FHH); chặn suy diễn vai trò Sellita ngoài công bố.
// R6 — dist: 6 route tồn tại; h1 khớp title theo ngôn ngữ; h1 EN không rò
//      ký tự tiếng Việt; canonical + hreflang vi/en + liên kết chuyển ngôn
//      ngữ đúng cặp route trên từng trang.
// Tất cả ca lỗi → exit 1.
// =============================================================================
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.env.H14B_ROOT ?? process.cwd());
const DIST = process.argv[2] ? path.resolve(process.argv[2]) : null;

const BAI = [
  { slug: 'manufacture-etablisseur', tenEn: 'manufacture-etablisseur', viPath: '/co-che/manufacture-etablisseur', enPath: '/en/mechanisms/manufacture-etablisseur/' },
  { slug: 'ebauche-chuoi-cung-ung', tenEn: 'ebauche-supply-chain', viPath: '/co-che/ebauche-chuoi-cung-ung', enPath: '/en/mechanisms/ebauche-supply-chain/' },
  { slug: 'eta-sellita', tenEn: 'eta-sellita', viPath: '/co-che/eta-sellita', enPath: '/en/mechanisms/eta-sellita/' },
];

// R3 — allowlist URL theo từng bài: mọi URL nguồn phải thuộc đúng tập nguồn
// đã tái kiểm 25/09 (hồ sơ output/h14-b-production-chain/ho-so-nguon.md);
// URL HTTPS lạ cũng fail, không chỉ URL http.
const URL_FHH_MAN = 'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/manufacture';
const URL_FHH_EBA = 'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/ebauche';
const URL_FHH_ETB = 'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/etablisseur';
const URL_ETA = 'https://www.eta.ch/fr/entreprise/histoire';
const URL_SEL = 'https://www.sellita.ch';
const ALLOWLIST = {
  'manufacture-etablisseur': [URL_FHH_MAN, URL_FHH_ETB],
  'ebauche-chuoi-cung-ung': [URL_FHH_EBA, URL_FHH_ETB, URL_ETA],
  'eta-sellita': [URL_ETA, URL_SEL],
};
const URL_CAM = ['https://www.eta.ch/en/', 'swatchgroup.com'];
const CAM_CHUNG_VI = ['tốt hơn', 'kém hơn', 'chất lượng cao', 'chất lượng thấp', 'bền hơn', 'chính xác hơn', 'đầu tư', 'giữ giá', 'xếp hạng', 'khuyến nghị', 'đáng mua', 'nên mua', 'mọi hãng', 'tất cả các hãng', 'hoàn toàn'];
const CAM_CHUNG_EN = ['better', 'worse', 'higher quality', 'lower quality', 'more durable', 'more accurate', 'investment', 'value retention', 'ranking', 'recommend', 'worth buying', 'should buy', 'every brand', 'all brands', 'completely'];
const DINH_NGHIA_EBAUCHE_VI = ['bộ máy chưa hoàn chỉnh'];
const DINH_NGHIA_EBAUCHE_EN = ['An unfinished movement', 'unfinished movement sold'];
const CAM_SELLITA_VI = ['độc lập', 'nhà cung cấp chung', 'bộ máy chung', 'bên thứ ba'];
const CAM_SELLITA_EN = ['independent', 'common movement', 'shared movement', 'industry standard', 'third-party'];
const ROUTE_VI_LINK = ['](/co-che/', '](/tu-dien/', '](/huong-dan/', '](/thuong-hieu/', '](/mau-iconic/', '](/lich-su/', '](/giai-phau/', '](/so-sanh/'];

const errors = [];
const fail = (rule, tep, chiTiet) => errors.push(`[${rule}] ${tep}: ${chiTiet}`);
const docTep = (duong) => fs.readFileSync(duong, 'utf8');

// --- Trích frontmatter và URL nguồn (không dùng thư viện ngoài) ---
const docBai = {};
for (const b of BAI) {
  const vi = path.join(ROOT, 'src', 'content', 'coChe', 'vi', `${b.slug}.md`);
  const en = path.join(ROOT, 'src', 'content', 'coChe', 'en', `${b.tenEn}.md`);
  docBai[b.slug] = { vi: { tep: vi }, en: { tep: en } };
}

const trichFrontmatter = (txt) => {
  const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : '';
};
const trichTruong = (fm, ten) => {
  const m = fm.match(new RegExp(`^${ten}:\\s*"?(.+?)"?\\s*$`, 'm'));
  return m ? m[1] : null;
};
const urlTrongSources = (fm) => [...fm.matchAll(/url:\s*"(https?:\/\/[^"]+)"/g)].map((x) => x[1]);
const danhSachSources = (fm) => (fm.match(/^  - label:/gm) ?? []).length;

// --- R1 + R2 + R3 + R4 + R5 (tệp nguồn, không cần dist) ---
const CATEGORY_HOP_LE = ['nền tảng', 'phức tạp', 'bổ trợ'];
const DIFFICULTY_HOP_LE = ['thấp', 'trung bình', 'cao', 'rất cao'];

for (const b of BAI) {
  for (const ngon of ['vi', 'en']) {
    const o = docBai[b.slug][ngon];
    if (!fs.existsSync(o.tep)) {
      fail('R1', o.tep, 'thiếu tệp bài bắt buộc');
      continue;
    }
    o.txt = docTep(o.tep);
    if (!/\n$/.test(o.txt)) fail('T4', o.tep, 'thiếu newline cuối');

    const fm = trichFrontmatter(o.txt);
    if (!fm) { fail('R2', o.tep, 'không trích được frontmatter'); continue; }
    o.fm = fm;
    o.title = trichTruong(fm, 'title');
    o.excerpt = trichTruong(fm, 'excerpt');
    o.category = trichTruong(fm, 'category');
    o.difficulty = trichTruong(fm, 'difficulty');
    o.date = trichTruong(fm, 'date');
    o.draft = trichTruong(fm, 'draft');
    if (!o.title) fail('R2', o.tep, 'thiếu title');
    if (!o.excerpt) fail('R2', o.tep, 'thiếu excerpt');
    if (!CATEGORY_HOP_LE.includes(o.category ?? '')) fail('R2', o.tep, `category không hợp lệ: ${o.category}`);
    if (!DIFFICULTY_HOP_LE.includes(o.difficulty ?? '')) fail('R2', o.tep, `difficulty không hợp lệ: ${o.difficulty}`);
    if (!o.date) fail('R2', o.tep, 'thiếu date');
    if (o.draft !== 'false') fail('R2', o.tep, `draft phải là false, thực tế: ${o.draft}`);
    if (danhSachSources(fm) < 2) fail('R2', o.tep, 'ít hơn 2 mục sources');

    // R3 — allowlist theo bài: đủ nguồn chuẩn, không URL lạ (kể cả HTTPS)
    const urls = urlTrongSources(fm);
    const choPhep = ALLOWLIST[b.slug];
    if (urls.length < 2) fail('R3', o.tep, `chỉ ${urls.length} URL nguồn, cần ≥2`);
    for (const u of urls) {
      if (!u.startsWith('https://')) fail('R3', o.tep, `URL không HTTPS: ${u}`);
      if (!choPhep.includes(u)) fail('R3', o.tep, `URL không thuộc allowlist của bài: ${u}`);
    }
    for (const uChuan of choPhep) {
      if (!urls.includes(uChuan)) fail('R3', o.tep, `thiếu nguồn chuẩn của bài: ${uChuan}`);
    }
    for (const uCam of URL_CAM) {
      if (o.txt.includes(uCam)) fail('R3', o.tep, `URL nguồn chưa phép/bị 404: ${uCam}`);
    }

    // R4 — claim cấm theo ngôn ngữ
    const cam = ngon === 'vi' ? CAM_CHUNG_VI : CAM_CHUNG_EN;
    for (const cu of cam) {
      if (o.txt.includes(cu)) fail('R4', o.tep, `cụm cấm: "${cu}"`);
    }

    // R5 — định nghĩa ébauche chỉ thuộc bài ébauche; Sellita không suy vai trò
    if (b.slug === 'eta-sellita') {
      for (const cu of (ngon === 'vi' ? DINH_NGHIA_EBAUCHE_VI : DINH_NGHIA_EBAUCHE_EN)) {
        if (o.txt.includes(cu)) fail('R5', o.tep, `định nghĩa ébauche đứng trong bài ETA/Sellita (claim thuộc nguồn FHH): "${cu}"`);
      }
      for (const cu of (ngon === 'vi' ? CAM_SELLITA_VI : CAM_SELLITA_EN)) {
        if (o.txt.includes(cu)) fail('R5', o.tep, `suy diễn vai trò Sellita: "${cu}"`);
      }
    }

    // R1 — tệp EN không link route VI: cả markdown lẫn raw href/dấu nháy
    if (ngon === 'en') {
      for (const tienTo of ROUTE_VI_LINK) {
        if (o.txt.includes(tienTo)) fail('R1', o.tep, `liên kết EN trỏ route VI: ${tienTo}`);
      }
      const regexRaw = /["'](\/(?:co-che|tu-dien|huong-dan|thuong-hieu|mau-iconic|lich-su|giai-phau|so-sanh)\/)/g;
      const raw = [...o.txt.matchAll(regexRaw)].map((m) => m[1]);
      for (const r of raw) fail('R1', o.tep, `href/đường dẫn raw EN trỏ route VI: ${r}`);
    }
    o.linkCheo = [];
    for (const b2 of BAI) {
      if (b2.slug === b.slug) continue;
      const duongDan = ngon === 'vi' ? b2.viPath : b2.enPath;
      const co = o.txt.includes(`(${duongDan})`);
      if (co) o.linkCheo.push(b2.slug);
      else if (ngon === 'vi') fail('R2', o.tep, `thiếu liên kết chéo VI → ${b2.viPath}`);
      else fail('R2', o.tep, `thiếu liên kết chéo EN → ${b2.enPath}`);
    }
  }
  // VI 1 được dẫn thêm bài in-house (cho phép, không bắt buộc)
}

// R1 — ARTICLE_PAIRS chứa đúng 3 cặp
const tepRoutes = path.join(ROOT, 'src', 'i18n', 'contentRoutes.ts');
if (!fs.existsSync(tepRoutes)) {
  fail('R1', tepRoutes, 'thiếu contentRoutes.ts');
} else {
  const routes = docTep(tepRoutes);
  for (const b of BAI) {
    const dong = `{ vi: '${b.viPath}', en: '${b.enPath}' }`;
    if (!routes.includes(dong)) fail('R1', tepRoutes, `thiếu cặp route: ${dong}`);
  }
}
// R2 — title VI và EN của cùng bài phải khác nhau
for (const b of BAI) {
  const tv = docBai[b.slug].vi.title;
  const te = docBai[b.slug].en.title;
  if (tv && te && tv === te) fail('R2', b.slug, 'title VI và EN trùng nhau');
}

// --- R6 — dist (chỉ chạy khi truyền dist) ---
if (DIST) {
  const daiViet = /[\u0102-\u01B0\u1EA0-\u1EF9]/; // ăâêôơư + dấu tiếng Việt
  for (const b of BAI) {
    for (const ngon of ['vi', 'en']) {
      const route = ngon === 'vi' ? b.viPath : b.enPath.replace(/\/$/, '');
      const tepHtml = path.join(DIST, route, 'index.html');
      if (!fs.existsSync(tepHtml)) { fail('R6', route, 'thiếu trang sau build'); continue; }
      const html = docTep(tepHtml);
      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, '').trim() ?? '';
      const title = docBai[b.slug][ngon].title ?? '';
      if (!h1.includes(title.replace(/&amp;/g, '&').slice(0, 30))) {
        fail('R6', route, `h1 không khớp title (${ngon}): h1="${h1.slice(0, 60)}"`);
      }
      if (ngon === 'en' && daiViet.test(h1)) {
        fail('R6', route, `h1 EN chứa ký tự tiếng Việt: "${h1.slice(0, 60)}"`);
      }
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '';
      if (!canonical.includes(route)) fail('R6', route, `canonical không khớp route: ${canonical}`);
      if (!/hreflang="vi"/.test(html)) fail('R6', route, 'thiếu hreflang="vi"');
      if (!/hreflang="en"/.test(html)) fail('R6', route, 'thiếu hreflang="en"');
      // Liên kết chuyển ngôn ngữ đúng cặp route (hai chiều)
      const swHref = ngon === 'vi' ? b.enPath : b.viPath;
      if (!html.includes(`href="${swHref}"`)) fail('R6', route, `thiếu liên kết chuyển ngôn ngữ → ${swHref}`);
    }
  }
}

console.log(`H14-B checker: root=${ROOT}${DIST ? ` dist=${DIST}` : ' (không kiểm dist)'}`);
if (errors.length === 0) {
  console.log(`ĐẠT — 6 tệp × 3 cặp route; liên kết chéo: ${BAI.map((b) => `${b.slug} vi[${docBai[b.slug].vi.linkCheo.length}] en[${docBai[b.slug].en.linkCheo.length}]`).join(', ')}${DIST ? '; R6 dist ĐẠT' : ''}`);
  process.exit(0);
}
console.log('KHÔNG ĐẠT:');
for (const e of errors) console.log('  LỖI ' + e);
process.exit(1);
