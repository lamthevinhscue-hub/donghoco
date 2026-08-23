// =============================================================================
// exploded3d.ts — Bộ máy Three.js cho chế độ "Mô hình 3D" trên /giai-phau
// =============================================================================
// File này KHÔNG bao giờ được import tĩnh: trang chỉ dynamic import khi
// người dùng chủ động mở tab 3D — nhờ vậy chunk chứa Three.js không tải
// trên luồng đọc thông thường (2D mặc định).
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

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

const CAM_DIR = new THREE.Vector3(60, 40, 80).normalize(); // hướng nhìn chuẩn lúc mở/đặt lại
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
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    throw new Error('Trình duyệt hoặc thiết bị không hỗ trợ WebGL.');
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const w = container.clientWidth || 1;
  const h = container.clientHeight || 1;
  renderer.setSize(w, h);
  renderer.domElement.setAttribute(
    'aria-label',
    'Mô hình 3D khái niệm của một chiếc đồng hồ cơ — kéo để xoay, cuộn hoặc chụm để thu phóng, chạm một bộ phận để xem chi tiết. Danh sách bộ phận bằng bàn phím nằm bên dưới.',
  );
  renderer.domElement.tabIndex = 0;
  renderer.domElement.className = 'block h-full w-full';
  container.appendChild(renderer.domElement);

  // ---- Scene + camera + ánh sáng ----
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 1000);
  camera.position.copy(CAM_DIR).multiplyScalar(120); // tạm — frameModel() sẽ chỉnh đúng sau khi dựng mô hình

  scene.add(new THREE.AmbientLight(0xffffff, 1.1));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(50, 80, 50);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xb8893c, 0.9);
  fillLight.position.set(-50, 30, -50);
  scene.add(fillLight);

  // ---- Điều khiển xoay/zoom ----
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 40;
  controls.maxDistance = 280; // đủ dư địa để vừa khung mô hình đã tách lớp ở mọi tỷ lệ canvas
  controls.autoRotateSpeed = 0.8;

  // ---- Vật liệu ----
  function mat(color: number, opacity?: number) {
    const opts: THREE.MeshStandardMaterialParameters = { color };
    if (opacity !== undefined) {
      opts.transparent = true;
      opts.opacity = opacity;
    }
    return new THREE.MeshStandardMaterial(opts);
  }

  // ---- Mô hình: 7 lớp xếp dọc, mỗi lớp có vị trí "ghép" và "tách" ----
  interface LayerDef {
    group: THREE.Group;
    meshes: THREE.Mesh[]; // các mesh có partId — dùng cho raycast + highlight
    assembledY: number;
    explodedY: number;
  }
  const layers: LayerDef[] = [];

  function partMesh(geo: THREE.BufferGeometry, material: THREE.Material, partId: string) {
    const m = new THREE.Mesh(geo, material);
    m.userData.partId = partId;
    return m;
  }

  // Lớp 0: kính
  {
    const g = new THREE.Group();
    const crystal = partMesh(new THREE.CylinderGeometry(22, 22, 3, 64), mat(0xa8c5e2, 0.25), 'crystal');
    g.add(crystal);
    layers.push({ group: g, meshes: [crystal], assembledY: 8, explodedY: 40 });
  }
  // Lớp 1: kim giờ/phút/giây
  {
    const g = new THREE.Group();
    const hour = partMesh(new THREE.BoxGeometry(1.5, 0.3, 9), mat(0x1f2d3d), 'hour-hand');
    hour.position.set(0, 5, 4.5);
    const minute = partMesh(new THREE.BoxGeometry(1, 0.3, 13), mat(0x1f2d3d), 'minute-hand');
    minute.position.set(3, 5, 6.5);
    minute.rotation.y = -0.4;
    const second = partMesh(new THREE.BoxGeometry(0.6, 0.2, 15), mat(0x9b2c2c), 'second-hand');
    second.position.set(-2, 5.5, 7.5);
    second.rotation.y = 0.3;
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 1, 16), mat(0x1f2d3d));
    pin.position.y = 5.5;
    g.add(hour, minute, second, pin);
    layers.push({ group: g, meshes: [hour, minute, second], assembledY: 5, explodedY: 20 });
  }
  // Lớp 2: mặt số + mặt số phụ
  {
    const g = new THREE.Group();
    const dial = partMesh(new THREE.CylinderGeometry(20, 20, 1.5, 64), mat(0xfaf7f2), 'dial');
    dial.position.y = 3;
    const subdial = partMesh(new THREE.CylinderGeometry(5, 5, 0.5, 32), mat(0xe8e2d6), 'subdial');
    subdial.position.set(5, 3.8, 5);
    g.add(dial, subdial);
    layers.push({ group: g, meshes: [dial, subdial], assembledY: 3, explodedY: 0 });
  }
  // Lớp 3: đế máy + thùng cót + bánh răng
  {
    const g = new THREE.Group();
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(19, 19, 2, 64), mat(0x6b6555));
    const barrel = partMesh(new THREE.CylinderGeometry(7, 7, 4, 32), mat(0xb8893c), 'mainspring-barrel');
    barrel.position.set(-8, 1, 0);
    const gear1 = partMesh(new THREE.CylinderGeometry(4, 4, 3, 20), mat(0x4a5568), 'gear-train');
    gear1.position.set(2, 0.5, 0);
    const gear2 = partMesh(new THREE.CylinderGeometry(3, 3, 3, 16), mat(0x5a6878), 'gear-train');
    gear2.position.set(8, 0.5, -3);
    const gear3 = partMesh(new THREE.CylinderGeometry(2.5, 2.5, 3, 14), mat(0x5a6878), 'gear-train');
    gear3.position.set(8, 0.5, 4);
    g.add(plate, barrel, gear1, gear2, gear3);
    layers.push({ group: g, meshes: [barrel, gear1, gear2, gear3], assembledY: 0, explodedY: -20 });
  }
  // Lớp 4: bộ thoát + bánh lắc
  let balance: THREE.Mesh;
  {
    const g = new THREE.Group();
    const escPlate = new THREE.Mesh(new THREE.CylinderGeometry(17, 17, 1.5, 48), mat(0x4a4a4a));
    escPlate.position.y = -3;
    const escWheel = partMesh(new THREE.CylinderGeometry(3, 3, 2, 15), mat(0x2e86ab), 'escapement');
    escWheel.position.set(-4, -3, 2);
    balance = partMesh(new THREE.TorusGeometry(5, 0.8, 12, 32), mat(0x9b2c2c), 'balance');
    balance.rotation.x = Math.PI / 2;
    balance.position.set(5, -3, -2);
    g.add(escPlate, escWheel, balance);
    layers.push({ group: g, meshes: [escWheel, balance], assembledY: -3, explodedY: -40 });
  }
  // Lớp 5: rotor
  {
    const g = new THREE.Group();
    const rotor = partMesh(
      new THREE.CylinderGeometry(14, 14, 2.5, 32, 1, false, 0, Math.PI),
      mat(0x5a6878),
      'rotor',
    );
    rotor.rotation.z = Math.PI / 2;
    rotor.rotation.y = Math.PI / 2;
    rotor.position.y = -6;
    const rotorPin = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 3, 16), mat(0xb8893c));
    rotorPin.position.y = -6;
    g.add(rotor, rotorPin);
    layers.push({ group: g, meshes: [rotor], assembledY: -6, explodedY: -60 });
  }
  // Lớp 6: thân vỏ + đáy vỏ
  {
    const g = new THREE.Group();
    const caseback = partMesh(new THREE.CylinderGeometry(21, 21, 3, 64), mat(0x2d3748), 'caseback');
    caseback.position.y = -9;
    const caseWall = new THREE.Mesh(
      new THREE.CylinderGeometry(21, 21, 18, 64, 1, true),
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
  let motionOn = !prefersReduced(); // reduced motion: không auto-rotate, bánh lắc đứng yên

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
    fromPos: THREE.Vector3;
    toPos: THREE.Vector3;
    fromTarget: THREE.Vector3;
    toTarget: THREE.Vector3;
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

  function modelBounds(targetYs: number[]): THREE.Box3 {
    const box = new THREE.Box3();
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
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const cw = container.clientWidth || 1;
    const ch = container.clientHeight || 1;
    const fovV = THREE.MathUtils.degToRad(camera.fov);
    const fovH = 2 * Math.atan(Math.tan(fovV / 2) * (cw / ch));
    const distV = (size.y / 2) / Math.tan(fovV / 2);
    const spanH = Math.max(size.x, size.z) / 2;
    const distH = spanH / Math.tan(fovH / 2);
    const dist = THREE.MathUtils.clamp(
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
        tweens[i] = {
          from: l.group.position.y,
          to: targetY,
          start: performance.now(),
          delay: i * 60,
          dur: 600,
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
          (m.material as THREE.MeshStandardMaterial).emissive.setHex(ud.origEmissive);
          delete ud.origEmissive;
        }
      }),
    );
    quickBtns.forEach((b) => b.classList.remove('border-brass', 'bg-brass/10'));

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
          const material = m.material as THREE.MeshStandardMaterial;
          const ud = m.userData as { origEmissive?: number };
          if (ud.origEmissive === undefined) ud.origEmissive = material.emissive.getHex();
          material.emissive.setHex(0xb8893c);
          material.emissiveIntensity = 0.5;
        }
      }),
    );
    const qb = quickBtns.find((b) => b.dataset.partId === id);
    qb?.classList.add('border-brass', 'bg-brass/10');

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

  // Click/chạm chọn bộ phận — chỉ tính là click khi không phải thao tác kéo xoay
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
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
    const allMeshes: THREE.Mesh[] = [];
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
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
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
