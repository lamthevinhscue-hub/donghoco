# Biên bản nghiệm thu — Chuẩn hóa ba dữ kiện đang hiển thị trên bài Rolex Submariner

- **Ngày nghiệm thu:** 30/08/2026
- **Căn cứ duy nhất:** `docs/ho-so-du-lieu-tien-hoa-rolex-submariner.md` và `CAN-KIEM-CHUNG.md` mục 48, 49, 50. Không tự nghiên cứu thêm, không mở rộng sang reference khác.
- **Kết luận: ĐẠT.** Ba dữ kiện có cờ `CẦN ƯU TIÊN KIỂM CHỨNG` đã được diễn đạt lại đúng văn bản duyệt, tracker đã chuyển ba mục thành ĐÃ GIẢI QUYẾT và cập nhật bảng tổng hợp.

## 1. Ba câu cũ có rủi ro → ba câu mới đang hiển thị

| # | Câu cũ (rủi ro) | Câu mới đang hiển thị | Nguồn tương ứng |
|---|---|---|---|
| 48 | "Rolex phản hồi bằng **Submariner** — mẫu đồng hồ lặn đầu tiên được sản xuất hàng loạt, ra mắt công chúng năm 1954." | "Rolex đáp lại bằng **Submariner** — theo Rolex, đây là đồng hồ lặn đầu tiên đạt mức chống nước 100m. Những chiếc reference 6204 sớm nhất được định ngày cuối năm 1953; Rolex công bố mẫu này tại Basel năm 1954." | Rolex chính thức (trang mẫu + Newsroom: "đồng hồ lặn đầu tiên đạt 100m"); Hodinkee Reference Points (định ngày cuối 1953 bằng serial/tem nắp sau; 1954 là thời điểm công bố); Monochrome Part 1 (ra mắt hội chợ Basel 1954) |
| 49 | "**6204** (1953) — thế hệ đầu tiên, dấu chấm gốc của mọi Submariner sau này." | "**6204** (1953) — reference đầu tiên mang chữ "Submariner" trên mặt số; những mẫu sớm nhất được định ngày cuối năm 1953." | Hodinkee Reference Points ("chiếc đầu tiên ghi chữ Submariner trên mặt số"); Monochrome Part 1 — chỉ khẳng định điều kiểm chứng được cho 6204, vì nguồn còn khác biệt về vai trò và năm của reference 6200 |
| 50 | "**5513** (1962–1989) — thế hệ cổ điển được sưu tầm nhiều nhất." | "**5513** (1962–1989) — bản không lịch, không chứng nhận chronometer, sản xuất liền 27 năm." | Monochrome Part 2 + Hodinkee Reference Points (đều ghi 5513 ra 1962, không chứng nhận chronometer, nghỉ sau 27 năm) — bỏ cụm xếp hạng không có nguồn |

Lưu ý render: dấu `"` thẳng trong nguồn markdown được Astro (smartypants) xuất thành `“ ”` cong trên trang — đúng quy ước hiển thị chung của site, không đổi nội dung.

## 2. Nguồn và frontmatter

- Giữ nguyên 3 nguồn cũ (Rolex — Submariner, Rolex — Lịch sử thương hiệu, Rolex Newsroom), bổ sung đúng 3 nguồn: Hodinkee — Rolex Submariner Reference Points; Monochrome — History of the Rolex Submariner, Part 1; Monochrome — Part 2.
- Thêm `updated: "2026-08-30"` → trang hiển thị "Cập nhật: 30 tháng 8, 2026".
- Khối "Nguồn tham khảo" trên trang: 6 mục, 6 URL riêng biệt, không trùng (kiểm bằng script + grep dist).

## 3. Tracker và hồ sơ trạng thái

- `CAN-KIEM-CHUNG.md`: mục 48, 49, 50 → **ĐÃ GIẢI QUYẾT** (giữ nguyên lịch sử lý do ban đầu, ghi rõ câu mới và nguồn căn cứ, gỡ cờ `CẦN ƯU TIÊN KIỂM CHỨNG`). Bảng tổng hợp: **48 mục** nội dung — ĐÃ GIẢI QUYẾT **15** (thêm 48, 49, 50), ĐÃ XỬ LÝ AN TOÀN **30**, CHỜ NGUỒN **3**. Phần cờ ưu tiên còn đúng **ba liên kết nguồn chết**: Patek Philippe, COSC, Kurono Tokyo — không tự thay URL.
- `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md`: ghi rõ ba dữ kiện 48–50 đã diễn đạt lại theo nguồn ngày 30/08/2026; ưu tiên kế tiếp vẫn là ba liên kết nguồn chết, **tracker chưa hoàn tất**.

## 4. Cố ý chưa đụng tới

- Reference **6200, 6538, 14060/14060M** — vẫn nằm trong bảng "Cần kiểm chứng" của hồ sơ dữ liệu, không đưa vào bài.
- Mọi nhận định **giá trị sưu tầm / đầu tư / độ hiếm** — không thêm.
- **Ba liên kết nguồn chết** (Patek, COSC, Kurono Tokyo) — chưa thay URL, chờ anh quyết.
- Nội dung khác của bài (đặc điểm thiết kế, bộ máy, vị trí lịch sử) và **sơ đồ tiến hóa 8 mốc** — không đụng.

## 5. Kết quả kiểm tra

- `npm run check` — ĐẠT toàn bộ.
- `npm run build` — 218 trang, Complete!, 14.234 link nội bộ, 0 link hỏng.
- Dist: 0 kết quả cho "đầu tiên được sản xuất hàng loạt" / "dấu chấm gốc" / "được sưu tầm nhiều nhất"; 1 kết quả cho mỗi câu mới.
- Trang thật (Playwright, 1440×900 và 375×812, sáng/tối): ba câu mới hiển thị đúng; khối nguồn đủ 6; sơ đồ 8 mốc nguyên vẹn (8 nút, đúng reference, bấm chuyển thẻ bình thường); 0px tràn ngang ở 375; console không có lỗi mới (trừ 404 cố hữu favicon + Vercel analytics).
- `git diff` rà lại: chỉ `rolex-submariner.md`, `CAN-KIEM-CHUNG.md`, `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` và biên bản này — đúng phạm vi.

## 6. Chưa kiểm

- Chưa nghiệm thu production thật (kiểm ở mức preview local — đúng giới hạn các biên bản trước).
- Chưa mở lại từng URL nguồn ngoài trên mạng thật trong đợt này (các URL đã xác nhận sống trong đợt rà nguồn 30/08/2026).
