# I3 pha 1 — Hồ sơ nguồn năm mẫu ưu tiên Việt Nam — Biên bản thực hiện

- Giao dịch (chuỗi đầy đủ): TXN-20260926-323 (lập hồ sơ, 27/09/2026);
  TXN-20260926-324 (vòng sửa chuẩn độc lập, 28/09/2026);
  TXN-20260926-330 (thực hiện pha 1b, 28/09/2026, phát hành sau `9b89d5d`);
  TXN-20260926-331 (điều phối/tái nghiệm thu pha 1b);
  TXN-20260926-332 (vòng đồng bộ tài liệu, 28/09/2026);
  TXN-20260926-333 (điều phối/tái nghiệm thu vòng đồng bộ).
  Danh mục DHC-GD3-20260925, gói I3 pha 1
- Nền: hồ sơ đã phát hành tại `9b89d5d` (= origin/main khi bắt đầu pha 1b,
  giữ nguyên; không stage, không commit, không push)
- Trạng thái: **PHA 1B VÀ VÒNG SỬA TÀI LIỆU TỐI HẸP (TXN-20260926-335) HOÀN
  THÀNH — DỪNG CHỜ GPT WORK TÁI NGHIỆM THU**

## 1. Đã làm gì

Lập hồ sơ nguồn cho năm mẫu ưu tiên (grand-seiko-snowflake, seiko-62mas,
tudor-black-bay, tissot-prx, orient-bambino) theo khuôn Phụ lục A, làm căn cứ
cho gói viết sâu song ngữ sau. Phạm vi giữ đúng đề bài: chỉ hồ sơ nguồn —
chưa viết lại bài Việt, chưa tạo bản tiếng Anh, chưa thêm route, ảnh, sơ đồ
tiến hóa, chưa sửa dữ liệu hiện có. Quyết định chủ sở hữu 27/09/2026: mở I3
ngay, bỏ phụ thuộc C4.

Đã đọc đủ năm bài VI hiện hữu (`src/content/mauIconic/vi/`), frontmatter,
nguồn đang trích, `src/data/timeline.json`, các dataset sơ đồ tiến hóa, các
bài cơ chế/từ điển và bài thương hiệu liên quan; 29 route nội bộ nêu trong hồ
sơ đều đối chiếu tồn tại trong dist hiện hành.

## 2. Phân loại theo bằng chứng (không ép kết quả)

| Mẫu | Trạng thái | Tóm tắt căn cứ |
|---|---|---|
| grand-seiko-snowflake | CẦN THU HẸP | Bằng chứng dày (mỗi nhóm claim hai URL trở lên) nhưng toàn bộ cùng tổ chức grand-seiko.com — chưa có nguồn độc lập khác tổ chức theo chuẩn hiện hành |
| seiko-62mas | CẦN THU HẸP | 1965/150m/tái hiện đạt 2 URL trở lên (có bảo tàng Seiko độc lập); riêng calibre 6217 / reference 6217-8000 đã rà chính hãng + bảo tàng, không trang nào chứa chuỗi "6217" — phải bỏ mã hoặc đánh dấu riêng |
| tudor-black-bay | CẦN THU HẸP | Toàn bộ tudorwatch.com (nội bộ); 2012, kim Snowflake, BB54 mới 1 URL trực tiếp mỗi claim; bài cần chỉnh BB54 37mm (đang ghi 39mm — sai) và MT5602-U (hiện hành) |
| tissot-prx | CẦN THU HẸP | Từ pha 1b: tên P/R/X, quartz bản gốc 1978 và nền ETA 2824 đã có nguyên văn chính hãng (mở cấm); "độc quyền của Tissot" loại có căn cứ (Certina dùng Powermatic 80); trạng thái giữ vì toàn bộ nguồn thuộc Swatch Group — chưa có độc lập |
| orient-bambino | CẦN THU HẸP | Nguồn: phân phối chính thức + từ pha 1b thêm trang chính hãng global (RA-AC0M04Y) — hai pháp nhân cùng lợi ích thương hiệu, chưa tính độc lập; nguồn frontmatter cũ (Monochrome, WatchRanker, Relojes Wiki) không đạt — thay; mẹo chữ mặt số và mốc 2022 rà lại 28/09 vẫn không nguồn |

Hồ sơ `docs/ho-so-nguon-I3-nam-mau-uu-tien-viet-nam-2026-09-27.md` chốt lại
theo mục: phương pháp (1), tổng kết (2), năm khối mẫu 3–7 (mỗi khối: trạng
thái + bảng claim 6 cột với URL HTTPS, trích nguyên văn ≤25 từ, ngày kiểm,
cấp nguồn, giới hạn diễn đạt), mục 8 (claim bị loại / chưa chứng minh / URL
hỏng / điều cấm viết), mục 9 (bảng chống trùng đủ năm mẫu), mục 10 (phạm vi
Việt/Anh — cả năm chưa có EN, chỉ ghi nhận), mục 11 (việc khi mở pha viết).

Tổng kết sau pha 1b (TXN-20260926-330): 0 SẴN SÀNG, 5 CẦN THU HẸP, 0 CHƯA ĐỦ
NGUỒN — không mẫu nào có nguồn độc lập ngoài tập đoàn; bổ sung/thu hẹp chi
tiết ở mục 2b. Chưa mở pha viết song ngữ mẫu nào.

## 2a. Vòng sửa nguồn và hồ sơ (TXN-20260926-324)

- **Chuẩn độc lập mới**: trạng thái SẴN SÀNG phải có tối thiểu hai nguồn
  trực tiếp độc lập — khác cả tổ chức và miền URL; nhiều URL cùng tổ chức
  không đủ. Chuẩn đã ghi vào mục 1 của hồ sơ.
- **Snowflake hạ từ SẴN SÀNG xuống CẦN THU HẸP**: sáu URL trong khối đều cùng
  tổ chức grand-seiko.com; trong phiên kiểm không tìm được nguồn độc lập đạt
  danh mục (bảo tàng, tổ chức ngành, archive khác tổ chức) cho các claim cốt
  lõi (cảm hứng mặt số, kim trượt, ±1 giây/ngày) — các nguồn độc lập khả dĩ
  hoặc cùng tập đoàn Seiko (Epson, bảo tàng Seiko), hoặc thuộc loại tạp chí
  bị cấm làm nguồn thông số. Hồ sơ đã đồng bộ: mục 1 (chuẩn), mục 2 (bảng
  tổng kết + dòng tổng kết), mục 3 (heading, dòng trạng thái, đoạn kết khối),
  mục 11 (pha kế tiếp là thu hẹp cho cả năm mẫu).
- **Phán về pha viết**: cả năm mẫu đang CẦN THU HẸP — pha kế tiếp phải là thu
  hẹp/bổ sung nguồn cho cả năm mẫu; chưa mở viết song ngữ cho mẫu nào cho đến
  khi có mẫu đạt chuẩn hai nguồn độc lập.

## 2b. Pha 1b — bổ sung và thu hẹp nguồn (TXN-20260926-330)

Đây là pha tiếp nối hồ sơ nguồn đã phát hành (`9b89d5d`), không phải viết
bài — không sửa `src/`, `public/`, `scripts/`, `package.json`, bài VI hiện
hữu, không tạo bài EN, route, ảnh hay sơ đồ. Phân loại KHÔNG đổi: 0 SẴN SÀNG,
5 CẦN THU HẸP, 0 CHƯA ĐỦ NGUỒN — không mẫu nào có nguồn độc lập ngoài tập
đoàn của mình. Bổ sung thật trong pha:

- **tissot-prx** — mở ba mục khỏi cấm viết: tên P/R/X, quartz bản gốc 1978,
  nền ETA 2824 (nguyên văn chính hãng, ngày kiểm 28/09, vào bảng mục 6 hồ
  sơ); mệnh đề "độc quyền của Tissot" bị loại có căn cứ (Swatch Group archive
  ghi Certina dùng Powermatic 80). Chi tiết mục 12 hồ sơ.
- **orient-bambino** — thêm trang sản phẩm chính hãng toàn cầu RA-AC0M04Y
  (F6724, 3 bar/30 m, Box crystal, 38.4 mm); hai miền (Epson America, Seiko
  Epson) là hai pháp nhân nhưng cùng lợi ích thương hiệu — chưa tính độc lập;
  tên dòng global là "Classic & Simple Style 38", không dùng chữ "Bambino".
- **seiko-62mas** — thêm một URL chính hãng khác khu vực cho claim 1965; mã
  "6217"/"6217-8000" rà lại toàn bộ trang chính hãng đa khu vực, sitemap
  seikousa.com và bảo tàng Seiko JP/EN — vẫn không có, giữ khóa viết.
- **grand-seiko-snowflake** — rà kênh độc lập (bảo tàng trong danh mục, FHH,
  bằng sáng chế): không claim nào (cảm hứng Hotaka/Shinshu, kim trượt,
  9R65 ±1s/ngày) có nguồn độc lập đạt; giữ CẦN THU HẸP.
- **tudor-black-bay** — không có nguồn độc lập đạt cho 2012/kim
  Snowflake/BB58/BB54; giữ CẦN THU HẸP; giữ riêng hai dữ kiện cần sửa: BB54
  37mm (bài ghi 39mm — sai) và calibre hiện hành MT5602-U.
- Kênh bị chặn/hỏng phiên 28/09 ghi vào mục 8.3 hồ sơ (FHH lỗi SSL, eta.ch
  timeout, Smithsonian/Espacenet/Justia 403, Google Patents 503…).

## 2c. Vòng đồng bộ tài liệu (TXN-20260926-332)

Vòng sửa docs-only sau pha 1b, không đổi phân loại (0 SẴN SÀNG, 5 CẦN THU
HẸP, 0 CHƯA ĐỦ NGUỒN):

- **Đồng bộ PRX theo kết quả cuối pha 1b** ở mọi phần mang nghĩa "kết luận
  hiện hành": bảng tổng kết mục 2 của hồ sơ (trước đó còn ghi ba claim "không
  có nguồn đạt — phải loại"), giới hạn của hàng claim "bản quartz hiện nay"
  trong mục 6 hồ sơ, và mục "Phát hiện quan trọng" của biên bản — dòng Tissot
  giờ mang nhãn rõ "**Kết luận lịch sử pha 1, đã thay thế ở pha 1b**". Ba
  claim được phép viết: tên P/R/X; mẫu gốc 1978 quartz; Powermatic 80 phát
  triển kỹ thuật từ calibre ETA 2824. Giữ cấm duy nhất mệnh đề "độc quyền của
  Tissot".
- **Mã giao dịch**: 330 là giao dịch thực hiện pha 1b, 331 là giao dịch
  điều phối/tái nghiệm thu pha 1b — cả hai mã và vai trò được ghi ở header cả
  hai docs.
- **Kiểm hồi quy nội bộ (I3-6 mới)**: I3-6a bắt việc bảng 8.1 hồ sơ tái đưa
  ba claim PRX về phán cấm; I3-6b bắt việc biên bản còn kết luận cũ mà thiếu
  nhãn "đã thay thế ở pha 1b". Hai mutation tương ứng: MUT-9 (tái đưa ba
  hàng 8.1 về "LOẠI" → I3-6a fail đúng), MUT-10 (xóa nhãn lịch sử khỏi biên
  bản → I3-6b fail đúng). Giữ nguyên MUT-1 đến MUT-8 và chạy sạch cuối.

## 2d. Vòng sửa tài liệu tối hẹp (TXN-20260926-335)

- **Số claim**: mô tả I3-2 trong biên bản đổi từ "49 hàng claim" thành
  "56 hàng claim qua 5 khối"; rà cả hai docs — không còn số 49 nào mang nghĩa
  số claim hiện hành; checker, log, bảng mutation và biên bản cùng ghi 56.
- **Chuỗi giao dịch**: header cả hai docs liệt kê đủ sáu mã và vai trò —
  TXN-323 lập hồ sơ; TXN-324 vòng sửa chuẩn độc lập; TXN-330 thực hiện pha
  1b; TXN-331 điều phối/tái nghiệm thu pha 1b; TXN-332 vòng đồng bộ tài liệu;
  TXN-333 điều phối/tái nghiệm thu vòng đồng bộ.
- **Hồi quy mới**: I3-7 chặn số hàng claim hiện hành khác 56 (MUT-11 xóa một
  hàng → 55 → fail đúng); I3-8 chặn thiếu một trong sáu mã giao dịch ở header
  hai docs (MUT-12 xóa mã 333 khỏi header hồ sơ → fail đúng). Giữ nguyên
  MUT-1 đến MUT-10 và chạy sạch cuối; lượt chạy sạch không tính là mutation.

## 3. Phát hiện quan trọng trong phiên tra nguồn

- Bài Snowflake đang ghi mặt số lấy cảm hứng từ "dãy núi Hyūga" — sai địa
  danh; bốn trang chính hãng đều ghi dãy núi Hotaka nhìn từ Shinshu Watch
  Studio (Nagano). Ghi trong mục 8.1 hồ sơ, chưa sửa bài (ngoài phạm vi).
- Bài Black Bay ghi BB54 "39mm" — trang chính hãng ghi 37mm; và calibre hiện
  hành là MT5602-U (COSC + METAS), không còn MT5602 thuần.
- Tissot không giải mã tên P/R/X ở bất kỳ trang nào (mô-típ chữ tương tự chỉ
  có ở dòng PRC — lẫn dòng); "bản gốc 1978 chạy quartz" và "nền 2824" chỉ
  thấy ở bán lẻ/blog — loại khỏi pha viết. **Kết luận lịch sử pha 1, đã thay
  thế ở pha 1b**: cả ba mệnh đề đã có nguyên văn chính hãng (mục 2b) và được
  gỡ khỏi cấm viết; giữ cấm duy nhất mệnh đề "độc quyền của Tissot".
- Mã "6217"/"6217-8000" của 62MAS không chứng minh được từ nguồn đạt — hồ sơ
  yêu cầu ghi thêm vào CAN-KIEM-CHUNG.md khi mở pha viết.
- URL hỏng/đã đổi trong phiên kiểm (mục 8.3 hồ sơ): sbga011g soft-404,
  đường caliber 9R65 cũ 404, m79230n-0001 đã rút khỏi site Tudor,
  pressroom Tissot 403, FHH timeout, web.archive.org tạm ngừng — không dùng
  snapshot nào làm bằng chứng.

## 4. Checker nội bộ (output/i3-iconic-source-audit/)

`check-i3-nguon.mjs` (env `I3_DIST` cho mutation):

- I3-1: đủ 5 khối slug + trạng thái hợp lệ + tổng kết tính từ chi tiết
- I3-2: từng hàng claim — URL HTTPS, ngày YYYY-MM-DD hợp lệ, trích ≤25 từ,
  claim bắt buộc có URL (56 hàng claim qua 5 khối)
- I3-3 (chuẩn TXN-20260926-324): khối SẴN SÀNG phải có tối thiểu 2 URL duy
  nhất, từ tối thiểu 2 tổ chức và 2 miền khác nhau — ánh xạ tổ chức theo
  miền (grand-seiko.com, seikowatches.com, museum.seiko.co.jp → Seiko Group;
  tissotwatches.com, eta.ch → Swatch Group; orient-watch.com → Seiko Epson;
  orientwatchusa.com → Epson America; tudorwatch.com → Tudor/Rolex Group)
- I3-4: 29 route nội bộ nêu trong hồ sơ tồn tại trong dist
- I3-5: UTF-8 không BOM + newline cuối

Chạy ĐẠT exit 0 (log `check-i3.log.txt`). Một lỗi thật được checker bắt
trước khi đạt: hai trích tiêu đề Bambino chứa ký tự ống đứng làm lệch cột
bảng — đã sửa trong hồ sơ (giữ phần tên nguyên văn, mã sản phẩm có sẵn trong
URL).

`mutation-i3.mjs` — **12/12 ca mutation ĐẠT, kèm 1 lượt chạy sạch cuối (checker
exit 0)** — cách đếm này thống nhất trong log `mutation-i3.log.txt`, bảng dưới
và biên bản; mỗi ca fail đúng mã, hoàn nguyên byte-đối-byte theo sha256:

| Ca | Đột biến | Bắt đúng |
|---|---|---|
| MUT-1 | Xóa URL của một claim (thay "—") | I3-2 |
| MUT-2 | HTTPS → HTTP | I3-2 |
| MUT-3 | Khối Snowflake bị gán SẴN SÀNG với 1 URL duy nhất | I3-3 (dưới 2 URL) |
| MUT-4 | Lệch tổng kết (0 → 2 SẴN SÀNG) | I3-1 |
| MUT-5 | Ngày kiểm sai (2026-09-32) | I3-2 |
| MUT-6 | Trích vượt 25 từ (+24 từ đệm) | I3-2 |
| MUT-7 (TXN-324) | Khối Snowflake bị gán SẴN SÀNG giữ nguyên 6 URL cùng tổ chức | I3-3 (1 tổ chức/1 miền — hai URL cùng tổ chức không thể giữ SẴN SÀNG) |
| MUT-8 (TXN-330) | Khối 62MAS bị gán SẴN SÀNG — 5 URL khác miền nhưng cùng tổ chức Seiko Group | I3-3 (1 tổ chức, 2 miền — cặp khác miền cùng tổ chức không thể nâng SẴN SÀNG) |
| MUT-9 (TXN-332) | Tái đưa ba claim PRX về phán "LOẠI" trong bảng 8.1 hồ sơ | I3-6a (kết luận hiện hành tái cấm claim đã mở) |
| MUT-10 (TXN-332) | Xóa nhãn "đã thay thế ở pha 1b" khỏi biên bản | I3-6b (kết luận cũ thiếu nhãn lịch sử) |
| MUT-11 (mới, TXN-335) | Xóa một hàng claim Bambino (56 → 55 hàng) | I3-7 (số hàng claim hiện hành lệch 56) |
| MUT-12 (mới, TXN-335) | Xóa mã TXN-20260926-333 khỏi header hồ sơ | I3-8 (thiếu một mã trong chuỗi sáu giao dịch) |

MUT-7 thêm ở TXN-324, MUT-8 ở pha 1b (TXN-330), MUT-9/MUT-10 ở vòng đồng bộ
(TXN-332), MUT-11/MUT-12 ở vòng tối hẹp (TXN-335). MUT-3 giữ vai trò bắt
thiếu URL nhưng đổi đối tượng thành khối bị gán SẴN SÀNG, vì khối Snowflake
hiện là CẦN THU HẸP.

## 5. Kiểm bắt buộc (chạy lại sau vòng tối hẹp TXN-20260926-335)

| Lệnh | Kết quả |
|---|---|
| `node output/i3-iconic-source-audit/check-i3-nguon.mjs` | exit 0 — ĐẠT toàn bộ (56 hàng claim qua 5 khối + hồi quy I3-6a/I3-6b + I3-7 tổng 56 + I3-8 sáu mã giao dịch) |
| `node output/i3-iconic-source-audit/mutation-i3.mjs` | exit 0 — **12/12 ca mutation ĐẠT + 1 lượt chạy sạch cuối exit 0** (lượt chạy sạch không tính là mutation) |
| `node scripts/scan-chars.mjs` | exit 0 — 460 tệp, OK |
| `npm run check:types` | 0 errors, 0 warnings, **4 hints (= baseline)** |
| `git diff --check` / `git diff --cached --check` | sạch cả hai |

Không chạy `npm run check`/`npm run build`: gói chỉ tạo tệp mới trong docs/ và
output/ (nội bộ), tracked sửa 0 — không có thay đổi nào src/, scripts/,
public/, package.json để ảnh hưởng check hoặc build; trang dist hiện hành
không đổi. (Lý do nêu theo yêu cầu đề bài.)

## 6. Trạng thái Git

- HEAD = `9b89d5d` = origin/main; **tracked sửa 2** (đúng hai tệp docs I3 đã
  phát hành).
- Pha 1b (TXN-330/331), vòng đồng bộ (TXN-332) và vòng tối hẹp (TXN-335)
  chỉ chạm hai tệp docs I3 và `output/i3-iconic-source-audit/` (checker thêm
  I3-6/I3-7/I3-8, mutation thêm MUT-9 đến MUT-12, hai log) — không sửa
  `src/`, `public/`, `scripts/`, `package.json`, bài viết, route, dữ liệu.
- Chưa stage, chưa commit, chưa push.
- Đề nghị phát hành (khi được phép): đúng 2 tệp docs (hồ sơ + biên bản);
  output/ giữ nội bộ.
- Chuỗi I3 dừng ở pha nguồn: cả năm mẫu vẫn CẦN THU HẸP — chưa mở viết song
  ngữ.
