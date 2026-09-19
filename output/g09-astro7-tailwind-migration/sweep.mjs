// G09-C Đ1-PA1 — sweep định dạng + JSON + dữ liệu nhạy cảm trên tệp gói worktree
// (khung giống sweep-g09-c.mjs: kyLa, nhayCam ghép mảnh chuỗi, whitespace/EOF,
// JSON hợp lệ; log-* được miễn kyLa vì npm/astro in ANSI)
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const goi = 'output/g09-astro7-tailwind-migration';
const files = [
  'docs/nghiem-thu/G09-C-astro7-tailwind-migration-2026-09-20.md',
  'package.json',
  'postcss.config.mjs',
  'astro.config.mjs',
  'src/components/infographics/MechanismAnimation.astro',
  ...readdirSync(goi).filter((f) => !f.startsWith('log-sweep')).map((f) => goi + '/' + f),
];

// Tệp chỉ sửa ít dòng nhưng sweep quét nguyên tệp: ký tự lạ ở dòng KHÔNG thuộc
// diff (so dãy codePoint với `git show HEAD:<tệp>`) là hiện trạng có trước — miễn.
const CO_TRUOC = ['src/components/infographics/MechanismAnimation.astro'];

const kyLa = new RegExp('[^\\u0000-\\u024F\\u1E00-\\u1EFF\\u2018\\u2019\\u201C\\u201D\\u2013\\u2014\\u2026\\u00D7\\u00B0\\u2212\\u2192\\u2260\\u2264\\u2265\\s\\x20-\\x7E]', 'g');
// dữ liệu nhạy cảm: token/cookie/Authorization/secret/mật khẩu — URL registry hợp lệ không khớp mẫu này
const nhay = new RegExp(['(?:to' + 'ken|cook' + 'ie|authoriz' + 'ation|sec' + 'ret|pass' + 'word)\\s*[:=]\\s*["\']?[A-Za-z0-9._-]{8,}'].join('|'), 'gi');

let loi = 0;
for (const f of files) {
  if (!existsSync(f)) { console.log('LOI ' + f + ' — chưa tồn tại'); loi++; continue; }
  const t = readFileSync(f, 'utf8');
  const dong = t.split('\n');
  const eof = /\n$/.test(t);
  if (eof) dong.pop();
  const spaceCuoi = dong.map((l, i) => (/[ \t]+$/.test(l) ? i + 1 : 0)).filter(Boolean);
  let trongCuoi = 0;
  { const d = [...dong]; while (d.length && /^\s*$/.test(d[d.length - 1])) { d.pop(); trongCuoi++; } }
  const laJson = f.endsWith('.json');
  const laLog = f.includes('log-');
  const quetKyLa = (src) => src.split('\n').map((l, i) => { kyLa.lastIndex = 0; const m = kyLa.exec(l); return m ? i + 1 + ':' + m[0].codePointAt(0).toString(16) : null; }).filter(Boolean);
  let x = laLog ? [] : quetKyLa(t);
  if (!laLog && x.length && CO_TRUOC.includes(f)) {
    const head = execFileSync('git', ['show', 'HEAD:' + f], { encoding: 'utf8' });
    // so sánh DÃY codePoint (bỏ số dòng — diff gói làm dòng dịch), kèm số lần xuất hiện
    const bang = (ds) => JSON.stringify(ds.map((s) => s.split(':')[1]).sort());
    if (bang(x) === bang(quetKyLa(head))) {
      console.log('  GHI-CHU ' + f + ': ' + x.length + ' vị trí ký tự lạ cùng dãy codePoint với HEAD (hiện trạng có trước) — ' + x.join(','));
      x = [];
    }
  }
  let jsonOk = true;
  if (laJson) { try { JSON.parse(t); } catch (e) { jsonOk = false; console.log('  JSON-LOI: ' + e.message); } }
  nhay.lastIndex = 0;
  const nhayKhop = t.match(nhay) || [];
  if (spaceCuoi.length || trongCuoi || !eof || x.length || !jsonOk || nhayKhop.length) {
    console.log('LOI ' + f + ' spaceCuoi=' + JSON.stringify(spaceCuoi.slice(0, 5)) + ' trongCuoi=' + trongCuoi + ' EOF=' + eof + ' kyLa=' + x.slice(0, 4).join(',') + ' nhayCam=' + JSON.stringify(nhayKhop.slice(0, 2)));
    loi++;
  } else {
    console.log('SACH ' + f + (laJson ? ' (JSON hợp lệ)' : ''));
  }
}
console.log('TONG_LOI=' + loi);
process.exit(loi === 0 ? 0 : 1);
