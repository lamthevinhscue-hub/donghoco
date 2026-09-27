# T4 — Hồ sơ nguồn 18 ứng viên từ điển, đợt mở rộng 2

- Giao dịch: TXN-20260926-296, danh mục DHC-GD3-20260925, gói T4
- Tính chất: HỒ SƠ NGUỒN trước khi viết — chưa phải lượt tạo hay sửa bài từ điển. Không tệp src/, scripts/, package.json nào được đụng.
- Ngày truy xuất nguồn: 2026-09-25 (đồng hồ môi trường tra cứu; tên tệp đặt theo giao dịch 2026-09-27). Hồ sơ nguồn kế thừa P0-D1 (output/p0-d1-glossary-source-audit/) cho lệch nhịp, lực không đổi, pha trăng và đối chiếu lại bằng fetch mới.
- Phương pháp: curl với UA trình duyệt + web_reader cho PDF lớn; FHH là SPA — chỉ tính mục "có" khi trang chứa nội dung thật (stub rỗng 74 byte không có thẻ title). Bằng chứng thô: output/t4-glossary-source-audit/tra-cuu-fhh.md, tra-cuu-hang.md, tra-cuu-hoan-thien.md, tra-cuu-bo-tro.md.
- Cấm nguồn: miền bách khoa mở, wiki cộng đồng, blog, cửa hàng/đấu giá, snippet tìm kiếm, nội dung AI. Không tự dịch thuật ngữ khi chưa có chứng cứ.

## 1. Bảng 18 mục

| # | Tên Việt dự kiến | Thuật ngữ EN tham khảo | Category | Trạng thái |
|---|---|---|---|---|
| 1 | Bộ truyền động bánh răng | gear train | bộ máy | SẴN SÀNG |
| 2 | Bộ lên dây và chỉnh giờ | winding and setting (keyless, theo cách gọi của Patek) | bộ máy | SẴN SÀNG |
| 3 | Bộ kim | hands | bộ máy | SẴN SÀNG |
| 4 | Cần chỉnh nhanh chậm | index-assembly (theo Patek; "regulator" trùng nghĩa khác) | độ chính xác và điều chỉnh | CẦN THU HẸP |
| 5 | Bánh lắc tự do | free-sprung balance (chưa có nguồn dùng cụm) | độ chính xác và điều chỉnh | CHƯA ĐỦ NGUỒN |
| 6 | Dây tóc Breguet | Breguet overcoil | độ chính xác và điều chỉnh | CHƯA ĐỦ NGUỒN |
| 7 | Máy nền | ébauche | bộ máy | CẦN THU HẸP |
| 8 | Dừng giây | stop seconds (chỉ như mô tả hành vi kim giây) | bộ máy | SẴN SÀNG |
| 9 | Đánh bóng gương | mirror polish / black polish | hoàn thiện | SẴN SÀNG |
| 10 | Tráng men | enamel | hoàn thiện | SẴN SÀNG |
| 11 | Chạm khắc | engraving | hoàn thiện | SẴN SÀNG |
| 12 | Khảm | marquetry | hoàn thiện | CHƯA ĐỦ NGUỒN |
| 13 | Swiss Made | Swiss Made | chứng nhận | GỘP/TRỎ |
| 14 | Lệch nhịp | beat error | độ chính xác và điều chỉnh | CHƯA ĐỦ NGUỒN |
| 15 | Lực không đổi | constant force | bộ máy | SẴN SÀNG |
| 16 | Pha trăng | moon phase | phức tạp chức năng | CHỜ QUYẾT |
| 17 | Mặt số đổi màu theo thời gian | tropical dial | thiết kế | CHƯA ĐỦ NGUỒN |
| 18 | Dây đeo kiểu NATO | NATO strap | thiết kế | CHƯA ĐỦ NGUỒN |

## 2. Tổng kết (tính từ Bảng 18 mục)

| Trạng thái | Số mục |
|---|---|
| SẴN SÀNG | 8 |
| CẦN THU HẸP | 2 |
| GỘP/TRỎ | 1 |
| CHỜ QUYẾT | 1 |
| CHƯA ĐỦ NGUỒN | 6 |

Không ép số mục SẴN SÀNG: chỉ mục nào đủ bằng chứng mới được mở ở lượt viết tiếp theo; tổng kết do checker đối chiếu từng dòng chi tiết.

## 3. Bảng bằng chứng nguồn

Mỗi trích tối đa 25 từ (đếm token của cả ô sau khi bỏ escape Markdown); phần
rút ghi bằng dấu "..." — nguyên văn đầy đủ nằm trong các tệp tra cứu ở
output/t4-glossary-source-audit/; diễn giải nằm ngoài cột trích.

| Mục | Tổ chức | URL | Ngày | Trích nguyên văn (ngắn) |
|---|---|---|---|---|
| 1 | FHH | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/gear-train | 2026-09-25 | "A system for transmitting power and motion through toothed wheels. In a watch, the train comprises a wheel whose teeth mesh with a pinion's leaves." |
| 1 | Patek Philippe | https://www.patek.com/en/glossary | 2026-09-25 | "Set of wheels driven in an interdependent movement. The gear-train generally called the going train is the one that transmits energy..." (mục Gear-train) |
| 2 | Patek Philippe | https://www.patek.com/en/glossary | 2026-09-25 | "The winding mechanism of manually wound movements is operated by the crown. The system was developed by Jean-Adrien Philippe in 1842..." (mục Winding mechanism) |
| 2 | Grand Seiko | https://www.grand-seiko.com/instructions/html/GS_9S_en/AGFISYcttdhtbn.html | 2026-09-25 | "Slowly turn the crown clockwise (12 o'clock direction) to wind the mainspring." |
| 2 | Omega | https://media.omegawatches.com/documents/manuals/31032425004001_User_Manual_EN.pdf | 2026-09-25 | "Crown, 2 positions:" + "1. Manual winding — Turn the crown forward until it stops to wind manually (DO NOT FORCE)." |
| 3 | FHH | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/hand | 2026-09-25 | "A variously shaped indicator made from a thin piece of lightweight metal and which moves round a dial, with or without graduations." |
| 3 | Patek Philippe | https://www.patek.com/en/glossary | 2026-09-25 | "Metal part which points to various indications on the dial." (mục Hand) + "the motion-work ... drives the hour, minute and seconds hands." |
| 4 | FHH | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/balance-spring | 2026-09-25 | "Its length can be altered to regulate the watch." |
| 4 | Patek Philippe | https://www.patek.com/en/glossary | 2026-09-25 | "Traditional system for adjusting the balance and spring assembly." (mục Index-assembly) |
| 5 | FHH | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/balance | 2026-09-25 | "A circular mass (rim) held by spokes. Combined with the spiral it forms the regulating organ of the watch." — không nhắc free-sprung |
| 5 | Patek Philippe | https://www.patek.com/en/glossary | 2026-09-25 | "The Gyromax balance and spring assembly ... replaces the traditional index-assembly or regulator-assembly system." — không có cụm "free-sprung" |
| 6 | FHH | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/breguet-overcoil | 2026-09-25 | "Sometimes referred to as a \"Breguet spiral\" it controls the rate at which the mainspring unwinds." — một câu duy nhất, nói mainspring (CAN-KIEM-CHUNG) |
| 7 | FHH | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/ebauche | 2026-09-25 | "The modern ébauche is a watch movement, with or without jewels but always without its regulating organ, mainspring, dial and hands..." |
| 8 | Grand Seiko | https://www.grand-seiko.com/instructions/html/GS_9S_en/AGFISYcttdhtbn.html | 2026-09-25 | "Pull out the crown when the seconds hand is at the 12 o'clock position. (The seconds hand stops.)" |
| 8 | Omega | https://media.omegawatches.com/documents/manuals/31032425004001_User_Manual_EN.pdf | 2026-09-25 | "Pull the crown out to position 2 and the seconds hand will stop." |
| 9 | FHH | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/decorating-and-engraving-the-movement | 2026-09-25 | "mirror polishing, regarded as the most difficult technique, imparts a bright sheen to the metal;" |
| 9 | Patek Philippe | https://www.patek.com/en/glossary | 2026-09-25 | "Also known as poli miroir or poli noir. ... true mirror polishing is always done by hand..." (mục Mirror polishing) |
| 9 | A. Lange & Söhne | https://www.alange-soehne.com/eu-en/manufacture/art-of-watchmaking/finishing-and-engraving | 2026-09-25 | "Only very few and select parts are decorated with the intricate black polishing technique. This process can take several days." |
| 10 | FHH | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/enamel | 2026-09-25 | "A vitreous substance whose main component is silica mixed with oxides (transition metals) that create a vast palette of colours." |
| 10 | Patek Philippe | https://www.patek.com/en/glossary | 2026-09-25 | "Once dry, the piece is fired in a kiln at temperatures of around 850°C, so that the powdered glass or pigment melts..." (mục Enameling) |
| 10 | A. Lange & Söhne | https://www.alange-soehne.com/eu-en/manufacture/art-of-watchmaking/the-art-of-enamelling | 2026-09-25 | "The piece is then fired briefly at a temperature of several hundred degrees in a special kiln." |
| 11 | FHH | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/decorating-and-engraving-the-movement | 2026-09-25 | "Some parts are chased or engraved by hand. With extraordinary virtuosity, the engraver incises the metal to create patterns..." |
| 11 | Patek Philippe | https://www.patek.com/en/glossary | 2026-09-25 | "A deeply creative skill where aesthetically pleasing shapes and flourishes are etched on cases and dials." (mục Engraving) |
| 12 | Patek Philippe | https://www.patek.com/en/manufacture/artisans-of-time/marquetry | 2026-09-25 | "The marquetry artisan, with a palette of up to 130 species of wood in 60 to 70 natural hues, delicately cuts, assembles..." |
| 13 | Website nội bộ | https://www.kienthucdonghoco.vn/huong-dan/swiss-made | 2026-09-25 | Bài hướng dẫn Swiss Made hiện có (cặp VI-EN), kiểm tồn tại trong dist ngày 25/09 — cơ sở gộp/trỏ |
| 14 | Witschi | https://www.witschi.com/en/products/chronomaster-auto/ | 2026-09-25 | "Beat error 0 … 9.9 ms ± 0.1 ms" — chỉ chứng minh là thông số đo của máy (từ P0-D1) |
| 15 | A. Lange & Söhne | https://www.alange-soehne.com/eu-en/timepieces/selections/the-constant-force-escapement | 2026-09-25 | "This mechanism delivers a constant amount of energy to the balance of a mechanical watch, regardless of whether it is fully wound or nearly unwound." |
| 15 | Ferdinand Berthoud | https://www.ferdinandberthoud.ch/en/newsletter/newsletter-chronometre-fb-1-2-3.html | 2026-09-25 | "The latter serves to deliver constant force to the escapement, a guarantee of isochronism throughout the running time of the movement..." |
| 16 | Website nội bộ | https://www.kienthucdonghoco.vn/co-che/pha-trang | 2026-09-25 | Bài cơ chế pha trăng hiện có (cặp VI-EN) — cơ sở giữ trạng thái chờ quyết |
| 17 | FHH | https://www.hautehorlogerie.org/en/watches-and-culture/library/the-quirky-backstory-of-tropical-dials | 2026-09-25 | "In the mid-20th century, dial lacquers and pigments weren't always UV-resistant or perfectly stable." — bài biên tập, không phải mục từ điển |

## 4. Bảng chống trùng

| Mục | Ứng viên (slug đề xuất) | Route VI/EN liên quan | Trùng khái niệm | Phương án |
|---|---|---|---|---|
| 1 | bo-truyen-dong-banh-rang | /co-che/chuyen-dong-co ↔ /en/mechanisms/how-a-mechanical-watch-works/ | bài khái quát luồng năng lượng có nêu bánh răng | mới |
| 2 | bo-len-day-va-chinh-gio | /co-che/len-day-tu-dong ↔ /en/mechanisms/automatic-winding/ ; /huong-dan/len-day-dong-ho ↔ /en/guides/winding-a-mechanical-watch/ | bài tự động là một nhánh, guide là thao tác | thu hẹp |
| 3 | bo-kim | /tu-dien/kim-hoi ↔ /en/glossary/retrograde/ | cùng chữ "kim", khác khái niệm | mới |
| 4 | can-chinh-nhanh-cham | /tu-dien/dieu-chinh-theo-vi-tri ↔ /en/glossary/adjustment-in-positions/ | cùng chủ đề điều chỉnh; trùng tên EN với nghĩa khác | thu hẹp |
| 5 | banh-lac-tu-do | /tu-dien/day-toc-banh-lac ↔ /en/glossary/hairspring/ | cùng cụm bánh lắc | không mở |
| 6 | day-toc-breguet | /tu-dien/day-toc-banh-lac ↔ /en/glossary/hairspring/ | trùng khái niệm dây tóc | không mở |
| 7 | may-nen | /co-che/ebauche-chuoi-cung-ung ↔ /en/mechanisms/ebauche-supply-chain/ | trùng khái niệm ébauche | gộp/trỏ |
| 8 | dung-giay | /co-che/hien-thi-ngay ↔ /en/mechanisms/date-display/ | cùng phần chỉnh giờ | mới |
| 9 | danh-bong-guong | /tu-dien/vat-canh ↔ /en/glossary/anglage/ ; /huong-dan/hoan-thien-thu-cong-dong-ho ↔ /en/guides/movement-finishing/ | cùng chủ đề hoàn thiện | mới |
| 10 | trang-men | (không có) | không trùng | mới |
| 11 | cham-khac | /tu-dien/guilloche ↔ /en/glossary/guilloche/ | guilloché được xếp là một kiểu chạm khắc | thu hẹp |
| 12 | kham | (không có) | không trùng | không mở |
| 13 | swiss-made | /huong-dan/swiss-made ↔ /en/guides/swiss-made/ | trùng hoàn toàn với bài hướng dẫn | gộp/trỏ |
| 14 | lech-nhip | /tu-dien/bien-do ↔ /en/glossary/amplitude/ | cùng cụm thông số đo trên máy Witschi | không mở |
| 15 | luc-khong-doi | /tu-dien/tinh-dang-thoi ↔ /en/glossary/isochronism/ | Berthoud gắn lực không đổi với đẳng thời | mới |
| 16 | pha-trang | /co-che/pha-trang ↔ /en/mechanisms/moon-phase/ | trùng hoàn toàn với bài cơ chế | không mở |
| 17 | mat-so-tropical | /mau-iconic/rolex-submariner ↔ /en/iconic-watches/rolex-submariner/ | ví dụ tropical hay nhắc trong bài mẫu | không mở |
| 18 | day-nato | (không có) | không trùng | không mở |

Route đích gộp/trỏ đã kiểm tồn tại trong dist ngày 25/09: /co-che/ebauche-chuoi-cung-ung, /en/mechanisms/ebauche-supply-chain/, /huong-dan/swiss-made, /en/guides/swiss-made/, /co-che/pha-trang, /en/mechanisms/moon-phase/ — đủ cả sáu.

## 5. Chi tiết từng mục

### 1. Bộ truyền động bánh răng (gear train) — SẴN SÀNG
Claim được phép: định nghĩa hệ bánh răng truyền lực và chuyển động (FHH); bộ truyền chính điển hình là bộ truyền năng lượng và chia thời, gồm bánh giờ, bánh phút, bánh giây (theo Patek, dùng "going train").
Cấm viết: không gán "going train" cho FHH (nguồn không dùng cụm); không liệt kê cặp bánh cụ thể ngoài nguồn; không nói hiệu suất/trọng số.
Giới hạn nguồn: hai nguồn định nghĩa; không cho lịch sử hay hình vẽ chi tiết.

### 2. Bộ lên dây và chỉnh giờ (winding and setting, keyless) — SẴN SÀNG
Claim được phép: cơ cấu được vận hành từ núm vặn để lên dây và chỉnh giờ; núm có các vị trí (Patek 240: vị trí 1 lên dây, vị trí 2 chỉnh giờ; Omega: 2 vị trí); lịch sử theo Patek: Jean-Adrien Philippe phát minh hệ lên dây và chỉnh giờ không khóa năm 1842 thay cho chìa khóa.
Cấm viết: không dùng cụm tiếng Anh "keyless works" như thuật ngữ có nguồn riêng (nguồn chỉ ghi "keyless winding and time setting system" của Patek); không mô tả bánh viếc/bánh cót bên trong (không nguồn nêu); không khái quát số vị trí núm của mọi đồng hồ.
Giới hạn nguồn: định nghĩa cấu trúc là của một tổ chức (Patek); thao tác là của GS và Omega.

### 3. Bộ kim (hands) — SẴN SÀNG
Claim được phép: kim là chỉ thị mỏng, nhẹ, quay quanh mặt số; phần lớn đồng hồ có ba kim giờ-phút-giây (FHH); các dáng kim phổ biến (Patek: dauphine, Breguet, lá, que...); kim được dẫn quay bởi bộ truyền kim (motion-work) (theo Patek).
Cấm viết: không nêu cấu tạo ống gắn kim chi tiết ngoài motion-work/cannon-pinion của Patek; không lịch sử Daniel Quare/circa 1764 (FHH có nhắc nhưng chưa đủ hai nguồn khi viết — cân nhắc bỏ hoặc đối chiếu thêm trước khi dùng).
Giới hạn nguồn: FHH không nói cơ cấu gắn kim; Patek không nói lịch sử.

### 4. Cần chỉnh nhanh chậm (index-assembly) — CẦN THU HẸP
Claim được phép: chỉnh tốc độ bằng cách thay đổi chiều dài hiệu dụng của dây tóc (FHH balance-spring); hệ chỉnh truyền thống trên tổ hợp bánh lắc-dây tóc gọi là index-assembly (theo Patek), nay hãng này thay bằng Gyromax.
Cấm viết: KHÔNG được dùng mục "regulator" của FHH làm nguồn (đó là đồng hồ Regulator chia tách kim, nghĩa khác — đã đối chiếu nguyên văn); không dùng từ "regulator" như tên Việt của mục khi viết; không mô tả chân thay đổi quãng vận hành (kidney/pinson) vì không nguồn.
Giới hạn nguồn: hai nguồn hai tổ chức nhưng không nguồn nào dùng đúng cụm "cần chỉnh nhanh chậm" — khi viết chỉ diễn đạt theo câu gốc của nguồn.

### 5. Bánh lắc tự do (free-sprung) — CHƯA ĐỦ NGUỒN
Claim được phép: chưa mở.
Cấm viết: mọi dạng; cụm "free-sprung" không có nguồn công bố nào trong số đã đọc (FHH balance không nhắc; Patek chỉ mô tả Gyromax/index-assembly gián tiếp).
Giới hạn: hai nguồn hiện có chỉ chứng minh khái niệm bánh lắc và hệ chỉnh quán tính — đủ để sau này CẦN THU HẸP nếu tìm thêm nguồn dùng đúng cụm; hiện không mở.

### 6. Dây tóc Breguet (Breguet overcoil) — CHƯA ĐỦ NGUỒN
Claim được phép: chưa mở.
Cấm viết: mọi dạng. Nguồn duy nhất (FHH breguet-overcoil) chỉ một câu và nói "controls the rate at which the mainspring unwinds" — mô tả lệch với đối tượng (dây tóc, không phải cót chính); câu này ghi CAN-KIEM-CHUNG, không được trích khi viết.
Giới hạn: cần nguồn thứ hai mô tả đường cong cuối dây tóc nâng lên; ứng viên chưa thử: trang balance-spring của Lange (thấy trong sitemap).

### 7. Máy nền (ébauche) — CẦN THU HỆP
Claim được phép: định nghĩa ébauche theo FHH: bộ máy chưa hoàn thiện được bán ở dạng đó; ébauche hiện đại không có tổ hợp điều chỉnh, cót chính, mặt số, kim; còn gọi blanc roulant.
Cấm viết: không mở rộng lịch sử trước 1850 khi chưa có nguồn thứ hai; không suy thành định nghĩa chung ngoài FHH; mục (nếu mở) chỉ dạng ngắn dẫn bài cơ chế ebauche-chuoi-cung-ung.
Giới hạn nguồn: một nguồn định nghĩa; chống trùng: bài cơ chế VI+EN đã phủ chủ đề — phương án gộp/trỏ.

### 8. Dừng giây (stop seconds) — SẴN SÀNG
Claim được phép: nhiều đồng hồ cơ dừng kim giây khi kéo núm ra để chỉnh giờ (GS: kéo núm khi kim giây chỉ 12 giờ, kim giây dừng; Omega: kéo núm ra vị trí 2, kim giây dừng); tiện đồng bộ theo tín hiệu giờ (GS: đẩy núm về theo tín hiệu giờ).
Cấm viết: không dùng từ "hacking" như thuật ngữ (không nguồn nào trong hai tài liệu dùng); không khái quát "mọi đồng hồ"; không nói cơ cấu bên trong.
Giới hạn nguồn: hai tài liệu hướng dẫn của hai hãng — mô tả thao tác, không định nghĩa thuật ngữ.

### 9. Đánh bóng gương (mirror / black polish) — SẴN SÀNG
Claim được phép: kỹ thuật đánh bóng gương được coi là khó nhất (FHH); Patek gọi thêm poli miroir/poli noir, mô tả mài trên tấm kẽm phẳng với bột kim cương, một phía soi gương một phía đen mờ; Lange mô tả black polishing trên tấm thiếc, phần ít và chọn lọc.
Cấm viết: không khẳng định "luôn làm tay" ngoài trích của Patek; không nói mọi bộ máy cao cấp đều có; không tự suy quy trình.
Giới hạn nguồn: ba tổ chức độc lập; tên gọi tiếng Anh nhiều hình thức — khi viết chọn theo từng nguồn.

### 10. Tráng men (enamel) — SẴN SÀNG
Claim được phép: men là chất thủy tinh hóa từ silica và ôxít kim loại để trang trí kim loại (FHH); nung trong lò để bám vào nền kim loại (Patek: quanh 850°C; Lange: vài trăm độ, nung lặp lại nhiều lần); các kỹ thuật trơn, champlevé, cloisonné được cả FHH lẫn Patek nhắc.
Cấm viết: "Grand Feu" chỉ ghi theo Patek (FHH không dùng); không lấy nhiệt độ 850°C làm chuẩn chung (đó là số của Patek); không kể lịch sử 3.500 năm ngoài trích Lange.
Giới hạn nguồn: ba tổ chức; quy trình chi tiết theo từng hãng.

### 11. Chạm khắc (engraving) — SẴN SÀNG
Claim được phép: một số chi tiết được chạm khắc tay; người thợ dùng burin/graver khắc hoa văn trên vỏ, mặt số, chi tiết bộ máy (FHH + Patek); guilloché là một kiểu chạm khắc bằng máy tiện (theo Patek).
Cấm viết: không xếp mọi guilloché là chạm khắc tay; không nêu repoussé/ramolayé khi chưa cần thiết (Patek có nhắc, chỉ dùng khi viết sâu và trích đúng); không suy mức độ hiếm.
Giới hạn nguồn: ba tổ chức; ranh giới với guilloché phải nêu rõ khi viết (phương án thu hẹp).

### 12. Khảm (marquetry) — CHƯA ĐỦ NGUỒN
Claim được phép: chưa mở.
Cấm viết: mọi dạng. Chỉ một tổ chức (trang nghề nghiệp Patek, giọng giới thiệu); chưa có nguồn từ điển độc lập.
Giới hạn: nếu sau này tìm được nguồn thứ hai (bảo tàng/tổ chức), mục chỉ được thu hẹp theo khảm gỗ.

### 13. Swiss Made — GỘP/TRỎ
Claim được phép: không mở bài từ điển độc lập.
Cấm viết: mọi dạng bài mới; chủ đề đã có bài hướng dẫn VI-EN (/huong-dan/swiss-made ↔ /en/guides/swiss-made/, kiểm trong dist 25/09). Nếu biên tập muốn mục từ điển, chỉ chấp nhận mục ngắn dẫn sang bài đó — để lượt viết quyết định theo phương án gộp/trỏ.
Giới hạn nguồn: bằng chứng là bài hiện có trong repo và route tồn tại trong dist.

### 14. Lệch nhịp (beat error) — CHƯA ĐỦ NGUỒN
Claim được phép: chưa mở.
Cấm viết: mọi dạng. Chỉ có máy đo Witschi hiển thị đại lượng (hai URL cùng một tổ chức, không định nghĩa); FHH không có mục; nguồn tổ chức/bảo tàng độc lập không tìm thấy; luận án đại học có dùng thuật ngữ nhưng không trích được nguyên văn từ nguồn gốc.
Giới hạn: P0-D1 kết luận không đổi; đợt này đã thử lại glossary của nhà chế tạo máy đo (404/SSL) và các hướng tổ chức — đều không đạt.

### 15. Lực không đổi (constant force) — SẴN SÀNG
Claim được phép: mục tiêu cấp năng lượng không đổi cho bánh lắc/bộ thoát bất kể trạng thái lên dây (Lange); một cách công bố là lò xo remontoir nạp lại theo khoảng ngắn (Lange); cách công bố khác là truyền động tua-bin dây và xích treo (Berthoud: deliver constant force, gắn với đẳng thời và trữ cót 53 giờ của mẫu).
Cấm viết: không khái quát "cơ chế lực không đổi" thành một loại duy nhất; không nêu mốc thời gian phát minh; không suy hiệu quả đo lường được.
Giới hạn nguồn: hai hãng hai cách tiếp cận — khi viết phải tách bạch theo từng nguồn; nâng trạng thái so với P0-D1 (trước đó 1 nguồn) nhờ đủ câu Berthoud.

### 16. Pha trăng (moon phase) — CHỜ QUYẾT
Claim được phép: chưa mở; giữ nguyên trạng thái chờ quyết định.
Cấm viết: mọi dạng cho đến khi có quyết định; không tự mở bài mới dù nguồn đã sẵn từ P0-D1 (FHH + Patek) vì trùng hoàn toàn bài cơ chế pha trăng VI-EN (/co-che/pha-trang ↔ /en/mechanisms/moon-phase/, kiểm trong dist 25/09).
Giới hạn nguồn: quyết định biên tập đang chờ, không phải vấn đề nguồn.

### 17. Mặt số đổi màu theo thời gian (tropical dial) — CHƯA ĐỦ NGUỒN
Claim được phép: chưa mở.
Cấm viết: mọi dạng. Hai slug encyclopedia của FHH đều rỗng; nguồn duy nhất fetch được là bài biên tập kể chuyện của FHH (library) — mô tả đúng hiện tượng nhưng một nguồn và không phải mục từ điển; không có trang bảo tàng định nghĩa.
Giới hạn: nếu sau này có nguồn thứ hai, viết theo hiện tượng lão hóa lớp phủ và ghi rõ theo nguồn; các ví dụ mẫu nổi tiếng trong bài FHH không được trích như số liệu.

### 18. Dây đeo kiểu NATO (NATO strap) — CHƯA ĐỦ NGUỒN
Claim được phép: chưa mở.
Cấm viết: mọi dạng. Không fetch được tài liệu chính phủ gốc (cổng Bộ Quốc phòng Anh yêu cầu đăng nhập; kho lưu trữ quốc gia chặn truy cập tự động và không có bản chụp dự phòng); mirror bên thứ ba fetch được nhưng không trích được văn bản và không phải nguồn chính thức; bảo tàng không có trang liên quan.
Giới hạn: mọi nội dung hiện có trên mạng về nguồn gốc dây NATO đều từ cửa hàng/cộng đồng — không đạt chuẩn hồ sơ; nếu sau này tài liệu chuẩn quốc phòng công khai được trích nguyên văn, mới xem xét mở lại.

## 6. Lưu ý cho lượt viết tiếp theo

- Chỉ mục SẴN SÀNG được mở; mục CẦN THU HẸP phải bám đúng giới hạn đã ghi; mục GỘP/TRỎ và CHỜ QUYẾT không tự mở.
- Tên Việt và slug trong bảng chống trùng là đề xuất biên tập, quyết cuối cùng ở lượt viết; route đích gộp/trỏ đã kiểm trong dist.
- Trích dẫn tiếng Anh giữ nguyên văn kể cả lỗi chính tả của nguồn (đã ghi chú tại từng mục khi cần).
