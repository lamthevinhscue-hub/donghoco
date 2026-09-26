# Hồ sơ nguồn I1 — năm mẫu biểu tượng toàn cầu

- Giao dịch: TXN-20260926-231 (danh mục TXN-20260926-230), ngày lập 2026-09-26. Nền `952964f` = origin/main.
- Mục tiêu: hồ sơ nguồn cho viết sâu 1.200–2.000 từ tiếng Việt 5 mẫu — Rolex Submariner, Omega Speedmaster (ưu tiên), Rolex GMT-Master, AP Royal Oak, Patek Philippe Nautilus. KHÔNG viết bài, KHÔNG sửa bài hiện có, KHÔNG tạo ảnh trong lượt này.
- Phương pháp: mọi URL dưới đây truy cập thật trong ngày 2026-09-26. Trình duyệt tự động bị rolex.com/newsroom chặn 403 (Akamai) trên MỌI đường fetch — nội dung Rolex lấy qua công cụ đọc web (trang sống, tải đủ nội dung, title khớp); một số câu Rolex đánh dấu "cần chốt trình duyệt" theo giải thích dưới đây. omega.com: WebFetch tải đủ, curl bị chặn mạng. AP/Patek: HTTP 200 xác nhận bằng curl HTML thô. Smithsonian: tải được 2 trang đối tượng; trang tìm kiếm 403.
- Hai mức bằng chứng ghi minh bạch: **[đầy đủ]** = câu lấy được nguyên văn hoàn chỉnh (hoặc khớp snippet lập chỉ mục của chính trang đó); **[chốt-trình-duyệt]** = nội dung tải đủ từ trang sống qua công cụ đọc web nhưng khuyến nghị mở bằng trình duyệt chốt chuỗi ký tự trước khi viết bài.
- Quy ước: nguồn frontmatter hiện có của bài được nhắc theo định danh (không in URL) để tách bạch với nguồn của hồ sơ này; URL chỉ in khi thuộc bảng claim hoặc danh sách loại.
- Trạng thái SẴN SÀNG = các claim dự kiến viết (khung bài) có nguồn trực tiếp đủ; KHÔNG có nghĩa mọi chi tiết đã có nguồn — từng claim ghi rõ giới hạn, các claim chưa có nguồn bị loại hết.

## Tổng kết 5 mẫu

| # | Mẫu | Slug | Route VI / EN | Bài VI (từ) | Trạng thái |
|---|-----|------|---------------|-------------|------------|
| 1 | Rolex Submariner | `rolex-submariner` | `/mau-iconic/rolex-submariner/` · `/en/iconic-watches/rolex-submariner/` | 556 | SẴN SÀNG |
| 2 | Omega Speedmaster | `omega-speedmaster` | `/mau-iconic/omega-speedmaster/` · `/en/iconic-watches/omega-speedmaster/` | 356 (ngắn nhất) | SẴN SÀNG |
| 3 | Rolex GMT-Master | `rolex-gmt-master` | `/mau-iconic/rolex-gmt-master/` · `/en/iconic-watches/rolex-gmt-master/` | 675 | SẴN SÀNG |
| 4 | AP Royal Oak | `royal-oak` | `/mau-iconic/royal-oak/` · `/en/iconic-watches/royal-oak/` | 392 | SẴN SÀNG |
| 5 | Patek Philippe Nautilus | `patek-nautilus` | `/mau-iconic/patek-nautilus/` · `/en/iconic-watches/patek-nautilus/` | 381 | SẴN SÀNG |

Cả 5 đạt SẴN SÀNG là kết quả bằng chứng thu được (mỗi mẫu có ≥2 URL chính hãng/archive truy cập được), không phải mục tiêu đặt trước. Ranh giới viết được / không viết được nằm ở bảng claim và danh sách loại của từng mẫu.

## M1. Rolex Submariner — `rolex-submariner`

Trạng thái: **SẴN SÀNG**

### Đối chiếu hiện trạng

- Bài VI "Rolex Submariner — Huyền thoại lặn sâu" (556 từ); bài EN "the archetypal dive watch" — cặp route `/mau-iconic/rolex-submariner/` ↔ `/en/iconic-watches/rolex-submariner/`.
- Nguồn frontmatter hiện có: rolex.com trang Submariner; rolex.com about-rolex/history (mục 1905–1919 — KHÔNG nói Submariner); newsroom.rolex.com trang mẫu; Hodinkee "Reference Points"; Monochrome history part 1–2 (bài VI) và part 3–4 trong dataset tiến hóa — Hodinkee/Monochrome là báo chuyên ngành, chỉ mức đối chiếu.
- Sơ đồ tiến hóa hiện có: `submarinerEvolution.ts` (8 mốc, nguồn newsroom + Hodinkee + Monochrome) — bài viết sâu phải dẫn sơ đồ, không lặp mốc.
- Timeline lịch sử có mốc "1953 — Rolex Explorer & Submariner ra đời" — dẫn liên kết, không lặp.
- Chống trùng thêm: `/huong-dan/dung-vanh-lan/` (vành một chiều — đào sâu ở đó), `/tu-dien/bezel/` (định nghĩa vành), `/co-che/da-quang/` (dạ quang), `/huong-dan/chon-dong-ho-dau-tien/` (nhắc ISO 6425).

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| Ra đời 1953, đồng hồ thợ lặn đầu tiên của Rolex chịu nước 100 m | https://newsroom.rolex.com/watches/new-watches-2020/submariner | "the introduction in 1953 of the Submariner, the first divers' wristwatch waterproof to a depth of 100 metres (330 feet)" | 2026-09-26 | Chính hãng (newsroom) [chốt-trình-duyệt] | "first" chỉ trong phạm vi Rolex, không khái quát ngành |
| Cùng mệnh đề 1953 xác nhận bởi trang mẫu | https://www.rolex.com/en-us/watches/submariner.html | "At its launch in 1953, the Oyster Perpetual Submariner was Rolex's first divers' wristwatch to be waterproof to 100 metres (330 feet)." | 2026-09-26 | Chính hãng [chốt-trình-duyệt] | Hai URL chính hãng độc lập khớp nhau về 1953 |
| Chuẩn nước hiện tại 300 m | https://newsroom.rolex.com/watches/new-watches-2020/submariner | "A true divers' watch by design, the Rolex Submariner is guaranteed waterproof to a depth of 300 metres (1,000 feet)." | 2026-09-26 | Chính hãng (meta description) [đầy đủ] | Chỉ chuẩn hiện hành |
| Submariner Date 1969; 1979 lên 300 m | https://newsroom.rolex.com/watches/new-watches-2020/submariner | "In 1969, Rolex unveiled the Submariner Date, adding the date function." | 2026-09-26 | Chính hãng [chốt-trình-duyệt] | Câu 1979 cùng đoạn: "was extended in 1979 to a depth of 300 metres" |
| Bezel xoay một chiều, vạch 60 phút, insert Cerachrom | https://newsroom.rolex.com/watches/new-watches-2020/submariner | "the unidirectional rotatable bezel is fitted with a 60-minute graduated Cerachrom insert in black, green or blue ceramic" | 2026-09-26 | Chính hãng [chốt-trình-duyệt] | Chỉ mô tả cấu hiện hành |
| Vật liệu Oystersteel | https://www.rolex.com/en-us/watches/submariner/features.html | "Oystersteel is an exclusive and highly corrosion-resistant alloy that retains its shine even when the watch is put to extreme use." | 2026-09-26 | Chính hãng [đầy đủ] | Không suy ra đặc tính ngoài trích |
| Núm vặn Triplock gắn với 300 m | https://www.rolex.com/en-us/watches/submariner/features.html | "The Submariner and Submariner Date watches are fitted with the Triplock winding crown." | 2026-09-26 | Chính hãng [đầy đủ] | Câu sau cùng đoạn nêu 300 m |
| Kích thước hiện hành 41 mm, Oystersteel | https://www.rolex.com/en-us/watches/submariner.html | "Submariner — Oyster, 41 mm, Oystersteel" | 2026-09-26 | Chính hãng (dòng model) [chốt-trình-duyệt] | Chỉ cấu hiện hành |

### Nguồn hỏng / loại riêng

- https://www.rolex.com/en-us/watches/submariner/from-tool-watch-to-icon.html — SPA khung rỗng, không có văn bản — loại (xem danh sách URL không làm nguồn).

### Hiểu lầm thường gặp (không được viết)

- Reference các thế hệ (6204, 6536, 6538…) — không có nguyên văn chính hãng trong phiên — KHÔNG viết.
- "Ra mắt tại Basel tháng 1/1954" — không có nguồn thu được — KHÔNG viết.
- "Đồng hồ thợ lặn đầu tiên của ngành" — nguồn chỉ nói "Rolex's first" — KHÔNG viết mở rộng.

### Chống trùng

| Tệp/khu | Mức | Xử lý khi viết |
|---|---|---|
| `huongDan/vi/dung-vanh-lan.md` (nhắc 5 lần) | Trùng chủ đề vành một chiều | Bài iconic chỉ dẫn về bài hướng dẫn |
| `tuDien/vi/bezel.md` | Định nghĩa vành | Dẫn liên kết |
| `submarinerEvolution.ts` (8 mốc) | Trùng mốc tiến hóa | Bài tóm 2–3 mốc chính, dẫn sơ đồ cho phần còn lại |
| Timeline mốc 1953 | Trùng mốc | Dẫn liên kết |

### Liên kết đọc thêm đề xuất (route đã xác nhận trong dist)

`/mau-iconic/rolex-submariner/`, `/en/iconic-watches/rolex-submariner/`, `/huong-dan/dung-vanh-lan/`, `/tu-dien/bezel/`, `/co-che/da-quang/`.

## M2. Omega Speedmaster — `omega-speedmaster` (ưu tiên)

Trạng thái: **SẴN SÀNG**

### Đối chiếu hiện trạng

- Bài VI "Chiếc đồng hồ của Mặt Trăng" (356 từ — ngắn nhất trong 5); bài EN "the Moonwatch" — cặp route `/mau-iconic/omega-speedmaster/` ↔ `/en/iconic-watches/omega-speedmaster/`.
- Nguồn frontmatter hiện có: omega catalog Moonwatch Professional; omega trang Speedmaster; omega chronicle (trang gốc); hướng dẫn sử dụng PDF 310.32.40.50.06.001 — đều chính hãng.
- Sơ đồ tiến hóa hiện có: `omegaSpeedmasterEvolution.ts` (7 mốc, gồm 3 URL omega chronicle + heritage FOIS + 2 URL báo chuyên ngành đối chiếu) + hồ sơ dữ liệu `docs/ho-so-du-lieu-tien-hoa-omega-speedmaster.md` (gói G08, đã nghiệm thu) — bài viết sâu dẫn lại hồ sơ + sơ đồ.
- Timeline lịch sử có mốc "1957 — Omega Speedmaster ra mắt": mốc thuộc timeline (nguồn riêng gói G07); hồ sơ này CHƯA có câu nguyên văn chính hãng cho 1957 — phần bài viết sâu chỉ được nêu 1957 khi có nguồn riêng trực tiếp hoặc dẫn mốc timeline.
- Chống trùng thêm: bài cơ chế GMT/bấm giờ, cụm bấm giờ P34 — Speedmaster là chronograph, phần cơ chế dẫn `/co-che/chronograph/` nếu viết.

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| NASA chọn 1965 cho mọi phi vụ có người | https://www.omegawatches.com/en-us/watches/speedmaster/moonwatch-professional/catalog | "Chosen by NASA in 1965 for all manned space missions, it has been a part of the greatest explorations of space" | 2026-09-26 | Chính hãng [đầy đủ] | Không suy ra "duy nhất" ngoài trích ở dòng sau |
| Cuộc thử NASA 1965: 4 hãng, chỉ Speedmaster qua | https://www.omegawatches.com/chronicle/1965-nasa-tests-and-qualifies-the-speedmaster | "Only one watch survived and was then qualified for all manned space missions and Extravehicular Activity (EVA) – the OMEGA Speedmaster." | 2026-09-26 | Chính hãng — archive chronicle [đầy đủ] | "Only one" thuộc phạm vi cuộc thử Omega kể lại |
| Vẫn là chiếc duy nhất NASA + các cơ quan khác chứng nhận cho EVA | https://www.omegawatches.com/chronicle/1965-nasa-tests-and-qualifies-the-speedmaster | "the original Speedmaster Professional is still the only watch qualified by NASA, and other international space agencies, for Extravehicular Activity (EVA)." | 2026-09-26 | Chính hãng [đầy đủ] | Bắt buộc kèm phạm vi EVA khi viết |
| Đồng hồ đầu tiên đeo trên Mặt Trăng, Apollo 11 1969 | https://www.omegawatches.com/en-us/watches/speedmaster/moonwatch-professional/catalog | "became the first watch worn on the moon during the Apollo 11 lunar landing in 1969" | 2026-09-26 | Chính hãng [đầy đủ] | Không mở rộng sang nhiệm vụ khác |
| Tên gọi "Moonwatch" sau Apollo 11 | https://www.omegawatches.com/chronicle/1969-the-first-journey-to-the-moon | "After the Apollo 11 landing, the Speedmaster became forever known as 'the Moonwatch'." | 2026-09-26 | Chính hãng [đầy đủ] | Trích cả dấu nháy tên gọi |
| Bước chân đầu tiên 02:56 GMT 21/7/1969 | https://www.omegawatches.com/chronicle/1969-the-first-journey-to-the-moon | "the first human beings walked onto the Moon at 02:56 GMT on 21 July 1969." | 2026-09-26 | Chính hãng [đầy đủ] | Sự kiện chung, không gán người cụ thể |
| Apollo 13 1970: đo đốt 14 giây đưa tàu về | https://www.omegawatches.com/chronicle/1970-lucky-13 | "Using their Speedmaster watches the crew successfully timed a 14-second burn that saw them splash down" | 2026-09-26 | Chính hãng [đầy đủ] | Không tự thêm chi tiết Silver Snoopy |
| Tiền thân: Schirra, Sigma 7 1962 — "First OMEGA in Space" | https://www.omegawatches.com/en-us/watches/speedmaster/heritage-models/first-omega-in-space/product | "The Speedmaster became the first OMEGA in space during Astronaut Walter Schirra's groundbreaking Sigma 7 mission in 1962." | 2026-09-26 | Chính hãng [đầy đủ] | "first OMEGA" — phạm vi Omega, không ngành |
| Mẫu FOIS hiện hành dựa CK-2998 | https://www.omegawatches.com/en-us/watches/speedmaster/heritage-models/first-omega-in-space/product | "Today's watch is based on the original CK-2998 model." | 2026-09-26 | Chính hãng [đầy đủ] | CK-2998 chỉ như trong trích |
| Máy hiện hành Calibre 3861 Master Chronometer | https://www.omegawatches.com/en-us/watches/speedmaster/moonwatch-professional/catalog | "In many models, this is the manual-winding OMEGA Calibre 3861, the latest Master Chronometer certified version." | 2026-09-26 | Chính hãng [đầy đủ] | "In many models" — không khái quát cả dòng |
| Calibre 321 của các chiếc đi trên Mặt Trăng | https://www.omegawatches.com/faq/ | "All the watches worn on the Moon were part of the Speedmaster collection and were equipped with the legendary calibre 321." | 2026-09-26 | Chính hãng — FAQ [đầy đủ] | Câu sau: ref ST 105.012 cho Apollo 11, 12, 14–17 |
| NASA cấp Speedmaster cho Stafford, Gemini 6 12/1965 | https://airandspace.si.edu/collection-objects/chronograph-stafford-gemini-6/nasm_A19771144000 | "NASA issued this Omega Speedmaster chronograph to astronaut Tom Stafford for use during the Gemini 6 mission of December 1965." | 2026-09-26 | Bảo tàng Smithsonian [đầy đủ] | Chứng vật bảo tàng — không suy ra cá nhân khác |
| Tiêu chuẩn NASA: lên dây tay, chịu nước/sốc/từ | https://airandspace.si.edu/collection-objects/chronograph-stafford-astp/nasm_A19771186000 | "Program requirements called for a manual-winding wrist chronograph that was water-proof, shock-proof, anti-magnetic" | 2026-09-26 | Bảo tàng Smithsonian [đầy đủ] | Câu sau cùng đoạn: 0–200 °F, 12 g — trích đủ nếu viết |

### Nguồn hỏng / loại riêng

- URL Smithsonian đề xuất `nasm_A19730048000` — 404; thay bằng 2 URL đối tượng Stafford ở bảng (đề sai URL, đã thay — ghi minh bạch).
- Trang collection `/en-us/watches/speedmaster` và trang gốc `/chronicle` — chỉ câu quảng cáo/tên trang, không dùng làm chứng cứ mốc.

### Hiểu lầm thường gặp (không được viết)

- Năm ra đời 1957 — chưa có câu nguyên văn chính hãng trong I1 — KHÔNG viết (chỉ dẫn mốc timeline nếu cần).
- Silver Snoopy Award — không có nguồn thu được — KHÔNG viết.
- Buzz Aldrin đeo trên Mặt Trăng — nguồn không nêu tên — KHÔNG viết.
- Calibre 321 trong mẫu FOIS hiện hành — trang chỉ có nhãn link, không câu nguyên văn — KHÔNG viết.

### Chống trùng

| Tệp/khu | Mức | Xử lý khi viết |
|---|---|---|
| `omegaSpeedmasterEvolution.ts` (7 mốc) + `docs/ho-so-du-lieu-tien-hoa-omega-speedmaster.md` | Trùng mốc tiến hóa | Bài tóm các mốc chính, dẫn sơ đồ + hồ sơ G08 |
| Timeline mốc 1957 (và mốc 1969 nếu có nhắc) | Trùng mốc | Dẫn liên kết |
| Cụm bấm giờ P34 (`/co-che/chronograph/`) | Cơ chế bấm giờ | Dẫn, không lặp nguyên lý |

### Liên kết đọc thêm đề xuất (route đã xác nhận trong dist)

`/mau-iconic/omega-speedmaster/`, `/en/iconic-watches/omega-speedmaster/`, `/co-che/chronograph/`.

## M3. Rolex GMT-Master — `rolex-gmt-master`

Trạng thái: **SẴN SÀNG**

### Đối chiếu hiện trạng

- Bài VI "Đồng hồ của phi công vượt múi giờ" (675 từ — dài nhất trong 5); bài EN "the watch built for long-haul pilots" — cặp route `/mau-iconic/rolex-gmt-master/` ↔ `/en/iconic-watches/rolex-gmt-master/`.
- Nguồn frontmatter hiện có: rolex.com GMT-Master II + newsroom trang mẫu — chỉ 2 nguồn, đều chính hãng.
- Sơ đồ tiến hóa hiện có: `rolexGmtMasterEvolution.ts` (8 mốc, nguồn newsroom + Hodinkee đối chiếu) — bài viết sâu dẫn sơ đồ.
- Timeline mốc "1955 — Rolex GMT-Master — kim 24 giờ" — dẫn liên kết.
- Chống trùng mạnh nhất trong 5 mẫu: `/co-che/gmt/` (cơ chế), `/tu-dien/gmt/` (định nghĩa), `/huong-dan/doc-va-chinh-gmt/` (đọc-chỉnh GMT), cụm GMT song ngữ P33 — phần cơ chế chỉ dẫn liên kết.

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| Ra đời 1955 làm công cụ điều hướng cho người vượt múi giờ | https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii | "Launched in 1955 and designed as a navigation aid for professionals criss-crossing the globe" | 2026-09-26 | Chính hãng (newsroom) [đầy đủ — khớp snippet của trang] | Câu đầy đủ nêu thêm "witnessed the rapid expansion of long-distance air travel" |
| Đồng hồ chính thức của Pan Am | https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii | "It even became the official watch of Pan American World Airways, better known worldwide as Pan Am" | 2026-09-26 | Chính hãng [đầy đủ] | "official watch" theo mệnh đề hãng |
| 1955 theo yêu cầu phi công hàng không xuyên lục địa | https://newsroom.rolex.com/watches/new-watches-2024/gmt-master-ii | "inspired by the original model launched in 1955, developed at the request of intercontinental airline pilots" | 2026-09-26 | Chính hãng [chốt-trình-duyệt] | Hai URL newsroom khớp 1955 |
| GMT-Master II 1982: kim 24 giờ đặt độc lập | https://newsroom.rolex.com/watches/new-watches-2024/gmt-master-ii | "The GMT-Master II, launched in 1982, allows the 24-hour hand to be set independently of the hour hand" | 2026-09-26 | Chính hãng [chốt-trình-duyệt] | Không lẫn năm GMT-Master gốc |
| Bezel 24 giờ hai chiều, insert Cerachrom nguyên khối | https://newsroom.rolex.com/watches/new-watches-2024/gmt-master-ii | "bidirectional rotatable 24-hour graduated bezel fitted with a monobloc Cerachrom insert" | 2026-09-26 | Chính hãng [chốt-trình-duyệt] | Cấu hiện hành |
| Chức năng GMT: 2 múi giờ; GMT = Greenwich Mean Time | https://www.rolex.com/en-us/watches/gmt-master-ii.html | "With its GMT function displaying two time zones" + "The letters GMT stand for 'Greenwich Mean Time'." | 2026-09-26 | Chính hãng [đầy đủ] | Không viết "đầu tiên trên thế giới" |

### Nguồn hỏng / loại riêng

- Không có — cả 4 URL dùng được qua công cụ đọc web; rolex 403 với mọi đường fetch tự động (ghi mức công cụ như M1).

### Hiểu lầm thường gặp (không được viết)

- "Đồng hồ đầu tiên trên thế giới hiển thị 2 múi giờ cùng lúc" — nguồn chỉ nói "displaying two time zones" — KHÔNG viết.
- Reference 6542 — không có nguyên văn — KHÔNG viết.
- Năm 1982 áp cho GMT-Master gốc — sai; 1982 là GMT-Master II — viết đúng thế hệ.

### Chống trùng

| Tệp/khu | Mức | Xử lý khi viết |
|---|---|---|
| `coChe/vi/gmt.md` + `/tu-dien/gmt/` + `/huong-dan/doc-va-chinh-gmt/` | Trùng cơ chế/định nghĩa | Bài iconic chỉ dẫn 3 bài này |
| `rolexGmtMasterEvolution.ts` (8 mốc) | Trùng mốc tiến hóa | Tóm chính, dẫn sơ đồ |
| Cụm GMT song ngữ P33 (Reverso/Pan Am 5 bề mặt trong bài cơ chế) | Trùng bối cảnh Pan Am | Chi tiết Pan Am để bài iconic viết với nguồn newsroom, không lặp nội dung cơ chế |

### Liên kết đọc thêm đề xuất (route đã xác nhận trong dist)

`/mau-iconic/rolex-gmt-master/`, `/en/iconic-watches/rolex-gmt-master/`, `/co-che/gmt/`, `/tu-dien/gmt/`, `/huong-dan/doc-va-chinh-gmt/`.

## M4. AP Royal Oak — `royal-oak`

Trạng thái: **SẴN SÀNG**

### Đối chiếu hiện trạng

- Bài VI "Mẫu mở đầu kỷ nguyên thép sang trọng" (392 từ); bài EN "the watch that opened the luxury steel era" — cặp route `/mau-iconic/royal-oak/` ↔ `/en/iconic-watches/royal-oak/`.
- Nguồn frontmatter hiện có: AP collections Royal Oak + apchronicles "birth-of-an-icon" + "guillochage-tapisserie" — archive hãng AP (apchronicles), mức mạnh.
- Không có dataset tiến hóa riêng cho Royal Oak; timeline mốc "1972 — Audemars Piguet Royal Oak" (nhắc Genta) — dẫn liên kết. Bài liên quan `audemars-piguet-royal-oak-perpetual-calendar.md` — dẫn khi nói dòng phức tạp.
- Chống trùng: `/tu-dien/bezel/` (định nghĩa vành), hồ sơ T1 mục dây liền vỏ (`docs/ho-so-nguon-T1-tu-dien-bo-tro-2026-09-26.md` — M2 CẦN THU HẸP, trích AP đã có).

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| 1972 ra đời, biểu tượng táo bạo | https://www.audemarspiguet.com/com/en/collections/royal-oak.html | "Since its groundbreaking debut in 1972, the Royal Oak has stood as a symbol of audacity and innovation" | 2026-09-26 | Chính hãng, HTTP 200 [đầy đủ] | — |
| Thiết kế Gérald Genta; vỏ thép; vành bát giác 8 ốc; Tapisserie; dây liền vỏ | https://www.audemarspiguet.com/com/en/collections/royal-oak.html | "Designed by Gérald Genta, the Royal Oak revolutionised traditional watchmaking codes with its hand-finished body of stainless steel" | 2026-09-26 | Chính hãng [đầy đủ] | Câu đầy đủ gồm "octagonal bezel with eight hexagonal screws, guilloché "Tapisserie" dial, and integrated bracelet" (trích đã có hồ sơ T1 M2) |
| Ra mắt April 1972 tại Basel Fair — "đồng hồ thép đắt nhất thế giới" | https://apchronicles.audemarspiguet.com/en/article/birth-of-an-icon | "In April 1972, "the most expensive steel watch in the world" was presented at the Basel Fair where it caused a sensation" | 2026-09-26 | Archive hãng AP [đầy đủ] | Giữ nguyên ngoặc kép định vị đương thời |
| Giá ra đời CHF 3.300 | https://apchronicles.audemarspiguet.com/en/article/birth-of-an-icon | "In 1972, the Royal Oak sold CHF 3,300." | 2026-09-26 | Archive hãng AP [đầy đủ] | Số chỉ dùng trong trích |
| AP giao Genta thiết kế đồng hồ thép thể thao "chưa từng có" | https://apchronicles.audemarspiguet.com/en/article/birth-of-an-icon | "He commissioned Gérald Genta, a designer and jeweller by training who had already collaborated with the brand" | 2026-09-26 | Archive hãng AP [đầy đủ] | Câu sau: "to design a steel sports watch "never done before"" — trích đủ khi viết |
| Genta phác thảo qua đêm | https://apchronicles.audemarspiguet.com/en/article/birth-of-an-icon | "He produced the first sketch of this timepiece – not yet named Royal Oak – overnight." | 2026-09-26 | Archive hãng AP [đầy đủ] | Kể theo archive hãng |
| Genta: dây liền vỏ là phần "chưa từng có" | https://apchronicles.audemarspiguet.com/en/article/birth-of-an-icon | "Furthermore, I designed the integrated bracelet which was unprecedented, with tapering intermediate links" | 2026-09-26 | Archive hãng AP [đầy đủ] | Trích lời Genta trong bài |
| Tapisserie là mã thẩm mỹ từ 1972 (nền 1970 Genta–Roland Tille) | https://apchronicles.audemarspiguet.com/en/article/guillochage-tapisserie | "one of the collection's essential aesthetic codes since 1972" | 2026-09-26 | Archive hãng AP [đầy đủ] | Câu đầy đủ: "The Petite Tapisserie decorative pattern adorning the dial of the first Royal Oak has been one of…" |
| Biệt danh "Jumbo" gắn 39 mm siêu mỏng | https://apchronicles.audemarspiguet.com/en/article/the-royal-oak-jumbo-models | "The 1972 Royal Oak and its ultra-thin 39 mm descendants are often nicknamed "Jumbo"" | 2026-09-26 | Archive hãng AP [đầy đủ] | "nicknamed" — không phải tên chính thức |
| Royal Oak nữ đầu tiên 1976, Model 8638 | https://apchronicles.audemarspiguet.com/en/article/royal-oak-2-birth-of-the-first-women-s-model | "The first feminine Royal Oak, also known as Royal Oak II, was launched in 1976 as Model 8638." | 2026-09-26 | Archive hãng AP [đầy đủ] | Chỉ nêu nếu bài cần |

### Nguồn hỏng / loại riêng

- `https://www.audemarspiguet.com/com/en/our-house/timeline.html` — 404 — trong danh sách URL không làm nguồn.
- FHH encyclopedia entry Gérald Genta — trả stub redirect 74 byte, không nội dung — loại.

### Hiểu lầm thường gặp (không được viết)

- "Jumbo" là tên chính thức — sai; archive hãng ghi rõ chỉ là biệt danh nội bộ thời đó — viết theo trích.
- Thiết kế lấy cảm hứng từ mũ lặn (diver's helmet) — có trong apchronicles ("inspired by a diver's helmet") — được viết kèm trích; KHÔNG suy ra chi tiết ngoài.
- Số 8 ốc vít "chống nước bằng ốc" — nguồn nói ốc vít nhìn thấy + gioăng nước nhìn thấy trong thiết kế — viết đúng trích, không diễn giải cơ chế.

### Chống trùng

| Tệp/khu | Mức | Xử lý khi viết |
|---|---|---|
| Timeline mốc 1972 (nhắc Genta) | Trùng mốc | Dẫn liên kết |
| `docs/ho-so-nguon-T1-…` mục M2 dây liền vỏ | Trích AP trùng | Bài iconic là nơi đào sâu; hồ sơ T1 dẫn về |
| `/tu-dien/bezel/`, bài Guilloché liên quan P0-D1 | Định nghĩa/kỹ thuật | Dẫn liên kết |

### Liên kết đọc thêm đề xuất (route đã xác nhận trong dist)

`/mau-iconic/royal-oak/`, `/en/iconic-watches/royal-oak/`, `/mau-iconic/patek-nautilus/` (so sánh Genta), `/tu-dien/bezel/`.

## M5. Patek Philippe Nautilus — `patek-nautilus`

Trạng thái: **SẴN SÀNG**

### Đối chiếu hiện trạng

- Bài VI "Biểu tượng thể thao sang trọng" (381 từ); bài EN "the luxury sports icon" — cặp route `/mau-iconic/patek-nautilus/` ↔ `/en/iconic-watches/patek-nautilus/`.
- Nguồn frontmatter hiện có: patek.com trang collection Nautilus + trang "anchored in Geneva and Switzerland" (lịch sử công ty 1839 — không nói Nautilus).
- Không có dataset tiến hóa riêng; timeline mốc "1976 — Patek Philippe Nautilus" (nhắc Genta) — dẫn liên kết.
- Chống trùng: hồ sơ T1 M2 (dây liền vỏ — Tissot/Patek không có từ "integrated" trên trang model), `/tu-dien/bezel/`.

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| Ra đời 1976, định vị thể thao thanh lịch | https://www.patek.com/en/collection/nautilus | "With its iconic design, the Nautilus has epitomized the elegant sports watch since its launch in 1976." | 2026-09-26 | Chính hãng, HTTP 200 [đầy đủ] | — |
| Lấy cảm hứng cửa sổ tàu (porthole) | https://www.patek.com/en/collection/nautilus | "Inspired by the shape of a ship's porthole, the construction of the Nautilus pushed the art of case manufacture to a new pinnacle" | 2026-09-26 | Chính hãng [đầy đủ] | Câu sau: "impermeable to the elements" |
| Vành bát giác bo tròn + mặt số embossed ngang | https://www.patek.com/en/collection/nautilus | "With its rounded octagonal bezel, ingenious porthole case construction, and horizontally embossed dial" | 2026-09-26 | Chính hãng [đầy đủ] | Cấu hiện hành |
| Vật liệu dòng hiện tại gồm thép | https://www.patek.com/en/collection/nautilus | "Crafted in steel, rose gold or white gold" | 2026-09-26 | Chính hãng [đầy đủ] | Không suy ra 1976 gốc là thép từ câu này |
| Ref hiện hành 5811/1G-001: vàng trắng, dây liền vỏ | https://www.patek.com/en/collection/nautilus/5811-1G-001 | "this model is distinguished by its white gold case and bracelet" | 2026-09-26 | Chính hãng [đầy đủ] | Câu đầy đủ có mặt số blue sunburst |
| Genta thiết kế Nautilus 1976 | https://apchronicles.audemarspiguet.com/en/article/birth-of-an-icon | "Gérald Genta designed numerous models that are now legendary, including Audemars Piguet's Royal Oak (1972), Patek Philippe's Nautilus (1976)" | 2026-09-26 | Archive AP — chứng minh trực tiếp nhưng KHÔNG phải chính hãng Patek [đầy đủ] | Khi viết bắt buộc ghi nguồn archive AP; thiếu nguồn patek.com cho tên Genta |
| "Jumbo" cũng gắn với Nautilus | https://apchronicles.audemarspiguet.com/en/article/the-royal-oak-jumbo-models | "the Royal Oak or the Nautilus – now the most famous "Jumbo" watches" | 2026-09-26 | Archive AP [đầy đủ] | Mức nguồn như trên |
| Nautilus cùng nhóm máy khắc với Royal Oak | https://apchronicles.audemarspiguet.com/en/article/guillochage-tapisserie | "the dial of Patek Philippe's Nautilus was developed on the same machines" | 2026-09-26 | Archive AP [đầy đủ] | Ghi nguồn khi viết |

### Nguồn hỏng / loại riêng

- `https://www.patek.com/en/company/the-manufacture` — 200 nhưng là trang "Our values", không mệnh đề Nautilus — không dùng.
- FHH — không truy cập được entry nào có nội dung (chặn bot/redirect) — không có trích FHH trong hồ sơ.

### Hiểu lầm thường gặp (không được viết)

- Ref. 3700/1 mẫu đầu — không trang nào truy cập được nêu — KHÔNG viết.
- Giá ra đời 1976 — không có nguồn — KHÔNG viết.
- "Đồng hồ thể thao thép hạng sang đầu tiên của Patek" — không có nguyên văn — KHÔNG viết.
- Genta trên patek.com — trang chính hãng không nhắc tên Genta — viết Genta bắt buộc dùng trích archive AP và ghi rõ nguồn.

### Chống trùng

| Tệp/khu | Mức | Xử lý khi viết |
|---|---|---|
| Timeline mốc 1976 (nhắc Genta) | Trùng mốc | Dẫn liên kết |
| Hồ sơ T1 M2 (dây liền vỏ) | Trích trùng | Bài iconic đào sâu; T1 dẫn về |
| `/mau-iconic/royal-oak/` (cùng Genta) | So sánh tự nhiên | Bài mới dẫn chéo, không lặp phần AP |

### Liên kết đọc thêm đề xuất (route đã xác nhận trong dist)

`/mau-iconic/patek-nautilus/`, `/en/iconic-watches/patek-nautilus/`, `/mau-iconic/royal-oak/`, `/tu-dien/bezel/`.

## Bảng chống trùng tổng hợp 5 mẫu

| # | Mẫu | Trùng chính | Mức | Xử lý |
|---|-----|-------------|-----|-------|
| 1 | Submariner | dung-vanh-lan + bezel + submarinerEvolution (8 mốc) | Theo đề tài | SẴN SÀNG — viết mới khi được giao, dẫn bài hiện có |
| 2 | Speedmaster | omegaSpeedmasterEvolution (7 mốc) + hồ sơ G08 | Trùng mốc | SẴN SÀNG — dẫn sơ đồ + hồ sơ G08 |
| 3 | GMT-Master | gmt (cơ chế) + tuDien/gmt + doc-va-chinh-gmt + rolexGmtMasterEvolution | Trùng cơ chế mạnh | SẴN SÀNG — phần cơ chế chỉ dẫn |
| 4 | Royal Oak | timeline 1972 + T1 M2 | Trùng mốc/trích | SẴN SÀNG — viết mới khi được giao |
| 5 | Nautilus | timeline 1976 + T1 M2 | Trùng mốc/trích | SẴN SÀNG — viết mới khi được giao |

## URL không làm nguồn (hỏng/chặn/không đủ mệnh đề)

- BỊ LOẠI (404): https://airandspace.si.edu/collection-objects/omega-speedmaster-professional/nasm_A19730048000 — URL Smithsonian đề xuất ban đầu; đã thay bằng 2 URL đối tượng Stafford.
- BỊ LOẠI (404): https://www.audemarspiguet.com/com/en/our-house/timeline.html
- BỊ LOẠI (stub 74 byte, redirect JS): https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/gerald-genta/
- BỊ LOẠI (SPA khung rỗng): https://www.rolex.com/en-us/watches/submariner/from-tool-watch-to-icon.html
- KHÔNG TRUY CẬP ĐƯỢC (403 chặn bot trên entry encyclopedia; chỉ có stub/redirect): FHH https://www.hautehorlogerie.org/ — hồ sơ I1 không có trích FHH nào.

## Claim bị loại hoặc chưa được phép viết (tổng hợp)

1. Reference mọi thế hệ: Submariner 6204/6536/6538, GMT-Master 6542, Nautilus 3700/1 — không có nguyên văn chính hãng trong phiên — KHÔNG viết.
2. Speedmaster 1957 ra đời — chưa có câu nguyên văn chính hãng; mốc timeline 1957 giữ hiện trạng (nguồn riêng G07) — bài sâu phải có nguồn riêng hoặc dẫn timeline.
3. Silver Snoopy Award, Buzz Aldrin — không có nguồn thu được — KHÔNG viết.
4. "Đồng hồ đầu tiên trên thế giới hiển thị 2 múi giờ" — không có nguyên văn — KHÔNG viết.
5. Submariner "ra mắt tại Basel tháng 1/1954" — không có nguồn — KHÔNG viết.
6. Nautilus giá ra đời 1976; "đồng hồ thể thao thép hạng sang đầu tiên của Patek" — không có nguyên văn — KHÔNG viết.
7. Calibre 321 trong mẫu First OMEGA in Space hiện hành — chỉ nhãn link — KHÔNG viết.
8. Speedmaster ST 105.012 — chỉ được viết kèm danh sách nhiệm vụ Apollo như trích FAQ (11, 12, 14–17); mọi reference khác (145.012 v.v.) KHÔNG viết.

## Giới hạn công cụ cần GPT Work lưu ý

- Rolex (rolex.com + newsroom): ngày 2026-09-26, fetch tự động Node trả 200 cho trang PDP/features và 2 trang newsroom GMT; RIÊNG https://newsroom.rolex.com/watches/new-watches-2020/submariner bị trả 404 (Akamai chặn bot bằng 404) trong khi trang sống và nguyên văn (1953/1969/1979/300 m/Cerachrom) đã đọc qua công cụ đọc web — đây là ngoại lệ DUY NHẤT của allowlist R4 trong checker (chỉ cho mã 404 đúng URL này); lỗi mạng/timeout không có ngoại lệ nào. Các câu đánh dấu [chốt-trình-duyệt] nên mở bằng trình duyệt để chốt nguyên văn trước khi viết bài.
- omega.com: WebFetch tải đủ; curl bị chặn mạng từ môi trường.
- FHH: không truy cập được entry có nội dung — không dùng trong I1.

## Kiểm định đã chạy trong phiên

- Checker `output/i1-iconic-source-audit/kiem-i1.mjs` (đường chạy mặc định repo; hỗ trợ env I1_ROOT/I1_DIST_ROOT cho phép thử ngoài cây): đủ 5 mẫu + trạng thái + tổng cứng 5/0/0; URL khớp 2 danh sách (21 nguồn + 6 không-làm-nguồn); truy cập lại URL nguồn (2xx; URL không-2xx chỉ đạt khi nằm trong allowlist hẹp R4 có bằng chứng trong hồ sơ — ngoại lệ duy nhất: newsroom 2020 Submariner, mã 404; lỗi mạng/timeout luôn FAIL); mọi route nội bộ tồn tại trong dist (VI + EN); bảng chống trùng tổng hợp 5 dòng và đồng bộ trạng thái với chi tiết (R6b bài học T1); 2 tệp docs UTF-8 no BOM + newline cuối — log kèm thư mục.
- Phép thử mutation ngoài repo: bỏ trạng thái M3 + hỏng 1 route trong bản sao `D:/i1-mut` — checker phải fail đúng 2 điểm; hoàn nguyên byte-đối-byte rồi chạy sạch lại.
- `node scripts/scan-chars.mjs`, `git diff --check`, `git diff --cached --check` — xem biên bản.
- Không chạy build: I1 không đụng `src/`, `public/`, `scripts/`, `package.json`, `vercel.json` — build không phản ánh thay đổi hồ sơ tài liệu.
