// =============================================================================
// check-evolution-routes.mjs — Kiểm route Submariner render sơ đồ tiến hóa
// =============================================================================
// Tiêu chí 9 của Prompt 31, tách khỏi check-evolution-data.mjs vì phải chạy
// SAU build (npm run check chạy trước astro build — nhìn dist cũ sẽ báo sai).
//
// Kiểm trên dist/:
//   - /mau-iconic/rolex-submariner/ và /en/iconic-watches/rolex-submariner/
//     đều tồn tại và render sơ đồ tiến hóa (data-evolution);
//   - bản VI có nhãn "Xem nguồn", bản EN có nhãn "View source";
//   - bản EN timeline không còn chữ tiếng Việt; bản VI có đủ 8 mốc.
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const VI_ROUTE = join('dist', 'mau-iconic', 'rolex-submariner', 'index.html');
const EN_ROUTE = join('dist', 'en', 'iconic-watches', 'rolex-submariner', 'index.html');

const errors = [];
const report = [];

if (!existsSync(VI_ROUTE)) {
  errors.push('dist thiếu /mau-iconic/rolex-submariner/ — hãy chạy npm run build trước');
} else if (!existsSync(EN_ROUTE)) {
  errors.push('dist thiếu /en/iconic-watches/rolex-submariner/ — hãy chạy npm run build trước');
} else {
  const vi = readFileSync(VI_ROUTE, 'utf8');
  const en = readFileSync(EN_ROUTE, 'utf8');

  for (const [name, html] of [['VI', vi], ['EN', en]]) {
    if (!html.includes('data-evolution')) errors.push(`Route ${name} Submariner không render sơ đồ tiến hóa`);
  }

  if (!/Xem nguồn/.test(vi)) errors.push('Route VI timeline thiếu nhãn "Xem nguồn"');
  else report.push('Route VI: timeline render, nhãn "Xem nguồn" có mặt');

  if (!/View source/.test(en)) errors.push('Route EN timeline thiếu nhãn "View source"');
  else report.push('Route EN: timeline render, nhãn "View source" có mặt');

  // Bản EN timeline không còn chữ tiếng Việt: trích khối data-evolution rồi
  // tìm ký tự tiếng Việt có dấu (nhãn mốc EN là tiếng Anh thuần).
  const enBlock = en.match(/<section[^>]*data-evolution[\s\S]*?<\/section>/)?.[0] ?? '';
  const viCharRe = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/;
  if (enBlock && viCharRe.test(enBlock.replace(/<[^>]*>/g, ' '))) {
    const sample = (enBlock.match(/[^\s<>]*[ăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụ][^\s<>]*/i) ?? ['?'])[0];
    errors.push(`Route EN timeline còn văn bản tiếng Việt (từ mẫu: "${sample}")`);
  } else if (enBlock) {
    report.push('Route EN: khối timeline không còn văn bản tiếng Việt');
  }

  // Đủ 8 mốc trên mỗi bản (nút mốc)
  const viMilestones = (vi.match(/class="evol-btn/g) ?? []).length;
  const enMilestones = (en.match(/class="evol-btn/g) ?? []).length;
  if (viMilestones !== 8) errors.push(`Route VI timeline có ${viMilestones} mốc (kỳ vọng 8)`);
  if (enMilestones !== 8) errors.push(`Route EN timeline có ${enMilestones} mốc (kỳ vọng 8)`);
  if (viMilestones === 8 && enMilestones === 8) report.push('Cả hai bản: đủ 8 mốc');
}

if (errors.length > 0) {
  console.log('KIỂM TRA ROUTE SƠ ĐỒ TIẾN HÓA SUBMARINER — CÓ LỖI:');
  for (const e of errors) console.log(`  LỖI  ${e}`);
  process.exit(1);
}

console.log('KIỂM TRA ROUTE SƠ ĐỒ TIẾN HÓA SUBMARINER:');
for (const line of report) console.log(`  ${line}`);
console.log('  KẾT LUẬN: ĐẠT — cả hai route render đúng timeline theo ngôn ngữ.');
