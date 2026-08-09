# PROMPT GIAO GLM — SỬA TIÊU ĐỀ MỜ Ở CHẾ ĐỘ TỐI

**Ngày soạn:** 09/08/2026
**Người soạn:** Claude (Cowork)
**Vấn đề anh Vinh báo:** không thấy rõ tiêu đề khi chuyển sang chế độ tối

---

## CHẨN ĐOÁN — ĐÃ TÌM ĐƯỢC NGUYÊN NHÂN GỐC VÀ ĐO ĐƯỢC

### Nguyên nhân

`src/styles/global.css` **dòng 31 tới 36** đặt màu cho **mọi thẻ tiêu đề** trên toàn site:

```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 600;
  line-height: 1.25;
  color: theme('colors.navy');    /* ← #1F2D3D */
}
```

**Và không có quy tắc `.dark` nào ghi đè cho tiêu đề.** Tôi đã kiểm: `global.css` có quy tắc `.dark` cho `.prose-content`, cho liên kết, cho chữ đậm, cho chữ trong SVG — **nhưng không có cho `h1` tới `h6`**.

Nghĩa là ở chế độ tối, tiêu đề vẫn giữ màu navy đậm trên nền than chì.

### Đo độ tương phản — con số cho thấy mức nghiêm trọng

| Màu chữ | Trên nền `#1A1D23` | Trên nền thẻ `#252830` | Chuẩn WCAG |
|---|---|---|---|
| **navy `#1F2D3D` — đang dùng** | **1,21 : 1** | **1,05 : 1** | **Không đạt** |
| `dark-text #E8DCC4` | 12,43 : 1 | 10,85 : 1 | Đạt AAA |
| `dark-brass #D4A85A` | 7,68 : 1 | — | Đạt AAA |

Chuẩn WCAG yêu cầu tối thiểu **4,5 : 1** cho chữ thường và **3 : 1** cho chữ cỡ lớn.

**Tỷ lệ 1,21 : 1 nghĩa là chữ gần như trùng màu nền.** Trên nền thẻ còn tệ hơn: **1,05 : 1** — về mặt thị giác là không phân biệt được. Đây đúng là hiện tượng anh gặp.

### Phạm vi ảnh hưởng

Quét toàn bộ file `.astro`:

- **Tổng thẻ tiêu đề: 95**
- **Không có lớp `dark:` nào: 23 thẻ, tức 24 phần trăm**

23 thẻ này rơi thẳng vào quy tắc mặc định ở `global.css` và trở thành gần như vô hình. Các thẻ còn lại có lớp `dark:text-dark-text` nên vẫn đọc được.

Tập trung nhiều nhất ở:

| File | Số thẻ thiếu |
|---|---|
| `src/pages/ve-chung-toi.astro` | 7 |
| `src/components/Footer.astro` | 3 |
| `src/pages/tu-dien/index.astro` | 2 |
| `src/components/Card.astro` | 1 |
| Bốn component infographic | 1 mỗi file |

---

# PROMPT DÁN CHO GLM 5.2

> Sửa lỗi tiêu đề gần như vô hình ở chế độ tối. Tôi đã tìm ra nguyên nhân gốc và đo được mức độ, nên việc sửa rất khoanh vùng.
>
> ## Nguyên nhân
>
> `src/styles/global.css` dòng 31 tới 36 đặt `color: theme('colors.navy')` cho **mọi thẻ `h1` tới `h6`** trên toàn site. **Không có quy tắc `.dark` nào ghi đè cho tiêu đề** — file này có quy tắc `.dark` cho `.prose-content`, liên kết, chữ đậm và chữ trong SVG, nhưng thiếu đúng phần tiêu đề.
>
> Kết quả đo độ tương phản ở chế độ tối:
>
> - navy `#1F2D3D` trên nền `#1A1D23`: **1,21 : 1**
> - navy `#1F2D3D` trên nền thẻ `#252830`: **1,05 : 1**
>
> Chuẩn WCAG yêu cầu tối thiểu 4,5 : 1. Tỷ lệ 1,05 nghĩa là chữ và nền gần như cùng một màu.
>
> ## A. Sửa gốc — quan trọng nhất, làm trước
>
> Thêm quy tắc `.dark` cho tiêu đề vào `src/styles/global.css`, đặt ngay sau khối `h1, h2, h3, h4, h5, h6` hiện có:
>
> ```css
> .dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6 {
>   color: theme('colors.dark-text');
> }
> ```
>
> **Một dòng này sửa được cả 23 thẻ tiêu đề đang thiếu lớp `dark:`**, và bảo vệ mọi tiêu đề viết mới về sau — không ai phải nhớ thêm lớp nữa.
>
> Màu `dark-text` là `#E8DCC4`, cho tỷ lệ **12,43 : 1** trên nền tối và **10,85 : 1** trên nền thẻ. Cả hai đều vượt chuẩn AAA.
>
> **Thêm chú thích ngay tại đó** giải thích vì sao cần quy tắc này, để sau này không ai xóa nhầm.
>
> ## B. Tăng độ nổi cho tiêu đề lớn
>
> Anh Vinh muốn tiêu đề **thể hiện rõ hơn**, không chỉ là đọc được. Ở chế độ tối, chữ ngà trên nền than chì tuy đạt chuẩn nhưng vẫn có cảm giác chìm vì thiếu điểm nhấn.
>
> Đề xuất: **dùng màu ánh kim đồng cho tiêu đề cấp cao nhất**, giữ chữ ngà cho các cấp dưới.
>
> ```css
> .dark h1 {
>   color: theme('colors.dark-brass');
> }
> ```
>
> Màu `dark-brass` là `#D4A85A`, tỷ lệ **7,68 : 1** — vẫn đạt AAA, mà tạo được phân cấp rõ ràng: tiêu đề trang nổi bật bằng màu đồng, tiêu đề mục dùng chữ ngà, nội dung dùng chữ ngà nhạt hơn.
>
> Cách này cũng **hợp với ý đồ thiết kế ban đầu** của chế độ tối: nền than chì, chữ ngà, điểm nhấn ánh kim đồng.
>
> **Nếu thấy màu đồng cho `h1` quá nổi**, phương án thay thế: giữ `h1` màu chữ ngà nhưng **tăng độ đậm lên 700** ở chế độ tối. Anh làm phương án màu đồng trước, tôi xem rồi quyết.
>
> ## C. Rà lại các lớp `dark:` đang có
>
> Sau khi thêm quy tắc gốc ở mục A, **72 thẻ tiêu đề đang có lớp `dark:text-dark-text`** trở thành thừa — quy tắc gốc đã lo phần đó.
>
> **Chưa xóa vội.** Chỉ cần kiểm xem có thẻ nào đang đặt lớp `dark:` với **màu khác** không, ví dụ một tiêu đề cố tình để màu đồng hoặc màu phân hạng. Những chỗ đó phải giữ nguyên vì quy tắc gốc dùng độ ưu tiên thấp hơn lớp tiện ích.
>
> Báo lại danh sách các tiêu đề đang dùng màu khác `dark-text`, tôi xem có chỗ nào cần giữ riêng không.
>
> ## D. Kiểm các chỗ khác cũng dùng màu navy cứng
>
> Quét toàn bộ `src/` tìm các chỗ đặt `text-navy` **mà không có lớp `dark:` đi kèm** — không chỉ thẻ tiêu đề mà cả thẻ `span`, `div`, `p`. Chúng gặp đúng vấn đề tương tự: navy trên nền tối là 1,21 : 1.
>
> Với mỗi chỗ tìm được, thêm lớp `dark:` phù hợp. Báo lại số lượng đã sửa.
>
> ## Nghiệm thu — kiểm bằng mắt, không chỉ bằng mã
>
> 1. **Bật chế độ tối và đi qua ít nhất tám trang khác loại:** trang chủ, một trang thương hiệu, một bài cơ chế có hoạt ảnh, trang Lịch sử, trang Giải phẫu, trang Từ điển, trang Về chúng tôi (**đây là trang có 7 tiêu đề thiếu lớp `dark:`, nhiều nhất site**), và chân trang.
> 2. **Ở mỗi trang, nhìn kỹ tiêu đề mọi cấp** — không chỉ tiêu đề lớn. Tiêu đề cấp ba và cấp bốn hay bị bỏ sót.
> 3. **Kiểm tiêu đề nằm trên nền thẻ** — đây là chỗ tệ nhất, tỷ lệ 1,05 : 1. Ví dụ tiêu đề trong thẻ ở trang danh sách, trong bảng đối chiếu ở trang thương hiệu.
> 4. **Kiểm cả chế độ sáng** để chắc chắn không làm hỏng thứ đang đúng.
> 5. Chạy `npm run build` — bốn phép kiểm tự động phải qua hết.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

---

## GHI CHÚ

**Vì sao sửa ở gốc thay vì thêm lớp vào 23 chỗ.** Thêm lớp `dark:` vào từng thẻ chỉ giải quyết 23 chỗ hiện tại, và **mỗi tiêu đề viết mới về sau lại phải nhớ thêm lớp**. Quy tắc `.dark` ở `global.css` giải quyết vĩnh viễn, và đúng chỗ mà lỗi phát sinh.

**Về việc 24 phần trăm tiêu đề thiếu lớp `dark:`.** Con số này cho thấy cách làm dark mode hiện tại phụ thuộc vào việc **nhớ thêm lớp ở từng chỗ** — dễ sót là chuyện tất yếu. Sau khi sửa gốc, nên coi việc thêm lớp `dark:` cho tiêu đề là **không cần thiết nữa**, tránh lặp lại.
