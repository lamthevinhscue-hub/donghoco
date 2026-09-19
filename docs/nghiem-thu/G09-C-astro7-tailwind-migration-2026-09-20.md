# G09-C Đ1 phương án 1 — Migration Astro 7 + Tailwind tương thích (worktree thử nghiệm)

- Danh mục: DHC-G05G09-20260913 v1.0.0 · Giao dịch chuyển tiếp bởi anh Vinh (PA1 đã duyệt)
- Nền: `521f5fa` (main = HEAD = origin/main khi bắt đầu) · Worktree: `D:\donghoco-worktrees\g09c-astro7-tailwind-migration`, nhánh `codex/g09c-astro7-tailwind-migration`
- Điểm khôi phục giữ nguyên, không đụng: nhánh `codex/g09c-astro4-stable-521f5fa`, nhánh `codex/g09c-astro7-wip-20260920` (`463be40`), patch `0001-wip-ops-backup-Astro-7-migration-experiment.patch`
- Không commit/push/merge/deploy — worktree để nguyên trạng chờ nghiệm thu độc lập

## 1. Quyết định kỹ thuật Tailwind

Gỡ `@astrojs/tailwind` (latest 6.0.2 vẫn peer `astro ^3||^4||^5` — không có bản astro 7). Thay bằng **pipeline PostCSS chuẩn của Astro** với **tailwindcss 3.4 giữ nguyên version**:

- `postcss.config.mjs` (mới): `{ plugins: { tailwindcss: {}, autoprefixer: {} } }` — astro 7 tự nhận postcss config ở gốc repo và chạy trên mọi stylesheet.
- Không nâng tailwindcss 4 / không thêm `@tailwindcss/vite`: Tailwind 4 là breaking (directives, config, dark mode) — rủi ro hành vi lớn trong khi Tailwind 3 qua PostCSS là cơ chế gốc vốn có, và peer dependency không khai astro nên `npm ci` resolve sạch (điều kiện "chỉ thêm integration chính thức nếu chứng minh bắt buộc" — chứng minh được KHÔNG cần).
- Base styles không mất: `src/styles/global.css` (có `@tailwind base/components/utilities`) được `BaseLayout.astro:18` import trực tiếp; `@astrojs/tailwind` applyBaseStyles chỉ là đường nạp thứ hai.
- **autoprefixer được khai báo hóa** từ dependency ngầm: `@astrojs/tailwind@5.1.5` kéo `autoprefixer ^10.4.20` trong `dependencies` (npm view) và production CSS có vendor prefix thật (`-webkit-appearance`, `-webkit-font-smoothing`…) — gỡ integration mà không khai báo = mất prefix. Phiên bản cài 10.6.1 (latest thỏa `^10.4.20`).

## 2. Bảng package trước/sau

| Package | Trước (`521f5fa`) | Sau | Lý do |
|---|---|---|---|
| astro | 4.16.19 | **7.3.3** (pin) | Chủ đề Đ1 |
| @astrojs/tailwind | 5.1.5 | **GỠ** | Không có bản tương thích astro 7; thay bằng postcss.config.mjs |
| tailwindcss | 3.4.19 | 3.4.19 (giữ nguyên) | Chạy qua PostCSS, không breaking |
| autoprefixer | (ngầm 10.4.x qua @astrojs/tailwind) | **10.6.1 khai báo devDep** | Khai báo hóa dependency ngầm của integration bị gỡ |
| @astrojs/markdown-remark | (không có) | **7.3.1** | Lỗi check tái tạo: astro 7 không cài unified processor mặc định; config dùng 2 plugin biên tập (glossary-autolink, wrap-tables) — mục 3.1 |
| @astrojs/sitemap | 3.2.1 | **3.7.4** (range `^3.2.1` không đổi, lockfile khóa 3.7.4) | Lỗi build tái tạo: hook crash — mục 3.3 |
| @astrojs/check | 0.9.10 | 0.9.10 | Đã là latest; peer chỉ typescript |
| astro-pagefind | 2.0.1 | 2.0.1 | Peer `astro ^2…^7` — tương thích |
| @vercel/analytics, three, tailwindcss, overrides Đ2, allowScripts sharp@0.35.4 | — | giữ/khớp | Không thuộc chuỗi đổi |

## 3. Trình tự lỗi migration — mỗi lỗi có log TRƯỚC/SAU

### 3.1 `@astrojs/markdown-remark` — check FAIL (trước) → qua (sau)
- Trước: `log-types-truoc-markdown-remark.txt` — exit 1, "Sätteri is the default Markdown processor… Install it with: npm install @astrojs/markdown-remark".
- Sau: `log-types-truoc-legacy-flag.txt` — lỗi markdown biến mất, chỉ còn warning deprecation (astro tự di trú 2 plugin sang `unified()`, hành vi render giữ nguyên). KHÔNG viết lại plugin.

### 3.2 `legacy.collectionsBackwardsCompat` — check FAIL (trước) → exit 0 (sau)
- Trước: `log-types-truoc-legacy-flag.txt` — `LegacyContentConfigError` cho `src/content/config.ts` (6 collections legacy).
- Sau: `log-types-sau-legacy-flag.txt` — exit 0, 331 tệp 0 errors / 0 warnings / **80 hints** (`ts(6385) 'z' is deprecated` trong content config legacy — hệ quả tất yếu của chế độ tương thích; baseline 0/0/0; mất tự nhiên khi di trú sang `src/content.config.ts` ở gói riêng).
- Di trú thật sang `src/content.config.ts` + loader đụng mọi `getCollection`/`CollectionEntry`/`entry.slug` — thay đổi rộng, KHÔNG làm trong gói này.

### 3.3 `@astrojs/sitemap` 3.2.1 → 3.7.4 — build FAIL (trước) → qua (sau)
- Trước: build với sitemap 3.2.1 crash hook `astro:build:done` (`Cannot read properties of undefined (reading 'reduce')`, `log-build-truoc-sitemap-nang.txt`; bằng chứng gốc `codex/g09c-astro7-wip-20260920:output/g09-astro-major-upgrade/log-build-tukiem.txt`).
- Sau: lockfile khóa 3.7.4 qua range `^3.2.1` hiện có — `log-build-final.txt` sitemap-index created.

### 3.4 Comment HTML `MechanismAnimation.astro` — check-g06 D3 FAIL (trước) → 0 lỗi (sau)
- Trước: `log-build-truoc-comment.txt` — "LỖI D3 không rò VI — lọt: Bước trước" (astro 4 nén HTML bỏ comment markup, astro 7 GIỮ — checker D3 bắt chuỗi VI trong comment biên tập, vô hình với người xem).
- Sau: gỡ 1 dòng comment (dòng 110) — `log-build-final.txt` "check-g06-escapement-en: 0 lỗi". Checker giữ nguyên logic, không hạ ngưỡng.

## 4. Bẫy npm 11 allow-scripts — esbuild không lên đĩa và không vào lockfile

- `esbuild` (dependency của astro 7, postinstall `node install.js` tải binary) bị npm 11 **allow-scripts** chặn khi `allowScripts` chỉ phủ `esbuild@0.21.5` (astro 4 cũ): package KHÔNG được extract (`node_modules/esbuild` không tồn tại) → `scripts/check-g06-anatomy.mjs` crash `ERR_MODULE_NOT_FOUND` ngay trong `npm run check`.
- Phê duyệt `allowScripts: { "esbuild@0.28.2": true, "sharp@0.35.4": true }` (phiên bản chuỗi astro 7; sharp 0.35.4 là optionalDependencies của astro, binary `@img/sharp-win32-x64` cài bình thường).
- **Bẫy then chốt**: nếu lần resolve sinh lockfile chạy TRƯỚC khi duyệt, esbuild bị bỏ KHỎI lockfile (`node_modules/esbuild` không có entry) và `npm install` về sau không tự chèn lại — phải sinh lại lockfile từ đầu (`rm -rf node_modules package-lock.json && npm install`).
- Sau đó `npm ci` tái lập: **exit 0, 0 ERESOLVE, 0 peer warning bị bỏ qua, 0 allow-scripts warning**, esbuild có trên đĩa — `log-npm-ci-chuan.txt`, `log-npm-ls-sau.txt`.

## 5. Kết quả kiểm — đủ điều kiện nghiệm thu

| Điều kiện | Kết quả | Bằng chứng |
|---|---|---|
| `npm ci` cài chuẩn, không ERESOLVE, không peer warning bỏ qua | exit 0, 0 warning | `log-npm-ci-chuan.txt` |
| `npm ls --depth=0` + peer sạch | exit 0; 9 gói cấp 1 đúng bảng mục 2; không có @astrojs/tailwind; astro@7.3.3 không còn "invalid" | `log-npm-ls-sau.txt` |
| `npm run check:types` | exit 0 (331 tệp, 0/0/80 hints) | `log-types-sau-legacy-flag.txt` |
| `npm run check` | exit 0 (26 lệnh) | `log-check-chuan.txt` |
| `npm run build` | exit 0 toàn chuỗi: 290 trang, Pagefind 290, sitemap-index, check-links **290 trang / 21.154 link 0 hỏng**, G09-B **125/125/125 trên 68 trang 0 ID trùng**, evolution ĐẠT, G01 **99/99** (điều hướng + route EN), G02/G04/G05/G06 dist ĐẠT, 3D budget ĐẠT | `log-build-final.txt` |
| English launch | G01 99/99 ca phủ route EN; smoke `/en/history/`, `/en/anatomy/`, `/en/compare/` 200 + h1 EN | log-build-final + smoke JSON |
| `npm audit --json` | **0 advisory** (trước migration: 4 — astro critical 19 GHSA, sharp high, vite high, esbuild moderate); exit 0 | `npm-audit-sau.json` (trước: `codex/g09c-astro7-wip-20260920:output/g09-astro-major-upgrade/npm-audit-truoc.json`) |
| Sitemap | 289 URL = production 289 | dist/sitemap-0.xml |
| Smoke browser 7 route | `/`, `/lich-su/`, `/en/history/`, `/giai-phau/`, `/en/anatomy/`, `/so-sanh/`, `/en/compare/` — 200/7, h1 đúng ngôn ngữ, **0 pageerror**; chuyển ngôn ngữ `/`→`/en/` 200 | `smoke-browser.json` |
| Theme sáng/tối | toggle đổi class dark; body dark #111519 / light #FBFBF8, h1 dark #EEF0ED / light #234A73 — đúng design token hai chế độ | `smoke-browser.json` |
| Pagefind | VI "bánh lắc" 33 kết quả; EN "balance" 13 | `smoke-browser.json` |
| Mobile 375px | tràn ngang 0px trên `/`, `/lich-su/`, `/so-sanh/` | `smoke-browser.json` |
| Hồi quy CSS | 0 selector class mất trên 8 trang đối chiếu production (trang chủ, chon-co-dong-ho, bo-thoat, so-sanh, rolex, lich-su, giai-phau, tu-dien/bezel); bo-thoat THÊM 16 selector wr-* | `css-selector-doi-chieu.json` |
| Vendor prefix | autoprefixer hoạt động: dist mới 14 loại `-webkit-*`, prod 13 — thiếu **1 loại `-webkit-text-decoration`** (mục 6) | `css-prefix-doi-chieu.json` |
| `git diff --check` + sweep | exit 0; TONG_LOI=0 | `log-sweep.txt` |

## 6. Giới hạn ghi nhận (không làm ẩn)

1. **80 hints** `ts(6385) 'z' is deprecated` tại `src/content/config.ts` — chế độ tương thích legacy của astro 7; exit 0 không chặn; mất khi di trú content config (gói riêng nếu được mở).
2. **`-webkit-text-decoration`** (1/13 loại prefix prod) không còn trong dist mới: autoprefixer 10.6.1 + dữ liệu browserslist hiện tại không còn prefix rule `text-decoration: underline dotted` (prod được build bằng dữ liệu cũ). Ảnh hưởng: trình duyệt WebKit cũ có thể hiển thị underline thường thay vì dotted cho 1 kiểu trang trí; trình duyệt hiện đại không đổi. Không tự đặt browserslist (tránh suy dải hỗ trợ) — GPT Work quyết nếu muốn khôi phục.
3. Production/CSP/Analytics giữ nguyên: CSP vẫn Report-Only (nhánh riêng); beacon `/_vercel/insights/script.js` 404 chỉ trên preview cục bộ (giới hạn đã ghi từ P2.1/G03). Smoke/pagefind chạy trên `astro preview` cục bộ, chưa phải production.
4. Warning "ERESOLVE overriding peer" duy nhất xuất hiện ở `log-install-lan1.txt` là npm đọc lockfile cũ (521f5fa) đang prune @astrojs/tailwind — tree cuối KHÔNG còn package này; `npm ci` chuẩn sau đó 0 warning.

## 7. Rollback

Worktree chưa commit — hủy hoàn toàn bằng: `git worktree remove --force D:\donghoco-worktrees\g09c-astro7-tailwind-migration` + `git branch -D codex/g09c-astro7-tailwind-migration`. `main` không bị đụng (vẫn `521f5fa`, tracked sạch). Nếu sau nghiệm thu cần đưa về main, GPT Work commit nhánh rồi merge — GLM không làm.

## 8. Kết luận

Migration Astro 7.3.3 + Tailwind qua PostCSS đạt toàn bộ điều kiện nghiệm thu trong worktree — để nguyên trạng chờ GPT Work nghiệm thu độc lập; chưa commit/push/merge/deploy.
