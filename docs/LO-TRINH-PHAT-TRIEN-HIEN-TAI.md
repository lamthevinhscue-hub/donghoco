# LỘ TRÌNH PHÁT TRIỂN — HIỆN TẠI

## 1. Mục đích của tài liệu

Đây là **tài liệu trạng thái chính thức** của dự án website `kienthucdonghoco.vn` — nơi duy nhất phản ánh đúng những gì **đã hoàn thành**, **đang chờ** và **chưa thực hiện**.

Các tài liệu khác có ngày cũ (`docs/danh-gia-toan-dien-2026-08-28.md`, `docs/lo-trinh-con-lai-2026-08-28.md`, các đánh giá trước đó) **chỉ dùng để tham khảo lịch sử**. Khi một con số hoặc một nhận định trong tài liệu cũ khác với tài liệu này, **tài liệu này là chuẩn**.

Số liệu trong tài liệu được đếm trực tiếp từ mã nguồn tại thời điểm ghi ở phần 2 — không sao chép từ tài liệu cũ.

---

## 2. Mốc kiểm tra

- **Ngày thực hiện:** 30/08/2026 (cập nhật lần 2 — nghiệm thu nhóm bốn công cụ tương tác).
- **Commit HEAD đang kiểm tra:** `9915a58` — "feat(interactive): nâng cấp công cụ GMT và tachymeter" (trước đó: `9c39352` hoàn thiện mô phỏng vành và lịch, `98fc626` kích hoạt liên kết biên tập đợt một).
- **Nhánh hiện tại:** `main`.
- **Kết quả `npm run check`:** ĐẠT — toàn bộ kiểm tra nội dung tĩnh (bao gồm nhóm kiểm WCAG tự động) không có lỗi.
- **Nghiệm thu trình duyệt bốn công cụ tương tác:** ĐẠT trên bản preview sau build — biên bản tại `docs/nghiem-thu/2026-08-30_nghiem-thu-cong-cu-tuong-tac.md`.

**Lưu ý quan trọng:** các kiểm tra tự động chỉ rà được phần tĩnh của mã nguồn. Chúng **không chứng minh toàn bộ trải nghiệm trên website đã triển khai** — tốc độ thật trên máy người dùng, hoạt động trên điện thoại thật, màn hình thật, bàn phím thật, trình đọc màn hình thật vẫn phải nghiệm thu thủ công (xem phần 6 và phần 8).

---

## 3. Quy mô nội dung hiện tại

Số liệu đếm trực tiếp từ `src/content/*/vi/` và `src/data/` ngày 30/08/2026:

| Mảng | Số bài tiếng Việt |
|---|---:|
| Thương hiệu (`thuongHieu`) | **73** |
| Mẫu iconic (`mauIconic`) | **66** |
| Cơ chế (`coChe`) | **18** |
| Thuật ngữ (`tuDien`) | **33** |
| Hướng dẫn (`huongDan`) | **14** |
| **Tổng bài nội dung** | **204** |

- **Mốc lịch sử:** 28 mốc trong `src/data/timeline.json`, hiển thị trên trang `/lich-su`.
- **Hình minh họa lịch sử:** có **28 hình SVG minh họa cho 28 mốc** trong `public/images/timeline/` (mỗi mốc một SVG cùng slug). Trang `/lich-su` ưu tiên dùng ảnh JPG của mốc nếu tồn tại, nếu không sẽ dùng SVG cùng slug — hiện chưa có JPG tương ứng nên **28 SVG đang là minh họa hiển thị của 28 mốc**.

Nguồn tham khảo: 73/73 thương hiệu, 66/66 mẫu iconic, 18/18 cơ chế, 33/33 thuật ngữ đều có khối nguồn; 9/14 bài hướng dẫn có nguồn (5 bài để trống theo chủ ý từ đầu).

---

## 4. Những phần đã hoàn thành

Tóm tắt đúng tình trạng tại HEAD `9915a58`:

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
- **Hạ tầng liên kết biên tập** — schema `relatedModels` / `relatedMechanisms` và khối hiển thị "Kết nối cùng chủ đề" trên trang mẫu iconic và thương hiệu đã hoạt động; tài liệu đề xuất 15 nhóm quan hệ tại `docs/de-xuat-lien-ket-bien-tap-v1.md` chờ duyệt và áp (chi tiết ở phần 5).

---

## 5. Những phần đã có hạ tầng nhưng chưa tạo giá trị đầy đủ

- **Liên kết biên tập (`relatedModels` / `relatedMechanisms`):** hạ tầng đã bắt đầu tạo giá trị nhưng phần lớn dữ liệu vẫn chưa điền. Hiện trạng đếm từ mã nguồn: trường `relatedModels` có dữ liệu trong **10/66 bài mẫu iconic** (đợt một), **0/73 trang thương hiệu**; `relatedMechanisms` **chưa bài nào dùng**; collection `coChe` vẫn **chưa có** trường liên kết — nếu sau này cần liên kết từ bài cơ chế sang mẫu đồng hồ thì phải mở rộng schema bằng một gói riêng (không làm trong gói tài liệu). Đề xuất 15 nhóm quan hệ ở `docs/de-xuat-lien-ket-bien-tap-v1.md` là căn cứ để tiếp tục điền theo đợt.
- **Analytics:** đã tích hợp (Vercel Web Analytics) nhưng chưa xem xét số liệu thực tế — chưa có đánh giá hành vi người đọc dựa trên dữ liệu.
- **Giao diện đa ngôn ngữ:** cấu trúc thư mục `en/` và bộ chuyển ngữ giao diện đã sẵn sàng, nhưng **chưa có kho bài tiếng Anh thực chất** (0 bài trong các bộ sưu tập `en/`).
- **Newsletter:** mới ở trạng thái **chuẩn bị** — chỉ có trong kế hoạch (Giai đoạn 4, "Newsletter hoạt động thật"); chưa có gì trong mã nguồn và chưa hoạt động thực tế. Form liên hệ hiện dùng Formspree gói miễn phí (giới hạn 50 lượt/tháng — ghi ở `CAN-KIEM-CHUNG.md` mục 24).

---

## 6. Những việc còn lại theo thứ tự

### Ưu tiên 0

- **Hoàn thiện hồ sơ trạng thái và làm sạch tracker kiểm chứng** — chính là gói việc này: `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` trở thành tài liệu trạng thái duy nhất; `CAN-KIEM-CHUNG.md` được rà lại và thống nhất cách ghi trạng thái; `PROJECT.md` gắn ghi chú rõ là bản kiến trúc khởi đầu, không dùng để tra tiến độ.

### Ưu tiên 1

- **Kiểm chứng và áp dụng liên kết biên tập** — duyệt 15 nhóm đề xuất, điền dữ liệu vào frontmatter theo đợt nhỏ, kiểm tra hiển thị cả sáng/tối và mobile. (Đã áp đợt một: 10 bài mẫu iconic có `relatedModels` — xem số liệu ở phần 5; còn thương hiệu, các nhóm còn lại và chiều `relatedMechanisms` chưa điền.)
- **Chuẩn bị dữ liệu reference có nguồn** — cho sơ đồ tiến hóa dòng sản phẩm: chốt dòng nào làm trước, thu thập mốc năm/reference có kiểm chứng; nguyên tắc "thà thiếu còn hơn sai", ghi mục chưa chắc vào `CAN-KIEM-CHUNG.md`. (Đã xong cho dòng thí điểm Rolex Submariner: `docs/ho-so-du-lieu-tien-hoa-rolex-submariner.md` ngày rà 30/08/2026 — 8 mốc đủ nguồn, 5 điểm còn treo ở bảng "Cần kiểm chứng".)
- **Làm thử một sơ đồ tiến hóa reference** — thí điểm một dòng (một sơ đồ khái niệm, ghi rõ là khái niệm nếu không chắc tỷ lệ/mốc), đánh giá rồi mới nhân rộng. **(Đã thí điểm xong 30/08/2026: sơ đồ tiến hóa Rolex Submariner với 8 mốc đủ nguồn, hiển thị tại `https://www.kienthucdonghoco.vn/mau-iconic/rolex-submariner/` — chỉ trang này; dữ kiện duy nhất ở `src/data/submarinerEvolution.ts`; biên bản `docs/nghiem-thu/2026-08-30_nghiem-thu-so-do-tien-hoa-submariner.md`. Chờ đánh giá rồi mới nhân rộng sang dòng khác.)**

### Ưu tiên 2

- **Xử lý các thông tin kiểm chứng có ảnh hưởng tới nội dung đang hiển thị** — trước mắt là các liên kết nguồn đã chết đang hiển thị trên trang (xem bảng tổng hợp đầu `CAN-KIEM-CHUNG.md`).
- **Nghiệm thu production trên mobile, desktop, sáng/tối, zoom 200% và bàn phím** — kiểm tra thủ công trên bản đã triển khai thật, không chỉ bản xem trước trên máy.
- **Theo dõi Search Console, Analytics và Core Web Vitals** — lập nhịp rà định kỳ khi có số liệu thực.
- **Phát triển các cụm nội dung SEO** — nhóm bài chủ đề quanh từ khóa thực tế.

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
