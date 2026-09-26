# Biên bản T1 — hồ sơ nguồn 12 thuật ngữ từ điển bổ trợ

- Giao dịch: TXN-20260926-223 (đề TXN-20260926-222) — hồ sơ nguồn, ngày thực hiện 2026-09-26.
- Nền làm việc: HEAD = `c18a313` = origin/main khi bắt đầu; working tree chỉ có untracked có trước + tệp mới của T1.

## Phạm vi thực hiện

- Chỉ hồ sơ nguồn và quyết định chống trùng cho 12 thuật ngữ: Vành xoay một chiều, Dây đeo liền vỏ, Tần số cao, Dạ quang, Núm vặn ren, Van thoát khí heli, Kính sapphire, Mặt số tráng men, Cọc số gắn nổi, ISO 6425, Manufacture, Établisseur.
- KHÔNG đụng `src/content/`, không tạo mục từ điển, route, checker sản phẩm, schema, term_fr/term_de, dependency.

## Kết quả 12 mục

- Vòng đầu: 0 SẴN SÀNG — 5 CẦN THU HẸP — 6 GỘP — 1 CHƯA ĐỦ NGUỒN (GLM không truy cập được FHH và ISO bằng đường fetch local).
- SAU VÒNG SỬA 1 (TXN-20260926-225): **1 SẴN SÀNG (mục 8) — 5 CẦN THU HẸP (mục 1, 2, 6, 9, 10) — 6 GỘP (mục 3, 4, 5, 7, 11, 12) — 0 CHƯA ĐỦ NGUỒN.** Mâu thuẫn số học nêu GPT Work: phán quyết ghi tổng "1/6/6/0" (13) cho 12 mục; vì phán quyết đồng thời yêu cầu M10 giữ CẦN THU HẸP, tổng nhất quán duy nhất là 1/5/6/0 — hồ sơ và checker kiểm cứng theo 1/5/6/0, chờ xác nhận.
  - M8 → SẴN SÀNG: bổ sung nguồn FHH "Wonders of enamel" (GLM xác minh nguyên văn qua WebFetch 26/09: men là thủy tinh pha oxide kim loại, nung 800–1.200 °C, liên kết bằng hợp luyện; ứng dụng trực tiếp cho mặt số); giữ Donzé làm nguồn độc lập thứ hai.
  - M9 → CẦN THU HẸP (từ CHƯA ĐỦ NGUỒN): bổ sung nguồn FHH "Applied chapter (applique)" — định nghĩa trực tiếp "The hour numerals or decorations that are cut from sheets of metal then affixed to the dial."; chưa đủ nguồn thứ hai độc lập để gọi SẴN SÀNG.
  - M10 giữ CẦN THU HẸP nhưng sửa mô tả truy cập: trang chính thức ISO đọc được đầy đủ qua công cụ đọc web (abstract 3 câu gồm 100 m, hệ thống chỉ thời gian lặn nhìn được trong bóng tối, marking); 403 chỉ xảy ra trên một số đường fetch tự động của GLM.
- Chuẩn không đổi: SẴN SÀNG = ít nhất 2 nguồn HTTPS trực tiếp; không mở rộng danh mục nguồn.
- VÒNG SỬA 2 (TXN-20260926-227): lỗi — bảng "Bảng chống trùng tổng hợp 12 mục" còn ghi M8 là CẦN THU HẸP và M9 là CHƯA ĐỦ NGUỒN (bảng cũ chưa đồng bộ với mục chi tiết M8/M9 sau vòng sửa 1); checker vòng trước chỉ đếm trạng thái tại từng mục nên không bắt được lệch. Đã đồng bộ bảng tổng hợp (M8 = SẴN SÀNG — viết mục mới khi được giao; M9 = CẦN THU HẸP — chờ nguồn thứ hai độc lập với FHH rồi mới viết; dòng M10 đổi "chỉ mô tả catalogue" thành "chỉ mô tả abstract" cho khớp mục chi tiết) và bổ sung kiểm cứng R6b trong kiem-t1.mjs: đọc riêng bảng tổng hợp, đối chiếu trạng thái 12 dòng với trạng thái chi tiết M1–M12, lệch dòng nào fail dòng đó; giữ kiểm tổng 1/5/6/0. Không thay đổi kết quả nguồn hay phạm vi.

## Phát hiện lệch đề (đề ghi minh bạch để đối chiếu)

1. URL ISO trong đề (`iso.org/standard/74335.html`) là chuẩn khác (ISO 13061-5 — gỗ); URL đúng của ISO 6425:2018 là `iso.org/standard/66517.html`. Trang chính thức đọc được đầy đủ (web_reader 26/09: abstract 3 câu — yêu cầu/phương pháp thử, 100 m, hệ thống chỉ thời gian lặn, marking); một số đường fetch tự động của GLM (Node, WebFetch) trả 403 — hạn chế công cụ. Bản lưu Wayback 2025-04-23 đối chiếu khớp. Nội dung đầy đủ của chuẩn trả phí.
2. Miền Donzé trong đề (`cadrans-donze.ch`) NXDOMAIN; tên miền đúng là `donze-cadrans.com` (200).
3. URL collection Royal Oak trong đề trả 404; trang hiện hành `audemarspiguet.com/com/en/collections/royal-oak.html` (200) có mệnh đề "integrated bracelet" nguyên văn — đã dùng URL hiện hành.

## Lý do không chạy build

T1 không thay đổi tệp nào thuộc đường build (`src/`, `public/`, `scripts/`, `package.json` untouched) — build chỉ đọc những cây đó và không phản ánh thay đổi tài liệu biên tập trong `docs/`. Build xanh tham chiếu: lần chạy gần nhất trên nền HEAD hiện hành (khi phát hành K2) exit 0, 338 trang.

## Kiểm tra đã chạy

- Script tự kiểm `output/t1-glossary-source-audit/kiem-t1.mjs` — kết quả ghi trong `output/t1-glossary-source-audit/kiem-t1.log.txt`: đếm 12 mục + trạng thái hợp lệ + **tổng phân loại cứng 1/5/6/0** (mâu thuẫn số học với "1/6/6/0" trong đề — đã nêu); mọi URL HTTPS trong hồ sơ thuộc danh sách nguồn (11 URL, truy cập lại thật trong ngày 2026-09-26: 2xx, hoặc chặn/lỗi-mạng-Node với URL đã ghi chú "đọc được qua công cụ đọc web") hoặc danh sách không-làm-nguồn (4 URL); 19 route nội bộ tồn tại trong dist; bảng chống trùng đủ 12 dòng; 2 tệp docs UTF-8 no BOM + newline cuối.
- `node scripts/scan-chars.mjs` — kết quả ghi biên bản này sau khi chạy.
- `git diff --check` — sạch (T1 chỉ thêm tệp mới, không sửa tracked).
- Trạng thái Git cuối vòng sửa 1: 2 tệp docs + 2 tệp output (sửa tại chỗ, thêm vong-sua-1.py/vong-sua-1b.py làm vết), tracked khác 0, staged 0, chưa commit, chưa push — DỪNG chờ GPT Work tái nghiệm thu.
