# G09-C Đ1 — Chặng di trú Content Collections Astro 7 (giao dịch TXN-20260920-7)

- Danh mục: DHC-G05G09-20260913 v1.0.0
- Vùng làm việc: `D:\donghoco-worktrees\g09c-astro7-tailwind-migration`, nhánh `codex/g09c-astro7-tailwind-migration`, nền `521f5fa`
- Đường lùi xác nhận NGUYÊN trước khi sửa (sha1 đầy đủ):
  - `main` = `origin/main` = `codex/g09c-astro4-stable-521f5fa` = `521f5fa74b349973d7f3a7bf84409c9584cd81b3`
  - `codex/g09c-astro7-wip-20260920` = `463be402d78842bef238bad497992508a644f734`
  - Patch 0001 (1.107.551 B) và 0002 (988.040 B) có trong `C:\Users\Admin\.codex\visualizations\2026\09\05\01a07174-e41f-7c13-8205-763d45937bbe\`
- Không commit/push/merge/deploy; không reset/restore/clean/rebase; worktree giữ nguyên trạng thái sau chặng này.

## 1. Patch backup

| Patch | Nội dung | Kích thước | SHA-256 |
|---|---|---|---|
| `0003-g09c-astro7-before-content-config.patch` | Toàn bộ diff hiện hành worktree TRƯỚC chặng di trú (4 tệp M + 23 tệp mới: biên bản PA1 + bằng chứng gói trước), xuất bằng `git add -N` + `git diff --binary` | 988.040 B | `8b852cb0adeefb631b655c36a90aeae4a0f5faa2acb2f6478d0692ae1537c9f0` |
| `0004-g09c-astro7-after-content-config.patch` | Diff hiện hành SAU chặng di trú (gồm tệp mới của chặng này) | xem mục 7 | xem mục 7 |

Danh sách tệp patch 0003: astro.config.mjs, package.json, package-lock.json, src/components/infographics/MechanismAnimation.astro, docs/nghiem-thu/G09-C-astro7-tailwind-migration-2026-09-20.md, 22 tệp trong output/g09-astro7-tailwind-migration/ (log, JSON, sweep.mjs).

## 2. Thay đổi di trú

| Tệp | Thay đổi |
|---|---|
| `src/content.config.ts` (MỚI) | 6 collection (`thuongHieu`, `mauIconic`, `coChe`, `tuDien`, `huongDan`, `trang`) với `loader: glob({ pattern: '**/*.md', base: './src/content/<collection>' })` — loader chính thức `astro/loaders`; schema GIỮ NGUYÊN hệt bản legacy từng trường; `z` từ `astro/zod` (khuyến nghị Astro 7 — `astro:content` z và `astro:schema` đều deprecated) |
| `src/content/config.ts` (XÓA) | Config legacy `type: 'content'` — nội dung schema di chuyển nguyên văn sang `src/content.config.ts` |
| `astro.config.mjs` | Bỏ khối `legacy.collectionsBackwardsCompat` (chỉ sau khi diagnostics 0/0/0) |
| `src/pages/ban-quyen.astro` | 1 dòng: `e.id.endsWith('ban-quyen.md')` → `e.id.endsWith('ban-quyen')` — bằng chứng lỗi build cụ thể (mục 4) |

KHÔNG đụng: Markdown/frontmatter, `src/content/` dữ liệu (git status chỉ có `D src/content/config.ts`), slug, route, `contentRoutes`, checker nghiệp vụ, nội dung song ngữ, Tailwind/PostCSS, markdown plugin, overrides, CSS, CSP, Analytics, favicon, dependency (lockfile không đổi từ chặng trước).

API không phải sửa vì codebase đã chuẩn content layer sẵn: `render()` từ `astro:content` (BrandArticle, ban-quyen), `getCollection` + filter, `getSlug` tách slug từ `id` cho được cả hai dạng có/không đuôi, lọc `id.startsWith('<lang>/')`.

## 3. Diagnostics — mục tiêu 0/0/0 ĐẠT

- Trước chặng: `npm run check:types` = 332 tệp, 0/0/**80 hints** (`ts(6385) 'z' is deprecated` trong config legacy).
- Sau di trú: `log-types-sau-di-tru.txt` — exit 0, **Result (332 files): 0 errors / 0 warnings / 0 hints**. Content sync sạch ("Synced content", types generated).
- Sau di trú + sửa ban-quyen: `log-build-sau-sua-ban-quyen.txt` — Result (334 files), 0/0/0.

## 4. Lỗi build cụ thể duy nhất — ban-quyen redirect 404 (đã sửa)

Sau di trú, build pass nhưng đối chiếu href từng trang với production phát hiện `/ban-quyen/` chỉ còn 2 href (296 B): trang là **redirect shell tới /404** vì `id` content layer không còn đuôi file (`"vi/ban-quyen"` thay vì `"vi/ban-quyen.md"`) nên `endsWith('ban-quyen.md')` sai → entry undefined. Sửa 1 dòng (mục 2); build lại: `/ban-quyen/` 41.394 B, 55 href (= prod 56 − 1 thẻ CSS), h1 "Điều khoản bản quyền", không redirect. Tổng link quay về **21.154** — bằng số dist astro 7 trước di trú. Phép đối chiếu: `so-link-vs-prod.json` (+ `so-link-vs-prod.mjs`).

Chênh -1 href/trang còn lại so prod là thẻ CSS: astro 7 (vite 8) tham chiếu 1 file CSS chung thay 2 file — hiện tượng đã đối chiếu kỹ ở chặng PA1, KHÔNG phải hồi quy nội dung.

## 5. Inventory content trước/sau — 0 chênh lệch

| Chỉ số | TRƯỚC (legacy flag) | SAU (content.config.ts) |
|---|---|---|
| Trang HTML (index.html) | 289 | 289 |
| Sitemap URL | 289 | 289 |
| thuong-hieu vi/en | 74/4 | 74/4 |
| mau-iconic vi/en | 70/5 | 70/5 |
| co-che vi/en | 20/15 | 20/15 |
| tu-dien vi/en | 34/24 | 34/24 |
| huong-dan vi/en | 15/10 | 15/10 |
| so-sanh + en/compare | 2 | 2 |
| giai-phau + en/anatomy | 2 | 2 |
| Route mất/thêm | — | **0 / 0** (diff danh sách route từng tệp) |

Entry-level (`inventory-entry-src.json`): 262 entry (thuongHieu 73+3, mauIconic 69+4, coChe 19+14, tuDien 33+23, huongDan 14+9, trang 1), `draft: true` = 0 — nguồn `src/content/` không đổi (git status chỉ có `D src/content/config.ts`); id entry content layer dạng `<lang>/<tên-file>`; URL công khai do `getSlug` quyết — không đổi.

## 6. Kết quả kiểm

| Điều kiện | Kết quả | Bằng chứng |
|---|---|---|
| `npm ci` chuẩn | exit 0, 0 ERESOLVE, 0 warning | `log-npm-ci-chuan.txt` |
| Build trên node_modules từ `npm ci` | exit 0, 290 trang, 21.154 link, 0 hints | `log-build-sau-npm-ci.txt` |
| `check:types` | **0/0/0** (332→334 tệp) | `log-types-sau-di-tru.txt`, log-build |
| `npm run check` | exit 0 (26 lệnh, nằm trong chuỗi build) | log-build-* |
| `npm run build` | exit 0 toàn chuỗi | `log-build-sau-sua-ban-quyen.txt` |
| English launch | G01 99/99; `/en/`, `/en/history/`, `/en/anatomy/`, `/en/compare/` 200 đúng h1 EN | log-build + smoke-browser.json |
| Audit | exit 0, **0 advisory** (ghi thực tế, không suy diễn an toàn tuyệt đối) | `npm-audit-sau.json` |
| G09-B | **125 plate / 125 pattern / 125 tham chiếu trên 68 trang, 0 ID trùng** | log-build |
| Smoke browser 9 route | `/`, `/en/`, `/lich-su/`, `/en/history/`, `/giai-phau/`, `/en/anatomy/`, `/so-sanh/`, `/en/compare/`, `/ban-quyen/` — 200, h1 đúng ngôn ngữ, 0 redirect, 0 pageerror; theme đổi light #FBFBF8 / dark #171519 đúng token; switcher 200; Pagefind VI 33 / EN 13; mobile 375px 0px tràn (kể cả /ban-quyen/) | `smoke-browser.json` |
| Hồi quy CSS | 0 selector class mất trên 5 trang đối chiếu prod (/, lich-su, bo-thoat, rolex-submariner, so-sanh) | `css-selector-doi-chieu.json` |
| `git diff --check` + sweep | exit 0; TONG_LOI=0 | `log-sweep.txt` |

## 7. Patch hậu migration

`0004-g09c-astro7-after-content-config.patch` — xuất `git add -N` + `git diff --binary` SAU khi hoàn tất chặng.

- Kích thước: **1.122.323 B**
- SHA-256: `7e2db2d6cbec7345118686f9f034fd9babbf2fcf00435e3a34cd0fe3bad609f0`
- 24 tệp: 4 tệp M (`astro.config.mjs`, `package.json`, `package-lock.json`, `src/components/infographics/MechanismAnimation.astro` — từ chặng PA1) + `D src/content/config.ts` + tệp mới (`src/content.config.ts`, `src/pages/ban-quyen.astro` M, biên bản chặng này + 15 tệp bằng chứng `output/g09-astro7-content-config-migration/`, biên bản PA1 + bằng chứng `output/g09-astro7-tailwind-migration/`).

Ghi chú: hash tính trên tệp patch tại thời điểm xuất; mục 7 này được viết ngay sau đó nên bản biên bản bên trong patch còn ở dạng tóm tắt trước khi điền hash — chênh lệch duy nhất giữa patch và working tree, không đụng tệp mã.

## 8. Giới hạn ghi nhận

- Warning deprecation markdown legacy keys (`markdown.remarkPlugins`…) vẫn hiện khi check/build — astro 7 tự di trú qua `@astrojs/markdown-remark`, KHÔNG fail; chuyển sang `unified({...})` trực tiếp là việc làm sạch tiếp theo (không thuộc chặng này).
- Smoke/chỉ số dist trên preview cục bộ; production/CSP/Analytics giữ nguyên (nhánh riêng).

## 9. Kết luận

Chặng di trú Content Collections đạt toàn bộ tiêu chí: diagnostics 0/0/0, inventory 0 chênh lệch, `/ban-quyen/` phục hồi đúng nội dung, toàn chuỗi kiểm xanh trên môi trường `npm ci` chuẩn — để worktree nguyên trạng chờ GPT Work nghiệm thu độc lập; chưa commit/push/merge/deploy.
