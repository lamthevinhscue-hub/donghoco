# KẾ HOẠCH HỢP NHẤT GIAI ĐOẠN 3 — SỬA LỖI VÀ PHÁT TRIỂN NỘI DUNG CHIỀU SÂU

**Ngày lập:** 25/09/2026
**Nền đối chiếu:** HEAD `3192133` (289 commit), production kiểm ngày 25/09
**Người lập:** Claude
**Chủ dự án quyết định:** anh Vinh
**Trạng thái:** dự thảo trình duyệt. Sau khi anh duyệt, đề nghị GPT Work đăng ký tài liệu này vào mục 1 của `docs/CHI-MUC-KE-HOACH-HIEN-HANH.md` làm kế hoạch điều phối hiện hành, thay cho bộ H01–H14 đã chốt sổ ở biên bản P0-E.

**Căn cứ:**

- `docs/ra-soat-va-dinh-huong-2026-09-25.md` — bản rà soát và sáu ý tưởng phát triển
- `docs/prompt-sua-loi-uu-tien-1-2026-09-25.md` — prompt sửa lỗi ưu tiên 1 đã soạn sẵn
- `docs/nghiem-thu/P0-E-chot-so-ke-hoach-sau-H01-H14-2026-09-25.md` — danh mục tạm hoãn khi chốt sổ
- Quyết định của anh Vinh ngày 25/09: dồn sức vào **ba hướng cùng lúc** — đào sâu 15 mẫu iconic, loạt "Hiểu đúng" cho độc giả Việt, mở rộng từ điển

---

# PHẦN 1 — TÓM TẮT ĐỂ ANH QUYẾT

## 1.1. Kế hoạch gồm những gì

| Nhóm | Mã | Nội dung | Số gói |
|---|---|---|---:|
| **Sửa lỗi** | S | Lỗi đang hiển thị trên trang, lỗi quy chuẩn, tiêu đề treo | 4 |
| **Nền tảng** | N | Khối "Ghi chú nguồn", bộ kiểm giọng văn, viết lại 15 tệp mới — **làm trước mọi nội dung mới** | 3 |
| **Mẫu iconic chuyên sâu** | I | 15 hồ sơ chuyên sâu, chia 3 đợt; 3 sơ đồ tiến hóa mới | 4 |
| **Loạt "Hiểu đúng"** | U | Trang tổng hợp và 10 bài, chia 2 đợt | 3 |
| **Từ điển** | T | Thêm 30 mục (từ 45 lên 75), từ điển đối chiếu bốn thứ tiếng, dịch phần còn thiếu | 4 |
| **Lịch sử và hình ảnh** | L | Ba mốc còn thiếu, ảnh AI đợt 2, ảnh chia sẻ riêng, mục Nhân vật | 4 |
| **Công cụ và phân phối** | C | Nhật ký sai số, video ngắn, người thẩm định, đọc số liệu tìm kiếm | 4 |
| **Kỹ thuật** | K | CSP, phông chữ, script mồ côi, bộ lọc từ điển | 4 |
| **Tổng** | | | **30** |

## 1.2. Nguyên tắc sắp thứ tự

1. **Sửa lỗi đang hiển thị trước tiên.** Người đọc đang thấy chúng.
2. **Nền tảng trước nội dung.** Khối "Ghi chú nguồn" phải có trước, nếu không 25 bài và 30 mục từ điển mới sẽ lặp lại lối viết "biên bản kiểm nguồn" mà bản rà soát 25/09 đã chỉ ra.
3. **Số liệu trước lựa chọn.** Search Console vừa xác minh ngày 25/09. Thứ tự 15 mẫu iconic và 10 chủ đề "Hiểu đúng" sẽ **được điều chỉnh lại** theo số liệu ở mốc kiểm ngày 12/10.
4. **Ba hướng nội dung chạy song song, mỗi hướng một nhịp.** Không dồn một hướng xong mới làm hướng khác.
5. **Hồ sơ nguồn là điều kiện trước.** Không có hồ sơ nguồn thì không viết — quy tắc này giữ nguyên.
6. **Mỗi đợt nội dung kết thúc bằng một điểm dừng để anh xem.**

## 1.3. Lịch tổng thể — 10 tuần

| Tuần | Thời gian | Trọng tâm | Điểm dừng anh duyệt |
|---|---|---|---|
| 1 | 28/09 – 04/10 | S1, S2, N1, N2 | Duyệt giao diện khối "Ghi chú nguồn" |
| 2 | 05/10 – 11/10 | S3, S4 lập bảng, N3 viết lại 15 tệp mới; hồ sơ nguồn I-đợt 1; khung U1; K3 | Duyệt 15 tệp viết lại |
| 3 | 12/10 – 18/10 | **Mốc kiểm số liệu C4**; I-đợt 1 viết; U-đợt 1 viết; T1 hồ sơ nguồn; S4 sửa; K1 bước 1 | **Chốt lại thứ tự iconic và chủ đề "Hiểu đúng" theo số liệu** |
| 4 | 19/10 – 25/10 | I-đợt 1 tích hợp; U-đợt 1 lên trang; T1 viết | Duyệt 5 hồ sơ iconic đầu tiên và 5 bài "Hiểu đúng" |
| 5 | 26/10 – 01/11 | I-đợt 2 hồ sơ nguồn; T1 lên trang; L1 hồ sơ nguồn; K1 bước 2; K2; bắt đầu C2 | Quyết chuyển CSP sang chế độ chặn |
| 6 | 02/11 – 08/11 | I-đợt 2 viết và tích hợp; I4 sơ đồ Royal Oak và Fifty Fathoms; U-đợt 2 hồ sơ; K4 | Duyệt đợt 2 iconic |
| 7 | 09/11 – 15/11 | U-đợt 2 lên trang; T2 bốn thứ tiếng; L1 lên trang; L3 ảnh chia sẻ | Duyệt 5 bài "Hiểu đúng" đợt 2 |
| 8 | 16/11 – 22/11 | I-đợt 3 hồ sơ và viết; T3 dịch; L2 ảnh AI đợt 2 | Duyệt ảnh AI đợt 2 |
| 9 | 23/11 – 29/11 | I-đợt 3 tích hợp; I4 sơ đồ Reverso; T4 từ điển đợt 3; C1 nhật ký sai số | Duyệt đợt 3 iconic |
| 10 | 30/11 – 06/12 | Tổng rà, đo lại, lập kế hoạch giai đoạn 4 | Nghiệm thu giai đoạn 3 |

Lịch này là **dự toán**. Nút thắt thật sự là tốc độ duyệt của anh và tốc độ tìm được nguồn đạt chuẩn, không phải tốc độ viết mã.

## 1.4. Bảy quyết định anh cần đưa ra

| Mã | Quyết định | Phương án tôi khuyến nghị | Cần trước |
|---|---|---|---|
| **Q1** | Duyệt kế hoạch này | Duyệt toàn bộ, bắt đầu tuần 1 | Tuần 1 |
| **Q2** | Sáu tiêu đề từ điển "Việt trước, Anh sau" | Thêm bí danh tay để giữ nguyên số liên kết tự động | Gói S3 |
| **Q3** | Ba tiêu đề bài cơ chế (Lịch vạn niên, Chống từ, Bộ thoát đồng trục) | Đồng ý sửa theo ba tiêu đề đề xuất ở gói S3 | Gói S3 |
| **Q4** | Nơi đặt loạt "Hiểu đúng" | Đặt trong mục Hướng dẫn, gắn thẻ `hieu-dung`, có trang tổng hợp riêng | Gói U1 |
| **Q5** | Làm công cụ "Nhật ký sai số" | Đồng ý, làm ở tuần 9 sau khi nội dung chính đã chạy | Gói C1 |
| **Q6** | Mở mục Nhân vật | Để giai đoạn 4, tránh dàn trải | Gói L4 |
| **Q7** | CSP: thêm địa chỉ nhận báo cáo hay chuyển sang chế độ chặn | Thêm địa chỉ nhận báo cáo trước, theo dõi 2 tuần, rồi mới chặn | Gói K1 |

---

# PHẦN 2 — NHÓM S: SỬA LỖI (ƯU TIÊN CAO NHẤT)

## S1 — Sửa 12 lỗi và điểm yếu của gói ưu tiên 1

**Làm ngay, tuần 1.** Prompt đã soạn đầy đủ: `docs/prompt-sua-loi-uu-tien-1-2026-09-25.md`.

| Nhóm lỗi | Nội dung |
|---|---|
| A — 4 lỗi đã ghi trong `CAN-KIEM-CHUNG.md` | "thanhläng" (Reverso); năm 2013 chưa xác minh (Fifty Fathoms); hai calibre mâu thuẫn (IWC Mark XI); năm 1861 gán sai cho chuẩn Patek Philippe Seal |
| B — Mục từ điển Biên độ | Sai thuật ngữ "máy đo chronograph"; câu gây hiểu nhầm về cách đo; chú thích liên kết sai |
| C — Biên tập nhỏ | Ghi chú nội bộ lọt ra trang (Rattrapante); nhãn "Hai bài liên quan" chỉ có một liên kết |
| D — Xếp nhóm từ điển | Chuyển 6 mục phức tạp sang nhóm "chức năng" |
| E — Ảnh AI mốc 1929 | Nét giống chữ ký giả ở góc ảnh |
| F — Bộ kiểm nhãn AI | Thêm chiều kiểm ngược: mọi ảnh JPG trong thư mục dòng thời gian phải có nhãn AI |

**Đạt khi:** toàn bộ 6 mục nghiệm thu trong prompt đạt; production hiển thị đúng sau phát hành.

## S2 — Sửa câu kiểm số 6 của quy chuẩn hình ảnh

**Vấn đề:** `docs/QUY-CHUAN-HINH-ANH.md` mục B3.2 điểm 6 yêu cầu ảnh AI có "tông màu tối bằng dải navy xung quanh". Cả 5 ảnh AI anh đã duyệt đều sáng hơn mức đó.

**Sửa thành:** "Bảng màu trầm, bão hòa thấp, một nguồn sáng ấm chủ đạo; đặt cạnh ảnh chiến hào v3 không lạc tông. Không dùng màu rực, không phong cách hoạt hình."

**Ai làm:** GLM sửa tài liệu, GPT Work nghiệm thu. **Tuần 1.**

## S3 — Giải quyết các tiêu đề đang treo

**Phụ thuộc:** anh quyết Q2 và Q3.

**Phần 1 — Sáu tiêu đề từ điển** (Bộ máy, Trữ cót, Lịch vạn niên, Điểm chuông, Tần số dao động, Vân Genève):

- Đổi tiêu đề sang "Việt trước, Anh sau"
- Thêm trường bí danh tay (ví dụ `aliases: ["Movement"]`) để bộ tự liên kết giữ nguyên các cụm tiếng Anh cũ, **và không tự thêm** cụm tiếng Việt quá phổ biến như "bộ máy". Việc này cần thêm trường `aliases` vào lược đồ từ điển và sửa `scripts/generate-glossary-terms.mjs` — hiện script chỉ sinh bí danh từ tiêu đề và trường `term_en`
- Đo số liên kết tự động trước và sau; mức lệch mỗi mục không quá 20 trang như ngưỡng P0-B

**Phần 2 — Ba tiêu đề bài cơ chế:**

| Tệp | Đổi thành |
|---|---|
| `coChe/vi/perpetual-calendar.md` | Lịch vạn niên — cơ cấu phức tạp (complication) theo lịch Gregory |
| `coChe/vi/chong-tu.md` | Chống từ (Anti-Magnetic) — vì sao từ trường làm đồng hồ cơ chạy sai |
| `coChe/vi/bo-thoat-dong-truc.md` | Bộ thoát đồng trục — cấu tạo và điều nhà sản xuất công bố |

**Tuần 2.**

## S4 — Quét câu so sánh tuyệt đối còn sót trong bài cũ

**Vì sao:** lỗi "khắt khe hơn mọi chứng nhận ngành" (Patek Philippe) cho thấy bài cũ vẫn còn câu so sánh tuyệt đối không có nguồn.

**Cách làm:** GLM quét toàn bộ `src/content/*/vi/` tìm các cụm: "nhất thế giới", "hơn mọi", "duy nhất", "tốt nhất", "đầu tiên" (khi không kèm "theo hãng" hoặc nguồn), "chuẩn mực", "số một". Lập bảng: tệp, dòng, câu, có nguồn hay không. **Chỉ lập bảng, không tự sửa.** Claude soát bảng và đề xuất cách sửa từng câu; anh duyệt; GLM sửa.

**Tuần 2 lập bảng, tuần 3 sửa.**

---

# PHẦN 3 — NHÓM N: NỀN TẢNG (LÀM TRƯỚC MỌI NỘI DUNG MỚI)

## N1 — Khối "Ghi chú nguồn" thu gọn

**Vấn đề cần giải quyết:** 12 mục từ điển mới và 3 bài chuỗi sản xuất đặt các ghi chú giới hạn nguồn ngay trong thân bài, khiến bài đọc giống biên bản kiểm nguồn.

**Giải pháp:** thêm trường `sourceNotes` vào lược đồ của bốn nhóm nội dung (cơ chế, mẫu iconic, từ điển, hướng dẫn). Khuôn hiển thị đưa các ghi chú này vào một khối thu gọn có tiêu đề **"Ghi chú nguồn"** / **"Source notes"**, đặt ngay trên danh sách nguồn ở cuối bài. Người cần mới mở ra.

**Yêu cầu kỹ thuật:**

- Trường là danh sách chuỗi, không bắt buộc
- Dùng thẻ `<details>` gốc của HTML, không cần JavaScript, dùng được bằng bàn phím
- Nhãn lấy từ bảng nhãn i18n, không viết cứng
- Đổi màu đúng ở chế độ sáng và tối
- Công cụ tìm kiếm Pagefind vẫn đọc được nội dung khối

**Ai làm:** GLM. **Tuần 1.** **Điểm dừng:** anh xem giao diện khối trên một bài mẫu trước khi dùng rộng.

## N2 — Bộ kiểm giọng văn cho nội dung mới

**Mục tiêu:** chặn tự động lối viết "biên bản" tái diễn.

**Quy tắc kiểm** (áp cho tệp có trường `date` hoặc `updated` từ 01/10/2026 trở đi — nghĩa là cả bài mới lẫn 15 hồ sơ iconic viết lại — **và cho 30 tệp được viết lại ở gói N3**; không áp ngược cho các bài cũ khác):

| Quy tắc | Ngưỡng |
|---|---|
| Thân bài không có tiêu đề mục "Giới hạn đọc hiểu", "Giới hạn nguồn" | 0 lần — nội dung này phải nằm trong `sourceNotes` |
| Thân bài không chứa các cụm "bài này không", "trang nguồn", "câu nguồn", "không suy thêm" | 0 lần |
| Số từ tối thiểu theo loại | Hồ sơ iconic chuyên sâu 1.200; bài "Hiểu đúng" 600; mục từ điển 150 |
| Bản tiếng Anh không dài hơn bản tiếng Việt quá 25 phần trăm | Tránh thêm nội dung khi dịch |

**Ai làm:** GLM viết script, nối vào `npm run check`, chứng minh bằng ca lỗi cố ý. **Tuần 1.**

## N3 — Viết lại 15 tệp mới theo khối "Ghi chú nguồn"

**Phụ thuộc:** N1 đạt.

**Phạm vi:** 3 bài chuỗi sản xuất (`manufacture-etablisseur`, `ebauche-chuoi-cung-ung`, `eta-sellita`) và 12 mục từ điển của đợt P0-D2, cả hai ngôn ngữ — tổng 30 tệp.

**Cách làm:**

1. Chuyển toàn bộ mục "Giới hạn..." và các câu kiểu "nguồn không nêu" vào `sourceNotes`
2. Viết lại thân bài theo giọng nhà sưu tầm: mở bằng câu hỏi người đọc thật sự có, trả lời bằng những gì đã có nguồn
3. Bỏ phần tóm tắt lặp gần nguyên văn thân bài
4. **Không thêm dữ kiện mới.** Bài ETA và Sellita còn mỏng sau khi viết lại thì giữ mỏng, chờ hồ sơ nguồn mới (xem việc phụ dưới đây)
5. Thống nhất cách viết hoa chữ tiếng Anh trong ngoặc ở tiêu đề 12 mục từ điển theo kiểu tiêu đề, ví dụ "Bánh xe cột (Column Wheel)" — quy tắc ở mục 6.2

**Ai làm:** Claude viết lại bản tiếng Việt, GLM đưa lên và dịch theo, GPT Work nghiệm thu. **Tuần 2.**

**Việc phụ — hồ sơ nguồn mới cho bài ETA và Sellita:** Claude tìm nguồn nhà nước về việc cung cấp bộ máy (hướng thử: các quyết định công khai của Ủy ban Cạnh tranh Thụy Sĩ — COMCO) và nguồn chính hãng. Chỉ bổ sung vào bài khi hồ sơ đạt. **Tuần 3 đến 5.**

---

# PHẦN 4 — NHÓM I: 15 MẪU ICONIC CHUYÊN SÂU

## 4.1. Mục tiêu

Nâng 15 mẫu có sức hút lớn nhất từ trung vị 444 từ (đo trên 15 mẫu được chọn) lên **1.200 đến 2.000 từ mỗi bài**, đủ chiều sâu để người chơi lâu năm đọc vẫn thấy có ích, đồng thời giữ kỷ luật dẫn nguồn.

## 4.2. Danh sách 15 mẫu và lý do chọn

Số từ đo ngày 25/09 trên phần thân bài tiếng Việt.

**Đợt 1 — năm biểu tượng toàn cầu, đã có sẵn nhiều nền**

| # | Mẫu | Tệp | Số từ hiện tại | Số nguồn | Sẵn có |
|---|---|---|---:|---:|---|
| 1 | Rolex Submariner | `rolex-submariner` | 534 | 6 | Bản EN, mốc lịch sử, sơ đồ tiến hóa |
| 2 | Omega Speedmaster | `omega-speedmaster` | 340 | 4 | Bản EN, mốc lịch sử, sơ đồ tiến hóa |
| 3 | Rolex GMT-Master | `rolex-gmt-master` | 662 | 2 | Bản EN, sơ đồ tiến hóa |
| 4 | Audemars Piguet Royal Oak | `royal-oak` | 370 | 3 | Bản EN, mốc lịch sử |
| 5 | Patek Philippe Nautilus | `patek-nautilus` | 364 | 2 | Bản EN, mốc lịch sử |

**Đợt 2 — năm mẫu kinh điển, phần lớn gắn với dòng thời gian lịch sử**

| # | Mẫu | Tệp | Số từ hiện tại | Số nguồn | Sẵn có |
|---|---|---|---:|---:|---|
| 6 | Jaeger-LeCoultre Reverso | `reverso` | 372 | 2 | Bản EN, mốc lịch sử |
| 7 | Cartier Tank | `cartier-tank` | 404 | 1 | Bản EN |
| 8 | Blancpain Fifty Fathoms | `fifty-fathoms` | 636 | 3 | Bản EN, mốc lịch sử |
| 9 | Zenith El Primero | `zenith-el-primero` | 444 | 1 | Bản EN, mốc lịch sử |
| 10 | TAG Heuer Monaco | `monaco` | 510 | 2 | Chưa có bản EN |

**Đợt 3 — năm mẫu được độc giả Việt Nam quan tâm nhiều**

| # | Mẫu | Tệp | Số từ hiện tại | Số nguồn | Sẵn có |
|---|---|---|---:|---:|---|
| 11 | Grand Seiko Snowflake | `grand-seiko-snowflake` | 378 | 2 | Chưa có bản EN |
| 12 | Seiko 62MAS | `seiko-62mas` | 412 | 2 | Chưa có bản EN |
| 13 | Tudor Black Bay | `tudor-black-bay` | 457 | 2 | Chưa có bản EN |
| 14 | Tissot PRX | `tissot-prx` | 473 | 1 | Chưa có bản EN |
| 15 | Orient Bambino | `orient-bambino` | 454 | 3 | Chưa có bản EN |

**Dự bị** nếu số liệu tìm kiếm cho thấy nhu cầu khác: IWC Mark XI (`iwc-mark-xi`, 8 nguồn), Breitling Navitimer (`breitling-navitimer`), A. Lange & Söhne Lange 1 (`lange-1`), Panerai Luminor (`panerai-luminor`).

**Lưu ý về đợt 3:** chọn theo nhận định biên tập về độc giả Việt Nam, **chưa có số liệu chứng minh**. Đây là đợt dễ đổi nhất khi có số liệu ở mốc kiểm C4.

## 4.3. Bốn gói

### I1 — Đợt 1: năm biểu tượng toàn cầu

- **Tuần 2:** Claude lập hồ sơ nguồn cho 5 mẫu (theo khuôn Phụ lục A)
- **Tuần 3:** Claude viết bản tiếng Việt; GPT Work nghiệm thu hồ sơ nguồn
- **Tuần 4:** GLM tích hợp, dịch bản tiếng Anh, kiểm; anh duyệt
- **Lưu ý riêng:** bài Speedmaster hiện chỉ 340 từ dù có sơ đồ tiến hóa — ưu tiên số một của đợt

### I2 — Đợt 2: năm mẫu kinh điển

- **Tuần 5:** hồ sơ nguồn. **Tuần 6:** viết, tích hợp, duyệt
- **Lưu ý riêng:** Cartier Tank và El Primero hiện **chỉ có 1 nguồn** — cần bổ sung nguồn trước khi mở rộng; Monaco cần viết bản tiếng Anh mới

### I3 — Đợt 3: năm mẫu độc giả Việt quan tâm

- **Tuần 8:** hồ sơ nguồn. **Tuần 9:** viết, tích hợp, duyệt
- **Lưu ý riêng:** Tissot PRX hiện chỉ 1 nguồn; cả 5 mẫu đều chưa có bản tiếng Anh

### I4 — Ba sơ đồ tiến hóa mới

Dùng lại khuôn `ModelEvolution.astro` đã chạy cho Submariner, GMT-Master, Speedmaster.

| Sơ đồ | Lý do | Tuần |
|---|---|---|
| Royal Oak | Bổ trợ trực tiếp hồ sơ đợt 1 | 6 |
| Fifty Fathoms | Cặp với Submariner — hai mẫu lặn cùng đứng ở mốc 1953 của dòng thời gian | 6 |
| Reverso | Lịch sử dài, nhiều thế hệ rõ ràng | 9 |

Mỗi sơ đồ cần hồ sơ nguồn riêng theo đúng cách đã làm với ba sơ đồ trước (`docs/ho-so-du-lieu-tien-hoa-*.md`): nguồn cho từng mốc, danh sách bỏ qua có lý do, không bịa reference hay biệt danh.

## 4.4. Điều kiện đạt cho mỗi hồ sơ

1. Từ 1.200 đến 2.000 từ phần thân bài tiếng Việt
2. Đủ các mục của khuôn Phụ lục A
3. Mọi năm, reference, calibre, thông số đều có nguồn; phần chưa xác minh chuyển vào `sourceNotes` hoặc ghi vào `CAN-KIEM-CHUNG.md`
4. Thân bài không vi phạm bộ kiểm giọng văn N2
5. Liên kết tới ít nhất 2 bài cơ chế và 3 mục từ điển liên quan
6. Bản tiếng Anh cùng phạm vi, không mạnh hơn bản tiếng Việt
7. Không giá bán, không giữ giá, không lời khuyên đầu tư

---

# PHẦN 5 — NHÓM U: LOẠT "HIỂU ĐÚNG" CHO ĐỘC GIẢ VIỆT

## 5.1. Mục tiêu

Những bài ngắn, dễ chia sẻ, mỗi bài **đính chính một hiểu lầm phổ biến** — đúng khoảng trống mà các trang cửa hàng đang để lại. Mỗi bài là cửa dẫn người đọc vào bài chuyên sâu đã có.

## 5.2. Nguyên tắc riêng của loạt này

Rút từ cảnh báo trong kế hoạch 12/09 của GPT Work, giữ nguyên hiệu lực:

- **Không thay một hiểu lầm bằng một quy tắc tuyệt đối khác.** Không viết "30 m không bơi được", "vài giây mỗi ngày là bình thường" như quy tắc chung
- Tiêu đề đặt dưới dạng câu hỏi có điều kiện, không phải kết luận
- Không giá, không giữ giá, không "có đáng tiền không"
- Không đề cập hàng xách tay, giấy tờ nhập khẩu, thuế — ngoài phạm vi, cần nguồn pháp luật riêng

## 5.3. Mười chủ đề, chia hai đợt

| # | Tiêu đề dự kiến | Bài chuyên sâu sẽ dẫn tới | Đợt |
|---|---|---|---|
| 1 | Chân kính càng nhiều có phải càng tốt? | Từ điển Chân kính; Bộ máy in-house | 1 |
| 2 | Đồng hồ cơ có cần đeo mỗi ngày không? | Lên dây cho đồng hồ cơ; Hộp xoay đồng hồ | 1 |
| 3 | Điện thoại và nam châm có làm đồng hồ cơ chạy sai? | Chống từ | 1 |
| 4 | Kính sapphire có thật sự không trầy, không vỡ? | Kính đồng hồ | 1 |
| 5 | Chỉ số chống nước 30 m nghĩa là gì? | Mức chống nước; Chống nước hoạt động thế nào | 1 |
| 6 | Bộ máy in-house có luôn tốt hơn máy ETA hay Sellita? | Bộ máy in-house; ETA và Sellita; Manufacture và établisseur | 2 |
| 7 | Đồng hồ cơ nhanh chậm vài giây mỗi ngày có phải đã hỏng? | Theo dõi độ chính xác; Tính đẳng thời; Sai số vị trí | 2 |
| 8 | Có giờ nào tuyệt đối không được chỉnh lịch? | Cách chỉnh lịch an toàn | 2 |
| 9 | Đồng hồ automatic có bao giờ cần lên dây tay? | Cơ chế lên dây tự động; Lên dây cho đồng hồ cơ | 2 |
| 10 | Chứng nhận COSC nói lên điều gì về chiếc đồng hồ? | Chronometer và COSC; Master Chronometer | 2 |

Thứ tự trong mỗi đợt sẽ **điều chỉnh theo số liệu** ở mốc kiểm C4.

## 5.4. Ba gói

### U1 — Khung loạt bài

**Phụ thuộc:** anh quyết Q4.

- Bài đặt trong mục Hướng dẫn, gắn thẻ `tags: ["hieu-dung"]` — trường `tags` **đã có sẵn** trong lược đồ chung, không cần sửa lược đồ
- Tạo trang tổng hợp `/hieu-dung` và `/en/myths/` (tên đường dẫn tiếng Anh chờ anh duyệt) liệt kê các bài có thẻ này
- Thêm lối vào từ trang chủ và trang Hướng dẫn
- Thêm cặp đường dẫn vào `src/i18n/contentRoutes.ts`

**Ai làm:** GLM. **Tuần 2.**

### U2 — Đợt 1: năm bài

- **Tuần 3:** Claude lập hồ sơ nguồn và viết (khuôn Phụ lục B)
- **Tuần 4:** GLM đưa lên, dịch; anh duyệt

### U3 — Đợt 2: năm bài

- **Tuần 6:** hồ sơ nguồn và viết. **Tuần 7:** đưa lên, dịch, duyệt

## 5.5. Điều kiện đạt

1. Từ 600 đến 1.000 từ
2. Đúng khuôn Phụ lục B, có mục "Điều chưa thể kết luận"
3. Liên kết tới ít nhất 2 bài chuyên sâu đã có
4. Không vi phạm nguyên tắc 5.2 và bộ kiểm N2
5. Mỗi bài kèm **một câu tóm tắt dùng để chia sẻ** (dưới 200 ký tự) cho gói C2

---

# PHẦN 6 — NHÓM T: MỞ RỘNG TỪ ĐIỂN

## 6.1. Mục tiêu

Từ **45 lên 75 mục** trong ba đợt; bổ sung tên gọi bốn thứ tiếng; đưa bản tiếng Anh lên đủ.

## T1 — Đợt 2: 12 mục bổ trợ cho 15 hồ sơ iconic

Chọn các thuật ngữ mà hồ sơ iconic sẽ dùng nhiều, để liên kết qua lại:

| Mục | Tiếng Anh | Hồ sơ iconic liên quan |
|---|---|---|
| Vành xoay một chiều | Unidirectional bezel | Submariner, Fifty Fathoms, Black Bay |
| Dây đeo liền vỏ | Integrated bracelet | Royal Oak, Nautilus, PRX |
| Tần số cao | High-beat | El Primero, Grand Seiko |
| Dạ quang | Lume | Submariner, Fifty Fathoms — trỏ sang bài cơ chế đã có |
| Núm vặn ren | Screw-down crown | Submariner, 62MAS |
| Van thoát khí heli | Helium escape valve | Các mẫu lặn chuyên nghiệp |
| Kính sapphire | Sapphire crystal | Trỏ sang bài cơ chế Kính đồng hồ |
| Mặt số tráng men | Enamel dial | Các mẫu dress watch |
| Cọc số gắn nổi | Applied indices | Nhiều mẫu |
| Chuẩn ISO 6425 | ISO 6425 | Các mẫu lặn |
| Nhà sản xuất trọn gói | Manufacture | Trỏ sang bài chuỗi sản xuất |
| Nhà lắp ráp | Établisseur | Trỏ sang bài chuỗi sản xuất |

**Lưu ý chống trùng:** "Vành xoay một chiều" gần với mục Bezel đã có, "Núm vặn ren" gần với mục Núm vặn đã có. Ở bước hồ sơ nguồn, Claude đề xuất cho từng mục: viết mục riêng hay bổ sung vào mục đã có. Nếu gộp, số mục mới giảm tương ứng.

**Tuần 3:** hồ sơ nguồn. **Tuần 4 đến 5:** viết và đưa lên. Từ điển lên **57 mục** (nếu không gộp mục nào).

## T2 — Từ điển đối chiếu bốn thứ tiếng

**Ý tưởng:** mỗi mục ghi tên gọi tiếng Việt, Anh, Pháp, Đức — phần lớn thuật ngữ đồng hồ có gốc Pháp và Đức. Chưa trang tiếng Việt nào làm, và đây là thứ các trang khác dễ dẫn liên kết tới.

**Cách làm:**

- Thêm hai trường không bắt buộc `term_fr`, `term_de` vào lược đồ từ điển; hiển thị thành một hàng "Tên gọi khác" trong mỗi mục
- **Mỗi tên gọi phải có nguồn.** Nguồn khả dụng: FHH có bản tiếng Pháp cho các mục của mình; tên tiếng Đức lấy từ trang chính hãng hoặc tài liệu kỹ thuật của các hãng Đức. Tên nào chưa có nguồn thì để trống, không tự dịch
- Làm dần: bắt đầu với 20 mục phổ biến nhất

**Tuần 7.** Claude lập bảng tên gọi có nguồn; GLM sửa lược đồ và khuôn hiển thị.

## T3 — Dịch phần tiếng Anh còn thiếu

| Nhóm | Tệp cần dịch |
|---|---|
| Từ điển (10 mục cũ) | bezel, cau-may, day-vo, khoa-day, lo-may, microbrand, ngua, poincon-de-geneve, vat-canh, vau-day |
| Cơ chế (5 bài cũ) | bo-may-in-house, bo-thoat-dong-truc, da-quang, hien-thi-ngay, kinh-dong-ho |

Sau gói này, phần kiến thức nền tiếng Anh **phủ đủ 100%**.

**Tuần 8.** GLM dịch theo khuôn đã dùng ở gói H03; Claude soát.

## T4 — Đợt 3: 18 mục còn lại

| Nhóm | Mục |
|---|---|
| Bộ máy | Bộ truyền động bánh răng, bộ lên dây và chỉnh giờ, bộ kim, cần chỉnh nhanh chậm, bánh lắc tự do, dây tóc Breguet, máy nền, dừng giây |
| Hoàn thiện | Đánh bóng gương, tráng men, chạm khắc, khảm |
| Chứng nhận | Swiss Made (mục ngắn trỏ sang bài hướng dẫn) |
| Chờ nguồn từ đợt trước | Lệch nhịp, lực không đổi — chỉ viết khi hồ sơ nguồn đạt |
| Chờ quyết | Pha trăng — dạng mục ngắn trỏ sang bài cơ chế |
| Bổ trợ iconic | Mặt số đổi màu theo thời gian (tropical dial), dây đeo kiểu NATO |

Ba mục "chờ" có thể không vào kịp; khi đó từ điển dừng ở khoảng 72 đến 75 mục.

**Tuần 9 đến 10.**

## 6.2. Điều kiện đạt cho mỗi mục từ điển

1. Từ 150 đến 400 từ
2. Đúng khuôn Phụ lục C: định nghĩa, cách hoạt động hoặc cách nhận biết, vì sao người chơi cần biết, đọc thêm
3. Giới hạn nguồn nằm trong `sourceNotes`, không nằm trong thân bài
4. Tiêu đề theo thứ tự "Việt trước, Anh trong ngoặc"; chữ tiếng Anh viết hoa kiểu tiêu đề thống nhất (ví dụ "Column Wheel", không phải "Column wheel")
5. Nhóm (`category`) xếp đúng theo quy ước đã chốt ở S1

---

# PHẦN 7 — NHÓM L: LỊCH SỬ VÀ HÌNH ẢNH

## L1 — Ba mốc lịch sử còn thiếu

| Mốc | Vì sao quan trọng | Nguồn cần tìm |
|---|---|---|
| Bộ thoát móc (lever escapement) | Có mặt trong gần như mọi đồng hồ cơ ngày nay; dòng thời gian đang nhảy từ 1755 tới 1801 | Bảo tàng Anh, Bảo tàng Khoa học Anh |
| Đồng hồ hàng hải và bài toán kinh độ | Nền của khái niệm chronometer | Đài thiên văn Hoàng gia Greenwich |
| Đồng hồ bỏ túi tự lên dây | Tiền thân của mốc 1923 và 1931 | Nguồn bảo tàng Thụy Sĩ |

**Năm cụ thể chưa ghi**, chờ hồ sơ nguồn theo quy trình G02. **Tuần 5:** hồ sơ nguồn. **Tuần 7:** lên trang, kèm SVG hoặc ảnh AI theo quy chuẩn.

## L2 — Ảnh AI đợt 2

Năm cảnh mạnh nhất đã soạn câu lệnh trong `docs/bo-cau-lenh-anh-ai-dong-thoi-gian-2026-09-24.md`: Oyster (bơi qua eo biển Manche), Reverso (trận polo), Explorer (trại thám hiểm vùng núi cao), Carrera (giải đua đường trường), Nautilus (ô cửa kính tròn trên tàu).

**Tuần 8.** Anh tạo ảnh bằng ChatGPT hoặc giao GPT Work tạo; anh duyệt trực quan; GLM tích hợp. **Đợt 3 (18 mốc còn lại) để giai đoạn 4**, sau khi anh xem 10 ảnh đứng cạnh nhau trên trang.

## L3 — Ảnh chia sẻ riêng cho từng mốc và từng mẫu iconic

**Vấn đề:** khi chia sẻ một mốc hoặc một mẫu lên mạng xã hội, ảnh xem trước hiện là ảnh chung của cả mục.

**Cách làm:** GLM sinh ảnh chia sẻ 1200x630 tự động lúc build cho 32 mốc và 15 mẫu chuyên sâu, gồm tiêu đề, năm, và hình minh họa sẵn có. Đồng thời sửa thẻ mô tả ảnh chia sẻ để lấy theo tiêu đề từng trang thay vì một câu chung.

**Tuần 7.** Gắn với gói C2 (video và chia sẻ).

## L4 — Mục Nhân vật

**Khuyến nghị để giai đoạn 4** (quyết định Q6). Lý do: đây là cấu trúc mới, và ba hướng nội dung chính đã đủ tải cho giai đoạn này. Khi mở, bắt đầu với 5 hồ sơ ngắn: Huygens, Breguet, Daniels, Genta, Oechslin; không ảnh chân dung.

---

# PHẦN 8 — NHÓM C: CÔNG CỤ VÀ PHÂN PHỐI

## C1 — Công cụ "Nhật ký sai số"

**Phụ thuộc:** anh quyết Q5.

**Mô tả:** người đọc ghi độ nhanh chậm của đồng hồ mỗi ngày; công cụ vẽ biểu đồ theo thời gian và dẫn tới bài "Theo dõi độ chính xác của đồng hồ cơ" đã có.

**Yêu cầu:**

- Dữ liệu **chỉ lưu trên trình duyệt** của người dùng; không tài khoản, không gửi đi đâu; ghi rõ điều này ngay trên công cụ
- Theo dõi được nhiều đồng hồ, mỗi đồng hồ một tên tự đặt
- Xuất và nhập tệp CSV để người dùng tự sao lưu
- Song ngữ, dùng được bằng bàn phím, đạt các bộ kiểm tiếp cận hiện có
- **Không chẩn đoán.** Công cụ chỉ ghi và vẽ, không đưa kết luận "đồng hồ của bạn hỏng" hay "bình thường" — đúng tinh thần bài hướng dẫn hiện có ("ghi nhận, không chẩn đoán")

**Tuần 9 đến 10.** GLM dựng; Claude viết phần chữ hướng dẫn; anh duyệt.

## C2 — Video ngắn từ hoạt ảnh sẵn có

**Việc của anh.** Năm video đầu tiên, mỗi video 30 đến 60 giây, khổ dọc 9:16:

| # | Nội dung | Quay từ |
|---|---|---|
| 1 | Bộ thoát chia năng lượng thành từng nhịp | Infographic bộ thoát có dẫn dắt |
| 2 | Tháo rời một chiếc đồng hồ cơ | Trang giải phẫu, chế độ tách lớp |
| 3 | 500 năm đồng hồ cơ trong một phút | Trang lịch sử, cuộn qua các mốc có ảnh AI |
| 4 | Submariner qua các thế hệ | Sơ đồ tiến hóa Submariner |
| 5 | Một bài "Hiểu đúng" | Câu tóm tắt chia sẻ của bài U đầu tiên |

**Cách làm:** quay màn hình, thêm chú thích chữ tiếng Việt, gắn đường dẫn về đúng trang. **Tuần 5 trở đi.** Claude soạn lời chú thích cho từng video khi anh cần.

## C3 — Người thẩm định chuyên môn

**Việc của anh.** Mời một thợ đồng hồ hoặc nhà sưu tầm có uy tín tại Việt Nam đọc và góp ý.

**Các bước:**

1. Chọn người: có kinh nghiệm sửa chữa hoặc sưu tầm, sẵn lòng góp ý thẳng
2. Đề nghị thẩm định **một nhóm nhỏ trước** — ví dụ 5 bài "Hiểu đúng" đợt 1
3. Ghi tên người thẩm định trên bài **chỉ khi họ đồng ý**, kèm ngày thẩm định
4. Góp ý của người thẩm định đi qua đúng quy trình: có nguồn thì sửa, chưa có nguồn thì ghi `CAN-KIEM-CHUNG.md`

**Tuần 4 trở đi.** Claude soạn thư mời mẫu khi anh cần. Hiển thị tên người thẩm định cần một trường mới trong lược đồ — GLM làm khi có người đầu tiên đồng ý.

## C4 — Mốc kiểm số liệu tìm kiếm

**Ngày 12/10/2026**, khoảng hai tuần sau khi Search Console xác minh.

**Anh đọc và gửi lại năm con số** (28 ngày gần nhất hoặc toàn bộ thời gian có dữ liệu):

1. Tổng lượt hiển thị và lượt bấm
2. 20 truy vấn hàng đầu
3. 20 trang đích hàng đầu
4. Tỉ lệ Việt Nam so với nước ngoài
5. Các trang có nhiều lượt hiển thị nhưng ít lượt bấm

Kèm số Vercel Analytics: lượt xem 30 ngày và 10 trang được xem nhiều nhất.

**Dùng để:** sắp lại thứ tự 15 mẫu iconic và 10 chủ đề "Hiểu đúng"; phát hiện trang cần viết lại tiêu đề hoặc mô tả. Claude phân tích và đề xuất điều chỉnh trong 1 ngày sau khi có số.

**Lặp lại mỗi 4 tuần** — ghi vào `docs/DO-LUONG-CO-SO.md` theo quy tắc đã có.

---

# PHẦN 9 — NHÓM K: KỸ THUẬT

| Gói | Việc | Phụ thuộc | Tuần |
|---|---|---|---|
| **K1** | CSP: thêm địa chỉ nhận báo cáo vi phạm, theo dõi 2 tuần, rồi mới chuyển sang chế độ chặn | Quyết định Q7; hồ sơ H11 đã chuẩn bị | 3 và 5 |
| **K2** | Tự lưu phông chữ trên trang thay vì tải từ máy chủ Google | Không | 5 |
| **K3** | Xử lý 3 script kiểm mồ côi: `check-english-launch.mjs`, `check-g09-favicon-hints.mjs`, `check-g08-speedmaster-evolution.cjs` — nối vào chuỗi kiểm hoặc chuyển vào thư mục lưu trữ | Không | 2 |
| **K4** | Bộ lọc nhóm cho từ điển tiếng Anh, giống bản tiếng Việt; thêm bộ lọc chữ cái khi từ điển vượt khoảng 80 mục | Sau T1 | 6 |

**Việc dọn dẹp chờ GLM tự xử lý:** các tệp nháp ở gốc repo (`fhh_fr_*.html`, `lange_cfe.html`, `poll-h02.mjs`) chuyển vào `output/` hoặc thêm vào `.gitignore` sau khi xong hồ sơ nguồn "lực không đổi".

---

# PHẦN 10 — QUY TRÌNH VẬN HÀNH

## 10.1. Phân vai — giữ nguyên như giai đoạn trước

| Vai trò | Trách nhiệm trong giai đoạn 3 |
|---|---|
| **Anh Vinh** | Bảy quyết định Q1–Q7; duyệt ở mỗi điểm dừng; đọc số liệu C4; làm video C2; mời người thẩm định C3; duyệt ảnh AI |
| **Claude** | Hồ sơ nguồn và bản viết tiếng Việt cho nhóm I, U, T; viết lại 15 tệp mới (N3); soát bản dịch; phân tích số liệu C4 |
| **GPT Work** | Nghiệm thu hồ sơ nguồn và sản phẩm; giao việc cho GLM; cho phép phát hành |
| **GLM** | Mã, tích hợp, dịch, bộ kiểm; không commit, không push khi chưa được phép |

## 10.2. Vòng đời một bài nội dung

1. **Hồ sơ nguồn** — Claude lập theo khuôn; lưu `docs/ho-so-nguon-<ma-goi>-<slug>.md`
2. **Nghiệm thu hồ sơ** — GPT Work
3. **Viết bản tiếng Việt** — Claude, theo khuôn Phụ lục A, B hoặc C
4. **Tích hợp và dịch** — GLM; chạy đủ bộ kiểm, gồm N2
5. **Anh duyệt** ở điểm dừng của đợt
6. **Phát hành** theo mục 8 của bộ giao việc 14 gói
7. **Kiểm production** sau phát hành

## 10.3. Quy tắc giữ nguyên từ các giai đoạn trước

- Năm, calibre, thông số không chắc thì bỏ, ghi `CAN-KIEM-CHUNG.md` — không đoán
- Thuật ngữ tiếng Anh đặt trong ngoặc sau tiếng Việt
- Không ký tự ngoài tiếng Việt và tiếng Anh
- Trước khi sửa tệp, kiểm `git log` và không đè việc đang dở
- Mọi thay đổi báo rõ tệp nào, dòng nào, sửa thành gì

## 10.4. Chỉ số đánh giá giai đoạn 3

| Chỉ số | Hiện tại (25/09) | Mục tiêu cuối giai đoạn |
|---|---|---|
| Việc trong gói sửa lỗi ưu tiên 1 | 12 | 0 |
| Hồ sơ iconic từ 1.200 từ trở lên | 0 | 15 |
| Sơ đồ tiến hóa | 3 | 6 |
| Bài "Hiểu đúng" | 0 | 10 |
| Mục từ điển tiếng Việt | 45 | 72 đến 75 |
| Mục từ điển có tên bốn thứ tiếng | 0 | 20 |
| Phần kiến thức nền có cặp bản tiếng Anh | Từ điển 35/45, cơ chế 17/22 | 100% |
| Mốc lịch sử | 32 | 35 |
| Số liệu tìm kiếm được đọc và ghi | Chưa có | Mỗi 4 tuần |

**Không đặt chỉ tiêu lượt truy cập** cho tới khi có số liệu nền ở mốc C4 — đúng nguyên tắc đã chốt ở kế hoạch 12/09.

---

# PHỤ LỤC A — KHUÔN HỒ SƠ ICONIC CHUYÊN SÂU

**Độ dài:** 1.200 đến 2.000 từ phần thân bài tiếng Việt.

| Mục | Nội dung | Độ dài gợi ý |
|---|---|---|
| **Mở đầu** | Vì sao mẫu này quan trọng — một đoạn, viết cho người chưa biết gì | 150–200 từ |
| **Bối cảnh ra đời** | Nhu cầu nào, thời điểm nào, ai đứng sau — chỉ những gì có nguồn | 200–300 từ |
| **Các thế hệ chính** | Các reference quan trọng và điểm khác nhau; nếu có sơ đồ tiến hóa thì dẫn sang | 250–400 từ |
| **Bên trong bộ máy** | Calibre qua các thời kỳ, cơ chế đáng chú ý; liên kết bài cơ chế | 200–300 từ |
| **Nhận diện bằng mắt** | Những chi tiết thiết kế giúp nhận ra mẫu này — mô tả bằng lời, không cần ảnh sản phẩm | 150–250 từ |
| **Điều hay bị hiểu sai** | Hai đến ba hiểu lầm phổ biến về mẫu này, kèm điều đúng có nguồn | 150–250 từ |
| **Góc nhìn nhà sưu tầm** | Điều người chơi lâu năm để ý; không giá, không giữ giá | 100–200 từ |
| **Đọc thêm** | Ít nhất 2 bài cơ chế, 3 mục từ điển, mốc lịch sử nếu có | — |
| **`sourceNotes`** | Mọi giới hạn nguồn và điểm chưa xác minh | — |

**Hồ sơ nguồn đi kèm phải có:** bảng claim — nguồn — nguồn chứng minh điều gì — ngày kiểm; danh sách điều đã loại bỏ và lý do.

**Thứ tự ưu tiên nguồn:** trang chính hãng và hồ sơ lưu trữ của hãng; bảo tàng; hồ sơ bằng sáng chế; FHH; báo chuyên ngành có uy tín (chỉ để đối chiếu, không làm nguồn duy nhất cho năm hoặc calibre).

---

# PHỤ LỤC B — KHUÔN BÀI "HIỂU ĐÚNG"

**Độ dài:** 600 đến 1.000 từ.

| Mục | Nội dung |
|---|---|
| **Tiêu đề** | Câu hỏi có điều kiện, ví dụ "Chân kính càng nhiều có phải càng tốt?" |
| **Câu trả lời ngắn** | Hai đến ba câu, ngay đầu bài, cho người chỉ đọc lướt |
| **Vì sao nhiều người nghĩ vậy** | Nguồn gốc hiểu lầm — giải thích thiện ý, không chê người tin |
| **Điều thực sự đúng** | Giải thích có nguồn, kèm cơ chế bên trong nếu cần |
| **Điều chưa thể kết luận** | Những trường hợp phụ thuộc từng mẫu, từng bộ máy; khi nào cần hỏi nhà sản xuất hoặc thợ |
| **Đọc thêm** | Ít nhất 2 bài chuyên sâu |
| **Câu tóm tắt để chia sẻ** | Dưới 200 ký tự, trong frontmatter, dùng cho ảnh chia sẻ và video |
| **`sourceNotes`** | Giới hạn nguồn |

---

# PHỤ LỤC C — KHUÔN MỤC TỪ ĐIỂN

**Độ dài:** 150 đến 400 từ.

| Mục | Nội dung |
|---|---|
| **Tiêu đề** | "Tên tiếng Việt (English Term)" |
| **Định nghĩa** | Một đến hai câu, có nguồn |
| **Cách hoạt động hoặc cách nhận biết** | Giải thích bằng lời dễ hiểu |
| **Vì sao người chơi cần biết** | Gặp thuật ngữ này ở đâu: thông số hãng, bài đánh giá, khi bảo dưỡng |
| **Tên gọi khác** | Tiếng Pháp và tiếng Đức nếu có nguồn (gói T2) |
| **Đọc thêm** | Bài cơ chế, mẫu iconic, mục từ điển liên quan |
| **`sourceNotes`** | Giới hạn nguồn |

---

# PHỤ LỤC D — CÂU LỆNH GIAO VIỆC TUẦN 1

## D1 — Sửa lỗi ưu tiên 1 (gói S1)

Dùng nguyên văn: `docs/prompt-sua-loi-uu-tien-1-2026-09-25.md`.

## D2 — Khối "Ghi chú nguồn" và bộ kiểm giọng văn (gói N1 và N2)

> **Gói N1 và N2 — khối "Ghi chú nguồn" và bộ kiểm giọng văn.** Căn cứ: `docs/KE-HOACH-HOP-NHAT-GIAI-DOAN-3-2026-09-25.md` Phần 3. Trước khi bắt đầu, chạy `git log -5` và `git status`; không đè việc đang dở; giữ nguyên các tệp nháp chưa theo dõi ở gốc repo.
>
> **N1.** Thêm trường không bắt buộc `sourceNotes: z.array(z.string()).optional()` vào lược đồ của bốn collection `coChe`, `mauIconic`, `tuDien`, `huongDan` trong `src/content.config.ts`. Trong các khuôn hiển thị tương ứng, nếu bài có `sourceNotes` thì hiển thị một khối `<details>` đặt ngay trên danh sách nguồn, tiêu đề lấy từ bảng nhãn i18n với khóa mới `source_notes_heading` ("Ghi chú nguồn" / "Source notes"). Khối mặc định thu gọn, dùng được bằng bàn phím, đổi màu đúng ở chế độ sáng và tối, Pagefind vẫn lập chỉ mục được. **Chưa chuyển nội dung bài nào** — chỉ dựng khung. Thêm `sourceNotes` thử vào đúng một bài (`coChe/vi/manufacture-etablisseur.md`, một ghi chú ngắn chép từ chính bài đó) để anh Vinh xem giao diện; ghi rõ trong báo cáo.
>
> **N2.** Viết script kiểm mới, nối vào `npm run check`, áp cho tệp nội dung có trường `date` hoặc `updated` từ `2026-10-01` trở đi, cộng một danh sách tệp khai báo tường minh trong script để gói N3 bổ sung 30 tệp viết lại sau này (ban đầu danh sách để trống):
>
> - Thân bài không có tiêu đề mục bắt đầu bằng "Giới hạn" (VI) hoặc "Limits" (EN)
> - Thân bài không chứa các cụm: "bài này không", "trang nguồn", "câu nguồn", "không suy thêm" (VI); "this article does not", "the source page", "the source sentence" (EN)
> - Số từ thân bài tối thiểu: `mauIconic` 1.200; `huongDan` có thẻ `hieu-dung` 600; `tuDien` 150
> - Bản EN không dài hơn bản VI tương ứng quá 25 phần trăm
>
> Chứng minh từng quy tắc bằng một ca lỗi cố ý rồi hoàn nguyên.
>
> **Không làm:** không sửa nội dung bài nào ngoài một bài thử của N1; không áp quy tắc N2 ngược cho bài cũ; không stage, không commit, không push.
>
> **Nghiệm thu:** `node scripts/scan-chars.mjs`, `npm run check`, `npm run build` qua sạch; ảnh chụp khối "Ghi chú nguồn" ở trạng thái đóng và mở, chế độ sáng và tối, mobile 390 px và desktop; ca lỗi cố ý của N2 đều bị bắt.
>
> **Báo cáo** theo mẫu mục 7 của `docs/BO-GIAO-VIEC-GLM-14-GOI-2026-09-19.md`.

## D3 — Sửa câu kiểm quy chuẩn ảnh (gói S2)

> **Gói S2.** Trong `docs/QUY-CHUAN-HINH-ANH.md` mục B3.2 điểm 6, thay cụm "tông màu tối bằng dải navy xung quanh (ảnh sáng hơn phá dải liên tục của trang lịch sử)" bằng: "bảng màu trầm, bão hòa thấp, một nguồn sáng ấm chủ đạo; đặt cạnh ảnh chiến hào v3 không lạc tông; không dùng màu rực, không phong cách hoạt hình". Ghi một dòng vào mục Lịch sử phiên bản của tài liệu: ngày, lý do (khớp 5 ảnh AI đã được chủ dự án duyệt). Không sửa gì khác. Không stage, không commit, không push.

---

# PHỤ LỤC E — DANH SÁCH KIỂM CHUNG TRƯỚC MỖI LẦN PHÁT HÀNH

- [ ] `git log` và `git status` sạch, không đè việc đang dở
- [ ] `node scripts/scan-chars.mjs` sạch
- [ ] `npm run check` và `npm run build` exit 0
- [ ] Bộ kiểm giọng văn N2 đạt với mọi tệp mới
- [ ] Mọi năm, calibre, thông số mới có nguồn trong hồ sơ; phần chưa xác minh đã vào `sourceNotes` hoặc `CAN-KIEM-CHUNG.md`
- [ ] Bản tiếng Anh cùng phạm vi, không mạnh hơn bản tiếng Việt
- [ ] Cặp đường dẫn mới đã thêm vào `src/i18n/contentRoutes.ts`
- [ ] Ảnh AI mới (nếu có) đã được anh duyệt trực quan và có nhãn ở thẻ lẫn hộp phóng to
- [ ] Báo cáo ghi rõ tệp, dòng, nội dung sửa
- [ ] GPT Work nghiệm thu và anh Vinh cho phép phát hành
- [ ] Sau phát hành: kiểm lại trên production
