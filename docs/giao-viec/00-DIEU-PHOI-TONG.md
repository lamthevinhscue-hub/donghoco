# ĐIỀU PHỐI TỔNG — Kế hoạch hoàn thiện kienthucdonghoco.vn (tháng 10–12/2026)

**Ngày lập:** 11/10/2026
**Người soạn:** Claude, theo phân vai anh Vinh chốt ngày 11/10/2026
**Bên điều phối:** GLM, trong khung điều phối "Đồng Hồ Cơ" (ZCode)
**Kế hoạch gốc:** `docs/KE-HOACH-HOAN-THIEN-CUOI-2026-10-11.md` (mục 0 là quyết định của anh Vinh, có hiệu lực cao nhất)

---

## 1. Phân vai

| Bên | Việc |
|---|---|
| **Anh Vinh** | Chủ dự án: duyệt, quyết định các điểm dừng, cấp quyền tài khoản |
| **GLM** | (1) Điều phối toàn bộ danh mục gói theo tệp này; (2) thi công mã, dịch bản tiếng Anh; (3) chuẩn bị đầu vào gói A1 (danh sách địa chỉ); (4) đề nghị GPT Work nghiệm thu khi xong mỗi gói; (5) commit và phát hành **chỉ sau khi GPT Work cho phép** |
| **GPT Work** | Đọc nội dung đầu vào của từng gói, tạo câu lệnh thi công giao GLM; nghiệm thu độc lập (tệp thực tế và trang thật), cho phép hoặc yêu cầu sửa; **thao tác Search Console cho gói A1** theo quyết định mục 0 kế hoạch cuối (anh cho phép 11/10/2026) |
| **Claude** | Đã soạn nội dung đầu vào đợt 1 (thư mục `docs/giao-viec/dot-1/`). Khi **toàn bộ danh mục hoàn tất**, kiểm tra tổng thể một lần so với ý định của anh Vinh và đề xuất bước hoàn thiện tiếp |

## 2. Vòng đời một gói

1. **GLM** mở gói theo thứ tự ở mục 4, ghi trạng thái "Đang chuẩn bị" vào bảng theo dõi (mục 6).
2. **GPT Work** đọc đầu vào của gói, tạo câu lệnh thi công có: phạm vi tệp, nguồn, tiêu chí nghiệm thu, điều kiện dừng.
3. **GLM** thi công, viết biên bản tại `docs/nghiem-thu/<mã gói>-<tên>-<ngày>.md` (file nào, dòng nào, sửa thành gì; kết quả build và chuỗi kiểm).
4. **GLM** đề nghị GPT Work nghiệm thu; chưa commit.
5. **GPT Work** nghiệm thu: kiểm tệp thực tế, chạy kiểm, kiểm trang xem trước hoặc trang thật. Kết luận ĐẠT hoặc YÊU CẦU SỬA.
6. ĐẠT: **GLM** commit, push, chờ triển khai, kiểm lại trên trang thật, ghi "Hoàn tất" vào bảng theo dõi.
7. Gặp điểm cần anh quyết (chi phí, xóa dữ liệu, đổi cấu trúc trang, nội dung không có nguồn): **dừng gói, hỏi anh**, không tự quyết.

## 3. Quy tắc chung áp cho mọi gói

**Nội dung:**

- Giọng nhà sưu tầm am hiểu, chính xác kỹ thuật, không viết như quảng cáo; theo `CONTENT-GUIDE.md`.
- Chỉ dùng ký tự tiếng Việt và tiếng Anh; thuật ngữ tiếng Anh đặt trong ngoặc sau từ tiếng Việt.
- Năm, tên calibre, thông số không chắc chắn thì **bỏ hẳn và ghi `CAN-KIEM-CHUNG.md`**, tuyệt đối không đoán.
- Mọi dữ kiện mới phải có nguồn trong khối `sources` của bài; sửa bản Việt thì sửa cả bản Anh tương ứng.
- Độc giả gồm **người mới và nhà sưu tầm**: mở bài bằng câu trả lời dễ hiểu, phần sau đi sâu kỹ thuật.
- Kiến thức độc lập, **không bán hàng**, không đặt liên kết tiếp thị.
- Không dùng ảnh của hãng hay ảnh chụp sản phẩm; ảnh AI chỉ tạo không khí và phải theo `docs/QUY-CHUAN-HINH-ANH.md`.

**Kỹ thuật và phối hợp:**

- Trước khi sửa tệp, kiểm `git log`; không commit đè lên việc đang dở.
- Không tự thêm tính năng hay đổi cấu trúc trang ngoài phạm vi gói.
- **Chỉ dùng giải pháp miễn phí.** Mọi phương án có thể phát sinh phí phải dừng và hỏi anh.
- **Xóa dữ liệu** (bản triển khai cũ trên Vercel, tệp trong kho) cần anh duyệt danh sách trước.
- Tài khoản Search Console: chỉ kiểm tra URL và yêu cầu lập chỉ mục; không đổi người dùng, quyền hay cài đặt.
- Tính năng có video, tương tác: kiểm trên trình duyệt Safari (giả lập iPhone) trước khi đề nghị nghiệm thu, vì khoảng 39% người xem dùng Safari.

## 4. Danh mục gói theo đợt

Ký hiệu đầu vào: **[C]** nội dung Claude đã soạn sẵn; **[N]** GLM tự soạn theo nguồn chỉ định, GPT Work kiểm nguồn khi nghiệm thu.

### Đợt 1 — tuần 12–18/10/2026

| Thứ tự | Mã | Việc | Đầu vào | Tiêu chí nghiệm thu chính |
|---|---|---|---|---|
| 1 | E1 | Đăng ký kế hoạch hiện hành | Kế hoạch cuối, mục 0 và 3 | `CHI-MUC-KE-HOACH-HIEN-HANH.md` trỏ kế hoạch cuối và tệp này; kế hoạch giai đoạn 3 và kế hoạch 26/09 chuyển "lịch sử" |
| 2 | C0 | Sửa phạm vi bộ kiểm tra | Thêm `output` vào `exclude` của `tsconfig.json` và cấu hình kiểm liên quan | `npm run build` sạch, không quét `output/` |
| 3 | B1 + B2 | Sửa 8 lỗi chuyên môn, bỏ biểu tượng | **[C]** `dot-1/B1-B2-sua-loi-chuyen-mon.md` | Theo tiêu chí cuối tệp đầu vào |
| 4 | B7 | Xuất bản 3 bài "Hiểu đúng" | **[C]** `dot-1/B7-hieu-dung/` (3 tệp, chép vào `src/content/huongDan/vi/`); bản tiếng Anh **[N]** GLM dịch, gắn thẻ `hieu-dung` | `/hieu-dung` hiện 3 bài; `/en/myths` hiện 3 bản Anh; liên kết đọc thêm đều mở được |
| 5 | A1 | Đẩy lập chỉ mục | **[C]** `dot-1/A1-A4-lap-chi-muc-va-mo-ta.md` | Bảng 15 địa chỉ đã kiểm và yêu cầu; liên kết nội bộ được rà |
| 6 | A2 | Bật Speed Insights | Cài `@vercel/speed-insights`, thêm vào bố cục chung | Trang Speed Insights trên Vercel bắt đầu nhận dữ liệu |
| 7 | A3 | Biểu tượng trang ICO, PNG, iPhone | Tạo từ `public/favicon.svg` | `/favicon.ico`, `/apple-touch-icon.png` trả 200; thẻ có trong `<head>` |
| 8 | C1 (bước 1) | Khảo sát giảm dung lượng video | 36 tệp trong `public/videos` (315 MB); lưu trữ Vercel 7,42/10 GB | Báo cáo phương án **miễn phí**: thử nén WebM/VP9 kèm MP4 dự phòng cho iPhone, so dung lượng và chất lượng; phương án nơi lưu; danh sách bản triển khai cũ đề nghị xóa. **Dừng chờ anh duyệt** |
| 9 | Hồ sơ | Hai việc tồn đợt ảnh chia sẻ | Commit `6e60c37` đã ghi hồ sơ ảnh vào `QUY-CHUAN-HINH-ANH.md` và sửa kỳ vọng L3 | Chỉ cần ghi "Hoàn tất" vào bảng theo dõi |

### Đợt 2 — 19/10 đến 1/11/2026

| Mã | Việc | Đầu vào | Tiêu chí nghiệm thu chính |
|---|---|---|---|
| A4 | Mô tả trang chủ | **[C]** `dot-1/A1-A4-lap-chi-muc-va-mo-ta.md` | Thẻ mô tả `/` và `/en` đúng nội dung |
| A1 (đợt 2–3) | Yêu cầu lập chỉ mục các trang mới sửa | Như A1 | Bảng theo dõi cập nhật |
| C1 (bước 2) | Thi công phương án video anh đã duyệt | Báo cáo khảo sát | Dung lượng giảm; video phát được trên Chrome và Safari |
| C2 | Video "học được" | Phụ đề: tệp `.vtt` trong `output/video-*/dien-anh-v1/` và `output/video-*/`; lời đọc: `output/long-tieng/LOI-DOC.md` | Mỗi video có phụ đề VI/EN đúng ngôn ngữ trang; có bản lời thuyết minh dạng chữ mở ra đọc được |
| C3 | Sửa lọc tô sáng ô tìm kiếm | `src/scripts/searchCore.ts` dòng 95–96 | Giữ cặp `<mark>…</mark>`; có phép kiểm hồi quy |
| C4 | Gộp trang từ điển trùng | `/en/glossary/escapement` trùng `/en/glossary/escape-wheel` | Chuyển hướng vĩnh viễn; không mất liên kết cũ; trang trùng ra khỏi sơ đồ trang |
| C5 | Kiểm tra tự động trên GitHub | Luồng chạy `npm run check` và build | Chạy được trên GitHub, dùng hạn mức miễn phí |
| C7 | Thay ảnh 1929 | Anh tạo ảnh mới; GLM thay `public/images/timeline/great-depression-1929.jpg` | Ảnh mới không có nét giống chữ ký; nhãn AI giữ đúng |
| B3 (đợt 1–2) | Đưa kiến thức video vào bài, kèm nguồn | **[N]** mục "Kiến thức ngoài bài đã dùng — nguồn đề nghị" trong từng `output/video-*/dien-anh-v1/GHI-CHU.md`; ưu tiên Dây tóc, Bộ thoát, Chống từ, Chống nước, GMT, Dạ quang | Mỗi đoạn mới có nguồn trực tiếp; không đưa chi tiết không có nguồn |
| B4 | Vòng đóng việc kiểm chứng hằng tuần | `CAN-KIEM-CHUNG.md` | Mỗi tuần: đóng mục đã sửa, cập nhật bảng tổng hợp |
| D10 | Làm Nhật ký sai số dễ tìm | Trang `/nhat-ky-sai-so`, bài `/huong-dan/do-sai-so`, lộ trình học | Có liên kết từ bài đo sai số và lộ trình; có hướng dẫn lần đầu và ghi chú dữ liệu chỉ lưu trên máy |
| E3 | Khép việc treo | G03, V4, trang 374 KB | Đóng G03; ghi V4 và tối ưu trang 374 KB là "hoãn" |
| D4 (đợt 1) | Dịch 8–10 thương hiệu đầu | **[N]** bài VI hiện có; ưu tiên thương hiệu có trang mẫu tiêu biểu đã có bản Anh | Đúng thuật ngữ, nguồn, liên kết, hreflang; không thêm dữ kiện mới khi dịch |

### Đợt 3 — 2/11 đến 22/11/2026

| Mã | Việc | Đầu vào | Ghi chú |
|---|---|---|---|
| B3 (đợt 3) | Hoàn tất bổ sung kiến thức video | Như trên | |
| B6 | Chuẩn hóa số hiệu, năm, thông số cho 5 mẫu tiêu biểu | **[N]** chọn 5 mẫu được xem nhiều; tách thế hệ theo số hiệu | Thông số phải gắn số hiệu cụ thể |
| B8 (lô 1) | Đưa lại dữ kiện đang ẩn chờ nguồn | **[N]** 30 mục "đã xử lý an toàn" trong `CAN-KIEM-CHUNG.md`, lô 5–10 mục | Chỉ đưa lại khi có nguồn chính hãng |
| D4 (đợt 2–4) | Dịch tiếp thương hiệu | Như trên | Khoảng 30 bài |
| D9 | Hai hướng dẫn thực hành mới | **[N]** "Đọc kết quả máy đo nhịp" (nguồn: tài liệu Witschi đã dẫn ở gói B1); "Chăm sóc theo tình huống" (nguồn: hướng dẫn chính hãng) | Lập hồ sơ nguồn trước khi viết, theo khuôn `ho-so-nguon-*.md` |
| D2 | Bài cơ chế mới (1–2 bài) | **[N]** chủ đề: flyback và rattrapante, giờ thế giới, lịch năm, chứng nhận độ chính xác, giờ nhảy, phương trình thời gian | Hồ sơ nguồn trước; video có thể bổ sung sau |

### Đợt 4 — tháng 12/2026

| Mã | Việc |
|---|---|
| D4 | Dịch các thương hiệu còn lại, đủ 73/73 |
| B8 | Các lô dữ kiện tiếp theo |
| A1 | Đọc lại Search Console: số trang được lập chỉ mục, lượt hiển thị |

### Cân nhắc — GLM hỏi anh khi tới đợt 3

B5 (thí điểm viết dễ hiểu hơn), C6 (cắt phông, ảnh dòng thời gian AVIF/WebP — xét theo số liệu Speed Insights), D3 (bản Anh 5 hướng dẫn), D5 (trang chính sách bảo dưỡng chính hãng), D11 (nút phản hồi).

### Hoãn theo quyết định của anh

A5, A6, A7, D1, D6, D7, D8, C8. Mẫu tiêu biểu chưa dịch tiếng Anh.

## 5. Phụ thuộc cần giữ

- B1 xong trước D4 với Patek Philippe (bài thương hiệu có sửa lỗi) và trước A1 đợt 3.
- B7 xong trước A1 đợt 2.
- C1 bước 2 chỉ chạy sau khi anh duyệt báo cáo bước 1.
- C2 làm sau C1 (tránh gắn phụ đề hai lần nếu đổi tệp video).
- B6 và B8 làm sau B1.

## 6. Bảng theo dõi (GLM cập nhật sau mỗi bước)

Tạo tệp `docs/giao-viec/THEO-DOI.md` với bảng:

| Mã | Việc | Trạng thái | Biên bản | Nghiệm thu GPT Work | Commit | Ngày hoàn tất | Ghi chú |
|---|---|---|---|---|---|---|---|

Trạng thái dùng: Chưa mở / Đang chuẩn bị / Đang thi công / Chờ nghiệm thu / Yêu cầu sửa / Hoàn tất / Dừng chờ anh.

## 7. Khi toàn bộ danh mục hoàn tất

GLM báo anh Vinh kèm bảng theo dõi. Anh giao Claude kiểm tra tổng thể, gồm:

1. Đối chiếu từng gói với mục 0 và mục 3 của kế hoạch cuối: đã làm đúng ý định chưa.
2. Kiểm ngẫu nhiên nội dung trên trang thật: lỗi chuyên môn đã hết, nguồn mở được, bản Anh khớp bản Việt.
3. Đọc số liệu Vercel và Search Console so với ngày 11/10/2026.
4. Kiểm kỹ thuật: liên kết, tốc độ, Safari, dung lượng lưu trữ.
5. Đề xuất bước hoàn thiện tiếp theo.

---

## 8. Câu lệnh khởi động (anh dán vào khung điều phối GLM)

> Bắt đầu điều phối kế hoạch hoàn thiện tháng 10–12/2026. Đọc theo thứ tự: `docs/KE-HOACH-HOAN-THIEN-CUOI-2026-10-11.md` (mục 0 là quyết định của tôi, cao nhất), rồi `docs/giao-viec/00-DIEU-PHOI-TONG.md`. Tạo `docs/giao-viec/THEO-DOI.md` theo mục 6. Mở đợt 1 theo đúng thứ tự ở mục 4: với mỗi gói, chuyển đầu vào cho GPT Work tạo câu lệnh, thi công, viết biên bản, đề nghị GPT Work nghiệm thu, chỉ commit và phát hành khi GPT Work cho phép. Gặp điểm cần tôi quyết (chi phí, xóa dữ liệu, đổi cấu trúc, nội dung thiếu nguồn) thì dừng và hỏi tôi. Báo tôi ngắn gọn sau mỗi gói hoàn tất.
