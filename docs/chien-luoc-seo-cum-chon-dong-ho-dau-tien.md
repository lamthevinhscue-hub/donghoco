# Chiến lược cụm nội dung — "Chọn đồng hồ cơ đầu tiên"

- **Ngày lập:** 02/09/2026.
- **Bản chất tài liệu:** đây là **giả định cần kiểm chứng bằng dữ liệu thật** (Search Console/Analytics sau deploy). Tài liệu **không** chứa số lượng tìm kiếm, độ khó từ khóa hay dự báo traffic — dự án chưa có dữ liệu đó và không muốn thay giả định bằng con số bịa.

## 1. Ý định tìm kiếm giả định của người mới

Người mới mua chiếc đồng hồ cơ đầu tiên thường rơi vào một trong các trạng thái (giả định, chưa xác minh):

1. **"Tôi sắp mua nhưng chưa biết bắt đầu từ đâu"** — cần khung câu hỏi, không cần danh sách sản phẩm.
2. **"Tôi sợ mua nhầm kích thước"** — cần cách đo và hiểu lug-to-lug/độ dày.
3. **"Tôi phân vân lên dây tay hay tự động"** — cần so sánh trải nghiệm vận hành.
4. **"Tôi sợ mua phải hàng giả / mua ở chỗ không đáng tin"** — cần tiêu chí kiểm tra và giới hạn tự kiểm.
5. **"Tôi không biết chi phí sở hữu lâu dài"** — cần hiểu bảo dưỡng là một phần của sở hữu.

Nguyên tắc nội dung: **trả lời cho người đọc ra quyết định thận trọng**, không viết để nhắm cụm từ khóa; không dùng biến thể từ khóa nhồi vào tiêu đề, H2 hay anchor text.

## 2. Trang trụ cột

- `/huong-dan/chon-dong-ho-dau-tien/` — "Chọn đồng hồ cơ đầu tiên: khung quyết định cho người mới".
- Vai trò: điểm vào duy nhất cho ý định số 1; dẫn phần chi tiết sang các bài hỗ trợ thay vì gộp tất cả vào một bài dài.
- "Bàn quyết định" (DecisionMap) đầu bài đưa người đọc đi thẳng tới bài phù hợp theo nhu cầu.

## 3. Các bài hỗ trợ (đã tồn tại, không tạo mới)

| Bài | Ý định phục vụ (giả định) |
|---|---|
| `/huong-dan/chon-co-dong-ho` | Ý 2 — đo cổ tay, lug-to-lug, kích thước |
| `/co-che/chuyen-dong-co` | Ý 3 — nền tảng vận hành |
| `/huong-dan/len-day-dong-ho` | Ý 3 — thao tác lên dây tay |
| `/co-che/len-day-tu-dong` | Ý 3 — tự động |
| `/huong-dan/muc-chong-nuoc` | Ý 4 — ký hiệu chống nước, gioăng |
| `/huong-dan/nhan-biet-dong-ho-gia` | Ý 4 — rủi ro hàng giả, giới hạn tự kiểm |
| `/huong-dan/bao-duong-dong-ho` | Ý 5 — chi phí sở hữu lâu dài |

Cùng hệ: `/lo-trinh-hoc-dong-ho/` (bản đồ học), `/tu-dien` (tra thuật ngữ), `/giai-phau` (trải nghiệm cơ khí).

## 4. Liên kết hai chiều

- **Trụ cột → hỗ trợ:** 9 liên kết ngữ cảnh trong thân bài, mỗi link có anchor text mô tả nội dung đích (không anchor chung chung).
- **Hỗ trợ → trụ cột:** 5 bài hỗ trợ có một đoạn chuyển tiếp ngắn cuối bài dẫn về khung quyết định — chỉ đặt ở bài có ngữ cảnh thật, không nhồi.
- **DecisionMap:** 8 link điều hướng theo nhu cầu (không phải liên kết SEO — là điều hướng người đọc).
- Script `check-first-watch-cluster.mjs` bảo vệ toàn bộ cấu trúc trên trong `npm run check`.

## 5. Chỉ số cần theo dõi trong Search Console sau deploy

Chỉ theo dõi, không đặt mục tiêu số:

- **Hiển thị (impressions)** cho các truy vấn liên quan "chọn đồng hồ cơ đầu tiên" — bài trụ cột có thu được hiển thị mới so với trước?
- **CTR của truy vấn đó** — title mới có phản ánh đúng nội dung khiến người đọc bấm hơn không?
- **Trang đích trụ cột**: xu hướng hiển thị/click sau khi 5 bài hỗ trợ trỏ về.
- **Bài hỗ trợ** có xuất hiện cho các truy vấn chi tiết (đo cổ tay, chống nước, lên dây…) hay không.
- Dữ liệu cần thu tối thiểu 8–12 tuần mới đủ nhìn xu hướng; so sánh luôn cùng kỳ trước.

## 6. Những điều tài liệu này KHÔNG làm

- Không tuyên bố/cam kết thứ hạng hay traffic.
- Không dùng FAQPage/HowTo/rating schema — không thêm schema giả chỉ để tìm rich result.
- Không tạo bài mới chỉ để phủ từ khóa — mọi trang trong cụm đã tồn tại và có vai trò người đọc rõ.
