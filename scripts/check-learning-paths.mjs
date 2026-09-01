// =============================================================================
// check-learning-paths.mjs — Kiểm dữ liệu trang hub "Lộ trình học đồng hồ cơ"
// =============================================================================
// Chạy: node scripts/check-learning-paths.mjs (hoặc qua `npm run check`)
//
// Đọc src/data/learningPaths.ts (nguồn dữ liệu duy nhất của trang hub) và kiểm:
//   1. Có đúng 3 lộ trình tiếng Việt.
//   2. Mỗi lộ trình có từ 5 bước trở lên.
//   3. Không có URL bước bị trùng trong cùng một lộ trình.
//   4. Mỗi URL nội bộ có dạng hợp lệ và tồn tại trong tập route nội dung
//      (trang tĩnh trong src/pages hoặc slug bài trong các bộ sưu tập).
//   5. Mỗi bước có nhãn và mô tả (why) không rỗng.
//   6. Không có URL ngoài trong dữ liệu lộ trình.
//
// In báo cáo ngắn và exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DATA_FILE = 'src/data/learningPaths.ts';
const PAGES_DIR = 'src/pages';

// Bộ sưu tập nội dung: đường dẫn cấp 1 → thư mục frontmatter tiếng Việt
const COLLECTIONS = {
  'co-che': 'coChe',
  'huong-dan': 'huongDan',
  'mau-iconic': 'mauIconic',
  'tu-dien': 'tuDien',
  'thuong-hieu': 'thuongHieu',
};

const errors = [];

// ===== Phân tích tệp dữ liệu =====
const source = readFileSync(DATA_FILE, 'utf8');

// Tách từng khối lộ trình: bắt đầu bằng "id: '...'," và kết thúc trước id kế hoặc cuối mảng
const pathBlocks = [...source.matchAll(/\{\s*\n\s*id:\s*'([^']+)'/g)].map((m) => m[1]);
const bodyParts = source.split(/\{\s*\n\s*id:\s*'/).slice(1);

function getStr(text, key) {
  const m = text.match(new RegExp(`${key}:\\s*'([^']*)'`));
  return m ? m[1] : undefined;
}

const paths = bodyParts.map((body) => {
  const id = body.slice(0, body.indexOf("'"));
  const stepsBlock = body.slice(body.indexOf('steps: ['));
  const stepTexts = stepsBlock.split(/\{\s*\n\s*href:\s*'/).slice(1);
  const steps = stepTexts.map((st) => ({
    href: st.slice(0, st.indexOf("'")),
    label: getStr(st, 'label'),
    why: getStr(st, 'why'),
  }));
  return { id, steps };
});

// ===== 1. Đúng 3 lộ trình =====
if (paths.length !== 3) {
  errors.push(`Số lộ trình là ${paths.length} — phải đúng 3 lộ trình tiếng Việt`);
}
const ids = new Set();
for (const p of paths) {
  if (ids.has(p.id)) errors.push(`Trùng id lộ trình: ${p.id}`);
  ids.add(p.id);
}

// ===== Route nội bộ: trang tĩnh hoặc slug trong bộ sưu tập =====
function pageExists(route) {
  const clean = route.replace(/^\//, '');
  const asFile = join(PAGES_DIR, `${clean}.astro`);
  const asDir = join(PAGES_DIR, clean, 'index.astro');
  return existsSync(asFile) || existsSync(asDir);
}

function collectionHasSlug(dir, slug) {
  const file = join('src/content', dir, 'vi', `${slug}.md`);
  return existsSync(file) && statSync(file).isFile();
}

function routeExists(href) {
  if (!href.startsWith('/') || href.startsWith('//')) return false;
  const parts = href.replace(/^\//, '').replace(/\/$/, '').split('/');
  if (parts.length === 1) return pageExists(href);
  if (parts.length === 2 && COLLECTIONS[parts[0]]) {
    return collectionHasSlug(COLLECTIONS[parts[0]], parts[1]);
  }
  return false;
}

// ===== Kiểm từng lộ trình =====
for (const p of paths) {
  if (p.steps.length < 5) {
    errors.push(`Lộ trình "${p.id}" chỉ có ${p.steps.length} bước — tối thiểu 5`);
  }

  const seen = new Set();
  p.steps.forEach((s, i) => {
    const at = `lộ trình "${p.id}" · bước ${i + 1}`;

    if (!s.href) {
      errors.push(`${at}: thiếu href`);
    } else if (/^(https?:)?\/\//i.test(s.href)) {
      errors.push(`${at}: dữ liệu lộ trình không được chứa URL ngoài (${s.href})`);
    } else if (!s.href.startsWith('/') || /\s/.test(s.href)) {
      errors.push(`${at}: href không đúng dạng đường dẫn nội bộ (${s.href})`);
    } else if (!routeExists(s.href)) {
      errors.push(`${at}: route không tồn tại trong nội dung hiện có (${s.href})`);
    }

    if (seen.has(s.href) && s.href) {
      errors.push(`${at}: URL bị trùng trong cùng lộ trình (${s.href})`);
    }
    if (s.href) seen.add(s.href);

    if (s.label === undefined || s.label.trim() === '') errors.push(`${at}: nhãn (label) rỗng hoặc thiếu`);
    if (s.why === undefined || s.why.trim() === '') errors.push(`${at}: mô tả (why) rỗng hoặc thiếu`);
  });
}

if (errors.length > 0) {
  console.log('KIỂM TRA LỘ TRÌNH HỌC — CÓ LỖI:');
  for (const e of errors) console.log(`  LỖI  ${e}`);
  process.exit(1);
}

const totalSteps = paths.reduce((n, p) => n + p.steps.length, 0);
console.log('Lộ trình học hợp lệ:');
for (const p of paths) console.log(`  - ${p.id}: ${p.steps.length} bước`);
console.log(`  Tổng: ${paths.length} lộ trình, ${totalSteps} bước — mọi route nội bộ đều tồn tại.`);
