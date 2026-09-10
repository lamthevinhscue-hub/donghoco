# README — P3.3 chặng A: kiểm kê và hồi quy script kiểm cụm (TXN-20260910-26; hoàn tất TXN-20260910-38)

Ngày chạy: 10/09/2026. Nền: `b2a4ba0`. Build baseline 14:10:37 → 14:12:35 (+07) exit 0 (286 trang, Pagefind 286; log: log-build-chi-tiet.txt). Build chốt 17:53 exit 0 + `npm run check:types` 18:01 exit 0 (0 lỗi, 0 cảnh báo, **3 hint** thuộc tệp `.cjs` gói P3.2 đã commit `b2a4ba0` — trạng thái đường cơ sở hiện hành, không phải 0/0/0; log: log-chot-cuoi-cung.txt). Mã website không đổi trong suốt gói → không build lại.

## Trình tự tái lập

```bash
npm run build                                                  # đường cơ sở (chứa npm run check)
node output/p3.3-cluster-script-audit/tao-sandbox.cjs          # 1. dựng sandbox qua module an toàn dùng chung
node output/p3.3-cluster-script-audit/tu-kiem-driver.cjs       # 2. TỰ KIỂM driver — 4 phép thử (phải 4/4 ĐẠT trước khi chốt)
node output/p3.3-cluster-script-audit/kiem-thu-hoi-quy.cjs     # 3. chạy chốt 35 ca từ nền sạch (exit 0 khi 35/35)
```

Cả `tao-sandbox.cjs` và driver dùng **một cơ chế kiểm tra an toàn duy nhất** qua `kiem-tra-an-toan.cjs`: xác minh repo nền, khóa sandbox vào `output/p3.3-cluster-script-audit/sandbox`, từ chối đường dẫn tuyệt đối / `..` / segment cấm / symlink ra ngoài, dừng nếu manifest có dòng không hợp lệ, dừng nếu sandbox tồn tại mà không có marker `.sandbox-p33` (không rõ nguồn gốc — không xóa), hash SHA-256 script bản sao = nguồn, sanity script sạch. Mọi thất bại → exit ≠ 0, không bỏ qua rồi tiếp tục.

Cơ chế driver từng ca: dựng **bản nền** (bảng hash + tập đường dẫn toàn sandbox) → mỗi ca **xác minh sạch trước tiêm** → tiêm trong `try` (xác minh mục tiêu tồn tại + số vị trí thay đổi đúng) → chạy script thật (cwd = sandbox) → trong `finally` **hoàn nguyên** (xóa + dựng lại từ manifest) và **đối chiếu hash + tập đường dẫn với bản nền**, ghi kết quả vào bản ghi ca. Hoàn nguyên lỗi/lệch hash → `sandboxBan` bật thật, dừng các ca sau, exit tổng ≠ 0. Lỗi khởi chạy/timeout được ghi `loiVanHanh`, không tính là bắt vi phạm.

## Các tệp

| Tệp | Nội dung |
| --- | --- |
| `kiem-tra-an-toan.cjs` | Module kiểm tra an toàn dùng chung (cả driver và trình dựng sandbox require) |
| `tao-sandbox.cjs` | Dựng `sandbox/` từ manifest + 13 script + marker |
| `kiem-thu-hoi-quy.cjs` | Driver 35 ca — bản ghi đầy đủ: stdout/stderr **riêng**, thời điểm ISO, tiêm + số vị trí, kỳ vọng vs thực tế, phân tích thông báo (dòng/cụm rule/tệp:dòng script báo; script không báo dòng được ghi rõ), hoàn nguyên + hash từng ca |
| `kiem-thu-hoi-quy-ket-qua.json` | Kết quả máy-đọc từng ca (35/35 ĐẠT chốt 18:44 +07) |
| `tu-kiem-driver.cjs` | Tự kiểm driver: P1 sai kỳ vọng → TRUỢT; P2 lỗi tiêm → bản ghi lỗi + hoàn nguyên sạch + không chạy script; P3 hash bắt thay đổi thử; P4 manifest xấu bị từ chối trước khi ghi/xóa |
| `tu-kiem-driver-ket-qua.json` + `log-tu-kiem-driver.txt` | Bằng chứng tự kiểm 4/4 ĐẠT |
| `tu-kiem-p1-ket-qua.json` + `tu-kiem-p2-ket-qua.json` | Bản ghi ca của driver khi chạy phép thử P1/P2 (bằng chứng ketLuan + hoàn nguyên) |
| `manifest-tep.txt` | 224 dòng hợp lệ (212 tệp rời + 12 thư mục copy đệ quy → 355 tệp trong sandbox kể cả marker) |
| `manifest-duong-dan.json` | Đường dẫn từng script đọc — trích chuỗi literal từ 13 script |
| `log-baseline-build-va-13-script.txt` | 13 script chạy sạch exit 0 (lần cuối 18:08) |
| `log-build-chi-tiet.txt` | Log build baseline đầy đủ |
| `log-hoi-quy-chot.txt` | Log chạy chốt 35/35 ĐẠT |
| `log-chot-cuoi-cung.txt` | Chốt cuối: build exit 0, check:types 0 lỗi/0 cảnh báo/3 hint P3.2, diff-check sạch |

## Kết quả chính

- Tự kiểm driver: **4/4 ĐẠT** (chạy trước chạy chốt).
- Hồi quy chốt: **35/35 ĐẠT**, exit tổng 0 — sạch trước tiêm 35/35, hoàn nguyên khớp hash + tập đường dẫn 35/35.
- Vòng 1 có 5 ca TRUỢT do lỗi thiết kế ca (manifest bỏ qua thư mục; append không vào frontmatter; expectMsg sai) — đã sửa thiết kế, không sửa script kiểm cụm nào.
- Bộ 35 thay ca vi phạm daily-care Markdown bằng V13 component và không giữ ca ngoại lệ component "theo Seiko". Độ phủ hành vi không đồng nhất với bộ 37 cũ; được chấp thuận làm đường cơ sở giới hạn cho quyết định giữ nguyên, không làm cổng tái cấu trúc — xem biên bản mục 5.1.

## Giới hạn

- Bộ 35 ca là **đường cơ sở giới hạn** — không chứng minh mọi rule được phủ, không đủ điều kiện tiên quyết để tái cấu trúc.
- Sandbox là bản sao tối thiểu theo manifest, không phải toàn repo.
- Sandbox được dọn sau khi chốt bằng chứng; `tao-sandbox.cjs` tái tạo được.
