const fs = require('fs');
const path = require('path');
const outDir = 'output/g06-escapement-en-integration';
const files = [];
(function quet(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) quet(p);
    else if (!/\.png$/i.test(f)) files.push(p);
  }
})(outDir);
let daSua = 0;
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');
  let dirty = false;
  s = s.split('\n').map((l) => { const t = l.replace(/[ \t]+$/, ''); if (t !== l) dirty = true; return t; }).join('\n');
  if (!s.endsWith('\n')) { s += '\n'; dirty = true; }
  if (dirty) { fs.writeFileSync(f, s); daSua++; }
}
console.log('chuẩn hóa:', daSua, 'trên', files.length, 'tệp text output');
const tracked = [
  'src/components/infographics/Escapement.astro',
  'src/components/infographics/MechanismAnimation.astro',
  'src/components/templates/MechanismArticle.astro',
  'src/content/coChe/en/escapement.md',
  'scripts/check-regulating-cluster.mjs',
  'package.json',
  'scripts/check-g06-escapement-en.mjs',
  'scripts/check-motion-accessibility.mjs',
  'scripts/check-g04-balance-chapter.mjs',
  'docs/nghiem-thu/G06-C-tich-hop-infographic-bo-thoat-en-2026-09-15.md',
];
const tatCa = [...tracked, ...files];
let loi = 0;
for (const f of tatCa) {
  const buf = fs.readFileSync(f);
  if (buf.includes(0)) continue;
  const s = buf.toString('utf8');
  s.split('\n').forEach((l) => { if (/[ \t]+$/.test(l)) loi++; });
  if (!s.endsWith('\n')) loi++;
}
console.log('Sweep cuối:', loi === 0 ? 'SẠCH ' + tatCa.length + ' tệp' : 'CÒN ' + loi);
let dem = 0;
(function d(p) { for (const f of fs.readdirSync(p)) { const x = path.join(p, f); fs.statSync(x).isDirectory() ? d(x) : dem++; } })(outDir);
console.log('output:', dem, 'tệp (gồm 8 PNG) → tổng gói:', tracked.length + 1 + dem, '(10 tracked + checker mới + biên bản + output)');
try { JSON.parse(fs.readFileSync(outDir + '/sandbox-info.json', 'utf8')); console.log('JSON sandbox-info: HỢP LỆ'); } catch (e) { console.log('JSON LỖI'); }
let pngOk = true;
for (const f of fs.readdirSync(outDir + '/shots')) {
  const b = fs.readFileSync(outDir + '/shots/' + f);
  if (!(b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47)) pngOk = false;
}
console.log('PNG 8/8:', pngOk ? 'ĐẠT' : 'LỖI');
