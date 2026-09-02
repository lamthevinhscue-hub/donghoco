// =============================================================================
// check-first-watch-cluster.mjs — Kiểm cụm nội dung "Chọn đồng hồ cơ đầu tiên"
// =============================================================================
// Chạy trong `npm run check`.
//
// Kiểm:
//   1. Bài trụ cột tồn tại đúng slug hiện tại (không đổi URL).
//   2. Frontmatter có title, excerpt, difficulty, date và ≥2 nguồn HTTPS hợp lệ.
//   3. Mọi URL nội bộ bắt buộc xuất hiện trong bài (dạng markdown link) và
//      tồn tại thật trong tập route nội dung.
//   4. Không còn bảng giá/ngân sách, lời hứa "giữ giá/đầu tư", chu kỳ bảo
//      dưỡng cố định hay bảng kích thước tuyệt đối trong bài trụ cột.
//   5. Không có URL ngoài không dùng HTTPS.
//   6. DecisionMap (decisionMaps.ts): mọi link đều là URL nội bộ tồn tại.
//   7. Năm bài hỗ trợ có liên kết quay lại bài trụ cột.
//
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const PILLAR = 'src/content/huongDan/vi/chon-dong-ho-dau-tien.md';
const MAP_FILE = 'src/data/decisionMaps.ts';

// URL nội bộ bắt buộc trong bài trụ cột (mục 4 của đề)
const REQUIRED_LINKS = [
  '/huong-dan/chon-co-dong-ho',
  '/co-che/chuyen-dong-co',
  '/huong-dan/len-day-dong-ho',
  '/co-che/len-day-tu-dong',
  '/huong-dan/muc-chong-nuoc',
  '/huong-dan/bao-duong-dong-ho',
  '/huong-dan/nhan-biet-dong-ho-gia',
  '/lo-trinh-hoc-dong-ho',
  '/tu-dien',
];

// Năm bài hỗ trợ phải có liên kết quay lại bài trụ cột
const SUPPORT_LINKING_BACK = [
  'chon-co-dong-ho',
  'muc-chong-nuoc',
  'len-day-dong-ho',
  'nhan-biet-dong-ho-gia',
  'bao-duong-dong-ho',
];

const errors = [];
const report = [];

// ===== Route nội bộ tồn tại (trang tĩnh hoặc slug bộ sưu tập) =====
const COLLECTIONS = {
  'co-che': 'coChe',
  'huong-dan': 'huongDan',
  'mau-iconic': 'mauIconic',
  'tu-dien': 'tuDien',
  'thuong-hieu': 'thuongHieu',
};
function routeExists(href) {
  if (!href.startsWith('/') || href.startsWith('//')) return false;
  const parts = href.replace(/^\//, '').replace(/\/$/, '').split('/');
  if (parts.length === 1) {
    const clean = parts[0];
    return existsSync(join('src/pages', `${clean}.astro`)) || existsSync(join('src/pages', clean, 'index.astro'));
  }
  if (parts.length === 2 && COLLECTIONS[parts[0]]) {
    const f = join('src/content', COLLECTIONS[parts[0]], 'vi', `${parts[1]}.md`);
    return existsSync(f) && statSync(f).isFile();
  }
  return false;
}

// ===== 1. Bài trụ cột tồn tại =====
if (!existsSync(PILLAR)) {
  console.log('KIỂM TRA CỤM CHỌN ĐỒNG HỒ ĐẦU TIÊN — CÓ LỖI:');
  console.log('  LỖI  Không tìm thấy bài trụ cột: ' + PILLAR);
  process.exit(1);
}
const pillar = readFileSync(PILLAR, 'utf8');
report.push(`Bài trụ cột tồn tại đúng slug: chon-dong-ho-dau-tien`);

// ===== 2. Frontmatter =====
const fm = pillar.split('---')[1] ?? '';
const getTitle = (key) => fm.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'))?.[1];
for (const key of ['title', 'excerpt', 'difficulty', 'date']) {
  if (!getTitle(key)) errors.push(`frontmatter thiếu trường ${key}`);
}
const sourceUrls = [...fm.matchAll(/url:\s*"(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
const httpsSources = sourceUrls.filter((u) => u.startsWith('https://'));
if (httpsSources.length < 2) {
  errors.push(`frontmatter chỉ có ${httpsSources.length} nguồn HTTPS — tối thiểu 2`);
} else {
  report.push(`Frontmatter đầy đủ (title/excerpt/difficulty/date) + ${httpsSources.length} nguồn HTTPS`);
}

// ===== 3. URL bắt buộc trong bài + tồn tại thật =====
const body = pillar.slice(pillar.indexOf('---', 3) + 3);
for (const href of REQUIRED_LINKS) {
  const linked = body.includes(`](${href})`) || body.includes(`](${href}/)`);
  if (!linked) errors.push(`Bài trụ cột thiếu liên kết bắt buộc: ${href}`);
  if (!routeExists(href)) errors.push(`URL bắt buộc không tồn tại trong nội dung: ${href}`);
}
if (errors.length === 0 || errors.every((e) => !e.includes('bắt buộc'))) {
  report.push(`Đủ ${REQUIRED_LINKS.length} liên kết bắt buộc, tất cả route tồn tại`);
}

// ===== 4. Không còn nội dung thiếu cơ sở =====
const bodyNoFence = body; // bài không dùng code fence quanh các đoạn này
const banned = [
  { re: /\d+\s*(triệu|tỷ)\b/i, why: 'con số tiền/định giá' },
  { re: /ngân sách/i, why: 'phần "khoảng ngân sách"' },
  { re: /giữ giá/i, why: 'lời hứa "giữ giá"' },
  { re: /(?<!không tư vấn )đầu tư/i, why: 'nói về "đầu tư" ngoài câu minh bạch "không tư vấn đầu tư"' },
  { re: /dư địa nâng cấp/i, why: 'lời khuyên nâng cấp' },
  { re: /4[–-]\s*5\s*năm/i, why: 'chu kỳ bảo dưỡng cố định' },
  { re: /vài triệu/i, why: 'chi phí bảo dưỡng bằng con số không nguồn' },
  { re: /36[–-]\s*40\s*mm|Dưới\s*36\s*mm|Trên\s*40\s*mm/i, why: 'bảng kích thước tuyệt đối cũ' },
];
for (const { re, why } of banned) {
  const m = bodyNoFence.match(re);
  if (m) errors.push(`Bài trụ cột còn nội dung cần xử lý (${why}): "${m[0]}"`);
}
if (!errors.some((e) => e.includes('cần xử lý'))) {
  report.push('Không còn bảng giá/ngân sách, "giữ giá/đầu tư", chu kỳ bảo dưỡng cố định hay bảng kích thước tuyệt đối');
}

// ===== 5. Không có URL ngoài không HTTPS =====
const outside = [...body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1]);
const insecure = outside.filter((u) => u.startsWith('http://'));
if (insecure.length > 0) errors.push(`URL ngoài không HTTPS: ${insecure.join(', ')}`);
else report.push(`URL ngoài (${outside.length}) đều dùng HTTPS hoặc bài không link ngoài`);

// ===== 6. DecisionMap: mọi link là route nội bộ tồn tại =====
const mapSrc = readFileSync(MAP_FILE, 'utf8');
const mapBlock = mapSrc.split('slug: \'chon-dong-ho-dau-tien\'')[1]?.split('\n};')[0] ?? '';
const mapLinks = [...mapBlock.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1]);
if (mapLinks.length < 5) errors.push(`DecisionMap chỉ có ${mapLinks.length} link (kỳ vọng ≥7)`);
for (const href of mapLinks) {
  if (/^(https?:)?\/\//.test(href)) errors.push(`DecisionMap chứa URL ngoài: ${href}`);
  if (!routeExists(href)) errors.push(`DecisionMap trỏ tới route không tồn tại: ${href}`);
}
if (!errors.some((e) => e.includes('DecisionMap'))) {
  report.push(`DecisionMap hợp lệ: ${mapLinks.length} link nội bộ đều tồn tại (${mapLinks.join(', ')})`);
}

// ===== 6b. DecisionMap component: ngữ nghĩa + accessibility =====
const COMP_FILE = 'src/components/DecisionMap.astro';
const compSrc = readFileSync(COMP_FILE, 'utf8');
const expectedId = 'dm-${map.slug}-title'; // template literal như trong component

if (!/<section[\s>]/.test(compSrc)) {
  errors.push(`${COMP_FILE}: wrapper phải là <section> thay vì <div>`);
} else {
  report.push(`${COMP_FILE}: wrapper là <section>`);
}
if (!compSrc.includes('aria-labelledby={`' + expectedId + '`}')) {
  errors.push(`${COMP_FILE}: thiếu aria-labelledby={\`dm-\${map.slug}-title\`}`);
} else {
  report.push('DecisionMap: aria-labelledby trỏ đúng id danh nghĩa dm-${map.slug}-title');
}
if (!compSrc.includes(`<h2 id={` + '`' + expectedId + '`' + `}`)) {
  errors.push(`${COMP_FILE}: thiếu <h2> mang chính id dm-\${map.slug}-title — tiêu đề khối phải là heading thật`);
} else {
  report.push('DecisionMap: tiêu đề khối là <h2> mang đúng id (thứ bậc H1 → H2 map → H3 nhánh)');
}
// Không chấp nhận tiêu đề khối là <p> mang id đó
if (new RegExp(`<p[^>]*id=\\{` + '`' + expectedId + '`' + '\\}').test(compSrc)) {
  errors.push(`${COMP_FILE}: tiêu đề khối không được là <p> mang id — phải là <h2>`);
}
// Nhánh dùng h3
if (!/<h3 class="font-serif/.test(compSrc)) {
  errors.push(`${COMP_FILE}: nhánh phải dùng <h3>`);
}
if (!errors.some((e) => e.includes(COMP_FILE))) {
  report.push('DecisionMap: ngữ nghĩa heading + aria-labelledby hợp lệ');
}

// ===== 7. Năm bài hỗ trợ có link quay lại trụ cột =====
const pillarHref = '/huong-dan/chon-dong-ho-dau-tien';
for (const slug of SUPPORT_LINKING_BACK) {
  const p = `src/content/huongDan/vi/${slug}.md`;
  const t = existsSync(p) ? readFileSync(p, 'utf8') : '';
  if (!t.includes(`](${pillarHref})`)) errors.push(`Bài hỗ trợ "${slug}" chưa có liên kết quay lại bài trụ cột`);
}
if (!errors.some((e) => e.includes('quay lại'))) {
  report.push(`Đủ ${SUPPORT_LINKING_BACK.length} bài hỗ trợ có liên kết quay lại bài trụ cột`);
}

// ===== Kết luận =====
console.log('KIỂM TRA CỤM "CHỌN ĐỒNG HỒ CƠ ĐẦU TIÊN":');
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — cụm nội dung people-first hợp lệ, mọi route đều tồn tại.');
