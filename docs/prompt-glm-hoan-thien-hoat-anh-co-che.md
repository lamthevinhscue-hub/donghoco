# PROMPT GIAO GLM — HOÀN THIỆN HOẠT ẢNH CHO TRANG CƠ CHẾ

**Ngày soạn:** 08/08/2026
**Người soạn:** Claude (Cowork)
**Mục tiêu:** Đưa cả 18 bài cơ chế lên cùng một chuẩn — bài nào cũng có hoạt ảnh tương tác thật.

---

## HIỆN TRẠNG SAU KHI KIỂM

Tôi rà cả 18 bài và đối chiếu với mã component. Kết quả chia **ba nhóm**, khác với vẻ ngoài của bảng frontmatter:

| Nhóm | Số bài | Tình trạng thật |
|---|---|---|
| **A** | 3 | **Đã có hoạt ảnh tương tác đầy đủ**, chỉ thiếu nhãn `interactive: true` trong frontmatter |
| **B** | 5 | Có hình minh họa nhưng **chỉ hiện dần khi cuộn**, không tương tác |
| **C** | 4 | **Chưa có hình minh họa nào** |

**Sáu bài đã đạt chuẩn từ trước, không đụng tới:** `bo-thoat`, `chronograph`, `day-toc-banh-lac`, `gmt`, `perpetual-calendar`, `tourbillon`.

**Điểm cần biết trước khi bắt tay:** ba bài nhóm A (`bo-thoat-dong-truc`, `chong-soc`, `pha-trang`) **thực chất đã chạy tốt** — chúng dùng `MechanismAnimation` và có đăng ký hàm chuyển động qua `window.__mechStep`. Chỉ là frontmatter chưa đánh dấu, nên trang không hiện nhãn cho biết bài có tương tác. Đây là sửa một dòng, không phải làm lại.

---

# PROMPT DÁN CHO GLM 5.2 — PHIÊN 1

> Hoàn thiện hoạt ảnh cho trang cơ chế. Đợt này làm **nhóm A và hai bài đầu của nhóm B**.
>
> ## A. Sửa nhãn cho ba bài đã có hoạt ảnh
>
> Ba bài sau **đã có hoạt ảnh tương tác chạy tốt** nhưng frontmatter thiếu nhãn. Thêm `interactive: true` vào frontmatter của:
>
> - `src/content/coChe/vi/bo-thoat-dong-truc.md`
> - `src/content/coChe/vi/chong-soc.md`
> - `src/content/coChe/vi/pha-trang.md`
>
> Sau đó mở ba trang kiểm: nhãn cho biết bài có hoạt ảnh tương tác phải hiện đúng, và hoạt ảnh phải chạy được.
>
> ## B. Nâng hai hình tĩnh lên tương tác
>
> Hai component sau hiện chỉ hiện dần khi cuộn. Nâng lên dùng `MechanismAnimation`, theo **đúng cách sáu component đã đạt chuẩn đang làm**: bọc trong `MechanismAnimation`, truyền `data-mech-step-id`, đăng ký hàm chuyển động qua `window.__mechStep`. Đọc `Escapement.astro` hoặc `Tourbillon.astro` làm mẫu trước khi viết.
>
> ### B1. `GearTrain.astro` — chuỗi truyền động
>
> **Chuyển động cần mô phỏng:** năm bánh răng quay đồng thời với **tỷ lệ tốc độ đúng theo thực tế** — thùng cót quay chậm nhất, bánh thoát quay nhanh nhất. Đây là điểm cốt lõi của bài: người đọc phải **thấy được** năng lượng đi từ chậm sang nhanh.
>
> - Mỗi bánh răng quay với tốc độ khác nhau, tỷ lệ tăng dần theo chiều truyền lực.
> - Các bánh răng kề nhau **quay ngược chiều nhau** — chi tiết nhỏ nhưng sai là người am hiểu thấy ngay.
> - Khi chạm hoặc rê vào một bánh răng, bánh đó sáng lên kèm tên tiếng Việt và tiếng Anh.
>
> ### B2. `PowerReserve.astro` — trữ cót
>
> **Chuyển động cần mô phỏng:** thời gian trôi nhanh, dây cót nhả dần, thanh chỉ trữ cót tụt xuống.
>
> - Dây cót vẽ dạng xoắn ốc, **các vòng giãn dần ra** khi nhả năng lượng.
> - Thanh chỉ trữ cót tụt theo.
> - **Chi tiết đáng giá nhất:** khi trữ cót xuống dưới khoảng một phần tư, **biên độ dao động của bánh lắc giảm rõ** — đây chính là lý do đồng hồ chạy sai khi gần hết cót, và là kiến thức thực dụng mà rất ít trang giải thích bằng hình.
>
> ## Ràng buộc kỹ thuật
>
> - Giữ nguyên phần hình vẽ đã có nếu còn dùng được, **chỉ thêm phần chuyển động**. Không vẽ lại từ đầu nếu không cần.
> - Hoạt ảnh phải **dùng được bằng ngón tay trên điện thoại**, không chỉ bằng chuột.
> - Hỗ trợ **chế độ tối**.
> - **Không dùng thư viện ngoài.** Dùng đúng cơ chế `MechanismAnimation` đã có.
> - Sau khi sửa, cập nhật `interactive: true` cho hai bài `chuyen-dong-co` và `tru-cot`.
>
> **Tự kiểm bắt buộc:** mở từng trang, bấm nút chạy, kéo thanh tốc độ, bấm nút từng bước. Cả ba phải hoạt động. Kiểm trên điện thoại.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. **Quét ký tự lạ trước khi push** — lỗi này đã tái diễn bốn lần. Chạy `npm run build`, push và báo mã commit.

---

# PROMPT DÁN CHO GLM 5.2 — PHIÊN 2

> Tiếp tục nâng hình tĩnh lên tương tác. Đợt này làm **ba component còn lại của nhóm B**.
>
> Cách làm giống Phiên 1: bọc trong `MechanismAnimation`, truyền `data-mech-step-id`, đăng ký hàm chuyển động qua `window.__mechStep`. Giữ phần hình vẽ đã có nếu còn dùng được.
>
> ### 1. `AutomaticWinding.astro` — lên dây tự động
>
> **Chuyển động cần mô phỏng:** rotor xoay theo cử động cổ tay, nhưng **chỉ truyền lực theo một chiều**.
>
> - Rotor xoay **qua lại cả hai chiều** như khi đeo trên tay.
> - **Điểm cốt lõi:** ly hợp một chiều — khi rotor xoay chiều này thì bánh răng truyền lực, xoay chiều kia thì trượt tự do. Phải **thấy được sự khác nhau đó**, ví dụ bánh răng sáng lên khi đang truyền và mờ đi khi trượt.
> - Thanh trữ cót dâng lên dần theo số vòng rotor đã quay.
> - Thêm một nút cho người đọc **mô phỏng cử động cổ tay** — bấm một cái thì rotor quay một nhịp.
>
> ### 2. `WaterResistance.astro` — chống nước
>
> **Chuyển động cần mô phỏng:** áp suất tăng theo độ sâu, vòng đệm bị ép.
>
> - **Thanh trượt độ sâu** do người đọc kéo, từ mặt nước xuống sâu dần.
> - Vòng đệm **bị ép dẹt dần** khi áp suất tăng — đây là cách chống nước hoạt động: áp suất càng lớn thì gioăng càng ép chặt.
> - **Chi tiết quan trọng nhất phải thể hiện:** khi bấm nút hoặc kéo núm vặn ra **trong lúc đang ở dưới nước**, nước tràn vào ngay. Đây là hiểu lầm gây hỏng đồng hồ nhiều nhất, và là lý do bài này tồn tại.
> - Kèm mốc tham chiếu theo độ sâu, dẫn link sang bài hướng dẫn mức chống nước.
>
> ### 3. `AntiMagnetic.astro` — chống từ
>
> **Chuyển động cần mô phỏng:** so sánh trực tiếp hai loại dây tóc dưới cùng một từ trường.
>
> - Bố cục **hai bên cạnh nhau**: bên trái dây tóc thép thường, bên phải dây tóc silicon.
> - **Thanh trượt cường độ từ trường** do người đọc kéo.
> - Khi từ trường tăng: dây tóc thép **bị hút dính các vòng vào nhau**, chu kỳ dao động ngắn lại, **đồng hồ chạy nhanh lên** — hiện số giây sai lệch tăng dần. Dây tóc silicon **không đổi**.
> - Đây là cách trực quan nhất để giải thích vì sao đồng hồ nhiễm từ lại chạy nhanh chứ không chạy chậm.
>
> ## Ràng buộc kỹ thuật
>
> Như Phiên 1: dùng được bằng ngón tay trên điện thoại, hỗ trợ chế độ tối, không thư viện ngoài, cập nhật `interactive: true` cho ba bài tương ứng.
>
> **Tự kiểm bắt buộc:** ba hoạt ảnh này đều có **thanh trượt do người đọc kéo**, khác với nhóm chỉ bấm chạy. Kiểm kỹ trên điện thoại rằng kéo bằng ngón tay mượt, không bị trang cuộn theo.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. **Quét ký tự lạ trước khi push.** Chạy `npm run build`, push và báo mã commit.

---

# PROMPT DÁN CHO GLM 5.2 — PHIÊN 3

> Làm hoạt ảnh mới cho **ba bài nhóm C** hiện chưa có hình minh họa nào.
>
> Tạo component mới trong `src/components/infographics/`, đăng ký vào bảng `infographics` trong `src/pages/co-che/[slug].astro`, đặt `has_infographic: true` và `interactive: true` trong frontmatter bài tương ứng.
>
> ### 1. `hien-thi-ngay` — hiển thị ngày và cơ cấu lịch
>
> **Component mới:** `DateDisplay.astro`
>
> - Đĩa ngày **31 vị trí** quay dưới ô cửa sổ mặt số.
> - Bánh răng đẩy đĩa **một nấc mỗi 24 giờ**.
> - **Thanh trượt thời gian** cho người đọc tua qua một ngày, thấy đĩa nhảy sang số kế tiếp.
> - **Chi tiết quan trọng nhất:** thể hiện **khung giờ nguy hiểm**. Khi kim đi vào khoảng từ 20 giờ tối tới 4 giờ sáng, **vùng đó tô đỏ và hiện cảnh báo** — vì đây là lúc cơ cấu lịch đang ăn khớp, chỉnh ngày lúc này có thể làm hỏng bánh răng.
> - Thêm nút chuyển giữa hai kiểu: **nhảy tức thời** và **bò dần**, để thấy khác nhau.
> - Dẫn link sang bài hướng dẫn chỉnh lịch an toàn.
>
> ### 2. `da-quang` — dạ quang
>
> **Component mới:** `Lume.astro`
>
> - Mặt số có cọc số và kim phủ dạ quang.
> - **Nút "chiếu sáng"** để nạp năng lượng, rồi **nút "tắt đèn"** chuyển sang nền tối.
> - Sau khi tắt đèn, **độ sáng giảm dần theo thời gian thật** — đây là điểm cốt lõi: dạ quang hiện đại không tự phát sáng mà phải nạp trước.
> - **Ba lựa chọn vật liệu** cho người đọc so sánh: một loại tự phát sáng yếu nhưng bền, một loại nạp sáng và sáng mạnh lúc đầu rồi mờ dần, và loại cũ nay đã bỏ.
> - **Lưu ý về cách viết:** khi nhắc tới loại vật liệu phóng xạ đã bị loại bỏ, **kể ở mức tôn trọng**, nêu lý do bị bỏ là vấn đề an toàn, **không mô tả chi tiết bệnh tật**.
>
> ### 3. `kinh-dong-ho` — kính đồng hồ
>
> **Component mới:** `Crystal.astro`
>
> - **Ba tấm kính cạnh nhau:** acrylic, khoáng, sapphire.
> - **Nút "thử xước"** — kéo một vật cứng qua cả ba, thấy mức xước khác nhau: acrylic xước sâu, khoáng xước vừa, sapphire gần như không xước.
> - **Nút "thử va đập"** — thấy phản ứng ngược lại: acrylic móp mà không vỡ, sapphire nứt vỡ.
> - **Nút "đánh bóng"** — chỉ acrylic phục hồi được, hai loại kia không.
> - Đây là bài mà **sự đánh đổi mới là nội dung**: không loại nào tốt nhất ở mọi mặt. Hoạt ảnh phải nói được điều đó, và giải thích vì sao đồng hồ vintage và đồng hồ quân đội thường dùng acrylic.
>
> ## Ràng buộc kỹ thuật
>
> Như các phiên trước. Riêng ba bài này **vẽ mới hoàn toàn** nên chú ý giữ đúng ngôn ngữ thị giác của các infographic đã có: cùng bảng màu, cùng độ dày nét, cùng cách đặt nhãn.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. **Quét ký tự lạ trước khi push.** Chạy `npm run build`, push và báo mã commit.

---

# PROMPT DÁN CHO GLM 5.2 — PHIÊN 4, ĐỢT CUỐI

> Làm hoạt ảnh cho bài cuối cùng: **`diem-chuong`** — điểm chuông. Đây là bài khó nhất trong cả nhóm, nên để riêng một phiên.
>
> **Component mới:** `MinuteRepeaterAnim.astro`
>
> [Lưu ý tên: đã có sẵn một component tên `MinuteRepeater` dùng cho mục từ điển. **Đặt tên khác để không đụng nhau.**]
>
> ## Vì sao bài này khó
>
> Điểm chuông là cơ chế **phát ra âm thanh theo một trình tự**, mà hoạt ảnh thì không có tiếng. Nên thử thách là **diễn tả âm thanh bằng hình**.
>
> ## Chuyển động cần mô phỏng
>
> - **Hai thanh cộng hưởng cuộn quanh bộ máy**, mỗi thanh có một búa nhỏ.
> - Người đọc **nhập một giờ bất kỳ** rồi bấm nút gõ.
> - Cơ cấu gõ theo **đúng trình tự ba phần**: gõ số giờ bằng tiếng trầm, gõ số khắc bằng hai tiếng xen kẽ, gõ số phút lẻ bằng tiếng bổng.
> - Mỗi lần búa đập, **sóng âm lan ra dạng vòng tròn mờ dần**, và thanh cộng hưởng **rung nhẹ**.
> - **Có bảng đếm bên cạnh** hiện rõ đang gõ phần nào và đã gõ mấy tiếng — đây là cách bù cho việc không có âm thanh.
>
> ## Hai điểm nội dung cần thể hiện
>
> 1. **Tiếng trầm và tiếng bổng phải phân biệt được bằng hình** — dùng kích thước hoặc mật độ sóng âm khác nhau, không chỉ đổi màu.
> 2. **Vì sao mỗi chiếc kêu một khác:** âm thanh phụ thuộc vào vỏ, vào cách gắn thanh cộng hưởng, vào tay nghề chỉnh của từng thợ. Nên có một câu nhắc điều này ngay dưới hoạt ảnh.
>
> ## Ràng buộc kỹ thuật
>
> Như các phiên trước.
>
> **Không phát âm thanh thật.** Trang không nên tự phát tiếng khi người đọc chưa yêu cầu, và việc này cũng làm phức tạp phần hỗ trợ tiếp cận. Diễn tả bằng hình là đủ.
>
> ## Sau khi xong: kiểm tổng cả 18 bài
>
> Đây là bài cuối. Sau khi push, làm một vòng kiểm tổng và **báo lại cho tôi**:
>
> 1. Cả **18 trên 18 bài** đều có `has_infographic: true` và `interactive: true` chưa?
> 2. Bảng `infographics` trong `src/pages/co-che/[slug].astro` có **đủ 18 mục**, không thừa không thiếu?
> 3. Mở lần lượt 18 trang, bấm nút chạy trên từng bài — **có bài nào nút bấm mà không có gì chuyển động không?**
> 4. Kiểm trên **điện thoại thật**: thanh trượt kéo được bằng ngón tay, không bị trang cuộn theo.
> 5. Kiểm **chế độ tối** cả 18 bài — có hoạt ảnh nào nét vẽ chìm vào nền không?
>
> Báo lại theo đúng năm mục trên.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. **Quét ký tự lạ trước khi push.**

---

# BẢNG THEO DÕI

| Phiên | Bài | Loại việc |
|---|---|---|
| 1 | `bo-thoat-dong-truc`, `chong-soc`, `pha-trang` | Sửa nhãn frontmatter |
| 1 | `chuyen-dong-co`, `tru-cot` | Nâng tĩnh lên tương tác |
| 2 | `len-day-tu-dong`, `chong-nuoc`, `chong-tu` | Nâng tĩnh lên tương tác |
| 3 | `hien-thi-ngay`, `da-quang`, `kinh-dong-ho` | Làm mới hoàn toàn |
| 4 | `diem-chuong` | Làm mới hoàn toàn, khó nhất |

**Sau bốn phiên: cả 18 bài cơ chế đều có hoạt ảnh tương tác thật.**

Sáu bài không đụng tới vì đã đạt chuẩn từ trước: `bo-thoat`, `chronograph`, `day-toc-banh-lac`, `gmt`, `perpetual-calendar`, `tourbillon`.
