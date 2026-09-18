// G09-B chặng 1 (TXN-20260919-9) — census ID "guilloche" trên toàn dist bằng parser thật
// (parse5 — KHÔNG regex). Dùng: node censu-dist-guilloche.mjs (từ gốc repo)
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'parse5';

const ketQua = [];
let soTrang = 0;

// đệ quy cây parse5: đếm phần tử theo id/attr
const demCay = (node, kq) => {
  if (node.tagName) {
    const attrs = Object.fromEntries((node.attrs || []).map((a) => [a.name, a.value]));
    if (attrs.id === 'guilloche') kq.idGuilloche++;
    if (attrs.fill === 'url(#guilloche)') kq.fillRef++;
    if (node.tagName === 'figure' && /watch-image/.test(attrs.class || '')) kq.watchImage++;
    if (attrs.id && attrs.id.includes('guilloche') && attrs.id !== 'guilloche') kq.idKhacGuilloche++;
  }
  for (const con of node.childNodes || []) demCay(con, kq);
};

const duyet = (d) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) duyet(p);
    else if (e.name === 'index.html') {
      soTrang++;
      const kq = { idGuilloche: 0, fillRef: 0, watchImage: 0, idKhacGuilloche: 0 };
      demCay(parse(readFileSync(p, 'utf8'), { sourceCodeLocationInfo: false }), kq);
      if (kq.idGuilloche > 0 || kq.watchImage > 0) {
        // chuẩn hóa separator về "/" TRƯỚC khi tạo route — route chuẩn URL trên Windows lẫn môi trường khác
        const duongChuan = p.split(/[\\/]+/).join('/');
        const route = '/' + duongChuan.replace(/^dist\//, '').replace(/\/index\.html$/, '') + '/';
        ketQua.push({ route, ...kq });
      }
    }
  }
};
duyet('dist');

const nhieu = ketQua.filter((k) => k.idGuilloche > 1);
const mot = ketQua.filter((k) => k.idGuilloche === 1);
const tongId = ketQua.reduce((s, k) => s + k.idGuilloche, 0);
const tongRef = ketQua.reduce((s, k) => s + k.fillRef, 0);

const baoCao = {
  ngay: '2026-09-19',
  nen: 'cbf1850',
  congCu: 'parse5 (parser HTML đầy đủ — không regex)',
  soTrangQuet: soTrang,
  soTrangCoGuilloche: ketQua.length,
  tongPhanTuIdGuilloche: tongId,
  tongThamChieuUrlGuilloche: tongRef,
  trangNhieuHonMotId: nhieu.sort((a, b) => b.idGuilloche - a.idGuilloche),
  trangMotId: mot.map((k) => k.route),
  chiTiet: ketQua.sort((a, b) => b.idGuilloche - a.idGuilloche),
};
// luôn ghi đúng MỘT newline cuối tệp (JSON.stringify không tự thêm)
writeFileSync('output/g09-id-motion-audit/censu-guilloche.json', JSON.stringify(baoCao, null, 2) + '\n');
console.log('Trang quét: ' + soTrang + ' · trang có guilloche: ' + ketQua.length);
console.log('Tổng id="guilloche": ' + tongId + ' · tổng tham chiếu url(#guilloche): ' + tongRef);
console.log('Trang >1 id: ' + nhieu.length);
for (const k of nhieu.slice(0, 12)) console.log(`  ${k.idGuilloche} id · ${k.fillRef} ref · ${k.watchImage} WatchImage — ${k.route}`);
console.log('Đã ghi output/g09-id-motion-audit/censu-guilloche.json');
