// =============================================================================
// check-v1-anatomy-3d.mjs — Checker V1: mô hình 3D giải phẫu nâng cấp
// (DHC-ANH-HOAT-ANH-20260926, gói V1)
// =============================================================================
// Chạy: node scripts/check-v1-anatomy-3d.mjs        → kiểm NGUỒN
//       node scripts/check-v1-anatomy-3d.mjs dist   → kiểm DIST (sau build)
// Nối vào `npm run check` (nguồn) và cuối `npm run build` (dist).
//
// Nguồn:
//   V1-1  Bánh răng có RĂNG hình học thật (Shape + ExtrudeGeometry); không còn
//         bánh răng đĩa trơn cũ; không dùng texture.
//   V1-2  Bánh lắc đầy đủ: vành (torus) + nan (spokes) + trục.
//   V1-3  Dây tóc xoắn thật: đường xoắn mẫu + TubeGeometry, gắn bánh lắc.
//   V1-4  Chân kính đỏ trong suốt: MeshPhysicalMaterial, transparent, màu đỏ.
//   V1-5  PBR phân biệt: thép bóng / thép chải / đồng thau / chân kính.
//   V1-6  Ánh sáng cục bộ + đổ bóng shadowMap chuẩn 0.185 (PCF/VSM, KHÔNG
//         PCFSoftShadowMap deprecated) + môi trường phản xạ PMREM/RoomEnvironment;
//         CẤM preserveDrawingBuffer và mọi tài sản ngoài mạng (HDR/texture/fetch).
//   V1-7  Bánh lắc DAO ĐỘNG theo nhịp: một nhịp = nửa dao động; không quay tròn giả.
//   V1-8  prefers-reduced-motion: không tự tween camera; logic reduced còn nguyên.
//   V1-9  Bảo vệ ngân sách tải: check-3d-loading-budget.mjs không bị nới/vô hiệu.
//
// Dist:
//   V1-10 Chunk exploded3d tồn tại đúng 1; route giải phẫu VI/EN trạng thái HTML
//         ban đầu không tham chiếu chunk 3D nào (kể cả chunk môi trường);
//         chunk động chứa dấu hiệu hình học V1 và không chứa dấu hiệu tải mạng.
// =============================================================================

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const ASTRO = join(DIST, '_astro');
const HO_SO = 'src/scripts/exploded3d.ts';
const TRANG = 'src/components/anatomy/AnatomyExperience.astro';
const NGAN_SACH = 'scripts/check-3d-loading-budget.mjs';

const errors = [];
const kiem = (ma, moTa, dat, chiTiet) => {
  console.log(`  ${dat ? 'ĐẠT' : 'LỖI'} [${ma}] ${moTa}${chiTiet ? ` — ${chiTiet}` : ''}`);
  if (!dat) errors.push(`[${ma}] ${moTa}${chiTiet ? ` — ${chiTiet}` : ''}`);
};

const cheDoDist = process.argv[2] === 'dist';

if (!cheDoDist) {
  const src = readFileSync(HO_SO, 'utf8');

  // V1-1: bánh răng có răng hình học thật
  const coRang = /function taoHinhBanhRang\(/.test(src)
    && /new ExtrudeGeometry\(/.test(src)
    && /rDinh \* Math\.cos\(tam - nuaRongDinh\)/.test(src)
    && /rDinh \* Math\.cos\(tam \+ nuaRongDinh\)/.test(src)
    && /soRang/.test(src);
  const conDiaTronCu = /CylinderGeometry\(4, 4, 3, 20\)/.test(src)
    || /CylinderGeometry\(3, 3, 3, 16\)/.test(src)
    || /CylinderGeometry\(2\.5, 2\.5, 3, 14\)/.test(src);
  kiem('V1-1', 'Bánh răng có răng hình học thật (Shape + ExtrudeGeometry + điểm đỉnh răng), không còn đĩa trơn cũ',
    coRang && !conDiaTronCu, coRang ? (conDiaTronCu ? 'còn đĩa trơn cũ' : 'đủ') : 'thiếu hình học răng');

  // V1-2: bánh lắc vành + nan + trục
  const coBanhLac = /balanceGroup/.test(src)
    && /const vanh = partMesh\(new TorusGeometry\(/.test(src)
    && /const nan1 = partMesh\(new BoxGeometry\(/.test(src)
    && /const nan2 = partMesh\(new BoxGeometry\(/.test(src)
    && /const truc = partMesh\(new CylinderGeometry\(/.test(src);
  kiem('V1-2', 'Bánh lắc đầy đủ: vành + nan (2 spokes) + trục trong cùng nhóm dao động', coBanhLac, coBanhLac ? 'đủ' : 'thiếu');

  // V1-3: dây tóc xoắn thật
  const coDayToc = /function taoGeoDayToc\(/.test(src)
    && /CatmullRomCurve3/.test(src)
    && /TubeGeometry/.test(src)
    && /const dayToc = partMesh\(taoGeoDayToc\(/.test(src)
    && /Math\.cos\(goc\)/.test(src);
  kiem('V1-3', 'Dây tóc xoắn thật: đường xoắn mẫu (cos/sin) + TubeGeometry, gắn bánh lắc', coDayToc, coDayToc ? 'đủ' : 'thiếu');

  // V1-4: chân kính đỏ trong suốt
  const coChanKinh = /function matChanKinh\(\)/.test(src)
    && /MeshPhysicalMaterial/.test(src)
    && /transparent: true/.test(src)
    && /0xc21f3a/.test(src);
  kiem('V1-4', 'Chân kính đỏ trong suốt (MeshPhysicalMaterial, transparent, màu đỏ rubi)', coChanKinh, coChanKinh ? 'đủ' : 'thiếu');

  // V1-5: PBR phân biệt
  const pbr = {
    thepBong: /function matThepBong\(/.test(src) && /roughness: 0\.18/.test(src),
    thepChai: /function matThepChai\(/.test(src) && /roughness: 0\.46/.test(src),
    dongThau: /function matDongThau\(/.test(src) && /roughness: 0\.28/.test(src),
    chanKinh: /function matChanKinh\(\)/.test(src) && /roughness: 0\.06/.test(src),
  };
  const pbrDat = Object.values(pbr).every(Boolean)
    && ['1.0', '0.92'].every((m) => src.includes(`metalness: ${m}`));
  kiem('V1-5', 'PBR phân biệt: thép bóng/thép chải/đồng thau/chân kính (metalness, roughness khác nhau)', pbrDat,
    pbrDat ? 'đủ' : `thiếu: ${Object.entries(pbr).filter(([, v]) => !v).map(([k]) => k).join(', ')}`);

  // V1-6 (vòng sửa 1): đổ bóng chuẩn 0.185 — CẤM PCFSoftShadowMap deprecated
  // và CẤM preserveDrawingBuffer; cấm tài sản ngoài mạng
  const coAnhSang = /renderer\.shadowMap\.enabled = true/.test(src)
    && /renderer\.shadowMap\.type = (PCFShadowMap|VSMShadowMap)/.test(src)
    && /castShadow/.test(src)
    && /receiveShadow/.test(src)
    && /new PointLight\(/.test(src)
    && /RoomEnvironment/.test(src)
    && /PMREMGenerator/.test(src)
    && /scene\.environment = /.test(src);
  const camTaiSan = /TextureLoader|RGBELoader|\.hdr|\.glb|\.gltf|fetch\(|new Image/.test(src);
  const conApiCu = /PCFSoftShadowMap/.test(src) || /preserveDrawingBuffer/.test(src);
  kiem('V1-6', 'Ánh sáng cục bộ + đổ bóng PCF/VSM chuẩn 0.185 + PMREM/RoomEnvironment; không còn PCFSoftShadowMap/preserveDrawingBuffer; không tải tài sản ngoài',
    coAnhSang && !camTaiSan && !conApiCu,
    coAnhSang ? (conApiCu ? 'còn PCFSoftShadowMap/preserveDrawingBuffer' : (camTaiSan ? 'có dấu hiệu tải tài sản ngoài' : 'đủ')) : 'thiếu thiết lập bóng/ánh sáng');

  // V1-7: dao động theo nhịp (một nhịp = nửa dao động)
  const coDaoDong = /const KY_NHIP_MS = \d+;/.test(src)
    && /function gocBanhLac\(now: number\)/.test(src)
    && /Math\.sin\(Math\.PI \* pha\)/.test(src)
    && /balanceGroup\.rotation\.y = gocBanhLac\(now\);/.test(src);
  kiem('V1-7', 'Bánh lắc dao động qua lại theo nhịp (một nhịp = nửa dao động), không quay tròn giả', coDaoDong, coDaoDong ? 'đủ' : 'thiếu');

  // V1-8: reduced motion
  const soLanReduced = (src.match(/prefersReduced\(\)/g) ?? []).length;
  const coReduced = /prefers-reduced-motion: reduce/.test(src)
    && /instant \|\| prefersReduced\(\)/.test(src)
    && /if \(prefersReduced\(\)\) \{/.test(src)
    && soLanReduced >= 2;
  kiem('V1-8', 'prefers-reduced-motion: không tự tween camera, không tween tách lớp (điều khiển HTML vẫn hoạt động)', coReduced, `prefersReduced() xuất hiện ${soLanReduced} lần (cần ≥2: frameModel + applyMode)`);

  // V1-9: bảo vệ ngân sách tải 3D (không bị nới/vô hiệu)
  const nganSach = readFileSync(NGAN_SACH, 'utf8');
  const nganSachNguyen = /const ROUTES = \[/.test(nganSach)
    && /THREE\\\./.test(nganSach)
    && /mountExploded3D/.test(nganSach)
    && /explodedEntry/.test(nganSach)
    && /giai-phau\/index\.html/.test(nganSach)
    && /en\/anatomy\/index\.html/.test(nganSach)
    && !/ROUTES\s*=\s*\[\s*\]/.test(nganSach);
  const trangDong = readFileSync(TRANG, 'utf8');
  const dongImport = /import\(\s*['"]\.\.\/\.\.\/scripts\/exploded3d['"]\s*\)/.test(trangDong);
  kiem('V1-9', 'Ngân sách tải 3D không bị nới/vô hiệu; trang giải phẫu vẫn dynamic import engine',
    nganSachNguyen && dongImport, nganSachNguyen ? (dongImport ? 'đủ' : 'mất dynamic import') : 'budget checker bị sửa');
} else {
  // ============================== DIST ==============================
  if (!existsSync(ASTRO)) {
    console.log('  LỖI [V1-10] không tìm thấy dist/_astro — cần build trước khi kiểm dist');
    process.exit(1);
  }
  const astroFiles = readdirSync(ASTRO).filter((f) => f.endsWith('.js'));
  const exploded = astroFiles.filter((f) => f.startsWith('exploded3d'));
  kiem('V1-10', 'Chunk exploded3d tồn tại đúng 1 trong dist/_astro', exploded.length === 1, exploded.join(', ') || 'không có');

  const chunk = exploded.length === 1 ? readFileSync(join(ASTRO, exploded[0]), 'utf8') : '';
  // Dấu hiệu hình học V1 sống sót sau minify: tên tham số option của
  // ExtrudeGeometry và hằng state bóng của three giữ nguyên chuỗi.
  const dauHieuV1 = chunk.includes('bevelSegments') || chunk.includes('PCFShadowMap');
  kiem('V1-10', 'Chunk động chứa dấu hiệu hình học/bóng V1 (bevelSegments hoặc PCFShadowMap)', dauHieuV1, dauHieuV1 ? 'đủ' : 'không thấy dấu hiệu');
  // Lưu ý: chuỗi cảnh báo deprecated nằm sẵn trong bundle three (nhánh code
  // three giữ nguyên) nên KHÔNG dùng chuỗi chunk để phán — việc không dùng API
  // deprecated được kiểm ở NGUỒN (V1-6) và bằng console trình duyệt (biên bản).

  const coTaiNgoai = /TextureLoader|RGBELoader|\.hdr|\.glb"|\.gltf"|fetch\(|new Image/.test(chunk);
  kiem('V1-10', 'Chunk động không chứa dấu hiệu tải tài sản ngoài mạng (loader/HDR/GLB/fetch)', !coTaiNgoai, coTaiNgoai ? 'có dấu hiệu' : 'sạch');

  // Route giải phẫu VI/EN: HTML ban đầu không tham chiếu chunk 3D
  for (const [label, route] of [['Giải phẫu VI', 'giai-phau/index.html'], ['Giải phẫu EN', 'en/anatomy/index.html']]) {
    const p = join(DIST, route);
    if (!existsSync(p)) {
      kiem('V1-10', `${label}: tồn tại route để kiểm`, false, route);
      continue;
    }
    const html = readFileSync(p, 'utf8');
    const hit = astroFiles.filter((f) => (f.startsWith('exploded3d') || f.startsWith('OrbitControls') || f.startsWith('RoomEnvironment')) && html.includes(f));
    kiem('V1-10', `${label} (${route}): HTML ban đầu không tham chiếu chunk 3D/môi trường`, hit.length === 0, hit.join(', ') || 'sạch');
  }
}

console.log(`  KẾT LUẬN V1: ${errors.length === 0 ? (cheDoDist ? 'ĐẠT — dist đúng chuẩn V1' : 'ĐẠT — nguồn đúng chuẩn V1') : 'KHÔNG ĐẠT:'}`);
for (const e of errors) console.log(`    LỖI  ${e}`);
process.exit(errors.length === 0 ? 0 : 1);
