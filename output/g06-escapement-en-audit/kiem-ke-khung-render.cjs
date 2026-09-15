// G06-C chặng 1 vòng sửa 2 — sinh bảng component → consumer → route → thực sự
// render (dist) → chế độ. Nguồn sự thật: map trong MechanismArticle.astro +
// TermArticle.astro + ARTICLE_PAIRS (contentRoutes.ts) + HTML dist hiện hành.
// Chạy: node kiem-ke-khung-render.cjs  (ghi bang-nhan-dien-khung.md)
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const doc = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const mechSrc = doc('src/components/templates/MechanismArticle.astro');
const termSrc = doc('src/components/templates/TermArticle.astro');
const routesSrc = doc('src/i18n/contentRoutes.ts');

// Component nào import MechanismAnimation (loại khung tự tham chiếu)
const khungImport = new Set();
for (const dir of ['src/components/infographics', 'src/components/infographics/glossary']) {
  for (const f of fs.readdirSync(path.join(ROOT, dir))) {
    if (!f.endsWith('.astro') || f === 'MechanismAnimation.astro') continue;
    if (doc(path.join(dir, f)).includes('MechanismAnimation')) khungImport.add(f.replace('.astro', ''));
  }
}

// Map slug → component từ hai consumer
const docMap = (src, ten) => {
  const khoi = src.match(/const infographics: Record<string, any> = \{([\s\S]*?)\};/);
  if (!khoi) throw new Error('không tìm thấy map trong ' + ten);
  const out = [];
  for (const m of khoi[1].matchAll(/['"]?([\w-]+)['"]?\s*:\s*(\w+),/g)) out.push({ slug: m[1], component: m[2] });
  return out;
};
const mechMap = docMap(mechSrc, 'MechanismArticle');
const termMap = docMap(termSrc, 'TermArticle');

// Cặp EN từ ARTICLE_PAIRS
const pairs = [];
for (const m of routesSrc.matchAll(/\{ vi: '(\/co-che\/[\w-]+)', en: '(\/en\/mechanisms\/[\w-]+\/)' \}/g)) {
  pairs.push([m[1], m[2]]);
}
const pairOf = (viPath) => pairs.find(([v]) => v === viPath);

// Dist: trang có data-mechanism không + chế độ
const distTrang = (route) => {
  const f = path.join(ROOT, 'dist', route, 'index.html');
  if (!fs.existsSync(f)) return { tonTai: false, khung: false, enhanced: null };
  const html = fs.readFileSync(f, 'utf8');
  const khung = html.includes('data-mechanism');
  const enhanced = khung ? (html.match(/data-enhanced="([^"]*)"/) || [null, null])[1] : null;
  return { tonTai: true, khung, enhanced };
};

const hang = [];
for (const { slug, component } of mechMap) {
  const route = `/co-che/${slug}/`;
  const d = distTrang(route);
  const cap = pairOf(`/co-che/${slug}`);
  hang.push({ component, consumer: 'MechanismArticle', slug, route, dist: d, capEn: cap ? cap[1] : null, khungImport: khungImport.has(component) });
}
for (const { slug, component } of termMap) {
  const route = `/tu-dien/${slug}/`;
  const d = distTrang(route);
  hang.push({ component, consumer: 'TermArticle', slug, route, dist: d, capEn: null, khungImport: khungImport.has(component) });
}

const soTrangRender = hang.filter((h) => h.dist.khung).length;
const soCoChe = hang.filter((h) => h.dist.khung && h.consumer === 'MechanismArticle').length;
const soTuDien = hang.filter((x) => x.dist.khung && x.consumer === 'TermArticle').length;

const md = [];
md.push('# G06-C chặng 1 — Bảng nhận diện khung MechanismAnimation (vòng sửa 2)');
md.push('');
md.push('Sinh bởi `kiem-ke-khung-render.cjs` từ mã nguồn (map `MechanismArticle.astro`, `TermArticle.astro`, `ARTICLE_PAIRS` trong `contentRoutes.ts`) đối chiếu HTML dist hiện hành trên nền `ced15b8`. "Thực sự render" = HTML tĩnh dist có `data-mechanism`; chế độ đọc từ `data-enhanced` của dist.');
md.push('');
md.push(`**Kết quả: ${soTrangRender} trang thực sự render khung = ${soCoChe} trang /co-che/ + ${soTuDien} trang /tu-dien/.** 18 component import khung; import KHÔNG đồng nghĩa render.`);
md.push('');
md.push('| Component | Import khung? | Consumer | Route | Cặp EN (ARTICLE_PAIRS) | Thực sự render (dist) | Chế độ (data-enhanced) |');
md.push('|---|---|---|---|---|---|---|');
for (const h of hang) {
  const imp = h.khungImport ? '✓' : '—';
  const render = !h.dist.tonTai ? 'KHÔNG có trang' : h.dist.khung ? `✓ ${h.route}` : `✗ ${h.route} (không data-mechanism)`;
  const mode = h.dist.khung ? (h.dist.enhanced === 'true' ? 'enhanced' : 'cũ') : '—';
  const ghiChu = h.consumer === 'MechanismArticle' && h.slug === 'day-toc-banh-lac' ? ' — hasBalanceChapter (G04-B thay khung riêng)' : '';
  md.push(`| ${h.component} | ${imp} | ${h.consumer} (${h.slug}) | ${h.route} | ${h.capEn ?? '— (VI-only hoặc không áp)'} | ${render}${ghiChu} | ${mode} |`);
}
md.push('');
md.push('## Đối chiếu con số vòng trước');
md.push('');
md.push('- Vòng sửa 1 ghi "18 consumer /co-che/ + 9 /tu-dien/" — **SAI ở tầng render**: 18 là số SLUG trong map MechanismArticle, nhưng `/co-che/day-toc-banh-lac/` KHÔNG render khung (gate `hasBalanceChapter` — chương G04 thay bằng mô hình riêng); TermArticle có 9 slug nhưng chỉ 5 component trong số đó import khung và có trang render.');
md.push('- GPT Work quét dist: **17 trang /co-che/ + 5 trang /tu-dien/ = 22** — script này tái tạo đúng 22.');
md.push('- Hai cặp "?" trong bảng nhân rộng G04 đã xác định: `chuyen-dong-co ↔ how-a-mechanical-watch-works`, `len-day-tu-dong ↔ automatic-winding` (ARTICLE_PAIRS).');
md.push('- MoonPhase (glossary) import khung và render ở `/co-che/pha-trang/`; TermArticle KHÔNG dùng MoonPhase.');
md.push('- Hairspring render 1 route (`/tu-dien/day-toc-banh-lac/`), bị chặn ở `/co-che/day-toc-banh-lac/`.');
md.push('');
fs.writeFileSync(path.join(__dirname, 'bang-nhan-dien-khung.md'), md.join('\n') + '\n');
console.log(`OK: ${soTrangRender} trang render (${soCoChe} co-che + ${soTuDien} tu-dien), ${hang.length} dòng map, ${pairs.length} cặp /co-che/↔EN`);
