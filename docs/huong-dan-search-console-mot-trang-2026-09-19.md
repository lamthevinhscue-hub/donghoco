# HƯỚNG DẪN SEARCH CONSOLE — MỘT TRANG (19/09/2026)

Mục tiêu: xác minh quyền sở hữu `kienthucdonghoco.vn` bằng property **Domain** và nộp sơ đồ trang. Thời gian: khoảng 20 phút trong đó phần lớn là chờ. Không hứa thời gian Google xử lý — ghi nhận kết quả thật khi kiểm. Chỉ người có tài khoản thực hiện; không gửi mật khẩu hay mã xác thực cho ai.

**1. Kiểm đã có property chưa.** Mở `search.google.com/search-console`, đăng nhập. Nếu danh sách property đã có `kienthucdonghoco.vn` thì bỏ qua bước 2–3.

**2. Thêm property Domain.** Chọn **Add property** → chọn ô **Domain** (bao trọn cả `www`, không `www`, `http`, `https`) → gõ đúng `kienthucdonghoco.vn` (không gõ `https://`, không gõ `www.`) → Continue.

**3. Xác minh bằng bản ghi TXT — thêm tại dotVNDNS.** Google đưa chuỗi `google-site-verification=...`; bấm Copy. Nameserver đang có thẩm quyền của tên miền là **`ns1.dotvndns.vn` / `ns2.dotvndns.vn`** (tra ngày 19/09/2026) — vào trang quản trị DNS **của dotVNDNS/nhà đăng ký giữ DNS**, không phải Vercel. Thêm bản ghi:

| Trường | Điền |
|---|---|
| Loại | **TXT** |
| Tên/Host | **@** (một số giao diện để trống) |
| Giá trị | Chuỗi vừa copy từ Google |

Lưu, quay lại Search Console bấm **Verify**. Chưa thấy bản ghi ngay là bình thường — DNS cần thời gian lan truyền; đợi rồi bấm Verify lại. **Không xóa bản ghi TXT sau khi xác minh thành công** — Google kiểm lại định kỳ.

**4. Nộp sơ đồ trang.** Menu **Sitemaps** → nộp bằng **URL đầy đủ**: `https://www.kienthucdonghoco.vn/sitemap-index.xml` → Submit. Trạng thái xử lý và số URL phát hiện không theo lịch cố định; tải lại sau và đọc kết quả thật. Sitemap hiện gồm 289 URL (222 tiếng Việt và 67 tiếng Anh) — Google đọc trực tiếp tệp tại URL này; số URL có thể tăng khi xuất bản thêm bài.

**5. Kiểm một trang mẫu.** Thanh tìm kiếm trên cùng, dán `https://www.kienthucdonghoco.vn/lich-su/` → Enter. Nếu **URL is not on Google**: xem trước báo cáo **Pages / Page indexing** (không dùng tên cũ Coverage), kiểm khả năng index, canonical và **lý do loại trừ** — chỉ bấm **Request Indexing** sau khi đã rõ lý do; yêu cầu index không phải bước mặc định.

**6. Sau khi có số** — đọc theo nhịp trong `docs/DO-LUONG-CO-SO.md`: hằng tuần, đánh giá theo kỳ 28 ngày; phân tích bản EN theo nhóm URL `/en/`, không theo quốc gia.
