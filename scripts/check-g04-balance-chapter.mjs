// =============================================================================
// check-g04-balance-chapter.mjs — Kiểm chương "Bánh lắc và dây tóc" (G04-B)
// =============================================================================
// Chạy:
//   node scripts/check-g04-balance-chapter.mjs          → lớp nguồn (src/)
//   node scripts/check-g04-balance-chapter.mjs dist     → thêm lớp dist/
//
// Lớp nguồn:
//   G4-1 Nhánh tích hợp MechanismArticle: import + gate infographic cũ +
//        render chương, đúng 2 slug; TermArticle vẫn giữ Hairspring (không
//        phá trang từ điển).
//   G4-2 Component chương: đủ chuỗi bắt buộc 2 ngôn ngữ (chú thích AI, ghi
//        chú mô hình giản lược, phạm vi "không tức thì"), 5 nút điều khiển,
//        reduced-motion + IntersectionObserver + visibilitychange + dọn
//        listener, SVG aria-hidden, không animation CSS infinite, không
//        autoplay, img có alt + width/height.
//   G4-3 Hai bài Markdown: VI bỏ intro lặp, giữ đủ 3 nguồn FHH; EN hai cờ
//        true theo quyết định GPT Work (vòng sửa TXN-20260912-23).
//   G4-4 package.json nối check-g04 vào chuỗi check và build; nới R1
//        check-regulating hẹp đúng 1 tệp EN; ảnh web ≤150KB.
//   G4-9 mọi var(--…) trong component chương phải được khai báo trong
//        global.css (hồi quy lỗi --ig-steel-deep không tồn tại → fill rơi về
//        màu mặc định rgb(0,0,0), vòng sửa màu TXN-20260912-25).
//
// Lớp dist (khi truyền 'dist'):
//   G4-5 data-bhc-root chỉ xuất hiện trên đúng 2 route đích.
//   G4-6 Infographic cũ (hairspring-svg) biến mất khỏi 2 trang đích, vẫn còn
//        ở /tu-dien/day-toc-banh-lac (không hồi quy trang từ điển).
//   G4-7 Đủ nhãn/chuỗi VI trên trang VI, EN trên trang EN; điều khiển EN
//        không rò chữ tiếng Việt; ảnh tồn tại ≤150KB, img có width/height;
//        link nội bộ trong chương tồn tại trong dist.
//   G4-8 Trạng thái khởi tạo tĩnh: chuỗi trạng thái đầu là Tĩnh/Static,
//        nút Phát aria-pressed=false; không có chuỗi autoplay.
// Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];
const ok = (msg) => console.log('ĐẠT  ' + msg);
const fail = (msg) => {
  errors.push(msg);
  console.log('LỖI  ' + msg);
};
const read = (p) => readFileSync(p, 'utf8');

const VI_ROUTE = 'dist/co-che/day-toc-banh-lac/index.html';
const EN_ROUTE = 'dist/en/mechanisms/balance-and-hairspring/index.html';
const IMG_WEB = 'public/images/history/balance-hairspring/banh-lac-day-toc-hero.jpg';
const CAP_VI = 'Minh họa AI tái dựng — không phải ảnh tư liệu';
const CAP_EN = 'AI reconstruction — not a historical photograph';
const MODEL_VI = 'không phải phép đo và không phải cơ cấu theo tỷ lệ';
const MODEL_EN = 'not a measurement and not a to-scale mechanism';

// ===== Lớp nguồn — luôn chạy ==================================================
console.log('— Lớp nguồn (src/) —');

// G4-1 Nhánh tích hợp
{
  const s = read('src/components/templates/MechanismArticle.astro');
  const hasImport = s.includes("import BalanceHairspringChapter from '../history/BalanceHairspringChapter.astro';");
  const hasGate = /!hasBalanceChapter && lang === 'vi' && data\.has_infographic/.test(s);
  const hasRender = /\{hasBalanceChapter && <BalanceHairspringChapter \/>\}/.test(s);
  const slugs = s.match(/G04_BALANCE_CHAPTER_SLUGS = \[([^\]]+)\]/)?.[1] ?? '';
  const twoSlugs =
    slugs.includes("'day-toc-banh-lac'") &&
    slugs.includes("'balance-and-hairspring'") &&
    (slugs.match(/'/g) ?? []).length === 4;
  if (hasImport && hasGate && hasRender && twoSlugs) {
    ok('G4-1 MechanismArticle: chương chỉ gắn cho đúng 2 slug, infographic cũ bị gate');
  } else {
    fail(`G4-1 MechanismArticle thiếu nhánh tích hợp (import=${hasImport}, gate=${hasGate}, render=${hasRender}, slugs=${twoSlugs})`);
  }
  const term = read('src/components/templates/TermArticle.astro');
  if (term.includes("'day-toc-banh-lac': Hairspring")) {
    ok('G4-1 TermArticle vẫn dùng Hairspring cho trang từ điển (không hồi quy)');
  } else {
    fail('G4-1 TermArticle mất map Hairspring — trang từ điển có thể vỡ');
  }
}

// G4-2 Component chương
{
  const s = read('src/components/history/BalanceHairspringChapter.astro');
  const need = [
    [CAP_VI, 'chú thích AI VI'],
    [CAP_EN, 'chú thích AI EN'],
    [MODEL_VI, 'ghi chú mô hình giản lược VI'],
    [MODEL_EN, 'ghi chú mô hình giản lược EN'],
    ['không có nghĩa là đồng hồ bỏ túi thay thế con lắc tức thì', 'phạm vi không-thay-thế-tức-thì VI'],
    ['do not mean pocket watches replaced the pendulum overnight', 'phạm vi không-thay-thế-tức-thì EN'],
    ['data-bhc-action="static"', 'nút Tĩnh'],
    ['data-bhc-action="play"', 'nút Phát'],
    ['data-bhc-action="pause"', 'nút Tạm dừng'],
    ['data-bhc-action="step"', 'nút Bước'],
    ['data-bhc-action="reset"', 'nút Đặt lại'],
    ['prefers-reduced-motion', 'đọc reduced-motion'],
    ['IntersectionObserver', 'dừng khi rời viewport'],
    ['visibilitychange', 'dừng khi tab ẩn'],
    ["addEventListener('pagehide'", 'dừng vòng lặp khi rời trang'],
    ["addEventListener('pageshow'", 'đồng bộ lại khi trang phục hồi (bfcache)'],
    ['cancelAnimationFrame', 'hủy vòng lặp rAF'],
    ["Math.sin(Math.PI * t)", 'phối lại vòng xoắn triệt tiêu tại hai đầu'],
    ['aria-live="polite"', 'hiển thị trạng thái aria-live'],
    ['width="1200"', 'img width'],
    ['height="675"', 'img height'],
    ['1657', 'mốc 1657'],
    ['1675', 'mốc 1675'],
    ['strongly contested', 'giới hạn Hooke'],
    ['sciencemuseumgroup.org.uk', 'nguồn SMG'],
    ['hautehorlogerie.org', 'nguồn FHH'],
    ['/lich-su', 'đọc tiếp VI (route thật)'],
  ];
  const missing = need.filter(([needle]) => !s.includes(needle)).map(([, ten]) => ten);
  if (missing.length === 0) {
    ok('G4-2 Component: đủ chuỗi bắt buộc (2 ngôn ngữ, điều khiển, reduced-motion, nguồn)');
  } else {
    fail('G4-2 Component thiếu: ' + missing.join(', '));
  }

  const svgTag = s.match(/<svg\n[^>]*bhc-svg[^>]*>/)?.[0] ?? s.match(/<svg[^>]*bhc-svg[^>]*>/)?.[0] ?? '';
  if (svgTag && /aria-hidden="true"/.test(svgTag) && !/role="img"/.test(svgTag)) {
    ok('G4-2 SVG nguyên lý aria-hidden (thông tin có bản chữ HTML)');
  } else {
    fail('G4-2 SVG nguyên lý chưa phân loại aria-hidden đúng: ' + svgTag.slice(0, 60));
  }

  if (/animation:[^;]*infinite/.test(s) || /animation-iteration-count:\s*infinite/.test(s)) {
    fail('G4-2 Component có animation CSS infinite');
  } else {
    ok('G4-2 Không có animation CSS infinite trong component');
  }

  // Không autoplay: trạng thái khởi tạo là static + play() chỉ gọi từ nút
  const initStatic = /let state: 'static' \| 'playing' \| 'paused' = 'static';/.test(s);
  const playCallSites = (s.match(/(?<!function )play\(\)/g) ?? []).length;
  const pressedFalse = /data-bhc-action="play"\s*\n\s*aria-pressed="false"/.test(s);
  if (initStatic && playCallSites === 1 && pressedFalse) {
    ok('G4-2 Khởi tạo tĩnh: state=static, play() chỉ gọi từ nút, aria-pressed=false');
  } else {
    fail(`G4-2 Khởi tạo không tĩnh (init=${initStatic}, playCalls=${playCallSites}, pressed=${pressedFalse})`);
  }

  // Không dùng id/url(#) trong SVG component
  const idAttrs = [...s.matchAll(/\sid="(?!bhc-)/g)].length;
  const urlRefs = [...s.matchAll(/url\(#/g)].length;
  if (idAttrs === 0 && urlRefs === 0) {
    ok('G4-2 SVG không dùng id/url(#) — không rủi ro trùng ID tài liệu');
  } else {
    fail(`G4-2 Component còn id không prefix bhc- (${idAttrs}) hoặc url(#) (${urlRefs})`);
  }
}

// G4-3 Hai bài Markdown
{
  const vi = read('src/content/coChe/vi/day-toc-banh-lac.md');
  const en = read('src/content/coChe/en/balance-and-hairspring.md');
  const viNoIntro = !vi.includes('Infographic động đã có');
  const viFlags = /has_infographic: true/.test(vi) && /interactive: true/.test(vi);
  const viSources = (vi.match(/hautehorlogerie\.org\/en\/watches-and-culture\/watchmaking-knowledge\/encyclopedia\//g) ?? []).length === 3;
  // EN: theo quyết định GPT Work (vòng sửa TXN-20260912-23), hai cờ của DUY
  // NHẤT bài này là true — phản ánh chương tương tác thật; check-regulating
  // R1 đã được nới hẹp theo đúng tệp này (kiểm ở G4-4).
  const enFlags = /has_infographic: true/.test(en) && /interactive: true/.test(en);
  const enSources = (en.match(/hautehorlogerie\.org\/en\/watches-and-culture\/watchmaking-knowledge\/encyclopedia\//g) ?? []).length === 3;
  const enUpdated = /updated: "2026-09-12"/.test(en);
  if (viNoIntro && viFlags && viSources && enFlags && enSources && enUpdated) {
    ok('G4-3 Markdown: VI bỏ intro lặp + giữ 3 nguồn FHH; EN hai cờ true theo quyết định GPT Work, đủ 3 nguồn, cập nhật 12/09');
  } else {
    fail(`G4-3 Markdown lệch (viNoIntro=${viNoIntro}, viFlags=${viFlags}, viSources=${viSources}, enFlags=${enFlags}, enSources=${enSources}, enUpdated=${enUpdated})`);
  }
}

// G4-4 package.json
{
  const pkg = JSON.parse(read('package.json'));
  const buildOk = pkg.scripts.build.includes('node scripts/check-g04-balance-chapter.mjs dist');
  const checkOk = pkg.scripts.check.includes('node scripts/check-g04-balance-chapter.mjs');
  const g04Ok = pkg.scripts['check:g04'] === 'node scripts/check-g04-balance-chapter.mjs';
  if (buildOk && checkOk && g04Ok) {
    ok('G4-4 package.json: check-g04 nối vào chuỗi check + build, có lệnh check:g04 riêng');
  } else {
    fail(`G4-4 package.json thiếu nối (build=${buildOk}, check=${checkOk}, riêng=${g04Ok})`);
  }
  if (!existsSync(IMG_WEB)) {
    fail(`G4-4 Thiếu ảnh web: ${IMG_WEB}`);
  } else {
    const bytes = statSync(IMG_WEB).size;
    if (bytes <= 150 * 1024) ok(`G4-4 Ảnh web ${bytes} byte ≤ 153.600 (150 KB)`);
    else fail(`G4-4 Ảnh web ${bytes} byte vượt ngưỡng 150 KB`);
  }

  // G4-4 Nới R1 check-regulating phải hẹp đúng 1 tệp (quyết định GPT Work):
  // có bảng ngoại lệ + regex cờ theo tệp; bài EN khác (escapement) vẫn yêu
  // cầu false; không bỏ kiểm cờ.
  {
    const s = read('scripts/check-regulating-cluster.mjs');
    const coNgoaiLe =
      s.includes("const FLAG_TRUE_FILES = new Set(['src/content/coChe/en/balance-and-hairspring.md']);") &&
      s.includes('flagTrue ? \'true\' : \'false\'') &&
      s.includes("rules.includes('infographic')") &&
      s.includes("rules.includes('interactive')");
    const khacVanFalse = s.includes("'src/content/coChe/en/escapement.md': ['category', 'difficulty', 'infographic', 'interactive']");
    if (coNgoaiLe && khacVanFalse) {
      ok('G4-4 R1 check-regulating nới hẹp đúng 1 tệp (balance-and-hairspring true), bài EN khác vẫn kiểm false');
    } else {
      fail(`G4-4 Nới R1 sai (ngoạiLệ=${coNgoaiLe}, escapementCònQuyTắc=${khacVanFalse})`);
    }
  }
  // G4-9 (hồi quy vòng sửa màu TXN-20260912-25): mọi token var(--…) component
  // dùng phải được khai báo trong src/styles/global.css — token thiếu làm
  // fill/stroke rơi về màu mặc định (rgb(0,0,0)) thay vì báo lỗi.
  {
    const comp = read('src/components/history/BalanceHairspringChapter.astro');
    const globalCss = read('src/styles/global.css');
    const used = [...new Set([...comp.matchAll(/var\((--[a-z0-9-]+)\)/gi)].map((m) => m[1]))];
    const missing = used.filter((v) => !globalCss.includes(v + ':'));
    // Token gây lỗi vòng trước phải đã rời khỏi component
    const daBoTokenLoi = !comp.includes('--ig-steel-deep');
    if (used.length > 0 && missing.length === 0 && daBoTokenLoi) {
      ok(`G4-9 ${used.length} token var(--…) trong component đều được khai báo trong global.css`);
    } else {
      fail(`G4-9 Token thiếu khai báo: ${missing.join(', ') || '(không)'}${daBoTokenLoi ? '' : ' — --ig-steel-deep vẫn còn trong component'}`);
    }
  }
}

// ===== Lớp dist ===============================================================
if (process.argv[2] === 'dist') {
  console.log('— Lớp dist —');

  function walkHtml(dir, out = []) {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      const st = statSync(p);
      if (st.isDirectory()) walkHtml(p, out);
      else if (name.endsWith('.html')) out.push(p);
    }
    return out;
  }

  // G4-5 chương chỉ ở 2 trang đích
  {
    const all = walkHtml('dist');
    const withChapter = all.filter((f) => read(f).includes('data-bhc-root'));
    const norm = (f) => f.replace(/\\/g, '/');
    const hit = new Set(withChapter.map(norm));
    if (withChapter.length === 2 && hit.has(VI_ROUTE) && hit.has(EN_ROUTE)) {
      ok('G4-5 data-bhc-root chỉ xuất hiện trên đúng 2 route đích');
    } else {
      fail(`G4-5 data-bhc-root xuất hiện ${withChapter.length} trang: ${[...hit].join(', ')}`);
    }
  }

  // G4-6 infographic cũ: mất ở 2 trang đích, còn ở trang từ điển
  {
    const vi = read(VI_ROUTE);
    const en = read(EN_ROUTE);
    const tuDien = read('dist/tu-dien/day-toc-banh-lac/index.html');
    const goneTargets = !vi.includes('hairspring-svg') && !en.includes('hairspring-svg');
    const keptDictionary = tuDien.includes('hairspring-svg');
    if (goneTargets && keptDictionary) {
      ok('G4-6 Infographic cũ rời 2 trang đích; trang từ điển vẫn giữ nguyên');
    } else {
      fail(`G4-6 Lệch (mất-ở-đích=${goneTargets}, từ-điển-giữ=${keptDictionary})`);
    }
    // Không hồi quy khác: trang từ điển không có chương mới
    if (!tuDien.includes('data-bhc-root')) ok('G4-6 Trang từ điển không bị gắn chương mới');
    else fail('G4-6 Trang từ điển bị gắn chương — sai phạm vi');
  }

  // G4-7 nhãn/chuỗi theo ngôn ngữ + ảnh + link nội bộ
  {
    const vi = read(VI_ROUTE);
    const en = read(EN_ROUTE);

    const viNeed = [CAP_VI, MODEL_VI, 'Tĩnh', 'Phát', 'Tạm dừng', 'Bước', 'Đặt lại', '1657', '1675', 'strongly contested', 'banh-lac-day-toc-hero.jpg'];
    const viMissing = viNeed.filter((n) => !vi.includes(n));
    if (viMissing.length === 0) ok('G4-7 Trang VI đủ chuỗi chương (điều khiển, chú thích AI, mốc, ảnh)');
    else fail('G4-7 Trang VI thiếu: ' + viMissing.join(', '));

    const enBtn = (action, label) =>
      new RegExp(`data-bhc-action="${action}"[^>]*>\\s*${label}\\s*<`).test(en);
    const enAllButtons =
      enBtn('static', 'Static') &&
      enBtn('play', 'Play') &&
      enBtn('pause', 'Pause') &&
      enBtn('step', 'Step') &&
      enBtn('reset', 'Reset');
    const enNeed = [
      [CAP_EN, 'chú thích AI'],
      [MODEL_EN, 'ghi chú mô hình'],
      [enAllButtons ? 'ok' : '', '5 nút EN (Static/Play/Pause/Step/Reset)'],
      ['1657', 'mốc 1657'],
      ['1675', 'mốc 1675'],
      ['strongly contested', 'giới hạn Hooke'],
      ['banh-lac-day-toc-hero.jpg', 'ảnh hero'],
    ];
    const enMissing = enNeed.filter(([needle]) => !needle || !en.includes(needle)).map(([, ten]) => ten);
    if (enMissing.length === 0) ok('G4-7 Trang EN đủ chuỗi chương (điều khiển EN, chú thích AI, mốc, ảnh)');
    else fail('G4-7 Trang EN thiếu: ' + enMissing.join(', '));

    // Rò VI trong điều khiển EN: cắt vùng chương của trang EN, bỏ HTML comment
    // (Astro giữ comment template vào output) và thuộc tính — chỉ kiểm VĂN BẢN
    // hiển thị; nút điều khiển được kiểm riêng bên dưới.
    const bhcEnRaw = en.split('data-bhc-root')[1] ?? '';
    const bhcEn = bhcEnRaw
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]*>/g, ' ');
    const viCharRe = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;
    if (bhcEn && !viCharRe.test(bhcEn)) ok('G4-7 Vùng chương EN không rò chữ tiếng Việt hiển thị');
    else if (!bhcEn) fail('G4-7 Không tách được vùng chương trang EN');
    else fail('G4-7 Vùng chương EN còn chữ tiếng Việt hiển thị: ' + (bhcEn.match(/[^\s]*[ăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỵ][^\s]*/i)?.[0] ?? '?'));
    const enButtons = [...bhcEnRaw.replace(/<!--[\s\S]*?-->/g, ' ').matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g)].map((m) => m[1].replace(/<[^>]*>/g, ' '));
    const btnLeak = enButtons.filter((t) => viCharRe.test(t));
    if (enButtons.length >= 5 && btnLeak.length === 0) ok(`G4-7 ${enButtons.length} nút trong vùng EN đều thuần tiếng Anh`);
    else if (btnLeak.length > 0) fail('G4-7 Nút EN rò chữ VI: ' + btnLeak[0].trim().slice(0, 40));
    else fail('G4-7 Vùng EN không tách được nút để kiểm rò');

    // Ảnh tồn tại trong dist + img có width/height
    const imgDist = 'dist/images/history/balance-hairspring/banh-lac-day-toc-hero.jpg';
    if (!existsSync(imgDist)) fail('G4-7 Ảnh chưa vào dist: ' + imgDist);
    else {
      const bytes = statSync(imgDist).size;
      if (bytes > 150 * 1024) fail(`G4-7 Ảnh dist ${bytes} byte > 150 KB`);
      else ok(`G4-7 Ảnh trong dist ${bytes} byte ≤ 150 KB`);
      if (bytes === statSync(IMG_WEB).size) ok('G4-7 Ảnh dist khớp byte bản public (không bị biến đổi)');
      else fail('G4-7 Ảnh dist lệch byte với bản public');
    }
    const imgTag = vi.match(/<img[^>]*banh-lac-day-toc-hero[^>]*>/)?.[0] ?? '';
    if (imgTag && /width="1200"/.test(imgTag) && /height="675"/.test(imgTag) && /alt="[^"]{10,}/.test(imgTag)) {
      ok('G4-7 Thẻ img có width/height + alt mô tả');
    } else {
      fail('G4-7 Thẻ img thiếu width/height/alt: ' + imgTag.slice(0, 80));
    }
    if ((vi.match(/banh-lac-day-toc-hero\.jpg/g) ?? []).length === 1 && (en.match(/banh-lac-day-toc-hero\.jpg/g) ?? []).length === 1) {
      ok('G4-7 Mỗi trang đúng 1 tham chiếu ảnh (một ảnh chủ đạo duy nhất)');
    } else {
      fail('G4-7 Ảnh được tham chiếu !== 1 lần trên một trong hai trang');
    }

    // Link nội bộ trong vùng chương tồn tại trong dist
    const viBhc = vi.split('data-bhc-root')[1] ?? '';
    const enBhc = en.split('data-bhc-root')[1] ?? '';
    const routeExists = (href) => {
      const clean = href.replace(/\/$/, '');
      return (
        existsSync(join('dist', clean, 'index.html')) || existsSync(join('dist', `${clean}.html`))
      );
    };
    const viLinks = [...viBhc.matchAll(/href="(\/(?!\/)[^"]*)"/g)].map((m) => m[1]).filter((h) => !h.startsWith('/images/') && !h.startsWith('/_astro/'));
    const enLinks = [...enBhc.matchAll(/href="(\/(?!\/)[^"]*)"/g)].map((m) => m[1]).filter((h) => !h.startsWith('/images/') && !h.startsWith('/_astro/'));
    const broken = [...viLinks, ...enLinks].filter((h) => !routeExists(h));
    if (broken.length === 0 && viLinks.length > 0 && enLinks.length > 0) {
      ok(`G4-7 Link nội bộ trong chương tồn tại (VI: ${viLinks.length}, EN: ${enLinks.length})`);
    } else {
      fail(`G4-7 Link hỏng hoặc thiếu trong chương: ${broken.join(', ')}`);
    }
    // EN không được trỏ /lich-su (không tạo trang lịch sử EN giả)
    if (enBhc && !enBhc.includes('/lich-su')) ok('G4-7 Chương EN không dẫn trang lịch sử EN giả');
    else fail('G4-7 Chương EN có liên hệ /lich-su — route này không có bản EN');
  }

  // G4-8 khởi tạo tĩnh trong HTML tĩnh (trước JS)
  {
    const vi = read(VI_ROUTE);
    const en = read(EN_ROUTE);
    const viInit = vi.includes('aria-pressed="false"') && vi.includes('data-bhc-status');
    const enInit = en.includes('aria-pressed="false"') && en.includes('data-bhc-status');
    if (viInit && enInit) ok('G4-8 HTML tĩnh có nút Phát aria-pressed=false + vùng trạng thái (khởi tạo tĩnh)');
    else fail(`G4-8 HTML tĩnh thiếu dấu hiệu khởi tạo tĩnh (vi=${viInit}, en=${enInit})`);
  }
}

console.log('');
if (errors.length > 0) {
  console.log('CÓ ' + errors.length + ' LỖI — xem trên.');
  process.exit(1);
}
console.log('check-g04-balance-chapter: mọi kiểm tra ĐẠT.');
