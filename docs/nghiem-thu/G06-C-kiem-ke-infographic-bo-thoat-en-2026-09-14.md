# G06-C chặng 1 — Kiểm kê infographic Bộ thoát EN và cổng nội dung (2026-09-14)

- Giao dịch: TXN-20260914-22 | Danh mục: DHC-G05G09-20260913 v1.0.0
- Nền: **`ced15b8`** (main = origin/main; là commit "feat(compare): add bilingual iconic watch comparison" — G06-B chặng 2 đã đóng tại đây; 9fa333e là commit duyệt hồ sơ ngay trước). Tracked 0, staged 0; untracked có trước (docs/ + output/playwright/ + AGENTS.md) giữ nguyên.
- **Vòng sửa 1 (TXN-20260915-1)**: (a) kiểm kê đúng 18 component import MechanismAnimation (12 gốc + 6 glossary — bỏ sót nhóm glossary ở vòng đầu); (b) cổng nội dung viết lại nguyên văn đầy đủ + hồ sơ nguồn FHH truy cập thật (JSON endpoint) + rà 6 claim + roller; (c) bổ sung bằng chứng bàn phím thật/reset/RM đầy đủ/theme DOM/viewport-tab ẩn/ảnh đại diện; (d) sửa phép đo tải; (e) khóa phạm vi chặng 2 (package.json + check-regulating-cluster + gate riêng Bộ thoát).
- **Vòng sửa 2 (TXN-20260915-4)**: (a) thống nhất bộ hồ sơ hiện hành theo tầng RENDER đo từ dist: **22 trang = 17 /co-che/ + 5 /tu-dien/** (bảng `bang-nhan-dien-khung.md` sinh từ mã + dist; import ≠ render — day-toc-banh-lac bị hasBalanceChapter chặn, TermArticle chỉ 5/9 slug có khung); (b) chốt nội dung theo đường chạy enhanced (POSES 0/−8/−21/−24/−24° — bước 2→3 −13°): THAY câu "một răng" bằng định tính (GK-5/5d + phương án B), thu hẹp tiếp GK-4d, GK-13 đủ nhãn kể cả "Tạm dừng", GK-15 (EN không tên VI), GK-16 (vị trí hiển thị nhãn giới hạn); (c) bộ phân loại 4 trạng thái ĐẠT/KHÔNG ĐẠT/CHƯA KIỂM/QUAN SÁT + tự kiểm bộ tổng kết 5 ca — chạy lại thành `pw-g06c-vs3-phan-loai.js` (15 ca: 12 ĐẠT + 1 CHƯA KIỂM + 2 QUAN SÁT; vs2 14/14 thành LỊCH SỬ); (d) ảnh chụp lại toàn khung 2 theme (cũ bị cắt dưới → LỊCH SỬ); do-tai-trang-thai.json sửa "chưa đo"/"nguyên nhân chưa xác định".
- **Vòng sửa 3 (TXN-20260915-6 — chốt nội dung, không chạy lại trình duyệt/build)**: (a) áp các câu GPT Work chốt: GK-3 "Bánh lắc chuyển động về phía giữa" / GK-3d bỏ diễn giải năng lượng dây tóc "nhả ra từ nhịp trước" (N3 không xác lập) / GK-11a về đúng mức N1 "khóa và nhả theo từng nhịp" / GK-11c thành mô tả hình (bỏ "ma sát rất thấp", "xung lực chính xác") / GK-7d khớp hành vi mã enhanced (lặp lại từ bước đầu, không mô phỏng nửa chu kỳ đối diện); (b) GK-5/5d CHỐT định tính — **phương án B KHÔNG CHỌN**; (c) nhãn giản lược GK-16a + nhãn roller GK-16b CHỐT nguyên văn VI/EN; (d) từng câu ghi rõ căn cứ HÌNH (mô tả hình đang vẽ) / NGUỒN N1-N3 / DỊCH; (e) một bộ mã duy nhất theo bảng chi tiết: GK-9/9d = mô tả SVG, GK-12 = data-name ×5, GK-13 = nhãn khung (biên bản + ma trận sửa khớp); roller sửa thành **5 mục chọn**; T2-3 khóa chỉ đúng cặp Bộ thoát + tiêu chí không bật infographic EN khác; ảnh ghi thêm giới hạn header che phần tiêu đề.
- Phạm vi: chỉ tạo biên bản này + `output/g06-escapement-en-audit/`. Không sửa `src/`, `public/`, `scripts/`, `package.json`.

## 0. Kết luận

Kiểm kê xong: infographic Bộ thoát là component **enhanced** (5 bước + khám phá bộ phận) dùng khung chung `MechanismAnimation` — khung render thật trên **22 trang = 17 /co-che/ + 5 /tu-dien/** (bảng nhận diện `bang-nhan-dien-khung.md` sinh từ mã + dist; chỉ bo-thoat chế enhanced, 21 trang còn lại chế cũ); toàn bộ nhãn/chuỗi đang VI; cặp route `/co-che/bo-thoat` ↔ `/en/mechanisms/escapement/` đã có, bài EN có thật nhưng hai cờ `has_infographic/interactive: false` và gate `MechanismArticle` chỉ render infographic cho `lang === 'vi'`. Trình duyệt nền: **10 ĐẠT + 1 QUAN SÁT** (pw-g06c-nen; E1 kỳ vọng sai của GLM đã đính chính) + **3 ĐẠT** (pw-g06c-rm-tai: RM 2 chiều + đo tải). Vòng sửa 2 — `pw-g06c-vs3-phan-loai.js` với bộ phân loại 4 trạng thái: **15 ca = 12 ĐẠT + 1 CHƯA KIỂM (tab ẩn thật) + 2 QUAN SÁT (B2 reduce-đang-phát; D2 tab ẩn mô phỏng)**, tự kiểm bộ tổng kết 5/5. Log `pw-g06c-vs2-bo-sung` (14/14) thành LỊCH SỬ — ba ca B2/D1/D2 bị GPT Work bắt cộng quan sát vào đạt, đã thay bằng phép đo mới. RM hai chiều (B1–B3); ngoài viewport ĐẠT (D1 — đứng 6,5s ngoài view, chạy lại khi quay vào); tab ẩn chỉ mô phỏng; không chunk 3D (bằng chứng import + dist). Chưa sửa gì.

## 1. Nền và bảo toàn

- HEAD = origin/main = `ced15b816…` khớp dự kiến; tracked 0, staged 0.
- Build nền trên `ced15b8` (log-build-nen.txt): **exit 0**, diagnostics **0 lỗi/0 cảnh báo/4 hints = baseline**, g06-compare dist 14/14 ĐẠT; **289 HTML / 67 EN**, sitemap **288 URL**, links **21.033 / 0 hỏng** — khớp mốc đối chứng.
- English launch chạy riêng (log-english-launch.txt): **EXIT 0** — "Đủ 63 route", VI-leak sạch với ngoại lệ Métiers d'Art đã duyệt.
- Không chạy công cụ ghi đè bằng chứng gói cũ.

## 2. Kiểm kê từ mã thật

### 2.1 Các bên liên quan

| Tệp | Vai trò |
|---|---|
| `src/components/infographics/Escapement.astro` (520 dòng) | SVG 600×400 + 5 steps VI + PART_INFO (vi/en/role ×5) + POSES vật lý + script hai chế + tooltip |
| `src/components/infographics/MechanismAnimation.astro` (566 dòng) | khung CHUNG hai chế (cũ/enhanced): nút Trước/Phát-S Pause/Sau/Đặt lại, counter "Bước x/n", aria-live, legend nút bộ phận, nhãn VI |
| `src/components/templates/MechanismArticle.astro` | khuôn bài cơ chế; `infographics[slug]`; gate `!hasBalanceChapter && lang === 'vi' && data.has_infographic`; banner "chưa có infographic" chỉ `lang==='vi'` |
| `src/content/coChe/vi/bo-thoat.md` (63 dòng) | `has_infographic: true`, `interactive: true`; nguồn FHH; relatedModels freak |
| `src/content/coChe/en/escapement.md` (51 dòng, custom_slug escapement) | `has_infographic: false`, `interactive: false`; FHH EN; liên kết balance-and-hairspring + glossary |

**Số liệu bài cơ chế (đếm từ đĩa, 0 draft):** 18 bài VI, 14 bài EN; bảng ARTICLE_PAIRS có đúng **14 cặp /co-che/ ↔ /en/mechanisms/**; 4 bài VI chưa có cặp EN: bo-thoat-dong-truc, da-quang, hien-thi-ngay, kinh-dong-ho.
| `src/i18n/contentRoutes.ts:65` | cặp `/co-che/bo-thoat` ↔ `/en/mechanisms/escapement/` |
| checkers | check-g01 (switcherTarget + trang bo-thoat), check-english-launch (REQUIRED_EN escapement + glossary), check-3d-loading-budget (route bo-thoat), check-g04-balance-chapter (slugs bánh lắc) |

**Bên dùng chung khung `MechanismAnimation`: 18 component import thật** (grep src/, loại khung tự tham chiếu) — 12 gốc (AntiMagnetic, AutomaticWinding, CoAxial, Crystal, DateDisplay, Escapement, GearTrain, Lume, MinuteRepeaterAnim, PowerReserve, ShockProtection, WaterResistance) + 6 glossary (Chronograph, GMT, Hairspring, MoonPhase, PerpetualCalendar, Tourbillon — nhóm bị bỏ sót ở vòng đầu). Import KHÔNG đồng nghĩa render — đếm trang thật từ dist.

**Consumer, gate và RENDER THẬT (vòng sửa 2, đối chiếu dist — bảng đầy đủ `output/bang-nhan-dien-khung.md` sinh bởi `kiem-ke-khung-render.cjs`):**
- (a) `MechanismArticle`: map 18 slug → 18 component, gate `!hasBalanceChapter && lang === 'vi' && has_infographic` — **17 trang /co-che/ render**; `/co-che/day-toc-banh-lac/` KHÔNG render khung (`hasBalanceChapter` — chương G04 thay bằng mô hình riêng).
- (b) `TermArticle`: map 9 slug → 9 glossary component, gate `lang === 'vi' && has_infographic` — trong 9 slug đó chỉ 5 component import khung (Tourbillon, PerpetualCalendar, Chronograph, GMT, Hairspring) và **5 trang /tu-dien/ render** (minute-repeater, vph, incabloc, rotor có trang nhưng không khung; MoonPhase chỉ dùng bởi MechanismArticle).
- **Tổng: 22 trang render = 17 + 5** — khớp kết quả quét dist của GPT Work. Chế độ: chỉ Escapement `data-enhanced="true"`; 21 trang còn lại chế cũ.
- Kết luận: hiện KHÔNG có trang EN nào render MechanismAnimation.

**Nhãn khung đang VI** (22 trang chia sẻ, nguyên văn đầy đủ tại GK-13 `bang-cong-noi-dung.md`, gồm cả nhãn trạng thái "Tạm dừng hoạt ảnh"): chế enhanced — "Bước trước", "Phát hoạt ảnh"/"Tạm dừng hoạt ảnh", "Bước tiếp theo", "Đặt lại"/"Đặt lại về bước đầu", "Bước x/n"; chế cũ — "Từng bước"/"Từng bước một", "Đặt lại"/"Đặt lại hoạt ảnh về trạng thái đầu", "Tốc độ"/"Tốc độ hoạt ảnh". Chặng 2 đổi khung theo lang phải hồi quy **21 trang render khác bo-thoat** (16 /co-che/ + 5 /tu-dien/ — danh sách đủ trong ma-tran-chang-2.md; bản "18 route + 9 route" và "12 infographic khác" trước đó đã THAY THẾ vì đếm sai tầng render).

### 2.2 Chuỗi thực tế của infographic Bộ thoát

| Nhóm | Chuỗi | Nguồn dữ liệu |
|---|---|---|
| Khung enhanced | label "Bộ thoát Swiss lever (Escapement)", desc "Năm bước nhân quả tạo ra nhịp tíc-tắc…" | props từ Escapement.astro |
| 5 bước | t: "Bánh lắc trớn sang một phía" / "Ngựa mở khóa bánh thoát" / "Bánh thoát tiến một răng và truyền xung lực" / "Ngựa khóa răng kế tiếp" / "Bánh lắc đảo chiều, chu trình lặp"; e: Balance swings out / Unlock / Impulse / Lock / Reversal; d: mô tả dài VI | mảng `steps` (Escapement.astro) → cơ chế data-steps JSON |
| SVG tĩnh | aria-label + `<desc>` (VI); beat "● TÍC/● TẮC"; `data-name-vi`/`data-name-en` ×5 bộ phận | markup Escapement.astro |
| Tooltip | dòng VI (tên) + dòng EN phụ (tên) | data-name-* qua script |
| Panel khám phá | "Bộ phận"; mặc định "Bấm nút tên bộ phận…"/"Tên tiếng Việt, tiếng Anh và vai trò…"; khi chọn: PART_INFO[key].vi/.en/.role ×5 | Escapement.astro |
| Legend | 5 nút từ data-name | JS sinh từ [data-part] |

### 2.3 Đường tương tác và render

- Hai chế: CHU TRÌNH 5 bước (khung enhanced gọi `__mechGuided['escapement'].apply(i)`) và KHÁM PHÁ (nút legend/chạm → `selectByKey`); HOẠT ẢNH LIÊN TỤC `__mechSteps['escapement']` cho chế cũ (vẫn đăng ký, chế enhanced không dùng).
- **Đường chạy enhanced đang dùng (đối chiếu POSES thật, vòng sửa 2): góc bánh thoát 0, −8, −21, −24, −24°** — riêng bước 2→3 là **−13°**. Số "24°/nhịp; 15 răng × 24° = 360°" chỉ thuộc chế liên tục (`__mechSteps`, không dùng ở khung enhanced) — không dùng thông số chế liên tục để bảo vệ lời dẫn chế enhanced. Hệ quả: lời dẫn bước 3 "tiến một răng"/"xoay đúng một răng" KHÔNG khớp đường chạy hiển thị — **GK-5/5d CHỐT câu định tính (vòng sửa 3: "Bánh thoát quay một nhịp nhỏ…"); phương án B (sửa hình để giữ "một răng") KHÔNG CHỌN**.
- Vật lý minh họa còn lại: bánh lắc ±35° (nửa dao động/nhịp); ngựa ±10° búng cửa sổ 10%. Mô hình 15 răng là **thông số minh họa giản lược** — ~~Swiss lever thật thường 20 răng, bước nửa khoảng răng mỗi nhịp~~ **(câu đã THAY THẾ vòng sửa 2: khẳng định số răng thật không có nguồn, bỏ khỏi hồ sơ — không dựng lại).**
- RM: media query tắt transition/animation; khung dừng rAF khi rời viewport/tab ẩn — đo thật vòng sửa 2: D1 ĐẠT (bảng mục 4); tab ẩn chỉ mô phỏng (D2 QUAN SÁT).

### 2.4 Liên kết đọc tiếp VI/EN

VI bài: liên kết FHH (ngoài site) + relatedModels freak (`/mau-iconic/freak/` — có thật). EN bài: FHH + liên kết nội bộ `/en/glossary/escape-wheel/`, `/en/mechanisms/balance-and-hairspring/`, `/en/glossary/beat-rate/`, `/en/mechanisms/power-reserve/`, `/en/mechanisms/how-a-mechanical-watch-works/` — **tất cả tồn tại trong dist** (REQUIRED_EN đã phủ); không tự tạo URL.

## 3. Cổng nội dung — mã câu chờ duyệt (trích đồng bộ vòng sửa 3; bảng đầy đủ GK-1…16 + căn cứ HÌNH/NGUỒN/DỊCH trong output/bang-cong-noi-dung.md. **Mã chuẩn = bảng chi tiết: GK-9/9d = mô tả SVG; GK-12 = data-name ×5; GK-13 = nhãn khung chung**)

| Mã | Nguyên văn hiện hành | VI đề nghị (trạng thái) | EN đề nghị | Căn cứ | Chờ duyệt |
|---|---|---|---|---|---|
| GK-1 | label "Bộ thoát Swiss lever (Escapement)" | giữ | "Swiss lever escapement" | N1 | ✓ |
| GK-2 | desc khung "Năm bước nhân quả tạo ra nhịp tíc-tắc…" | giữ | "Five cause-and-effect steps make the tick-tock beat. Press play…" | DỊCH | ✓ |
| GK-3 | bước 1 t "Bánh lắc trớn sang một phía" | **CHỐT vòng sửa 3: "Bánh lắc chuyển động về phía giữa"** | "The balance moves towards the centre" | HÌNH | ✓ |
| GK-3d | bước 1 d "…nhờ năng lượng do dây tóc nhả ra từ nhịp trước" | **CHỐT vòng sửa 3: "Trong mô hình, bánh lắc chuyển động từ phía trái về vị trí giữa."** (bỏ diễn giải năng lượng — N3 không xác lập) | "In this model, the balance moves from the left towards the central position." | HÌNH | ✓ |
| GK-4 | bước 2 t/d (ngựa mở khóa) | giữ / thu hẹp bỏ nguyên nhân | "The lever unlocks the wheel" + dịch | HÌNH + N1 | ✓ |
| GK-5 | bước 3 t/d ("tiến một răng…"/"xoay đúng một răng…") | **CHỐT vòng sửa 3 (định tính): "Bánh thoát quay một nhịp nhỏ…"** — phương án B (sửa hình) KHÔNG CHỌN | "The escape wheel turns a small step…" | HÌNH + N1 | ✓ |
| GK-6 | bước 4 t/d (khóa) | thu hẹp: bỏ "phát tiếng 'tíc'" → "bánh thoát dừng lại ở vị trí khóa" | "The lever locks the next tooth" + dịch đã thu hẹp | HÌNH; âm thanh — N3 không gắn pha | ✓ |
| GK-7 | bước 5 t/d (đảo chiều) | **GK-7d CHỐT vòng sửa 3: "Bước này minh họa bánh lắc ở phía đối diện. Khi phát tiếp, sơ đồ quay lại bước đầu để lặp phần hướng dẫn; không mô phỏng riêng nửa chu kỳ tiếp theo."** (khớp mã enhanced — lặp lại cùng 5 POSES) | "This step shows the balance on the opposite side. Continuing playback returns the diagram to the first step and repeats the explanation; the next half-cycle is not simulated separately." | HÌNH (hành vi mã) | ✓ |
| GK-8 | "● TÍC / ● TẮC" | giữ (VI) | "● TICK / ● TOCK" | N3 | ✓ |
| GK-9/9d | aria-label + desc SVG | giữ | dịch EN | DỊCH + HÌNH | ✓ |
| GK-10 | panel "Bộ phận" + mặc định 2 câu | giữ | "Part" + dịch; câu 2 EN theo GK-15 (không nhắc tên tiếng Việt) | DỊCH | ✓ |
| GK-11a | PART_INFO escape-wheel role "Khoá và nhả từng răng để năng lượng cót…" | **CHỐT vòng sửa 3: "Bánh thoát được khóa và nhả theo từng nhịp trong cơ cấu bộ thoát."** | "The escape wheel is locked and released at intervals within the escapement." | N1 | ✓ |
| GK-11c | PART_INFO pallet-stones role "Hai đá rubi chạm… ma sát rất thấp… xung lực chính xác" | **CHỐT vòng sửa 3: "Hai đá pallet được thể hiện tại vùng tiếp xúc giữa ngựa và bánh thoát trong sơ đồ."** | "The two pallet stones are shown at the contact region between the lever and escape wheel in the diagram." | HÌNH (N2 chỉ liệt kê ba bộ phận) | ✓ |
| GK-11d/e | PART_INFO balance/hairspring role | thu hẹp theo N3 (vòng sửa 2) | dịch EN đã thu hẹp | N3 nguyên văn | ✓ |
| GK-12 | data-name ×5 (5 cặp tên: Bánh thoát/Escape wheel; Ngựa (pallet fork)/Pallet fork; Chân kính pallet/Pallet jewels; Bánh lắc/Balance wheel; Dây tóc/Hairspring) | giữ cho VI | — (hiển thị theo GK-15) | HÌNH + N2/N3 | ✓ |
| GK-13 | nhãn khung chung (đủ 2 chế, kể cả "Tạm dừng hoạt ảnh") | giữ cho VI | "Previous step / Play animation / Pause animation / Next step / Reset / Step x/n / Speed…" | DỊCH | ✓ |
| GK-15 | quy tắc hiển thị EN (tooltip/panel/legend) | giữ hiện trạng VI | EN KHÔNG hiện tên tiếng Việt ở bề mặt nào | ràng buộc biên tập | ✓ |
| GK-16a | nhãn giản lược (chưa có trên trang) | **CHỐT vòng sửa 3: "Sơ đồ hướng dẫn đã giản lược. Góc quay và các tư thế dùng để giải thích từng bước, không phải thông số thiết kế của một bộ máy cụ thể."** | "This is a simplified teaching diagram. Its angles and poses explain individual steps; they are not design specifications for a particular movement." | HÌNH | ✓ |
| GK-16b | nhãn roller (chưa có trên trang) | **CHỐT vòng sửa 3: "Theo FHH, bộ thoát gồm bánh thoát, ngựa và roller. Roller không được thể hiện trong sơ đồ này."** | "FHH identifies the escape wheel, lever and roller as the three parts of the escapement. The roller is not shown in this diagram." | N2 | ✓ |
| CL-1 | "tiến một răng" cạnh góc 24°/15 răng | THAY định tính (GK-5, CHỐT) + nhãn giản lược GK-16a vị trí GK-16 | như trái | POSES −13° ≠ 24°; FHH không chốt số răng thật | ✓ |
| CL-2 | roller — bộ phận thứ ba theo N2 — KHÔNG có trong sơ đồ (5 mục chọn hiện có: bánh thoát, ngựa, chân kính pallet, bánh lắc, dây tóc) | không thêm hình trong chặng 2 | nhãn GK-16b CHỐT + vị trí GK-16 | N2 | ✓ |

Phát hiện VI cần lưu ý (chưa sửa): câu bước 4 "phát tiếng 'tíc'" gắn thời điểm khóa — nguồn FHH mô tả tick-tock theo dao động, không chốt âm thanh phát ở pha nào. **Trạng thái vòng sửa 2: đã THAY đề nghị — GK-6d thu hẹp bỏ mệnh đề âm thanh ("bánh thoát dừng lại ở vị trí khóa"), không giữ "đề nghị giữ cách nói" của vòng sửa 1 nữa** (bản ghi "đề xuất giữ… hình dung phổ biến" đã THAY THẾ). Không phát hiện sai kỹ thuật khác ở VI trong phạm vi đối chiếu FHH.

## 4. Kiểm hành vi nền bằng trình duyệt (bằng chứng: log-g06c-nen.txt, log-g06c-rm-tai.txt, pw-g06c-nen.js, pw-g06c-rm-tai.js)

| Ca | Kết quả |
|---|---|
| VI: khung enhanced đủ SVG+4 nút+counter "Bước 1/5"+legend 5 nút+panel; 0 ID trùng | ĐẠT |
| VI: next→"Bước 2/5" (title đổi "Ngựa mở khóa bánh thoát"), prev→"Bước 1/5" | ĐẠT |
| VI: Phát (aria-pressed=true) → 1/5→2/5 tự tăng; Tạm dừng → đứng 2/5 | ĐẠT |
| VI: nút legend "Bánh thoát" → panel tên VI/EN + vai trò | ĐẠT |
| VI: hover SVG bánh thoát → tooltip opacity=1 tên VI | ĐẠT |
| VI: beat "● TÍC" hiện (mobile 30px — theo CSS) | ĐẠT |
| EN đối chứng: KHÔNG khung/SVG; banner fallback **không render** (điều kiện lang==='vi') | QUAN SÁT — phát hiện hồ sơ |
| EN: switcher về `/co-che/bo-thoat` | ĐẠT |
| VI 320px: tràn 0px (SVG co 250px); 768px: tràn 0px (570px) | ĐẠT |
| No-JS: SVG tĩnh render, nội dung 3422 ký tự đọc được; điều khiển JS vô hiệu (không banner riêng — quan sát) | ĐẠT (quan sát kèm) |
| RM reduce trước tải: next tức thì, tư thế đích −8° tức thì, transition 0s | ĐẠT (lặp lại trong vs3 — B1) |
| Đo tải VI: 9 request, HTML 89.713B + CSS ×3 + JS ×5, tổng giải nén 234.045B; **không chunk 3D** | ĐẠT (request thất bại: **chưa đo** — không có listener; xem mục 8) |

Tổng theo từng bản ghi thật: **log-g06c-nen.txt = 11 bản ghi (10 ĐẠT + 1 KHÔNG ĐẠT)** — ca KHÔNG ĐẠT (E1) do kỳ vọng sai của GLM: banner fallback KHÔNG render trên EN (điều kiện lang='vi'); đã đính chính và phân loại lại thành QUAN SÁT hiện trạng (bảng trên). **log-g06c-rm-tai.txt = 3 ĐẠT**.

**Vòng sửa 2 — `pw-g06c-vs3-phan-loai.js` + `log-g06c-vs3-phan-loai.txt` (bộ phân loại 4 trạng thái, tự kiểm bộ tổng kết 5/5 trước khi chạy ca thật): 15 ca = 12 ĐẠT + 1 CHƯA KIỂM + 2 QUAN SÁT, 0 KHÔNG ĐẠT.** Bản `log-g06c-vs2-bo-sung.txt` (14/14 ĐẠT) thành **LỊCH SỬ — THAY THẾ** vì B2/D1/D2 cộng quan sát vào đạt (GPT Work bắt):

| Ca vs3 | Phép đo | Trạng thái |
|---|---|---|
| A1/A2 bàn phím thật (Tab + Space/Enter), A3 Đặt lại về w=0 | giữ từ vs2, thêm tiêu chí nhãn "Tạm dừng hoạt ảnh" | 3 ĐẠT |
| B1 reduce trước tải | tư thế đích `rotate(-8deg)` tức thì + transition 0s | ĐẠT |
| B2 bật reduce KHI ĐANG PHÁT | pressed giữ true; counter tăng cách mẫu 3s (> chu kỳ bước 2,6s); transition wheel 0s — khung KHÔNG có listener reduce (quan sát thiết kế) | **QUAN SÁT** — không tiêu chí đạt; phương án chặng 2: thêm listener |
| B3 gỡ reduce rồi thao tác | đo TRƯỚC/SAU + mẫu giữa chuyển tiếp: computed matrix m1b khác cả 2 đầu (tween thật ~2,5° trên đường 0→−8°), tư thế đích `rotate(-8deg)`, transition 0.3s | ĐẠT (không gọi "RM đầy đủ" nếu không bắt được mẫu — phép đo ghi rõ) |
| C theme 6 ca (320/768/1440 × sáng/tối) | theme DOM khớp + nền khớp giá trị đo chuẩn của theme đó (light rgb(255,255,255) / dark rgb(32,39,45), hai chuẩn phải khác nhau) + tràn 0 — bỏ điều kiện "nền không trắng thì qua" | 6 ĐẠT |
| D1 rời viewport (cuộn thật) | chứng minh đang phát trước (cách mẫu 3s); ngoài view 6,5s (> 2× chu kỳ 2,6s) counter đứng; **quay lại kiểm riêng**: chạy tiếp | ĐẠT |
| D2 tab ẩn MÔ PHỎNG | override `document.hidden`/`visibilityState` + đọc lại xác nhận hidden=true/hidden; phản ứng ứng dụng: counter đứng 6,5s; phục hồi chạy lại. CDP `frozen` của vòng trước KHÔNG dùng lại (visibilityState=visible — không phải bằng chứng) | **QUAN SÁT** (mô phỏng — không phải tab thật) |
| D2b tab ẩn THẬT | headless một trang không có tab thật | **CHƯA KIỂM** |

Ảnh: `shots/g06c-{light,dark}-768-day.png` (624×1019 — chụp theo phần tử khung: đủ SVG bánh thoát/ngựa/bánh lắc, beat, hàng điều khiển, panel bước, panel Bộ phận, đủ 5 nút legend; GLM tự mở 2 ảnh xác nhận. **Giới hạn ghi nhận vòng sửa 3: dải trên cùng bị header dính che mất phần tiêu đề phía trên — đủ vùng sơ đồ/điều khiển/panel, KHÔNG gọi là ảnh toàn khung không che**) thay `g06c-{light,dark}-768.png` cũ 623×358 bị cắt phần dưới — giữ tên `*-cat-duoi-LICH-SU.png`.

## 5. Phương án chặng 2 (trình duyệt — chưa làm)

Tệp đề xuất: (1) `Escapement.astro` — thêm chuỗi EN (steps.t/d, PART_INFO.role, aria-label/desc, beat, nhãn giới hạn GK-16) theo cổng **GK-1…16** (GK-15: tooltip/panel/legend EN không tên VI); đọc `lang` qua prop mới từ MechanismArticle; (2) `MechanismAnimation.astro` — nhãn điều khiển theo prop `lang` **mặc định 'vi'** bảo toàn 21 trang render khác (đều chế cũ); (3) `MechanismArticle.astro` — gate `lang === 'vi'` mở cho EN khi hai cờ EN bật; (4) `src/content/coChe/en/escapement.md` — bật `has_infographic/interactive: true` sau khi nội dung EN đạt; (5) checkers: check-g06-escapement-en.mjs mới (nguồn: chuỗi EN, cờ; dist: SVG + chuỗi EN tĩnh trên /en/mechanisms/escapement/ — KHÔNG gồm legend vì legend là nút sinh bằng JS từ [data-part], kiểm legend ở tầng trình duyệt sau tương tác; không rò VI; trình duyệt: tương tác + tooltip/legend/panel EN theo GK-15) nối check/build; (6) check-english-launch: REQUIRED_EN giữ nguyên (route đã có). (7) `package.json`: nối checker mới vào `check`/`build` + lệnh `check:g06c`. (8) `check-regulating-cluster.mjs`: hiện chỉ cho hai cờ `true` ở bài day-toc-banh-lac/balance-and-hairspring — cần **ngoại lệ hẹp cho đúng bài escapement** (không mở rộng cho bài EN khác). Gate khóa riêng: chỉ `bo-thoat` ↔ `escapement` được bật; ca hồi quy chứng minh không bật nhầm component khác (grep map slug → component — bảng `bang-nhan-dien-khung.md`).

Mutation đề xuất — **mã thống nhất M2-1…M2-4 khớp ma trận chặng 2** (bộ M1–M4 của vòng sửa 1 đã THAY THẾ): M2-1 gỡ nhãn EN một nút → dist bắt; M2-2 gate sai (`lang==='en'` && has_infographic=true nhưng component không bản dịch) hoặc cờ frontmatter true khi chưa có bản dịch → nguồn bắt; M2-3 render-only: vá render lộ chuỗi VI trên trang EN → DOM bắt; M2-4 mất đích SVG (xóa id) → trình duyệt bắt. Không route mới, không Three.js, không ảnh AI.

Hồi quy khung chung: đổi nhãn khung phải chạy lại kiểm nhanh **21 trang render khác bo-thoat** (16 /co-che/ + 5 /tu-dien/ — danh sách đủ trong output/ma-tran-chang-2.md; bản liệt kê 12 route thiếu chong-soc/gmt/perpetual-calendar/diem-chuong đã THAY THẾ): nhãn VI + counter "Bước x/n" giữ nguyên, 4 nút hoạt động, không lỗi console. Ngoài viewport/tab ẩn: nền VI đã đo (D1 ĐẠT / D2 QUAN SÁT mô phỏng) — chặng 2 lặp đúng phép đo này trên EN (B2-5).

## 6. Bảng hỗ trợ đánh giá nhân rộng G04 (KHÔNG quyết thay GPT Work)

| Nhóm | Cơ chế | Cặp EN thật? | SVG tương tác sẵn? | Chương kể chuyện? | Nhận xét |
|---|---|---|---|---|---|
| Phù hợp SVG đơn thuần | bo-thoat/escapement | ✓ | ✓ (5 bước, enhanced) | chưa | ứng viên tích hợp ngay (gói này) |
| Phù hợp SVG đơn thuần | chuyen-dong-co (GearTrain) | ✓ how-a-mechanical-watch-works (vòng sửa 2 điền — "?: chưa kiểm" cũ đã THAY THẾ) | ✓ (cũ) | chưa | cặp xác nhận trong ARTICLE_PAIRS |
| Phù hợp SVG đơn thuần | len-day-tu-dong (AutomaticWinding) | ✓ automatic-winding (vòng sửa 2 điền) | ✓ (cũ) | chưa | như trên |
| Có thể có chương kể chuyện | day-toc-banh-lac / balance-and-hairspring | ✓ (G04-B đã làm; /co-che/ đã thay khung bằng mô hình riêng) | ✓ + ảnh AI + chương | ✓ đã có | mô hình tham chiếu G04 |
| Chưa đủ cơ sở | chronograph, tourbillon, perpetual-calendar, gmt, pha-trang, diem-chuong, hien-thi-ngay, da-quang, kinh-dong-ho, chong-* , tru-cot | một phần (chi tiết từng bài: output/bang-nhan-rong-g04.md) | tùy | chưa | khối lượng lớn, cần khối lượng/phạm vi riêng trình anh |

Giả định khối lượng (không cam kết): mỗi cơ chế ~ dịch chuỗi khung+infographic (0,5–1 ngày), SVG mới nếu thiếu (lớn), chương kể chuyện (lớn nhất, cần nguồn sâu). Ảnh AI: tùy chọn, không làm bằng chứng.

## 7. Bằng chứng (output/g06-escapement-en-audit/)

**Hiện hành (vòng sửa 3):** pw-g06c-vs3-phan-loai.js + log-g06c-vs3-phan-loai.txt (15 ca = 12 ĐẠT + 1 CHƯA KIỂM + 2 QUAN SÁT; tự kiểm bộ tổng kết 5/5 ghi trong log); kiem-ke-khung-render.cjs + bang-nhan-dien-khung.md (bảng component→consumer→route→render→chế độ sinh từ mã + dist — 22 trang = 17+5); bang-cong-noi-dung.md (GK-1…16 với căn cứ HÌNH/NGUỒN/DỊCH từng câu + các câu CHỐT vòng sửa 3 + nhãn GK-16a/16b nguyên văn; phương án B GK-5 lưu vết KHÔNG CHỌN); ma-tran-chang-2.md (mã chuẩn bảng chi tiết, T2-1 gồm GK-9/9d, GK-13 thuộc T2-2, T2-3 khóa chỉ cặp Bộ thoát); bang-nhan-rong-g04.md (18 VI/14 EN/14 cặp/4 VI-only, hai cặp "?" đã điền); shots/g06c-{light,dark}-768-day.png (đủ sơ đồ/điều khiển/panel; dải tiêu đề phía trên bị header che — giới hạn đã ghi); do-tai-trang-thai.json (vòng sửa 2: "chưa đo"/"nguyên nhân chưa xác định").
**Lịch sử (giữ làm vết):** log-build-nen.txt (build nền ced15b8: exit 0, 0/0/4 hints, 289 HTML/21.033 link, g06-compare dist 14/14); log-english-launch.txt (EXIT 0, đủ 63 route); pw-g06c-nen.js + log-g06c-nen.txt (11 ca: 10 ĐẠT + 1 KHÔNG ĐẠT kỳ vọng sai đã đính chính); pw-g06c-rm-tai.js + log-g06c-rm-tai.txt (RM 2 chiều + đo tải lượt 1 — điều kiện chặn font đã ghi); pw-g06c-tai-v2.js + log-g06c-tai-v2.txt (đo tải đúng phương pháp — bị chặn phiên, Session closed); **pw-g06c-vs2-bo-sung.js + log-g06c-vs2-bo-sung.txt (14/14 ĐẠT — THAY THẾ bởi vs3: B2/D1/D2 cộng quan sát vào đạt, D1 mẫu liên tiếp, D2 frozen visible, B3 chưa chứng minh tween)**; shots/g06c-{light,dark}-768-cat-duoi-LICH-SU.png (ảnh cũ 623×358 cắt phần dưới); fhh-*.json + fhh-tu-khoa.json (hồ sơ nguồn FHH JSON endpoint).

## 8. Giới hạn

- T3b-DOM/bảng đối chiếu từng ô là việc chặng 2; chặng này mới kiểm nền.
- Ngoài viewport: ĐÃ ĐO trên nền VI (D1 ĐẠT — đứng 6,5s ngoài view, chạy lại khi quay vào). Tab ẩn: chỉ MÔ PHỎNG được (D2 QUAN SÁT — defineProperty + dispatchEvent); **tab thật CHƯA KIỂM** (headless một trang).
- B2 (bật reduce khi đang phát): khung KHÔNG có listener reduce — phát tiếp ở tầng counter (QUAN SÁT thiết kế hiện hành); trình phương án chặng 2 nếu muốn dừng tức thì.
- Byte truyền không đo được (preview không gửi content-length) — số là byte giải nén; request thất bại **chưa đo** (lượt chạy thành công không có requestfailed listener — không ghi 0).
- FHH ĐÃ truy cập thật qua JSON endpoint (2026-09-15, nguyên văn 3 mục N1–N3); trang HTML SPA fetch rỗng — không dựng trích dẫn từ trang HTML.
- Đo tải lượt 2 (không chặn font, requestfailed listener) nhất quán làm sập phiên playwright — lỗi quan sát được: Session closed; **nguyên nhân CHƯA XÁC ĐỊNH**. Chặng 1 chấp nhận không đo lại tải đầy đủ; không thử bằng cách đóng Chrome cá nhân.
- Banner fallback VI-only là phát hiện thiết kế hiện hành — chặng 2 quyết khi bật EN.
- B3: mẫu giữa chuyển tiếp bắt được ở lần thử thứ hai (m1b); nếu cả hai mẫu đều trượt (không phân biệt được tween) phép đo ghi CHƯA KIỂM thay vì ĐẠT — lần chạy này ĐẠT với m1b = ma trận ~2,5° trên đường 0→−8°.
- **Chốt GPT Work vòng sửa 3 (áp cho chặng 2):** giới hạn "chưa đo tải đầy đủ" và "tab ẩn thật CHƯA KIỂM" được chấp nhận cho chặng kiểm kê này nhưng **KHÔNG được chứng nhận tương ứng khi chặng 2 tích hợp**; B2 giữ QUAN SÁT — không tự miễn yêu cầu reduced-motion ở chặng 2. Ảnh hiện có đủ vùng sơ đồ/điều khiển/panel nhưng dải tiêu đề phía trên bị header dính che — ghi giới hạn, không chụp lại cho lượt kiểm kê.

## 9. Nghiệm thu GPT Work — TXN-20260915-7

Hồ sơ G06-C chặng 1 ĐẠT sau đối chiếu độc lập qua các vòng sửa. Chấp thuận câu chốt VI/EN và mã cổng trong bảng chi tiết vòng sửa 3; chọn mô tả định tính GK-5/5d, không chọn phương án B sửa hình. Phạm vi tích hợp chỉ cặp Bộ thoát; chặng 2 cần prompt riêng trước khi thực hiện.

Đã kiểm độc lập 22 trang render (17 cơ chế + 5 từ điển), phần tự kiểm bộ tổng kết 5/5 và số liệu log hiện hành: 12 ĐẠT + 2 QUAN SÁT + 1 CHƯA KIỂM. Kiểm kiểu độc lập ở lượt TXN-20260915-5: exit 0, 301 tệp, 0 lỗi / 0 cảnh báo / 4 hints baseline. Lượt chốt này chỉ đổi hồ sơ, không chạy lại build hoặc trình duyệt. Log `log-astro-check-vs3.txt` là lịch sử trung gian 7 hints trước khi dọn biến, không phải kết quả cây cuối; giữ nguyên nội dung kết quả.

Danh sách commit: 1 biên bản này + 31 tệp trong `output/g06-escapement-en-audit/` (gồm 4 PNG), tổng 32 tệp. GPT Work chuẩn hóa khoảng trắng/dòng trống cuối ở bốn tệp bằng chứng: log kiểm kiểu trung gian, hai log preview và bảng nhận diện khung; không thay kết quả đo, không sửa PNG hay mã website.

Giữ nguyên mọi giới hạn mục 8. Nghiệm thu này không chứng nhận tính năng EN đã tích hợp, không đóng toàn G06-C/G06, không mở nhân rộng chương G04 hoặc ảnh AI mới.
