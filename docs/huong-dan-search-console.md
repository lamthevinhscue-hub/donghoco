# Hướng dẫn Google Search Console — cho người không biết code

Ngày lập: 23/08/2026. Tài liệu này dành cho chủ website (anh Vinh) tự thao tác, không cần dev. GLM/agent KHÔNG tự thêm verification token — việc xác minh phải do chủ website thực hiện dưới đây.

## 1. Xác minh domain (làm một lần)

1. Vào https://search.google.com/search-console rồi đăng nhập tài khoản Google của anh.
2. Bấm "Thêm tài sản" (Add property) → chọn **Domain** (ô bên phải, có hình địa cầu) → nhập `kienthucdonghoco.vn`.
3. Google đưa ra một đoạn bản ghi DNS dạng `google-site-verification=...` — copy.
4. Mở trang quản lý DNS nơi anh mua tên miền (VD: nhà đăng ký domain) → thêm bản ghi **TXT** với giá trị vừa copy (host để trống hoặc `@`).
5. Quay lại Search Console bấm "Xác minh" (Verify). DNS có thể mất vài phút đến vài giờ để nhận.
6. Ưu điểm của cách Domain: bao gồm cả `www.` lẫn không `www.` và mọi đường dẫn con.

Lưu ý: nếu sau này đổi nơi quản lý DNS, phải thêm lại bản ghi xác minh.

## 2. Gửi sitemap

1. Trong Search Console, bên trái chọn **Sơ đồ trang (Sitemaps)**.
2. Ô "Thêm sơ đồ trang mới" chỉ cần nhập: `sitemap-index.xml` (vì đã có tên miền ở bước 1).
3. Bấm Gửi. Sau vài ngày trạng thái chuyển "Thành công" với số URL đã đọc được (hiện tại site có 206 trang).

## 3. Xem query / page / CTR / position

1. Mở **Hiệu quả (Performance)** ở menu trái.
2. Bốn chỉ số bật mặc định: Tổng lượt nhấp (Clicks), Tổng lần hiển thị (Impressions), CTR trung bình, Vị trí trung bình.
3. Xem theo từng tab dưới biểu đồ:
   - **Truy vấn (Queries)**: từ khóa người dùng gõ mà website xuất hiện.
   - **Trang (Pages)**: trang nào được hiển thị/nhấp nhiều nhất.

## 4. Tìm query có impression cao nhưng CTR thấp

1. Trong Hiệu quả → tab **Truy vấn** → bấm cột **Lần hiển thị** để sắp giảm dần.
2. Nhìn các dòng có hiển thị cao (VD trên 100/tháng) mà CTR dưới ~1–2%.
3. Với mỗi từ khóa như vậy, mở trang đang xếp hạng (xem tab Trang + lọc theo truy vấn) rồi cân nhắc:
   - viết lại tiêu đề bài cho khớp hơn ý người tìm;
   - rút gọn meta description cho hấp dẫn (dưới ~160 ký tự);
   - bổ sung đoạn đầu bài trả lời thẳng câu hỏi.
4. Ghi lại từ khóa + CTR trước/sau vào bảng theo tháng (mục 6) để so sánh.

## 5. Dùng Google Trends tìm nội dung đang tăng

1. Vào https://trends.google.com/trends → đổi khu vực sang **Việt Nam**.
2. Nhập chủ đề liên quan (VD: "đồng hồ cơ", "Submariner", "Seiko 5") → xem biểu đồ 12 tháng.
3. Xem mục "Các truy vấn liên quan đang tăng" — nếu một chủ đề tăng và website đã có bài: nâng cấp bài đó; chưa có bài: đưa vào hàng chờ của kế hoạch cluster (`ke-hoach-topic-cluster.md`) kèm ghi chú xu hướng kèm tháng quan sát.

## 6. Theo dõi theo tháng (thói quen 15 phút)

Vào ngày cố định mỗi tháng (VD: mùng 1), ghi lại vào một bảng tính đơn giản:

| Tháng | Clicks | Impressions | CTR tb | Position tb | 5 query tăng mạnh nhất | 5 query CTR thấp nhất cần cải thiện |

Sau 3 tháng sẽ có đủ dữ liệu thật để: cập nhật cột "số liệu thật" trong kế hoạch cluster, quyết định bài nào nâng cấp trước — thay cho mọi phỏng đoán volume từ khóa.

## Lưu ý quyền riêng tư

- Không gửi từ khóa người dùng gõ vào Ô TÌM KIẾM NỘI BỘ của website sang dịch vụ ngoài (kể cả analytics) khi chưa có chính sách riêng tư phù hợp và ghi rõ cho người dùng. Hiện tại Pagefind chạy hoàn toàn trong trình duyệt — giữ nguyên như vậy.
- Search Console chỉ cho thấy từ khóa mà Google gửi tới website — không phải dữ liệu người dùng của website, nên dùng được an toàn.
