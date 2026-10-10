# V1 — Nâng cấp mô hình 3D giải phẫu — Biên bản thực hiện

- Giao dịch (phân vai theo phán quyết TXN-20260928-004): **TXN-20260928-001 =
  giao dịch đăng ký/chọn gói; TXN-20260928-002 = giao dịch gói V1 (chuẩn)**;
  TXN-20260928-004 = vòng sửa 1 về renderer và kiểm thử ổn định;
  TXN-20260928-006 = chọn hướng kiểm chứng ngoài máy;
  **TXN-20261010-001 = anh Vinh miễn tiêu chí 30 giây (nguyên văn "V1 miễn
  tiêu chí + mở V3") và GPT Work nghiệm thu ĐẠT, cho phép phát hành**
- Danh mục: DHC-ANH-HOAT-ANH-20260926 v1.0.0, gói V1
- Ngày thực hiện: 28/09/2026; nền repo: `1ae7069` (= origin/main khi bắt đầu);
  **nền tái kiểm độc lập của GPT Work: `e8eb5eb`** (origin/main ngày 10/10,
  sau các đợt phát hành lịch sử của anh Vinh; tệp gói V1 không đổi giữa hai
  nền); trong quá trình làm có sẵn một sửa đổi tracked của điều phối
  (`docs/CHI-MUC-KE-HOACH-HIEN-HANH.md` — đăng ký danh mục mới) — KHÔNG đụng,
  GPT Work quyết định phát hành riêng, không vào commit V1
- Trạng thái: **NGHIỆM THU ĐẠT — CHO PHÉP PHÁT HÀNH (TXN-20261010-001)**.
  Trạng thái trước đó CHO_KIEM_CHUNG_BEN_NGOAI (TXN-20260928-006, hướng (a))
  là **lịch sử**: tiêu chí chuyển động liên tục 30 giây CHƯA ĐẠT trên máy hiện
  tại (crash ~t+7–10 s, kể cả trên bản V0 git HEAD — bằng chứng mục 6b);
  ngày 10/10 anh Vinh quyết định **MIỄN** tiêu chí này (miễn, không phải ĐẠT)
  và GPT Work nghiệm thu ĐẠT với các kiểm độc lập tại mục 6c

## 1. Đã làm gì

Nâng cấp mô hình Three.js của trang Giải phẫu (`src/scripts/exploded3d.ts`) từ
mô hình primitive trơn thành mô hình giáo khoa thực hơn, giữ nguyên kiến trúc
tải theo thao tác chủ động và render-on-demand. Không sửa route, nội dung bài,
timeline, CSS toàn cục, ảnh AI, cấu trúc trang, hoạt ảnh ngoài mô hình; không
thêm dependency; không GLB/texture/HDR/font tải từ mạng.

## 2. Thay đổi theo yêu cầu

| Yêu cầu | Thực hiện |
|---|---|
| 1. Bánh răng có răng thật | `taoHinhBanhRang` (Shape: 4 điểm/răng — chân ×2, đỉnh ×2 — lặp `soRang` vòng, lỗ trục là hole `Path.absarc`) + `ExtrudeGeometry` (bevel 0.07/0.05, curveSegments 12). Ba bánh bộ truyền: 24/18/15 răng; bộ thoát: 15 răng nhọn mỏng; thùng cót: vành răng 36 răng đồng thau + trống trong. Không còn đĩa trơn cũ; không dùng texture |
| 2. Bánh lắc đầy đủ | `balanceGroup`: vành (Torus r5), 2 nan chữ thập (Box), trục (Cylinder), dây tóc xoắn `taoGeoDayToc` (xoắn Archimedes 3 vòng, 96 điểm mẫu → CatmullRomCurve3 → TubeGeometry), chân kính đỏ trên trục |
| 3. PBR | `matThepBong` (metalness 1.0, roughness 0.18), `matThepChai` (0.92/0.46), `matDongThau` (1.0/0.28), `matChanKinh` (MeshPhysicalMaterial: đỏ 0xc21f3a, roughness 0.06, transparent 0.62, clearcoat 1.0, ior 1.76), kính sapphire nâng MeshPhysicalMaterial |
| 4. Ánh sáng cục bộ + phản xạ + bóng mềm | key DirectionalLight castShadow (shadow camera ±70, mapSize 1024, PCFShadowMap) + fill ấm + PointLight cục bộ ấm; `scene.environment` từ PMREMGenerator + RoomEnvironment (dynamic import `three/addons/environments/...` — dựng nội bộ, KHÔNG tải tài sản); các bộ phận castShadow, đế/mặt số/đáy nhận bóng |
| 5. Dao động có nhịp | `gocBanhLac(now)`: `KY_NHIP_MS = 620` ms/nhịp, `Math.sin(Math.PI * pha)` với pha theo nhịp — một nhịp = nửa dao động, đổi chiều mỗi nhịp; gán `balanceGroup.rotation.y` trong tick khi `motionOn` (không quay tròn giả) |
| 6. Tải theo thao tác chủ động | Không đổi: `AnatomyExperience.astro` vẫn chỉ dynamic import khi bấm tab 3D; RoomEnvironment là dynamic import thứ hai cùng lúc |
| 7. Ngân sách tải | `check-3d-loading-budget.mjs` KHÔNG sửa; V1-9 bảo vệ thêm: checker V1 fail nếu budget bị nới/vô hiệu |
| 8. prefers-reduced-motion | Giữ nguyên logic: không tween camera (`instant || prefersReduced()` → nhảy đích), không tween tách lớp; chuyển động chỉ chạy khi người dùng chủ động bấm; điều khiển HTML xoay/zoom/tách/chọn vẫn hoạt động |
| 9. Không làm V2 | Không thêm slider/gesture/nút mới; luồng tương tác giữ nguyên |
| 10. Không dependency mới | Chỉ thêm `src/types/three-v1-shim.d.ts` — tệp khai báo kiểu cục bộ (three 0.185 không kèm .d.ts), không đổi runtime |

## 3. Số đo tải trước/sau (gzip, đo cùng cách)

| Chunk | Trước | Sau |
|---|---|---|
| exploded3d.* | 522.7 raw / 130.7 gzip | 563.7 raw / 142.2 gzip |
| OrbitControls.* | 19.2 raw / 4.2 gzip | 19.2 raw / 4.2 gzip (không đổi) |
| RoomEnvironment.* | — | 2.0 raw / 0.9 gzip (mới, chunk động) |
| **Tổng bộ 3D** | **~134.9 gzip** | **147.3 gzip (+12.4 KB, +9.2%)** |

Tăng chi phí hợp lý do hình học răng + bóng + env; checker ngân sách chạy
nguyên văn ĐẠT: tổng gzip chỉ in báo cáo, các route ngoài giải phẫu và trạng
thái HTML ban đầu của hai route giải phẫu không tham chiếu chunk 3D nào, bundle
tải ban đầu không chứa mã three. Không sửa ngưỡng nào (checker không có ngưỡng
số; các điều kiện chống rò giữ nguyên và được V1-9 bảo vệ).

## 4. Checker V1 (`scripts/check-v1-anatomy-3d.mjs`, nối `npm run check` cuối + `npm run build` cuối)

- Nguồn (9 kiểm ĐẠT): V1-1 răng hình học (cấm đĩa trơn cũ); V1-2 vành/nan/trục;
  V1-3 dây tóc xoắn; V1-4 chân kính đỏ trong suốt; V1-5 PBR 4 nhóm; V1-6 ánh
  sáng cục bộ + đổ bóng PCFShadowMap (cấm PCFSoftShadowMap deprecated — kiểm ở
  nguồn) + PMREM/RoomEnvironment + cấm TextureLoader/
  RGBELoader/.hdr/.glb/fetch/new Image; V1-7 dao động nhịp; V1-8 reduced motion;
  V1-9 bảo vệ budget + dynamic import.
- Dist (V1-10): chunk exploded3d đúng 1; chứa dấu hiệu bevelSegments/
  PCFShadowMap; không chứa dấu hiệu tải ngoài; hai route giải phẫu VI/EN
  HTML ban đầu không tham chiếu chunk 3D/môi trường.

## 5. Kết quả lệnh bắt buộc

| Lệnh | Kết quả |
|---|---|
| `npm run build` (gồm `npm run check` + checker V1 dist cuối chuỗi) | exit 0 |
| `npm run check:types` | 0 errors, 0 warnings, **4 hints = baseline** |
| `npm run check` | ĐẠT (chạy trong build; checker V1 nguồn là mắt xích cuối) |
| checker V1 nguồn / dist | exit 0 cả hai |
| `node scripts/check-3d-loading-budget.mjs` | ĐẠT nguyên văn (không nới) |
| `node scripts/scan-chars.mjs` | OK — 461 tệp |
| `git diff --check` / `git diff --cached --check` | sạch |

## 6. Kiểm trình duyệt thật (Chrome hệ thống 153.0.8010.53, script độc lập `output/v1-anatomy-upgrade/browser-test.mjs`, ảnh trong `screens/`)

| Kịch bản | Kết quả |
|---|---|
| VI 2D mặc định | **0** chunk 3D được tải; tab 3D hiện (`vi-2d-macdinh.png`) |
| VI mở tab 3D | Tải đúng 3 chunk: exploded3d + OrbitControls + RoomEnvironment; canvas render (150 lệnh draw đo bằng wrap WebGL); chụp canvas (`vi-3d-canvas-gh.png`) |
| VI Tách lớp / Ghép | Nhãn "Đang tách"/"Đang ghép" đúng; ảnh `vi-3d-tach.png` thấy rõ: thùng cót đồng thau có vành răng, bánh răng có răng, chân kính đỏ |
| VI chọn bộ phận từ danh sách | Bấm "Bánh lắc + dây tóc" → thẻ chi tiết hiện đúng tên (điều khiển HTML thay thế hoạt động) |
| VI Chuyển động 3D | aria-pressed="true"; hai khung canvas cách 500 ms **khác nhau** (`vi-3d-dong-t0.png` / `vi-3d-dong.png`) — dao động/autoRotate vẽ thật; tắt ngay sau đo |
| VI dark mode | html.dark đúng; canvas render (`vi-3d-dark.png`) |
| VI 390px | canvas giữ nguyên, chụp (`vi-390-dark.png`) |
| EN /en/anatomy/ | 2D mặc định 0 chunk; mở 3D đúng 3 chunk; Exploded + canvas + 390 dark (`en-*.png`) |
| Reduced motion | Bấm Tách lớp → nhãn "Đang tách" ngay sau 80 ms (không tween 575 ms); nút xoay HTML hoạt động (`vi-3d-reduced-tach.png`) |
| Fallback không WebGL | Chặn getContext webgl → thông báo lỗi hiện, tự quay về 2D (`vi-webgl-fallback.png`) |

**Ghi chú vòng sửa 1:** bảng trên là kết quả lượt đầu (còn
`preserveDrawingBuffer` + PCFSoftShadowMap). Sau vòng sửa 1, toàn bộ kịch bản
đã chạy lại trên dist mới bằng `browser-test-r1.mjs` với cách chụp clip và
thu console — kết quả cập nhật ở mục 6b (điểm đổi: không còn cảnh báo
deprecated; 404 còn lại là favicon.ico + insights, đều không thuộc V1; phần
chưa đạt duy nhất là phép thử 30 giây, phân tích ở mục 6b).

## 6b. Vòng sửa 1 (TXN-20260928-004) — renderer và kiểm thử ổn định

**Sửa theo phán quyết:**

1. **Gỡ `preserveDrawingBuffer: true`** khỏi `WebGLRenderer` (quay về
   `{ antialias, alpha }`, gỡ luôn cast). Không thay bằng cơ chế giữ
   canvas/chụp khác. Browser test đổi cách chụp: `page.screenshot` clip theo
   bounding box canvas (nằm trong viewport), không dùng toDataURL.
2. **Bỏ PCFSoftShadowMap deprecated**: đổi sang `PCFShadowMap`
   (`renderer.shadowMap.type`; shim đổi `export const PCFShadowMap`). Console
   sau sửa trên dist mới **không còn** cảnh báo
   "PCFSoftShadowMap has been deprecated". Chất lượng bóng: PCF chuẩn của
   three 0.185 — bóng đổ lên đế máy/mặt số rõ (ảnh `vi-3d-tach.png`).
3. **Checker V1**: V1-6 kiểm `shadowMap.enabled = true` +
   `shadowMap.type = (PCFShadowMap|VSMShadowMap)` + cast/receive + ánh sáng +
   env, đồng thời **fail nếu source còn `PCFSoftShadowMap` hoặc
   `preserveDrawingBuffer`**; V1-10 bỏ điều kiện chuỗi deprecated trong chunk
   (chuỗi cảnh báo nằm sẵn trong bundle three dù không dùng API — false
   positive; việc không dùng API được kiểm ở nguồn V1-6 + mutation MUT-8 +
   console trình duyệt). Shim đồng bộ `PCFShadowMap`.

**Mutation bổ sung: 8/8 ca ĐẠT + chạy sạch cuối** (giữ MUT-1..6, thêm MUT-7
tái bật `preserveDrawingBuffer: true` → fail đúng V1-6; MUT-8 tái đưa
`PCFSoftShadowMap` → fail đúng V1-6).

**Console trước/sau:**

| | Trước vòng sửa | Sau vòng sửa (dist mới) |
|---|---|---|
| PCFSoftShadowMap deprecated warning | có (2 lần/lượt) | **không còn** |
| X4122 precision (trình biên dịch shader HLSL của driver D3D — warning trình bày, không phải API deprecated của three) | có | có |
| 404 | insights | **giống** — hai URL đều không thuộc V1: `/_vercel/insights/script.js` (analytics preview, được phép bỏ qua theo phán quyết) và `/favicon.ico` (yêu cầu mặc định của trình duyệt; site khai báo `favicon.svg` — 200) |

**Phép thử 30 giây — CHƯA ĐẠT, bằng chứng đầy đủ:**

- Cấu hình: preview dist mới (không preserve, PCFShadow), bấm "Chuyển động 3D"
  sau khi tách lớp, poll mỗi 5 giây (phản hồi evaluate + aria-pressed), tắt
  ngay khi gãy.
- Kết quả: **VI mất ổn định tại t+10 s** (SwiftShader software renderer; đọc
  aria không được — tab đã crash); các phép thử GPU headed (NVIDIA — driver
  báo "GL_CLOSE_PATH_NV: GPU stall due to ReadPixels") crash tại t+7–8 s. EN
  chưa chạy trọn 30 giây vì cùng hiện tượng.
- **Bằng chứng crash không phụ thuộc các yếu tố V1 đã bị nghi** (mỗi biến thể
  đều crash cùng kiểu tại điểm tương đương):

| Biến thể | Kết quả |
|---|---|
| V1 đầy đủ ban đầu (preserve + PCFSoft) | crash ~t+6–7 s |
| V1 không preserve + PCFShadow (bản hiện tại) | crash ~t+7–10 s |
| V1 tắt shadow | crash |
| V1 tắt môi trường PMREM | crash |
| V1 bánh răng thay Extrude bằng cylinder | crash |
| V1 `powerPreference: 'low-power'` (thử rồi gỡ — ngoài phạm vi) | crash |
| V1 SwiftShader software (không GPU driver) | crash ~t+10 s |
| **V0 git HEAD (mã đang phát hành — KHÔNG có preserve/PCFSoft/bóng/env/răng)** | **crash ~t+7–8 s y hệt** |
| Bất kỳ bản nào, KHÔNG bật chuyển động | ổn định ≥30 s |

- Đã loại trừ thêm: nhiều instance Chrome song song (thử single-instance sau
  khi dọn toàn bộ chrome — vẫn crash); chuỗi "GL_CLOSE_PATH_NV ... GPU stall
  due to ReadPixels" của driver NVIDIA xuất hiện trong mọi lượt render liên tục.

**Mâu thuẫn đã trình và kết cục theo phán quyết TXN-20260928-006** (lịch sử —
kết cục tại mục 6c): hai nguyên
nhân được chỉ ra (preserveDrawingBuffer, PCFSoftShadowMap) đã loại trừ bằng mã
và phép thử, crash vẫn tái hiện trên cả bản V0 — bằng chứng hiện có đặt nguyên
nhân ở tầng trình duyệt/driver GPU NVIDIA của máy này với render WebGL liên tục
(tồn tại từ trước V1). GPT Work đã chọn **hướng (a)**: kiểm chứng 30 giây trên
một máy hoặc cấu hình trình duyệt/GPU khác; không mở gói điều tra riêng, không
nghiệm thu có điều kiện; gói chuyển trạng thái **CHO_KIEM_CHUNG_BEN_NGOAI**,
chưa cho commit/push. Giới hạn ghi nhận: bằng chứng crash trên máy hiện tại
(gồm cả V0) giữ làm dữ liệu tham chiếu, KHÔNG dùng để tự miễn tiêu chí và
KHÔNG kết luận là lỗi V1.

## 6c. Kết cục kiểm chứng ngoài máy (TXN-20261010-001, nền `e8eb5eb`)

- Quyết định của anh Vinh ngày 10/10: **miễn tiêu chí 30 giây** (miễn, không
  phải ĐẠT) và **mở V3** — nguyên văn: "V1 miễn tiêu chí + mở V3". GPT Work
  ghi nhận kèm: "Việc V0 cũng gặp hiện tượng không tự chứng minh nguyên nhân
  chắc chắn là driver" — crash ở mục 6b không quy cho mã V1.
- Tái kiểm độc lập của GPT Work trên bản sao kiểm chứng riêng (nền
  `e8eb5eb`): build đầy đủ exit 0; kiểm kiểu dữ liệu **0 lỗi / 0 cảnh báo /
  0 gợi ý** (bản sao kiểm chứng không có thư mục output nội bộ; máy GLM:
  astro check 0 lỗi / 0 cảnh báo, mọi hint phát sinh từ tệp untracked trong
  output/ — bản release-check dist của các đợt ảnh lịch sử 04–05/10 và script
  kiểm nội bộ — 0 hint từ tệp tracked hay tệp gói V1); checker V1 nguồn và
  dist ĐẠT;
  mutation **8/8 + một lượt chạy sạch** (khác bộ D5 6/6 — hai bộ mutation
  độc lập); trình duyệt Việt/Anh: không tải 3D trước thao tác, nút chuyển động
  đổi trạng thái đúng, có vẽ khi bật và dừng vẽ sau khi tắt, không còn cảnh
  báo bóng lỗi thời; hai kiểm tra diff sạch.
- GPT Work không tuyên bố chạy lại đủ mười kịch bản trong lượt tái kiểm:
  bằng chứng hai khung canvas khác nhau và mười kịch bản trình duyệt ở mục 6
  được giữ từ hồ sơ GLM.

## 7. Mutation (`output/v1-anatomy-upgrade/mutation-v1.mjs`, sandbox mkdtemp ngoài repo)

**8/8 ca ĐẠT + 1 chạy sạch cuối exit 0** (log `mutation-v1.log.txt`; mỗi ca
fail đúng rule, hoàn nguyên byte-đối-byte sha256, dọn sandbox; lượt chạy sạch
không tính là mutation):

| Ca | Đột biến | Bắt đúng |
|---|---|---|
| MUT-1 | Bánh răng về đĩa trơn (mất ExtrudeGeometry) | V1-1 |
| MUT-2 | Bỏ dây tóc xoắn | V1-3 |
| MUT-3 | Bỏ bóng + môi trường | V1-6 |
| MUT-4 | Reduced motion vẫn tự tween camera | V1-8 |
| MUT-5 | Vô hiệu hóa ROUTES budget checker | V1-9 |
| MUT-6 | Bánh lắc quay tròn giả | V1-7 |
| MUT-7 (TXN-004) | Tái bật `preserveDrawingBuffer: true` | V1-6 |
| MUT-8 (TXN-004) | Tái đưa `PCFSoftShadowMap` deprecated | V1-6 |

## 8. Điểm chưa giải quyết

1. **Phép thử 30 giây chưa đạt trên máy hiện tại** (chi tiết mục 6b) —
   **ĐÃ KHÉP theo quyết định TXN-20261010-001**: anh Vinh miễn tiêu chí
   (miễn, không phải ĐẠT); hiện tượng crash tái hiện trên cả V0 nên không
   quy cho mã V1 (lịch sử: từng chờ hướng (a)/(b)/(c) ở mục 6b). Các số đo
   crash trên máy hiện tại giữ làm dữ liệu tham chiếu.
2. Warning X4122 (precision HLSL) từ trình biên dịch shader của driver D3D —
   mức warning trình bày, tồn tại độc lập với lựa chọn API bóng; không xác
   định được cách loại trừ trong phạm vi mã trang. Không thuộc tiêu chí
   nghiệm thu (GPT Work ghi nhận console trình duyệt không còn cảnh báo bóng
   lỗi thời).

## 9. Trạng thái Git và tệp phát hành

- Nền phát hành: `e8eb5eb` = origin/main ngày 10/10 (nền ban đầu của gói là
  `1ae7069` — lịch sử); tracked sửa còn `docs/CHI-MUC-KE-HOACH-HIEN-HANH.md`
  (đợt điều phối — **phát hành riêng** theo phán quyết TXN-20261010-001,
  không vào commit V1).
- **Phát hành đúng 5 tệp theo phán quyết TXN-20261010-001**:
  1. `src/scripts/exploded3d.ts` (M)
  2. `src/types/three-v1-shim.d.ts` (mới — khai báo kiểu three 0.185)
  3. `scripts/check-v1-anatomy-3d.mjs` (mới — checker V1 nguồn/dist)
  4. `package.json` (M — nối checker vào check + build)
  5. `docs/nghiem-thu/V1-nang-cap-mo-hinh-3d-2026-09-28.md` (biên bản này)
  `output/` giữ nội bộ, không stage.
