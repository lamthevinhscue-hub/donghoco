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
//   G4-2 Component chương: đủ chuỗi bắt buộc 2 ngôn ngữ (chú thích AI, phạm
//        vi "không tức thì"), video nguyên lý nhúng hai ngôn ngữ, img có
//        alt + width/height. (Khối sơ đồ SVG tương tác + điều khiển đã RÚT
//        02/10/2026 — video nguyên lý thay; các kiểm điều khiển/reduced-motion
//        đi theo khối đã bỏ.)
//   G4-3 Hai bài Markdown: VI bỏ intro lặp, giữ đủ 3 nguồn FHH; hai cờ false
//        + principle_video (video nguyên lý thay infographic 02/10/2026).
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
//   G4-7 Đủ nhãn/chuỗi VI trên trang VI, EN trên trang EN; video nguyên lý
//        đúng ngôn ngữ trên mỗi trang và có trong dist; EN không rò chữ
//        tiếng Việt; ảnh tồn tại ≤150KB, img có width/height; link nội bộ
//        trong chương tồn tại trong dist.
//   (G4-8 khởi tạo tĩnh đã bỏ cùng khối điều khiển 02/10/2026.)
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
const VID_VI = 'day-toc-banh-lac-nguyen-ly-vi';
const VID_EN = 'day-toc-banh-lac-nguyen-ly-en';

// ===== Lớp nguồn — luôn chạy ==================================================
console.log('— Lớp nguồn (src/) —');

// G4-1 Nhánh tích hợp
{
  const s = read('src/components/templates/MechanismArticle.astro');
  const hasImport = s.includes("import BalanceHairspringChapter from '../history/BalanceHairspringChapter.astro';");
  const hasGate = /!hasBalanceChapter && lang === 'vi' && data\.has_infographic/.test(s);
  const hasRender = /\{hasBalanceChapter && <BalanceHairspringChapter principleVideo=\{data\.principle_video\} \/>\}/.test(s);
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
    ['không có nghĩa là đồng hồ bỏ túi thay thế con lắc tức thì', 'phạm vi không-thay-thế-tức-thì VI'],
    ['do not mean pocket watches replaced the pendulum overnight', 'phạm vi không-thay-thế-tức-thì EN'],
    ["import PrincipleVideo from '../PrincipleVideo.astro';", 'import video nguyên lý'],
    ['<PrincipleVideo lang={lang} src={principleVideo} title={s.videoTitle} />', 'render video nguyên lý'],
    ['Dây tóc và bánh lắc — nguyên lý hoạt động', 'tiêu đề video VI'],
    ['Balance and hairspring — how it works', 'tiêu đề video EN'],
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
    ok('G4-2 Component: đủ chuỗi bắt buộc (2 ngôn ngữ, video nguyên lý, nguồn)');
  } else {
    fail('G4-2 Component thiếu: ' + missing.join(', '));
  }

  if (/animation:[^;]*infinite/.test(s) || /animation-iteration-count:\s*infinite/.test(s)) {
    fail('G4-2 Component có animation CSS infinite');
  } else {
    ok('G4-2 Không có animation CSS infinite trong component');
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
  // Hai cờ false + principle_video: sơ đồ SVG tương tác (lớp 3 chương G04)
  // đã rút 02/10/2026, video nguyên lý thay.
  const viFlags =
    /has_infographic: false/.test(vi) &&
    /interactive: false/.test(vi) &&
    /^principle_video:[ \t]*"\/videos\/day-toc-banh-lac-nguyen-ly-vi\.mp4"$/m.test(vi);
  const viSources = (vi.match(/hautehorlogerie\.org\/en\/watches-and-culture\/watchmaking-knowledge\/encyclopedia\//g) ?? []).length === 3;
  const enFlags =
    /has_infographic: false/.test(en) &&
    /interactive: false/.test(en) &&
    /^principle_video:[ \t]*"\/videos\/day-toc-banh-lac-nguyen-ly-en\.mp4"$/m.test(en);
  const enSources = (en.match(/hautehorlogerie\.org\/en\/watches-and-culture\/watchmaking-knowledge\/encyclopedia\//g) ?? []).length === 3;
  const enUpdated = /updated: "2026-09-12"/.test(en);
  if (viNoIntro && viFlags && viSources && enFlags && enSources && enUpdated) {
    ok('G4-3 Markdown: VI bỏ intro lặp + giữ 3 nguồn FHH; hai bài hai cờ false + principle_video (video thay infographic 02/10), EN đủ 3 nguồn, cập nhật 12/09');
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

  // G4-4 Nới R1 check-regulating theo chính sách hiện hành: Set ngoại lệ RỖNG
  // — Bộ thoát (G06-C) và Bánh lắc (G04-B) đã rút infographic thay bằng video
  // nguyên lý cùng ngày 02/10/2026; mọi bài EN kiểm false/false; không bỏ
  // kiểm cờ.
  {
    const s = read('scripts/check-regulating-cluster.mjs');
    const setCau = s.match(/const FLAG_TRUE_FILES = new Set\(\[([\s\S]*?)\]\);/);
    const cacTep = setCau ? (setCau[1].match(/'([^']+)'/g) || []).map((x) => x.slice(1, -1)) : [];
    const setRong = cacTep.length === 0;
    const coNgoaiLe =
      setRong &&
      s.includes("flagTrue ? 'true' : 'false'") &&
      s.includes("rules.includes('infographic')") &&
      s.includes("rules.includes('interactive')");
    const escapementVanCoQuyTacSchema = s.includes("'src/content/coChe/en/escapement.md': ['category', 'difficulty', 'infographic', 'interactive']");
    if (coNgoaiLe && escapementVanCoQuyTacSchema) {
      ok('G4-4 R1 check-regulating: Set ngoại lệ rỗng — mọi bài EN false/false (Bộ thoát + Bánh lắc đã rút infographic, video nguyên lý thay)');
    } else {
      fail(`G4-4 Nới R1 sai (ngoạiLệ=${coNgoaiLe}, escapementVanCoQuyTacSchema=${escapementVanCoQuyTacSchema}, tệp=[${cacTep.join(', ')}])`);
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

    const viNeed = [CAP_VI, `${VID_VI}.mp4`, `${VID_VI}.jpg`, '1657', '1675', 'strongly contested', 'banh-lac-day-toc-hero.jpg'];
    const viMissing = viNeed.filter((n) => !vi.includes(n));
    if (viMissing.length === 0) ok('G4-7 Trang VI đủ chuỗi chương (video nguyên lý VI, chú thích AI, mốc, ảnh)');
    else fail('G4-7 Trang VI thiếu: ' + viMissing.join(', '));

    const enNeed = [
      [CAP_EN, 'chú thích AI'],
      [`${VID_EN}.mp4`, 'video nguyên lý EN'],
      [`${VID_EN}.jpg`, 'poster EN'],
      ['1657', 'mốc 1657'],
      ['1675', 'mốc 1675'],
      ['strongly contested', 'giới hạn Hooke'],
      ['banh-lac-day-toc-hero.jpg', 'ảnh hero'],
    ];
    const enMissing = enNeed.filter(([needle]) => !needle || !en.includes(needle)).map(([, ten]) => ten);
    if (enMissing.length === 0) ok('G4-7 Trang EN đủ chuỗi chương (video nguyên lý EN, chú thích AI, mốc, ảnh)');
    else fail('G4-7 Trang EN thiếu: ' + enMissing.join(', '));

    // Video nguyên lý đúng ngôn ngữ: không lẫn clip ngược chiều
    if (!vi.includes(`${VID_EN}.mp4`) && !vi.includes(`${VID_EN}.jpg`) && !en.includes(`${VID_VI}.mp4`) && !en.includes(`${VID_VI}.jpg`)) {
      ok('G4-7 Video mỗi trang đúng ngôn ngữ (không lẫn clip/poster ngược chiều)');
    } else {
      fail('G4-7 Trang lẫn clip/poster ngược ngôn ngữ');
    }

    // Video + poster đã vào dist
    for (const vid of [VID_VI, VID_EN]) {
      const mp4 = `dist/videos/${vid}.mp4`;
      if (!existsSync(mp4)) fail('G4-7 Video chưa vào dist: ' + mp4);
      else ok(`G4-7 ${mp4} có trong dist`);
    }

    // Rò VI trong vùng chương EN: cắt ĐÚNG vùng <section> chương (từ
    // data-bhc-root đến </section> gần nhất — script chương đã rút nên không
    // còn lần xuất hiện thứ hai làm mốc), bỏ HTML comment, nội dung <script>
    // và thuộc tính — chỉ kiểm VĂN BẢN hiển thị.
    const catChuong = (html) => {
      const goc = html.indexOf('data-bhc-root');
      if (goc < 0) return '';
      const cuoi = html.indexOf('</section>', goc);
      return cuoi < 0 ? '' : html.slice(goc, cuoi);
    };
    const bhcEnRaw = catChuong(en);
    const bhcEn = bhcEnRaw
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]*>/g, ' ');
    const viCharRe = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;
    if (bhcEn && !viCharRe.test(bhcEn)) ok('G4-7 Vùng chương EN không rò chữ tiếng Việt hiển thị');
    else if (!bhcEn) fail('G4-7 Không tách được vùng chương trang EN');
    else fail('G4-7 Vùng chương EN còn chữ tiếng Việt hiển thị: ' + (bhcEn.match(/[^\s]*[ăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỵ][^\s]*/i)?.[0] ?? '?'));

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

    // Link nội bộ trong vùng chương tồn tại trong dist (miễn trừ /videos/ —
    // link "Mở tệp video" trỏ mp4, tệp đã được kiểm tồn tại riêng phía trên)
    const viBhc = catChuong(vi);
    const enBhc = catChuong(en);
    const routeExists = (href) => {
      const clean = href.replace(/\/$/, '');
      return (
        existsSync(join('dist', clean, 'index.html')) || existsSync(join('dist', `${clean}.html`))
      );
    };
    const viLinks = [...viBhc.matchAll(/href="(\/(?!\/)[^"]*)"/g)].map((m) => m[1]).filter((h) => !h.startsWith('/images/') && !h.startsWith('/_astro/') && !h.startsWith('/videos/'));
    const enLinks = [...enBhc.matchAll(/href="(\/(?!\/)[^"]*)"/g)].map((m) => m[1]).filter((h) => !h.startsWith('/images/') && !h.startsWith('/_astro/') && !h.startsWith('/videos/'));
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
}

console.log('');
if (errors.length > 0) {
  console.log('CÓ ' + errors.length + ' LỖI — xem trên.');
  process.exit(1);
}
console.log('check-g04-balance-chapter: mọi kiểm tra ĐẠT.');
