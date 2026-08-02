# BỘ PROMPT GIAO GLM 5.2 — PHẦN CÒN LẠI CỦA DỰ ÁN "ĐỒNG HỒ CƠ"

**Cập nhật:** 02/08/2026
**Trạng thái nền:** Repo `lamthevinhscue-hub/donghoco`, nhánh `main`, deploy Vercel dự án `donghoco1` — đường ống hoạt động bình thường.

## Cách dùng tài liệu này

Mỗi mục dưới đây là **một phiên làm việc độc lập** với GLM 5.2. Dán nguyên khối trong ô trích dẫn, không gộp nhiều mục vào một lần. Sau mỗi mục, kiểm theo phần "Nghiệm thu" rồi mới sang mục kế tiếp.

**Đoạn khóa bắt buộc** — dán vào cuối MỌI prompt gửi GLM từ nay:

> **Ràng buộc chung:** Tuân thủ `CONTENT-GUIDE.md`. Không dùng ký tự ngoài tiếng Việt và tiếng Anh. Không đưa tên bước, số giai đoạn hay ghi chú quy trình vào giao diện người dùng. Không tự bịa dữ kiện: mọi năm, tên calibre, thông số kỹ thuật nếu không chắc chắn thì **bỏ hẳn** và ghi vào `CAN-KIEM-CHUNG.md` để tôi kiểm, tuyệt đối không đoán. Chỉ sửa đúng phạm vi được giao, không đụng phần khác. Xong việc: chạy `npm run build` xác nhận thành công, liệt kê file đã sửa, push lên nhánh `main` và báo lại mã commit.

---

## ĐÃ HOÀN THÀNH — KHÔNG LÀM LẠI

Bước 0.2 (hệ thống ảnh + WatchImage) • 1.1 (timeline 28 mốc) • 1.2 (infographic Bộ thoát) • 1.3 (5 infographic cơ chế) • 1.4 (Giải phẫu 12 bộ phận) • 2.1 (template thương hiệu 5 khối) • 2.2 đợt 1–3 (nâng cấp một số thương hiệu) • Vòng sửa lỗi đợt 1 • Bộ lọc phân hạng trang `/thuong-hieu`.

---

# MỤC A — KIỂM KÊ HIỆN TRẠNG (làm đầu tiên, không sửa gì)

> Đây là nhiệm vụ **chỉ đọc và báo cáo**, không sửa bất kỳ file nào.
>
> Hãy quét toàn bộ repo và trả lời đầy đủ 7 câu hỏi sau, dạng danh sách rõ ràng:
> 1. File `CONTENT-GUIDE.md` và `IMAGE-MANIFEST.md` đã tồn tại ở gốc repo chưa? Nếu có, tóm tắt mỗi file trong 3 dòng.
> 2. Schema của 3 content collection (thuong-hieu, mau-iconic, co-che) hiện có những trường nào? Liệt kê từng trường.
> 3. Trong 24 trang thương hiệu, những trang nào **đã** có đủ 5 khối theo template (hồ sơ nhanh, dòng chảy lịch sử, các dòng đồng hồ, đối chiếu phân khúc, mẫu iconic liên quan)? Những trang nào **chưa**? Liệt kê tên đầy đủ hai nhóm.
> 4. Thư mục `/co-che` hiện có bao nhiêu bài? Bài nào **thực sự** có hoạt ảnh tương tác (dùng component MechanismAnimation hoặc tương đương), bài nào chỉ có chữ?
> 5. Trong `/public/images/`, đã có bao nhiêu file ảnh thật? Bao nhiêu vị trí đang hiển thị placeholder?
> 6. Liệt kê tất cả link nội bộ đang trỏ tới trang không tồn tại (404) trên toàn site.
> 7. Các tính năng sau đã có chưa: tìm kiếm toàn trang, dark mode, trang so sánh mẫu iconic, sitemap.xml, structured data, ảnh OG tự sinh, kết nối newsletter, analytics?
>
> Chỉ báo cáo, chưa làm gì thêm. Tôi sẽ giao việc dựa trên báo cáo này.

**Nghiệm thu:** Có báo cáo đủ 7 mục. Anh gửi báo cáo này cho tôi (Fable 5) trước khi chạy Mục B.

---

# MỤC B — SỬA LỖI ĐỢT 2

## B1. Trang Lịch sử `/lich-su`

> Chỉnh 4 điểm trên trang `/lich-su`:
> 1. Tiêu đề chính đang hiển thị chữ số kiểu old-style khiến "300" trông như "3oo". Thêm `font-variant-numeric: lining-nums;` cho font tiêu đề, và rà toàn site xem tiêu đề nào khác cũng bị lỗi tương tự.
> 2. Đổi tiêu đề trang thành **"500 năm chế tác đồng hồ cơ"**. Phụ đề đổi thành: *"Dòng chảy thời gian từ cỗ máy bỏ túi Nuremberg đến kỷ nguyên silicon — hành trình đồng hồ cơ đi từ trong túi áo lên cổ tay con người. 28 mốc định hình toàn bộ ngành, được kể như một nhà sưu tầm đang dẫn bạn đi dọc hành lang lịch sử."* Cập nhật cả thẻ `<title>` và meta description cho khớp.
> 3. Ba nút lọc lớp: khi bật thì nền đầy màu của lớp đó và chữ trắng; khi tắt thì nền trong, viền mờ, chữ xám. Thêm nút "Tất cả" ở đầu hàng. Áp dụng đúng kiểu nút lọc đang dùng ở trang `/thuong-hieu` để đồng bộ toàn site.
> 4. Bộ đếm bên phải cập nhật theo bộ lọc, hiển thị dạng "11 / 28 mốc"; khi bật tất cả thì hiển thị "28 mốc".

**Nghiệm thu:** Tiêu đề hiện đúng "500"; bấm lọc thấy rõ nút nào đang bật; bộ đếm thay đổi theo.

## B2. Trang Thư viện thương hiệu `/thuong-hieu`

> Chỉnh 4 điểm trên trang `/thuong-hieu`:
> 1. Đổi tên hạng "Haute Horlogerie" thành **"Haute Horlogerie độc lập"**; mô tả hạng đổi thành: *"Các nhà chế tác độc lập sản lượng cực thấp — phần lớn công đoạn làm thủ công, mỗi năm chỉ vài chục chiếc rời xưởng."*
> 2. Thẻ Philippe Dufour: nhãn năm đổi thành **"1978 — lập xưởng riêng"**.
> 3. Việt hóa và thống nhất tên các hạng còn lại trên cả nút lọc lẫn tiêu đề nhóm, giữ nguyên số đếm: "Ultra Luxury — Siêu sang" → **"Xa xỉ đỉnh cao"**; "High-End Luxury — Cao cấp" → **"Cao cấp"**; "Mid-Range Luxury — Tầm trung" → **"Tầm trung"**; "Entry-Level Luxury — Nhập môn" → **"Nhập môn"**.
> 4. Rà lại toàn bộ 24 thẻ thương hiệu: năm thành lập và phân hạng có khớp với nội dung bên trong trang chi tiết không? Liệt kê các trường hợp lệch, sửa theo trang chi tiết.

## B3. Trang A. Lange & Söhne — sửa lỗi số liệu

> Sửa trang `/thuong-hieu/a-lange-sohne`, đúng các điểm sau:
> 1. Bảng đối chiếu, cột Vacheron Constantin: "1755, trước Lange 110 năm" → **"1755, trước Lange 90 năm"**; "Nhà chế tác lâu đời nhất thế giới" → **"Nhà chế tác hoạt động liên tục lâu đời nhất thế giới"**.
> 2. Cột Patek Philippe: bỏ "Poinçon de Genève", thay bằng **"Patek Philippe Seal — chuẩn nội bộ riêng từ 2009, áp cho cả đồng hồ hoàn thiện chứ không chỉ bộ máy"**.
> 3. Mốc 1875 tách thành hai mốc riêng: **1868** — *"Richard Lange gia nhập, hãng đổi tên thành A. Lange & Söhne"*; **1875** — *"Ferdinand Adolph Lange qua đời, Emil và Richard tiếp quản, đưa hãng lên đỉnh cao đầu thế kỷ 20"*.
> 4. Kiểm chứng lại hai con số và sửa nếu sai: năm phát minh bản đĩa 3/4 (nguồn phổ biến ghi **1864**, trang đang ghi 1866); trữ cót Calibre 7121 của Audemars Piguet (nguồn ghi **55 giờ**, trang đang ghi 60h). Không chắc chắn thì bỏ con số và ghi vào `CAN-KIEM-CHUNG.md`.
> 5. Mốc 1845: "vùng Erzgebirge (đông Đức)" → **"vùng núi Erzgebirge thuộc Sachsen, miền đông nước Đức"** (năm 1845 chưa tồn tại khái niệm Đông Đức).
> 6. Việt hóa các cụm lẫn tiếng Anh: "đặc trưng German watchmaking" → "đặc trưng của chế tác Đức"; "nhiều bridge nhỏ" → "nhiều cầu máy nhỏ (bridge)"; "phủ 3/4 movement" → "phủ 3/4 bộ máy"; "57 functions siêu phức tạp" → "57 chức năng"; "secondary gấp 3-5 lần retail" → "giá thị trường thứ cấp cao hơn nhiều lần giá niêm yết".
> 7. Sửa "Gerald Genta" → **"Gérald Genta"**. Bỏ cụm "Maison des Complications", thay bằng "định vị bậc thầy đồng hồ phức tạp".

## B4. Rà soát đồng loạt toàn site (quan trọng nhất trong Mục B)

> Áp dụng các quy tắc sau cho **toàn bộ** trang trên site, không chỉ trang A. Lange:
> 1. **Danh xưng "lâu đời nhất":** chỉ Blancpain được gọi là *"thương hiệu đồng hồ lâu đời nhất (1735)"*; chỉ Vacheron Constantin được gọi là *"nhà chế tác hoạt động liên tục lâu đời nhất (1755)"*. Không hãng nào khác được dùng cụm "lâu đời nhất thế giới". Sửa mọi chỗ vi phạm.
> 2. **Lẫn tiếng Anh giữa câu tiếng Việt:** quét toàn bộ nội dung, Việt hóa mọi cụm lai kiểu "nhiều bridge nhỏ", "phủ movement", "57 functions", "secondary gấp X lần retail". Thuật ngữ chuyên ngành được giữ tiếng Anh **trong ngoặc đơn sau từ tiếng Việt**, không đứng một mình giữa câu.
> 3. **Số liệu giá thị trường thứ cấp:** thay mọi bội số cụ thể ("gấp 3-5 lần retail") bằng mô tả định tính (giữ giá rất tốt / tốt / trung bình), vì các con số này lỗi thời rất nhanh.
> 4. **Lỗi thời đại:** rà các mốc trước 1949 có nhắc "Đông Đức"/"Tây Đức", trước 1991 nhắc "Liên bang Nga", v.v. — sửa theo tên gọi đúng của thời điểm đó.
> 5. **Dấu tiếng Pháp/Đức trong tên riêng:** Gérald Genta, Söhne, Métiers d'Art, Vallée de Joux, Glashütte — kiểm tra và sửa thống nhất toàn site.
> 6. **Tính nhất quán chéo:** nếu trang A nói điều gì về hãng B, phải khớp với trang chi tiết của hãng B. Liệt kê mọi mâu thuẫn phát hiện được và sửa.
>
> Xuất kết quả rà soát ra file `RA-SOAT-DOT-2.md` ở gốc repo: mỗi dòng ghi file nào, câu nào, sửa thành gì.

**Nghiệm thu Mục B:** Có file `RA-SOAT-DOT-2.md`; anh gửi file này cho Fable 5 đọc trước khi duyệt.

---

# MỤC C — HOÀN THIỆN GIAI ĐOẠN 1 (infographic còn thiếu)

Dựa vào báo cáo Mục A câu 4, làm **lần lượt từng bài**, mỗi phiên một bài. Thứ tự đề nghị: Chronograph → Tourbillon → Dây tóc & bánh lắc → GMT → Lịch vạn niên.

**Mẫu prompt (thay tên cơ chế và mô tả chuyển động tương ứng):**

> Dùng component `MechanismAnimation` đã có, tạo bài `/co-che/<slug>` về cơ chế **[TÊN]**. Hoạt ảnh SVG phải thể hiện đúng chuyển động cốt lõi: **[MÔ TẢ]**. Yêu cầu: điều khiển play/pause, thanh trượt tốc độ, nút từng bước; chạm/rê vào bộ phận thì sáng lên kèm tên tiếng Việt và tiếng Anh; hoạt động tốt trên điện thoại. Bài viết theo cấu trúc hiện tượng → nguyên lý → ý nghĩa lịch sử, có liên kết chéo tới các bài cơ chế liên quan và tới mốc tương ứng trong trang Lịch sử. Thêm bộ phận này vào trang `/giai-phau` nếu phù hợp.

**Mô tả chuyển động cho từng bài:**

| Cơ chế | Chuyển động cốt lõi cần mô phỏng |
|---|---|
| Chronograph | Bấm nút → bánh xe cột (column wheel) xoay một nấc → cần ly hợp gạt bánh trung gian ăn khớp → kim giây trung tâm bắt đầu chạy; bấm lần hai dừng; bấm nút dưới → cần reset (heart-piece) gạt kim về 0 |
| Tourbillon | Toàn bộ bộ thoát + bánh lắc nằm trong lồng xoay tròn đủ 1 vòng mỗi phút; minh họa trực quan vì sao xoay đều giúp triệt tiêu sai lệch do trọng lực ở các tư thế đứng |
| Dây tóc & bánh lắc | Dây tóc co giãn đều, bánh lắc dao động qua lại quanh trục; thanh trượt cho phép đổi tần số 18.000 / 21.600 / 28.800 / 36.000 vph để thấy nhịp nhanh chậm khác nhau |
| GMT | Kim giờ thường quay 1 vòng/12 giờ, kim GMT quay 1 vòng/24 giờ; xoay vành bezel 24h để đọc múi giờ thứ ba |
| Lịch vạn niên | Bánh răng 48 tháng xoay dần, minh họa tháng thiếu 30 ngày và tháng 2 nhuận 29 ngày được "nhớ" bằng biên dạng răng khác nhau |

---

# MỤC D — HOÀN THIỆN GIAI ĐOẠN 2

## D1. Nâng cấp thương hiệu theo dữ liệu được cấp

> Nâng cấp 3 trang thương hiệu `/thuong-hieu/tag-heuer`, `/thuong-hieu/ulysse-nardin`, `/thuong-hieu/rolex` theo đúng template 5 khối. **Toàn bộ dữ kiện lấy từ file `goi-du-lieu-thuong-hieu-dot-1.md` tôi cung cấp kèm theo — không tự thêm bất kỳ dữ kiện, tên riêng, con số nào ngoài file.** Được biên tập lại câu chữ cho mượt theo `CONTENT-GUIDE.md`. Nội dung nào trong file đánh dấu [GHI CHÚ NỘI BỘ] thì không hiển thị ra trang.

*(Các đợt tiếp theo sẽ được cấp dữ liệu tương tự. Không tự viết dữ kiện thương hiệu mới.)*

## D2. Cân lại tỷ trọng phân khúc

> Hiện 24 thương hiệu đang lệch về cao cấp (17 hãng ở ba hạng trên, chỉ 7 hãng tầm trung và nhập môn), trong khi độc giả Việt tìm nhiều nhất ở nhóm nhập môn. Hãy **chỉ tạo khung trang trống** (frontmatter + 5 khối rỗng có placeholder "Nội dung đang hoàn thiện") cho 6 thương hiệu sau, **không tự viết nội dung**: Seiko, Grand Seiko, Orient, Tissot, Hamilton, Longines. Tôi sẽ cấp dữ liệu cho từng hãng sau.

## D3. Từ điển liên kết chéo tự động

> Viết một tiện ích (remark plugin hoặc script build) tự động quét thân bài: lần xuất hiện **đầu tiên** của mỗi thuật ngữ có trong Từ điển (`/tu-dien`) được bọc thành link kèm tooltip hiện định nghĩa ngắn khi rê chuột hoặc chạm. Chỉ áp dụng cho lần đầu trong mỗi bài để không rối mắt. Danh sách thuật ngữ lấy tự động từ collection tu-dien, không hard-code.

**Nghiệm thu:** Mở 3 bài bất kỳ, thuật ngữ đầu tiên có tooltip, lần sau không lặp link; tooltip hoạt động trên điện thoại.

---

# MỤC E — GIAI ĐOẠN 3: TRẢI NGHIỆM NGƯỜI DÙNG

## E1. Tìm kiếm toàn trang

> Tích hợp **Pagefind** vào trang Astro: đánh index toàn bộ nội dung tiếng Việt, ô tìm kiếm đặt trên header với phím tắt "/", kết quả hiện dạng overlay ngay khi gõ. Bắt buộc hỗ trợ **tìm không dấu** (gõ "tru cot" ra được bài "Trữ cót").

## E2. Bộ lọc cho hai trang danh sách còn lại

> Trang `/thuong-hieu` đã có bộ lọc phân hạng. Bổ sung tương tự, dùng chung kiểu nút đó: `/mau-iconic` lọc theo **thể loại** (lặn, chronograph, dress, phi công, GMT, sport-luxury) và **thập niên ra đời**; `/co-che` lọc theo **nhóm** (nền tảng / bổ trợ / phức tạp) và **độ khó**. Lọc chạy phía client, không tải lại trang, dữ liệu lấy từ frontmatter. URL giữ trạng thái lọc để chia sẻ được.

## E3. Công cụ so sánh mẫu iconic

> Tạo trang `/so-sanh`: người dùng chọn 2–3 mẫu iconic, hiển thị bảng đối chiếu gồm năm ra đời, thương hiệu, thể loại, bộ máy, tần số, trữ cót, chống nước, chất liệu vỏ, và một dòng "câu chuyện định danh". Dữ liệu lấy từ frontmatter, không nhập tay. Trạng thái lựa chọn lưu trên URL để chia sẻ. Giao diện xếp dọc gọn gàng trên điện thoại. Thêm nút "So sánh" trên mỗi thẻ ở trang `/mau-iconic`.

## E4. Dark mode

> Thêm chế độ tối: nút chuyển trên header, ghi nhớ lựa chọn, mặc định theo cài đặt hệ điều hành. Bảng màu tối phải sang trọng như bên trong hộp đựng đồng hồ: nền than chì, chữ ngà, điểm nhấn ánh kim đồng. **Bắt buộc chỉnh cả timeline, các hoạt ảnh SVG cơ chế và trang Giải phẫu** cho hợp nền tối — kiểm từng trang, không để chữ hoặc nét vẽ chìm vào nền.

---

# MỤC F — GIAI ĐOẠN 4: NỀN TẢNG TĂNG TRƯỞNG

## F1. SEO kỹ thuật

> Bổ sung: sitemap.xml tự sinh; meta description riêng cho từng bài (không dùng chung); structured data schema.org (Article cho bài viết, BreadcrumbList cho điều hướng, Organization cho trang chủ); ảnh OG tự sinh cho mỗi bài gồm tiêu đề bài + tên thương hiệu trên nền nhận diện của trang, để chia sẻ lên Facebook/Zalo hiển thị đẹp. Kiểm tra thẻ canonical không bị trùng lặp.

## F2. Newsletter hoạt động thật

> Kết nối form "Nhận bài viết mới" ở footer với dịch vụ miễn phí (đề xuất Buttondown hoặc Formspree): đăng ký thật, có trang cảm ơn, có chống spam cơ bản, báo lỗi rõ ràng khi nhập sai định dạng email. Hướng dẫn tôi các bước tạo tài khoản và lấy khóa API nếu cần.

## F3. Đo lường

> Gắn analytics nhẹ và tôn trọng quyền riêng tư (Vercel Analytics hoặc Umami): theo dõi trang được đọc nhiều nhất, nguồn truy cập, thời gian ở lại. Không dùng Google Analytics.

---

# MỤC G — CHỐT LẠI HAI FILE NỀN

Chạy sau khi Mục B xong, nhằm ngăn lỗi tái diễn.

## G1. Siết chặt CONTENT-GUIDE.md

> Cập nhật `CONTENT-GUIDE.md`, bổ sung mục **"Quy tắc chống sai sót"** gồm:
> - Danh xưng độc quyền: Blancpain = thương hiệu lâu đời nhất (1735); Vacheron Constantin = nhà chế tác hoạt động liên tục lâu đời nhất (1755); không hãng nào khác dùng cụm "lâu đời nhất thế giới".
> - Thuật ngữ tiếng Anh chỉ được đặt trong ngoặc đơn sau từ tiếng Việt, không đứng một mình giữa câu.
> - Không dùng bội số giá thị trường thứ cấp; chỉ mô tả định tính.
> - Mọi năm, tên calibre, thông số kỹ thuật phải truy được về nguồn; không chắc thì bỏ và ghi vào `CAN-KIEM-CHUNG.md`.
> - Tên riêng giữ nguyên dấu: Gérald Genta, Söhne, Glashütte, Vallée de Joux, Métiers d'Art.
> - Tên địa danh và quốc gia phải đúng với thời điểm được nhắc tới.
> - Không đưa tên bước, số giai đoạn, ghi chú quy trình vào giao diện.

## G2. Cập nhật IMAGE-MANIFEST.md

> Quét lại toàn site sau các thay đổi, cập nhật `IMAGE-MANIFEST.md`: bảng gồm đường dẫn file | thương hiệu hoặc mẫu tương ứng | kích thước đề nghị | trang hiển thị | **trạng thái (đã có ảnh / đang placeholder)**. Sắp xếp các dòng còn thiếu ảnh lên đầu để tôi biết cần bổ sung gì trước.

---

# THỨ TỰ THỰC HIỆN ĐỀ NGHỊ

| Thứ tự | Mục | Lý do ưu tiên |
|---|---|---|
| 1 | A | Biết chính xác hiện trạng trước khi giao việc |
| 2 | B | Lỗi hiển thị ra ngoài, ảnh hưởng uy tín trang |
| 3 | G | Chốt quy tắc để các bước sau không lặp lỗi |
| 4 | D1 | Đã có sẵn dữ liệu, dựng là xong |
| 5 | C | Hoàn thiện điểm độc bản của trang |
| 6 | E1, E2 | Trang đã nhiều nội dung, cần tìm kiếm và lọc |
| 7 | E3, E4 | Nâng trải nghiệm |
| 8 | D2, D3 | Mở rộng nội dung, liên kết chéo |
| 9 | F | Chuẩn bị cho giai đoạn 2 của dự án |

**Quy trình chất lượng mỗi mục:** GLM làm → push → anh xem bản live (cửa sổ ẩn danh) → gửi ảnh chụp cho Fable 5 rà nội dung chuyên môn → GLM sửa nếu cần → duyệt → sang mục kế tiếp.
