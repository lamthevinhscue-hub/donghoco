// H05 — checker bài "Swiss Made" song ngữ: cặp route, chống đánh đồng, liên kết,
// nguồn HTTPS, ngôn ngữ hai feed dist. Parser DOM qua fast-xml-parser không phù hợp
// HTML — dùng kiểm chuỗi trên HTML đã bóc thẻ và regex cấu trúc trên nguồn .md.
// Chạy: node scripts/check-h05-swiss-made.mjs
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');
let loi = 0;
const ghi = [];
const them = (ok, ten, chiTiet) => {
  ghi.push({ dat: ok, ten, chiTiet: String(chiTiet).slice(0, 180) });
  if (!ok) loi += 1;
};

const SLUG = 'swiss-made';
const VI_DIST = join(DIST, 'huong-dan', SLUG, 'index.html');
const EN_DIST = join(DIST, 'en', 'guides', SLUG, 'index.html');
const SRC_VI = join(ROOT, 'src', 'content', 'huongDan', 'vi', `${SLUG}.md`);
const SRC_EN = join(ROOT, 'src', 'content', 'huongDan', 'en', `${SLUG}.md`);
const SITE = 'https://www.kienthucdonghoco.vn';
const vietRe = /[\u0103\u00E2\u0111\u00EA\u00F4\u01A1\u01B0\u1EA1-\u1EF9]/;

// R1 — cặp route + tệp nguồn tồn tại
them(existsSync(SRC_VI) && existsSync(SRC_EN), 'R1-tep-nguon', 'hai tệp .md tồn tại');
them(existsSync(VI_DIST) && existsSync(EN_DIST), 'R1-dist-ton-tai', 'hai route có trang dist');

// R2 — cặp ngôn ngữ đăng ký trong contentRoutes
const cr = readFileSync(join(ROOT, 'src', 'i18n', 'contentRoutes.ts'), 'utf8');
them(cr.includes(`{ vi: '/huong-dan/${SLUG}', en: '/en/guides/${SLUG}/' }`), 'R2-cap-route', 'ARTICLE_PAIRS có cặp swiss-made');

// R3 — chống đánh đồng: các diễn đàn cấm không có trong source VI lẫn EN (bóc ** md)
const CAM = [
  /100\s*%/,
  /(tốt hơn|tốt hơn hẳn|chất lượng cao hơn|higher quality|better quality)/i,
  /(toàn bộ.{0,24}được (làm|sản xuất) tại Thụy Sĩ|entirely (made|produced) in Switzerland|100% Swiss)/i,
  /(made in Germany|Made in Japan)/i,
];
for (const [ten, p] of [['VI', SRC_VI], ['EN', SRC_EN]]) {
  const raw = readFileSync(p, 'utf8');
  const chuan = raw.split('**').join('');
  for (const re of CAM) {
    them(!re.test(chuan), `R3-cam-${ten}`, re.source);
  }
}

// R4 — mức dè dặt bắt buộc có mặt (chỉ dẫn nguồn gốc + theo văn bản pháp luật)
const viRaw = readFileSync(SRC_VI, 'utf8');
const enRaw = readFileSync(SRC_EN, 'utf8');
them(/chỉ dẫn nguồn gốc/.test(viRaw) && /indication of source/.test(enRaw), 'R4-due-dat', 'chỉ dẫn nguồn gốc / indication of source');
them(viRaw.includes('đạt **đồng thời**') || viRaw.includes('đồng thời'), 'R4-dong-thoi-vi', 'bảy tiêu chí đạt đồng thời');
them(/all[\s*]*of the following conditions/.test(enRaw.split('**').join('')), 'R4-dong-thoi-en', 'all conditions hold');

// R5 — dữ kiện định lượng khớp hồ sơ nguồn (60% / 50% / mốc 2017)
for (const [ten, raw] of [['VI', viRaw], ['EN', enRaw]]) {
  them(/60 (per cent|phần trăm)/.test(raw), `R5-60-phan-tram ${ten}`, '60%');
  them(/(một nửa giá trị|half of the value)/.test(raw), `R5-50-gia-tri-linh-kien ${ten}`, 'một nửa giá trị linh kiện');
  them(raw.includes('2017') && raw.includes('1971'), `R5-moc-phap-ly ${ten}`, '1971 + 2017');
  them(/smart/i.test(raw) || /thông minh/.test(raw), `R5-smartwatch ${ten}`, 'smart watch / thông minh trong phạm vi');
}

// R6 — nguồn HTTPS khớp hồ sơ (3 nguồn chính thức, đúng URL)
const NGUON = [
  'https://www.fedlex.admin.ch/eli/cc/1971/1908_1915_1915/en',
  'https://www.ige.ch/en/law-and-policy/national-ip-law/indications-of-source/swiss-indications-of-source/industry-ordinances/revision-of-the-ordinance-on-the-use-of-swiss-for-watches',
  'https://www.fhs.swiss/eng/swissmade.html',
];
for (const [ten, raw] of [['VI', viRaw], ['EN', enRaw]]) {
  const urls = [...raw.matchAll(/url: "([^"]+)"/g)].map((m) => m[1]);
  for (const u of NGUON) them(urls.includes(u), `R6-nguon-https ${ten}`, u.slice(0, 60));
  them(urls.every((u) => u.startsWith('https://')), `R6-nguon-https-thuan ${ten}`, 'toàn bộ https');
}

// R7 — dist: H1 đúng ngôn ngữ, không rò ngôn ngữ còn lại, canonical/hreflang/switcher
// (mutation "mat-route" xóa trang VI: checker phải exit 1 sạch, không crash)
const bocThe = (html) => {
  let t = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ');
  t = t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  return t.split('&#39;').join("'").split('&amp;').join('&').split('Tiếng Việt').join(' ');
};
const distDay = existsSync(VI_DIST) && existsSync(EN_DIST);
const viHtml = distDay ? readFileSync(VI_DIST, 'utf8') : '';
const enHtml = distDay ? readFileSync(EN_DIST, 'utf8') : '';
const h1Vi = (viHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] ?? '';
const h1En = (enHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] ?? '';
them(/Swiss Made/.test(h1En), 'R7-h1-en', h1En.slice(0, 60));
them(vietRe.test(h1Vi), 'R7-h1-vi', h1Vi.slice(0, 60));
them(!vietRe.test(bocThe(enHtml)), 'R7-en-khong-ro-vi', 'dist EN không rò tiếng Việt');
them(enHtml.includes(`<link rel="canonical" href="${SITE}/en/guides/${SLUG}/">`), 'R7-en-canonical', SITE + '/en/guides/' + SLUG + '/');
them(viHtml.includes(`<link rel="canonical" href="${SITE}/huong-dan/${SLUG}/">`), 'R7-vi-canonical', SITE + '/huong-dan/' + SLUG + '/');
them(enHtml.includes(`hreflang="en" href="${SITE}/en/guides/${SLUG}/"`), 'R7-en-hreflang-en', 'hreflang EN trên trang EN');
them(viHtml.includes(`hreflang="en" href="${SITE}/en/guides/${SLUG}/"`), 'R7-vi-hreflang-en', 'hreflang sang EN');
them(enHtml.includes('href="/huong-dan/swiss-made"'), 'R7-en-switcher-vi', 'switcher EN→VI');

// R8 — liên kết nội bộ của bài tồn tại trong dist (đích đúng ngôn ngữ)
const LIEN_KET_EN = ['/en/guides/first-mechanical-watch/', '/en/glossary/chronometer/', '/en/glossary/master-chronometer/'];
const LIEN_KET_VI = ['/huong-dan/nhan-biet-dong-ho-gia/', '/huong-dan/chon-dong-ho-dau-tien/', '/tu-dien/chronometer/', '/tu-dien/metas/', '/tu-dien/poincon-de-geneve/'];
for (const l of LIEN_KET_EN) {
  const tep = join(DIST, ...l.replace(/^\//, '').split('/').filter(Boolean)) + '/index.html';
  them(existsSync(tep), 'R8-lien-ke-en-ton-tai', l);
  them(enHtml.includes(`href="${l}"`), 'R8-lien-ke-en-duoc-dat', l);
}
for (const l of LIEN_KET_VI) {
  const tep = join(DIST, ...l.replace(/^\//, '').split('/').filter(Boolean)) + '/index.html';
  them(existsSync(tep), 'R8-lien-ke-vi-ton-tai', l);
  them(viHtml.includes(`href="${l}"`), 'R8-lien-ke-vi-duoc-dat', l);
}

// R9 — EOF newline
them(viRaw.endsWith('\n') && enRaw.endsWith('\n'), 'R9-eof', 'newline cuối tệp nguồn');

console.log(JSON.stringify({ loi, ghi }, null, 2));
process.exitCode = loi === 0 ? 0 : 1;
