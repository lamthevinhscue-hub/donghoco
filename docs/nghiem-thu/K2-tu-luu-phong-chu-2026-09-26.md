# Biên bản K2 — tự lưu phông chữ, bỏ tải từ Google

- Ngày: 2026-09-26
- Danh mục: DHC-GD3-20260925 v1.0.0 · Giao dịch: TXN-20260926-219 (đề ghi phần mô tả "-218"; dùng số tiêu đề "-219")
- Nền: HEAD = origin/main = `4ba159c`, staged = 0, không tracked sửa khi bắt đầu
- Kết cục: **DỪNG CHỜ GPT WORK NGHIỆM THU** — mọi tiêu chí đạt; không stage, không commit, không push

## 1. Quyết định kỹ thuật

Cấu hình Google Fonts hiện hành (BaseLayout dòng 178–181 trước sửa): Be Vietnam Pro `wght@400;500;600;700` (tĩnh) + Newsreader `opsz,wght@6..72,500..700` (**variable hai trục**).

Thay thế tương ứng 1:1, cùng family name để `global.css` không phải sửa:

| Font | Tệp trong `public/fonts/` | Kích thước | SHA-256 (16 ký tự đầu) |
|---|---|---|---|
| Be Vietnam Pro 400 | `be-vietnam-pro-400.woff2` | 38.080 B | `2b3b1f07c12a69c4` |
| Be Vietnam Pro 500 | `be-vietnam-pro-500.woff2` | 40.296 B | `2fdc4ad342184a29` |
| Be Vietnam Pro 600 | `be-vietnam-pro-600.woff2` | 40.368 B | `1c632e8ff11df813` |
| Be Vietnam Pro 700 | `be-vietnam-pro-700.woff2` | 41.168 B | `4202dff0182dfbfc` |
| Newsreader variable | `newsreader-opsz-wght.woff2` | 215.316 B | `203d519fc12f4731` |
| stylesheet | `fonts.css` | — | `c3180542acee850b` |
| giấy phép | `OFL-BeVietnamPro.txt`, `OFL-Newsreader.txt` | ~4,4 KB | — |

- **Nguồn**: `github.com/google/fonts` — `ofl/bevietnampro` (4 tệp ttf tĩnh Regular/Medium/SemiBold/Bold), `ofl/newsreader` (`Newsreader[opsz,wght].ttf` variable). Bản gốc + `METADATA.pb` + `OFL.txt` lưu tại `output/k2-local-fonts-audit/nguon/` (bằng chứng, không phát hành).
- **Giấy phép**: SIL Open Font License 1.1 cả hai font — Be Vietnam Pro Project Authors (2021, bettergui/BeVietnamPro); Newsreader Project Authors (2020, productiontype/Newsreader). Bản sao `OFL.txt` đặt cạnh font trong `public/fonts/` để tuân thủ điều khoản phân phối lại.
- **Nén woff2**: fontTools 4.59 + brotli, nén **giữ nguyên toàn bộ bảng** (không subset) — kiểm cmap 134 chữ cái tiếng Việt hiện đại (thường + hoa + mọi dấu tổ hợp) **đủ 100% cả 5 tệp, trước và sau nén** (`cmap-ket-qua.json`, script `kiem-cmap-va-nen.py`). Newsreader metadata liệt kê subset `vietnamese`; Be Vietnam Pro metadata chỉ liệt kê latin/latin-ext nên việc kiểm cmap trực tiếp là bằng chứng quyết định — tiếng Việt hiển thị bằng chính font, không rơi fallback.
- **fonts.css**: 5 `@font-face` — BVP 400/500/600/700; Newsreader `font-weight: 500 700` (variable, trục opsz tự áp theo cỡ chữ như cấu hình cũ); mọi `src` là đường `/fonts/*.woff2` cùng origin; `font-display: swap` từng khối; không base64, không CDN.

## 2. Sửa các nơi dùng font

1. **`src/layouts/BaseLayout.astro`** — xóa 2 dòng `preconnect` + 1 `<link>` css2 của Google, thay bằng 1 dòng `<link rel="stylesheet" href="/fonts/fonts.css" />` (3 dòng → 1 dòng + comment).
2. **`vercel.json`** — CSP `Content-Security-Policy-Report-Only`: gỡ đúng `https://fonts.googleapis.com` khỏi `style-src` và `https://fonts.gstatic.com` khỏi `font-src` (còn `'self'` cho cả hai). Không đụng directive khác — vẫn Report-Only, `connect-src`/`form-action` giữ nguyên vitals + formspree, `object-src 'none'` giữ nguyên.
3. `src/styles/global.css` **không sửa** — khai báo `font-family: 'Be Vietnam Pro', …` / `'Newsreader', Georgia, serif` không đổi (tên family do `@font-face` đăng lại).

## 3. Checker K2 — `scripts/check-k2-local-fonts.mjs` (mới)

Hai chế độ: không tham số = source (K2-1…K2-5); `dist` = source + dist (thêm K2-6); env `K2_ROOT` cho chạy trên bản sao.

- **K2-1** cấm `fonts.googleapis.com`/`fonts.gstatic.com` trong `src/`, `public/`, `vercel.json` (quét toàn tệp);
- **K2-2** đủ 5 tệp woff2 (magic bytes `wOF2`, >10 KB) + fonts.css + 2 OFL ("Font License");
- **K2-3** fonts.css đúng 5 `@font-face`: BVP 400/500/600/700 + Newsreader `500 700`, src chỉ `/fonts/*.woff2`, `font-display: swap`;
- **K2-4** BaseLayout hết Google, có link `/fonts/fonts.css`;
- **K2-5** CSP: không còn 2 host, `font-src 'self'`, đủ 10 directive, điểm ngoài (vitals, formspree, `object-src 'none'`) chưa bị bỏ, **vẫn Report-Only**;
- **K2-6** (dist): toàn cây dist không còn host Google; 5 font + fonts.css trong `dist/fonts/` khớp SHA-256 với `public/fonts/`.

Nối vào **cuối** cả `npm run check` (`&& node scripts/check-k2-local-fonts.mjs`) và `npm run build` (`&& node scripts/check-k2-local-fonts.mjs dist`).

## 4. Kết quả kiểm bắt buộc

| Kiểm | Kết quả |
|---|---|
| `npm run check:types` | exit 0 — 0 lỗi / 0 cảnh báo / 1 hint cũ (`output/playwright/audit-2026-09-25.mjs`) |
| `npm run check` | exit 0 — 242 ca ĐẠT, kết thúc "K2: ĐẠT (source)" |
| `npm run build` | exit 0 — 338 trang (Pagefind indexed 338), kết thúc "K2: ĐẠT (source + dist)" |
| checker K2 trực tiếp trên `dist` | exit 0 — `k2-dist-truc-tiep.log` |
| `node scripts/scan-chars.mjs` | exit 0 |
| `git diff --check` | exit 0 |

## 5. Kiểm trình duyệt trên preview local (astro preview, dist)

| Ca | Font đúng | Tiếng Việt | Request Google | Tràn ngang | Ảnh |
|---|---|---|---|---|---|
| Desktop 1280 (VI `/`) | h1 Newsreader + body Be Vietnam Pro; `fonts.check` 400/500/600 true, **700 false do trang chưa dùng → `fonts.load('700 …')` trả true**; danh sách `[...document.fonts]`: 5/5 `loaded` | "Đồng Hồ Cơ", heading, body đủ dấu | **0/12 resource** | 1280/1280 | `anh-desktop-trang-chu.png` |
| Mobile 390×844 (VI) | bvp400 true, body đúng family | đủ dấu | 0 | 390/390 | `anh-mobile-390.png` |
| Desktop (EN `/en/`) | nr500 + bvp400 true | — | 0 | không | `anh-desktop-en.png` |

Console duy nhất 1 lỗi: `/_vercel/insights/script.js` 404 — hiện trạng có trước của preview (Vercel Analytics chỉ tồn tại trên production), không liên quan font.

## 6. Mutation ngoài cây (`D:/k2-mut` — bản sao public + src + dist + vercel.json; đã dọn)

| Ca | Hỏng | Kết quả | Hoàn nguyên |
|---|---|---|---|
| A | đổi tên `be-vietnam-pro-500.woff2` → `.bak` | exit 1 — "K2-2 Thiếu tệp public/fonts/be-vietnam-pro-500.woff2" | hash `2fdc4ad342184a29…` khớp; chạy lại exit 0 |
| B | chèn lại `<link rel="preconnect" href="https://fonts.googleapis.com">` vào BaseLayout bản sao | exit 1 — K2-1 "Còn tham chiếu Google Fonts: src\layouts\BaseLayout.astro" + K2-4 | SHA-256 khớp repo `37bb843faff552a3…`; chạy lại exit 0 |

Baseline trước mutation: exit 0 (`mut-baseline.log`).

## 7. Giới hạn còn lại (không chặn)

1. Preview local không có Vercel Analytics (404 `/_vercel/insights/script.js`) — hiện trạng có trước, production không bị.
2. CSP vẫn **Report-Only** theo đề — không tự chuyển enforce; khi anh Vinh bật enforce sau này, cấu hình local-font đã sẵn sàng (font-src 'self').
3. Tổng tải font ~375 KB woff2 (5 tệp), chỉ tải tệp được dùng nhờ `font-display: swap` + lazy load trình duyệt; Newsreader giữ cả trục opsz nên tệp lớn hơn tệp tĩnh nhưng thay đúng 1:1 cấu hình variable hiện hành.
4. `output/k2-local-fonts-audit/` là bằng chứng nội bộ (nguồn gốc ttf, OFL, metadata, log, ảnh, script) — không phát hành.

## 8. Danh sách tệp thay đổi / đề nghị phát hành

| # | Tệp | Trạng thái |
|---|---|---|
| 1 | `package.json` | M — nối checker K2 cuối `check` + `build` |
| 2 | `src/layouts/BaseLayout.astro` | M — 3 dòng Google → 1 link local |
| 3 | `vercel.json` | M — CSP gỡ 2 host Google |
| 4 | `public/fonts/` (8 tệp: 5 woff2 + fonts.css + 2 OFL) | mới |
| 5 | `scripts/check-k2-local-fonts.mjs` | mới |
| 6 | `docs/nghiem-thu/K2-tu-luu-phong-chu-2026-09-26.md` | mới (biên bản này) |

Trạng thái Git khi dừng: HEAD = origin/main = `4ba159c`; staged = 0; tracked sửa 3 tệp; untracked mới: `public/fonts/`, `scripts/check-k2-local-fonts.mjs`, biên bản, `output/k2-local-fonts-audit/`; untracked có trước giữ nguyên.
