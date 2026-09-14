// G06-B chặng 1 — kiểm kê dữ liệu thật của công cụ /so-sanh (không sửa sản phẩm).
// Đếm từ cơ chế đọc collection hiện hành (getEntriesByLang: lọc draft ở PROD,
// lọc theo thư mục ngôn ngữ, slug qua getSlug ưu tiên custom_slug) — KHÔNG suy
// cặp từ tên tệp: cặp chỉ nhận từ ARTICLE_PAIRS trong contentRoutes.ts, đích
// xác minh trong dist. Kết quả: kiem-ke-ket-qua.json
'use strict';
const fs = require('fs');
const path = require('path');

const goc = path.resolve(__dirname, '..', '..');

// ===== 1. Đọc collection mauIconic theo cơ chế getEntriesByLang =====
// getEntriesByLang('mauIconic', lang): entry.id bắt đầu "vi/"|"en/", draft!==true ở PROD,
// sort theo date giảm dần (không date thì theo title).
function docCollection(lang) {
  const dir = path.join(goc, 'src', 'content', 'mauIconic', lang);
  const cacMuc = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md')).sort()) {
    const nd = fs.readFileSync(path.join(dir, f), 'utf8');
    const khop = nd.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!khop) continue;
    const fm = khop[1];
    const draft = /^draft:\s*true\s*$/m.test(fm);
    const truong = (ten) => {
      const m = fm.match(new RegExp('^' + ten + ':\\s*(.*)$', 'm'));
      return m ? m[1].trim() : null;
    };
    const boc = (s) => (s ? s.replace(/^["']|["']$/g, '') : null);
    const id = lang + '/' + f;
    const custom = boc(truong('custom_slug'));
    const slug = custom ? custom.replace(/^\//, '').replace(/\/$/, '') : f.replace(/\.md$/, '');
    cacMuc.push({
      tep: f,
      id,
      draft,
      slug,
      title: boc(truong('title')),
      excerpt: boc(truong('excerpt')),
      year: truong('year'),
      brand: boc(truong('brand')),
      category: boc(truong('category')),
      movement: boc(truong('movement')),
      power_reserve: boc(truong('power_reserve')),
      water_resistance: boc(truong('water_resistance')),
      references: truong('references'),
      date: boc(truong('date')),
    });
  }
  // sort giống getEntriesByLang: date giảm dần, thiếu date thì theo title
  cacMuc.sort((a, b) => {
    if (a.date && b.date) return new Date(b.date) - new Date(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return String(a.title).localeCompare(String(b.title));
  });
  return cacMuc;
}

const vi = docCollection('vi').filter((e) => !e.draft);
const en = docCollection('en').filter((e) => !e.draft);

// ===== 2. Cặp route chỉ từ bảng contentRoutes (không suy từ tên tệp) =====
const crRaw = fs.readFileSync(path.join(goc, 'src', 'i18n', 'contentRoutes.ts'), 'utf8');
const khoiArticle = crRaw.slice(crRaw.indexOf('ARTICLE_PAIRS'));
const capMauIconic = [...khoiArticle.matchAll(/\{\s*vi:\s*'\/mau-iconic\/([^']+)',\s*en:\s*'([^']+)'\s*\}/g)]
  .map((m) => ({ slugVi: m[1], routeEn: m[2] }));

// ===== 3. Xác minh đích thật trong dist =====
const coDist = (p) => fs.existsSync(path.join(goc, 'dist', p, 'index.html'));
const xacMinh = capMauIconic.map((c) => ({
  ...c,
  distVi: coDist('mau-iconic/' + c.slugVi),
  distEn: coDist(c.routeEn.replace(/^\//, '').replace(/\/$/, '')),
}));

// ===== 4. Đối chiếu từng trường VI ↔ EN cho mẫu có cặp =====
// [TXN-20260914-6] Tách hàm dùng chung cho dữ liệu THẬT và kịch bản GIẢ để tự
// kiểm chạy trên ĐƯỜNG KIỂM THẬT (xây đối chiếu + tìm EN thiếu cặp), không chỉ
// kiểm riêng hàm trích segment. Ánh xạ vẫn qua ROUTE THẬT: slug EN được TRÍCH
// từ routeEn (segment cuối của route đích) rồi tra kho EN theo slug đó.
const slugEnTuRoute = (routeEn) => {
  const cacMuc = String(routeEn).split('/').filter(Boolean);
  return cacMuc.length > 0 ? cacMuc[cacMuc.length - 1] : null;
};
const timBaiEnTheoCap = (cap, enKho) => {
  const slugEn = slugEnTuRoute(cap.routeEn);
  return { slugEn, bai: slugEn ? enKho.get(slugEn) : undefined };
};
const xayDoiChieu = (vi, enKho, cacCap) => cacCap.map((c) => {
  const v = vi.find((e) => e.slug === c.slugVi);
  const { slugEn, bai: e } = timBaiEnTheoCap(c, enKho);
  if (!v || !e) return { slug: c.slugVi, slugEn, routeEn: c.routeEn, loi: 'thiếu bài VI hoặc EN (tra theo slugEn từ routeEn)' };
  const cacTruong = ['title', 'excerpt', 'year', 'brand', 'category', 'movement', 'power_reserve', 'water_resistance', 'references'];
  const soSanh = {};
  for (const t of cacTruong) {
    const giong = String(v[t] ?? '') === String(e[t] ?? '');
    soSanh[t] = { vi: v[t], en: e[t], gionhChuoi: giong };
  }
  return {
    slug: c.slugVi,
    slugEn,
    routeEn: c.routeEn,
    soSanh,
    ghiChu: null,
  };
});
// Bài EN KHÔNG có cặp: đối chiếu slug bài EN với slug EN trích từ routeEn
// [TXN-20260914-6] — sửa cách cũ (so slugVi) bỏ sót khi slug hai bên khác nhau.
const timEnThieuCap = (en, cacCap) => en
  .filter((e) => !cacCap.some((c) => slugEnTuRoute(c.routeEn) === e.slug))
  .map((e) => e.slug);

const enTheoSlug = new Map(en.map((e) => [e.slug, e]));
const doiChieu = xayDoiChieu(vi, enTheoSlug, capMauIconic);

// ===== 4b. Tự kiểm trên ĐƯỜNG KIỂM THẬT (dữ liệu GIẢ chạy qua xayDoiChieu/ =====
// timEnThieuCap — không đụng sản phẩm, không sửa contentRoutes, không đọc dist).
// [TXN-20260914-6] thay bộ kiểm cũ (chỉ thử hàm trích segment) theo chỉ thị.
const tuKiemDuongKiem = (() => {
  const ketQua = [];
  const viGia = [
    { slug: 'vi-khac', title: 'bài VI có bản dịch', excerpt: 'đoạn VI', year: '2001', brand: 'Hãng A', category: 'dress', movement: 'Cal X', power_reserve: '48 giờ', water_resistance: '50m', references: '["R1"]' },
    { slug: 'vi-co-cap', title: 'bài VI cặp hỏng', excerpt: 'đoạn VI', year: '2002', brand: 'Hãng B', category: 'pilot', movement: 'Cal Y', power_reserve: '42 giờ', water_resistance: '100m', references: '["R2"]' },
  ];
  const enGiaMang = [
    { slug: 'en-khac', title: 'translated entry', excerpt: 'EN excerpt', year: '2001', brand: 'Hãng A', category: 'dress', movement: 'Cal X', power_reserve: '48 hours', water_resistance: '50m', references: '["R1"]' },
    { slug: 'en-loi', title: 'bài EN không cặp', excerpt: 'orphan', year: '2003', brand: 'Hãng C', category: 'dress', movement: 'Cal Z', power_reserve: '40 giờ', water_resistance: '30m', references: '["R3"]' },
  ];
  const enGia = new Map(enGiaMang.map((e) => [e.slug, e]));
  const capGia = [
    { slugVi: 'vi-khac', routeEn: '/en/khu/en-khac/' },         // slug VI ≠ slug EN — hợp lệ
    { slugVi: 'vi-co-cap', routeEn: '/en/khu/khong-ton-tai/' }, // trỏ bài EN KHÔNG tồn tại
  ];
  const doiGia = xayDoiChieu(viGia, enGia, capGia);
  // a) cặp VI/EN khác slug: tìm đúng bài EN qua routeEn
  const a = doiGia[0];
  ketQua.push({
    ten: 'a: cặp VI/EN khác slug — tìm đúng bài EN',
    dung: a.loi === undefined && a.slugEn === 'en-khac' && a.soSanh !== undefined && a.soSanh.title.en === 'translated entry',
    chiTiet: `slugEn="${a.slugEn}", title EN="${a.soSanh ? a.soSanh.title.en : '(lỗi)'}"`,
  });
  // b) cặp trỏ bài EN KHÔNG tồn tại: phải báo lỗi
  const b = doiGia[1];
  ketQua.push({
    ten: 'b: cặp trỏ bài EN không tồn tại — báo lỗi',
    dung: b.loi !== undefined,
    chiTiet: `slugEn="${b.slugEn}", loi="${b.loi ?? '(không có — SAI)'}"`,
  });
  // c) bài EN không có cặp: được liệt kê trong enThieuCap
  const thieu = timEnThieuCap(enGiaMang, capGia);
  ketQua.push({
    ten: 'c: bài EN không có cặp — được liệt kê',
    dung: JSON.stringify(thieu) === JSON.stringify(['en-loi']),
    chiTiet: `enThieuCap=[${thieu.join(', ')}]`,
  });
  // d) đủ cặp với slug khác nhau: enThieuCap RỖNG (cách cũ so slugVi sẽ báo sai)
  const capDu = [{ slugVi: 'vi-khac', routeEn: '/en/khu/en-khac/' }];
  const thieuKhong = timEnThieuCap([enGiaMang[0]], capDu);
  const cachCuSeBaoSai = [enGiaMang[0]].filter((e) => !capDu.some((c) => c.slugVi === e.slug)).map((e) => e.slug);
  ketQua.push({
    ten: 'd: đủ cặp khác slug — enThieuCap rỗng (cách cũ so slugVi sai)',
    dung: thieuKhong.length === 0 && cachCuSeBaoSai.length === 1,
    chiTiet: `mới=[${thieuKhong.join(', ')}] | cách cũ=[${cachCuSeBaoSai.join(', ')}]`,
  });
  return ketQua;
})();

// ===== 5. Chuỗi runtime của công cụ (từ so-sanh.astro) — cổng câu chữ EN =====
const trang = fs.readFileSync(path.join(goc, 'src', 'pages', 'so-sanh.astro'), 'utf8');
const chuoiRuntime = {
  title: (trang.match(/title="([^"]+)"/) || [])[1],
  description: (trang.match(/description="([^"]+)"/) || [])[1],
  h1: 'So sánh mẫu iconic',
  nhanChon: 'Thêm mẫu để so sánh:',
  placeholder: '— Chọn một mẫu —',
  nutThem: 'Thêm',
  gioiHan: 'Tối đa 3 mẫu. Bấm tên mẫu trong bảng để bỏ.',
  tbRong: 'Chưa chọn mẫu nào. Thêm ít nhất 2 mẫu để bắt đầu so sánh.',
  daChon: 'Đã chọn',
  moiThem: 'Thêm ít nhất 1 mẫu nữa để bắt đầu so sánh. ↑',
  tieuChi: 'Tiêu chí',
  nutBo: 'Bỏ',
  hang: ['Năm ra mắt', 'Thương hiệu', 'Thể loại', 'Bộ máy', 'Trữ cót', 'Chống nước', 'Câu chuyện định danh'],
  chiaSe: '🔗 Link chia sẻ:',
  categoryLabels: (trang.match(/const categoryLabels[\s\S]*?};/) || [''])[0],
};

const ketQua = {
 HEAD: fs.readFileSync(path.join(goc, '.git', 'HEAD'), 'utf8').trim(),
  thoiGian: new Date().toISOString(),
  // [TXN-20260914-4] Phương pháp nêu đúng: parser đọc và đối chiếu frontmatter
  // trực tiếp từ tệp .md — KHÔNG gọi API collection của Astro. Số lựa chọn được
  // đối chiếu chéo với dist (distSoSanh, đích 4 cặp) và tool đo P1.5 (log riêng).
  phuongPhap: {
    moTa: 'Đọc và đối chiếu frontmatter bằng công cụ kiểm kê (parser regex trên tệp .md trong src/content/mauIconic) — không gọi trực tiếp Astro collection',
    anhXaCap: 'Slug EN được trích từ routeEn của ARTICLE_PAIRS (segment cuối route đích), rồi tra bài EN theo slug đó — không dùng slug VI truy kho EN',
    doiChieuSo: 'Số lựa chọn đối chiếu với dist (dist/so-sanh, 4 đích /en/iconic-watches/*/index.html, sitemap) và tool đo P1.5 (log-do-so-lieu.txt)',
    gioiHanParser: 'Parser regex đọc trường frontmatter 1 dòng (title/excerpt/year/... dạng "key: value"); mảng references nhiều dòng chỉ ghi nguyên dòng đầu — dùng để đối chiếu VI/EN, không dùng làm chứng minh nội dung',
  },
  tuKiemDuongKiem,
  mauIconic: {
    vi: { xuatBan: vi.length, draftDaLoai: docCollection('vi').length - vi.length },
    en: { xuatBan: en.length, draftDaLoai: docCollection('en').length - en.length },
    slugVi: vi.map((e) => e.slug),
    slugEn: en.map((e) => e.slug),
  },
  capMauIconic: {
    soCapTrongBang: capMauIconic.length,
    chiTiet: xacMinh,
    enThieuCap: timEnThieuCap(en, capMauIconic),
    viThieuCapSoVOiEn: vi.length - capMauIconic.length,
  },
  doiChieuTruong: doiChieu,
  chuoiRuntime,
  dist: {
    soSanhVi: coDist('so-sanh'),
    soSanhEn: coDist('en/so-sanh'),
    sitemapCoSoSanh: (() => {
      try { return fs.readFileSync(path.join(goc, 'dist', 'sitemap-0.xml'), 'utf8').includes('/so-sanh'); } catch { return null; }
    })(),
  },
};
fs.writeFileSync(path.join(__dirname, 'kiem-ke-ket-qua.json'), JSON.stringify(ketQua, null, 2));
console.log('VI xuất bản:', ketQua.mauIconic.vi.xuatBan, '| EN xuất bản:', ketQua.mauIconic.en.xuatBan);
console.log('Cặp mauIconic trong bảng:', ketQua.capMauIconic.soCapTrongBang, '| EN thiếu cặp:', ketQua.capMauIconic.enThieuCap.join(',') || '(không)');
console.log('Đích dist đủ:', xacMinh.every((x) => x.distVi && x.distEn));
console.log('dist/so-sanh:', ketQua.dist.soSanhVi, '| dist/en/so-sanh (không được có):', ketQua.dist.soSanhEn, '| sitemap có /so-sanh:', ketQua.dist.sitemapCoSoSanh);
for (const k of tuKiemDuongKiem) console.log((k.dung ? 'ĐẠT ' : 'KHÔNG ĐẠT ') + k.ten + ' — ' + k.chiTiet);
for (const d of doiChieu) {
  const khac = Object.entries(d.soSanh).filter(([, s]) => !s.gionhChuoi).map(([t]) => t);
  console.log('Cặp ' + d.slug + ' (slugEn=' + d.slugEn + '): khác chuỗi ở [' + khac.join(', ') + ']');
}
process.exit(tuKiemDuongKiem.every((k) => k.dung) ? 0 : 1);
