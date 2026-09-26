# Biên bản L1 — Hồ sơ nguồn ba mốc lịch sử còn thiếu

- Giao dịch: TXN-20260926-271/272 (danh mục DHC-GD3-20260925 v1.0.0)
- Ngày thực hiện: 27/09/2026
- Nền đầu phiên: HEAD = origin/main = `dbffc889c99b101fce042f230d94a997a26faf6e` (`feat(tools): add local accuracy log`), staged = 0, tracked sửa 0
- Gói chỉ tạo hồ sơ nguồn + bằng chứng nội bộ ngoài đường build — **không chạy `npm run check`/build** vì không đụng `src/`, `public/`, `scripts/`, `package.json` hay bất kỳ tệp nào nằm trong chuỗi build; kiểm thay thế: script tự kiểm + `scan-chars` + hai diff check (kết quả mục 6)

## 1. Tệp tạo

| Tệp | Nội dung |
| --- | --- |
| `docs/ho-so-nguon-L1-ba-moc-lich-su-2026-09-27.md` | Hồ sơ nguồn ba mốc L1 (mục L1-1/L1-2/L1-3, bảng claim, nguồn, bị loại, chống trùng) |
| `docs/nghiem-thu/L1-ho-so-nguon-ba-moc-lich-su-2026-09-27.md` | Biên bản này |
| `output/l1-history-source-audit/kiem-l1.mjs` | Script tự kiểm hồ sơ (7 nhóm) |
| `output/l1-history-source-audit/kiem-l1.log.txt` | Log chạy tự kiểm |
| `output/l1-history-source-audit/kiem-l1-mutation.log.txt` | Log 4 ca mutation trên bản sao tạm |
| `output/l1-history-source-audit/mutation-l1.mjs` | Kịch bản mutation (xóa nguồn claim; sai URL; sai ngày; lệch trạng thái) |

Không đụng: `src/` (kể cả `timeline.json`, `historyChapters.ts` — chỉ đối chiếu đọc), `public/`, `scripts/`, `package.json`, ảnh, route, i18n, cấu hình.

## 2. Phân loại ba mốc và nguồn

| # | Mốc | Trạng thái | Nguồn dùng (toàn bộ HTTPS, kiểm 2026-09-27) |
| --- | --- | --- | --- |
| L1-1 | Bộ thoát móc — `lever-escapement`, year 1754, nhãn 1754–1770 | SẴN SÀNG | S1 Royal Collection Trust rct.uk/collection/63759 (web_reader); S2 Science Museum Group co65463 chân dung Mudge (curl UA, HTTP 200); S3 British Museum H_1995-0207.1 (web_reader) |
| L1-2 | Hàng hải & kinh độ — `harrison-h4-longitude`, year 1761, nhãn 1761–1765 | SẴN SÀNG | N1 Royal Museums Greenwich rmg.co.uk/harrison (WebFetch HTTP 200) — nguồn chỉ định trực tiếp của kế hoạch; một nguồn duy nhất trong lượt này (ghi minh bạch, đề xuất bổ sung trang object H4 khi xác định được URL đúng — URL rmgt 67106 thử trỏ sang đối tượng khác). **Vòng sửa chứng cứ (TXN-274): claim 2c thu hẹp — chỉ "khuyến nghị của Board trở thành luật (Longitude Act 10/5/1765)"; thêm 2e "Parliament ruled that Harrison should be rewarded" không gắn năm** |
| L1-3 | Bỏ túi tự lên dây — `self-winding-pocket-watch`, year 1884, nhãn "khoảng 1884" | SẴN SÀNG | N1 Science Museum Group co861 self-winding pocket watch by Loehr, Vienna (curl UA, HTTP 200) — "nguồn bảo tàng tương đương" theo điều khoản kế hoạch; KHÔNG phải bảo tàng Thụy Sĩ. **Vòng sửa CSV: claim thu hẹp — bỏ mệnh đề "trước thời đại tự động đeo tay"** |

Không ép đủ ba mốc SẴN SÀNG: cả ba đều có ít nhất một câu nguyên văn trực tiếp từ trang bảo tàng chính thức kiểm cùng ngày; các phần thiếu nguồn được tách sang mục "bị loại/cần nguồn tiếp" thay vì khép vào claim.

## 3. Nguồn bị loại / cần nguồn tiếp

- Perrelet ~1770 (Thụy Sĩ) và Sarton ~1778: **CẦN NGUỒN TIẾP** — lượt tra (bao gồm hai lượt agent chuyên trách) không tìm được trang bảo tàng Thụy Sĩ có nguyên văn xác nhận; các trang tìm thấy là thương hiệu/bách khoa mở — không dùng. Mốc L1-3 chọn hiện vật Loehr ~1884 của SMG thay vì Perrelet 1770
- 1759 (H4 hoàn thành) và 1773 (bồi thường): trang RMG kiểm không nêu → không dùng
- 1768–1770 của BM travelling clock: chỉ có trong snippet tìm kiếm → không tính kiểm trực tiếp
- URL rmgt 67106: tồn tại nhưng trỏ sang đối tượng khác → loại khỏi nguồn

## 4. Giới hạn

- L1-1: chữ "đầu tiên" là "earliest known / appears to have been" theo RCT — claimLevel `first-known`; câu "perhaps the most historically important watch in the world" chỉ dùng có trích
- L1-2: tranh chấp sau thử nghiệm 1766 (RMG ghi) phải giữ nếu hiển thị chi tiết; không dùng 1759/1773
- L1-3: niên đại "about 1884" xấp xỉ; không khẳng định Loehr là người phát minh tự lên dây, không suy quan hệ Perrelet/Sarton
- Không đề xuất ảnh/SVG/bài đọc thêm/thay đổi giao diện trong gói này

## 5. Mutation (bản sao tạm `%TEMP%\l1-sandbox-*` — log `kiem-l1-mutation.log.txt`, cập nhật vòng sửa checker hẹp TXN-276)

7 ca, mỗi ca bị script bắt đúng, hoàn nguyên byte-đối-byte, chạy sạch cuối exit 0:

| Ca | Phép đột biến | Nhóm bắt |
| --- | --- | --- |
| M1 | Xóa nguồn của một claim (hàng 1b) | L1-4 FAIL: thiếu claim 1b |
| M2 | Làm sai URL (https → http tại S1) | L1-2 FAIL: URL không HTTPS |
| M3 | Làm sai ngày kiểm (2026-09-27 → 2026-99-99) | L1-3 FAIL: ngày không hợp lệ |
| M4 | Lệch trạng thái tổng hợp (L1-2 SẴN SÀNG → CẦN THU HẸP chỉ trong bảng tổng kết) | L1-5 FAIL: lệch mục/tổng kết |
| M5 | Chèn lại mệnh đề vượt nguồn ("Quốc hội trao thưởng Harrison năm 1765") | L1-8 FAIL: gán Quốc hội trao thưởng + gắn 1765 |
| M6 | Chèn lại mệnh đề vượt nguồn EN ("before the age of the automatic wristwatch") | L1-8 FAIL: mệnh đề không có trong nguồn |
| M-J | Xóa hàng claim 2e (Parliament ruled) | L1-4 FAIL: "Thiếu claim: 2e" — vòng sửa checker hẹp TXN-276: tập ID bắt buộc bổ sung 2e, số tổng tính từ mảng ID; vòng trước từng bỏ sót 2e (thông báo "12 claim" đối chiếu danh sách 11 ID) |

## 6. Kết quả kiểm bắt buộc

| Kiểm | Kết quả |
| --- | --- |
| `node output/l1-history-source-audit/kiem-l1.mjs` | exit 0 — L1-1..L1-7 ĐẠT (log `kiem-l1.log.txt`) |
| `node scripts/scan-chars.mjs` | OK — không ký tự ngoài tiếng Việt/Anh |
| `git diff --check` | sạch |
| `git diff --cached --check` | sạch (không có gì staged) |
| `npm run check` / `npm run build` | KHÔNG chạy — gói chỉ tạo tệp ngoài đường build (docs/ + output/), không có tệp nằm trong chuỗi build để kiểm |

## 7. Trạng thái Git cuối phiên

- HEAD = origin/main = `dbffc889c99b101fce042f230d94a997a26faf6e` — chưa commit, chưa push, staged = 0
- Tracked sửa 0; tệp mới: 2 tệp docs (trên) + thư mục `output/l1-history-source-audit/` (nội bộ)
- Untracked có trước giữ nguyên

Điểm chưa giải quyết: không có.
