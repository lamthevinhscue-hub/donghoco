#!/usr/bin/env node
// =============================================================================
// check-b3-batch3-content.mjs (B3 đợt 3, DHC-HOAN-THIEN-20261011) — kiểm nội
// dung "kiến thức video vào bài kèm nguồn" đợt 3: dây tóc và bánh lắc.
// =============================================================================
// Câu lệnh duyệt: GPT Work TXN-20261017-92 ("CÂU LỆNH B3 ĐỢT 3 — DÂY TÓC VÀ
// BÁNH LẮC"). Nội dung: chiều dài làm việc → tần số (hình ảnh dây đàn), mômen
// quán tính thay cách nói "nặng hơn thì chậm hơn", cần chỉnh hai chốt/khóa tùy
// cấu tạo + bánh lắc mômen quán tính biến thiên bỏ cần chỉnh, dao động tắt dần
// + bộ thoát cấp bù (nguồn vật lý mô hình OpenStax, trình bày ở mức chung).
// Nguồn: 3 FHH giữ nguyên (G4-3 khóa đếm đúng 3) + Horopedia correction-of-the-
// daily-rate + Horopedia regulator + OpenStax 15.5 Damped oscillations.
//
// Chạy RIÊNG khi nghiệm thu (không nối npm run check — giữ nguyên chuỗi ràng
// buộc thứ tự đã khóa): node scripts/check-b3-batch3-content.mjs --dist dist/
//
// Tham số:
//   KHÔNG có --dist: chỉ kiểm NGUỒN (N1/N2/N3) — dùng cho sandbox và soát
//                    nhanh; có --dist <dir>: kiểm thêm dist (D1/D2).
//   --root <dir>     tùy chọn — gốc cây nguồn (mặc định cwd), dùng cho sandbox.
//   Giá trị thiếu hoặc là cờ khác (ví dụ `--dist --root`) → lỗi tham số rõ,
//   exit 2. Tham số lạ → exit 2.
//
// Quy tắc:
//   N1  2 bài tồn tại; 6 URL nguồn bắt buộc nằm TRONG khối frontmatter sources
//       của từng bài (parse YAML, chỉ nhận mảng `sources`; URL ở thân bài
//       không được tính).
//   N2  Ý mới đủ ở nguồn — so trên văn bản HIỂN THỊ của thân bài (parse5 bỏ
//       script/style/template/details/comment/nút ẩn; `**` markdown được gỡ):
//       mỗi ý có cặp VI/EN tương đương về claim kèm attribution; nội dung chỉ
//       còn trong comment hay thẻ ẩn không được dùng bù ý. Trích nguyên văn
//       nguồn dài nằm ở bảng nguồn (output/b3-batch3-content-audit), không
//       khóa câu tiếng Anh vào thân bài VI.
//   N3  Ý HOÃN và diễn đạt cấm KHÔNG xuất hiện (nguồn + dist hiển thị):
//       pha cấp xung "qua điểm cân bằng" (CAN-KIEM 72), 28.800 vph từ video,
//       trị số hiệu chỉnh của Horopedia (0,02 mm / A/h), lịch sử Horopedia
//       (Huygens/Harrison/1675/1759 — ngoài phạm vi đợt), khái quát "mọi bộ
//       máy dùng hai chốt", claim "nặng hơn … chính xác hơn", chỉ dẫn tự mở
//       máy/tự đẩy cần chỉnh.
//   D1  Dist: trang đúng route; <article> được tìm bằng cách BỎ cả subtree
//       ẩn (tổ tiên hoặc chính article ẩn → không chọn); văn bản HIỂN THỊ
//       thật chứa trọn từng ý; href nguồn nằm trong khối source-list. Chỉ
//       ĐÚNG khối CHƯƠNG G04 THẬT được tách khỏi quét (vòng 3 sau phán
//       TXN-20261018-94): (a) SỐ LƯỢNG — article chỉ được đúng MỘT section
//       data-bhc-root, nhiều hơn → không miễn khối nào + lỗi [D2] chính
//       thức; (b) VỊ TRÍ — con trực tiếp của div.prose-content trong
//       article; (c) CẤU TRÚC ĐỊNH DANH — data-bhc-lang khớp ngôn ngữ bài,
//       aria-label chuẩn của component, subtree chứa thẻ <video> VÀ một
//       trong hai tiêu đề video nguyên lý bất biến G4-2. Khối giả/bổ
//       sung/bao ngoài không được miễn chỉ vì chứa tiêu đề G04; mốc
//       1657/1675 của chương đã duyệt riêng theo G04.
//   D2  Video đúng ngôn ngữ: principle_video VI/EN khác hậu tố -vi/-en, tệp
//       tồn tại trong dist, article render đúng src.
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
    bo: 'day-toc',
    vi: 'src/content/coChe/vi/day-toc-banh-lac.md',
    en: 'src/content/coChe/en/balance-and-hairspring.md',
    routeVi: 'co-che/day-toc-banh-lac/index.html',
    routeEn: 'en/mechanisms/balance-and-hairspring/index.html',
  },
];

const URL_BAT_BUOC = {
  'src/content/coChe/vi/day-toc-banh-lac.md': [
    'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/balance',
    'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/balance-spring',
    'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/escapement',
    'https://horopedia.org/correction-of-the-daily-rate/',
    'https://horopedia.org/regulator/',
    'https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations',
  ],
  'src/content/coChe/en/balance-and-hairspring.md': [
    'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/balance',
    'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/balance-spring',
    'https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/escapement',
    'https://horopedia.org/correction-of-the-daily-rate/',
    'https://horopedia.org/regulator/',
    'https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations',
  ],
};

// Cặp ý mới VI/EN — mảng chuỗi: TẤT CẢ phải có trong văn bản hiển thị của bản
// tương ứng. Chuỗi attribution là dấu hiệu giới hạn theo nguồn — mất
// attribution → fail. Đối chiếu bảng nguồn đợt 3.
const Y_MOI = [
  {
    bo: 'day-toc',
    ten: 'Horopedia — hình ảnh dây đàn: chiều dài làm việc lớn hơn → tần số thấp hơn; chạy nhanh/chậm do tần số quá cao/quá thấp',
    vi: ['Horopedia mô tả chiều tác động của chiều dài dây tóc bằng hình ảnh dây đàn', 'chiều dài làm việc của dây tóc càng lớn thì tần số dao động càng thấp', 'đồng hồ chạy nhanh là do tần số dao động của bộ điều tiết quá cao', 'chạy chậm là do tần số quá thấp'],
    en: ['Horopedia describes the direction of the length effect with a guitar-string comparison', 'the greater the working length of the hairspring, the lower the oscillation frequency', 'oscillating at too high a frequency', 'runs slow, too low'],
  },
  {
    bo: 'day-toc',
    ten: 'Horopedia — hai chốt gần chốt giữ → dài hơn, tần số giảm, chậm; ra xa → nhanh; điều kiện khác giữ nguyên',
    vi: ['đưa bộ phận giữ dây của cần chỉnh lại gần chốt giữ dây tóc thì chiều dài làm việc tăng, tần số giảm', 'đẩy ra xa thì chiều dài làm việc giảm, tần số tăng, đồng hồ chạy nhanh hơn', 'với các điều kiện khác giữ nguyên'],
    en: ['closer to the stud increases the active length, lowers the frequency', 'moving it away shortens the active length, raises the frequency', 'with all other conditions unchanged'],
  },
  {
    bo: 'day-toc',
    ten: 'Chiều dài làm việc ≠ cắt/nối sợi dây — đổi bằng xoay cần chỉnh',
    vi: ['phần dây tóc thực sự tham gia dao động', 'bằng cách xoay cần chỉnh, chứ không phải cắt bớt hay nối thêm sợi dây'],
    en: ['the part of the spring that actually takes part in the oscillation', 'by turning the regulator, not by trimming or adding to the spring itself'],
  },
  {
    bo: 'day-toc',
    ten: 'Horopedia — định nghĩa mômen quán tính; xa trục lớn hơn; cùng khối lượng phân bố quyết định',
    vi: ['Horopedia định nghĩa mômen quán tính là đại lượng vật lý đo sự cản trở của một vật đối với việc thay đổi tốc độ quay quanh trục', 'khối lượng càng đặt xa trục thì mômen quán tính càng lớn', 'cách phân bố quanh trục mới là điều quyết định'],
    en: ["Horopedia defines the moment of inertia as the physical quantity that measures a body's resistance to a change in its rotational speed around an axis", 'the farther the mass sits from the axis, the greater the moment of inertia', 'the distribution around the axis is what decides'],
  },
  {
    bo: 'day-toc',
    ten: 'Horopedia — vào trong → mômen giảm, tần số tăng, nhanh; ra ngoài → chậm; quyết định là mômen không riêng khối lượng',
    vi: ['đưa khối lượng vào phía trong bánh lắc thì mômen quán tính giảm và tần số tăng', 'đưa ra phía ngoài thì mômen quán tính tăng và tần số giảm', 'đại lượng quyết định là mômen quán tính chứ không riêng khối lượng'],
    en: ['moving mass toward the inside of the balance decreases the moment of inertia and increases the frequency', 'moving it outward increases the moment of inertia, lowers the frequency', 'the deciding quantity is the moment of inertia, not mass alone'],
  },
  {
    bo: 'day-toc',
    ten: 'Horopedia Regulator — xoay đồng tâm quanh trục bánh lắc; hai chốt / chốt kèm khóa / hai chốt kèm khóa tùy cấu tạo; dây tóc đi qua giữa',
    vi: ['cần chỉnh xoay đồng tâm quanh trục quay của bánh lắc', 'mang hai chốt, một chốt kèm khóa giữ dây tóc, hoặc hai chốt kèm khóa', 'dây tóc đi qua giữa hai chốt, hoặc giữa khóa và chốt'],
    en: ["the regulator pivots concentrically around the balance's axis of rotation", 'carries two pins, one pin with a regulator key, or two pins with a key', 'passes between the two pins, or between the key and a pin'],
  },
  {
    bo: 'day-toc',
    ten: 'Horopedia — cần chỉnh không bắt buộc; bánh lắc mômen quán tính biến thiên bỏ hẳn cần chỉnh, hiệu chỉnh qua mômen',
    vi: ['cần chỉnh không phải bộ phận bắt buộc để một chiếc đồng hồ cơ vận hành', 'bánh lắc mômen quán tính biến thiên', 'bỏ hẳn cần chỉnh', 'hiệu chỉnh qua mômen quán tính của bánh lắc thay vì qua chiều dài làm việc của dây tóc'],
    en: ['the regulator is not an essential component for a mechanical watch to operate', 'variable-inertia balances', 'do without a regulator entirely', "correcting through the balance's moment of inertia instead of through the spring's working length"],
  },
  {
    bo: 'day-toc',
    ten: 'Horopedia — ưu điểm hướng mômen: ít bị va chạm làm lệch, bỏ ảnh hưởng ma sát chốt–dây tóc lên tính đẳng nhịp',
    vi: ['ít bị va chạm làm lệch hơn', 'ma sát giữa dây tóc với chốt cần chỉnh đối với tính đẳng nhịp'],
    en: ['less prone to being thrown off by a shock', 'pin-on-spring friction on isochronism'],
  },
  {
    bo: 'day-toc',
    ten: 'OpenStax (nguồn vật lý mô hình, mức chung) — lực cản lấy năng lượng, biên độ giảm dần, cuối cùng dừng hẳn',
    vi: ['mô hình lò xo gắn khối lượng', 'ma sát và các lực cản lấy dần năng lượng của hệ', 'giảm dần theo thời gian', 'cuối cùng dao động dừng hẳn'],
    en: ['a mass on a spring, not watches in particular', 'friction and other resistive forces remove energy from the system', 'gradually decreases', 'eventually the motion stops'],
  },
  {
    bo: 'day-toc',
    ten: 'OpenStax — tắt dần nhỏ: chu kỳ/tần số gần như không đổi; cái giảm là biên độ, không phải nhịp',
    vi: ['với mức tắt dần nhỏ, chu kỳ và tần số của hệ vẫn gần như không đổi', 'cái giảm là biên độ, không phải nhịp dao động'],
    en: ['with a small amount of damping the period and frequency stay nearly constant', 'what shrinks is the amplitude, not the pace'],
  },
];

// Ý hoãn + diễn đạt cấm — quét nguồn (thân bài) và dist (văn bản hiển thị).
// Đợt 3 không có quy tắc raw-cả-tệp (frontmatter không có bẫy nhãn như đợt 2).
const HOAN = [
  { re: /điểm cân bằng|equilibrium position/i, ten: 'pha cấp xung "mỗi lần qua đúng điểm cân bằng" (HOÃN — CAN-KIEM 72)' },
  { re: /\b28[.,]800\b/, ten: 'số 28.800 vph từ video (cấm đưa trong đợt này)' },
  { re: /0,02\s*mm|0\.02\s*mm|\bA\/h\b/i, ten: 'trị số hiệu chỉnh ví dụ của Horopedia (0,02 mm / A/h — đoạn "for informational purposes")' },
  { re: /Huygens|Harrison|\b1675\b|\b1759\b/, ten: 'lịch sử của trang Horopedia Regulator (ngoài phạm vi đợt)' },
  { re: /mọi bộ máy dùng hai chốt|every (?:movement|calibre) uses two pins|all (?:movements|calibres) use (?:two )?pins/i, ten: 'khái quát "mọi bộ máy dùng hai chốt" (Horopedia nêu ba biến thể tùy cấu tạo)' },
  { re: /nặng hơn[^.\n]{0,24}chính xác hơn|heavier[^.\n]{0,30}more accurate/i, ten: 'claim "nặng hơn … chính xác hơn" (không nguồn)' },
  { re: /tự mở máy|tự đẩy cần|tự vặn|tự chỉnh nhanh chậm|open the case back to|move the regulator (?:yourself|by hand)/i, ten: 'chỉ dẫn tự mở máy / tự thao tác cần chỉnh (bài chỉ giải thích nguyên lý)' },
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
// Chương BalanceHairspringChapter (đã duyệt theo G04, chứa mốc 1657/1675) là
// vùng NGOÀI phạm vi đợt — nhưng CHỈ đúng khối chương THẬT được tách khỏi
// quét. Vòng 3 (phán TXN-20261018-94): chữ ký vòng 2 (section + data-bhc-root
// + tiêu đề) bị probe sao chép y hệt mà checker vẫn exit 0, nên ngoại lệ phải
// GẮN VỚI ĐÚNG khối chương hiện hữu đã duyệt theo BA lớp cùng lúc:
//   (a) SỐ LƯỢNG — trong cùng article chỉ được đúng MỘT section mang
//       data-bhc-root; nhiều hơn → KHÔNG miễn khối nào (fail closed) và báo
//       lỗi [D2] chính thức;
//   (b) VỊ TRÍ — khối là con trực tiếp của div.prose-content (vị trí render
//       của component đã duyệt trong article);
//   (c) CẤU TRÚC ĐỊNH DANH — data-bhc-lang khớp ngôn ngữ bài, aria-label
//       chuẩn của component, subtree chứa thẻ <video> VÀ một trong hai tiêu
//       đề video nguyên lý bất biến G4-2.
// Khối giả/bổ sung/bao ngoài KHÔNG được nhận miễn quét chỉ vì chứa tiêu đề
// G04 — văn bản trong đó vẫn bị quét như thường. Không sửa component hay
// nội dung lịch sử G04.
const TEN_VIDEO_CHUONG_G04 = ['Dây tóc và bánh lắc — nguyên lý hoạt động', 'Balance and hairspring — how it works'];
const ARIA_CHUONG_G04 = {
  vi: 'Chương mở đầu: bánh lắc và dây tóc',
  en: 'Opening chapter: balance wheel and hairspring',
};
const laSectionBhc = (nut) =>
  nut.nodeName === 'section' && nut.attrs?.some((x) => x.name === 'data-bhc-root');
const duNoiDungChuong = (nut, ra) => {
  if (nut.nodeName === '#text') { ra.text.push(nut.value); return ra; }
  if (nut.nodeName === 'video') ra.coVideo = true;
  for (const con of nut.childNodes ?? []) duNoiDungChuong(con, ra);
  return ra;
};
const khopChuongG04That = (nut, lang) => {
  if (!laSectionBhc(nut)) return false;
  if (nut.attrs?.find((x) => x.name === 'data-bhc-lang')?.value !== lang) return false;
  if (nut.attrs?.find((x) => x.name === 'aria-label')?.value !== ARIA_CHUONG_G04[lang]) return false;
  const cha = nut.parentNode;
  const chaCls = (cha?.attrs?.find((x) => x.name === 'class')?.value ?? '');
  if (!(cha?.nodeName === 'div' && chaCls.split(/\s+/).includes('prose-content'))) return false;
  const ra = duNoiDungChuong(nut, { text: [], coVideo: false });
  return ra.coVideo && TEN_VIDEO_CHUONG_G04.some((t) => ra.text.join('').includes(t));
};
// ctx = { lang, mien } — mien chỉ bật khi SỐ LƯỢNG section data-bhc-root
// trong article đúng 1 (đã kiểm khi dựng docDist); nguồn (markdown) không
// có ctx nên KHÔNG có khối nào được miễn.
function chuHienThi(nut, ra, ctx) {
  if (boQua.has(nut.nodeName) || laAn(nut)) return;
  if (nut.nodeName === '#text') { ra.push(nut.value); return; }
  if (ctx?.mien && khopChuongG04That(nut, ctx.lang)) return;
  for (const con of nut.childNodes ?? []) chuHienThi(con, ra, ctx);
}
const chuanHoaHienThi = (s) =>
  s.join('').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/\s+/g, ' ');
const vanBanHienThi = (htmlGoc, ctx) => {
  const ra = [];
  chuHienThi(parse5.parse(htmlGoc), ra, ctx);
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
if (!loi.some((e) => e.startsWith('[N1]'))) report.push(`N1: 2 bài tồn tại; ${URL_BAT_BUOC['src/content/coChe/vi/day-toc-banh-lac.md'].length} URL khớp tuyệt đối phần tử mảng sources (parse YAML)`);

// N2: cặp ý mới ở nguồn — so trên văn bản HIỂN THỊ của thân bài (parse5):
// nội dung chỉ còn trong comment/script/template/details/ẩn không được tính.
// Markdown được chuẩn hóa về dạng hiển thị trước khi so: link `[nhãn](đích)`
// → `nhãn` (chữ hiển thị của link là nhãn), in đậm `**` gỡ — để khớp cùng một
// dạng văn bản như dist.
const mdHienThi = (md) => md.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1');
const boInDam = (s) => s.replace(/\*\*/g, '');
const thanHienThi = {};
for (const b of BAI) for (const f of [b.vi, b.en]) {
  if (doc[f] == null) continue;
  thanHienThi[f] = boInDam(vanBanHienThi(mdHienThi(thanBaiOf(doc[f]))));
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
// không chọn article từ vùng ẩn rồi mới lọc con. Không bỏ subtree nào khác
// khi tìm: chương G04 nằm TRONG article, và một khối giả trước article
// không được phép che khuất việc tìm article.
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
if (distDir) for (const b of BAI) for (const [f, route, lang] of [[b.vi, b.routeVi, 'vi'], [b.en, b.routeEn, 'en']]) {
  const p = join(distDir, route);
  if (!existsSync(p)) { fail('D1', f, `dist thiếu trang: ${route}`); continue; }
  const html = readFileSync(p, 'utf8');
  const article = timArticle(parse5.parse(html));
  if (!article) { fail('D1', f, `dist ${route} không tìm thấy <article>`); continue; }
  // Vòng 3 — SỐ LƯỢNG: đếm TẤT CẢ section mang data-bhc-root trong article
  // (bỏ vùng ẩn như các kiểm khác). Trạng thái đã duyệt có đúng 1 chương;
  // nhiều hơn → fail closed: KHÔNG miễn khối nào + lỗi [D2] chính thức.
  const demBhc = (() => {
    let n = 0;
    const duyet = (nut) => {
      if (boQua.has(nut.nodeName) || laAn(nut)) return;
      if (laSectionBhc(nut)) n++;
      for (const con of nut.childNodes ?? []) duyet(con);
    };
    duyet(article);
    return n;
  })();
  const mien = demBhc === 1;
  if (demBhc > 1) fail('D2', f, `article có ${demBhc} section data-bhc-root — trạng thái đã duyệt chỉ có 1 chương G04; mọi khối đều bị quét, không miễn khối nào`);
  const ctx = { lang, mien };
  const ra = [];
  chuHienThi(article, ra, ctx);
  docDist[f] = { html, article, hienThi: chuanHoaHienThi(ra), mien, demBhc };
}
// Source-list PHẢI là section có class token `source-list` nằm TRONG đúng
// article; đường đi từ article tới section không được xuyên qua nút ẩn.
// Chỉ đếm <a href> thật.
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
if (distDir && !loi.some((e) => e.startsWith('[D1]'))) report.push('D1: 2 trang dist đúng route; article bỏ vùng ẩn từ lúc tìm; văn bản hiển thị chứa trọn các ý; source-list chứa href nguồn thật; chương G04 chỉ được miễn khi đếm đúng 1 section data-bhc-root và khớp chữ ký vị trí + định danh (vòng 3)');

// N3: ý hoãn + diễn đạt cấm — nguồn (thân bài) và dist (hiển thị, đã tách
// vùng chương BHC).
for (const b of BAI) {
  for (const f of [b.vi, b.en]) {
    if (doc[f] != null) {
      const than = thanBaiOf(doc[f]);
      for (const { re, ten } of HOAN) if (re.test(than)) fail('N3', f, `ý hoãn/diễn đạt cấm xuất hiện: ${ten}`);
    }
    const d = docDist[f];
    if (d) for (const { re, ten } of HOAN) if (re.test(d.hienThi)) fail('N3', f, `dist hiển thị ý hoãn/diễn đạt cấm: ${ten}`);
  }
}
if (!loi.some((e) => e.startsWith('[N3]'))) report.push(`N3: ${HOAN.length} nhóm ý hoãn/diễn đạt cấm vắng mặt ở nguồn${distDir ? ' và dist' : ''}`);

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
console.log('KIỂM TRA B3 ĐỢT 3 (DÂY TÓC & BÁNH LẮC — KIẾN THỨC VIDEO KÈM NGUỒN):');
console.log(`  root=${root}`);
console.log(`  dist=${distDir ?? '(không có — chỉ kiểm nguồn)'}`);
for (const line of report) console.log(`  ${line}`);
if (loi.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of loi) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log(distDir
  ? '  KẾT LUẬN: ĐẠT — đợt 3 khớp bảng nguồn, không đưa ý hoãn, EN khớp VI, dist khớp.'
  : '  KẾT LUẬN: ĐẠT (chỉ nguồn) — đợt 3 khớp bảng nguồn, không đưa ý hoãn, EN khớp VI.');
