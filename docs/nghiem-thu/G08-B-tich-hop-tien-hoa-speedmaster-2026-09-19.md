# Biên bản G08-B — Tích hợp sơ đồ tiến hóa Omega Speedmaster

- **Giao việc**: TXN-20260919-1 (danh mục DHC-G05G09-20260913); kế tục G08-A (đã commit `4ab0163` — "docs(evolution): approve Speedmaster source audit").
- **Nền**: `4ab0163` — đã đối chiếu HEAD = origin/main trước khi làm.
- **Ngày thực hiện**: 2026-09-19.
- **Phạm vi duyệt**: tích hợp sơ đồ 7 mốc song ngữ tại `/mau-iconic/omega-speedmaster` + `/en/iconic-watches/omega-speedmaster`; thu hẹp 8 nhóm claim tại hai bài Speedmaster; không tạo route/ảnh AI; cấm sửa route, `contentRoutes.ts`, template/component, `ui.ts`, CSS, `package.json`, cấu hình, ảnh, bài khác. GLM không commit/push/deploy.

## 0. Kết luận

Sơ đồ tích hợp xong: **7 mốc khớp hồ sơ G08-A từng trường** (kiểm máy 70/70 ĐẠT), render đúng hai route × hai ngôn ngữ (dist xác nhận), hai bài VI/EN đã thu hẹp đủ 8 nhóm claim. `npm run check` **exit 0**, `npm run build` **exit 0** (astro check **333 tệp — 0 lỗi / 0 cảnh báo / 4 hints** đúng nền; links **290 trang / 21.154 link** 0 hỏng; Pagefind 290), English launch **exit 0 — ĐẠT**. Mutation sandbox **M1–M5: 6/6 ĐẠT** (lỗi đúng rule, hoàn nguyên hash khớp). Trình duyệt **21/21 ĐẠT**. **Dừng chờ GPT Work nghiệm thu. Không mở G09.**

## 1. Danh sách tệp (3 sửa + 16 tạo mới = 19 tệp)

### Sửa (3)
| Tệp | Thay đổi |
|---|---|
| `src/data/modelEvolution.ts` | +1 dòng import `omegaSpeedmasterEvolution` + thêm vào `DATASETS` (thứ tự alphabet: trước `rolexGmtMasterEvolution`) — đúng mức "sửa tối thiểu" |
| `src/content/mauIconic/vi/omega-speedmaster.md` | thu hẹp 8 nhóm claim (mục 2); `updated: "2026-09-01"` → `"2026-09-19"`; giữ `year: 1957`, `movement: "Calibre 3861"` |
| `src/content/mauIconic/en/omega-speedmaster.md` | đối xứng bản VI; thêm `updated: "2026-09-19"` (trước đó chưa có trường này) |

### Tạo mới (2 nội dung/hạ tầng + hồ sơ)
- `src/data/omegaSpeedmasterEvolution.ts` — dataset 7 mốc sao nguyên văn `du-kien-g08-a.json` (kèm mã hoSoId N1–N7 trong comment), interface `ModelEvolutionDataset`, `publishedLangs: ['vi','en']`.
- `scripts/check-g08-speedmaster-evolution.cjs` — kiểm riêng G08, chạy standalone sau build (KHÔNG thêm vào `package.json` — tệp này cấm sửa).
- `docs/nghiem-thu/G08-B-tich-hop-tien-hoa-speedmaster-2026-09-19.md` — biên bản này.
- `output/g08-speedmaster-evolution-b/` — 2 script kiểm (mutation driver, pw) + sweep + 9 log + 1 ảnh `shots/g08b-vi-1440-sang.png`.

### Không đụng
Route, `contentRoutes.ts`, `IconicArticle.astro`, `ModelEvolution.astro`, `ui.ts`, CSS, `package.json`, checker evolution hiện hành (KHÔNG cần cấu hình — `check-evolution-data.mjs` và `check-evolution-routes.mjs` quét generic mọi `src/data/*.ts`, log check ghi nhận sẵn: "Omega Speedmaster: 7 mốc · xuất bản: vi+en"), mọi bài khác.

## 2. Thu hẹp 8 nhóm claim tại hai bài (đúng hồ sơ G08-A mục 5)

| # | Trước | Sau |
|---|---|---|
| 1 | excerpt "Đồng hồ chuyên nghiệp **duy nhất từng** lên Mặt Trăng" / "The **only** professional watch **ever** worn…" ; thân "đồng hồ đầu tiên — và duy nhất — từng chạm tới Mặt Trăng" / "the first — and only — watch" | "Chiếc đồng hồ **đầu tiên được đeo trên** Mặt Trăng" / "The **first** watch worn on the Moon" (cả excerpt lẫn thân, hai ngôn ngữ) |
| 2 | "NASA đã **bí mật mua** nhiều mẫu đồng hồ" / "The agency **quietly bought** watches" | "Omega là **một trong bốn hãng** được mời nộp đồng hồ thử" / "OMEGA was **one of four watch brands invited** to submit timepieces" (đúng trích N3) |
| 3 | "kiểm tra khắc nghiệt: sốc, chân không, nhiệt độ cực đoan, độ ẩm" / "brutal tests: shocks, vacuum, extreme temperatures, humidity" | "các bài thử gần như đẩy đồng hồ đến ranh giới phá hủy" / "tests were intended to push the watches almost to destruction" (đúng trích N3, bỏ danh sách chưa có nguồn) |
| 4 | bullet "**105.012 / 145.012** (1964–1969) — **chính các thế hệ này đã lên Mặt Trăng**" / "the references that actually went to the Moon" | gỡ hẳn bullet (hai ngôn ngữ) |
| 5 | "**cực hiếm và được sưu tầm mạnh**" / "**rare and eagerly collected**" | "thế hệ đầu tiên của dòng" / "the first generation of the line" |
| 6 | "**3570.50 (1996–2014)**" | "**3570.50**" (bỏ hai năm chưa có nguồn) |
| 7 | "(Neil Armstrong đã để đồng hồ lại tàu vì bộ hẹn giờ của tàu bị hỏng)" / "(Neil Armstrong left his inside the module, after the lander's onboard timer had failed.)" | gỡ hẳn ngoặc (hai ngôn ngữ) |
| 8 | "Lý do: trong môi trường không gian không trọng lực, rotor của automatic không hoạt động." / "— in weightless space, an automatic's rotor has nothing to react against." | gỡ hẳn câu nhân quả (giữ "vẫn dùng calibre tay cơ, không phải automatic" — có nguồn) |

**Lưu ý phạm vi** *(ĐÃ THAY THẾ tại vòng sửa 1 — TXN-20260919-4, xem mục 10; giữ lại làm lịch sử):* frontmatter `references` ban đầu GIỮ nguyên hai số "105.012", "145.012" vì coi là thẻ trung tính; GPT Work bác bỏ — hai số này hiển thị công khai ở bảng thông số mà không có căn cứ trong hồ sơ G08-A, đã gỡ khỏi cả hai bài.

## 3. Kiểm tra

| Kiểm | Kết quả |
|---|---|
| `npm run check` | **exit 0** (log-check.txt); checker evolution hiện hành quét trúng dataset mới: "Omega Speedmaster: 7 mốc · xuất bản: vi+en" |
| `npm run build` | **exit 0** (log-build.txt); astro check **333 tệp — 0/0/4 hints** (nền); links **"Đã quét 290 trang HTML, 21154 link"** 0 hỏng (+12 so với nền 21.142 — link nguồn của sơ đồ); Pagefind 290; hai route mới sinh: `/mau-iconic/omega-speedmaster/`, `/en/iconic-watches/omega-speedmaster/`; check-evolution-routes: "omega-speedmaster (vi+en, 7 mốc): VI 7 mốc · EN 7 mốc — khớp dataset" |
| English launch | `node scripts/check-english-launch.mjs` — **exit 0, ĐẠT** (log-english.txt) |
| Checker G08 (`check-g08-speedmaster-evolution.cjs`) | lần đầu **70/70 ĐẠT**; **vòng sửa 1: 74/74 ĐẠT, exit 0** (+4 ca G7 — log-check-g08.txt): G1 đúng 7 mốc năm tăng dần 1957→2021; G2 khớp hồ sơ từng trường (vi/en/year/reference/sourceUrl/sourceName); G3 số ≥3 chữ số VI/EN tương ứng; G4 đăng ký + slug duy nhất; G5 dist: sơ đồ chỉ render đúng 3 route mô hình × VI/EN (6 trang), không lọt route khác, 7 nút + đủ 7 URL nguồn mỗi route, hồi quy Submariner/GMT 8 nút; G6 hai route sạch 10 mẫu claim cũ (thân bài); **G7a nguồn hai bài sạch 105.012/145.012; G7b dist THÔ (giữ HTML — bắt cả bảng thông số/schema/meta) hai route sạch** |
| Mutation sandbox | lần đầu **6/6 ĐẠT**; **vòng sửa 1: 7/7 ĐẠT** (log-mutation.txt): M1 xóa sourceUrl N5 → check-evolution-data "thiếu trường sourceUrl"; M2 lệch EN (14→40) → G08 G2; M3 hoán đổi 1957 và 1962 → evolution-data "đứng sau mốc"; M4a label N5 mất en → G08 G2; M4b/M5 slug → `rolex-submariner` → G08 G4 trùng slug + evolution-routes LỖI (7≠8 trên dist cũ); **M6 chèn lại "105.012" vào frontmatter bài VI → G08 G7a**; mỗi ca hoàn nguyên hash khớp + sạch cuối exit 0 |
| Trình duyệt | **21/21 ĐẠT** (log-pw.txt): VI/EN × sáng/tối × 320/768/1440 = 12 ca (7 nút + 0 tràn ngang); ngôn ngữ khớp nhãn/title; mốc 0 chọn sẵn `aria-pressed`; Tab×2 + Enter chọn mốc 2; reduced-motion tức thời (0s/1e-05s) vs 120ms; 7 link nguồn đúng URL + `target="_blank"` + `rel=noopener`; no-JS: 7/7 chi tiết luôn mở, không `data-js`; hồi quy Submariner/GMT; ảnh `shots/g08b-vi-1440-sang.png` |
| Sweep gói (17 tệp + PNG) | **TONG_LOI=0** (log-sweep.txt): whitespace/EOF/ký tự lạ/bí mật có cấu trúc 0; PNG chỉ hash nhị phân `g08b-vi-1440-sang.png` |
| `git diff --check` | **sạch**; stage thử toàn bộ tệp G08-B → `git diff --cached --check` **exit 0** → đã bỏ stage (staged về 0) |

## 4. Giới hạn và ghi chú

1. **Sự cố đã xử lý trong ca M1 (lần chạy đầu của mutation driver):** driver dùng `String.replace` với chuỗi thay rỗng đã chèn nhầm dòng `sourceUrl` về đầu tệp dataset (hành vi `replace('', x)` của JavaScript). Đã khôi phục tệp (xóa dòng lạc, chèn lại đúng khối N5 — xác nhận bằng checker G08 + astro check), viết lại driver theo hướng "đọc nội dung gốc vào bộ nhớ → ghi lại nguyên văn sau mutation". Mọi ca trong log-mutation.txt là kết quả của driver đã sửa; tệp dataset hiện tại khớp hash trước mutation (mọi ca ĐẠT hoàn-nguyên-hash=true).
2. ~~Thẻ reference "105.012, 145.012" còn hiển thị dạng thẻ trung tính trên hai route (từ frontmatter — xem mục 2)~~ **ĐÃ XỬ LÝ tại vòng sửa 1 (TXN-20260919-4) — xem mục 10.**
3. checker G08 chạy standalone bằng `node scripts/check-g08-speedmaster-evolution.cjs` (sau build) — không nối vào `npm run check`/`build` vì `package.json` cấm sửa; GPT Work có thể quyết nối sau.
4. Preview cục bộ có console error `/_vercel/insights/script.js` 404 — hành vi đã biết của preview, không liên quan sơ đồ.
5. `git status` sau gói: 3 tệp M + các đường dẫn `??` mới của gói; các untracked có trước giữ nguyên.

## 5. Điểm dừng

**Dừng chờ GPT Work nghiệm thu G08-B.** Chưa stage (đã bỏ stage sau kiểm thử), chưa commit, chưa push, chưa deploy. **Không mở G09.** HEAD = origin/main = `4ab0163`.

---

## 10. Vòng sửa 1 (TXN-20260919-4, ngày 19/09/2026) — ĐÃ ĐẠT, chờ tái nghiệm thu

**Lỗi GPT Work có bằng chứng:** hai thẻ reference `105.012`, `145.012` vẫn hiển thị công khai trong bảng thông số của cả hai trang (từ frontmatter `references[]`) dù không có căn cứ trong hồ sơ G08-A; checker G08 bỏ sót vì chỉ quét thân bài sau khi loại HTML và mẫu V4 cố ý loại trừ số trần.

### 10.1. Đã sửa

1. **Frontmatter hai bài** `src/content/mauIconic/{vi,en}/omega-speedmaster.md`: `references` → `["CK2915", "3570.50", "310.30.42"]` (gỡ đúng hai số; không đụng reference khác; `3570.50` không gán lại năm, không thêm claim).
2. **`scripts/check-g08-speedmaster-evolution.cjs`** bổ sung **G7** (giữ nguyên các kiểm G1–G6 về 8 nhóm claim):
   - **G7a** — nguồn hai bài .md không còn `105.012`/`145.012` (bắt cả frontmatter);
   - **G7b** — dist **THÔ** (giữ nguyên HTML — bắt bảng thông số, schema, meta) hai route Speedmaster không còn hai số này.

### 10.2. Bằng chứng rule hoạt động trước khi build lại

Sau khi sửa nguồn (dist còn là bản cũ), chạy checker: **G7b vi + G7b en đều KHÔNG ĐẠT** ("còn: \"105.012\"") — chứng minh rule dist bắt đúng đầu ra hiển thị. Sau build lại: cả hai ca ĐẠT.

### 10.3. Kiểm tra sau sửa (số liệu thật)

| Kiểm | Kết quả |
|---|---|
| `npm run check` | **exit 0** (log-check.txt) |
| `npm run build` | **exit 0** (log-build.txt); astro check 0/0/**4 hints** nền; links 290 trang / 21.154 link 0 hỏng |
| English launch | **exit 0, ĐẠT** (log-english.txt) |
| Checker G08 | **exit 0 — 74/74 ĐẠT** (log-check-g08.txt); dist VI/EN `grep -c "105.012\|145.012"` = **0/0** |
| Mutation M6 | **ĐẠT**: chèn lại "105.012" vào frontmatter bài VI → checker exit 1 đúng rule G7a → hoàn nguyên hash khớp; cả driver **7/7 ĐẠT** + sạch cuối exit 0 (log-mutation.txt) |

### 10.4. Điểm dừng vòng sửa 1

**Dừng chờ GPT Work tái nghiệm thu.** Chưa stage, chưa commit, chưa push, chưa deploy; không mở G09. HEAD = origin/main = `4ab0163`.
