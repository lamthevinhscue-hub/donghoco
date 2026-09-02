// =============================================================================
// check-care-cluster.mjs — Kiểm cụm nội dung "Bảo dưỡng & sử dụng an toàn"
// =============================================================================
// Chạy trong `npm run check`.
//
// Kiểm (9 tiêu chí theo đề):
//   1. Bốn bài của cụm tồn tại, frontmatter đủ title/excerpt/difficulty/
//      date/updated (updated đúng định dạng ngày).
//   2. Mỗi bài ≥2 nguồn HTTPS; bài bảo dưỡng ≥3 nguồn, trong đó ≥2 từ
//      tên miền chính hãng (omegawatches.com / rolex.com).
//   3. Bài bảo dưỡng có đủ 8 liên kết bắt buộc và mọi route tồn tại thật.
//   4. DecisionMap của bao-duong-dong-ho: heading đúng, 3 nhánh, tổng 7–8
//      link nội bộ tồn tại; map chon-dong-ho-dau-tien không bị ảnh hưởng.
//   5. Bốn bài không còn pattern cũ: bài bảo dưỡng (chu kỳ cố định, chi phí,
//      "X tuần", khái quát vượt nguồn), chon-co (bảng tra cổ tay, số mm khuyến
//      nghị, "cổ tay người Việt/Á", quy tắc vấu), hop-xoay (claim lợi ích/cách
//      cài/thời gian, "hầu hết/luôn/thật sự cần"), nhan-biet (claim tự kiểm
//      bằng mắt: kim giây, tiếng máy, trọng lượng, giá).
//   6. Bài nhan-biet có nội dung trọng tâm đúng: "không tự chứng minh",
//      phần giới hạn tự kiểm, FH là thông tin/phản ánh không phải xác thực.
//   7. Không link vòng: bài không tự link chính nó; map không trỏ về
//      chính trang chứa map.
//   8. DecisionMap.astro vẫn là <section> + H2 mang id + aria-labelledby
//      + H3 nhánh (semantics không suy giảm).
//   9. Cả 4 bài không có URL ngoài dùng HTTP (thiếu HTTPS).
//
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const CLUSTER = [
  'bao-duong-dong-ho',
  'chon-co-dong-ho',
  'hop-xoay-dong-ho',
  'nhan-biet-dong-ho-gia',
];
const MAP_FILE = 'src/data/decisionMaps.ts';
const COMP_FILE = 'src/components/DecisionMap.astro';
const OFFICIAL_DOMAINS = ['omegawatches.com', 'rolex.com'];

// 8 URL nội bộ bắt buộc trong bài bảo dưỡng
const REQUIRED_LINKS = [
  '/huong-dan/chon-dong-ho-dau-tien',
  '/huong-dan/muc-chong-nuoc',
  '/huong-dan/len-day-dong-ho',
  '/huong-dan/do-sai-so',
  '/co-che/chong-tu',
  '/co-che/chong-soc',
  '/tu-dien',
  '/lo-trinh-hoc-dong-ho',
];

const errors = [];
const report = [];

// ===== Route nội bộ tồn tại (cùng pattern với check-first-watch-cluster) =====
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

const docs = {};
for (const slug of CLUSTER) {
  const p = `src/content/huongDan/vi/${slug}.md`;
  if (!existsSync(p)) {
    console.log('KIỂM TRA CỤM BẢO DƯỠNG & SỬ DỤNG AN TOÀN — CÓ LỖI:');
    console.log(`  LỖI  Không tìm thấy bài: ${p}`);
    process.exit(1);
  }
  const raw = readFileSync(p, 'utf8');
  const fm = raw.split('---')[1] ?? '';
  docs[slug] = { raw, fm, body: raw.slice(raw.indexOf('---', 3) + 3) };
}

// ===== 1. Frontmatter đủ trường =====
for (const slug of CLUSTER) {
  const { fm } = docs[slug];
  for (const key of ['title', 'excerpt', 'difficulty', 'date', 'updated']) {
    if (!fm.match(new RegExp(`^${key}:\\s*["']?.+["']?\\s*$`, 'm'))) {
      errors.push(`"${slug}": frontmatter thiếu trường ${key}`);
    }
  }
  if (!/^updated:\s*["']?\d{4}-\d{2}-\d{2}["']?\s*$/m.test(fm)) {
    errors.push(`"${slug}": updated phải có định dạng ngày YYYY-MM-DD`);
  }
}
if (!errors.some((e) => e.includes('frontmatter'))) {
  report.push(`4 bài tồn tại, frontmatter đủ title/excerpt/difficulty/date/updated`);
}

// ===== 2. Nguồn HTTPS (bảo dưỡng ≥3, ≥2 chính hãng) =====
for (const slug of CLUSTER) {
  const urls = [...docs[slug].fm.matchAll(/url:\s*"(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  const https = urls.filter((u) => u.startsWith('https://'));
  if (https.length < 2) {
    errors.push(`"${slug}": chỉ có ${https.length} nguồn HTTPS — tối thiểu 2`);
    continue;
  }
  if (slug === 'bao-duong-dong-ho') {
    if (https.length < 3) errors.push(`"bao-duong-dong-ho": chỉ có ${https.length} nguồn — bài bảo dưỡng cần ≥3`);
    const official = https.filter((u) => OFFICIAL_DOMAINS.some((d) => new URL(u).hostname === d || new URL(u).hostname.endsWith('.' + d)));
    if (official.length < 2) errors.push(`"bao-duong-dong-ho": chỉ có ${official.length} nguồn chính hãng — cần ≥2 từ ${OFFICIAL_DOMAINS.join('/')}`);
    else report.push(`"bao-duong-dong-ho": ${https.length} nguồn HTTPS, trong đó ${official.length} nguồn chính hãng`);
  } else {
    report.push(`"${slug}": ${https.length} nguồn HTTPS`);
  }
}

// ===== 3. Link bắt buộc trong bài bảo dưỡng + route tồn tại =====
const careBody = docs['bao-duong-dong-ho'].body;
for (const href of REQUIRED_LINKS) {
  if (!careBody.includes(`](${href})`) && !careBody.includes(`](${href}/)`)) {
    errors.push(`Bài bảo dưỡng thiếu liên kết bắt buộc: ${href}`);
  }
  if (!routeExists(href)) errors.push(`URL bắt buộc không tồn tại trong nội dung: ${href}`);
}
if (!errors.some((e) => e.includes('bắt buộc'))) {
  report.push(`Đủ ${REQUIRED_LINKS.length} liên kết bắt buộc trong bài bảo dưỡng, mọi route tồn tại`);
}

// ===== 4. DecisionMap bao-duong: heading, 3 nhánh, 7–8 link =====
const mapSrc = readFileSync(MAP_FILE, 'utf8');
const careMapBlock = mapSrc.split("slug: 'bao-duong-dong-ho'")[1]?.split('\n};')[0] ?? '';
if (!careMapBlock) {
  errors.push('decisionMaps.ts: thiếu map cho bao-duong-dong-ho');
} else {
  if (!careMapBlock.includes('Bạn đang gặp tình huống nào?')) {
    errors.push('decisionMaps.ts: map bao-duong thiếu heading "Bạn đang gặp tình huống nào?"');
  } else {
    report.push('DecisionMap bao-duong: heading đúng theo đề');
  }
  const branchCount = (careMapBlock.match(/title: '/g) ?? []).length;
  if (branchCount !== 3) errors.push(`DecisionMap bao-duong có ${branchCount} nhánh — đề yêu cầu đúng 3`);
  else report.push('DecisionMap bao-duong: đúng 3 nhánh');
  const mapLinks = [...careMapBlock.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1]);
  if (mapLinks.length < 7 || mapLinks.length > 8) {
    errors.push(`DecisionMap bao-duong có ${mapLinks.length} link — đề yêu cầu 7–8`);
  }
  for (const href of mapLinks) {
    if (/^(https?:)?\/\//.test(href)) errors.push(`DecisionMap bao-duong chứa URL ngoài: ${href}`);
    if (!routeExists(href)) errors.push(`DecisionMap bao-duong trỏ tới route không tồn tại: ${href}`);
  }
  if (!errors.some((e) => e.includes('DecisionMap bao-duong'))) {
    report.push(`DecisionMap bao-duong: ${mapLinks.length} link nội bộ đều tồn tại (${mapLinks.join(', ')})`);
  }
  // Map chon-dong-ho-dau-tien không bị ảnh hưởng
  const firstMapBlock = mapSrc.split("slug: 'chon-dong-ho-dau-tien'")[1]?.split('\n};')[0] ?? '';
  const firstLinks = [...firstMapBlock.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1]);
  if (firstLinks.length < 7) errors.push(`DecisionMap chon-dong-ho-dau-tien bị suy giảm: chỉ còn ${firstLinks.length} link`);
  else report.push(`DecisionMap chon-dong-ho-dau-tien: nguyên vẹn với ${firstLinks.length} link`);
}

// ===== 5. Các bài không còn pattern cũ (theo từng bài) =====

// 5a. Bài bảo dưỡng: không còn chu kỳ cố định / chi phí / thời gian hứa hẹn
const bannedCare = [
  { re: /3\s*[–-]\s*4\s*năm/, why: 'bảng chu kỳ 3–4 năm' },
  { re: /4\s*[–-]\s*5\s*năm/, why: 'bảng chu kỳ 4–5 năm' },
  { re: /\d\s*[–-]\s*\d\s*tuần/, why: 'khẳng định thời gian service bằng tuần' },
  { re: /\d+\s*(triệu|tỷ)\b/i, why: 'bảng chi phí bằng con số' },
  { re: /gấp\s*\d+\s*[–-]?\s*\d*\s*lần/i, why: 'so sánh chi phí "gấp X lần"' },
  { re: /xà\s*phòng/i, why: 'quy tắc chung "rửa xà phòng"' },
  { re: /10\s*[–-]\s*15\s*giây/, why: 'sai số tuyệt đối 10–15 giây/ngày' },
  { re: /tăng\s*giá\s*trị\s*khi\s*bán/i, why: 'hứa hẹn giá trị bán lại' },
  { re: /khá\s*giống\s*nhau\s*về\s*bản\s*chất/, why: 'khái quát quy trình cho mọi hãng' },
  { re: /phá\s*hoại\s*bộ\s*máy/, why: 'tự giải thích mức độ thiệt hại do ẩm' },
  { re: /thường\s*bao\s*gồm\s*thay\s*gioăng/, why: 'khái quát phạm vi service "thường bao gồm"' },
  { re: /cảm\s*nhận\s*độ\s*căng/, why: 'chỉ dẫn thao tác "đến khi cảm nhận độ căng"' },
  { re: /lan\s*sâu\s*hơn/, why: 'cơ chế ẩm lan sâu chưa có nguồn' },
  { re: /vết\s*trượt/, why: 'ví dụ cơ học chưa có nguồn' },
];
for (const { re, why } of bannedCare) {
  const m = careBody.match(re);
  if (m) errors.push(`Bài bảo dưỡng còn nội dung cấm (${why}): "${m[0]}"`);
}
if (!errors.some((e) => e.includes('cấm ('))) {
  report.push('Bài bảo dưỡng: sạch chu kỳ cố định, chi phí, "X tuần", "gấp X lần", xà phòng, sai số tuyệt đối và các khái quát vượt nguồn');
}

// 5b. Bài chọn kích cỡ: không còn bảng tra cổ tay/đường kính/vấu và quy tắc tuyệt đối
const bannedSize = [
  { re: /Chu vi cổ tay/, why: 'bảng tra cột "Chu vi cổ tay"' },
  { re: /Đường kính vỏ khuyên/, why: 'bảng tra cột "Đường kính vỏ khuyên"' },
  { re: /Khoảng cách vấu tối đa/, why: 'bảng tra cột "Khoảng cách vấu tối đa"' },
  { re: /cổ tay người Việt/i, why: 'nhận định "cổ tay người Việt"' },
  { re: /cổ tay người châu Á/i, why: 'nhận định "cổ tay người châu Á"' },
  { re: /cộng thêm\s*2\s*[–-]\s*4/i, why: 'quy tắc cộng trừ mm' },
  { re: /32\s*[–-]\s*36\s*mm|36\s*[–-]\s*39\s*mm|39\s*[–-]\s*42\s*mm|42\s*[–-]\s*46\s*mm/i, why: 'khoảng đường kính khuyên trong bảng tra' },
  { re: /8\s*[–-]\s*9\s*mm|14\s*mm\s*trở\s*lên/i, why: 'mốc độ dày 8–9/14 mm' },
  { re: /vấu[^.]{0,24}quan trọng hơn|quan trọng hơn[^.]{0,16}đường kính/i, why: 'ý "vấu quan trọng hơn đường kính"' },
  { re: /nhỏ hơn hoặc bằng bề rộng/, why: 'quy tắc vấu tuyệt đối' },
  { re: /bảng tra/i, why: 'ngụ ý có "bảng tra"' },
  { re: /30\s*[×x]\s*40\s*mm|38\s*mm/i, why: 'quy đổi chữ nhật sang tròn' },
];
const sizeBody = docs['chon-co-dong-ho'].body;
for (const { re, why } of bannedSize) {
  const m = sizeBody.match(re);
  if (m) errors.push(`Bài chon-co còn nội dung cấm (${why}): "${m[0]}"`);
}
if (!errors.some((e) => e.includes('chon-co còn'))) {
  report.push('Bài chon-co: không còn bảng tra, số mm khuyến nghị, nhận định cổ tay người Việt/Á hay quy tắc vấu tuyệt đối');
}

// 5c. Bài hộp xoay: không còn claim về lợi ích/cách cài/thời gian
const bannedWinder = [
  { re: /phần lớn người chơi/i, why: '"phần lớn người chơi không cần"' },
  { re: /ba trường hợp/i, why: '"ba trường hợp thật sự có ích"' },
  { re: /thật\s*sự\s*cần/i, why: 'chữ "thật sự cần"' },
  { re: /giữ đồng hồ không dừng|không bao giờ dừng/i, why: 'hứa "giữ đồng hồ không dừng"' },
  { re: /cổ tay bạn đã là|cổ tay[^.]{0,12}đã là "hộp xoay"/i, why: 'metaphor "cổ tay là hộp xoay"' },
  { re: /một phút/i, why: '"bỏ ra một phút là xong"' },
  { re: /không nghỉ|24\s*giờ\s*\/\s*ngày|7\s*ngày\s*\/\s*tuần|24\s*\/\s*7/i, why: 'claim "chạy không nghỉ/24/7"' },
  { re: /tăng (cường độ )?(vận hành|tốc độ)/i, why: 'claim "tăng cường độ vận hành"' },
  { re: /tư thế cố định/i, why: 'claim "một tư thế cố định"' },
  { re: /ngắt quãng/i, why: 'khuyến nghị chế độ quay "ngắt quãng"' },
  { re: /chu kỳ (bảo )?dưỡng/i, why: 'kết luận ảnh hưởng chu kỳ bảo dưỡng' },
  { re: /hầu hết/i, why: 'chữ "hầu hết"' },
  { re: /\bluôn\b/i, why: 'chữ "luôn"' },
  { re: /TPD/i, why: 'thông số TPD' },
  { re: /rủi ro/i, why: 'khẳng định "dùng sai sẽ có rủi ro"' },
];
const winderBody = docs['hop-xoay-dong-ho'].body;
for (const { re, why } of bannedWinder) {
  const m = winderBody.match(re);
  if (m) errors.push(`Bài hop-xoay còn nội dung cấm (${why}): "${m[0]}"`);
}
if (!errors.some((e) => e.includes('hop-xoay còn'))) {
  report.push('Bài hop-xoay: khung quyết định trung tính, không còn claim lợi ích/cách cài/thời gian');
}

// 5d. Bài nhận biết giả: không còn claim tự kiểm thiếu nguồn
const bannedFake = [
  { re: /thường lộ ở/i, why: '"giả thường lộ ở…"' },
  { re: /khó làm và tốn kém/i, why: 'claim "chi tiết khó làm và tốn kém"' },
  { re: /đầu tư vào thứ/i, why: 'claim "người làm giả đầu tư vào…"' },
  { re: /nặng tay/i, why: 'claim "đồng hồ chính hãng nặng tay"' },
  { re: /kim giây[^.]*mượt/i, why: 'claim "kim giây cơ phải chạy mượt"' },
  { re: /quartz|tíc tắc|tiếng máy/i, why: 'claim về tiếng máy/quartz' },
  { re: /giá thấp bất thường|giá quá rẻ/i, why: 'claim "giá thấp bất thường là tín hiệu"' },
  { re: /chi phí kiểm tra nhỏ hơn/i, why: 'so sánh "chi phí kiểm tra nhỏ hơn rủi ro"' },
  { re: /không hãng nào chịu trách nhiệm/i, why: '"hãng không chịu trách nhiệm bảo dưỡng hàng giả"' },
  { re: /chắc là giả|dễ bị lừa nhất/i, why: 'kết luận tuyệt đối (vòng sửa trước)' },
  { re: /## Dấu hiệu/i, why: 'còn mục "dấu hiệu" tự kiểm' },
];
const fakeBody = docs['nhan-biet-dong-ho-gia'].body;
for (const { re, why } of bannedFake) {
  const m = fakeBody.match(re);
  if (m) errors.push(`Bài nhan-biet còn nội dung cấm (${why}): "${m[0]}"`);
}
if (!errors.some((e) => e.includes('nhan-biet còn'))) {
  report.push('Bài nhan-biet: không còn claim tự kiểm bằng mắt (kim giây/tiếng máy/trọng lượng/hoàn thiện/giá)');
}

// ===== 6. Bài nhan-biet: trọng tâm đúng — có "không tự chứng minh" + phần giới hạn tự kiểm =====
const nbBody = docs['nhan-biet-dong-ho-gia'].body;
if (!/không (phải bằng chứng|tự chứng minh)/.test(nbBody)) {
  errors.push('Bài nhan-biet thiếu nội dung "hộp/thẻ/serial không tự chứng minh"');
}
if (!/giới hạn (của )?tự kiểm/i.test(nbBody)) {
  errors.push('Bài nhan-biet thiếu phần giới hạn tự kiểm');
}
if (!nbBody.includes('không phải dịch vụ xác thực')) {
  errors.push('Bài nhan-biet thiếu mô tả đúng vai trò FH ("không phải dịch vụ xác thực")');
}
if (!errors.some((e) => e.includes('nhan-biet thiếu'))) {
  report.push('Bài nhan-biet: có "không tự chứng minh" + phần giới hạn tự kiểm + mô tả đúng vai trò FH');
}

// ===== 7. Không link vòng =====
for (const slug of CLUSTER) {
  const selfHref = `/huong-dan/${slug}`;
  if (docs[slug].body.includes(`](${selfHref})`) || docs[slug].body.includes(`](${selfHref}/)`)) {
    errors.push(`"${slug}" tự link tới chính nó (${selfHref}) — link vòng`);
  }
}
const careMapLinks = [...(careMapBlock ?? '').matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1]);
if (careMapLinks.includes('/huong-dan/bao-duong-dong-ho')) {
  errors.push('DecisionMap bao-duong trỏ về chính trang chứa map — link vòng');
}
if (!errors.some((e) => e.includes('vòng'))) {
  report.push('Không có link vòng (bài/map không tự trỏ chính nó)');
}

// ===== 8. DecisionMap.astro: section + H2 id + aria-labelledby + H3 =====
const compSrc = readFileSync(COMP_FILE, 'utf8');
const expectedId = 'dm-${map.slug}-title';
if (!/<section[\s>]/.test(compSrc)) errors.push(`${COMP_FILE}: wrapper phải là <section>`);
if (!compSrc.includes('aria-labelledby={`' + expectedId + '`}')) {
  errors.push(`${COMP_FILE}: thiếu aria-labelledby={\`dm-\${map.slug}-title\`}`);
}
if (!compSrc.includes('<h2 id={`' + expectedId + '`}')) {
  errors.push(`${COMP_FILE}: thiếu <h2> mang id dm-\${map.slug}-title`);
}
if (new RegExp('<p[^>]*id=\\{' + '`' + expectedId + '`' + '\\}').test(compSrc)) {
  errors.push(`${COMP_FILE}: tiêu đề khối không được là <p> mang id — phải là <h2>`);
}
if (!/<h3 /.test(compSrc)) errors.push(`${COMP_FILE}: nhánh phải dùng <h3>`);
if (!errors.some((e) => e.includes(COMP_FILE))) {
  report.push('DecisionMap.astro: <section> + H2 mang id + aria-labelledby + H3 nhánh — semantics nguyên vẹn');
}

// ===== 9. Không URL ngoài HTTP =====
for (const slug of CLUSTER) {
  const insecure = [...docs[slug].body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)]
    .map((m) => m[1])
    .filter((u) => u.startsWith('http://'));
  if (insecure.length > 0) errors.push(`"${slug}": URL ngoài không HTTPS: ${insecure.join(', ')}`);
}
if (!errors.some((e) => e.includes('không HTTPS'))) {
  report.push('URL ngoài trong cả 4 bài đều dùng HTTPS');
}

// ===== Kết luận =====
console.log('KIỂM TRA CỤM "BẢO DƯỠNG & SỬ DỤNG AN TOÀN":');
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — cụm nội dung theo nguồn hợp lệ, mọi route đều tồn tại.');
