# CONTENT-GUIDE — "Hiến pháp nội dung" của Đồng Hồ Cơ

> **Mục đích:** Tệp này cố định giọng văn, nguyên tắc, cấu trúc bài chuẩn cho toàn bộ nội dung.
> Từ nay về sau, mọi bài viết mới hoặc chỉnh sửa **phải tuân thủ** tệp này.
> Khi giao việc cho AI, chỉ cần nhắc: *"Tuân thủ CONTENT-GUIDE.md"*.
>
> Tệp này được tham chiếu bởi **KẾ HOẠCH HOÀN THIỆN — Bước 0.3**.

---

## 1. GIỌNG VĂN — Nhà sưu tầm am hiểu

Website Đồng Hồ Cơ không viết như bài bán hàng, không viết như Wikipedia khô khan, và không viết như blog "giới thiệu sản phẩm". Giọng văn là của một **nhà sưu tầm đam mê, am hiểu sâu**, kể chuyện có cảm xúc nhưng chính xác về kỹ thuật.

### Đặc trưng giọng văn:

| ✅ NÊN | ❌ KHÔNG NÊN |
|--------|--------------|
| Kể chuyện — "Năm 1953, khi lặn bình khí đang bùng nổ..." | Bán hàng — "Mua ngay, giá tốt!" |
| Có cảm xúc — "chiếc đồng hồ định nghĩa cả một thể loại" | Khô khan — liệt kê thông số không ngữ cảnh |
| Chính xác kỹ thuật — "tần số 28.800 vph" | Vague — "chạy rất chính xác" |
| Khách quan — nêu cả ưu/nhược điểm | Một chiều — chỉ khen không chê |
| Công nhận đối thủ — "Tudor là lựa chọn thực tế hơn Rolex ở tầm giá này" | Dìm hàng — "Rolex quá đắt, không đáng" |
| Tiếng Việt tự nhiên, có thể mượn thuật ngữ Anh khi cần | Dịch máy — "bánh xe thoát" thay vì "escape wheel" |

### Đại từ xưng hô:
- Người viết xưng **"tôi"** hoặc **"Đồng Hồ Cơ"** (khi nói về trang).
- Độc giả xưng **"bạn"** — gần gũi, không "quý khách" (quá thương mại) hay "anh/chị" (quá thân).

---

## 2. NGUYÊN TẮC NỘI DUNG

### 2.1. Thuật ngữ chuyên môn
- **Lần xuất hiện đầu tiên** của mỗi thuật ngữ kỹ thuật phải kèm **giải thích ngắn tiếng Việt** trong ngoặc hoặc câu tiếp theo.
  - ✅ "Bezel (vành kim loại quanh mặt số) xoay một chiều..."
  - ❌ "Bezel xoay một chiều..." (không giải thích)
- Có thể giữ thuật ngữ tiếng Anh khi phổ biến hơn ("tourbillon", "chronograph", "rotor") — không ép dịch cứng.
- Khi cần, dẫn link tới [Từ điển thuật ngữ](/tu-dien) tương ứng.

### 2.2. Số liệu kỹ thuật
- **Phải chính xác, có thể kiểm chứng** — tần số dao động (vph), trữ cót (giờ), chống nước (m/ATM), năm ra đời, calibre.
- Nếu không chắc → không viết, hoặc ghi "khoảng" / "tùy thế hệ".
- Nguồn tham khảo: trang hãng, Hodinkee, WatchTime, aBlogtoWatch, diễn đàn WatchUSeek/r/Watches.

### 2.3. Link chéo (cross-linking)
- Khi nhắc một mẫu/thương hiệu/thuật ngữ **đã có bài** trên trang → **link tới bài đó**.
- Cú pháp Markdown: `[Rolex Submariner](/mau-iconic/rolex-submariner)`
- Giúp người đọc đi sâu, tăng SEO.

### 2.4. Hình ảnh
- Dùng component `<WatchImage>` (xem Bước 0.2).
- Ảnh phải có quyền sử dụng hợp lệ (xem IMAGE-MANIFEST.md).
- Ghi nguồn nếu giấy phép yêu cầu: `*Ảnh: © Rolex*`.

---

## 3. CẤU TRÚC BÀI CHUẨN

### 3.1. Bài thương hiệu

```markdown
## Tổng quan
(2-3 đoạn: lịch sử tóm tắt, vị thế, điểm đặc biệt)

## Triết lý chế tác
(2-3 đoạn: cách hãng tiếp cận chế tác, giá trị cốt lõi)

## Dòng sản phẩm chủ lực
(danh sách bullet, mỗi dòng 1-2 dòng mô tả)

## Calibre in-house tiêu biểu
(đoạn liệt kê + giải thích ngắn)

## Phân khúc giá
(đoạn: khoảng giá, định vị so với đối thủ)
```

### 3.2. Bài mẫu iconic

```markdown
## Bối cảnh ra đời
(câu chuyện — năm, bối cảnh lịch sử, vì sao ra đời)

## Đặc điểm thiết kế nhận diện
(bullet list các đặc trưng: vỏ, mặt số, kim, bezel...)

## Các thế hệ tham chiếu (reference)
(bảng hoặc danh sách các thế hệ chính)

## Bộ máy
(calibre, đặc điểm kỹ thuật)

## Vị trí trong lịch sử
(đoạn kết: vì sao mẫu này quan trọng, di sản)
```

### 3.3. Bài cơ chế (kèm infographic)

```markdown
> ✅ Infographic động đã có! (nếu có)

## (Cảnh 1 — giới thiệu vấn đề)
## (Cảnh 2-3 — hoạt ảnh minh họa)
## (Cảnh 4 — ứng dụng thực tế)

## Tóm tắt
(1 đoạn chốt lại dòng chảy/nguyên lý)
```

Cấu trúc 3 phần cho phần chữ đọc sâu: **Hiện tượng → Nguyên lý → Ý nghĩa lịch sử**.

---

## 4. QUY TẮC CHÍNH TẢ & ĐỊNH DẠNG

### 4.1. Tên riêng
- **Tên thương hiệu:** giữ nguyên tiếng Anh/Pháp — "Rolex", "Jaeger-LeCoultre", "A. Lange & Söhne" (không dịch).
- **Tên mẫu iconic:** giữ nguyên — "Submariner", "Royal Oak", "Fifty Fathoms".
- **Tên calibre:** giữ nguyên — "Calibre 3235", "El Primero".
- **Tên thành phố/xứ sở:** giữ nguyên khi là tên riêng — "Genève", "Glashütte", "Le Sentier".

### 4.2. Đơn vị
- **Tần số:** viết "28.800 vph" (dấu chấm ngăn nghìn theo kiểu Việt Nam) hoặc "4 Hz".
- **Trữ cót:** "70 giờ" (không "70h" hay "70 hours").
- **Chống nước:** "300m" hoặc "30 ATM" — dùng cùng đơn vị với hãng.
- **Giá:** dùng "USD" cho quốc tế, "triệu VND"/"tỷ VND" cho thị trường Việt.

### 4.3. Số & ngày
- Số: dấu chấm ngăn nghìn — "36.000 vph", "15.000 gauss".
- Ngày: "1 tháng 8, 2026" (kiểu Việt Nam, dấu phẩy trước năm).

### 4.4. Markdown
- Tiêu đề: dùng `##` (h2) cho mục chính, `###` (h3) cho mục con. Không dùng `#` (h1) trong thân bài — h1 là tiêu đề bài (frontmatter `title`).
- **In đậm** cho thuật ngữ quan trọng lần đầu xuất hiện.
- *In nghiêng* cho trích dẫn, tên tiếng nước ngoài.
- `Code` cho số tham chiếu (reference), calibre khi liệt kê.

---

## 5. TIÊU CHÍ DUYỆT NỘI DUNG (cho người rà soát)

Trước khi duyệt bài, kiểm tra:

- [ ] Giọng văn đúng nhà sưu tầm (không bán hàng, không khô khan)?
- [ ] Thuật ngữ đầu tiên có giải thích?
- [ ] Số liệu kỹ thuật chính xác, có nguồn (không bịa, không đoán)?
- [ ] Link chéo tới bài liên quan đã có?
- [ ] Cấu trúc bài đúng mẫu (thương hiệu / iconic / cơ chế)?
- [ ] Chính tả tiếng Việt đúng, tên riêng không dịch?
- [ ] Đơn vị nhất quán (vph, giờ, m)?
- [ ] Không ký tự ngoài tiếng Việt/Anh (quét bằng script Python)?
- [ ] Thuật ngữ tiếng Anh đều trong ngoặc sau từ Việt?
- [ ] Danh xưng "lâu đời nhất thế giới" chỉ dùng cho Blancpain (1735) / Vacheron (1755 liên tục)?
- [ ] Không có bội số giá secondary, không số tuổi tính từ mốc lịch sử?
- [ ] Tên riêng có đủ dấu (Gérald, Söhne, Glashütte, Frédérique...)?
- [ ] Địa danh/quốc gia đúng thời điểm sự kiện?
- [ ] Không có `custom_slug` lệch tên file?
- [ ] Không có tên bước / số giai đoạn / ghi chú nội bộ lộ ra giao diện?

---

## 6. QUY TẮC CHỐNG SAI SÓT

Đây là những lỗi đã từng xuất hiện trên trang và gây bối rối cho người đọc hoặc làm giảm độ tin cậy. Mọi bài viết — mới lẫn cũ — phải tuân thủ các quy tắc sau. Rà lại trước mỗi lần đẩy lên production.

### 6.1. Danh xưng độc quyền — "lâu đời nhất thế giới"
- **Chỉ Blancpain** được gọi là *"thương hiệu đồng hồ lâu đời nhất thế giới (1735)"*.
- **Chỉ Vacheron Constantin** được gọi là *"nhà chế tác hoạt động liên tục lâu đời nhất thế giới (1755)"*.
- Không hãng nào khác được dùng cụm "lâu đời nhất thế giới". Khi mô tả hãng khác, dùng "một trong những nhà chế tác lâu đời" hoặc tương đương.

### 6.2. Ký tự
- Chỉ dùng **tiếng Việt và tiếng Anh** trong giao diện và nội dung công khai.
- Không để lọt bất kỳ hệ chữ nào khác (Cyrillic, Ả Rập, Trung, Nhật, Hàn, Do Thái, Hy Lạp...).
- Kiểm lại bằng script quét (Python, không dùng `grep -P` vì không tin cậy với multi-byte) trước mỗi lần push.

### 6.3. Thuật ngữ tiếng Anh
- Thuật ngữ tiếng Anh **chỉ được đặt trong ngoặc đơn** sau từ tiếng Việt tương ứng, không đứng một mình giữa câu tiếng Việt.
  - ✅ "bộ máy (movement)", "cầu máy (bridge)", "bản đĩa 3/4 (three-quarter plate)".
  - ❌ "movement", "bridge", "plate" đứng trơ trọi.
- Ngoại lệ: tên dòng sản phẩm chính thức ("Royal Oak", "Traditionnelle", "Avant-garde"), tên calibre, slogan đã kèm bản dịch ngay sau.

### 6.4. Giá thị trường thứ cấp
- **Không dùng bội số cụ thể** (kiểu "gấp 3-5 lần giá bán lẻ") — các con số này lỗi thời rất nhanh.
- Chỉ mô tả định tính: *"giữ giá rất tốt"*, *"giữ giá tốt"*, *"giữ giá trung bình"*.
- Có thể kèm mốc thời gian: *"giữ giá rất tốt (tính đến 2024)"*.

### 6.5. Số năm tính từ mốc lịch sử
- **Không viết số năm tính từ mốc lịch sử** (kiểu "270 năm lịch sử", "165 năm gắn bó") vì sẽ tự sai theo thời gian.
- Chỉ ghi năm mốc: *"thành lập năm 1755"*, *"từ năm 1969"*.
- Ngoại lệ an toàn: "hơn 250 năm" cho tuổi của Swiss lever escapement (kỹ thuật, sai số nhiều thế kỷ), "hơn 130 năm sau" cho tuổi của một phát minh cụ thể.

### 6.6. Năm, tên calibre, thông số kỹ thuật
- **Mọi con số phải truy được về nguồn** (trang hãng, Hodinkee, WatchTime, aBlogtoWatch, diễn đàn uy tín).
- Nếu không chắc → **bỏ hẳn con số** và ghi vào `CAN-KIEM-CHUNG.md` để rà sau.
- Không đoán, không "khoảng" khi không rõ.

### 6.7. Tên riêng giữ nguyên dấu
- Các tên riêng phải giữ đúng dấu — viết thiếu dấu là sai chính tả:
  - **Gérald Genta** (không "Gerald Genta")
  - **A. Lange & Söhne** (không "Sohne")
  - **Glashütte** (không "Glashutte")
  - **Vallée de Joux** (không "Vallee de Joux")
  - **Métiers d'Art** (không "Metiers d'Art")
  - **Frédérique Constant** (không "Frederique Constant")
  - **Genève** (không "Geneve")

### 6.8. Tên địa danh và quốc gia phải đúng thời điểm
- Không dùng "Đông Đức" cho mốc **trước 1949** (chưa tồn tại) hay **sau 1990** (đã sáp nhập). Dùng "Sachsen, miền đông nước Đức" cho giai đoạn trước 1949.
- Không dùng "Liên bang Nga" cho mốc **trước 1991**. Dùng "Đế quốc Nga" (trước 1917) hoặc "Liên Xô" (1922–1991) tùy bối cảnh.
- Nguyên tắc chung: gọi tên địa lý/quốc gia theo cách gọi **đúng tại thời điểm sự kiện xảy ra**.

### 6.9. Quy ước địa chỉ trang (URL)
- Địa chỉ trang **sinh từ tên file** (hàm `getSlug` trong `src/lib/content.ts` lấy tên file, không đọc `custom_slug`).
- **Không đặt `custom_slug` khác tên file** — sẽ gây nhầm lẫn và sinh link chết. Nếu đã có `custom_slug` lệch, **xóa dòng đó** thay vì sửa.

### 6.10. Tên hãng thống nhất tuyệt đối
- Trường `title` của bài thương hiệu và trường `brand` của bài mẫu iconic **phải khớp từng ký tự**.
- Lệch một ký tự (VD: `title: "IWC Schaffhausen"` vs `brand: "IWC"`) → khối "Mẫu iconic liên quan" không nhận ra nhau và biến mất khỏi trang thương hiệu.
- Khi đổi `title` của một hãng, phải đổi `brand` ở mọi bài iconic tương ứng cùng lúc.

### 6.11. Không đưa quy trình vào giao diện
- Không đưa **tên bước** ("Bước 1.4", "Bước 2.2"), **số giai đoạn** ("giai đoạn 2"), hay **ghi chú quy trình** ("[GHI CHÚ NỘI BỘ]") ra giao diện công khai.
- Các ghi chú nội bộ chỉ nằm trong tài liệu quản trị (file `.md` ở thư mục `docs/`), không nằm trong `src/content/` hay `src/pages/`.

---

## 7. GHI CHÚ CHO AI

Khi viết bài mới, AI cần:
1. Đọc tệp này trước.
2. Đọc 1-2 bài mẫu cùng loại để nắm giọng.
3. Tra cứu số liệu chính xác (không bịa).
4. Sau khi viết, tự kiểm tra theo mục 5.
5. Báo cáo: *"Bài đã tuân thủ CONTENT-GUIDE.md, tự kiểm tra [X/Y] tiêu chí."*
