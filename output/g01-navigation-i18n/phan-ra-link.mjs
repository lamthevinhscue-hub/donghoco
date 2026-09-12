// phan-ra-link.mjs — Phân rã chênh lệch số link check-links giữa mốc 19.827 và build G01.
// Đếm từng cấu phần href mới do G01 thêm, trực tiếp trên dist hiện hành.
// Chạy: node output/g01-navigation-i18n/phan-ra-link.mjs (từ thư mục repo)
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (n.endsWith('.html')) out.push(p);
  }
  return out;
}

const all = walk('dist');
const isEn = (f) => f.replace(/\\/g, '/').includes('/en/');
const en = all.filter(isEn);
const vi = all.filter((f) => !isEn(f));

const EXPLORE_TARGETS = ['/lich-su', '/giai-phau', '/so-sanh'];
let exploreEn = 0;       // link Explore trên trang EN (menu desktop + mobile)
let panelGo = 0;         // link "đi tới trang chủ đích" trong hộp thoại chưa dịch
let footerHomeEn = 0;    // mục Home footer trang EN (trước đây bị ẩn)
let hreflangViHome = 0;  // hreflang trên trang chủ VI (trước đây 0 do bug map)
let hreflangEnHome = 0;  // hreflang trên trang chủ EN
let dataLangSwitch = 0;  // attr (không phải link mới — chỉ để đối chiếu)
let hreflangTong = 0;
let exploreEnTrang = new Set();

for (const f of all) {
  const h = readFileSync(f, 'utf8');
  const rel = f.replace(/\\/g, '/');
  if (isEn(f)) {
    for (const t of EXPLORE_TARGETS) {
      const n = (h.match(new RegExp(`href="${t}"`, 'g')) || []).length;
      if (n > 0) exploreEnTrang.add(rel);
      exploreEn += n;
    }
    footerHomeEn += (h.match(/href="\/en\/"[^>]*>\s*Home\s*<\/a>/g) || []).length;
  }
  panelGo += (h.match(/id="lang-panel-go"/g) || []).length;
  const hls = (h.match(/<link rel="alternate" hreflang=/g) || []).length;
  hreflangTong += hls;
  if (rel === 'dist/index.html') hreflangViHome = hls;
  if (rel === 'dist/en/index.html') hreflangEnHome = hls;
  dataLangSwitch += (h.match(/data-lang-switch=/g) || []).length;
}

const ketQua = {
  thoiGian: new Date().toISOString(),
  tongTepHtml: all.length,
  soTepEn: en.length,
  soTepVi: vi.length,
  cauPhan: {
    exploreEnLink: exploreEn,
    exploreEnSoTrang: exploreEnTrang.size,
    panelGoLink: panelGo,
    footerHomeEnLink: footerHomeEn,
    hreflangTrangChuVi: hreflangViHome,
    hreflangTrangChuEn: hreflangEnHome,
    hreflangTongToanDist: hreflangTong,
    dataLangSwitchAttr: dataLangSwitch,
  },
  tangThemMoi: exploreEn + panelGo + footerHomeEn + hreflangViHome,
  doiChieuMoc: { mocTruoc: 19827, buildG01: 19827 + exploreEn + panelGo + footerHomeEn + hreflangViHome },
  ghiChu:
    'check-links đếm mọi href="..." (kể cả hreflang link và link trang chủ đích trong hộp thoại). Explore EN trước đây ẩn (exploreNav rỗng ở EN) nên 0; footer EN trước đây không có mục Home; trang chủ VI trước đây không có hreflang (bug map mất cặp root); #lang-panel-go render trên mọi trang (markup luôn có, hiện/ẩn bằng class hidden). data-lang-switch là attr, không phải link mới: 320 = 2 attr × 160 trang chưa dịch (158 trang VI + 404 + legacy /en/glossary/escapement).',
};
console.log(JSON.stringify(ketQua, null, 2));
