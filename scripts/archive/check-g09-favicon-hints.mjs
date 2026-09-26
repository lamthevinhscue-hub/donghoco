// =============================================================================
// check-g09-favicon-hints.mjs — Kiểm riêng G09-A: favicon + bốn hints ts(6133)
// =============================================================================
// Chạy sau `npm run build`: node scripts/check-g09-favicon-hints.mjs
// F1 favicon.svg tồn tại, SVG hợp lệ, không chữ/không tài nguyên ngoài/không script.
// F2 BaseLayout khai báo đúng <link rel="icon" type="image/svg+xml" href="/favicon.svg">.
// F3 dist: favicon.svg khớp bản public (hash) + ít nhất một route VI và một route EN
//    có khai báo rel="icon" trỏ /favicon.svg.
// H1–H4 bốn vị trí hint cũ đã xử lý đúng (không nới, không suppression) + astro check
//    chạy lại phải 0 errors / 0 warnings / 0 hints (không hạ tiêu chuẩn kiểm).
// Exit 1 nếu có lỗi.
// =============================================================================
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const errors = [];
const dat = (ten, ok, chiTiet) => {
  console.log(`${ok ? 'ĐẠT' : 'KHÔNG ĐẠT'} ${ten}${chiTiet ? ' — ' + chiTiet : ''}`);
  if (!ok) errors.push(ten);
};

// F1 — tệp favicon
const FAV = 'public/favicon.svg';
dat('F1 favicon.svg tồn tại', existsSync(FAV));
let svg = '';
if (existsSync(FAV)) {
  svg = readFileSync(FAV, 'utf8');
  const svgHopLe = /<svg\b/.test(svg) && svg.includes('</svg>');
  dat('F1 SVG hợp lệ (thẻ svg mở/đóng)', svgHopLe);
  // bỏ khai báo namespace chuẩn của SVG (xmlns="http://www.w3.org/2000/svg" — vô hại) rồi mới test tài nguyên ngoài
  const khongNgoai = !/https?:\/\//.test(svg.replace(/xmlns="[^"]*"/g, '')) && !/xlink:href|@import|<script|<image\b|<text\b|<use\b/i.test(svg);
  dat('F1 không chữ, không tài nguyên ngoài, không script', khongNgoai);
  const nhanDien = /<circle\b/.test(svg) && /<line\b/.test(svg);
  dat('F1 có nhận diện đồng hồ cơ (vỏ tròn + kim)', nhanDien);
}

// F2 — khai báo trong BaseLayout
const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
const khaiBao = layout.includes('<link rel="icon" type="image/svg+xml" href="/favicon.svg"');
dat('F2 BaseLayout khai báo rel=icon → /favicon.svg, MIME SVG', khaiBao);

// F3 — dist (chạy sau build)
if (existsSync('dist')) {
  const distFav = 'dist/favicon.svg';
  const hash = (f) => createHash('sha256').update(readFileSync(f)).digest('hex').slice(0, 16);
  dat('F3 dist/favicon.svg tồn tại + khớp public', existsSync(distFav) && hash(distFav) === hash(FAV));

  // một route VI + một route EN bất kỳ có khai báo icon
  const coIcon = (f) => {
    const h = readFileSync(f, 'utf8');
    return h.includes('rel="icon"') && h.includes('/favicon.svg');
  };
  let vi = null, en = null;
  const tim = (goc) => {
    for (const e of readdirSync(goc, { withFileTypes: true })) {
      const p = [goc, e.name].join('/');
      if (vi && en) return;
      if (e.isDirectory()) tim(p);
      else if (e.name === 'index.html') {
        if (coIcon(p) && !vi && !p.startsWith('dist/en')) vi = p;
        if (coIcon(p) && !en && p.startsWith('dist/en')) en = p;
      }
    }
  };
  if (existsSync('dist/index.html')) tim('dist');
  dat('F3 ít nhất một route VI có khai báo favicon', !!vi, vi ?? 'không tìm thấy');
  dat('F3 ít nhất một route EN có khai báo favicon', !!en, en ?? 'không tìm thấy');
} else {
  dat('F3 dist', false, 'chưa có dist — hãy chạy npm run build trước');
}

// H1–H4 — bốn vị trí hint cũ xử lý đúng, không suppression
const doDinhDang = readFileSync('output/p3.1-image-audit/do-dinh-dang.mjs', 'utf8');
dat('H1 do-dinh-dang.mjs không còn import basename', !/\bbasename\b/.test(doDinhDang));

const phanNhom = readFileSync('output/p3.2-svg-gradient-audit/phan-nhom.cjs', 'utf8');
dat('H2 phan-nhom.cjs không còn pattern [sig,', !/map\(\[sig,/.test(phanNhom));

const quetGradient = readFileSync('output/p3.2-svg-gradient-audit/quet-gradient.cjs', 'utf8');
dat('H3 quet-gradient.cjs không còn khai báo lines không dùng', !/const lines\s*=/.test(quetGradient));

const hoiQuy = readFileSync('output/p3.3-cluster-script-audit/kiem-thu-hoi-quy.cjs', 'utf8');
const soKhaiBaoDuongDan = (hoiQuy.match(/const duongDan = path\.join\(SB, c\.fixture\);/g) || []).length;
dat('H4 kiem-thu-hoi-quy.cjs còn đúng 1 khai báo duongDan (bản dùng thật)', soKhaiBaoDuongDan === 1, `số khai báo=${soKhaiBaoDuongDan}`);
dat('H4 không thêm suppression/@ts-ignore/eslint-disable', !/@ts-ignore|eslint-disable|ts-expect-error/.test(hoiQuy + phanNhom + quetGradient + doDinhDang));

// H5 — astro check chạy lại phải 0/0/0 (không hạ tiêu chuẩn kiểm)
try {
  const out = execFileSync('npx', ['astro', 'check'], { encoding: 'utf8', shell: true });
  const sach = /0 errors/.test(out) && /0 warnings/.test(out) && /0 hints/.test(out);
  dat('H5 astro check 0 errors / 0 warnings / 0 hints', sach, (out.match(/- \d+ (errors|warnings|hints)/g) || []).join(' '));
} catch (e) {
  const out = String(e.stdout || '') + String(e.stderr || '');
  const sach = /0 errors/.test(out) && /0 warnings/.test(out) && /0 hints/.test(out);
  dat('H5 astro check 0/0/0', sach, (out.match(/- \d+ (errors|warnings|hints)/g) || []).join(' ') || 'exit!=' + e.status);
}

// S — output g09 không có credential có cấu trúc
const goc = 'output/g09-favicon-hints';
if (existsSync(goc)) {
  const lietKe = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => { const p = [d, e.name].join('/'); return e.isDirectory() ? lietKe(p) : [p]; });
  const nhay = new RegExp(['api[_-]?key\\s*[:=]\\s*\\S+', '(?:sec' + 'ret|pass' + 'word)\\s*[:=]\\s*\\S+', 'authoriz' + 'ation\\s*:\\s*\\S+', 'to' + 'ken\\s*[:=]\\s*[^\\s"\']{8,}'].join('|'), 'gi');
  let ranh = 0;
  for (const f of lietKe(goc)) {
    if (nhay.test(readFileSync(f, 'utf8'))) { ranh++; console.log('  NHẠY-CẬM: ' + f); }
    nhay.lastIndex = 0;
  }
  dat('S output g09 không có credential có cấu trúc', ranh === 0, `${ranh} tệp`);
}

console.log('');
console.log(errors.length === 0 ? 'KẾT LUẬN: ĐẠT — favicon hợp lệ, đúng 4 vị trí hints đã gỡ, astro check 0/0/0' : `KẾT LUẬN: KHÔNG ĐẠT (${errors.length} ca)`);
process.exit(errors.length === 0 ? 0 : 1);
