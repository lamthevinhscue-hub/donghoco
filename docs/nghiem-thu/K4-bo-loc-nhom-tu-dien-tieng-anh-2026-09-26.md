# Biên bản K4 — Bộ lọc nhóm cho từ điển tiếng Anh

- Giao dịch: TXN-20260926-252 (danh mục DHC-GD3-20260925 v1.0.0)
- Ngày thực hiện: 26/09/2026
- Nền đầu phiên: HEAD = origin/main = `6ea3a9db99f4c434460ca0351078466441cea0ca` (`docs(content): add U3 myths source dossier`), staged = 0, tracked sửa 0
- Phạm vi phép: `src/pages/en/glossary/index.astro`, component chuyên biệt (không cần dùng), `src/i18n/ui.ts` (không cần dùng — nhãn category EN có sẵn), checker mới, `package.json` (nối checker), biên bản, `output/` nội bộ

## 1. Tệp đã sửa / tạo

| Tệp | Thay đổi |
| --- | --- |
| `src/pages/en/glossary/index.astro` | Viết lại: nhóm entry `tuDien` tiếng Anh theo `GLOSSARY_CATEGORY_ORDER`, hàng nút lọc `#en-cat-filter` (All + từng nhóm), khối nhóm `data-cat-group`, script lọc client-side `aria-pressed` + `classList.toggle('hidden')` |
| `scripts/check-k4-en-glossary-filter.mjs` | Mới — checker 2 chế độ source / source+dist, env `K4_ROOT` chạy trên bản sao |
| `package.json` | Nối `node scripts/check-k4-en-glossary-filter.mjs` vào cuối chuỗi `check` (source mode) và cuối `build` (source + dist mode) |
| `docs/nghiem-thu/K4-bo-loc-nhom-tu-dien-tieng-anh-2026-09-26.md` | Biên bản này |
| `output/k4-en-glossary-filter-audit/` | Bằng chứng nội bộ (log kiểm, log trình duyệt, script đo, mutation) — không phát hành |

Không đụng: nội dung/frontmatter/category/title/slug/route/aliases/nguồn `glossary-terms.json`, bộ tự liên kết, trang `/tu-dien/`, `src/i18n/ui.ts`, BaseLayout, cấu hình, ảnh, dependency.

## 2. Số liệu đo từ dữ liệu thật (frontmatter `src/content/tuDien/en/`, bỏ bản nháp)

36 mục / 7 nhóm — mọi nhóm đều có mục, không nhóm rỗng:

| Nhóm | Mục |
| --- | --- |
| thiết kế | 2 |
| bộ máy | 12 |
| hoàn thiện | 3 |
| phức tạp chức năng | 8 |
| phức tạp cao cấp | 5 |
| chứng nhận | 2 |
| độ chính xác và điều chỉnh | 4 |

Nút lọc: 8 (All = 36 + 7 nhóm) — số lượng render từ dữ liệu (`entries.length`, `g.items.length`), không ghi tay. Checker cũng suy số từ frontmatter + `GLOSSARY_CATEGORY_ORDER` đọc từ `src/i18n/ui.ts` lúc chạy, không hard-code.

Quyết định hiển thị có chủ ý: thẻ card trong nhóm bỏ dòng meta nhãn category (nhãn đã có ở tiêu đề nhóm `h2`, giữ sẽ lặp 36 lần); tiêu đề thẻ chuyển `h2` → `h3` để đúng thứ bậc dưới `h2` nhóm. Văn bản title/description/intro trang giữ nguyên hiện trạng.

## 3. Kết quả kiểm bắt buộc

| Kiểm | Kết quả |
| --- | --- |
| `npm run check:types` | 442 tệp — 0 errors / 0 warnings / 4 hints (sau vòng sửa 1; chỉ còn baseline 4 hints từ tệp có trước ở `output/playwright/` và `output/t1-glossary-source-audit/`) |
| `npm run check` (chứa checker K4 source mode) | exit 0 — toàn bộ 26 lệnh ĐẠT, K4 ĐẠT (source) |
| `npm run build` (chứa K4 source + dist cuối chuỗi) | exit 0 — build xong, K4 ĐẠT (source + dist) |
| checker trực tiếp source | exit 0 — 5 nhóm kiểm K4-1..K4-5 ĐẠT (`kiem-k4-source-cuoi.log.txt`) |
| checker trực tiếp dist | exit 0 — 14 dòng ĐẠT (`kiem-k4-dist-cuoi.log.txt`): 1 H1; 8 nút đúng data-cat/thứ tự/count/aria-pressed khớp frontmatter; 7 khối nhóm đúng thứ tự; 36 href `/en/glossary/<slug>/` duy nhất, mọi route tồn tại trong dist; 36 `<article>`; script lọc không xóa node (không removeChild/innerHTML/remove); canonical `/en/glossary/` + hreflang en/vi + switcher `/tu-dien`; `/tu-dien/` giữ `#cat-filter` nguyên vẹn; sitemap 37 URL `/en/glossary` = 36 mục + 1 index |
| `node scripts/scan-chars.mjs` | OK — 438 tệp, không ký tự ngoài tiếng Việt/Anh |
| `git diff --check` | sạch |

Lỗi gặp phải và đã sửa trong quá trình làm: lần build đầu exit 1 do checker (a) chỉ khớp URL sitemap kết thúc đúng `/en/glossary` — bỏ sót 36 URL entry; (b) tìm bundle `/ _astro/*.js` trong khi Astro inline script lọc vào HTML (trang nhỏ). Đã sửa checker (đếm mọi `<loc>` vùng `/en/glossary`; đọc script inline trước, bundle làm phương án dự phòng) và chạy lại `npm run build` đầy đủ exit 0. Lỗi thuộc checker, không thuộc sản phẩm.

## 3b. Vòng sửa 1 (TXN-20260926-254) — diagnostics của bằng chứng mutation

Nguyên nhân: `tsconfig.json` include `**/*` (chỉ loại `dist`) nên `astro check` quét cả tệp bằng chứng trong `output/`. Báo cáo vòng đầu ghi "4 hints baseline" khi `mutation.mjs` chưa tồn tại; sau khi tệp được tạo, `npm run check:types` lên **8 hints** — trong đó 4 hint mới ts(6133) do gói K4 tạo tại `output/k4-en-glossary-filter-audit/mutation.mjs`: biến `OUT` (dòng 11), import `execFileSync`, `rmSync`, `existsSync` (dòng 4 và 6) khai báo nhưng không dùng. Kiểm độc lập của GPT Work đã phát hiện đúng.

Phạm vi sửa duy nhất (đúng phán quyết): chỉ `output/k4-en-glossary-filter-audit/mutation.mjs` — gỡ 4 khai báo không dùng nêu trên, không đổi logic bốn ca mutation. Không đụng `src/`, `scripts/check-k4-en-glossary-filter.mjs`, `package.json`, dữ liệu hay bất kỳ tệp sản phẩm nào khác. 4 hint baseline có trước (tệp `output/playwright/`, `output/t1-glossary-source-audit/`) không bị đụng tới.

Kết quả diagnostics trước/sau:

| Thời điểm | check:types | Hint từ `k4-en-glossary-filter-audit/` |
| --- | --- | --- |
| Trước sửa (sau vòng đầu) | 442 tệp — 8 hints | 4 (mutation.mjs) |
| Sau sửa | 442 tệp — **4 hints** (baseline) | **0** (grep `k4-en-glossary` = 0 kết quả) |

Kiểm bắt buộc chạy lại sau sửa, tất cả ĐẠT:

| Kiểm | Kết quả |
| --- | --- |
| Chạy lại 4 ca mutation K4 | ĐẠT — M1 dist count → K4-6 FAIL đúng; M2 gỡ aria-pressed → K4-3 FAIL đúng; M3 `data-letter` → K4-4 FAIL đúng; M4 bỏ nút All → K4-2 FAIL đúng; hoàn nguyên hash byte-đối-byte khớp 4/4; chạy sạch cuối sandbox exit 0 (`kiem-k4-mutation-vong-sua-1.log.txt`, sandbox đã xóa) |
| `npm run check` | exit 0 (`check-vong-sua-1.log.txt`) |
| `npm run build` | exit 0 (`build-vong-sua-1.log.txt`) |
| `node scripts/check-k4-en-glossary-filter.mjs dist` | exit 0 — ĐẠT (source + dist), 14 dòng kiểm |
| `git diff --check` | sạch |

## 4. Bằng chứng trình duyệt (playwright-cli — Chromium thật, astro preview localhost:4323)

Log đầy đủ: `output/k4-en-glossary-filter-audit/kiem-trinh-duyet.log.txt` (7/7 ca ĐẠT, script đo `tc*.js` kèm theo).

| Ca | Kết quả then chốt |
| --- | --- |
| TC1a desktop 1280×800 khởi tạo | 8 nút, All `aria-pressed=true`, 7 nhóm + 36 thẻ hiển thị, tràn ngang 0 px |
| TC2 bấm nhóm "bộ máy" → All | 1 nhóm / 12 thẻ; aria đổi true/false đúng; cờ `window.__K4DA` giữ nguyên = không tải lại trang |
| TC3 bàn phím | 1 lần Tab từ Home tới nút lọc đầu; focus ring 2px solid nhìn thấy; Enter chọn nhóm; Space trên All quay về 7 nhóm |
| TC4 390×844 | tràn ngang 0 px; 8 nút hiển thị; lọc "chứng nhận" còn đúng 2 thẻ |
| TC5 dark mode | site dùng `darkMode:'class'` nên bật class `dark` trên `<html>` (emulateMedia không tác dụng với cấu hình này); nền trang rgb(17,21,25); nút đang chọn navy rgb(35,74,115) phân biệt rõ với nút thường dark-surface rgb(32,39,45); lọc hoạt động; tràn 0; không reload |
| TC6 không JavaScript | CDP `Emulation.setScriptExecutionDisabled=true` + reload: cả 7 nhóm + 36 thẻ vẫn đọc được; bấm nút không ẩn gì (script không chạy), không mất dữ liệu |
| TC7 `/tu-dien/` | 8 nút (All=45 + 7 nhóm); bấm "bộ máy" còn 13 thẻ; All đủ 7 nhóm/45 thẻ — hành vi nguyên vẹn |

Bài học đo đạc ghi lại: phép đo màu ngay sau click bắt giữa `transition-colors` (mã 215-217-218) — phải chờ 400 ms sau thao tác rồi mới đo (`tc5c-so-sanh-tu-dien.js` đối chiếu nút `/tu-dien/` cùng cách cho kết quả khớp token).

Đối chiếu byte dist: `dist/tu-dien/index.html` hash SHA-256 trước và sau `npm run build` giống hệt `10da2bb12441664b9097fa687859d0785f137b79df9c88f89bed4481cb37f836` — trang từ điển Việt không đổi byte nào.

## 5. Mutation ngoài cây (bản sao `%TEMP%\k4-sandbox-*`, hoàn nguyên byte-đối-byte)

Log: `output/k4-en-glossary-filter-audit/kiem-k4-mutation.log.txt` — 4 ca, đều FAIL đúng lỗi kỳ vọng, hoàn nguyên hash SHA-256 khớp, chạy sạch cuối trong sandbox exit 0:

| Ca | Phép đột biến | Kết quả checker |
| --- | --- | --- |
| M1 | Sửa count nút All trong dist render: `All (36)` → `All (35)` (chế độ dist) | K4-6 FAIL: `nút "all": count 35 ≠ 36` |
| M2 | Gỡ cơ chế cập nhật `aria-pressed` trong script (thay bằng dataset) | K4-3 FAIL: `setAria=false` |
| M3 | Chèn logic lọc theo bảng chữ cái (`data-letter` ẩn phần tử) khi chưa đạt ngưỡng | K4-4 FAIL: `Phát hiện dấu vết bộ lọc chữ cái: data-letter` |
| M4 | Bỏ nút All (`data-cat="all"` → `data-cat="khong-all"`) | K4-2 FAIL: `nutAll=false ariaTinh=false` |

Sandbox đã xóa sạch sau kiểm (`%TEMP%\k4-sandbox-*`).

## 6. Xác nhận bộ lọc chữ cái chưa mở

- Không có UI chữ cái, ô tìm kiếm mới hay logic chữ đầu trong source (`K4-4` kiểm cứng pattern, ĐẠT)
- Comment trong `src/pages/en/glossary/index.astro` ghi rõ: bộ lọc chữ cái HOÃN đến khi từ điển đạt khoảng 80 mục theo kế hoạch từ điển
- Biên mục này là xác nhận thứ ba; không mô phỏng bằng UI rỗng

## 7. Trạng thái Git cuối phiên

- HEAD = origin/main = `6ea3a9db99f4c434460ca0351078466441cea0ca` — chưa commit, chưa push, staged = 0
- Tracked sửa 2: `package.json`, `src/pages/en/glossary/index.astro`
- Tạo mới ngoài tracked: `scripts/check-k4-en-glossary-filter.mjs`, biên bản này, `output/k4-en-glossary-filter-audit/`
- Các untracked có trước giữ nguyên
- `git diff --check` sạch; `git diff --cached --check` sạch (không có gì staged)

Điểm chưa giải quyết: không có. Dừng chờ tái nghiệm thu sau vòng sửa 1.
