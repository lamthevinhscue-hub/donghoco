# Biên bản I2 — hồ sơ nguồn năm mẫu kinh điển

- Giao dịch: TXN-20260926-237 (danh mục TXN-20260926-236) — hồ sơ nguồn, ngày thực hiện 2026-09-26.
- Nền: xác nhận trước khi làm — HEAD = origin/main = `6983fc7`, staged 0, tracked sửa 0 (git log -5: 6983fc7 → 8e223c6); untracked có trước giữ nguyên.

## Phạm vi thực hiện

- Chỉ tạo 2 tệp tài liệu: `docs/ho-so-nguon-I2-nam-mau-kinh-dien-2026-09-26.md` + biên bản này; bằng chứng, checker, log tại `output/i2-iconic-source-audit/`.
- KHÔNG đụng `src/`, `public/`, `scripts/`, `package.json`, `vercel.json`, tài liệu kế hoạch, bài hiện có, dữ liệu sơ đồ; KHÔNG dịch Monaco sang EN; KHÔNG tạo ảnh; KHÔNG giá bán/giữ giá/lời khuyên đầu tư.

## Kết quả 5 mẫu

- 5/5 SẴN SÀNG — kết quả bằng chứng (mỗi mẫu ≥2 URL chính hãng/archive trong khối), không phải mục tiêu đặt trước:
  - Reverso: 2 URL JLC (reverso-history + manufacture-history; WebFetch timeout — curl HTTP 200 HTML đầy đủ).
  - Cartier Tank: 3 URL cartier.com (bài hiện có chỉ có 1 nguồn — đã bổ sung 2 URL: trang "legend/design/history" + trang sản phẩm Tank Louis Cartier CRWGTA0011).
  - Fifty Fathoms: 3 URL blancpain (collections + trang fifty-fathoms + Lettres du Brassus issue-13 — archive hãng).
  - El Primero: 3 URL zenith (timeline + collection Chronomaster + manufacture; 403 trên đường fetch — nội dung qua công cụ đọc web; bài hiện có chỉ 1 nguồn — đã bổ sung).
  - Monaco: 2 URL tagheuer (our-story/history HTTP 200; collection-monaco 403 trên đường fetch — meta description qua công cụ đọc web).
- Hiện trạng Monaco chưa có EN: chỉ ghi nhận, không tạo/dịch/route.
- Không dataset tiến hóa riêng cho cả 5 mẫu; timeline có các mốc liên quan: 1931 Reverso, 1953 Fifty Fathoms (+1735 Blancpain), 1969 cuộc đua chronograph tự động (nhắc El Primero/Monaco/Heuer); timeline không có mốc Tank.

## Điểm đáng lưu ý / lệch đề ghi minh bạch

1. URL Smithsonian-kiểu không có ở I2, nhưng có các URL đề xuất chết/rỗng đã bị loại và ghi rõ: blancpain 5015-3603c-63b1 (404), zenith defy-el-primero-21 + chronomaster-heritage (không truy cập được bằng mọi công cụ), tagheuer heritage (khung rỗng JS), cartier tank-louis-cartier.html (404/403), JLC "1931 Polo Club" (SPA rỗng), FHH glossary el-primero/chronograph/reverso/tank (shell redirect/rỗng) — I2 không có trích FHH nào.
2. Claim bị loại đáng chú ý: Reverso etymology Latin + tên "Cottier" (đúng là Chauvot); Tank 1919/chiến hào/Renault/vỏ hộp chữ nhật; Fifty Fathoms quy đổi 91 m/300 ft + từ "unidirectional"; El Primero etymology Esperanto + Charles Vermot; Monaco Steve McQueen/Le Mans 1971 (title bài VI hiện có nhắc McQueen — viết sâu phải có nguồn riêng hoặc bỏ) + mệnh đề gộp "vuông + chống nước + đầu tiên".
3. Mệnh đề "world's first automatic chronograph" (Zenith) và "world's first automatic chronographs" (Heuer) là mệnh đề từng hãng tự công bố — hồ sơ buộc viết kèm nguồn và góc hãng, không khái quát toàn ngành.

## Lý do không chạy build

I2 không thay đổi tệp nào thuộc đường build (`src/`, `public/`, `scripts/`, `package.json`, `vercel.json` untouched) — build không phản ánh thay đổi hồ sơ tài liệu trong `docs/`.

## Kiểm tra đã chạy

- Checker `output/i2-iconic-source-audit/kiem-i2.mjs` — kết quả trong `kiem-i2.log.txt`: đủ 5 mẫu + trạng thái; tổng cứng 5 SẴN SÀNG / 0 / 0; R2c mỗi mẫu SẴN SÀNG ≥2 URL nguồn trong khối (ranh giới khối cắt đúng); 24 URL khớp 2 danh sách (13 nguồn HTTPS + 11 không-làm-nguồn); truy cập lại 13 URL nguồn (2xx, hoặc đúng ngoại lệ allowlist hẹp theo từng URL + mã + bằng chứng đọc trang sống ghi trong hồ sơ; lỗi mạng/timeout luôn FAIL); mọi route nội bộ tồn tại trong dist (VI + EN; Monaco không có EN — không nêu route EN); bảng chống trùng 5 dòng + đồng bộ trạng thái với chi tiết; 2 tệp docs UTF-8 no BOM + newline cuối.
- Mutation ngoài repo (bản sao `D:/i2-mut-*`): (1) hỏng route nội bộ → checker phải fail R5; (2) mẫu SẴN SÀNG còn dưới hai URL trong khối (bỏ 1 URL khối Monaco — mẫu chỉ có 2 URL) → fail R2c M5; (3) đổi mã ngoại lệ hẹp (nếu có) → fail R4; hoàn nguyên byte-đối-byte từng ca (SHA-256 khớp) rồi chạy sạch lại — log `kiem-i2-mutation-{a,b,c}.log.txt`.
- `node scripts/scan-chars.mjs`, `git diff --check`, `git diff --cached --check` — kết quả ghi dưới (báo cáo).

- VÒNG SỬA 1 (TXN-20260926-239): lỗi đồng bộ số liệu URL — ba số liệu ghi tay không khớp nhau: hồ sơ ghi "13 nguồn + 9 không-làm-nguồn", comment R3 của checker ghi "13 nguồn + 10", trong khi danh sách thực tế và R3b đều là **13 nguồn + 11 không-làm-nguồn = 24 URL**. Đã sửa đồng bộ mọi nơi về 13/11/24; checker không còn ghi tay số trong comment/thông báo R3/R3b/R4 (sinh bằng URL_NGUON.length / URL_KHONG_LAM_NGUON.length) và thêm kiểm cứng R3d: URL_NGUON.length === 13 && URL_KHONG_LAM_NGUON.length === 11, sai một trong hai phải FAIL. Không thay claim, URL, allowlist, trạng thái 5/5 hay phạm vi viết.

## Trạng thái Git cuối vòng

- 2 tệp docs mới (untracked) + `output/i2-iconic-source-audit/` (nội bộ, không commit); tracked sửa 0; staged 0; chưa commit, chưa push — DỪNG chờ GPT Work nghiệm thu.
