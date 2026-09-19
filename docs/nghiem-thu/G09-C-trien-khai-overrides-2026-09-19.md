# Biên bản G09-C chặng 2 — Triển khai Đ2: overrides js-yaml / nanoid / devalue

- **Giao việc**: TXN-20260919-19 kế tục — anh Vinh duyệt "tiếp tục" ngày 19/09/2026 sau khi G09-C chặng 1 được GPT Work commit (`230e437`); triển khai **Đ2** (phương án nhỏ, rủi ro thấp) theo biên bản chặng 1 mục 5. **Đ1 (nâng astro major 4→7.3.3) CHƯA làm — cần chặng riêng do breaking quy mô lớn.**
- **Nền**: `230e437` ("docs(ops): audit dependency advisories") — đã đối chiếu HEAD = origin/main; 0 M, 0 staged trước khi sửa.
- **Ngày thực hiện**: 2026-09-19.
- **Thay đổi**: `package.json` thêm khối `overrides` (nanoid, devalue + js-yaml theo cha gray-matter/load-yaml-file/astro); `package-lock.json` được `npm install` cập nhật lại **tối thiểu: 15 dòng version** (không nâng astro hay gói trực tiếp nào).

## 0. Kết luận

Ba advisory đã **được gỡ khỏi audit**: `js-yaml` 3.15.0→**3.15.2** (hai bản) và 4.3.0→**4.3.2**; `nanoid` 3.3.16→**3.3.19**; `devalue` 5.9.0→**5.9.4** — đúng dải fix hồ sơ chặng 1. `npm audit` sau sửa còn **4 advisory** (`astro` critical, `sharp`/`vite` high, `esbuild` moderate — toàn bộ gắn major astro, thuộc Đ1 chờ duyệt). Site build/check toàn chuỗi **exit 0** với dependency mới (astro check **336 tệp — 0/0/0**; 290 trang / 21.444 link 0 hỏng; census G09-B **125/125/125** — frontmatter parse bình thường với js-yaml mới). **G09-C chặng 2 (Đ2) xong — chờ GPT Work nghiệm thu; Đ1 chờ quyết riêng; chưa commit/push/deploy.**

## 1. Tệp gói (2 sửa + 2 tạo mới = 4 tệp)

| Tệp | Thay đổi |
|---|---|
| `package.json` (M) | +khối `overrides`: `nanoid ^3.3.18`, `devalue ^5.9.1`, `gray-matter → js-yaml ^3.15.2`, `load-yaml-file → js-yaml ^3.15.2`, `astro → js-yaml ^4.3.2` (nested override — giữ đúng major từng cha cần: gray-matter/load-yaml-file cần 3.x, astro cần 4.x) |
| `package-lock.json` (M) | 5 mục version cập nhật: `devalue 5.9.0→5.9.4`, `js-yaml 3.15.0→3.15.2` (×2), `js-yaml 4.3.0→4.3.2`, `nanoid 3.3.16→3.3.19`; tổng diff ~15 dòng |
| `docs/nghiem-thu/G09-C-trien-khai-overrides-2026-09-19.md` | biên bản này |
| `output/g09-dependency-audit/` | +5 tệp: `npm-audit-sau-c2.json`, `log-npm-install-c2.txt`, `log-types-c2.txt`, `log-check-c2.txt`, `log-build-c2.txt` |

**Ghi chú phạm vi**: chặng này CHỈ Đ2. **Đ1 (astro major) chưa làm** — advisory `astro` (critical, 19 GHSA), `esbuild`, `vite`, `sharp` vẫn còn trong audit cho tới Đ1. Reduced-motion, ID guilloché (G09-B) không đụng lại.

## 2. Kiểm tra sau triển khai (số liệu thật)

| Kiểm | Kết quả |
|---|---|
| `npm install` (chỉ để áp overrides — KHÔNG `audit fix`, không nâng gói trực tiếp) | **exit 0** (log-npm-install-c2.txt); lockfile diff ~15 dòng version như bảng trên |
| `npm ls js-yaml nanoid devalue` | nanoid 3.3.19 (postcss); devalue 5.9.4 (astro); js-yaml 4.3.2 (astro) + 3.15.2 (gray-matter, load-yaml-file) |
| `npm audit --json` sau sửa | còn **4 advisory**: astro (critical), esbuild (moderate), sharp (high), vite (high) — js-yaml/nanoid/devalue **đã gỡ** (`npm-audit-sau-c2.json`) |
| `npm run check:types` | **exit 0 — 0/0/0** (log-types-c2.txt) |
| `npm run check` | **exit 0** (log-check-c2.txt) |
| `npm run build` | **exit 0** (log-build-c2.txt): astro check 336 tệp 0/0/0; links 290 trang / 21.444 link 0 hỏng; **census G09-B trong chuỗi: 125/125/125, 0 ID trùng** — chứng minh js-yaml mới parse frontmatter bình thường |
| Sweep bằng chứng | TONG_LOI=0, JSON hợp lệ (`log-sweep.txt`) |
| `git diff --check` | sạch; stage thử 4 tệp → `git diff --cached --check` exit 0 → bỏ stage |

## 3. Giới hạn

1. 4 advisory còn lại (astro critical + sharp/vite/esbuild) **chỉ gỡ được bằng Đ1** — nâng astro major 4→7.3.3, breaking, cần chặng riêng với dự kiến: nâng `astro` + đối chiếu phiên bản `@astrojs/sitemap`/`astro-pagefind`/`@astrojs/tailwind`/`@astrojs/check` tương thích astro 7, Node version, API component; hồi quy: toàn chuỗi check/build + census G09-B + trình duyệt plate + English launch; rollback `git revert` + `npm ci`.
2. Audit không thay thế kiểm production; overrides gỡ advisory theo dải phiên bản — **không** chứng minh "hết rủi ro".
3. npm install chạy trong môi trường có registry (đã thành công); allowScripts esbuild/sharp giữ nguyên.

## 4. Điểm dừng

**G09-C chặng 2 (Đ2) xong — chờ GPT Work nghiệm thu; Đ1 (astro major) chờ anh Vinh quyết mở chặng riêng; chưa commit/push/deploy; G09 chưa kết luận hoàn tất.**
