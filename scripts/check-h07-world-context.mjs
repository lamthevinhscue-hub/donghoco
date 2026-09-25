#!/usr/bin/env node
// =============================================================================
// check-h07-world-context.mjs — Kiểm gói H07-A: 4 mốc bối cảnh thế giới
// =============================================================================
// W1  Kho mốc: đủ 28 mốc nền + đúng 4 slug mới (không thêm/bớt ngoài danh sách)
// W2  Mỗi mốc mới: type "culture", claimLevel "context", đủ VI/EN toàn trường,
//     limit + limit_en bắt buộc (bối cảnh phải có giới hạn), nguồn HTTPS có ngày
//     kiểm + proves, readMore null hoặc route nội bộ
// W3  Bản chất bối cảnh: limit của mốc mới phải chứa phát biểu phi-nhân-quả;
//     title/description không dùng dáng nhân quả khẳng định
// W4  Ranh giới 6 chương liên tiếp phủ toàn bộ dữ liệu (khớp historyChapters)
// W5  Lớp dist (khi có thư mục dist): hai trang render đủ thẻ + thẻ culture khớp
//     dữ liệu; tiêu đề mốc mới hiện đúng ngôn ngữ; giới hạn mới render; nhãn số
//     mốc theo dữ liệu; link đọc tiếp của mốc mới tới đích tồn tại
// Chạy: node scripts/check-h07-world-context.mjs [thư-mục-dist]
//   - không đối số: chỉ lớp nguồn (dùng trong npm run check)
//   - có thư-mục-dist: chạy thêm lớp dist (nối trong npm run build)
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = process.cwd();
const distArg = process.argv.slice(2).find((a) => !a.startsWith('--'));
const DIST = distArg ? resolve(ROOT, distArg) : null;

const errors = [];
const ketqua = { thoiGian: new Date().toISOString(), nguon: [], dist: [], tongKet: null };
const kiem = (id, ten, dat, chiTiet = '') => {
  ketqua.nguon.push({ id, ten, dat: dat === true, chiTiet });
  console.log(`  ${dat === true ? 'ĐẠT' : 'LỖI '} [${id}] ${ten}${dat === true ? '' : ` — ${chiTiet}`}`);
  if (dat !== true) errors.push(`[${id}] ${ten} — ${chiTiet}`);
};

// ===== W1: kho mốc =====
const MOC_NEN_SO = 28;
const MOC_MOI = ['universal-time-1884', 'great-depression-1929', 'atomic-second-1967', 'oil-shock-1973'];
const data = JSON.parse(readFileSync(join(ROOT, 'src', 'data', 'timeline.json'), 'utf8'));
const slugs = data.map((m) => m.slug);
kiem('W1', `Kho mốc: ${MOC_NEN_SO} nền + đúng ${MOC_MOI.length} slug mới (tổng ${MOC_NEN_SO + MOC_MOI.length})`,
  data.length === MOC_NEN_SO + MOC_MOI.length
  && MOC_MOI.every((s) => slugs.includes(s))
  && slugs.filter((s) => !MOC_MOI.includes(s)).length === MOC_NEN_SO
  && new Set(slugs).size === slugs.length,
  `thực tế ${data.length}, mới=${slugs.filter((s) => MOC_MOI.includes(s)).join(',')}`);

// ===== W2 + W3: từng mốc mới =====
const RE_NHAN_QUA_EN = /\b(created the need for|\bcaused\b|led to)\b/i;
const RE_NHAN_QUA_VI = /(dẫn đến|đã khiến|chính là nguyên nhân)/;
const RE_MIEN_TRU_VI = /(không chứng minh|không tự chứng minh|không gán|không phải bước|cùng thời)/;
const RE_MIEN_TRU_EN = /(not proof|not assigned|does not by itself prove|not a step|simultaneity alone|is not causation|neither\b)/i;

const moiLoi = [];
for (const slug of MOC_MOI) {
  const m = data.find((x) => x.slug === slug);
  if (!m) { moiLoi.push(`${slug}: không tìm thấy`); continue; }
  if (m.type !== 'culture') moiLoi.push(`${slug}: type="${m.type}" (bối cảnh phải là culture)`);
  if (m.claimLevel !== 'context') moiLoi.push(`${slug}: claimLevel="${m.claimLevel}" (bối cảnh phải là context)`);
  for (const [k, ten] of [['title', 'title'], ['description', 'description'], ['dayType', 'dayType'], ['claimScope', 'claimScope'], ['limit', 'limit']]) {
    if (typeof m[k] !== 'string' || m[k].trim() === '') moiLoi.push(`${slug}: thiếu ${ten} (VI)`);
    if (typeof m[`${k}_en`] !== 'string' || m[`${k}_en`].trim() === '') moiLoi.push(`${slug}: thiếu ${ten}_en`);
  }
  if (!Array.isArray(m.sources) || m.sources.length < 1) {
    moiLoi.push(`${slug}: thiếu sources`);
  } else {
    for (const s of m.sources) {
      if (typeof s.url !== 'string' || !s.url.startsWith('https://')) moiLoi.push(`${slug}: nguồn không HTTPS — ${s.url}`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(s.checked ?? '')) moiLoi.push(`${slug}: nguồn thiếu/ngày kiểm sai định dạng`);
      if (typeof s.proves !== 'string' || s.proves.trim() === '') moiLoi.push(`${slug}: nguồn thiếu proves`);
    }
  }
  if (m.readMore !== null && !(typeof m.readMore === 'string' && m.readMore.startsWith('/') && !m.readMore.startsWith('//'))) {
    moiLoi.push(`${slug}: readMore phải null hoặc route nội bộ`);
  }
  // W3 — bản chất bối cảnh
  if (!RE_MIEN_TRU_VI.test(m.limit ?? '')) moiLoi.push(`${slug}: limit (VI) thiếu phát biểu phi-nhân-quả`);
  if (!RE_MIEN_TRU_EN.test(m.limit_en ?? '')) moiLoi.push(`${slug}: limit_en thiếu phát biểu phi-nhân-quả`);
  const vanBan = `${m.title ?? ''} ${m.description ?? ''} ${m.title_en ?? ''} ${m.description_en ?? ''}`;
  if (RE_NHAN_QUA_EN.test(vanBan)) moiLoi.push(`${slug}: dáng nhân quả khẳng định trong title/description (EN)`);
  if (RE_NHAN_QUA_VI.test(vanBan)) moiLoi.push(`${slug}: dáng nhân quả khẳng định trong title/description (VI)`);
}
kiem('W2', '4 mốc mới đủ trường VI/EN, type culture, claimLevel context, nguồn hợp lệ, readMore hợp lệ', moiLoi.filter((e) => !e.includes('phi-nhân-quả') && !e.includes('nhân quả khẳng định')).length === 0, moiLoi.filter((e) => !e.includes('phi-nhân-quả') && !e.includes('nhân quả khẳng định')).join(' | ') || 'đủ');
kiem('W3', 'Mỗi mốc mới có giới hạn phi-nhân-quả + không dáng nhân quả khẳng định', moiLoi.filter((e) => e.includes('phi-nhân-quả') || e.includes('nhân quả khẳng định')).length === 0, moiLoi.filter((e) => e.includes('phi-nhân-quả') || e.includes('nhân quả khẳng định')).join(' | ') || 'đủ');

// ===== W4: khung chương liên tiếp phủ dữ liệu =====
const chaptersRaw = readFileSync(join(ROOT, 'src', 'data', 'historyChapters.ts'), 'utf8');
const rangeList = [...chaptersRaw.matchAll(/^\s{4}range: \[(\d+), (\d+)\],$/gm)].map((m) => [Number(m[1]), Number(m[2])]);
let chapOk = rangeList.length === 6 && rangeList[0][0] === 0;
if (chapOk) {
  for (let i = 0; i < rangeList.length; i++) {
    const [d, c] = rangeList[i];
    if (c <= d || (i > 0 && d !== rangeList[i - 1][1]) || (i === 5 && c !== data.length)) { chapOk = false; break; }
  }
}
kiem('W4', '6 chapter range liên tiếp phủ 0 → số mốc dữ liệu', chapOk, `ranges=${JSON.stringify(rangeList)}, n=${data.length}`);

// ===== W6: ảnh web của 4 mốc (P0-C — ảnh AI bối cảnh đã duyệt) =====
// Mỗi mốc H07-A phải có tệp JPG đúng slug, tỉ lệ/kích thước 1200×900 (4:3).
// Đọc kích thước JPEG từ header (SOF0/SOF2) — không cần thư viện ảnh.
const kichThuocJpeg = (tep) => {
  const b = readFileSync(tep);
  let i = 2;
  while (i < b.length - 9) {
    if (b[i] !== 0xff) { i++; continue; }
    const marker = b[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { cao: b.readUInt16BE(i + 5), rong: b.readUInt16BE(i + 7) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
};
{
  const lech = [];
  for (const slug of MOC_MOI) {
    const tep = join(ROOT, 'public', 'images', 'timeline', `${slug}.jpg`);
    if (!existsSync(tep)) { lech.push(`${slug}: thiếu tệp JPG`); continue; }
    const kt = kichThuocJpeg(tep);
    if (!kt || kt.rong !== 1200 || kt.cao !== 900) lech.push(`${slug}: kích thước ${kt ? `${kt.rong}x${kt.cao}` : 'không đọc được'} (cần 1200×900)`);
  }
  kiem('W6', `4 mốc H07-A có JPG đúng slug, 1200×900 (4:3) — minh họa AI bối cảnh đã duyệt, không mang ý nghĩa chứng cứ`, lech.length === 0, lech.join(', ') || 'đủ');
}

// ===== W5: lớp dist =====
if (DIST) {
  const viPath = join(DIST, 'lich-su', 'index.html');
  const enPath = join(DIST, 'en', 'history', 'index.html');
  if (existsSync(viPath) && existsSync(enPath)) {
    const viHtml = readFileSync(viPath, 'utf8');
    const enHtml = readFileSync(enPath, 'utf8');
    const viCards = (viHtml.match(/class="milestone-card"/g) ?? []).length;
    const enCards = (enHtml.match(/class="milestone-card"/g) ?? []).length;
    const soCulture = data.filter((m) => m.type === 'culture').length;
    const viCulture = (viHtml.match(/data-type="culture"/g) ?? []).length;
    const enCulture = (enHtml.match(/data-type="culture"/g) ?? []).length;
    kiem('W5-a', `Hai trang render đủ ${data.length} thẻ + thẻ culture khớp dữ liệu (${soCulture})`,
      viCards === data.length && enCards === data.length && viCulture === soCulture && enCulture === soCulture,
      `vi=${viCards}/${viCulture}, en=${enCards}/${enCulture}`);

    const thieuTieu = [];
    for (const slug of MOC_MOI) {
      const m = data.find((x) => x.slug === slug);
      if (!viHtml.includes(m.title)) thieuTieu.push(`VI:${slug}`);
      if (!enHtml.includes(m.title_en)) thieuTieu.push(`EN:${slug}`);
      if (m.limit && !viHtml.includes(m.limit.slice(0, 40))) thieuTieu.push(`VI-giới hạn:${slug}`);
      if (m.limit_en && !enHtml.includes(m.limit_en.slice(0, 40))) thieuTieu.push(`EN-giới hạn:${slug}`);
      for (const s of m.sources) {
        if (!viHtml.includes(s.url)) thieuTieu.push(`VI-nguồn:${slug}`);
        if (!enHtml.includes(s.url)) thieuTieu.push(`EN-nguồn:${slug}`);
      }
    }
    kiem('W5-b', 'Mốc mới: tiêu đề đúng ngôn ngữ + giới hạn + nguồn render trên hai trang', thieuTieu.length === 0, thieuTieu.join(', ') || 'đủ');

    const nhanSo = viHtml.includes(`<strong>${data.length} mốc</strong>`) && enHtml.includes(`<strong>${data.length} milestones</strong>`);
    kiem('W5-c', `Nhãn số mốc hiển thị theo dữ liệu (${data.length})`, nhanSo, `vi/en có <strong>${data.length} mốc/milestones</strong>: ${nhanSo}`);

    const docThem = data.filter((m) => MOC_MOI.includes(m.slug) && m.readMore);
    let docHong = [];
    for (const m of docThem) {
      const clean = m.readMore.replace(/\/$/, '');
      if (!existsSync(join(DIST, clean, 'index.html'))) docHong.push(`${m.slug}:${m.readMore}`);
    }
    kiem('W5-d', `Đường đọc tiếp của mốc mới tới đích tồn tại (${docThem.length} mốc có readMore)`, docHong.length === 0, docHong.join(', ') || 'đủ');

    // W5-e (P0-C): dist render đúng JPG + nhãn AI minh bạch đúng ngôn ngữ.
    // Số mốc dùng ảnh AI = 4 mốc H07-A + trench-watch (map ANH_AI của
    // HistoryTimeline) = 5 nhãn mỗi trang. Ảnh là minh họa AI bối cảnh đã duyệt
    // trực quan — không gán ý nghĩa chứng cứ lịch sử/kỹ thuật nào.
    const NHAN_AI_VI = 'Minh họa AI tái dựng — không phải ảnh tư liệu';
    const NHAN_AI_EN = 'AI reconstruction — not a historical photograph';
    const soMocAi = MOC_MOI.length + 1;
    const thieuJpg = MOC_MOI.filter((slug) => !viHtml.includes(`src="/images/timeline/${slug}.jpg"`) || !enHtml.includes(`src="/images/timeline/${slug}.jpg"`));
    const viNhan = (viHtml.match(new RegExp(NHAN_AI_VI, 'g')) ?? []).length;
    const enNhan = (enHtml.match(new RegExp(NHAN_AI_EN, 'g')) ?? []).length;
    const viLan = viHtml.includes(NHAN_AI_EN);
    const enLan = enHtml.includes(NHAN_AI_VI);
    const viAlt = (viHtml.match(/\(minh họa AI tái dựng\)/g) ?? []).length;
    const enAlt = (enHtml.match(/\(AI reconstruction\)/g) ?? []).length;
    kiem('W5-e', `Dist: 4 JPG render đúng + nhãn AI đúng ngôn ngữ ×${soMocAi * 2} (thẻ + attr truyền hộp phóng to, mỗi mốc AI 2 chỗ) + alt khuôn H12-A`,
      thieuJpg.length === 0 && viNhan === soMocAi * 2 && enNhan === soMocAi * 2 && !viLan && !enLan && viAlt === soMocAi * 2 && enAlt === soMocAi * 2,
      `thiếuJPG=${thieuJpg.join(',') || 'không'}, nhãn VI=${viNhan}, EN=${enNhan}, lẫn=${viLan || enLan ? 'có' : 'không'}, alt VI=${viAlt}, EN=${enAlt}`);
  } else {
    errors.push('[W5] Thiếu dist/lich-su/index.html hoặc dist/en/history/index.html — cần build trước khi kiểm lớp dist.');
  }
}

// ===== Kết luận =====
const tongCa = ketqua.nguon.length + ketqua.dist.length;
const tongDat = ketqua.nguon.filter((c) => c.dat).length + ketqua.dist.filter((c) => c.dat).length;
ketqua.tongKet = { tongCa, tongDat, loi: errors.length, dat: errors.length === 0 };
console.log(`  KẾT LUẬN H07: ${errors.length === 0 ? `ĐẠT — ${tongDat}/${tongCa} ca` : 'KHÔNG ĐẠT:'}`);
for (const e of errors) console.log(`    LỖI  ${e}`);
process.exit(errors.length === 0 ? 0 : 1);
