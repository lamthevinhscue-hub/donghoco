# Hồ sơ dữ liệu tiến hóa Jaeger-LeCoultre Reverso — I4

Mục đích: hồ sơ dữ liệu cho sơ đồ tiến hóa Reverso trên `/mau-iconic/reverso/` và `/en/iconic-watches/reverso/`, dùng khuôn `src/data/modelEvolution.ts`. Dữ kiện lấy từ hồ sơ nguồn I2 (mục M1, `docs/ho-so-nguon-I2-nam-mau-kinh-dien-2026-09-26.md`) và được tái kiểm trực tiếp cùng ngày 2026-09-26. Nguyên tắc "thà thiếu còn hơn sai".

- **Ngày tra cứu:** 2026-09-26 (tái kiểm cùng ngày lập hồ sơ). **Phương thức:** web_reader (đọc trang render đủ; WebFetch từng quá hạn hai lượt với miền jaeger-lecoultre.com — đổi công cụ, không đổi nguồn).
- **Hồ sơ nền:** I2-M1 Reverso — SẴN SÀNG; URL dùng dưới đây nằm trong bảng claim I2 và được mở lại thành công hôm nay.
- **Ràng buộc từ đề bài I4:** KHÔNG thêm tên người, reference hoặc câu chuyện lịch sử ngoài phần hồ sơ I2 đã chốt; tên thiết kế là "Chauvot" theo hãng (bản gốc có chỗ viết "Chavot") — KHÔNG dùng "Cottier".

---

## 1. Các mốc ĐƯỢC CHỌN (4) — nguồn từng mốc

### V1 — 1930: Thách thức bảo vệ mặt kính trên sân polo

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history` |
| Tên nguồn / mức | Jaeger-LeCoultre chính hãng (nguồn cấp một) |
| Ngày kiểm / phương thức | 2026-09-26 / web_reader |
| Trích nguyên văn | "In 1930, businessman César de Trey was challenged to find a way to protect the glass of a watch for polo players during matches."; "He approached his friend Jacques-David LeCoultre to produce the watch and the pair engaged René-Alfred Chauvot to design it." |
| Chứng minh | năm 1930; César de Trey nhận thách thức bảo vệ mặt kính cho người chơi polo; Jacques-David LeCoultre chịu sản xuất; René-Alfred Chauvot thiết kế |
| Giới hạn | tên người chỉ dùng đúng các tên I2-M1 đã chốt (de Trey, LeCoultre, Chauvot); không mở rộng câu chuyện sang thể thao khác |

### V2 — 1931: Đơn đăng ký sáng chế Paris — "đồng hồ trượt được trong giá đỡ và lật ngược hoàn toàn"

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history` |
| Tên nguồn / mức | Jaeger-LeCoultre chính hãng (nguồn cấp một) |
| Ngày kiểm / phương thức | 2026-09-26 / web_reader |
| Trích nguyên văn | "On 4 March 1931, the Paris patent office received an application to register \"a watch capable of sliding in its support and being completely turned over\""; "The first pieces were on sale less than nine months after the patent application had been filed." |
| Chứng minh | ngày 4/3/1931 nộp đơn sáng chế tại Paris với mô tả khả năng lật nguyên văn; những chiếc đầu tiên bán chưa đầy 9 tháng sau khi nộp đơn |
| Giới hạn | mô tả sáng chế giữ nguyên ngoặc kép; "chưa đầy 9 tháng" là mốc tương đối theo nguyên câu — không suy ra ngày bán chính xác |

### V3 — 1994: Reverso Duoface

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history` |
| Tên nguồn / mức | Jaeger-LeCoultre chính hãng (nguồn cấp một) |
| Ngày kiểm / phương thức | 2026-09-26 / web_reader |
| Trích nguyên văn | "Originally developed in 1994, the Duoface offers two contrasting dials and a second timezone." |
| Chứng minh | năm 1994 phát triển Reverso Duoface; hai mặt số tương phản và múi giờ thứ hai |
| Giới hạn | chỉ dùng hai dữ kiện "hai mặt số tương phản + múi giờ thứ hai" đúng trích; mọi thông số bộ máy khác của trang không dùng |

### V4 — 1997: Reverso Duetto

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history` |
| Tên nguồn / mức | Jaeger-LeCoultre chính hãng (nguồn cấp một) |
| Ngày kiểm / phương thức | 2026-09-26 / web_reader |
| Trích nguyên văn | "Introduced in 1997, the Duetto has been specially conceived for women." |
| Chứng minh | năm 1997; Reverso Duetto ra mắt; được hãng thiết kế đặc biệt dành cho nữ |
| Giới hạn | chỉ dùng hai dữ kiện năm 1997 + đối tượng nữ đúng trích; không suy thông số, không mở rộng thành lịch sử dòng nữ |

Dữ kiện nền kèm theo (nằm trong intro/note, cùng URL): tên Reverso được đăng ký tháng 11/1931 ("in November he registered the Reverso name" — I2-M1); dòng đã chứa hơn 50 bộ máy khác nhau ("has housed more than 50 different calibres" — I2-M1, tái kiểm hôm nay); ra mắt 1931 và "định trở thành kinh điển thiết kế thế kỷ 20" theo nguyên câu hãng.

## 2. Tra được nhưng BỎ QUA (có nguồn, không đưa vào dataset)

| Chủ đề | Nguồn đã thu hôm nay | Lý do bỏ qua |
|---|---|---|
| **Reverso Soixantième 1991** — CÓ NGUỒN NHƯNG KHÔNG CHỌN | reverso-history ("In 1991, six decades after the Reverso was born, the Reverso began to embrace its full potential with the introduction of complications. The launch of the Reverso Soixantième in 1991 coincided with the rebirth of mechanical watchmaking") | dữ kiện đủ nguồn; hồ sơ chốt bốn mốc và chọn Duoface 1994 + Duetto 1997 làm hai đại diện hướng phát triển sau 1990 — Soixantième để ngoài là **quyết định biên tập về số mốc**, không phải vì thiếu nguồn và không phải vì ràng buộc kỹ thuật hiển thị. Nếu sau này cần mốc mở đầu chức năng phức tạp, dùng nguyên văn trên |
| Tháng 7/1931 de Trey mua quyền thiết kế; tháng 11/1931 đăng ký tên Reverso | reverso-history | đăng ký tên gộp vào dữ kiện nền (intro/note); mua quyền thiết kế là giao dịch nội bộ — không làm mốc |
| Số bộ máy của từng thế hệ (calibre 854 của Duoface…) | reverso-history | thông số bộ máy ngoài phạm vi mốc — hồ sơ I2 không chốt |
| Bối cảnh maison 1833 (Antoine LeCoultre) | I2-M1 (trang history-of-jaeger-lecoultre) | bối cảnh hãng, không phải mốc dòng Reverso |

## 3. Chưa đủ nguồn (không đưa, chờ nguồn bổ sung)

1. Các thế hệ Reverso sau 1997 (Grande Reverso, Hybris Mechanica…) — chưa tra nguồn trong lượt này.
2. Số reference các thế hệ lịch sử — trang lịch sử hãng không nêu số — không tự suy.

## 4. Đề xuất dataset (4 mốc)

- Tệp: `src/data/jaegerLeCoultreReversoEvolution.ts`; slug: `reverso`; name: `Jaeger-LeCoultre Reverso`; publishedLangs: `['vi','en']`.
- Tập mốc CHỐT (khớp dataset, checker I4 kiểm cứng): **1930/Reverso, 1931/Reverso, 1994/Reverso Duoface, 1997/Reverso Duetto**.
- Nguồn dataset chỉ dùng 1 URL: jaeger-lecoultre.com reverso-history (cả 4 mốc cùng trang chính hãng — khuôn giống Monochrome dùng 2 mốc ở Speedmaster).
- Không "Cottier"; không etymology Latin; không thêm tên người ngoài de Trey/LeCoultre/Chauvot; không số reference tự suy.

## 5. Bảng đối chiếu I2-M1 và bài hiện có

| Vấn đề | Xử lý I4 |
| --- | --- |
| Timeline lịch sử site có mốc "1931 — Jaeger-LeCoultre Reverso" | trùng mốc 1931 — sơ đồ I4 diễn đạt riêng theo trang lịch sử hãng; không đụng timeline |
| Bài reverso VI/EN hiện có ("Đồng hồ có thể lật mặt" / "the watch that flips") | I4 không sửa bài; dataset bổ sung hai mốc 1994 Duoface + 1997 Duetto chưa có trong bài nhưng đều từ cùng URL hãng đang dẫn trong frontmatter |
| I2-M1 "Hiểu lầm thường gặp": etymology Latin; tên "Cottier" | dataset không chứa; tên Chauvot giữ đúng |
| Hồ sơ T1 M8 (men — Reverso nhắc men) | không thuộc phạm vi sơ đồ — không đưa |

## 6. Giới hạn chung của lượt tra cứu

- WebFetch quá hạn hai lượt liên tiếp với miền jaeger-lecoultre.com (60 giây); dùng web_reader đọc nguyên trang — cùng URL, cùng nội dung render.
- Trang "1931 Polo Club" của JLC là SPA khung rỗng — không-làm-nguồn (I2-M1 đã loại).
- Mọi truy cập là đọc công khai.
