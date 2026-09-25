#!/usr/bin/env node
// =============================================================================
// check-p0-d2-glossary-expansion.mjs (P0-D2, Đợt 5) — kiểm chặng viết 12 mục
// từ điển song ngữ (4 "độ chính xác và điều chỉnh" + 8 "phức tạp cao cấp").
// S1 (25/09/2026): 6 mục (column-wheel, flyback, annual-calendar, world-time,
// jumping-hour, retrograde) đổi nhóm sang "phức tạp chức năng" — rattrapante và
// equation-of-time giữ "phức tạp cao cấp"; /tu-dien cao cấp 11 → 5.
//
// Cách chạy: node scripts/check-p0-d2-glossary-expansion.mjs [dist]
//   dist: thư mục build (tùy chọn; chuỗi build truyền `dist`).
//   Root cây cần kiểm đặt qua biến môi trường P0D2_ROOT (mặc định cwd).
//
// R1  Đúng 24 tệp; ARTICLE_PAIRS chứa đúng 12 cặp; tệp EN không liên kết route VI.
// R2  Frontmatter: title, excerpt, term_en, category đúng nhóm, date, draft:false.
// R3  ≥2 nguồn HTTPS theo allowlist từng mục (URL lạ kể cả HTTPS → fail);
//     cấm URL không-HTTPS và 2 URL 404 của H14-A.
// R4  Cụm cấm theo từng mục (dữ kiện bị cảnh báo trong P0-D1) + claim chất
//     lượng/xếp hạng/đầu tư trên toàn bộ 24 tệp.
// R5  Dist: 24 route tồn tại; h1 khớp title; canonical; hreflang vi/en; switcher
//     hai chiều; /tu-dien hiển thị 45 mục, nhóm mới 4, phức tạp cao cấp 5.
// Exit 1 nếu có lỗi.
// =============================================================================
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.env.P0D2_ROOT ?? process.cwd());
const DIST = process.argv[2] ? path.resolve(process.argv[2]) : null;

const URL_FHH = (t) => `https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/${t}`;
const MUC = [
  { slug: 'bien-do', tenEn: 'amplitude', vi: '/tu-dien/bien-do', en: '/en/glossary/amplitude/', category: 'độ chính xác và điều chỉnh',
    allow: [URL_FHH('amplitude'), 'https://www.witschi.com/en/products/chronomaster-auto/'] },
  { slug: 'tinh-dang-thoi', tenEn: 'isochronism', vi: '/tu-dien/tinh-dang-thoi', en: '/en/glossary/isochronism/', category: 'độ chính xác và điều chỉnh',
    allow: [URL_FHH('isochronism'), 'https://www.ferdinandberthoud.ch/en/newsletter/newsletter-chronometre-fb-1-2-3.html'] },
  { slug: 'sai-so-vi-tri', tenEn: 'positional-error', vi: '/tu-dien/sai-so-vi-tri', en: '/en/glossary/positional-error/', category: 'độ chính xác và điều chỉnh',
    allow: ['https://www.cosc.swiss/cosc-faq', 'https://www.grand-seiko.com/us-en/collections/movement/mechanical'],
    camThem: ['là chuẩn chung', 'chuẩn chung cho', 'is the common standard', 'a common standard for'] },
  { slug: 'dieu-chinh-theo-vi-tri', tenEn: 'adjustment-in-positions', vi: '/tu-dien/dieu-chinh-theo-vi-tri', en: '/en/glossary/adjustment-in-positions/', category: 'độ chính xác và điều chỉnh',
    allow: ['https://www.grand-seiko.com/instructions/html/GS_9S_en/AGFISYlmvxdvqd', 'https://static.patek.com/pdf/instructionsforuse/PatekPhilippe_P2401_Caliber_240.pdf'],
    camThem: ['điều chỉnh ở 5 vị trí', 'điều chỉnh ở 6 vị trí', 'adjusted in 5 positions', 'adjusted in 6 positions', 'là chuẩn ngành', 'chuẩn ngành cho', 'is the industry standard', 'the industry standard for',
      // Vòng sửa 1: chặn định nghĩa chung vượt nguồn (không nguồn nào định nghĩa khái niệm này)
      'chỉnh bộ máy', 'chạy nhất quán', 'marche nhất quán', 'runs consistently', 'so it runs consistently'] },
  { slug: 'banh-xe-cot', tenEn: 'column-wheel', vi: '/tu-dien/banh-xe-cot', en: '/en/glossary/column-wheel/', category: 'phức tạp chức năng',
    allow: [URL_FHH('column-wheel'), 'https://www.omegawatches.com/en-gb/watch-omega-speedmaster-two-counters-co-axial-chronometer-chronograph-44-25-mm-31193445101002'] },
  { slug: 'flyback', tenEn: 'flyback', vi: '/tu-dien/flyback', en: '/en/glossary/flyback/', category: 'phức tạp chức năng',
    allow: [URL_FHH('flyback-chronograph'), 'https://us.frederiqueconstant.com/product/FC-760NS4H6.html'] },
  { slug: 'rattrapante', tenEn: 'rattrapante', vi: '/tu-dien/rattrapante', en: '/en/glossary/rattrapante/', category: 'phức tạp cao cấp',
    allow: [URL_FHH('split-seconds-chronograph'), 'https://www.alange-soehne.com/us-en/timepieces/1815/1815-rattrapante'],
    camThem: ['the hand of the chronograph and the hand of the split seconds button'] },
  { slug: 'lich-nam', tenEn: 'annual-calendar', vi: '/tu-dien/lich-nam', en: '/en/glossary/annual-calendar/', category: 'phức tạp chức năng',
    allow: ['https://www.patek.com/en/manufacture/quality-and-fine-workmanship/calendar-watches', URL_FHH('annual-calendar')],
    camThem: ['leap years, but not of leap years'] },
  { slug: 'gio-the-gioi', tenEn: 'world-time', vi: '/tu-dien/gio-the-gioi', en: '/en/glossary/world-time/', category: 'phức tạp chức năng',
    allow: [URL_FHH('world-time'), 'https://www.patek.com/en/glossary'],
    camThem: ['true solar time'] },
  { slug: 'gio-nhay', tenEn: 'jumping-hour', vi: '/tu-dien/gio-nhay', en: '/en/glossary/jumping-hour/', category: 'phức tạp chức năng',
    allow: [URL_FHH('jumping-hour'), 'https://www.patek.com/en/glossary'] },
  { slug: 'kim-hoi', tenEn: 'retrograde', vi: '/tu-dien/kim-hoi', en: '/en/glossary/retrograde/', category: 'phức tạp chức năng',
    allow: [URL_FHH('retrograde'), 'https://www.patek.com/en/glossary'] },
  { slug: 'phuong-trinh-thoi-gian', tenEn: 'equation-of-time', vi: '/tu-dien/phuong-trinh-thoi-gian', en: '/en/glossary/equation-of-time/', category: 'phức tạp cao cấp',
    allow: [URL_FHH('equation-of-time'), 'https://www.patek.com/en/glossary'],
    camThem: ['15 April', '14 June', '15 tháng 4', '14 tháng 6', '15/4', '14/6'] },
];

const CAM_CHUNG_VI = ['tốt hơn', 'kém hơn', 'chất lượng cao', 'chất lượng thấp', 'bền hơn', 'chính xác hơn', 'đầu tư', 'giữ giá', 'xếp hạng', 'khuyến nghị', 'đáng mua', 'nên mua', 'mọi hãng', 'tất cả các hãng', 'hoàn toàn'];
const CAM_CHUNG_EN = ['better', 'worse', 'higher quality', 'lower quality', 'more durable', 'more accurate', 'investment', 'value retention', 'ranking', 'recommend', 'worth buying', 'should buy', 'every brand', 'all brands', 'completely'];
const URL_CAM = ['https://www.eta.ch/en/', 'swatchgroup.com'];
const ROUTE_VI_RE = /["'](\/(?:co-che|tu-dien|huong-dan|thuong-hieu|mau-iconic|lich-su|giai-phau|so-sanh)\/)/g;

const errors = [];
const fail = (rule, tep, chiTiet) => errors.push(`[${rule}] ${tep}: ${chiTiet}`);
const trichFM = (txt) => {
  const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : '';
};
const trichTruong = (fm, ten) => fm.match(new RegExp(`^${ten}:\\s*"?(.+?)"?\\s*$`, 'm'))?.[1] ?? null;
const urlTrongSources = (fm) => [...fm.matchAll(/url:\s*"(https?:\/\/[^"]+)"/g)].map((x) => x[1]);
const soSources = (fm) => (fm.match(/^  - label:/gm) ?? []).length;

const soTep = { vi: 0, en: 0 };
for (const m of MUC) {
  for (const ngon of ['vi', 'en']) {
    const tep = path.join(ROOT, 'src', 'content', 'tuDien', ngon, `${ngon === 'vi' ? m.slug : m.tenEn}.md`);
    if (!fs.existsSync(tep)) { fail('R1', tep, 'thiếu tệp bài bắt buộc'); continue; }
    soTep[ngon]++;
    const txt = fs.readFileSync(tep, 'utf8');
    if (!/\n$/.test(txt)) fail('T4', tep, 'thiếu newline cuối');

    const fm = trichFM(txt);
    if (!fm) { fail('R2', tep, 'không trích được frontmatter'); continue; }
    const title = trichTruong(fm, 'title');
    const category = trichTruong(fm, 'category');
    if (!title) fail('R2', tep, 'thiếu title');
    if (!trichTruong(fm, 'excerpt')) fail('R2', tep, 'thiếu excerpt');
    if (category !== m.category) fail('R2', tep, `category phải "${m.category}", thực tế "${category}"`);
    if (!trichTruong(fm, 'date')) fail('R2', tep, 'thiếu date');
    if (trichTruong(fm, 'draft') !== 'false') fail('R2', tep, 'draft phải false');

    // R3 — allowlist URL theo mục
    const urls = urlTrongSources(fm);
    if (soSources(fm) < 2 || urls.length < 2) fail('R3', tep, 'ít hơn 2 mục sources/URL HTTPS');
    for (const u of urls) {
      if (!u.startsWith('https://')) fail('R3', tep, `URL không HTTPS: ${u}`);
      if (!m.allow.includes(u)) fail('R3', tep, `URL không thuộc allowlist của mục: ${u}`);
    }
    for (const u of m.allow) if (!urls.includes(u)) fail('R3', tep, `thiếu nguồn chuẩn của mục: ${u}`);
    for (const uc of URL_CAM) if (txt.includes(uc)) fail('R3', tep, `URL cấm: ${uc}`);

    // R4 — cụm cấm chung + theo mục
    const camChung = ngon === 'vi' ? CAM_CHUNG_VI : CAM_CHUNG_EN;
    for (const c of camChung) if (txt.includes(c)) fail('R4', tep, `cụm cấm: "${c}"`);
    for (const c of (m.camThem ?? [])) if (txt.includes(c)) fail('R4', tep, `dữ kiện bị cảnh báo P0-D1: "${c}"`);

    // R1 — EN không trỏ route VI (markdown lẫn raw href)
    if (ngon === 'en') {
      for (const tienTo of ['](/co-che/', '](/tu-dien/', '](/huong-dan/', '](/thuong-hieu/']) {
        if (txt.includes(tienTo)) fail('R1', tep, `liên kết EN trỏ route VI: ${tienTo}`);
      }
      for (const mm of txt.matchAll(ROUTE_VI_RE)) fail('R1', tep, `href/đường dẫn raw EN trỏ route VI: ${mm[1]}`);
    }
  }
}

// R1 — ARTICLE_PAIRS chứa đúng 12 cặp
const tepRoutes = path.join(ROOT, 'src', 'i18n', 'contentRoutes.ts');
if (!fs.existsSync(tepRoutes)) fail('R1', tepRoutes, 'thiếu contentRoutes.ts');
else {
  const routes = fs.readFileSync(tepRoutes, 'utf8');
  for (const m of MUC) {
    const dong = `{ vi: '${m.vi}', en: '${m.en}' }`;
    if (!routes.includes(dong)) fail('R1', tepRoutes, `thiếu cặp route: ${dong}`);
  }
}

// R5 — dist
if (DIST) {
  const daiViet = /[\u0102-\u01B0\u1EA0-\u1EF9]/;
  for (const m of MUC) {
    for (const ngon of ['vi', 'en']) {
      const route = (ngon === 'vi' ? m.vi : m.en).replace(/\/$/, '');
      const tepHtml = path.join(DIST, route, 'index.html');
      if (!fs.existsSync(tepHtml)) { fail('R5', route, 'thiếu trang sau build'); continue; }
      const html = fs.readFileSync(tepHtml, 'utf8');
      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, '').trim() ?? '';
      const fm = trichFM(fs.readFileSync(path.join(ROOT, 'src', 'content', 'tuDien', ngon, `${ngon === 'vi' ? m.slug : m.tenEn}.md`), 'utf8'));
      const title = trichTruong(fm, 'title') ?? '';
      if (!h1.includes(title.slice(0, 20))) fail('R5', route, `h1 không khớp title (${ngon}): "${h1.slice(0, 60)}"`);
      if (ngon === 'en' && daiViet.test(h1)) fail('R5', route, 'h1 EN chứa ký tự tiếng Việt');
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '';
      if (!canonical.includes(route)) fail('R5', route, `canonical không khớp: ${canonical}`);
      if (!/hreflang="vi"/.test(html)) fail('R5', route, 'thiếu hreflang="vi"');
      if (!/hreflang="en"/.test(html)) fail('R5', route, 'thiếu hreflang="en"');
      const swHref = ngon === 'vi' ? m.en : m.vi;
      if (!html.includes(`href="${swHref}"`)) fail('R5', route, `thiếu switcher → ${swHref}`);
    }
  }
  const tepTuDien = path.join(DIST, 'tu-dien', 'index.html');
  if (!fs.existsSync(tepTuDien)) fail('R5', '/tu-dien/', 'thiếu trang từ điển');
  else {
    const h = fs.readFileSync(tepTuDien, 'utf8');
    const tong = h.match(/>Tất cả \((\d+)\)/)?.[1];
    const moi = h.match(/>Độ chính xác (&amp;) điều chỉnh \((\d+)\)/)?.[2];
    const cao = h.match(/>Phức tạp — cao cấp \((\d+)\)/)?.[1];
    const dat45 = tong === '45' && moi === '4' && cao === '5';
    if (!dat45) fail('R5', '/tu-dien/', `tổng=${tong} (cần 45), nhóm mới=${moi} (cần 4), cao cấp=${cao} (cần 5)`);
  }
  // Vòng sửa 1: định nghĩa chung vượt nguồn của cặp "Điều chỉnh theo vị trí"
  // cũng bị chặn trên dist (HTML đã render), không chỉ tệp nguồn.
  const CAM_DIST_DIEUCHINH = ['chỉnh bộ máy', 'chạy nhất quán', 'marche nhất quán', 'runs consistently'];
  for (const m of MUC.filter((x) => x.slug === 'dieu-chinh-theo-vi-tri')) {
    for (const ngon of ['vi', 'en']) {
      const route = (ngon === 'vi' ? m.vi : m.en).replace(/\/$/, '');
      const tepHtml = path.join(DIST, route, 'index.html');
      if (!fs.existsSync(tepHtml)) continue;
      const html = fs.readFileSync(tepHtml, 'utf8');
      for (const c of CAM_DIST_DIEUCHINH) {
        if (html.includes(c)) fail('R5', route, `định nghĩa chung vượt nguồn trong dist: "${c}"`);
      }
    }
  }
}

console.log(`P0-D2 checker: root=${ROOT}${DIST ? ` dist=${DIST}` : ' (không kiểm dist)'}`);
if (errors.length === 0) {
  console.log(`ĐẠT — ${soTep.vi} tệp VI + ${soTep.en} tệp EN × 12 cặp route; allowlist URL theo mục; cụm cấm P0-D1${DIST ? '; R5 dist ĐẠT' : ''}`);
  process.exit(0);
}
console.log('KHÔNG ĐẠT:');
for (const e of errors) console.log('  LỖI ' + e);
process.exit(1);
