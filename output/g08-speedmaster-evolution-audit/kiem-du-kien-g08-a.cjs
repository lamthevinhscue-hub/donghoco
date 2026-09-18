// G08-A — kiểm máy đề xuất dataset Speedmaster (du-kien-g08-a.json) đối chiếu hồ sơ nguồn
// Dùng: node kiem-du-kien-g08-a.cjs  (chạy từ gốc repo)
const fs = require('fs');
const path = require('path');

const DU_KIEN = 'output/g08-speedmaster-evolution-audit/du-kien-g08-a.json';
const HO_SO = 'docs/ho-so-du-lieu-tien-hoa-omega-speedmaster.md';
const ROUTES = 'src/i18n/contentRoutes.ts';

const loi = [];
const dat = (ten, ok, chiTiet) => {
  console.log(`${ok ? 'ĐẠT' : 'KHÔNG ĐẠT'} ${ten}${chiTiet ? ' — ' + chiTiet : ''}`);
  if (!ok) loi.push(ten);
};

// C1 — JSON hợp lệ
let d;
try {
  d = JSON.parse(fs.readFileSync(DU_KIEN, 'utf8'));
  dat('C1 JSON hợp lệ', true);
} catch (e) {
  dat('C1 JSON hợp lệ', false, e.message);
  process.exit(1);
}

// C2 — cấp dataset
dat('C2 slug/name/publishedLangs',
  d.slug === 'omega-speedmaster' && d.name === 'Omega Speedmaster' &&
  Array.isArray(d.publishedLangs) && d.publishedLangs.length === 2 && d.publishedLangs.includes('vi') && d.publishedLangs.includes('en'));
const capTruong = (o) => o && typeof o.vi === 'string' && o.vi.trim() !== '' && typeof o.en === 'string' && o.en.trim() !== '';
dat('C2 title/intro đủ cặp vi/en', capTruong(d.title) && capTruong(d.intro));

// C3 — từng mốc đủ trường bắt buộc
const MS = d.milestones || [];
dat('C3 số mốc ≥ 3 (lược đồ, không catalogue)', MS.length >= 3, `${MS.length} mốc`);
for (const m of MS) {
  const id = m.hoSoId || '?';
  const truong = ['reference', 'label', 'change', 'note'].filter((k) => !capTruong(m[k]));
  dat(`C3 ${id} đủ trường`, typeof m.year === 'number' && !!m.hoSoId && truong.length === 0 &&
    typeof m.sourceUrl === 'string' && m.sourceUrl.startsWith('https://') && !!m.sourceName, truong.join(','));
}

// C4 — năm tăng dần nghiêm ngặt
let tang = true;
for (let i = 1; i < MS.length; i++) if (MS[i].year <= MS[i - 1].year) tang = false;
dat('C4 năm tăng dần', tang, MS.map((m) => m.year).join(' ≤ '));

// C5 — hoSoId + sourceUrl khớp hồ sơ nguồn
const hoSo = fs.readFileSync(HO_SO, 'utf8');
const cacMuc = {};
for (const m of hoSo.split(/^### /m).slice(1)) {
  const id = (m.match(/^(N\d+)/) || [])[1];
  if (id) cacMuc[id] = m;
}
for (const m of MS) {
  const muc = cacMuc[m.hoSoId];
  if (!muc) { dat(`C5 ${m.hoSoId} có mục trong hồ sơ`, false, 'không tìm thấy'); continue; }
  const urlHoSo = (muc.match(/\| URL đã kiểm \| `([^`]+)` \|/) || [])[1];
  const urlKem = [...muc.matchAll(/`https:\/\/[^`]+`/g)].map((x) => x[0].slice(1, -1));
  dat(`C5 ${m.hoSoId} sourceUrl thuộc hồ sơ`, urlHoSo === m.sourceUrl || urlKem.includes(m.sourceUrl), m.sourceUrl);
}

// C6 — không từ cấm (giá/đầu tư/hiếm/thắng-thua/khuyến nghị…)
const CAM_VI = ['giá', 'đầu tư', 'hiếm', 'giữ giá', 'khuyến nghị', 'mua', 'rẻ', 'đắt', 'đáng giá', 'thắng', 'thua', 'sưu tầm'];
const CAM_EN = [/\bprice\b/i, /invest/i, /\brare\b/i, /\brarity\b/i, /\bvalue\b/i, /\bbuy\b/i, /\bcheap\b/i, /affordable/i, /\bgrail\b/i, /collectib/i];
let cam = 0;
for (const m of MS) {
  for (const k of ['reference', 'label', 'change', 'note']) {
    for (const lang of ['vi', 'en']) {
      const t = m[k][lang];
      if (CAM_VI.some((w) => t.includes(w)) || CAM_EN.some((re) => re.test(t))) {
        cam++;
        console.log(`  TỪ-CẤM ${m.hoSoId} ${k}.${lang}: ${t}`);
      }
    }
  }
}
dat('C6 không từ cấm', cam === 0, `${cam} khớp`);

// C7 — cặp route có sẵn (chứng minh không cần route mới)
const routes = fs.readFileSync(ROUTES, 'utf8');
dat('C7 cặp route Speedmaster có sẵn',
  routes.includes("vi: '/mau-iconic/omega-speedmaster'") && routes.includes("en: '/en/iconic-watches/omega-speedmaster/'"));

// C8 — gói G08-A không có dữ liệu nhạy cảm CÓ CẤU TRÚC credential
// (vòng sửa 1 TXN-20260918-8: từ "token" đơn lẻ trong ngữ cảnh design token CSS là vô hại —
//  logic quét dùng chung module quet-nhay-cam.cjs với tự kiểm ngoài repo, log-tu-kiem-c8.txt)
const { timNhayCam } = require('./quet-nhay-cam.cjs');
const goc = 'output/g08-speedmaster-evolution-audit';
const lietKe = (dd) => fs.readdirSync(dd, { withFileTypes: true })
  .flatMap((e) => { const p = path.join(dd, e.name); return e.isDirectory() ? lietKe(p) : [p]; });
let ranh = 0;
for (const f of lietKe(goc)) {
  const khop = timNhayCam(fs.readFileSync(f, 'utf8'));
  if (khop.length) { ranh++; console.log('  NHẠY-CẬM: ' + f + ' → ' + JSON.stringify(khop.slice(0, 3))); }
}
dat('C8 gói output không có credential có cấu trúc', ranh === 0, `${ranh} tệp`);

console.log('');
console.log(loi.length === 0 ? 'KẾT LUẬN: ĐẠT — dataset đề xuất đủ điều kiện G08-B' : `KẾT LUẬN: KHÔNG ĐẠT (${loi.length} ca)`);
process.exit(loi.length === 0 ? 0 : 1);
