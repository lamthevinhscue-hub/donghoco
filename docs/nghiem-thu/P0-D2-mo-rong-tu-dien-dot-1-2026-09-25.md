# BIÊN BẢN GÓI P0-D2 — VIẾT 12 MỤC TỪ ĐIỂN SONG NGỮ (ĐỢT 5, CHẶNG VIẾT)

**Mã gói:** P0-D2 — Đợt 5 kế hoạch sau H01–H14
**Ngày thực hiện:** 25/09/2026 (+0700)
**HEAD lúc bắt đầu:** `6d98f91` = `origin/main`, nhánh `main`; staged = 0; tracked sửa = 0; untracked có trước giữ nguyên (gồm hồ sơ P0-D1)
**Trạng thái:** vòng sửa 2 hoàn thành — **chờ GPT Work tái nghiệm thu**; chưa stage, chưa commit, chưa push, chưa deploy
**Căn cứ:** hướng Đợt 5 do GPT Work chốt sau P0-D1 — loại mục 2 (Lệch nhịp) và 15 (Lực không đổi); hoãn mục 9 (Pha trăng); duyệt nhóm mới "Độ chính xác và điều chỉnh" cho 4 mục; viết song ngữ 12 mục.

## 0. Vòng sửa 1 — bỏ định nghĩa chung vượt nguồn ở cặp "Điều chỉnh theo vị trí"

Bằng chứng GPT Work: hồ sơ P0-D1 xác nhận không nguồn nào định nghĩa khái niệm "adjustment in positions" như chuẩn chung, nhưng hai bài mới khẳng định "chỉnh bộ máy để chạy nhất quán theo các tư thế" (VI) / "adjusting a movement so it runs consistently across wearing positions" (EN) — vượt hai nguồn được phép.

Đã sửa đúng phạm vi:

- **Excerpt VI/EN:** bỏ câu định nghĩa chung; chỉ nói phạm vi bài (GS đo sáu vị trí có liệt kê; Patek precision-adjusted hai tuần không nêu số vị trí; hai công bố phạm vi riêng, không thiết lập chuẩn chung).
- **Mục mở đầu VI/EN:** thay mục "Ý niệm/The idea" bằng "Phạm vi của mục này/The scope of this entry" — ghi rõ hồ sơ P0-D1 xác nhận không có nguồn định nghĩa khái niệm; tiêu đề là tên gọi, không phải định nghĩa kỹ thuật đã được nguồn chứng minh. Tiêu đề, slug, route, references giữ nguyên.
- **Checker:** mục điều-chỉnh-theo-vi-tri cấm thêm (nguồn VI/EN **và dist**): "chỉnh bộ máy", "chạy nhất quán", "marche nhất quán", "runs consistently" — cả biến thể khẳng định tương đương. Không đổi rule mục khác, không đổi nhóm/category/route/schema/giao diện/package/ảnh.
- **Mutation ngoài cây** (`D:\donghoco-worktrees\p0d2-mutation`, đã dọn): chèn lại "…chỉnh bộ máy để chạy nhất quán theo các tư thế đặt…" vào bản sao VI → **exit 1 [R4]** đúng hai cụm bị cấm; khôi phục `cmp` = 0; chạy sạch trên repo **exit 0**.

Chạy lại: `check:types` 0/0/0; `check`, `build`, checker P0-D2, `git diff --check` đều exit 0; **336 trang HTML, sitemap 335 URL, 25.368 link 0 hỏng**; `/tu-dien/` 45 mục (nhóm mới 4, cao cấp 11). Không sửa 22 bài còn lại, không đổi nhóm/category/route/schema/giao diện/package/ảnh.

## 1. Phạm vi thực hiện

**24 tệp nội dung mới** — 12 mục × VI/EN, đúng danh sách được phép:

| Nhóm | Mục (slug VI ↔ slug EN) | Nguồn (hồ sơ P0-D1, tái kiểm 25/09) |
|---|---|---|
| Độ chính xác và điều chỉnh | bien-do ↔ amplitude | FHH `/amplitude` + Witschi ChronoMaster Auto |
| Độ chính xác và điều chỉnh | tinh-dang-thoi ↔ isochronism | FHH `/isochronism` + Ferdinand Berthoud |
| Độ chính xác và điều chỉnh | sai-so-vi-tri ↔ positional-error | COSC FAQ + Grand Seiko |
| Độ chính xác và điều chỉnh | dieu-chinh-theo-vi-tri ↔ adjustment-in-positions | Grand Seiko instructions + Patek PDF Caliber 240 |
| Phức tạp cao cấp | banh-xe-cot ↔ column-wheel | FHH + Omega calibre 9301 |
| Phức tạp cao cấp | flyback ↔ flyback | FHH flyback-chronograph + Frederique Constant |
| Phức tạp cao cấp | rattrapante ↔ rattrapante | FHH split-seconds + A. Lange & Söhne |
| Phức tạp cao cấp | lich-nam ↔ annual-calendar | Patek calendar-watches + FHH |
| Phức tạp cao cấp | gio-the-gioi ↔ world-time | FHH world-time + Patek glossary |
| Phức tạp cao cấp | gio-nhay ↔ jumping-hour | FHH + Patek glossary |
| Phức tạp cao cấp | kim-hoi ↔ retrograde | FHH + Patek glossary |
| Phức tạp cao cấp | phuong-trinh-thoi-gian ↔ equation-of-time | FHH + Patek glossary |

**Tái kiểm URL trước khi viết:** 24/24 URL nguồn còn truy cập trong ngày 25/09 (log `taikierm-fhh.txt`, `taikierm-hang.txt`: 23 curl 200 + Omega 000 qua curl nhưng WebFetch xác nhận 200 và trích khớp P0-D1). Không dùng nguồn bị ghi giới hạn; không đưa dữ kiện đã cảnh báo vào bài (xem mục 3).

**Tệp sửa (5):** `src/i18n/contentRoutes.ts` (+12 cặp trong khối tu-dien); `src/content.config.ts` (enum category tuDien + duy nhất giá trị `độ chính xác và điều chỉnh`); `src/i18n/ui.ts` (GLOSSARY_CATEGORY_ORDER +1 vị trí cuối, nhãn VI "Độ chính xác & điều chỉnh" / EN "Accuracy & regulation"); `package.json` (nối `node scripts/check-p0-d2-glossary-expansion.mjs dist` cuối chuỗi build); `src/data/glossary-terms.json` (sinh tự động bởi `generate-glossary-terms.mjs` khi build — +120 dòng cho 12 mục VI mới, được giữ theo phạm vi).

**Tệp mới khác (2):** `scripts/check-p0-d2-glossary-expansion.mjs`; biên bản này. Bằng chứng nội bộ `output/p0-d2-glossary-expansion/` không commit.

## 2. Nhóm mới "Độ chính xác và điều chỉnh"

Schema: thêm duy nhất giá trị vào enum category của collection `tuDien` (không default); giao diện: thêm cuối `GLOSSARY_CATEGORY_ORDER`, nhãn VI "Độ chính xác & điều chỉnh", EN "Accuracy & regulation". Không đổi thứ tự nhóm hiện có, không đổi 6 giá trị cũ.

## 3. Giới hạn nguồn đã áp dụng

- Mỗi bài ≥2 nguồn HTTPS đúng allowlist P0-D1 (checker R3); không dùng nguồn bị ghi giới hạn; tái kiểm trước khi viết.
- Mục Điều chỉnh theo vị trí: chỉ mô tả phép đo sáu vị trí công bố của Grand Seiko (có liệt kê từng vị trí) và việc Patek "precision-adjusted" hai tuần; **không** gọi là chuẩn ngành, **không** dùng công thức "adjusted in N positions".
- Đã loại các dữ kiện cảnh báo P0-D1: không trích dải số máy đo Witschi vào bài biên độ; không gộp số vị trí COSC(5)/GS(6) thành chuẩn chung; không nhắc ngày cực trị phương trình thời gian; không dịch máy câu FHH lỗi về annual calendar (dùng trục Patek); không trích câu FHH lỗi ở split-seconds; không dùng cụm "(true solar time)" của FHH world-time.
- Không so sánh chất lượng/độ chính xác/độ bền/giá trị/phân khúc; không khuyến nghị mua. Không sửa bài hiện hữu — chỉ liên kết cùng ngôn ngữ (VD bài chronograph, pha-trang, perpetual-calendar, hướng dẫn GMT).

## 4. Checker riêng (`check-p0-d2-glossary-expansion.mjs`, nối cuối build)

- **R1** đúng 24 tệp; ARTICLE_PAIRS đúng 12 cặp; tệp EN không trỏ route VI (markdown lẫn raw href).
- **R2** frontmatter + category đúng nhóm từng mục.
- **R3** ≥2 nguồn HTTPS đúng allowlist từng mục; cấm URL không-HTTPS + 2 URL 404 H14-A.
- **R4** cụm cấm chung (chất lượng/đầu tư/xếp hạng/khuyến nghị/tuyệt đối) + cụm cấm theo mục từ cảnh báo P0-D1 ("điều chỉnh ở 5/6 vị trí", "adjusted in 5/6 positions", "là chuẩn ngành", "chuẩn chung cho", "true solar time", "leap years, but not of leap years", câu FHH hỏng ở split-seconds, ngày cực trị EoT).
- **R5** dist: 24 route + trang `/tu-dien/` — tổng **45**, nhóm mới **4**, phức tạp cao cấp **11**; h1/canonical/hreflang vi+en/switcher hai chiều từng trang.

## 5. Kết quả kiểm (số đo thật)

| Kiểm | Kết quả |
|---|---|
| `npm run check:types` | 0 errors / 0 warnings / 0 hints, exit 0 |
| `npm run check` | exit 0 |
| `npm run build` (gồm checker P0-D2) | **exit 0** — checker in "ĐẠT — 12 tệp VI + 12 tệp EN × 12 cặp route; allowlist URL theo mục; cụm cấm P0-D1; R5 dist ĐẠT" |
| Số mục `/tu-dien/` | **45** (33 → 45, +12); nhóm mới **4**; phức tạp cao cấp **11** (3 → 11, +8) |
| Trang / sitemap / link | **336 trang HTML** (312 + 24); **sitemap 335 URL** (311 + 24); **25.369 link, 0 hỏng** |
| glossary-terms.json | sinh tự động +120 dòng (12 mục VI) — giữ theo phạm vi |
| `git diff --check` | exit 0 |
| Mutation ngoài cây (`D:\donghoco-worktrees\p0d2-mutation`, đã dọn; baseline ĐẠT) | M1 bỏ cặp route → **exit 1 [R1] "thiếu cặp route"**; M2 đổi category bien-do thành "bộ máy" → **exit 1 [R2]**; M3 URL HTTP thay Witschi → **exit 1 [R3] "URL không HTTPS" + "không thuộc allowlist"**; M4 chèn "đã điều chỉnh ở 6 vị trí theo chuẩn ngành" → **exit 1 [R4]**. Mỗi ca hoàn nguyên byte (`cmp` = 0); sạch cuối exit 0 |
| UTF-8/newline | 31 tệp gói ĐẠT (24 bài + routes + config + ui + checker + package + biên bản). `glossary-terms.json` thiếu newline cuối là hiện trạng có trước (HEAD cũng kết thúc bằng `]`) — tệp sinh tự động, không sửa ngoài phạm vi |

## 6. Tệp thay đổi — tóm tắt

- **Tạo (27):** 24 tệp nội dung (12 VI + 12 EN) + `scripts/check-p0-d2-glossary-expansion.mjs` + biên bản này; (bằng chứng `output/p0-d2-glossary-expansion/` không commit).
- **Sửa (5):** `contentRoutes.ts`, `content.config.ts`, `ui.ts`, `package.json`, `src/data/glossary-terms.json` (sinh tự động).

Không đụng: các mục Lệch nhịp/Pha trăng/Lực không đổi; bài hiện hữu; slug/route hiện hữu; CSS; template; ảnh; dependency; H12-B.

Dừng chờ GPT Work nghiệm thu. Chưa stage, chưa commit, chưa push, chưa deploy.
