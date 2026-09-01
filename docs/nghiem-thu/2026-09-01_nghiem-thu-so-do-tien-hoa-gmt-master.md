# Biên bản nghiệm thu — Sơ đồ tiến hóa Rolex GMT-Master và chuẩn hóa hạ tầng timeline

- **Ngày:** 01/09/2026
- **Phạm vi gói:** sơ đồ tiến hóa thứ hai (GMT-Master) + chuẩn hóa hạ tầng sơ đồ tiến hóa thành hệ thống dùng chung + script kiểm dữ liệu tự động.
- **Commit nền khi bắt đầu gói:** `ee5b480` — "feat(content): bổ sung iconic complication" (working tree sạch tại thời điểm bắt đầu).
- **Trạng thái cuối gói: CHƯA COMMIT, CHƯA PUSH** — chờ anh Vinh kiểm độc lập.

---

## 1. Danh sách tệp tạo / sửa

| Tệp | Thao tác | Nội dung |
|---|---|---|
| `docs/ho-so-du-lieu-tien-hoa-rolex-gmt-master.md` | **tạo** | Hồ sơ dữ liệu nguồn — nguồn dữ liệu chuẩn duy nhất của sơ đồ GMT-Master (3 nguồn truy trực: 2 chính hãng + 1 chuyên ngành; bảng dữ kiện; bảng cần kiểm chứng; mốc bị loại có lý do; đối chiếu bài đang xuất bản) |
| `src/data/modelEvolution.ts` | **tạo** | Hạ tầng tổng quát: kiểu `ModelEvolutionMilestone` / `ModelEvolutionDataset`, sổ đăng ký dataset, hàm `getEvolutionDataset(slug, lang)` — điều kiện render nằm ở một chỗ duy nhất (chỉ `vi`, chỉ slug đăng ký) |
| `src/data/submarinerEvolution.ts` | sửa | Đổi từ mảng mốc rời sang dataset theo kiểu chung (`slug`, `name`, `title`, `intro`, `milestones`). **8 mốc Submariner giữ nguyên từng trường dữ kiện** — so từng chuỗi đã xác nhận (mục 4) |
| `src/data/rolexGmtMasterEvolution.ts` | **tạo** | Dataset 8 mốc GMT-Master, trích từ hồ sơ dữ liệu |
| `src/components/ModelEvolution.astro` | **tạo** | Component tổng quát thay thế `SubmarinerEvolution.astro`: nhận dataset, `<section>` + `<ol>` + `<li>` HTML thật, lưới động theo số mốc (`--evol-cols`), chế độ không-JS hiển thị danh sách dọc đầy đủ |
| `src/components/SubmarinerEvolution.astro` | **xóa** | Thay bằng `ModelEvolution.astro` (đã grep — không còn tham chiếu ngoài ghi chú lịch sử trong component mới) |
| `src/pages/mau-iconic/[slug].astro` | sửa | Render qua `getEvolutionDataset(slug, lang)` — chỉ `vi` + slug có dataset; bình luận cập nhật |
| `scripts/check-evolution-data.mjs` | **tạo** | Kiểm dữ liệu mọi dataset (chi tiết mục 5) |
| `package.json` | sửa | Thêm `check-evolution-data.mjs` vào chuỗi `npm run check` (trước `check-editorial-links`) |
| `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` | sửa | Ưu tiên 1: phản ánh 2 sơ đồ đã xuất bản, hạ tầng dùng chung, quy tắc nhân rộng theo hồ sơ dòng |

Không đụng: bài viết `rolex-gmt-master.md` (không có dữ kiện sai cần sửa — mục 7), `CAN-KIEM-CHUNG.md` (không phát hiện dữ kiện đang xuất bản có nguy cơ sai — mục 7), tệp docs/ và `output/` cũ của anh.

## 2. Nguồn của sơ đồ GMT-Master

| ID | Nguồn | Loại | Phương pháp xác minh (01/09/2026) |
|---|---|---|---|
| G1 | Rolex — trang GMT-Master II (rolex.com) | Chính hãng | HTTP 403 cho curl (chặn bot); nội dung xác minh nguyên văn qua trình đọc trang — trang truy cập được như người dùng thực |
| G2 | Rolex Newsroom — GMT-Master II | Chính hãng | Như G1; trích nguyên văn các mốc 1955, 1959 (bay), 1982, 2013, 2014, 2018, 2022, 2023, 2025 |
| G3 | Hodinkee — Reference Points: Understanding The Rolex GMT-Master | Chuyên ngành | HTTP 200 trực tiếp; nguyên văn mọi reference/dải sản xuất |

Phân bổ theo quy tắc đề bài: mốc có dữ kiện Rolex tự công bố → nguồn chính hãng (G1/G2); reference và dải sản xuất mà Rolex không công bố → đối chiếu G3 (chuyên ngành). Không mốc nào dựa vào nguồn thị trường.

## 3. Bảng mốc GMT-Master thực sự xuất bản (8 mốc)

| # | Năm | Reference | Thay đổi chính | Nguồn | Lý do chọn |
|---|---|---|---|---|---|
| 1 | 1955 | 6542 | GMT-Master đầu tiên: vỏ Oyster, vành 24 giờ hai màu đỏ – xanh trên nền nhựa Bakelite | Hodinkee (ref/Bakelite); năm 1955 + Pan Am khớp Rolex chính hãng | Mốc khai sinh của dòng, đề gợi ý trực tiếp |
| 2 | 1959 | 1675 | Vành che núm (crown guards), insert vành kim loại thay Bakelite | Hodinkee ("in production from 1959 until 1980") | Bước nhảy dáng vỏ — đề gợi ý "thế hệ có crown guard" |
| 3 | 1982 | 16760 | GMT-Master II đầu tiên — kim giờ chỉnh độc lập từng giờ, không dừng máy | Rolex Newsroom (năm + tính năng); ref đối chiếu Hodinkee | Cột mốc kỹ thuật lớn nhất dòng — đề gợi ý trực tiếp |
| 4 | 1989 | 16710 | GMT-Master II thế hệ 5 chữ số, vỏ mỏng, bộ máy 3185 | Hodinkee ("1989–2007") | Đại diện thế hệ 5 số — đề gợi ý "nếu xác minh được" |
| 5 | 2005 | GMT-Master II kỷ niệm 50 năm (bản vàng) | Cerachrom gốm đơn màu đầu tiên của dòng | Hodinkee (nguyên văn mốc kỷ niệm 50 năm, gốm đơn màu đen, bản vàng) | Đề gợi ý "mốc vành Cerachrom"; reference bản vàng chưa được nguồn thứ hai xác nhận nên ghi theo mô tả, không gán số |
| 6 | 2013 | 116710BLNR | Insert gốm hai màu đầu tiên sản xuất đơn khối (xanh – đen) | Rolex Newsroom ("first two-colour Cerachrom… monobloc"); ref Hodinkee | Mốc gốm hai màu đầu — hai nguồn khớp nhau |
| 7 | 2014 | 116719BLRO | GMT-Master II vàng trắng, insert Cerachrom đỏ – xanh | Rolex Newsroom + rolex.com ("revived the emblematic colour pairing"); ref Hodinkee | Hồi sinh màu gốc — hai nguồn chính hãng khớp |
| 8 | 2018 | 126710BLRO | Vành đỏ – xanh bản thép; bộ máy 3285 (70 giờ); dây Jubilee trở lại | Hodinkee (chi tiết 3285/70 giờ/Jubilee); 2018 của Newsroom là mốc màu nâu – đen (xem bảng loại) | Nền kỹ thuật của thế hệ đang bán — đề gợi ý "thế hệ hiện hành" |

## 4. Mốc chủ động KHÔNG đưa (kèm lý do)

| Reference / mốc | Lý do |
|---|---|
| 16750 (1980–1988) | Đủ nguồn nhưng mốc chuyển tiếp của nhánh GMT-Master thường, trùng khung 1982–88 với 16760 — rủi ro nhầm GMT-Master vs GMT-Master II mà đề cảnh báo |
| 16700 (1988–1999) | Đủ nguồn nhưng trùng thời điểm 1988 với mốc đã chọn, thuộc nhánh GMT-Master thường ngừng phát triển |
| 116710LN thép (2007) | Bước kỹ thuật (gốm đơn màu) đã thể hiện ở mốc 2005; thêm làm sơ đồ dày mà không đổi câu chuyện |
| 2018 insert nâu – đen Everose | Dữ kiện chính hãng có nhưng là biến thể màu; năm 2018 đã đại diện bằng mốc thép + 3285 (bước nhảy bộ máy/dây) |
| 2022 mão trái, 2023 xám – đen, 2025 mặt số gốm | Dữ kiện chính hãng có; reference chưa đối chiếu được bằng nguồn chuyên ngành truy trực trong đợt này và thế hệ đang bán chưa kết thúc vòng đời — bổ sung sau khi có hồ sơ kiểm chứng riêng |
| 1959 chuyến bay New York – Moscow | Dữ kiện hàng không, không phải thay đổi thiết kế |
| Biệt danh "Pepsi/Batman/Batgirl/Coke" | Cách gọi giới sưu tầm — sơ đồ mô tả bằng tên màu |
| Chi tiết kiện/truyền thông thu hồi bezel Bakelite | Không có trong bất kỳ nguồn đã truy trực tiếp nào của hồ sơ — không đưa cho tới khi có nguồn trực tiếp |

## 5. Script kiểm dữ liệu `check-evolution-data.mjs`

Kiểm mọi tệp dataset trong `src/data/` (trừ tệp hạ tầng `modelEvolution.ts`): đủ 7 trường mỗi mốc; `year` là số hợp lệ; thứ tự thời gian tăng dần; không trùng tổ hợp năm + reference; `sourceUrl` HTTPS; không chuỗi rỗng; mỗi dataset tối thiểu 3 mốc; component không chứa dữ kiện cứng (không `year:`/`sourceUrl:` trong `ModelEvolution.astro`). Không khóa cứng số mốc của dataset nào.

Kết quả chạy độc lập:

```text
Sơ đồ tiến hóa hợp lệ:
  - Rolex GMT-Master: 8 mốc
  - Rolex Submariner: 8 mốc
```

Đã thêm vào `npm run check` (chạy trước `check-editorial-links`).

## 6. Xác nhận 8 mốc Submariner không đổi về dữ kiện

So từng trường của 8 mốc trong `submarinerEvolution.ts` mới với bản trước khi chuẩn hóa: **year, reference, label, change, note, sourceUrl, sourceName đều giữ nguyên từng ký tự**. Nghiệm thu trình duyệt bổ sung: trang `/mau-iconic/rolex-submariner/` hiển thị đủ 8 nút mốc (1953|6204, 1959|5512, 1962|5513, 1969|1680, 1979|16800, 1988|16610, 2012|114060, 2020|124060) và 8/8 chuỗi `change` nguyên văn đúng — Playwright 9/9 phép kiểm dữ kiện.

Thay đổi chỉ ở cách tổ chức code: mảng mốc bọc trong dataset có `slug/name/title/intro`; tương tác chọn mốc giữ nguyên hành vi (Playwright: bấm mốc 3 → `data-selected=3`, đúng 1 chi tiết hiện, `aria-pressed` dời đúng).

## 7. Đối chiếu bài đang xuất bản / CAN-KIEM-CHUNG

- `rolex-gmt-master.md`: đối chiếu từng dữ kiện timeline đang hiển thị (1955, Pan Am, GMT 1884, 1982 kim độc lập, 2014 đỏ – xanh Cerachrom, vành hai màu ngày/đêm) — **khớp nguồn, không phát hiện dữ kiện sai nghiêm trọng** → không sửa bài (đúng phạm vi đề A.5). Chi tiết bảng đối chiếu ở hồ sơ dữ liệu mục 6.
- `CAN-KIEM-CHUNG.md`: không có dữ kiện đang xuất bản nào phát hiện nguy cơ sai trong gói này → **không sửa** (đúng điều kiện đề E.3).

## 8. Kiểm tra giao diện (Playwright trên preview sau build, port 4321)

| Phép kiểm | Kết quả |
|---|---|
| Submariner: section hiện, 8 nút + 8 chi tiết, `data-js` bật | ĐẠT |
| Submariner: 9/9 chuỗi dữ kiện nguyên vẹn trong trang | ĐẠT |
| Tương tác desktop: bấm mốc 3 → đúng 1 chi tiết hiện (1969 · 1680), aria-pressed dời đúng | ĐẠT |
| GMT-Master: 8 mốc đúng thứ tự 1955→2018, đúng reference, 8 link nguồn (2 URL: Hodinkee, Rolex Newsroom), 0 biệt danh sưu tầm | ĐẠT |
| Bài khác (royal-oak, omega-speedmaster, patek-nautilus): 0/3 có section sơ đồ — không hiện section trống | ĐẠT |
| Sáng/tối: body `rgb(251,251,248)` ↔ `rgb(17,21,25)`; thẻ chi tiết có nền riêng ở chế độ tối `rgb(32,39,45)` | ĐẠT |
| Bàn phím: Tab tới link "Xem nguồn: Hodinkee" — focus outline `solid 2px`, hiển thị, `rel="noopener noreferrer"` | ĐẠT |
| `prefers-reduced-motion: reduce` → transition `1e-05s` (tức thời); `no-preference` → `0.12s` | ĐẠT |
| 320px: 2 trang sơ đồ scrollWidth = 320 (không tràn) | ĐẠT |
| 375px: 2 trang sơ đồ scrollWidth = 375 (không tràn) | ĐẠT |
| Zoom 200% (viewport 640 tương đương 1280@200%): không tràn | ĐẠT |
| Console 404: chỉ lỗi cố hữu `/_vercel/insights/script.js` (analytics chỉ chạy production); 0 lỗi mới | ĐẠT |

## 9. Kiểm tra bắt buộc

- `node scripts/check-evolution-data.mjs` — ĐẠT (báo cáo 2 dataset × 8 mốc).
- `node scripts/check-editorial-links.mjs` — ĐẠT (69 iconic, 18 cơ chế, 29 cặp hai chiều).
- `npm run check` — ĐẠT toàn chuỗi (gồm script mới).
- `npm run build` — ĐẠT: **221 trang**, "OK: Không phát hiện link nội bộ hỏng", **14.667 liên kết nội bộ** (+8 so với 14.659 trước gói = đúng 8 link nguồn của sơ đồ GMT-Master; sơ đồ Submariner giữ nguyên 8 link nguồn cũ).
- `git diff --check` — sạch.

## 10. Giới hạn còn lại

1. **Reference của mốc 2005 chưa gán số** (ghi theo mô tả "kỷ niệm 50 năm, bản vàng") — nguồn chuyên ngành dùng trong đợt không nêu số của bản vàng; cần nguồn thứ hai trước khi gán.
2. **Các mốc 2022–2025 chưa vào sơ đồ** — dữ kiện chính hãng đã có trong hồ sơ, chờ đối chiếu reference bằng nguồn chuyên ngành truy trực và chờ vòng đời ổn định.
3. **Chỉ 2 dòng có sơ đồ** — nhân rộng sang dòng khác bắt buộc lập hồ sơ nguồn riêng trước (đã ghi vào LO-TRINH); chưa có cơ chế tự sinh sơ đồ từ hồ sơ — dataset vẫn viết tay từ hồ sơ, script chỉ kiểm cấu trúc.
4. **Số mốc tối đa của lưới hiển thị** chưa đặt trần — dataset dài hơn sẽ tự co cột; nếu một dòng có quá nhiều mốc cần xem lại khả đọc (hiện cả hai dataset đều 8).
5. Vạch chia bezel trên đường ray là SVG trang trí cố định 61 vạch — số vạch không tỷ lệ theo số mốc (chỉ trang trí, aria-hidden; không ảnh hưởng dữ kiện).

## 11. Xác nhận

- **CHƯA COMMIT, CHƯA PUSH.** Toàn bộ thay đổi nằm trong working tree chờ anh kiểm độc lập.
- Tệp thuộc gói: 6 tệp tạo (hồ sơ dữ liệu, `modelEvolution.ts`, `rolexGmtMasterEvolution.ts`, `ModelEvolution.astro`, `check-evolution-data.mjs`, biên bản này), 3 tệp sửa (`submarinerEvolution.ts`, `[slug].astro`, `package.json`), 1 tệp xóa (`SubmarinerEvolution.astro`), 1 tệp hồ sơ sửa (`LO-TRINH`). Khi commit, `git add` từng tên tệp, không dùng `git add .` hay `git add -A`.
