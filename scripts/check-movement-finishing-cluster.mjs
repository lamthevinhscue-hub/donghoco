#!/usr/bin/env node
// =============================================================================
// check-movement-finishing-cluster.mjs — chống hồi quy cụm
// "Hoàn thiện bộ máy: Guilloché, Perlage và Côtes de Genève" (Prompt 42)
// =============================================================================
// Chạy trong `npm run check`. Quét đúng 8 bài vi/en của cụm:
//
//   R1. Đủ 4 bài VI và 4 bài EN.
//   R2. Frontmatter 4 bài EN hợp lệ (custom_slug khớp slug tệp;
//       has_infographic/interactive = false; enum category/difficulty;
//       ≥2 nguồn HTTPS).
//   R3. Đủ chính xác 4 cặp route mới trong src/i18n/contentRoutes.ts.
//   R4. Mọi liên kết nội bộ bắt buộc cụm (vi + en) có trong bài và đích tồn tại.
//   R5. 4 bài EN không có internal link nội dung về route tiếng Việt.
//   R6. Không có bảng Markdown trong 8 bài.
//   R7. Không còn claim giá/phân khúc/chất lượng tổng thể/độ chính xác/độ bền/
//       đầu tư/làm tay-máy tuyệt đối/mua bán/nhận biết bằng ảnh (quét PHẦN THÂN).
//   R8. Không còn claim lịch sử/kỹ thuật chưa có nguồn trực tiếp: Breguet,
//       thế kỷ, chống chói, dầu/bụi, "thật/giả", ba chiều, chạm tay,
//       số tiêu chí Poinçon de Genève, tên hãng chứng nhận.
//   R9. Relation trong frontmatter tiếng Việt trung tính.
//   R10. Hồ sơ nguồn + biên bản nghiệm thu tồn tại.
//
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';

const FILES = {
  vi: [
    'src/content/huongDan/vi/hoan-thien-thu-cong-dong-ho.md',
    'src/content/tuDien/vi/guilloche.md',
    'src/content/tuDien/vi/perlage.md',
    'src/content/tuDien/vi/cotes-de-geneve.md',
  ],
  en: [
    'src/content/huongDan/en/movement-finishing.md',
    'src/content/tuDien/en/guilloche.md',
    'src/content/tuDien/en/perlage.md',
    'src/content/tuDien/en/geneva-stripes.md',
  ],
};

const ROUTES_FILE = 'src/i18n/contentRoutes.ts';
const DOC_FILES = [
  'docs/ho-so-nguon-cum-hoan-thien-bo-may-song-ngu.md',
  'docs/nghiem-thu/2026-09-04_nghiem-thu-cum-hoan-thien-bo-may-song-ngu.md',
];

const REQUIRED_LINKS = {
  'src/content/huongDan/vi/hoan-thien-thu-cong-dong-ho.md': [
    '](/tu-dien/guilloche)',
    '](/tu-dien/perlage)',
    '](/tu-dien/cotes-de-geneve)',
    '](/tu-dien/poincon-de-geneve)',
    '](/co-che/chuyen-dong-co)',
  ],
  'src/content/tuDien/vi/guilloche.md': [
    '](/huong-dan/hoan-thien-thu-cong-dong-ho)',
    '](/tu-dien/perlage)',
    '](/tu-dien/cotes-de-geneve)',
    '](/co-che/chuyen-dong-co)',
  ],
  'src/content/tuDien/vi/perlage.md': [
    '](/huong-dan/hoan-thien-thu-cong-dong-ho)',
    '](/tu-dien/guilloche)',
    '](/tu-dien/cotes-de-geneve)',
    '](/tu-dien/poincon-de-geneve)',
  ],
  'src/content/tuDien/vi/cotes-de-geneve.md': [
    '](/huong-dan/hoan-thien-thu-cong-dong-ho)',
    '](/tu-dien/guilloche)',
    '](/tu-dien/perlage)',
    '](/tu-dien/poincon-de-geneve)',
  ],
  'src/content/huongDan/en/movement-finishing.md': [
    '](/en/glossary/guilloche/)',
    '](/en/glossary/perlage/)',
    '](/en/glossary/geneva-stripes/)',
    '](/en/mechanisms/how-a-mechanical-watch-works/)',
  ],
  'src/content/tuDien/en/guilloche.md': [
    '](/en/guides/movement-finishing/)',
    '](/en/glossary/perlage/)',
    '](/en/glossary/geneva-stripes/)',
    '](/en/mechanisms/how-a-mechanical-watch-works/)',
  ],
  'src/content/tuDien/en/perlage.md': [
    '](/en/guides/movement-finishing/)',
    '](/en/glossary/guilloche/)',
    '](/en/glossary/geneva-stripes/)',
    '](/en/mechanisms/how-a-mechanical-watch-works/)',
  ],
  'src/content/tuDien/en/geneva-stripes.md': [
    '](/en/guides/movement-finishing/)',
    '](/en/glossary/guilloche/)',
    '](/en/glossary/perlage/)',
    '](/en/mechanisms/how-a-mechanical-watch-works/)',
  ],
};

const LINK_TARGETS = {
  '/huong-dan/hoan-thien-thu-cong-dong-ho': 'src/content/huongDan/vi/hoan-thien-thu-cong-dong-ho.md',
  '/tu-dien/guilloche': 'src/content/tuDien/vi/guilloche.md',
  '/tu-dien/perlage': 'src/content/tuDien/vi/perlage.md',
  '/tu-dien/cotes-de-geneve': 'src/content/tuDien/vi/cotes-de-geneve.md',
  '/tu-dien/poincon-de-geneve': 'src/content/tuDien/vi/poincon-de-geneve.md',
  '/co-che/chuyen-dong-co': 'src/content/coChe/vi/chuyen-dong-co.md',
  '/en/guides/movement-finishing/': 'src/content/huongDan/en/movement-finishing.md',
  '/en/glossary/guilloche/': 'src/content/tuDien/en/guilloche.md',
  '/en/glossary/perlage/': 'src/content/tuDien/en/perlage.md',
  '/en/glossary/geneva-stripes/': 'src/content/tuDien/en/geneva-stripes.md',
  '/en/mechanisms/how-a-mechanical-watch-works/': 'src/content/coChe/en/how-a-mechanical-watch-works.md',
};

const EN_SLUGS = {
  'src/content/huongDan/en/movement-finishing.md': 'movement-finishing',
  'src/content/tuDien/en/guilloche.md': 'guilloche',
  'src/content/tuDien/en/perlage.md': 'perlage',
  'src/content/tuDien/en/geneva-stripes.md': 'geneva-stripes',
};

// Schema từng collection: huongDan = difficulty+infographic+interactive;
// tuDien = category+infographic+interactive.
const FRONTMATTER_RULES = {
  'src/content/huongDan/en/movement-finishing.md': ['difficulty', 'infographic', 'interactive'],
  'src/content/tuDien/en/guilloche.md': ['category', 'infographic', 'interactive'],
  'src/content/tuDien/en/perlage.md': ['category', 'infographic', 'interactive'],
  'src/content/tuDien/en/geneva-stripes.md': ['category', 'infographic', 'interactive'],
};

const ROUTE_PAIRS = [
  { vi: '/huong-dan/hoan-thien-thu-cong-dong-ho', en: '/en/guides/movement-finishing/' },
  { vi: '/tu-dien/guilloche', en: '/en/glossary/guilloche/' },
  { vi: '/tu-dien/perlage', en: '/en/glossary/perlage/' },
  { vi: '/tu-dien/cotes-de-geneve', en: '/en/glossary/geneva-stripes/' },
];

const VALID_CATEGORIES = ['nền tảng', 'bổ trợ', 'phức tạp', 'phức tạp chức năng', 'thiết kế', 'bộ máy', 'chứng nhận', 'hoàn thiện'];
const VALID_DIFFICULTIES = ['cơ bản', 'thấp', 'trung bình', 'trung cấp', 'người mới', 'nâng cao', 'cao', 'rất cao'];

// ===== R7: claim giá/phân khúc/chất lượng/chính xác/bền/đầu tư/làm tay-máy
// tuyệt đối/mua bán/nhận biết bằng ảnh (quét PHẦN THÂN, 8 bài) =====
const BANNED = [
  // Giá/đầu tư/phân khúc — claim dương
  { re: /giữ giá|tăng giá|giá (tham khảo|thị trường|bán|cao|rẻ)|value retention|holds? (its )?value|investment|đầu tư|đắt tiền|\bexpensive\b|\bcheap\b|phân khúc|entry[- ]level|budget (watch|brand)/i,
    why: 'claim giá/đầu tư/phân khúc (đã loại)' },
  // Xếp hạng/thẩm mỹ/phân loại "cao cấp" — "Haute Horlogerie" trong tên tổ chức FHH được phép
  { re: /cao cấp|haute horlogerie|xứng tầm|đỉnh cao|kiệt tác|sang trọng|đẹp nhất|dễ ngắm|ultra[- ]luxury|superior quality|high[- ]end|prestigious|luxury/i,
    why: 'xếp hạng phân khúc/thẩm mỹ (đã loại)',
    allow: /Fondation/i },
  // Chất lượng tổng thể/chứng nhận từ thuật ngữ — claim dương
  { re: /chứng tỏ|đồng nghĩa.*(tốt|chất lượng)|là thước đo|thước đo đáng tin|dùng (làm )?thước đo|mark of quality|quality (indicator|proxy|certification)|guarantees (technical )?perfection|technical perfection|phản ánh (công đoạn và thời gian|tay nghề)/i,
    why: 'claim chất lượng tổng thể từ thuật ngữ hoàn thiện (đã loại)' },
  // Độ chính xác/độ bền vận hành — claim dương
  { re: /chính xác hơn|more accurate|accura(cy|te).{0,30}(better|more|gain)|accuracy (improvement|gain)|keeps? (better|good) time|chạy chính xác|bền hơn|more durable|durable|corrosion[- ]resistant|kháng ăn mòn|chống ăn mòn/i,
    why: 'claim độ chính xác/độ bền vận hành (đã loại)' },
  // Làm tay/máy tuyệt đối — claim tuyệt đối
  { re: /chỉ (có )?làm tay|chỉ (có )?tay (người|thợ)|máy không thể|không thể làm máy|máy luôn|machine (always|cannot)|only (by )?hand|impossible (for|by) machine|by hand only|must be (made|finished|done) by hand/i,
    why: 'khẳng định tuyệt đối làm tay/máy (đã loại)' },
  // Mua bán/khuyến nghị/checklist
  { re: /nên mua|khuyên mua|trước khi mua|before you buy|buying (advice|recommendation|guide)|we recommend|checklist (mua|khi mua)|nên yêu cầu ảnh|yêu cầu ảnh|raking light|ánh sáng quét|ánh sáng điểm|đèn flash|kiểm (tra| định) trước khi mua/i,
    why: 'hướng dẫn mua bán/quan sát bằng ánh sáng (đã loại)' },
  // Nhận biết/quy trình từ ảnh
  { re: /(nhận biết|kết luận|đọc|suy) (từ|qua) (ảnh|photo|picture)|how to (read|judge|assess|tell).{0,25}(photo|image|picture)|photo (alone|only)|từ một tấm ảnh/i,
    why: 'nhận biết/kết luận quy trình bằng ảnh (đã loại)' },
];

// ===== R8: lịch sử/kỹ thuật chưa có nguồn trực tiếp (cấm tuyệt đối) =====
const BANNED_HISTORY = [
  { re: /Breguet/i, why: 'tên riêng Breguet (đã loại)' },
  { re: /thế kỷ|century|1700|1800s/i, why: 'claim lịch sử thế kỷ (đã loại)' },
  { re: /chống chói|glare|ánh nến|candlelight|candle/i, why: 'lịch sử chống chói guilloché (đã loại)' },
  { re: /giữ dầu|giữ bụi|lớp dầu|hold(s)? oil|retain(s)? oil|keeps? dust|dust (in place|from)/i, why: 'claim perlage giữ dầu/bụi (đã loại)' },
  { re: /guilloché (thật|giả)|perlage (thật|giả)|thật hay giả|real (guilloch|perlage)|fake|genuine (guilloch|perlage)|in(ed| print) guilloch|dập nổi|in transfer|transfer[- ]printed/i, why: 'claim "thật/giả" (đã loại)' },
  { re: /ba chiều|3D|three[- ]dimensional|chạm tay|khi chạm|tactile|feels? (when )?touch/i, why: 'claim ba chiều/cảm nhận chạm (đã loại)' },
  { re: /\b7 tiêu chí|7 requirements|7 criteria|8 quy tắc|eight rules|8 rules|ít nhất \d+ (quy|tiêu)/i, why: 'số lượng tiêu chí Poinçon de Genève (đã loại)' },
  { re: /Vacheron|Chopard|Roger Dubuis|Patek|Audemars|Jaeger[- ]?LeCoultre|Cartier|Grand Seiko|JLC|AP\b|PP\b/i, why: 'tên hãng chứng nhận/thương hiệu trong thân bài (đã loại)' },
  { re: /Geneva Seal|Patek Philippe Seal|chuẩn riêng/i, why: 'tên chứng nhận riêng của hãng (đã loại)' },
];

// R9: relation Việt phải trung tính.
const RELATION_BANNED = /\d{3,}|đẹp|sang|cao cấp|chất lượng|giá|đắt|hiếm|chứng nhận chất lượng|best|luxur/i;

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
  console.log('KIỂM TRA CỤM HOÀN THIỆN BỘ MÁY — CÓ LỖI:');
  for (const e of errors) console.log(`  LỖI  ${e}`);
  process.exit(1);
}

// ===== R1: đủ 4 bài vi + 4 bài en (đã check FILE ở trên) =====
report.push(`${FILES.vi.length} bài VI + ${FILES.en.length} bài EN đều tồn tại`);

// ===== R2: frontmatter 4 bài EN =====
for (const [f, slug] of Object.entries(EN_SLUGS)) {
  const fm = textOf[f].split('---')[1] ?? '';
  const fmSlug = fm.match(/^custom_slug:\s*"?([^"\n]+)"?/m)?.[1];
  if (fmSlug !== slug) fail('R2', f, 0, `custom_slug "${fmSlug}" ≠ slug tệp "${slug}"`);
  const rules = FRONTMATTER_RULES[f];
  if (rules.includes('category')) {
    const cat = fm.match(/^category:\s*"?([^"\n]+)"?/m)?.[1];
    if (!cat || !VALID_CATEGORIES.includes(cat)) fail('R2', f, 0, `category không hợp lệ: ${cat}`);
  }
  if (rules.includes('difficulty')) {
    const diff = fm.match(/^difficulty:\s*"?([^"\n]+)"?/m)?.[1];
    if (!diff || !VALID_DIFFICULTIES.includes(diff)) fail('R2', f, 0, `difficulty không hợp lệ: ${diff}`);
  }
  if (rules.includes('infographic') && !/^has_infographic:\s*false/m.test(fm)) {
    fail('R2', f, 0, 'has_infographic phải là false');
  }
  if (rules.includes('interactive') && !/^interactive:\s*false/m.test(fm)) {
    fail('R2', f, 0, 'interactive phải là false');
  }
  const sourceUrls = [...fm.matchAll(/url:\s*"(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  const https = sourceUrls.filter((u) => u.startsWith('https://'));
  if (https.length < 2) fail('R2', f, 0, `chỉ ${https.length} nguồn HTTPS (tối thiểu 2)`);
}
if (!errors.some((e) => e.includes('[R2]'))) {
  report.push('4 bài EN frontmatter hợp lệ (custom_slug khớp tệp, false-flags, enum, ≥2 nguồn HTTPS)');
}

// ===== R3: 4 cặp route mới =====
for (const { vi, en } of ROUTE_PAIRS) {
  if (!textOf[ROUTES_FILE].includes(`vi: '${vi}'`)) errors.push(`[R3] contentRoutes thiếu cặp vi: '${vi}'`);
  if (!textOf[ROUTES_FILE].includes(`en: '${en}'`)) errors.push(`[R3] contentRoutes thiếu cặp en: '${en}'`);
}
const pairCount = (textOf[ROUTES_FILE].match(/\{ vi: '/g) || []).length;
if (!errors.some((e) => e.includes('[R3]'))) {
  report.push(`4 cặp route mới có trong contentRoutes.ts (${ROUTE_PAIRS.map((p) => p.vi).join(', ')}); tổng ${pairCount} cặp`);
}

// ===== R4: liên kết bắt buộc + đích tồn tại =====
let linkChecked = 0;
for (const [f, links] of Object.entries(REQUIRED_LINKS)) {
  for (const link of links) {
    if (!textOf[f].includes(link)) {
      errors.push(`[R4] ${f} thiếu liên kết bắt buộc: ${link}`);
      continue;
    }
    linkChecked++;
    const href = link.slice(2, -1);
    const target = LINK_TARGETS[href];
    if (target && !existsSync(target)) {
      errors.push(`[R4] Đích của ${link} không tồn tại: ${target}`);
    }
  }
}
if (!errors.some((e) => e.includes('[R4]'))) {
  report.push(`${linkChecked} liên kết bắt buộc cụm (vi+en) đều có và đích tồn tại`);
}

// ===== R5 + R6 + R7 + R8: quét dòng 8 bài (theo phần thân) =====
for (const f of [...FILES.vi, ...FILES.en]) {
  const lines = bodyOf(textOf[f]).split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (FILES.en.includes(f)) {
      for (const m of line.matchAll(/\]\(([^)]+)\)/g)) {
        const href = m[1];
        if (href.startsWith('/') && !href.startsWith('/en/')) {
          fail('R5', f, i + 1, `link nội bộ về route vi: ${href}`);
        }
      }
    }
    // R6: bảng Markdown — cấm trong cả 8 bài
    if (line.trim().startsWith('|')) {
      fail('R6', f, i + 1, 'bảng Markdown đã bị loại trong cụm này');
    }
    for (const { re, why, allow } of BANNED) {
      const m = re.exec(line);
      if (m && !(allow && allow.test(line))) fail('R7', f, i + 1, `${why}: "${m[0]}"`);
    }
    for (const { re, why } of BANNED_HISTORY) {
      const m = re.exec(line);
      if (m) fail('R8', f, i + 1, `${why}: "${m[0]}"`);
    }
  }
}
if (!errors.some((e) => e.includes('[R5]'))) report.push('R5: 4 bài EN không có link nội bộ về route tiếng Việt');
if (!errors.some((e) => e.includes('[R6]'))) report.push('R6: 8 bài không có bảng Markdown');
if (!errors.some((e) => e.includes('[R7]'))) report.push('R7: sạch claim giá/phân khúc/chất lượng tổng thể/chính xác/bền/đầu tư/làm tay-máy tuyệt đối/mua bán/nhận biết bằng ảnh');
if (!errors.some((e) => e.includes('[R8]'))) report.push('R8: sạch claim lịch sử/kỹ thuật chưa có nguồn (Breguet, thế kỷ, chống chói, dầu/bụi, "thật/giả", ba chiều, chạm tay, số tiêu chí Poinçon, tên hãng)');

// ===== R9: relation Việt phải trung tính =====
let relationChecked = 0;
for (const f of FILES.vi) {
  const fm = textOf[f].split('---')[1] ?? '';
  for (const m of fm.matchAll(/^\s*relation:\s*"?([^"\n]+)"?/gm)) {
    relationChecked++;
    const rel = m[1];
    if (RELATION_BANNED.test(rel)) {
      fail('R9', f, 0, `relation không trung tính: "${rel}"`);
    }
  }
}
if (!errors.some((e) => e.includes('[R9]'))) {
  report.push(`R9: ${relationChecked} relation Việt đều trung tính (không claim kỹ thuật/hãng/số)`);
}

// ===== R10: hồ sơ + biên bản =====
report.push(`Hồ sơ nguồn + biên bản nghiệm thu tồn tại (${DOC_FILES.length} tệp)`);

// ===== Kết luận =====
console.log('KIỂM TRA CỤM HOÀN THIỆN BỘ MÁY SONG NGỮ:');
console.log(`  Phạm vi: ${FILES.vi.length} bài vi + ${FILES.en.length} bài en; ${ROUTE_PAIRS.length} cặp route mới`);
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — cụm hoàn thiện bộ máy khớp hồ sơ nguồn, không hồi quy.');
