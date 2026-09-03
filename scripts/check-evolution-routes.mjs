// =============================================================================
// check-evolution-routes.mjs — Kiểm route sơ đồ tiến hóa trong dist (song ngữ)
// =============================================================================
// Tiêu chí route của Prompt 31/32, chạy SAU build (npm run check chạy trước
// astro build — nhìn dist cũ sẽ báo sai). Script nằm trong chuỗi npm run build
// và có thể chạy lại riêng.
//
// Nguyên tắc kiến trúc i18n (Prompt 32 — sửa nghiệm thu):
//   - Một bài English có thể tồn tại đầy đủ dù timeline của nó chưa được dịch.
//   - Dataset `publishedLangs: ['vi']` là TRẠNG THÁI HỢP LỆ: component ẩn
//     timeline ở route English — script chỉ ghi rõ "chỉ VI, bỏ qua kiểm
//     English" và KHÔNG kiểm sự tồn tại/không tồn tại của route English trong
//     trường hợp này (bài English tồn tại hay không đều không phải lỗi của
//     sơ đồ).
//   - Dataset có 'en' trong publishedLangs: bắt buộc đủ route VI + EN, render
//     data-evolution, nhãn nguồn theo ngôn ngữ, không rò tiếng Việt ở khối
//     timeline EN, số nút mốc hai ngôn ngữ bằng nhau và đúng dataset.
//
// Nguồn sự thật: quét src/data/*.Evolution.ts (bỏ tệp hạ tầng), đọc slug +
// publishedLangs + số mốc của từng dataset. Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DATA_DIR = 'src/data';
const SKIP_FILES = new Set(['modelEvolution.ts', 'learningPaths.ts', 'decisionMaps.ts']);
// Toàn bộ dataset sơ đồ tiến hóa hiện gắn với bài mẫu iconic (collection mauIconic)
const VI_PREFIX = join('dist', 'mau-iconic');
const EN_PREFIX = join('dist', 'en', 'iconic-watches');

const errors = [];
const report = [];

function parseDataset(source) {
  const slug = source.match(/slug:\s*['"]([^'"]+)['"]/)?.[1];
  const langs = source.match(/publishedLangs:\s*\[([^\]]*)\]/)?.[1]
    ?? '';
  const publishedLangs = langs.split(',').map((s) => s.trim().replace(/['"]/g, '')).filter(Boolean);
  const milestoneCount = (source.match(/year:\s*\d+/g) ?? []).length;
  return { slug, publishedLangs, milestoneCount };
}

if (!existsSync('dist')) {
  console.log('KIỂM TRA ROUTE SƠ ĐỒ TIẾN HÓA: dist chưa tồn tại — hãy chạy npm run build trước.');
  process.exit(1);
}

const datasets = readdirSync(DATA_DIR)
  .filter((f) => f.endsWith('.ts') && !SKIP_FILES.has(f))
  .sort();

for (const file of datasets) {
  const source = readFileSync(join(DATA_DIR, file), 'utf8');
  const { slug, publishedLangs, milestoneCount } = parseDataset(source);
  if (!slug || milestoneCount === 0) continue; // không phải dataset sơ đồ

  const viPath = join(VI_PREFIX, slug, 'index.html');
  const enPath = join(EN_PREFIX, slug, 'index.html');
  const label = `${slug} (${publishedLangs.join('+')}, ${milestoneCount} mốc)`;

  if (!publishedLangs.includes('en')) {
    // Trạng thái hợp lệ: timeline chỉ tiếng Việt — component tự ẩn ở route
    // English. KHÔNG kiểm sự tồn tại/không tồn tại của route English ở đây:
    // bài English có thể tồn tại đầy đủ mà timeline chưa dịch.
    report.push(`- ${label}: chỉ VI — bỏ qua kiểm timeline English`);
    if (!existsSync(viPath)) {
      errors.push(`${slug}: dist thiếu route Việt ${viPath}`);
    } else if (!readFileSync(viPath, 'utf8').includes('data-evolution')) {
      errors.push(`${slug}: route VI không render sơ đồ tiến hóa`);
    }
    continue;
  }

  // ===== Route VI + EN tồn tại =====
  if (!existsSync(viPath)) {
    errors.push(`${slug}: dist thiếu route Việt ${viPath}`);
    continue;
  }
  if (!existsSync(enPath)) {
    errors.push(`${slug}: dist thiếu route English ${enPath}`);
    continue;
  }
  const vi = readFileSync(viPath, 'utf8');
  const en = readFileSync(enPath, 'utf8');

  // ===== Cả hai render timeline =====
  for (const [name, html] of [['VI', vi], ['EN', en]]) {
    if (!html.includes('data-evolution')) errors.push(`${slug}: route ${name} không render sơ đồ tiến hóa`);
  }

  // ===== Nhãn nguồn theo ngôn ngữ =====
  if (!/Xem nguồn/.test(vi)) errors.push(`${slug}: timeline VI thiếu nhãn "Xem nguồn"`);
  if (!/View source/.test(en)) errors.push(`${slug}: timeline EN thiếu nhãn "View source"`);

  // ===== Timeline EN không còn văn bản tiếng Việt =====
  const enBlock = en.match(/<section[^>]*data-evolution[\s\S]*?<\/section>/)?.[0] ?? '';
  const viCharRe = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/;
  if (enBlock && viCharRe.test(enBlock.replace(/<[^>]*>/g, ' '))) {
    const sample = (enBlock.match(/[^\s<>]*[ăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụ][^\s<>]*/i) ?? ['?'])[0];
    errors.push(`${slug}: timeline EN còn văn bản tiếng Việt (từ mẫu: "${sample}")`);
  }

  // ===== Số nút mốc hai ngôn ngữ bằng nhau và đúng dataset =====
  const viBtns = (vi.match(/class="evol-btn/g) ?? []).length;
  const enBtns = (en.match(/class="evol-btn/g) ?? []).length;
  if (viBtns !== milestoneCount) errors.push(`${slug}: timeline VI có ${viBtns} mốc (dataset: ${milestoneCount})`);
  if (enBtns !== milestoneCount) errors.push(`${slug}: timeline EN có ${enBtns} mốc (dataset: ${milestoneCount})`);
  if (viBtns !== enBtns) errors.push(`${slug}: số mốc VI (${viBtns}) ≠ EN (${enBtns})`);

  report.push(`- ${label}: VI ${viBtns} mốc · EN ${enBtns} mốc — khớp dataset`);
}

if (errors.length > 0) {
  console.log('KIỂM TRA ROUTE SƠ ĐỒ TIẾN HÓA — CÓ LỖI:');
  for (const e of errors) console.log(`  LỖI  ${e}`);
  process.exit(1);
}

console.log('KIỂM TRA ROUTE SƠ ĐỒ TIẾN HÓA (theo publishedLangs):');
for (const line of report) console.log(`  ${line}`);
console.log('  KẾT LUẬN: ĐẠT — mọi dataset song ngữ render đúng route, ngôn ngữ và số mốc.');
