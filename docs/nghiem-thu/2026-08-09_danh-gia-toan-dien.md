# ĐỢT 8 — ĐÁNH GIÁ TOÀN DIỆN

> **NGÀY NGHIỆM THU: 09/08/2026**
> **Đối tượng kiểm:** Commit `b4adf05`, bản dựng **127 trang** lúc 11:13
> **Kết luận:** Đây là lần nghiệm thu **sạch nhất từ trước tới nay**. Ba lỗi cần sửa, đều nhẹ. Một việc tôi giao mà GLM chưa làm.

---

# PHẦN 1 — ĐÃ HOÀN THÀNH

## 1.1. Nền tảng bảo mật — đạt gần trọn

| Hạng mục | Trạng thái |
|---|---|
| `installCommand` dùng `npm ci` | **Xong** — đây là việc có tỷ lệ hiệu quả cao nhất trong cả hai bản đánh giá |
| Dependabot | **Xong** — có `.github/dependabot.yml` |
| Năm HTTP security header | **Xong** và đang có tác dụng |
| Form newsletter thu email trái phép | **Đã gỡ** |
| `new Function` tương đương eval | **Đã bỏ** |
| Bốn script kiểm tra nối vào quy trình dựng | **Xong** — `npm run check` chạy trước, `check-links` chạy sau khi dựng |

**Điểm đáng ghi nhận nhất:** bốn script kiểm tra nay **thực sự chạy khi build**, không còn là mã chết. Đây là thay đổi có giá trị lâu dài nhất trong đợt — nó chặn được **loại lỗi đã tái diễn bốn lần**.

## 1.2. Hoạt ảnh cơ chế — trọn vẹn

**18 trên 18 bài** có hoạt ảnh, **18 trên 18** được đánh dấu tương tác, **18 component đăng ký khớp** — không thừa không thiếu.

## 1.3. Trang Lịch sử — đã bỏ cuộn ngang

`overflow-x: auto` nay bằng **0**. Bố cục dọc so le hai bên đã dựng, kèm thanh điều hướng dính nhóm theo 50 năm.

## 1.4. Kiểm chứng độc lập — sạch

- **Link nội bộ hỏng: 0** trên 127 trang.
- **Ký tự ngoài tiếng Việt và tiếng Anh: 0** trong toàn bộ mã nguồn.
- **Giá bằng đô la: 0 file** — 16 file lần trước đã dọn sạch.

## 1.5. Ảnh trang trí — đã có

Bảy ảnh OG và nền đã sinh và đặt đúng chỗ. `og-default.jpg` nay tồn tại, lỗi ảnh chia sẻ hỏng đã khắc phục.

---

# PHẦN 2 — BA LỖI CẦN SỬA

## 🔴 LỖI-01 — File rác 2,5 MB đang được triển khai

**Vị trí:** `public/og-default.jpg.png`

### Bản chất

Thư mục `public/` có **hai file** cho cùng một mục đích:

| File | Kích thước | Định dạng thật | Được tham chiếu |
|---|---|---|---|
| `og-default.jpg` | 152 KB | JPEG | **Có** — đúng file đang dùng |
| `og-default.jpg.png` | **2.611 KB** | PNG 1731×909 | **Không ai trỏ tới** |

File thứ hai có **đuôi kép** — dấu vết của thao tác lưu file không đặt lại tên. Nó **không được tham chiếu ở bất kỳ đâu** nhưng đã vào thư mục `dist/` và đang được triển khai.

### Vì sao đáng sửa

**2,5 MB này chiếm hơn một nửa tổng dung lượng ảnh của cả site** (tổng ảnh khoảng 4 MB). Nó không phục vụ gì, nhưng:

- Nằm trong mỗi lần triển khai.
- **Có thể bị tải trực tiếp qua địa chỉ** — đúng loại mục tiêu cho tấn công bòn rút băng thông đã nêu ở đánh giá bảo mật. Một file 2,5 MB tải được công khai là món quà cho kịch bản đó.

### Khắc phục

Xóa `public/og-default.jpg.png`. Kiểm lại `dist/` sau khi dựng để chắc chắn nó không còn.

---

## 🟠 LỖI-02 — Chưa dọn "in-house" đứng đơn lẻ

**Phạm vi:** 29 file trong `src/content/`, **52 lần xuất hiện**

### Bản chất

Ở đợt nghiệm thu ngày 08/08 tôi đã giao việc Việt hóa các cụm tiếng Anh đứng đơn lẻ. Các cụm khác đã dọn, riêng `in-house` thì **chưa**.

Đếm chính xác: **52 lần xuất hiện, chỉ 5 lần nằm trong ngoặc đơn sau từ tiếng Việt** — tức cách dùng hợp lệ theo `CONTENT-GUIDE.md`. **Còn khoảng 47 lần đứng đơn lẻ giữa câu tiếng Việt.**

Ví dụ thực tế:

```
Fifty Fathoms hiện đại dùng calibre in-house **1315**
Nautilus hiện dùng calibre in-house **26-330 S C**
Black Bay với **calibre in-house MT5602**
```

### Khắc phục

Thay `calibre in-house` bằng **`bộ máy do hãng tự sản xuất`** hoặc **`calibre tự sản xuất`**, tùy ngữ cảnh câu.

**Giữ nguyên 5 chỗ đã đúng dạng ngoặc đơn**, và giữ nguyên dòng chú thích trong `src/content/config.ts` vì đó là mã nguồn, không phải nội dung hiển thị.

---

## 🟡 LỖI-03 — Việc tôi giao mà GLM chưa làm: chuyển font

**Trạng thái:** chưa bắt đầu

`tailwind.config.mjs` vẫn khai `serif: ['"Playfair Display"', 'Georgia', 'serif']`, và `BaseLayout.astro` vẫn nạp Playfair Display từ Google Fonts.

Đây là **Gói 1** trong `docs/de-xuat-font-va-bo-cuc-lich-su.md`. GLM đã làm Gói 2 (bố cục Lịch sử) nhưng bỏ qua Gói 1, trong khi tài liệu ghi rõ **làm Gói 1 trước**.

**Không phải lỗi kỹ thuật** — chỉ là việc chưa làm. Nhưng thứ tự tôi đề nghị có lý do: đổi font ảnh hưởng toàn site, nên làm khi trang còn ở trạng thái đã biết. Nay bố cục Lịch sử đã đổi trước, nếu font gây lệch gì ở trang đó thì khó truy nguyên nhân hơn.

**Khắc phục:** chạy Gói 1 như đã soạn. Không cần sửa gì trong tài liệu.

---

# PHẦN 3 — HAI VIỆC CÒN TREO, KHÔNG PHẢI LỖI

## 3.1. Trang Lịch sử vẫn nặng 200 KB

Đây là **Gói D** trong `docs/bo-prompt-glm-cung-co-nen-tang.md` — chưa làm.

Phân tích nguyên nhân: trang có **40 khối SVG nội tuyến chiếm 105 KB trên tổng 191 KB**, tức **55 phần trăm trọng lượng trang là SVG nhúng thẳng vào HTML**.

Việc đổi bố cục vừa rồi **không giảm được trọng lượng** vì nó chỉ đổi cách sắp xếp, không đụng tới các khối SVG.

**Đề nghị:** chạy Gói D. Tách các khối SVG lặp lại thành tệp riêng để trình duyệt lưu đệm được. Mục tiêu dưới 120 KB.

## 3.2. `CAN-KIEM-CHUNG.md` còn 21 mục

Phần lớn đã đánh dấu giải quyết ở các đợt trước. Số mục không giảm vì quy ước là **không xóa dòng, chỉ đánh dấu** — để giữ dấu vết. Đây là cách làm đúng, không cần sửa.

---

# PHẦN 4 — PROMPT DÁN CHO GLM

> Ba việc, làm theo thứ tự, push riêng.
>
> ## A. Xóa file rác đang triển khai
>
> Thư mục `public/` có file **`og-default.jpg.png`** — đuôi kép, kích thước **2,5 MB**, định dạng thật là PNG. File này **không được tham chiếu ở bất kỳ đâu** nhưng đang nằm trong mỗi lần triển khai.
>
> File đúng đang dùng là `public/og-default.jpg` (152 KB, định dạng JPEG). Giữ nguyên file này.
>
> **Việc cần làm:**
>
> 1. Xóa `public/og-default.jpg.png`.
> 2. Chạy `npm run build`, kiểm `dist/` không còn file đó.
> 3. **Rà thêm toàn bộ `public/`** xem có file nào khác bị đuôi kép hoặc không được tham chiếu không. Báo lại danh sách.
>
> **Vì sao đáng làm ngay:** 2,5 MB này chiếm hơn nửa tổng dung lượng ảnh của site, không phục vụ gì, và **tải được công khai qua địa chỉ trực tiếp** — đúng loại mục tiêu cho tấn công bòn rút băng thông.
>
> ## B. Dọn nốt "in-house" đứng đơn lẻ
>
> Ở đợt trước anh đã Việt hóa các cụm tiếng Anh đứng đơn lẻ, nhưng **`in-house` thì chưa dọn**.
>
> Số liệu chính xác: **52 lần xuất hiện trong 29 file** của `src/content/`, trong đó **chỉ 5 lần nằm trong ngoặc đơn sau từ tiếng Việt** — tức cách dùng hợp lệ. Còn khoảng **47 lần đứng đơn lẻ**.
>
> **Cách sửa:**
>
> | Dạng hiện tại | Thay bằng |
> |---|---|
> | `calibre in-house **1315**` | `bộ máy do hãng tự sản xuất **1315**` |
> | `chronograph **in-house**` | `chronograph do hãng tự sản xuất` |
> | `dùng calibre in-house của Rolex` | `dùng bộ máy do chính Rolex sản xuất` |
>
> **Hai chỗ giữ nguyên, không sửa:**
>
> 1. **Năm chỗ đã đúng dạng ngoặc đơn** sau từ tiếng Việt — đây là cách dùng hợp lệ theo `CONTENT-GUIDE.md`.
> 2. **Dòng chú thích trong `src/content/config.ts`** — đó là mã nguồn, không phải nội dung hiển thị.
>
> Sau khi sửa, chạy lại phép đếm và báo con số còn lại.
>
> ## C. Chuyển font sang không chân
>
> Đây là **Gói 1** trong `docs/de-xuat-font-va-bo-cuc-lich-su.md` — anh đã làm Gói 2 nhưng bỏ qua Gói 1.
>
> Mở tài liệu đó, làm đúng phần **GÓI 1 — CHUYỂN FONT SANG KHÔNG CHÂN**. Không cần tôi soạn lại, nội dung vẫn nguyên giá trị.
>
> **Nhắc lại ba điểm quan trọng nhất trong đó:**
>
> 1. **Giữ nguyên tên lớp `font-serif`** dù giá trị bên trong đổi thành font không chân — lớp này dùng ở 107 chỗ trên 39 file, đổi tên là rủi ro sót cao mà không được lợi gì.
> 2. **Giữ font có chân riêng cho `WatchImage.astro` dòng 132** — chữ cái trong ô giữ chỗ mặt số là đồ họa, không phải chữ đọc.
> 3. **Bắt buộc kiểm dấu tiếng Việt ở cỡ chữ lớn** sau khi đổi: `ệ`, `ỗ`, `ự`, `ườ`, `ẫ`, `ợ` — phóng to xem dấu có chồng nhau hay bị cắt không, ở cả chế độ sáng và tối.
>
> **Ràng buộc chung cho cả ba việc:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. Mỗi việc chạy `npm run build` — nay đã có bốn phép kiểm tự động, phải qua hết.

---

# PHẦN 5 — NHẬN XÉT

**Về chất lượng đợt này.** Đây là lần nghiệm thu sạch nhất từ trước tới nay: 0 link hỏng, 0 ký tự lạ, 0 giá đô la, 18 trên 18 hoạt ảnh đầy đủ, và nền tảng bảo mật gần như trọn vẹn. Ba lỗi phát hiện đều nhẹ, không có lỗi nào ảnh hưởng người đọc.

**Về việc bốn script kiểm tra nay thực sự chạy.** Tôi cho đây là thay đổi giá trị nhất trong toàn bộ đợt, hơn cả các việc bảo mật. Lý do: nó chuyển việc phát hiện lỗi từ **phụ thuộc vào việc tôi có rà hay không** sang **tự động chặn tại chỗ**. Ba đợt vừa qua tôi tìm ra ký tự lạ bốn lần; từ nay build sẽ tự chặn.

**Điều đáng chú ý là lỗi lần này khác hẳn các lần trước.** Không còn lỗi kiến thức, lỗi mâu thuẫn chéo hay lỗi ký tự. Ba lỗi lần này là: một file rác quên xóa, một cụm từ dọn sót, và một gói việc chưa làm. Đây là dấu hiệu dự án đã qua giai đoạn sửa lỗi nền và chuyển sang giai đoạn hoàn thiện.

**Việc quan trọng nhất vẫn chưa làm, và nó không nằm trong tay GLM.** Từ biên bản ngày 06/08 tôi đã đề nghị **kiểm thử trên điện thoại thật** — site nay có 18 hoạt ảnh cơ chế, bốn bài hướng dẫn có thành phần tương tác, trang Giải phẫu, bộ lọc, tìm kiếm không dấu, chế độ tối, menu xổ, và **bố cục Lịch sử vừa đổi hoàn toàn**. Toàn những chỗ hỏng thầm lặng mà kiểm mã không thấy.

Bố cục Lịch sử mới đặc biệt cần kiểm tận tay: nó vừa thay đổi lớn, và thanh điều hướng dính là loại thành phần rất dễ hỏng trên màn hình nhỏ.
