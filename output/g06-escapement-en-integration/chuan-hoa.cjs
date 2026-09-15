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
let loi = 0;
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');
  let dirty = false;
  const lines = s.split('\n').map((l) => {
    const t = l.replace(/[ \t]+$/, '');
    if (t !== l) dirty = true;
    return t;
  });
  s = lines.join('\n');
  if (!s.endsWith('\n')) { s += '\n'; dirty = true; }
  if (dirty) { fs.writeFileSync(f, s); console.log('chuẩn hóa', f); loi++; }
}
console.log('xong', files.length, 'tệp text output; đã sửa', loi);
let dem = 0;
(function d(p) { for (const f of fs.readdirSync(p)) { const x = path.join(p, f); fs.statSync(x).isDirectory() ? d(x) : dem++; } })(outDir);
console.log('output tổng:', dem, 'tệp (gồm 8 PNG) → tổng gói:', 6 + 2 + 2 + dem);
