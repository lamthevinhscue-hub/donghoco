#!/usr/bin/env node
// =============================================================================
// check-brand-value-retention.mjs — hàng rào chống hồi quy gói P1.3
// "Gỡ cột 'Giá trị giữ giá' mặc định ở trang thương hiệu"
// =============================================================================
// Chạy trong `npm run check`. Phạm vi quét CHỈ gồm:
//   - src/layouts/BrandLayout.astro (R1);
//   - src/content/thuongHieu/vi/*.md — CHỈ hai trường frontmatter
//     value_retention / value_retention_label (R2, R3).
// KHÔNG quét docs/, KHÔNG quét phần thân bài, collectorNote, positioning,
// các ô strength/movement/philosophy — những vùng đó thuộc P0/P1 khác.
//
//   R1. BrandLayout không còn chuỗi "Giá trị giữ giá" và không còn toán tử
//       fallback "??" gán nhãn mặc định cho value_retention_label.
//   R2. Mọi value_retention trong thuongHieu/vi phải đi kèm value_retention_label
//       trong cùng frontmatter (không có nhãn thì không được có ô dữ liệu).
//   R3. Nhãn và giá trị còn lại không chứa cụm tài chính: "giữ giá",
//       "thị trường thứ cấp", "giá niêm yết", "giá bán lại", "thanh khoản",
//       "đầu tư", "tăng giá", "mất giá".
//
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync, readdirSync } from 'node:fs';

const LAYOUT = 'src/layouts/BrandLayout.astro';
const DIR = 'src/content/thuongHieu/vi';

const BANNED_FINANCIAL = [
  { re: /giữ giá/i, phrase: 'giữ giá' },
  { re: /thị trường thứ cấp/i, phrase: 'thị trường thứ cấp' },
  { re: /giá niêm yết/i, phrase: 'giá niêm yết' },
  { re: /giá bán lại/i, phrase: 'giá bán lại' },
  { re: /thanh khoản/i, phrase: 'thanh khoản' },
  { re: /đầu tư/i, phrase: 'đầu tư' },
  { re: /tăng giá/i, phrase: 'tăng giá' },
  { re: /mất giá/i, phrase: 'mất giá' },
];

const errors = [];
const report = [];
const fail = (rule, file, line, why) => errors.push(`[${rule}] ${file}:${line} — ${why}`);

// ===== R1: BrandLayout =====
if (!existsSync(LAYOUT)) {
  errors.push(`[FILE] Thiếu tệp: ${LAYOUT}`);
} else {
  const lines = readFileSync(LAYOUT, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    if (/giá trị giữ giá/i.test(line)) {
      fail('R1', LAYOUT, i + 1, `còn chuỗi "Giá trị giữ giá": "${line.trim()}"`);
    }
    if (/value_retention_label\s*\?\?/.test(line)) {
      fail('R1', LAYOUT, i + 1, `fallback "??" gán nhãn mặc định cho value_retention_label: "${line.trim()}"`);
    }
  });
}
if (!errors.some((e) => e.includes('[R1]'))) {
  report.push('R1: BrandLayout không còn nhãn/fallback "Giá trị giữ giá"');
}

// ===== R2 + R3: hai trường frontmatter của thuongHieu/vi =====
// Chỉ đọc khối frontmatter — phần thân, collectorNote, positioning không thuộc phạm vi.
const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;
const VALUE_RE = /^[ \t]*value_retention:/;
const LABEL_RE = /^value_retention_label:/;

const files = readdirSync(DIR).filter((f) => f.endsWith('.md')).sort();
let labeled = 0;
let cells = 0;

for (const f of files) {
  const path = `${DIR}/${f}`;
  const text = readFileSync(path, 'utf8');
  const m = text.match(FM_RE);
  if (!m) { fail('R2', path, 1, 'không tìm thấy khối frontmatter'); continue; }

  const fmLines = m[1].split(/\r?\n/);
  let hasLabel = false;
  let firstValueLine = 0;
  let valueCount = 0;
  const scanTargets = [];

  fmLines.forEach((line, i) => {
    const absLine = i + 2; // dòng 1 của tệp là '---' mở đầu
    if (LABEL_RE.test(line)) { hasLabel = true; scanTargets.push([absLine, line]); }
    else if (VALUE_RE.test(line)) {
      valueCount++;
      scanTargets.push([absLine, line]);
      if (!firstValueLine) firstValueLine = absLine;
    }
  });

  if (valueCount > 0 && !hasLabel) {
    fail('R2', path, firstValueLine, `có ${valueCount} ô value_retention nhưng thiếu value_retention_label`);
  }
  if (hasLabel) labeled++;
  cells += valueCount;

  for (const [absLine, line] of scanTargets) {
    const value = line.replace(/^[ \t]*value_retention(_label)?:[ \t]*/, '').replace(/^"|"$/g, '');
    for (const { re, phrase } of BANNED_FINANCIAL) {
      const hit = re.exec(value);
      if (hit) {
        fail('R3', path, absLine, `cụm tài chính "${phrase}" trong ô còn lại: "${value}"`);
      }
    }
  }
}

if (!errors.some((e) => e.includes('[R2]'))) {
  report.push(`R2: ${labeled}/${files.length} tệp có nhãn riêng; mọi tệp còn ô value_retention đều có nhãn`);
}
if (!errors.some((e) => e.includes('[R3]'))) {
  report.push(`R3: ${cells} ô và nhãn còn lại sạch các cụm tài chính (${BANNED_FINANCIAL.map((b) => b.phrase).join(', ')})`);
}

// ===== Kết luận =====
console.log('KIỂM TRA CỘT SO SÁNH TÙY CHỌN TRANG THƯƠNG HIỆU (P1.3):');
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — cột giá trị giữ giá đã gỡ sạch, không hồi quy.');
