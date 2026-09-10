# Ma trận kiểm thử trên preview thật — deploy 2 (enforcement + wasm-unsafe-eval)

- URL: `https://donghoco1-3iqxqo0ji-vinh-lam.vercel.app` · `dpl_JCLoQ4mJbsJi1Bnraetyg5GKAD7P` · target preview · Ready 22:43:02 (+07) 09/09/2026
- Trình duyệt kiểm thử: Chromium (Playwright CLI), phiên sạch, không tiện ích; truy cập qua **bypass header `x-vercel-protection-bypass` chỉ gắn cho request cùng origin** (route handler) — đã khắc phục việc gắn header toàn cục làm vỡ CORS font Google (lỗi của phương pháp kiểm thử, không phải lỗi site)
- Toàn bộ thời gian kiểm: **0 CSP violation, 0 console error, 0 request thất bại, 0 POST Formspree**

| # | Hạng mục | Điều kiện | Kết quả | Bằng chứng chính |
| --- | --- | --- | --- | --- |
| 1 | Trang chủ VI tải | 1440 sáng | ĐẠT — 200, title đúng | status/title từ page |
| 2 | Tìm kiếm VI "tourbillon" | 1440 sáng | ĐẠT — **16 kết quả**, top khớp (Greubel Double Tourbillon, Tourbillon) | đếm `.search-result` |
| 3 | Bấm mở đúng route | 1440 sáng | ĐẠT — mở `/mau-iconic/greubel-double-tourbillon/`, không 404 | URL + title đích |
| 4 | Tìm kiếm 320px | 320 tối | ĐẠT — "tourbillon": 16 kết quả, mở đúng route | đợt B3 |
| 5 | Tìm kiếm "seiko" | 1440 sáng | ĐẠT — 16 kết quả (phát hiện phụ: cần chờ ~3,5s cho lần khởi động lạnh Pagefind; lần chờ 2,5s cho 0 kết quả — sai số phép thử) | đợt phân định |
| 6 | Tìm kiếm EN "chronograph" | 1440 sáng | ĐẠT — 16 kết quả, mở `/en/glossary/chronograph/`, không 404 | đợt C |
| 7 | Theme toggle (script inline chạy) | 1440 sáng | ĐẠT — html đổi class dark ↔ sáng khi bấm | đếm class |
| 8 | Dark mode | 320 tối (xóa localStorage) | ĐẠT — html có class dark theo prefers-color-scheme | đợt B2/B3 |
| 9 | Menu mobile bằng bàn phím | 320 tối | ĐẠT — focus #menu-toggle + Enter mở #mobile-menu | đợt B |
| 10 | Không tràn ngang 320px | 320 tối | ĐẠT — scrollWidth 320 = clientWidth 320 | đợt B |
| 11 | Font Google | 1440 sáng | ĐẠT — `document.fonts.check('Be Vietnam Pro')` = true, không lỗi CORS/CSP | đợt A3 |
| 12 | Ảnh | bài cơ chế 1440 sáng | ĐẠT (trên trang không có `<img>` — infographic là SVG inline; không có ảnh hỏng) | đếm `document.images` |
| 13 | JSON-LD còn hiện diện + JSON hợp lệ | chủ VI + bài cơ chế | ĐẠT — home: 1/1 hợp lệ; bài: 3 khối; không bị CSP chặn, vẫn là dữ liệu (không chứng minh "script thực thi") | parse từng khối |
| 14 | Bài cơ chế tương tác | /co-che/perpetual-calendar 1440 sáng | ĐẠT — nút Phát `.play-btn` chuyển aria-pressed=true sau bấm | đợt D2 |
| 15 | /giai-phau tải ban đầu | 1440 sáng | ĐẠT — panel 2D hiển thị | đợt D2 |
| 16 | Tab 3D + mô hình + thao tác | 1440 sáng | ĐẠT — wrapper 3D hiện, canvas 677×518, 2 chunk (exploded3d, OrbitControls) nạp sau click | đợt D2 |
| 17 | Form VI hiển thị + validation | /lien-he 320 tối | ĐẠT — form có thật (action formspree.io/f/mrpzqaqj, 5 ô); submit trống: 3 ô :invalid "Please fill out this field." | đợt B |
| 18 | Email sai (cô lập) | /lien-he | ĐẠT — điền giả các ô khác, email không có @: typeMismatch=true, thông báo "Please include an '@'…" | đợt B2 |
| 19 | Form EN hiển thị + validation | /en/contact 1440 sáng | ĐẠT — form có, submit trống: 3 ô :invalid | đợt C |
| 20 | Không POST Formspree | mọi đợt | ĐẠT — 0 request POST formspree (chỉ validation, không submit hợp lệ) | listener POST |
| 21 | Chuyển ngôn ngữ | switcher header | ĐẠT — VI→EN (/en/) và EN→VI (/) qua `a[hreflang]` | đợt D2 |
| 22 | Analytics script | mọi trang | ĐẠT (một phần) — `/{id}/script.js` nạp thường xuyên trên preview | đợt C |
| 23 | Analytics beacon vitals | thử pagehide | CHƯA QUAN SÁT — 0 request tới vitals.vercel-insights.com trong phiên; ghi nguyên trạng, không tự thêm miền | đợt D2 |
| 24 | Console/lỗi phân loại | toàn phiên | 0 lỗi; không có lỗi extension/adblock (phiên sạch); lỗi có sẵn duy nhất ngoài CSP: Escape xóa chữ nhưng panel còn 8 mục (xem dưới) | listener console |

## Phân loại theo yêu cầu

- **CSP violation: 0** trên deploy 2. (Deploy 1 có đúng 1 violation: WASM Pagefind — đã xử lý bằng deploy 2 theo điều kiện được phép.)
- **Lỗi mạng/404: 0**. **Extension/adblock: không có** (phiên sạch, không tiện ích). **Lỗi có sẵn trước thay đổi**: (1) Escape lần 1 xóa chữ nhưng panel kết quả chưa ẩn (còn 8 mục trong DOM) — hành vi UI hiện có, ngoài phạm vi CSP, khuyến nghị ghi vào CAN-KIEM-CHUNG/hàng rào UI riêng; (2) tìm kiếm lần đầu cần ~3,5s khởi động lạnh (quan sát, chưa phải lỗi).
- **Chưa đủ bằng chứng**: beacon analytics (chưa quan sát request tới vitals.vercel-insights.com); thao tác kéo-quay mô hình 3D (đã chứng minh canvas render + chunk OrbitControls nạp, chưa mô phỏng drag).
