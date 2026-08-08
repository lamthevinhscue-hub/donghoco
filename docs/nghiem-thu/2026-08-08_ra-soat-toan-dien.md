# ĐỢT 7 — RÀ SOÁT TOÀN DIỆN

> **NGÀY NGHIỆM THU: 08/08/2026**
> **Đối tượng kiểm:** Commit `a3a62a3`, bản dựng **127 trang** lúc 11:08
> **Kết luận:** Toàn bộ 7 gói đã xong. **Nội dung mới sạch gần như tuyệt đối.** Bốn lỗi cần sửa, trong đó **ba lỗi nằm ở nội dung cũ chứ không phải nội dung mới** — và đó là lỗi của tôi, không phải của GLM.

---

# PHẦN 1 — QUY MÔ SAU KHI HOÀN THÀNH 7 GÓI

| Loại nội dung | Trước | Nay | Tăng |
|---|---|---|---|
| Thương hiệu | 26 | **26** | đủ 5 khối |
| Mẫu iconic | 16 | **26** | +10, đủ 26/26 hãng đều có |
| Bài cơ chế | 11 | **18** | +7 |
| Thuật ngữ từ điển | 14 | **32** | +18 |
| Hướng dẫn thực hành | 4 | **12** | +8 |
| **Tổng trang dựng** | 83 | **127** | **+44 trang** |

Trong đó **14 trên 18 bài cơ chế có hoạt ảnh**, và bốn bài hướng dẫn nhóm thao tác có thành phần tương tác người đọc tự điều khiển.

---

# PHẦN 2 — NỘI DUNG MỚI: ĐẠT

Tôi kiểm riêng phần GLM vừa làm ở bảy gói. Kết quả tốt hơn tôi dự tính, nhất là khi khối lượng lớn và làm trong thời gian ngắn.

## 2.1. Cấu trúc và kỹ thuật — sạch

- **26 trên 26 bài mẫu iconic có trường `brand` khớp tuyệt đối** với `title` của trang thương hiệu. Không lệch một cặp nào. Đây là lỗi từng xảy ra ở IWC trước đây nên tôi kiểm kỹ.
- **14 component hoạt ảnh đăng ký khớp hoàn toàn** với các bài khai `has_infographic: true`. Không bài nào khai có hoạt ảnh mà thiếu component, không component nào thừa.
- **Trần 8 link tự động hoạt động đúng.** Trang nhiều link nhất có 7 link. Đây là việc tôi lo sẽ hỏng khi từ điển lên 32 mục.
- **Dark mode phủ đủ trang mới**: các trang mới có từ 123 tới 140 lớp `dark:`, ngang mức trang cũ.
- **Thẻ Open Graph, canonical và structured data đủ 127 trên 127 trang.**
- **`robots.txt` đã có**, chặn 18 tác nhân thu thập AI, giữ Google và Bing.

## 2.2. Nội dung chuyên môn — đúng đặc tả

Tôi kiểm năm dữ kiện kỹ thuật khó mà tôi đã đặc tả riêng, để xem GLM có viết đúng không:

| Dữ kiện | Bài | Kết quả |
|---|---|---|
| Bánh răng pha trăng **59 răng** | `pha-trang` | Có |
| Chu kỳ trăng **29,53 ngày** | `pha-trang` | Có |
| Vành lặn **chỉ xoay một chiều** | `dung-vanh-lan` | Có |
| Khung giờ nguy hiểm **từ 20 giờ** | `chinh-lich-an-toan` | Có |
| Thang tachymeter **thưa dần** | `dung-tachymeter` | Có |

Năm trên năm. Đây đều là những chỗ dễ viết sai mà người am hiểu nhìn ra ngay.

## 2.3. 32 mục từ điển và 12 bài hướng dẫn — đúng phạm vi

- Độ dài các mục từ điển mới nằm trong khoảng hợp lý. Hai mục ngoài khoảng là `incabloc` và `minute-repeater` — **cả hai đều là mục cũ**, không phải mục mới.
- **12 bài hướng dẫn không có bài nào nêu giá bằng đô la.** Ba bài bị đánh dấu khi quét là bốn bài cũ có nhắc tên thương hiệu, không phải bài mới.

---

# PHẦN 3 — BỐN LỖI CẦN SỬA

## 3.1. Ký tự ngoài tiếng Việt và tiếng Anh — tái diễn lần thứ tư

| File | Dòng | Lỗi |
|---|---|---|
| `src/components/infographics/CoAxial.astro` | 47 | `dầu bôi tr梭 ma sát` — **chữ Hán 梭** lẫn vào giữa từ "trơn". Đây là chữ **hiển thị ra trang** `/co-che/bo-thoat-dong-truc` |

Đây là lần thứ tư loại lỗi này xuất hiện: đợt đầu chữ Trung, rồi chữ Kirin và Ả Rập, rồi chữ Trung ở bài dây tóc, nay lại chữ Trung. Ràng buộc "tự quét trước khi push" trong đoạn khóa vẫn chưa được thực hiện nghiêm.

**Riêng dấu chia trong `pha-trang.md` dòng 28 là hợp lệ**, dùng đúng ngữ cảnh toán học, không cần sửa.

## 3.2. Link 404 — bài Bambino trỏ tới mục từ điển không tồn tại

`src/content/mauIconic/vi/orient-bambino.md` có link tới `/tu-dien/kinh-dong-ho`. **Mục từ điển này không tồn tại** — "kính đồng hồ" được viết thành **bài cơ chế** `/co-che/kinh-dong-ho`, không phải mục từ điển.

Đây là lỗi do tôi: trong gói dữ liệu Bambino tôi viết "dẫn link sang bài hướng dẫn mức chống nước" nhưng GLM tự thêm link kính đồng hồ và đoán sai đường dẫn.

## 3.3. Giá bằng đô la — 16 file, và đây là lỗi của tôi

Quét ra **16 file còn giá bằng đô la**, phân bố:

| Loại | Số file |
|---|---|
| Thương hiệu | 10 trên 26 |
| Mẫu iconic | 2 trên 26 |
| Cơ chế | 2 trên 18 |
| Từ điển | 2 trên 32 |

**Mười file thương hiệu là:** A. Lange & Söhne, Audemars Piguet, Blancpain, Jaeger-LeCoultre, Omega, Patek Philippe, Rolex, TAG Heuer, Ulysse Nardin, Vacheron Constantin.

Nhìn danh sách này là thấy ngay vấn đề: **đây đúng là ba hãng của gói đợt 1 cộng bảy hãng đã có sẵn 5 khối từ trước khi bộ gói bắt đầu.** Nói cách khác, đây là toàn bộ nhóm mà **tôi chưa từng soạn gói dữ liệu có quy tắc bỏ giá**.

Quy tắc "không dùng giá bằng đô la vì lỗi thời rất nhanh" tôi đưa vào từ gói đợt 2 và áp dụng nhất quán từ đó. Nhưng **tôi chưa bao giờ quay lại dọn nhóm cũ** — và cũng chưa từng báo anh về khoảng trống này trong sáu lần nghiệm thu trước. Đây là thiếu sót của tôi.

Hệ quả cụ thể: trang Rolex ghi giá bán lẻ Royal Oak, trang Audemars Piguet ghi "giá cao hơn nhiều lần giá niêm yết", trang Blancpain ghi khoảng từ 8.000 tới hơn 200.000 đô la. Những con số này đã lỗi thời ngay khi viết ra.

## 3.4. Từ tiếng Anh đứng đơn lẻ — nhóm nội dung cũ

Quét các cụm hay lọt:

| Cụm | Số file |
|---|---|
| `in-house` | 29 |
| `dress watch` | 18 |
| `movement` | 18 |
| `bezel` | 12 |
| `lume` | 3 |
| `line` | 2 |
| `moonphase` | 2 |

Cần đối chiếu từng chỗ vì một số nằm trong ngoặc đơn sau từ tiếng Việt — đó là cách dùng **hợp lệ** theo `CONTENT-GUIDE.md`. Nhưng con số 29 file chứa `in-house` cho thấy phần lớn là dùng đơn lẻ, không phải trong ngoặc.

---

# PHẦN 4 — PROMPT SỬA, DÁN CHO GLM

> Rà soát toàn diện phát hiện bốn nhóm lỗi. **Ba nhóm nằm ở nội dung cũ**, không phải phần anh vừa làm — phần mới rất sạch.
>
> ## A. Ký tự ngoài tiếng Việt và tiếng Anh
>
> `src/components/infographics/CoAxial.astro` dòng 47: cụm `dầu bôi tr梭 ma sát` có **chữ Hán 梭** lẫn vào giữa chữ "trơn". Sửa thành `dầu bôi trơn ma sát`.
>
> Sau đó **quét toàn bộ `src/`** xác nhận không còn ký tự nào ngoài bảng chữ Latin, chữ Việt có dấu, dấu câu, ký hiệu toán học và biểu tượng. **Dán kết quả quét vào báo cáo.**
>
> Đây là lần thứ tư loại lỗi này tái diễn. Từ nay **bước quét ký tự phải chạy trước mọi lần push**, không ngoại lệ.
>
> ## B. Link 404
>
> `src/content/mauIconic/vi/orient-bambino.md` có link tới `/tu-dien/kinh-dong-ho` — **mục từ điển này không tồn tại**. Nội dung về kính đồng hồ nằm ở bài cơ chế. Sửa link thành `/co-che/kinh-dong-ho`.
>
> Sau đó **quét lại toàn bộ 127 trang đã dựng** xác nhận 0 link nội bộ hỏng.
>
> ## C. Dọn giá bằng đô la — 16 file
>
> Quy tắc trong `CONTENT-GUIDE.md` cấm dùng giá bằng đô la vì lỗi thời rất nhanh. Quy tắc này đã áp dụng cho phần lớn nội dung nhưng **nhóm nội dung cũ chưa được dọn**.
>
> **Bỏ toàn bộ con số giá bằng đô la, thay bằng mô tả định tính** trong các file sau:
>
> - **Thương hiệu (10 file):** `a-lange-soehne`, `audemars-piguet`, `blancpain`, `jaeger-lecoultre`, `omega`, `patek-philippe`, `rolex`, `tag-heuer`, `ulysse-nardin`, `vacheron-constantin`
> - **Mẫu iconic (2 file):** `freak`, `tudor-black-bay`
> - **Cơ chế (2 file):** `perpetual-calendar`, `tourbillon`
> - **Từ điển (2 file):** tự tìm bằng cách quét chữ `USD` trong `src/content/tuDien/vi/`
>
> **Cách thay:** dùng mô tả tương đối thay cho con số tuyệt đối. Ví dụ "từ 20.000 USD đến hơn 500.000 USD" đổi thành "trải từ mức nhập môn của phân khúc siêu sang tới các mẫu phức tạp cao cấp".
>
> **Đặc biệt chú ý:** trang `audemars-piguet` có cụm *"giá cao hơn nhiều lần giá niêm yết"* — đây vừa là bội số giá thị trường thứ cấp mà `CONTENT-GUIDE.md` cấm, vừa là con số lỗi thời. Thay bằng mô tả định tính về mức độ khan hiếm.
>
> ## D. Việt hóa từ tiếng Anh đứng đơn lẻ
>
> Quét toàn bộ `src/content/` tìm các cụm sau **đứng đơn lẻ giữa câu tiếng Việt**: `in-house`, `dress watch`, `movement`, `bezel`, `lume`, `line`, `moonphase`.
>
> **Quy tắc phân biệt:** nếu thuật ngữ nằm **trong ngoặc đơn sau từ tiếng Việt** thì **hợp lệ, giữ nguyên** — ví dụ "bộ máy (movement)". Nếu **đứng một mình giữa câu** thì phải Việt hóa:
>
> | Cụm | Thay bằng |
> |---|---|
> | `in-house` | `tự sản xuất` hoặc `bộ máy do hãng tự làm` |
> | `dress watch` | `đồng hồ thanh lịch` |
> | `movement` | `bộ máy` |
> | `bezel` | `vành` hoặc `vành xoay` |
> | `lume` | `dạ quang` |
> | `line` | `dòng` |
> | `moonphase` | `pha trăng` |
>
> Riêng `in-house` xuất hiện ở 29 file — **đây là cụm cần rà kỹ nhất**.
>
> ## Cách làm
>
> **Chia bốn phiên, push riêng:** phiên 1 làm mục A và B (nhẹ, sửa lỗi rõ ràng), phiên 2 làm mục C nhóm thương hiệu, phiên 3 làm mục C nhóm còn lại, phiên 4 làm mục D.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. Mỗi phiên chạy `npm run build`, quét ký tự lạ, quét link 404, báo mã commit.

---

# PHẦN 5 — NHẬN XÉT

Điều đáng ghi nhận: **44 trang nội dung mới được viết trong thời gian rất ngắn mà gần như không có lỗi cấu trúc nào.** Trường `brand` khớp 26 trên 26, component hoạt ảnh khớp 14 trên 14, trần link hoạt động đúng, dark mode phủ đủ, và năm dữ kiện kỹ thuật khó tôi đặc tả riêng đều được viết đúng. Đây là mức chất lượng cao hơn hẳn các đợt đầu.

Điều đáng nói về phía tôi: **ba trong bốn lỗi phát hiện lần này đều nằm ở nội dung cũ**, và lỗi giá bằng đô la là do tôi đặt ra quy tắc từ gói đợt 2 mà **chưa bao giờ quay lại dọn nhóm trước đó, cũng chưa từng báo anh trong sáu lần nghiệm thu**. Nếu anh không yêu cầu rà toàn diện thì 16 file này vẫn tiếp tục hiển thị số liệu lỗi thời.

Bài học cho các đợt sau: mỗi khi đặt ra một quy tắc nội dung mới, phải **rà ngược lại toàn bộ nội dung đã có**, không chỉ áp cho nội dung sắp viết.
