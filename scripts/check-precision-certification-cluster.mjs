#!/usr/bin/env node
// =============================================================================
// check-precision-certification-cluster.mjs — chống hồi quy cụm
// "Độ chính xác & chứng nhận" (COSC / Master Chronometer) — Prompt 38
// =============================================================================
// Chạy trong `npm run check`. Quét đúng 6 bài vi/en của cụm:
//
//   R1. 3 bài EN mới + frontmatter hợp lệ (custom_slug khớp slug tệp;
//       has_infographic/interactive = false; enum category/difficulty theo
//       schema; ≥2 nguồn HTTPS).
//   R2. Đủ 3 cặp route mới trong src/i18n/contentRoutes.ts.
//   R3. Mọi liên kết nội bộ bắt buộc cụm (vi + en) có trong bài và đích tồn tại.
//   R4. 3 bài EN không có internal link nội dung về route tiếng Việt.
//   R5. Không còn các khẳng định cấm trong phạm vi 6 bài (quét PHẦN THÂN,
//       loại frontmatter):
//         - app/timegrapher/microphone/tên app riêng/Shopee
//         - amplitude/biên độ, beat error, mili-giây, ngưỡng độ
//         - mọi con số ±; bảng/mức sai số chung; nhãn "bình thường/xuất sắc/
//           cần service"
//         - lịch đo cố định (24 giờ, 7 ngày, 30 giây, 8 giờ/ngày)
//         - chẩn đoán nhiễm từ/dầu khô/mòn/cạn cót; khử từ/tự chỉnh/regulator
//         - Omega, MRI, điện thoại, loa, nam châm gia dụng
//         - "nghiêm ngặt nhất/strictest/most stringent/best/tốt nhất/đắt hơn"
//         - mức −4/+6 chỉ được nêu khi cùng dòng có "COSC" (nguồn COSC FAQ)
//         - 15.000 G/gauss chỉ được nêu khi cùng dòng hoặc dòng kế có METAS /
//           Master Chronometer / N001 (nguồn METAS N001 qua trang METAS)
//         - khái quát "mọi đồng hồ" (trừ cửa sổ phủ định "không phải mọi /
//           not every")
//   R6. Hồ sơ nguồn + biên bản nghiệm thu tồn tại.
//
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';

const FILES = {
  vi: [
    'src/content/huongDan/vi/do-sai-so.md',
    'src/content/tuDien/vi/chronometer.md',
    'src/content/tuDien/vi/metas.md',
  ],
  en: [
    'src/content/huongDan/en/accuracy-tracking.md',
    'src/content/tuDien/en/chronometer.md',
    'src/content/tuDien/en/master-chronometer.md',
  ],
};

const ROUTES_FILE = 'src/i18n/contentRoutes.ts';
const DOC_FILES = [
  'docs/ho-so-nguon-cum-do-chinh-xac-chung-nhan-song-ngu.md',
  'docs/nghiem-thu/2026-09-04_nghiem-thu-cum-do-chinh-xac-chung-nhan-song-ngu.md',
];

const REQUIRED_LINKS = {
  'src/content/huongDan/vi/do-sai-so.md': [
    '](/tu-dien/chronometer)',
    '](/tu-dien/metas)',
    '](/co-che/chong-tu)',
    '](/huong-dan/bao-duong-dong-ho)',
  ],
  'src/content/tuDien/vi/chronometer.md': [
    '](/tu-dien/chronograph)',
    '](/tu-dien/metas)',
  ],
  'src/content/tuDien/vi/metas.md': [
    '](/tu-dien/day-cot)',
    '](/tu-dien/chronometer)',
  ],
  'src/content/huongDan/en/accuracy-tracking.md': [
    '](/en/glossary/chronometer/)',
    '](/en/glossary/master-chronometer/)',
    '](/en/mechanisms/anti-magnetism/)',
  ],
  'src/content/tuDien/en/chronometer.md': [
    '](/en/glossary/chronograph/)',
    '](/en/glossary/master-chronometer/)',
  ],
  'src/content/tuDien/en/master-chronometer.md': [
    '](/en/glossary/mainspring/)',
    '](/en/glossary/chronometer/)',
    '](/en/mechanisms/anti-magnetism/)',
  ],
};

const LINK_TARGETS = {
  '/tu-dien/chronometer': 'src/content/tuDien/vi/chronometer.md',
  '/tu-dien/metas': 'src/content/tuDien/vi/metas.md',
  '/tu-dien/chronograph': 'src/content/tuDien/vi/chronograph.md',
  '/tu-dien/day-cot': 'src/content/tuDien/vi/day-cot.md',
  '/co-che/chong-tu': 'src/content/coChe/vi/chong-tu.md',
  '/huong-dan/bao-duong-dong-ho': 'src/content/huongDan/vi/bao-duong-dong-ho.md',
  '/en/glossary/chronometer/': 'src/content/tuDien/en/chronometer.md',
  '/en/glossary/master-chronometer/': 'src/content/tuDien/en/master-chronometer.md',
  '/en/glossary/chronograph/': 'src/content/tuDien/en/chronograph.md',
  '/en/glossary/mainspring/': 'src/content/tuDien/en/mainspring.md',
  '/en/mechanisms/anti-magnetism/': 'src/content/coChe/en/anti-magnetism.md',
};

const EN_SLUGS = {
  'src/content/huongDan/en/accuracy-tracking.md': 'accuracy-tracking',
  'src/content/tuDien/en/chronometer.md': 'chronometer',
  'src/content/tuDien/en/master-chronometer.md': 'master-chronometer',
};

// Schema từng collection: huongDan = difficulty; tuDien = category.
const FRONTMATTER_RULES = {
  'src/content/huongDan/en/accuracy-tracking.md': ['difficulty'],
  'src/content/tuDien/en/chronometer.md': ['category'],
  'src/content/tuDien/en/master-chronometer.md': ['category'],
};

const ROUTE_PAIRS = [
  { vi: '/huong-dan/do-sai-so', en: '/en/guides/accuracy-tracking/' },
  { vi: '/tu-dien/chronometer', en: '/en/glossary/chronometer/' },
  { vi: '/tu-dien/metas', en: '/en/glossary/master-chronometer/' },
];

const VALID_CATEGORIES = ['nền tảng', 'bổ trợ', 'phức tạp', 'phức tạp chức năng', 'thiết kế', 'bộ máy', 'chứng nhận'];
const VALID_DIFFICULTIES = ['cơ bản', 'thấp', 'trung bình', 'trung cấp', 'người mới', 'nâng cao', 'cao'];

// ===== R5: các khẳng định cấm (quét PHẦN THÂN, 6 bài) =====
const BANNED = [
  { re: /WatchTracker|WatchAccuracy|Kello|Tool Stryi|Shopee|timegrapher|microphone|\bmicro\b/i,
    why: 'app/thiết bị đo theo dõi (đã loại)' },
  { re: /\bapp\b|ứng dụng/i, why: 'app/ứng dụng đo (đã loại)' },
  { re: /amplitude|biên độ|beat error|0[.,]\d+\s*ms|\bms\b/i, why: 'thông số timegrapher (amplitude/beat error/ms)' },
  { re: /270\s*[–-]\s*320|±\s*\d/i, why: 'ngưỡng độ / con số sai số dạng ±' },
  { re: /24\s*giờ|24 hours|7 ngày|seven days|30\s*giây|30 seconds|8 giờ\/ngày|8 hours a day/i,
    why: 'lịch đo cố định (đã loại)' },
  { re: /bình thường|needs? service|cần service|cần kiểm tra|xuất sắc|\bexcellent\b|\bnormal\b/i,
    why: 'nhãn đánh giá gắn ngưỡng (đã loại)' },
  { re: /nhiễm từ|become magnetised|dầu khô|dried[- ]out oil|cạn cót|\bmòn\b|worn pivot/i,
    why: 'chẩn đoán nguyên nhân từ một dấu hiệu (đã loại)' },
  { re: /khử từ|demagnetiz|self[- ]adjust|tự chỉnh|regulator/i, why: 'tự khử từ / tự điều chỉnh (đã loại)' },
  { re: /Omega|\bMRI\b|điện thoại|smartphone|\bloa\b|speaker|nam châm|fridge|refrigerator/i,
    why: 'thiết bị/nguồn từ trường sinh hoạt (đã loại)' },
  { re: /nghiêm ngặt nhất|strictest|most stringent|most rigorous|best certification|chuẩn cao|tốt nhất|đắt hơn|more expensive|higher standard/i,
    why: 'xếp hạng chứng nhận / giá trị (đã loại)' },
  { re: /every (mechanical )?watch|mọi đồng hồ|tất cả đồng hồ|all watches/i,
    why: 'khái quát "mọi đồng hồ"',
    allow: /not every|not all|không phải mọi/i },
];
// Mức −4/+6: chỉ được nêu khi cùng dòng có "COSC" (nguồn FAQ COSC).
const RATE_RE = /(-|−|–)4[^+\n]{0,40}\+6|\+6[^+\n]{0,40}(-|−|–)4/i;
const RATE_ALLOW = /COSC/i;
// 15.000 G: chỉ được nêu trong cửa sổ METAS / Master Chronometer / N001
// (cùng dòng hoặc dòng kế).
const GAUSS_RE = /15[.,]000\s*[gG]/i;
const GAUSS_ALLOW = /METAS|Master Chronometer|N001/i;

const errors = [];
const report = [];
const fail = (rule, file, line, why) =>
  errors.push(`[${rule}] ${file}:${line} — ${why}`);

// Phần thân = sau khối frontmatter đầu tiên.
function bodyOf(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return m ? text.slice(m[0].length) : text;
}

const textOf = {};
for (const f of [...FILES.vi, ...FILES.en, ROUTES_FILE, ...DOC_FILES]) {
  if (!existsSync(f)) errors.push(`[FILE] Thiếu tệp phạm vi: ${f}`);
  else textOf[f] = readFileSync(f, 'utf8');
}

if (errors.some((e) => e.startsWith('[FILE]'))) {
  console.log('KIỂM TRA CỤM ĐỘ CHÍNH XÁC & CHỨNG NHẬN — CÓ LỖI:');
  for (const e of errors) console.log(`  LỖI  ${e}`);
  process.exit(1);
}

// ===== R1: frontmatter 3 bài EN =====
for (const [f, slug] of Object.entries(EN_SLUGS)) {
  const fm = textOf[f].split('---')[1] ?? '';
  const fmSlug = fm.match(/^custom_slug:\s*"?([^"\n]+)"?/m)?.[1];
  if (fmSlug !== slug) fail('R1', f, 0, `custom_slug "${fmSlug}" ≠ slug tệp "${slug}"`);
  const rules = FRONTMATTER_RULES[f];
  if (rules.includes('category')) {
    const cat = fm.match(/^category:\s*"?([^"\n]+)"?/m)?.[1];
    if (!cat || !VALID_CATEGORIES.includes(cat)) fail('R1', f, 0, `category không hợp lệ: ${cat}`);
  }
  if (rules.includes('difficulty')) {
    const diff = fm.match(/^difficulty:\s*"?([^"\n]+)"?/m)?.[1];
    if (!diff || !VALID_DIFFICULTIES.includes(diff)) fail('R1', f, 0, `difficulty không hợp lệ: ${diff}`);
  }
  if (!/^has_infographic:\s*false/m.test(fm)) fail('R1', f, 0, 'has_infographic phải là false');
  if (!/^interactive:\s*false/m.test(fm)) fail('R1', f, 0, 'interactive phải là false');
  const sourceUrls = [...fm.matchAll(/url:\s*"(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  const https = sourceUrls.filter((u) => u.startsWith('https://'));
  if (https.length < 2) fail('R1', f, 0, `chỉ ${https.length} nguồn HTTPS (tối thiểu 2)`);
}
if (!errors.some((e) => e.includes('[R1]'))) {
  report.push('3 bài EN tồn tại, frontmatter hợp lệ (slug, false-flags, enum, ≥2 nguồn HTTPS)');
}

// ===== R2: 3 cặp route mới =====
for (const { vi, en } of ROUTE_PAIRS) {
  if (!textOf[ROUTES_FILE].includes(`vi: '${vi}'`)) errors.push(`[R2] contentRoutes thiếu cặp vi: '${vi}'`);
  if (!textOf[ROUTES_FILE].includes(`en: '${en}'`)) errors.push(`[R2] contentRoutes thiếu cặp en: '${en}'`);
}
if (!errors.some((e) => e.includes('[R2]'))) {
  report.push(`3 cặp route mới có trong contentRoutes.ts (${ROUTE_PAIRS.map((p) => p.vi).join(', ')})`);
}

// ===== R3: liên kết bắt buộc + đích tồn tại =====
let linkChecked = 0;
for (const [f, links] of Object.entries(REQUIRED_LINKS)) {
  for (const link of links) {
    if (!textOf[f].includes(link)) {
      errors.push(`[R3] ${f} thiếu liên kết bắt buộc: ${link}`);
      continue;
    }
    linkChecked++;
    const href = link.slice(2, -1);
    const target = LINK_TARGETS[href];
    if (target && !existsSync(target)) {
      errors.push(`[R3] Đích của ${link} không tồn tại: ${target}`);
    }
  }
}
if (!errors.some((e) => e.includes('[R3]'))) {
  report.push(`${linkChecked} liên kết bắt buộc cụm (vi+en) đều có và đích tồn tại`);
}

// ===== R4 + R5: quét dòng 6 bài (theo phần thân) =====
for (const f of [...FILES.vi, ...FILES.en]) {
  const lines = bodyOf(textOf[f]).split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (FILES.en.includes(f)) {
      for (const m of line.matchAll(/\]\(([^)]+)\)/g)) {
        const href = m[1];
        if (href.startsWith('/') && !href.startsWith('/en/')) {
          fail('R4', f, i + 1, `link nội bộ về route vi: ${href}`);
        }
      }
    }
    for (const { re, why, allow } of BANNED) {
      const m = re.exec(line);
      if (m && !(allow && allow.test(line))) {
        fail('R5', f, i + 1, `${why}: "${m[0]}"`);
      }
    }
    if (RATE_RE.test(line) && !RATE_ALLOW.test(line)) {
      fail('R5', f, i + 1, 'mức −4/+6 ngoài cửa sổ attribution COSC (cần "COSC" cùng dòng)');
    }
    if (GAUSS_RE.test(line)) {
      const next = lines[i + 1] ?? '';
      if (!(GAUSS_ALLOW.test(line) || GAUSS_ALLOW.test(next))) {
        fail('R5', f, i + 1, '15.000 G ngoài cửa sổ METAS / Master Chronometer / N001 (cùng dòng hoặc dòng kế)');
      }
    }
  }
}
if (!errors.some((e) => e.includes('[R4]'))) report.push('R4: 3 bài EN không có link nội bộ về route tiếng Việt');
if (!errors.some((e) => e.includes('[R5]'))) report.push('R5: sạch các khẳng định cấm (app/timegrapher, amplitude/beat error, ± số, lịch đo cố định, nhãn ngưỡng, chẩn đoán, khử từ/tự chỉnh, thiết bị từ trường, xếp hạng chứng nhận, −4/+6 không COSC, 15.000 G không METAS/N001, "mọi đồng hồ")');

// ===== R6: hồ sơ + biên bản =====
report.push(`Hồ sơ nguồn + biên bản nghiệm thu tồn tại (${DOC_FILES.length} tệp)`);

// ===== Kết luận =====
console.log('KIỂM TRA CỤM ĐỘ CHÍNH XÁC & CHỨNG NHẬN (COSC / MASTER CHRONOMETER) SONG NGỮ:');
console.log(`  Phạm vi: ${FILES.vi.length} bài vi + ${FILES.en.length} bài en; ${ROUTE_PAIRS.length} cặp route mới`);
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — cụm độ chính xác & chứng nhận khớp hồ sơ nguồn, không hồi quy.');
