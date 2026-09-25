# BIÊN BẢN GÓI S3 — GIẢI QUYẾT SÁU TIÊU ĐỀ TỪ ĐIỂN VÀ BA TIÊU ĐỀ BÀI CƠ CHẾ

**Ngày:** 26/09/2026
**Giao dịch:** TXN-20260926-178 — danh mục DHC-GD3-20260925 v1.0.0; **vòng sửa 1 (parser aliases đầy đủ): TXN-20260926-179, cùng ngày**
**Nền Git:** HEAD = `origin/main` = `0229a7a` (`0229a7a22578223893a15709223ec19af60849ce`), nhánh `main`, staged = 0, tracked sửa 0 khi bắt đầu
**Căn cứ:** quyết định Q2 (sáu tiêu đề từ điển "Việt trước, Anh sau" + bí danh tay) và Q3 (ba tiêu đề cơ chế) của anh Vinh; `docs/KE-HOACH-HOP-NHAT-GIAI-DOAN-3-2026-09-25.md` mục S3; prompt GPT Work S3 + vòng sửa 1
**Trạng thái:** đã làm xong vòng sửa 1, CHƯA stage, CHƯA commit, CHƯA push — chờ GPT Work tái nghiệm thu

> **Ghi chú vòng sửa 1 (TXN-20260926-179):** parser `aliases` trong `generate-glossary-terms.mjs` nhận thêm dạng YAML **block list** (`aliases:` + các dòng `- "…"`), song song với inline list hiện có; hai cách viết cùng danh sách sinh cùng mảng aliases. Giữ nguyên mọi quy tắc S3 (có alias tay hợp lệ → không tự thêm trước-ngoặc; giữ title đầy đủ + `term_en`; loại trùng). Trên repo chính, chạy generate với parser mới: hash `glossary-terms.json` **không đổi** (`45f4ef60…` — inline hiện tại của `movement.md` cho kết quả như trước). Mutation 3 ca trên cây tạm `D:\donghoco-worktrees\s3-mut-v1\` (đã dọn; log `output/s3-glossary-alias-title-audit/vong-sua-1/mutation.log`): block list → "Movement" có trong JSON; inline list → title + aliases tương đương; bỏ toàn bộ alias tay → mất "Movement", "Bộ máy" xuất hiện lại, phép kiểm fail exit 1; khôi phục `movement.md` cùng byte (`cee3cdcc…`) và chạy sạch. Sáu số đo autolink sau build lại: **17, 4, 6, 9, 6, 4** — không đổi; không alias Việt phổ biến độc lập.

---

## 1. Tệp thay đổi (12 sửa + biên bản)

| # | Tệp | Thay đổi |
|---|---|---|
| 1 | `src/content.config.ts` | thêm `aliases: z.array(z.string()).optional()` cho collection `tuDien` (kèm comment) |
| 2 | `scripts/generate-glossary-terms.mjs` | đọc `aliases` tay từ frontmatter (inline list, bỏ nháy, trim); mục **có** alias tay: gộp alias tay (≥3 ký tự) + KHÔNG tự thêm phần trước ngoặc của title mới; mục **không** alias tay: giữ nguyên cơ chế cũ (title + trước-ngoặc); cả hai vẫn thêm `term_en` (≥3 ký tự); Set loại trùng |
| 3–8 | `src/content/tuDien/vi/{movement,power-reserve,perpetual-calendar,minute-repeater,vph,cotes-de-geneve}.md` | đổi `title` sang "Việt trước, Anh sau" + thêm `aliases: ["…"]` đúng theo danh sách prompt (bảng ở mục 3) |
| 9 | `src/data/glossary-terms.json` | sinh lại khi build — chỉ 6 bản ghi liên quan đổi title/aliases; 39 bản ghi khác không đổi nội dung; vị trí trong mảng đổi do sắp xếp theo độ dài title (thay đổi thứ tự thuần túy của script hiện có) |
| 10–12 | `src/content/coChe/vi/{perpetual-calendar,chong-tu,bo-thoat-dong-truc}.md` | đổi `title` đúng từng ký tự theo danh sách Q3 |
| 13 | `docs/nghiem-thu/S3-giai-quyet-tieu-de-treo-2026-09-26.md` | biên bản này (mới) |

Không đổi: tệp từ điển tiếng Anh, tiêu đề tiếng Anh, slug, tên tệp, `custom_slug`, route, `contentRoutes.ts`, thân bài, excerpt, category, sources, sourceNotes, term_en, package/dependency, template, CSS, ảnh, cấu hình, checker khác.

Tiêu đề sáu mục từ điển (cũ → mới) và alias tay:

| Slug | Title cũ | Title mới | aliases |
|---|---|---|---|
| `movement` | Movement (Bộ máy) | Bộ máy (Movement) | `["Movement"]` |
| `power-reserve` | Power Reserve (Trữ cót) | Trữ cót (Power Reserve) | `["Power Reserve"]` |
| `perpetual-calendar` | Perpetual Calendar (Lịch vạn niên) | Lịch vạn niên (Perpetual Calendar) | `["Perpetual Calendar"]` |
| `minute-repeater` | Minute Repeater (Cơ chế điểm chuông) | Điểm chuông (Minute Repeater) | `["Minute Repeater"]` |
| `vph` | VPH (tần số dao động) | Tần số dao động (VPH) | `["VPH"]` |
| `cotes-de-geneve` | Côtes de Genève (Vân Genève) | Vân Genève (Côtes de Genève) | `["Côtes de Genève"]` |

## 2. Đo liên kết tự động trước/sau (bắt buộc)

**Phương pháp cố định, chạy lặp lại** — `output/s3-glossary-alias-title-audit/do-autolink.mjs`: quét toàn bộ `*.html` trong dist; với từng slug đếm **số trang HTML duy nhất** chứa ít nhất một thẻ `<a class="glossary-autolink" href="…/tu-dien/<slug>">` (href có thể đứng trước hoặc sau class), kèm tổng số thẻ. Tham số: thư mục dist + tệp JSON xuất.

- Build nền trên HEAD `0229a7a` trước khi sửa; lưu bản sao JSON nền `glossary-terms-nen.json` (sha256 `adc2ac51…`) và đo nền `do-nen.json`.
- Sau sửa: build lại và đo `do-sau.json` bằng đúng công cụ đó.

| Slug | Nền (trang) | Sau (trang) | Chênh | Thẻ nền | Thẻ sau | Chênh lệch ≤ 20 trang | Không mất toàn bộ | Kết luận |
|---|---:|---:|---:|---:|---:|---|---|---|
| movement | 17 | 17 | 0 | 17 | 17 | đạt | đạt | **ĐẠT** |
| power-reserve | 4 | 4 | 0 | 4 | 4 | đạt | đạt | **ĐẠT** |
| perpetual-calendar | 6 | 6 | 0 | 6 | 6 | đạt | đạt | **ĐẠT** |
| minute-repeater | 9 | 9 | 0 | 9 | 9 | đạt | đạt | **ĐẠT** |
| vph | 6 | 6 | 0 | 6 | 6 | đạt | đạt | **ĐẠT** |
| cotes-de-geneve | 4 | 4 | 0 | 4 | 4 | đạt | đạt | **ĐẠT** |

Sáu slug giữ nguyên 100% số trang và số thẻ — không slug nào vượt ngưỡng hay mất liên kết, nên không rơi vào nhánh hoàn nguyên của prompt.

## 3. Alias trong JSON sinh ra

Sáu bản ghi sau build (`src/data/glossary-terms.json`, 45 bản ghi):

| Slug | Aliases sau sinh | Alias EN cũ còn | Alias VI phổ biến độc lập |
|---|---|---|---|
| movement | `["Bộ máy (Movement)", "Movement", "Movement / Caliber"]` | có | không |
| power-reserve | `["Trữ cót (Power Reserve)", "Power Reserve", "Power Reserve / Réserve de marche"]` | có | không |
| perpetual-calendar | `["Lịch vạn niên (Perpetual Calendar)", "Perpetual Calendar", "Perpetual Calendar / QP"]` | có | không |
| minute-repeater | `["Điểm chuông (Minute Repeater)", "Minute Repeater"]` | có | không |
| vph | `["Tần số dao động (VPH)", "VPH", "Vibrations per hour / Beat rate"]` | có | không |
| cotes-de-geneve | `["Vân Genève (Côtes de Genève)", "Côtes de Genève", "Côtes de Genève / Geneva Stripes"]` | có | không |

Ghi chú: "Vân Genève" chỉ xuất hiện như một phần của title đầy đủ (alias bắt buộc), không có bí danh độc lập "Vân Genève" hay các cụm Việt phổ biến khác trong danh sách. Đối chiếu với JSON nền: ngoài sáu bản ghi trên, không bản ghi nào đổi nội dung (đối chiếu theo slug bằng script; vị trí mảng đổi do sort theo độ dài title — thay đổi thứ tự thuần túy).

## 4. H1 sau build trên chín trang VI

Sáu trang `/tu-dien/<slug>/` và ba trang `/co-che/{perpetual-calendar,chong-tu,bo-thoat-dong-truc}/` — H1 khớp **từng ký tự** tiêu đề mới: 9/9 ĐẠT.

## 5. Mutation ngoài cây repo — `D:\donghoco-worktrees\s3-mut\` (đã dọn)

Cây tạm chứa `scripts/generate-glossary-terms.mjs` + `src/content/tuDien/` + `src/data/glossary-terms.json`:

1. Chạy generate lần 1 — JSON khớp hiện trạng; ghi hash `hash-truoc.txt` (JSON `45f4ef60…`, movement.md `cee3cdcc…`).
2. Mutation: xóa dòng `aliases: ["Movement"]` khỏi `movement.md` trong cây tạm; chạy generate lại.
3. Kết quả: alias `"Movement"` biến mất khỏi bản ghi JSON (đồng thời `"Bộ máy"` xuất hiện lại do cơ chế cũ tự thêm phần trước ngoặc khi không còn alias tay — đúng hành vi mà alias tay ngăn chặn); **kiểm alias phát hiện mất alias tiếng Anh, thoát mã 1**.
4. Khôi phục `movement.md` từ repo (`sha256sum -c` OK), chạy generate lại — JSON khớp hash trước mutation; alias "Movement" trở lại → SẠCH.
5. Cây tạm xóa; bằng chứng `hash-truoc.txt` + `mutation.log` lưu `output/s3-glossary-alias-title-audit/vong-sua/` (nội bộ, không phát hành).

## 6. Kiểm bắt buộc

| Lệnh | Kết quả |
|---|---|
| `npm run check:types` | exit 0 — 0 lỗi, 0 cảnh báo, 1 hint cũ (`output/playwright/audit-2026-09-25.mjs:17`, ngoài phạm vi) |
| `npm run check` | exit 0 — 226 ca ĐẠT |
| `npm run build` | exit 0 — 336 trang, 25.371 link, 0 link nội bộ hỏng |
| `node scripts/scan-chars.mjs` | OK — 436 tệp |
| `git diff --check` | exit 0 |
| Sáu tiêu đề VI từ điển, ba tiêu đề cơ chế VI, sáu trường `aliases` | đúng từng ký tự theo prompt |
| Sáu tệp EN, slug, route, tên tệp, `contentRoutes.ts` | không đổi (`git status` không liệt kê) |
| `git diff src/data/glossary-terms.json` | chỉ sáu bản ghi liên quan (+ đổi chỗ do sort) |

## 7. Điểm chưa giải quyết

Không có.

## 8. Trạng thái Git cuối

- Nhánh `main`; HEAD = `origin/main` = `0229a7a` (chưa tạo commit mới).
- `git status`: 12 modified, 0 staged; untracked 103 (102 có trước + biên bản S3 này).
- Chưa stage, chưa commit, chưa push.
