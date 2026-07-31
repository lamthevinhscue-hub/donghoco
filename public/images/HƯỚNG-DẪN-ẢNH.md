# Hướng dẫn thêm ảnh & logo (ĐỌC KỸ TRƯỚC KHI THÊM ẢNH)

> ⚠️ **Quan trọng về bản quyền:** Tôi (ZCode) **KHÔNG** tự tải ảnh từ trang hãng
> vì vi phạm bản quyền. **Bạn** phải tự lấy ảnh từ nguồn hợp lệ và chịu trách nhiệm.
> Tệp này hướng dẫn bạn lấy ảnh đúng cách + cách đặt vào website.

---

## ❌ KHÔNG ĐƯỢC LÀM

- **Không** tải ảnh bất kỳ từ Google Images → gần như luôn vi phạm bản quyền.
- **Không** chụp màn hình ảnh sản phẩm trên trang hãng → vẫn là ảnh của hãng.
- **Không** dùng ảnh từ các diễn đàn/blogger nếu không rõ nguồn + giấy phép.

---

## ✅ NGUỒN HỢP LỆ (an toàn nhất xếp trước)

### 1. Trang Press/Media của hãng (tốt nhất)
Nhiều hãng cung cấp **ảnh báo chí chính thức** cho phép dùng với điều kiện ghi nguồn.
Tìm mục có tên: **"Press", "Media", "Media Center", "Press Room"** ở chân trang hãng.

| Hãng | Trang Press |
|------|-------------|
| Rolex | rolex.com → chân trang → "Press" |
| Omega | omegawatches.com → "Press Corner" |
| Patek Philippe | patek.com → "Media" |
| Seiko / Grand Seiko | seikowatches.com → "Press" |
| Hublot, TAG Heuer | (thuộc LVMH) → trang nhóm LVMH Watchmaking |

**Cách làm:**
1. Vào trang Press của hãng.
2. Tải ảnh sản phẩm/mẫu iconic ở độ phân giải cao.
3. **Đọc kỹ điều khoản** — thường yêu cầu ghi nguồn "© Tên hãng".
4. Lưu file (xem quy ước đặt tên bên dưới).
5. Ghi nguồn trong bài viết (thêm dòng `*Ảnh: © Rolex*` dưới ảnh).

### 2. Ảnh bạn tự chụp (an toàn tuyệt đối)
Nếu bạn có chiếc đồng hồ đó → tự chụp → bản quyền 100% của bạn.
Chất lượng không cần chuyên nghiệp, miễn rõ mặt số.

### 3. Ảnh có giấy phép free (Unsplash, Pexels)
- https://unsplash.com , https://pexels.com — ảnh free, giấy phép rộng.
- **Nhưng:** ít có ảnh đồng hồ cao cấp cụ thể (Rolex Submariner...).
- Phù hợp cho ảnh "chung chung" (đồng hồ trên bàn, cổ tay đeo đồng hồ...).

### 4. Wikimedia Commons
- https://commons.wikimedia.org — ảnh có giấy phép tự do (CC BY, CC0).
- Tìm "Rolex Submariner" → có thể có ảnh người dùng đóng góp.
- **Phải ghi công tác giả** theo giấy phép (thường là CC BY-SA).

---

## 📁 CÁCH ĐẶT ẢNH VÀO WEBSITE

### Ảnh bìa mẫu iconic
1. Đặt ảnh vào thư mục: **`public/images/mau-iconic/`**
2. Đặt tên: chữ thường, không dấu, `.jpg` hoặc `.png`
   - Ví dụ: `rolex-submariner.jpg`, `omega-speedmaster.jpg`
3. Mở bài Markdown tương ứng: `src/content/mauIconic/vi/rolex-submariner.md`
4. Trong phần `---` đầu bài, thêm/sửa dòng `cover_image`:
   ```
   cover_image: "/images/mau-iconic/rolex-submariner.jpg"
   ```
5. Lưu → ảnh tự hiện trên trang chi tiết và trang danh sách.

### Logo thương hiệu
1. Đặt logo vào: **`public/images/thuong-hieu/logos/`**
2. Đặt tên theo slug thương hiệu: `rolex.png`, `omega.png`, `seiko.png`...
3. **Khuyến nghị:** logo định dạng **PNG nền trong suốt**, kích thước vuông (vd 200×200px).
4. Mở bài thương hiệu: `src/content/thuongHieu/vi/rolex.md`
5. Trong phần `---`, thêm dòng `logo`:
   ```
   logo: "/images/thuong-hieu/logos/rolex.png"
   ```
6. Lưu → logo tự hiện nhỏ bên cạnh tên thương hiệu trong Card.

---

## 📐 KHUYẾN NGHỊ VỀ ẢNH

### Ảnh bìa mẫu iconic
- **Tỷ lệ:** 16:10 (ngang) — ví dụ 1600×1000px.
- **Định dạng:** JPG (nhỏ hơn) hoặc PNG.
- **Dung lượng:** dưới 300KB/ảnh (dùng https://tinypng.com để nén).
- **Nội dung:** ưu tiên ảnh sản phẩm chính diện, rõ mặt số + bezel.

### Logo thương hiệu
- **Định dạng:** PNG nền trong suốt.
- **Kích thước:** vuông, 200×200px (web tự thu nhỏ còn 24×24px khi hiển thị).
- **Nền:** **trong suốt** (không nền trắng) — để hiện đẹp trên nền kem.

---

## ✅ CHECKLIST KHI THÊM ẢNH

- [ ] Tôi có **quyền sử dụng** ảnh này (từ Press hãng / tự chụp / CC / free).
- [ ] Tôi đã **ghi nguồn** trong bài (nếu giấy phép yêu cầu).
- [ ] Ảnh đã **nén** (dưới 300KB).
- [ ] Tên file: **chữ thường, không dấu, .jpg/.png**.
- [ ] Tôi đã thêm dòng `cover_image` / `logo` trong phần `---` của bài.

---

## 💡 LƯU Ý VỀ LOGO THƯƠNG HIỆU

Logo là **nhãn hiệu đã đăng ký**. Dùng logo thương hiệu trên website của bạn
thường được chấp nhận trong ngữ cảnh **"nói về thương hiệu đó"** (fair use /
nominative use) — miễn là:
- Không ngụ ý bạn là **đại lý chính thức** của hãng.
- Không **sửa đổi** logo (đổi màu, biến dạng).
- Logo được dùng để **nhận diện** thương hiệu bạn đang giới thiệu.

Nếu nghi ngờ, bỏ trống trường `logo` — website vẫn chạy bình thường (chỉ hiện tên,
không hiện logo). Logo là tùy chọn, không bắt buộc.
