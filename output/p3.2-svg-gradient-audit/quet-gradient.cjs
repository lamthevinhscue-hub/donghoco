// P3.2 chặng A — Quét gradient SVG trong src/, public/ và dist/ (chỉ đọc).
// Chạy: node output/p3.2-svg-gradient-audit/quet-gradient.cjs
// Kết quả ghi: output/p3.2-svg-gradient-audit/kiem-ke-gradient.json
// Không sửa bất kỳ tệp nguồn nào.
// TXN-20260910-22: nhận diện ID dùng lib-id.cjs (bỏ comment/script, chỉ nhận
// thuộc tính id độc lập — không nhầm data-part-id/data-id).
const fs = require('fs');
const path = require('path');
const { scanIdInventory } = require(path.join(__dirname, 'lib-id.cjs'));

const SRC_EXT = ['.astro', '.ts', '.tsx', '.mjs', '.css', '.md', '.js'];
const OUT = 'output/p3.2-svg-gradient-audit';

function listFiles(dir, exts, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      listFiles(p, exts, acc);
    } else if (exts.some((e) => name.toLowerCase().endsWith(e))) acc.push(p);
  }
  return acc;
}

function scanText(rel, text, source) {
  const lines = text.split('\n');
  const defs = [];
  const reDef = /<(linearGradient|radialGradient)\b([^>]*)>/g;
  let m;
  while ((m = reDef.exec(text)) !== null) {
    const type = m[1];
    const attrs = m[2];
    const line = text.slice(0, m.index).split('\n').length;
    const attr = (name) => {
      const a = new RegExp(name + '="([^"]*)"').exec(attrs);
      return a ? a[1] : null;
    };
    const id = attr('id');
    // Thu thập stops của gradient này: từ vị trí m đến </linearGradient|radialGradient> gần nhất
    const closeIdx = text.indexOf('</' + type, m.index);
    const block = closeIdx > 0 ? text.slice(m.index, closeIdx) : '';
    const stops = [...block.matchAll(/<stop\b([^>]*)>/g)].map((s) => {
      const a = s[1];
      const g = (n) => { const r = new RegExp(n + '="([^"]*)"').exec(a); return r ? r[1] : null; };
      const style = g('style') || '';
      const varColor = (style.match(/stop-color:\s*(var\([^)]+\)|#[0-9a-fA-F]+|[a-z]+)/) || [])[1] || null;
      const styleOpacity = (style.match(/stop-opacity:\s*([\d.]+)/) || [])[1] || null;
      return { offset: g('offset'), color: g('stop-color'), bienMau: varColor, opacity: g('stop-opacity'), styleOpacity, style: style || null };
    });
    defs.push({
      file: rel, line, loai: type, id,
      gradientUnits: attr('gradientUnits'),
      gradientTransform: attr('gradientTransform'),
      spreadMethod: attr('spreadMethod'),
      x1: attr('x1'), y1: attr('y1'), x2: attr('x2'), y2: attr('y2'),
      cx: attr('cx'), cy: attr('cy'), r: attr('r'), fr: attr('fr'),
      fx: attr('fx'), fy: attr('fy'),
      href: attr('href') || attr('xlink:href') || null,
      stops,
    });
    // Bắt cả stop-color="..." dạng thuộc tính (hiếm) — giữ trong stops.color
    if (defs.length && defs[defs.length - 1].stops.some((s) => s.color)) {
      defs[defs.length - 1].stops = defs[defs.length - 1].stops.map((s) => ({ ...s, bienMau: s.bienMau || s.color }));
    }
  }
  // Tham chiếu
  const refs = [];
  const reRef = /url\(#([^)]+)\)/g;
  while ((m = reRef.exec(text)) !== null) {
    const line = text.slice(0, m.index).split('\n').length;
    refs.push({ file: rel, line, id: m[1], kieu: 'url(#)', source });
  }
  const reHref = /<(?:animate|animateTransform|set|use|image|feImage)[^>]*(?:xlink:)?href="#([^"]+)"/g;
  while ((m = reHref.exec(text)) !== null) {
    const line = text.slice(0, m.index).split('\n').length;
    refs.push({ file: rel, line, id: m[1], kieu: 'href', source });
  }
  return { defs, refs };
}

(async () => {
  const ketQua = { thoiGian: new Date().toISOString(), nguon: {}, defs: [], refs: [], svgNgoai: [] };

  // 1. src/
  for (const f of listFiles('src', SRC_EXT)) {
    const text = fs.readFileSync(f, 'utf8');
    if (!/<(linearGradient|radialGradient)\b|url\(#/.test(text)) continue;
    const rel = f.replace(/\\/g, '/');
    const { defs, refs } = scanText(rel, text, 'src');
    ketQua.defs.push(...defs);
    ketQua.refs.push(...refs);
  }

  // 2. public/ — SVG ngoài
  for (const f of listFiles('public', ['.svg'])) {
    const text = fs.readFileSync(f, 'utf8');
    if (!/<(linearGradient|radialGradient)\b|url\(#/.test(text)) continue;
    const rel = f.replace(/\\/g, '/');
    const { defs, refs } = scanText(rel, text, 'public-svg');
    ketQua.defs.push(...defs);
    ketQua.refs.push(...refs);
    ketQua.svgNgoai.push(rel);
  }

  // 3. dist/ — HTML (route thật) + CSS + JS build
  ketQua.idToanTaiLieu = {}; // tài liệu dist chứa url(#…): toàn bộ phần tử có id (tag + id) để kiểm đích tham chiếu
  for (const f of listFiles('dist', ['.html', '.css', '.js'])) {
    const text = fs.readFileSync(f, 'utf8');
    if (!/<(linearGradient|radialGradient)\b|url\(#/.test(text)) continue;
    const rel = f.replace(/\\/g, '/');
    const { defs, refs } = scanText(rel, text, 'dist');
    ketQua.defs.push(...defs);
    ketQua.refs.push(...refs);
    if (f.endsWith('.html') && refs.length) {
      ketQua.idToanTaiLieu[rel] = scanIdInventory(text);
    }
  }

  // Tổng hợp nguồn
  const theoNguon = {};
  for (const d of ketQua.defs) {
    const key = d.file.startsWith('dist/') ? 'dist' : (d.source === 'public-svg' ? 'public-svg' : 'src');
    theoNguon[key] = (theoNguon[key] || 0) + 1;
  }
  const teptin = [...new Set(ketQua.defs.map((d) => d.file))];
  ketQua.tong = {
    dinhNghia: ketQua.defs.length,
    theoNguon,
    soTepCoDinhNghia: teptin.length,
    dsTep: teptin,
    soThamChieuUrlHash: ketQua.refs.filter((r) => r.kieu === 'url(#)').length,
    soThamChieuHref: ketQua.refs.filter((r) => r.kieu === 'href').length,
  };

  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'kiem-ke-gradient.json'), JSON.stringify(ketQua, null, 1));
  console.log('Đã ghi kiem-ke-gradient.json');
  console.log('TỔNG ĐỊNH NGHĨA: ' + ketQua.defs.length + ' | ' + JSON.stringify(theoNguon) + ' | tệp: ' + teptin.length);
  console.log('THAM CHIẾU url(#): ' + ketQua.tong.soThamChieuUrlHash + ' | href: ' + ketQua.tong.soThamChieuHref);
  for (const t of teptin) {
    const n = ketQua.defs.filter((d) => d.file === t).length;
    const ids = ketQua.defs.filter((d) => d.file === t).map((d) => d.id || '(không id)').join(', ');
    console.log('  ' + t + ': ' + n + ' định nghĩa [' + ids + ']');
  }
})();
