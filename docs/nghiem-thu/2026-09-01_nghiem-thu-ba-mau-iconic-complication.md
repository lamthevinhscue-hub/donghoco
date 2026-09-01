# Biên bản nghiệm thu — Bổ sung ba mẫu iconic trụ cột và hoàn thiện bốn cơ chế còn trống

- **Ngày:** 01/09/2026
- **Phạm vi gói:** 3 bài mẫu iconic mới + nối liên kết cho 4 cơ chế còn trống + đồng bộ hồ sơ trạng thái.
- **Commit nền khi bắt đầu gói:** `2cee119` — "feat(content): hoàn thiện liên kết cơ chế" (working tree sạch, 0 tệp sửa tại thời điểm bắt đầu).
- **Trạng thái cuối gói: CHƯA COMMIT, CHƯA PUSH** — chờ anh Vinh kiểm độc lập.

---

## 1. Ba bài mới tạo

| Tệp mới (`src/content/mauIconic/vi/`) | Tiêu đề | Category | year |
|---|---|---|---|
| `rolex-gmt-master.md` | Rolex GMT-Master — Đồng hồ của phi công vượt múi giờ | `pilot` | 1955 |
| `audemars-piguet-royal-oak-perpetual-calendar.md` | Royal Oak Perpetual Calendar — Nhánh phức tạp của biểu tượng thép | `phức tạp cao cấp` | (không điền) |
| `patek-philippe-grandmaster-chime.md` | Patek Philippe Grandmaster Chime — Đỉnh điểm chuông của hãng | `phức tạp cao cấp` | (không điền) |

Frontmatter thông số: **không tự điền** trường thay đổi theo phiên bản hoặc chưa kiểm chứng. Cụ thể:
- `rolex-gmt-master`: có `year: 1955` (nguồn chính hãng ghi rõ); **không** `movement`, `power_reserve`, `water_resistance`, `references`.
- `audemars-piguet-royal-oak-perpetual-calendar`: **không** `year` (nguồn hãng chỉ ghi mốc "giữa 1983 và 1984" cho cả chuỗi bổ sung lịch — không quy về một năm được), không `movement`, `power_reserve`, `water_resistance`, `references`.
- `patek-philippe-grandmaster-chime`: có `movement: "Calibre GS AL 36-750 QIS FUS IRM"` (nguồn chính hãng nguyên văn cho ref 6300); không `year`, `power_reserve`, `water_resistance`, `references`.

Danh mục mục 22 trong `CAN-KIEM-CHUNG.md` đã được cập nhật để phản ánh trạng thái trống này (26 → 29 bài), đúng nguyên tắc "tuyệt đối không tự điền".

### Nguồn của từng bài (tất cả nguồn chính hãng)

**rolex-gmt-master:**
1. Rolex — GMT-Master II: `https://www.rolex.com/en-us/watches/gmt-master-ii`
2. Rolex Newsroom — GMT-Master II: `https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii`

**audemars-piguet-royal-oak-perpetual-calendar:**
1. Audemars Piguet — Royal Oak Perpetual Calendar: `https://www.audemarspiguet.com/us/en/watch-collection/royal-oak/26674ST.OO.1320ST.01`
2. Audemars Piguet Chronicles — Royal Oak Calendar Watches 1983–1996: `https://apchronicles.audemarspiguet.com/en/article/royal-oak-calendar-watches-1983-1996` *(bổ sung ở vòng sửa nội dung cùng ngày — nguồn lịch sử trực tiếp cho các mốc 1983–1984; URL bộ sưu tập Royal Oak chung được bỏ vì không bổ sung căn cứ cụ thể cho bài)*

**patek-philippe-grandmaster-chime:**
1. Patek Philippe — Grand Complications ref. 6300GR-001: `https://www.patek.com/en/collection/grand-complications/6300GR-001`
2. Patek Philippe — Bộ sưu tập Grand Complications: `https://www.patek.com/en/collection/grand-complications`

### Phương pháp xác minh URL

- Các URL **AP và Patek** phản hồi HTTP 200 khi kiểm bằng `curl -sIL` (kèm hai URL bổ sung ở vòng sửa: trang AP Chronicles và trang "The Patek Philippe Sound" của Patek — đều 200; nội dung trang Chronicles được xác minh bằng tải HTML nguyên văn do công cụ đọc trang lỗi mạng tạm thời với tên miền apchronicles).
- Các URL **rolex.com và newsroom.rolex.com** trả **403 cho curl** (Rolex chặn truy vấn bot), nhưng **đã xác minh được nội dung thật** bằng trình đọc trang (trình duyệt headless): nội dung nguyên văn được trích đầy đủ — tức trang truy cập được như người dùng thực. Ghi rõ ở đây để không nhầm 403 curl với URL chết.

## 2. Bảng dữ kiện trọng yếu (dữ kiện → bài → URL → kết luận)

| # | Dữ kiện ghi trong bài | Bài | URL nguồn | Kết luận |
|---|---|---|---|---|
| 1 | GMT-Master ra mắt **1955**, làm công cụ cho hàng không | rolex-gmt-master | rolex.com/en-us/watches/gmt-master-ii | Nguyên văn nguồn: "The launch of the GMT-Master in 1955" — **GHI** |
| 2 | Được phi công **Pan American World Airways (Pan Am)** lựa chọn | rolex-gmt-master | như trên | Nguyên văn: "Adopted by the flight crews of Pan American World Airways, better known as Pan Am" — **GHI** |
| 3 | GMT = Greenwich Mean Time; Greenwich chọn làm kinh tuyến gốc từ 1884 | rolex-gmt-master | như trên | Nguyên văn nguồn có đủ hai mốc — **GHI** |
| 4 | Kim 24 giờ đầu mũi tam giác + vành xoay 24 giờ hai chiều | rolex-gmt-master | như trên | Nguyên văn nguồn mô tả hai chi tiết này — **GHI** |
| 5 | Vành hai màu **đỏ – xanh** phân biệt giờ ngày/đêm | rolex-gmt-master | rolex.com + newsroom.rolex.com | Nguồn xác nhận cặp màu đỏ – xanh và chức năng phân biệt ngày – đêm — **GHI** (không dùng biệt danh thị trường, xem mục 8) |
| 6 | **GMT-Master II ra 1982** — kim giờ địa phương chỉnh độc lập từng giờ, không dừng máy; khác biệt cốt lõi với bản đời đầu | rolex-gmt-master | rolex.com/en-us/watches/gmt-master-ii | Nguyên văn: "The GMT-Master II, launched in 1982... adjusted in one-hour increments – independently of the other hands and without stopping the watch" — **GHI**, tách rõ hai thế hệ |
| 7 | 2014: cặp màu đỏ – xanh đời đầu trở lại trên vành gốm Cerachrom | rolex-gmt-master | như trên | Nguyên văn nguồn: "The version released in 2014 revived the emblematic colour pairing found on the original watch" — **GHI** |
| 8 | Phức tạp đầu tiên Royal Oak tiếp nhận là **lịch**; giữa **1983 và 1984** mẫu lần lượt thêm lịch ngày–thứ, tuần trăng rồi lịch vạn niên | royal-oak-perpetual-calendar | apchronicles.audemarspiguet.com/en/article/royal-oak-calendar-watches-1983-1996 | Nguyên văn trang Chronicles: "The first complication adopted by the Royal Oak was the calendar. Between 1983 and 1984... successively enriched with Day-Date, moon phase and perpetual calendar functions" — **GHI**, diễn đạt đúng thứ tự |
| 9 | Royal Oak Perpetual Calendar là nhánh phức tạp của Royal Oak, giữ ngôn ngữ Genta (bezel bát giác 8 ốc, Tapisserie, kim baguette) | royal-oak-perpetual-calendar | AP trang sản phẩm + Bộ sưu tập Royal Oak | Nguồn hãng xếp mẫu này trong bộ sưu tập Royal Oak; mô tả thiết kế khớp thực tế trang — **GHI** |
| 10 | Grandmaster Chime là **mẫu phức tạp nhất của Patek Philippe: 20 phức tạp, 5 chức năng âm thanh** | grandmaster-chime | patek.com/en/collection/grand-complications/6300GR-001 | Nguyên văn nguồn: "most complicated Patek Philippe wristwatch (20 complications)" + "five acoustic functions" — **GHI** |
| 11 | Cơ chế gõ giờ **ba gong, năm chế độ**: grande sonnerie, petite sonnerie, minute repeater, alarm with time strike, date repeater | grandmaster-chime | như trên | Nguyên văn nguồn liệt kê đủ 5 chế độ — **GHI**; phần bài phân biệt repeater ("hỏi mới trả lời") vs sonnerie ("tự báo giờ") |
| 12 | Hai chức năng âm thanh **độc quyền có bằng sáng chế**: báo thức và date repeater | grandmaster-chime | như trên | Nguyên văn nguồn: "two patented world exclusives" — **GHI** |
| 13 | **Vỏ hai mặt lật được** — mặt giờ và mặt lịch | grandmaster-chime | như trên | Nguyên văn nguồn: "reversible double-sided case" — **GHI** |
| 14 | Lịch vạn niên nhảy tức thời, **năm bốn chữ số**, tuần trăng, múi giờ thứ hai | grandmaster-chime | như trên | Nguyên văn nguồn liệt kê các hiển thị này — **GHI** |
| 15 | Bộ máy **GS AL 36-750 QIS FUS IRM**, hơn 1.300 bộ phận, lên dây thủ công | grandmaster-chime | như trên | Nguyên văn nguồn: "Calibre GS AL 36-750 QIS FUS IRM", "1,366 parts" — **GHI** (frontmatter movement điền đúng tên này) |
| 16 | **Không chống nước** — chỉ bảo vệ khỏi ẩm và bụi | grandmaster-chime | như trên | Nguyên văn nguồn: "Humidity- and dust-protected only (not water-resistant)" — **GHI** ở phần "Giới hạn kỹ thuật thú vị"; không điền trường `water_resistance` |

## 3. Liên kết biên tập thêm trong gói (16 mục frontmatter)

### Chiều cơ chế ↔ mẫu — 5 cặp hai chiều mới (8 + 2 mục)

| Cặp | Chiều cơ chế → mẫu (tệp sửa) | Chiều mẫu → cơ chế (tệp sửa) |
|---|---|---|
| `gmt` ⇄ `rolex-gmt-master` | `coChe/vi/gmt.md` (+1 mục) | bài mới (+1 mục) |
| `perpetual-calendar` ⇄ `audemars-piguet-royal-oak-perpetual-calendar` | `coChe/vi/perpetual-calendar.md` (+1 mục) | bài mới (+1 mục) |
| `perpetual-calendar` ⇄ `patek-philippe-grandmaster-chime` | `coChe/vi/perpetual-calendar.md` (+1 mục) | bài mới (+1 mục) |
| `diem-chuong` ⇄ `patek-philippe-grandmaster-chime` | `coChe/vi/diem-chuong.md` (+1 mục) | bài mới (+1 mục) |
| `bo-thoat` ⇄ `freak` | `coChe/vi/bo-thoat.md` (+1 mục) | `mauIconic/vi/freak.md` (+1 mục `relatedMechanisms`) |

**Căn cứ cặp `bo-thoat` ⇄ `freak` (đề yêu cầu rà và chỉ nối khi có căn cứ):** trong `freak.md` có sẵn ba chỗ về silic — "Dùng silic — một trong những đồng hồ đầu tiên dùng silic trong movement thương mại", "Silic thương mại — dây tóc và bộ phận escape bằng silic... Freak tiên phong", "Freak DIAMonSIL (2007)"; trong `bo-thoat.md` dòng mốc lịch sử có sẵn "2001: Ulysse Nardin Freak dùng silicon trong bộ thoát → không nhiễm từ, không cần dầu". Hai bài đã cùng nói về một dữ kiện từ trước — **căn cứ đủ, nối hai chiều**, nhãn ghi Freak là cách tiếp cận bộ thoát khác bộ thoát bánh ác truyền thống (không viết hai bài giống hệt nhau).

### Chiều mẫu ↔ mẫu — 6 mục mới (4 chiều đi + 2 chiều ngược)

| Từ | Đến | Loại | Tệp sửa |
|---|---|---|---|
| `rolex-gmt-master` | `rolex-submariner` | hai chiều | bài mới + `rolex-submariner.md` |
| `rolex-gmt-master` | `iwc-mark-xi` | một chiều (biên tập có hướng) | bài mới |
| `audemars-piguet-royal-oak-perpetual-calendar` | `royal-oak` | hai chiều | bài mới + `royal-oak.md` |
| `patek-philippe-grandmaster-chime` | `patek-nautilus` | một chiều (biên tập có hướng) | bài mới |

**Lý do:** GMT-Master và Submariner là hai mẫu Rolex Oyster chuyên nghiệp sinh cách nhau hai năm (1955/1953) — dữ kiện năm có sẵn ở cả hai bài; Royal Oak Perpetual Calendar là nhánh mọc từ Royal Oak (bắt buộc theo đề); hai cặp một chiều giữ biên tập có hướng — người đọc từ Grandmaster Chime được dẫn sang mặt "phổ thông" của Patek Philippe nhưng không ngược lại, vì Nautilus không có nội dung dẫn sang Grand Complication.

**Cập nhật `updated`:** 7 tệp sửa được nâng `updated: "2026-09-01"` (4 bài cơ chế, freak, submariner đã ở 09-01 nên giữ, royal-oak từ 08-31 → 09-01).

## 4. Trạng thái bốn cơ chế trước — sau

| Cơ chế | Trước gói | Sau gói |
|---|---|---|
| `gmt` | không có quan hệ | ⇄ `rolex-gmt-master` |
| `perpetual-calendar` | không có quan hệ | ⇄ RO Perpetual Calendar + ⇄ Grandmaster Chime |
| `diem-chuong` | không có quan hệ | ⇄ Grandmaster Chime |
| `bo-thoat` | không có quan hệ | ⇄ `freak` |

## 5. Số liệu trước — sau (đếm từ source và từ build)

| Chỉ số | Trước (commit nền `2cee119`) | Sau gói |
|---|---:|---:|
| Bài mẫu iconic | 66 | **69** |
| Tổng bài nội dung | 204 | **207** |
| `relatedModels` mẫu ↔ mẫu | 125 mục / 66 bài | **131 mục / 69 bài** |
| `relatedModels` từ bài cơ chế | 24 mục / 14 bài | **29 mục / 18 bài** |
| `relatedMechanisms` trên bài iconic | 24 mục / 21 bài | **29 mục / 24 bài** |
| Cặp hai chiều cơ chế ↔ mẫu (script đếm) | 24 | **29** |
| Trang build | 218 | **221** |
| Liên kết nội bộ hợp lệ | 14.403 | **14.656** |

Giải thích số liên kết tăng +253: 16 mục frontmatter mới render 16 link khối "Kết nối cùng chủ đề" + 3 trang mới nhân khối liên kết giao diện (~79 link/trang: điều hướng, chân trang, cụm gợi ý). Số chênh khớp: 16 + 3 × 79 = 253.

## 6. Kiểm tra tự động

- `node scripts/check-editorial-links.mjs` — **ĐẠT**: 18 bài cơ chế, 69 bài iconic, **29 cặp hai chiều hợp lệ**, không slug hỏng, không trùng, không thiếu relation hay chiều ngược.
- `npm run check` — **ĐẠT** toàn chuỗi (nội dung tĩnh + WCAG tự động + liên kết biên tập).
- `npm run build` — **ĐẠT**: 221 trang, Pagefind index 221 trang, sitemap sinh; kiểm link nội bộ: "OK: Không phát hiện link nội bộ hỏng. Đã quét 221 trang HTML, 14656 link."
- `git diff --check` — sạch (không lỗi whitespace).
- `git status --short` — đúng 7 tệp sửa (`M`) + 3 tệp mới (`??`) thuộc phạm vi + `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` + `CAN-KIEM-CHUNG.md` + biên bản này; các `??` docs/ và `output/` cũ của anh không bị đụng.

## 7. Nghiệm thu giao diện (Playwright trên bản preview sau build, port 4346)

| Phép kiểm | Kết quả |
|---|---|
| 3 bài mới render đúng h1, dữ kiện cốt lõi có mặt, khối "Kết nối cùng chủ đề" hiện | ĐẠT (3/3; link liên quan mỗi bài 7–8) |
| Khối liên kết trang GMT-Master trỏ đúng `/mau-iconic/rolex-submariner`, `/mau-iconic/iwc-mark-xi`, `/co-che/gmt`, `/thuong-hieu/rolex` | ĐẠT (thiếu 0/4) |
| 4 trang cơ chế hiện chiều ngược tới bài mẫu tương ứng | ĐẠT (4/4; perpetual-calendar có cả 2 mẫu) |
| Trang thương hiệu tự đối chiếu lấy được bài mới: `/thuong-hieu/rolex`, `/thuong-hieu/audemars-piguet`, `/thuong-hieu/patek-philippe` | ĐẠT (3/3, không cần sửa template) |
| Trang tổng hợp `/mau-iconic` liệt kê đủ 3 bài mới | ĐẠT (3/3) |
| SEO bài mới: canonical đúng miền production, og:title đúng, og:image có | ĐẠT |
| Sáng/tối: nền body `rgb(251,251,248)` ↔ `rgb(17,21,25)` khi bật `dark` | ĐẠT |
| Desktop 1280px: không tràn ngang | ĐẠT |
| 375px: 3 bài mới + `/co-che/diem-chuong` đều scrollWidth = innerWidth = 375 | ĐẠT (không tràn) |
| Bàn phím: 25 lần Tab trên bài Grandmaster Chime — focus rơi vào phần tử hiển thị (A) | ĐẠT |
| Pagefind: tìm "Grandmaster Chime" = 6 kết quả, "GMT-Master" = 5, "Royal Oak Perpetual Calendar" = 8 | ĐẠT |
| 404 ngoài hai lỗi cố hữu (`favicon.ico`, `_vercel/insights`) | 0 lỗi |

## 8. Giới hạn của gói

1. **Không dùng biệt danh thị trường:** đề nhắc vành "Pepsi" — nguồn chính hãng Rolex chỉ gọi cặp màu "đỏ – xanh" và giải thích chức năng phân biệt ngày/đêm; biệt danh "Pepsi" là cách gọi cộng đồng, không xuất hiện trong nguồn nào của bài, nên bài mô tả bằng tên màu và chức năng thay vì biệt danh (đúng nguyên tắc không dùng biệt danh làm dữ kiện).
2. **Không nêu số reference cho Rolex:** đề nhắc phân biệt với "ref 6542 đời đầu" — nguồn chính hãng dùng cho bài (trang GMT-Master II + Newsroom) không ghi số reference đời đầu nào, nên bài phân biệt hai thế hệ bằng mốc 1955/1982 và cơ chế kim giờ độc lập, không nêu số ref. Khi có nguồn xác nhận được số ref, anh có thể bổ sung sau.
3. **Royal Oak Perpetual Calendar không gắn năm cụ thể trong frontmatter:** nguồn hãng chỉ ghi mốc "giữa 1983 và 1984" cho cả chuỗi bổ sung lịch — không quy về một năm; bài ghi đúng nguyên văn mốc này trong thân.
4. **Không có dữ kiện giá, sản lượng hay tư vấn đầu tư** trong cả 3 bài — Grandmaster Chime được trình bày là "tuyên ngôn năng lực chế tác", "không phải lựa chọn mua thông thường", đúng đề.
5. Trang Grandmaster Chime đề cập âm sắc repeater ("nốt rõ ràng, tách bạch, ngân dài") là **hướng dẫn nghe chung** của phức tạp điểm chuông (đã có trong bài cơ chế `diem-chuong`), không phải thông số đo đếm của mẫu cụ thể.

## 9. Vòng sửa nội dung (cùng ngày 01/09/2026 — theo yêu cầu anh, chỉ câu chữ và nguồn)

Không đổi số lượng bài, slug, liên kết biên tập, schema, script hay giao diện. Các sửa:

1. **Định nghĩa đúng grande/petite sonnerie** trong cả `coChe/vi/diem-chuong.md` và bài Grandmaster Chime (câu sai cũ "petite sonnerie gõ tự động nhưng chỉ giờ, bỏ các quý" đã bỏ): **grande sonnerie** tự động điểm giờ và quarter — qua mỗi quarter lặp lại số giờ rồi điểm quarter; **petite sonnerie** cũng tự động theo giờ và quarter nhưng tại các quarter chỉ điểm phần quarter, không lặp lại số giờ; **minute repeater** là chức năng kích hoạt theo yêu cầu, điểm giờ, quarter và phút lẻ từ quarter gần nhất. Định nghĩa khớp nguyên văn trang chính hãng Patek ("The Grande Sonnerie chimes both hours and quarters, while the Petite Sonnerie only chimes the quarters"; repeater "manually activated"; phút lẻ "since the last quarter").
2. **Phần phân biệt số gong trong `diem-chuong.md`**: bỏ diễn đạt cũ ngầm hiểu minute repeater "đầy đủ" dùng ba gong — nay ghi rõ minute repeater truyền thống thường dùng **hai gong** (trầm = giờ, cặp cao–trầm = quarter, cao = phút lẻ); một số hệ thống đặc biệt dùng ba gong, Grandmaster Chime là ví dụ riêng của Patek Philippe, không phải cấu hình chung.
3. **Bổ sung nguồn** `Patek Philippe — The Patek Philippe Sound` (`https://www.patek.com/en/manufacture/quality-and-fine-workmanship/the-patek-philippe-sound`, HTTP 200) vào khối `sources` của `diem-chuong.md`.
4. **Phần "Nghe gì khi xem repeater?"** của bài Grandmaster Chime: bỏ câu biến cảm nhận chủ quan thành tiêu chí ("nốt dính/mờ là dấu hiệu cơ cấu chưa đạt") — nay là hướng dẫn trải nghiệm: chú ý thứ tự âm giờ–quarter–phút, độ tách bạch, độ ngân; cảm nhận âm sắc phụ thuộc mẫu, vỏ, không gian và người nghe.
5. **Bài Royal Oak Perpetual Calendar**: sửa đánh máy "đủ đủ đẳng cấp" → "thiết kế thể thao sang trọng đủ sức gánh một trong những phức tạp danh giá nhất đồng hồ cơ"; thay "nền thiết kế đại chúng" → "nền thiết kế thể thao sang trọng"; câu mốc lịch sử nay dẫn thẳng **AP Chronicles**; frontmatter thêm nguồn Chronicles (mục 1 ở trên).
6. **Bài GMT-Master**: thay "dữ kiện lịch sử và nhu cầu sử dụng trùng khớp hoàn toàn" → "dữ kiện lịch sử gắn trực tiếp với nhu cầu sử dụng của người bay đường dài" (bỏ khẳng định tuyệt đối không nguồn). Hai mốc 1955 và 1982 giữ nguyên theo nguồn Rolex.
7. **Giữ nguyên** liên kết `diem-chuong` ⇄ `patek-philippe-grandmaster-chime` và mọi số liệu đếm nội dung: 69 bài iconic, 207 bài nội dung, 29 cặp hai chiều, 221 trang — không đổi. **Số href build thay đổi 14.656 → 14.659** (tool `check-links` đếm mọi href gồm cả nguồn ngoài): +2 link nội bộ mới sinh từ câu chữ được sửa (câu số gong trong `diem-chuong` → Grandmaster Chime; mục "Nghe gì khi xem repeater?" của Grandmaster Chime → bài cơ chế điểm chuông — đã phân lập bằng build thí nghiệm gỡ từng link: +2) và +1 nguồn "The Patek Philippe Sound" mới trong khối nguồn bài `diem-chuong` (render như một link ngoài). **Lưu ý đồng bộ hồ sơ:** con số 14.656 trong `LO-TRINH` (mốc lần 5, ghi theo build tại thời điểm gói ban đầu) lệch nhẹ 3 href so với build sau vòng sửa; `LO-TRINH` không được đụng theo đúng phạm vi đề — nếu anh muốn khớp tuyệt đối, chỉ cần cập nhật một con số này khi commit. `CAN-KIEM-CHUNG.md` không đụng ở vòng này.

## 10. Xác nhận

- **CHƯA COMMIT, CHƯA PUSH.** Toàn bộ thay đổi nằm trong working tree chờ anh kiểm độc lập.
- Danh sách tệp thuộc gói: 3 tệp mới (`src/content/mauIconic/vi/rolex-gmt-master.md`, `audemars-piguet-royal-oak-perpetual-calendar.md`, `patek-philippe-grandmaster-chime.md`) + 7 tệp sửa nội dung (`coChe/vi/gmt.md`, `perpetual-calendar.md`, `diem-chuong.md`, `bo-thoat.md`, `mauIconic/vi/freak.md`, `rolex-submariner.md`, `royal-oak.md`) + 3 tệp hồ sơ (`docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md`, `CAN-KIEM-CHUNG.md`, biên bản này). Khi commit, `git add` từng tên tệp ở trên, không dùng `git add .` hay `git add -A`.
