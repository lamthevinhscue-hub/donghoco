# Hồ sơ nguồn U2 — đợt 1 loạt "Hiểu đúng"

- Giao dịch: TXN-20260926-243 (danh mục DHC-GD3-20260925 v1.0.0), ngày lập 2026-09-26. Nền `2e5820b` = origin/main.
- Mục tiêu: hồ sơ nguồn cho 5 chủ đề "Hiểu đúng" đợt 1. CHỈ hồ sơ — chưa viết, chưa dịch, chưa tích hợp bài, không thẻ `hieu-dung`, không đổi hub `/hieu-dung` hoặc `/en/myths/`.
- Phương pháp: mọi URL truy cập thật trong phiên 2026-09-26. Công cụ: FHH articles — WebFetch 200 + xác minh curl; incabloc.ch — WebFetch/curl 200; Seiko — curl 200; Omega FAQ — curl bị chặn (HTTP 000), WebFetch 200 và đối chiếu Wayback snapshot khớp từng chữ; METAS — URL gốc redirect lỗi, web_reader trang sống + nguyên văn từ bản lưu Wayback của chính URL (curl 200); ISO 22810 — live 403, catalogue qua bản lưu Wayback (curl 200); Oris — curl 200.
- Quy ước: nguồn frontmatter hiện có của bài đích nhắc theo định danh khi không dùng làm nguồn mới; URL chỉ in khi thuộc bảng claim hoặc danh sách không-làm-nguồn.
- Trạng thái SẴN SÀNG = các claim dự kiến viết có ≥2 URL nguồn trực tiếp trong khối; ranh giới viết/cấm nằm ở từng bảng claim + danh sách không-được-viết + đề cương Phụ lục B.

## Tổng kết 5 chủ đề

| # | Chủ đề | Bài đích chính | Trạng thái |
|---|--------|----------------|------------|
| 1 | Chân kính càng nhiều có phải càng tốt? | `/tu-dien/chan-kinh/` | SẴN SÀNG |
| 2 | Đồng hồ cơ có cần đeo mỗi ngày không? | `/huong-dan/len-day-dong-ho/` | SẴN SÀNG |
| 3 | Điện thoại và nam châm có làm đồng hồ cơ chạy sai? | `/co-che/chong-tu/` | SẴN SÀNG |
| 4 | Kính sapphire có thật sự không trầy, không vỡ? | `/co-che/kinh-dong-ho/` | CẦN THU HẸP |
| 5 | Chỉ số chống nước 30 m nghĩa là gì? | `/huong-dan/muc-chong-nuoc/` | SẴN SÀNG |

Tổng: 4 SẴN SÀNG — 1 CẦN THU HẸP — 0 GỘP — 0 CHƯA ĐỦ NGUỒN. Chủ đề 4 CẦN THU HẸP vì nửa "chống trầy" của câu hỏi có nguồn chính hãng, còn nửa "có thể vỡ/mép" và độ cứng Mohs chưa có câu nguyên văn nào từ nguồn trong phạm vi được phép.

## M1. Chân kính càng nhiều có phải càng tốt? — dẫn `/tu-dien/chan-kinh/`

Trạng thái: **SẴN SÀNG**

### Đối chiếu trùng với bài hiện có

- `/tu-dien/chan-kinh/` ("Chân kính") — định nghĩa thuật ngữ; bài "Hiểu đúng" chỉ trả lời câu hỏi myth và dẫn về.
- `/co-che/chong-soc/` ("Chống sốc — Vì sao đồng hồ rơi mà không hỏng") — đào sâu hệ chống sốc; bài "Hiểu đúng" chỉ dẫn lại, không lặp cơ chế.
- `/co-che/bo-may-in-house/` — nhắc chân kính trong bối cảnh bộ máy; chỉ dẫn.

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| Chân kính = ổ trục ruby giảm ma sát cho trục | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/jewels | "The international term for the jewels (rubies) in a watch movement that are used as bearings for pivots to reduce friction." | 2026-09-26 | FHH, WebFetch 200 + xác minh curl [đầy đủ] | Chỉ công dụng, không suy ra số lượng |
| Máy chất lượng phổ biến 15–21 chân kính | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/jewels | "The movement of a quality watch has between 15 and 21 jewels." | 2026-09-26 | FHH [đầy đủ] | "quality watch" theo mệnh đề FHH — không suy ra đánh giá model cụ thể |
| Hầu hết chân kính ngày nay là đá tổng hợp, vai trò giảm ma sát | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/stone | "The majority of stones (jewels) used in watches today are synthetic. Their role is to minimise friction." | 2026-09-26 | FHH [đầy đủ] | — |
| Công dụng số một: giảm ma sát kim loại trên đá, chịu áp lực chống kẹt | https://www.incabloc.ch/en/products/stones-sapphires/ | "The main purpose of watch jewels is to minimise the metal's friction on the jewel." | 2026-09-26 | Hãng sản xuất đá Incabloc, HTTP 200 [đầy đủ] | Câu sau: "By withstanding relatively high pressures… help avoid… jamming" |
| Chân kính + endstone giữ giọt dầu ("oil sump") | https://www.incabloc.ch/en/products/shock-absorbers/ | "forms an "oil sump" of optimised shape and size in order to keep the drop of lubricant perfectly centred" | 2026-09-26 | Hãng Incabloc [đầy đủ] | Cấu trúc trong hệ Incabloc |
| Giá đỡ chân kính tháo endstone để tiện bôi dầu | https://www.incabloc.ch/en/products/bushings-bearings/ | "A combined bushing and lyre-spring ® for a removable endstone to facilitate oiling." | 2026-09-26 | Hãng Incabloc [đầy đủ] | Trang ngắn, một câu |

### Không được viết

- "Chân kính dư chỉ là marketing" hoặc "nhiều chân kính là lừa" — không có nguồn trực tiếp — KHÔNG viết.
- Số chân kính của một model cụ thể — KHÔNG viết.
- "Không phán chất lượng qua số chân kính" — bài trả lời bằng vai trò kỹ thuật + số phổ biến 15–21 (có nguồn), không kết luận ngược lại.

### Đề cương Phụ lục B

- Câu trả lời ngắn: chân kính có vai trò kỹ thuật cụ thể (giảm ma sát, giữ dầu); máy chất lượng phổ biến 15–21 chân kính — số lớn hơn không phải thước đo chất lượng theo nguồn có trong hồ sơ.
- Nguồn gốc hiểu lầm: quảng cáo lịch sử thổi số chân kính như chỉ số sang trọng (ghi định tính, không trích).
- Điều thực sự đúng: ba mệnh đề có nguồn trong bảng.
- Chưa thể kết luận: ý nghĩa của số chân kính vượt 21 ở model cụ thể.
- Liên kết đọc thêm: `/tu-dien/chan-kinh/`, `/co-che/chong-soc/`.
- Tóm tắt chia sẻ (<200 ký tự): "Chân kính là ổ trục đá giảm ma sát, giữ dầu cho bộ máy; máy chất lượng phổ biến 15–21 viên. Số lượng nhiều hơn không phải thước đo chất lượng."
- sourceNotes dự kiến: 3 URL bảng claim (FHH jewels + stone; Incabloc stones-sapphires).

### Liên kết đọc thêm (route đã xác nhận trong dist)

`/tu-dien/chan-kinh/`, `/co-che/chong-soc/`, `/co-che/bo-may-in-house/`.

## M2. Đồng hồ cơ có cần đeo mỗi ngày không? — dẫn `/huong-dan/len-day-dong-ho/`

Trạng thái: **SẴN SÀNG**

### Đối chiếu trùng với bài hiện có

- `/huong-dan/len-day-dong-ho/` ("Lên dây cho đồng hồ cơ — từng bước") — thủ tục lên dây; bài "Hiểu đúng" trả lời tần suất đeo, dẫn về.
- `/huong-dan/hop-xoay-dong-ho/` ("Hộp xoay: xác định gì trước khi dùng") — hộp xoay đào sâu ở đó; bài "Hiểu đúng" chỉ dẫn.
- `/co-che/len-day-tu-dong/` — cơ chế rotor; chỉ dẫn.

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| Lên dây tay = núm vặn dùng để lên dây | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/crown-watchmaking | "The winding crown is a knurled or fluted button of various shapes, held between the thumb and forefinger and used to wind the watch." | 2026-09-26 | FHH, HTTP 200 [đầy đủ] | — |
| Rotor quay theo chuyển động cánh tay để tự động lên dây | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/rotor | "A semi-circular disc that freely rotates with each movement of the arm to automatically wind the mainspring." | 2026-09-26 | FHH, HTTP 200 [đầy đủ] | Câu sau: "A specific system multiplies its rotations" |
| Hộp khô chứa dây có (bộ phận tích năng) | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/barrel | "The barrel, which contains the mainspring, turns freely on its arbor." | 2026-09-26 | FHH [đầy đủ] | Trang KHÔNG nêu "đồng hồ dừng khi hết năng lượng" — không trích cho mệnh đề đó |
| Lên dây tự động = rotor quay theo chuyển động cổ tay | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/automatic-self-winding | "a mechanism that winds the mainspring by using the movement of the arm to cause a rotor to rotate" | 2026-09-26 | FHH [đầy đủ] | Câu đầy đủ nêu "via specific gears" |
| Không đeo vài ngày → power reserve giảm → hãng khuyên lên dây tay | https://www.omegawatches.com/en-us/customer-service/faq/using-your-omega-watch | "If your watch hasn't been worn for several days, or if wrist motion is insufficient to maintain optimal winding, the power reserve may fall below its maximum capacity." | 2026-09-26 | Chính hãng — curl bị chặn, WebFetch 200 ×3 + Wayback khớp từng chữ [đầy đủ] | Câu sau: "In such cases, manual winding is recommended." |
| Máy tự động được lên bởi chuyển động cổ tay | https://www.omegawatches.com/en-us/customer-service/faq/using-your-omega-watch | "The winding of a timepiece with an automatic mechanical calibre is powered by the natural movement of the wrist." | 2026-09-26 | Chính hãng [đầy đủ] | — |
| Đầy dây chạy ~45 giờ | https://www.seikowatches.com/instructions/html/SEIKO_8R46_8R48_EN/WMVESYwdvkxzuv | "Once the watch is wound up fully, it operates for about 45 hours." | 2026-09-26 | Chính hãng (hướng dẫn Seiko), HTTP 200 [đầy đủ] | Chỉ calibre 8R46/8R48 — không khái quát |
| Không đeo thì lên dây đủ mỗi ngày vào giờ cố định | https://www.seikowatches.com/instructions/html/SEIKO_8R46_8R48_EN/WMVESYwdvkxzuv | "If the watch is used without being worn on the wrist, be sure to wind it up fully every day at a fixed time." | 2026-09-26 | Chính hãng [đầy đủ] | Khuôn hướng dẫn Seiko |
| Định lượng: đeo 12 giờ/ngày 3–5 ngày liền mới đầy dây | https://www.seikowatches.com/instructions/html/SEIKO_5R65_5R66_EN/BONDSYklwsizxh | "The mainspring of the watch becomes fully wound when the watch is worn for twelve hours per day for three to five consecutive days." | 2026-09-26 | Chính hãng [đầy đủ] | Chỉ calibre 5R65/5R66 (có kim dự trữ năng lượng) |
| Hộp xoay: Omega khuyên dùng cho đồng hồ không đeo | https://www.omegawatches.com/en-us/customer-service/faq/using-your-omega-watch | "We recommend that you use a watch winder from the OMEGA leather goods collection." | 2026-09-26 | Chính hãng [đầy đủ] | Ghi rõ là khuyến nghị có gắn hãng — phần trung lập dẫn về bài hop-xoay |

### Không được viết

- Định nghĩa khái quát "power reserve = thời gian từ khi đầy dây đến khi dừng" — không có mục FHH — KHÔNG viết dạng định nghĩa từ điển; chỉ dùng định lượng Seiko + mệnh đề Omega.
- "Hộp xoay dùng để giữ giờ cho đồng hồ ít đeo" ở dạng trung lập không gắn hãng — chỉ có khuyến nghị Omega — viết ở dạng "theo OMEGA" hoặc dẫn bài hop-xoay.
- Số giờ dự trữ của calibre khác (ngoài 8R46 ~45 giờ, 5R65 ~10 giờ/crown 5 vòng) — KHÔNG viết.

### Đề cương Phụ lục B

- Câu trả lời ngắn: không bắt buộc đeo mỗi ngày; đồng hồ tự động lên dây theo chuyển động cổ tay, không đeo vài ngày thì dự trữ năng lượng giảm và hãng khuyên lên dây tay; các hãng nêu định lượng cụ thể.
- Nguồn gốc hiểu lầm: đồng hồ tự động "sẽ tự lên dây vô tận" / sợ hãi "để yên là hỏng" (định tính).
- Điều thực sự đúng: các mệnh đề có nguồn trong bảng.
- Chưa thể kết luận: tác hại/lợi ích của hộp xoay dài hạn (chỉ có khuyến nghị Omega).
- Liên kết đọc thêm: `/huong-dan/len-day-dong-ho/`, `/huong-dan/hop-xoay-dong-ho/`, `/co-che/len-day-tu-dong/`.
- Tóm tắt chia sẻ (<200 ký tự): "Không cần đeo mỗi ngày: máy tự động lên dây theo cổ tay, nhưng để vài ngày dự trữ sẽ cạn — hãng khuyên lên dây tay, Seiko nêu đeo 12 giờ/ngày để giữ dây căng."
- sourceNotes dự kiến: Omega FAQ + Seiko 8R46/5R65 + FHH automatic/crown/barrel/rotor.

### Liên kết đọc thêm (route đã xác nhận trong dist)

`/huong-dan/len-day-dong-ho/`, `/huong-dan/hop-xoay-dong-ho/`, `/co-che/len-day-tu-dong/`.

## M3. Điện thoại và nam châm có làm đồng hồ cơ chạy sai? — dẫn `/co-che/chong-tu/`

Trạng thái: **SẴN SÀNG**

### Đối chiếu trùng với bài hiện có

- `/co-che/chong-tu/` ("Chống từ — vì sao từ trường làm đồng hồ cơ chạy sai") — cơ chế + chuẩn chống từ đã đào sâu; bài "Hiểu đúng" chỉ trả lời câu hỏi sinh hoạt và dẫn về.
- `/huong-dan/do-sai-so/` — theo dõi sai số; dẫn.

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| Máy Thụy Sĩ có thể bị từ hóa, ảnh hưởng độ chính xác | https://www.oris.ch/en-US/worldoforis/movements/calibre-400 | "Swiss watch movements can magnetise, affecting accuracy." | 2026-09-26 | Chính hãng Oris, HTTP 200 [đầy đủ] | "Swiss watch movements" theo mệnh đề hãng |
| METAS chứng nhận chống từ trong khung Master Chronometer | https://www.metas.ch/metas/en/home/dl/konformitaetsbewertungsstelle-metas-cert/zertifizierung_uhren.html | "essentially covers the water resistance, chronometric performance, resistance to magnetic fields and power reserve of the watches" | 2026-09-26 | Cơ quan chứng nhận Thụy Sĩ — URL gốc redirect lỗi; nguyên văn từ bản lưu Wayback của chính URL, curl 200 [đầy đủ qua bản lưu] | Ghi rõ lấy qua bản lưu Wayback |
| Ngưỡng định lượng 1,5 T = 15.000 gauss (quy trình N001) | https://www.metas.ch/metas/en/home/dl/konformitaetsbewertungsstelle-metas-cert/zertifizierung_uhren.html | "Requirements for certification of movements and mechanical watches resistant to magnetic fields of 1.5 T (15 000 G)" | 2026-09-26 | METAS (tên tài liệu PDF trên trang) [đầy đủ qua bản lưu] | Ngưỡng thuộc quy trình METAS N001 |
| Oris: sau 2.250 gauss lệch dưới 10 giây/ngày, vượt chuẩn ISO 764 | https://www.oris.ch/en-US/worldoforis/movements/calibre-400 | "It deviated less than 10 seconds a day after exposure to 2,250 gauss, surpassing ISO 764 standards." | 2026-09-26 | Chính hãng [đầy đủ] | Số liệu của Calibre 400 |
| Nguồn từ sinh hoạt: loa, tủ lạnh, kẹp túi xách/ốp máy tính bảng | https://www.omegawatches.com/en-us/customer-service/faq/using-your-omega-watch | "avoid exposure to high magnetic fields, such as those produced by loudspeakers, refrigerators, some handbag or tablet case clasps" | 2026-09-26 | Chính hãng [đầy đủ] | KHÔNG có "điện thoại" trong trích — KHÔNG khẳng định điện thoại |
| Omega: máy Master Co-Axial chịu tới 15.000 gauss; máy thường tránh từ trường cao | https://www.omegawatches.com/en-us/customer-service/faq/using-your-omega-watch | "capable of withstanding magnetic fields of up to 15,000 gauss, we recommend that you avoid exposure to high magnetic fields" | 2026-09-26 | Chính hãng [đầy đủ] | Chỉ dòng có Master Co-Axial đạt ngưỡng |
| Định nghĩa thuật ngữ anti-magnetic | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/anti-magnetic | "Describes a watch that is protected against magnetic fields." | 2026-09-26 | FHH [đầy đủ] | Chỉ định nghĩa |

### Không được viết

- "Điện thoại làm đồng hồ cơ chạy sai" — không nguồn nào truy cập được nêu điện thoại (chỉ kẹp ốp máy tính bảng/loa/tủ lạnh) — KHÔNG khẳng định điện thoại; câu hỏi bài chỉ đặt vấn đề.
- Cơ chế chi tiết "linh hồn bị từ hóa nên chạy nhanh/dừng" — không có nguyên văn từ nguồn cho phép — KHÔNG viết.
- Khử từ (demagnetization) — không có nguồn trong phạm vi — KHÔNG viết.
- Nội dung văn bản chuẩn ISO 764 — URL catalogue không xác minh được (URL đề sai) — KHÔNG trích nội dung ISO 764.

### Đề cương Phụ lục B

- Câu trả lời ngắn: từ trường mạnh có thể từ hóa bộ máy và làm sai số tăng (Oris); các hãng nêu nguồn từ sinh hoạt như loa, tủ lạnh, kẹp túi/ốp máy tính bảng; các dòng chống từ được chứng nhận theo ngưỡng cụ thể (METAS 15.000 gauss).
- Nguồn gốc hiểu lầm: quy đồng mọi thiết bị điện tử thành "nam châm mạnh" (định tính).
- Điều thực sự đúng: các mệnh đề có nguồn trong bảng.
- Chưa thể kết luận: mức từ của từng loại điện thoại; tác động thực tế của đặt cạnh điện thoại.
- Liên kết đọc thêm: `/co-che/chong-tu/`, `/huong-dan/do-sai-so/`.
- Tóm tắt chia sẻ (<200 ký tự): "Từ trường mạnh có thể từ hóa bộ máy và làm sai. Hãng khuyên tránh loa, tủ lạnh, kẹp túi từ tính; dòng chống từ đạt chuẩn có ngưỡng công bố rõ."
- sourceNotes dự kiến: Oris calibre 400 + METAS + Omega FAQ + FHH anti-magnetic.

### Liên kết đọc thêm (route đã xác nhận trong dist)

`/co-che/chong-tu/`, `/huong-dan/do-sai-so/`.

## M4. Kính sapphire có thật sự không trầy, không vỡ? — dẫn `/co-che/kinh-dong-ho/`

Trạng thái: **CẦN THU HẸP**

- Nửa "chống trầy" có nguồn chính hãng (Seiko: "resistant to scratches"); nửa "có thể vỡ/mép khi va đập" và độ cứng Mohs 9/chân kính đá tổng hợp/chênh lệch mineral–acrylic CHƯA có câu nguyên văn từ nguồn trong phạm vi được phép (Omega FAQ không có mục kính; Omega glossary 404; TAG không truy cập được; Seiko FAQ không có mục kính).
- Khi có nguồn cho nửa "vỡ" + độ cứng: nâng SẴN SÀNG.

### Đối chiếu trùng với bài hiện có

- `/co-che/kinh-dong-ho/` ("Ba loại và vì sao sapphire không phải luôn tốt nhất") — đã so ba loại kính; bài "Hiểu đúng" chỉ trả lời myth và dẫn về. Nguồn frontmatter hiện có: 1 URL FHH library (material world).
- Bài liên quan trực tiếp: `/huong-dan/chon-dong-ho-dau-tien/` (nhắc kính khi chọn — dẫn).

### Bảng claim (phần đã có nguồn)

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| Kính sapphire cong chống trầy | https://www.seikowatches.com/se-en/news/20210907 | "The glass is a curved sapphire crystal that is resistant to scratches" | 2026-09-26 | Chính hãng Seiko, HTTP 200 [đầy đủ] | "resistant to scratches" — không phải "không bao giờ trầy"; bản gốc dính "to20" do lỗi khoảng trắng của trang |
| Sapphire là vật liệu rất cứng, khó gia công | https://www.hautehorlogerie.org/en/watches-and-culture/library/watchmaking-s-material-world | "given the difficulty of machining a material this hard" | 2026-09-26 | FHH, HTTP 200 [đầy đủ] | Chỉ gián tiếp về độ cứng — không có Mohs 9 |

### Không được viết

- "Sapphire không bao giờ trầy" — nguồn chỉ nói resistant to scratches — KHÔNG viết tuyệt đối.
- "Sapphire vỡ/mép khi va đập" — chưa có nguồn — KHÔNG viết (đây là nửa cốt lõi còn thiếu).
- Mohs 9, corundum/ruby, sapphire tổng hợp, so sánh mineral/acrylic — KHÔNG viết.

### Đề cương Phụ lục B (bản nháp chờ nguồn)

- Câu trả lời ngắn (nháp): sapphire "chống trầy" theo hãng; nửa "vỡ" chưa có nguồn — chờ.
- Liên kết đọc thêm: `/co-che/kinh-dong-ho/`, `/huong-dan/chon-dong-ho-dau-tien/`.
- sourceNotes dự kiến: Seiko news + FHH material world (+ nguồn thứ hai chờ).

### Liên kết đọc thêm (route đã xác nhận trong dist)

`/co-che/kinh-dong-ho/`, `/huong-dan/chon-dong-ho-dau-tien/`.

## M5. Chỉ số chống nước 30 m nghĩa là gì? — dẫn `/huong-dan/muc-chong-nuoc/`

Trạng thái: **SẴN SÀNG**

### Đối chiếu trùng với bài hiện có

- `/huong-dan/muc-chong-nuoc/` ("Mức chống nước: được làm gì, không được làm gì") — bảng mức đã có; bài "Hiểu đúng" trả lời đúng con số 30 m và dẫn về.
- `/co-che/chong-nuoc/` ("Chống nước hoạt động thế nào") — cơ chế gioăng; dẫn.

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| Bảng Seiko: 3 BAR chỉ chấp nhận vảy nước/vô tình dính mưa — không đánh dấu cho bơi | https://www.seikowatches.com/us-en/customerservice/faq/general-information-8 | "refer to the following table to confirm the degree of water resistance of your Seiko watch and the preferable conditions of use" | 2026-09-26 | Chính hãng Seiko, HTTP 200 [đầy đủ] | Cột/bảng: "3BAR" chỉ có × ở cột "Accidental Splashes and Contact with Rain"; trang không ghi "30 m" cạnh 3BAR |
| Chống nước không vĩnh viễn: gioăng lão hóa, va đập ảnh hưởng | https://www.seikowatches.com/us-en/customerservice/faq/general-information-8 | "A watch's water resistance is not permanently guaranteed. It is affected by the ageing of gaskets or deformation of watch parts due to accidental shock." | 2026-09-26 | Chính hãng [đầy đủ] | — |
| Chống nước phụ thuộc gioăng ở crown/nút/kính/vỏ; gioăng lão hóa phải thay định kỳ | https://www.omegawatches.com/en-us/customer-service/faq/using-your-omega-watch | "the water resistance of a watch is ensured by gaskets placed between the crown, the pushers, the crystal, and the watch case" | 2026-09-26 | Chính hãng [đầy đủ] | Câu sau: gioăng lão hóa do nhiệt độ, ô nhiễm, hóa chất |
| Va đập mạnh ảnh hưởng chống nước; tránh bấm nút chronograph dưới nước | https://www.omegawatches.com/en-us/customer-service/faq/using-your-omega-watch | "heavy impacts are known to affect the water resistance and should be avoided." | 2026-09-26 | Chính hãng [đầy đủ] | Câu chronograph pushers là mệnh đề riêng liền sau |
| ISO 22810:2010 — chuẩn chống nước đồng hồ, còn hiện hành (rà soát 2021) | https://www.iso.org/standard/45334.html | "ISO 22810:2010 establishes the requirements and specifies the test methods used to verify the water resistance of watches." | 2026-09-26 | ISO — live 403; catalogue + abstract qua bản lưu Wayback, curl 200 [đầy đủ qua bản lưu] | Chỉ title + abstract; toàn văn có phí — KHÔNG suy điều kiện kỹ thuật |

### Mâu thuẫn nguồn bắt buộc xử lý trung thực

- **Omega FAQ viết NGƯỢC tiền đề phổ biến**: "an OMEGA watch that is water resistant to 30 metres can be worn for swimming at depths of up to 30 metres underwater" (xác minh 2 nguồn: live + Wayback, khớp từng chữ). Bài "Hiểu đúng" KHÔNG được trích Omega cho mệnh đề "30 m không được bơi"; trình bày trung thực: Seiko bảng 3BAR không chấp nhận bơi, trong khi Omega có cách diễn đạt khác cho dòng mình — mỗi mệnh đề kèm đúng nguồn hãng.
- Bảng 30/50/100 m theo hoạt động như trong đề bài KHÔNG tồn tại trên trang Omega — KHÔNG trích.

### Không được viết

- Quy đổi chung "30 m = có thể lặn 30 m" hoặc "30 m = chỉ rửa tay" như quy tắc tuyệt đối cho mọi hãng — KHÔNG viết (đề cấm; hai hãng diễn đạt khác nhau).
- "Số mét là áp suất tĩnh thử nghiệm" — không có nguyên văn từ nguồn cho phép — KHÔNG viết.
- Chi tiết nội dung ISO 22810 ngoài title/abstract — toàn văn trả phí — KHÔNG viết.

### Đề cương Phụ lục B

- Câu trả lời ngắn: con số chống nước là kết quả thử nghiệm theo điều kiện của hãng/tiêu chuẩn, không phải bảo chứng cho mọi tình huống; bảng Seiko: 3 BAR chỉ cho vảy nước/mưa; gioăng lão hóa và va đập làm giảm khả năng chống nước (Seiko/Omega).
- Nguồn gốc hiểu lầm: quy đổi tuyến tính mét ↔ hoạt động (định tính).
- Điều thực sự đúng: các mệnh đề có nguồn trong bảng + ghi nhận mâu thuẫn Omega–Seiko một cách trung thực.
- Chưa thể kết luận: ý nghĩa pháp lý/kỹ thuật chi tiết của "30 m" theo ISO (toàn văn có phí).
- Liên kết đọc thêm: `/huong-dan/muc-chong-nuoc/`, `/co-che/chong-nuoc/`.
- Tóm tắt chia sẻ (<200 ký tự): "30 m không phải 'lặn sâu 30 m': bảng Seiko chỉ cho 3 BAR dùng ở vảy nước/mưa; gioăng lão hóa và va đập đều làm giảm khả năng chống nước."
- sourceNotes dự kiến: Seiko general-information-8 + ISO 22810 catalogue + Omega FAQ (gioăng/va đập; ghi chú mâu thuẫn).

### Liên kết đọc thêm (route đã xác nhận trong dist)

`/huong-dan/muc-chong-nuoc/`, `/co-che/chong-nuoc/`.

## Bảng chống trùng tổng hợp 5 chủ đề

| # | Chủ đề | Trùng chính | Mức | Xử lý |
|---|--------|-------------|-----|-------|
| 1 | Chân kính | tuDien/chan-kinh + chong-soc + bo-may-in-house | Định nghĩa/cơ chế | SẴN SÀNG — bài Hiểu đúng chỉ dẫn lại |
| 2 | Đeo mỗi ngày | len-day-dong-ho + hop-xoay + len-day-tu-dong | Thủ tục/cơ chế | SẴN SÀNG — dẫn |
| 3 | Nam châm | chong-tu + do-sai-so | Cơ chế/chuẩn | SẴN SÀNG — dẫn |
| 4 | Kính sapphire | kinh-dong-ho (ba loại) + chon-dong-ho-dau-tien | So sánh loại kính | CẦN THU HẸP — chờ nguồn nửa "vỡ" |
| 5 | Chống nước 30 m | muc-chong-nuoc + chong-nuoc | Bảng mức/cơ chế | SẴN SÀNG — dẫn; ghi mâu thuẫn Omega–Seiko |

## URL không làm nguồn (hỏng/chặn/rỗng/sai)

- Shell rỗng (FHH glossary): https://www.hautehorlogerie.org/en/watches-and-culture/encyclopaedia/glossary-of-watchmaking/s/jewel-1/ — 74 byte redirect; web_reader trả cache legacy không xác minh được trên trang live — không dùng.
- URL đề SAI (đã xác minh nội dung khác chuẩn): https://www.iso.org/standard/34536.html — thực chất là ISO/TS 10303-25:2005 (tự động hóa công nghiệp), KHÔNG phải ISO 764; nội dung ISO 764 chưa xác minh được trên iso.org (403).
- HTTP 404: https://www.omegawatches.com/en-us/glossary — Omega glossary không tồn tại.

## Claim bị loại hoặc chờ nguồn (tổng hợp)

1. Chủ đề 1: "chân kính dư chỉ là marketing" / đánh giá model qua số chân kính — KHÔNG viết.
2. Chủ đề 2: định nghĩa khái quát power reserve dạng từ điển; hộp xoay trung lập không gắn hãng — KHÔNG viết.
3. Chủ đề 3: "điện thoại làm chạy sai"; cơ chế chi tiết từ hóa; khử từ; nội dung ISO 764 — KHÔNG viết.
4. Chủ đề 4: "không bao giờ trầy"; "có thể vỡ/mép"; Mohs 9; mineral/acrylic — KHÔNG viết (nửa "vỡ" là lý do CẦN THU HẸP).
5. Chủ đề 5: quy đổi tuyến tính mét ↔ hoạt động như quy tắc chung; "áp suất tĩnh thử nghiệm"; nội dung ISO 22810 ngoài abstract — KHÔNG viết.
6. Toàn hồ sơ: không giá, đầu tư, hàng xách tay, thuế, giấy tờ nhập khẩu.

## Giới hạn công cụ cần GPT Work lưu ý

- Omega FAQ: curl bị chặn từ môi trường (HTTP 000) — WebFetch 200 ×3 + Wayback snapshot khớp từng chữ; allowlist R4 ghi ngoại lệ lỗi-mạng cho đúng URL này.
- METAS: URL gốc redirect lỗi (header dị dạng) — web_reader trang sống + nguyên văn từ bản lưu Wayback của chính URL (curl 200); allowlist ghi mã Node trả về.
- ISO 22810: live 403 — catalogue + abstract qua bản lưu Wayback (curl 200); allowlist mã 403.
- ISO 34536 (đề nêu cho ISO 764): URL sai — đã xác minh 2 nguồn; không-làm-nguồn.

## Kiểm định đã chạy trong phiên

- Checker `output/u2-myths-source-audit/kiem-u2.mjs` (env U2_ROOT/U2_DIST_ROOT cho phép thử ngoài cây): đủ 5 chủ đề + trạng thái; tổng cứng 4 SẴN SÀNG / 1 CẦN THU HẸP / 0 / 0; R2c mỗi chủ đề SẴN SÀNG ≥2 URL nguồn trong khối; 19 URL nguồn + 3 không-làm-nguồn (kiểm cứng R3d); truy cập lại URL nguồn (2xx, hoặc đúng ngoại lệ allowlist hẹp theo từng URL + mã + bằng chứng ghi trong hồ sơ; lỗi mạng/timeout ngoài allowlist luôn FAIL); mọi route nội bộ tồn tại trong dist (11 route đề + route đọc thêm); bảng chống trùng 5 dòng + đồng bộ trạng thái với chi tiết; 2 tệp docs UTF-8 no BOM + newline cuối.
- Mutation ngoài repo: bỏ URL nguồn khỏi một chủ đề SẴN SÀNG xuống còn 1 → checker phải fail đúng điều kiện số nguồn; hoàn nguyên byte-đối-byte rồi chạy lại đạt.
- `node scripts/scan-chars.mjs`, `git diff --check`, `git diff --cached --check` — xem biên bản.
- Không chạy `npm run check`/`npm run build`: U2 chỉ tạo hồ sơ/bằng chứng, không đụng `src/`, `public/`, `scripts/`, `package.json` — build/check không phản ánh thay đổi tài liệu.
