#!/usr/bin/env node
// =============================================================================
// check-n2-editorial-voice.mjs (N2, GD3) — bộ kiểm giọng văn nội dung mới
// =============================================================================
// Chặn lối viết "biên bản kiểm nguồn" trong nội dung MỚI, trước khi gói N3
// viết lại 30 tệp. Không áp ngược cho bài cũ.
//
// Phạm vi áp dụng — tệp .md thuộc src/content/ thỏa ÍT NHẤT MỘT trong hai
// điều kiện:
//   (a) frontmatter `date` hoặc `updated` từ 2026-10-01 trở đi;
//   (b) đường dẫn (tương đối, dùng /) nằm trong DANH_SACH_N3 bên dưới.
//
// Quy tắc (chỉ xét frontmatter và thân bài Markdown; URL, link, comment HTML
// và dữ liệu frontmatter — kể cả sources/sourceNotes — không được quét):
//   R1  Heading bắt đầu "Giới hạn" (VI) / "Limits" (EN)            → 0 lần
//   R2  Cụm cấm trong thân bài, không phân biệt hoa thường:
//       VI: "bài này không", "trang nguồn", "câu nguồn", "không suy thêm"
//       EN: "this article does not", "the source page", "the source sentence"
//   R3  Số từ thân bài tối thiểu: mauIconic 1.200; tuDien 150;
//       huongDan có tag "hieu-dung" 600 (không tag → không ngưỡng)
//   R4  Bản EN dài hơn bản VI tương ứng quá 25% (EN > VI × 1,25) khi cặp
//       route VI–EN tồn tại trong src/i18n/contentRoutes.ts và ít nhất một
//       bản thuộc phạm vi kiểm
// Đếm từ dùng chung một phương pháp cho VI và EN: bỏ frontmatter, comment
// HTML, URL, phần địa chỉ của link Markdown, dấu Markdown trang trí.
//
// Cách chạy: node scripts/check-n2-editorial-voice.mjs
//   Root cây cần kiểm đặt qua biến môi trường N2_ROOT (mặc định cwd) — dùng
//   cho mutation trên bản sao ngoài repo.
// Exit 1 nếu có lỗi.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.env.N2_ROOT ?? process.cwd());
const NGAY_BAT_DAU = '2026-10-01';

// Danh sách tường minh phục vụ N3 — đường dẫn tệp tương đối so với root, dùng /.
// Bổ sung bởi gói N3 (30 tệp viết lại theo khối Ghi chú nguồn).
const DANH_SACH_N3 = [
  // Ba cặp bài cơ chế
  'src/content/coChe/vi/manufacture-etablisseur.md',
  'src/content/coChe/en/manufacture-etablisseur.md',
  'src/content/coChe/vi/ebauche-chuoi-cung-ung.md',
  'src/content/coChe/en/ebauche-supply-chain.md',
  'src/content/coChe/vi/eta-sellita.md',
  'src/content/coChe/en/eta-sellita.md',
  // Mười hai cặp mục từ điển
  'src/content/tuDien/vi/bien-do.md',
  'src/content/tuDien/en/amplitude.md',
  'src/content/tuDien/vi/tinh-dang-thoi.md',
  'src/content/tuDien/en/isochronism.md',
  'src/content/tuDien/vi/sai-so-vi-tri.md',
  'src/content/tuDien/en/positional-error.md',
  'src/content/tuDien/vi/dieu-chinh-theo-vi-tri.md',
  'src/content/tuDien/en/adjustment-in-positions.md',
  'src/content/tuDien/vi/banh-xe-cot.md',
  'src/content/tuDien/en/column-wheel.md',
  'src/content/tuDien/vi/flyback.md',
  'src/content/tuDien/en/flyback.md',
  'src/content/tuDien/vi/rattrapante.md',
  'src/content/tuDien/en/rattrapante.md',
  'src/content/tuDien/vi/lich-nam.md',
  'src/content/tuDien/en/annual-calendar.md',
  'src/content/tuDien/vi/gio-the-gioi.md',
  'src/content/tuDien/en/world-time.md',
  'src/content/tuDien/vi/gio-nhay.md',
  'src/content/tuDien/en/jumping-hour.md',
  'src/content/tuDien/vi/kim-hoi.md',
  'src/content/tuDien/en/retrograde.md',
  'src/content/tuDien/vi/phuong-trinh-thoi-gian.md',
  'src/content/tuDien/en/equation-of-time.md',
];

const NGUONG_TU = { mauIconic: 1200, tuDien: 150, huongDanHieuDung: 600 };
const CAM_VI = ['bài này không', 'trang nguồn', 'câu nguồn', 'không suy thêm'];
const CAM_EN = ['this article does not', 'the source page', 'the source sentence'];

// Tiền tố route → thư mục collection trong src/content (dùng cho R4)
const MAP_ROUTE_VI = { '/co-che/': 'coChe', '/tu-dien/': 'tuDien', '/mau-iconic/': 'mauIconic', '/huong-dan/': 'huongDan', '/thuong-hieu/': 'thuongHieu' };
const MAP_ROUTE_EN = { '/en/mechanisms/': 'coChe', '/en/glossary/': 'tuDien', '/en/iconic-watches/': 'mauIconic', '/en/guides/': 'huongDan', '/en/brands/': 'thuongHieu' };

const errors = [];

// --- Tiện ích ------------------------------------------------------------

const trichFrontmatter = (txt) => {
  const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : '';
};

const trichThanBai = (txt) => {
  const m = txt.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return m ? txt.slice(m[0].length) : txt;
};

// Đọc scalar frontmatter: nhận giá trị có hoặc không có nháy đơn/kép, chấp nhận
// khoảng trắng trước/sau giá trị (kể cả cuối dòng). Lưu ý: trong template
// literal phải viết `\\s` (hai ký tự backslash-s) thì regex mới nhận whitespace —
// bản đầu vòng N2 viết `\s*$` khiến JS hiểu thành `s*$` và scalar có khoảng
// trắng cuối dòng bị đọc kèm dấu nháy, làm date/updated không nhận dạng được.
const trichTruong = (fm, ten) => {
  const dong = fm.match(new RegExp(`^${ten}:[ \\t]*(.*)$`, 'm'));
  if (!dong) return null;
  let giaTri = dong[1].trim();
  if (giaTri.length >= 2 && ((giaTri.startsWith('"') && giaTri.endsWith('"')) || (giaTri.startsWith("'") && giaTri.endsWith("'")))) {
    giaTri = giaTri.slice(1, -1).trim();
  }
  return giaTri === '' ? null : giaTri;
};

// Trường tags (block list hoặc inline list) — dùng cho ngưỡng huongDan "hieu-dung"
const coTagHieuDung = (fm) => {
  const inline = fm.match(/^tags:\s*\[([^\]]*)\]/m);
  if (inline) return inline[1].split(',').some((x) => x.trim().replace(/^["']|["']$/g, '') === 'hieu-dung');
  const block = fm.match(/^tags:\s*\r?\n((?:[ \t]+-[ \t]*.+\r?\n?)+)/m);
  if (block) return block[1].split(/\r?\n/).some((d) => d.replace(/^[ \t]+-[ \t]*/, '').trim().replace(/^["']|["']$/g, '') === 'hieu-dung');
  return false;
};

// Ngày đầu tiên của giá trị trường (YYYY-MM-DD…) — so sánh chuỗi ISO an toàn
const ngayTuTruong = (giaTri) => {
  const m = (giaTri ?? '').match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : null;
};

// Văn bản thuần từ thân bài: bỏ comment HTML, URL, phần địa chỉ của link
// Markdown, dấu Markdown trang trí — dùng chung cho VI và EN
const vanBanThuan = (thanBai) =>
  thanBai
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/[^\s)>]+/g, ' ')
    .replace(/[#>*_`~[\]()]/g, ' ')
    .replace(/^\s*[-+]\s+/gm, ' ');

const demTu = (thanBai) => vanBanThuan(thanBai).split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

const thuocPhamVi = (relPosix, fm) => {
  if (DANH_SACH_N3.includes(relPosix)) return 'danh-sách-N3';
  const cacNgay = ['date', 'updated'].map((k) => ngayTuTruong(trichTruong(fm, k))).filter(Boolean);
  if (cacNgay.some((d) => d >= NGAY_BAT_DAU)) return 'ngày';
  return null;
};

// Đệ quy liệt kê tệp .md
const lietKeMd = (thuMuc) => {
  const ketQua = [];
  if (!fs.existsSync(thuMuc)) return ketQua;
  for (const ten of fs.readdirSync(thuMuc, { withFileTypes: true })) {
    const duong = path.join(thuMuc, ten.name);
    if (ten.isDirectory()) ketQua.push(...lietKeMd(duong));
    else if (ten.name.toLowerCase().endsWith('.md')) ketQua.push(duong);
  }
  return ketQua;
};

// Tìm tệp theo slug cho R4: ưu tiên tệp <slug>.md, sau đó quét custom_slug
const timTepTheoSlug = (col, ngon, slug) => {
  const thuMuc = path.join(ROOT, 'src', 'content', col, ngon);
  const trucTiep = path.join(thuMuc, `${slug}.md`);
  if (fs.existsSync(trucTiep)) return trucTiep;
  for (const duong of lietKeMd(thuMuc)) {
    const fm = trichFrontmatter(fs.readFileSync(duong, 'utf8'));
    if (trichTruong(fm, 'custom_slug') === slug) return duong;
  }
  return null;
};

const slugTuRoute = (route) => route.replace(/\/+$/, '').split('/').pop();

// --- Thu tệp thuộc phạm vi -------------------------------------------------

const tatCaMd = lietKeMd(path.join(ROOT, 'src', 'content'));
const trongPhamVi = [];
for (const duong of tatCaMd) {
  const txt = fs.readFileSync(duong, 'utf8');
  const fm = trichFrontmatter(txt);
  const relPosix = path.relative(ROOT, duong).split(path.sep).join('/');
  const lyDo = thuocPhamVi(relPosix, fm);
  if (lyDo) trongPhamVi.push({ duong, relPosix, txt, fm, lyDo });
}

// --- R1, R2, R3 — từng tệp thuộc phạm vi -----------------------------------

for (const { relPosix, txt, fm } of trongPhamVi) {
  const thanBai = trichThanBai(txt);
  const ngon = relPosix.includes('/en/') ? 'en' : 'vi';
  const col = relPosix.split('/')[2] ?? '';

  // R1 — heading "Giới hạn" / "Limits"
  for (const dong of thanBai.split(/\r?\n/)) {
    const h = dong.match(/^#{1,6}\s+(.*)$/);
    if (!h) continue;
    const tieuDe = h[1].replace(/[*_`]/g, '').trim();
    if ((ngon === 'vi' && tieuDe.startsWith('Giới hạn')) || (ngon === 'en' && tieuDe.startsWith('Limits'))) {
      errors.push(`[R1] ${relPosix}: heading "${tieuDe.slice(0, 60)}" — nội dung giới hạn phải nằm trong sourceNotes`);
    }
  }

  // R2 — cụm cấm trong thân bài (không phân biệt hoa thường)
  const plain = vanBanThuan(thanBai).toLowerCase();
  for (const cum of ngon === 'vi' ? CAM_VI : CAM_EN) {
    const soLan = plain.split(cum).length - 1;
    if (soLan > 0) errors.push(`[R2] ${relPosix}: cụm cấm "${cum}" ×${soLan} trong thân bài`);
  }

  // R3 — ngưỡng số từ thân bài
  let nguong = null;
  if (col === 'mauIconic') nguong = NGUONG_TU.mauIconic;
  else if (col === 'tuDien') nguong = NGUONG_TU.tuDien;
  else if (col === 'huongDan' && coTagHieuDung(fm)) nguong = NGUONG_TU.huongDanHieuDung;
  if (nguong !== null) {
    const soTu = demTu(thanBai);
    if (soTu < nguong) errors.push(`[R3] ${relPosix}: ${soTu} từ < ngưỡng ${nguong} từ của ${col}${col === 'huongDan' ? ' (tag hieu-dung)' : ''}`);
  }
}

// --- R4 — cặp EN dài hơn VI quá 25% ----------------------------------------

const tepRoutes = path.join(ROOT, 'src', 'i18n', 'contentRoutes.ts');
if (fs.existsSync(tepRoutes)) {
  const routesTxt = fs.readFileSync(tepRoutes, 'utf8');
  const cacCap = [...routesTxt.matchAll(/\{\s*vi:\s*'([^']+)',\s*en:\s*'([^']+)'\s*\}/g)].map((m) => ({ vi: m[1], en: m[2] }));
  const trongPhamViSet = new Set(trongPhamVi.map((x) => x.duong));
  for (const cap of cacCap) {
    let colVi = null;
    let colEn = null;
    for (const [tienTo, col] of Object.entries(MAP_ROUTE_VI)) if (cap.vi.startsWith(tienTo)) colVi = col;
    for (const [tienTo, col] of Object.entries(MAP_ROUTE_EN)) if (cap.en.startsWith(tienTo)) colEn = col;
    if (!colVi || !colEn || colVi !== colEn) continue;
    const tepVi = timTepTheoSlug(colVi, 'vi', slugTuRoute(cap.vi));
    const tepEn = timTepTheoSlug(colEn, 'en', slugTuRoute(cap.en));
    if (!tepVi || !tepEn) continue;
    if (!trongPhamViSet.has(tepVi) && !trongPhamViSet.has(tepEn)) continue;
    const tuVi = demTu(trichThanBai(fs.readFileSync(tepVi, 'utf8')));
    const tuEn = demTu(trichThanBai(fs.readFileSync(tepEn, 'utf8')));
    const hanMuc = tuVi * 1.25;
    if (tuEn > hanMuc) {
      const relEn = path.relative(ROOT, tepEn).split(path.sep).join('/');
      errors.push(`[R4] ${relEn}: EN ${tuEn} từ > 125% (${Math.ceil(hanMuc)}) của VI ${tuVi} từ — cặp ${cap.vi} ↔ ${cap.en}`);
    }
  }
}

// --- Kết luận ---------------------------------------------------------------

console.log(`N2 checker (giọng văn nội dung mới): root=${ROOT}; phạm vi = date/updated ≥ ${NGAY_BAT_DAU} hoặc danh sách N3 (${DANH_SACH_N3.length} mục)`);
console.log(`Tệp thuộc phạm vi: ${trongPhamVi.length}`);
if (errors.length === 0) {
  console.log(`ĐẠT — R1 heading giới hạn, R2 cụm cấm, R3 ngưỡng số từ (iconic ${NGUONG_TU.mauIconic}/từ điển ${NGUONG_TU.tuDien}/hiểu-đúng ${NGUONG_TU.huongDanHieuDung}), R4 EN ≤ 125% VI`);
  process.exit(0);
}
console.log('KHÔNG ĐẠT:');
for (const e of errors) console.log('  LỖI ' + e);
process.exit(1);
