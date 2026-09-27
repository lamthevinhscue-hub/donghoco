# I3 pha 1 — Hồ sơ nguồn năm mẫu ưu tiên Việt Nam — Biên bản thực hiện

- Giao dịch: TXN-20260926-323 (lập hồ sơ, 27/09) và TXN-20260926-324 (vòng
  sửa nguồn và hồ sơ, 28/09) — hai giao dịch kế tiếp trong cùng gói I3 pha 1,
  danh mục DHC-GD3-20260925; hồ sơ lập tại 323, vòng sửa tại 324
- Nền repo: `043be67` (= origin/main khi bắt đầu và giữ nguyên tới hết vòng
  sửa; không stage, không commit, không push)
- Trạng thái: **VÒNG SỬA TXN-20260926-324 HOÀN THÀNH — DỪNG CHỜ GPT WORK TÁI
  NGHIỆM THU**

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
| tissot-prx | CẦN THU HẸP | 1978 (2 URL), Powermatic 80/Nivachron (tissotwatches.com + eta.ch) đạt; ý nghĩa tên P/R/X, "bản gốc 1978 chạy quartz", "nền ETA 2824" không có nguồn — loại; mệnh đề "độc quyền của Tissot" phải bỏ |
| orient-bambino | CẦN THU HẸP | Nguồn đạt chỉ ở cấp phân phối chính thức (orientwatchusa.com, một domain + một câu meta của orient-watch.com); nguồn frontmatter hiện có (Monochrome, WatchRanker, Relojes Wiki) không đạt chuẩn — thay; mẹo chữ mặt số và mốc 2022 không nguồn |

Hồ sơ `docs/ho-so-nguon-I3-nam-mau-uu-tien-viet-nam-2026-09-27.md` chốt lại
theo mục: phương pháp (1), tổng kết (2), năm khối mẫu 3–7 (mỗi khối: trạng
thái + bảng claim 6 cột với URL HTTPS, trích nguyên văn ≤25 từ, ngày kiểm,
cấp nguồn, giới hạn diễn đạt), mục 8 (claim bị loại / chưa chứng minh / URL
hỏng / điều cấm viết), mục 9 (bảng chống trùng đủ năm mẫu), mục 10 (phạm vi
Việt/Anh — cả năm chưa có EN, chỉ ghi nhận), mục 11 (việc khi mở pha viết).

Tổng kết sau vòng sửa TXN-20260926-324: 0 SẴN SÀNG, 5 CẦN THU HẸP, 0 CHƯA ĐỦ
NGUỒN. Pha kế tiếp là thu hẹp/bổ sung nguồn cho cả năm mẫu; chưa mở pha viết
song ngữ mẫu nào.

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

## 3. Phát hiện quan trọng trong phiên tra nguồn

- Bài Snowflake đang ghi mặt số lấy cảm hứng từ "dãy núi Hyūga" — sai địa
  danh; bốn trang chính hãng đều ghi dãy núi Hotaka nhìn từ Shinshu Watch
  Studio (Nagano). Ghi trong mục 8.1 hồ sơ, chưa sửa bài (ngoài phạm vi).
- Bài Black Bay ghi BB54 "39mm" — trang chính hãng ghi 37mm; và calibre hiện
  hành là MT5602-U (COSC + METAS), không còn MT5602 thuần.
- Tissot không giải mã tên P/R/X ở bất kỳ trang nào (mô-típ chữ tương tự chỉ
  có ở dòng PRC — lẫn dòng); "bản gốc 1978 chạy quartz" và "nền 2824" chỉ
  thấy ở bán lẻ/blog — loại khỏi pha viết.
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
  claim bắt buộc có URL (49 hàng claim qua 5 khối)
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

`mutation-i3.mjs` — **7/7 ca mutation ĐẠT, kèm 1 lượt chạy sạch cuối (checker
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
| MUT-7 (mới, TXN-324) | Khối Snowflake bị gán SẴN SÀNG giữ nguyên 6 URL cùng tổ chức | I3-3 (chỉ 1 tổ chức/1 miền — hai URL cùng tổ chức không thể giữ SẴN SÀNG) |

MUT-7 là ca mới bổ sung trong vòng sửa: checker in "6 URL duy nhất,
1 tổ chức (Seiko Group), 1 miền" và fail đúng I3-3 — chứng minh chuẩn độc lập
mới có kiểm cứng. MUT-3 giữ vai trò cũ (bắt thiếu URL) nhưng đổi đối tượng
thành khối bị gán SẴN SÀNG, vì khối Snowflake hiện là CẦN THU HẸP.

## 5. Kiểm bắt buộc (chạy lại sau vòng sửa TXN-20260926-324)

| Lệnh | Kết quả |
|---|---|
| `node output/i3-iconic-source-audit/check-i3-nguon.mjs` | exit 0 — ĐẠT toàn bộ |
| `node output/i3-iconic-source-audit/mutation-i3.mjs` | exit 0 — **7/7 ca mutation ĐẠT + 1 lượt chạy sạch cuối exit 0** |
| `node scripts/scan-chars.mjs` | exit 0 — 460 tệp, OK |
| `npm run check:types` | 0 errors, 0 warnings, **4 hints (= baseline)** — tại vòng TXN-323 một hint ts6133 mới do biến không dùng trong checker đã gỡ bằng cách dùng biến trong regex; vòng TXN-324 không phát sinh hint mới |
| `git diff --check` / `git diff --cached --check` | sạch cả hai |

Không chạy `npm run check`/`npm run build`: gói chỉ tạo tệp mới trong docs/ và
output/ (nội bộ), tracked sửa 0 — không có thay đổi nào src/, scripts/,
public/, package.json để ảnh hưởng check hoặc build; trang dist hiện hành
không đổi. (Lý do nêu theo yêu cầu đề bài.)

## 6. Trạng thái Git

- HEAD = `043be67` = origin/main; **tracked sửa 0**.
- Vòng sửa TXN-20260926-324 chỉ chạm hai tệp docs I3 và
  `output/i3-iconic-source-audit/` (checker, mutation, hai log) — không sửa
  `src/`, `public/`, `scripts/`, `package.json`, bài viết, route, dữ liệu.
- Tệp mới (untracked): `docs/ho-so-nguon-I3-nam-mau-uu-tien-viet-nam-2026-09-27.md`,
  `docs/nghiem-thu/I3-ho-so-nguon-nam-mau-uu-tien-viet-nam-2026-09-27.md`,
  `output/i3-iconic-source-audit/` (giữ nội bộ).
- Chưa stage, chưa commit, chưa push.
- Đề nghị phát hành (khi được phép): 2 tệp docs (hồ sơ + biên bản);
  output/ giữ nội bộ.
