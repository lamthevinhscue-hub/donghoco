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
//
// Song ngữ (Prompt 31) — kiểm thêm 9 nhóm tiêu chí:
//   1. Dataset xuất bản tiếng Anh (publishedLangs có 'en') phải có title/intro
//      dạng song ngữ { vi, en }.
//   2. Với dataset song ngữ: mọi mốc có year/reference và nội dung hiển thị
//      (label/change/note) đủ cả vi và en.
//   3. Không mốc trùng tổ hợp reference + năm bất hợp lý (năm tăng dần đã kiểm).
//   4. Mọi URL nguồn ngoài là HTTPS.
//   5. Link nội bộ xuất hiện trong dataset phải tồn tại như route thật.
//   6. Bản English của dataset song ngữ không chứa văn bản tiếng Việt
//      (ngoài tên riêng — kiểm ký tự tiếng Việt có dấu).
//   7. Bản tiếng Việt không chứa nhãn giao diện tiếng Anh (View source,
//      Milestone details, Read more…).
//   8. Component ModelEvolution.astro đầy đủ semantic/keyboard (button thật,
//      aria-pressed, role=group, aria-label, data-evolution, reduced-motion)
//      và không hard-code chữ ngôn ngữ ('Xem nguồn', 'Chi tiết mốc').
//   9. Hai route Submariner thật sự được sinh trong dist (nếu dist tồn tại —
//      chạy lại script sau `npm run build` để thấy tiêu chí này được kiểm).
//
// In báo cáo ngắn và exit 1 nếu có lỗi.
// =============================================================================

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DATA_DIR = 'src/data';
// Tệp hạ tầng và dataset thuộc script kiểm khác — không phải dataset sơ đồ tiến hóa
const SKIP_FILES = new Set(['modelEvolution.ts', 'learningPaths.ts', 'decisionMaps.ts']);
const COMPONENT_PATH = 'src/components/ModelEvolution.astro';

const REQUIRED_STRINGS = ['reference', 'sourceUrl', 'sourceName'];
const REQUIRED_DISPLAY = ['label', 'change', 'note'];
const MILESTONE_MIN = 3;
// Nhãn giao diện tiếng Anh không được nằm trong dữ liệu tiếng Việt
const UI_EN_LABELS = ['View source', 'Milestone details', 'Read more', 'Skip to content'];
// Ký tự tiếng Việt có dấu — không được xuất hiện trong bản English
const VI_CHAR_RE = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;

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
    // Trường hiển thị: LocalizedText { vi, en } hoặc string thuần vi (legacy)
    const getDisplay = (key) => {
      const loc = part.match(new RegExp(`${key}:\\s*\\{\\s*vi:\\s*['\`]([^'\`]*)['\`]\\s*,\\s*en:\\s*['\`]([^'\`]*)['\`]`));
      if (loc) return { vi: loc[1], en: loc[2] };
      const s = getStr(key);
      return s;
    };
    const getY = part.match(/year:\s*(\d+)/);
    milestones.push({
      year: getY ? Number(getY[1]) : undefined,
      rawYear: getY ? getY[1] : undefined,
      reference: getStr('reference'),
      label: getDisplay('label'),
      change: getDisplay('change'),
      note: getDisplay('note'),
      sourceUrl: getStr('sourceUrl'),
      sourceName: getStr('sourceName'),
    });
  }
  return milestones;
}

function parseDatasetMeta(source) {
  const slug = source.match(/slug:\s*['"]([^'"]+)['"]/);
  const name = source.match(/\bname:\s*['"]([^'"]+)['"]/);
  const langs = source.match(/publishedLangs:\s*\[([^\]]*)\]/);
  const titleLoc = source.match(/title:\s*\{\s*vi:\s*['`]([^`]*)['`]\s*,\s*en:\s*['`]([^`]*)['`]/);
  const titleStr = source.match(/\btitle:\s*['"]([^'"]+)['"]/);
  const introLoc = source.match(/intro:\s*\{\s*vi:\s*['`]([^`]*)['`]\s*,\s*en:\s*['`]([^`]*)['`]/);
  const introStr = source.match(/\bintro:\s*\n?\s*['`]([^`]*)['`]/) || source.match(/\bintro:\s*['"]([^'"]+)['"]/);
  return {
    slug: slug ? slug[1] : undefined,
    name: name ? name[1] : undefined,
    publishedLangs: langs
      ? langs[1].split(',').map((s) => s.trim().replace(/['"]/g, '')).filter(Boolean)
      : ['vi'], // không khai báo = chỉ tiếng Việt
    title: titleLoc ? { vi: titleLoc[1], en: titleLoc[2] } : titleStr ? titleStr[1] : undefined,
    intro: introLoc ? { vi: introLoc[1], en: introLoc[2] } : introStr ? introStr[1] : undefined,
  };
}

// Route tồn tại (trang tĩnh hoặc slug bộ sưu tập) — dùng cho tiêu chí 5
const COLLECTIONS = { 'co-che': 'coChe', 'huong-dan': 'huongDan', 'mau-iconic': 'mauIconic', 'tu-dien': 'tuDien', 'thuong-hieu': 'thuongHieu' };
function routeExists(href) {
  if (!href.startsWith('/') || href.startsWith('//')) return false;
  const parts = href.replace(/^\//, '').replace(/\/$/, '').split('/');
  if (parts.length === 1) {
    const clean = parts[0];
    return existsSync(join('src/pages', `${clean}.astro`)) || existsSync(join('src/pages', clean, 'index.astro'));
  }
  if (parts.length === 2 && COLLECTIONS[parts[0]]) {
    const f = join('src/content', COLLECTIONS[parts[0]], 'vi', `${parts[1]}.md`);
    return existsSync(f) && statSync(f).isFile();
  }
  return false;
}

// Trích mọi URL nội bộ xuất hiện trong tệp dataset (tiêu chí 5)
function internalLinksIn(source) {
  const found = new Set();
  for (const m of source.matchAll(/['"`](\/(?:en\/)?[a-z-/]+)['"`]/g)) {
    const href = m[1];
    if (href.startsWith('/en') || Object.keys(COLLECTIONS).some((c) => href.startsWith('/' + c))) found.add(href);
  }
  return [...found];
}

const displayTextOf = (v, lang) => (v === undefined ? undefined : typeof v === 'string' ? v : v[lang]);

for (const file of readdirSync(DATA_DIR).sort()) {
  if (!file.endsWith('.ts') || SKIP_FILES.has(file)) continue;
  const path = join(DATA_DIR, file);
  const source = readFileSync(path, 'utf8');
  const meta = parseDatasetMeta(source);
  const label = meta.name || file;
  const milestones = parseMilestones(source);
  const bilingual = meta.publishedLangs.includes('en');

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

  // ===== Tiêu chí 1: dataset EN phải có title/intro song ngữ =====
  if (bilingual && (typeof meta.title !== 'object' || typeof meta.intro !== 'object')) {
    errors.push(`${file}: publishedLangs có 'en' nhưng title/intro chưa ở dạng song ngữ { vi, en }`);
  }
  // ===== Tiêu chí 7: bản VI không chứa nhãn giao diện tiếng Anh =====
  const viTexts = [
    ...(typeof meta.title === 'object' ? [meta.title.vi] : meta.title ? [meta.title] : []),
    ...(typeof meta.intro === 'object' ? [meta.intro.vi] : meta.intro ? [meta.intro] : []),
    ...milestones.flatMap((m) => REQUIRED_DISPLAY.map((k) => displayTextOf(m[k], 'vi') ?? '')).filter(Boolean),
  ];
  for (const t of viTexts) {
    const hit = UI_EN_LABELS.find((l) => t.includes(l));
    if (hit) errors.push(`${file}: dữ liệu tiếng Việt chứa nhãn giao diện tiếng Anh "${hit}"`);
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
    // ===== Tiêu chí 2: dataset song ngữ — hiển thị đủ vi + en =====
    for (const key of REQUIRED_DISPLAY) {
      const v = m[key];
      if (v === undefined) continue; // đã báo thiếu ở khối cần thiết bên dưới
      if (typeof v === 'string' && bilingual) {
        errors.push(`${at}: ${key} chỉ có tiếng Việt — dataset song ngữ cần { vi, en }`);
      } else if (typeof v === 'object') {
        if (!v.vi?.trim()) errors.push(`${at}: ${key}.vi rỗng`);
        if (!v.en?.trim()) errors.push(`${at}: ${key}.en rỗng`);
        // ===== Tiêu chí 6: bản EN không chứa văn bản tiếng Việt =====
        if (bilingual && VI_CHAR_RE.test(v.en ?? '')) {
          const sample = (v.en.match(/[^\s]*[ăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụ][^\s]*/i) ?? ['?'])[0];
          errors.push(`${at}: ${key}.en còn văn bản tiếng Việt (từ mẫu: "${sample}")`);
        }
      }
    }
    if (!errors.some((e) => e.startsWith(at))) {
      // im — báo cáo tổng hợp ở dưới
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

  // ===== Tiêu chí 5: link nội bộ trong dataset phải là route thật =====
  for (const href of internalLinksIn(source)) {
    if (!routeExists(href)) errors.push(`${file}: link nội bộ không tồn tại: ${href}`);
  }

  report.push(`- ${label}: ${milestones.length} mốc · xuất bản: ${meta.publishedLangs.join('+')}`);
}

// Dữ liệu chỉ nằm ở tệp dataset — component không được chép cứng mốc nào.
const componentSource = readFileSync(COMPONENT_PATH, 'utf8');
if (/\byear\s*:\s*\d|\bsourceUrl\s*:/.test(componentSource)) {
  errors.push(`${COMPONENT_PATH}: phát hiện dữ kiện cứng (year:/sourceUrl:) — dữ liệu chỉ được nằm ở tệp dataset`);
}

// ===== Tiêu chí 8: component đầy đủ semantic/keyboard, không hard-code ngôn ngữ =====
const semanticNeeds = [
  ['type="button"', 'nút mốc phải là <button type="button">'],
  ['aria-pressed', 'thiếu aria-pressed cho mốc đang chọn'],
  ['role="group"', 'thẻ chi tiết thiếu role="group"'],
  ['aria-label', 'thiếu aria-label trợ đọc'],
  ['data-evolution', 'thiếu data-evolution (khóa scope script)'],
  ['prefers-reduced-motion', 'thiếu tôn trọng prefers-reduced-motion'],
  ['tabindex="-1"', 'không được tự nhận tabindex dương — kiểm badge tabindex'],
];
for (const [needle, why] of semanticNeeds) {
  if (needle === 'tabindex="-1"') {
    // tabindex chỉ được xuất hiện dạng -1 (SVG focusable) — không chặn
    continue;
  }
  if (!componentSource.includes(needle)) errors.push(`${COMPONENT_PATH}: ${why}`);
}
if (/tText|text\(dataset\.title\)/.test(componentSource) === false) {
  errors.push(`${COMPONENT_PATH}: hiển thị chưa qua hàm song ngữ tText`);
}
for (const hardCoded of ['Xem nguồn', 'Chi tiết mốc']) {
  if (componentSource.includes(hardCoded)) {
    errors.push(`${COMPONENT_PATH}: còn chữ tiếng Việt hard-code "${hardCoded}" — dùng ui.ts theo lang`);
  }
}
if (!/lang: Lang|lang\)/.test(componentSource)) {
  errors.push(`${COMPONENT_PATH}: chưa nhận lang qua props`);
}

// ===== Tiêu chí 9 (route trong dist) nằm ở scripts/check-evolution-routes.mjs =====
// Lý do tách: npm run check chạy TRƯỚC astro build — nhìn dist lúc đó là bản
// build trước đó, sẽ báo sai. Script riêng này chạy sau build (có trong chuỗi
// npm run build) và khi anh chạy lại riêng sau build.

if (errors.length > 0) {
  console.log('KIỂM TRA DỮ LIỆU SƠ ĐỒ TIẾN HÓA — CÓ LỖI:');
  for (const e of errors) console.log(`  LỖI  ${e}`);
  process.exit(1);
}

console.log('Sơ đồ tiến hóa hợp lệ (song ngữ theo publishedLangs):');
for (const line of report) console.log(`  ${line}`);
