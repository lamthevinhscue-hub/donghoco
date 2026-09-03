# Biên bản nghiệm thu — Prompt 34: Cụm Chronograph & Tachymeter song ngữ có kiểm chứng nguồn

Ngày: 03/09/2026 · Trạng thái: **CHỜ COMMIT** (chưa commit, chưa push theo quy tắc làm việc)

## 1. Phạm vi thực hiện

Đề: chuẩn hóa 4 bài tiếng Việt theo nguồn, dịch thành 4 bài tiếng Anh, thêm hồ sơ nguồn, liên kết song ngữ, script chống hồi quy, cập nhật tài liệu — toàn bộ ở mức build tĩnh cục bộ, không deploy.

- **Chuẩn hóa vi trước khi dịch** (4 bài): `coChe/vi/chronograph.md`, `huongDan/vi/dung-tachymeter.md`, `tuDien/vi/chronograph.md`, `tuDien/vi/tachymeter.md`.
- **4 bài EN mới**: `coChe/en/chronograph.md` (route `/en/mechanisms/chronograph/`), `huongDan/en/using-a-tachymeter.md` (`/en/guides/using-a-tachymeter/`), `tuDien/en/chronograph.md` (`/en/glossary/chronograph/`), `tuDien/en/tachymeter.md` (`/en/glossary/tachymeter/`).
- **Hồ sơ nguồn**: `docs/ho-so-nguon-cum-chronograph-tachymeter-song-ngu.md` — bảng quyết định từng claim, ghi rõ giới hạn nguồn.
- **Liên kết song ngữ + kiểm**: `src/i18n/contentRoutes.ts` (+4 cặp), `scripts/check-english-launch.mjs` (27→31 route), `scripts/check-chronograph-cluster.mjs` (mới), `package.json` (script vào chuỗi check + alias `check:chronograph`).
- **Link ngược từ bài hiện có**: `mauIconic/en/omega-speedmaster.md` — thêm 2 dòng Related reading trỏ về bài cơ chế và hướng dẫn EN (tachymeter bezel là design signature của mẫu).

## 2. Dữ kiện đã chuẩn hóa (vi + đồng bộ en) — theo hồ sơ nguồn

| Claim cũ | Chuẩn mới | Nguồn nâng |
|---|---|---|
| "1817 Rieussec tạo chronograph viết mực cho vua Louis XVIII" (coChe) mâu thuẫn "Rieussec (1821)" (tuDien) | **1821** — trình diễn tại cuộc đua ngựa, rắc giọt mực, chính xác 1/5 giây; 1822 cấp bằng sáng chế; bỏ chi tiết vua sai mệnh đề | FHH encyclopedia Chronograph + entry Rieussec |
| "1816 Moinet chế tạo chronograph đầu tiên" | Giữ 1816, viết đúng: compteur de tierces, 1/60 giây, 216.000 vph (30 Hz), 2 nút, thiên văn; kèm "FHH coi đây là phát minh của chronograph" | FHH encyclopedia + entry Louis Moinet |
| "1969 — cuộc đua 3 dự án về đích cùng năm — El Primero, Calibre 11 (Heuer–Breitling–Hamilton), Seiko 6139" | Theo FHH: Chronomatic (Dépraz-Bürgen cho Breitling và Heuer-Leonidas) + El Primero (Zenith, đầu tiên chạy 36.000 vph); Seiko 6139 kèm chủ ngữ "theo Seiko… có thể là đầu tiên". Bỏ Hamilton, bỏ "3 dự án" | FHH encyclopedia; SEIKO Heritage |
| "đồng hồ đầu tiên lên Mặt Trăng 1969" | Giữ — có nguồn chính hãng Omega (trang Speedmaster + biên niên 1969), đưa vào `sources` | OMEGA |
| Bảng "Column wheel vs Cam" (Chế tạo/Cảm giác/Độ bền/Phân khúc + Rolex 4130, Patek CH 29, Valjoux 7750) + nhận định sưu tầm | Thay bằng so sánh có nguồn: column wheel = "kỹ thuật truyền thống", cam = "hệ thống hợp lý hơn"; ly hợp ngang/dọc; tích hợp vs module | FHH encyclopedia |
| "thường 9 cột", "1 bước (≈40°)", "tiếng click êm ái" | Bỏ số và cảm giác chủ quan; giữ mô tả định tính một bước | Không nguồn — bỏ |
| "công cụ của bác sĩ đo mạch, phi công, tài xế đua" | Viết lại theo FHH: flyback ra đời phục vụ phi công; thang đo pulsometer/tachymeter/telemeter/slide rule gắn cùng chronograph | FHH complications + encyclopedia |
| "Trước đó mọi chronograph đều lên dây tay"; "hữu dụng nhất"; "tinh tế bậc nhất" | Bỏ câu khái quát và xếp hạng; hạ về trung tính | FHH |
| tuDien: "2 nút bấm… sub-dials" như dấu hiệu chuẩn | "one or several pushbuttons, generally on the side of the case"; bố cục đa dạng; thêm mục phân biệt chronograph/stopwatch/chronometer | FHH encyclopedia + COSC |
| tachymeter: "đo tốc độ", "60 xuống 400" như dải chung, "dưới ~60 km/h khó đọc", "vô dụng", "di sản từ thời đồng hồ là công cụ đo" | "đọc **tốc độ trung bình** trên một quãng đường cố định" (định nghĩa Omega: km/h dựa trên quãng 1000 m); dải số chỉ nói về thang minh họa trong trang; giới hạn đọc theo dải số khắc trên thang | OMEGA tachymeter definition; FHH |
| Công thức "tốc độ = 3600 / thời gian" như quy tắc chung | Giữ ở mức thang chuẩn quãng một đơn vị, ghi rõ là phép tính suy từ định nghĩa Omega (không phải nguyên văn nguồn) | OMEGA + ghi nhận trong hồ sơ |

Không đụng `TachymeterTool.astro`: rà cho thấy công cụ đã mô tả đúng "tốc độ trung bình trên một quãng đường đã biết" và thang minh họa 60–400 — không cần sửa.

## 3. Quyết định kiến trúc theo đề

- Bài EN đặt `has_infographic: false`, `interactive: false` — infographic Chronograph và hoạt ảnh chỉ render tiếng Việt; bài EN guide tachymeter **viết tĩnh, không nhắc dụng cụ tương tác** (bài học từ Prompt 33).
- Bài EN coChe bỏ câu dẫn "trong hoạt ảnh trên" (không tồn tại trên trang EN) — mô tả ba pha bằng văn bản.
- Link EN chỉ qua `contentRoutes`: coChe EN → glossary EN + guide EN + Speedmaster EN; guide EN → mechanism EN + 2 glossary EN; tuDien EN → mechanism EN / guide EN. Monaco và El Primero chưa có bản EN → nhắc tên không link (không tự chế URL).
- Thang 60–400 trong bài được nêu rõ là **thang minh họa của trang**, dải thật tùy mẫu.

## 4. Lệnh đã chạy và bằng chứng (build cục bộ, ngày 03/09/2026)

1. `npm run check` — **0 dòng khớp "LỖI/KHÔNG ĐẠT"** (đếm bằng grep trên toàn bộ output); chuỗi kết thúc bằng `check-chronograph-cluster`: `KẾT LUẬN: ĐẠT — cụm Chronograph & Tachymeter khớp hồ sơ nguồn, không hồi quy` (R1 khái quát hóa · R2 dữ kiện 1821/không Hamilton · R3 claim "đầu tiên" có marker nguồn · R4 tachymeter có điều kiện · R5 không link EN→vi · 18 liên kết bắt buộc · frontmatter EN · 4 cặp route · hồ sơ + biên bản).
2. `npm run build` — `257 page(s) built` (+4 trang EN mới); `Đã quét 257 trang HTML, 17917 link` (17.917 sau vòng sửa: guide EN thêm lại 1 link FAQ), "OK: Không phát hiện link nội bộ hỏng"; chuỗi kết thúc bằng check-evolution-routes: `KẾT LUẬN: ĐẠT — mọi dataset song ngữ render đúng route, ngôn ngữ và số mốc`.
3. `node scripts/check-english-launch.mjs` — `Đủ 31 route English launch pack trong dist`; `35 trang EN đều có <html lang="en">`; canonical + og:locale en_US + inLanguage en đúng trên 35 trang EN; không văn bản tiếng Việt trong Header/Footer/title/H1/CTA; mọi hreflang và link switcher tồn tại thật — `KẾT LUẬN: ĐẠT`.
4. `node scripts/check-gmt-source-integrity.mjs` — R1–R6 sạch — `KẾT LUẬN: ĐẠT` (cụm GMT không hồi quy).
5. `node scripts/check-chronograph-cluster.mjs` — `KẾT LUẬN: ĐẠT` (chi tiết R1–R5 + liên kết ở mục 1).
6. `node scripts/check-evolution-data.mjs` + `node scripts/check-evolution-routes.mjs` — ĐẠT (GMT-Master 8 mốc, Submariner 8 mốc, vi+en).
7. `git diff --check` — sạch.

Kiểm bổ sung đã chạy (bằng chứng trích): 4 route EN mới trong `dist/` có title/H1 tiếng Anh (ví dụ `/en/mechanisms/chronograph/` — "Chronograph — the timing mechanism and the column wheel"), canonical đúng URL, hreflang vi+en+x-default trỏ đúng cặp; quét mọi `<a>` nội bộ route VI trên 4 trang EN — chỉ còn 2 link switcher mỗi trang (`hreflang="vi"` + `data-pagefind-ignore` + aria-label "Tiếng Việt"), 0 link nội dung về route vi; autolink trên trang EN chỉ link glossary EN (chronograph/tachymeter/movement/calibre), 0 tooltip tiếng Việt; `dist/sitemap-0.xml` gồm **35** URL `/en/` — đủ 4 URL mới; grep heading tiếng Việt trong 4 tệp md EN = 0 (giá trị `category`/`difficulty` còn dấu tiếng Việt trong frontmatter là enum theo schema — không hiển thị ra trang).

## 5. Checklist hiển thị (trạng thái minh bạch)

Phần dưới **CHƯA kiểm trong gói này**: trình duyệt thật cho 4 trang EN mới (render, dark mode, mobile, bàn phím), trình đọc màn hình thật, production đã deploy, dữ liệu Search Console. Những gì có bằng chứng trong gói giới hạn ở: build tĩnh, các script kiểm nêu ở mục 4, đo `dist/` bằng script.

## 6. Danh sách tệp thay đổi (đối chiếu `git status` sau khi chạy)

Nhóm Prompt 34:

| Tệp | Loại |
|---|---|
| `src/content/coChe/vi/chronograph.md` | sửa |
| `src/content/huongDan/vi/dung-tachymeter.md` | sửa |
| `src/content/tuDien/vi/chronograph.md` | sửa |
| `src/content/tuDien/vi/tachymeter.md` | sửa |
| `src/content/coChe/en/chronograph.md` | mới |
| `src/content/huongDan/en/using-a-tachymeter.md` | mới |
| `src/content/tuDien/en/chronograph.md` | mới |
| `src/content/tuDien/en/tachymeter.md` | mới |
| `src/content/mauIconic/en/omega-speedmaster.md` | sửa (2 dòng Related reading) |
| `src/i18n/contentRoutes.ts` | sửa (+4 cặp) |
| `scripts/check-english-launch.mjs` | sửa (27→31) |
| `scripts/check-chronograph-cluster.mjs` | mới |
| `package.json` | sửa (script cuối chuỗi check + alias) |
| `src/data/glossary-terms.json` | tự sinh (generator chạy trước build, excerpt tuDien/vi/tachymeter đổi) |
| `docs/ho-so-nguon-cum-chronograph-tachymeter-song-ngu.md` | mới |
| `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` | sửa (mốc mới, 35 route EN) |
| `docs/nghiem-thu/2026-09-03_nghiem-thu-cum-chronograph-tachymeter-song-ngu.md` | mới (biên bản này) |

Đối chiếu `git status --short` ngày 03/09/2026: nhóm Prompt 34 gồm đúng **17 tệp — 10 sửa (M) + 7 mới (??)** — khớp bảng trên 1:1 (commit nền của gói: `5468201`, Prompt 33 đã được anh commit trước khi bắt đầu Prompt 34; working tree không còn tệp chờ của gói GMT).

## 7. Phạm vi không đụng

- `output/` và các tài liệu `??` cũ — không mở, không stage.
- `src/data/timeline.json` — **ngoài phạm vi Prompt 34**: mốc 1969 ở trang /lich-su kể theo cách riêng ("ba dự án", nhắc Hamilton) mà hồ sơ nguồn của cụm này không nâng. Các bài trong cụm không lặp các mệnh đề đó. Nếu muốn đồng bộ mốc 1969, cần hồ sơ nguồn riêng ở gói sau.
- `src/components/interactive/TachymeterTool.astro` — không sửa (đã đúng trước khi bắt đầu gói).
- Bài iconic vi/en khác, 29 cặp cơ chế↔mẫu — giữ nguyên ngoài 2 dòng Related reading của Speedmaster EN.

## 8. Vòng sửa sau kiểm tra (03/09/2026) — hình học thang tachymeter và khẳng định cấu trúc

**Lỗi cũ** (do anh bắt trong vòng nghiệm thu): phần "Vì sao thang không chia đều" trong guide vi/en mô tả **ngược chiều** — guide Việt viết "Thời gian ngắn → ... vạch dày" rồi kết luận "vạch xa", "Thời gian dài → ... vạch thưa" rồi kết luận "vạch sát nhau"; guide Anh viết "short time ... marks spread out" / "long time ... marks bunch up". Nhầm giữa "khoảng cách các vạch trên mặt số" với "độ chênh giá trị tốc độ".

**Nguyên lý đúng** (đã áp đồng nhất Việt–Anh): kim giây quay đều theo thời gian, nên 5↔6 giây cách nhau **6°** trên mặt số — hai vạch **nằm gần nhau** dù giá trị chênh 720 → 600 km/h; 50↔55 giây cách nhau **30°** — hai vạch **nằm xa nhau** dù giá trị chỉ chênh 72 → khoảng 65 km/h. Kết luận đúng: vùng thời gian ngắn/tốc độ cao có vạch đặt gần nhau (giá trị thay đổi nhiều); vùng thời gian dài/tốc độ thấp có vạch đặt xa nhau (giá trị thay đổi ít). **Đây là sửa lỗi diễn đạt về vị trí vạch — công thức `3600 ÷ giây` không đổi.**

Các sửa khác trong vòng này:

- Bỏ khẳng định tuyệt đối: "tachymeter có cần chronograph — Có... chỉ là trang trí" → "để đọc trực tiếp cần một kim/thiết bị đo thời gian; chronograph là cách kết hợp phổ biến; một thang đơn lẻ không tự đo thời gian" (cả vi + en).
- Bỏ "vòng số ngoài cùng"/"the outermost ring" và "trên vành phổ biến hơn" → thang đặt trên bezel, rehaut hoặc mặt số **tùy mẫu**; cách đọc phụ thuộc thang và kim đo thời gian của đúng mẫu (cả vi + en, trong guide và từ điển).
- Ví dụ 1 dặm ghi rõ là nguyên tắc "mỗi thang gắn với đúng đơn vị quãng đường của nó" — không gán cho định nghĩa Omega (Omega chỉ nói km/h dựa trên 1000 m).
- Title 2 bài cơ chế: "Chronograph — Cơ chế bấm giờ" / "Chronograph — the timing mechanism" (bỏ "và bánh răng cột"/"and the column wheel"); giữ nguyên phần so sánh column wheel vs cam có điều kiện trong thân.
- Từ điển chronograph vi/en: câu đầu đổi thành "một hoặc nhiều nút bấm, thường ở cạnh vỏ"; nhãn link cuối bao quát cả column wheel, cam và nguyên lý ba pha thay vì chỉ "cơ chế bánh răng cột".
- `scripts/check-chronograph-cluster.mjs` bổ sung **R6**: bắt cặp ngược chiều (thời gian ngắn+vạch xa, thời gian dài+vạch sát, short time+marks spread, long time+marks bunch), khẳng định tuyệt đối ("requires a chronograph", "chỉ là trang trí", "just decoration", "only means something") và title cũ ("and the column wheel"/"và bánh răng cột"). Rule đã tự kiểm bằng 15/15 test case (câu lỗi cũ → báo lỗi; câu đúng mới → sạch); không áp lên hồ sơ/biên bản.
- Hồ sơ nguồn thêm mục 4 ghi nhận vòng sửa này.

Kết quả chạy lại sau sửa: xem mục 4 — các lệnh chạy lại toàn bộ, kết quả cập nhật cùng mục đó. Phần hiển thị ở mục 5 vẫn **CHƯA kiểm trình duyệt thật** trong vòng này.
