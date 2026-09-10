// P3.2 — Kiểm thử chữ ký phân nhóm: fx/fy/fr/stop-opacity style phải tạo nhóm riêng
const sig = (d) => JSON.stringify([d.loai, d.gradientUnits, d.x1, d.y1, d.x2, d.y2, d.cx, d.cy, d.r, d.fr, d.fx, d.fy, d.gradientTransform, d.spreadMethod, d.stops.map((s) => [s.offset, s.bienMau || s.color, s.opacity, s.styleOpacity])]);
let dat = 0, truot = 0;
const kiem = (ten, ok) => { if (ok) { dat++; console.log('  ĐẠT — ' + ten); } else { truot++; console.log('  TRƯỢT — ' + ten); } };
const goc = { loai: 'radialGradient', gradientUnits: null, x1: null, y1: null, x2: null, y2: null, cx: '0.5', cy: '0.5', r: '0.8', fr: null, fx: null, fy: null, gradientTransform: null, spreadMethod: null, stops: [{ offset: '0', color: null, bienMau: 'var(--ig-bg)', opacity: null, styleOpacity: null }] };
kiem('fx khác → chữ ký khác', sig(goc) !== sig({ ...goc, fx: '0.4' }));
kiem('fy khác → chữ ký khác', sig(goc) !== sig({ ...goc, fy: '0.3' }));
kiem('fr khác → chữ ký khác', sig(goc) !== sig({ ...goc, fr: '0.3' }));
kiem('stop-opacity trong style khác → chữ ký khác', sig(goc) !== sig({ ...goc, stops: [{ offset: '0', color: null, bienMau: 'var(--ig-bg)', opacity: null, styleOpacity: '0.6' }] }));
kiem('giống hệt → cùng chữ ký', sig(goc) === sig({ ...goc }));
const fs = require('fs');
fs.writeFileSync(__dirname + '/kiem-thu-chu-ky-ket-qua.json', JSON.stringify({ moTa: 'Kiểm thử chữ ký phân nhóm (fx/fy/fr/styleOpacity)', thoiGian: new Date().toISOString(), soCa: 5, dat, truot, ketLuan: truot === 0 ? 'ĐẠT' : 'TRƯỢT' }, null, 1));
console.log('TỔNG: ' + dat + '/' + (dat + truot) + ' ĐẠT');
