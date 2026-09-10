# README — P1.5 đồng bộ tài liệu tiến độ cuối danh mục (TXN-20260910-41)

Nền: `1e4551b` (main, trùng origin/main). Ngày: 10/09/2026. Chưa commit/push.

## Cách tái lập

```bash
npm run build                                              # chuỗi hiện hành (chứa npm run check) — log: log-build-stdout.txt
node scripts/check-english-launch.mjs                      # chạy riêng sau build — log: log-english-launch.txt
node output/p1.5-documentation-sync/do-so-lieu.cjs         # đếm số liệu — ket-qua-do.json + log-do-so-lieu.txt
```

## Các tệp

| Tệp | Nội dung |
| --- | --- |
| `do-so-lieu.cjs` | Công cụ đếm: Markdown theo collection × ngôn ngữ (đĩa + draft:true), dist HTML theo ngôn ngữ (phân loại 404), sitemap, frontmatter related (đếm mục lồng YAML đúng cấu trúc `- slug:` + `relation:`), timeline, khối sources |
| `ket-qua-do.json` | Số liệu máy-đọc (object trực tiếp, kèm thời điểm đo + HEAD) |
| `log-build-chi-tiet.txt` | Thời điểm bắt đầu/kết thúc, exit code của build |
| `log-build-stdout.txt` | stdout/stderr build đầy đủ — **đã bỏ ANSI màu, giữ nguyên UTF-8** (chuẩn hóa công bố, không đổi kết quả) |
| `log-do-so-lieu.txt` | Log chạy công cụ đếm |
| `log-english-launch.txt` | Log `check-english-launch.mjs` chạy riêng (60 route bắt buộc) |

## Số liệu chốt (nền `1e4551b`, đo lại vòng sửa 1)

- Build: exit 0, 132 giây (22:27:24 → 22:29:36 +07); astro check 176 tệp: **0 errors / 0 warnings / 4 hints** (nguyên trạng — 4 hints ts(6133) ở tệp công cụ gói P3.1/P3.2/P3.3 đã commit).
- Chuỗi `check` package.json: **26 lệnh = 25 lệnh kiểm trực tiếp + `npm run check:types` cuối chuỗi**.
- check-links: 286 trang HTML, **19.827 link, 0 hỏng** — tăng 5 so mốc 19.822 (04/09); **chưa phân rã nguyên nhân theo từng gói**.
- dist: 286 HTML = 221 vi + 64 en + 1 `404.html`; **sitemap: `sitemap-index.xml` = 1 tham chiếu sitemap con (không phải URL trang), `sitemap-0.xml` = 285 URL trang = 221 vi + 64 en** — công cụ tách index khỏi URL trang và có kiểm tra tổng = VI + EN; `check-english-launch` riêng: đủ 60 route bắt buộc.
- Markdown: **207 bài VI** (5 collection nội dung) + **1 trang pháp lý VI** (`trang/ban-quyen`) + **53 bài EN** = **261 tệp Markdown** — không đồng nhất với 286 HTML build; `draft: true` = 0 tệp (đọc trọn frontmatter; cơ chế `src/lib/content.ts`).
- Frontmatter related: 131/69 · 29/18 · 29/24 (đo lại khớp mốc 01/09); timeline 28/28; sources đủ theo từng collection.
- Lịch sử English: launch bắt đầu 02/09/2026 với 27 route EN (biên bản launch pack); 64 route là số tại mốc đo 10/09/2026 (53 bài + 11 trang khác).

## Giới hạn

- Số liệu build cục bộ — không thay thế production/Core Web Vitals/Search Console.
- Không sửa mã website, diagnostics hay các phát hiện ngoài phạm vi (beacon, Escape, ID pattern trùng, reduced-motion Escapement).
