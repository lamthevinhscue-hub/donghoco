# Biên bản U3 — hồ sơ nguồn đợt 2 loạt "Hiểu đúng"

- Giao dịch: TXN-20260926-248 (danh mục DHC-GD3-20260925 v1.0.0) — hồ sơ nguồn, ngày thực hiện 2026-09-26.
- Nền: xác nhận trước khi làm — HEAD = origin/main = `e0705c3`, staged 0, tracked sửa 0 (git log -5: e0705c3 → 4ba159c); untracked có trước giữ nguyên.

## Phạm vi thực hiện

- Chỉ tạo 2 tệp tài liệu: `docs/ho-so-nguon-U3-hieu-dung-dot-2-2026-09-26.md` + biên bản này; công cụ tự kiểm, log, bằng chứng tại `output/u3-myths-source-audit/`.
- KHÔNG đụng `src/`, `public/`, `scripts/`, `package.json`, `vercel.json`, `src/i18n/`, schema, route; KHÔNG tạo bài VI/EN, không gắn `hieu-dung`, không đổi hub `/hieu-dung` hoặc `/en/myths/`; không giá/đầu tư/hàng xách tay/thuế/nhập khẩu; không mở gói khác.

## Kết quả 5 chủ đề

- **3 SẴN SÀNG (chủ đề 2, 4, 5) — 2 CẦN THU HẸP (chủ đề 1, 3)** — 0 GỘP — 0 CHƯA ĐỦ NGUỒN. Không ép đủ năm chủ đề.
- Chủ đề 1 CẦN THU HẸP: 8 URL dữ kiện nền có nguồn (FHH định nghĩa ×4, NOMOS, ETA, Sellita ×2) nhưng nút trả lời myth (kết luận so sánh in-house vs mua ngoài) không có câu nguyên văn trực tiếp — cả hai hướng đều chỉ là định nghĩa trung tính hoặc marketing bên có lợi ích.
- Chủ đề 3 CẦN THU HẸP: khung giờ cấm CÓ trong nguồn nhưng chỉ cho 1 calibre cụ thể (Seiko 6L37: CAUTION 21:00–01:00 kèm hậu quả); Omega FAQ KHÔNG có cảnh báo (dùng làm minh chứng "từng hãng khác nhau"); đề cấm suy khung giờ chung — chỉ viết được dạng định danh.
- Chủ đề 2 SẴN SÀNG: COSC −4/+6 (2 URL), "Even if a watch gained 6 seconds every day… remarkable regularity" (COSC FAQ), isochronism FHH, Ferdinand Berthoud (sai số theo vị trí vốn có), Grand Seiko (bảng lab +5/−3 vs đeo thường +10/−1).
- Chủ đề 4 SẴN SÀNG: Seiko 5R65 ("self-winding watch equipped with a manual winding mechanism"; khuyên lên tay khi mới đeo đồng hồ dừng; 5 vòng crown ≈ 10 giờ) + Omega FAQ + FHH automatic/rotor.
- Chủ đề 5 SẴN SÀNG: COSC ×3 (độc lập 1973; từng movement 12–20 ngày, 5 vị trí, 3 nhiệt độ; −4/+6; 2 cấp — cấp gốc "Generally tested on the movement") + METAS (watch head; điều kiện vào movement "chronometer" theo ISO 3159).

## Mâu thuẫn/điểm đáng lưu ý

- Không có mâu thuẫn chéo giữa nguồn như U2 (30 m). Điểm nhấn trung thực: cả hai chủ đề CẦN THU HẸP đều do **nút trả lời myth** thiếu nguồn trực tiếp dù dữ kiện nền đủ — đã liệt kê rõ trong hồ sơ để chờ nguồn bổ sung.
- FHH perpetual-calendar glossary: shell tầng HTML (74 byte) nhưng web_reader đọc được toàn văn — nội dung chỉ về lịch vạn niên, KHÔNG chứng minh giờ cấm → không-làm-nguồn (không dùng lệnh phủ định "trang rỗng" trong hồ sơ).

## Lý do không chạy `npm run check` / `npm run build`

U3 chỉ tạo hồ sơ/bằng chứng — không đụng `src/`, `public/`, `scripts/`, `package.json` — check/build không phản ánh thay đổi tài liệu trong `docs/`.

## Kiểm tra đã chạy

- Checker `output/u3-myths-source-audit/kiem-u3.mjs` — kết quả trong `kiem-u3.log.txt`: đủ 5 chủ đề + trạng thái; tổng cứng 3 SẴN SÀNG / 2 CẦN THU HẸP / 0 / 0; R2c mỗi chủ đề SẴN SÀNG ≥2 URL nguồn trong khối (ranh giới khối cắt M(n)→M(n+1) — bài học U2); 22 URL khớp 2 danh sách (21 nguồn HTTPS + 1 không-làm-nguồn, kiểm cứng R3d); truy cập lại 21 URL nguồn (2xx, hoặc đúng ngoại lệ allowlist hẹp theo từng URL + mã + bằng chứng ghi trong hồ sơ; lỗi mạng/timeout ngoài allowlist luôn FAIL); 12 route nội bộ tồn tại trong dist (gồm 3 route EN glossary); bảng chống trùng 5 dòng + đồng bộ trạng thái với chi tiết; 2 tệp docs UTF-8 no BOM + newline cuối.
- Mutation ngoài repo (bản sao `D:/u3-mut`): bỏ nguồn khỏi chủ đề 2 SẴN SÀNG (bỏ 4/5, còn 1) → checker phải fail đúng `M2 chỉ có 1 URL nguồn trong khối`; hoàn nguyên byte-đối-byte (SHA-256 khớp) rồi chạy lại đạt — log `kiem-u3-mutation.log.txt`.
- `node scripts/scan-chars.mjs`, `git diff --check`, `git diff --cached --check` — kết quả ghi dưới (báo cáo).

## Trạng thái Git cuối vòng

- 2 tệp docs mới (untracked) + `output/u3-myths-source-audit/` (nội bộ, không commit); tracked sửa 0; staged 0; chưa commit, chưa push — DỪNG chờ GPT Work nghiệm thu.
