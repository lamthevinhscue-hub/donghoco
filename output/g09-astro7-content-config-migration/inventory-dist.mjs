// Inventory dist: đếm route HTML per collection + sitemap — dùng cho đối chiếu trước/sau di trú content config
// Chạy: node inventory-dist.cjs <dist> <file-out> <nhan>
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const [dist, fileOut, nhan] = process.argv.slice(2);
if (!dist || !existsSync(dist)) { console.error('dist không tồn tại: ' + dist); process.exit(1); }

const walk = (d, acc = []) => {
  for (const f of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, f.name);
    if (f.isDirectory()) walk(p, acc);
    else if (f.name === 'index.html') acc.push(p.split(dist).join('').split('\\').join('/'));
  }
  return acc;
};

const trang = walk(dist).sort();
const sm = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8').match(/<loc>/g).length;
const EN_SEGMENT = { 'thuong-hieu': 'brands', 'mau-iconic': 'iconic-watches', 'co-che': 'mechanisms', 'tu-dien': 'glossary', 'huong-dan': 'guides' };
const perCollection = {};
for (const [c, enSeg] of Object.entries(EN_SEGMENT)) {
  perCollection[c] = {
    vi: trang.filter((t) => t.startsWith('/' + c + '/')).length,
    en: trang.filter((t) => t.startsWith('/en/') && t.includes('/' + enSeg + '/')).length,
  };
}
const soSanh = trang.filter((t) => t.startsWith('/so-sanh/') || t.startsWith('/en/compare/')).length;
const giaiPhau = trang.filter((t) => t.startsWith('/giai-phau/') || t.startsWith('/en/anatomy/')).length;
const ketQua = { nhan, tongTrangHTML: trang.length, sitemapURL: sm, perCollection, soSanh, giaiPhau, danhSachRoute: trang };
writeFileSync(fileOut, JSON.stringify(ketQua, null, 2) + '\n');
console.log(nhan + ':', trang.length, 'trang HTML | sitemap', sm, '| so-sanh', soSanh, '| giai-phau', giaiPhau);
for (const [c, v] of Object.entries(perCollection)) console.log('  ' + c, JSON.stringify(v));
