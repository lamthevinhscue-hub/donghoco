// G08-A — sweep định dạng + JSON + ký tự lạ trên đúng tệp gói G08-A
// Dùng: node sweep-g08-a.cjs  (chạy từ gốc repo)
const fs = require('fs');

const files = [
  'docs/ho-so-du-lieu-tien-hoa-omega-speedmaster.md',
  'docs/nghiem-thu/G08-A-kiem-ke-tien-hoa-speedmaster-2026-09-18.md',
  'output/g08-speedmaster-evolution-audit/du-kien-g08-a.json',
  'output/g08-speedmaster-evolution-audit/kiem-du-kien-g08-a.cjs',
  'output/g08-speedmaster-evolution-audit/quet-nhay-cam.cjs',
  'output/g08-speedmaster-evolution-audit/log-build-nen.txt',
  'output/g08-speedmaster-evolution-audit/log-english-nen.txt',
  'output/g08-speedmaster-evolution-audit/log-kiem-du-kien.txt',
  'output/g08-speedmaster-evolution-audit/log-sweep-g08-a.txt',
];

// ký tự ngoài dải Latin/Việt/dấu câu phổ biến
const kyLa = new RegExp('[^\\u0000-\\u024F\\u1E00-\\u1EFF\\u2018\\u2019\\u201C\\u201D\\u2013\\u2014\\u2026\\u00D7\\u00B0\\u2212\\u2192\\u2260\\u2264\\u2265\\s\\x20-\\x7E]', 'g');

let loi = 0;
for (const f of files) {
  if (!fs.existsSync(f)) { console.log('LOI ' + f + ' — tệp chưa tồn tại (log sweep tự gồm chính nó)'); continue; }
  const t = fs.readFileSync(f, 'utf8');
  const dong = t.split('\n');
  const coNewlineCuoi = /\n$/.test(t);
  if (coNewlineCuoi) dong.pop();
  const spaceCuoi = dong.map((l, i) => (/[ \t]+$/.test(l) ? i + 1 : 0)).filter(Boolean);
  const trongCuoi = (() => { let n = 0; const d = [...dong]; while (d.length && /^\s*$/.test(d[d.length - 1])) { d.pop(); n++; } return n; })();
  const laJson = f.endsWith('.json');
  let jsonOk = true;
  if (laJson) { try { JSON.parse(t); } catch (e) { jsonOk = false; console.log('  JSON-LOI: ' + e.message); } }
  // ký tự lạ chỉ áp dụng tệp mình soạn (md/json/cjs) — log là nguyên văn đầu ra công cụ, không sửa nội dung
  const x = f.endsWith('.txt') ? [] : dong.map((l, i) => { kyLa.lastIndex = 0; const m = kyLa.exec(l); return m ? i + 1 + ':' + m[0].codePointAt(0).toString(16) : null; }).filter(Boolean);
  if (spaceCuoi.length || trongCuoi || !coNewlineCuoi || !jsonOk || x.length) {
    console.log('LOI ' + f + ' spaceCuoi=' + JSON.stringify(spaceCuoi.slice(0, 8)) + ' trongCuoi=' + trongCuoi +
      ' EOF=' + coNewlineCuoi + ' kyLa=' + x.slice(0, 5).join(','));
    loi++;
  } else {
    console.log('SACH ' + f + (laJson ? ' (JSON hợp lệ)' : ''));
  }
}
console.log('TONG_LOI=' + loi);
process.exit(loi === 0 ? 0 : 1);
