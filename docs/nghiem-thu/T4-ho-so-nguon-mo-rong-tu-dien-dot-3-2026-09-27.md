# T4 — Hồ sơ nguồn 18 ứng viên từ điển đợt mở rộng 2 — Biên bản thực hiện

- Giao dịch: TXN-20260926-296, danh mục DHC-GD3-20260925, gói T4
- Ngày thực hiện: 25–27/09/2026; nền repo: `3c31866` (= origin/main khi bắt đầu)
- Trạng thái: **VÒNG SỬA HẸP 1 (TXN-20260926-298) XONG — DỪNG CHỜ TÁI NGHIỆM
  THU — chưa stage, chưa commit, chưa push**

## 1. Phạm vi đã làm

Chỉ tạo 2 tệp docs (`docs/ho-so-nguon-T4-mo-rong-tu-dien-dot-3-2026-09-27.md`,
`docs/nghiem-thu/T4-ho-so-nguon-mo-rong-tu-dien-dot-3-2026-09-27.md`) và thư mục
nội bộ `output/t4-glossary-source-audit/`. Không đụng tệp `src/**`,
`public/**`, `scripts/**`, `package.json`, cấu hình, CSS, template, ảnh. Không
tạo `term_fr`/`term_de`, không tạo bài VI/EN, không gắn link nội bộ vào bài, không
đổi glossary count. Đây là hồ sơ nguồn trước khi viết — chưa có bài nào được
tạo hay sửa.

## 2. Phương pháp rà nguồn

- Fetch trực tiếp bằng curl với UA trình duyệt; PDF lớn qua web_reader hoặc
  trích text in-memory; WebSearch CHỈ để tìm URL ứng viên — nguồn là trang
  fetch được đọc nguyên văn.
- FHH là SPA: mọi slug trả 200; chỉ tính mục "có" khi trang thật (thẻ title +
  khối định nghĩa; stub rỗng 74 byte). Trang chỉ mục FHH trả 403 — dò slug
  trực tiếp: 28 slug, 12 có nội dung (tra-cuu-fhh.md).
- Bằng chứng thô lưu `output/t4-glossary-source-audit/tra-cuu-fhh.md`,
  `tra-cuu-hang.md`, `tra-cuu-hoan-thien.md`, `tra-cuu-bo-tro.md`.
- Kế thừa P0-D1 (25/09) cho lệch nhịp, lực không đổi, pha trăng; đối chiếu lại
  bằng fetch mới (đủ câu Berthoud cho lực không đổi — nâng từ CHƯA ĐỦ lên
  SẴN SÀNG nhờ nguồn thứ hai; lệch nhịp vẫn CHƯA ĐỦ sau khi thử lại glossary
  nhà chế tạo máy đo và các hướng tổ chức).

## 3. Tổng kết 18 mục (tính từ bảng chi tiết, checker đối chiếu)

SẴN SÀNG 8 (bộ truyền động bánh răng; bộ lên dây và chỉnh giờ; bộ kim; dừng
giây; đánh bóng gương; tráng men; chạm khắc; lực không đổi) · CẦN THU HẸP 2
(cần chỉnh nhanh chậm; máy nền) · GỘP/TRỎ 1 (Swiss Made — trùng bài hướng dẫn
VI-EN, chỉ chấp nhận mục ngắn dẫn bài nếu biên tập muốn) · CHỜ QUYẾT 1 (pha
trăng — trùng bài cơ chế, chờ quyết định) · CHƯA ĐỦ NGUỒN 6 (bánh lắc tự do;
dây tóc Breguet; khảm; lệch nhịp; tropical; dây NATO).

## 4. Nguồn và giới hạn nổi bật

- FHH đợt này khai được các mục từ điển mới: gear-train, gears, hand, ebauche,
  regulator, breguet-overcoil, balance, balance-spring, enamel, fusee,
  stopwork, cloisonné — các slug keyless/winding/free-sprung/marquetry/tropical
  đều rỗng (stub).
- "Regulator" của FHH là ĐỒNG HỒ Regulator chia tách kim — hồ sơ cấm dùng làm
  nguồn cho mục "cần chỉnh nhanh chậm"; mục này chỉ bám FHH balance-spring +
  Patek Index-assembly.
- Cụm "free-sprung" không có nguồn nào công bố — mục giữ CHƯA ĐỦ NGUỒN dù khái
  niệm có mô tả gián tiếp (Gyromax).
- Câu duy nhất của FHH breguet-overcoil nói "mainspring" (lệch đối tượng) — ghi
  CAN-KIEM-CHUNG, cấm trích khi viết.
- Nhiệt độ men 850°C là số của Patek — không được khái quát thành chuẩn chung.
- Tropical: nguồn duy nhất là bài biên tập FHH (giọng kể chuyện) — không đủ;
  dây NATO: tài liệu chuẩn quốc phòng Anh không công khai/không trích được —
  không đủ; cả hai giữ CHƯA ĐỦ NGUỒN kèm nhật ký đã thử.
- Dừng giây: hai tài liệu hãng mô tả thao tác (kim giây dừng khi kéo núm) —
  claim bị giới hạn ở thao tác, cấm dùng từ "hacking" như thuật ngữ.

## 5. Checker (output/t4-glossary-source-audit/kiem-t4.mjs)

7 nhóm: T4-1 đủ 18 mục + trạng thái/category hợp lệ; T4-2 tổng kết đếm lại từ
chi tiết (không hard-code số lượng); T4-3 mọi URL HTTPS + miền sạch + ngày hợp
lệ + trích đủ + ĐẾM TỪ từng ô trích sau khi bỏ escape Markdown — vượt 25 từ bị
bắt kèm mục/số từ + tệp không còn http://; T4-4 mục SẴN SÀNG ≥2 dòng bằng
chứng và khác nhau CẢ TỔ CHỨC LẪN MIỀN URL (nguồn độc lập kép — hai URL cùng
một tổ chức không tính, bài học P0-D1); T4-5 bảng chống trùng đủ 18, phương án
hợp lệ, gộp/trỏ có route; T4-6 mỗi mục chi tiết có "Claim được phép" + "Cấm
viết"; T4-7 hai tệp UTF-8 không BOM, newline cuối, không nhắc miền cấm. Biến
môi trường T4_ROOT phục vụ mutation.

## 6. Mutation (bản sao %TEMP%\t4-sandbox-*, log mutation-t4.log.txt)

7 ca, mỗi ca fail đúng rule, hoàn nguyên byte-đối-byte (so sha256), chạy sạch
trong ca exit 0, chạy sạch cuối exit 0; ca chỉ ĐẠT khi đủ ba điều kiện:

- MUT-1 xoá dòng bằng chứng của mục 9 (SẴN SÀNG) → còn 0 nguồn → T4-4
- MUT-2 HTTPS → HTTP một URL → T4-3
- MUT-3 làm lệch tổng kết (8 → 7) → T4-2
- MUT-4 xoá dòng chống trùng mục 13 → T4-5
- MUT-5 nâng mục 17 (CHƯA ĐỦ NGUỒN, 1 nguồn) lên SẴN SÀNG → T4-4
- MUT-6 kéo dài một trích lên hơn 25 từ → T4-3 (báo mục/số từ)
- MUT-7 làm hai nguồn của mục 1 cùng một miền URL → T4-4 (nguồn không độc lập)

## 7. Kiểm bắt buộc

| Lệnh | Kết quả |
|---|---|
| node output/t4-glossary-source-audit/kiem-t4.mjs | ĐẠT 7/7 (log kiem-t4.log.txt) |
| node output/t4-glossary-source-audit/mutation-t4.mjs | ĐẠT 7/7 (tổng gồm 5 ca gốc, MUT-6 kiểm trích vượt 25 từ và MUT-7 kiểm hai nguồn cùng miền) |
| npm run check:types | 0 errors, 0 warnings, 4 hints — đúng baseline, không tạo mới |
| node scripts/scan-chars.mjs | OK |
| git diff --check / git diff --cached --check | sạch cả hai |

Lý do KHÔNG chạy `npm run check`/`npm run build`: gói không sửa bất kỳ thứ gì
tham gia đường build (src/, scripts/, package.json, cấu hình) — chỉ thêm tệp
docs và output; build hiện tại của repo đã xanh từ gói T3 và không thay đổi.

## 8b. Vòng sửa hẹp 1 (TXN-20260926-298) — giới hạn trích dẫn và độ chặt checker

**Lỗi được phán**: tiêu chí trích tối đa 25 từ nhưng checker cũ chỉ kiểm trích
không rỗng; đo trực tiếp thấy 11 dòng vượt ngưỡng.

**Đã rút 11 trích về ≤25 từ** (không đổi URL, ngày, trạng thái, claim, phân
loại; phần cắt ghi "..." — nguyên văn đầy đủ vẫn nằm ở các tệp tra cứu trong
output/t4-glossary-source-audit/):

| Mục · nguồn | Từ cũ → mới |
|---|---|
| 1 · Patek (Gear-train) | 27 → 24 |
| 2 · Patek (Winding mechanism) | 35 → 24 |
| 3 · Patek (Hand + Motion-work) | 28 → 23 |
| 6 · FHH (breguet-overcoil) | 27 → 24 |
| 7 · FHH (ébauche) | 29 → 21 |
| 9 · Patek (Mirror polishing) | 28 → 21 |
| 10 · Patek (Enameling) | 37 → 24 |
| 10 · Lange (the-art-of-enamelling) | 30 → 17 |
| 12 · Patek (marquetry) | 29 → 23 |
| 15 · Ferdinand Berthoud (newsletter) | 32 → 21 |
| 17 · FHH (library tropical) | 29 → 23 |

Số từ lớn nhất sau sửa: **25/25** (mục 1 FHH và mục 15 Lange — đúng ngưỡng tối
đa, không vượt). Không có bằng chứng nguồn mới nên không đổi trạng thái/claim.

**Checker siết**: T4-3 đếm token từng ô trích sau khi bỏ escape Markdown, vượt
25 từ báo rõ mục/số từ; T4-4 thêm rule nguồn độc lập — mục SẴN SÀNG phải khác
nhau CẢ tổ chức lẫn miền URL (phát hiện qua mutation: bản nháp chỉ bắt "hoặc"
nên URL rơi cùng miền nhưng nhãn tổ chức còn khác chữ vẫn qua; đã sửa thành
yêu cầu kép, nhất quán bài học P0-D1 về hai URL cùng tổ chức).

**Mutation 7/7 ĐẠT** (giữ 5 ca cũ, thêm MUT-6 trích >25 từ → T4-3 và MUT-7 hai
nguồn mục 1 cùng miền → T4-4; tổng số ca thực tế = 7).

**Chạy lại sau sửa**: checker ĐẠT 7/7 (trích dài nhất 25/25); mutation ĐẠT 7/7
exit 0; `npm run check:types` exit 0 — 0 errors, 0 warnings, 4 hints (baseline);
`node scripts/scan-chars.mjs` OK; `git diff --check` và `git diff --cached
--check` sạch. Không chạy `npm run check`/build — không chạm đường build.

## 9. Trạng thái Git

- HEAD = `3c31866` = origin/main; tracked sửa 0
- Untracked mới trong phạm vi: 2 tệp docs + output/t4-glossary-source-audit/
- Đề nghị phát hành: ĐÚNG 2 tệp docs trên; output/ giữ nội bộ, không phát hành
