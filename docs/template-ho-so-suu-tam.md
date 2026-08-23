# Mẫu hồ sơ sưu tập (template Markdown)

Ngày lập: 23/08/2026. Ba mẫu dưới đây là KHUNG CHUẨN dùng khi viết/nâng cấp bài; chưa áp dụng đại trà — áp dụng thử khi có đợt nâng cấp nội dung tiếp theo. Mỗi mục chỉ điền khi có nguồn kiểm chứng; mục không có dữ kiện ghi "(chưa kiểm chứng)" hoặc bỏ hẳn — không đoán.

---

## Mẫu 1 — Hồ sơ thương hiệu

```markdown
---
title: "<Tên thương hiệu> — <một câu định vị>"
# các trường frontmatter theo schema hiện hành (tier, country, founded...)
---

## Đóng góp kỹ thuật
<!-- 2–4 đóng góp có thật, mỗi đóng góp một mốc năm + nguồn -->

## Các thời kỳ lịch sử
<!-- Chia theo mốc chuyển đổi rõ ràng (sáng lập, khủng hoảng thạch anh, sát nhập...) -->

## Sở hữu và tập đoàn
<!-- Độc lập/family/group; năm thay đổi sở hữu -->

## Bộ máy và mức độ in-house
<!-- Calibre tự chế vs mua ngoài (ETA/Sellita/Miyota); đối chiếu CALIBRE_DISPLAY_SLUGS -->

## Ngôn ngữ thiết kế
<!-- Đặc trưng hình dạng/vật liệu/mặt số lặp lại qua các đời -->

## Mẫu đại diện
<!-- 3–6 mẫu + link bài mau-iconic nếu có -->

## Điểm mạnh và điểm yếu
<!-- Nhận định biên tập — ghi rõ là nhận định -->

## Tranh luận
<!-- Các tranh cãi có thật quanh hãng (VD: tình trạng giá, chiến lược sản phẩm) — ghi nguồn -->

## Nguồn
<!-- Danh sách sources; claim nào chưa khớp nguồn ghi "(cần nguồn)" -->
```

## Mẫu 2 — Hồ sơ iconic / reference

```markdown
---
title: "<Tên mẫu> — <một câu danh xưng>"
# brand, year, references, category, movement, power_reserve, water_resistance...
---

## Bối cảnh ra đời
<!-- Nhu cầu/thời đại tạo ra mẫu này -->

## Timeline các reference
<!-- Bảng: reference | năm | thay đổi chính | ghi chú -->

## Biến thể dial / bezel / case / bracelet
<!-- Liệt kê biến thể thật; cảnh báo biến thể rỏm -->

## Movement theo từng đời
<!-- Calibre từng thế hệ + link hồ sơ calibre nếu có -->

## Service parts
<!-- Phụ tùng thay thế: còn sản xuất/hết hàng; mắt kính/dây/kim gốc -->

## Dấu hiệu mất nguyên bản
<!-- Redial, relume, thay kim, over-polish — cách nhận biết -->

## Độ hiếm và nhầm lẫn thường gặp
<!-- Sản lượng (nếu có nguồn), bản nhầm lẫn với mẫu khác -->

## Nguồn sơ cấp và auction archive
<!-- Trang hãng, tài liệu gốc, kết quả đấu giá có ngày -->
```

## Mẫu 3 — Hồ sơ calibre

```markdown
---
title: "Calibre <mã> — <mô tả ngắn>"
# frontmatter theo collection phù hợp (có thể là bài thuong-hieu con hoặc collection mới nếu dự án quyết định)
---

## Kiến trúc
<!-- Bố cục: số bánh, cầu máy, kiểu rotor -->

## Kích thước
<!-- Đường kính, độ dày (mm) -->

## Tần số
<!-- vph + nhịp/giây -->

## Trữ cót
<!-- Giờ; số thân cót nếu biết -->

## Chân kính
<!-- Số lượng -->

## Bộ thoát / dây tóc / chống sốc
<!-- Loại bộ thoát, vật liệu dây tóc, hệ chống sốc -->

## Phả hệ máy
<!-- Tiền thân và hậu duệ (calibre nào phát triển từ đâu) -->

## Serviceability
<!-- Mức độ dễ bảo dưỡng, phụ tùng, thợ quen dạng máy -->

## Điểm mạnh và điểm yếu
<!-- Nhận định biên tập — ghi rõ -->

## Nguồn và patent
<!-- Tài liệu hãng; số văn bằng sáng chế nếu có -->
```

---

## Quy tắc dùng chung

- Mọi con số (kích thước, tần số, sản lượng, năm) phải truy được nguồn; không có thì ghi vào `CAN-KIEM-CHUNG.md`.
- Nhận định biên tập luôn ghi nhãn "nhận định" trong câu, không trình bày như thông số.
- Mục "Nguồn" dùng danh sách `sources` trong frontmatter; khi quy trình citation theo claim được bật lại, gắn chỉ số nguồn tại từng claim.
- Ba mẫu này bổ sung — không thay thế — cấu trúc 5 khối hiện có của trang thương hiệu.
