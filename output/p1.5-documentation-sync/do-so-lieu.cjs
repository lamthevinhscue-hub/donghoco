// P1.5 — Công cụ đếm số liệu tài liệu hiện trạng (TXN-20260910-41)
// Chạy: node output/p1.5-documentation-sync/do-so-lieu.cjs
// Đo: Markdown theo collection × ngôn ngữ (đĩa + draft), HTML build theo
// ngôn ngữ (giải thích 404), sitemap, frontmatter related, timeline, nguồn.
// Kết quả: ket-qua-do.json (object trực tiếp) + in tổng hợp ra stdout.
'use strict';
const fs = require('fs');
const path = require('path');

const goc = path.resolve(__dirname, '..', '..');
const SRC_CONTENT = path.join(goc, 'src', 'content');
const DIST = path.join(goc, 'dist');

const COLLECTIONS = ['thuongHieu', 'mauIconic', 'coChe', 'tuDien', 'huongDan', 'trang'];

// ===== 1. Markdown theo collection × ngôn ngữ (đĩa) + draft =====
const NOI_DUNG = ['thuongHieu', 'mauIconic', 'coChe', 'tuDien', 'huongDan']; // 5 collection bài nội dung
function docCollection() {
  const ketQua = {};
  for (const col of COLLECTIONS) {
    const muc = {};
    for (const lang of ['vi', 'en']) {
      const dir = path.join(SRC_CONTENT, col, lang);
      if (!fs.existsSync(dir)) { muc[lang] = { tepTrenDia: 0, draftTrue: 0, xuatBan: 0 }; continue; }
      const tep = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
      let draftTrue = 0;
      for (const f of tep) {
        const nd = fs.readFileSync(path.join(dir, f), 'utf8');
        // Đọc TRỌN khối frontmatter (--- đầu → --- đóng) — không cắt theo số ký tự
        const khopFm = nd.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
        const fm = khopFm ? khopFm[1] : nd;
        if (/^draft:\s*true\s*$/m.test(fm)) draftTrue++;
      }
      muc[lang] = { tepTrenDia: tep.length, draftTrue, xuatBan: tep.length - draftTrue };
    }
    ketQua[col] = muc;
  }
  const tongViBaiNoiDung = NOI_DUNG.reduce((s, c) => s + ketQua[c].vi.xuatBan, 0);
  const tongEnBai = NOI_DUNG.reduce((s, c) => s + ketQua[c].en.xuatBan, 0);
  const trangPhapLyVi = ketQua.trang.vi.xuatBan;
  const tongMarkdown = tongViBaiNoiDung + trangPhapLyVi + tongEnBai;
  return {
    collections: ketQua,
    tong: {
      viBaiNoiDung_5collection: tongViBaiNoiDung,
      trangPhapLyVi_collectionTrang: trangPhapLyVi,
      enBai_5collection: tongEnBai,
      tongMarkdownTatCa: tongMarkdown,
      luuY: 'tongMarkdownTatCa (261 nếu draft=0) là số tệp Markdown — KHÔNG đồng nhất với 286 tệp HTML build (gồm trang tĩnh, trang danh sách, trang chủ, 404 — sinh từ wrapper/template chứ không phải 1 tệp Markdown mỗi trang)',
    },
  };
}

// ===== 2. HTML build theo ngôn ngữ + 404 =====
function docDist() {
  const ketQua = { vi: 0, en: 0, khac: [], tongHtml: 0, co404: false, viDanhSach: [] };
  const duyet = (dir, relBase) => {
    for (const name of fs.readdirSync(dir).sort()) {
      const full = path.join(dir, name);
      const rel = relBase ? relBase + '/' + name : name;
      if (fs.statSync(full).isDirectory()) { duyet(full, rel); continue; }
      if (!name.endsWith('.html')) continue;
      ketQua.tongHtml++;
      if (rel === '404.html') { ketQua.co404 = true; ketQua.khac.push(rel); continue; }
      if (rel.startsWith('en/') || rel === 'en.html') { ketQua.en++; }
      else { ketQua.vi++; if (rel.endsWith('/index.html') || !rel.includes('/')) ketQua.viDanhSach.push('/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '')); }
    }
  };
  duyet(DIST, '');
  return ketQua;
}

// ===== 3. Sitemap — TÁCH index khỏi sitemap URL trang =====
// sitemap-index.xml chỉ chứa tham chiếu tới sitemap con (<sitemap><loc>…</loc></sitemap>)
// — KHÔNG phải URL trang. Chỉ sitemap con (<urlset>) mới đếm URL trang.
function docSitemap() {
  const dir = path.join(DIST);
  const tepSitemap = [];
  const duyet = (d) => {
    for (const name of fs.readdirSync(d).sort()) {
      const full = path.join(d, name);
      if (fs.statSync(full).isDirectory()) { duyet(full); continue; }
      if (/sitemap.*\.xml$/.test(name) && path.dirname(full) === dir) tepSitemap.push(name);
    }
  };
  duyet(dir);

  const ketQua = { tep: [], index: [], tongUrlTrang: 0, enUrl: 0, viUrl: 0, kiemTra: {} };
  for (const t of tepSitemap) {
    const noiDung = fs.readFileSync(path.join(dir, t), 'utf8');
    const laIndex = /<sitemapindex/i.test(noiDung);
    if (laIndex) {
      const soThamChieu = (noiDung.match(/<loc>/g) || []).length;
      ketQua.index.push({ tep: t, thamChieuSitemapCon: soThamChieu });
      continue;
    }
    // Sitemap URL trang: chỉ đếm <loc> KHÔNG đuôi .xml (loại mọi tham chiếu sitemap khác nếu lọt)
    const cacLoc = (noiDung.match(/<loc>([^<]*)<\/loc>/g) || []).map(s => s.replace(/<\/?loc>/g, ''));
    const urlTrang = cacLoc.filter(u => !/\.xml$/i.test(u));
    const urlXmlLoi = cacLoc.length - urlTrang.length;
    const en = urlTrang.filter(u => /\/en\//.test(u)).length;
    ketQua.tep.push({ tep: t, urlTrang: urlTrang.length, enUrl: en, locXmlBiLoai: urlXmlLoi });
    ketQua.tongUrlTrang += urlTrang.length;
    ketQua.enUrl += en;
  }
  ketQua.viUrl = ketQua.tongUrlTrang - ketQua.enUrl;
  // Kiểm tra chéo: tổng URL trang = VI + EN; số loc .xml đã bị loại khỏi đếm (nếu có)
  ketQua.kiemTra = {
    tongBangViCongEn: ketQua.tongUrlTrang === ketQua.viUrl + ketQua.enUrl,
    locSitemapXmlDaLoaiKhoiDem: ketQua.tep.reduce((s, t) => s + t.locXmlBiLoai, 0),
    soTepIndex: ketQua.index.length,
    soTepUrlTrang: ketQua.tep.length,
  };
  return ketQua;
}

// ===== 4. Frontmatter related (đếm mục mảng + số bài có khóa) =====
function docRelated() {
  const dem = (col, lang, khoa) => {
    const dir = path.join(SRC_CONTENT, col, lang);
    if (!fs.existsSync(dir)) return { muc: 0, bai: 0 };
    let muc = 0, bai = 0;
    for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.md'))) {
      const dong = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
      const i = dong.findIndex(l => new RegExp('^' + khoa + ':\\s*$').test(l));
      if (i === -1) continue;
      // Khối mảng YAML: các dòng indent 2 spaces; mục = dòng "  - slug: ..."
      let soMuc = 0, j = i + 1;
      for (; j < dong.length; j++) {
        if (!/^ {2}/.test(dong[j])) break;
        if (/^ {2}- /.test(dong[j])) soMuc++;
      }
      if (soMuc > 0) { muc += soMuc; bai++; }
    }
    return { muc, bai };
  };
  return {
    relatedModels_iconic: dem('mauIconic', 'vi', 'relatedModels'),
    relatedModels_coChe: dem('coChe', 'vi', 'relatedModels'),
    relatedMechanisms_iconic: dem('mauIconic', 'vi', 'relatedMechanisms'),
  };
}

// ===== 5. Timeline =====
function docTimeline() {
  const data = JSON.parse(fs.readFileSync(path.join(goc, 'src', 'data', 'timeline.json'), 'utf8'));
  const arr = Array.isArray(data) ? data : (data.mocs || data.items || Object.values(data)[0]);
  const svgDir = path.join(goc, 'public', 'images', 'timeline');
  const svg = fs.existsSync(svgDir) ? fs.readdirSync(svgDir).filter(f => f.endsWith('.svg')) : [];
  return { soMoc: arr.length, soSvg: svg.length };
}

// ===== 6. Khối nguồn (sources) theo collection =====
function docNguon() {
  const ketQua = {};
  for (const col of ['thuongHieu', 'mauIconic', 'coChe', 'tuDien', 'huongDan']) {
    const dir = path.join(SRC_CONTENT, col, 'vi');
    if (!fs.existsSync(dir)) { ketQua[col] = { co: 0, tong: 0 }; continue; }
    let co = 0, tong = 0;
    for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.md'))) {
      tong++;
      const nd = fs.readFileSync(path.join(dir, f), 'utf8');
      if (/^sources:\s*$/m.test(nd)) co++;
    }
    ketQua[col] = { co, tong };
  }
  return ketQua;
}

// ===== Chạy + ghi =====
const ketQua = {
  moTa: 'P1.5 đo số liệu tài liệu hiện trạng — node output/p1.5-documentation-sync/do-so-lieu.cjs',
  thoiDiemDo: new Date().toISOString(),
  head: require('child_process').execSync('git rev-parse --short HEAD', { cwd: goc }).toString().trim(),
  markdown: docCollection(),
  dist: docDist(),
  sitemap: docSitemap(),
  related: docRelated(),
  timeline: docTimeline(),
  nguon: docNguon(),
};
fs.writeFileSync(path.join(__dirname, 'ket-qua-do.json'), JSON.stringify(ketQua, null, 2));

// Tổng hợp stdout
const m = ketQua.markdown;
console.log('HEAD ' + ketQua.head + ' | đo ' + ketQua.thoiDiemDo);
console.log('--- Markdown (đĩa; draft đọc trọn frontmatter) ---');
for (const [col, muc] of Object.entries(m.collections)) {
  console.log(col + ': vi=' + muc.vi.tepTrenDia + ' (draft ' + muc.vi.draftTrue + ') | en=' + muc.en.tepTrenDia + ' (draft ' + muc.en.draftTrue + ')');
}
console.log('TỔNG: bài VI 5 collection nội dung = ' + m.tong.viBaiNoiDung_5collection
  + ' | trang pháp lý VI (trang) = ' + m.tong.trangPhapLyVi_collectionTrang
  + ' | bài EN 5 collection = ' + m.tong.enBai_5collection
  + ' | TỔNG Markdown = ' + m.tong.tongMarkdownTatCa
  + ' (không đồng nhất với 286 HTML build)');
console.log('--- dist HTML ---');
console.log('tongHtml=' + ketQua.dist.tongHtml + ' | vi=' + ketQua.dist.vi + ' | en=' + ketQua.dist.en + ' | khác=' + JSON.stringify(ketQua.dist.khac) + ' | có 404.html=' + ketQua.dist.co404);
console.log('--- sitemap (index tách khỏi URL trang) ---');
console.log(JSON.stringify(ketQua.sitemap));
console.log('--- related (frontmatter) ---');
console.log(JSON.stringify(ketQua.related));
console.log('--- timeline ---');
console.log(JSON.stringify(ketQua.timeline));
console.log('--- nguồn (khối sources, bài vi) ---');
console.log(JSON.stringify(ketQua.nguon));
