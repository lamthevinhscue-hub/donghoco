# Hồ sơ nguồn L1 — ba mốc lịch sử còn thiếu

- Giao dịch: TXN-20260926-271/272 (danh mục DHC-GD3-20260925 v1.0.0)
- Ngày kiểm nguồn: 2026-09-27 (mọi trích dưới đây lấy hoặc tái kiểm trong ngày này)
- Căn cứ khuôn: `docs/nghiem-thu/G02-chuan-hoa-nguon-lich-su-2026-09-12.md` (schema `year`/`timeLabel`/`dayType`/`claimLevel`/`claimScope`/`limit`/`sources`, bộ mức chứng minh và quy tắc chữ "đầu tiên")
- Căn cứ kế hoạch: `docs/KE-HOACH-HOP-NHAT-GIAI-DOAN-3-2026-09-25.md` mục L1
- Nguyên tắc: chỉ dùng dữ kiện có câu nguyên văn từ nguồn trực tiếp; không suy luận năm, người phát minh, bằng sáng chế, thông số hay quan hệ nhân quả; không dùng Wikipedia; không lấy một trang tổng quan hợp thức hóa nhiều claim
- Phân loại tổng kết: **3 SẴN SÀNG / 0 CẦN THU HẸP / 0 CHƯA ĐỦ NGUỒN** — không ép; từng mốc có nguồn trực tiếp bảo tàng/nguồn chỉ định

## Tổng kết ba mốc

| # | Slug dự kiến | Năm (mốc thời gian) | Trạng thái |
|---|---|---|---|
| L1-1 | `lever-escapement` | 1754 (nhãn 1754–1770) | SẴN SÀNG |
| L1-2 | `harrison-h4-longitude` | 1761 (nhãn 1761–1765) | SẴN SÀNG |
| L1-3 | `self-winding-pocket-watch` | 1884 (nhãn "khoảng 1884") | SẴN SÀNG |

---

## Mốc L1-1 — Bộ thoát móc (lever escapement)

- **Trạng thái: SẴN SÀNG**

- **Slug dự kiến:** `lever-escapement`
- **Vị trí chèn dự kiến:** giữa `blancpain` (1735) và `vacheron-constantin` (1755) trong `src/data/timeline.json`
- **Năm / nhãn thời gian:** `year: 1754`; `timeLabel: "1754–1770"` — cả hai mốc thời gian đều có câu nguyên văn trực tiếp từ Royal Collection Trust (phát minh 1754; chiếc ứng dụng đầu tiên đã biết chế tác 1770)
- **Loại ngày:** "Phát minh (ứng dụng đầu tiên đã biết 1770)"
- **Claim hiển thị dự kiến:**
  - VI: "Thomas Mudge phát minh bộ thoát móc năm 1754; chiếc đồng hồ Nữ hoàng Charlotte chế tác 1770 là ứng dụng đầu tiên đã biết của cơ chế này — tiền thân của hầu hết đồng hồ bỏ túi và đeo tay hiện đại."
  - EN: "Thomas Mudge invented the lever escapement in 1754; Queen Charlotte's watch, made in 1770, is the earliest known application of this mechanism — the forerunner of almost all modern wrist and pocket watches."
- **claimLevel:** `first-known` (chữ "đầu tiên"/"earliest known" đi kèm giới hạn "theo Royal Collection Trust" và "appears to have been")
- **claimScope:** Royal Collection Trust (Anh), bổ sung Science Museum Group và British Museum
- **Giới hạn:** RCT ghi "appears to have been the first one to incorporate" — mức "đầu tiên đã biết", không khẳng định tuyệt đối; câu "perhaps the most historically important watch in the world" là nhận định được trích trong ngoặc kép của RCT, dùng có trích dẫn hoặc bỏ

### Bảng claim L1-1

| # | Claim được chứng minh | Nguồn | Trích nguyên văn (tiếng Anh) | Ngày kiểm | Mức tin cậy |
|---|---|---|---|---|---|
| 1a | Mudge phát minh bộ thoát móc năm 1754 | S1 — Royal Collection Trust, https://www.rct.uk/collection/63759 | "Thomas Mudge invented the lever escapement in 1754" | 2026-09-27 | Bảo tàng chính thức (Royal Collection Trust) — cấp một |
| 1b | Chiếc 1770 là ứng dụng đầu tiên đã biết | S1 — Royal Collection Trust, https://www.rct.uk/collection/63759 | "this watch, made in 1770, appears to have been the first one to incorporate this important innovation" | 2026-09-27 | Bảo tàng chính thức — cấp một |
| 1c | Ý nghĩa: tiền thân của đồng hồ hiện đại | S1 — Royal Collection Trust, https://www.rct.uk/collection/63759 | "the forerunner of almost all modern wrist and pocket watches" | 2026-09-27 | Bảo tàng chính thức — cấp một |
| 1d | Mudge gắn với lever escapement; quan trọng cho đồng hồ | S2 — Science Museum Group, https://collection.sciencemuseumgroup.org.uk/objects/co65463/engraving-of-oil-painting-portrait-of-thomas-mudge-1799 | "Thomas Mudge invented the 'lever escapement', crucial in the improvement of watches" | 2026-09-27 | Bảo tàng chính thức (SMG) — cấp một |
| 1e | Cơ chế "Mudge's lever escapement" dùng trong đồng hồ của Mudge | S3 — British Museum, https://www.britishmuseum.org/collection/object/H_1995-0207.1 | "Eight-day spring-driven movement with fusees and Mudge's lever escapement." | 2026-09-27 | Bảo tàng chính thức (BM) — cấp một |

### Nguồn L1-1

- S1: https://www.rct.uk/collection/63759 — "Queen Charlotte's Lever Watch and Pedestal 1770", maker Thomas Mudge (1715/6–94); RCIN 63759. Công cụ: web_reader (WebFetch/curl 403).
- S2: https://collection.sciencemuseumgroup.org.uk/objects/co65463/engraving-of-oil-painting-portrait-of-thomas-mudge-1799 — meta description của trang object. Công cụ: curl với User-Agent trình duyệt (HTTP 200).
- S3: https://www.britishmuseum.org/collection/object/H_1995-0207.1 — travelling clock của Thomas Mudge. Công cụ: web_reader (WebFetch/curl dính Cloudflare).

---

## Mốc L1-2 — Đồng hồ hàng hải và bài toán kinh độ

- **Trạng thái: SẴN SÀNG**

- **Slug dự kiến:** `harrison-h4-longitude`
- **Vị trí chèn dự kiến:** giữa `vacheron-constantin` (1755) và `breguet-tourbillon` (1801)
- **Năm / nhãn thời gian:** `year: 1761`; `timeLabel: "1761–1765"` — 1761: chuyến thử nghiệm tới Jamaica được phê chuẩn; 1765: khuyến nghị thưởng được luật hóa (Longitude Act 10/5/1765). Cả hai có câu nguyên văn trực tiếp
- **Loại ngày:** "Thử nghiệm trên biển (Longitude Act mới 1765)"
- **Claim hiển thị dự kiến:**
  - VI: "Đồng hồ H4 của John Harrison được phê chuẩn thử nghiệm kinh độ trên chuyến đi Jamaica (1761). Kết quả được xác nhận nằm trong giới hạn khắt khe nhất của Đạo luật 1714; khuyến nghị của Board of Longitude — thưởng £10.000 khi Harrison chứng minh nguyên lý H4 — trở thành luật trong Đạo luật kinh độ mới ngày 10/5/1765. Quốc hội quyết định Harrison được thưởng cho công lao phục vụ quốc gia, và Harrison đi vào lịch sử như người giải được bài toán kinh độ."
  - EN: "John Harrison's H4 was cleared for a longitude sea trial to Jamaica (1761). Its performance was confirmed within the most stringent limits of the 1714 Act; the Board of Longitude's recommendations became law in the new Longitude Act of 10 May 1765, and Parliament ruled that Harrison should be rewarded for his services to the nation. Harrison is remembered in history as solving the problem of longitude."
- **claimLevel:** `recorded` (đủ câu nguyên văn trực tiếp; không dùng chữ "đầu tiên")
- **claimScope:** Royal Museums Greenwich (Anh) — nguồn chỉ định trực tiếp của kế hoạch L1
- **Giới hạn:** trang RMG ghi tranh chấp sau thử nghiệm (kết quả thử tại Royal Observatory 1766, Harrison phản bác) — nếu hiển thị thêm chi tiết phải kèm giới hạn này; RMG cũng ghi chronometer ban đầu đắt và phổ biến chậm; trang KHÔNG nêu 1759 hay 1773 — không dùng hai năm đó

### Bảng claim L1-2

| # | Claim được chứng minh | Nguồn | Trích nguyên văn (tiếng Anh) | Ngày kiểm | Mức tin cậy |
|---|---|---|---|---|---|
| 2a | 1761: phê chuẩn thử nghiệm H4 trên chuyến đi Jamaica | N1 — Royal Museums Greenwich, https://www.rmg.co.uk/harrison | "In 1761 the Commissioners gave permission for Harrison's son, William, to prepare for a voyage to Jamaica to trial the H4 timekeeper." | 2026-09-27 | Bảo tàng chính thức (Royal Museums Greenwich) — cấp một, nguồn chỉ định của kế hoạch |
| 2b | Kết quả xác nhận đạt giới hạn Đạo luật 1714 | N1 — Royal Museums Greenwich, https://www.rmg.co.uk/harrison | "It was confirmed that John Harrison's timekeeper had kept time within the most stringent limits of the 1714 Act." | 2026-09-27 | Bảo tàng chính thức — cấp một |
| 2c | Khuyến nghị của Board of Longitude (thưởng £10.000 khi chứng minh nguyên lý H4) trở thành luật trong Longitude Act 10/5/1765 | N1 — Royal Museums Greenwich, https://www.rmg.co.uk/harrison | "The Board's recommendation was that parliament should award Harrison £10,000, when he demonstrated the principles of H4." + "The recommendations became law in the new Longitude Act of 10 May 1765." | 2026-09-27 | Bảo tàng chính thức — cấp một |
| 2e | Parliament quyết định Harrison được thưởng cho công lao phục vụ quốc gia (không gắn năm — câu nguồn không nêu năm) | N1 — Royal Museums Greenwich, https://www.rmg.co.uk/harrison | "Parliament ruled that Harrison should be rewarded for his services to the nation, no doubt with the King's encouragement." | 2026-09-27 | Bảo tàng chính thức — cấp một |
| 2d | Harrison được nhớ đến như người giải bài toán kinh độ | N1 — Royal Museums Greenwich, https://www.rmg.co.uk/harrison | "Harrison is remembered in history as solving the problem of longitude." | 2026-09-27 | Bảo tàng chính thức — cấp một |

### Nguồn L1-2

- N1: https://www.rmg.co.uk/harrison — bài "Longitude found: the story of Harrison's timekeepers" (Royal Museums Greenwich). Công cụ: WebFetch (HTTP 200, nội dung đầy đủ). LƯU Ý: đây là nguồn duy nhất của mốc trong lượt này — là nguồn chỉ định trực tiếp của kế hoạch và cấp một; nếu cần nguồn thứ hai, đề xuất bổ sung trang đối tượng H4 của RMG khi xác định được URL đúng (URL rmgt 67106 thử trong lượt này trỏ sang đối tượng khác — xem mục "Bị loại").

---

## Mốc L1-3 — Đồng hồ bỏ túi tự lên dây

- **Trạng thái: SẴN SÀNG**

- **Slug dự kiến:** `self-winding-pocket-watch`
- **Vị trí chèn dự kiến:** giữa `patek-first-wristwatch` (1868) và `universal-time-1884` (1884) — trùng năm 1884 với `universal-time-1884` (hợp lệ: timeline đã có hai mốc 1953, hai mốc 1931)
- **Năm / nhãn thời gian:** `year: 1884`; `timeLabel: "khoảng 1884"` — nguồn trực tiếp ghi "made about 1884"
- **Loại ngày:** "Chế tác (niên đại xấp xỉ)"
- **Claim hiển thị dự kiến:**
  - VI: "Tại Vienna, Loehr chế tác đồng hồ bỏ túi tự lên dây (khoảng 1884): bơ lên dây di chuyển theo chuyển động của người đeo để lên dây cho bộ máy."
  - EN: "In Vienna, Loehr made a self-winding pocket watch (about 1884): an oscillating weight winds the movement as the wearer moves."
- **claimLevel:** `recorded` (niên đại xấp xỉ theo trang bảo tàng; không dùng "đầu tiên")
- **claimScope:** Science Museum Group (Anh) — nguồn bảo tàng tương đương theo điều khoản kế hoạch; ghi rõ KHÔNG phải bảo tàng Thụy Sĩ (xem mục Bị loại)
- **Giới hạn:** niên đại "about 1884" là xấp xỉ theo bảo tàng; nguồn xác nhận một hiện vật cụ thể, không khẳng định Loehr là người phát minh tự lên dây, không nêu quan hệ với Perrelet/Sarton

### Bảng claim L1-3

| # | Claim được chứng minh | Nguồn | Trích nguyên văn (tiếng Anh) | Ngày kiểm | Mức tin cậy |
|---|---|---|---|---|---|
| 3a | Đồng hồ bỏ túi tự lên dây, Loehr Vienna, khoảng 1884 | N1 — Science Museum Group, https://collection.sciencemuseumgroup.org.uk/objects/co861/self-winding-pocket-watch-in-square-silver-case | "Self-winding pocket watch, by Loehr, Vienna, made about 1884, with a nickelled going-barrel movement wound by an oscillating weight as the wearer moves" | 2026-09-27 | Bảo tàng chính thức (SMG) — cấp một; lấy từ meta description của trang object, HTTP 200 |
| 3b | Cơ chế: bơ di chuyển theo chuyển động người đeo lên dây bộ máy; có chỉ báo trữ cót | N1 — Science Museum Group, https://collection.sciencemuseumgroup.org.uk/objects/co861/self-winding-pocket-watch-in-square-silver-case | "wound by an oscillating weight as the wearer moves … with subsidiary indication for seconds and power reserve, signed Loehr Patent" | 2026-09-27 | Bảo tàng chính thức — cấp một |

### Nguồn L1-3

- N1: https://collection.sciencemuseumgroup.org.uk/objects/co861/self-winding-pocket-watch-in-square-silver-case — object "Self winding pocket watch in square, silver case". Công cụ: curl với User-Agent trình duyệt (HTTP 200).

---

## Dữ kiện bị loại / cần nguồn tiếp

| Dữ kiện | Trạng thái | Lý do |
|---|---|---|
| Perrelet tự lên dây bỏ túi ~1770 (Thụy Sĩ) | CẦN NGUỒN TIẾP | lượt tra chưa tìm được trang bảo tàng Thụy Sĩ (MIH/Beyer/Château des Monts) có nguyên văn xác nhận; các nguồn tìm thấy là trang thương hiệu/bách khoa toàn mở — không dùng. Nếu có nguồn, có thể nâng mốc L1-3 lên giai đoạn thế kỷ 18 hoặc thêm mốc riêng |
| Sarton (Liège, ~1778) | CẦN NGUỒN TIẾP | tương tự — chưa có trang bảo tàng trực tiếp |
| Năm 1759 (H4 hoàn thành) và 1773 (được bồi thường) | KHÔNG DÙNG | trang RMG đã kiểm KHÔNG nêu hai năm này; mốc L1-2 chỉ dùng 1761/1765 |
| Production date 1768–1770 của BM travelling clock | KHÔNG DÙNG | xuất hiện trong snippet công cụ tìm kiếm, không render được trực tiếp từ trang — không tính là kiểm trực tiếp |
| Câu "perhaps the most historically important watch in the world" | DÙNG CÓ TRÍCH | nhận định của RCT — chỉ hiển thị trong ngoặc kép kèm tên nguồn, hoặc bỏ |
| Mudge "developed marine chronometer, following the earlier work of John Harrison" (SMG) | DÙNG CÓ TRÍCH nếu cần | trích nguyên văn có trong hồ sơ; không suy quan hệ nhân quả beyond trích |

## Bảng chống trùng và chèn dự kiến (đủ ba dòng)

| Mốc L1 | Đối chiếu timeline.json (32 mốc) | Đối chiếu historyChapters.ts (6 chương) | Chèn dự kiến |
|---|---|---|---|
| L1-1 `lever-escapement` (1754) | không trùng slug/năm | thuộc phạm vi chương "Mang theo được và điều hòa nhịp" | chèn giữa `blancpain` (1735) và `vacheron-constantin` (1755) |
| L1-2 `harrison-h4-longitude` (1761) | không trùng slug/năm | cùng chương trên | giữa `vacheron-constantin` (1755) và `breguet-tourbillon` (1801) |
| L1-3 `self-winding-pocket-watch` (1884) | không trùng slug; năm 1884 trùng `universal-time-1884` (đã có tiền lệ hai mốc cùng năm: 1931, 1953) | thuộc chương "Đồng hồ đến cổ tay" hoặc kề ranh chương — nêu phương án, không sửa | giữa `patek-first-wristwatch` (1868) và `universal-time-1884` (1884) |

## Giới hạn chung của lượt tra cứu

- WebFetch bị 403 với collection.sciencemuseumgroup.org.uk (trang search) và britishmuseum.org (Cloudflare); các object SMG fetch được bằng curl với User-Agent trình duyệt; rct.uk và britishmuseum.org đọc được qua web_reader
- mih.ch đọc chậm/không ổn định qua các công cụ; Beyer chỉ có trang collection chung, không có câu nguyên văn về tự lên dây; Château des Monts không có nội dung Perrelet/self-winding
- Chỉ ghi nhận các câu trích nguyên văn lấy trực tiếp trong ngày 2026-09-27; snippet công cụ tìm kiếm không được tính là kiểm trực tiếp
- Mọi truy cập là đọc công khai; không có dữ kiện nhạy cảm trong gói
