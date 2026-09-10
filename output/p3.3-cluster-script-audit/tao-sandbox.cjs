// P3.3 — Dựng sandbox cô lập (TXN-20260910-32; TXN-20260910-38 dùng chung
// kiểm tra an toàn qua kiem-tra-an-toan.cjs — một cơ chế với driver)
// Chạy: node output/p3.3-cluster-script-audit/tao-sandbox.cjs
'use strict';
const fs = require('fs');
const path = require('path');
const anToan = require('./kiem-tra-an-toan.cjs');

// Chấp nhận chạy từ repo gốc hoặc từ thư mục gói
function timRepoNen() {
  let dir = process.cwd();
  for (let i = 0; i < 4; i++) {
    if (fs.existsSync(path.join(dir, 'package.json'))) return path.resolve(dir);
    dir = path.join(dir, '..');
  }
  throw new Error('Không tìm thấy repo gốc (package.json) từ ' + process.cwd());
}
const repoRoot = timRepoNen();
const sandboxDir = path.join(repoRoot, anToan.HANG_SO.SANDBOX_REL);
const manifestPath = path.join(repoRoot, 'output/p3.3-cluster-script-audit/manifest-tep.txt');
const scriptsDir = path.join(repoRoot, 'scripts');

console.log('[1] Repo nền: ' + repoRoot);
anToan.xacThucRepo(repoRoot);

console.log('[2] Sandbox đích: ' + sandboxDir);
anToan.xacThucViTriSandbox(repoRoot, sandboxDir);

console.log('[3] Manifest: ' + manifestPath);
const lines = anToan.docManifest(manifestPath, repoRoot);
console.log('    hợp lệ: ' + lines.length + ' dòng (mọi dòng vi phạm đều dừng, không bỏ qua)');

console.log('[4] Dựng cây sandbox…');
const cay = anToan.dungCaySandbox({ repoRoot, sandboxDir, manifestPath, scriptsDir });
console.log('    copy: ' + cay.copied + ' lượt | tệp duy nhất trong sandbox: ' + cay.duyet.size);

console.log('[5] Hash script bản sao = nguồn…');
const hs = anToan.hashScripts({ sandboxDir, repoRoot });
if (hs.lech > 0) {
  console.error('    LỖI: ' + hs.lech + ' script lệch hash');
  process.exit(1);
}
console.log('    ' + hs.khop + '/' + (hs.khop + hs.lech) + ' script khớp');

console.log('[6] Sanity script sạch…');
const san = anToan.sanityScript(sandboxDir, 'check-brand-value-retention.mjs');
if (!san.ok) {
  console.error('    LỖI: sanity exit=' + san.exit + '\n' + (san.stdout || san.stderr).slice(0, 500));
  process.exit(1);
}
console.log('    check-brand-value-retention.mjs exit 0');

const bang = anToan.hashToanBoSandbox(sandboxDir);
console.log('SANDBOX SẴN SÀNG | tệp (kể cả marker): ' + bang.size + ' | hash lệch: 0 | sanity: ĐẠT');
