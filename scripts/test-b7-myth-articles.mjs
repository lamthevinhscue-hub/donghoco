// =============================================================================
// test-b7-myth-articles.mjs — bộ thử B7 (TXN-20261011-14)
// =============================================================================
// 15 ca mutation trên cây thật (sao lưu + hoàn nguyên, đối chiếu SHA-256 từng
// tệp; sai kỳ vọng làm chính bộ thử exit 1) + 2 phép thử trạng thái U1 trên
// cây giả trong thư mục tạm (không đụng repo). Hai lượt sạch cuối (nguồn +
// dist) chạy trên cây đã hoàn nguyên, tính riêng khỏi số mutation.
// Dùng: node scripts/test-b7-myth-articles.mjs
// Chạy được trên checkout khác — mọi đường dẫn tương đối với cwd.
// =============================================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, readdirSync, copyFileSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const sha = (buf) => createHash('sha256').update(buf).digest('hex');
const doc = (d) => readFileSync(d);
const ghi = (s) => console.log(s);
let LOI = 0;

const CHECKER = 'scripts/check-b7-myth-articles.mjs';
const chay = (args, env = {}, checker = CHECKER) =>
  execFileSync(process.execPath, [checker, ...args], {
    encoding: 'utf8',
    env: { ...process.env, ...env },
  });

// mut <ten> <mode> <cheDoChecker> <kyVongExit> <kyVongChuai> <tep> <cu> <moi> —
// sao lưu → mutate → chạy checker (đúng exit + đúng chuỗi lỗi) → hoàn nguyên →
// đối chiếu SHA. Bất thường ở bất kỳ bước nào làm bộ thử exit 1.
function mut({ ten, mode, kyVongExit, kyVongChu, tep, cu, moi, checker = CHECKER, tatCa = false }) {
  const bak = doc(tep);
  const shaTruoc = sha(bak);
  const vanBan = bak.toString('utf8');
  if (!vanBan.includes(cu)) {
    ghi(`${ten}: SAI — không tạo được mutation (chuỗi cũ không có)`);
    LOI = 1;
    return;
  }
  writeFileSync(tep, tatCa ? vanBan.replaceAll(cu, moi) : vanBan.replace(cu, moi, 1), 'utf8');
  let out = '';
  let ec = 0;
  try {
    out = chay(mode, {}, checker);
  } catch (e) {
    ec = e.status ?? null;
    out = e.stdout ?? '';
  }
  writeFileSync(tep, bak);
  const shaSau = sha(doc(tep));
  if (shaSau !== shaTruoc) {
    ghi(`${ten}: SAI — hoàn nguyên không byte-đối-byte`);
    LOI = 1;
    return;
  }
  const dungChu = kyVongChu === null || out.includes(kyVongChu);
  if (ec === kyVongExit && dungChu) {
    ghi(`${ten}: ĐẠT — exit=${ec}${kyVongChu ? `, log có '${kyVongChu}'` : ''} (đã hoàn nguyên, SHA khớp)`);
  } else {
    ghi(`${ten}: SAI KỲ VỌNG — exit=${ec} (kv ${kyVongExit}), chuỗi '${kyVongChu}' ${dungChu ? 'có' : 'THIẾU'} trong log`);
    LOI = 1;
  }
}

const BAI_VI = 'src/content/huongDan/vi/chan-kinh-nhieu-co-tot-hon.md';
const MAG_VI = 'src/content/huongDan/vi/nam-cham-lam-dong-ho-chay-sai.md';
const ROUTES = 'src/i18n/contentRoutes.ts';
const HUB_VI = 'dist/hieu-dung/index.html';

ghi('=== 15 CA MUTATION (sao lưu + hoàn nguyên SHA từng tệp) ===');

// M1 — bỏ tag hieu-dung → checker nguồn fail B7 nguồn
mut({
  ten: 'M1 bo-tag', mode: [], kyVongExit: 1, kyVongChu: 'KHÔNG ĐẠT B7 nguồn chan-kinh-nhieu-co-tot-hon (VI)',
  tep: BAI_VI, cu: 'tags: ["hieu-dung"]', moi: 'tags: ["khac"]',
});

// M2 — chuyển thành draft → fail B7 nguồn
mut({
  ten: 'M2 draft-true', mode: [], kyVongExit: 1, kyVongChu: 'KHÔNG ĐẠT B7 nguồn chan-kinh-nhieu-co-tot-hon (VI)',
  tep: BAI_VI, cu: 'draft: false', moi: 'draft: true',
});

// M3 — đổi cặp route EN sai → fail B7 cặp route
mut({
  ten: 'M3 route-sai', mode: [], kyVongExit: 1, kyVongChu: 'KHÔNG ĐẠT B7 cặp route chan-kinh-nhieu-co-tot-hon',
  tep: ROUTES, cu: "en: '/en/guides/are-more-jewels-better/'", moi: "en: '/en/guides/are-jewels-better/'",
});

// M4 — URL nguồn thành giả, URL đúng giấu ở auditNote → fail B7 nguồn (mảng sources)
mut({
  ten: 'M4 doi-URL-giu-nhan', mode: [], kyVongExit: 1, kyVongChu: 'KHÔNG ĐẠT B7 nguồn are-more-jewels-better (EN)',
  tep: 'src/content/huongDan/en/are-more-jewels-better.md',
  cu: 'url: "https://www.incabloc.ch/en/stones-sapphires/"',
  moi: 'url: "https://example.org/not-incabloc"\nauditNote: "https://www.incabloc.ch/en/stones-sapphires/"',
});

// M5 — gỡ href nguồn trong khối nguồn dist, chuyển URL ra thân bài → fail B7 dist
// M5 thực hiện ĐỦ 2 tình huống (TXN-16): gỡ href khỏi source-list rồi chèn
// cùng URL vào thân article — checker phải vẫn fail (href chỉ đếm trong khối nguồn)
const M5tep = 'dist/huong-dan/chan-kinh-nhieu-co-tot-hon/index.html';
const M5bak = doc(M5tep);
const M5shaTruoc = sha(M5bak);
{
  const van = M5bak.toString('utf8');
  const u = 'href="https://www.incabloc.ch/en/stones-sapphires/"';
  if (!van.includes(u)) { ghi('M5 go-href-dist: SAI — không tạo được mutation'); LOI = 1; }
  else {
    writeFileSync(M5tep, van.replace(u, 'href="#m5"').replace('giảm ma sát giữa kim loại và đá', 'giảm ma sát giữa kim loại và đá <a href="https://www.incabloc.ch/en/stones-sapphires/">Incabloc</a>'), 'utf8');
    let out5 = '';
    let ec5 = 0;
    try { out5 = chay(['dist']); } catch (e) { ec5 = e.status ?? null; out5 = e.stdout ?? ''; }
    writeFileSync(M5tep, M5bak);
    if (sha(doc(M5tep)).toString() !== M5shaTruoc.toString()) { ghi('M5: SAI — hoàn nguyên không SHA khớp'); LOI = 1; }
    else if (ec5 === 1 && out5.includes('KHÔNG ĐẠT B7 dist chan-kinh-nhieu-co-tot-hon VI')) ghi('M5 go-href+chen-than: ĐẠT — exit=1, fail đúng rule (đã hoàn nguyên, SHA khớp)');
    else { ghi('M5: SAI KỲ VỌNG — exit=' + ec5); LOI = 1; }
  }
}

// M6 — hub thay một đích bằng bài ngoài loạt → U1-7 fail (thiếu/thừa)
mut({
  ten: 'M6 hub-thay-dich', mode: ['dist'], kyVongExit: 1, kyVongChu: '[U1-7] hub VI', checker: 'scripts/check-u1-myth-series.mjs',
  tep: HUB_VI, cu: 'href="/huong-dan/chan-kinh-nhieu-co-tot-hon"', moi: 'href="/huong-dan/len-day-dong-ho"',
});

// M7 — bỏ <article> trong dist bài → fail B7 dist (fail cứng, không fallback)
mut({
  ten: 'M7 bo-article', mode: ['dist'], kyVongExit: 1, kyVongChu: 'KHÔNG tìm thấy <article>',
  tep: 'dist/huong-dan/nam-cham-lam-dong-ho-chay-sai/index.html',
  cu: '<article', moi: '<div data-da-la-article', tatCa: true,
});

// M8 — nhãn trống vào hub đang có bài → U1-7 fail
mut({
  ten: 'M8 nhan-trong', mode: ['dist'], kyVongExit: 1, kyVongChu: '[U1-7] hub VI', checker: 'scripts/check-u1-myth-series.mjs',
  tep: HUB_VI, cu: '</h1>', moi: '</h1><p>Chưa có bài nào trong loạt này. Hãy quay lại sau!</p>',
});

// M9 (PA1, TXN-20261011-15) — claim 15-21 gán FHH tái xuất hiện → fail B7 nguồn
mut({
  ten: 'M9 claim-15-21-tai-xuat-hien', mode: [], kyVongExit: 1, kyVongChu: 'KHÔNG ĐẠT B7 nguồn chan-kinh-nhieu-co-tot-hon (VI)',
  tep: BAI_VI, cu: 'Tổng số chân kính cho biết **cấu tạo** của bộ máy', moi: 'Theo FHH, bộ máy chất lượng thường có từ 15 đến 21 chân kính. Tổng số chân kính cho biết **cấu tạo** của bộ máy',
});

// M10 (PA1, TXN-20261011-15) — câu Master Co-Axial 15.000 gauss không căn cứ tái xuất hiện → fail B7 nguồn
mut({
  ten: 'M10 master-co-axial-tai-xuat-hien', mode: [], kyVongExit: 1, kyVongChu: 'KHÔNG ĐẠT B7 nguồn nam-cham-lam-dong-ho-chay-sai (VI)',
  tep: MAG_VI, cu: '- Oris công bố Calibre 400', moi: '- OMEGA cho biết các bộ máy Master Co-Axial chịu được từ trường tới 15.000 gauss.' + '\n' + '- Oris công bố Calibre 400',
});

// ==== 4 CA ÂM TÍNH BỔ SUNG (TXN-16) ====
// M11 — mất giới hạn giữ dầu (jewels VI) → fail B7 nguồn (thiếu căn cứ)
mut({
  ten: 'M11 mat-gioi-han-giu-dau', mode: [], kyVongExit: 1, kyVongChu: 'KHÔNG ĐẠT B7 nguồn chan-kinh-nhieu-co-tot-hon (VI)',
  tep: 'src/content/huongDan/vi/chan-kinh-nhieu-co-tot-hon.md',
  cu: 'không phải mọi chân kính trong mọi bộ máy đều có cùng cấu tạo giữ dầu',
  moi: 'mọi chân kính đều có cấu tạo giữ dầu như nhau',
});

// M12 — canonical sai trên dist → fail B7 dist (canonical)
mut({
  ten: 'M12 canonical-sai', mode: ['dist'], kyVongExit: 1, kyVongChu: 'canonical sai',
  tep: 'dist/huong-dan/chan-kinh-nhieu-co-tot-hon/index.html',
  cu: '<link rel="canonical" href="https://www.kienthucdonghoco.vn/huong-dan/chan-kinh-nhieu-co-tot-hon/">',
  moi: '<link rel="canonical" href="https://example.org/wrong-page">',
});

// M13 — hreflang sai địa chỉ trên dist → fail B7 dist (hreflang)
mut({
  ten: 'M13 hreflang-sai', mode: ['dist'], kyVongExit: 1, kyVongChu: 'hreflang sai địa chỉ',
  tep: 'dist/huong-dan/chan-kinh-nhieu-co-tot-hon/index.html',
  cu: 'hreflang="en" href="https://www.kienthucdonghoco.vn/en/guides/are-more-jewels-better/"',
  moi: 'hreflang="en" href="https://www.kienthucdonghoco.vn/en/guides/wrong-slug/"',
});

// M14 — claim cấm tái xuất CHỈ Ở DIST → fail B7 dist (source vẫn xanh)
mut({
  ten: 'M14 claim-cam-chi-dist', mode: ['dist'], kyVongExit: 1, kyVongChu: 'claim cấm trong article: Master Co-Axial',
  tep: 'dist/huong-dan/nam-cham-lam-dong-ho-chay-sai/index.html',
  cu: 'Ba ví dụ trên thuộc về từng dòng sản phẩm cụ thể',
  moi: 'OMEGA cho biết các bộ máy Master Co-Axial chịu được từ trường tới 15.000 gauss. Ba ví dụ trên thuộc về từng dòng sản phẩm cụ thể',
});

// M15 (TXN-17) — gỡ giới hạn lên-dây-tay nhưng giữ căn cứ khác → fail B7 nguồn
mut({
  ten: 'M15 go-gioi-han-len-day-tay', mode: [], kyVongExit: 1, kyVongChu: 'KHÔNG ĐẠT B7 nguồn dong-ho-co-can-deo-moi-ngay (VI)',
  tep: 'src/content/huongDan/vi/dong-ho-co-can-deo-moi-ngay.md',
  cu: 'với **mẫu có cơ chế lên dây tay**, hãng khuyên **lên dây bằng tay** theo hướng dẫn của hãng',
  moi: 'các hãng khuyên **lên dây bằng tay**',
});

// ==== 2 phép thử trạng thái U1 trên cây giả ====
ghi('=== 2 PHÉP THỬ TRẠNG THÁI U1 (cây giả trong thư mục tạm) ===');
function cayGia(nguonCoBai, hubCoThe) {
  const goc = mkdtempSync(join(tmpdir(), 'b7-u1-'));
  for (const tep of ['src/pages/hieu-dung/index.astro', 'src/pages/en/myths/index.astro', 'src/i18n/contentRoutes.ts', 'src/i18n/ui.ts']) {
    mkdirSync(dirname(join(goc, tep)), { recursive: true });
    copyFileSync(tep, join(goc, tep));
  }
  for (const nn of ['vi', 'en']) {
    mkdirSync(join(goc, 'src/content/huongDan', nn), { recursive: true });
    const tep = doc(join(nn === 'vi' ? 'src/content/huongDan/vi' : 'src/content/huongDan/en', nn === 'vi' ? 'chan-kinh-nhieu-co-tot-hon.md' : 'are-more-jewels-better.md')).toString('utf8');
    const khongTag = nguonCoBai ? tep : tep.replace('tags: ["hieu-dung"]', 'tags: ["khac"]');
    writeFileSync(join(goc, 'src/content/huongDan', nn, nn === 'vi' ? 'chan-kinh-nhieu-co-tot-hon.md' : 'are-more-jewels-better.md'), khongTag, 'utf8');
  }
  // dist hub giả: một bài đủ điều kiện → thẻ; không bài → nhãn trống
  mkdirSync(join(goc, 'dist/hieu-dung'), { recursive: true });
  mkdirSync(join(goc, 'dist/en/myths'), { recursive: true });
  const dauHubVi = '<html><head><link rel="canonical" href="https://www.kienthucdonghoco.vn/hieu-dung"><link hreflang="vi" href="https://www.kienthucdonghoco.vn/hieu-dung"><link hreflang="en" href="https://www.kienthucdonghoco.vn/en/myths/"></head><body><main><h1>Hiểu đúng</h1><a href="/en/myths/">English</a>';
  const hubThe = dauHubVi + '<section><div><a href="/huong-dan/chan-kinh-nhieu-co-tot-hon">a</a></div></section></main></body></html>';
  const hubRong = dauHubVi + '<section><p>Chưa có bài nào trong loạt này. Hãy quay lại sau!</p></section></main></body></html>';
  const dauHubEn = '<html><head><link rel="canonical" href="https://www.kienthucdonghoco.vn/en/myths/"><link hreflang="vi" href="https://www.kienthucdonghoco.vn/hieu-dung"><link hreflang="en" href="https://www.kienthucdonghoco.vn/en/myths/"></head><body><main><h1>Myths</h1><a href="/hieu-dung">Tiếng Việt</a>';
  const hubTheEn = dauHubEn + '<section><div><a href="/en/guides/are-more-jewels-better/">a</a></div></section></main></body></html>';
  const hubRongEn = dauHubEn + '<section><p>No articles in this series yet. Please check back later!</p></section></main></body></html>';
  writeFileSync(join(goc, 'dist/hieu-dung/index.html'), hubCoThe ? hubThe : hubRong, 'utf8');
  writeFileSync(join(goc, 'dist/en/myths/index.html'), hubCoThe ? hubTheEn : hubRongEn, 'utf8');
  // 4 trang dẫn cho U1-8 (fixture đầy đủ để checker chính thức exit 0 khi U1-7 đạt)
  const trangDan = (dung, sai) => '<html><body><a ' + dung + '>dung</a><a ' + sai + '>sai</a></body></html>';
  const bo = (s) => s; // giữ nguyên dạng href="..."
  mkdirSync(join(goc, 'dist'), { recursive: true });
  mkdirSync(join(goc, 'dist/en'), { recursive: true });
  mkdirSync(join(goc, 'dist/huong-dan'), { recursive: true });
  mkdirSync(join(goc, 'dist/en/guides'), { recursive: true });
  writeFileSync(join(goc, 'dist/index.html'), '<html><body>' + bo('href="/hieu-dung"') + '</body></html>', 'utf8');
  writeFileSync(join(goc, 'dist/en/index.html'), '<html><body>' + bo('href="/en/myths/"') + '</body></html>', 'utf8');
  writeFileSync(join(goc, 'dist/huong-dan/index.html'), '<html><body>' + bo('href="/hieu-dung"') + '</body></html>', 'utf8');
  writeFileSync(join(goc, 'dist/en/guides/index.html'), '<html><body>' + bo('href="/en/myths/"') + '</body></html>', 'utf8');
  return goc;
}
function phapThuU1({ ten, coThe, hubCoThe = coThe, kyVongExit = null, kyVongChu, cam = null }) {
  const goc = cayGia(coThe, hubCoThe);
  let out = '';
  let ec = 0;
  try {
    out = chay(['dist'], { U1_ROOT: goc }, 'scripts/check-u1-myth-series.mjs').toString();
  } catch (e) {
    ec = e.status ?? null;
    out = e.stdout ?? '';
  }
  rmSync(goc, { recursive: true, force: true });
  const dungChu = out.includes(kyVongChu);
  const khongCam = cam === null || !out.includes(cam);
  const exitDung = kyVongExit === null || ec === kyVongExit;
  if (dungChu && khongCam && exitDung) ghi(`${ten}: ĐẠT — exit=${ec}, log có '${kyVongChu}'${cam ? `, không có '${cam}'` : ''}`);
  else {
    ghi(`${ten}: SAI KỲ VỌNG — exit=${ec} (kv ${kyVongExit ?? 'any'}), chuỗi '${kyVongChu}' ${dungChu ? 'có' : 'THIẾU'}${cam && !khongCam ? `, VẪN CÓ '${cam}'` : ''}`);
    for (const d of out.split('\n')) if (d.includes('LỖI')) ghi('   ' + d.trim());
    LOI = 1;
  }
}
phapThuU1({ ten: 'U1-T1 khong-bai + nhan trong dung → U1-7 DAT + checker exit 0 (fixture đầy đủ)', coThe: false, kyVongChu: '[U1-7] hub VI: không có bài — nhãn trống đúng', cam: 'LỖI  [U1-7]', kyVongExit: 0 });
phapThuU1({ ten: 'U1-T2 khong-bai nhung hub co the → THAT BAI', coThe: false, hubCoThe: true, kyVongChu: 'nhãn trống=false', kyVongExit: 1 });

// ==== hai lượt sạch cuối trên cây đã hoàn nguyên ====
ghi('=== HAI LƯỢT SẠCH CUỐI (nguồn + dist) ===');
for (const mode of [[], ['dist']]) {
  let ec = 0;
  try {
    chay(mode);
  } catch (e) {
    ec = e.status ?? null;
  }
  ghi(`LUỢT SẠCH CUỐI ${mode[0] ?? 'nguồn'}: exit=${ec} — ${ec === 0 ? 'ĐẠT' : 'SAI'}`);
  if (ec !== 0) LOI = 1;
}

ghi(LOI === 0
  ? '=> BỘ THỬ B7 ĐẠT: 15/15 mutation đúng kỳ vọng + hoàn nguyên SHA khớp + 2/2 phép thử U1 + 2/2 lượt sạch cuối'
  : '=> BỘ THỬ B7 THẤT BẠI');
process.exit(LOI === 0 ? 0 : 1);
