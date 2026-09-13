// =============================================================================
// check-g06-anatomy.mjs — Kiểm gói G06-A chặng 2: giải phẫu song ngữ
// =============================================================================
// Hai lớp:
//   Nguồn (luôn chạy — nối npm run check, TRƯỚC build):
//     G6-1 dữ liệu 12 bộ phận đủ 2 ngôn ngữ, id duy nhất, lớp 0–6 đủ.
//     G6-2 link: cấu trúc cặp vi/en đúng; 3 bộ phận không bài = null; balance = G04.
//     G6-3 cặp route /giai-phau ↔ /en/anatomy/ trong contentRoutes.
//     G6-4 chuỗi claim đã loại KHÔNG tái xuất hiện trong 6 tệp render
//          (bỏ qua dòng comment — chỉ quét nội dung code/chuỗi).
//     G6-5 AnatomyExperience có blob #anatomy-i18n + mountExploded3D nhận lang.
//     G6-6 nhãn/bảng đã chốt: KÍNH/CRYSTAL, Điều tiết/Regulation, Đóng vỏ/
//          Case closure; không còn "Vật liệu điển hình".
//     G6-7 dây nối dữ liệu: cả 12 id đều render qua byId(...).role/.name trong
//          2D và qua data-name={p.name} trong 3D (không cho phép chữ cứng lẩn).
//   Dist (khi có dist — nối npm run build, SAU astro build):
//     G6-D1 /giai-phau/: 12 thẻ data + data-role KHỚP anatomy-parts (VI); blob
//          lang=vi; không cột vật liệu; có 'Điều tiết'/'Đóng vỏ'.
//     G6-D2 /en/anatomy/: 12 thẻ data khớp (EN); không rò tiếng Việt (strip
//          script/style/comment, loại tên riêng 'ĐỒNG HỒ CƠ'); blob lang=en.
//     G6-D3 title/OG: hai trang có title riêng + og:image og-lich-su.jpg.
//     G6-D4 link đích: mọi href nội bộ của hai trang tồn tại trong dist
//          (kiểm nội bộ — KHÔNG phải kiểm HTTP nguồn ngoài).
//     G6-D5 sitemap: có /giai-phau/ và /en/anatomy/ trong sitemap-0.xml.
//     G6-D6 tải sớm 3D: tên chunk chứa mountExploded3D không xuất hiện trong
//          HTML ban đầu của cả hai trang.
//
// Mutation: chạy --source-only trong sandbox với dữ liệu đã biến đổi.
// Không phụ thuộc lịch sử Git (esbuild transpile như check-g01).
// Cách chạy: node scripts/check-g06-anatomy.mjs [dist] [--source-only] [--json out]
// =============================================================================

import { readFileSync, existsSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const argv = process.argv.slice(2);
const distArg = argv.find((a) => !a.startsWith('--'));
const DIST = distArg ? resolve(ROOT, distArg) : null;
const sourceOnly = argv.includes('--source-only');

const results = { thoiGian: new Date().toISOString(), root: ROOT, dist: DIST, nguon: [], distChecks: [], tongKet: null };
const errors = [];
const kiem = (id, ten, dat, chiTiet = '') => {
  results.nguon.push({ id, ten, dat: dat === true, chiTiet });
  console.log(`  ${dat === true ? 'ĐẠT' : 'LỖI '} [${id}] ${ten}${dat === true ? '' : ` — ${chiTiet}`}`);
  if (dat !== true) errors.push(`[${id}] ${ten} — ${chiTiet}`);
};

// ===== Nạp dữ liệu: transpile anatomy-parts.ts rồi import (không phụ thuộc Git) =====
const tmpDir = mkdtempSync(join(tmpdir(), 'g06-parts-'));
const tmpOut = join(tmpDir, 'anatomy-parts.mjs');
await build({ entryPoints: [join(ROOT, 'src', 'data', 'anatomy-parts.ts')], outfile: tmpOut, bundle: false, format: 'esm', logLevel: 'silent' });
const parts = await import(pathToFileURL(tmpOut).href);
rmSync(tmpDir, { recursive: true, force: true });
const { ANATOMY_PARTS } = parts;

// ===== G6-1: dữ liệu 12 bộ phận =====
const ids = ANATOMY_PARTS.map((p) => p.id);
const lopCo = new Set(ANATOMY_PARTS.map((p) => p.layer));
const thieuNgonNgu = ANATOMY_PARTS.filter((p) => !p.vi?.name?.trim() || !p.vi?.role?.trim() || !p.en?.name?.trim() || !p.en?.role?.trim()).map((p) => p.id);
kiem(
  'G6-1',
  'Dữ liệu 12 bộ phận: id duy nhất, đủ lớp 0–6, tên+mô tả đủ VI/EN',
  ANATOMY_PARTS.length === 12 && new Set(ids).size === 12 && lopCo.size === 7 && thieuNgonNgu.length === 0,
  `số=${ANATOMY_PARTS.length}, id trùng=${ids.length - new Set(ids).size}, lớp=${[...lopCo].sort().join(',')}, thiếu ngôn ngữ=${thieuNgonNgu.join(',') || 'không'}`,
);

// ===== G6-2: cấu trúc link =====
const loiLink = [];
for (const p of ANATOMY_PARTS) {
  if (p.link === null) continue;
  const { vi, en } = p.link;
  if (!vi.startsWith('/') || vi.startsWith('/en/')) loiLink.push(`${p.id}:vi`);
  if (!en.startsWith('/en/')) loiLink.push(`${p.id}:en`);
}
const bal = ANATOMY_PARTS.find((p) => p.id === 'balance');
const khongBai = ANATOMY_PARTS.filter((p) => p.link === null).map((p) => p.id).sort().join(',');
const balOk = bal.link?.vi === '/co-che/day-toc-banh-lac' && bal.link?.en === '/en/mechanisms/balance-and-hairspring/';
kiem(
  'G6-2',
  'Link: vi route gốc + en /en/; không-bài = crystal,dial,caseback; bánh lắc dùng chương G04',
  loiLink.length === 0 && balOk && khongBai === 'caseback,crystal,dial',
  `lỗi=${loiLink.join(',') || 'không'}; balance=${JSON.stringify(bal.link)}; không-bài=${khongBai}`,
);

// ===== G6-3: cặp route trong contentRoutes =====
const crRaw = readFileSync(join(ROOT, 'src', 'i18n', 'contentRoutes.ts'), 'utf8');
const coCap = /\{\s*vi:\s*'\/giai-phau',\s*en:\s*'\/en\/anatomy\/'\s*\}/.test(crRaw);
kiem('G6-3', 'contentRoutes có cặp /giai-phau ↔ /en/anatomy/ trong STATIC_PAIRS', coCap, coCap ? 'có' : 'không tìm thấy cặp');

// ===== G6-4: chuỗi claim đã loại không tái xuất hiện (quét code bỏ comment) =====
const FILES_RENDER = [
  'src/data/anatomy-parts.ts',
  'src/components/anatomy/AnatomyExperience.astro',
  'src/components/WatchExplodedView.astro',
  'src/components/WatchExplodedView3D.astro',
  'src/pages/giai-phau.astro',
  'src/pages/en/anatomy.astro',
];
const CAM = ['80%', '9/10', '4 bánh răng', '12:1', 'hơn 100', '30-40mm', 'ngắn và dày nhất', 'trái tim', 'TRÁI TIM', 'releases the balance', 'Vật liệu điển hình', 'SAPPHIRE CRYSTAL', 'nearly scratch-proof', 'only diamond', 'wev-energy'];
const boComment = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const scan = FILES_RENDER.map((f) => ({ f, code: boComment(readFileSync(join(ROOT, f), 'utf8')) }));
const camBat = [];
for (const { f, code } of scan) {
  for (const c of CAM) {
    if (code.toLowerCase().includes(c.toLowerCase())) camBat.push(`${f}:${c}`);
  }
}
kiem('G6-4', 'Chuỗi claim đã loại không tái xuất hiện (16 chuỗi cấm × 6 tệp render, bỏ comment)', camBat.length === 0, camBat.slice(0, 6).join(', ') || 'sạch');

// ===== G6-5: blob i18n + engine nhận lang =====
const expSrc = readFileSync(join(ROOT, 'src', 'components', 'anatomy', 'AnatomyExperience.astro'), 'utf8');
const blobOk = expSrc.includes('id="anatomy-i18n"') && expSrc.includes('mountExploded3D(rootEl as HTMLElement, lang)');
kiem('G6-5', 'AnatomyExperience: có blob #anatomy-i18n + gọi mountExploded3D với lang tường minh', blobOk, `blob=${expSrc.includes('id="anatomy-i18n"')}, lang=${expSrc.includes(', lang)')}`);

// ===== G6-6: nhãn/bảng đã chốt (nhãn kính nằm trong 2D; vai trong khuôn) =====
const w2dSrc = readFileSync(join(ROOT, 'src', 'components', 'WatchExplodedView.astro'), 'utf8');
const coKinh = w2dSrc.includes("'KÍNH'") && w2dSrc.includes("'CRYSTAL'");
const coVai = expSrc.includes("'Điều tiết'") && expSrc.includes("'Regulation'") && expSrc.includes("'Đóng vỏ'") && expSrc.includes("'Case closure'");
kiem('G6-6', 'Nhãn/bảng đã chốt: KÍNH/CRYSTAL (2D), Điều tiết/Regulation, Đóng vỏ/Case closure (khuôn)', coKinh && coVai, `kính=${coKinh}, vai=${coVai}`);

// ===== G6-7: dây nối dữ liệu — mọi id render qua nguồn chung =====
const w2d = w2dSrc;
const w3d = readFileSync(join(ROOT, 'src', 'components', 'WatchExplodedView3D.astro'), 'utf8');
const thieu2d = ids.filter((id) => !w2d.includes(`data-role={byId('${id}').role}`) && !w2d.includes(`data-role={byId('${id}').link === ''`));
const day2d = ids.every((id) => w2d.includes(`data-name={byId('${id}').name}`) && w2d.includes(`data-role={byId('${id}').role}`));
const day3d = w3d.includes(`data-part-id={p.id}`) && w3d.includes('data-name={p.name}') && w3d.includes('data-role={p.role}') && w3d.includes('data-link={p.link}');
kiem(
  'G6-7',
  'Dây nối dữ liệu: 12 id render qua byId(...).name/.role (2D) và qua p.* (3D) — không cho phép chữ cứng lẩn',
  day2d && day3d,
  `2D=${day2d}, 3D=${day3d}, thiếu2d=${thieu2d.join(',') || 'không'}`,
);

// ===== Lớp dist =====
function routeExists(rel) {
  const clean = rel.split(/[?#]/)[0].replace(/\/$/, '');
  if (clean === '') return existsSync(join(DIST, 'index.html'));
  return existsSync(join(DIST, clean, 'index.html'));
}

if (!sourceOnly) {
  if (DIST && existsSync(join(DIST, 'giai-phau', 'index.html')) && existsSync(join(DIST, 'en', 'anatomy', 'index.html'))) {
    const kiemD = (id, ten, dat, chiTiet = '') => {
      results.distChecks.push({ id, ten, dat: dat === true, chiTiet });
      console.log(`  ${dat === true ? 'ĐẠT' : 'LỖI '} [${id}] ${ten}${dat === true ? '' : ` — ${chiTiet}`}`);
      if (dat !== true) errors.push(`[${id}] ${ten} — ${chiTiet}`);
    };
    const viHtml = readFileSync(join(DIST, 'giai-phau', 'index.html'), 'utf8');
    const enHtml = readFileSync(join(DIST, 'en', 'anatomy', 'index.html'), 'utf8');

    // Kiểm aria-label SVG 2D trong dist: phải render KHÔNG RỘNG (không chỉ
    // khoảng trắng), đúng ngôn ngữ trang, role="img" và không aria-hidden.
    // (Kiểm cấu trúc aria-label={...} trong nguồn không chứng minh nhãn render.)
    const kiemAria = (html, lang) => {
      const m = html.match(/<svg[^>]*id="exploded-svg"[^>]*>/);
      if (!m) return { ok: false, chiTiet: 'không thấy svg exploded-svg' };
      const tag = m[0];
      if (/aria-hidden="true"/.test(tag)) return { ok: false, chiTiet: 'SVG bị aria-hidden (mâu thuẫn thiết kế)' };
      if (!/role="img"/.test(tag)) return { ok: false, chiTiet: 'thiếu role="img"' };
      const a = tag.match(/aria-label="([^"]*)"/);
      if (!a) return { ok: false, chiTiet: 'thiếu aria-label' };
      const nhan = a[1].trim();
      if (nhan.length === 0) return { ok: false, chiTiet: 'aria-label rỗng' };
      if (lang === 'vi' && !/^Sơ đồ giải phẫu/.test(nhan)) return { ok: false, chiTiet: 'aria-label không đúng tiếng Việt: "' + nhan.slice(0, 40) + '"' };
      if (lang === 'en' && !/^Anatomy diagram/.test(nhan)) return { ok: false, chiTiet: 'aria-label not in English: "' + nhan.slice(0, 40) + '"' };
      return { ok: true, chiTiet: nhan.slice(0, 40) };
    };

    // G6-D1 + G6-D2: dữ liệu render khớp anatomy-parts từng bộ phận (data-role)
    const kiemTrang = (html, lang) => {
      const lech = [];
      for (const p of ANATOMY_PARTS) {
        const m = html.match(new RegExp(`data-part="${p.id}"[^>]*data-role="([^"]*)"`));
        if (!m) { lech.push(`${p.id}:thiếu`); continue; }
        const mongDoi = p[lang].role.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        if (m[1] !== mongDoi) lech.push(`${p.id}:lệch`);
      }
      const nut = (html.match(/data-part-id=/g) ?? []).length;
      return { lech, nut };
    };
    const d1 = kiemTrang(viHtml, 'vi');
    const dieuTietOk = viHtml.includes('Điều tiết') && viHtml.includes('Đóng vỏ') && !viHtml.includes('Vật liệu điển hình');
    const blobVi = viHtml.includes('"lang":"vi"');
    const ariaVi = kiemAria(viHtml, 'vi');
    kiemD(
      'G6-D1',
      '/giai-phau/: 12 data-role khớp dữ liệu (VI) + 24 nút/bộ phận + blob lang=vi + Điều tiết/Đóng vỏ + không cột vật liệu + SVG role=img aria-label VI không rỗng',
      d1.lech.length === 0 && d1.nut >= 24 && blobVi && dieuTietOk && ariaVi.ok,
      `lệch=${d1.lech.slice(0, 4).join(',') || 'không'}, nút=${d1.nut}, blob=${blobVi}, vai=${dieuTietOk}, aria=${ariaVi.chiTiet}`,
    );

    const d2 = kiemTrang(enHtml, 'en');
    const ariaEn = kiemAria(enHtml, 'en');
    // rò tiếng Việt: cắt script/style/comment, loại tên riêng 'ĐỒNG HỒ CƠ'
    let enText = enHtml.slice(enHtml.indexOf('<body'));
    enText = enText.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '');
    enText = enText.split('ĐỒNG HỒ CƠ').join('');
    // nhãn sitewide đã chấp thuận từ G05 (switcher ngôn ngữ + nút lên đầu trang)
    enText = enText.split('Tiếng Việt').join('').split('Lên đầu trang').join('');
    const roViet = /[\u0103\u00E2\u0111\u00EA\u00F4\u01A0\u01A1\u01AF\u01B0\u1EA0-\u1EF9]/.test(enText);
    const blobEn = enHtml.includes('"lang":"en"');
    kiemD(
      'G6-D2',
      '/en/anatomy/: 12 data-role khớp dữ liệu (EN) + blob lang=en + không rò tiếng Việt (loại tên riêng) + SVG aria-label EN không rỗng',
      d2.lech.length === 0 && blobEn && !roViet && ariaEn.ok,
      `lệch=${d2.lech.slice(0, 4).join(',') || 'không'}, blob=${blobEn}, ròVI=${roViet}, aria=${ariaEn.chiTiet}`,
    );

    // G6-D3: title + OG ảnh hiện có
    const titleOk = viHtml.includes('<title>Giải phẫu đồng hồ cơ') && enHtml.includes('<title>The anatomy of a mechanical watch');
    const ogOk = viHtml.includes('/images/og/og-lich-su.jpg') && enHtml.includes('/images/og/og-lich-su.jpg');
    kiemD('G6-D3', 'Title riêng hai trang + OG dùng ảnh hiện có (og-lich-su.jpg)', titleOk && ogOk, `title=${titleOk}, og=${ogOk}`);

    // G6-D4: mọi href nội bộ của hai trang tồn tại trong dist
    const STATIC_EXT = /\.(css|js|mjs|svg|png|jpe?g|webp|gif|ico|woff2?|ttf|xml|txt|json|webmanifest)$/i;
    let hong = [];
    for (const [ten, html] of [['VI', viHtml], ['EN', enHtml]]) {
      // quét cả href tĩnh lẫn data-link (link gán động cho thẻ chi tiết —
      // mutation C-d2 từng lọt vì chỉ quét href)
      const noiBo = [
        ...html.matchAll(/href="(\/[^"h][^"]*)"/g),
        ...html.matchAll(/data-link="(\/[^"h][^"]*)"/g),
      ].map((m) => m[1].split('#')[0]).filter((h) => h !== '/' && !STATIC_EXT.test(h));
      hong = hong.concat([...new Set(noiBo)].filter((h) => !routeExists(h)).map((h) => `${ten}:${h}`));
    }
    kiemD('G6-D4', 'Không link nội bộ hỏng trong hai trang giải phẫu (kiểm nội bộ dist)', hong.length === 0, hong.join(', ') || 'không');

    // G6-D5: sitemap
    let smOk = false;
    const smPath = join(DIST, 'sitemap-0.xml');
    if (existsSync(smPath)) {
      const sm = readFileSync(smPath, 'utf8');
      smOk = sm.includes('https://www.kienthucdonghoco.vn/giai-phau/') && sm.includes('https://www.kienthucdonghoco.vn/en/anatomy/');
    }
    kiemD('G6-D5', 'Sitemap chứa /giai-phau/ và /en/anatomy/', smOk, 'kiểm sitemap-0.xml');

    // G6-D6: chunk chứa engine không xuất hiện trong HTML ban đầu của hai trang
    const chunk3d = [];
    const astroDir = join(DIST, '_astro');
    if (existsSync(astroDir)) {
      const { readdirSync } = await import('node:fs');
      for (const f of readdirSync(astroDir)) {
        // nhận diện theo tiền tố tên tệp — cùng khuôn check-3d-loading-budget (mục 4)
        if (/^(exploded3d|OrbitControls)\./.test(f)) chunk3d.push(f);
      }
    }
    const ro3d = chunk3d.filter((c) => viHtml.includes(c) || enHtml.includes(c));
    kiemD('G6-D6', 'Tải sớm 3D: chunk chứa mountExploded3D không xuất hiện trong HTML ban đầu của hai trang', chunk3d.length > 0 && ro3d.length === 0, `chunk3d=${chunk3d.join(',') || 'không tìm thấy'}, rò=${ro3d.join(',') || 'không'}`);
  } else if (DIST) {
    errors.push('[G6-DIST] Thiếu dist/giai-phau/index.html hoặc dist/en/anatomy/index.html — cần build trước khi kiểm lớp dist.');
  }
}

// ===== Kết luận =====
const tongCa = results.nguon.length + results.distChecks.length;
const tongDat = results.nguon.filter((c) => c.dat).length + results.distChecks.filter((c) => c.dat).length;
results.tongKet = { tongCa, tongDat, loi: errors.length, dat: errors.length === 0 };
console.log(`  KẾT LUẬN: ${errors.length === 0 ? `ĐẠT — ${tongDat}/${tongCa} ca` : 'KHÔNG ĐẠT:'}`);
for (const e of errors) console.log(`    LỖI  ${e}`);
const jsonArg = process.argv.indexOf('--json');
if (jsonArg !== -1 && process.argv[jsonArg + 1]) {
  const out = resolve(ROOT, process.argv[jsonArg + 1]);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(results, null, 2), 'utf8');
  console.log(`  Đã ghi JSON: ${out}`);
}
process.exit(errors.length === 0 ? 0 : 1);
