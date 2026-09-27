#!/usr/bin/env node
// =============================================================================
// generate-l3-og-images.mjs (L3, GD3) — sinh ảnh chia sẻ 1200×630 lúc build
// =============================================================================
// Đầu vào (nguồn sự thật, không hard-code lại ở đây):
//   - src/data/l3-share-images.json  : thư mục ảnh, quy ước tên file, kế hoạch
//                                      15 mẫu = 14 active + 1 deferred (Orient
//                                      Bambino chờ hồ sơ nguồn xác minh năm)
//   - src/data/timeline.json         : 32 mốc lịch sử (slug, timeLabel, title)
//   - frontmatter VI của mẫu active  : title (cắt trước "—" thành tên hiển thị)
//                                      và year bốn chữ số (năm ra mắt) — chỉ
//                                      mẫu có year hợp lệ mới được sinh ảnh,
//                                      thiếu năm phải dừng build
// Đầu ra: public/images/og/l3/*.jpg — đúng 46 JPEG = 32 mốc + 14 mẫu active,
// 1200×630.
//
// Thiết kế vector/typographic tự dựng (SVG nội tuyến → sharp có sẵn trong repo
// qua astro, không thêm dependency): nền gradient xanh đêm, vòng tròn mặt số
// cách điệu, năm/thời gian lớn màu đồng thau, tên/tiêu đề trắng vẽ xuống dòng.
// Chạy 2 lần với cùng dữ liệu phải cho cùng kết quả (không nhúng thời gian).
// =============================================================================

import { readFileSync, readdirSync, mkdirSync, rmSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(REPO, 'src', 'data', 'l3-share-images.json');
const cauHinh = JSON.parse(readFileSync(DATA, 'utf8'));
const timeline = JSON.parse(readFileSync(join(REPO, cauHinh.timelineSource), 'utf8'));

const OUT_DIR = join(REPO, 'public', cauHinh.dir.replace(/^\//, ''));
const W = 1200;
const H = 630;
const MAU_FONT = "'Times New Roman', Georgia, 'Noto Serif', serif";

/** Thoát ký tự XML cho text SVG. */
function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Cắt tên hiển thị từ title frontmatter: phần trước dấu "—" đầu tiên. */
function tenHienThi(title) {
  const idx = title.indexOf('—');
  return (idx > 0 ? title.slice(0, idx) : title).trim();
}

/** Đọc một trường frontmatter dạng `key: "giá trị"` hoặc `key: số`. */
function truongFm(noiDung, key) {
  const m = noiDung.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'));
  return m ? m[1] : '';
}

/** Chia text xuống dòng theo số ký tự tối đa mỗi dòng (không cắt giữa từ). */
function xuoiDong(text, maxKyTu, soDongToiDa) {
  const tu = text.split(/\s+/);
  const dong = [];
  let hienTai = '';
  for (const t of tu) {
    const thu = hienTai ? `${hienTai} ${t}` : t;
    if (thu.length > maxKyTu && hienTai) {
      dong.push(hienTai);
      hienTai = t;
      if (dong.length === soDongToiDa) break;
    } else {
      hienTai = thu;
    }
  }
  if (dong.length < soDongToiDa && hienTai) dong.push(hienTai);
  let ketQua = dong.slice(0, soDongToiDa).join('\n');
  // Còn dư từ ngoài số dòng cho phép → cắt và thêm dấu ba chấm
  const daGoi = ketQua.replace(/\n/g, ' ');
  if (daGoi.length < text.trim().length) ketQua = `${daGoi}…`;
  return ketQua;
}

/** Khung SVG chung: nền gradient, mặt số cách điệu góc phải, nhãn site. */
function khung(nhanKhuVuc) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="nen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#101f33"/>
      <stop offset="1" stop-color="#1d3a5f"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#nen)"/>
  <g fill="none" stroke="#d9bc8b" stroke-opacity="0.16">
    <circle cx="1030" cy="580" r="170"/>
    <circle cx="1030" cy="580" r="250"/>
    <circle cx="1030" cy="580" r="330"/>
  </g>
  <g stroke="#d9bc8b" stroke-opacity="0.28" stroke-width="6" stroke-linecap="round">
    <line x1="1030" y1="580" x2="1030" y2="440"/>
    <line x1="1030" y1="580" x2="1140" y2="640"/>
  </g>
  <rect x="0" y="0" width="10" height="${H}" fill="#d9bc8b"/>
  <text x="64" y="86" font-family=${JSON.stringify(MAU_FONT)} font-size="30" letter-spacing="6" fill="#d9bc8b" font-weight="bold">ĐỒNG HỒ CƠ</text>
  <text x="64" y="${H - 44}" font-family=${JSON.stringify(MAU_FONT)} font-size="26" letter-spacing="2" fill="#8fa3bd">kienthucdonghoco.vn · ${xmlEscape(nhanKhuVuc)}</text>`;
}

/** Ghép khung + khối thời gian + khối tiêu đề thành SVG đầy đủ. */
function veAnh({ thoiGian, tieuDe, nhanKhuVuc }) {
  const soKyTuDong = tieuDe.length > 52 ? 40 : 34;
  const coChu = tieuDe.length > 52 ? 46 : 56;
  const dong = xuoiDong(tieuDe, soKyTuDong, 2);
  const cacDong = dong.split('\n').map((d, i) =>
    `<text x="64" y="${392 + i * (coChu + 16)}" font-family=${JSON.stringify(MAU_FONT)} font-size="${coChu}" fill="#f5efe2" font-weight="bold">${xmlEscape(d)}</text>`
  ).join('\n  ');
  return `${khung(nhanKhuVuc)}
  <text x="64" y="268" font-family=${JSON.stringify(MAU_FONT)} font-size="132" fill="#d9bc8b" font-weight="bold">${xmlEscape(thoiGian)}</text>
  ${cacDong}
</svg>`;
}

async function chinh() {
  if (!Array.isArray(timeline) || timeline.length !== 32) {
    console.error(`LỖI: timeline.json phải có đúng 32 mốc, đang có ${Array.isArray(timeline) ? timeline.length : 'không phải mảng'}`);
    process.exit(1);
  }
  const slugMoc = new Set(timeline.map((m) => m.slug));
  if (slugMoc.size !== 32) {
    console.error('LỖI: slug mốc lịch sử trùng nhau');
    process.exit(1);
  }

  // Xóa ảnh cũ để kết quả chỉ phụ thuộc dữ liệu nguồn
  if (existsSync(OUT_DIR)) {
    for (const f of readdirSync(OUT_DIR)) {
      if (f.endsWith('.jpg')) rmSync(join(OUT_DIR, f));
    }
  }
  mkdirSync(OUT_DIR, { recursive: true });

  const tepDaSinh = [];
  const congViec = [];

  // 32 mốc lịch sử — thẻ chia sẻ thủ công (mốc chưa có route độc lập)
  for (const moc of timeline) {
    const file = cauHinh.historyFilePattern.replace('{slug}', moc.slug);
    const svg = veAnh({
      thoiGian: moc.timeLabel ?? String(moc.year ?? ''),
      tieuDe: moc.title,
      nhanKhuVuc: 'Lịch sử đồng hồ',
    });
    congViec.push(
      sharp(Buffer.from(svg)).jpeg({ quality: 84, chromaSubsampling: '4:4:4' }).toFile(join(OUT_DIR, file)).then(() => tepDaSinh.push(file)),
    );
  }

  // 15 mẫu iconic: chỉ mẫu ACTIVE được sinh ảnh (mẫu deferred — hiện là
  // Orient Bambino — chờ hồ sơ nguồn xác minh năm, không có ảnh L3).
  // Mọi mẫu active phải có năm 4 chữ số từ frontmatter; KHÔNG có fallback
  // category hay nhãn thay thế năm — thiếu năm là lỗi dừng build.
  let soMauActive = 0;
  for (const mau of cauHinh.models) {
    if (mau.deferred) continue;
    soMauActive += 1;
    const tepVi = join(REPO, 'src', 'content', 'mauIconic', 'vi', `${mau.slugVi}.md`);
    if (!existsSync(tepVi)) {
      console.error(`LỖI: không tìm thấy bài mẫu ${mau.slugVi}`);
      process.exit(1);
    }
    const noiDung = readFileSync(tepVi, 'utf8');
    const ten = tenHienThi(truongFm(noiDung, 'title'));
    const nam = truongFm(noiDung, 'year').trim();
    if (!/^\d{4}$/.test(nam)) {
      console.error(`LỖI: mẫu ${mau.slugVi} thiếu năm hợp lệ trong frontmatter (year="${nam}") — không được dùng nhãn thay thế năm`);
      process.exit(1);
    }
    const file = cauHinh.modelFilePattern.replace('{slug}', mau.slugVi);
    const svg = veAnh({
      thoiGian: nam,
      tieuDe: ten,
      nhanKhuVuc: 'Đồng hồ iconic',
    });
    congViec.push(
      sharp(Buffer.from(svg)).jpeg({ quality: 84, chromaSubsampling: '4:4:4' }).toFile(join(OUT_DIR, file)).then(() => tepDaSinh.push(file)),
    );
  }

  await Promise.all(congViec);

  // Tự kiểm: đủ 46 file (32 mốc + 14 mẫu active), đúng kích thước, không file phẳng gần trống
  if (tepDaSinh.length !== 46) {
    console.error(`LỖI: sinh ${tepDaSinh.length}/46 ảnh`);
    process.exit(1);
  }
  for (const f of tepDaSinh) {
    const buf = readFileSync(join(OUT_DIR, f));
    if (buf.length < 20000) {
      console.error(`LỖI: ${f} nghi trống/phẳng (${buf.length} byte)`);
      process.exit(1);
    }
    const meta = await sharp(buf).metadata();
    if (meta.width !== W || meta.height !== H) {
      console.error(`LỖI: ${f} sai kích thước ${meta.width}x${meta.height}`);
      process.exit(1);
    }
  }

  let tong = 0;
  let max = { f: '', s: 0 };
  let min = { f: '', s: Infinity };
  for (const f of readdirSync(OUT_DIR).filter((x) => x.endsWith('.jpg'))) {
    const s = statSync(join(OUT_DIR, f)).size;
    tong += s;
    if (s > max.s) max = { f, s };
    if (s < min.s) min = { f, s };
  }
  console.log(`✓ Đã sinh ${tepDaSinh.length} ảnh OG 1200×630 (32 mốc + ${soMauActive} mẫu active) → ${cauHinh.dir}`);
  console.log(`  Tổng ${(tong / 1024).toFixed(0)} KB · lớn nhất ${max.f} (${(max.s / 1024).toFixed(0)} KB) · nhỏ nhất ${min.f} (${(min.s / 1024).toFixed(0)} KB)`);
}

chinh().catch((e) => {
  console.error('LỖI sinh ảnh L3:', e);
  process.exit(1);
});
