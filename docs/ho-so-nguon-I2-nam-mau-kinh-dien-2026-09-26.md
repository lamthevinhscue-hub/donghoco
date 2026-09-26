# Hồ sơ nguồn I2 — năm mẫu kinh điển

- Giao dịch: TXN-20260926-237 (danh mục TXN-20260926-236), ngày lập 2026-09-26. Nền `6983fc7` = origin/main.
- Mục tiêu: hồ sơ nguồn cho 5 mẫu — Jaeger-LeCoultre Reverso, Cartier Tank, Blancpain Fifty Fathoms, Zenith El Primero, TAG Heuer Monaco — làm căn cứ mở gói viết sâu sau này. KHÔNG viết lại bài, KHÔNG dịch Monaco sang EN, KHÔNG xuất bản, KHÔNG tạo ảnh.
- Phương pháp: mọi URL bên dưới truy cập thật trong phiên ngày 2026-09-26. Công cụ từng URL: JLC ×2 — WebFetch timeout, curl (UA trình duyệt) HTTP 200 với HTML đầy đủ; Cartier ×3 — WebFetch HTTP 200; Blancpain ×3 — WebFetch HTTP 200; Zenith ×3 — WebFetch/curl HTTP 403 (Akamai), nội dung qua công cụ đọc web (trang sống); TAG collection — WebFetch/curl HTTP 403, nội dung qua công cụ đọc web; TAG history — WebFetch HTTP 200.
- Quy ước: nguồn frontmatter hiện có nhắc theo định danh (không in URL) để tách bạch với nguồn của hồ sơ; URL chỉ in khi thuộc bảng claim hoặc danh sách không-làm-nguồn. Báo chuyên ngành không dùng làm nguồn (I2 không trích báo chuyên ngành nào).
- Trạng thái SẴN SÀNG = các claim dự kiến viết có nguồn trực tiếp đủ (≥2 URL chính hãng/archive trong khối); không nghĩa mọi chi tiết đã có nguồn — ranh giới viết/cấm nằm ở bảng claim + danh sách loại từng mẫu.

## Tổng kết 5 mẫu

| # | Mẫu | Slug | Route VI / EN | Bài VI (từ) | Trạng thái |
|---|-----|------|---------------|-------------|------------|
| 1 | Jaeger-LeCoultre Reverso | `reverso` | `/mau-iconic/reverso/` · `/en/iconic-watches/reverso/` | 392 | SẴN SÀNG |
| 2 | Cartier Tank | `cartier-tank` | `/mau-iconic/cartier-tank/` · `/en/iconic-watches/cartier-tank/` | 431 | SẴN SÀNG |
| 3 | Blancpain Fifty Fathoms | `fifty-fathoms` | `/mau-iconic/fifty-fathoms/` · `/en/iconic-watches/fifty-fathoms/` | 654 | SẴN SÀNG |
| 4 | Zenith El Primero | `zenith-el-primero` | `/mau-iconic/zenith-el-primero/` · `/en/iconic-watches/zenith-el-primero/` | 459 | SẴN SÀNG |
| 5 | TAG Heuer Monaco | `monaco` | `/mau-iconic/monaco/` · (không có EN — hiện trạng giữ nguyên) | 546 | SẴN SÀNG |

5/5 SẴN SÀNG là kết quả bằng chứng (mỗi mẫu có ≥2 URL chính hãng/archive trong khối), không phải mục tiêu đặt trước; ranh giới viết/cấm nằm ở từng bảng claim và danh sách loại. Hiện trạng frontmatter: Reverso 2 nguồn JLC; Tank chỉ 1 nguồn cartier.com (bài hiện có) — hồ sơ này bổ sung 2 URL cartier nữa; Fifty Fathoms 3 nguồn blancpain; El Primero chỉ 1 nguồn zenith timeline — bổ sung 2 URL zenith nữa; Monaco 2 nguồn tagheuer.

## M1. Jaeger-LeCoultre Reverso — `reverso`

Trạng thái: **SẴN SÀNG**

### Đối chiếu hiện trạng

- Bài VI "Đồng hồ có thể lật mặt" (392 từ); bài EN "the watch that flips" — cặp route `/mau-iconic/reverso/` ↔ `/en/iconic-watches/reverso/`.
- Nguồn frontmatter hiện có: 2 URL jaeger-lecoultre.com (reverso-history + history-of-jaeger-lecoultre) — cùng nguồn dùng trong hồ sơ này.
- Không có dataset tiến hóa riêng cho Reverso; timeline có mốc "1931 — Jaeger-LeCoultre Reverso" — dẫn liên kết, không lặp. Bài nhắc men (M8 hồ sơ T1) — phần men dẫn hồ sơ T1 nếu viết.
- Chống trùng thêm: `docs/ho-so-nguon-I1-…` (không liên quan trực tiếp), bài cơ chế hiện có liên kết từ Reverso (không có bài cơ chế lật riêng — không dẫn).

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| Ra đời 1931, kinh điển thiết kế thế kỷ 20 | https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history | "In 1931, a swivelling timepiece was launched that was destined to become a classic of 20th century design: the Reverso luxury watch." | 2026-09-26 | Chính hãng, curl 200 [đầy đủ] | — |
| Sinh ra cho polo | https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history | "The Reverso watch was created to withstand the rigours of polo matches." | 2026-09-26 | Chính hãng [đầy đủ] | Không mở rộng sang thể thao khác |
| De Trey được thách thức bảo vệ mặt kính, 1930 | https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history | "In 1930, businessman César de Trey was challenged to find a way to protect the glass of a watch for polo players during matches." | 2026-09-26 | Chính hãng [đầy đủ] | Kể theo hãng |
| LeCoultre sản xuất, Chauvot thiết kế | https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history | "He approached his friend Jacques-David LeCoultre to produce the watch and the pair engaged René-Alfred Chauvot to design it." | 2026-09-26 | Chính hãng [đầy đủ] | Tên đúng "Chauvot" (bản gốc có chỗ viết "Chavot") — không dùng "Cottier" |
| Bằng sáng chế Paris 4/3/1931 | https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history | "On 4 March 1931, the Paris patent office received an application to register "a watch capable of sliding in its support and being completely turned over"" | 2026-09-26 | Chính hãng [đầy đủ] | Câu sau cùng đoạn: 7/1931 de Trey mua quyền thiết kế, 11/1931 đăng ký tên Reverso — trích đủ khi viết |
| Đăng ký tên Reverso 11/1931 | https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history | "in November he registered the Reverso name" | 2026-09-26 | Chính hãng [đầy đủ] | Chỉ đăng ký tên, không nói "phát minh từ tiếng Latin" |
| Reverso đã chứa hơn 50 calibre | https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history | "has housed more than 50 different calibres" | 2026-09-26 | Chính hãng [đầy đủ] | Cùng đoạn Reverso trên trang lịch sử |
| Bối cảnh maison 1833 (dẫn mở đầu) | https://www.jaeger-lecoultre.com/eu-en/our-maison/manufacture-since-1833/history-of-jaeger-lecoultre | "In 1833, on the borders of the Swiss Jura, Antoine LeCoultre founded the first Jaeger‑LeCoultre workshop." | 2026-09-26 | Chính hãng, curl 200 [đầy đủ] | Bối cảnh hãng — không phải mệnh đề Reverso |

### Nguồn hỏng / loại riêng

- Trang "1931 Polo Club" của JLC — SPA khung rỗng — không-làm-nguồn.

### Hiểu lầm thường gặp (không được viết)

- Etymology "Reverso = 'I turn round' tiếng Latin" — không có nguyên văn trên trang lịch sử hãng — KHÔNG viết.
- Tên "René-Alfred Cottier" — sai so với hãng ("Chauvot"/"Chavot") — KHÔNG dùng.
- Mốc "bán trong vòng 9 tháng sau đơn sáng chế" — có nguyên văn ("The first pieces were on sale less than nine months after the patent application had been filed.") — được viết kèm trích đầy đủ.

### Chống trùng

| Tệp/khu | Mức | Xử lý khi viết |
|---|---|---|
| Timeline mốc "1931 — Jaeger-LeCoultre Reverso" | Trùng mốc | Dẫn liên kết |
| Bài reverso VI/EN hiện có | Cơ sở mở rộng | Viết sâu trên chính route này |
| Hồ sơ T1 M8 (men — Reverso nhắc men) | Nhắc trùng | Phần men dẫn hồ sơ T1 |

### Liên kết đọc thêm đề xuất (route đã xác nhận trong dist)

`/mau-iconic/reverso/`, `/en/iconic-watches/reverso/`.

## M2. Cartier Tank — `cartier-tank`

Trạng thái: **SẴN SÀNG** (bổ sung nguồn thứ hai/thứ ba so với bài hiện có chỉ 1 nguồn)

### Đối chiếu hiện trạng

- Bài VI "Thanh lịch vượt thời gian" (431 từ); bài EN "timeless elegance" — cặp route `/mau-iconic/cartier-tank/` ↔ `/en/iconic-watches/cartier-tank/`.
- Nguồn frontmatter hiện có: chỉ 1 URL cartier.com collections/tank — đúng hiện trạng đề nhắc; hồ sơ này thêm 2 URL cartier (trang "the legend, the design, the history" + trang sản phẩm Tank Louis Cartier) — đủ ≥2 trong khối.
- Không có dataset tiến hóa riêng cho Tank; timeline KHÔNG có mốc Tank (không thêm trong gói này).

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| Louis Cartier thiết kế theo xe tăng Thế chiến I | https://www.cartier.com/en-us/watches/collections/tank/ | "The Tank watch was created by Louis Cartier, who designed it after the tanks of WWI battlefields." | 2026-09-26 | Chính hãng, HTTP 200 [đầy đủ] | Chỉ "tanks of WWI battlefields" — không thêm "chiến hào"/"Renault" |
| Ngôn ngữ thiết kế: brancards dọc + cabochon sapphire | https://www.cartier.com/en-us/watches/collections/tank/ | "Defined by flat vertical brancards and a sapphire cabochon, this symbol of understated elegance has since captivated the world's most astute minds." | 2026-09-26 | Chính hãng [đầy đủ] | Không suy ra kích thước/vỏ hộp chữ nhật |
| Sáng tạo 1917 | https://www.cartier.com/en-us/tank.html | "Since its creation in 1917, the Tank watch has evolved its lines with style." | 2026-09-26 | Chính hãng, HTTP 200 [đầy đủ] | Không suy ra "ra mắt công chúng 1919" |
| Hai brancards song song + chữ La Mã + cabochon | https://www.cartier.com/en-us/tank.html | "The Tank watch is defined by its two parallel brancards, along with its Roman numerals and the winding crown adorned with a cabochon sapphire." | 2026-09-26 | Chính hãng [đầy đủ] | — |
| Calibre 1917MC gắn tên năm sáng tạo | https://www.cartier.com/en-us/tank.html | "The tonneau-shaped hand-wound 1917MC movement refers to the year in which the Tank watch was created." | 2026-09-26 | Chính hãng [đầy đủ] | Chỉ calibre hiện hành mang tên 1917 — không suy ra calibre gốc 1917 |
| Khẳng định lại: Louis Cartier 1917, biểu tượng chế tác hiện đại | https://www.cartier.com/en-us/watches/collections/tank/tank-louis-cartier-watch-CRWGTA0011.html | "Designed by Louis Cartier in 1917, the Tank watch is an icon of modern watchmaking." | 2026-09-26 | Chính hãng [đầy đủ] | URL sản phẩm Tank Louis Cartier hiện hành |

### Nguồn hỏng / loại riêng

- `https://www.cartier.com/en-us/watches/collections/tank/tank-louis-cartier.html` — 404/403 — không-làm-nguồn (đã thay bằng URL CRWGTA0011 thật).

### Hiểu lầm thường gặp (không được viết)

- Mốc "công chúng 1919" — không có nguyên văn — KHÔNG viết.
- "Chiến hào" (trenches) — nguồn chỉ nói xe tăng chiến trường — KHÔNG viết.
- "Vỏ hộp chữ nhật / kính vẽ chữ nhật / dây gắn dọc" — không có nguyên văn — KHÔNG viết.
- "Renault tank" — không có nguồn — KHÔNG viết.

### Chống trùng

| Tệp/khu | Mức | Xử lý khi viết |
|---|---|---|
| Bài cartier-tank VI/EN hiện có | Cơ sở mở rộng | Viết sâu trên chính route |
| Timeline | Không có mốc Tank | (không dẫn) |
| Bài mẫu khác nhắc Tank (dòng iconic P15/Genta) | Nhắc chéo | Dẫn liên kết khi viết |

### Liên kết đọc thêm đề xuất (route đã xác nhận trong dist)

`/mau-iconic/cartier-tank/`, `/en/iconic-watches/cartier-tank/`.

## M3. Blancpain Fifty Fathoms — `fifty-fathoms`

Trạng thái: **SẴN SÀNG**

### Đối chiếu hiện trạng

- Bài VI "Cột mốc của đồng hồ lặn hiện đại" (654 từ — dài nhất 5); bài EN "a milestone of the modern dive watch" — cặp route `/mau-iconic/fifty-fathoms/` ↔ `/en/iconic-watches/fifty-fathoms/`.
- Nguồn frontmatter hiện có: 3 URL blancpain (collections + lettresdubrassus issue-13 + brand history) — brand/history KHÔNG chứng minh mệnh đề Fifty Fathoms (chỉ mốc công ty) — không dùng trong bảng claim.
- Không có dataset tiến hóa riêng; timeline có mốc "1953 — Blancpain Fifty Fathoms — đồng hồ lặn hiện đại đầu tiên" và mốc 1735 Blancpain lập xưởng — dẫn liên kết.
- Chống trùng: `/co-che/chong-nuoc/` (đồng hồ lặn/ISO), `/huong-dan/dung-vanh-lan/` (vành xoay một chiều), `/tu-dien/bezel/`, `/huong-dan/chon-dong-ho-dau-tien/`.

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| 1953 — "đồng hồ lặn hiện đại đầu tiên" | https://www.blancpain.com/en/collections/fifty-fathoms-collection | "originally expressed in 1953 with the presentation of the first modern diver's watch" | 2026-09-26 | Chính hãng, HTTP 200 [đầy đủ] | Câu đầy đủ: "The Fifty Fathoms collection embodies Blancpain's passion for the underwater world that was originally expressed in…" |
| Cùng mệnh đề 1953 xác nhận trang thứ hai | https://www.blancpain.com/en/fifty-fathoms | "originally expressed in 1953 with the presentation of the first modern diver's watch" | 2026-09-26 | Chính hãng [đầy đủ] | Hai URL chính hãng khớp nhau |
| "Archetypal diver's watch" | https://www.blancpain.com/en/collections/fifty-fathoms-collection | "established it as the archetypal diver's watch" | 2026-09-26 | Chính hãng [đầy đủ] | Câu đầy đủ trên trang; công cụ trích cắt 125 ký tự — mệnh đề chốt nguyên vẹn |
| Sinh ra cho Maloubier & Riffaud, đoàn thợ lặn chiến đấu Pháp | https://lettresdubrassus.blancpain.com/en/issue-13/history-and-legend | "Captain Robert 'Bob' Maloubier and Lieutenant Claude Riffaud, both of the French combat diving corps, who needed a watch for their military diving missions." | 2026-09-26 | Archive hãng (Lettres du Brassus) [đầy đủ] | Kể theo archive; không thêm chi tiết quân đội khác |
| Bezel xoay tính giờ lặn + cơ chế khóa có bằng sáng chế (Fiechter) | https://lettresdubrassus.blancpain.com/en/issue-13/history-and-legend | "So Fiechter developed a locking mechanism, which he also patented, to prevent inadvertent rotation of the bezel." | 2026-09-26 | Archive hãng [đầy đủ] | KHÔNG dùng từ "unidirectional" — nguồn không dùng từ này |
| Đặt tên bởi Fiechter, cảm hứng The Tempest | https://lettresdubrassus.blancpain.com/en/issue-13/history-and-legend | "Fiechter named his creation the 'Fifty Fathoms.'" + "On his mind when he did so was Ariel's song from Shakespeare's The Tempest." | 2026-09-26 | Archive hãng [đầy đủ] | Hai trích hai câu liền nhau |
| Ý nghĩa độ sâu định tính ("maximum depth" thời scuba sơ kỳ) | https://lettresdubrassus.blancpain.com/en/issue-13/history-and-legend | "fifty fathoms was thought in these early scuba days as the maximum depth he and other divers might achieve." | 2026-09-26 | Archive hãng [đầy đủ] | KHÔNG quy đổi 91 m/300 ft — không có con số trong nguồn |
| Hơn 70 năm lịch sử dòng | https://www.blancpain.com/en/fifty-fathoms | "Throughout the more than 70-year history of the Fifty Fathoms diving watch" | 2026-09-26 | Chính hãng [đầy đủ] | Chỉ khoảng thời gian, không suy rộng |

### Nguồn hỏng / loại riêng

- `https://www.blancpain.com/en/collections/fifty-fathoms/5015-3603c-63b1` — HTTP 404 — không-làm-nguồn.
- `https://www.blancpain.com/en/brand/our-vision/history` — truy cập được nhưng không có mệnh đề Fifty Fathoms — không dùng làm nguồn mẫu này (frontmatter hiện có, nhắc định danh).

### Hiểu lầm thường gặp (không được viết)

- Quy đổi "50 fathoms ≈ 91 m / 300 ft" — không có con số trong nguồn — KHÔNG viết con số.
- "Vành xoay MỘT CHIỀU (unidirectional)" — nguồn archive chỉ nói bezel xoay + khóa chống xoay nhầm — KHÔNG dùng từ unidirectional cho Fifty Fathoms.
- Năm 1953 trên trang Lettres du Brassus — không có; trích 1953 chỉ từ blancpain.com.

### Chống trùng

| Tệp/khu | Mức | Xử lý khi viết |
|---|---|---|
| Timeline mốc 1953 (và 1735 Blancpain) | Trùng mốc | Dẫn liên kết |
| `/co-che/chong-nuoc/` + `/huong-dan/chon-dong-ho-dau-tien/` | Đề tài đồng hồ lặn/ISO | Dẫn, không lặp chi tiết chuẩn |
| `/huong-dan/dung-vanh-lan/` + `/tu-dien/bezel/` | Vành xoay | Dẫn, không lặp nguyên lý |
| Hồ sơ T1 M1 (vành xoay một chiều — Rolex) | Khái niệm tương tự | Bài Fifty Fathoms viết theo trích archive (khóa chống xoay nhầm), không sao mệnh đề Rolex |

### Liên kết đọc thêm đề xuất (route đã xác nhận trong dist)

`/mau-iconic/fifty-fathoms/`, `/en/iconic-watches/fifty-fathoms/`, `/co-che/chong-nuoc/`, `/huong-dan/dung-vanh-lan/`, `/tu-dien/bezel/`.

## M4. Zenith El Primero — `zenith-el-primero`

Trạng thái: **SẴN SÀNG** (bổ sung nguồn thứ hai/thứ ba so với bài hiện có chỉ 1 nguồn)

### Đối chiếu hiện trạng

- Bài VI "Movement của thế kỷ" (459 từ); bài EN "the movement of the century" — cặp route `/mau-iconic/zenith-el-primero/` ↔ `/en/iconic-watches/zenith-el-primero/`.
- Nguồn frontmatter hiện có: chỉ 1 URL zenith timeline — đúng hiện trạng đề nhắc; hồ sơ này thêm 2 URL zenith (trang collection Chronomaster + trang manufacture) — đủ ≥2 trong khối.
- Không có dataset tiến hóa riêng; timeline có mốc "1969 — Cuộc đua chronograph tự động" (nhắc El Primero, Zenith, Monaco, Heuer) — dẫn liên kết, không lặp.
- Chống trùng: `/co-che/chronograph/` (cơ chế bấm giờ), `/tu-dien/vph/` (tần số — đã có trích FHH 3 mức), cụm chronograph P16/P34 hiện có.
- Zenith chặn bot: WebFetch/curl 403 (Akamai) trên cả 3 URL — nội dung qua công cụ đọc web (trang sống); trang defy-el-primero-21 + chronomaster-heritage không truy cập được bằng MỌI công cụ — không-làm-nguồn.

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| Ra mắt 10/01/1969 — "chronograph tự động đầu tiên thế giới" | https://www.zenith-watches.com/en_us/brand/timeline | "On January 10, 1969, ZENITH unveils the world's first automatic chronograph: the El Primero." | 2026-09-26 | Chính hãng, 403 trên đường fetch — đọc qua công cụ đọc web [đầy đủ] | Mệnh đề hãng tự nói — viết kèm nguồn, không suy ra phản biện từ hãng khác |
| 36.000 vph; đo 1/10 giây | https://www.zenith-watches.com/en_us/brand/timeline | "oscillating at a high frequency of 36 000 vibrations per hour, allowing it to measure time with record-breaking precision to 1/10th of a second" | 2026-09-26 | Chính hãng [đầy đủ] | Cùng câu nêu "ultra-thin (and therefore integrated)" |
| Chronomaster ra đời 1994, dòng biểu tượng | https://www.zenith-watches.com/en_us/brand/timeline | "ZENITH inaugurates the prestigious CHRONOMASTER collection, which quickly becomes an iconic line for the Maison" | 2026-09-26 | Chính hãng [đầy đủ] | Chỉ mốc 1994 theo timeline |
| Defy El Primero 21 (2017): 50 Hz, 1/100 giây | https://www.zenith-watches.com/en_us/brand/timeline | "beating at a phenomenal rate of 50Hz for an accurate 1/100th of a second chronograph function" | 2026-09-26 | Chính hãng [đầy đủ] | Chỉ nếu bài cần; năm 2017 theo timeline |
| Chronomaster — bộ sưu tập chứa máy El Primero tần số cao | https://www.zenith-watches.com/en_us/chronomaster | "CHRONOMASTER, an iconic collection housing the legendary El Primero high-frequency movement." | 2026-09-26 | Chính hãng, 403 trên đường fetch — đọc qua công cụ đọc web [đầy đủ] | Trang collection hiện hành |
| Xưởng El Primero trong manufacture tích hợp | https://www.zenith-watches.com/en_us/manufacture | "Discover Zenith's integrated manufacture and the El Primero workshop." | 2026-09-26 | Chính hãng, 403 trên đường fetch — đọc qua công cụ đọc web [đầy đủ] | Bối cảnh, không phải mệnh đề 1969 |

### Nguồn hỏng / loại riêng

- `https://www.zenith-watches.com/en_us/defy-el-primero-21` + `https://www.zenith-watches.com/en_us/chronomaster-heritage` — WebFetch 403, curl 403, công cụ đọc web lỗi mạng lặp lại — không truy cập được bằng mọi công cụ — không-làm-nguồn (mệnh đề tương ứng đã phủ bởi timeline).
- FHH: entry glossary el-primero/chronograph/reverso/tank — chỉ shell redirect/rỗng — không-làm-nguồn; I2 không có trích FHH.

### Hiểu lầm thường gặp (không được viết)

- "El Primero là tiếng Esperanto, nghĩa 'the first'" — không có nguyên văn chính hãng — KHÔNG viết.
- "El Primero 1969 hiện vẫn liên tục sản xuất chưa bao giờ ngừng" — không có nguồn trong phiên — KHÔNG viết.
- Chi tiết Charles Vermot — trang heritage chỉ lấy được 1 câu mô tả, không có nguyên văn Vermot — KHÔNG viết.

### Chống trùng

| Tệp/khu | Mức | Xử lý khi viết |
|---|---|---|
| Timeline mốc "1969 — Cuộc đua chronograph tự động" | Trùng mốc (nhắc cả Monaco/Heuer) | Dẫn liên kết; bài El Primero chỉ nói góc Zenith |
| `/tu-dien/vph/` (FHH 3 mức tần số) | Định nghĩa tần số | Dẫn, không lặp |
| `/co-che/chronograph/` + cụm chronograph P16/P34 | Cơ chế bấm giờ | Dẫn, không lặp |

### Liên kết đọc thêm đề xuất (route đã xác nhận trong dist)

`/mau-iconic/zenith-el-primero/`, `/en/iconic-watches/zenith-el-primero/`, `/co-che/chronograph/`, `/tu-dien/vph/`.

## M5. TAG Heuer Monaco — `monaco`

Trạng thái: **SẴN SÀNG**

### Đối chiếu hiện trạng

- Bài VI "Chronograph vuông của Steve McQueen" (546 từ); **KHÔNG có bài EN — hiện trạng ghi nhận, không tạo/dịch/thêm route trong gói này**.
- Nguồn frontmatter hiện có: 2 URL tagheuer (collection-monaco + our-story/history) — cùng nguồn dùng trong hồ sơ.
- Không có dataset tiến hóa riêng; timeline mốc "1969 — Cuộc đua chronograph tự động" (nhắc Monaco/Heuer) — dẫn liên kết.
- Chống trùng: `/co-che/chronograph/`, `/tu-dien/vph/`.
- TAG collection chặn bot: WebFetch/curl 403 — nội dung (meta description) qua công cụ đọc web; trang our-story/heritage rỗng nội dung (JS-render) — không-làm-nguồn.

### Bảng claim

| Mệnh đề dự kiến dùng | Nguồn (URL) | Trích nguyên văn (≤25 từ) | Ngày | Mức | Giới hạn |
|---|---|---|---|---|---|
| 1969: Heuer giới thiệu chronograph tự động đầu tiên thế giới với Autavia, Carrera, Monaco | https://www.tagheuer.com/int/en/our-story/history.html | "Heuer introduced the world's first automatic chronographs in 1969, with the Autavia, Heuer Carrera and Monaco models." | 2026-09-26 | Chính hãng, HTTP 200 [đầy đủ] | Mệnh đề hãng — Monaco là 1 trong 3 mẫu |
| Monaco nổi bật trong 3 mẫu Calibre 11 | https://www.tagheuer.com/int/en/our-story/history.html | "Three models were powered by Heuer's first automatic movement, but it was the new Monaco that captured the world's attention." | 2026-09-26 | Chính hãng [đầy đủ] | Không suy ra "bán chạy nhất" |
| Liên doanh do Heuer dẫn — Calibre 11 (Chronomatic) | https://www.tagheuer.com/int/en/our-story/history.html | "The joint venture led by Heuer would be the first to offer automatic chronographs in worldwide markets, with the Calibre 11 (Chronomatic) movement." | 2026-09-26 | Chính hãng [đầy đủ] | "first to offer… in worldwide markets" theo mệnh đề hãng |
| Vỏ vuông — "square-faced icon" | https://www.tagheuer.com/us/en/collection-monaco/collection-monaco.html | "This unique, square-faced icon of TAG Heuer's heritage and savoir-faire boasts cutting-edge performance and provocative look." | 2026-09-26 | Chính hãng (meta description; 403 trên đường fetch — đọc qua công cụ đọc web) [đầy đủ] | Chỉ vỏ vuông — KHÔNG ghép thành "vuông + chống nước + đầu tiên" |

### Nguồn hỏng / loại riêng

- `https://www.tagheuer.com/int/en/our-story/heritage.html` — khung trang rỗng (JS-render), chỉ còn alt ảnh — không-làm-nguồn.
- `https://www.tagheuer.com/int/en/collection-monaco/collection-monaco.html` — nội dung lịch sử rỗng — không-làm-nguồn.
- File ảnh "tag-heuer-steve-mcqueen-legend.jpg" trong HTML — chỉ alt text, KHÔNG dùng suy luận từ ảnh (đề cấm).

### Hiểu lầm thường gặp (không được viết)

- Steve McQueen / Le Mans 1971 — không có câu nguyên văn lịch sử trên tagheuer.com truy cập được — KHÔNG viết (lưu ý: title bài VI hiện có nhắc McQueen — phần viết sâu phải có nguồn riêng hoặc bỏ chi tiết).
- Mệnh đề gộp "chronograph tự động vỏ vuông chống nước đầu tiên" — không nguồn nào nêu đủ bộ ba — KHÔNG viết.
- Calibre 11 trong Monaco 1969 "thép vuông chống nước" — chi tiết ngoài trích — KHÔNG viết.

### Chống trùng

| Tệp/khu | Mức | Xử lý khi viết |
|---|---|---|
| Timeline mốc "1969 — Cuộc đua chronograph tự động" | Trùng mốc | Dẫn liên kết; bài Monaco chỉ nói góc Heuer |
| `/co-che/chronograph/` + `/tu-dien/vph/` | Cơ chế/tần số | Dẫn, không lặp |
| Bài `zenith-el-primero` (cùng cuộc đua 1969) | Nhắc chéo | Dẫn chéo, mỗi bài một góc hãng |

### Liên kết đọc thêm đề xuất (route đã xác nhận trong dist)

`/mau-iconic/monaco/`, `/mau-iconic/zenith-el-primero/`, `/co-che/chronograph/`.

## Bảng chống trùng tổng hợp 5 mẫu

| # | Mẫu | Trùng chính | Mức | Xử lý |
|---|-----|-------------|-----|-------|
| 1 | Reverso | Timeline mốc 1931 | Trùng mốc | SẴN SÀNG — viết mới khi được giao, dẫn timeline |
| 2 | Cartier Tank | Bài hiện có + dòng iconic nhắc chéo | Trùng bài | SẴN SÀNG — viết mới khi được giao |
| 3 | Fifty Fathoms | Timeline 1953/1735 + chong-nuoc + dung-vanh-lan + bezel | Trùng mốc/đề tài | SẴN SÀNG — dẫn bài cơ chế/hướng dẫn |
| 4 | El Primero | Timeline 1969 + vph + chronograph | Trùng mốc/cơ chế | SẴN SÀNG — dẫn vph + chronograph |
| 5 | Monaco | Timeline 1969 + chronograph | Trùng mốc/cơ chế | SẴN SÀNG — dẫn; ghi hiện trạng chưa có EN |

## URL không làm nguồn (hỏng/chặn/rỗng/không đủ mệnh đề)

- SPA khung rỗng (JLC "1931 Polo Club") — không in URL (chỉ định danh) — không làm nguồn.
- HTTP 404: https://www.blancpain.com/en/collections/fifty-fathoms/5015-3603c-63b1
- Không truy cập được bằng mọi công cụ (403 + đọc-lỗi): https://www.zenith-watches.com/en_us/defy-el-primero-21 ; https://www.zenith-watches.com/en_us/chronomaster-heritage
- Khung trang rỗng JS: https://www.tagheuer.com/int/en/our-story/heritage.html ; https://www.tagheuer.com/int/en/collection-monaco/collection-monaco.html
- HTTP 404/403 (Cartier, biến thể đề xuất): https://www.cartier.com/en-us/watches/collections/tank/tank-louis-cartier.html
- FHH chỉ shell redirect/rỗng: https://www.hautehorlogerie.org/en/encyclopaedia/glossary/el-primero/ ; https://www.hautehorlogerie.org/en/encyclopaedia/glossary/chronograph/ ; https://www.hautehorlogerie.org/en/watches-and-culture/glossary/r/reverso/ ; https://www.hautehorlogerie.org/en/watches-and-culture/glossary/t/tank/

## Claim bị loại hoặc chờ nguồn (tổng hợp)

1. Reverso: etymology Latin "I turn round" — KHÔNG viết; tên "Cottier" — sai, dùng "Chauvot".
2. Cartier Tank: mốc 1919; "chiến hào"; vỏ hộp chữ nhật/kính vẽ chữ nhật/dây gắn dọc; "Renault tank" — KHÔNG viết.
3. Fifty Fathoms: quy đổi 91 m/300 ft; từ "unidirectional" — KHÔNG viết.
4. El Primero: etymology Esperanto "the first"; "sản xuất liên tục chưa ngừng"; Charles Vermot — KHÔNG viết.
5. Monaco: Steve McQueen / Le Mans 1971 (title bài VI hiện có nhắc — viết sâu phải có nguồn riêng hoặc bỏ); mệnh đề gộp "vuông + chống nước + đầu tiên" — KHÔNG viết.
6. Không giá bán, không giữ giá, không lời khuyên đầu tư trong toàn hồ sơ; không lấy nguồn một hãng khái quát toàn ngành (mệnh đề "world's first" của hãng viết kèm nguồn và góc hãng).

## Giới hạn công cụ cần GPT Work lưu ý

- Zenith ×3 URL nguồn: WebFetch/curl 403 (Akamai) — nội dung qua công cụ đọc web (trang sống); 2 trang Zenith khác không truy cập được bằng mọi công cụ — không-làm-nguồn.
- TAG collection: WebFetch/curl 403 — meta description qua công cụ đọc web; TAG history HTTP 200.
- JLC ×2: WebFetch timeout — curl HTTP 200 HTML đầy đủ.
- Cartier ×3, Blancpain ×3: HTTP 200 (WebFetch/curl).

## Kiểm định đã chạy trong phiên

- Checker `output/i2-iconic-source-audit/kiem-i2.mjs` (env I2_ROOT/I2_DIST_ROOT cho phép thử ngoài cây): đủ 5 mẫu + trạng thái; tổng cứng 5 SẴN SÀNG / 0 / 0; R2c mỗi mẫu SẴN SÀNG ≥2 URL nguồn trong khối (cắt ranh giới khối đúng); 13 URL nguồn + 11 không-làm-nguồn (tổng 24 URL); truy cập lại URL nguồn (2xx, hoặc đúng ngoại lệ allowlist hẹp theo từng URL + mã + bằng chứng đọc trang sống; lỗi mạng/timeout luôn FAIL); mọi route nội bộ tồn tại trong dist (VI + EN, Monaco không có EN — không nêu route EN); bảng chống trùng 5 dòng + đồng bộ trạng thái với chi tiết; 2 tệp docs UTF-8 no BOM + newline cuối.
- Mutation ngoài repo: hỏng route nội bộ → fail; mẫu SẴN SÀNG còn dưới 2 URL trong khối → fail; đổi mã trạng thái ngoại lệ hẹp (nếu có) → fail; hoàn nguyên byte-đối-byte rồi chạy sạch lại.
- `node scripts/scan-chars.mjs`, `git diff --check`, `git diff --cached --check` — xem biên bản.
- Không chạy build: I2 không đụng `src/`, `public/`, `scripts/`, `package.json`, `vercel.json` — build không phản ánh thay đổi hồ sơ tài liệu.
