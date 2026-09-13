# G06-A chặng 1 vòng sửa 1 — Ma trận nghiệm thu dự kiến cho chặng tích hợp G06-A (bản 2, chưa thực hiện)

Mọi ca dưới đây ghi **CHƯA KIỂM**. **Bản 1 bị THAY THẾ** theo TXN-20260913-21 (sai số HTML EN; trộn điều kiện "0 chunk 3D" với "tổng byte"; thiếu hồi quy VI và viewport 768/1024; trộn reduced-motion 2D/3D). Bản này vẫn là khung dự kiến — chặng tích hợp chưa mở, chưa có ca nào được thực hiện.

## Số liệu nền (đếm lại, tách bạch)

- **HTML EN hiện có: 65 tệp** (`find dist/en -name 'index.html'`). Thêm Anatomy dự kiến **66**.
- Tách khỏi danh mục khai báo: `check-english-launch.mjs` REQUIRED_EN hiện **61 mục** (đếm bằng script; lần đếm trước đây báo 60 do regex bỏ sót mục gốc `'/en/'` — lỗi thước đo đã sửa). Danh sách route BẮT BUỘC nhỏ hơn số HTML EN thực (các route EN khác được sinh/kiểm bằng khuôn khác). Sau tích hợp: 66 HTML EN thực + REQUIRED_EN **62 mục** — **hai số này không thay thế nhau**.
- Số trang toàn site: 287 hiện có → dự kiến 288 (đếm theo build thật khi tích hợp, không chốt trước).

## Nhóm A — Nội dung

| Mã | Ca | Trạng thái |
|---|---|---|
| G6I-1 | `/en/anatomy/` tồn tại, 12 bộ phận đủ tên/mô tả EN theo bảng claim đã duyệt, không rò chữ tiếng Việt (loại tên riêng đã duyệt) | CHƯA KIỂM |
| G6I-2 | Cặp route `/giai-phau/ ↔ /en/anatomy/`: switcher hai chiều thẳng, hreflang vi/en/x-default theo khuôn `getAlternates` hiện hành, không hộp thoại "chưa dịch" trên cả hai bản | CHƯA KIỂM |
| G6I-3 | **Hồi quy cả VI**: câu VI sửa theo claim hiển thị đúng trên `/giai-phau/` (2D + 3D + hero + cột) — không chỉ kiểm EN | CHƯA KIỂM |
| G6I-4 | Claim chốt (C1–C12): không tái xuất hiện "80%", "9/10", "gần như tuyệt đối", "only diamond or another sapphire", "4 bánh răng", "12:1", "hơn 100", "30-40mm", "ngắn và dày nhất", "trái tim", "releases the balance", "open caseback" — kiểm trên cả VI lẫn EN, cả HTML tĩnh lẫn chuỗi động sau tương tác | CHƯA KIỂM |
| G6I-4b | **Hình C5 theo quyết chốt**: đường `#wev-energy` đã bỏ hoàn toàn (markup + CSS + marker `wevArrowUp` — marker chỉ bỏ nếu không còn nơi dùng); grep không còn `wev-energy`/`wevArrowUp`; `#wev-axis` và hình bộ phận giữ nguyên; khối chữ VI/EN ba vai (bộ truyền/bộ thoát/bộ điều tiết) hiện diện cạnh sơ đồ; không có sơ đồ dòng năng lượng mới; 3D không đổi hình học | CHƯA KIỂM |
| G6I-4c | **Nhãn/bảng đã chốt**: nhãn kính VI "KÍNH" / EN "CRYSTAL" (không còn "SAPPHIRE CRYSTAL"); bảng tổng kết không còn cột "Vật liệu điển hình" (cả VI/EN); vai bộ điều tiết "Điều tiết"/"Regulation", vai đóng vỏ "Đóng vỏ"/"Case closure" | CHƯA KIỂM |
| G6I-5 | Một nguồn dữ liệu: `anatomy-parts.ts` không lệch chữ với data-role SVG và nút 3D (script đối chiếu); cả hai bản render cùng nguồn | CHƯA KIỂM |
| G6I-6 | 9+1 link: mọi đích dùng đúng cặp EN (bánh lắc → `/co-che/day-toc-banh-lac` ↔ `/en/mechanisms/balance-and-hairspring/`); crystal `link: null` đúng quyết; không link giả | CHƯA KIỂM |

## Nhóm B — Trải nghiệm 2D/3D (VI và EN đều phải đạt)

| Mã | Ca | Trạng thái |
|---|---|---|
| G6I-7 | **Chuỗi EN sau TƯƠNG TÁC, không chỉ HTML tĩnh**: chọn bộ phận → thẻ chi tiết EN; reset → thẻ về mặc định EN; Escape → bỏ chọn EN; lỗi 3D → thông báo EN; Thử lại → EN sau khi mở lại | CHƯA KIỂM |
| G6I-8 | 2D: chọn (nút/SVG), tách/ghép/đặt lại — nhãn/aria đúng ngôn ngữ của trang | CHƯA KIỂM |
| G6I-9 | 3D: mở chủ động (điều kiện duyệt: **0 chunk 3D trong luồng tải trước thao tác** — `check-3d-loading-budget` mục 5 bảo vệ CẢ HAI bản), chọn, xoay/zoom/kéo, tách | CHƯA KIỂM |
| G6I-10 | aria-label canvas + điều khiển + thông báo lỗi đúng ngôn ngữ trang (cả VI lẫn EN — engine nhận `lang`) | CHƯA KIỂM |
| G6I-11 | Bàn phím: tablist roving, danh sách bộ phận, Escape — bản VI và EN | CHƯA KIỂM |
| G6I-12 | **Bố cục 4 viewport 320/768/1024/1440 × 2 theme (sáng/tối) × 2 bản (VI/EN)** = 16 tổ hợp, không tràn; ảnh chụp | CHƯA KIỂM |

## Nhóm C — Reduced-motion (tách bạch 4 phương diện)

| Mã | Ca | Trạng thái |
|---|---|---|
| G6I-13 | RM **2D** trước tải (tách tức thì, không stagger) — đã có phép thử mẫu 39ms trên VI chặng 1, tích hợp phải chạy lại cả VI/EN | CHƯA KIỂM |
| G6I-14 | RM **2D** giữa phiên (emulateMedia đổi giữa phiên, lần tách kế tiếp áp dụng) | CHƯA KIỂM |
| G6I-15 | RM **3D** trước tải (tween → nhảy thẳng vị trí đích; không tự quay) | CHƯA KIỂM |
| G6I-16 | RM **3D** giữa phiên (đổi giữa phiên, áp dụng từ thao tác kế) | CHƯA KIỂM |

## Nhóm D — Kỹ thuật và hồi quy

| Mã | Ca | Trạng thái |
|---|---|---|
| G6I-17 | `npm run check` + `npm run build` exit 0; astro check không tăng hints so baseline | CHƯA KIỂM |
| G6I-18 | Sitemap +1 URL `/en/anatomy/` (đếm tách sitemap index); tổng trang theo build thật | CHƯA KIỂM |
| G6I-19 | `check-3d-loading-budget` ĐẠT sau khi đổi điểm tìm sang component chung: cold load VI lẫn EN **0 chunk 3D trước thao tác**; mục 1/3/4/6 không bị làm yếu | CHƯA KIỂM |
| G6I-20 | `check-g01` cập nhật (logic + Explore EN bỏ nhãn cho anatomy, giữ âm `/so-sanh`) ĐẠT | CHƯA KIỂM |
| G6I-21 | `check-english-launch` 62 mục ĐẠT (số khai báo — tách khỏi 66 HTML EN) | CHƯA KIỂM |
| G6I-22 | Mutation ≥5 ca đúng luật (thiếu dịch, lệch nguồn dữ liệu, cặp route sai, câu cấm tái xuất hiện, link đích giả ở dist) | CHƯA KIỂM |
| G6I-23 | **Đo mạng lại** (cùng phương pháp đã ghi giới hạn): cold VI/EN **0 chunk 3D trước thao tác**; sau mở 3D ghi đủ bảng tài nguyên — **không đặt điều kiện "tổng byte không tăng"**; tổng HTML/CSS/JS được đo và giải thích | CHƯA KIỂM |
| G6I-24 | No-JS (VI/EN) + các ca lỗi/thử lại — EN sau tương tác | CHƯA KIỂM |

## Các ca giữ trạng thái CHƯA KIỂM — ghi đúng giới hạn phương pháp hiện tại

Không suy chỉ rằng "máy có GPU thật" mới kiểm được — giới hạn nằm ở **phương pháp đo của môi trường headless hiện tại**:

| Hạn chế | Mô tả đúng |
|---|---|
| Rời viewport (3D ngừng sinh khung) | CDP `Performance.getMetrics("Frames")` = 0 delta cả khi canvas đang vẽ liên tục (đã chứng minh vẽ liên tục bằng hash canvas đổi) → metric không phản ánh ở headless; chưa có phép thử thay thế trong bộ công cụ hiện tại |
| Ẩn trang (document.hidden) | headless không lật `document.hidden` khi tab khác front (thử thật: hidden=false) — canRun() chỉ ghi nhận từ mã |
| WebGL không khả dụng | chỉ thử được lỗi TẢI engine (chặn chunk) — chưa có phương pháp tắt WebGL trên trình duyệt kiểm hiện tại |
| Lần capture đầu sau mount | CDP captureScreenshot trả bề mặt chưa tổng hợp (hash lặp xác định) — đo idle phải ấm capture trước |
| Thời gian khung đầu 3D | biến động 4s–>10s ở SwiftShader — không dùng làm chỉ tiêu |



### RM-D — bằng chứng hiện hành (sau vòng sửa 2)

| Tệp bằng chứng | Kết quả VI/EN | Nguyên nhân |
|---|---|---|
| pw-rm3-stdout.txt (pixel giải mã) | 2 ca dat:false — khac(ghép,trung) 3,39/3,34% (~noise), khac(trung,đích) 0,00% | nền capture chưa ổn định |
| pw-rmd3-stdout.txt (CDP clip) | 2 ca CHUA_KIEM — Page.captureScreenshot Invalid parameters | lỗi CDP clip trên headless |

**GIỚI HẠN ĐƯỢC CHẤP THUẬN trong G06-A** — không kết luận lỗi sản phẩm; không chứng nhận tự dừng.

### RM-D draw-count cũ — THAY THẾ

| Ca cũ (pw-g06-rm2.js RM-D) | Kết quả cũ | Ghi chú |
|---|---|---|
| RM-D (vi) draw +9.900/200ms → +25.200/1s | ~~ĐẠT~~ | **THAY THẾ** — draw count không chứng minh tween/vị trí lớp |
| RM-D (en) draw +9.900/200ms → +25.200/1s | ~~ĐẠT~~ | **THAY THẾ** |

## Kết quả chặng 2 (TXN-20260913-27, cập nhật vòng sửa 1 TXN-20260913-30)

Đối chiếu ĐÚNG mã ca theo định nghĩa gốc. Bảng kết quả trước đây (ghi lệch G6I-7…11) đã bị THAY THẾ. Bằng chứng: `output/g06-anatomy-en-integration/` (pw-a1, pw-a2, pw-b, pw-en, pw-env-en, pw-bs-kb, pw-g06-rm3d, pw-g06-webgl, pw-bs-life2, do-tai-ket-qua.json, boc-cuc-ket-qua.jsonl, mutation-ket-qua.json, log-build-chang2-v4.txt).

| Mã | Định nghĩa đúng | Kết quả chặng 2 | Bằng chứng |
|---|---|---|---|
| G6I-1 | /en/anatomy/ tồn tại, 12 bộ phận EN, không rò tiếng Việt | ĐẠT | G6-D2 + pw-en ca 1 |
| G6I-2 | Cặp route: switcher 2 chiều, hreflang, không hộp thoại | ĐẠT | check-g01 logic + dist; pw-en menu/switcher |
| G6I-3 | Hồi quy VI: câu VI đã duyệt hiển thị đúng | ĐẠT | pw-a1 8/8 + G6-D1 |
| G6I-4 | Chuỗi cấm không tái xuất hiện (VI+EN, tĩnh + sau tương tác) | ĐẠT | G6-4 nguồn; G6-D1/D2 dist; pw-en role sau chọn |
| G6I-4b | Hình C5: bỏ #wev-energy, giữ #wev-axis + hình, khối chữ ba vai | ĐẠT | G6-4 (không wev-energy trong nguồn) + shots 3D |
| G6I-4c | Nhãn/bảng chốt: KÍNH/CRYSTAL, bỏ cột vật liệu, Điều tiết/Regulation, Đóng vỏ/Case closure | ĐẠT | G6-6 + G6-D1/D2 |
| G6I-5 | Một nguồn dữ liệu: markup khớp anatomy-parts | ĐẠT | G6-7 + G6-D1/D2 đối chiếu từng data-role |
| G6I-6 | Link đích: bánh lắc G04, crystal null, không link giả | ĐẠT | G6-2 + G6-D4 (href + data-link) |
| G6I-7 | **Chuỗi EN sau tương tác/lỗi/thử lại** (không chỉ HTML tĩnh) | ĐẠT | pw-en 10/10: chọn/reset/Escape/lỗi/Thử lại — chuỗi EN sau từng thao tác |
| G6I-8 | **2D**: chọn (nút/SVG), tách/ghép/đặt lại — nhãn/aria đúng lang | ĐẠT | pw-a1 8/8 (VI) + pw-en ca 1–3 (EN) |
| G6I-9 | **3D**: mở chủ động 0-chunk, chọn, xoay/zoom/kéo, tách | ĐẠT (VI đầy đủ) / EN: mở+chọn+tách+đặt lại ĐẠT; xoay/zoom/kéo EN CHƯA KIỂM riêng | pw-a2 (VI), pw-en (EN) |
| G6I-10 | **Nhãn trợ năng**: canvas aria + điều khiển + thông báo lỗi đúng lang | ĐẠT | pw-a2/pw-en canvas aria EN-VI + G6-D1/D2 kiemAria + pw-g06-webgl alert VI |
| G6I-11 | **Bàn phím**: tablist roving, danh sách, Escape — VI và EN | ĐẠT | pw-a1 (VI: Arrow/Enter); pw-bs-kb (EN: End/Home/Enter/Space/Escape-2D/reset-phím) |
| G6I-12 | Bố cục 4 viewport × 2 theme × 2 lang × 2 panel = 32 tổ hợp không tràn | ĐẠT | boc-cuc-ket-qua.jsonl 32/32 + shots/ 32 ảnh |
| G6I-13 | RM 2D trước tải (VI+EN) | ĐẠT | pw-b (VI 39ms) + pw-env-en (EN 4ms) |
| G6I-14 | RM 2D giữa phiên (VI+EN) | ĐẠT | pw-b + pw-env-en |
| G6I-15 | RM 3D trước tải (VI+EN): tách nhảy thẳng — ĐẠT bằng SO PIXEL GIẢI MÃ (vòng sửa 2): khung@150ms khác ghép 45,33% pixel, khung@150ms == khung@1200ms (0,00%); mode/nhãn đúng | ĐẠT | pw-rm3-stdout (rm3 VI+EN) |
| G6I-16 | RM 3D giữa phiên (chuyển động đang chạy) VI+EN — **GIỚI HẠN ĐƯỢC CHẤP THUẬN** (TXN-20260913-30): reduce giữa phiên KHÔNG tự tắt chuyển động người-dùng-bật (draw +327.680/1,5s tiếp tục) — ghi GIỚI HẠN, không chứng nhận tự dừng theo thay đổi tùy chọn | QUAN SÁT-GIỚI HẠN | pw-rm2-stdout RM-B ×2 |
| G6I-17 | Build exit 0, diagnostics = baseline | ĐẠT | log-build-chang2-v4.txt (0/0/4) |
| G6I-18 | Sitemap +1 /en/anatomy/; 288 HTML; 66 EN | ĐẠT | đếm dist + sitemap-0 |
| G6I-19 | check-3d bảo vệ cả hai route, không làm yếu | ĐẠT | log-build-chang2-v4.txt mục 2/4/5 |
| G6I-20 | check-g01 cập nhật ĐẠT | ĐẠT | trong chuỗi build |
| G6I-21 | check-english-launch 62 mục ĐẠT | ĐẠT | trong chuỗi build |
| G6I-22 | Mutation ≥5 ca đúng luật | ĐẠT | mutation-ket-qua.json 10/10 (C0 + a–f + aria rỗng ×2 + dọn) |
| G6I-23 | Đo mạng cold VI/EN 0 chunk sớm; tổng byte đo + giải thích | ĐẠT | do-tai-ket-qua.json (giới hạn font chặn ghi rõ) |
| G6I-24 | No-JS VI/EN | ĐẠT | pw-b + pw-env-en |

## Vòng đời — cập nhật vòng sửa 2 (TXN-20260913-32): đo bằng đếm lệnh vẽ WebGL (instrumentation cô lập, ghi rõ)

| Ca | Kết quả chặng 2 vòng sửa 2 | Bằng chứng |
|---|---|---|
| RM 3D trước tải VI+EN | ĐẠT — tách vẽ đúng 1 đợt (+20 draw) rồi đứng yên (+0) | pw-g06-rm2.js RM-A |
| RM 3D giữa phiên (chuyển động đang chạy) VI+EN | ĐẠT (QUAN SÁT) — reduce giữa phiên KHÔNG tự tắt chuyển động người-dùng-bật: draw tiếp tục +327.680/1,5s | pw-g06-rm2.js RM-B |
| RM 3D giữa phiên — thao tác kế (tách) | ĐẠT — vẽ cho thao tác rồi đứng yên | pw-g06-rm2.js RM-C |
| Gỡ reduce → thao tác kế có tween lại | **CHUA_KIEM — GIỚI HẠN ĐƯỢC CHẤP THUẬN** (draw-count cũ không chứng minh tween; pw-rm3 pixel: khac(trung,đích)=0% — không phân biệt được; pw-rmd3: CDP Invalid parameters) | pw-rm2 RM-D + pw-rm3 RM-D |
| Rời viewport (cuộn thật, motion bật) | ĐẠT — ngoài cuộn draw +0 (DỪNG), vào lại draw tăng (+61.440) | pw-g06-rm2.js |
| Ẩn trang (MÔ PHỎNG document.hidden + visibilitychange) | ĐẠT — khi ẩn draw +0 (DỪNG), gỡ mô phỏng → tiếp tục (+81.880). Ghi rõ: MÔ PHỎNG trong phiên, không phải chuyển tab thật | pw-g06-rm2.js |
| WebGL không khả dụng | ĐẠT (MÔ PHỎNG getContext→null): engine ném lỗi → role=alert + tự về 2D + Thử lại, không canvas | pw-g06-webgl.js |

Blocker đã gặp và xử lý: các phép thử cũ dùng hash PNG (không chứng minh số pixel) và điều kiện luôn-đúng đã bị THAY THẾ bằng đếm draw WebGL; CDP captureBeyondViewport TREO nên không dùng; 35 tiến trình chrome mồ côi làm méo phép thử trước đó — đã dọn trước khi đo.

## Kết quả chặng 2 (TXN-20260913-27) — đối chiếu từng ca với bằng chứng tích hợp

Bằng chứng chính: `output/g06-anatomy-en-integration/` (log-build-chang2-v2.txt, check-g06 13/13 trong log, mutation-ket-qua.json 8/8 gồm C0+6 mutation+dọn, pw-a1/pw-a2/pw-b/pw-en/pw-env-en stdout + JSON, boc-cuc-ket-qua.jsonl 32 dòng, shots/ 32 ảnh, do-tai-ket-qua.json).

| Ca | Kết quả chặng 2 | Bằng chứng |
|---|---|---|
| G6I-1 | ĐẠT | G6-D2 (data-role khớp EN, không rò tiếng Việt) + pw-en ca 1 |
| G6I-2 | ĐẠT | check-g01 logic 2 ca cặp giải phẫu + dist switcher/hreflang 2 chiều; G6-D3; pw-en menu/switcher |
| G6I-3 | ĐẠT | pw-a1 8/8 (VI sau sửa câu) + G6-D1 |
| G6I-4 | ĐẠT (tĩnh + sau tương tác) | G6-4 nguồn (16 chuỗi cấm); G6-D1/D2 văn bản hiển thị; pw-en các ca role sau chọn/reset |
| G6I-4b | ĐẠT | G6-4 (không còn wev-energy trong nguồn) + shots 3D (không mũi tên năng lượng) + khối chữ ba vai trong dist |
| G6I-4c | ĐẠT | G6-6 + G6-D1 (Điều tiết/Đóng vỏ, không cột vật liệu) |
| G6I-5 | ĐẠT | G6-7 (dây nối byId/p.*) + G6-D1/D2 (markup khớp dữ liệu) |
| G6I-6 | ĐẠT | G6-2 + G6-D4 (mọi href + data-link tồn tại) |
| G6I-7 | ĐẠT | pw-a1 (VI) + pw-en (EN chọn/tách/đặt lại) |
| G6I-8 | ĐẠT | pw-en 3D + G6-D6 (0 chunk sớm) + do-tai-ket-qua.json |
| G6I-9 | ĐẠT | pw-en ca 3D mở (canvas aria EN) + aria nút điều khiển EN trong dist |
| G6I-10 | ĐẠT (VI đầy đủ; EN: Escape + click; Enter trên danh sách EN chưa thử riêng — ghi rõ) | pw-a1 kb1-kb3; pw-en Escape/thẻ |
| G6I-11 | ĐẠT | pw-a1 Arrow/Enter + pw-en Escape |
| G6I-12 | ĐẠT | boc-cuc-ket-qua.jsonl 32/32 tổ hợp (16 × 2 panel) không tràn; shots/ 32 ảnh, đã tự xem mẫu |
| G6I-13 | ĐẠT | pw-b (RM 2D VI trước tải, 39ms chặng 1 + chạy lại chặng 2 5/5); pw-env-en (RM 2D EN 4ms) |
| G6I-14 | ĐẠT | pw-b (RM 2D giữa phiên VI) + pw-env-en (EN giữa phiên) |
| G6I-15 | ĐẠT | pw-env-en (RM 3D trước tải: tách 0ms; motion chủ động vẫn chạy — thiết kế ghi rõ) |
| G6I-16 | CHƯA KIỂM | RM 3D giữa phiên (đổi reduce giữa phiên khi 3D đang chạy) chưa thử — nằm ngoài các kịch bản đã chạy |
| G6I-17 | ĐẠT | log-build-chang2-v2.txt exit 0, 0/0/4 hints |
| G6I-18 | ĐẠT | 288 HTML, 66 EN, sitemap-0 287 URL (đếm tách index) |
| G6I-19 | ĐẠT | log-build-chang2-v2.txt: mục 2 quét AnatomyExperience + mục 4/5 bảo vệ VI và EN |
| G6I-20 | ĐẠT | check-g01 trong chuỗi build ĐẠT (logic + dist mới) |
| G6I-21 | ĐẠT | REQUIRED_EN 62 mục; check-english-launch ĐẠT trong chuỗi |
| G6I-22 | ĐẠT | mutation-ket-qua.json 8/8 (C0 + a–f + dọn) |
| G6I-23 | ĐẠT | do-tai-ket-qua.json: cold VI/EN 0 chunk 3D; sau mở +2 chunk; tổng HTML/CSS/JS đo và giải thích (giới hạn font chặn ghi rõ) |
| G6I-24 | ĐẠT | pw-b no-JS VI + pw-env-en no-JS EN |
| — | CHƯA KIỂM (giữ từ chặng 1) | rời viewport/ẩn trang/WebGL-thiếu: giới hạn phương pháp headless; RM 3D giữa phiên (G6I-16) |
