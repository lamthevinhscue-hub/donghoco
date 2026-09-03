# Hồ sơ nguồn — Cụm GMT song ngữ (Prompt 33, vòng chuẩn hóa 2)

Ngày rà soát: 01/09/2026 · Vòng 2 bổ sung: 03/09/2026 · Commit nền: `fe917eb`

Phạm vi: 6 bài GMT vi/en (`coChe`, `huongDan`, `tuDien`), bài iconic Rolex GMT-Master vi/en, `thuongHieu/vi/rolex.md`, `src/data/timeline.json`, `src/data/rolexGmtMasterEvolution.ts`, **infographic `src/components/infographics/glossary/GMT.astro`, công cụ tương tác `src/components/interactive/GmtReader.astro`**, và 2 tài liệu (hồ sơ này + biên bản).

## 0. Cập nhật vòng 2 (03/09/2026) — chuẩn hóa mở rộng sang bề mặt hiển thị

Vòng 1 chuẩn hóa 6 bài + dữ liệu; vòng 2 chuẩn hóa **toàn bộ nội dung độc giả nhìn thấy**, gồm:

- **Infographic `GMT.astro`**: đã loại các nội dung sai — Pan Am "yêu cầu năm 1954", GMT-Master II "1983", danh sách Tudor Black Bay GMT/Grand Seiko GMT/Omega Aqua Terra GMT (không có nguồn trong cụm), và câu "bánh răng tỷ lệ 2:1" như cơ chế chung. Lịch sử trên infographic được chuẩn hóa: GMT-Master ra mắt 1955; trở thành đồng hồ chính thức của hãng hàng không Pan Am; GMT-Master II có bộ máy mới năm 1982 cho phép chỉnh kim giờ độc lập. Infographic dán nhãn minh họa: đây là minh họa nguyên lý hiển thị của GMT có vành 24 giờ xoay, không phải mô phỏng thao tác chính xác cho mọi calibre.
- **Công cụ tương tác `GmtReader.astro`**: các mô tả "3 múi giờ"/"múi giờ thứ ba" thay bằng mô tả có điều kiện ("múi giờ thay thế" — chỉ trên mẫu có vành 24 giờ xoay); nút chỉnh kim được ghi rõ là **mô phỏng quan hệ hiển thị, không thay thế hướng dẫn của nhà sản xuất**; tiêu đề + aria-label + status text đồng bộ.
- **Nguyên lý hiển thị chuẩn hóa cả hai ngôn ngữ**: bỏ câu "kim GMT luôn đồng bộ với kim giờ" / "stays in step with the hour hand"; chỉ giữ: kim GMT hoàn thành một vòng trong 24 giờ, quan hệ thiết lập giữa các kim tùy calibre. Bỏ khẳng định "đọc được 2-3 múi giờ" như thuộc tính phổ quát — GMT cơ bản hiển thị múi giờ thứ hai; chỉ mẫu có vành 24 giờ xoay mới đọc thêm một múi giờ thay thế qua vành. Thang 24 giờ có thể nằm trên vành hoặc vị trí khác tùy mẫu — không ngầm định mọi GMT có bezel xoay.
- **Cách chỉnh**: đã loại hoàn toàn đoạn Caller GMT/Flyer GMT (kể cả ghi chú về tên gọi không chính thức — hồ sơ không có nguồn nâng các nhận định đó) và mô tả "kiểu chỉnh riêng kim GMT" như nguyên tắc phổ quát. Chỉ giữ dữ kiện có nguồn: Rolex GMT-Master II (1982) — kim giờ địa phương nhảy từng giờ qua núm vặn, không ảnh hưởng kim phút, kim giây và kim 24 giờ; mọi bài luôn yêu cầu đọc tài liệu của đúng calibre/mẫu trước khi chỉnh.
- **Pan Am chuẩn hóa 5 bề mặt**: bài iconic vi/en (câu "được phi công Pan Am nhanh chóng lựa chọn" / "quickly adopted by pilots" → "trở thành đồng hồ chính thức của hãng hàng không Pan American World Airways (Pan Am)"), `thuongHieu/vi/rolex.md` (dòng lineHistory 1955), `timeline.json` ("đồng hồ chính thức của phi công Pan Am" → "của hãng hàng không Pan Am"), `rolexGmtMasterEvolution.ts` (note mốc 1955 vi/en). Ẩn dụ "buồng lái Pan Am" ở phần kết iconic thay bằng "buồng lái đường dài" — tên Pan Am chỉ giữ ở các câu có nguồn nâng đỡ trực tiếp.
- **Chống tái phát**: `scripts/check-gmt-source-integrity.mjs` quét 15 tệp phạm vi (đã vào `npm run check`) — quyết định chặn các tổ hợp đã bắt lỗi: R1 năm sai gắn GMT/Pan Am, R2 năm sai gắn GMT-Master II, R3 tên gọi không chính thức, R4 sai quy tắc Pan Am, R5 khái quát hóa cấu trúc, R6 tỷ lệ bánh răng như quy tắc chung.

## 1. Nguồn đã tra và nguyên văn nâng đỡ

### Rolex Newsroom — GMT-Master II (tra 01/09/2026, web_reader)

URL: <https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii>

Nâng đỡ:

- **Năm ra mắt GMT-Master là 1955**: nguyên văn "Launched in **1955** and designed as a navigation aid for professionals criss-crossing the globe…".
- **Pan Am**: trang ghi GMT-Master "became the official watch of Pan American World Airways (Pan Am)" — chỉ nâng đúng mệnh đề này; mệnh đề kiểu "Pan Am đặt hàng/yêu cầu" kèm năm sai nguồn không nâng — đã loại khỏi cụm.
- **Năm 1982 ra GMT-Master II**: nguyên văn "In **1982**, Rolex introduced a new movement that allowed the hour hand to be set independently of the other hands… named the GMT-Master II."
- **Kiểu chỉnh của GMT-Master II**: nguyên văn mô tả kim giờ "jumping from hour to hour thanks to a mechanism operated via the winding crown", chỉnh độc lập kim phút/giây, "without affecting the 24-hour hand" — nâng: kim giờ địa phương nhảy từng nấc một giờ, kim 24 giờ đứng yên.
- **Cách đọc vành**: "When the bezel is in the neutral position, that is with the triangle at 12 o'clock, the 24-hour hand displays a reference time… read using the graduations on the bezel"; "The time in an alternative time zone can be displayed by simply turning the rotatable bezel. In this case, the reference time is no longer shown" — nâng: vị trí trung lập = đọc giờ tham chiếu qua vành; xoay vành = đọc múi giờ khác qua kim 24 giờ đối vạch; khi đó giờ tham chiếu không còn hiển thị qua vành.

Không nâng: năm 1954; Caller/Flyer; "mọi GMT dùng bánh răng 2:1 giống nhau"; biệt danh sưu tầm.

### Fondation de la Haute Horlogerie — Watch complications (curl 200; rà các đợt trước)

URL: <https://www.hautehorlogerie.org/en/watches-and-culture/library/watch-complications>

Nâng đỡ:

- Định nghĩa tổng quát: GMT/dual time = kim phụ chỉ giờ nhà trên thang 24 giờ, kim giờ/phút chỉ giờ địa phương.
- Nguyên lý hiển thị: kim phụ đi 1 vòng/24 giờ — nửa tốc độ kim giờ.
- Cấu trúc (một cách làm, không quy tắc chung): mô tả tách cặp bánh giờ để chỉnh lệch từng nấc một giờ, và ở cấu trúc đó "if one of the wheels rotates in 24 hours, a pinion halves this rotational speed" — chỉ được trích như **một cấu trúc thường gặp**, kèm chữ "tùy calibre".
- Đọc vành: xoay vành để mốc đối diện giờ của múi giờ cần đọc — nguyên tắc tổng quát, không công thức chiều/nấc cố định.

Không nâng: năm ra mắt của mẫu Rolex; Caller/Flyer; biệt danh.

### Nguồn không dùng làm bằng chứng cho cụm này

- **Rolex.com trang sản phẩm GMT-Master II** (curl 403): chỉ tham chiếu trong `sources` các bài iconic có sẵn; không dùng làm bằng chứng dữ kiện mới trong cụm.
- **Hodinkee Reference Points GMT**: là nguồn của dataset sơ đồ tiến hóa (`rolexGmtMasterEvolution.ts`, hồ sơ dữ liệu riêng `docs/ho-so-du-lieu-tien-hoa-rolex-gmt-master.md`) — cụm này **không** mượn Hodinkee nâng thêm claim mới; số reference (6542…) chỉ tồn tại trong dataset và hồ sơ của nó.
- Không dùng nguồn thương mại/đấu giá/sưu tầm làm bằng chứng duy nhất; không có dữ kiện giá, độ hiếm, đầu tư trong cụm.

## 2. Mâu thuẫn đã xử lý và quyết định

| Mâu thuẫn cũ | Quyết định | Căn cứ |
|---|---|---|
| 1954 (coChe vi, tuDien vi, timeline.json) vs 1955 (iconic vi/en, dataset, Rolex) | Chuẩn hóa **1955**; bỏ mệnh đề "Pan Am yêu cầu năm 1954" | Rolex Newsroom nguyên văn "Launched in 1955" |
| 1983 (coChe vi) vs 1982 (iconic, dataset, Rolex) | Chuẩn hóa **1982** | Rolex Newsroom "In 1982, Rolex introduced…" |
| "Caller GMT vs Flyer GMT" gán kiểu đảo chiều, gọi GMT-Master II là "chuẩn mực Flyer" | Bỏ tên làm quy tắc; vòng 2 đã loại cả ghi chú về "tên gọi ngoài thị trường không thống nhất" (hồ sơ không có nguồn nâng các nhận định đó). Cách chỉnh chỉ trình bày: đặc tính của từng calibre + yêu cầu đọc tài liệu đúng mẫu + dữ kiện có nguồn của GMT-Master II (1982, kim giờ nhảy từng giờ không đụng kim 24h) | Rolex Newsroom mô tả "jumping from hour to hour… without affecting the 24-hour hand"; không dùng tên gọi thị trường |
| "Bộ bánh răng trung gian tỷ lệ 2:1" như quy tắc chung + câu "kim GMT luôn đồng bộ với kim giờ" | Viết lại thành **nguyên lý hiển thị** (kim 24h = 1 vòng/24h, nửa tốc độ kim giờ; bỏ cả câu "luôn đồng bộ"); cấu trúc bánh răng chỉ kể như một cách làm thường gặp (FHH) với chữ "tùy calibre"; vòng 2 áp cho cả infographic | FHH mô tả một cấu trúc cụ thể, không khái quát |
| Ví dụ đọc vành "xoay 5 vạch → 17:00 (hoặc 7:00 tùy chiều)" | Bỏ ví dụ số; thay bằng **nguyên tắc tổng quát** (xoay vành để kim GMT trùng giờ thành phố trên vạch vành; chiều/số nấc theo độ chênh thật; khi dùng vành, giờ nhà không còn đọc qua vành; về trung lập = tam giác về 12) | Rolex Newsroom (trung lập/xoay vành/giờ tham chiếu ẩn); hình học thang 24h không cho phép công thức "xoay N vạch" chung |
| Biệt danh "Pepsi"/"Batman"/"Coke" (coChe vi, tuDien vi, thuongHieu vi) | Bỏ biệt danh; mô tả "hai nửa màu khác nhau phân biệt ngày/đêm" | Quy tắc cụm + hồ sơ dataset GMT-Master ("Không dùng biệt danh sưu tầm") |
| Ví dụ Tudor Black Bay GMT / Omega Aqua Terra GMT / Grand Seiko GMT | Bỏ khỏi cụm (không có nguồn trong cụm nâng tên mẫu cụ thể) | "Thà thiếu còn hơn sai" |
| Link "mốc 1954 trong timeline" trong coChe vi | Bỏ link kèm năm; timeline.json được chuẩn hóa 1955 riêng | Rolex Newsroom |

## 3. Phạm vi đã đụng ở vòng 2 (bổ sung)

- `src/components/infographics/glossary/GMT.astro` + `src/components/interactive/GmtReader.astro`: chuẩn hóa toàn bộ chữ hiển thị (xem mục 0).
- `mauIconic/en/rolex-gmt-master.md`: vòng 1 đã sửa câu "gear pair 2:1" thành nguyên lý hiển thị; vòng 2 chuẩn hóa tiếp 3 chỗ Pan Am (Origins, Milestones, phần kết) và thêm link bài cơ chế GMT.
- `mauIconic/vi/rolex-gmt-master.md`: vòng 2 chuẩn hóa 3 chỗ Pan Am (Bối cảnh, Cột mốc, phần kết ẩn dụ "buồng lái Pan Am" → "buồng lái đường dài").
- `src/data/rolexGmtMasterEvolution.ts`: vòng 2 đã sửa note mốc 1955 (vi/en) — cụm chữ cũ "phi công Pan Am lựa chọn" đã loại, thay bằng "trở thành đồng hồ chính thức của hãng hàng không Pan Am". Các mốc khác không đụng; hồ sơ dữ liệu tiến hóa (`docs/ho-so-du-lieu-tien-hoa-rolex-gmt-master.md`) vẫn là nguồn duy nhất của dataset.
- Các mốc 1954/1983 của chủ thể khác (Polerouter 1954, AP Royal Oak calendar 1983–84, Swatch quartz 1983…): khác chủ thể, không phải mâu thuẫn — script nhận diện qua ngữ cảnh, không báo nhầm.

## 4. Ghi nhận còn treo

- Dụng cụ tương tác GmtReader chỉ render tiếng Việt; bài hướng dẫn tiếng Anh không nhắc dụng cụ, viết dưới dạng hướng dẫn đọc tĩnh (trung thực với những gì độc giả EN thấy trên trang).
- Hướng dẫn thao tác chỉnh cụ thể (nấc núm, thứ tự vị trí) luôn thuộc tài liệu của từng calibre/mẫu — cụm GMT chỉ trình bày nguyên lý và dữ kiện có nguồn; không mô tả thao tác chỉnh nào như áp dụng chung.
