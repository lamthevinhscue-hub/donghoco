# BIÊN BẢN GÓI P0-A — SỬA LỖI DANH MỤC TỪ ĐIỂN, DỮ LIỆU VÀ CHÂN TRANG

**Mã gói:** P0-A — Đợt 1 kế hoạch sau H01–H14, danh mục DHC-H14-20260919, giao dịch TXN-20260919-115
**Ngày thực hiện:** 24/09/2026 (+0700)
**HEAD lúc bắt đầu:** `3b0aabd` = `origin/main`, nhánh `main`; staged = 0; tracked sửa = 0; untracked có trước giữ nguyên toàn bộ
**Trạng thái:** hoàn thành — **chờ GPT Work nghiệm thu**; chưa stage (trừ rename `git mv` — xem mục 5), chưa commit, chưa push

## 1. Nguyên nhân gốc của lỗi 30/33 mục từ điển

Trang `/tu-dien` nhóm và lọc theo `GLOSSARY_CATEGORY_ORDER` (`src/i18n/ui.ts` — 6 giá trị: thiết kế, bộ máy, hoàn thiện, phức tạp chức năng, phức tạp cao cấp, chứng nhận) và bỏ nhóm rỗng. Ba cặp bài tourbillon / minute-repeater / perpetual-calendar (VI+EN) mang `category: "phức tạp"` — không thuộc nhóm nào trong 6 giá trị → rơi ra ngoài mọi nhóm → trang chỉ còn 30 mục. Schema `tuDien` khi đó là `z.string().default('chung')` nên không chặn được.

## 2. Phạm vi đã thực hiện

| # | Yêu cầu | Thực hiện |
|---|---|---|
| 1 | Đổi `category: "phức tạp"` → `"phức tạp cao cấp"` 6 tệp | Đúng 6 tệp, mỗi tệp đúng 1 thay thế (thay trước `1`); rà lại toàn thư mục: 57 tệp thuộc đúng 6 giá trị (25 bộ máy, 9 thiết kế, 8 hoàn thiện, 6 phức tạp cao cấp, 4 phức tạp chức năng, 5 chứng nhận). Không đụng tiêu đề, slug, nội dung. |
| 2 | Siết schema `tuDien` | `src/content.config.ts`: `category: z.string().default('chung')` → `z.enum([...sáu giá trị khớp GLOSSARY_CATEGORY_ORDER...])`, bỏ default; comment ghi rõ nguồn 6 giá trị và lý do chặn tái diễn. Không thêm nhóm mới. |
| 3 | `term_en` dấu | `vi/power-reserve.md` + `en/power-reserve.md`: `"Power Reserve / Reserve de marche"` → `"Power Reserve / Réserve de marche"` — mỗi tệp đúng 1 thay thế. |
| 4 | `git mv` tệp nội bộ | `public/images/HƯỚNG-DẪN-ẢNH.md` → `docs/huong-dan-anh-logo-cu.md`. Nội dung nguyên vẹn: blob hash sau mv `08b0a74a` = blob ở HEAD. `public/images/` không còn tệp `.md`. |
| 5 | RSS tối thiểu | `src/i18n/ui.ts` dòng `subscribe_desc` bản Việt → đúng nguyên văn: `Theo dõi bài mới qua nguồn cấp tin (RSS) bằng trình đọc RSS.`; `src/components/Footer.astro`: bỏ `<span aria-hidden="true">·</span>` + câu giải thích hard-code sau liên kết (cả VI lẫn EN). Bản EN giữ nguyên câu `subscribe_desc` ("Follow via RSS — open the feed…") — ý nghĩa không đổi. |
| 6 | Tệp sinh tự động | `npm run build` gọi `generate-glossary-terms.mjs` → `src/data/glossary-terms.json` tự đổi **đúng 1 dòng**: alias `"Power Reserve / Reserve de marche"` → `"…Réserve de marche"`. Được phép giữ theo mục 6 của giao việc. |
| 7 | Biên bản + bằng chứng | Tệp này + `output/p0-a-editorial-fixes/` (log build 2 lượt, log check, bản sao byte gốc dùng hoàn nguyên mutation). `output/` không vào commit. |

## 3. Điểm cần GPT Work xác nhận — ngoài bảy mục phạm vi

**Vòng build 1 KHÔNG ĐẠT:** `check-automatic-energy-cluster.mjs` R1 chặn `en/perpetual-calendar.md` — "category không hợp lệ: phức tạp cao cấp". Chín script cụm giữ danh sách `VALID_CATEGORIES` cứng cho category của tệp tuDien, chưa biết giá trị mới → mâu thuẫn giữa mục 1–2 (đổi dữ liệu + schema, bắt buộc) và tiêu chí bắt buộc "build sạch, npm run check/build đạt".

**Đã xử lý:** thêm đúng 1 giá trị `'phức tạp cao cấp'` vào đầu mỗi `VALID_CATEGORIES` trong 9 script (không xóa hay đổi giá trị nào — bài coChe vẫn hợp lệ mang `'phức tạp'`, các script quét cả hai loại tệp nên không được bỏ):

- `scripts/check-automatic-energy-cluster.mjs` (dòng 210)
- `scripts/check-chronograph-cluster.mjs` (dòng 154)
- `scripts/check-calendar-complications-cluster.mjs` (dòng 138)
- `scripts/check-daily-care-cluster.mjs` (dòng 194)
- `scripts/check-high-complications-cluster.mjs` (dòng 137)
- `scripts/check-movement-finishing-cluster.mjs` (dòng 139)
- `scripts/check-protection-cluster.mjs` (dòng 140)
- `scripts/check-precision-certification-cluster.mjs` (dòng 119)
- `scripts/check-regulating-cluster.mjs` (dòng 176)

Logic kiểm không đổi. Nếu GPT Work không chấp nhận cách xử lý này, hoàn nguyên 9 tệp là một bước (`git restore scripts/`) — nhưng khi đó build không thể đạt tiêu chí bắt buộc.

## 4. Kết quả kiểm tra bắt buộc (số đo thật)

| Kiểm | Cách | Kết quả |
|---|---|---|
| Thử có kiểm soát category sai | Đổi `vi/tourbillon.md` sang `category: "nhóm-sai-thử"`, `npm run check:types` | **THẤT BẠI đúng kỳ vọng** — exit 1, `[InvalidContentEntryDataError] tuDien → vi/tourbillon … expected one of "thiết kế"|"bộ máy"|"hoàn thiện"|"phức tạp chức năng"|"phức tạp cao cấp"|"chứng nhận"` |
| Hoàn nguyên đúng từng byte | Ghi lại từ bản sao byte (sha256 đối chiếu), chạy lại `npm run check:types` | Byte khớp 100%; **0 errors / 0 warnings / 0 hints, exit 0** |
| `/tu-dien` đủ 33 | `dist/tu-dien/index.html`: href `/tu-dien/*` duy nhất; bộ đếm nút | **33 href duy nhất; "Tất cả (33)"**; nhóm "Phức tạp — cao cấp (3)" — đủ tourbillon, minute-repeater, perpetual-calendar |
| Rà category toàn tuDien | grep + uniq toàn 57 tệp | 6 giá trị hợp lệ, 0 giá trị lạ (mục 2 bảng trên) |
| Build sạch | `npm run build` (chứa `npm run check` + sinh JSON + astro build + chuỗi script check) | **exit 0** (log: `output/p0-a-editorial-fixes/build-log-l2.txt`) |
| Đường cũ không còn trong dist | grep `HƯỚNG-DẪN-ẢNH` và bản URL-encode toàn `dist/` + `ls dist/images/HƯỚNG-DẪN-ẢNH.md` | 0 kết quả grep; tệp không tồn tại |
| Chân trang VI/EN | `dist/index.html` + `dist/en/index.html`: đếm câu mô tả RSS + link | Mỗi bản **1 câu mô tả + 1 link RSS** (`/rss.xml`, `/en/rss.xml` — cả hai tệp tồn tại trong dist; check-h08 trong build ĐẠT) |
| `npm run check` | chạy riêng, log `output/p0-a-editorial-fixes/check-log.txt` | **exit 0** |
| `git diff --check` | — | **exit 0** |
| UTF-8/BOM/newline 13 tệp chạm tới | python đọc byte | ĐẠT trừ 1 ghi nhận: `glossary-terms.json` **thiếu newline cuối là hiện trạng có trước** (HEAD cũng kết thúc bằng `]`) — tệp sinh tự động, không sửa ngoài phạm vi |

## 5. Ghi nhận về trạng thái stage

`git mv` (được giao nguyên văn ở mục 4) mặc định ghi rename vào index: hiện staged duy nhất là cặp rename `public/images/HƯỚNG-DẪN-ẢNH.md → docs/huong-dan-anh-logo-cu.md`. Ngoài mục này staged = 0, không tệp nào khác được stage. Nếu GPT Work yêu cầu trạng thái index hoàn toàn sạch, có thể `git restore --staged` cả hai đường — khi đó rename thành (xóa unstaged + tệp mới untracked) và cần `git add` lại hai đường lúc phát hành.

## 6. Tệp thay đổi

**Tracked sửa (21 M):** `src/content.config.ts`; 6 tệp category (tourbillon / minute-repeater / perpetual-calendar × vi/en); 2 tệp `power-reserve` (vi/en); `src/i18n/ui.ts`; `src/components/Footer.astro`; `src/data/glossary-terms.json` (sinh tự động, 1 dòng); 9 script cụm (mục 3).

**Staged rename (hành vi `git mv`):** `public/images/HƯỚNG-DẪN-ẢNH.md` → `docs/huong-dan-anh-logo-cu.md` (nội dung nguyên vẹn).

**Untracked mới:** tệp biên bản này + `output/p0-a-editorial-fixes/`.

Không tệp nào khác dưới `src/`, `public/`, `package.json`, cấu hình, template, CSS thay đổi. Không mở H14-B, H15 hay gói nội dung mới.

Dừng chờ GPT Work nghiệm thu. Không commit, không push.
