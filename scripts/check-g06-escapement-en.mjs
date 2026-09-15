#!/usr/bin/env node
// =============================================================================
// check-g06-escapement-en.mjs — kiểm chống hồi quy G06-C chặng 2
// Tích hợp infographic Bộ thoát song ngữ (TXN-20260915-8)
// =============================================================================
// Nền: aaea528. Chuỗi câu chữ + mã GK chuẩn theo
// output/g06-escapement-en-audit/bang-cong-noi-dung.md (vòng sửa 3).
//
// Tầng NGUỒN (S1…S15 — luôn chạy):
//   S1  GK-1  label hai ngôn ngữ trong Escapement.astro
//   S2  GK-2  desc khung hai ngôn ngữ
//   S3  GK-3…7  stepsEn nguyên văn chốt (t/e/d ×5; GK-3e = "Towards the centre")
//   S4  steps VI nguyên văn chốt (GK-3/4d/5/5d/6d/7d)
//   S5  GK-16a/16b nhãn giới hạn hai ngôn ngữ (hiển thị dưới khung)
//   S6  GK-9/9d aria-label + desc SVG hai ngôn ngữ
//   S7  GK-11a…e PART_INFO role VI chốt + roleEn; cấm chuỗi cũ không căn cứ
//   S8  GK-15  EN không lộ tên VI: panel/tooltip rẽ nhánh theo lang; legend
//              (MechanismAnimation) nhãn EN-only theo data-lang
//   S8b GK-13  nhãn khung hai ngôn ngữ (markup + JS setPlaying/counter) + thông
//              báo reduced-motion VI/EN nguyên văn
//   S9  Gate MechanismArticle: ngoại lệ EN duy nhất slug 'escapement' (2 cờ);
//              truyền lang cho Infographic; nhánh G04 giữ nguyên
//   S10 frontmatter en/escapement.md: hai cờ true + draft false + custom_slug
//   S11 check-regulating-cluster.mjs: FLAG_TRUE_FILES đúng 2 tệp (G04 + escapement)
//   S12 package.json: check:g06c + nối check/build
//   S13 RM tương tác trong MechanismAnimation: matchMedia + canRun + chặn Phát
//              + guard chống nhân đôi listener
//   S14 không phụ thuộc lịch sử Git (không lệnh git/spawn trong đường kiểm)
//
// Tầng DIST (D1…D10 — chạy khi truyền "dist" hoặc "dist <dir>"):
//   D1  /en/mechanisms/escapement/ có khung enhanced + data-lang="en" + cờ RM
//   D2  chuỗi EN tĩnh đúng bản duyệt (label/bước/aria/ghi chú/thông báo RM)
//   D3  KHÔNG chuỗi hiển thị VI lọt trang EN (quét HTML tĩnh — không quét bundle
//       JS dùng chung hai ngôn ngữ)
//   D4  /co-che/bo-thoat/ giữ khung VI nguyên trạng + ghi chú VI
//   D5  không trang EN nào khác có data-mechanism
//   D6  G04 giữ nguyên: /co-che/day-toc-banh-lac/ và
//       /en/mechanisms/balance-and-hairspring/ KHÔNG data-mechanism
//   D7  tổng trang render khung = 23 (17 co-che + 5 tu-dien + 1 EN Bộ thoát)
//   D8  legend KHÔNG được chứng nhận bằng dist (dist không có data-part-target —
//       legend sinh bằng JS; tiêu chí legend thuộc tầng trình duyệt)
//   D9  beat tĩnh EN "● TICK" / VI "● TÍC"
//   D10 trang EN Bộ thoát không tham chiếu chunk 3D (exploded3d)
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
const regulatingPath = 'scripts/check-regulating-cluster.mjs';

const esc = doc(escPath);
const khung = doc(khungPath);
const article = doc(articlePath);
const baiEn = doc(baiEnPath);
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

// S10 — frontmatter EN
ghi('S10 cờ', /^has_infographic:[ \t]*true$/m.test(baiEn) && /^interactive:[ \t]*true$/m.test(baiEn) && /^draft:[ \t]*false$/m.test(baiEn) && /^custom_slug:[ \t]*"escapement"$/m.test(baiEn), 'escapement.md hai cờ + draft + slug');

// S11 — ngoại lệ cờ: một Set, đúng 2 tệp (Bánh lắc G04 + Bộ thoát G06-C)
const flagCau = regulating.match(/const FLAG_TRUE_FILES = new Set\(\[([\s\S]*?)\]\);/);
const flagFiles = flagCau ? (flagCau[1].match(/'([^']+)'/g) || []).map((s) => s.slice(1, -1)) : [];
ghi(
  'S11 regulating',
  flagFiles.length === 2 && flagFiles.includes('src/content/coChe/en/balance-and-hairspring.md') && flagFiles.includes('src/content/coChe/en/escapement.md') && regulating.includes('const flagTrue = FLAG_TRUE_FILES.has(f);') && !regulating.includes('FLAG_TRUE_FILES_G06C'),
  `Set ngoại lệ = [${flagFiles.join(', ')}]`
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

  // D1
  ghi('D1 khung EN', enHtml.includes('data-mechanism') && enHtml.includes('data-enhanced="true"') && enHtml.includes('data-lang="en"') && enHtml.includes('data-reduce-interactive="true"'), 'khung enhanced EN + lang + RM');
  ghi('D4 khung VI', viHtml.includes('data-mechanism') && viHtml.includes('data-enhanced="true"') && viHtml.includes('data-lang="vi"') && viHtml.includes('data-reduce-interactive="true"'), 'khung VI giữ cờ RM');

  // D2 — chuỗi EN tĩnh
  const enCan = ['Swiss lever escapement', 'Five cause-and-effect steps make the tick-tock beat.', 'The balance moves towards the centre', 'In this model, the balance moves from the left towards the central position.', 'This is a simplified teaching diagram.', 'FHH identifies the escape wheel, lever and roller as the three parts of the escapement.', 'Step-by-step diagram of a Swiss lever escapement', 'Reduced motion is enabled. Use the step controls to explore the diagram.', 'Step 1/5', 'The part&#39;s English name and its role will appear here.', '● TICK'];
  enCan.forEach((s) => ghi(`D2 EN tĩnh`, enHtml.includes(s), s.slice(0, 50)));

  // D3 — KHÔNG chuỗi hiển thị VI (markup server-render; bỏ nội dung <script> —
  // script inline dùng chung hai ngôn ngữ chứa hằng hiển thị của cả hai nhánh
  // lang, tương tự bundle JS dùng chung, không phải chữ hiển thị tĩnh)
  const viCam = ['Bộ thoát Swiss lever (Escapement)', 'Bước trước', 'Phát hoạt ảnh', 'Bước tiếp theo', 'Đặt lại về bước đầu', 'Bước 1/5', 'Bấm Phát để xem chu trình từng bước', 'Tên tiếng Việt, tiếng Anh và vai trò', '>Bộ phận<', 'Bánh lắc chuyển động về phía giữa', 'quay một nhịp nhỏ', 'rời vị trí bị khóa', 'Sơ đồ hướng dẫn đã giản lược', 'Theo FHH, bộ thoát gồm bánh thoát', 'Đang giảm chuyển động', '● TÍC'];
  const enHtmlKhongScript = enHtml.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  const viLot = viCam.filter((s) => enHtmlKhongScript.includes(s));
  ghi('D3 không rò VI', viLot.length === 0, viLot.length ? 'lọt: ' + viLot.join(' | ') : 'sạch chuỗi hiển thị VI (markup, đã loại script)');

  // D4b — VI giữ chuỗi VI
  const viCan = ['Bộ thoát Swiss lever (Escapement)', 'Bước 1/5', 'Bánh lắc chuyển động về phía giữa', 'Sơ đồ hướng dẫn đã giản lược', 'Theo FHH, bộ thoát gồm bánh thoát, ngựa và roller', 'Đang giảm chuyển động', '● TÍC'];
  viCan.forEach((s) => ghi(`D4 VI tĩnh`, viHtml.includes(s), s.slice(0, 44)));

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

  // D7 — tổng 23 trang
  let tong = 0;
  const quet2 = (thuMuc) => {
    for (const ten of readdirSync(thuMuc)) {
      const duong = join(thuMuc, ten);
      if (statSync(duong).isDirectory()) quet2(duong);
      else if (ten === 'index.html' && doc(duong).includes('data-mechanism')) tong++;
    }
  };
  quet2(distRoot);
  ghi('D7 tổng 23', tong === 23, `${tong} trang render khung (17+5+1)`);

  // D8 — legend không chứng nhận bằng dist
  ghi('D8 legend JS', !enHtml.includes('data-part-target'), 'dist không chứa legend (kiểm legend ở trình duyệt, không dùng dist)');

  // D9 — beat VI tĩnh đã ở D2/D4; đích svg aria
  ghi('D9 aria EN tĩnh', enHtml.includes('aria-label="Step-by-step diagram'), 'aria SVG EN server-render');

  // D10 — không 3D
  ghi('D10 không 3D', !enHtml.includes('exploded3d'), 'trang EN Bộ thoát không tham chiếu chunk 3D');

  // D11 — SVG Bộ thoát trên dist VI lẫn EN: role="img", KHÔNG aria-hidden="true",
  // nhãn không rỗng và ĐÚNG NGÔN NGỮ (bằng chứng render thật cho nhãn động
  // `aria-label={svgAria}` mà mục 7 checker motion không thể chứng minh từ nguồn)
  const svgTag = (html) => (html.match(/<svg\b[^>]*id="escapement-svg"[^>]*>/g) || [])[0] ?? '';
  const tagEn = svgTag(enHtml);
  const tagVi = svgTag(viHtml);
  const nhanEn = (tagEn.match(/aria-label="([^"]*)"/) || [])[1] ?? '';
  const nhanVi = (tagVi.match(/aria-label="([^"]*)"/) || [])[1] ?? '';
  ghi('D11 EN role/hidden', tagEn.includes('role="img"') && !tagEn.includes('aria-hidden="true"'), 'role=img, không aria-hidden');
  ghi('D11 EN nhãn', nhanEn.startsWith('Step-by-step diagram of a Swiss lever escapement'), `length=${nhanEn.length}`);
  ghi('D11 VI role/hidden', tagVi.includes('role="img"') && !tagVi.includes('aria-hidden="true"'), 'role=img, không aria-hidden');
  ghi('D11 VI nhãn', nhanVi.startsWith('Sơ đồ hướng dẫn bộ thoát Swiss lever'), `length=${nhanVi.length}`);
  ghi('D11 đúng ngôn ngữ', nhanEn !== '' && nhanVi !== '' && nhanEn !== nhanVi && !/^Sơ đồ/.test(nhanEn) && !/^Step-by-step/.test(nhanVi), 'nhãn mỗi trang đúng ngôn ngữ, không hoán đổi');
}

// ============================== TỔNG KẾT ====================================
console.log(`\ncheck-g06-escapement-en: ${LOI.length} lỗi`);
if (LOI.length) {
  console.error(LOI.join('\n'));
  process.exit(1);
}
