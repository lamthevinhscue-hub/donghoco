// =============================================================================
// check-a2-speed-insights.mjs — A2 (TXN-20261012-01; siết theo TXN-02)
// =============================================================================
// Nguồn: chỉ đếm mã CÓ HIỆU LỰC (bóc chú thích); SpeedInsights đúng một lần,
// ngay sau Analytics, thực sự trong <body>; lockfile kiểm bằng JSON (gốc +
// node_modules khớp package.json); quét TOÀN BỘ src/ tìm cách chèn thứ hai.
// Dist: phần tử khởi tạo phải là phần tử THẬT (không trong chú thích HTML);
// mã khởi tạo phải nằm trong <script> chạy được hoặc bundle được trang tham
// chiếu; không nhận chuỗi trong chú thích hoặc script dữ liệu. Exit 1 nếu có
// lỗi.
// =============================================================================
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const cheDoDist = process.argv[2] === 'dist';
const errors = [];
const dat = (ten, ok, moTa) => {
  console.log(`${ok ? 'ĐẠT' : 'KHÔNG ĐẠT'} ${ten}${moTa ? ' — ' + moTa : ''}`);
  if (!ok) errors.push(ten);
};

// bóc chú thích JS ngoài chuỗi (heuristic: dòng // và khối /* */)
const boChuJS = (src) => src
  .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
  .split('\n')
  .map((line) => {
    let don = false;
    let kep = false;
    let mo = false; // template literal ` — URL 'https://…' trong backtick không phải chú thích
    let sau = '';
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === "'" && !kep && !mo) don = !don;
      else if (c === '"' && !don && !mo) kep = !kep;
      else if (c === '`' && !don && !kep) mo = !mo;
      else if (c === '/' && line[i + 1] === '/' && !don && !kep && !mo) break;
      sau += c;
    }
    return sau;
  })
  .join('\n');
const boChuHTML = (html) => html.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));

// ---- NGUỒN ----
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const phienBanPkg = pkg.dependencies?.['@vercel/speed-insights'];
dat(
  'A2-N1 dependency trực tiếp 2.0.0',
  phienBanPkg === '2.0.0',
  `package.json = ${phienBanPkg}`
);
let lockOk = false;
let lockMoTa = '';
try {
  const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
  const goc = lock.packages?.['']?.dependencies?.['@vercel/speed-insights'];
  const nut = lock.packages?.['node_modules/@vercel/speed-insights']?.version;
  lockOk = goc === phienBanPkg && nut === phienBanPkg;
  lockMoTa = `gốc=${goc}, node_modules=${nut}`;
} catch (e) {
  lockMoTa = 'lỗi đọc lockfile: ' + String(e).slice(0, 60);
}
dat('A2-N2 lockfile JSON khớp', lockOk, lockMoTa);

const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
const layoutSach = boChuJS(boChuHTML(layout));
dat(
  'A2-N3 import entrypoint Astro (ngoài chú thích)',
  /import\s+SpeedInsights\s+from\s+['"]@vercel\/speed-insights\/astro['"]/.test(layoutSach),
  'import có hiệu lực trong BaseLayout'
);
const soSpeed = (layoutSach.match(/<SpeedInsights\s*\/>/g) ?? []).length;
const soAnalytics = (layoutSach.match(/<Analytics\s*\/>/g) ?? []).length;
const moBody = layoutSach.search(/<body[^>]*>/);
const dongBody = layoutSach.lastIndexOf('</body>');
const viTriSpeed = layoutSach.indexOf('<SpeedInsights');
const trongBody = viTriSpeed > moBody && viTriSpeed < dongBody;
// "ngay sau Analytics": giữa <Analytics /> và <SpeedInsights /> không có phần
// tử/thẻ khác (chỉ khoảng trắng)
const giuaHai = layoutSach.slice(layoutSach.indexOf('<Analytics'), viTriSpeed);
const keAnalytics = soAnalytics >= 1 && giuaHai.replace(/<Analytics\s*\/>/, '').trim() === '';
dat(
  'A2-N4 đúng một SpeedInsights, ngay sau Analytics, trong body',
  soSpeed === 1 && soAnalytics === 1 && trongBody && keAnalytics,
  `Speed=${soSpeed}, Analytics=${soAnalytics}, trongBody=${trongBody}, kế Analytics=${keAnalytics}`
);
const chamSrc = [];
const quet = (thu) => {
  for (const ten of readdirSync(thu)) {
    const duong = join(thu, ten);
    if (statSync(duong).isDirectory()) quet(duong);
    else if (/\.(astro|ts|js|mjs|html)$/.test(ten)) {
      const sach = boChuJS(readFileSync(duong, 'utf8'));
      const so = (sach.match(/<SpeedInsights\s*\/?>|speed-insights\/astro|injectSpeedInsights/g) ?? []).length;
      if (so > 0) chamSrc.push(`${duong.replace(/\\/g, '/')}: ${so}`);
    }
  }
};
quet('src', chamSrc);
const ngoaiChoPhep = chamSrc.filter((d) => !d.startsWith('src/layouts/BaseLayout.astro'));
dat(
  'A2-N5 không chèn thứ hai trong toàn bộ src/',
  ngoaiChoPhep.length === 0,
  ngoaiChoPhep.length ? 'vị trí lạ: ' + ngoaiChoPhep.join(' | ') : 'chỉ BaseLayout, đúng 1 chỗ có hiệu lực'
);

// ---- DIST ----
if (cheDoDist) {
  const TRANG = [
    ['/', 'index.html', '/'],
    ['/en/', join('en', 'index.html'), '/en/'],
    ['/co-che/bo-thoat/', join('co-che', 'bo-thoat', 'index.html'), '/co-che/bo-thoat/'],
    ['/en/mechanisms/escapement/', join('en', 'mechanisms', 'escapement', 'index.html'), '/en/mechanisms/escapement/'],
    ['/hieu-dung/', join('hieu-dung', 'index.html'), '/hieu-dung/'],
    ['/en/myths/', join('en', 'myths', 'index.html'), '/en/myths/'],
  ];
  const reDinhNghia = /customElements\.define\(\s*['"`]vercel-speed-insights['"`]/;
  for (const [ten, tep, pathname] of TRANG) {
    const d = join('dist', tep);
    if (!existsSync(d)) { dat(`A2-D ${ten}`, false, `thiếu dist/${tep}`); continue; }
    const html = boChuHTML(readFileSync(d, 'utf8'));
    const phanTu = [...html.matchAll(/<vercel-speed-insights[^>]*>/g)];
    const dungMot = phanTu.length === 1;
    const pathnameDung = dungMot && phanTu[0][0].includes(`data-pathname="${pathname}"`);
    // chỉ script CHẠY ĐƯỢC được tính: <script> không type hoặc type="module".
    // Script dữ liệu (application/json, ld+json…) và loại khác không tính;
    // nội dung script phải còn chứa define SAU KHI bóc chú thích JS (mã bọc
    // trong // hoặc /* */ không chạy).
    const khoiScript = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].map((m) => ({ attr: m[1], noi: m[2] }));
    const chayDuoc = khoiScript.filter((k) => {
      const type = (/type\s*=\s*["']([^"']*)["']/i.exec(k.attr) ?? [])[1] ?? '';
      return type === '' || type.toLowerCase() === 'module';
    });
    const scriptInline = chayDuoc.some((k) => reDinhNghia.test(boChuJS(k.noi)));
    const scriptRef = [...html.matchAll(/<script\b[^>]*\bsrc="(\/_astro\/[^"]+\.js)"[^>]*>/gi)]
      .filter((m) => {
        const type = (/type\s*=\s*["']([^"']*)["']/i.exec(m[0]) ?? [])[1] ?? '';
        return type === '' || type.toLowerCase() === 'module';
      })
      .map((m) => m[1]);
    const scriptBundle = scriptRef.some((src) => {
      const bp = join('dist', src.replace(/^\//, ''));
      // bundle cũng phải còn define SAU KHI bóc chú thích JS (bundle chỉ chứa
      // chú thích khởi tạo không được tính)
      return existsSync(bp) && reDinhNghia.test(boChuJS(readFileSync(bp, 'utf8')));
    });
    const coKhoiTao = scriptInline || scriptBundle;
    const ok = dungMot && pathnameDung && coKhoiTao;
    dat(
      `A2-D ${ten}`,
      ok,
      !dungMot ? `số phần tử thật=${phanTu.length}` : !pathnameDung ? 'data-pathname lệch' : !coKhoiTao ? 'không có script chạy được chứa define vercel-speed-insights' : 'đúng 1 phần tử thật + pathname đúng + script khởi tạo chạy được'
    );
  }
}

if (errors.length) {
  console.log(`=> A2 THẤT BẠI (${cheDoDist ? 'nguồn+dist' : 'nguồn'}): ${errors.length} phép kiểm (${errors.join('; ')})`);
  process.exit(1);
}
console.log(`=> A2 ĐẠT (${cheDoDist ? 'nguồn+dist' : 'nguồn'}).`);
