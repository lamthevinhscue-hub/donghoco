// =============================================================================
// check-k2-local-fonts.mjs — Kiểm K2: phông chữ tự lưu, bỏ tải từ Google
// =============================================================================
// Hai chế độ (giống các checker cụm khác):
//   node scripts/check-k2-local-fonts.mjs        → kiểm SOURCE (npm run check)
//   node scripts/check-k2-local-fonts.mjs dist   → kiểm SOURCE + DIST (npm run build)
// Nhóm kiểm:
//   K2-1  Cấm host Google Fonts trong src/, public/, vercel.json (và dist khi có)
//   K2-2  public/fonts/ đủ tệp kỳ vọng; woff2 đúng magic bytes; kích thước thật
//   K2-3  fonts.css: 5 @font-face đúng family/weight, src chỉ local, font-display: swap
//   K2-4  BaseLayout không còn preconnect/link Google; có link stylesheet local
//   K2-5  CSP Report-Only: không còn host Google, font-src 'self', không bỏ directive
//   K2-6  (chế độ dist) dist sạch host Google; tệp font trong dist khớp hash public/
// Exit 1 nếu có lỗi. Env: K2_ROOT để chạy trên bản sao.
// =============================================================================
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import * as path from 'node:path';
const { join, relative } = path;

const ROOT = path.resolve(process.env.K2_ROOT ?? process.cwd());
const DIST = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? null;
const distDir = DIST ? (path.isAbsolute(DIST) ? DIST : path.join(ROOT, DIST)) : null;

const errors = [];
const fail = (id, msg) => {
  errors.push(`[${id}] ${msg}`);
  console.log(`  LỖI  [${id}] ${msg}`);
};
const pass = (id, msg) => console.log(`  ĐẠT  [${id}] ${msg}`);

const HOST_CAM = ['fonts.googleapis.com', 'fonts.gstatic.com'];

const TEP_FONT = [
  'be-vietnam-pro-400.woff2',
  'be-vietnam-pro-500.woff2',
  'be-vietnam-pro-600.woff2',
  'be-vietnam-pro-700.woff2',
  'newsreader-opsz-wght.woff2',
];
const TEP_KHAC = ['fonts.css', 'OFL-BeVietnamPro.txt', 'OFL-Newsreader.txt'];

function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

// ---- K2-1: cấm host Google trong src/, public/, vercel.json
const khuVucNguon = ['src', 'public'].map((d) => join(ROOT, d));
khuVucNguon.push(join(ROOT, 'vercel.json'));
const leakNguon = [];
for (const goc of khuVucNguon) {
  const cacTep = statSync(goc).isDirectory() ? walk(goc) : [goc];
  for (const tep of cacTep) {
    const noi = readFileSync(tep).toString('latin1');
    for (const host of HOST_CAM) {
      if (noi.includes(host)) leakNguon.push(`${relative(ROOT, tep)} → ${host}`);
    }
  }
}
if (leakNguon.length > 0) fail('K2-1', `Còn tham chiếu Google Fonts trong nguồn: ${leakNguon.join(' | ')}`);
else pass('K2-1', 'src/, public/, vercel.json không còn fonts.googleapis.com / fonts.gstatic.com');

// ---- K2-2: tệp font trong public/fonts/
const thuMucFont = join(ROOT, 'public', 'fonts');
for (const ten of [...TEP_FONT, ...TEP_KHAC]) {
  const p = join(thuMucFont, ten);
  if (!existsSync(p)) {
    fail('K2-2', `Thiếu tệp public/fonts/${ten}`);
    continue;
  }
  const buf = readFileSync(p);
  if (ten.endsWith('.woff2')) {
    const magic = buf.subarray(0, 4).toString('latin1') === 'wOF2';
    const du = buf.length > 10_000;
    if (!magic || !du) fail('K2-2', `Tệp ${ten} bất thường (magic=${magic}, ${buf.length}B)`);
  }
  if (ten.startsWith('OFL-') && !buf.toString('utf8').includes('Font License')) {
    fail('K2-2', `Tệp ${ten} không chứa giấy phép Open Font License`);
  }
}
const tongFont = TEP_FONT.filter((t) => existsSync(join(thuMucFont, t))).length;
if (tongFont === TEP_FONT.length) pass('K2-2', `Đủ ${TEP_FONT.length} tệp font + ${TEP_KHAC.length} tệp kèm trong public/fonts/ (woff2 magic OK, OFL OK)`);

// ---- K2-3: fonts.css — 5 @font-face đúng thiết kế
const cssPath = join(thuMucFont, 'fonts.css');
if (!existsSync(cssPath)) fail('K2-3', 'Thiếu public/fonts/fonts.css');
else {
  const css = readFileSync(cssPath, 'utf8');
  const khoi = [...css.matchAll(/@font-face\s*\{[^}]*\}/g)].map((m) => m[0]);
  const bvp = khoi.filter((k) => /font-family:\s*'Be Vietnam Pro'/.test(k));
  const nr = khoi.filter((k) => /font-family:\s*'Newsreader'/.test(k));
  const weightBvp = (k) => (k.match(/font-weight:\s*(\d+)/) || [])[1];
  const dungWeight = bvp.length === 4 && ['400', '500', '600', '700'].every((w) => bvp.some((k) => weightBvp(k) === w));
  const dungNr = nr.length === 1 && /font-weight:\s*500\s+700/.test(nr[0]);
  const srcLocal = khoi.every((k) => {
    const src = (k.match(/src:\s*url\('([^']+)'\)/) || [])[1] ?? '';
    return src.startsWith('/fonts/') && src.endsWith('.woff2');
  });
  const swap = khoi.every((k) => /font-display:\s*swap/.test(k));
  if (khoi.length === 5 && dungWeight && dungNr && srcLocal && swap) {
    pass('K2-3', 'fonts.css: 5 @font-face — BVP 400/500/600/700 + Newsreader 500-700 variable; src local; font-display: swap');
  } else {
    fail('K2-3', `fonts.css sai: khối=${khoi.length} BVP=${bvp.length} weight_OK=${dungWeight} NR_OK=${dungNr} src_local=${srcLocal} swap=${swap}`);
  }
  for (const host of HOST_CAM) if (css.includes(host)) fail('K2-3', `fonts.css còn ${host}`);
}

// ---- K2-4: BaseLayout
const layoutPath = join(ROOT, 'src', 'layouts', 'BaseLayout.astro');
if (!existsSync(layoutPath)) fail('K2-4', 'Thiếu src/layouts/BaseLayout.astro');
else {
  const html = readFileSync(layoutPath, 'utf8');
  const conGoogle = HOST_CAM.some((h) => html.includes(h));
  const coLocal = /<link[^>]+href="\/fonts\/fonts\.css"[^>]*>/.test(html) || html.includes('href="/fonts/fonts.css"');
  if (!conGoogle && coLocal) pass('K2-4', 'BaseLayout: hết preconnect/link Google, đã link /fonts/fonts.css');
  else fail('K2-4', `BaseLayout: conGoogle=${conGoogle}, linkLocal=${coLocal}`);
}

// ---- K2-5: CSP trong vercel.json
try {
  const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
  const cspEntries = [];
  for (const h of vercel.headers ?? []) {
    for (const kv of h.headers ?? []) {
      if ((kv.key ?? '').startsWith('Content-Security-Policy')) cspEntries.push(kv);
    }
  }
  const csp = cspEntries.map((e) => e.value).join('\n');
  const conHost = HOST_CAM.some((h) => csp.includes(h));
  const coFontSelf = /font-src[^;]*'self'/.test(csp);
  const dayDu = ['default-src', 'img-src', 'style-src', 'font-src', 'script-src', 'connect-src', 'frame-ancestors', 'base-uri', 'form-action', 'object-src']
    .every((d) => csp.includes(d + ' '));
  const giuNgoai = csp.includes('https://vitals.vercel-insights.com') && csp.includes('https://formspree.io') && csp.includes("object-src 'none'");
  const reportOnly = cspEntries.length > 0 && cspEntries.every((e) => (e.key ?? '').includes('Report-Only'));
  if (!conHost && coFontSelf && dayDu && giuNgoai && reportOnly) {
    pass('K2-5', 'CSP: không còn host Google; font-src self; đủ 10 directive và điểm ngoài chưa bị bỏ; vẫn Report-Only');
  } else {
    fail('K2-5', `CSP sai: host=${conHost ? 'còn' : 'sạch'}, fontSelf=${coFontSelf}, dayDu=${dayDu}, giuNgoai=${giuNgoai}, reportOnly=${reportOnly}`);
  }
} catch (e) {
  fail('K2-5', `Không đọc được vercel.json: ${e.message}`);
}

// ---- K2-6: dist (chỉ chạy khi truyền thư mục dist)
if (distDir) {
  if (!existsSync(distDir)) {
    fail('K2-6', `Không có ${DIST} — hãy chạy npm run build trước`);
  } else {
    const leakDist = [];
    for (const tep of walk(distDir)) {
      const noi = readFileSync(tep).toString('latin1');
      for (const host of HOST_CAM) if (noi.includes(host)) leakDist.push(`${relative(distDir, tep)} → ${host}`);
    }
    if (leakDist.length > 0) fail('K2-6', `Dist còn tham chiếu Google Fonts: ${leakDist.slice(0, 5).join(' | ')}`);
    else pass('K2-6', `Toàn bộ ${DIST} không còn tham chiếu Google Fonts`);

    const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
    const lech = [];
    for (const ten of [...TEP_FONT, 'fonts.css']) {
      const a = join(thuMucFont, ten);
      const b = join(distDir, 'fonts', ten);
      if (!existsSync(b)) lech.push(`${ten}: thiếu trong dist`);
      else if (sha256(a) !== sha256(b)) lech.push(`${ten}: hash lệch`);
    }
    if (lech.length === 0) pass('K2-6', 'dist/fonts/ khớp hash public/fonts/ (5 font + fonts.css)');
    else fail('K2-6', `dist/fonts lệch: ${lech.join(' | ')}`);
  }
}

// ---- Kết luận
console.log('KIỂM TRA K2 — PHÔNG CHỮ TỰ LƯU:');
if (errors.length > 0) {
  console.log(`  KẾT LUẬN: KHÔNG ĐẠT (${errors.length} lỗi)`);
  process.exit(1);
}
console.log(`  KẾT LUẬN: ĐẠT${distDir ? ' (source + dist)' : ' (source)'} — phông chữ phục vụ hoàn toàn local, sạch Google Fonts.`);
