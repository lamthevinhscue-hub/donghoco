# Hồ sơ nguồn — Cụm "Bảo dưỡng & sử dụng an toàn"

- Ngày lập: 02/09/2026
- Phạm vi: 4 bài `src/content/huongDan/vi/` — `bao-duong-dong-ho.md`, `chon-co-dong-ho.md`, `hop-xoay-dong-ho.md`, `nhan-biet-dong-ho-gia.md`
- Nguyên tắc: mọi claim kỹ thuật có nguồn; ưu tiên tài liệu chính hãng / tổ chức ngành / tổ chức chuyên môn; loại blog bán hàng, diễn đàn, bài SEO copy, video; các khuyến nghị thao tác luôn dẫn về "hướng dẫn của đúng mẫu, đúng hãng".

## 1. Xác minh nguồn

Ngày xác minh: 02/09/2026. Phương pháp: yêu cầu HTTP trực tiếp (curl) — ghi nhận mã trạng thái; với nguồn chặn bot (HTTP 403), xác minh nội dung qua trình đọc trang (web_reader) và chỉ trích dẫn những điểm có mặt trên trang.

| # | URL | Trạng thái xác minh | Dùng cho bài |
|---|-----|--------------------|--------------|
| 1 | `https://www.omegawatches.com/en-us/customer-service` | curl HTTP 200 | bao-duong-dong-ho |
| 2 | `https://www.omegawatches.com/en-us/customer-service/interventions-and-prices` | curl HTTP 200; trang chứa khuyến nghị complete service 5–8 năm và lưu ý tần suất phụ thuộc cách sử dụng | bao-duong-dong-ho |
| 3 | `https://www.omegawatches.com/en-us/customer-service/interventions-and-prices/complete-service` | curl HTTP 200; trang mô tả các bước service hoàn toàn (tháo rời, làm sạch, thay linh kiện chính hãng, tra dầu, căn chỉnh, làm đẹp vỏ dây, thay gioăng khôi phục chống nước, kiểm định) | bao-duong-dong-ho |
| 4 | `https://www.rolex.com/watch-care-and-service/the-rolex-servicing-procedure` | curl HTTP 403 (chặn bot); xác minh qua web_reader — trang mô tả quy trình service và bước lập dự toán chờ phê duyệt trước khi bảo dưỡng | bao-duong-dong-ho |
| 5 | `https://www.longines.com/en-us/universe/blog/how-to-choose-a-watch-according-to-your-wrist-size` | curl HTTP 200; hướng dẫn đo cổ tay và đối chiếu đường kính/độ dày/dây | chon-co-dong-ho |
| 6 | `https://www.tagheuer.com/assets/size-guide/TAGHeuer-SizeGuide.pdf` | curl HTTP 200; thước đo cổ tay in được do hãng phát hành | chon-co-dong-ho |
| 7 | `https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/automatic-self-winding` | curl HTTP 200 | hop-xoay-dong-ho |
| 8 | `https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/barrel` | curl HTTP 200 | hop-xoay-dong-ho |
| 9 | `https://www.fhs.swiss/eng/stopthefakes.html` | curl HTTP 200; trang chống hàng giả chính thức của Liên đoàn ngành đồng hồ Thụy Sĩ (FH) | nhan-biet-dong-ho-gia |
| 10 | `https://www.fhs.swiss/eng/report-abuse.html` | curl HTTP 200; kênh báo cáo vi phạm hàng giả của FH | nhan-biet-dong-ho-gia |

## 2. Claim được nâng đỡ bởi nguồn nào

### bao-duong-dong-ho (4 nguồn — 3 chính hãng Omega/Rolex + hub dịch vụ Omega)

- Tám bước complete service của OMEGA (tháo rời, làm sạch, thay linh kiện chính hãng, tra dầu, căn chỉnh, làm đẹp vỏ dây, thay gioăng khôi phục chống nước, kiểm định) → nguồn #3. Bài chỉ mô tả quy trình OMEGA và Rolex **như hai ví dụ riêng của từng hãng**, không khái quát "mọi hãng giống nhau".
- "Thợ lập dự toán công việc; bảo dưỡng chỉ bắt đầu khi khách phê duyệt dự toán" → nguồn #4 (Rolex servicing procedure).
- "Phạm vi service khác theo hãng và tình trạng; hỏi báo giá có gồm thay gioăng/kiểm tra chống nước không" → bài KHÔNG khẳng định phạm vi chung; các nguồn #3, #4 được dùng đúng vai trò ví dụ quy trình từng hãng, không suy rộng thành quy tắc "service chính hãng thường bao gồm gioăng".
- "Các hãng công bố hạn mức bảo hành cho dịch vụ trên trang dịch vụ chính thức" → nguồn #1, #2 (không nêu số cụ thể trong bài).
- Khuyến nghị tần suất: bài không công bố chu kỳ chung. "5–8 năm" chỉ xuất hiện ở dạng trích dẫn khuyến nghị của riêng OMEGA (nguồn #2), kèm lưu ý tần suất phụ thuộc cách sử dụng.

### chon-co-dong-ho (2 nguồn — chính hãng Longines/TAG Heuer)

- Nguồn #5, #6 **chỉ nâng đỡ ý "đo cổ tay và tham khảo thông số của đúng mẫu trước khi chọn"**. Hai hãng không công bố ngưỡng "cổ tay cỡ này phải đeo cỡ kia" — bài không gán bất kỳ khoảng số đo nào cho hai nguồn này.
- Bài KHÔNG còn bảng tra chu vi cổ tay → đường kính/vấu (đã loại hoàn toàn ở vòng sửa 02/09/2026), không còn nhận định "cổ tay người Việt/Á nhỏ hơn", không còn quy tắc "vấu quan trọng hơn đường kính" hay quy tắc vấu tuyệt đối, không còn quy đổi đồng hồ chữ nhật sang tròn.

### hop-xoay-dong-ho (2 nguồn — tổ chức chuyên môn FHH)

- Nguồn #7, #8 **chỉ nâng đỡ kiến thức cơ chế**: automatic lên dây nhờ chuyển động tác động lên quả nặng, năng lượng tích trong thùng cót. **Hai nguồn này không chứng minh bất kỳ khuyến nghị sử dụng hộp xoay nào** — không chứng minh lợi ích, tác hại, ảnh hưởng tới bảo dưỡng, hay cách cài đặt (vòng mỗi ngày, chiều quay, nhịp quay).
- Bài chỉ dùng hai nguồn ở phần mô tả cơ chế; phần khung quyết định và "Trước khi sử dụng" dẫn về tài liệu của đúng mẫu/hãng, không suy ra từ FHH.
- Bài không còn: "phần lớn người chơi không cần", "ba trường hợp thật sự có ích", "giữ đồng hồ không dừng", "cổ tay bạn đã là hộp xoay", "một phút là xong", "chạy không nghỉ", "tăng cường độ vận hành", "một tư thế cố định", khuyến nghị chế độ ngắt quãng, hay bất kỳ kết luận về ảnh hưởng chu kỳ bảo dưỡng.

### nhan-biet-dong-ho-gia (2 nguồn — tổ chức ngành FH)

- Nguồn #9, #10 được mô tả đúng vai trò: **nguồn thông tin về hàng giả và kênh phản ánh vi phạm của tổ chức ngành** — không phải dịch vụ xác thực từng chiếc đồng hồ; bài ghi rõ giới hạn này.
- Bài KHÔNG còn các claim tự kiểm thiếu nguồn: kim giây chạy mượt, tiếng máy/quartz, trọng lượng "nặng tay", chất lượng hoàn thiện (vát cạnh/ốc vít/đáy vỏ), "giá thấp bất thường", "chi phí kiểm tra nhỏ hơn rủi ro", "hãng không chịu trách nhiệm", "chỉ người tháo đáy vỏ mới xác nhận", "người làm giả đầu tư/bỏ qua".
- Trọng tâm mới: giới hạn của tự kiểm — đối chiếu reference là bước sàng lọc; hộp/thẻ/serial/hóa đơn không tự chứng minh; câu hỏi nên hỏi người bán; khi chưa xác minh thì dừng hoặc chỉ tiếp tục theo điều kiện kiểm tra độc lập.

## 3. Tiêu chí loại nguồn (áp dụng cho cả 4 bài)

- Nhận: trang dịch vụ/tài liệu kỹ thuật của hãng; tổ chức ngành (FH); tổ chức chuyên môn (FHH); tiêu chuẩn công khai.
- Loại: blog bán hàng, diễn đàn, bài SEO copy, video, trang Reddit/Quora, cửa hàng bán lẻ.

## 4. Hạn chế đã biết

- Nguồn #4 (Rolex) chặn truy cập tự động (403) — nội dung trích dẫn đã xác minh qua trình đọc trang ngày 02/09/2026; khi anh rà soát độc lập nên mở trực tiếp trên trình duyệt.
- Nguồn #7, #8 (FHH) chỉ nâng đỡ kiến thức cơ chế automatic/thùng cót — **không nâng đỡ bất kỳ khuyến nghị sử dụng hộp xoay nào** trong bài.
- Nguồn #5, #6 (Longines, TAG Heuer) chỉ nâng đỡ phương pháp "đo cổ tay và tham khảo thông số" — không nâng đỡ bất kỳ ngưỡng số đo cụ thể nào (bài đã loại bảng tra).
- Nguồn #9, #10 (FH) là nguồn thông tin + kênh phản ánh vi phạm — không phải dịch vụ xác thực từng chiếc.
