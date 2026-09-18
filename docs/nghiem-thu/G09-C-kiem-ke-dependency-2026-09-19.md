# Biên bản G09-C chặng 1 — Kiểm kê dependency và khuyến cáo

- **Giao việc**: TXN-20260919-19 (danh mục DHC-G05G09-20260913); G09-C là nhánh phụ thuộc còn lại — chặng kiểm kê, **chưa nâng cấp bất kỳ package nào**.
- **Nền**: `60b303e` ("fix(svg): isolate WatchImage pattern IDs") — đã đối chiếu HEAD = origin/main; tracked và staged sạch trước khi làm (0 M, 0 staged).
- **Ngày thực hiện**: 2026-09-19.
- **Phạm vi**: đọc `package.json`/`package-lock.json`, cây dependency, chạy kiểm chỉ đọc (`npm ls`, `npm audit --json`), build nền; **cấm** `npm install`/`npm update`/`npm audit fix`/đổi lockfile/đổi mã nguồn — xác nhận bằng `git diff` cuối mục 5.

## 0. Kết luận

Dependency trực tiếp gồm **8 gói** (5 `dependencies` + 3 `devDependencies`), lockfile khóa **538 gói**. `npm audit --json` (chỉ đọc, chạy lại được) báo **7 advisory trên 7 gói** — 1 critical (**astro**, 19 mã GHSA trong range `<=7.2.7`, fix duy nhất là **nâng major lên 7.3.3**), 4 high (**sharp**, **vite**, **js-yaml**, **nanoid**), 2 moderate (**esbuild**, **devalue**) — toàn bộ nằm trong cây `astro` và `@astrojs/tailwind`. Phân loại: astro = **cần nâng cấp có kiểm soát (major, breaking — chờ anh Vinh duyệt riêng)**; devalue/js-yaml/nanoid = **cần theo dõi + nâng nhỏ có kiểm soát** (transitive pin); esbuild/vite/sharp = **gắn với đợt nâng astro**; 5 gói còn lại **không có advisory**. Build nền **exit 0** (0/0/0 hints; 290 trang / 21.444 link 0 hỏng). `package.json`/`package-lock.json` **không đổi** (git diff trống). **Dừng tại cổng kiểm kê — chưa nâng dependency.**

## 1. Dependency trực tiếp (khai báo vs lock/cài)

| Gói | Khai báo | Lock/cài | Vai trò trong repo | Khu vực ảnh hưởng nếu thay đổi |
|---|---|---|---|---|
| `astro` | `^4.16.18` | 4.16.19 | Framework SSG — build toàn site, component `.astro`, content collections | **Toàn site** (build, config, API component) — thay đổi major ảnh hưởng mọi lớp |
| `@astrojs/sitemap` | `^3.2.1` | 3.2.1 | Tích hợp sitemap-index (`astro.config.mjs`) | `sitemap-index.xml`/`sitemap-0.xml` |
| `@vercel/analytics` | `^2.0.1` | 2.0.1 | Script Analytics nhúng trong `BaseLayout.astro` | Runtime mọi trang (CSP production nằm ngoài G09-C) |
| `astro-pagefind` | `^2.0.1` | 2.0.1 | Tích hợp Pagefind (tìm kiếm) — `astro.config.mjs` | Pagefind index build + UI tìm kiếm |
| `three` | `^0.185.1` | 0.185.1 | 3D giải phẫu — `src/scripts/exploded3d.ts` (chunk động, chỉ trang có 3D) | Chunk 3D + ngân sách tải (`check-3d-loading-budget`) |
| `@astrojs/check` | `0.9.10` (pin cứng) | 0.9.10 | `astro check` — script `check:types` | Chuỗi `npm run check`/`check:types` |
| `@astrojs/tailwind` | `^5.1.4` | 5.1.5 | Tích hợp Tailwind (`astro.config.mjs`) | Styling toàn site (build CSS) |
| `tailwindcss` | `^3.4.17` | 3.4.19 | Tailwind v3 — toàn bộ utility/`global.css` | Styling toàn site — **major v4 là breaking** |

Nguồn dữ liệu: `inventory-truc-tiep.json` (từ `package-lock.json`, lockfileVersion + `packages["node_modules/<tên>"]`), `log-npm-ls-depth0.txt` (cài thực tế — khớp lock 8/8).

## 2. Dependency bắc cầu liên quan advisory (chỉ mức cần thiết)

Tổng 538 gói trong lock. Các gói bắc cầu có advisory + đường phụ thuộc thực tế (`log-npm-ls-advisory.txt`):

| Gói | Version lock | Đường phụ thuộc |
|---|---|---|
| `esbuild` | 0.21.5 | `astro` → `vite` (deduped) |
| `vite` | 5.4.21 | `astro` |
| `sharp` | 0.33.5 | `astro` |
| `devalue` | 5.9.0 | `astro` |
| `js-yaml` | 4.3.0 + 3.15.0 | `astro`; `astro` → `gray-matter`; `astro` → `which-pm` → `load-yaml-file` |
| `nanoid` | 3.3.16 | `@astrojs/tailwind` → `postcss` |

## 3. Kết quả `npm audit` và khuyến cáo

Lệnh: `npm audit --json` (chỉ đọc — **không** `audit fix`; xác nhận `git diff package*.json` trống sau chạy). Audit **exit 1 do tồn tại vulnerability** (hành vi chuẩn của npm) và **JSON hợp lệ, khả dụng** — nguyên văn: `npm-audit-raw.json`; rút gọn: `advisory-chi-tiet.json`. Nguồn chính thức: GitHub Advisory Database (URL `ghsa` đầy đủ trong JSON) + advisory ID npm.

| Gói (lock) | Mức | Range ảnh hưởng | Advisory tiêu biểu (mã GHSA — đầy đủ trong JSON) | Fix theo audit |
|---|---|---|---|---|
| `astro` 4.16.19 (trực tiếp) | **CRITICAL** | `<=7.2.7` | 19 mã: GHSA-26w7-cxv4-gfx2 (RCE qua AVIF image optimization), GHSA-j687-52p2-xcff (XSS `define:vars`), GHSA-x3h8-62x9-952g (dev server đọc file tùy ý), GHSA-ggxq-hp9w-j794 + GHSA-whqg-ppgf-wp8c (middleware bypass), GHSA-xr5h-phrj-8vxv (server island replay), GHSA-fvmw-cj7j-j39q (Cloudflare adapter `/_image`), … | Chỉ có khi **nâng major astro 7.3.3** (`isSemVerMajor: true`) |
| `vite` 5.4.21 (bắc cầu) | HIGH | `<=6.4.2` | GHSA-4w7w-66w2-5vf9 (path traversal `.map`), GHSA-fx2h-pf6j-xcff (`server.fs.deny` bypass Windows), GHSA-v6wh-96g9-6wx3 (launch-editor NTLM) | Gắn astro 7.3.3 |
| `sharp` 0.33.5 (bắc cầu) | HIGH | `<=0.35.4-rc.0` | GHSA-f88m-g3jw-g9cj (libvips CVE-2026-33327/33328/35590/35591), GHSA-rgj7-g3m4-5g8c (libheif) | Gắn astro 7.3.3 |
| `js-yaml` 4.3.0 + 3.15.0 (bắc cầu) | HIGH | 3.x `>=3.0.0 <3.15.2`; 4.x `>=4.0.0 <4.3.2` | GHSA-5p4m-2wfm-xmqj, GHSA-2883-xcg3-v3hh (CPU tiêu thụ bậc hai khi resolve `!!omap`/merge rỗng) | Có fix không breaking (nâng pin transitive) |
| `nanoid` 3.3.16 (bắc cầu) | HIGH | `<3.3.18` | GHSA-2v37-7h3g-55p8 (generator kích thước 0 lặp vô hạn) | Có fix không breaking |
| `devalue` 5.9.0 (bắc cầu) | MODERATE | `<5.9.1` | GHSA-9rgm-9g3h-6x36 (DoS input sai định dạng) | Có fix không breaking |
| `esbuild` 0.21.5 (bắc cầu) | MODERATE | `<=0.24.2` | GHSA-67mh-4wv8-2f99 (website gửi request tới dev server) | Gắn astro 7.3.3 |

Khả năng tái tạo: `npm audit --json` chạy lại từ lockfile — exit 1 khi còn advisory (log: `log-audit-stderr.txt` rỗng; JSON lưu `npm-audit-raw.json`).

**Bề mặt — đối chiếu trung thực (không kết luận thay hệ thống kiểm):** site là SSG tĩnh hoàn toàn (không middleware, không server islands, không actions, không adapter Cloudflare, không chạy dev server trên production) — một số advisory astro thuộc các bề mặt đó; **tuy nhiên** site CÓ dùng `define:vars` (GHSA-j687-52p2-xcff) và chạy `astro build` (esbuild/vite/sharp/js-yaml ở pha build). Việc đối chiếu từng advisory với bề mặt thật là công việc của chặng nâng cấp — chặng này chỉ ghi nhận mức độ trong audit và **không suy diễn "site tĩnh nên không sao"**.

## 4. Phân loại phát hiện

| Gói | Phân loại | Căn cứ |
|---|---|---|
| `@astrojs/sitemap`, `@vercel/analytics`, `astro-pagefind`, `three`, `@astrojs/check` | **Không có advisory** | npm audit không báo; không dùng tuổi phiên bản làm bằng chứng |
| `astro` (kèm `esbuild`, `vite`, `sharp` trong cây) | **Cần nâng cấp có kiểm soát** — major 4 → 7.3.3, breaking | 19 GHSA, audit xếp CRITICAL; fix duy nhất theo audit là major |
| `devalue`, `js-yaml`, `nanoid` | **Cần theo dõi + nâng nhỏ có kiểm soát** (pin transitive) | HIGH/MODERATE, có fix không breaking theo audit — nhưng mọi cách đều đổi lockfile → thuộc chặng triển khai |
| Mức khai thác thực tế từng GHSA trên site tĩnh | **Chưa đủ bằng chứng** | Chưa đối chiếu từng advisory với bề mặt dùng thật; không tự kết luận an toàn/nguy hiểm |

## 5. Đề xuất cho anh Vinh duyệt riêng (KHÔNG tự áp dụng)

| Đề xuất | Package/tệp dự kiến | Thay đổi dự kiến | Rủi ro tương thích | Hồi quy | Rollback |
|---|---|---|---|---|---|
| Đ1 — nâng astro major | `package.json` (`astro ^4.16.18` → `^7.3.3`), kèm kiểm tra `@astrojs/sitemap`/`astro-pagefind`/`@astrojs/tailwind`/`@astrojs/check` phiên bản tương thích | `npm install` cập nhật lock; gỡ bỏ v_detail nếu API đổi | **Cao** — major 4→7: astro config, tích hợp, Node version, API component; 3 advisory (esbuild/vite/sharp) được gỡ kèm | `npm run check`, `npm run build`, census G09-B (125/125/125), trình duyệt ma trận plate, English launch | `git revert` commit + `npm ci` từ lockfile cũ |
| Đ2 — pin transitive nhỏ | `package.json` thêm `overrides` cho `js-yaml`/`nanoid`/`devalue` | `npm install` cập nhật lockfile | Thấp–trung bình (giữ astro 4) | Build + check + smoke trang | `git revert` + `npm ci` |
| Đ3 — chấp nhận rủi ro hiện hành + theo dõi | Không đổi tệp | Ghi nhận định kỳ lại audit | Không | — | — |

Quyết định thuộc anh Vinh; gói này chưa thực hiện bất kỳ phương án nào.

## 6. Giới hạn

- `npm audit` **không thay thế kiểm production**; kết quả audit sạch **không** đồng nghĩa production an toàn tuyệt đối — và ngược lại, advisory tồn tại **không** tự động nghĩa là đang bị khai thác trên site tĩnh này.
- CSP production và Analytics nằm **ngoài G09-C** (nhánh riêng).
- `npm audit` cần truy cập registry npm — lần chạy này thành công (JSON hợp lệ; exit 1 là do tồn tại advisory).
- Chưa đối chiếu từng GHSA với bề mặt code dùng thật — đây là việc của chặng nâng cấp nếu được duyệt; chặng này không kết luận thay việc đó.

## 7. Ma trận nghiệm thu chặng triển khai — **CHƯA KIỂM** (chỉ liệt kê trạng thái, chưa thực hiện)

| Hạng mục | Trạng thái |
|---|---|
| Nâng astro major 4→7.3.3 + tích hợp tương thích | CHƯA KIỂM |
| Overrides js-yaml/nanoid/devalue | CHƯA KIỂM |
| Hồi quy toàn chuỗi check/build sau nâng | CHƯA KIỂM |
| Census G09-B + trình duyệt plate sau nâng | CHƯA KIỂM |
| Xác nhận lại `npm audit` sau nâng | CHƯA KIỂM |

**Không tuyên bố đã khắc phục bất kỳ advisory nào — chưa có quyết định nâng version.**

## 8. Tự kiểm

1. Nền Git đúng (`60b303e`); **0 tracked modified, 0 staged trước và sau** (`git status`; `git diff package.json package-lock.json` trống — audit chỉ đọc).
2. Tệp mới của gói: biên bản này + `output/g09-dependency-audit/` (10 tệp: 2 JSON, 6 log/txt, 2 script .mjs); không đưa untracked có trước vào gói.
3. JSON/log hợp lệ, không chứa token/cookie/Authorization/secret (sweep `sweep-g09-c.mjs` — mẫu nhạy cảm ghép mảnh, TONG_LOI=0); whitespace/EOF sạch.
4. `git diff --check` **sạch**.
5. Build nền `npm run build` **exit 0** (astro check 0/0/0; 290 trang / 21.444 link 0 hỏng; 0/0/0 hints — `log-build-nen.txt`).
6. GLM không stage, commit, push hoặc deploy.

## 9. Điểm dừng

**G09-C chặng 1 xong kiểm kê — chờ GPT Work nghiệm thu và anh Vinh duyệt phạm vi triển khai; chưa nâng dependency, chưa commit/push/deploy.**
