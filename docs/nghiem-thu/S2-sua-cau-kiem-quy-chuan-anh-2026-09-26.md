# BIÊN BẢN GÓI S2 — SỬA CÂU KIỂM SỐ 6 CỦA QUY CHUẨN HÌNH ẢNH

**Ngày:** 26/09/2026
**Giao dịch:** TXN-20260925-174 — danh mục DHC-GD3-20260925 v1.0.0
**Nền Git:** HEAD = `origin/main` = `57ecd2b` (`57ecd2b0f62125f6009726af21af39e98715f514`), nhánh `main`, staged = 0, tracked sửa 0 khi bắt đầu
**Căn cứ:** `docs/KE-HOACH-HOP-NHAT-GIAI-DOAN-3-2026-09-25.md` mục S2 + Phụ lục D3 + prompt GPT Work S2
**Trạng thái:** đã làm xong, CHƯA stage, CHƯA commit, CHƯA push — chờ GPT Work nghiệm thu

---

## 1. Phạm vi thực hiện

Chỉ sửa `docs/QUY-CHUAN-HINH-ANH.md` (một cụm thay thế tại B3.2 điểm 6 + một dòng trong mục Lịch sử phiên bản) và tạo biên bản này. Không sửa ảnh, `public/`, `src/`, `scripts/`, `package.json`, cấu hình, template, CSS, nội dung bài viết hay danh mục; không tạo ảnh AI; không sửa câu kiểm nào khác. Việc này chỉ thay đổi tài liệu — **không chạy build** (không có mã/nội dung website nào thay đổi).

## 2. Nội dung trước/sau

**Vị trí 1 — B3.2 điểm 6 ("Kiểm trước khi dùng"), dòng 148:**

- Trước: `…chi tiết sai thời đại; tông màu tối bằng dải navy xung quanh (ảnh sáng hơn phá dải liên tục của trang lịch sử).`
- Sau: `…chi tiết sai thời đại; bảng màu trầm, bão hòa thấp, một nguồn sáng ấm chủ đạo; đặt cạnh ảnh chiến hào v3 không lạc tông; không dùng màu rực, không phong cách hoạt hình.`

**Vị trí 2 — mục "LỊCH SỬ PHIÊN BẢN" (cuối tài liệu):** thêm đúng một dòng

`| 26/09/2026 | 2.1 (S2) | Đồng bộ quy chuẩn với năm ảnh AI bối cảnh đã được chủ dự án duyệt: sửa câu kiểm số 6 tại B3.2 |`

## 3. Kết quả tự kiểm

| Kiểm | Kết quả |
|---|---|
| Cụm cũ `tông màu tối bằng dải navy xung quanh` còn trong tài liệu | ×0 |
| Câu thay thế xuất hiện tại B3.2 điểm 6 | đúng ×1 (toàn tài liệu ×1) |
| Ba điều kiện kiểm trước đó trong điểm 6 (chữ/số lọt vào ảnh; đồng hồ vẽ quá rõ; chi tiết sai thời đại) | còn nguyên văn |
| Mục "Lịch sử phiên bản" thêm đúng một dòng 26/09/2026, đúng lý do, không tạo mục trùng | đạt (tổng 3 dòng: 2 dòng 19/09/2026 giữ nguyên + 1 dòng mới) |
| Rà `git diff` | chỉ `docs/QUY-CHUAN-HINH-ANH.md` (2 thêm/1 xóa — một cụm thay thế + một dòng lịch sử) và biên bản S2 này (mới); không tệp nào khác |
| `node scripts/scan-chars.mjs` | OK — quét 436 tệp; exit 0 |
| `git diff --check` | exit 0 |
| `npm run build` | không chạy — gói chỉ thay đổi tài liệu, không đụng mã/nội dung website (theo đúng prompt) |

Biên bản này chỉ ghi phạm vi sửa câu kiểm, câu trước/sau, kết quả tự kiểm và trạng thái Git; không liên quan đến việc tạo hay duyệt ảnh mới.

## 4. Điểm chưa giải quyết

Không có.

## 5. Trạng thái Git cuối

- Nhánh `main`; HEAD = `origin/main` = `57ecd2b` (chưa tạo commit mới).
- `git status`: 1 modified (`docs/QUY-CHUAN-HINH-ANH.md`), 0 staged; untracked 102 (101 có trước + biên bản S2 này).
- Chưa stage, chưa commit, chưa push.
