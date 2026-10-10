// =============================================================================
// exploded3d.ts — Bộ máy Three.js cho chế độ "Mô hình 3D" trên /giai-phau
// =============================================================================
// File này KHÔNG bao giờ được import tĩnh: trang chỉ dynamic import khi
// người dùng chủ động mở tab 3D — nhờ vậy chunk chứa Three.js không tải
// trên luồng đọc thông thường (2D mặc định).
//
// Import three là NAMED imports (không namespace) — chỉ kéo đúng các class
// được dùng; các kiểu dữ liệu dùng import type (không tạo dependency runtime).
// OrbitControls và RoomEnvironment là dynamic import riêng — chunk tách khỏi
// chunk engine; RoomEnvironment dựng môi trường phản xạ NGAY TRONG Three.js
// (không tải HDR/ảnh/texture từ mạng).
//
// V1 (DHC-ANH-HOAT-ANH-20260926): hình học giáo khoa thực hơn —
// - Bánh răng có RĂNG hình học thật (Shape + ExtrudeGeometry), không texture.
// - Thùng cót có vành răng; bánh lắc có vành + nan + trục + dây tóc xoắn
//   (TubeGeometry theo đường xoắn Archimedes) + chân kính đỏ trong suốt.
// - Vật liệu PBR phân biệt: thép bóng / thép chải / đồng thau / chân kính.
// - Ánh sáng: key + fill + đèn điểm cục bộ ấm; đổ bóng shadowMap (PCFShadowMap);
//   môi trường phản xạ PMREM từ RoomEnvironment.
// - Bánh lắc DAO ĐỘNG qua lại theo nhịp: một nhịp = nửa dao động (sin qua nửa
//   chu kỳ đổi dấu), không quay tròn giả.
// - prefers-reduced-motion: không tự chạy chuyển động, không tween camera/lớp
//   (nhảy thẳng đích); các điều khiển HTML thay thế vẫn hoạt động.
//
// VòngRender theo yêu cầu (render-on-demand):
// - rAF chỉ chạy khi có chuyển động (auto-rotate, tween tách lớp, bánh lắc
//   dao động, người dùng đang kéo) hoặc có frame mới cần vẽ.
// - Dừng hoàn toàn khi: panel 3D bị ẩn (pause), container rời viewport,
//   tab trình duyệt ẩn, hoặc không còn gì chuyển động.
// =============================================================================

import {
  AmbientLight,
  Box3,
  BoxGeometry,
  CatmullRomCurve3,
  CylinderGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PCFShadowMap,
  Path,
  PerspectiveCamera,
  PMREMGenerator,
  PointLight,
  Raycaster,
  Scene,
  Shape,
  SphereGeometry,
  Spherical,
  TorusGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import type { BufferGeometry, Material, MeshStandardMaterialParameters } from 'three';
import type { Lang } from '../i18n/ui';

export interface Exploded3DHandle {
  /** Dừng render loop (khi người dùng chuyển về sơ đồ 2D) */
  pause(): void;
  /** Cho phép render loop chạy lại (khi quay lại mô hình 3D) */
  resume(): void;
  /** Giải phóng toàn bộ tài nguyên WebGL (khi component bị hủy) */
  destroy(): void;
}

interface PartInfo {
  name: string;
  role: string;
  link: string;
  icon: string;
}

const CAM_DIR = new Vector3(60, 40, 80).normalize(); // hướng nhìn chuẩn lúc mở/đặt lại
const FRAME_PADDING = 1.25; // khoảng đệm quanh mô hình khi tự lấy khung

// ---- Dao động bánh lắc (V1) ----
// Một NHỊP = nửa dao động: pha 0..1 là nhịp lẻ (lắc một chiều), pha 1..2 là
// nhịp chẵn (chiều ngược lại) — đúng chu kỳ hai nhịp của bộ điều tiết.
const KY_NHIP_MS = 620; // thời lượng một nhịp (nửa dao động)
const BIEN_DO_RAD = 0.85; // biên độ góc bánh lắc (radian)

function gocBanhLac(now: number): number {
  const pha = (now % (KY_NHIP_MS * 2)) / KY_NHIP_MS; // đơn vị: nhịp (0..2)
  return Math.sin(Math.PI * pha) * BIEN_DO_RAD;
}

// Chuỗi hiển thị/trạng thái theo ngôn ngữ trang (G06-A chặng 2) — canvas aria,
// thẻ chi tiết mặc định, nhãn tách/ghép/mode, thông báo lỗi.
const ENGINE_UI: Record<Lang, {
  canvasAria: string;
  defaultTitle: string;
  defaultHint: string;
  defaultRole: string;
  toggle: { explode: string; assemble: string };
  mode: { assembled: string; exploded: string };
  errNoRoot: string;
  errNoWebGL: string;
}> = {
  vi: {
    canvasAria: 'Mô hình 3D khái niệm của một chiếc đồng hồ cơ — kéo để xoay, cuộn hoặc chụm để thu phóng, chạm một bộ phận để xem chi tiết. Các nút danh sách bộ phận và nút điều khiển bằng HTML bên cạnh là phương thức điều khiển thay thế.',
    defaultTitle: 'Chọn một bộ phận',
    defaultHint: 'Chạm hoặc bấm vào bộ phận trong mô hình, hoặc chọn từ danh sách',
    defaultRole: 'Kéo để xoay mô hình 360 độ. Bấm "Tách lớp" để phân rã thành từng lớp. Chạm hoặc bấm từng bộ phận (trong mô hình hoặc trong danh sách) để hiểu vai trò.',
    toggle: { explode: 'Tách lớp', assemble: 'Ghép lại' },
    mode: { assembled: 'Đang ghép', exploded: 'Đang tách' },
    errNoRoot: 'Không tìm thấy khung chứa mô hình 3D.',
    errNoWebGL: 'Trình duyệt hoặc thiết bị không hỗ trợ WebGL.',
  },
  en: {
    canvasAria: 'A conceptual 3D model of a mechanical watch — drag to rotate, scroll or pinch to zoom, tap a part for details. The parts list and control buttons in HTML beside it are alternative ways to control the model.',
    defaultTitle: 'Pick a part',
    defaultHint: 'Tap or click a part in the model, or pick one from the list',
    defaultRole: 'Drag to spin the model 360 degrees. Press "Explode" to pull the layers apart. Tap any part (in the model or in the list) to learn its role.',
    toggle: { explode: 'Explode', assemble: 'Assemble' },
    mode: { assembled: 'Assembled', exploded: 'Exploded' },
    errNoRoot: 'Could not find the 3D model frame.',
    errNoWebGL: 'Your browser or device does not support WebGL.',
  },
};

// =============================================================================
// Hình học V1: bánh răng có RĂNG thật (không texture, không hình giả lập)
// =============================================================================
// Mỗi răng là một tứ giác trên mặt phẳng: hai điểm chân (bán kính chân) và hai
// điểm đỉnh (bán kính đỉnh), lặp soRang vòng quanh; lỗ trục là hole tròn.
function taoHinhBanhRang(soRang: number, rDinh: number, rChan: number, rLoTruc: number): Shape {
  const hinh = new Shape();
  const buoc = (Math.PI * 2) / soRang;
  const nuaRongDinh = buoc * 0.14; // nửa bề rộng mặt đỉnh răng
  const nuaRongChan = buoc * 0.30; // nửa bề rộng chân răng
  for (let i = 0; i < soRang; i += 1) {
    const tam = i * buoc;
    const diem: Array<[number, number]> = [
      [rChan * Math.cos(tam - nuaRongChan), rChan * Math.sin(tam - nuaRongChan)],
      [rDinh * Math.cos(tam - nuaRongDinh), rDinh * Math.sin(tam - nuaRongDinh)],
      [rDinh * Math.cos(tam + nuaRongDinh), rDinh * Math.sin(tam + nuaRongDinh)],
      [rChan * Math.cos(tam + nuaRongChan), rChan * Math.sin(tam + nuaRongChan)],
    ];
    for (let d = 0; d < diem.length; d += 1) {
      if (i === 0 && d === 0) hinh.moveTo(diem[d][0], diem[d][1]);
      else hinh.lineTo(diem[d][0], diem[d][1]);
    }
  }
  hinh.closePath();
  if (rLoTruc > 0) {
    const lo = new Path();
    lo.absarc(0, 0, rLoTruc, 0, Math.PI * 2, true);
    hinh.holes.push(lo);
  }
  return hinh;
}

function taoGeoBanhRang(soRang: number, rDinh: number, rChan: number, day: number, rLoTruc: number): BufferGeometry {
  const geo = new ExtrudeGeometry(taoHinhBanhRang(soRang, rDinh, rChan, rLoTruc), {
    depth: day,
    bevelEnabled: true,
    bevelThickness: 0.07,
    bevelSize: 0.05,
    bevelSegments: 1,
    curveSegments: 12,
  });
  geo.rotateX(-Math.PI / 2); // trục bánh răng hướng theo trục dọc Y
  geo.translate(0, -day / 2, 0); // tâm dày ở gốc toạ độ
  return geo as unknown as BufferGeometry; // shim kiểu: ExtrudeGeometry khai báo cục bộ
}

// ---- Dây tóc xoắn (V1): đường xoắn Archimedes phẳng + TubeGeometry ----
// bán kính r = r0 + k·góc, góc chạy 0..3 vòng; điểm mẫu nạp CatmullRomCurve3.
function taoGeoDayToc(vong: number, r0: number, r1: number, banKinhDay: number): BufferGeometry {
  const tongGoc = vong * Math.PI * 2;
  const soMau = 96;
  const diem: Vector3[] = [];
  for (let i = 0; i <= soMau; i += 1) {
    const goc = (i / soMau) * tongGoc;
    const banKinh = r0 + (r1 - r0) * (i / soMau);
    diem.push(new Vector3(banKinh * Math.cos(goc), 0, banKinh * Math.sin(goc)));
  }
  const duong = new CatmullRomCurve3(diem, false, 'catmullrom', 0.5);
  return new TubeGeometry(duong, 160, banKinhDay, 6, false) as unknown as BufferGeometry; // shim kiểu
}

export async function mountExploded3D(root: HTMLElement, lang: Lang = 'vi'): Promise<Exploded3DHandle> {
  const t = ENGINE_UI[lang];
  const container = root.querySelector<HTMLElement>('#three-canvas-container');
  const loadingEl = root.querySelector<HTMLElement>('#three-loading');
  if (!container) throw new Error(t.errNoRoot);
  const host = container;

  // ---- Dữ liệu 12 bộ phận đọc từ các nút chọn nhanh trong DOM ----
  const partMap: Record<string, PartInfo> = {};
  root.querySelectorAll<HTMLElement>('.part-quick-3d').forEach((btn) => {
    const id = btn.dataset.partId || '';
    if (!id) return;
    partMap[id] = {
      name: btn.dataset.name || id,
      role: btn.dataset.role || '',
      link: btn.dataset.link || '',
      icon: btn.dataset.icon || '•',
    };
  });

  const prefersReduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Renderer (thử tạo — lỗi WebGL thì ném ra cho trang xử lý) ----
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    throw new Error(t.errNoWebGL);
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); // ≤2 — tránh nóng máy
  // Đổ bóng (V1 vòng sửa 1): PCFShadowMap — cơ chế three 0.185 hỗ trợ đầy đủ,
  // không phát sinh cảnh báo deprecation (chế độ Soft cũ đã bị three thay thế bằng bản này).
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  const w = container.clientWidth || 1;
  const h = container.clientHeight || 1;
  renderer.setSize(w, h);
  renderer.domElement.setAttribute('aria-label', t.canvasAria);
  renderer.domElement.tabIndex = 0;
  renderer.domElement.className = 'block h-full w-full';
  container.appendChild(renderer.domElement);

  // ---- Scene + camera + ánh sáng ----
  const scene = new Scene();
  const camera = new PerspectiveCamera(35, w / h, 0.1, 1000);
  camera.position.copy(CAM_DIR).multiplyScalar(120); // tạm — frameModel() sẽ chỉnh đúng sau khi dựng mô hình

  // ---- Ánh sáng (V1): ambient nhẹ + key đổ bóng + fill ấm + đèn điểm cục bộ ----
  // Môi trường phản xạ kim loại lấy từ RoomEnvironment (PMREM) — dựng ngay
  // trong Three.js, KHÔNG tải HDR/ảnh/texture từ mạng.
  scene.add(new AmbientLight(0xffffff, 0.35));
  const keyLight = new DirectionalLight(0xffffff, 2.0);
  keyLight.position.set(50, 80, 50);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.left = -70;
  keyLight.shadow.camera.right = 70;
  keyLight.shadow.camera.top = 70;
  keyLight.shadow.camera.bottom = -70;
  keyLight.shadow.camera.near = 10;
  keyLight.shadow.camera.far = 300;
  keyLight.shadow.bias = -0.0004;
  scene.add(keyLight);
  const fillLight = new DirectionalLight(0xb89254, 0.6);
  fillLight.position.set(-50, 30, -50);
  scene.add(fillLight);
  // Đèn điểm cục bộ ấm — nhấn cụm bánh răng/đồng thau (chiếu sáng cục bộ)
  const denCucBo = new PointLight(0xffd9a0, 900, 220, 2);
  denCucBo.position.set(28, 26, 18);
  scene.add(denCucBo as unknown as import('three').Object3D); // shim kiểu PointLight cục bộ

  // ---- Điều khiển xoay/zoom + môi trường phản xạ ----
  // OrbitControls và RoomEnvironment là module tải riêng (dynamic import) —
  // chunk tách khỏi chunk engine: cache độc lập, và không nằm trong luồng tải
  // ban đầu của website.
  const [controlsMod, envMod] = await Promise.all([
    import('three/addons/controls/OrbitControls.js'),
    import('three/addons/environments/RoomEnvironment.js'),
  ]);
  const controls = new controlsMod.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 40;
  controls.maxDistance = 280; // đủ dư địa để vừa khung mô hình đã tách lớp ở mọi tỷ lệ canvas
  controls.autoRotateSpeed = 0.8;

  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new envMod.RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  // ---- Vật liệu PBR (V1): bốn nhóm rõ ràng ----
  // Thép bóng: gương nhẹ cho trục/kim. Thép chải: nhám hơn cho đế/rotor/nan.
  // Đồng thau: sắc ấm phản chiếu có kiểm soát. Chân kính: đỏ trong suốt có
  // clearcoat — dùng MeshPhysicalMaterial. Mặt số: lì, nhường kịch tính cho kim.
  function matThepBong(color = 0xcfd6dd) {
    return new MeshStandardMaterial({ color, metalness: 1.0, roughness: 0.18 });
  }
  function matThepChai(color = 0x7d8791) {
    return new MeshStandardMaterial({ color, metalness: 0.92, roughness: 0.46 });
  }
  function matDongThau() {
    return new MeshStandardMaterial({ color: 0xb89254, metalness: 1.0, roughness: 0.28 });
  }
  function matChanKinh() {
    return new MeshPhysicalMaterial({
      color: 0xc21f3a, // đỏ rubi
      metalness: 0.0,
      roughness: 0.06,
      transparent: true,
      opacity: 0.62,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      ior: 1.76,
    });
  }
  function matRuby() {
    return new MeshStandardMaterial({ color: 0xa33b3b, metalness: 0.15, roughness: 0.25 });
  }
  function matDial(color = 0xf4f2ed) {
    return new MeshStandardMaterial({ color, metalness: 0.05, roughness: 0.9 });
  }
  function matCrystal() {
    return new MeshPhysicalMaterial({
      color: 0xdfe8f0,
      transparent: true,
      opacity: 0.16,
      metalness: 0.1,
      roughness: 0.05,
      clearcoat: 1.0,
      depthWrite: false,
    });
  }
  function mat(color: number, opacity?: number) {
    const opts: MeshStandardMaterialParameters = { color };
    if (opacity !== undefined) {
      opts.transparent = true;
      opts.opacity = opacity;
    }
    return new MeshStandardMaterial(opts);
  }

  // ---- Mô hình: 7 lớp xếp dọc, mỗi lớp có vị trí "ghép" và "tách" ----
  interface LayerDef {
    group: Group;
    meshes: Mesh[]; // các mesh có partId — dùng cho raycast + highlight
    assembledY: number;
    explodedY: number;
  }
  const layers: LayerDef[] = [];

  function partMesh(geo: BufferGeometry, material: Material, partId: string, nhanBong = true) {
    const m = new Mesh(geo, material);
    m.userData.partId = partId;
    m.castShadow = nhanBong; // bóng đổ mềm: mọi bộ phận đổ bóng
    return m;
  }
  function nhanBong(m: Mesh) {
    m.receiveShadow = true; // bề mặt đế nhận bóng
    return m;
  }

  // Lớp 0: kính sapphire (gần trong suốt + viền thép bóng mỏng)
  {
    const g = new Group();
    const crystal = partMesh(new CylinderGeometry(22, 22, 3, 64), matCrystal(), 'crystal', false);
    const rim = new Mesh(new TorusGeometry(22, 0.45, 8, 64), matThepBong(0x7d8791));
    rim.castShadow = true;
    rim.rotation.x = Math.PI / 2;
    g.add(crystal, rim);
    layers.push({ group: g, meshes: [crystal], assembledY: 8, explodedY: 40 });
  }
  // Lớp 1: kim giờ/phút/giây — thép bóng, kim giây ruby
  {
    const g = new Group();
    const hour = partMesh(new BoxGeometry(1.5, 0.3, 9), matThepBong(), 'hour-hand');
    hour.position.set(0, 5, 4.5);
    const minute = partMesh(new BoxGeometry(1, 0.3, 13), matThepBong(), 'minute-hand');
    minute.position.set(3, 5, 6.5);
    minute.rotation.y = -0.4;
    const second = partMesh(new BoxGeometry(0.6, 0.2, 15), matRuby(), 'second-hand');
    second.position.set(-2, 5.5, 7.5);
    second.rotation.y = 0.3;
    const pin = new Mesh(new CylinderGeometry(0.8, 0.8, 1, 16), matThepBong());
    pin.position.y = 5.5;
    g.add(hour, minute, second, pin);
    layers.push({ group: g, meshes: [hour, minute, second], assembledY: 5, explodedY: 20 });
  }
  // Lớp 2: mặt số + mặt số phụ — bề mặt lì, ít phản chiếu hơn kim/vỏ
  {
    const g = new Group();
    const dial = nhanBong(partMesh(new CylinderGeometry(20, 20, 1.5, 64), matDial(), 'dial', false));
    dial.position.y = 3;
    const subdial = partMesh(new CylinderGeometry(5, 5, 0.5, 32), matDial(0xe8e2d6), 'subdial', false);
    subdial.position.set(5, 3.8, 5);
    g.add(dial, subdial);
    layers.push({ group: g, meshes: [dial, subdial], assembledY: 3, explodedY: 0 });
  }
  // Lớp 3 (V1): đế máy + thùng cót vành răng (đồng thau) + BÁNH RĂNG CÓ RĂNG
  {
    const g = new Group();
    const plate = nhanBong(new Mesh(new CylinderGeometry(19, 19, 2, 64), matThepChai(0x6b6555)));
    // Thùng cót: vành răng lớn (đồng thau) + trống trong + chân kính trục
    const barrelVanh = partMesh(taoGeoBanhRang(36, 7.6, 6.9, 3.2, 6.1), matDongThau(), 'mainspring-barrel');
    barrelVanh.position.set(-8, 1, 0);
    const barrelTrong = new Mesh(new CylinderGeometry(6.1, 6.1, 3.4, 48), matDongThau());
    barrelTrong.position.set(-8, 1, 0);
    const barrelTruc = partMesh(new CylinderGeometry(0.55, 0.55, 4.4, 12), matThepBong(), 'mainspring-barrel');
    barrelTruc.position.set(-8, 1, 0);
    const barrelKinh = partMesh(new CylinderGeometry(0.85, 0.85, 0.6, 16), matChanKinh(), 'mainspring-barrel');
    barrelKinh.position.set(-8, 3.3, 0);
    // Bộ bánh răng: ba bánh răng có răng thật + chân kính trục đỏ
    const gear1 = partMesh(taoGeoBanhRang(24, 4.4, 3.7, 2.4, 0.7), matThepChai(0x4a545f), 'gear-train');
    gear1.position.set(2, 0.5, 0);
    const gear2 = partMesh(taoGeoBanhRang(18, 3.5, 2.9, 2.4, 0.6), matThepChai(0x5a6878), 'gear-train');
    gear2.position.set(8, 0.5, -3);
    const gear3 = partMesh(taoGeoBanhRang(15, 3.0, 2.5, 2.4, 0.55), matThepChai(0x5a6878), 'gear-train');
    gear3.position.set(8, 0.5, 4);
    const kinh1 = partMesh(new CylinderGeometry(0.7, 0.7, 0.5, 12), matChanKinh(), 'gear-train');
    kinh1.position.set(2, 2, 0);
    const kinh2 = partMesh(new CylinderGeometry(0.6, 0.6, 0.5, 12), matChanKinh(), 'gear-train');
    kinh2.position.set(8, 2, -3);
    const kinh3 = partMesh(new CylinderGeometry(0.55, 0.55, 0.5, 12), matChanKinh(), 'gear-train');
    kinh3.position.set(8, 2, 4);
    g.add(plate, barrelVanh, barrelTrong, barrelTruc, barrelKinh, gear1, gear2, gear3, kinh1, kinh2, kinh3);
    layers.push({ group: g, meshes: [barrelVanh, barrelTruc, barrelKinh, gear1, gear2, gear3, kinh1, kinh2, kinh3], assembledY: 0, explodedY: -20 });
  }
  // Lớp 4 (V1): bộ thoát bánh răng nhọn + BÁNH LẮC ĐẦY ĐỦ (vành + nan + trục +
  // dây tóc xoắn + chân kính đỏ) — cả cụm dao động quanh trục dọc
  let balanceGroup: Group;
  {
    const g = new Group();
    const escPlate = nhanBong(new Mesh(new CylinderGeometry(17, 17, 1.5, 48), matThepChai(0x4a545f)));
    escPlate.position.y = -3;
    const escWheel = partMesh(taoGeoBanhRang(15, 3.4, 2.7, 1.2, 0.5), matThepBong(0x9aa5af), 'escapement');
    escWheel.position.set(-4, -3, 2);
    const escKinh = partMesh(new CylinderGeometry(0.6, 0.6, 0.5, 12), matChanKinh(), 'escapement');
    escKinh.position.set(-4, -1.6, 2);

    // ---- Bánh lắc đầy đủ (V1) ----
    balanceGroup = new Group();
    balanceGroup.position.set(5, -3, -2);
    const vanh = partMesh(new TorusGeometry(5, 0.6, 12, 48), matRuby(), 'balance');
    vanh.rotation.x = Math.PI / 2;
    const nan1 = partMesh(new BoxGeometry(9.4, 0.42, 0.55), matThepChai(0x8b97a3), 'balance');
    const nan2 = partMesh(new BoxGeometry(9.4, 0.42, 0.55), matThepChai(0x8b97a3), 'balance');
    nan2.rotation.y = Math.PI / 2;
    const truc = partMesh(new CylinderGeometry(0.42, 0.42, 2.8, 12), matThepBong(), 'balance');
    const chanKinhLac = partMesh(new SphereGeometry(0.62, 16, 12) as unknown as BufferGeometry, matChanKinh(), 'balance');
    chanKinhLac.position.y = 1.7;
    const dayToc = partMesh(taoGeoDayToc(3, 1.1, 4.3, 0.09), matThepBong(0x51708c), 'balance', false);
    dayToc.position.y = -0.9;
    balanceGroup.add(vanh, nan1, nan2, truc, chanKinhLac, dayToc);

    g.add(escPlate, escWheel, escKinh, balanceGroup);
    layers.push({ group: g, meshes: [escWheel, escKinh, vanh, nan1, nan2, truc, chanKinhLac, dayToc], assembledY: -3, explodedY: -40 });
  }
  // Lớp 5: rotor — thép chải, trục đồng thau
  {
    const g = new Group();
    const rotor = partMesh(
      new CylinderGeometry(14, 14, 2.5, 32, 1, false, 0, Math.PI),
      matThepChai(0x7d8791),
      'rotor',
    );
    rotor.rotation.z = Math.PI / 2;
    rotor.rotation.y = Math.PI / 2;
    rotor.position.y = -6;
    const rotorPin = new Mesh(new CylinderGeometry(1.5, 1.5, 3, 16), matDongThau());
    rotorPin.position.y = -6;
    g.add(rotor, rotorPin);
    layers.push({ group: g, meshes: [rotor], assembledY: -6, explodedY: -60 });
  }
  // Lớp 6: thân vỏ + đáy vỏ — thép đậm
  {
    const g = new Group();
    const caseback = nhanBong(partMesh(new CylinderGeometry(21, 21, 3, 64), matThepChai(0x4a545f), 'caseback'));
    caseback.position.y = -9;
    const caseWall = new Mesh(
      new CylinderGeometry(21, 21, 18, 64, 1, true),
      mat(0x3a3a3a, 0.3),
    );
    g.add(caseback, caseWall);
    layers.push({ group: g, meshes: [caseback], assembledY: -9, explodedY: -80 });
  }

  layers.forEach((l) => {
    l.group.position.y = l.assembledY;
    scene.add(l.group);
  });

  // ==========================================================================
  // Vòng render theo yêu cầu
  // ==========================================================================
  let isActive = true; // pause/resume từ tab 2D/3D
  let inView = true; // container có nằm trong viewport không
  let rafId = 0;
  let needsRender = true;
  let interacting = false;
  // KHÔNG tự quay khi vừa mở — mô hình đứng yên cho tới khi người dùng chủ
  // động bấm "Chuyển động 3D". prefers-reduced-motion: hệ thống KHÔNG TỰ chạy
  // và KHÔNG tween (nhảy thẳng đích); người dùng vẫn có thể chủ động bấm nút
  // chuyển động/điều khiển HTML — quyết định của người dùng, không phải tự động.
  let motionOn = false;

  const canRun = () => isActive && inView && !document.hidden;

  // ---- Tween tách/ghép lớp ----
  interface TweenState {
    from: number;
    to: number;
    start: number;
    delay: number;
    dur: number;
  }
  const tweens: Array<TweenState | null> = layers.map(() => null);
  let isExploded = false;

  function stepTweens(now: number): boolean {
    let anyActive = false;
    layers.forEach((l, i) => {
      const tw = tweens[i];
      if (!tw) return;
      const t = (now - tw.start - tw.delay) / tw.dur;
      if (t < 0) {
        anyActive = true;
        return;
      }
      const k = Math.min(t, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      l.group.position.y = tw.from + (tw.to - tw.from) * eased;
      if (k < 1) anyActive = true;
      else tweens[i] = null;
    });
    return anyActive;
  }

  // ---- Camera tự lấy khung mô hình (fit-to-frame theo Box3) ----
  // Tính vùng bao của toàn bộ mô hình TẠI VỊ TRÍ ĐÍCH (đang ghép hoặc đã tách),
  // đặt controls.target vào tâm, và tính khoảng cách camera sao cho vùng bao
  // nằm trọn trong khung theo cả chiều dọc (fov dọc) và chiều ngang (fov ngang
  // suy từ aspect canvas). Không hard-code khoảng cách cho một khổ màn hình.
  interface CamTween {
    fromPos: Vector3;
    toPos: Vector3;
    fromTarget: Vector3;
    toTarget: Vector3;
    start: number;
    dur: number;
  }
  let camTween: CamTween | null = null;

  function stepCameraTween(now: number): boolean {
    if (!camTween) return false;
    const k = Math.min((now - camTween.start) / camTween.dur, 1);
    const eased = 1 - Math.pow(1 - k, 3);
    camera.position.lerpVectors(camTween.fromPos, camTween.toPos, eased);
    controls.target.lerpVectors(camTween.fromTarget, camTween.toTarget, eased);
    if (k >= 1) camTween = null;
    return true; // đang chuyển động — giữ render loop chạy
  }

  function modelBounds(targetYs: number[]): Box3 {
    const box = new Box3();
    const savedY = layers.map((l) => l.group.position.y);
    layers.forEach((l, i) => {
      l.group.position.y = targetYs[i];
      box.expandByObject(l.group);
    });
    layers.forEach((l, i) => {
      l.group.position.y = savedY[i]; // trả lại vị trí hiện tại (có thể đang tween)
    });
    return box;
  }

  function frameModel(instant = false, useDefaultDir = false) {
    const targetYs = layers.map((l) => (isExploded ? l.explodedY : l.assembledY));
    const box = modelBounds(targetYs);
    if (box.isEmpty()) return;
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());

    const cw = host.clientWidth || 1;
    const ch = host.clientHeight || 1;
    const fovV = MathUtils.degToRad(camera.fov);
    const fovH = 2 * Math.atan(Math.tan(fovV / 2) * (cw / ch));
    const distV = (size.y / 2) / Math.tan(fovV / 2);
    const spanH = Math.max(size.x, size.z) / 2;
    const distH = spanH / Math.tan(fovH / 2);
    const dist = MathUtils.clamp(
      Math.max(distV, distH) * FRAME_PADDING,
      controls.minDistance,
      controls.maxDistance,
    );

    // Giữ hướng nhìn hiện tại của người dùng (trừ lúc mở/đặt lại — dùng hướng chuẩn)
    const dir = useDefaultDir
      ? CAM_DIR.clone()
      : camera.position.clone().sub(controls.target).normalize();
    if (!Number.isFinite(dir.x) || dir.lengthSq() < 0.5) dir.copy(CAM_DIR);

    const toPos = center.clone().add(dir.multiplyScalar(dist));
    const toTarget = center.clone();

    if (instant || prefersReduced()) {
      camTween = null;
      camera.position.copy(toPos);
      controls.target.copy(toTarget);
      controls.update();
      wake();
    } else {
      camTween = {
        fromPos: camera.position.clone(),
        toPos,
        fromTarget: controls.target.clone(),
        toTarget,
        start: performance.now(),
        dur: 600,
      };
      wake();
    }
  }

  function applyMode() {
    layers.forEach((l, i) => {
      const targetY = isExploded ? l.explodedY : l.assembledY;
      if (prefersReduced()) {
        // Reduced motion: nhảy thẳng tới vị trí đích, không tween
        l.group.position.y = targetY;
        tweens[i] = null;
      } else {
        // Stagger 35ms/lớp + dur 400ms → tổng ~575ms, đúng trần 600ms
        tweens[i] = {
          from: l.group.position.y,
          to: targetY,
          start: performance.now(),
          delay: i * 35,
          dur: 400,
        };
      }
    });
    // Camera bám theo kích thước mới của mô hình (tách cao hơn — lùi xa ra)
    frameModel(false, true);
  }

  function tick(now: number) {
    rafId = 0;
    if (!canRun()) return;
    let busy = false;
    if (controls.autoRotate || interacting) {
      controls.update();
      busy = true;
    } else if (controls.update()) {
      busy = true; // damping chưa ổn định
    }
    if (stepTweens(now)) busy = true;
    if (stepCameraTween(now)) busy = true;
    if (motionOn) {
      // V1: bánh lắc DAO ĐỘNG qua lại theo nhịp — một nhịp = nửa dao động
      // (sin đổi dấu qua mỗi nhịp); KHÔNG quay tròn giả.
      balanceGroup.rotation.y = gocBanhLac(now);
      busy = true;
    }
    if (busy || needsRender) {
      renderer.render(scene, camera);
      needsRender = false;
    }
    // Không còn gì chuyển động và không có frame chờ — dừng hẳn loop
    if (busy || needsRender) rafId = requestAnimationFrame(tick);
  }

  function wake() {
    needsRender = true;
    if (rafId === 0 && canRun()) rafId = requestAnimationFrame(tick);
  }

  // ---- Các nguồn đánh thức loop ----
  controls.addEventListener('change', wake);
  controls.addEventListener('start', () => {
    interacting = true;
    wake();
  });
  controls.addEventListener('end', () => {
    interacting = false;
    wake(); // để damping chạy nốt vài frame rồi tự dừng
  });

  const io = new IntersectionObserver(
    (entries) => {
      inView = entries[0].isIntersecting;
      wake();
    },
    { threshold: 0.01 },
  );
  io.observe(container);

  const onVisibility = () => wake();
  document.addEventListener('visibilitychange', onVisibility);

  const ro = new ResizeObserver(() => {
    const nw = container.clientWidth;
    const nh = container.clientHeight;
    if (!nw || !nh) return;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
    // Tính lại góc nhìn ngay để mô hình vẫn nằm trọn khung sau khi đổi kích thước
    frameModel(true);
    wake();
  });
  ro.observe(container);

  // ==========================================================================
  // UI: nút bấm, chọn bộ phận, thẻ chi tiết
  // ==========================================================================
  const toggleBtn = root.querySelector<HTMLElement>('#toggle-explode-3d');
  const toggleLabel = root.querySelector<HTMLElement>('#toggle-label-3d');
  const modeLabel = root.querySelector<HTMLElement>('#mode-label-3d');
  const resetBtn = root.querySelector<HTMLElement>('#reset-view-3d');
  const motionBtn = root.querySelector<HTMLElement>('#motion-toggle-3d');
  const iconPause = root.querySelector<SVGElement>('#icon-pause-3d');
  const iconPlay = root.querySelector<SVGElement>('#icon-play-3d');

  const detailIcon = root.querySelector<HTMLElement>('#detail-icon-3d');
  const detailNameVi = root.querySelector<HTMLElement>('#detail-name-vi-3d');
  const detailNameEn = root.querySelector<HTMLElement>('#detail-name-en-3d');
  const detailRole = root.querySelector<HTMLElement>('#detail-role-3d');
  const detailLink = root.querySelector<HTMLAnchorElement>('#detail-link-3d');
  const quickBtns = Array.from(root.querySelectorAll<HTMLButtonElement>('.part-quick-3d'));

  // Xoay camera quanh trục thẳng đứng (độ) — dùng cho nút xoay trái/phải
  function rotateBy(deg: number) {
    const offset = camera.position.clone().sub(controls.target);
    const sph = new Spherical().setFromVector3(offset);
    sph.theta += MathUtils.degToRad(deg);
    offset.setFromSpherical(sph);
    camera.position.copy(controls.target).add(offset);
    controls.update();
    wake();
  }
  // Thu/phóng theo hệ số (0.85 = phóng to, 1.18 = thu nhỏ) — tôn trọng min/maxDistance
  function zoomBy(factor: number) {
    const offset = camera.position.clone().sub(controls.target);
    offset.setLength(MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance));
    camera.position.copy(controls.target).add(offset);
    controls.update();
    wake();
  }

  function setMotion(on: boolean) {
    motionOn = on;
    controls.autoRotate = on;
    // Toggle button chuẩn: nhãn hiển thị cố định "Chuyển động 3D",
    // aria-pressed phản ánh đúng trạng thái — true: đang chạy, false: đã tắt
    motionBtn?.setAttribute('aria-pressed', on ? 'true' : 'false');
    iconPause?.classList.toggle('hidden', !on);
    iconPlay?.classList.toggle('hidden', on);
    wake();
  }

  function selectPart(id: string | null) {
    // Bỏ highlight cũ
    layers.forEach((l) =>
      l.meshes.forEach((m) => {
        const ud = m.userData as { partId?: string; origEmissive?: number };
        if (ud.origEmissive !== undefined) {
          (m.material as MeshStandardMaterial).emissive.setHex(ud.origEmissive);
          delete ud.origEmissive;
        }
      }),
    );
    quickBtns.forEach((b) => b.classList.remove('border-brass', 'bg-brass/10'));
    quickBtns.forEach((b) => b.setAttribute('aria-pressed', 'false'));

    if (!id || !partMap[id]) {
      if (detailIcon) detailIcon.textContent = '👆';
      if (detailNameVi) detailNameVi.textContent = t.defaultTitle;
      if (detailNameEn) detailNameEn.textContent = t.defaultHint;
      if (detailRole) detailRole.textContent = t.defaultRole;
      detailLink?.classList.add('hidden');
      return;
    }

    const p = partMap[id];
    layers.forEach((l) =>
      l.meshes.forEach((m) => {
        if ((m.userData as { partId?: string }).partId === id) {
          const material = m.material as MeshStandardMaterial;
          const ud = m.userData as { origEmissive?: number };
          if (ud.origEmissive === undefined) ud.origEmissive = material.emissive.getHex();
          material.emissive.setHex(0xb8893c);
          material.emissiveIntensity = 0.5;
        }
      }),
    );
    const qb = quickBtns.find((b) => b.dataset.partId === id);
    qb?.classList.add('border-brass', 'bg-brass/10');
    qb?.setAttribute('aria-pressed', 'true');

    if (detailIcon) detailIcon.textContent = p.icon;
    if (detailNameVi) detailNameVi.textContent = p.name;
    if (detailRole) detailRole.textContent = p.role;
    if (detailLink) {
      if (p.link) {
        detailLink.href = p.link;
        detailLink.classList.remove('hidden');
      } else {
        detailLink.classList.add('hidden');
      }
    }
    wake();
  }

  toggleBtn?.addEventListener('click', () => {
    isExploded = !isExploded;
    if (toggleLabel) toggleLabel.textContent = isExploded ? t.toggle.assemble : t.toggle.explode;
    if (modeLabel) modeLabel.textContent = isExploded ? t.mode.exploded : t.mode.assembled;
    toggleBtn.setAttribute('aria-pressed', isExploded ? 'true' : 'false');
    applyMode();
  });

  motionBtn?.addEventListener('click', () => setMotion(!motionOn));

  resetBtn?.addEventListener('click', () => {
    isExploded = false;
    if (toggleLabel) toggleLabel.textContent = t.toggle.explode;
    if (modeLabel) modeLabel.textContent = t.mode.assembled;
    toggleBtn?.setAttribute('aria-pressed', 'false');
    // applyMode() đã bao gồm frameModel về hướng nhìn chuẩn + khung mô hình đã ghép
    applyMode();
    selectPart(null);
  });

  quickBtns.forEach((btn) => {
    btn.addEventListener('click', () => selectPart(btn.dataset.partId || null));
  });

  // Nút điều khiển thay thế thao tác kéo (keyboard-accessible)
  root.querySelector('#rot-left-3d')?.addEventListener('click', () => rotateBy(-15));
  root.querySelector('#rot-right-3d')?.addEventListener('click', () => rotateBy(15));
  root.querySelector('#zoom-in-3d')?.addEventListener('click', () => zoomBy(0.85));
  root.querySelector('#zoom-out-3d')?.addEventListener('click', () => zoomBy(1.18));

  // Click/chạm chọn bộ phận — chỉ tính là click khi không phải thao tác kéo xoay
  const raycaster = new Raycaster();
  const pointer = new Vector2();
  let downX = 0;
  let downY = 0;
  renderer.domElement.addEventListener('pointerdown', (e) => {
    downX = e.clientX;
    downY = e.clientY;
  });
  renderer.domElement.addEventListener('pointerup', (e) => {
    const dx = e.clientX - downX;
    const dy = e.clientY - downY;
    if (dx * dx + dy * dy > 25) return; // người dùng đang kéo xoay, không chọn
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const allMeshes: Mesh[] = [];
    layers.forEach((l) => l.meshes.forEach((m) => allMeshes.push(m)));
    const hits = raycaster.intersectObjects(allMeshes, false);
    const hitId = hits.length > 0 ? ((hits[0].object.userData as { partId?: string }).partId ?? null) : null;
    selectPart(hitId);
  });

  // Escape: bỏ chọn bộ phận — không thoát trang, không điều hướng
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') selectPart(null);
  };
  root.addEventListener('keydown', onKeyDown);

  // ---- Trạng thái ban đầu ----
  setMotion(motionOn);
  selectPart(null);
  // Lấy khung lần đầu theo mô hình đã ghép (thay khoảng cách hard-code):
  // mọi khổ canvas đều thấy trọn mô hình ngay khi mở tab 3D
  frameModel(true);

  // Vẽ frame đầu rồi mới bỏ lớp "Đang tải" — tránh khung trống nhấp nháy
  renderer.render(scene, camera);
  needsRender = false;
  loadingEl?.classList.add('hidden');
  if (motionOn) wake();

  // ---- Hủy / tạm dừng ----
  const onDestroy = () => {
    isActive = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pagehide', onDestroy);
    root.removeEventListener('keydown', onKeyDown);
    controls.dispose();
    scene.traverse((obj) => {
      const mesh = obj as Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const material = mesh.material as Material | Material[] | undefined;
      if (material) {
        (Array.isArray(material) ? material : [material]).forEach((m) => m.dispose());
      }
    });
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
  window.addEventListener('pagehide', onDestroy);

  return {
    pause() {
      isActive = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    },
    resume() {
      isActive = true;
      wake();
    },
    destroy: onDestroy,
  };
}
