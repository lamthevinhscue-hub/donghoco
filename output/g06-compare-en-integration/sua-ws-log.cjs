// G06-B vòng sửa 4 — quét + sửa whitespace (bản ghi kết quả ra TỆP, không in stdout)
'use strict';
const fs = require('fs');
const path = require('path');

const GOC = path.join(__dirname);
const LOG_WS = [
  'log-build-cuoi-v2.txt',
  'log-build-cuoi-v3.txt',
  'log-build-cuoi-v4.txt',
  'log-build-cuoi-v5.txt',
  'log-build-cuoi-v6.txt',
  'log-build-cuoi-v7.txt',
  'log-build-cuoi-v8.txt',
  'log-build-cuoi.txt',
  'log-build-nen-chang2.txt',
  'log-build-truoc-sandbox.txt',
  'log-build-vs1-final.txt',
  'log-build-vs1-v2.txt',
  'log-build-vs1.txt',
  'log-build-vs2-final.txt',
  'log-build-vs2.txt',
  'log-build-vs3-v2.txt',
  'log-build-vs3.txt',
];
const LOG_EOF = [
  'log-preview-c2.txt',
  'log-preview-vs1.txt',
  'log-preview-vs2.txt',
  'log-preview-vs3.txt',
];

const baoCao = [];
for (const ten of LOG_WS) {
  const p = path.join(GOC, ten);
  const truoc = fs.readFileSync(p, 'utf8');
  const dongTruoc = truoc.split('\n');
  const soDongWs = dongTruoc.filter((d) => / +$/.test(d)).length;
  const sau = truoc
    .split('\n')
    .map((d) => d.replace(/[ \t]+$/, ''))
    .join('\n');
  fs.writeFileSync(p, sau);
  const dongSau = sau.split('\n');
  baoCao.push({ tep: ten, dongWsTruoc: soDongWs, dongWsSau: dongSau.filter((d) => / +$/.test(d)).length, doiSoDong: dongTruoc.length !== dongSau.length, doiNoiDungSauCat: dongTruoc.some((d, i) => i < dongSau.length && d.replace(/[ \t]+$/, '') !== dongSau[i]) });
}
for (const ten of LOG_EOF) {
  const p = path.join(GOC, ten);
  let nd = fs.readFileSync(p, 'utf8');
  const eofTruoc = { ketThucNhieuNewline: /\n{2,}$/.test(nd), khongNewline: !/\n$/.test(nd) };
  nd = nd.replace(/[\r\n]+$/, '\n');
  fs.writeFileSync(p, nd);
  baoCao.push({ tep: ten, eofTruoc, eofSau: { chuanMotNewline: /\n$/.test(nd) && !/\n{2,}$/.test(nd) } });
}
fs.writeFileSync(path.join(GOC, 'log-vs2-sua-ws-bao-cao.json'), JSON.stringify(baoCao, null, 2));
fs.writeFileSync(path.join(GOC, 'log-vs2-sua-ws-xong.txt'), 'DONE ' + baoCao.length + ' tep');
