#!/usr/bin/env node
// =============================================================================
// check-b3-batch2-content.mjs (B3 đợt 2, DHC-HOAN-THIEN-20261011) — kiểm nội
// dung "kiến thức video vào bài kèm nguồn" đợt 2: GMT + dạ quang.
// =============================================================================
// Câu lệnh duyệt: GPT Work TXN-20261017-87 + vòng sửa tối hẹp sau tái nghiệm
// TXN-20261017-88: bỏ suy luận cấu tạo pinion, bỏ suy luận nhân quả radium,
// bán rã là khoảng thời gian (không phải tốc độ), mô tả ống khí tritium cụ thể
// thay khái quát "không còn dạng sơn", trích nguyên văn dài về bảng nguồn.
// Chạy RIÊNG khi nghiệm thu (không nối npm run check — giữ nguyên chuỗi ràng
// buộc thứ tự đã khóa): node scripts/check-b3-batch2-content.mjs --dist dist/
//
// Tham số:
//   KHÔNG có --dist: chỉ kiểm NGUỒN (N1/N2/N3-phần nguồn) — dùng cho sandbox
//                    và soát nhanh; có --dist <dir>: kiểm thêm dist (D1/D2,
//                    N3-phần dist).
//   --root <dir>     tùy chọn — gốc cây nguồn (mặc định cwd), dùng cho sandbox.
//   Giá trị thiếu hoặc là cờ khác (ví dụ `--dist --root`) → lỗi tham số rõ,
//   exit 2. Tham số lạ → exit 2.
//
// Quy tắc:
//   N1  4 bài tồn tại; URL nguồn bắt buộc nằm TRONG khối frontmatter sources
//       của từng bài (URL ở thân bài không được tính).
//   N2  Đoạn mới đủ ở nguồn — so trên văn bản HIỂN THỊ của thân bài (parse5
//       bỏ script/style/template/comment/nút ẩn): nội dung chỉ còn trong
//       comment hay thẻ ẩn không được dùng bù ý hoặc attribution. Mỗi ý có
//       cặp VI/EN tương đương về claim kèm attribution; không khóa bài VI
//       vào câu tiếng Anh nguyên văn (trích dài nằm ở bảng nguồn).
//   N3  Các ý HOÃN, khung tuyệt đối và diễn đạt đã bỏ KHÔNG xuất hiện
//       (nguồn + dist): 1954/1983, Caller/Flyer/mọi GMT, 2:1, lỗi nhãn
//       "radians" (quét cả frontmatter), "những người đầu tiên", "hoàn toàn
//       an toàn", "an toàn trong điều kiện đeo", "ngưỡng an toàn", "chứng
//       nhận an toàn", khẳng định ISO 3157 còn hiện hành, "tùy chất cấu
//       thành", mắt cảm nhận màu (CAN-KIEM 69), công thức LumiNova
//       (CAN-KIEM 70), "mãi mãi", pinion/bánh răng trung gian, "lý do ngành
//       đồng hồ từ bỏ radium", bán rã = tốc độ/rate, "không còn dạng sơn",
//       hai mức làm tròn 12,3/12,32 cạnh nhau, trích nguyên văn trong thân bài.
//   D1  Dist: trang đúng route; <article> được tìm bằng cách BỎ cả subtree
//       có nút ẩn (tổ tiên hoặc chính article ẩn → không chọn); văn bản
//       HIỂN THỊ thật chứa trọn từng ý; href nguồn nằm trong khối
//       source-list (liên kết giả ở thân bài không được tính).
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
// Giá trị của --dist/--root phải tồn tại và không được là cờ khác
// (ví dụ `--dist --root x` là sai tham số, không nuốt "--root" làm giá trị).
const giaTriCua = (vi) => {
  const v = args[vi + 1];
  if (v == null || v === '' || v.startsWith('--')) {
    console.log(`THAM SỐ SAI: ${args[vi]} cần một giá trị thư mục; nhận được: ${v == null ? '(hết đối số)' : `"${v}" (là cờ)`}.`);
    process.exit(2);
  }
  return v;
};
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--dist') { distDir = giaTriCua(i); i++; }
  else if (args[i] === '--root') { root = giaTriCua(i); i++; }
  else {
    console.log(`THAM SẠC LẠ: "${args[i]}" — chỉ nhận --dist <dir> và --root <dir>.`);
    process.exit(2);
  }
}
if (!distDir) {
  console.log('CHẾ ĐỘ NGUỒN: không có --dist — chỉ kiểm nguồn (N1/N2/N3).');
}
root = join(root, '');
if (distDir) distDir = join(root, distDir);

const BAI = [
  {
    bo: 'gmt',
    vi: 'src/content/coChe/vi/gmt.md',
    en: 'src/content/coChe/en/gmt.md',
    routeVi: 'co-che/gmt/index.html',
    routeEn: 'en/mechanisms/gmt/index.html',
  },
  {
    bo: 'lume',
    vi: 'src/content/coChe/vi/da-quang.md',
    en: 'src/content/coChe/en/lume.md',
    routeVi: 'co-che/da-quang/index.html',
    routeEn: 'en/mechanisms/lume/index.html',
  },
];

const URL_BAT_BUOC = {
  'src/content/coChe/vi/gmt.md': [
    'https://www.hautehorlogerie.org/en/watches-and-culture/library/watch-complications',
    'https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii',
    'https://www.seikowatches.com/instructions/html/SEIKO_4R34_EN/BONDSYvfxjvcwv',
    'https://www.seikowatches.com/instructions/html/SEIKO_4R34_EN/BONDSYaubyrlud',
    'https://www.iana.org/time-zones',
  ],
  'src/content/coChe/en/gmt.md': [
    'https://www.hautehorlogerie.org/en/watches-and-culture/library/watch-complications',
    'https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii',
    'https://www.seikowatches.com/instructions/html/SEIKO_4R34_EN/BONDSYvfxjvcwv',
    'https://www.seikowatches.com/instructions/html/SEIKO_4R34_EN/BONDSYaubyrlud',
    'https://www.iana.org/time-zones',
  ],
  'src/content/coChe/vi/da-quang.md': [
    'https://www.rctritec.com/en/superluminova/history-of-luminous-pigments',
    'https://luminox.com/pages/super-luminova',
    'https://www.nemoto.co.jp/en/luminouspigment/',
    'https://www.nrc.gov/materials/fusion/faq',
    'https://trigalight.com/technology/',
    'https://www.epa.gov/radtown/radioactivity-antiques',
    'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/swiss-t-25-t-swiss-made',
  ],
  'src/content/coChe/en/lume.md': [
    'https://www.rctritec.com/en/superluminova/history-of-luminous-pigments',
    'https://luminox.com/pages/super-luminova',
    'https://www.nemoto.co.jp/en/luminouspigment/',
    'https://www.nrc.gov/materials/fusion/faq',
    'https://trigalight.com/technology/',
    'https://www.epa.gov/radtown/radioactivity-antiques',
    'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/swiss-t-25-t-swiss-made',
  ],
};

// Cặp ý mới VI/EN — mảng chuỗi: TẤT CẢ phải có trong văn bản hiển thị của bản
// tương ứng. Chuỗi attribution là dấu hiệu giới hạn theo nguồn/hãng — mất
// attribution → fail. Sau vòng sửa: chuỗi VI thuần Việt-first (không còn câu
// tiếng Anh nguyên văn), theo văn bản đã viết lại.
const Y_MOI = [
  {
    bo: 'gmt',
    ten: 'FHH — mô tả giờ tham chiếu: kim phụ khác màu/thiết kế trên thang 24 giờ (attribution)',
    vi: ['cách Fondation de la Haute Horlogerie mô tả giờ tham chiếu', 'một kim phụ, thường khác màu hoặc khác thiết kế, đọc trên thang 24 giờ'],
    en: ['the Fondation de la Haute Horlogerie describes the home time', 'usually in a different colour or design, read over a 24-hour scale'],
  },
  {
    bo: 'gmt',
    ten: 'Seiko — kim 24 giờ kiểm tra sáng/chiều (AM/PM)',
    vi: ['Tài liệu hướng dẫn của Seiko cho bộ máy 4R34 mô tả đúng tác dụng này', 'kiểm tra giờ hiển thị là buổi sáng hay buổi chiều'],
    en: ["Seiko's 4R34 instructions describe exactly this use", 'it tells whether the displayed time is AM or PM'],
  },
  {
    bo: 'gmt',
    ten: 'Seiko — kim 24 giờ đặt theo vùng khác + ba múi giờ qua vành (mô tả riêng của tài liệu)',
    vi: ['có thể đặt chỉ giờ của một vùng khác với giờ mà kim giờ-phút đang hiển thị', 'xoay vành cho phép đọc cùng lúc ba múi giờ', 'Cả hai đều là mô tả riêng của tài liệu này, không phải quy tắc áp chung'],
    en: ['setting the 24-hour hand to a region different from what the hour and minute hands show', 'turning the bezel lets you read three different time zones at once', 'Both statements describe those instructions only, not a rule shared across calibres'],
  },
  {
    bo: 'gmt',
    ten: 'IANA — chênh lệch lẻ +5:30 (Ấn Độ) / +5:45 (Nepal), ghi bản tzdb + ngày tra',
    vi: ['bảng múi giờ IANA', 'tzdb bản 2026e, tra ngày 17/10/2026', '+5:30', '+5:45'],
    en: ['IANA time zone database', 'tzdb 2026e, accessed 17 Oct 2026', '+5:30', '+5:45'],
  },
  {
    bo: 'gmt',
    ten: 'Seiko — chỉnh kim 24 giờ ở bước kéo núm thứ nhất, kim giây vẫn chạy (văn xuôi có attribution)',
    vi: ['kéo núm ra vị trí click đầu tiên', 'kim giây vẫn chạy trong khi chỉnh', 'xoay núm theo chiều kim đồng hồ'],
    en: ['the first crown click', 'the seconds hand keeps running while setting', 'the crown is turned clockwise to adjust the 24-hour hand'],
  },
  {
    bo: 'lume',
    ten: 'FHH — hai nhóm photoluminescent / radioluminescent',
    vi: ['photoluminescent', 'radioluminescent'],
    en: ['photoluminescent light', 'radioluminescent light'],
  },
  {
    bo: 'lume',
    ten: 'Nemoto — LumiNova 1993 + cơ chế nạp/phát (văn xuôi có attribution; trích dài về bảng nguồn)',
    vi: ['Năm 1993, Nemoto chế tạo dòng bột phát sáng lưu sáng dài mang tên LumiNova', 'Nemoto mô tả dòng bột LumiNova của mình đúng theo nguyên lý này', 'hấp thụ năng lượng từ mặt trời hoặc đèn nhân tạo', 'phát sáng sau khi nguồn sáng bị lấy đi'],
    en: ['In 1993, Nemoto created its series of long-afterglow pigments named LumiNova', 'Nemoto describes its LumiNova pigments exactly this way', 'absorb energy from the sun or artificial lighting', 'emit light after the energy source is removed'],
  },
  {
    bo: 'lume',
    ten: 'RC Tritec — đầu thập niên 1960 + bêta yếu + Super-LumiNova không phóng xạ',
    vi: ['đầu thập niên 1960', 'chất phát bêta yếu', 'không chứa chất phóng xạ'],
    en: ['early 1960s', 'a weak beta emitter', 'free of any radioactivity'],
  },
  {
    bo: 'lume',
    ten: 'trigalight — ống khí tritium (mô tả mb-microtec); NRC bán rã = khoảng thời gian giảm còn nửa, ≠ tuổi thọ',
    vi: ['Một cách ứng dụng tritium hiện nay là ống khí tritium', 'mao dẫn thủy tinh', 'khí tritium', 'khoảng 12,3 năm', 'khoảng thời gian để lượng tritium chưa phân rã giảm còn một nửa', 'không phải', 'tuổi thọ phát sáng'],
    en: ['One current application of tritium is the tritium gas tube', 'glass capillary', 'tritium gas', 'half-life at about 12.3 years', 'the time it takes for half of the undecayed tritium atoms to decay', 'not', 'service life'],
  },
  {
    bo: 'lume',
    ten: 'EPA — Radium Girls, canxi/xương, không tự tháo mặt số',
    vi: ['liếm đầu cọ sơn cho nhọn', 'giống canxi', 'tích tụ trong xương', 'Radium Girls', 'không tự tháo', 'có thể chứa radium hoặc tritium'],
    en: ['licked the bristles of their paintbrushes', 'behaves like calcium', 'settles into the bones', 'The Radium Girls', 'do not take apart', 'may contain radium or tritium'],
  },
  {
    bo: 'lume',
    ten: 'EPA Thế chiến phi công bay đêm + FHH dành cho đồng hồ chuyên dùng',
    vi: ['EPA dẫn lại thời Thế chiến thứ hai', 'phi công bay đêm', 'FHH ghi nhận phát quang phóng xạ thường dành cho đồng hồ chuyên dùng'],
    en: ['EPA records that during World War II', 'fly at night without cockpit lights', 'generally reserved for professional-use watches'],
  },
  {
    bo: 'lume',
    ten: 'FHH — giá trị ký hiệu T: 227 MBq / 925 MBq, khung ISO 3157 (mô tả của FHH)',
    vi: ['T Swiss made T', '227 MBq (7,5 mCi)', 'Swiss T<25', '925 MBq (25 mCi)', 'FHH ghi khung quy chiếu của các ký hiệu này là ISO 3157'],
    en: ['T Swiss made T', '227 MBq (7.5 mCi)', 'Swiss T<25', '925 MBq (25 mCi)', 'FHH names ISO 3157 as the frame of reference for these markings'],
  },
];

// Ý hoãn + khung tuyệt đối — cấm ở NGUỒN (thân bài) và DIST (văn bản hiển thị).
const HOAN = [
  { re: /\b1954\b/, ten: 'năm 1954 gắn GMT-Master (mâu thuẫn FHH/Rolex — CAN-KIEM 68)' },
  { re: /\b1983\b/, ten: 'năm 1983 gắn GMT-Master II (chuẩn 1982 — Rolex)' },
  { re: /Caller GMT|Flyer GMT|mọi GMT|every GMT|all GMT/i, ten: 'thuật ngữ Caller/Flyer hoặc khái quát "mọi GMT" (cụm GMT R3/R5)' },
  { re: /2:1/, ten: 'tỷ lệ bánh răng 2:1 như quy tắc chung (cụm GMT R6)' },
  { re: /những người đầu tiên|the first to do that work/i, ten: '"những người đầu tiên" (EPA không nêu)' },
  { re: /hoàn toàn an toàn|completely safe/i, ten: '"hoàn toàn an toàn" (claim tuyệt đối)' },
  { re: /an toàn trong điều kiện đeo|safe under normal wearing/i, ten: '"an toàn trong điều kiện đeo" (cam kết không nguồn)' },
  { re: /ngưỡng an toàn|safety threshold/i, ten: '"dưới ngưỡng an toàn" (không có trong FHH)' },
  { re: /chứng nhận an toàn|safety certification/i, ten: '"chứng nhận an toàn"' },
  { re: /ISO\s*3157\s*(?:vẫn\s*)?(?:còn\s*)?(?:hiện hành|in force|is current|remains current)/i, ten: 'khẳng định ISO 3157 còn hiện hành (CAN-KIEM 71)' },
  { re: /tùy chất cấu thành|depending on their composition/i, ten: '"tùy chất cấu thành" (không nguồn)' },
  { re: /sáng nhất|perceived brightest|brightest to the (?:human )?eye/i, ten: 'nhận định mắt cảm nhận màu (hoãn — CAN-KIEM 69)' },
  { re: /\bSrAl2?O4\b|europium|dysprosium/i, ten: 'công thức hóa LumiNova (hoãn — CAN-KIEM 70)' },
  { re: /mãi mãi|glowed forever|thảm kỷ niệm|safety tragedies|tự phát sáng liên tục/i, ten: 'khung tuyệt đối dạ quang (khóa B1B2)' },
  // Vòng sửa sau tái nghiệm TXN-20261017-88 — chặn tái phát các diễn đạt đã bỏ:
  { re: /bánh răng trung gian|chia đôi tốc độ|intermediate pinion|halves the rotational speed/i, ten: 'diễn giải cấu tạo pinion đã bỏ (nguồn chỉ mô tả một cách làm, không đưa vào bài)' },
  { re: /vành hai nửa màu|split into two different colours/i, ten: 'mô tả vành hai nửa màu không có nguyên văn nguồn (đã bỏ)' },
  { re: /lý do ngành đồng hồ từ bỏ radium|reason the watch industry dropped radium/i, ten: 'suy luận nhân quả "ngành đồng hồ từ bỏ radium" không có nguồn (đã bỏ)' },
  { re: /bán rã là tốc độ|tốc độ lượng tritium giảm|half-life is the rate|is a decay rate/i, ten: 'gọi chu kỳ bán rã là tốc độ/rate (định nghĩa đúng: khoảng thời gian để lượng chưa phân rã giảm còn một nửa)' },
  { re: /không còn ở dạng sơn|no longer comes as paint/i, ten: 'khái quát "tritium không còn dạng sơn" (thay bằng mô tả ống khí tritium cụ thể)' },
  { re: /12,32\s*năm|12\.32\s*years/i, ten: 'hai mức làm tròn bán rã cạnh nhau (giữ một giá trị NRC khoảng 12,3 năm)' },
  { re: /nguyên văn:|Nemoto's own words/i, ten: 'trích nguyên văn dài trong thân bài (chuyển về bảng nguồn)' },
];

// Lỗi nhãn "radians" nằm ở frontmatter (label nguồn) — quét RAW toàn tệp.
const RAW_CAM = [
  { re: /radians/i, ten: 'lỗi nhãn "radians" (phải là radium) — quét cả frontmatter' },
];

const loi = [];
const report = [];
const fail = (rule, ten, chiTiet) => loi.push(`[${rule}] ${ten} — ${chiTiet}`);

// ===== bộ lọc văn bản HIỂN THỊ (dùng chung cho nguồn và dist) =====
// Bỏ script/style/template/details/#comment và mọi nút ẩn (hidden /
// aria-hidden / display:none). Nội dung chỉ còn trong các vùng này không được
// dùng bù ý, attribution hay khớp yêu cầu nội dung.
const boQua = new Set(['script', 'style', 'template', 'details', '#comment']);
const laAn = (nut) => {
  const a = nut.attrs?.find((x) => x.name === 'hidden');
  const aria = nut.attrs?.find((x) => x.name === 'aria-hidden' && x.value === 'true');
  const style = nut.attrs?.find((x) => x.name === 'style')?.value ?? '';
  return Boolean(a || aria || /display\s*:\s*none/.test(style));
};
function chuHienThi(nut, ra) {
  if (boQua.has(nut.nodeName) || laAn(nut)) return;
  if (nut.nodeName === '#text') { ra.push(nut.value); return; }
  for (const con of nut.childNodes ?? []) chuHienThi(con, ra);
}
const chuanHoaHienThi = (s) =>
  s.join('').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/\s+/g, ' ');
const vanBanHienThi = (htmlGoc) => {
  const ra = [];
  chuHienThi(parse5.parse(htmlGoc), ra);
  return chuanHoaHienThi(ra);
};

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

// N2: cặp ý mới ở nguồn + EN khớp VI về claim — so trên văn bản HIỂN THỊ của
// thân bài (parse5): nội dung chỉ còn trong comment/script/template/ẩn không
// được tính. Markdown in đậm `**` được gỡ để khớp cùng một dạng văn bản như
// dist. Chuỗi VI thuần Việt-first, không khóa câu tiếng Anh nguyên văn.
const boInDam = (s) => s.replace(/\*\*/g, '');
const thanHienThi = {};
for (const b of BAI) for (const f of [b.vi, b.en]) {
  if (doc[f] == null) continue;
  thanHienThi[f] = boInDam(vanBanHienThi(thanBaiOf(doc[f])));
}
let demY = 0;
for (const y of Y_MOI) {
  for (const b of BAI) {
    if (b.bo !== y.bo) continue;
    if (thanHienThi[b.vi] == null || thanHienThi[b.en] == null) continue;
    for (const mau of y.vi ?? []) {
      demY++;
      if (!thanHienThi[b.vi].includes(mau.replace(/\s+/g, ' '))) fail('N2', `${b.vi} ↔ ${b.en}`, `ý "${y.ten}" thiếu chuỗi VI: "${mau}"`);
    }
    for (const mau of y.en ?? []) {
      if (!thanHienThi[b.en].includes(mau.replace(/\s+/g, ' '))) fail('N2', `${b.vi} ↔ ${b.en}`, `ý "${y.ten}" thiếu chuỗi EN tương đương: "${mau}"`);
    }
  }
}
if (!loi.some((e) => e.startsWith('[N2]'))) report.push(`N2: ${Y_MOI.length} nhóm ý mới đủ ở cả VI và EN (claim + attribution tương đương, ${demY} chuỗi kiểm)`);

// ===== dist: parse5 =====
// Chỉ lấy subtree <article> (thân bài) — tìm article bằng cách BỎ cả subtree
// ẩn: nếu nút đang xét bị ẩn (tổ tiên hoặc chính article) thì không đi vào,
// không chọn article từ vùng ẩn rồi mới lọc con.
function timArticle(nut) {
  if (laAn(nut)) return null;
  if (nut.nodeName === 'article') return nut;
  for (const con of nut.childNodes ?? []) {
    const kq = timArticle(con);
    if (kq) return kq;
  }
  return null;
}
const docDist = {};
if (distDir) for (const b of BAI) for (const [f, route] of [[b.vi, b.routeVi], [b.en, b.routeEn]]) {
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
// (hidden/display:none/aria-hidden). Chỉ đếm <a href> thật.
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
function srcVideoThu(article) {
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
}

// D1: văn bản hiển thị + source-list href (section.source-list trong article)
if (distDir) for (const b of BAI) {
  for (const f of [b.vi, b.en]) {
    const d = docDist[f];
    if (!d) continue;
    for (const y of Y_MOI) {
      if (y.bo !== b.bo) continue;
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
if (distDir && !loi.some((e) => e.startsWith('[D1]'))) report.push('D1: 4 trang dist đúng route; article bỏ vùng ẩn từ lúc tìm; văn bản hiển thị chứa trọn các ý; source-list chứa href nguồn thật');

// N3: ý hoãn + khung tuyệt đối — nguồn (thân bài) và dist (hiển thị); RAW quét
// cả frontmatter cho lỗi nhãn.
for (const b of BAI) {
  for (const f of [b.vi, b.en]) {
    if (doc[f] != null) {
      const than = thanBaiOf(doc[f]);
      for (const { re, ten } of HOAN) if (re.test(than)) fail('N3', f, `ý hoãn/khung tuyệt đối xuất hiện: ${ten}`);
      for (const { re, ten } of RAW_CAM) if (re.test(doc[f])) fail('N3', f, `${ten}`);
    }
    const d = docDist[f];
    if (d) for (const { re, ten } of HOAN) if (re.test(d.hienThi)) fail('N3', f, `dist hiển thị ý hoãn/khung tuyệt đối: ${ten}`);
  }
}
if (!loi.some((e) => e.startsWith('[N3]'))) report.push(`N3: ${HOAN.length} nhóm ý hoãn/khung tuyệt đối + ${RAW_CAM.length} quy tắc raw (cả frontmatter) vắng mặt ở nguồn${distDir ? ' và dist' : ''}`);

// D2: video đúng ngôn ngữ — frontmatter + tệp dist + src render THẬT trong article
if (distDir) for (const b of BAI) {
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
      const src = srcVideoThu(d.article);
      if (!src.includes(v)) fail('D2', f, `article không render video đúng bài (${v}); src thấy: ${src.join(', ') || 'không có'}`);
    }
  }
}
if (distDir && !loi.some((e) => e.startsWith('[D2]'))) report.push('D2: video VI/EN khác hậu tố, tệp tồn tại trong dist, article render đúng src theo ngôn ngữ');

// ===== kết luận =====
console.log('KIỂM TRA B3 ĐỢT 2 (GMT + DẠ QUANG — KIẾN THỨC VIDEO KÈM NGUỒN):');
console.log(`  root=${root}`);
console.log(`  dist=${distDir ?? '(không có — chỉ kiểm nguồn)'}`);
for (const line of report) console.log(`  ${line}`);
if (loi.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of loi) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log(distDir
  ? '  KẾT LUẬN: ĐẠT — đợt 2 khớp bảng nguồn, không đưa ý hoãn, EN khớp VI, dist khớp.'
  : '  KẾT LUẬN: ĐẠT (chỉ nguồn) — đợt 2 khớp bảng nguồn, không đưa ý hoãn, EN khớp VI.');
