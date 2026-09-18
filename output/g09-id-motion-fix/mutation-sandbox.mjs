// G09-B chặng 2 — mutation sandbox CÔ LẬP (TXN-20260919-14)
// Không tiêm vào repo chính: fixture mini nằm trong output/g09-id-motion-fix/sandbox/,
// checker chạy chế độ --quyen <dir>. Ba trạng thái: sạch → lỗi đúng rule → hoàn nguyên đạt.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const GOI = 'output/g09-id-motion-fix';
const SB = GOI + '/sandbox';
const hash = (f) => createHash('sha256').update(readFileSync(f)).digest('hex').slice(0, 16);
const chay = (thamSo) => {
  try {
    return { code: 0, out: execFileSync('node', ['scripts/check-g09-id-unique.mjs', ...thamSo], { encoding: 'utf8', shell: true }) };
  } catch (e) {
    return { code: e.status ?? null, out: String(e.stdout || '') + String(e.stderr || '') };
  }
};

const plate = (id) => `<figure class="watch-image"><div class="placeholder"><svg viewBox="0 0 200 200"><defs><pattern id="${id}" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="0.4"/></pattern></defs><rect width="200" height="200" fill="url(#${id})" opacity="0.05"/></svg></div></figure>`;

const trang = (pattern1, pattern2) =>
  '<!doctype html><html><head><meta charset="utf-8"></head><body>' +
  plate(pattern1) + plate(pattern2) + '</body></html>\n';

// chuẩn bị sandbox
rmSync(SB, { recursive: true, force: true });
mkdirSync(SB + '/good', { recursive: true });
mkdirSync(SB + '/m1', { recursive: true });
mkdirSync(SB + '/m2', { recursive: true });
writeFileSync(SB + '/good/index.html', trang('guilloche-001-aaaaaaaa', 'guilloche-002-bbbbbbbb'));
writeFileSync(SB + '/m1/index.html', trang('guilloche', 'guilloche')); // ép ID cứng giống nhau
writeFileSync(SB + '/m2/index.html',
  '<!doctype html><html><head><meta charset="utf-8"></head><body>' +
  plate('guilloche-001-aaaaaaaa') +
  '<figure class="watch-image"><div class="placeholder"><svg viewBox="0 0 200 200"><defs></defs><rect width="200" height="200" fill="url(#guilloche-002-bbbbbbbb)" opacity="0.05"/></svg></div></figure>' +
  '</body></html>\n'); // plate 2 mất pattern nhưng giữ tham chiếu

const ketQua = [];
let loi = 0;
const xet = (ma, ok, chiTiet) => { ketQua.push(`${ok ? 'ĐẠT' : 'KHONG_DAT'} ${ma}${chiTiet ? ' — ' + chiTiet : ''}`); if (!ok) loi++; };

// (1) SẠCH: bản tốt phải đạt
const kqGood = chay(['--quyen', SB + '/good']);
xet('Sạch (good): checker đạt', kqGood.code === 0, 'exit=' + kqGood.code);

// (2) M1 — ID cứng giống nhau → fail đúng lý do ID trùng + ID cũ
const kqM1 = chay(['--quyen', SB + '/m1']);
const batM1 = kqM1.code === 1 && kqM1.out.includes('ID pattern duy nhất trong tài liệu') && kqM1.out.includes('ID "guilloche" cũ');
xet('M1 ép ID cứng giống nhau → fail đúng rule trùng ID + ID cũ', batM1, 'exit=' + kqM1.code + ' bắt=' + batM1);

// (3) M2 — mất pattern giữ tham chiếu → fail đúng lý do thiếu đích
const kqM2 = chay(['--quyen', SB + '/m2']);
const batM2 = kqM2.code === 1 && kqM2.out.includes('mỗi plate đúng 1 pattern') && kqM2.out.includes('tham chiếu đúng pattern cùng SVG');
xet('M2 mất pattern giữ tham chiếu → fail đúng rule thiếu đích', batM2, 'exit=' + kqM2.code + ' bắt=' + batM2);

// (4) Hoàn nguyên: bản good viết lại nguyên văn → hash khớp + checker đạt lại
const truocGood = hash(SB + '/good/index.html');
writeFileSync(SB + '/good/index.html', trang('guilloche-001-aaaaaaaa', 'guilloche-002-bbbbbbbb'));
const hashKhop = truocGood === hash(SB + '/good/index.html');
const kqLai = chay(['--quyen', SB + '/good']);
xet('Hoàn nguyên: hash khớp + checker đạt lại', hashKhop && kqLai.code === 0, `hash=${hashKhop} exit=${kqLai.code}`);

console.log(ketQua.join('\n'));
console.log('');
console.log(loi === 0 ? 'KẾT LUẬN: ĐẠT — 3 trạng thái mutation đúng: sạch đạt, lỗi bị bắt đúng rule, hoàn nguyên hash khớp' : `KẾT LUẬN: KHÔNG ĐẠT (${loi} ca)`);
process.exit(loi === 0 ? 0 : 1);
