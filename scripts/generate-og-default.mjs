// =============================================================================
// GENERATE OG DEFAULT — sinh ảnh chia sẻ mặc định public/og-default.jpg
// =============================================================================
// Chạy: npm run generate:og
//
// - Đếm số bài viết thật (.md) trong 4 collection tiếng Việt — không viết cứng.
// - Dựng SVG 1200x630 (nền graphite, line-art bộ máy tự vẽ, khối chữ bên trái
//   cách mép 72px) rồi xuất JPEG bằng sharp (librsvg render chữ bằng font hệ
//   thống hỗ trợ tiếng Việt đầy đủ).
// - Tự kiểm sau khi xuất: đúng 1200x630, dưới 300KB, độ sáng trung bình phải
//   thấp (nền tối) — nếu ảnh trắng/đơn sắc thì báo lỗi và thoát mã lỗi.
// =============================================================================

import { readdirSync, statSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'og-default.jpg');

// ----- 1. Đếm nội dung thật -------------------------------------------------
function countMd(dir) {
  const full = join(ROOT, dir);
  try {
    return readdirSync(full).filter((f) => f.endsWith('.md')).length;
  } catch {
    console.error(`Không đọc được thư mục ${dir}`);
    process.exit(1);
  }
}

const stats = {
  brands: countMd('src/content/thuongHieu/vi'),
  iconics: countMd('src/content/mauIconic/vi'),
  mechanisms: countMd('src/content/coChe/vi'),
  glossary: countMd('src/content/tuDien/vi'),
};
// Dòng số liệu tách làm 2 dòng để giữ cỡ chữ lớn (đọc được cả khi thu nhỏ 30%)
const statsLine1 = `${stats.brands} thương hiệu · ${stats.iconics} mẫu iconic`;
const statsLine2 = `${stats.mechanisms} bài cơ chế · ${stats.glossary} thuật ngữ`;

// ----- 2. Dựng SVG ----------------------------------------------------------
// Răng bánh răng: n đoạn thẳng hướng tâm quanh vành (rIn -> rOut)
function gearTeeth(cx, cy, rIn, rOut, count, offsetDeg) {
  let out = '';
  for (let i = 0; i < count; i++) {
    const a = ((i * 360) / count + offsetDeg) * (Math.PI / 180);
    const x1 = cx + Math.cos(a) * rIn, y1 = cy + Math.sin(a) * rIn;
    const x2 = cx + Math.cos(a) * rOut, y2 = cy + Math.sin(a) * rOut;
    out += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  }
  return out;
}

function buildSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- Nền than chì -->
  <rect width="1200" height="630" fill="#161B20"/>
  <!-- Khung mép hồ sơ -->
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#2A3238" stroke-width="1"/>

  <!-- Guilloché đồng tâm — góc dưới trái (brass mờ) và trên phải (trắng rất mờ) -->
  <g stroke="#8A6A35" stroke-width="1" fill="none" opacity="0.14">
    ${[40, 62, 84, 106, 128, 150, 172, 194, 216].map((r) => `<circle cx="120" cy="560" r="${r}"/>`).join('')}
  </g>
  <g stroke="#EEF0ED" stroke-width="1" fill="none" opacity="0.06">
    ${[30, 55, 80, 105, 130].map((r) => `<circle cx="1090" cy="80" r="${r}"/>`).join('')}
  </g>

  <!-- Dòng năng lượng nối trục (nét đứt brass) -->
  <path d="M 790 470 L 965 300 L 1105 445" stroke="#8A6A35" stroke-width="1.5"
        stroke-dasharray="6 9" opacity="0.55" fill="none"/>

  <!-- Bánh răng lớn (brass) -->
  <g stroke="#C9A25E" stroke-width="2.5" fill="none">
    <circle cx="965" cy="300" r="120"/>
    <circle cx="965" cy="300" r="96"/>
    <g opacity="0.8">
      <line x1="965" y1="204" x2="965" y2="396"/>
      <line x1="873.5" y1="252.9" x2="1056.5" y2="347.1"/>
      <line x1="873.5" y1="347.1" x2="1056.5" y2="252.9"/>
      <line x1="883.2" y1="226.4" x2="1046.8" y2="373.6" opacity="0.5"/>
      <line x1="883.2" y1="373.6" x2="1046.8" y2="226.4" opacity="0.5"/>
    </g>
    <circle cx="965" cy="300" r="10"/>
  </g>
  <g stroke="#C9A25E" stroke-width="2.5">${gearTeeth(965, 300, 120, 137, 20, 4)}</g>

  <!-- Bánh răng nhỏ (off-white) -->
  <g stroke="#EEF0ED" stroke-width="2" fill="none" opacity="0.85">
    <circle cx="1105" cy="445" r="55"/>
    <circle cx="1105" cy="445" r="42"/>
    <line x1="1105" y1="403" x2="1105" y2="487"/>
    <line x1="1063" y1="445" x2="1147" y2="445"/>
    <circle cx="1105" cy="445" r="6"/>
  </g>
  <g stroke="#EEF0ED" stroke-width="2" opacity="0.85">${gearTeeth(1105, 445, 55, 67, 12, 8)}</g>

  <!-- Bánh lắc (brass) + dây tóc (blued steel) -->
  <g stroke="#C9A25E" stroke-width="2.5" fill="none">
    <circle cx="790" cy="470" r="48"/>
    <line x1="742" y1="470" x2="838" y2="470"/>
    <line x1="790" y1="422" x2="790" y2="518"/>
    <circle cx="790" cy="470" r="6" fill="#161B20"/>
  </g>
  <g fill="#C9A25E">
    <circle cx="790" cy="422" r="3.5"/><circle cx="838" cy="470" r="3.5"/>
    <circle cx="790" cy="518" r="3.5"/><circle cx="742" cy="470" r="3.5"/>
  </g>
  <path d="M 790 470 m -8 0 a 8 8 0 1 1 16 0 a 12 12 0 1 1 -24 0 a 17 17 0 1 1 34 0"
        stroke="#8BB2DA" stroke-width="1.5" fill="none" opacity="0.9"/>

  <!-- Jewel ruby tại 3 trục -->
  <circle cx="965" cy="300" r="5" fill="#A33A3A" stroke="#C97676" stroke-width="1"/>
  <circle cx="1105" cy="445" r="4" fill="#A33A3A" stroke="#C97676" stroke-width="1"/>
  <circle cx="790" cy="470" r="4" fill="#A33A3A" stroke="#C97676" stroke-width="1"/>

  <!-- Thang vạch kỹ thuật bên phải trong khung -->
  <g stroke="#EEF0ED" stroke-width="1" opacity="0.25">
    <line x1="1128" y1="140" x2="1140" y2="140"/><line x1="1132" y1="170" x2="1140" y2="170"/>
    <line x1="1128" y1="200" x2="1140" y2="200"/><line x1="1132" y1="230" x2="1140" y2="230"/>
    <line x1="1128" y1="260" x2="1140" y2="260"/>
  </g>

  <!-- ===== Khối chữ — cách mép trái 72px, vùng an toàn trung tâm ===== -->
  <rect x="72" y="150" width="56" height="4" fill="#C9A25E"/>
  <text x="72" y="240" font-family="Times New Roman, Georgia, serif" font-weight="700"
        font-size="76" letter-spacing="4" fill="#EEF0ED">ĐỒNG HỒ CƠ</text>
  <text x="72" y="296" font-family="Arial, Helvetica, sans-serif" font-size="27"
        fill="#B7C0C6">Nền tảng nội dung tiếng Việt</text>
  <text x="72" y="332" font-family="Arial, Helvetica, sans-serif" font-size="27"
        fill="#B7C0C6">chuyên sâu về đồng hồ cơ</text>
  <text x="72" y="382" font-family="Arial, Helvetica, sans-serif" font-weight="700"
        font-size="30" letter-spacing="0.5" fill="#D0B27B">${statsLine1}</text>
  <text x="72" y="420" font-family="Arial, Helvetica, sans-serif" font-weight="700"
        font-size="30" letter-spacing="0.5" fill="#D0B27B">${statsLine2}</text>
  <text x="72" y="474" font-family="Arial, Helvetica, sans-serif" font-size="26"
        letter-spacing="1" fill="#8BB2DA">kienthucdonghoco.vn</text>
</svg>`;
}

// ----- 3. Xuất JPEG + tự kiểm ----------------------------------------------
async function main() {
  const svg = Buffer.from(buildSvg());

  await sharp(svg)
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(OUT);

  // Đọc lại để kiểm: kích thước, dung lượng, độ sáng (chống ảnh trắng/trống)
  const meta = await sharp(OUT).metadata();
  const { channels } = await sharp(OUT).stats();
  const brightness = (channels[0].mean + channels[1].mean + channels[2].mean) / 3;
  const bytes = statSync(OUT).size;

  const problems = [];
  if (meta.width !== 1200 || meta.height !== 630) {
    problems.push(`kích thước ${meta.width}x${meta.height} != 1200x630`);
  }
  if (bytes > 300 * 1024) {
    problems.push(`dung lượng ${Math.round(bytes / 1024)}KB > 300KB`);
  }
  // Nền graphite #161B20 phải cho brightness ~30; ảnh trắng sẽ > 200
  if (brightness > 120) {
    problems.push(`ảnh quá sáng (mean ${brightness.toFixed(0)}) — nghi ngờ ảnh trắng/trống`);
  }

  console.log('Số liệu đưa vào ảnh :', `${statsLine1} · ${statsLine2}`);
  console.log('File                :', OUT.replace(ROOT + '\\', '').replace(ROOT + '/', ''));
  console.log('Kích thước          :', `${meta.width}x${meta.height}`);
  console.log('Dung lượng          :', `${Math.round(bytes / 1024)}KB`);
  console.log('Độ sáng trung bình  :', brightness.toFixed(1), '(nền tối)');

  if (problems.length > 0) {
    console.error('LỖI NGHIỆM THU:', problems.join('; '));
    process.exit(1);
  }
  console.log('OK: ảnh OG mặc định đã sinh hợp lệ.');
}

main().catch((e) => {
  console.error('Lỗi sinh ảnh:', e);
  process.exit(1);
});
