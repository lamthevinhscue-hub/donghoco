#!/usr/bin/env node
// =============================================================================
// check-chronograph-cluster.mjs — chống tái phát cụm Chronograph & Tachymeter
// =============================================================================
// Chạy trong `npm run check`. Quét đúng 8 bài vi/en của Prompt 34 và báo lỗi
// nếu các tổ hợp sai đã quyết định trong hồ sơ nguồn quay trở lại:
//
//   R1. Khái quát hóa cấu trúc: "mọi chronograph" / "every chronograph" /
//       "all chronographs"                        (số nút/bố cục tùy thiết kế)
//   R2. Dữ kiện mâu thuẫn nguồn:
//         - "Hamilton" (FHH ghi Chronomatic do Dépraz-Bürgen phát triển cho
//           Breitling và Heuer-Leonidas — không nêu Hamilton)
//         - tên calibre trong bảng phân khúc đã bỏ: "Rolex 4130",
//           "Patek CH 29", "Valjoux 7750"
//         - số liệu cơ chế không nguồn: "9 cột", "≈40°"
//         - "1817" gắn với Rieussec (chuẩn theo FHH: 1821)
//         - "3 dự án / ba dự án" (mệnh đề "về đích cùng năm" đã bỏ)
//   R3. Claim "đầu tiên" không dẫn nguồn: dòng chứa "đầu tiên" / "the first"
//       phải mang marker nguồn trên cùng dòng (theo FHH/Omega/SEIKO/TAG Heuer/
//       Zenith, per …, FHH coi/regards/records/lists).
//   R4. Tachymeter tốc độ có điều kiện (4 tệp *tachymeter*):
//         - "đo tốc độ" không kèm "trung bình" trên cùng dòng
//         - "measuring speed" không kèm "average" trên cùng dòng
//         - dòng chứa "3600" phải nêu điều kiện quãng đường/đơn vị
//           (km / dặm / mile / đơn vị / unit / 1000)
//   R5. Bài EN không link nội bộ về route tiếng Việt (mọi link markdown
//       nội bộ trong 4 bài EN phải bắt đầu bằng /en/).
//   R6. Mô tả ngược chiều hình học vạch + khẳng định tuyệt đối + title cũ:
//         - vi: "thời gian ngắn" cùng "vạch xa", hoặc "thời gian dài" cùng
//           "vạch sát" (đúng: thời gian ngắn → vạch gần nhau; thời gian dài →
//           vạch xa nhau — không nhầm khoảng cách vạch với độ chênh giá trị)
//         - en: "short time" cùng "marks spread", hoặc "long time" cùng
//           "marks bunch"
//         - "requires a chronograph" / "bắt buộc cần chronograph" /
//           "chỉ là trang trí" / "just decoration" / "only means something"
//         - title cũ: "and the column wheel" / "và bánh răng cột"
//       (không áp cho hồ sơ nguồn/biên bản — hai tài liệu cần ghi nhận lỗi đã sửa)
//   R7. Liên kết bắt buộc cụm (vi + en) tồn tại trong bài và tệp đích tồn tại.
//   R8. Frontmatter 4 bài EN: custom_slug khớp slug tệp, has_infographic:
//       false, interactive: false, ≥2 nguồn HTTPS, category/difficulty enum vi.
//   R9. 4 cặp route có trong src/i18n/contentRoutes.ts.
//   R10. Hồ sơ nguồn + biên bản nghiệm thu tồn tại.
//
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';

const FILES = {
  vi: [
    'src/content/coChe/vi/chronograph.md',
    'src/content/huongDan/vi/dung-tachymeter.md',
    'src/content/tuDien/vi/chronograph.md',
    'src/content/tuDien/vi/tachymeter.md',
  ],
  en: [
    'src/content/coChe/en/chronograph.md',
    'src/content/huongDan/en/using-a-tachymeter.md',
    'src/content/tuDien/en/chronograph.md',
    'src/content/tuDien/en/tachymeter.md',
  ],
};
const TACHY_FILES = new Set([
  'src/content/huongDan/vi/dung-tachymeter.md',
  'src/content/huongDan/en/using-a-tachymeter.md',
  'src/content/tuDien/vi/tachymeter.md',
  'src/content/tuDien/en/tachymeter.md',
]);

const ROUTES_FILE = 'src/i18n/contentRoutes.ts';
const DOC_FILES = [
  'docs/ho-so-nguon-cum-chronograph-tachymeter-song-ngu.md',
  'docs/nghiem-thu/2026-09-03_nghiem-thu-cum-chronograph-tachymeter-song-ngu.md',
];

// Marker nguồn: một dòng claim "đầu tiên" chỉ hợp lệ khi mang marker này.
const SOURCE_MARKER =
  /(theo (FHH|Omega|OMEGA|Seiko|SEIKO|TAG Heuer|Zenith)|per (FHH|OMEGA|Omega|SEIKO|TAG Heuer|Zenith)|FHH coi|FHH regards|FHH records|FHH lists|as SEIKO itself records)/;

const REQUIRED_LINKS = {
  'src/content/coChe/vi/chronograph.md': [
    '](/tu-dien/chronograph)',
    '](/huong-dan/dung-tachymeter)',
    '](/mau-iconic/omega-speedmaster)',
    '](/mau-iconic/monaco)',
    '](/lich-su)',
  ],
  'src/content/coChe/en/chronograph.md': [
    '](/en/glossary/chronograph/)',
    '](/en/guides/using-a-tachymeter/)',
    '](/en/iconic-watches/omega-speedmaster/)',
  ],
  'src/content/huongDan/vi/dung-tachymeter.md': [
    '](/tu-dien/tachymeter)',
    '](/tu-dien/chronograph)',
  ],
  'src/content/huongDan/en/using-a-tachymeter.md': [
    '](/en/mechanisms/chronograph/)',
    '](/en/glossary/tachymeter/)',
    '](/en/glossary/chronograph/)',
  ],
  'src/content/tuDien/vi/chronograph.md': ['](/co-che/chronograph)'],
  'src/content/tuDien/en/chronograph.md': ['](/en/mechanisms/chronograph/)'],
  'src/content/tuDien/vi/tachymeter.md': ['](/huong-dan/dung-tachymeter)'],
  'src/content/tuDien/en/tachymeter.md': [
    '](/en/guides/using-a-tachymeter/)',
    '](/en/glossary/chronograph/)',
  ],
};

// Đích của link bắt buộc — tệp nội dung phải tồn tại thật.
const LINK_TARGETS = {
  '/tu-dien/chronograph': 'src/content/tuDien/vi/chronograph.md',
  '/tu-dien/tachymeter': 'src/content/tuDien/vi/tachymeter.md',
  '/co-che/chronograph': 'src/content/coChe/vi/chronograph.md',
  '/huong-dan/dung-tachymeter': 'src/content/huongDan/vi/dung-tachymeter.md',
  '/mau-iconic/omega-speedmaster': 'src/content/mauIconic/vi/omega-speedmaster.md',
  '/mau-iconic/monaco': 'src/content/mauIconic/vi/monaco.md',
  '/lich-su': 'src/pages/lich-su.astro',
  '/en/glossary/chronograph/': 'src/content/tuDien/en/chronograph.md',
  '/en/glossary/tachymeter/': 'src/content/tuDien/en/tachymeter.md',
  '/en/mechanisms/chronograph/': 'src/content/coChe/en/chronograph.md',
  '/en/guides/using-a-tachymeter/': 'src/content/huongDan/en/using-a-tachymeter.md',
  '/en/iconic-watches/omega-speedmaster/': 'src/content/mauIconic/en/omega-speedmaster.md',
};

const EN_SLUGS = {
  'src/content/coChe/en/chronograph.md': 'chronograph',
  'src/content/huongDan/en/using-a-tachymeter.md': 'using-a-tachymeter',
  'src/content/tuDien/en/chronograph.md': 'chronograph',
  'src/content/tuDien/en/tachymeter.md': 'tachymeter',
};

const ROUTE_PAIRS = [
  { vi: '/co-che/chronograph', en: '/en/mechanisms/chronograph/' },
  { vi: '/huong-dan/dung-tachymeter', en: '/en/guides/using-a-tachymeter/' },
  { vi: '/tu-dien/chronograph', en: '/en/glossary/chronograph/' },
  { vi: '/tu-dien/tachymeter', en: '/en/glossary/tachymeter/' },
];

const VALID_CATEGORIES = ['phức tạp', 'phức tạp chức năng', 'thiết kế'];
const VALID_DIFFICULTIES = ['cơ bản', 'trung bình', 'trung cấp', 'cao'];

const errors = [];
const report = [];
const fail = (rule, file, line, why) =>
  errors.push(`[${rule}] ${file}:${line} — ${why}`);

const textOf = {};

for (const f of [...FILES.vi, ...FILES.en, ROUTES_FILE, ...DOC_FILES]) {
  if (!existsSync(f)) errors.push(`[FILE] Thiếu tệp phạm vi: ${f}`);
  else textOf[f] = readFileSync(f, 'utf8');
}

if (errors.some((e) => e.startsWith('[FILE]'))) {
  console.log('KIỂM TRA CỤM CHRONOGRAPH & TACHYMETER — CÓ LỖI:');
  for (const e of errors) console.log(`  LỖI  ${e}`);
  process.exit(1);
}

// ===== R1 + R2 + R3 + R4: quét dòng trong 8 bài =====
const GENERALIZE = [/mọi chronograph/i, /every chronograph/i, /all chronographs/i];
const FACT_CHECKS = [
  { re: /Hamilton/, why: 'Hamilton không có trong nguồn FHH của cụm' },
  { re: /Rolex 4130|Patek CH 29|Valjoux 7750/, why: 'tên calibre phân khúc đã bỏ (không nguồn)' },
  { re: /9 cột|≈40°/, why: 'số liệu cơ chế không nguồn (số cột, góc xoay)' },
  { re: /3 dự án|ba dự án/, why: 'mệnh đề "về đích cùng năm" đã bỏ' },
];

for (const f of [...FILES.vi, ...FILES.en]) {
  const lines = textOf[f].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const re of GENERALIZE) {
      if (re.test(line)) fail('R1', f, i + 1, `khái quát hóa "${re.source}"`);
    }
    for (const { re, why } of FACT_CHECKS) {
      if (re.test(line)) fail('R2', f, i + 1, why);
    }
    if (/1817/.test(line) && /Rieussec/.test(line)) {
      fail('R2', f, i + 1, '1817 gắn Rieussec (chuẩn FHH: 1821 trình diễn, 1822 cấp bằng sáng chế)');
    }
    if (/đầu tiên|the first|first ever/i.test(line) && !SOURCE_MARKER.test(line)) {
      fail('R3', f, i + 1, 'claim "đầu tiên" không có marker nguồn trên cùng dòng');
    }
    if (TACHY_FILES.has(f)) {
      const viClaim = /đo tốc độ(?![^.\n]{0,80}trung bình)/.exec(line);
      if (viClaim) fail('R4', f, i + 1, '"đo tốc độ" không kèm "trung bình" trên cùng dòng');
      const enClaim = /measuring speed(?![^.\n]{0,80}average)/i.exec(line);
      if (enClaim) fail('R4', f, i + 1, '"measuring speed" không kèm "average" trên cùng dòng');
      if (/3600/.test(line) && !/km|dặm|mile|đơn vị|unit|1000/i.test(line)) {
        fail('R4', f, i + 1, 'công thức 3600 không nêu điều kiện quãng đường/đơn vị');
      }
    }
    // R6a — mô tả ngược chiều hình học vạch (sai: vạch xa khi thời gian ngắn /
    // vạch sát khi thời gian dài). Câu đúng chiều không chứa cặp chuỗi này.
    if (/thời gian ngắn/i.test(line) && /vạch xa/.test(line)) {
      fail('R6', f, i + 1, '"thời gian ngắn" cùng "vạch xa" — đúng: thời gian ngắn → vạch gần nhau');
    }
    if (/thời gian dài/i.test(line) && /vạch sát/.test(line)) {
      fail('R6', f, i + 1, '"thời gian dài" cùng "vạch sát" — đúng: thời gian dài → vạch xa nhau');
    }
    if (/short time/i.test(line) && /marks spread/i.test(line)) {
      fail('R6', f, i + 1, '"short time" cùng "marks spread" — đúng: short times → marks sit close together');
    }
    if (/long time/i.test(line) && /marks bunch/i.test(line)) {
      fail('R6', f, i + 1, '"long time" cùng "marks bunch" — đúng: long times → marks sit farther apart');
    }
    // R6b — khẳng định tuyệt đối chronograph-tachymeter
    const ABSOLUTE = [
      { re: /requires a chronograph|bắt buộc cần chronograph/i, why: 'khẳng định "bắt buộc chronograph"' },
      { re: /chỉ là trang trí|just decoration/i, why: 'khẳng định "chỉ là trang trí"' },
      { re: /only means something/i, why: 'khẳng định "only means something"' },
    ];
    for (const { re, why } of ABSOLUTE) {
      if (re.test(line)) fail('R6', f, i + 1, why);
    }
    // R6c — title cũ coi column wheel là bộ phận của mọi chronograph
    if (/and the column wheel|và bánh răng cột/.test(line)) {
      fail('R6', f, i + 1, 'title/nhãn cũ "and the column wheel / và bánh răng cột"');
    }
  }
}

// ===== R5: bài EN không link nội bộ về route vi =====
for (const f of FILES.en) {
  const lines = textOf[f].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    for (const m of lines[i].matchAll(/\]\(([^)]+)\)/g)) {
      const href = m[1];
      if (href.startsWith('/') && !href.startsWith('/en/')) {
        fail('R5', f, i + 1, `link nội bộ về route vi: ${href}`);
      }
    }
  }
}

// ===== R6: liên kết bắt buộc + đích tồn tại =====
let linkChecked = 0;
for (const [f, links] of Object.entries(REQUIRED_LINKS)) {
  for (const link of links) {
    if (!textOf[f].includes(link)) {
      errors.push(`[R7] ${f} thiếu liên kết bắt buộc: ${link}`);
      continue;
    }
    linkChecked++;
    const href = link.slice(2, -1);
    const target = LINK_TARGETS[href];
    if (target && !existsSync(target)) {
      errors.push(`[R7] Đích của ${link} không tồn tại: ${target}`);
    }
  }
}
if (!errors.some((e) => e.includes('[R7]'))) {
  report.push(`${linkChecked} liên kết bắt buộc cụm (vi+en) đều có trong bài và đích tồn tại`);
}

// ===== R8: frontmatter 4 bài EN (theo schema từng collection) =====
// coChe: category + difficulty + has_infographic:false + interactive:false
// huongDan: difficulty (không có has_infographic/interactive/category trong schema)
// tuDien: category + has_infographic:false + interactive:false (không difficulty)
const FRONTMATTER_RULES = {
  'src/content/coChe/en/chronograph.md': ['category', 'difficulty', 'infographic', 'interactive'],
  'src/content/huongDan/en/using-a-tachymeter.md': ['difficulty'],
  'src/content/tuDien/en/chronograph.md': ['category', 'infographic', 'interactive'],
  'src/content/tuDien/en/tachymeter.md': ['category', 'infographic', 'interactive'],
};
for (const [f, slug] of Object.entries(EN_SLUGS)) {
  const fm = textOf[f].split('---')[1] ?? '';
  const fmSlug = fm.match(/^custom_slug:\s*"?([^"\n]+)"?/m)?.[1];
  if (fmSlug !== slug) fail('R7', f, 0, `custom_slug "${fmSlug}" ≠ slug tệp "${slug}"`);
  const rules = FRONTMATTER_RULES[f];
  if (rules.includes('category')) {
    const cat = fm.match(/^category:\s*"?([^"\n]+)"?/m)?.[1];
    if (!cat || !VALID_CATEGORIES.includes(cat)) fail('R7', f, 0, `category không hợp lệ: ${cat}`);
  }
  if (rules.includes('difficulty')) {
    const diff = fm.match(/^difficulty:\s*"?([^"\n]+)"?/m)?.[1];
    if (!diff || !VALID_DIFFICULTIES.includes(diff)) fail('R7', f, 0, `difficulty không hợp lệ: ${diff}`);
  }
  if (rules.includes('infographic') && !/^has_infographic:\s*false/m.test(fm)) {
    fail('R7', f, 0, 'has_infographic phải là false');
  }
  if (rules.includes('interactive') && !/^interactive:\s*false/m.test(fm)) {
    fail('R7', f, 0, 'interactive phải là false');
  }
  const sourceUrls = [...fm.matchAll(/url:\s*"(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  const https = sourceUrls.filter((u) => u.startsWith('https://'));
  if (https.length < 2) fail('R8', f, 0, `chỉ ${https.length} nguồn HTTPS (tối thiểu 2)`);
}
if (!errors.some((e) => e.includes('[R8]'))) {
  report.push('Frontmatter 4 bài EN: custom_slug khớp, has_infographic/interactive = false, enum + ≥2 nguồn HTTPS');
}

// ===== R9: 4 cặp route trong contentRoutes.ts =====
for (const { vi, en } of ROUTE_PAIRS) {
  if (!textOf[ROUTES_FILE].includes(`vi: '${vi}'`)) errors.push(`[R9] contentRoutes thiếu cặp vi: '${vi}'`);
  if (!textOf[ROUTES_FILE].includes(`en: '${en}'`)) errors.push(`[R9] contentRoutes thiếu cặp en: '${en}'`);
}
if (!errors.some((e) => e.includes('[R9]'))) {
  report.push(`4 cặp route có trong contentRoutes.ts (${ROUTE_PAIRS.map((p) => p.vi).join(', ')})`);
}

// ===== R10: hồ sơ + biên bản =====
report.push(`Hồ sơ nguồn + biên bản nghiệm thu tồn tại (${DOC_FILES.length} tệp)`);

// ===== R1-R6 tổng kết =====
if (!errors.some((e) => e.startsWith('[R1]'))) report.push('R1: không khái quát hóa cấu trúc (mọi/every/all chronograph)');
if (!errors.some((e) => e.startsWith('[R2]'))) report.push('R2: dữ kiện lịch sử khớp hồ sơ nguồn (1821, không Hamilton/calibre phân khúc/9 cột/40°/3 dự án)');
if (!errors.some((e) => e.startsWith('[R3]'))) report.push('R3: mọi claim "đầu tiên" đều có marker nguồn trên cùng dòng');
if (!errors.some((e) => e.startsWith('[R4]'))) report.push('R4: tachymeter luôn "tốc độ trung bình" có điều kiện quãng đường/đơn vị');
if (!errors.some((e) => e.startsWith('[R5]'))) report.push('R5: 4 bài EN không có link nội bộ về route tiếng Việt');
if (!errors.some((e) => e.startsWith('[R6]'))) report.push('R6: hình học vạch đúng chiều (ngắn→gần, dài→xa), không khẳng định tuyệt đối chronograph, không title cũ');

// ===== Kết luận =====
console.log('KIỂM TRA CỤM CHRONOGRAPH & TACHYMETER SONG NGỮ:');
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — cụm Chronograph & Tachymeter khớp hồ sơ nguồn, không hồi quy.');
