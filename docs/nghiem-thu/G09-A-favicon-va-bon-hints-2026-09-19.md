# Biên bản G09-A — Favicon và bốn hints chẩn đoán

- **Giao việc**: TXN-20260919-6 (danh mục DHC-G05G09-20260913); GPT Work chọn mở G09-A — nhánh nhỏ, độc lập, không đụng reduced-motion/ID pattern, dependency hay CSP.
- **Nền**: `403a8e3` ("feat(evolution): add bilingual Speedmaster timeline" — G08-B đã commit) — đã đối chiếu HEAD = origin/main trước khi làm.
- **Ngày thực hiện**: 2026-09-19.
- **Phạm vi duyệt**: favicon thật + gỡ đúng bốn hints `ts(6133)`; không thay đổi hành vi website ngoài khai báo favicon; không "dọn kỹ thuật" ngoài G09-A; không mở G09-B/C, không đụng CSP production/Analytics/dependency.

## 0. Kết luận

`npm run check:types` **0 errors / 0 warnings / 0 hints** (từ nền 4 hints về 0 — không thêm suppression, không hạ tiêu chuẩn); `npm run check` **exit 0**; `npm run build` **exit 0** (astro check **336 tệp — 0/0/0**; links **290 trang / 21.444 link** 0 hỏng — **+290 so với 21.154 = đúng 1 khai báo favicon mỗi route × 290 route**, không có thay đổi runtime nào khác); script kiểm G09 **15/15 ĐẠT, exit 0**. **Dừng chờ GPT Work nghiệm thu; chưa commit/push/deploy; chưa mở G09-B/C.**

## 1. Danh sách tệp gói (5 sửa + 9 tạo mới = 14 tệp)

### Sửa (5)
| Tệp | Thay đổi (diff: +5/−4 dòng toàn gói) |
|---|---|
| `src/layouts/BaseLayout.astro` | +3 dòng: comment + `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` sau meta description — duy nhất một thay đổi runtime của gói |
| `output/p3.1-image-audit/do-dinh-dang.mjs` | gỡ `basename` khỏi import `node:path` (`join`, `extname` giữ nguyên — vẫn dùng) |
| `output/p3.2-svg-gradient-audit/phan-nhom.cjs` | `map(([sig, n], idx)` → `map(([, n], idx)` — bỏ gán tên biến không dùng, cùng ngữ nghĩa |
| `output/p3.2-svg-gradient-audit/quet-gradient.cjs` | gỡ dòng `const lines = text.split('\n');` (hàm `scanText` tính số dòng inline từ `text`, không đọc `lines`) |
| `output/p3.3-cluster-script-audit/kiem-thu-hoi-quy.cjs` | gỡ dòng `const duongDan = path.join(SB, c.fixture);` ở khối tự kiểm dòng 239 (khai báo trùng tên không dùng; bản dùng thật ở dòng 108 giữ nguyên) |

### Tạo mới (9)
- `public/favicon.svg` — SVG tối giản tự vẽ: vỏ tròn màu nền `#1e4551` + viền và vành kim loại vàng đồng `#d9bc8b`, mão vặn, vạch 12/3/6/9, kim giờ + kim phút, trục; **không chữ, không `<text>`, không ảnh ngoài, không script, không tài nguyên mạng, không thư viện**.
- `scripts/check-g09-favicon-hints.mjs` — kiểm riêng G09 (F1–F3 + H1–H5 + quét bí mật).
- `docs/nghiem-thu/G09-A-favicon-va-bon-hints-2026-09-19.md` — biên bản này.
- `output/g09-favicon-hints/` — `sweep-g09-a.cjs` + 5 log (`log-types/check/build/check-g09/sweep`).

Không đụng: nội dung xuất bản, route, i18n, CSS, component chức năng, `package.json`, cấu hình Astro, checker hiện có (ngoài bốn vị trí hints nêu trên). Các tệp untracked có trước giữ nguyên.

## 2. Kiểm tra (số liệu thật)

| Kiểm | Kết quả |
|---|---|
| `npm run check:types` | **exit 0 — 0 errors / 0 warnings / 0 hints** (log-types.txt; nền trước đó 4 hints) |
| `npm run check` | **exit 0** (log-check.txt) |
| `npm run build` | **exit 0** (log-build.txt); astro check **336 tệp — 0/0/0**; links **"Đã quét 290 trang HTML, 21444 link"** 0 hỏng (+290 = 1 link favicon/route — giải thích diff ở mục 3) |
| Script G09 (`check-g09-favicon-hints.mjs`) | **15/15 ĐẠT, exit 0** (log-check-g09.txt): F1 favicon tồn tại + SVG hợp lệ + không chữ/ngoài/script + có nhận diện đồng hồ cơ; F2 BaseLayout khai báo đúng MIME SVG; F3 `dist/favicon.svg` hash khớp `public/favicon.svg` + route VI (`dist/ban-quyen/`) và route EN (`dist/en/about/`) đều có `rel="icon"` → `/favicon.svg`; H1–H4 bốn vị trí cũ sạch (kiểm cả "chỉ còn đúng 1 khai báo duongDan — bản dùng thật"); H4 không thêm `@ts-ignore`/`eslint-disable`/`ts-expect-error`; **H5 astro check chạy lại trong script — 0/0/0**; S output không credential có cấu trúc |
| Sweep gói (14 tệp) | **TONG_LOI=0** (log-sweep.txt); BaseLayout được miễn kiểm ký tự lạ (tệp có trước, G09-A chỉ +3 dòng — ký tự mũi tên trái U+2190 ở dòng 234 là nội dung có trước, xác nhận qua `git diff -U0`: đúng 3 dòng thêm, 0 xóa) |
| `git diff --check` | **sạch**; stage thử 9 đường dẫn G09-A → `git diff --cached --check` **exit 0** → bỏ stage |

## 3. Xác nhận không có thay đổi runtime ngoài favicon

- `git diff --stat` toàn gói: **5 tệp, +5/−4 dòng** — đúng năm vị trí trong mục 1, không có hunk nào khác.
- Đối chiếu link: nền `21.154` → sau gói `21.444` = **+290**, đúng bằng số route × 1 thẻ `<link rel="icon">` mới; số trang 290 giữ nguyên; Pagefind/sitemap không đổi số route.
- Bốn script bằng chứng: chỉ xóa/bo gán tên biến không dùng (không đổi logic — xác nhận bằng check/build exit 0 và script P3.x không bị gọi lại trong chuỗi nên không ảnh hưởng nghiệm thu cũ; hành vi script không đổi vì biến bị gỡ không bao giờ được đọc).

## 4. Giới hạn

- **Đây chỉ là G09-A** (favicon + bốn hints) — **không kết luận G09 hoàn tất**; chưa mở G09-B (ID pattern/reduced-motion), G09-C (dependency), chưa đụng CSP production, Analytics, bảo mật hay nâng dependency.
- Checker G09 chạy standalone (`node scripts/check-g09-favicon-hints.mjs`, sau build) — không nối `package.json` (cấm sửa).
- Log types/check/build được làm sạch space cuối dòng từ đầu ra công cụ (thông lệ các gói trước).

## 5. Điểm dừng

**Dừng chờ GPT Work nghiệm thu G09-A.** Chưa stage (đã bỏ stage sau kiểm thử), chưa commit, chưa push, chưa deploy. **Không mở G09-B/C.**
