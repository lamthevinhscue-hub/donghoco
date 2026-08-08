// =============================================================================
// scan-chars.mjs — Quét ký tự ngoài tiếng Việt/Anh trong src/
// =============================================================================
// Chạy: node scripts/scan-chars.mjs
//
// Cho phép: chữ Latin (gồm tiếng Việt có dấu), dấu câu thông dụng, ký hiệu
// toán học, và biểu tượng. Báo mọi ký tự ngoài các phạm vi này.
//
// Lỗi thường gặp: auto-correct vô tình chèn chữ Hán/Cyrillic/Ả Rập vào giữa
// từ tiếng Việt (VD: "tr梭n", "спортів"). Script này bắt lỗi đó.
//
// Từ nay phải chạy trước mọi lần push — không ngoại lệ.
// =============================================================================

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = 'src';

// Phạm vi CHO PHÉP (mỗi entry là [start, end] inclusive trên code point)
const ALLOWED = [
  [0x0000, 0x007f], // Basic Latin (ASCII: chữ, số, dấu câu cơ bản)
  [0x0080, 0x00ff], // Latin-1 Supplement (à á â ã è é ê ì í ï ò ó ô õ ú û ç ñ)
  [0x0100, 0x017f], // Latin Extended-A (Ă ă Đ đ Ė ė Ġ ġ ...)
  [0x0180, 0x024f], // Latin Extended-B
  [0x1e00, 0x1eff], // Latin Extended Additional (chữ Việt ghép trước: ạ ấ ầ ẫ ậ ắ ằ ẵ ặ ế ề ễ ệ ớ ờ ỡ ợ ứ ừ ữ ự ý ỵ …)
  [0x2000, 0x206f], // General Punctuation (– — ' ' " " † ‡ … ‰ №)
  [0x20a0, 0x20cf], // Currency Symbols (₫ € £ ¥) — cho giá VND
  [0x2100, 0x214f], // Letterlike Symbols (ℹ ℃ ℉ №)
  [0x2190, 0x21ff], // Arrows (→ ← ↑ ↓ ↻ ↺ ⇄)
  [0x2200, 0x22ff], // Mathematical Operators (± × ÷ ≈ ≤ ≥ √ ∑)
  [0x2300, 0x23ff], // Miscellaneous Technical (⏰ ⏱ ⏸ ⌂ ⌐)
  [0x2460, 0x24ff], // Enclosed Alphanumerics (① ② ③ ⑴ ⒈)
  [0x25a0, 0x25ff], // Geometric Shapes (■ □ ▲ ▶ ● ○ ◆)
  [0x2600, 0x26ff], // Miscellaneous Symbols (☀ ☂ ☎ ☑ ☻)
  [0x2700, 0x27bf], // Dingbats (✓ ✗ ✦ ✶ ✿)
  [0x27c0, 0x27ef], // Miscellaneous Mathematical Symbols-A
  [0x27f0, 0x27ff], // Supplemental Arrows-A (⟲ ⟳ ⟴)
  [0x2b00, 0x2bff], // Miscellaneous Symbols and Arrows (⬌ ⬛ ⬜)
  [0x1f000, 0x1f0ff], // Mahjong Tile / Domino (hiếm, nhưng thuộc vùng biểu tượng)
  [0x1f100, 0x1f1ff], // Enclosed Alphanumeric Supplement
  [0x1f300, 0x1faff], // Emoji & Symbols (🌍 🎪 🎩 🏫 💡 🔧 📱 ⏸ …)
  [0xfe00, 0xfe0f], // Variation Selectors (emoji modifiers, vô hại)
];

function isAllowed(cp) {
  for (const [s, e] of ALLOWED) {
    if (cp >= s && cp <= e) return true;
  }
  return false;
}

// Đuôi file cần quét (nội dung người viết, không phải dependency)
const EXTENSIONS = new Set(['.md', '.astro', '.ts', '.mjs', '.js', '.json', '.html', '.svg', '.css']);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      out.push(...walk(p));
    } else {
      const ext = name.slice(name.lastIndexOf('.')).toLowerCase();
      if (EXTENSIONS.has(ext)) out.push(p);
    }
  }
  return out;
}

const files = walk(ROOT);
const findings = [];

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    for (let j = 0; j < line.length; j++) {
      const cp = line.codePointAt(j);
      if (cp > 0xffff) j++; // surrogate pair
      if (!isAllowed(cp)) {
        const ch = String.fromCodePoint(cp);
        const block = blockName(cp);
        findings.push({ file: relative(process.cwd(), file).replace(/\\/g, '/'), line: i + 1, col: j + 1, ch, cp, block, context: line.trim().slice(Math.max(0, j - 20), j + 20) });
      }
    }
  });
}

// Báo cáo
if (findings.length === 0) {
  console.log('OK: Không phát hiện ký tự ngoài tiếng Việt/Anh trong src/.');
  console.log(`   Đã quét ${files.length} file.`);
  process.exit(0);
}

console.log(`PHÁT HIỆN ${findings.length} vị trí có ký tự ngoài tiếng Việt/Anh:\n`);
for (const f of findings) {
  console.log(`  ${f.file}:${f.line}:${f.col}  U+${f.cp.toString(16).toUpperCase().padStart(4, '0')}  ${JSON.stringify(f.ch)}  [${f.block}]`);
  console.log(`    …${f.context}…`);
}
console.log(`\nTổng: ${findings.length} vị trí trong ${files.length} file.`);
process.exit(1);

// ----- helpers -----
function blockName(cp) {
  if (cp >= 0x0400 && cp <= 0x04ff) return 'Cyrillic';
  if (cp >= 0x0600 && cp <= 0x06ff) return 'Ả Rập';
  if (cp >= 0x4e00 && cp <= 0x9fff) return 'CJK Thống nhất';
  if (cp >= 0x3040 && cp <= 0x30ff) return 'Kana (Nhật)';
  if (cp >= 0xac00 && cp <= 0xd7af) return 'Hangul (Hàn)';
  if (cp >= 0x0590 && cp <= 0x05ff) return 'Do Thái';
  if (cp >= 0x0370 && cp <= 0x03ff) return 'Hy Lạp';
  if (cp >= 0x0900 && cp <= 0x097f) return 'Devanagari';
  if (cp >= 0xff00 && cp <= 0xffef) return 'Fullwidth/Halfwidth';
  return `U+${cp.toString(16).toUpperCase()}`;
}
