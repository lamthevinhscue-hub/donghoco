# KẾ HOẠCH HOÀN THIỆN CUỐI CÙNG — kienthucdonghoco.vn

**Ngày lập:** 11/10/2026
**Người tổng hợp:** Claude
**Nền đối chiếu:** HEAD `6e60c37` = `origin/main`; trang thật và Vercel kiểm ngày 11/10/2026
**Trạng thái:** **đã được anh Vinh duyệt ngày 11/10/2026** (xem mục 0). Bước tiếp: đăng ký vào chỉ mục kế hoạch (E1) và soạn câu lệnh giao việc đợt 1.

---

## 0. Quyết định của anh Vinh ngày 11/10/2026 — có hiệu lực cao nhất

| Nội dung | Quyết định |
|---|---|
| Danh mục | **Hoãn A5, A6, A7, D1**; các việc còn lại thực hiện theo khuyến nghị trong bảng mục 3 |
| Nhóm độc giả | Người mới chơi tại Việt Nam **và** nhà sưu tầm đã có kiến thức: mỗi bài mở bằng câu trả lời dễ hiểu, phần sau đi sâu kỹ thuật |
| Chi phí video (C1) | **Chỉ dùng giải pháp miễn phí**; GLM trình phương án miễn phí trước khi chuyển hay nén |
| Lập chỉ mục (A1) | Anh cho phép một bên thao tác trên tài khoản Search Console; giao **GPT** làm vì đang có quyền truy cập |
| Chuyên mục Ghi chép (D1) | Hoãn; tên và vị trí sẽ chốt khi mở lại |
| Định hướng thương mại | Giữ kiến thức độc lập, **không bán hàng** |
| Bản Anh (D4) | **Dịch toàn bộ thương hiệu** (64 bài còn thiếu); mẫu tiêu biểu chưa dịch |

---

## 1. Căn cứ tổng hợp

| Nguồn | Bên lập | Ngày | Nội dung dùng |
|---|---|---|---|
| `ra-soat-doc-lap-va-lo-trinh-tiep-2026-09-25.md` | Codex (phía GPT) | 25/09 | Danh sách lỗi P1–P3, đề xuất thí điểm biên tập, lộ trình 30/60/90 ngày, đo hiệu quả |
| `KE-HOACH-HOP-NHAT-GIAI-DOAN-3-2026-09-25.md` | Claude | 25/09 | 30 gói; đã xong S1–S4, T1–T4, U1–U3, I1–I4, L1–L3, C1, K2–K4; còn K1 |
| `ke-hoach-bo-sung-hinh-anh-hoat-anh-2026-09-26.md` | Claude | 26/09 | 20 gói M, V, D, G; đã xong V1 và hồ sơ nguồn D5; V3 đã thử rồi rút lại ngày 10/10 |
| Biên bản nghiệm thu của GLM (`docs/nghiem-thu/`) và GPT Work | GLM, GPT Work | 28/09–10/10 | Trạng thái thực tế từng gói, các việc tồn |
| `danh-gia-tong-the-2026-10-11.md` | Claude | 11/10 | Đo trang thật, số liệu Vercel, lỗi bài gốc phát hiện khi dựng video |
| Đánh giá tổng thể và hai lượt bổ sung số liệu (khung trò chuyện ZCode) | GLM | 11/10 | Kho 30 mục chờ nguồn, nén video, Bing, tỷ lệ Safari, người đọc bản Anh |
| Đánh giá tổng thể và lượt kiểm Vercel, Search Console (khung trò chuyện ChatGPT) | GPT | 11/10 | **Search Console: 1/354 trang được lập chỉ mục**, trang "Hiểu đúng" trống, phạm vi kiểm tra quét nhầm `output/`, nội dung hướng dẫn mới |

Hai nhận xét ngày 11/10 của GLM và GPT được đọc trực tiếp trên máy anh (bằng điều khiển máy tính), bổ sung vào bản này ngày 11/10. Mọi điểm mới đều được kiểm lại trên mã hoặc trang thật trước khi đưa vào; kết quả kiểm ghi ở mục 2.

Tôi đã kiểm tra lại từng lỗi trong báo cáo 25/09 trên mã hiện tại. Những lỗi đã sửa được loại khỏi kế hoạch: năm Tech Gombessa, mốc Patek 1861, chữ "thanhläng", "dưới băng". Chỉ những lỗi **còn tồn tại** mới được đưa vào mục 3.

---

## 2. Nhận định chung của ba bên

**Ba bên thống nhất:**

1. Ưu tiên sửa kiến thức sai trước khi mở rộng.
2. Làm sâu thay vì tăng số bài.
3. Đo người đọc thật trước khi dịch hay viết hàng loạt.
4. Ảnh AI chỉ tạo không khí, không làm chứng cứ.

**Điểm số liệu Vercel làm thay đổi ưu tiên (30 ngày gần nhất):**

| Chỉ số | Giá trị | Hệ quả |
|---|---|---|
| Khách truy cập | 73 | Vấn đề lớn nhất là **chưa được tìm thấy**, chưa phải thiếu nội dung |
| Lượt đến từ Google | không thấy | Phải làm Search Console trước mọi việc khác |
| Khách nước ngoài | khoảng 16% | Tạm dừng dịch tiếng Anh hàng loạt (nhận định trước duyệt — quyết định hiện hành tại mục 0: dịch toàn bộ 64 thương hiệu còn thiếu) |
| Trang xem nhiều | Trang chủ, Cơ chế, Lịch sử, Dây tóc và bánh lắc, Bộ thoát | Sửa và làm sâu đúng các trang này trước |
| Lưu trữ trên Vercel | 7,42/10 GB | Cần xử lý video sớm |
| Search Console (GPT đọc) | Sơ đồ trang gửi thành công, Google phát hiện 354 trang nhưng **chỉ 1 trang được lập chỉ mục**; 1 lượt hiển thị, 0 lượt nhấp | Điểm nghẽn thật là **lập chỉ mục**, không phải xác minh tài khoản |
| Kiểm một bài (GPT, bài Bộ thoát) | Google tìm nạp được, cho phép lập chỉ mục, canonical đúng, nhận ra video | Không bị chặn kỹ thuật; trang mới, ít liên kết ngoài, cần thời gian và tín hiệu |
| Trình duyệt (GLM đọc) | Safari và Safari trên iPhone khoảng 39% | Mọi video, tương tác phải thử trên iPhone trước khi phát hành |
| Bản Anh theo nhóm trang (GLM đọc) | `/en/mechanisms/...` 9 khách trong 30 ngày | Bản Anh có người đọc, nhưng còn rất ít |

**Kết quả tôi kiểm lại các điểm mới:**

| Điểm nêu | Bên nêu | Kết quả kiểm |
|---|---|---|
| Trang "Hiểu đúng" báo chưa có bài, dù trang chủ dẫn tới | GPT | **Đúng.** Không bài nào mang thẻ `hieu-dung`; gói U2, U3 mới là hồ sơ nguồn, chưa thành bài. Nhận định "U2, U3 đã phát hành" của GLM chưa chính xác |
| Bộ kiểm tra mã quét cả thư mục `output/` | GPT | **Đúng.** `tsconfig.json` khai báo `include: ["**/*"]`, chỉ loại `dist` |
| 30 mục "đã xử lý an toàn" chờ nguồn để bổ sung lại | GLM | **Đúng**, theo bảng tổng hợp trong CAN-KIEM-CHUNG.md |
| Các lỗi biên độ, IWC Mark XI, Swiss Made, ô tìm kiếm, trang trùng từ điển | GPT | **Đúng**, trùng với mục B1, C3, C4 đã có |
| Nén video sang WebM/VP9 | GLM | Giảm dung lượng tốt, nhưng chính GLM đã ghi nhận iPhone đời cũ không phát WebM; cần giữ bản MP4 dự phòng |

**Điểm hai bên khác nhau và cách tôi đề nghị:**

*Lưu ý E1 (11/10/2026): các đề nghị trong bảng dưới đây là nhận định của từng bên trước duyệt; quyết định hiện hành theo mục 0 — bản Anh (D4): dịch toàn bộ 64 thương hiệu còn thiếu; mẫu tiêu biểu chưa dịch. Giữ nguyên để truy vết.*

| Vấn đề | Codex 25/09 | Claude 11/10 | Đề nghị |
|---|---|---|---|
| Bản tiếng Anh | Dịch 20 bài nền theo 3 đợt | Tạm dừng vì ít khách nước ngoài | Chỉ dịch 5 bài Hướng dẫn còn thiếu (các bài nền khác đã có bản Anh), dừng mảng mẫu và thương hiệu |
| Lộ trình người mới | Làm "7 ngày làm quen" | Trang lộ trình học đã có | Không làm trang mới; chỉ bổ sung câu tự kiểm nếu anh muốn |
| CSP | Thử tương thích tìm kiếm trước | Ưu tiên thấp | Hoãn sang giai đoạn sau |
| Bản Anh thương hiệu | GLM (11/10): dịch chọn lọc 10–15 thương hiệu lớn | GPT (11/10) và Claude: làm tiếng Việt trước | **Anh quyết 11/10: dịch toàn bộ thương hiệu** (mục D4) |
| Cách giảm dung lượng video | GLM: nén WebM/VP9 | GPT: đo trên mạng di động trước khi làm thêm; Claude: chuyển ra khỏi kho mã | Gộp: nén lại kèm MP4 dự phòng cho iPhone, đồng thời chuyển nơi lưu (C1) |

---

## 3. Danh mục việc cần anh quyết định

**Cách đọc bảng:**

- **Ảnh hưởng:** Rất cao / Cao / Trung bình / Thấp, xét theo uy tín, người đọc và rủi ro vận hành.
- **Công sức:** ngày công ước lượng, gồm kiểm nguồn, thi công và nghiệm thu; không phải thời gian máy chạy.
- **Người làm:** Anh (chủ dự án), Claude (nội dung, kiểm chứng), GLM (mã, phát hành), GPT Work (nghiệm thu).
- **Khuyến nghị:** **Làm ngay**, **Nên làm**, **Cân nhắc**, **Hoãn**.

### Nhóm A — Được tìm thấy và đo lường

| Mã | Việc | Thao tác cụ thể | Ý nghĩa | Ảnh hưởng | Công sức | Người làm | Khuyến nghị |
|---|---|---|---|---|---|---|---|
| A1 | Đẩy lập chỉ mục trên Google (cập nhật theo GPT) | Search Console đã có và sơ đồ trang đã gửi; nay chọn 10–15 trang quan trọng (trang chủ, lộ trình học, hướng dẫn người mới, Bộ thoát, Dây tóc và bánh lắc, Chống nước, vài hồ sơ mẫu), kiểm từng địa chỉ bằng công cụ kiểm tra URL rồi bấm "Yêu cầu lập chỉ mục"; tăng liên kết đọc tiếp giữa các trang này | Hiện chỉ 1/354 trang có mặt trên Google; đây là nút thắt lớn nhất | Rất cao | 1 giờ, lặp lại vài ngày một lần | GPT thao tác (đã có quyền truy cập Search Console; anh cho phép 11/10), Claude chọn danh sách | **Làm ngay** |
| A2 | Bật Speed Insights | Cài gói `@vercel/speed-insights`, thêm vào bố cục chung | Đo tốc độ thật trên điện thoại người đọc | Trung bình | 0,25 ngày | GLM | **Làm ngay** |
| A3 | Biểu tượng trang ICO, PNG, iPhone | Tạo 3 tệp từ `favicon.svg`, thêm thẻ vào `BaseLayout.astro` | Hiện đúng biểu tượng trên Zalo, iPhone và kết quả Google | Trung bình | 0,25 ngày | GLM | **Làm ngay** |
| A4 | Viết lại mô tả trang chủ | Thay câu 53 ký tự bằng câu 120–155 ký tự, cả bản Việt và Anh | Đoạn hiện dưới tiêu đề trong Google hấp dẫn hơn | Thấp | 0,1 ngày | Claude, GLM | Nên làm |
| A5 | Lan tỏa chủ động | Mỗi tuần chia sẻ 2 bài vào nhóm Zalo, Facebook về đồng hồ; Claude soạn đoạn giới thiệu | Có người đọc đầu tiên trong khi chờ Google; liên kết từ bên ngoài cũng giúp Google chú ý | Cao | 1 giờ mỗi tuần | Anh, Claude | **Hoãn** (anh quyết 11/10) |
| A6 | Đăng ký Bing Webmaster Tools (theo GLM) | Nhập trang từ Search Console sang Bing, gửi sơ đồ trang | Bing đã tự mang lại 1 lượt; thêm một nguồn tìm kiếm, công sức nhỏ | Thấp đến trung bình | 20 phút | Anh, Claude hướng dẫn | **Hoãn** (anh quyết 11/10) |
| A7 | Thử trên iPhone thật (theo GLM và GPT) | Kiểm video, bảng, tìm kiếm, mô hình 3D trên Safari iPhone trước mỗi lần phát hành tính năng | Khoảng 39% người xem dùng Safari; 7 ngày gần nhất hơn nửa dùng điện thoại | Trung bình | 0,5 ngày lần đầu | Anh thử, GLM sửa | **Hoãn** (anh quyết 11/10) |

### Nhóm B — Sửa kiến thức sai (uy tín)

| Mã | Việc | Thao tác cụ thể | Ý nghĩa | Ảnh hưởng | Công sức | Người làm | Khuyến nghị |
|---|---|---|---|---|---|---|---|
| B1 | Gói lỗi chuyên môn còn tồn | Sửa cả bản Việt và Anh, mỗi sửa đổi kèm nguồn: **(1)** IWC Mark XI còn dùng thông số 72 giờ và ghi Mark XVIII là "thế hệ hiện tại"; **(2)** định nghĩa biên độ (từ vị trí cân bằng tới điểm quay đầu, theo Witschi); **(3)** nhãn văn bản Swiss Made ghi SR 817.021.51, đúng là SR 232.119; **(4)** câu Patek Seal "khắt khe hơn dấu ấn Genève" chưa có căn cứ; **(5)** lịch vạn niên ghi phải chỉnh năm 2400, trong khi 2400 là năm nhuận; **(6)** "thợ hồ" ở bài chronograph; **(7)** bài hiển thị ngày: "date jumper" và câu "qua lưng kính thấy đĩa ngày"; **(8)** bài dạ quang gộp radium, tritium vào "lân quang" | Tránh truyền kiến thức sai; đây là giá trị cốt lõi của trang | Rất cao | 2–3 ngày | Claude soạn, GLM áp, GPT Work nghiệm thu | **Làm ngay** |
| B2 | Bỏ biểu tượng ✅ ⚠️ ❌ 💡 | Thay bằng chữ trong 12 tệp | Đúng quy tắc ký tự, trình bày nghiêm túc | Thấp | 0,25 ngày | GLM | **Làm ngay** (gộp với B1) |
| B3 | Đưa kiến thức video vào bài, kèm nguồn | Dùng danh sách "kiến thức ngoài bài" trong từng GHI-CHU.md; ưu tiên Dây tóc, Bộ thoát, Chống từ, Chống nước, GMT, Dạ quang | Bài và video nói cùng một nội dung; bài đầy đủ hơn | Cao | 4–6 ngày, chia 3 đợt | Claude soạn, GLM áp | Nên làm |
| B4 | Vòng đóng việc kiểm chứng hằng tuần | Mỗi tuần rà CAN-KIEM-CHUNG.md: đóng mục đã sửa, xử lý mục "chờ nguồn" | Báo cáo 25/09 chỉ ra lỗi bị ghi lại nhưng không được đóng | Trung bình | 1 giờ mỗi tuần | Claude | Nên làm |
| B5 | Thí điểm "viết dễ hiểu hơn" | Viết lại theo khuôn 5 bước của báo cáo 25/09 cho 2 bài và 2 thuật ngữ, rồi anh đánh giá | Người mới hiểu nhanh hơn; chuyển phần nhật ký kiểm nguồn xuống cuối bài | Trung bình | 2–3 ngày | Claude | Cân nhắc |
| B7 | Lấp trang "Hiểu đúng" đang trống (theo GPT) | Trang chủ đang dẫn tới một trang báo "chưa có bài". Xuất bản ngay 3 bài đầu từ hồ sơ nguồn U2, U3 đã có (ví dụ: nhiều chân kính có tốt hơn; trữ cót dài có chính xác hơn; có cần hộp xoay mỗi ngày); tạm thời có thể bỏ liên kết ở trang chủ | Tránh dẫn người đọc vào trang rỗng; dạng câu hỏi này dễ được tìm kiếm và chia sẻ | Cao | 2–3 ngày | Claude soạn, GLM áp | **Làm ngay** |
| B8 | Bổ sung lại 30 mục dữ kiện đang ẩn chờ nguồn (theo GLM) | Rà 30 mục "đã xử lý an toàn" trong CAN-KIEM-CHUNG.md theo lô 5–10 mục, tìm nguồn chính hãng, đưa dữ kiện trở lại bài; ưu tiên bài được xem nhiều | Bài đầy đủ hơn mà không phải viết từ đầu, vẫn giữ kỷ luật nguồn | Trung bình | 1–2 ngày mỗi lô | Claude, GLM | Nên làm, sau B1 |
| B6 | Chuẩn hóa số hiệu, năm, thông số cho 5 mẫu tiêu biểu | Tách thế hệ, gắn thông số với số hiệu (reference) cụ thể | Tránh trộn thông số giữa các thế hệ, như lỗi IWC | Cao | 4–7 ngày | Claude, GLM | Nên làm, sau B1 |

### Nhóm C — Hạ tầng, chi phí, chất lượng kỹ thuật

| Mã | Việc | Thao tác cụ thể | Ý nghĩa | Ảnh hưởng | Công sức | Người làm | Khuyến nghị |
|---|---|---|---|---|---|---|---|
| C0 | Sửa phạm vi bộ kiểm tra mã (theo GPT) | Thêm `output` vào mục loại trừ trong `tsconfig.json` (và cấu hình kiểm liên quan), chạy lại kiểm tra và build sạch | Bộ kiểm đang quét cả bản thử nghiệm trong `output/`, sinh cảnh báo thừa và có thể che lỗi thật | Trung bình | 0,25 ngày | GLM | **Làm ngay** |
| C1 | Giảm và chuyển video (gộp ý GLM và Claude) | GLM nén lại 36 tệp (315 MB): bản WebM/VP9 nhẹ kèm MP4 dự phòng cho iPhone; khảo sát nơi lưu ngoài kho mã và chi phí, trình anh duyệt; xóa bản triển khai cũ, kể cả của các dự án khác | Tránh vượt hạn mức gói miễn phí; video tải nhanh hơn trên điện thoại | Cao | 1–2 ngày | GLM, Anh duyệt chi phí | **Làm ngay** (bước khảo sát và thử nén) |
| C2 | Video "học được" (mở rộng theo GPT) | Gắn phụ đề VI/EN (tệp VTT đã có) vào `PrincipleVideo.astro`; thêm bản lời thuyết minh dạng chữ có thể mở ra đọc; thêm một hình tĩnh tóm tắt nguyên lý cạnh video | Người không bật tiếng, khiếm thính hoặc mạng chậm vẫn hiểu được; Google đọc được lời thoại | Trung bình | 1 ngày | GLM, Claude soạn lời | Nên làm |
| C3 | Sửa lỗi ô tìm kiếm xóa thẻ đánh dấu | Sửa hàm lọc trong `searchCore.ts` (dòng 95–96), thêm phép kiểm hồi quy | Kết quả tìm kiếm tô sáng đúng | Thấp | 0,25 ngày | GLM | Nên làm |
| C4 | Gộp trang từ điển trùng | `/en/glossary/escapement` đang trùng với `/en/glossary/escape-wheel`; chuyển hướng vĩnh viễn | Tránh Google coi là nội dung trùng | Thấp | 0,25 ngày | GLM | Nên làm |
| C5 | Kiểm tra tự động trên GitHub | Tạo luồng chạy `npm run check` và build mỗi lần đẩy mã | Chặn lỗi trước khi lên trang thật, không phụ thuộc người nhớ chạy | Trung bình | 0,5–1 ngày | GLM | Nên làm |
| C6 | Giảm dung lượng tải | Cắt phông chỉ giữ bộ chữ Việt và Latin; xóa 28 SVG thừa ở dòng thời gian; ảnh dòng thời gian sang AVIF/WebP | Trang nhẹ hơn trên điện thoại | Thấp đến trung bình | 1 ngày | GLM | Cân nhắc, chờ số liệu từ A2 |
| C7 | Tạo lại ảnh 1929 | Ảnh `great-depression-1929.jpg` có nét giống chữ ký ở góc | Giảm rủi ro bản quyền | Trung bình | 0,25 ngày | Anh tạo ảnh, GLM thay | Nên làm |
| C8 | CSP chuyển sang chế độ chặn | Thêm nơi nhận báo cáo, thử tương thích với ô tìm kiếm | Tăng bảo mật | Thấp | 1–2 ngày | GLM | **Hoãn** |

### Nhóm D — Mở rộng nội dung

| Mã | Việc | Thao tác cụ thể | Ý nghĩa | Ảnh hưởng | Công sức | Người làm | Khuyến nghị |
|---|---|---|---|---|---|---|---|
| D1 | Chuyên mục "Ghi chép nhà sưu tầm" | Anh chốt tên và vị trí (Q10), viết bài đầu; Claude biên tập; GLM dựng mục | Nội dung gốc chỉ anh tạo được; lý do để người đọc quay lại | Cao | Anh viết; 1 ngày dựng mục | Anh, Claude, GLM | **Hoãn** (anh quyết 11/10) |
| D2 | Bài cơ chế mới kèm video | 6 chủ đề: flyback và rattrapante, giờ thế giới, lịch năm, chứng nhận độ chính xác, giờ nhảy, phương trình thời gian; mỗi bài có hồ sơ nguồn trước | Lấp chỗ trống giữa từ điển và bài sâu | Trung bình | 2 ngày mỗi bài | Claude, GLM | Nên làm, sau nhóm B, 1–2 bài mỗi đợt |
| D9 | Hai hướng dẫn thực hành mới (theo GPT) | "Đọc kết quả máy đo nhịp" (sai số, biên độ, lệch nhịp và giới hạn); "Chăm sóc theo tình huống" (đồng hồ dừng, chạy bất thường, vào nước, bị va đập) | Trả lời đúng câu hỏi thực tế của người dùng; kết nối với Nhật ký sai số | Trung bình đến cao | 2 ngày mỗi bài | Claude, GLM | Nên làm |
| D10 | Làm Nhật ký sai số dễ tìm (theo GPT) | Đặt liên kết ở bài Đo sai số, lộ trình người mới; thêm ví dụ lần đầu, giải thích dữ liệu chỉ lưu trên máy và cách sao lưu | Công cụ đã có nhưng ít người biết | Thấp đến trung bình | 0,5 ngày | GLM, Claude soạn chữ | Nên làm |
| D11 | Nút "Bài này đã giúp bạn hiểu chưa?" (theo GPT) | Nút phản hồi đơn giản; cần chọn nơi nhận, chống spam, chính sách riêng tư | Biết bài nào cần viết lại | Thấp | 1 ngày | GLM | Cân nhắc, khi có thêm người đọc |
| D3 | Bản tiếng Anh cho 5 bài Hướng dẫn còn thiếu | Bảo dưỡng, chọn cỡ, dùng vành lặn, microbrand, nhận biết đồng hồ giả | Hoàn tất mảng hướng dẫn hai thứ tiếng | Thấp đến trung bình | 2 ngày | GLM dịch, Claude rà | Cân nhắc |
| D4 | Dịch mẫu và thương hiệu sang tiếng Anh | 58 mẫu, 64 thương hiệu; GLM đề nghị bản rút gọn 10–15 thương hiệu lớn | Khách nước ngoài khoảng 16%; bản Anh cơ chế mới có 9 khách trong 30 ngày | Thấp | 20+ ngày (bản rút gọn 4–6 ngày) | GLM dịch, Claude rà | **Làm toàn bộ 64 thương hiệu còn thiếu** (anh quyết 11/10); dịch theo đợt 8–10 bài, sau khi xong B1; công sức khoảng 15–20 ngày |
| D5 | Trang chính sách bảo dưỡng chính hãng | Dựng trang từ hồ sơ nguồn D5 đã có | Thông tin thực dụng cho người dùng | Trung bình | 1–2 ngày | Claude, GLM | Cân nhắc |
| D6 | Trang calibre, tra cứu số hiệu, đồng hồ cổ, "Đọc bộ máy" (D1–D4, D6, D7 cũ) | — | Khối lượng lớn, cần dữ liệu đáng tin | Trung bình | 10+ ngày | — | **Hoãn** |
| D7 | Bộ thoát điều khiển bằng thanh trượt (V3) | Đã thử và rút lại ngày 10/10 | Video nguyên lý hiện đã giải thích tốt | Thấp | — | — | **Hoãn** |
| D8 | Ảnh AI mới (M3–M6), mô hình 3D chuyên nghiệp (V4), mục Nhân vật (L4) | — | Tốn công, giá trị phụ thuộc người đọc | Thấp | — | — | **Hoãn** |

### Nhóm E — Quản trị dự án

| Mã | Việc | Thao tác cụ thể | Ý nghĩa | Ảnh hưởng | Công sức | Người làm | Khuyến nghị |
|---|---|---|---|---|---|---|---|
| E1 | Đăng ký kế hoạch này làm kế hoạch hiện hành | Cập nhật `CHI-MUC-KE-HOACH-HIEN-HANH.md`; chuyển kế hoạch giai đoạn 3 và kế hoạch 26/09 sang "lịch sử" | Các bên chỉ theo một bản kế hoạch | Trung bình | 0,25 ngày | GPT Work, GLM | **Làm ngay** sau khi anh duyệt |
| E3 | Khép các việc treo GLM nêu | Trạng thái gói G03 (đường cơ sở người xem, chờ nghiệm thu lại từ 12/09); hướng V4 sau khi V3 rút lại; trang nặng nhất 374 KB HTML | Tránh việc treo kéo dài không ai quyết | Thấp | 0,5 ngày rà | GPT Work, GLM | Nên làm: đóng G03, hoãn V4 và tối ưu trang 374 KB |
| E2 | Dọn tệp chưa theo dõi trong kho mã | 213 tệp chưa đưa vào Git (bộ prompt cũ, tệp nháp gốc, `chk-pid*.ps1`, thư mục `video-*` ở gốc); giữ, chuyển hay xóa theo danh sách GLM trình | Kho mã gọn, tránh nhầm tài liệu cũ là lệnh | Thấp | 0,5 ngày | GLM trình, Anh duyệt | Nên làm |

---

## 4. Lịch đề xuất (nếu anh duyệt theo khuyến nghị)

| Đợt | Thời gian | Việc | Kết quả đo được |
|---|---|---|---|
| 1 | Tuần 1 (12–18/10) | A1, A2, A3; B1, B2, B7; C0; C1 (khảo sát, thử nén); E1 | Đã yêu cầu lập chỉ mục 10–15 trang chính; 8 lỗi chuyên môn đã sửa; trang "Hiểu đúng" có 3 bài; bộ kiểm chạy sạch; có phương án video |
| 2 | Tuần 2–3 (19/10–1/11) | A4; D4 đợt 1 (8–10 thương hiệu); B3 đợt 1–2; B4; C1 (thi công); C2, C3, C4, C5, C7; D10; E3 | Dung lượng lưu trữ giảm; video có phụ đề và bản chữ; số trang được lập chỉ mục tăng |
| 3 | Tuần 4–6 (2–22/11) | B3 đợt 3; B6; B8 lô 1; D4 đợt 2–4; D9; D2 (1–2 bài đầu); tùy chọn B5, D3, D5 | Khoảng 40 thương hiệu có bản Anh; 2 hướng dẫn thực hành mới |
| 4 | Tháng 12 | D4 các đợt còn lại; B8 các lô tiếp | Đủ 73 thương hiệu song ngữ |
| Rà lại | Cuối tháng 11 | Đọc Search Console (số trang lập chỉ mục, lượt hiển thị) và Vercel 28 ngày | Quyết định tiếp: mở rộng D6 hay tiếp tục làm sâu |

**Tổng công sức nhóm "Làm ngay" và "Nên làm":** khoảng 35–45 ngày công trong khoảng 10 tuần, gồm 15–20 ngày dịch thương hiệu (D4). Phần lớn công sức thuộc Claude, GLM và GPT; phần của anh là duyệt.

---

## 5. Câu hỏi để anh quyết định (lịch sử — anh Vinh đã trả lời tại mục 0 ngày 11/10/2026; mục 0 điều hành hiện tại)

1. **Duyệt danh mục:** anh duyệt theo khuyến nghị, hay muốn bỏ hoặc hoãn mục nào? Anh chỉ cần ghi mã, ví dụ "bỏ B5, hoãn C6".
2. **Nhóm độc giả chính:** người mới chơi tại Việt Nam (đề nghị) hay nhà sưu tầm đã có kiến thức?
3. **Chi phí video (C1):** anh chấp nhận một khoản phí nhỏ hằng tháng nếu cần, hay chỉ dùng giải pháp miễn phí?
4. **Yêu cầu lập chỉ mục (A1):** anh tự bấm trong Search Console theo danh sách tôi chuẩn bị, hay cho phép một bên (GPT hoặc tôi) thao tác trên tài khoản của anh? Đây là thao tác trên tài khoản cá nhân nên cần anh đồng ý rõ.
5. **Chuyên mục Ghi chép (D1):** tên và vị trí anh muốn? Đề nghị: "Ghi chép nhà sưu tầm", đặt trong menu Khám phá, ghi rõ là trải nghiệm cá nhân.
6. **Định hướng thương mại:** giữ định hướng kiến thức độc lập, không bán hàng hay đặt liên kết tiếp thị trong giai đoạn này (đề nghị)?
7. **Bản Anh (D4):** hoãn theo khuyến nghị, hay làm bản rút gọn 10–15 thương hiệu như GLM đề nghị?

---

## 6. Giới hạn

- Ước lượng công sức là ước lượng của tôi, chưa gồm thời gian chờ duyệt và chờ Google.
- Lỗi chuyên môn ở B1 là những lỗi đã có bằng chứng cụ thể. Các bài không được nêu không mặc nhiên đã đúng hoàn toàn.
- Số liệu Vercel là 30 ngày, lượng truy cập nhỏ, nên chỉ dùng để định hướng, chưa đủ để kết luận xu hướng. Số liệu do GLM đọc (75 khách, 289 lượt xem) và GPT, Claude đọc (73 khách, 286 lượt xem) lệch nhau chút ít do thời điểm đọc khác nhau.
- Số liệu Search Console do GPT đọc; tôi chưa tự mở được vì tài khoản Google đang đăng nhập trên Chrome không có trang này.
- Số trang Google sẽ lập chỉ mục phụ thuộc vào Google; kế hoạch chỉ tăng khả năng, không bảo đảm thời gian.
