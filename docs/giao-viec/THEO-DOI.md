# THEO DÕI THI CÔNG — Kế hoạch hoàn thiện kienthucdonghoco.vn (tháng 10–12/2026)

**Cập nhật:** 11/10/2026
**Quy tắc áp dụng:** `docs/giao-viec/00-DIEU-PHOI-TONG.md` mục 2 và 3; quyết định anh Vinh ở mục 0 kế hoạch cuối có hiệu lực cao nhất.
**Vòng đời một gói:** Đang chuẩn bị → GPT Work tạo câu lệnh → Đang thi công → biên bản → Chờ nghiệm thu → GPT Work ĐẠT → commit, push, kiểm trang thật → Hoàn tất. Gặp điểm cần anh quyết: Dừng chờ anh.
**Nguyên tắc commit:** chỉ commit khi GPT Work nghiệm thu ĐẠT và cho phép; stage đúng phạm vi tệp của gói; không commit đè việc đang dở; tệp điều phối (`docs/giao-viec/`, biên bản) chỉ commit khi câu lệnh của gói quy định.

Trạng thái dùng: Chưa mở / Đang chuẩn bị / Đang thi công / Chờ nghiệm thu / Yêu cầu sửa / Hoàn tất / Dừng chờ anh.

## Đợt 1 — tuần 12–18/10/2026

| Mã | Việc | Trạng thái | Biên bản | Nghiệm thu GPT Work | Commit | Ngày hoàn tất | Ghi chú |
|---|---|---|---|---|---|---|---|
| E1 | Đăng ký kế hoạch hiện hành | **Chờ nghiệm thu** (vòng sửa 1 xong) | [Biên bản E1](../nghiem-thu/E1-dang-ky-ke-hoach-hien-hanh-2026-10-11.md) | — | — | — | Câu lệnh TXN-20261011-01: đúng 6 tệp; vòng 1 CHƯA ĐẠT (TXN-02: nhãn trước duyệt D4 + số phép kiểm biên bản) đã sửa xong; CHI-MUC sửa dở từ phiên trước được tiếp nhận làm nền |
| C0 | Sửa phạm vi bộ kiểm tra (`tsconfig.json` loại `output`) | Chưa mở | — | — | — | — | |
| B1 + B2 | Sửa 8 lỗi chuyên môn, bỏ biểu tượng ✅⚠️❌💡 | Chưa mở | — | — | — | — | Đầu vào `dot-1/B1-B2-sua-loi-chuyen-mon.md` |
| B7 | Xuất bản 3 bài "Hiểu đúng" | Chưa mở | — | — | — | — | Đầu vào `dot-1/B7-hieu-dung/` (3 tệp); bản EN do GLM dịch |
| A1 | Đẩy lập chỉ mục (15 địa chỉ) | Chưa mở | — | — | — | — | GPT thao tác Search Console (anh cho phép 11/10); GLM chuyển danh sách |
| A2 | Bật Speed Insights | Chưa mở | — | — | — | — | |
| A3 | Biểu tượng trang ICO, PNG, iPhone | Chưa mở | — | — | — | — | |
| C1 (bước 1) | Khảo sát giảm dung lượng video | Chưa mở | — | — | — | — | Chỉ miễn phí; **dừng chờ anh duyệt** trước bước 2 |
| Hồ sơ | Hai việc tồn đợt ảnh chia sẻ | Chưa mở | — | — | — | — | Commit `6e60c37` đã có; chỉ xác minh rồi ghi Hoàn tất |

## Đợt 2 — 19/10 đến 1/11/2026

| Mã | Việc | Trạng thái | Ghi chú |
|---|---|---|---|
| A4 | Mô tả trang chủ | Chưa mở | Đầu vào `dot-1/A1-A4-lap-chi-muc-va-mo-ta.md` |
| A1 (đợt 2) | Lập chỉ mục trang mới sửa | Chưa mở | Sau B1, B7 |
| C1 (bước 2) | Thi công phương án video | Chưa mở | Chỉ sau anh duyệt báo cáo bước 1 |
| C2 | Video "học được" (phụ đề, lời đọc) | Chưa mở | Sau C1 |
| C3 | Sửa lọc tô sáng ô tìm kiếm | Chưa mở | `src/scripts/searchCore.ts` |
| C4 | Gộp trang từ điển trùng | Chưa mở | |
| C5 | Kiểm tra tự động trên GitHub | Chưa mở | |
| C7 | Thay ảnh 1929 | Chưa mở | Chờ anh tạo ảnh mới |
| B3 (đợt 1–2) | Kiến thức video vào bài | Chưa mở | |
| B4 | Vòng đóng kiểm chứng hằng tuần | Chưa mở | |
| D10 | Nhật ký sai số dễ tìm | Chưa mở | |
| E3 | Khép việc treo (G03, V4, trang 374 KB) | Chưa mở | |
| D4 (đợt 1) | Dịch 8–10 thương hiệu đầu | Chưa mở | Sau B1 |

## Đợt 3 — 2/11 đến 22/11/2026

B3 (đợt 3), B6, B8 (lô 1), D4 (đợt 2–4), D9, D2 (1–2 bài). Trạng thái: Chưa mở — mở chi tiết khi tới đợt.

## Đợt 4 — tháng 12/2026

D4 (còn lại, đủ 73/73), B8 (các lô tiếp), A1 (đọc lại Search Console). Trạng thái: Chưa mở.

## Cân nhắc — hỏi anh khi tới đợt 3

B5, C6, D3, D5, D11.

## Hoãn theo quyết định anh 11/10

A5, A6, A7, D1, D6, D7, D8, C8; mẫu tiêu biểu chưa dịch tiếng Anh.

## Nhật ký tin nhắn GPT Work (chống gửi trùng)

| Ngày | TXN | Gói | Nội dung |
|---|---|---|---|
| 11/10 | TXN-20261011-01 | E1 | Thông báo kế hoạch mới; yêu cầu tạo câu lệnh thi công E1 |
