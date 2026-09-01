# Hồ sơ dữ liệu tiến hóa Rolex GMT-Master — sơ đồ dòng đời thứ hai

> **Tài liệu nghiên cứu nội bộ.** Đây là **nguồn dữ liệu chuẩn duy nhất** cho sơ đồ tiến hóa Rolex GMT-Master trên trang `/mau-iconic/rolex-gmt-master/`. Dữ kiện chỉ được vào sơ đồ khi nằm trong bảng "đề xuất dataset" của hồ sơ này. Muốn sửa hay thêm mốc phải sửa hồ sơ trước, rồi mới sửa dataset `src/data/rolexGmtMasterEvolution.ts`.

## Khung hồ sơ

- **Ngày rà soát:** 01/09/2026.
- **Mục đích sử dụng:** dữ liệu đầu vào cho sơ đồ tiến hóa dòng Rolex GMT-Master — sơ đồ thứ hai sau thí điểm Submariner, dùng chung hạ tầng `ModelEvolution.astro`.
- **Nguyên tắc:** **"thà thiếu còn hơn sai."** Một dữ kiện cứng (năm, reference, calibre, vật liệu bezel, kiểu dây) chỉ vào bảng "đã đủ nguồn" khi có nguồn trực tiếp xác nhận. Chưa đủ nguồn thì ghi vào bảng "cần kiểm chứng".
- **Quy tắc biệt danh:** "Pepsi", "Batman", "Batgirl", "Coke", "Root Beer"… **không phải dữ kiện chính thức**. Trong hồ sơ và sơ đồ chỉ mô tả bằng **tên màu** (đỏ – xanh, xanh – đen, nâu – đen, xám – đen); các biệt danh chỉ được nhắc khi nguồn uy tín tự dùng, và phải ghi rõ là cách gọi của giới sưu tầm.
- **Phạm vi rà:** 6542 (đời đầu); 1675 (crown guard); nhóm chuyển tiếp 16750/16760; 16700/16710 (thế hệ 5 chữ số); nhóm kỷ niệm 50 năm và gốm (2005–2007); 116710BLNR; 116719BLRO; 126710BLRO; các mốc 2022–2025 của Rolex Newsroom. Không bắt buộc đủ mọi reference — nhóm nào chưa chốt thì vào bảng "cần kiểm chứng".
- **Không đưa vào hồ sơ:** giá thị trường, xếp hạng đầu tư, nhận định "đáng mua/đắt nhất", ngôn ngữ marketing. Nguồn bán hàng không dùng làm căn cứ dữ kiện.

## Danh sách nguồn đã truy cập

### A. Truy cập trực tiếp ngày 01/09/2026

| ID | Tổ chức | Trang | URL | Ngày truy cập | Loại nguồn | Phương pháp xác minh |
|---|---|---|---|---|---|---|
| G1 | Rolex | Rolex GMT-Master II — trang mẫu chính thức | https://www.rolex.com/en-us/watches/gmt-master-ii | 01/09/2026 | Chính thức | HTTP 403 cho curl (Rolex chặn bot); **nội dung đã xác minh nguyên văn qua trình đọc trang** — trang truy cập được như người dùng thực |
| G2 | Rolex | The Rolex GMT-Master II Models — Newsroom | https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii | 01/09/2026 | Chính thức | Như G1 (403 cho curl, xác minh qua trình đọc trang, trích nguyên văn đầy đủ) |
| G3 | Hodinkee (với Ben Clymer) | Reference Points: Understanding The Rolex GMT-Master | https://www.hodinkee.com/articles/rolex-gmt-master-reference-points | 01/09/2026 | Báo chí chuyên ngành | HTTP 200 trực tiếp; đọc nguyên văn |

### B. Đã xem qua kết quả tìm kiếm (trích nội dung trang) ngày 01/09/2026 — đối chiếu chéo, không dùng làm căn cứ duy nhất

| ID | Tổ chức | Trang | URL | Loại nguồn |
|---|---|---|---|---|
| G4 | Wind Vintage | Rolex GMT-Master Reference 1675 in 18K YG (đề nghị đọc G3 để hiểu lịch sử dòng) | https://www.windvintage.com/rolex-gmtmaster-reference-1675-in-18k-yg | Thương mại chuyên ngành |
| G5 | Hodinkee | Found: An Example Of The Legendary Albino Rolex GMT-Master Reference 6542 (ghi nhận biến thể hiếm của 6542) | https://www.hodinkee.com/articles/rolex-gmt-master-6542 | Thương mại chuyên ngành |

**Phân bổ nguồn theo đề bài:** G1, G2 là **chính hãng** — căn cứ cho mọi mốc Rolex tự công bố (1955, 1982, 2013, 2014, 2018, 2022, 2023, 2025). G3 là **chuyên ngành** — chỉ dùng để đối chiếu **reference và năm sản xuất mà Rolex không công bố** (số reference, dải sản xuất từng ref, calibre từng thế hệ). Không mốc nào trong dataset dựa duy nhất vào nguồn thị trường.

---

## 1. Bảng dữ liệu đã đủ nguồn

Mỗi hàng chỉ nêu thay đổi có nguồn xác nhận. "Nguồn xác nhận" tham chiếu danh sách nguồn ở trên.

| Mốc hiển thị dự kiến | Reference | Năm | Thay đổi kỹ thuật/thiết kế chính | Nguồn xác nhận | Mức độ chắc chắn |
|---|---|---|---|---|---|
| Ra mắt dòng | 6542 | 1955 | GMT-Master đầu tiên, vỏ Oyster 38mm, vành nhựa Bakelite hai màu đỏ – xanh; thiết kế làm công cụ hàng không, được phi công Pan Am lựa chọn | 1955 + Pan Am: G1, G2 (chính hãng); ref 6542 + Bakelite: G3 ("the reference 6542 is the first GMT-Master ever made"; sản xuất 1955–1959) | Cao |
| Vành che núm + vành kim loại | 1675 | 1959 | GMT-Master thế hệ vành che núm (crown guards); insert vành kim loại thay nhựa Bakelite; sản xuất 1959–1980 | G3 (nguyên văn "in production from 1959 until 1980"; mô tả crown guards và insert kim loại) | Cao |
| GMT-Master II — kim giờ độc lập | 16760 | 1982 | GMT-Master II đầu tiên: kim giờ 12 giờ chỉnh độc lập từng giờ, không dừng máy (bộ máy 3085) — Rolex chính hãng ghi năm 1982 và tính năng; ref 16760 do G3 đối chiếu | G2 (1982, nguyên văn "independently settable 12-hour hand"); ref + calibre: G3 ("the very first GMT-Master II… 1982 and 1988") | Cao |
| Thế hệ 5 chữ số dài đời | 16710 | 1989 | GMT-Master II thế hệ 5 chữ số, vỏ mỏng hơn với bộ máy 3185; sản xuất 1989–2007 | G3 | Cao |
| Cerachrom đầu tiên của dòng | GMT-Master II kỷ niệm 50 năm (bản vàng) | 2005 | Bezel gốm Cerachrom đơn màu (đen) đầu tiên của dòng GMT-Master, nhân dịp 50 năm; bản kỷ niệm đầu bằng vàng | G3 ("In 2005, Rolex celebrated the 50th anniversary… introducing a ceramic bezel insert that, at first, was produced in a single color: black. The initial anniversary model was made in gold") | Cao |
| Cerachrom hai màu đơn khối đầu | 116710BLNR | 2013 | Insert gốm hai màu đầu tiên sản xuất đơn khối (xanh – đen), trên bản thép | G2 (2013, nguyên văn "first two-colour Cerachrom… monobloc"); ref: G3 | Cao |
| Vành đỏ – xanh gốm | 116719BLRO | 2014 | GMT-Master II vàng trắng với insert Cerachrom đỏ – xanh — hồi sinh cặp màu của bản gốc trên vành gốm | G1, G2 (2014, nguyên văn "revived the emblematic colour pairing"); ref: G3 | Cao |
| Thép Pepsi + calibre 3285 | 126710BLRO | 2018 | Vành đỏ – xanh trên bản thép; bộ máy 3285 (Chronergy, trữ cót 70 giờ); dây Jubilee trở lại | G3 (calibre 3285, 70 giờ, Jubilee, bản thép); năm 2018 của mốc insert nâu – đen cũng được G2 xác nhận | Cao |

Ghi chú phạm vi:

- **1959 (chuyến bay New York – Moscow không dừng đầu tiên)** — G2 ghi dữ kiện hàng không; **không đưa vào sơ đồ** vì không phải thay đổi thiết kế đồng hồ, chỉ là bối cảnh sử dụng.
- **16700 (1988–1999)** — GMT-Master (thường) cuối cùng theo G3; đủ nguồn nhưng **không đưa** — xem bảng "Không đưa vào sơ đồ".
- **2018 (insert nâu – đen, Everose)** — G2 xác nhận; dữ kiện màu đã được phản ánh gián tiếp qua mốc 2018 chọn bản thép (bước nhảy bộ máy + dây). Xem bảng "Không đưa vào sơ đồ".
- **2022 (mão trái), 2023 (xám – đen), 2025 (mặt số gốm đầu tiên)** — G2 xác nhận đủ ba dữ kiện; **chưa đưa** — xem bảng "Không đưa vào sơ đồ".

---

## 2. Bảng dữ liệu cần kiểm chứng

| Reference / chi tiết | Vì sao chưa đủ nguồn | Nguồn đã xem | Cần xác minh thêm điều gì |
|---|---|---|---|
| Số reference của bản kỷ niệm vàng 2005 | G3 xác nhận dữ kiện mốc (2005, gốm đơn màu, bản vàng) nhưng không ghi số reference của bản vàng; nguồn khác trên thị trường nêu 116718 nhưng là nguồn chưa được truy trực tiếp | G3 | Truy trực tiếp một nguồn chuyên ngành thứ hai xác nhận số reference bản vàng 2005 |
| Số reference của các mốc 2022–2025 (mão trái, xám – đen, mặt số gốm) | G2 ghi dữ kiện nhưng Rolex không công bố reference trên Newsroom; chưa truy được nguồn chuyên ngành sống đối chiếu từng số | G2 | Nguồn chuyên ngành truy trực tiếp xác nhận từng reference khi muốn đưa các mốc này |
| Năm bắt đầu 6542 theo serial (có nguồn ghi có chiếc sớm hơn 1955?) | G3 chốt dải "1955 through 1959" thống nhất với mốc ra mắt 1955 của G1/G2; chưa thấy nguồn mâu thuẫn trực tiếp, nhưng các nguồn thị trường hay nêu "late 1954" cho vài serial | G3; ghi nhận qua tìm kiếm: G5 | Nếu muốn chốt theo serial cần hồ sơ đấu giá; hiện dùng 1955 theo nguồn chính hãng — đủ an toàn |

---

## 3. Liên hệ nguồn với dữ kiện

| ID | Những dữ kiện nguồn đó hỗ trợ |
|---|---|
| G1 (Rolex — trang mẫu) | GMT-Master ra mắt **1955**; được phi công **Pan American World Airways** lựa chọn; GMT = giờ trung bình Greenwich, kinh tuyến gốc từ **1884**; kim 24 giờ đầu mũi tam giác + vành 24 giờ xoay hai chiều; **GMT-Master II ra 1982**, kim giờ địa phương chỉnh độc lập từng giờ không dừng máy; **2014** hồi sinh cặp màu đỏ – xanh đời đầu trên Cerachrom; GMT-Master II là mẫu Rolex đầu có vành Cerachrom (dòng này). (Cũng là nguồn đang trích trong frontmatter bài `rolex-gmt-master.md`) |
| G2 (Rolex Newsroom) | **1955** ra mắt, công cụ hàng không, phi công Pan Am; **1959** chuyến New York – Moscow không dừng đầu tiên (bối cảnh); **1982** bộ máy mới kim giờ chỉnh độc lập → đặt tên GMT-Master II; **2013** insert Cerachrom hai màu đầu sản xuất đơn khối (xanh – đen) trên bản thép; **2014** đỏ – xanh trên bản vàng trắng; **2018** nâu – đen trên Everose; **2022** xanh lục – đen, mão bên trái, lịch ở 9 giờ; **2023** xám – đen; **2025** mặt số gốm đầu tiên (vàng trắng, mão trái); vỏ hiện hành 40mm, chống nước 100m, calibre 3285, trữ cót khoảng 70 giờ |
| G3 (Hodinkee Reference Points) | **6542**: GMT-Master đầu tiên, 1955–1959, vỏ 38mm, bezel Bakelite hai màu (được thay insert kim loại khi thu hồi); **1675**: 1959–1980, crown guards, insert kim loại; **16750**: 1980–1988, GMT-Master thường, quick-set date, 100m; **16760**: GMT-Master II đầu tiên 1982–1988, calibre 3085 kim giờ độc lập; **16700**: 1988–1999 GMT-Master thường cuối; **16710**: 1989–2007 GMT-Master II, calibre 3185; **2005**: kỷ niệm 50 năm, Cerachrom đơn màu đen đầu, bản vàng; **2007**: bản thép theo sau, calibre 3186 Parachrom; **116710BLNR** 2013 hai màu đầu; **116719BLRO** 2014 vàng trắng đỏ – xanh; **126710BLRO** 2018: thép, calibre 3285 Chronergy 70 giờ, Jubilee. G3 tự gọi màu đỏ – xanh bằng cách gọi phổ biến của giới sưu tầm — hồ sơ và sơ đồ chỉ dùng tên màu |
| G4 (Wind Vintage) | Chỉ định hướng: bản 1675 vàng khối circa 1967 khớp dải sản xuất 1959–1980 của G3 |
| G5 (Hodinkee — Albino 6542) | Ghi nhận biến thể hiếm của 6542; không dùng cho mốc nào |

---

## 4. Đề xuất dataset cho sơ đồ (8 mốc — đã xuất bản)

Chỉ các mốc trong bảng này được phép vào `src/data/rolexGmtMasterEvolution.ts`. Cột "URL nguồn" trỏ về nguồn mạnh nhất của dữ kiện trung tâm mốc; đối chiếu chéo xem phần 1 và phần 3.

| Nhãn ngắn | Reference | Năm | Một thay đổi then chốt | Chú thích ngắn cho người mới | URL nguồn | Cờ |
|---|---|---|---|---|---|---|
| Ra mắt dòng | 6542 | 1955 | GMT-Master đầu tiên: vỏ Oyster, vành 24 giờ hai màu đỏ – xanh trên nền nhựa Bakelite | Thiết kế cho phi công hàng không đường dài; Rolex ghi năm ra mắt 1955 và ghi nhận phi công Pan Am lựa chọn | https://www.hodinkee.com/articles/rolex-gmt-master-reference-points | ĐÃ DÙNG |
| Vành che núm xuất hiện | 1675 | 1959 | Thế hệ có vành che núm (crown guards), insert vành kim loại thay Bakelite | Dáng vỏ này giữ nguyên gần như trọn thế hệ sau đó | https://www.hodinkee.com/articles/rolex-gmt-master-reference-points | ĐÃ DÙNG |
| Kim giờ chỉnh độc lập | 16760 | 1982 | GMT-Master II đầu tiên — kim giờ chỉnh độc lập từng giờ, không dừng máy | Rolex chính hãng ghi năm 1982; số reference do nguồn chuyên ngành đối chiếu | https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii | ĐÃ DÙNG |
| Thế hệ 5 chữ số | 16710 | 1989 | GMT-Master II vỏ mỏng hơn với bộ máy 3185 | Sản xuất dài 1989–2007 — một trong những GMT-Master II dài đời nhất | https://www.hodinkee.com/articles/rolex-gmt-master-reference-points | ĐÃ DÙNG |
| Cerachrom đầu tiên của dòng | GMT-Master II kỷ niệm 50 năm (bản vàng) | 2005 | Bezel gốm Cerachrom đơn màu đầu tiên của dòng GMT-Master | Nhân dịp 50 năm dòng GMT-Master; bản kỷ niệm đầu bằng vàng | https://www.hodinkee.com/articles/rolex-gmt-master-reference-points | ĐÃ DÙNG |
| Cerachrom hai màu đơn khối | 116710BLNR | 2013 | Insert gốm hai màu đầu tiên sản xuất đơn khối (xanh – đen) | Rolex chính hãng ghi đây là Cerachrom hai màu đơn khối đầu tiên | https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii | ĐÃ DÙNG |
| Vành đỏ – xanh gốm | 116719BLRO | 2014 | GMT-Master II vàng trắng với insert Cerachrom đỏ – xanh | Hồi sinh cặp màu của bản gốc trên vành gốm hiện đại | https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii | ĐÃ DÙNG |
| Thép + calibre 3285 | 126710BLRO | 2018 | Vành đỏ – xanh trên bản thép; bộ máy 3285; dây Jubilee trở lại | Bộ máy 3285 trữ cót khoảng 70 giờ — nền của thế hệ đang bán | https://www.hodinkee.com/articles/rolex-gmt-master-reference-points | ĐÃ DÙNG |

---

## 5. Không đưa vào sơ đồ (và lý do)

Bắt buộc theo đề bài: mọi reference/mốc có nguồn mâu thuẫn, không xác minh được năm, chỉ có nguồn thị trường, hoặc dễ nhầm GMT-Master với GMT-Master II đều phải liệt kê ở đây.

| Reference / mốc | Lý do không đưa |
|---|---|
| **16750 (1980–1988)** | Đủ nguồn (G3) nhưng là mốc chuyển tiếp của dòng GMT-Master thường, trùng khung thời gian với 16760; đưa vào sẽ gây nhầm lẫn giữa nhánh GMT-Master và GMT-Master II — chính là rủi ro đề bài cảnh báo |
| **16700 (1988–1999)** | Đủ nguồn (G3) nhưng trùng mốc thời gian 1988 với mốc đã chọn (16710 ra 1989) và thuộc nhánh GMT-Master thường ngừng phát triển; sơ đồ theo nhánh GMT-Master II |
| **116710LN thép (2007)** | Đủ nguồn (G3) nhưng bước kỹ thuật (Cerachrom đơn màu) đã được thể hiện ở mốc 2005; mốc 2013 tiếp theo là bước hai màu — thêm 2007 làm sơ đồ dày bản thép/gold không thay đổi câu chuyện |
| **2018 — insert nâu – đen Everose (G2)** | Dữ kiện chính hãng xác nhận nhưng là biến thể màu; năm 2018 đã đại diện bởi mốc thép + calibre 3285 (bước nhảy bộ máy và dây) |
| **2022 mão trái, 2023 xám – đen, 2025 mặt số gốm (G2)** | Dữ kiện chính hãng có, nhưng reference chưa đối chiếu được bằng nguồn chuyên ngành truy trực tiếp trong đợt này (Rolex không ghi số), và các thế hệ đang bán chưa kết thúc vòng đời — thêm sau khi có hồ sơ kiểm chứng riêng |
| **1959 chuyến bay New York – Moscow (G2)** | Dữ kiện hàng không, không phải thay đổi thiết kế đồng hồ |
| **Biệt danh "Pepsi/Batman/Batgirl/Coke"** | Cách gọi của giới sưu tầm, không phải dữ kiện chính thức; sơ đồ mô tả bằng tên màu |
| **Chi tiết kiện/truyền thông về bezel Bakelite bị thu hồi (cuối 1950s)** | Dữ kiện không nằm trong bất kỳ nguồn đã truy trực tiếp nào của hồ sơ này — không đưa cho tới khi có nguồn trực tiếp |

---

## 6. Rủi ro nội dung đang xuất bản — đối chiếu `src/content/mauIconic/vi/rolex-gmt-master.md`

Đối chiếu từng dữ kiện timeline đang hiển thị trên trang với hồ sơ. **Không tự sửa bài.**

| Câu/ý đang xuất bản | Kết quả đối chiếu | Ghi chú |
|---|---|---|
| Frontmatter `year: 1955` | Khớp nguồn | G1: "The launch of the GMT-Master in 1955" |
| "Rolex ra mắt GMT-Master năm 1955 — thiết kế làm công cụ định vị thời gian cho hàng không — và nhanh chóng được các phi công Pan Am lựa chọn" | Khớp nguồn | G1, G2 nguyên văn |
| "GMT lấy từ Greenwich Mean Time… kinh tuyến gốc từ năm 1884" | Khớp nguồn | G1 |
| "Năm 1982, Rolex giới thiệu GMT-Master II… kim giờ địa phương chỉnh độc lập từng giờ, không dừng máy" | Khớp nguồn | G1, G2; đối chiếu ref 16760 với G3 |
| "GMT-Master đời đầu — kim 24 giờ gắn chặt vào cơ chế kim giờ" | Khớp nguồn | G1 mô tả khác biệt 1982 là kim giờ chỉnh độc lập — ngụ ý đời đầu không chỉnh độc lập |
| "2014 — Rolex đưa cặp màu đỏ – xanh đời đầu trở lại trên vành gốm Cerachrom" | Khớp nguồn | G1, G2 |
| "Vành hai màu đỏ – xanh… phân biệt giờ ban ngày và giờ ban đêm" | Khớp nguồn | G1, G2 (nửa dưới ngày, nửa trên đêm) |
| Frontmatter `category: "pilot"`, phần "Góc nhìn sưu tầm" (đọc hai múi giờ cố định vs đảo nhanh) | Không có dữ kiện cứng ngoài nguồn | Biên tập trung tính, không phát hiện sai |

**Kết luận rủi ro:** không phát hiện dữ kiện nào đang hiển thị sai nghiêm trọng cần sửa bài. Không sửa `rolex-gmt-master.md` trong gói này.
