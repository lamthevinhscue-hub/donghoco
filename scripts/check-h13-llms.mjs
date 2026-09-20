#!/usr/bin/env node
// =============================================================================
// check-h13-llms.mjs — Kiểm gói H13: tệp public/llms.txt
// =============================================================================
// H13-1  Nguồn: public/llms.txt tồn tại; UTF-8 không BOM; có newline cuối;
//        cấu trúc llms.txt (tiêu đề '#', mô tả '>', có mục '##')
// H13-2  Dist: dist/llms.txt tồn tại và GIỐNG HỆT bản nguồn (copy qua build)
// H13-3  URL: mỗi liên kết HTTPS tuyệt đối trên canonical domain, không query/
//        fragment, không trùng, và TỒN TẠI trong dist (route index hoặc tệp)
// H13-4  Cấm dữ liệu nội bộ: docs/, output/, đường dẫn máy, khóa/token,
//        localhost, đánh dấu draft
// H13-5  Không diễn giải chính sách bot: tệp không chứa user-agent/disallow
// Chạy: node scripts/check-h13-llms.mjs <thư-mục-dist>  (cần dist)
// Nối trong npm run build, sau check-h10. Exit 1 nếu có lỗi.
// =============================================================================

import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = process.cwd();
const distArg = process.argv.slice(2).find((a) => !a.startsWith('--'));
const DIST = distArg ? resolve(ROOT, distArg) : null;
if (!DIST) {
  console.error('H13 checker cần thư mục dist: node scripts/check-h13-llms.mjs dist');
  process.exit(1);
}

const errors = [];
const ketqua = { thoiGian: new Date().toISOString(), ca: [], tongKet: null };
const kiem = (id, ten, dat, chiTiet = '') => {
  ketqua.ca.push({ id, ten, dat: dat === true, chiTiet });
  console.log(`  ${dat === true ? 'ĐẠT' : 'LỖI '} [${id}] ${ten}${dat === true ? '' : ` — ${chiTiet}`}`);
  if (dat !== true) errors.push(`[${id}] ${ten} — ${chiTiet}`);
};

const NGUON = join(ROOT, 'public', 'llms.txt');
const DIST_FILE = join(DIST, 'llms.txt');
const DOMAIN = 'https://www.kienthucdonghoco.vn';

// H13-1: nguồn tồn tại + UTF-8 không BOM + EOF newline + cấu trúc
const coNguon = existsSync(NGUON);
kiem('H13-1a', 'public/llms.txt tồn tại', coNguon, NGUON);
let noiDung = '';
if (coNguon) {
  const buf = readFileSync(NGUON);
  const bom = buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
  noiDung = buf.toString('utf8');
  kiem('H13-1b', 'UTF-8 không BOM + newline cuối tệp', !bom && /\n$/.test(noiDung), `BOM=${bom}`);
  kiem('H13-1c', 'Cấu trúc llms.txt: tiêu đề "#", mô tả ">", có mục "##"',
    /^# /m.test(noiDung) && /^> /m.test(noiDung) && /^## /m.test(noiDung),
    `title=${/^# /m.test(noiDung)}, desc=${/^> /m.test(noiDung)}, sections=${/^## /m.test(noiDung)}`);
}

// H13-2: dist khớp nguồn
let distOk = false;
let noiDungDist = '';
if (DIST && existsSync(DIST_FILE)) {
  noiDungDist = readFileSync(DIST_FILE, 'utf8');
  distOk = noiDungDist === noiDung;
}
kiem('H13-2', 'dist/llms.txt tồn tại và giống hệt bản nguồn', distOk, `dist=${existsSync(DIST_FILE)}`);

// H13-3: từng URL
const urls = [...noiDung.matchAll(/\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
kiem('H13-3a', `Tệp có liên kết để kiểm (${urls.length} URL)`, urls.length >= 10, `thực tế ${urls.length}`);
const saiDomain = urls.filter((u) => !u.startsWith(DOMAIN + '/') && u !== DOMAIN);
const coQueryFragment = urls.filter((u) => /[?#]/.test(u));
const trung = urls.filter((u, i) => urls.indexOf(u) !== i);
kiem('H13-3b', 'Mọi URL HTTPS tuyệt đối trên canonical domain, không query/fragment, không trùng',
  saiDomain.length === 0 && coQueryFragment.length === 0 && trung.length === 0 && urls.length > 0,
  `sai domain=${saiDomain.join(',') || 'không'}; query/fragment=${coQueryFragment.join(',') || 'không'}; trùng=${trung.join(',') || 'không'}`);

const urlHong = [];
if (DIST) {
  for (const u of urls) {
    const duong = u.slice(DOMAIN.length).split(/[?#]/)[0].replace(/\/$/, '');
    const thuMuc = join(DIST, duong, 'index.html');
    const tep = join(DIST, duong);
    const ok = duong === '' ? existsSync(join(DIST, 'index.html')) : existsSync(thuMuc) || (existsSync(tep) && statSync(tep).isFile());
    if (!ok) urlHong.push(u);
  }
  kiem('H13-3c', `Mọi URL tồn tại trong dist (${urls.length} URL)`, urlHong.length === 0, urlHong.join(', ') || 'đủ');
}

// H13-4: dữ liệu nội bộ
const CAM = ['docs/', 'output/', 'D:\\', '/home/', 'localhost', '127.0.0.1', 'OPENAI', 'api_key', 'apikey', 'password', 'draft: true', 'BEGIN '];
const coCam = CAM.filter((s) => noiDung.includes(s));
kiem('H13-4', 'Không chứa đường dẫn/dữ liệu nội bộ (docs, output, khóa, localhost…)', coCam.length === 0, coCam.join(', ') || 'sạch');

// H13-5: không diễn giải chính sách bot
const chinhSachBot = /user-agent|disallow\s*:|crawl-delay/i.test(noiDung);
kiem('H13-5', 'Không chứa chỉ thị chính sách bot (tách bạch với robots.txt)', !chinhSachBot, chinhSachBot ? 'có chỉ thị bot trong llms.txt' : 'sạch');

// ===== Kết luận =====
ketqua.tongKet = { soUrl: urls.length, tongCa: ketqua.ca.length, dat: errors.length === 0, loi: errors.length };
console.log(`  KẾT LUẬN H13: ${errors.length === 0 ? `ĐẠT — ${ketqua.ca.length}/${ketqua.ca.length} ca (${urls.length} URL)` : 'KHÔNG ĐẠT:'}`);
for (const e of errors) console.log(`    LỖI  ${e}`);
process.exit(errors.length === 0 ? 0 : 1);
