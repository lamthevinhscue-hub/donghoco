// G07 vòng sửa 3 (kế tục TXN-20260917-27) — quét claim cấm hai chiều liên kết HD3 ↔ Tangente
// Dùng: node quet-claim-vs3.js <src|dist>
//   src  = 2 tệp nguồn (bo-may-in-house.md, nomos-tangente.md)
//   dist = 2 route đã build (co-che/bo-may-in-house, mau-iconic/nomos-tangente)
import fs from 'node:fs';

const cheDo = process.argv[2] === 'dist' ? 'dist' : 'src';
const TEP =
  cheDo === 'dist'
    ? ['dist/co-che/bo-may-in-house/index.html', 'dist/mau-iconic/nomos-tangente/index.html']
    : ['src/content/coChe/vi/bo-may-in-house.md', 'src/content/mauIconic/vi/nomos-tangente.md'];

// [mã, regex, ghi-chú]
const CAN = [
  ['V3-1', /hưởng lợi/g, 'từ cấm vòng 3 — phải = 0'],
  ['V3-2', /biểu hiện rõ nhất/g, 'cụm cấm vòng 3 — phải = 0'],
  ['V3-3', /hiện ra rõ nhất/g, 'biến thể cùng ý (đã gỡ bo-may-in-house dòng 36) — phải = 0'],
  ['V3-4', /vượt trội/g, 'từ cấm vòng 3 — phải = 0'],
  ['N1', /rất ít hãng ở tầm giá này/g, 'hồi quy vòng 2 — Tangente phải = 0'],
  ['N2', /nhà chế tác thật/g, 'hồi quy vòng 2 — phải = 0'],
  ['N5', /nền mua ngoài/g, 'hồi quy vòng 2 — Tangente phải = 0'],
  ['N6', /Tangente hưởng lợi/g, 'hồi quy vòng 2 — phải = 0'],
];

// Relation hai chiều phải đúng văn bản trung tính đã duyệt
const RELATION = [
  ['bo-may-in-house.md relatedModels → nomos-tangente',
   'Bài dùng Tangente làm ví dụ có nguồn để giải thích khái niệm in-house.'],
  ['nomos-tangente.md relatedMechanisms → bo-may-in-house',
   'Bài giải thích khái niệm in-house và giới hạn của khái niệm'],
];

let tongKhop = 0;
const chiTiet = [];
for (const tep of TEP) {
  if (!fs.existsSync(tep)) {
    console.log(`KHÔNG TÌM THẤY: ${tep}`);
    process.exit(1);
  }
  const t = fs.readFileSync(tep, 'utf8');
  const dong = t.split(/\r?\n/);
  dong.forEach((l, i) => {
    for (const [ma, re, ghiChu] of CAN) {
      re.lastIndex = 0;
      if (re.test(l)) {
        tongKhop++;
        chiTiet.push(`${ma} ${tep}:${i + 1} ${ghiChu}\n    ${l.trim().replace(/\s+/g, ' ').slice(0, 160)}`);
      }
    }
  });
}

// Kiểm relation (chỉ ở tầng src)
let relationOK = true;
if (cheDo === 'src') {
  const boMay = fs.readFileSync('src/content/coChe/vi/bo-may-in-house.md', 'utf8');
  const tangente = fs.readFileSync('src/content/mauIconic/vi/nomos-tangente.md', 'utf8');
  for (const [ten, vanBan] of RELATION) {
    const nguon = ten.startsWith('bo-may') ? boMay : tangente;
    const dung = nguon.includes(vanBan);
    console.log(`RELATION ${dung ? 'ĐÚNG' : 'SAI'} — ${ten}: "${vanBan}"`);
    if (!dung) relationOK = false;
  }
}

console.log('');
console.log(`QUÉT (${cheDo}): ${TEP.join(', ')}`);
console.log('Tổng số dòng khớp claim cấm: ' + tongKhop);
for (const [ma, , ghiChu] of CAN) {
  const so = chiTiet.filter((d) => d.startsWith(ma + ' ')).length;
  console.log(`  ${ma}: ${so}  (${ghiChu})`);
}
if (chiTiet.length) console.log('\n' + chiTiet.join('\n'));
const dat = tongKhop === 0 && relationOK;
console.log('');
console.log(dat ? 'KẾT LUẬN: ĐẠT — 0 cụm cấm' + (cheDo === 'src' ? ', relation hai chiều đúng văn bản trung tính' : '') : 'KẾT LUẬN: KHÔNG ĐẠT');
process.exit(dat ? 0 : 1);
