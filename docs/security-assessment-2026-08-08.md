# SECURITY ASSESSMENT — DỰ ÁN "ĐỒNG HỒ CƠ"

**Ngày đánh giá:** 08/08/2026
**Người đánh giá:** Principal Security Architect kiêm AI Security Specialist
**Phạm vi:** Kiến trúc luồng dữ liệu, bề mặt tấn công, chuỗi cung ứng phần mềm, và pipeline sinh nội dung
**Đối chiếu:** OWASP Top 10 (2021), OWASP Top 10 for LLM Applications, nguyên lý Defense in Depth

---

## TÓM TẮT ĐIỀU HÀNH

Trước khi vào chi tiết, ba kết luận về kiến trúc — chúng quyết định toàn bộ phần còn lại của báo cáo:

| Khảo sát | Kết quả |
|---|---|
| API routes / endpoint động | **0** |
| Astro adapter / chế độ SSR | **Không có** — xuất tĩnh hoàn toàn |
| File bật `prerender = false` | **0** |
| Cơ sở dữ liệu | **Không có** |
| Hệ thống xác thực / phiên đăng nhập | **Không có** |
| Tương tác LLM trong mã nguồn | **Không có** |

**Hệ quả trực tiếp:** trang này **không có máy chủ xử lý yêu cầu**. Mọi thứ người dùng nhận về là tệp tĩnh do CDN phục vụ.

Vì vậy các nhóm rủi ro anh yêu cầu rà soát rơi vào ba trạng thái rất khác nhau, và tôi sẽ trình bày trung thực thay vì cố tìm lỗi cho đủ mục:

| Nhóm rủi ro yêu cầu | Trạng thái thực tế |
|---|---|
| SQL Injection, NoSQL Injection | **Không áp dụng** — không có cơ sở dữ liệu |
| Command Injection | **Không áp dụng** — không có tiến trình phía máy chủ |
| BOLA / IDOR | **Không áp dụng** — không có đối tượng thuộc sở hữu ai, không có phân quyền |
| XSS | **Có bề mặt, rủi ro thấp** — chi tiết ở VULN-01 |
| DDoS / bòn rút tài nguyên | **Có rủi ro thật, nhưng khác dạng thông thường** — chi tiết ở VULN-02 |
| Prompt Injection / Jailbreak | **Không áp dụng cho mã nguồn** — nhưng **có ở tầng khác**, xem PHẦN 3 |
| Data Poisoning | **CÓ, và đây là rủi ro thực chất nhất của dự án** — xem VULN-04 |

**Kết luận tổng:** không có lỗ hổng nào cho phép chiếm quyền điều khiển, truy cập trái phép hay rò rỉ dữ liệu người dùng — vì **không có quyền để chiếm và không có dữ liệu người dùng để rò rỉ**. Bốn rủi ro thật được trình bày dưới đây thuộc nhóm **sẵn sàng dịch vụ**, **toàn vẹn chuỗi cung ứng** và **toàn vẹn nội dung**.

---

# PHẦN 1 — CÁC LỖ HỔNG PHÁT HIỆN

## 🔴 VULN-01 — DOM-based XSS tiềm ẩn qua ghép chuỗi HTML

**Vị trí:**
- `src/components/SearchBox.astro` — dòng 145 tới 153
- `src/pages/so-sanh.astro` — dòng 146, 147, 167, 168
- `src/components/WatchExplodedView.astro` — dòng 529, 536

**Phân loại:** OWASP A03:2021 Injection

### Phân tích luồng dữ liệu

Tôi truy ngược nguồn của từng biến được nội suy vào `innerHTML`:

| Biến | Nguồn | Do ai kiểm soát |
|---|---|---|
| `r.url`, `r.meta.title`, `r.excerpt` | Chỉ mục Pagefind sinh lúc build | Tác giả trang |
| `m.title`, `m.brand`, `m.year` | `modelsData` nhúng lúc build | Tác giả trang |
| `id` trong `WatchExplodedView` | Thuộc tính `data-part-id` viết cứng trong template | Tác giả trang |

**Không có biến nào đến từ đầu vào người dùng.** Từ khóa tìm kiếm người dùng gõ không được nội suy thẳng vào chuỗi HTML.

### Kịch bản tấn công

Kẻ tấn công **không có đường vào trực tiếp**. Chuỗi tấn công khả dĩ duy nhất cần **hai bước phụ thuộc nhau**:

1. **Bước 1 — chiếm quyền ghi vào kho mã.** Kẻ tấn công phải kiểm soát được repo GitHub, hoặc lừa được người bảo trì hợp nhất một pull request chứa nội dung độc.
2. **Bước 2 — nhúng payload vào một trường frontmatter**, ví dụ `title: "Rolex<img src=x onerror=alert(1)>"`. Chuỗi này sẽ được Pagefind đưa vào chỉ mục và sau đó nội suy vào `innerHTML` khi có người tìm kiếm.

**Nhận xét thẳng:** nếu kẻ tấn công đã đạt được Bước 1 thì XSS là mối lo nhỏ nhất — họ đã có thể sửa thẳng bất cứ thứ gì trên trang. Nghĩa là **lỗ hổng này không mở rộng quyền hạn cho kẻ tấn công**.

### Hậu quả

Thấp trong hiện trạng. Trở thành nghiêm trọng khi một trong ba điều xảy ra:

- Trang thêm tính năng bình luận hoặc nhận đóng góp nội dung từ người đọc.
- Chỉ mục tìm kiếm được thay bằng nguồn ngoài.
- Có bài viết nào vô tình chứa dấu nháy kép trong `title`, làm vỡ thuộc tính `href`.

### Phương án khắc phục

Đã có prompt chi tiết ở `docs/bo-prompt-glm-sua-loi-code-review.md` Phiên 4. Tóm tắt: chuyển sang `document.createElement` và `textContent`, riêng trường `excerpt` cần hàm lọc chỉ cho phép thẻ `<mark>`.

**Mức ưu tiên: trung bình.** Đây là phòng thủ theo chiều sâu, không phải vá lỗ hổng đang bị khai thác.

---

## 🟠 VULN-02 — Không có giới hạn tần suất, rủi ro "Denial of Wallet"

**Vị trí:** `vercel.json` — không khai báo `rateLimit`, không có tầng chặn nào phía trước

**Phân loại:** OWASP A05:2021 Security Misconfiguration; API4:2023 Unrestricted Resource Consumption

### Vì sao đây không phải DDoS thông thường

Trang tĩnh trên CDN **rất khó bị đánh sập theo nghĩa truyền thống** — không có tiến trình nào để làm cạn CPU, không có kết nối cơ sở dữ liệu nào để làm đầy. CDN của Vercel hấp thụ lưu lượng tốt.

**Nhưng có một biến thể nguy hiểm hơn với dự án cá nhân: bòn rút hạn mức băng thông.**

### Kịch bản tấn công

1. Kẻ tấn công viết một script đơn giản tải toàn bộ trang, hoặc chỉ nhắm vào các tài nguyên nặng nhất.
2. **Mục tiêu ưu tiên của kẻ tấn công:**
   - `/lich-su` — trang nặng nhất, **200 KB một lần tải**, chứa 39 khối SVG nội tuyến
   - Thư mục `/pagefind/` — các mảnh chỉ mục tìm kiếm, tải được trực tiếp không cần qua giao diện
3. Chạy vòng lặp từ vài chục địa chỉ IP, hoặc thuê một mạng máy tính ma giá rẻ.
4. Với gói Hobby của Vercel, hạn mức băng thông là hữu hạn. **Khi vượt hạn mức, trang bị chặn hoặc chuyển sang tính phí.**

**Chi phí cho kẻ tấn công: gần như bằng không. Hậu quả cho anh: trang biến mất khỏi mạng, hoặc phát sinh hóa đơn.**

### Hậu quả

- Trang ngừng phục vụ trong phần còn lại của chu kỳ thanh toán.
- Nếu bật thanh toán tự động, phát sinh chi phí ngoài dự kiến.
- Không mất dữ liệu, không lộ thông tin — nhưng mất khả năng phục vụ.

### Phương án khắc phục — ba lớp phòng thủ

**Lớp 1 — Đặt trần chi tiêu.** Trong bảng điều khiển Vercel, bật giới hạn chi tiêu và cảnh báo qua thư khi băng thông đạt ngưỡng. Đây là biện pháp **quan trọng nhất và mất năm phút**: nó biến rủi ro tài chính không giới hạn thành rủi ro có trần.

**Lớp 2 — Đưa tên miền qua Cloudflare.** Gói miễn phí cho phép: giới hạn tần suất theo địa chỉ IP, chặn trình thu thập tự động theo hành vi, và **quan trọng nhất là bộ nhớ đệm ở tầng Cloudflare** — lượt tải lặp lại được phục vụ từ Cloudflare, không tính vào hạn mức Vercel. Đây cũng chính là biện pháp tôi đã đề xuất ở phần bảo vệ nội dung, nay có thêm lý do thứ hai.

**Lớp 3 — Giảm trọng lượng trang nặng nhất.** `/lich-su` nặng 200 KB vì nhúng 39 khối SVG thẳng vào HTML. Chuyển các khối SVG này thành **tệp riêng được tham chiếu** thay vì nội tuyến sẽ vừa giảm kích thước HTML, vừa cho phép trình duyệt lưu đệm chúng giữa các lần tải.

---

## 🟠 VULN-03 — Chuỗi cung ứng: phụ thuộc không ghim phiên bản, không có kiểm tra tự động

**Vị trí:** `package.json` — toàn bộ 6 phụ thuộc

**Phân loại:** OWASP A08:2021 Software and Data Integrity Failures

### Phát hiện

| Khảo sát | Kết quả |
|---|---|
| Phụ thuộc trực tiếp | 6, **toàn bộ dùng tiền tố `^`** |
| Tổng số gói cài thực tế | **472 gói** |
| Tệp khóa phiên bản | Có `package-lock.json` |
| Quy trình kiểm tra tự động trước khi triển khai | **Không có** — thư mục `.github/workflows` không tồn tại |

Tiền tố `^` cho phép tự nâng phiên bản phụ và bản vá. Nghĩa là **mã chạy trên trang có thể khác mã anh đã kiểm**, nếu môi trường dựng không dùng tệp khóa.

Con số đáng chú ý hơn: **472 gói**. Sáu phụ thuộc trực tiếp kéo theo bốn trăm bảy mươi hai gói. Mỗi gói là một tác giả, một kho mã, một tài khoản có thể bị chiếm.

### Kịch bản tấn công

Đây là kịch bản đã xảy ra nhiều lần với hệ sinh thái npm:

1. Kẻ tấn công chiếm tài khoản của người bảo trì **một gói phụ nhỏ** nằm sâu trong cây phụ thuộc — không phải Astro hay Tailwind, mà một thư viện tiện ích mà không ai để ý.
2. Phát hành một bản vá mới chứa mã độc trong script `postinstall` hoặc trong logic dựng trang.
3. Lần triển khai kế tiếp của anh, Vercel chạy `npm install`. Nếu tệp khóa không được tôn trọng nghiêm ngặt, gói độc được cài.
4. Mã độc chạy **trong môi trường dựng**, có toàn quyền ghi vào thư mục xuất. Nó có thể chèn script theo dõi, chèn mã đào tiền mã hóa, hoặc chuyển hướng người đọc — vào **mọi trang** của site.

**Điểm đáng lo:** anh sẽ không biết. Trang trông vẫn bình thường, `npm run build` vẫn báo thành công.

### Hậu quả

Đây là **kịch bản có hậu quả nặng nhất trong toàn bộ báo cáo**: kiểm soát hoàn toàn nội dung phục vụ tới mọi người đọc, kéo dài cho tới khi có người phát hiện.

### Phương án khắc phục

**Việc 1 — Buộc dùng tệp khóa khi dựng.** Trong `vercel.json`, đổi `installCommand` từ `npm install` sang **`npm ci`**. Lệnh này cài đúng phiên bản trong tệp khóa và **báo lỗi nếu tệp khóa không khớp `package.json`** — thay vì âm thầm nâng phiên bản.

Đây là sửa **một dòng**, và là biện pháp có tỷ lệ hiệu quả trên công sức cao nhất trong cả báo cáo.

**Việc 2 — Quét lỗ hổng định kỳ.** Chạy `npm audit` mỗi tháng. Nếu muốn tự động, bật Dependabot của GitHub — miễn phí, tự mở pull request khi có gói phụ thuộc dính lỗ hổng đã công bố.

**Việc 3 — Cân nhắc ghim phiên bản chính xác.** Bỏ tiền tố `^` cho sáu phụ thuộc trực tiếp, nâng thủ công khi có nhu cầu. Đánh đổi: mất bản vá tự động, đổi lấy tính tái lập được. Với dự án ít thay đổi như trang này, tôi nghiêng về **ghim**.

---

## 🟡 VULN-04 — Data Poisoning trong pipeline sinh nội dung

**Vị trí:** Không nằm trong mã nguồn — nằm ở **quy trình sản xuất nội dung**

**Phân loại:** OWASP LLM03:2025 Supply Chain; LLM09:2025 Misinformation

### Vì sao mục này tồn tại trong báo cáo

Mã nguồn **không có tương tác LLM nào**, nên Prompt Injection và Jailbreak theo nghĩa kỹ thuật **không áp dụng**. Tôi đã kiểm và xác nhận điều đó.

Nhưng nếu dừng ở đó thì bỏ sót rủi ro thực chất nhất của dự án này. Vì:

**Toàn bộ nội dung của trang được sinh ra bởi một pipeline LLM.** Một mô hình viết bài, một mô hình khác rà soát và cung cấp dữ liệu. Đây **chính là một chuỗi cung ứng nội dung do AI vận hành** — và nó có đầy đủ đặc tính rủi ro của một chuỗi cung ứng.

### Bằng chứng từ chính lịch sử dự án

Đây không phải rủi ro lý thuyết. Nhật ký nghiệm thu trong `docs/nghiem-thu/` ghi nhận các lần nhiễm bẩn dữ liệu đã thực sự xảy ra và **đã được xuất bản công khai trước khi phát hiện**:

| Sự cố | Bản chất |
|---|---|
| Bốn lần lọt ký tự Trung, Kirin, Ả Rập vào nội dung tiếng Việt | Nhiễu từ dữ liệu huấn luyện rò rỉ vào đầu ra |
| Hai xưởng chế tác Grand Seiko bị đảo ngược vai trò | Ảo giác dữ kiện, trình bày với giọng điệu chắc chắn |
| Sai quốc tịch người sáng lập Greubel Forsey | Ảo giác dữ kiện |
| Sai thành phần vật liệu Ceratanium | Ảo giác dữ kiện |
| Sai chủ sở hữu và loại thép của Tudor | Ảo giác dữ kiện |
| Mã calibre IWC `89000` không tồn tại | Bịa mã sản phẩm |
| Nhầm grande sonnerie với minute repeater | Sai khái niệm chuyên môn |

### Kịch bản rủi ro

**Kịch bản A — Nhiễm bẩn do lỗi, đang diễn ra.** Không cần kẻ tấn công. Mô hình sinh ra dữ kiện sai với văn phong tự tin, nội dung được xuất bản, người đọc tin. Với trang tự định vị là nguồn tham khảo chuyên môn, **đây là hỏng đúng thứ tạo nên giá trị của nó**.

**Kịch bản B — Nhiễm bẩn có chủ đích qua gói dữ liệu.** Quy trình hiện tại là: một tài liệu dữ liệu được đưa cho mô hình, mô hình dựng nội dung từ đó. Nếu ai đó chèn được dữ kiện sai vào một tài liệu như vậy — hoặc nếu bản thân tài liệu được sinh ra từ nguồn đã bị nhiễm — thì nội dung sai được xuất bản với đầy đủ vẻ ngoài của một nguồn có dẫn chứng.

**Kịch bản C — Chèn lệnh gián tiếp nhắm vào tác nhân AI khác.** Trang là công khai và sẽ được các tác nhân AI duyệt web đọc. Văn bản ẩn nhúng trong nội dung có thể được dùng để thao túng các tác nhân đó.

**Tôi đã kiểm điểm này: `src/content/` hiện KHÔNG có văn bản ẩn, khối chú thích HTML hay phần tử bị che nào.** Đây là kết quả tốt và cần duy trì.

### Hậu quả

Không phá hệ thống — **phá uy tín**. Với trang nội dung chuyên môn, một dữ kiện sai bị độc giả am hiểu phát hiện gây thiệt hại lâu dài hơn nhiều so với một sự cố kỹ thuật.

### Phương án khắc phục

**Biện pháp 1 — Ghi rõ nguồn cho mọi dữ kiện.** Các gói dữ liệu hiện đã liệt kê nguồn, nhưng **nguồn không hiện ra trang**. Đề xuất: mỗi trang thương hiệu và mẫu iconic có một mục nguồn tham khảo ở cuối. Vừa tăng độ tin cậy, vừa cho phép độc giả tự kiểm — biến người đọc thành lớp phòng thủ.

**Biện pháp 2 — Duy trì nguyên tắc thà thiếu còn hơn sai.** Cơ chế `CAN-KIEM-CHUNG.md` hiện có là một biện pháp kiểm soát tốt và **hiếm thấy**. Giữ nghiêm.

**Biện pháp 3 — Kiểm tự động trước khi triển khai.** Ba phép kiểm dưới đây phát hiện được phần lớn sự cố đã xảy ra, và nên chạy tự động thay vì để tôi rà thủ công:

- Quét ký tự ngoài bảng chữ Latin và chữ Việt — **bốn lần tái diễn, cần tự động hóa**
- Quét liên kết nội bộ hỏng
- Quét văn bản ẩn trong thư mục nội dung

**Biện pháp 4 — Không bỏ vòng rà soát của con người.** Đây là biện pháp kiểm soát quan trọng nhất, và cũng là thứ dễ bị cắt bỏ nhất khi thấy sốt ruột.

---

# PHẦN 2 — CÁC NHÓM RỦI RO KHÔNG ÁP DỤNG

Tôi ghi rõ để anh có căn cứ trả lời khi ai đó hỏi, và để biết **khi nào các mục này trở nên áp dụng**.

| Nhóm | Vì sao không áp dụng | Trở nên áp dụng khi |
|---|---|---|
| **SQL / NoSQL Injection** | Không có cơ sở dữ liệu. Nội dung là tệp Markdown biên dịch lúc build | Thêm bình luận, tài khoản, hay lưu trữ động |
| **Command Injection** | Không có tiến trình phía máy chủ nhận đầu vào | Thêm API route hoặc serverless function |
| **BOLA / IDOR** | Không có đối tượng thuộc sở hữu ai. Mọi trang đều công khai với mọi người | Thêm nội dung riêng tư hoặc phân quyền |
| **Broken Authentication** | Không có xác thực | Thêm khu vực quản trị |
| **SSRF** | Không có mã phía máy chủ tạo yêu cầu mạng | Thêm chức năng lấy dữ liệu từ nguồn ngoài lúc chạy |
| **Prompt Injection / Jailbreak** | Mã nguồn không gọi LLM nào | Thêm trợ lý hỏi đáp hoặc tìm kiếm ngữ nghĩa |

**Cảnh báo cho tương lai:** nếu sau này thêm một trợ lý hỏi đáp về đồng hồ — điều rất hợp lý với trang này — thì **toàn bộ nhóm LLM Top 10 lập tức áp dụng**: chèn lệnh trực tiếp và gián tiếp, rò rỉ chỉ thị hệ thống, bòn rút hạn mức gọi mô hình. Khi đó cần đánh giá lại từ đầu.

---

# PHẦN 3 — THỨ TỰ XỬ LÝ ĐỀ NGHỊ

Xếp theo **tỷ lệ giảm rủi ro trên công sức**, không theo mức nghiêm trọng danh nghĩa:

| Ưu tiên | Việc | Công sức | Rủi ro giảm được |
|---|---|---|---|
| **1** | Đổi `installCommand` thành `npm ci` trong `vercel.json` | **1 dòng** | Chặn kịch bản có hậu quả nặng nhất báo cáo này |
| **2** | Đặt trần chi tiêu và cảnh báo băng thông trên Vercel | **5 phút** | Biến rủi ro tài chính không trần thành có trần |
| **3** | Tự động hóa ba phép quét trước khi triển khai | Vừa | Chặn lỗi đã tái diễn bốn lần |
| **4** | Đưa tên miền qua Cloudflare | Vừa | Giới hạn tần suất, chặn thu thập, giảm băng thông |
| **5** | Sửa VULN-01 theo Phiên 4 đã soạn | Vừa | Phòng thủ theo chiều sâu |
| **6** | Bật Dependabot, ghim phiên bản | Nhẹ | Giảm rủi ro chuỗi cung ứng lâu dài |
| **7** | Hiện nguồn tham khảo trên trang | Lớn | Chống nhiễm bẩn nội dung, tăng độ tin cậy |

---

# GHI CHÚ CUỐI CỦA NGƯỜI ĐÁNH GIÁ

**Về việc không tìm thấy nhiều lỗ hổng.** Một số báo cáo bảo mật cố kéo dài danh sách để tỏ ra kỹ lưỡng. Tôi không làm vậy. Kiến trúc tĩnh của trang này **loại bỏ phần lớn OWASP Top 10 ngay từ khâu thiết kế** — đó là thành tựu kiến trúc, không phải may mắn, và đáng được ghi nhận đúng mức. Rất nhiều dự án cùng loại chọn nền tảng động không cần thiết rồi phải gánh cả núi rủi ro đi kèm.

**Về việc đâu mới là rủi ro thật.** Nếu anh chỉ làm một việc trong báo cáo này, hãy đổi `npm install` thành `npm ci`. Đó là một dòng, và nó chặn đúng kịch bản duy nhất trong báo cáo có thể trao quyền kiểm soát toàn bộ nội dung trang cho người ngoài.

**Về Data Poisoning.** Đây là phần tôi muốn anh chú ý nhất, vì nó không giống một vấn đề bảo mật nên rất dễ bị coi nhẹ. Trang này có một đặc điểm ít trang nào có: **toàn bộ nội dung do AI sinh ra**. Cơ chế kiểm soát mà dự án đã tự dựng lên — nguyên tắc thà thiếu còn hơn sai, danh sách chờ kiểm chứng, các vòng rà soát độc lập — thực chất là **một khung quản trị rủi ro AI**, dù không ai gọi tên nó như vậy. Nó đang hoạt động. Đừng bỏ nó khi thấy sốt ruột muốn xuất bản nhanh.
