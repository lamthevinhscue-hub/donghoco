#!/usr/bin/env node
// =============================================================================
// check-h10-image-optimization.mjs — Kiểm gói H10: tối ưu ảnh theo số đo
// =============================================================================
// H10-1  Bản gốc JPG còn tồn tại (đường phục hồi); 2 bản dẫn xuất WebP tồn
//        tại, đúng kích thước pixel và NHỎ HƠN bản gốc
// H10-2  Component chương bánh lắc: <picture> + source WebP 2 độ rộng + sizes;
//        <img> fallback giữ src gốc, alt, width/height, eager
// H10-3  Dist hai trang chương: srcset WebP render; meta og:image VẪN trỏ JPG
//        (không đổi OG theo quy tắc H10)
// H10-4  Không URL ảnh gãy: mọi URL trong srcset/src của hai trang tồn tại
//        trong dist
// Chạy: node scripts/check-h10-image-optimization.mjs <thư-mục-dist>  (cần dist)
// Nối trong npm run build, sau check-h09. Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = process.cwd();
const distArg = process.argv.slice(2).find((a) => !a.startsWith('--'));
const DIST = distArg ? resolve(ROOT, distArg) : null;
if (!DIST) {
  console.error('H10 checker cần thư mục dist: node scripts/check-h10-image-optimization.mjs dist');
  process.exit(1);
}

const errors = [];
const ketqua = { thoiGian: new Date().toISOString(), ca: [], tongKet: null };
const kiem = (id, ten, dat, chiTiet = '') => {
  ketqua.ca.push({ id, ten, dat: dat === true, chiTiet });
  console.log(`  ${dat === true ? 'ĐẠT' : 'LỖI '} [${id}] ${ten}${dat === true ? '' : ` — ${chiTiet}`}`);
  if (dat !== true) errors.push(`[${id}] ${ten} — ${chiTiet}`);
};

const THU_MUC = 'public/images/history/balance-hairspring';
const GOC = join(ROOT, THU_MUC, 'banh-lac-day-toc-hero.jpg');
const W760 = join(ROOT, THU_MUC, 'banh-lac-day-toc-hero-760w.webp');
const W1200 = join(ROOT, THU_MUC, 'banh-lac-day-toc-hero-1200w.webp');

// H10-1: bản gốc + dẫn xuất
const gocCo = existsSync(GOC);
kiem('H10-1a', 'Bản gốc JPG còn tồn tại (đường phục hồi)', gocCo, GOC);
const coW760 = existsSync(W760);
const coW1200 = existsSync(W1200);
kiem('H10-1b', 'Hai bản dẫn xuất WebP tồn tại (760w + 1200w)', coW760 && coW1200, `760w=${coW760}, 1200w=${coW1200}`);
if (gocCo && coW760 && coW1200) {
  const sizeGoc = statSync(GOC).size;
  const size760 = statSync(W760).size;
  const size1200 = statSync(W1200).size;
  kiem('H10-1c', `Dẫn xuất NHỎ HƠN bản gốc (gốc ${sizeGoc}B; 760w ${size760}B; 1200w ${size1200}B)`,
    size760 < sizeGoc && size1200 < sizeGoc,
    `760w ${((size760 / sizeGoc) * 100).toFixed(1)}%, 1200w ${((size1200 / sizeGoc) * 100).toFixed(1)}% của gốc`);
}

// H10-2: component
const compPath = join(ROOT, 'src', 'components', 'history', 'BalanceHairspringChapter.astro');
const comp = readFileSync(compPath, 'utf8');
const coPicture = comp.includes('<picture>');
const coSrcset = comp.includes('banh-lac-day-toc-hero-760w.webp 760w') && comp.includes('banh-lac-day-toc-hero-1200w.webp 1200w');
const coSizes = /<source[^>]*sizes="/.test(comp);
const fallbackNguyen = comp.includes('src="/images/history/balance-hairspring/banh-lac-day-toc-hero.jpg"');
const giuAltEager = /<img[^>]*alt=\{s\.heroAlt\}[\s\S]*?width="1200"[\s\S]*?loading="eager"/.test(comp);
kiem('H10-2', 'Component: <picture> + WebP srcset 2 độ rộng + sizes; fallback JPG gốc giữ alt/width/height/eager',
  coPicture && coSrcset && coSizes && fallbackNguyen && giuAltEager,
  `picture=${coPicture}, srcset=${coSrcset}, sizes=${coSizes}, fallback=${fallbackNguyen}, alt/eager=${giuAltEager}`);

// H10-3 + H10-4: dist hai trang chương
const TRANG = [
  ['VI', join(DIST, 'co-che', 'day-toc-banh-lac', 'index.html')],
  ['EN', join(DIST, 'en', 'mechanisms', 'balance-and-hairspring', 'index.html')],
];
for (const [tag, path] of TRANG) {
  if (!existsSync(path)) { errors.push(`[H10-DIST] Thiếu ${path}`); continue; }
  const html = readFileSync(path, 'utf8');
  const coSrcsetDist = html.includes('banh-lac-day-toc-hero-760w.webp 760w') && html.includes('banh-lac-day-toc-hero-1200w.webp 1200w');
  kiem(`H10-3-${tag}`, 'Dist render srcset WebP', coSrcsetDist, `srcset=${coSrcsetDist}`);
  const ogWebp = /<meta[^>]*og:image[^>]*content="[^"]*\.webp/.test(html);
  const ogJpg = /<meta[^>]*og:image[^>]*content="[^"]*\.(jpg|jpeg|png)/.test(html);
  kiem(`H10-3-${tag}b`, 'Meta og:image giữ raster (không đổi OG sang WebP)', !ogWebp && (ogJpg || !html.includes('og:image')), `og:image webp=${ogWebp}`);

  // mọi URL ảnh trong srcset/src của trang phải tồn tại trong dist
  const urls = new Set();
  for (const m of html.matchAll(/(?:srcset|src)="([^"]+)"/g)) {
    for (const phan of m[1].split(',')) {
      const duong = phan.trim().split(/\s+/)[0];
      if (duong.startsWith('/images/')) urls.add(duong.split('?')[0]);
    }
  }
  const hong = [...urls].filter((u) => !existsSync(join(DIST, u.replace(/^\//, ''))));
  kiem(`H10-4-${tag}`, `Không URL ảnh gãy (${urls.size} URL ảnh trong trang)`, hong.length === 0, hong.join(', ') || 'đủ');
}

// ===== Kết luận =====
ketqua.tongKet = { tongCa: ketqua.ca.length, dat: errors.length === 0, loi: errors.length };
console.log(`  KẾT LUẬN H10: ${errors.length === 0 ? `ĐẠT — ${ketqua.ca.length}/${ketqua.ca.length} ca` : 'KHÔNG ĐẠT:'}`);
for (const e of errors) console.log(`    LỖI  ${e}`);
process.exit(errors.length === 0 ? 0 : 1);
