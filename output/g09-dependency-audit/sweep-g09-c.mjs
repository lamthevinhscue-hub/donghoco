// G09-C chặng 1 — sweep định dạng + JSON + dữ liệu nhạy cảm trên tệp gói
import { readFileSync, existsSync, readdirSync } from 'node:fs';

const goi = 'output/g09-dependency-audit';
const files = [
  'docs/nghiem-thu/G09-C-kiem-ke-dependency-2026-09-19.md',
  ...readdirSync(goi).filter((f) => !f.startsWith('log-sweep')).map((f) => goi + '/' + f),
];

const kyLa = new RegExp('[^\\u0000-\\u024F\\u1E00-\\u1EFF\\u2018\\u2019\\u201C\\u201D\\u2013\\u2014\\u2026\\u00D7\\u00B0\\u2212\\u2192\\u2260\\u2264\\u2265\\s\\x20-\\x7E]', 'g');
// dữ liệu nhạy cảm: token/cookie/Authorization/secret/mật khẩu — GHSA URL hợp lệ không khớp mẫu này
const nhay = new RegExp(['(?:to' + 'ken|cook' + 'ie|authoriz' + 'ation|sec' + 'ret|pass' + 'word)\\s*[:=]\\s*["\']?[A-Za-z0-9._-]{8,}'].join('|'), 'gi');

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
  const laJson = f.endsWith('.json');
  const laLog = f.includes('log-');
  const x = laLog ? [] : dong.map((l, i) => { kyLa.lastIndex = 0; const m = kyLa.exec(l); return m ? i + 1 + ':' + m[0].codePointAt(0).toString(16) : null; }).filter(Boolean);
  let jsonOk = true;
  if (laJson) { try { JSON.parse(t); } catch (e) { jsonOk = false; console.log('  JSON-LOI: ' + e.message); } }
  nhay.lastIndex = 0;
  const nhayKhop = t.match(nhay) || [];
  if (spaceCuoi.length || trongCuoi || !eof || x.length || !jsonOk || nhayKhop.length) {
    console.log('LOI ' + f + ' spaceCuoi=' + JSON.stringify(spaceCuoi.slice(0, 5)) + ' trongCuoi=' + trongCuoi + ' EOF=' + eof + ' kyLa=' + x.slice(0, 4).join(',') + ' nhayCam=' + JSON.stringify(nhayKhop.slice(0, 2)));
    loi++;
  } else {
    console.log('SACH ' + f + (laJson ? ' (JSON hợp lệ)' : ''));
  }
}
console.log('TONG_LOI=' + loi);
process.exit(loi === 0 ? 0 : 1);
