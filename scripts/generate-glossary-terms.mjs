// =============================================================================
// generate-glossary-terms.mjs — Sinh file JSON chứa danh sách thuật ngữ từ điển
// =============================================================================
// Chạy trước build: đọc tất cả file trong src/content/tuDien/vi/*.md, trích
// title + excerpt + slug (tên file), ghi ra src/data/glossary-terms.json.
// Remark plugin đọc JSON này (vì plugin chạy sync, không thể getCollection).
//
// Chạy: node scripts/generate-glossary-terms.mjs
// Được gọi tự động trước "astro build" qua package.json script.
// =============================================================================

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIR = 'src/content/tuDien/vi';
const OUT = 'src/data/glossary-terms.json';

async function main() {
  const files = (await readdir(DIR)).filter((f) => f.endsWith('.md'));
  const terms = [];

  for (const file of files) {
    const path = join(DIR, file);
    const content = await readFile(path, 'utf-8');
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) continue;
    const fm = fmMatch[1];

    const title = fm.match(/^title:\s*"?(.+?)"?\s*$/m)?.[1];
    const excerpt = fm.match(/^excerpt:\s*"?(.+?)"?\s*$/m)?.[1];
    const termEn = fm.match(/^term_en:\s*"?(.+?)"?\s*$/m)?.[1];
    const slug = file.replace(/\.md$/, '');
    const draft = fm.match(/^draft:\s*(true|false)/m)?.[1];

    if (draft === 'true') continue;
    if (!title || !excerpt) continue;

    // Sinh aliases để khớp linh hoạt hơn:
    // - title đầy đủ
    // - phần trước dấu ngoặc (VD "Dây tóc & bánh lắc (Hairspring & Balance)" → "Dây tóc & bánh lắc")
    // - term_en (tên tiếng Anh)
    const aliases = new Set([title]);
    const parenPart = title.replace(/\s*\([^)]*\)\s*$/, '').trim();
    if (parenPart && parenPart.length >= 3) aliases.add(parenPart);
    if (termEn && termEn.length >= 3) aliases.add(termEn);

    terms.push({ title, slug, excerpt, aliases: [...aliases] });
  }

  // Sắp xếp theo độ dài title giảm dần (ưu tiên cụm dài)
  terms.sort((a, b) => b.title.length - a.title.length);

  await writeFile(OUT, JSON.stringify(terms, null, 2), 'utf-8');
  console.log(`✓ Đã sinh ${terms.length} thuật ngữ → ${OUT}`);
}

main().catch((e) => {
  console.error('Lỗi sinh glossary terms:', e);
  process.exit(1);
});
