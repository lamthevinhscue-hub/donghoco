// P2.1 — Phép đếm thẻ script trong dist/ (chặng A, vòng đính chính TXN-20260909-08)
// Cách chạy (tái lập): node output/p2.1-csp-preview/dem-script-dist.mjs
// Đếm: số trang HTML, tổng thẻ <script>, thẻ có src, thẻ không src,
// trong đó JSON-LD và script inline còn lại; kèm số ĐOẠN DUY NHẤT
// (nội dung đã chuẩn hóa khoảng trắng, băm SHA-256) để phân biệt
// "số lần xuất hiện" với "số đoạn mã duy nhất".
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const DIST = 'dist';
function listHtml(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...listHtml(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}
const files = listHtml(DIST);
let total = 0, withSrc = 0, jsonLd = 0, inline = 0;
const uniqInline = new Map(); // hash -> {count, preview}
const uniqJsonLd = new Map();
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const hashOf = (s) => createHash('sha256').update(norm(s)).digest('hex').slice(0, 12);
const RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  let m;
  while ((m = RE.exec(html)) !== null) {
    const attrs = m[1] || '';
    const body = m[2] || '';
    total++;
    const isSrc = /(?:^|\s)src\s*=/.test(attrs);
    if (isSrc) { withSrc++; continue; }
    if (/type\s*=\s*["']application\/ld\+json["']/.test(attrs)) {
      jsonLd++;
      const h = hashOf(body);
      const e = uniqJsonLd.get(h) || { count: 0, preview: norm(body).slice(0, 70) };
      e.count++; uniqJsonLd.set(h, e);
    } else {
      inline++;
      const h = hashOf(body);
      const e = uniqInline.get(h) || { count: 0, preview: norm(body).slice(0, 70) };
      e.count++; uniqInline.set(h, e);
    }
  }
}
const result = {
  measured_at: new Date().toISOString(),
  dist: DIST,
  pages: files.length,
  script_tags_total: total,
  script_tags_with_src: withSrc,
  script_tags_without_src: total - withSrc,
  jsonld_blocks: jsonLd,
  inline_script_tags: inline,
  unique_inline_bodies: uniqInline.size,
  unique_jsonld_bodies: uniqJsonLd.size,
  top_repeated_inline: [...uniqInline.values()].sort((a, b) => b.count - a.count).slice(0, 5),
  top_repeated_jsonld: [...uniqJsonLd.values()].sort((a, b) => b.count - a.count).slice(0, 3),
};
console.log(JSON.stringify(result, null, 1));
