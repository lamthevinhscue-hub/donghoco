# ĐỢT 3 — ĐÁNH GIÁ HIỆN TRẠNG TOÀN SITE VÀ ĐỀ XUẤT GIAO DIỆN

> **NGÀY NGHIỆM THU: 03/08/2026**
> **Loại:** Đánh giá tổng thể mức độ hoàn thiện, cộng đề xuất cải thiện trình bày
> **Đối tượng kiểm:** Commit `4682019`, bản dựng 83 trang lúc 20:34 ngày 03/08
> **Kết luận ngắn:** Phần kỹ thuật và nội dung gần như đã xong. Vấn đề còn lại **không phải thiếu tính năng, mà là trang chưa có một tấm ảnh nào.**

---

# PHẦN 1 — HIỆN TRẠNG

## 1.1. Đã hoàn thành

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Nội dung 24 thương hiệu đủ 5 khối | **Xong** | 24 trên 26 file có đủ ba mảng dữ liệu; Orient và Tissot là khung rỗng cố ý |
| Bài cơ chế | **Xong** | 11 bài, 6 bài có hoạt ảnh tương tác |
| Tìm kiếm toàn trang (Pagefind) | **Xong** | Thư mục `dist/pagefind` đã sinh |
| Dark mode | **Xong** | 760 lớp `dark:` trong mã nguồn; mọi trang đã dựng đều có, kể cả phần thân bài qua `.dark .prose-content` |
| Trang so sánh `/so-sanh` | **Xong** | Đã dựng |
| Bộ lọc `/mau-iconic` và `/co-che` | **Xong** | |
| Từ điển liên kết chéo tự động | **Xong** | `glossary-terms.json` nay có dữ liệu — lỗi chạy rỗng ở biên bản trước đã khắc phục |
| sitemap.xml | **Xong** | `sitemap-index.xml` và `sitemap-0.xml` |
| Structured data | **Xong** | 83 trên 83 trang có khối `ld+json` |
| Thẻ Open Graph và canonical | **Xong** | 83 trên 83 trang |
| Analytics | **Xong** | |
| Newsletter | **Xong** | |
| Chuẩn hóa ký tự xuống dòng | **Xong** | `.gitattributes` đã có |

## 1.2. Kiểm chứng độc lập

Tôi quét lại toàn bộ 83 trang đã dựng và toàn bộ mã nguồn:

- **Link nội bộ hỏng: 0.**
- **Ký tự ngoài tiếng Việt và tiếng Anh trong `src/`: 0.**

Đây là lần đầu cả hai chỉ số này đều sạch kể từ khi bắt đầu rà soát.

## 1.3. Còn thiếu

| Hạng mục | Mức độ | Ghi chú |
|---|---|---|
| **Ảnh thật** | **Nghiêm trọng** | **0 file ảnh** trong `public/`. Toàn bộ vị trí ảnh đang là ô giữ chỗ |
| Mẫu iconic cho 8 thương hiệu | Trung bình | Breguet, Glashütte Original, Longines, Hamilton, Frédérique Constant, F.P. Journe, Philippe Dufour, Greubel Forsey — Khối 5 các trang này hiện ra dòng thông báo trống |
| Dữ liệu Orient và Tissot | Trung bình | Hai khung rỗng chờ cấp dữ liệu |
| `CAN-KIEM-CHUNG.md` | Thấp | 19 mục chờ xác nhận, phần lớn là mã calibre |
| Bảng lịch sử IWC và Cartier | Thấp | 4 và 3 mốc, mỏng hơn các hãng khác |

---

# PHẦN 2 — CHẨN ĐOÁN VỀ TRÌNH BÀY

Tôi đọc `index.astro`, `Card.astro`, `WatchImage.astro`, `tailwind.config.mjs`, `global.css` và trang `/thuong-hieu`. Sáu vấn đề, xếp theo mức ảnh hưởng.

## 2.1. Trang không có một tấm ảnh nào — đây là gốc rễ

`public/` có đúng **0 file ảnh**. Nghĩa là:

- 28 mốc trên trang Lịch sử: ô giữ chỗ.
- 24 ảnh hero thương hiệu, 24 logo: ô giữ chỗ.
- 16 thẻ mẫu iconic trên các trang thương hiệu: ô giữ chỗ.

Đây là một trang viết về **đồ vật đẹp**. Người đọc tới vì muốn nhìn thấy chiếc Nautilus, chiếc Reverso, mặt số Snowflake. Không có ảnh thì mọi cải thiện về màu sắc, phông chữ, khoảng cách đều chỉ là trang trí quanh một chỗ trống.

**Ô giữ chỗ hiện tại còn làm tình hình tệ hơn.** `WatchImage.astro` đang vẽ: nền chuyển sắc xanh navy, một biểu tượng hình ảnh bị gạch chéo, và dòng chữ "Ảnh đang cập nhật". Biểu tượng ảnh gạch chéo là ký hiệu **báo lỗi tải ảnh** trong quy ước giao diện. Người đọc nhìn vào sẽ nghĩ trang bị hỏng, chứ không nghĩ nội dung đang hoàn thiện.

## 2.2. Trang chủ có nhịp đều đều

Cấu trúc hiện tại:

```
Hero chữ căn giữa
Lưới 3 cột
Lưới 3 cột
Lưới 3 cột
Lưới 3 cột
```

Bốn khối liên tiếp dùng đúng một lớp `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`. Mắt người đọc lướt qua mà không có điểm dừng nào. Một trang có nhịp tốt cần các khối **khác chiều cao, khác mật độ, khác hướng đọc**.

Hero cũng thuần chữ: một gạch ngang, tên trang, hai dòng mô tả. Không có gì để nhìn.

## 2.3. Mọi loại nội dung dùng chung một kiểu thẻ

`Card.astro` được dùng cho cả thương hiệu, mẫu iconic, cơ chế, thuật ngữ và hướng dẫn. Năm loại nội dung rất khác nhau nhưng trông giống hệt nhau. Người đọc không phân biệt được mình đang ở khu vực nào của trang.

## 2.4. Bảng màu có sáu màu nhưng trang trông đơn sắc

`tailwind.config.mjs` khai `brass`, `brass-light`, `navy`, `navy-light`, `ink`, `ink-soft`, `cream`, `cream-dark`. Nhưng thực tế:

- `brass` chỉ xuất hiện ở: gạch ngang cao 4px, màu chữ liên kết, và nhãn nhỏ nền nhạt.
- Toàn bộ nền là `cream`, toàn bộ thẻ là `white`.

Kết quả: một trang kem nhạt với vài vệt đồng rất mảnh. Bảng màu đúng và đẹp, nhưng **đang bị dùng quá dè dặt**.

## 2.5. Con số bị đối xử như chữ thường

Đây là trang về đồng hồ. Năm thành lập, năm ra mắt, trữ cót, tần số — con số chính là nội dung. Nhưng hiện tại năm thành lập trên thẻ thương hiệu hiển thị bằng `text-xs`, nhỏ hơn cả phần tóm tắt.

## 2.6. Năm phân hạng không có mã màu

Trang `/thuong-hieu` chia 24 hãng thành 5 nhóm phân hạng, mỗi nhóm có tiêu đề và mô tả riêng — làm tốt. Nhưng cả 5 nhóm dùng chung một màu viền `border-brass`. Người đọc không có tín hiệu thị giác nào để nhớ mình đang xem hạng nào.

---

# PHẦN 3 — ĐỀ XUẤT, XẾP THEO TỶ LỆ HIỆU QUẢ TRÊN CÔNG SỨC

## Ưu tiên 1 — Thay ô giữ chỗ bằng đồ họa có chủ ý

**Công sức: thấp. Hiệu quả: rất cao.** Đây là việc nên làm trước tiên, kể cả khi anh sắp có ảnh thật.

Ý tưởng: thay vì báo "thiếu ảnh", ô giữ chỗ nên trở thành **một phần của thiết kế**. Với trang về đồng hồ, có sẵn một hình rất giàu ý nghĩa: **mặt số**.

Đề xuất cụ thể cho `WatchImage.astro`:

- Bỏ biểu tượng ảnh gạch chéo và dòng chữ "Ảnh đang cập nhật".
- Vẽ bằng SVG: một vòng tròn mảnh màu `brass` trên nền `navy`, có các vạch chỉ giờ, cùng chữ cái đầu của tên hãng đặt giữa bằng font serif cỡ lớn.
- Nền thêm hoa văn guilloché nhẹ, vẽ bằng SVG `<pattern>` các đường tròn đồng tâm, độ mờ khoảng 5%.

Làm vậy thì 60-70 ô trống hiện tại chuyển từ **lỗi** thành **nét nhận diện**. Và khi ảnh thật về, chúng tự động biến mất.

## Ưu tiên 2 — Mã màu cho năm phân hạng

**Công sức: thấp. Hiệu quả: cao.**

Thêm vào `tailwind.config.mjs` năm màu nhấn, dùng cho viền trái của tiêu đề nhóm, cho nhãn trên thẻ, và cho nút lọc khi bật:

| Phân hạng | Màu đề nghị | Lý do |
|---|---|---|
| Haute Horlogerie độc lập | Tím than sâu | Hiếm, cao nhất |
| Xa xỉ đỉnh cao | Vàng đồng đậm `brass` | Màu chủ đạo, dành cho nhóm cao |
| Cao cấp | Xanh navy | Màu phụ sẵn có |
| Tầm trung | Xanh lục xám | Trung tính, thực dụng |
| Nhập môn | Nâu đất nhạt | Gần gũi, dễ tiếp cận |

Chỉ cần dải màu này, trang `/thuong-hieu` từ 24 thẻ giống nhau thành một bản đồ có tầng lớp đọc được ngay.

## Ưu tiên 3 — Cho con số cỡ lớn

**Công sức: thấp. Hiệu quả: cao.**

Trên thẻ thương hiệu, đưa **năm thành lập** thành yếu tố thị giác chính: font serif, cỡ `text-3xl` hoặc `text-4xl`, màu `brass`, đặt góc trên bên phải thẻ, dùng `font-variant-numeric: lining-nums` (đã có sẵn trong dự án từ Mục B1).

Tương tự trên thẻ mẫu iconic: năm ra mắt cỡ lớn.

Đây là thủ pháp của các tạp chí đồng hồ in — con số lớn tạo điểm neo cho mắt và ngay lập tức làm trang trông có chủ đích.

## Ưu tiên 4 — Phá nhịp trang chủ

**Công sức: trung bình. Hiệu quả: cao.**

Thay vì bốn lưới 3 cột giống nhau, đề nghị nhịp sau:

1. **Hero** — thêm nền: hoa văn guilloché SVG mờ hoặc một mặt đồng hồ lớn cắt nửa ở mép phải.
2. **Ba trụ cột** — giữ lưới 3 cột, nhưng làm thẻ cao hơn, có biểu tượng lớn.
3. **Mẫu iconic nổi bật** — đổi sang bố cục **1 lớn cộng 2 nhỏ**: một thẻ chiếm hai cột với ảnh lớn, hai thẻ nhỏ bên cạnh.
4. **Dải mốc lịch sử** — một dải ngang cuộn được, hiện 5-6 mốc từ trang Lịch sử, mỗi mốc là năm cỡ lớn cộng một dòng. Dẫn sang `/lich-su`.
5. **Thương hiệu** — thay lưới thẻ bằng **dải logo hoặc dải tên hãng** xếp dày, dạng bảng chữ. Vừa khác nhịp, vừa khoe được số lượng 26 hãng.
6. **Khối số liệu** — một dải nền `navy` với các con số lớn: 26 thương hiệu, 16 mẫu iconic, 11 cơ chế, 28 mốc lịch sử. Đây là cách nhanh nhất để người mới hiểu quy mô của trang.

## Ưu tiên 5 — Phân biệt thẻ theo loại nội dung

**Công sức: trung bình. Hiệu quả: trung bình.**

Giữ `Card.astro` làm nền, thêm một thuộc tính `variant`:

- **Thương hiệu** — có logo, năm cỡ lớn, dải màu phân hạng ở cạnh trái.
- **Mẫu iconic** — ảnh chiếm ưu thế, năm cỡ lớn đè lên ảnh, nhãn thể loại.
- **Cơ chế** — nền tối hơn, có biểu tượng bánh răng, nhãn độ khó dạng ba chấm tròn.
- **Thuật ngữ** — thẻ nhỏ gọn, chỉ tên và một dòng, không ảnh.
- **Hướng dẫn** — có nhãn mức độ và thời gian đọc ước tính.

## Ưu tiên 6 — Ảnh thật

**Công sức: cao, phụ thuộc anh. Hiệu quả: cao nhất.**

Không có cách nào đi vòng. Đề nghị làm theo thứ tự này để công sức bỏ ra sinh lợi sớm nhất:

1. **28 ảnh timeline** — trang `/lich-su` là trang độc bản nhất của site và đang trống hoàn toàn.
2. **16 ảnh mẫu iconic** — dùng lại được ở cả trang danh sách, trang chi tiết và Khối 5 của các trang thương hiệu.
3. **24 logo thương hiệu** — nhẹ, dễ tìm, hiệu quả thị giác cao trên trang danh sách.
4. **24 ảnh hero thương hiệu** — làm sau cùng.

Về nguồn: ưu tiên phòng tin chính hãng và Wikimedia Commons, như đã thống nhất. Với logo, phần lớn hãng có mục dành cho báo chí.

---

# PHẦN 4 — HAI VIỆC NHỎ NÊN LÀM NHÂN TIỆN

1. **Bảng lịch sử IWC và Cartier đang mỏng** (4 và 3 mốc) so với các hãng khác (10-17 mốc). Trên giao diện, hai trang này sẽ trông hụt hẫng ở Khối 2. Tôi có thể soạn gói dữ liệu bổ sung riêng cho hai hãng này.
2. **Tám thương hiệu chưa có mẫu iconic** nên Khối 5 hiện dòng thông báo trống. Nếu để lâu, năm dòng thông báo giống nhau nằm rải rác trên site trông như lỗi. Hoặc bổ sung bài, hoặc đổi cách hiển thị khi trống cho đỡ lộ.

---

# PHẦN 5 — PROMPT GIAO GLM

Ba prompt dưới đây tách riêng, **làm và push từng cái một**.

## Prompt A — Ô giữ chỗ và mã màu phân hạng

> Cải thiện hai điểm về trình bày. **Không đổi cấu trúc trang, không thêm trang mới.**
>
> **1. Viết lại ô giữ chỗ trong `src/components/WatchImage.astro`**
>
> Ô giữ chỗ hiện dùng biểu tượng hình ảnh bị gạch chéo cộng dòng chữ "Ảnh đang cập nhật". Biểu tượng đó là ký hiệu báo lỗi tải ảnh, khiến người đọc tưởng trang bị hỏng. Thay bằng đồ họa có chủ ý:
>
> - Bỏ biểu tượng gạch chéo và dòng chữ "Ảnh đang cập nhật".
> - Vẽ bằng SVG nội tuyến: nền màu `navy` (chế độ tối dùng `dark-surface`), phủ hoa văn guilloché là các đường tròn đồng tâm vẽ bằng thẻ `<pattern>`, độ mờ 5%.
> - Giữa khung: một vòng tròn viền mảnh màu `brass` mô phỏng vành mặt số, bên trong có 12 vạch chỉ giờ ngắn.
> - Chính giữa vòng tròn: **chữ cái đầu** của giá trị thuộc tính `alt`, font serif, màu `brass`, cỡ lớn.
> - Toàn bộ phải co giãn đúng theo mọi tỷ lệ khung mà component đang hỗ trợ, và hoạt động tốt trên điện thoại.
>
> Khi có ảnh thật, hành vi giữ nguyên như hiện nay: ảnh hiện, ô giữ chỗ ẩn.
>
> **2. Thêm mã màu cho năm phân hạng**
>
> Trong `tailwind.config.mjs`, thêm năm màu nhấn cho năm phân hạng: Haute Horlogerie độc lập, Xa xỉ đỉnh cao, Cao cấp, Tầm trung, Nhập môn. Tự chọn mã màu sao cho hài hòa với bảng màu sẵn có và **đủ tương phản ở cả chế độ sáng lẫn tối** — đây là yêu cầu bắt buộc, phải tự kiểm.
>
> Áp dụng ở ba chỗ trên trang `/thuong-hieu`: viền trái của tiêu đề mỗi nhóm phân hạng, nhãn phân hạng trên thẻ thương hiệu, và nút lọc khi đang bật.
>
> Bảng nhãn phân hạng vẫn lấy từ `getTierLabel()` trong `src/i18n/ui.ts`, **không khai bảng nhãn cục bộ**.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

## Prompt B — Con số cỡ lớn trên thẻ

> Trên thẻ thương hiệu ở trang `/thuong-hieu`, đưa **năm thành lập** thành yếu tố thị giác chính: font serif, cỡ lớn, màu `brass`, đặt ở góc trên bên phải thẻ. Bắt buộc dùng `font-variant-numeric: lining-nums` để chữ số không bị kiểu chữ cổ làm khó đọc — lỗi này đã từng xảy ra ở trang `/lich-su`.
>
> Làm tương tự với **năm ra mắt** trên thẻ mẫu iconic ở trang `/mau-iconic`.
>
> Chỉ đổi cách trình bày, **không đổi dữ liệu, không đổi bố cục lưới**. Kiểm cả chế độ sáng và tối, cả trên điện thoại.

## Prompt C — Phá nhịp trang chủ

> Trang chủ hiện có bốn khối liên tiếp dùng cùng một lưới 3 cột, khiến trang đọc rất đều đều. Đổi nhịp như sau, **giữ nguyên nội dung, chỉ đổi cách trình bày**:
>
> 1. **Hero** — thêm hoa văn guilloché SVG mờ làm nền, dùng lại đúng hoa văn đã viết cho `WatchImage.astro` để đồng bộ.
> 2. **Ba trụ cột** — giữ lưới 3 cột, tăng chiều cao thẻ, thêm biểu tượng cỡ lớn cho mỗi trụ cột.
> 3. **Mẫu iconic nổi bật** — đổi sang bố cục một thẻ lớn chiếm hai cột cộng hai thẻ nhỏ.
> 4. **Thêm dải mốc lịch sử** — dải ngang cuộn ngang được, hiện 5-6 mốc lấy từ `src/data/timeline.json`, mỗi mốc gồm năm cỡ lớn và một dòng mô tả, kèm liên kết sang `/lich-su`. Trên điện thoại phải vuốt ngang mượt.
> 5. **Thương hiệu** — thay lưới thẻ bằng dải tên hãng xếp dày dạng bảng chữ, dẫn sang `/thuong-hieu`.
> 6. **Thêm khối số liệu** — một dải nền `navy` với các con số lớn. **Các con số phải đếm tự động từ content collection, không viết cứng**, để không bao giờ lệch khi thêm bài.
>
> Kiểm kỹ chế độ tối cho toàn bộ các khối mới. Kiểm trên điện thoại.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.
