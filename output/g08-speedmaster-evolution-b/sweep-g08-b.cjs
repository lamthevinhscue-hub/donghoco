// G08-B — sweep định dạng + bí mật + PNG trên đúng tệp gói G08-B
// Dùng: node sweep-g08-b.cjs (từ gốc repo)
const fs = require('fs');
const crypto = require('crypto');

const files = [
  'src/data/omegaSpeedmasterEvolution.ts',
  'src/data/modelEvolution.ts',
  'src/content/mauIconic/vi/omega-speedmaster.md',
  'src/content/mauIconic/en/omega-speedmaster.md',
  'scripts/check-g08-speedmaster-evolution.cjs',
  'docs/nghiem-thu/G08-B-tich-hop-tien-hoa-speedmaster-2026-09-19.md',
  'output/g08-speedmaster-evolution-b/mutation-m1-m5.cjs',
  'output/g08-speedmaster-evolution-b/pw-g08b.js',
  'output/g08-speedmaster-evolution-b/log-build.txt',
  'output/g08-speedmaster-evolution-b/log-check.txt',
  'output/g08-speedmaster-evolution-b/log-check-g08.txt',
  'output/g08-speedmaster-evolution-b/log-english.txt',
  'output/g08-speedmaster-evolution-b/log-mutation.txt',
  'output/g08-speedmaster-evolution-b/log-preview.txt',
  'output/g08-speedmaster-evolution-b/log-pw.txt',
  'output/g08-speedmaster-evolution-b/log-types.txt',
  'output/g08-speedmaster-evolution-b/log-sweep.txt',
];
const PNG = 'output/g08-speedmaster-evolution-b/shots/g08b-vi-1440-sang.png';

const kyLa = new RegExp('[^\\u0000-\\u024F\\u1E00-\\u1EFF\\u2018\\u2019\\u201C\\u201D\\u2013\\u2014\\u2026\\u00D7\\u00B0\\u2212\\u2192\\u2260\\u2264\\u2265\\s\\x20-\\x7E]', 'g');
// credential có cấu trúc — ghép mảnh để không tự khớp
const nhay = new RegExp(['api[_-]?key\\s*[:=]\\s*\\S+', '(?:sec' + 'ret|pass' + 'word)\\s*[:=]\\s*\\S+', 'authoriz' + 'ation\\s*:\\s*\\S+', 'to' + 'ken\\s*[:=]\\s*[^\\s"\']{8,}'].join('|'), 'gi');

let loi = 0;
for (const f of files) {
  if (!fs.existsSync(f)) { console.log('LOI ' + f + ' — chưa tồn tại'); loi++; continue; }
  const t = fs.readFileSync(f, 'utf8');
  const dong = t.split('\n');
  const coNewlineCuoi = /\n$/.test(t);
  if (coNewlineCuoi) dong.pop();
  const spaceCuoi = dong.map((l, i) => (/[ \t]+$/.test(l) ? i + 1 : 0)).filter(Boolean);
  let trongCuoi = 0;
  { const d = [...dong]; while (d.length && /^\s*$/.test(d[d.length - 1])) { d.pop(); trongCuoi++; } }
  const laLog = f.endsWith('.txt');
  const x = laLog ? [] : dong.map((l, i) => { kyLa.lastIndex = 0; const m = kyLa.exec(l); return m ? i + 1 + ':' + m[0].codePointAt(0).toString(16) : null; }).filter(Boolean);
  const nhayKhop = t.match(nhay) || [];
  if (spaceCuoi.length || trongCuoi || !coNewlineCuoi || x.length || nhayKhop.length) {
    console.log('LOI ' + f + ' spaceCuoi=' + JSON.stringify(spaceCuoi.slice(0, 6)) + ' trongCuoi=' + trongCuoi + ' EOF=' + coNewlineCuoi + ' kyLa=' + x.slice(0, 4).join(',') + ' nhayCam=' + JSON.stringify(nhayKhop.slice(0, 2)));
    loi++;
  } else {
    console.log('SACH ' + f);
  }
}
// PNG: chỉ hash nhị phân, không đọc/ghi như văn bản
const pngHash = crypto.createHash('sha256').update(fs.readFileSync(PNG)).digest('hex').slice(0, 16);
console.log('PNG  ' + PNG + ' hash=' + pngHash + ' (chỉ hash nhị phân — không xử lý như văn bản)');
console.log('TONG_LOI=' + loi);
process.exit(loi === 0 ? 0 : 1);
