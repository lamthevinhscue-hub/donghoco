#!/usr/bin/env node
// =============================================================================
// check-b3-batch1-content.mjs (B3 đợt 1, DHC-HOAN-THIEN-20261011) — kiểm nội
// dung "kiến thức video vào bài kèm nguồn" đợt 1: chống từ + chống nước.
// =============================================================================
// Câu lệnh duyệt: GPT Work TXN-20261017-82 (nền HEAD 2031976).
// Chạy RIÊNG khi nghiệm thu (không nối npm run check — giữ nguyên chuỗi ràng
// buộc thứ tự đã khóa): node scripts/check-b3-batch1-content.mjs --dist dist/
//
// Tham số:
//   --dist <dir>   bắt buộc — thư mục dist đã build để kiểm trang xuất bản.
//   --root <dir>   tùy chọn — gốc cây nguồn (mặc định cwd), dùng cho sandbox.
//   Tham số lạ hoặc thiếu --dist → thất bại có chẩn đoán (exit 2).
//
// Quy tắc:
//   N1  4 bài tồn tại; URL nguồn bắt buộc nằm TRONG khối frontmatter sources
//       của từng bài (URL ở thân bài không được tính).
//   N2  Đoạn mới đủ ở nguồn (thân bài raw) — mỗi ý có cặp VI/EN tương đương
//       về claim kèm attribution hãng trên chính đoạn đó.
//   N3  Các ý HOÃN và khung tuyệt đối KHÔNG xuất hiện (nguồn + dist):
//       4.800 A/m·gauss, 60 gauss, 125%, vòng dây dính nhau, silicon,
//       "nhiều phút mỗi ngày", "luôn chạy nhanh"/"always gains".
//   D1  Dist: trang đúng route; văn bản HIỂN THỊ thật (parse5, bỏ
//       script/style/template/comment/hidden) chứa trọn từng ý; href nguồn
//       nằm trong khối source-list (liên kết giả ở thân bài không được tính).
//   D2  Video đúng ngôn ngữ: principle_video VI/EN khác nhau theo hậu tố
//       -vi/-en và tệp tồn tại trong dist.
//
// Exit 0 = ĐẠT; exit 1 = có lỗi kiểm; exit 2 = tham số sai.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import * as parse5 from 'parse5';
import yaml from 'js-yaml';

const args = process.argv.slice(2);
let root = process.cwd();
let distDir = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--dist') distDir = args[i + 1] ?? null;
  else if (args[i] === '--root') root = args[i + 1] ?? null;
  else {
    console.log(`THAM SÁC LẠ: "${args[i]}" — chỉ nhận --dist <dir> và --root <dir>.`);
    process.exit(2);
  }
  if (args[i] === '--dist' || args[i] === '--root') i++; // bỏ qua giá trị đã tiêu thụ
}
if (!distDir || !root) {
  console.log('THIẾU THAM SỐ: cần --dist <dir> (bắt buộc) và --root <dir> (mặc định cwd).');
  process.exit(2);
}
root = join(root, '');
distDir = join(root, distDir);

const BAI = [
  {
    vi: 'src/content/coChe/vi/chong-tu.md',
    en: 'src/content/coChe/en/anti-magnetism.md',
    routeVi: 'co-che/chong-tu/index.html',
    routeEn: 'en/mechanisms/anti-magnetism/index.html',
  },
  {
    vi: 'src/content/coChe/vi/chong-nuoc.md',
    en: 'src/content/coChe/en/water-resistance.md',
    routeVi: 'co-che/chong-nuoc/index.html',
    routeEn: 'en/mechanisms/water-resistance/index.html',
  },
];

const URL_BAT_BUOC = {
  'src/content/coChe/vi/chong-tu.md': [
    'https://www.metas.admin.ch/en/watch-certification',
    'https://www.seikowatches.com/sg-en/customerservice/faq/care-maintenance-5',
    'https://press.iwc.com/iwc-schaffhausen-revisits-gerald-gentas-iconic-design-with-the-new-ingenieur-automatic-40-en/',
    'https://www.iso.org/standard/70610.html',
  ],
  'src/content/coChe/en/anti-magnetism.md': [
    'https://www.metas.admin.ch/en/watch-certification',
    'https://www.seikowatches.com/sg-en/customerservice/faq/care-maintenance-5',
    'https://press.iwc.com/iwc-schaffhausen-revisits-gerald-gentas-iconic-design-with-the-new-ingenieur-automatic-40-en/',
    'https://www.iso.org/standard/70610.html',
  ],
  'src/content/coChe/vi/chong-nuoc.md': [
    'https://www.iso.org/standard/66517.html',
    'https://oceanservice.noaa.gov/facts/pressure.html',
    'https://www.rolex.com/about-rolex/behind-the-crown/mastering-waterproofness',
  ],
  'src/content/coChe/en/water-resistance.md': [
    'https://www.iso.org/standard/66517.html',
    'https://oceanservice.noaa.gov/facts/pressure.html',
    'https://www.rolex.com/about-rolex/behind-the-crown/mastering-waterproofness',
  ],
};

// Cặp ý mới VI/EN — mảng chuỗi: TẤT CẢ phải có trong bản tương ứng.
// Đoạn có attribution: chuỗi đầu mỗi nhóm Attribution* là dấu hiệu giới hạn
// theo hãng — mất attribution → fail (mất giới hạn theo hãng).
const Y_MOI = [
  {
    ten: 'Seiko — nhiễm từ: nhanh hoặc chậm (không một chiều)',
    vi: ['Seiko mô tả chiều tác động', 'may gain or lose time', 'nhanh hoặc chậm'],
    en: ['Seiko describes the direction of the effect', 'may gain or lose time', 'fast or slow'],
  },
  {
    ten: 'Seiko — khử từ thuộc nơi chuyên môn',
    vi: ['Seiko hướng dẫn mang tới trung tâm dịch vụ', 'khử từ', 'không phải thao tác tự làm tại nhà'],
    en: ["Seiko's guidance is to have the watch demagnetized", 'demagnetization belongs to a qualified service'],
  },
  {
    ten: 'IWC — ví dụ vỏ sắt mềm (của một hãng, không mức chung)',
    vi: ['IWC mô tả trên thông cáo Ingenieur Automatic 40', 'soft-iron inner cases', 'vỏ trong bằng sắt mềm', 'không phải mức chống từ dùng chung'],
    en: ['IWC states in its March 2023 press release', 'soft-iron inner cases', 'not a shared anti-magnetic level'],
  },
  {
    ten: 'ISO 764 — vai trò chuẩn, không nêu số',
    vi: ['specifies the minimum requirements and test methods for magnetic resistant watches', 'designed to withstand daily magnetic fields'],
    en: ['specifies the minimum requirements and test methods for magnetic resistant watches', 'designed to withstand daily magnetic fields'],
  },
  {
    ten: 'METAS — thông số hiện có giữ nguyên',
    vi: ['1,5 T (15.000 gauss)'],
    en: ['1.5 T (15,000 gauss)'],
  },
  {
    ten: 'NOAA — áp suất tăng thêm xấp xỉ 1 atm mỗi ~10 m',
    vi: ['NOAA', 'Pressure increases with ocean depth', 'For every 33 feet (10.06 meters) you go down, the pressure increases by one atmosphere', 'tăng thêm xấp xỉ một áp suất khí quyển', 'không phải thước đo để suy ra'],
    en: ['NOAA', 'Pressure increases with ocean depth', 'For every 33 feet (10.06 meters) you go down, the pressure increases by one atmosphere', 'adds approximately one atmosphere', 'not a rule for inferring'],
  },
  {
    ten: 'ISO 6425 — nguồn trực tiếp 100 m + bão hòa, không suy ngược',
    vi: ['Trang chuẩn ISO 6425:2018', 'designed to withstand diving in water at depths of at least 100 m', 'đồng hồ lặn bão hòa', 'là công bố của nhà sản xuất, không suy ngược từ con số'],
    en: ['ISO 6425:2018 standard page', 'designed to withstand diving in water at depths of at least 100 m', "saturation divers' watches", "the maker's publication, not something inferred backwards"],
  },
  {
    ten: 'Rolex — van helium trong lặn bão hòa (mô tả của hãng)',
    vi: ['Rolex mô tả bối cảnh lặn bão hòa', 'atoms so tiny they can penetrate', 'a safety release valve that activates automatically when the pressure inside the case is too high', 'không phải bộ phận bắt buộc của mọi đồng hồ lặn'],
    en: ['Rolex describes the saturation-diving context', 'so tiny they can penetrate', 'a safety release valve that activates automatically when the pressure inside the case is too high', 'not a mandatory part of every dive watch'],
  },
  {
    ten: 'Bar/atm — không trình hai đơn vị bằng nhau tuyệt đối',
    vi: ['cách nói làm tròn của mục từ', 'không đồng nhất tuyệt đối'],
    en: ['a rounded way of speaking within that entry', 'not strictly identical'],
  },
  {
    ten: 'Omega — câu gioăng giữ attribution đúng (đã tách khỏi van helium)',
    vi: ['Theo Omega, khả năng chống nước được bảo đảm bởi các', 'núm vặn, nút bấm, kính và vỏ'],
    en: ['ensured by', 'seated between the', 'crown, the pushers, the crystal and the case'],
  },
];

// Ý chống từ áp cho cặp chống từ; ý còn lại áp cho cặp chống nước.
const yChongTu = (y) => ['Seiko', 'IWC', 'ISO 764', 'METAS'].some((k) => y.ten.includes(k));
const capChongTu = (b) => (URL_BAT_BUOC[b.vi] ?? []).some((u) => u.includes('care-maintenance-5'));

// Ý hoãn + khung tuyệt đối — cấm ở NGUỒN (thân bài) và DIST (văn bản hiển thị).
const HOAN = [
  { re: /4[.,]?800\s*(?:a\/m|gauss)/i, ten: '4.800 A/m hoặc 4.800 gauss (hoãn — abstract ISO không chứng minh)' },
  { re: /\b60\s*gauss/i, ten: 'quy đổi 60 gauss (hoãn)' },
  { re: /\b125\s*%/, ten: 'mức thử 125% (hoãn — không có trong abstract ISO 6425)' },
  { re: /dính vào nhau|sticks? together/i, ten: 'cơ chế vòng dây dính nhau (hoãn)' },
  { re: /silicon|hợp kim thuận từ|anti-magnetic alloy/i, ten: 'silicon / hợp kim thuận từ (hoãn)' },
  { re: /nhiều phút mỗi ngày|several minutes (?:a|per) day/i, ten: '"nhiều phút mỗi ngày" (hoãn)' },
  { re: /luôn chạy nhanh|always runs fast|always gains time|chỉ chạy nhanh|only gains time/i, ten: 'khung tuyệt đối "luôn chạy nhanh"' },
];

const loi = [];
const report = [];
const fail = (rule, ten, chiTiet) => loi.push(`[${rule}] ${ten} — ${chiTiet}`);

// ===== đọc nguồn =====
const doc = {};
for (const b of BAI) for (const f of [b.vi, b.en]) {
  const p = join(root, f);
  if (!existsSync(p)) fail('N1', f, 'thiếu tệp nguồn');
  else doc[f] = readFileSync(p, 'utf8');
}
const frontmatterOf = (t) => t.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? '';
const thanBaiOf = (t) => {
  const m = t.match(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/);
  return m ? t.slice(m[0].length) : t;
};
// Nguồn có cấu trúc: parse YAML frontmatter bằng thư viện; CHỈ nhận mảng
// `sources` (đúng khóa) và so URL TUYỆT ĐỐI với giá trị url từng phần tử.
// Khóa đổi tên (auditSources...), URL ở khóa khác (auditNote...), URL chỉ
// khớp tiền tố → không được tính.
const urlsTrongSources = (t) => {
  let data = null;
  try { data = yaml.load(frontmatterOf(t)); } catch { return null; }
  if (!data || !Array.isArray(data.sources)) return null;
  return data.sources
    .map((s) => (s && typeof s.url === 'string' ? s.url : ''))
    .filter(Boolean);
};

// N1: URL bắt buộc phải khớp tuyệt đối một phần tử của mảng sources
for (const [f, urls] of Object.entries(URL_BAT_BUOC)) {
  if (doc[f] == null) continue;
  const coMat = urlsTrongSources(doc[f]);
  if (coMat == null) { fail('N1', f, 'frontmatter không có mảng `sources` (đúng khóa)'); continue; }
  for (const u of urls) if (!coMat.includes(u)) fail('N1', f, `không có phần tử sources url khớp tuyệt đối: ${u}`);
}
if (!loi.some((e) => e.startsWith('[N1]'))) report.push(`N1: 4 bài tồn tại; ${Object.values(URL_BAT_BUOC).flat().length} URL khớp tuyệt đối phần tử mảng sources (parse YAML)`);

// N2: cặp ý mới ở nguồn + EN khớp VI về claim
let demY = 0;
for (const y of Y_MOI) {
  for (const b of BAI) {
    if (capChongTu(b) !== yChongTu(y)) continue;
    if (doc[b.vi] == null || doc[b.en] == null) continue;
    for (const mau of y.vi ?? []) {
      demY++;
      if (!thanBaiOf(doc[b.vi]).includes(mau)) fail('N2', `${b.vi} ↔ ${b.en}`, `ý "${y.ten}" thiếu chuỗi VI: "${mau}"`);
    }
    for (const mau of y.en ?? []) {
      if (!thanBaiOf(doc[b.en]).includes(mau)) fail('N2', `${b.vi} ↔ ${b.en}`, `ý "${y.ten}" thiếu chuỗi EN tương đương: "${mau}"`);
    }
  }
}
if (!loi.some((e) => e.startsWith('[N2]'))) report.push(`N2: ${Y_MOI.length} nhóm ý mới đủ ở cả VI và EN (claim + attribution tương đương, ${demY} chuỗi kiểm)`);

// ===== dist: parse5 =====
const boQua = new Set(['script', 'style', 'template', 'details', '#comment']);
const laAn = (nut) => {
  const a = nut.attrs?.find((x) => x.name === 'hidden');
  const aria = nut.attrs?.find((x) => x.name === 'aria-hidden' && x.value === 'true');
  const style = nut.attrs?.find((x) => x.name === 'style')?.value ?? '';
  return Boolean(a || aria || /display\s*:\s*none/.test(style));
};
// Chỉ lấy subtree <article> (thân bài) — loại details (phụ đề video C2, ghi
// chú nguồn) và các nút không hiển thị. Ghép node văn bản KHÔNG chèn khoảng
// trắng (autolink tách giữa câu làm sai dấu câu nếu chèn).
function timArticle(nut) {
  if (nut.nodeName === 'article') return nut;
  for (const con of nut.childNodes ?? []) {
    const kq = timArticle(con);
    if (kq) return kq;
  }
  return null;
}
function chuHienThi(nut, ra) {
  for (const con of nut.childNodes ?? []) {
    if (boQua.has(con.nodeName)) continue;
    if (laAn(con)) continue;
    if (con.nodeName === '#text') ra.push(con.value);
    else chuHienThi(con, ra);
  }
}
const chuanHoaHienThi = (s) =>
  s.join('').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/\s+/g, ' ');
const docDist = {};
for (const b of BAI) for (const [f, route] of [[b.vi, b.routeVi], [b.en, b.routeEn]]) {
  const p = join(distDir, route);
  if (!existsSync(p)) { fail('D1', f, `dist thiếu trang: ${route}`); continue; }
  const html = readFileSync(p, 'utf8');
  const article = timArticle(parse5.parse(html));
  if (!article) { fail('D1', f, `dist ${route} không tìm thấy <article>`); continue; }
  const ra = [];
  chuHienThi(article, ra);
  docDist[f] = { html, article, hienThi: chuanHoaHienThi(ra) };
}
// Source-list PHẢI là section có class token `source-list` nằm TRONG đúng
// article; đường đi từ article tới section không được xuyên qua nút ẩn
// (hidden/display:none/aria-hidden) — bọc section trong div hidden → không
// tính. Chỉ đếm <a href> thật (bỏ script/template/hidden).
const timSourceListTrongArticle = (article) => {
  const duyet = (nut) => {
    if (boQua.has(nut.nodeName) || laAn(nut)) return null;
    if (nut.nodeName === 'section') {
      const cls = (nut.attrs?.find((x) => x.name === 'class')?.value ?? '').split(/\s+/);
      if (cls.includes('source-list')) return nut;
    }
    for (const con of nut.childNodes ?? []) { const k = duyet(con); if (k) return k; }
    return null;
  };
  return duyet(article);
};
const hrefsTrong = (goc) => {
  const ra = [];
  const duyet = (nut) => {
    if (boQua.has(nut.nodeName) || laAn(nut)) return;
    if (nut.nodeName === 'a') {
      const href = nut.attrs?.find((x) => x.name === 'href')?.value;
      if (href) ra.push(href);
    }
    for (const con of nut.childNodes ?? []) duyet(con);
  };
  duyet(goc);
  return ra;
};
// Src video render THẬT trong article (thẻ video/source)
const srcVideoTrongArticle = (article) => {
  const ra = [];
  const duyet = (nut) => {
    if (boQua.has(nut.nodeName) || laAn(nut)) return;
    if (nut.nodeName === 'video' || nut.nodeName === 'source') {
      const src = nut.attrs?.find((x) => x.name === 'src')?.value;
      if (src) ra.push(src);
    }
    for (const con of nut.childNodes ?? []) duyet(con);
  };
  duyet(article);
  return ra;
};

// D1: văn bản hiển thị + source-list href (section.source-list trong article)
for (const b of BAI) {
  for (const f of [b.vi, b.en]) {
    const d = docDist[f];
    if (!d) continue;
    for (const y of Y_MOI) {
      if (capChongTu(b) !== yChongTu(y)) continue;
      const nhom = f === b.vi ? (y.vi ?? []) : (y.en ?? []);
      for (const mau of nhom) {
        if (!d.hienThi.includes(mau.replace(/\s+/g, ' '))) {
          fail('D1', f, `văn bản hiển thị dist thiếu ý "${y.ten}": "${mau}"`);
        }
      }
    }
    const sourceList = timSourceListTrongArticle(d.article);
    if (!sourceList) { fail('D1', f, 'article không chứa section có class token source-list'); continue; }
    const hrefs = hrefsTrong(sourceList);
    for (const u of URL_BAT_BUOC[f]) {
      if (!hrefs.includes(u)) fail('D1', f, `source-list (trong article) thiếu href: ${u}`);
    }
  }
}
if (!loi.some((e) => e.startsWith('[D1]'))) report.push(`D1: 4 trang dist đúng route; văn bản hiển thị chứa trọn các ý; source-list chứa href nguồn thật`);

// N3: ý hoãn + khung tuyệt đối — nguồn (thân bài) và dist (hiển thị)
for (const b of BAI) {
  for (const f of [b.vi, b.en]) {
    if (doc[f] != null) {
      const than = thanBaiOf(doc[f]);
      for (const { re, ten } of HOAN) if (re.test(than)) fail('N3', f, `ý hoãn/khung tuyệt đối xuất hiện: ${ten}`);
    }
    const d = docDist[f];
    if (d) for (const { re, ten } of HOAN) if (re.test(d.hienThi)) fail('N3', f, `dist hiển thị ý hoãn/khung tuyệt đối: ${ten}`);
  }
}
if (!loi.some((e) => e.startsWith('[N3]'))) report.push(`N3: ${HOAN.length} nhóm ý hoãn/khung tuyệt đối vắng mặt ở cả nguồn và dist`);

// D2: video đúng ngôn ngữ — frontmatter + tệp dist + src render THẬT trong article
for (const b of BAI) {
  const videoOf = (f) => frontmatterOf(doc[f] ?? '').match(/^principle_video:\s*"?([^"\n]+)"?/m)?.[1];
  const vVi = videoOf(b.vi);
  const vEn = videoOf(b.en);
  if (!vVi || !vEn) { fail('D2', b.vi, 'thiếu principle_video'); continue; }
  if (vVi === vEn) fail('D2', b.vi, 'VI và EN dùng chung một tệp video');
  if (!/-vi\.\w+$/.test(vVi)) fail('D2', b.vi, `video VI không có hậu tố -vi: ${vVi}`);
  if (!/-en\.\w+$/.test(vEn)) fail('D2', b.en, `video EN không có hậu tố -en: ${vEn}`);
  for (const [v, f] of [[vVi, b.vi], [vEn, b.en]]) {
    const p = join(distDir, v.replace(/^\//, ''));
    if (!existsSync(p)) fail('D2', f, `dist thiếu tệp video: ${v}`);
    const d = docDist[f];
    if (d) {
      const src = srcVideoTrongArticle(d.article);
      if (!src.includes(v)) fail('D2', f, `article không render video đúng bài (${v}); src thấy: ${src.join(', ') || 'không có'}`);
    }
  }
}
if (!loi.some((e) => e.startsWith('[D2]'))) report.push('D2: video VI/EN khác hậu tố, tệp tồn tại trong dist, article render đúng src theo ngôn ngữ');

// ===== kết luận =====
console.log('KIỂM TRA B3 ĐỢT 1 (CHỐNG TỪ + CHỐNG NƯỚC — KIẾN THỨC VIDEO KÈM NGUỒN):');
console.log(`  root=${root}`);
console.log(`  dist=${distDir}`);
for (const line of report) console.log(`  ${line}`);
if (loi.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of loi) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — đợt 1 khớp bảng nguồn, không đưa ý hoãn, EN khớp VI.');
