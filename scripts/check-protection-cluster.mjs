#!/usr/bin/env node
// =============================================================================
// check-protection-cluster.mjs — chống hồi quy cụm
// "Bảo vệ bộ máy: chống từ, chống sốc & Incabloc" (Prompt 37)
// =============================================================================
// Chạy trong `npm run check`. Quét đúng 6 bài vi/en của cụm:
//
//   R1. 3 bài EN mới + frontmatter hợp lệ (custom_slug khớp slug tệp;
//       has_infographic/interactive = false; enum category/difficulty theo
//       schema; ≥2 nguồn HTTPS).
//   R2. Đủ 3 cặp route mới trong src/i18n/contentRoutes.ts.
//   R3. Mọi liên kết nội bộ bắt buộc cụm (vi + en) có trong bài và đích tồn tại.
//   R4. 3 bài EN không có internal link nội dung về route tiếng Việt.
//   R5. Không còn các khẳng định cấm trong phạm vi 6 bài (quét PHẦN THÂN,
//       loại frontmatter để không dính slug relatedModels):
//         - lịch sử/hãng/vật liệu không nguồn (Milgauss, CERN, IWC Ingenieur,
//           pare-chute/Breguet, Kif, Etachoc, Diashock, mốc 1934, sắt mềm,
//           Nivachron/Spron/Syloxi)
//         - bảng/dải gauss dùng chung (60–600, 4.800, 1.000; mọi dòng bảng
//           kèm "gauss")
//         - 15.000 gauss ngoài cửa sổ chứng nhận METAS (cùng dòng hoặc dòng
//           kế tiếp phải có METAS/MASTER CHRONOMETER/chứng nhận/certification)
//         - danh sách thiết bị sinh hoạt + rủi ro (điện thoại, loa, iPad,
//           nam châm tủ lạnh, MRI, sạc không dây…)
//         - tự khử từ / chi phí (khử từ, demagnetise, VND)
//         - tự chẩn đoán nhiễm từ từ dấu hiệu ("dấu hiệu nhiễm từ",
//           "nguyên nhân rất có thể… nhiễm từ", "suddenly runs fast")
//         - khái quát "toàn ngành / mọi đồng hồ" (kể cả "majority of watches"
//           / "phần lớn đồng hồ" chỉ được phép trong cửa sổ attribution
//           FHH/Incabloc SA — cùng dòng)
//         - lời hứa độ bền / tình huống va đập (tennis, vỗ vai, "không lo hỏng",
//           unbreakable, without risk)
//         - trục 0,1 mm; "vài nghìn lần trọng lực" không attribution
//         - con số 5.000 g chỉ được phép trong cửa sổ attribution hãng
//           ("theo (mô tả của) hãng / Incabloc SA / maker" — cùng dòng)
//         - cơ chế nhiễm từ chi tiết không nguồn ("dính vào nhau", "biến dạng",
//           "dao động nhanh hơn")
//         - nhận biết Incabloc bằng mắt như xác nhận chắc chắn
//         - khuyến nghị mua dòng/hãng
//   R6. Hồ sơ nguồn + biên bản nghiệm thu tồn tại.
//
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';

const FILES = {
  vi: [
    'src/content/coChe/vi/chong-tu.md',
    'src/content/coChe/vi/chong-soc.md',
    'src/content/tuDien/vi/incabloc.md',
  ],
  en: [
    'src/content/coChe/en/anti-magnetism.md',
    'src/content/coChe/en/shock-protection.md',
    'src/content/tuDien/en/incabloc.md',
  ],
};

const ROUTES_FILE = 'src/i18n/contentRoutes.ts';
const DOC_FILES = [
  'docs/ho-so-nguon-cum-bao-ve-bo-may-song-ngu.md',
  'docs/nghiem-thu/2026-09-04_nghiem-thu-cum-bao-ve-bo-may-song-ngu.md',
];

const REQUIRED_LINKS = {
  'src/content/coChe/vi/chong-tu.md': [
    '](/tu-dien/day-toc-banh-lac)',
    '](/tu-dien/movement)',
    '](/huong-dan/do-sai-so)',
  ],
  'src/content/coChe/vi/chong-soc.md': [
    '](/tu-dien/chan-kinh)',
    '](/tu-dien/incabloc)',
  ],
  'src/content/tuDien/vi/incabloc.md': [
    '](/co-che/chong-soc)',
    '](/tu-dien/day-toc-banh-lac)',
  ],
  'src/content/coChe/en/anti-magnetism.md': [
    '](/en/glossary/movement/)',
    '](/en/glossary/hairspring/)',
    '](/en/glossary/escapement/)',
  ],
  'src/content/coChe/en/shock-protection.md': [
    '](/en/glossary/movement/)',
    '](/en/glossary/incabloc/)',
    '](/en/glossary/escapement/)',
  ],
  'src/content/tuDien/en/incabloc.md': [
    '](/en/mechanisms/shock-protection/)',
    '](/en/glossary/hairspring/)',
    '](/en/glossary/escapement/)',
  ],
};

const LINK_TARGETS = {
  '/tu-dien/day-toc-banh-lac': 'src/content/tuDien/vi/day-toc-banh-lac.md',
  '/tu-dien/movement': 'src/content/tuDien/vi/movement.md',
  '/huong-dan/do-sai-so': 'src/content/huongDan/vi/do-sai-so.md',
  '/tu-dien/chan-kinh': 'src/content/tuDien/vi/chan-kinh.md',
  '/tu-dien/incabloc': 'src/content/tuDien/vi/incabloc.md',
  '/co-che/chong-soc': 'src/content/coChe/vi/chong-soc.md',
  '/en/glossary/movement/': 'src/content/tuDien/en/movement.md',
  '/en/glossary/hairspring/': 'src/content/tuDien/en/hairspring.md',
  '/en/glossary/escapement/': 'src/content/tuDien/en/escapement.md',
  '/en/glossary/incabloc/': 'src/content/tuDien/en/incabloc.md',
  '/en/mechanisms/shock-protection/': 'src/content/coChe/en/shock-protection.md',
};

const EN_SLUGS = {
  'src/content/coChe/en/anti-magnetism.md': 'anti-magnetism',
  'src/content/coChe/en/shock-protection.md': 'shock-protection',
  'src/content/tuDien/en/incabloc.md': 'incabloc',
};

// Schema từng collection: coChe = category+difficulty+infographic+interactive;
// tuDien = category+infographic+interactive.
const FRONTMATTER_RULES = {
  'src/content/coChe/en/anti-magnetism.md': ['category', 'difficulty', 'infographic', 'interactive'],
  'src/content/coChe/en/shock-protection.md': ['category', 'difficulty', 'infographic', 'interactive'],
  'src/content/tuDien/en/incabloc.md': ['category', 'infographic', 'interactive'],
};

const ROUTE_PAIRS = [
  { vi: '/co-che/chong-tu', en: '/en/mechanisms/anti-magnetism/' },
  { vi: '/co-che/chong-soc', en: '/en/mechanisms/shock-protection/' },
  { vi: '/tu-dien/incabloc', en: '/en/glossary/incabloc/' },
];

const VALID_CATEGORIES = ['nền tảng', 'bổ trợ', 'phức tạp', 'phức tạp chức năng', 'thiết kế', 'bộ máy'];
const VALID_DIFFICULTIES = ['cơ bản', 'thấp', 'trung bình', 'trung cấp', 'người mới', 'cao'];

// ===== R5: các khẳng định cấm (quét PHẦN THÂN, 6 bài) =====
const BANNED = [
  { re: /milgauss|\bcern\b|ingenieur|pare-chute|breguet|\bkif\b|etachoc|diashock|1934|soft iron|sắt mềm|nivachron|spron|syloxi/i,
    why: 'lịch sử/hãng/vật liệu không có nguồn trực tiếp trong hồ sơ' },
  { re: /60\s*[–-]\s*600\s*gauss|4[.,]800\s*gauss|[^\d]1[.,]000\s*gauss/i, why: 'bảng/dải gauss dùng chung (đã loại)' },
  { re: /(điện thoại|smartphone|loa|speaker|ipad|tablet|nam châm tủ lạnh|fridge magnet|refrigerator|\bmri\b|sạc không dây|wireless charg)/i,
    why: 'danh sách thiết bị sinh hoạt + rủi ro (đã loại)' },
  { re: /khử từ|demagnetiz|demagnetis|\bvnd\b/i, why: 'tự khử từ / chi phí (đã loại)' },
  { re: /dấu hiệu nhiễm từ|signs? of magneti[sz]ation|chạy nhanh đột ngột|nguyên nhân rất có thể[^\n]{0,40}nhiễm từ|probably magnetised|suddenly runs fast/i,
    why: 'tự chẩn đoán nhiễm từ từ một dấu hiệu (đã loại)' },
  { re: /tiêu chuẩn toàn ngành|chuẩn toàn ngành|industry[- ]standard|gần như mọi đồng hồ|nearly all watches|almost all watches|mọi đồng hồ cơ|every mechanical watch|tất cả đồng hồ/i,
    why: 'khái quát "toàn ngành / mọi đồng hồ"' },
  { re: /tennis|vỗ vai|không lo hỏng|no need to worry|without (any )?risk|indestructible|unbreakable/i,
    why: 'lời hứa độ bền / tình huống va đập chắc chắn an toàn (đã loại)' },
  { re: /\b0[.,]1\s*mm/i, why: 'độ dày trục 0,1 mm (không nguồn)' },
  { re: /vài nghìn lần|thousands of gs?\b|nghìn lần trọng lực/i, why: '"vài nghìn G" không attribution' },
  { re: /dính vào nhau|sticks? together|dao động nhanh hơn|biến dạng/i, why: 'cơ chế nhiễm từ chi tiết không nguồn (đã loại)' },
  { re: /cấu trúc hình chữ thập|nhận biết[^\n]{0,20}bằng mắt|identif(y|ying)[^\n]{0,30}by (eye|sight)/i,
    why: 'nhận biết Incabloc bằng mắt như xác nhận chắc chắn (đã loại)' },
  { re: /chọn (dòng|mua)|buy a /i, why: 'khuyến nghị mua dòng/hãng (đã loại)' },
];
// 15.000 gauss chỉ được nêu trong cửa sổ chứng nhận METAS (cùng dòng hoặc
// dòng kế tiếp).
const GAUSS_RE = /15[.,]000\s*gauss/i;
const GAUSS_ALLOW = /METAS|MASTER CHRONOMETER|chứng nhận|certification/i;
// "majority of watches / phần lớn đồng hồ" chỉ được nêu khi cùng dòng có
// attribution (FHH / Incabloc SA / "theo…" / "according to…").
const MAJORITY_RE = /majority of (mechanical )?watches|phần lớn đồng hồ/i;
const MAJORITY_ALLOW = /FHH|Incabloc SA|theo (FHH|hãng|Incabloc)|according to/i;
// Con số 5.000 g chỉ được nêu khi cùng dòng có attribution hãng.
const G5000_RE = /5[.,]000\s*g\b/i;
const G5000_ALLOW = /theo (mô tả )?(của )?(hãng|Incabloc)|Incabloc SA|maker/i;

const errors = [];
const report = [];
const fail = (rule, file, line, why) =>
  errors.push(`[${rule}] ${file}:${line} — ${why}`);

// Phần thân = sau khối frontmatter đầu tiên (relatedModels slug nằm trong
// frontmatter nên không bị quét pattern).
function bodyOf(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return m ? text.slice(m[0].length) : text;
}

const textOf = {};
for (const f of [...FILES.vi, ...FILES.en, ROUTES_FILE, ...DOC_FILES]) {
  if (!existsSync(f)) errors.push(`[FILE] Thiếu tệp phạm vi: ${f}`);
  else textOf[f] = readFileSync(f, 'utf8');
}

if (errors.some((e) => e.startsWith('[FILE]'))) {
  console.log('KIỂM TRA CỤM BẢO VỆ BỘ MÁY — CÓ LỖI:');
  for (const e of errors) console.log(`  LỖI  ${e}`);
  process.exit(1);
}

// ===== R1: frontmatter 3 bài EN =====
for (const [f, slug] of Object.entries(EN_SLUGS)) {
  const fm = textOf[f].split('---')[1] ?? '';
  const fmSlug = fm.match(/^custom_slug:\s*"?([^"\n]+)"?/m)?.[1];
  if (fmSlug !== slug) fail('R1', f, 0, `custom_slug "${fmSlug}" ≠ slug tệp "${slug}"`);
  const rules = FRONTMATTER_RULES[f];
  if (rules.includes('category')) {
    const cat = fm.match(/^category:\s*"?([^"\n]+)"?/m)?.[1];
    if (!cat || !VALID_CATEGORIES.includes(cat)) fail('R1', f, 0, `category không hợp lệ: ${cat}`);
  }
  if (rules.includes('difficulty')) {
    const diff = fm.match(/^difficulty:\s*"?([^"\n]+)"?/m)?.[1];
    if (!diff || !VALID_DIFFICULTIES.includes(diff)) fail('R1', f, 0, `difficulty không hợp lệ: ${diff}`);
  }
  if (rules.includes('infographic') && !/^has_infographic:\s*false/m.test(fm)) {
    fail('R1', f, 0, 'has_infographic phải là false');
  }
  if (rules.includes('interactive') && !/^interactive:\s*false/m.test(fm)) {
    fail('R1', f, 0, 'interactive phải là false');
  }
  const sourceUrls = [...fm.matchAll(/url:\s*"(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  const https = sourceUrls.filter((u) => u.startsWith('https://'));
  if (https.length < 2) fail('R1', f, 0, `chỉ ${https.length} nguồn HTTPS (tối thiểu 2)`);
}
if (!errors.some((e) => e.includes('[R1]'))) {
  report.push('3 bài EN tồn tại, frontmatter hợp lệ (slug, false-flags, enum, ≥2 nguồn HTTPS)');
}

// ===== R2: 3 cặp route mới =====
for (const { vi, en } of ROUTE_PAIRS) {
  if (!textOf[ROUTES_FILE].includes(`vi: '${vi}'`)) errors.push(`[R2] contentRoutes thiếu cặp vi: '${vi}'`);
  if (!textOf[ROUTES_FILE].includes(`en: '${en}'`)) errors.push(`[R2] contentRoutes thiếu cặp en: '${en}'`);
}
if (!errors.some((e) => e.includes('[R2]'))) {
  report.push(`3 cặp route mới có trong contentRoutes.ts (${ROUTE_PAIRS.map((p) => p.vi).join(', ')})`);
}

// ===== R3: liên kết bắt buộc + đích tồn tại =====
let linkChecked = 0;
for (const [f, links] of Object.entries(REQUIRED_LINKS)) {
  for (const link of links) {
    if (!textOf[f].includes(link)) {
      errors.push(`[R3] ${f} thiếu liên kết bắt buộc: ${link}`);
      continue;
    }
    linkChecked++;
    const href = link.slice(2, -1);
    const target = LINK_TARGETS[href];
    if (target && !existsSync(target)) {
      errors.push(`[R3] Đích của ${link} không tồn tại: ${target}`);
    }
  }
}
if (!errors.some((e) => e.includes('[R3]'))) {
  report.push(`${linkChecked} liên kết bắt buộc cụm (vi+en) đều có và đích tồn tại`);
}

// ===== R4 + R5: quét dòng 6 bài (theo phần thân) =====
for (const f of [...FILES.vi, ...FILES.en]) {
  const lines = bodyOf(textOf[f]).split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (FILES.en.includes(f)) {
      for (const m of line.matchAll(/\]\(([^)]+)\)/g)) {
        const href = m[1];
        if (href.startsWith('/') && !href.startsWith('/en/')) {
          fail('R4', f, i + 1, `link nội bộ về route vi: ${href}`);
        }
      }
    }
    for (const { re, why } of BANNED) {
      const m = re.exec(line);
      if (m) fail('R5', f, i + 1, `${why}: "${m[0]}"`);
    }
    if (GAUSS_RE.test(line)) {
      const next = lines[i + 1] ?? '';
      if (!(GAUSS_ALLOW.test(line) || GAUSS_ALLOW.test(next))) {
        fail('R5', f, i + 1, '15.000 gauss ngoài cửa sổ chứng nhận METAS (cần METAS/chứng nhận cùng dòng hoặc dòng kế)');
      }
    }
    if (MAJORITY_RE.test(line)) {
      if (!MAJORITY_ALLOW.test(line)) {
        fail('R5', f, i + 1, '"majority of watches / phần lớn đồng hồ" thiếu attribution FHH/Incabloc SA cùng dòng');
      }
    }
    if (G5000_RE.test(line)) {
      if (!G5000_ALLOW.test(line)) {
        fail('R5', f, i + 1, 'con số 5.000 g thiếu attribution hãng cùng dòng');
      }
    }
    // Bảng gauss: mọi dòng bảng kèm "gauss" đều bị loại
    if (line.trim().startsWith('|') && /gauss/i.test(line)) {
      fail('R5', f, i + 1, 'bảng mức gauss — dạng bảng dùng chung đã bị loại');
    }
  }
}
if (!errors.some((e) => e.includes('[R4]'))) report.push('R4: 3 bài EN không có link nội bộ về route tiếng Việt');
if (!errors.some((e) => e.includes('[R5]'))) report.push('R5: sạch các khẳng định cấm (lịch sử/hãng không nguồn, bảng/dải gauss, 15.000 gauss ngoài cửa sổ chứng nhận, thiết bị+rủi ro, khử từ/chi phí, tự chẩn đoán, "toàn ngành/mọi đồng hồ", "majority" không attribution, lời hứa độ bền, 0,1 mm, "vài nghìn G", 5.000 g không attribution, cơ chế nhiễm từ chi tiết, nhận biết bằng mắt, khuyến nghị mua)');

// ===== R6: hồ sơ + biên bản =====
report.push(`Hồ sơ nguồn + biên bản nghiệm thu tồn tại (${DOC_FILES.length} tệp)`);

// ===== Kết luận =====
console.log('KIỂM TRA CỤM BẢO VỆ BỘ MÁY (CHỐNG TỪ, CHỐNG SỐC & INCABLOC) SONG NGỮ:');
for (const line of report) console.log(`  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — cụm bảo vệ bộ máy khớp hồ sơ nguồn, không hồi quy.');
