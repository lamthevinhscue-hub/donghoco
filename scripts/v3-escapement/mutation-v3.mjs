// =============================================================================
// mutation-v3.mjs — Mutation cho gói V3 (thử bộ thoát trượt pha)
// =============================================================================
// Chạy: node scripts/v3-escapement/mutation-v3.mjs   (từ gốc repo)
// Mỗi ca: áp đột biến lên sandbox (mkdtemp ngoài repo), checker V3 phải fail
// ĐÚNG rule, hoàn nguyên byte-đối-byte; chạy sạch cuối đếm riêng.
//   MUT-7 căn cứ VI quay lại ô EN                     → V3-6
// Ca:
//   MUT-1 sai ánh xạ pha (biên pha đứt)        → V3-3
//   MUT-2 mất nhãn truy cập (aria-valuetext)    → V3-2
//   MUT-3 tự phát (autoplay)                    → V3-2
//   MUT-4 mở rộng sang bài khác                 → V3-1
//   MUT-5 tự tải (preload auto)                 → V3-2
//   MUT-6 ghi đè mp4 thuyết minh                → V3-1
// =============================================================================

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, mkdtempSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const GOC = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const CHECKER = 'scripts/check-v3-escapement-slider.mjs';
const LOG = join(GOC, 'output/v3-escapement-slider/mutation-v3.log.txt');

const tep = (tuongDoi) => join(GOC, tuongDoi);
const dong = [];
const ghi = (s) => dong.push(s);
const hashOf = (buf) => createHash('sha256').update(buf).digest('hex');

// ---- Sandbox: sao chép cây tối thiểu checker V3 cần (chế độ nguồn) ----
const CAY = [
  'src/content/coChe/vi/bo-thoat.md',
  'src/content/coChe/en/escapement.md',
  'src/content/coChe/vi/day-toc-banh-lac.md',
  'src/components/EscapementSliderVideo.astro',
  'src/components/templates/MechanismArticle.astro',
  'src/content.config.ts',
  'src/data/v3-escapement-phas.json',
  'scripts/check-v3-escapement-slider.mjs',
  'scripts/v3-escapement/dung-canh.html',
  'public/videos/v3-escapement/bo-thoat-chu-ky-truot.webm',
  'public/videos/v3-escapement/poster.jpg',
  'public/videos/bo-thoat-nguyen-ly-vi.mp4',
  'public/videos/bo-thoat-nguyen-ly-en.mp4',
];
const sandbox = mkdtempSync(join(tmpdir(), 'v3-sandbox-'));
for (const f of CAY) {
  const dich = join(sandbox, f);
  mkdirSync(dirname(dich), { recursive: true });
  cpSync(tep(f), dich);
}
// checker kiểm existence mp4 cũ — bảo đảm có
if (!existsSync(join(sandbox, 'public/videos/bo-thoat-nguyen-ly-vi.mp4'))) {
  console.log('LỖI SANDBOX: thiếu mp4 mẫu'); process.exit(1);
}
const sandboxChecker = join(sandbox, CHECKER);

function chay() {
  try {
    const out = execFileSync('node', [sandboxChecker], { encoding: 'utf8', cwd: sandbox });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? null, out: `${e.stdout ?? ''}\n${e.stderr ?? ''}` };
  }
}

const ketQua = [];
function ca(ma, moTa, tepMut, thay, maLoi) {
  ghi(`\n=== ${ma}: ${moTa} ===`);
  const duong = join(sandbox, tepMut);
  const goc = readFileSync(duong);
  const hashGoc = hashOf(goc);
  let tam = goc.toString('utf8');
  let duChuoi = true;
  for (const [from, to] of thay) {
    if (!tam.includes(from)) {
      ghi(`  [LỖI CA] không tìm thấy chuỗi nguồn: ${from.slice(0, 70)}`);
      duChuoi = false;
      break;
    }
    tam = tam.split(from).join(to);
  }
  if (!duChuoi) {
    writeFileSync(duong, goc);
    ketQua.push({ ma, dat: false });
    ghi('  KẾT QUẢ: KHÔNG ĐẠT (ca lỗi — không áp được đột biến)');
    return;
  }
  writeFileSync(duong, tam);
  const kq = chay();
  const coMa = kq.out.includes(`[${maLoi}`);
  ghi(`  checker exit=${kq.code} (kỳ vọng khác 0); mã lỗi kỳ vọng ${maLoi}: ${coMa ? 'CÓ' : 'KHÔNG'}`);
  for (const l of kq.out.split('\n').filter((x) => x.includes('LỖI'))) ghi(`    ${l.trim()}`);
  writeFileSync(duong, goc);
  const phuc = hashOf(readFileSync(duong)) === hashGoc;
  ghi(`  hoàn nguyên byte-đối-byte: ${phuc ? 'OK' : 'LỖI'}`);
  const dat = kq.code !== 0 && coMa && phuc;
  ketQua.push({ ma, dat });
  ghi(`  KẾT QUẢ: ${dat ? 'ĐẠT' : 'KHÔNG ĐẠT'}`);
}

// ===== Sáu ca =====
ca('MUT-1', 'Sai ánh xạ pha — biên pha 1/2 đứt (1780 → 1800)', 'src/data/v3-escapement-phas.json',
  [['"startMs": 0,\n      "endMs": 1780,', '"startMs": 0,\n      "endMs": 1800,']], 'V3-3');

ca('MUT-2', 'Mất nhãn truy cập — aria-valuetext đổi thành data attr', 'src/components/EscapementSliderVideo.astro',
  [["thanh.setAttribute(\n        'aria-valuetext',", "thanh.setAttribute(\n        'data-valuetext',"]], 'V3-2');

ca('MUT-3', 'Tự phát — thêm autoplay vào video', 'src/components/EscapementSliderVideo.astro',
  [['preload="none"', 'preload="none" autoplay']], 'V3-2');

ca('MUT-4', 'Mở rộng sang bài khác — bật slider_video trên day-toc-banh-lac', 'src/content/coChe/vi/day-toc-banh-lac.md',
  [['has_infographic:', 'slider_video: true\nhas_infographic:']], 'V3-1');

ca('MUT-5', 'Tự tải — preload "none" đổi "auto"', 'src/components/EscapementSliderVideo.astro',
  [['preload="none"', 'preload="auto"']], 'V3-2');

ca('MUT-6', 'Ghi đè nguồn — principle_video bài VI trỏ sang thư mục V3', 'src/content/coChe/vi/bo-thoat.md',
  [['principle_video: "/videos/bo-thoat-nguyen-ly-vi.mp4"', 'principle_video: "/videos/v3-escapement/bo-thoat-chu-ky-truot.webm"']], 'V3-1');

ca('MUT-7', 'Căn cứ tiếng Việt trở lại ô EN — canCu.en của pha 1 bị thay bằng text VI', 'src/data/v3-escapement-phas.json',
  [['FHH — Pallet (entrance / exit stone); Escapement (holds the gear train); current SVG step 1', 'FHH — Pallet (đá vào / đá ra); Escapement (chặn chuỗi bánh răng); SVG bước 1 hiện có']], 'V3-7');

// ===== Chạy sạch cuối (không tính là mutation) =====
ghi('\n=== Chạy sạch cuối ===');
const sach = chay();
ghi(`  checker exit=${sach.code} (kỳ vọng 0)`);
const tatCaDat = ketQua.every((k) => k.dat);
const dongTong = `\nTỔNG KẾT MUTATION: ${ketQua.filter((k) => k.dat).length}/${ketQua.length} ca ĐẠT, kèm 1 lượt chạy sạch cuối: ${sach.code === 0 ? 'ĐẠT (checker exit 0)' : 'KHÔNG ĐẠT (checker exit ' + sach.code + ')'}`;
ghi(dongTong);
ghi(`MUT-1=${ketQua[0].dat ? 'ĐẠT' : 'KHÔNG'}, MUT-2=${ketQua[1].dat ? 'ĐẠT' : 'KHÔNG'}, MUT-3=${ketQua[2].dat ? 'ĐẠT' : 'KHÔNG'}, MUT-4=${ketQua[3].dat ? 'ĐẠT' : 'KHÔNG'}, MUT-5=${ketQua[4].dat ? 'ĐẠT' : 'KHÔNG'}, MUT-6=${ketQua[5].dat ? 'ĐẠT' : 'KHÔNG'}, MUT-7=${ketQua[6] && ketQua[6].dat ? 'ĐẠT' : 'KHÔNG'}`);

rmSync(sandbox, { recursive: true, force: true });
writeFileSync(LOG, dong.join('\n') + '\n');
console.log(dongTong);
console.log(`LOG: ${LOG}`);
if (!(tatCaDat && sach.code === 0)) process.exit(1);
