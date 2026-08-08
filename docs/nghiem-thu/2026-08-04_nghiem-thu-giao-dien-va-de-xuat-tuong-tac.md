# ĐỢT 4 — NGHIỆM THU GIAO DIỆN VÀ ĐỀ XUẤT VÒNG TƯƠNG TÁC

> **NGÀY NGHIỆM THU: 04/08/2026**
> **Loại:** Nghiệm thu ba prompt giao diện và gói bổ sung lịch sử, cộng đề xuất vòng cải tiến tương tác và cấu trúc site
> **Đối tượng kiểm:** Commit `d763266`, bản dựng 83 trang lúc 06:56 ngày 04/08
> **Kết luận ngắn:** Cả bốn việc giao đợt trước đều **đạt**. Vòng tiếp theo nên tập trung vào một vấn đề duy nhất: **mỗi bài viết hiện là một ngõ cụt** — người đọc xong không được mời đi tiếp đâu cả.

---

# PHẦN 1 — NGHIỆM THU ĐỢT VỪA RỒI

| Việc giao | Kết quả | Kiểm chứng |
|---|---|---|
| Prompt A — ô giữ chỗ mặt số + mã màu 5 phân hạng | **Đạt** | `WatchImage.astro` đã vẽ mặt số SVG với hoa văn guilloché, bỏ biểu tượng lỗi; `tailwind.config.mjs` có đủ 5 màu `tier-*` kèm safelist cho biến thể dark |
| Prompt B — năm thành lập cỡ lớn trên thẻ | **Đạt** | `Card.astro` có `lining-nums`, năm hiển thị serif cỡ lớn |
| Prompt C — phá nhịp trang chủ | **Đạt** | Trang chủ từ 147 lên 283 dòng: 6 khối khác nhịp, dải mốc lịch sử cuộn ngang lấy từ `timeline.json`, khối số liệu **đếm tự động từ content collection** đúng yêu cầu |
| Gói bổ sung lịch sử IWC + Cartier | **Đạt** | IWC 14 mốc, Cartier 18 mốc, đúng số lượng cấp; `CAN-KIEM-CHUNG.md` đã cập nhật |
| Kiểm chứng nền | **Sạch** | 0 link 404 trên 83 trang; tooltip từ điển hoạt động (link kèm `title` và class `glossary-autolink`) |

**Trạng thái tổng:** nội dung 24/26 hãng đủ 5 khối, đủ 8 tính năng nền tảng, giao diện đã qua một vòng nâng cấp. Còn thiếu duy nhất: **0 ảnh thật** (việc của anh, không phải của GLM) và dữ liệu Orient, Tissot.

---

# PHẦN 2 — CHẨN ĐOÁN TƯƠNG TÁC: BÀI VIẾT LÀ NGÕ CỤT

Tôi dò đường đi của người đọc qua các trang đã dựng. Phát hiện chính:

## 2.1. Không có lối đi tiếp ở cuối bài

Kiểm HTML thực tế: cuối bài `/mau-iconic/rolex-submariner`, `/co-che/tourbillon`, `/huong-dan/do-sai-so` — **không có khối "bài liên quan" hay "đọc tiếp" nào**. Lối thoát duy nhất là nút "Quay lại danh sách" nằm ở **đầu** trang, nơi người vừa đọc xong bài không còn nhìn thấy.

Hệ quả: người đọc xong một bài phải tự cuộn ngược lên hoặc bấm nút trình duyệt. Với trang nội dung, đây là chỗ mất người đọc lớn nhất — đúng lúc họ đang hứng thú nhất thì mình không mời họ gì cả.

So sánh nội bộ: trang thương hiệu làm tốt hơn hẳn nhờ Khối 4 (bảng đối chiếu có link sang ba đối thủ) và Khối 5 (mẫu iconic liên quan). Các loại bài còn lại không có gì tương đương.

## 2.2. Trang `/so-sanh` gần như không có lối vào

Công cụ so sánh — một trong những tính năng đáng giá nhất — hiện chỉ vào được từ **một dòng chữ nhỏ** trong phần mô tả của trang `/mau-iconic`. Không có trên menu, không có nút trên từng thẻ mẫu iconic (yêu cầu gốc của Mục E3 có "Thêm nút So sánh trên mỗi thẻ ở trang /mau-iconic" — điểm này **chưa được làm**).

## 2.3. Menu 8 mục phẳng, không phân tầng

Menu hiện tại: Trang chủ, Thương hiệu, Mẫu iconic, Cơ chế, Giải phẫu, Lịch sử, Từ điển, Hướng dẫn. Tám mục ngang hàng nhau, trong khi về bản chất chúng khác tầm: ba trụ cột nội dung (Thương hiệu, Mẫu iconic, Cơ chế) khác với hai trang trải nghiệm độc bản (Giải phẫu, Lịch sử) và khác với hai mục tra cứu (Từ điển, Hướng dẫn). Trên màn hình hẹp, 8 mục cũng bắt đầu chật.

## 2.4. Breadcrumb có dữ liệu máy đọc nhưng người không thấy

`BaseLayout` đã sinh structured data BreadcrumbList cho Google, nhưng giao diện chỉ hiển thị nút "Quay lại danh sách". Người đọc vào thẳng một bài từ Google (nguồn truy cập chính sau này) sẽ không biết mình đang ở đâu trong site.

## 2.5. Chuỗi nội dung có sẵn nhưng chưa được xâu

Site đang có những chuỗi kiến thức tự nhiên mà chưa trang nào khai thác:

- Bài cơ chế `nền tảng` → `chức năng` → `cao cấp` là một **lộ trình học** (trữ cót → bộ thoát → chronograph → tourbillon), nhưng không có gì gợi ý đọc theo thứ tự.
- Mẫu iconic cùng thể loại (6 mẫu lặn, 4 chronograph...) không link sang nhau.
- Trang Giải phẫu có 12 bộ phận, mỗi bộ phận tương ứng một bài cơ chế hoặc thuật ngữ — chuỗi này đã nối một phần nhưng chưa có chiều ngược lại.

---

# PHẦN 3 — ĐỀ XUẤT, XẾP THEO HIỆU QUẢ TRÊN CÔNG SỨC

## Ưu tiên 1 — Khối "Đọc tiếp" cuối mọi bài viết

Tác động lớn nhất tới thời gian ở lại và số trang mỗi phiên. Quy tắc chọn bài tự động, không nhập tay:

| Loại bài | Gợi ý 1 | Gợi ý 2 | Gợi ý 3 |
|---|---|---|---|
| Mẫu iconic | Mẫu cùng `category` | Trang thương hiệu của mẫu | Mẫu cùng thập niên |
| Cơ chế | Bài cơ chế cùng `category` | Bài kế tiếp theo độ khó | Thuật ngữ tương ứng |
| Thuật ngữ | Bài cơ chế cùng chủ đề | Thuật ngữ cùng nhóm | — |
| Hướng dẫn | Hướng dẫn kế tiếp theo độ khó | Bài cơ chế được nhắc trong bài | — |
| Thương hiệu | Đã có Khối 4 và 5 | Thêm: hãng cùng phân hạng | — |

## Ưu tiên 2 — Mở lối vào trang `/so-sanh`

Ba việc nhỏ: nút "So sánh" trên từng thẻ ở `/mau-iconic` (trả nợ yêu cầu gốc E3); một dòng "Đặt cạnh mẫu khác →" ở cuối trang chi tiết mẫu iconic, dẫn sang `/so-sanh` với mẫu đó đã chọn sẵn qua URL; và đưa So sánh vào menu (xem Ưu tiên 3).

## Ưu tiên 3 — Tổ chức lại menu theo tầng

Đề xuất cấu trúc 5 mục thay cho 8:

```
Thương hiệu | Mẫu iconic | Kiến thức ▾           | Khám phá ▾        | [Tìm kiếm]
                          |  Cơ chế               |  Dòng lịch sử
                          |  Từ điển              |  Giải phẫu
                          |  Hướng dẫn            |  So sánh
```

- **Kiến thức** gom ba mục tra cứu và học.
- **Khám phá** gom ba trải nghiệm tương tác — đây cũng là lần đầu So sánh có mặt trên menu.
- Trang chủ về logo, đúng quy ước phổ biến.
- Trên điện thoại, menu xổ giữ nguyên hai nhóm này thành hai cụm có tiêu đề.

Đánh đổi cần biết: menu xổ (dropdown) thêm một cú bấm cho người dùng desktop. Nếu anh không thích, phương án B nhẹ hơn: giữ menu phẳng nhưng bỏ "Trang chủ" và thêm "So sánh", thành 8 mục cân bằng hơn.

## Ưu tiên 4 — Breadcrumb hiển thị

Dòng nhỏ đầu bài: `Trang chủ / Cơ chế / Tourbillon`. Dữ liệu đã có sẵn trong structured data, chỉ cần render ra. Kèm theo: chuyển nút "Quay lại danh sách" xuống **cuối bài** (hoặc để cả hai đầu cuối).

## Ưu tiên 5 — Lộ trình đọc cho bài cơ chế

Trang `/co-che` hiện xếp bài theo ngày đăng. Đề xuất xếp lại thành ba chặng theo `category` (nền tảng → chức năng → cao cấp), đánh số thứ tự đọc đề nghị, và cuối mỗi bài tự trỏ sang bài kế tiếp trong chặng. Biến 11 bài rời rạc thành một "giáo trình nhập môn đồng hồ cơ" — đúng thứ giữ người đọc quay lại.

## Ưu tiên 6 — Hai việc nhỏ kèm theo

1. **Khối 5 khi trống** (8 hãng chưa có mẫu iconic): thay dòng "Chưa có mẫu iconic nào" bằng gợi ý thay thế — "Xem các hãng cùng phân hạng" kèm 3 thẻ. Đỡ lộ khoảng trống, thêm lối đi.
2. **Nút lên đầu trang** cho các trang dài (trang thương hiệu giờ có tới 18 mốc lịch sử, khá dài trên điện thoại).

---

# PHẦN 4 — PROMPT GIAO GLM

Làm theo thứ tự, **mỗi prompt một phiên, push riêng**.

## Prompt D — Khối "Đọc tiếp" cuối bài

> Thêm khối "Đọc tiếp" vào cuối mọi bài viết thuộc bốn collection: mẫu iconic, cơ chế, từ điển, hướng dẫn. **Không đụng trang thương hiệu** — trang đó đã có Khối 4 và 5 đảm nhiệm việc này.
>
> Cách chọn bài gợi ý, hoàn toàn tự động từ frontmatter, không nhập tay:
>
> - **Mẫu iconic:** tối đa 3 gợi ý — mẫu cùng `category` (ưu tiên cùng thập niên), trang thương hiệu của mẫu đó, một mẫu cùng thể loại khác.
> - **Cơ chế:** bài cùng `category`, bài kế tiếp theo `difficulty` từ thấp lên cao, thuật ngữ tương ứng trong `/tu-dien` nếu có cùng slug.
> - **Thuật ngữ:** bài cơ chế cùng chủ đề (đối chiếu slug), thuật ngữ cùng `category`.
> - **Hướng dẫn:** hướng dẫn kế tiếp theo `difficulty`.
>
> Giao diện: tiêu đề "Đọc tiếp", tối đa 3 thẻ nhỏ dùng lại component `Card` hoặc bản rút gọn của nó, đặt sau phần thân bài và trước footer. Hỗ trợ chế độ tối. Trên điện thoại xếp dọc.
>
> Đồng thời: chuyển nút "Quay lại danh sách" từ đầu bài xuống cuối bài, đặt dưới khối "Đọc tiếp". Đầu bài sẽ có breadcrumb thay thế ở prompt sau, tạm thời giữ nguyên đầu bài không có gì cũng được.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. Chạy `npm run build` xác nhận 0 lỗi, kiểm 3 bài mỗi loại.

## Prompt E — Lối vào trang So sánh

> Ba việc cho công cụ so sánh:
>
> 1. Trên mỗi thẻ ở trang `/mau-iconic`, thêm nút phụ "So sánh" — bấm vào thì mở `/so-sanh` với mẫu đó đã được chọn sẵn (truyền qua tham số URL, đúng cơ chế trạng thái URL mà trang `/so-sanh` đang dùng).
> 2. Cuối trang chi tiết mỗi mẫu iconic, thêm một dòng "Đặt cạnh mẫu khác →" dẫn sang `/so-sanh` với mẫu hiện tại đã chọn sẵn.
> 3. Kiểm rằng `/so-sanh` xử lý đúng khi URL chỉ có một mẫu được chọn: hiện mẫu đó ở cột đầu và mời chọn thêm, không báo lỗi.

## Prompt F — Menu phân tầng và breadcrumb

> **1. Tổ chức lại menu trong `src/components/Header.astro`:**
>
> - Bỏ mục "Trang chủ" (logo đã đảm nhiệm việc về trang chủ).
> - Giữ nguyên: Thương hiệu, Mẫu iconic.
> - Gom "Cơ chế, Từ điển, Hướng dẫn" vào mục xổ **"Kiến thức"**.
> - Gom "Dòng lịch sử, Giải phẫu, So sánh" vào mục xổ **"Khám phá"** — lưu ý So sánh hiện chưa có trên menu, đây là bổ sung mới.
> - Mục xổ mở khi rê chuột trên máy tính và khi chạm trên điện thoại; đóng khi bấm ra ngoài; dùng được bằng bàn phím (Tab và Enter). Trên menu điện thoại, hai nhóm hiển thị thành hai cụm có tiêu đề nhỏ, không cần xổ.
> - Nhãn mục lấy từ `src/i18n/ui.ts`, thêm khóa mới vào đó, không viết cứng trong component.
>
> **2. Breadcrumb hiển thị:**
>
> - Đầu mỗi bài viết và trang chi tiết thương hiệu, hiện dòng breadcrumb dạng "Trang chủ / Cơ chế / Tourbillon", chữ nhỏ, màu nhạt, link được ở từng cấp.
> - Dùng đúng dữ liệu breadcrumb đã có trong `BaseLayout` (structured data) làm nguồn, không tạo nguồn thứ hai.
> - Hỗ trợ chế độ tối. Trên điện thoại nếu tên bài dài thì cắt bằng dấu ba chấm, không xuống dòng.

## Prompt G — Lộ trình đọc cơ chế và hai việc nhỏ

> **1. Lộ trình đọc trên trang `/co-che`:**
>
> - Xếp lại danh sách thành ba chặng theo `category`: nền tảng trước, rồi chức năng, rồi cao cấp (nhóm bổ trợ đặt cuối). Trong mỗi chặng xếp theo `difficulty` tăng dần.
> - Mỗi chặng có tiêu đề và một dòng mô tả ngắn. Đánh số thứ tự đọc đề nghị trên từng thẻ (1, 2, 3...).
> - Cuối mỗi bài cơ chế, khối "Đọc tiếp" (đã làm ở Prompt D) ưu tiên hiển thị bài kế tiếp trong lộ trình.
>
> **2. Khối 5 khi trống trên trang thương hiệu:** với hãng chưa có mẫu iconic, thay dòng thông báo trống bằng khối "Các hãng cùng phân hạng" — tự lấy tối đa 3 hãng cùng `tier`, dùng thẻ rút gọn.
>
> **3. Nút lên đầu trang:** hiện ở góc dưới phải khi cuộn quá hai màn hình, trên các trang chi tiết. Kín đáo, hợp cả hai chế độ màu.

---

# PHẦN 5 — NHẮC LẠI VIỆC NGOÀI PHẠM VI GLM

**Ảnh vẫn là số 0.** Toàn bộ cải thiện giao diện hai đợt nay đều là "trang trí quanh chỗ trống". Thứ tự chuẩn bị ảnh đề nghị giữ nguyên: 28 ảnh timeline → 16 mẫu iconic → 24 logo → 24 hero. Chỉ cần đợt đầu (28 ảnh timeline) là trang `/lich-su` — trang độc bản nhất của site — sống dậy ngay.
