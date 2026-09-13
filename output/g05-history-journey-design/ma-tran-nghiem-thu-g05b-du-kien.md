# G05-A — Ma trận nghiệm thu G05-B dự kiến (kế hoạch kiểm — KHÔNG phải kết quả)

- Giao dịch TXN-20260913-01, nền `2f322dc`. Tất cả trạng thái dưới đây là **CHƯA KIỂM** — đây là kế hoạch kiểm G05-B sẽ thực thi khi được mở. Cột "Cách đo" ghi rõ bằng chứng sẽ thu; không ca nào được ghi ĐẠT trước khi chạy thật.

## M1 — 28/28 mốc không mất dữ kiện/nguồn/giới hạn so với G02

| Ca | Cách đo | Trạng thái |
|---|---|---|
| M1-1 JSON VI giữ nguyên 28 mốc, 52 nguồn, 19 giới hạn, 3 readMore null | Script đối chiếu `timeline.json` trước/sau G05-B (hash phần VI) + chạy `npm run check` (G2-1…G2-13) | CHƯA KIỂM |
| M1-2 Bản EN đủ trường dịch: 28 title/description/claimScope/dayType/alt, 19 limit, `timeLabel_en` cho mốc silicon-revival ("2013–present"), `name_en` cho 4 name có phần tiếng Việt | Script đếm trường `*_en` không rỗng theo đúng mốc; đối chiếu danh sách 4 name với detector ký tự tiếng Việt | CHƯA KIỂM |
| M1-3 Dist VI và EN mỗi trang 28 card, 52 nguồn, 19 khối Giới hạn/Limit | Grep `dist/lich-su/index.html` + `dist/en/history/index.html` | CHƯA KIỂM |
| M1-4 Nhãn ngày loại, mức chứng minh + phạm vi, xấp xỉ/khoảng năm hiển thị cả hai bản; timeLabel theo ngôn ngữ | Grep `~1510`, `1657–1675`, `1914–1918` ở dist hai bản; VI có `2013–nay`, EN có `2013–present` (cùng mốc silicon-revival, bảo toàn ý nghĩa) + 6 nhãn claim trong dist hai bản | CHƯA KIỂM |

## M2 — VI/EN đầy đủ nhãn, điều khiển, alt và trạng thái chưa dịch

| Ca | Cách đo | Trạng thái |
|---|---|---|
| M2-1 Trang EN không rò chữ Việt (trừ tên riêng được duyệt) | Script rò ký hiệu tiếng Việt trong `dist/en/history/` theo khuôn G4-7 | CHƯA KIỂM |
| M2-2 Trang VI không rò nhãn EN mới | Rò ngược theo khuôn hiện hành | CHƯA KIỂM |
| M2-3 Alt ảnh 28 mốc có ở cả hai bản, mô tả trung tính | Grep `alt=` trong dist hai bản, đối chiếu `alt_en` | CHƯA KIỂM |
| M2-4 Trạng thái đọc tiếp đúng số: EN trang — 12 mốc link EN, 13 mốc "chưa có bản tiếng Anh", 3 mốc "chưa có bài" | Script đếm 3 trạng thái theo bảng ánh xạ G05-A | CHƯA KIỂM |
| M2-5 Link đọc tiếp nội bộ không hỏng trên dist (25 route VI + 12 route EN tương ứng) | Bộ kiểm liên kết hiện hành trên dist: `npm run check` (check-links) sau build — lưu ý bộ này chỉ kiểm href nội bộ, bỏ qua href bắt đầu http/https (scripts/check-links.mjs:47) | CHƯA KIỂM |
| M2-6 Tên nguồn bản EN: 4 name có phần tiếng Việt được dịch phần mô tả, giữ nguyên URL/tên riêng/ngày kiểm; `proves` không xuất hiện thêm trong UI (giữ hồ sơ nguồn như hiện hành) | Grep dist EN theo 4 name + đếm phần tử render nguồn | CHƯA KIỂM |
| M2-7 52 lần dẫn nguồn ngoài: bảo toàn so với G02 (URL, nhãn, ngày kiểm nguyên trạng); nếu G05-B kiểm truy cập trực tiếp: ghi thời điểm, URL cuối, trạng thái thật — 403/timeout là giới hạn truy cập, không tự kết luận nguồn hỏng; không bắt buộc tái nghiên cứu nội dung | Đối chiếu `timeline.json` sources[] với hồ sơ G02 (52/52 khớp trường); nếu truy cập: log từng URL kèm thời điểm + URL cuối + mã trạng thái thật | CHƯA KIỂM |

## M3 — Anchor, filter, nhảy mốc, đổi ngôn ngữ, điều hướng trang chủ

| Ca | Cách đo | Trạng thái |
|---|---|---|
| M3-1 28 anchor `#milestone-0…27` còn hiệu lực sau khi chèn 6 section | playwright-cli: `location.hash` + vị trí cuộn từng anchor trên dist preview | CHƯA KIỂM |
| M3-2 Lọc 3 lớp + "Tất cả" + đếm "N / 28" nguyên trạng | playwright-cli bấm từng nút, đếm card hiển thị | CHƯA KIỂM |
| M3-3 Nav chương (6 nút) desktop + panel mobile nhảy đúng đề mục, đúng `scroll-margin-top`; hiển thị "k/N" số mốc đang hiển thị trong chương theo đề nghị (khi lọc ẩn bớt) | playwright-cli bấm + đo `scrollY` đối chiếu vị trí h2; bật lọc 1 lớp rồi đọc nhãn nút | CHƯA KIỂM |
| M3-4 Switcher VI↔EN trên trang lịch sử hai chiều đúng route, giữ hash theo hành vi đề nghị (anchor là ID chung hai ngôn ngữ); hash trỏ ID không tồn tại ở bản đích → về đầu trang | playwright-cli click switcher 2 chiều từ `#milestone-12` và từ `#chuong-c3`; kiểm `location.pathname` + `location.hash` + vị trí cuộn | CHƯA KIỂM |
| M3-5 Lối vào lịch sử: trang chủ VI giữ dải hiện hành trỏ đúng; trang chủ EN có lối mới trỏ `/en/history/` | playwright-cli click từ hai trang chủ | CHƯA KIỂM |

## M4 — Viewport và theme: 320 / 375 / 768 / 1024 / 1440 px × sáng/tối

| Ca | Cách đo | Trạng thái |
|---|---|---|
| M4-1 Không tràn ngang, đề mục chương + câu giới hạn bọc đúng ở 320/375 | playwright-cli set viewport, đo `scrollWidth ≤ clientWidth`, chụp ảnh | CHƯA KIỂM |
| M4-2 Bố cục so le desktop giữ nguyên ở 768/1024/1440; nav chương hiển thị đúng breakpoint | Chụp ảnh 5 bề rộng × 2 theme, xem ảnh | CHƯA KIỂM |
| M4-3 Tương phản đề mục/câu giới hạn chương đạt cả hai theme | Đo màu tính toán theo khuôn G04 | CHƯA KIỂM |

## M5 — Bàn phím, no-JS, ảnh lỗi, reduced-motion, chuyển động ngoài tầm nhìn

| Ca | Cách đo | Trạng thái |
|---|---|---|
| M5-1 Duyệt tab toàn trang (chip chương → 28 thẻ → nguồn → đọc tiếp) theo thứ tự DOM | playwright-cli Tab tuần tự, ghi thứ tự focus | CHƯA KIỂM |
| M5-2 No-JS: nội dung 28 mốc + 6 chương đọc được đầy đủ | playwright-cli `javaScriptEnabled: false`, đối chiếu text | CHƯA KIỂM |
| M5-3 Ảnh lỗi: SVG hỏng → plate fallback hiện đúng (khuôn WatchImage hiện hành) | Route abort 1 ảnh, chụp | CHƯA KIỂM |
| M5-4 Reduced-motion: reveal tắt đúng (nội dung hiện ngay) | `emulateMedia({ reducedMotion: 'reduce' })` | CHƯA KIỂM |
| M5-5 Không có chuyển động mới nào được thêm (đối chiếu diff: chỉ section tĩnh) | Đọc diff + grep animation mới | CHƯA KIỂM |

## M6 — Đo tải trước/sau cùng điều kiện

| Ca | Cách đo | Trạng thái |
|---|---|---|
| M6-1 Byte đĩa: `dist/lich-su/index.html` + `dist/en/history/index.html` + asset mới (nếu duyệt T1) | `ls -l`/stat sau build | CHƯA KIỂM |
| M6-2 Byte mạng: đếm request + thân response giải mã qua trình duyệt cache sạch, cùng điều kiện trước/sau (khuôn đo mạng G04: worktree nền + bản sửa, phân biệt content-length với byte giải mã, null không coi là 0) | playwright-cli + server preview hai bản | CHƯA KIỂM |
| M6-3 Không phát sinh JS/CSS mới ngoài phần chương (nếu có phải ghi số) | So sánh manifest asset trước/sau | CHƯA KIỂM |

## M7 — Bộ kiểm và quy trình

| Ca | Cách đo | Trạng thái |
|---|---|---|
| M7-1 `npm run check` + `npm run build` exit 0 sau G05-B, không hint mới | Chạy toàn chuỗi, log lưu output | CHƯA KIỂM |
| M7-2 check-g01: các ca đảo trạng thái `/lich-su` cập nhật đúng và đạt | Chạy script, log | CHƯA KIỂM |
| M7-3 check-g02: 16 ca cũ đạt + ca dist EN mới đạt | Chạy script, log | CHƯA KIỂM |
| M7-4 Sitemap đủ `/lich-su/` + `/en/history/`, đếm URL tăng đúng +1 | Grep sitemap (tách index sitemap con) | CHƯA KIỂM |

## Quy tắc khi G05-B chạy

1. Mỗi ca chuyển CHƯA KIỂM → ĐẠT/THẤT BẠI kèm log/ảnh/JSON thật trong `output/`; ca không chạy được ghi rõ lý do, không bỏ trống im lặng.
2. Không tham chiếu bằng chứng không tồn tại; mô tả đúng thao tác thật (ví dụ mô phỏng sự kiện thì ghi "mô phỏng").
3. M1/M2 là điều kiện bắt buộc trước khi báo nghiệm thu; M6 phải phân biệt byte đĩa và byte mạng.
4. Kiểm liên kết nội bộ (check-links trên dist) không được gọi là kiểm HTTP của 52 nguồn ngoài; kiểm truy cập nguồn ngoài (nếu làm) phải ghi thời điểm, URL cuối, trạng thái thật — 403/timeout là giới hạn truy cập, không tự kết luận nguồn hỏng.
