#!/usr/bin/env node
// =============================================================================
// check-gmt-source-integrity — chống tái phát mâu thuẫn nguồn cụm GMT (P33 v2)
// =============================================================================
// Quét đúng 15 tệp phạm vi của Prompt 33 (vòng 2) và báo lỗi nếu còn các tổ
// hợp sai đã được anh bắt:
//   R1. "1954" gắn với GMT-Master / Pan Am        (chuẩn là 1955 — Rolex)
//   R2. "1983" gắn với GMT-Master II              (chuẩn là 1982 — Rolex)
//   R3. "Caller GMT" / "Flyer GMT"                (không phải thuật ngữ hãng)
//   R4. "đồng hồ chính thức của phi công Pan Am" /
//       "official watch of Pan Am pilots" / các biến thể "Pan Am lựa chọn /
//       yêu cầu / đặt hàng", "phi công Pan Am", "buồng lái Pan Am"
//       (Rolex chỉ nâng: trở thành đồng hồ chính thức của hãng hàng không Pan Am)
//   R5. "mọi GMT" / "every GMT" / "all GMT"       (không khái quát hóa cấu trúc)
//   R6. "2:1"                                     (tỷ lệ bánh răng như quy tắc chung)
//
// Phân loại tệp:
//   - 13 TỆP NỘI DỤNG (bài md vi/en, iconic, rolex.md, timeline.json,
//     evolution.ts, GmtReader, GMT infographic): rule chặt tuyệt đối. Không
//     loại trừ tệp infographic hay nội dung tương tác khỏi quét.
//   - 2 TỆP HỒ SƠ (hồ sơ nguồn + biên bản): hồ sơ CÓ NHIỆM VỤ ghi nhận nguyên
//     nhân mâu thuẫn nên dòng mang ngữ cảnh lịch sử/phủ định (chứa marker như
//     "không nâng", "chuẩn hóa", "bỏ", "Viết lại", "đã xử lý", "sai") được bỏ
//     qua; dòng không mang marker vẫn bị chặt như nội dung. Presence check đảm
//     bảo hồ sơ ghi nhận chuẩn hóa infographic + công cụ tương tác.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';

const CONTENT_FILES = [
  'src/content/coChe/vi/gmt.md',
  'src/content/coChe/en/gmt.md',
  'src/content/huongDan/vi/doc-va-chinh-gmt.md',
  'src/content/huongDan/en/reading-and-setting-gmt.md',
  'src/content/tuDien/vi/gmt.md',
  'src/content/tuDien/en/gmt.md',
  'src/components/interactive/GmtReader.astro',
  'src/components/infographics/glossary/GMT.astro',
  'src/content/mauIconic/vi/rolex-gmt-master.md',
  'src/content/mauIconic/en/rolex-gmt-master.md',
  'src/content/thuongHieu/vi/rolex.md',
  'src/data/timeline.json',
  'src/data/rolexGmtMasterEvolution.ts',
];
const DOC_FILES = [
  'docs/ho-so-nguon-cum-gmt-song-ngu.md',
  'docs/nghiem-thu/2026-09-03_nghiem-thu-cum-gmt-song-ngu.md',
];

const MARKER = /(không nâng|Không nâng|chuẩn hóa|Chuẩn hóa|bỏ mệnh đề|Bỏ tên|bỏ ví dụ|bỏ biệt danh|bỏ link|Bỏ khỏi|Viết lại|viết lại|đã xử lý|Đã xử lý|đã sửa|Đã sửa|mâu thuẫn|Mâu thuẫn|lịch sử xử lý|quyết định|sai ở vòng|bắt lỗi|đã loại|đã bỏ)/;

// Tệp thuần GMT — mọi năm 1954/1983 đều đáng ngờ (dataset GMT chỉ có 1955/1982…)
const PURE_GMT = new Set([
  'src/content/coChe/vi/gmt.md',
  'src/content/coChe/en/gmt.md',
  'src/content/huongDan/vi/doc-va-chinh-gmt.md',
  'src/content/huongDan/en/reading-and-setting-gmt.md',
  'src/content/tuDien/vi/gmt.md',
  'src/content/tuDien/en/gmt.md',
  'src/components/interactive/GmtReader.astro',
  'src/components/infographics/glossary/GMT.astro',
  'src/data/rolexGmtMasterEvolution.ts',
]);

const errors = [];
const notes = [];
const fail = (rule, file, line, text) =>
  errors.push(`[${rule}] ${file}:${line} — ${text.trim().slice(0, 160)}`);

for (const f of [...CONTENT_FILES, ...DOC_FILES]) {
  if (!existsSync(f)) errors.push(`[FILE] Thiếu tệp phạm vi: ${f}`);
}

// ----- R1 + R2: năm sai -----------------------------------------------------
const badYears = [
  { year: '1954', rule: 'R1', why: '1954 gắn GMT-Master/Pan Am (chuẩn: 1955)' },
  { year: '1983', rule: 'R2', why: '1983 gắn GMT-Master II (chuẩn: 1982)' },
];

for (const f of CONTENT_FILES) {
  if (!existsSync(f)) continue;
  if (f === 'src/data/timeline.json') {
    // Parse JSON: chỉ lỗi khi ENTRY GMT/Pan Am mang năm sai (mốc khác chủ thể,
    // ví dụ Swatch quartz 1983, là hợp lệ)
    const data = JSON.parse(readFileSync(f, 'utf8'));
    const arr = Array.isArray(data) ? data : Object.values(data);
    for (const e of arr) {
      const ctx = `${e.title ?? ''} ${e.description ?? ''} ${e.slug ?? ''}`;
      if (!/GMT|Pan Am/i.test(ctx)) continue;
      for (const { year, rule, why } of badYears) {
        if (String(e.year) === year) fail(rule, f, 0, `entry year="${year}" — ${why}: ${ctx.slice(0, 80)}`);
      }
    }
    continue;
  }
  const lines = readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((text, i) => {
    const pure = PURE_GMT.has(f);
    for (const { year, rule, why } of badYears) {
      if (!text.includes(year)) continue;
      if (pure) fail(rule, f, i + 1, `${why} — năm ${year} trong tệp thuần GMT`);
      else if (/GMT-Master|Pan Am|GMT/i.test(text)) fail(rule, f, i + 1, `${why}`);
    }
  });
}

for (const f of DOC_FILES) {
  if (!existsSync(f)) continue;
  const lines = readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((text, i) => {
    for (const { year, rule, why } of badYears) {
      if (text.includes(year) && /GMT-Master|Pan Am/i.test(text) && !MARKER.test(text)) {
        fail(rule, f, i + 1, `${why} (dòng hồ sơ không mang ngữ cảnh lịch sử/phủ định)`);
      }
    }
  });
}

// ----- R3–R6: tổ hợp chữ sai ------------------------------------------------
const RULES = [
  { rule: 'R3', re: /Caller GMT|Flyer GMT/, why: 'tên gọi Caller/Flyer không phải thuật ngữ hãng' },
  {
    rule: 'R4',
    re: /chính thức của phi công Pan Am|official watch of Pan Am pilots|Pan Am (yêu cầu|lựa chọn|đặt hàng)|adopted by Pan Am|Pan Am pilots|phi công Pan Am|buồng lái Pan Am|Pan Am cockpit/,
    why: 'Pan Am phải là "đồng hồ chính thức của hãng hàng không Pan Am" (Rolex Newsroom)',
  },
  { rule: 'R5', re: /mọi GMT|every GMT|all GMT/i, why: 'khái quát hóa "mọi GMT" (cấu trúc tùy calibre)' },
  { rule: 'R6', re: /2:1/, why: 'tỷ lệ bánh răng 2:1 như quy tắc chung' },
];

for (const f of CONTENT_FILES) {
  if (!existsSync(f) || f === 'src/data/timeline.json') continue;
  const lines = readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((text, i) => {
    for (const { rule, re, why } of RULES) {
      if (re.test(text)) fail(rule, f, i + 1, `${why}`);
    }
  });
}

for (const f of DOC_FILES) {
  if (!existsSync(f)) continue;
  const lines = readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((text, i) => {
    for (const { rule, re, why } of RULES) {
      if (re.test(text) && !MARKER.test(text)) fail(rule, f, i + 1, `${why} (dòng hồ sơ không mang ngữ cảnh lịch sử/phủ định)`);
    }
  });
}

// ----- Presence check: hồ sơ phải ghi nhận chuẩn hóa tương tác --------------
const hoSo = DOC_FILES[0] && existsSync(DOC_FILES[0]) ? readFileSync(DOC_FILES[0], 'utf8') : '';
for (const key of ['GmtReader', 'infographic', 'GMT.astro']) {
  if (!hoSo.includes(key)) errors.push(`[DOC] Hồ sơ nguồn thiếu ghi nhận về "${key}" (phải ghi rõ infographic + công cụ tương tác đã chuẩn hóa)`);
}

// ----- Kết luận --------------------------------------------------------------
const checked = CONTENT_FILES.length + DOC_FILES.length;
if (errors.length > 0) {
  console.error(`KIỂM TRA NGUỒN CỤM GMT: KHÔNG ĐẠT — ${errors.length} lỗi trên ${checked} tệp phạm vi:`);
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}
console.log('KIỂM TRA NGUỒN CỤM GMT (check-gmt-source-integrity):');
console.log(`  Quét ${checked} tệp phạm vi (13 nội dung chặt tuyệt đối + 2 hồ sơ với nhận diện ngữ cảnh lịch sử)`);
console.log('  R1 1954: sạch · R2 1983: sạch · R3 Caller/Flyer: sạch · R4 Pan Am: sạch · R5 khái quát hóa: sạch · R6 2:1: sạch');
console.log('  Hồ sơ nguồn ghi nhận chuẩn hóa GmtReader + infographic GMT.astro');
console.log('  KẾT LUẬN: ĐẠT — cụm GMT thống nhất với hồ sơ nguồn (Rolex Newsroom, FHH).');
