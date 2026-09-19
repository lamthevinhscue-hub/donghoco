// Đối chiếu số href từng trang dist (astro 7 content layer) vs production (astro 4 legacy)
// Tìm trang có số href lệch để định vị 53 link chênh
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const walk = (d, acc = []) => {
  for (const f of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, f.name);
    if (f.isDirectory()) walk(p, acc);
    else if (f.name === 'index.html') acc.push(p.split(dist).join('').split('\\').join('/').replace(/\/index\.html$/, '/'));
  }
  return acc;
};
const routes = walk(dist).sort();
const count = (html) => (html.match(/href="[^"]+"/g) || []).length;

const chenh = [];
let tongMoi = 0, tongCu = 0;
const BATCH = 20;
for (let i = 0; i < routes.length; i += BATCH) {
  const lo = routes.slice(i, i + BATCH);
  const ketQua = await Promise.all(lo.map(async (r) => {
    const moi = count(readFileSync('dist' + r + 'index.html', 'utf8'));
    const cu = count(await (await fetch('https://donghoco1.vercel.app' + r)).text());
    return { r, moi, cu };
  }));
  for (const { r, moi, cu } of ketQua) {
    tongMoi += moi; tongCu += cu;
    if (moi !== cu) chenh.push({ route: r, astro4: cu, astro7: moi, chenh: moi - cu });
  }
}
console.log('TỔNG href | astro4 (prod):', tongCu, '| astro7 content-layer:', tongMoi, '| chênh:', tongMoi - tongCu);
console.log('Số trang lệch:', chenh.length);
for (const c of chenh.slice(0, 15)) console.log(' ', JSON.stringify(c));
await import('node:fs').then(fs => fs.writeFileSync('output/g09-astro7-content-config-migration/so-link-vs-prod.json', JSON.stringify({ tongCu, tongMoi, chenh }, null, 2) + '\n'));
