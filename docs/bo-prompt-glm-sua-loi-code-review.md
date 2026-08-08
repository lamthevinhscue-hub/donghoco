# BỘ PROMPT GIAO GLM — SỬA LỖI THEO CODE REVIEW

**Ngày soạn:** 08/08/2026
**Căn cứ:** `docs/code-review-2026-08-08.md`
**Nguyên tắc:** làm **đúng thứ tự**, mỗi phiên push riêng. Phiên 2 bắt buộc xong trước Phiên 3, nếu không sẽ làm chết chức năng tìm kiếm.

| Phiên | Mã lỗi | Việc | Mức |
|---|---|---|---|
| 1 | CRIT-03 | Vô hiệu hóa form newsletter | Nghiêm trọng |
| 2 | CRIT-02 | Bỏ `new Function` trong SearchBox | Nghiêm trọng |
| 3 | CRIT-01 | Thêm HTTP security headers | Nghiêm trọng |
| 4 | IMP-01, IMP-02 | Bỏ ghép chuỗi HTML vào innerHTML | Cải thiện |
| 5 | IMP-06 | Dọn class dark mode trùng lặp | Cải thiện |
| 6 | IMP-03, IMP-05, IMP-07 | Nợ kỹ thuật còn lại | Cải thiện |

---

# PHIÊN 1 — CRIT-03: VÔ HIỆU HÓA FORM NEWSLETTER

> Sửa một lỗi về quyền riêng tư trong form đăng ký bản tin ở chân trang.
>
> ## Bản chất vấn đề — nặng hơn vẻ ngoài
>
> `src/components/Footer.astro` dòng 61 có form gửi tới `https://formspree.io/f/YOUR_FORM_ID`. **`YOUR_FORM_ID` là placeholder chưa thay.** Nhưng vấn đề nghiêm trọng hơn nằm ở khối `catch` tại **dòng 117 tới 120**:
>
> ```js
> .catch(function() {
>   // Fallback: nếu chưa cấu hình Formspree (YOUR_FORM_ID), vẫn báo thành công
>   status.textContent = '✓ Cảm ơn bạn đã đăng ký!';
>   form.reset();
> })
> ```
>
> Nghĩa là khi yêu cầu thất bại, trang **cố ý báo cho người đọc là đã đăng ký thành công**, xóa ô nhập, trong khi thực tế không có gì được lưu ở đâu cả.
>
> Hai hệ quả:
>
> 1. **Nói sai với người đọc.** Họ tin mình đã đăng ký và sẽ nhận bài mới. Điều đó không xảy ra.
> 2. **Địa chỉ email vẫn được gửi đi** trong yêu cầu POST tới máy chủ Formspree, dù không có form nào nhận. Đây là thu thập dữ liệu cá nhân không có nơi lưu trữ hợp lệ và không có thông báo cho người dùng.
>
> ## Cách sửa — chọn phương án A
>
> **Phương án A — vô hiệu hóa cho tới khi thực sự cần.** Đây là phương án tôi chọn.
>
> Trong `src/components/Footer.astro`:
>
> - **Bỏ hẳn thẻ `<form>`** cùng ô nhập email và nút gửi (dòng 61 tới 76).
> - **Bỏ hẳn khối `<script is:inline>`** xử lý form (dòng 90 tới 127).
> - Thay vào chỗ đó một dòng chữ ngắn, giọng điềm đạm: nêu rằng tính năng nhận bài mới qua thư đang được chuẩn bị, và mời người đọc quay lại hoặc lưu trang.
> - **Giữ nguyên** tiêu đề khối và phần mô tả, chỉ thay phần form.
> - Bỏ luôn khóa dịch không còn dùng trong `src/i18n/ui.ts` nếu có khóa nào chỉ phục vụ form này, hoặc **giữ lại kèm chú thích** để sau này bật lại dễ.
>
> **Không dùng phương án B** (điền ID thật) ở phiên này. Khi nào anh Vinh thực sự cần bản tin thì làm riêng, và khi đó phải kèm: khóa lấy từ biến môi trường chứ không viết cứng, xử lý phản hồi trung thực (thất bại thì báo thất bại), và liên kết tới trang chính sách quyền riêng tư cạnh nút gửi.
>
> ## Nghiệm thu
>
> - Mở chân trang: không còn ô nhập email nào.
> - Quét toàn bộ `dist/`: **không còn chuỗi `YOUR_FORM_ID`** ở bất kỳ đâu.
> - `npm run build` không lỗi.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. Quét ký tự lạ trước khi push.

---

# PHIÊN 2 — CRIT-02: BỎ `new Function` TRONG SEARCHBOX

> **Phiên này bắt buộc xong trước Phiên 3.** Nếu thêm security headers trước khi sửa chỗ này, chức năng tìm kiếm sẽ chết.
>
> ## Bản chất vấn đề
>
> `src/components/SearchBox.astro` **dòng 94**:
>
> ```ts
> const dynamicImport = new Function('url', 'return import(url)') as (url: string) => Promise<any>;
> ```
>
> Đoạn này tạo hàm từ chuỗi lúc chạy — tương đương `eval`. Chú thích trong mã nói rõ mục đích là né việc Vite cố phân giải đường dẫn lúc build.
>
> Vấn đề: **bất kỳ Content-Security-Policy nào không có `'unsafe-eval'` đều chặn `new Function`.** Nghĩa là dòng này trực tiếp ngăn việc áp CSP đúng cách ở Phiên 3. Và thêm `'unsafe-eval'` vào CSP thì làm mất phần lớn giá trị của CSP.
>
> Ở đây tham số truyền vào là hằng số do lập trình viên viết, không phải đầu vào người dùng, nên **không khai thác được trên thực tế**. Nhưng đây là mẫu mã bị mọi công cụ quét gắn cờ, và tạo tiền lệ xấu trong codebase.
>
> ## Cách sửa
>
> Vite có chỉ thị chính thức để bỏ qua phân giải lúc build. Thay dòng 94 và hai chỗ gọi ở **dòng 101 và 106**:
>
> ```ts
> // Bỏ dòng 94 hoàn toàn.
> // Dòng 101:
> pagefindInstance = await import(/* @vite-ignore */ '/pagefind/pagefind-ui.js');
> // Dòng 106:
> pagefindInstance = await import(/* @vite-ignore */ '/pagefind/pagefind.js');
> ```
>
> Chỉ thị `@vite-ignore` báo cho bundler để nguyên đường dẫn — đúng mục đích mà `new Function` đang phục vụ, nhưng không dùng tới eval.
>
> **Nếu cách trên không chạy**, phương án hai: khai hai đường dẫn đó vào `vite.build.rollupOptions.external` trong `astro.config.mjs`. **Báo lại cho tôi biết nếu phải dùng phương án hai.**
>
> ## Nghiệm thu — kiểm kỹ, đây là chỗ dễ tưởng đã xong mà chưa xong
>
> 1. Quét toàn bộ `src/`: **không còn `new Function` và không còn `eval`** ở bất kỳ đâu.
> 2. `npm run build` không lỗi, không cảnh báo về dynamic import.
> 3. **Mở trang, bấm ô tìm kiếm, gõ "tru cot" và "dong ho lan"** — phải ra kết quả. Đây là bước bắt buộc, không được bỏ qua: nếu Pagefind không nạp được thì tìm kiếm sẽ im lặng báo "chưa sẵn sàng" chứ không báo lỗi.
> 4. Mở bảng điều khiển trình duyệt xem có lỗi nạp module nào không.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm. Quét ký tự lạ trước khi push.

---

# PHIÊN 3 — CRIT-01: THÊM HTTP SECURITY HEADERS

> **Chỉ làm phiên này sau khi Phiên 2 đã xong và tìm kiếm đã kiểm chạy tốt.**
>
> ## Bản chất vấn đề
>
> `vercel.json` hiện chỉ có `redirects`, **không khai báo một security header nào**. Trang thiếu toàn bộ: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.
>
> Đây là nhóm phát hiện đứng đầu mọi bản quét bảo mật tự động, và là thứ đầu tiên người ta kiểm ở một trang công khai.
>
> ## Bước 1 — Thêm các header đơn giản, áp ngay
>
> Bổ sung khối `headers` vào `vercel.json`, **giữ nguyên khối `redirects` đang có**:
>
> ```json
> "headers": [
>   {
>     "source": "/(.*)",
>     "headers": [
>       { "key": "X-Content-Type-Options", "value": "nosniff" },
>       { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
>       { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
>       { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
>       { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), payment=()" }
>     ]
>   }
> ]
> ```
>
> Năm header này **không có rủi ro làm vỡ tính năng**. Áp thẳng được.
>
> ## Bước 2 — CSP, bật ở chế độ chỉ báo cáo trước
>
> **Đây là phần dễ làm vỡ trang nhất, nên phải làm hai giai đoạn.**
>
> Tôi đã khảo sát các nguồn tài nguyên bên ngoài mà trang thực sự dùng:
>
> | Nguồn | Dùng cho |
> |---|---|
> | `fonts.googleapis.com` | tệp định kiểu phông chữ |
> | `fonts.gstatic.com` | tệp phông chữ |
> | Cùng nguồn `/pagefind/` | tìm kiếm |
> | Cùng nguồn `/_vercel/` | đo lường |
> | `vitals.vercel-insights.com` | nơi gửi dữ liệu đo lường |
>
> Trang có **4 khối script nội tuyến và 2 khối định kiểu nội tuyến**, nên CSP bắt buộc phải có `'unsafe-inline'` cho cả hai. Đây là đánh đổi không tránh được với site tĩnh — dùng nonce cần máy chủ sinh giá trị mới mỗi lần tải trang, mà trang này không có máy chủ.
>
> **Giai đoạn A — chỉ báo cáo, không chặn.** Thêm header sau vào cùng khối trên:
>
> ```json
> { "key": "Content-Security-Policy-Report-Only", "value": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'" }
> ```
>
> Chú ý tên header có hậu tố `-Report-Only`. Ở chế độ này trình duyệt **chỉ ghi cảnh báo vào bảng điều khiển, không chặn gì**.
>
> Sau khi triển khai, **đi qua ít nhất tám trang khác loại nhau** và mở bảng điều khiển trình duyệt xem có cảnh báo vi phạm CSP nào không. Các trang cần thử: trang chủ, một trang thương hiệu, một bài cơ chế có hoạt ảnh, trang Lịch sử, trang Giải phẫu, trang So sánh, kết quả tìm kiếm, và trang Từ điển.
>
> **Ghi lại mọi cảnh báo và báo cho tôi.** Chưa chuyển sang chế độ chặn.
>
> ## Giai đoạn B — chuyển sang chặn thật
>
> **Chỉ làm sau khi tôi duyệt kết quả giai đoạn A.** Khi đó chỉ cần đổi tên header từ `Content-Security-Policy-Report-Only` thành `Content-Security-Policy`, sau khi đã bổ sung các nguồn còn thiếu mà giai đoạn A phát hiện.
>
> ## Nghiệm thu
>
> - Sau khi triển khai, kiểm header trả về thực tế bằng công cụ kiểm tra header trực tuyến hoặc tab mạng của trình duyệt.
> - **Kiểm lại chức năng tìm kiếm** — đây là chỗ dễ vỡ nhất khi có CSP.
> - Kiểm phông chữ vẫn tải đúng, hoạt ảnh vẫn chạy.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm. Quét ký tự lạ trước khi push.

---

# PHIÊN 4 — IMP-01 VÀ IMP-02: BỎ GHÉP CHUỖI HTML

> Sửa mẫu mã không an toàn ở hai chỗ. **Lưu ý về mức độ:** cả hai chỗ này **hiện KHÔNG khai thác được**, vì dữ liệu đều đến từ chỉ mục dựng lúc build của chính nội dung trang, không có dữ liệu người dùng gửi lên. Đây là phòng thủ theo chiều sâu, không phải vá lỗ hổng đang bị khai thác.
>
> ## A. `src/components/SearchBox.astro` dòng 145 tới 153
>
> Hiện ghép chuỗi HTML rồi gán vào `innerHTML`. Chuyển sang tạo phần tử DOM:
>
> - Tạo thẻ `a` bằng `document.createElement`, gán `href` trực tiếp — trình duyệt tự xử lý an toàn.
> - Tiêu đề gán bằng **`textContent`**, không phải `innerHTML`.
> - Dùng `replaceChildren` thay cho gán `innerHTML` cả cụm.
>
> **Một điểm bắt buộc chú ý:** trường `excerpt` của Pagefind **cố ý chứa thẻ `<mark>`** để tô đậm từ khóa người dùng tìm. **Không được gán bằng `textContent`**, làm vậy sẽ mất tính năng tô đậm và hiện ra chữ `<mark>` thô.
>
> Cách xử lý: viết một hàm lọc nhỏ **chỉ cho phép đúng thẻ `<mark>` và `</mark>`**, loại bỏ mọi thẻ khác, rồi mới gán vào `innerHTML` của riêng phần trích đoạn. Hàm này ngắn, không cần thư viện ngoài.
>
> ## B. `src/pages/so-sanh.astro` dòng 146, 147, 167, 168
>
> Cùng loại. **Chỗ này an toàn hơn hẳn** vì dữ liệu đã được kiểm bằng danh sách cho phép ở dòng 115. Chuyển sang `textContent` cho nhất quán.
>
> **Tuyệt đối không đụng vào dòng 115.** Đoạn kiểm tra đầu vào ở đó viết đúng và là mã bảo mật tốt nhất dự án — giữ nguyên.
>
> ## Nghiệm thu
>
> - Gõ tìm kiếm, **kiểm từ khóa vẫn được tô đậm** trong kết quả. Đây là chỗ dễ làm hỏng nhất ở phiên này.
> - Mở trang So sánh, chọn một mẫu rồi hai mẫu, kiểm hiển thị đúng.
> - Thử địa chỉ có tham số lạ, ví dụ `?m=abc,def` — trang phải bỏ qua im lặng, không lỗi.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm. Quét ký tự lạ trước khi push.

---

# PHIÊN 5 — IMP-06: DỌN CLASS DARK MODE TRÙNG LẶP

> Việc nhẹ, dọn dẹp.
>
> Quét toàn bộ `src/` phát hiện **77 chỗ** có chuỗi `dark:text-dark-text dark:text-dark-text` lặp hai lần liền nhau, và 3 chỗ tương tự với `dark:hover:text-dark-brass`.
>
> Ví dụ tại `src/pages/so-sanh.astro` dòng 167:
>
> ```html
> <span class="font-serif text-base text-navy dark:text-dark-text dark:text-dark-text">
> ```
>
> Không gây lỗi hiển thị — CSS bỏ qua bản trùng — nhưng đây là dấu vết của thao tác tìm và thay thế tự động không kiểm lại, làm phình HTML.
>
> **Cách làm:** tìm và thay bỏ bản trùng, nhưng **kiểm lại bằng mắt sau khi thay**, đừng thay thế mù. Rà thêm xem còn chuỗi class nào khác bị nhân đôi tương tự không.
>
> **Nghiệm thu:** quét lại `src/`, số chỗ trùng bằng 0. Mở ba trang ở chế độ tối kiểm hiển thị không đổi.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm.

---

# PHIÊN 6 — NỢ KỸ THUẬT CÒN LẠI

> Ba việc cải thiện chất lượng mã. Không gấp, không ảnh hưởng người dùng.
>
> ## A. IMP-03 — Thêm cache cho việc tải collection
>
> `src/pages/thuong-hieu/[slug].astro` gọi `getEntriesByLang('thuongHieu', lang)` **hai lần** — dòng 20 trong `getStaticPaths` và dòng 32 ở phần thân. Mẫu tương tự lặp ở các trang chi tiết khác.
>
> Với 26 thương hiệu thì chi phí không đáng kể, và vì là dựng tĩnh nên người dùng không chịu chi phí này. Nhưng đây là mẫu mã sẽ thành vấn đề nếu danh mục lên hàng trăm mục.
>
> **Cách sửa:** thêm một lớp cache trong `src/lib/content.ts` dùng `Map`, khóa theo `collection` và `lang`. Sửa một chỗ, mọi trang hưởng lợi. Đây là cải thiện **thời gian dựng trang**, không phải thời gian tải.
>
> ## B. IMP-05 — Trích chuỗi class Tailwind lặp lại
>
> Có 5 chuỗi class dài trên 120 ký tự lặp từ 4 tới 5 lần trong codebase. Vi phạm nguyên tắc không lặp: sửa một chỗ thì các chỗ kia vẫn sai.
>
> **Cách sửa:** trích thành lớp dùng `@apply` trong `src/styles/global.css`, hoặc tách thành component nhỏ dùng lại. Ưu tiên cách nào ít làm rối hơn ở từng trường hợp.
>
> ## C. IMP-07 — Ghi nhận lỗi tìm kiếm thay vì nuốt im lặng
>
> `src/components/SearchBox.astro` dòng 103 tới 112 có `try` lồng `try`, nhánh trong cùng chỉ `console.warn`. Nếu Pagefind không nạp được trên máy người dùng thật, không ai biết chuyện đó xảy ra bao nhiêu lần.
>
> **Cách sửa:** ghi nhận sự kiện lỗi này qua Vercel Analytics đã tích hợp sẵn trong dự án. Nếu tìm kiếm hỏng trên một nhóm trình duyệt nào đó, cần biết để sửa.
>
> ## Không làm ở phiên này
>
> **IMP-04 — tách `WatchExplodedView.astro` 594 dòng** thành các file nhỏ hơn. Đây là nợ kỹ thuật thật, nhưng mã đang chạy đúng và việc tách có rủi ro làm vỡ hoạt ảnh. **Chỉ làm khi nào cần sửa hoặc thêm tính năng cho trang Giải phẫu** — không tách chỉ để cho gọn.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm. Quét ký tự lạ trước khi push.

---

# GHI CHÚ CHO ANH VINH

**Ba phiên đầu là phần bắt buộc**, và phải làm đúng thứ tự — đảo Phiên 2 với Phiên 3 sẽ làm chết chức năng tìm kiếm mà không có thông báo lỗi rõ ràng.

**Phiên 3 giai đoạn B cần anh duyệt.** Sau khi GLM chạy CSP ở chế độ chỉ báo cáo và gửi anh danh sách cảnh báo, đưa danh sách đó cho tôi xem trước khi cho chuyển sang chế độ chặn thật.

**Ba phiên sau làm lúc nào cũng được.**
