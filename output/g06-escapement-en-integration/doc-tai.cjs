const fs = require('fs');
const log = fs.readFileSync('output/g06-escapement-en-integration/log-g06c2-tai.txt', 'utf8');
const start = log.indexOf('[');
let depth = 0, end = -1, inStr = false, esc = false;
for (let i = start; i < log.length; i++) {
  const c = log[i];
  if (inStr) {
    if (esc) esc = false;
    else if (c === '\\') esc = true;
    else if (c === '"') inStr = false;
    continue;
  }
  if (c === '"') inStr = true;
  else if (c === '[') depth++;
  else if (c === ']') { depth--; if (depth === 0) { end = i + 1; break; } }
}
const data = JSON.parse(log.slice(start, end));
for (const k of data) {
  console.log('---', k.ten, '→', k.trangThai);
  if (k.trangThai === 'OK') {
    console.log('  req:', k.request, '| thất bại:', k.thatBai, JSON.stringify(k.chiTietThatBai), '| byte giải nén:', k.tongByteGiaiNen, '| theo kiểu:', JSON.stringify(k.theoKieu), '| 3D:', k.co3D);
  } else console.log(' ', k.loi, '| đã bắt', k.soReqDaBat, 'req');
}
