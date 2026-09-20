// =============================================================================
// check-g05-history-journey.mjs — Kiểm gói G05-B: hành trình lịch sử song ngữ
// =============================================================================
// Hai lớp:
//   Lớp nguồn (luôn chạy — nối npm run check, TRƯỚC build):
//     G5-1…G5-8: dữ liệu mốc (28 mốc nền + đúng các mốc bối cảnh H07 — kỳ vọng
//     theo danh sách, không số cứng) + bản dịch đầy đủ, ranh giới 6 chương
//     liên tiếp phủ toàn bộ dữ liệu, cặp route đọc tiếp, chuỗi câu giữ chương,
//     nhãn trạng thái trong component.
//   Lớp dist (khi có thư mục dist — nối npm run build, SAU astro build):
//     G5-D1: /lich-su/ render đủ thẻ theo dữ liệu + 6 chương + nav chương + k/N.
//     G5-D2: /en/history/ render đủ nội dung EN + trạng thái đọc tiếp theo dữ
//       liệu, không rò chữ tiếng Việt hiển thị (loại tên riêng đã duyệt).
//     G5-D3: hreflang + switcher hai trang; trang chủ EN có lối vào.
//
// Mutation (5 ca cô lập, không tiêm repo chính): chạy
//   node scripts/check-g05-history-journey.mjs --source-only
// trong sandbox với dữ liệu đã biến đổi — bản sạch phải exit 0, ca lỗi phải
// exit 1 đúng luật. Script mutation điều khiển nằm trong output/g05-history-journey/.
//
// Cách chạy: node scripts/check-g05-history-journey.mjs [dist] [--source-only] [--json out]
// =============================================================================

import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

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

// ===== Lớp nguồn =====
const data = JSON.parse(readFileSync(join(ROOT, 'src', 'data', 'timeline.json'), 'utf8'));
const chaptersRaw = readFileSync(join(ROOT, 'src', 'data', 'historyChapters.ts'), 'utf8');
const crRaw = readFileSync(join(ROOT, 'src', 'i18n', 'contentRoutes.ts'), 'utf8');
const compRaw = readFileSync(join(ROOT, 'src', 'components', 'history', 'HistoryTimeline.astro'), 'utf8');

// H07-A (20/09/2026): 28 mốc nền + đúng 4 mốc bối cảnh mới — danh sách kỳ vọng
// (phải khớp hồ sơ H07-A; thêm mốc lần sau phải cập nhật cả hai danh sách).
const MOC_MOI_H07 = ['universal-time-1884', 'great-depression-1929', 'atomic-second-1967', 'oil-shock-1973'];
const SO_MOC_NEN = 28;

// G5-1: đủ mốc nền + đúng các mốc mới được phép; slug duy nhất
const slugs = Array.isArray(data) ? data.map((m) => m.slug) : [];
kiem('G5-1', `Đủ ${SO_MOC_NEN} mốc nền + đúng ${MOC_MOI_H07.length} mốc bối cảnh H07, slug duy nhất`,
  data.length === SO_MOC_NEN + MOC_MOI_H07.length
  && MOC_MOI_H07.every((s) => slugs.includes(s))
  && slugs.filter((s) => !MOC_MOI_H07.includes(s)).length === SO_MOC_NEN
  && new Set(slugs).size === slugs.length,
  `thực tế ${data.length}`);

// G5-2: bản dịch trường chính đủ mọi mốc (theo dữ liệu — H07-A)
const thieuDich = data.filter((m) => !m.title_en?.trim() || !m.description_en?.trim() || !m.dayType_en?.trim() || !m.claimScope_en?.trim()).map((m) => m.slug);
kiem('G5-2', `title_en + description_en + dayType_en + claimScope_en đủ ${data.length} mốc`, thieuDich.length === 0, thieuDich.join(', ') || 'đủ');

// G5-3: limit_en đủ mọi mốc có limit (không thừa); timeLabel_en bắt buộc cho
// mốc có timeLabel chứa chữ (không thuần số/ký hiệu) — H07-A dữ liệu hóa
const coLimit = data.filter((m) => m.limit);
const thieuLimit = coLimit.filter((m) => !m.limit_en?.trim()).map((m) => m.slug);
const thaLimit = data.filter((m) => !m.limit && m.limit_en).map((m) => m.slug);
const canTlEn = (label) => /[^\d\s~–—-]/.test(String(label ?? ''));
const tlEn = data.filter((m) => m.timeLabel_en);
const tlEnSai = tlEn.filter((m) => !canTlEn(m.timeLabel)).map((m) => m.slug);
const tlEnThieu = data.filter((m) => canTlEn(m.timeLabel) && !m.timeLabel_en?.trim()).map((m) => m.slug);
kiem('G5-3', `limit_en đủ ${coLimit.length} mốc có giới hạn (không thừa); timeLabel_en đúng cho mốc có nhãn chứa chữ`, thieuLimit.length === 0 && thaLimit.length === 0 && tlEnSai.length === 0 && tlEnThieu.length === 0, `thiếu-lim=${thieuLimit.join(',') || 'không'} thừa-lim=${thaLimit.join(',') || 'không'} tlEn thừa=${tlEnSai.join(',') || 'không'} tlEn thiếu=${tlEnThieu.join(',') || 'không'}`);

// G5-4: trường VI + nguồn bảo toàn (không rỗng, https, ngày kiểm, proves; name_en chỉ phần mô tả tiếng Việt)
const nameViRe = /[\u0103\u00E2\u0111\u00EA\u00F4\u01A1\u01B0\u00E1\u00E0\u1EA3\u00E3\u1EA1\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u00E9\u00E8\u1EBB\u1EBD\u1EB9\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u00ED\u00EC\u1EC9\u0129\u1ECB\u00F3\u00F2\u1ECF\u00F5\u1ECD\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u00FA\u00F9\u1EE7\u0169\u1EE5\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u00FD\u1EF3\u1EF7\u1EF9\u1EF5]/;
let nguonLoi = 0, nameVi = 0, nameEn = 0;
for (const m of data) {
  if (!m.title?.trim() || !m.description?.trim() || !m.dayType?.trim()) nguonLoi++;
  if (m.claimLevel && m.claimScope !== null && !m.claimScope?.trim()) nguonLoi++;
  for (const s of m.sources) {
    if (!s.url.startsWith('https://') || !/^\d{4}-\d{2}-\d{2}$/.test(s.checked ?? '') || !s.proves?.trim() || !s.name?.trim()) nguonLoi++;
    if (nameViRe.test(s.name)) {
      nameVi++;
      if (s.name_en?.trim()) nameEn++;
    } else if (s.name_en) {
      nguonLoi++; // name không có phần tiếng Việt mà vẫn gắn name_en — thừa
    }
  }
}
kiem('G5-4', 'Cấu trúc nguồn hợp lệ (https, ngày kiểm, proves không rỗng); name_en đúng phần mô tả tiếng Việt', nguonLoi === 0 && nameVi === nameEn, `nguồn lỗi=${nguonLoi}, name tiếng Việt=${nameVi}, có name_en=${nameEn}`);
// G5-4b: BẰNG CHỨNG BẢO TOÀN — so trường VI + nguồn với fixture baseline cố định.
// Fixture scripts/fixtures/timeline-baseline-aba250c.json trích NGUYÊN VĂN
// `git show aba250c:src/data/timeline.json` (đối chiếu sha256 một lần trong biên
// bản G05-B vòng sửa 2, TXN-20260913-14). Không phụ thuộc Git: checker phải chạy
// được cả trên bản sao nguồn không có .git. Không tự sinh baseline từ dữ liệu
// đang kiểm; thiếu fixture là LỖI rõ nguyên nhân, không bỏ qua kiểm. Fixture
// KHÔNG có trường dịch EN nên quét theo khóa của fixture = so đúng các trường
// VI + nguồn; các trường dịch EN thêm mới (title_en/description_en/dayType_en/
// claimScope_en/limit_en/timeLabel_en/name_en) nằm ngoài phạm vi so — chỉ
// chúng được phép khác.
const FIXTURE = join(ROOT, 'scripts', 'fixtures', 'timeline-baseline-aba250c.json');
let baoToanOk = false, baoToanChiTiet = 'không đối chiếu được';
try {
  if (!existsSync(FIXTURE)) {
    baoToanChiTiet = 'thiếu fixture baseline scripts/fixtures/timeline-baseline-aba250c.json — kiểm bảo toàn KHÔNG được bỏ qua';
  } else {
    const goc = JSON.parse(readFileSync(FIXTURE, 'utf8'));
    // H07-A: so theo SLUG (không theo chỉ số) — chèn mốc mới làm dịch chỉ số
    // nhưng mọi trường VI + nguồn của 28 mốc nền phải giữ nguyên từng byte giá trị.
    const hienTai = new Map(data.map((m) => [m.slug, m]));
    const lech = [];
    for (const g of goc) {
      const moi = hienTai.get(g.slug);
      if (!moi) { lech.push(`mất mốc nền: ${g.slug}`); continue; }
      for (const k of Object.keys(g)) {
        if (k === 'sources') {
          const gocSrc = g.sources.map(({ name, url, checked, proves }) => ({ name, url, checked, proves }));
          const moiSrc = (moi.sources ?? []).map(({ name, url, checked, proves }) => ({ name, url, checked, proves }));
          if (JSON.stringify(gocSrc) !== JSON.stringify(moiSrc)) lech.push(`${g.slug}:sources`);
        } else if (JSON.stringify(g[k]) !== JSON.stringify(moi[k])) lech.push(`${g.slug}:${k}`);
      }
    }
    baoToanOk = lech.length === 0;
    baoToanChiTiet = lech.slice(0, 5).join(', ') || `giữ nguyên 100% trường VI + nguồn của ${goc.length} mốc nền so fixture aba250c (so theo slug)`;
  }
} catch (e) {
  baoToanChiTiet = 'đọc fixture lỗi: ' + e.message;
}
kiem('G5-4b', 'Bảo toàn: mọi trường VI + sources của 28 mốc nền khớp fixture baseline aba250c từng byte giá trị (so theo slug, không phụ thuộc Git)', baoToanOk, baoToanChiTiet);

// G5-5: 6 chương — id, range phủ 0..(n−1) liên tiếp không chồng, đủ vi/en
// (H07-A: range không cứng nữa — chỉ bắt buộc liên tiếp, phủ toàn bộ dữ liệu,
// đủ 6 chương; độ dài mỗi chương > 0)
const idList = [...chaptersRaw.matchAll(/^\s{4}id: '(c\d)',$/gm)].map((m) => m[1]);
const rangeList = [...chaptersRaw.matchAll(/^\s{4}range: \[(\d+), (\d+)\],$/gm)].map((m) => [Number(m[1]), Number(m[2])]);
let rangeOk = idList.length === 6 && rangeList.length === 6 && idList.join(',') === 'c1,c2,c3,c4,c5,c6';
if (rangeOk) {
  for (let i = 0; i < rangeList.length; i++) {
    const [d, c] = rangeList[i];
    if (c <= d) { rangeOk = false; break; } // chương rỗng
    if (i === 0 && d !== 0) { rangeOk = false; break; } // không bắt đầu 0
    if (i > 0 && d !== rangeList[i - 1][1]) { rangeOk = false; break; } // không liên tiếp
    if (i === rangeList.length - 1 && c !== data.length) { rangeOk = false; break; } // không phủ hết
  }
}
const chapTextOk = [...chaptersRaw.matchAll(/vi: \{[\s\S]*?\}/g)].length === 6 && [...chaptersRaw.matchAll(/en: \{[\s\S]*?\}/g)].length === 6
  && (chaptersRaw.match(/question: '/g) ?? []).length === 12 && (chaptersRaw.match(/lead: '/g) ?? []).length === 12;
kiem('G5-5', '6 chương: id c1–c6, range liên tiếp phủ toàn bộ mốc (0 → số mốc dữ liệu), đủ vi/en', rangeOk && chapTextOk, `ids=${idList.join(',')}, ranges=${JSON.stringify(rangeList)}, n=${data.length}`);

// G5-6: đọc tiếp — đếm theo mốc: có cặp EN / chỉ VI / chưa có bài
// (H07-A: số kỳ vọng theo dữ liệu — bất biến bắt buộc là "không mốc nào
// chỉ có link VI"; các số còn lại báo theo dữ liệu)
const pairMap = new Map([...crRaw.matchAll(/\{\s*vi:\s*'([^']+)',\s*en:\s*'([^']+)'\s*\}/g)].map((m) => [m[1], m[2]]));
const rmCoEN = data.filter((m) => m.readMore && pairMap.has(m.readMore));
const rmChiVI = data.filter((m) => m.readMore && !pairMap.has(m.readMore));
const rmKhong = data.filter((m) => !m.readMore);
kiem('G5-6', `Đọc tiếp: 0 mốc chỉ VI + ${rmCoEN.length} mốc có cặp EN + ${rmKhong.length} mốc chưa có bài (tổng khớp dữ liệu)`, rmChiVI.length === 0 && rmCoEN.length + rmKhong.length === data.length, `cóEN=${rmCoEN.length}, chỉVI=${rmChiVI.length}, không=${rmKhong.length}, tổng=${data.length}`);
const capEnDang = rmCoEN.every((m) => pairMap.get(m.readMore).startsWith('/en/'));
kiem('G5-6b', 'Điều kiện cần (lớp nguồn): mọi cặp EN của mốc đọc tiếp có dạng route /en/ — đích THẬT được kiểm ở lớp dist [G5-D4]', capEnDang, rmCoEN.filter((m) => !pairMap.get(m.readMore).startsWith('/en/')).map((m) => m.slug).join(',') || 'đủ');

// G5-7: câu giữ chương — không gán nhân quả/không "đỉnh" (presence nguyên văn theo G05-A)
const khongDuocCo = ['đỉnh', 'peak', 'highest point'];
let chuoiLoi = [];
for (const s of khongDuocCo) {
  if (chaptersRaw.toLowerCase().includes(s.toLowerCase())) chuoiLoi.push(s);
}
const coGiuChuong = chaptersRaw.includes('does not establish a causal link') && chaptersRaw.includes('không xác lập quan hệ nhân quả')
  && chaptersRaw.includes('Pocket watches did not vanish') && chaptersRaw.includes('each card states its own scope');
kiem('G5-7', 'Câu giữ chương 6 chương đúng nguyên văn G05-A; không "đỉnh"/"peak"', chuoiLoi.length === 0 && coGiuChuong, `chuỗi cấm=${chuoiLoi.join(',') || 'không'}`);

// G5-8: nhãn trạng thái + k/N + anchor chương trong component
const compOk = compRaw.includes('Vietnamese only — no English version yet')
  && compRaw.includes('No further reading for this milestone yet')
  && compRaw.includes('Chưa có bài đọc thêm cho mốc này')
  && compRaw.includes('data-chapter-kn')
  && compRaw.includes('`chuong-${ch.id}`')
  && compRaw.includes('scroll-margin-top');
// progressive enhancement reveal: mặc định hiển thị; chỉ ẩn qua .reveal-pending do JS thêm
const reRuleCard = /\.milestone-card\s*\{[^}]*\}/g;
const ruleCardAn = [...compRaw.matchAll(reRuleCard)].some((m) => /opacity:\s*0/.test(m[0]));
const peOk = compRaw.includes('reveal-pending') && !ruleCardAn && !compRaw.includes('setTimeout(');
kiem('G5-8', 'Component có nhãn trạng thái, k/N, anchor + scroll-margin; reveal ẩn-mặc định=false (progressive, không setTimeout)', compOk && peOk, `khuôn=${compOk}, pe=${peOk}`);

// G5-8b (hồi quy TXN-20260913-14; cập nhật H07-A): whitelist hash trong component
// chỉ nhận dạng chuẩn #milestone-0…(số thẻ −1) — KHÔNG zero dẫn đầu ("00"/"01"
// không phải ID thật, ID thật là milestone-0/1) — và #chuong-c1…6. Trích đúng
// hàm hashHopLe (đối số maxIdx) từ nguồn component rồi chạy 12 tình huống với
// maxIdx = số mốc dữ liệu − 1; bản từng dùng Number(m[1]) <= 27 đã giữ nhầm
// #milestone-00/01 qua switcher.
function trichHam(src, ten) {
  const batDau = src.indexOf(`const ${ten} = `);
  if (batDau === -1) return null;
  const mo = src.indexOf('{', batDau);
  let sau = -1, count = 0;
  for (let i = mo; i >= 0 && i < src.length; i++) {
    if (src[i] === '{') count++;
    else if (src[i] === '}') { count--; if (count === 0) { sau = i; break; } }
  }
  return sau === -1 ? null : src.slice(batDau, sau + 1) + ';';
}
const hookSrc = trichHam(compRaw, 'hashHopLe');
// Chú thích kiểu TypeScript trên tham số (bắt buộc cho astro check) phải gỡ
// trước khi thực thi hàm bằng new Function (chỉ hiểu JS thuần).
const hookJs = hookSrc === null ? null : hookSrc.replace(/\(maxIdx: number\)/, '(maxIdx)');
const HASH_HOP_LE = ['#milestone-0', '#milestone-12', '#milestone-27', '#chuong-c1', '#chuong-c6'];
const HASH_SAI = ['#milestone-00', '#milestone-01', '#milestone-028', '#milestone-999', '#chuong-c7', '#hash-sai', ''];
let hashOk = hookSrc !== null;
const hashKetQua = [];
if (hashOk) {
  const maxIdx = data.length - 1;
  for (const h of [...HASH_HOP_LE, ...HASH_SAI]) {
    const thucTe = new Function('location', 'maxIdx', `${hookJs}\nreturn hashHopLe(maxIdx);`)({ hash: h }, maxIdx);
    hashKetQua.push(`${h === '' ? '(không hash)' : h}=${thucTe ? 'giữ' : 'bỏ'}`);
    const dung = HASH_HOP_LE.includes(h) ? thucTe === true : thucTe === false;
    if (!dung) hashOk = false;
  }
}
kiem('G5-8b', `Whitelist hash chỉ nhận #milestone-0…${data.length - 1} (không zero dẫn đầu) + #chuong-c1…6 — 12 tình huống trên đúng hàm trong component`, hashOk, hookSrc === null ? 'không trích được hashHopLe' : hashKetQua.join(', '));

// ===== Lớp dist =====
function routeExists(rel) {
  const clean = rel.split(/[?#]/)[0].replace(/\/$/, '');
  if (clean === '') return existsSync(join(DIST, 'index.html'));
  return existsSync(join(DIST, clean, 'index.html'));
}

if (!sourceOnly) {
  if (DIST && existsSync(join(DIST, 'lich-su', 'index.html')) && existsSync(join(DIST, 'en', 'history', 'index.html'))) {
    const kiemD = (id, ten, dat, chiTiet = '') => {
      results.distChecks.push({ id, ten, dat: dat === true, chiTiet });
      console.log(`  ${dat === true ? 'ĐẠT' : 'LỖI '} [${id}] ${ten}${dat === true ? '' : ` — ${chiTiet}`}`);
      if (dat !== true) errors.push(`[${id}] ${ten} — ${chiTiet}`);
    };
    const viHtml = readFileSync(join(DIST, 'lich-su', 'index.html'), 'utf8');
    const enHtml = readFileSync(join(DIST, 'en', 'history', 'index.html'), 'utf8');
    const enHome = readFileSync(join(DIST, 'en', 'index.html'), 'utf8');

    // G5-D1: trang VI (các số kỳ vọng tính từ dữ liệu — H07-A)
    const viCards = (viHtml.match(/class="milestone-card"/g) ?? []).length;
    const viChuong = [1, 2, 3, 4, 5, 6].filter((n) => viHtml.includes(`id="chuong-c${n}"`)).length;
    const viNavChuong = (viHtml.match(/data-chapter-link=/g) ?? []).length;
    const viChuongMoc = [1, 2, 3, 4, 5, 6].every((n) => viHtml.includes(`href="#chuong-c${n}"`));
    const viNguon = (viHtml.match(/rel="noopener noreferrer"/g) ?? []).length;
    const viLimit = (viHtml.match(/>Giới hạn:</g) ?? []).length;
    const viKn = (viHtml.match(/data-chapter-kn/g) ?? []).length;
    const viLabel2013 = viHtml.includes('2013–nay') && !viHtml.includes('2013–present');
    const soNguon = data.reduce((t, m) => t + m.sources.length, 0);
    const soGioiHan = data.filter((m) => m.limit).length;
    kiemD('G5-D1', `Trang VI: ${data.length} thẻ + 6 chương + nav chương 2 nav + k/N ×12 + ${soNguon} nguồn + ${soGioiHan} Giới hạn + nhãn "2013–nay" (không "2013–present")`,
      viCards === data.length && viChuong === 6 && viNavChuong === 6 && viChuongMoc && viNguon === soNguon && viLimit === soGioiHan && viKn === 12 && viLabel2013,
      `thẻ=${viCards}, chương=${viChuong}, nav=${viNavChuong}, nguồn=${viNguon}, giới hạn=${viLimit}, kN=${viKn}, 2013-nay=${viLabel2013}`);

    // G5-D2: trang EN (kỳ vọng theo dữ liệu — H07-A: rmCoEN/rmKhong từ G5-6)
    const enCards = (enHtml.match(/class="milestone-card"/g) ?? []).length;
    const enChuong = [1, 2, 3, 4, 5, 6].filter((n) => enHtml.includes(`id="chuong-c${n}"`)).length;
    const enNguon = (enHtml.match(/rel="noopener noreferrer"/g) ?? []).length;
    const enLimit = (enHtml.match(/>Limit:</g) ?? []).length;
    const enNoArticle = (enHtml.match(/No further reading for this milestone yet/g) ?? []).length;
    const enViOnly = (enHtml.match(/Vietnamese only — no English version yet/g) ?? []).length;
    const enTimeLabel2013 = enHtml.includes('2013–present') && !enHtml.includes('2013–nay');
    const enLinkEnDoc = [...enHtml.matchAll(/href="(\/en\/[^"]+)"[^>]*>\s*Read more →/g)].length;
    const enLinkViDoc = [...enHtml.matchAll(/href="(\/(?!en\/)[^"]+)"[^>]*>\s*Read more →/g)].length;
    // rò chữ tiếng Việt — chỉ quét phần hiển thị: cắt body, bỏ script/style/comment
    // (head chứa meta alt + JSON-LD + comment tiếng Việt theo khuôn toàn site);
    // loại tên riêng + nhãn chức năng được duyệt (switcher "Tiếng Việt",
    // ScrollToTop "Lên đầu trang") và attribute điều khiển data-unit (JS đếm).
    const PROPER = ["Métiers d'Art", 'René-Alfred Chauvot', 'Gérald Genta', 'Tiếng Việt', 'Lên đầu trang'];
    let bodyStart = enHtml.indexOf('<body');
    let enText = bodyStart === -1 ? enHtml : enHtml.slice(bodyStart);
    enText = enText.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '');
    enText = enText.replace(/data-unit="[^"]*"/g, 'data-unit=""');
    for (const p of PROPER) enText = enText.split(p).join('');
    const roViet = /[\u0103\u00E2\u0111\u00EA\u00F4\u01A1\u01B0\u1EA1-\u1EF9]/.test(enText);
    // H03-C (20/09/2026): trạng thái đọc tiếp theo dữ liệu; H07-A: số thẻ/nguồn/giới hạn theo dữ liệu.
    kiemD('G5-D2', `Trang EN: ${data.length} thẻ + 6 chương + ${soNguon} nguồn + ${soGioiHan} Limit + trạng thái ${rmCoEN.length}/0/${rmKhong.length} + "2013–present" + không rò tiếng Việt`,
      enCards === data.length && enChuong === 6 && enNguon === soNguon && enLimit === soGioiHan && enNoArticle === rmKhong.length && enViOnly === 0 && enLinkEnDoc === rmCoEN.length && enLinkViDoc === 0 && enTimeLabel2013 && !roViet,
      `thẻ=${enCards}, chương=${enChuong}, nguồn=${enNguon}, Limit=${enLimit}, noArticle=${enNoArticle}, viOnly=${enViOnly}, linkEN=${enLinkEnDoc}, linkVI=${enLinkViDoc}, 2013=${enTimeLabel2013}, ròVI=${roViet}`);

    // G5-D3: hreflang + switcher + trang chủ EN lối vào
    // Khuôn getAlternates hiện hành: trang VI phát vi theo pathname ("/lich-su/"),
    // trang EN phát vi theo giá trị bảng ("/lich-su" không slash) — tiền tồn tại toàn site.
    const hrefOkViSide = (html) =>
      html.includes('<link rel="alternate" hreflang="vi" href="https://www.kienthucdonghoco.vn/lich-su/">')
      && html.includes('<link rel="alternate" hreflang="en" href="https://www.kienthucdonghoco.vn/en/history/">')
      && html.includes('<link rel="alternate" hreflang="x-default" href="https://www.kienthucdonghoco.vn/lich-su/">');
    const hrefOkEnSide = (html) =>
      html.includes('<link rel="alternate" hreflang="vi" href="https://www.kienthucdonghoco.vn/lich-su">')
      && html.includes('<link rel="alternate" hreflang="en" href="https://www.kienthucdonghoco.vn/en/history/">')
      && html.includes('<link rel="alternate" hreflang="x-default" href="https://www.kienthucdonghoco.vn/lich-su">');
    const swOk = (html, otherHref) => !html.includes('data-lang-switch="untranslated"') && html.includes(`href="${otherHref}"`);
    const homeEntry = enHome.includes('href="/en/history/"') && enHome.includes('Open the history journey');
    kiemD('G5-D3', 'hreflang hai trang + switcher hai chiều + lối vào trang chủ EN',
      hrefOkViSide(viHtml) && hrefOkEnSide(enHtml)
      && swOk(viHtml, '/en/history/') && swOk(enHtml, '/lich-su') && homeEntry,
      `hreflangVI=${hrefOkViSide(viHtml)}, hreflangEN=${hrefOkEnSide(enHtml)}, homeEntry=${homeEntry}`);

    // G5-D4: link nội bộ trong hai trang không hỏng (bỏ asset tĩnh)
    const STATIC_EXT = /\.(css|js|mjs|svg|png|jpe?g|webp|gif|ico|woff2?|ttf|xml|txt|json|webmanifest)$/i;
    let hong = [];
    for (const [ten, html] of [['VI', viHtml], ['EN', enHtml]]) {
      const noiBo = [...html.matchAll(/href="(\/[^"h][^"]*)"/g)].map((m) => m[1].split('#')[0]).filter((h) => h !== '/' && !STATIC_EXT.test(h));
      hong = hong.concat([...new Set(noiBo)].filter((h) => !routeExists(h)).map((h) => `${ten}:${h}`));
    }
    kiemD('G5-D4', 'Không link nội bộ hỏng trong hai trang lịch sử', hong.length === 0, hong.join(', ') || 'không');

    // G5-D5: sitemap có đúng 1 URL /en/history/ và /lich-su/
    let smOk = false;
    const smDir = join(DIST, 'sitemap-0.xml');
    if (existsSync(smDir)) {
      const sm = readFileSync(smDir, 'utf8');
      const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      smOk = locs.includes('https://www.kienthucdonghoco.vn/lich-su/') && locs.includes('https://www.kienthucdonghoco.vn/en/history/');
    }
    kiemD('G5-D5', 'Sitemap chứa /lich-su/ và /en/history/', smOk, 'kiểm sitemap-0.xml');
  } else if (DIST) {
    errors.push('[G5-DIST] Thiếu dist/lich-su/index.html hoặc dist/en/history/index.html — cần build trước khi kiểm lớp dist.');
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
