# BIÊN BẢN GÓI H14-B — CỤM NGHỀ CHẾ TÁC VÀ CHUỖI SẢN XUẤT (BA BÀI SONG NGỮ)

**Mã gói:** H14-B — Đợt 3 kế hoạch sau H01–H14, danh mục DHC-H14-20260919 (hướng H1 đã được anh Vinh duyệt từ H14-A)
**Ngày thực hiện:** 25/09/2026 (+0700)
**HEAD lúc bắt đầu:** `327c7c1` = `origin/main`, nhánh `main`; staged = 0; tracked sửa = 0; untracked có trước giữ nguyên (gồm hồ sơ H14-A, bằng chứng P0-A/P0-B)
**Trạng thái:** vòng sửa 2 hoàn thành — **chờ GPT Work tái nghiệm thu**; chưa stage, chưa commit, chưa push, chưa deploy

## 0b. Vòng sửa 2 — ba sửa đúng điểm theo phán quyết tái nghiệm

1. **Checker:** xóa khai báo không dùng `ROUTE_VI_CAM` (`scripts/check-h14-production-chain.mjs`) — nguồn gốc 1 hint của `npm run check:types`; không đổi logic kiểm khác.
2. **Nhãn liên kết cặp Manufacture/établisseur:** VI "Hai tên bộ máy gặp nhiều trong thông số" → **"Hai bài liên quan"**; EN "Two movement names in specifications" → **"Two related articles"**. Đích liên kết giữ nguyên; không thêm nhận định mới về mức độ phổ biến của ETA/Sellita.
3. **Biên bản:** sửa câu mục 1 trước đây ghi sai rằng bài EN Manufacture còn "mục in-house tự chứa luận điểm" — thực tế mục in-house đã bị xóa từ vòng sửa 1; rà lại toàn bộ biên bản, không còn mô tả trái với nội dung sáu bài hiện tại.

## 0. Vòng sửa 1 — thu hẹp claim theo nguồn (theo phán quyết GPT Work)

GPT Work phán H14-B **chưa đạt nghiệm thu nội dung**: một số diễn giải vượt phạm vi nguồn — khẳng định chung về cách ngành dùng thuật ngữ, suy diễn từ lịch sử ETA rằng nghề đã "tập trung thành xưởng", nhận định về "in-house"/chất lượng không có nguồn trực tiếp. Vòng sửa này là **thu hẹp claim theo nguồn, không bổ sung dữ kiện mới**.

Đã sửa trong cả 6 bài (VI lẫn EN, mức dè dặt giữ tương đương):

1. **Cặp Manufacture/établisseur:** bỏ "mỗi hãng dùng từ khác nhau trong thực tế"; bỏ nhận định "vai trò không nói lên độ chính xác/độ bền… như bài in-house đã phân tích"; bỏ mở bài "thường được trả lời bằng một chữ duy nhất"; bỏ "Đây là khâu đầu của chuỗi cung ứng". Giới hạn duy nhất được phép: "Các nguồn này không đưa ra thước đo hay so sánh về chất lượng sản phẩm." ("These sources provide no measure or comparison of product quality.")
2. **EN Manufacture:** bỏ toàn bộ mục "Where "in-house" fits" và mọi mô tả/đánh giá in-house; không dẫn người đọc EN sang bài chỉ có tiếng Việt.
3. **Cặp Ébauche:** bỏ cách diễn đạt "xuất hiện ở hai nghĩa trong thông số/sách"; trình bày đúng định nghĩa hiện đại, blanc roulant, giới hạn pre-1850 theo FHH.
4. **Cặp Ébauche (đoạn ETA):** thay "nghề này tập trung thành xưởng từ sớm" bằng mệnh đề hẹp: trang lịch sử ETA **ghi nhận** xưởng và cửa hàng ébauches đầu tiên của nhóm tại Fontainemelon năm 1793 (trích nguyên văn + dịch); các mốc sau do cùng trang đó kể — không suy rộng ra toàn ngành.
5. **Cặp ETA/Sellita:** bỏ mở bài "gặp tên bộ máy là việc thường trong thông số"; bỏ mọi diễn giải in-house/chất lượng/độ chính xác/độ bền; giới hạn duy nhất được phép: "Các nguồn đã dùng không cho phép so sánh chất lượng hay suy ra vai trò doanh nghiệp ngoài dữ kiện được nêu." (bản EN tương đương).
6. **Bảo toàn dữ kiện có nguồn trực tiếp** (không thay đổi): FHH Manufacture (định nghĩa + phân biệt finishing shops/établisseurs); FHH Établisseur (mua ébauche + linh kiện để lắp ráp); FHH Ébauche (unfinished movement; hiện đại thiếu regulating organ, mainspring, dial, hands; blanc roulant; pre-1850); ETA (Fontainemelon 1793, Ebauches SA, 1985, Swatch Group); Sellita (địa chỉ, SW200-1, SW200-2 Power+, 65 giờ).

Checker siết kèm vòng sửa:

- **R3 — allowlist URL theo từng bài:** manufacture chỉ 2 URL FHH (Manufacture, Etablisseur); ébauche 3 URL (FHH Ebauche, Etablisseur, eta.ch); ETA/Sellita 2 URL (eta.ch, sellita.ch). Mỗi URL chuẩn phải có mặt; **URL HTTPS lạ cũng fail** ("URL không thuộc allowlist của bài"); giữ cấm không-HTTPS + 2 URL 404.
- **R1:** tệp nguồn EN cấm liên kết nội dung trỏ route VI kể cả dạng raw `href="/co-che/…"`/đường dẫn trong dấu nháy (regex), không chỉ markdown `](…)`. R1 chỉ áp dụng cho nội dung nguồn EN — không áp dụng cho liên kết chuyển ngôn ngữ ở header do layout sinh trong dist.
- **R6:** thêm kiểm liên kết chuyển ngôn ngữ đúng cặp route hai chiều (trang VI chứa `href` tới EN path của cặp, trang EN tới VI path) — trên đủ 6 trang dist.

Mutation bắt buộc của vòng sửa (cây ngoài repo `D:\donghoco-worktrees\h14b-mutation`, đã dọn; log `output/h14-b-production-chain/sua-*.log`): M1 bỏ cặp route → **exit 1 [R1] "thiếu cặp route"**; M2 chèn "tốt hơn" → **exit 1 [R4]**; M3 chèn raw href EN về route VI → **exit 1 [R1] "href/đường dẫn raw EN trỏ route VI"**; M4 chèn `https://example.com/sellita-gia-lap` → **exit 1 [R3] "URL không thuộc allowlist của bài" + "thiếu nguồn chuẩn"**. Mỗi ca hoàn nguyên byte (`cmp` = 0); chạy sạch cuối exit 0.

## 1. Phạm vi thực hiện

Ba bài song ngữ theo đúng route được phép (không tạo bài thứ tư "Giới hạn của in-house", không tạo hub, không tạo bản EN cho bài in-house hiện có, không sửa bài hiện có):

| Bài | Tệp VI (route) | Tệp EN (route) |
|---|---|---|
| 1. Manufacture và établisseur | `src/content/coChe/vi/manufacture-etablisseur.md` (`/co-che/manufacture-etablisseur/`) | `src/content/coChe/en/manufacture-etablisseur.md` (`/en/mechanisms/manufacture-etablisseur/`) |
| 2. Ébauche và chuỗi cung ứng | `src/content/coChe/vi/ebauche-chuoi-cung-ung.md` (`/co-che/ebauche-chuoi-cung-ung/`) | `src/content/coChe/en/ebauche-supply-chain.md` (`/en/mechanisms/ebauche-supply-chain/`) |
| 3. ETA và Sellita | `src/content/coChe/vi/eta-sellita.md` (`/co-che/eta-sellita/`) | `src/content/coChe/en/eta-sellita.md` (`/en/mechanisms/eta-sellita/`) |

Frontmatter chung: `category: "nền tảng"`, `difficulty: "thấp"`, `date: "2026-09-25"`, `draft: false`, không infographic/interactive, mỗi bài ≥2 `sources` HTTPS. Liên kết chéo cùng ngôn ngữ đủ 2 chiều mỗi bài (checker R2 bắt buộc); bài VI 1 dẫn thêm bài `bo-may-in-house` hiện có (được phép); không sửa bài in-house. Bài EN không có mục in-house (đã bị xóa từ vòng sửa 1) và không có liên kết nội dung trong thân bài trỏ route VI (checker R1 chặn, kể cả raw `href`; riêng liên kết chuyển ngôn ngữ ở header trỏ đúng route VI của từng cặp theo R6).

## 2. Tái kiểm nguồn ngày 25/09/2026

Cả 5 nguồn chính thức tái kiểm trong ngày, còn truy cập, chứng minh trực tiếp mọi claim dùng — chi tiết trích nguyên văn + claim được phép + giới hạn từng nguồn: `output/h14-b-production-chain/ho-so-nguon.md`. So với hồ sơ H14-A có hai chi tiết bổ sung từ cùng nguồn, đã dùng có kiểm soát: FHH Ebauche câu "It was known as a blanc and was finished at the établissage" (phân biệt blanc/blanc roulant); eta.ch nêu "quatre maîtres-horlogers" mở xưởng 1793 (dịch có ghi gốc). Hai URL 404/chưa truy cập của H14-A không dùng (R3 chặn, rà 0 lần xuất hiện). Không phát hiện nguồn nào không còn chứng minh trực tiếp claim dự kiến — không cần dừng theo điều kiện giao việc.

## 3. Checker H14-B (`scripts/check-h14-production-chain.mjs`)

Cách chạy: `node scripts/check-h14-production-chain.mjs [dist]`; root cây đặt qua biến môi trường `H14B_ROOT` (mặc định cwd — mutation ngoài cây repo). Đã nối cuối chuỗi `npm run build` trong `package.json` (mục 4 phạm vi được phép).

- **R1** đúng 6 tệp; ARTICLE_PAIRS chứa đúng 3 cặp; tệp nguồn EN không có liên kết nội dung trỏ route VI (`](/co-che/`, `](/tu-dien/`… — R1 không áp dụng cho liên kết chuyển ngôn ngữ ở header do layout sinh trong dist; liên kết đó thuộc R6).
- **R2** frontmatter bắt buộc (title, excerpt, category/difficulty theo enum, date, draft:false, ≥2 sources); liên kết chéo bắt buộc cùng ngôn ngữ; title VI ≠ title EN.
- **R3** ≥2 URL nguồn HTTPS mỗi bài; cấm URL không-HTTPS; cấm 2 URL 404/chưa phép (`eta.ch/en/`, `swatchgroup.com`).
- **R4** chặn claim cấm: tốt hơn/kém hơn/chất lượng cao(thấp)/bền hơn/chính xác hơn/đầu tư/giữ giá/xếp hạng/khuyến nghị/đáng mua/nên mua/mọi hãng/tất cả các hãng/hoàn toàn + bản EN tương đương. Câu quote nguồn "always without…" không nằm trong danh sách (claim có nguồn).
- **R5** chặn định nghĩa ébauche đứng trong 2 tệp eta-sellita (claim thuộc nguồn FHH); chặn suy diễn vai trò Sellita (độc lập/independent/nhà cung cấp chung/bộ máy chung/bên thứ ba/industry standard).
- **R6** dist: 6 route có trang; h1 khớp title theo ngôn ngữ; h1 EN không chứa ký tự tiếng Việt; canonical khớp route; hreflang vi + en đủ trên từng trang.

## 4. Kết quả kiểm (số đo thật)

| Kiểm | Kết quả |
|---|---|
| `npm run check:types` | ĐẠT, exit 0 (vòng sửa: `log-checktypes-sua.log`) |
| `npm run check` | ĐẠT, exit 0 (trong chuỗi build) |
| `npm run build` (gồm checker H14-B) | **exit 0**; checker in: "ĐẠT — 6 tệp × 3 cặp route; liên kết chéo: … vi[2] en[2] …; R6 dist ĐẠT" (log vòng sửa `build-log-sua.log`) |
| Số trang sau build | **312 trang** (311 `index.html` + `404.html`) |
| Sitemap | **311 URL** (`sitemap-0.xml`; đếm bằng `grep -o` tách index) |
| Liên kết | **23.341 link, 0 hỏng** ("Đã quét 312 trang HTML, 23341 link"; nền P0-A: 306 trang, 22.811 link; giảm 9 link so vòng đầu do thu gọn chữ) |
| `git diff --check` | exit 0 |
| dist 6 route | R6 ĐẠT: đủ 6 trang; h1 khớp title theo ngôn ngữ; canonical khớp; hreflang vi+en; liên kết chuyển ngôn ngữ đúng cặp hai chiều. Ba bài nguồn EN không có liên kết nội dung trong thân bài trỏ route VI; riêng liên kết chuyển ngôn ngữ ở header trỏ đúng route VI của từng cặp theo R6. |
| Mutation ngoài cây (vòng sửa, cây đã dọn) | M1 bỏ cặp route → **exit 1 [R1]**; M2 chèn "tốt hơn" → **exit 1 [R4]**; M3 raw href EN→route VI → **exit 1 [R1]**; M4 HTTPS `example.com` → **exit 1 [R3] "URL không thuộc allowlist"**; hoàn nguyên byte `cmp` = 0 từng ca; sạch cuối exit 0 |
| UTF-8/BOM/newline | 8 tệp gói ĐẠT (6 bài + contentRoutes + checker), không BOM, có newline cuối |

## 5. Ghi nhận biên tập

- Tiêu đề bài 3 trung tính: "ETA và Sellita — hai cái tên trong thế giới bộ máy" / "ETA and Sellita — two names in the movement world" — không dùng cụm "bộ máy chung trong ngành" (nguồn Sellita không chứng minh khái niệm đó).
- Không có claim chất lượng/xếp hạng/đầu tư/giá; không dùng "mọi hãng"/"luôn"/"hoàn toàn" ngoài phạm vi quote nguồn ("always without" là nguyên văn FHH).
- Thuật ngữ tiếng Anh trong ngoặc đơn sau tiếng Việt ở bài VI; bài EN cấu trúc tương đương, mức dè dặt giữ nguyên (giới hạn nguồn nêu tường minh ở cả hai ngôn ngữ).

## 6. Tệp thay đổi

**8 tệp tạo mới được phép phát hành:** 6 bài (mục 1) + `scripts/check-h14-production-chain.mjs` + biên bản này. **Sửa (2):** `src/i18n/contentRoutes.ts` (+3 cặp, sau dòng `diem-chuong`); `package.json` (nối `node scripts/check-h14-production-chain.mjs dist` cuối chuỗi build — sửa duy nhất khóa `scripts.build`). `output/h14-b-production-chain/` là bằng chứng nội bộ, không tính là tệp phát hành, không vào commit.

Không tệp hiện có nào khác thay đổi; không đụng `bo-may-in-house.md`, template, CSS, ảnh, cấu hình.

Dừng chờ GPT Work nghiệm thu. Chưa stage, chưa commit, chưa push.
