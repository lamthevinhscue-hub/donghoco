// G08-B — mutation sandbox M1–M5 (TXN-20260919-1)
// Mỗi ca: đọc nội dung gốc vào bộ nhớ → biến đổi → checker phải exit 1 ĐÚNG rule →
// ghi lại nguyên văn nội dung gốc → hash sau == hash trước → checker sạch.
// Chạy: node mutation-m1-m5.cjs (từ gốc repo)
const fs = require('fs');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const DATASET = 'src/data/omegaSpeedmasterEvolution.ts';
const hash = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex').slice(0, 16);
const chay = (lenh, thamSo) => {
  try {
    return { code: 0, out: execFileSync(lenh, thamSo, { encoding: 'utf8' }) };
  } catch (e) {
    return { code: e.status ?? null, out: String(e.stdout || '') + String(e.stderr || '') };
  }
};

const ketQua = [];
let loi = 0;
const chayCa = (ma, moTa, tep, bienDoi, checker, ruleBats) => {
  const truoc = hash(tep);
  const goc = fs.readFileSync(tep, 'utf8');
  fs.writeFileSync(tep, bienDoi(goc));
  const cacKq = checker.map((c) => chay(c[0], c.slice(1)));
  fs.writeFileSync(tep, goc); // hoàn nguyên CHÍNH XÁC từ nội dung gốc đã đọc
  const hoanNguyen = hash(tep) === truoc;
  const bat = cacKq.every((kq, i) => kq.code === 1 && kq.out.includes(ruleBats[i]));
  const ok = bat && hoanNguyen;
  if (!ok) loi++;
  const chiTiet = ok ? '' : '\n    ' + cacKq.map((kq) => kq.out.split('\n').filter((l) => l.includes('LỖI') || l.includes('KHÔNG ĐẠT')).slice(0, 2).join(' | ')).join(' ~~ ');
  ketQua.push(`${ok ? 'ĐẠT' : 'KHONG_DAT'} ${ma} ${moTa} — checker exit=${cacKq.map((kq) => kq.code).join('/')} bắt-đúng-rule=${bat} hoàn-nguyên-hash=${hoanNguyen}${chiTiet}`);
};

// M1 — thiếu nguồn: xóa sourceUrl mốc N5 → check-evolution-data bắt "thiếu trường sourceUrl"
chayCa('M1', 'thiếu nguồn (N5 mất sourceUrl)', DATASET,
  (t) => t.replace("      sourceUrl: 'https://www.omegawatches.com/chronicle/1969-the-first-journey-to-the-moon',\n", ''),
  [['node', 'scripts/check-evolution-data.mjs']],
  ['thiếu trường sourceUrl']);

// M2 — lệch EN: đổi "14-second" → "40-second" → checker G08 bắt G2 (lệch hồ sơ từng trường)
chayCa('M2', 'lệch EN (N6 change 14→40)', DATASET,
  (t) => t.replace('time a 14-second burn aligning the craft', 'time a 40-second burn aligning the craft'),
  [['node', 'scripts/check-g08-speedmaster-evolution.cjs']],
  ['KHÔNG ĐẠT G2 mốc N6']);

// M3 — đảo năm: hoán đổi 1957 và 1962 → check-evolution-data bắt thứ tự thời gian
chayCa('M3', 'đảo năm (hoán đổi 1957 và 1962)', DATASET,
  (t) => t
    .replace('      // N1 — 1957\n      year: 1957,', '      // N1 — 1957\n      year: 1962,')
    .replace('      // N2 — 1962\n      year: 1962,', '      // N2 — 1962\n      year: 1957,'),
  [['node', 'scripts/check-evolution-data.mjs']],
  ['đứng sau mốc']);

// M4a — thiếu `en`: bỏ dòng en của label N5 → checker G08 bắt G2 (label lệch hồ sơ)
chayCa('M4a', 'thiếu en (label N5 mất en)', DATASET,
  (t) => t.replace("      label: {\n        vi: 'Moonwatch',\n        en: 'Moonwatch',\n      },", "      label: {\n        vi: 'Moonwatch',\n      },"),
  [['node', 'scripts/check-g08-speedmaster-evolution.cjs']],
  ['KHÔNG ĐẠT G2 mốc N5']);

// M4b/M5 — trùng slug + xuất hiện sai route: slug → 'rolex-submariner'
chayCa('M4b/M5', 'trùng slug + sai route (slug → rolex-submariner)', DATASET,
  (t) => t.replace("slug: 'omega-speedmaster'", "slug: 'rolex-submariner'"),
  [
    ['node', 'scripts/check-g08-speedmaster-evolution.cjs'],
    ['node', 'scripts/check-evolution-routes.mjs'],
  ],
  ['KHÔNG ĐẠT G4', 'LỖI']);

// M6 — vòng sửa 1 (TXN-20260919-4): chèn lại "105.012" vào frontmatter references (bài VI)
// → checker G08 phải fail đúng rule G7a → hoàn nguyên hash → đạt lại
chayCa('M6', 'chèn lại 105.012 vào frontmatter (bài VI)', 'src/content/mauIconic/vi/omega-speedmaster.md',
  (t) => t.replace('references: ["CK2915", "3570.50", "310.30.42"]', 'references: ["CK2915", "105.012", "3570.50", "310.30.42"]'),
  [['node', 'scripts/check-g08-speedmaster-evolution.cjs']],
  ['KHÔNG ĐẠT G7a']);

// Sạch sau toàn bộ: checker G08 phải exit 0
const cuoi = chay('node', ['scripts/check-g08-speedmaster-evolution.cjs']);
ketQua.push(`${cuoi.code === 0 ? 'ĐẠT' : 'KHONG_DAT'} sạch-cuối — checker G08 exit=${cuoi.code} sau hoàn nguyên`);
if (cuoi.code !== 0) loi++;

console.log(ketQua.join('\n'));
console.log('');
console.log(loi === 0 ? 'KẾT LUẬN: ĐẠT — 6 mutation đều lỗi đúng rule, hoàn nguyên hash khớp' : `KẾT LUẬN: KHÔNG ĐẠT (${loi} ca)`);
process.exit(loi === 0 ? 0 : 1);
