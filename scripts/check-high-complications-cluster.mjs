#!/usr/bin/env node
// =============================================================================
// check-high-complications-cluster.mjs — chống hồi quy cụm
// "Tourbillon & điểm chuông (Minute Repeater)" (Prompt 41)
// =============================================================================
// Chạy trong `npm run check`. Quét đúng 8 bài vi/en của cụm:
//
//   R1. 4 bài EN mới + frontmatter hợp lệ (custom_slug khớp slug tệp;
//       has_infographic/interactive = false; enum category/difficulty;
//       ≥2 nguồn HTTPS).
//   R2. Đủ đúng 4 cặp route mới trong src/i18n/contentRoutes.ts.
//   R3. Mọi liên kết nội bộ bắt buộc cụm (vi + en) có trong bài và đích tồn tại.
//   R4. 4 bài EN không có internal link nội dung về route tiếng Việt.
//   R5. Không còn các khẳng định cấm trong phạm vi 8 bài (quét PHẦN THÂN):
//         - Tourbillon: flying/double/triple axis, titan/nhôm, 360, 60 giây,
//           "về 0/tự bù hoàn toàn", hiệu quả trên cổ tay, vật liệu/chi tiết;
//           Breguet + 1801 + "một vòng mỗi phút" CHỈ trong cửa sổ FHH cùng dòng
//         - Minute repeater: thế kỷ 18/19, đèn pin/điện, Robert Robin,
//           gong/búa/snail cam/rack, quy ước đếm tiếng, "kêu khác nhau",
//           listening room/chất âm; mốc 1700-1710/Mudge/1750/miền nam nước Đức
//           + grande/petite sonnerie + silent slide CHỈ trong cửa sổ FHH
//         - thương hiệu trong thân bài (Patek, Journe, Lange, Vacheron,
//           Greubel, Jaeger…)
//         - giá/phân khúc/đắt/hiếm/đỉnh cao/kiệt tác/"khó nhất/đẹp nhất"
//         - thẩm mỹ, nhận biết bằng mắt, khuyến nghị mua/nghe
//         - karussel CHỈ trong cửa sổ FHH cùng dòng
//         - MỌI DÒNG BẢNG trong 8 bài
//   R6. Relation trong frontmatter tiếng Việt trung tính.
//   R7. Hồ sơ nguồn + biên bản nghiệm thu tồn tại.
//
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';

const FILES = {
  vi: [
    'src/content/coChe/vi/tourbillon.md',
    'src/content/coChe/vi/diem-chuong.md',
    'src/content/tuDien/vi/tourbillon.md',
    'src/content/tuDien/vi/minute-repeater.md',
  ],
  en: [
    'src/content/coChe/en/tourbillon.md',
    'src/content/coChe/en/minute-repeater.md',
    'src/content/tuDien/en/tourbillon.md',
    'src/content/tuDien/en/minute-repeater.md',
  ],
};

const ROUTES_FILE = 'src/i18n/contentRoutes.ts';
const DOC_FILES = [
  'docs/ho-so-nguon-cum-tourbillon-va-diem-chuong-song-ngu.md',
  'docs/nghiem-thu/2026-09-04_nghiem-thu-cum-tourbillon-va-diem-chuong-song-ngu.md',
];

const REQUIRED_LINKS = {
  'src/content/coChe/vi/tourbillon.md': [
    '](/tu-dien/tourbillon)',
    '](/tu-dien/day-toc-banh-lac)',
    '](/co-che/bo-thoat)',
    '](/co-che/chuyen-dong-co)',
  ],
  'src/content/coChe/vi/diem-chuong.md': [
    '](/co-che/tourbillon)',
    '](/tu-dien/minute-repeater)',
    '](/co-che/chuyen-dong-co)',
  ],
  'src/content/tuDien/vi/tourbillon.md': [
    '](/co-che/tourbillon)',
  ],
  'src/content/tuDien/vi/minute-repeater.md': [
    '](/co-che/diem-chuong)',
    '](/co-che/tourbillon)',
  ],
  'src/content/coChe/en/tourbillon.md': [
    '](/en/glossary/tourbillon/)',
    '](/en/glossary/hairspring/)',
    '](/en/mechanisms/escapement/)',
    '](/en/mechanisms/minute-repeater/)',
  ],
  'src/content/coChe/en/minute-repeater.md': [
    '](/en/mechanisms/tourbillon/)',
    '](/en/glossary/minute-repeater/)',
    '](/en/mechanisms/how-a-mechanical-watch-works/)',
  ],
  'src/content/tuDien/en/tourbillon.md': [
    '](/en/mechanisms/tourbillon/)',
    '](/en/mechanisms/minute-repeater/)',
  ],
  'src/content/tuDien/en/minute-repeater.md': [
    '](/en/mechanisms/minute-repeater/)',
    '](/en/mechanisms/tourbillon/)',
  ],
};

const LINK_TARGETS = {
  '/tu-dien/tourbillon': 'src/content/tuDien/vi/tourbillon.md',
  '/tu-dien/day-toc-banh-lac': 'src/content/tuDien/vi/day-toc-banh-lac.md',
  '/tu-dien/minute-repeater': 'src/content/tuDien/vi/minute-repeater.md',
  '/co-che/tourbillon': 'src/content/coChe/vi/tourbillon.md',
  '/co-che/diem-chuong': 'src/content/coChe/vi/diem-chuong.md',
  '/co-che/bo-thoat': 'src/content/coChe/vi/bo-thoat.md',
  '/co-che/chuyen-dong-co': 'src/content/coChe/vi/chuyen-dong-co.md',
  '/en/glossary/tourbillon/': 'src/content/tuDien/en/tourbillon.md',
  '/en/glossary/minute-repeater/': 'src/content/tuDien/en/minute-repeater.md',
  '/en/glossary/hairspring/': 'src/content/tuDien/en/hairspring.md',
  '/en/mechanisms/tourbillon/': 'src/content/coChe/en/tourbillon.md',
  '/en/mechanisms/minute-repeater/': 'src/content/coChe/en/minute-repeater.md',
  '/en/mechanisms/escapement/': 'src/content/coChe/en/escapement.md',
  '/en/mechanisms/how-a-mechanical-watch-works/': 'src/content/coChe/en/how-a-mechanical-watch-works.md',
};

const EN_SLUGS = {
  'src/content/coChe/en/tourbillon.md': 'tourbillon',
  'src/content/coChe/en/minute-repeater.md': 'minute-repeater',
  'src/content/tuDien/en/tourbillon.md': 'tourbillon',
  'src/content/tuDien/en/minute-repeater.md': 'minute-repeater',
};

// Schema từng collection: coChe = category+difficulty+infographic+interactive;
// tuDien = category+infographic+interactive.
const FRONTMATTER_RULES = {
  'src/content/coChe/en/tourbillon.md': ['category', 'difficulty', 'infographic', 'interactive'],
  'src/content/coChe/en/minute-repeater.md': ['category', 'difficulty', 'infographic', 'interactive'],
  'src/content/tuDien/en/tourbillon.md': ['category', 'infographic', 'interactive'],
  'src/content/tuDien/en/minute-repeater.md': ['category', 'infographic', 'interactive'],
};

const ROUTE_PAIRS = [
  { vi: '/co-che/tourbillon', en: '/en/mechanisms/tourbillon/' },
  { vi: '/co-che/diem-chuong', en: '/en/mechanisms/minute-repeater/' },
  { vi: '/tu-dien/tourbillon', en: '/en/glossary/tourbillon/' },
  { vi: '/tu-dien/minute-repeater', en: '/en/glossary/minute-repeater/' },
];

const VALID_CATEGORIES = ['nền tảng', 'bổ trợ', 'phức tạp', 'phức tạp chức năng', 'thiết kế', 'bộ máy', 'chứng nhận'];
const VALID_DIFFICULTIES = ['cơ bản', 'thấp', 'trung bình', 'trung cấp', 'người mới', 'nâng cao', 'cao', 'rất cao'];

// ===== R5: các khẳng định cấm (quét PHẦN THÂN, 8 bài) =====
const BANNED = [
  // Tourbillon — cấm tuyệt đối
  { re: /flying|\bfly\b|lơ lửng|double[- ]axis|triple[- ]axis|hai trục|ba trục|double tourbillon|gyrotourbillon/i,
    why: 'biến thể tourbillon (đã loại)' },
  { re: /titanium|aluminium|\btitan\b|nhôm|chi tiết siêu nhỏ|0[.,]001/i,
    why: 'vật liệu/số chi tiết tourbillon (đã loại)' },
  { re: /60 giây|60 seconds|24 giây|24 seconds|360\b|về 0|to zero|tự bù hoàn toàn|trung bình về/i,
    why: 'số đo tốc độ/khẳng định "về 0" (đã loại)' },
  { re: /trên cổ tay|wrist(watch)? effectiveness|hiệu quả.*(cổ tay|đeo tay)|đeo tay.*hiệu quả/i,
    why: 'hiệu quả tourbillon trên đồng hồ đeo tay (đã loại)' },
  // Tourbillon + repeater — số/claim nhạy cảm CHỈ trong cửa sổ FHH cùng dòng
  { re: /Breguet|1801|once a minute|một vòng mỗi phút|karussel/i,
    why: 'claim tourbillon có nguồn ngoài cửa sổ attribution FHH cùng dòng',
    allow: /FHH/i },
  { re: /1700|1710|1750|Mudge|miền nam nước Đức|southern Germany|grande sonnerie|petite sonnerie|passing strike|all or nothing|silent/i,
    why: 'claim minute repeater/sonnerie có nguồn ngoài cửa sổ attribution FHH cùng dòng',
    allow: /FHH/i },
  // Minute repeater — cấm tuyệt đối
  { re: /thế kỷ 18|18th century|1700|1710|1750|Mudge|miền nam nước Đức|southern Germany|grande sonnerie|petite sonnerie|passing strike|all or nothing|silent/i,
    why: 'claim minute repeater/sonnerie có nguồn ngoài cửa sổ attribution FHH cùng dòng',
    allow: /FHH/i },
  { re: /thế kỷ 19|19th century|đèn pin|flashlight|torch|trước khi có điện|Robert Robin|safety matches/i,
    why: 'lịch sử thế kỷ 19 + điện/đèn pin (đã loại)' },
  { re: /hai gong|ba gong|two gongs|three gongs|số búa|\bhammer|snail cam|\brack\b|đếm tiếng|3 giờ 3|counting the (strikes|tones)/i,
    why: 'cấu tạo chi tiết/quy ước đếm tiếng (đã loại)' },
  { re: /kêu khác nhau|sounds different|listening room|phòng nghe|chất âm|each (piece|watch) (sounds|is different)/i,
    why: 'mô tả chất âm/"mỗi chiếc kêu khác" (đã loại)' },
  // Thương hiệu trong thân bài — cấm tuyệt đối
  { re: /Patek|Journe|Lange|Vacheron|Greubel|Jaeger|Girard|Asaoka/i,
    why: 'tên thương hiệu trong thân bài (đã loại)' },
  // Giá trị/xếp hạng/thẩm mỹ/nhận biết — cấm tuyệt đối
  { re: /đắt|danh giá|đỉnh cao|kiệt tác|hiếm nhất|khó nhất|khó chế tạo|đẹp nhất|\bđẹp\b|dễ ngắm|ultra luxury|haute horlogerie|giá tham khảo|reference price|expensive|most (difficult|beautiful|prestigious)/i,
    why: 'giá/phân khúc/xếp hạng/thẩm mỹ (đã loại)',
    allow: /FHH|Fondation/i },
  { re: /nhận biết|qua mặt sau|mặt số mở|cần gạt bên trái|dress watch|how to (spot|recognize)/i,
    why: 'nhận biết bằng mắt (đã loại)' },
  { re: /nên nghe|nghe thử|khuyến nghị mua|buying (advice|recommendation)|we recommend/i,
    why: 'khuyến nghị mua/nghe (đã loại)' },
];

// R6: relation Việt phải trung tính.
const RELATION_BANNED = /\d{3,}|bố cục|layout|nhảy|instant|chức năng|âm thanh|chime|thể thao|sport|độ chính xác|accuracy|công bố|published|in-house|trung tâm|lồng nhau/i;

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
  console.log('KIỂM TRA CỤM TOURBILLON & ĐIỂM CHUÔNG — CÓ LỖI:');
  for (const e of errors) console.log(`  LỖI  ${e}`);
  process.exit(1);
}

// ===== R1: frontmatter 4 bài EN =====
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
  report.push('4 bài EN tồn tại, frontmatter hợp lệ (slug, false-flags, enum, ≥2 nguồn HTTPS)');
}

// ===== R2: 4 cặp route mới =====
for (const { vi, en } of ROUTE_PAIRS) {
  if (!textOf[ROUTES_FILE].includes(`vi: '${vi}'`)) errors.push(`[R2] contentRoutes thiếu cặp vi: '${vi}'`);
  if (!textOf[ROUTES_FILE].includes(`en: '${en}'`)) errors.push(`[R2] contentRoutes thiếu cặp en: '${en}'`);
}
if (!errors.some((e) => e.includes('[R2]'))) {
  report.push(`4 cặp route mới có trong contentRoutes.ts (${ROUTE_PAIRS.map((p) => p.vi).join(', ')})`);
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

// ===== R4 + R5: quét dòng 8 bài (theo phần thân) =====
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
    // Bảng: mọi dòng bảng trong 8 bài đều bị loại
    if (line.trim().startsWith('|')) {
      fail('R5', f, i + 1, 'dạng bảng so sánh đã bị loại trong cụm này');
    }
  }
}
if (!errors.some((e) => e.includes('[R4]'))) report.push('R4: 4 bài EN không có link nội bộ về route tiếng Việt');
if (!errors.some((e) => e.includes('[R5]'))) report.push('R5: sạch các khẳng định cấm (biến thể/vật liệu tourbillon, số đo "về 0", hiệu quả cổ tay, claim FHH ngoài cửa sổ, lịch sử repeater, gong/búa/cam/rack, chất âm, thương hiệu thân bài, giá/xếp hạng/thẩm mỹ, nhận biết bằng mắt, khuyến nghị mua/nghe, bảng)');

// ===== R6: relation Việt phải trung tính =====
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

// ===== R7: hồ sơ + biên bản =====
report.push(`Hồ sơ nguồn + biên bản nghiệm thu tồn tại (${DOC_FILES.length} tệp)`);

// ===== Kết luận =====
console.log('KIỂM TRA CỤM TOURBILLON & ĐIỂM CHUÔNG SONG NGỮ:');
console.log(`  Phạm vi: ${FILES.vi.length} bài vi + ${FILES.en.length} bài en; ${ROUTE_PAIRS.length} cặp route mới`);
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — cụm tourbillon & điểm chuông khớp hồ sơ nguồn, không hồi quy.');
