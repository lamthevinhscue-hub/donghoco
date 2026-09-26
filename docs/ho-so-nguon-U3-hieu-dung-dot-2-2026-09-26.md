# Hồ sơ nguồn U3 — đợt 2 loạt "Hiểu đúng"

- Giao dịch: TXN-20260926-248 (danh mục DHC-GD3-20260925 v1.0.0), ngày lập 2026-09-26. Nền `e0705c3` = origin/main.
- Mục tiêu: hồ sơ nguồn cho 5 chủ đề "Hiểu đúng" đợt 2. CHỈ hồ sơ — chưa tạo bài VI/EN, chưa tích hợp website, chưa gắn thẻ `hieu-dung`, chưa đổi hub.
- Phương pháp: mọi URL truy cập thật trong phiên 2026-09-26. Công cụ: FHH articles — WebFetch 200 + xác minh curl; eta.ch — WebFetch/web_reader 200 (curl trả rỗng — ghi nhận công cụ); sellita.ch — curl 200 (redirect /index.php/fr/), WebFetch lỗi ECONNRESET; nomos/osis/cosc/seiko/oris/ferdinandberthoud — 200; Omega FAQ — WebFetch 200 (curl shell rỗng, trang JS-render); METAS — WebFetch 301 lỗi ghép host, web_reader trên URL gốc 200.
- Quy ước: URL chỉ in khi thuộc bảng claim hoặc danh sách không-làm-nguồn; nguồn frontmatter hiện có của bài đích nhắc theo định danh.
- Trạng thái SẴN SÀNG = các claim dự kiến viết có ≥2 URL nguồn trực tiếp trong khối VÀ nút trả lời câu hỏi myth có bằng chứng; ranh giới viết/cấm nằm ở từng bảng claim + danh sách không-được-viết.

## Tổng kết 5 chủ đề

| # | Chủ đề | Bài đích chính | Trạng thái |
|---|--------|----------------|------------|
| 1 | Bộ máy in-house có luôn tốt hơn máy ETA hay Sellita? | `/co-che/bo-may-in-house/` | CẦN THU HẸP |
| 2 | Nhanh chậm vài giây mỗi ngày có phải đã hỏng? | `/huong-dan/do-sai-so/` | SẴN SÀNG |
| 3 | Có giờ nào tuyệt đối không được chỉnh lịch? | `/huong-dan/chinh-lich-an-toan/` | CẦN THU HẸP |
| 4 | Automatic có bao giờ cần lên dây tay? | `/co-che/len-day-tu-dong/` | SẴN SÀNG |
| 5 | Chứng nhận COSC nói lên điều gì? | `/tu-dien/chronometer/` | SẴN SÀNG |

Tổng: 3 SẴN SÀNG — 2 CẦN THU HẸP — 0 GỘP — 0 CHƯA ĐỦ NGUỒN. Lý do hai mức CẦN THU HẸP ghi chi tiết tại từng mục: cả hai đều có dữ kiện nền có nguồn nhưng **nút trả lời câu hỏi myth chưa có câu nguyên văn trực tiếp** — đã nỗ lực và bị loại có chủ đích, không ép.

## M1. Bộ máy in-house có luôn tốt hơn máy ETA hay Sellita? — dẫn `/co-che/bo-may-in-house/`

Trạng thái: **CẦN THU HẸP**

- Dữ kiện nền (định nghĩa manufacture/établisseur/ébauche, lịch sử ETA/Sellita, góc nhìn hãng in-house) đều có nguồn trực tiếp — 8 URL trong khối.
- **Nút trả lời myth** ("in-house không hẳn tốt hơn / không phải thước đo chất lượng") KHÔNG có câu nguyên văn trực tiếp: 8 URL thu được chỉ gồm định nghĩa từ điển trung tính (FHH) và tuyên ngôn marketing của từng bên có lợi ích (NOMOS khen in-house; Sellita khen tích hợp dọc của nhà cung cấp). Bài "Hiểu đúng" nếu viết phải biến dữ kiện thành kết luận so sánh — vượt nguồn. Nâng SẴN SÀNG khi có nguồn độc lập trực tiếp về so sánh này.

### Đối chiếu trùng với bài hiện có

- `/co-che/bo-may-in-house/` ("nghĩa là gì và không nghĩa là gì") — đã xử lý đúng ranh giới; bài "Hiểu đúng" chỉ trả lời myth, dẫn về.
- `/co-che/eta-sellita/` — hai hãng đã đào sâu; dẫn.
- `/co-che/manufacture-etablisseur/` — phân định vai; dẫn.

### Bảng claim (dữ kiện nền — dùng khi chủ đề được mở)

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| "Manufacture" = hãng tự chế tạo gần như toàn bộ, đối lập finishing shops và établisseurs | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/manufacture | "differentiate between a company that manufactures a watch almost in its entirety as opposed to finishing shops" | 2026-09-26 | FHH, HTTP 200 [đầy đủ] | Chỉ định nghĩa thuật ngữ — KHÔNG suy ra chất lượng |
| Établisseur = người mua ébauche và linh kiện để lắp ráp | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/etablisseur | "In Switzerland, a watchmaker who buys ébauches and parts to then assemble them." | 2026-09-26 | FHH [đầy đủ] | Mô hình có tên gọi chính thức — không phán xét |
| Ébauche = bộ máy chưa hoàn thiện bán ra | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/ebauche | "The modern ébauche is a watch movement, with or without jewels but always without its regulating organ, mainspring, dial and hands." | 2026-09-26 | FHH [đầy đủ] | — |
| NOMOS tự sản xuất escapement độc quyền; DUW 4601 là calibre in-house thứ 12 | https://www.nomos-glashuette.com/tangente | "the twelfth caliber to be produced by NOMOS in-house, which is celebrated with an elaborate fine sunbeam finish" | 2026-09-26 | Chính hãng NOMOS [đầy đủ] | Tuyên ngôn của bên có lợi ích — ghi rõ khi viết |
| ETA: xưởng ébauche đầu tiên của nhóm mở tại Fontainemelon năm 1793 | https://www.eta.ch/fr/entreprise/histoire | "Le premier atelier et commerce d'ébauches du groupe fut ouvert par quatre maîtres-horlogers à Fontainemelon (NE) en 1793." | 2026-09-26 | Chính hãng ETA (tiếng Pháp) [đầy đủ] | Trích tiếng Pháp — dịch khi viết kèm nguồn |
| Sellita tự kiểm soát dọc các giai đoạn thiết kế–sản xuất–lắp ráp | https://www.sellita.ch/index.php/en/manufacture | "Sellita has in-house control over all the essential stages of the design, manufacture and assembly of mechanical movements." | 2026-09-26 | Chính hãng Sellita [đầy đủ] | Tuyên ngôn hãng |
| Sellita = nhà sản xuất bộ máy tự động Swiss Made | https://www.sellita.ch | "fabricant suisse de mouvements mécaniques automatiques Swiss Made pour l'horlogerie" | 2026-09-26 | Chính hãng (meta description, tiếng Pháp) [đầy đủ] | — |
| Bộ máy gồm ébauche + bộ điều tốc + linh kiện khác | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/movement | "the movement comprises the ébauche, the regulating parts and other components" | 2026-09-26 | FHH [đầy đủ] | — |

### Không được viết

- "In-house luôn tốt hơn" hoặc "in-house không hẳn tốt hơn / chỉ là marketing" — cả hai hướng đều KHÔNG có nguồn trực tiếp — KHÔNG viết kết luận so sánh.
- Số hiệu bộ máy cụ thể của hãng nào (trừ DUW 4601 có trích) — KHÔNG viết.
- Đánh giá chất lượng ETA/Sellita/any in-house — KHÔNG viết.

### Đề cương Phụ lục B (bản nháp chờ nguồn nút trả lời)

- Câu trả lời ngắn (nháp): chờ nguồn độc lập cho nút so sánh; hiện chỉ viết được các định nghĩa + dữ kiện hãng.
- Liên kết đọc thêm: `/co-che/bo-may-in-house/`, `/co-che/eta-sellita/`, `/co-che/manufacture-etablisseur/`.
- sourceNotes dự kiến: 8 URL bảng claim + ghi chú giới hạn "chưa có nguồn kết luận so sánh".

### Liên kết đọc thêm (route đã xác nhận trong dist)

`/co-che/bo-may-in-house/`, `/co-che/eta-sellita/`, `/co-che/manufacture-etablisseur/`.

## M2. Nhanh chậm vài giây mỗi ngày có phải đã hỏng? — dẫn `/huong-dan/do-sai-so/`

Trạng thái: **SẴN SÀNG**

### Đối chiếu trùng với bài hiện có

- `/huong-dan/do-sai-so/` ("ghi nhận, không chẩn đoán") — phương pháp ghi nhận đã có; bài "Hiểu đúng" trả lời ngưỡng và ý nghĩa, dẫn về.
- `/tu-dien/tinh-dang-thoi/` (isochronism), `/tu-dien/sai-so-vi-tri/` (positional error) — thuật ngữ đã có; dẫn, không lặp.

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| COSC: máy cơ chứng nhận giữ trung bình ngày trong −4/+6 giây | https://www.cosc.swiss/certified-chronometer | "Average Daily Rate: The watch must maintain an average daily rate between -4 and +6 seconds per day." | 2026-09-26 | Cơ quan chứng nhận COSC, HTTP 200 [đầy đủ] | Ngưỡng thuộc chứng nhận COSC — không khái quát mọi đồng hồ cơ |
| Thử 5 vị trí, 3 nhiệt độ (8°/23°/38°C) | https://www.cosc.swiss/certified-chronometer | "tested in five different positions and at three different temperatures (8°, 23°, and 38°C)." | 2026-09-26 | COSC [đầy đủ] | Chỉ quy trình COSC |
| COSC FAQ: +6 giây/ngày liên tục vẫn là "độ đều đáng kể" | https://www.cosc.swiss/cosc-faq | "Even if a watch gained 6 seconds every day, it demonstrates remarkable regularity." | 2026-09-26 | COSC [đầy đủ] | Mệnh đề COSC — không suy ra mọi hãng |
| Sai số thay đổi theo vị trí đeo — hiện tượng bình thường | https://www.cosc.swiss/cosc-faq | "Mechanical watches can vary in precision depending on their position (dial facing upwards, dial facing downwards, sideways)." | 2026-09-26 | COSC [đầy đủ] | — |
| Isochronism: các yếu tố làm suy giảm tính đều | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/isochronism | "The principal factors that can impair a balance's isochronism are the escapement, incorrect poising of the balance and spring" | 2026-09-26 | FHH [đầy đủ] | Câu đầy đủ còn centrifugal force và magnetic fields |
| Sai số thay đổi theo vị trí là hiện tượng vốn có của đồng hồ đeo tay | https://www.ferdinandberthoud.ch/en/newsletter/newsletter-chronometre-fb-1-2-3.html | "to compensate for the variations in rate induced by the different positions to which a wristwatch will be subjected" | 2026-09-26 | Hãng Ferdinand Berthoud [đầy đủ] | Trong bối cảnh tourbillon/động lực không đổi |
| Grand Seiko công bố 2 chỉ số: phòng thí nghiệm +5/−3 vs đeo thường +10/−1 | https://www.grand-seiko.com/us-en/collections/movement/mechanical | "Mean daily rate: +5 to -3 seconds per day" · "Normal usage accuracy: +10 to -1 seconds per day" | 2026-09-26 | Chính hãng Grand Seiko (bảng thông số) [đầy đủ] | Chỉ calibre 9S (9S27 có dải riêng) — không khái quát |

### Không được viết

- "Lệch quá X giây mỗi ngày là hỏng/phải đem sửa" — không nguồn nào nêu ngưỡng sửa chữa — KHÔNG viết.
- Ngưỡng −4/+6 áp cho mọi đồng hồ cơ không chứng nhận — KHÔNG viết.
- Dải "đeo thường" của Grand Seiko khái quát cho hãng khác — KHÔNG viết.

### Đề cương Phụ lục B

- Câu trả lời ngắn: vài giây mỗi ngày nằm trong vùng các cơ quan/hãng công bố (COSC −4/+6; Grand Seiko đeo thường +10/−1); sai số thay đổi theo vị trí là hiện tượng có tên gọi và yếu tố kỹ thuật riêng (isochronism, positional error).
- Nguồn gốc hiểu lầm: so đồng hồ cơ với chuẩn quartz từng giây (định tính).
- Điều thực sự đúng: các mệnh đề có nguồn trong bảng.
- Chưa thể kết luận: ngưỡng nào thì hỏng/cần sửa — chưa có nguồn.
- Liên kết đọc thêm: `/huong-dan/do-sai-so/`, `/tu-dien/tinh-dang-thoi/`, `/tu-dien/sai-so-vi-tri/`.
- Tóm tắt chia sẻ (<200 ký tự): "Vài giây mỗi ngày chưa chắc là hỏng: COSC cho máy cơ chứng nhận ngưỡng −4/+6 giây/ngày, Grand Seiko công bố riêng số đeo thường rộng hơn số phòng thí nghiệm."
- sourceNotes dự kiến: COSC ×2 + Grand Seiko + FHH isochronism + Ferdinand Berthoud.

### Liên kết đọc thêm (route đã xác nhận trong dist)

`/huong-dan/do-sai-so/`, `/tu-dien/tinh-dang-thoi/`, `/tu-dien/sai-so-vi-tri/`.

## M3. Có giờ nào tuyệt đối không được chỉnh lịch? — dẫn `/huong-dan/chinh-lich-an-toan/`

Trạng thái: **CẦN THU HẸP**

- Khung giờ cấm CÓ trong nguồn nhưng chỉ áp dụng **một calibre cụ thể**: hướng dẫn chính hãng Seiko cho calibre 6L37 ghi rõ CAUTION 21:00–01:00 kèm hậu quả. Không nguồn nào cho phép khái quát; Omega FAQ KHÔNG có cảnh báo giờ cấm (chỉ trỏ user manual theo sản phẩm — dữ kiện dùng được làm minh chứng điều ngược lại); FHH perpetual calendar không có mệnh đề giờ cấm.
- Đề cấm suy khung giờ cấm chung — hồ sơ giữ đúng: khi mở viết, bài chỉ được nêu khung giờ có định danh "theo hướng dẫn Seiko cho calibre 6L37" và khuyến khích đọc hướng dẫn từng bộ máy. Nâng SẴN SÀNG khi thu thêm hướng dẫn của các calibre/hãng khác (mỗi cái một nguồn).

### Đối chiếu trùng với bài hiện có

- `/huong-dan/chinh-lich-an-toan/` ("nguyên tắc và vùng nên tránh") — đã có vùng nên tránh; bài "Hiểu đúng" trả lời câu hỏi "tuyệt đối" và dẫn về.
- Nguồn frontmatter hiện có của bài: Seiko 6L37 + FHH perpetual-calendar glossary + Omega FAQ (định danh).

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| Seiko 6L37: CAUTION không chỉnh lịch 21:00–01:00, có thể gây sự cố lịch | https://www.seikowatches.com/instructions/html/SEIKO_6L37_D_EN/BONDSYcuynbssw | "CAUTION — Do not set the date between 9:00 p.m. and 1:00 a.m. Amending the date during this time period may cause problems" | 2026-09-26 | Chính hãng Seiko, HTTP 200 [đầy đủ] | Chỉ calibre 6L37 — KHÔNG khái quát |
| Seiko 6L37: tránh chỉnh khi kim hiển thị 21h–1h sáng, có thể hư hại | https://www.seikowatches.com/instructions/html/SEIKO_6L37_D_EN/BONDSYcuynbssw | "Avoid amending the date when the watch is displaying between 9 PM and 1 AM. Doing so may cause damage." | 2026-09-26 | Chính hãng [đầy đủ] | Cùng phạm vi calibre |
| Omega FAQ không có cảnh báo giờ cấm — chỉ trỏ user manual theo sản phẩm (minh chứng điều ngược) | https://www.omegawatches.com/en-us/customer-service/faq/using-your-omega-watch | "Time-setting instructions are detailed in the digital user manual, available on each watch's product detail page." | 2026-09-26 | Chính hãng [đầy đủ] | Chỉ dùng để chứng minh "từng hãng xử lý khác nhau" — KHÔNG dùng làm bằng chứng khung giờ |

### Không được viết

- "Mọi đồng hồ cơ cấm chỉnh lịch 21h–1h" — chỉ có nguồn cho 1 calibre — KHÔNG viết khái quát.
- Khung giờ cấm gắn cho石英/quartz hoặc calibre khác 6L37 — KHÔNG viết.
- Cơ chế hư hỏng chi tiết (răng lịch, kích van) — nguồn chỉ nêu hậu quả chung — KHÔNG viết cơ chế.

### Đề cương Phụ lục B (bản nháp chờ nguồn)

- Câu trả lời ngắn (nháp): tùy bộ máy — có hãng ghi khung giờ tránh (Seiko 6L37: 21:00–01:00), có hãng chỉ trỏ user manual; đọc hướng dẫn bộ máy của mình trước khi chỉnh.
- Liên kết đọc thêm: `/huong-dan/chinh-lich-an-toan/`.
- sourceNotes dự kiến: Seiko 6L37 + Omega FAQ (minh chứng khác biệt) + chờ thêm hướng dẫn hãng khác.

### Liên kết đọc thêm (route đã xác nhận trong dist)

`/huong-dan/chinh-lich-an-toan/`.

## M4. Automatic có bao giờ cần lên dây tay? — dẫn `/co-che/len-day-tu-dong/`

Trạng thái: **SẴN SÀNG**

### Đối chiếu trùng với bài hiện có

- `/co-che/len-day-tu-dong/` (cơ chế rotor) và `/huong-dan/len-day-dong-ho/` (thủ tục lên dây) — đã đào sâu; bài "Hiểu đúng" trả lời câu hỏi, dẫn về.
- Ghi chú: chủ đề gần U2-M2 ("đeo mỗi ngày") — bài "Hiểu đúng" hai đợt phải phân góc: U2 nói tần suất đeo; U3 nói cơ chế automatic vẫn có lên dây tay.

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| Automatic vẫn được trang bị cơ chế lên dây tay | https://www.seikowatches.com/instructions/html/SEIKO_5R65_5R66_EN/BONDSYklwsizxh | "This watch is a self-winding watch equipped with a manual winding mechanism." | 2026-09-26 | Chính hãng Seiko [đầy đủ] | Khuôn hướng dẫn Seiko Spring Drive 5R65/5R66 |
| Khi mới đeo đồng hồ đã dừng, hãng khuyên lên dây tay | https://www.seikowatches.com/instructions/html/SEIKO_5R65_5R66_EN/BONDSYklwsizxh | "When first using a stopped watch, it is recommended that you manually wind the mainspring by turning the crown." | 2026-09-26 | Chính hãng [đầy đủ] | — |
| Định lượng: vặn crown 5 vòng cho ~10 giờ chạy | https://www.seikowatches.com/instructions/html/SEIKO_5R65_5R66_EN/BONDSYklwsizxh | "It is possible to wind up for appropriately 10 hours by rotating the crown 5 times." | 2026-09-26 | Chính hãng [đầy đủ] | Giữ nguyên "appropriately" (lỗi chính tả của trang gốc); chỉ calibre 5R65/5R66 |
| Chuyển động cổ tay không đủ → Omega khuyên lên dây tay bổ sung | https://www.omegawatches.com/en-us/customer-service/faq/using-your-omega-watch | "If your watch hasn't been worn for several days, or if wrist motion is insufficient to maintain optimal winding" | 2026-09-26 | Chính hãng [đầy đủ] | Câu sau: "In such cases, manual winding is recommended." |
| Định nghĩa automatic: lên dây bằng chuyển động cánh tay qua rotor | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/automatic-self-winding | "a mechanism that winds the mainspring by using the movement of the arm to cause a rotor to rotate" | 2026-09-26 | FHH [đầy đủ] | Chỉ định nghĩa — KHÔNG dùng chứng minh "không cần lên tay" |
| Rotor: đĩa bán nguyệt quay theo từng chuyển động cánh tay | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/rotor | "A semi-circular disc that freely rotates with each movement of the arm to automatically wind the mainspring." | 2026-09-26 | FHH [đầy đủ] | — |

### Không được viết

- "Automatic không bao giờ cần lên dây tay" — nguồn nói ngược lại — KHÔNG viết.
- "Lên dây tay bằng máy automatic sẽ làm đứt dây/quá tải" — không có nguồn — KHÔNG viết.
- Số vòng crown/quãng giờ cho calibre khác 5R65/5R66 — KHÔNG viết.

### Đề cương Phụ lục B

- Câu trả lời ngắn: có — automatic vẫn có cơ chế lên dây tay; hãng khuyên dùng khi đồng hồ dừng hoặc chuyển động cổ tay không đủ giữ dự trữ năng lượng (Seiko nêu cả định lượng).
- Nguồn gốc hiểu lầm: tin rằng "tự động" nghĩa là không bao giờ đụng núm vặn (định tính).
- Điều thực sự đúng: các mệnh đề có nguồn trong bảng.
- Chưa thể kết luận: so sánh tác hại/lợi ích giữa lên tay và hộp xoay cho mọi hãng.
- Liên kết đọc thêm: `/co-che/len-day-tu-dong/`, `/huong-dan/len-day-dong-ho/`.
- Tóm tắt chia sẻ (<200 ký tự): "Máy automatic vẫn có cơ chế lên dây tay: hãng khuyên lên tay khi đồng hồ dừng hoặc cổ tay thiếu chuyển động — Seiko nêu vặn 5 vòng cho khoảng 10 giờ chạy."
- sourceNotes dự kiến: Seiko 5R65 + Omega FAQ + FHH automatic/rotor.

### Liên kết đọc thêm (route đã xác nhận trong dist)

`/co-che/len-day-tu-dong/`, `/huong-dan/len-day-dong-ho/`.

## M5. Chứng nhận COSC nói lên điều gì về chiếc đồng hồ? — dẫn `/tu-dien/chronometer/`

Trạng thái: **SẴN SÀNG**

### Đối chiếu trùng với bài hiện có

- `/tu-dien/chronometer/` ("Chronometer và COSC") — định nghĩa đã có; bài "Hiểu đúng" giải thích chứng nhận nói gì/không nói gì, dẫn về.
- Route EN: `/en/glossary/chronometer/` và `/en/glossary/master-chronometer/` tồn tại trong dist — khi dịch, dẫn 2 route này; KHÔNG tự tạo.
- Phân biệt METAS Master Chronometer đã có nguồn (tái dùng từ hồ sơ U2 chủ đề 3).

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| COSC: nhãn độc lập được công nhận, chứng nhận sự xuất sắc Thụy Sĩ từ 1973 | https://www.cosc.swiss/certified-chronometer | "The universally recognized and independent label certifying Swiss watchmaking excellence since 1973." | 2026-09-26 | COSC, HTTP 200 [đầy đủ] | Mệnh đề COSC tự mô tả |
| Chronometer = đồng hồ đo giờ chính xác cao đã qua thử nghiệm và chứng nhận COSC | https://www.cosc.swiss/cosc-chronograph-chronometer | "A chronometer is a high-precision watch that has been tested and certified by the COSC." | 2026-09-26 | COSC [đầy đủ] | Phân biệt với chronograph (cùng trang) |
| Từng bộ máy trải qua thử nghiệm khắt khe về nhiệt độ và vị trí, 12–20 ngày | https://www.cosc.swiss/certified-chronometer | "Each movement undergoes the most stringent tests, integrating temperature and position variations, over 12 to 20 days" | 2026-09-26 | COSC [đầy đủ] | Câu đầy đủ nêu theo loại bộ máy |
| Ngưỡng −4/+6 giây/ngày | https://www.cosc.swiss/cosc-chronograph-chronometer | "The precision of a COSC-certified chronometer must be between -4 and +6 seconds per day." | 2026-09-26 | COSC [đầy đủ] | Chỉ chứng nhận COSC |
| Cấp cơ bản COSC thử trên bộ máy; cấp mới hơn thử trên đồng hồ hoàn chỉnh | https://www.cosc.swiss/cosc-certifications | "Generally tested on the movement" + "The next level: tested on the finished watch, according to a COSC protocol." | 2026-09-26 | COSC [đầy đủ] | Hai cấp hai mệnh đề — viết đúng từng cấp |
| METAS Master Chronometer: thử trên tấm đồng hồ (watch head), gồm nước/sai số/kháng từ/dự trữ | https://www.metas.ch/metas/en/home/dl/konformitaetsbewertungsstelle-metas-cert/zertifizierung_uhren.html | "The MASTER CHRONOMETER certification is carried out by an independent organization on the watch head." | 2026-09-26 | METAS — WebFetch 301 lỗi ghép host; nội dung qua công cụ đọc web trên URL gốc [đầy đủ] | Ghi rõ quy trình N001 như hồ sơ U2 |
| Điều kiện Master Chronometer: bộ máy phải có "chronometer" theo ISO 3159 | https://www.metas.ch/metas/en/home/dl/konformitaetsbewertungsstelle-metas-cert/zertifizierung_uhren.html | "It is open to all brands whose 'Swiss Made' watches have a movement 'chronometer' certified, according to ISO 3159." | 2026-09-26 | METAS [đầy đủ] | — |

### Không được viết

- "COSC chứng nhận đồng nghĩa hoàn thiện đẹp / giá trị cao / bền hơn / nên mua" — không có nguồn loại trừ trực tiếp; chỉ được viết dữ kiện "cấp cơ bản thử trên bộ máy" theo trích — KHÔNG viết ngược chiều khẳng định về hoàn thiện/giá trị.
- "COSC kiểm tra cả vỏ/mặt số" — KHÔNG viết.
- Cấp Excellence Chronometer (−2/+4, 200 Gauss) — có trích trên trang certifications — được viết kèm trích nếu bài cần; KHÔNG suy ra so sánh giá trị.
- Chronograph có chuẩn riêng — nguồn nêu "no dedicated standard to certifying the precision of a chronograph" — viết theo trích, không suy rộng.

### Đề cương Phụ lục B

- Câu trả lời ngắn: COSC là cơ quan độc lập chứng nhận BỘ MÁY đạt ngưỡng sai số (−4/+6 giây/ngày) sau 12–20 ngày thử 5 vị trí 3 nhiệt độ; chứng nhận nói về độ chính xác của bộ máy theo quy trình công bố — cấp cao hơn của METAS thử trên đồng hồ hoàn chỉnh.
- Nguồn gốc hiểu lầm: đồng nhất "chronometer" với "đồng hồ xịn toàn diện" (định tính).
- Điều thực sự đúng: các mệnh đề có nguồn trong bảng.
- Chưa thể kết luận: quan hệ giữa chứng nhận và giá trị/độ bền lâu dài.
- Liên kết đọc thêm: `/tu-dien/chronometer/`, `/en/glossary/chronometer/`, `/en/glossary/master-chronometer/`, `/huong-dan/do-sai-so/`.
- Tóm tắt chia sẻ (<200 ký tự): "COSC chứng nhận bộ máy đạt ngưỡng sai số −4/+6 giây/ngày sau 12–20 ngày thử ở 5 vị trí, 3 nhiệt độ — nói về độ chính xác bộ máy, không phải hoàn thiện hay giá trị."
- sourceNotes dự kiến: COSC ×3 + METAS.

### Liên kết đọc thêm (route đã xác nhận trong dist)

`/tu-dien/chronometer/`, `/en/glossary/chronometer/`, `/en/glossary/master-chronometer/`, `/huong-dan/do-sai-so/`.

## Bảng chống trùng tổng hợp 5 chủ đề

| # | Chủ đề | Trùng chính | Mức | Xử lý |
|---|--------|-------------|-----|-------|
| 1 | In-house vs ETA/Sellita | bo-may-in-house + eta-sellita + manufacture-etablisseur | Định nghĩa/vai | CẦN THU HẸP — chờ nguồn nút trả lời |
| 2 | Nhanh chậm vài giây | do-sai-so + tinh-dang-thoi + sai-so-vi-tri | Phương pháp/thuật ngữ | SẴN SÀNG — dẫn |
| 3 | Giờ chỉnh lịch | chinh-lich-an-toan | Nguyên tắc + vùng | CẦN THU HẸP — chờ thêm hướng dẫn calibre khác |
| 4 | Automatic lên dây tay | len-day-tu-dong + len-day-dong-ho | Cơ chế/thủ tục | SẴN SÀNG — dẫn; phân góc với U2 |
| 5 | COSC | tu-dien/chronometer + 2 route EN glossary + do-sai-so | Định nghĩa/chứng nhận | SẴN SÀNG — dẫn |

## URL không làm nguồn (rỗng/không chứng minh chủ đề)

- Shell rỗng tầng HTML (curl 74 byte redirect) NHƯNG web_reader đọc được toàn văn — không chứng minh giờ cấm chỉnh lịch: https://www.hautehorlogerie.org/en/watches-and-culture/encyclopaedia/glossary-of-watchmaking/s/perpetual-calendar-watch-1/ — KHÔNG dùng làm nguồn M3 (nội dung chỉ về lịch vạn niên chỉnh năm thế kỷ).

## Claim bị loại hoặc chờ nguồn (tổng hợp)

1. Chủ đề 1: kết luận so sánh "in-house tốt hơn/không tốt hơn ETA-Sellita" — cả hai hướng đều chưa có nguồn trực tiếp — KHÔNG viết (lý do CẦN THU HẸP).
2. Chủ đề 2: ngưỡng "lệch bao nhiêu là hỏng/phải sửa" — KHÔNG viết.
3. Chủ đề 3: khung giờ cấm khái quát cho mọi đồng hồ cơ — KHÔNG viết; cơ chế hư hỏng chi tiết — KHÔNG viết (lý do CẦN THU HẸP).
4. Chủ đề 4: "lên tay làm đứt dây/quá tải" — KHÔNG viết.
5. Chủ đề 5: đồng nhất COSC với hoàn thiện/giá trị/độ bền/lời khuyên mua — KHÔNG viết; chỉ dữ kiện "thử trên bộ máy" theo trích.
6. Toàn hồ sơ: không giá, đầu tư, hàng xách tay, thuế, giấy tờ nhập khẩu.

## Giới hạn công cụ cần GPT Work lưu ý

- eta.ch: curl trả rỗng — WebFetch/web_reader 200 với nguyên văn đầy đủ (tiếng Pháp).
- sellita.ch: WebFetch ECONNRESET — curl 200 (redirect /index.php/fr/).
- Omega FAQ: curl trả shell JS rỗng (trang JS-render) — WebFetch 200.
- METAS: WebFetch 301 lỗi ghép host — web_reader trên URL gốc 200.
- FHH perpetual-calendar glossary: shell tầng HTML nhưng web_reader đọc được toàn văn — nội dung không chứng minh giờ cấm, không dùng.

## Kiểm định đã chạy trong phiên

- Checker `output/u3-myths-source-audit/kiem-u3.mjs` (env U3_ROOT/U3_DIST_ROOT cho phép thử ngoài cây): đủ 5 chủ đề + trạng thái; tổng cứng 3 SẴN SÀNG / 2 CẦN THU HẸP / 0 / 0; R2c mỗi chủ đề SẴN SÀNG ≥2 URL nguồn trong khối (ranh giới khối cắt M(n)→M(n+1) — bài học U2); 21 URL nguồn + 1 không-làm-nguồn (kiểm cứng R3d); truy cập lại URL nguồn (2xx, hoặc đúng ngoại lệ allowlist hẹp theo từng URL + mã + bằng chứng ghi trong hồ sơ; lỗi mạng/timeout ngoài allowlist luôn FAIL); mọi route nội bộ tồn tại trong dist (12 route, gồm 3 route EN glossary); bảng chống trùng 5 dòng + đồng bộ trạng thái với chi tiết; 2 tệp docs UTF-8 no BOM + newline cuối.
- Mutation ngoài repo: bỏ nguồn để chủ đề 2 SẴN SÀNG còn dưới 2 URL → checker phải fail đúng M2; hoàn nguyên byte-đối-byte rồi chạy lại đạt.
- `node scripts/scan-chars.mjs`, `git diff --check`, `git diff --cached --check` — xem biên bản.
- Không chạy `npm run check`/`npm run build`: U3 chỉ tạo hồ sơ/bằng chứng, không đụng đường build.
