# KẾ HOẠCH TỔNG THỂ HOÀN THIỆN WEBSITE "ĐỒNG HỒ CƠ"

**Trang hiện tại:** https://www.kienthucdonghoco.vn/ (Astro + Tailwind CSS, deploy trên Vercel)
**Người thực hiện:** GLM 5.2 (thi công) — Claude Fable 5 (kiểm tra, cải tiến) — Anh Vinh (phê duyệt, nghiệm thu, cung cấp ảnh)
**Nguyên tắc xuyên suốt:** Mọi nội dung viết bằng giọng của một nhà sưu tầm đồng hồ am hiểu sâu, đam mê lưu giữ giá trị của ngành chế tác; cơ chế và dấu ấn lịch sử được diễn đạt bằng infographic sinh động, dễ hiểu — phục vụ cả người mới lẫn người chơi lâu năm.

---

## PHẦN 1 — TỔNG QUAN LỘ TRÌNH

| Giai đoạn | Tên | Mục tiêu | Các bước |
|---|---|---|---|
| GĐ 0 | Nền móng kỹ thuật | Chuẩn hóa dữ liệu, hệ thống ảnh, giọng văn | 0.1 → 0.3 |
| GĐ 1 | Tính năng "wow" độc bản | Timeline lịch sử tương tác + Infographic động | 1.1 → 1.4 |
| GĐ 2 | Nâng cấp nội dung thương hiệu | Lịch sử dòng sản phẩm, so sánh phân khúc | 2.1 → 2.3 |
| GĐ 3 | Trải nghiệm người dùng | Tìm kiếm, bộ lọc, so sánh, dark mode | 3.1 → 3.4 |
| GĐ 4 | Chuẩn bị tăng trưởng | SEO, newsletter, analytics (nền cho kiếm tiền) | 4.1 → 4.3 |

**Cách sử dụng kế hoạch này:** Mỗi bước bên dưới gồm 4 mục: *(a) Mục tiêu — (b) Việc GLM cần làm — (c) Prompt mẫu để dán vào GLM 5.2 — (d) Tiêu chí nghiệm thu* để anh kiểm tra trước khi chuyển bước tiếp theo. Làm tuần tự theo số thứ tự; các bước trong cùng giai đoạn có thể đảo nếu cần.

---

## PHẦN 2 — CHI TIẾT TỪNG BƯỚC

### GIAI ĐOẠN 0 — NỀN MÓNG KỸ THUẬT

#### Bước 0.1 — Chuẩn hóa dữ liệu nội dung (Content Collections)

**(a) Mục tiêu:** Mọi bài viết (thương hiệu, mẫu iconic, cơ chế) có cấu trúc metadata thống nhất để sau này lọc, tìm kiếm, so sánh và hiển thị timeline đều dùng chung một nguồn dữ liệu.

**(b) Việc GLM cần làm:**
- Rà soát toàn bộ content collections hiện có trong Astro.
- Bổ sung schema (frontmatter) chuẩn cho từng loại bài:
  - *Thương hiệu:* tên, quốc gia, năm thành lập, phân khúc (entry / mid-range luxury / high-end luxury / haute horlogerie), tập đoàn mẹ, bộ máy tiêu biểu, tags.
  - *Mẫu iconic:* tên, thương hiệu, năm ra đời, thể loại (lặn / chronograph / dress / pilot / GMT / sport-luxury...), bộ máy, trữ cót, chống nước, tags.
  - *Cơ chế:* tên, độ khó (thấp / trung bình / cao), nhóm (cốt lõi / bổ trợ / complication), tags.
- Cập nhật frontmatter cho toàn bộ bài đã có theo schema mới.

**(c) Prompt mẫu cho GLM 5.2:**
> Trang web Astro của tôi tại [repo] có 3 content collections: thuong-hieu, mau-iconic, co-che. Hãy: (1) định nghĩa lại schema trong `src/content/config.ts` với các trường sau [dán danh sách trường ở mục (b)]; (2) cập nhật frontmatter của TẤT CẢ bài viết hiện có theo schema mới, tự điền dữ liệu chính xác cho từng bài (năm ra đời, thể loại, phân khúc...); (3) đảm bảo `npm run build` không lỗi. Không thay đổi nội dung thân bài.

**(d) Tiêu chí nghiệm thu:**
- [ ] Build thành công, trang hiển thị bình thường như trước.
- [ ] Mở ngẫu nhiên 3 file bài viết: frontmatter đầy đủ trường, dữ liệu đúng (kiểm tra năm ra đời, phân khúc).
- [ ] Không bài nào bị mất hoặc lỗi hiển thị.

---

#### Bước 0.2 — Hệ thống ảnh & danh mục ảnh cần chuẩn bị (Image Manifest)

**(a) Mục tiêu:** Toàn trang có quy ước ảnh thống nhất; anh biết chính xác cần tải ảnh gì, đặt tên gì, để vào đâu — GLM chỉ việc hiển thị.

**(b) Việc GLM cần làm:**
- Tạo cấu trúc thư mục ảnh chuẩn:
  - `/public/images/thuong-hieu/<slug>/logo.png` và `hero.jpg`
  - `/public/images/mau-iconic/<slug>/hero.jpg` (+ `detail-1.jpg`, `detail-2.jpg` nếu có)
  - `/public/images/timeline/<slug>.jpg`
- Tạo component `<WatchImage>` có: khung tỷ lệ cố định, hiệu ứng tải mờ dần, và **placeholder đẹp khi chưa có ảnh** (nền gradient + tên mẫu đồng hồ + dòng chữ "Ảnh đang cập nhật") — trang không bao giờ bị "vỡ" vì thiếu ảnh.
- Quét toàn bộ bài viết hiện có và **xuất file `IMAGE-MANIFEST.md`** liệt kê: đường dẫn file cần có, mẫu đồng hồ tương ứng, kích thước khuyến nghị, trang sẽ hiển thị.

**(c) Prompt mẫu cho GLM 5.2:**
> Hãy tạo hệ thống quản lý ảnh cho trang: (1) cấu trúc thư mục `/public/images/` theo quy ước [dán quy ước trên]; (2) component `WatchImage.astro` với lazy-loading và placeholder gradient hiển thị tên mẫu khi file ảnh chưa tồn tại; (3) thay toàn bộ thẻ ảnh hiện tại bằng component này; (4) quét tất cả bài viết và tạo file `IMAGE-MANIFEST.md` ở gốc repo, dạng bảng: đường dẫn file | mẫu đồng hồ/thương hiệu | kích thước đề nghị | vị trí hiển thị.

**(d) Tiêu chí nghiệm thu:**
- [ ] File `IMAGE-MANIFEST.md` tồn tại, liệt kê đủ 24 thương hiệu + 16 mẫu iconic + các mốc timeline.
- [ ] Khi chưa có ảnh, mọi trang hiển thị placeholder gọn gàng, không lỗi ảnh vỡ.
- [ ] Anh tải 1–2 ảnh thử, đặt đúng tên theo manifest → ảnh tự hiển thị đúng vị trí.

**Danh sách ảnh ưu tiên anh chuẩn bị trước (phục vụ GĐ 1):** xem Phần 4 của tài liệu này.

---

#### Bước 0.3 — "Hiến pháp nội dung" (Content Style Guide)

**(a) Mục tiêu:** Cố định giọng văn nhà-sưu-tầm để mọi bài GLM viết sau này đều đồng nhất, không lệch tông.

**(b) Việc GLM cần làm:** Tạo file `CONTENT-GUIDE.md` ở gốc repo, ghi rõ:
- Giọng văn: nhà sưu tầm am hiểu, kể chuyện có cảm xúc nhưng chính xác về kỹ thuật; không viết như bài quảng cáo bán hàng.
- Nguyên tắc: mỗi thuật ngữ chuyên môn xuất hiện lần đầu phải kèm giải thích ngắn tiếng Việt; số liệu kỹ thuật (tần số dao động, trữ cót, độ chống nước) phải chính xác, có thể kiểm chứng.
- Cấu trúc bài chuẩn cho từng loại (thương hiệu / mẫu iconic / cơ chế).
- Quy tắc chính tả tiếng Việt, cách viết tên riêng, đơn vị.

**(c) Prompt mẫu cho GLM 5.2:**
> Tạo file `CONTENT-GUIDE.md` làm chuẩn biên tập cho trang Đồng Hồ Cơ với các nội dung sau: [dán mục (b)]. Từ nay về sau, mọi bài viết mới hoặc chỉnh sửa đều phải tuân thủ file này.

**(d) Tiêu chí nghiệm thu:**
- [ ] File tồn tại, đọc thấy rõ ràng, đúng định hướng giọng nhà sưu tầm.
- [ ] Trong các prompt sau, anh chỉ cần nhắc GLM "tuân thủ CONTENT-GUIDE.md".

---

### GIAI ĐOẠN 1 — TÍNH NĂNG "WOW" ĐỘC BẢN

#### Bước 1.1 — Bản đồ thời gian tương tác: "300 năm đồng hồ cơ đeo tay"

**(a) Mục tiêu:** Trang `/lich-su` — timeline tương tác đầu tiên bằng tiếng Việt về lịch sử đồng hồ cơ đeo tay. Đây là "chữ ký" số 1 của trang.

**(b) Thiết kế đề xuất (góc nhìn nhà sưu tầm):**
- Desktop: dòng thời gian **cuộn ngang** như một dây cót đang nhả đều; Mobile: cuộn dọc.
- Mỗi mốc là một "thẻ" gồm: năm • sự kiện • ảnh/biểu tượng • 2–3 câu ý nghĩa • link đến bài chi tiết (nếu có).
- Ba lớp màu phân loại mốc, người xem bật/tắt được từng lớp:
  - 🔧 **Máy móc & cơ chế** (phát minh kỹ thuật)
  - 🏛 **Thương hiệu & mẫu định danh**
  - 🌍 **Bối cảnh & văn hóa** (chiến tranh, khủng hoảng quartz, phục hưng cơ khí)
- Hiệu ứng: thẻ hiện dần khi cuộn tới; đường nối các mốc chạy như kim giây.
- **Dữ liệu 28 mốc lịch sử đã soạn sẵn ở Phần 3** — GLM chỉ việc đưa vào file dữ liệu, không tự bịa.

**(c) Prompt mẫu cho GLM 5.2:**
> Tạo trang mới `/lich-su` — timeline tương tác "300 năm đồng hồ cơ đeo tay". Yêu cầu: (1) dữ liệu đặt tại `src/data/timeline.json` với nội dung tôi cung cấp sau đây [dán Phần 3]; (2) desktop cuộn ngang, mobile cuộn dọc; (3) mỗi mốc là thẻ gồm năm, tiêu đề, mô tả, ảnh (dùng component WatchImage, đường dẫn `/public/images/timeline/<slug>.jpg`), phân loại theo 3 nhóm với 3 màu, có nút bật/tắt từng nhóm; (4) hiệu ứng xuất hiện khi cuộn (Intersection Observer, không dùng thư viện nặng); (5) thêm mục "Lịch sử" vào menu chính; (6) giữ đúng phong cách thiết kế hiện tại của trang, tuân thủ CONTENT-GUIDE.md.

**(d) Tiêu chí nghiệm thu:**
- [ ] Đủ 28 mốc, đúng năm, đúng nội dung như Phần 3 (đối chiếu ngẫu nhiên 5 mốc).
- [ ] Bật/tắt từng lớp màu hoạt động; mobile cuộn mượt.
- [ ] Mốc có bài chi tiết trên trang (ví dụ Fifty Fathoms) dẫn link đúng.
- [ ] Tải trang nhanh, không giật trên điện thoại.

---

#### Bước 1.2 — Infographic động số 1: Bộ thoát (Escapement) — "Trái tim đập của đồng hồ"

**(a) Mục tiêu:** Bài viết + hoạt ảnh SVG mô phỏng bộ thoát Swiss lever hoạt động — người đọc điều khiển được. Đây là mẫu chuẩn (template) cho mọi infographic động về sau.

**(b) Thiết kế đề xuất:**
- Hoạt ảnh SVG thuần (không video, không thư viện nặng): bánh thoát (escape wheel), ngựa (pallet fork), bánh lắc (balance wheel) và dây tóc chuyển động đồng bộ.
- Điều khiển: nút ▶/⏸, thanh trượt tốc độ (chậm 10 lần để nhìn rõ từng nhịp "khóa – nhả"), nút "từng bước một".
- Chú thích từng bộ phận hiện khi rê chuột/chạm.
- Bên dưới hoạt ảnh: bài giải thích theo cấu trúc "Nhìn → Hiểu → Ngẫm": hiện tượng nhìn thấy → nguyên lý vật lý → vì sao đây là phát minh vĩ đại nhất của ngành.

**(c) Prompt mẫu cho GLM 5.2:**
> Tạo bài `/co-che/bo-thoat` kèm hoạt ảnh SVG tương tác mô phỏng bộ thoát Swiss lever. Yêu cầu kỹ thuật: (1) vẽ SVG các bộ phận: escape wheel 15 răng, pallet fork 2 chân kính, balance wheel + dây tóc; (2) animation bằng JavaScript thuần điều khiển requestAnimationFrame, thể hiện đúng chu kỳ: bánh lắc xoay qua → ngựa nhả → bánh thoát tiến 1 răng → khóa lại (tíc-tắc); (3) điều khiển: play/pause, thanh trượt tốc độ 0.1x–1x, nút "từng nhịp"; (4) rê chuột vào bộ phận nào thì sáng bộ phận đó + hiện tên tiếng Việt và tiếng Anh; (5) component đặt tên `MechanismAnimation` để tái sử dụng cho các cơ chế khác; (6) viết bài giải thích đi kèm theo giọng CONTENT-GUIDE.md, cấu trúc: hiện tượng → nguyên lý → ý nghĩa lịch sử.

**(d) Tiêu chí nghiệm thu:**
- [ ] Hoạt ảnh chạy đúng nhịp tíc-tắc, chậm lại được để nhìn rõ cơ chế khóa–nhả.
- [ ] Hoạt động tốt trên điện thoại (chạm thay cho rê chuột).
- [ ] Nội dung bài chính xác về kỹ thuật (anh gửi cho Fable 5 rà lại trước khi duyệt).

---

#### Bước 1.3 — Chuỗi infographic động tiếp theo (làm lần lượt, mỗi lần 1 bài)

Dùng lại component `MechanismAnimation` từ Bước 1.2. Thứ tự khuyến nghị theo mức độ hấp dẫn với người đọc:

1. **Cơ chế tự động (Automatic / Rotor)** — rotor xoay theo cử động cổ tay, nạp cót; mô phỏng lắc tay → rotor quay → cót cuộn dần.
2. **Chronograph** — bấm nút → bánh xe cột (column wheel) xoay → kim giây trung tâm chạy; minh họa cả ly hợp ngang.
3. **Tourbillon** — cả bộ thoát xoay trong lồng 1 vòng/phút; giải thích vì sao sinh ra để chống trọng lực.
4. **Dây tóc & bánh lắc** — trái tim của độ chính xác; minh họa co–giãn đẳng thời.
5. **Lịch vạn niên (Perpetual Calendar)** — bánh răng 48 tháng "nhớ" được năm nhuận.
6. **GMT / múi giờ kép** — kim 24h và vành bezel.

**(c) Prompt mẫu (thay tên cơ chế tương ứng):**
> Dùng component `MechanismAnimation` đã có, tạo bài `/co-che/<slug>` về cơ chế [tên]. Hoạt ảnh phải thể hiện đúng: [mô tả chuyển động cốt lõi ở trên]. Bài viết tuân thủ CONTENT-GUIDE.md, cấu trúc hiện tượng → nguyên lý → ý nghĩa. Liên kết chéo đến các bài cơ chế liên quan đã có.

**(d) Tiêu chí nghiệm thu (mỗi bài):**
- [ ] Chuyển động đúng nguyên lý (Fable 5 rà kỹ thuật trước khi anh duyệt).
- [ ] Phong cách hình ảnh đồng nhất với bài Bộ thoát.

> Sau bước này, mục Cơ chế tăng từ 5 lên 11+ bài, trong đó 7 bài có hoạt ảnh tương tác — cân xứng với 24 bài thương hiệu và trở thành điểm độc bản mạnh nhất của trang.

---

#### Bước 1.4 — "Giải phẫu một chiếc đồng hồ" (trang tương tác tổng hợp)

**(a) Mục tiêu:** Trang `/giai-phau` — hình một chiếc đồng hồ cơ nhìn xuyên thấu (exploded view), người xem chạm vào từng lớp (vỏ, mặt số, kim, bộ máy, cót, bộ thoát, chân kính...) để hiện chú thích và link đến bài cơ chế tương ứng. Đây là "trang chủ thứ hai" kết nối toàn bộ nội dung cơ chế.

**(c) Prompt mẫu cho GLM 5.2:**
> Tạo trang `/giai-phau` — sơ đồ SVG một đồng hồ cơ dạng exploded view gồm các lớp: kính – kim – mặt số – bộ máy (cầu nối, rotor, thùng cót, bánh răng trung gian, bộ thoát, bánh lắc) – đáy vỏ. Chạm/click từng bộ phận: bộ phận sáng lên, hiện thẻ chú thích (tên Việt + Anh, vai trò 2 câu, link bài chi tiết nếu có). Có nút "Tách lớp / Ghép lại" với animation mượt. Thiết kế đồng bộ nhận diện trang, thêm vào menu Cơ chế.

**(d) Tiêu chí nghiệm thu:**
- [ ] Đủ tối thiểu 10 bộ phận chạm được; link chéo đúng bài.
- [ ] Animation tách/ghép lớp mượt trên cả điện thoại.

---

### GIAI ĐOẠN 2 — NÂNG CẤP NỘI DUNG THƯƠNG HIỆU

#### Bước 2.1 — Template trang thương hiệu thế hệ mới

**(a) Mục tiêu:** Mỗi trang thương hiệu trở thành "hồ sơ sưu tầm" hoàn chỉnh theo đúng yêu cầu của anh, gồm 5 khối:

1. **Hồ sơ nhanh** — quốc gia, năm thành lập, phân khúc, tập đoàn mẹ, bộ máy in-house tiêu biểu.
2. **Dòng chảy lịch sử** — mini-timeline dọc của riêng thương hiệu: từ thành lập → các cột mốc → hiện tại (tái sử dụng component timeline của Bước 1.1 ở dạng thu gọn).
3. **Các dòng đồng hồ (Collections)** — mỗi dòng một thẻ: năm ra đời, đặc tính nhận diện (vỏ, mặt số, bộ máy), định vị trong danh mục thương hiệu, mẫu tiêu biểu.
4. **Đối chiếu cùng phân khúc** — bảng so sánh với 2–3 thương hiệu cùng hạng: thế mạnh chế tác, bộ máy, giá trị giữ giá, triết lý; kết bằng nhận định của "nhà sưu tầm" — chọn thương hiệu này khi nào, chọn đối thủ khi nào (khách quan, không dìm hàng).
5. **Mẫu iconic liên quan** — tự động kéo từ collection mau-iconic theo trường thương hiệu.

**(c) Prompt mẫu cho GLM 5.2:**
> Thiết kế lại template trang thương hiệu (`src/pages/thuong-hieu/[slug].astro` hoặc layout tương ứng) theo 5 khối sau: [dán mục (a)]. Khối 2 dùng dữ liệu `lineHistory` và khối 3 dùng `collections`, khối 4 dùng `segmentComparison` — bổ sung 3 trường này vào schema thương hiệu. Áp dụng thử với bài Blancpain làm mẫu hoàn chỉnh (tự nghiên cứu và điền dữ liệu chính xác: lịch sử từ 1735, các dòng Fifty Fathoms / Villeret / Le Brassus..., so sánh với các thương hiệu cùng phân khúc high-end như Breguet, Glashütte Original). Tuân thủ CONTENT-GUIDE.md.

**(d) Tiêu chí nghiệm thu:**
- [ ] Trang Blancpain mẫu có đủ 5 khối, dữ liệu chính xác (Fable 5 rà trước).
- [ ] Bảng so sánh khách quan, đọc thấy đúng giọng nhà sưu tầm, không như bài PR.

#### Bước 2.2 — Nâng cấp lần lượt 24 thương hiệu

Mỗi phiên làm việc với GLM: nâng cấp 2–3 thương hiệu theo template Blancpain. Thứ tự đề nghị: các thương hiệu đã có mẫu iconic trên trang trước (TAG Heuer, Ulysse Nardin...), sau đó theo mức độ phổ biến với độc giả Việt (Rolex, Omega, Seiko, Orient...).

**Quy trình chất lượng mỗi đợt:** GLM viết → anh chuyển cho Fable 5 rà số liệu + giọng văn → GLM sửa → anh duyệt. (Đây chính là vòng PDCA cho nội dung.)

#### Bước 2.3 — Từ điển liên kết chéo tự động

**(c) Prompt mẫu cho GLM 5.2:**
> Viết một tiện ích (remark plugin hoặc script build) tự động quét thân bài: lần xuất hiện ĐẦU TIÊN của mỗi thuật ngữ có trong Từ điển (`/tu-dien`) sẽ được bọc thành link kèm tooltip hiện định nghĩa ngắn khi rê chuột. Chỉ áp dụng lần đầu tiên trong mỗi bài để không rối mắt. Danh sách thuật ngữ lấy tự động từ collection tu-dien.

**(d) Tiêu chí nghiệm thu:**
- [ ] Mở 3 bài bất kỳ: thuật ngữ đầu tiên có tooltip, các lần sau không lặp link.
- [ ] Tooltip hoạt động trên mobile (chạm).

---

### GIAI ĐOẠN 3 — TRẢI NGHIỆM NGƯỜI DÙNG

#### Bước 3.1 — Tìm kiếm toàn trang (Pagefind)
> **Prompt:** Tích hợp Pagefind vào trang Astro: đánh index toàn bộ bài viết tiếng Việt, ô tìm kiếm trên header (phím tắt "/"), kết quả hiện nhanh dạng overlay, hỗ trợ tìm không dấu.
- Nghiệm thu: tìm "tru cot" (không dấu) vẫn ra bài "Trữ cót"; tốc độ tức thì.

#### Bước 3.2 — Bộ lọc & thẻ tag
> **Prompt:** Thêm bộ lọc cho trang danh sách: Thương hiệu lọc theo quốc gia + phân khúc; Mẫu iconic lọc theo thể loại + thập niên ra đời; Cơ chế lọc theo nhóm + độ khó. Lọc chạy phía client, không tải lại trang, dữ liệu lấy từ frontmatter (Bước 0.1).
- Nghiệm thu: kết hợp 2 điều kiện lọc cho kết quả đúng; URL giữ trạng thái lọc để chia sẻ được.

#### Bước 3.3 — Công cụ so sánh mẫu iconic
> **Prompt:** Tạo trang `/so-sanh`: chọn 2–3 mẫu iconic, hiển thị bảng đối chiếu (năm ra đời, thể loại, bộ máy, tần số, trữ cót, chống nước, chất liệu, câu chuyện định danh 1 dòng). Dữ liệu từ frontmatter. Có nút chia sẻ kết quả so sánh qua URL.
- Nghiệm thu: so sánh Fifty Fathoms và Monaco ra dữ liệu đúng; giao diện gọn trên mobile.

#### Bước 3.4 — Dark mode
> **Prompt:** Thêm dark mode với nút chuyển trên header, lưu lựa chọn, mặc định theo hệ điều hành. Bảng màu tối phải sang trọng kiểu hộp đựng đồng hồ: nền than chì, chữ ngà, điểm nhấn ánh kim — điều chỉnh cả timeline và các hoạt ảnh SVG cho hợp nền tối.
- Nghiệm thu: mọi trang (kể cả hoạt ảnh cơ chế) hiển thị đẹp ở cả 2 chế độ, không chỗ nào chữ chìm vào nền.

---

### GIAI ĐOẠN 4 — CHUẨN BỊ TĂNG TRƯỞNG (nền cho giai đoạn kiếm tiền sau này)

#### Bước 4.1 — SEO kỹ thuật
> **Prompt:** Bổ sung: sitemap.xml tự sinh; thẻ meta description riêng từng bài; structured data schema.org (Article cho bài viết, BreadcrumbList cho điều hướng); ảnh OG tự sinh cho từng bài (tên bài + thương hiệu trên nền nhận diện trang) để chia sẻ Facebook/Zalo hiển thị đẹp.
- Nghiệm thu: dán link bài bất kỳ vào Messenger/Zalo → hiện ảnh và mô tả đúng; kiểm tra sitemap truy cập được.

#### Bước 4.2 — Newsletter hoạt động thật
> **Prompt:** Kết nối form "Nhận bài viết mới" với dịch vụ miễn phí (đề xuất Buttondown hoặc Formspree): đăng ký thật, có trang cảm ơn, chống spam cơ bản.
- Nghiệm thu: anh tự đăng ký bằng email cá nhân và nhận được xác nhận.

#### Bước 4.3 — Đo lường
> **Prompt:** Gắn analytics nhẹ, tôn trọng quyền riêng tư (Vercel Analytics hoặc Umami): theo dõi trang được đọc nhiều, nguồn truy cập, để định hướng nội dung giai đoạn kiếm tiền.
- Nghiệm thu: sau 1 tuần xem được số liệu trang nào đọc nhiều nhất.

---

## PHẦN 3 — DỮ LIỆU TIMELINE: 28 MỐC LỊCH SỬ ĐỒNG HỒ CƠ ĐEO TAY

*(Nội dung soạn sẵn cho Bước 1.1 — GLM đưa nguyên vẹn vào `timeline.json`, không tự thêm bớt dữ kiện. Phân loại: 🔧 Máy móc & cơ chế | 🏛 Thương hiệu & mẫu định danh | 🌍 Bối cảnh & văn hóa)*

| Năm | Loại | Sự kiện | Ý nghĩa |
|---|---|---|---|
| ~1510 | 🔧 | Peter Henlein (Nuremberg) chế tạo những cỗ máy thời gian bỏ túi đầu tiên | Thời gian lần đầu rời khỏi tháp chuông để đi theo con người |
| 1657–1675 | 🔧 | Christiaan Huygens phát minh dây tóc kết hợp bánh lắc | Sai số từ hàng giờ giảm xuống hàng phút — nền tảng của mọi đồng hồ cơ đến nay |
| 1735 | 🏛 | Jehan-Jacques Blancpain lập xưởng tại Villeret | Thương hiệu đồng hồ lâu đời nhất còn hoạt động liên tục |
| 1755 | 🏛 | Jean-Marc Vacheron mở xưởng tại Geneva | Khởi đầu Vacheron Constantin — nhà chế tác vận hành liên tục lâu đời nhất |
| 1795 | 🔧 | Abraham-Louis Breguet sáng chế tourbillon (cấp bằng 1801) | "Cơn lốc" xoay cả bộ thoát để triệt tiêu ảnh hưởng trọng lực |
| 1810 | 🏛 | Breguet chế tác chiếc đồng hồ đeo tay đầu tiên cho Hoàng hậu Naples Caroline Murat | Chiếc đồng hồ đeo tay đầu tiên được ghi nhận trong lịch sử |
| 1868 | 🏛 | Patek Philippe làm đồng hồ đeo tay cho Nữ bá tước Koscowicz (Hungary) | Đồng hồ đeo tay đầu tiên của Patek — khi ấy còn bị coi là trang sức nữ |
| 1904 | 🏛 | Cartier Santos ra đời theo đặt hàng của phi công Santos-Dumont | Đồng hồ đeo tay nam hiện đại đầu tiên — sinh ra từ nhu cầu xem giờ khi lái máy bay |
| 1914–1918 | 🌍 | Thế chiến I: "trench watch" phổ biến trong quân đội | Đồng hồ đeo tay từ trang sức nữ thành công cụ sống còn của đàn ông — thay thế hẳn đồng hồ bỏ túi |
| 1923 | 🔧 | John Harwood cấp bằng cơ chế tự động lên cót cho đồng hồ đeo tay | Chiếc đồng hồ tự nạp năng lượng từ cử động cổ tay đầu tiên |
| 1926 | 🔧 | Rolex Oyster — vỏ chống nước đầu tiên sản xuất hàng loạt | Núm vặn ren xoắn kín như vỏ hàu; Mercedes Gleitze đeo bơi qua eo biển Manche 1927 |
| 1931 | 🔧 | Rolex Perpetual — rotor tự động xoay 360° | Chuẩn mực cơ chế tự động dùng đến tận hôm nay |
| 1931 | 🏛 | Jaeger-LeCoultre Reverso — mặt số lật để bảo vệ kính khi chơi polo | Biểu tượng Art Deco, đồng hồ hai mặt định danh một thể loại |
| 1936 | 🏛 | IWC ra mắt dòng Pilot's Watch (Special Pilot's Watch) | Khai sinh thể loại đồng hồ phi công chuyên dụng |
| 1945 | 🔧 | Rolex Datejust — ô lịch ngày tự nhảy đầu tiên trên đồng hồ đeo tay | Chức năng lịch ngày trở thành tiêu chuẩn của đồng hồ hiện đại |
| 1953 | 🏛 | Blancpain Fifty Fathoms — đồng hồ lặn hiện đại đầu tiên | Vành xoay một chiều, chống nước 91m — chuẩn mực mọi đồng hồ lặn sau này |
| 1953–1954 | 🏛 | Rolex Explorer (chinh phục Everest) và Submariner ra đời | Đồng hồ công cụ (tool watch) bước vào thời hoàng kim |
| 1954 | 🔧 | Rolex GMT-Master — kim 24 giờ cho phi công Pan Am | Khai sinh chức năng hai múi giờ cho kỷ nguyên bay xuyên lục địa |
| 1957 | 🏛 | Omega Speedmaster ra mắt | Chronograph huyền thoại, sau này là đồng hồ đầu tiên lên Mặt Trăng (1969) |
| 1963 | 🏛 | Heuer Carrera ra đời từ đam mê đua xe | Chronograph đua xe thuần khiết, định hình ngôn ngữ thiết kế thể thao |
| 1969 | 🔧 | Cuộc đua chronograph tự động: Zenith El Primero, Calibre 11 (Heuer–Breitling–Hamilton), Seiko 6139 | Ba dự án về đích cùng năm — El Primero 36.000 vph vẫn sản xuất đến nay |
| 1969 | 🌍 | Seiko Astron — đồng hồ quartz thương mại đầu tiên | Phát súng mở màn Khủng hoảng Quartz làm rung chuyển cả ngành Thụy Sĩ |
| 1972 | 🏛 | Audemars Piguet Royal Oak (thiết kế Gérald Genta) | Đồng hồ thể thao thép cao cấp đầu tiên — cứu cả phân khúc haute horlogerie |
| 1976 | 🏛 | Patek Philippe Nautilus (cũng của Gérald Genta) | Cặp song sinh định hình thể loại sport-luxury thống trị đến hôm nay |
| 1983 | 🌍 | Swatch ra đời, Nicolas Hayek tái cấu trúc ngành Thụy Sĩ | Lợi nhuận từ đồng hồ nhựa giá rẻ nuôi sống và hồi sinh đồng hồ cơ truyền thống |
| 1999 | 🔧 | Omega thương mại hóa bộ thoát Co-Axial của George Daniels | Cải tiến bộ thoát quan trọng nhất sau 250 năm — giảm ma sát, tăng bền |
| 2001 | 🏛🔧 | Ulysse Nardin Freak — không kim, không mặt số, lần đầu dùng silicium trong bộ thoát | Mở kỷ nguyên vật liệu silicon: nhẹ, không nhiễm từ, không cần dầu bôi trơn |
| 2013–nay | 🔧 | Omega đạt chuẩn chống từ >15.000 gauss; dây tóc silicon phổ cập toàn ngành; cơ khí phục hưng trong kỷ nguyên smartwatch | Đồng hồ cơ không còn là công cụ đo giờ — mà là di sản chế tác trên cổ tay |

> **Lưu ý cho GLM:** giữ nguyên số liệu; mỗi mốc cần thêm trường `slug` (đặt tên ảnh) và `linkNoiBo` (nếu trang đã có bài liên quan như fifty-fathoms, freak, monaco thì dẫn link).

---

## PHẦN 4 — DANH SÁCH ẢNH ƯU TIÊN ANH CHUẨN BỊ (đợt 1, phục vụ GĐ 1)

Đặt tên đúng như cột "Tên file", để vào thư mục `/public/images/timeline/`. Ưu tiên ảnh nền sáng hoặc nền trong, tỷ lệ ngang 4:3 hoặc 16:9, tối thiểu 1200px chiều ngang.

| Tên file | Ảnh cần tìm |
|---|---|
| breguet-naples.jpg | Breguet No. 2639 / bản tái hiện Reine de Naples |
| cartier-santos.jpg | Cartier Santos (bản đầu hoặc bản hiện đại) |
| trench-watch.jpg | Đồng hồ trench watch Thế chiến I (lưới bảo vệ mặt kính) |
| rolex-oyster-1926.jpg | Rolex Oyster đời đầu |
| jlc-reverso.jpg | Jaeger-LeCoultre Reverso |
| rolex-datejust.jpg | Rolex Datejust |
| fifty-fathoms.jpg | Blancpain Fifty Fathoms (đời đầu càng tốt) |
| rolex-submariner.jpg | Rolex Submariner |
| rolex-gmt.jpg | Rolex GMT-Master (bezel Pepsi) |
| omega-speedmaster.jpg | Omega Speedmaster Professional |
| heuer-carrera.jpg | Heuer Carrera đời 1963 hoặc bản kỷ niệm |
| zenith-el-primero.jpg | Zenith El Primero A386 |
| seiko-astron.jpg | Seiko Quartz Astron 1969 |
| ap-royal-oak.jpg | Audemars Piguet Royal Oak "Jumbo" |
| patek-nautilus.jpg | Patek Philippe Nautilus 3700 hoặc 5711 |
| swatch-1983.jpg | Swatch thế hệ đầu 1983 |
| omega-coaxial.jpg | Bộ máy Omega Co-Axial (ảnh movement) |
| un-freak.jpg | Ulysse Nardin Freak |
| silicon-hairspring.jpg | Dây tóc silicon (ảnh macro movement) |

*(Các mốc không có ảnh, GLM dùng placeholder/biểu tượng vẽ SVG — không để trống. Danh mục ảnh đầy đủ cho toàn trang sẽ nằm trong `IMAGE-MANIFEST.md` sau Bước 0.2.)*

---

## PHẦN 5 — QUY TRÌNH PHỐI HỢP (VÒNG PDCA CHO TỪNG BƯỚC)

1. **Plan:** Anh chọn bước trong kế hoạch này, dán prompt mẫu (điều chỉnh nếu cần) cho GLM 5.2.
2. **Do:** GLM thực hiện, deploy bản preview trên Vercel.
3. **Check:** Anh đối chiếu với *Tiêu chí nghiệm thu*; với nội dung chuyên môn (số liệu lịch sử, kỹ thuật), gửi bài cho Fable 5 rà soát tính chính xác và giọng văn trước khi duyệt.
4. **Act:** Đạt → chuyển bước tiếp theo; chưa đạt → gửi lại GLM danh sách điểm cần sửa (ghi cụ thể từng điểm, tránh yêu cầu chung chung).

**Ba nguyên tắc khi làm việc với GLM 5.2:**
- Mỗi phiên chỉ giao **một bước**, không gộp nhiều bước — dễ kiểm soát, dễ truy lỗi.
- Luôn nhắc GLM **"tuân thủ CONTENT-GUIDE.md và không thay đổi các phần ngoài phạm vi bước này"**.
- Trước khi bắt đầu bước mới, yêu cầu GLM xác nhận `npm run build` thành công và trang cũ không bị ảnh hưởng.
