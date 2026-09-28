# D5 — Pha hồ sơ nguồn chính sách bảo dưỡng chính hãng — Biên bản thực hiện

- Giao dịch (phân vai): **TXN-20260928-008 = mã trong nội dung prompt GPT Work
  cho gói D5; TXN-20260928-013 = mã giao dịch điều phối gửi khuôn B** — hai mã
  cùng một yêu cầu. Vòng sửa 1: **TXN-20260928-018** — đồng bộ số liệu mutation
  thực tế (6/6; biên bản trước ghi nhầm 8/8)
- Danh mục: DHC-ANH-HOAT-ANH-20260926 v1.0.0, gói D5
- Ngày thực hiện: 28/09/2026; nền repo: `1ae7069` (= origin/main khi bắt đầu);
  tracked đang sửa sẵn 3 tệp thuộc các đợt khác (V1 chờ kiểm chứng:
  `package.json`, `src/scripts/exploded3d.ts`; điều phối:
  `docs/CHI-MUC-KE-HOACH-HIEN-HANH.md`) — D5 KHÔNG đụng các tệp này
- Trạng thái: **HOÀN THÀNH — DỪNG CHỜ GPT WORK NGHIỆM THU — chưa stage, chưa
  commit, chưa push**

## 1. Đã làm gì

Lập hồ sơ nguồn cho bảng so sánh chính sách bảo dưỡng và bảo hành theo công bố
chính thức của 10 hãng (Rolex, Omega, Longines, Tudor, TAG Heuer, Oris, Grand
Seiko, Seiko, Tissot, Hamilton). Kết quả pha này là căn cứ mở pha dựng bảng khi
được nghiệm thu; chưa tạo bảng, chưa sửa giao diện. URL sẵn trong bài bảo dưỡng
hiện có (Omega customer-service, Rolex servicing-procedure) được kiểm lại trực
tiếp trong phiên.

## 2. Bảng trạng thái 10 hãng (đếm từ khối chi tiết)

| Hãng | Chu kỳ | Bảo hành | Trạng thái |
|---|---|---|---|
| Rolex | ~10 năm (FAQ) | 5 năm guarantee | SẴN SÀNG |
| Omega | 5–8 năm full service (FAQ; kiểm nước 1 năm là mục riêng) | 5 năm quốc tế | SẴN SÀNG |
| Longines | 6–8 năm full service (trang services) | 24 tháng; 5 năm cơ từ 01/01/2021 | SẴN SÀNG |
| Tudor | ~10 năm (FAQ riêng Tudor) | 5 năm (bán từ 2020); service 2 năm | SẴN SÀNG |
| TAG Heuer | KHÔNG có công bố | 2 năm + gia hạn 3 năm (đăng ký) = 5 năm | CHƯA ĐỦ NGUỒN |
| Oris | 3–5 năm; Calibre 400 = 10 năm | 2 năm; MyOris 3/5/10 năm | SẴN SÀNG |
| Grand Seiko | 3–4 năm (support global-en) | 5 năm toàn cầu | SẴN SÀNG |
| Seiko | 3–4 năm (FAQ care-maintenance) | 3 năm (mua từ 01/10/2024) | SẴN SÀNG |
| Tissot | 4–5 năm (FAQ) | 24 tháng; 36 tháng Lightmaster Solar/COSC | SẴN SÀNG |
| Hamilton | hãng công bố không xác định được khoảng cố định | 2 năm quốc tế | CHƯA ĐỦ NGUỒN |

Không ép 10/10: hai hãng thiếu trường chu kỳ công bố (TAG Heuer, Hamilton) được
giữ CHƯA ĐỦ NGUỒN đúng quy tắc "thiếu một trường".

## 3. Nguồn chính thức theo từng trường (tóm tắt — chi tiết trong hồ sơ)

- **Chu kỳ**: Rolex FAQ en-us (~10 năm); Omega FAQ en-us (5–8 năm full service);
  Longines /en-us/services (6–8 năm); Tudor /en/tudor-care/faq (~10 năm); Oris
  helpcenter (3–5 năm; Calibre 400 = 10 năm); Grand Seiko /global-en/support
  (3–4 năm); Seiko FAQ care-maintenance (3–4 năm); Tissot /en-us/faq (4–5 năm);
  TAG Heuer + Hamilton: không có công bố (Hamilton ghi rõ "cannot be
  determined").
- **Bảo hành**: Rolex FAQ (5 năm guarantee); Omega FAQ (5 năm international
  warranty); Longines /customer-service/warranty (24 tháng; 5 năm cơ từ
  01/01/2021); Tudor /tudor-care/tudor-guarantee (5 năm từ 2020) + /service-card
  (2 năm sau service); TAG Heuer FAQ (2 + gia hạn 3 = 5, điều kiện đăng ký);
  Oris helpcenter (2 năm; MyOris 3/5/10); Grand Seiko /us-en/warranty (5 năm
  toàn cầu); Seiko /global-en/customerservice/warranty (3 năm từ 01/10/2024);
  Tissot /en-ca/warranty.html (24 tháng; 36 tháng Lightmaster Solar/COSC);
  Hamilton /en-int/warranty (2 năm).
- Mỗi nguồn ghi kèm phạm vi trang nêu (en-us / global-en / en / en-int / en-ca /
  FAQ) — không suy thành bảo hành toàn cầu ngoài ngữ cảnh trang.

## 4. Giới hạn và claim bị loại/thiếu (chi tiết hồ sơ mục 13)

- TAG Heuer: chu kỳ chưa có công bố (trang index gợi ý "every 5 years" nhưng
  không xác minh được trên đường dẫn www chính thức — không dùng).
- Hamilton: hãng công bố rõ "cannot be determined" — khi dựng bảng ô chu kỳ chỉ
  được ghi nguyên trạng và chỉ khi anh Vinh duyệt cách hiển thị.
- Tissot: cơ chế "+1 năm qua app" chưa có nguyên văn (trang quốc tế chỉ meta
  "2 to 3 years", thân trang JS) — cấm ghi khi dựng bảng.
- Seiko: thời hạn đồng hồ mua trước kỳ chuyển đổi không có nguyên văn trên
  trang đã kiểm — không suy số cũ.
- Rolex: bảo hành sau service không công bố số năm — cấm ghi 2 năm.
- Longines: Collector's Corner và dây/kim đeo chỉ 24 tháng — phải ghi kèm.
- Omega: bảng giá service theo calibre thuộc phạm vi cấm (chi phí) — không đưa.

## 5. Checker và mutation

Checker `output/d5-service-policy-source-audit/check-d5.mjs` (nguồn; đọc cả hai
tệp docs):

- D5-1: đủ 10 khối hãng + trạng thái hợp lệ + tổng kết khớp dữ liệu chi tiết.
- D5-2: mọi hàng claim URL HTTPS + ngày hợp lệ + trích ≤25 từ + nêu phạm vi
  (43 hàng claim qua 10 khối).
- D5-3: khối SẴN SÀNG đủ hàng chu kỳ + bảo hành; mọi URL thuộc domain chính
  hãng đúng hãng (subdomain chính thức của đúng domain hợp lệ:
  faq.tagheuer.com, helpcenter.oris.ch).
- D5-4: cấm kết luận/chỉ số ngoài phạm vi trong bảng claim (chi phí, bảng giá,
  thời lượng sửa, chất lượng dịch vụ, mạng lưới trung tâm, nên mua, mua bán,
  đáng mua).
- D5-5: trích dẫn không lẫn tên hãng khác (mỗi khối quét tên của 9 hãng còn
  lại; riêng "Seiko" bỏ qua khớp trong "Grand Seiko").
- D5-6: hai tệp docs UTF-8 không BOM + newline cuối.

Chạy ĐẠT exit 0 (43 kiểm, log `check-d5.log.txt`). Hai lỗi thật được checker
bắt và sửa trước khi đạt: từ cấm "mạng lưới" quá rộng (chỉnh thành "mạng lưới
trung tâm" + diễn đạt lại hàng phạm vi Rolex); so khớp domain chưa tính
subdomain chính hãng của TAG Heuer/Oris.

**Mutation 6/6 ca ĐẠT + 1 chạy sạch cuối exit 0** (vượt ngưỡng ≥5; log
`mutation-d5.log.txt`; mỗi ca fail đúng rule, hoàn nguyên byte-đối-byte,
sandbox mkdtemp):

| Ca | Đột biến | Bắt đúng |
|---|---|---|
| MUT-1 | Xóa URL của một claim | D5-2 |
| MUT-2 | HTTPS → HTTP | D5-2 |
| MUT-3 | Lẫn nguồn: URL chu kỳ Rolex đổi thành trang Omega | D5-3 |
| MUT-4 | Ghi nhầm tổng kết (8 → 9) | D5-1 |
| MUT-5 | Nâng Hamilton (thiếu chu kỳ) thành SẴN SÀNG | D5-3 |
| MUT-6 | Đổi domain Longines sang domain ngoài danh sách | D5-3 |

## 6. Kiểm bắt buộc

| Lệnh | Kết quả |
|---|---|
| `node output/d5-service-policy-source-audit/check-d5.mjs` | exit 0 — ĐẠT toàn bộ |
| `node output/d5-service-policy-source-audit/mutation-d5.mjs` | 6/6 ca + chạy sạch cuối exit 0 |
| `npm run check:types` | 0 errors, 0 warnings, **4 hints = baseline** |
| `node scripts/scan-chars.mjs` | OK — 461 tệp |
| `git diff --check` / `git diff --cached --check` | sạch |

Không chạy `npm run check`/`npm run build`: gói chỉ tạo hai tệp docs mới và
thư mục output nội bộ — tracked KHÔNG có tệp nào của D5 (các tệp tracked đang
sửa thuộc gói V1 và đợt điều phối, có trước), không ảnh hưởng check/build; dist
hiện hành không đổi. (Lý do nêu theo yêu cầu đề bài.)

## 7. Điểm chưa giải quyết

- Bằng chứng Hamilton lấy qua trình đọc (hamiltonwatch.com chặn TLS của curl
  từ máy kiểm), xác nhận nhất quán hai lần đọc độc lập cùng ngày — nếu cần độ
  chắc tuyệt đối, kiểm lại bằng trình duyệt.
- TAG Heuer: số "every 5 years" xuất hiện trong chỉ mục tìm kiếm nhưng không
  xác minh được trên đường dẫn www chính thức — đã ghi mục 13 hồ sơ và cần
  vào CAN-KIEM-CHUNG.md khi mở pha dựng bảng.

## 8. Trạng thái Git và đề nghị phát hành

- HEAD = `1ae7069` = origin/main; tracked sửa 3 (KHÔNG thuộc D5 — V1 chờ kiểm
  chứng + điều phối); D5 chỉ thêm tệp mới.
- Tệp mới: `docs/ho-so-nguon-D5-chinh-sach-bao-duong-chinh-hang-2026-09-28.md`,
  `docs/nghiem-thu/D5-ho-so-nguon-chinh-sach-bao-duong-2026-09-28.md`,
  `output/d5-service-policy-source-audit/` (nội bộ).
- **Đề nghị phát hành đúng 2 tệp docs** khi được phép; output/ giữ nội bộ.
