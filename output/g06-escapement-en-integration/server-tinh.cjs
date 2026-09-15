#!/usr/bin/env node
// Server tĩnh tối giản: node server-tinh.cjs <cổng> <thư_mục_gốc>
// Chỉ để phục vụ bản dist sandbox cho kiểm DOM (không dùng production).
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const cong = Number(process.argv[2] || 4480);
const goc = path.resolve(process.argv[3] || '.');
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

http.createServer((req, res) => {
  let duong = decodeURIComponent((req.url || '/').split('?')[0]);
  if (duong.endsWith('/')) duong += 'index.html';
  const tep = path.join(goc, duong);
  if (!tep.startsWith(goc)) { res.writeHead(403); res.end(); return; }
  fs.readFile(tep, (e, noiDung) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'content-type': MIME[path.extname(tep).toLowerCase()] || 'application/octet-stream' });
    res.end(noiDung);
  });
}).listen(cong, '127.0.0.1', () => console.log(`server-tinh :${cong} → ${goc}`));
