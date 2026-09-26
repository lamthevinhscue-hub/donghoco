// =============================================================================
// check-c1-accuracy-log.mjs — Kiểm C1: công cụ "Nhật ký sai số" song ngữ
// =============================================================================
// Hai chế độ (giống các checker cụm khác):
//   node scripts/check-c1-accuracy-log.mjs        → kiểm SOURCE (npm run check)
//   node scripts/check-c1-accuracy-log.mjs dist   → kiểm SOURCE + DIST (npm run build)
// Nhóm kiểm:
//   C1-1  Cặp route /nhat-ky-sai-so ↔ /en/accuracy-log/ khai báo trong contentRoutes
//   C1-2  Hai trang wrapper tồn tại, dùng AccuracyLog với đúng lang
//   C1-3  Khóa i18n acc_* đầy đủ ở cả vi và en
//   C1-4  Component: local-only + sao lưu + no-JS fallback; không API mạng;
//         localStorage + nhiều đồng hồ + CRUD + xác nhận xóa; CSV xuất/nhập
//         (header ổn định, kiểm ngày/giây, chỉ-thêm có xác nhận, không thực thi);
//         biểu đồ SVG + bảng HTML; aria-live; không thư viện ngoài
//   C1-5  Chuỗi cấm không chẩn đoán sạch trên component/trang/khóa acc_*
//   C1-6  (dist) Hai route: 1 H1, khối thông báo, UI khởi tạo, bảng + nhãn,
//         canonical/hreflang/switcher, lối vào từ bài hướng dẫn, link không hỏng
// Exit 1 nếu có lỗi. Env: C1_ROOT để chạy trên bản sao.
// =============================================================================
import { readFileSync, existsSync } from 'node:fs';
import * as path from 'node:path';
const { join } = path;

const ROOT = path.resolve(process.env.C1_ROOT ?? process.cwd());
const DIST = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? null;
const distDir = DIST ? (path.isAbsolute(DIST) ? DIST : path.join(ROOT, DIST)) : null;

const errors = [];
const fail = (id, msg) => {
  errors.push(`[${id}] ${msg}`);
  console.log(`  LỖI  [${id}] ${msg}`);
};
const pass = (id, msg) => console.log(`  ĐẠT  [${id}] ${msg}`);

const compPath = join(ROOT, 'src', 'components', 'AccuracyLog.astro');
const viPage = join(ROOT, 'src', 'pages', 'nhat-ky-sai-so', 'index.astro');
const enPage = join(ROOT, 'src', 'pages', 'en', 'accuracy-log', 'index.astro');
const routesPath = join(ROOT, 'src', 'i18n', 'contentRoutes.ts');
const uiPath = join(ROOT, 'src', 'i18n', 'ui.ts');

// Chuỗi cấm — công cụ chỉ ghi nhận, không chẩn đoán/kết luận tình trạng
const CAM_VI = ['chẩn đoán', 'hỏng', 'bình thường', 'bất thường', 'cần sửa', 'chuẩn ngành', 'tự điều chỉnh', 'nguyên nhân'];
const CAM_EN_RE = [/\bdiagnos\w*/i, /\bbroken\b/i, /\bfaulty\b/i, /\babnormal\b/i, /\bmalfunction\w*/i, /\brepair\b/i, /industry standard/i, /self[- ]adjust/i];

// ---- C1-1: registry cặp route
const routes = existsSync(routesPath) ? readFileSync(routesPath, 'utf8') : '';
const coCap =
  routes.includes("vi: '/nhat-ky-sai-so'") &&
  routes.includes("en: '/en/accuracy-log/'") &&
  /vi:\s*'\/nhat-ky-sai-so',\s*en:\s*'\/en\/accuracy-log\/'/.test(routes);
if (coCap) pass('C1-1', 'contentRoutes khai báo cặp /nhat-ky-sai-so ↔ /en/accuracy-log/ trong STATIC_PAIRS');
else fail('C1-1', 'Thiếu hoặc sai cặp route /nhat-ky-sai-so ↔ /en/accuracy-log/ trong contentRoutes.ts');

// ---- C1-2: hai trang wrapper
const kiemTrang = (p, lang, filePath) => {
  if (!existsSync(p)) {
    fail('C1-2', `Thiếu trang ${filePath}`);
    return false;
  }
  const s = readFileSync(p, 'utf8');
  const ok = s.includes('AccuracyLog') && new RegExp(`<AccuracyLog lang="${lang}"`).test(s);
  if (!ok) fail('C1-2', `${filePath}: không dùng AccuracyLog với lang="${lang}"`);
  return ok;
};
const okVi = kiemTrang(viPage, 'vi', 'src/pages/nhat-ky-sai-so/index.astro');
const okEn = kiemTrang(enPage, 'en', 'src/pages/en/accuracy-log/index.astro');
if (okVi && okEn) pass('C1-2', 'Hai trang wrapper dùng AccuracyLog với lang vi/en đúng');

// ---- C1-3: khóa i18n acc_*
const uiSrc = existsSync(uiPath) ? readFileSync(uiPath, 'utf8') : '';
const khongCoKey = [];
for (const k of ['acc_h1', 'acc_intro', 'acc_notice_local_title', 'acc_notice_local', 'acc_notice_backup', 'acc_link_guide', 'acc_nojs', 'acc_watch_add', 'acc_watch_rename', 'acc_watch_delete', 'acc_watch_selected_label', 'acc_record_add', 'acc_record_edit', 'acc_record_delete', 'acc_th_date', 'acc_th_offset', 'acc_th_note', 'acc_th_actions', 'acc_csv_export', 'acc_csv_import_add', 'acc_err_date', 'acc_err_offset', 'acc_err_csv_header', 'acc_chart_aria', 'acc_confirm_delete_watch', 'acc_confirm_import']) {
  if (!uiSrc.includes(`${k}:`)) khongCoKey.push(k);
}
const viKhoi = uiSrc.slice(uiSrc.indexOf('  vi: {'), uiSrc.indexOf('  en: {'));
const enKhoi = uiSrc.slice(uiSrc.indexOf('  en: {'));
const thieu = [];
if (viKhoi && enKhoi) {
  for (const k of ['acc_h1', 'acc_intro', 'acc_notice_local_title', 'acc_notice_local', 'acc_notice_backup', 'acc_link_guide', 'acc_nojs', 'acc_watch_add', 'acc_watch_rename', 'acc_watch_delete', 'acc_record_add', 'acc_record_edit', 'acc_record_delete', 'acc_th_date', 'acc_th_offset', 'acc_th_note', 'acc_th_actions', 'acc_csv_export', 'acc_csv_import_add', 'acc_confirm_delete_watch', 'acc_confirm_import', 'acc_err_name', 'acc_err_date', 'acc_err_offset', 'acc_err_csv_header', 'acc_csv_result', 'acc_chart_aria', 'acc_empty_watches', 'acc_empty_records']) {
    if (!viKhoi.includes(`${k}:`)) thieu.push(`vi.${k}`);
    if (!enKhoi.includes(`${k}:`)) thieu.push(`en.${k}`);
  }
}
if (khongCoKey.length === 0 && thieu.length === 0) pass('C1-3', 'Khóa i18n acc_* đầy đủ ở cả khối vi và en');
else fail('C1-3', `Khóa acc_* thiếu: ${[...khongCoKey, ...thieu].join(', ')}`);

// ---- C1-4: component — chức năng
const comp = existsSync(compPath) ? readFileSync(compPath, 'utf8') : '';
let ok4 = true;
const canCo = [
  ['localStorage', 'lưu localStorage'],
  ['c1-accuracy-log-v1', 'khóa storage'],
  ['acc-new-name', 'ô tạo/đổi tên đồng hồ'],
  ['acc-add-watch', 'nút thêm đồng hồ'],
  ['acc-rename-watch', 'nút đổi tên'],
  ['acc-delete-watch', 'nút xóa đồng hồ'],
  ['acc-watch-select', 'chọn đồng hồ đang xem'],
  ['acc_confirm_delete_watch', 'xác nhận xóa đồng hồ'],
  ['acc-record-form', 'biểu mẫu bản ghi'],
  ['acc-date', 'ngày quan sát'],
  ['acc-offset', 'độ lệch giây'],
  ['acc-note', 'ghi chú'],
  ['acc_record_edit', 'nút sửa bản ghi'],
  ['acc_record_delete', 'nút xóa bản ghi'],
  ['acc-table', 'bảng HTML'],
  ['acc_th_date', 'nhãn cột ngày'],
  ['acc-chart', 'biểu đồ'],
  ['acc-nojs', 'thông báo cần JavaScript'],
  ['acc-csv-export', 'xuất CSV'],
  ['acc-import-file', 'nhập CSV'],
  ['FileReader', 'đọc tệp cục bộ'],
  ['confirm(', 'xác nhận trước khi xóa/nhập'],
  ['aria-live', 'thông báo trạng thái'],
  ['hidden', 'no-JS fallback'],
  ['isValidDate', 'kiểm ngày hợp lệ khi nhập CSV/bản ghi'],
  ['RE_NUM', 'kiểm số giây khi nhập CSV'],
];
for (const [chuoi, mota] of canCo) {
  if (!comp.includes(chuoi)) {
    fail('C1-4', `Component thiếu ${mota} (${chuoi})`);
    ok4 = false;
  }
}
// header CSV ổn định + kiểm cấu trúc nhập
for (const cot of ['watch_id', 'watch_name', 'offset_seconds']) {
  if (!comp.includes(cot)) {
    fail('C1-4', `CSV thiếu cột ${cot}`);
    ok4 = false;
  }
}
if (!/RE_DATE/.test(comp) || !/\\d\{4\}/.test(comp)) {
  fail('C1-4', 'CSV/thông tin ngày thiếu kiểm định dạng ngày');
  ok4 = false;
}
// cấm API mạng + thư viện biểu đồ ngoài — áp trên khối script (phần chạy thật;
// comment header liệt kê tên API cấm là tài liệu, không phải lệnh gọi)
const scriptKhoi = (comp.match(/<script>([\s\S]*?)<\/script>/) ?? [])[1] ?? '';
const MANG_CAM = ['fetch(', 'XMLHttpRequest', 'WebSocket', 'EventSource', 'axios', 'chart.js', 'new Chart(', 'd3.', 'new Image()'];
const leakMang = MANG_CAM.filter((s) => scriptKhoi.includes(s));
if (leakMang.length > 0) {
  fail('C1-4', `Script có dấu hiệu mạng/thư viện ngoài: ${leakMang.join(', ')}`);
  ok4 = false;
}
if (/\bimport\s/.test(scriptKhoi)) {
  fail('C1-4', 'Script client có import — phải thuần DOM/localStorage');
  ok4 = false;
}
// Nguyên tử nhập CSV: trong handler import, mọi lệnh ghi store phải nằm giữa
// marker BẮT ĐẦU/KẾT THÚC GHI (sau window.confirm). Lệnh ghi nằm trước marker
// trong handler = fail. Các handler khác (thêm đồng hồ, submit bản ghi) không
// thuộc kiểm này.
const viTriBatDauGhi = comp.indexOf('BẮT ĐẦU GHI');
const viTriKetThucGhi = comp.indexOf('KẾT THÚC GHI');
const batDauHandler = comp.indexOf("$('acc-import')");
if (viTriBatDauGhi < 0 || viTriKetThucGhi <= viTriBatDauGhi || batDauHandler < 0) {
  fail('C1-4', 'Thiếu vùng ghi nguyên tử (marker BẮT ĐẦU/KẾT THÚC GHI) hoặc handler import');
  ok4 = false;
} else {
  const khoiImport = comp.slice(batDauHandler, viTriKetThucGhi);
  for (const lg of ['store.watches.push', 'store.records.push']) {
    let viTri = khoiImport.indexOf(lg);
    while (viTri >= 0) {
      if (khoiImport.slice(0, viTri).indexOf('BẮT ĐẦU GHI') < 0) {
        fail('C1-4', `Lệnh ghi ${lg} chạy trước xác nhận trong handler import — nhập không nguyên tử`);
        ok4 = false;
        break;
      }
      viTri = khoiImport.indexOf(lg, viTri + 1);
    }
  }
}
// Parser CSV phải quote-aware toàn văn (parseCsvVanBan + cờ biHong); cấm split
// theo dòng trước khi parse (lỗ hổng ghi chú nhiều dòng)
if (!comp.includes('parseCsvVanBan') || !comp.includes('biHong')) {
  fail('C1-4', 'Thiếu parser CSV toàn văn quote-aware (parseCsvVanBan/biHong)');
  ok4 = false;
}
if (/split\(\/\\r\\n\|/.test(comp)) {
  fail('C1-4', 'CSV vẫn tách theo dòng trước khi parse — mất ghi chú nhiều dòng');
  ok4 = false;
}
if (ok4) pass('C1-4', 'Component: localStorage + đa đồng hồ + CRUD + xác nhận + CSV hai chiều + SVG/bảng + aria-live + no-JS, không API mạng, không thư viện ngoài');

// ---- C1-5: chuỗi cấm
const trangText = (existsSync(viPage) ? readFileSync(viPage, 'utf8') : '') + '\n' + (existsSync(enPage) ? readFileSync(enPage, 'utf8') : '');
const accDong = uiSrc.split('\n').filter((l) => l.trim().startsWith('acc_')).join('\n');
const noiQuet = [
  ['component', comp],
  ['trang wrapper', trangText],
  ['khóa acc_*', accDong],
];
let saiCam = false;
for (const [ten, noi] of noiQuet) {
  for (const tu of CAM_VI) {
    if (noi.includes(tu)) {
      fail('C1-5', `${ten}: còn chuỗi cấm "${tu}"`);
      saiCam = true;
    }
  }
  for (const re of CAM_EN_RE) {
    const m = noi.match(re);
    if (m) {
      fail('C1-5', `${ten}: còn chuỗi cấm EN ${re} — "${m[0]}"`);
      saiCam = true;
    }
  }
}
if (!saiCam) pass('C1-5', 'Chuỗi cấm không chẩn đoán sạch trên component, trang và khóa acc_*');

// ---- C1-6: dist
if (distDir) {
  const viDist = join(distDir, 'nhat-ky-sai-so', 'index.html');
  const enDist = join(distDir, 'en', 'accuracy-log', 'index.html');
  for (const [ten, p, canh, guideHref] of [
    ['VI', viDist, '/nhat-ky-sai-so/', '/huong-dan/do-sai-so'],
    ['EN', enDist, '/en/accuracy-log/', '/en/guides/accuracy-tracking/'],
  ]) {
    if (!existsSync(p)) {
      fail('C1-6', `Dist thiếu route ${ten}: ${p}`);
      continue;
    }
    const html = readFileSync(p, 'utf8');
    const soH1 = (html.match(/<h1[\s>]/g) ?? []).length;
    if (soH1 !== 1) fail('C1-6', `${ten}: ${soH1} H1 (kỳ vọng 1)`);
    if (!html.includes('data-accuracy-log')) fail('C1-6', `${ten}: thiếu khối công cụ (data-accuracy-log)`);
    if (!html.includes('acc-table')) fail('C1-6', `${ten}: thiếu bảng HTML`);
    if ((html.match(/<th scope="col"/g) ?? []).length < 4) fail('C1-6', `${ten}: thiếu nhãn cột bảng (<th scope=col> ít hơn 4)`);
    if (!html.includes('acc-chart')) fail('C1-6', `${ten}: thiếu vùng biểu đồ`);
    if (!html.includes('acc-nojs')) fail('C1-6', `${ten}: thiếu thông báo no-JS`);
    if (!html.includes('acc-tool')) fail('C1-6', `${ten}: thiếu khối UI khởi tạo (acc-tool)`);
    if (!html.includes(`href="${guideHref}"`)) fail('C1-6', `${ten}: thiếu lối vào bài hướng dẫn ${guideHref}`);
    const can = (html.match(/rel="canonical" href="([^"]*)"/) ?? [])[1] ?? '';
    if (!can.endsWith(canh)) fail('C1-6', `${ten}: canonical sai — ${can}`);
    const hreflangKhac = ten === 'VI' ? /hreflang="en" href="[^"]*\/en\/accuracy-log\/"/ : /hreflang="vi" href="[^"]*\/nhat-ky-sai-so"/;
    if (!hreflangKhac.test(html)) fail('C1-6', `${ten}: thiếu hreflang đối ứng`);
    const switcherHref = ten === 'VI' ? 'href="/en/accuracy-log/"' : 'href="/nhat-ky-sai-so"';
    if (!html.includes(switcherHref)) fail('C1-6', `${ten}: thiếu switcher ${switcherHref}`);
    // link nội bộ không hỏng: mọi href nội bộ phải tồn tại trong dist
    const hrefs = [...html.matchAll(/href="(\/[^"][^"]*)"/g)].map((m) => m[1]).filter((h) => !h.startsWith('/_astro') && !h.startsWith('/fonts'));
    const hong = [];
    for (const h of [...new Set(hrefs)]) {
      const clean = h.split('#')[0].replace(/\/$/, '');
      if (clean === '') continue;
      const kandidat = [join(distDir, clean, 'index.html'), join(distDir, clean + '.html'), join(distDir, clean)];
      if (!kandidat.some((k) => existsSync(k))) hong.push(h);
    }
    if (hong.length > 0) fail('C1-6', `${ten}: link hỏng — ${hong.join(', ')}`);
    // chuỗi cấm trên dist
    const bodyText = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]*>/g, ' ');
    for (const tu of CAM_VI) {
      if (bodyText.includes(tu)) fail('C1-6', `${ten}: dist còn chuỗi cấm "${tu}"`);
    }
    for (const re of CAM_EN_RE) {
      const m = bodyText.match(re);
      if (m) fail('C1-6', `${ten}: dist còn chuỗi cấm EN — "${m[0]}"`);
    }
  }
  const haiRoute = existsSync(viDist) && existsSync(enDist);
  if (haiRoute && !errors.some((e) => e.startsWith('[C1-6]'))) {
    pass('C1-6', 'Dist: hai route VI/EN — 1 H1, thông báo, UI, bảng/nhãn, biểu đồ, canonical/hreflang/switcher, lối vào bài hướng dẫn, không link hỏng, sạch chuỗi cấm');
  }
}

// ---- Kết luận
console.log('KIỂM TRA C1 — NHẬT KÝ SAI SỐ:');
if (errors.length > 0) {
  console.log(`  KẾT LUẬN: KHÔNG ĐẠT (${errors.length} lỗi)`);
  process.exit(1);
}
console.log(`  KẾT LUẬN: ĐẠT${distDir ? ' (source + dist)' : ' (source)'} — công cụ ghi nhận cục bộ, hai ngôn ngữ, không chẩn đoán.`);
