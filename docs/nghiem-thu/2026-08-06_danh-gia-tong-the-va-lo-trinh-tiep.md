# ĐỢT 6 — ĐÁNH GIÁ TỔNG THỂ VÀ LỘ TRÌNH TIẾP THEO

> **NGÀY NGHIỆM THU: 06/08/2026**
> **Đối tượng kiểm:** Commit `d7ad690`, bản dựng 83 trang lúc 18:06
> **Kết luận:** **Dự án đã qua giai đoạn xây dựng.** Toàn bộ nội dung, tính năng và minh họa đều xong. Việc còn lại không còn là "làm cho đủ" mà là **"làm cho hay"** — và đó là loại việc khác hẳn.

---

# PHẦN 1 — HIỆN TRẠNG: ĐÃ XONG NHỮNG GÌ

## 1.1. Nội dung — trọn vẹn

| Hạng mục | Số lượng |
|---|---|
| Thương hiệu đủ 5 khối | **26 trên 26** |
| Mẫu iconic | 16 bài |
| Bài cơ chế | 11 bài, có lộ trình đọc ba chặng |
| Thuật ngữ từ điển | 14 mục, có tự động liên kết chéo |
| Hướng dẫn thực hành | 4 bài |
| Mốc lịch sử | 28 mốc, **có đủ 28 minh họa** |

## 1.2. Tính năng — đủ cả

Tìm kiếm Pagefind, dark mode, trang so sánh, bộ lọc hai trang danh sách, từ điển tự động liên kết, sitemap, structured data, thẻ Open Graph và canonical trên 83 trên 83 trang, analytics, newsletter, breadcrumb hiển thị, khối "Đọc tiếp", menu phân tầng, nút lên đầu trang, trang Giải phẫu.

## 1.3. Kiểm chứng nền — sạch

- **Link nội bộ hỏng: 0** trên toàn bộ 83 trang.
- **Ký tự ngoài tiếng Việt và tiếng Anh: 0** trong toàn bộ mã nguồn.
- `lich-su.astro` đã có logic **ưu tiên ảnh thật, lùi về minh họa SVG** — anh bỏ ảnh chụp vào là tự thay, không phải sửa mã.

Đây là lần thứ ba liên tiếp cả hai chỉ số này đều sạch.

---

# PHẦN 2 — ĐÁNH GIÁ BỘ 28 MINH HỌA

Tôi render cả 28 hình ra bảng 7 cột 4 hàng và xem tổng thể.

## 2.1. Đạt mục tiêu chính

**28 hình đọc ra là một bộ.** Cùng nền navy, cùng bảng ba màu, cùng độ dày nét, cùng lối khắc. Đặt cạnh nhau không có hình nào lạc lõng về phong cách. Đây là điều khó nhất của cả việc này và GLM làm được.

Nhóm mạnh nhất là **hàng 1 và hàng 2** — mười bốn hình đầu có độ đa dạng rất tốt: xưởng thợ, bản hợp đồng, vỏ trứng, lồng tourbillon, vỏ ô-van, đồng hồ trang sức, mặt cắt vỏ, rotor, động tác lật Reverso. Mỗi hình một dạng chủ thể, không lẫn nhau.

## 2.2. Vấn đề còn lại: hàng 3 và hàng 4 bị lặp hình tròn

Đây là điểm cần nói thẳng. Từ mốc 1953 trở đi, **có khoảng tám tới mười hình cùng là một mặt số tròn đặt giữa khung**: Fifty Fathoms, GMT-Master, Speedmaster, Carrera, Seiko Astron, Co-Axial, Freak, Silicon.

Ở đợt 4 tôi đã yêu cầu mỗi hình một cỡ nhìn khác nhau, và GLM làm được **một phần**: Datejust đúng là cận cảnh chi tiết (rất tốt), Submariner đúng là hai vật thể. Nhưng Fifty Fathoms không đọc ra là cảnh dưới nước, GMT không đọc ra là đồ họa phẳng tập trung vào vành — cả hai vẫn ra mặt số tròn quy ước.

**Mức độ nghiêm trọng: vừa phải.** Trên trang thật, 28 hình nằm rải dọc một timeline dài, người đọc không nhìn thấy chúng cạnh nhau như trong bảng kiểm. Nhưng nửa sau của trang Lịch sử sẽ có cảm giác đều đều.

**Đề xuất:** chưa cần sửa ngay. Nếu sau này có ảnh chụp thật cho nhóm mốc hiện đại, vấn đề tự biến mất — mà nhóm mốc hiện đại lại chính là nhóm dễ tìm ảnh nhất.

---

# PHẦN 3 — VIỆC CẦN LÀM TIẾP, XẾP THEO THỨ TỰ ĐỀ NGHỊ

## Ưu tiên 1 — Kiểm thử thực tế trên máy người dùng

**Đây là việc quan trọng nhất hiện nay, và là việc chưa từng làm.**

Suốt quá trình, mọi nghiệm thu đều dựa trên đọc mã nguồn và render tĩnh. **Chưa ai thực sự mở trang trên điện thoại và dùng thử như một người đọc bình thường.** Site nay đã có nhiều thành phần tương tác — 6 hoạt ảnh cơ chế, trang Giải phẫu, bộ lọc, tìm kiếm, dark mode, menu xổ, trang so sánh — và đó đều là những chỗ dễ hỏng thầm lặng mà kiểm mã không thấy.

Đề nghị anh tự làm, khoảng 30 phút, trên **điện thoại thật** trong cửa sổ ẩn danh:

1. Mở trang chủ, cuộn hết. Dải mốc lịch sử có vuốt ngang mượt không?
2. Bật dark mode, đi qua **cả 8 mục menu**. Có chỗ nào chữ chìm vào nền không?
3. Mở 3 bài cơ chế có hoạt ảnh. Nút play, thanh trượt tốc độ, nút từng bước — bấm thử hết.
4. Mở trang Giải phẫu, chạm vào vài bộ phận.
5. Dùng ô tìm kiếm: gõ **không dấu** "tru cot", "dong ho lan". Có ra kết quả không?
6. Mở trang So sánh, chọn 3 mẫu, xoay ngang máy xem bảng có tràn không.
7. Bấm thử form đăng ký nhận bài ở chân trang.

Ghi lại chỗ nào vướng rồi gửi tôi, tôi soạn prompt sửa.

## Ưu tiên 2 — Ảnh thật cho nhóm mốc hiện đại

28 minh họa đã lấp chỗ trống, nhưng **ảnh thật vẫn hơn** — nhất là cho các mẫu đồng hồ hiện đại mà người đọc muốn nhìn thấy tận mắt.

Logic ưu tiên ảnh đã sẵn sàng, chỉ cần bỏ file `.jpg` vào `public/images/timeline/` là tự thay. **Ưu tiên đúng nhóm hàng 3 và hàng 4** — vừa là nhóm hình đang bị lặp, vừa là nhóm dễ tìm ảnh nhất: Submariner, Speedmaster, Carrera, Royal Oak, Nautilus, Freak.

Sau timeline thì tới **16 ảnh mẫu iconic** — dùng lại được ở ba nơi: trang danh sách, trang chi tiết, và Khối 5 của các trang thương hiệu.

## Ưu tiên 3 — Dứt điểm `CAN-KIEM-CHUNG.md`

File này còn **21 mục treo**, phần lớn là mã calibre không đối chiếu được với nguồn chính hãng. Chúng đang hiển thị trên các trang thương hiệu mà chưa ai xác nhận.

Hai cách:

- **Cách kỹ:** tôi soạn một đợt tra cứu riêng chỉ về calibre, đối chiếu từng mã với trang chính hãng.
- **Cách gọn:** bỏ hẳn trường `signature_calibres` khỏi hiển thị, giữ lại trong dữ liệu. Người đọc phổ thông ít quan tâm mã calibre, mà sai một mã là mất uy tín với đúng nhóm độc giả am hiểu mà site nhắm tới.

Tôi nghiêng về **cách gọn** — rủi ro trên lợi ích không đáng.

## Ưu tiên 4 — Mười thương hiệu chưa có mẫu iconic

Khối 5 của mười trang này hiện dùng khối thay thế "các hãng cùng phân hạng". Giải pháp tạm ổn, nhưng viết thêm mẫu iconic sẽ tốt hơn nhiều.

Nếu làm, tôi đề nghị ưu tiên sáu mẫu có sức hút cao và dữ liệu dễ kiểm chứng: Breguet Type XX, Longines Lindbergh Hour Angle, Hamilton Ventura, Tissot PRX, Glashütte Original SeaQ, Seiko Bambino — à không, mẫu cuối là của Orient.

## Ưu tiên 5 — Đo lường thật

Analytics đã gắn nhưng chưa ai đọc số. Sau khi site chạy được vài tuần, xem:

- Trang nào được đọc nhiều nhất, trang nào không ai vào.
- Người đọc rời trang ở đâu.
- Có ai dùng ô tìm kiếm không, gõ từ gì.

Đây là thứ **duy nhất** có thể nói cho anh biết nên viết tiếp về cái gì. Mọi phán đoán trước đó, kể cả của tôi, đều chỉ là suy luận.

---

# PHẦN 4 — MỘT NHẬN XÉT THẲNG

Site này hiện đã **hoàn chỉnh hơn phần lớn trang nội dung chuyên ngành tiếng Việt**: nội dung có chiều sâu, dữ kiện được kiểm chứng và có ghi nguồn, giọng văn nhất quán, kỹ thuật sạch, giao diện có bản sắc riêng.

Nhưng có một điều cần nói: **suốt quá trình này, chưa có người đọc thật nào.**

Tất cả những gì ta làm đều dựa trên giả định về việc người đọc muốn gì. Giả định có thể đúng, có thể sai, và không có cách nào biết ngoài việc đưa trang tới tay người đọc rồi nghe họ nói.

Vì vậy tôi cho rằng **việc đáng làm nhất bây giờ không phải là thêm tính năng hay thêm bài, mà là đưa trang ra ngoài**: chia sẻ vào vài nhóm chơi đồng hồ, nhờ dăm người đọc thử và nói thẳng. Ba nhận xét từ người đọc thật sẽ định hướng tốt hơn ba tháng ta ngồi đoán.

Sau đó quay lại, ta sẽ biết chính xác nên làm gì tiếp.
