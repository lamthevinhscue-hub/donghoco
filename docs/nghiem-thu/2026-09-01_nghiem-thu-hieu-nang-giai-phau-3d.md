# Biên bản nghiệm thu — Tối ưu hiệu năng giải phẫu 3D và thiết lập ngân sách tải

- **Ngày:** 01/09/2026
- **Commit nền khi bắt đầu gói:** `a5cc505` — "feat(navigation): thêm lộ trình học đồng hồ" (working tree sạch tại thời điểm bắt đầu).
- **Trạng thái cuối gói: CHƯA COMMIT, CHƯA PUSH** — chờ anh Vinh kiểm độc lập.

---

## 1. Vấn đề ban đầu

Chunk `exploded3d` (chứa Three.js + OrbitControls + engine mô hình) chiếm ~532 KB raw / 135 KB gzip. Mô hình 3D chỉ là tính năng tùy chọn trên `/giai-phau/`; sơ đồ 2D là trải nghiệm mặc định. Cần bảo đảm: người đọc thông thường không tải tài nguyên 3D; người mở tab 3D có trải nghiệm đầy đủ; có kiểm tự động chống hồi quy. **Không tăng ngưỡng cảnh báo Vite, không tắt cảnh báo, không xóa mô hình 3D, không thêm dependency.**

## 2. Những import/cấu trúc đã thay đổi

| File | Thay đổi |
|---|---|
| `src/scripts/exploded3d.ts` | (a) Thay `import * as THREE from 'three'` bằng **17 named imports** cho đúng các class được dùng (`AmbientLight, Box3, BoxGeometry, CylinderGeometry, DirectionalLight, Group, MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, Raycaster, Scene, Spherical, TorusGeometry, Vector2, Vector3, WebGLRenderer`) — tổng 75 tham chiếu `THREE.` được quy về tên trần. (b) Các kiểu dữ liệu (`BufferGeometry`, `Material`, `MeshStandardMaterialParameters`) chuyển sang **`import type`** — biên dịch xóa, không tạo dependency runtime. (c) `OrbitControls` chuyển từ import tĩnh sang **dynamic import riêng** ngay chỗ sử dụng — chunk tách khỏi chunk engine, cache độc lập. |
| `src/pages/giai-phau.astro` | Thêm `aria-busy="true"` trên tab 3D trong lúc tải engine (xóa khi xong) — tab không tạo cảm giác "bấm không phản hồi" với trình đọc màn hình. Cơ chế còn lại giữ nguyên (đã đúng từ trước): dynamic import chỉ khi bấm tab, fallback 2D + thông báo `role="alert"` + nút thử lại + focus về tab 2D. |
| `astro.config.mjs` | **Không đổi** — dynamic import đã tách chunk tự nhiên; không thêm `manualChunks` vì không có lợi ích tải/cache thêm (tránh cấu hình chỉ để làm đẹp số). |
| `scripts/check-3d-loading-budget.mjs` | **Tạo** — kiểm chống hồi quy (chi tiết mục 5), đọc `dist/` nên chỉ chạy sau build. |
| `package.json` | Chèn `node scripts/check-3d-loading-budget.mjs` vào `npm run build`, sau `astro build`, trước `check-links`. |

Cơ chế trải nghiệm 3D **giữ nguyên và được kiểm chứng lại**: render-on-demand (dừng khi về 2D, tab ẩn, rời viewport); `prefers-reduced-motion` — không tween, không tự xoay (chuyển động chỉ chạy khi người dùng bấm); trạng thái tải bằng text thật "Đang tải mô hình 3D…" + overlay ẩn sau frame đầu; không tự tải trước 3D.

## 3. Số liệu asset 3D trước — sau (build thật, đo từ `dist/_astro/`)

| | Trước (nền `a5cc505`) | Sau gói |
|---|---|---|
| Chunk engine | `exploded3d.*.js` — **532.2 KB raw / 135.0 KB gzip** (gộp three + OrbitControls + engine) | `exploded3d.*.js` — **513.4 KB raw / 131.3 KB gzip** |
| Chunk OrbitControls | (gộp trong exploded3d) | `OrbitControls.*.js` — **19.3 KB raw / 4.4 KB gzip** — cache riêng |
| Tổng gzip 3D | 135.0 KB | **135.7 KB** |

**Đọc trung thực số liệu:** tổng gzip gần như không đổi (135.0 → 135.7 KB, +0.7 KB overhead tách chunk) — ba core vốn đã bị tree-shake tốt từ trước nhờ ESM. Đổi named imports giúp ràng buộc tường minh những gì được kéo vào (điều kiện để tree-shaking tiếp tục hiệu quả) chứ không phải "cú hích" giảm số. Giá trị thật của gói: **tách OrbitControls thành chunk cache riêng** (sửa engine không buộc tải lại controls) và **chứng minh bằng kiểm tự động + trình duyệt rằng không route nào tải chunk 3D trong luồng ban đầu** (mục 4) — đây mới là điều kiện "người đọc thông thường không tải Three.js" được bảo vệ lâu dài.

## 4. Bằng chứng chunk 3D không nằm trong initial load

Script `check-3d-loading-budget.mjs` (chạy sau mỗi `npm run build`):

- Dựng tập chunk 3D từ đồ thị import của `dist/_astro/exploded3d.*.js` (gồm `OrbitControls.*` và mọi chunk chứa đặc trưng chuỗi `THREE.` — loại trừ helper dùng chung `hoisted.*` của Vite, vốn được mọi trang tải và không chứa mã three).
- Kiểm 5 route — **đều ĐẠT "không tham chiếu chunk 3D, bundle tải ban đầu không chứa mã three"**:
  - Trang chủ (`index.html`)
  - Trang thương hiệu (`/thuong-hieu/rolex/`)
  - Mẫu iconic (`/mau-iconic/rolex-submariner/`)
  - Bài cơ chế (`/co-che/bo-thoat/`)
  - `/giai-phau/` ở sơ đồ 2D mặc định
- `/giai-phau/index.html` không chứa `mountExploded3D` — engine không được khởi tạo trước khi người dùng chọn tab.
- Kiểm nguồn: `exploded3d.ts` không còn `import * as THREE`; `giai-phau.astro` chỉ mở engine bằng dynamic import (import tĩnh duy nhất là `import type`); không file nào ngoài `exploded3d.ts` import Three.js runtime.

Kết quả chạy: **KẾT LUẬN ĐẠT** (báo cáo đầy đủ in ra terminal trong `npm run build`).

## 5. Nghiệm thu trình duyệt (Playwright trên preview sau build, desktop 1280 + mobile 375)

| Phép kiểm | Kết quả |
|---|---|
| Mặc định: tab 2D `aria-selected=true`, tab 3D false, panel 2D hiện, không canvas WebGL, **0 request chunk 3D** (resource timing) | ĐẠT |
| Bấm "Mô hình 3D" → đúng lúc đó tải 2 chunk (exploded3d + OrbitControls), canvas render, overlay "Đang tải" tự ẩn sau frame đầu | ĐẠT |
| Tách lớp ("Đang tách"), chọn bộ phận bánh lắc (thẻ chi tiết + link `/tu-dien/day-toc-banh-lac`), xoay trái, zoom, Đặt lại về "Tách lớp/Đang ghép" | ĐẠT |
| Về 2D: theo dõi `requestAnimationFrame` 800ms — **0 frame mới**, render loop dừng hẳn | ĐẠT |
| Bàn phím tablist: ArrowRight/ArrowLeft đổi tab + focus đúng + `aria-selected` đồng bộ | ĐẠT |
| `prefers-reduced-motion: reduce`: nút "Chuyển động 3D" `aria-pressed=false`, canvas đứng yên (so 2 ảnh liên tiếp giống nhau) | ĐẠT |
| Mô phỏng lỗi tải (abort request chunk exploded3d): thông báo lỗi hiện (`role=alert`), tự quay về 2D (`aria-selected` tab 2D = true), **focus về tab 2D**, nút "Thử lại" hiện | ĐẠT |
| Mobile 375px: không tràn, 2D vẫn mặc định | ĐẠT |
| Sáng/tối: body `rgb(251,251,248)` ↔ `rgb(17,21,25)` | ĐẠT |
| Page errors: 0 | ĐẠT |

## 6. Kiểm tra bắt buộc

1. `git diff --check` — sạch.
2. `npm run check` — ĐẠT toàn chuỗi (không đổi).
3. `npm run build` — ĐẠT: 222 trang; script ngân sách 3D ĐẠT (báo cáo trên); check-links: "OK: Không phát hiện link nội bộ hỏng. Đã quét 222 trang HTML, 15176 link."
4. Số liệu: **222 trang / 15.176 liên kết nội bộ** — không đổi so với gói trước (gói này không đụng nội dung/điều hướng).

## 7. Giới hạn còn lại

1. **Ba core chiếm phần lớn chunk 3D** (513 KB raw) — đây là bản chất của Three.js khi cần WebGLRenderer; không thể giảm đáng kể mà không thay thế thư viện (ngoài phạm vi). Chunk không bao giờ nằm trong luồng tải chung — được bảo vệ bằng script chống hồi quy.
2. **Số liệu là build cục bộ** — chưa phản ánh Core Web Vitals production (không có dữ liệu người dùng thật); chưa chạy Lighthouse/field data trong gói này.
3. Đo gzip bằng `zlib.gzipSync` mức mặc định — số có thể lệch nhẹ so với gzip/brotli của CDN thực tế (Vercel).
4. Trình duyệt kiểm trên Chromium (Playwright) — chưa thử WebGL trên thiết bị thật/iOS Safari; fallback lỗi đã mô phỏng bằng cách chặn request.
5. Mô phỏng "thử lại" sau lỗi: giữ nguyên cơ chế có sẵn (tải lại trang qua cờ `sessionStorage`) — chưa kiểm end-to-end nhánh reload trong gói này (đã kiểm trong gói xây 3D trước đó).

## 8. Xác nhận

- **CHƯA COMMIT, CHƯA PUSH.** Toàn bộ thay đổi nằm trong working tree chờ anh kiểm độc lập.
- Tệp thuộc gói: 2 tạo (`scripts/check-3d-loading-budget.mjs`, biên bản này) + 4 sửa (`src/scripts/exploded3d.ts`, `src/pages/giai-phau.astro`, `package.json`, `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md`). Khi commit, `git add` từng tên tệp, không dùng `git add .` hay `git add -A`.
