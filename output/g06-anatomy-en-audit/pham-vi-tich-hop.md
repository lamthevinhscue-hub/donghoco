# G06-A chặng 1 vòng sửa 1 — Phạm vi tệp chặng tích hợp đề xuất và phương án kỹ thuật (bản 2)

Đề xuất trình GPT Work duyệt (chưa sửa gì trong chặng 1). Nguyên tắc: dùng chung cấu trúc và logic, truyền ngôn ngữ tường minh; không nhân đôi engine; dữ liệu bộ phận thống nhất; metadata/hreflang/switcher/điều khiển/thông báo thuộc phạm vi dịch. **Bản 1 của tệp này bị THAY THẾ** — các mục chốt mới theo quyết định TXN-20260913-21.

## 1. Tệp dự kiến sửa/tạo (danh sách chốt, không "hoặc")

| # | Tệp | Sửa/Tạo | Lý do | Tác động checker hiện hữu |
|---|---|---|---|---|
| 1 | `src/data/anatomy-parts.ts` | **tạo** | NGUỒN DUY NHẤT 12 bộ phận hai ngôn ngữ (id, layer, icon, link, `vi{name,role}`, `en{name,role}`) — cấp cho 2D, 3D, thẻ chi tiết, tooltip; chấm dứt 3 bản lệch chữ. Câu theo bảng claim đã duyệt | Nằm trong `src/data` → thêm **đúng 1 tên** `anatomy-parts.ts` vào `SKIP_FILES` của `check-evolution-data.mjs` (khuôn `historyChapters.ts`); không mở rộng ngoại lệ khác |
| 2 | `src/components/anatomy/AnatomyExperience.astro` | **tạo** | **Component trải nghiệm dùng chung (CHỐT TÊN)** — chứa tablist 2D/3D + hai panel, nhận `lang` tường minh; cả VI lẫn EN gọi component này | `check-3d-loading-budget` mục 2 hiện tìm dynamic import trong `giai-phau.astro` — phải chuyển điểm tìm sang tệp này (mục 7) |
| 3 | `src/components/WatchExplodedView.astro` | sửa | 2D đọc `anatomy-parts.ts`; `data-role` theo lang; câu theo claim; **bỏ đường `#wev-energy`** (markup `<g id="wev-energy">` + marker `wevArrowUp` + CSS opacity/reduced-motion — chi tiết trong `cong-noi-dung-claim.md` §C5); khối chữ VI/EN ba vai (bộ truyền/thoát/điều tiết) cạnh sơ đồ | scan-chars quét component (chuỗi EN ASCII — chạy thử khi tích hợp); kiểm grep không còn `wev-energy`/`wevArrowUp` sau bỏ |
| 4 | `src/components/WatchExplodedView3D.astro` | sửa | 3D đọc `anatomy-parts.ts` (data-* trên nút — engine tự đọc); nhãn theo lang | như trên |
| 5 | `src/pages/giai-phau.astro` | sửa | wrapper VI mỏng (BaseLayout + `<AnatomyExperience lang="vi" />`); script tab/mode chuyển vào component | như mục 2 |
| 6 | `src/pages/en/anatomy.astro` | **tạo** | wrapper EN mỏng (khuôn `en/history.astro`) | `check-english-launch`: +1 mục `/en/anatomy/` vào REQUIRED_EN (61 → 62) |
| 7 | `src/i18n/contentRoutes.ts` | sửa (+1 cặp) | thêm `{ vi: '/giai-phau', en: '/en/anatomy/' }` vào STATIC_PAIRS — bật switcher thẳng, hreflang hai chiều, sitemap qua ALL_PAIRS | `check-g01`: +ca logic cặp mới 2 chiều; `astro.config` KHÔNG sửa (customPages tự nhận qua ALL_PAIRS — khuôn G05-B) |
| 8 | `src/scripts/exploded3d.ts` | sửa | **ĐA CHUỖI, không phải một điểm** — kiểm kê đầy đủ ở `ke-kien-bang-chuoi.md` §2.4: `DETAIL_DEFAULT_ROLE` (533–535), reset selectPart (562–565), nhãn toggle/mode (601–607), nhãn sau reset (611–619), aria-label canvas (98–101), thông báo lỗi (66, 91). Cách sửa: hàm nhận `lang` (`mountExploded3D(root, lang)`) + bảng chuỗi vi/en trong tệp hoặc đọc từ `anatomy-parts.ts` | `check-3d-loading-budget` mục 1 (named imports) + mục 5 (HTML ban đầu không khởi tạo engine) phải còn ĐẠT cho cả VI lẫn EN |
| 9 | `scripts/check-3d-loading-budget.mjs` | sửa | Hiện mục 2 chỉ đọc `giai-phau.astro` tìm dynamic import `../scripts/exploded3d` — sau khi logic chuyển vào `AnatomyExperience.astro`, **đổi điểm tìm** (quét component mới) và **mở rộng đối tượng bảo vệ: cả `/giai-phau/` lẫn `/en/anatomy/`** (mục 5: HTML ban đầu không preload/tải chunk 3D, không khởi tạo engine). Không xóa, không làm yếu bất kỳ mục kiểm nào (mục 1/3/4/6 giữ nguyên) | tự nó |
| 10 | `scripts/check-g06-anatomy.mjs` | **tạo** | kiểm g06 hai lớp: nguồn (12 bộ phận đủ 2 ngôn ngữ, cặp route, link đích, câu cấm "80%", "9/10", "tuyệt đối", "4 bánh răng", "12:1", "hơn 100", "30-40mm", "ngắn và dày nhất", "trái tim") + dist (2 trang đủ 12 nút/aria theo lang, switcher, hreflang, không rò chữ, EN kiểm sau tương tác/reset/Escape/lỗi/thử lại bằng trình duyệt — không chỉ HTML tĩnh); `--source-only` cho mutation; công cụ KHÔNG phụ thuộc lịch sử Git | nối `check` + `build` |
| 11 | `scripts/check-evolution-data.mjs` | sửa (+1 tên) | SKIP_FILES += `anatomy-parts.ts` (mục 1) | tự nó |
| 12 | `scripts/check-g01-navigation.mjs` | sửa | logic: +ca cặp `/giai-phau ↔ /en/anatomy/` hai chiều (englishPathFor/switcherTarget/getAlternates); dist: bỏ `/giai-phau` khỏi `exploreViOnly`, thêm ca anchor `/en/anatomy/` không nhãn VI-only (khuôn mục lịch sử G05-B); giữ kiểm âm `/so-sanh` | tự nó |
| 13 | `scripts/check-english-launch.mjs` | sửa (+1 mục) | REQUIRED_EN += `/en/anatomy/` (**61 → 62 mục khai báo**; tách khỏi số HTML EN thực — xem ma trận) | tự nó |
| 14 | `package.json` | sửa (nối kiểm) | `check` + `check-g06`; `build` + `check-g06 dist` | — |
| 15 | `src/i18n/ui.ts` | sửa (+1 dòng) | OG_IMAGE_MAP: `/en/anatomy` → ảnh OG hiện có (og-lich-su.jpg) — **dùng ảnh hiện có, không tạo ảnh mới** (quyết GPT Work) | — |

**KHÔNG dự kiến sửa:** `astro.config.mjs` (sitemap tự nhận qua ALL_PAIRS — khuôn G05-B); CSP; analytics; `public/`; bài `kinh-dong-ho.md` (không tạo bài EN mới, không thêm link kính trong đợt này).

## 2. Quyết định thiết kế chốt (theo TXN-20260913-21)

1. **Một component trải nghiệm**: `src/components/anatomy/AnatomyExperience.astro` — giữ WatchExplodedView/WatchExplodedView3D làm panel con được nó gọi; `lang` truyền tường minh xuống mọi tầng, engine `mountExploded3D(root, lang)`.
2. **Dữ liệu**: `anatomy-parts.ts` duy nhất; hai bản data-role/nút nhanh render từ nguồn này theo lang.
3. **SKIP_FILES**: chỉ thêm riêng `anatomy-parts.ts` — không mở rộng.
4. **Link bánh lắc** chuyển tới chương G04 đúng cặp: `/co-che/day-toc-banh-lac` ↔ `/en/mechanisms/balance-and-hairspring/` (thay cho `/tu-dien/day-toc-banh-lac` hiện tại — 1 dòng dữ liệu trong anatomy-parts.ts; EN dùng bản EN).
5. **Link kính**: KHÔNG thêm trong đợt này; không tạo bài EN mới để lấp chỗ trống (crystal giữ `link: null`).
6. **Ảnh OG**: dùng ảnh hiện có; không tạo ảnh mới.
7. **Ngân sách 3D**: điều kiện duyệt là "không nạp sớm 3D" (0 chunk Three trong HTML/luồng tải ban đầu của CẢ HAI bản, `check-3d` mục 5 bảo vệ) — không tự đặt yêu cầu "tổng byte trang không tăng"; tổng HTML/CSS/JS được đo và giải thích trong bằng chứng mạng, không làm điều kiện.

## 3. Rủi ro và điểm chờ quyết

- scan-chars với chuỗi EN trong component — chạy thử khi tích hợp.
- Hình C5 **đã chốt**: bỏ riêng `#wev-energy` (markup/CSS/marker — marker chỉ bỏ nếu không còn nơi dùng), giữ `#wev-axis` + hình bộ phận, khối chữ VI/EN ba vai cạnh sơ đồ; không thêm sơ đồ dòng năng lượng mới, không thay hình học/hoạt ảnh 3D. Cột "Vật liệu điển hình" bỏ cả VI/EN; nhãn kính VI "KÍNH"/EN "CRYSTAL"; vai "Điều tiết"/"Regulation", "Đóng vỏ"/"Case closure".
- Sửa câu VI theo claim làm thay đổi chữ trang VI — cần GPT Work duyệt từng cặp câu trước.
- Bảng tổng kết: **đã duyệt bỏ cột "Vật liệu điển hình" ở cả VI/EN** (TXN-20260913-25; dòng "chờ duyệt" cũ ở cuối tệp là sót đồng bộ — đính chính theo TXN-20260913-27).
