// MD1 — phép kiểm chuẩn bằng chứng di trú Markdown: glossary autolink + bọc bảng tĩnh
// Chạy: node kiem-md1.mjs <dist>
// R1: 6 trang có bảng Markdown được bọc tại build (wrapper tĩnh + tabIndex + role + aria-label)
// R2: 2 bài glossary có link autolink đúng ngôn ngữ (VI có tooltip, EN không tooltip VI)
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] || 'dist';
const TRANG_BANG = [
  '/huong-dan/len-day-dong-ho/',
  '/en/guides/winding-a-mechanical-watch/',
  '/mau-iconic/panerai-luminor/',
  '/mau-iconic/seagull-1963/',
  '/thuong-hieu/panerai/',
  '/thuong-hieu/seagull/',
];
const GOI = [
  { trang: '/co-che/bo-thoat/', motSo: 'vi', hrefDau: '/tu-dien/', tooltip: true },
  { trang: '/en/mechanisms/escapement/', motSo: 'en', hrefDau: '/en/glossary/', tooltip: false },
];

const loi = [];
let soWrapper = 0, soGlossary = 0;

for (const t of TRANG_BANG) {
  const h = readFileSync(join(dist, t, 'index.html'), 'utf8');
  const marks = [...h.matchAll(/<div class="table-scroll-wrap overflow-x-auto" tabindex="0" role="region" aria-label="([^"]*)"/g)];
  soWrapper += marks.length;
  if (marks.length === 0) loi.push(`R1 ${t}: KHÔNG có wrapper bảng bọc tại build`);
  for (const m of marks) {
    const laVi = m[1].startsWith('Bảng dữ liệu');
    const laEn = m[1].startsWith('Data table');
    const laDungNgonNgu = t.startsWith('/en/') ? laEn : laVi;
    if (!laDungNgonNgu) loi.push(`R1 ${t}: nhãn aria sai ngôn ngữ (${m[1].slice(0, 40)}…)`);
  }
}

for (const g of GOI) {
  const h = readFileSync(join(dist, g.trang, 'index.html'), 'utf8');
  const links = [...h.matchAll(/<a href="(\/[^"]*)"( title="[^"]*")? class="glossary-autolink">/g)];
  soGlossary += links.length;
  if (links.length === 0) loi.push(`R2 ${g.trang}: KHÔNG có link glossary-autolink`);
  for (const l of links) {
    if (!l[1].startsWith(g.hrefDau)) loi.push(`R2 ${g.trang}: đích glossary sai ngôn ngữ (${l[1]})`);
    const coTooltip = Boolean(l[2]);
    if (g.tooltip && !coTooltip) loi.push(`R2 ${g.trang}: thiếu tooltip VI (${l[1]})`);
    if (!g.tooltip && coTooltip) loi.push(`R2 ${g.trang}: có tooltip không mong đợi (${l[1]})`);
  }
}

console.log(`KIỂM MD1: ${soWrapper} wrapper bảng tĩnh / 6 trang bảng · ${soGlossary} link glossary / 2 bài`);
if (loi.length) {
  console.log('THẤT BẠI:');
  for (const l of loi) console.log('  LỖI ' + l);
  process.exit(1);
}
console.log('KẾT LUẬN: ĐẠT — glossary autolink + bọc bảng tại build giữ nguyên hành vi.');
