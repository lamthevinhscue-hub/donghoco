#!/usr/bin/env node
// =============================================================================
// check-l3-og-images.mjs (L3, GD3) — kiểm ảnh chia sẻ riêng 32 mốc + 14 mẫu active (1 deferred)
// =============================================================================
// Chạy KHÔNG tham số → kiểm nguồn (L3-1..L3-5).
// Chạy `dist`          → kiểm nguồn + kiểm dist (L3-6..L3-9).
//
//   L3-1  Nguồn dữ liệu duy nhất: l3-share-images.json có đúng 15 mẫu kế
//         hoạch = 14 active + 1 deferred (orient-bambino), slug khớp danh
//         sách phê duyệt (không thừa/thiếu), slugEn chỉ thuộc các
//         bài EN tồn tại; timeline.json đúng 32 mốc, slug duy nhất.
//   L3-2  Sinh đủ 46 định danh ảnh (32 + 14 active) duy nhất, không đụng tên nhau.
//   L3-3  Script sinh được nối vào build TRƯỚC astro build; JSON không chứa
//         URL/asset ngoài repo (không http/https).
//   L3-4  Ảnh nguồn (public/images/og/l3) có đúng 46 tệp, không tệp thừa.
//   L3-5  Không tác động route ngoài danh sách: JSON chỉ chứa mapping ảnh,
//         không chứa route mới.
//   L3-6  46 ảnh trong dist: JPEG thật (FF D8), 1200×630 (đọc SOF), hash
//         không trùng nhau, không tệp rỗng/nghi trống.
//   L3-7  23 trang đích (14 VI + 9 EN): og:image tuyệt đối trỏ đúng file
//         riêng; og:image:width/height/type và twitter:image khớp; alt =
//         tiền tố ngôn ngữ + og:title của trang (không dùng alt chung).
//   L3-8  Trang đối chứng (ngoài phạm vi L3) giữ OG cũ + alt chung; không
//         trang nào ngoài 23 trang đích dùng ảnh /images/og/l3/.
//
// Biến môi trường cho mutation trên bản sao: L3_ROOT (gốc nguồn, mặc định
// cwd), L3_DIST (thư mục dist, mặc định <L3_ROOT>/dist). Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = process.env.L3_ROOT ?? process.cwd();
const KIEM_DIST = process.argv[2] === 'dist';
const DIST = process.env.L3_DIST ?? join(ROOT, 'dist');
const SITE = 'https://www.kienthucdonghoco.vn';

// Danh sách 15 mẫu kế hoạch (nguồn chốt của checker): 14 mẫu active + đúng
// một mẫu deferred là orient-bambino (giá trị null = không có bản EN; chữ
// DEFERRED đánh dấu mẫu chờ hồ sơ nguồn xác minh năm, không có ảnh L3).
const MUC_TIEU = new Map([
  ['rolex-submariner', 'rolex-submariner'],
  ['omega-speedmaster', 'omega-speedmaster'],
  ['rolex-gmt-master', 'rolex-gmt-master'],
  ['royal-oak', 'royal-oak'],
  ['patek-nautilus', 'patek-nautilus'],
  ['reverso', 'reverso'],
  ['cartier-tank', 'cartier-tank'],
  ['fifty-fathoms', 'fifty-fathoms'],
  ['zenith-el-primero', 'zenith-el-primero'],
  ['monaco', null],
  ['grand-seiko-snowflake', null],
  ['seiko-62mas', null],
  ['tudor-black-bay', null],
  ['tissot-prx', null],
  ['orient-bambino', 'DEFERRED'],
]);

const errors = [];
const report = [];
const ok = (id, msg) => report.push(`${id}  ${msg}`);
const fail = (id, msg) => errors.push(`${id}  ${msg}`);

const DU_LIEU = join(ROOT, 'src', 'data', 'l3-share-images.json');
const TIMELINE = join(ROOT, 'src', 'data', 'timeline.json');

let cauHinh = null;
try {
  cauHinh = JSON.parse(readFileSync(DU_LIEU, 'utf8'));
} catch (e) {
  fail('L3-1', `không đọc được l3-share-images.json: ${e.message}`);
}
let timeline = null;
try {
  timeline = JSON.parse(readFileSync(TIMELINE, 'utf8'));
} catch (e) {
  fail('L3-1', `không đọc được timeline.json: ${e.message}`);
}

function jpegSize(buf) {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    const doDai = buf.readUInt16BE(i + 2);
    i += 2 + doDai;
  }
  return null;
}

if (cauHinh && timeline) {
  // ---- L3-1 Nguồn dữ liệu ----
  const loi1 = [];
  if (!Array.isArray(timeline) || timeline.length !== 32) {
    loi1.push(`timeline.json phải có đúng 32 mốc (đang ${Array.isArray(timeline) ? timeline.length : 'không phải mảng'})`);
  } else if (new Set(timeline.map((m) => m.slug)).size !== 32) {
    loi1.push('slug mốc lịch sử trùng nhau');
  }
  const models = Array.isArray(cauHinh.models) ? cauHinh.models : [];
  const deferred = models.filter((m) => m.deferred);
  const active = models.filter((m) => !m.deferred);
  const viSet = new Set(active.map((m) => m.slugVi));
  if (models.length !== 15) loi1.push(`số mẫu = ${models.length} !== 15`);
  if (deferred.length !== 1 || deferred[0].slugVi !== 'orient-bambino') {
    loi1.push(`mẫu deferred phải đúng một là orient-bambino (đang ${deferred.map((m) => m.slugVi).join(', ') || 'không có'})`);
  } else if (!deferred[0].deferredReason || deferred[0].deferredReason.trim().length < 10) {
    loi1.push('mẫu deferred thiếu lý do chờ hồ sơ nguồn');
  }
  if ('fallbackModelLabel' in (cauHinh ?? {})) loi1.push('còn fallbackModelLabel trong mapping — cấm nhãn thay thế năm');
  if (JSON.stringify(cauHinh).includes('category')) loi1.push('mapping còn nhắc category — cấm fallback category');
  const mucTieuActive = [...MUC_TIEU.entries()].filter(([, en]) => en !== 'DEFERRED');
  for (const m of active) {
    if (!mucTieuActive.some(([s]) => s === m.slugVi)) loi1.push(`slugVi active không thuộc danh sách phê duyệt: ${m.slugVi}`);
    else if (MUC_TIEU.get(m.slugVi) !== (m.slugEn ?? null)) loi1.push(`slugEn lệch phê duyệt cho ${m.slugVi}: ${m.slugEn}`);
  }
  const thua = mucTieuActive.filter(([s]) => !viSet.has(s));
  if (thua.length > 0) loi1.push(`thiếu slug active: ${thua.map(([s]) => s).join(', ')}`);
  // Rule năm/thời gian: mọi mẫu active phải có năm 4 chữ số từ frontmatter VI
  const loiNam = [];
  for (const m of active) {
    const tepVi = join(ROOT, 'src', 'content', 'mauIconic', 'vi', `${m.slugVi}.md`);
    if (!existsSync(tepVi)) {
      loiNam.push(`mẫu ${m.slugVi}: thiếu tệp VI`);
      continue;
    }
    const nam = readFileSync(tepVi, 'utf8').match(/^year:\s*"?(\d{4})"?$/m)?.[1];
    if (!nam) loiNam.push(`mẫu ${m.slugVi}: year không hợp lệ/thiếu — cấm nhãn thay thế năm`);
  }
  if (loi1.length === 0 && loiNam.length === 0) {
    ok('L3-1', `15 mẫu kế hoạch = 14 active + 1 deferred (orient-bambino, chờ hồ sơ nguồn xác minh năm); 14 mẫu active đều có năm 4 chữ số từ frontmatter; timeline đúng 32 mốc slug duy nhất`);
  } else {
    fail('L3-1', [...loi1, ...loiNam].join('; '));
  }

  // ---- L3-2 46 định danh ảnh ----
  const dinhDanh = new Set();
  for (const moc of timeline ?? []) dinhDanh.add(cauHinh.historyFilePattern.replace('{slug}', moc.slug));
  for (const m of active) dinhDanh.add(cauHinh.modelFilePattern.replace('{slug}', m.slugVi));
  if (dinhDanh.size === 46) ok('L3-2', `46 định danh ảnh duy nhất (32 mốc + 14 mẫu active)`);
  else fail('L3-2', `định danh ảnh = ${dinhDanh.size} !== 46`);

  // ---- L3-3 Script nối build đúng vị trí; JSON không có asset ngoài ----
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  const chuoiBuild = pkg.scripts.build ?? '';
  const viTriSinh = chuoiBuild.indexOf('node scripts/generate-l3-og-images.mjs');
  const viTriAstro = chuoiBuild.indexOf('astro build');
  if (viTriSinh >= 0 && viTriAstro > viTriSinh) {
    ok('L3-3', 'script sinh ảnh nối vào build trước astro build');
  } else {
    fail('L3-3', `script sinh ảnh chưa nối trước astro build (sinh=${viTriSinh}, astro=${viTriAstro})`);
  }
  if (/https?:\/\//.test(JSON.stringify(cauHinh))) fail('L3-3', 'JSON chứa URL ngoài repo');
  else if (viTriSinh >= 0) ok('L3-3b', 'JSON không chứa URL/asset ngoài repo');

  // ---- L3-4 + L3-5 Mapping route ----
  const khongCoMau = models.filter((m) => !existsSync(join(ROOT, 'src', 'content', 'mauIconic', 'vi', `${m.slugVi}.md`)));
  const enSai = models.filter((m) => m.slugEn && !existsSync(join(ROOT, 'src', 'content', 'mauIconic', 'en', `${m.slugEn}.md`)));
  if (khongCoMau.length === 0 && enSai.length === 0) {
    ok('L3-5', 'mapping chỉ trỏ bài mẫu active có thật (VI 14, EN 9) — không route ngoài danh sách');
  } else {
    fail('L3-5', `bài thiếu: VI ${khongCoMau.map((m) => m.slugVi).join(', ') || '—'}; EN ${enSai.map((m) => m.slugEn).join(', ') || '—'}`);
  }

  const thuMucNguon = join(ROOT, 'public', cauHinh.dir.replace(/^\//, ''));
  if (existsSync(thuMucNguon)) {
    const tep = readdirSync(thuMucNguon).filter((f) => f.endsWith('.jpg'));
    if (tep.length === 46 && dinhDanh.size === 46 && tep.every((f) => dinhDanh.has(f))) {
      ok('L3-4', `public${cauHinh.dir}: đúng 46 tệp, không thừa`);
    } else {
      fail('L3-4', `public${cauHinh.dir} có ${tep.length} tệp jpg (kỳ vọng 46) hoặc tên lệch định danh`);
    }
  } else {
    fail('L3-4', `thiếu thư mục public${cauHinh.dir} — hãy chạy npm run build`);
  }
}

// ---- Dist ----
if (KIEM_DIST) {
  const thuMucDist = join(DIST, 'images', 'og', 'l3');
  const hashDaThay = new Map();
  const loi6 = [];
  if (cauHinh) {
    if (!existsSync(thuMucDist)) {
      fail('L3-6', `thiếu ${cauHinh.dir} trong dist`);
    } else {
      const tep = readdirSync(thuMucDist).filter((f) => f.endsWith('.jpg'));
      if (tep.length !== 46) loi6.push(`số tệp = ${tep.length} !== 46`);
      for (const f of tep) {
        const buf = readFileSync(join(thuMucDist, f));
        if (buf.length < 20000) loi6.push(`${f} nghi trống/phẳng (${buf.length} byte)`);
        const kichThuoc = jpegSize(buf);
        if (!kichThuoc || kichThuoc.width !== 1200 || kichThuoc.height !== 630) {
          loi6.push(`${f} sai kích thước/format: ${kichThuoc ? `${kichThuoc.width}x${kichThuoc.height}` : 'không phải JPEG'}`);
        }
        const h = createHash('sha256').update(buf).digest('hex');
        if (hashDaThay.has(h)) loi6.push(`${f} trùng byte với ${hashDaThay.get(h)}`);
        hashDaThay.set(h, f);
      }
      if (loi6.length === 0) ok('L3-6', `46 ảnh dist: JPEG 1200×630, hash riêng, không trống`);
      else fail('L3-6', loi6.join('; '));
    }
  }

  // Meta helpers
  const meta = (html, property) => html.match(new RegExp(`<meta property="${property}" content="([^"]*)"`))?.[1];
  const ten = (html, name) => html.match(new RegExp(`<meta name="${name}" content="([^"]*)"`))?.[1];
  const titleRieng = (html) => meta(html, 'og:title');

  if (cauHinh) {
    const loi7 = [];
    const trangDich = new Set();
    const mauActive = cauHinh.models.filter((m) => !m.deferred);
    if (mauActive.length !== 14) loi7.push(`mẫu active = ${mauActive.length} !== 14`);
    for (const m of mauActive) {
      const tepAnh = cauHinh.modelFilePattern.replace('{slug}', m.slugVi);
      const cacNgonNgu = [
        ['vi', `/mau-iconic/${m.slugVi}/`],
        ...(m.slugEn ? [['en', `/en/iconic-watches/${m.slugEn}/`]] : []),
      ];
      for (const [ngon, duong] of cacNgonNgu) {
        trangDich.add(duong);
        const tep = join(DIST, duong.replace(/^\//, ''), 'index.html');
        if (!existsSync(tep)) {
          loi7.push(`${duong}: thiếu trang`);
          continue;
        }
        const html = readFileSync(tep, 'utf8');
        const ogImage = meta(html, 'og:image');
        const kyVong = SITE + `${cauHinh.dir}/${tepAnh}`;
        if (ogImage !== kyVong) loi7.push(`${duong}: og:image=${ogImage} !== ${kyVong}`);
        if (meta(html, 'og:image:width') !== '1200') loi7.push(`${duong}: og:image:width sai`);
        if (meta(html, 'og:image:height') !== '630') loi7.push(`${duong}: og:image:height sai`);
        if (meta(html, 'og:image:type') !== 'image/jpeg') loi7.push(`${duong}: og:image:type sai`);
        if (ten(html, 'twitter:image') !== ogImage) loi7.push(`${duong}: twitter:image lệch og:image`);
        const alt = meta(html, 'og:image:alt');
        const altTwitter = ten(html, 'twitter:image:alt');
        const tieuDe = titleRieng(html) ?? '';
        const tienTo = ngon === 'vi' ? 'Ảnh chia sẻ: ' : 'Share image: ';
        if (alt !== tienTo + tieuDe) loi7.push(`${duong}: og:image:alt không theo tiêu đề riêng ("${alt}")`);
        if (altTwitter !== tienTo + tieuDe) loi7.push(`${duong}: twitter:image:alt không theo tiêu đề riêng`);
      }
    }
    if (loi7.length === 0 && trangDich.size === 23) ok('L3-7', `${trangDich.size} trang đích (14 VI + 9 EN): og:image trỏ đúng file riêng, width/height/type + twitter khớp, alt theo tiêu đề riêng`);
    else if (loi7.length === 0) fail('L3-7', `số trang đích = ${trangDich.size} !== 23`);
    else fail('L3-7', loi7.slice(0, 6).join('; '));

    // L3-8 — đối chứng giữ OG cũ; không trang ngoài phạm vi dùng ảnh L3
    const ALT_CHUNG_VI = 'Kiến Thức Đồng Hồ Cơ — bách khoa tiếng Việt về đồng hồ cơ, từ nguyên lý bộ máy đến nghệ thuật sưu tầm';
    const ALT_CHUNG_EN = 'Kiến Thức Đồng Hồ Cơ — a Vietnamese encyclopedia of mechanical watches, from movement principles to the art of collecting';
    const loi8 = [];
    const doiChung = [
      ['/co-che/bo-thoat/', `${SITE}/images/og/og-co-che.jpg`, ALT_CHUNG_VI],
      ['/en/glossary/movement/', `${SITE}/og-default.jpg`, ALT_CHUNG_EN],
      // Orient Bambino deferred — phải về OG khu vực /mau-iconic + alt chung
      ['/mau-iconic/orient-bambino/', `${SITE}/images/og/og-mau-iconic.jpg`, ALT_CHUNG_VI],
    ];
    for (const [duong, anhKyVong, altKyVong] of doiChung) {
      const tep = join(DIST, duong.replace(/^\//, ''), 'index.html');
      if (!existsSync(tep)) {
        loi8.push(`${duong}: thiếu trang đối chứng`);
        continue;
      }
      const html = readFileSync(tep, 'utf8');
      if (meta(html, 'og:image') !== anhKyVong) loi8.push(`${duong}: og:image lệch OG cũ (${meta(html, 'og:image')})`);
      if (meta(html, 'og:image:alt') !== altKyVong) {
        loi8.push(`${duong}: alt không còn là chuỗi chung ("${meta(html, 'og:image:alt')}")`);
      }
    }
    // Quét mọi trang: chỉ tập đích được phép dùng ảnh L3
    const quet = (d, vao = []) => {
      let ketQua = vao;
      for (const f of readdirSync(d)) {
        const p = join(d, f);
        if (statSync(p).isDirectory()) ketQua = quet(p, ketQua);
        else if (f === 'index.html') ketQua.push(p);
      }
      return ketQua;
    };
    const tatCa = quet(DIST);
    for (const tep of tatCa) {
      const html = readFileSync(tep, 'utf8');
      const og = meta(html, 'og:image') ?? '';
      if (og.includes('/images/og/l3/')) {
        const duong = tep.replace(/\\/g, '/').replace(`${DIST.replace(/\\/g, '/')}/`, '/').replace(/index\.html$/, '');
        if (!trangDich.has(duong)) loi8.push(`trang ngoài phạm vi dùng ảnh L3: ${duong}`);
      }
    }
    if (loi8.length === 0) ok('L3-8', `trang đối chứng giữ OG cũ + alt chung; ${tatCa.length} trang quét — không ai ngoài phạm vi dùng ảnh L3`);
    else fail('L3-8', loi8.slice(0, 6).join('; '));
  }
}

console.log('KIỂM TRA L3 — ẢNH CHIA SẺ RIÊNG (32 MỐC + 14 MẪU ACTIVE, 1 DEFERRED)' + (KIEM_DIST ? ' (kèm dist)' : ' (nguồn)'));
for (const line of report) console.log(`  ĐẠT  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — ảnh OG L3 đúng nguồn, đúng kích thước, đúng trang.');
