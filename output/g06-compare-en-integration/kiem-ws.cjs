// Kiểm trạng thái WS từng log — ghi kết quả vào ket-qua-ws.txt (không in stdout)
'use strict';
const fs = require('fs');
const path = require('path');
const GOC = __dirname;
const CAC_TEP = [
  'log-build-cuoi-v2.txt', 'log-build-cuoi-v3.txt', 'log-build-cuoi-v4.txt', 'log-build-cuoi-v5.txt',
  'log-build-cuoi-v6.txt', 'log-build-cuoi-v7.txt', 'log-build-cuoi-v8.txt', 'log-build-cuoi.txt',
  'log-build-nen-chang2.txt', 'log-build-truoc-sandbox.txt', 'log-build-vs1-final.txt', 'log-build-vs1-v2.txt',
  'log-build-vs1.txt', 'log-build-vs2-final.txt', 'log-build-vs2.txt', 'log-build-vs3-v2.txt', 'log-build-vs3.txt',
  'log-preview-c2.txt', 'log-preview-vs1.txt', 'log-preview-vs2.txt', 'log-preview-vs3.txt',
];
const kq = [];
for (const ten of CAC_TEP) {
  try {
    const nd = fs.readFileSync(path.join(GOC, ten), 'utf8');
    const ws = nd.split('\n').filter((d) => / +$/.test(d)).length;
    const eofNhieu = /\n{2,}$/.test(nd);
    const eofKhong = !/\n$/.test(nd);
    kq.push(ten + ' WS=' + ws + ' EOFnhieu=' + eofNhieu + ' EOFkhong=' + eofKhong);
  } catch (e) {
    kq.push(ten + ' LOI=' + e.code);
  }
}
fs.writeFileSync(path.join(GOC, 'ket-qua-ws.txt'), kq.join('\n') + '\n');
fs.writeFileSync(path.join(GOC, 'xong-kiem-ws.txt'), 'OK');
