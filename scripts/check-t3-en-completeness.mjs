#!/usr/bin/env node
// =============================================================================
// check-t3-en-completeness.mjs (T3, GD3) — kiểm 15 cặp bài EN còn thiếu
// =============================================================================
// 15 cặp: 10 mục từ điển + 5 bài cơ chế (TXN-20260926-290).
//
// Chạy KHÔNG tham số  → kiểm nguồn (T3-1..T3-6).
// Chạy `dist`        → kiểm nguồn + kiểm dist (T3-7..T3-10).
//
//   T3-1  Bảng ánh xạ 15 cặp: tệp VI và tệp EN tồn tại, custom_slug EN khớp
//         slug trong cặp, không trùng slug.
//   T3-2  Trọn vẹn bảng cặp: mọi tệp EN trong tuDien/en và coChe/en đều có cặp
//         trong ARTICLE_PAIRS (trừ whitelist legacy), mọi cặp trỏ tới tệp có
//         thật → xóa/đổi một cặp nền nào cũng bị bắt.
//   T3-3  URL nguồn của bản EN khớp bản VI tương ứng, giữ đúng thứ tự.
//   T3-4  Bản EN sạch tiếng Việt: thân bài + nhãn nguồn không còn ký tự
//         tiếng Việt ngoài danh sách tên riêng cho phép (kèm tự kiểm).
//   T3-5  Số từ thân bài tối thiểu 150 cho từng bản EN.
//   T3-6  Frontmatter song song: term_en, category, difficulty (coChe) khớp
//         bản VI; sourceNotes hiện diện; EN tắt infographic (quy ước EN ẩn).
//   T3-7  Dist: 15 trang EN + 15 trang VI tồn tại; đúng 1 H1; canonical,
//         hreflang en/vi và nút chuyển ngôn ngữ hai chiều đúng cặp.
//   T3-8  Dist: mọi link nội bộ trong <article> của trang EN là route /en/
//         tồn tại trong dist — không link nhầm về route VI. Miễn trừ tài sản
//         tĩnh /videos/ (link "Mở tệp video" của PrincipleVideo, không phải
//         route nội dung).
//   T3-9  Dist: khối source-notes render TRƯỚC khối source-list, nội dung
//         ghi chú có thật trong HTML tĩnh.
//   T3-10 Dist: Pagefind lập chỉ mục từng trang (fragments .pf_fragment giải
//         nén được, chứa nội dung ghi chú nguồn) và sitemap chứa đủ 15 URL EN.
//
// Biến môi trường cho mutation trên bản sao ngoài repo:
//   T3_ROOT  — gốc cây nguồn (mặc định cwd)
//   T3_DIST  — thư mục dist (mặc định <T3_ROOT>/dist)
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gunzipSync } from 'node:zlib';

const ROOT = process.env.T3_ROOT ?? process.cwd();
const KIEM_DIST = process.argv[2] === 'dist';
const DIST = process.env.T3_DIST ?? join(ROOT, 'dist');
const SITE = 'https://www.kienthucdonghoco.vn';

const errors = [];
const report = [];
const ok = (id, msg) => report.push(`${id}  ${msg}`);
const fail = (id, msg) => errors.push(`${id}  ${msg}`);

// ---- Bảng ánh xạ 15 cặp (slug VI = tên tệp VI; slug EN = custom_slug EN) ----
const CAPS = [
  { col: 'tuDien', vi: 'bezel', en: 'bezel' },
  { col: 'tuDien', vi: 'cau-may', en: 'bridge' },
  { col: 'tuDien', vi: 'day-vo', en: 'caseback' },
  { col: 'tuDien', vi: 'khoa-day', en: 'clasp' },
  { col: 'tuDien', vi: 'lo-may', en: 'skeleton' },
  { col: 'tuDien', vi: 'microbrand', en: 'microbrand' },
  { col: 'tuDien', vi: 'ngua', en: 'pallet-fork' },
  { col: 'tuDien', vi: 'poincon-de-geneve', en: 'geneva-seal' },
  { col: 'tuDien', vi: 'vat-canh', en: 'anglage' },
  { col: 'tuDien', vi: 'vau-day', en: 'lug' },
  { col: 'coChe', vi: 'bo-may-in-house', en: 'in-house-movements' },
  { col: 'coChe', vi: 'bo-thoat-dong-truc', en: 'co-axial-escapement' },
  { col: 'coChe', vi: 'da-quang', en: 'lume' },
  { col: 'coChe', vi: 'hien-thi-ngay', en: 'date-display' },
  { col: 'coChe', vi: 'kinh-dong-ho', en: 'watch-crystals' },
];

const ROUTE_VI = { tuDien: '/tu-dien', coChe: '/co-che' };
const ROUTE_EN = { tuDien: '/en/glossary', coChe: '/en/mechanisms' };
const viRoute = (c) => `${ROUTE_VI[c.col]}/${c.vi}`;
const enRoute = (c) => `${ROUTE_EN[c.col]}/${c.en}/`;

// Whitelist legacy: trang tương thích giữ địa chỉ cũ (G06-C), không có bản VI.
const LEGACY_EN_KHONG_CAP = ['tuDien/en/escapement.md'];

// ---- Đọc + tách frontmatter / thân bài --------------------------------------
const docCache = new Map();
function doc(col, lang, slug) {
  const key = `${col}/${lang}/${slug}`;
  if (!docCache.has(key)) {
    const p = join(ROOT, 'src', 'content', col, lang, `${slug}.md`);
    if (!existsSync(p)) {
      docCache.set(key, null);
    } else {
      const text = readFileSync(p, 'utf8');
      const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
      docCache.set(key, m ? { fm: m[1], body: m[2], path: p } : null);
    }
  }
  return docCache.get(key);
}

function trichUrls(fm) {
  return [...fm.matchAll(/^\s*url:\s*"([^"]+)"/gm)].map((m) => m[1]);
}

function trichSourceNotes(fm) {
  const m = fm.match(/^sourceNotes:\s*\r?\n([\s\S]*?)(?=\r?\n[a-zA-Z_]+:|$)/m);
  if (!m) return [];
  return [...m[1].matchAll(/-\s+"([\s\S]*?)"\s*$/gm)].map((x) => x[1]);
}

function fieldStr(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'));
  return m ? m[1] : undefined;
}

// Đếm từ thân bài (phương pháp N2: bỏ frontmatter, code, URL, dấu Markdown)
function demTu(body) {
  let t = body;
  t = t.replace(/```[\s\S]*?```/g, ' ');
  t = t.replace(/`[^`]*`/g, ' ');
  t = t.replace(/<!--[\s\S]*?-->/g, ' ');
  t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ');
  t = t.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
  t = t.replace(/https?:\/\/\S+/g, ' ');
  t = t.replace(/[#>*_~|]/g, ' ');
  return t.split(/\s+/).filter(Boolean).length;
}

// Ký tự tiếng Việt có dấu (đồng bộ check-english-launch)
const viCharRe = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;

// Tên riêng/cụm nguồn cho phép trong bản EN (loại TRƯỚC khi quét dấu).
// Cụm tiêu đề hướng dẫn tiếng Việt được trích nguyên văn trong bài microbrand
// là dẫn nguồn — chuỗi đầy đủ duy nhất được loại, chữ Việt thật đặt cạnh vẫn bị bắt.
const TU_RIENG_CHO_PHEP = [
  'Microbrand là gì — mô hình đang thay đổi thị trường đồng hồ cơ giá vừa',
  'Poinçon de Genève', 'Poinçon', 'Genève',
  'Côtes de Genève', 'Côtes',
  'Guilloché', 'guilloché', 'Perlage', 'perlage',
  'Ébauche', 'ébauche', 'établisseur', 'Établisseur', 'chronomètre',
];
function boTuRieng(text) {
  let t = text;
  for (const noun of [...TU_RIENG_CHO_PHEP].sort((a, b) => b.length - a.length)) {
    t = t.split(noun).join('');
  }
  return t;
}
// Tự kiểm allowlist chạy mỗi lần — sai thì checker báo lỗi ngay
{
  const qua = !viCharRe.test(boTuRieng('Poinçon de Genève — établisseur ébauche'))
    && !viCharRe.test(boTuRieng('Microbrand là gì — mô hình đang thay đổi thị trường đồng hồ cơ giá vừa" (guide)'));
  const vanBat = viCharRe.test(boTuRieng('Poinçon de Genève là gì'))
    && viCharRe.test(boTuRieng('Microbrand là gì — mô hình đang thay đổi thị trường đồng hồ cơ giá vừa của bài tiếng Việt'));
  if (!qua || !vanBat) {
    fail('T3-4', `Tự kiểm danh sách tên riêng sai: qua=${qua}, vẫn-bắt-VI=${vanBat}`);
  }
}

function sachTiengViet(id, vienVanBan) {
  const con = viCharRe.test(boTuRieng(vienVanBan));
  if (con) {
    const mau = boTuRieng(vienVanBan).match(/[^\s]*[ăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỵ][^\s]*/i)?.[0] ?? '?';
    fail(id, `Còn ký tự tiếng Việt (từ mẫu: "${mau}")`);
    return false;
  }
  return true;
}

// ---- T3-1..T3-6 — kiểm nguồn -------------------------------------------------
const duLieuCap = [];
for (const cap of CAPS) {
  const vi = doc(cap.col, 'vi', cap.vi);
  const en = doc(cap.col, 'en', cap.en);
  const id = `T3-1 ${cap.col}/${cap.vi}`;
  if (!vi || !en) {
    fail(id, 'Thiếu tệp VI hoặc tệp EN');
    continue;
  }
  const slugEn = fieldStr(en.fm, 'custom_slug');
  const slugVi = fieldStr(vi.fm, 'custom_slug');
  if (slugEn !== cap.en || (slugVi !== undefined && slugVi !== cap.vi)) {
    fail(id, `custom_slug lệch (en="${slugEn}", vi="${slugVi}")`);
    continue;
  }
  duLieuCap.push({ cap, vi, en });

  // T3-3 — nguồn khớp từng URL, đúng thứ tự
  const urlsVi = trichUrls(vi.fm);
  const urlsEn = trichUrls(en.fm);
  if (urlsVi.length === urlsEn.length && urlsVi.every((u, i) => u === urlsEn[i]) && urlsVi.length > 0) {
    ok('T3-3', `${cap.vi} → ${cap.en}: ${urlsVi.length} URL nguồn khớp, đúng thứ tự`);
  } else {
    fail('T3-3', `${cap.vi} → ${cap.en}: URL nguồn lệch (VI ${urlsVi.length} / EN ${urlsEn.length} hoặc khác thứ tự)`);
  }

  // T3-4 — thân bài + nhãn nguồn sạch tiếng Việt
  const nhanEn = [...en.fm.matchAll(/^\s*label:\s*"([^"]+)"/gm)].map((m) => m[1]).join(' ');
  const sach = sachTiengViet('T3-4', `${en.body} ${nhanEn}`);
  if (sach) ok('T3-4', `${cap.en}: thân bài + nhãn nguồn sạch tiếng Việt (trừ tên riêng)`);

  // T3-5 — số từ thân bài tối thiểu 150
  const soTu = demTu(en.body);
  if (soTu >= 150) {
    ok('T3-5', `${cap.en}: ${soTu} từ thân bài (≥150)`);
  } else {
    fail('T3-5', `${cap.en}: chỉ ${soTu} từ thân bài (<150)`);
  }

  // T3-6 — frontmatter song song
  const loiFm = [];
  if (fieldStr(en.fm, 'term_en') !== fieldStr(vi.fm, 'term_en')) loiFm.push('term_en');
  if (fieldStr(en.fm, 'category') !== fieldStr(vi.fm, 'category')) loiFm.push('category');
  if (cap.col === 'coChe') {
    if (fieldStr(en.fm, 'difficulty') !== fieldStr(vi.fm, 'difficulty')) loiFm.push('difficulty');
    if (fieldStr(en.fm, 'has_infographic') !== 'false') loiFm.push('has_infographic phải false (EN ẩn infographic)');
    if (fieldStr(en.fm, 'interactive') !== 'false') loiFm.push('interactive phải false (EN ẩn infographic)');
  }
  if (trichSourceNotes(en.fm).length === 0) loiFm.push('sourceNotes trống');
  if (!fieldStr(en.fm, 'excerpt')) loiFm.push('excerpt trống');
  if (loiFm.length === 0) {
    ok('T3-6', `${cap.en}: term_en/category/sourceNotes đồng bộ${cap.col === 'coChe' ? ', EN tắt infographic' : ''}`);
  } else {
    fail('T3-6', `${cap.en}: ${loiFm.join('; ')}`);
  }
}
if (duLieuCap.length === CAPS.length) {
  ok('T3-1', `Đủ ${CAPS.length} cặp, tệp VI/EN tồn tại, slug khớp, không trùng`);
}

// ---- T3-2 — trọn vẹn bảng cặp ARTICLE_PAIRS ----------------------------------
const crText = readFileSync(join(ROOT, 'src', 'i18n', 'contentRoutes.ts'), 'utf8');
const mangCap = crText.match(/export const ARTICLE_PAIRS[\s\S]*?\n\];/)?.[0] ?? '';
const cacCap = [...mangCap.matchAll(/\{\s*vi:\s*'([^']+)'\s*,\s*en:\s*'([^']+)'\s*\}/g)].map((m) => ({ vi: m[1], en: m[2] }));
const setEn = new Set(cacCap.map((p) => p.en));
const setVi = new Set(cacCap.map((p) => p.vi));
if (cacCap.length === 0) {
  fail('T3-2', 'Không đọc được cặp nào từ ARTICLE_PAIRS');
} else if (setEn.size !== cacCap.length) {
  fail('T3-2', `Trùng route EN trong ARTICLE_PAIRS (${cacCap.length} mục, ${setEn.size} duy nhất)`);
} else {
  const thieuCapKhaiBao = CAPS.filter((c) => !setVi.has(viRoute(c)) || !setEn.has(enRoute(c)));
  if (thieuCapKhaiBao.length > 0) {
    fail('T3-2', `Thiếu cặp khai báo: ${thieuCapKhaiBao.map((c) => viRoute(c)).join(', ')}`);
  } else {
    // Mọi tệp EN phải có cặp (trừ whitelist legacy) — xóa cặp nền nào cũng bị bắt
    const thieu = [];
    for (const col of ['tuDien', 'coChe']) {
      const dir = join(ROOT, 'src', 'content', col, 'en');
      for (const f of readdirSync(dir).filter((x) => x.endsWith('.md'))) {
        const rel = `${col}/en/${f}`;
        if (LEGACY_EN_KHONG_CAP.includes(rel)) continue;
        const d = doc(col, 'en', f.replace(/\.md$/, ''));
        const slug = d ? fieldStr(d.fm, 'custom_slug') ?? f.replace(/\.md$/, '') : f.replace(/\.md$/, '');
        if (!setEn.has(`${ROUTE_EN[col]}/${slug}/`)) thieu.push(rel);
      }
    }
    if (thieu.length === 0) {
      ok('T3-2', `${cacCap.length} cặp; đủ 15 cặp T3; mọi tệp EN đều có cặp (trừ ${LEGACY_EN_KHONG_CAP.length} whitelist legacy)`);
    } else {
      fail('T3-2', `Tệp EN không có cặp trong ARTICLE_PAIRS: ${thieu.join(', ')}`);
    }
  }
}

// ---- T3-7..T3-10 — kiểm dist --------------------------------------------------
function routeTonTai(href) {
  const clean = href.replace(/\/$/, '').split(/[?#]/)[0];
  return existsSync(join(DIST, clean, 'index.html')) || existsSync(join(DIST, `${clean}.html`));
}

function probe(ghiChu) {
  const tu = ghiChu.split(/\s+/).filter((w) => !/[&<>]/.test(w));
  return tu.slice(0, 6).join(' ');
}

// Nhiều probe từ MỌI ghi chú nguồn, nhiều độ dài — chịu Pagefind cắt/nén nội dung
function cacProbe(fm) {
  const out = [];
  for (const n of trichSourceNotes(fm)) {
    const tu = n.split(/\s+/).filter((w) => !/[&<>"']/.test(w));
    for (const k of [6, 4, 3]) {
      if (tu.length >= k) out.push(tu.slice(0, k).join(' '));
    }
  }
  return out;
}

if (KIEM_DIST) {
  // Sitemap: đọc MỌI tệp sitemap*.xml trong dist — không cố định tên/số phần
  // (astro:sitemap có thể tách sitemap-0/1/… hoặc đặt sitemap.xml tùy cấu hình).
  const sitemapFiles = existsSync(DIST)
    ? readdirSync(DIST).filter((f) => /^sitemap.*\.xml$/i.test(f))
    : [];
  const sitemapLocs = new Set();
  for (const f of sitemapFiles) {
    for (const m of readFileSync(join(DIST, f), 'utf8').matchAll(/<loc>([^<]*)<\/loc>/g)) {
      sitemapLocs.add(m[1].replace(/\/+$/, ''));
    }
  }
  const urlTrongSitemap = (route) => sitemapLocs.has((SITE + route).replace(/\/+$/, ''));

  // Pagefind: quét mọi .pf_fragment dưới dist/pagefind (bất kể cấu trúc thư mục
  // con), giải nén, khóa map theo URL ĐÃ chuẩn hóa dấu "/" cuối.
  const mapPagefind = new Map();
  let pfDoc = 0;
  let pfLoi = 0;
  const quetPagefind = (dir) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) quetPagefind(p);
      else if (f.endsWith('.pf_fragment')) {
        try {
          const s = gunzipSync(readFileSync(p)).toString('utf8');
          const obj = JSON.parse(s.slice(s.indexOf('{')));
          if (typeof obj.url === 'string') {
            mapPagefind.set(obj.url.replace(/\/+$/, ''), obj.content ?? '');
            pfDoc += 1;
          }
        } catch { pfLoi += 1; }
      }
    }
  };
  const pfDirGoc = existsSync(join(DIST, 'pagefind'));
  if (pfDirGoc) quetPagefind(join(DIST, 'pagefind'));
  const routeKey = (r) => r.replace(/\/+$/, '');

  for (const { cap, en } of duLieuCap) {
    const vEn = enRoute(cap);
    const vVi = viRoute(cap);
    const tepEn = join(DIST, vEn.replace(/^\//, ''), 'index.html');
    const tepVi = join(DIST, vVi.replace(/^\//, ''), 'index.html');
    const id = `T3-7 ${cap.vi}`;
    if (!existsSync(tepEn) || !existsSync(tepVi)) {
      fail(id, `Thiếu trang dist (${vEn} hoặc ${vVi})`);
      continue;
    }
    const htmlEn = readFileSync(tepEn, 'utf8');
    const htmlVi = readFileSync(tepVi, 'utf8');
    const loi = [];

    const soH1 = (htmlEn.match(/<h1[\s\S]*?<\/h1>/g) ?? []).length;
    if (soH1 !== 1) loi.push(`H1=${soH1}`);

    const canonical = htmlEn.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical !== SITE + vEn) loi.push(`canonical=${canonical}`);

    const hlEn = htmlEn.match(/<link rel="alternate" hreflang="en" href="([^"]+)"/)?.[1];
    const hlVi = htmlEn.match(/<link rel="alternate" hreflang="vi" href="([^"]+)"/)?.[1];
    const hlViSangEn = htmlVi.match(/<link rel="alternate" hreflang="en" href="([^"]+)"/)?.[1];
    if (hlEn !== SITE + vEn) loi.push(`hreflang en=${hlEn}`);
    if (hlVi !== SITE + vVi) loi.push(`hreflang vi=${hlVi}`);
    if (hlViSangEn !== SITE + vEn) loi.push(`hreflang VI→EN=${hlViSangEn}`);

    // Mọi nút chuyển ngôn ngữ trên trang (header, footer, panel) cùng trỏ đúng cặp
    const nutSangVi = [...htmlEn.matchAll(/<a\b[^>]*hreflang="vi"[^>]*>/g)]
      .map((m) => m[0].match(/href="([^"]+)"/)?.[1]);
    const nutSangEn = [...htmlVi.matchAll(/<a\b[^>]*hreflang="en"[^>]*>/g)]
      .map((m) => m[0].match(/href="([^"]+)"/)?.[1]);
    if (nutSangVi.length > 0 && nutSangVi.every((h) => h === vVi)) {
      // đủ
    } else loi.push(`switcher EN→VI=${nutSangVi.join(',')}`);
    if (nutSangEn.length > 0 && nutSangEn.every((h) => h === vEn)) {
      // đủ
    } else loi.push(`switcher VI→EN=${nutSangEn.join(',')}`);

    if (loi.length === 0) ok('T3-7', `${vEn}: 1 H1, canonical, hreflang và switcher hai chiều đúng cặp`);
    else fail(id, loi.join('; '));

    // T3-8 — link nội bộ trong <article> chỉ trỏ route /en/ tồn tại
    // (miễn trừ /videos/ — link "Mở tệp video" của PrincipleVideo là tài sản
    // tĩnh, không phải route nội dung hai ngôn ngữ)
    const bai = htmlEn.match(/<article[\s\S]*?<\/article>/)?.[0] ?? '';
    const linkNoiBo = [...bai.matchAll(/href="(\/[^"#]*)"/g)]
      .map((m) => m[1])
      .filter((h) => !h.startsWith('/videos/'));
    // "/en" chính xác là trang chủ EN (breadcrumb trong article) — vẫn là route EN
    const saiNgonNgu = linkNoiBo.filter((h) => h !== '/en' && !h.startsWith('/en/'));
    const hong = linkNoiBo.filter((h) => h.startsWith('/en/') && !routeTonTai(h));
    if (saiNgonNgu.length === 0 && hong.length === 0) {
      ok('T3-8', `${vEn}: ${linkNoiBo.length} link nội bộ trong article — đều /en/ và tồn tại`);
    } else {
      fail(`T3-8 ${cap.vi}`, `sai ngôn ngữ: ${saiNgonNgu.join(', ')}; hỏng: ${hong.join(', ')}`);
    }

    // T3-9 — source-notes render trước source-list, nội dung có trong HTML
    const ghiChuDau = trichSourceNotes(en.fm)[0] ?? '';
    const oGhiChu = htmlEn.indexOf('class="source-notes');
    const oNguon = htmlEn.indexOf('class="source-list');
    const dau = probe(ghiChuDau);
    if (oGhiChu >= 0 && oNguon >= 0 && oGhiChu < oNguon && htmlEn.includes(dau)) {
      ok('T3-9', `${vEn}: source-notes trước source-list, nội dung ghi chú có trong HTML`);
    } else {
      fail(`T3-9 ${cap.vi}`, `notes=${oGhiChu}, list=${oNguon}, probe="${dau}" có=${htmlEn.includes(dau)}`);
    }

    // T3-10 — Pagefind lập chỉ mục + sitemap chứa URL (tiêu chí cứng giữ nguyên:
    // đúng 15 route EN phải có trong sitemap; fragment đúng route phải đọc được
    // và chứa nội dung sourceNotes). Fail luôn kèm bằng chứng chẩn đoán.
    const noiDungPf = mapPagefind.get(routeKey(vEn));
    const probes = cacProbe(en.fm);
    const trongPf = typeof noiDungPf === 'string' && probes.some((p) => noiDungPf.includes(p));
    const trongSitemap = urlTrongSitemap(vEn);
    if (trongPf && trongSitemap) {
      ok('T3-10', `${vEn}: Pagefind indexed (${pfDoc} fragment), sitemap có URL (${sitemapFiles.length} tệp)`);
    } else {
      fail(`T3-10 ${cap.vi}`, `pagefind=${trongPf}, sitemap=${trongSitemap} | dist/pagefind: ${pfDirGoc ? 'có' : 'THIẾU'}, fragment đọc được ${pfDoc}, lỗi ${pfLoi}, route trong map: ${mapPagefind.has(routeKey(vEn))} | tệp sitemap: ${sitemapFiles.join(', ') || 'KHÔNG CÓ'}, số <loc>: ${sitemapLocs.size}`);
    }
  }
}

// ---- Kết luận -----------------------------------------------------------------
console.log('KIỂM TRA T3 — 15 CẶP BÀI EN CÒN THIẾU' + (KIEM_DIST ? ' (kèm dist)' : ' (nguồn)'));
for (const line of report) console.log(`  ĐẠT  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — đủ 15 cặp, nguồn khớp, song ngữ sạch.');
