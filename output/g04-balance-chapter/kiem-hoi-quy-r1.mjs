// Hồi quy R1 check-regulating-cluster (vòng sửa G04-B TXN-20260912-23):
// từng ca biến đổi tạm tệp frontmatter → chạy checker thật → khôi phục theo
// hash (tiền lệ P3.3 "hoàn nguyên hash từng ca"). KHÔNG commit; tệp luôn được
// trả về nguyên trạng kể cả khi checker lỗi/ca lỗi.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const TARGET = 'src/content/coChe/en/balance-and-hairspring.md';
const OTHER = 'src/content/coChe/en/escapement.md';

const trangThai = {};

function backup(p) {
  trangThai[p] = readFileSync(p);
}
function restore(p) {
  writeFileSync(p, trangThai[p]);
}

const ca = [
  {
    ten: 'C0 nguyên trạng — checker phải PASS',
    sua: () => null,
    kyVong: 0,
  },
  {
    ten: 'C1 bài đích has_infographic:false — R1 phải BẮT',
    sua: (s) => s.replace('has_infographic: true', 'has_infographic: false'),
    kyVong: 1,
  },
  {
    ten: 'C2 bài đích interactive:false — R1 phải BẮT',
    sua: (s) => s.replace('interactive: true', 'interactive: false'),
    kyVong: 1,
  },
  {
    ten: 'C3 bài EN khác (escapement) interactive:true — R1 phải BẮT',
    file: OTHER,
    sua: (s) => s.replace('interactive: false', 'interactive: true'),
    kyVong: 1,
  },
  {
    ten: 'C4 bài EN khác (escapement) has_infographic:true — R1 phải BẮT',
    file: OTHER,
    sua: (s) => s.replace('has_infographic: false', 'has_infographic: true'),
    kyVong: 1,
  },
];

const ketqua = [];
let tatDat = true;
for (const c of ca) {
  const file = c.file ?? TARGET;
  backup(file);
  try {
    if (c.sua) {
      const truoc = readFileSync(file, 'utf8');
      const sau = c.sua(truoc);
      if (sau === null) {
        // ca nguyên trạng — không biến đổi tệp
      } else {
        if (sau === truoc) throw new Error('ca không biến đổi được tệp (mẫu replace không khớp)');
        writeFileSync(file, sau);
      }
    }
    let exitCode = null;
    let stdout = '';
    try {
      stdout = execFileSync('node', ['scripts/check-regulating-cluster.mjs'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
      exitCode = 0;
    } catch (e) {
      exitCode = e.status ?? null;
      stdout = (e.stdout ?? '') + (e.stderr ?? '');
    }
    const batR1 = stdout.includes('[R1]');
    const dat = exitCode === c.kyVong && (c.kyVong === 1 ? batR1 : true);
    ketqua.push({ ten: c.ten, exitCode, batR1, dat });
    if (!dat) tatDat = false;
    console.log((dat ? 'ĐẠT  ' : 'LỖI ') + c.ten + ` — exit=${exitCode}, bắt R1=${batR1}`);
  } finally {
    restore(file);
  }
}

// Xác minh khôi phục: chạy lại checker nguyên trạng phải PASS
let cuoiPass = false;
try {
  execFileSync('node', ['scripts/check-regulating-cluster.mjs'], { stdio: 'ignore' });
  cuoiPass = true;
} catch {}
console.log('Khôi phục xong — checker nguyên trạng PASS:', cuoiPass);
if (!cuoiPass) tatDat = false;
console.log(tatDat ? 'TẤT CẢ CA ĐẠT' : 'CÓ CA LỖI');
process.exit(tatDat ? 0 : 1);
