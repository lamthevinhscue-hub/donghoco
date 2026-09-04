#!/usr/bin/env node
// =============================================================================
// check-automatic-energy-cluster.mjs — chống hồi quy cụm
// "Automatic & năng lượng cơ học" (Prompt 36)
// =============================================================================
// Chạy trong `npm run check`. Quét đúng 12 bài vi/en của cụm:
//
//   R1. 6 bài EN + frontmatter hợp lệ (custom_slug khớp slug tệp;
//       has_infographic/interactive = false với coChe + tuDien; enum
//       category/difficulty theo schema; ≥2 nguồn HTTPS).
//   R2. Đủ 3 cặp route mới trong src/i18n/contentRoutes.ts.
//   R3. Mọi liên kết nội bộ bắt buộc cụm (vi + en) có trong bài và đích tồn tại.
//   R4. 6 bài EN không có internal link nội dung về route tiếng Việt.
//   R5. Không còn các khẳng định cấm trong phạm vi 12 bài (quét PHẦN THÂN,
//       loại frontmatter để không dính slug relatedModels):
//         - lịch sử/năm không nguồn (Harwood, Perrelet, Rolex Perpetual,
//           Eterna, 1777/1923/1931/1948)
//         - khái quát "gần như mọi / hầu hết / most … automatic"
//         - lời hứa "chỉ cần đeo là tự chạy" / "automatic không cần lên tay"
//         - rotor một chiều "hiệu quả" + hai kiểu ly hợp + declutching
//         - bảng số giờ trữ cót (dòng bảng kèm \d{2,3} giờ/hours)
//         - "weekend power reserve" như quy tắc
//         - số barrel gắn mốc giờ (7 ngày, song song)
//         - "dài = đắt/phức tạp hơn"
//         - nhận định "thùng cót là vòng tròn lớn nhất"
//         - danh sách hãng micro-rotor/vật liệu; nhận định rotor thép
//         - lời hứa hộp xoay (giữ đầy cót/tránh dừng/tốt cho đồng hồ/thay
//           bảo dưỡng) — trừ dòng phủ định rõ ràng
//         - TPD/vòng mỗi ngày như cấu hình chung (chỉ được phép trong cửa sổ
//           "đừng tự đặt / do not set / chỉ theo tài liệu" cùng dòng hoặc
//           dòng kế tiếp)
//         - "8 giờ/ngày", "20–30 vòng", dầu khô, dây cót biến dạng
//         - các dải mức trữ cót dùng chung (38–42/38–50/38–80/48–50/100+/168h)
//   R6. Hồ sơ nguồn + biên bản nghiệm thu tồn tại.
//
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';

const FILES = {
  vi: [
    'src/content/coChe/vi/len-day-tu-dong.md',
    'src/content/coChe/vi/tru-cot.md',
    'src/content/tuDien/vi/rotor.md',
    'src/content/tuDien/vi/thung-cot.md',
    'src/content/tuDien/vi/power-reserve.md',
    'src/content/huongDan/vi/hop-xoay-dong-ho.md',
  ],
  en: [
    'src/content/coChe/en/automatic-winding.md',
    'src/content/coChe/en/power-reserve.md',
    'src/content/tuDien/en/rotor.md',
    'src/content/tuDien/en/power-reserve.md',
    'src/content/tuDien/en/barrel.md',
    'src/content/huongDan/en/watch-winders.md',
  ],
};

const ROUTES_FILE = 'src/i18n/contentRoutes.ts';
const DOC_FILES = [
  'docs/ho-so-nguon-cum-automatic-nang-luong-song-ngu.md',
  'docs/nghiem-thu/2026-09-04_nghiem-thu-cum-automatic-nang-luong-song-ngu.md',
];

const REQUIRED_LINKS = {
  'src/content/coChe/vi/len-day-tu-dong.md': [
    '](/tu-dien/rotor)',
    '](/tu-dien/day-cot)',
    '](/tu-dien/thung-cot)',
    '](/co-che/tru-cot)',
    '](/huong-dan/len-day-dong-ho)',
    '](/huong-dan/hop-xoay-dong-ho)',
  ],
  'src/content/coChe/vi/tru-cot.md': [
    '](/tu-dien/day-cot)',
    '](/tu-dien/thung-cot)',
    '](/tu-dien/rotor)',
    '](/co-che/len-day-tu-dong)',
    '](/huong-dan/len-day-dong-ho)',
    '](/huong-dan/chinh-lich-an-toan)',
    '](/huong-dan/hop-xoay-dong-ho)',
    '](/tu-dien/movement)',
  ],
  'src/content/tuDien/vi/rotor.md': [
    '](/tu-dien/day-cot)',
    '](/tu-dien/thung-cot)',
    '](/co-che/len-day-tu-dong)',
    '](/tu-dien/power-reserve)',
  ],
  'src/content/tuDien/vi/thung-cot.md': [
    '](/tu-dien/day-cot)',
    '](/tu-dien/power-reserve)',
    '](/co-che/len-day-tu-dong)',
  ],
  'src/content/tuDien/vi/power-reserve.md': [
    '](/tu-dien/day-cot)',
    '](/tu-dien/thung-cot)',
    '](/co-che/tru-cot)',
    '](/co-che/len-day-tu-dong)',
  ],
  'src/content/huongDan/vi/hop-xoay-dong-ho.md': [
    '](/co-che/len-day-tu-dong)',
    '](/tu-dien/thung-cot)',
    '](/huong-dan/len-day-dong-ho)',
    '](/huong-dan/chinh-lich-an-toan)',
    '](/huong-dan/bao-duong-dong-ho)',
  ],
  'src/content/coChe/en/automatic-winding.md': [
    '](/en/glossary/rotor/)',
    '](/en/glossary/mainspring/)',
    '](/en/glossary/barrel/)',
    '](/en/mechanisms/power-reserve/)',
    '](/en/guides/winding-a-mechanical-watch/)',
    '](/en/guides/watch-winders/)',
  ],
  'src/content/coChe/en/power-reserve.md': [
    '](/en/glossary/mainspring/)',
    '](/en/glossary/barrel/)',
    '](/en/mechanisms/automatic-winding/)',
    '](/en/glossary/rotor/)',
    '](/en/guides/winding-a-mechanical-watch/)',
    '](/en/guides/setting-the-date-safely/)',
    '](/en/guides/watch-winders/)',
  ],
  'src/content/tuDien/en/rotor.md': [
    '](/en/glossary/mainspring/)',
    '](/en/glossary/barrel/)',
    '](/en/mechanisms/automatic-winding/)',
    '](/en/mechanisms/power-reserve/)',
  ],
  'src/content/tuDien/en/power-reserve.md': [
    '](/en/glossary/mainspring/)',
    '](/en/glossary/barrel/)',
    '](/en/mechanisms/power-reserve/)',
    '](/en/mechanisms/automatic-winding/)',
  ],
  'src/content/tuDien/en/barrel.md': [
    '](/en/glossary/mainspring/)',
    '](/en/glossary/power-reserve/)',
    '](/en/mechanisms/power-reserve/)',
    '](/en/mechanisms/automatic-winding/)',
  ],
  'src/content/huongDan/en/watch-winders.md': [
    '](/en/mechanisms/automatic-winding/)',
    '](/en/glossary/barrel/)',
    '](/en/guides/winding-a-mechanical-watch/)',
    '](/en/guides/setting-the-date-safely/)',
  ],
};

const LINK_TARGETS = {
  '/tu-dien/rotor': 'src/content/tuDien/vi/rotor.md',
  '/tu-dien/day-cot': 'src/content/tuDien/vi/day-cot.md',
  '/tu-dien/thung-cot': 'src/content/tuDien/vi/thung-cot.md',
  '/tu-dien/power-reserve': 'src/content/tuDien/vi/power-reserve.md',
  '/tu-dien/movement': 'src/content/tuDien/vi/movement.md',
  '/co-che/tru-cot': 'src/content/coChe/vi/tru-cot.md',
  '/co-che/len-day-tu-dong': 'src/content/coChe/vi/len-day-tu-dong.md',
  '/huong-dan/len-day-dong-ho': 'src/content/huongDan/vi/len-day-dong-ho.md',
  '/huong-dan/chinh-lich-an-toan': 'src/content/huongDan/vi/chinh-lich-an-toan.md',
  '/huong-dan/hop-xoay-dong-ho': 'src/content/huongDan/vi/hop-xoay-dong-ho.md',
  '/huong-dan/bao-duong-dong-ho': 'src/content/huongDan/vi/bao-duong-dong-ho.md',
  '/en/glossary/rotor/': 'src/content/tuDien/en/rotor.md',
  '/en/glossary/mainspring/': 'src/content/tuDien/en/mainspring.md',
  '/en/glossary/barrel/': 'src/content/tuDien/en/barrel.md',
  '/en/glossary/power-reserve/': 'src/content/tuDien/en/power-reserve.md',
  '/en/mechanisms/automatic-winding/': 'src/content/coChe/en/automatic-winding.md',
  '/en/mechanisms/power-reserve/': 'src/content/coChe/en/power-reserve.md',
  '/en/guides/winding-a-mechanical-watch/': 'src/content/huongDan/en/winding-a-mechanical-watch.md',
  '/en/guides/setting-the-date-safely/': 'src/content/huongDan/en/setting-the-date-safely.md',
  '/en/guides/watch-winders/': 'src/content/huongDan/en/watch-winders.md',
};

const EN_SLUGS = {
  'src/content/coChe/en/automatic-winding.md': 'automatic-winding',
  'src/content/coChe/en/power-reserve.md': 'power-reserve',
  'src/content/tuDien/en/rotor.md': 'rotor',
  'src/content/tuDien/en/power-reserve.md': 'power-reserve',
  'src/content/tuDien/en/barrel.md': 'barrel',
  'src/content/huongDan/en/watch-winders.md': 'watch-winders',
};

// Schema từng collection: coChe = category+difficulty+infographic+interactive;
// huongDan = difficulty; tuDien = category+infographic+interactive.
const FRONTMATTER_RULES = {
  'src/content/coChe/en/automatic-winding.md': ['category', 'difficulty', 'infographic', 'interactive'],
  'src/content/coChe/en/power-reserve.md': ['category', 'difficulty', 'infographic', 'interactive'],
  'src/content/tuDien/en/rotor.md': ['category', 'infographic', 'interactive'],
  'src/content/tuDien/en/power-reserve.md': ['category', 'infographic', 'interactive'],
  'src/content/tuDien/en/barrel.md': ['category', 'infographic', 'interactive'],
  'src/content/huongDan/en/watch-winders.md': ['difficulty'],
};

const ROUTE_PAIRS = [
  { vi: '/co-che/len-day-tu-dong', en: '/en/mechanisms/automatic-winding/' },
  { vi: '/tu-dien/thung-cot', en: '/en/glossary/barrel/' },
  { vi: '/huong-dan/hop-xoay-dong-ho', en: '/en/guides/watch-winders/' },
];

const VALID_CATEGORIES = ['nền tảng', 'bổ trợ', 'phức tạp', 'phức tạp chức năng', 'thiết kế', 'bộ máy'];
const VALID_DIFFICULTIES = ['cơ bản', 'thấp', 'trung bình', 'trung cấp', 'người mới', 'cao'];

// ===== R5: các khẳng định cấm (quét PHẦN THÂN, 12 bài) =====
const BANNED = [
  { re: /harwood|perrelet|rolex perpetual|eterna|1777|1923|1931|1948/i, why: 'lịch sử/năm không có nguồn nguyên văn trong hồ sơ (bỏ khỏi thân bài)' },
  { re: /gần như mọi|nearly all|almost all|most automatic|most mechanical watches|hầu hết [^\n]{0,24}(automatic|đồng hồ)/i, why: 'khái quát "gần như mọi / hầu hết / most … automatic"' },
  { re: /chỉ cần đeo|đeo là tự|just wear(ing)?( it| the watch)|no need to wind|never needs?( hand[ -])?winding|không cần (vặn|lên) (tay |cóts?)?mỗi ngày/i, why: 'lời hứa "chỉ cần đeo là tự chạy / không cần lên tay"' },
  { re: /một chiều|one-way|unidirectional/i, why: 'rotor "một chiều thì hiệu quả" + chi tiết ly hợp (không nguồn)' },
  { re: /declutch|cơ cấu tách|bảo vệ dây cót|protects? the mainspring from over/i, why: 'claim "declutching bảo vệ" không nguồn' },
  { re: /weekend/i, why: '"weekend power reserve" như quy tắc/thuật ngữ chung (đã loại)' },
  { re: /(hai thùng|hai barrel|dual barrel|twin barrel|two barrels)[^\n]{0,80}(\d{2,3}\s*(giờ|hours)|7 ngày|seven days|song song|parallel)/i, why: 'số barrel gắn mốc giờ / "song song"' },
  { re: /(7 ngày|seven days)[^\n]{0,60}(thùng|barrel)/i, why: '"7 ngày" gắn số barrel' },
  { re: /(trữ cót|power reserve)[^\n]{0,80}(đắt|expensive|phức tạp|more (elaborate|complicated))/i, why: '"trữ cót dài = đắt/phức tạp hơn"' },
  { re: /vòng tròn lớn nhất|largest circle|biggest circle|to hơn cả bánh lắc|larger than the balance/i, why: 'nhận định "thùng cót là vòng tròn lớn nhất"' },
  { re: /universal genève|(patek|bvlgari|breitling)[^\n]{0,60}(micro-rotor|rotor|tungsten|ceramic)/i, why: 'danh sách hãng micro-rotor/vật liệu (không nguồn)' },
  { re: /rotor[^\n]{0,60}(thép|steel)[^\n]{0,60}(nhẹ|lighter|di chuyển|more movement)|rotor[^\n]{0,60}(lighter|steel)[^\n]{0,60}(needs? more|moves)/i, why: 'nhận định vật liệu rotor (thép nhẹ cần di chuyển nhiều hơn)' },
  { re: /(vàng, platinum|gold, platinum)[^\n]{0,60}(nặng|mass|heavy|hiệu quả|efficient)/i, why: 'nhận định vật liệu rotor (kim loại nặng để hiệu quả)' },
  { re: /8 giờ\/ngày|8 hours a day|20\s*[–-]\s*30\s*(vòng|turns)/i, why: 'con số hoạt động dùng chung ("8 giờ/ngày", "20–30 vòng")' },
  { re: /dầu khô|dried[- ]out oil|oil (has )?dried|biến dạng|deform/i, why: 'cơ chế "dầu khô / dây cót biến dạng" không nguồn' },
  { re: /38\s*[–-]\s*(42|50|80)|48\s*[–-]\s*50|100\+\s*(giờ|hours)|168\s*(giờ|hours)/i, why: 'dải mức trữ cót dùng chung (bảng/câu văn đã loại)' },
  { re: /(winder|hộp xoay)[^\n]{0,80}(giữ đầy|keeps?[^\n]{0,20}(fully )?wound|tránh dừng|prevents?[^\n]{0,30}stopping|tốt cho đồng hồ|good for (the|your) watch|thay thế bảo dưỡng|replaces? servic|mô phỏng chuyển động cổ tay|simulates? wrist)/i,
    why: 'lời hứa hộp xoay (giữ đầy cót/tránh dừng/tốt cho đồng hồ/thay bảo dưỡng)',
    allow: /không hứa|does not promise|không khuyến nghị|neither recommends/i },
];
// TPD như cấu hình chung — chỉ được phép trong cửa sổ "đừng tự đặt" (cùng
// dòng hoặc dòng kế tiếp, vì câu hỏi FAQ đứng trước câu trả lời).
const TPD_RE = /TPD|turns per day|vòng mỗi ngày/i;
const TPD_ALLOW = /đừng|không nên tự đặt|do not set|don'?t set|chỉ theo|only per|per the|theo tài liệu|documentation|manual/i;

const errors = [];
const report = [];
const fail = (rule, file, line, why) =>
  errors.push(`[${rule}] ${file}:${line} — ${why}`);

// Phần thân = sau khối frontmatter đầu tiên (relatedModels slug nằm trong
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
  console.log('KIỂM TRA CỤM AUTOMATIC & NĂNG LƯỢNG CƠ HỌC — CÓ LỖI:');
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

// ===== R4 + R5: quét dòng 12 bài (theo phần thân) =====
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
    if (TPD_RE.test(line)) {
      const next = lines[i + 1] ?? '';
      if (!(TPD_ALLOW.test(line) || TPD_ALLOW.test(next))) {
        fail('R5', f, i + 1, 'TPD/vòng mỗi ngày như cấu hình chung — chỉ được nêu trong cửa sổ "đừng tự đặt / theo tài liệu"');
      }
    }
    // Bảng số giờ trữ cót: mọi dòng bảng kèm \d{2,3} giờ/hours đều bị loại
    if (line.trim().startsWith('|') && /\b\d{2,3}\s*(giờ|hours)\b/i.test(line)) {
      fail('R5', f, i + 1, 'bảng số giờ trữ cót — dạng bảng dùng chung đã bị loại');
    }
  }
}
if (!errors.some((e) => e.includes('[R4]'))) report.push('R4: 6 bài EN không có link nội bộ về route tiếng Việt');
if (!errors.some((e) => e.includes('[R5]'))) report.push('R5: sạch các khẳng định cấm (lịch sử không nguồn, khái quát, lời hứa đeo/lên tay, một chiều/declutch, bảng giờ trữ cót, weekend, barrel-gắn-mốc, đắt-hơn, vòng-tròn-lớn-nhất, hãng rotor, hộp xoay hứa hẹn, TPD, 8 giờ/ngày, dải mức chung)');

// ===== R6: hồ sơ + biên bản =====
report.push(`Hồ sơ nguồn + biên bản nghiệm thu tồn tại (${DOC_FILES.length} tệp)`);

// ===== Kết luận =====
console.log('KIỂM TRA CỤM AUTOMATIC & NĂNG LƯỢNG CƠ HỌC SONG NGỮ:');
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — cụm automatic & năng lượng khớp hồ sơ nguồn, không hồi quy.');
