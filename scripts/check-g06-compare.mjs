// =============================================================================
// G06-B chặng 2 — bộ kiểm công cụ so sánh song ngữ /so-sanh ↔ /en/compare/
// Chạy: node scripts/check-g06-compare.mjs            → kiểm NGUỒN (trước build)
//       node scripts/check-g06-compare.mjs dist       → kiểm DIST (sau build)
//       node scripts/check-g06-compare.mjs dist <dir> → kiểm dist TRONG sandbox
//                                                       (dùng bởi runner mutation
//                                                       ở output/g06-compare-en-integration/)
// Không phụ thuộc lịch sử Git hay đường dẫn tuyệt đối máy; đường dẫn tính từ
// thư mục repo (process.cwd()). Không đụng file ngoài dist khi chạy thường.
// Mỗi ca in "ĐẠT [id]" hoặc "LỖI [id]"; exit 0 khi tất cả ĐẠT.
// =============================================================================
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';

const GOC = process.cwd();
const doc = (...p) => join(GOC, ...p);
const docStr = (...p) => {
  try { return readFileSync(doc(...p), 'utf8'); } catch { return null; }
};

const ketQua = [];
let soLoi = 0;
const kiem = (id, ten, dung, chiTiet) => {
  const ok = typeof dung === 'function' ? dung() : dung;
  if (!ok) soLoi += 1;
  ketQua.push({ id, ten, dat: Boolean(ok), chiTiet: chiTiet ?? '' });
  console.log((ok ? 'ĐẠT ' : 'LỖI ') + '[' + id + '] ' + ten + (ok ? '' : ' — ' + (chiTiet ?? '')));
};
const chua = (s, need) => typeof s === 'string' && need.every((x) => s.includes(x));

// Chuỗi đã duyệt (hồ sơ chặng 1 cuối — CỔNG-1/2/17, 4.1; chốt TXN-20260914-8/10)
const CAU_GIOI_HAN_VI = 'Năm và thông số được trích từ hồ sơ từng mẫu; chúng có thể thuộc các giai đoạn hoặc phiên bản khác nhau. Không coi các giá trị trong cùng cột là cấu hình của một reference cụ thể nếu chưa được ghi rõ.';
const CAU_GIOI_HAN_EN = "Years and specifications are drawn from each model's article and may refer to different periods or variants. Do not treat values in one column as the specification of a single reference unless explicitly identified.";
const CAU_SPEED_VI = 'Chronograph gắn với chương trình Apollo của NASA — một trong những chiếc đồng hồ đã lên Mặt Trăng.';
const CAU_SPEED_EN = "The chronograph associated with NASA's Apollo programme — one of the watches that went to the Moon.";
const CAU_TANK_VI = 'Mẫu đồng hồ chữ nhật lấy cảm hứng từ xe tăng trong Thế chiến thứ nhất.';
const CAU_TANK_EN = 'A rectangular watch inspired by tanks of World War I.';
const NHAN_THIEU_DU_LIEU_VI = 'Chưa đủ dữ liệu để đối chiếu';
const NHAN_THIEU_DU_LIEU_EN = 'Not enough data to compare';
const CHU_THICH_GACH_VI = '— = bài chưa ghi thông số này; không phải 0 và không có nghĩa là tính năng không tồn tại.';
const CHU_THICH_GACH_EN = "— = not stated in the model's article; it does not mean zero or that the feature is absent.";
// Chuỗi UI VI — KHÔNG được lọt vào trang EN (kiểm D4)
const CHUOI_UI_VI = ['Thêm mẫu để so sánh:', '— Chọn một mẫu —', 'Tối đa 3 mẫu. Dùng nút Bỏ bên cạnh tên mẫu để bỏ khỏi bảng.', 'Chưa chọn mẫu nào. Thêm ít nhất 2 mẫu để bắt đầu so sánh.', 'Tiêu chí', 'Link chia sẻ:', NHAN_THIEU_DU_LIEU_VI];


// ============================================================ NGUỒN
function kiemNguon() {
  const comp = docStr('src', 'components', 'compare', 'CompareExperience.astro');
  const wrapVi = docStr('src', 'pages', 'so-sanh.astro');
  const wrapEn = docStr('src', 'pages', 'en', 'compare.astro');
  const routes = docStr('src', 'i18n', 'contentRoutes.ts');
  const uiTs = docStr('src', 'i18n', 'ui.ts');

  kiem('S1', 'Hai wrapper dùng chung CompareExperience (lang vi/en)', chua(wrapVi, ['CompareExperience', 'lang="vi"']) && chua(wrapEn, ['CompareExperience', 'lang="en"']));
  kiem('S2', 'Component truyền dữ liệu + chuỗi + cặp bài + kho slug + lang vào script (define:vars)', /define:vars=\{\{ modelsData: models, ui: chuoiUi, capBai, khoSlug, LANG: lang[,}]/.test(comp), 'không thấy define:vars modelsData/ui/capBai/khoSlug/LANG');
  kiem('S3', 'CỔNG-1: câu giới hạn đủ VI + EN trong component', comp.includes(CAU_GIOI_HAN_VI) && comp.includes(CAU_GIOI_HAN_EN));
  kiem('S4', 'Nhãn hàng năm: VI "Mốc năm" (không "Năm ra mắt" trong nhãn), EN "Year"; hàng cuối EN "Model overview"', () => {
    const hangVi = comp.match(/hang: \[[^\]]+\]/g) ?? [];
    const khongRaMat = hangVi.every((h) => !h.includes("'Năm ra mắt'") && !h.includes('"Năm ra mắt"'));
    return hangVi.some((h) => h.includes("'Mốc năm'") && h.includes("'Câu chuyện định danh'")) && hangVi.some((h) => h.includes("'Year'") && h.includes("'Model overview'")) && khongRaMat;
  }, 'bảng nhãn hàng VI/EN sai');
  kiem('S5', 'Tank: yearNote Thiết kế/Designed + che ba thông số (daCheThongSo)', chua(comp, ["yearNote: laTank ? (lang === 'vi' ? 'Thiết kế' : 'Designed') : ''", 'movement: laTank ? \'\' : (d.movement ?? \'\')', 'daCheThongSo: laTank']));
  kiem('S6', 'Nhãn thiếu dữ liệu VI/EN nguyên văn trong component', comp.includes(NHAN_THIEU_DU_LIEU_VI) && comp.includes(NHAN_THIEU_DU_LIEU_EN));
  kiem('S7', 'Câu Speedmaster/Tank (4.1) nguyên văn cả hai ngôn ngữ — chỉ trong component', chua(comp, [CAU_SPEED_VI, CAU_SPEED_EN, CAU_TANK_VI, CAU_TANK_EN]));
  kiem('S8-lim', 'Câu chốt công cụ KHÔNG lọt frontmatter bài gốc (kiểm GIỚI HẠN — phạm vi toàn bài đối chiếu Git khi bàn giao, không phải chứng minh nguyên trạng)', () => {
    const cap = [['rolex-submariner'], ['omega-speedmaster'], ['cartier-tank'], ['rolex-gmt-master']];
    for (const [slug] of cap) {
      for (const lang of ['vi', 'en']) {
        const fm = docStr('src', 'content', 'mauIconic', lang, slug + '.md');
        if (!fm) return false;
        const khopFm = fm.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        const dau = khopFm ? khopFm[1] : '';
        if (dau.includes(CAU_SPEED_VI) || dau.includes(CAU_TANK_VI) || dau.includes(CAU_SPEED_EN) || dau.includes(CAU_TANK_EN)) return false;
      }
    }
    return true;
  }, 'frontmatter bài gốc chứa câu của công cụ — cấm');
  kiem('S9', 'Khối chia sẻ không emoji (không 🔗 trong component)', !comp.includes('🔗'));
  kiem('S10', 'Nút bỏ mang tên mẫu trong aria-label (nutBo + title)', /setAttribute\('aria-label', ui\.nutBo \+ ' ' \+ m\.title\)/.test(comp));
  kiem('S11', 'Vùng cuộn tự quản: .table-scroll-wrap + tabindex + role ngay trong markup; không gọi markOverflowTables', () => {
    const coBoc = /id="compare-table-wrap"[\s\S]{0,200}?class="table-scroll-wrap overflow-x-auto mt-8 rounded-lg"[\s\S]{0,120}?tabindex="0"[\s\S]{0,60}?role="region"/.test(comp) || /class="table-scroll-wrap overflow-x-auto mt-8 rounded-lg"[\s\S]{0,200}?tabindex="0"[\s\S]{0,60}?role="region"[\s\S]{0,120}?id="compare-table-wrap"/.test(comp);
    return coBoc && !/\bmarkOverflowTables\s*\(/.test(comp);
  }, 'thiếu bọc tự quản hoặc đụng hàm BaseLayout');
  kiem('S12', 'Hàng bảng có biến dark (không bg-white thuần trong dark)', comp.includes("'bg-white dark:bg-dark-surface'") && comp.includes("'bg-cream-dark/5 dark:bg-transparent'"));
  kiem('S13', 'Focus sau bỏ: focus tới nút kế/trước/select, không về BODY', chua(comp, ['function focusSauBo', 'nutCungViTri.focus()', 'nutTruoc.focus()', 'selectEl.focus()']));
  kiem('S14', 'Chuyển ngôn ngữ: dùng data-lang-hash-keep + sessionStorage một lần, cấm dropped', () => comp.includes('data-lang-hash-keep') && comp.includes("'compare-lang-switch'") && comp.includes('removeItem') && !comp.includes('dropped'));
  kiem('S15', 'Khôi phục URL chuẩn hóa (lọc + loại trùng + giới hạn ba)', /function restoreFromUrl[\s\S]{0,200}chuanHoa\(m\.split\(','\)\)/.test(comp));
  kiem('S16', 'Nhãn thể loại qua getIconicCategoryLabel; không bảng nhãn cạnh tranh', comp.includes('getIconicCategoryLabel') && !/const categoryLabels/.test(comp));
  kiem('S17', 'contentRoutes có cặp /so-sanh ↔ /en/compare/; ui.ts OG hai route', chua(routes, ["{ vi: '/so-sanh', en: '/en/compare/' }"]) && chua(uiTs, ["{ match: '/so-sanh', image: '/images/og/og-mau-iconic.jpg' }", "{ match: '/en/compare', image: '/images/og/og-mau-iconic.jpg' }"]));
  kiem('S18', 'Không chuyển động nội dung: không rAF/setInterval/animation (RM-C2)', () => !/requestAnimationFrame|setInterval|@keyframes|animation:/.test(comp));
  kiem('S19', 'No-JS: noscript ẩn điều khiển + giải thích tĩnh + liên kết bài thật', () => comp.includes('<noscript>') && comp.includes('#compare-controls') && comp.includes('display: none') && /noJsTieuDe|noJsTieude/.test(comp) && comp.includes('linkDanhSach') && comp.includes('linkBai'));
  // ===== Vòng sửa 1 (TXN-20260914-13) =====
  const enIdx = docStr('src', 'components', 'templates', 'EnCollectionIndex.astro');
  const enWrap = docStr('src', 'pages', 'en', 'iconic-watches', 'index.astro');
  kiem('S20', 'Lối vào danh sách EN: EnCollectionIndex có prop footerLink; wrapper truyền /en/compare/ + "Compare iconic models"', () => {
    const coProp = /footerLink\?: \{ href: string; label: string \}/.test(enIdx) && /footerLink &&/.test(enIdx);
    const coTruyen = chua(enWrap, ["footerLink={{ href: '/en/compare/', label: 'Compare iconic models' }}"]);
    return coProp && coTruyen;
  }, 'thiếu prop hoặc wrapper chưa truyền');
  kiem('S21', 'Cặp bài lấy từ ARTICLE_PAIRS qua hàm thuần dungCapBai đối chiếu kho xuất bản — KHÔNG chép cứng', () => {
    const coNguon = comp.includes('ARTICLE_PAIRS') && comp.includes('function dungCapBai') && comp.includes('dungCapBai(ARTICLE_PAIRS, khoXuatBan.vi, khoXuatBan.en)') && comp.includes("p.vi.startsWith('/mau-iconic/')") && comp.includes('khoVi.has(c.vi) && khoEn.has(c.en)');
    const khongCung = !/vi: 'rolex-submariner'/.test(comp);
    return coNguon && khongCung;
  }, 'component còn bảng cặp chép cứng hoặc thiếu nguồn ARTICLE_PAIRS');
  kiem('S22', 'Vòng đời storage: apDung chỉ đổi href (không setItem); ghi chỉ trong trình nghe click switcher có chặn phím bổ trợ', () => {
    const apDung = comp.match(/function apDungChuyenNgonNgu\(\)[\s\S]*?\n  \}/);
    const apDungKhongGhi = apDung ? !apDung[0].includes('setItem') : false;
    const clickCoChan = /addEventListener\('click', \(e\) => \{[\s\S]{0,200}e\.metaKey \|\| e\.ctrlKey \|\| e\.shiftKey \|\| e\.altKey/.test(comp) && comp.includes('ngheKichHoatChuyenNgonNgu');
    return apDungKhongGhi && clickCoChan;
  }, 'apDung còn ghi storage hoặc thiếu trình nghe click có chặn phím bổ trợ');
  kiem('S23', 'Đích đọc bản ghi: xóa ngay sau đọc + kiểm from/to hợp lệ theo cặp vi/en + slug nguồn trong kho + đối chiếu URL hiện tại', () => {
    const thuTu = /getItem\(KHOA_STORAGE\)[\s\S]{0,400}removeItem\(KHOA_STORAGE\)[\s\S]{0,300}JSON\.parse/.test(comp) || /getItem\(KHOA_STORAGE\)[\s\S]{0,120}removeItem/.test(comp);
    const cuong = comp.includes('khoSlug[obj.from]') && comp.includes('JSON.stringify(kept) !== JSON.stringify(selected)') && /langHopLe\(obj\.from\) \|\| !langHopLe\(obj\.to\)/.test(comp) && /obj\.to !== nguonLang/.test(comp) && /obj\.from !== dichLang/.test(comp);
    return thuTu && cuong;
  }, 'thiếu xóa-sau-đọc hoặc kiểm from/to/kho/URL');
  kiem('S24', 'Tự kiểm capBai chạy LÚC BUILD trên chính dungCapBai, có ca cô lập route EN sai khu (slug có trong kho) + đối chứng đúng khu; KHÔNG expose tự kiểm ra trang người đọc', () => {
    const coThrow = comp.includes("throw new Error('tự kiểm capBai thất bại: '");
    const saiKhu = comp.includes("'route EN sai khu (slug có trong kho): bị loại',") && comp.includes("dungCapBai([{ vi: '/mau-iconic/khong-cap', en: '/en/khu-khac/khong-cap/' }], viGia, enGia).length === 0");
    const doiChung = comp.includes("dungCapBai([{ vi: '/mau-iconic/khong-cap', en: '/en/iconic-watches/khong-cap/' }], viGia, enGia).some((c) => c.vi === 'khong-cap' && c.en === 'khong-cap')");
    const khongLoTrang = !comp.includes('__compareTuKiem');
    return coThrow && saiKhu && doiChung && khongLoTrang;
  }, 'thiếu tự kiểm build-time/cô lập route sai khu/đối chứng, hoặc còn rò dữ liệu giả ra trang');
  kiem('S25', 'Link chia sẻ khởi tạo chuẩn hóa theo lựa chọn hiển thị', () => comp.includes("urlKhoiTao.searchParams.set('m', selected.join(','))") && comp.includes("hienChiaSe(urlKhoiTao.toString())"));
}

// ============================================================ DIST
function kiemDist(dirDist) {
  const d = (rel) => doc(dirDist, rel);
  const co = (rel) => existsSync(d(rel));
  const html = (rel) => docStr(dirDist, rel);

  const trangVi = html(join('so-sanh', 'index.html'));
  const trangEn = html(join('en', 'compare', 'index.html'));

  kiem('D1', 'Hai route tồn tại trong dist', co(join('so-sanh', 'index.html')) && co(join('en', 'compare', 'index.html')));
  kiem('D2', 'Sitemap có /so-sanh/ và /en/compare/', () => {
    const sm = docStr(dirDist, 'sitemap-0.xml');
    return sm !== null && sm.includes('/so-sanh') && sm.includes('/en/compare/');
  }, 'thiếu URL trong sitemap-0.xml');
  kiem('D3', 'Trang VI: h1 + câu giới hạn + chú thích gạch ngang hiển thị tĩnh', () => chua(trangVi, ['So sánh mẫu iconic', CAU_GIOI_HAN_VI, CHU_THICH_GACH_VI]));
  kiem('D4', 'Trang EN: 0 chuỗi UI VI lọt; đủ h1 EN + câu giới hạn EN + nhãn thiếu dữ liệu EN', () => {
    if (!trangEn) return false;
    for (const s of CHUOI_UI_VI) if (trangEn.includes(s)) return false;
    return chua(trangEn, ['Compare iconic models', CAU_GIOI_HAN_EN, NHAN_THIEU_DU_LIEU_EN, CHU_THICH_GACH_EN]);
  }, 'chuỗi VI lọt hoặc thiếu chuỗi EN');
  kiem('D5', 'Dữ liệu hiển thị Tank: ba thông số rỗng trong blob (chống giá trị lọt dù nhãn còn) + yearNote đúng', () => {
    for (const [trang, nhanThieu] of [[trangVi, NHAN_THIEU_DU_LIEU_VI], [trangEn, NHAN_THIEU_DU_LIEU_EN]]) {
      const khoiTank = layKhoiMau(trang, 'cartier-tank');
      if (!khoiTank) return false;
      const obj = JSON.parse(khoiTank);
      if (obj.movement !== '' || obj.power_reserve !== '' || obj.water_resistance !== '') return false;
      if (obj.year !== '1917' || obj.yearNote !== (trang === trangVi ? 'Thiết kế' : 'Designed')) return false;
      if (!trang.includes(nhanThieu)) return false;
    }
    return true;
  }, 'blob Tank có giá trị thông số (lọt) hoặc thiếu yearNote/nhãn');
  kiem('D6', 'Dữ liệu Speedmaster trong blob là câu đã duyệt (cả hai ngôn ngữ)', () => {
    const vi = JSON.parse(layKhoiMau(trangVi, 'omega-speedmaster'));
    const en = JSON.parse(layKhoiMau(trangEn, 'omega-speedmaster'));
    return vi.excerpt === CAU_SPEED_VI && en.excerpt === CAU_SPEED_EN;
  }, 'excerpt blob Speedmaster sai câu đã duyệt');
  kiem('D7', 'Không có link /en/so-sanh trong toàn dist', () => {
    const dongLoi = quetHrefSai(dirDist);
    return dongLoi.length === 0;
  }, 'tìm thấy href="/en/so-sanh');
  kiem('D8', 'Cặp route: switcher thẳng + hreflang + og-image (VI và EN)', () => {
    const viOk = chua(trangVi, ['href="/en/compare/"', 'og-mau-iconic.jpg']) && !trangVi.includes('data-lang-switch="untranslated"') && /hreflang="vi" href="[^"]*\/so-sanh\/"/.test(trangVi) && /hreflang="en" href="[^"]*\/en\/compare\/"/.test(trangVi);
    const enOk = chua(trangEn, ['href="/so-sanh"', 'og-mau-iconic.jpg']) && !trangEn.includes('href="/so-sanh/"') && !trangEn.includes('data-lang-switch="untranslated"') && /hreflang="vi" href="[^"]*\/so-sanh"/.test(trangEn) && /hreflang="en" href="[^"]*\/en\/compare\/"/.test(trangEn);
    return viOk && enOk;
  }, 'thiếu link thẳng/hreflang/og');
  kiem('D9', 'Vùng cuộn bảng: tabindex + role="region" + aria-label trong HTML tĩnh (cả hai trang)', () => {
    const khuon = (h) => /id="compare-table-wrap"[\s\S]{0,200}?tabindex="0"[\s\S]{0,80}?role="region"[\s\S]{0,200}?aria-label=/.test(h) || /tabindex="0"[\s\S]{0,120}?role="region"[\s\S]{0,80}?id="compare-table-wrap"/.test(h);
    return khuon(trangVi) && khuon(trangEn);
  }, 'vùng cuộn thiếu tabindex/role/aria-label tĩnh');
  kiem('D10', 'No-JS: noscript ẩn điều khiển + giải thích + liên kết bài thật tồn tại', () => {
    const khuon = (h) => /<noscript>[\s\S]*?display: none[\s\S]*?<\/noscript>/.test(h);
    const lienKetEn = ['rolex-submariner', 'omega-speedmaster', 'cartier-tank', 'rolex-gmt-master'].every((slug) => co(join('en', 'iconic-watches', slug, 'index.html')));
    return khuon(trangVi) && khuon(trangEn) && lienKetEn;
  }, 'noscript thiếu hoặc đích bài không tồn tại');
  kiem('D11', 'Menu EN: Explore có /en/compare/ không VI-only (desktop, đã lọc comment HTML)', () => {
    const khongComment = trangEn.replace(/<!--[\s\S]*?-->/g, ' ');
    const m = khongComment.match(/<nav[^>]*>[\s\S]*?<\/nav>/);
    const khoi = m ? m[0] : khongComment;
    return khoi.includes('/en/compare/') && !khoi.includes('Vietnamese only');
  }, 'menu EN thiếu /en/compare/ hoặc còn nhãn VI-only');
  kiem('D12', 'Câu mô tả trong bài iconic EN dẫn đúng /en/compare/?m= (không /en/so-sanh)', () => {
    for (const slug of ['rolex-submariner', 'omega-speedmaster', 'cartier-tank', 'rolex-gmt-master']) {
      const bai = docStr(dirDist, 'en', 'iconic-watches', slug, 'index.html');
      if (!bai) return false;
      if (!bai.includes('/en/compare/?m=' + slug)) return false;
    }
    return true;
  }, 'bài EN thiếu link so sánh hoặc sai route');
  kiem('D13', 'Lối vào so sánh nằm trong NỘI DUNG danh sách EN (không tính menu): link /en/compare/ + nhãn đã duyệt', () => {
    const trang = docStr(dirDist, 'en', 'iconic-watches', 'index.html');
    if (!trang) return false;
    const khongComment = trang.replace(/<!--[\s\S]*?-->/g, ' ');
    const khongHeader = khongComment.replace(/<header[\s\S]*?<\/header>/g, ' ');
    // bỏ toàn bộ nav để chắc chắn không đếm link menu
    const khongNav = khongHeader.replace(/<nav[\s\S]*?<\/nav>/g, ' ');
    return khongNav.includes('href="/en/compare/"') && khongNav.includes('Compare iconic models');
  }, 'trang danh sách EN thiếu footer link /en/compare/ trong nội dung');
  kiem('D14', 'Dữ liệu giả của tự kiểm không rò vào trang (dist hai route không chứa cặp giả vi-khac/en-khac)', () => {
    for (const rel of [join('so-sanh', 'index.html'), join('en', 'compare', 'index.html')]) {
      const h = docStr(dirDist, rel);
      if (!h) return false;
      if (h.includes('vi-khac') || h.includes('en-khac') || h.includes('chua-xuat-ban')) return false;
    }
    return true;
  }, 'dist còn dữ liệu giả của tự kiểm');
}

// Trích khối object JSON của một mẫu trong blob define:vars của trang (dạng "slug":"x",...)
function layKhoiMau(htmlTrang, slug) {
  if (typeof htmlTrang !== 'string') return null;
  const dau = htmlTrang.indexOf('"slug":"' + slug + '"');
  if (dau === -1) return null;
  // tìm dấu { gần nhất trước và } cân bằng sau
  let mo = htmlTrang.lastIndexOf('{', dau);
  if (mo === -1) return null;
  let sau = 0;
  for (let i = mo; i < htmlTrang.length; i++) {
    const c = htmlTrang[i];
    if (c === '{') sau += 1;
    else if (c === '}') {
      sau -= 1;
      if (sau === 0) return htmlTrang.slice(mo, i + 1);
    }
  }
  return null;
}

function quetHrefSai(dirDist) {
  const loi = [];
  const duyet = (thuMuc) => {
    let danhSach = [];
    try { danhSach = readdirSync(thuMuc, { withFileTypes: true }); } catch { return; }
    for (const muc of danhSach) {
      const duong = join(thuMuc, muc.name);
      if (muc.isDirectory()) duyet(duong);
      else if (muc.name.endsWith('.html')) {
        const nd = docStr(dirDist, relative(dirDist, duong));
        if (nd && nd.includes('href="/en/so-sanh')) loi.push(relative(dirDist, duong));
      }
    }
  };
  duyet(resolve(GOC, dirDist));
  return loi;
}

// ============================================================ CHẠY
const pha = process.argv[2] ?? 'nguon';
if (pha === 'nguon') {
  console.log('== G06-B chặng 2 — kiểm NGUỒN ==');
  kiemNguon();
} else {
  const dirDist = process.argv[2] && process.argv[2] !== 'dist' ? process.argv[2] : (process.argv[3] ?? 'dist');
  console.log('== G06-B chặng 2 — kiểm DIST: ' + dirDist + ' ==');
  kiemDist(dirDist);
}
const tongDat = ketQua.filter((k) => k.dat).length;
console.log('KẾT LUẬN: ' + (soLoi === 0 ? 'ĐẠT' : 'KHÔNG ĐẠT') + ' — ' + tongDat + '/' + ketQua.length + ' ca');
process.exit(soLoi === 0 ? 0 : 1);
