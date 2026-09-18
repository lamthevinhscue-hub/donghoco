# Biên bản G07 chặng 2 — Viết và tích hợp đợt thử nội dung

- **Giao việc**: TXN-20260915-21/22 (danh mục DHC-G05G09-20260913); **vòng sửa 1**: TXN-20260917-24 (xem mục 8); **vòng sửa 2**: TXN-20260917-26 (xem mục 9); **vòng sửa 3**: kế tục TXN-20260917-27 (xem mục 10)
- **Nền**: `fc45914` — đã đối chiếu HEAD = origin/main trước khi sửa
- **Ngày thực hiện**: 2026-09-15
- **Phạm vi duyệt**: hoàn thiện 5 chủ đề bằng tiếng Việt; HD2 cập nhật đủ cặp VI–EN hiện có; duy nhất 1 URL mới (HD3, chỉ VI); không tạo cặp EN mới, không sửa `src/i18n/contentRoutes.ts`, không sửa checker/package.json/công cụ So sánh.

## 0. Kết luận

Đợt thử tích hợp xong với **8 tệp sửa + 1 tệp mới + 2 mục CAN-KIEM-CHUNG mới**: `npm run check` **exit 0** (không LỖI); `npm run build` **exit 0** (astro check 317 tệp — 0 lỗi / 0 cảnh báo / 4 hints nền; check-links **"Đã quét 290 trang HTML, 21142 link"** — 0 hỏng; Pagefind "indexed 290 pages"); kiểm tiếng Anh hiện hành (`node scripts/check-english-launch.mjs`) **exit 0 — ĐẠT**; sitemap 289 URL (+1 bài HD3). Chuỗi cấm đối chiếu trên dist: "DUW 4001" = 0, "53 giờ" = 0, "Thiết kế 1956 chưa từng đổi" = 0, "gần bảy mươi năm" chỉ còn 1 tệp **ngoài phạm vi** (bài thương hiệu `thuong-hieu/junghans` — xem mục 6). Công cụ So sánh sau sửa frontmatter NOMOS: hàng Bộ máy = "NOMOS DUW (tự sản xuất)", Trữ cót = "—", tiêu đề Junghans mới, không có chuỗi cấm.

## 1. Danh sách tệp chính xác

### Sửa (8)
| Tệp | Thay đổi |
|---|---|
| `src/content/mauIconic/vi/fifty-fathoms.md` | thêm mục "Đối chiếu với Submariner — hai đường đến cùng năm 1953"; `updated: 2026-09-15` |
| `src/content/mauIconic/vi/rolex-submariner.md` | thêm mục "Fifty Fathoms — người đồng hành cùng thế hệ 1953"; `updated: 2026-09-15` |
| `src/content/mauIconic/vi/nomos-tangente.md` | gỡ `power_reserve`; `movement:` → "NOMOS DUW (tự sản xuất)"; viết lại mục "Bộ máy và thông số" không còn calibre/trữ cót cụ thể; thêm mục "Đối chiếu thiết kế"; thêm `relatedMechanisms` trỏ bài HD3 (bắt buộc liên kết hai chiều — checker bắt); sửa `relation` bỏ "năm 1956"; `updated` |
| `src/content/mauIconic/vi/junghans-max-bill.md` | title mới "Thiết kế Bauhaus gần như không đổi"; excerpt bỏ 1956; body bỏ "năm 1956", "thập niên 1960", hai cụm "gần bảy mươi năm"; **gỡ hẳn `year: 1956`** (trường này hiển thị ở dòng meta + bảng thông số trang bài); thêm mục đối chiếu đối xứng; sửa `relation`; `updated` |
| `src/content/tuDien/vi/chan-kinh.md` | thêm đoạn đối chiếu FHH (dải 15–21 đúng ngữ cảnh) vào mục "Cái bẫy của con số"; `updated` |
| `src/content/coChe/vi/chong-nuoc.md` | thêm mục "Phân nhóm theo chuẩn quốc tế (theo FHH)" + 1 dòng tóm tắt; thêm nguồn FHH vào frontmatter; `updated` |
| `src/content/coChe/en/water-resistance.md` | bản EN đối xứng: mục "The standard groups, per FHH" + 1 dòng "In short" + nguồn FHH; `updated` |
| `CAN-KIEM-CHUNG.md` (gốc repo) | thêm mục 51 (DUW 4001/53 giờ) + mục 52 (năm 1956 max bill), cả hai ĐÃ XỬ LÝ AN TOÀN; ghi chú bổ sung đầu bảng |

### Tạo mới (1 nội dung + hồ sơ)
- `src/content/coChe/vi/bo-may-in-house.md` — bài HD3, VI duy nhất, slug từ tên tệp (không `custom_slug`).
- `docs/nghiem-thu/G07-tich-hop-dot-thu-noi-dung-2026-09-15.md` — biên bản này.
- `output/g07-content-pilot-integration/` — 4 script kiểm trình duyệt (pw-g07-nen/chan-doan/tai-kiem/anh.js) + `shots/` 3 ảnh PNG.

### Không đụng
`src/i18n/contentRoutes.ts`, `package.json`, mọi script/checker, công cụ So sánh (chỉ đọc), `muc-chong-nuoc.md`, các tệp untracked có trước.

## 2. Từng claim: dùng / bỏ / thu hẹp / không dùng

**Dùng (có trích nguồn ở hồ sơ claim chặng 1):**
- SS1-01 (Fifty Fathoms "đồng hồ lặn hiện đại đầu tiên" — ghi "theo Blancpain"), SS1-03 (cùng năm ≠ sao chép) → mục đối chiếu hai bài SS1.
- SS2-02 ("mẫu đầu tiên của NOMOS" + form follows function — "theo hãng"), SS2-03 (swing system, "hầu như không hãng nào khác"), SS2-06 (học trò Bauhaus không trang trí thừa — "theo Junghans"), SS2-08 (33–41 mm — "theo hãng") → mục đối chiếu hai bài SS2. SS2-01 (bestseller) giữ nguyên vị trí cũ trong bài.
- HD1-01/02/03 theo mức thu hẹp: dẫn dải 15–21 của FHH như "mặt bằng phổ biến", giữ nguyên dải 17–21 của trang, nói rõ hai cách nói chỉ vào cùng thực tế — không thang điểm.
- HD2-01, HD2-03 → mục "Phân nhóm theo chuẩn quốc tế (theo FHH)" (VI + EN): nhóm ISO 2281/NIHS 92-10 (sinh hoạt thường ngày **gồm bơi giải trí**, không dành cho lặn) và ISO 6425/NIHS 92-11 (lặn từ 100 m); "1 bar = 1 atm" ghi rõ **"theo diễn đạt của FHH"**.
- HD3-01 (định nghĩa manufacture, giữ ngữ cảnh ngành Thụy Sĩ + lưu ý khi dùng cho hãng Đức), HD3-02 (DUW 4601 = calibre tự sản xuất thứ 12 — "theo hãng"), HD3-03 (swing system) → bài mới.

**Thu hẹp / gỡ (kèm CAN-KIEM-CHUNG):**
- SS2-05 (DUW 4001 + lắp ráp tay + 53 giờ): gỡ khỏi body và frontmatter → **mục 51**.
- SS2-07 (năm 1956): gỡ khỏi title/excerpt/body/relation/frontmatter `year`, kèm các cụm phái sinh "thập niên 1960", "gần bảy mươi năm" → **mục 52**.
- SS1-06 (bezel một chiều "từ thế hệ 1953"): đoạn mới không neo mốc — chỉ nói "chuẩn mực đồng hồ lặn sau này" ở cấp dòng.
- HD2-02: **không dùng FHH** cho luận điểm "bảng dùng chung"; mục "Vì sao không có bảng dùng chung?" hiện có giữ nguyên (đã có nguồn hãng trực tiếp từng ví dụ: Omega, Seiko); không khái quát "mỗi hãng" ở nội dung mới.

**Không dùng (đúng hồ sơ):** SS1-02 (đoạn SS1 chỉ dẫn "dữ kiện đã kiểm của bài Submariner", không nêu thêm claim Rolex mới), SS1-04 (Cousteau), SS1-05 (91 m), SS2-04 (Berlin), HD3-04 (loại bỏ tuyệt đối), HD3-05 (không đưa Junghans vào claim in-house — bài HD3 không nhắc Junghans).

## 3. Bản dịch HD2 (cặp VI–EN)

- VI (`chong-nuoc.md`): mục mới "## Phân nhóm theo chuẩn quốc tế (theo FHH)" — 2 nhóm chuẩn + câu đơn vị bar + câu ranh giới "hai tầng thông tin không thay thế nhau"; thêm 1 bullet tóm tắt; thêm nguồn FHH.
- EN (`water-resistance.md`): mục mới "## The standard groups, per FHH" — nội dung đối ứng, giữ quote nguyên văn "leisure swimming"; thêm 1 bullet "In short"; thêm nguồn FHH. Không phát sinh route EN mới (67 route EN giữ nguyên).

## 4. Kiểm tra

| Kiểm | Kết quả |
|---|---|
| `npm run check` (26 lệnh) | **exit 0**, không LỖI (vòng đầu checker liên kết biên tập bắt thiếu chiều ngược `nomos-tangente` → `bo-may-in-house` — đã bổ sung `relatedMechanisms` rồi chạy lại ĐẠT) |
| `npm run build` (trọn chuỗi) | **exit 0**; astro check 317 tệp — **0 lỗi / 0 cảnh báo / 4 hints** (đúng nền); check-links **"Đã quét 290 trang HTML, 21142 link"** 0 hỏng; Pagefind indexed 290 pages; sitemap 289 URL |
| Kiểm tiếng Anh hiện hành | `node scripts/check-english-launch.mjs` — **exit 0, KẾT LUẬN ĐẠT** |
| Chuỗi cấm trên dist | "DUW 4001" = 0 tệp; "53 giờ" = 0; "Thiết kế 1956 chưa từng đổi" = 0; Pagefind chuỗi chính xác `"DUW 4001"` = 0 kết quả; "gần bảy mươi năm" = 1 tệp **ngoài phạm vi** (mục 6) |
| Route mới | đúng 1: `/co-che/bo-may-in-house` — 67 route EN giữ nguyên, không phát sinh cặp |
| CAN-KIEM-CHUNG | 2 mục mới đủ vị trí + lý do + nguồn còn thiếu + hành động |

**Rà bằng trình duyệt (preview cục bộ + script `pw-g07-nen.js`, tái kiểm `pw-g07-tai-kiem.js` — 16/16 ĐẠT; 3 ảnh trong `shots/`)** — rà hiển thị thủ công, không thay thế kiểm tự động của GPT Work: HD3 không tràn ngang 320/1440 sáng/tối, h1 đúng; cặp HD2 VI/EN có mục phân nhóm + ngữ cảnh bơi giải trí; 4 bài SS có mục đối chiếu; DOM junghans 0 "1956"/0 "DUW 4001", DOM nomos 0 "DUW 4001"/0 "53 giờ"; So sánh `?m=nomos-tangente,junghans-max-bill`: hàng Bộ máy "NOMOS DUW (tự sản xuất)", Trữ cót NOMOS "—", tiêu đề Junghans mới, Mốc năm "—"; trang danh sách không còn tiêu đề cũ; Pagefind: chuỗi chính xác "DUW 4001" = 0, bài mới có trong index (kết quả đầu cho truy vấn "bộ máy in-house nghĩa là gì").

## 5. Giới hạn và phát hiện còn lại

1. **Ngoài phạm vi, chờ quyết (bằng chứng dòng 61–65, 17–24, 47 của tệp):** bài thương hiệu `src/content/thuongHieu/vi/junghans.md` còn cụm năm chưa chứng minh — `lineHistory` year 1956 ×2, "sản xuất gần như nguyên bản từ 1956", collectorNote "thiết kế gốc từ 1956", "Từ thập niên 1960", "gần bảy mươi năm tuổi" (dist `thuong-hieu/junghans` là tệp duy nhất còn "gần bảy mươi năm"). Tệp này KHÔNG thuộc danh sách được sửa của gói — đã ghi vào CAN-KIEM-CHUNG mục 52 "phát hiện thêm ngoài phạm vi", không tự sửa.
2. **SS2-04 (NOMOS lập sau Bức tường Berlin, "năm 1990")** vẫn trong excerpt + thân bài `nomos-tangente.md` — hồ sơ chặng 1 xếp "thiếu nguồn"; prompt chặng 2 không chỉ định gỡ nên **giữ nguyên**, chờ quyết (bổ sung nguồn hoặc gỡ ở gói sau). *[Đã xử lý ở vòng sửa 1: gỡ khỏi excerpt + thân bài, SS2-04 loại khỏi nội dung xuất bản, CAN-KIEM-CHUNG mục 53 — xem mục 8.]*
3. Câu "rất ít hãng ở tầm giá này" trong `nomos-tangente.md` (dư âm tài chính, đã ghi hồ sơ P1.4) — ngoài phạm vi gói, giữ nguyên. *[Đã xử lý ở vòng sửa 2: gỡ hẳn khỏi mục "Kỹ thuật phía sau" cùng câu "bộ máy hoàn chỉnh của một nhà chế tác thật, không phải nền mua ngoài" — xem mục 9.]*
4. Bài HD3 **chưa có liên kết tới fifty-fathoms** (đề cương có nhắc): không thêm vì claim "calibre 1315 in-house" chưa có hồ sơ nguồn riêng — tránh nhân rộng; bài có 2 liên kết ra (Tangente, chân kính) + 1 liên kết vào (nomos-tangente `relatedMechanisms`, hai chiều ĐẠT) + nằm trong index /co-che.
5. Frontmatter `year` của junghans-max-bill đã gỡ — hơi rộng hơn chữ "title, excerpt và body" của prompt: gỡ vì trường này **hiển thị** ở dòng meta và bảng thông số (năm chưa chứng minh vẫn lộ trong nội dung xuất bản); hệ quả: So sánh hiện "Mốc năm: —" cho Junghans. GPT Work xem xét chấp thuận hoặc trả lại.
6. Không chạy deploy; chưa commit/push.

## 6. Tự kiểm định dạng

`git diff --check` sạch (chạy sau cùng), 0 space cuối dòng, EOF đủ newline trên mọi tệp sửa/tạo; frontmatter hợp lệ (build phân tích thành công); không có bí mật (URL toàn công khai).

## 7. Điểm dừng

**Dừng chờ GPT Work nghiệm thu G07.** Chưa commit, chưa push, chưa deploy. Chưa mở G08 (chờ anh Vinh xác nhận dòng Speedmaster) và G09.

---

## 8. Vòng sửa 1 (TXN-20260917-24, ngày 17/09/2026)

**Bị bắt:** ba khối claim còn vượt hồ sơ — (a) Tangente còn "lập ngay sau khi Bức tường Berlin sụp đổ" + "năm 1990" (excerpt + "Bối cảnh ra đời"); (b) max bill bị gán câu "Bauhaus clock remained almost unchanged for 60 years" của nguồn cho dòng đồng hồ (câu nguồn nói về một **đồng hồ/clock**), kèm các cụm không có hồ sơ "sản xuất liên tục", "vẫn bán được", "chứng nhận của thời gian" và hai nhận định bộ máy không nguồn (HD3-05 thiếu nguồn); (c) HD3 có heading "mức tự chủ cao nhất" (xếp bậc).

### 8.1. Đã sửa (3 tệp nội dung)

| Tệp | Thay đổi |
|---|---|
| `src/content/mauIconic/vi/nomos-tangente.md` | excerpt bỏ cụm Berlin; "Bối cảnh ra đời" viết lại chỉ còn SS2-01 (bán chạy hơn ba mươi năm) + SS2-02 (mẫu đầu tiên, "theo hãng") — bỏ 1990/Berlin/Roland Schwertner/1992/"sáu mẫu"; bullet đối chiếu "Gốc đi thiết kế" bỏ lặp "mẫu đầu tiên"; bullet "Phía bộ máy" bỏ câu dẫn chiếu nhận định bộ máy của bài max bill, giữ khác biệt mức tự chủ sản xuất phía NOMOS (SS2-03, "theo hãng"); `relation` bỏ "gần như không đổi"; `updated` → 2026-09-17 |
| `src/content/mauIconic/vi/junghans-max-bill.md` | title → "Tối giản của một học trò Bauhaus"; excerpt → chỉ SS2-06 ("theo Junghans"); "Vị trí trong lịch sử" viết lại mô tả ngôn ngữ thiết kế — bỏ "gần như không thay đổi"/"sản xuất liên tục"/"vẫn bán được"/"chứng nhận của thời gian"; "Nói thẳng" bỏ "bộ máy không phải thế mạnh" + "phần lớn dùng nền mua ngoài" (giữ "vỏ mỏng và kính vòm dễ xước" có trước); `relation` bỏ "gần như không đổi"; `updated` → 2026-09-17 |
| `src/content/coChe/vi/bo-may-in-house.md` | heading → "Tự làm bộ thoát — một mức tự chủ sâu hơn trong chuỗi sản xuất"; mở đầu mục bỏ cấu trúc xếp bậc ("đã khó… còn ít hãng hơn nữa"); câu độ hiếm giữ đúng mức "theo hãng" (NOMOS); Tóm tắt bullet 2 viết lại tương ứng; siết lưu ý ngữ cảnh FHH — bỏ cách nói "cách dùng chung trong ngành", giữ "mang vai trò mô tả, không phải nhãn chính thức"; thêm `updated: 2026-09-17` |

Không sửa bài thương hiệu `junghans.md`, `nomos-glashuette.md`, `muehle-glashuette.md` (ngoài phạm vi — giới hạn ở mục 8.4). Không thêm năm/mốc mới. `src/i18n/contentRoutes.ts`, `package.json`, checker, công cụ So sánh: không đụng.

### 8.2. Đồng bộ hồ sơ

- `CAN-KIEM-CHUNG.md`: thêm **mục 53** (Berlin/1990/1992 Tangente — SS2-04 vẫn thiếu nguồn, đã loại khỏi nội dung xuất bản) và **mục 54** ("gần như không đổi" gán sai đối tượng + nhận định bộ máy không nguồn), cả hai ĐÃ XỬ LÝ AN TOÀN; ghi chú bổ sung đầu bảng 17/09/2026; mục 52 thêm ghi chú **thu hồi cách dẫn "theo nguồn hãng"** đã làm ở chặng 2.
- `output/g07-content-pilot-integration/`: thêm `quet-claim-vs1.js` (quét claim cấm src/dist) + `pw-g07-vs1.js` (kiểm trình duyệt vòng sửa) + log `log-quet-src-vs1.txt`, `log-quet-dist-vs1.txt`, `log-check-vs1.txt`, `log-build-vs1.txt`, `log-english-vs1.txt`, `log-astro-check-vs1.txt`, `log-preview-vs1.txt`, `log-pw-vs1.txt` + 3 ảnh `shots/vs1-*.png`. Dọn 3 biến khai báo không dùng trong script (`snap`, `lienKet`, `hopLe`/`laDist`) — nội dung assertion của `pw-g07-nen.js`/`pw-g07-tai-kiem.js` không đổi; lưu ý case C title-check của `pw-g07-nen.js` khớp title chặng 2, đã thay thế bằng `pw-g07-vs1.js`.

### 8.3. Kiểm tra sau sửa

| Kiểm | Kết quả |
|---|---|
| `npm run check` | **exit 0**, 0 KHÔNG ĐẠT (log-check-vs1.txt) |
| `npm run build` | **exit 0**; astro check **322 tệp — 0 lỗi / 0 cảnh báo / 4 hints** (nền; chặng 2 đếm 317 tệp vì script pw được viết sau lượt build đó — 5 tệp .js bằng chứng giờ được quét thêm, 0 hints); check-links **"Đã quét 290 trang HTML, 21142 link"** 0 hỏng; Pagefind indexed 290; sitemap 289 URL |
| Kiểm tiếng Anh | `node scripts/check-english-launch.mjs` — **exit 0, ĐẠT** |
| Quét claim src | ba tệp G07 **0 khớp** mọi mã T/J/H (log-quet-src-vs1.txt) |
| Quét claim dist | `dist/mau-iconic/nomos-tangente/`, `dist/mau-iconic/junghans-max-bill/`, `dist/co-che/bo-may-in-house/` — **0 khớp** (log-quet-dist-vs1.txt) |
| Trình duyệt | `pw-g07-vs1.js` — **19/19 ĐẠT**: Tangente/max bill/HD3 không tràn 320+1440 sáng/tối; DOM 0 "Bức tường Berlin"/"1990"/"Roland Schwertner" (Tangente), 0 "sản xuất liên tục"/"chứng nhận của thời gian"/"vẫn bán được"/"gần như không"/"thế mạnh"/"nền mua ngoài" (max bill), 0 "mức tự chủ cao nhất" + heading mới (HD3); So sánh giữ "NOMOS DUW (tự sản xuất)", 0 "1956", 0 title cũ; Pagefind "mức tự chủ cao nhất" = 0, "chứng nhận của thời gian" = 0, "sản xuất liên tục"/"Bức tường Berlin" không trả bài G07 |

### 8.4. Claim cũ ngoài phạm vi CÒN TỒN TẠI (báo riêng, KHÔNG gọi là đã xử lý)

1. `src/content/thuongHieu/vi/nomos-glashuette.md` — excerpt dòng 3 ("lập năm 1990 ngay sau khi Bức tường Berlin sụp đổ"), `lineHistory` year 1990 dòng 13–14 ("Roland Schwertner thành lập…", Berlin/Treuhandanstalt), year 1992 dòng 15–16 — **cùng họ claim SS2-04 với bài Tangente**, tệp ngoài danh sách được sửa của gói.
2. `src/content/thuongHieu/vi/junghans.md` — đã ghi mục 52 (1956, "gần bảy mươi năm", "thập niên 1960"); **bổ sung chi tiết**: `collectorNote` dòng 47 còn "bộ máy không phải thế mạnh, phần lớn dùng nền mua ngoài" (cùng họ HD3-05), dòng 65 còn "sản xuất liên tục".
3. `src/content/thuongHieu/vi/muehle-glashuette.md` — `value_retention` dòng 32 "Lập sau khi Bức tường Berlin sụp đổ" (T1), `collectorNote` dòng 40 "bộ máy phần lớn dùng nền mua ngoài có chỉnh sửa" (J4).
4. `src/content/thuongHieu/vi/stowa.md` — bảng đối chiếu thương hiệu có ô Junghans "Thiết kế Max Bill sản xuất liên tục từ 1956" (dist `thuong-hieu/stowa`) — **cùng họ claim SS2-07** (1956 + liên tục).
5. Ngữ cảnh riêng, hiện trạng nền (không thuộc claim G07): `minase-horizon.md` + bài Minase/Rado ("bộ máy không phải thế mạnh" về chính hãng đó), `hajime-asaoka-project-t.md` ("tốt nghiệp năm 1990"), Stowa/Orient Bambino/Cartier/Tag Heuer/Universal Genève/A. Lange & Söhne ("gần như không đổi"/"sản xuất liên tục"/Berlin trong câu chuyện riêng của từng bài).

### 8.5. Điểm dừng vòng sửa 1

**Dừng chờ GPT Work tái nghiệm thu.** Chưa stage, chưa commit, chưa push, chưa deploy. HEAD = origin/main = `fc45914`.

---

## 9. Vòng sửa 2 (TXN-20260917-26, ngày 17/09/2026)

**Bị bắt:** trong `nomos-tangente.md` còn hai claim vượt hồ sơ — "rất ít hãng ở tầm giá này làm được" (suy sang giá/phân khúc, dư âm hồ sơ P1.4) và "bộ máy hoàn chỉnh của một nhà chế tác thật, không phải nền mua ngoài" (nguồn gốc bộ máy + cách nói xếp hạng); `relatedMechanisms` còn "biểu hiện rõ nhất".

### 9.1. Đã sửa — duy nhất 1 tệp nội dung

`src/content/mauIconic/vi/nomos-tangente.md`:
- Mục "Kỹ thuật phía sau": gỡ cả hai câu bị bắt; giữ đúng mức SS2-03/HD3-03 — "tự làm bộ thoát, gọi là NOMOS swing system — điều mà, **theo hãng**, hầu như không hãng nào khác trên thế giới thực hiện được".
- `relatedMechanisms` relation → trung tính đúng hướng dẫn: "Bài giải thích khái niệm in-house và giới hạn của khái niệm" (bỏ "Tự sản xuất bộ máy là biểu hiện rõ nhất của khái niệm in-house…").
- Bullet đối chiếu "Phía bộ máy": gộp cách dẫn đôi ("điều hãng mô tả là… (theo hãng)") thành một lần gắn "theo hãng"; không đổi nội dung claim (mức SS2-03).

Không đụng: `junghans-max-bill.md`, `bo-may-in-house.md`, `CAN-KIEM-CHUNG.md` (ngoài danh sách tệp được sửa của vòng này), `src/i18n/contentRoutes.ts`, `package.json`, checker, công cụ So sánh.

### 9.2. Kiểm tra sau sửa

| Kiểm | Kết quả |
|---|---|
| `npm run check` | **exit 0**, 0 KHÔNG ĐẠT (log-check-vs2.txt) |
| `npm run build` | **exit 0**; astro check **324 tệp — 0 lỗi / 0 cảnh báo / 4 hints** (nền); links **"Đã quét 290 trang HTML, 21142 link"** 0 hỏng; Pagefind 290; sitemap 289 URL |
| Quét claim src (mã N1–N6 thêm vào `quet-claim-vs1.js`) | `nomos-tangente.md` **0 khớp** mọi mã (log-quet-src-vs2.txt) |
| Quét claim dist | `dist/mau-iconic/nomos-tangente/` **0 khớp** (log-quet-dist-vs2.txt) |
| Trình duyệt | `pw-g07-vs2.js` — **8/8 ĐẠT**: Tangente không tràn 320/1440 sáng/tối; DOM 0 "rất ít hãng"/"nhà chế tác thật"/"nền mua ngoài"/"biểu hiện rõ nhất"/"Tangente hưởng lợi"; giữ câu SS2-03 gắn "theo hãng" (2 chỗ); link HD3 còn hoạt động (2 chỗ: khối liên kết + link nội dung) với relation trung tính mới; HD3 h1 đúng + 0 "mức tự chủ cao nhất"; So sánh hàng Bộ máy "NOMOS DUW (tự sản xuất)"; ảnh `shots/vs2-tangente-1440-sang.png` |

### 9.3. Phát hiện cùng họ NGOÀI danh sách tệp được sửa của vòng này (chờ GPT Work quyết)

1. **`src/content/coChe/vi/bo-may-in-house.md` dòng 14** — relation chiều ngược (`relatedModels` → nomos-tangente) còn "Tangente **hưởng lợi** từ bộ máy tự NOMOS sản xuất…": cách nói hưởng lợi/xếp hạng cùng họ với các cụm bị bắt, tệp không thuộc danh sách được sửa của TXN-20260917-26 (src + dist `co-che/bo-may-in-house` đều còn, mã N6). Không tự sửa.
2. **`src/content/thuongHieu/vi/nomos-glashuette.md`** — excerpt dòng 3 và thân dòng 58 còn "rất ít hãng ở tầm giá này làm được" (mã N1, cùng cụm vừa gỡ ở bài Tangente); dòng 3 cũng vẫn là dòng đã ghi ở mục 8.4.1 (1990/Berlin).
3. Các khớp N2/N4/N5 còn lại thuộc bài khác với ngữ cảnh riêng của từng bài (chopard-luc, roger-dubuis, doxa, stowa, timex, baume-et-mercier, bell-and-ross, franck-muller, muehle, junghans — mô tả bộ máy/nhận định riêng) — hiện trạng nền, không thuộc claim G07.

### 9.4. Điểm dừng vòng sửa 2

**Dừng chờ GPT Work tái nghiệm thu.** Chưa stage, chưa commit, chưa push, chưa deploy. HEAD = origin/main = `fc45914`.

---

## 10. Vòng sửa 3 (kế tục TXN-20260917-27, ngày 18/09/2026)

**Đối tượng vòng:** phát hiện mục 9.3.1 — `bo-may-in-house.md` dòng 14, relation chiều ngược (`relatedModels` → nomos-tangente) "Tangente **hưởng lợi** từ bộ máy tự NOMOS sản xuất…" (mã N6). GPT Work giao sửa thành văn bản trung tính; cấm thêm "biểu hiện rõ nhất", "vượt trội", nhận định chất lượng/giá trị, khẳng định nguồn gốc toàn bộ bộ máy Tangente ngoài claim đã duyệt.

### 10.1. Đã sửa — duy nhất 1 tệp nội dung

`src/content/coChe/vi/bo-may-in-house.md`:
- `relatedModels` relation → đúng văn bản trung tính GPT Work cho: **"Bài dùng Tangente làm ví dụ có nguồn để giải thích khái niệm in-house."** (bỏ "hưởng lợi"; bỏ mệnh đề "gồm cả bộ thoát swing system" — không khẳng định nguồn gốc bộ máy của Tangente ngoài phạm vi claim).
- Thân mục "Tự làm bộ thoát" (dòng 36): câu cuối "Dòng NOMOS Tangente là nơi khái niệm này **hiện ra rõ nhất** trong thực tế" → **"Nguồn cho các mô tả của hãng nêu trên là trang sản phẩm dòng NOMOS Tangente."** — gỡ cách nói xếp hạng "rõ nhất" (cùng ý "biểu hiện rõ nhất" bị cấm), giữ nguyên liên kết hai chiều.
- `updated: "2026-09-17"` → `"2026-09-18"` (`date` giữ "2026-09-15").

Không đụng: `nomos-tangente.md` (chiều đã sửa vòng 2 — chỉ quét hồi quy), `CAN-KIEM-CHUNG.md`, các tệp `thuongHieu` nêu ở mục 9.3 (ngoài danh sách tệp được sửa của vòng).

### 10.2. Kiểm tra sau sửa

| Kiểm | Kết quả |
|---|---|
| `npm run check` | **exit 0**, 0 KHÔNG ĐẠT (log-check-vs3.txt) |
| `npm run build` | **exit 0**; astro check **326 tệp — 0 lỗi / 0 cảnh báo / 4 hints** (nền; lượt build đầu 5 hints do biến `path` không dùng trong `quet-claim-vs3.js` — đã gỡ và build lại); links **"Đã quét 290 trang HTML, 21142 link"** 0 hỏng; Pagefind 290; sitemap 289 URL |
| Quét claim vòng 3 — `quet-claim-vs3.js` (V3-1 "hưởng lợi", V3-2 "biểu hiện rõ nhất", V3-3 "hiện ra rõ nhất", V3-4 "vượt trội" + hồi quy N1/N2/N5/N6; kèm assert relation hai chiều) | **src 2 tệp: 0 khớp + relation ĐÚNG cả hai chiều** (log-quet-src-vs3.txt); **dist 2 route: 0 khớp** (log-quet-dist-vs3.txt) |
| Trình duyệt | `pw-g07-vs3.js` — **8/8 ĐẠT**: HD3 1440 sáng (relation mới hiển thị + câu dẫn nguồn mới + link Tangente + 0 cụm cấm + 0 tràn ngang), HD3 1440 tối / 320 sáng / 320 tối; Tangente 1440 sáng (link HD3 + "theo hãng" ≥2 — đo 5 + 0 cụm cấm + 0 tràn), Tangente 1440 tối / 320 sáng / 320 tối; ảnh `shots/vs3-bo-may-in-house-1440-sang.png` |
| Định dạng | `sweep-dinh-dang-vs1.js` (bổ sung 2 script vs3 vào danh sách) **TONG_LOI=0**; `git diff --check` sạch |

Ghi chú rà thủ công theo mục 2 prompt: các câu chạm "chất lượng" còn lại trong `bo-may-in-house.md` đều là câu chống-xếp-hạng hiện có ("in-house không tự động là tốt hơn", "mô tả nguồn gốc, không phải nhãn chất lượng") — đúng chiều trung tính, giữ nguyên; relation mới và câu dẫn mới không chứa khẳng định nào về nguồn gốc bộ máy của Tangente.

### 10.3. Điểm dừng vòng sửa 3

**Dừng chờ GPT Work tái nghiệm thu.** Chưa stage, chưa commit, chưa push, chưa deploy. HEAD = origin/main = `fc45914`.
