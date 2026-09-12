// =============================================================================
// check-g02-history-timeline.mjs — Kiểm gói G02: chuẩn hóa nguồn 28 mốc timeline
// =============================================================================
// Hai lớp:
//   Lớp JSON (luôn chạy): schema mới của src/data/timeline.json — 28 mốc, slug
//     duy nhất, year là SỐ phục vụ sắp xếp/điều hướng, timeLabel là nhãn hiển
//     thị (giữ ~, khoảng năm), loại ngày, mức claim có phạm vi, nguồn cấp mốc
//     HTTPS có ngày kiểm, trạng thái đọc tiếp.
//   Lớp dist (khi đã build): trang /lich-su render đủ 28 thẻ, nguồn hiển thị,
//     nhãn "Chưa có bài đọc thêm" khớp số mốc không có link, nút điều hướng
//     đầu tiên nhảy tới mốc đầu (Peter Henlein ~1510), dải trang chủ hiển thị
//     timeLabel, không link nội bộ hỏng.
//
// Cách chạy: node scripts/check-g02-history-timeline.mjs [thư-mục-dist]
//   - không đối số: chỉ chạy lớp JSON (dùng trong npm run check)
//   - có thư-mục-dist (vd "dist"): chạy thêm lớp dist (nối trong npm run build)
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

const ROOT = process.cwd();
const argv = process.argv.slice(2);
const distArg = argv.find((a) => !a.startsWith('--'));
const DIST = distArg ? resolve(ROOT, distArg) : null;

const results = { thoiGian: new Date().toISOString(), root: ROOT, dist: DIST, json: [], distChecks: [], tongKet: null };
const errors = [];

const DATA = join(ROOT, 'src', 'data', 'timeline.json');
const raw = readFileSync(DATA, 'utf8');
let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error(`LỖI  timeline.json không parse được JSON: ${e.message}`);
  process.exit(1);
}

const kiem = (id, ten, dat, chiTiet = '') => {
  results.json.push({ id, ten, dat: dat === true, chiTiet });
  console.log(`  ${dat === true ? 'ĐẠT' : 'LỖI '} [${id}] ${ten}${dat === true ? '' : ` — ${chiTiet}`}`);
  if (dat !== true) errors.push(`[${id}] ${ten} — ${chiTiet}`);
};

const ENUM_CLAIM = new Set(['first-known', 'brand-first', 'brand-claim', 'type-first', 'recorded', 'context']);

// ===== G2-1: đủ 28 mốc, slug duy nhất, year số nguyên tăng dần =====
kiem('G2-1a', 'Đúng 28 mốc', Array.isArray(data) && data.length === 28, `thực tế ${Array.isArray(data) ? data.length : 'không phải mảng'}`);
const slugs = Array.isArray(data) ? data.map((m) => m.slug) : [];
kiem('G2-1b', 'Slug duy nhất', new Set(slugs).size === slugs.length, `trùng: ${slugs.filter((s, i) => slugs.indexOf(s) !== i).join(', ') || 'không'}`);
const yearLoi = (Array.isArray(data) ? data : []).filter((m, i) => {
  if (typeof m.year !== 'number' || !Number.isInteger(m.year) || m.year < 1000) return true;
  const truoc = i > 0 ? data[i - 1].year : -Infinity;
  return m.year < truoc;
});
kiem('G2-1c', 'year là số nguyên, thứ tự không giảm', yearLoi.length === 0, yearLoi.map((m) => `${m.slug}=${JSON.stringify(m.year)}`).join(', ') || 'không');

// ===== G2-2: timeLabel là nhãn hiển thị, không lẫn vào trường số =====
const labelLoi = (Array.isArray(data) ? data : []).filter((m) => {
  if (typeof m.timeLabel !== 'string' || m.timeLabel.trim() === '') return true;
  if (/^\d+$/.test(m.timeLabel.trim()) && m.timeLabel.trim() !== String(m.year)) return true;
  return false;
});
kiem('G2-2', 'timeLabel nhãn hiển thị hợp lệ (giữ ~, khoảng năm)', labelLoi.length === 0, labelLoi.map((m) => m.slug).join(', ') || 'không');

// ===== G2-3: loại ngày, mức claim có phạm vi, nguồn cấp mốc HTTPS =====
const metaLoi = [];
for (const m of Array.isArray(data) ? data : []) {
  if (typeof m.dayType !== 'string' || m.dayType.trim() === '') { metaLoi.push(`${m.slug}: thiếu dayType`); continue; }
  if (!ENUM_CLAIM.has(m.claimLevel)) { metaLoi.push(`${m.slug}: claimLevel "${m.claimLevel}" không thuộc bộ hợp lệ`); }
  const canScope = ['first-known', 'brand-first', 'brand-claim', 'type-first'].includes(m.claimLevel);
  if (canScope && (typeof m.claimScope !== 'string' || m.claimScope.trim() === '')) metaLoi.push(`${m.slug}: mức claim "${m.claimLevel}" cần claimScope`);
  if (!Array.isArray(m.sources) || m.sources.length < 1) { metaLoi.push(`${m.slug}: thiếu sources`); continue; }
  for (const s of m.sources) {
    if (typeof s.url !== 'string' || !s.url.startsWith('https://')) metaLoi.push(`${m.slug}: nguồn không HTTPS — ${s.url}`);
    if (typeof s.name !== 'string' || s.name.trim() === '') metaLoi.push(`${m.slug}: nguồn thiếu name`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s.checked ?? '')) metaLoi.push(`${m.slug}: nguồn thiếu/ngày kiểm sai định dạng (${s.checked})`);
    if (typeof s.proves !== 'string' || s.proves.trim() === '') metaLoi.push(`${m.slug}: nguồn thiếu proves (nguồn chứng minh gì)`);
  }
}
kiem('G2-3', 'Loại ngày + mức claim có phạm vi + nguồn cấp mốc HTTPS có ngày kiểm', metaLoi.length === 0, metaLoi.join(' | ') || 'không');

// ===== G2-4: mốc ~1510 giữ xấp xỉ nhưng điều hướng được =====
const henlein = (Array.isArray(data) ? data : []).find((m) => m.slug === 'peter-henlein');
kiem('G2-4', 'Mốc ~1510 giữ nhãn xấp xỉ, year số 1510 (điều hướng được)', !!henlein && henlein.year === 1510 && typeof henlein.timeLabel === 'string' && henlein.timeLabel.startsWith('~'), henlein ? `year=${JSON.stringify(henlein.year)}, timeLabel=${JSON.stringify(henlein.timeLabel)}` : 'thiếu mốc');

// ===== G2-5: claim "đầu tiên" phải có mức claim có phạm vi =====
const reFirst = /đầu tiên|first/i;
const claimSai = [];
for (const m of Array.isArray(data) ? data : []) {
  const vanBan = `${m.title ?? ''} ${m.description ?? ''}`;
  if (reFirst.test(vanBan) && !['first-known', 'brand-first', 'brand-claim', 'type-first'].includes(m.claimLevel)) {
    claimSai.push(`${m.slug} (claimLevel=${m.claimLevel})`);
  }
}
kiem('G2-5', 'Chữ "đầu tiên" chỉ xuất hiện khi mốc có mức claim + phạm vi', claimSai.length === 0, claimSai.join(', ') || 'không');

// ===== G2-6: readMore chỉ là route nội bộ hoặc null =====
const rmLoi = (Array.isArray(data) ? data : []).filter((m) => m.readMore !== null && !(typeof m.readMore === 'string' && m.readMore.startsWith('/') && !m.readMore.startsWith('//')));
kiem('G2-6', 'readMore: null hoặc route nội bộ "/"', rmLoi.length === 0, rmLoi.map((m) => m.slug).join(', ') || 'không');

// ===== Lớp dist =====
function routeExists(rel) {
  const clean = rel.split(/[?#]/)[0].replace(/\/$/, '');
  if (clean === '') return existsSync(join(DIST, 'index.html'));
  return existsSync(join(DIST, clean, 'index.html'));
}

if (DIST && existsSync(join(DIST, 'lich-su', 'index.html'))) {
  const html = readFileSync(join(DIST, 'lich-su', 'index.html'), 'utf8');
  const kiemD = (id, ten, dat, chiTiet = '') => {
    results.distChecks.push({ id, ten, dat: dat === true, chiTiet });
    console.log(`  ${dat === true ? 'ĐẠT' : 'LỖI '} [${id}] ${ten}${dat === true ? '' : ` — ${chiTiet}`}`);
    if (dat !== true) errors.push(`[${id}] ${ten} — ${chiTiet}`);
  };

  // G2-7: đủ 28 thẻ
  const soThe = (html.match(/class="milestone-card"/g) ?? []).length;
  kiemD('G2-7', 'HTML /lich-su render đủ 28 thẻ mốc', soThe === 28, `thực tế ${soThe}`);

  // G2-8: nguồn hiển thị — mỗi thẻ có ít nhất 1 link nguồn HTTPS; nhãn giới hạn
  const soLinkNguon = (html.match(/rel="noopener noreferrer"/g) ?? []).length;
  const soNguonMong = (Array.isArray(data) ? data : []).reduce((t, m) => t + m.sources.length, 0);
  kiemD('G2-8', `Nguồn hiển thị trên trang (${soNguonMong} link nguồn từ JSON)`, soLinkNguon === soNguonMong, `thực tế ${soLinkNguon}`);
  const soGioiHan = (html.match(/>Giới hạn:</g) ?? []).length;
  const soGioiHanMong = (Array.isArray(data) ? data : []).filter((m) => m.limit).length;
  kiemD('G2-8b', `Nhãn giới hạn hiển thị đúng ${soGioiHanMong} mốc`, soGioiHan === soGioiHanMong, `thực tế ${soGioiHan}`);

  // G2-9: "Chưa có bài đọc thêm" khớp số mốc readMore=null
  const soChuaCo = (Array.isArray(data) ? data : []).filter((m) => m.readMore === null).length;
  const soNhan = (html.match(/Chưa có bài đọc thêm/g) ?? []).length;
  kiemD('G2-9', `Nhãn "Chưa có bài đọc thêm" xuất hiện đúng ${soChuaCo} lần`, soNhan === soChuaCo, `thực tế ${soNhan}`);

  // G2-10: nút điều hướng đầu tiên nhảy tới mốc 0 (Peter Henlein)
  const nutDau = html.match(/data-jump-to="(\d+)"/);
  const cardDau = html.match(/id="milestone-0"/);
  kiemD('G2-10', 'Nút điều hướng đầu tiên data-jump-to="0" và thẻ mốc 0 tồn tại', !!nutDau && nutDau[1] === '0' && !!cardDau, nutDau ? `nút đầu=${nutDau[1]}` : 'không có nút');

  // G2-11: mọi link nội bộ kiểu TRANG trong trang tồn tại trong dist
  // (bỏ qua asset tĩnh _astro/*.css/*.js/*.svg... — không phải route trang)
  const STATIC_EXT = /\.(css|js|mjs|svg|png|jpe?g|webp|gif|ico|woff2?|ttf|xml|txt|json|webmanifest)$/i;
  const noiBo = [...html.matchAll(/href="(\/[^"h][^"]*)"/g)].map((m) => m[1].split('#')[0]).filter((h) => h !== '/' && !STATIC_EXT.test(h));
  const hong = [...new Set(noiBo)].filter((h) => !routeExists(h));
  kiemD('G2-11', 'Không link nội bộ hỏng trong /lich-su', hong.length === 0, hong.join(', ') || 'không');

  // G2-12: dải trang chủ hiển thị timeLabel (mốc highlight: 0,5,11,16,22,27)
  const idxHtml = readFileSync(join(DIST, 'index.html'), 'utf8');
  const highlights = [0, 5, 11, 16, 22, 27].map((i) => data[i]).filter(Boolean);
  const thieu = highlights.filter((m) => !idxHtml.includes(m.timeLabel));
  kiemD('G2-12', 'Dải lịch sử trang chủ hiển thị timeLabel', thieu.length === 0, thieu.map((m) => m.slug).join(', ') || 'đủ');

  // G2-13: không còn trường cũ internalLink trong dữ liệu xuất bản
  kiemD('G2-13', 'Không còn trường cũ "internalLink" trong JSON', !raw.includes('internalLink'), 'còn sót');
} else if (DIST) {
  errors.push('[G2-DIST] Không tìm thấy dist/lich-su/index.html — cần build trước khi kiểm lớp dist.');
}

// ===== Kết luận =====
const tongCa = results.json.length + results.distChecks.length;
const tongDat = results.json.filter((c) => c.dat).length + results.distChecks.filter((c) => c.dat).length;
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
