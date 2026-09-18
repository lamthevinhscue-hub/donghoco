// G09-B chặng 2 — sweep định dạng + JSON + bí mật trên đúng tệp gói
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const goi = 'output/g09-id-motion-fix';
const files = [
  'src/components/WatchImage.astro',
  'package.json',
  'scripts/check-g09-id-unique.mjs',
  'docs/nghiem-thu/G09-B-sua-id-guilloche-2026-09-19.md',
  ...readdirSync(goi, { withFileTypes: true }).filter((e) => e.isFile()).map((e) => goi + '/' + e.name),
  ...['good', 'm1', 'm2'].map((k) => `${goi}/sandbox/${k}/index.html`),
];
const PNG = readdirSync(goi + '/shots').map((f) => goi + '/shots/' + f);

const kyLa = new RegExp('[^\\u0000-\\u024F\\u1E00-\\u1EFF\\u2018\\u2019\\u201C\\u201D\\u2013\\u2014\\u2026\\u00D7\\u00B0\\u2212\\u2192\\u2260\\u2264\\u2265\\s\\x20-\\x7E]', 'g');
const nhay = new RegExp(['api[_-]?key\\s*[:=]\\s*\\S+', '(?:sec' + 'ret|pass' + 'word)\\s*[:=]\\s*\\S+', 'authoriz' + 'ation\\s*:\\s*\\S+', 'to' + 'ken\\s*[:=]\\s*[^\\s"\']{8,}'].join('|'), 'gi');

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
  const x = laLog ? [] : dong.map((l, i) => { kyLa.lastIndex = 0; const m = kyLa.exec(l); return m ? i + 1 + ':' + m[0].codePointAt(0).toString(16) : null; }).filter(Boolean);
  nhay.lastIndex = 0;
  const nhayKhop = t.match(nhay) || [];
  let jsonOk = true;
  if (f.endsWith('.json')) { try { JSON.parse(t); } catch (e) { jsonOk = false; console.log('  JSON-LOI: ' + e.message); } }
  if (spaceCuoi.length || trongCuoi || !eof || x.length || nhayKhop.length || !jsonOk) {
    console.log('LOI ' + f + ' spaceCuoi=' + JSON.stringify(spaceCuoi.slice(0, 6)) + ' trongCuoi=' + trongCuoi + ' EOF=' + eof + ' kyLa=' + x.slice(0, 4).join(',') + ' nhayCam=' + JSON.stringify(nhayKhop.slice(0, 2)));
    loi++;
  } else {
    console.log('SACH ' + f + (f.endsWith('.json') ? ' (JSON hợp lệ)' : ''));
  }
}
let tongPng = 0;
for (const p of PNG) {
  const h = createHash('sha256').update(readFileSync(p)).digest('hex').slice(0, 16);
  console.log('PNG  ' + p + ' hash=' + h);
  tongPng++;
}
console.log('SO_PNG=' + tongPng + ' TONG_LOI=' + loi);
process.exit(loi === 0 ? 0 : 1);
