# G06-A chặng 1 — Kiểm kê bộ phận, chuỗi hiển thị và thao tác `/giai-phau/`

> **Lưu ý vòng sửa 1 (TXN-20260913-21):** bảng §1 ghi nguyên trạng HIỆN HÀNH của mô tả (đối tượng kiểm kê) — các câu thay thế VI/EN đã duyệt/chờ duyệt nằm ở `cong-noi-dung-claim.md` **bản 3** (ba mức bằng chứng: nội dung repo / nguồn đọc trực tiếp FHH Escapement + Balance ngày 2026-09-13 / chưa xác minh; quyết hình C5 chốt ở vòng 3). Mô tả trong §1 KHÔNG phải đề xuất.

Ngày: 2026-09-13 · Nền: `f42c11e` · Trạng thái: chỉ đọc mã + kiểm trình duyệt trên dist build nền, KHÔNG sửa mã.
Tệp đối chiếu: `src/pages/giai-phau.astro`, `src/components/WatchExplodedView.astro` (2D), `src/components/WatchExplodedView3D.astro` (3D), `src/scripts/exploded3d.ts` (engine), `src/components/Header.astro`, `src/i18n/contentRoutes.ts`, `src/i18n/ui.ts`.

## 1. Bảng 12 bộ phận — bản 2D so với bản 3D

Nơi phát sinh chuỗi: **2D** mô tả hiển thị đọc từ thuộc tính `data-*` trên phần tử SVG (`data-role` — mảng `parts` ở đầu frontmatter KHÔNG được dùng cho UI, chỉ `id`/`nameVi`/`icon` dùng cho nút nhanh — xem §3); **3D** mô tả nằm trên nút nhanh `data-role` (component 3D) và được engine đọc lại vào thẻ chi tiết.

| id | Lớp 2D | Tên VI (2D) | Tên EN (2D) | Mô tả 2D hiển thị (data-role) | Mô tả 3D (rút gọn) | Khác biệt 2D↔3D | Link 2D/3D |
|---|---|---|---|---|---|---|---|
| crystal | 0 | Kính cường lực | Crystal | Lớp trong suốt bảo vệ mặt số. Thường là sapphire — độ cứng 9/10, chống xước gần như tuyệt đối. | Lớp trong suốt bảo vệ mặt số. Thường là sapphire. | 3D bỏ "9/10", bỏ "chống xước gần như tuyệt đối" | (không link) |
| second-hand | 1 | Kim giây | Second hand | Quay 1 vòng mỗi 60 giây — liên kết với bộ thoát. | Quay 1 vòng mỗi 60 giây — liên kết bộ thoát. | 2D array (không hiển thị) viết "Liên kết trực tiếp với bộ thoát" | /co-che/bo-thoat |
| minute-hand | 1 | Kim phút | Minute hand | Quay 1 vòng mỗi 60 phút. | Quay 1 vòng mỗi 60 phút. | 2D array có thêm "truyền động từ bánh răng phút của chuỗi truyền động" | /co-che/chuyen-dong-co |
| hour-hand | 1 | Kim giờ | Hour hand | Ngắn và dày nhất — quay 1 vòng mỗi 12 giờ. | Quay 1 vòng mỗi 12 giờ. | 2D array có thêm "Tỷ lệ 12:1 so với kim phút" | /co-che/chuyen-dong-co |
| dial | 2 | Mặt số | Dial | Hiển thị chữ số, vạch, thương hiệu. Quyết định 80% diện mạo. | "Gương mặt" của đồng hồ — quyết định 80% diện mạo. | Khác mệnh đề trang trí, cùng con số 80% | (không link) |
| subdial | 2 | Mặt số phụ | Sub-dial | Hiển thị chức năng phụ: giây chạy, lịch, v.v. | Hiển thị chức năng phụ: giây, lịch. | 2D array liệt kê dài hơn (chronograph, bộ đếm phút, vạn niên) | /tu-dien/perpetual-calendar |
| mainspring-barrel | 3 | Thùng cót | Mainspring barrel | Nguồn năng lượng! Chứa dây cót xoắn — lên dây là vặn cót. | Nguồn năng lượng! Dây cót xoắn. | 3D rút gọn | /co-che/tru-cot |
| gear-train | 3 | Bánh răng trung gian | Gear train / Going train (2D) · Gear train (3D) | Chuỗi 4 bánh răng truyền năng lượng + chia tỷ lệ cho kim. | Chuỗi 4 bánh răng truyền năng lượng. | nameEn 2D dài hơn; cùng con số "4" (xem hồ sơ claim) | /co-che/chuyen-dong-co |
| escapement | 4 | Bộ thoát | Escapement | TRÁI TIM ĐẬP — chia năng lượng thành nhịp, nuôi bánh lắc. | TRÁI TIM ĐẬP — chia năng lượng thành nhịp. | 3D bỏ "nuôi bánh lắc" | /co-che/bo-thoat |
| balance | 4 | Bánh lắc + dây tóc | Balance & Hairspring | Hệ dao động điều hòa — biến năng lượng thành nhịp thời gian. | Hệ dao động — quyết định độ chính xác. | 2D không nói "quyết định độ chính xác"; 3D nói — 3D mạnh hơn (xem hồ sơ claim) | /tu-dien/day-toc-banh-lac |
| rotor | 5 | Rotor (lên dây tự động) | Rotor | Quả nặng xoay theo cổ tay → tự động lên dây cót. | Quả nặng xoay → tự động lên dây. | nameVi 2D có chú thích trong ngoặc | /co-che/len-day-tu-dong |
| caseback | 6 | Đáy vỏ | Caseback | Nắp đáy — kín (chống nước tốt) hoặc lộ máy (đẹp). | Nắp đáy — kín hoặc lộ máy. | 2D gán "chống nước tốt" — 3D không (xem hồ sơ claim) | (không link) |

Cấu trúc lớp: 2D có 7 layer-group (0 Kính, 1 Kim, 2 Mặt số, 3 Bộ máy, 4 Bộ thoát, 5 Rotor, 6 Đáy vỏ) với nhãn "Lớp N · …"; 3D dựng 7 lớp tương ứng (kính, kim, mặt số+phụ, đế máy+cót+bánh răng, bộ thoát+bánh lắc, rotor, thân vỏ+đáy). Cả hai bản cùng 12 phần tử chọn được.

## 2. Chuỗi hiển thị và trợ năng cần dịch (đầy đủ, theo tệp)

### 2.1 `src/pages/giai-phau.astro` (Astro tĩnh)
- `<title>` "Giải phẫu đồng hồ cơ"; meta description (đoạn "Sơ đồ exploded view tương tác…12 bộ phận…").
- H1 "Giải phẫu một chiếc đồng hồ cơ"; đoạn hero (chứa "Tách lớp", "12 bộ phận").
- Tablist `aria-label="Chế độ minh họa"`; nút "Sơ đồ 2D", "Mô hình 3D" (kèm `aria-selected`/`aria-controls`/tabindex roving).
- Hộp lỗi `role="alert"`: "Không mở được mô hình 3D (mạng chậm hoặc thiết bị không hỗ trợ). Đang xem sơ đồ 2D." + nút "Thử lại".
- Section "Đồng hồ cơ = 12 lớp xếp chồng" + đoạn dẫn ("tòa tháp xếp lớp", "hơn 100 chi tiết", "30-40mm", "chảy từ dưới lên trên").
- 3 cột: "⚡ Dòng năng lượng", "⏱ Dòng thời gian", "💡 Dòng thông tin" + nội dung từng cột.
- Bảng tổng kết: cột "Lớp / Bộ phận / Vai trò cốt lõi / Vật liệu điển hình (ẩn <sm)" + 7 dòng (Kính…Đáy vỏ).
- CTA: "Muốn hiểu sâu hơn từng bộ phận?" + đoạn dẫn + "♥ Bộ thoát (trái tim)", "⚡ Thùng cót", "Tất cả cơ chế →".

### 2.2 `WatchExplodedView.astro` (2D)
- Thanh điều khiển: "🔧 Trạng thái:", nhãn động "Đang ghép (assembled)" / "Đang tách (exploded)"; nút "Tách lớp" ↔ "Ghép lại" (aria-pressed); "Đặt lại".
- `<svg role="img" aria-label="Sơ đồ giải phẫu đồng hồ cơ với 12 bộ phận trên trục calibre — dùng danh sách bộ phận bên dưới để chọn từng chi tiết">`.
- Nhãn chữ trong SVG (ẩn <768px): "Lớp 0 · Kính" … "Lớp 6 · Đáy vỏ", "SAPPHIRE CRYSTAL", "KIM (hands)", logo giả "ĐỒNG HỒ CƠ", "Thùng cót", "Chuỗi truyền động", "Bộ thoát", "Bánh lắc", "ROTOR (automatic)", "CASEBACK".
- Tooltip SVG: tên VI + tên EN + "→ Chạm hoặc bấm để đọc bài"; Escape đóng (WCAG 1.4.13).
- Thẻ chi tiết (`role="status" aria-live="polite"`): mặc định "Chọn một bộ phận" + "Chạm hoặc bấm vào bất kỳ bộ phận nào trong sơ đồ bên cạnh" + đoạn dẫn (12 bộ phận chính…) + link "Đọc bài chi tiết →".
- Danh sách nhanh: "12 bộ phận — chạm hoặc bấm để chọn" + 12 nút (aria-pressed, icon + nameVi).
- Hướng dẫn cuối: "💡 Mẹo: Bấm "Tách lớp"… • Mũi tên ↓ chỉ hướng trọng lực".

### 2.3 `WatchExplodedView3D.astro` (3D markup)
- "Trạng thái:" + "Đang ghép"/"Đang tách"; "Tách lớp"/"Ghép lại"; "Chuyển động 3D" (aria-pressed = trạng thái chạy, nhãn cố định); "Đặt lại".
- Lớp phủ tải: `role="progressbar" aria-label="Đang tải"` + "Đang tải mô hình 3D…".
- Hướng dẫn: "Kéo để xoay · Cuộn hoặc chụm để thu phóng · Chạm hoặc bấm một bộ phận để xem chi tiết".
- Ghi chú: "Mô hình khái niệm để minh họa cấu trúc, không mô phỏng một calibre cụ thể." (nguyên tắc nội dung — bắt buộc giữ khi dịch).
- Nhóm điều khiển `aria-label="Điều khiển góc nhìn mô hình"`: "Xoay mô hình sang trái/phải", "Phóng to mô hình", "Thu nhỏ mô hình" (glyph ←/→/+/−).
- Thẻ chi tiết 3D (status/polite): "Chọn một bộ phận" + "Chạm hoặc bấm vào bộ phận trong mô hình, hoặc chọn từ danh sách" + "Đọc bài chi tiết →".
- "12 bộ phận — bấm để chọn" + 12 nút mang `data-name-vi/name-en/role/link/icon`.

### 2.4 Chuỗi động (`src/scripts/exploded3d.ts` — KIỂM KÊ ĐẦY ĐỦ, không chỉ một điểm)
Vòng sửa 1 (TXN-20260913-21) đếm lại — engine có **nhiều nhóm chuỗi hiển thị/trạng thái**, tất cả thuộc phạm vi dịch:
- `DETAIL_DEFAULT_ROLE` (dòng 533–535): đoạn dẫn mặc định thẻ 3D "Kéo để xoay mô hình 360 độ. Bấm "Tách lớp"…" (cùng nội dung với `#detail-role-3d` tĩnh — hai chỗ một nghĩa).
- `selectPart(null)` nhánh reset (dòng 562–565): "👆", "Chọn một bộ phận", "Chạm hoặc bấm vào bộ phận trong mô hình, hoặc chọn từ danh sách".
- `toggleBtn` (dòng 601–607): nhãn "Ghép lại"/"Tách lớp" (603) + mode "Đang tách"/"Đang ghép" (604).
- `resetBtn` (dòng 611–619): nhãn sau đặt lại "Tách lớp" (613) + "Đang ghép" (614).
- Nội dung sau Escape/reset dùng chung các hàm trên — kiểm EN phải chạy sau tương tác, không chỉ HTML ban đầu.
- `aria-label` canvas (dòng 98–101): mô tả mô hình + thao tác + phương thức thay thế.
- Thông báo lỗi: "Không tìm thấy khung chứa mô hình 3D." (dòng 66), "Trình duyệt hoặc thiết bị không hỗ trợ WebGL." (dòng 91); `console.error` ở trang (giai-phau.astro) — chuỗi console không hiển thị cho người dùng nhưng ghi rõ trong phạm vi.
- `sessionStorage` khóa `anatomy-retry-3d` (giai-phau.astro) — không hiển thị.
- Nguồn phát sinh tổng hợp: Astro template (1×), mảng frontmatter (2D parts — chỉ dùng id/nameVi/icon; 3D parts — dùng đầy đủ), thuộc tính `data-*` trên SVG, chuỗi literals trong 2 script TS, không có chuỗi từ CSS.

### 2.5 Ra ngoài phạm vi trang nhưng thuộc phạm vi dịch G06-A
- `Header.astro`: mục "Khám phá" (`nav_anatomy` → `/giai-phau`); ở menu EN đang gắn nhãn hiển thị "Vietnamese only" (`tr.nav_vi_only`) — chỉ bỏ nhãn khi route `/en/anatomy/` đã tồn tại.
- `src/i18n/ui.ts`: `OG_IMAGE_MAP` mục `/giai-phau` dùng ảnh `og-lich-su.jpg` (dùng chung với Lịch sử — ghi nhận, không phải lỗi).
- `<title>`/description: ở BaseLayout qua props — bản EN cần cặp title/description riêng.

## 3. Phát hiện cấu trúc quan trọng (không coi comment là bằng chứng)

1. **Hai bản dữ liệu trong 2D**: mảng `parts` (frontmatter) VÀ thuộc tính `data-*` trên SVG cùng chứa tên/role — **không cùng nguồn**: mảng chỉ cấp `id/nameVi/icon` cho nút nhanh; mô tả hiển thị lấy từ `data-*`. Hai bản lệch chữ (VD kim giờ: array có "Tỷ lệ 12:1…", SVG không; crystal: array "(độ cứng 9/10…)" vs SVG "— độ cứng 9/10…"). Bản EN phải chốt MỘT nguồn dữ liệu duy nhất — khuyến nghị tách `src/data/anatomy-parts.ts` (một mảng, hai ngôn ngữ) cấp cho cả 2D/3D.
2. **3D đọc dữ liệu từ DOM** (`.part-quick-3d` data-*) — engine không có bảng riêng; đổi nguồn dữ liệu 3D chỉ cần đổi component.
3. **Lọc "cùng nguồn" theo comment là sai**: comment 3D viết "cùng nguồn với bản 2D" nhưng thực tế hai mảng khởi tạo độc lập, đã lệch chữ (bảng §1).
4. ID trùng giữa data-part SVG và nút nhanh (chọn bộ phận đồng bộ hai chiều qua id) — giữ nguyên khi dịch.
5. Anchor/URL: trang không có anchor nội bộ; switcher/hreflang đi qua `contentRoutes` (chưa có cặp — hiện switcher trên `/giai-phau/` là hộp thoại "chưa dịch").

## 4. Thao tác và trạng thái (đối chiếu kết quả thật — xem bằng chứng §5)

| Nhóm | Thao tác/trạng thái | Chuỗi/trạng thái liên quan | Kết quả thật |
|---|---|---|---|
| Tab | bấm/ArrowLeft-Right/Home-End chọn 2D↔3D | aria-selected, tabIndex roving, panel hidden | ĐẠT (A1) |
| 2D chọn | nút nhanh / click SVG / Escape | aria-pressed, `.active`, thẻ status/polite, tooltip + Escape | ĐẠT (A1) |
| 2D tách/ghép | "Tách lớp"/"Ghép lại"/"Đặt lại" | nhãn mode, aria-pressed, viewBox nới/thu, stagger 36ms | ĐẠT (A1) |
| 3D mở | click tab → dynamic import engine + OrbitControls | aria-busy trên tab, loading progressbar, canvas aria-label | ĐẠT (A2; thời gian khung đầu biến động 4–>10s ở SwiftShader) |
| 3D chọn | nút / raycast click / Escape | aria-pressed nút, emissive highlight, thẻ chi tiết | ĐẠT (A2) |
| 3D xoay/zoom | nút ←/→/+/− ; kéo chuột | controls (damping, min/maxDistance), render-on-demand | ĐẠT (A2 — hash toàn canvas đổi sau xoay 8×/zoom/kéo; hash ổn định sau khi nhả) |
| 3D chuyển động | "Chuyển động 3D" | aria-pressed, autoRotate + bánh lắc dao động; MẶC ĐỊNH TẮT | ĐẠT bật bằng click thật; tắt bằng el.click (mô phỏng — ghi rõ) (A2) |
| 3D tách | "Tách lớp" 3D | nhãn/mode/aria-pressed + tween 400ms stagger 35ms | ĐẠT (A2, el.click) |
| Rời viewport | cuộn thật canvas ra khỏi khung | IntersectionObserver → dừng render | CHƯA KIỂM trực tiếp (CDP Frames không phản ánh ở headless — ghi chi tiết) (A2) |
| Ẩn trang | tab khác front | document.hidden trong canRun() | CHƯA KIỂM (headless không lật document.hidden) (A2) |
| Reduced motion | trước tải + đổi giữa phiên | tween→nhảy thẳng, stagger→0; 2D bỏ transition | ĐẠT (B — 39ms) |
| No-JS | tắt JS | 2D SVG tĩnh đọc được; 3D không mở; không canvas | ĐẠT (B) |
| Lỗi engine/WebGL | chặn chunk exploded3d (cô lập) | role=alert, tự về 2D, Thử lại → reload + cờ phiên | ĐẠT (B); WebGL-thiếu thật: CHƯA KIỂM (không tái hiện được môi trường không WebGL) |
| Bố cục | 320/1440 × sáng/tối | scrollWidth ≤ innerWidth | ĐẠT (boc-cuc-ket-qua.json; ảnh trong shots/) |

Bằng chứng: `thao-tac-2d-ket-qua.json` (8/8), `thao-tac-3d-ket-qua.json` (8/8 + 3 CHUA_KIEM), `moi-truong-ket-qua.json` (5/5), `boc-cuc-ket-qua.json`, `do-tai-ket-qua.json`, `kiem-link-ket-qua.json` — cùng thư mục này; stdout nguyên văn kèm theo.
