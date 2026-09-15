# G07 chặng 1 — Nguồn tra cứu và phương thức truy cập thật

Ngày truy cập mọi nguồn dưới đây: **2026-09-15**. Ghi đúng phương thức đã dùng, kể cả thất bại — không dựng trích dẫn cho nguồn không đọc được.

## Nguồn đọc được

| Nguồn | URL | Phương thức | Kết quả |
|---|---|---|---|
| FHH từ điển bách khoa (JSON gốc) | `https://www.hautehorlogerie.org/json/en/search/encyclopedia-glossary-{1,2,3}.json` | Tải JSON gốc (site là SPA, trang HTML rỗng với bot); tệp đã lưu tại `output/g06-escapement-en-audit/fhh-glossary-{1,2,3}.json` và đọc lại hôm nay | 560 mục từ; lấy nguyên văn mục: Jewels, Jewel, Manufacture, Movement, Water-resistance, Waterproof, Shock absorber. **Ghi chú vòng sửa 1**: mục "Water-resistance" nêu phạm vi sử dụng **theo nhóm chuẩn** — ISO 2281/NIHS 92-10: sinh hoạt thường ngày gồm bơi giải trí, không dành cho lặn dưới nước; ISO 6425/NIHS 92-11: đồng hồ lặn từ 100 m. FHH không phát biểu về "bảng hành vi dùng chung" |
| Blancpain — Fifty Fathoms | `https://www.blancpain.com/en/fifty-fathoms` | web_reader lần 1: lỗi mạng 500 (không đọc được, thử lại bằng cách khác); WebFetch: thành công | Xác nhận 1953 + "first modern diver's watch" + trích thư nghiệm Operation HARDTACK 1959. Không nhắc Cousteau; không có thông số kỹ thuật từng mẫu |
| NOMOS Glashütte — Tangente | `https://www.nomos-glashuette.com/tangente` | web_reader + WebFetch | Xác nhận "bestseller more than 30 years", "first NOMOS watch", swing system, DUW 6101/DUW 4601, đường kính 33–41 mm. **Lưu ý nguồn tự mâu thuẫn**: mô tả meta ghi "over 25 years" trong khi thân trang ghi "more than 30 years" — chỉ trích thân trang khi dùng |
| Junghans — max bill | `https://junghans.de/en/collection/watches-all/junghans-max-bill/` | web_reader thử `…/en/junghans/watches/max-bill` → redirect về trang chủ (đường dẫn sai); tìm đúng URL qua WebSearch rồi WebFetch thành công | Xác nhận "As a Bauhaus student, he worked without ornaments or embellishments", "remained almost unchanged for 60 years". Không có năm thiết kế, không có calibre trên trang bộ sưu tập |

## Nguồn không đọc được — ghi giới hạn, không dựng trích dẫn

| Nguồn | Phương thức | Kết quả | Hệ quả |
|---|---|---|---|
| Rolex — Submariner `https://www.rolex.com/en-us/watches/submariner` | WebFetch | **HTTP 403 Forbidden** (chặn truy cập tự động) | SS1 không có tuyên bố chính hãng Rolex ở lượt này. Phía Submariner chỉ dựa dữ liệu đã kiểm trong repo (`submarinerEvolution.ts` — quy tắc "thà thiếu còn hơn sai") và ghi rõ giới hạn trong bài nếu làm |
| Blancpain (web_reader) | web_reader | Lỗi mạng 500 lần 1 | Đã đạt qua WebFetch ở lượt sau; không dùng nội dung lần lỗi |

## Đầu mối chưa phải bằng chứng (chờ chặng 2)

- "max bill almost unchanged since 1961" — từ trang bán lẻ Feldmar hiện qua kết quả tìm kiếm; **không dùng làm bằng chứng** (không phải nguồn hãng), chỉ là đầu mối để chặng 2 tra mốc năm của dòng đồng hồ max bill.
- Cousteau / Le Monde du Silence (1956) đeo Fifty Fathoms — đã có trong bài hiện có nhưng **chưa chứng minh được từ nguồn thu được ở lượt này** (trang Blancpain không nhắc); chặng 2 cần nguồn hợp lệ hoặc rút khỏi phạm vi so sánh.
- FHH có trang bách khoa riêng `/manufacture` — URL đã thấy trong JSON nhưng nội dung trang chưa đọc được ở lượt này (SPA); định nghĩa "Manufacture" đã đủ từ JSON mục từ.

## Quy tắc đã giữ khi tra cứu

- Không tự cộng quyền truy cập: mỗi con số/năm/calibre dưới đây chỉ tính là "có nguồn" khi trích được từ một trong các nguồn đọc được ở bảng trên.
- Mọi trích dẫn giữ nguyên văn tiếng Anh gốc, kể cả chỗ nguồn tự mâu thuẫn (NOMOS 25/30 năm) — không lược sửa.
