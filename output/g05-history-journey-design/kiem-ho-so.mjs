// Tự kiểm hồ sơ G05-A (vòng sửa TXN-20260913-04) — chỉ đọc, không sửa tệp website.
// Đối chiếu: 5 tệp hồ sơ ↔ src/data/timeline.json ↔ src/i18n/contentRoutes.ts ↔ dist/
// (dist là bằng chứng build kế thừa tại commit 2f322dc — không phải phép kiểm mới).
// Phạm vi: kiểm máy được cấu trúc + số liệu + sự hiện diện nguyên văn của các câu đã sửa.
// Ý NGHĨA của các câu biên tập (trung tính, không gán nhân quả...) thuộc thẩm định
// GPT Work — script liệt kê chúng ở mục 8 như danh sách KIỂM THỦ CÔNG, không tuyên bố
// script chứng minh được ngữ nghĩa.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..');
const fails = [];
const ok = (msg) => console.log('  ĐẠT  ' + msg);
const bad = (msg) => { fails.push(msg); console.log('  LỖI  ' + msg); };
const section = (t) => console.log('\n== ' + t + ' ==');

// ---------- 0. Các tệp hồ sơ tồn tại ----------
section('0. Tệp hồ sơ');
const files = [
  'bang-anh-xa-28-moc.md', 'storyboard-6-chuong.md', 'tai-san-va-khoi-luong.md',
  'pham-vi-g05b-du-kien.md', 'ma-tran-nghiem-thu-g05b-du-kien.md',
];
for (const f of files) {
  if (existsSync(join(here, f))) ok(f); else bad('thiếu tệp hồ sơ ' + f);
}
const bangText = readFileSync(join(here, 'bang-anh-xa-28-moc.md'), 'utf8');
const sbText = readFileSync(join(here, 'storyboard-6-chuong.md'), 'utf8');
const tsText = readFileSync(join(here, 'tai-san-va-khoi-luong.md'), 'utf8');
const pvText = readFileSync(join(here, 'pham-vi-g05b-du-kien.md'), 'utf8');
const mtText = readFileSync(join(here, 'ma-tran-nghiem-thu-g05b-du-kien.md'), 'utf8');

// ---------- 1. timeline.json ----------
section('1. timeline.json (nguồn sự thật G02)');
const tl = JSON.parse(readFileSync(join(repo, 'src', 'data', 'timeline.json'), 'utf8'));
if (tl.length === 28) ok('28 mốc'); else bad('timeline.json có ' + tl.length + ' mốc');
const slugs = tl.map((m) => m.slug);
if (new Set(slugs).size === 28) ok('slug duy nhất'); else bad('slug trùng lặp');
let nonDec = 0;
for (let i = 1; i < tl.length; i++) if (tl[i].year < tl[i - 1].year) nonDec++;
if (nonDec === 0) ok('year không giảm'); else bad('year giảm tại ' + nonDec + ' chỗ');
const totalSources = tl.reduce((s, m) => s + m.sources.length, 0);
const totalLimit = tl.filter((m) => m.limit).length;
const totalNull = tl.filter((m) => !m.readMore).length;
const descTokens = tl.reduce((s, m) => s + m.description.trim().split(/\s+/).length, 0);
if (totalSources === 52) ok('tổng nguồn 52'); else bad('tổng nguồn ' + totalSources);
if (totalLimit === 19) ok('19 mốc có Giới hạn'); else bad('limit = ' + totalLimit);
if (totalNull === 3) ok('3 mốc readMore null'); else bad('readMore null = ' + totalNull);

// đếm type động
const typeCount = {};
for (const m of tl) typeCount[m.type] = (typeCount[m.type] ?? 0) + 1;
const expectType = { mechanism: 12, brand: 13, culture: 3 };
let typeOk = true;
for (const k of Object.keys(expectType)) {
  if (typeCount[k] !== expectType[k]) { typeOk = false; bad('type ' + k + ' = ' + typeCount[k] + ', kỳ vọng ' + expectType[k]); }
}
if (typeOk) ok('type: mechanism 12 / brand 13 / culture 3 (đếm động từ JSON)');

// số token đoạn dẫn + ghi chú cuối trích từ lich-su.astro (tham chiếu số trong hồ sơ)
const astroSrc = readFileSync(join(repo, 'src', 'pages', 'lich-su.astro'), 'utf8');
const leadMatch = astroSrc.match(/Dòng chảy thời gian[\s\S]*?hành lang lịch sử\./);
const noteMatch = astroSrc.match(/500 năm này[\s\S]*?máy móc<\/strong> và <strong>thương hiệu<\/strong>\./);
const leadTokens = leadMatch ? leadMatch[0].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().split(' ').length : -1;
const noteTokens = noteMatch ? noteMatch[0].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().split(' ').length : -1;
if (leadTokens === 53) ok('đoạn dẫn trang đếm đúng 53 token (khớp hồ sơ)'); else bad('đoạn dẫn trang = ' + leadTokens + ' token, hồ sơ ghi 53');
if (noteTokens === 44) ok('ghi chú cuối trang đếm đúng 44 token (khớp hồ sơ)'); else bad('ghi chú cuối trang = ' + noteTokens + ' token, hồ sơ ghi 44');

// name nguồn có phần tiếng Việt (detector: ký tự chữ non-ASCII sau khi bỏ gạch ngang)
const nameVi = [];
for (const m of tl) for (const s of m.sources) {
  const stripped = s.name.replace(/[—–]/g, '');
  if (/\P{ASCII}/u.test(stripped)) nameVi.push({ slug: m.slug, name: s.name });
}
if (nameVi.length === 4) ok('4/52 name nguồn có phần tiếng Việt (khớp hồ sơ)'); else bad('detector đếm ' + nameVi.length + ' name, hồ sơ ghi 4');

// proves có được render trong UI trang lịch sử hiện hành?
const provesInMarkup = astroSrc.includes('{nguon.proves}') || astroSrc.includes('{s.proves}');
if (!provesInMarkup) ok('proves không được render trong lich-su.astro (hồ sơ nguồn, không phải UI)'); else bad('proves đang được render — hồ sơ ghi sai');

// ---------- 2. contentRoutes.ts ----------
section('2. contentRoutes.ts (cặp route)');
const cr = readFileSync(join(repo, 'src', 'i18n', 'contentRoutes.ts'), 'utf8');
const pairMap = new Map([...cr.matchAll(/\{\s*vi:\s*'([^']+)',\s*en:\s*'([^']+)'\s*\}/g)].map((m) => [m[1], m[2]]));
if (!pairMap.has('/lich-su')) ok('/lich-su chưa có cặp (G05-A không sửa src/)'); else bad('/lich-su đã có cặp — hồ sơ này không được phép thay đổi src/');

// ---------- 3. Bảng ánh xạ 28 mốc ----------
section('3. Bảng ánh xạ 28 mốc');
const rows = bangText.split('\n').filter((l) => /^\| \d+ \| /.test(l));
if (rows.length === 28) ok('28 dòng dữ liệu trong bảng'); else bad('bảng có ' + rows.length + ' dòng');
const cell = (l, i) => l.split('|').map((c) => c.trim())[i + 1]; // cột 0 là chuỗi rỗng đầu
const clean = (s) => s.replace(/`/g, '').trim(); // bóc backtick bọc route trong ô bảng
// khối chương kỳ vọng theo vị trí mốc
const chapOf = (i) => (i <= 4 ? 'C1' : i <= 8 ? 'C2' : i <= 14 ? 'C3' : i <= 20 ? 'C4' : i <= 24 ? 'C5' : 'C6');
let distViMissing = 0, distEnMissing = 0;
for (let i = 0; i < rows.length; i++) {
  const m = tl[i];
  const r = rows[i];
  const tag = `mốc ${i} (${m.slug})`;
  if (cell(r, 1) !== m.slug) bad(tag + ' slug lệch: bảng=' + cell(r, 1));
  if (cell(r, 2) !== String(m.year)) bad(tag + ' year lệch');
  if (cell(r, 3) !== m.timeLabel) bad(tag + ' timeLabel lệch: bảng=' + cell(r, 3) + ' json=' + m.timeLabel);
  if (cell(r, 4) !== m.type) bad(tag + ' type lệch');
  if (cell(r, 5) !== chapOf(i)) bad(tag + ' chương lệch: ' + cell(r, 5) + ' kỳ vọng ' + chapOf(i));
  if (!cell(r, 6)) bad(tag + ' thiếu vai trò chương');
  const nguonBang = parseInt(clean(cell(r, 7)).match(/^(\d+) nguồn/)?.[1] ?? '-1', 10);
  if (nguonBang !== m.sources.length) bad(tag + ' số nguồn lệch: bảng=' + nguonBang);
  // đọc tiếp VI
  const rm = m.readMore; // null hoặc "/..."
  const viCell = clean(cell(r, 9));
  if (rm === null) {
    if (!viCell.startsWith('—')) bad(tag + ' đọc tiếp VI phải là "—"');
  } else {
    if (viCell !== rm) bad(tag + ' đọc tiếp VI lệch: bảng=' + viCell);
    const distPath = join(repo, 'dist', rm.replace(/^\//, ''), 'index.html');
    if (!existsSync(distPath)) { distViMissing++; bad(tag + ' dist VI thiếu ' + rm); }
  }
  // đọc tiếp EN
  const enCell = clean(cell(r, 10));
  if (rm === null) {
    if (enCell !== '—') bad(tag + ' đọc tiếp EN phải là "—", bảng=' + enCell);
  } else if (pairMap.has(rm)) {
    const enRoute = pairMap.get(rm);
    if (enCell !== enRoute) bad(tag + ' đọc tiếp EN lệch: bảng=' + enCell + ' contentRoutes=' + enRoute);
    const distPath = join(repo, 'dist', enRoute.replace(/^\//, ''), 'index.html');
    if (!existsSync(distPath)) { distEnMissing++; bad(tag + ' dist EN thiếu ' + enRoute); }
  } else {
    if (enCell !== 'CHƯA DỊCH') bad(tag + ' đọc tiếp EN phải là "CHƯA DỊCH", bảng=' + enCell);
  }
  if (!cell(r, 11) || !/title/.test(cell(r, 11))) bad(tag + ' thiếu danh sách trường cần dịch');
}
if (fails.filter((f) => f.startsWith('mốc ')).length === 0) ok('28 dòng khớp timeline.json + contentRoutes (VI 25 route, EN 12 route)');
if (distViMissing === 0 && distEnMissing === 0) ok('mọi route đọc tiếp VI/EN có trong dist của build 2f322dc');

// bảng khung 6 chương — danh sách slug CHÍNH XÁC THEO THỨ TỰ
const khungRows = bangText.split('\n').filter((l) => /^\| C\d \|/.test(l));
const khungRange = { C1: [0, 5], C2: [5, 9], C3: [9, 15], C4: [15, 21], C5: [21, 25], C6: [25, 28] };
for (const kr of khungRows) {
  const code = cell(kr, 0);
  const list = cell(kr, 3).split(',').map((s) => s.trim());
  const [a, b] = khungRange[code];
  const expect = slugs.slice(a, b);
  if (list.length !== b - a) bad('khung ' + code + ' sai số mốc: ' + list.length);
  for (let k = 0; k < list.length; k++) {
    if (list[k] !== expect[k]) bad('khung ' + code + ' sai thứ tự tại vị trí ' + k + ': bảng=' + list[k] + ' json=' + expect[k]);
  }
}
if (khungRows.length === 6) ok('khung 6 chương đúng danh sách + thứ tự slug (5+4+6+6+4+3)'); else bad('khung có ' + khungRows.length + ' chương');
if (bangText.includes('Tổng 5+4+6+6+4+3 = 28')) ok('bảng ghi đúng tổng 28'); else bad('thiếu dòng tổng 28');

// ---------- 4. Storyboard ----------
section('4. Storyboard 6 chương');
for (const c of ['C1', 'C2', 'C3', 'C4', 'C5', 'C6']) {
  if (sbText.includes('### ' + c + ' —')) ok('có mục chương ' + c); else bad('thiếu mục chương ' + c);
}
const viQ = (sbText.match(/\*\*VI:\*\*/g) || []).length;
const enQ = (sbText.match(/\*\*EN draft:\*\*/g) || []).length;
if (viQ === 6 && enQ === 6) ok('6 câu hỏi VI + 6 câu hỏi EN draft (khuôn nhãn thống nhất)'); else bad('câu hỏi VI=' + viQ + ' EN=' + enQ);
const keepers = (sbText.match(/\*\*Câu giữ chương:/g) || []).length;
if (keepers === 6) ok('6 câu giữ chương (thời gian khác nhân quả)'); else bad('câu giữ chương = ' + keepers);
if (sbText.includes('#milestone-{i}') && sbText.includes('#chuong-c1') && sbText.includes('/en/history/')) ok('ghi anchor hiện hành + ID chung chương + route EN đề xuất'); else bad('thiếu anchor/ID chung/route EN');
if (!/mechanism 11|brand 12|culture 5/.test(sbText) && sbText.includes('mechanism 12, brand 13, culture 3')) ok('số mốc từng lớp sửa đúng 12/13/3 (khớp đếm động)'); else bad('số lớp trong storyboard sai hoặc thiếu');
if (sbText.includes('k/N')) ok('hành vi lọc + nav chương ghi đề nghị k/N'); else bad('thiếu đề nghị k/N');
if (!sbText.includes('CHƯA quan sát — G05-B kiểm và dựng theo hành vi đề nghị này') === false || sbText.includes('CHƯA quan sát')) ok('hành vi switcher ghi rõ là đề nghị, chưa quan sát'); else bad('hành vi switcher ghi chưa rõ');
if (sbText.includes('giữ route VI hiện có') || sbText.includes('Giữ route VI hiện có')) ok('gọi đúng: giữ route VI, thêm 1 route EN'); else bad('cách gọi route VI/EN chưa đúng');

// ---------- 5. Tài sản và khối lượng ----------
section('5. Tài sản và khối lượng');
if (/0 ảnh AI mới,\s*0 SVG mới,\s*0 hoạt ảnh mới/.test(tsText)) ok('khuyến nghị 0 hình mới rõ ràng'); else bad('thiếu khuyến nghị 0 hình mới');
if (tsText.includes('T1') && tsText.includes('Alt dự thảo') && tsText.includes('150 KB')) ok('tùy chọn T1 đủ alt + ngân sách + fallback'); else bad('T1 thiếu alt/ngân sách/fallback');
const descMatch = tsText.match(/\| `description` 28 mốc \| ([\d.]+) \(/);
const descInDoc = descMatch ? parseInt(descMatch[1].replace(/\./g, ''), 10) : -1;
if (descInDoc === descTokens) ok('số token description khớp đếm thật (' + descTokens + ')'); else bad('số token description lệch: hồ sơ=' + descInDoc + ' thật=' + descTokens);
// tổng 5 trường dữ liệu — đối chiếu động với ghi chú "2.200 đơn vị đo trực tiếp"
const titleTokens = tl.reduce((s, m) => s + m.title.trim().split(/\s+/).length, 0);
const limitTokens = tl.reduce((s, m) => s + (m.limit ? m.limit.trim().split(/\s+/).length : 0), 0);
const scopeTokens = tl.reduce((s, m) => s + (m.claimScope ? m.claimScope.trim().split(/\s+/).length : 0), 0);
const dayTokens = tl.reduce((s, m) => s + m.dayType.trim().split(/\s+/).length, 0);
const fiveSum = descTokens + titleTokens + limitTokens + scopeTokens + dayTokens;
if (fiveSum === 2200 && tsText.includes('2.200 đơn vị đo trực tiếp từ 5 trường dữ liệu')) ok('5 trường dữ liệu đo động = 2.200 token, hồ sơ tách đúng 2.200 đo + ~372 alt dự kiến'); else bad('tổng 5 trường = ' + fiveSum + ' (kỳ vọng 2.200) hoặc hồ sơ thiếu ghi chú tách');
if (tsText.includes('whitespace-separated tokens')) ok('đơn vị đếm gọi đúng tên: token tách theo khoảng trắng'); else bad('thiếu tên đơn vị đếm đúng');
if (tsText.includes('giả định dự phòng') && tsText.includes('chưa hiệu chuẩn') && tsText.includes('không phải chỉ tiêu')) ok('ước lượng EN ghi rõ là giả định dự phòng chưa hiệu chuẩn, không phải chỉ tiêu phải viết đủ'); else bad('ước lượng EN thiếu ghi chú giả định dự phòng/chỉ tiêu');
if (tsText.includes('Tổng khối lượng VI ước tính')) ok('tổng VI gọi đúng tên "khối lượng ước tính"'); else bad('thiếu tên "Tổng khối lượng VI ước tính"');
if (tsText.includes('≈ 3.060 đơn vị') && tsText.includes('3.400–4.000')) ok('tổng VI ≈ 3.060 + ước lượng EN 3.400–4.000 có trong hồ sơ'); else bad('thiếu tổng mới');
if (tsText.includes('2013–nay') && tsText.includes('2013–present')) ok('timeLabel hai ngôn ngữ ghi đủ (VI "2013–nay" / EN "2013–present")'); else bad('thiếu timeLabel VI/EN');
if (tsText.includes('4/52') && tsText.includes('proves')) ok('phạm vi dịch ghi 4 name tiếng Việt + phân biệt proves'); else bad('thiếu name nguồn / proves');
if (!tsText.includes('2.950')) ok('đã bỏ mốc 2.950 cũ'); else bad('vẫn còn số 2.950 cũ');

// ---------- 6. Phạm vi + ma trận ----------
section('6. Phạm vi G05-B + ma trận nghiệm thu');
if (pvText.includes('/en/history/') && pvText.includes('contentRoutes.ts')) ok('phạm vi ghi route + contentRoutes'); else bad('phạm vi thiếu route/contentRoutes');
if (pvText.includes('check-g01') && pvText.includes('check-g02') && pvText.includes('check-english-launch')) ok('phạm vi liệt kê bộ kiểm ảnh hưởng'); else bad('phạm vi thiếu bộ kiểm');
if (pvText.includes('GHI RIÊNG')) ok('rủi ro sticky/scroll ghi riêng'); else bad('thiếu mục rủi ro ghi riêng');
if (pvText.includes('timeLabel_en') && pvText.includes('name_en') === false && pvText.includes('`name` ở bản EN')) ok('phạm vi dữ liệu ghi timeLabel_en + name nguồn'); else bad('phạm vi dữ liệu thiếu timeLabel/name nguồn');
// ma trận: đọc CỘT TRẠNG THÁI của từng dòng ca kiểm (không đếm mọi lần xuất hiện chữ)
const mtRows = mtText.split('\n').filter((l) => /^\| M\d+-\d+ /.test(l));
let caChuaKiem = 0, caSaiTrangThai = [];
for (const l of mtRows) {
  const cols = l.split('|').map((c) => c.trim());
  const status = [...cols].reverse().find((c) => c !== ''); // cột không rỗng cuối = trạng thái
  if (status === 'CHƯA KIỂM') caChuaKiem++;
  else caSaiTrangThai.push(cols[1] + ' → ' + status);
}
if (mtRows.length >= 20 && caSaiTrangThai.length === 0) ok('ma trận ' + mtRows.length + ' ca (đếm theo dòng dữ liệu), mọi cột trạng thái = CHƯA KIỂM'); else bad('ma trận: ' + mtRows.length + ' dòng; ca sai trạng thái: ' + JSON.stringify(caSaiTrangThai));
for (const g of ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7']) {
  if (!mtText.includes('## ' + g)) bad('ma trận thiếu nhóm ' + g);
}
ok('đủ 7 nhóm M1–M7 (nếu không có LỖI phía trên)');
if (mtText.includes('2013–nay') && mtText.includes('2013–present')) ok('M1-4 ghi timeLabel theo ngôn ngữ hai bản'); else bad('M1-4 chưa ghi timeLabel hai ngôn ngữ');
if (mtText.includes('M2-7') && mtText.includes('check-links.mjs:47') && mtText.includes('không tự kết luận nguồn hỏng')) ok('M2-5/M2-7 tách kiểm nội bộ vs 52 nguồn ngoài + dẫn bằng chứng check-links.mjs:47'); else bad('ma trận chưa tách kiểm liên kết nội bộ/nguồn ngoài');

// ---------- 7. Các câu đã sửa — đối chiếu nguyên văn ----------
section('7. Chuỗi sửa theo TXN-20260913-04 (presence check — ý nghĩa do GPT Work thẩm định)');
const khongCon = [
  ['bang-anh-xa-28-moc.md', bangText, 'Đỉnh của cơ khí điều hòa'],
  ['storyboard-6-chuong.md', sbText, 'đỉnh điều hòa'],
  ['storyboard-6-chuong.md', sbText, 'chăm mỗi ngày'],
  ['storyboard-6-chuong.md', sbText, 'phản ứng'],
  ['storyboard-6-chuong.md', sbText, 'nghề chế tác đã sẵn sàng'],
  ['storyboard-6-chuong.md', sbText, 'mechanism 11'],
  ['bang-anh-xa-28-moc.md', bangText, 'CEO khối 1983–1985'],
  ['storyboard-6-chuong.md', sbText, 'Một cặp trang duy nhất'],
  ['tai-san-va-khoi-luong.md', tsText, '2.950'],
];
let presenceOk = true;
for (const [fname, text, s] of khongCon) {
  if (text.includes(s)) { presenceOk = false; bad(fname + ' vẫn còn chuỗi cũ: "' + s + '"'); }
}
if (presenceOk) ok('9 chuỗi cũ đã bỏ sạch khỏi hồ sơ');
const coMoi = [
  ['storyboard-6-chuong.md', sbText, 'Hai mốc lập xưởng bổ sung bối cảnh nghề chế tác; hồ sơ không xác lập quan hệ nhân quả với các phát minh điều hòa.'],
  ['storyboard-6-chuong.md', sbText, 'this record does not establish a causal link with the regulator inventions'],
  ['storyboard-6-chuong.md', sbText, 'những nhu cầu sử dụng hằng ngày nào đã định hình thiết kế'],
  ['storyboard-6-chuong.md', sbText, 'mốc cấp bằng 1801'],
  ['storyboard-6-chuong.md', sbText, '(mốc cấp bằng 1801)'],
  ['storyboard-6-chuong.md', sbText, 'Hayek làm CEO SMH giữa thập niên 1980'],
  ['storyboard-6-chuong.md', sbText, 'silicon-revival ở mức bối cảnh (context)'],
  ['bang-anh-xa-28-moc.md', bangText, 'Mốc cấp bằng: bằng sáng chế tourbillon 1801'],
  ['bang-anh-xa-28-moc.md', bangText, 'Hayek làm CEO SMH ở giai đoạn giữa thập niên 1980 (khối 1983–1985 là cách trình bày trên trang Swatch Group), không phải ngay 1983; vai trò trình bày Swatch ngày ra mắt thuộc về Ernst Thomke (Europa Star)'],
  ['tai-san-va-khoi-luong.md', tsText, 'whitespace-separated tokens'],
];
let presence2 = true;
for (const [fname, text, s] of coMoi) {
  if (!text.includes(s)) { presence2 = false; bad(fname + ' thiếu chuỗi mới: "' + s.slice(0, 60) + '..."'); }
}
if (presence2) ok('10 chuỗi mới đúng nguyên văn (giữ khung gốc, đồng bộ giới hạn timeline.json)');
// chuỗi mới trong bảng ánh xạ mốc 4 — kiểm cột vai trò không chứa chữ đỉnh (đã phủ ở khongCon)

// ---------- 8. Kiểm thủ công — danh sách cho GPT Work thẩm định ----------
section('8. KIỂM THỦ CÔNG (script KHÔNG chứng minh được ý nghĩa — chờ GPT Work thẩm định)');
console.log('  - C1 câu giữ chương mới (VI+EN) đúng tinh thần "bối cảnh, không nhân quả"');
console.log('  - C3 câu hỏi mới không ngụ ý "không cần chăm sóc"');
console.log('  - C5 câu hỏi + luồng + câu giữ chương không gán phản ứng/nhân quả với quartz');
console.log('  - C6 phân biệt brand-claim (Co-Axial, Freak) với context (silicon-revival)');
console.log('  - swatch-1983: bảng + storyboard khớp giới hạn nguyên văn timeline.json');
console.log('  - tourbillon: mô tả trung tính về mốc cấp bằng 1801, không xếp hạng');
console.log('  - Hệ số EN/VI 1,1–1,3: script chỉ xác nhận hồ sơ ghi đúng nhãn "giả định dự phòng, chưa hiệu chuẩn" — tính hợp lý của hệ số do GPT Work thẩm định, script không chứng minh phương pháp');
console.log('  - M2-7 (52 nguồn ngoài): script không truy cập HTTP — ca kiểm ghi đúng khuôn (bảo toàn so G02 + nếu truy cập thì ghi thời điểm/URL cuối/trạng thái thật) do GPT Work thẩm định');
console.log('  - Đối chiếu presence ở mục 7 chỉ xác nhận chuỗi xuất hiện, không xác nhận ngữ nghĩa');

// ---------- 9. Giới hạn không sửa src/ ----------
section('9. Giới hạn chặng A');
const gitOut = (() => { try {
  return execFileSync('git', ['status', '--porcelain', '--', 'src', 'public', 'package.json', 'scripts'], { cwd: repo, encoding: 'utf8' });
} catch (e) { return 'ERR ' + e.message; } })();
if (gitOut.trim() === '') ok('src/, public/, package.json, scripts/ không bị thay đổi'); else bad('có tệp ngoài phạm vi bị đổi:\n' + gitOut);

// ---------- Tổng kết ----------
console.log('\n==========');
if (fails.length === 0) {
  console.log('KẾT QUẢ: TẤT CẢ ĐẠT');
  console.log(JSON.stringify({ ketQua: 'DAT', vong: 'TXN-20260913-04', moc: 28, chuong: 6, nguon: totalSources, gioiHan: totalLimit, readMoreNull: totalNull, type: typeCount, descTokens, leadTokens, noteTokens, nameNguonTiengViet: nameVi.length, maTranCa: mtRows.length }, null, 2));
  process.exit(0);
} else {
  console.log('KẾT QUẢ: ' + fails.length + ' LỖI');
  process.exit(1);
}
