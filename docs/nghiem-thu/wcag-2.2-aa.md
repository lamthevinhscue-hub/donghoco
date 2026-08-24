# Nghiệm thu khả năng tiếp cận WCAG 2.2 AA

Ngày kiểm tra: 2026-08-24
Phạm vi: toàn bộ 207 route build của kienthucdonghoco.vn (bản build local `dist/`).

## 1. Phạm vi route đã rà

- Trang chủ `/`
- Danh sách + 68 trang thương hiệu `/thuong-hieu/*`
- Danh sách + 18 trang mẫu iconic `/mau-iconic/*`
- Danh sách + 18 bài cơ chế `/co-che/*`
- 33 thuật ngữ từ điển `/tu-dien/*`
- 13 bài hướng dẫn `/huong-dan/*`
- Giải phẫu 2D/3D `/giai-phau`
- Dòng thời gian `/lich-su`, so sánh `/so-sanh`
- Liên hệ `/lien-he`, bản quyền `/ban-quyen`, giới thiệu `/ve-chung-toi`
- Khả năng tiếp cận `/kha-nang-tiep-can` (mới)
- 404

Kết quả quét tĩnh toàn bộ route: 207/207 trang có `<title>` + `lang="vi"` + đúng 1 `<h1>` + đủ landmark `header/main/footer`; 28 ảnh có `alt`; không còn lỗi cấu trúc.

## 2. Script tự động (tích hợp `npm run check` / `npm run check:wcag`)

| Script | Kiểm tra | Ngưỡng |
|---|---|---|
| `check-color-contrast.mjs` | 35 cặp token màu sáng/tối đo theo công thức WCAG (kể cả nền panel thật có pha alpha) | chữ ≥ 4.5:1, viền/focus ≥ 3:1 |
| `check-keyboard-accessibility.mjs` | skip link, main tabindex, aria-controls menu/dialog, focus trap, outline-none phải có thay thế | exit 1 nếu lỗi |
| `check-semantic-accessibility.mjs` | 1 h1/trang, heading không nhảy cấp, input có label, form required có sr-text + lỗi nối aria-describedby, thẻ đóng khớp | exit 1 nếu lỗi |
| `check-motion-accessibility.mjs` | prefers-reduced-motion toàn cục + từng component, play/pause + aria-pressed, đủ nút thay thế kéo 3D, SVG phân loại trang trí/thông tin | exit 1 nếu lỗi |
| `check-content-accessibility.mjs` | img alt (kể cả cấm tên file/"ảnh"), viewport không chặn zoom, overflow-hidden + cao cố định, link nhãn chung chung | exit 1 nếu lỗi |

## 3. Checklist thủ công đã thực hiện trên trình duyệt thật (Playwright Chromium)

- [x] Skip link: Tab đầu tiên hiện, Enter nhảy `#main-content`
- [x] Menu desktop: Enter mở + focus link đầu; Arrow/Home/End di chuyển; Escape đóng + trả focus nút; Tab xuyên qua không trap
- [x] Menu mobile: Enter mở + focus link đầu; Escape trả focus hamburger
- [x] Search dialog: `/` mở/focus inline theo viewport; trap Tab; Escape trả focus trigger; aria-expanded đúng
- [x] Form liên hệ: submit trống → focus field lỗi đầu + text lỗi + aria-invalid; sửa → lỗi tự xoá
- [x] Reduced motion (`emulateMedia` thật): 3D tĩnh, nút "Chuyển động 3D" `aria-pressed=false`; 2D stagger = 0ms
- [x] 3D: 4 nút xoay/phóng to/thu nhỏ (47px) hoạt động không lỗi JS; quick-pick aria-pressed
- [x] Reflow: 320px + text-spacing WCAG (line-height 1.5, letter 0.12em, word 0.16em, p 2em) — 14 trang đại diện không cuộn ngang (bảng dữ liệu cuộn trong wrapper riêng)
- [x] Zoom 200% (viewport 640): không cuộn ngang
- [x] Toggle sáng/tối nhiều lần: không giữ màu chế trước
- [x] Dark mode 8 trang: 0 nền trắng loá

## 4. Browser / viewport nên kiểm tra lại khi thay đổi giao diện

- Desktop: Chrome/Firefox 1440×900 — light + dark
- Mobile: 375×812 và 320×800 (reflow + touch)
- Zoom 200% (Ctrl/Cmd +)
- `prefers-reduced-motion: reduce` bật/tắt
- NVDA + Chrome/Firefox hoặc VoiceOver + Safari (xem giới hạn §5)

## 5. Giới hạn đã biết

1. **Chưa kiểm tra bằng trình đọc màn hình thật** (NVDA/VoiceOver) trên máy này — các quyết định ARIA dựa trên đặc tả WCAG/ARIA APG và kiểm tự động. Cần một phiên NVDA + Chrome nghe thực tế: heading, landmark, skip link, menu, dialog, lỗi form, legend sr-only, panel aria-live.
2. 89 SVG placeholder ảnh (guilloché loading skeleton) ẩn theo **div cha** `aria-hidden` — đúng chuẩn nhưng công cụ quét tĩnh đơn giản không xét cha có thể báo false positive.
3. Bảng Markdown đã bọc wrapper cuộn tại build (rehype) — bảng do JS render (`/so-sanh`) đã có `th scope` runtime nhưng nên xem lại thị giác trên mobile thật.
4. Bản tiếng Anh chỉ là khung i18n (locale `en` trống) — trang `/kha-nang-tiep-can` có sẵn bản en cho ngày kích hoạt.
5. Hiệu ứng fade 150ms trước khi focus vào link dropdown là chủ đích (menu hiện mượt); người bấm phím nhanh liên tục vẫn ổn vì focus có nhắm đích.

## 6. Tiêu chí sẵn sàng phát hành

- `npm run check` (gồm 6 script) exit 0
- `npm run build` không lỗi, không link nội bộ hỏng
- Quét 206+ route: title/lang/h1/landmark/alt đạt (script đính kèm trong biên bản phiên làm việc)
- Không console error nghiêm trọng trên 13 trang đại diện (chỉ còn favicon + Vercel Insights 404 khi preview local — không có trên production)
- Quyết định phát hành cuối cùng thuộc người phụ trách nội dung sau khi nghe thử trình đọc màn hình thật (§5.1).
