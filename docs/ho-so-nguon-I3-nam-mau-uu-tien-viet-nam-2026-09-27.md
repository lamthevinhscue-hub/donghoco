# Hồ sơ nguồn I3 — Năm mẫu ưu tiên Việt Nam (pha 1)

- Giao dịch (chuỗi đầy đủ): TXN-20260926-323 (lập hồ sơ, 27/09/2026);
  TXN-20260926-324 (vòng sửa chuẩn độc lập, 28/09/2026);
  TXN-20260926-330 (thực hiện pha 1b, 28/09/2026, phát hành sau `9b89d5d`);
  TXN-20260926-331 (điều phối/tái nghiệm thu pha 1b);
  TXN-20260926-332 (vòng đồng bộ tài liệu, 28/09/2026);
  TXN-20260926-333 (điều phối/tái nghiệm thu vòng đồng bộ).
  Danh mục DHC-GD3-20260925, gói I3 pha 1
- Ngày lập: 27/09/2026; nền repo: `043be67` (= origin/main khi bắt đầu)
- Quyết định chủ sở hữu 27/09/2026: mở I3 ngay, bỏ phụ thuộc C4
- Phạm vi: CHỈ hồ sơ nguồn làm căn cứ cho gói viết sâu song ngữ sau. Chưa viết
  lại bài Việt, chưa tạo bản tiếng Anh, chưa thêm route, ảnh, sơ đồ tiến hóa,
  chưa sửa dữ liệu hiện có.

## 1. Phạm vi và phương pháp

Năm mẫu chọn cố định theo danh sách biên tập: grand-seiko-snowflake,
seiko-62mas, tudor-black-bay, tissot-prx, orient-bambino. Đã đọc đủ năm bài VI
hiện hữu (`src/content/mauIconic/vi/`), frontmatter, nguồn đang trích trong
frontmatter, dữ liệu dòng thời gian (`src/data/timeline.json`), các dataset sơ
độ tiến hóa, và các bài cơ chế/từ điển có nguy cơ trùng (mục 9).

Quy tắc đã áp dụng:

- Ưu tiên trang chính hãng/archive hãng, sau đó bảo tàng chính thức, tổ chức
  ngành. Không dùng Wikipedia, cửa hàng, snippet, tạp chí đồng hồ làm nguồn
  cho năm, reference, calibre hay thông số.
- Trích dẫn là nguyên văn tiếng Anh, mỗi trích tối đa 25 từ; hai đoạn cắt rời
  trong cùng câu nối bằng `...`, cả hai phần đều là chuỗi nguyên văn.
- Ngày kiểm: 27/09/2026 cho lượt tra cứu pha 1; 28/09/2026 cho các hàng bổ
  sung của pha 1b — ghi trên từng hàng. Mọi URL đã xác minh còn sống khi lập
  hồ sơ; tudorwatch.com và orientwatchusa.com chặn truy cập tự động trực
  tiếp, nội dung đọc qua trình đọc trang — trích vẫn là nguyên văn trên trang.
- Hai URL cùng một hãng chỉ là đối chiếu nội bộ của hãng, không gọi là xác
  nhận độc lập. Chuẩn hiện hành (TXN-20260926-324): trạng thái SẴN SÀNG phải
  có tối thiểu hai nguồn trực tiếp độc lập — khác cả tổ chức và miền URL;
  nhiều URL cùng một tổ chức không đủ để giữ SẴN SÀNG.
- Không giá bán, giữ giá, đầu tư, lời khuyên mua; không suy luận từ hình ảnh
  hay quảng cáo.

## 2. Tổng kết phân loại

| Mẫu | Slug | Trạng thái | Lý do ngắn |
|---|---|---|---|
| Grand Seiko Snowflake | grand-seiko-snowflake | CẦN THU HẸP | Bằng chứng dày (mỗi nhóm claim hai URL trở lên) nhưng toàn bộ cùng tổ chức grand-seiko.com — chưa có nguồn độc lập khác tổ chức theo chuẩn hiện hành |
| Seiko 62MAS | seiko-62mas | CẦN THU HẸP | Claim cốt lõi (1965, 150m, tái hiện) đạt hai URL trở lên, có bảo tàng độc lập; riêng mã calibre 6217 / reference 6217-8000 chưa có nguồn đạt — phải thu hẹp |
| Tudor Black Bay | tudor-black-bay | CẦN THU HẸP | Chỉ trang tudorwatch.com (đối chiếu nội bộ); ba claim cốt lõi (2012, kim Snowflake, BB54) mới một URL trực tiếp mỗi claim; hai số liệu trong bài cần chỉnh theo nguồn |
| Tissot PRX | tissot-prx | CẦN THU HẸP | Pha 1b mở cấm ba mệnh đề (tên P/R/X, quartz bản gốc 1978, nền ETA 2824 — đã có nguyên văn chính hãng, mục 6); "độc quyền của Tissot" loại có căn cứ (Certina dùng Powermatic 80); trạng thái giữ vì toàn bộ nguồn thuộc Swatch Group — chưa có độc lập |
| Orient Bambino | orient-bambino | CẦN THU HẸP | Nguồn đạt chỉ ở cấp phân phối chính thức (một domain); nguồn bài đang trích (tạp chí, cửa hàng hướng dẫn, wiki) không đạt chuẩn; mẹo chữ trên mặt số và mốc 2022 không có nguồn |

Tổng kết phân loại: 0 SẴN SÀNG, 5 CẦN THU HẸP, 0 CHƯA ĐỦ NGUỒN (tổng 5 mẫu).
Sau pha 1b (TXN-20260926-330): không mẫu nào nâng SẴN SÀNG — không mẫu nào
có nguồn độc lập ngoài tập đoàn của mình; PRX được mở ba mục cấm nhờ nguồn
chính hãng mới, Bambino bổ sung trang chính hãng toàn cầu (chi tiết mục 12).

## 3. grand-seiko-snowflake — CẦN THU HẸP

Trạng thái: CẦN THU HẸP

Bài hiện hữu: `src/content/mauIconic/vi/grand-seiko-snowflake.md` (năm 2005,
references SBGA011/SBGA211/SBGA407/SBGA413, calibre 9R65). Nguồn frontmatter
hiện có: trang sản phẩm SBGA211 và trang Spring Drive stories — cả hai đạt và
được giữ lại trong bảng dưới. Bản tiếng Anh: chưa có (chỉ ghi nhận, tạo khi mở
pha viết).

| Claim | URL | Trích nguyên văn | Ngày kiểm | Cấp nguồn | Giới hạn diễn đạt |
|---|---|---|---|---|---|
| Grand Seiko ra mắt SBGA011 mặt số "snowflake" ngay sau năm 2004 | https://www.grand-seiko.com/us-en/worldofgrandseiko/manufacture/9r20th/chapter5/index | "the limited-edition SBGA005 of 2004 ... The next year, Grand Seiko followed it up with the SBGA011 with the "snowflake" dial." | 2026-09-27 | chính hãng | Trang không ghi số "2005" trực tiếp — năm suy từ "the next year" sau "SBGA005 of 2004"; viết năm 2005 phải giữ cách dẫn này, không đặt mốc ngày cụ thể |
| Mặt số lấy cảm hứng tuyết dãy núi Hotaka nhìn từ Shinshu Watch Studio | https://www.grand-seiko.com/us-en/collections/sbga211g | "Visible from the Shinshu Watch Studio, where Spring Drive watches are made, the Hotaka mountain range is blanketed with snow for several months each winter." | 2026-09-27 | chính hãng | Viết "dãy núi Hotaka, Nagano"; cấm chữ "Hyūga" (xem mục 8) |
| (cùng claim — URL hai) | https://www.grand-seiko.com/gr-en/worldofgrandseiko/manufacture/springdrivestories/chapter1 | "the magnificence of the snowy landscape in the Hotaka mountains, which can be seen from the Shinshu Watch Studio" | 2026-09-27 | chính hãng | Bổ trợ cho hàng trên |
| (cùng claim — URL ba) | https://www.grand-seiko.com/us-en/worldofgrandseiko/manufacture/9r20th/chapter5/index | "the SBGA011 became known for its signature white textured dial inspired by wind-blown snow" | 2026-09-27 | chính hãng | Bổ trợ cho hàng trên |
| Kim giây Spring Drive trượt mượt, không tích tắc | https://www.grand-seiko.com/gr-en/worldofgrandseiko/manufacture/springdrivestories/chapter1 | "the seconds hand does not tick but moves smoothly across the dial in a glide motion that embodies the natural flow of time itself" | 2026-09-27 | chính hãng | Dùng chữ "trượt"; không viết là cách hiếm có tuyệt đối |
| (cùng claim — URL hai) | https://www.grand-seiko.com/us-en/collections/sbga211g | "moves over the dial in the perfect glide motion that is Spring Drive's unique signature" | 2026-09-27 | chính hãng | Bổ trợ cho hàng trên |
| Calibre 9R65 có độ chính xác ±1 giây/ngày (±15 giây/tháng) | https://www.grand-seiko.com/us-en/collections/movement/springdrive/9r65 | "Accuracy ±15 seconds per month (±1 second per day)" | 2026-09-27 | chính hãng | Ghi cả hai vạch (tháng/ngày) như nguồn; trang 9R65 là trang thông số chính thức |
| Spring Drive 9R65 ra mắt 2004, trở thành calibre Grand Seiko cùng năm | https://www.grand-seiko.com/us-en/news/2025/pr/20250401_SpringDrive | "In 2004, Grand Seiko introduced the Spring Drive Caliber 9R65" | 2026-09-27 | chính hãng | Mốc 2004 riêng cho calibre, không trộn với mốc 2005 của SBGA011 |
| Shinshu Watch Studio sản xuất toàn bộ Spring Drive và quartz của Grand Seiko | https://www.grand-seiko.com/gr-en/worldofgrandseiko/manufacture/shinshuwatchstudio | "Thus the studio is one of the world's few fully integrated "manufactures" and makes all Grand Seiko's Spring Drive and quartz watches in-house." | 2026-09-27 | chính hãng | Không suy rộng thành "xưởng duy nhất của tập đoàn" |
| SBGA211 là tham chiếu Snowflake đang bán | https://www.grand-seiko.com/us-en/collections/sbga211g | "A Spring Drive model with the delicate "Snowflake" pattern on its dial, inspired by snow and wind." | 2026-09-27 | chính hãng | Chỉ khẳng định "đang bán khi kiểm"; không viết chỉ số giá |

Sáu URL trong khối, cùng tổ chức grand-seiko.com — đây là đối chiếu nội bộ
của hãng, chưa có nguồn độc lập khác tổ chức. Theo chuẩn hiện hành (hai nguồn
trực tiếp độc lập, khác cả tổ chức và miền), trạng thái là CẦN THU HẸP:
bằng chứng từng claim đã dày và nhất quán, nhưng phải bổ sung nguồn độc lập
đạt danh mục (bảo tàng, tổ chức ngành, archive khác tổ chức) cho các claim
cốt lõi trước khi mở viết.

Đánh dấu việc cần làm khi viết sâu: bài đang ghi
mặt số lấy cảm hứng từ "dãy núi Hyūga" — sai, phải viết thành dãy núi Hotaka
(xem mục 8).

## 4. seiko-62mas — CẦN THU HẸP

Trạng thái: CẦN THU HẸP

Bài hiện hữu: `src/content/mauIconic/vi/seiko-62mas.md` (năm 1965, calibre
6217, 150m, references 6217-8000/6105-8000/6309-7040/SKX007). Nguồn
frontmatter hiện có: trang Prospex tái hiện 1965 và thông cáo 2025 — cả hai
đạt, giữ lại trong bảng. Bản tiếng Anh: chưa có (chỉ ghi nhận).

| Claim | URL | Trích nguyên văn | Ngày kiểm | Cấp nguồn | Giới hạn diễn đạt |
|---|---|---|---|---|---|
| Năm 1965 Seiko giới thiệu đồng hồ lặn đầu tiên của hãng và của Nhật | https://www.seikowatches.com/us-en/products/prospex/special/1965_6L/index | "In 1965, Seiko introduced its, and Japan's, first-ever diver's watch." | 2026-09-27 | chính hãng | Không thêm "tự động đầu tiên thế giới" |
| (cùng claim — URL hai) | https://www.seikowatches.com/us-en/news/2025/pr/20250306_psx | "Known to fans as the 62MAS, the 1965 diver's watch incorporated an automatic mechanical movement and delivered 150m water resistance." | 2026-09-27 | chính hãng | Tên "62MAS" là tên giới chơi gọi, nguồn ghi "Known to fans" — giữ sắc thái |
| (cùng claim — URL ba, độc lập) | https://museum.seiko.co.jp/en/collections/watch_previousterm/collect015/ | "The first Japan-made diver's watch, waterproof to a depth of 150 meters." | 2026-09-27 | bảo tàng | Bảo tàng Seiko Ginza — xác nhận độc lập duy nhất trong khối |
| (cùng claim — URL tư, pha 1b) | https://www.seikowatches.com/no-en/news/20230111 | "In 1965, Seiko introduced its, and Japan's, first-ever diver's watch." | 2026-09-28 | chính hãng | Thông báo chính hãng khác khu vực; trang dùng biệt danh "62MAS" nhưng không chứa mã 6217 |
| Chống nước 150m | https://www.seikowatches.com/us-en/products/prospex/special/1965_6L/index | "With an automatic movement and water resistance to 150 meters" | 2026-09-27 | chính hãng | Ghi "150m" đúng số nguồn |
| Tái hiện 62MAS cho dòng Prospex hiện đại | https://www.seikowatches.com/us-en/products/prospex/special/1965_6L/index | "Today, Seiko introduces a re-creation of the 1965 watch, known to fans as the 62MAS." | 2026-09-27 | chính hãng | Trang là bản giới hạn 2023 (6L35) — không viết thành dòng đại trà |
| (cùng claim — URL hai) | https://www.seikowatches.com/us-en/news/20230704 | "Today, Seiko introduces into the Prospex collection a re-creation of the 1965 watch, known to fans as the 62MAS." | 2026-09-27 | chính hãng | Thông cáo 04/07/2023 |
| Kỷ niệm 60 năm đồng hồ lặn Seiko (2025) | https://www.seikowatches.com/us-en/news/2025/pr/20250306_psx | "Three new Prospex creations celebrate the 60th anniversary of the Seiko diver's watch." | 2026-09-27 | chính hãng | Năm 2025 tính từ ngày thông cáo trên trang |
| Bảo tàng Seiko lưu danh đồng hồ lặn 1965, dùng cho thám hiểm Nam Cực | https://museum.seiko.co.jp/en/collections/watch_previousterm/collect015/ | "Designated for use by the 8th Japanese Antarctic Research Expedition." | 2026-09-27 | bảo tàng | Chi tiết bổ trợ; bảo tàng không ghi mã 62MAS hay 6217 |

Năm URL trong khối (bốn chính hãng + một bảo tàng). Ba nhóm claim cốt lõi
(1965, 150m, tái hiện) đều có hai URL trực tiếp trở lên, trong đó bảo tàng là
xác nhận độc lập — tuy vậy trạng thái là CẦN THU HẸP vì claim mã bộ máy và
reference gốc chưa có nguồn đạt (mục 8): khi viết sâu phải bỏ "calibre 6217",
"6217-8000" hoặc đánh dấu riêng là chưa chứng minh.

## 5. tudor-black-bay — CẦN THU HẸP

Trạng thái: CẦN THU HẸP

Bài hiện hữu: `src/content/mauIconic/vi/tudor-black-bay.md` (năm 2012, kim
"snowflake", calibre MT5602, references 79220/79230/79250/M79830). Nguồn
frontmatter hiện có: hai trang tudorwatch.com chung chung — đạt nhưng mờ, các
URL cụ thể dưới đây thay thế khi viết sâu. Bản tiếng Anh: chưa có (chỉ ghi
nhận).

| Claim | URL | Trích nguyên văn | Ngày kiểm | Cấp nguồn | Giới hạn diễn đạt |
|---|---|---|---|---|---|
| Black Bay đầu tiên ra mắt 2012, bezel burgundy, nhận calibre manufacture năm 2016 | https://www.tudorwatch.com/en/watch-family/black-bay | "The original Black Bay first launched in 2012 with a burgundy bezel and it was given the Manufacture Calibre treatment in 2016." | 2026-09-27 | chính hãng | Một URL trực tiếp — cần URL thứ hai trước khi khẳng định dày |
| Reference 7016 (1969) tạo ngôn ngữ kim về sau thành dấu hiệu đồng hồ lặn Tudor | https://www.tudorwatch.com/en/inside-tudor/history/tudor-and-marine-nationale | "In 1969, the reference 7016 introduced a new aesthetic in the brand's range that became the signature of TUDOR diving watches." | 2026-09-27 | chính hãng | Không lùi mốc "snowflake" về trước 1969 |
| Cái tên "Snowflake" là biệt danh giới sưu tầm, không phải thuật ngữ hãng | https://www.tudorwatch.com/en/inside-tudor/history/tudor-and-marine-nationale | "angular hands later nicknamed 'Snowflake' by collectors because of the similarity to the form of a snowflake" | 2026-09-27 | chính hãng | Bài hiện viết kim "snowflake" như đặc trưng chính thức — khi viết sâu phải thêm "biệt danh do giới sưu tầm đặt" |
| Black Bay hiện hành dùng calibre manufacture MT5602-U (COSC và METAS), trữ cót 70 giờ | https://www.tudorwatch.com/en/watches/black-bay/m7941a1a0nu-0001 | "Manufacture Calibre MT5602-U (COSC and METAS certified)" | 2026-09-27 | chính hãng | Bài đang ghi "MT5602" thuần — hiện hành là MT5602-U; ghi kèm hai chứng nhận |
| (cùng claim — URL hai) | https://www.tudorwatch.com/en/watch-family/black-bay | "The Manufacture Calibre MT5602-U, which powers the Black Bay, displays hour, minute and seconds functions." | 2026-09-27 | chính hãng | Bổ trợ cho hàng trên |
| Black Bay 58 giữ thiết kế cốt lõi từ bản 2018, vỏ 39mm | https://www.tudorwatch.com/en/watch-family/black-bay-58 | "The new edition of the Black Bay 58 builds on the 2018 release and retains all the core design elements" | 2026-09-27 | chính hãng | Năm 2018 có nguyên văn; dùng cùng khối URL sản phẩm |
| (cùng claim — trích kích thước) | https://www.tudorwatch.com/en/watch-family/black-bay-58 | "this model has a 39mm diameter case, in keeping with the characteristic proportions of the 1950s" | 2026-09-27 | chính hãng | Bổ trợ cho hàng trên |
| Black Bay 54 có vỏ thép 37mm | https://www.tudorwatch.com/en/watches/black-bay-54 | "Black Bay 54 37mm steel case Steel bracelet" | 2026-09-27 | chính hãng | Bài đang ghi BB54 "39mm" — sai, phải sửa thành 37mm (mục 8) |
| Tudor giao đồng hồ cho Hải quân Pháp từ đầu 1956, cung cấp đến thập niên 1980 | https://www.tudorwatch.com/en/inside-tudor/history/tudor-and-marine-nationale | "TUDOR's special relationship with the French Navy dates back to the beginning of 1956" | 2026-09-27 | chính hãng | Chi tiết bối cảnh; không suy sang hợp đồng quân đội Mỹ |

Tám URL trong khối, tất cả tudorwatch.com — đối chiếu nội bộ của hãng, không
có xác nhận độc lập. Trạng thái CẦN THU HẸP: ba claim cốt lõi (ra mắt 2012,
kim Snowflake, BB54 37mm) mới một URL trực tiếp mỗi claim; hai số liệu trong
bài cần chỉnh (BB54 37mm, MT5602-U); năm ra mắt BB54 2023 chưa tìm được
nguyên văn trên trang đang sống — không khẳng định khi viết sâu nếu không có
thêm nguồn.

## 6. tissot-prx — CẦN THU HẸP

Trạng thái: CẦN THU HẸP

Bài hiện hữu: `src/content/mauIconic/vi/tissot-prx.md` (năm 1978, Powermatic
80, Nivachron). Nguồn frontmatter hiện có: trang bộ sưu tập PRX — đạt, giữ
lại. Bản tiếng Anh: chưa có (chỉ ghi nhận).

| Claim | URL | Trích nguyên văn | Ngày kiểm | Cấp nguồn | Giới hạn diễn đạt |
|---|---|---|---|---|---|
| Tissot ra mắt PRX năm 1978; bản hiện đại là bản tôn vinh mẫu gốc | https://www.tissotwatches.com/en-us/collection/main-collections/tissot-prx.html | "Discover the PRX collection, a selection of timeless watches thought as a tribute to the original timepiece from 1978." | 2026-09-27 | chính hãng | Cùng hãng Tissot ở hai URL — đối chiếu nội bộ |
| (cùng claim — URL hai) | https://www.tissotwatches.com/en-us/T1372101111100.html | "In 1978 the Tissot PRX was born, now we celebrate it's comeback." | 2026-09-27 | chính hãng | Trích giữ nguyên chính tả "it's" của trang, kèm "[sic]" khi dẫn |
| PRX hiện đại có bản quartz và bản Powermatic 80 tự động | https://www.tissotwatches.com/en-us/collection/main-collections/tissot-prx.html | "Now available in quartz or powered by our automatic Powermatic 80 movement." | 2026-09-27 | chính hãng | Hàng này chỉ nói lựa chọn hiện nay; bộ máy bản 1978 có nguồn riêng ở hàng dưới (mở cấm pha 1b) |
| Powermatic 80 cho trữ cót 80 giờ | https://www.tissotwatches.com/en-us/T1374071104100.html | "The Powermatic 80 movement boasts 80 hours of power reserve" | 2026-09-27 | chính hãng | Số 80 giờ đúng nguyên văn |
| Powermatic 80 dùng tóc cân bằng Nivachron | https://www.tissotwatches.com/en-us/T1374071104100.html | "The self-winding Powermatic 80 movement delivers reliability and precision thanks to the innovative Nivachron hairspring." | 2026-09-27 | chính hãng | Bổ trợ cho khối ETA dưới |
| Họ calibre C07 của ETA không có hệ điều chỉnh, trữ cót điển hình 80 giờ | https://www.eta.ch/en/mechanical/precision-stability | "The calibres C07.xxx and A31.xxx, among others, are not equipped with a regulator system" | 2026-09-27 | chính hãng (ETA) | ETA không nối tường minh "Powermatic 80 = C07" trên trang — viết "họ C07 của ETA (điều chỉnh bằng laser); Powermatic 80 là tên Tissot dùng", không viết "nền ETA 2824" (mục 8) |
| (cùng khối — trích trữ cót) | https://www.eta.ch/en/mechanical/power-reserve | "(Typical power reserve: 80 h)" | 2026-09-27 | chính hãng (ETA) | Bổ trợ cho hàng trên |
| Nivachron là tóc cân bằng gốc titan, không từ tính, nhãn hiệu Nivarox-FAR | https://www.eta.ch/en/our-knowhow/mechanical/amagnetic-nivachron | "The Nivachron balance spring is produced in the traditional way using a non-magnetic titanium-based compensating alloy." | 2026-09-27 | chính hãng (ETA) | Không liệt kê thêm tác dụng nếu không trích được |
| (cùng claim — trích thương hiệu) | https://www.eta.ch/en/our-knowhow/mechanical/amagnetic-nivachron | "The name Nivachron is an internationally-registered trademark by Nivarox-FAR." | 2026-09-27 | chính hãng (ETA) | Bổ trợ cho hàng trên |
| Tên PRX: PR = precise và robust, X = số La Mã 10 và áp suất 10 bar | https://www.tissotwatches.com/en-us/T9312074135100.html | ""PR" stands for "precise" and "robust". The "X" stands for the Roman numeral ten and the pressure of 10 bar" | 2026-09-28 | chính hãng | Trang PRX Gold 35mm (T9312074135100), phần mô tả; phiên bản de-de cùng mẫu xác nhận cùng đoạn — mở cấm mục 8.1 |
| Bản PRX gốc 1978 là mẫu quartz | https://www.tissotwatches.com/en-us/T9312074135100.html | "In 1978, Tissot created a quartz model that featured a slim case, narrow hour markers and a steel bracelet." | 2026-09-28 | chính hãng | Trang chính hãng phát biểu trực tiếp về mẫu 1978 — mở cấm mục 8.1; pressroom bổ trợ nhưng không nói quartz |
| Powermatic 80 là bước phát triển từ calibre 2824 của ETA | https://pressroom.tissotwatches.com/powermatic80/ | "A technical evolution of the famous 2824 caliber, created through Tissot's collaboration with the manufacturer ETA." | 2026-09-28 | chính hãng | Tissot Pressroom, bài về Powermatic 80 — mở cấm mục 8.1; pressroom cùng tổ chức Tissot |
| PRX vỏ mảnh, dây thép liền vỏ, mang ngôn ngữ mẫu 1978 | https://www.tissotwatches.com/en-us/T1372101111100.html | "A tapered and slim case and a solid, yet ergonomic stainless steel integrated bracelet make the PRX an iconic blast from the past..." | 2026-09-27 | chính hãng | Cụm "blast from the past" là lời trang của hãng — dịch trung tính "gợi mẫu cũ" |
| (cùng claim — trích kích thước bản 35mm) | https://www.tissotwatches.com/en-us/T1372101111100.html | "The new PRX is exactly the same size as the original watch from 1978: 35mm - making it even more desirable." | 2026-09-27 | chính hãng | Chỉ khẳng định bản 35mm same-size bản gốc; không suy rộng sang các cỡ khác |

Mười bốn hàng, bảy URL (năm tissotwatches.com gồm cả pressroom + hai eta.ch).
Pha 1b mở cấm ba mệnh đề (tên P/R/X, quartz bản gốc 1978, nền 2824 — đã có
nguồn chính hãng, ngày kiểm 28/09); mệnh đề "độc quyền của Tissot" bị loại có
căn cứ (mục 8.1). Trạng thái vẫn CẦN THU HẸP: toàn bộ nguồn thuộc Swatch
Group — chưa có nguồn độc lập khác tổ chức.

## 7. orient-bambino — CẦN THU HẸP

Trạng thái: CẦN THU HẸP

Bài hiện hữu: `src/content/mauIconic/vi/orient-bambino.md` (calibre F6724,
40 giờ, kính vòm, 40,5mm/38mm). Nguồn frontmatter hiện có: một tạp chí đồng hồ
(Monochrome), một trang hướng dẫn thương hiệu (WatchRanker) và một wiki
(Relojes Wiki) — cả ba KHÔNG đạt chuẩn nguồn của gói: tạp chí và wiki không
được dùng làm nguồn duy nhất cho thông số, trang hướng dẫn thuộc loại cửa
hàng/hướng dẫn. Toàn bộ phải thay bằng nguồn dưới đây khi viết sâu. Bản tiếng
Anh: chưa có (chỉ ghi nhận).

| Claim | URL | Trích nguyên văn | Ngày kiểm | Cấp nguồn | Giới hạn diễn đạt |
|---|---|---|---|---|---|
| Bambino dùng calibre in-house F6724 | https://www.orientwatchusa.com/products/tac08003a0 | "This watch is powered by the in-house caliber F6724, a successor to the original 487-series workhorse movement." | 2026-09-27 | phân phối chính thức | Orient Watch USA thuộc Epson America — nguồn chính thức nhưng là phân phối; cùng một domain ở mọi hàng dưới đây là đối chiếu nội bộ |
| F6724 lên dây bằng tay và có dừng kim giây | https://www.orientwatchusa.com/products/tac08003a0 | "This updated automatic caliber can be hand-wound and features a hacking function, which stops the seconds hand for more precise time-setting." | 2026-09-27 | phân phối chính thức | Bài đã ghi chú các nguồn cũ ghi ngược lại — giữ chú thích này |
| F6724 trữ cót khoảng 40 giờ | https://www.orientwatchusa.com/products/tac08003a0 | "Power Reserve Approximately 40 Hours" | 2026-09-27 | phân phối chính thức | Ghi "khoảng 40 giờ" đúng nguyên văn "Approximately" |
| Orient là thương hiệu bộ máy in-house, ra đời 1950 | https://www.orient-watch.com/en/orient/search/ | "Orient is a brand born in 1950, combining in-house movements with original designs." | 2026-09-27 | chính hãng | Câu nằm ở phần mô tả trang tìm kiếm của site chính hãng (Seiko Epson); giới hạn đó phải ghi khi dẫn |
| Kính khoáng vòm là đặc trưng dòng Bambino | https://www.orientwatchusa.com/products/ra-ac0m03s30b | "The domed mineral crystal is a defining feature of the entire Orient Bambino series." | 2026-09-27 | phân phối chính thức | Bài link sang /co-che/kinh-dong-ho — giữ |
| (cùng claim — URL hai) | https://www.orientwatchusa.com/collections/orient-bambino | "A signature domed crystal, a domed dial, and the ability to wear it anytime, anywhere, and with anything." | 2026-09-27 | phân phối chính thức | Bổ trợ cho hàng trên |
| Dòng Bambino có bản 38mm gọn hơn | https://www.orientwatchusa.com/products/ra-ac0m03s30b | "Everything you want in an Orient Bambino, now in a more compact 38mm form." | 2026-09-27 | phân phối chính thức | Chỉ khẳng định có bản 38mm; mốc năm 2022 không có nguồn (mục 8) |
| Chống nước 30m | https://www.orientwatchusa.com/products/ra-ac0m03s30b | "Water Resistance 30m" | 2026-09-27 | phân phối chính thức | Số 30m đúng nguyên văn |
| (cùng claim — URL hai) | https://www.orientwatchusa.com/products/tac08003a0 | "water resistant to 30m" | 2026-09-27 | phân phối chính thức | Bổ trợ cho hàng trên |
| F6724 xác nhận trên trang chính hãng toàn cầu (miền khác phân phối Mỹ) | https://orient-watch.com/en/orient/collection/classic/classic-and-simple-style-38/RA-AC0M04Y/ | "Calibre Code F6724" | 2026-09-28 | chính hãng | Trang sản phẩm global (bắt buộc giữ dấu "/" cuối); dòng này là "Classic & Simple Style 38" — chính hãng toàn cầu không dùng chữ "Bambino" ở bản tiếng Anh |
| Kính hộp (Box crystal) là kính mặt trước trên bản global | https://orient-watch.com/en/orient/collection/classic/classic-and-simple-style-38/RA-AC0M04Y/ | "Glass Material (Front) Box crystal" | 2026-09-28 | chính hãng | Chính hãng global dùng "Box crystal" (kính hộp), phân phối Mỹ dùng "domed mineral crystal" (kính khoáng vòm) — hai cách gọi, không suy ngược thành cùng một chỉ định kỹ thuật |
| Chống nước 3 bar (30m) theo chính hãng toàn cầu | https://orient-watch.com/en/orient/collection/classic/classic-and-simple-style-38/RA-AC0M04Y/ | "Water Resistance 3 bar (30 m)" | 2026-09-28 | chính hãng | Khớp số 30m của phân phối Mỹ; cỡ vỏ global ghi 38.4 mm |
| Cách gọi "Version" (1–7) do chính phân phối chính thức dùng | https://www.orientwatchusa.com/products/tac08003a0 | "Orient Bambino Version 4 Classic Watch" | 2026-09-27 | phân phối chính thức | Tiêu đề sản phẩm (đoạn sau là mã TAC08003A0 đã có trong URL); chỉ chứng minh cách gọi, không chứng minh ranh giới chi tiết giữa các version |
| (cùng claim — URL hai) | https://www.orientwatchusa.com/products/ra-ac0m03s30b | "Orient Bambino Version 7 Classic Watch" | 2026-09-27 | phân phối chính thức | Bổ trợ cho hàng trên |

Mười bốn hàng, năm URL (orientwatchusa.com ×3, orient-watch.com ×2). Pha 1b
bổ sung trang sản phẩm riêng của chính hãng toàn cầu (RA-AC0M04Y — F6724, 3
bar/30 m, Box crystal, 38.4 mm), nhưng trang này đặt tên dòng là "Classic &
Simple Style 38", không dùng chữ "Bambino" ở bản tiếng Anh. Trạng thái vẫn
CẦN THU HẸP: hai miền (Epson America, Seiko Epson) là hai pháp nhân nhưng
cùng lợi ích thương hiệu — không có đối chiếu độc lập ngoài tập đoàn; mẹo chữ
trên mặt số và mốc năm 2022 vẫn không có nguồn đạt (mục 8).

## 8. Claim bị loại, chưa chứng minh và điều cấm viết

### 8.1 Claim bị loại (bài đang viết nhưng không có nguồn đạt — phải sửa/bỏ khi viết sâu)

| Claim trong bài hiện có | Phán | Căn cứ |
|---|---|---|
| "dãy núi Hyūga" là nguồn cảm hứng mặt số Snowflake | LOẠI — sai địa danh | Bốn trang chính hãng đều ghi dãy núi Hotaka nhìn từ Shinshu Watch Studio (Shiojiri, Nagano); không trang nào nói Hyūga (tỉnh Miyazaki, Kyushu) |
| Black Bay 54 cỡ "39mm" | LOẠI — sai số | trang chính hãng ghi "Black Bay 54 37mm steel case"; bộ lọc đường kính cũng là 37 |
| Black Bay dùng "MT5602" thuần | LOẠI ở dạng cũ — cập nhật | trang hiện hành ghi MT5602-U (COSC và METAS); mẫu MT5602 cũ đã rút khỏi site |
| Kim "snowflake" là đặc trưng chính thức của Tudor | SỬA SẮC THÁI | chính hãng ghi là "later nicknamed 'Snowflake' by collectors" — biệt danh giới sưu tầm |
| Tên PRX: P = precise, R = robust, X = 10 atmosphere | GỠ KHỎI CẤM (pha 1b, 28/09) | trang PRX Gold 35mm chính hãng giải mã nguyên văn ""PR" stands for "precise" and "robust". The "X" stands for the Roman numeral ten and the pressure of 10 bar" — vào bảng claim mục 6; viết đúng theo trích |
| "Bản gốc 1978 dùng bộ máy quartz" | GỠ KHỎI CẤM (pha 1b, 28/09) | trang chính hãng phát biểu trực tiếp "In 1978, Tissot created a quartz model..." — vào bảng claim mục 6 |
| Powermatic 80 "phát triển trên nền calibre 2824 của ETA" | GỠ KHỎI CẤM (pha 1b, 28/09) | pressroom chính hãng: "A technical evolution of the famous 2824 caliber..." — vào bảng claim mục 6 |
| Powermatic 80 là "bộ máy độc quyền của Tissot" | LOẠI CÓ CĂN CỨ (pha 1b) | không trang chính hãng nào khẳng định độc quyền; Swatch Group archive ghi Certina DS-1 Powermatic 80 ("The beating heart of the new trio is a modern Powermatic movement...") — cùng nhóm dùng bộ máy này, mệnh đề độc quyền cấm viết |
| Bambino 38mm ra mắt năm 2022 | GIỮ LOẠI mốc năm — rà lại 28/09 vẫn không có | chính hãng global ghi thông số bản 38mm (38.4 mm) nhưng không ghi năm; chỉ trang bán lẻ/blog ghi "introduced in 2022" — ngoài danh mục |
| Mẹo phân biệt đời Bambino qua chữ "Water Resist"/"Water Resistance" trên mặt số | GIỮ LOẠI — rà lại 28/09 vẫn không có | chính hãng dùng "Water Resistance" làm nhãn thông số, không phải nội dung mặt số; không trang đạt nào nói sự khác chữ |
| 62MAS "calibre 6217" và reference "6217-8000" | GIỮ CHƯA CHỨNG MINH — rà lại 28/09 vẫn không có | rà thêm 15+ trang chính hãng (jp-ja/us-en/global-en/de-de/no-en), sitemap seikousa.com (272 URL), seiko.co.jp, bảo tàng Seiko JP+EN: không trang nào chứa chuỗi "6217"; hãng nhất quán chỉ dùng biệt danh "62MAS". Giữ khóa viết; ghi CAN-KIEM-CHUNG.md |

### 8.2 Tên/reference/năm chưa chứng minh trong frontmatter (không đưa vào pha viết nếu không có hồ sơ nguồn riêng)

- grand-seiko-snowflake: references SBGA407, SBGA413; mốc SBGA211 năm 2017;
  chi tiết "kim Okuribashi"; "mỗi chiếc làm thủ công hơi khác nhau".
- seiko-62mas: references 6105-8000 "Captain Willard" (1970), 6309-7040
  "Turtle" (1976), SKX007 (1996–2019); mốc Apocalypse Now; power_reserve
  "41 giờ".
- tudor-black-bay: references 79220/79230/79250/M79830; mốc BB58 2018 trọn
  bộ biến thể, BB GMT 2018, BB Chrono 2021, BB54 2023; chi tiết kính acrylic
  đổi sapphire.
- tissot-prx: không có reference cụ thể (bản ghi mô tả); chi tiết "so với mức
  42 giờ thông thường".
- orient-bambino: chi tiết V1–V7 phân biệt mặt số; power_reserve "40 giờ" có
  nguồn (mục 7) nhưng cỡ 40,5mm/11,8mm/46mm/21mm chưa có bảng nguồn riêng;
  bản 38mm có thông số chính hãng global 28/09 (38.4 mm, Box crystal) — bài
  ghi "38mm" là cách gọi tròn, ghi chú khi viết sâu.

### 8.3 URL hỏng/không dùng được trong phiên kiểm

Phiên 27/09 (pha 1):

- https://www.grand-seiko.com/us-en/collections/sbga011g — HTTP 200 nhưng
  nội dung là trang 404 (soft-404); không dùng làm nguồn cho SBGA011.
- https://www.grand-seiko.com/us-en/about/caliber/9r65 — 404; đường đúng:
  https://www.grand-seiko.com/us-en/collections/movement/springdrive/9r65
- https://www.tudorwatch.com/en/watches/black-bay-58/m79230n-0001 — "PAGE NOT
  FOUND" (mẫu MT5602 thuần đã rút khỏi site).
- https://media.tudorwatch.com — chỉ còn trang landing, không còn thông cáo.
- https://pressroom.tissotwatches.com/ — chặn truy cập tự động (403) trong
  phiên kiểm.
- federation.horlogerie.com (FHH) — không truy cập được trong phiên (timeout);
  không có mục từ cần thiết cho năm mẫu này nên không chờ.
- web.archive.org — tạm ngừng trong phiên kiểm; không dùng snapshot nào làm
  bằng chứng.

Phiên 28/09 (pha 1b):

- federation.horlogerie.com — lỗi SSL (tên miền không được host); tổ chức
  ngành đúng là FH, fhs.swiss — rà được nhưng không có dữ liệu liên quan.
- eta.ch — timeout trong phiên; các trích ETA trong bảng giữ ngày kiểm
  27/09 khi trang còn truy cập được.
- Smithsonian (collections.si.edu), Espacenet, Justia, bảo tàng Epson — 403;
  MIH (mih.ch) và seiko-watch.co.jp — timeout; seikomuseumginza.jp — DNS lỗi.
- Google Patents — truy cập gián đoạn (503 chống bot): hai văn bằng đọc được
  (US3937001A — ETS S.A., 1972; WO2002004836A2 — Seiko Epson, về lò xo chính)
  không phát biểu hành vi "kim trượt" hay thông số ±1s/ngày; 96 kết quả nhãn
  "Montres Tudor" không có văn bằng trước 1997 — không dùng làm chứng cứ.

### 8.4 Điều cấm viết khi mở pha viết sâu

- Cấm mọi superlative không nguồn: "một trong những lume tốt nhất ngành",
  "được săn đón nhất", "biểu tượng của Tudor", "mẫu được nhận diện nhiều
  nhất" — viết lại thành mô tả trung tính hoặc bỏ.
- Cấm suy năm từ "thập niên" mơ hồ: mọi năm (1965, 1969, 1978, 2004, 2005,
  2012, 2016, 2018, 2025) phải trỏ về trích cụ thể trong bảng.
- Cấm đưa giá bán, giữ giá, đầu tư, lời khuyên mua vào bài viết sâu.
- Cấm dùng Wikipedia, cửa hàng, tạp chí, wiki, diễn đàn làm nguồn duy nhất
  cho năm, reference, calibre, thông số.
- Cấm gọi hai URL cùng hãng là "xác nhận độc lập".
- Cấm gọi cặp nguồn hãng + nhà phân phối chính thức là "độc lập" — hai pháp
  nhân (Seiko Epson, Epson America) cùng có lợi ích thương hiệu; chuẩn độc
  lập cần đối chiếu từ tổ chức ngoài lợi ích (bảo tàng, tổ chức ngành).

## 9. Bảng chống trùng nội bộ

| Mẫu | Bài hiện có | Thương hiệu | Timeline | Sơ đồ tiến hóa | Bài cơ chế/từ điển liên quan | Ảnh L3 |
|---|---|---|---|---|---|---|
| Snowflake | [bài mẫu](/mau-iconic/grand-seiko-snowflake) | [Grand Seiko](/thuong-hieu/grand-seiko) | không có mốc riêng | không có dataset | [cơ chế chuyển động](/co-che/chuyen-dong-co), [trữ cót](/tu-dien/power-reserve) | có ảnh OG riêng |
| 62MAS | [bài mẫu](/mau-iconic/seiko-62mas) | [Seiko](/thuong-hieu/seiko) | mốc [Seiko Astron](/lich-su) là quartz 1969 — khác mẫu, không trùng | không có dataset | [chống nước](/co-che/chong-nuoc), [bezel](/tu-dien/bezel), [hướng dẫn mức chống nước](/huong-dan/muc-chong-nuoc) | có ảnh OG riêng |
| Black Bay | [bài mẫu](/mau-iconic/tudor-black-bay) | [Tudor](/thuong-hieu/tudor) | không có mốc riêng | dataset Submariner là Rolex — khác hãng, không trùng | [chống nước](/co-che/chong-nuoc), [bezel](/tu-dien/bezel) | có ảnh OG riêng |
| PRX | [bài mẫu](/mau-iconic/tissot-prx) | [Tissot](/thuong-hieu/tissot) | không có mốc riêng | không có dataset | [trữ cót](/co-che/tru-cot), [ETA/Sellita](/co-che/eta-sellita), [bộ máy in-house](/co-che/bo-may-in-house) | có ảnh OG riêng |
| Bambino | [bài mẫu](/mau-iconic/orient-bambino) | [Orient](/thuong-hieu/orient) | không có mốc riêng | không có dataset | [kính đồng hồ](/co-che/kinh-dong-ho), [bộ máy in-house](/co-che/bo-may-in-house), [núm vặn](/tu-dien/num-van), [dây vỏ](/tu-dien/day-vo) | có ảnh OG riêng |

Bài liên kết chéo hiện có từ frontmatter (đều tồn tại, đã kiểm trong dist):
Snowflake → [Credor Eichi II](/mau-iconic/credor-eichi-2),
[Minase Horizon](/mau-iconic/minase-horizon); 62MAS →
[Rolex Submariner](/mau-iconic/rolex-submariner),
[Doxa SUB 300](/mau-iconic/doxa-sub-300); Black Bay →
[Rolex Submariner](/mau-iconic/rolex-submariner); PRX →
[Patek Nautilus](/mau-iconic/patek-nautilus); Bambino →
[Timex Marlin](/mau-iconic/timex-marlin),
[Swatch Sistem51](/mau-iconic/swatch-sistem51).

Không mẫu nào trong năm có dataset sơ đồ tiến hóa hay mốc dòng thời gian riêng
— gói viết sâu không trùng dữ liệu hiện có. Ảnh L3 (ảnh chia sẻ OG trong
`src/data/l3-share-images.json`) chỉ là ảnh chia sẻ mạng xã hội, không phải
nội dung bài.

## 10. Ghi nhận phạm vi Việt/Anh

Cả năm mẫu hiện chỉ có bài tiếng Việt (`/mau-iconic/<slug>/`); chưa có bản
tiếng Anh và chưa có route EN. Khi mở pha viết, phạm vi Anh dự kiến tương
đương bài Việt: cùng cấu trúc mục, cùng bảng nguồn (trích nguyên văn tiếng Anh
dùng lại trực tiếp), route EN tạo qua `contentRoutes.ts` theo khuôn hiện hành
của dự án. Việc tạo tệp và route EN nằm ngoài pha hồ sơ này.

## 11. Việc tiếp theo khi mở pha viết

Sau pha 1b, cả năm mẫu vẫn CẦN THU HẸP vì không mẫu nào có nguồn độc lập
ngoài tập đoàn của mình: chưa mở pha viết song ngữ cho mẫu nào cho đến khi có
mẫu đạt chuẩn hai nguồn độc lập khác cả tổ chức và miền.

1. Thu hẹp theo mục 8.1 trước khi đặt bút: sửa "Hyūga" → "Hotaka", BB54 37mm,
   MT5602-U, bỏ mệnh đề "độc quyền" của Powermatic 80, bỏ mẹo chữ mặt số và
   mốc 2022 của Bambino 38mm; các mệnh đề PRX đã mở cấm viết theo trích mục 6.
2. Thay nguồn Bambino trong frontmatter bằng nguồn mục 7; ghi chú tên dòng
   chính hãng toàn cầu ("Classic & Simple Style 38") cạnh tên "Bambino".
3. Tìm nguồn độc lập (bảo tàng, tổ chức ngành) cho các claim lịch sử còn chỉ
   có nguồn nội bộ hãng: Snowflake (cảm hứng mặt số, kim trượt, 9R65),
   Tudor (2012, kim Snowflake, BB54).
4. Ghi mã "6217"/"6217-8000" vào CAN-KIEM-CHUNG.md như mục 8.1 đã nêu.
5. Với mỗi bài viết sâu: Việt trước, Anh theo khuôn song ngữ hiện hành, không
   thêm route mới ngoài cặp bài.

## 12. Pha 1b — bổ sung và thu hẹp nguồn (TXN-20260926-330, 28/09/2026)

Pha tiếp nối hồ sơ đã phát hành tại `9b89d5d`; chỉ sửa hồ sơ nguồn, không
viết bài, không tạo tệp mới ngoài output nội bộ. Kết quả theo mẫu:

- **grand-seiko-snowflake** — giữ CẦN THU HẸP. Rà các kênh độc lập ngoài
  Seiko Group cho cảm hứng Hotaka/Shinshu, kim giây trượt, 9R65 ±1s/ngày:
  không kênh nào cho nguyên văn đạt (bảo tàng trong danh mục không lưu hồ sơ
  về Snowflake; FHH lỗi SSL; bằng sáng chế đọc được không phát biểu claim;
  nguồn chứa thông số đều cùng tập đoàn hoặc tạp chí/bán lẻ bị cấm).
- **seiko-62mas** — giữ CẦN THU HẸP. Mã "6217"/"6217-8000" vẫn không có nguồn
  đạt sau khi rà lại toàn bộ trang chính hãng đa khu vực, sitemap seikousa.com,
  seiko.co.jp và bảo tàng Seiko (JP+EN) — hãng nhất quán không in mã này;
  bổ sung một URL chính hãng khác khu vực cho claim 1965 vào bảng mục 4.
- **tudor-black-bay** — giữ CẦN THU HẸP. Không có nguồn độc lập đạt cho 2012,
  kim Snowflake 1969, BB58 39mm, BB54 37mm (bảo tàng không có dữ liệu; bằng
  sáng chế kiểu dáng Tudor không chứng minh các claim). Dữ kiện cần sửa giữ
  nguyên: BB54 37mm (bài ghi 39mm — sai), calibre hiện hành MT5602-U.
- **tissot-prx** — bổ sung nguồn lớn nhất pha này: tên P/R/X, quartz bản gốc
  1978 và nền ETA 2824 đều đã có nguyên văn chính hãng (ngày kiểm 28/09) —
  gỡ ba mục khỏi cấm viết; mệnh đề "độc quyền của Tissot" bị loại có căn cứ
  (Swatch Group archive cho thấy Certina dùng Powermatic 80). Trạng thái vẫn
  CẦN THU HẸP: toàn bộ nguồn Swatch Group, chưa có độc lập.
- **orient-bambino** — bổ sung trang sản phẩm chính hãng toàn cầu
  (RA-AC0M04Y: F6724, 3 bar/30 m, Box crystal, 38.4 mm) làm cột mốc đối chiếu
  miền thứ hai cạnh phân phối Mỹ; hai pháp nhân cùng lợi ích thương hiệu nên
  chưa tính là độc lập; mẹo chữ mặt số và mốc 2022 rà lại vẫn không có nguồn.
- Không mẫu nào hạ xuống CHƯA ĐỦ NGUỒN: mỗi mẫu vẫn có nguồn đạt cho phần lớn
  claim cốt lõi; các điểm khóa giữ nguyên trạng thái khóa.
