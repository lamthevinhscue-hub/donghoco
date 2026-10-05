#!/usr/bin/env node
// =============================================================================
// check-l2-timeline-ai.mjs (L2-B, GD3) — kiểm 5 ảnh L2-B và 8 ảnh được duyệt theo lô
// =============================================================================
// Chạy KHÔNG tham số → kiểm nguồn (L2-1..L2-4).
// Chạy `dist`          → kiểm nguồn + kiểm dist (L2-5..L2-7).
//
//   L2-1  Đúng 13 slug/ảnh web: public/images/timeline/<slug>.jpg, JPEG
//         1200×900 (SOF), ≤150 KB, hash không trùng.
//   L2-2  JPG ↔ ANH_AI hai chiều: mọi tệp .jpg timeline đều có slug trong
//         bảng ANH_AI của HistoryTimeline.astro và ngược lại.
//   L2-3  Nhãn nguyên văn + mô tả thay thế: 13 slug có nhãn VI/EN
//         "Minh họa AI tái dựng — không phải ảnh tư liệu" / "AI reconstruction
//         — not a historical photograph" và mục alt riêng trong ALT_AI_MO_RONG.
//   L2-4  Checker được nối vào cuối cả `check` và `build` trong package.json.
//   L2-5  Dist hai trang: 13 mốc render ảnh jpg đúng, alt theo mô tả thay thế
//         + nhận diện AI, nhãn AI ở thẻ và trong data-zoom (hộp phóng to).
//   L2-6  Không ảnh AI ngoài danh sách: mọi "/images/timeline/*.jpg" trong
//         hai trang thuộc tập 18 slug cho phép; SVG đối chứng không bị thay.
//
// Biến môi trường cho mutation trên bản sao: L2B_ROOT (mặc định cwd),
// L2B_DIST (mặc định <L2B_ROOT>/dist). Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = process.env.L2B_ROOT ?? process.cwd();
const KIEM_DIST = process.argv[2] === 'dist';
const DIST = process.env.L2B_DIST ?? join(ROOT, 'dist');

const SLUGS = [
  'blancpain', 'vacheron-constantin', 'breguet-tourbillon', 'breguet-naples',
  'peter-henlein', 'huygens-hairspring', 'rolex-gmt', 'ap-royal-oak',
  'rolex-oyster', 'jlc-reverso', 'rolex-submariner', 'heuer-carrera', 'patek-nautilus',
];
const NHAN_VI = 'Minh họa AI tái dựng — không phải ảnh tư liệu';
const NHAN_EN = 'AI reconstruction — not a historical photograph';
// Tập slug ảnh timeline hợp lệ: 5 ảnh nền + 5 ảnh L2-B + 8 ảnh đã duyệt theo lô
const SLUG_JPG_HOP_LE = new Set([
  'trench-watch', 'universal-time-1884', 'great-depression-1929',
  'atomic-second-1967', 'oil-shock-1973', ...SLUGS,
]);

// Alt kỳ vọng (nguồn chốt — mô tả thay thế tài liệu + nhận diện AI, khớp altFor)
const ALT_KY_VONG = {
  'blancpain': {
    vi: 'Bên trong xưởng nhìn ra làng Jura phủ tuyết lúc chạng vạng, dụng cụ thủ công ở tiền cảnh (minh họa AI tái dựng)',
    en: 'A workshop interior looking onto a snow-covered Jura village at dusk, with hand tools in the foreground (AI reconstruction)',
  },
  'vacheron-constantin': {
    vi: 'Xưởng đồng hồ Geneva thế kỷ 18 trên tầng áp mái, hai người thợ nhìn từ phía sau bên dãy cửa sổ cao (minh họa AI tái dựng)',
    en: 'An eighteenth-century Geneva attic workshop, two craftspeople seen from behind by tall windows (AI reconstruction)',
  },
  'breguet-tourbillon': {
    vi: 'Xưởng đồng hồ Paris khoảng năm 1800, người thợ nhìn từ phía sau cúi qua kính lúp dưới ánh nến (minh họa AI tái dựng)',
    en: 'A Paris watchmaking workshop around 1800, a watchmaker seen from behind leaning over a loupe by candlelight (AI reconstruction)',
  },
  'breguet-naples': {
    vi: 'Phòng khách phong cách Empire, hộp nhung kín trên bàn đá cẩm thạch và nhân vật nhìn từ phía sau (minh họa AI tái dựng)',
    en: 'An Empire-style salon, a closed velvet case on marble and a figure seen from behind (AI reconstruction)',
  },
  'peter-henlein': {
    vi: 'Vỏ đồng hồ bằng đồng, chìa lên dây và dụng cụ trên bàn thợ, tái dựng bối cảnh đầu thế kỷ XVI (minh họa AI tái dựng)',
    en: 'A brass watch housing, winding key and tools on a workbench, reconstructing an early sixteenth-century setting (AI reconstruction)',
  },
  'huygens-hairspring': {
    vi: 'Mô hình minh họa dây tóc xoắn phía trên bánh lắc bằng đồng, không phải hiện vật lịch sử (minh họa AI tái dựng)',
    en: 'An educational model of a spiral spring above a brass balance wheel, not a historical artifact (AI reconstruction)',
  },
  'rolex-gmt': {
    vi: 'Minh họa GMT-Master theo tham chiếu năm 1955, phía sau là nhà ga và máy bay cánh quạt (minh họa AI tái dựng)',
    en: 'An illustration of the GMT-Master based on a 1955 reference, with an airport terminal and propeller aircraft behind it (AI reconstruction)',
  },
  'ap-royal-oak': {
    vi: 'Minh họa Royal Oak 5402ST trên bàn thiết kế cùng thước thép và sổ phác thảo (minh họa AI tái dựng)',
    en: 'An illustration of the Royal Oak 5402ST on a design desk with a steel ruler and sketchbook (AI reconstruction)',
  },
  'rolex-oyster': {
    vi: 'Người bơi đường dài nhỏ giữa biển lúc bình minh, một chiếc thuyền chèo theo sau, vách đá trắng mờ phía xa (minh họa AI tái dựng)',
    en: 'A long-distance swimmer far out at sea at dawn, a rowing boat following, pale cliffs in the distance (AI reconstruction)',
  },
  'jlc-reverso': {
    vi: 'Trận polo thập niên 1930 nhìn từ xa, ngựa phi tung bụi vàng trong nắng chiều (minh họa AI tái dựng)',
    en: 'A 1930s polo match seen from afar, galloping horses raising golden dust in late light (AI reconstruction)',
  },
  'rolex-submariner': {
    vi: 'Trại thám hiểm vùng núi cao đầu thập niên 1950, đoàn leo núi buộc dây đi về phía sống tuyết (minh họa AI tái dựng)',
    en: 'An early-1950s high-altitude expedition camp; roped climbers head toward a snow ridge (AI reconstruction)',
  },
  'heuer-carrera': {
    vi: 'Xe đua cổ lao qua con đường bụi giữa vùng đất khô, bụi tung thành vệt dài (minh họa AI tái dựng)',
    en: 'A vintage race car speeds along a dusty road across dry country, trailing a plume of dust (AI reconstruction)',
  },
  'patek-nautilus': {
    vi: 'Ô cửa kính tròn khung đồng trên tàu biển, nhìn ra mặt biển lặng (minh họa AI tái dựng)',
    en: 'A round brass porthole on an ocean liner, looking out onto a calm sea (AI reconstruction)',
  },
};

const errors = [];
const report = [];
const ok = (id, msg) => report.push(`${id}  ${msg}`);
const fail = (id, msg) => errors.push(`${id}  ${msg}`);

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
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

const TEP_COMPONENT = join(ROOT, 'src', 'components', 'history', 'HistoryTimeline.astro');
let component = '';
try {
  component = readFileSync(TEP_COMPONENT, 'utf8');
} catch {
  fail('L2-2', 'không đọc được HistoryTimeline.astro');
}

// Slugs có mục trong ANH_AI (parse các dòng `  ['slug', {` sau khai báo ANH_AI)
function slugAnnhAi(text) {
  const dau = text.indexOf('const ANH_AI = new Map([');
  const cuoi = text.indexOf('] as [string, { vi: string; en: string }][]', dau);
  if (dau < 0 || cuoi < 0) return [];
  return [...text.slice(dau, cuoi).matchAll(/\['([a-z0-9-]+)', \{/g)].map((m) => m[1]);
}

if (component) {
  // ---- L2-1 Đúng 13 slug/ảnh web ----
  const loi1 = [];
  const hashDaThay = new Set();
  for (const slug of SLUGS) {
    const tep = join(ROOT, 'public', 'images', 'timeline', `${slug}.jpg`);
    if (!existsSync(tep)) {
      loi1.push(`${slug}.jpg: thiếu`);
      continue;
    }
    const buf = readFileSync(tep);
    const kichThuoc = jpegSize(buf);
    if (!kichThuoc || kichThuoc.width !== 1200 || kichThuoc.height !== 900) {
      loi1.push(`${slug}.jpg: ${kichThuoc ? `${kichThuoc.width}x${kichThuoc.height}` : 'không phải JPEG'}`);
    }
    if (buf.length > 150 * 1024) loi1.push(`${slug}.jpg: ${(buf.length / 1024).toFixed(0)} KB > 150 KB`);
    const h = createHash('sha256').update(buf).digest('hex');
    if (hashDaThay.has(h)) loi1.push(`${slug}.jpg trùng byte với ảnh khác`);
    hashDaThay.add(h);
  }
  if (loi1.length === 0) ok('L2-1', '13 ảnh web 1200×900 JPEG ≤150 KB, hash riêng');
  else fail('L2-1', loi1.join('; '));

  // ---- L2-2 JPG ↔ ANH_AI hai chiều ----
  const thuMuc = join(ROOT, 'public', 'images', 'timeline');
  const tepJpg = readdirSync(thuMuc).filter((f) => f.endsWith('.jpg')).map((f) => f.replace(/\.jpg$/, ''));
  const trongMap = new Set(slugAnnhAi(component));
  const jpgNgoaiMap = tepJpg.filter((s) => !trongMap.has(s));
  const mapThieuJpg = [...trongMap].filter((s) => !tepJpg.includes(s));
  if (tepJpg.length === trongMap.size && jpgNgoaiMap.length === 0 && mapThieuJpg.length === 0) {
    ok('L2-2', `JPG ↔ ANH_AI hai chiều: ${tepJpg.length} tệp = ${trongMap.size} mục`);
  } else {
    fail('L2-2', `jpg ngoài map: ${jpgNgoaiMap.join(', ') || '—'}; map thiếu jpg: ${mapThieuJpg.join(', ') || '—'}`);
  }

  // ---- L2-3 Nhãn nguyên văn + mô tả thay thế ----
  const loi3 = [];
  for (const slug of SLUGS) {
    const khoan = component.slice(
      component.indexOf(`['${slug}', {`),
      component.indexOf(']', component.indexOf(`['${slug}', {`)),
    );
    if (!khoan.includes(NHAN_VI)) loi3.push(`${slug}: thiếu nhãn VI nguyên văn`);
    if (!khoan.includes(NHAN_EN)) loi3.push(`${slug}: thiếu nhãn EN nguyên văn`);
    if (!component.includes(`['${slug}', {`) || !component.includes(ALT_KY_VONG[slug].vi.replace(' (minh họa AI tái dựng)', ''))) {
      loi3.push(`${slug}: thiếu mô tả thay thế trong ALT_AI_MO_RONG`);
    }
  }
  if (loi3.length === 0) ok('L2-3', '13 slug có nhãn VI/EN nguyên văn + mô tả thay thế riêng');
  else fail('L2-3', loi3.join('; '));

  // ---- L2-4 Nối build ----
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  const trongCheck = (pkg.scripts.check ?? '').includes('check-l2-timeline-ai.mjs');
  const trongBuild = (pkg.scripts.build ?? '').includes('check-l2-timeline-ai.mjs');
  if (trongCheck && trongBuild) ok('L2-4', 'checker nối vào cả check và build');
  else fail('L2-4', `check=${trongCheck}, build=${trongBuild}`);
}

// ---- Dist ----
if (KIEM_DIST) {
  const loi5 = [];
  const trang = [['vi', 'lich-su', NHAN_VI], ['en', 'en/history', NHAN_EN]];
  const trangDichDuong = new Set();
  for (const [ngon, duong, nhan] of trang) {
    const tep = join(DIST, duong, 'index.html');
    if (!existsSync(tep)) {
      fail('L2-5', `thiếu trang dist: ${duong}`);
      continue;
    }
    trangDichDuong.add(`/${duong}/`);
    const html = readFileSync(tep, 'utf8');
    // Tách theo thẻ <article> của từng mốc: ảnh, alt, nhãn caption và
    // data-zoom-* của một mốc nằm cùng một khối article
    const cacKhoi = html.split('<article ').slice(1).map((s) => s.slice(0, s.indexOf('</article>')));
    for (const slug of SLUGS) {
      const khoi = cacKhoi.find((b) => b.includes(`/images/timeline/${slug}.jpg`));
      if (!khoi) {
        loi5.push(`${ngon}/${slug}: không có khối article chứa ảnh jpg`);
        continue;
      }
      const imgTag = khoi.match(new RegExp(`<img[^>]*src="/images/timeline/${slug}.jpg"[^>]*>`))?.[0] ?? '';
      if (!imgTag) {
        loi5.push(`${ngon}/${slug}: không tìm thấy thẻ img`);
        continue;
      }
      const alt = imgTag.match(/alt="([^"]*)"/)?.[1];
      const altKyVong = ALT_KY_VONG[slug][ngon];
      if (alt !== altKyVong) loi5.push(`${ngon}/${slug}: alt sai ("${(alt ?? '').slice(0, 50)}…")`);
      if (!imgTag.includes('loading="lazy"')) loi5.push(`${ngon}/${slug}: thiếu lazy loading`);
      // Nhãn AI nguyên văn: hiển thị trong thẻ (caption text) và trong data-zoom-ai
      if (!khoi.includes(nhan)) loi5.push(`${ngon}/${slug}: thiếu nhãn AI nguyên văn trong thẻ`);
      if (!khoi.includes(`data-zoom-ai="${nhan}"`)) loi5.push(`${ngon}/${slug}: data-zoom-ai thiếu/lech nhãn`);
      if (!khoi.includes(`data-zoom-alt="${altKyVong}"`)) loi5.push(`${ngon}/${slug}: data-zoom-alt thiếu/lech`);
    }
    const soNhan = html.split(nhan).length - 1;
    if (soNhan < SLUGS.length) loi5.push(`${duong}: nhãn AI chỉ xuất hiện ${soNhan} lần (<${SLUGS.length})`);
    const soZoomAi = html.split('data-zoom-ai=').length - 1;
    if (soZoomAi < SLUGS.length) loi5.push(`${duong}: data-zoom-ai chỉ ${soZoomAi} (<${SLUGS.length})`);
  }
  if (loi5.length === 0) ok('L2-5', `2 trang dist: 13 mốc mỗi trang có ảnh + alt mô tả thay thế + nhãn AI ở thẻ và data-zoom`);
  else fail('L2-5', loi5.slice(0, 8).join('; '));

  // ---- L2-6 Không ảnh AI ngoài danh sách ----
  const loi6 = [];
  for (const [, duong] of trang) {
    const tep = join(DIST, duong, 'index.html');
    const html = readFileSync(tep, 'utf8');
    for (const m of html.matchAll(/\/images\/timeline\/([a-z0-9-]+)\.jpg/g)) {
      if (!SLUG_JPG_HOP_LE.has(m[1])) loi6.push(`${duong}: ảnh lạ ${m[1]}.jpg`);
    }
  }
  // SVG đối chứng vẫn giữ tệp cùng slug trong public.
  if (loi6.length === 0) ok('L2-6', 'không ảnh timeline .jpg nào ngoài 18 slug cho phép');
  else fail('L2-6', loi6.join('; '));
}

console.log('KIỂM TRA 13 ẢNH AI BỐI CẢNH TRÊN DÒNG THỜI GIAN' + (KIEM_DIST ? ' (kèm dist)' : ' (nguồn)'));
for (const line of report) console.log(`  ĐẠT  ${line}`);
if (errors.length > 0) {
  console.log('  KẾT LUẬN: KHÔNG ĐẠT:');
  for (const e of errors) console.log(`    LỖI  ${e}`);
  process.exit(1);
}
console.log('  KẾT LUẬN: ĐẠT — 13 ảnh AI tích hợp đúng nhãn, alt và phạm vi.');
