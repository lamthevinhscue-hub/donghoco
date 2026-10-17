// C2 — checker video "học được" (câu lệnh TXN-20261015-43).
// Nguồn (mặc định):
//   N1 src/data/c2-video-learning.json: đúng tập 36 MP4 hiện hành (không thiếu/trùng/giao ngôn ngữ),
//      mỗi mục: ngôn ngữ đúng, phụ đề + bản chữ + hình tóm tắt + truy vết đầy đủ, bản chữ không rỗng.
//   N2 public/videos/captions: 36 VTT tồn tại, UTF-8, WEBVTT, mốc hợp lệ tăng dần, không vượt thời
//      lượng MP4 (ffprobe). MP4 và poster cũ giữ nguyên SHA-256 so với baseline фикс.
//   N3 public/images/video-summaries: 36 hình tồn tại.
//   N4 PrincipleVideo.astro: track + <details> + hình chỉ render khi có dữ liệu; hai nơi gọi hưởng qua
//      component; không autoplay; preload="none" giữ nguyên; fallback giữ nguyên.
//   N5 package.json: checker nguồn nối trước check:types; dist C2 trước A3 dist cuối.
// Dist (--dist <dir>):
//   D1 hai trang chủ dist có track đúng URL/ngôn ngữ + bản chữ (details/summary + số đoạn) + hình
//      tóm tắt đúng src trong khối video của trang.
//   D2 bản EN không nhận lời đọc/label VI và ngược lại.
//   D3 không autoplay, preload="none", fallback còn.
// Tham số lạ/thiếu giá trị → exit 1 mã C2-ARG.
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parse5Parse } from 'parse5';

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const rawArgs = process.argv.slice(2);
let root = REPO;
let distDir = null;
for (let i = 0; i < rawArgs.length; i++) {
  const a = rawArgs[i];
  if (a === '--root' || a === '--dist') {
    const v = rawArgs[i + 1];
    if (v == null || v.startsWith('--')) { console.error(`KHONG DAT C2-ARG: ${a} thiếu giá trị`); process.exit(1); }
    if (a === '--root') root = resolve(v); else distDir = resolve(v);
    i++;
  } else { console.error(`KHONG DAT C2-ARG: tham số không hợp lệ "${a}"`); process.exit(1); }
}


// Fixture đọc từ --root (checkout đang kiểm), không phải repo chứa script — thiếu/hỏng phải FAIL có mã rõ
const baselinePath = join(root, 'scripts', 'fixtures', 'c2-baseline-sha.json');
if (!existsSync(baselinePath)) { console.error(`KHONG DAT C2-N0: thiếu fixture ${baselinePath} trong cây --root`); process.exit(1); }
let baseSha;
try { baseSha = JSON.parse(readFileSync(baselinePath, 'utf8')); }
catch (e) { console.error(`KHONG DAT C2-N0: fixture hỏng ${baselinePath}: ${e.message}`); process.exit(1); }
for (const khoa of ['mp4', 'jpg', 'thoi_luong']) {
  if (!baseSha[khoa] || typeof baseSha[khoa] !== 'object') { console.error(`KHONG DAT C2-N0: fixture thiếu nhóm ${khoa}`); process.exit(1); }
}

const loi = [];
const fail = (rule, msg) => loi.push(`${rule}: ${msg}`);
const boChuThichHtml = (s) => s.replace(/<!--[\s\S]*?-->/g, ' ');
function tachAstro(s) {
  const dau = s.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!dau) return { frontmatter: '', markup: s };
  return { frontmatter: dau[1], markup: s.slice(dau[0].length) };
}
const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
function getText(node) {
  // chỉ tính nút chữ đọc được — bỏ comment, script, style, template (nội dung giả trong đó không tính)
  let out = '';
  const duyet = (n) => {
    if (n.nodeName === '#comment') return;
    if (/^(script|style|template)$/i.test(n.nodeName ?? '')) return;
    if (n.nodeName === '#text' && typeof n.value === 'string') out += n.value + ' ';
    for (const con of n.childNodes ?? []) duyet(con);
  };
  duyet(node);
  return out.replace(/\s+/g, ' ');
}

// ---- N1: dữ liệu C2 đúng tập 36 MP4 ----
const dataPath = join(root, 'src', 'data', 'c2-video-learning.json');
if (!existsSync(dataPath)) { console.error('KHONG DAT C2-N1: thiếu dữ liệu ' + dataPath); process.exit(1); }
let duLieu;
try { duLieu = JSON.parse(readFileSync(dataPath, 'utf8')); } catch (e) { console.error('KHONG DAT C2-N1: JSON hỏng: ' + e.message); process.exit(1); }
const ax = duLieu.anh_xa ?? {};
const duKienMp4 = new Set(Object.keys(baseSha.mp4));
const trongDuLieu = new Set(Object.keys(ax));
for (const f of duKienMp4) if (!trongDuLieu.has('/videos/' + f)) fail('C2-N1', `thiếu ánh xạ cho ${f}`);
for (const f of trongDuLieu) if (!duKienMp4.has(f.replace(/^\/videos\//, ''))) fail('C2-N1', `ánh xạ trỏ MP4 không thuộc tập 36: ${f}`);
for (const [mp4, m] of Object.entries(ax)) {
  const ng = mp4.match(/-(vi|en)\.mp4$/)?.[1];
  if (m.ngan_ngu !== ng) fail('C2-N1', `${mp4} ngôn ngữ ${m.ngan_ngu} ≠ hậu tố ${ng}`);
  if (!m.phu_de?.vtt || !m.phu_de?.nguon) fail('C2-N1', `${mp4} thiếu phụ đề/nguồn phụ đề`);
  if (!Array.isArray(m.lo_doc) || m.lo_doc.length === 0 || m.lo_doc.some((d) => !d.chu || !d.chu.trim())) fail('C2-N1', `${mp4} bản chữ rỗng/thiếu`);
  if (!m.hinh_tom_tat?.src || !m.hinh_tom_tat?.alt) fail('C2-N1', `${mp4} thiếu hình tóm tắt/alt`);
  if (!m.truy_vet?.loi_doc) fail('C2-N1', `${mp4} thiếu truy vết nguồn`);
}

// ---- N2: VTT 36 tệp hợp lệ + trong thời lượng + MP4/poster giữ SHA baseline ----
let mp4Lech = [];
for (const f of duKienMp4) {
  const mp4 = join(root, 'public', 'videos', f);
  if (!existsSync(mp4)) { fail('C2-N2', `thiếu MP4 ${f}`); continue; }
  const sha = sha256(mp4);
  if (baseSha.mp4[f] && sha !== baseSha.mp4[f]) mp4Lech.push(f);
  const jpg = f.replace(/\.mp4$/, '.jpg');
  const jpgPath = join(root, 'public', 'videos', jpg);
  if (!existsSync(jpgPath)) { fail('C2-N2', `thiếu poster ${jpg}`); continue; }
  const shaJ = sha256(jpgPath);
  if (baseSha.jpg[jpg] && shaJ !== baseSha.jpg[jpg]) mp4Lech.push(jpg);
}
if (mp4Lech.length) fail('C2-N2', `MP4/poster lệch SHA baseline: ${mp4Lech.join(', ')}`);
let vttOk = 0;
const giay = (moc) => moc.split(':').reduce((a, y) => a * 60 + +y, 0);
for (const [mp4Key, m] of Object.entries(ax)) {
  const f = m.phu_de.vtt.replace(/^\//, '');
  const p = join(root, 'public', f);
  if (!existsSync(p)) { fail('C2-N2', `thiếu VTT ${f}`); continue; }
  const buf = readFileSync(p);
  const s = buf.toString('utf8');
  if (s.charCodeAt(0) === 0xfeff) { fail('C2-N2', `${f} có BOM`); continue; }
  if (!s.startsWith('WEBVTT')) { fail('C2-N2', `${f} không bắt đầu WEBVTT`); continue; }
  // phân tích TỪNG cue: mốc + nguyên văn phải khớp từng đoạn lời đọc trong dữ liệu C2
  const cues = [];
  for (const khoi of s.replace(/^WEBVTT[^\n]*\n/, '').split(/\n\n+/)) {
    const g = khoi.trim().match(/^(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\s*\n?([\s\S]*)$/);
    if (!g) { if (khoi.trim()) fail('C2-N2', `${f} có khối không phải cue: ${khoi.trim().slice(0, 40)}`); continue; }
    cues.push({ sRaw: g[1], eRaw: g[2], s: giay(g[1]), e: giay(g[2]), text: g[3].replace(/\r/g, '').trim() });
  }
  const loDoc = m.lo_doc ?? [];
  if (cues.length !== loDoc.length) { fail('C2-N2', `${f} số cue ${cues.length} ≠ số đoạn lời đọc ${loDoc.length}`); continue; }
  let hopLe = true;
  for (let i = 0; i < cues.length; i++) {
    const d = loDoc[i] ?? {};
    if (cues[i].sRaw !== (d.bat_dau ?? '').trim() || cues[i].eRaw !== (d.ket_thuc ?? '').trim()) { fail('C2-N2', `${f} cue ${i + 1} mốc ${cues[i].sRaw} --> ${cues[i].eRaw} ≠ dữ liệu ${d.bat_dau} --> ${d.ket_thuc}`); hopLe = false; }
    if (cues[i].text !== String(d.chu ?? '').replace(/\r/g, '').trim()) { fail('C2-N2', `${f} cue ${i + 1} chữ không khớp nguyên văn: "${cues[i].text.slice(0, 40)}" ≠ "${String(d.chu ?? '').slice(0, 40)}"`); hopLe = false; }
  }
  if (cues.some((c) => c.s >= c.e)) { fail('C2-N2', `${f} mốc không hợp lệ`); hopLe = false; }
  let tang = true;
  for (let i = 1; i < cues.length; i++) if (cues[i].s < cues[i - 1].s) tang = false;
  if (!tang) { fail('C2-N2', `${f} mốc không tăng dần`); hopLe = false; }
  const tl = baseSha.thoi_luong?.[mp4Key.replace('/videos/', '')];
  if (!Number.isFinite(tl)) { fail('C2-N2', `${f} fixture thiếu thời lượng ${mp4Key}`); continue; }
  if (cues.length && cues[cues.length - 1].e > tl + 0.05) { fail('C2-N2', `${f} cue cuối ${cues[cues.length - 1].e.toFixed(3)}s vượt thời lượng ${tl.toFixed(3)}s`); hopLe = false; }
  if (hopLe) vttOk++;
}

// ---- N3: hình tóm tắt 36 tệp tồn tại ----
for (const [mp4Key, m] of Object.entries(ax)) {
  if (!m.hinh_tom_tat?.src) { fail('C2-N3', `${mp4Key} thiếu hinh_tom_tat.src`); continue; }
  const f = m.hinh_tom_tat.src.replace(/^\//, '');
  const p = join(root, 'public', f);
  if (!existsSync(p)) fail('C2-N3', `thiếu hình ${f}`);
}

// ---- N4: PrincipleVideo + hai nơi gọi hưởng qua component ----
const pvPath = join(root, 'src', 'components', 'PrincipleVideo.astro');
if (!existsSync(pvPath)) fail('C2-N4', 'thiếu PrincipleVideo.astro');
else {
  const s = readFileSync(pvPath, 'utf8');
  if (!/import\s+c2DuLieu\s+from\s+'[^']*c2-video-learning\.json'/.test(s)) fail('C2-N4', 'PrincipleVideo không nạp dữ liệu C2');
  if (!/kind="subtitles"/.test(s)) fail('C2-N4', 'thiếu track subtitles');
  if (!/<details/.test(s) || !/<summary/.test(s)) fail('C2-N4', 'thiếu bản chữ details/summary');
  if (!/loading="lazy"/.test(s)) fail('C2-N4', 'hình tóm tắt không tải lười');
  if (/autoplay/.test(s)) fail('C2-N4', 'có autoplay');
  if (!/preload="none"/.test(s)) fail('C2-N4', 'mất preload="none"');
}
const haiGoi = [join(root, 'src', 'pages', 'index.astro'), join(root, 'src', 'pages', 'en', 'index.astro')];
for (const g of haiGoi) {
  if (!existsSync(g)) { fail('C2-N4', `thiếu nơi gọi ${g}`); continue; }
  const { markup } = tachAstro(readFileSync(g, 'utf8'));
  const markupSach = boChuThichHtml(markup);
  // prop A4 chỉ tính trong markup có hiệu lực — chú thích HTML/frontmatter không tính
  if (!markupSach.includes('meta_description={tr.home_meta_description}')) fail('C2-N4', `${g} mất prop A4 meta_description trong markup (phải giữ nguyên)`);
}

// ---- N5: package.json nối đúng vị trí ----
const pkgText = readFileSync(join(root, 'package.json'), 'utf8');

if (!pkgText.includes('node scripts/check-c2-video-learning.mjs && node scripts/check-d10-accuracy-discovery.mjs && node scripts/check-a4-home-description.mjs && node scripts/check-a2-speed-insights.mjs')) {
  fail('C2-N5', 'chuỗi nguồn C2 → D10 → A4 → A2 phải liền nhau');
}
if (!pkgText.includes('node scripts/check-c2-video-learning.mjs --dist dist && node scripts/check-c4-glossary-merge.mjs --dist dist && node scripts/check-d10-accuracy-discovery.mjs --dist dist && node scripts/check-a3-icons.mjs dist"')) {
  fail('C2-N5', 'chuỗi dist C2 → C4 → D10 → A3 phải liền nhau ở cuối build');
}
if (!pkgText.includes('node scripts/check-c1-videos.mjs --dist dist && node scripts/check-a4-home-description.mjs --dist dist')) {
  fail('C2-N5', 'C1 dist phải chạy đầy đủ phía trước C2 dist');
}

// ---- D1/D2/D3 dist: track + bản chữ + hình trong khối video của đúng bài; ngôn ngữ đúng ----
let taiSan = 0;
if (distDir != null) {
  // 18 cặp route bài cơ chế có video nguyên lý (MechanismArticle/BalanceHairspringChapter)
  // route VI: /co-che/<slug-nguyen-ly>/ ; route EN: tra bảng contentRoutes (bảng cặp đã đối chiếu)
  const ROUTE_EN = {
    'bo-thoat-nguyen-ly': '/en/mechanisms/escapement/',
    'bo-thoat-dong-truc-nguyen-ly': '/en/mechanisms/co-axial-escapement/',
    'chong-nuoc-nguyen-ly': '/en/mechanisms/water-resistance/',
    'chong-soc-nguyen-ly': '/en/mechanisms/shock-protection/',
    'chong-tu-nguyen-ly': '/en/mechanisms/anti-magnetism/',
    'chuyen-dong-co-nguyen-ly': '/en/mechanisms/how-a-mechanical-watch-works/',
    'da-quang-nguyen-ly': '/en/mechanisms/lume/',
    'day-toc-banh-lac-nguyen-ly': '/en/mechanisms/balance-and-hairspring/',
    'gmt-nguyen-ly': '/en/mechanisms/gmt/',
    'hien-thi-ngay-nguyen-ly': '/en/mechanisms/date-display/',
    'kinh-dong-ho-nguyen-ly': '/en/mechanisms/watch-crystals/',
    'len-day-tu-dong-nguyen-ly': '/en/mechanisms/automatic-winding/',
    'perpetual-calendar-nguyen-ly': '/en/mechanisms/perpetual-calendar/',
    'pha-trang-nguyen-ly': '/en/mechanisms/moon-phase/',
    'tourbillon-nguyen-ly': '/en/mechanisms/tourbillon/',
    'tru-cot-nguyen-ly': '/en/mechanisms/power-reserve/',
    'chronograph-nguyen-ly': '/en/mechanisms/chronograph/',
    'diem-chuong-nguyen-ly': '/en/mechanisms/minute-repeater/',
  };
  const tapTrang = [];
  // slug tệp (có -nguyen-ly) ≠ slug route (bỏ -nguyen-ly)
  const slugRoute = (tenTep) => tenTep.replace('-nguyen-ly', '');
  for (const slug of new Set(Object.keys(ROUTE_EN))) {
    const slugR = slugRoute(slug);
    const vi = { duong: join(distDir, 'co-che', slugR, 'index.html'), route: '/co-che/' + slugR + '/', lang: 'vi', vtt: `/videos/captions/${slug}-vi.vtt`, hinh: `/images/video-summaries/${slug}-vi.jpg`, tep: slug };
    const en = { duong: join(distDir, ROUTE_EN[slug].slice(1), 'index.html'), route: ROUTE_EN[slug], lang: 'en', vtt: `/videos/captions/${slug}-en.vtt`, hinh: `/images/video-summaries/${slug}-en.jpg`, tep: slug };
    tapTrang.push({ slug, slugR, vi, en });
  }
  for (const { slug, vi, en } of tapTrang) {
    for (const [ng, t] of [['vi', vi], ['en', en]]) {
      if (!existsSync(t.duong)) { fail('C2-D1', `thiếu ${t.route}`); continue; }
      let dom;
      try { dom = parse5Parse(readFileSync(t.duong, 'utf8')); } catch (e) { fail('C2-D1', `${t.route} HTML không phân tích được: ${e.message}`); continue; }
      const htmlNode = dom.childNodes.find((n) => n.nodeName === 'html');
      const bodyNode = htmlNode?.childNodes.find((n) => n.nodeName === 'body');
      if (!bodyNode) { fail('C2-D1', `${t.route} thiếu body`); continue; }
      // tìm khối PrincipleVideo của đúng MP4: <video> có <source src="/videos/<tên>-<ng>.mp4">
      const mp4src = `/videos/${slug}-${ng}.mp4`;
      let videoEl = null;
      const tim = (node) => {
        for (const con of node.childNodes ?? []) {
          if (con.nodeName === 'video') {
            const src = (con.childNodes ?? []).find((n) => n.nodeName === 'source');
            const srcAttrs = src ? Object.fromEntries((src.attrs ?? []).map((a) => [a.name, a.value])) : {};
            if (srcAttrs.src === mp4src) { videoEl = con; return; }
          }
          tim(con);
          if (videoEl) return;
        }
      };
      tim(bodyNode);
      if (!videoEl) { fail('C2-D1', `${t.route} không có <video> cho ${mp4src}`); continue; }
      const vAttrs = Object.fromEntries((videoEl.attrs ?? []).map((a) => [a.name, a.value]));
      if (vAttrs.autoplay != null) fail('C2-D3', `${t.route} có autoplay`);
      if (vAttrs.preload !== 'none') fail('C2-D3', `${t.route} preload ≠ "none"`);
      if (vAttrs.controls == null) fail('C2-D1', `${t.route} mất controls`);
      if (vAttrs.playsinline == null) fail('C2-D1', `${t.route} mất playsinline`);
      const tracks = (videoEl.childNodes ?? []).filter((n) => n.nodeName === 'track');
      if (tracks.length !== 1) { fail('C2-D1', `${t.route} track phải đúng 1 (thấy ${tracks.length})`); continue; }
      const tAttrs = Object.fromEntries((tracks[0].attrs ?? []).map((a) => [a.name, a.value]));
      const nhanDung = ng === 'vi' ? 'Tiếng Việt' : 'English';
      if (tAttrs.kind !== 'subtitles' || tAttrs.srclang !== ng || tAttrs.label !== nhanDung || tAttrs.src !== `/videos/captions/${slug}-${ng}.vtt`) {
        fail('C2-D1', `${t.route} track sai (kind=${tAttrs.kind}, srclang=${tAttrs.srclang}, label=${tAttrs.label}, src=${tAttrs.src})`);
      }
      // bản chữ: khối details trong cùng figure — đủ TOÀN BỘ đoạn lời đọc đúng thứ tự, đúng ngôn ngữ
      const mData = ax['/videos/' + slug + '-' + ng + '.mp4'];
      const loDoc = (mData?.lo_doc ?? []);
      const figureCha = videoEl.parentNode?.nodeName === 'figure' ? videoEl.parentNode : null;
      const detailsTrong = figureCha ? (figureCha.childNodes ?? []).filter((n) => n.nodeName === 'details') : [];
      if (detailsTrong.length !== 1) { fail('C2-D1', `${t.route} khối PrincipleVideo phải có đúng 1 bản chữ details (thấy ${detailsTrong.length})`); continue; }
      const vanBan = getText(detailsTrong[0]).replace(/\s+/g, ' ');
      let viTriTruoc = -1;
      for (let i = 0; i < loDoc.length; i++) {
        const doan = (loDoc[i].chu ?? '').replace(/\s+/g, ' ').trim();
        const viTri = vanBan.indexOf(doan);
        if (doan && viTri === -1) { fail('C2-D1', `${t.route} bản chữ thiếu đoạn ${i + 1}: ${doan.slice(0, 50)}…`); continue; }
        if (viTri <= viTriTruoc) { fail('C2-D1', `${t.route} bản chữ đoạn ${i + 1} sai thứ tự`); continue; }
        viTriTruoc = viTri;
      }
      // hình tóm tắt: trong cùng figure — src/alt/lazy/width/height
      const imgs = [];
      const quetImg = (n) => { for (const con of n.childNodes ?? []) { if (con.nodeName === 'img') imgs.push(con); quetImg(con); } };
      quetImg(figureCha);
      const imgTomEl = imgs.find((x) => (Object.fromEntries((x.attrs ?? []).map((a) => [a.name, a.value])).src ?? '') === mData?.hinh_tom_tat?.src);
      if (!imgTomEl) { fail('C2-D1', `${t.route} thiếu hình tóm tắt đúng src ${mData?.hinh_tom_tat?.src} trong khối`); }
      else {
        const iA = Object.fromEntries((imgTomEl.attrs ?? []).map((a) => [a.name, a.value]));
        if (!iA.alt || iA.alt.trim() === '') fail('C2-D1', `${t.route} hình tóm tắt thiếu alt`);
        if (iA.loading !== 'lazy') fail('C2-D1', `${t.route} hình tóm tắt không lazy`);
        if (iA.width == null || iA.height == null) fail('C2-D1', `${t.route} hình tóm tắt thiếu width/height`);
      }
      let fallbackEl = null;
      const quetA = (n) => { for (const con of n.childNodes ?? []) { if (con.nodeName === 'a') fallbackEl = con; quetA(con); } };
      quetA(videoEl);
      const aAttrs = fallbackEl ? Object.fromEntries((fallbackEl.attrs ?? []).map((a) => [a.name, a.value])) : {};
      if (aAttrs.href !== mp4src) fail('C2-D1', `${t.route} fallback link sai MP4 (href=${aAttrs.href})`);
    }
  }
  // D2 chéo ngôn ngữ trên 18 cặp: trang VI không chứa câu đầu EN và ngược lại
  for (const { vi, en } of tapTrang) {
    const cauDau = (ng) => {
      const tenMp4 = `/videos/${vi.tep}-${ng}.mp4`;
      const m = ax[tenMp4];
      return m?.lo_doc?.[0]?.chu ?? null;
    };
    const cauVi = cauDau('vi'), cauEn = cauDau('en');
    if (cauVi && existsSync(en.duong) && readFileSync(en.duong, 'utf8').includes(cauVi)) fail('C2-D2', `${en.route} nhận lời đọc VI`);
    if (cauEn && existsSync(vi.duong) && readFileSync(vi.duong, 'utf8').includes(cauEn)) fail('C2-D2', `${vi.route} nhận lời đọc EN`);
  }
  // D4: dist phải có tài sản thật (VTT + hình tóm tắt), byte-match với public
  taiSan = 0;
  for (const m of Object.values(ax)) {
    const vttPub = join(root, 'public', m.phu_de.vtt.replace(/^\//, ''));
    const vttDist = join(distDir, m.phu_de.vtt.replace(/^\//, ''));
    if (!existsSync(vttDist) || sha256(vttDist) !== sha256(vttPub)) { fail('C2-D4', `dist thiếu/lệch VTT ${m.phu_de.vtt}`); continue; }
    const hPub = join(root, 'public', m.hinh_tom_tat.src.replace(/^\//, ''));
    const hDist = join(distDir, m.hinh_tom_tat.src.replace(/^\//, ''));
    if (!existsSync(hDist) || sha256(hDist) !== sha256(hPub)) { fail('C2-D4', `dist thiếu/lệch hình ${m.hinh_tom_tat.src}`); continue; }
    taiSan++;
  }
}

if (loi.length) {
  console.error(`KHONG DAT bo kiem C2 (${loi.length} loi):`);
  for (const l of loi) console.error('  ' + l);
  process.exit(1);
}
console.log(`DAT bo kiem C2: ${duKienMp4.size} MP4 ánh xạ + ${vttOk} VTT khớp nguyên văn + hình tóm tắt + component${distDir != null ? ` + dist track/bản chữ/hình + ngôn ngữ đúng + ${taiSan}/36 cặp tài sản dist byte-match` : ''}`);
