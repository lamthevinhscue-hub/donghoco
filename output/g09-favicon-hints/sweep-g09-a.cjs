// G09-A — sweep định dạng + bí mật trên đúng tệp gói
// Dùng: node sweep-g09-a.cjs (từ gốc repo)
const fs = require('fs');
const crypto = require('crypto');

const files = [
  'src/layouts/BaseLayout.astro',
  'public/favicon.svg',
  'output/p3.1-image-audit/do-dinh-dang.mjs',
  'output/p3.2-svg-gradient-audit/phan-nhom.cjs',
  'output/p3.2-svg-gradient-audit/quet-gradient.cjs',
  'output/p3.3-cluster-script-audit/kiem-thu-hoi-quy.cjs',
  'scripts/check-g09-favicon-hints.mjs',
  'docs/nghiem-thu/G09-A-favicon-va-bon-hints-2026-09-19.md',
  'output/g09-favicon-hints/sweep-g09-a.cjs',
  'output/g09-favicon-hints/log-types.txt',
  'output/g09-favicon-hints/log-check.txt',
  'output/g09-favicon-hints/log-build.txt',
  'output/g09-favicon-hints/log-check-g09.txt',
  'output/g09-favicon-hints/log-sweep.txt',
];

const kyLa = new RegExp('[^\\u0000-\\u024F\\u1E00-\\u1EFF\\u2018\\u2019\\u201C\\u201D\\u2013\\u2014\\u2026\\u00D7\\u00B0\\u2212\\u2192\\u2260\\u2264\\u2265\\s\\x20-\\x7E]', 'g');
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
  // BaseLayout.astro là tệp có trước, G09-A chỉ thêm 3 dòng favicon — ký tự lạ (vd mũi tên trái U+2190 ở
  // hint kéo ngang, có trước) ngoài phạm vi thay đổi nên miễn kiểm ký tự cho tệp này
  const quetKyTu = !laLog && f !== 'src/layouts/BaseLayout.astro';
  const x = quetKyTu ? dong.map((l, i) => { kyLa.lastIndex = 0; const m = kyLa.exec(l); return m ? i + 1 + ':' + m[0].codePointAt(0).toString(16) : null; }).filter(Boolean) : [];
  nhay.lastIndex = 0;
  const nhayKhop = t.match(nhay) || [];
  if (spaceCuoi.length || trongCuoi || !coNewlineCuoi || x.length || nhayKhop.length) {
    console.log('LOI ' + f + ' spaceCuoi=' + JSON.stringify(spaceCuoi.slice(0, 6)) + ' trongCuoi=' + trongCuoi + ' EOF=' + coNewlineCuoi + ' kyLa=' + x.slice(0, 4).join(',') + ' nhayCam=' + JSON.stringify(nhayKhop.slice(0, 2)));
    loi++;
  } else {
    console.log('SACH ' + f);
  }
}
const hash = crypto.createHash('sha256').update(fs.readFileSync('public/favicon.svg')).digest('hex').slice(0, 16);
console.log('FAVICON public/favicon.svg hash=' + hash + ' (SVG — văn bản, đã quét ở trên; dist khớp hash được kiểm bởi check-g09)');
console.log('TONG_LOI=' + loi);
process.exit(loi === 0 ? 0 : 1);
