# G05-A — Danh sách hình/tài sản và khối lượng để anh Vinh quyết

- Giao dịch TXN-20260913-01, nền `2f322dc`. Đối tượng của cổng duyệt: số chương, storyboard, khối lượng. Mục này trả lời câu "thêm bao nhiêu hình, dịch bao nhiêu chữ".

## 1. Giữ tài sản hiện có (không tạo mới, không sửa)

| Tài sản | Số lượng | Trạng thái kiểm hiện tại |
|---|---|---|
| SVG minh họa mốc `public/images/timeline/{slug}.svg` | 28/28 (mỗi mốc đúng 1 tệp, không mốc nào rơi vào fallback plate) | Chưa có hồ sơ kiểm lịch sử từng hình — G02 chỉ chuẩn hóa dữ liệu và nguồn, không kiểm hình. G05-A không mặc nhiên coi chúng chính xác lịch sử; alt khi dịch phải mô tả trung tính ("minh họa cho mốc này" / "illustration for this milestone"), không suy chi tiết hiện vật từ hình |
| Trang `/lich-su/` VI (bố cục, lọc 3 lớp, nav thập niên, reveal, ghi chú cuối) | 1 trang | Đang được `check-g02-history-timeline.mjs` giữ 16 ca (8 JSON + 8 dist) — đạt tại `2f322dc` |
| 52 nguồn HTTPS + 19 khối "Giới hạn" + 3 nhãn "Chưa có bài đọc thêm" | nguyên trạng | Được G2-8, G2-8b, G2-9 giữ |
| Dải "Dòng chảy lịch sử" 6 mốc trên trang chủ VI (`src/pages/index.astro`, mục 5) | 1 dải | Hiện hành; link về `/lich-su` |

## 2. Tái dùng tài sản G04

| Tài sản | Cách dùng trong G05 | Vì sao không hơn thế |
|---|---|---|
| Bài chương mẫu `/co-che/day-toc-banh-lac/` + `/en/mechanisms/balance-and-hairspring/` | Dẫn bằng `readMore` của mốc 1 (huygens-hairspring) — đã có trong timeline.json, VI lẫn EN đều trỏ đúng bản ngôn ngữ | Đường đọc đúng khuôn hiện hành |
| Ảnh AI hero `public/images/history/balance-hairspring/banh-lac-day-toc-hero.jpg` (87.456 B, 1200×675) | KHÔNG dùng lại ở trang lịch sử | Ảnh gắn với chương G04 và chú thích AI riêng của nó; tái dùng nơi khác phải kèm đúng nhãn "Minh họa AI tái dựng — không phải ảnh tư liệu" và bối cảnh mới — chưa có nhu cầu nội dung thật |
| Component `BalanceHairspringChapter.astro` | KHÔNG nhúng vào timeline | Nhân bản điều khiển + `aria-live` + 87 KB trong trang dài 28 mốc; chi phí tải và độ phức tạp bàn phím không tương xứng (chi tiết ở storyboard mục 1, C1). Muốn nhúng = quyết định riêng của anh Vinh, tính ngân sách lại |

## 3. Hình mới đề xuất

**Khuyến nghị: 0 ảnh AI mới, 0 SVG mới, 0 hoạt ảnh mới cho G05-B.**

- Đề mục 6 chương dùng typography + chấm màu lớp hiện hành — không phải nội dung mới, không cần hình.
- Trang đã có 28 hình minh họa; thêm hình làm nặng trang dài mà không tăng hiểu biết nguồn nào.
- Đây không phải phương án "tạo sau tùy ý": là con số 0 có chủ ý, khớp "không ép tạo 28 ảnh hoặc tỷ lệ 10 AI/18 SVG".

**Danh mục tùy chọn CHỈ nếu anh Vinh muốn** (ngoài khuyến nghị; mỗi mục có đủ thông tin để quyết):

| # | Tài sản | Mục đích học | Nguồn cần có | Nguy cơ sai | Nhãn tái dựng | Alt dự thảo | Kích thước + ngân sách | Fallback |
|---|---|---|---|---|---|---|---|---|
| T1 | 1 ảnh bối cảnh AI cho phần mở trang lịch sử (bàn chế tác chung, không hiện vật nhận diện) | Định vị cảm xúc trước khi vào 28 mốc | Prompt riêng phải qua cổng duyệt G05-Abis; không dùng làm bằng chứng | Sai chi tiết lịch sử nếu vẽ hiện vật/công cụ cụ thể | "Minh họa AI tái dựng — không phải ảnh tư liệu" / "AI reconstruction — not a historical photograph" | VI: "Bàn chế tác đồng hồ cổ với dụng cụ mờ trong ánh sáng ấm — minh họa AI tái dựng"; EN: "A vintage watchmaker's bench with softly blurred tools in warm light — AI reconstruction" | 1200×675, ≤150 KB JPEG q84 (khuôn G04) | Ẩn img, hiện khối nền brass gradient có sẵn trong khung |
| T2 | Kiểm + vẽ lại SVG sai (nếu phát hiện) | Tránh minh họa mâu thuẫn dữ kiện đã chuẩn hóa | Cần hồ sơ nguồn riêng từng SVG | Tự ý sửa không hồ sơ = lặp đúng sai lầm cũ | Không áp dụng (SVG vẽ lại phải là minh họa trung tính) | Theo từng hình khi có | Xác định sau khi có hồ sơ | Plate của WatchImage |

Tổng số hình mới khuyến nghị: **0**. Với T1: +1 ảnh AI. Với T2: chưa xác định, chỉ mở khi có hồ sơ. Phương án giảm khối lượng: dùng đúng 28 SVG hiện có, không thêm gì — khuyến nghị chính.

## 4. Khối lượng dịch (ước lượng từ dữ liệu thật, đã đếm script)

Đơn vị đếm: **token tách theo khoảng trắng (whitespace-separated tokens) của văn bản VI** — con số dùng để so khối lượng giữa các khối và ước lượng nhân công; KHÔNG phải số từ EN đã đo. Lượng EN chỉ là ước lượng theo **giả định dự phòng** (bảng dưới) — giả định chưa hiệu chuẩn, không phải tỷ lệ dịch đã xác minh.

Để dịch 28 mốc + trang sang EN trong G05-B:

| Khối | Đơn vị VI (tách khoảng trắng) | Ghi chú |
|---|---|---|
| `description` 28 mốc | 1.231 (TB ~44/mốc) | Khối chính |
| `title` 28 mốc | 204 | |
| `limit` (19 mốc) | 492 | Bắt buộc dịch — "không mất thông tin so với G02" áp cả khối Giới hạn |
| `claimScope` (28 mốc) | 142 | |
| `dayType` (28 mốc) | 131 | Từ loại ngày (đặt hàng, cấp bằng...) |
| `timeLabel` | 1 nhãn | VI giữ "2013–nay", EN dùng "2013–present" — chỉ mốc silicon-revival có chữ; các nhãn khác là số/năm (`~1510`, `1657–1675`, `1914–1918`) giữ nguyên, bảo toàn ngày và ý nghĩa |
| Alt ảnh (28 mốc) | ~372 (dự kiến) | Chưa có alt thật — ước lượng theo khuôn "title — minh họa cho mốc này"; đo lại khi viết alt |
| `sources[].name` — phần mô tả tiếng Việt | ~8 | Đúng 4/52 name có phần tiếng Việt cần dịch ở bản EN: blancpain "(thông cáo hãng)", patek-first-wristwatch "(mục Bracelets)", fifty-fathoms "số 13", patek-nautilus "Thông cáo 40 năm Nautilus". Giữ nguyên URL, tên riêng (Blancpain, Patek Philippe, Lettres du Brassus...) và ngày kiểm nguồn; không tự ghi ngày kiểm mới |
| `sources[].proves` | 0 — không dịch | `proves` là **hồ sơ nguồn** (ghi nguồn chứng minh điều gì), KHÔNG phải nội dung hiển thị: `lich-su.astro` chỉ render name/url/checked, không render proves. G05-B giữ nguyên proves, không mở UI mới cho nó; nếu tương lai hiển thị thì dịch khi đó, ra quyết định riêng |
| Đoạn dẫn trang (dưới h1) | 53 | Đoạn "Dòng chảy thời gian từ cỗ máy bỏ túi Nuremberg..." hiện hành |
| Ghi chú cuối trang | 44 | Khối "Ghi chú của nhà sưu tầm" hiện hành |
| Lớp 6 chương: đề mục + câu hỏi + câu giới hạn | ~300 (VI viết sẵn ở storyboard) | VI giữ nguyên, EN mới dịch |
| Nhãn UI trang + trạng thái | ~85 | Lọc lớp, "Tất cả", "N mốc", "Điều hướng", 6 nhãn mức chứng minh, "Đọc chi tiết →", "Chưa có bài đọc thêm cho mốc này", nhãn mới "bài chưa có bản tiếng Anh", chữ "Nguồn:"/"Kiểm"; một số nhãn đã có trong `ui.ts` — tái dùng nếu trùng khớp |
| **Tổng khối lượng VI ước tính** | **≈ 3.060 đơn vị** | Gồm 2.200 đơn vị đo trực tiếp từ 5 trường dữ liệu (description 1.231 + title 204 + limit 492 + claimScope 142 + dayType 131) + ~372 alt dự kiến (= 2.572 trường mốc) + 53 đoạn dẫn + 44 ghi chú cuối (đo trực tiếp) + ~300 chương + ~85 nhãn + ~8 tên nguồn + 1 timeLabel (còn ước lượng) |
| **Ước lượng EN** | **≈ 3.400–4.000 từ** | Cơ sở: **giả định dự phòng** hệ số token EN/VI 1,1–1,3 để lập kế hoạch — chưa hiệu chuẩn, không phải tỷ lệ dịch đã xác minh. Khoảng 3.400–4.000 từ chỉ là ước lượng theo giả định đó, **không phải chỉ tiêu phải viết đủ**; số EN thật chỉ có sau khi dịch và đếm |

Ngoài ra: 3 mốc chưa có bài đọc thêm (peter-henlein, trench-watch, swatch-1983) và 13 mốc có bài VI chưa có EN — bản EN của trang phải hiển thị trạng thái rõ (khuôn "chưa có bài đọc thêm" hiện hành mở rộng thành hai mức: "chưa có bài" và "chưa có bản tiếng Anh"), không tạo URL giả (luật G01 hiện hành).

## 5. Những quyết định anh Vinh cần chốt ở cổng này

1. Số chương: **6** như khung (hay điều chỉnh ranh giới/tiêu đề theo đề xuất khác nếu GPT Work thẩm định có căn cứ).
2. Cấu trúc: **1 trang 6 section** (khuyến nghị) hay 6 trang riêng.
3. Hình mới: **0** (khuyến nghị) hay duyệt T1 (1 ảnh AI mở trang); T2 chỉ mở khi có hồ sơ nguồn riêng.
4. Tên route EN: `/en/history/` (khuyến nghị theo quy ước thư mục EN hiện hành).
5. Khối lượng: **≈ 3.060 đơn vị VI ước tính** (tách khoảng trắng; gồm timeLabel, 4 name nguồn, đoạn dẫn, ghi chú cuối) — ước lượng **≈ 3.400–4.000 từ EN** theo giả định dự phòng chưa hiệu chuẩn (không phải chỉ tiêu phải viết đủ); duyệt để G05-B ước lượng 1–2 chặng tích hợp.
