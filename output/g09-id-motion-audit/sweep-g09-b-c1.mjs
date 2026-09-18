// G09-B chặng 1 — sweep định dạng + JSON trên đúng tệp gói
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const goi = 'output/g09-id-motion-audit';
const files = [
  'docs/nghiem-thu/G09-B-kiem-ke-id-va-reduced-motion-2026-09-19.md',
  ...readdirSync(goi, { withFileTypes: true }).filter((e) => e.isFile()).map((e) => goi + '/' + e.name),
];
const PNG = readdirSync(goi + '/shots').map((f) => goi + '/shots/' + f);

const kyLa = new RegExp('[^\\u0000-\\u024F\\u1E00-\\u1EFF\\u2018\\u2019\\u201C\\u201D\\u2013\\u2014\\u2026\\u00D7\\u00B0\\u2212\\u2192\\u2260\\u2264\\u2265\\s\\x20-\\x7E]', 'g');
let loi = 0;
for (const f of files) {
  if (!existsSync(f)) { console.log('LOI ' + f + ' — chưa tồn tại'); loi++; continue; }
  const t = readFileSync(f, 'utf8');
  const dong = t.split('\n');
  const eof = /\n$/.test(t);
  if (eof) dong.pop();
  const spaceCuoi = dong.map((l, i) => (/[ \t]+$/.test(l) ? i + 1 : 0)).filter(Boolean);
  let trongCuoi = 0;
  { const d = [...dong]; while (d.length && /^\s*$/.test(d[d.length - 1])) { d.pop(); trongCuoi++; } }
  const laLog = f.includes('log-');
  const laHtml = f.endsWith('.html');
  const x = (laLog || laHtml) ? [] : dong.map((l, i) => { kyLa.lastIndex = 0; const m = kyLa.exec(l); return m ? i + 1 + ':' + m[0].codePointAt(0).toString(16) : null; }).filter(Boolean);
  let jsonOk = true;
  if (f.endsWith('.json')) { try { JSON.parse(t); } catch (e) { jsonOk = false; console.log('  JSON-LOI: ' + e.message); } }
  if (spaceCuoi.length || trongCuoi || !eof || x.length || !jsonOk) {
    console.log('LOI ' + f + ' spaceCuoi=' + JSON.stringify(spaceCuoi.slice(0, 6)) + ' trongCuoi=' + trongCuoi + ' EOF=' + eof + ' kyLa=' + x.slice(0, 4).join(','));
    loi++;
  } else {
    console.log('SACH ' + f + (f.endsWith('.json') ? ' (JSON hợp lệ)' : ''));
  }
}
for (const p of PNG) {
  const h = createHash('sha256').update(readFileSync(p)).digest('hex').slice(0, 16);
  console.log('PNG  ' + p + ' hash=' + h + ' (chỉ hash nhị phân)');
}
console.log('TONG_LOI=' + loi);
process.exit(loi === 0 ? 0 : 1);
