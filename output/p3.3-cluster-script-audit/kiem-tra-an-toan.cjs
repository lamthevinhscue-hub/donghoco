// P3.3 — Module kiểm tra an toàn dùng chung (TXN-20260910-38, điều kiện 3)
// Cả tao-sandbox.cjs và kiem-thu-hoi-quy.cjs require module này — một cơ chế
// xác minh duy nhất: repo nền, vị trí sandbox, đường dẫn manifest (kể cả sau
// mở rộng thư mục), chặn symlink/junction ra ngoài, marker nguồn gốc sandbox,
// hash script bản sao = nguồn, sanity script.
// Mọi thất bại đều throw — bên gọi phải dừng, không bỏ qua rồi tiếp tục.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const HANG_SO = {
  SANDBOX_REL: path.join('output', 'p3.3-cluster-script-audit', 'sandbox'),
  MARKER: '.sandbox-p33',
  // Chặn theo path segment (không substring): ".git" chặn ".git" nhưng không chặn "widget"...
  BANNED_SEGMENTS: ['.git', '.env', 'node_modules', 'dist'],
};

// ===== 1. Repo nền =====
function xacThucRepo(repoRoot) {
  if (!fs.existsSync(path.join(repoRoot, 'package.json'))) {
    throw new Error('Không phải repo gốc: thiếu package.json tại ' + repoRoot);
  }
  if (!fs.existsSync(path.join(repoRoot, 'scripts'))) {
    throw new Error('Không phải repo gốc: thiếu thư mục scripts/ tại ' + repoRoot);
  }
  return true;
}

// ===== 2. Vị trí sandbox =====
function xacThucViTriSandbox(repoRoot, sandboxDir) {
  const duocPhep = path.resolve(repoRoot, HANG_SO.SANDBOX_REL);
  const thucTe = path.resolve(sandboxDir);
  if (thucTe !== duocPhep) {
    throw new Error('Sandbox đích không đúng thư mục được phép: ' + thucTe + ' ≠ ' + duocPhep);
  }
  return true;
}

// ===== 3. Đường dẫn tương đối an toàn =====
// Trả về { ok, lyDo }. Kiểm: tuyệt đối, "..", segment cấm, nằm trong repo
// sau resolve, và nếu tồn tại trên đĩa thì realpath phải nằm trong realpath(repo)
// (chặn symlink/junction trỏ ra ngoài).
function kiemDuongDan(rel, repoRoot) {
  if (path.isAbsolute(rel)) return { ok: false, lyDo: 'đường dẫn tuyệt đối: ' + rel };
  if (rel.includes('..')) return { ok: false, lyDo: 'chứa "..": ' + rel };
  const segments = rel.split(/[\\/]+/).filter(Boolean);
  for (const seg of segments) {
    if (HANG_SO.BANNED_SEGMENTS.includes(seg.toLowerCase())) {
      return { ok: false, lyDo: 'segment cấm "' + seg + '": ' + rel };
    }
  }
  const resolved = path.resolve(repoRoot, rel);
  const relative = path.relative(repoRoot, resolved);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    return { ok: false, lyDo: 'thoát ra ngoài repo sau resolve: ' + rel };
  }
  if (fs.existsSync(resolved)) {
    const realRepo = fs.realpathSync(repoRoot);
    const real = fs.realpathSync(resolved);
    const realRel = path.relative(realRepo, real);
    if (realRel.startsWith('..') || path.isAbsolute(realRel)) {
      return { ok: false, lyDo: 'symlink/junction trỏ ra ngoài repo: ' + rel + ' → ' + real };
    }
  }
  return { ok: true, lyDo: null };
}

// ===== 4. Đọc + xác thực manifest =====
// Mọi dòng không hợp lệ → throw (dừng), không bỏ dòng rồi tiếp tục.
function docManifest(manifestPath, repoRoot) {
  if (!fs.existsSync(manifestPath)) {
    throw new Error('Không tìm thấy manifest: ' + manifestPath);
  }
  const raw = fs.readFileSync(manifestPath, 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
  if (!raw.length) throw new Error('Manifest rỗng: ' + manifestPath);
  const loi = [];
  for (const rel of raw) {
    const k = kiemDuongDan(rel, repoRoot);
    if (!k.ok) loi.push(k.lyDo);
  }
  if (loi.length) {
    throw new Error('Manifest không hợp lệ (' + loi.length + ' dòng bị từ chối):\n  ' + loi.slice(0, 10).join('\n  '));
  }
  return raw;
}

// ===== 5. Copy an toàn =====
// Tự đệ quy bằng readdir (không dùng cpSync mù); chặn symlink ở mọi tầng.
function copyAnToan(src, dst, repoRoot, thongKe) {
  const st = fs.lstatSync(src); // lstat: không đi theo symlink
  if (st.isSymbolicLink()) {
    throw new Error('Không đi theo symlink: ' + src);
  }
  if (st.isDirectory()) {
    for (const name of fs.readdirSync(src).sort()) {
      copyAnToan(path.join(src, name), path.join(dst, name), repoRoot, thongKe);
    }
    return;
  }
  if (!st.isFile()) throw new Error('Loại tệp không hỗ trợ: ' + src);
  // Sau realpath, tệp vẫn phải nằm trong repo
  const realRepo = fs.realpathSync(repoRoot);
  const realSrc = fs.realpathSync(src);
  if (path.relative(realRepo, realSrc).startsWith('..')) {
    throw new Error('Tệp sau realpath nằm ngoài repo: ' + src);
  }
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  thongKe.copied++;
  thongKe.duyet.add(path.relative(thongKe.sandboxDir, dst).split(path.sep).join('/'));
}

// ===== 6. Dựng cây sandbox =====
// Xác minh repo + vị trí; sandbox đã tồn tại mà không có marker (không do
// công cụ này tạo) → throw trước khi xóa. Copy theo manifest + scripts + marker.
function dungCaySandbox({ repoRoot, sandboxDir, manifestPath, scriptsDir }) {
  xacThucRepo(repoRoot);
  xacThucViTriSandbox(repoRoot, sandboxDir);
  if (fs.existsSync(sandboxDir)) {
    if (!fs.existsSync(path.join(sandboxDir, HANG_SO.MARKER))) {
      throw new Error('Sandbox tồn tại nhưng không có marker ' + HANG_SO.MARKER + ' — không rõ nguồn gốc, không xóa: ' + sandboxDir);
    }
  }
  const manifestLines = docManifest(manifestPath, repoRoot);
  fs.rmSync(sandboxDir, { recursive: true, force: true });
  fs.mkdirSync(sandboxDir, { recursive: true });
  fs.writeFileSync(path.join(sandboxDir, HANG_SO.MARKER), 'sandbox P3.3 do tao-sandbox/driver tạo\n');

  const thongKe = { copied: 0, duyet: new Set(), sandboxDir };
  const missing = [];
  for (const rel of manifestLines) {
    const src = path.join(repoRoot, rel);
    if (!fs.existsSync(src)) { missing.push(rel); continue; }
    copyAnToan(src, path.join(sandboxDir, rel), repoRoot, thongKe);
  }
  if (missing.length) {
    throw new Error('Thiếu ' + missing.length + ' tệp bắt buộc trong manifest: ' + missing.slice(0, 5).join(', '));
  }
  // Copy scripts check-*.mjs
  const scriptFiles = fs.readdirSync(scriptsDir).filter(f => f.startsWith('check-') && f.endsWith('.mjs')).sort();
  for (const s of scriptFiles) {
    copyAnToan(path.join(scriptsDir, s), path.join(sandboxDir, 'scripts', s), repoRoot, thongKe);
  }
  return { manifestLines: manifestLines.length, ...thongKe };
}

// ===== 7. Hash toàn cây sandbox =====
// Map rel→sha256 cho mọi tệp thường (bao gồm marker). Symlink → throw.
function hashToanBoSandbox(sandboxDir) {
  const map = new Map();
  const duyet = (dir) => {
    for (const name of fs.readdirSync(dir).sort()) {
      const full = path.join(dir, name);
      const st = fs.lstatSync(full);
      if (st.isSymbolicLink()) throw new Error('Sandbox chứa symlink: ' + full);
      if (st.isDirectory()) { duyet(full); continue; }
      if (!st.isFile()) throw new Error('Loại tệp không hỗ trợ trong sandbox: ' + full);
      const rel = path.relative(sandboxDir, full).split(path.sep).join('/');
      map.set(rel, crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex'));
    }
  };
  duyet(sandboxDir);
  return map;
}

// ===== 8. Hash script bản sao = nguồn =====
function hashScripts({ sandboxDir, repoRoot }) {
  const bang = {};
  let khop = 0, lech = 0;
  const dir = path.join(sandboxDir, 'scripts');
  if (!fs.existsSync(dir)) throw new Error('Sandbox thiếu scripts/');
  for (const s of fs.readdirSync(dir).sort()) {
    const src = fs.readFileSync(path.join(repoRoot, 'scripts', s));
    const dst = fs.readFileSync(path.join(dir, s));
    const h1 = crypto.createHash('sha256').update(src).digest('hex');
    const h2 = crypto.createHash('sha256').update(dst).digest('hex');
    bang[s] = { src: h1, dst: h2, khop: h1 === h2 };
    if (h1 === h2) khop++; else lech++;
  }
  return { bang, khop, lech };
}

// ===== 9. Sanity: chạy 1 script sạch trong sandbox =====
function sanityScript(sandboxDir, scriptName) {
  const { execFileSync } = require('child_process');
  try {
    const r = execFileSync('node', [path.join('scripts', scriptName)],
      { cwd: sandboxDir, encoding: 'utf8', timeout: 60000, stdio: ['pipe', 'pipe', 'pipe'] });
    return { ok: true, exit: 0, stdout: r || '', stderr: '' };
  } catch (e) {
    return {
      ok: false, exit: e.status ?? 'LAUNCH-ERROR',
      stdout: String(e.stdout || ''), stderr: String(e.stderr || ''),
    };
  }
}

// ===== 10. Xây bản nền =====
function xayBenNen({ repoRoot, sandboxDir, manifestPath, scriptsDir, sanity = 'check-brand-value-retention.mjs' }) {
  const cay = dungCaySandbox({ repoRoot, sandboxDir, manifestPath, scriptsDir });
  const hs = hashScripts({ sandboxDir, repoRoot });
  if (hs.lech > 0) throw new Error('Hash script bản sao lệch nguồn: ' + hs.lech + ' tệp');
  const san = sanityScript(sandboxDir, sanity);
  if (!san.ok) {
    throw new Error('Sanity thất bại (' + sanity + ' exit=' + san.exit + '): ' + (san.stdout || san.stderr).slice(0, 400));
  }
  const bangHash = hashToanBoSandbox(sandboxDir);
  return {
    bangHash,
    tapDuongDan: new Set(bangHash.keys()),
    scripts: hs,
    sanity: { script: sanity, exit: 0 },
    soTep: bangHash.size,
    manifestLines: cay.manifestLines,
    copied: cay.copied,
  };
}

// ===== 11. So khớp với bản nền =====
function soKhopNen(hashHienTai, benNen) {
  const hienTai = hashHienTai instanceof Map ? hashHienTai : new Map(Object.entries(hashHienTai));
  const thieu = [], du = [], lech = [];
  for (const [rel, h] of benNen.bangHash) {
    const cur = hienTai.get(rel);
    if (cur === undefined) thieu.push(rel);
    else if (cur !== h) lech.push(rel);
  }
  for (const rel of hienTai.keys()) {
    if (!benNen.bangHash.has(rel)) du.push(rel);
  }
  return {
    ok: !thieu.length && !du.length && !lech.length,
    hashKhop: !lech.length,
    duongDanKhop: !thieu.length && !du.length,
    thieu, du, lech,
  };
}

module.exports = {
  HANG_SO,
  xacThucRepo,
  xacThucViTriSandbox,
  kiemDuongDan,
  docManifest,
  copyAnToan,
  dungCaySandbox,
  hashToanBoSandbox,
  hashScripts,
  sanityScript,
  xayBenNen,
  soKhopNen,
};
