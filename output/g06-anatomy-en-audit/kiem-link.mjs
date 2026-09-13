// G06-A chặng 1 — kiểm link đích của trang giải phẫu: route VI tồn tại trong dist
// + cặp EN tồn tại trong dist (theo bảng contentRoutes). Không gọi mạng — chỉ
// kiểm nội bộ trên dist (không đồng nghĩa kiểm HTTP nguồn ngoài).
import { existsSync } from 'node:fs';
import { readFileSync } from 'node:fs';

const crRaw = readFileSync('src/i18n/contentRoutes.ts', 'utf8');
const cap = new Map([...crRaw.matchAll(/\{\s*vi:\s*'([^']+)',\s*en:\s*'([^']+)'\s*\}/g)].map((m) => [m[1], m[2]]));

const links = [
  { tu: '2D/3D detail-link (kim giây, bộ thoát)', vi: '/co-che/bo-thoat' },
  { tu: '2D/3D detail-link (kim phút, kim giờ, bánh răng)', vi: '/co-che/chuyen-dong-co' },
  { tu: '2D/3D detail-link (thùng cót)', vi: '/co-che/tru-cot' },
  { tu: '2D/3D detail-link (bánh lắc + dây tóc)', vi: '/tu-dien/day-toc-banh-lac' },
  { tu: '2D/3D detail-link (mặt số phụ)', vi: '/tu-dien/perpetual-calendar' },
  { tu: '2D/3D detail-link (rotor)', vi: '/co-che/len-day-tu-dong' },
  { tu: 'CTA cuối trang (Bộ thoát)', vi: '/co-che/bo-thoat' },
  { tu: 'CTA cuối trang (Thùng cót)', vi: '/co-che/tru-cot' },
  { tu: 'CTA cuối trang (Tất cả cơ chế)', vi: '/co-che' },
];
const ketQua = [];
let loi = 0;
for (const l of links) {
  const viTonTai = existsSync('dist' + l.vi + '/index.html') || (l.vi === '/co-che' && existsSync('dist/co-che/index.html'));
  const en = cap.get(l.vi);
  const enTonTai = en ? existsSync('dist' + en + '/index.html') : false;
  const dat = viTonTai && enTonTai;
  if (!dat) loi++;
  ketQua.push({ ...l, viTonTai, en: en ?? 'KHÔNG CÓ CẶP', enTonTai, dat });
}
// link KHÔNG có (link: null) — đối chiếu bài kính đồng hồ tồn tại nhưng chưa được link
const kinhTonTai = existsSync('dist/co-che/kinh-dong-ho/index.html');
const kinhEn = cap.get('/co-che/kinh-dong-ho') ?? 'KHÔNG CÓ CẶP';
const bang = { soLink: links.length, loi, ketQua, kinhDongHo: { tonTaiVi: kinhTonTai, capEn: kinhEn, duocLinkTuGiaiPhau: false } };
console.log(JSON.stringify(bang, null, 2));
process.exit(loi === 0 ? 0 : 1);
