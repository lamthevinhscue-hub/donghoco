# Biên bản C1 — Công cụ "Nhật ký sai số"

- Giao dịch: TXN-20260926-265 (danh mục DHC-GD3-20260925 v1.0.0); vòng sửa hẹp cuối TXN-20260926-262 không phát sinh gì thêm cho C1
- Ngày thực hiện: 27/09/2026
- Nền đầu phiên: HEAD = origin/main = `fe56cf96237248510e30500a74d85ca4d7a95d65` (`feat(iconic): add three model evolution timelines`), staged = 0, tracked sửa 0

## 1. Tệp đã sửa / tạo

| Tệp | Thay đổi |
| --- | --- |
| `src/i18n/contentRoutes.ts` | Thêm cặp `{ vi: '/nhat-ky-sai-so', en: '/en/accuracy-log/' }` vào STATIC_PAIRS (comment C1) |
| `src/components/AccuracyLog.astro` | Mới — toàn bộ công cụ: giao diện + logic client + style cục bộ |
| `src/i18n/ui.ts` | Thêm nhóm khóa `acc_*` (~47 khóa) vào cả khối vi và en |
| `src/pages/nhat-ky-sai-so/index.astro` | Mới — wrapper VI |
| `src/pages/en/accuracy-log/index.astro` | Mới — wrapper EN |
| `src/content/huongDan/vi/do-sai-so.md` | Thêm mục "Ghi lại quan sát của bạn ở đâu?" + link `/nhat-ky-sai-so` |
| `src/content/huongDan/en/accuracy-tracking.md` | Thêm mục "Where to keep your observations" + link `/en/accuracy-log/` |
| `scripts/check-c1-accuracy-log.mjs` | Mới — checker 2 chế độ source / source+dist, env `C1_ROOT` |
| `package.json` | Nối checker C1 vào cuối `npm run check` (source) và cuối `npm run build` (source + dist) |
| `docs/nghiem-thu/C1-nhat-ky-sai-so-2026-09-27.md` | Biên bản này |
| `output/c1-accuracy-log-audit/` | Bằng chứng nội bộ — không phát hành |

Không đụng: schema content, dữ liệu bài khác, route hiện hữu, dependency, ảnh, CSP, analytics, backend, token giao diện toàn cục, `ModelEvolution.astro` hay bất kỳ tệp ngoài danh sách trên.

## 2. Quyết định dữ liệu (localStorage)

- Khóa: `c1-accuracy-log-v1`; cấu trúc `{ version: 1, watches: [{id, name}], records: [{id, watchId, date, seconds, note}] }`
- `id` sinh từ `Date.now()` + chuỗi ngẫu nhiên; ghi/ngày có thể nhiều bản ghi (không ép 1/ngày)
- Mọi ghi/xóa qua `localStorage.setItem` bọc try/catch; lỗi ghi hiển thị gợi ý sao lưu CSV
- Xóa đồng hồ: `window.confirm` nêu rõ tên + số bản ghi liên quan sẽ xóa; xóa xong chuyển về đồng hồ đầu còn lại

## 3. Cấu trúc CSV

- Header ổn định: `watch_id,watch_name,date,offset_seconds,note`; UTF-8 với BOM; tệp `nhat-ky-sai-so.csv` / `accuracy-log.csv`
- Xuất: toàn bộ bản ghi mọi đồng hồ; field có dấu phẩy/ngoặc/xuống dòng được bọc ngoặc kép, `"` lặp đôi
- Nhập: đọc `FileReader` cục bộ; bỏ BOM; header được map theo tên cột (thiếu cột bắt buộc → báo lỗi cấu trúc, không nhập); ngày phải khớp `YYYY-MM-DD` và là ngày thật (kiểm round-trip); độ lệch phải khớp số thập phân có dấu; dòng không hợp lệ bị bỏ và liệt kê "Dòng n: lý do"; dòng trùng khớp hoàn toàn bị bỏ; đồng hồ mới theo tên được tạo tự động và báo trong kết quả
- Nhập là **chỉ-thêm (hợp nhất)**: có `window.confirm` nêu số bản ghi sẽ thêm/số dòng bỏ; dữ liệu hiện có không bị xóa hay ghi đè; nội dung tệp chỉ được parse như dữ liệu (không eval, không innerHTML — render bằng `createElement`/`textContent`)
- **Parser quote-aware toàn văn** (`parseCsvVanBan`): dấu phẩy, nháy kép lặp và xuống dòng bên trong trường bọc nháy là nội dung trường; ngoặc chưa đóng đến cuối văn bản → cờ `biHong` → báo lỗi cấu trúc và bỏ toàn bộ, không nhập gì
- **Nguyên tử**: bước đọc/kiểm/chuẩn bị không đụng `store`, DOM hay localStorage; đồng hồ mới ghi vào danh sách tạm `watchesMoi`; chỉ sau xác nhận, trong vùng đánh dấu `BẮT ĐẦU GHI` → `KẾT THÚC GHI`, mới push store + lưu + render; bấm Hủy → dữ liệu và giao diện giữ nguyên tuyệt đối (checker C1-4 quét mọi `store.*.push` trong handler import phải nằm sau marker; mutation M-H chứng minh)

## 4. Giới hạn không-chẩn-đoán

- Chỉ dùng ngôn ngữ "ghi nhận / quan sát / so với mốc tham chiếu"; biểu đồ SVG là minh họa các điểm đã ghi (trục ngày + độ lệch, có đường 0) — không ngưỡng màu, không vùng đánh giá, không nhãn "tốt/xấu"
- Chuỗi cấm (VI: chẩn đoán, hỏng, bình thường, bất thường, cần sửa, chuẩn ngành, tự điều chỉnh, nguyên nhân; EN: diagnos*, broken, faulty, abnormal, malfunction*, repair, industry standard, self-adjust) được checker C1-5 quét trên component + 2 trang + các dòng khóa `acc_*`, và C1-6 quét tiếp phần text dist của 2 route — sạch
- Hai bài hướng dẫn (nơi gắn lối vào) giữ nguyên giọng "ghi nhận, không chẩn đoán"; đoạn thêm tránh mọi cụm thuộc danh sách cấm của checker cụm (không "ứng dụng", không "bình thường", không "24 giờ", không "± số"…)

## 5. Kết quả kiểm bắt buộc

| Kiểm | Kết quả |
| --- | --- |
| `npm run check:types` | 455 tệp — 0 errors / 0 warnings / **4 hints baseline** (hint thừa `out` trong script đo trình duyệt nội bộ đã phát hiện và gỡ trong phiên) |
| `npm run check` (chứa C1 source) | exit 0 |
| `npm run build` (chứa C1 source + dist cuối chuỗi) | exit 0 |
| `node scripts/check-c1-accuracy-log.mjs` | exit 0 — C1-1..C1-5 ĐẠT |
| `node scripts/check-c1-accuracy-log.mjs dist` | exit 0 — thêm C1-6: 2 route, 1 H1 mỗi trang, khối thông báo, UI khởi tạo, bảng 4 cột + nhãn, vùng biểu đồ, canonical/hreflang/switcher hai chiều, lối vào từ bài hướng dẫn, mọi link nội bộ trỏ route thật, sạch chuỗi cấm trên dist |
| `node scripts/scan-chars.mjs` | OK — 444 tệp |
| `git diff --check` + `git diff --cached --check` | sạch |

Số đo build (tái đo vòng sửa CSV): sitemap 339 URL; 339 tệp `index.html` trong dist; Astro build báo **340 trang sinh ra** — gồm một trang không nằm sitemap (404). Đối chiếu baseline I4: sitemap 337 → 339, tăng đúng 2 route C1 (`/nhat-ky-sai-so/`, `/en/accuracy-log/`). Lỗi TS gặp trong phiên và đã sửa: `SVGSVGElement` không có `hidden` trong lib — chuyển sang `setAttribute/removeAttribute('hidden')`; helper `$` nới constraint về `Element` + `as unknown as T`.

## 6. Kiểm trình duyệt (playwright-cli, astro preview localhost:4325 — log `kiem-trinh-duyet.log.txt`)

| Ca | Kết quả |
| --- | --- |
| TC1 VI desktop | H1 đúng; công cụ hiện sau khi JS chạy; thông báo no-JS được script gỡ; tạo 2 đồng hồ (2 option); thêm 2 bản ghi → bảng 2 hàng + SVG 2 điểm; Edit nạp đúng giá trị + nút "Lưu"; sửa 4.5 → bảng "+5.5"; xóa có confirm còn 1 hàng; đổi đồng hồ sang "Olympus"; không tải lại trang (cờ `window.__C1` giữ nguyên) |
| TC2 EN + CSV | H1 "Accuracy log"; canonical/hreflang/link guide đúng; export tạo download `accuracy-log.csv` và tệp lưu được; nhập lại tệp vừa xuất → "Added 0; 3 duplicates" (chỉ-thêm nhận diện trùng, dữ liệu nguyên); nhập CSV mới → "Added 2 entries", select lên 4 đồng hồ |
| TC3 bàn phím + 390 + dark | 12 Tab tới ô tên (focus trong công cụ); Enter kích hoạt; thêm/xóa qua bàn phím cập nhật; 390 px tràn ngang 0, 7 nút hiển thị; dark: nền rgb(17,21,25), H1 rgb(238,240,237), tràn 0 |
| TC4 no-JS (CDP) | VI + EN: tool ẩn cả attribute lẫn thực tế (không khung hỏng); `.acc-nojs` hiện; khối local-only hiện; link guide có; tràn ngang 0 |

## 7. Mutation ngoài cây (bản sao `%TEMP%\c1-sandbox-*` — log `kiem-c1-mutation-vs1.log.txt`, cập nhật vòng sửa CSV)

8 ca, đều FAIL đúng rule kỳ vọng, hoàn nguyên byte-đối-byte hash khớp, chạy sạch cuối trong sandbox exit 0:

| Ca | Phép đột biến | Kết quả checker |
| --- | --- | --- |
| M1 | Gỡ cặp route khỏi contentRoutes | C1-1 FAIL |
| M2 | Bỏ khóa `acc_notice_local` (vi) | C1-3 FAIL: "vi.acc_notice_local" thiếu |
| M3 | Chèn "…bình thường hay cần sửa" vào component | C1-5 FAIL: 2 chuỗi cấm |
| M4 | Phá CSV validation (xóa `isValidDate` + `RE_DATE` + `RE_NUM`) | C1-4 FAIL: thiếu kiểm định dạng ngày |
| M5 | Bỏ bảng HTML (`<table id="acc-table">…`) | C1-4 FAIL: thiếu bảng + nhãn cột |
| M6 | Chèn `fetch('https://…')` vào script | C1-4 FAIL: Script có dấu hiệu mạng |
| M-H | Đưa `store.watches.push({…})` trở lại TRƯỚC bước confirm trong handler import | C1-4 FAIL: "Lệnh ghi store.watches.push chạy trước xác nhận trong handler import — nhập không nguyên tử" |
| M-I | Phá parser (đổi tên `parseCsvVanBan` — mất quote-aware toàn văn) | C1-4 FAIL: "Thiếu parser CSV toàn văn quote-aware (parseCsvVanBan/biHong)" |

Sandbox đã xóa sạch. Checker tinh chỉnh trong phiên: kiểm mạng/thư viện áp lên khối `<script>` (comment header liệt kê tên API cấm là tài liệu — pattern toàn văn sẽ tự khớp), C1-3 kiểm từng khóa ở cả hai khối vi/en (mutation M2 ban đầu không bị bắt khi chỉ kiểm includes toàn file), C1-6 dist đếm `<th scope="col">` thay vì tra key.

## 8. Trạng thái Git cuối phiên

- HEAD = origin/main = `fe56cf96237248510e30500a74d85ca4d7a95d65` — chưa commit, chưa push, staged = 0
- Tracked sửa 5: `package.json`, `src/i18n/contentRoutes.ts`, `src/i18n/ui.ts`, `src/content/huongDan/vi/do-sai-so.md`, `src/content/huongDan/en/accuracy-tracking.md`
- Tạo mới: `src/components/AccuracyLog.astro`, `src/pages/nhat-ky-sai-so/index.astro`, `src/pages/en/accuracy-log/index.astro`, `scripts/check-c1-accuracy-log.mjs`, biên bản này, `output/c1-accuracy-log-audit/`
- Untracked có trước giữ nguyên; `output/` không thuộc phạm vi phát hành

Điểm chưa giải quyết: không có.
