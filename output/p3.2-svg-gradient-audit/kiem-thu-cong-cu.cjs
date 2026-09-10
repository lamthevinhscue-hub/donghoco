// P3.2 — Kiểm thử cô lập công cụ nhận diện ID/tham chiếu (TXN-20260910-22)
// Chạy: node output/p3.2-svg-gradient-audit/kiem-thu-cong-cu.cjs
// KHÔNG đụng website: fixture nằm trong chuỗi của script này, chỉ ghi kết quả vào output.
const fs = require('fs');
const path = require('path');
const { markupThatDom, scanIdInventory } = require(path.join(__dirname, 'lib-id.cjs'));

let dat = 0, truot = 0;
const kiem = (ten, dieuKien) => { if (dieuKien) { dat++; console.log('  ĐẠT — ' + ten); } else { truot++; console.log('  TRƯỢT — ' + ten); } };

// ===== Ca 1: hai data-part-id giống nhau KHÔNG phải ID trùng =====
const c1 = '<button data-part-id="crystal" class="part-quick">Kính</button><button data-part-id="crystal" class="part-quick hidden">Kính (mobile)</button>';
const inv1 = scanIdInventory(c1);
kiem('Ca1a — data-part-id trùng không được tính là phần tử có id', inv1.length === 0);
kiem('Ca1b — không phát hiện ID trùng', (() => { const dem = {}; inv1.forEach((x) => dem[x.id] = (dem[x.id] || 0) + 1); return Object.values(dem).every((n) => n === 1); })());

// ===== Ca 2: hai id thật giống nhau PHẢI bị bắt =====
const c2 = '<g id="escSteel">…</g><g id="escSteel">…</g>';
const inv2 = scanIdInventory(c2);
const idTrung2 = inv2.filter((x, i) => inv2.findIndex((y) => y.id === x.id) !== i);
kiem('Ca2 — hai id="escSteel" giống nhau được bắt (' + inv2.length + ' phần tử, trùng ' + idTrung2.length + ')', inv2.length === 2 && idTrung2.length === 1);

// ===== Ca 3: id trong comment và trong script KHÔNG tính là phần tử DOM =====
const c3 = '<!-- <linearGradient id="trong-comment"></linearGradient> -->'
  + '<script type="application/ld+json">{"logo":{"url":"https://example.com/og-default.jpg"}}</script>'
  + '<script>const tpl = \'<linearGradient id="trong-script"></linearGradient>\';</script>'
  + '<linearGradient id="that"></linearGradient>';
const inv3 = scanIdInventory(c3);
kiem('Ca3 — chỉ 1 id thật được nhận (trong comment/script bị bỏ qua)', inv3.length === 1 && inv3[0].id === 'that' && inv3[0].tag === 'linearGradient');

// ===== Ca 4: tham chiếu url(#…) — đích tồn tại thì qua, thiếu đích thì bắt =====
// Đích đa dạng: marker, filter, clipPath, pattern, gradient — tất cả đều "có đích".
const c4 = '<svg><defs>'
  + '<marker id="escArrow"></marker><filter id="wevShadowSoft"></filter><filter id="wevShadowLift"></filter>'
  + '<filter id="wevShadowDimSoft"></filter><filter id="wevShadowDimLift"></filter><clipPath id="wevCrystalClip"></clipPath>'
  + '<pattern id="guilloche"></pattern><linearGradient id="mph-brass"></linearGradient></defs>'
  + '<path marker-end="url(#escArrow)"/><g filter="url(#wevShadowSoft)"/><g filter="url(#wevShadowLift)"/>'
  + '<g filter="url(#wevShadowDimSoft)"/><g filter="url(#wevShadowDimLift)"/><rect clip-path="url(#wevCrystalClip)"/>'
  + '<rect fill="url(#guilloche)"/><rect fill="url(#mph-brass)"/></svg>';
const dom4 = markupThatDom(c4);
const ids4 = new Set(scanIdInventory(dom4).map((x) => x.id));
const refs4 = [...dom4.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]);
const missing4 = refs4.filter((id) => !ids4.has(id));
kiem('Ca4a — 8 tham chiếu tới marker/filter/clipPath/pattern/gradient có đích đều qua (' + refs4.length + ' ref)', refs4.length === 8 && missing4.length === 0);
const c4b = c4.replace('<pattern id="guilloche"></pattern>', '');
const ids4b = new Set(scanIdInventory(markupThatDom(c4b)).map((x) => x.id));
const refs4b = [...markupThatDom(c4b).matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]);
const missing4b = refs4b.filter((id) => !ids4b.has(id));
kiem('Ca4b — xóa đích pattern rồi thì tham chiếu bị bắt thiếu (' + missing4b.length + ' missing)', missing4b.includes('guilloche'));

// ===== Ca 5: data-part-id không bị nhận nhầm khi thẻ có cả attrs phức tạp =====
const c5 = '<button type="button" data-part-id="dial" aria-pressed="false" id="nut-dial">Mặt số</button>';
const inv5 = scanIdInventory(c5);
kiem('Ca5 — thẻ có nhiều attr: chỉ nhận id="nut-dial"', inv5.length === 1 && inv5[0].id === 'nut-dial' && inv5[0].tag === 'button');

// ===== Ghi kết quả =====
const out = {
  moTa: 'Kiểm thử cô lập công cụ nhận diện ID/tham chiếu (fixture trong chuỗi script, không tiêm vào website)',
  thoiGian: new Date().toISOString(),
  soCa: 7, dat, truot,
  ketLuan: truot === 0 ? 'CÔNG CỤ ĐẠT TOÀN BỘ CA KIỂM THỬ' : 'CÓ CA TRƯỢT — kiểm lại trước khi dùng',
};
fs.writeFileSync(path.join(__dirname, 'kiem-thu-cong-cu-ket-qua.json'), JSON.stringify(out, null, 1));
console.log('TỔNG: ' + dat + '/' + (dat + truot) + ' ca ĐẠT → ' + out.ketLuan);
process.exit(truot === 0 ? 0 : 1);
