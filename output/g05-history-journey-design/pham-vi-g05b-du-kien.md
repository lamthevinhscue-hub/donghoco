# G05-A — Phạm vi G05-B dự kiến (danh sách tệp/route, chưa duyệt)

- Giao dịch TXN-20260913-01, nền `2f322dc`. Đây chỉ là danh sách dự kiến để anh Vinh ước lượng; G05-B sẽ có prompt riêng sau khi hồ sơ G05-A được duyệt. Không tệp src/ nào bị sửa trong chặng A này.

## 1. Route và trang

| Hành động | Tệp/route | Lý do |
|---|---|---|
| Sửa | `src/pages/lich-su.astro` | Thêm 6 section chương (h2 + câu hỏi + câu giới hạn) + nhóm "Chương" trong nav desktop/mobile; giữ nguyên milestone-card, anchor, lọc, reveal |
| Tạo | `src/pages/en/history.astro` | Bản EN của trang lịch sử (route đề xuất `/en/history/`) |
| Tạo (khuyến nghị) | `src/components/history/HistoryTimeline.astro` (hoặc tên tương tự) | Khuôn dùng chung cho VI/EN nhận `lang` + bản dịch — theo khuôn "template chung + wrapper mỏng" của English launch pack; 2 wrapper trang mỏng giữ title/description từng ngôn ngữ |
| Giữ nguyên | `src/pages/index.astro` (trang chủ VI) | Dải "Dòng chảy lịch sử" đã có — không đổi hero, không thay khối hiện hành. Khi cặp route tồn tại, `localizedPath('/lich-su','en')` tự trả `/en/history/` (trang EN dùng chung index.astro bị `en/index.astro` che, không phát sinh hiển thị mới) |
| Sửa nhỏ | `src/pages/en/index.astro` | Thêm lối vào lịch sử EN (dải 6 mốc ngắn sau khu Reading paths, hoặc một hàng link chương) — không thay hero |

## 2. Dữ liệu, dịch thuật, điều hướng

| Hành động | Tệp | Nội dung |
|---|---|---|
| Sửa | `src/data/timeline.json` | Thêm khối dịch EN cấp mốc: `title_en`, `description_en`, `dayType_en`, `limit_en` (chỉ 19 mốc có), `claimScope_en`, `alt_en`, `timeLabel_en` (chỉ mốc silicon-revival cần "2013–present"; các nhãn số như `~1510`, `1657–1675` giữ nguyên). Trường VI giữ nguyên — G2-* không đổi kỳ vọng phần VI. (Phương án tệp song song `timeline.en.json` bị loại: một nguồn sự thật, tránh lệch thứ tự) |
| Sửa | `src/i18n/contentRoutes.ts` | Thêm đúng 1 cặp `{ vi: '/lich-su', en: '/en/history/' }` vào INDEX_PAIRS hoặc STATIC_PAIRS (quyết định cuối theo khuôn hiện hành) |
| Sửa | `src/i18n/ui.ts` (hoặc nhãn nằm trong khuôn trang) | Nhãn chương, nhãn lớp, nhãn mức chứng minh 6 loại, "Đọc chi tiết →", trạng thái chưa dịch — bản EN |
| Sửa | Cấu hình sitemap | Thêm `/en/history/` theo khuôn customPages cho route i18n (English launch pack đã có khuôn) |
| Tự động | Header/nav + switcher | Nhãn "Vietnamese only" cho mục lịch sử tự biến mất khi `switcherTarget` thấy cặp dịch (cơ chế hiện hành dựa trên contentRoutes) — kiểm, không sửa logic |

## 3. hreflang, nguồn, liên kết

- Trang lịch sử mới có cặp: BaseLayout phải phát đủ 3 thẻ `hreflang="vi"`, `hreflang="en"`, `x-default` cho `/lich-su` ↔ `/en/history/` (cơ chế hiện hành qua `getAlternates`).
- 25 link `readMore` VI giữ nguyên; bản EN của từng thẻ: 12 mốc trỏ cặp EN thật, 13 mốc hiển thị trạng thái "chưa có bản tiếng Anh" (kèm link bài VI), 3 mốc hiển thị "chưa có bài đọc thêm".
- Nguồn 52 link: giữ nguyên URL, tên riêng trong `name` và ngày kiểm; **dịch phần mô tả tiếng Việt trong `name` ở bản EN** — hiện đúng 4/52 name có phần này: blancpain "(thông cáo hãng)", patek-first-wristwatch "(mục Bracelets)", fifty-fathoms "số 13", patek-nautilus "Thông cáo 40 năm Nautilus". Không tự ghi ngày kiểm mới. `sources[].proves` là hồ sơ nguồn, không phải nội dung hiển thị (`lich-su.astro` chỉ render name/url/checked) — giữ nguyên, không mở UI mới cho proves; nếu tương lai hiển thị thì dịch khi đó.
- Không tạo URL EN giả cho bài chưa dịch (luật G01: `englishPathFor` trả undefined thì không chế).

## 4. Bộ kiểm bị ảnh hưởng và thay đổi kỳ vọng

| Bộ kiểm | Thay đổi kỳ vọng dự kiến |
|---|---|
| `check-g01-navigation.mjs` | Các ca hiện tại kỳ vọng `/lich-su` KHÔNG có cặp (englishPathFor = undefined, nhãn "Vietnamese only", `data-lang-switch="untranslated"`, noscript) phải đảo thành: có cặp `/en/history/`, hreflang đủ 3, switcher dịch được. Cập nhật đúng số ca, chạy đạt |
| `check-g02-history-timeline.mjs` | 16 ca hiện hành giữ nguyên phần VI; thêm kỳ vọng lớp dist EN (28 card EN, 52 nguồn, 19 "Limit", nhãn "No further reading" / trạng thái chưa dịch đúng số) — nếu khuôn script cho phép thêm ca EN; số ca tăng, ghi rõ |
| `check-english-launch.mjs` | Route `/en/history/` vào danh sách route EN bắt buộc (hiện 60 → 61) |
| `check-g04-balance-chapter.mjs` | Không đổi logic; lưu ý G4-7 hiện chặn chữ VI trong trang EN — trang lịch sử EN là trang mới, không nằm trong phạm vi G4-5/G4-7 (chỉ 2 route chương). Xác nhận không va chạm |
| Check ảnh/khác | Nếu duyệt T1 (ảnh AI mới): thêm luật ảnh ≤150 KB + nhãn chú thích, theo khuôn G04 |

## 5. Giữ các năng lực hiện hành trong G05-B

- **Bộ lọc, nhảy mốc, danh sách:** nguyên trạng; chương chỉ thêm section + nhóm nav — không khóa cuộn, không chạy hàng loạt hiệu ứng mới.
- **No-JS:** toàn bộ chương là markup tĩnh; lọc và nav vẫn là lớp nâng cao hiện hành (hoạt động bằng JS, nội dung không phụ thuộc).
- **Bàn phím:** chip chương và nút nav chương là `button`/`a` tập trung được; thứ tự tab tự nhiên theo DOM.
- **Reduced-motion:** không thêm chuyển động nào; reveal hiện hành đã tôn trọng `prefers-reduced-motion`.
- **Nếu có chuyển động mới** (không dự kiến): bắt buộc dừng ngoài viewport/tab ẩn theo khuôn G04.

## 6. Rủi ro sticky/scroll hiện hữu — GHI RIÊNG, chưa phải hạng mục sửa

1. Thanh lọc `sticky top-16` + nav phải `sticky top-32` + (mới) anchor chương: cuộn tới `#chuong-cX` có thể bị đề mục trốn dưới thanh lọc — cần `scroll-margin-top` cho section chương. G05-B tính trong phạm vi trang lịch sử, không đụng sticky khác.
2. Anchor `#milestone-{i}` hiện hành đã có hành vi cuộn riêng; thêm section giữa có thể đổi offset của jump — kiểm lại 28 anchor sau khi chèn.
3. Switcher giữ hash khi đổi ngôn ngữ (từ `#milestone-12` sang `/en/history/#milestone-12`): hành vi đề nghị — giữ nguyên hash vì mọi anchor là ID chung hai ngôn ngữ; hash trỏ ID không tồn tại ở bản đích thì bỏ hash về đầu trang (chi tiết storyboard mục 2). Cơ chế hiện hành CHƯA quan sát; G05-B kiểm và dựng theo đề nghị này — ghi trong ma trận M3-4, không sửa âm thầm.
4. Trang dài 28 thẻ + 6 đề mục: đo lại chiều cao/scroll spy (nhóm thập niên) sau khi chèn section để nav không nhảy nhầm.

Không mục nào ở mục 6 được coi là đã duyệt — chỉ báo cáo kèm ma trận G05-B.
