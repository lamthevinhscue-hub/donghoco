// Sweep định dạng vòng sửa 1: trailing whitespace, EOF newline, ký tự lạ (tệp src)
import fs from 'node:fs';

const files = [
  'src/content/mauIconic/vi/nomos-tangente.md',
  'src/content/mauIconic/vi/junghans-max-bill.md',
  'src/content/coChe/vi/bo-may-in-house.md',
  'CAN-KIEM-CHUNG.md',
  'docs/nghiem-thu/G07-tich-hop-dot-thu-noi-dung-2026-09-15.md',
  'output/g07-content-pilot-integration/pw-g07-vs1.js',
  'output/g07-content-pilot-integration/pw-g07-vs2.js',
  'output/g07-content-pilot-integration/pw-g07-vs3.js',
  'output/g07-content-pilot-integration/quet-claim-vs1.js',
  'output/g07-content-pilot-integration/quet-claim-vs3.js',
  'output/g07-content-pilot-integration/pw-g07-nen.js',
  'output/g07-content-pilot-integration/pw-g07-tai-kiem.js',
];

// ký tự ngoài dải Latin/gây cấu trúc phổ biến — chỉ áp dụng tệp nội dung src
const kyLa = new RegExp('[^\\u0000-\\u024F\\u1E00-\\u1EFF\\u2018\\u2019\\u201C\\u201D\\u2013\\u2014\\u2026\\u00D7\\u00B0\\u2212\\u2192\\u2260\\u2264\\u2265\\s\\x20-\\x7E]', 'g');

let loi = 0;
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const dong = t.split(/\r?\n/);
  const spaceCuoi = dong.map((l, i) => (/[ \t]+$/.test(l) ? i + 1 : 0)).filter(Boolean);
  const eof = t.endsWith('\n');
  if (spaceCuoi.length || !eof) {
    console.log('LOI ' + f + ' spaceCuoi=' + JSON.stringify(spaceCuoi) + ' EOF=' + eof);
    loi++;
  } else {
    console.log('SACH ' + f);
  }
  if (f.startsWith('src/')) {
    const x = dong
      .map((l, i) => {
        kyLa.lastIndex = 0;
        const m = kyLa.exec(l);
        return m ? i + 1 + ':' + m[0].codePointAt(0).toString(16) : null;
      })
      .filter(Boolean);
    if (x.length) {
      console.log('  KYTU-LA ' + f + ' ' + x.slice(0, 5).join(', '));
      loi++;
    } else {
      console.log('  KYTU: sach');
    }
  }
}
console.log('TONG_LOI=' + loi);
