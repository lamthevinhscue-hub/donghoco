// Tách khối JSON từ log playwright-cli run-code → nen-ket-qua.json
'use strict';
const fs = require('fs');
const raw = fs.readFileSync(__dirname + '/log-kiem-hanh-vi.txt', 'utf8');
const m = raw.match(/^\{"tong".*$/m);
const j = JSON.parse(m[0]);
fs.writeFileSync(__dirname + '/nen-ket-qua.json', JSON.stringify(j, null, 2));
console.log('tổng=', j.tong, 'đạt=', j.soDat, 'không-đạt=', j.soKhongDat, 'quan-sát=', j.soQuanSat);
for (const k of j.ketQua.filter((x) => !x.ca.startsWith('A'))) {
  console.log((k.dat ? 'DAT  ' : 'QSOB ') + k.ca + ' — ' + k.chiTiet);
}
