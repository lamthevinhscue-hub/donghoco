# G06-A chặng 1 vòng sửa 1 — Bảng link VI/EN của trang giải phẫu + phương án khi dịch (bản 2)

Kiểm bởi `kiem-link.mjs` → `kiem-link-ket-qua.json` (kiểm nội bộ trên dist — route tồn tại; KHÔNG phải kiểm HTTP nguồn ngoài). Ngày kiểm: 2026-09-13, dist nền `f42c11e`. **Cập nhật TXN-20260913-21: quyết link bánh lắc sang chương G04; kính không thêm link trong đợt này (§3).**

## 1. Link phát sinh từ trang (9 đích, tất cả có cặp EN thật)

| Nơi dùng | Route VI | Route EN (cặp trong contentRoutes) | Tồn tại dist VI | Tồn tại dist EN |
|---|---|---|---|---|
| detail-link kim giây + bộ thoát; CTA "Bộ thoát (trái tim)" | `/co-che/bo-thoat` | `/en/mechanisms/escapement/` | ĐẠT | ĐẠT |
| detail-link kim phút, kim giờ, bánh răng trung gian | `/co-che/chuyen-dong-co` | `/en/mechanisms/how-a-mechanical-watch-works/` | ĐẠT | ĐẠT |
| detail-link thùng cót; CTA "Thùng cót" | `/co-che/tru-cot` | `/en/mechanisms/power-reserve/` | ĐẠT | ĐẠT |
| detail-link bánh lắc + dây tóc | `/tu-dien/day-toc-banh-lac` | `/en/glossary/hairspring/` | ĐẠT | ĐẠT |
| detail-link mặt số phụ | `/tu-dien/perpetual-calendar` | `/en/glossary/perpetual-calendar/` | ĐẠT | ĐẠT |
| detail-link rotor | `/co-che/len-day-tu-dong` | `/en/mechanisms/automatic-winding/` | ĐẠT | ĐẠT |
| CTA "Tất cả cơ chế →" | `/co-che` | `/en/mechanisms/` | ĐẠT | ĐẠT |

Kết luận: **mọi link phát sinh hiện tại đều có bản EN thật** — bản EN trang giải phẫu dùng nguyên cặp EN, không cần nhãn "Vietnamese only" cho link nào.

## 2. Quy tắc link áp dụng cho bản EN (theo khung giao việc)

1. Link có bản EN thật → dùng bản EN (toàn bộ 9 đích hiện tại thuộc nhóm này).
2. Chưa có bản EN → link VI thật kèm nhãn rõ (khuôn "Vietnamese only" như menu Explore) — hiện chưa phát sinh.
3. Chưa có bài → trạng thái trung tính (thẻ chi tiết ẩn link `detail-link.hidden`) — không tạo link giả.

## 3. Quyết định chốt (TXN-20260913-21) — không sửa trong chặng 1

- **Bánh lắc**: chuyển link sang chương G04 đúng cặp — `/co-che/day-toc-banh-lac` ↔ `/en/mechanisms/balance-and-hairspring/` (thay `/tu-dien/day-toc-banh-lac` hiện tại). Áp dụng khi gộp nguồn dữ liệu ở chặng tích hợp (1 dòng trong `anatomy-parts.ts`); bảng §1 ghi hiện trạng trước khi đổi.
- **Kính (crystal)**: giữ `link: null` trong đợt này — bài `/co-che/kinh-dong-ho` có VI (tồn tại dist) nhưng **chưa có cặp EN**; KHÔNG tạo bài EN mới để lấp chỗ trống; KHÔNG thêm khuôn nhãn "Vietnamese only" cho detail-link trong đợt này.
- Quy tắc chung giữ nguyên: có bản EN thật → dùng EN; chưa có → link VI kèm nhãn rõ; chưa có bài → trạng thái ẩn, không link giả.
