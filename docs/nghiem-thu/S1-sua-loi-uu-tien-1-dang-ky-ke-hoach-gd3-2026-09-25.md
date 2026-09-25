# BIÊN BẢN GÓI S1 — SỬA 12 LỖI ƯU TIÊN 1 + ĐĂNG KÝ KẾ HOẠCH GIAI ĐOẠN 3

**Ngày:** 25/09/2026
**Giao dịch:** TXN-20260925-156 — danh mục DHC-GD3-20260925 v1.0.0; **vòng sửa 1 (mutation H09 trên cây tạm): TXN-20260925-157, cùng ngày**
**Nền Git:** HEAD = `origin/main` = `3192133` (`319213319679bc1f05dfee88427dfe529f3a5039`), nhánh `main`, staged = 0, untracked có trước giữ nguyên
**Prompt căn cứ:** `docs/prompt-sua-loi-uu-tien-1-2026-09-25.md` + prompt GPT Work gói S1 (TXN-20260925-156) + prompt vòng sửa 1 (TXN-20260925-157)
**Trạng thái:** đã làm xong vòng sửa 1, CHƯA stage, CHƯA commit, CHƯA push — chờ GPT Work tái nghiệm thu

> **Ghi chú vòng sửa 1 (TXN-20260925-157):** vòng đầu ghi mutation thực hiện tạm trong cây repo chính; vòng này làm lại toàn bộ bằng chứng mutation trên **bản sao tạm ngoài cây repo** `D:\donghoco-worktrees\s1-mut-h09\` theo yêu cầu — không mutation trực tiếp trong `D:\Watch web build`. Chi tiết ở mục 7 và log trong `output/s1-mut-h09-vong-sua/` (nội bộ, không phát hành). Không tệp sản phẩm/nội dung/ảnh/checker/cấu hình nào bị sửa thêm ở vòng này.

---

## 1. Phạm vi thực hiện

Nhóm A (4 lỗi CAN-KIEM-CHUNG), nhóm B (mục từ điển Biên độ), nhóm C (2 lỗi biên tập nhỏ), nhóm D (phân nhóm lại 6 cặp mục từ điển), nhóm E (ảnh AI mốc 1929), nhóm F (checker H09 hai chiều) và đăng ký kế hoạch giai đoạn 3 vào `docs/CHI-MUC-KE-HOACH-HIEN-HANH.md`. Không làm S2, N1, N2 hay gói nào khác.

## 2. Nhóm A — bốn lỗi đã ghi trong CAN-KIEM-CHUNG

| Tệp | Dòng | Sửa thành gì |
|---|---|---|
| `src/content/mauIconic/vi/reverso.md` | 57 | "thanhläng" → "thanh lịch" (một từ, còn lại nguyên dòng) |
| `src/content/mauIconic/vi/fifty-fathoms.md` | 66 | xóa nguyên bullet `- **Tech Gombessa** (2013) — thêm chức năng "Gombessa" đo thời gian lặn dài.`; tên "Tech Gombessa" vẫn trong `references` frontmatter (dòng 6) — cùng cách bản EN đã làm 19/09 |
| `src/content/mauIconic/vi/iwc-mark-xi.md` | 8 | xóa nguyên dòng `movement: "Calibre 32111"` (bảng thông số tự ẩn dòng rỗng — cùng cách bản EN) |
| `src/content/mauIconic/vi/iwc-mark-xi.md` | 75 | xóa câu `Mark XVIII hiện tại dùng **calibre 35111** (dựa ETA 2892).`; giữ nguyên calibre 89, JLC 889, ETA 2892 |
| `src/content/thuongHieu/vi/patek-philippe.md` | 23–25 | xóa nguyên mục `year: 1861` (title "Patek Philippe Seal — chuẩn nội bộ riêng từ 2009" + detail) khỏi `lineHistory`; thông tin Seal "từ 2009" còn ở thân bài dòng 102 |

Đối chiếu dist sau build (`dist/`):

- `dist/mau-iconic/reverso/index.html`: "thanhläng" ×0, "thanh lịch" ×1.
- `dist/mau-iconic/fifty-fathoms/index.html`: bullet 2013 ×0; "gombessa" ×1 (tên mẫu trong khối thế hệ tham chiếu — giữ như yêu cầu).
- `dist/mau-iconic/iwc-mark-xi/index.html`: "32111" ×0, "35111" ×0.
- `dist/thuong-hieu/patek-philippe/index.html`: "1861" ×0; câu thân bài "Từ 2009, hãng áp dụng" ×1.

## 3. Nhóm B — mục từ điển Biên độ

| Tệp | Dòng | Sửa thành gì |
|---|---|---|
| `src/content/tuDien/vi/bien-do.md` | 25 | "máy đo chronograph hiển thị" → "máy đo nhịp (timegrapher) hiển thị" |
| `src/content/tuDien/vi/bien-do.md` | 35 | "máy đo chronograph chính hãng" → "máy đo nhịp (timegrapher) chính hãng" |
| `src/content/tuDien/vi/bien-do.md` | 21 | xóa nguyên câu "Đặt vào bộ điều hòa của đồng hồ cơ: biên độ là góc quay của cán bánh lắc (balance staff) qua lại hai bên vị trí đứng yên trong mỗi nhịp dao động." — không viết câu thay thế |
| `src/content/tuDien/vi/bien-do.md` | 40 | nhãn "Cán bánh lắc dao động trên gì →" → "Bộ phận nhận xung lực từ bánh lắc qua ngựa → [Bánh thoát](/tu-dien/banh-thoat)" |
| `src/content/tuDien/en/amplitude.md` | 21 | xóa nguyên câu "In a watch's regulating organ, that angle is the swing of the balance staff on either side of its rest position during each oscillation." |
| `src/content/tuDien/en/amplitude.md` | 25 | "a chronograph timing machine displays" → "a timing machine (timegrapher) displays" |
| `src/content/tuDien/en/amplitude.md` | 40 | "What the balance swings on →" → "The wheel that delivers impulse through the lever → [Escape wheel](/en/glossary/escape-wheel/)" |

Đối chiếu dist: `dist/tu-dien/bien-do/index.html` — "máy đo chronograph" ×0, "máy đo nhịp (timegrapher)" ×2; `dist/en/glossary/amplitude/index.html` — "chronograph timing machine" ×0, "timing machine (timegrapher)" ×1.

`CAN-KIEM-CHUNG.md` thêm mục 59 mới (nguyên văn vấn đề theo prompt): "Quy ước đo biên độ trên máy đo nhịp — tính từ vị trí nghỉ tới một phía hay tổng hai phía. Cần nguồn kỹ thuật (ví dụ tài liệu của Witschi) trước khi viết lại định nghĩa áp dụng cho đồng hồ." — trạng thái CHỜ NGUỒN, không tự viết câu thay thế.

## 4. Nhóm C — hai lỗi biên tập nhỏ

| Tệp | Dòng | Sửa thành gì |
|---|---|---|
| `src/content/tuDien/vi/rattrapante.md` | 35 | xóa nguyên dòng ghi chú nội bộ "Trang FHH hiện có một câu lỗi ngắt câu — bài chỉ dùng các câu sạch nêu trên." |
| `src/content/tuDien/en/rattrapante.md` | 35 | xóa nguyên dòng "The FHH page currently contains one broken sentence — this article uses only the clean sentences quoted above." |
| `src/content/coChe/vi/manufacture-etablisseur.md` | 60 | "Hai bài liên quan →" → "Bài liên quan →" |
| `src/content/coChe/en/manufacture-etablisseur.md` | 60 | "Two related articles →" → "Related article →" |

Đối chiếu dist: "Hai bài liên quan"/"Two related articles" ×0 ở `dist/co-che/manufacture-etablisseur/index.html` và `dist/en/mechanisms/manufacture-etablisseur/index.html`; "câu lỗi ngắt câu"/"broken sentence" ×0 ở hai trang rattrapante. Checker H14-B trong `npm run build`: ĐẠT (liên kết chéo manufacture-etablisseur vi[2] en[2] giữ nguyên).

## 5. Nhóm D — phân nhóm lại sáu cặp mục từ điển

Đổi `category: "phức tạp cao cấp"` → `category: "phức tạp chức năng"` ở 12 tệp (cả VI và EN): `banh-xe-cot`/`column-wheel`, `flyback`/`flyback`, `gio-the-gioi`/`world-time`, `gio-nhay`/`jumping-hour`, `kim-hoi`/`retrograde`, `lich-nam`/`annual-calendar`. Giữ `rattrapante` và `phuong-trinh-thoi-gian` (VI+EN) ở "phức tạp cao cấp".

Đếm nhóm từ nguồn sau đổi (45 mục VI): bộ máy 13, chứng nhận 3, hoàn thiện 5, **phức tạp cao cấp 5, phức tạp chức năng 8**, thiết kế 7, độ chính xác và điều chỉnh 4.

Kỳ vọng checker cập nhật (`scripts/check-p0-d2-glossary-expansion.mjs` — script đã khóa nhóm cố định):

- 6 dòng bảng `MUC` tương ứng đổi `category: 'phức tạp chức năng'` (rattrapante + equation-of-time giữ nguyên kỳ vọng cũ);
- R5 `/tu-dien`: `cao === '5'` (từ '11'); comment đầu tệp và dòng mô tả R5 cập nhật theo;
- không thay đổi gì khác trong script.

Chạy `node scripts/check-p0-d2-glossary-expansion.mjs` → ĐẠT exit 0; qua build kèm dist → "R5 dist ĐẠT". Đối chiếu dist: `dist/tu-dien/index.html` — "Tất cả (45)", "Phức tạp — chức năng (8)", "Phức tạp — cao cấp (5)".

## 6. Nhóm E — ảnh AI mốc 1929

- **Bản gốc đã duyệt:** `output/p0-c-ai-timeline-context/great-depression-1929-goc-duyet.png` — PNG 2.486.330 bytes, 1448×1086 (4:3).
- **Bản cũ trên trang:** `public/images/timeline/great-depression-1929.jpg` — 146.203 bytes, 1200×900, có nét giống chữ ký ở góc dưới trái (khoảng 0–260, 820–900).
- **Cắt lại (chỉ cắt, không tô/che/vẽ lại):** `extract {left: 74, top: 0, width: 1300, height: 975}` từ PNG gốc — khung 4:3 (1300/975) loại hẳn dải đáy từ y≈984 gốc chứa nét chữ ký (nét bắt đầu y≈989 gốc, cách mép cắt 14px), cắt đều 74px mỗi bên ngang; resize về 1200×900; JPEG q68, subsampling 4:2:0 — cùng bộ tham số nén với 4 JPG timeline khác.
- **Kết quả:** `public/images/timeline/great-depression-1929.jpg` mới — **140.734 bytes** (<150 KB), 1200×900 4:3 (đọc header SOF c0). Đã đối chiếu trực quan ảnh mới: góc dưới trái sạch nét chữ ký, bố cục giữ nguyên chủ thể (cửa hàng đóng cửa, người đi bộ, xe cổ, đèn phố). Không có bản WebP của ảnh này trong `public/images/timeline/` (chỉ 5 JPG, không WebP) — không tạo WebP mới.
- `dist/images/timeline/great-depression-1929.jpg` sau build: 140.734 bytes, khớp bản nguồn.

## 7. Nhóm F — kiểm nhãn AI hai chiều

Sửa `scripts/check-h09-timeline-zoom.mjs` (không tạo checker mới, không sửa `package.json`):

- Thêm ca **H9-7**: map `ANH_AI` trích từ `HistoryTimeline.astro` ↔ tệp JPG thực tế trong `public/images/timeline/` phải khớp **hai chiều** — JPG nào không có mục nhãn AI, hoặc mục nhãn nào không có JPG, là lệch → thêm vào danh sách lỗi → exit 1. Đọc nguồn component chuyển lên đầu (1 lần) thay vì đọc lại mỗi trang.
- Không đổi H9-1 đến H9-6.

Chạy sạch: `node scripts/check-h09-timeline-zoom.mjs dist` → **KẾT LUẬN H09: ĐẠT — 13/13 ca** (12 ca cũ + H9-7: "ANH_AI ↔ JPG khớp hai chiều (5 JPG / 5 mục nhãn)").

### Mutation — vòng sửa 1 (TXN-20260925-157): bản sao tạm ngoài cây repo

Cây tạm `D:\donghoco-worktrees\s1-mut-h09\` — không mutation trực tiếp trong `D:\Watch web build`. Cây tạm chứa đủ tệp phụ thuộc checker (38 tệp): `scripts/check-h09-timeline-zoom.mjs`, `src/data/timeline.json`, `src/components/history/HistoryTimeline.astro`, `public/images/timeline/` (33 tệp, 5 JPG), `dist/lich-su/index.html`, `dist/en/history/index.html`. Checker chỉ dùng `node:fs`/`node:path` — không cần node_modules.

| Bước | Kết quả |
|---|---|
| Baseline cây tạm | exit 0 — ĐẠT 13/13 (log `baseline.log`) |
| Ca A: copy `atomic-second-1967.jpg` → `mutation-ca-a.jpg` (JPG hợp lệ, không mục ANH_AI) | **exit 1** — `LỖI [H9-7] ANH_AI ↔ JPG khớp hai chiều (6 JPG / 5 mục nhãn) — JPG thiếu nhãn AI: mutation-ca-a`; KẾT LUẬN KHÔNG ĐẠT (log `ca-a.log`) |
| Khôi phục ca A | xóa `mutation-ca-a.jpg`; `sha256sum -c` 6 tệp OK (byte-đối-byte); chạy sạch lại exit 0 ĐẠT 13/13 (log `sach-sau-ca-a.log`) |
| Ca B: bỏ slug `'universal-time-1884'` khỏi `ANH_AI` trong bản sao `HistoryTimeline.astro`, JPG còn tồn tại | **exit 1** — `LỖI [H9-6-VI] 4 mốc ảnh AI: nhãn ở thẻ + truyền vào hộp phóng to (×5) — đủ, truyền=5` + `LỖI [H9-7] (5 JPG / 4 mục nhãn) — JPG thiếu nhãn AI: universal-time-1884`; KẾT LUẬN KHÔNG ĐẠT (log `ca-b.log`) |
| Khôi phục ca B | chép lại `HistoryTimeline.astro` nguyên bản từ repo; `sha256sum -c` 6 tệp OK — hash astro `e764a00a55e9ec47efa4568314d70b9cfc621a500311b5243f0f1e74c7c5f17d` khớp trước/sau (byte-đối-byte); chạy sạch lại exit 0 ĐẠT 13/13 (log `sach-sau-ca-b.log`) |
| Dọn dẹp | cây tạm xóa sau khi hoàn tất; 6 tệp log + `hash-truoc.txt` lưu `output/s1-mut-h09-vong-sua/` (nội bộ, không phát hành) |

Hash trước mutation (cây tạm): 5 JPG `922b35f4…`, `b8decf89…`, `b067961f…`, `2511d917…`, `65363036…`; `HistoryTimeline.astro` `e764a00a…` — sau hoàn nguyên khớp toàn bộ (`sha256sum -c hash-truoc.txt` OK từng tệp).

## 8. Đăng ký kế hoạch giai đoạn 3

Sửa `docs/CHI-MUC-KE-HOACH-HIEN-HANH.md` (không sửa nội dung `docs/KE-HOACH-HOP-NHAT-GIAI-DOAN-3-2026-09-25.md`):

- Mục 1: thêm dòng đầu bảng — Kế hoạch hợp nhất giai đoạn 3, vai trò kế hoạch điều phối hiện hành (30 gói S1–K4 trên 8 nhóm), trạng thái **Hiện hành**, căn cứ phán quyết anh Vinh ngày 25/09/2026 + danh mục DHC-GD3-20260925 v1.0.0.
- Mục 1: hai tệp bộ H01–H14 (Bộ giao việc 14 gói + Kế hoạch phát triển hợp nhất 19/09) chuyển trạng thái "Đã chốt sổ qua P0-E (25/09/2026) — chỉ còn giá trị truy vết"; vai trò và liên kết giữ nguyên (không xóa tài liệu, không hỏng liên kết lịch sử).
- Mục 1: câu khóa dưới bảng đổi "ngoài ba tệp trên" → "ngoài kế hoạch giai đoạn 3 và các tệp điều phối nêu trên".
- Mục 9 lịch sử cập nhật: thêm dòng 25/09/2026 ghi việc đăng ký và căn cứ.

## 9. Kết quả kiểm tổng

| Lệnh | Kết quả |
|---|---|
| `node scripts/scan-chars.mjs` | OK — quét 435 tệp, không ký tự ngoài tiếng Việt/Anh; exit 0 |
| `npm run check` | exit 0 — 225 dòng ĐẠT trong log; không dòng LỖI/KHÔNG ĐẠT (chạy lại ở vòng sửa 1: exit 0, 225 ĐẠT) |
| `npm run check:types` (vòng sửa 1) | exit 0 — 0 errors, 0 warnings, **1 hint** ts(6133) biến `k` tại `output/playwright/audit-2026-09-25.mjs:17` — tệp untracked nội bộ có trước vòng S1 (tạo 18:46 ngày 25/09, thư mục `output/playwright/`), ngoài phạm vi sửa → giữ nguyên, báo GPT Work |
| `npm run build` | exit 0 — 336 trang HTML, 25.371 link, "OK: Không phát hiện link nội bộ hỏng", sitemap 335 URL (`dist/sitemap-0.xml`); chạy lại ở vòng sửa 1: exit 0, các số đo như nhau, H09 ĐẠT 13/13, P0-D2 R5 dist ĐẠT |
| `node scripts/check-h09-timeline-zoom.mjs dist` (vòng sửa 1, chạy trực tiếp) | exit 0 — ĐẠT 13/13, H9-7 "5 JPG / 5 mục nhãn" |
| `git diff --check` | exit 0 — không lỗi whitespace |
| Chuỗi lỗi trong `src/` | "thanhläng", "Tech Gombessa** (2013)", "calibre 35111", "Calibre 32111" (iwc-mark-xi), "máy đo chronograph", "chronograph timing machine", "câu lỗi ngắt câu", "broken sentence", "Hai bài liên quan", "Two related articles" đều ×0 |
| `/tu-dien` sau đổi | tổng 45; chức năng 8; cao cấp 5 (nguồn + dist) |

## 10. Điểm cần GPT Work lưu ý khi đối chiếu tiêu chí

1. **Chuỗi "32111" còn ×2 trong `src/`** — `src/content/thuongHieu/vi/omega.md` dòng 84 và `jaeger-lecoultre.md` dòng 87, cùng cụm `movement: "Calibre 32111 (in-house, 120h), 69385 …"`. Đây là **calibre Omega** (bộ máy in-house của Omega, dữ kiện khác) tại hai tệp **không thuộc phạm vi tệp S1** — không sửa theo nguyên tắc "không sửa tệp ngoài phạm vi". Tương tự `year: 1861` còn ở `src/content/thuongHieu/vi/junghans.md` dòng 11 là **năm thành lập Junghans** (dữ kiện khác mốc Patek Seal). Tiêu chí nghiệm thu đọc theo nghĩa đen trên toàn `src/` sẽ thấy hai nhóm chuỗi này — GLM đối chiếu và giữ nguyên, chờ GPT Work xác nhận cách hiểu.
2. Hai tệp `junghans.md`/`nomos-glashuette.md` từng ghi "ngoài phạm vi còn chờ" ở G07 vẫn giữ nguyên hiện trạng (không thuộc S1).
3. `output/p0-c-ai-timeline-context/great-depression-1929-goc-duyet.png` dùng làm bản gốc cắt lại — tệp trong `output/` giữ nguyên, không phát hành.

## 11. Danh sách tệp thay đổi — đề nghị phát hành (27 sửa + 1 mới + 1 untracked được phép)

**27 tệp modified:**

1. `CAN-KIEM-CHUNG.md`
2. `docs/CHI-MUC-KE-HOACH-HIEN-HANH.md`
3. `public/images/timeline/great-depression-1929.jpg`
4. `scripts/check-h09-timeline-zoom.mjs`
5. `scripts/check-p0-d2-glossary-expansion.mjs`
6. `src/content/coChe/en/manufacture-etablisseur.md`
7. `src/content/coChe/vi/manufacture-etablisseur.md`
8. `src/content/mauIconic/vi/fifty-fathoms.md`
9. `src/content/mauIconic/vi/iwc-mark-xi.md`
10. `src/content/mauIconic/vi/reverso.md`
11. `src/content/thuongHieu/vi/patek-philippe.md`
12. `src/content/tuDien/en/amplitude.md`
13. `src/content/tuDien/en/annual-calendar.md`
14. `src/content/tuDien/en/column-wheel.md`
15. `src/content/tuDien/en/flyback.md`
16. `src/content/tuDien/en/jumping-hour.md`
17. `src/content/tuDien/en/rattrapante.md`
18. `src/content/tuDien/en/retrograde.md`
19. `src/content/tuDien/en/world-time.md`
20. `src/content/tuDien/vi/banh-xe-cot.md`
21. `src/content/tuDien/vi/bien-do.md`
22. `src/content/tuDien/vi/flyback.md`
23. `src/content/tuDien/vi/gio-nhay.md`
24. `src/content/tuDien/vi/gio-the-gioi.md`
25. `src/content/tuDien/vi/kim-hoi.md`
26. `src/content/tuDien/vi/lich-nam.md`
27. `src/content/tuDien/vi/rattrapante.md`

**Thêm khi phát hành:** biên bản S1 này (mới) + `docs/KE-HOACH-HOP-NHAT-GIAI-DOAN-3-2026-09-25.md` (untracked có trước, được phép phát hành cùng S1, nội dung không sửa). Không phát hành tệp nào dưới `output/`.

## 12. Trạng thái Git cuối

- Nhánh `main`; HEAD = `origin/main` = `3192133` (chưa tạo commit mới).
- `git status`: 27 modified, 0 staged; untracked gồm các mục có trước (gồm `output/`, hồ sơ cũ, tệp nháp gốc repo) + 2 mục mới của gói: biên bản S1 này và `output/s1-mut-h09-vong-sua/` (log mutation, nội bộ — không phát hành).
- Chưa stage, chưa commit, chưa push.
