# HƯỚNG DẪN ĐO LƯỜNG — BẢN SỬA SAU KHI KIỂM LẠI PRODUCTION

**Ngày:** 19/09/2026
**Bản này thay thế toàn bộ nội dung cũ.** Bản đầu tiên tôi viết sáng nay dựa trên một kết luận sai — xem mục đính chính ngay dưới.
**Người thực hiện:** anh Vinh
**Thời gian:** khoảng 20 phút, chỉ còn một việc chứ không phải hai

> **Trạng thái tài liệu (đính chính gói H01, 19/09/2026):** đây là tài liệu nguồn đã được thẩm định bởi [Kế hoạch phát triển hợp nhất 19/09](KE-HOACH-PHAT-TRIEN-HOP-NHAT-2026-09-19.md) (mục 3.2), dùng làm đầu vào chi tiết cho gói **H02** — không phải lệnh thi công độc lập. Lệnh thi công hiện hành là [Bộ giao việc GLM 14 gói](BO-GIAO-VIEC-GLM-14-GOI-2026-09-19.md); vai trò từng tài liệu xem [Chỉ mục kế hoạch hiện hành](CHI-MUC-KE-HOACH-HIEN-HANH.md). Các giới hạn đo lường do kế hoạch hợp nhất bổ sung được ghi ngay tại chỗ bằng nhãn "**Đính chính H01**". Quy tắc chung: chỉ ghi số quan sát thực tế kèm ngày chụp, không suy từ beacon hay URL cũ.

---

# ĐÍNH CHÍNH — VERCEL ANALYTICS ĐANG CHẠY BÌNH THƯỜNG

Tôi đã kết luận sai. Bản trước tôi viết rằng Web Analytics "gần như chắc chắn chưa được bật trên Vercel". **Điều đó không đúng.**

Tôi vừa mở trực tiếp `https://www.kienthucdonghoco.vn` bằng trình duyệt thật và đo. Kết quả:

| Kiểm | Kết quả |
|---|---|
| Thẻ `<vercel-analytics>` trong HTML production | **Có** |
| `window.va` | **Đã định nghĩa** (dạng hàm) |
| `window.vam` | **`production`** |
| Script đã tải | `/8353d7638e565049/script.js` — `data-sdkn="@vercel/analytics/astro"`, `data-sdkv="2.0.1"` |
| Beacon lượt xem trang | `/8353d7638e565049/view` — **HTTP 200**, 302 byte, 355 ms |

**Kết luận đúng: Vercel Web Analytics đã bật, đang gửi dữ liệu, và đang hoạt động bình thường.** Không cần làm gì cả.

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.2):** beacon `/view` trả HTTP 200 chỉ chứng minh **một lần gửi được chấp nhận**; chưa chứng minh dashboard có dữ liệu đầy đủ hay đã tích lũy từ lâu. Đường dẫn `/8353d7638e565049/` là **quan sát tại một thời điểm**: không hardcode vào script hay tài liệu, không khẳng định mọi dự án Vercel luôn dùng đường dẫn ngẫu nhiên, và không suy mục đích của cơ chế khi chưa có tài liệu của Vercel xác nhận (đoạn "Mục đích là để trình chặn quảng cáo..." bên dưới cần đọc theo cách đó).

## Vì sao cả tôi và GLM đều nhìn sót

Đây là chi tiết đáng ghi lại để lần sau không lặp lại.

Khi Web Analytics được bật, Vercel **không** phục vụ script ở đường dẫn `/_vercel/insights/script.js` như tài liệu mô tả. Nó sinh ra một **đường dẫn ngẫu nhiên** — ở đây là `/8353d7638e565049/` — và đặt cả script lẫn ba điểm nhận dữ liệu (`/view`, `/event`, `/session`) dưới đường dẫn đó. Mục đích là để các trình chặn quảng cáo không nhận diện được theo tên.

Hệ quả: **bất kỳ phép đo nào lọc theo chuỗi "insights" đều trả về 0 kết quả, dù dữ liệu vẫn đang chảy.**

Báo cáo G03 ngày 12/09 lọc đúng theo cách đó và kết luận "0 request". Sáng nay tôi đọc mã trong bản build cục bộ, thấy đường dẫn `/_vercel/insights/script.js` và suy ra nguyên nhân nằm ở cấu hình — mà không mở production kiểm. Lần đầu tôi chạy phép đo trên production, tôi cũng lọc theo "insights" và cũng nhận 0. Chỉ khi liệt kê **toàn bộ** tài nguyên đã tải, không lọc gì, mới thấy script và beacon.

**Bài học:** với phép đo trên production, liệt kê hết rồi đọc, đừng lọc theo tên mình đoán trước.

---

# VIỆC DUY NHẤT CÒN LẠI — XÁC MINH GOOGLE SEARCH CONSOLE

Vercel Analytics cho biết **người đã vào trang làm gì**. Search Console cho biết **người ta gõ gì trên Google mà thấy trang** — tức là thứ quyết định trang có được tìm thấy hay không. Đây vẫn là khoảng trống thật, và vẫn chưa ai kiểm được vì không có quyền đăng nhập.

---

# VIỆC 2 — XÁC MINH GOOGLE SEARCH CONSOLE

**Thời gian:** khoảng 20 phút, trong đó phần lớn là chờ

## Bước 1 — Kiểm xem đã có chưa

1. Mở `search.google.com/search-console`, đăng nhập bằng tài khoản Google của anh.

2. Nhìn góc trên bên trái, có một ô chọn property.

   | Nếu thấy | Việc cần làm |
   |---|---|
   | Đã có `kienthucdonghoco.vn` hoặc `www.kienthucdonghoco.vn` | Chuyển thẳng xuống Bước 4 |
   | Trống, hoặc hiện màn hình chào mừng mời thêm property | Làm tiếp Bước 2 |

## Bước 2 — Thêm property

1. Bấm ô chọn property, chọn **Add property** (Thêm tài sản).

2. Google đưa ra hai lựa chọn. **Chọn ô bên trái: Domain.**

   Lý do chọn Domain thay vì URL prefix: một property Domain bao trọn cả `www` lẫn không `www`, cả `http` lẫn `https`. Chọn URL prefix thì phải tạo nhiều property riêng và số liệu bị chia nhỏ.

3. Gõ vào: `kienthucdonghoco.vn`

   **Không gõ `https://`, không gõ `www.`** — chỉ đúng tên miền.

4. Bấm **Continue**.

## Bước 3 — Xác minh quyền sở hữu bằng bản ghi DNS

Google sẽ hiện một chuỗi ký tự dạng `google-site-verification=` theo sau là một dãy ký tự dài. **Bấm nút Copy để sao chép nguyên chuỗi đó.**

Tiếp theo, vào nơi anh đang quản lý tên miền `kienthucdonghoco.vn` — đây là nhà cung cấp tên miền anh đã mua, không phải Vercel (trừ khi anh mua tên miền qua chính Vercel).

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.2):** nơi cần thêm bản ghi TXT là **nhà cung cấp DNS có nameserver đang có thẩm quyền** với tên miền — có thể **khác** nơi mua tên miền, và có thể là Vercel kể cả khi tên miền mua ở nơi khác. Kiểm nameserver trước khi tìm mục quản lý DNS.

1. Tìm mục quản lý DNS. Tên thường gặp: **DNS**, **DNS Records**, **Quản lý DNS**, hoặc **Name Server**.

2. Thêm một bản ghi mới với đúng ba thông tin sau:

   | Trường | Điền |
   |---|---|
   | Loại (Type) | **TXT** |
   | Tên (Name / Host) | **@** — dấu a còng, nghĩa là tên miền gốc. Một số nhà cung cấp để trống thay vì `@` |
   | Giá trị (Value / Content) | Dán nguyên chuỗi vừa sao chép từ Google |

   Nếu có ô TTL thì để mặc định, không cần sửa.

3. Lưu lại.

4. Quay về tab Search Console, bấm **Verify**.

   - Nếu báo thành công: xong.
   - Nếu báo chưa thấy bản ghi: **bình thường, không phải lỗi.** DNS cần thời gian lan truyền. Đóng lại, đợi khoảng 30 phút đến 2 giờ rồi vào lại bấm Verify. Có trường hợp mất tới 24 giờ.

**Quan trọng:** không xóa bản ghi TXT này sau khi xác minh xong. Google kiểm lại định kỳ; xóa đi thì mất quyền truy cập property.

## Bước 4 — Nộp sơ đồ trang

Việc này giúp Google biết trang có những gì mà không phải tự dò.

1. Trong Search Console, menu bên trái, bấm **Sitemaps** (Sơ đồ trang web).

2. Ở ô nhập, gõ: `sitemap-index.xml`

3. Bấm **Submit**.

4. Sau vài phút tải lại trang, cột trạng thái sẽ báo **Success** kèm số URL đã phát hiện.

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.2):** nộp bằng **URL đầy đủ** `https://www.kienthucdonghoco.vn/sitemap-index.xml`. Không hứa thời gian: trạng thái xử lý và số URL phát hiện không theo lịch cố định "vài phút" — ghi nhận kết quả thật khi kiểm.

Sơ đồ trang đã được sinh tự động bởi `@astrojs/sitemap` và đã bao gồm cả các đường dẫn `/en/`, nên chỉ cần nộp một lần.

## Bước 5 — Kiểm nhanh một trang

1. Ở thanh tìm kiếm trên cùng của Search Console, dán vào: `https://www.kienthucdonghoco.vn/lich-su/`

2. Nhấn Enter, đợi Google kiểm.

   | Kết quả | Nghĩa là |
   |---|---|
   | **URL is on Google** | Trang đã được lập chỉ mục, tốt |
   | **URL is not on Google** | Chưa lập chỉ mục. Bấm **Request Indexing** để yêu cầu |

   > **Đính chính H01 (Kế hoạch hợp nhất mục 3.2):** khi URL chưa được index, kiểm khả năng index, canonical và **lý do loại trừ** trong báo cáo trước khi bấm Request Indexing; yêu cầu index không phải bước mặc định.

Chỉ cần làm với một hoặc hai trang tiêu biểu, không cần làm với cả 262 bài.

---

# SAU KHI LÀM XONG

## Khi nào có số để xem

| Nguồn | Thời gian chờ |
|---|---|
| Search Console, mục Coverage | 1 đến 3 ngày |
| Search Console, mục Performance (truy vấn, lượt hiển thị, CTR) | 2 đến 3 ngày mới có dữ liệu đầu tiên |

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.2):** tên báo cáo hiện hành trong Search Console là **Pages / Page indexing**, không phụ thuộc tên cũ "Coverage" như bảng trên. Các con số "1 đến 3 ngày", "2 đến 3 ngày" là ước lượng — không cam kết có dữ liệu sau đúng thời hạn đó.

## Việc kèm theo — đọc số Vercel Analytics đã có sẵn

Vì Analytics đã chạy từ trước chứ không phải mới bật, **có thể đã có dữ liệu tích lũy để đọc ngay.** Anh vào `vercel.com`, mở dự án, bấm tab **Analytics** và xem.

Nếu có số, báo lại tôi ba mục: **tổng lượt xem trang trong 30 ngày**, **năm trang được xem nhiều nhất**, và **tỷ lệ thiết bị di động so với máy tính**.

## Bốn con số Search Console cần báo lại sau khoảng một tuần

Có bốn con số này thì mọi đề xuất nội dung tiếp theo mới có căn cứ, thay vì phỏng đoán:

1. **Tổng lượt hiển thị (Impressions)** trong 7 ngày — trang xuất hiện trên kết quả tìm kiếm bao nhiêu lần
2. **Năm truy vấn hàng đầu** — người ta gõ gì mà thấy trang
3. **Năm trang đích hàng đầu** — bài nào được vào nhiều nhất
4. **Tỷ lệ Việt Nam so với nước ngoài** — để biết bản tiếng Anh có được tìm thấy không

Bốn con số này sẽ trả lời trực tiếp câu hỏi quan trọng nhất hiện nay: **đầu tư vào bản tiếng Anh có đáng không, hay nên dồn toàn lực cho tiếng Việt.**

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.2):** phân tích bản EN theo **nhóm URL `/en/`**; quốc gia chỉ là chiều phân tích phụ — người ở Việt Nam có thể đọc EN, người ở nước ngoài có thể đọc VI. **Không quyết định dừng EN từ một tuần ít dữ liệu**: đánh giá sau khi các bài đã xuất bản, được thu thập dữ liệu và có khoảng quan sát đủ dài (kỳ cơ sở 28 ngày theo kế hoạch hợp nhất).

---

# NẾU GẶP TRỞ NGẠI

| Tình huống | Cách xử lý |
|---|---|
| Không nhớ tài khoản nào tạo dự án Vercel | Thử đăng nhập bằng tài khoản GitHub đã dùng để push mã |
| Không tìm thấy nơi quản lý DNS | Báo tôi tên nhà cung cấp tên miền, tôi tra hướng dẫn cụ thể của họ |
| Verify thất bại sau 24 giờ | Chụp màn hình bản ghi DNS đã thêm, gửi tôi kiểm giúp |
| Tab Analytics trên Vercel không có số nào | Chụp màn hình gửi tôi — Analytics đã xác nhận đang gửi dữ liệu, nên bảng trống sẽ là một chuyện khác cần tìm hiểu riêng |

Bất cứ bước nào thấy không khớp với mô tả ở trên, anh chụp màn hình gửi tôi — giao diện của Vercel và Google thay đổi khá thường xuyên, và tôi thà xem ảnh thật còn hơn đoán.

---

# GHI CHÚ CHO HỒ SƠ DỰ ÁN

Phát hiện về đường dẫn ngẫu nhiên nên được ghi vào biên bản G03, vì kết luận "0 request" trong báo cáo ngày 12/09 là **sai do phương pháp đo**, không phải do trang có vấn đề. Nếu không ghi lại, lần rà sau rất dễ lặp đúng lỗi đó lần thứ ba.

Cách đo đúng cho lần sau, chạy trong bảng điều khiển của trình duyệt trên trang production:

```
performance.getEntriesByType('resource').map(e => e.name)
```

Liệt kê toàn bộ, không lọc. Tìm dòng có đuôi `/view` — đó là beacon lượt xem trang.

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.2):** `performance.getEntriesByType('resource')` chỉ hỗ trợ **tìm tài nguyên**; đuôi `/view` tự nó chưa chứng minh đó là analytics. Kết luận dứt khoát cần xem Network với trạng thái, nội dung request và nguồn khởi tạo (initiator) của request.
