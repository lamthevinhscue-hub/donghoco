// Server tĩnh tối giản cho sandbox/mutation — không dependency.
// Chạy: node server-tinh.cjs <thư-mục> <cổng>
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const GOC = path.resolve(process.argv[2] ?? '.');
const CONG = Number(process.argv[3] ?? 4599);
const KIEU = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

http.createServer((req, res) => {
  try {
    let duong = decodeURIComponent((req.url || '/').split('?')[0].split('#')[0]);
    if (duong.endsWith('/')) duong += 'index.html';
    const tep = path.join(GOC, duong);
    if (!tep.startsWith(GOC)) { res.writeHead(403); res.end(); return; }
    const nd = fs.readFileSync(tep);
    res.writeHead(200, { 'Content-Type': KIEU[path.extname(tep).toLowerCase()] ?? 'application/octet-stream' });
    res.end(nd);
  } catch {
    res.writeHead(404);
    res.end('không tìm thấy');
  }
}).listen(CONG, '127.0.0.1', () => console.log('serve ' + GOC + ' tai http://127.0.0.1:' + CONG));
