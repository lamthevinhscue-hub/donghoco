// =============================================================================
// check-g08-speedmaster-evolution.cjs — Kiểm riêng G08-B (chạy sau npm run build)
// =============================================================================
// Dùng: node scripts/check-g08-speedmaster-evolution.cjs
// Nguồn sự thật: docs/ho-so-du-lieu-tien-hoa-omega-speedmaster.md +
//   output/g08-speedmaster-evolution-audit/du-kien-g08-a.json (7 mốc đã duyệt).
// G1 dataset: slug/publishedLangs/đúng 7 mốc/năm tăng dần/reference khớp hồ sơ.
// G2 khớp hồ sơ: từng mốc vi/en/year/reference/sourceUrl/sourceName == JSON.
// G3 tương ứng VI–EN: các số ≥2 chữ số trong vi và en phải trùng nhau từng trường.
// G4 đăng ký: import + DATASETS trong modelEvolution.ts; slug duy nhất toàn src/data.
// G5 dist: data-evolution chỉ render đúng các route mô hình có dataset
//   (omega-speedmaster, rolex-submariner, rolex-gmt-master × VI/EN), 7 nút/route,
//   7 URL nguồn xuất hiện ở cả hai route Speedmaster.
// G6 hai route Speedmaster không còn 8 nhóm claim cũ (VI + EN) + G7 reference hiển thị.
// Exit 1 nếu có lỗi.
// =============================================================================
const fs = require('fs');
const path = require('path');

const TEP_DATASET = 'src/data/omegaSpeedmasterEvolution.ts';
const TEP_DANG_KY = 'src/data/modelEvolution.ts';
const JSON_HO_SO = 'output/g08-speedmaster-evolution-audit/du-kien-g08-a.json';

const errors = [];
const dat = (ten, ok, chiTiet) => {
  console.log(`${ok ? 'ĐẠT' : 'KHÔNG ĐẠT'} ${ten}${chiTiet ? ' — ' + chiTiet : ''}`);
  if (!ok) errors.push(ten);
};

// ---- G1/G2: dataset so trực tiếp với JSON hồ sơ
const json = JSON.parse(fs.readFileSync(JSON_HO_SO, 'utf8'));
const src = fs.readFileSync(TEP_DATASET, 'utf8');
// phân tích từng khối mốc (tách theo ranh giới "\n    {\n    // N...")
const milestones = [];
const cacKhoi = src.split(/\n    \{\n/).slice(1);
for (const khoi of cacKhoi) {
  const loc = (key) => {
    const m = khoi.match(new RegExp(`${key}:\\s*\\{\\s*vi:\\s*'([^']*)'\\s*,\\s*en:\\s*'([^']*)'`));
    return m ? { vi: m[1], en: m[2] } : undefined;
  };
  milestones.push({
    year: Number((khoi.match(/year:\s*(\d+)/) || [])[1]),
    reference: loc('reference'),
    label: loc('label'),
    change: loc('change'),
    note: loc('note'),
    sourceUrl: (khoi.match(/sourceUrl:\s*'([^']+)'/) || [])[1],
    sourceName: (khoi.match(/sourceName:\s*'([^']+)'/) || [])[1],
  });
}

const slugSrc = (src.match(/slug:\s*'([^']+)'/) || [])[1];
const langsSrc = (src.match(/publishedLangs:\s*\[([^\]]*)\]/) || [])[1];
dat('G1 slug + publishedLangs', slugSrc === 'omega-speedmaster' && /'vi'/.test(langsSrc) && /'en'/.test(langsSrc), `${slugSrc} [${langsSrc.replace(/'/g, '')}]`);
dat('G1 đúng 7 mốc', milestones.length === 7 && json.milestones.length === 7, `dataset ${milestones.length} · hồ sơ ${json.milestones.length}`);
let tang = true;
for (let i = 1; i < milestones.length; i++) if (milestones[i].year <= milestones[i - 1].year) tang = false;
dat('G1 năm tăng dần 1957→2021', tang && milestones[0].year === 1957 && milestones[6].year === 2021, milestones.map((m) => m.year).join(' < '));

// G2: so từng mốc với JSON (year, reference, vi/en mọi trường, sourceUrl, sourceName)
const soBangJson = (_ten, a, b) => JSON.stringify(a) === JSON.stringify(b);
for (let i = 0; i < 7; i++) {
  const d = milestones[i], j = json.milestones[i];
  const ok = d.year === j.year &&
    soBangJson('reference', d.reference, j.reference) &&
    soBangJson('label', d.label, j.label) &&
    soBangJson('change', d.change, j.change) &&
    soBangJson('note', d.note, j.note) &&
    d.sourceUrl === j.sourceUrl && d.sourceName === j.sourceName;
  dat(`G2 mốc ${j.hoSoId} (${j.year}) khớp hồ sơ từng trường`, ok, ok ? '' : 'lệch — xem chi tiết diff ở log chi tiết');
  if (!ok) {
    for (const k of ['year', 'reference', 'label', 'change', 'note', 'sourceUrl', 'sourceName']) {
      if (JSON.stringify(d[k]) !== JSON.stringify(j[k])) console.log(`    lệch ${k}: dataset=${JSON.stringify(d[k])} hồ sơ=${JSON.stringify(j[k])}`);
    }
  }
}

// G3: tương ứng VI–EN — tập hợp (đã sắp xếp) các số ≥3 chữ số trùng nhau từng trường.
// Số ngày/tháng 1–2 chữ số không so (VI viết "3/10/1962", EN viết "3 October 1962" —
// cùng dữ kiện, cách viết khác); số ≥3 chữ số gồm năm, calibre, mốc thời lượng.
const so = (t) => (t.match(/\d{3,}/g) || []).sort().join(',');
for (let i = 0; i < 7; i++) {
  const j = json.milestones[i];
  for (const k of ['reference', 'label', 'change', 'note']) {
    const ok = so(j[k].vi) === so(j[k].en);
    dat(`G3 ${j.hoSoId} ${k}: số VI/EN tương ứng`, ok, `[${so(j[k].vi)}] vs [${so(j[k].en)}]`);
  }
}

// G4: đăng ký + slug duy nhất
const dangKy = fs.readFileSync(TEP_DANG_KY, 'utf8');
dat('G4 import + DATASETS đăng ký Speedmaster',
  dangKy.includes("import { omegaSpeedmasterEvolution } from './omegaSpeedmasterEvolution';") &&
  /DATASETS[^;]*\[omegaSpeedmasterEvolution,/.test(dangKy.replace(/\s+/g, ' ')));
const cacSlug = [];
for (const f of fs.readdirSync('src/data').filter((f) => f.endsWith('.ts') && f !== 'modelEvolution.ts')) {
  const s = fs.readFileSync(path.join('src/data', f), 'utf8');
  for (const m of s.matchAll(/slug:\s*'([^']+)'/g)) cacSlug.push(m[1] + ' (' + f + ')');
}
dat('G4 slug "omega-speedmaster" duy nhất toàn src/data', cacSlug.filter((s) => s.startsWith('omega-speedmaster')).length === 1, cacSlug.join(' · '));

// G7a — vòng sửa 1 (TXN-20260919-4): nguồn hai bài không còn 105.012/145.012
// (trước đó còn ở frontmatter references[] và hiển thị công khai ở bảng thông số)
const RE_REF = /105\.012|145\.012/;
for (const f of ['src/content/mauIconic/vi/omega-speedmaster.md', 'src/content/mauIconic/en/omega-speedmaster.md']) {
  const m = fs.readFileSync(f, 'utf8').match(RE_REF);
  dat(`G7a nguồn sạch 105.012/145.012 — ${f}`, !m, m ? `còn: "${m[0]}"` : '');
}

// ---- G5/G6: dist (chạy sau build)
if (!fs.existsSync('dist')) {
  dat('G5/G6 dist', false, 'chưa có dist — hãy chạy npm run build trước');
} else {
  const duong = (lang, slug) => path.join('dist', ...(lang === 'vi' ? ['mau-iconic'] : ['en', 'iconic-watches']), slug, 'index.html');
  const duKienModel = new Set(['omega-speedmaster', 'rolex-submariner', 'rolex-gmt-master']);
  const thayTrenRoute = [];
  for (const slug of duKienModel) {
    for (const lang of ['vi', 'en']) {
      const p = duong(lang, slug);
      if (fs.existsSync(p) && fs.readFileSync(p, 'utf8').includes('data-evolution')) thayTrenRoute.push(`${lang}:${slug}`);
    }
  }
  dat('G5 sơ đồ chỉ render đúng 3 route mô hình × VI/EN', thayTrenRoute.length === 6, thayTrenRoute.sort().join(' · '));

  // không route nào khác (mọi trang iconic) chứa sơ đồ
  let lech = [];
  for (const thuMuc of [['dist', 'mau-iconic'], ['dist', 'en', 'iconic-watches']]) {
    const gocRoute = path.join(...thuMuc);
    for (const slug of fs.readdirSync(gocRoute)) {
      const p = path.join(gocRoute, slug, 'index.html');
      if (!fs.existsSync(p)) continue;
      if (!duKienModel.has(slug) && fs.readFileSync(p, 'utf8').includes('data-evolution')) lech.push(p);
    }
  }
  dat('G5 không sơ đồ nào lọt route khác', lech.length === 0, lech.join(' · '));

  // 7 nút + 7 URL nguồn ở cả hai route Speedmaster
  for (const lang of ['vi', 'en']) {
    const html = fs.readFileSync(duong(lang, 'omega-speedmaster'), 'utf8');
    const soNut = (html.match(/class="evol-btn/g) || []).length;
    dat(`G5 ${lang} có đúng 7 nút mốc`, soNut === 7, `${soNut} nút`);
    const thieu = json.milestones.filter((m) => !html.includes(m.sourceUrl));
    dat(`G5 ${lang} đủ 7 URL nguồn hồ sơ`, thieu.length === 0, thieu.map((m) => m.hoSoId).join(','));
  }

// G6: 8 nhóm claim cũ biến mất ở hai route Speedmaster (thân bài sau khi loại HTML)
  const CAM = [
    ['V1 duy nhất từng', /duy nhất từng|đầu tiên — và duy nhất/i],
    ['V1 only-ever', /only professional watch|first — and only/i],
    ['V2 bí mật mua', /bí mật mua/i],
    ['V2 quietly bought', /quietly bought/i],
    ['V3 danh sách bài thử', /sốc, chân không|shocks, vacuum/i],
    ['V4 105.012/145.012 lên Mặt Trăng', /references that actually went to the Moon|\(1964–1969\)|chính các thế hệ này/i],
    ['V6 năm 3570.50', /1996–2014|\(1996/i],
    ['V5 hiếm/sưu tầm', /cực hiếm|được sưu tầm|rare and eagerly|eagerly collected/i],
    ['V7 bộ hẹn giờ tàu', /bộ hẹn giờ|onboard timer/i],
    ['V8 rotor không trọng lực', /rotor/i],
  ];
  for (const lang of ['vi', 'en']) {
    const html = fs.readFileSync(duong(lang, 'omega-speedmaster'), 'utf8').replace(/<[^>]*>/g, ' ');
    for (const [ten, re] of CAM) {
      const m = html.match(re);
      dat(`G6 ${lang} sạch ${ten}`, !m, m ? `còn: "${m[0]}"` : '');
    }
  }

  // G7b — vòng sửa 1 (TXN-20260919-4): dist THÔ (giữ nguyên HTML — bắt cả bảng thông số,
  // schema, meta) hai route Speedmaster không còn 105.012/145.012
  for (const lang of ['vi', 'en']) {
    const html = fs.readFileSync(duong(lang, 'omega-speedmaster'), 'utf8');
    const m = html.match(RE_REF);
    dat(`G7b dist thô ${lang} sạch 105.012/145.012`, !m, m ? `còn: "${m[0]}"` : '');
  }

  // hồi quy: Submariner + GMT giữ nguyên số mốc
  for (const [slug, soMoc] of [['rolex-submariner', 8], ['rolex-gmt-master', 8]]) {
    for (const lang of ['vi', 'en']) {
      const html = fs.readFileSync(duong(lang, slug), 'utf8');
      dat(`G5 hồi quy ${lang}:${slug} đủ ${soMoc} nút`, (html.match(/class="evol-btn/g) || []).length === soMoc);
    }
  }
}

console.log('');
console.log(errors.length === 0 ? 'KẾT LUẬN: ĐẠT — sơ đồ Speedmaster khớp hồ sơ, đúng route, sạch claim cũ' : `KẾT LUẬN: KHÔNG ĐẠT (${errors.length} ca)`);
process.exit(errors.length === 0 ? 0 : 1);
