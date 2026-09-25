# BIÊN BẢN GÓI N3 — VIẾT LẠI 30 TỆP THEO KHỐI GHI CHÚ NGUỒN

**Ngày:** 26/09/2026
**Giao dịch:** TXN-20260926-190 — danh mục DHC-GD3-20260925 v1.0.0; **vòng sửa phạm vi frontmatter: TXN-20260926-193; vòng sửa nội dung vượt nguồn: TXN-20260926-195; vòng sửa hẹp cuối: TXN-20260926-197**
**Nền Git:** HEAD = `origin/main` = `fb64aa9` (`fb64aa934f66aaabe4d4f839754cfe2000de95f9`), nhánh `main`, staged = 0, tracked sửa 0 khi bắt đầu
**Căn cứ:** `docs/KE-HOACH-HOP-NHAT-GIAI-DOAN-3-2026-09-25.md` mục N1, N2, N3; prompt GPT Work N3 + hai vòng sửa
**Trạng thái:** đã làm xong vòng sửa nội dung, CHƯA stage, CHƯA commit, CHƯA push — chờ GPT Work tái nghiệm thu

> **Ghi chú vòng sửa phạm vi frontmatter (TXN-20260926-193):** khôi phục nguyên văn **11 nhãn `sources.label`** trong 9 tệp EN (đã bị đổi sang tiếng Việt khi viết lại) về đúng bản HEAD — block `sources` của cả 30 tệp nay khớp nguyên văn HEAD (đối chiếu tự động: 0 tệp lệch). Đối chiếu toàn bộ frontmatter 30 tệp (loại sourceNotes và 12 title VI đã duyệt): **không còn thay đổi frontmatter nào khác so với HEAD**; URL/liên kết: không có liên kết mới (các liên kết nội bộ EN đã chuyển từ route VI sang cặp EN tương ứng ở vòng đầu — thuộc phần thân bài hợp lệ của N3; URL nguồn trong `sources` không đổi). Không sửa `glossary-terms.json` trong vòng này.

> **Ghi chú vòng sửa nội dung vượt nguồn (TXN-20260926-195):** thu hẹp/bỏ các câu viết mới có nhận định ngoài nguồn:
> - `manufacture-etablisseur` VI+EN: bỏ "ở những dòng bình dân hơn" / "at the more accessible end of the market" — mở bài chỉ nêu hai thuật ngữ và vai trò theo FHH.
> - `bien-do`/`amplitude`: bỏ toàn bộ mục hướng dẫn diễn giải (đo cùng máy/cùng mức lên dây, người có bộ máy trong tay) — giới hạn nguồn đã nằm trong `sourceNotes`; bổ sung một câu trung tính mô tả Witschi để giữ ngưỡng 150 từ bản EN.
> - `tinh-dang-thoi`/`isochronism`: bỏ "người sưu tầm cũ gọi hiện tượng này" / "old collectors gave this problem a name".
> - `gio-nhay`/`jumping-hour`: bỏ "trên hầu hết đồng hồ… không thể nói chính xác" / "On most watches… cannot say exactly".
> - `sai-so-vi-tri`/`positional-error`: bỏ kết luận chẩn đoán "Không phải đồng hồ hỏng" / "Nothing is broken".
> - `rattrapante` VI+EN: bỏ câu suy "Câu hỏi ấy chính là lý do tồn tại…" / "That question is why the rattrapante exists".
> - `gio-the-gioi`/`world-time`: bỏ "sinh ra cho đúng tình huống đó" / "built for exactly that situation".
> - `kim-hoi`/`retrograde`: bỏ "quen thuộc đến mức chẳng ai thắc mắc" và mệnh đề công dụng "mở rộng không gian mặt số…" / "opening dial space…".
> - `eta-sellita` VI+EN: thu hẹp "hai cái tên hay bị đặt cạnh nhau" / "two names often get put side by side" thành câu trình bày trung tính.
> Bảng số từ mục 2 đã đo lại sau vòng sửa này.

> **Ghi chú vòng sửa hẹp cuối (TXN-20260926-197):** đúng ba thay đổi, nguyên văn theo prompt:
> 1. `bien-do.md` VI — ghi chú nguồn thay bằng: "Các yếu tố làm biên độ thay đổi không nằm trong nội dung hai nguồn trích — bài không nêu quan hệ nhân quả."
> 2. `amplitude.md` EN — ghi chú nguồn thay bằng: "The two quoted sources do not describe factors that change amplitude — the article does not state causal relationships."
> 3. `annual-calendar.md` EN — nhãn liên kết "The top tier of mechanical calendars" đổi thành "A related calendar complication" (URL đích `/en/glossary/perpetual-calendar/` giữ nguyên).
> Quét toàn bộ 30 bài: không còn "Biên độ thay đổi theo trữ cót", "Amplitude varies with power reserve", "The top tier of mechanical calendars". Block `sources` 30 bài khớp nguyên văn HEAD; không URL/liên kết mới.

---

## 1. Tệp thay đổi (32 tệp)

**30 tệp nội dung** — 15 cặp (3 cặp cơ chế + 12 cặp từ điển), đúng danh sách prompt:

- Cơ chế: `coChe/{vi/en}/manufacture-etablisseur.md`, `coChe/vi/ebauche-chuoi-cung-ung.md` + `coChe/en/ebauche-supply-chain.md`, `coChe/{vi/en}/eta-sellita.md`.
- Từ điển: `bien-do/amplitude`, `tinh-dang-thoi/isochronism`, `sai-so-vi-tri/positional-error`, `dieu-chinh-theo-vi-tri/adjustment-in-positions`, `banh-xe-cot/column-wheel`, `flyback/flyback`, `rattrapante/rattrapante`, `lich-nam/annual-calendar`, `gio-the-gioi/world-time`, `gio-nhay/jumping-hour`, `kim-hoi/retrograde`, `phuong-trinh-thoi-gian/equation-of-time`.

**2 tệp hỗ trợ:**

- `scripts/check-n2-editorial-voice.mjs` — bổ sung chính xác 30 đường dẫn vào `DANH_SACH_N3` (không đổi logic R1–R4).
- `src/data/glossary-terms.json` — giữ thay đổi sinh tự động khi 12 title từ điển VI đổi kiểu viết hoa phần tiếng Anh (chỉ title của 12 bản ghi này thay đổi; term_en giữ nguyên).

Biên bản: `docs/nghiem-thu/N3-viet-lai-30-tep-theo-ghi-chu-nguon-2026-09-26.md`. Bằng chứng nội bộ `output/n3-source-notes-rewrite-audit/` — không đưa vào commit.

## 2. Bảng số từ 15 cặp — trước/sau (phương pháp đếm N2)

Đo bằng chính hàm đếm từ của checker N2 (bỏ frontmatter, comment, URL, dấu Markdown); "trước" lấy từ `git show HEAD:<tệp>`.

| Cặp | VI trước | VI sau | EN trước | EN sau | EN ≤ VI×1,25? |
|---|---:|---:|---:|---:|---|
| manufacture-etablisseur | 563 | 395 | 438 | 301 | ĐẠT (301/494) |
| ebauche-chuoi-cung-ung | 602 | 373 | 454 | 286 | ĐẠT (286/467) |
| eta-sellita | 598 | 362 | 485 | 291 | ĐẠT (291/453) |
| bien-do | 237 | 171 | 188 | 166 | ĐẠT (166/214) |
| tinh-dang-thoi | 348 | 217 | 255 | 161 | ĐẠT (161/272) |
| sai-so-vi-tri | 289 | 226 | 220 | 173 | ĐẠT (173/283) |
| dieu-chinh-theo-vi-tri | 405 | 300 | 324 | 235 | ĐẠT (235/375) |
| banh-xe-cot | 228 | 189 | 185 | 150 | ĐẠT (150/237) |
| flyback | 306 | 255 | 255 | 199 | ĐẠT (199/319) |
| rattrapante | 286 | 254 | 239 | 198 | ĐẠT (198/318) |
| lich-nam | 299 | 254 | 264 | 220 | ĐẠT (220/318) |
| gio-the-gioi | 340 | 283 | 300 | 183 | ĐẠT (183/354) |
| gio-nhay | 267 | 198 | 247 | 185 | ĐẠT (185/248) |
| kim-hoi | 290 | 210 | 270 | 212 | ĐẠT (212/263) |
| phuong-trinh-thoi-gian | 312 | 256 | 284 | 237 | ĐẠT (237/320) |

Tất cả cặp thỏa EN ≤ VI×1,25; mười hai mục từ điển VI đều ≥ 150 từ (thấp nhất 189 từ). **Cả 15 cặp đều có `sourceNotes`.** Bài ETA và Sellita viết ngắn lại (598→386 từ) vì nguồn hiện có chỉ đủ nội dung ngắn — không dày giả tạo.

## 3. Giới hạn chuyển vào `sourceNotes` theo từng cặp

| Cặp | Giới hạn chuyển vào `sourceNotes` |
|---|---|
| manufacture-etablisseur | (1) nguồn không đưa thước đo/so sánh chất lượng (có từ N1); (2) FHH chỉ nêu mức độ tự chủ — không suy phần trăm linh kiện tự làm; (3) định nghĩa établisseur không nêu thêm công đoạn ngoài mua ébauches và lắp ráp |
| ebauche-chuoi-cung-ung | (1) FHH nêu 4 bộ phận luôn thiếu + chân kính tùy mẫu; ngoài ra không liệt kê gì — không suy mức hoàn thiện/danh sách khác; (2) không thước đo/so sánh chất lượng |
| eta-sellita | (1) trang ETA không nêu chi tiết pháp lý Ebauches SA; không dùng ETA định nghĩa ébauche; (2) trang Sellita không mô tả vai trò công ty — không suy vai trò/quan hệ; (3) không so sánh chất lượng |
| bien-do / amplitude | (1) không có khoảng tham chiếu "chuẩn" cho mọi đồng hồ; (2) biên độ thay đổi theo trữ cót/vị trí — quan hệ nhân quả ngoài nguồn trích |
| tinh-dang-thoi / isochronism | (1) FHH không gắn đẳng thời với ngưỡng chứng nhận nào (COSC FAQ không nhắc); (2) lực không đổi ↔ đẳng thời là mô tả của Berthoud cho một cơ cấu cụ thể |
| sai-so-vi-tri / positional-error | Số vị trí thuộc từng tiêu chuẩn (COSC 5 vị trí/3 nhiệt; GS 6 vị trí) — không gộp "chuẩn chung", không quy đổi |
| dieu-chinh-theo-vi-tri / adjustment-in-positions | (1) không có nguồn chính thức định nghĩa khái niệm — tiêu đề là tên gọi; (2) hai công bố riêng (GS sáu vị trí liệt kê; Patek precision-adjusted hai tuần không nêu số vị trí) — không ghép chuẩn chung |
| banh-xe-cot / column-wheel | (1) FHH không nói lịch sử/xuất xứ/hãng dùng; (2) lựa chọn cơ cấu là công bố sản phẩm của từng hãng |
| flyback / flyback | (1) không có thông số kỹ thuật model trong nguồn; (2) trang Longines Spirit Flyback không có câu định nghĩa — không dùng |
| rattrapante / rattrapante | Nguồn không nói từ nguyên "rattrapante" hay mức phổ biến/giá thành |
| lich-nam / annual-calendar | (1) cơ cấu bánh răng trí nhớ năm không trong nguồn — không mô tả; (2) "invented and patented" là khẳng định của chính hãng |
| gio-the-gioi / world-time | (1) cơ chế bên trong (đĩa thành phố, vành răng) ngoài nguồn — không mô tả; (2) lịch sử từng hãng/dòng ngoài hai nguồn |
| gio-nhay / jumping-hour | (1) cơ cấu đẩy nhảy chi tiết ngoài nguồn — không mô tả; (2) mô tả "jumping numerals" của Lange là mô tả sản phẩm hãng, không phải định nghĩa chung |
| kim-hoi / retrograde | (1) không khẳng định biến thể nào ngoài các loại kim FHH nêu; (2) cơ cấu cú hồi ngoài nguồn trích — không mô tả |
| phuong-trinh-thoi-gian / equation-of-time | (1) cách hiển thị ngoài nguồn trích — không mô tả; (2) các ngày cực trị chưa xác minh — không nêu |

Ngoài ra: mọi mục "Giới hạn đọc hiểu"/"Reading limits" và phần "Tóm tắt"/"In short" lặp gần nguyên văn thân bài đã bị bỏ; các đoạn trả lời người đọc mới **chỉ dùng dữ kiện đã có trong bài cũ** (trích FHH/Patek/ETA/COSC/GS/Witschi/Frederique Constant/Lange giữ nguyên văn kèm quy chiếu "theo nguồn"/"theo hãng" như cũ).

## 4. Mười hai title từ điển VI — kiểu viết hoa tiêu đề

`Biên độ (Amplitude)` · `Tính đẳng thời (Isochronism)` · `Sai số vị trí (Positional Error)` · `Điều chỉnh theo vị trí (Adjustment in Positions)` · `Bánh xe cột (Column Wheel)` · `Bấm giờ quay về không tức thì (Flyback)` · `Bấm giờ tách giây (Rattrapante)` · `Lịch năm (Annual Calendar)` · `Giờ thế giới (World Time)` · `Giờ nhảy (Jumping Hour)` · `Kim hồi (Retrograde)` · `Phương trình thời gian (Equation of Time)` — đúng từng ký tự theo prompt.

## 5. Mutation N2 ngoài cây repo — `D:\donghoco-worktrees\n3-mut\` (đã dọn)

Cây tạm: checker N2 + `contentRoutes.ts` + toàn bộ `src/content/`. Baseline: **exit 0 — ĐẠT**. Hai ca:

1. Thêm heading `## Giới hạn đọc hiểu` vào `tuDien/vi/bien-do.md` (bản sao) → **exit 1 — `[R1] heading "Giới hạn đọc hiểu"`**.
2. Thêm câu chứa cụm cấm vào `tuDien/en/retrograde.md` ("this article does not…") → **exit 1 — `[R2] cụm cấm "this article does not" ×1`**.

Khôi phục: chép lại 2 tệp từ repo — sha256 `bien-do.md` `71c21c6b…`, `retrograde.md` `3602bc04…` khớp từng byte với bản repo; chạy lại checker → exit 0. Cây tạm xóa; log `baseline.log`, `mutation.log`, `sach.log` lưu `output/n3-source-notes-rewrite-audit/vong-mutation/`.

## 6. Kiểm bắt buộc

| Kiểm | Kết quả |
|---|---|
| `DANH_SACH_N3` chứa đúng 30 đường dẫn | đạt (30 mục, không thiếu/dư) |
| 30 tệp: không heading `Giới hạn`/`Limits`; không cụm cấm N2 trong thân; `sourceNotes` được phép chứa giới hạn | đạt — checker N2 exit 0 trên 30 tệp phạm vi |
| `sourceNotes` không thêm nhận định mới | đạt — mọi ghi chú chuyển từ giới hạn đã có trong bài cũ (mục 3) |
| 12 mục từ điển VI ≥ 150 từ; EN ≤ VI×1,25 | đạt — bảng mục 2 |
| Build: mỗi trang N3 đúng 1 khối `details.source-notes`, ngay trước SourceList, đóng mặc định; trang ngoài N3 không có khối | đạt — `output/n3-source-notes-rewrite-audit/kiem-dist.mjs` exit 0 trên 30 trang + 3 trang đối chứng (`co-che/chronograph`, `tu-dien/chronometer`, `mau-iconic/royal-oak`) |
| Nội dung `sourceNotes` trong HTML và Pagefind | đạt — HTML chứa nguyên văn; Pagefind tra cụm "không đưa ra thước đo hay so sánh…" trả về manufacture-etablisseur + ebauche với sourceNotes trong index (`pagefind.log`) |
| Ba cặp cơ chế + 12 cặp từ điển: H1 ×1, canonical, hreflang vi/en, switcher hai chiều | đạt — cùng script kiểm-dist |
| `npm run check:types` | exit 0 — 0 lỗi/0 cảnh báo, 1 hint cũ (output/playwright, ngoài phạm vi) |
| `npm run check` | exit 0 — 226 ca ĐẠT |
| `npm run build` | exit 0 — 336 trang, 25.024 link, 0 link nội bộ hỏng |
| `node scripts/check-n2-editorial-voice.mjs` | exit 0 — ĐẠT trên 30 tệp phạm vi |
| checker P0-D2 | exit 0 — ĐẠT, R5 dist ĐẠT |
| `node scripts/scan-chars.mjs` | OK — 436 tệp |
| `git diff --check` | exit 0 |
| Rà `git status` | 32 tệp modified đúng phạm vi (mục 1); không tệp nào ngoài danh sách |

## 7. Điểm chưa giải quyết

Không có. Ghi chú minh bạch: (1) số link dist giảm 25.371 → 25.024 do phần tóm tắt lặp và mục giới hạn bị rút gọn theo yêu cầu viết lại — kiểm link nội bộ hỏng: 0; (2) hai bài cơ chế manufacture-etablisseur VI giữ `sourceNotes` từ N1 và bổ sung thêm hai ghi chú giới hạn còn lại của bài.

## 8. Trạng thái Git cuối

- Nhánh `main`; HEAD = `origin/main` = `fb64aa9` (chưa tạo commit mới).
- `git status`: 32 modified, 0 staged; untracked 104 (103 có trước + `output/n3-source-notes-rewrite-audit/`).
- Chưa stage, chưa commit, chưa push.
