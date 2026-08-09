// =============================================================================
// scan-hidden-text.mjs — Quét văn bản ẩn trong src/content/
// =============================================================================
// Chạy: node scripts/scan-hidden-text.mjs
//
// Tìm các dạng ẩn phần tử có thể bị tác nhân AI đọc sai:
// - display:none, visibility:hidden, opacity:0, font-size:0
// - Khối chú thích HTML <!-- -->
// - Phần tử đặt ngoài màn hình bằng tọa độ âm lớn
//
// Lý do: trang công khai sẽ được tác nhân AI duyệt web đọc. Văn bản ẩn
// nhúng trong nội dung có thể bị dùng để thao túng. Giữ src/content/ sạch.
// =============================================================================

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIR = 'src/content';

function walk(dir) {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (/\.(md|mdx)$/.test(f)) out.push(p);
  }
  return out;
}

const patterns = [
  { regex: /display:\s*none/i, label: 'display:none' },
  { regex: /visibility:\s*hidden/i, label: 'visibility:hidden' },
  { regex: /opacity:\s*0(?!\.)/i, label: 'opacity:0' },
  { regex: /font-size:\s*0/i, label: 'font-size:0' },
  { regex: /<!--[\s\S]*?-->/, label: 'HTML comment' },
  { regex: /(?:left|top):\s*-\d{4,}/i, label: 'tọa độ âm lớn (off-screen)' },
];

let found = 0;
const files = walk(DIR);

for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const { regex, label } of patterns) {
      if (regex.test(line)) {
        found++;
        const rel = relative('.', file).replace(/\\/g, '/');
        console.log(`${rel}:${i + 1} [${label}] ${line.trim().substring(0, 80)}`);
      }
    }
  });
}

if (found === 0) {
  console.log('OK: Không phát hiện văn bản ẩn trong src/content/.');
} else {
  console.log(`\nTổng: ${found} vị trí có văn bản ẩn.`);
  process.exit(1);
}
