# Hướng dẫn chạy website

> **Bạn không cần biết lập trình để dùng website này.** Tài liệu này giải thích từng bước bằng lời.

## Website gồm những gì?

- **Nội dung (bạn tự sửa được):** nằm trong `src/content/` — viết bằng Markdown (giống soạn email).
- **Phần kỹ thuật (tôi lo):** còn lại — cấu hình, giao diện, logic. Bạn ít khi đụng tới.

---

## 1. Cách xem website trên máy bạn (chạy thử)

**Làm 1 lần duy nhất** — cài đặt các công cụ cần thiết:

1. Cài **Node.js** (bản LTS) từ https://nodejs.org — giống như cài phần mềm bình thường.

**Mỗi khi muốn xem website:**

2. Mở thư mục `D:\Watch web build`
3. Mở **Terminal** (Command Prompt hoặc PowerShell) tại đây:
   - Cách nhanh: gõ `cmd` vào thanh địa chỉ thư mục rồi Enter
4. Gõ lệnh sau và Enter:

   ```
   npm run dev
   ```

5. Khi thấy dòng `Local: http://localhost:4321/` — mở trình duyệt, vào địa chỉ đó.
6. Mỗi lần bạn sửa nội dung, trình duyệt tự cập nhật.
7. Để dừng: nhấn `Ctrl + C` trong Terminal.

---

## 2. Cách thêm / sửa bài viết (bạn tự làm được)

### Sửa bài có sẵn
1. Mở thư mục tương ứng, ví dụ `src/content/vi/thuong-hieu/rolex.md`
2. Sửa chữ (chỉ phần chữ, không động tới phần `---` ở đầu nếu không rõ)
3. Lưu tệp → website tự cập nhật

### Thêm bài mới
1. Tìm một bài mẫu cùng loại (ví dụ muốn thêm thương hiệu → copy `rolex.md`)
2. Đặt tên tệp mới: chữ thường, không dấu, cách bằng dấu gạch ngang (ví dụ `tudor.md`)
3. Sửa các trường trong phần `---` và nội dung bên dưới
4. Lưu → bài mới tự xuất hiện trên website

### Các loại bài viết
| Loại | Thư mục | Mỗi tệp là |
|------|---------|------------|
| Thương hiệu | `src/content/vi/thuong-hieu/` | Một thương hiệu |
| Mẫu iconic | `src/content/vi/mau-iconic/` | Một mẫu đồng hồ huyền thoại |
| Cơ chế | `src/content/vi/co-che/` | Một cơ chế (sẽ có infographic) |
| Từ điển | `src/content/vi/tu-dien/` | Một thuật ngữ |
| Hướng dẫn | `src/content/vi/huong-dan/` | Một bài hướng dẫn thực hành |

### Thêm ảnh
- Đặt ảnh vào thư mục `public/images/`
- Trong bài viết, chèn bằng: `![mô tả ảnh](/images/ten-anh.jpg)`

---

## 3. Cú pháp Markdown cơ bản

Markdown là cách viết định dạng bằng ký hiệu đơn giản:

```
# Tiêu đề lớn nhất
## Tiêu đề mục
### Tiêu đề nhỏ

Đoạn chữ bình thường.

**Chữ in đậm**
*Chữ in nghiêng*

- Danh sách gạch đầu dòng
- Mục thứ hai

1. Danh sách có số
2. Mục thứ hai

> Trích dẫn — chữ nổi bật, in nghiêng

[Chữ liên kết](https://địa-chỉ-web.com)

![Mô tả ảnh](/images/tên-ảnh.jpg)
```

> Mở tệp `rolex-submariner.md` để xem ví dụ thực tế.

---

## 4. Khi website đã hoàn thiện — đưa lên mạng

Ở giai đoạn sau, tôi sẽ hướng dẫn chi tiết. Tóm lại:
- Website sẽ được đặt miễn phí trên **Cloudflare Pages** hoặc **Netlify**
- Mỗi lần bạn sửa nội dung, website tự động cập nhật trên mạng
- Cần một **tên miền** (như `dongho.com` hoặc `dongho.vn`)

---

## 5. Lời khuyên cho người không code

- ✅ **NÊN:** sao lưu thư mục trước khi sửa nhiều.
- ✅ **NÊN:** sửa từng chút, xem kết quả, rồi sửa tiếp.
- ✅ **NÊN:** khi không rõ, copy từ một bài mẫu rồi sửa chữ.
- ❌ **KHÔNG:** xóa các ký tự `---` ở đầu bài viết (đó là thông tin cấu hình).
- ❌ **KHÔNG:** đổi tên tệp/thư mục ở phần kỹ thuật nếu không được hướng dẫn.

---

Có thắc mắc gì, cứ hỏi tôi!
