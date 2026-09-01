#!/usr/bin/env node
// =============================================================================
// check-editorial-links.mjs — kiểm tra liên kết biên tập cơ chế ↔ mẫu iconic
// =============================================================================
// Đọc frontmatter toàn bộ bài tiếng Việt trong coChe/vi và mauIconic/vi, kiểm:
//   1. slug đích phải tồn tại trong collection tương ứng;
//   2. không trùng slug trong cùng một danh sách;
//   3. không để trống slug hoặc relation;
//   4. quan hệ cơ chế ↔ mẫu iconic phải đủ HAI CHIỀU:
//      - coChe.relatedModels → mauIconic phải có relatedMechanisms trỏ ngược;
//      - mauIconic.relatedMechanisms → coChe phải có relatedModels trỏ ngược.
// Không áp quy tắc hai chiều cho mạng mẫu ↔ mẫu (relatedModels giữa các bài
// trong mauIconic) — các liên kết đó có thể mang tính biên tập có hướng.
// Trả exit 1 nếu có lỗi; in báo cáo ngắn khi mọi thứ đạt.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';

const base = path.resolve(process.cwd(), 'src/content');
const dirs = {
  coChe: path.join(base, 'coChe', 'vi'),
  mauIconic: path.join(base, 'mauIconic', 'vi'),
};

/** Tách frontmatter và thu các mục của relatedModels/relatedMechanisms. */
function parseEditorialLists(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { lists: { relatedModels: [], relatedMechanisms: [] }, hasFm: false };
  const lists = { relatedModels: [], relatedMechanisms: [] };
  let current = null;
  let entry = null;
  let lineNo = 0;
  for (const raw of m[1].split(/\r?\n/)) {
    lineNo++;
    const key = raw.match(/^([A-Za-z_]+):/);
    if (key) {
      current = key[1] === 'relatedModels' || key[1] === 'relatedMechanisms' ? key[1] : null;
      entry = null;
      continue;
    }
    if (!current) continue;
    const slug = raw.match(/^\s+-\s+slug:\s*"?\s*(.*?)\s*"?\s*$/);
    if (slug) {
      entry = { slug: slug[1], relation: null, line: lineNo };
      lists[current].push(entry);
      continue;
    }
    const rel = raw.match(/^\s+relation:\s*"?\s*(.*?)\s*"?\s*$/);
    if (rel && entry) entry.relation = rel[1];
  }
  return { lists, hasFm: true };
}

/** Danh sách slug (tên tệp bỏ .md) của một thư mục nội dung. */
function slugsIn(dir) {
  return new Set(
    fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.slice(0, -3)),
  );
}

const errors = [];
const pairs = new Set(); // "mechSlug|modelSlug" hai chiều hợp lệ

/** Đọc toàn bộ bài của một collection và kiểm các lỗi cục bộ. */
function loadCollection(name) {
  const dir = dirs[name];
  const slugs = slugsIn(dir);
  const data = new Map();
  let count = 0;
  for (const slug of slugs) {
    count++;
    const { lists, hasFm } = parseEditorialLists(path.join(dir, `${slug}.md`));
    data.set(slug, lists);
    for (const listName of Object.keys(lists)) {
      const seen = new Set();
      for (const entry of lists[listName]) {
        const where = `${name}/${slug}.md (${listName}, dòng ${entry.line})`;
        if (!entry.slug || !entry.slug.trim()) errors.push(`Slug rỗng — ${where}`);
        if (entry.relation === null || !entry.relation.trim()) {
          errors.push(`Thiếu hoặc rỗng relation cho slug "${entry.slug || ''}" — ${where}`);
        }
        if (entry.slug && seen.has(entry.slug)) {
          errors.push(`Slug trùng lặp trong cùng danh sách: "${entry.slug}" — ${where}`);
        }
        seen.add(entry.slug);
      }
    }
  }
  return { data, slugs, count };
}

const coChe = loadCollection('coChe');
const mauIconic = loadCollection('mauIconic');

/** Kiểm slug đích tồn tại + thu cặp hai chiều cơ chế ↔ mẫu. pairKey(srcSlug, targetSlug) trả khóa cặp chuẩn hóa. */
function checkTargets(srcName, srcListName, srcData, targetName, targetSlugs, targetData, targetListName, kind, pairKey) {
  for (const [slug, lists] of srcData) {
    for (const entry of lists[srcListName]) {
      if (!entry.slug) continue;
      if (!targetSlugs.has(entry.slug)) {
        errors.push(
          `Slug đích không tồn tại: "${entry.slug}" — ${srcName}/${slug}.md (${srcListName}, dòng ${entry.line})`,
        );
        continue;
      }
      if (kind === 'mech-to-model') pairs.add(pairKey(slug, entry.slug));
    }
  }
  // Bắt buộc hai chiều CHỈ cho quan hệ cơ chế ↔ mẫu iconic; mạng mẫu ↔ mẫu
  // có thể mang tính biên tập có hướng nên không kiểm chiều ngược.
  if (kind !== 'mech-to-model') return;
  for (const [slug, lists] of srcData) {
    for (const entry of lists[srcListName]) {
      if (!entry.slug || !targetSlugs.has(entry.slug)) continue;
      const back = targetData.get(entry.slug);
      const backList = back ? back[targetListName] : [];
      const hasReverse = backList.some((e) => e.slug === slug);
      if (!hasReverse) {
        errors.push(
          `Thiếu chiều ngược: ${srcName}/${slug}.md → ${targetName}/${entry.slug} nhưng bài đích không trỏ ngược qua ${targetListName}`,
        );
      }
    }
  }
}

// Cơ chế → mẫu iconic: kiểm tồn tại + bắt buộc hai chiều. Khóa cặp luôn chuẩn "cơ chế|mẫu"
// để hai lượt kiểm (đi và về) ghi vào cùng một cặp.
checkTargets('coChe', 'relatedModels', coChe.data, 'mauIconic', mauIconic.slugs, mauIconic.data, 'relatedMechanisms', 'mech-to-model', (mech, model) => `${mech}|${model}`);
// Mẫu iconic → cơ chế: kiểm tồn tại + bắt buộc hai chiều (đếm cặp đã có ở trên).
checkTargets('mauIconic', 'relatedMechanisms', mauIconic.data, 'coChe', coChe.slugs, coChe.data, 'relatedModels', 'mech-to-model', (model, mech) => `${mech}|${model}`);

// Mẫu ↔ mẫu và cơ chế → cơ chế (nếu có): chỉ kiểm tồn tại/trùng/rỗng, không bắt buộc hai chiều.
checkTargets('mauIconic', 'relatedModels', mauIconic.data, 'mauIconic', mauIconic.slugs, mauIconic.data, 'relatedModels', 'one-way');
checkTargets('coChe', 'relatedMechanisms', coChe.data, 'coChe', coChe.slugs, coChe.data, 'relatedMechanisms', 'one-way');

console.log('KIỂM TRA LIÊN KẾT BIÊN TẬP (cơ chế ↔ mẫu iconic)');
console.log(`  Bài cơ chế (coChe/vi):        ${coChe.count}`);
console.log(`  Bài mẫu iconic (mauIconic/vi): ${mauIconic.count}`);
console.log(`  Cặp quan hệ cơ chế ↔ mẫu iconic hợp lệ hai chiều: ${pairs.size}`);

if (errors.length > 0) {
  console.error(`\nLỖI (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('\nĐẠT — không có slug hỏng, trùng lặp, thiếu relation hay thiếu chiều ngược.');
