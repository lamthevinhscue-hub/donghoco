// H08 — checker RSS song ngữ. Parser XML thật: fast-xml-parser.
// Chạy trong repo:  node scripts/check-h08-rss.mjs
// Chạy trên cây temp (mutation ngoài repo):  node check-h08-rss.mjs --temp
//   (chế độ temp bỏ ca "item phải có trang dist" và ca discovery/footer,
//    vì cây temp chỉ chứa feed + src content; các ca còn lại chạy đủ).
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { XMLParser } from 'fast-xml-parser';

const temp = process.argv.includes('--temp');
const repoRoot = temp ? process.argv[process.argv.indexOf('--temp') + 1] : join(import.meta.dirname, '..');
const DIST = join(repoRoot, 'dist');
const SITE = 'https://www.kienthucdonghoco.vn';
const NHOM = ['mauIconic', 'thuongHieu', 'coChe', 'tuDien', 'huongDan'];
const ROUTE_VI = { mauIconic: '/mau-iconic/', thuongHieu: '/thuong-hieu/', coChe: '/co-che/', tuDien: '/tu-dien/', huongDan: '/huong-dan/' };
const ROUTE_EN = { mauIconic: '/en/iconic-watches/', thuongHieu: '/en/brands/', coChe: '/en/mechanisms/', tuDien: '/en/glossary/', huongDan: '/en/guides/' };
// Tên riêng tiếng Pháp hợp lệ trong bài EN (ô/è không phải tiếng Việt)
const TEN_RIENG_PHAP = ['Côtes de Genève', 'Côtes', 'guilloché', 'Genève', 'Métiers'];
const vietRe = /[\u0103\u00E2\u0111\u00EA\u00F4\u01A1\u01B0\u1EA1-\u1EF9]/;

let tongLoi = 0;
const ghi = [];
const them = (ok, ten, chiTiet) => {
  ghi.push({ dat: ok, ten, chiTiet: String(chiTiet).slice(0, 160) });
  if (!ok) tongLoi += 1;
};
const parser = new XMLParser({ ignoreAttributes: false });

// ===== Nguồn: danh sách bài published theo lang từ src/content =====
const nguonNgon = {};
const slugDaXuatBan = {};
for (const nhom of NHOM) {
  for (const lang of ['vi', 'en']) {
    const dir = join(repoRoot, 'src', 'content', nhom, lang);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.md'))) {
      const raw = readFileSync(join(dir, f), 'utf8');
      const draft = /^draft: true/m.test(raw);
      const date = (raw.match(/^date: "?([0-9-]+)"?/m) || [])[1] ?? '';
      const compat = raw.includes('Compatibility address');
      const hopLe = !draft && !compat && date !== '' && !Number.isNaN(new Date(date).getTime());
      const slug = f.replace(/\.md$/, '');
      const duongCanonical = (lang === 'en' ? ROUTE_EN[nhom] : ROUTE_VI[nhom]) + slug + '/';
      nguonNgon[lang] = nguonNgon[lang] || new Set();
      if (hopLe) nguonNgon[lang].add(duongCanonical);
      slugDaXuatBan[lang] = slugDaXuatBan[lang] || {};
      slugDaXuatBan[lang][duongCanonical] = { draft, compat, dateHopLe: date !== '' && !Number.isNaN(new Date(date).getTime()) };
    }
  }
}

// ===== Đọc + parse hai feed =====
const feeds = {};
for (const [lang, duong] of [['vi', 'rss.xml'], ['en', 'en/rss.xml']]) {
  const p = join(DIST, duong);
  if (!existsSync(p)) {
    them(false, 'feed-ton-tai', duong);
    continue;
  }
  const raw = readFileSync(p, 'utf8');
  let x = null;
  try {
    x = parser.parse(raw);
  } catch (e) {
    them(false, 'feed-parse', `${duong}: ${String(e).slice(0, 120)}`);
    continue;
  }
  them(!!x.rss && !!x.rss.channel, 'feed-cau-truc', duong);
  feeds[lang] = { raw, x, channel: x.rss?.channel ?? {} };
}
if (!feeds.vi || !feeds.en) {
  console.log(JSON.stringify({ tongLoi, ghi }, null, 2));
  process.exitCode = 1;
  process.exit(0);
}

const itemsOf = (lang) => {
  const ch = feeds[lang].channel;
  const it = ch.item ?? [];
  return Array.isArray(it) ? it : [it];
};
const itemsVi = itemsOf('vi');
const itemsEn = itemsOf('en');

// ===== S2: kênh đúng ngôn ngữ =====
them(feeds.vi.channel.title === 'Đồng Hồ Cơ — kiến thức đồng hồ cơ', 'vi-channel-title', feeds.vi.channel.title);
them(feeds.vi.channel.language === 'vi-vn', 'vi-channel-language', feeds.vi.channel.language);
them(String(feeds.vi.channel.link).startsWith(SITE), 'vi-channel-link', feeds.vi.channel.link);
them(feeds.en.channel.title === 'Đồng Hồ Cơ — mechanical watch knowledge', 'en-channel-title', feeds.en.channel.title);
them(feeds.en.channel.language === 'en-us', 'en-channel-language', feeds.en.channel.language);
them(String(feeds.en.channel.link).startsWith(SITE), 'en-channel-link', feeds.en.channel.link);

// ===== S3: item — URL/guid tuyệt đối canonical, không query, không rỗng =====
const kiemItem = (lang, items) => {
  let ok = true;
  const viPham = [];
  for (const it of items) {
    for (const truong of ['link', 'guid']) {
      const g0 = it[truong];
      const g = String(typeof g0 === 'object' && g0 !== null ? g0['#text'] ?? '' : g0 ?? '');
      if (!g.startsWith(SITE + '/') || g.includes('?') || g.includes('#')) {
        ok = false;
        viPham.push(`${truong}: ${g}`);
      }
    }
    if (!it.title || !it.description) {
      ok = false;
      viPham.push('title/description rỗng');
    }
    const path = String(it.link ?? '').replace(SITE, '');
    if (!temp) {
      const tep = join(DIST, ...path.split('/').filter(Boolean)) + '/index.html';
      if (!existsSync(tep)) {
        ok = false;
        viPham.push(`dist thiếu trang: ${path}`);
      }
    }
  }
  them(ok, `${lang}-item-url-guid`, viPham.slice(0, 3).join(' | ') || `${items.length} item đạt`);
  return ok;
};
kiemItem('vi', itemsVi);
kiemItem('en', itemsEn);

// ===== S4: không lẫn ngôn ngữ =====
const coViet = (s) => vietRe.test(String(s));
const sachTenRieng = (s) => TEN_RIENG_PHAP.reduce((acc, ten) => acc.split(ten).join(''), String(s));
them(!itemsEn.some((it) => coViet(sachTenRieng(it.title)) || coViet(sachTenRieng(it.description))), 'en-khong-ro-vi', 'title/description EN thuần EN (đã loại tên riêng Pháp)');
them(itemsVi.some((it) => coViet(it.title)), 'vi-co-dau-viet', 'feed VI có dấu tiếng Việt');
them(!feeds.en.raw.includes('Tiếng Việt') || feeds.en.channel.title !== undefined, 'en-channel', 'kênh EN khai báo language en-us');

// ===== S5: thứ tự ngày giảm dần; trùng ngày → path tăng dần =====
const kiemThuTu = (lang, items) => {
  const loi = [];
  for (let i = 1; i < items.length; i++) {
    const truoc = new Date(items[i - 1].pubDate).getTime();
    const sau = new Date(items[i].pubDate).getTime();
    if (truoc < sau) loi.push(`#${i} ngày tăng ngược: ${items[i].link}`);
    if (truoc === sau && String(items[i - 1].link) > String(items[i].link)) loi.push(`#${i} tie-break path giảm: ${items[i].link}`);
  }
  them(loi.length === 0, `${lang}-thu-tu-giam-dan`, loi.slice(0, 2).join(' | ') || `${items.length} item đúng thứ tự`);
};
kiemThuTu('vi', itemsVi);
kiemThuTu('en', itemsEn);

// ===== S6: đối chiếu nguồn — đủ bài published, không draft/compat/ngày lỗi lọt =====
const kiemNguon = (lang, items) => {
  const hopLe = nguonNgon[lang] ?? new Set();
  const loi = [];
  for (const it of items) {
    const path = String(it.link ?? '').replace(SITE, '');
    if (!hopLe.has(path)) loi.push(`item không phải bài published: ${path}`);
  }
  for (const can of hopLe) {
    if (!items.some((it) => String(it.link ?? '').replace(SITE, '') === can)) loi.push(`thiếu bài published: ${can}`);
  }
  // draft/compat/ngày lỗi trong src phải vắng mặt khỏi feed
  for (const [path, tt] of Object.entries(slugDaXuatBan[lang] ?? {})) {
    if (tt.draft || tt.compat || !tt.dateHopLe) {
      if (items.some((it) => String(it.link ?? '').replace(SITE, '') === path)) loi.push(`bài draft/compat/ngày lỗi lọt feed: ${path}`);
    }
  }
  them(loi.length === 0, `${lang}-doi-chieu-nguon`, loi.slice(0, 3).join(' | ') || `${items.length}/${hopLe.size} khớp nguồn`);
};
if (!temp || existsSync(join(repoRoot, 'src', 'content'))) {
  kiemNguon('vi', itemsVi);
  kiemNguon('en', itemsEn);
}

// ===== S7: escape XML — không có & thô ngoài entity; parse đã chứng minh cấu trúc =====
const reAmpTho = /&(?!amp;|lt;|gt;|quot;|apos;|#)/;
for (const lang of ['vi', 'en']) {
  them(!reAmpTho.test(feeds[lang].raw), `${lang}-escape-xml`, 'không có & thô ngoài entity chuẩn');
}

// ===== S10 (vòng sửa 1): cấu hình MIME RSS ở astro.config + vercel.json =====
// Chỉ chạy trong repo đầy đủ (cây temp không có hai tệp cấu hình).
if (!temp) {
  const cfg = readFileSync(join(repoRoot, 'astro.config.mjs'), 'utf8');
  const dinhMuc = { '/rss.xml': 'application/rss+xml; charset=utf-8', '/en/rss.xml': 'application/rss+xml; charset=utf-8' };
  // astro preview là server tĩnh — không có cơ chế per-path MIME qua cấu hình
  // Astro (thử nghiệm: hook configurePreviewServer của Vite plugin không được
  // gọi; server.headers là OutgoingHttpHeaders toàn cục, gây 500 mọi route).
  // Ca âm bảo vệ: config không được chứa server.headers dạng per-path.
  them(!/server:\s*\{[\s\S]*headers/.test(cfg), 'config-khong-server-headers-per-path', 'không có server.headers gây 500');
  const pVercel = join(repoRoot, 'vercel.json');
  try {
    const vJson = JSON.parse(readFileSync(pVercel, 'utf8'));
    const rules = (vJson.headers ?? []).filter((r) => dinhMuc[r.source]);
    them(rules.length === 2, 'vercel-so-rule-feed', 'rules feed: ' + rules.length);
    for (const r of rules) {
      const ct = (r.headers ?? []).find((h) => h.key === 'Content-Type');
      them(ct && ct.value === dinhMuc[r.source], 'vercel-rule-mime', r.source + ' -> ' + (ct ? ct.value : 'thiếu'));
    }
    // Không có rule rộng (bắt mọi đường) gắn MIME RSS — tránh áp nhầm cho HTML/tài sản
    const ro = (vJson.headers ?? []).filter((r) => r.source.includes('(.*)') && JSON.stringify(r.headers ?? {}).includes('application/rss+xml'));
    them(ro.length === 0, 'vercel-khong-rule-rong-mime-rss', ro.map((r) => r.source).join(',') || 'sạch');
  } catch (e) {
    them(false, 'vercel-json-parse', String(e).slice(0, 120));
  }
}

// ===== S11 (vòng sửa 2): preview thực — QUAN SÁT MIME, không là ca đạt/fail =====
// astro preview tĩnh trả `text/xml` theo đuôi .xml — quan sát được chấp nhận
// theo phán quyết H08 vòng sửa 2 (TXN-20260919-58); production đặt
// `application/rss+xml; charset=utf-8` bằng hai rule trong vercel.json.
// Vẫn bắt: HTTP khác 200 hoặc MIME không phải XML. MIME thực tế không bị che.
// Chạy khi bật cờ: node scripts/check-h08-rss.mjs --preview http://localhost:4331
const iPreview = process.argv.indexOf('--preview');
let previewMime = null;
if (iPreview > 0) {
  const goc = process.argv[iPreview + 1];
  const kiemMime = async (duong) => {
    try {
      const r = await fetch(goc + duong);
      const ct = r.headers.get('content-type') ?? '';
      const laXml = /xml/i.test(ct);
      return { status: r.status, ct, laXml };
    } catch (e) {
      return { status: 0, ct: '', laXml: false, loi: String(e).slice(0, 120) };
    }
  };
  previewMime = [];
  for (const duong of ['/rss.xml', '/en/rss.xml']) {
    const kq = await kiemMime(duong);
    const quanSat = `QUAN SÁT: HTTP ${kq.status} | ${kq.ct || '(không có)'} — astro preview tĩnh; production áp application/rss+xml qua vercel.json`;
    them(kq.status === 200 && kq.laXml, 'preview-quan-sat', duong + ' -> ' + quanSat + (kq.loi ? ' | ' + kq.loi : ''));
    previewMime.push({ duong, ...kq });
  }
}

// ===== S8+S9: discovery head + footer (chỉ chạy trong repo đầy đủ) =====
if (!temp) {
  const mauTrang = [
    ['/', 'vi', 'index.html'],
    ['/lich-su/', 'vi', 'lich-su/index.html'],
    ['/en/', 'en', 'en/index.html'],
    ['/en/history/', 'en', 'en/history/index.html'],
  ];
  for (const [, lang, tep] of mauTrang) {
    const p = join(DIST, ...tep.split('/').filter(Boolean));
    if (!existsSync(p)) {
      them(false, 'mau-trang-ton-tai', tep);
      continue;
    }
    const html = readFileSync(p, 'utf8');
    const feedHref = lang === 'vi' ? '/rss.xml' : '/en/rss.xml';
    them(html.includes(`type="application/rss+xml"`), `discovery-type ${tep}`, 'application/rss+xml');
    them(html.includes(`href="${SITE}${feedHref}"`), `discovery-href ${tep}`, feedHref);
    const footerOk = html.includes(lang === 'vi' ? 'Theo dõi qua RSS' : 'Follow via RSS');
    them(footerOk, `footer-link ${tep}`, lang);
    them(!html.includes('Để lại email') && !html.includes('Leave your email'), `footer-khong-email ${tep}`, 'không còn hứa email');
    them(!/<form\b/.test(html.slice(html.indexOf('<footer'), html.indexOf('</footer>'))), `footer-khong-form ${tep}`, 'không có form');
  }
}

console.log(JSON.stringify({ tongLoi, temp, soItem: { vi: itemsVi.length, en: itemsEn.length }, previewMime, ghi }, null, 2));
process.exitCode = tongLoi === 0 ? 0 : 1;
