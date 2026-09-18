// G08-A vòng sửa 1 (TXN-20260918-8) — quét dữ liệu nhạy cảm CÓ CẤU TRÚC credential
// Nguyên tắc: từ kỹ thuật đơn lẻ (vd "token" trong ngữ cảnh design token CSS) là vô hại — KHÔNG bắt.
// Chỉ bắt khi từ khóa (api key, secret, password, Authorization, Bearer, token) kèm PHÉP GÁN và GIÁ TRỊ;
// comment và văn prose không được chứa ví dụ có dấu gán kèm giá trị, nếu không C8 sẽ bắt chính tệp này.
// Ghép mảnh chuỗi để mẫu không khớp mã nguồn của chính module này.
const MAU = [
  'api[_-]?key\\s*[:=]\\s*\\S+',
  '(?:sec' + 'ret|pass' + 'word|pass' + 'wd|pwd)\\s*[:=]\\s*\\S+',
  'authoriz' + 'ation\\s*:\\s*\\S+',
  'bea' + 'rer\\s+[A-Za-z0-9._-]{12,}',
  'to' + 'ken\\s*[:=]\\s*[^\\s"\']{8,}',
].join('|');
const RE = new RegExp(MAU, 'gi');

function timNhayCam(noiDung) {
  RE.lastIndex = 0;
  return noiDung.match(RE) || [];
}

module.exports = { timNhayCam };

if (require.main === module) {
  const fs = require('fs');
  const khop = timNhayCam(fs.readFileSync(process.argv[2], 'utf8'));
  console.log((khop.length ? 'KHỚP ' + JSON.stringify(khop.slice(0, 5)) : 'SẠCH') + ' — ' + process.argv[2]);
  process.exit(khop.length ? 1 : 0);
}
