// =============================================================================
// check-b7-myth-articles.mjs — B7 (TXN-20261011-14): hồi quy ba bài "Hiểu đúng"
// =============================================================================
// Dùng:
//   node scripts/check-b7-myth-articles.mjs          — chế độ NGUỒN
//   node scripts/check-b7-myth-articles.mjs dist     — chế độ NGUỒN + DIST
// Nguồn: đúng 6 tệp, tag/draft, 3 cặp route, URL nguồn CHÍNH XÁC trong mảng
// sources frontmatter (không tính ghi chú/thân bài), giới hạn claim có mặt cả
// VI/EN, liên kết nội bộ có đích, không emoji. Dist: hai hub đúng tập 3 thẻ mỗi
// ngôn ngữ + không nhãn trống; sáu trang có H1/canonical/hreflang/switcher; nội
// dung và khối nguồn soi đúng <article> (thiếu article/khối nguồn fail cứng).
// Exit 1 nếu có lỗi.
// =============================================================================
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const cheDoDist = process.argv[2] === 'dist';
const errors = [];
const dat = (ten, ok, moTa) => {
  console.log(`${ok ? 'ĐẠT' : 'KHÔNG ĐẠT'} ${ten}${moTa ? ' — ' + moTa : ''}`);
  if (!ok) errors.push(ten);
};
const doc = (d) => readFileSync(d, 'utf8');
const fm = (t) => t.split(/^---\r?\n/m)[1] ?? '';
const than = (t) => {
  const m = t.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return t.slice(m ? m[0].length : 0);
};
const mangNguonFm = (frontmatterText) => {
  const urls = [];
  let trong = false;
  for (const dong of frontmatterText.split('\n')) {
    if (/^sources:\s*$/.test(dong)) { trong = true; continue; }
    if (trong && /^[A-Za-z_]/.test(dong)) trong = false;
    if (trong) {
      const m = dong.match(/^\s+url:\s*"([^"]+)"/);
      if (m) urls.push(m[1]);
    }
  }
  return urls;
};
const EMOJI = /[\u2705\u26A0\uFE0F\u274C\u{1F4A1}]/u;

const BAI = [
  { slugVi: 'chan-kinh-nhieu-co-tot-hon', slugEn: 'are-more-jewels-better', routeVi: '/huong-dan/chan-kinh-nhieu-co-tot-hon', routeEn: '/en/guides/are-more-jewels-better/',
    canCuVi: ['ổ đỡ, đá chặn và đá ngựa', 'giảm ma sát giữa kim loại và đá', 'không phải mọi chân kính trong mọi bộ máy đều có cùng cấu tạo giữ dầu'],
    canCuEn: ['bearing', 'reduce friction between metal and stone', 'not every jewel in every movement shares the same oil-holding construction'],
    urls: ['https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/stone', 'https://www.incabloc.ch/en/stones-sapphires/', 'https://www.incabloc.ch/en/shock-absorbers/'],
    camVi: ['15 đến 21', '15–21', 'đá dư', 'encyclopedia/jewels'],
    camEn: ['15 to 21', '15–21', 'extra stones', 'encyclopedia/jewels'],
    camNguCanhVi: [], camNguCanhEn: [] },
  { slugVi: 'dong-ho-co-can-deo-moi-ngay', slugEn: 'do-mechanical-watches-need-daily-wear', routeVi: '/huong-dan/dong-ho-co-can-deo-moi-ngay', routeEn: '/en/guides/do-mechanical-watches-need-daily-wear/',
    canCuVi: ['khoảng 45 giờ', 'đeo 12 giờ mỗi ngày trong 3 đến 5 ngày liên tiếp', 'khác nhau theo bộ máy', 'theo hướng dẫn của hãng'],
    canCuMoVi: ['mẫu có cơ chế lên dây tay'],
    canCuEn: ['about 45 hours', '12 hours a day for 3 to 5 consecutive days', 'differ by movement', 'as the maker instructs'],
    canCuMoEn: ['models with a hand-winding mechanism'],
    urls: ['https://www.omegawatches.com/en-us/customer-service/faq/using-your-omega-watch', 'https://www.seikowatches.com/instructions/html/SEIKO_8R46_8R48_EN/WMVESYwdvkxzuv', 'https://www.seikowatches.com/instructions/html/SEIKO_5R65_5R66_EN/index'],
    camVi: ['tránh khung giờ quanh nửa đêm', 'lên dây vài vòng'], camEn: ['between 9 pm and 1 am', 'wind it a few turns'] },
  { slugVi: 'nam-cham-lam-dong-ho-chay-sai', slugEn: 'can-magnets-affect-watch-accuracy', routeVi: '/huong-dan/nam-cham-lam-dong-ho-chay-sai', routeEn: '/en/guides/can-magnets-affect-watch-accuracy/',
    canCuVi: ['METAS-N001 nêu ngưỡng **1,5 tesla (15.000 gauss)**', '8 phép thử trong 10 ngày', 'lệch dưới 10 giây mỗi ngày sau khi tiếp xúc 2.250 gauss', 'chưa đủ để kết luận mọi điện thoại'],
    canCuEn: ['METAS-N001 requirement document states a threshold of **1.5 tesla (15,000 gauss)**', '8 tests over 10 days', 'less than 10 seconds per day after exposure to 2,250 gauss', 'not enough to conclude that every phone'],
    urls: ['https://www.oris.ch/en-US/worldoforis/movements/calibre-400', 'https://www.metas.admin.ch/en/watch-certification', 'https://www.omegawatches.com/en-us/world-of-omega/watchmaking/the-master-chronometer-certification'],
    camVi: ['chống từ tuyệt đối', 'Master Co-Axial'], camEn: ['completely immune to magnetism', 'Master Co-Axial'] },
];

// ===== NGUỒN =====
const routesTxt = doc('src/i18n/contentRoutes.ts');
for (const b of BAI) {
  const tepVi = join('src/content/huongDan/vi', b.slugVi + '.md');
  const tepEn = join('src/content/huongDan/en', b.slugEn + '.md');
  if (!existsSync(tepVi) || !existsSync(tepEn)) {
    dat(`B7 nguồn ${b.slugVi}`, false, 'thiếu tệp VI hoặc EN');
    continue;
  }
  const vi = doc(tepVi);
  const en = doc(tepEn);
  const fVi = fm(vi);
  const fEn = fm(en);
  const nguonVi = mangNguonFm(fVi);
  const nguonEn = mangNguonFm(fEn);
  const thieuNguonVi = b.urls.filter((u) => !nguonVi.includes(u));
  const thieuNguonEn = b.urls.filter((u) => !nguonEn.includes(u));
  // cấm chuỗi có NGỮ CẢNH: câu bác bỏ định kiến (thay vì coi / rather than /
  // không phải) được phép nêu cụm cấm dưới dạng phủ định
  const camCoNguCanh = (van, cum) => van.split('\n').some((d) => d.includes(cum) && !/thay vì coi|rather than/i.test(d));
  const thanVi = than(vi);
  const thanEn = than(en);
  const thieuCanCuVi = b.canCuVi.filter((c) => !thanVi.includes(c));
  const thieuCanCuEn = b.canCuEn.filter((c) => !thanEn.includes(c));
  // căn cứ vùng mở: giới hạn quan trọng phải nằm ngay phần mở bài (từ
  // 'Câu trả lời ngắn' tới heading kế tiếp) — không chỉ ở đâu đó trong bài
  const vungMo = (than) => {
    const d = than.split('\n');
    let tu = -1;
    for (let i = 0; i < d.length; i++) if (d[i].includes('Câu trả lời ngắn') || d[i].includes('The short answer')) { tu = i; break; }
    if (tu === -1) return '';
    let den = d.length;
    for (let i = tu + 1; i < d.length; i++) if (d[i].startsWith('## ')) { den = i; break; }
    return d.slice(tu, den).join('\n');
  };
  const moVi = vungMo(thanVi);
  const moEn = vungMo(thanEn);
  const thieuMoVi = (b.canCuMoVi ?? []).filter((c) => !moVi.includes(c));
  const thieuMoEn = (b.canCuMoEn ?? []).filter((c) => !moEn.includes(c));
  const camHitVi = b.camVi.filter((c) => camCoNguCanh(thanVi, c));
  const camHitEn = b.camEn.filter((c) => camCoNguCanh(thanEn, c));
  const okVi = fVi.includes('tags: ["hieu-dung"]') && !fVi.includes('draft: true') && fVi.includes('difficulty: "người mới"') &&
    thieuCanCuVi.length === 0 && camHitVi.length === 0 && thieuMoVi.length === 0 &&
    thieuNguonVi.length === 0 && !EMOJI.test(vi);
  const okEn = fEn.includes('tags: ["hieu-dung"]') && !fEn.includes('draft: true') && fEn.includes('difficulty: "người mới"') &&
    thieuCanCuEn.length === 0 && camHitEn.length === 0 && thieuMoEn.length === 0 &&
    thieuNguonEn.length === 0 && !EMOJI.test(en);
  const capRoute = routesTxt.includes(`vi: '${b.routeVi}', en: '${b.routeEn}'`);
  dat(
    `B7 nguồn ${b.slugVi} (VI)`,
    okVi,
    thieuNguonVi.length ? 'thiếu URL nguồn trong mảng sources: ' + thieuNguonVi.join(' | ') : thieuCanCuVi.length ? 'thiếu căn cứ thân bài: ' + thieuCanCuVi.join(' | ') : camHitVi.length ? 'claim cấm: ' + camHitVi.join(' | ') : 'tag/draft/căn cứ/cấm/nguồn đúng'
  );
  dat(
    `B7 nguồn ${b.slugEn} (EN)`,
    okEn,
    thieuNguonEn.length ? 'thiếu URL nguồn trong mảng sources: ' + thieuNguonEn.join(' | ') : thieuCanCuEn.length ? 'thiếu căn cứ thân bài: ' + thieuCanCuEn.join(' | ') : camHitEn.length ? 'claim cấm: ' + camHitEn.join(' | ') : 'tag/draft/căn cứ/cấm/nguồn đúng'
  );
  dat(
    `B7 cặp route ${b.slugVi}`,
    capRoute,
    `${b.routeVi} ↔ ${b.routeEn}`
  );
  // liên kết nội bộ: đúng ngôn ngữ + đích phải là route đã đăng ký trong sổ
  // contentRoutes (so khớp có/không gạch cuối) — trang động không có tệp pages
  const saiLienKet = [];
  for (const tep of [tepVi, tepEn]) {
    const laEn = tep.split('\\').join('/').includes('/en/');
    const t = doc(tep);
    for (const m of t.matchAll(/\]\((\/[^)#]+)\)/g)) {
      const href = m[1];
      if (laEn && href.startsWith('/') && !href.startsWith('/en/')) { saiLienKet.push(`${tep}: ${href}`); continue; }
      if (!laEn && href.startsWith('/en/')) { saiLienKet.push(`${tep}: ${href}`); continue; }
      const goc = href.replace(/\/$/, '');
      const dangKy = routesTxt.includes(`'${goc}'`) || routesTxt.includes(`'${goc}/'`);
      if (!dangKy) saiLienKet.push(`${tep}: đích không trong sổ route ${href}`);
    }
  }
  dat(`B7 liên kết nội bộ ${b.slugVi}`, saiLienKet.length === 0, saiLienKet.length ? saiLienKet.slice(0, 3).join(' | ') : 'liên kết đúng ngôn ngữ, đích tồn tại');
}

// ===== DIST =====
if (cheDoDist) {
  const distDoc = (r) => {
    const d = join('dist', r, 'index.html');
    if (!existsSync(d)) return null;
    const html = doc(d);
    const m = html.match(/<article[\s\S]*?<\/article>/i);
    return m ? { html, article: m[0] } : { html, article: null };
  };

  // hai hub: đúng tập 3 thẻ + không nhãn trống
  const hub = (ten, tep, mauThe, kyVong) => {
    if (!existsSync(tep)) { dat(`B7 hub ${ten}`, false, 'thiếu hub dist'); return; }
    const html = doc(tep);
    const vung = html.slice(html.indexOf('</h1>') + 5, html.indexOf('</main>') > 0 ? html.indexOf('</main>') : undefined);
    const the = [...vung.matchAll(mauThe)].map((m) => m[1]);
    const rieng = [...new Set(the)].sort();
    const mong = [...kyVong].sort();
    const rong = html.includes('hieudung_empty') || html.includes('No articles in this series yet') || html.includes('Chưa có bài nào trong loạt này');
    dat(
      `B7 hub ${ten}`,
      !rong && the.length === 3 && JSON.stringify(rieng) === JSON.stringify(mong),
      rong ? 'vẫn còn nhãn trống' : the.length !== 3 ? `số thẻ=${the.length}` : JSON.stringify(rieng) === JSON.stringify(mong) ? 'tập 3 thẻ khớp' : `tập lệch: thực tế ${rieng.join(', ')}`
    );
  };
  hub('VI', join('dist', 'hieu-dung', 'index.html'), /href="(\/huong-dan\/[a-z0-9-]+)"/g, BAI.map((b) => b.routeVi));
  hub('EN', join('dist', 'en', 'myths', 'index.html'), /href="(\/en\/guides\/[a-z0-9-]+\/)"/g, BAI.map((b) => b.routeEn));

  for (const b of BAI) {
    for (const [ngonNgu, route, canCu] of [
      ['VI', b.routeVi.replace(/^\//, ''), b.canCuVi],
      ['EN', b.routeEn.replace(/^\//, ''), b.canCuEn],
    ]) {
      const kq = distDoc(route);
      if (!kq) { dat(`B7 dist ${b.slugVi} ${ngonNgu}`, false, `thiếu dist/${route}/index.html`); continue; }
      if (!kq.article) { dat(`B7 dist ${b.slugVi} ${ngonNgu}`, false, 'KHÔNG tìm thấy <article> — không fallback toàn HTML'); continue; }
      const a = kq.article;
      const h1 = (a.match(/<h1[^>]*>/g) ?? []).length;
      const canonical = kq.html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '';
      const canonicalGoc = 'https://www.kienthucdonghoco.vn' + (ngonNgu === 'VI' ? b.routeVi + '/' : b.routeEn);
      const canonicalDung = canonical === canonicalGoc;
      const hrefVi = 'https://www.kienthucdonghoco.vn' + b.routeVi;
      const hrefEn = 'https://www.kienthucdonghoco.vn' + b.routeEn;
      // hai trang render hreflang không nhất quán gạch cuối — chấp nhận cả hai
      const hreflangDung = (kq.html.includes('hreflang="vi" href="' + hrefVi + '"') || kq.html.includes('hreflang="vi" href="' + hrefVi + '/"')) &&
        (kq.html.includes('hreflang="en" href="' + hrefEn + '"') || kq.html.includes('hreflang="en" href="' + hrefEn.replaceAll('/$', '') + '"'));
      const switcher = ngonNgu === 'VI' ? 'href="/en/guides/' + b.slugEn + '/"' : 'href="/huong-dan/' + b.slugVi + '"';
      // bóc dấu * markdown hai bên trước khi so chuỗi (dist render ** thành <strong>)
      const phang = (s) => s.split('*').join('');
      const aPhang = phang(a).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
      const thieuCanCu = canCu.map(phang).filter((c) => !aPhang.includes(c));
      const cam = ngonNgu === 'VI' ? b.camVi : b.camEn;
      const camHit = cam.filter((c) => aPhang.includes(c));
      const vungNguon = a.match(/<section class="source-list[^"]*"[\s\S]*?<\/section>/i);
      const thieuNguon = vungNguon ? b.urls.filter((u) => !vungNguon[0].includes(`href="${u}"`)) : b.urls;
      // đọc thêm: liên kết nội bộ trong article phải trỏ tới dist tồn tại
      const lietHong = [...a.matchAll(/href="(\/[^"]+)"/g)].map((m) => m[1])
        .filter((h) => !h.startsWith('//') && !h.startsWith('/_'))
        .filter((h) => !existsSync(join('dist', h.replace(/\/$/, ''), 'index.html')));
      const ok = h1 === 1 && canonicalDung && hreflangDung && kq.html.includes(switcher) && thieuCanCu.length === 0 && camHit.length === 0 && vungNguon && thieuNguon.length === 0 && lietHong.length === 0 && !EMOJI.test(a);
      dat(
        `B7 dist ${b.slugVi} ${ngonNgu}`,
        ok,
        !vungNguon ? 'article không có khối nguồn' : thieuNguon.length ? 'khối nguồn thiếu: ' + thieuNguon.join(' | ') : thieuCanCu.length ? 'thiếu căn cứ: ' + thieuCanCu.join(' | ') : camHit.length ? 'claim cấm trong article: ' + camHit.join(' | ') : !canonicalDung ? 'canonical sai: ' + canonical : !hreflangDung ? 'hreflang sai địa chỉ' : lietHong.length ? 'đọc thêm đích thiếu dist: ' + lietHong.slice(0, 2).join(' | ') : 'H1/canonical/hreflang/switcher/căn cứ/cấm/khối nguồn/đọc-thêm đủ'
      );
    }
  }
}

if (errors.length) {
  console.log(`=> B7 THẤT BẠI (${cheDoDist ? 'nguồn+dist' : 'nguồn'}): ${errors.length} phép kiểm (${errors.join('; ')})`);
  process.exit(1);
}
console.log(`=> B7 ĐẠT (${cheDoDist ? 'nguồn+dist' : 'nguồn'}).`);
