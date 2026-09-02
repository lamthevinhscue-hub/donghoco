// =============================================================================
// exploded3d.ts — Bộ máy Three.js cho chế độ "Mô hình 3D" trên /giai-phau
// =============================================================================
// File này KHÔNG bao giờ được import tĩnh: trang chỉ dynamic import khi
// người dùng chủ động mở tab 3D — nhờ vậy chunk chứa Three.js không tải
// trên luồng đọc thông thường (2D mặc định).
//
// Import three là NAMED imports (không namespace) — chỉ kéo đúng các class
// được dùng; các kiểu dữ liệu dùng import type (không tạo dependency runtime).
// OrbitControls là dynamic import riêng — chunk tách khỏi chunk engine.
//
// Mô hình dựng hoàn toàn bằng primitive shapes (cylinder, torus, box):
// mô hình khái niệm minh họa cấu trúc, không mô phỏng một calibre cụ thể.
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
  CylinderGeometry,
  DirectionalLight,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Spherical,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import type { BufferGeometry, Material, MeshStandardMaterialParameters } from 'three';

export interface Exploded3DHandle {
  /** Dừng render loop (khi người dùng chuyển về sơ đồ 2D) */
  pause(): void;
  /** Cho phép render loop chạy lại (khi quay lại mô hình 3D) */
  resume(): void;
  /** Giải phóng toàn bộ tài nguyên WebGL (khi component bị hủy) */
  destroy(): void;
}

interface PartInfo {
  nameVi: string;
  nameEn: string;
  role: string;
  link: string;
  icon: string;
}

const CAM_DIR = new Vector3(60, 40, 80).normalize(); // hướng nhìn chuẩn lúc mở/đặt lại
const FRAME_PADDING = 1.25; // khoảng đệm quanh mô hình khi tự lấy khung

export async function mountExploded3D(root: HTMLElement): Promise<Exploded3DHandle> {
  const container = root.querySelector<HTMLElement>('#three-canvas-container');
  const loadingEl = root.querySelector<HTMLElement>('#three-loading');
  if (!container) throw new Error('Không tìm thấy khung chứa mô hình 3D.');

  // ---- Dữ liệu 12 bộ phận đọc từ các nút chọn nhanh trong DOM ----
  const partMap: Record<string, PartInfo> = {};
  root.querySelectorAll<HTMLElement>('.part-quick-3d').forEach((btn) => {
    const id = btn.dataset.partId || '';
    if (!id) return;
    partMap[id] = {
      nameVi: btn.dataset.nameVi || id,
      nameEn: btn.dataset.nameEn || '',
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
    throw new Error('Trình duyệt hoặc thiết bị không hỗ trợ WebGL.');
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); // ≤2 — tránh nóng máy

  const w = container.clientWidth || 1;
  const h = container.clientHeight || 1;
  renderer.setSize(w, h);
  renderer.domElement.setAttribute(
    'aria-label',
    'Mô hình 3D khái niệm của một chiếc đồng hồ cơ — kéo để xoay, cuộn hoặc chụm để thu phóng, chạm một bộ phận để xem chi tiết. Các nút danh sách bộ phận và nút điều khiển bằng HTML bên cạnh là phương thức điều khiển thay thế.',
  );
  renderer.domElement.tabIndex = 0;
  renderer.domElement.className = 'block h-full w-full';
  container.appendChild(renderer.domElement);

  // ---- Scene + camera + ánh sáng ----
  const scene = new Scene();
  const camera = new PerspectiveCamera(35, w / h, 0.1, 1000);
  camera.position.copy(CAM_DIR).multiplyScalar(120); // tạm — frameModel() sẽ chỉnh đúng sau khi dựng mô hình

  // ---- Ánh sáng: 1 chính + 1 bù ấm + ambient vừa đủ (không post-processing) ----
  scene.add(new AmbientLight(0xffffff, 0.55));
  const keyLight = new DirectionalLight(0xffffff, 2.0);
  keyLight.position.set(50, 80, 50);
  scene.add(keyLight);
  const fillLight = new DirectionalLight(0xb89254, 0.7);
  fillLight.position.set(-50, 30, -50);
  scene.add(fillLight);

  // ---- Điều khiển xoay/zoom ----
  // OrbitControls là module tải riêng (dynamic import) — chunk tách khỏi chunk
  // engine: cache độc lập, và không nằm trong luồng tải ban đầu của website.
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 40;
  controls.maxDistance = 280; // đủ dư địa để vừa khung mô hình đã tách lớp ở mọi tỷ lệ canvas
  controls.autoRotateSpeed = 0.8;

  // ---- Vật liệu (đối xứng với bản 2D: thép chải / đồng thau / rubi / sapphire / mặt số) ----
  // Thép: metalness cao vừa phải, roughness đủ để không thành gương.
  // Đồng thau: sắc ấm, phản chiếu có kiểm soát. Rubi: đỏ sâu, không neon.
  // Mặt số: gần như không phản chiếu — nhường kịch tính cho kim và vỏ.
  function matSteel(color = 0x7d8791) {
    return new MeshStandardMaterial({ color, metalness: 0.8, roughness: 0.42 });
  }
  function matBrass() {
    return new MeshStandardMaterial({ color: 0xb89254, metalness: 0.85, roughness: 0.32 });
  }
  function matRuby() {
    return new MeshStandardMaterial({ color: 0xa33b3b, metalness: 0.15, roughness: 0.25 });
  }
  function matDial(color = 0xf4f2ed) {
    return new MeshStandardMaterial({ color, metalness: 0.05, roughness: 0.9 });
  }
  function matCrystal() {
    return new MeshStandardMaterial({
      color: 0xdfe8f0,
      transparent: true,
      opacity: 0.18,
      metalness: 0.1,
      roughness: 0.05,
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

  function partMesh(geo: BufferGeometry, material: Material, partId: string) {
    const m = new Mesh(geo, material);
    m.userData.partId = partId;
    return m;
  }

  // Lớp 0: kính sapphire (gần trong suốt + viền thép xanh-xám mỏng)
  {
    const g = new Group();
    const crystal = partMesh(new CylinderGeometry(22, 22, 3, 64), matCrystal(), 'crystal');
    const rim = new Mesh(new TorusGeometry(22, 0.45, 8, 64), matSteel(0x7d8791));
    rim.rotation.x = Math.PI / 2;
    g.add(crystal, rim);
    layers.push({ group: g, meshes: [crystal], assembledY: 8, explodedY: 40 });
  }
  // Lớp 1: kim giờ/phút/giây — thép, kim giây ruby
  {
    const g = new Group();
    const hour = partMesh(new BoxGeometry(1.5, 0.3, 9), matSteel(0xcfd6dd), 'hour-hand');
    hour.position.set(0, 5, 4.5);
    const minute = partMesh(new BoxGeometry(1, 0.3, 13), matSteel(0xcfd6dd), 'minute-hand');
    minute.position.set(3, 5, 6.5);
    minute.rotation.y = -0.4;
    const second = partMesh(new BoxGeometry(0.6, 0.2, 15), matRuby(), 'second-hand');
    second.position.set(-2, 5.5, 7.5);
    second.rotation.y = 0.3;
    const pin = new Mesh(new CylinderGeometry(0.8, 0.8, 1, 16), matSteel(0xcfd6dd));
    pin.position.y = 5.5;
    g.add(hour, minute, second, pin);
    layers.push({ group: g, meshes: [hour, minute, second], assembledY: 5, explodedY: 20 });
  }
  // Lớp 2: mặt số + mặt số phụ — bề mặt lì, ít phản chiếu hơn kim/vỏ
  {
    const g = new Group();
    const dial = partMesh(new CylinderGeometry(20, 20, 1.5, 64), matDial(), 'dial');
    dial.position.y = 3;
    const subdial = partMesh(new CylinderGeometry(5, 5, 0.5, 32), matDial(0xe8e2d6), 'subdial');
    subdial.position.set(5, 3.8, 5);
    g.add(dial, subdial);
    layers.push({ group: g, meshes: [dial, subdial], assembledY: 3, explodedY: 0 });
  }
  // Lớp 3: đế máy + thùng cót (đồng thau) + bánh răng (thép)
  {
    const g = new Group();
    const plate = new Mesh(new CylinderGeometry(19, 19, 2, 64), matSteel(0x6b6555));
    const barrel = partMesh(new CylinderGeometry(7, 7, 4, 32), matBrass(), 'mainspring-barrel');
    barrel.position.set(-8, 1, 0);
    const gear1 = partMesh(new CylinderGeometry(4, 4, 3, 20), matSteel(0x4a545f), 'gear-train');
    gear1.position.set(2, 0.5, 0);
    const gear2 = partMesh(new CylinderGeometry(3, 3, 3, 16), matSteel(0x5a6878), 'gear-train');
    gear2.position.set(8, 0.5, -3);
    const gear3 = partMesh(new CylinderGeometry(2.5, 2.5, 3, 14), matSteel(0x5a6878), 'gear-train');
    gear3.position.set(8, 0.5, 4);
    g.add(plate, barrel, gear1, gear2, gear3);
    layers.push({ group: g, meshes: [barrel, gear1, gear2, gear3], assembledY: 0, explodedY: -20 });
  }
  // Lớp 4: bộ thoát (thép) + bánh lắc (rubi)
  let balance: Mesh;
  {
    const g = new Group();
    const escPlate = new Mesh(new CylinderGeometry(17, 17, 1.5, 48), matSteel(0x4a545f));
    escPlate.position.y = -3;
    const escWheel = partMesh(new CylinderGeometry(3, 3, 2, 15), matSteel(0x9aa5af), 'escapement');
    escWheel.position.set(-4, -3, 2);
    balance = partMesh(new TorusGeometry(5, 0.8, 12, 32), matRuby(), 'balance');
    balance.rotation.x = Math.PI / 2;
    balance.position.set(5, -3, -2);
    g.add(escPlate, escWheel, balance);
    layers.push({ group: g, meshes: [escWheel, balance], assembledY: -3, explodedY: -40 });
  }
  // Lớp 5: rotor — thép chải, trục đồng thau
  {
    const g = new Group();
    const rotor = partMesh(
      new CylinderGeometry(14, 14, 2.5, 32, 1, false, 0, Math.PI),
      matSteel(0x7d8791),
      'rotor',
    );
    rotor.rotation.z = Math.PI / 2;
    rotor.rotation.y = Math.PI / 2;
    rotor.position.y = -6;
    const rotorPin = new Mesh(new CylinderGeometry(1.5, 1.5, 3, 16), matBrass());
    rotorPin.position.y = -6;
    g.add(rotor, rotorPin);
    layers.push({ group: g, meshes: [rotor], assembledY: -6, explodedY: -60 });
  }
  // Lớp 6: thân vỏ + đáy vỏ — thép đậm
  {
    const g = new Group();
    const caseback = partMesh(new CylinderGeometry(21, 21, 3, 64), matSteel(0x4a545f), 'caseback');
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
  // động bấm "Chuyển động 3D" (reduced motion vẫn cho phép bấm thủ công).
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

    const cw = container.clientWidth || 1;
    const ch = container.clientHeight || 1;
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
      balance.rotation.z = Math.sin(now * 0.004) * 0.3;
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

  const DETAIL_DEFAULT_ROLE =
    'Kéo để xoay mô hình 360 độ. Bấm "Tách lớp" để phân rã thành từng lớp. Chạm hoặc bấm từng bộ phận (trong mô hình hoặc trong danh sách) để hiểu vai trò.';

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
      if (detailNameVi) detailNameVi.textContent = 'Chọn một bộ phận';
      if (detailNameEn) detailNameEn.textContent = 'Chạm hoặc bấm vào bộ phận trong mô hình, hoặc chọn từ danh sách';
      if (detailRole) detailRole.textContent = DETAIL_DEFAULT_ROLE;
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
    if (detailNameVi) detailNameVi.textContent = p.nameVi;
    if (detailNameEn) detailNameEn.textContent = p.nameEn;
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
    if (toggleLabel) toggleLabel.textContent = isExploded ? 'Ghép lại' : 'Tách lớp';
    if (modeLabel) modeLabel.textContent = isExploded ? 'Đang tách' : 'Đang ghép';
    toggleBtn.setAttribute('aria-pressed', isExploded ? 'true' : 'false');
    applyMode();
  });

  motionBtn?.addEventListener('click', () => setMotion(!motionOn));

  resetBtn?.addEventListener('click', () => {
    isExploded = false;
    if (toggleLabel) toggleLabel.textContent = 'Tách lớp';
    if (modeLabel) modeLabel.textContent = 'Đang ghép';
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
