// P3.1 — Phân tích ngữ cảnh tham chiếu ảnh OG trong dist/ (TXN-20260910-12)
// Chạy: node output/p3.1-image-audit/phan-tich-tham-chieu.cjs
const fs = require('fs');
const path = require('path');
const imgs = ['og-co-che.jpg', 'og-lich-su.jpg', 'og-mau-iconic.jpg', 'og-thuong-hieu.jpg', 'og-default.jpg'];
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const stats = Object.fromEntries(imgs.map((i) => [i, { htmlChua: 0, ogImageMeta: 0, twitterMeta: 0, jsonLd: 0, routeOgImage: new Set(), routeJsonLd: new Set() }]));
const walk = (dir) => {
  for (const n of fs.readdirSync(dir)) {
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (n.endsWith('.html')) {
      const html = fs.readFileSync(p, 'utf8');
      const route = p.replace(/\\/g, '/').replace(/^dist/, '').replace(/index\.html$/, '') || '/';
      for (const i of imgs) {
        if (!html.includes(i)) continue;
        stats[i].htmlChua++;
        const reOg = new RegExp('<meta[^>]*property="og:image"[^>]*content="[^"]*' + esc(i));
        const reTw = new RegExp('<meta[^>]*name="twitter:image"[^>]*content="[^"]*' + esc(i));
        const reLd = new RegExp('ld\\+json[\\s\\S]{0,3000}' + esc(i));
        if (reOg.test(html)) { stats[i].ogImageMeta++; stats[i].routeOgImage.add(route); }
        if (reTw.test(html)) stats[i].twitterMeta++;
        if (reLd.test(html)) { stats[i].jsonLd++; stats[i].routeJsonLd.add(route); }
      }
    }
  }
};
walk('dist');
console.log('Thời điểm phân tích: ' + new Date().toISOString());
for (const i of imgs) {
  const s = stats[i];
  console.log(i + ':');
  console.log('  - số HTML chứa đường dẫn ở bất kỳ vị trí nào: ' + s.htmlChua);
  console.log('  - route chọn ảnh trong og:image: ' + s.routeOgImage.size + ' (tổng thẻ og:image: ' + s.ogImageMeta + ')');
  console.log('  - thẻ twitter:image: ' + s.twitterMeta);
  console.log('  - HTML có nhắc trong JSON-LD: ' + s.jsonLd + (s.jsonLd ? ' (route ví dụ: ' + [...s.routeJsonLd].slice(0, 3).join(', ') + ')' : ''));
}
