// =============================================================================
// check-links.mjs — Kiểm tra link nội bộ trong dist/ HTML đã dựng
// =============================================================================
// Chạy: node scripts/check-links.mjs  (sau khi đã npm run build)
//
// Quét tất cả file index.html trong dist/, tìm mọi href nội bộ (bắt đầu bằng /
// hoặc tương đối), kiểm tra đường dẫn đó tồn tại trên ổ đĩa. Bỏ qua link ngoài
// (http), anchor (#), mailto, tel, và asset tĩnh (_astro, .js, .css, .png...).
//
// Báo mọi link hỏng.
// =============================================================================

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, dirname, resolve } from 'node:path';

const DIST = 'dist';

// Đuôi file tĩnh bỏ qua (asset, không phải trang)
const SKIP_EXT = new Set(['.js', '.mjs', '.css', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.xml', '.txt', '.json', '.webmanifest']);

function walkHtml(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walkHtml(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const htmlFiles = walkHtml(DIST);
const broken = [];
const checked = new Set();
let linkCount = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  // Trích xuất href="..." (chỉ lấy nội dung trong ngoặc kép)
  const hrefRegex = /href=["']([^"']+)["']/g;
  let m;
  while ((m = hrefRegex.exec(html)) !== null) {
    const href = m[1];
    linkCount++;

    // Bỏ qua: ngoài, anchor, mailto, tel, dữ liệu
    if (/^(https?:|mailto:|tel:|data:|#|\/\/)/i.test(href)) continue;

    // Phân giải đường dẫn
    let target;
    if (href.startsWith('/')) {
      // Tuyệt đối từ gốc dist
      target = join(DIST, href);
    } else {
      // Tương đối từ file HTML hiện tại
      target = resolve(dirname(file), href);
    }

    // Bỏ query string và hash
    target = target.split(/[?#]/)[0];

    // Bỏ asset tĩnh
    const ext = extname(target).toLowerCase();
    if (SKIP_EXT.has(ext)) continue;

    // Bỏ qua nếu đã kiểm tra (tránh trùng)
    if (checked.has(target)) continue;
    checked.add(target);

    // Phân giải "/thuong-hieu/rolex" → kiểm tra cả dir/index.html và file trực tiếp
    let exists = false;
    if (existsSync(target)) {
      const st = statSync(target);
      if (st.isDirectory()) {
        exists = existsSync(join(target, 'index.html'));
      } else {
        exists = true;
      }
    } else if (existsSync(target + '.html')) {
      exists = true;
    } else if (existsSync(join(target, 'index.html'))) {
      exists = true;
    }

    if (!exists) {
      broken.push({ file: file.replace(/\\/g, '/'), href });
    }
  }
}

if (broken.length === 0) {
  console.log(`OK: Không phát hiện link nội bộ hỏng.`);
  console.log(`   Đã quét ${htmlFiles.length} trang HTML, ${linkCount} link.`);
  process.exit(0);
}

console.log(`PHÁT HIỆN ${broken.length} link nội bộ hỏng:\n`);
for (const b of broken) {
  console.log(`  ${b.file}`);
  console.log(`    → ${b.href}`);
}
console.log(`\nTổng: ${broken.length} link hỏng trong ${htmlFiles.length} trang.`);
process.exit(1);
