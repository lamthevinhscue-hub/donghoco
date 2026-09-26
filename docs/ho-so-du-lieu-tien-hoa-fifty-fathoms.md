# Hồ sơ dữ liệu tiến hóa Blancpain Fifty Fathoms — I4

Mục đích: hồ sơ dữ liệu cho sơ đồ tiến hóa Fifty Fathoms trên `/mau-iconic/fifty-fathoms/` và `/en/iconic-watches/fifty-fathoms/`, dùng khuôn `src/data/modelEvolution.ts`. Dữ kiện lấy từ hồ sơ nguồn I2 (mục M3, `docs/ho-so-nguon-I2-nam-mau-kinh-dien-2026-09-26.md`) và được tái kiểm trực tiếp cùng ngày 2026-09-26. Nguyên tắc "thà thiếu còn hơn sai".

- **Ngày tra cứu:** 2026-09-26 (tái kiểm cùng ngày lập hồ sơ). **Phương thức:** WebFetch (HTTP GET, trích nguyên văn; không chạy JavaScript).
- **Hồ sơ nền:** I2-M3 Fifty Fathoms — SẴN SÀNG; các URL dùng dưới đây đều nằm trong bảng claim I2 và được mở lại thành công hôm nay.
- **Ràng buộc từ đề bài I4:** giữ đúng góc nguồn Blancpain; KHÔNG tự gọi vành xoay "một chiều/unidirectional" — nguồn archive chỉ xác nhận vành xoay kèm cơ chế khóa chống xoay nhầm có bằng sáng chế; KHÔNG quy đổi "50 fathoms ≈ 91 m/300 ft" (không con số trong nguồn).

---

## 1. Các mốc ĐƯỢC CHỌN (4) — nguồn từng mốc

### F1 — 1953: Fifty Fathoms ra mắt — "đồng hồ lặn hiện đại đầu tiên"

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://www.blancpain.com/en/collections/fifty-fathoms-collection` |
| Tên nguồn / mức | Blancpain chính hãng (nguồn cấp một) |
| Ngày kiểm / phương thức | 2026-09-26 / WebFetch |
| Trích nguyên văn | "The Fifty Fathoms collection embodies Blancpain's passion for the underwater world that was originally expressed in 1953 with the presentation of the [...]" (công cụ trích cắt 125 ký tự — mệnh đề "first modern diver's watch" chốt nguyên vẹn trong I2-M3 từ chính URL này) |
| Chứng minh | năm 1953; hãng giới thiệu Fifty Fathoms là đồng hồ lặn hiện đại đầu tiên (theo cách nói của hãng) |
| Nguồn cấp một kèm theo | `https://www.blancpain.com/en/fifty-fathoms` — cùng mệnh đề 1953, đối chiếu chéo trong I2-M3 ("Hai URL chính hãng khớp nhau") |
| Giới hạn | "first modern diver's watch" là tuyên bố của hãng — dataset ghi rõ chủ thể "theo Blancpain"; không suy ra so sánh với mẫu của hãng khác |

### F2 — 1999: Mẫu mới đầu tiên sau gần 20 năm — Fifty Fathoms trong bộ ba Trilogy

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://lettresdubrassus.blancpain.com/en/issue-13/history-and-legend` |
| Tên nguồn / mức | Lettres du Brassus (archive chính hãng Blancpain) — nguồn cấp một |
| Ngày kiểm / phương thức | 2026-09-26 / WebFetch |
| Trích nguyên văn | "Not until nearly 20 years later, in 1999, did another model appear, the Fifty Fathoms from the Trilogy Collection," (câu còn tiếp — phần sau xác nhận mẫu ra mắt trong thời Jean-Claude Biver) |
| Chứng minh | năm 1999; mẫu Fifty Fathoms mới đầu tiên xuất hiện sau gần 20 năm; mẫu thuộc bộ ba Trilogy Collection; ra mắt trong thời Jean-Claude Biver |
| Giới hạn | "gần 20 năm" là mốc tương đối theo nguyên câu archive — dataset không suy ra năm ngừng chính xác của giai đoạn trước đó; thời Biver chỉ ghi là bối cảnh ra mắt |

### F3 — 2003: Anniversary Fifty Fathoms

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://lettresdubrassus.blancpain.com/en/issue-13/history-and-legend` |
| Tên nguồn / mức | Lettres du Brassus (archive chính hãng) — nguồn cấp một |
| Ngày kiểm / phương thức | 2026-09-26 / WebFetch |
| Trích nguyên văn | "In 2003 came the launch of the Anniversary Fifty Fathoms, three limited series of 50 watches each..." |
| Chứng minh | năm 2003; mẫu Anniversary Fifty Fathoms ra mắt gồm ba loạt giới hạn, mỗi loạt 50 chiếc |
| Giới hạn | archive KHÔNG viết "kỷ niệm 50 năm" — dataset không suy ra ý nghĩa kỷ niệm từ tên "Anniversary"; số "3 loạt × 50 chiếc" chỉ dùng trong phạm vi trích |

### F4 — 2007: Bộ sưu tập Fifty Fathoms chính thức ra đời

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://lettresdubrassus.blancpain.com/en/issue-13/history-and-legend` |
| Tên nguồn / mức | Lettres du Brassus (archive chính hãng) — nguồn cấp một |
| Ngày kiểm / phương thức | 2026-09-26 / WebFetch |
| Trích nguyên văn | "The Anniversary was but an overture, however, for the full re-establishment of a true Fifty Fathoms Collection, which debuted in 2007." |
| Chứng minh | năm 2007; bộ sưu tập Fifty Fathoms đầy đủ ra đời ("debuted in 2007") |
| Giới hạn | "one of the key pillars of modern Blancpain" (câu kế tiếp) là nhận định archive — dataset không sao nhận định; dùng mệnh đề ra đời bộ sưu tập là đủ |

Dữ kiện nền kèm theo (nằm trong note mốc F1, nguồn archive): tên "Fifty Fathoms" do Jean-Jacques Fiechter đặt, cảm hứng bài ca Ariel trong The Tempest của Shakespeare ("Fiechter named his creation the 'Fifty Fathoms.' On his mind when he did so was Ariel's song from Shakespeare's The Tempest."); dòng sinh ra từ nhu cầu của Captain Robert "Bob" Maloubier và Lieutenant Claude Riffaud — đoàn thợ lặn chiến đấu Pháp (kể theo archive, không kèm năm vì nguồn không gắn năm).

## 2. Tra được nhưng BỎ QUA (có nguồn, không đưa vào dataset)

| Chủ đề | Nguồn đã thu hôm nay | Lý do bỏ qua |
|---|---|---|
| Vành xoay + cơ chế khóa có bằng sáng chế (Fiechter) | lettresdubrassus ("So Fiechter developed a locking mechanism, which he also patented, to prevent inadvertent rotation of the bezel.") | có nguồn nhưng KHÔNG có năm mốc riêng; KHÔNG dùng từ "unidirectional" (nguồn không dùng) — ràng buộc đề bài I4 |
| Quy đổi độ sâu 91 m / 300 ft | không có con số trong nguồn | cấm theo I2-M3 và đề bài I4 |
| Báo cáo thử nghiệm US Navy 1959 (Operation HARDTACK); Milspec 2 giao 780 chiếc 1964 + ~300 chiếc 1966 | lettresdubrassus | chi tiết quân sự nâng cao, ngoài phạm vi "các thay đổi chính của dòng"; I2-M3 giới hạn "không thêm chi tiết quân đội khác" |
| 1950–1980 Fiechter làm CEO; 1980 rời hãng | lettresdubrassus | sự kiện nhân sự, không phải mốc của dòng |
| "archetypal diver's watch" | blancpain collections | nhận định chung của trang, không phải mốc có năm |
| "hơn 70 năm lịch sử" | blancpain collections / fifty-fathoms | khoảng thời gian tương đối — không mốc năm cụ thể |

## 3. Chưa đủ nguồn (không đưa, chờ nguồn bổ sung)

1. Năm đề bài ban đầu của Maloubier & Riffaud (thường nhắc 1952) — archive không gắn năm trong trích đã thu — không đặt mốc riêng, chỉ kể trong note F1 không kèm năm.
2. Fifty Fathoms Bathyscaphe (1956) — không có URL/trích trong lượt này — không tự suy năm.
3. Năm ngừng sản xuất giai đoạn trước 1999 — archive chỉ nói "nearly 20 years later" — không suy.

## 4. Đề xuất dataset (4 mốc)

- Tệp: `src/data/blancpainFiftyFathomsEvolution.ts`; slug: `fifty-fathoms`; name: `Blancpain Fifty Fathoms`; publishedLangs: `['vi','en']`.
- reference: F1/F2 = "Fifty Fathoms"; F3 = "Anniversary Fifty Fathoms"; F4 = "Fifty Fathoms Collection" — tất cả là tên có trong trích, không bịa số reference.
- Nguồn dataset chỉ dùng 2 URL: blancpain collections (F1) và lettresdubrassus issue-13 (F2–F4).
- Không "unidirectional"; không quy đổi mét/feet; không chi tiết quân sự ngoài Maloubier/Riffaud ở note F1; không suy ý nghĩa "kỷ niệm" của Anniversary.

## 5. Bảng đối chiếu I2-M3 và bài hiện có

| Vấn đề | Xử lý I4 |
|---|---|
| Timeline lịch sử site có mốc "1953 — Blancpain Fifty Fathoms — đồng hồ lặn hiện đại đầu tiên" | trùng mốc 1953 — sơ đồ I4 diễn đạt riêng theo nguồn Blancpain, ghi rõ chủ thể tuyên bố; không đụng timeline |
| Bài hiện có (VI 654 từ) kể Maloubier/Riffaud, Fiechter, The Tempest | I4 không sửa bài; dataset chỉ dùng các mệnh đề trong phạm vi trích đã thu |
| `/huong-dan/dung-vanh-lan/` + `/tu-dien/bezel/` (vành xoay một chiều — khái niệm chung) | dataset KHÔNG nói "vành xoay một chiều" cho Fifty Fathoms — chỉ có cơ chế khóa chống xoay nhầm nếu được nhắc (nay để ngoài dataset) |
| I2-M3 "Hiểu lầm thường gặp": quy đổi 91 m/300 ft | dataset không chứa con số này |

## 6. Giới hạn chung của lượt tra cứu

- WebFetch không chạy JavaScript; công cụ trích cắt 125 ký tự mỗi đoạn — trích F1 mệnh đề đầy đủ đã chốt trong I2-M3 (ngày 2026-09-26) từ chính URL này, hôm nay mở lại thành công và phần hiển thị khớp.
- Trang blancpain.com/en/brand/our-vision/history không chứa mệnh đề Fifty Fathoms (I2-M3 đã loại) — không dùng.
- Mọi truy cập là đọc công khai.
