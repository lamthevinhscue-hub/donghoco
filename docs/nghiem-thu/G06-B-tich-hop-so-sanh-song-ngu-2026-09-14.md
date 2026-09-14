# G06-B chặng 2 — Tích hợp so sánh song ngữ /so-sanh ↔ /en/compare (2026-09-14)

- Giao dịch: TXN-20260914-10 | Danh mục: DHC-G05G09-20260913 v1.0.0
- Thực hiện: GLM (không commit, không push, không deploy) | Chờ: GPT Work nghiệm thu độc lập
- Nền: `9fa333e` (main = origin/main; chặng 1 đã nghiệm thu, biên bản + output commit tại chính nền này)
- **Vòng sửa 3 (TXN-20260914-17)**: sửa hẹp ánh xạ — dungCapBai kiểm ĐÚNG KHU VỰC cả hai route (VI /mau-iconic/, EN /en/iconic-watches/) trước khi trích slug; ca tự kiểm cô lập đúng điều kiện (slug CÓ trong cả hai kho + route EN sai khu → loại; đối chứng cùng slug đúng khu → nhận) chạy qua hàm thật; mutation hẹp riêng bỏ kiểm khu EN → 1/1 build THẤT BẠI đúng ca "route EN sai khu"; switcher hai chiều kiểm nhanh trên bản cuối (2/2); đồng bộ tổng số 57 ca trình duyệt + 6 tình huống T3b-DOM, dist 14/14.
- **Vòng sửa 2 (TXN-20260914-15)**: (a) tự kiểm ánh xạ chuyển sang tầng build — tách dungCapBai thành hàm thuần, tự kiểm chạy mỗi build trên dữ liệu giả (khác slug/đích không xuất bản/route sai khu) qua CHÍNH logic đó, sai thì build thất bại; bỏ __compareTuKiem khỏi trang người đọc; (b) mutation tiêm lỗi logic trong sandbox (slug EN từ route VI / bỏ lọc kho đích) — 2/2 build thất bại đúng lý do; (c) T3b-render đúng nghĩa render-only — blob giữ nguyên, chỉ vá đường render, CÙNG hàm kiểm DOM cho sạch/lỗi/khôi phục (6/6, mutationDat=true), phép thử cũ ghép blob đã THAY THẾ; (d) sửa dòng biên bản còn gọi S8 là chứng minh nguyên trạng.
- **Vòng sửa 1 (TXN-20260914-13)**: (a) lối vào danh sách EN — EnCollectionIndex thêm prop footerLink (được chấp thuận mở 1 tệp), wrapper truyền /en/compare/ + nhãn "Compare iconic models"; (b) bỏ capBai chép cứng — lấy từ ARTICLE_PAIRS đối chiếu kho xuất bản từng ngôn ngữ; (c) vòng đời storage đúng giao thức — apDung chỉ đổi href, ghi CHỈ khi click thật switcher (chặn Ctrl/Cmd/Shift/Alt), đích xóa ngay sau đọc kể cả sai, kiểm from/to hợp lệ + slug nguồn trong kho + đối chiếu URL hiện tại; (d) link chia sẻ khởi tạo chuẩn hóa; (e) tự kiểm runtime window.__compareTuKiem; (f) S8 đổi tên S8-lim; thêm S20-S25, D13, T3b-render; (g) english-launch ngoại lệ hẹp Métiers d'Art + tự kiểm, EXIT 0.
- Hồ sơ phạm vi áp dụng: `docs/nghiem-thu/G06-B-kiem-ke-so-sanh-en-2026-09-14.md` (bản đã nghiệm thu — CỔNG-1…17, mục 4.1, mục 6 sessionStorage, T1–T4b, RM-C1/C2, M1–M15)

## 0. Kết luận

**G06-B chặng 2 (sau vòng sửa 1, TXN-20260914-13) xong tự kiểm, chờ GPT Work tái nghiệm thu; chưa commit/push/deploy.**


- Build trọn chuỗi `npm run build` **exit 0** (log-build-vs3-v2.txt), diagnostics **0 lỗi / 0 cảnh báo / 4 hints = baseline**; check-g06-compare nguồn 25/25 (S1-S19 + S8-lim + S20-S25), dist **14/14**; english-launch chạy riêng **EXIT 0**.
- Số dist: **289 HTML** (288 index.html + 1 404.html = đúng kỳ vọng +1 route), **67 trang EN** (+1), **sitemap 288 URL** (có /en/compare/), **check-links 21.033 link 0 hỏng** (+66 so nền 20.967 — +65 phân rã mục 6 và +1 footer link danh sách EN).

- Kiểm trình duyệt (dist cuối vòng sửa 3) **57/57 ĐẠT**: hanh-vi 12, phim-bocuc 20, chuyen-ngon-ngu 10, vs1 15 — riêng runner T3b-DOM có **6 tình huống** (sạch/lỗi/khôi phục × VI/EN, mutationDat=true) là bằng chứng mutation, không tính vào ca sản phẩm.
- Mutation tổng: tĩnh T0–T3b **5/5**, capBai logic **2/2** (build sandbox thất bại đúng lý do), T3b-DOM mutationDat=true.
- Mutation sandbox **5/5** (T0 sạch ĐẠT; T1/T2/T3a/T3b bị bắt đúng ca); **T4** bản vá tái hiện lỗi qua trình duyệt 2/2.
- RM-C1/C2 ĐẠT; không đụng RM-B/RM-D của 3D.

## 1. Tệp thực tế của gói

Tạo mới:
- `src/components/compare/CompareExperience.astro` — khuôn chung VI/EN (toàn bộ logic công cụ)
- `src/pages/en/compare.astro` — wrapper EN
- `scripts/check-g06-compare.mjs` — bộ kiểm nguồn (S1–S19) + dist (D1–D12), hỗ trợ `dist <dir>` cho sandbox mutation
- `docs/nghiem-thu/G06-B-tich-hop-so-sanh-song-ngu-2026-09-14.md` — biên bản này
- `output/g06-compare-en-integration/` — script kiểm, log, JSON, ảnh (mục 7)

Sửa (10 tệp — danh sách thực tế theo git status tại phiên vòng sửa 1):
- `src/pages/so-sanh.astro` — wrapper mỏng gọi CompareExperience lang="vi" (title/description giữ nguyên)
- `src/i18n/contentRoutes.ts` — thêm `{ vi: '/so-sanh', en: '/en/compare/' }` vào STATIC_PAIRS
- `src/i18n/ui.ts` — OG_IMAGE_MAP thêm `/so-sanh` và `/en/compare` → og-mau-iconic.jpg
- `src/components/Card.astro` — compareHref tra `localizedHref('/so-sanh', lang)` (VI như cũ; EN → /en/compare/?m=…; cặp không tồn tại → không sinh link)
- `src/components/templates/IconicArticle.astro` — mở gate compareHref cho EN qua bảng cặp (bỏ localizedPath import thừa)
- `src/components/templates/EnCollectionIndex.astro` — (được chấp thuận mở thêm TXN-20260914-13) prop tùy chọn footerLink { href; label }, chỉ render khi truyền; các danh sách khác không truyền thì không đổi
- `src/pages/en/iconic-watches/index.astro` — truyền footerLink /en/compare/ + "Compare iconic models"
- `scripts/check-g01-navigation.mjs` — exploreViOnly rỗng; thêm ca cặp so sánh + anchor /en/compare/; sửa 2 ca Explore EN cũ (chỉ còn /so-sanh nhãn) thành "đủ 3 route EN"
- `scripts/check-english-launch.mjs` — REQUIRED_EN thêm '/en/compare/' (62 → **63**, đếm thật: "Đủ 63 route")
- `package.json` — `check` + `build` nối check-g06-compare (nguồn/dist); thêm lệnh `check:g06b`

**Không sửa**: Header.astro (nối attribute data-lang-hash-keep có sẵn), BaseLayout.astro (vùng cuộn do component tự quản bằng class .table-scroll-wrap + tabindex/role/aria — markOverflowTables bỏ qua bảng đã bọc, không bọc lồng), schema, nội dung bài gốc, public/, cấu hình, dependency, checker khác, bằng chứng chặng 1.

## 2. Quyết định đã áp dụng (từ hồ sơ + prompt TXN-20260914-10)

| Quyết | Hiện thực |
|---|---|
| Nhãn năm "Mốc năm"/"Year"; Tank "1917 — Thiết kế"/"1917 — Designed" | blob modelsData: year + yearNote; render ghép "1917 — Thiết kế"/"1917 — Designed"; các mẫu khác năm trần |
| Tank che 3 thông số → nhãn chốt | movement/power_reserve/water_resistance rỗng trong blob khi daCheThongSo; render hiện "Chưa đủ dữ liệu để đối chiếu"/"Not enough data to compare" |
| GMT "—" + chú thích | giá trị trống thật → "—"; chú thích CỔNG-2 hiện tĩnh dưới bảng cả hai ngôn ngữ |
| Câu Speedmaster/Tank chỉ trong công cụ | moTaTrongCongCu override theo slug+lang; S8-lim kiểm frontmatter 4 bài (vi/en) KHÔNG chứa câu chốt (kiểm GIỚI HẠN — phạm vi toàn bài đối chiếu Git khi bàn giao: git status 0 tệp src/content đổi) |
| CỔNG-1 câu giới hạn | tĩnh trong <p> đầu trang, cả hai ngôn ngữ |
| Nhãn thể loại | getIconicCategoryLabel (không bảng cạnh tranh) |
| Bỏ emoji chia sẻ; nút bỏ aria có tên mẫu | "Link chia sẻ:"/"Share link:"; aria-label = "Bỏ/Remove " + title |
| Câu giới thiệu EN trang | "Compare iconic models" + intro EN mới "Pick two to three iconic watches to compare their details and stories." (chuỗi mới — GPT Work xem khi nghiệm thu) |
| Dòng phạm vi EN | "Only models with published English articles appear here." (tĩnh trên /en/compare/) |
| Hướng dẫn đúng nút | "Tối đa 3 mẫu. Dùng nút Bỏ bên cạnh tên mẫu…" / "Up to 3 models. Use the Remove button…" |
| OG hai route | og-mau-iconic.jpg (tài sản hiện có) |

Nguồn Bulova N9: tái thử trong phiên tích hợp — **vẫn không truy cập được** (WebFetch timeout/302 về trang chủ toàn cầu, ghi ở biên bản chặng 1 vòng sửa 2). Trạng thái thật được ghi nhận; không dựng trích dẫn; câu Speedmaster đã duyệt dùng nguyên văn, không đổi.

## 3. Query, chuyển ngôn ngữ, sessionStorage

- Chuẩn hóa: lọc slug hợp lệ theo ngôn ngữ trang + loại trùng + giữ thứ tự + tối đa ba (`chuanHoa`).
- Link chia sẻ hiển thị ngay khi khôi phục từ URL (không đợi thao tác — thay đổi so với hiện trạng chặng 1, đã nghiệm thu thiết kế).
- Switcher: script scoped theo pathname /so-sanh ↔ /en/compare, nối qua attribute data-lang-hash-keep của Header (khuôn G05-B); ánh xạ qua capBai dựng từ ARTICLE_PAIRS qua hàm thuần dungCapBai đối chiếu kho xuất bản (không chép cứng, không giả định slug giống nhau); 0 mẫu hợp lệ → href đích không query → trạng thái rỗng đúng ngôn ngữ; không đổi switcher toàn site, không đụng hook hash G05.
- Vòng đời storage (vòng sửa 2 chốt): apDung chỉ cập nhật href; bản ghi chỉ ghi khi người dùng CLICK THẬT switcher (chặn Ctrl/Cmd/Shift/Alt); đích xóa ngay sau đọc kể cả sai; kiểm từ/to ∈ (vi,en) đúng chiều + target theo pathname + slug nguồn ∈ kho xuất bản nguồn + chuẩn hóa trùng/≤3 + đối chiếu kept với URL hiện tại — không khớp bỏ qua; tự kiểm ánh xạ chạy tầng build qua dungCapBai với dữ liệu giả (sai → build thất bại; mutation sandbox chứng minh 2/2).
- sessionStorage một lần: bản ghi {slugs (nguồn đã chuẩn hóa, đủ cả mẫu không có bản đích), from, to, target}; đích kiểm cấu trúc + from/to + đích theo PATHNAME; **tính lại số không chuyển được từ bảng cặp theo hướng from→to của bản ghi** (không tin số lưu sẵn); xóa ngay sau đọc; mọi truy cập storage bọc try/catch.
- Storage lỗi/không dùng được hoặc vào bằng link trực tiếp: chỉ dòng phạm vi EN chung, không bịa số; không đưa dữ liệu thông báo vào link chia sẻ; đây là UX, không phải cơ chế xác thực.

## 4. Bảng, bàn phím, no-JS

- Dark mode: hàng chẵn `bg-white dark:bg-dark-surface`, hàng lẻ `bg-cream-dark/5 dark:bg-transparent` — đo computed 16 tổ hợp, tương phản ≥ 4,5:1 (chi tiết log-c2-phim-bocuc.txt; nhãn ≥ 5,6:1, giá trị ≥ 7:1 mọi tổ hợp).
- Vùng cuộn: component render sẵn `.table-scroll-wrap` (tabindex=0, role=region, aria-label theo ngôn ngữ) — cả hai luồng đều đúng 1 vùng, không bọc lồng (V3); Tab thật vào được và ArrowRight/Left thật cuộn (M9a, 320px, scrollLeft 0→286→143 tương đương log-hai-luong cũ); gợi ý kéo ngang tự ẩn/hiện theo tràn.
- Focus sau bỏ: nút kế tiếp cùng vị trí → nút trước → select (chỉ tính nút đang hiển thị — offsetParent); không rơi về BODY (M9b/c/d).
- No-JS: noscript ẩn select/nút/bảng/hộp (không để điều khiển chết trông như sống) + giải thích tĩnh + liên kết danh sách và 4 bài thật; switcher vẫn là liên kết thật, không hứa giữ lựa chọn.
- Không thêm chuyển động nội dung (S18: không rAF/setInterval/keyframes); RM-C1: thao tác dưới reduce cho trạng thái cuối như thường.

## 5. Kết quả kiểm (bằng chứng thật, đường dẫn ở mục 7)

| Nhóm | Kết quả | Ghi chú |
|---|---|---|
| Kiểm nguồn S1–S25 (gồm S8-lim, S20–S25) | 25/25 ĐẠT | S8-lim chỉ kiểm câu chốt không lọt frontmatter (phạm vi bài đối chiếu Git khi bàn giao); S14 cấm dropped; S18 RM-C2 tĩnh; S21–S25 vòng sửa 1–2 |
| Kiểm dist D1–D14 | 14/14 ĐẠT | gồm D4 0 chuỗi VI lọt EN, D5 chống Tank lọt giá trị, D7 0 href /en/so-sanh toàn dist, D12 bài EN dẫn /en/compare/?m=, D13 footer link nội dung danh sách EN, D14 không rò dữ liệu giả tự kiểm |
| check-g01 (dist) | 99/99 ĐẠT | gồm 14 ca mới riêng cặp so sánh |
| check-english-launch | "Đủ 63 route" + **mọi ca ĐẠT** (ngoại lệ hẹp Métiers d'Art đã áp dụng — chạy riêng EXIT 0) | REQUIRED_EN 62→63 |
| check-links | 289 trang, 21.033 link, 0 hỏng | +66 so nền (mục 6) |
| Trình duyệt hanh-vi | 12/12 ĐẠT | M4–M8, V1–V3, RM-C1 (dist cuối vòng sửa 3) |
| Trình duyệt phim-bocuc | 20/20 ĐẠT | M9 phím thật + M10 bố cục 16 tổ hợp (dist cuối vòng sửa 3) |
| Trình duyệt chuyen-ngon-ngu | 10/10 ĐẠT | CN1–CN8 + NJS (dist cuối vòng sửa 3) |
| Trình duyệt vs1 | 15/15 ĐẠT | vòng sửa 1 (dist cuối vòng sửa 3) |
| Switcher 2 chiều nhanh (vs3-switcher) | 2/2 ĐẠT | vòng sửa 3 (dist cuối vòng sửa 3) |
| Mutation T0–T3b | 5/5 ĐẠT | sandbox mutation-tmp, dọn sạch sau chạy (chạy lại trên dist vòng sửa 1) |
| Vòng sửa 1 — danh sách EN + đối chiếu ô + vòng đời storage | 15/15 ĐẠT (A1-A3 footer link nội dung/Tab/2 theme; B-EN 2 lượt + B-VI đối chiếu từng ô; C1-C7 vòng đời) |
| Vòng sửa 1 — T3b-render + tự kiểm runtime | **ĐÃ BỊ THAY THẾ** (phép thử cũ vá cả blob — không đáp ứng ca render-only; __compareTuKiem đã bỏ khỏi trang); giữ làm lịch sử. Thay bằng T3b-DOM 6/6 (vòng sửa 2, t3b-dom-ket-qua.json lưu cả kết quả KHÔNG ĐẠT của bản lỗi) |
| T4 phục vụ thật | 2/2 ĐẠT | bản vá tái hiện cột trùng; bản sạch không |
| Diagnostics | 0 lỗi/0 cảnh báo/4 hints | = baseline |

Phân biệt tầng kiểm: S* = mã nguồn; D* = HTML tĩnh trong dist; trình duyệt = DOM sau tương tác/phím thật. Không ca nào dùng chuỗi trong JSON nhúng làm bằng chứng hiển thị (hiển thị do trình duyệt xác nhận).

Switcher hai chiều: CN1/CN2 (đủ cặp, storage bản ghi chiều về, đích 2 cột), CN3 (một phần — giữ 1 + thông báo "1 model without an English article was not carried over."), CN4 (0 hợp lệ → trang rỗng EN không query), CN5 (EN→VI), CN6 (link trực tiếp — không bịa thông báo), CN7 (storage sai cấu trúc — bỏ qua an toàn), CN8 (storage ném lỗi — công cụ vẫn chạy + dòng phạm vi chung).

Đo tải (một phương pháp, preview/server tĩnh; byte giải nén — preview không gửi content-length nên byte truyền không đo được, ghi là giới hạn):

| Phía | Request | HTML | CSS | JS | Tổng giải nén |
|---|---|---|---|---|---|
| VI trước (9fa333e) | 5 | 77.593 | 49.022 + 56.006 | 17.731 + 0 | 200.352 B |
| VI sau (vòng đầu) | 5 (không đổi) | 90.086 | 49.105 + 56.089 | 17.731 + 0 | 213.011 B (+12.659) — **bị THAY THẾ bởi số vòng sửa 1** |
| VI sau (lịch sử vòng sửa 1, không phải số cuối) | 5 (không đổi) | 94.592 | 49.219 + 56.203 | 17.731 + 0 | 217.745 B (+17.393 so trước) |
| EN (tuyệt đối, vòng sửa 1) | 5 | 56.075 | 49.219 + 56.203 | 17.731 + 0 | 179.228 B |

Giải thích tăng VI cuối: +17,4KB HTML = blob dữ liệu/chuỗi công cụ (modelsData + chuỗi UI VI/EN + cặp bài từ ARTICLE_PAIRS + khoSlug 69+4 slug cho kiểm bản ghi + noscript + câu chốt + tự kiểm runtime) và câu giới hạn — đúng phần thêm; CSS +197/+197B (lớp mới); JS không đổi (inline, tính trong HTML). Không request mới; **không nạp chunk 3D** (chỉ hoisted.DX0x34b4.js cả hai trang). Byte truyền: preview không gửi content-length nên số liệu là byte giải nén — giới hạn ghi rõ.

## 6. Phân rã link: +65 mốc vòng đầu, +66 số cuối (20.967 → 21.033)

- +65 mốc vòng đầu: menu Explore EN desktop + mobile (2 link/trang EN) và switcher (2 chiều/trang cặp) sinh link trên các trang EN (67); cộng link noscript + link so sánh trong 4 bài EN (/en/compare/?m=… ×4) + hreflang/canonical thêm trên 2 trang.
- **+1 của vòng sửa 1: footer link danh sách EN** (EnCollectionIndex footerLink → /en/compare/ trên /en/iconic-watches/) — nâng tổng từ 21.032 lên **21.033 (số cuối)**. Không gọi +65 là số cuối.

## 7. Bảng bằng chứng (output/g06-compare-en-integration/)

| Tệp | Nội dung |
|---|---|
| log-build-nen-chang2.txt | build nền tại 9fa333e trước khi sửa (exit 0) |
| log-build-cuoi-v8.txt | LỊCH SỬ — build vòng đầu chặng 2 (đã thay thế) |
| log-check-g06b-nguon.txt / log-check-g06b-dist.txt | LỊCH SỬ (vòng đầu 19/19 và 12/12) — hiện hành là log-check-g06b-nguon.txt (25/25) và ca dist trong log-build-vs3-v2.txt (14/14) |
| log-check-links-cuoi.txt | LỊCH SỬ — 21.032 link (vòng đầu); hiện hành: 21.033 link trong log-build-vs3-v2.txt |
| **log-build-vs3-v2.txt** | **BẰNG CHỨNG HIỆN HÀNH** — build chốt vòng sửa 3: exit 0, 289 HTML, 21.033 link 0 hỏng, 0/0/4 hints, mọi bộ kiểm ĐẠT (gồm g06-compare dist 14/14) |
| **log-english-launch-vs3.txt** | **BẰNG CHỨNG HIỆN HÀNH** — english-launch EXIT 0 sau ngoại lệ Métiers d'Art |
| log-english-launch.txt | LỊCH SỬ — có lỗi Métiers (vòng đầu); hiện hành: log-english-launch-vs3.txt EXIT 0 |
| pw-g06b-c2-hanh-vi.js + log | 12/12 ĐẠT (M4–M8, V1–V3, RM-C1) |
| pw-g06b-c2-phim-bocuc.js + log | 20/20 ĐẠT (M9 phím thật, M10 16 tổ hợp + tương phản) |
| pw-g06b-c2-chuyen-ngon-ngu.js + log | 10/10 ĐẠT (M3/CN, M13/NJS) |
| pw-g06b-c2-t4.js + log | T4 2/2 (sạch 2 cột / vá 3 cột trùng) |
| mutation-g06b.cjs + mutation-ket-qua.json + log | T0–T3b 5/5, sandbox dọn sạch |
| pw-g06b-c2-tai.js + log | đo tải TRƯỚC (dist 9fa333e dựng sandbox) + sau vòng đầu + danh sách JS (không 3D) |
| pw-g06b-c2-tai-sau.js + log-c2-tai-sau.txt | đo tải SAU (đo lại dist cuối vòng sửa 2): VI 216.902B / EN 178.385B, 5 request, không 3D |
| mutation-capbai.cjs + capbai-mutation-ket-qua.json + log-mutation-capbai.txt | **vòng sửa 2**: mutation logic capBai — M-a (slug EN từ route VI) + M-b (bỏ lọc kho đích): 2/2 build sandbox THẤT BẠI đúng lý do; sandbox dọn sạch |
| pw-g06b-c2-t3b-dom.js + log-c2-t3b-dom.txt + t3b-dom-ket-qua.json | **vòng sửa 2, chạy lại trên dist vòng sửa 3**: T3b-DOM 6/6 — cùng hàm kiểm DOM cho sạch/lỗi/khôi phục × VI/EN; JSON lưu riêng kết quả KHÔNG ĐẠT chi tiết của bản lỗi |
| mutation-khu-en.cjs + khu-en-mutation-ket-qua.json + log-mutation-khu-en.txt | **vòng sửa 3**: mutation hẹp bỏ kiểm khu route EN → build THẤT BẠI đúng ca; sandbox dọn sạch |
| pw-g06b-c2-vs3-switcher.js + log-c2-vs3-switcher.txt | **vòng sửa 3**: switcher hai chiều trên bản cuối — VI→EN và EN→VI giữ 2 mẫu (2/2 ĐẠT) |
| pw-g06b-c2-vs1.js + log-c2-vs1.txt | **vòng sửa 1**: 15/15 ĐẠT — A footer link nội dung/Tab/2 theme; B đối chiếu từng ô EN 2 lượt + VI; C vòng đời storage (C1-C7) |
| pw-g06b-c2-t3b-render.js + log-c2-t3b-render.txt | **vòng sửa 1**: T3b-render 4/4 — bản vá hiện thông số sai trên DOM, bản sạch đúng nhãn; __compareTuKiem 3/3 |
| server-tinh.cjs (tái dùng) | server tĩnh cho T3b-render sandbox (t3b-render/ đã xóa sau chạy) |
| server-tinh.cjs + log-server-*.txt | server tĩnh cho sandbox/T4/đo tải (đã tắt) |
| shots/c2-*.png (8) | 2 route × sáng/tối × 320/1440 — đã tự mở kiểm bằng mắt |

Không đọc/ghi PNG như văn bản; không lưu bí mật/cookie/storageState.

## 8. Phát hiện ngoài phạm vi (không tự sửa)

1. ~~check-english-launch LỖI có sẵn tại nền 9fa333e~~ **ĐÃ XỬ LÝ (vòng sửa 1)** theo chấp thuận: ngoại lệ hẹp CHÍNH XÁC cụm "Métiers d'Art" (kèm biến thể HTML-encode &#39;) với tự kiểm hai chiều (cụm qua; VI thật kề bên vẫn bị bắt); không bỏ dấu é khỏi regex, không bỏ trang history, không sửa timeline.json. English-launch chạy riêng sau build: **EXIT 0**.
2. ~~Lối vào so sánh từ danh sách EN~~ **ĐÃ GIẢI QUYẾT (vòng sửa 1)**: GPT Work chấp thuận mở EnCollectionIndex — đã thêm prop footerLink và wrapper truyền link (S20, D13).
3. Chuỗi EN mới chưa từng duyệt nguyên văn (trình để GPT Work xem khi nghiệm thu): intro EN trang, "Open the comparison tool" không dùng; các chuỗi runtime EN theo CỔNG (đã duyệt) + thông báo mất lựa chọn ("1 model without an English article was not carried over." — khuôn mục 6).

## 9. Danh sách tệp dự kiến commit (GLM tự kiểm, chờ duyệt)

Sửa (10 tệp — danh sách thực tế theo git status cuối vòng sửa 3): src/pages/so-sanh.astro, src/i18n/contentRoutes.ts, src/i18n/ui.ts, src/components/Card.astro, src/components/templates/IconicArticle.astro, src/components/templates/EnCollectionIndex.astro, src/pages/en/iconic-watches/index.astro, scripts/check-g01-navigation.mjs, scripts/check-english-launch.mjs, package.json. (EnCollectionIndex.astro là tệp ĐƯỢC GPT Work chấp thuận mở thêm — vòng sửa 1; en/iconic-watches/index.astro truyền footerLink — vòng sửa 1.)

Tạo mới: src/components/compare/CompareExperience.astro, src/pages/en/compare.astro, scripts/check-g06-compare.mjs, biên bản này, output/g06-compare-en-integration/ (toàn bộ, gồm 8 ảnh shots/).

Trạng thái cuối phiên (vòng sửa 3): HEAD = origin/main = 9fa333e; staged 0; tracked modified = 10 tệp trên; untracked = biên bản + output/g06-compare-en-integration/.

## 10. Kết luận GPT Work — TXN-20260914-20

Nghiệm thu G06-B chặng 2 ĐẠT sau kiểm độc lập qua các vòng sửa. Vòng cuối kiểm lại nguồn 25/25, dist 14/14, English launch ĐẠT và 289 HTML / 21.033 liên kết / 0 hỏng. Build độc lập ở lượt TXN-20260914-18 đạt exit 0, diagnostics 0 lỗi / 0 cảnh báo / 4 hints; không chạy lại build chỉ vì chuẩn hóa log và hồ sơ.

Số đo tải vòng sửa 1 ở mục 5 là lịch sử. Bằng chứng đo sau đó tại log-c2-tai-sau.txt ghi VI 216.902 B, EN 178.385 B, 5 request; không coi số đo lịch sử là phép đo mới của lượt chốt này. Giữ giới hạn byte giải nén và điều kiện thử đã ghi, không chứng nhận hiệu năng production.

Chấp thuận các chuỗi EN của công cụ đang trình tại mục 8. Commit chỉ tệp thuộc G06-B chặng 2; không thay mã sản phẩm trong lượt chốt hồ sơ. G06-B hoàn tất khi push được xác minh; G06-C và các gói tiếp theo chưa mở trong lượt này.
