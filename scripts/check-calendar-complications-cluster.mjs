#!/usr/bin/env node
// =============================================================================
// check-calendar-complications-cluster.mjs — chống hồi quy cụm
// "Lịch vạn niên & pha trăng" (perpetual calendar & moon phase) — Prompt 40
// =============================================================================
// Chạy trong `npm run check`. Quét đúng 6 bài vi/en của cụm:
//
//   R1. 3 bài EN mới + frontmatter hợp lệ (custom_slug khớp slug tệp;
//       has_infographic/interactive = false; enum category/difficulty;
//       ≥2 nguồn HTTPS).
//   R2. Đủ 3 cặp route mới trong src/i18n/contentRoutes.ts.
//   R3. Mọi liên kết nội bộ bắt buộc cụm (vi + en) có trong bài và đích tồn tại.
//   R4. 3 bài EN không có internal link nội dung về route tiếng Việt.
//   R5. Không còn các khẳng định cấm trong phạm vi 6 bài (quét PHẦN THÂN):
//         - tên người/hãng/năm lịch sử không nguồn (Mudge, Packard, Patek,
//           1762, 1925, 482 năm)
//         - số perpetual có nguồn chỉ trong cửa sổ FHH cùng dòng
//           (48 tháng/months, 2100, 2400)
//         - số moon phase có nguồn chỉ trong cửa sổ FHH cùng dòng
//           (29 ngày/days, 12 giờ/hours, 44 phút/minutes, 2,8/2.8 giây/seconds);
//           mọi số moon phase khác bị cấm tuyệt đối (59, 135, 29,5/29,53,
//           hai mặt trăng)
//         - "mãi mãi/không cần chỉnh/tự đúng hoàn toàn/forever/never needs"
//         - bảng so sánh, giá, phân khúc, "đắt nhất/tốt nhất/ultra luxury/
//           haute horlogerie"
//         - hướng dẫn chỉnh (cách chỉnh, how to set/adjust)
//         - lịch sử công dụng, nhận định thẩm mỹ, nhận biết bằng mắt
//           (nông dân/thủy thủ/triều, lãng mạn/đẹp/dress watch, vòm/6 giờ/
//           sub-dial/mặt số phụ)
//         - MỌI DÒNG BẢNG trong 6 bài
//   R6. Relation Việt còn lại trung tính — không chứa số dài, bố cục, chức
//       năng, hãng, "nhảy tức thời", độ chính xác.
//   R7. Hồ sơ nguồn + biên bản nghiệm thu tồn tại.
//
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';

const FILES = {
  vi: [
    'src/content/coChe/vi/perpetual-calendar.md',
    'src/content/coChe/vi/pha-trang.md',
    'src/content/tuDien/vi/perpetual-calendar.md',
  ],
  en: [
    'src/content/coChe/en/perpetual-calendar.md',
    'src/content/coChe/en/moon-phase.md',
    'src/content/tuDien/en/perpetual-calendar.md',
  ],
};

const ROUTES_FILE = 'src/i18n/contentRoutes.ts';
const DOC_FILES = [
  'docs/ho-so-nguon-cum-lich-van-nien-va-pha-trang-song-ngu.md',
  'docs/nghiem-thu/2026-09-04_nghiem-thu-cum-lich-van-nien-va-pha-trang-song-ngu.md',
];

const REQUIRED_LINKS = {
  'src/content/coChe/vi/perpetual-calendar.md': [
    '](/tu-dien/perpetual-calendar)',
    '](/co-che/pha-trang)',
    '](/co-che/hien-thi-ngay)',
    '](/co-che/chuyen-dong-co)',
  ],
  'src/content/coChe/vi/pha-trang.md': [
    '](/co-che/perpetual-calendar)',
    '](/co-che/hien-thi-ngay)',
    '](/co-che/chuyen-dong-co)',
  ],
  'src/content/tuDien/vi/perpetual-calendar.md': [
    '](/co-che/perpetual-calendar)',
    '](/co-che/pha-trang)',
  ],
  'src/content/coChe/en/perpetual-calendar.md': [
    '](/en/glossary/perpetual-calendar/)',
    '](/en/mechanisms/moon-phase/)',
    '](/en/glossary/movement/)',
  ],
  'src/content/coChe/en/moon-phase.md': [
    '](/en/mechanisms/perpetual-calendar/)',
    '](/en/mechanisms/how-a-mechanical-watch-works/)',
    '](/en/glossary/movement/)',
  ],
  'src/content/tuDien/en/perpetual-calendar.md': [
    '](/en/mechanisms/perpetual-calendar/)',
    '](/en/mechanisms/moon-phase/)',
  ],
};

const LINK_TARGETS = {
  '/tu-dien/perpetual-calendar': 'src/content/tuDien/vi/perpetual-calendar.md',
  '/co-che/perpetual-calendar': 'src/content/coChe/vi/perpetual-calendar.md',
  '/co-che/pha-trang': 'src/content/coChe/vi/pha-trang.md',
  '/co-che/hien-thi-ngay': 'src/content/coChe/vi/hien-thi-ngay.md',
  '/co-che/chuyen-dong-co': 'src/content/coChe/vi/chuyen-dong-co.md',
  '/en/glossary/perpetual-calendar/': 'src/content/tuDien/en/perpetual-calendar.md',
  '/en/mechanisms/perpetual-calendar/': 'src/content/coChe/en/perpetual-calendar.md',
  '/en/mechanisms/moon-phase/': 'src/content/coChe/en/moon-phase.md',
  '/en/glossary/movement/': 'src/content/tuDien/en/movement.md',
  '/en/mechanisms/how-a-mechanical-watch-works/': 'src/content/coChe/en/how-a-mechanical-watch-works.md',
};

const EN_SLUGS = {
  'src/content/coChe/en/perpetual-calendar.md': 'perpetual-calendar',
  'src/content/coChe/en/moon-phase.md': 'moon-phase',
  'src/content/tuDien/en/perpetual-calendar.md': 'perpetual-calendar',
};

// Schema từng collection: coChe = category+difficulty+infographic+interactive;
// tuDien = category+infographic+interactive.
const FRONTMATTER_RULES = {
  'src/content/coChe/en/perpetual-calendar.md': ['category', 'difficulty', 'infographic', 'interactive'],
  'src/content/coChe/en/moon-phase.md': ['category', 'difficulty', 'infographic', 'interactive'],
  'src/content/tuDien/en/perpetual-calendar.md': ['category', 'infographic', 'interactive'],
};

const ROUTE_PAIRS = [
  { vi: '/co-che/perpetual-calendar', en: '/en/mechanisms/perpetual-calendar/' },
  { vi: '/co-che/pha-trang', en: '/en/mechanisms/moon-phase/' },
  { vi: '/tu-dien/perpetual-calendar', en: '/en/glossary/perpetual-calendar/' },
];

const VALID_CATEGORIES = ['nền tảng', 'bổ trợ', 'phức tạp', 'phức tạp chức năng', 'thiết kế', 'bộ máy', 'chứng nhận'];
const VALID_DIFFICULTIES = ['cơ bản', 'thấp', 'trung bình', 'trung cấp', 'người mới', 'nâng cao', 'cao', 'rất cao'];

// ===== R5: các khẳng định cấm (quét PHẦN THÂN, 6 bài) =====
const BANNED = [
  { re: /Mudge|Packard|Patek|1762|1925|482 năm|482 years/i,
    why: 'tên người/hãng/năm lịch sử không nguồn (đã loại)' },
  { re: /48 months|48 tháng|2100|2400/i,
    why: 'số perpetual ngoài cửa sổ attribution FHH cùng dòng',
    allow: /FHH/i },
  { re: /29 days|29 ngày|12 hours|12 giờ|44 minutes|44 phút|2[.,]8 seconds|2[.,]8 giây|four phases|bốn pha/i,
    why: 'số moon phase có nguồn ngoài cửa sổ attribution FHH cùng dòng',
    allow: /FHH/i },
  { re: /\b59\b|\b135\b|29[.,]5\b|29[.,]53|two moons|hai mặt trăng|one tooth per day|một nấc mỗi ngày/i,
    why: 'số moon phase không nguồn (59/135 răng, 29,5/29,53, đĩa hai mặt)' },
  { re: /mãi mãi|không cần chỉnh|tự đúng hoàn toàn|forever|never needs?|no need to (set|adjust)|tự động tính đúng/i,
    why: 'lời hứa "mãi mãi/không cần chỉnh" (đã loại)' },
  { re: /đắt nhất|tốt nhất|đắt đỏ|ultra luxury|haute horlogerie|giá tham khảo|more expensive|most expensive|phân khúc/i,
    why: 'giá/phân khúc/xếp hạng (đã loại)',
    allow: /FHH|Fondation/i },
  { re: /cách chỉnh|hướng dẫn chỉnh|how to (set|adjust|change)|nhấn nút/i,
    why: 'hướng dẫn chỉnh/tự thao tác (đã loại)' },
  { re: /thế kỷ 16|16th century|nông dân|thủy thủ|triều cường|farmers|sailors|tides/i,
    why: 'lịch sử công dụng (đã loại)' },
  { re: /lãng mạn|romantic|\bđẹp\b|dress watch|yêu thích nhất|most (popular|beloved)/i,
    why: 'nhận định thẩm mỹ chủ quan (đã loại)' },
  { re: /vòm|6 giờ|six o'?clock|sub-dial|mặt số phụ|bố cục mặt số/i,
    why: 'mô tả bố cục/nhận biết bằng mắt (đã loại)' },
  { re: /quăng/i,
    why: 'thuật ngữ pha trăng không chuẩn ("quăng đầu/quăng cuối") — dùng trăng thượng huyền/trăng hạ huyền' },
];

// R6: relation Việt phải trung tính — không claim kỹ thuật/hãng/số.
const RELATION_BANNED = /\d{3,}|bố cục|layout|nhảy|instant|chức năng|âm thanh|chime|thể thao|sport|độ chính xác|accuracy|công bố|published/i;

// R6b: bài pha trăng Việt phải dùng đúng thuật ngữ bốn pha.
const MOON_VI_FILE = 'src/content/coChe/vi/pha-trang.md';
const MOON_VI_REQUIRED = [
  'trăng thượng huyền (first quarter)',
  'trăng hạ huyền (last quarter)',
];

const errors = [];
const report = [];
const fail = (rule, file, line, why) =>
  errors.push(`[${rule}] ${file}:${line} — ${why}`);

// Phần thân = sau khối frontmatter đầu tiên (relatedModels nằm trong
// frontmatter nên không bị quét pattern).
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
  console.log('KIỂM TRA CỤM LỊCH VẠN NIÊN & PHA TRĂNG — CÓ LỖI:');
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
  if (rules.includes('infographic') && !/^has_infographic:\s*false/m.test(fm)) {
    fail('R1', f, 0, 'has_infographic phải là false');
  }
  if (rules.includes('interactive') && !/^interactive:\s*false/m.test(fm)) {
    fail('R1', f, 0, 'interactive phải là false');
  }
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
    // Bảng: mọi dòng bảng trong 6 bài đều bị loại
    if (line.trim().startsWith('|')) {
      fail('R5', f, i + 1, 'dạng bảng so sánh đã bị loại trong cụm này');
    }
  }
}
if (!errors.some((e) => e.includes('[R4]'))) report.push('R4: 3 bài EN không có link nội bộ về route tiếng Việt');
if (!errors.some((e) => e.includes('[R5]'))) report.push('R5: sạch các khẳng định cấm (tên người/hãng/năm, số perpetual/moon ngoài cửa sổ FHH, bảng, "mãi mãi/không cần chỉnh", giá/phân khúc, hướng dẫn chỉnh, lịch sử công dụng, thẩm mỹ chủ quan, nhận biết bằng mắt)');

// ===== R6: relation Việt còn lại trung tính =====
let relationChecked = 0;
for (const f of FILES.vi) {
  const fm = textOf[f].split('---')[1] ?? '';
  for (const m of fm.matchAll(/^\s*relation:\s*"?([^"\n]+)"?/gm)) {
    relationChecked++;
    const rel = m[1];
    if (RELATION_BANNED.test(rel)) {
      fail('R6', f, 0, `relation không trung tính: "${rel}"`);
    }
  }
}
if (!errors.some((e) => e.includes('[R6]'))) {
  report.push(`R6: ${relationChecked} relation Việt đều trung tính (không claim kỹ thuật/hãng/số)`);
}

// ===== R6b: thuật ngữ bốn pha trong bài pha trăng Việt =====
for (const term of MOON_VI_REQUIRED) {
  if (!bodyOf(textOf[MOON_VI_FILE]).includes(term)) {
    fail('R6b', MOON_VI_FILE, 0, `thiếu thuật ngữ bắt buộc: "${term}"`);
  }
}
if (!errors.some((e) => e.includes('[R6b]'))) {
  report.push(`R6b: bài pha trăng Việt dùng đúng ${MOON_VI_REQUIRED.length} thuật ngữ bốn pha (thượng huyền/hạ huyền)`);
}

// ===== R7: hồ sơ + biên bản =====
report.push(`Hồ sơ nguồn + biên bản nghiệm thu tồn tại (${DOC_FILES.length} tệp)`);

// ===== Kết luận =====
console.log('KIỂM TRA CỤM LỊCH VẠN NIÊN & PHA TRĂNG SONG NGỮ:');
console.log(`  Phạm vi: ${FILES.vi.length} bài vi + ${FILES.en.length} bài en; ${ROUTE_PAIRS.length} cặp route mới`);
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — cụm lịch vạn niên & pha trăng khớp hồ sơ nguồn, không hồi quy.');
