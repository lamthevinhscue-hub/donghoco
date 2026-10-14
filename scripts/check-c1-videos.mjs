// C1-B2 — checker hồi quy video sau nén (v2 theo tái nghiệm thu TXN-20261015-27).
// Hai chế độ:
//   mặc định (nguồn): đối chiếu public/videos với fixture scripts/fixtures/c1-video-baseline.json
//   --dist <dir>    : thêm phần đối chiếu dist byte-match public cho toàn bộ tài sản fixture
// Tham số lạ, thiếu giá trị, fixture thiếu trường/kiểu sai/dưới ngưỡng/tập lệch đều FAIL — không âm thầm qua.
// Chạy được trên checkout mới, không cần output/ và không cần FFmpeg (chỉ hash + đếm tệp).
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const rawArgs = process.argv.slice(2);
let root = REPO;
let fixturePath = join(REPO, 'scripts', 'fixtures', 'c1-video-baseline.json');
let distDir = null;
// Arg parsing nghiêm: chỉ chấp nhận --root <v>, --fixture <v>, --dist <v>; arg vị trí/lạ → FAIL
for (let i = 0; i < rawArgs.length; i++) {
  const a = rawArgs[i];
  if (a === '--root' || a === '--fixture' || a === '--dist') {
    const v = rawArgs[i + 1];
    if (v == null || v.startsWith('--')) { console.error(`KHONG DAT C1-ARG: ${a} thiếu giá trị`); process.exit(1); }
    if (a === '--root') root = resolve(v);
    else if (a === '--fixture') fixturePath = resolve(v);
    else distDir = resolve(v);
    i++;
  } else {
    console.error(`KHONG DAT C1-ARG: tham số không hợp lệ "${a}" (dùng --root/--fixture/--dist kèm giá trị)`); process.exit(1);
  }
}

const loi = [];
function fail(rule, msg) { loi.push(`${rule}: ${msg}`); }
function sha256(p) { return createHash('sha256').update(readFileSync(p)).digest('hex'); }
const HASH_RE = /^[0-9a-f]{64}$/;
const isPosInt = (x) => Number.isInteger(x) && x > 0;
const isFiniteNum = (x) => typeof x === 'number' && Number.isFinite(x);

// Tập cố định theo câu lệnh C1-B2 (TXN-20261014-26) và phán quyết TXN-20261015-27
// (chọn hướng a — thay 14 tệp của 7 tiền tố) — KHÔNG suy từ fixture tự khai.
const TIEN_TO_DUOC_THAY = [
  'bo-thoat-nguyen-ly', 'chong-tu-nguyen-ly', 'chuyen-dong-co-nguyen-ly',
  'day-toc-banh-lac-nguyen-ly', 'len-day-tu-dong-nguyen-ly', 'perpetual-calendar-nguyen-ly',
  'tru-cot-nguyen-ly',
];
const TIEN_TO_KHONG_THAY = [
  'bo-thoat-dong-truc-nguyen-ly', 'chong-nuoc-nguyen-ly', 'chong-soc-nguyen-ly',
  'da-quang-nguyen-ly', 'gmt-nguyen-ly', 'hien-thi-ngay-nguyen-ly', 'kinh-dong-ho-nguyen-ly',
  'pha-trang-nguyen-ly', 'tourbillon-nguyen-ly',
];
const TIEN_TO_KHOA = ['chronograph-nguyen-ly', 'diem-chuong-nguyen-ly'];
const TAP_NEN_CAU_LENH = new Set();
for (const t of TIEN_TO_DUOC_THAY) for (const n of ['vi', 'en']) TAP_NEN_CAU_LENH.add(`${t}-${n}.mp4`);

// ---- N1: fixture hợp lệ — cấu hình khóa, ngưỡng khóa, kiểu dữ liệu, tập cố định, không trùng/giao ----
if (!existsSync(fixturePath)) { console.error('KHONG DAT C1-N1: thiếu fixture ' + fixturePath); process.exit(1); }
let fx;
try { fx = JSON.parse(readFileSync(fixturePath, 'utf8')); } catch (e) { console.error('KHONG DAT C1-N1: fixture không đọc được: ' + e.message); process.exit(1); }
const NGUONG = { vmaf_mean: 95, vmaf_p5: 90, ssim: 0.98 };
const CAU_HINH_BAT_BUOC = { codec: 'libx264', preset: 'slow', crf: 22, pix_fmt: 'yuv420p', audio: 'copy', movflags: '+faststart' };
for (const k of ['cau_hinh', 'nguong', 'nen', 'giu_goc', 'poster']) {
  if (fx[k] == null) fail('C1-N1', `fixture thiếu "${k}"`);
}
if (fx.cau_hinh) {
  for (const [k, v] of Object.entries(CAU_HINH_BAT_BUOC)) {
    if (fx.cau_hinh[k] !== v) fail('C1-N1', `cau_hinh.${k} phải là ${JSON.stringify(v)}, fixture khai ${JSON.stringify(fx.cau_hinh[k])}`);
  }
}
if (fx.nguong && (fx.nguong.vmaf_mean !== NGUONG.vmaf_mean || fx.nguong.vmaf_p5 !== NGUONG.vmaf_p5 || fx.nguong.ssim !== NGUONG.ssim)) {
  fail('C1-N1', `ngưỡng fixture lệch chuẩn (phải ${NGUONG.vmaf_mean}/${NGUONG.vmaf_p5}/${NGUONG.ssim})`);
}
const nen = fx.nen ?? [];
const giuGoc = fx.giu_goc ?? [];
const poster = fx.poster ?? [];

// Tập cố định: nen phải đúng 14 tệp được phép theo câu lệnh; giu_goc đúng 22 còn lại; poster 36
const tenNenArr = nen.map((n) => n.file);
const tenGiuArr = giuGoc.map((g) => g.file);
if (tenNenArr.length !== nen.length || tenGiuArr.length !== giuGoc.length || poster.length !== (fx.poster ?? []).length) {
  fail('C1-N1', 'mảng fixture có phần tử thiếu trường file');
}
const tenNen = new Set(tenNenArr);
const tenGiu = new Set(tenGiuArr);
if (tenNen.size !== tenNenArr.length) fail('C1-N1', `nen có bản ghi trùng tên (${tenNenArr.length} bản ghi, ${tenNen.size} tên)`);
if (tenGiu.size !== tenGiuArr.length) fail('C1-N1', `giu_goc có bản ghi trùng tên (${tenGiuArr.length} bản ghi, ${tenGiu.size} tên)`);
for (const f of tenNen) if (tenGiu.has(f)) fail('C1-N1', `tệp nằm cả hai nhóm: ${f}`);
if (!tenNenArr.every((f) => TAP_NEN_CAU_LENH.has(f))) {
  fail('C1-N1', `nen chứa tệp ngoài tập câu lệnh: ${tenNenArr.filter((f) => !TAP_NEN_CAU_LENH.has(f)).join(', ')}`);
}
if (tenNenArr.length !== TAP_NEN_CAU_LENH.size) {
  fail('C1-N1', `nen phải đủ ${TAP_NEN_CAU_LENH.size} tệp theo tập câu lệnh, fixture có ${tenNenArr.length} — thiếu: ${[...TAP_NEN_CAU_LENH].filter((f) => !tenNen.has(f)).join(', ')}`);
}
const mp4TatCa = [...tenNenArr, ...tenGiuArr];
const tapToanBo = new Set();
for (const t of [...TIEN_TO_DUOC_THAY, ...TIEN_TO_KHONG_THAY, ...TIEN_TO_KHOA]) for (const n of ['vi', 'en']) tapToanBo.add(`${t}-${n}.mp4`);
if (mp4TatCa.length !== 36) fail('C1-N1', `tổng MP4 fixture phải 36, có ${mp4TatCa.length}`);
const ngoaiTap = mp4TatCa.filter((f) => !tapToanBo.has(f));
if (ngoaiTap.length) fail('C1-N1', `MP4 ngoài tập 18 tiền tố câu lệnh: ${ngoaiTap.join(', ')}`);
const thieuTrongTap = [...tapToanBo].filter((f) => !mp4TatCa.includes(f));
if (thieuTrongTap.length) fail('C1-N1', `thiếu MP4 so với tập câu lệnh: ${thieuTrongTap.join(', ')}`);
// tệp KHÔNG được thay phải nằm trong giu_goc (nghiêm cấm thay tệp ngoài 14)
for (const t of [...TIEN_TO_KHONG_THAY, ...TIEN_TO_KHOA]) for (const n of ['vi', 'en']) {
  const f = `${t}-${n}.mp4`;
  if (!tenGiu.has(f)) fail('C1-N1', `tệp không thuộc 14 được thay phải nằm ở giu_goc: ${f}`);
}
const posterFiles = poster.map((p) => p.file);
if (poster.length !== 36) fail('C1-N1', `poster phải 36, fixture có ${poster.length}`);
if (new Set(posterFiles).size !== posterFiles.length) fail('C1-N1', 'poster có bản ghi trùng tên');
for (const f of posterFiles) {
  if (!/^[a-z0-9-]+-(vi|en)\.jpg$/.test(f)) fail('C1-N1', `poster tên không đúng mẫu: ${f}`);
}

for (const n of nen) {
  for (const k of ['file', 'goc_bytes', 'goc_sha256', 'bytes', 'sha256', 'vmaf_mean', 'vmaf_p5', 'ssim_mean', 'audio_sha256',
    'decode_exit', 'delta_video_ms', 'delta_audio_ms', 'delta_container_ms', 'moov_truoc_mdat',
    'frames_cand', 'frames_goc', 'drift_ms', 'self_ref_vmaf_mean', 'cua_so_5s_vmaf_mean',
    'max_lech_pts_ms', 'max_lech_frame_idx', 'so_muc_pts_cand',
    'so_frame_so_sanh', 'vi_tri_null_goc', 'vi_tri_null_cand']) {
    if (!(k in n)) fail('C1-N1', `nen.${n.file ?? '?'} thiếu "${k}"`);
  }
  if (!/^[a-z0-9-]+-(vi|en)\.mp4$/.test(n.file ?? '')) fail('C1-N1', `nen tên không đúng mẫu: ${n.file}`);
  if (!isPosInt(n.bytes) || !isPosInt(n.goc_bytes)) fail('C1-N1', `nen.${n.file} bytes/goc_bytes phải số nguyên dương`);
  if (!HASH_RE.test(n.sha256 ?? '') || !HASH_RE.test(n.goc_sha256 ?? '') || !HASH_RE.test(n.audio_sha256 ?? '')) {
    fail('C1-N1', `nen.${n.file} hash phải hex-64`);
  }
  if (!isFiniteNum(n.vmaf_mean) || !isFiniteNum(n.vmaf_p5) || !isFiniteNum(n.ssim_mean)) {
    fail('C1-N1', `nen.${n.file} vmaf/p5/ssim phải number hữu hạn (nhận: ${JSON.stringify([n.vmaf_mean, n.vmaf_p5, n.ssim_mean])})`);
  } else if (n.vmaf_mean < NGUONG.vmaf_mean || n.vmaf_p5 < NGUONG.vmaf_p5 || n.ssim_mean < NGUONG.ssim) {
    fail('C1-N1', `nen.${n.file} số đo dưới ngưỡng (vmaf=${n.vmaf_mean} p5=${n.vmaf_p5} ssim=${n.ssim_mean})`);
  }
  if (isPosInt(n.goc_bytes) && isPosInt(n.bytes) && n.bytes >= n.goc_bytes) {
    fail('C1-N1', `nen.${n.file} bytes không nhỏ hơn nguồn (${n.bytes} >= ${n.goc_bytes})`);
  }
  if (n.decode_exit !== 0) fail('C1-N1', `nen.${n.file} decode_exit phải 0 (fixture khai ${JSON.stringify(n.decode_exit)})`);
  for (const k of ['delta_video_ms', 'delta_audio_ms', 'delta_container_ms']) {
    if (!isFiniteNum(n[k]) || Math.abs(n[k]) > 100) fail('C1-N1', `nen.${n.file} ${k} phải number hữu hạn và |Δ|≤100ms (nhận ${JSON.stringify(n[k])})`);
  }
  if (n.moov_truoc_mdat !== true) fail('C1-N1', `nen.${n.file} moov_truoc_mdat phải true`);
  if (!isPosInt(n.frames_cand) || !isPosInt(n.frames_goc) || n.frames_cand !== n.frames_goc) {
    fail('C1-N1', `nen.${n.file} frames_cand/frames_goc phải số nguyên dương bằng nhau (đếm decode thật)`);
  }
  if (!isFiniteNum(n.drift_ms) || Math.abs(n.drift_ms) > 100) fail('C1-N1', `nen.${n.file} drift_ms phải number hữu hạn |Δ|≤100ms`);
  if (!isFiniteNum(n.self_ref_vmaf_mean)) fail('C1-N1', `nen.${n.file} self_ref_vmaf_mean phải number hữu hạn`);
  if (!isFiniteNum(n.cua_so_5s_vmaf_mean)) fail('C1-N1', `nen.${n.file} cua_so_5s_vmaf_mean phải number hữu hạn`);
  if (!isFiniteNum(n.max_lech_pts_ms) || n.max_lech_pts_ms > 100 || n.max_lech_pts_ms < 0) {
    fail('C1-N1', `nen.${n.file} max_lech_pts_ms phải number hữu hạn 0..100 (nhận ${JSON.stringify(n.max_lech_pts_ms)})`);
  }
  if (!Number.isInteger(n.max_lech_frame_idx) || n.max_lech_frame_idx < 0) fail('C1-N1', `nen.${n.file} max_lech_frame_idx phải chỉ số frame nguyên ≥0`);
  if (!isPosInt(n.so_muc_pts_cand) || (isPosInt(n.frames_cand) && n.so_muc_pts_cand !== n.frames_cand)) {
    fail('C1-N1', `nen.${n.file} so_muc_pts_cand phải bằng số frame decode (PTS JSON giữ đủ vị trí, không bỏ dòng)`);
  }
  if (!isPosInt(n.so_frame_so_sanh) || (isPosInt(n.frames_cand) && n.so_frame_so_sanh !== n.frames_cand)) {
    fail('C1-N1', `nen.${n.file} so_frame_so_sanh phải bằng số frame decode (so từng frame, không bỏ vị trí)`);
  }
  if (!Array.isArray(n.vi_tri_null_goc) || !Array.isArray(n.vi_tri_null_cand)) {
    fail('C1-N1', `nen.${n.file} vi_tri_null_goc/vi_tri_null_cand phải là mảng (không được che dữ liệu thiếu)`);
  } else if (n.vi_tri_null_goc.length > 0 || n.vi_tri_null_cand.length > 0) {
    fail('C1-N1', `nen.${n.file} còn PTS thiếu (goc=${JSON.stringify(n.vi_tri_null_goc)}, cand=${JSON.stringify(n.vi_tri_null_cand)})`);
  }
}
for (const g of [...giuGoc, ...poster]) {
  for (const k of ['file', 'bytes', 'sha256']) {
    if (!(k in g)) fail('C1-N1', `fixture "${g.file ?? '?'}" thiếu "${k}"`);
  }
  if (!isPosInt(g.bytes)) fail('C1-N1', `${g.file ?? '?'} bytes phải số nguyên dương`);
  if (!HASH_RE.test(g.sha256 ?? '')) fail('C1-N1', `${g.file ?? '?'} hash phải hex-64`);
}

// ---- N2: public/videos đúng tập 36 MP4 + 36 poster ----
const videoDir = join(root, 'public', 'videos');
if (!existsSync(videoDir)) { fail('C1-N2', `thiếu thư mục ${videoDir}`); }
else {
  const thuc = readdirSync(videoDir).filter((f) => !f.startsWith('.'));
  const mp4 = thuc.filter((f) => f.endsWith('.mp4')).sort();
  const jpg = thuc.filter((f) => f.endsWith('.jpg')).sort();
  if (mp4.length !== 36) fail('C1-N2', `MP4 phải 36, có ${mp4.length}`);
  if (jpg.length !== 36) fail('C1-N2', `poster phải 36, có ${jpg.length}`);
  if (mp4.length === 36 && jpg.length === 36) {
    const tapMong = new Set([...mp4TatCa, ...posterFiles].sort());
    const tapThuc = new Set([...mp4, ...jpg].sort());
    const thua = [...tapThuc].filter((x) => !tapMong.has(x));
    const thieu = [...tapMong].filter((x) => !tapThuc.has(x));
    if (thua.length) fail('C1-N2', `tệp thừa ngoài fixture: ${thua.join(', ')}`);
    if (thieu.length) fail('C1-N2', `tệp thiếu so fixture: ${thieu.join(', ')}`);
  }
}

// ---- N3/N4: hash + bytes khớp fixture ----
for (const n of nen) {
  const p = join(videoDir, n.file);
  if (!existsSync(p)) { fail('C1-N3', `thiếu tệp nén ${n.file}`); continue; }
  const b = statSync(p).size;
  const h = sha256(p);
  if (b !== n.bytes || h !== n.sha256) fail('C1-N3', `${n.file} lệch fixture (bytes ${b}≠${n.bytes} hoặc hash ${h.slice(0, 12)}≠${n.sha256.slice(0, 12)})`);
}
for (const g of [...giuGoc, ...poster]) {
  const p = join(videoDir, g.file);
  if (!existsSync(p)) { fail('C1-N4', `thiếu tệp giữ nguyên ${g.file}`); continue; }
  const b = statSync(p).size;
  const h = sha256(p);
  if (b !== g.bytes || h !== g.sha256) fail('C1-N4', `${g.file} phải giữ nguyên bytes/hash (bytes ${b}≠${g.bytes} hoặc hash ${h.slice(0, 12)}≠${g.sha256.slice(0, 12)})`);
}

// ---- N5 (dist): byte-match public ----
if (distDir != null) {
  const distVideos = join(distDir, 'videos');
  if (!existsSync(distVideos)) fail('C1-N5', `thiếu ${distVideos}`);
  else {
    for (const f of [...mp4TatCa, ...posterFiles]) {
      const a = join(videoDir, f);
      const b = join(distVideos, f);
      if (!existsSync(a)) { fail('C1-N5', `public thiếu ${f}, dist không đối chiếu được`); continue; }
      if (!existsSync(b)) { fail('C1-N5', `dist thiếu ${f}`); continue; }
      if (sha256(a) !== sha256(b)) fail('C1-N5', `dist lệch public: ${f}`);
    }
  }
}

if (loi.length) {
  console.error(`KHONG DAT bo kiem C1 (${loi.length} loi):`);
  for (const l of loi) console.error('  ' + l);
  process.exit(1);
}
console.log(`DAT bo kiem C1: fixture ${nen.length} nen + ${giuGoc.length} giu goc + ${poster.length} poster${distDir != null ? ' + dist byte-match' : ''}`);
