// =============================================================================
// check-i4-model-evolution.mjs — Kiểm I4: ba sơ đồ tiến hóa Royal Oak,
// Fifty Fathoms, Reverso
// =============================================================================
// Hai chế độ (giống các checker cụm khác):
//   node scripts/check-i4-model-evolution.mjs        → kiểm SOURCE (npm run check)
//   node scripts/check-i4-model-evolution.mjs dist   → kiểm SOURCE + DIST (npm run build)
// Nguồn sự thật: ba dataset src/data/*.Evolution.ts của I4 + sổ đăng ký
// modelEvolution.ts + allowlist URL theo ba hồ sơ dữ liệu docs/ho-so-du-lieu-tien-hoa-*.md.
// Nhóm kiểm:
//   I4-1  Đủ đúng ba dataset I4 với đúng ba slug; đã đăng ký trong registry
//   I4-2  Từng dataset ≥3 mốc; năm tăng dần; không trùng (năm, reference); URL HTTPS
//   I4-3  Song ngữ đầy đủ (title/intro/label/change/note); EN không lẫn ký tự Việt
//   I4-4  Source URL khớp allowlist theo hồ sơ (đủ đúng tập URL đã chốt)
//   I4-5  Claim cấm (unidirectional, quy đổi độ sâu, "đầu tiên thép cao cấp",
//         Cottier, Jumbo, số ref không chốt…) — sạch trên dataset
//   I4-6  Component ModelEvolution.astro không chứa dữ kiện cứng của I4
//   I4-7  (dist) 6 route VI/EN render sơ đồ; số nút mốc đúng dataset; nhãn nguồn
//         VI/EN đúng; canonical/hreflang/switcher đúng; khối EN sạch ký tự Việt
//   I4-8  (dist) Không có sơ đồ trên bài iconic khác ngoài các dataset đã đăng ký
//   I4-9  (dist) Claim cấm sạch trên khối sơ đồ của 6 route
// Exit 1 nếu có lỗi. Env: I4_ROOT để chạy trên bản sao.
// =============================================================================
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import * as path from 'node:path';
const { join } = path;

const ROOT = path.resolve(process.env.I4_ROOT ?? process.cwd());
const DIST = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? null;
const distDir = DIST ? (path.isAbsolute(DIST) ? DIST : path.join(ROOT, DIST)) : null;

const errors = [];
const fail = (id, msg) => {
  errors.push(`[${id}] ${msg}`);
  console.log(`  LỖI  [${id}] ${msg}`);
};
const pass = (id, msg) => console.log(`  ĐẠT  [${id}] ${msg}`);

// Ký tự tiếng Việt có dấu — không được xuất hiện trong văn bản EN hiển thị
const VI_CHAR_RE = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;

const I4 = [
  {
    file: 'audemarsPiguetRoyalOakEvolution.ts',
    slug: 'royal-oak',
    name: 'Audemars Piguet Royal Oak',
    allowlist: [
      'https://apchronicles.audemarspiguet.com/en/article/birth-of-an-icon',
      'https://apchronicles.audemarspiguet.com/en/article/royal-oak-2-birth-of-the-first-women-s-model',
    ],
  },
  {
    file: 'blancpainFiftyFathomsEvolution.ts',
    slug: 'fifty-fathoms',
    name: 'Blancpain Fifty Fathoms',
    allowlist: [
      'https://www.blancpain.com/en/collections/fifty-fathoms-collection',
      'https://lettresdubrassus.blancpain.com/en/issue-13/history-and-legend',
    ],
  },
  {
    file: 'jaegerLeCoultreReversoEvolution.ts',
    slug: 'reverso',
    name: 'Jaeger-LeCoultre Reverso',
    allowlist: ['https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history'],
  },
];

// Claim cấm theo hồ sơ dữ liệu I4 — áp cho dataset và khối sơ đồ dist
const CLAIM_CAM = [
  { pattern: /unidirectional/i, lyDo: 'Fifty Fathoms: vành xoay một chiều — nguồn chỉ xác nhận cơ chế khóa' },
  { pattern: /một chiều/, lyDo: 'Fifty Fathoms: vành xoay một chiều (VI)' },
  { pattern: /\b91\s?m\b/i, lyDo: 'Fifty Fathoms: quy đổi 91 m — không có trong nguồn' },
  { pattern: /\b300\s?ft\b/i, lyDo: 'Fifty Fathoms: quy đổi 300 ft — không có trong nguồn' },
  { pattern: /Cottier/i, lyDo: 'Reverso: tên thiết kế sai (đúng là Chauvot)' },
  { pattern: /\betymology\b/i, lyDo: 'Reverso: etymology Latin không có nguồn' },
  { pattern: /first luxury steel sports watch/i, lyDo: 'Royal Oak: khẳng định "đầu tiên" thép cao cấp' },
  { pattern: /the first steel sports watch/i, lyDo: 'Royal Oak: khẳng định "đầu tiên" thép thể thao' },
  { pattern: /thể\s*thao\s*thép[^.]{0,40}đầu\s*tiên|đầu\s*tiên[^.]{0,40}thể\s*thao\s*thép/i, lyDo: 'Royal Oak: khẳng định "đầu tiên" thép thể thao (VI)' },
  { pattern: /\bJumbo\b/, lyDo: 'Royal Oak: biệt danh "Jumbo" không đưa vào sơ đồ' },
  { pattern: /\b5402\b|\b14802\b|\b15202\b|\b16202\b/, lyDo: 'Royal Oak: số reference không thuộc hồ sơ (chỉ Model 8638 được chốt)' },
  { pattern: /\bfirst ever\b|\bonly watch\b|the most iconic/i, lyDo: 'cường độ tuyệt đối EN không có trong dữ kiện VI' },
];

// ---- đọc dataset I4 (khuôn parse giống check-evolution-data)
function parseDataset(src) {
  const slug = (src.match(/slug:\s*['"]([^'"]+)['"]/) ?? [])[1];
  const langs = (src.match(/publishedLangs:\s*\[([^\]]*)\]/) ?? [])[1] ?? '';
  const publishedLangs = langs.split(',').map((s) => s.trim().replace(/['"]/g, '')).filter(Boolean);
  const titleLoc = src.match(/title:\s*\{\s*vi:\s*['`]([^`]*)['`]\s*,\s*en:\s*['`]([^`]*)['`]/);
  const introLoc = src.match(/intro:\s*\{\s*vi:\s*['`]([^`]*)['`]\s*,\s*en:\s*['`]([^`]*)['`]/);
  const body = (src.match(/milestones:\s*\[([\s\S]*?)\]\s*,?\s*\n\}/) ?? [])[1] ?? '';
  const milestones = body
    .split(/\n\s*\{\s*\n/)
    .slice(1)
    .map((part) => {
      const loc = (key) => {
        const m = part.match(new RegExp(`${key}:\\s*\\{\\s*vi:\\s*['\`]([^'\`]*)['\`]\\s*,\\s*en:\\s*['\`]([^'\`]*)['\`]`));
        return m ? { vi: m[1], en: m[2] } : undefined;
      };
      const str = (key) => (part.match(new RegExp(`${key}:\\s*['\`]([^'\`]*)['\`]`)) ?? part.match(new RegExp(`${key}:\\s*"([^"]*)"`)))?.[1];
      return {
        year: Number((part.match(/year:\s*(\d+)/) ?? [])[1]),
        reference: str('reference'),
        label: loc('label'),
        change: loc('change'),
        note: loc('note'),
        sourceUrl: str('sourceUrl'),
        sourceName: str('sourceName'),
      };
    });
  return { slug, publishedLangs, title: titleLoc, intro: introLoc, milestones };
}

// ---- I4-1: đủ ba dataset, đúng slug, đã đăng ký
const dsGoc = path.join(ROOT, 'src', 'data');
const registry = readFileSync(path.join(dsGoc, 'modelEvolution.ts'), 'utf8');
const thieu = I4.filter((d) => !registry.includes(d.file.replace('.ts', '')) && !registry.includes(`./${d.file.replace('.ts', '')}'`));
const datasets = I4.map((d) => {
  const p = path.join(dsGoc, d.file);
  if (!existsSync(p)) {
    fail('I4-1', `Thiếu dataset ${d.file}`);
    return null;
  }
  const ds = parseDataset(readFileSync(p, 'utf8'));
  if (ds.slug !== d.slug) fail('I4-1', `${d.file}: slug "${ds.slug}" ≠ kỳ vọng "${d.slug}"`);
  if (!ds.publishedLangs.includes('vi') || !ds.publishedLangs.includes('en')) {
    fail('I4-1', `${d.file}: publishedLangs phải là ['vi','en'] — thấy [${ds.publishedLangs.join(', ')}]`);
  }
  return ds;
});
if (thieu.length > 0) {
  fail('I4-1', `Dataset chưa được đăng ký trong modelEvolution.ts: ${thieu.map((d) => d.file).join(', ')}`);
} else if (datasets.every(Boolean) && !errors.some((e) => e.startsWith('[I4-1]'))) {
  pass('I4-1', 'Đủ ba dataset I4 (royal-oak, fifty-fathoms, reverso) với publishedLangs ["vi","en"], đã đăng ký trong modelEvolution.ts');
}

// ---- I4-2..I4-5: từng dataset
let tongMoc = 0;
datasets.forEach((ds, idx) => {
  const d = I4[idx];
  if (!ds) return;
  const at = d.slug;
  tongMoc += ds.milestones.length;
  if (ds.milestones.length < 3) fail('I4-2', `${at}: chỉ ${ds.milestones.length} mốc (tối thiểu 3)`);
  let prev = -Infinity;
  const seen = new Set();
  const urlsDung = new Set();
  ds.milestones.forEach((m, i) => {
    if (!Number.isInteger(m.year) || m.year < 1000) fail('I4-2', `${at} mốc ${i + 1}: year không hợp lệ`);
    else if (m.year < prev) fail('I4-2', `${at} mốc ${i + 1}: năm ${m.year} không tăng dần (sau ${prev})`);
    else prev = m.year;
    const khoa = `${m.year}|${m.reference}`;
    if (seen.has(khoa)) fail('I4-2', `${at}: trùng tổ hợp năm+reference "${khoa}"`);
    seen.add(khoa);
    if (!m.reference?.trim()) fail('I4-2', `${at} mốc ${i + 1}: thiếu reference`);
    if (!m.sourceUrl?.startsWith('https://')) fail('I4-2', `${at} mốc ${i + 1}: sourceUrl không phải HTTPS`);
    urlsDung.add(m.sourceUrl);
    for (const [key, v] of [['label', m.label], ['change', m.change], ['note', m.note]]) {
      if (!v?.vi?.trim() || !v?.en?.trim()) fail('I4-3', `${at} mốc ${i + 1}: ${key} thiếu vi hoặc en`);
      else if (VI_CHAR_RE.test(v.en)) fail('I4-3', `${at} mốc ${i + 1}: ${key}.en còn ký tự tiếng Việt — từ mẫu: "${(v.en.match(/[^\s]*[ăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụ][^\s]*/i) ?? ['?'])[0]}"`);
    }
    if (!ds.title?.[1]?.trim() || !ds.intro?.[1]?.trim()) fail('I4-3', `${at}: title/intro thiếu dạng song ngữ`);
    else if (VI_CHAR_RE.test(ds.title[2] ?? '') || VI_CHAR_RE.test(ds.intro[2] ?? '')) {
      fail('I4-3', `${at}: title/intro EN còn ký tự tiếng Việt`);
    }
  });
  const dungThu = [...urlsDung].sort().join('|');
  const allowThu = [...d.allowlist].sort().join('|');
  if (dungThu !== allowThu) fail('I4-4', `${at}: tập sourceUrl dùng [${dungThu}] ≠ allowlist hồ sơ [${allowThu}]`);

  // Chỉ test chuỗi dữ kiện hiển thị (không test comment tệp — comment ghi đúng
  // các quy tắc cấm sẽ tự khớp pattern, bài học "pattern tự-khớp" G08-A)
  const duKien = [
    ds.title?.[1], ds.title?.[2], ds.intro?.[1], ds.intro?.[2],
    ...ds.milestones.flatMap((m) => [
      m.reference, m.label?.vi, m.label?.en, m.change?.vi, m.change?.en,
      m.note?.vi, m.note?.en, m.sourceUrl, m.sourceName,
    ]),
  ].filter(Boolean).join('\n');
  for (const c of CLAIM_CAM) {
    if (c.pattern.test(duKien)) fail('I4-5', `${at}: claim cấm (${c.lyDo}) — pattern ${c.pattern}`);
  }
});
if (!errors.some((e) => e.startsWith('[I4-2]'))) pass('I4-2', `Ba dataset đủ ${tongMoc} mốc (tối thiểu 3 mỗi dataset), năm tăng dần, không trùng (năm, reference), mọi sourceUrl HTTPS`);
if (!errors.some((e) => e.startsWith('[I4-3]'))) pass('I4-3', 'Song ngữ đầy đủ title/intro + label/change/note từng mốc; bản EN không lẫn ký tự tiếng Việt');
if (!errors.some((e) => e.startsWith('[I4-4]'))) pass('I4-4', `Source URL khớp allowlist hồ sơ: ${I4.map((d) => `${d.slug}=${d.allowlist.length} URL`).join(', ')}`);
if (!errors.some((e) => e.startsWith('[I4-5]'))) pass('I4-5', 'Không có claim cấm trong ba dataset (vành một chiều, quy đổi độ sâu, "đầu tiên" thép cao cấp, Cottier, Jumbo, số ref không chốt, cường độ tuyệt đối EN)');

// ---- I4-6: component không chứa dữ kiện cứng I4
const comp = readFileSync(path.join(ROOT, 'src', 'components', 'ModelEvolution.astro'), 'utf8');
const chuoiCam = ['Royal Oak II', 'Model 8638', 'Fifty Fathoms', 'Duoface', 'Duetto', 'Basel Fair', 'Trilogy', 'Anniversary', 'Maloubier', 'Riffaud', 'Chauvot', 'de Trey'];
const leak = chuoiCam.filter((s) => comp.includes(s));
if (leak.length === 0) pass('I4-6', 'Component ModelEvolution.astro không chứa dữ kiện cứng của I4 (chỉ render dataset truyền vào)');
else fail('I4-6', `Component chứa dữ kiện cứng: ${leak.join(', ')}`);

// ---- I4-10: Reverso đúng tập mốc đã chốt trong hồ sơ (kiểm cứng từng cặp năm+reference)
const REV_CHOT = [
  { year: 1930, reference: 'Reverso' },
  { year: 1931, reference: 'Reverso' },
  { year: 1994, reference: 'Reverso Duoface' },
  { year: 1997, reference: 'Reverso Duetto' },
];
const dsRev = datasets[I4.findIndex((d) => d.slug === 'reverso')];
if (dsRev) {
  const thucTe = dsRev.milestones.map((m) => `${m.year}/${m.reference}`);
  const chot = REV_CHOT.map((m) => `${m.year}/${m.reference}`);
  const khop = thucTe.length === chot.length && chot.every((k, i) => thucTe[i] === k);
  if (khop) pass('I4-10', `Reverso đúng tập mốc chốt theo hồ sơ: ${chot.join(' → ')}`);
  else fail('I4-10', `Reverso lệch tập mốc chốt — dataset [${thucTe.join(', ')}] ≠ hồ sơ [${chot.join(', ')}]`);
}

// ---- I4-7..I4-9: dist
if (distDir) {
  const VI_PREFIX = join(distDir, 'mau-iconic');
  const EN_PREFIX = join(distDir, 'en', 'iconic-watches');

  // 6 route + nút mốc + nhãn nguồn + canonical/hreflang/switcher
  datasets.forEach((ds, idx) => {
    const d = I4[idx];
    if (!ds) return;
    const viPath = join(VI_PREFIX, d.slug, 'index.html');
    const enPath = join(EN_PREFIX, d.slug, 'index.html');
    if (!existsSync(viPath) || !existsSync(enPath)) {
      fail('I4-7', `${d.slug}: dist thiếu route VI hoặc EN (${viPath} | ${enPath})`);
      return;
    }
    const vi = readFileSync(viPath, 'utf8');
    const en = readFileSync(enPath, 'utf8');
    if (!vi.includes('data-evolution')) fail('I4-7', `${d.slug}: route VI không render sơ đồ`);
    if (!en.includes('data-evolution')) fail('I4-7', `${d.slug}: route EN không render sơ đồ`);
    const viBtns = (vi.match(/class="evol-btn/g) ?? []).length;
    const enBtns = (en.match(/class="evol-btn/g) ?? []).length;
    if (viBtns !== ds.milestones.length) fail('I4-7', `${d.slug}: route VI ${viBtns} nút mốc ≠ dataset ${ds.milestones.length}`);
    if (enBtns !== ds.milestones.length) fail('I4-7', `${d.slug}: route EN ${enBtns} nút mốc ≠ dataset ${ds.milestones.length}`);
    if (!/Xem nguồn/.test(vi)) fail('I4-7', `${d.slug}: route VI thiếu nhãn "Xem nguồn"`);
    if (!/View source/.test(en)) fail('I4-7', `${d.slug}: route EN thiếu nhãn "View source"`);

    // khối sơ đồ EN sạch ký tự Việt
    const enBlock = en.match(/<section[^>]*data-evolution[\s\S]*?<\/section>/)?.[0] ?? '';
    if (enBlock && VI_CHAR_RE.test(enBlock.replace(/<[^>]*>/g, ' '))) {
      const mau = (enBlock.match(/[^\s<>]*[ăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụ][^\s<>]*/i) ?? ['?'])[0];
      fail('I4-7', `${d.slug}: khối sơ đồ EN còn ký tự tiếng Việt — từ mẫu: "${mau}"`);
    }

    // canonical + hreflang + switcher không đổi
    const canVi = (vi.match(/rel="canonical" href="([^"]*)"/) ?? [])[1] ?? '';
    const canEn = (en.match(/rel="canonical" href="([^"]*)"/) ?? [])[1] ?? '';
    if (!canVi.endsWith(`/mau-iconic/${d.slug}/`)) fail('I4-7', `${d.slug}: canonical VI sai — ${canVi}`);
    if (!canEn.endsWith(`/en/iconic-watches/${d.slug}/`)) fail('I4-7', `${d.slug}: canonical EN sai — ${canEn}`);
    if (!/hreflang="en" href="[^"]*\/en\/iconic-watches\/[^"]*"/.test(vi)) fail('I4-7', `${d.slug}: route VI mất hreflang en`);
    if (!/hreflang="vi" href="[^"]*\/mau-iconic\//.test(en)) fail('I4-7', `${d.slug}: route EN mất hreflang vi`);
    if (!/<a[^>]*href="\/en\/iconic-watches\//.test(vi) && !vi.includes(`href="/en/iconic-watches/${d.slug}"`)) fail('I4-7', `${d.slug}: route VI mất link switcher EN`);
    if (!en.includes(`href="/mau-iconic/${d.slug}"`)) fail('I4-7', `${d.slug}: route EN mất link switcher VI`);

    // claim cấm trên khối sơ đồ dist (VI khối + EN khối)
    for (const [ten, html] of [['VI', vi], ['EN', en]]) {
      const khoi = html.match(/<section[^>]*data-evolution[\s\S]*?<\/section>/)?.[0] ?? '';
      for (const c of CLAIM_CAM) {
        if (c.pattern.test(khoi)) fail('I4-9', `${d.slug} (${ten}): claim cấm trong khối sơ đồ — ${c.lyDo}`);
      }
    }
  });
  if (!errors.some((e) => e.startsWith('[I4-7]'))) {
    pass('I4-7', `6 route VI/EN render đủ ${tongMoc} mốc mỗi cặp — nút/nhãn nguồn/canonical/hreflang/switcher đúng; khối EN sạch ký tự Việt`);
  }
  if (!errors.some((e) => e.startsWith('[I4-9]'))) pass('I4-9', 'Khối sơ đồ trên 6 route dist sạch claim cấm');

  // I4-8: không sơ đồ trên bài iconic khác ngoài các dataset đã đăng ký
  const duKien = new Set();
  for (const d of I4) {
    duKien.add(`mau-iconic/${d.slug}`);
    duKien.add(`en/iconic-watches/${d.slug}`);
  }
  // các dataset cũ trong registry (slug từ registry — chỉ 3 dataset cũ còn lại)
  for (const slugCu of ['omega-speedmaster', 'rolex-gmt-master', 'rolex-submariner']) {
    duKien.add(`mau-iconic/${slugCu}`);
    duKien.add(`en/iconic-watches/${slugCu}`);
  }
  const timThay = [];
  for (const [thuMuc, tienTo] of [[VI_PREFIX, 'mau-iconic'], [EN_PREFIX, 'en/iconic-watches']]) {
    if (!existsSync(thuMuc)) continue;
    for (const slug of readdirSync(thuMuc)) {
      const p = join(thuMuc, slug, 'index.html');
      if (existsSync(p) && readFileSync(p, 'utf8').includes('data-evolution')) {
        const khoa = `${tienTo}/${slug}`;
        timThay.push(khoa);
        if (!duKien.has(khoa)) fail('I4-8', `Sơ đồ xuất hiện trên bài iconic ngoài danh sách: ${khoa}`);
      }
    }
  }
  if (!errors.some((e) => e.startsWith('[I4-8]')) && timThay.length === duKien.size) {
    pass('I4-8', `Sơ đồ tiến hóa chỉ xuất hiện trên đúng ${duKien.size} route đã đăng ký (3 I4 + 3 cũ × VI/EN)`);
  }
}

// ---- Kết luận
console.log('KIỂM TRA I4 — BA SƠ ĐỒ TIẾN HÓA ROYAL OAK / FIFTY FATHOMS / REVERSO:');
if (errors.length > 0) {
  console.log(`  KẾT LUẬN: KHÔNG ĐẠT (${errors.length} lỗi)`);
  process.exit(1);
}
console.log(`  KẾT LUẬN: ĐẠT${distDir ? ' (source + dist)' : ' (source)'} — ba sơ đồ đúng dữ kiện hồ sơ, song ngữ sạch, claim cấm bị chặn.`);
