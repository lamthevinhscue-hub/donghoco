#!/usr/bin/env node
// =============================================================================
// check-daily-care-cluster.mjs — chống hồi quy cụm "Sử dụng an toàn hằng ngày"
// =============================================================================
// Chạy trong `npm run check`. Quét đúng 12 bài vi/en của Prompt 35:
//
//   R1. Đủ 6 bài EN + frontmatter hợp lệ (custom_slug khớp slug tệp;
//       has_infographic/interactive = false với coChe + tuDien; enum
//       category/difficulty theo schema; ≥2 nguồn HTTPS).
//   R2. Đủ 6 cặp route trong src/i18n/contentRoutes.ts.
//   R3. Mọi liên kết nội bộ bắt buộc cụm (vi + en) có trong bài và đích tồn tại.
//   R4. 6 bài EN không có internal link nội dung về route tiếng Việt.
//   R5. Không còn các khẳng định cấm trong phạm vi 12 bài:
//         - số vòng lên dây ("20–40 vòng"… /\d+\s*(vòng|turns)/) hoặc chu kỳ
//           gioăng "3–5 năm"
//         - khung giờ cấm chỉnh lịch áp cho mọi mẫu ("khung giờ nguy hiểm",
//           "danger zone", "20:00–04:00" kèm từ cấm trên cùng dòng)
//         - "waterproof" / "chống nước tuyệt đối"
//         - khẳng định mọi automatic không cần lên dây
//         - hướng dẫn "vặn đến khi căng" / "wind until tight"
//         - ngưỡng chống nước gắn hoạt động mà không kèm manual/nguồn trên dòng
//         - "tuyệt đối không bấm nút" (khuyến nghị phải kèm nguồn + ngoại lệ)
//   R6. Hồ sơ nguồn + biên bản nghiệm thu tồn tại.
//
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';

const FILES = {
  vi: [
    'src/content/huongDan/vi/len-day-dong-ho.md',
    'src/content/huongDan/vi/muc-chong-nuoc.md',
    'src/content/huongDan/vi/chinh-lich-an-toan.md',
    'src/content/coChe/vi/chong-nuoc.md',
    'src/content/tuDien/vi/num-van.md',
    'src/content/tuDien/vi/day-cot.md',
  ],
  en: [
    'src/content/huongDan/en/winding-a-mechanical-watch.md',
    'src/content/huongDan/en/water-resistance.md',
    'src/content/huongDan/en/setting-the-date-safely.md',
    'src/content/coChe/en/water-resistance.md',
    'src/content/tuDien/en/crown.md',
    'src/content/tuDien/en/mainspring.md',
  ],
};

const ROUTES_FILE = 'src/i18n/contentRoutes.ts';
const EXTRA_LINK_FILES = ['src/content/huongDan/en/first-mechanical-watch.md'];
const DATE_FILE = 'src/components/interactive/DateSafety.astro';
const WR_FILES = new Set([
  'src/content/huongDan/vi/muc-chong-nuoc.md',
  'src/content/huongDan/en/water-resistance.md',
  'src/content/coChe/vi/chong-nuoc.md',
  'src/content/coChe/en/water-resistance.md',
]);
const DATE_GUIDE_FILES = new Set([
  'src/content/huongDan/vi/chinh-lich-an-toan.md',
  'src/content/huongDan/en/setting-the-date-safely.md',
]);
const DOC_FILES = [
  'docs/ho-so-nguon-cum-su-dung-an-toan-song-ngu.md',
  'docs/nghiem-thu/2026-09-03_nghiem-thu-cum-su-dung-an-toan-song-ngu.md',
];

const REQUIRED_LINKS = {
  'src/content/huongDan/vi/len-day-dong-ho.md': [
    '](/tu-dien/num-van)',
    '](/tu-dien/day-cot)',
    '](/huong-dan/muc-chong-nuoc)',
    '](/huong-dan/chon-dong-ho-dau-tien)',
  ],
  'src/content/huongDan/en/winding-a-mechanical-watch.md': [
    '](/en/glossary/crown/)',
    '](/en/glossary/mainspring/)',
    '](/en/guides/water-resistance/)',
    '](/en/guides/first-mechanical-watch/)',
  ],
  'src/content/huongDan/vi/muc-chong-nuoc.md': [
    '](/tu-dien/num-van)',
    '](/co-che/chong-nuoc)',
    '](/huong-dan/chon-dong-ho-dau-tien)',
  ],
  'src/content/huongDan/en/water-resistance.md': [
    '](/en/mechanisms/water-resistance/)',
    '](/en/glossary/crown/)',
    '](/en/guides/winding-a-mechanical-watch/)',
    '](/en/guides/first-mechanical-watch/)',
  ],
  'src/content/huongDan/vi/chinh-lich-an-toan.md': [
    '](/tu-dien/num-van)',
    '](/huong-dan/len-day-dong-ho)',
  ],
  'src/content/huongDan/en/setting-the-date-safely.md': [
    '](/en/glossary/crown/)',
    '](/en/guides/winding-a-mechanical-watch/)',
  ],
  'src/content/coChe/vi/chong-nuoc.md': [
    '](/huong-dan/muc-chong-nuoc)',
    '](/huong-dan/bao-duong-dong-ho)',
    '](/co-che/chong-tu)',
    '](/tu-dien/num-van)',
  ],
  'src/content/coChe/en/water-resistance.md': [
    '](/en/guides/water-resistance/)',
    '](/en/glossary/crown/)',
  ],
  'src/content/tuDien/vi/num-van.md': [
    '](/tu-dien/day-cot)',
    '](/huong-dan/len-day-dong-ho)',
    '](/huong-dan/muc-chong-nuoc)',
    '](/co-che/chong-nuoc)',
  ],
  'src/content/tuDien/en/crown.md': [
    '](/en/glossary/mainspring/)',
    '](/en/guides/winding-a-mechanical-watch/)',
    '](/en/guides/water-resistance/)',
    '](/en/mechanisms/water-resistance/)',
  ],
  'src/content/tuDien/vi/day-cot.md': [
    '](/tu-dien/thung-cot)',
    '](/tu-dien/power-reserve)',
    '](/huong-dan/len-day-dong-ho)',
    '](/tu-dien/num-van)',
  ],
  'src/content/tuDien/en/mainspring.md': [
    '](/en/glossary/power-reserve/)',
    '](/en/guides/winding-a-mechanical-watch/)',
    '](/en/glossary/crown/)',
  ],
  'src/content/huongDan/en/first-mechanical-watch.md': [
    '](/en/guides/winding-a-mechanical-watch/)',
    '](/en/guides/water-resistance/)',
  ],
};

const LINK_TARGETS = {
  '/tu-dien/num-van': 'src/content/tuDien/vi/num-van.md',
  '/tu-dien/day-cot': 'src/content/tuDien/vi/day-cot.md',
  '/tu-dien/thung-cot': 'src/content/tuDien/vi/thung-cot.md',
  '/tu-dien/power-reserve': 'src/content/tuDien/vi/power-reserve.md',
  '/huong-dan/len-day-dong-ho': 'src/content/huongDan/vi/len-day-dong-ho.md',
  '/huong-dan/muc-chong-nuoc': 'src/content/huongDan/vi/muc-chong-nuoc.md',
  '/huong-dan/chon-dong-ho-dau-tien': 'src/content/huongDan/vi/chon-dong-ho-dau-tien.md',
  '/huong-dan/bao-duong-dong-ho': 'src/content/huongDan/vi/bao-duong-dong-ho.md',
  '/co-che/chong-nuoc': 'src/content/coChe/vi/chong-nuoc.md',
  '/co-che/chong-tu': 'src/content/coChe/vi/chong-tu.md',
  '/en/glossary/crown/': 'src/content/tuDien/en/crown.md',
  '/en/glossary/mainspring/': 'src/content/tuDien/en/mainspring.md',
  '/en/glossary/power-reserve/': 'src/content/tuDien/en/power-reserve.md',
  '/en/guides/winding-a-mechanical-watch/': 'src/content/huongDan/en/winding-a-mechanical-watch.md',
  '/en/guides/water-resistance/': 'src/content/huongDan/en/water-resistance.md',
  '/en/guides/first-mechanical-watch/': 'src/content/huongDan/en/first-mechanical-watch.md',
  '/en/mechanisms/water-resistance/': 'src/content/coChe/en/water-resistance.md',
};

const EN_SLUGS = {
  'src/content/huongDan/en/winding-a-mechanical-watch.md': 'winding-a-mechanical-watch',
  'src/content/huongDan/en/water-resistance.md': 'water-resistance',
  'src/content/huongDan/en/setting-the-date-safely.md': 'setting-the-date-safely',
  'src/content/coChe/en/water-resistance.md': 'water-resistance',
  'src/content/tuDien/en/crown.md': 'crown',
  'src/content/tuDien/en/mainspring.md': 'mainspring',
};

// Schema từng collection: coChe = category+difficulty+infographic+interactive;
// huongDan = difficulty; tuDien = category+infographic+interactive.
const FRONTMATTER_RULES = {
  'src/content/huongDan/en/winding-a-mechanical-watch.md': ['difficulty'],
  'src/content/huongDan/en/water-resistance.md': ['difficulty'],
  'src/content/huongDan/en/setting-the-date-safely.md': ['difficulty'],
  'src/content/coChe/en/water-resistance.md': ['category', 'difficulty', 'infographic', 'interactive'],
  'src/content/tuDien/en/crown.md': ['category', 'infographic', 'interactive'],
  'src/content/tuDien/en/mainspring.md': ['category', 'infographic', 'interactive'],
};

const ROUTE_PAIRS = [
  { vi: '/huong-dan/len-day-dong-ho', en: '/en/guides/winding-a-mechanical-watch/' },
  { vi: '/huong-dan/muc-chong-nuoc', en: '/en/guides/water-resistance/' },
  { vi: '/huong-dan/chinh-lich-an-toan', en: '/en/guides/setting-the-date-safely/' },
  { vi: '/co-che/chong-nuoc', en: '/en/mechanisms/water-resistance/' },
  { vi: '/tu-dien/num-van', en: '/en/glossary/crown/' },
  { vi: '/tu-dien/day-cot', en: '/en/glossary/mainspring/' },
];

const VALID_CATEGORIES = ['bổ trợ', 'phức tạp', 'phức tạp chức năng', 'thiết kế', 'bộ máy'];
const VALID_DIFFICULTIES = ['cơ bản', 'thấp', 'trung bình', 'trung cấp', 'người mới', 'cao'];

// ===== R5: các khẳng định cấm (quét dòng, 12 bài) =====
const BANNED = [
  { re: /\d+\s*vòng|\d+\s*turns/i, why: 'số vòng lên dây (không nguồn, bỏ khỏi cụm)', allow: /số vòng|number of turns|no number/i },
  { re: /3\s*[–-]\s*5\s*năm|3\s*[–-]\s*5\s*years/i, why: 'chu kỳ lão hóa gioăng "3–5 năm" (bỏ)' },
  { re: /khung giờ nguy hiểm|danger zone/i, why: 'khung giờ cấm chỉnh lịch như khái quát chung' },
  { re: /waterproof/i, why: '"waterproof" — lời hứa tuyệt đối' },
  { re: /chống nước tuyệt đối/i, why: '"chống nước tuyệt đối"' },
  { re: /automatic[^.\n]*(không cần (lên|vặn))|automatic[^.\n]*never needs? winding/i, why: 'khẳng định automatic không cần lên dây' },
  { re: /vặn[^\n]{0,24}(đến khi|khi thấy)[^\n]{0,24}(căng|cứng)|wind until[^\n]{0,24}(tight|firm|resistance is felt)/i, why: 'hướng dẫn "vặn đến khi căng"' },
  { re: /tuyệt đối không bấm nút/i, why: 'khẳng định tuyệt đối "tuyệt đối không bấm nút" (phải kèm nguồn + ngoại lệ hãng)' },
];
// Ngưỡng chống nước gắn hoạt động mà dòng không kèm manual/nguồn/giới hạn
const WR_LIMIT = /manual|theo |per |công bố|maker|hãng|seiko|omega|reference|tham khảo|table|bảng|guide/i;

const errors = [];
const report = [];
const fail = (rule, file, line, why) =>
  errors.push(`[${rule}] ${file}:${line} — ${why}`);

const textOf = {};

for (const f of [...FILES.vi, ...FILES.en, ...EXTRA_LINK_FILES, DATE_FILE, ROUTES_FILE, ...DOC_FILES]) {
  if (!existsSync(f)) errors.push(`[FILE] Thiếu tệp phạm vi: ${f}`);
  else textOf[f] = readFileSync(f, 'utf8');
}

if (errors.some((e) => e.startsWith('[FILE]'))) {
  console.log('KIỂM TRA CỤM SỬ DỤNG AN TOÀN HẰNG NGÀY — CÓ LỖI:');
  for (const e of errors) console.log(`  LỖI  ${e}`);
  process.exit(1);
}

// ===== R1: frontmatter 6 bài EN =====
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
  report.push('6 bài EN tồn tại, frontmatter hợp lệ (slug, false-flags, enum, ≥2 nguồn HTTPS)');
}

// ===== R2: 6 cặp route =====
for (const { vi, en } of ROUTE_PAIRS) {
  if (!textOf[ROUTES_FILE].includes(`vi: '${vi}'`)) errors.push(`[R2] contentRoutes thiếu cặp vi: '${vi}'`);
  if (!textOf[ROUTES_FILE].includes(`en: '${en}'`)) errors.push(`[R2] contentRoutes thiếu cặp en: '${en}'`);
}
if (!errors.some((e) => e.includes('[R2]'))) {
  report.push(`6 cặp route có trong contentRoutes.ts (${ROUTE_PAIRS.map((p) => p.vi).join(', ')})`);
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
  report.push(`${linkChecked} liên kết bắt buộc cụm (vi+en, kể cả first-mechanical-watch EN) đều có và đích tồn tại`);
}

// ===== R4 + R5: quét dòng 12 bài =====
for (const f of [...FILES.vi, ...FILES.en]) {
  const lines = textOf[f].split(/\r?\n/);
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
    // Rule ngưỡng→hoạt động chỉ áp cho dòng BẢNG (câu hỏi FAQ/câu văn thường
    // không phải khẳng định ngưỡng dùng được); bảng phải kèm manual/nguồn.
    if (line.trim().startsWith('|') &&
        /(30m|50m|100m|200m|300m|3\s?BAR|5\s?BAR|10\s?BAR|20\s?BAR)/i.test(line) &&
        /(bơi|tắm|swim|shower|dive|lặn)/i.test(line) &&
        !WR_LIMIT.test(line)) {
      fail('R5', f, i + 1, 'ngưỡng chống nước gắn hoạt động mà dòng không kèm manual/nguồn/giới hạn');
    }
    // Vòng sửa P35 — cấm bảng quy đổi chung theo mét trong 4 bài chống nước
    // (bất kỳ dòng bảng nào gắn m-level với hoạt động đều bị từ chối, kể cả
    // kèm "tra manual", vì chính dạng bảng đó gợi phép dùng chung).
    if (WR_FILES.has(f)) {
      if (/bảng quy đổi|conversion table/i.test(line)) {
        fail('R5', f, i + 1, '"bảng quy đổi / conversion table" — dạng bảng gợi phép dùng chung');
      }
      if (line.trim().startsWith('|') &&
          /\b(30|50|100|200|300)\s?m\b/i.test(line) &&
          /(bơi|tắm|swim|shower|dive|lặn|mưa|rain)/i.test(line)) {
        fail('R5', f, i + 1, 'bảng m-level gắn hoạt động — bảng dùng chung đã bị loại');
      }
    }
    // Vòng sửa P35 — cấm khuyến nghị chung "đưa kim về 6 giờ" trong 2 bài chỉnh lịch
    if (DATE_GUIDE_FILES.has(f) &&
        /về\s+(khoảng\s+)?6\s+giờ|about\s+6\s+o'?clock|around\s+6\s+o'?clock/i.test(line)) {
      fail('R5', f, i + 1, 'khuyến nghị chung "về 6 giờ / around 6 o\'clock" — khung giờ tùy calibre, chỉ manual là chuẩn');
    }
    if (/20:00\s*[–-]\s*04:00|20:00\s*[–-]\s*4:00/i.test(line) && /(cấm|không được|forbidden|must not|never)/i.test(line)) {
      fail('R5', f, i + 1, '"20:00–04:00" kèm từ cấm — khung giờ tùy calibre, chỉ được nêu như ví dụ minh họa');
    }
  }
}

// ===== R5b: DateSafety phải là mô phỏng nguyên lý, không phải công cụ kết luận =====
{
  const ds = textOf[DATE_FILE];
  const DS_BANNED = [
    /khung thận trọng phổ biến/i,
    /Có thể chỉnh lịch/,
    /Không chỉnh lịch lúc này/,
    /Ví dụ nguy hiểm/i,
    /ngoài khung thận trọng/i,
  ];
  const dsLines = ds.split(/\r?\n/);
  for (let i = 0; i < dsLines.length; i++) {
    for (const re of DS_BANNED) {
      if (re.test(dsLines[i])) fail('R5b', DATE_FILE, i + 1, `nhãn biến mô phỏng thành kết luận chung: "${re.source}"`);
    }
    if (/20:00\s*[–-]\s*04:00/i.test(dsLines[i]) && /(cấm chỉnh|chỉnh bị cấm|forbidden window|must not be set|never be set)/i.test(dsLines[i])) {
      fail('R5b', DATE_FILE, i + 1, 'vùng 20:00–04:00 kèm ngôn ngữ cấm thao tác — phải là "vùng minh họa"');
    }
  }
  if (!/vùng minh họa|vùng tô|illustrative|example/i.test(ds)) {
    errors.push(`[R5b] ${DATE_FILE} thiếu nhãn "vùng minh họa" — công cụ phải tự giới hạn là mô phỏng nguyên lý`);
  }
  if (!/manual/i.test(ds)) {
    errors.push(`[R5b] ${DATE_FILE} không nhắc manual — mô phỏng phải dẫn về manual của đúng calibre`);
  }
}
if (!errors.some((e) => e.includes('[R5b]'))) {
  report.push('R5b: DateSafety là mô phỏng nguyên lý (nhãn "vùng minh họa", dẫn về manual, không còn nhãn kết luận)');
}
if (!errors.some((e) => e.includes('[R4]'))) report.push('R4: 6 bài EN không có link nội bộ về route tiếng Việt');
if (!errors.some((e) => e.includes('[R5]'))) report.push('R5: sạch các khẳng định cấm (số vòng, khung giờ cấm chung, waterproof, automatic-không-cần-lên-dây, vặn-đến-căng, ngưỡng-không-kèm-manual)');

// ===== R6: hồ sơ + biên bản =====
report.push(`Hồ sơ nguồn + biên bản nghiệm thu tồn tại (${DOC_FILES.length} tệp)`);

// ===== Kết luận =====
console.log('KIỂM TRA CỤM SỬ DỤNG AN TOÀN HẰNG NGÀY SONG NGỮ:');
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — cụm sử dụng an toàn khớp hồ sơ nguồn, không hồi quy.');
