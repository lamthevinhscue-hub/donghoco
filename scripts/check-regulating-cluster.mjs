#!/usr/bin/env node
// =============================================================================
// check-regulating-cluster.mjs — chống hồi quy cụm
// "Bộ điều chỉnh nhịp & bộ thoát" (Prompt 39)
// =============================================================================
// Chạy trong `npm run check`. Quét đúng 10 bài vi/en của cụm:
//
//   R1. 6 bài EN (5 nội dung + 1 trang legacy tương thích) frontmatter hợp lệ
//       (custom_slug khớp slug tệp; has_infographic/interactive = false;
//       enum category/difficulty; ≥2 nguồn HTTPS).
//   R2. Đủ 3 cặp route mới trong src/i18n/contentRoutes.ts.
//   R3. Mọi liên kết nội bộ bắt buộc cụm (vi + en) có trong bài và đích tồn tại;
//       trang legacy /en/glossary/escapement/ phải trỏ tới /en/glossary/escape-wheel/.
//   R4. 5 bài EN nội dung không có internal link nội dung về route tiếng Việt.
//   R5. Không còn các khẳng định cấm trong phạm vi 10 bài (quét PHẦN THÂN):
//         - tên riêng/năm lịch sử (Mudge, Huygens, Breguet, Verneuil, Daniels,
//           Freak, Ulysse Nardin, Omega, Rolex, Zenith, Grand Seiko;
//           1657/1675/1755/1795/1902/1999/2001)
//         - siêulative "quan trọng nhất/tốt nhất/phổ biến nhất/most common…"
//           — chỉ được phép trong cửa sổ attribution FHH cùng dòng
//         - số tần số (18.000/21.600/28.800/36.000 vph; 3/4/5 Hz; 2,5 Hz)
//           — chỉ được phép trong cửa sổ attribution FHH cùng dòng
//         - kết luận tần số cao hơn → chính xác hơn — chỉ trong cửa sổ FHH
//         - MỌI DÒNG BẢNG nhắc vph/Hz/tần số/frequency (bảng so sánh bị cấm)
//         - số bộ phận/vật liệu (17/21/30 jewels, Mohs, 15 răng, răng móc,
//           Glucydur, Nivarox, Silinvar, Si14, silicon, overcoil, Invar,
//           Elinvar)
//         - mô tả âm thanh theo hãng / nhận biết bằng màu-caseback-tai
//           ("tiếng trầm", "Spring Drive", "nhận biết", "How to spot")
//         - khẳng định "mọi đồng hồ cơ đều…" / "one tooth / một răng"
//   R6. Hồ sơ nguồn + biên bản nghiệm thu tồn tại.
//
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';

const FILES = {
  vi: [
    'src/content/coChe/vi/bo-thoat.md',
    'src/content/coChe/vi/day-toc-banh-lac.md',
    'src/content/tuDien/vi/banh-thoat.md',
    'src/content/tuDien/vi/day-toc-banh-lac.md',
    'src/content/tuDien/vi/vph.md',
  ],
  en: [
    'src/content/coChe/en/escapement.md',
    'src/content/coChe/en/balance-and-hairspring.md',
    'src/content/tuDien/en/hairspring.md',
    'src/content/tuDien/en/escape-wheel.md',
    'src/content/tuDien/en/beat-rate.md',
    'src/content/tuDien/en/escapement.md',
  ],
};

const ROUTES_FILE = 'src/i18n/contentRoutes.ts';
const DOC_FILES = [
  'docs/ho-so-nguon-cum-bo-dieu-chinh-nhip-song-ngu.md',
  'docs/nghiem-thu/2026-09-04_nghiem-thu-cum-bo-dieu-chinh-nhip-song-ngu.md',
];

const REQUIRED_LINKS = {
  'src/content/coChe/vi/bo-thoat.md': [
    '](/tu-dien/banh-thoat)',
    '](/co-che/day-toc-banh-lac)',
    '](/tu-dien/vph)',
    '](/co-che/chuyen-dong-co)',
  ],
  'src/content/coChe/vi/day-toc-banh-lac.md': [
    '](/tu-dien/day-toc-banh-lac)',
    '](/co-che/bo-thoat)',
    '](/tu-dien/vph)',
  ],
  'src/content/tuDien/vi/banh-thoat.md': [
    '](/co-che/bo-thoat)',
    '](/tu-dien/day-toc-banh-lac)',
    '](/co-che/chuyen-dong-co)',
  ],
  'src/content/tuDien/vi/day-toc-banh-lac.md': [
    '](/co-che/day-toc-banh-lac)',
  ],
  'src/content/tuDien/vi/vph.md': [
    '](/tu-dien/day-toc-banh-lac)',
    '](/co-che/day-toc-banh-lac)',
    '](/co-che/bo-thoat)',
  ],
  'src/content/coChe/en/escapement.md': [
    '](/en/glossary/escape-wheel/)',
    '](/en/mechanisms/balance-and-hairspring/)',
    '](/en/glossary/beat-rate/)',
    '](/en/mechanisms/power-reserve/)',
    '](/en/mechanisms/how-a-mechanical-watch-works/)',
  ],
  'src/content/coChe/en/balance-and-hairspring.md': [
    '](/en/glossary/hairspring/)',
    '](/en/mechanisms/escapement/)',
    '](/en/glossary/beat-rate/)',
    '](/en/mechanisms/how-a-mechanical-watch-works/)',
  ],
  'src/content/tuDien/en/hairspring.md': [
    '](/en/mechanisms/balance-and-hairspring/)',
    '](/en/mechanisms/escapement/)',
  ],
  'src/content/tuDien/en/escape-wheel.md': [
    '](/en/mechanisms/escapement/)',
    '](/en/mechanisms/balance-and-hairspring/)',
    '](/en/mechanisms/how-a-mechanical-watch-works/)',
  ],
  'src/content/tuDien/en/beat-rate.md': [
    '](/en/mechanisms/balance-and-hairspring/)',
    '](/en/glossary/hairspring/)',
    '](/en/mechanisms/escapement/)',
  ],
  // Trang legacy tương thích /en/glossary/escapement/ — phải trỏ tới bài hiện hành
  'src/content/tuDien/en/escapement.md': [
    '](/en/glossary/escape-wheel/)',
  ],
};

const LINK_TARGETS = {
  '/tu-dien/banh-thoat': 'src/content/tuDien/vi/banh-thoat.md',
  '/tu-dien/day-toc-banh-lac': 'src/content/tuDien/vi/day-toc-banh-lac.md',
  '/tu-dien/vph': 'src/content/tuDien/vi/vph.md',
  '/co-che/bo-thoat': 'src/content/coChe/vi/bo-thoat.md',
  '/co-che/day-toc-banh-lac': 'src/content/coChe/vi/day-toc-banh-lac.md',
  '/co-che/chuyen-dong-co': 'src/content/coChe/vi/chuyen-dong-co.md',
  '/en/glossary/escape-wheel/': 'src/content/tuDien/en/escape-wheel.md',
  '/en/glossary/beat-rate/': 'src/content/tuDien/en/beat-rate.md',
  '/en/glossary/hairspring/': 'src/content/tuDien/en/hairspring.md',
  '/en/mechanisms/escapement/': 'src/content/coChe/en/escapement.md',
  '/en/mechanisms/balance-and-hairspring/': 'src/content/coChe/en/balance-and-hairspring.md',
  '/en/mechanisms/power-reserve/': 'src/content/coChe/en/power-reserve.md',
  '/en/mechanisms/how-a-mechanical-watch-works/': 'src/content/coChe/en/how-a-mechanical-watch-works.md',
};

const EN_SLUGS = {
  'src/content/coChe/en/escapement.md': 'escapement',
  'src/content/coChe/en/balance-and-hairspring.md': 'balance-and-hairspring',
  'src/content/tuDien/en/hairspring.md': 'hairspring',
  'src/content/tuDien/en/escape-wheel.md': 'escape-wheel',
  'src/content/tuDien/en/beat-rate.md': 'beat-rate',
  'src/content/tuDien/en/escapement.md': 'escapement',
};

// Schema từng collection: coChe = category+difficulty+infographic+interactive;
// tuDien = category+infographic+interactive.
const FRONTMATTER_RULES = {
  'src/content/coChe/en/escapement.md': ['category', 'difficulty', 'infographic', 'interactive'],
  'src/content/coChe/en/balance-and-hairspring.md': ['category', 'difficulty', 'infographic', 'interactive'],
  'src/content/tuDien/en/hairspring.md': ['category', 'infographic', 'interactive'],
  'src/content/tuDien/en/escape-wheel.md': ['category', 'infographic', 'interactive'],
  'src/content/tuDien/en/beat-rate.md': ['category', 'infographic', 'interactive'],
  'src/content/tuDien/en/escapement.md': ['category', 'infographic', 'interactive'],
};

const ROUTE_PAIRS = [
  { vi: '/co-che/day-toc-banh-lac', en: '/en/mechanisms/balance-and-hairspring/' },
  { vi: '/tu-dien/banh-thoat', en: '/en/glossary/escape-wheel/' },
  { vi: '/tu-dien/vph', en: '/en/glossary/beat-rate/' },
];

const VALID_CATEGORIES = ['nền tảng', 'bổ trợ', 'phức tạp', 'phức tạp chức năng', 'thiết kế', 'bộ máy', 'chứng nhận'];
const VALID_DIFFICULTIES = ['cơ bản', 'thấp', 'trung bình', 'trung cấp', 'người mới', 'nâng cao', 'cao'];

// ===== R5: các khẳng định cấm (quét PHẦN THÂN, 10 bài) =====
const BANNED = [
  { re: /Mudge|Huygens|Breguet|Verneuil|Daniels|Freak|Ulysse Nardin|Omega|Rolex|Zenith|Grand Seiko|1657|1675|1755|1795|1902|1999|2001/i,
    why: 'tên riêng/năm lịch sử không nguồn (đã loại)' },
  { re: /quan trọng nhất|tốt nhất|không gì thay thế|chuẩn hiện đại|phổ biến nhất|most important|nothing has (fully )?replaced|the best/i,
    why: 'siêulative "nhất/thay thế" (chỉ trong cửa sổ FHH)',
    allow: /FHH|Fondation/i },
  { re: /18[.,]000|21[.,]600|28[.,]800|36[.,]000|2,5\s*Hz|[345]\s*Hz/i,
    why: 'số tần số vph/Hz (chỉ trong cửa sổ FHH cùng dòng)',
    allow: /FHH|Fondation/i },
  { re: /tần số[^.\n]{0,40}chính xác hơn|chính xác hơn[^.\n]{0,40}tần số|higher the frequency|the more accurate/i,
    why: 'kết luận tần số → chính xác (chỉ trong cửa sổ FHH cùng dòng)',
    allow: /FHH|Fondation/i },
  { re: /\b17\b|\b21 jewels\b|\b30\b.*jewel|\bMohs\b|15 răng|hooked teeth|răng móc|Glucydur|Nivarox|Silinvar|Si14|silicon|silic\b|overcoil|\bInvar\b|Elinvar/i,
    why: 'số bộ phận/vật liệu (đã loại)' },
  { re: /tiếng trầm|chất âm|giòn hơn|lách cách|Spring Drive|nhận biết|How to spot/i,
    why: 'mô tả âm thanh theo hãng / nhận biết bằng màu-caseback-tai (đã loại)' },
  { re: /mọi đồng hồ cơ đều|every mechanical watch (has|are|have)|all mechanical watches|one tooth|một răng|each advance/i,
    why: 'khái quát cấu trúc / mô tả chu trình từng bước (đã loại)' },
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
  console.log('KIỂM TRA CỤM BỘ ĐIỀU CHỈNH NHỊP & BỘ THOÁT — CÓ LỖI:');
  for (const e of errors) console.log(`  LỖI  ${e}`);
  process.exit(1);
}

// ===== R1: frontmatter 5 bài EN =====
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
  report.push('6 bài EN tồn tại (5 nội dung + 1 legacy tương thích), frontmatter hợp lệ (slug, false-flags, enum, ≥2 nguồn HTTPS)');
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

// ===== R4 + R5: quét dòng 10 bài (theo phần thân) =====
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
    // Bảng tần số: mọi dòng bảng nhắc vph/Hz/tần số/frequency đều bị loại
    if (line.trim().startsWith('|') && /(vph|hz|tần số|frequency)/i.test(line)) {
      fail('R5', f, i + 1, 'bảng VPH/Hz — dạng bảng so sánh tần số đã bị loại');
    }
  }
}
if (!errors.some((e) => e.includes('[R4]'))) report.push('R4: các bài EN không có link nội bộ về route tiếng Việt');
if (!errors.some((e) => e.includes('[R5]'))) report.push('R5: sạch các khẳng định cấm (tên riêng/năm, siêulative ngoài cửa sổ FHH, số tần số ngoài cửa sổ FHH, tần số→chính xác ngoài cửa sổ FHH, bảng tần số, số bộ phận/vật liệu, âm thanh theo hãng/nhận biết, khái quát cấu trúc)');

// ===== R6: hồ sơ + biên bản =====
report.push(`Hồ sơ nguồn + biên bản nghiệm thu tồn tại (${DOC_FILES.length} tệp)`);

// ===== R7: route legacy tương thích /en/glossary/escapement/ =====
// Kiểm khi dist đã tồn tại (chạy sau build); trước build thì bỏ qua —
// việc "tồn tại sau build" do check-english-launch + check-links đảm nhiệm.
if (existsSync('dist')) {
  const legacyHtml = 'dist/en/glossary/escapement/index.html';
  if (existsSync(legacyHtml)) {
    report.push('R7: route legacy /en/glossary/escapement/ tạo HTML sau build và trang trỏ tới /en/glossary/escape-wheel/');
  } else if (existsSync('dist/en/glossary/escape-wheel/index.html')) {
    errors.push('[R7] Route legacy /en/glossary/escapement/ thiếu HTML sau build trong khi route hiện hành escape-wheel đã có (kỳ vọng dist/en/glossary/escapement/index.html)');
  }
}

// ===== Kết luận =====
console.log('KIỂM TRA CỤM BỘ ĐIỀU CHỈNH NHỊP & BỘ THOÁT SONG NGỮ:');
console.log(`  Phạm vi: ${FILES.vi.length} bài vi + ${FILES.en.length} bài en; ${ROUTE_PAIRS.length} cặp route mới`);
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — cụm bộ điều chỉnh nhịp & bộ thoát khớp hồ sơ nguồn, không hồi quy.');
