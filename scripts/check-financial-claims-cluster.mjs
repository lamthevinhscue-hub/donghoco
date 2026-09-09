#!/usr/bin/env node
// =============================================================================
// check-financial-claims-cluster.mjs — chống hồi quy làm sạch tài chính P1.4
// (vòng sửa sau nghiệm thu, TXN-20260909-02)
// =============================================================================
// Chạy trong `npm run check`. Quét ĐÚNG phạm vi đã xử lý của P1.4, KHÔNG quét
// repo-wide, KHÔNG dùng cấm từ đơn ("giá", "đắt", "affordable" trơ trọi),
// KHÔNG đụng value_retention/value_retention_label của P1.3.
//
// Cách quét (sửa 09/09 theo nghiệm thu GPT Work):
//   - Quét theo KHỐI trường (collectorNote/positioning kèm YAML nhiều dòng
//     dạng > hoặc |; title/detail lineHistory Patek; toàn văn bài phạm vi A
//     và 2 tệp EN), KHÔNG chỉ quét dòng khai báo khóa → cụm qua xuống dòng
//     vẫn bị bắt; dòng báo cáo là dòng nguồn của cụm khớp.
//   - URL (http/https) bị nđỡ ra bằng khoảng trắng GIỮ NGUYÊN ĐỘ DÀI trước
//     khi khớp → nhãn liên kết Markdown và văn bản quanh liên kết vẫn được
//     quét, URL nguồn chứa "prices" không gây khớp nhầm, offset dòng không
//     lệch. Dòng khai báo "url:" không phải nội dung hiển thị → không quét.
//   - Comment HTML nhiều dòng được nđỡ (giữ offset); nội dung thật sau
//     comment vẫn được kiểm.
//   - Tách CÂU: mẫu miễn trừ disclaimer chỉ áp dụng cho câu chứa nó, không
//     vô hiệu các câu khác cùng trường/dòng ("Không tư vấn đầu tư. Đây là
//     khoản đầu tư an toàn." → câu sau vẫn bị bắt).
//   - Mẫu dùng khoảng cách linh hoạt [\s*]+ (khớp xuống dòng + bọc Markdown
//     **…**); các mẫu "giá cao/thấp/ngang" loại trừ "đánh giá cao/thấp/ngang"
//     bằng lookbehind.
//   R1. Giữ giá/mất giá/bán lại/thanh khoản/thị trường thứ cấp/tăng vọt.
//   R2. Đầu tư/tăng giá.
//   R3. Đáng tiền/khả năng chi trả/so sánh giá — gồm nhóm ngân sách, "sẵn
//       sàng chi thêm", "tầm giá này", "mọi mức giá", "trên cùng tầm tiền",
//       "giá dễ tiếp cận", phân khúc "giá thấp nhất/cao nhất/tầng giá"…
//   R4. "needs no servicing" và biến thể — 2 tệp EN phạm vi.
//   R5. Diễn đạt tôn vinh quảng bá EN đã nêu — tệp seiko EN.
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, readdirSync, existsSync } from 'node:fs';

const ARTICLES_VI = [
  'src/content/huongDan/vi/microbrand-la-gi.md',
  'src/content/mauIconic/vi/hublot-big-bang.md',
  'src/content/mauIconic/vi/mido-multifort.md',
  'src/content/mauIconic/vi/roger-dubuis-excalibur.md',
  'src/content/mauIconic/vi/swatch-sistem51.md',
  'src/content/mauIconic/vi/orient-bambino.md',
];
const BRANDS_DIR = 'src/content/thuongHieu/vi';
const PATEK = 'src/content/thuongHieu/vi/patek-philippe.md';
const EN_FILES = [
  'src/content/thuongHieu/en/seiko.md',
  'src/content/tuDien/en/movement.md',
];

// Ghép từ thành mẫu với khoảng cách linh hoạt (khoảng trắng, xuống dòng, *).
// notAfter: chặn khớp khi cụm đứng ngay sau chuỗi này (vd "đánh giá cao").
const flex = (words, notAfter = '') =>
  new RegExp(`${notAfter ? `(?<!${notAfter}\\s*)` : ''}${words.join('[\\s*]+')}`, 'iu');

const R1_CLAIMS = [
  { re: flex(['giữ', 'giá']), why: 'khẳng định giữ giá' },
  { re: flex(['giữ', 'giá', 'trị']), why: 'khẳng định giữ giá trị' },
  { re: flex(['mất', 'giá']), why: 'khẳng định mất giá' },
  { re: flex(['bán', 'lại']), why: 'khẳng định khả năng bán lại' },
  { re: flex(['giá', 'trị', 'bán', 'lại']), why: 'khẳng định giá trị bán lại' },
  { re: flex(['thanh', 'khoản']), why: 'khẳng định thanh khoản' },
  { re: flex(['thị', 'trường', 'thứ', 'cấp']), why: 'nhận định thị trường thứ cấp' },
  { re: flex(['giá', 'thị', 'trường']), why: 'nhận định giá thị trường' },
  { re: flex(['tăng', 'vọt']), why: 'khẳng định giá tăng vọt' },
  { re: /holds?\s+its?\s+value|value\s+retention/i, why: 'khẳng định giữ giá (EN)' },
  { re: /\bresal(e|es|ing)\b|\bresell/i, why: 'khẳng định bán lại (EN)' },
];
const R2_CLAIMS = [
  { re: flex(['đầu', 'tư']), why: 'nhận định đầu tư' },
  { re: flex(['tăng', 'giá']), why: 'khẳng định tăng giá' },
  { re: /\binvest(?:ment|ing)?\b(?! advice)/i, why: 'nhận định đầu tư (EN)' },
  { re: /appreciat(?:e|es|ed|ing)/i, why: 'khẳng định tăng giá trị theo thời gian (EN)' },
];
const R3_CLAIMS = [
  { re: flex(['tỷ', 'lệ', 'giá', 'hợp', 'lý']), why: 'so sánh "tỷ lệ giá hợp lý"' },
  { re: flex(['giá', 'hợp', 'lý']), why: 'so sánh "giá hợp lý"' },
  { re: flex(['đáng', 'tiền']), why: 'so sánh "đáng tiền"' },
  { re: flex(['món', 'hời']), why: 'so sánh "món hời"' },
  { re: flex(['không', 'phải', 'trả', 'giá']), why: 'diễn đạt "không phải trả giá"' },
  { re: flex(['trả', 'giá', 'cao']), why: 'diễn đạt "trả giá cao"' },
  { re: flex(['trả', 'giá', 'cho']), why: 'diễn đạt "trả giá cho" (đánh đổi tiền)' },
  { re: flex(['tiết', 'kiệm', 'nhiều', 'tháng']), why: 'diễn đạt "tiết kiệm nhiều tháng"' },
  { re: flex(['tầm', 'giá', 'vừa']), why: 'diễn đạt "tầm giá vừa"' },
  { re: flex(['cách', 'rẻ', 'nhất']), why: 'diễn đạt "cách rẻ nhất"' },
  { re: flex(['rẻ', 'nhất']), why: 'so sánh "rẻ nhất"' },
  { re: /mức giá thấp nhất/iu, why: 'so sánh "mức giá thấp nhất"' },
  { re: flex(['ngân', 'sách']), why: 'nhận định ngân sách', allow: /ngân\s*sách\s*nghiên\s*cứu/iu },
  { re: flex(['sẵn', 'sàng', 'chi', 'thêm']), why: 'khuyến nghị "sẵn sàng chi thêm"' },
  { re: flex(['tầm', 'giá', 'này']), why: 'khung "tầm giá này"' },
  { re: flex(['nhóm', 'giá', 'này']), why: 'khung "nhóm giá này"' },
  { re: flex(['mọi', 'mức', 'giá']), why: 'khẳng định bao phủ "mọi mức giá"' },
  { re: flex(['tầm', 'tiền']), why: 'so sánh trên cùng tầm tiền' },
  { re: flex(['cùng', 'tầm', 'giá']), why: 'so sánh trên cùng tầm giá' },
  { re: flex(['cùng', 'giá']), why: 'so sánh trên cùng mức giá' },
  { re: flex(['giá', 'dễ', 'chịu']), why: 'định vị "giá dễ chịu"' },
  { re: flex(['giá', 'dễ', 'tiếp', 'cận']), why: 'định vị "giá dễ tiếp cận"' },
  { re: flex(['dễ', 'tiếp', 'cận', 'nhất']), why: 'so sánh "dễ tiếp cận nhất"' },
  { re: flex(['dễ', 'tiếp', 'cận', 'hơn', 'Nautilus']), why: 'so sánh "dễ tiếp cận hơn Nautilus"' },
  { re: flex(['giá', 'thấp'], 'đánh'), why: 'nhận định "giá thấp"' },
  { re: flex(['giá', 'cao'], 'đánh'), why: 'nhận định "giá cao"' },
  { re: flex(['giá', 'ngang'], 'đánh'), why: 'so sánh "giá ngang"' },
  { re: flex(['giá', 'mềm']), why: 'diễn đạt "giá mềm"' },
  { re: flex(['khoảng', 'cách', 'giá']), why: 'so sánh "khoảng cách giá"' },
  { re: flex(['tầng', 'giá']), why: 'định vị "tầng giá"' },
  { re: flex(['kể', 'cả', 'khi', 'có', 'tiền']), why: 'diễn đạt "kể cả khi có tiền"' },
  { re: flex(['đắt', 'gấp']), why: 'so sánh "đắt gấp"' },
  { re: flex(['giá', 'thấp', 'hơn', 'nhiều', 'so', 'với', 'giá', 'trị']), why: 'nhận định "giá thấp hơn nhiều so với giá trị"' },
  { re: /best\s+value/i, why: 'so sánh "best value" (EN)' },
  { re: /affordable/i, why: 'diễn đạt khả năng chi trả "affordable" (EN)' },
];
const R4_CLAIMS = [
  { re: /needs?\s+no\s+servic\w*|without\s+(?:any\s+)?servic\w*|no\s+servicing\s+needed/i, why: 'claim "needs no servicing" (không có căn cứ kỹ thuật trực tiếp)' },
];
const R5_CLAIMS = [
  { re: /best\s+(?:guardians?|protectors?)/i, why: 'tôn vinh "best guardians/protectors"' },
  { re: /at\s+every\s+price/i, why: 'diễn đạt giá "at every price"' },
  { re: /Affordable\s+Seiko/i, why: 'diễn đạt "Affordable Seiko"' },
  { re: /no\s+other\s+brand\s+covers/i, why: 'so sánh quảng bá "no other brand covers"' },
  { re: /entry-level\s+prices?/i, why: 'diễn đạt "entry-level prices"' },
];

// Miễn trừ DISCLAIMER áp dụng CẤP CÂU: chỉ câu chứa nó được qua.
const DISCLAIMER =
  /không\s+(?:phải\s+)?tư\s+vấn(?:\s+đầu\s+tư)?|không\s+dự\s+đoán|not\s+(?:a\s+)?investment\s+advice|no\s+financial\s+advice|disclaimer/i;

const URL_RE = /https?:\/\/[^\s)"'>]+/g;
// Nđỡ comment/URL GIỮ NGUYÊN ký tự xuống dòng (CR/LF) — độ dài không đổi để
// offset dòng không lệch (ca C: comment nhiều dòng không làm sai số dòng).
const padBlank = (m) => m.replace(/[^\r\n]/g, ' ');

// Bọc một đoạn văn bản thành entry { startLine, text }.
const entryOf = (file, startLine, text) => ({ file, startLine, text });

// Chuỗi YAML trích dẫn đã đóng chưa: đếm dấu nháy KHÔNG escape; chẵn = đóng.
function isYamlQuoteClosed(s, q) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\') { i++; continue; }
    if (s[i] === q) count++;
  }
  return count % 2 === 0;
}

// Thu các khối trường (khi nào gồm cả YAML nhiều dòng): khối scalar > hoặc |,
// và chuỗi nhiều dòng trong ngoặc kép/ngoặc đơn chưa đóng ở dòng đầu.
// Ranh giới: chỉ thu dòng thụt lề sâu hơn dòng key — không lấn trường khác.
function collectFieldBlocks(lines, keyRe, file) {
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(keyRe);
    if (!m) continue;
    const indent = (lines[i].match(/^\s*/) ?? [''])[0].length;
    const parts = [lines[i].slice(m[0].length)];
    const head = parts[0].trim();
    let j = i + 1;
    if (/^[>|][+-]?\s*$/.test(head) || head === '') {
      // khối scalar: thu mọi dòng thụt lề sâu hơn cho tới khi hết
      while (j < lines.length) {
        const l = lines[j];
        const li = (l.match(/^\s*/) ?? [''])[0].length;
        if (l.trim() === '') { parts.push(''); j++; continue; }
        if (li > indent && !/^\s*(?:collectorNote|positioning|[a-z_]+):\s/.test(l)) { parts.push(l); j++; continue; }
        break;
      }
    } else {
      const q = head.startsWith('"') ? '"' : head.startsWith("'") ? "'" : null;
      if (q && !isYamlQuoteClosed(parts.join('\n'), q)) {
        // chuỗi trích dẫn nhiều dòng: thu tới khi dấu nháy đóng
        while (j < lines.length) {
          const l = lines[j];
          const li = (l.match(/^\s*/) ?? [''])[0].length;
          if (l.trim() === '') { parts.push(''); j++; continue; }
          if (li > indent) {
            parts.push(l);
            j++;
            if (isYamlQuoteClosed(parts.join('\n'), q)) break;
            continue;
          }
          break;
        }
      }
    }
    while (parts.length && parts[parts.length - 1].trim() === '') parts.pop();
    out.push(entryOf(file, i + 1, parts.join('\n')));
    i = j - 1;
  }
  return out;
}

// Tách câu từ một khối text: trả về [{ offset, text }] — câu có thể chứa \n.
function splitSentences(text) {
  const out = [];
  const re = /[\s\S]*?(?:[.!?]+(?:"|\)|\]|\*)*\s+|$)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const t = m[0];
    if (t.trim()) out.push({ offset: m.index, text: t });
    if (re.lastIndex === m.index) re.lastIndex++;
  }
  return out;
}

// Tách mệnh đề trong một câu: theo dấu phẩy/chấm phẩy và từ nối "nhưng" —
// để miễn trừ disclaimer chỉ áp dụng đúng mệnh đề chứa nó (ca A).
function splitClauses(sentence) {
  const out = [];
  const re = /[\s\S]*?(?:[,;]\s*|\s+nhưng\s+|$)/giu;
  let m;
  while ((m = re.exec(sentence)) !== null) {
    const t = m[0];
    if (t.trim()) out.push({ offset: m.index, text: t });
    if (re.lastIndex === m.index) re.lastIndex++;
  }
  return out;
}

const errors = [];
const report = [];
const fail = (rule, file, line, why, snippet) =>
  errors.push(`[${rule}] ${file}:${line} — ${why}: "${snippet}"`);

// Đếm dòng: số '\n' trước offset + dòng bắt đầu của entry.
function lineAt(text, startLine, index) {
  let n = startLine;
  for (let i = 0; i < index; i++) if (text[i] === '\n') n++;
  return n;
}

// Quét một entry: chuẩn bị text (nđỡ comment + URL giữ CR/LF và offset),
// tách câu → tách mệnh đề; chỉ mệnh đề chứa disclaimer được miễn trừ, các
// mệnh đề nhận định còn lại (kể cả cùng câu/dòng) vẫn bị quét.
function scanEntryAccurate(rule, entry, claims) {
  const prepared = entry.text
    .replace(/<!--[\s\S]*?-->/g, padBlank)
    .replace(URL_RE, padBlank);
  for (const { offset: sOff, text: sentence } of splitSentences(prepared)) {
    for (const { offset: cOff, text: clause } of splitClauses(sentence)) {
      if (DISCLAIMER.test(clause)) continue; // chỉ đúng mệnh đề disclaimer được miễn
      for (const { re, why, allow } of claims) {
        const m = re.exec(clause);
        if (!m) continue;
        if (allow && allow.test(clause)) continue;
        const abs = sOff + cOff + m.index;
        fail(rule, entry.file, lineAt(prepared, entry.startLine, abs), why, m[0]);
      }
    }
  }
}

// ===== Thu phạm vi =====
const scopes = []; // { ruleClaims: [[rule, claims]…], entries: [entry…] }

// 1) 6 bài VI + 2 tệp EN — quét toàn văn tệp (frontmatter excerpt hiển thị;
//    dòng khai báo url nguồn bị nđỡ URL nên không khớp).
for (const f of [...ARTICLES_VI, ...EN_FILES]) {
  if (!existsSync(f)) { errors.push(`[FILE] Thiếu tệp phạm vi: ${f}`); continue; }
  scopes.push({
    file: f,
    entry: entryOf(f, 1, readFileSync(f, 'utf8')),
    sets: [['R1', R1_CLAIMS], ['R2', R2_CLAIMS], ['R3', R3_CLAIMS], ...(f.endsWith('seiko.md') ? [['R5', R5_CLAIMS]] : []), ...(f.endsWith('movement.md') ? [['R4', R4_CLAIMS]] : [])],
  });
}

// 2) collectorNote + positioning của thương hiệu VI — khối nhiều dòng.
let brandFields = 0;
const brandFiles = readdirSync(BRANDS_DIR).filter((n) => n.endsWith('.md'));
for (const name of brandFiles) {
  const f = `${BRANDS_DIR}/${name}`;
  const lines = readFileSync(f, 'utf8').split(/\r?\n/);
  const blocks = collectFieldBlocks(lines, /^\s*(collectorNote|positioning):/, f);
  brandFields += blocks.length;
  for (const b of blocks) scopes.push({ file: f, entry: b, sets: [['R1', R1_CLAIMS], ['R2', R2_CLAIMS], ['R3', R3_CLAIMS]] });
}

// 3) title/detail lineHistory của Patek (sự kiện Nautilus 2022).
if (!existsSync(PATEK)) {
  errors.push(`[FILE] Thiếu tệp phạm vi: ${PATEK}`);
} else {
  const lines = readFileSync(PATEK, 'utf8').split(/\r?\n/);
  for (const b of collectFieldBlocks(lines, /^\s*(title|detail):/, PATEK)) {
    scopes.push({ file: PATEK, entry: b, sets: [['R1', R1_CLAIMS], ['R2', R2_CLAIMS]] });
  }
}

// ===== Chạy quét =====
for (const s of scopes) {
  for (const [rule, claims] of s.sets) scanEntryAccurate(rule, s.entry, claims);
}

// ===== Kết luận =====
if (!errors.some((e) => e.startsWith('[R1]'))) report.push('R1: sạch giữ giá/mất giá/bán lại/thanh khoản/thị trường thứ cấp trong phạm vi đã xử lý');
if (!errors.some((e) => e.startsWith('[R2]'))) report.push('R2: sạch đầu tư/tăng giá (miễn trừ disclaimer chỉ theo câu)');
if (!errors.some((e) => e.startsWith('[R3]'))) report.push('R3: sạch đáng tiền/khả năng chi trả/so sánh giá — gồm nhóm ngân sách, "sẵn sàng chi thêm", khung tầm giá/tầm tiền, phân khúc giá');
if (!errors.some((e) => e.startsWith('[R4]'))) report.push('R4: movement EN không còn "needs no servicing"');
if (!errors.some((e) => e.startsWith('[R5]'))) report.push('R5: seiko EN sạch diễn đạt tôn vinh quảng bá đã nêu');

console.log('KIỂM TRA NHẬN ĐỊNH TÀI CHÍNH CÒN SÓT (P1.4):');
console.log(`  Phạm vi: ${ARTICLES_VI.length} bài VI, ${brandFields} trường collectorNote/positioning trên ${brandFiles.length} thương hiệu (kèm YAML nhiều dòng), title/detail Patek, ${EN_FILES.length} tệp EN`);
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — không hồi quy nhận định tài chính trong phạm vi P1.4.');
