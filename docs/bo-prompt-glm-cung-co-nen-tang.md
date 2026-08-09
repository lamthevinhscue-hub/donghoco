# BỘ PROMPT GIAO GLM — CỦNG CỐ NỀN TẢNG

**Ngày soạn:** 08/08/2026
**Căn cứ:** `docs/security-assessment-2026-08-08.md`
**Bối cảnh:** GLM đã hoàn thành cả 6 phiên sửa lỗi code review. Bộ này xử lý các vấn đề còn lại mà tôi đánh giá là **trọng yếu**, xếp theo tỷ lệ giảm rủi ro trên công sức.

| Gói | Việc | Công sức | Vì sao trọng yếu |
|---|---|---|---|
| **A** | Nối ba script kiểm tra vào quy trình dựng | Nhẹ | **Ba script đã có nhưng không ai gọi** — chặn được loại lỗi đã tái diễn bốn lần |
| **B** | Đổi `npm install` thành `npm ci`, bật Dependabot | **1 dòng** + 1 file | Chặn kịch bản có hậu quả nặng nhất trong toàn bộ đánh giá bảo mật |
| **C** | Chốt Content-Security-Policy | Vừa | Đang ở chế độ chỉ báo cáo, chưa bảo vệ gì |
| **D** | Giảm trọng lượng trang Lịch sử | Vừa | 196 KB một lần tải, là mục tiêu của tấn công bòn rút băng thông |

---

# GÓI A — NỐI BA SCRIPT KIỂM TRA VÀO QUY TRÌNH DỰNG

> **Đây là gói quan trọng nhất trong bộ này.** Anh đã viết ba script kiểm tra rất tốt, nhưng **chúng đang là mã chết** — không có gì gọi chúng.
>
> ## Bằng chứng
>
> Thư mục `scripts/` có bốn tệp:
>
> ```
> generate-glossary-terms.mjs      ← được gọi
> scan-chars.mjs                   ← KHÔNG ai gọi
> check-links.mjs                  ← KHÔNG ai gọi
> check-duplicate-classes.mjs      ← KHÔNG ai gọi
> ```
>
> Nhưng `package.json` chỉ có:
>
> ```json
> "build": "node scripts/generate-glossary-terms.mjs && astro build"
> ```
>
> **Ba script kia không xuất hiện ở bất kỳ đâu.** Chúng chỉ chạy khi có người nhớ gõ tay — mà điều đó thì không xảy ra.
>
> Đây là tình trạng nguy hiểm hơn cả việc không có script: nó tạo **cảm giác an toàn giả**. Nhìn vào repo thấy có kiểm tra ký tự lạ, nhưng lỗi ký tự Hán trong `CoAxial.astro` vẫn lọt ra bản dựng và tồn tại cho tới khi tôi rà thủ công.
>
> ## Việc cần làm
>
> **A1. Sửa `check-duplicate-classes.mjs` để biết thất bại**
>
> Hai script kia đã có `process.exit(1)` khi phát hiện lỗi. Riêng script này **không có** — nó báo cáo rồi thoát bình thường, nghĩa là dù có gọi cũng không chặn được gì.
>
> Bổ sung: khi phát hiện chuỗi class trùng lặp, in danh sách rồi `process.exit(1)`.
>
> **A2. Thêm một lệnh kiểm tra gộp vào `package.json`**
>
> ```json
> "check": "node scripts/scan-chars.mjs && node scripts/check-duplicate-classes.mjs"
> ```
>
> Lưu ý thứ tự: hai script này kiểm **mã nguồn**, chạy được trước khi dựng.
>
> **A3. Nối vào quy trình dựng, đúng thứ tự**
>
> ```json
> "build": "npm run check && node scripts/generate-glossary-terms.mjs && astro build && node scripts/check-links.mjs"
> ```
>
> Giải thích thứ tự — **quan trọng, đừng đảo:**
>
> 1. `npm run check` chạy **trước** vì kiểm mã nguồn, phát hiện sớm thì khỏi tốn thời gian dựng.
> 2. `generate-glossary-terms.mjs` chạy tiếp vì `astro build` cần tệp nó sinh ra.
> 3. `astro build` dựng trang.
> 4. `check-links.mjs` chạy **sau cùng** vì nó quét thư mục `dist/`, phải có bản dựng rồi mới kiểm được.
>
> **A4. Kiểm ba script chạy đúng trên hiện trạng**
>
> Chạy `npm run build` và xem kết quả. **Có thể build sẽ thất bại ngay lần đầu** — đó là dấu hiệu tốt, nghĩa là script đang làm việc. Nếu thất bại:
>
> - Đọc kỹ script báo lỗi gì.
> - **Sửa lỗi nội dung, không nới lỏng script.**
> - Nếu script báo sai (dương tính giả), sửa logic script cho chính xác hơn, và **báo lại cho tôi biết đã sửa gì**.
>
> **A5. Bổ sung phép quét thứ tư: văn bản ẩn**
>
> Viết thêm `scripts/scan-hidden-text.mjs` quét thư mục `src/content/` tìm:
>
> - Thuộc tính hoặc kiểu ẩn phần tử: `display:none`, `visibility:hidden`, `opacity:0`, `font-size:0`
> - Khối chú thích HTML `<!-- -->`
> - Phần tử đặt ngoài màn hình bằng tọa độ âm lớn
>
> Nếu tìm thấy thì in vị trí và `process.exit(1)`.
>
> **Lý do:** trang là công khai và sẽ được các tác nhân AI duyệt web đọc. Văn bản ẩn nhúng trong nội dung có thể bị dùng để thao túng những tác nhân đó. Hiện `src/content/` **sạch hoàn toàn** — phép quét này giữ cho nó sạch.
>
> Thêm script mới vào lệnh `check` ở bước A2.
>
> ## Nghiệm thu
>
> - `npm run build` chạy đủ bốn bước theo đúng thứ tự.
> - **Thử phá có chủ đích:** tạm chèn một ký tự Hán vào một file trong `src/`, chạy `npm run build`, xác nhận **build thất bại**. Xóa ký tự đó đi, build lại thành công. Đây là phép thử bắt buộc — không làm thì không biết script có thật sự chặn hay không.
> - Làm tương tự với một link nội bộ hỏng.
> - Báo lại kết quả cả hai phép thử.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

---

# GÓI B — CHUỖI CUNG ỨNG: `npm ci` VÀ DEPENDABOT

> Gói này có **tỷ lệ giảm rủi ro trên công sức cao nhất trong toàn bộ đánh giá bảo mật**. Việc chính là sửa một dòng.
>
> ## Bối cảnh rủi ro
>
> `vercel.json` hiện có:
>
> ```json
> "installCommand": "npm install"
> ```
>
> Sáu phụ thuộc trực tiếp đều dùng tiền tố `^`, cho phép tự nâng phiên bản phụ và bản vá. Tệp khóa kéo theo **472 gói** — sáu phụ thuộc trực tiếp, bốn trăm bảy mươi hai gói thực tế. Mỗi gói là một tác giả, một tài khoản có thể bị chiếm.
>
> **Kịch bản:** ai đó chiếm tài khoản người bảo trì một gói phụ nhỏ nằm sâu trong cây phụ thuộc, phát hành bản vá chứa mã độc. Lần triển khai kế tiếp, `npm install` có thể kéo về bản đó. Mã độc chạy **trong môi trường dựng, với toàn quyền ghi vào thư mục xuất** — nghĩa là chèn được bất cứ thứ gì vào mọi trang.
>
> Điểm đáng lo nhất: sẽ không ai biết. Trang trông bình thường, build báo thành công.
>
> ## B1. Đổi lệnh cài đặt
>
> Trong `vercel.json`, đổi:
>
> ```json
> "installCommand": "npm ci"
> ```
>
> Khác biệt: `npm ci` cài **đúng phiên bản trong tệp khóa** và **báo lỗi nếu tệp khóa không khớp `package.json`**, thay vì âm thầm nâng phiên bản. Đây là hành vi đúng cho môi trường triển khai.
>
> **Kiểm bắt buộc sau khi đổi:** `npm ci` khắt khe hơn `npm install`. Nếu `package-lock.json` đang lệch với `package.json` thì lệnh sẽ thất bại. Chạy thử tại máy trước khi đẩy lên. Nếu lệch, chạy `npm install` một lần cho đồng bộ lại tệp khóa, commit tệp khóa, rồi mới đổi sang `npm ci`.
>
> ## B2. Bật Dependabot
>
> Tạo `.github/dependabot.yml`:
>
> - Theo dõi hệ sinh thái `npm`, thư mục gốc.
> - Kiểm hằng tuần.
> - Giới hạn số pull request mở cùng lúc ở mức thấp, khoảng 3 tới 5, để không bị ngập.
>
> Dependabot miễn phí, tự mở pull request khi có gói phụ thuộc dính lỗ hổng đã công bố. Với dự án mà chủ dự án không theo dõi tin bảo mật hằng ngày, đây là lớp phòng thủ hợp lý nhất.
>
> ## B3. Chạy quét lỗ hổng một lần ngay bây giờ
>
> Chạy `npm audit` và **báo lại kết quả cho tôi**. Nếu có lỗ hổng mức cao hoặc nghiêm trọng, **chưa tự sửa** — báo trước để tôi xem, vì `npm audit fix` đôi khi nâng phiên bản gây vỡ.
>
> ## Việc KHÔNG làm ở gói này
>
> **Chưa bỏ tiền tố `^`** để ghim phiên bản chính xác. Việc đó có đánh đổi — mất bản vá tự động — nên để anh Vinh quyết sau khi thấy Dependabot hoạt động thế nào.
>
> ## Nghiệm thu
>
> - `vercel.json` dùng `npm ci`.
> - Triển khai lên Vercel thành công với lệnh mới.
> - Có `.github/dependabot.yml`.
> - Đã báo kết quả `npm audit`.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm.

---

# GÓI C — CHỐT CONTENT-SECURITY-POLICY

> CSP hiện đang ở chế độ `Content-Security-Policy-Report-Only`. Ở chế độ này trình duyệt **chỉ ghi cảnh báo, không chặn gì** — nghĩa là **hiện tại CSP chưa bảo vệ được gì cả**. Nó chỉ là bước thăm dò.
>
> Năm header còn lại đã áp đúng và đang có tác dụng: `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `Permissions-Policy`.
>
> ## C1. Thu thập báo cáo vi phạm
>
> Mở bản đã triển khai bằng cửa sổ ẩn danh, bật bảng điều khiển trình duyệt, **đi qua ít nhất tám trang khác loại nhau**:
>
> 1. Trang chủ
> 2. Một trang thương hiệu bất kỳ
> 3. Một bài cơ chế **có hoạt ảnh** — ví dụ `/co-che/tourbillon`
> 4. Trang Lịch sử
> 5. Trang Giải phẫu
> 6. Trang So sánh, có chọn hai mẫu
> 7. **Mở ô tìm kiếm và gõ một từ khóa** — đây là chỗ dễ vi phạm CSP nhất
> 8. Trang Từ điển
>
> Ở mỗi trang, thử cả **chế độ sáng và chế độ tối**.
>
> **Ghi lại từng cảnh báo vi phạm CSP**, gồm chỉ thị nào bị vi phạm và nguồn tài nguyên nào bị chặn.
>
> ## C2. Báo cáo, chưa chuyển chế độ
>
> Gửi tôi danh sách vi phạm theo mẫu:
>
> | Trang | Chỉ thị bị vi phạm | Nguồn bị chặn |
> |---|---|---|
>
> **Nếu danh sách trống**, ghi rõ là trống — đó là kết quả tốt và cũng cần biết.
>
> **Tuyệt đối chưa đổi tên header sang chế độ chặn.** Việc đó chờ tôi duyệt danh sách.
>
> ## Vì sao phải cẩn thận
>
> Bật CSP ở chế độ chặn mà thiếu một nguồn hợp lệ sẽ làm **vỡ tính năng một cách im lặng** — ví dụ tìm kiếm ngừng hoạt động nhưng chỉ hiện dòng "chưa sẵn sàng", không báo lỗi. Người dùng sẽ không báo, và anh sẽ không biết.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm.

---

# GÓI D — GIẢM TRỌNG LƯỢNG TRANG LỊCH SỬ

> Trang `/lich-su` nặng **196 KB cho riêng tệp HTML**, gấp khoảng ba lần trang nặng thứ hai. Nguyên nhân: **39 khối SVG nhúng thẳng vào HTML**.
>
> ## Vì sao đáng sửa
>
> Hai lý do, lý do thứ hai ít người nghĩ tới:
>
> 1. **Trải nghiệm người đọc.** Đây là trang độc bản nhất của site nhưng lại nặng nhất, và trên mạng di động chậm thì tải lâu.
> 2. **Đây là mục tiêu của tấn công bòn rút băng thông.** Trang tĩnh khó bị đánh sập, nhưng hạn mức băng thông thì hữu hạn. Một script tải lặp trang nặng nhất là cách rẻ nhất để làm cạn hạn mức. Giảm trọng lượng trang này là **giảm trực tiếp chi phí của kịch bản đó**.
>
> ## Việc cần làm
>
> **D1. Tách các khối SVG lặp lại ra tệp riêng**
>
> Rà 39 khối SVG trong `src/pages/lich-su.astro` và các component nó dùng, phân loại:
>
> - **Khối lặp lại nhiều lần** — ví dụ biểu tượng, hoa văn nền, dấu mốc: tách thành tệp riêng trong `public/images/`, tham chiếu qua thẻ `<img>` hoặc `<use>`. Trình duyệt sẽ **lưu đệm chúng**, tải một lần dùng cho cả trang.
> - **Khối chỉ dùng một lần**: giữ nội tuyến, không cần tách.
>
> **D2. Rút gọn tọa độ**
>
> Nếu các khối SVG còn lại có số thập phân dài, làm tròn xuống tối đa hai chữ số. Việc này thường giảm được đáng kể mà không ảnh hưởng hình vẽ.
>
> **D3. Kiểm tải chậm cho ảnh minh họa**
>
> 28 hình minh họa timeline hiện dùng component `WatchImage`. Xác nhận chúng có `loading="lazy"` — trừ vài hình đầu tiên nằm trong màn hình đầu, những hình đó nên tải ngay.
>
> ## Mục tiêu
>
> Đưa `/lich-su` xuống **dưới 120 KB**. Không cần ép xuống thấp hơn nếu phải hy sinh chất lượng hình.
>
> ## Nghiệm thu
>
> - Báo lại kích thước trước và sau.
> - **Mở trang kiểm bằng mắt:** 28 hình minh họa vẫn hiện đúng, hoạt ảnh timeline vẫn chạy, bộ lọc ba lớp vẫn hoạt động.
> - Kiểm trên điện thoại.
> - Chạy `npm run build` — nay đã có bốn phép kiểm tự động ở Gói A, phải qua hết.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm.

---

# BA VIỆC ANH VINH PHẢI TỰ LÀM — KHÔNG GIAO GLM ĐƯỢC

Ba việc sau nằm ngoài mã nguồn, GLM không làm thay được. Xếp theo mức quan trọng:

## 1. Đặt trần chi tiêu trên Vercel — 5 phút, làm ngay

Vào bảng điều khiển Vercel, phần cài đặt thanh toán:

- Bật **giới hạn chi tiêu** ở mức anh chấp nhận được.
- Bật **cảnh báo qua thư** khi băng thông đạt 50% và 80% hạn mức.

**Vì sao quan trọng:** đây là biện pháp biến rủi ro tài chính không giới hạn thành rủi ro có trần. Nếu ai đó cố làm cạn băng thông, tệ nhất là trang tạm ngừng — không phải một hóa đơn bất ngờ.

## 2. Đưa tên miền qua Cloudflare — khi chuẩn bị công bố

Gói miễn phí cho ba thứ cùng lúc:

- **Giới hạn tần suất theo địa chỉ IP** — chặn script tải lặp.
- **Chặn trình thu thập AI ở tầng mạng** — hiệu quả hơn `robots.txt` vì không phụ thuộc vào việc bot có tự nguyện tuân thủ.
- **Bộ nhớ đệm ở tầng Cloudflare** — lượt tải lặp được phục vụ từ Cloudflare, **không tính vào hạn mức Vercel**.

Đây là biện pháp giải quyết cùng lúc cả rủi ro băng thông lẫn mong muốn bảo vệ nội dung của anh.

## 3. Kiểm thử trên điện thoại thật — trước khi công bố

Việc này tôi đã đề nghị từ biên bản ngày 06/08 và vẫn chưa làm. Site nay có **18 hoạt ảnh cơ chế, bốn bài hướng dẫn có thành phần tương tác, trang Giải phẫu, bộ lọc, tìm kiếm không dấu, chế độ tối, menu xổ** — toàn những chỗ hỏng thầm lặng mà kiểm mã không thấy.

Danh sách bảy việc thử nằm trong `docs/nghiem-thu/2026-08-06_danh-gia-tong-the-va-lo-trinh-tiep.md`.

---

# THỨ TỰ ĐỀ NGHỊ

| Bước | Việc | Ai làm |
|---|---|---|
| 1 | **Gói B** — `npm ci` | GLM |
| 2 | **Đặt trần chi tiêu Vercel** | Anh Vinh |
| 3 | **Gói A** — nối script kiểm tra vào build | GLM |
| 4 | **Gói C** — thu thập báo cáo CSP, gửi tôi duyệt | GLM, rồi tôi |
| 5 | **Gói D** — giảm trọng lượng trang Lịch sử | GLM |
| 6 | **Kiểm thử trên điện thoại thật** | Anh Vinh |
| 7 | **Cloudflare** | Anh Vinh, khi chuẩn bị công bố |

**Bước 1 và 2 nên làm hôm nay** — một cái sửa một dòng, một cái mất năm phút, và cùng nhau chúng chặn hai kịch bản có hậu quả nặng nhất trong đánh giá bảo mật.
