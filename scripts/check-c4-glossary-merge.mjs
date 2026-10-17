// C4 — checker gộp trang từ điển trùng: alias /en/glossary/escapement/ chuyển hướng 308
// về /en/glossary/escape-wheel/ (vercel.json), bài cũ loại khỏi tập công khai (draft),
// liên kết nội bộ không còn trỏ alias, trang đích tồn tại. Dist (--dist): alias không
// còn bài, đích có, sitemap (đọc theo sitemap-index) không còn alias, hub đủ đúng tập
// thẻ, tập route /en/glossary/ khớp slug; --nen <dist nền 0702978>: toàn bộ tập route
// chỉ khác nền đúng một route alias (C4-D6).
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
let root = REPO;
let distDir = null;
let nenDir = null;
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--root' || args[i] === '--dist' || args[i] === '--nen') {
    const v = args[i + 1];
    if (v == null || v.startsWith('--')) { console.error('KHONG DAT C4-ARG: ' + args[i] + ' thiếu giá trị'); process.exit(1); }
    if (args[i] === '--root') root = resolve(v);
    else if (args[i] === '--dist') distDir = resolve(v);
    else nenDir = resolve(v);
    i++;
  }
  else { console.error('KHONG DAT C4-ARG: tham số không hợp lệ ' + args[i]); process.exit(1); }
}

const loi = [];
const fail = (ma, msg) => loi.push(ma + ': ' + msg);
const đọc = (f) => { try { return readFileSync(join(root, f), 'utf8'); } catch { return null; } };

// N1. vercel.json: mỗi source alias đúng 1 mục, 308 thuần (đích đúng, permanent,
// không regex, không điều kiện kèm has/missing/scheme/host...), không source lạ
let vercel = đọc('vercel.json');
if (!vercel) fail('C4-N1', 'thiếu vercel.json');
else {
  let j = null;
  try { j = JSON.parse(vercel); } catch (e) { fail('C4-N1', 'vercel.json hỏng: ' + e.message); }
  if (j) {
    const cần = [
      { source: '/en/glossary/escapement', destination: '/en/glossary/escape-wheel/', permanent: true },
      { source: '/en/glossary/escapement/', destination: '/en/glossary/escape-wheel/', permanent: true },
    ];
    for (const c of cần) {
      const khớp = (j.redirects ?? []).filter((r) => r.source === c.source);
      if (khớp.length !== 1) { fail('C4-N1', 'redirect ' + c.source + ' phải đúng 1 mục, thấy ' + khớp.length); continue; }
      const r = khớp[0];
      const dư = Object.keys(r).filter((k) => k !== 'source' && k !== 'destination' && k !== 'permanent');
      if (r.destination !== c.destination || r.permanent !== true || r.regex || dư.length)
        fail('C4-N1', 'redirect không thuần 308: ' + c.source + (dư.length ? ' (kèm điều kiện: ' + dư.join(', ') + ')' : ''));
    }
    const lạ = (j.redirects ?? []).filter((r) => String(r.source).includes('glossary/escapement') && !cần.some((c) => c.source === r.source));
    if (lạ.length) fail('C4-N1', 'redirect glossary/escapement lạ: ' + lạ.map((r) => r.source).join(', '));
  }
}

// N2. escapement.md — đọc draft từ FRONTMATTER thật (giữa --- mở và --- đóng),
// không tính draft: true nằm ở thân bài; thiếu tệp = fail
const esc = đọc('src/content/tuDien/en/escapement.md');
if (!esc) fail('C4-N2', 'thiếu src/content/tuDien/en/escapement.md');
else {
  const khớpFm = esc.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!khớpFm) fail('C4-N2', 'escapement.md không có frontmatter --- ... ---');
  else {
    if (!/^draft:\s*true\s*$/m.test(khớpFm[1])) fail('C4-N2', 'frontmatter escapement.md thiếu dòng draft: true');
    if (!/^custom_slug:\s*"escapement"\s*$/m.test(khớpFm[1])) fail('C4-N2', 'frontmatter escapement.md mất custom_slug: "escapement"');
  }
  if (!esc.includes('/en/glossary/escape-wheel/')) fail('C4-N2', 'escapement.md không dẫn sang đích mới');
}

// N3. 4 tệp nội dung: THIẾU TỆP = FAIL; có tệp thì không được còn trỏ alias
const TỆP_N3 = [
  'src/content/coChe/en/anti-magnetism.md',
  'src/content/coChe/en/shock-protection.md',
  'src/content/tuDien/en/calibre.md',
  'src/content/tuDien/en/incabloc.md',
];
for (const f of TỆP_N3) {
  const s = đọc(f);
  if (s == null) fail('C4-N3', 'thiếu tệp nội dung ' + f);
  else if (s.includes('/en/glossary/escapement/')) fail('C4-N3', f + ' còn liên kết tới alias');
}

// N4. Trang đích tồn tại, không draft (frontmatter)
const đích = đọc('src/content/tuDien/en/escape-wheel.md');
if (!đích) fail('C4-N4', 'thiếu trang đích escape-wheel.md');
else {
  const khớpFm = đích.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (khớpFm && /^draft:\s*true\s*$/m.test(khớpFm[1])) fail('C4-N4', 'trang đích bị draft');
}

// Tập slug công khai = toàn bộ .md trong tuDien/en trừ alias (dùng cho D3 + D5)
const slugSrc = existsSync(join(root, 'src', 'content', 'tuDien', 'en'))
  ? readdirSync(join(root, 'src', 'content', 'tuDien', 'en'))
      .filter((f) => f.endsWith('.md') && f !== 'escapement.md')
      .map((f) => f.replace(/[.]md$/, ''))
      .sort()
  : [];
if (!slugSrc.length) fail('C4-N4', 'không đọc được tập slug công khai tuDien/en');

if (distDir != null) {
  // D1. alias không có bài; đích có
  if (existsSync(join(distDir, 'en', 'glossary', 'escapement', 'index.html')))
    fail('C4-D1', 'dist còn bài alias /en/glossary/escapement/');
  if (!existsSync(join(distDir, 'en', 'glossary', 'escape-wheel', 'index.html')))
    fail('C4-D1', 'dist thiếu trang đích escape-wheel');

  // D2. đọc sitemap-index: mọi sitemap con được tham chiếu phải tồn tại, không
  // chứa alias, và ít nhất một sitemap con chứa trang đích escape-wheel
  const idxPath = join(distDir, 'sitemap-index.xml');
  if (!existsSync(idxPath)) fail('C4-D2', 'dist thiếu sitemap-index.xml');
  else {
    const idx = readFileSync(idxPath, 'utf8');
    const urls = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    if (!urls.length) fail('C4-D2', 'sitemap-index.xml không tham chiếu sitemap con nào');
    const con = urls.map((u) => u.replace(/^https?:\/\/[^/]+\//, '').split('?')[0]);
    let cóĐích = false;
    for (const c of con) {
      const p = join(distDir, c);
      if (!existsSync(p)) { fail('C4-D2', 'sitemap-index trỏ tới tệp thiếu: ' + c); continue; }
      const txt = readFileSync(p, 'utf8');
      if (txt.includes('/en/glossary/escapement')) fail('C4-D2', c + ' còn alias');
      if (txt.includes('/en/glossary/escape-wheel/')) cóĐích = true;
    }
    if (con.length && !cóĐích) fail('C4-D2', 'không sitemap con nào chứa trang đích escape-wheel');
  }

  // D3. hub: tập thẻ bài (href /en/glossary/<slug>/) phải đủ và đúng tập slug
  // công khai — không chỉ tìm chuỗi alias
  const hub = join(distDir, 'en', 'glossary', 'index.html');
  if (!existsSync(hub)) fail('C4-D3', 'dist thiếu hub /en/glossary/');
  else {
    const html = readFileSync(hub, 'utf8');
    if (html.includes('/en/glossary/escapement')) fail('C4-D3', 'hub còn liên kết alias');
    const thẻ = [...new Set([...html.matchAll(/href="\/en\/glossary\/([^"\/]+)\/"/g)].map((m) => decodeURIComponent(m[1])))].sort();
    const thiếu = slugSrc.filter((x) => !thẻ.includes(x));
    const thua = thẻ.filter((x) => !slugSrc.includes(x));
    if (thiếu.length) fail('C4-D3', 'hub thiếu thẻ bài: ' + thiếu.join(', '));
    if (thua.length) fail('C4-D3', 'hub có thẻ lạ: ' + thua.join(', '));
  }

  // D4. tripwire chuỗi trong pagefind/*.js|json — bằng chứng Pagefind THẬT do
  // kịch bản kiểm riêng (kiểm-pagefind-thật.mjs: API tìm kiếm trên dist phục vụ
  // HTTP) đảm nhiệm; rule này KHÔNG được ghi là đã chứng minh Pagefind sạch
  const pfDir = join(distDir, 'pagefind');
  if (!existsSync(pfDir)) fail('C4-D4', 'dist thiếu pagefind');
  else {
    let pfText = '';
    const quet = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) quet(p); else if (/[.](js|json)$/.test(f)) { try { pfText += readFileSync(p, 'utf8'); } catch {} } } };
    quet(pfDir);
    if (pfText.includes('glossary/escapement')) fail('C4-D4', 'Pagefind còn trả alias (tripwire chuỗi)');
  }

  // D5. tập route /en/glossary/ khớp tập slug công khai (đủ, không thừa)
  const glDir = join(distDir, 'en', 'glossary');
  if (!existsSync(glDir)) fail('C4-D5', 'dist thiếu /en/glossary/');
  else {
    const slugDist = readdirSync(glDir).filter((f) => statSync(join(glDir, f)).isDirectory() && f !== 'escapement').sort();
    const thieu = slugSrc.filter((x) => !slugDist.includes(x));
    const thua = slugDist.filter((x) => !slugSrc.includes(x));
    if (thieu.length) fail('C4-D5', 'dist thiếu route: ' + thieu.join(', '));
    if (thua.length) fail('C4-D5', 'dist thừa route: ' + thua.join(', '));
  }

  // D6. đối chiếu toàn bộ tập route (mọi .html) với nền --nen: chỉ được mất đúng
  // route alias, không được mất/thêm route nào khác
  if (nenDir != null) {
    // nền --nen: thư mục dist HOẶC tệp .txt danh sách route (bằng chứng cố định)
    const quetHtml = (d, tiền) => {
      let k = [];
      for (const f of readdirSync(d)) {
        const p = join(d, f);
        if (statSync(p).isDirectory()) k = k.concat(quetHtml(p, tiền + f + '/'));
        else if (f.endsWith('.html')) k.push(tiền + f);
      }
      return k;
    };
    let routeNen = null;
    if (existsSync(nenDir) && statSync(nenDir).isFile()) {
      routeNen = readFileSync(nenDir, 'utf8').split(/\r?\n/).map((x) => x.trim()).filter(Boolean).sort();
    } else if (existsSync(nenDir)) {
      routeNen = quetHtml(nenDir, '').sort();
    }
    if (routeNen == null) fail('C4-D6', 'nền --nen không tồn tại: ' + nenDir);
    else {
      const routeDist = quetHtml(distDir, '').sort();
      const mất = routeNen.filter((r) => !routeDist.includes(r));
      const thêm = routeDist.filter((r) => !routeNen.includes(r));
      if (mất.join('|') !== 'en/glossary/escapement/index.html')
        fail('C4-D6', 'route mất so với nền (ngoài alias) : ' + (mất.join(', ') || '(không)'));
      if (thêm.length) fail('C4-D6', 'route thêm so với nền: ' + thêm.join(', '));
    }
  }
}

if (loi.length) {
  console.error('KHONG DAT bo kiem C4 (' + loi.length + ' loi):');
  for (const l of loi) console.error('  ' + l);
  process.exit(1);
}
console.log('DAT bo kiem C4: redirect 308 x2 + draft frontmatter + liên kết sạch + trang đích tồn tại' + (distDir != null ? ' + dist đúng tập' : '') + (nenDir != null ? ' + route khớp nền' : ''));
