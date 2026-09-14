# G06-B chặng 1 — Kiểm kê công cụ so sánh và cổng dữ liệu EN (2026-09-14)

- Giao dịch giao việc: TXN-20260914-1 | Danh mục: DHC-G05G09-20260913 v1.0.0
- Thực hiện: GLM (không commit, không push, không deploy) | Chờ: GPT Work duyệt nội dung + phạm vi tích hợp
- Nền làm việc: `9838fb3` (main, trùng origin/main; G06-A đã được commit `9838fb3`)
- **Vòng sửa 1 (TXN-20260914-4)**: sửa cổng nội dung/căn cứ thông số, công cụ ánh xạ cặp, bằng chứng bàn phím, phạm vi và ma trận theo quyết định GPT Work sau TXN-20260914-3. Các phần bị thay thế được đánh dấu rõ trong hồ sơ; bằng chứng lịch sử giữ lại trong output.
- **Vòng sửa 2 (TXN-20260914-6)**: hoàn thiện hồ sơ nguồn (URL đầy đủ, phương thức truy cập, trích dẫn), chốt quyết định hiển thị Tank/GMT/Speedmaster/Tank-excerpt, sửa nốt `enThieuCap` + tự kiểm trên đường kiểm thật, chốt cơ chế thông báo sessionStorage, dọn mục 5.3 trùng và bổ sung mutation T3.
- **Vòng sửa 3 (TXN-20260914-8)**: chốt trình bày năm — nhãn hàng "Mốc năm/Year", Tank 1917 kèm "Thiết kế/Designed" (1917 là mốc thiết kế, không chứng nhận năm thương mại hóa — N10); thu hẹp câu giới thiệu Tank bỏ chi tiết Renault FT-17; đồng bộ cổng câu chữ và ma trận.
- Phạm vi tệp: chỉ `docs/nghiem-thu/G06-B-kiem-ke-so-sanh-en-2026-09-14.md` + `output/g06-compare-en-audit/`. Không sửa `src/`, `public/`, `scripts/`, `package.json`, cấu hình, tài liệu ngoài phạm vi, `output/playwright/`.
- RM-B/RM-D của 3D giải phẫu giữ nguyên theo đề, không thử lại.

## 0. Tóm tắt

Đếm lại từ cơ chế đọc collection (parser frontmatter, đối chiếu chéo dist và tool đo P1.5 — không gọi trực tiếp Astro collection): **mauIconic VI 69 bài xuất bản (0 draft), EN 4 bài (0 draft)**; bảng ARTICLE_PAIRS có đúng 4 cặp mauIconic, khớp 1-1 với 4 tệp EN, đủ đích trong dist (kiem-ke-ket-qua.json).

Kết luận tách biệt về mức đủ của EN (thay cho nhận định "không blocker vì 4 ≥ 2" ở bản trước):

- **Về số lượng bài**: đủ — có 4 mẫu có bài EN thật, thỏa điều kiện tối thiểu hai mẫu để so sánh.
- **Về mức đủ căn cứ dữ liệu**: đánh giá theo từng thông số ở bảng mục 2.6 — Speedmaster đủ căn cứ cả ba thông số theo nguồn chính hãng Omega; Submariner đủ căn cứ (thứ cấp nhất quán, chính hãng 403 khi fetch trực tiếp — ghi giới hạn); **Tank CHƯA đủ căn cứ cho cả ba thông số bộ máy/trữ cót/chống nước** — **ĐÃ CHỐT vòng sửa 2: ba ô hiển thị "Chưa đủ dữ liệu để đối chiếu" / "Not enough data to compare"**; GMT để trống "—" ở cả hai ngôn ngữ kèm chú thích CỔNG-2. **Trình bày năm (chốt vòng sửa 3)**: nhãn hàng "Mốc năm / Year"; Tank 1917 kèm "Thiết kế / Designed" — 1917 là mốc thiết kế (N10), không chứng nhận năm thương mại hóa.

Đối chiếu từng trường: các cặp chênh lệch chuỗi chỉ ở title/excerpt (dịch) và power_reserve ("70 giờ" → "70 hours" — khác đơn vị dịch); year, brand, category, movement, water_resistance, references giống hệt chuỗi.

Hai điểm cần quyết trong chặng 2 (bằng chứng thật, chặng 1 không sửa):

1. **Lỗi dark mode có thật** — hàng chẵn của bảng so sánh giữ lớp `bg-white` không có biến dark: nền trắng `rgb(255,255,255)` + chữ sáng `rgb(238,240,237)` = tương phản **1,15:1**; nhãn 1,85:1 (log-do-hang.txt, tinh-tuong-phan.cjs, ảnh shots/nen-dark-1440.png).
2. **Hai luồng bàn phím của vùng cuộn bảng** (đã xác minh bằng phím thật trong vòng sửa 1; phép đo scrollLeft-only trước đó ở log-hai-luong.txt chỉ chứng minh cuộn bằng mã và đã bị thay thế):
   - Nạp kèm `?m=`: Tab thật 9 nhịp từ đầu trang vào được `.table-scroll-wrap` (tabindex=0, role=region); **ArrowRight/ArrowLeft thật cuộn được** (scrollLeft 0 → 286 → 143) — log-ban-phim.txt.
   - Chọn mẫu sau load: **không có đường Tab vào vùng cuộn trong phiên thử** (Tab thật 80 nhịp không gặp; wrap ngoài không tabindex/role; Chromium, 320px — không khẳng định cho mọi trình duyệt) → trong cấu trúc hiện hành, người dùng chỉ bàn phím không vào được vùng. Bổ sung: focus() bằng mã vẫn đạt (Chromium cho phép focus container cuộn được) và mũi tên cuộn được khi có focus bằng mã (0 → 75) — log-mui-ten-wrap-ngoai.txt; đây không phải đường của người dùng bàn phím.

Build nền: exit 0, **288 HTML = 221 vi + 66 en + 404**, sitemap-0 **287 URL**, check-links **20.967 link, 0 hỏng**, astro check **0 lỗi/0 cảnh báo/4 hints = baseline** (log-build-nen.txt, log-kiem-link-nen.txt). Khớp mốc tham khảo G06-A (288/66/287/20.967/4).

Kết luận chặng 1: **hoàn tất kiểm kê và vòng sửa 1, chờ GPT Work duyệt cổng nội dung + phạm vi. Chưa mở chặng 2; chưa commit/push/deploy.**

## 1. Sổ cái dữ liệu — đếm lại từ cơ chế đọc collection

Công cụ `kiem-ke-du-lieu.cjs` **đọc và đối chiếu frontmatter bằng parser riêng trên tệp .md** trong src/content/mauIconic — KHÔNG gọi trực tiếp API collection của Astro (nêu đúng phương pháp theo yêu cầu TXN-20260914-4; trường `phuongPhap` trong kiem-ke-ket-qua.json ghi rõ mô tả, giới hạn parser và cách đối chiếu chéo). Parser bắt chước cơ chế `getEntriesByLang` (src/lib/content.ts): lọc `draft: true` (mức PROD), lọc theo thư mục ngôn ngữ (`vi/`, `en/`), slug theo quy tắc `getSlug` (ưu tiên `custom_slug`, không có thì dùng tên tệp), sắp xếp date giảm dần rồi theo title. Cặp route chỉ lấy từ bảng `ARTICLE_PAIRS` trong contentRoutes.ts — không suy từ tên tệp giống nhau. **Ánh xạ bài EN (sửa trong vòng 1, hoàn tất vòng 2)**: slug EN được TRÍCH từ routeEn (segment cuối route đích) rồi tra kho EN theo slug đó — không dùng slug VI truy trực tiếp; `enThieuCap` cũng đối chiếu qua routeEn (vòng 2 — bản trước so slugVi, sai khi slug hai bên khác nhau); **tự kiểm 4 ca chạy trên ĐƯỜNG KIỂM THẬT** (xây đối chiếu + tìm thiếu cặp với dữ liệu giả, không chỉ thử hàm trích segment): cặp khác slug tìm đúng và enThieuCap rỗng, cặp trỏ bài EN không tồn tại báo lỗi, bài EN không có cặp được liệt kê, cách cũ được chứng minh bỏ sót — **4/4 ĐẠT, exit 0** (log-kiem-ke-v3.txt; lịch sử log-kiem-ke-v2.txt).

| Đại lượng | Giá trị | Kiểm chứng chéo |
|---|---|---|
| Tệp mauIconic VI | 69 (0 draft) | tool đo P1.5: vi=69 draft 0 (log-do-so-lieu.txt, đo tại HEAD 9838fb3) |
| Tệp mauIconic EN | 4 (0 draft) | tool đo P1.5: en=4 draft 0 |
| Cặp mauIconic trong ARTICLE_PAIRS | 4 | contentRoutes.ts dòng 104-107 |
| EN thiếu cặp | 0 (không có tệp EN nào ngoài bảng) | kiem-ke-ket-qua.json |
| VI chưa có cặp | 65 | 69 − 4 |
| Đích dist 4 cặp | đủ cả VI + EN | xacMinh.distVi/distEn đều true |
| dist/en/so-sanh | KHÔNG tồn tại (không có route giả) | kiem-ke-ket-qua.json |
| /so-sanh trong sitemap | có (1 URL) | sitemap-0.xml |
| Select của công cụ | 70 option = 69 mẫu + 1 placeholder rỗng | log-kiem-hanh-vi.txt A1 |

Số tệp 69/4 chỉ là số tệp; số lựa chọn thực sự của công cụ VI hiện tại là 69 (cả 69 đề cử), số lựa chọn EN khả dụng theo phương án ưu tiên là **4**.

## 2. Bảng trường công cụ dùng — đối chiếu VI/EN từng mẫu

Trường công cụ đọc từ frontmatter (so-sanh.astro dòng 29-40): title, excerpt, year, brand, category (hiển thị qua categoryLabels), movement, power_reserve, water_resistance, slug (getSlug), đọc tiếp qua collectionHref. Bảng dưới trích từ kiem-ke-ket-qua.json (doiChieuTruong).

### 2.1 rolex-submariner ↔ /en/iconic-watches/rolex-submariner/

| Trường | VI | EN | Phân loại khác biệt |
|---|---|---|---|
| title | Rolex Submariner — Huyền thoại lặn sâu | Rolex Submariner — the archetypal dive watch | dịch |
| excerpt | Mẫu đồng hồ lặn đã định hình cả một thể loại… | The dive watch that defined an entire category… | dịch |
| year | 1953 | 1953 | giống |
| brand | Rolex | Rolex | giống |
| category | lặn | lặn | giống (giá trị enum key, nhãn hiển thị theo ngôn ngữ) |
| movement | Calibre 3230 / 3235 | Calibre 3230 / 3235 | giống |
| power_reserve | 70 giờ | 70 hours | khác đơn vị — chỉ dịch |
| water_resistance | 300m | 300m | giống |
| references | 6204, 5513, 14060M, 114060, 126610LV | giống hệt | giống |

### 2.2 omega-speedmaster ↔ /en/iconic-watches/omega-speedmaster/

title/excerpt dịch; year 1957 = 1957; Omega = Omega; category chronograph = chronograph; movement "Calibre 3861" = giống; power_reserve "50 giờ" → "50 hours" (đơn vị); water_resistance "50m" = giống; references CK2915, 105.012, 145.012, 3570.50, 310.30.42 = giống.

### 2.3 cartier-tank ↔ /en/iconic-watches/cartier-tank/

title/excerpt dịch; year 1917 = 1917; Cartier = Cartier; category dress = dress; movement "Calibre 430 MC" = giống; power_reserve "38 giờ" → "38 hours" (đơn vị); water_resistance "30m" = giống; references Tank Normale, Tank Cintrée, Tank Louis, Tank Française, Tank Must = giống.

### 2.4 rolex-gmt-master ↔ /en/iconic-watches/rolex-gmt-master/

title/excerpt dịch; year 1955 = 1955; Rolex = Rolex; category pilot = pilot; **movement, power_reserve, water_resistance: THIẾU ở cả hai ngôn ngữ** (bảng so sánh hiện "—"); không có references (cả hai). Đây chính là ca "trống dữ liệu" cần câu chú thích (mục 4, CỔNG-2).

### 2.5 Năm thuộc dòng hay đời nào — phân tích từng mẫu

Nền tảng: `year` trong schema là "Năm ra mắt" số duy nhất (nhận xét schema giữ nguyên — không sửa frontmatter); trong công cụ, nhãn hàng năm chốt là **"Mốc năm / Year"** (vòng sửa 3) — trung tính, không khẳng định thương mại hóa. Bảng so sánh đặt năm cạnh thông số đời hiện đại trong cùng cột. **Đây là lý do có CỔNG-1 (chú thích giới hạn)** — chú thích này là giới hạn đọc, KHÔNG thay thế việc kiểm chứng từng thông số (mục 2.6).

- **Submariner 1953**: năm của dòng (reference 6204 định ngày cuối 1953, công bố Basel 1954 — bài ghi đúng như vậy). Nhưng `water_resistance: "300m"` là của đời hiện hành — thân bài chính the Rolex ghi thế hệ đầu đạt 100m. `movement: "Calibre 3230 / 3235"` là đời hiện hành (thân bài mục calibre). Ba cặp CAN-KIEM-CHUNG mục 48/49/50 đã xử lý 30/08/2026 (bài diễn đạt lại theo nguồn, thêm Hodinkee/Monochrome). Kết luận: frontmatter không sai nhưng **ghép năm dòng + thông số đời hiện đại trong một bảng không có ghi chú phạm vi thì gây đọc sai**.
- **Speedmaster 1957**: năm dòng; "Calibre 3861" đời hiện hành (thân bài: "Calibre hiện tại là 3861 — phiên bản cập nhật của huyền thoại 1861"). Cùng tình trạng ghép phạm vi.
- **Tank 1917**: **mốc thiết kế — không chứng nhận năm thương mại hóa** (vòng sửa 3 chốt; N10 nguyên văn: "Designed by Louis Cartier in 1917…", trang không ghi năm bán ra); "Calibre 430 MC" — thân bài KHÔNG nhắc calibre này, thân nói thế hệ calibre "8971 MC và calibre_manual 0501"; CAN-KIEM-CHUNG mục 14 (đã giải quyết 08/08/2026): 430 MC là bản mang tên Cartier của Piaget 430P (1996). Vòng sửa 1 đã tra thêm nguồn gốc chính hãng (mục 2.6): **tổ hợp 430 MC + 38 giờ + 30m chưa chứng minh được thuộc mẫu Tank nào** → ba thông số này của Tank là CHƯA ĐỦ CĂN CỨ.
- **GMT-Master 1955**: 3 trường thông số bỏ trống ở cả hai ngôn ngữ — nhất quán với nguyên tắc "thà thiếu còn hơn sai" của SpecTable; thân bài chỉ nói chung về vỏ Oyster.

Căn cứ nguồn trong hồ sơ hiện có: frontmatter sources của 4 bài VI và 4 bài EN là cùng một tập URL, chỉ nhãn được dịch (Submariner: rolex.com + newsroom + Hodinkee Reference Points + Monochrome Part 1/2; Speedmaster: omegawatches.com catalog/collection + Chronicle + PDF hướng dẫn 3861; Tank: cartier.com Tank collection — 1 nguồn duy nhất; GMT: rolex.com GMT-Master II + newsroom). Không coi frontmatter tự thân là bằng chứng đúng — các điểm phạm vi nêu trên đối chiếu với thân bài, CAN-KIEM-CHUNG và nguồn gốc tra mới (mục 2.6).

### 2.6 Bảng căn cứ từng thông số của 4 mẫu EN — tra nguồn gốc (vòng sửa 1; hồ sơ nguồn hoàn thiện trong vòng sửa 2)

Thời điểm tra nguồn: 14/09/2026. Phương thức: WebFetch/WebSearch tới nguồn gốc (hãng) trước; nguồn chuyên ngành chỉ bổ trợ. Bảng nguồn chi tiết (URL, phương thức truy cập, trích dẫn) ở 2.6.1; bảng kết luận dưới đây tham chiếu mã nguồn N1-N8.

| Mẫu | Thông số (frontmatter) | Đời/reference áp dụng | Nguồn chứng minh | Đủ căn cứ? |
|---|---|---|---|---|
| Submariner | movement "Calibre 3230 / 3235" | Đời hiện hành 2020+: 3230 cho bản không lịch (124060), 3235 cho bản có lịch (126610) | N4 (403 khi fetch trực tiếp) + N6, N7 (thứ cấp nhất quán) | **ĐỦ** (thứ cấp nhất quán; chưa trích được nguyên văn từ chính hãng do 403) |
| Submariner | power_reserve "70 giờ" | Đời hiện hành (cả 3230 và 3235) | N6, N7 (thứ cấp nhất quán); thân bài "khoảng 70 giờ" | **ĐỦ** (mức chuyên ngành; cùng giới hạn 403 như trên) |
| Submariner | water_resistance "300m" | Đời hiện hành | N3 (chính hãng, trích qua kết quả tìm kiếm — fetch trực tiếp 403) | **ĐỦ** (ghi phương thức trích gián tiếp) |
| Speedmaster | movement "Calibre 3861" | Moonwatch Professional hiện hành, reference 310.30.42.50.01.001 | N1 (chính hãng, nguyên văn) + N2 (chính hãng) | **ĐỦ** (chính hãng, nguyên văn) |
| Speedmaster | power_reserve "50 hours" (VI "50 giờ") | Cùng reference | N1 nguyên văn "50 hours" | **ĐỦ** (chính hãng, nguyên văn) |
| Speedmaster | water_resistance "50m" | Cùng reference | N1 nguyên văn "5 bar (50 metres / 165 feet)" | **ĐỦ** (chính hãng, nguyên văn; frontmatter "50m" khớp) |
| Tank | movement "Calibre 430 MC" | **Chưa xác lập được cho dòng Tank** — N5 (chính hãng): 430 MC phát triển 1996, "designed for Métiers d'Art watches and limited edition watchmaking"; danh mục Tank hiện hành N8 không công bố mẫu nào dùng 430 MC | N5 + N8 | **CHƯA ĐỦ** — tổ hợp gắn cho "Tank" không chứng minh được |
| Tank | power_reserve "38 giờ" | 38 giờ công bố kèm 430 MC ở mẫu Privé (Tank Chinoise CRWGTA0088 — trích qua kết quả tìm kiếm) — không chứng minh cho mẫu Tank nào của bài | N5 khuôn + trang sản phẩm Tank Chinoise (qua tìm kiếm) | **CHƯA ĐỦ** cho dòng Tank |
| Tank | water_resistance "30m" | Chưa tìm được nguồn nào công bố 30m kèm mẫu Tank cụ thể trong danh mục hiện hành | (không có nguồn) | **CHƯA ĐỦ** |
| Tank | year 1917 | **Mốc THIẾT KẾ — không chứng nhận năm thương mại hóa** (N10 nguyên văn "Designed by Louis Cartier in 1917…", trang không ghi năm bán ra) | N10 (chính hãng, trực tiếp, nguyên văn) + N8; khớp thân bài | **ĐỦ cho "mốc thiết kế"** — hiển thị kèm nhãn "Thiết kế / Designed" (chốt vòng sửa 3) |
| Submariner / Speedmaster / GMT | year 1953 / 1957 / 1955 | Mốc năm của dòng (năm ra mắt dòng) | Bài + hồ sơ nguồn hiện có (CAN-KIEM-CHUNG 48-50 cho Submariner) | **ĐỦ** cho "mốc năm của dòng" |
| GMT-Master | movement / power_reserve / water_resistance | Trống ở cả hai ngôn ngữ | — | Không cần căn cứ (hiển thị "—" kèm chú thích CỔNG-2) |

**Quyết định ĐÃ CHỐT (vòng sửa 2, TXN-20260914-6; bổ sung vòng sửa 3, TXN-20260914-8):**

- **Tank**: ba ô bộ máy/trữ cót/chống nước hiển thị **"Chưa đủ dữ liệu để đối chiếu" (VI) / "Not enough data to compare" (EN)** trên cả hai ngôn ngữ. Không sửa bài gốc Tank.
- **GMT**: giữ ô trống **"—"** kèm chú thích CỔNG-2. Hai trạng thái hiển thị khác nhau: "—" (bài không ghi) và "Chưa đủ dữ liệu" (frontmatter có giá trị nhưng chưa xác lập được phạm vi/reference).
- **Trình bày năm (chốt vòng sửa 3)**: nhãn hàng năm là **"Mốc năm" / "Year"** (không "Năm ra mắt"/"Launch year"); Tank giữ giá trị 1917 kèm **"Thiết kế" / "Designed"** (khuôn ô đề xuất "1917 — Thiết kế" / "1917 — Designed"); 1917 là mốc thiết kế theo N10, không chứng nhận năm thương mại hóa. Không tự đổi frontmatter hay thêm năm mới.

Chú ý: mọi thay đổi frontmatter bài gốc (nếu cần sau này) phải trình hồ sơ riêng.

#### 2.6.1 Bảng nguồn chi tiết (URL, thời điểm, phương thức truy cập, trích dẫn)

| Mã | Nguồn | URL | Thời điểm kiểm | Truy cập | Reference/phạm vi nguồn chứng minh | Trích dẫn/đối chiếu |
|---|---|---|---|---|---|---|
| N1 | Omega — trang sản phẩm Moonwatch Professional 310.30.42.50.01.001 | https://www.omegawatches.com/en-us/watch-omega-speedmaster-moonwatch-professional-co-axial-master-chronometer-chronograph-42-mm-31030425001001 | 14/09/2026 | **Trực tiếp (WebFetch), nguyên văn** | Moonwatch Professional thép 42mm reference 310.30.42.50.01.001 | "Omega 3861"; "50 hours"; "5 bar (50 metres / 165 feet)" |
| N2 | Omega — danh mục Moonwatch Professional | https://www.omegawatches.com/en-us/watches/speedmaster/moonwatch-professional/catalog | 14/09/2026 | **Trực tiếp (WebFetch)** | Cả dòng Moonwatch Professional hiện hành | Bộ máy "manual-winding OMEGA Calibre 3861, the latest Master Chronometer certified version" (phần mô tả dòng) |
| N3 | Rolex — trang tính năng Submariner | https://www.rolex.com/watches/submariner/features | 14/09/2026 | **Gián tiếp — qua kết quả tìm kiếm trích từ trang; fetch trực tiếp HTTP 403** | Submariner hiện hành | "Oyster case waterproof to 300 metres (1,000 feet)" |
| N4 | Rolex Newsroom — Submariner | https://newsroom.rolex.com/watches/oyster-collection/submariner | 14/09/2026 | **Fetch trực tiếp HTTP 403 — giới hạn truy cập, không suy nội dung** | (chưa truy cập được nội dung trong phiên) | Chỉ ghi nhận là nguồn của bài (frontmatter), không dùng làm trích dẫn |
| N5 | Cartier — trang Movements | https://www.cartier.com/en-us/movements.html | 14/09/2026 | **Trực tiếp (WebFetch), nguyên văn** | Calibre 430 MC — phạm vi dùng của calibre (KHÔNG của dòng Tank) | "The extra-thin mechanical movement with manual winding 430 MC was developed in 1996. It is designed for Métiers d'Art watches and limited edition watchmaking creations such as the Cartier Privé Tortue watch." |
| N6 | Watch Limit — hướng dẫn 126610LN | https://watchlimit.com/rolex-submariner-date-126610ln/ | 14/09/2026 | **Gián tiếp — qua kết quả tìm kiếm** | Submariner Date 126610 (3235, ~70 giờ) | Diễn giải: calibre 3235, trữ cót khoảng 70 giờ |
| N7 | Revolution Watch — ra mắt Submariner 2020 | https://revolutionwatch.com/introducing-rolex-new-2020-submariner-family-watch/ | 14/09/2026 | **Gián tiếp — qua kết quả tìm kiếm** | Cả gia đình Submariner 2020 (124060/126610) | Diễn giải: 3230 không lịch, 3235 có lịch, ~70 giờ |
| N8 | Cartier — danh mục Tank | https://www.cartier.com/en-us/watches/collections/tank/ | 14/09/2026 | **Trực tiếp (WebFetch)** | Danh mục Tank hiện hành | Trang không công bố calibre/trữ cót/chống nước cho mẫu nào; mô tả chung Tank của Louis Cartier lấy cảm hứng từ xe tăng Thế chiến I ("flat vertical brancards"). **Phạm vi hỗ trợ (vòng sửa 3): chỉ hỗ trợ mô tả chung đang sử dụng (lấy cảm hứng từ xe tăng Thế chiến I) — không nêu chi tiết mẫu xe tăng cụ thể** |
| N10 | Cartier — trang sản phẩm Tank Louis Cartier CRWGTA0211 | https://www.cartier.com/en-fr/watches/collections/tank/tank-louis-cartier-watch-CRWGTA0211 | 14/09/2026 (vòng sửa 3) | **Trực tiếp (WebFetch), nguyên văn** | Mốc THIẾT KẾ của Tank (1917); trang KHÔNG ghi năm thương mại hóa/bán ra | "Designed by Louis Cartier in 1917, the Tank watch is an icon of modern watchmaking."; "the Tank has been reinterpreted for over a century in a host of variations" |

Nguồn bổ trợ (chỉ chéo, không dùng làm kết luận): WatchBase (430 MC = Piaget 430P); trang sản phẩm Tank Chinoise CRWGTA0088 và Tortue CRHPI01830 (gián tiếp qua tìm kiếm — 430 MC/~38 giờ ở dòng Privé); Superlative Watch Co. (đối chiếu 3230/3235); SwissWatches Magazine (Tank Louis 2025 chuyển 1899 MC — **thứ cấp, chưa tái kiểm được, đã BỎ khỏi kết luận**). Nguồn đối chứng excerpt Speedmaster do GPT Work cung cấp: N9 Bulova 96B251 — xem 4.1.

Giới hạn truy cập ghi nhận trong phiên: rolex.com và newsroom.rolex.com HTTP 403 (N3/N4); bulova.com không truy cập được (lần 1 timeout 60 giây, lần 2 HTTP 302 redirect về trang chủ toàn cầu — không tới trang sản phẩm). 403/redirect là giới hạn truy cập, KHÔNG phải nguồn sai; với N9, nội dung "chronograph Bulova được đeo trên Mặt Trăng trong Apollo 15" ghi THEO MÔ TẢ CỦA GPT WORK, cần tái kiểm trực tiếp khi tích hợp — không dựng trích dẫn.

## 3. Kiểm kê chuỗi runtime của công cụ (cổng câu chữ)

Chuỗi liệt kê từ so-sanh.astro (build-time: title, description, h1, nhãn khối chọn; runtime: thông báo trạng thái trong script inline). EN label menu đã có sẵn: `nav_compare: 'Compare'` (ui.ts dòng 283). Nhãn category 9 giá trị đã có bảng song ngữ dùng chung `getIconicCategoryLabel` (ui.ts) — công cụ hiện TỰ giữ map VI riêng, chưa dùng hàm chung.

## 4. CỔNG CÂU CHỮ — trình duyệt, chờ GPT Work duyệt trước khi sửa

Bảng nguyên văn hiện tại → đề nghị → căn cứ → vị trí. **Chặng 1 không sửa bất kỳ chuỗi nào.** Cập nhật vòng sửa 1: CỔNG-1 thay câu theo chỉ thị TXN-20260914-4 (câu cũ bị THAY THẾ, giữ nguyên văn để đối chiếu); CỔNG-8 sửa hướng dẫn đúng nút; CỔNG-14 chốt nhãn EN "Model overview"; CỔNG-15 chốt bỏ emoji khối chia sẻ ở cả hai bản.

| # | Nguyên văn hiện tại (vị trí) | Đề nghị VI | Đề nghị EN | Căn cứ |
|---|---|---|---|---|
| 1 | "Chọn 2–3 mẫu đồng hồ để đối chiếu thông số và câu chuyện. Dữ liệu lấy trực tiếp từ hồ sơ từng mẫu." (mô tả đầu trang) | Giữ nguyên + thêm câu (theo chỉ thị TXN-20260914-4): "Năm và thông số được trích từ hồ sơ từng mẫu; chúng có thể thuộc các giai đoạn hoặc phiên bản khác nhau. Không coi các giá trị trong cùng cột là cấu hình của một reference cụ thể nếu chưa được ghi rõ." | "Years and specifications are drawn from each model's article and may refer to different periods or variants. Do not treat values in one column as the specification of a single reference unless explicitly identified." | Submariner 1953 cạnh 300m/3230 (thân bài: thế hệ đầu 100m); Tank 1917 cạnh 430 MC (CAN-KIEM-CHUNG 14 + mục 2.6). **Câu cũ đã THAY THẾ** (nguyên văn cũ: "Năm ra mắt là mốc của dòng; bộ máy, trữ cót và chống nước là của thế hệ đang bán hiện nay, trừ khi bài của mẫu ghi rõ khác." — bị gỡ vì chưa có bằng chứng xác lập cho toàn bộ lựa chọn). Chú thích này là GIỚI HẠN đọc, không thay thế kiểm chứng dữ liệu (mục 2.6) |
| 2 | "—" cho ô trống (bảng; GMT có 3 ô) | Thêm chú thích dưới bảng: "— = bài chưa ghi thông số này; không phải 0 và không có nghĩa là tính năng không tồn tại." | "— = not stated in the model's article; it does not mean zero or that the feature is absent." | Yêu cầu đề mục 5 (trống ≠ 0); GMT thiếu 3 trường cả hai ngôn ngữ |
| 3 | "So sánh mẫu iconic" (title/h1) | giữ | "Compare iconic models" | dịch thuần |
| 4 | "Chọn 2-3 mẫu đồng hồ iconic để đối chiếu thông số: năm, thương hiệu, thể loại, bộ máy, trữ cót, chống nước." (description meta) | giữ | "Pick two to three iconic watches and compare year, brand, category, movement, power reserve and water resistance." | dịch |
| 5 | "Thêm mẫu để so sánh:" (nhãn select) | giữ | "Add a model to compare:" | dịch |
| 6 | "— Chọn một mẫu —" (placeholder) | giữ | "— Pick a model —" | dịch |
| 7 | "Thêm" (nút) | giữ | "Add" | dịch |
| 8 | "Tối đa 3 mẫu. Bấm tên mẫu trong bảng để bỏ." (ghi chú) | Thay (theo chỉ thị TXN-20260914-4 — hướng dẫn đúng nút): "Tối đa 3 mẫu. Dùng nút Bỏ bên cạnh tên mẫu để bỏ khỏi bảng." | "Up to 3 models. Use the Remove button beside a model's name to remove it." | Câu cũ hướng dẫn "bấm tên mẫu" sai với cơ chế thật (nút ✕ mới là điều khiển bỏ — log-kiem-hanh-vi.txt A17); cơ chế nhấn vào tên không tồn tại |
| 9 | "Chưa chọn mẫu nào. Thêm ít nhất 2 mẫu để bắt đầu so sánh." (thông báo) | giữ | "No models selected yet. Add at least two to start comparing." | dịch |
| 10 | "Đã chọn" (nhãn panel 1 mẫu) | giữ | "Selected" | dịch |
| 11 | "Thêm ít nhất 1 mẫu nữa để bắt đầu so sánh. ↑" (mời chọn thêm) | giữ | "Add at least one more model to start comparing. ↑" | dịch |
| 12 | "Tiêu chí" (tiêu đề cột đầu) | giữ | "Criteria" | dịch |
| 13 | "Bỏ" (aria-label nút bỏ — 3 nút đều "Bỏ") | "Bỏ {tên mẫu}" | "Remove {model name}" | 3 nút cùng nhãn không phân biệt mẫu — log-kiem-hanh-vi.txt A17 |
| 14 | "Năm ra mắt / Thương hiệu / Thể loại / Bộ máy / Trữ cót / Chống nước / Câu chuyện định danh" (7 nhãn hàng) | Hàng năm đổi nhãn (chốt vòng sửa 3, TXN-20260914-8): "Năm ra mắt" → **"Mốc năm"**; Tank giữ giá trị 1917 kèm **"Thiết kế"** — khuôn ô đề xuất: "1917 — Thiết kế". Các nhãn khác giữ: "Thương hiệu / Thể loại / Bộ máy / Trữ cót / Chống nước / Câu chuyện định danh" | **"Year"** (thay "Launch year" — đã THAY THẾ); Tank: **"1917 — Designed"**; "Brand / Category / Movement / Power reserve / Water resistance / **Model overview**" | Nhãn "Mốc năm/Year" trung tính, không khẳng định thương mại hóa; 1917 là mốc thiết kế theo N10 (2.6.1); "Model overview" chốt TXN-20260914-4 |
| 15 | "🔗 Link chia sẻ:" (khối chia sẻ) | "Link chia sẻ:" (bỏ emoji 🔗 — CHỐT theo chỉ thị TXN-20260914-4, áp cả hai bản) | "Share link:" | quy ước ký tự; nhất quán hai ngôn ngữ |
| 16 | categoryLabels map VI cứng trong so-sanh.astro | thay bằng getIconicCategoryLabel(category, lang) — dùng chung | (tự động "Diver/Chronograph/Dress/Pilot/…") | bảng song ngữ đã có ui.ts; tránh hai nguồn nhãn |
| 17 | (không có chuỗi hiện hành — ô thông số Tank) | Ô thông số của Tank hiển thị nhãn **"Chưa đủ dữ liệu để đối chiếu"** thay cho giá trị chưa xác lập phạm vi (kết hợp CỔNG-2 cho ô trống thật) | **"Not enough data to compare"** | **CHỐT vòng sửa 2 (TXN-20260914-6)** theo bảng căn cứ mục 2.6: 3 giá trị Tank chưa xác lập được reference; dấu "—" không phải số 0, giá trị chưa đủ căn cứ không được trình như dữ kiện. Áp dụng trên cả hai ngôn ngữ, không sửa bài gốc |

Đề nghị bổ sung (không phải sửa câu hiện hành): khi EN chỉ còn 4 mẫu, danh sách EN ngắn hơn VI là hệ quả phạm vi bài đã dịch — câu giải thích EN nên nói rõ: "Only models with published English articles appear here." (mẫu cụ thể chốt ở chặng 2 theo cổng duyệt).

### 4.1 Rà title/excerpt — khẳng định mạnh (vòng sửa 1; chốt phương án vòng sửa 2)

Bản dịch không được coi là mặc nhiên trung tính; rà từng title/excerpt của 4 mẫu về mức khẳng định. **Vòng sửa 2 chốt phương án cho Speedmaster và Tank; các câu cuối dưới đây CHỈ áp dụng trong công cụ (cột "Model overview" nếu hiển thị excerpt) — KHÔNG tự mở quyền sửa excerpt bài gốc; nếu cần sửa bài phải trình hồ sơ riêng.**

| Mẫu | Câu/giá trị | Mức | Kết luận vòng sửa 2 |
|---|---|---|---|
| Submariner | excerpt VI "đã định hình cả một thể loại" / EN "defined an entire category" | khẳng định lịch sử có căn cứ trong bài (đặt chuẩn mực thể loại lặn; thân bài + Monochrome/Hodinkee) | giữ; ghi nhận mức đánh giá biên tập |
| Submariner | title "Huyền thoại lặn sâu" / "the archetypal dive watch" | tính từ/hình ảnh | giọng biên tập, không phải dữ kiện kiểm đếm — giữ |
| Speedmaster | excerpt VI "Đồng hồ chuyên nghiệp duy nhất từng lên Mặt Trăng" / EN "The only professional watch ever worn on the Moon" | khẳng định ĐỘC QUYỀN SAI (có chronograph khác được đeo trên Mặt Trăng — Apollo 15) | **CHỐT: bỏ "duy nhất"** (không giữ chỉ bằng nhãn "theo Omega"). Câu trung tính cuối trình duyệt: VI **"Chronograph gắn với chương trình Apollo của NASA — một trong những chiếc đồng hồ đã lên Mặt Trăng."** / EN **"The chronograph associated with NASA's Apollo programme — one of the watches that went to the Moon."** Căn cứ: thân bài Speedmaster (NASA, Moon) + nguồn đối chứng N9 Bulova 96B251 (chronograph Bulova công bố được đeo trên Mặt Trăng trong Apollo 15 — do GPT Work cung cấp; **chưa truy cập được trực tiếp trong phiên**: lần 1 timeout 60 giây, lần 2 HTTP 302 về trang chủ toàn cầu — nội dung ghi theo mô tả GPT Work, cần tái kiểm khi tích hợp, không dựng trích dẫn) |
| Tank | excerpt VI "…đồng hồ thanh lịch được nhận diện nhiều nhất mọi thời đại" / EN "the most recognizable dress watch of all time" | so sánh cao nhất không có nguồn gốc | **CHỐT (cập nhật vòng sửa 3): không thay bằng "one of the most recognizable"** (vẫn là xếp hạng thiếu căn cứ) và **bỏ chi tiết Renault FT-17 khỏi câu chốt** (câu vòng 2 đã THAY THẾ). Câu cuối trình duyệt: VI **"Mẫu đồng hồ chữ nhật lấy cảm hứng từ xe tăng trong Thế chiến thứ nhất."** / EN **"A rectangular watch inspired by tanks of World War I."** — N8 chỉ hỗ trợ phạm vi mô tả chung đang sử dụng (lấy cảm hứng từ xe tăng Thế chiến I), không nêu mẫu xe tăng cụ thể; N10 xác nhận mốc thiết kế 1917 |
| GMT-Master | excerpt mô tả chức năng + mốc GMT-Master II 1982 | dữ kiện có trong bài | giữ |

Phạm vi áp dụng của hai câu chốt trên: chỉ trong component so sánh chặng 2 (nơi hiển thị excerpt làm hàng "Model overview"); frontmatter bài gốc giữ nguyên trong gói này.

## 5. Kiểm kê hành vi — mã + bản dựng nền (preview dist, không sửa)

Bằng chứng: log-kiem-hanh-vi.txt (40 mốc: 25 ĐẠT + 0 KHÔNG ĐẠT + 15 QUAN SÁT), nen-ket-qua.json, log-hai-luong.txt (đã bị THAY THẾ phần kết luận bàn phím — xem 5.4), log-ban-phim.txt + log-mui-ten-wrap-ngoai.txt (mới, vòng sửa 1), log-do-hang.txt, chuỗi log chẩn đoán cuộn (log-cuon-ngang/cuon-thuc/box-tree/dom-bang.txt), 8 ảnh shots/.

### 5.1 Chọn mẫu và bảng

| Ca | Kết quả đo | Trạng thái |
|---|---|---|
| 0 mẫu | thông báo "Chưa chọn mẫu nào…", bảng ẩn | ĐẠT (A2, A3) |
| 1 mẫu | panel "Đã chọn" + tên mẫu + mời chọn thêm, bảng ẩn, URL ?m=slug | ĐẠT (A4, A5) |
| 2-3 mẫu | bảng 4 cột × 7 hàng; giá trị khớp frontmatter (1953/Rolex/Lặn/3230-3235/70 giờ/300m) | ĐẠT (A6, A7) |
| Chọn trùng qua select | không tăng cột | ĐẠT (A8) |
| Vượt 3 mẫu | cả nút Thêm lẫn sự kiện change đều chặn (cột giữ 4) | ĐẠT (A9) |
| Bỏ mẫu | cột cập nhật, URL cập nhật | ĐẠT (A16 phụ) |
| Chèn DOM | ô bảng chỉ chứa phần tử an toàn (strong/div/span), không ghép HTML từ dữ liệu | ĐẠT (A19) |
| Lỗi JS | không có pageerror trong phiên | ĐẠT (A20) |

Phân loại đúng phép thử (theo chỉ thị TXN-20260914-4): A4/A6/A8/A9 dùng `selectOption`/`dispatchEvent` — đây là **mô phỏng đường mã** (kích hoạt handler giống UI đi qua), KHÔNG phải phép thử chọn bằng bàn phím; phép thử bàn phím thật ở mục 5.4 và log-ban-phim.txt.

### 5.2 URL ?m= — các dạng nhập

| Dạng | Kết quả đo | Trạng thái |
|---|---|---|
| slug sai giữa chuỗi | lọc bỏ, giữ mẫu hợp lệ đúng thứ tự | ĐẠT (A10) |
| 5 slug hợp lệ | slice còn 3 đầu | ĐẠT (A13) |
| toàn slug sai | trạng thái rỗng, không bảng | ĐẠT (A14) |
| trùng lặp ?m=a,a,b | **HIỆN TRẠNG: sinh 2 cột giống hệt nhau (3 nút bỏ cho 2 mẫu)**; bấm 1 nút bỏ mất CẢ HAI cột trùng, URL còn ?m=b | QUAN SÁT (A11, A12) — restoreFromUrl lọc slug hợp lệ + slice(0,3) nhưng KHÔNG loại trùng (so-sanh.astro dòng 119) |
| URL do app ghi | dấu phẩy được mã hóa %2C (URLSearchParams); nhập tay dấu phẩy thô vẫn đọc đúng | QUAN SÁT (A9 chi tiết) |
| link chia sẻ | ẨN khi chỉ khôi phục từ URL; chỉ hiện sau thao tác thêm/bỏ đầu tiên; nội dung khớp URL hiện hành | QUAN SÁT (A15, A16) — render() không gọi saveToUrl() lúc khởi tạo |
| nạp lại trang | lựa chọn khôi phục đúng từ ?m= | ĐẠT (A4-A7 qua URL) |

### 5.3 Không-JS và bàn phím (mục hiện hành — bản mục 5.3 cũ trước vòng sửa 1 đã GỘP vào đây)

- No-JS: select + nút Thêm vẫn hiển thị nhưng không chức năng; **hộp trạng thái rỗng trống chữ** (#compare-empty-content chỉ được render() điền bằng JS); bảng ẩn. Không có đường so sánh nào khi tắt JS (công cụ vốn cần JS) — QUAN SÁT (B1).
- Nút bỏ: Enter kích hoạt được (nút thật); **sau khi bỏ, focus rơi về BODY** — người dùng bàn phím mất vị trí — QUAN SÁT (A18).
- aria-label nút bỏ: cả ba đều "Bỏ", không phân biệt mẫu — QUAN SÁT (A17); đề nghị CỔNG-13.
- Chọn mẫu bằng bàn phím thật (vòng sửa 1): Tab tới select (7 nhịp từ đầu trang), gõ "R" + Enter — native select phát change và **thêm mẫu được, URL cập nhật** (`?m=audemars-piguet-royal-oak-perpetual-calendar` khi gõ "R" — nhảy tới option khớp chữ đầu, hành vi native) — log-ban-phim.txt (luongChonTay.chonBangPhimR).
- **Lịch sử (đã sửa)**: bullet của mục 5.3 bản trước viết "Select: thay đổi trực tiếp bằng bàn phím (change) cũng thêm mẫu — đo qua A4/A6 (dispatchEvent change…)" — sai phân loại: `selectOption`/`dispatchEvent` là MÔ PHỎNG ĐƯỜNG MÃ (kích hoạt handler), KHÔNG phải phép thử bàn phím; phép thử bàn phím thật là dòng phía trên (log-ban-phim.txt) và phân loại đúng đã ghi ở 5.1.

### 5.4 Cuộn ngang — hai luồng, xác minh bàn phím thật (vòng sửa 1)

Cấu trúc khi hoạt động: BaseLayout có `markOverflowTables()` bọc bảng tràn bằng `.table-scroll-wrap` (tabindex=0, role=region, nhãn "Bảng dữ liệu — dùng phím mũi tên trái và phải…", gợi ý kéo ngang) — chạy lúc script nạp và LẠI lúc window.load (BaseLayout.astro dòng 210-233).

**Kết quả phép thử bàn phím thật** (pw-g06b-ban-phim.js + pw-g06b-mui-ten-wrap-ngoai.js; viewport 320px):

- **Luồng nạp kèm ?m=** (bọc `.table-scroll-wrap` lúc load): Tab thật từ đầu trang — **9 nhịp tới được vùng** (activeElement = DIV.table-scroll-wrap, tabindex=0, role=region); **ArrowRight thật ×2: scrollLeft 0 → 286; ArrowLeft thật ×1: 286 → 143** — điều hướng mũi tên HOẠT ĐỘNG, focus giữ ở vùng (log-ban-phim.txt luongUrl).
- **Luồng chọn mẫu sau load**: cấu trúc không đổi (coVungTrong=false, tabindexNgoai=null, roleNgoai=null); **Tab thật 80 nhịp KHÔNG gặp vùng cuộn trong phiên thử này** (Chromium, 320px — giới hạn của phép thử, không khẳng định cho mọi trình duyệt) → không có đường Tab vào vùng trong cấu trúc hiện hành. Bổ sung: `focus()` bằng mã vẫn đạt trên wrap ngoài (Chromium cho phép focus container cuộn được dù không tabindex) và khi có focus đó, ArrowRight thật ×2 cuộn được (0 → 75) — nhưng đó không phải đường của người dùng bàn phím (log-mui-ten-wrap-ngoai.txt).
- Cả hai luồng: trang không tràn ngang (0px ở 320/768/1024/1440), bảng min-w 640px có hiệu lực trong CSS dist.
- Cả hai luồng đều cuộn được bằng chuột/cảm ứng (khu vực có overflow-x:auto): đo bằng mã trước đó 354px (log-hai-luong.txt).

**Đánh dấu thay thế**: kết luận của log-hai-luong.txt bản trước ("luồng chọn tay không cuộn được bằng bàn phím") đã bị THAY THẾ bởi phép thử thật ở trên — file và log giữ lại làm bằng chứng lịch sử cho phần cấu trúc và cuộn-by-mã; phần kết luận bàn phím chỉ có giá trị ở log-ban-phim.txt / log-mui-ten-wrap-ngoai.txt.

### 5.5 Dark mode và bố cục

| Bề rộng | Sáng | Tối |
|---|---|---|
| 320/768/1024/1440 | không tràn trang; hàng chẵn nền trắng + chữ navy (đọc tốt) | không tràn trang; **hàng chẵn nền trắng rgb(255,255,255) + chữ sáng rgb(238,240,237) = 1,15:1; nhãn 1,85:1 — KHÔNG ĐẠT nếu đặt theo chuẩn 4,5:1** |

Nguồn lỗi: lớp `bg-white` theo hàng chẵn trong render() (so-sanh.astro dòng 231) không có biến dark:. Hàng lẻ `bg-cream-dark/5` ở cả hai chế độ — chấp nhận được. Ảnh xác nhận: shots/nen-dark-1440.png (các hàng "Năm ra mắt", "Thể loại", "Trữ cót" gần như vô hình), nen-dark-320.png. Phép đo: log-do-hang.txt + tinh-tuong-phan.cjs.

Điểm đo "cuộn wrap ngoài=0px" trong log-kiem-hanh-vi.txt phần C là đo wrap NGOÀI (đúng như ghi chú trong log); cuộn thật của vùng bên trong ở log-hai-luong.txt — không mâu thuẫn.

### 5.6 Điểm vào, chuyển ngôn ngữ, SEO

| Ca | Hiện trạng đo được | Trạng thái |
|---|---|---|
| Menu VI | "Khám phá" → "So sánh" trỏ /so-sanh | ĐẠT (mã + dist) |
| Menu EN | mục "So sánh" hiển thị VI-only kèm nhãn "Vietnamese only" (hreflang="vi") — cơ chế D2; check-g01 exploreViOnly=['/so-sanh'] | QUAN SÁT — hết khi có cặp |
| Danh sách VI /mau-iconic | 69 nút "So sánh" (so-sanh?m=slug, Card.astro) + link mô tả "Mở công cụ so sánh →" | ĐẠT (đếm -o từ dist) |
| Danh sách EN /en/iconic-watches/ | KHÔNG có nút so sánh; "so-sanh" chỉ xuất hiện 2 lần (menu Explore) | ĐẠT (đếm -o) |
| Bài VI | link "Đặt cạnh mẫu khác" → so-sanh?m=slug (IconicArticle gate lang==='vi') | ĐẠT |
| Bài EN | KHÔNG có link so sánh, KHÔNG có href="/en/so-sanh" (0 occurrence) — ArticleLayout có sẵn nhãn 'Compare with another model' | ĐẠT (đếm -o) |
| Switcher trên /so-sanh?m=… | href="/en/" (không giữ ?m=), cờ data-lang-switch=untranslated → hộp thoại "chưa dịch"; giữ-hash G05-B không áp dụng (không phải cặp lịch sử) | QUAN SÁT (D2) |
| canonical/hreflang /so-sanh | canonical www.kienthucdonghoco.vn/so-sanh/; KHÔNG có hreflang vi/en (chưa có cặp — không sinh giả) | QUAN SÁT (E1) |
| og:image /so-sanh | og-default.jpg (không có mục trong OG_IMAGE_MAP) | QUAN SÁT |
| Chunk 3D | /so-sanh chỉ nạp hoisted + 2 CSS, không chunk exploded/three/orbit | ĐẠT (D1) |
| Lịch sử trình duyệt | saveToUrl dùng replaceState — không thêm entry lịch sử; không đụng hook hash G05 | QUAN SÁT (mã dòng 127) |

## 6. Chính sách chuyển ngôn ngữ và URL (ĐÃ ĐƯỢC GPT WORK CHẤP THUẬN ĐỊNH HƯỚNG — phương án A, TXN-20260914-4)

Hiện trạng đo được: switcher toàn site đi qua switcherTarget(pathname) — KHÔNG nhận query; trên /so-sanh?m=… nhảy hộp thoại "chưa dịch", đích /en/, mất lựa chọn âm thầm.

Phương án A (ĐÃ CHẤP THUẬN) — giữ lựa chọn theo khuôn G05-B:
- Cặp /so-sanh/ ↔ /en/compare/ là cặp switcher riêng; script scoped trong component so-sanh (kích hoạt theo pathname == '/so-sanh' hoặc '/en/compare/', nối qua attribute như data-lang-hash-keep của G05-B) — KHÔNG đổi switcher toàn site, không đổi hook lịch sử G05.
- Quy tắc chuyển ?m=: lấy các slug theo thứ tự, loại trùng, giới hạn 3; chỉ giữ slug CÓ bài ở ngôn ngữ đích (EN hiện tại: 4 slug, kiểm theo bảng cặp của ngôn ngữ đích — không suy từ tên tệp); nếu còn ít nhất 1 mẫu hợp lệ → đích /en/compare/?m=…(đúng số mẫu hợp lệ, giữ thứ tự); nếu 0 mẫu hợp lệ → về trang đích không query, trang đích hiện trạng thái rỗng đúng ngôn ngữ.
- **Thông báo mẫu không chuyển được — CƠ CHẾ ĐÃ CHỐT (vòng sửa 2, TXN-20260914-6): sessionStorage một lần, không dùng query.** Lý do bỏ phương án query kiểu `?dropped=1`: query do script ghi vẫn bị người dùng sửa được, không phải nguồn đáng tin về số mẫu thiếu bản dịch; số nhập tay không được tin.
  - Khi chuyển ngôn ngữ thành công có lọc: script ghi vào sessionStorage (chỉ dùng cho chuyển ngôn ngữ cùng tab) một bản ghi có cấu trúc: danh sách lựa chọn nguồn ĐÃ CHUẨN HÓA (slug hợp lệ, đã loại trùng, tối đa ba), ngôn ngữ nguồn, ngôn ngữ đích, đường đích.
  - Trang đích ĐỌC bản ghi rồi TỰ ĐỐI CHIẾU lại với danh sách mẫu/ngôn ngữ đích và bảng cặp route để TÍNH số mẫu không chuyển được — không tin bất kỳ số "dropped" lưu sẵn hay nhập tay; bản ghi chỉ là dữ liệu vào cho phép tính ở đích.
  - Kiểm cấu trúc bản ghi khi đọc (không đúng khuôn thì bỏ qua); **xóa khóa ngay sau khi đọc** (một lần dùng); giới hạn tối đa ba mẫu từ nguồn.
  - Không dùng được storage, mở tab mới, hoặc vào bằng link chia sẻ trực tiếp: chỉ hiện thông báo phạm vi EN chung (CỔNG: "Only models with published English articles appear here.") — không bịa số mẫu bị bỏ, không đoán.
  - **Không đưa dropped vào link chia sẻ** (?m= giữ nguyên định nghĩa); đây là thông báo UX, không phải cơ chế xác thực bảo mật; không đổi switcher toàn site.
- URL nhập tay ở đích được kiểm theo danh sách hợp lệ của ngôn ngữ đích (restoreFromUrl đã lọc — thêm loại trùng theo quyết đã duyệt).
- No-JS: switcher là liên kết thật về trang đích (không giữ ?m= khi tắt JS; giới hạn ghi rõ như G05-B); trang đích có giải thích tĩnh và đường đọc bài thật — không giả vờ công cụ vẫn tương tác.
- URL nhập tay ở đích được kiểm theo danh sách hợp lệ của ngôn ngữ đích (restoreFromUrl đã lọc — thêm loại trùng theo quyết đã duyệt).
- No-JS: switcher là liên kết thật về trang đích (không giữ ?m= khi tắt JS; giới hạn ghi rõ như G05-B); trang đích có giải thích tĩnh và đường đọc bài thật — không giả vờ công cụ vẫn tương tác.

## 7. Phạm vi chặng 2 — ĐÃ ĐƯỢC GPT WORK CHẤP THUẬN ĐỊNH HƯỚNG (TXN-20260914-4); chưa sửa gì

Các điểm đã được chấp thuận: switcher phương án A; sửa dark mode, trùng query, focus sau bỏ, link chia sẻ khởi tạo và vùng cuộn của công cụ; có lối vào từ danh sách và bài EN (tra route thật, không ghép /en/so-sanh); dùng og-mau-iconic.jpg hiện có cho hai route; no-JS có giải thích tĩnh và đường đọc bài thật.

| Tệp | Thao tác | Lý do / ghi chú |
|---|---|---|
| src/components/compare/CompareExperience.astro | tạo mới | khuôn chung VI/EN theo mẫu AnatomyExperience (G06-A): chuỗi runtime trong blob JSON kiểu #compare-i18n, modelsData truyền define:vars. **Vùng cuộn do component TỰ QUẢN**: component tự bọc bảng trong vùng cuộn có tabindex=0 + role="region" + nhãn ngay khi render (cả hai ngôn ngữ, cả hai luồng) để không phụ thuộc markOverflowTables của BaseLayout và không bị bọc lồng; KHÔNG đề xuất gọi markOverflowTables từ ngoài — hàm nằm trong scope script BaseLayout, chưa kiểm mã là không gọi |
| src/pages/so-sanh.astro | sửa thành wrapper mỏng | gọi CompareExperience lang="vi" — giữ route, nội dung thay đổi đúng các mục đã duyệt ở cổng câu chữ |
| src/pages/en/compare.astro | tạo mới | wrapper lang="en" — danh sách 4 mẫu EN qua getEntriesByLang('mauIconic','en') |
| src/i18n/contentRoutes.ts | thêm 1 cặp | { vi: '/so-sanh', en: '/en/compare/' } vào STATIC_PAIRS — sitemap EN tự vào qua customPages (astro.config.mjs dòng 37-40) |
| src/i18n/ui.ts | thêm mục OG_IMAGE_MAP | /en/compare và /so-sanh → /images/og/og-mau-iconic.jpg (tài sản hiện có, đã chấp thuận) |
| src/components/Header.astro | KHÔNG sửa | exploreGroup tự nhận href khi cặp tồn tại (localizedHref); nhãn nav_compare EN "Compare" đã có (ui.ts:283) |
| src/components/Card.astro | sửa | hiện ghép route bằng localizedPath('/so-sanh?m=') — SAI nếu dùng cho EN (sinh /en/so-sanh 404); đổi sang tra bảng cặp để nút "So sánh/Compare" trỏ route đúng ngôn ngữ (lối vào từ danh sách đã chấp thuận) |
| src/pages/mau-iconic/index.astro | giữ nguyên | đã truyền getCompareSlug — VI hoạt động đúng hiện trạng |
| src/pages/en/iconic-watches/index.astro | sửa | thêm lối vào so sánh EN (nút trên Card hoặc link mô tả) — tra route thật từ bảng cặp |
| src/components/templates/IconicArticle.astro | sửa | mở gate compareHref cho EN qua bảng cặp (/en/compare/?m=slug) — ArticleLayout đã có nhãn 'Compare with another model' |
| src/layouts/BaseLayout.astro | KHÔNG sửa | markOverflowTables giữ nguyên hành vi toàn site; vùng cuộn công cụ do CompareExperience tự quản |
| scripts/check-g01-navigation.mjs | sửa | bỏ '/so-sanh' khỏi exploreViOnly (dòng 239); thêm kiểm anchor /en/compare/ theo khuôn /en/anatomy/ (dòng 268-269); cập nhật nhận xét |
| scripts/check-english-launch.mjs | sửa | REQUIRED_EN thêm '/en/compare/' (62 → 63) |
| scripts/check-g06-compare.mjs | tạo mới | kiểm nguồn + dist theo ma trận mục 8 |
| package.json | sửa | nối check-g06-compare vào `check` + chuỗi build dist; thêm lệnh `check:g06b` |

Không đề xuất thêm tệp vào src/data/: nếu thêm, các checker quét thư mục (check-evolution-data với SKIP_FILES, check-learning-paths, check-care-cluster, check-first-watch-cluster, generate-glossary-terms…) cần ngoại lệ riêng — phải trình GPT Work duyệt từng checker. Chuỗi hai ngôn ngữ đặt trong component là đủ, không cần tệp dữ liệu mới. Không tổng quát hóa getEntriesByLang, không đổi schema, không tái cấu trúc, không nâng package.

## 8. Ma trận nghiệm thu dự kiến chặng 2 (chưa chạy — toàn bộ ghi CHƯA KIỂM)

Mỗi ca ghi tiêu chí đo được; tách ĐẠT/KHÔNG ĐẠT/CHƯA KIỂM/QUAN SÁT; kiểm cấu trúc không được tính thay chứng minh nội dung/hành vi.

| Ca | Tiêu chí đo | Trạng thái |
|---|---|---|
| M1 Route | dist có /so-sanh/ và /en/compare/; sitemap đủ 2 URL; canonical + hreflang vi/en + x-default đúng trên cả hai | CHƯA KIỂM |
| M2 Menu | VI + EN: mục So sánh/Compare trỏ route đúng ngôn ngữ, KHÔNG còn nhãn Vietnamese only (desktop + mobile); check-g01 cập nhật và ĐẠT | CHƯA KIỂM |
| M3 Switcher | hai chiều; giữ ?m= theo chính sách đã duyệt: đủ cặp / một phần / không còn mẫu hợp lệ; không đổi hành vi query/hash toàn site; no-JS tới trang đích thật | CHƯA KIỂM |
| M4 Chuỗi EN | DOM sau mỗi trạng thái thao tác: 0 chuỗi VI lọt (quét theo bảng chuỗi runtime mục 3); aria-label, thông báo, hint, share đều EN | CHƯA KIỂM |
| M5 Dữ liệu | 4 mẫu EN; bảng đối chiếu từng trường khớp mục 2; **nhãn hàng năm là "Mốc năm/Year" (không "Năm ra mắt/Launch year"); ô năm Tank là "1917 — Thiết kế"/"1917 — Designed"** (chốt vòng sửa 3); category hiển thị qua getIconicCategoryLabel; 0 excerpt VI ở EN | CHƯA KIỂM |
| M6 Phạm vi | câu giới hạn năm/thế hệ + chú thích "—" + **câu mô tả Tank đúng bản chốt ("Mẫu đồng hồ chữ nhật lấy cảm hứng từ xe tăng trong Thế chiến thứ nhất." / "A rectangular watch inspired by tanks of World War I." — KHÔNG chứa "Renault FT-17", không gọi 1917 là năm ra mắt)** hiển thị đủ hai ngôn ngữ; mutation gỡ câu hoặc thay giá trị → checker bắt (T3a/T3b) | CHƯA KIỂM |
| M7 Trạng thái chọn | 0/1/2/3; trùng bị chặn (theo quyết duyệt); vượt 3 chặn cả hai đường; thêm/bỏ đúng; focus sau bỏ không rơi về BODY (phương án xử lý do GPT Work chốt) | CHƯA KIỂM |
| M8 URL | hợp lệ/sai/lặp/mã hóa %2C/5-slug/toàn sai; nạp lại giữ lựa chọn; link chia sẻ khớp URL | CHƯA KIỂM |
| M9 Bàn phím | select + change; vùng cuộn bảng có tabindex + role + mũi tên CẢ HAI luồng (nạp ?m= và chọn tay); nút bỏ aria phân biệt mẫu | CHƯA KIỂM |
| M10 Bố cục | 320/768/1024/1440 × sáng/tối: không tràn trang; bảng cuộn trong vùng riêng; dark mode mọi hàng đạt tương phản (≥ 4,5:1 — sửa bg-white) | CHƯA KIỂM |
| M11 Hiệu năng | **không nạp sớm chunk 3D** khi mở công cụ (khuôn D1: không request chunk chứa three/exploded/orbit); **tổng tải đo và giải thích**: đo số byte HTML/CSS/JS + số request của /so-sanh và /en/compare/ so với nền cùng khuôn đo mạng G04 (tách dòng JS/CSS/ảnh) và giải thích phần tăng (khuôn chuỗi mới, dữ liệu 4 mẫu) — KHÔNG áp đặt tổng byte không tăng tuyệt đối | CHƯA KIỂM |
| M12 Đọc tiếp | mọi link trong/khỏi công cụ trỏ route thật (collectionHref/bảng cặp), không link giả | CHƯA KIỂM |
| M13 No-JS | trang đích thật; **giải thích tĩnh** về công cụ cần JS + đường đọc bài thật (link tới bài mẫu vẫn dùng được); không giả vờ công cụ vẫn tương tác | CHƯA KIỂM |
| M14 Mutation | 4 mutation cụ thể (bảng dưới) — checker bắt được, exit khác 0 | CHƯA KIỂM |
| M15 Reduced-motion | ca phù hợp công cụ (bảng dưới) — công cụ không có chuyển động nội dung | CHƯA KIỂM |

### 8.1 Mutation cụ thể (tiêm gì — bộ kiểm nào bắt — kỳ vọng)

Phân loại rõ (theo chỉ thị vòng sửa 2): **kiểm dist** = quét HTML tĩnh trong dist (không chạy JS); **kiểm trình duyệt** = nạp trang thật, thao tác, đọc DOM sau tương tác. Một script chỉ quét dist KHÔNG được ghi là đã kiểm DOM sau tương tác.

| Mutation | Tiêm gì (chỉ trên bản dựng thử, không commit) | Bộ kiểm bắt (loại) | Kỳ vọng |
|---|---|---|---|
| T1 — thiếu dịch | Trong CompareExperience, cho nhánh lang='en' trả chuỗi VI (xóa khóa EN hoặc trỏ nhầm bảng) | **(dist)** check-g06-compare quét HTML dist /en/compare/ so với bảng chuỗi runtime đã duyệt; **(trình duyệt)** nạp /en/compare/, thêm mẫu thật, đọc DOM: 0 chuỗi VI trong nội dung động | chuỗi VI ở dist hoặc DOM động → KHÔNG ĐẠT, exit khác 0 |
| T2 — đích giả | Thay href đọc tiếp/bài mẫu trong trang EN thành `/en/so-sanh` hoặc route không tồn tại | **(dist)** check-links (toàn dist) + check-g06-compare kiểm đích từng link theo bảng cặp; **(trình duyệt)** click thật qua các link công cụ | link chết/giả → exit khác 0 |
| T3a — mất chú thích phạm vi | Gỡ câu giới hạn (CỔNG-1) hoặc chú thích "—" (CỔNG-2) hoặc nhãn "Chưa đủ dữ liệu" (CỔNG-17) khỏi trang | **(dist)** check-g06-compare kiểm presence nguyên văn câu đã duyệt trong dist cả hai ngôn ngữ | thiếu câu giới hạn → KHÔNG ĐẠT |
| T3b — giá trị sai lọt trở lại (mới, vòng sửa 2) | Thay giá trị đã duyệt bằng giá trị khác HOẶC cho ba giá trị Tank (430 MC / 38 giờ / 30m) hiển thị trở lại trong công cụ — dù chú thích CỔNG-1/2/17 vẫn còn nguyên | **(dist + trình duyệt)** check-g06-compare so từng ô bảng với bảng dữ liệu đã duyệt (kiem-ke-ket-qua.json + quyết định mục 2.6): ô Tank bộ máy/trữ cót/chống nước PHẢI đúng nhãn "Chưa đủ dữ liệu để đối chiếu"/"Not enough data to compare" | bất kỳ giá trị Tank nào khác nhãn chốt xuất hiện → KHÔNG ĐẠT dù chú thích còn |
| T4 — query không hợp lệ | Mô phỏng restoreFromUrl không lọc slug (chấp nhận slug tùy ý) | **(trình duyệt)** nạp ?m=slug-sai → kỳ vọng trạng thái rỗng; nạp ?m=a,a,b → kỳ vọng không có cột trùng (sau sửa trùng) | cột giả/trùng xuất hiện → KHÔNG ĐẠT |

### 8.2 Reduced-motion phù hợp công cụ (không có chuyển động nội dung)

| Ca | Tiêu chí đo | Kỳ vọng |
|---|---|---|
| RM-C1 | Chạy toàn bộ thao tác chính trong context `prefers-reduced-motion: reduce` (thêm/bỏ/URL/switcher) | hành vi và trạng thái cuối GIỐNG hệt chế độ thường (không có chuyển động phụ thuộc); không lỗi |
| RM-C2 | Kiểm tĩnh mã component (nguồn + chunk dist của trang công cụ): không dùng requestAnimationFrame/setInterval chu kỳ/CSS animation dài | 0 kết quả khớp — công cụ không có chuyển động tự phát; chỉ có transition-colors ngắn của nút/liên kết (kế thừa nền, không phải chuyển động nội dung) |

## 9. Bảng bằng chứng (output/g06-compare-en-audit/)

| Tệp | Nội dung |
|---|---|
| kiem-ke-du-lieu.cjs + kiem-ke-ket-qua.json | census 69/4, cặp từ ARTICLE_PAIRS, ánh xạ EN qua routeEn, **tự kiểm 4 ca trên đường kiểm thật** (xây đối chiếu + tìm thiếu cặp với dữ liệu giả: khác slug/enThieuCap rỗng — cặp hỏng báo lỗi — bài EN mồ côi được liệt kê — cách cũ so slugVi được chứng minh sai) qua xayDoiChieu/timEnThieuCap (log-kiem-ke-v3.txt exit 0), phương pháp + giới hạn parser, chuỗi runtime, dist |
| kiem-ke-ket-qua.v1-txn-20260914-3.json, kiem-ke-ket-qua.v2-txn-20260914-4.json | **bằng chứng lịch sử** — bản 1 (ánh xạ tra EN bằng slug VI) và bản 2 (ánh xạ qua routeEn, tự kiểm chỉ ở hàm trích segment); được thay thế bởi kiem-ke-ket-qua.json (v3, tự kiểm đường kiểm thật) |
| log-kiem-ke-v3.txt | **MỚI (vòng sửa 2)** — chạy kiểm kê v3: 4/4 ca tự kiểm đường kiểm thật ĐẠT, exit 0, số thật không đổi (69/4, enThieuCap rỗng) |
| log-kiem-ke-v2.txt | lịch sử — chạy kiểm kê v2 (vòng sửa 1, 3 ca tự kiểm hàm trích segment) |
| log-build-nen.txt | build nền: exit 0; 288 HTML (221+66+404); sitemap 287; 0/0/4 hints; các bộ check trong build ĐẠT |
| log-kiem-link-nen.txt | check-links: 288 trang, 20.967 link, 0 hỏng, exit 0 |
| pw-g06b-hanh-vi.js + log-kiem-hanh-vi.txt + nen-ket-qua.json | 40 mốc hành vi (25 ĐẠT / 0 KHÔNG ĐẠT / 15 QUAN SÁT), phân loại 3 trạng thái |
| pw-g06b-do-hang.js + log-do-hang.txt | đo nền hàng trên đúng phần tử tr: bg-white hiệu lực ở dark → trắng |
| tinh-tuong-phan.cjs | tương phản 1,15:1 và 1,85:1 |
| pw-g06b-hai-luong.js + log-hai-luong.txt | **ĐÃ BỊ THAY THẾ phần kết luận bàn phím** (chỉ gán scrollLeft bằng mã — chứng minh cuộn bằng mã, không chứng minh bàn phím); giữ làm bằng chứng lịch sử cho cấu trúc hai luồng + cuộn chuột-by-mã 354px |
| pw-g06b-ban-phim.js + log-ban-phim.txt | **MỚI (vòng sửa 1)** — phép thử bàn phím thật: luồng ?m= Tab 9 nhịp vào vùng (tabindex=0/region), ArrowRight ×2 (0→286), ArrowLeft ×1 (286→143); luồng chọn tay Tab 80 nhịp không vào được; chọn mẫu bằng bàn phím thật qua native select (KeyR+Enter, URL cập nhật) |
| pw-g06b-mui-ten-wrap-ngoai.js + log-mui-ten-wrap-ngoai.txt | **MỚI (vòng sửa 1)** — bổ sung: wrap ngoài nhận focus() bằng mã (Chromium cho focus container cuộn được), ArrowRight ×2 cuộn 0→75 khi có focus bằng mã; không có đường Tab |
| pw-g06b-cuon-ngang.js + log-cuon-ngang.txt, pw-g06b-cuon-thuc.js + log-cuon-thuc.txt, pw-g06b-box-tree.js + log-box-tree.txt, pw-g06b-dom-bang.js + log-dom-bang.txt | chuỗi chẩn đoán dẫn tới phát hiện markOverflowTables bọc lại lúc load (mỗi script một log thật) |
| shots/nen-{light,dark}-{320,768,1024,1440}.png | 8 ảnh bố cục đại diện cả hai chế độ |
| log-do-so-lieu.txt | stdout tool đo P1.5 tại HEAD 9838fb3 (đo ở vòng trước, KHÔNG chạy lại theo đề vòng sửa 1 vì tool ghi tệp ngoài gói): mauIconic vi=69 draft 0 / en=4 draft 0; 288 HTML = 221 vi + 66 en + 404; sitemap 287 |
| log-preview-nen.txt, log-preview-vong-sua.txt | server preview hai đợt đo |
| tach-json.cjs | tách kết quả JSON từ log CLI |

Chuẩn đo số dùng tool `output/p1.5-documentation-sync/do-so-lieu.cjs`: cùng số 288/221/66/404 và mauIconic vi=69/en=4 draft 0 (bằng chứng log-do-so-lieu.txt; vòng sửa 1 và vòng sửa 2 KHÔNG chạy lại tool này vì nó ghi tệp ngoài gói). Chi tiết nguồn tra mới: bảng N1-N9 ở mục 2.6.1 (vòng sửa 2 hoàn thiện URL/phương thức/trích dẫn; các dữ kiện phụ không dùng cho quyết định hiển thị đã bỏ khỏi kết luận).

## 10. Giới hạn của chặng 1

- Hành vi đo trên preview dist cục bộ (localhost) — không thay thế nghiệm thu production (quy ước dự án sau vụ redirect /en).
- Ảnh chụp duyệt bằng mắt, không phải phép đo pixel; không test trình đọc màn hình thật.
- Không chạy mutation (checker chặng 2 chưa tồn tại); các ca ma trận mục 8 chưa chạy — toàn bộ CHƯA KIỂM.
- Nguồn gốc tra mới (mục 2.6 + 2.6.1): Omega và Cartier trích được nguyên văn từ chính hãng; Rolex chặn fetch trực tiếp (403) — số liệu Submariner dẫn qua kết quả tìm kiếm trích từ trang chính hãng + nguồn chuyên ngành nhất quán, ghi rõ ở từng dòng. Bulova (N9, nguồn đối chứng excerpt Speedmaster do GPT Work cung cấp) không truy cập được trong phiên (timeout rồi 302 về trang chủ toàn cầu) — nội dung ghi theo mô tả GPT Work, cần tái kiểm khi tích hợp. Không coi 403/redirect là nguồn sai; không dựng trích dẫn.
- Phép thử bàn phím: đã xác minh phím thật (Tab/Arrow) cho cả hai luồng ở 320px (Chromium); kết luận "không vào được vùng" chỉ áp dụng cho phiên thử, chưa thử trình duyệt khác; chưa test screen reader — ca trình duyệt khác thuộc chặng 2.
- RM-B/RM-D 3D không đụng tới theo đề.

## 11. Điểm chờ quyết định của GPT Work (sau vòng sửa 3)

1. Duyệt khuôn trình bày ô năm Tank chốt ở CỔNG-14: "1917 — Thiết kế" / "1917 — Designed" (dấu trình bày do GPT Work xem khi duyệt; mốc thiết kế và nhãn hàng "Mốc năm/Year" đã chốt theo chỉ thị TXN-20260914-8).
2. Duyệt cơ chế thông báo sessionStorage một lần (mục 6) với cấu trúc bản ghi + tự đối chiếu ở đích + xóa sau đọc + nhánh không-dùng-được-storage chỉ hiện thông báo phạm vi chung.
3. Duyệt mở rộng mutation T3b (giá trị Tank lọt trở lại phải bị bắt dù chú thích còn) và phân loại kiểm dist/trình duyệt trong bảng 8.1.
4. Xác nhận ma trận mục 8 (M11 đo-giải-thích, M15 reduced-motion, T1-T4b, M5/M6 đã đồng bộ nhãn năm và câu Tank) đủ để mở chặng 2.

Các phần ĐÃ CHỐT không còn chờ: ánh xạ EN qua routeEn; câu Speedmaster (bỏ "duy nhất", câu trung tính Apollo); ba ô Tank "Chưa đủ dữ liệu"; dấu "—" của GMT; sessionStorage có kiểm tra và tính lại tại đích; T3a/T3b; phân loại kiểm dist/trình duyệt; nhãn hàng "Mốc năm/Year" + Tank kèm "Thiết kế/Designed"; câu mô tả Tank mới không còn Renault FT-17.
