# Biên bản nghiệm thu — Prompt 35: Cụm "Sử dụng an toàn hằng ngày" song ngữ có kiểm chứng nguồn

Ngày: 03/09/2026 · Trạng thái: **CHỜ COMMIT** (chưa commit, chưa push theo quy tắc làm việc)

## 1. Phạm vi thực hiện

Đề: chuẩn hóa nguồn cho 6 bài Việt hiện có, xuất bản 6 bài English thật về vận hành và bảo quản cơ bản, thêm hồ sơ nguồn, liên kết song ngữ, script chống hồi quy, cập nhật tài liệu — toàn bộ ở mức build tĩnh cục bộ, không deploy.

- **6 bài Việt chuẩn hóa**: `huongDan/vi/len-day-dong-ho.md`, `huongDan/vi/muc-chong-nuoc.md`, `huongDan/vi/chinh-lich-an-toan.md`, `coChe/vi/chong-nuoc.md`, `tuDien/vi/num-van.md`, `tuDien/vi/day-cot.md`.
- **6 bài English mới**: `huongDan/en/winding-a-mechanical-watch.md`, `huongDan/en/water-resistance.md`, `huongDan/en/setting-the-date-safely.md`, `coChe/en/water-resistance.md`, `tuDien/en/crown.md`, `tuDien/en/mainspring.md` — routes `/en/guides/winding-a-mechanical-watch/`, `/en/guides/water-resistance/`, `/en/guides/setting-the-date-safely/`, `/en/mechanisms/water-resistance/`, `/en/glossary/crown/`, `/en/glossary/mainspring/`.
- **Hồ sơ nguồn**: `docs/ho-so-nguon-cum-su-dung-an-toan-song-ngu.md` — bảng claim → nguồn nâng / bỏ / viết lại.
- **Liên kết + kiểm**: `src/i18n/contentRoutes.ts` (+6 cặp), `scripts/check-english-launch.mjs` (31→37 route), `scripts/check-daily-care-cluster.mjs` (mới, vào cuối `npm run check` + alias `check:daily-care`), `package.json`.
- **first-mechanical-watch EN**: thêm 1 dòng "Where to go next" trỏ tới winding + water-resistance guide (2 trong 5 câu hỏi mua đầu tiên của chính bài đó).

## 2. Nguồn sử dụng và giới hạn

| Nguồn | Nâng đỡ chính | Giới hạn |
|---|---|---|
| OMEGA FAQ "Using your OMEGA watch" (web_reader) | gioăng ở crown/pushers/crystal/case, lão hóa + thay định kỳ, va chạm ảnh hưởng, screw-in crown luôn vặn lại, không bấm nút dưới nước + ngoại lệ Seamaster 300M/600M, rửa nước ngọt sau biển, nhiệt độ 0–60°C, check chống nước hằng năm + full service 5–8 năm, lên dây theo user manual, automatic dừng cần lên tay theo manual | chu kỳ 1 năm / 5–8 năm là **khuyến nghị của Omega cho sản phẩm Omega** — mọi câu kèm chủ ngữ hãng |
| SEIKO FAQ "Water Resistance" (web_reader) | bảng mức BAR → hoạt động cho sản phẩm Seiko (3BAR mưa/văng; 5BAR +bơi/tắm; 10–20BAR +tắm/lặn nông; Diver 200m +scuba; Pro 1000m +bão hòa), "not permanently guaranteed", không rửa khi núm kéo ra, tránh rửa trực tiếp dưới vòi nước chảy | bảng là **công bố của Seiko cho sản phẩm Seiko** — khác khuyến cáo phổ thông; bài trình bày kèm bảng quy đổi "tham khảo, không phải phép dùng chung" |
| SEIKO hướng dẫn Caliber 6L37 (web_reader) | "The date changes around 12 o'clock midnight"; nguyên văn cảnh báo "**Do not set the date between 9:00 p.m. and 1:00 a.m.**"; "Return the screw down crown fully to its original position" | khung 21:00–01:00 là **của calibre 6L37** — dùng làm ví dụ một calibre, không làm khung chung |
| FHH Crown + Barrel (web_reader) | định nghĩa crown "knurled or fluted… used to wind"; núm tích hợp nút chronograph; dây cót móc ngoài-vào-thùng/móc trong-vào-trục, bánh thùng ăn khớp bánh nhông đầu | — |
| ISO 22810 / 6425 (trong `sources` 2 bài chống nước) | tham chiếu tên chuẩn | **URL iso.org trả 403 cho công cụ tự động — không trích được nguyên văn**; các chi tiết số của chuẩn (ví dụ "test 125%") không được dùng làm claim; phần mô tả nâng bằng Seiko/Omega công khai |

## 3. Dữ kiện bị bỏ / viết lại (chi tiết đầy đủ ở hồ sơ nguồn, mục 2)

- **Bỏ toàn bộ số vòng lên dây** (20–40, 20–30, 10–15 vòng) và mục tiêu "vặn đến khi căng" → chỉ còn "theo manual của từng hãng" + nguyên tắc dừng khi gặp lực cản rõ, không ép.
- **Bỏ** "8 giờ/ngày tự đầy", "bỏ trên 2 ngày", "70h power reserve", "vặn cùng giờ mỗi ngày → chính xác hơn", "ma sát sinh nhiệt", "để cạn lâu biến dạng dây", "hầu hết không lên cót khi vặn ngược", "slipping mainspring", "stop-seconds", "3–5 năm gioăng", "test 24 giờ", dry/wet test, "cao cấp test cả hai", "FMK — Rolex/Omega dùng", ISO 6425 "125%".
- **Bảng mức chống nước → hoạt động**: đổi thành "bảng quy đổi phổ thông THAM KHẢO — không phải phép dùng chung", kèm bảng công bố của Seiko (BAR) và điều kiện công bố của Omega; mọi dòng gắn "manual của đúng mẫu".
- **Khung giờ cấm 20:00–04:00 phổ quát** → "khung giờ nên tránh tùy calibre", nguyên văn Seiko 6L37 (21:00–01:00) làm ví dụ; "quy tắc 6 giờ" hạ thành biện pháp phòng ngừa khi chưa tra được manual, không thay thế manual; dụng cụ minh họa được ghi rõ là "ví dụ minh họa".
- **"Tuyệt đối không bấm nút dưới nước"** → khuyến nghị kèm nguồn Omega + ngoại lệ Seamaster do chính hãng công bố.
- **"Waterproof"/chống nước vĩnh viễn** → "water resistance", lão hóa gioăng, "not permanently guaranteed" (Seiko); đồng hồ cũ "chưa được kiểm chứng" thay vì "coi như không chống nước".
- Title bài chỉnh lịch đổi thành "Cách chỉnh lịch an toàn — nguyên tắc và vùng nên tránh"; excerpt các bài hạ về trung tính.

`DateSafety.astro` và infographic chống nước **ngoài phạm vi Prompt 35** — không sửa; bài vi đã diễn đạt lại tham chiếu dụng cụ để tránh mâu thuẫn. `TachymeterTool`/`GmtReader` không liên quan.

## 4. Kiến trúc theo đề

- 6 bài EN: `has_infographic: false`, `interactive: false`; không nhắc công cụ/infographic chỉ render tiếng Việt; link EN chỉ trỏ route `/en/` có thật; Monaco/El Primero kiểu "chưa dịch → nhắc tên không link" áp dụng nhất quán (bài EN không link route vi, trừ switcher).
- Liên kết cụm EN theo đề: winding → crown/mainspring/water-resistance/first-watch; water-resistance guide → mechanism/crown/winding/first-watch; date-setting → crown/winding; mechanism → crown/guide; 2 glossary → mechanism/guide liên quan; first-mechanical-watch EN thêm đúng 1 dòng link mới.
- `check-english-launch.mjs`: REQUIRED_EN 31 → **37**.
- `check-daily-care-cluster.mjs`: R1 frontmatter, R2 route, R3 liên kết bắt buộc vi+en, R4 không link EN→vi, R5 khẳng định cấm (số vòng, "3–5 năm", khung giờ cấm chung, waterproof, automatic-không-cần-lên-dây, vặn-đến-căng, ngưỡng-không-kèm-manual, "tuyệt đối không bấm nút"), R6 hồ sơ + biên bản.

## 5. Lệnh đã chạy và bằng chứng (build cục bộ, ngày 03/09/2026)

1. `npm run check` — **0 dòng khớp "LỖI/KHÔNG ĐẠT"**; chuỗi kết thúc bằng `check-daily-care-cluster`: `KẾT LUẬN: ĐẠT — cụm sử dụng an toàn khớp hồ sơ nguồn, không hồi quy`.
2. `npm run build` — `263 page(s) built`; `Đã quét 263 trang HTML, 18455 link`, "OK: Không phát hiện link nội bộ hỏng"; kết thúc bằng check-evolution-routes ĐẠT.
3. `node scripts/check-english-launch.mjs` — `Đủ 37 route English launch pack trong dist` — KẾT LUẬN: ĐẠT.
4. `node scripts/check-gmt-source-integrity.mjs` — KẾT LUẬN: ĐẠT.
5. `node scripts/check-chronograph-cluster.mjs` — KẾT LUẬN: ĐẠT.
6. `node scripts/check-daily-care-cluster.mjs` — KẾT LUẬN: ĐẠT.
7. `node scripts/check-evolution-routes.mjs` — KẾT LUẬN: ĐẠT.
8. `git diff --check` — sạch.

Kiểm bổ sung trên `dist/` (bằng chứng trích): 6 route EN mới có title/H1 tiếng Anh, canonical + hreflang đúng cặp; sitemap gồm **41 URL `/en/`**; grep câu cấm ("waterproof", "chỉ là trang trí", khung 20:00–04:00 kèm từ cấm) trên 6 trang mới = 0; link route vi trên 6 trang EN chỉ còn switcher.

## 6. Checklist hiển thị (trạng thái minh bạch)

Phần dưới **CHƯA kiểm trong gói này**: trình duyệt thật cho 6 trang EN mới (render, dark mode, mobile, bàn phím), trình đọc màn hình thật, production đã deploy, dữ liệu Search Console. Bằng chứng trong gói giới hạn ở: build tĩnh, các script kiểm nêu ở mục 5, đo `dist/`.

## 7. Danh sách tệp thay đổi (đối chiếu `git status` sau khi chạy)

Nhóm Prompt 35:

| Tệp | Loại |
|---|---|
| `src/content/huongDan/vi/len-day-dong-ho.md` | sửa |
| `src/content/huongDan/vi/muc-chong-nuoc.md` | sửa |
| `src/content/huongDan/vi/chinh-lich-an-toan.md` | sửa |
| `src/content/coChe/vi/chong-nuoc.md` | sửa |
| `src/content/tuDien/vi/num-van.md` | sửa |
| `src/content/tuDien/vi/day-cot.md` | sửa |
| `src/content/huongDan/en/winding-a-mechanical-watch.md` | mới |
| `src/content/huongDan/en/water-resistance.md` | mới |
| `src/content/huongDan/en/setting-the-date-safely.md` | mới |
| `src/content/coChe/en/water-resistance.md` | mới |
| `src/content/tuDien/en/crown.md` | mới |
| `src/content/tuDien/en/mainspring.md` | mới |
| `src/content/huongDan/en/first-mechanical-watch.md` | sửa (1 dòng Where to go next) |
| `src/i18n/contentRoutes.ts` | sửa (+6 cặp) |
| `scripts/check-english-launch.mjs` | sửa (31→37) |
| `scripts/check-daily-care-cluster.mjs` | mới |
| `src/components/interactive/DateSafety.astro` | sửa (vòng 2 — đổi thành mô phỏng nguyên lý) |
| `package.json` | sửa (script cuối chuỗi check + alias) |
| `src/data/glossary-terms.json` | tự sinh (excerpt num-van/day-cot đổi) |
| `docs/ho-so-nguon-cum-su-dung-an-toan-song-ngu.md` | mới |
| `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` | sửa (mốc mới, 37 route EN) |
| `docs/nghiem-thu/2026-09-03_nghiem-thu-cum-su-dung-an-toan-song-ngu.md` | mới (biên bản này) |

Đối chiếu `git status --short` sau vòng 2 (xem mục 9): con số chính xác được ghi ở đó.

## 8. Phạm vi không đụng

- `output/` và các tài liệu `??` cũ — không mở, không stage.
- Infographic chống nước, các component tương tác khác ngoài DateSafety — không đụng.
- 17 tệp chờ commit của Prompt 34 — không đụng thêm.
- URL, slug, `contentRoutes.ts`, template, số cặp route — giữ nguyên như vòng 1.

## 9. Vòng sửa sau kiểm tra (03/09/2026) — chuẩn hóa tuyệt đối theo nguồn

**Lỗi cũ do anh bắt:** các bài còn hướng dẫn dạng quy tắc chung (bảng quy đổi chống nước 30m–300m, quy trình chỉnh lịch + "về 6 giờ", "dừng khi gặp lực cản rõ" như luật), và `DateSafety.astro` biến ví dụ minh họa 20:00–04:00 thành kết luận "Có thể chỉnh lịch / Không chỉnh lịch lúc này" cho mọi calibre. Ngoài ra script R4 không bao giờ chạy do điều kiện `f.endsWith('/en/')` sai.

**Đã sửa:**

- **Chỉnh lịch (vi/en + DateSafety)**: giữ nguyên văn Seiko 6L37 (21:00–01:00) luôn gắn "của calibre 6L37"; bỏ quy trình 6 bước, "đưa kim về 6 giờ", "nấc cuối/nấc giữa"; thay bằng: xác định mẫu/calibre → tìm manual hãng → không có thì nhờ dịch vụ có chuyên môn. Bỏ "một lần chưa chắc gây hỏng", "càng cố càng hỏng" và danh sách dấu hiệu hỏng không nguồn. DateSafety đổi thành mô phỏng nguyên lý: bỏ 5 nhãn kết luận, mọi nhãn/aria/trạng thái ghi "vùng minh họa", "20:00–04:00 · ví dụ" cạnh đồ họa, dẫn về manual.
- **Chống nước (4 bài)**: xóa bảng quy đổi chung; giữ bảng BAR của Seiko ghi rõ "cho đồng hồ Seiko"; bỏ "xà phòng/hóa chất không nằm trong điều kiện thử của hãng", "nhiều hãng khuyên tránh sauna", "nước làm chạy sai vì dây cót/dầu", "rỉ sét + chi phí sửa vượt kiểm tra"; thêm mục tách bạch "đã công bố / chưa có công bố".
- **Lên dây (vi/en)**: bỏ luật "dừng khi gặp lực cản rõ", chiều xoay/tiếng tách chỉ giữ với phạm vi Omega (bổ sung nguyên văn "When winding the crown clockwise…" vào hồ sơ); nguyên tắc thay thế: số vòng, chiều, điểm dừng theo manual; bất thường → dừng, liên hệ dịch vụ.
- **Script**: sửa bug R4 (`FILES.en.includes(f)`); thêm R5b quét DateSafety (cấm 5 nhãn kết luận, bắt buộc nhãn "vùng minh họa" + nhắc manual); cấm "bảng quy đổi/conversion table" và dòng bảng m-level gắn hoạt động trong 4 bài chống nước; cấm "về 6 giờ / around 6 o'clock" trong 2 bài chỉnh lịch. **Xác minh R4 thật**: tiêm link vi thử vào `tuDien/en/crown.md` → script báo đúng `[R4] …:35`; khôi phục → ĐẠT.

Kết quả chạy sau vòng 2 — xem mục 10.

## 10. Kết quả kiểm sau vòng 2 (bằng chứng thật, ngày 03/09/2026)

1. `npm run check:daily-care` — `KẾT LUẬN: ĐẠT — cụm sử dụng an toàn khớp hồ sơ nguồn, không hồi quy` (42 liên kết bắt buộc, R4/R5/R5b sạch).
2. `npm run check` — **0 dòng khớp "LỖI/KHÔNG ĐẠT"** (đếm grep trên toàn bộ output).
3. `npm run build` — `263 page(s) built`; `Đã quét 263 trang HTML, 18426 link` (giảm so với 18.455 do vòng 2 xóa bảng quy đổi và các đoạn lý do không nguồn), "OK: Không phát hiện link nội bộ hỏng"; chuỗi kết thúc bằng check-evolution-routes ĐẠT.
4. `git diff --check` — sạch.
5. `git status --short` — nhóm Prompt 35 sau vòng 2 gồm **22 tệp — 13 sửa (M) + 9 mới (??)** — khớp bảng mục 7 (vòng 2 thêm `DateSafety.astro` vào danh sách sửa; `scripts/check-daily-care-cluster.mjs` và các tệp docs vẫn giữ loại "mới" từ vòng 1). `LO-TRINH` + `glossary-terms.json` vẫn chứa thay đổi của cả P34 và P35 — ghi chú commit ở vòng 1 giữ nguyên.
- Các bài vi/en khác ngoài danh sách phạm vi — không đụng.
