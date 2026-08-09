# ĐỀ XUẤT — CHUYỂN FONT SANG KHÔNG CHÂN VÀ ĐỔI BỐ CỤC TRANG LỊCH SỬ

**Ngày soạn:** 08/08/2026
**Người soạn:** Claude (Cowork)
**Hai việc:** thay toàn bộ font sang loại không chân có hỗ trợ tiếng Việt đầy đủ, và bỏ cách trình bày cuộn ngang ở trang Lịch sử.

---

# PHẦN 1 — CHUYỂN FONT SANG KHÔNG CHÂN

## 1.1. Hiện trạng

| Vai trò | Font hiện tại | Loại |
|---|---|---|
| Nội dung | **Inter** | Không chân |
| Tiêu đề | **Playfair Display** | **Có chân** |

Font có chân đang được dùng ở **107 chỗ** trên **39 file**, cộng với ba nơi khai trực tiếp:

- `src/styles/global.css` dòng 32 — quy tắc cho mọi thẻ tiêu đề
- `tailwind.config.mjs` dòng 57 — định nghĩa lớp `font-serif`
- `src/components/WatchImage.astro` dòng 132 — chữ cái trong ô giữ chỗ mặt số
- `src/pages/lich-su.astro` — số năm trên từng mốc

## 1.2. Vấn đề cần giải quyết trước khi chọn font

Bỏ font có chân đi thì **mất một thứ**: hiện tiêu đề và nội dung phân biệt nhau bằng **hình dáng chữ**. Nếu cả hai đều không chân mà không tính toán, trang sẽ trông phẳng và đơn điệu, mọi thứ na ná nhau.

Vì vậy đề xuất không chỉ là đổi font, mà phải kèm **cách tạo phân cấp thị giác thay thế**.

## 1.3. Đề xuất: Be Vietnam Pro cho tiêu đề, giữ Inter cho nội dung

**Vì sao Be Vietnam Pro:**

- **Thiết kế riêng cho tiếng Việt.** Đây là điểm quan trọng nhất. Phần lớn font quốc tế hỗ trợ tiếng Việt bằng cách **ghép thêm dấu vào chữ Latin có sẵn** — kết quả là dấu bị đặt lệch, chồng lên nhau ở các chữ nhiều dấu như `ệ`, `ỗ`, `ự`. Be Vietnam Pro có **dạng dấu được thiết kế thích ứng theo từng trường hợp**, không phải ghép thêm.
- Có **7 độ đậm từ Thin tới Black**, đủ để tạo phân cấp mạnh mà không cần đổi kiểu chữ.
- Là font Neo Grotesk — hình dáng hiện đại, gọn, hợp với ngôn ngữ thị giác đã có của trang.
- Có sẵn trên Google Fonts, cùng nguồn với Inter nên **không cần đổi cấu hình CSP**.

**Vì sao giữ Inter cho nội dung:**

- Đang dùng rồi, đã kiểm chứng qua 127 trang.
- Đọc dài rất tốt, đây là thế mạnh của Inter.
- Đổi cả hai cùng lúc là thay đổi lớn không cần thiết. **Đổi một cái, giữ một cái** thì dễ đánh giá kết quả hơn.

## 1.4. Cách tạo phân cấp thay cho việc mất font có chân

Bốn thủ pháp, dùng kết hợp:

| Thủ pháp | Cách làm |
|---|---|
| **Tương phản độ đậm** | Tiêu đề dùng Be Vietnam Pro độ đậm 600 hoặc 700; nội dung dùng Inter 400. Chênh lệch lớn hơn hiện tại |
| **Tương phản kích thước** | Tăng cỡ tiêu đề lên khoảng 10 tới 15 phần trăm so với hiện tại, bù cho việc mất tương phản hình dáng |
| **Giãn chữ âm** | Tiêu đề lớn dùng `letter-spacing` âm nhẹ, khoảng `-0.02em`. Đây là thủ pháp chuẩn làm tiêu đề không chân trông chắc và có chủ đích |
| **Màu và khoảng trắng** | Giữ nguyên màu navy cho tiêu đề, và **tăng khoảng cách phía trên tiêu đề** để tách khối rõ hơn |

## 1.5. Ba chỗ đặc biệt cần xử lý riêng

**A. Chữ số năm.** Trang này về đồng hồ nên con số là nội dung chính. Be Vietnam Pro có chữ số dạng thẳng hàng, phù hợp. **Vẫn phải giữ `font-variant-numeric: lining-nums`** đã đặt trước đây — lỗi chữ số kiểu cổ từng xảy ra ở trang Lịch sử.

**B. Ô giữ chỗ mặt số trong `WatchImage.astro`.** Chữ cái đầu tên hãng hiện dùng Playfair Display cỡ lớn. Đây là chỗ **font có chân đang phát huy tác dụng thật** — nó gợi cảm giác chữ khắc trên mặt số đồng hồ.

**Đề nghị: giữ nguyên font có chân riêng ở chỗ này.** Đây là đồ họa, không phải chữ đọc. Nếu anh muốn nhất quán tuyệt đối thì đổi, nhưng tôi khuyên giữ.

**C. Bộ 28 minh họa SVG.** Đã kiểm: **không file nào dùng font**, toàn bộ là đường nét vẽ tay. Không bị ảnh hưởng.

## 1.6. Phương án thay thế nếu anh muốn đơn giản hơn

Nếu không muốn thêm font thứ hai: **dùng Be Vietnam Pro cho cả tiêu đề lẫn nội dung**, phân biệt hoàn toàn bằng độ đậm và cỡ chữ.

- **Ưu:** chỉ một họ font, tải nhanh hơn, nhất quán tuyệt đối.
- **Nhược:** trang trông đơn điệu hơn; Inter vẫn nhỉnh hơn về khả năng đọc văn bản dài.

Tôi nghiêng về phương án hai font, nhưng đây là lựa chọn thẩm mỹ, anh quyết.

---

# PHẦN 2 — ĐỔI BỐ CỤC TRANG LỊCH SỬ

## 2.1. Vấn đề của cách trình bày hiện tại

`src/pages/lich-su.astro` dòng 249 tới 275 có quy tắc: **từ màn hình rộng 768px trở lên, timeline chuyển sang cuộn ngang**.

Mỗi thẻ mốc rộng tối thiểu 320px, khoảng cách 32px. Với 28 mốc, tổng chiều ngang khoảng **10.000 pixel**.

**Bốn vấn đề cụ thể:**

1. **Cuộn ngang đi ngược thói quen đọc.** Người dùng web quen cuộn dọc bằng con lăn chuột hoặc vuốt. Cuộn ngang phải kéo thanh trượt hoặc giữ phím — nhiều người không nhận ra là cuộn được.
2. **Mất phương hướng.** Không biết đang ở đâu trong 28 mốc, còn bao xa nữa. Không có mốc neo.
3. **Không dùng được bàn phím thuận tiện**, và trình đọc màn hình xử lý bố cục ngang kém hơn dọc.
4. **Mâu thuẫn với chính nội dung.** Đây là dòng thời gian 500 năm — một câu chuyện có trình tự. Cuộn ngang khiến người đọc lướt qua thay vì đọc.

Điều đáng chú ý: **trên điện thoại thì trang đang xếp dọc và hoạt động tốt.** Nghịch lý là màn hình lớn lại có trải nghiệm kém hơn màn hình nhỏ.

## 2.2. Ba phương án, xếp theo mức tôi khuyến nghị

### Phương án 1 — Dọc so le hai bên, có thanh điều hướng dính (KHUYẾN NGHỊ)

Đây là cách trình bày dòng thời gian phổ biến và đã được kiểm chứng.

**Bố cục:**

- Một **đường dọc chạy giữa trang**.
- Các mốc **xen kẽ trái phải**: mốc 1 bên trái, mốc 2 bên phải, và cứ thế. Tạo nhịp thị giác, tránh cảm giác danh sách dài đơn điệu.
- Mỗi mốc vẫn giữ nguyên thẻ hiện có: chấm màu theo lớp, số năm cỡ lớn, tiêu đề, hình minh họa, mô tả.
- Trên màn hình hẹp, **tự động về một cột** — chính là bố cục điện thoại đang có, không cần viết lại.

**Thêm thanh điều hướng dính bên phải:**

- Danh sách các thập niên hoặc nhóm năm, dạng dọc, dính khi cuộn.
- Bấm vào là nhảy tới đoạn tương ứng.
- **Mốc đang xem được đánh dấu nổi bật** — người đọc luôn biết mình đang ở đâu.
- Trên điện thoại, thu thành một nút mở ra.

**Ưu:** giải quyết cả bốn vấn đề nêu trên. Giữ được toàn bộ nội dung và bộ lọc ba lớp hiện có. Tận dụng lại phần lớn mã đã viết cho bố cục điện thoại.

**Nhược:** trang dài. Nhưng có thanh điều hướng thì độ dài không còn là vấn đề.

### Phương án 2 — Nhóm theo thời kỳ, mỗi thời kỳ mở rộng được

Chia 28 mốc thành **năm tới sáu thời kỳ**, ví dụ: khởi nguyên, thời đồng hồ bỏ túi, chuyển lên cổ tay, thời hoàng kim công cụ, khủng hoảng quartz, phục hưng cơ khí.

Mỗi thời kỳ là một khối gập mở được, mặc định mở khối đầu.

**Ưu:** trang ngắn gọn, người đọc thấy ngay cấu trúc tổng thể của 500 năm.
**Nhược:** nội dung bị giấu sau thao tác bấm, ảnh hưởng tới việc lập chỉ mục tìm kiếm. Cần thêm việc phân nhóm và đặt tên thời kỳ.

### Phương án 3 — Dạng lưới, có thể đổi cách xem

Hiện các mốc dạng lưới hai tới ba cột, kèm nút chuyển giữa **xem lưới** và **xem dòng thời gian**.

**Ưu:** xem được nhiều mốc cùng lúc, dễ tìm nhanh.
**Nhược:** **mất cảm giác trình tự thời gian** — mà đó chính là lý do trang này tồn tại. Tôi không khuyến nghị làm phương án chính, nhưng có thể thêm như một chế độ xem phụ.

## 2.3. Đề nghị của tôi

**Làm Phương án 1.** Lý do:

- Giải quyết trọn vấn đề mà không hy sinh gì.
- **Tái dùng được phần lớn mã đã có** — bố cục điện thoại hiện tại chính là bố cục một cột, chỉ cần thêm phần so le cho màn hình rộng.
- Rủi ro thấp nhất trong ba phương án.

Nếu sau này thấy trang vẫn dài quá, **bổ sung Phương án 2 chồng lên** — nhóm theo thời kỳ nhưng để mở sẵn, chỉ dùng tiêu đề thời kỳ làm mốc phân đoạn. Hai phương án này không loại trừ nhau.

## 2.4. Một việc kèm theo: dải mốc ở trang chủ

Trang chủ cũng có một dải mốc cuộn ngang, ở `src/pages/index.astro` dòng 199.

**Chỗ này thì cuộn ngang lại hợp lý** — chỉ có 5 tới 6 mốc, mục đích là gợi mở chứ không phải để đọc kỹ, và dải ngang tạo nhịp khác với các khối lưới xung quanh.

**Đề nghị giữ nguyên.** Chỉ đổi trang `/lich-su`.

---

# PHẦN 3 — PROMPT DÁN CHO GLM

Hai gói, làm riêng, push riêng.

## GÓI 1 — CHUYỂN FONT SANG KHÔNG CHÂN

> Chuyển toàn bộ font tiêu đề từ Playfair Display (có chân) sang **Be Vietnam Pro** (không chân). Giữ nguyên Inter cho nội dung.
>
> ### Vì sao chọn Be Vietnam Pro
>
> Font này được thiết kế riêng cho tiếng Việt, có **dạng dấu thích ứng theo từng trường hợp** thay vì ghép dấu vào chữ Latin có sẵn. Điều này quan trọng với các chữ nhiều dấu như `ệ`, `ỗ`, `ự` — font quốc tế thường đặt dấu lệch hoặc chồng lên nhau ở những chữ này.
>
> ### A. Nạp font
>
> Trong `src/layouts/BaseLayout.astro` dòng 131, đổi liên kết Google Fonts:
>
> - **Bỏ** `Playfair Display`.
> - **Thêm** `Be Vietnam Pro` với các độ đậm 400, 500, 600, 700.
> - **Giữ** Inter với các độ đậm đang dùng.
> - **Bắt buộc thêm `&subset=vietnamese`** vào địa chỉ để tải đủ bộ ký tự tiếng Việt.
> - Giữ nguyên `display=swap`.
>
> **Không cần đổi cấu hình CSP** vì vẫn cùng nguồn `fonts.googleapis.com` và `fonts.gstatic.com`.
>
> ### B. Đổi khai báo font
>
> **`tailwind.config.mjs` dòng 57:** đổi `serif` thành `['"Be Vietnam Pro"', 'system-ui', 'sans-serif']`.
>
> **Giữ nguyên tên lớp là `font-serif`.** Lý do: lớp này đang dùng ở 107 chỗ trên 39 file. Đổi tên lớp là sửa 107 chỗ, rủi ro sót cao mà không được lợi gì. Chỉ đổi giá trị bên trong.
>
> **Thêm chú thích** ngay tại đó giải thích vì sao tên lớp là `serif` mà giá trị lại là font không chân, để sau này không ai bối rối.
>
> **`src/styles/global.css` dòng 32:** đổi font cho các thẻ tiêu đề sang Be Vietnam Pro.
>
> ### C. Bù lại phần phân cấp bị mất
>
> Bỏ font có chân đi thì tiêu đề và nội dung mất đi sự phân biệt bằng hình dáng chữ. **Phải bù bằng bốn thủ pháp sau**, nếu không trang sẽ trông phẳng và đơn điệu:
>
> 1. **Tăng độ đậm tiêu đề** lên 600 hoặc 700, tạo chênh lệch rõ với nội dung ở 400.
> 2. **Tăng cỡ tiêu đề** khoảng 10 tới 15 phần trăm so với hiện tại.
> 3. **Thêm `letter-spacing: -0.02em`** cho các tiêu đề lớn. Đây là thủ pháp chuẩn làm tiêu đề không chân trông chắc chắn thay vì rời rạc.
> 4. **Tăng khoảng cách phía trên tiêu đề** để tách khối rõ hơn.
>
> ### D. Ba chỗ xử lý riêng — đọc kỹ
>
> **D1. Giữ nguyên font có chân trong `src/components/WatchImage.astro` dòng 132.** Chữ cái đầu tên hãng trong ô giữ chỗ mặt số **là đồ họa, không phải chữ đọc** — font có chân ở đó gợi cảm giác chữ khắc trên mặt số đồng hồ, đó là chủ ý thiết kế. Khai riêng font Georgia hoặc serif hệ thống cho riêng chỗ này.
>
> **D2. Chữ số năm phải giữ `font-variant-numeric: lining-nums`** ở mọi nơi đang có. Lỗi chữ số kiểu cổ từng xảy ra ở trang Lịch sử, đừng để tái diễn.
>
> **D3. Bộ 28 minh họa SVG không bị ảnh hưởng** — đã kiểm, không file nào dùng font. Không cần đụng tới.
>
> ### Nghiệm thu — kiểm kỹ phần tiếng Việt
>
> 1. **Kiểm dấu tiếng Việt ở cỡ chữ lớn.** Mở một trang có tiêu đề dài, phóng to, kiểm các chữ nhiều dấu: `ệ`, `ỗ`, `ự`, `ườ`, `ẫ`, `ợ`. Dấu phải rõ ràng, không chồng lên nhau, không bị cắt.
> 2. **Kiểm ở chế độ tối** — dấu mảnh dễ biến mất trên nền tối.
> 3. **Kiểm trên điện thoại.**
> 4. Mở ít nhất **sáu trang khác loại** xem phân cấp tiêu đề còn rõ không: trang chủ, một trang thương hiệu, một bài cơ chế, trang Lịch sử, trang Từ điển, một bài hướng dẫn.
> 5. Chạy `npm run build` — nay đã có các phép kiểm tự động, phải qua hết.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

## GÓI 2 — ĐỔI BỐ CỤC TRANG LỊCH SỬ

> Bỏ cách trình bày cuộn ngang ở trang `/lich-su`, chuyển sang dòng thời gian dọc so le hai bên.
>
> ### Vấn đề hiện tại
>
> `src/pages/lich-su.astro` dòng 249 tới 275: từ màn hình 768px trở lên, timeline chuyển sang cuộn ngang. Mỗi thẻ rộng tối thiểu 320px, với 28 mốc thì tổng chiều ngang khoảng **10.000 pixel**.
>
> Cuộn ngang đi ngược thói quen người dùng, làm mất phương hướng, và mâu thuẫn với chính nội dung — đây là dòng thời gian 500 năm, một câu chuyện có trình tự.
>
> **Nghịch lý hiện tại: trên điện thoại trang xếp dọc và hoạt động tốt, nhưng màn hình lớn lại có trải nghiệm kém hơn.**
>
> ### A. Bố cục mới
>
> **Bỏ hoàn toàn khối `@media (min-width: 768px)` chuyển sang cuộn ngang** ở dòng 249 tới 275.
>
> Thay bằng bố cục dọc so le:
>
> - **Đường dọc chạy giữa trang**, thay cho đường ngang hiện tại.
> - Các mốc **xen kẽ trái phải**: mốc lẻ bên trái, mốc chẵn bên phải. Chấm màu theo lớp nằm trên đường giữa.
> - Mỗi mốc **giữ nguyên toàn bộ nội dung thẻ hiện có**: chấm màu, số năm cỡ lớn, tiêu đề, hình minh họa, mô tả, liên kết nội bộ.
> - **Trên màn hình hẹp tự động về một cột** — đây chính là bố cục điện thoại đang chạy tốt, tận dụng lại, không viết mới.
>
> ### B. Thanh điều hướng dính
>
> Thêm một thanh điều hướng dọc, dính khi cuộn, đặt bên phải:
>
> - Liệt kê các **thập niên hoặc nhóm năm** làm mốc nhảy.
> - Bấm vào là cuộn mượt tới đoạn tương ứng.
> - **Mốc đang xem được đánh dấu nổi bật** để người đọc luôn biết mình đang ở đâu trong 500 năm.
> - Trên điện thoại, thu lại thành một nút mở ra, không chiếm chỗ.
>
> ### C. Giữ nguyên những thứ đang hoạt động
>
> - **Bộ lọc ba lớp** ở đầu trang, kèm hành vi dính khi cuộn.
> - Bộ đếm hiển thị số mốc đang hiện.
> - Toàn bộ liên kết nội bộ từ các mốc sang trang thương hiệu, mẫu iconic, bài cơ chế.
> - 28 hình minh họa và cơ chế ưu tiên ảnh thật, lùi về minh họa.
>
> ### D. Không đụng tới trang chủ
>
> Trang chủ cũng có dải mốc cuộn ngang ở `src/pages/index.astro` dòng 199. **Giữ nguyên chỗ đó** — chỉ có 5 tới 6 mốc, mục đích là gợi mở chứ không để đọc kỹ, và dải ngang tạo nhịp khác với các khối lưới xung quanh. Cuộn ngang ở đó là hợp lý.
>
> ### Nghiệm thu
>
> 1. **Không còn cuộn ngang** ở `/lich-su` trên mọi kích thước màn hình.
> 2. Bố cục so le hiện đúng trên màn hình rộng, về một cột trên màn hình hẹp.
> 3. **Thanh điều hướng đánh dấu đúng mốc đang xem** khi cuộn.
> 4. Bộ lọc ba lớp vẫn chạy, bộ đếm vẫn cập nhật.
> 5. Kiểm trên **điện thoại thật**, cả chế độ sáng và tối.
> 6. **Kiểm bằng bàn phím:** dùng phím Tab đi hết trang, thứ tự phải theo trình tự thời gian, không nhảy lung tung giữa hai cột.
> 7. Báo lại kích thước tệp HTML trước và sau — bố cục mới nên nhẹ hơn hoặc bằng.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

---

# THỨ TỰ ĐỀ NGHỊ

**Làm Gói 1 trước, Gói 2 sau.** Lý do: đổi font ảnh hưởng toàn site, nên làm khi trang còn ở trạng thái đã biết. Nếu đổi bố cục trước rồi đổi font, khi có gì lệch sẽ khó biết nguyên nhân từ đâu.

Sau mỗi gói nên xem bản triển khai thật trước khi sang gói kế tiếp.
