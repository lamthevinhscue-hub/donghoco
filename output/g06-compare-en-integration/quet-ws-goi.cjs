// G06-B vòng sửa 4 — quét whitespace/EOF toàn bộ tệp gói dự kiến commit
// (bao gồm log lịch sử + ảnh bỏ qua) — ghi kết quả vào ket-qua-ws-goi.txt
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const GOC = path.resolve(__dirname, '..', '..');
const OUT = path.join(GOC, 'output', 'g06-compare-en-integration');
const BIENBAN = path.join(GOC, 'docs', 'nghiem-thu', 'G06-B-tich-hop-so-sanh-song-ngu-2026-09-14.md');

const tepSua = execFileSync('git', ['status', '--porcelain'], { cwd: GOC, encoding: 'utf8' })
  .split('\n').filter((l) => l.startsWith(' M ')).map((l) => l.slice(3).trim());
const tepUntracked = [path.relative(GOC, BIENBAN).split(path.sep).join('/')];

const kq = { tepSua, tepUntracked, logQuet: [], tongWS: 0, tongEOFLoi: 0 };
const quet = (pTuyetDoi, tenTuongDoi) => {
  const nd = fs.readFileSync(pTuyetDoi, 'utf8');
  const ws = nd.split('\n').filter((d) => / +$/.test(d)).length;
  const eofNhieu = /\n{2,}$/.test(nd);
  const eofKhong = !/\n$/.test(nd);
  kq.tongWS += ws;
  if (eofNhieu || eofKhong) kq.tongEOFLoi += 1;
  kq.logQuet.push(tenTuongDoi + ' WS=' + ws + ' EOFnhieu=' + eofNhieu + ' EOFthieu=' + eofKhong);
};
for (const f of fs.readdirSync(OUT, { withFileTypes: true })) {
  if (f.isDirectory()) {
    if (f.name === 'shots') continue; // PNG — không xử lý như văn bản
    for (const c of fs.readdirSync(path.join(OUT, f.name))) {
      quet(path.join(OUT, f.name, c), f.name + '/' + c);
    }
  } else {
    quet(path.join(OUT, f.name), f.name);
  }
}
quet(BIENBAN, 'docs/nghiem-thu/G06-B-tich-hop-so-sanh-song-ngu-2026-09-14.md');
for (const t of tepSua) quet(path.join(GOC, t), t);
fs.writeFileSync(path.join(OUT, 'ket-qua-ws-goi.txt'), kq.logQuet.join('\n') + '\nTONG WS=' + kq.tongWS + ' EOF_LOI=' + kq.tongEOFLoi + '\n');
console.log('TONG WS=' + kq.tongWS + ' EOF_LOI=' + kq.tongEOFLoi + ' (chi tiet: ket-qua-ws-goi.txt)');
