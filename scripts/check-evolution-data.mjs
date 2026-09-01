// =============================================================================
// check-evolution-data.mjs — Kiểm dữ liệu các sơ đồ tiến hóa mẫu iconic
// =============================================================================
// Chạy: node scripts/check-evolution-data.mjs (hoặc qua `npm run check`)
//
// Quét mọi tệp dataset trong src/data/ (trừ modelEvolution.ts — tệp hạ tầng),
// phân tích các mốc và kiểm:
//   - mỗi mốc đủ year, reference, label, change, note, sourceUrl, sourceName;
//   - year là số hợp lệ;
//   - các mốc theo thứ tự thời gian tăng dần;
//   - không trùng tổ hợp năm + reference;
//   - URL nguồn dùng HTTPS;
//   - không có chuỗi rỗng;
//   - mỗi dataset có ít nhất 3 mốc.
// Ngoài ra kiểm component ModelEvolution.astro không chứa dữ kiện cứng
// (dữ liệu chỉ được nằm ở các tệp dataset).
//
// In báo cáo ngắn và exit 1 nếu có lỗi.
// =============================================================================

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DATA_DIR = 'src/data';
// Tệp hạ tầng và dataset thuộc script kiểm khác — không phải dataset sơ đồ tiến hóa
const SKIP_FILES = new Set(['modelEvolution.ts', 'learningPaths.ts']);

const REQUIRED_STRINGS = ['reference', 'label', 'change', 'note', 'sourceUrl', 'sourceName'];
const MILESTONE_MIN = 3;

const errors = [];
const report = [];

function parseMilestones(source) {
  // Lấy nội dung khối milestones: [ ... ]; rồi tách từng object cấp 1.
  const m = source.match(/milestones:\s*\[([\s\S]*?)\]\s*,?\s*\n\}/);
  if (!m) return null;
  const body = m[1];
  const milestones = [];
  // Mỗi mốc bắt đầu bằng dòng "year:" — cắt theo ranh giới đó.
  const parts = body.split(/\n\s*\{\s*\n/).slice(1);
  for (const part of parts) {
    const getStr = (key) => {
      const km = part.match(new RegExp(`${key}:\\s*['\`]([^'\`]*)['\`]`)) || part.match(new RegExp(`${key}:\\s*"([^"]*)"`));
      return km ? km[1] : undefined;
    };
    const getY = part.match(/year:\s*(\d+)/);
    milestones.push({
      year: getY ? Number(getY[1]) : undefined,
      rawYear: getY ? getY[1] : undefined,
      reference: getStr('reference'),
      label: getStr('label'),
      change: getStr('change'),
      note: getStr('note'),
      sourceUrl: getStr('sourceUrl'),
      sourceName: getStr('sourceName'),
    });
  }
  return milestones;
}

function parseDatasetMeta(source) {
  const slug = source.match(/slug:\s*['"]([^'"]+)['"]/);
  const name = source.match(/\bname:\s*['"]([^'"]+)['"]/);
  const title = source.match(/title:\s*['"]([^'"]+)['"]/);
  return {
    slug: slug ? slug[1] : undefined,
    name: name ? name[1] : undefined,
    title: title ? title[1] : undefined,
  };
}

for (const file of readdirSync(DATA_DIR).sort()) {
  if (!file.endsWith('.ts') || SKIP_FILES.has(file)) continue;
  const path = join(DATA_DIR, file);
  const source = readFileSync(path, 'utf8');
  const meta = parseDatasetMeta(source);
  const label = meta.name || file;
  const milestones = parseMilestones(source);

  if (!meta.slug) {
    errors.push(`${file}: không tìm thấy trường slug của dataset`);
    continue;
  }
  if (!milestones) {
    errors.push(`${file}: không phân tích được khối milestones`);
    continue;
  }
  if (milestones.length < MILESTONE_MIN) {
    errors.push(`${file}: dataset chỉ có ${milestones.length} mốc (tối thiểu ${MILESTONE_MIN})`);
  }

  const seen = new Set();
  let prevYear = -Infinity;
  milestones.forEach((m, i) => {
    const at = `${file} · mốc #${i + 1}`;
    if (m.rawYear === undefined || !Number.isInteger(m.year) || m.year < 1000 || m.year > 2999) {
      errors.push(`${at}: year thiếu hoặc không phải số hợp lệ`);
    } else {
      if (m.year < prevYear) errors.push(`${at}: năm ${m.year} đứng sau mốc ${prevYear} — thứ tự thời gian tăng dần bị phá`);
      prevYear = m.year;
    }
    for (const key of REQUIRED_STRINGS) {
      const v = m[key];
      if (v === undefined) errors.push(`${at}: thiếu trường ${key}`);
      else if (String(v).trim() === '') errors.push(`${at}: trường ${key} rỗng`);
    }
    if (m.sourceUrl !== undefined && !/^https:\/\//.test(m.sourceUrl)) {
      errors.push(`${at}: sourceUrl phải dùng HTTPS (đang: ${m.sourceUrl})`);
    }
    const combo = `${m.year}|${m.reference}`;
    if (m.reference !== undefined && seen.has(combo)) {
      errors.push(`${at}: trùng tổ hợp năm + reference (${combo})`);
    }
    if (m.reference !== undefined) seen.add(combo);
  });

  report.push(`- ${label}: ${milestones.length} mốc`);
}

// Dữ liệu chỉ nằm ở tệp dataset — component không được chép cứng mốc nào.
const componentPath = 'src/components/ModelEvolution.astro';
const componentSource = readFileSync(componentPath, 'utf8');
if (/\byear\s*:|\bsourceUrl\s*:/.test(componentSource)) {
  errors.push(`${componentPath}: phát hiện dữ kiện cứng (year:/sourceUrl:) — dữ liệu chỉ được nằm ở tệp dataset`);
}

if (errors.length > 0) {
  console.log('KIỂM TRA DỮ LIỆU SƠ ĐỒ TIẾN HÓA — CÓ LỖI:');
  for (const e of errors) console.log(`  LỖI  ${e}`);
  process.exit(1);
}

console.log('Sơ đồ tiến hóa hợp lệ:');
for (const line of report) console.log(`  ${line}`);
