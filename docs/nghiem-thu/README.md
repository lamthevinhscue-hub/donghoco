# THƯ MỤC NGHIỆM THU

Nơi lưu các biên bản nghiệm thu do Claude lập, sau mỗi đợt bàn giao của GLM.

**Quy ước đặt tên:** `YYYY-MM-DD_loai-bao-cao_pham-vi.md` — ngày ở đầu để tự sắp xếp theo thứ tự thời gian.

**Nguyên tắc:** mỗi file là ảnh chụp hiện trạng tại một thời điểm, **không sửa lại về sau**. Có phát hiện mới thì lập biên bản đợt tiếp theo, không chỉnh biên bản cũ.

---

## Danh sách các đợt

| Ngày nghiệm thu | File | Phạm vi | Kết quả | Trạng thái |
|---|---|---|---|---|
| 02/08/2026 | [2026-08-02_kiem-ke-hien-trang_muc-A.md](2026-08-02_kiem-ke-hien-trang_muc-A.md) | Mục A — kiểm kê toàn repo tại commit `4d120dd` | Phát hiện 10 link 404, 4 vị trí ký tự ngoài tiếng Việt và tiếng Anh, 0 trên 8 tính năng nền tảng, 14 trên 24 trang thương hiệu chưa đủ 5 khối | Đã dùng làm căn cứ soạn `docs/bo-prompt-glm-v2.md` |
| 03/08/2026 | [2026-08-03_nghiem-thu_muc-A0-B5-G-C-D4-H.md](2026-08-03_nghiem-thu_muc-A0-B5-G-C-D4-H.md) | Mục A0, B5, G, C, D4, H tại commit `39efcc6` | Đạt A0 (6 trên 7), B5, G, H. Chưa làm F0 và E0. **D4 không hoạt động.** Phát sinh 3 ký tự Trung Quốc mới | Đã khắc phục ở các commit sau |
| 03/08/2026 | [2026-08-03_danh-gia-hien-trang-va-de-xuat-giao-dien.md](2026-08-03_danh-gia-hien-trang-va-de-xuat-giao-dien.md) | Toàn site tại commit `4682019`, 83 trang | Kỹ thuật và nội dung gần như xong: 0 link hỏng, 0 ký tự lạ, đủ 8 tính năng nền tảng. **Vấn đề còn lại là 0 ảnh thật.** Kèm 6 đề xuất giao diện và 3 prompt cho GLM | GLM đã làm xong cả 3 prompt |
| 04/08/2026 | [2026-08-04_nghiem-thu-giao-dien-va-de-xuat-tuong-tac.md](2026-08-04_nghiem-thu-giao-dien-va-de-xuat-tuong-tac.md) | Commit `d763266`, 83 trang | **Đạt cả 4 việc đợt trước** (3 prompt giao diện + bổ sung lịch sử IWC/Cartier). Chẩn đoán mới: bài viết là ngõ cụt, /so-sanh thiếu lối vào, menu 8 mục phẳng. Kèm 4 prompt D-E-F-G | GLM đã làm xong cả 4 |
| 06/08/2026 | [2026-08-06_nghiem-thu-svg-timeline-dot-1.md](2026-08-06_nghiem-thu-svg-timeline-dot-1.md) | 5 minh họa SVG đợt 1, commit `7192d24` | Kỹ thuật đạt 100%, thẩm mỹ 2 trên 5 đạt. Hai lỗi hệ thống: gạch tạo khối quá mảnh, hoa văn nền không hiện | Đã sửa xong, duyệt |
| 06/08/2026 | [2026-08-06_danh-gia-tong-the-va-lo-trinh-tiep.md](2026-08-06_danh-gia-tong-the-va-lo-trinh-tiep.md) | Toàn site tại commit `d7ad690` | **Giai đoạn xây dựng đã xong.** 26/26 hãng đủ 5 khối, 28/28 minh họa, 0 link hỏng, 0 ký tự lạ. Còn lại: kiểm thử trên máy thật, ảnh chụp, dứt điểm CAN-KIEM-CHUNG | Lộ trình mới |
| 08/08/2026 | [2026-08-08_ra-soat-toan-dien.md](2026-08-08_ra-soat-toan-dien.md) | Toàn site tại commit `a3a62a3`, **127 trang** | Xong cả 7 gói mở rộng: 26 iconic, 18 cơ chế, 32 từ điển, 12 hướng dẫn. **Nội dung mới sạch.** 4 lỗi cần sửa, 3 nằm ở nội dung cũ: 1 ký tự Hán, 1 link 404, 16 file còn giá USD, từ tiếng Anh đơn lẻ | GLM đã sửa xong |
| 09/08/2026 | [2026-08-09_danh-gia-toan-dien.md](2026-08-09_danh-gia-toan-dien.md) | Commit `b4adf05`, 127 trang | **Sạch nhất từ trước tới nay.** 0 link hỏng, 0 ký tự lạ, 0 giá USD, 18/18 hoạt ảnh, nền bảo mật gần trọn. 3 lỗi nhẹ: file rác 2,5MB, `in-house` dọn sót, chưa đổi font | Chờ GLM sửa 3 việc |

---

## Việc còn treo tính đến 03/08/2026

Trích từ biên bản đợt 2, để tiện theo dõi mà không phải mở file:

1. **Chuẩn hóa ký tự xuống dòng** — repo thiếu `.gitattributes`, đang có 63 file thay đổi giả (`3865 dòng thêm / 3865 dòng xóa` nhưng không đổi một chữ nào). Đây là nguyên nhân gốc làm hỏng việc số 2.
2. **Mục D4 chạy rỗng** — `src/data/glossary-terms.json` rỗng, toàn site 0 tooltip từ điển. Script sinh file báo thành công dù kết quả bằng 0.
3. **Ba ký tự Trung Quốc** ở `src/content/coChe/vi/day-toc-banh-lac.md` dòng 55 và 59, đang hiển thị công khai.
4. **Lỗi chính tả và tiếng Anh đứng đơn lẻ** trong 5 bài cơ chế mới, trong đó lỗi `bezem` nằm ở phần tóm tắt nên hiện ra trang danh sách.
5. **Hoạt ảnh song trùng** giữa `/tu-dien` và `/co-che` — chờ anh Vinh quyết.
6. **Mục F0 và E0 bị bỏ qua** — cần quay lại đúng thứ tự sau khi sửa xong các việc trên.

---

## Các file báo cáo GLM tự lập (để ở gốc repo)

Không nằm trong thư mục này vì `docs/bo-prompt-glm-v2.md` quy định GLM ghi ra gốc repo, và các file này được cập nhật liên tục chứ không đóng băng theo đợt:

| File | Nội dung |
|---|---|
| `BAO-CAO-RA-SOAT.md` | Báo cáo Mục A do GLM tự làm — lưu ý: kết luận "0 link 404" trong file này **sai** tại thời điểm lập |
| `RA-SOAT-DOT-2.md` | Nhật ký sửa lỗi Mục B5 |
| `BROKEN-LINKS.md` | Nhật ký rà link nội bộ, cập nhật sau mỗi đợt |
| `CAN-KIEM-CHUNG.md` | Các con số đã gỡ khỏi bài vì chưa truy được nguồn, chờ anh Vinh xác nhận |
