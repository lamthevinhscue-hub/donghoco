# ĐỢT 5 — NGHIỆM THU 5 MINH HỌA SVG TIMELINE (đợt 1)

> **NGÀY NGHIỆM THU: 06/08/2026**
> **Đối tượng kiểm:** Commit `7192d24` — "28 minh họa SVG đợt 1 (5 hình mẫu) cho trang /lich-su"
> **Phương pháp:** Kiểm tự động toàn bộ ràng buộc kỹ thuật, cộng render ra ảnh và xem tận mắt ở cả cỡ 800px lẫn 320px
> **Kết luận:** **Kỹ thuật đạt tuyệt đối. Thẩm mỹ và nội dung thì 2 trên 5 hình đạt, 3 hình phải sửa.** Ngoài ra có **hai lỗi hệ thống** ảnh hưởng cả 5 hình — phải chỉnh trước khi vẽ 23 hình còn lại.

---

# PHẦN 1 — KIỂM KỸ THUẬT: ĐẠT 100%

| Ràng buộc | Kết quả |
|---|---|
| Đủ 5 file đúng slug, không thừa không thiếu | Đạt |
| Dung lượng dưới 15KB | Đạt — file lớn nhất 5.4KB |
| `viewBox="0 0 800 600"` | Đạt cả 5 |
| Có `<title>` tiếng Việt | Đạt cả 5 |
| Có `role="img"` | Đạt cả 5 |
| Không dùng thẻ `<text>` | Đạt — 0 thẻ trên cả 5 file |
| Chỉ ba màu quy định | Đạt — không có màu thứ tư |
| Định danh hoa văn khác nhau giữa các file | Đạt |
| Phân cấp ba mức độ dày nét | Đạt — dùng đúng 3px, 1.75px, 0.75px |
| Chưa sửa `lich-su.astro` | Đạt — đúng yêu cầu để dành đợt cuối |

Phần này không có gì để phàn nàn. GLM đọc kỹ đặc tả và tuân thủ chính xác.

---

# PHẦN 2 — HAI LỖI HỆ THỐNG, ẢNH HƯỞNG CẢ 28 HÌNH

## 2.1. Gạch tạo khối quá mảnh nên không đọc được — cả bộ trông như bản vẽ CAD

Đặc tả yêu cầu *"tạo khối bằng gạch song song theo lối khắc gỗ"*. Kiểm mã nguồn thì **gạch có thật** — mỗi file có từ 7 tới 33 nét ở độ dày 0.75px. Nhưng khi render ra thì **gần như không thấy gì**.

Hệ quả: cả 5 hình đều là **nét viền thuần túy**, không có vùng sáng tối. Nhìn vào giống bản vẽ kỹ thuật trên máy tính hơn là bản khắc trong sách chuyên khảo — tức là chưa đạt đúng cái phong cách mà cả bộ nhắm tới.

**Nguyên nhân:** nét 0.75px trên khung 800px là quá mảnh, và số lượng nét quá thưa để tạo thành mảng.

**Cách sửa:** nâng nét gạch lên **1px**, đặt **cách nhau 4 tới 6px**, và gom thành **mảng đủ rộng** (ít nhất 40×40px mỗi vùng) thì mắt mới đọc ra là vùng tối. Mỗi hình cần ít nhất **hai vùng gạch** — một vùng tối đậm, một vùng chuyển tiếp thưa hơn.

## 2.2. Hoa văn guilloché nền không hiện

Lớp hoa văn dùng chung — thứ đáng ra buộc 28 hình thành một bộ và nối với ô giữ chỗ mặt số — **hoàn toàn không nhìn thấy** trong bản render.

Đây một phần là lỗi đặc tả của tôi: tôi ghi opacity 0.06, quá thấp so với nền navy đậm.

**Cách sửa:** nâng độ mờ lớp hoa văn lên khoảng **0.10 đến 0.12**, và **tăng bước lặp của hoa văn từ 24px lên 40px** để các vòng tròn thưa ra, dễ nhận ra là hoa văn có chủ ý thay vì nhiễu hạt.

---

# PHẦN 3 — ĐÁNH GIÁ TỪNG HÌNH

## Đạt — giữ nguyên

### `ap-royal-oak` — hình tốt nhất của đợt

Đủ cả tám cạnh bát giác, tám con ốc đặt đúng góc, hoa văn ô vuông trên mặt số, dây thu nhỏ dần khi ra xa vỏ. **Thu xuống 320px vẫn đọc ra ngay.** Đây là hình nên lấy làm chuẩn cho 23 hình còn lại.

### `huygens-hairspring` — đạt

Xoắn ốc đều, khoảng cách giữa các vòng nhất quán, vành bánh lắc có nan chữ thập, có các cung nét mờ gợi dao động. Chỉ một góp ý nhỏ: các cung dao động hai bên hơi mờ, nên đậm thêm chút để ý đồ rõ hơn.

## Phải sửa

### `rolex-oyster` — **yếu nhất, phải vẽ lại**

Đây là hình duy nhất tôi cho là **không dùng được**. Render ra chỉ là **một hình chữ nhật rỗng** với hai thanh ngang trên dưới, một hộp nhỏ bên phải và ba mũi tên. Không có dáng vỏ đồng hồ, không nhận ra đây là mặt cắt của cái gì. **Thu xuống 320px thì đúng nghĩa chỉ còn một cái khung rỗng.**

Vấn đề gốc: hình vẽ đúng *ý tưởng* mặt cắt nhưng thiếu *hình dáng nhận biết được*. Người xem cần thấy ngay "đây là một chiếc đồng hồ bị cắt đôi".

Cần khi vẽ lại:

- Vỏ phải có **dáng đồng hồ thật**: mặt cắt tròn với vấu dây nhô ra hai bên, không phải hình chữ nhật.
- **Ren vặn phải nhìn thấy rõ** ở ba chỗ — vẽ thành răng cưa tam giác lớn, không phải vạch mảnh.
- **Vòng đệm kín vẽ thành khối đặc màu cream**, là chi tiết sáng nhất trong hình để mắt bắt vào ngay.
- Bên trong vỏ vẽ **vài bánh răng cách điệu** để thấy đây là khoang chứa bộ máy, không phải hộp rỗng.
- Nước ở nền: đậm hơn, và thêm **vài bọt khí bị chặn lại ở mép vỏ** để nói lên chuyện chống nước.

### `peter-henlein` — sửa bố cục

Ý tưởng đúng nhưng lắp ráp chưa khớp: **vỏ hình trứng và mặt số chồng lên nhau lệch lạc**, nắp trên trôi tách rời phía trên nên đọc thành **vành mũ** chứ không phải nắp có bản lề. Hai cung dây đeo lơ lửng phía trên, không nối vào đâu.

Cần sửa:

- **Nắp phải gắn vào vỏ bằng bản lề nhìn thấy được**, mở chếch khoảng 40 độ, không trôi tự do.
- Vỏ trứng và mặt số phải **lồng vào nhau đúng phối cảnh**, không chồng đè.
- **Dây đeo cổ phải nối thật vào quai vỏ**, không phải hai cung bay lơ lửng.
- Thêm gạch tạo khối ở nửa phải của vỏ để có chiều sâu.

### `breguet-tourbillon` — sai đặc trưng hình dáng

Lồng tourbillon đang vẽ thành **hình thoi vuông góc**, trong khi đặc trưng của tourbillon Breguet là **lồng ba nan cong**. Người am hiểu nhìn vào sẽ thấy sai ngay. Mũi tên chỉ chiều xoay thì **trôi tách hẳn ra bên phải**, trông như nét thừa.

Cần sửa:

- **Lồng ba nan cong** tỏa từ tâm, đây là chi tiết nhận diện bắt buộc.
- **Mũi tên xoay phải ôm quanh lồng**, không đặt rời bên ngoài.
- Thanh ngang phía trên hiện chưa rõ là gì — nếu là cầu máy thì phải nối vào lồng và có **hai đầu vát** theo đúng đặc tả.

---

# PHẦN 4 — PROMPT SỬA, DÁN CHO GLM

> Cảm ơn anh, phần kỹ thuật của đợt 1 đạt tuyệt đối — đúng slug, đúng khung, đúng ba màu, không thẻ `<text>`, dung lượng gọn. Giờ cần chỉnh phần thẩm mỹ và nội dung trước khi làm 23 hình còn lại.
>
> **A. Hai chỉnh sửa áp dụng cho cả 5 hình, và cho toàn bộ 23 hình sau này**
>
> 1. **Gạch tạo khối hiện quá mảnh nên render ra không thấy gì**, khiến cả bộ trông như bản vẽ CAD thay vì bản khắc. Nâng nét gạch từ 0.75px lên **1px**, đặt cách nhau **4 tới 6px**, và gom thành mảng rộng ít nhất **40×40px**. Mỗi hình phải có **ít nhất hai vùng gạch**: một vùng tối đậm và một vùng chuyển tiếp thưa hơn. Đây là thứ tạo ra chất "khắc nét" mà cả bộ nhắm tới.
> 2. **Hoa văn guilloché nền không nhìn thấy.** Nâng độ mờ từ 0.06 lên khoảng **0.10 đến 0.12**, và tăng bước lặp của `<pattern>` từ 24px lên **40px** để các vòng tròn thưa ra, trông như hoa văn có chủ ý chứ không phải nhiễu.
>
> **B. Vẽ lại `rolex-oyster` — hình này hiện chưa dùng được**
>
> Render ra chỉ là một hình chữ nhật rỗng, không nhận ra là đồng hồ. Vẽ lại theo hướng:
>
> - Vỏ có **dáng đồng hồ thật**: mặt cắt tròn, có vấu dây nhô ra hai bên. Không dùng hình chữ nhật.
> - **Ren vặn vẽ thành răng cưa tam giác lớn, nhìn rõ**, ở đủ ba chỗ: núm vặn, nắp lưng, vành.
> - **Vòng đệm kín vẽ thành khối đặc màu cream** — đây là chi tiết sáng nhất hình, để mắt bắt vào ngay.
> - Trong khoang vỏ vẽ **vài bánh răng cách điệu** cho thấy đó là chỗ chứa bộ máy.
> - Nước ở nền đậm hơn, thêm **vài bọt khí bị chặn ở mép vỏ**.
>
> **C. Sửa `peter-henlein`**
>
> - **Nắp gắn vào vỏ bằng bản lề nhìn thấy được**, mở chếch khoảng 40 độ. Hiện nắp đang trôi tách rời nên đọc thành vành mũ.
> - Vỏ trứng và mặt số phải **lồng vào nhau đúng phối cảnh**, hiện đang chồng đè lệch lạc.
> - **Dây đeo cổ nối thật vào quai vỏ**, hiện là hai cung bay lơ lửng.
> - Thêm vùng gạch tạo khối ở nửa phải của vỏ.
>
> **D. Sửa `breguet-tourbillon`**
>
> - Lồng tourbillon hiện vẽ thành hình thoi vuông góc. Phải là **lồng ba nan cong** tỏa từ tâm — đây là đặc trưng nhận diện bắt buộc, vẽ sai là người am hiểu thấy ngay.
> - **Mũi tên chỉ chiều xoay phải ôm quanh lồng**, hiện đang trôi tách bên phải trông như nét thừa.
> - Thanh ngang phía trên: nếu là cầu máy thì phải **nối vào lồng và có hai đầu vát**; nếu không phục vụ gì thì bỏ.
>
> **E. `huygens-hairspring` và `ap-royal-oak` giữ nguyên bố cục**, chỉ áp dụng hai chỉnh sửa ở mục A. Riêng `huygens-hairspring` đậm thêm chút cho các cung dao động hai bên.
>
> **Lấy `ap-royal-oak` làm chuẩn tham chiếu** cho toàn bộ 23 hình còn lại — đây là hình đạt nhất đợt này về độ rõ ràng và khả năng đọc ở cỡ nhỏ.
>
> **Tự kiểm bắt buộc trước khi push:** render mỗi hình ra ảnh ở chiều ngang **320px** và nhìn. Nếu không đọc ra chủ thể là gì thì chưa xong. Đây là cỡ thật trên điện thoại.
>
> Xong việc: chạy `npm run build`, push và báo mã commit. **Vẫn dừng ở 5 hình, chưa làm tiếp 23 hình còn lại** cho tới khi tôi duyệt vòng sửa này.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

---

# PHẦN 5 — CẬP NHẬT ĐẶC TẢ GỐC

Hai thông số trong `docs/prompt-glm-28-minh-hoa-svg-timeline.md` cần sửa để 23 hình sau không lặp lại lỗi:

| Mục | Cũ | Mới |
|---|---|---|
| 1.3 — nét mảnh | 0.75px | **1px cho gạch tạo khối**; giữ 0.75px cho hoa văn nền |
| 1.4 — hoa văn nền | bước lặp 24px, opacity 0.06 | **bước lặp 40px, opacity 0.10 đến 0.12** |
| 1.3 — bổ sung | (chưa có) | **Mỗi hình bắt buộc có ít nhất hai vùng gạch tạo khối, mỗi vùng rộng tối thiểu 40×40px** |
