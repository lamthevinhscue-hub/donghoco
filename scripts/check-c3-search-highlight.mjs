// C3 — checker tô sáng ô tìm kiếm: kiểm TRỰC TIẾP hàm sanitizeExcerpt mà sản phẩm
// (src/scripts/searchCore.ts) đang dùng, qua module src/scripts/sanitizeSearchExcerpt.mjs
// trong cây --root (checkout đang kiểm — mặc định repo).
// Ca a–f + g theo câu lệnh và sửa sau TXN-20261017-51; khẳng định bằng parse5
// (cấu trúc DOM + textContent nguyên văn), không chỉ tìm chuỗi "<mark>".
// Tham số lạ/thiếu → exit 1 mã C3-ARG. Thiếu/hỏng module → C3-N0.
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseFragment } from 'parse5';

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
let root = REPO;
const rawArgs = process.argv.slice(2);
for (let i = 0; i < rawArgs.length; i++) {
  if (rawArgs[i] === '--root') {
    const v = rawArgs[i + 1];
    if (v == null || v.startsWith('--')) { console.error('KHONG DAT C3-ARG: --root thiếu giá trị'); process.exit(1); }
    root = resolve(v);
    i++;
  } else { console.error(`KHONG DAT C3-ARG: tham số không hợp lệ "${rawArgs[i]}"`); process.exit(1); }
}

const modulePath = join(root, 'src', 'scripts', 'sanitizeSearchExcerpt.mjs');
if (!existsSync(modulePath)) { console.error(`KHONG DAT C3-N0: thiếu module ${modulePath}`); process.exit(1); }
let sanitizeExcerpt;
try {
  sanitizeExcerpt = (await import(pathToFileURL(modulePath).href)).sanitizeExcerpt;
} catch (e) { console.error(`KHONG DAT C3-N0: module hỏng: ${e.message}`); process.exit(1); }
if (typeof sanitizeExcerpt !== 'function') { console.error('KHONG DAT C3-N0: module không xuất sanitizeExcerpt'); process.exit(1); }

const loi = [];
const fail = (ma, msg) => loi.push(`${ma}: ${msg}`);
let SO_CA = 0;

// Phân tích đầu ra thành DOM: chỉ cho phép phần tử <mark> không thuộc tính + văn bản
function phanTich(html) {
  const frag = parseFragment(html);
  const phanTu = [];
  const vanBan = [];
  const duyet = (n) => {
    if (n.nodeName === '#text') { vanBan.push(n.value ?? ''); return; }
    if (n.nodeName === '#comment') { vanBan.push('[CHU-THICH]'); return; }
    phanTu.push({ ten: (n.tagName ?? '').toLowerCase(), thuocTinh: (n.attrs ?? []).map((a) => a.name) });
    for (const c of n.childNodes ?? []) duyet(c);
  };
  for (const c of frag.childNodes ?? []) duyet(c);
  return { vanBan: vanBan.join(''), phanTu };
}
function kiemSoSang(out) {
  const { phanTu } = phanTich(out);
  const khac = phanTu.filter((p) => p.ten !== 'mark');
  const coThuocTinh = phanTu.filter((p) => p.thuocTinh.length > 0);
  return { khac, coThuocTinh, soMark: phanTu.length };
}

function ca(ma, dauVao, duKienChuoi, kiemThem, duKienText = null) {
  SO_CA++;
  let out;
  try { out = sanitizeExcerpt(dauVao); }
  catch (e) { fail(ma, `sanitizeExcerpt ném lỗi với đầu vào ${JSON.stringify(dauVao)}: ${e.message}`); return; }
  if (out !== duKienChuoi) { fail(ma, `đầu ra ${JSON.stringify(out)} ≠ kỳ vọng ${JSON.stringify(duKienChuoi)}`); return; }
  const t = phanTich(out);
  if (duKienText != null && t.vanBan !== duKienText) { fail(ma, `textContent ${JSON.stringify(t.vanBan)} ≠ nguyên văn ${JSON.stringify(duKienText)}`); return; }
  const { khac, coThuocTinh, soMark } = kiemSoSang(out);
  if (khac.length) { fail(ma, `còn phần tử không phải mark: ${khac.map((p) => p.ten).join(', ')}`); return; }
  if (coThuocTinh.length) { fail(ma, `mark còn thuộc tính: ${coThuocTinh.flatMap((p) => p.thuocTinh).join(', ')}`); return; }
  if (kiemThem) { const s = kiemThem(out, t, soMark); if (s) { fail(ma, s); return; } }
}

// a) một cặp mark; hai cặp mark; văn bản trước/giữa/sau
ca('C3-A1', 'Trước <mark>bánh lắc</mark> sau', 'Trước <mark>bánh lắc</mark> sau',
  (_o, _t, soMark) => (soMark === 1 ? null : 'kỳ vọng 1 mark'), 'Trước bánh lắc sau');
ca('C3-A2', 'A <mark>x</mark> B <mark>y</mark> C', 'A <mark>x</mark> B <mark>y</mark> C',
  (_o, _t, soMark) => (soMark === 2 ? null : 'kỳ vọng 2 mark'));
ca('C3-A3', 'Đầu <mark>giữa</mark> Cuối', 'Đầu <mark>giữa</mark> Cuối', null);
// b) không mark và chuỗi rỗng
ca('C3-B1', 'không có mark', 'không có mark', (_o, _t, soMark) => (soMark === 0 ? null : 'không được sinh mark'));
ca('C3-B2', '', '', null);
// c) mark có thuộc tính/event handler — đầu ra không còn thuộc tính
ca('C3-C1', '<mark onclick=alert(1)>balance</mark>', '<mark>balance</mark>', null);
// d) thẻ khác, comment, script/style, SVG, onerror — không còn phần tử/mã thực thi
ca('C3-D1', 'a <b>đậm</b> c', 'a đậm c', null);
ca('C3-D2', 'x <mark onerror=alert(1)>y</mark> z', 'x <mark>y</mark> z', null);
ca('C3-D3', '<script>alert(1)</script>sau chữ', 'sau chữ', (out) => (out.includes('alert') ? 'còn mã script trong đầu ra' : null));
ca('C3-D4', '<style>p{color:red}</style>giữa', 'giữa', null);
ca('C3-D5', '<svg onload=alert(1)><circle r="1"/></svg>đuôi', 'đuôi', (out) => (out.includes('onload') || out.includes('circle') ? 'còn tàn dư svg/thuộc tính' : null));
ca('C3-D6', 'trước <!-- chú thích -->sau', 'trước sau', (out) => (out.includes('[CHU-THICH]') || out.includes('chú thích') ? 'nội dung chú thích bị lộ' : null), 'trước sau');
// e) thực thể và ký tự đặc biệt — textContent phải khớp nguyên văn
ca('C3-E1', 'A &amp; B <b>C</b> &wedge;', 'A &amp; B C &wedge;', null, 'A & B C ∧');
ca('C3-E2', '5 < 6 & 7 > 2', '5 &lt; 6 &amp; 7 &gt; 2', null, '5 < 6 & 7 > 2');
ca('C3-E3', 'Ngoài &lone <mark>&amp; trong</mark>', 'Ngoài &amp;lone <mark>&amp; trong</mark>', null, 'Ngoài &lone & trong');
// f) mark thiếu đóng, đóng dư, lồng — không lan
ca('C3-F1', 'Trước <mark>bánh lắc', 'Trước <mark>bánh lắc</mark>', null);
ca('C3-F2', 'Trước </mark> sau', 'Trước  sau', (_o, _t, soMark) => (soMark === 0 ? null : 'đóng dư không được bỏ'));
ca('C3-F3', 'A <mark><mark>B</mark></mark> C', 'A <mark>B</mark> C', (_o, _t, soMark) => (soMark === 1 ? null : 'mark lồng không được gộp'));
ca('C3-F4', 'X <mark>Y</mark></mark> Z', 'X <mark>Y</mark> Z', null);
ca('C3-F5', 'Đầu <mark>giữa</mark> <script>js()</script> <mark>cuối</mark> đuôi', 'Đầu <mark>giữa</mark>  <mark>cuối</mark> đuôi', null);
// g) thêm sau TXN-20261017-51: nháy trong thuộc tính, chú thích chứa '>' và chưa đóng, văn bản so sánh kèm mark
ca('C3-G1', '<!-- x > y -->sau dấu', 'sau dấu', (out) => (out.includes('x') || out.includes('[CHU-THICH]') ? 'nội dung chú thích (chứa >) bị lộ' : null), 'sau dấu');
ca('C3-G2', 'a <!-- chưa đóng', 'a ', (out) => (out.includes('chưa') ? 'chú thích chưa đóng bị lộ' : null), 'a ');
ca('C3-G3', '<mark title="a>b">x</mark>', '<mark>x</mark>', null, 'x');
ca('C3-G4', "<mark data-y='v>w'>y</mark>", '<mark>y</mark>', null, 'y');
ca('C3-G5', 't <mark>cao</mark> khi t > 40 & p < 5', 't <mark>cao</mark> khi t &gt; 40 &amp; p &lt; 5', null, 't cao khi t > 40 & p < 5');
ca('C3-H1', 'Trước <script>if (a < b) x()</script> sau', 'Trước  sau', (out) => (out.includes('<') || out.includes('x()') ? 'script bị leak' : null), 'Trước  sau');
ca('C3-H2', 'Trước <script>if(a<b)x()</script> sau', 'Trước  sau', (out) => (out.includes('<') || out.includes('x()') ? 'script bị leak hoặc nuốt chữ' : null), 'Trước  sau');
ca('C3-H3', 'Trước <script>ẩn</scriptx>LEAK</script> sau', 'Trước  sau', (out) => (out.includes('LEAK') || out.includes('ẩn') ? 'nội dung script lộ qua thẻ đóng cùng tiền tố' : null), 'Trước  sau');
ca('C3-H4', 'Trước <style>qq</stylex>ww</style> sau', 'Trước  sau', (out) => (out.includes('qq') || out.includes('ww') ? 'nội dung style lộ qua thẻ đóng cùng tiền tố' : null), 'Trước  sau');
ca('C3-H5', 'Trước <template>x</templatex>y</template> sau', 'Trước  sau', (out) => (out.includes('x') || out.includes('y') ? 'nội dung template lộ qua thẻ đóng cùng tiền tố' : null), 'Trước  sau');

if (loi.length) {
  console.error(`KHONG DAT bo kiem C3 (${loi.length} loi):`);
  for (const l of loi) console.error('  ' + l);
  process.exit(1);
}
console.log(`DAT bo kiem C3: ${SO_CA}/${SO_CA} ca chuc nang (a-g) deu dap — ham sanitizeExcerpt trong cay --root la ham san pham dung that`);
