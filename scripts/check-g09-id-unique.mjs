// =============================================================================
// check-g09-id-unique.mjs — Kiểm G09-B chặng 2: ID pattern guilloché duy nhất/instance
// =============================================================================
// Chạy: node scripts/check-g09-id-unique.mjs            → kiểm nguồn + toàn dist
//       node scripts/check-g09-id-unique.mjs --quyen D  → kiểm thư mục sandbox (*.html)
//                                                        (mutation cô lập, ngoài repo chính)
// Quy tắc:
//   S1 nguồn WatchImage.astro không còn id="guilloche" cứng lẫn url(#guilloche).
//   D1 dist parse bằng parser (parse5): không còn phần tử id="guilloche" cũ.
//   D2 mỗi technical plate (figure.watch-image) có ĐÚNG 1 <pattern> trong SVG của nó,
//      và rect tham chiếu fill="url(#<id pattern đó>)" — tham chiếu khớp đích cùng SVG.
//   D3 ID pattern duy nhất trong từng tài liệu (không trùng giữa các plate).
//   D4 số plate = số pattern = số tham chiếu (toàn dist = 125 theo census chặng 1).
//   D5 trang bắt buộc: /lich-su/ 28, /en/history/ 28, /thuong-hieu/audemars-piguet/ 2,
//      /thuong-hieu/breguet/ 1.
// Lỗi in rõ lý do (ID trùng / thiếu đích / đếm lệch...). Exit 1 nếu có lỗi.
// =============================================================================
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'parse5';

const errors = [];
const dat = (ten, ok, chiTiet) => {
  console.log(`${ok ? 'ĐẠT' : 'KHÔNG ĐẠT'} ${ten}${chiTiet ? ' — ' + chiTiet : ''}`);
  if (!ok) errors.push(ten + (chiTiet ? ' — ' + chiTiet : ''));
};

const cheDoQuyen = process.argv[2] === '--quyen' ? process.argv[3] : null;

const attrsOf = (node) => Object.fromEntries((node.attrs || []).map((a) => [a.name, a.value]));
// phân tích một trang: gom các SVG thuộc technical plate (figure.watch-image) kèm
// pattern + tham chiếu fill của từng SVG, và đếm tần suất ID pattern toàn trang
const phanTichTrang = (html) => {
  const cay = parse(html);
  const kq = { idGuillocheCu: 0, plates: [], patternIds: [], idTrung: [] };
  const cacSvg = [];
  const gom = (node, chaSvg) => {
    if (node.tagName === 'svg') { const muc = { node, patterns: [], refs: [], trongPlate: false }; cacSvg.push(muc); chaSvg = muc; }
    if (node.tagName) {
      const a = attrsOf(node);
      if (a.id === 'guilloche') kq.idGuillocheCu++;
      if (node.tagName === 'pattern' && chaSvg) chaSvg.patterns.push(a.id);
      if (node.tagName === 'rect' && typeof a.fill === 'string' && a.fill.startsWith('url(#') && chaSvg) chaSvg.refs.push(a.fill);
      if (node.tagName === 'figure' && /watch-image/.test(a.class || '')) kq.plates.push({ node, chaSvg: null });
    }
    for (const con of node.childNodes || []) gom(con, chaSvg);
  };
  gom(cay, null);
  // gắn plate đổi chiều svg: svg nằm trong plate (dfs đặt cờ)
  const danhDau = (node, trongPlate) => {
    if (node.tagName === 'svg' && trongPlate) { const muc = cacSvg.find((s) => s.node === node); if (muc) muc.trongPlate = true; }
    if (node.tagName === 'figure' && /watch-image/.test(attrsOf(node).class || '')) trongPlate = true;
    for (const con of node.childNodes || []) danhDau(con, trongPlate);
  };
  danhDau(cay, false);
  // đếm id pattern toàn trang để phát hiện trùng
  const tanSuat = new Map();
  const gomId = (node) => {
    if (node.tagName === 'pattern') {
      const id = attrsOf(node).id;
      if (id) tanSuat.set(id, (tanSuat.get(id) || 0) + 1);
    }
    for (const con of node.childNodes || []) gomId(con);
  };
  gomId(cay);
  for (const [id, n] of tanSuat) if (n > 1) kq.idTrung.push(id + ' x' + n);
  kq.tanSuatId = tanSuat;
  kq.cacPlateSvg = cacSvg.filter((s) => s.trongPlate);
  return kq;
};

const kiemMotTrang = (ten, html, soPlateMongDoi) => {
  const kq = phanTichTrang(html);
  dat(`D1 ${ten}: 0 ID "guilloche" cũ`, kq.idGuillocheCu === 0, kq.idGuillocheCu ? `${kq.idGuillocheCu} còn` : '');
  const plateSvg = kq.cacPlateSvg;
  dat(`D2 ${ten}: số plate SVG = ${soPlateMongDoi ?? plateSvg.length}`, soPlateMongDoi == null || plateSvg.length === soPlateMongDoi, `thực tế ${plateSvg.length}`);
  // mỗi plate đúng 1 pattern + rect tham chiếu đúng pattern đó + id đó duy nhất trong trang
  let patternLech = 0, refSai = 0;
  for (const p of plateSvg) {
    if (p.patterns.length !== 1) patternLech++;
    const id = p.patterns[0];
    const refs = p.refs.filter((r) => r === `url(#${id})`);
    if (p.refs.length !== 1 || refs.length !== 1) refSai++;
  }
  dat(`D2 ${ten}: mỗi plate đúng 1 pattern`, patternLech === 0, `${patternLech} plate lệch`);
  dat(`D2 ${ten}: mỗi plate tham chiếu đúng pattern cùng SVG`, refSai === 0, `${refSai} plate sai đích`);
  dat(`D3 ${ten}: ID pattern duy nhất trong tài liệu`, kq.idTrung.length === 0, kq.idTrung.join(', '));
  const plates = plateSvg.length;
  const patterns = plateSvg.reduce((s, p) => s + p.patterns.length, 0);
  const refs = plateSvg.reduce((s, p) => s + p.refs.length, 0);
  dat(`D4 ${ten}: plate = pattern = tham chiếu`, plates === patterns && patterns === refs, `${plates}/${patterns}/${refs}`);
  return { plates, patterns, refs };
};

if (cheDoQuyen) {
  // ===== Chế độ sandbox (mutation cô lập — ngoài repo chính) =====
  if (!existsSync(cheDoQuyen)) { console.log('KHÔNG TÌM THẤY thư mục sandbox: ' + cheDoQuyen); process.exit(1); }
  const cacTep = readdirSync(cheDoQuyen).filter((f) => f.endsWith('.html'));
  if (cacTep.length === 0) { console.log('KHÔNG CÓ tệp .html trong sandbox'); process.exit(1); }
  for (const f of cacTep) kiemMotTrang(f, readFileSync(join(cheDoQuyen, f), 'utf8'), null);
} else {
  // ===== Chế độ đầy đủ: nguồn + toàn dist =====
  // nguồn bỏ comment trước khi thử (comment giải thích có thể nhắc đúng chuỗi cấm)
  const boComment = (t) => t
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const nguon = boComment(readFileSync('src/components/WatchImage.astro', 'utf8'));
  dat('S1 nguồn không còn id="guilloche" cứng', !/id="guilloche"/.test(nguon));
  dat('S1 nguồn không còn url(#guilloche) cứng', !/url\(#guilloche\)/.test(nguon));

  if (!existsSync('dist')) { dat('dist', false, 'chưa có dist — hãy chạy npm run build trước'); process.exit(1); }

  const TRANG_BAT_BUOC = [
    ['lich-su', 28],
    ['en/history', 28],
    ['thuong-hieu/audemars-piguet', 2],
    ['thuong-hieu/breguet', 1],
  ];
  let tongPlate = 0, tongPattern = 0, tongRef = 0, soTrangPlate = 0;
  const duyet = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) duyet(p);
      else if (e.name === 'index.html') {
        const duongChuan = p.split(/[\\/]+/).join('/');
        const kq = kiemMotTrang('/' + duongChuan.replace(/^dist\//, '').replace(/\/index\.html$/, '/'), readFileSync(p, 'utf8'), null);
        if (kq.plates > 0) { tongPlate += kq.plates; tongPattern += kq.patterns; tongRef += kq.refs; soTrangPlate++; }
      }
    }
  };
  duyet('dist');
  dat('D4 toàn dist: plate = pattern = tham chiếu (125 theo census chặng 1)',
    tongPlate === 125 && tongPattern === 125 && tongRef === 125, `${tongPlate}/${tongPattern}/${tongRef} trên ${soTrangPlate} trang`);

  for (const [route, soMong] of TRANG_BAT_BUOC) {
    const p = join('dist', ...route.split('/'), 'index.html');
    if (!existsSync(p)) { dat(`D5 ${route}`, false, 'không tìm thấy trang'); continue; }
    const kq = kiemMotTrang(route + '/', readFileSync(p, 'utf8'), soMong);
    dat(`D5 ${route}: số plate đúng ${soMong}`, kq.plates === soMong, `thực tế ${kq.plates}`);
  }
}

console.log('');
console.log(errors.length === 0 ? 'KẾT LUẬN: ĐẠT — mỗi plate tham chiếu đúng pattern của chính nó, 0 ID trùng' : `KẾT LUẬN: KHÔNG ĐẠT (${errors.length} ca)`);
process.exit(errors.length === 0 ? 0 : 1);
