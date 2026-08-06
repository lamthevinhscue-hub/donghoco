// =============================================================================
// EXPLODED 3D — Three.js scene cho /giai-phau
// =============================================================================
// File tĩnh trong public/ → không qua Vite build.
// Browser xử lý import() trực tiếp từ CDN.
// =============================================================================

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const partsData = window.__partsData3D || [];

export async function initExploded3D() {
  const container = document.getElementById('three-canvas-container');
  const loading = document.getElementById('three-loading');
  const fallback = document.getElementById('three-fallback');
  const hint = document.getElementById('three-hint');
  if (!container) return;

  // Part map
  var partMap = {};
  partsData.forEach(function(p) { partMap[p.id] = p; });

  if (loading) loading.classList.add('hidden');
  if (hint) hint.classList.remove('hidden');

  // ====== Scene ======
  var scene = new THREE.Scene();

  var w = container.clientWidth;
  var h = container.clientHeight;
  var camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 1000);
  camera.position.set(60, 40, 80);

  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  var dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(50, 80, 50);
  scene.add(dirLight);
  var dirLight2 = new THREE.DirectionalLight(0xB8893C, 0.3);
  dirLight2.position.set(-50, 30, -50);
  scene.add(dirLight2);

  // Controls
  var controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 40;
  controls.maxDistance = 200;
  controls.autoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  controls.autoRotateSpeed = 0.8;

  // ====== Materials ======
  function mat(color, opacity) {
    var opts = { color: color };
    if (opacity !== undefined) { opts.transparent = true; opts.opacity = opacity; }
    return new THREE.MeshStandardMaterial(opts);
  }

  // ====== Model layers ======
  var layers = [];

  // LỚP 0: Crystal
  var crystalGroup = new THREE.Group();
  var crystal = new THREE.Mesh(new THREE.CylinderGeometry(22, 22, 3, 64), mat(0xA8C5E2, 0.25));
  crystal.userData = { partId: 'crystal' };
  crystalGroup.add(crystal);
  layers.push({ group: crystalGroup, assembledY: 8, explodedY: 40, meshes: [crystal] });

  // LỚP 1: Hands
  var handsGroup = new THREE.Group();
  var hourHand = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.3, 9), mat(0x1F2D3D));
  hourHand.position.set(0, 5, 4.5);
  hourHand.userData = { partId: 'hour-hand' };
  handsGroup.add(hourHand);
  var minHand = new THREE.Mesh(new THREE.BoxGeometry(1, 0.3, 13), mat(0x1F2D3D));
  minHand.position.set(3, 5, 6.5);
  minHand.rotation.y = -0.4;
  minHand.userData = { partId: 'minute-hand' };
  handsGroup.add(minHand);
  var secHand = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 15), mat(0x9B2C2C));
  secHand.position.set(-2, 5.5, 7.5);
  secHand.rotation.y = 0.3;
  secHand.userData = { partId: 'second-hand' };
  handsGroup.add(secHand);
  var pin = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 1, 16), mat(0x1F2D3D));
  pin.position.y = 5.5;
  handsGroup.add(pin);
  layers.push({ group: handsGroup, assembledY: 5, explodedY: 20, meshes: [hourHand, minHand, secHand] });

  // LỚP 2: Dial
  var dialGroup = new THREE.Group();
  var dial = new THREE.Mesh(new THREE.CylinderGeometry(20, 20, 1.5, 64), mat(0xFAF7F2));
  dial.position.y = 3;
  dial.userData = { partId: 'dial' };
  dialGroup.add(dial);
  var subdial = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 0.5, 32), mat(0xE8E2D6));
  subdial.position.set(5, 3.8, 5);
  subdial.userData = { partId: 'subdial' };
  dialGroup.add(subdial);
  layers.push({ group: dialGroup, assembledY: 3, explodedY: 0, meshes: [dial, subdial] });

  // LỚP 3: Movement
  var movGroup = new THREE.Group();
  var plate = new THREE.Mesh(new THREE.CylinderGeometry(19, 19, 2, 64), mat(0x6B6555));
  plate.position.y = 0;
  movGroup.add(plate);
  var barrel = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 4, 32), mat(0xB8893C));
  barrel.position.set(-8, 1, 0);
  barrel.userData = { partId: 'mainspring-barrel' };
  movGroup.add(barrel);
  var gear1 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 3, 20), mat(0x4A5568));
  gear1.position.set(2, 0.5, 0);
  gear1.userData = { partId: 'gear-train' };
  movGroup.add(gear1);
  var gear2 = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 3, 16), mat(0x5A6878));
  gear2.position.set(8, 0.5, -3);
  movGroup.add(gear2);
  var gear3 = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 3, 14), mat(0x5A6878));
  gear3.position.set(8, 0.5, 4);
  movGroup.add(gear3);
  layers.push({ group: movGroup, assembledY: 0, explodedY: -20, meshes: [barrel, gear1, gear2, gear3] });

  // LỚP 4: Escapement + Balance
  var escGroup = new THREE.Group();
  var escPlate = new THREE.Mesh(new THREE.CylinderGeometry(17, 17, 1.5, 48), mat(0x4A4A4A));
  escPlate.position.y = -3;
  escGroup.add(escPlate);
  var escWheel = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 2, 15), mat(0x2E86AB));
  escWheel.position.set(-4, -3, 2);
  escWheel.userData = { partId: 'escapement' };
  escGroup.add(escWheel);
  var balance = new THREE.Mesh(new THREE.TorusGeometry(5, 0.8, 12, 32), mat(0x9B2C2C));
  balance.rotation.x = Math.PI / 2;
  balance.position.set(5, -3, -2);
  balance.userData = { partId: 'balance' };
  escGroup.add(balance);
  layers.push({ group: escGroup, assembledY: -3, explodedY: -40, meshes: [escWheel, balance] });

  // LỚP 5: Rotor
  var rotorGroup = new THREE.Group();
  var rotorGeo = new THREE.CylinderGeometry(14, 14, 2.5, 32, 1, false, 0, Math.PI);
  var rotor = new THREE.Mesh(rotorGeo, mat(0x5A6878));
  rotor.rotation.z = Math.PI / 2;
  rotor.rotation.y = Math.PI / 2;
  rotor.position.y = -6;
  rotor.userData = { partId: 'rotor' };
  rotorGroup.add(rotor);
  var rotorPin = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 3, 16), mat(0xB8893C));
  rotorPin.position.y = -6;
  rotorGroup.add(rotorPin);
  layers.push({ group: rotorGroup, assembledY: -6, explodedY: -60, meshes: [rotor] });

  // LỚP 6: Caseback
  var backGroup = new THREE.Group();
  var caseback = new THREE.Mesh(new THREE.CylinderGeometry(21, 21, 3, 64), mat(0x2D3748));
  caseback.position.y = -9;
  caseback.userData = { partId: 'caseback' };
  backGroup.add(caseback);
  var caseWall = new THREE.Mesh(new THREE.CylinderGeometry(21, 21, 18, 64, 1, true), mat(0x3A3A3A, 0.3));
  caseWall.position.y = 0;
  backGroup.add(caseWall);
  layers.push({ group: backGroup, assembledY: -9, explodedY: -80, meshes: [caseback] });

  // Add all to scene
  layers.forEach(function(l) {
    l.group.position.y = l.assembledY;
    scene.add(l.group);
  });

  // ====== TÁCH / GHÉP ======
  var isExploded = false;
  var toggleBtn = document.getElementById('toggle-explode-3d');
  var toggleLabel = document.getElementById('toggle-label-3d');
  var modeLabel = document.getElementById('mode-label-3d');
  var resetBtn = document.getElementById('reset-view-3d');

  function applyMode() {
    layers.forEach(function(l, i) {
      var targetY = isExploded ? l.explodedY : l.assembledY;
      setTimeout(function() {
        var startY = l.group.position.y;
        var startTime = performance.now();
        function tween() {
          var elapsed = performance.now() - startTime;
          var t = Math.min(elapsed / 600, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          l.group.position.y = startY + (targetY - startY) * eased;
          if (t < 1) requestAnimationFrame(tween);
        }
        tween();
      }, i * 50);
    });
    if (toggleLabel) toggleLabel.textContent = isExploded ? 'Ghép lại' : 'Tách lớp';
    if (modeLabel) modeLabel.textContent = isExploded ? 'Đang tách' : 'Đang ghép';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', function() { isExploded = !isExploded; applyMode(); });
  if (resetBtn) resetBtn.addEventListener('click', function() {
    isExploded = false;
    applyMode();
    camera.position.set(60, 40, 80);
    controls.target.set(0, 0, 0);
    controls.update();
    selectPart3d(null);
  });

  // ====== RAYCAST ======
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var detailIcon = document.getElementById('detail-icon-3d');
  var detailNameVi = document.getElementById('detail-name-vi-3d');
  var detailNameEn = document.getElementById('detail-name-en-3d');
  var detailRole = document.getElementById('detail-role-3d');
  var detailLink = document.getElementById('detail-link-3d');
  var quickBtns = document.querySelectorAll('.part-quick-3d');

  var iconMap = {};
  quickBtns.forEach(function(b) {
    var id = b.dataset.partId;
    iconMap[id] = b.querySelector('span:first-child') ? b.querySelector('span:first-child').textContent : '•';
  });

  function selectPart3d(id) {
    layers.forEach(function(l) {
      l.meshes.forEach(function(m) {
        if (m.userData && m.userData.origEmissive !== undefined) {
          m.material.emissive.setHex(m.userData.origEmissive);
          m.material.emissiveIntensity = m.userData.origEmissiveIntensity;
        }
      });
    });
    quickBtns.forEach(function(b) { b.style.borderColor = ''; b.style.background = ''; });

    if (!id || !partMap[id]) {
      if (detailIcon) detailIcon.textContent = '👆';
      if (detailNameVi) detailNameVi.textContent = 'Chọn một bộ phận';
      if (detailNameEn) detailNameEn.textContent = 'Click vào bộ phận trong mô hình 3D';
      if (detailRole) detailRole.innerHTML = 'Kéo để xoay mô hình 360°. Bấm <strong>"Tách lớp"</strong> để phân rã. Click từng bộ phận để hiểu vai trò.';
      if (detailLink) detailLink.classList.add('hidden');
      return;
    }

    var p = partMap[id];
    layers.forEach(function(l) {
      l.meshes.forEach(function(m) {
        if (m.userData && m.userData.partId === id && m.material.emissive) {
          if (m.userData.origEmissive === undefined) {
            m.userData.origEmissive = m.material.emissive.getHex();
            m.userData.origEmissiveIntensity = m.material.emissiveIntensity || 0;
          }
          m.material.emissive.setHex(0xB8893C);
          m.material.emissiveIntensity = 0.5;
        }
      });
    });
    var qb = document.querySelector('.part-quick-3d[data-part-id="' + id + '"]');
    if (qb) { qb.style.borderColor = '#B8893C'; qb.style.background = 'rgba(184,137,60,0.1)'; }

    if (detailIcon) detailIcon.textContent = iconMap[id] || '•';
    if (detailNameVi) detailNameVi.textContent = p.nameVi;
    if (detailNameEn) detailNameEn.textContent = p.nameEn;
    if (detailRole) detailRole.textContent = p.role;
    if (detailLink) {
      if (p.link) { detailLink.href = p.link; detailLink.classList.remove('hidden'); }
      else { detailLink.classList.add('hidden'); }
    }
  }

  renderer.domElement.addEventListener('click', function(e) {
    var rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var allMeshes = [];
    layers.forEach(function(l) { l.meshes.forEach(function(m) { allMeshes.push(m); }); });
    var hits = raycaster.intersectObjects(allMeshes);
    if (hits.length > 0 && hits[0].object.userData.partId) {
      selectPart3d(hits[0].object.userData.partId);
    }
  });

  quickBtns.forEach(function(btn) {
    btn.addEventListener('click', function() { selectPart3d(btn.dataset.partId); });
  });

  // ====== Resize ======
  window.addEventListener('resize', function() {
    var nw = container.clientWidth;
    var nh = container.clientHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  });

  // ====== Render loop ======
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      balance.rotation.z = Math.sin(performance.now() * 0.004) * 0.3;
    }
    renderer.render(scene, camera);
  }
  animate();
}

// Auto-init
initExploded3D().catch(function(e) {
  console.error('Exploded 3D init failed:', e);
  var loading = document.getElementById('three-loading');
  var fallback = document.getElementById('three-fallback');
  if (loading) loading.classList.add('hidden');
  if (fallback) fallback.classList.remove('hidden');
  var show2dBtn = document.getElementById('show-2d-btn');
  if (show2dBtn) {
    show2dBtn.addEventListener('click', function() {
      var w3d = document.getElementById('view-3d-wrapper');
      var w2d = document.getElementById('view-2d-wrapper');
      if (w3d) w3d.classList.add('hidden');
      if (w2d) w2d.classList.remove('hidden');
    });
  }
});
