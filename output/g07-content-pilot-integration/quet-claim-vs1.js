// G07 vòng sửa 1 (TXN-20260917-24) — quét claim cấm trên src/content hoặc dist
// Dùng: node quet-claim-vs1.js <src|dist>
import fs from 'node:fs';
import path from 'node:path';

const goc = process.argv[2] === 'dist' ? 'dist' : 'src/content';

// [mã, regex, ghi-chú-phạm-vi]
const CAN = [
  ['T1', /Bức tường Berlin/g, 'Tangente — phải = 0; nơi khác chỉ báo cáo'],
  ['T2', /lập ngay sau khi/g, 'Tangente — phải = 0'],
  ['T3', /Roland Schwertner/g, 'Tangente — phải = 0'],
  ['T4', /Bộ sưu tập đầu tiên ra mắt năm 1992/g, 'Tangente — phải = 0'],
  ['T5', /năm 1990/g, 'Tangente — phải = 0; nơi khác chỉ báo cáo'],
  ['J1', /sản xuất liên tục/g, 'Junghans — phải = 0 toàn site'],
  ['J2', /vẫn bán được/g, 'Junghans — phải = 0 toàn site'],
  ['J3', /chứng nhận của thời gian/g, 'Junghans — phải = 0 toàn site'],
  ['J4', /phần lớn dùng nền mua ngoài/g, 'Junghans — phải = 0 toàn site'],
  ['J5', /bộ máy không phải thế mạnh/g, 'Junghans — phải = 0 toàn site'],
  ['J6', /gần như không đổi/g, 'max bill — phải = 0; nơi khác chỉ báo cáo'],
  ['J7', /gần như không thay đổi/g, 'max bill — phải = 0; nơi khác chỉ báo cáo'],
  ['H1', /mức tự chủ cao nhất/g, 'HD3 — phải = 0 toàn site'],
  ['H2', /còn ít hãng hơn nữa/g, 'HD3 — phải = 0 toàn site'],
  ['H3', /đó là cách dùng chung trong ngành/g, 'HD3 — phải = 0 toàn site'],
  ['N1', /rất ít hãng ở tầm giá này/g, 'vòng sửa 2 — Tangente phải = 0; nơi khác chỉ báo cáo'],
  ['N2', /nhà chế tác thật/g, 'vòng sửa 2 — phải = 0 toàn site'],
  ['N3', /biểu hiện rõ nhất/g, 'vòng sửa 2 — phải = 0 toàn site'],
  ['N4', /vượt trội/g, 'vòng sửa 2 — phải = 0 toàn site'],
  ['N5', /nền mua ngoài/g, 'vòng sửa 2 — Tangente phải = 0; nơi khác chỉ báo cáo'],
  ['N6', /Tangente hưởng lợi/g, 'vòng sửa 2 — phải = 0 toàn site'],
];

const ketQua = [];
const dem = {};
const duyet = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) duyet(p);
    else if (e.name.endsWith('.html') || e.name.endsWith('.md')) {
      const t = fs.readFileSync(p, 'utf8');
      const dong = t.split(/\r?\n/);
      dong.forEach((l, i) => {
        for (const [ma, re, ghiChu] of CAN) {
          re.lastIndex = 0;
          if (re.test(l)) {
            dem[ma] = (dem[ma] || 0) + 1;
            ketQua.push(`${ma} ${p.split(path.sep).join('/')}:${i + 1} ${ghiChu}\n    ${l.trim().replace(/\s+/g, ' ').slice(0, 160)}`);
          }
        }
      });
    }
  }
};
duyet(goc);

console.log('QUÉT: ' + goc);
console.log('Tổng số dòng khớp: ' + ketQua.length);
for (const [ma] of CAN) console.log(`  ${ma}: ${dem[ma] || 0}`);
console.log('');
console.log(ketQua.length === 0 ? 'SẠCH — 0 khớp' : ketQua.join('\n'));
