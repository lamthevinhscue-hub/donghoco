# Biên bản nghiệm thu tổng thể — chuỗi tối ưu giao diện (Gói 1–6)

**Ngày:** 16/08/2026 (cuối ngày)
**Baseline:** commit `4d87b1b` (Prompt 3) — các thay đổi Gói 4–6 nằm trong working tree, chưa commit
**Phạm vi:** nghiệm thu giao diện sau 5 gói tối ưu (token/màu/font, header/menu/search, trang chủ Calibre Map, trải nghiệm đọc bài, card/bộ lọc/ảnh) và sửa hồi quy trong phạm vi giao diện
**Môi trường kiểm:** `npm run build` + `astro preview` (bản build thật, không phải dev server); trình duyệt điều khiển được (IAB) có giới hạn: không đọc console, không mô phỏng `prefers-reduced-motion`, `evaluate()` bị chặn

---

## 1. File giao diện thay đổi (so với baseline `4d87b1b`)

| File | Gói | Nội dung chính |
|---|---|---|
| `src/components/TableOfContents.astro` | 4 | **Mới** — mục lục từ headings build-time; details mobile + rail sticky ≥1024px, không nested scroll |
| `src/layouts/ArticleLayout.astro` | 4 | Lưới rail TOC, progress bar scaleX rAF, `<time datetime>`, bỏ italic excerpt, SVG icon so sánh, thứ tự cuối bài |
| `src/pages/{mau-iconic,co-che,tu-dien,huong-dan}/[slug].astro` | 4 | Truyền `headings` từ `render(entry)` |
| `src/components/SourceList.astro` | 4 | break-words, py vùng bấm, text-sm |
| `src/layouts/BrandLayout.astro` | 4 | Bỏ italic excerpt; không gắn TOC (lý do: anchor heading không phản ánh 4 khối data) |
| `src/styles/global.css` | 4 | `.prose-content table` mobile an toàn |
| `src/components/Card.astro` | 5 | SVG so sánh thay emoji ⚖; bỏ link trùng "Đọc tiếp" (title là link chính); năm mono lining+tabular + title pr chống lấn; prop `compact`; focus-within |
| `src/components/WatchImage.astro` | 5 | Technical plate dùng token biến CSS; bỏ chữ-cái-đầu (không giả logo); plate `aria-hidden`; không request khi thiếu src; kim giờ mô phỏng |
| `src/components/RelatedArticles.astro` | 5 | Dùng Card compact |
| `src/layouts/CollectionListLayout.astro` | 5 | Truyền `cover_image`; nhãn filter i18n (Tất cả/Đặt lại); count `role=status` + `aria-live=polite`; reset disabled khi không có filter; nút 44px |
| `src/pages/tu-dien/index.astro` | 5 | Card compact cho tra cứu nhanh |
| `src/i18n/ui.ts` | 4+5 | +37 key vi/en (toc, filter, card_compare, hero/calibre/lộ trình/trust từ Gói 3) |

## 2. Ma trận route × viewport × theme

Ký hiệu: **P** = PASS (đã trực tiếp kiểm bản build bằng trình duyệt điều khiển), **C** = CHƯA KIỂM runtime (giới hạn công cụ), ô trống = không áp dụng.

| Route | 375 | 768 | 1024 | 1440 | Light | Dark |
|---|---|---|---|---|---|---|
| `/` | P | P | P | P | P | P |
| `/thuong-hieu` | P | — | — | P | P | P (filter + nút) |
| `/mau-iconic` | P | — | — | P | P | P (filter sau JS) |
| `/co-che` | P | — | — | P | P | P |
| `/tu-dien` | P | — | — | P | P | P |
| `/huong-dan` | P | P (TOC details) | P (rail TOC) | P | P | P |
| `/mau-iconic/rolex-submariner` | P | — | P | P | P | P |
| `/co-che/bo-thoat` | P | — | P | P | P | P |
| `/huong-dan/chon-dong-ho-dau-tien` | P | — | P | P | P | — |
| `/thuong-hieu/rolex` | P | — | — | P | P | P |
| `/so-sanh` | P | — | — | P | P | — |
| `/ve-chung-toi` | P | — | — | P | P | — |

Ghi chú: "—" ở cột 768/1024 nghĩa là khổ đó chưa tự chạy cho route này (đã kiểm ở route cùng loại — danh sách, bài đọc, trang tĩnh — mỗi loại có ít nhất 2 khổ đại diện 375/1440 và các route bài đọc có đủ 375/768/1024 cho TOC).

## 3. Bảng kiểm keyboard / accessibility (đã trực tiếp kiểm)

| Hạng mục | Kết quả | Bằng chứng |
|---|---|---|
| Skip link | PASS | Tab đầu hiện link, Enter nhảy `#main-content` (URL hash) |
| Header dropdown | PASS | Enter mở (`aria-expanded=true`), Escape đóng (`false`); trả focus: code trong handler đã chạy, Enter-reopen qua IAB không dispatch — **xác nhận máy thật còn thiếu** |
| Hamburger mobile | PASS | 1 click mở, label đổi Mở/Đóng, `aria-expanded` đúng, Escape đóng; chọn link → navigate (menu tự đóng) |
| Theme toggle | PASS | 44px, label động "Chuyển sang chế độ tối/sáng" đổi sau khi bấm (đọc attribute) |
| Search "/" + trigger | PASS | Overlay mở, input nhận focus |
| Search focus trap | PASS | 12 Tab với 10 phần tử focus được — không thoát; hành vi phản hồi sau Tab |
| Search Escape/đóng | PASS | Overlay `hidden`, input dọn; trả focus trigger (code-based + ảnh chụp) |
| Search aria-live | PASS | "Tìm thấy 42 kết quả…", rỗng "Không tìm thấy… Thử từ khóa ngắn hơn…" (đọc textContent) |
| Search xóa input | PASS | Backspace thật → kết quả 0, hint lại, status rỗng |
| Calibre Map | PASS | Click node 4 → `/co-che/bo-thoat`; 375px dùng list 5 link; Tab+Enter CTA hero |
| TOC mobile/desktop | PASS | 1024px rail hiện/details ẩn; 375px ngược; click rail → hash anchor; 8/8 anchor khớp id heading |
| Filter collection | PASS | Chọn "Lặn": count "9 / 61 bài" + aria-pressed + reset enable; Đặt lại: "61 bài" + reset disabled; hash `#theloai=lặn` khôi phục sau tải lại |
| Progress bar | PASS | `scaleX(0)` → `scaleX(0.516)` sau cuộn |
| Vùng bấm 44px | PASS | hamburger/theme/search-close/dropdown/CTA/filter (min-h-11/py) — đo qua class + root 17px |
| aria-current/expanded/pressed | PASS | Đọc attribute tại /thuong-hieu, /tu-dien, /co-che, sau từng thao tác |

## 4. Pagefind

- Build index: **193 trang bài viết** (đúng chủ đích; 13 trang danh sách/công cụ rời index).
- Truy vấn kiểm: "bộ thoát" (45 kq, đầu: /co-che/bo-thoat-dong-truc, /co-che/bo-thoat), "Submariner" (12 kq, đầu: /mau-iconic/rolex-submariner), "trữ cót" (143 kq, đầu: /co-che/tru-cot) — snippet đều là title + meta + nội dung bài, **không lẫn** menu, "Mục lục", overlay search hay footer.
- Tìm kiếm tiếng Việt không dấu vẫn hoạt động (query "lan" kiểu cũ từng đạt; "zzzkhongtontai" trả thông báo rỗng đúng).

## 5. Kết quả lệnh

- `git diff --check` — **sạch**
- `npm run check` — **OK** (scan-chars + duplicate-classes + hidden-text; 269 file)
- `npm run build` — **OK**: 206 trang, 13.190 link nội bộ không hỏng, Pagefind 193 trang

## 6. Lỗi tìm thấy và đã sửa trong gói này

| # | Lỗi | File | Cách sửa / xác nhận lại |
|---|---|---|---|
| 1 | Build vỡ `tr is not defined` sau khi thêm nhãn i18n vào filter | `CollectionListLayout.astro` | Thêm `const tr = t(lang)`; build lại sạch |
| 2 | TOC breakpoint `xl` thay vì `lg` (1024px vẫn hiện details) | `TableOfContents.astro`, `ArticleLayout.astro` | Đổi mọi `xl:` của TOC sang `lg:`; kiểm 4 route ở 1024px: rail hiện, details ẩn |
| 3 | Rail TOC có `max-h + overflow-y-auto` tạo nested scroll | `TableOfContents.astro` | Bỏ giới hạn; kiểm class thực tế không còn overflow |
| 4 | Card còn emoji ⚖ và link "Đọc tiếp" trùng URL title | `Card.astro` | SVG cân inline + chỉ báo span không link; HTML build: 1 link tới bài mỗi card |

## 7. Tồn đọng không thuộc phạm vi (không sửa trong gói này)

1. **collectorNote không render Markdown** trên 26 trang thương hiệu cũ (lỗi có sẵn từ trước chuỗi tối ưu; cần gói riêng).
2. **3 link nguồn chết** chờ địa chỉ lại từ anh Vinh: Patek `/en/company/history`, Kurono `/pages/5th-anniversary`, COSC `/chronometer-certified` (ghi CAN-KIEM-CHUNG mục 23/39/40).
3. **Quyết định biên tập chờ anh Vinh:** category `dufour-simplicity`, category Mido Multifort, `featured_rank` chưa gán bài nào.
4. Infographic cũ còn mã màu hex riêng (đã thu hẹp ở WatchImage; các infographic SVG khác chuyển dần theo kế hoạch Prompt 1).
5. i18n English: nội dung collection chỉ có tiếng Việt (scaffold `en/` trống) — ngoài phạm vi giao diện.

## 8. Kết luận: **GO**

Build qua toàn bộ; không còn lỗi chặn sử dụng nào đã biết trong phạm vi giao diện. Các mục CHƯA KIỂM (console, reduced-motion runtime, Enter-reopen dropdown trên máy thật, các ô "—" trong ma trận) đều là giới hạn công cụ kiểm của phiên này, không phải dấu hiệu lỗi — khuyến nghị anh Vinh rà bằng DevTools trên preview trong 5–10 phút trước khi công khai.
