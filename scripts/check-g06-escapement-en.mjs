#!/usr/bin/env node
// =============================================================================
// check-g06-escapement-en.mjs — kiểm chống hồi quy Bộ thoát (G06)
// =============================================================================
// Lịch sử: script sinh ra cho G06-C chặng 2 — tích hợp infographic Bộ thoát
// song ngữ (TXN-20260915-8). Từ 02/10/2026 infographic đã RÚT trên cả hai trang
// (/co-che/bo-thoat và /en/mechanisms/escapement) — video nguyên lý có thuyết
// minh VI/EN thay (commit c454654 nhúng video + gói rút infographic). Script
// giữ nguyên tên và vị trí trong chuỗi check/build, đổi mục tiêu:
//   1) khóa trạng thái mới "không khung + có video đúng ngôn ngữ" trên hai trang;
//   2) giữ nguyên các kiểm nguồn Escapement.astro / MechanismAnimation.astro —
//      component ngừng render nhưng còn trong cây như tài sản, chuỗi chữ duyệt
//      trước không được sửa lậu;
//   3) giữ các guard quét dist: không trang EN nào khác dính khung, G04 nguyên
//      trạng, tổng trang khung, không 3D.
//
// V3 (TXN-20261010-007/009): khi khóa slider_video: true bật trên ĐÚNG hai bài
// bộ thoát (S10d đọc frontmatter tệp bài — KHÔNG suy ngoại lệ từ HTML/dist),
// hai trang được phép — và bị bắt buộc — render lại khung SVG kèm khối video
// trượt pha; D1/D3, D2/D3d và D7 chạy theo hai nhánh cờ (tắt = nguyên trạng
// hiện hành; bật = bắt buộc đủ khối V3 + SVG, nhãn đúng ngôn ngữ, D7 so tập
// đường dẫn). Các bảo vệ khác — video thuyết minh/poster đúng ngôn ngữ
// (D1b/D1c/D3b/D3c), nguồn chữ SVG đã duyệt (S1…S8b/S15), reduced motion
// (S13), D5/D6/D8/D10 — giữ nguyên ở cả hai nhánh.
//
// Tầng NGUỒN (S1…S15 — luôn chạy):
//   S1…S8b chuỗi chữ duyệt của Escapement.astro + MechanismAnimation.astro
//          (giữ nguyên làm bằng chứng tài sản; ngoại lệ nhãn động ở mục 7
//          checker motion vẫn bám vào nguồn)
//   S9     Gate MechanismArticle: dòng gate EN + nhánh G04 giữ nguyên (gate
//          bất hoạt thực tế vì hai cờ false — S10 khóa điều đó)
//   S10    frontmatter en/escapement.md: hai cờ false + principle_video EN +
//          draft false + custom_slug
//   S10b   frontmatter vi/bo-thoat.md: hai cờ false + principle_video VI
//   S10c   ghi chú "Infographic động cho chủ đề này chưa có" phải có điều kiện
//          !data.principle_video — không hiện trên bài đã có video
//   S11    check-regulating-cluster.mjs: FLAG_TRUE_FILES rỗng (mọi bài EN
//          false/false — Bộ thoát và Bánh lắc G04 đã rút infographic)
//   S12    package.json: check:g06c + nối check/build
//   S13    RM tương tác trong MechanismAnimation: matchMedia + canRun + chặn Phát
//          + guard chống nhân đôi listener
//   S14    không phụ thuộc lịch sử Git (không lệnh git/spawn trong đường kiểm)
//
// Tầng DIST (D… — chạy khi truyền "dist" hoặc "dist <dir>"):
//   D1  /en/mechanisms/escapement/ KHÔNG khung (data-mechanism/data-enhanced)
//   D1b trang EN nhúng video EN + poster; KHÔNG tham chiếu clip VI
//   D2  trang EN không còn chuỗi hiển thị khung (Step 1/5, ● TICK, escapement-svg…)
//   D3  /co-che/bo-thoat/ KHÔNG khung
//   D3b trang VI nhúng video VI + poster; KHÔNG tham chiếu clip EN
//   D3d trang VI không còn chuỗi hiển thị khung VI
//   D5  không trang EN nào khác có data-mechanism (+ 3 tự kiểm cây thử)
//   D6  G04 giữ nguyên: /co-che/day-toc-banh-lac/ và
//       /en/mechanisms/balance-and-hairspring/ KHÔNG data-mechanism
//   D7  tổng trang render khung = 5 (0 co-che + 5 tu-dien; toàn bộ trang bài
//       co-che đã rút khung thay bằng video nguyên lý — chỉ còn khung ở từ điển)
//   D8  legend KHÔNG được chứng nhận bằng dist (dist không có data-part-target —
//       legend sinh bằng JS; tiêu chí legend thuộc tầng trình duyệt)
//   D10 trang EN Bộ thoát không tham chiếu chunk 3D (exploded3d)
//   (D9/D11 cũ — kiểm nhãn SVG render trên dist — đã bỏ cùng lượt rút
//   infographic; sự vắng mặt của escapement-svg được khóa ở D2/D3d.)
//
// Cú pháp: node scripts/check-g06-escapement-en.mjs [dist [thuMucDist]]
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync, readdirSync, statSync, mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';
import { tmpdir } from 'node:os';

const LOI = [];
const ghi = (ma, ok, chiTiet) => {
  if (!ok) LOI.push(`${ma}: ${chiTiet}`);
  console.log(`${ok ? 'ĐẠT' : 'LỖI'} ${ma}${chiTiet ? ' — ' + chiTiet : ''}`);
};
const doc = (p) => readFileSync(p, 'utf8');

// ============================== TẦNG NGUỒN ==================================
const escPath = 'src/components/infographics/Escapement.astro';
const khungPath = 'src/components/infographics/MechanismAnimation.astro';
const articlePath = 'src/components/templates/MechanismArticle.astro';
const baiEnPath = 'src/content/coChe/en/escapement.md';
const baiViPath = 'src/content/coChe/vi/bo-thoat.md';
const regulatingPath = 'scripts/check-regulating-cluster.mjs';

const esc = doc(escPath);
const khung = doc(khungPath);
const article = doc(articlePath);
const baiEn = doc(baiEnPath);
const baiVi = doc(baiViPath);
const regulating = doc(regulatingPath);
const pkg = JSON.parse(doc('package.json'));

// S1 — GK-1
ghi('S1 GK-1', esc.includes("'Swiss lever escapement'") && esc.includes("'Bộ thoát Swiss lever (Escapement)'"), 'label hai ngôn ngữ');

// S2 — GK-2
ghi('S2 GK-2', esc.includes('Five cause-and-effect steps make the tick-tock beat.') && esc.includes('Năm bước nhân quả tạo ra nhịp tíc-tắc.'), 'desc khung hai ngôn ngữ');

// S3 — stepsEn chốt
const stepsEnBatBuoc = [
  ['The balance moves towards the centre', 'Towards the centre', 'In this model, the balance moves from the left towards the central position.'],
  ['The lever unlocks the wheel', 'Unlock', 'The escape wheel leaves its locked position and starts to turn freely.'],
  ['The escape wheel turns a small step and delivers impulse', 'Impulse', 'The escape wheel turns a small step; mainspring force passes through the pallet stones as an impulse that keeps the balance swinging — the brass line traces the energy path.'],
  ['The lever locks the next tooth', 'Lock', 'The other pallet stone drops onto the next tooth; the wheel comes to rest in the locked position.'],
  ['The balance reverses; the cycle repeats', 'Reversal', 'This step shows the balance on the opposite side. Continuing playback returns the diagram to the first step and repeats the explanation; the next half-cycle is not simulated separately.'],
];
for (let i = 0; i < stepsEnBatBuoc.length; i++) {
  const [t, e, d] = stepsEnBatBuoc[i];
  ghi(`S3 GK bước ${i + 1} EN`, esc.includes(`t: '${t}'`) && esc.includes(`e: '${e}'`) && esc.includes(`d: '${d}'`), `stepsEn[${i}] nguyên văn`);
}

// S4 — steps VI chốt
const stepsViBatBuoc = [
  ['Bánh lắc chuyển động về phía giữa', 'Trong mô hình, bánh lắc chuyển động từ phía trái về vị trí giữa.'],
  ['Ngựa mở khóa bánh thoát', 'Bánh thoát rời vị trí bị khóa và bắt đầu quay tự do.'],
  ['Bánh thoát quay một nhịp nhỏ và truyền xung lực', 'Bánh thoát quay một nhịp nhỏ; lực cót đi qua đá pallet thành xung lực đẩy bánh lắc đi tiếp — đường màu đồng chỉ hướng truyền năng lượng.'],
  ['Ngựa khóa răng kế tiếp', 'Đá pallet kia hạ xuống chặn răng tiếp theo; bánh thoát dừng lại ở vị trí khóa.'],
  ['Bánh lắc đảo chiều, chu trình lặp', 'Bước này minh họa bánh lắc ở phía đối diện. Khi phát tiếp, sơ đồ quay lại bước đầu để lặp phần hướng dẫn; không mô phỏng riêng nửa chu kỳ tiếp theo.'],
];
for (let i = 0; i < stepsViBatBuoc.length; i++) {
  const [t, d] = stepsViBatBuoc[i];
  ghi(`S4 GK bước ${i + 1} VI`, esc.includes(`t: '${t}'`) && esc.includes(`d: '${d}'`), `steps VI[${i}] nguyên văn chốt`);
}

// S5 — GK-16a/16b
ghi('S5 GK-16a', esc.includes('Sơ đồ hướng dẫn đã giản lược. Góc quay và các tư thế dùng để giải thích từng bước, không phải thông số thiết kế của một bộ máy cụ thể.') && esc.includes('This is a simplified teaching diagram. Its angles and poses explain individual steps; they are not design specifications for a particular movement.'), 'nhãn giản lược VI+EN');
ghi('S5 GK-16b', esc.includes('Theo FHH, bộ thoát gồm bánh thoát, ngựa và roller. Roller không được thể hiện trong sơ đồ này.') && esc.includes('FHH identifies the escape wheel, lever and roller as the three parts of the escapement. The roller is not shown in this diagram.'), 'nhãn roller VI+EN');

// S6 — GK-9/9d
ghi('S6 GK-9', esc.includes('Step-by-step diagram of a Swiss lever escapement: escape wheel, lever, pallet jewels, balance and hairspring'), 'aria-label EN');
ghi('S6 GK-9 (VI)', esc.includes('Sơ đồ hướng dẫn bộ thoát Swiss lever theo năm bước'), 'aria-label VI');
ghi('S6 GK-9d', esc.includes('Interactive diagram: escape wheel on the left, lever with two pallet stones in the middle'), 'desc SVG EN');

// S7 — GK-11 role VI chốt + roleEn; cấm chuỗi cũ
const roleBatBuoc = [
  'The escape wheel is locked and released at intervals within the escapement.',
  'The lever receives force from the escape wheel, delivers impulse to the balance, then locks the wheel again.',
  'The two pallet stones are shown at the contact region between the lever and escape wheel in the diagram.',
  'Oscillates regularly; together with the hairspring it divides time into strictly equal parts.',
  'A thin coiled spring which, coupled with the balance, forms the regulating organ: it gives the balance its to-and-fro motion, dividing time into strictly equal parts.',
];
roleBatBuoc.forEach((r, i) => ghi(`S7 GK-11 roleEn[${i}]`, esc.includes(`roleEn: '${r}'`), 'nguyên văn'));
const roleViBatBuoc = [
  'Bánh thoát được khóa và nhả theo từng nhịp trong cơ cấu bộ thoát.',
  'Hai đá pallet được thể hiện tại vùng tiếp xúc giữa ngựa và bánh thoát trong sơ đồ.',
  'Quay qua lại đều đặn; cùng dây tóc chia thời gian thành những phần bằng nhau.',
];
roleViBatBuoc.forEach((r, i) => ghi(`S7 GK-11 role VI[${i}]`, esc.includes(r), 'nguyên văn chốt'));
const camChuoiCu = ['ma sát rất thấp', 'xung lực chính xác', 'quyết định độ chính xác', '20 răng', 'tiến một răng', 'xoay đúng một răng', 'phát tiếng', 'tích và nhả năng lượng', 'Khoá và nhả từng răng'];
const cham = camChuoiCu.filter((c) => esc.includes(c));
ghi('S7 cấm chuỗi cũ', cham.length === 0, cham.length ? 'còn: ' + cham.join(' | ') : 'không còn chuỗi không căn cứ');

// S8 — GK-15
ghi('S8 GK-15 panel', esc.includes("panelName.textContent = lang === 'en' ? info.en : info.vi") && esc.includes("panelEn.textContent = lang === 'en' ? '' : info.en") && esc.includes("panelRole.textContent = lang === 'en' ? (info.roleEn || info.role) : info.role"), 'panel rẽ nhánh lang');
ghi('S8 GK-15 tooltip', esc.includes("const main = lang === 'en' ? en : vi;") && esc.includes("const sub = lang === 'en' ? '' : en;"), 'tooltip rẽ nhánh lang');
ghi('S8 GK-15 legend', khung.includes("langLegend === 'en' ? en || vi"), 'legend nhãn EN-only theo data-lang');

// S8b — GK-13 (markup + JS) + thông báo RM
const khungEnNhan = ['Previous step', 'Play animation', 'Pause animation', 'Next step', 'Reset to first step', 'Step 1/${steps.length}', 'Reduced motion is enabled. Use the step controls to explore the diagram.'];
khungEnNhan.forEach((s) => ghi(`S8b GK-13 EN`, khung.includes(s), s.slice(0, 40)));
const khungViNhan = ['Bước trước', 'Phát hoạt ảnh', 'Tạm dừng hoạt ảnh', 'Bước tiếp theo', 'Đặt lại về bước đầu', 'Bước 1/${steps.length}', 'Đang giảm chuyển động. Dùng các nút bước để xem sơ đồ.'];
khungViNhan.forEach((s) => ghi(`S8b GK-13 VI`, khung.includes(s), s.slice(0, 40)));
ghi('S8b GK-13 JS', khung.includes("counter: (i: number, n: number) => `Step ${i}/${n}`") && khung.includes("counter: (i: number, n: number) => `Bước ${i}/${n}`") && khung.includes("playing ? laJS.pause : laJS.play"), 'nhãn đổi bằng JS hai ngôn ngữ');

// S9 — Gate
ghi('S9 gate', article.includes("lang === 'en' && slug === 'escapement' && data.has_infographic && data.interactive") && article.includes('<Infographic lang={lang} />'), 'ngoại lệ EN duy nhất + truyền lang');
ghi('S9 G04', article.includes("G04_BALANCE_CHAPTER_SLUGS = ['day-toc-banh-lac', 'balance-and-hairspring']") && article.includes('!hasBalanceChapter &&'), 'nhánh chương G04 giữ nguyên');

// S10 — frontmatter EN: hai cờ FALSE (infographic rút 02/10/2026, video thay)
// + principle_video EN + draft false + custom_slug
ghi(
  'S10 cờ EN',
  /^has_infographic:[ \t]*false$/m.test(baiEn) &&
    /^interactive:[ \t]*false$/m.test(baiEn) &&
    /^principle_video:[ \t]*"\/videos\/bo-thoat-nguyen-ly-en\.mp4"$/m.test(baiEn) &&
    /^draft:[ \t]*false$/m.test(baiEn) &&
    /^custom_slug:[ \t]*"escapement"$/m.test(baiEn),
  'escapement.md hai cờ false + video EN + draft + slug'
);

// S10b — frontmatter VI: hai cờ false + principle_video VI
ghi(
  'S10b cờ VI',
  /^has_infographic:[ \t]*false$/m.test(baiVi) &&
    /^interactive:[ \t]*false$/m.test(baiVi) &&
    /^principle_video:[ \t]*"\/videos\/bo-thoat-nguyen-ly-vi\.mp4"$/m.test(baiVi),
  'bo-thoat.md hai cờ false + video VI'
);

// S10c — ghi chú "chưa có infographic" phải tắt khi bài có principle_video
ghi(
  'S10c gate ghi chú',
  article.includes("data.has_infographic === false && !data.principle_video && lang === 'vi'"),
  'thông báo "chưa có infographic" không hiện trên bài có video'
);

// S10d (V3 — TXN-20261010-007) — khóa slider_video: chỉ ĐÚNG hai bài bộ thoát
// được phép bật. Cờ đọc từ frontmatter của tệp bài trong src — KHÔNG suy ngoại
// lệ từ HTML/dist (suy từ HTML sẽ tự hợp thức hóa lỗi). has_infographic và
// interactive vẫn bị S10/S10b khóa false — V3 không dùng hai cờ đó.
const trichFrontmatter = (noiDung) => {
  if (!noiDung.startsWith('---')) return '';
  const ket = noiDung.indexOf('\n---', 3);
  return ket === -1 ? '' : noiDung.slice(3, ket);
};
const quetKhoaV3 = (thuGoc) => {
  const bat = [];
  const duyet = (thu) => {
    for (const ten of readdirSync(thu)) {
      const duong = join(thu, ten);
      if (statSync(duong).isDirectory()) duyet(duong);
      else if (ten.endsWith('.md') && /^slider_video:[ \t]*true$/m.test(trichFrontmatter(doc(duong)))) {
        bat.push(relative(thuGoc, duong).split(sep).join('/').replace(/\.md$/, ''));
      }
    }
  };
  duyet(thuGoc);
  return bat.sort();
};
const v3Bat = quetKhoaV3('src/content/coChe');
const duocPhepV3 = ['en/escapement', 'vi/bo-thoat'];
ghi(
  'S10d slider_video',
  v3Bat.every((x) => duocPhepV3.includes(x)),
  `bật: [${v3Bat.join(', ')}] (chỉ ${duocPhepV3.join(' + ')} được phép bật; tắt cả hai = trạng thái cũ hợp lệ)`
);
const v3EnBat = v3Bat.includes('en/escapement');
const v3ViBat = v3Bat.includes('vi/bo-thoat');

// S11 — ngoại lệ cờ: một Set, hiện RỖNG. Bộ thoát (02/10/2026) và Bánh lắc
// G04 (cùng ngày) đã rút infographic thay bằng video nguyên lý — mọi bài EN
// false/false.
const flagCau = regulating.match(/const FLAG_TRUE_FILES = new Set\(\[([\s\S]*?)\]\);/);
const flagFiles = flagCau ? (flagCau[1].match(/'([^']+)'/g) || []).map((s) => s.slice(1, -1)) : [];
ghi(
  'S11 regulating',
  flagFiles.length === 0 && regulating.includes('const flagTrue = FLAG_TRUE_FILES.has(f);') && !regulating.includes('FLAG_TRUE_FILES_G06C'),
  `Set ngoại lệ = [${flagFiles.join(', ')}] (kỳ vọng rỗng)`
);

// S12 — package.json
ghi('S12 scripts', pkg.scripts['check:g06c'] === 'node scripts/check-g06-escapement-en.mjs' && pkg.scripts['check'].includes('check-g06-escapement-en.mjs') && pkg.scripts['build'].includes('check-g06-escapement-en.mjs dist'), 'check:g06c + nối check/build');

// S13 — RM tương tác
ghi('S13 RM mq', khung.includes("mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')") && khung.includes('syncReduce'), 'matchMedia listener');
ghi('S13 RM canRun', khung.includes('(!reduceInteractive || !reduceActive)'), 'canRun chặn phát khi reduce');
ghi('S13 RM chặn Play', khung.includes('if (reduceInteractive && reduceActive) {') && khung.includes("rmNotice?.classList.remove('hidden');"), 'Phát bị chặn trong reduce + hiện thông báo');
ghi('S13 RM guard', khung.includes("root.dataset.mechInit === 'da-khoi-tao'") && khung.includes("root.dataset.mechInit = 'da-khoi-tao';"), 'guard chống nhân đôi listener');

// S14 — không phụ thuộc Git
ghi('S14 không git', !esc.includes('git ') && !khung.includes('git ') && !regulating.includes("execSync('git"), 'đường kiểm không gọi git');

// S15 — 5 mục chọn đều có đủ cặp data-name-vi + data-name-en (bắt mất nhãn EN)
const soPart = (esc.match(/data-part="/g) || []).length;
const soVi = (esc.match(/data-name-vi="/g) || []).length;
const soEn = (esc.match(/data-name-en="/g) || []).length;
ghi('S15 data-name', soPart === 5 && soVi === 5 && soEn === 5, `data-part=${soPart}, name-vi=${soVi}, name-en=${soEn}`);

// ====================== HÀM QUÉT DÙNG CHUNG (D5) ============================
// Dùng cho dist thật LẪN cây thử tự kiểm — đây chính là đường chạy sản phẩm:
// mutation vô hiệu hóa hàm này phải làm cả D5 thật lẫn D5 tự kiểm thất bại.
// Trả { quet, khac }: số trang EN đã quét (ngoài trang Bộ thoát) và số trang
// dính data-mechanism. Đường dẫn chuẩn hóa bằng path.relative + sep — không
// phụ thuộc dấu phân cách nền tảng.
const demTrangEnKhac = (gocQuet) => {
  let quet = 0;
  let khac = 0;
  const duyet = (thuMuc) => {
    for (const ten of readdirSync(thuMuc)) {
      const duong = join(thuMuc, ten);
      if (statSync(duong).isDirectory()) {
        duyet(duong);
        continue;
      }
      if (ten !== 'index.html') continue;
      const tuongDoi = relative(gocQuet, duong).split(sep).join('/');
      if (!tuongDoi.startsWith('en/') || tuongDoi === 'en/mechanisms/escapement/index.html') continue;
      quet++;
      if (readFileSync(duong, 'utf8').includes('data-mechanism')) khac++;
    }
  };
  duyet(gocQuet);
  return { quet, khac };
};

// ============================== TẦNG DIST ===================================
const doi = process.argv[2] === 'dist';
if (doi) {
  const distRoot = process.argv[3] || 'dist';
  const enTrang = join(distRoot, 'en/mechanisms/escapement/index.html');
  const viTrang = join(distRoot, 'co-che/bo-thoat/index.html');

  if (!existsSync(enTrang) || !existsSync(viTrang)) {
    console.error(`Không thấy dist: ${enTrang} / ${viTrang}`);
    process.exit(1);
  }
  const enHtml = doc(enTrang);
  const viHtml = doc(viTrang);

  // D1 — trang EN: cờ tắt → khung phải rút (trạng thái hiện hành giữ nguyên);
  // cờ bật (V3) → bắt buộc CÓ khối V3 và ĐÚNG khung SVG bộ thoát — không chỉ
  // "cho phép có khung".
  if (v3EnBat) {
    ghi(
      'D1 EN khung V3',
      enHtml.includes('data-mechanism') &&
        enHtml.includes('data-mech-step-id="escapement"') &&
        enHtml.includes('id="escapement-svg"') &&
        enHtml.includes('id="v3esc"'),
      'V3 bật — trang EN phải có khối V3 + đúng khung SVG bộ thoát'
    );
    // D1v (V3 bật) — trích ĐÚNG figure V3 rồi mới kiểm thẻ video BÊN TRONG:
    // webm + poster + preload="none" phải nằm trên thẻ nằm trong figure
    // id="v3esc" — preload="none" ở thẻ khác (video thuyết minh) không tính thay.
    const figV3En = enHtml.slice(enHtml.indexOf('<figure id="v3esc"'), enHtml.indexOf('</figure>', enHtml.indexOf('<figure id="v3esc"')) + 9);
    const theVideoV3En = /<video[^>]*id="v3esc-video"[^>]*>/.exec(figV3En)?.[0] || '';
    ghi(
      'D1v EN video V3',
      theVideoV3En.includes('/videos/v3-escapement/bo-thoat-chu-ky-truot.webm') &&
        theVideoV3En.includes('/videos/v3-escapement/poster.jpg') &&
        theVideoV3En.includes('preload="none"'),
      'thẻ video V3: webm + poster + preload none (đúng tag, thẻ khác không tính)'
    );
  } else {
    ghi('D1 EN không khung', !enHtml.includes('data-mechanism') && !enHtml.includes('data-enhanced="true"'), 'khung infographic rút khỏi trang EN');
  }

  // D1b — trang EN nhúng video nguyên lý EN + poster; KHÔNG tham chiếu clip VI
  // (giữ nguyên ở cả hai nhánh — V3 không thay video thuyết minh)
  ghi('D1b EN video', enHtml.includes('/videos/bo-thoat-nguyen-ly-en.mp4') && enHtml.includes('bo-thoat-nguyen-ly-en.jpg') && enHtml.includes('<video'), 'video + poster EN');
  ghi('D1c EN đúng clip', !enHtml.includes('bo-thoat-nguyen-ly-vi.mp4') && !enHtml.includes('bo-thoat-nguyen-ly-vi.jpg'), 'không tham chiếu clip VI');

  // D2 — cờ tắt: giữ nguyên kiểm cấm chuỗi khung hiện hành. Cờ bật (V3): khung
  // quay lại là chủ đích — kiểm NHÃN ĐÚNG NGÔN NGỮ, ghi chú giản lược và cấu
  // trúc cần thiết; cấm lẫn nhãn khung của ngôn ngữ kia. (Bỏ nội dung <script>
  // — hằng trong bundle không phải chữ render tĩnh.)
  const enHtmlKhongScript = enHtml.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  if (v3EnBat) {
    const enPhaiCo = [
      'Swiss lever escapement',
      'Step 1/5',
      'Five cause-and-effect steps make the tick-tock beat.',
      'This is a simplified teaching diagram. Its angles and poses explain individual steps; they are not design specifications for a particular movement.',
      'id="escapement-svg"',
      'data-mech-step-id="escapement"',
    ];
    const enThieu = enPhaiCo.filter((s) => !enHtmlKhongScript.includes(s));
    ghi('D2 EN khung đúng nhãn (V3)', enThieu.length === 0, enThieu.length ? 'thiếu: ' + enThieu.join(' | ') : 'nhãn EN + giản lược + cấu trúc đủ');
    const enLanVi = ['Bộ thoát Swiss lever (Escapement)', 'Năm bước nhân quả tạo ra nhịp tíc-tắc.', 'Sơ đồ hướng dẫn đã giản lược'].filter((s) => enHtmlKhongScript.includes(s));
    ghi('D2 EN không lẫn nhãn VI', enLanVi.length === 0, enLanVi.length ? 'lẫn: ' + enLanVi.join(' | ') : 'không lẫn nhãn VI của khung');
  } else {
    const khungEnCam = ['Step 1/5', '● TICK', 'Five cause-and-effect steps make the tick-tock beat.', 'Reduced motion is enabled. Use the step controls to explore the diagram.', 'escapement-svg', 'The part&#39;s English name and its role will appear here.'];
    const enLot = khungEnCam.filter((s) => enHtmlKhongScript.includes(s));
    ghi('D2 EN sạch khung', enLot.length === 0, enLot.length ? 'còn: ' + enLot.join(' | ') : 'không còn chuỗi khung (markup, đã loại script)');
  }

  // D3 — trang VI: cờ tắt → khung phải rút; cờ bật (V3) → bắt buộc CÓ khối V3
  // và ĐÚNG khung SVG bộ thoát.
  if (v3ViBat) {
    ghi(
      'D3 VI khung V3',
      viHtml.includes('data-mechanism') &&
        viHtml.includes('data-mech-step-id="escapement"') &&
        viHtml.includes('id="escapement-svg"') &&
        viHtml.includes('id="v3esc"'),
      'V3 bật — trang VI phải có khối V3 + đúng khung SVG bộ thoát'
    );
    // D3v (V3 bật) — trích ĐÚNG figure V3 rồi mới kiểm thẻ video BÊN TRONG
    // (như D1v — preload="none" ở thẻ khác không được tính thay).
    const figV3Vi = viHtml.slice(viHtml.indexOf('<figure id="v3esc"'), viHtml.indexOf('</figure>', viHtml.indexOf('<figure id="v3esc"')) + 9);
    const theVideoV3Vi = /<video[^>]*id="v3esc-video"[^>]*>/.exec(figV3Vi)?.[0] || '';
    ghi(
      'D3v VI video V3',
      theVideoV3Vi.includes('/videos/v3-escapement/bo-thoat-chu-ky-truot.webm') &&
        theVideoV3Vi.includes('/videos/v3-escapement/poster.jpg') &&
        theVideoV3Vi.includes('preload="none"'),
      'thẻ video V3: webm + poster + preload none (đúng tag, thẻ khác không tính)'
    );
  } else {
    ghi('D3 VI không khung', !viHtml.includes('data-mechanism') && !viHtml.includes('data-enhanced="true"'), 'khung infographic rút khỏi trang VI');
  }

  // D3b — trang VI nhúng video nguyên lý VI + poster; KHÔNG tham chiếu clip EN
  // (giữ nguyên ở cả hai nhánh)
  ghi('D3b VI video', viHtml.includes('/videos/bo-thoat-nguyen-ly-vi.mp4') && viHtml.includes('bo-thoat-nguyen-ly-vi.jpg') && viHtml.includes('<video'), 'video + poster VI');
  ghi('D3c VI đúng clip', !viHtml.includes('bo-thoat-nguyen-ly-en.mp4') && !viHtml.includes('bo-thoat-nguyen-ly-en.jpg'), 'không tham chiếu clip EN');

  // D3d — cờ tắt: giữ kiểm cấm chuỗi khung hiện hành; cờ bật (V3): nhãn đúng
  // ngôn ngữ + giản lược + cấu trúc; cấm lẫn nhãn EN.
  const viHtmlKhongScript = viHtml.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  if (v3ViBat) {
    const viPhaiCo = [
      'Bộ thoát Swiss lever (Escapement)',
      'Bước 1/5',
      'Năm bước nhân quả tạo ra nhịp tíc-tắc.',
      'Sơ đồ hướng dẫn đã giản lược. Góc quay và các tư thế dùng để giải thích từng bước, không phải thông số thiết kế của một bộ máy cụ thể.',
      'id="escapement-svg"',
      'data-mech-step-id="escapement"',
    ];
    const viThieu = viPhaiCo.filter((s) => !viHtmlKhongScript.includes(s));
    ghi('D3d VI khung đúng nhãn (V3)', viThieu.length === 0, viThieu.length ? 'thiếu: ' + viThieu.join(' | ') : 'nhãn VI + giản lược + cấu trúc đủ');
    const viLanEn = ['Swiss lever escapement', 'Five cause-and-effect steps make the tick-tock beat.', 'This is a simplified teaching diagram.'].filter((s) => viHtmlKhongScript.includes(s));
    ghi('D3d VI không lẫn nhãn EN', viLanEn.length === 0, viLanEn.length ? 'lẫn: ' + viLanEn.join(' | ') : 'không lẫn nhãn EN của khung');
  } else {
    const khungViCam = ['Bước 1/5', '● TÍC', 'Bộ thoát Swiss lever (Escapement)', 'Phát hoạt ảnh', 'Sơ đồ hướng dẫn đã giản lược', 'Đang giảm chuyển động', 'escapement-svg'];
    const viLot = khungViCam.filter((s) => viHtmlKhongScript.includes(s));
    ghi('D3d VI sạch khung', viLot.length === 0, viLot.length ? 'còn: ' + viLot.join(' | ') : 'không còn chuỗi khung (markup, đã loại script)');
  }

  // D5 — không trang EN khác có khung. Hàm quét DÙNG CHUNG (cấp module,
  // `demTrangEnKhac`) — dist thật LẪN cây thử đều đi qua đúng hàm này; mutation
  // vô hiệu hóa hàm phải làm tự kiểm thất bại (xem mutation-g06c2.cjs `ham-quet`).
  const d5That = demTrangEnKhac(distRoot);
  ghi('D5 EN khác', d5That.khac === 0, `đã quét ${d5That.quet} trang EN (ngoài Bộ thoát), ${d5That.khac} trang dính khung`);

  // Tự kiểm D5 — ba cây thử qua CÙNG hàm demTrangEnKhac:
  //   (a) cây sạch (Bộ thoát không khung, trang EN khác không khung) → khac 0
  //   (b) cây chèn khung vào trang EN khác (tổng trang khung giữ nguyên) → khac 1
  //   (c) cây không quét được trang nào → quet 0 (caller phải thấy, không "quét 0 vẫn ĐẠT lặng lẽ")
  const taoCay = (coTrangKhac, coKhung) => {
    const cay = mkdtempSync(join(tmpdir(), 'g06c2-d5-'));
    const ghiFile = (tuongDoi, noiDung) => {
      const duong = join(cay, tuongDoi);
      mkdirSync(dirname(duong), { recursive: true });
      writeFileSync(duong, noiDung);
    };
    ghiFile('en/mechanisms/escapement/index.html', '<html>không khung</html>');
    if (coTrangKhac) ghiFile('en/mechanisms/other/index.html', coKhung ? '<html><div data-mechanism></div></html>' : '<html>không khung</html>');
    return cay;
  };
  const caySach = taoCay(true, false);
  const kqSach = demTrangEnKhac(caySach);
  rmSync(caySach, { recursive: true, force: true });
  ghi('D5 tự kiểm (a) cây sạch', kqSach.quet === 1 && kqSach.khac === 0, `quét ${kqSach.quet}, dính khung ${kqSach.khac} (kỳ vọng 1/0)`);
  const cayChen = taoCay(true, true);
  const kqChen = demTrangEnKhac(cayChen);
  rmSync(cayChen, { recursive: true, force: true });
  ghi('D5 tự kiểm (b) chèn khung EN khác (tổng khung giữ nguyên)', kqChen.quet === 1 && kqChen.khac === 1, `quét ${kqChen.quet}, dính khung ${kqChen.khac} (kỳ vọng 1/1)`);
  const cayRong = taoCay(false, false);
  const kqRong = demTrangEnKhac(cayRong);
  rmSync(cayRong, { recursive: true, force: true });
  ghi('D5 tự kiểm (c) cây không có trang nào để quét', kqRong.quet === 0 && kqRong.khac === 0, `quét ${kqRong.quet}, dính khung ${kqRong.khac} (kỳ vọng 0/0)`);
  // D5 thật phải quét được trang (tránh "quét 0 trang nhưng ĐẠT lặng lẽ")
  ghi('D5 quét khác 0', d5That.quet > 0, `số trang EN quét thật = ${d5That.quet}`);

  // D6 — G04 giữ nguyên
  const g04Vi = join(distRoot, 'co-che/day-toc-banh-lac/index.html');
  const g04En = join(distRoot, 'en/mechanisms/balance-and-hairspring/index.html');
  ghi('D6 G04', existsSync(g04Vi) && !doc(g04Vi).includes('data-mechanism') && existsSync(g04En) && !doc(g04En).includes('data-mechanism'), 'hai trang G04 không render khung');

  // D7 (V3) — đối chiếu TẬP ĐƯỜNG DẪN có khung thay vì chỉ đếm tổng: năm trang
  // từ điển nền (liệt kê tường minh — thêm trang từ điển render khung mới thì
  // phải cập nhật danh sách này) + đúng các trang bộ thoát được bật cờ. So tập
  // bắt được cả trường hợp "tổng đúng nhưng khung chuyển sang trang ngoài
  // phạm vi".
  const nenTuDien = [
    'tu-dien/chronograph/index.html',
    'tu-dien/day-toc-banh-lac/index.html',
    'tu-dien/gmt/index.html',
    'tu-dien/perpetual-calendar/index.html',
    'tu-dien/tourbillon/index.html',
  ];
  const mongMuon = new Set(nenTuDien);
  if (v3ViBat) mongMuon.add('co-che/bo-thoat/index.html');
  if (v3EnBat) mongMuon.add('en/mechanisms/escapement/index.html');
  const coThat = new Set();
  const quet2 = (thuMuc) => {
    for (const ten of readdirSync(thuMuc)) {
      const duong = join(thuMuc, ten);
      if (statSync(duong).isDirectory()) quet2(duong);
      else if (ten === 'index.html' && doc(duong).includes('data-mechanism')) {
        coThat.add(relative(distRoot, duong).split(sep).join('/'));
      }
    }
  };
  quet2(distRoot);
  const thieu = [...mongMuon].filter((d) => !coThat.has(d));
  const thua = [...coThat].filter((d) => !mongMuon.has(d));
  ghi(
    'D7 tập trang khung',
    thieu.length === 0 && thua.length === 0,
    thieu.length || thua.length
      ? `thiếu: ${thieu.join(', ')}${thieu.length && thua.length ? ' | ' : ''}thừa: ${thua.join(', ')}`
      : `${coThat.size} trang đúng tập (5 từ điển nền${v3ViBat ? ' + Bộ thoát VI' : ''}${v3EnBat ? ' + Bộ thoát EN' : ''})`
  );

  // D8 — legend không chứng nhận bằng dist
  ghi('D8 legend JS', !enHtml.includes('data-part-target'), 'dist không chứa legend (kiểm legend ở trình duyệt, không dùng dist)');

  // D10 — không 3D
  ghi('D10 không 3D', !enHtml.includes('exploded3d'), 'trang EN Bộ thoát không tham chiếu chunk 3D');

  // (D9/D11 cũ — kiểm nhãn SVG render trên dist — đã bỏ cùng lượt rút
  // infographic; sự vắng mặt của escapement-svg trên hai trang được khóa ở
  // D2/D3d, nhãn trong nguồn do mục 7 checker motion tiếp tục trông giữ.)
}

// ============================== TỔNG KẾT ====================================
console.log(`\ncheck-g06-escapement-en: ${LOI.length} lỗi`);
if (LOI.length) {
  console.error(LOI.join('\n'));
  process.exit(1);
}
