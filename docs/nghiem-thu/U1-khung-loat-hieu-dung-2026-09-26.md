# BIÊN BẢN GÓI U1 — KHUNG LOẠT "HIỂU ĐÚNG" / "MECHANICAL WATCH MYTHS"

**Ngày:** 26/09/2026
**Giao dịch:** TXN-20260926-200 — danh mục DHC-GD3-20260925 v1.0.0
**Nền Git:** HEAD = `origin/main` = `84b1712` (`84b17127499041b55828322d76b2e8f86dfd53ed`), nhánh `main`, staged = 0, tracked sửa 0 khi bắt đầu
**Căn cứ:** quyết định Q4 của anh Vinh (loạt đặt trong `huongDan`, thẻ `hieu-dung`, route `/hieu-dung/` ↔ `/en/myths/`); `docs/KE-HOACH-HOP-NHAT-GIAI-DOAN-3-2026-09-25.md` mục U1; prompt GPT Work U1
**Trạng thái:** đã làm xong vòng sửa 2 (TXN-20260926-205), CHƯA stage, CHƯA commit, CHƯA push — chờ GPT Work tái nghiệm thu

> **Ghi chú vòng sửa 2 (TXN-20260926-205):** hub EN còn import dư `getLangFromUrl` sau khi cố định ngôn ngữ EN bằng `t('en')` — gây hint ts(6133). Đã bỏ duy nhất import này trong `src/pages/en/myths/index.astro`; không đổi logic, query, bộ lọc tag, href hay giao diện. Diagnostics sau sửa: `check:types` **0 lỗi, 0 cảnh báo, chỉ còn 1 hint cũ** tại `output/playwright/audit-2026-09-25.mjs` (untracked có trước, ngoài U1) — **không còn hint nào do U1 tạo**.

> **Ghi chú vòng sửa 3 (TXN-20260926-207):** `package.json` trước đó chỉ nối checker U1 vào `npm run check` (source) — các kiểm dist U1 chỉ chạy thủ công. Đã nối **đúng một lệnh** `&& node scripts/check-u1-myth-series.mjs dist` vào **cuối chuỗi `build`** (sau `check-p0-d2-glossary-expansion.mjs dist`); không thay thứ tự, xóa hay sửa checker nào khác. Đầu ra thực tế của `npm run build` xác nhận: chuỗi build in ra với `check-u1-myth-series.mjs dist` ở cuối, U1 checker chạy với `dist` và ĐẠT (U1-8 bốn trang dẫn + hai hub đều ĐẠT).

> **Ghi chú vòng sửa route thẻ EN (TXN-20260926-203):** lỗi — hub EN dùng `getCollectionRoute('huongDan')`, hàm trả cố định route VI `/huong-dan`, nên khi có bài gắn thẻ, thẻ trên hub EN sẽ dẫn sai về route VI.
> **Cách sửa:** hub EN dựng trực tiếp href `/en/guides/${getSlug(entry)}/` (bỏ `getCollectionRoute`); hub VI giữ `getCollectionRoute('huongDan')` (route VI đúng). Checker bổ sung kiểm source U1-3b: hub EN phải chứa `/en/guides/${getSlug(entry)}/` và không được dùng `getCollectionRoute('huongDan')`; hub VI phải dùng `getCollectionRoute('huongDan')`.
> **Mutation (ngoài cây `D:\donghoco-worktrees\u1-mut2\`):** hub EN đổi sang `getCollectionRoute('huongDan')` → **exit 1 — `[U1-3b] hub EN: href /en/guides/<slug>/=false, dùng getCollectionRoute('huongDan')=true`** (`ca-route-sai.log`).
> **Kiểm render động (ngoài cây `D:\donghoco-worktrees\u1-render\`):** cây build hoàn chỉnh (junction `node_modules`); gắn tag `hieu-dung` cho cặp `chon-dong-ho-dau-tien` (VI) + `first-mechanical-watch` (EN) → build → hub VI hiển thị đúng một thẻ `href="/huong-dan/chon-dong-ho-dau-tien"` và hub EN đúng một thẻ `href="/en/guides/first-mechanical-watch/"` → hoàn nguyên hai tệp (`sha256sum -c` OK, `chon-dong-ho-dau-tien` `cab831ec…`, `first-mechanical-watch` `506b7478…`) → build lại: hai hub trở về trạng thái trống. Cây tạm đã xóa; log tại `output/u1-myth-series-audit/` (`hash-dong-tag.txt`, `build-tag.log`, `build-sach.log`).

---

## 1. Tệp thay đổi (6 sửa + 2 mới + biên bản)

| # | Tệp | Thay đổi |
|---|---|---|
| 1 | `src/pages/hieu-dung/index.astro` (**mới**) | hub VI `/hieu-dung/`: BaseLayout + SectionHeading (H1 ×1) + thẻ `Card` hiện có; truy vấn `getEntriesByLang('huongDan', lang)` → lọc `entry.data.tags?.includes('hieu-dung')`; chưa có bài → nhãn trống i18n `hieudung_empty`, không tạo thẻ giả |
| 2 | `src/pages/en/myths/index.astro` (**mới**) | hub EN `/en/myths/`: cùng cấu trúc, `getEntriesByLang('huongDan', 'en')` |
| 3 | `src/i18n/contentRoutes.ts` | thêm đúng một cặp vào `INDEX_PAIRS`: `{ vi: '/hieu-dung', en: '/en/myths/' }` (kèm comment U1) |
| 4 | `src/i18n/ui.ts` | thêm 4 nhãn mới × 2 ngôn ngữ: `hieudung_hub_title` ('Hiểu đúng' / 'Mechanical Watch Myths'), `hieudung_hub_description` (mô tả trung tính khung loạt), `hieudung_empty` (trạng thái trống), `hieudung_entry` (nhãn liên kết dẫn). Không sửa nhãn khác |
| 5 | `src/pages/index.astro` | thêm một section nhỏ (1 liên kết) trước khối Trust: `{tr.hieudung_entry}` → `/hieu-dung` qua `localizedPath`. Không đụng hero/nav/footer/CTA hiện hữu |
| 6 | `src/pages/en/index.astro` | tương tự trước khối Trust: liên kết → `/en/myths/` |
| 7 | `src/pages/huong-dan/index.astro` | thêm `descriptionLink` (prop có sẵn của CollectionListLayout) trỏ `/hieu-dung` (VI) hoặc `/en/myths/` (EN); bổ sung `const tr = t(lang)` và import `t` (chỉ để phục vụ nhãn liên kết) |
| 8 | `src/pages/en/guides/index.astro` | truyền `footerLink` (prop có sẵn của EnCollectionIndex, cơ chế G06-B) trỏ `/en/myths/` |
| 9 | `scripts/check-u1-myth-series.mjs` (**mới**) | checker U1 — chi tiết mục 2 |
| 10 | `package.json` | nối `&& node scripts/check-u1-myth-series.mjs` vào cuối chuỗi `check` (kiểm source) và `&& node scripts/check-u1-myth-series.mjs dist` vào cuối chuỗi `build` (kiểm source + dist) — không sửa gì khác |

Bằng chứng nội bộ: `output/u1-myth-series-audit/` (ảnh chụp + script kiểm trình duyệt + log mutation) — không đưa vào commit.

## 2. Thiết kế khung và checker U1

- Hai hub chỉ truy vấn collection `huongDan` đúng ngôn ngữ; lọc **chỉ** theo `entry.data.tags?.includes('hieu-dung')` (trường `tags` đã có sẵn trong `baseFields` — không đụng schema).
- Không bài gắn thẻ → nhãn trống i18n; không thẻ giả. Có bài → thẻ `Card` theo route `huongDan` (VI `/huong-dan/<slug>`, EN `/en/guides/<slug>`).
- Trạng thái trống dùng nhãn `hieudung_empty` (trung tính, không khẳng định chuyên môn).
- Checker `check-u1-myth-series.mjs`: U1-1 (hai tệp hub), U1-2 (đúng một cặp route), U1-3 (collection + ngôn ngữ + lọc tag từng hub), U1-4 (nhãn trống i18n hai ngôn ngữ), U1-5 (dist: hai hub tồn tại, H1 ×1), U1-6 (canonical + hreflang vi/en + switcher hai chiều), U1-7 (trạng thái trống trên dist), U1-8 (bốn trang dẫn có liên kết đúng ngôn ngữ; không rò URL VI vào EN và ngược lại). Chạy không tham số = chỉ source (`npm run check`); truyền `dist` = source + dist (`npm run build`). Root tạm qua env `U1_ROOT`.

## 3. Kết quả kiểm

| Kiểm | Kết quả |
|---|---|
| `node scripts/check-u1-myth-series.mjs` (không dist) | exit 0 — ĐẠT |
| `node scripts/check-u1-myth-series.mjs dist` | exit 0 — ĐẠT |
| `npm run check` | exit 0 — 233 ca ĐẠT (gồm U1); "U1 checker: ĐẠT" |
| `npm run build` | exit 0 — **338 trang**, 25.116 link, 0 link nội bộ hỏng; U1 checker dist ĐẠT (vòng sửa 3: được gọi từ chính chuỗi build — đầu ra in chuỗi `build` có `check-u1-myth-series.mjs dist` ở cuối, chạy ĐẠT với `dist`) |
| `npm run check:types` | exit 0 — 0 lỗi, 0 cảnh báo, 1 hint cũ (`output/playwright/audit-2026-09-25.mjs:17`, ngoài phạm vi) |
| `node scripts/scan-chars.mjs` | OK — 438 tệp |
| `git diff --check` | exit 0 |

**Số liệu thực sau build:** 338 trang HTML; `dist/sitemap-0.xml` = 337 URL (+2 hub so với trước U1); 25.116 link nội bộ, 0 hỏng.

## 4. Kiểm dist hai hub

| Hạng mục | Hub VI `/hieu-dung/` | Hub EN `/en/myths/` |
|---|---|---|
| H1 duy nhất | ×1 "Hiểu đúng" | ×1 "Mechanical Watch Myths" |
| Canonical | `…/hieu-dung/` | `…/en/myths/` |
| hreflang vi/en | đủ | đủ |
| Switcher | → `/en/myths/` | → `/hieu-dung` |
| Trạng thái trống | "Chưa có bài nào trong loạt này. Hãy quay lại sau!" | "No articles in this series yet. Please check back later!" |
| Thẻ bài không gắn thẻ | không có | không có |

## 5. Kiểm trình duyệt (preview local + playwright-cli)

Ảnh chụp và script lưu `output/u1-myth-series-audit/` (`u1-browser-check.js` + 6 ảnh PNG):

- Trang chủ VI: liên kết `/hieu-dung` đúng một → click tới hub; H1 ×1; trạng thái trống hiển thị.
- Switcher trên hub VI → `/en/myths/`; hub EN có H1 ×1 và trạng thái trống EN.
- `Guides EN`: đúng một liên kết `/en/myths/` (footerLink).
- Mobile 390 px: hub VI không tràn ngang (`scrollWidth ≤ 390`); trạng thái trống đọc được ở chế độ sáng; chế độ tối (class `dark`) đọc được; hub EN dark desktop đọc được.

## 6. Mutation ngoài cây repo — `D:\donghoco-worktrees\u1-mut\` (đã dọn)

Cây tạm: checker U1 + `contentRoutes.ts` + `ui.ts` + `src/pages/`. Baseline source: exit 0 ĐẠT.

| Ca | Thao tác | Kết quả | Khôi phục |
|---|---|---|---|
| A — sai cặp route | đổi cặp thành `{ vi: '/hieu-dung', en: '/en/glossary/' }` | **exit 1** — `[U1-2] Cặp /hieu-dung ↔ /en/myths/ xuất hiện 0 lần` (`ca-a.log`) | khôi phục từ repo; `cmp` khớp byte; chạy lại exit 0 |
| B — sai bộ lọc tag | bỏ dòng `.filter((entry) => entry.data.tags?.includes('hieu-dung'))` ở hub VI | **exit 1** — `[U1-3] hub VI: lọc sai (… lọc tag=false)` (`ca-b.log`) | khôi phục từ repo; `cmp` khớp byte; chạy lại exit 0 |
| C — sai liên kết dẫn | `dist/index.html` đổi `href="/hieu-dung"` → `href="/hieu-dung-sai"` (chạy với dist) | **exit 1** — `[U1-8] trang chủ VI: thiếu liên kết href="/hieu-dung"` (`ca-c.log`) | khôi phục `dist/index.html`; `sha256sum -c` OK; chạy lại exit 0 (sau khi bổ sung đủ 6 trang dist mà checker cần) |

Cây tạm xóa; log `baseline.log`, `ca-a.log`, `ca-b.log`, `ca-c.log`, `sach-caC.log` lưu `output/u1-myth-series-audit/`.

## 7. Điểm chưa giải quyết

Không có. Ghi chú: hub hiện ở trạng thái trống đúng thiết kế (chưa có bài gắn thẻ `hieu-dung` — việc gắn thẻ thuộc gói nội dung sau); các trang dẫn dùng prop có sẵn của layout/template nên không đụng CSS toàn cục.

## 8. Trạng thái Git cuối

- Nhánh `main`; HEAD = `origin/main` = `84b1712` (chưa tạo commit mới).
- `git status`: 6 modified, 2 untracked mới (`scripts/check-u1-myth-series.mjs` là untracked mới, hai hub là untracked mới) — tổng 6 modified + 3 untracked mới (2 hub + biên bản) + `output/u1-myth-series-audit/` (nội bộ).
- Chưa stage, chưa commit, chưa push.

## 9. Danh sách tệp đề nghị phát hành — **11 tệp** (không gồm `output/`)

7 tệp sửa:

1. `src/pages/index.astro`
2. `src/pages/en/index.astro`
3. `src/pages/huong-dan/index.astro`
4. `src/pages/en/guides/index.astro`
5. `src/i18n/contentRoutes.ts`
6. `src/i18n/ui.ts`
7. `package.json`

2 hub mới:

8. `src/pages/hieu-dung/index.astro`
9. `src/pages/en/myths/index.astro`

1 checker mới:

10. `scripts/check-u1-myth-series.mjs`

1 biên bản mới:

11. `docs/nghiem-thu/U1-khung-loat-hieu-dung-2026-09-26.md`

1. `src/pages/hieu-dung/index.astro` (mới)
2. `src/pages/en/myths/index.astro` (mới)
3. `src/i18n/contentRoutes.ts`
4. `src/i18n/ui.ts`
5. `src/pages/index.astro`
6. `src/pages/en/index.astro`
7. `src/pages/huong-dan/index.astro`
8. `src/pages/en/guides/index.astro`
9. `scripts/check-u1-myth-series.mjs` (mới)
10. `package.json`
11. `docs/nghiem-thu/U1-khung-loat-hieu-dung-2026-09-26.md` (mới)
