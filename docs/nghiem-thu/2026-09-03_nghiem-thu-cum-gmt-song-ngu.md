# BIÊN BẢN NGHIỆM THU — CỤM KIẾN THỨC GMT SONG NGỮ (PROMPT 33)

- **Ngày nghiệm thu:** 03/09/2026
- **Commit nền:** `fe917eb` ("feat(i18n): hoàn thiện cụm Rolex quốc tế — GMT-Master EN + timeline song ngữ")
- **Chế độ i18n:** **B** (bilingual content — 3 bài tiếng Anh thật cho cụm GMT) kết hợp **C** (shared feature — template, autolink và hạ tầng dùng chung hai ngôn ngữ).
- **Hồ sơ nguồn:** `docs/ho-so-nguon-cum-gmt-song-ngu.md` (ra trước khi viết bản dịch — đúng trình tự đề yêu cầu; mục 0 của hồ sơ ghi cập nhật vòng 2).
- **Vòng nghiệm thu:** vòng 1 (chuẩn hóa 6 bài + dữ liệu + 3 bài EN + sửa autolink EN); **vòng 2** (chuẩn hóa mở rộng theo phản hồi: nguyên lý có điều kiện, loại Caller/Flyer kể cả ghi chú tên gọi, bezel đúng nguyên tắc, chuẩn hóa infographic + công cụ tương tác, Pan Am 5 bề mặt, script chống tái phát). Biên bản này phản ánh trạng thái SAU vòng 2.

---

## 1. Các tệp thay đổi (đếm so với commit nền `fe917eb` — tổng 17 tệp sửa + 6 tệp mới = 23 tệp, đối chiếu `git status` ở mục 4)

### Tệp sửa (17)

| # | Tệp | Nội dung thay đổi |
|---|-----|-------------------|
| 1 | `src/content/coChe/vi/gmt.md` | **Vòng 1:** 1955 (không 1954), 1982 (không 1983); mục Caller/Flyer gán kiểu đảo chiều → hai kiểu theo chức năng; "2:1" như quy tắc chung → nguyên lý hiển thị; bỏ biệt danh Pepsi/Batman; bỏ ví dụ Tudor/Omega/Grand Seiko; bỏ link "mốc 1954"; + nguồn Rolex Newsroom. **Vòng 2:** nguyên lý có điều kiện (bỏ "kim GMT luôn đồng bộ với kim giờ"; bỏ "đọc được 2-3 múi giờ" phổ quát; thang 24 giờ tùy vị trí; chỉ mẫu có vành xoay mới đọc thêm múi thay thế qua vành); **đã loại hoàn toàn đoạn Caller/Flyer kể cả ghi chú tên gọi** và mô tả "kiểu chỉnh riêng kim GMT" như nguyên tắc phổ quát → mục "Cách chỉnh — tùy từng bộ máy" (đặc tính từng calibre + bắt buộc đọc tài liệu đúng mẫu + duy nhất dữ kiện có nguồn của GMT-Master II 1982); phần vành viết lại theo nguyên tắc Rolex (xoay theo chênh lệch → đọc kim GMT trên thang đã xoay; giờ tham chiếu ẩn khi dùng vành; về trung lập tam giác 12 giờ); relation "từ buồng lái Pan Am đến số đông" → "đưa cơ chế hai múi giờ đến số đông… sau đó trở thành đồng hồ chính thức của hãng hàng không Pan Am" |
| 2 | `src/content/huongDan/vi/doc-va-chinh-gmt.md` | **Vòng 1:** bỏ nhãn "jumping hour"; + ví dụ GMT-Master II có nguồn; viết lại phần đọc vành; + "Đọc thêm". **Vòng 2:** bỏ khối "hai kiểu chỉnh" (Kiểu 1/2) → "Cách chỉnh — theo tài liệu của từng mẫu" (+ ghi chú rõ 2 nút dụng cụ là mô phỏng nguyên lý); phần vành → "Đọc thêm một múi giờ thay thế bằng vành 24 giờ xoay" (nguyên tắc chênh lệch, không ví dụ đếm nấc, giới hạn Rolex về giờ tham chiếu); excerpt bỏ khẳng định "hai kiểu chỉnh" và "múi giờ thứ ba" phổ quát; FAQ "ba múi giờ" → có điều kiện; mục lỗi thường gặp "Chỉnh sai kiểu" → "Chỉnh theo phỏng đoán" |
| 3 | `src/content/tuDien/vi/gmt.md` | **Vòng 1:** 1955, bỏ biệt danh, đã bỏ "tỷ lệ 2:1" và cụm Caller/Flyer khỏi câu dẫn. **Vòng 2:** "Nhận biết" — thang 24 giờ thường nằm trên vành, chỉ một số mẫu vành xoay được; lịch sử — "trở thành đồng hồ chính thức của hãng hàng không Pan Am" |
| 4 | `src/content/mauIconic/vi/rolex-gmt-master.md` | **Vòng 1:** relation đã bỏ chữ "2:1". **Vòng 2:** 3 chỗ Pan Am — cụm cũ "nhanh chóng được các phi công… lựa chọn sử dụng" đã sửa thành "trở thành đồng hồ chính thức của hãng hàng không Pan Am"; cột mốc 1955 tương tự; ẩn dụ "buồng lái Pan Am" đã bỏ tên hãng — thay bằng "buồng lái đường dài" |
| 5 | `src/content/mauIconic/en/rolex-gmt-master.md` | **Vòng 1:** đã sửa câu "gear pair 2:1" thành nguyên lý hiển thị; thêm link bài cơ chế GMT EN. **Vòng 2:** 3 chỗ Pan Am (Origins "quickly adopted by pilots" → "became the official watch of the airline Pan Am"; Milestones; "Pan Am cockpit" → "long-haul cockpit") |
| 6 | `src/content/thuongHieu/vi/rolex.md` | **Vòng 1:** identity GMT-Master II bỏ biệt danh Pepsi/Batman. **Vòng 2:** lineHistory 1955 "(GMT-Master cho phi công Pan Am…)" → "(GMT-Master — dòng này sau đó trở thành đồng hồ chính thức của hãng hàng không Pan Am; …)" |
| 7 | `src/data/timeline.json` | **Vòng 1:** mốc GMT 1954 → 1955 + mô tả trung thực. **Vòng 2:** chữ cũ "đồng hồ chính thức của phi công Pan Am" đã sửa thành "của hãng hàng không Pan Am" |
| 8 | `src/data/rolexGmtMasterEvolution.ts` | **Vòng 2:** note mốc 1955 vi/en — "Rolex ghi nhận phi công Pan Am lựa chọn" / "notes the choice of Pan Am pilots" đã loại, thay bằng "trở thành đồng hồ chính thức của hãng hàng không Pan American World Airways (Pan Am)". Các mốc khác giữ nguyên theo hồ sơ dữ liệu |
| 9 | `src/components/interactive/GmtReader.astro` | **Vòng 2:** "Ba múi giờ"/"múi giờ thứ ba" → "múi giờ thay thế" có điều kiện (mẫu có vành 24 giờ xoay) trên toàn bộ: tiêu đề, mô tả, aria-label, ô readout, status text, lastNote các nút, ví dụ chuyến bay; bổ sung ghi chú "minh họa nguyên lý — không thay thế hướng dẫn của nhà sản xuất" ở đầu dụng cụ + chú thích dưới bộ điều khiển; nút chỉnh kim giờ ghi rõ mô phỏng kiểu GMT-Master II |
| 10 | `src/components/infographics/glossary/GMT.astro` | **Vòng 2:** đã loại Pan Am "yêu cầu năm 1954", GMT-Master II "1983", danh sách Tudor Black Bay GMT/Grand Seiko GMT/Omega Aqua Terra GMT, và câu "bánh răng tỷ lệ 2:1" như cơ chế chung; lịch sử chuẩn hóa (1955 ra mắt → đồng hồ chính thức của hãng hàng không Pan Am → 1982 bộ máy mới chỉnh kim giờ độc lập); nhãn mô phỏng rõ ràng "minh họa nguyên lý hiển thị trên một mẫu GMT có vành xoay — không phải mô phỏng thao tác của mọi calibre"; nhãn "Giờ thứ 3 (bezel)" → "Múi thay thế (vành)"; thẻ giải thích ①②③ viết lại theo nguyên tắc có điều kiện |
| 11 | `src/i18n/contentRoutes.ts` | **Vòng 1:** +3 cặp (`/co-che/gmt`↔`/en/mechanisms/gmt/`, `/huong-dan/doc-va-chinh-gmt`↔`/en/guides/reading-and-setting-gmt/`, `/tu-dien/gmt`↔`/en/glossary/gmt/` — ARTICLE 17→20, ALL 28→31) |
| 12 | `scripts/check-english-launch.mjs` | **Vòng 1:** REQUIRED_EN +3 (24→27, tự đếm) |
| 13 | `src/plugins/remark-glossary-autolink.ts` | **Vòng 1:** autolink theo i18n — trang EN chỉ bọc thuật ngữ có cặp EN (route EN, không tooltip tiếng Việt), chưa dịch giữ nguyên văn (chi tiết mục 3) |
| 14 | `astro.config.mjs` | **Vòng 1:** truyền `enLinks` (từ ARTICLE_PAIRS) vào plugin autolink |
| 15 | `package.json` | **Vòng 2:** `npm run check` thêm `check-gmt-source-integrity.mjs` cuối chuỗi; thêm shortcut `check:gmt` |
| 16 | `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` | **Vòng 1:** cập nhật mốc lần 12 (03/09/2026), commit nền `fe917eb`, số liệu build, mục English launch pack — 31 route `/en/`, cụm GMT song ngữ, hồ sơ nguồn |
| 17 | `src/data/glossary-terms.json` | **Vòng 3:** tệp tự sinh trước mỗi build (`scripts/generate-glossary-terms.mjs`) — đổi theo excerpt mới của `tuDien/vi/gmt.md`, duy nhất dòng thuật ngữ `gmt` |

*(docs/ho-so-nguon và biên bản này là tệp mới — tính ở nhóm dưới; `scripts/check-gmt-source-integrity.mjs` và `LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` cũng vậy.)*

### Tệp mới (6)

1. `src/content/coChe/en/gmt.md` — `/en/mechanisms/gmt/` (custom_slug `gmt`; category/difficulty là enum vi do schema quy định, nhãn hiển thị qua label helper theo ngôn ngữ; vòng 2 đồng bộ nguyên tắc có điều kiện với bài vi — liên kết nội bộ EN: glossary, guide đọc-chỉnh, GMT-Master, chuỗi truyền động)
2. `src/content/huongDan/en/reading-and-setting-gmt.md` — `/en/guides/reading-and-setting-gmt/` (không nhắc dụng cụ tương tác — GmtReader chỉ render tiếng Việt; vòng 2 đồng bộ: mục "Setting it — follow the model's own documentation", vành theo nguyên tắc chênh lệch, FAQ có điều kiện)
3. `src/content/tuDien/en/gmt.md` — `/en/glossary/gmt/` (vòng 2 đồng bộ: nhận biết không liệt kê màu như quy tắc, thang 24 giờ có điều kiện, Pan Am hãng hàng không)
4. `docs/ho-so-nguon-cum-gmt-song-ngu.md` — hồ sơ nguồn cụm (mục 0 = vòng 2)
5. `scripts/check-gmt-source-integrity.mjs` — **chống tái phát (vòng 2)**: quét đúng 15 tệp phạm vi, chặn 6 nhóm tổ hợp sai (R1 1954 gắn GMT/Pan Am; R2 1983 gắn GMT-Master II; R3 Caller GMT/Flyer GMT; R4 sai quy tắc Pan Am — gồm "đồng hồ chính thức của phi công Pan Am"/"official watch of Pan Am pilots"/"Pan Am lựa chọn/yêu cầu/đặt hàng"/"phi công Pan Am"/"buồng lái Pan Am"; R5 khái quát hóa "mọi GMT/every GMT/all GMT"; R6 "2:1"). **Không loại trừ tệp infographic hay nội dung tương tác khỏi quét** — 13 tệp nội dung chặt tuyệt đối; riêng 2 tệp hồ sơ (có nhiệm vụ ghi nhận nguyên nhân mâu thuẫn) dòng mang ngữ cảnh lịch sử/phủ định được bỏ qua, dòng trần vẫn bị chặt; presence check bảo đảm hồ sơ ghi nhận chuẩn hóa GmtReader + GMT.astro
6. `docs/nghiem-thu/2026-09-03_nghiem-thu-cum-gmt-song-ngu.md` — biên bản này

**Tổng gói: 17 tệp sửa + 6 tệp mới = 23 tệp** — khớp `git status` đối chiếu với commit nền `fe917eb` ở mục 4. (Dòng 16 của bảng trên chính là `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md`; dòng 17 là tệp tự sinh theo build — đã tính trong số 17 tệp sửa.)

## 2. Kiểm chứng dữ kiện trước khi dịch (theo đề mục A)

Mọi mâu thuẫn liệt kê trong đề đều được xử lý trước khi viết bản tiếng Anh; từng claim ghi rõ nguồn nâng/không nâng trong hồ sơ nguồn (`docs/ho-so-nguon-cum-gmt-song-ngu.md`):

| Mâu thuẫn | Xử lý | Bằng chứng nguồn |
|-----------|-------|------------------|
| 1954/1955 | Chuẩn hóa **1955** trên coChe vi, tuDien vi, timeline.json | Rolex Newsroom nguyên văn "Launched in **1955**"; mệnh đề "Pan Am yêu cầu năm 1954" bị bỏ (nguồn chỉ nâng "đồng hồ chính thức của Pan Am") |
| 1982/1983 | Chuẩn hóa **1982** | Rolex Newsroom "In **1982**, Rolex introduced a new movement…" |
| Caller/Flyer đảo chiều | Bỏ tên gọi làm quy tắc; phân biệt **2 kiểu theo chức năng**; GMT-Master II = kiểu kim giờ nhảy từng nấc không đụng kim 24h | Rolex Newsroom: hour hand "jumping from hour to hour… **without affecting the 24-hour hand**" (đối chiếu với mô tả cũ sai trong coChe vi: Caller = "kim giờ nhảy nấc" — đảo chiều với thực tế Rolex) |
| "Mọi GMT dùng bánh răng 2:1" | Viết lại thành nguyên lý hiển thị; cấu trúc bánh răng chỉ kể như một cách làm thường gặp, "tùy calibre" | FHH mô tả một cấu trúc cụ thể (pinion halves the rotational speed), không khái quát |
| Ví dụ xoay vành "17:00 (hoặc 7:00 tùy chiều)" | Bỏ ví dụ số; nguyên tắc tổng quát (chiều/số nấc theo độ chênh thật; giờ nhà ẩn khi dùng vành; về trung lập = tam giác về 12) | Rolex Newsroom (neutral position / turning the bezel / reference time no longer shown); hình học thang 24h không cho công thức "xoay N vạch" chung |
| Biệt danh sưu tầm Pepsi/Batman/Coke | Bỏ khỏi coChe vi, tuDien vi, thuongHieu vi; mô tả bằng tên màu/chức năng | Quy tắc cụm + hồ sơ dataset GMT-Master ("Không dùng biệt danh sưu tầm") |
| Ví dụ Tudor/Omega/Grand Seiko trong bài cơ chế | Bỏ (không có nguồn trong cụm nâng tên mẫu cụ thể) | Nguyên tắc "thà thiếu còn hơn sai" |

Các mốc 1954/1983 của chủ thể khác (Polerouter 1954, AP Royal Oak calendar 1983–84, Swatch quartz 1983…) không phải mâu thuẫn — không đụng; script nhận diện qua ngữ cảnh, không báo nhầm.

### 2b. Vòng 2 — chuẩn hóa mở rộng toàn bộ nội dung hiển thị

| Yêu cầu vòng 2 | Xử lý |
|----------------|-------|
| Nguyên lý GMT có điều kiện (cả vi + en) | Bỏ "kim GMT luôn đồng bộ với kim giờ" / "stays in step with the hour hand"; giữ đúng: kim GMT 1 vòng/24 giờ, quan hệ giữa các kim tùy calibre. Bỏ khẳng định "đọc được 2-3 múi giờ" phổ quát → GMT cơ bản = múi giờ thứ hai; chỉ mẫu có vành 24 giờ xoay đọc thêm múi thay thế qua vành. Thang 24 giờ có thể nằm trên vành hoặc vị trí khác — vành xoay không được ngầm định là thuộc tính chung |
| Cách chỉnh | Caller GMT/Flyer GMT đã loại hoàn toàn (kể cả ghi chú "tên gọi không chính thức") cùng mô tả "kiểu chỉnh riêng kim GMT" như nguyên tắc phổ quát; chỉ giữ dữ kiện có nguồn GMT-Master II (1982, kim giờ nhảy từng giờ qua núm, không đụng kim phút/giây/kim 24h); mọi bài yêu cầu đọc tài liệu đúng calibre/mẫu trước khi chỉnh; không mô tả thao tác núm chung chung |
| Bezel / múi giờ thay thế | Bỏ hướng dẫn vòng vo "xoay bezel để số trùng kim GMT"; nguyên tắc đúng: vành xoay theo chênh lệch múi giờ cần theo dõi → đọc kim GMT trên thang đã xoay; giới hạn Rolex nêu rõ (giờ tham chiếu không còn đọc theo vành; về trung lập tam giác 12 giờ); không có công thức chiều/số nấc chung |
| Infographic `GMT.astro` | đã loại các nội dung cũ sai: Pan Am "yêu cầu 1954", năm "1983", danh sách Tudor/Grand Seiko/Omega, "2:1" như quy tắc chung; lịch sử chuẩn (1955 / đồng hồ chính thức của hãng hàng không Pan Am / 1982); nhãn mô phỏng "minh họa nguyên lý hiển thị của GMT có vành 24 giờ xoay — không phải mô phỏng thao tác của mọi calibre" |
| `GmtReader.astro` | "Kim GMT +1h" không còn trình bày như thao tác chuẩn — giữ điều khiển nhưng ghi rõ đây là mô phỏng quan hệ hiển thị, không thay thế hướng dẫn nhà sản xuất (chữ ngay đầu dụng cụ + dưới bộ điều khiển); toàn bộ "3 múi giờ"/"múi thứ ba" → "múi giờ thay thế" có điều kiện |
| Pan Am 5 bề mặt | iconic vi + en + `thuongHieu/vi/rolex.md` + `timeline.json` + `rolexGmtMasterEvolution.ts`: đồng nhất "trở thành đồng hồ chính thức của hãng hàng không Pan American World Airways (Pan Am)"; ẩn dụ "buồng lái Pan Am" đã bỏ tên hãng |
| Đồng bộ vi–en + metadata | 6 bài tương đương nghĩa, cùng mức thận trọng, cùng liên kết đúng ngôn ngữ; excerpt vi/en của 3 cặp không còn khẳng định bezel xoay/hai kiểu chỉnh phổ quát; kiến trúc i18n/autolink vòng 1 giữ nguyên |
| Chống tái phát | `scripts/check-gmt-source-integrity.mjs` vào `npm run check` (mục 1 tệp mới #5) |

## 3. Sửa hạ tầng phát hiện khi kiểm: autolink từ điển trên trang EN

Khi kiểm trang EN mới build, phát hiện plugin autolink từ điển (có từ English launch pack) tự bọc thuật ngữ trong **mọi bài EN** bằng link về **route tiếng Việt** (`/tu-dien/<slug-vi>`) kèm tooltip định nghĩa tiếng Việt — vi phạm quy ước i18n ("link EN chỉ qua contentRoutes; chưa dịch thì ẩn"). Đo đạc trước khi sửa: **20/31 trang EN** mang link `/tu-dien/` route VI (kể cả các trang đã commit của launch pack; 3 bài GMT mới cũng dính).

Sửa (2 tệp): `remark-glossary-autolink` nhận thêm bảng `enLinks` (slug VI → URL EN lấy từ `ARTICLE_PAIRS` — nguồn duy nhất contentRoutes); trên tệp markdown EN: thuật ngữ có cặp → link route EN, **không tooltip tiếng Việt**; chưa có cặp → giữ nguyên văn, không link. Trang tiếng Việt giữ nguyên hành vi cũ.

Kết quả đo sau build (script tạm, đã xóa sau kiểm): toàn bộ 31 trang EN — 40/40 link route VI còn lại đều là **nút chuyển ngôn ngữ hợp lệ** (`hreflang="vi"` + `data-pagefind-ignore`); 3 trang GMT EN có **0** tooltip mang dấu tiếng Việt. Trang VI `dist/co-che/gmt/` giữ nguyên 4 autolink + 4 tooltip. Hành vi hover tooltip trên bài EN thay đổi so với launch pack trước (bỏ tooltip trên link autolink EN) — chấp nhận có chủ ý, ghi rõ đây.

## 4. Lệnh đã chạy và bằng chứng (build cục bộ, ngày 03/09/2026 — chạy lại đầy đủ sau vòng 2)

1. `npm run check` — **0 dòng khớp "LỖI/KHÔNG ĐẠT"** (đếm bằng grep trên toàn bộ output); chuỗi kết thúc bằng script mới: `KIỂM TRA NGUỒN CỤM GMT (check-gmt-source-integrity): … KẾT LUẬN: ĐẠT — cụm GMT thống nhất với hồ sơ nguồn (Rolex Newsroom, FHH).`
2. `npm run build` — `253 page(s) built` (+3 trang GMT EN); `Đã quét 253 trang HTML, 17579 link`, "OK: Không phát hiện link nội bộ hỏng"; chuỗi build kết thúc bằng check-evolution-routes: `rolex-gmt-master (vi+en, 8 mốc): VI 8 mốc · EN 8 mốc — khớp dataset` — `KẾT LUẬN: ĐẠT`. *(Số link thay đổi 17609 → 17579 so với vòng 1: chữ sửa trong các bài làm số autolink tự động thay đổi — không có link hỏng.)*
3. `node scripts/check-english-launch.mjs` — `Đủ 27 route English launch pack trong dist`; `KẾT LUẬN: ĐẠT — English launch pack đúng kiến trúc đa ngôn ngữ.` (nhóm tiêu chí gồm: không văn bản tiếng Việt trong Header/Footer/title/H1/CTA trang EN; hreflang chỉ khi cặp tồn tại; switcher mọi link tồn tại thật; Pagefind filter language).
4. `node scripts/check-evolution-routes.mjs` — 2 dataset vi+en 8/8 khớp — `KẾT LUẬN: ĐẠT`.
5. `node scripts/check-gmt-source-integrity.mjs` — chạy riêng lần cuối: `Quét 15 tệp phạm vi (13 nội dung chặt tuyệt đối + 2 hồ sơ với nhận diện ngữ cảnh lịch sử)`; 6 nhóm rule sạch (R1–R6); `KẾT LUẬN: ĐẠT`.
6. `git diff --check` — sạch.
7. `git status --short` — **đúng 17 tệp sửa (M) + 6 tệp mới (??) của gói = 23 tệp, khớp mục 1** (tệp sửa thứ 17 là `src/data/glossary-terms.json` — tệp tự sinh trước mỗi build, đổi theo excerpt mới của `tuDien/vi/gmt.md`); các tài liệu `??` cũ khác tồn tại từ trước, nằm ngoài phạm vi Prompt.

(`check-evolution-data` nằm trong chuỗi `npm run check` ở mục 1 — `Rolex GMT-Master: 8 mốc · xuất bản: vi+en / Rolex Submariner: 8 mốc · xuất bản: vi+en`.)

Tự rà phạm vi theo yêu cầu 7 của đề — quét grep toàn bộ 15 tệp phạm vi sau vòng 2: 0 kết quả cho các tổ hợp `1954` gắn GMT/Pan Am, `1983` gắn GMT-Master II, `Caller GMT`, `Flyer GMT`, `phi công Pan Am`/`Pan Am pilots`/`Pan Am yêu cầu`/`Pan Am lựa chọn`/`adopted by Pan Am`/`Pan Am cockpit`/`buồng lái Pan Am`, `2:1`, `mọi GMT`/`every GMT`/`all GMT` trên 13 tệp nội dung (các khớp duy nhất còn lại: "frequent flyers" trong 2 bài EN — tiếng Anh thông thường, không phải "Flyer GMT"; mốc Swatch quartz 1983 trong timeline.json — chủ thể khác, không gắn GMT; các dòng hồ sơ/biên bản mô tả lịch sử xử lý có ngữ cảnh phủ định rõ ràng). Quét trên trang build `dist/` ở vòng 1 đã xác nhận: 40/40 link route VI còn lại trong 31 trang EN đều là nút chuyển ngôn ngữ hợp lệ (`hreflang="vi"` + `data-pagefind-ignore`); tooltip tiếng Việt trên 3 trang GMT EN = 0. Vòng 2 KHÔNG chạy lại quét trình duyệt — chỉ build tĩnh + script nêu trên.

**Vòng 3 (03/09/2026, sau vòng 2 — sửa tối thiểu theo phản hồi):** bổ sung nguồn Rolex Newsroom — GMT-Master II vào frontmatter 2 bài vi (`huongDan/vi/doc-va-chinh-gmt.md`, `tuDien/vi/gmt.md` — giữ nguồn FHH hiện có); sửa 4 nhãn/câu liên kết còn mô tả "hai kiểu chỉnh" (`huongDan/vi` "Đọc thêm", `tuDien/vi` + `tuDien/en` câu dẫn bài cơ chế, `mauIconic/en` câu dẫn mechanism article); FAQ vi "GMT chỉ hai-ba múi giờ" → diễn đạt có điều kiện; excerpt 2 bài từ điển vi/en trung tính và tương đương; dọn câu "tệp sửa thứ 19" trong chính biên bản này. Tệp `src/data/glossary-terms.json` tự sinh lại theo excerpt mới khi build — đưa vào danh sách sửa (tệp thứ 17). Số tệp gói cuối cùng: **17 sửa + 6 mới = 23**, đối chiếu `git status`.

## 5. Checklist hiển thị (trạng thái minh bạch)

Phần dưới **CHƯA kiểm trong gói này** và cần làm thủ công khi đưa lên preview/deploy: trình duyệt thật cho cụm GMT (3 trang EN mới + 3 trang vi sửa + **infographic GMT và dụng cụ GmtReader sau khi đổi chữ** — render, dark mode, mobile, bàn phím, role="status" phát âm thanh đọc lại khi bấm nút), trình đọc màn hình thật, production đã deploy, dữ liệu Search Console. Những gì có bằng chứng trong gói giới hạn ở: build tĩnh, các script kiểm nêu ở mục 4 (gồm check-gmt-source-integrity quét mã nguồn), đo `dist/` ở vòng 1 nêu trên.

## 6. Phạm vi không đụng

- `output/` và các tài liệu `??` cũ — không mở, không stage.
- `src/data/rolexGmtMasterEvolution.ts`: chỉ sửa note mốc 1955 (vi/en) ở vòng 2 theo yêu cầu chuẩn hóa Pan Am; 8 mốc, số reference và hồ sơ dữ liệu tiến hóa (`docs/ho-so-du-lieu-tien-hoa-rolex-gmt-master.md`) giữ nguyên.
- Dụng cụ `GmtReader.astro`: vòng 2 chỉ sửa chữ hiển thị/ghi chú mô phỏng — logic mô phỏng, bố cục và ARIA hiện có không đổi.
- Bài EN không nhắc dụng cụ tương tác (GmtReader chỉ render tiếng Việt) — giữ nguyên cách viết tĩnh từ vòng 1.
