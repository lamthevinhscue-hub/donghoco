import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

function walk(dir) {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (/\.(astro|ts|md)$/.test(f)) out.push(p);
  }
  return out;
}

let found = 0;
for (const file of walk('src')) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const classes = line.match(/class="([^"]*)"/g) || [];
    for (const c of classes) {
      const parts = c.slice(7, -1).split(/\s+/).filter(Boolean);
      const seen = {};
      for (const p of parts) {
        if (seen[p]) {
          found++;
          console.log(relative('.', file).replace(/\\/g, '/') + ':' + (i + 1) + ' trùng: ' + p);
        }
        seen[p] = true;
      }
    }
  });
}
console.log(found === 0 ? 'OK: Không còn class trùng nào.' : 'Tổng: ' + found + ' chỗ trùng.');
