# LỘ TRÌNH PHÁT TRIỂN — HIỆN TẠI

## 1. Mục đích của tài liệu

Đây là **tài liệu trạng thái chính thức** của dự án website `kienthucdonghoco.vn` — nơi duy nhất phản ánh đúng những gì **đã hoàn thành**, **đang chờ** và **chưa thực hiện**.

Các tài liệu khác có ngày cũ (`docs/danh-gia-toan-dien-2026-08-28.md`, `docs/lo-trinh-con-lai-2026-08-28.md`, các đánh giá trước đó) **chỉ dùng để tham khảo lịch sử**. Khi một con số hoặc một nhận định trong tài liệu cũ khác với tài liệu này, **tài liệu này là chuẩn**.

Số liệu trong tài liệu được đếm trực tiếp từ mã nguồn tại thời điểm ghi ở phần 2 — không sao chép từ tài liệu cũ.

---

## 2. Mốc kiểm tra

- **Ngày thực hiện:** 02/09/2026 (cập nhật lần 9 — nâng cấp cụm nội dung "Chọn đồng hồ cơ đầu tiên" theo hướng người đọc, thêm Bàn quyết định và kiểm cụm tự động).
- **Commit nền của gói:** `87c82a2` — "perf(3d): tách tải mô hình giải phẫu" (trước đó: `a5cc505` thêm lộ trình học, `2e77f1b` mở rộng sơ đồ tiến hóa, `ee5b480` bổ sung iconic complication, `2cee119` hoàn thiện liên kết cơ chế, `7e4e1fc` mở rộng liên kết cơ chế, `f00b4fc` thay nguồn tham khảo bị chết, `5a597a1` hoàn thiện liên kết iconic). Đây là commit nền khi bắt đầu gói; chi tiết thay đổi và kết quả kiểm tra được ghi tại biên bản nghiệm thu Prompt 28.
- **Nhánh hiện tại:** `main`.
- **Kết quả `npm run check`:** ĐẠT — toàn bộ kiểm tra nội dung tĩnh, nhóm kiểm WCAG tự động, **kiểm tra liên kết biên tập (`scripts/check-editorial-links.mjs`)**, **kiểm dữ liệu sơ đồ tiến hóa (`scripts/check-evolution-data.mjs`)**, **kiểm dữ liệu lộ trình học (`scripts/check-learning-paths.mjs`)** và **kiểm cụm "chọn đồng hồ cơ đầu tiên" (`scripts/check-first-watch-cluster.mjs`)** không có lỗi.
- **Kết quả build ngày 01/09/2026 (kết quả build thật, đếm từ `dist/` sau build):** **222 trang**, **15.176 liên kết nội bộ hợp lệ**, không có liên kết nội bộ hỏng. Chuỗi `npm run build` nay bao gồm **script chống hồi quy tải 3D (`scripts/check-3d-loading-budget.mjs`)** chạy ngay sau Astro build: xác nhận Three.js chỉ nằm trong các chunk tải khi người dùng chủ động mở tab "Mô hình 3D" trên `/giai-phau/` (engine 131.3 KB gzip + OrbitControls 4.4 KB gzip, cache riêng) và không route nào — kể cả `/giai-phau/` ở sơ đồ 2D mặc định — tải chunk 3D trong luồng ban đầu. Số liệu là build cục bộ, chưa thay thế dữ liệu Core Web Vitals production.
- **Số liệu đếm từ mã nguồn (frontmatter, ngày 01/09/2026):** `relatedModels` mẫu ↔ mẫu **131 mục / 69 bài**; `relatedModels` từ bài cơ chế **29 mục / 18 bài**; `relatedMechanisms` trên bài iconic **29 mục / 24 bài** (chi tiết ở phần 5).
- **Nghiệm thu trình duyệt bốn công cụ tương tác:** ĐẠT trên bản preview sau build — biên bản tại `docs/nghiem-thu/2026-08-30_nghiem-thu-cong-cu-tuong-tac.md`.

**Lưu ý quan trọng:** các kiểm tra tự động chỉ rà được phần tĩnh của mã nguồn. Chúng **không chứng minh toàn bộ trải nghiệm trên website đã triển khai** — tốc độ thật trên máy người dùng, hoạt động trên điện thoại thật, màn hình thật, bàn phím thật, trình đọc màn hình thật vẫn phải nghiệm thu thủ công (xem phần 6 và phần 8).

---

## 3. Quy mô nội dung hiện tại

Số liệu đếm trực tiếp từ `src/content/*/vi/` và `src/data/` ngày 01/09/2026:

| Mảng | Số bài tiếng Việt |
|---|---:|
| Thương hiệu (`thuongHieu`) | **73** |
| Mẫu iconic (`mauIconic`) | **69** |
| Cơ chế (`coChe`) | **18** |
| Thuật ngữ (`tuDien`) | **33** |
| Hướng dẫn (`huongDan`) | **14** |
| **Tổng bài nội dung** | **207** |

- **Mốc lịch sử:** 28 mốc trong `src/data/timeline.json`, hiển thị trên trang `/lich-su`.
- **Hình minh họa lịch sử:** có **28 hình SVG minh họa cho 28 mốc** trong `public/images/timeline/` (mỗi mốc một SVG cùng slug). Trang `/lich-su` ưu tiên dùng ảnh JPG của mốc nếu tồn tại, nếu không sẽ dùng SVG cùng slug — hiện chưa có JPG tương ứng nên **28 SVG đang là minh họa hiển thị của 28 mốc**.

Nguồn tham khảo: 73/73 thương hiệu, 69/69 mẫu iconic, 18/18 cơ chế, 33/33 thuật ngữ đều có khối nguồn; 9/14 bài hướng dẫn có nguồn (5 bài để trống theo chủ ý từ đầu).

---

## 4. Những phần đã hoàn thành

Tóm tắt tình trạng tại mốc rà soát ngày 01/09/2026:

- **Nền tảng Astro và hệ thống nội dung** — website tĩnh Astro + Tailwind, nội dung Markdown theo bộ sưu tập có kiểm tra schema; xây bài mới không cần đụng mã nguồn.
- **Giao diện sáng/tối** — toàn trang có hai chế độ, màu quản bằng token (`--ig-*`, `--obs-*` cho hình vẽ; token Tailwind cho giao diện).
- **Tìm kiếm toàn website** — hộp tìm kiếm dùng chỉ mục Pagefind, sinh khi build.
- **So sánh** — trang `/so-sanh` đối chiếu các mẫu iconic.
- **SEO kỹ thuật cơ bản** — sitemap tự sinh khi build, dữ liệu có cấu trúc (structured data), ảnh chia sẻ mạng xã hội (OG) tự sinh.
- **WCAG 2.2 AA ở mức nền tảng** — bộ kiểm tra tự động (gồm `check-motion-accessibility` và phần WCAG trong `npm run check`) đạt; trang công bố `/kha-nang-tiep-can` khớp thực tế tại thời điểm rà. **Không phải "đạt WCAG toàn diện tuyệt đối"**: tương phản, reflow, zoom 200%, bàn phím, trình đọc màn hình trên **trình duyệt và thiết bị thật** vẫn cần nghiệm thu thủ công định kỳ.
- **Giải phẫu 2D/3D** — trang `/giai-phau` có sơ đồ tách lớp 2D và mô hình 3D xoay/zoom/tách lớp tải theo yêu cầu, có bản 2D dự phòng khi 3D không tải được.
- **Hệ thống infographic đã nâng cấp** — Tổng bộ được rà: **28 thành phần đồ họa/công cụ, đủ 28 đã qua đợt đồng bộ chất liệu**: 12 infographic cơ chế, 10 minh họa thuật ngữ, 2 bản giải phẫu (2D và 3D), và **4 công cụ tương tác — `BezelDiver`, `DateSafety`, `GmtReader`, `TachymeterTool` — đã hoàn tất nâng cấp và nghiệm thu nhóm ngày 30/08/2026** (biên bản: `docs/nghiem-thu/2026-08-30_nghiem-thu-cong-cu-tuong-tac.md`). **AntiMagnetic và Crystal đã được nâng cấp**. **`MechanismAnimation` là khung điều khiển dùng chung** (nút bấm, đếm bước, hỗ trợ giảm chuyển động) — **không phải một infographic độc lập còn thiếu**. Ghi chú trung thực: vẫn còn một số ít mã màu trực tiếp chưa chuyển hết sang token — 6 chỗ trong `Escapement`, 17 chỗ trong bản 2D giải phẫu (`WatchExplodedView`), và 4 điểm nhấn nhỏ (viền thẻ giải thích/bóng đổ JS) ở mỗi một trong bốn minh họa thuật ngữ làm trước (`Chronograph`, `GMT`, `Hairspring`, `Tourbillon`).
- **Dòng thời gian lịch sử** — trang `/lich-su` với 28 mốc từ `timeline.json`.
- **Bài hoàn thiện thủ công** — `hoan-thien-thu-cong-dong-ho` đã xuất bản (commit `f5e1ecf`): bài dài nhất trang, 7 mục, 6 nguồn chuyên ngành (Poinçon de Genève, AHCI, Grand Seiko, Breguet, SVMA, Anglage), liên kết nội bộ dày nhất trang.
- **Hạ tầng liên kết biên tập** — schema `relatedModels` / `relatedMechanisms`, khối hiển thị "Kết nối cùng chủ đề" trên trang mẫu iconic, thương hiệu và cơ chế đã hoạt động; **script kiểm tự động `scripts/check-editorial-links.mjs` đã chạy trong `npm run check`** (kiểm slug hỏng, trùng lặp, thiếu relation và bắt buộc hai chiều cho quan hệ cơ chế ↔ mẫu iconic); tài liệu đề xuất 15 nhóm quan hệ tại `docs/de-xuat-lien-ket-bien-tap-v1.md` đã áp phần lớn (chi tiết ở phần 5).

---

## 5. Những phần đã có hạ tầng nhưng chưa tạo giá trị đầy đủ

- **Liên kết biên tập (`relatedModels` / `relatedMechanisms`):** mạng liên kết giữa các mẫu iconic **đã hoàn tất ở phạm vi hiện tại** — đếm trực tiếp từ frontmatter ngày 01/09/2026: **69/69 bài mẫu iconic** có dữ liệu `relatedModels` với tổng **131 mục liên kết** (giữa các mẫu trong cùng cụm/tuyến chủ đề). **Chiều cơ chế ↔ mẫu iconic: 29 cặp quan hệ hai chiều** (script `check-editorial-links.mjs` đếm) — gồm `relatedModels` từ bài cơ chế **29 mục trong 18 bài** và `relatedMechanisms` trên **29 mục trong 24 bài iconic**; **không còn bài cơ chế nào thiếu quan hệ**: bốn cơ chế còn trống trước đó đã được nối ở gói này — `gmt` ⇄ `rolex-gmt-master`, `perpetual-calendar` ⇄ `audemars-piguet-royal-oak-perpetual-calendar` và `patek-philippe-grandmaster-chime`, `diem-chuong` ⇄ `patek-philippe-grandmaster-chime`, `bo-thoat` ⇄ `freak` (chi tiết ở biên bản `docs/nghiem-thu/2026-09-01_nghiem-thu-ba-mau-iconic-complication.md`). **Các trang thương hiệu tự động lấy mẫu iconic tương ứng qua việc đối chiếu tên thương hiệu** (khối "Mẫu iconic của…" trên trang hãng) — **không cần thêm thủ công `relatedModels` vào 73 bài thương hiệu**. Gói thương hiệu → mẫu iconic (thêm `relatedModels` vào 66 trang hãng) đã dừng vì cần mở hạ tầng trước (schema `thuongHieu` hiện chưa có trường này; template thương hiệu chưa render nó) — chờ quyết định.
- **Analytics:** đã tích hợp (Vercel Web Analytics) nhưng chưa xem xét số liệu thực tế — chưa có đánh giá hành vi người đọc dựa trên dữ liệu.
- **Giao diện đa ngôn ngữ:** cấu trúc thư mục `en/` và bộ chuyển ngữ giao diện đã sẵn sàng, nhưng **chưa có kho bài tiếng Anh thực chất** (0 bài trong các bộ sưu tập `en/`).
- **Newsletter:** mới ở trạng thái **chuẩn bị** — chỉ có trong kế hoạch (Giai đoạn 4, "Newsletter hoạt động thật"); chưa có gì trong mã nguồn và chưa hoạt động thực tế. Form liên hệ hiện dùng Formspree gói miễn phí (giới hạn 50 lượt/tháng — ghi ở `CAN-KIEM-CHUNG.md` mục 24).

---

## 6. Những việc còn lại theo thứ tự

### Ưu tiên 0

- **Hoàn thiện hồ sơ trạng thái và làm sạch tracker kiểm chứng** — chính là gói việc này: `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` trở thành tài liệu trạng thái duy nhất; `CAN-KIEM-CHUNG.md` được rà lại và thống nhất cách ghi trạng thái; `PROJECT.md` gắn ghi chú rõ là bản kiến trúc khởi đầu, không dùng để tra tiến độ.

### Ưu tiên 1

- **Kiểm chứng và áp dụng liên kết biên tập** — duyệt 15 nhóm đề xuất, điền dữ liệu vào frontmatter theo đợt nhỏ, kiểm tra hiển thị cả sáng/tối và mobile. **(Hoàn tất ở phạm vi hiện tại cho chiều mẫu ↔ mẫu: 69/69 bài iconic có `relatedModels` — 131 mục. Chiều cơ chế ↔ mẫu: 29 cặp hai chiều theo các cụm chronograph, tourbillon, pha trăng, lên dây tự động, dạ quang, chống nước, trữ cót, chống từ, chuỗi truyền động, dây tóc, chống sốc, hiển thị ngày, kính, GMT, lịch vạn niên, điểm chuông và bộ thoát–silic; mọi bài cơ chế đều có ít nhất một quan hệ. Script kiểm tự động hai chiều đã vào `npm run check`.)**
- **Chuẩn bị dữ liệu reference có nguồn** — cho sơ đồ tiến hóa dòng sản phẩm: chốt dòng nào làm trước, thu thập mốc năm/reference có kiểm chứng; nguyên tắc "thà thiếu còn hơn sai", ghi mục chưa chắc vào `CAN-KIEM-CHUNG.md`. **(Đã có hồ sơ cho 2 dòng: `docs/ho-so-du-lieu-tien-hoa-rolex-submariner.md` ngày rà 30/08/2026 — 8 mốc đủ nguồn, 5 điểm còn treo ở bảng "Cần kiểm chứng"; và `docs/ho-so-du-lieu-tien-hoa-rolex-gmt-master.md` ngày rà 01/09/2026 — 8 mốc đủ nguồn, mốc bị loại có lý do riêng. Nhân rộng sang dòng mới bắt buộc phải có hồ sơ nguồn riêng trước.)**
- **Làm thử một sơ đồ tiến hóa reference** — thí điểm một dòng (một sơ đồ khái niệm, ghi rõ là khái niệm nếu không chắc tỷ lệ/mốc), đánh giá rồi mới nhân rộng. **(Thí điểm 30/08/2026 với Rolex Submariner — 8 mốc đủ nguồn tại `https://www.kienthucdonghoco.vn/mau-iconic/rolex-submariner/`, biên bản `docs/nghiem-thu/2026-08-30_nghiem-thu-so-do-tien-hoa-submariner.md`; ngày 01/09/2026 đã chuẩn hóa thành hạ tầng dùng chung: `src/data/modelEvolution.ts` (kiểu + sổ đăng ký + điều kiện render), component tổng quát `src/components/ModelEvolution.astro`, dataset riêng theo dòng (`submarinerEvolution.ts`, `rolexGmtMasterEvolution.ts`) và script kiểm dữ liệu `scripts/check-evolution-data.mjs` đã vào `npm run check`. **Đã xuất bản 2 sơ đồ tiến hóa** — Submariner (8 mốc, dữ kiện giữ nguyên từ thí điểm) và GMT-Master (8 mốc, `https://www.kienthucdonghoco.vn/mau-iconic/rolex-gmt-master/`). Dữ liệu vẫn có giới hạn: mỗi sơ đồ chỉ gồm các mốc đã kiểm chứng trong hồ sơ riêng của dòng — không có hồ sơ nguồn thì chưa làm sơ đồ. Biên bản `docs/nghiem-thu/2026-09-01_nghiem-thu-so-do-tien-hoa-gmt-master.md`.)**
- **Trang hub "Lộ trình học đồng hồ cơ"** — bản đồ đường đọc cho ba nhóm người đọc (bắt đầu chơi, hiểu bộ máy, tư duy người sưu tầm), chỉ **tổ chức lại các bài/trang đã tồn tại** — không tạo dữ kiện hay bài mới. **(Hoàn tất 01/09/2026: trang `/lo-trinh-hoc-dong-ho/` gồm 3 lộ trình — 5 + 6 + 6 bước, mỗi bước là một liên kết thật kèm lý do đọc; dữ liệu tập trung ở `src/data/learningPaths.ts`; script kiểm `scripts/check-learning-paths.mjs` đã vào `npm run check` (đủ 3 lộ trình, ≥5 bước/lộ trình, route nội bộ tồn tại, không URL ngoài); điểm vào từ nhóm menu "Kiến thức" (desktop + mobile) và CTA trên trang chủ; hiển thị đầy đủ khi không có JavaScript. Giới hạn: giá trị nằm ở tổ chức đường đọc — chưa phải kết quả SEO hay Analytics thực tế. Biên bản `docs/nghiem-thu/2026-09-01_nghiem-thu-lo-trinh-hoc-dong-ho.md`.)**
- **Tối ưu hiệu năng phần 3D giải phẫu + ngân sách tải** — Three.js chỉ tải khi người dùng chủ động mở tab "Mô hình 3D"; engine dùng named imports (không namespace), OrbitControls tách chunk cache riêng; script chống hồi quy `scripts/check-3d-loading-budget.mjs` chạy trong `npm run build` sau Astro build — xác nhận 5 route kiểm (trang chủ, thương hiệu, mẫu iconic, cơ chế, `/giai-phau/` ở 2D mặc định) không tải chunk 3D ban đầu. **(Hoàn tất 01/09/2026; chi tiết số liệu trước/sau và nghiệm thu trình duyệt ở biên bản `docs/nghiem-thu/2026-09-01_nghiem-thu-hieu-nang-giai-phau-3d.md`. Giới hạn: kích thước chunk 3D là bản chất của Three.js; chưa có dữ liệu Core Web Vitals production.)**
- **Nâng cấp cụm nội dung "Chọn đồng hồ cơ đầu tiên"** — bài trụ cột viết lại thành **khung quyết định cho người mới** theo hướng people-first: bỏ bảng giá/ngân sách, tư vấn đầu tư/"giữ giá", chu kỳ bảo dưỡng cố định và bảng kích thước tuyệt đối (không có nguồn); thêm **Bàn quyết định** (DecisionMap — bản đồ điều hướng 3 nhánh đầu bài, HTML tĩnh không script) và liên kết hai chiều với 5 bài hỗ trợ + Lộ trình học + Từ điển; kiểm cụm tự động `scripts/check-first-watch-cluster.mjs` đã vào `npm run check`. **(Hoàn tất 02/09/2026; hồ sơ nguồn tại `docs/ho-so-nguon-chon-dong-ho-co-dau-tien.md`, chiến lược cụm — ghi rõ là giả định cần kiểm chứng bằng Search Console — tại `docs/chien-luoc-seo-cum-chon-dong-ho-dau-tien.md`, biên bản `docs/nghiem-thu/2026-09-02_nghiem-thu-cum-seo-chon-dong-ho-dau-tien.md`. Đây là cụm nội dung people-first, không phải cam kết thứ hạng SEO; chưa có dữ liệu Search Console/Analytics để kết luận hiệu quả.)**

### Ưu tiên 2

- **Xử lý các thông tin kiểm chứng có ảnh hưởng tới nội dung đang hiển thị** — **(Cập nhật 01/09/2026: ba liên kết nguồn chết Patek Philippe, COSC và Kurono Tokyo đã được thay bằng URL chính hãng hoạt động trong đủ bảy bài — 6 bài ban đầu cộng bài `patek-nautilus` được phát hiện khi rà toàn bộ `src/content/`; tracker `CAN-KIEM-CHUNG.md` không còn cờ ưu tiên đang mở cho ba URL này — xem bảng lịch sử xử lý ở bảng tổng hợp tracker.)** Các việc tiếp theo của nhóm này vẫn là:
  - **Nghiệm thu production trên mobile, desktop, sáng/tối, zoom 200% và bàn phím** — kiểm tra thủ công trên bản đã triển khai thật, không chỉ bản xem trước trên máy (chưa có bằng chứng thực hiện — vẫn treo).
  - **Theo dõi Search Console, Analytics và Core Web Vitals** — lập nhịp rà định kỳ khi có số liệu thực (chưa thực hiện — vẫn treo).
  - **Phát triển các cụm nội dung SEO** — nhóm bài chủ đề quanh từ khóa thực tế (chưa thực hiện — vẫn treo).

### Ưu tiên 3, có điều kiện

- **Nội dung tiếng Anh** — chỉ khi khối tiếng Việt đã ổn định và có người chịu trách nhiệm biên tập tiếng Anh.
- **Newsletter** — khi có công cụ gửi và nội dung định kỳ thực sự.
- **Các cải tiến trang trí không ảnh hưởng khả năng sử dụng** — làm sau khi các ưu tiên trên xong, không được làm giảm khả năng tiếp cận.

---

## 7. Những việc không nên làm lúc này

- **Không thiết kế lại toàn website** — nền giao diện và hệ thống token vừa đồng bộ xong, chưa có lý do đủ lớn.
- **Không thêm hiệu ứng chỉ để trang trí** — mọi chuyển động phải phục vụ việc giải thích và tôn trọng `prefers-reduced-motion`.
- **Không bổ sung hàng loạt thương hiệu chỉ để tăng số lượng** — chất lượng và nguồn của bài hiện có quan trọng hơn số lượng.
- **Không dịch toàn bộ website sang tiếng Anh** — khối tiếng Việt mới là nội dung đang phục vụ người đọc thật.
- **Không tự điền thông tin lịch sử chưa có nguồn** — năm, reference, calibre chỉ điền sau khi kiểm chứng; ghi vào `CAN-KIEM-CHUNG.md` khi chưa chắc.
- **Không cố xử lý mọi mục "chờ nguồn" như thể đó là lỗi đang xuất bản** — phần lớn mục trong `CAN-KIEM-CHUNG.md` đã được xử lý an toàn (đã ẩn hoặc đã diễn đạt lại), không gây sai cho người đọc; chỉ nhóm `CẦN ƯU TIÊN KIỂM CHỨNG` mới cần hành động sớm.

---

## 8. Điều kiện nghiệm thu chung

Mọi gói phát triển sau này phải:

1. Không làm hỏng URL hiện tại.
2. Không tạo liên kết chết.
3. Hoạt động ở cả chế độ sáng và tối.
4. Dùng được trên điện thoại.
5. Không làm giảm khả năng thao tác bằng bàn phím.
6. Tôn trọng `prefers-reduced-motion`.
7. Không làm giảm điểm tương phản.
8. `npm run check` đạt.
9. Nghiệm thu thủ công phần tương tác đã sửa (trên trình duyệt thật, cả hai chế độ sáng/tối).
10. Chỉ commit đúng tệp thuộc gói công việc.
