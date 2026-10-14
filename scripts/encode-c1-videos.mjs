// C1-B2 — encode candidate MP4 (libx264 CRF22 cố định, audio copy, faststart) — v3 theo TXN-20261015-28.
// Nguồn từ output/c1-video-encode-audit/ban-goc/ (baseline đã xác minh qua manifest bước 1).
// Candidate: output/c1-video-encode-audit/candidate/. KHÔNG đụng public/.
// Thực thi TUẦN TỰ (tối đa 1 job đồng thời — trong giới hạn tối đa 2 job của câu lệnh).
// Quy tắc (v3):
//   - Nguồn đổi so với baseline đã xác minh → FAIL TRƯỚC KHI encode (không tự coi là nguồn mới).
//   - Resume chỉ skip khi: log có cấu hình đầy đủ khớp chuẩn (codec/preset/crf/pix_fmt/audio/movflags/g/fps)
//     + nguồn hash khớp + candidate tồn tại + hash khớp + candidate GIẢI MÃ ĐƯỢC (ffprobe -xerror).
//     Hash khớp KHÔNG thay thế kiểm cấu hình hoặc kiểm giải mã.
//   - Log cũ thiếu cấu hình hoặc cấu hình lệch chuẩn → không hợp lệ → encode lại.
//   - Bản ghi thành công mới được đồng bộ trong bộ nhớ; kiểm cuối đối chiếu candidate với bản ghi MỚI,
//     không đối chiếu với log cũ.
// Tham số tùy chọn cho phép thử sandbox: --goc <dir> --cand <dir> --log <file> --manifest <file>
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, appendFileSync, mkdirSync, unlinkSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const BIN = 'C:/Users/Admin/AppData/Local/Microsoft/Winget/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin';
const FP = join(BIN, 'ffprobe.exe');
const FF = join(BIN, 'ffmpeg.exe');

const rawArgs = process.argv.slice(2);
let GOC = join(REPO, 'output', 'c1-video-encode-audit', 'ban-goc');
let CAND = join(REPO, 'output', 'c1-video-encode-audit', 'candidate');
let LOG = join(REPO, 'output', 'c1-video-encode-audit', 'log-encode-b2.jsonl');
let MANIFEST = join(REPO, 'output', 'c1-video-encode-audit', 'manifest-ban-goc.json');
let HO_SO = join(REPO, 'output', 'c1-video-encode-audit', 'tai-xac-minh-14.json');
for (let i = 0; i < rawArgs.length; i++) {
  const a = rawArgs[i];
  if (a === '--goc' || a === '--cand' || a === '--log' || a === '--manifest' || a === '--hoso') {
    const v = rawArgs[i + 1];
    if (v == null || v.startsWith('--')) { console.error(`Tham số ${a} thiếu giá trị`); process.exit(2); }
    if (a === '--goc') GOC = resolve(v);
    else if (a === '--cand') CAND = resolve(v);
    else if (a === '--log') LOG = resolve(v);
    else if (a === '--manifest') MANIFEST = resolve(v);
    else HO_SO = resolve(v);
    i++;
  } else { console.error(`Tham số không hợp lệ: ${a}`); process.exit(2); }
}

const TIEN_TO = [
  'bo-thoat-nguyen-ly', 'chong-tu-nguyen-ly', 'chuyen-dong-co-nguyen-ly',
  'day-toc-banh-lac-nguyen-ly', 'len-day-tu-dong-nguyen-ly', 'perpetual-calendar-nguyen-ly',
  'tru-cot-nguyen-ly',
];
const NGON_NGU = ['vi', 'en'];
const CAU_HINH_CHUAN = { codec: 'libx264', preset: 'slow', crf: 22, pix_fmt: 'yuv420p', audio: 'copy', movflags: '+faststart' };

const BAN_GOC = new Map();
for (const ngo of NGON_NGU) {
  for (const tt of TIEN_TO) {
    const name = `${tt}-${ngo}.mp4`;
    const p = join(GOC, name);
    if (!existsSync(p)) { console.error(`KHONG THAY BAN GOC: ${name}`); process.exit(2); }
    const buf = readFileSync(p);
    BAN_GOC.set(name, { name, path: p, bytes: buf.length, sha256: createHash('sha256').update(buf).digest('hex') });
  }
}
if (BAN_GOC.size !== 14) { console.error(`tap 14 lech: ${BAN_GOC.size}`); process.exit(2); }

// Baseline đã xác minh (manifest bước 1): nguồn đổi → FAIL, không tự coi là nguồn mới
const baseline = new Map(JSON.parse(readFileSync(MANIFEST, 'utf8')).map((g) => [g.file, g]));
const nguonDoi = [];
for (const v of BAN_GOC.values()) {
  const b = baseline.get(v.name);
  if (!b || b.sha256 !== v.sha256 || b.bytes !== v.bytes) nguonDoi.push(v.name);
}
if (nguonDoi.length) {
  console.error(`FAIL: nguồn đổi so với baseline đã xác minh — không encode: ${nguonDoi.join(', ')}`);
  process.exit(1);
}

function fpsNguon(path) {
  const r = spawnSync(FP, ['-v', 'error', '-of', 'json', '-show_format', '-show_streams', path], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`ffprobe loi: ${path}: ${r.stderr}`);
  const st = JSON.parse(r.stdout).streams ?? [];
  const v = st.find((s) => s.width != null && s.nb_frames != null);
  const raw = (v.avg_frame_rate && v.avg_frame_rate !== '0/0') ? v.avg_frame_rate : v.r_frame_rate;
  const [a, b] = raw.split('/').map(Number);
  return b ? a / b : Number(a);
}

function giaiMaDuoc(p) {
  // decode đầy đủ -xerror; lỗi/hỏng → false
  const r = spawnSync(FF, ['-v', 'error', '-xerror', '-i', p, '-f', 'null', '-'], { encoding: 'buffer', maxBuffer: 16 * 1024 * 1024 });
  return r.status === 0;
}

// Cơ sở resume: hồ sơ tái xác minh (output/c1-video-encode-audit/tai-xac-minh-14.json) — do
// lap-ho-so-tai-xac-minh.mjs lập từ bằng chứng đã có + hash/decode kiểm trực tiếp. Log cũ thiếu
// cấu hình KHÔNG tự coi là hợp lệ; log v2 chỉ là bằng chứng thô. Tham số --hoso cho phép thử sandbox.
const CAU_HINH_TRONG_LOG = ['codec', 'preset', 'crf', 'pix_fmt', 'audio', 'movflags'];
const logCu = new Map();
if (existsSync(HO_SO)) {
  const hs = JSON.parse(readFileSync(HO_SO, 'utf8'));
  for (const c of hs.candidate ?? []) {
    // hồ sơ chỉ hợp lệ khi cấu hình khớp chuẩn (CRF khác chuẩn trong hồ sơ → không hợp lệ)
    const chLech = CAU_HINH_TRONG_LOG.some((k) => c.cau_hinh?.[k] !== CAU_HINH_CHUAN[k]);
    if (chLech) continue;
    if (typeof c.g !== 'number' || !Number.isFinite(c.fps)) continue;
    if (c.cau_hinh.g != null && c.cau_hinh.g !== c.g) continue;
    if (c.hash_da_kiem_truc_tiep !== true || c.giai_ma_da_kiem_truc_tiep !== true) continue;
    logCu.set(c.file, { nguon_sha256: c.nguon_sha256, ket: { bytes: c.bytes, sha256: c.sha256 }, cau_hinh: c.cau_hinh, fps: c.fps, g: c.g });
  }
}

mkdirSync(CAND, { recursive: true });
const hangEncodeMoi = [];   // candidate CHƯA tồn tại + nguồn hợp lệ → encode mới
const resumeOk = [];
const loiVeSinh = new Map(); // candidate tồn tại NHƯNG lệch/hỏng/hồ sơ sai → FAIL, KHÔNG tự sửa
for (const v of BAN_GOC.values()) {
  const cu = logCu.get(v.name);
  const cp = join(CAND, v.name);
  const chuaCo = !existsSync(cp);
  if (!cu) {
    loiVeSinh.set(v.name, chuaCo ? 'hồ sơ tái xác minh không có mục này' : 'hồ sơ tái xác minh không hợp lệ (thiếu/lệch cấu hình)');
    continue;
  }
  if (cu.nguon_sha256 !== v.sha256) { loiVeSinh.set(v.name, 'nguồn hash lệch hồ sơ'); continue; }
  // khóa FPS theo probe nguồn + GOP theo round(2×FPS) + kiểu hữu hạn dương
  let fpsProbe = null;
  try { fpsProbe = fpsNguon(v.path); } catch (e) { loiVeSinh.set(v.name, `probe nguồn lỗi: ${String(e).slice(0, 100)}`); continue; }
  const gKyVong = Math.round(2 * fpsProbe);
  if (!Number.isFinite(fpsProbe) || fpsProbe <= 0) { loiVeSinh.set(v.name, `fps nguồn không hữu hạn/dương: ${fpsProbe}`); continue; }
  if (!Number.isFinite(cu.fps) || cu.fps <= 0) { loiVeSinh.set(v.name, `hồ sơ fps không hữu hạn/dương: ${cu.fps}`); continue; }
  if (Math.abs(cu.fps - fpsProbe) > 0.001) { loiVeSinh.set(v.name, `hồ sơ fps ${cu.fps} lệch probe nguồn ${fpsProbe}`); continue; }
  if (!Number.isInteger(cu.g) || cu.g <= 0) { loiVeSinh.set(v.name, `hồ sơ g phải số nguyên dương: ${cu.g}`); continue; }
  if (cu.g !== gKyVong) { loiVeSinh.set(v.name, `hồ sơ g=${cu.g} lệch round(2×fps)=${gKyVong}`); continue; }
  if (chuaCo) { hangEncodeMoi.push(v); continue; }
  const buf = readFileSync(cp);
  if (createHash('sha256').update(buf).digest('hex') !== cu.ket.sha256) { loiVeSinh.set(v.name, 'candidate hash lệch hồ sơ'); continue; }
  if (buf.length !== cu.ket.bytes) { loiVeSinh.set(v.name, 'candidate bytes lệch hồ sơ'); continue; }
  if (!giaiMaDuoc(cp)) { loiVeSinh.set(v.name, 'candidate không giải mã được dù hash khớp hồ sơ'); continue; }
  resumeOk.push(v.name);
}
console.log(`resume hợp lệ (skip): ${resumeOk.length}/14`);
console.log(`encode mới (candidate chưa tồn tại): ${hangEncodeMoi.length}`);
for (const v of hangEncodeMoi) console.log(`  - ${v.name}: chưa có candidate — encode mới`);
console.log(`lỗi vệ sinh (FAIL, không tự sửa): ${loiVeSinh.size}`);
for (const [n, lyDo] of loiVeSinh) console.log(`  - ${n}: ${lyDo}`);
if (loiVeSinh.size > 0) {
  console.error(`FAIL: ${loiVeSinh.size} tệp có candidate tồn tại nhưng không đạt hồ sơ/giải mã — dừng trước khi xóa hay encode (chế độ resume mặc định không tự sửa).`);
  process.exit(1);
}

const ffv = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
const ffmpegVersion = (ffv.stdout ?? '').split('\n')[0] ?? 'khong biet';
console.log('ffmpeg:', ffmpegVersion);
console.log('thuc thi: tuan tu (spawnSync tung tep; toi da 1 job dong thoi — trong gioi han 2 job cua cau lenh)');

// bản ghi MỚI trong bộ nhớ — kiểm cuối đối chiếu với cái này, không phải log cũ
const ghiMoi = new Map(logCu);
const thatBai = [];
for (const v of hangEncodeMoi) {
  const fps = fpsNguon(v.path);
  const g = Math.round(2 * fps);
  const cand = join(CAND, v.name);
  if (existsSync(cand)) unlinkSync(cand);
  const argv = [
    '-hide_banner', '-i', v.path,
    '-map', '0:v:0', '-map', '0:a:0',
    '-c:v', 'libx264', '-preset', CAU_HINH_CHUAN.preset, '-crf', String(CAU_HINH_CHUAN.crf),
    '-g', String(g), '-pix_fmt', CAU_HINH_CHUAN.pix_fmt,
    '-c:a', CAU_HINH_CHUAN.audio, '-movflags', CAU_HINH_CHUAN.movflags,
    cand,
  ];
  const t0 = Date.now();
  const r = spawnSync('ffmpeg', argv, { encoding: 'buffer', maxBuffer: 64 * 1024 * 1024 });
  const exit = r.status ?? -1;
  const stderrDayDu = Buffer.from(r.stderr ?? []).toString('utf8');
  let ket = null;
  let loi = null;
  if (exit !== 0) loi = `ffmpeg exit=${exit}`;
  else if (!existsSync(cand)) loi = 'candidate khong ton tai sau encode';
  else {
    const buf = readFileSync(cand);
    const sha = createHash('sha256').update(buf).digest('hex');
    ket = { bytes: buf.length, sha256: sha };
    if (buf.length >= v.bytes) loi = `candidate khong nho hon nguon (${buf.length} >= ${v.bytes})`;
    else if (!giaiMaDuoc(cand)) loi = 'candidate vua encode khong giai ma duoc';
  }
  const ghi = {
    name: v.name, nguon_sha256: v.sha256, nguon_bytes: v.bytes,
    cau_hinh: { ...CAU_HINH_CHUAN, g }, fps: Number(fps.toFixed(5)), g,
    exit, ms: Date.now() - t0, ffmpeg: ffmpegVersion, argv, stderr: stderrDayDu, ket, loi: loi ?? null,
  };
  appendFileSync(LOG, JSON.stringify(ghi) + '\n');
  if (loi) { thatBai.push({ name: v.name, loi }); ghiMoi.delete(v.name); }
  else { ghiMoi.set(v.name, ghi); console.log(`${v.name}: exit=0 g=${g} ${(v.bytes / 1048576).toFixed(2)} -> ${(ket.bytes / 1048576).toFixed(2)} MiB (${(ghi.ms / 1000).toFixed(1)}s)`); }
}

if (thatBai.length) {
  console.error(`THAT BAI ${thatBai.length} tep:`);
  for (const x of thatBai) console.error(`  ${x.name}: ${x.loi}`);
  process.exit(1);
}
// kiểm cuối: 14/14 đối chiếu candidate với BẢN GHI MỚI (bộ nhớ), gồm giải mã
let lech = 0;
for (const v of BAN_GOC.values()) {
  const ghi = ghiMoi.get(v.name);
  const cp = join(CAND, v.name);
  if (!ghi || !existsSync(cp)) { console.error(`THIEU BAN GHI HOP LE: ${v.name}`); lech++; continue; }
  const buf = readFileSync(cp);
  const sha = createHash('sha256').update(buf).digest('hex');
  if (sha !== ghi.ket.sha256 || buf.length !== ghi.ket.bytes) { console.error(`HASH/BYTES LECH BAN GHI MOI: ${v.name}`); lech++; continue; }
  if (!giaiMaDuoc(cp)) { console.error(`KHONG GIAI MA DUOC: ${v.name}`); lech++; }
}
if (lech) process.exit(1);
// Cập nhật hồ sơ tái xác minh cho các tệp VỪA encode lại (hash mới + decode đã kiểm trong kiểm cuối),
// để vòng resume kế tiếp không lệch hồ sơ. Tệp chỉ skip (không encode) giữ nguyên mục hồ sơ cũ.
if (hangEncodeMoi.length) {
  try {
    const hs = JSON.parse(readFileSync(HO_SO, 'utf8'));
    const theoTen = new Map(hs.candidate.map((c) => [c.file, c]));
    for (const v of BAN_GOC.values()) {
      const ghi = ghiMoi.get(v.name);
      if (!ghi) continue;
      const cu = theoTen.get(v.name) ?? { chung_dinh_kem: {} };
      theoTen.set(v.name, {
        ...cu,
        file: v.name,
        cau_hinh: { ...CAU_HINH_CHUAN, g: ghi.g },
        g: ghi.g,
        fps: ghi.fps,
        nguon_sha256: ghi.nguon_sha256,
        nguon_bytes: ghi.nguon_bytes,
        bytes: ghi.ket.bytes,
        sha256: ghi.ket.sha256,
        hash_da_kiem_truc_tiep: true,
        giai_ma_da_kiem_truc_tiep: true,
      });
    }
    hs.candidate = [...theoTen.values()];
    writeFileSync(HO_SO, JSON.stringify(hs, null, 1) + '\n');
    console.log(`da cap nhat ho so tai xac minh cho ${hangEncodeMoi.length} tep vua encode`);
  } catch (e) {
    console.error(`CANH BAO: khong cap nhat duoc ho so tai xac minh: ${String(e).slice(0, 150)}`);
    process.exit(1);
  }
}
console.log('XONG — TAT CA 14 CANDIDATE KHOP BAN GHI MOI VA GIAI MA DUOC');
