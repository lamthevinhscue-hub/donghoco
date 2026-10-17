// D10 — checker Nhật ký sai số dễ tìm (v2 sau chỉ dẫn TXN-20261017-76):
// - Nguồn: bước CUỐI bat-dau-choi (VI) và Route 1 EN sau khi bỏ comment; khóa acc_guide_first_*
//   2 ngôn ngữ; N5 đối chiếu hash khối script vận hành AccuracyLog với nền 87a80e7
//   (chuẩn hóa newline — không dựa Git history).
// - Dist: parse5 — chỉ nhận <a href> THẬT trong nội dung (loại comment/template/hidden);
//   nội dung hướng dẫn là văn bản hiển thị trong khối nhật ký (bỏ comment/script/style/
//   template/hidden), đủ 5 ý + thông báo lưu cục bộ/CSV cho cả VI/EN.
// Tham số: [--root <dir>] [--dist <dir>]; lạ/thiếu → KHONG DAT D10-ARG, không crash.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const napGoi = createRequire(join(REPO, 'package.json'));
let root = REPO;
let distDir = null;
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--root' || args[i] === '--dist') {
    const v = args[i + 1];
    if (v == null || v.startsWith('--')) { console.error('KHONG DAT D10-ARG: ' + args[i] + ' thiếu giá trị'); process.exit(1); }
    if (args[i] === '--root') root = resolve(v); else distDir = resolve(v);
    i++;
  }
  else { console.error('KHONG DAT D10-ARG: tham số không hợp lệ ' + args[i]); process.exit(1); }
}

const parse5 = napGoi('parse5');
const loi = [];
const fail = (ma, msg) => loi.push(ma + ': ' + msg);
const đọc = (f) => { try { return readFileSync(join(root, f), 'utf8'); } catch { return null; } };
const boCommentJS = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const boCommentHtml = (s) => s.replace(/<!--[\s\S]*?-->/g, '');
const HASH_NEN = '9f1db1e0306cdbff67de370d5be8bb184e21e5b48964d6e65e771328ba2e9ea2';

// parse5: cây DOM + bộ lấy chữ hiển thị (bỏ script/style/template/hidden và con cháu hidden)
function cayParse(html) {
  return parse5.parse(html);
}
function laAn(nut) {
  let n = nut;
  while (n) {
    const ten = (n.tagName ?? '').toLowerCase();
    if (ten === 'script' || ten === 'style' || ten === 'template') return true;
    if (n.attrs?.some((a) => a.name === 'hidden')) return true;
    const style = n.attrs?.find((a) => a.name === 'style')?.value ?? '';
    if (/display\s*:\s*none/i.test(style)) return true;
    n = n.parentNode;
  }
  return false;
}
function lienKetThat(nut, ra) {
  for (const con of nut.childNodes ?? []) {
    if (con.nodeName === 'a') {
      if (!laAn(con)) {
        const href = con.attrs?.find((a) => a.name === 'href')?.value ?? '';
        ra.push(href);
      }
    } else if (con.nodeName !== '#text') lienKetThat(con, ra);
  }
}

// N1. Lộ trình VI: bat-dau-choi — bước CUỐI là /nhat-ky-sai-so (đã bỏ comment JS)
const lpGoc = đọc('src/data/learningPaths.ts');
if (!lpGoc) fail('D10-N1', 'thiếu src/data/learningPaths.ts');
else {
  const lp = boCommentJS(lpGoc);
  const iBat = lp.indexOf("id: 'bat-dau-choi'");
  if (iBat < 0) fail('D10-N1', 'không thấy lộ trình bat-dau-choi');
  else {
    const doan = lp.slice(iBat, lp.indexOf("id: 'hieu-bo-may'") > 0 ? lp.indexOf("id: 'hieu-bo-may'") : undefined);
    const cacHref = [...doan.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1]);
    if (cacHref[cacHref.length - 1] !== '/nhat-ky-sai-so') fail('D10-N1', 'bước cuối bat-dau-choi không phải /nhat-ky-sai-so: ' + cacHref[cacHref.length - 1]);
    if (!/Ghi lại độ lệch bạn quan sát được và tự sao lưu các bản ghi\./.test(doan)) fail('D10-N1', 'thiếu lý do chuẩn của bước Nhật ký sai số');
    if (!/sáu bước cần thiết nhất/.test(doan)) fail('D10-N1', 'thiếu mô tả "sáu bước"');
    if (/năm bước cần thiết nhất/.test(doan)) fail('D10-N1', 'vẫn còn "năm bước"');
  }
}

// N2. Route 1 EN: bước CUỐI là /en/accuracy-log/ nhãn Accuracy log (đã bỏ comment HTML)
const lpEnGoc = đọc('src/pages/en/learning-path.astro');
if (!lpEnGoc) fail('D10-N2', 'thiếu src/pages/en/learning-path.astro');
else {
  const lpEn = boCommentHtml(lpEnGoc);
  const iR1 = lpEn.indexOf('id="lp-beginner"');
  const iR2 = lpEn.indexOf('id="lp-movement"');
  if (iR1 < 0 || iR2 < 0) fail('D10-N2', 'không thấy Route 1/Route 2');
  else {
    const doan = lpEn.slice(iR1, iR2);
    const cacHref = [...doan.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    if (cacHref[cacHref.length - 1] !== '/en/accuracy-log/') fail('D10-N2', 'bước cuối Route 1 không phải /en/accuracy-log/: ' + cacHref[cacHref.length - 1]);
    if (!/Accuracy log/.test(doan)) fail('D10-N2', 'thiếu nhãn "Accuracy log"');
  }
}

// N3. Khóa hướng dẫn acc_guide_first_* đủ 2 ngôn ngữ + notice không đồng bộ + giới hạn CSV
const ui = đọc('src/i18n/ui.ts');
if (!ui) fail('D10-N3', 'thiếu src/i18n/ui.ts');
else {
  const uiSach = boCommentJS(ui);
  for (const k of ['acc_guide_first_title', 'acc_guide_first_1', 'acc_guide_first_2', 'acc_guide_first_3', 'acc_guide_first_4', 'acc_guide_first_5']) {
    const đếm = uiSach.split('\n').filter((d) => d.includes(k + ':')).length;
    if (đếm !== 2) fail('D10-N3', 'khóa ' + k + ' phải có đúng 2 ngôn ngữ, thấy ' + đếm);
  }
  if (!/không tự đồng bộ sang trình duyệt, thiết bị hay địa chỉ website khác/.test(uiSach)) fail('D10-N3', 'thiếu ghi không tự đồng bộ (VI)');
  if (!/does not sync by itself to another browser, device, or site address/.test(uiSach)) fail('D10-N3', 'thiếu ghi không tự đồng bộ (EN)');
  if (!/không phải bản sao đầy đủ mọi đồng hồ hay cấu hình/.test(uiSach)) fail('D10-N3', 'thiếu giới hạn CSV (VI)');
  if (!/not a full copy of every watch or setting/.test(uiSach)) fail('D10-N3', 'thiếu giới hạn CSV (EN)');
}

// N4. AccuracyLog hiển thị khối hướng dẫn bằng khóa, NGOÀI comment/template
const accGoc = đọc('src/components/AccuracyLog.astro');
if (!accGoc) fail('D10-N4', 'thiếu src/components/AccuracyLog.astro');
else {
  const accSach = boCommentHtml(accGoc).replace(/<template[\s\S]*?<\/template>/gi, '');
  for (const k of ['acc_guide_first_title', 'acc_guide_first_1', 'acc_guide_first_2', 'acc_guide_first_3', 'acc_guide_first_4', 'acc_guide_first_5']) {
    if (!accSach.includes('{tr.' + k + '}')) fail('D10-N4', 'AccuracyLog không hiển thị {tr.' + k + '} ngoài comment/template');
  }
}

// N5. Khối script vận hành AccuracyLog nguyên trạng so với nền 87a80e7 (chuẩn hóa newline)
if (accGoc) {
  const khoi = [...accGoc.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const hienTai = createHash('sha256').update(khoi.join('\n').replace(/\r\n/g, '\n'), 'utf8').digest('hex');
  if (hienTai !== HASH_NEN) fail('D10-N5', 'khối script vận hành AccuracyLog khác nền 87a80e7 (hash ' + hienTai.slice(0, 12) + ')');
}

// Dist: hai điểm vào/ngôn ngữ bằng <a href> THẬT (parse5) + nội dung hiển thị thật
if (distDir != null) {
  const đọcDist = (f) => { try { return readFileSync(join(distDir, f), 'utf8'); } catch { return null; } };
  const coLienKet = (html, mau) => {
    if (!html) return null;
    const ds = [];
    lienKetThat(cayParse(html), ds);
    return ds.some((h) => mau.test(h));
  };
  // D-D1: VI — bài đo sai số + lộ trình đều có liên kết thật tới /nhat-ky-sai-so[/]
  const viBai = đọcDist('huong-dan/do-sai-so/index.html');
  const viLo = đọcDist('lo-trinh-hoc-dong-ho/index.html');
  if (viBai == null) fail('D10-D1', 'dist thiếu bài đo sai số VI');
  else if (!coLienKet(viBai, /^\/nhat-ky-sai-so\/?$/)) fail('D10-D1', 'bài VI không có liên kết thật tới nhật ký VI');
  if (viLo == null) fail('D10-D1', 'dist thiếu trang lộ trình VI');
  else if (!coLienKet(viLo, /^\/nhat-ky-sai-so\/?$/)) fail('D10-D1', 'lộ trình VI không có liên kết thật tới nhật ký VI');
  if (!existsSync(join(distDir, 'nhat-ky-sai-so', 'index.html'))) fail('D10-D1', 'dist thiếu trang nhật ký VI');

  // D-D2: EN — hai điểm vào thật; không dẫn nhầm nhật ký VI
  const enBai = đọcDist('en/guides/accuracy-tracking/index.html');
  const enLo = đọcDist('en/learning-path/index.html');
  if (enBai == null) fail('D10-D2', 'dist thiếu bài EN');
  else if (!coLienKet(enBai, /^\/en\/accuracy-log\/?$/)) fail('D10-D2', 'bài EN không có liên kết thật tới nhật ký EN');
  if (enLo == null) fail('D10-D2', 'dist thiếu lộ trình EN');
  else if (!coLienKet(enLo, /^\/en\/accuracy-log\/?$/)) fail('D10-D2', 'lộ trình EN không có liên kết thật tới nhật ký EN');
  if (enBai != null && coLienKet(enBai, /^\/nhat-ky-sai-so\/?$/)) fail('D10-D2', 'bài EN dẫn nhầm nhật ký VI');
  if (!existsSync(join(distDir, 'en', 'accuracy-log', 'index.html'))) fail('D10-D2', 'dist thiếu trang nhật ký EN');

  // D-D3: nội dung hiển thị nằm trong ĐÚNG section[data-accuracy-log] từng ngôn ngữ —
  // định vị section, khối hướng dẫn đủ 5 mục ĐÚNG THỨ TỰ, notice + giới hạn CSV thuộc
  // section (không dùng chữ nơi khác bù cho mục mất).
  const timSection = (html) => {
    if (html == null) return null;
    const duyet = (nut) => {
      for (const con of nut.childNodes ?? []) {
        if (con.nodeName === 'section' && con.attrs?.some((a) => a.name === 'data-accuracy-log')) return con;
        const kq = duyet(con);
        if (kq) return kq;
      }
      return null;
    };
    return duyet(cayParse(html));
  };
  const chuTrong = (nut) => {
    const ra = [];
    (function quet(n) {
      for (const con of n.childNodes ?? []) {
        if (con.nodeName === '#text') { if (!laAn(con)) ra.push(con.value); }
        else if (!laAn(con)) quet(con);
      }
    })(nut);
    return ra.join(' ');
  };
  const mucOl = (nut) => {
    const ds = [];
    (function tim(n) {
      for (const con of n.childNodes ?? []) {
        if (con.nodeName === 'ol') {
          for (const li of con.childNodes ?? []) if (li.nodeName === 'li') ds.push(chuTrong(li).trim());
          return ds;
        }
        const kq = tim(con);
        if (kq.length) return kq;
      }
      return ds;
    })(nut);
    return ds;
  };
  const chuanHoa = (x) => x.replace(/\s+/g, ' ').trim();
  const YEU_CAU = {
    vi: {
      tieuDe: 'Bắt đầu lần đầu',
      muc: [
        'Nhập tên chiếc đồng hồ rồi chọn “Thêm đồng hồ”.',
        'Chọn đồng hồ, ngày quan sát, nhập độ lệch tính bằng giây so với mốc tham chiếu đã chọn; thêm ghi chú nếu muốn rồi lưu bản ghi.',
        'Ví dụ minh họa: nhập +5 nếu đồng hồ đang hiển thị nhanh hơn mốc tham chiếu 5 giây. Đây là số giả định để hướng dẫn nhập, không phải mức chuẩn hay kết luận về bộ máy.',
        'Bấm “Xuất CSV” để tải các bản ghi về máy và giữ tệp ở nơi bạn tự quản lý.',
        'Khi cần, chọn tệp CSV đã xuất và dùng chức năng nhập hiện có; nhập chỉ thêm bản ghi, không thay thế toàn bộ dữ liệu đang có.',
      ],
      notice: 'Nhật ký chỉ lưu trong trình duyệt trên máy bạn — không có tài khoản, không gửi dữ liệu đi đâu. Nhật ký không tự đồng bộ sang trình duyệt, thiết bị hay địa chỉ website khác; xóa dữ liệu trình duyệt có thể làm mất nhật ký.',
      csv: 'Xuất CSV định kỳ để tự sao lưu. CSV chứa các bản ghi bạn đã lưu — không phải bản sao đầy đủ mọi đồng hồ hay cấu hình, và nhập lại không khôi phục toàn bộ trạng thái.',
    },
    en: {
      tieuDe: 'Getting started for the first time',
      muc: [
        'Type your watch’s name and choose “Add watch”.',
        'Pick the watch, the observation date, and enter the offset in seconds against your chosen reference; add an optional note and save the entry.',
        'Illustrative example: enter +5 if the watch runs 5 seconds ahead of the chosen reference. This is an assumed number for input guidance, not a standard or a verdict on the movement.',
        'Choose “Export CSV” to download your entries and keep the file wherever you manage your own records.',
        'When needed, pick a previously exported CSV and use the existing import; importing only adds entries and does not replace existing data.',
      ],
      notice: 'The log is saved only in this browser on your machine — no account, nothing sent anywhere. The log does not sync by itself to another browser, device, or site address; clearing your browser data can erase the log.',
      csv: 'Export a CSV from time to time to keep your own backup. The CSV contains the entries you saved — not a full copy of every watch or setting, and importing it back does not restore the whole state.',
    },
  };
  for (const [nn, tep] of [['vi', 'nhat-ky-sai-so/index.html'], ['en', 'en/accuracy-log/index.html']]) {
    const html = đọcDist(tep);
    if (html == null) { fail('D10-D3', 'dist thiếu trang nhật ký ' + nn); continue; }
    const section = timSection(html);
    if (!section) { fail('D10-D3', 'trang ' + nn + ' không định vị được section[data-accuracy-log]'); continue; }
    const yc = YEU_CAU[nn];
    const khoiHuongDan = (function timKhoi(n) {
      for (const con of n.childNodes ?? []) {
        if (con.nodeName === 'div' && chuTrong(con).includes(yc.tieuDe)) return con;
        const kq = timKhoi(con);
        if (kq) return kq;
      }
      return null;
    })(section);
    if (!khoiHuongDan) { fail('D10-D3', 'trang ' + nn + ': khối hướng dẫn lần đầu không nằm trong section[data-accuracy-log]'); continue; }
    const cacMuc = mucOl(khoiHuongDan);
    if (cacMuc.length !== 5) fail('D10-D3', 'trang ' + nn + ': khối hướng dẫn phải đúng 5 mục, thấy ' + cacMuc.length);
    cacMuc.forEach((muc, i) => {
      const ycMuc = yc.muc[i];
      if (ycMuc && chuanHoa(muc) !== chuanHoa(ycMuc))
        fail('D10-D3', 'trang ' + nn + ': mục ' + (i + 1) + ' lệch toàn văn — kỳ vọng "' + chuanHoa(ycMuc).slice(0, 50) + '…", thấy "' + chuanHoa(muc).slice(0, 50) + '…"');
    });
    const chuSection = chuanHoa(chuTrong(section));
    if (!chuSection.includes(chuanHoa(yc.notice))) fail('D10-D3', 'trang ' + nn + ': thông báo lưu cục bộ không thuộc section (toàn văn)');
    if (!chuSection.includes(chuanHoa(yc.csv))) fail('D10-D3', 'trang ' + nn + ': giới hạn CSV không thuộc section (toàn văn)');
  }
}

if (loi.length) {
  console.error('KHONG DAT bo kiem D10 (' + loi.length + ' loi):');
  for (const l of loi) console.error('  ' + l);
  process.exit(1);
}
console.log('DAT bo kiem D10: điểm vào lộ trình VI/EN (bước cuối, ngoài comment) + khóa 2 ngôn ngữ + script vận hành nguyên hash' + (distDir != null ? ' + hai điểm vào/ngôn ngữ (liên kết thật parse5) + nội dung hiển thị thật' : ''));
