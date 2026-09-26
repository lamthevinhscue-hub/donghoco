// =============================================================================
// check-k4-en-glossary-filter.mjs — Kiểm K4: bộ lọc nhóm glossary tiếng Anh
// =============================================================================
// Hai chế độ (giống các checker cụm khác):
//   node scripts/check-k4-en-glossary-filter.mjs        → kiểm SOURCE (npm run check)
//   node scripts/check-k4-en-glossary-filter.mjs dist   → kiểm SOURCE + DIST (npm run build)
// Nguồn dữ liệu thật: frontmatter của src/content/tuDien/en/*.md (bỏ bản nháp)
// và GLOSSARY_CATEGORY_ORDER đọc từ src/i18n/ui.ts — không ghi tay số lượng.
// Nhóm kiểm:
//   K4-1  Nguồn: trang EN nhóm theo GLOSSARY_CATEGORY_ORDER, bỏ nhóm rỗng
//   K4-2  Nguồn: hàng nút lọc — nút All + nút theo nhóm, count suy từ dữ liệu
//   K4-3  Nguồn: cơ chế lọc data-* + aria-pressed + nút button thật, không tải lại
//   K4-4  Nguồn: chưa có bộ lọc theo bảng chữ cái (hoãn theo kế hoạch)
//   K4-5  Dữ liệu: đếm entry EN theo nhóm từ frontmatter (dùng chung K4-2/K4-6)
//   K4-6  (dist) H1 duy nhất; nút/nhóm/count khớp dữ liệu; href trỏ route thật;
//         script lọc không xóa node; canonical/hreflang/switcher; /tu-dien/ nguyên vẹn;
//         sitemap số URL /en/glossary = entry + 1
// Exit 1 nếu có lỗi. Env: K4_ROOT để chạy trên bản sao.
// =============================================================================
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import * as path from 'node:path';
const { join } = path;

const ROOT = path.resolve(process.env.K4_ROOT ?? process.cwd());
const DIST = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? null;
const distDir = DIST ? (path.isAbsolute(DIST) ? DIST : path.join(ROOT, DIST)) : null;

const errors = [];
const fail = (id, msg) => {
  errors.push(`[${id}] ${msg}`);
  console.log(`  LỖI  [${id}] ${msg}`);
};
const pass = (id, msg) => console.log(`  ĐẠT  [${id}] ${msg}`);

// ---- K4-5: dữ liệu entry EN từ frontmatter + thứ tự nhóm từ i18n/ui.ts
const uiSrc = readFileSync(join(ROOT, 'src', 'i18n', 'ui.ts'), 'utf8');
const orderMatch = uiSrc.match(/GLOSSARY_CATEGORY_ORDER\s*=\s*\[([\s\S]*?)\]/);
const ORDER = orderMatch ? [...orderMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]) : [];
if (ORDER.length === 0) {
  fail('K4-5', 'Không đọc được GLOSSARY_CATEGORY_ORDER từ src/i18n/ui.ts');
}

const thuMucEn = join(ROOT, 'src', 'content', 'tuDien', 'en');
const demTheoNhom = new Map();
let tongEntry = 0;
if (existsSync(thuMucEn)) {
  for (const ten of readdirSync(thuMucEn).filter((t) => t.endsWith('.md'))) {
    const noi = readFileSync(join(thuMucEn, ten), 'utf8');
    const fm = (noi.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [])[1] ?? '';
    if (/^draft:\s*true\b/m.test(fm)) continue;
    const cat = ((fm.match(/^category:\s*"?([^"\n]+)"?\s*$/m) || [])[1] ?? '').trim();
    if (!cat) {
      fail('K4-5', `Tệp ${ten} không đọc được category`);
      continue;
    }
    demTheoNhom.set(cat, (demTheoNhom.get(cat) ?? 0) + 1);
    tongEntry += 1;
  }
} else {
  fail('K4-5', 'Thiếu src/content/tuDien/en/');
}
const nhomDuLieu = ORDER.filter((c) => (demTheoNhom.get(c) ?? 0) > 0);
const lechTong = [...demTheoNhom.values()].reduce((a, b) => a + b, 0);
if (lechTong !== tongEntry) fail('K4-5', `Tổng đếm nhóm ${lechTong} ≠ tổng entry ${tongEntry}`);
if (errors.length === 0) {
  pass(
    'K4-5',
    `Dữ liệu EN: ${tongEntry} mục / ${nhomDuLieu.length} nhóm (từ frontmatter): ` +
      nhomDuLieu.map((c) => `${c}=${demTheoNhom.get(c)}`).join(', '),
  );
}

// ---- K4-1: nguồn nhóm theo order, bỏ nhóm rỗng
const trangPath = join(ROOT, 'src', 'pages', 'en', 'glossary', 'index.astro');
if (!existsSync(trangPath)) {
  fail('K4-1', 'Thiếu src/pages/en/glossary/index.astro');
}
const trang = existsSync(trangPath) ? readFileSync(trangPath, 'utf8') : '';
const coImport = /import\s*\{[^}]*GLOSSARY_CATEGORY_ORDER[^}]*\}\s*from\s*'[^']*i18n\/ui'/.test(trang);
const coMapOrder = /GLOSSARY_CATEGORY_ORDER\s*\.\s*map\s*\(/.test(trang);
const coBoNhomRong = /\.filter\(\s*\(g\)\s*=>\s*g\.items\.length\s*>\s*0\s*\)/.test(trang);
const coEntriesEn = /getEntriesByLang\(\s*'tuDien'\s*,\s*'en'\s*\)/.test(trang);
if (coImport && coMapOrder && coBoNhomRong && coEntriesEn) {
  pass('K4-1', 'Nguồn: entry tuDien EN → nhóm theo GLOSSARY_CATEGORY_ORDER → bỏ nhóm rỗng');
} else {
  fail('K4-1', `import=${coImport} mapOrder=${coMapOrder} boNhomRong=${coBoNhomRong} entriesEn=${coEntriesEn}`);
}

// ---- K4-2: hàng nút lọc (All + từng nhóm), count suy từ dữ liệu
const coHangNut = /id="en-cat-filter"/.test(trang);
const coNutAll = /data-cat="all"/.test(trang);
const coNutNhom = /data-cat=\{g\.category\}/.test(trang);
const coAriaTinh = /data-cat="all"[\s\S]{0,200}?aria-pressed="true"/.test(trang.replace(/\r/g, ''));
const coCountAll = /All\s*\(\{entries\.length\}\)/.test(trang);
const coCountNhom = /\(\{g\.items\.length\}\)/.test(trang);
if (coHangNut && coNutAll && coNutNhom && coAriaTinh && coCountAll && coCountNhom) {
  pass('K4-2', 'Nguồn: nút All (entries.length) + nút theo nhóm (g.items.length) trong #en-cat-filter, aria-pressed khởi tạo đúng');
} else {
  fail('K4-2', `hangNut=${coHangNut} nutAll=${coNutAll} nutNhom=${coNutNhom} ariaTinh=${coAriaTinh} countAll=${coCountAll} countNhom=${coCountNhom}`);
}

// ---- K4-3: cơ chế lọc data-* + aria-pressed + nút button, không tải lại trang
const coNutButton = /<button\s+type="button"\s+data-cat=/.test(trang);
const coNhomData = /data-cat-group=\{group\.category\}/.test(trang);
const coScriptNut = /querySelectorAll(<HTMLButtonElement>)?\(\s*'\.en-filter-btn'\s*\)/.test(trang);
const coScriptNhom = /querySelectorAll(<HTMLElement>)?\(\s*'\.en-cat-group'\s*\)/.test(trang);
const coSetAria = /setAttribute\(\s*'aria-pressed'\s*,/.test(trang);
const coToggleAn = /classList\.toggle\(\s*'hidden'/.test(trang);
const khongTaiLai = !/location\.|window\.open|\.submit\(\)/.test(trang);
if (coNutButton && coNhomData && coScriptNut && coScriptNhom && coSetAria && coToggleAn && khongTaiLai) {
  pass('K4-3', 'Nguồn: button thật + data-cat ↔ data-cat-group + toggle hidden + aria-pressed cập nhật, không tải lại trang');
} else {
  fail('K4-3', `button=${coNutButton} nhomData=${coNhomData} scriptNut=${coScriptNut} scriptNhom=${coScriptNhom} setAria=${coSetAria} toggle=${coToggleAn} khongTaiLai=${khongTaiLai}`);
}

// ---- K4-4: chưa có bộ lọc theo bảng chữ cái (hoãn đến ngưỡng ~80 mục)
const tuCam = ['data-letter', 'letter-filter', 'letterFilter', 'alphabet-filter', 'alphabetFilter', 'first-letter'];
const giongTuCam = tuCam.filter((t) => trang.includes(t));
const giongBatDauKyTu = /startsWith\s*\(\s*['"`][A-Za-z]['"`]\s*\)/.test(trang);
const coGhiHoan = /80\s*mục/.test(trang);
if (giongTuCam.length === 0 && !giongBatDauKyTu) {
  pass('K4-4', `Nguồn: chưa có bộ lọc theo bảng chữ cái${coGhiHoan ? ' — có ghi chú hoãn đến ngưỡng ~80 mục' : ''}`);
} else {
  fail('K4-4', `Phát hiện dấu vết bộ lọc chữ cái: ${giongTuCam.join(', ') || 'startsWith một ký tự'}`);
}

// ---- K4-6: dist (chỉ chạy khi truyền thư mục dist)
if (distDir) {
  const htmlPath = join(distDir, 'en', 'glossary', 'index.html');
  if (!existsSync(htmlPath)) {
    fail('K4-6', `Không có ${DIST}/en/glossary/index.html — hãy chạy npm run build trước`);
  } else {
    const html = readFileSync(htmlPath, 'utf8');

    // H1 duy nhất
    const soH1 = (html.match(/<h1[\s>]/g) ?? []).length;
    if (soH1 === 1) pass('K4-6', 'Dist: đúng 1 H1 trên /en/glossary/');
    else fail('K4-6', `Dist: tìm thấy ${soH1} thẻ H1 (kỳ vọng 1)`);

    // Nút lọc: số lượng, data-cat, thứ tự, count, aria-pressed
    const nut = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)]
      .map((m) => {
        const attr = m[1];
        const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        const cat = (attr.match(/data-cat="([^"]*)"/) || [])[1] ?? null;
        const aria = (attr.match(/aria-pressed="([^"]*)"/) || [])[1] ?? null;
        const count = (text.match(/\((\d+)\)\s*$/) || [])[1];
        return { cat, aria, count, text };
      })
      .filter((n) => n.cat !== null);
    const kyVongNhom = nhomDuLieu.map((c) => ({ cat: c, count: String(demTheoNhom.get(c)) }));
    const kyVong = [{ cat: 'all', count: String(tongEntry) }, ...kyVongNhom];
    const saiNut = [];
    if (nut.length !== kyVong.length) {
      saiNut.push(`số nút ${nut.length} ≠ kỳ vọng ${kyVong.length}`);
    }
    kyVong.forEach((kv, i) => {
      const n = nut[i];
      if (!n) return;
      if (n.cat !== kv.cat) saiNut.push(`nút ${i + 1}: data-cat "${n.cat}" ≠ "${kv.cat}"`);
      if (n.count !== kv.count) saiNut.push(`nút "${n.cat}": count ${n.count} ≠ ${kv.count}`);
      if (n.aria !== (i === 0 ? 'true' : 'false')) saiNut.push(`nút "${n.cat}": aria-pressed=${n.aria}`);
    });
    if (saiNut.length === 0) {
      pass('K4-6', `Dist: ${nut.length} nút lọc (All=${tongEntry} + ${kyVongNhom.length} nhóm) — data-cat/thứ tự/count/aria-pressed khớp dữ liệu frontmatter`);
    } else {
      fail('K4-6', `Dist nút lọc sai: ${saiNut.join(' | ')}`);
    }

    // Nhóm section: số + giá trị + thứ tự
    const nhomDist = [...html.matchAll(/data-cat-group="([^"]*)"/g)].map((m) => m[1]);
    const dungNhom = nhomDist.length === nhomDuLieu.length && nhomDuLieu.every((c, i) => nhomDist[i] === c);
    if (dungNhom) pass('K4-6', `Dist: ${nhomDist.length} khối nhóm đúng thứ tự GLOSSARY_CATEGORY_ORDER`);
    else fail('K4-6', `Dist khối nhóm ${JSON.stringify(nhomDist)} ≠ kỳ vọng ${JSON.stringify(nhomDuLieu)}`);

    // Thẻ: mỗi href /en/glossary/<slug>/ trỏ route thật; số slug duy nhất = số entry
    const hrefs = [...html.matchAll(/href="(\/en\/glossary\/([^"]+?))"/g)].map((m) => m[1]);
    const duyNhat = [...new Set(hrefs)];
    const thieuRoute = duyNhat.filter((h) => !existsSync(join(distDir, 'en', 'glossary', h.slice('/en/glossary/'.length), 'index.html')));
    const saiHinhThuc = duyNhat.filter((h) => !/\/$/.test(h));
    if (duyNhat.length === tongEntry && thieuRoute.length === 0 && saiHinhThuc.length === 0) {
      pass('K4-6', `Dist: ${duyNhat.length} href duy nhất /en/glossary/<slug>/ — đủ ${tongEntry} mục, mọi route tồn tại trong dist`);
    } else {
      fail('K4-6', `Dist href: duy nhất ${duyNhat.length} (kỳ vọng ${tongEntry}), thiếu route: ${thieuRoute.join(', ') || 'không'}, sai hình thức: ${saiHinhThuc.join(', ') || 'không'}`);
    }

    // Thẻ article: tổng số card = số entry (dữ liệu tĩnh đầy đủ trước khi lọc)
    const soArticle = (html.match(/<article\b/g) ?? []).length;
    if (soArticle === tongEntry) pass('K4-6', `Dist: ${soArticle} thẻ <article> = số entry (mọi nhóm có sẵn trong HTML)`);
    else fail('K4-6', `Dist: ${soArticle} thẻ <article> ≠ ${tongEntry} entry`);

    // Script lọc: chỉ đổi class/aria-pressed, không xóa node.
    // Script có thể inline trong HTML (Astro với script nhỏ) hoặc bundle ra /_astro/.
    const inlineScripts = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    const bundles = [...html.matchAll(/<script[^>]*src="(\/_astro\/[^"]+\.js)"/g)].map((m) => m[1]);
    const jsLoc =
      inlineScripts.find((s) => s.includes('en-filter-btn')) ??
      bundles
        .map((b) => {
          const p = join(distDir, b.replace(/^\//, ''));
          return existsSync(p) ? readFileSync(p, 'utf8') : '';
        })
        .find((s) => s.includes('en-filter-btn')) ??
      null;
    if (jsLoc == null) {
      fail('K4-6', 'Dist: không tìm thấy script bộ lọc nhóm (inline lẫn bundle)');
    } else {
      const dayDu = jsLoc.includes('en-filter-btn') && jsLoc.includes('en-cat-group') && jsLoc.includes('aria-pressed');
      const khongXoaNode = !jsLoc.includes('removeChild') && !jsLoc.includes('innerHTML') && !jsLoc.includes('.remove()');
      if (dayDu && khongXoaNode) {
        pass('K4-6', 'Dist: script bộ lọc — aria-pressed + toggle class, không xóa node (không removeChild/innerHTML/remove)');
      } else {
        fail('K4-6', `Dist script: dayDu=${dayDu} khongXoaNode=${khongXoaNode}`);
      }
    }

    // Canonical + hreflang + switcher
    const canonical = (html.match(/rel="canonical" href="([^"]*)"/) ?? [])[1] ?? '';
    const dungCanonical = /\/en\/glossary\/$/.test(canonical);
    const coHreflangEn = /rel="alternate" hreflang="en" href="[^"]*\/en\/glossary\/"/.test(html);
    const coHreflangVi = /rel="alternate" hreflang="vi" href="[^"]*\/tu-dien"/.test(html);
    const coSwitcher = /<a[^>]*href="\/tu-dien"/.test(html);
    if (dungCanonical && coHreflangEn && coHreflangVi && coSwitcher) {
      pass('K4-6', 'Dist: canonical /en/glossary/ + hreflang en/vi + link về /tu-dien (switcher) còn nguyên');
    } else {
      fail('K4-6', `canonical=${canonical} hrefEn=${coHreflangEn} hrefVi=${coHreflangVi} switcher=${coSwitcher}`);
    }

    // /tu-dien/ dist: vùng lọc tiếng Việt nguyên vẹn
    const tuDienPath = join(distDir, 'tu-dien', 'index.html');
    if (!existsSync(tuDienPath)) {
      fail('K4-6', 'Dist: thiếu tu-dien/index.html');
    } else {
      const td = readFileSync(tuDienPath, 'utf8');
      const nguyenVen = td.includes('id="cat-filter"') && td.includes('filter-btn') && td.includes('data-cat-group');
      if (nguyenVen) pass('K4-6', 'Dist /tu-dien/: #cat-filter + filter-btn + data-cat-group nguyên vẹn (không bị đụng)');
      else fail('K4-6', 'Dist /tu-dien/: mất vùng lọc VN');
    }

    // Sitemap: số URL /en/glossary = entry + 1 trang index
    const sitemaps = readdirSync(distDir).filter((t) => /^sitemap.*\.xml$/.test(t));
    let soUrlGlossary = 0;
    for (const s of sitemaps) {
      const noi = readFileSync(join(distDir, s), 'utf8');
      soUrlGlossary += (noi.match(/<loc>[^<]*\/en\/glossary(\/[^<]*)?<\/loc>/g) ?? []).length;
    }
    if (soUrlGlossary === tongEntry + 1) {
      pass('K4-6', `Sitemap: ${soUrlGlossary} URL /en/glossary (${tongEntry} mục + 1 trang index) — không đổi số lượng`);
    } else {
      fail('K4-6', `Sitemap: ${soUrlGlossary} URL /en/glossary ≠ kỳ vọng ${tongEntry + 1}`);
    }
  }
}

// ---- Kết luận
console.log('KIỂM TRA K4 — BỘ LỌC NHÓM GLOSSARY TIẾNG ANH:');
if (errors.length > 0) {
  console.log(`  KẾT LUẬN: KHÔNG ĐẠT (${errors.length} lỗi)`);
  process.exit(1);
}
console.log(`  KẾT LUẬN: ĐẠT${distDir ? ' (source + dist)' : ' (source)'} — glossary EN nhóm theo nhóm, lọc được, aria-pressed đúng, chưa mở bộ lọc chữ cái.`);
