// G09-C chặng 1 — rút advisory từ npm audit --json thành hồ sơ có cấu trúc
import { readFileSync, writeFileSync } from 'node:fs';

const audit = JSON.parse(readFileSync('output/g09-dependency-audit/npm-audit-raw.json', 'utf8'));
const goi = JSON.parse(readFileSync('package.json', 'utf8'));
const trucTiep = new Set([...Object.keys(goi.dependencies || {}), ...Object.keys(goi.devDependencies || {})]);

const danhSach = [];
for (const [ten, v] of Object.entries(audit.vulnerabilities || {})) {
  danhSach.push({
    package: ten,
    mucDo: v.severity,
    phamVi: v.range,
    laPhuThuocTrucTiep: trucTiep.has(ten),
    duongPhuThuoc: v.via.filter((x) => typeof x === 'string'),
    via: v.via
      .filter((x) => typeof x === 'object')
      .map((x) => ({ maAdvisory: x.source, tieuDe: x.title, url: x.url, phamViAnhHuong: x.range, mucDo: x.severity })),
    tacDong: v.effects,
    fixCoSan: v.fixAvailable === true ? 'có (nâng theo audit fix)' : v.fixAvailable && typeof v.fixAvailable === 'object' ? 'có (kèm breaking: ' + JSON.stringify(v.fixAvailable) + ')' : 'không có fix trực tiếp',
  });
}
const baoCao = {
  ngay: '2026-09-19',
  nen: '60b303e',
  lenh: 'npm audit --json (chỉ đọc — không sửa lockfile; xác nhận bằng git diff sau chạy)',
  metadata: audit.metadata,
  soAdvisory: danhSach.length,
  advisories: danhSach.sort((a, b) => a.package.localeCompare(b.package)),
};
writeFileSync('output/g09-dependency-audit/advisory-chi-tiet.json', JSON.stringify(baoCao, null, 2) + '\n');
for (const d of danhSach) {
  console.log(`${d.mucDo.toUpperCase()} ${d.package} (trực tiếp=${d.laPhuThuocTrucTiep}) range=${d.phamVi}`);
  for (const v of d.via) console.log(`   → ${v.maAdvisory} | ${v.tieuDe} | ${v.url} | range=${v.phamViAnhHuong}`);
  console.log(`   fix: ${d.fixCoSan}`);
}
