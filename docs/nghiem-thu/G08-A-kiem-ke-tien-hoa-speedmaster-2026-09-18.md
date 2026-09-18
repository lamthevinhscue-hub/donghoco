# Biên bản G08-A — Kiểm kê và hồ sơ nguồn sơ đồ tiến hóa Omega Speedmaster

- **Giao việc**: TXN-20260918-5 (danh mục DHC-G05G09-20260913); anh Vinh đã chọn dòng Omega Speedmaster cho G08.
- **Nền**: `d5c2eed` — đã đối chiếu HEAD = origin/main trước khi làm.
- **Ngày thực hiện**: 2026-09-18.
- **Phạm vi duyệt**: chặng kiểm kê/cổng dữ liệu — hồ sơ nguồn + đề xuất dataset song ngữ; **chưa tích hợp sơ đồ vào website**; không sửa `src/`, `public/`, `package.json`, checker hiện hành, cấu hình, nội dung bài Speedmaster VI/EN; không tạo route, không tạo ảnh AI, không tự tạo sơ đồ.

## 0. Kết luận

Hồ sơ nguồn đạt **7 mốc được chọn** (đủ URL HTTPS + trích nguyên văn + phạm vi chứng minh, kiểm ngày 18/09/2026) + **4 nhóm bỏ qua có lý do** + **4 nhóm chưa đủ nguồn**. Đề xuất dataset 7 mốc VI/EN tại `output/g08-speedmaster-evolution-audit/du-kien-g08-a.json` qua **22/22 ca kiểm máy ĐẠT**. Chứng minh được G08-B **không cần route mới** (khuôn render theo slug + lang tại hai route có sẵn). Build nền `exit 0` (astro check **328 tệp — 0 lỗi / 0 cảnh báo / 4 hints** nền; links **290 trang / 21.142 link** 0 hỏng; Pagefind 290; sitemap 289 URL); kiểm tiếng Anh `exit 0 — ĐẠT`. **Dừng chờ GPT Work nghiệm thu + anh Vinh duyệt mở G08-B.** Không mở G09.

## 1. Tệp của gói (chỉ tạo mới, không sửa tệp nào)

1. `docs/ho-so-du-lieu-tien-hoa-omega-speedmaster.md` — hồ sơ nguồn (7 mốc + bỏ qua + chưa đủ nguồn + ràng buộc G08-B).
2. `docs/nghiem-thu/G08-A-kiem-ke-tien-hoa-speedmaster-2026-09-18.md` — biên bản này.
3. `output/g08-speedmaster-evolution-audit/` — `du-kien-g08-a.json` (dataset đề xuất), `kiem-du-kien-g08-a.cjs` (kiểm máy), `quet-nhay-cam.cjs` (module quét nhạy cảm — thêm vòng sửa 1), `sweep-g08-a.cjs` (định dạng), 4 log (script + log tự kiểm C8 đặt NGOÀI repo — xem mục 9.1).

Git: **0 tệp M, 0 staged**; chỉ 3 đường dẫn `??` mới của gói; các tệp untracked có trước giữ nguyên, không đụng. **Tổng số tệp gói G08-A: 10** (2 tệp docs + 8 tệp output).

## 2. Kiểm kê khuôn (5 tệp đã đọc)

### 2.1. Schema và sổ đăng ký — `src/data/modelEvolution.ts`

- `LocalizedText { vi, en }`; `DisplayText = string | LocalizedText`; hàm `tText(value, lang)` (dòng 24–36).
- `ModelEvolutionMilestone` (dòng 38–54): `year: number`; `reference`, `label`, `change`, `note`: `DisplayText` (reference/số không dịch; tên thế hệ mô tả là DisplayText); `sourceUrl: string` (bắt buộc HTTPS); `sourceName: string` (tên riêng không dịch).
- `ModelEvolutionDataset` (dòng 56–69): `slug` (khóa render), `name`, `publishedLangs: ReadonlyArray<'vi'|'en'>`, `title`, `intro`, `milestones[]` **theo thứ tự thời gian tăng dần**.
- Sổ đăng ký: mảng `DATASETS` ở cuối tệp (dòng 75, hiện 2 phần tử `rolexGmtMasterEvolution`, `submarinerEvolution` — thứ tự alphabet theo slug; quy tắc đặt tên tệp `<brand>-<model>Evolution.ts`, comment dòng 17–21 nêu rõ quy trình "hồ sơ dữ liệu trước, dataset sau").
- Hành vi ngôn ngữ (dòng 82–87): `getEvolutionDataset(slug, lang)` trả `undefined` nếu slug không khớp **hoặc** `lang` không nằm trong `publishedLangs` — dataset thiếu bản dịch không hiện ở trang English.

### 2.2. Component render — `src/components/ModelEvolution.astro`

- Props `{ dataset, lang }`; mọi chữ người đọc qua `tText()`/`ui.ts` — component không chứa dữ kiện (đầu tệp, dòng 1–28).
- Cấu trúc: `<section data-evolution aria-labelledby="{slug}-evolution-title">`; nút thật `type="button"` + `aria-pressed`; thẻ chi tiết `role="group"` + `aria-label` từ khóa `evolution_detail_aria` (thay `{year}/{name}/{reference}`); link nguồn `evolution_view_source` + `sourceName`, `target="_blank" rel="noopener noreferrer"`; vạch SVG trang trí `aria-hidden`.
- Trợ năng/hành vi (comment + CSS + script trong tệp): ≥768px có JS = lưới ngang một chi tiết đang chọn (số cột theo `--evol-cols` = số mốc); **<768px hoặc không JS = danh sách dọc đầy đủ, mọi thẻ chi tiết luôn mở**; `prefers-reduced-motion` = chuyển tức thời (media query `no-preference` bọc transition); không ảnh đồng hồ, không carousel, không animation lặp; script `is:inline` scope theo root, không cướp/trap focus.

### 2.3. Điểm nối template — `src/components/templates/IconicArticle.astro`

- Dòng 14–15: import `ModelEvolution` + `getEvolutionDataset`; dòng 29: `const evolutionDataset = getEvolutionDataset(slug, lang)`; dòng 155: `{evolutionDataset && <ModelEvolution dataset={evolutionDataset} lang={lang} />}` — **điều kiện render duy nhất là slug bài + lang trang**.

### 2.4. Hai route Speedmaster VI/EN hiện hữu — không cần route mới

- `src/pages/mau-iconic/[slug].astro` (vi) và `src/pages/en/iconic-watches/[slug].astro` (EN wrapper) cùng gọi `IconicArticle`; `getStaticPaths` sinh trang cho mọi entry `mauIconic` theo lang — route KHÔNG phụ thuộc dataset.
- `src/i18n/contentRoutes.ts` dòng 107: `{ vi: '/mau-iconic/omega-speedmaster', en: '/en/iconic-watches/omega-speedmaster/' }` — cặp route đã tồn tại và đã được kiểm bằng `check-english-launch`.
- Khóa i18n song ngữ có sẵn: `evolution_detail_aria` + `evolution_view_source` ở cả vi (`ui.ts` 221–222) lẫn en (437–438).
- **Chứng minh:** khi G08-B duyệt, chỉ cần (a) tệp dataset mới `omegaSpeedmasterEvolution` với `slug: 'omega-speedmaster'`, `publishedLangs: ['vi','en']`, và (b) thêm 1 dòng import + 1 phần tử vào `DATASETS` (thứ tự alphabet: trước `rolexGmtMasterEvolution`). Sơ đồ tự render tại đúng 2 route có sẵn; **0 tệp route/template/i18n phải sửa**. Script kiểm máy ca C7 đã đối chiếu cặp route trong `contentRoutes.ts` (ĐẠT).

## 3. Hồ sơ nguồn — tổng kết

Chi tiết từng nguồn (URL, tên nguồn, ngày kiểm 2026-09-18, phương thức WebFetch, trích nguyên văn, phạm vi chứng minh, giới hạn) tại `docs/ho-so-du-lieu-tien-hoa-omega-speedmaster.md`:

| Nhóm | Nội dung |
|---|---|
| ĐƯỢC CHỌN (7) | N1 1957 CK 2915 (Monochrome + Omega '57 catalog) · N2 1962 Sigma 7 (Omega) · N3 1965 NASA 1/3/1965 (Omega) · N4 1968 calibre 861 (Monochrome) · N5 1969 Moonwatch (Omega + Smithsonian) · N6 1970 Apollo 13 (Omega) · N7 2021 calibre 3861 (Hodinkee + Omega) |
| Tra được nhưng BỎ QUA (5) | Ed White/105.003 (nguồn đã thu không nêu — không bịa reference); tên "Professional" từ 1966 (không nguồn); Apollo 8/ph phiên bản kỷ niệm (ngoài phạm vi thay đổi chính); chi tiết Armstrong để đồng hồ trong tàu (chưa có nguồn — sang ràng buộc G08-B); Silver Snoopy (chưa đủ nguồn — mục dưới) |
| CHƯA ĐỦ NGUỒN (4) | Silver Snoopy 1970; trang nasa.gov về Speedmaster (máy tìm không trả kết quả trong miền — Smithsonian đã thay vai trò bảo tàng); các năm của 3570.50 (1996–2014) / 310.30.42; chi tiết từng bài thử NASA (sốc/chân không/nhiệt/độ ẩm) |

Không có reference, biệt danh, thông số, số lượng thử nghiệm hay quan hệ nhân quả nào ngoài các trích dẫn; mức chứng minh từng mốc được ghi rõ để GPT Work duyệt hoặc loại từng mốc. *(Đính chính vòng sửa 1 — TXN-20260918-8: N2 CK 2998 là mức TRỰC TIẾP từ trang Omega, không còn "gián tiếp"; N6 reference thu hẹp còn "Speedmaster" đúng nguyên văn nguồn — xem mục 9.)*

## 4. Đề xuất dataset + kiểm máy

- `du-kien-g08-a.json`: 7 mốc, mỗi mốc đủ `year / reference{vi,en} / label{vi,en} / change{vi,en} / note{vi,en} / sourceUrl / sourceName` + `hoSoId` trỏ hồ sơ; hai ngôn ngữ cùng phạm vi dữ kiện; reference và tên nguồn không dịch; title/intro song ngữ; `publishedLangs: ['vi','en']`.
- Kiểm máy `kiem-du-kien-g08-a.cjs` — **22/22 ĐẠT, exit 0** (log-kiem-du-kien.txt): C1 JSON hợp lệ; C2 cấp dataset; C3 từng mốc đủ trường (×7); C4 năm tăng dần 1957→2021; C5 sourceUrl thuộc hồ sơ (×7); C6 không từ cấm giá/đầu tư/hiếm/thắng-thua/khuyến nghị (0 khớp); C7 cặp route có sẵn; C8 gói không dữ kiện nhạy cảm (0 tệp).

## 5. Ràng buộc G08-B từ rà bài hiện có (không sửa trong G08-A)

Đối chiếu `omega-speedmaster.md` VI/EN với nguồn — bảng 8 dòng cần thu hẹp/bổ sung nguồn ghi tại hồ sơ mục 5: "duy nhất từng lên Mặt Trăng" (excerpt); "NASA bí mật mua" (→ "bốn hãng được mời"); danh sách bài thử cụ thể; "105.012/145.012 (1964–1969)"; "cực hiếm và được sưu tầm mạnh" (độ hiếm thuộc nhóm cấm); "3570.50 (1996–2014)"; chi tiết "bộ hẹn giờ tàu hỏng"; quan hệ nhân quả "rotor không hoạt động trong không trọng lực". Frontmatter `year: 1957` và `movement: "Calibre 3861"` khớp nguồn — giữ. Không rà tiếp các câu ngoài phạm vi sơ đồ (tránh biến thành audit toàn bộ Omega).

## 6. Phương án G08-B (đề xuất)

### 6.1. Danh sách tệp dự kiến + giới hạn từng tệp

| Tệp | Giới hạn |
|---|---|
| `src/data/omegaSpeedmasterEvolution.ts` (mới) | sao nguyên văn `du-kien-g08-a.json` theo interface `ModelEvolutionDataset`; comment dẫn hồ sơ nguồn; KHÔNG thêm/sửa mốc ngoài hồ sơ |
| `src/data/modelEvolution.ts` | chỉ +2 dòng: import và thêm `omegaSpeedmasterEvolution` vào `DATASETS` (alphabet) |
| script kiểm G08 | tái dùng `check-evolution-data`/`check-evolution-routes` hiện hành (generic); nếu script liệt kê slug cứng thì thêm đúng 1 dòng cấu hình; thêm ca mutation M1–M5 của G08 |
| biên bản + `output/g08-speedmaster-evolution-b/` | script trình duyệt + logs + ảnh |
| CẤM đụng | `contentRoutes.ts`, `[slug].astro`, `IconicArticle.astro`, `ModelEvolution.astro`, `ui.ts`, `package.json`, bài Speedmaster VI/EN (ràng buộc mục 5 chờ GPT Work quyết riêng) |

### 6.2. Mutation tối thiểu (mỗi ca phải FAIL đúng lý do rồi hoàn nguyên)

| Mã | Biến đổi | Kỳ vọng bắt |
|---|---|---|
| M1 | xóa `sourceUrl` 1 mốc | thiếu trường bắt buộc → fail |
| M2 | sửa `change.en` lệch dữ kiện `change.vi` (vd "14-second" → số khác) | lệch cặp VI/EN → fail |
| M3 | hoán đổi `year` hai mốc | vi phạm tăng dần → fail |
| M4a | `publishedLangs` → `['vi']` | dist EN không còn section (và ngược lại) |
| M4b | đổi `slug` dataset thành `rolex-submariner` | trùng slug — `DATASETS.find` trả phần tử đầu; trang submariner KHÔNG render dataset Speedmaster |
| M5 | quét toàn dist | chuỗi sơ đồ (`data-evolution` + tiêu đề) chỉ có đúng 2 route Speedmaster, 0 tệp khác |

### 6.3. Ma trận trình duyệt

VI/EN × sáng/tối × 320/768/1440 (không tràn ngang, nội dung khớp ngôn ngữ trang); bàn phím: Tab tới nút mốc, Enter/Space chọn, `aria-pressed` chuyển đúng, chi tiết hiện theo mốc; reduced-motion: chuyển trạng thái tức thời (không transition); no-JS: danh sách dọc đầy đủ, mọi thẻ chi tiết mở, không thuộc tính `data-js`; link nguồn: `href` đúng `sourceUrl` hồ sơ, `target="_blank"` + `rel="noopener noreferrer"`; Pagefind index bình thường; hai route còn lại của khuôn (Submariner, GMT-Master) hồi quy không đổi.

## 7. Kiểm chứng chặng A (số liệu thật, nền `d5c2eed`)

| Kiểm | Kết quả |
|---|---|
| `npm run build` | **exit 0**; astro check **328 tệp — 0 lỗi / 0 cảnh báo / 4 hints** (đúng nền; script .cjs mới không sinh hints); check-links **"Đã quét 290 trang HTML, 21142 link"** 0 hỏng; Pagefind indexed 290; sitemap 289 URL (log-build-nen.txt) |
| Kiểm tiếng Anh | `node scripts/check-english-launch.mjs` — **exit 0, KẾT LUẬN ĐẠT** (log-english-nen.txt) |
| Kiểm máy dataset | **22/22 ĐẠT, exit 0** (log-kiem-du-kien.txt) |
| Sweep gói (8 tệp: whitespace/EOF/JSON/ký tự lạ/nhạy cảm) | **TONG_LOI=0** (log-sweep-g08-a.txt); log build nền đã làm sạch 6 vị trí space cuối dòng từ đầu ra công cụ (không đổi nội dung) |
| `git diff --check` | **sạch** (exit 0) |
| Trạng thái | 0 tệp M, 0 staged; chỉ 3 đường dẫn `??` mới của gói; untracked có trước giữ nguyên |

## 8. Giới hạn và điểm dừng

1. Lượt tra KHÔNG dùng JavaScript: một số trang Omega (`/chronicle` gốc, trang giai đoạn, mục lục) trả khung rỗng — chỉ dùng được 3 bài Chronicle riêng + trang sản phẩm/catalog (chi tiết hồ sơ mục 6).
2. Không tìm được trang nasa.gov trong lượt này (đã thử nhiều truy vấn + lọc miền) — hồ sơ ghi rõ để GPT Work quyết định mức N3/N5 hoặc bổ sung URL NASA.
3. Dataset là ĐỀ XUẤT ở tầng JSON — chưa có tệp `.ts`, chưa đăng ký, chưa render; không có thay đổi nào lên website.
4. **Dừng chờ GPT Work nghiệm thu G08-A và anh Vinh duyệt mở G08-B.** Chưa commit, chưa push, chưa deploy. **Không mở G09.**

---

## 9. Vòng sửa 1 (TXN-20260918-8, ngày 18/09/2026) — ĐÃ ĐẠT, chờ tái nghiệm thu

**Hai lỗi GPT Work có bằng chứng:** (1) chạy lại checker trượt C8 — log build nền chứa từ "token" theo ngữ cảnh design token CSS (4 vị trí: "các cặp token bắt buộc", "8 token var(--…)") bị pattern từ đơn lẻ bắt nhầm; (2) N6 ghi reference "Speedmaster Professional" trong khi nguồn N6 chỉ viết "Using their Speedmaster watches…"; ngược lại N2 bị xếp mức "gián tiếp" trong khi trang Omega xác nhận trực tiếp CK-2998 cho mốc Sigma 7.

### 9.1. C8 — chỉ bắt credential có cấu trúc

- Tách module `quet-nhay-cam.cjs` (một nguồn logic): chỉ bắt khi từ khóa nhạy cảm (api key, secret, password, passwd, pwd, Authorization, Bearer, token) **kèm phép gán và giá trị**; từ khóa ĐƠN LẺ trong ngữ cảnh kỹ thuật/prose là vô hại — không bắt. Không whitelist cứng tệp nào.
- Tự kiểm cô lập NGOÀI repo (script + log kết quả đặt ở thư mục tạm ngoài repo, dùng đúng module trong repo) — **10/10 ĐẠT** (4 mẫu vô hại kiểu "token" CSS/prose + log build nền thật đều QUA; 5 mẫu giả có cấu trúc gán giá trị — api key, client secret, Authorization Bearer, access token, password — đều BỊ BẮT; trích kết quả tại 9.4; log chi tiết giữ ở thư mục tạm để tránh đưa mẫu giả credential vào gói, nếu không C8 sẽ bắt đúng theo thiết kế).

### 9.2. N2 — đính chính mức chứng minh (trực tiếp)

Hồ sơ N2: bỏ nhãn "GIÁN TIẾP"; ghi rõ câu "Today's watch is based on the original CK-2998 model." nằm ngay mục "HISTORY WAS MADE" liền sau phần kể sứ mệnh Schirra trên cùng trang — trang chính hãng xác nhận trực tiếp sứ mệnh 1962 và gọi CK-2998 là mẫu gốc. **Dataset giữ reference CK 2998** — câu VI/EN chỉ dùng đúng mức nguồn xác nhận (đã đối chiếu từng câu).

### 9.3. N6 — thu hẹp reference

`du-kien-g08-a.json` mốc 1970: `reference` VI/EN → **"Speedmaster"** (đúng cách gọi trực tiếp của nguồn N6); bỏ cách ghép tên thế hệ từ mốc 1965/1969. Hồ sơ N6 đồng bộ ghi chú thu hẹp theo TXN-20260918-8.

### 9.4. Tái kiểm toàn bộ (số liệu thật)

| Kiểm | Kết quả |
|---|---|
| `node output/g08-speedmaster-evolution-audit/kiem-du-kien-g08-a.cjs` | **exit 0 — 22/22 ĐẠT** trên toàn bộ tệp gói (C8 quét cả 5 log bằng module mới: 0 khớp; log-kiem-du-kien.txt) |
| Tự kiểm C8 ngoài repo | **10/10 ĐẠT** (script + log tại thư mục tạm ngoài repo: `C:\Users\Admin\AppData\Local\Temp\g08-a-vs1-tu-kiem-c8.cjs` + `g08-a-vs1-log-tu-kiem-c8.txt`) |
| `node output/g08-speedmaster-evolution-audit/sweep-g08-a.cjs` (11 tệp) | **TONG_LOI=0** (log-sweep-g08-a.txt) |
| `git diff --check` | **sạch** (exit 0) |
| Stage thử toàn bộ 11 tệp G08-A → `git diff --cached --check` | **exit 0** → đã bỏ stage (staged về 0) |
| Website | **0 tệp src/public/package/checker bị sửa** — `git status` chỉ có 3 đường dẫn `??` của gói, 0 tệp M |

### 9.5. Điểm dừng vòng sửa 1

**Dừng chờ GPT Work tái nghiệm thu.** Chưa commit, chưa push, chưa deploy; không mở G08-B hoặc G09. HEAD = origin/main = `d5c2eed`.
