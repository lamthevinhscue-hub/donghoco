# Biên bản G07 chặng 1 — Kiểm trùng nội dung, hồ sơ nguồn và đề cương đợt thử

- **Giao việc**: TXN-20260915-16/17 (danh mục DHC-G05G09-20260913)
- **Nền**: `cf650b3` (feat(escapement): add bilingual guided infographic) — HEAD = origin/main tại lúc bắt đầu
- **Ngày thực hiện**: 2026-09-15
- **Phạm vi chặng 1**: chỉ kiểm trùng + hồ sơ nguồn + đề cương. Chưa viết/tích hợp nội dung xuất bản, không sửa src/scripts/package.json.

## 0. Kết luận (đồng bộ vòng sửa 1, TXN-20260915-19)

Chặng 1 hoàn tất dưới dạng **thuần hồ sơ**: đúng **5 tệp mới** của gói (1 biên bản + 4 tệp audit), 0 tệp sửa trong src/scripts/package.json. **Trạng thái Git: tracked và staged sạch (0 tệp tracked bị sửa, 0 staged); các tệp untracked có trước trong repo được giữ nguyên, không thuộc phạm vi gói.** Kiểm trùng 5 chủ đề: **SS1/SS2/HD1/HD2 khuyến nghị bổ sung bài hiện có, chỉ HD3 đề xuất 1 URL mới** — đúng điều kiện "không bắt buộc tạo 5 URL mới" của danh mục. Hồ sơ claim: **26 claim — 13 đủ căn cứ, 7 cần thu hẹp, 5 thiếu nguồn, 1 loại bỏ** (HD2-02 đã hạ từ "đủ căn cứ" xuống "cần thu hẹp" ở vòng sửa 1). Hai phát hiện quan trọng cần GPT Work quyết ở chặng 2: claim **năm 1956** cho dòng đồng hồ max bill (title bài hiện có) và **calibre DUW 4001/53 giờ** (nomos-tangente) — chưa chứng minh được từ nguồn chính hãng ở lượt tra.

**Sửa chính ở vòng 1:** hồ sơ HD2 trước đây dùng FHH để củng cố luận điểm "không có bảng hành vi dùng chung" là **sai mức** — FHH nêu rõ phạm vi sử dụng theo nhóm chuẩn: đồng hồ chống nước theo ISO 2281/NIHS 92-10 "destined for ordinary everyday use, including periods of immersion in water such as leisure swimming" và không dành cho lặn; đồng hồ lặn theo ISO 6425/NIHS 92-11 có ngưỡng riêng. Bốn tệp audit đã đồng bộ theo mức đúng; đường dẫn chặng 2 sửa thành `src/i18n/contentRoutes.ts`; các phương án EN/cặp route ghi rõ là tùy quyết, chưa duyệt.

## 1. Danh sách tệp

### Tạo mới (5)
| Tệp | Nội dung |
|---|---|
| `docs/nghiem-thu/G07-kiem-trung-nguon-va-de-cuong-2026-09-15.md` | biên bản này |
| `output/g07-content-pilot-audit/01-kiem-trung-noi-dung.md` | bảng kiểm trùng 5 chủ đề (câu hỏi người đọc / hiện có / trùng–thiếu / đề nghị / VI–EN / giá trị) |
| `output/g07-content-pilot-audit/02-nguon-va-phuong-thuc-truy-cap.md` | nguồn + phương thức thật (kể cả 403/lỗi) + đầu mối chưa phải bằng chứng |
| `output/g07-content-pilot-audit/03-ho-so-claim.md` | 26 claim × 8 trường, trích nguyên văn |
| `output/g07-content-pilot-audit/04-de-cuong-va-tep-chang-2.md` | đề cương 7 điểm × 5 chủ đề + bảng 10 tệp chặng 2 dự kiến |

### Sửa / xóa: không có

## 2. Kết quả kiểm trùng (tóm tắt — chi tiết tệp 01)

| Chủ đề | Hiện có | Kết luận | Đề nghị |
|---|---|---|---|
| SS1 Submariner–Fifty Fathoms | bối cảnh 1953 đã cẩn thận ở 3 chỗ (bài + historyChapters c4 + timeline.json) | trùng phần nền, thiếu phần so cấp dòng | mục đối chiếu trong 2 bài hiện có; không URL mới; không so thông số reference |
| SS2 Tangente–max bill | relation "hai cách tiếp nối Bauhaus" đã nối 2 bài | trùng khung, thiếu so thiết kế; **phát hiện 2 claim rủi ro** | mục đối chiếu thiết kế sau khi xử lý 2 claim; không URL mới |
| HD1 số chân kính | mục từ `chan-kinh.md` đã trả lời trọn câu hỏi ("Cái bẫy của con số") | trùng gần trọn | bổ sung dẫn FHH vào mục hiện có; không URL mới |
| HD2 chỉ số chống nước | dày nhất: `chong-nuoc.md` (coChe) + `muc-chong-nuoc.md` (huongDan), đủ cặp EN | trùng câu hỏi, thiếu khung chuẩn quốc tế | bổ sung FHH theo **phân nhóm chuẩn** (ISO 2281/NIHS 92-10 sinh hoạt thường ngày gồm bơi giải trí, không dành cho lặn; ISO 6425/NIHS 92-11 đồng hồ lặn); không dùng FHH cho luận điểm "bảng dùng chung"; không URL mới |
| HD3 in-house | **không có khối tổng hợp** (chỉ rải rác trong bài mẫu) | thiếu thật | 1 URL mới (đề xuất `coChe/`), khung ranh giới không giá/đầu tư |

Không sửa công cụ So sánh (G06-B), không đụng sơ đồ tiến hóa/timeline — SS1/SS2 chỉ dẫn về.

## 3. Nguồn và phương thức (chi tiết tệp 02)

- **Đọc được**: FHH từ điển bách khoa qua JSON gốc (560 mục từ — Jewels, Jewel, Manufacture, Movement, Water-resistance, Waterproof…); Blancpain Fifty Fathoms; NOMOS Tangente; Junghans max bill (đường dẫn đúng sau 1 lần redirect). Mọi trích dẫn nguyên văn, ngày truy cập 2026-09-15.
- **Không đọc được — ghi giới hạn**: rolex.com **HTTP 403** (SS1 phía Submariner không có nguồn hãng mới — dùng hồ sơ nội bộ đã kiểm và ghi rõ giới hạn); Blancpain qua web_reader lỗi 500 lần đầu (đạt qua WebFetch sau); Junghans đường dẫn đầu sai (redirect về trang chủ, đã tìm đúng URL).
- **Đầu mối chưa phải bằng chứng**: "since 1961" cho max bill từ trang bán lẻ (không dùng); Cousteau/Le Monde du Silence chưa chứng minh từ nguồn lượt này; trang FHH `/manufacture` (SPA) — định nghĩa đã đủ từ JSON.

## 4. Hồ sơ claim (chi tiết tệp 03)

Tổng **26 claim**: **13 đủ căn cứ** (SS1-01/03, SS2-01/02/03/06/08, HD1-01, HD2-01/03, HD3-01/02/03) · **7 cần thu hẹp** (SS1-06 mốc bezel 1953; SS2-05 DUW 4001; SS2-07 năm 1956; HD1-02/03 cách dẫn dải số; **HD2-02 "mỗi hãng công bố điều kiện riêng" — hạ từ "đủ căn cứ" ở vòng sửa 1 vì FHH nêu rõ phạm vi sử dụng theo nhóm chuẩn, không phải căn cứ cho "không có bảng hành vi dùng chung"**; HD2-04 cách dẫn "waterproof") · **5 thiếu nguồn** (SS1-02 ngoài 403; SS1-04 Cousteau; SS1-05 chống nước 91 m; SS2-04 Berlin; HD3-05 Junghans) · **1 loại bỏ** (HD3-04 "in-house nói lên giá trị" — trái ranh giới đợt thử). Tổng khớp: 13 + 7 + 5 + 1 = 26.

**Đề xuất ghi CAN-KIEM-CHUNG (chờ duyệt, chặng 1 không sửa tệp)**:
1. Năm 1956 cho dòng đồng hồ max bill — trang Junghans chỉ có "remained almost unchanged for 60 years" không năm; title + excerpt + body của `junghans-max-bill.md` đang dùng 1956.
2. Calibre DUW 4001 / 53 giờ cho Tangente lên dây — trang Tangente của NOMOS không nêu DUW 4001 (nêu DUW 6101, DUW 4601 — hand-wound date, 52 giờ); câu này nằm trong body + frontmatter `movement:` của `nomos-tangente.md`, frontmatter dây vào hiển thị công cụ So sánh.

## 5. Đề cương và phạm vi chặng 2 (chi tiết tệp 04)

- 5 đề cương × 7 điểm (câu hỏi đích, luận đề, cấu trúc, claim được phép, tích hợp, VI–EN, ranh giới + điều chưa kết luận).
- Bảng 10 dòng tệp chặng 2 dự kiến (số lượng giữ nguyên, chỉ làm rõ trạng thái): 7 dòng tệp sửa + 1 dòng bài mới (in-house) + `src/i18n/contentRoutes.ts` + `docs/CAN-KIEM-CHUNG.md`. Đường dẫn contentRoutes đã sửa ở vòng 1 — bản trước ghi nhầm vị trí thư mục `src/data/`. Các biến thể EN/cặp route (dòng 2/6/7/8/9 của bảng) ghi rõ là **phương án tùy quyết định, chưa thuộc phạm vi đã duyệt**. Trạng thái tích hợp: **CHƯA KIỂM**.
- Phạm vi VI–EN đề xuất: HD2 song ngữ trọn (cặp sẵn có) — phương án tùy GPT Work quyết, chưa duyệt; SS1/SS2/HD1/HD3 VI trước, cặp EN tùy GPT Work duyệt (Fifty Fathoms, Tangente, max bill, chan-kinh hiện chưa có EN).

## 6. Giới hạn và phát hiện ngoài phạm vi

- Chặng 1 không sửa bất kỳ nội dung xuất bản nào — 2 claim rủi ro (mục 4) **còn nguyên trong bài hiện có**; việc thu hẹp thuộc chặng 2 sau duyệt.
- NOMOS tự mâu thuẫn "25 năm" (meta) vs "30 năm" (thân trang) — hồ sơ chọn thân trang, ghi rõ.
- Câu "ở tầm giá này" trong `nomos-tangente.md` là dư âm tài chính — đã có hồ sơ P1.4, không xử lý trong G07.
- Tiêu đề bài junghans-max-bill.md "Thiết kế 1956 chưa từng đổi" rủi ro nhất vì là title — nếu chặng 2 thu hẹp sẽ đổi title, cần đối chiếu mọi chỗ trích title (card, sitemap title, Pagefind).

## 7. Điểm dừng

**Dừng chờ GPT Work duyệt**: (1) nguồn và 26 hồ sơ claim; (2) đề cương 5 chủ đề (khuyến nghị: không URL mới cho SS1/SS2/HD1/HD2, 1 URL mới cho HD3); (3) danh sách tệp chặng 2; (4) phương án VI–EN từng chủ đề; (5) 2 đề xuất CAN-KIEM-CHUNG. G07 chưa hoàn tất — chưa viết/tích hợp nội dung xuất bản. **Chưa mở G08** (cần anh Vinh xác nhận dòng Speedmaster) và **chưa mở G09**.
