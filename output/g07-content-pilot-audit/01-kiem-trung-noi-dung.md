# G07 chặng 1 — Kiểm trùng nội dung hiện có theo 5 chủ đề

Nền `cf650b3` · 2026-09-15 · Chỉ đọc repo, không sửa src/scripts/package.json.
Trạng thái mọi đề xuất tích hợp ở dưới đây: **CHƯA KIỂM** (chờ GPT Work duyệt nguồn và đề cương; chặng 2 mới viết nội dung).

Cách đọc cột "trùng–thiếu": "trùng" = nội dung hiện có đã trả lời được phần nào câu hỏi (đề nghị bổ sung thay vì tạo URL mới); "thiếu" = chưa có khối nào gánh được câu hỏi.

---

## SS1 — Submariner ↔ Fifty Fathoms (so sánh cấp dòng lịch sử)

| Mục | Nội dung |
|---|---|
| Câu hỏi người đọc | "Hai mẫu lặn ra đời cùng 1953 — chúng khác nhau ở đâu, và chuyện 'ai trước ai' nói lên điều gì?" |
| Nội dung hiện có | `src/content/mauIconic/vi/fifty-fathoms.md` — mục "Ra đời trong yêu cầu từ thực chiến" (câu kết đã nêu "Rolex Submariner ra đời cũng trong năm 1953"), mục "Jacques Cousteau và "Le Monde du Silence"", danh sách mốc mẫu. `src/content/mauIconic/vi/rolex-submariner.md` — mục "Bối cảnh ra đời" (có cặp EN). `src/data/historyChapters.ts` chương c4 — lead đã xử lý thẳng vấn đề: "Cùng năm 1953 có hai đồng hồ lặn ra đời — điều đó không nói lên ai sao chép ai". `src/data/timeline.json` — 2 mốc 1953 (Fifty Fathoms ghi "theo hãng là đồng hồ lặn hiện đại đầu tiên"). `src/data/submarinerEvolution.ts` — 8 mốc, quy tắc "thà thiếu còn hơn sai", tham chiếu 6204/1953. |
| Trùng–thiếu | Trùng: bối cảnh 1953, nguyên tắc "cùng năm ≠ sao chép" đã có ở ba chỗ và viết đã cẩn thận. Thiếu: chưa có đâu gom so sánh cùng cấp (bezel một chiều, tiêu chuẩn độ chịu nước thời kỳ, yêu cầu quân sự Pháp) — các bài hiện có chỉ dẫn từng mẫu. |
| Đề nghị | Bài so sánh **cấp dòng lịch sử**, không so thông số reference cụ thể, không ghép thông số hiện đại vào mẫu 1953 (khớp điều kiện nghiệm thu danh mục). Gắn qua trường relation của hai bài hiện có. |
| Phạm vi VI–EN | Fifty Fathoms hiện **chưa có cặp EN** (chỉ Submariner có). Bài so sánh nếu làm cần quyết: làm cặp VI+EN kèm cặp Fifty Fathoms EN, hoặc chỉ VI trước. |
| Giá trị bổ sung | Cao nếu tránh lặp: phần mới duy nhất là "so ở cấp dòng", còn bối cảnh thì dẫn về bài cũ thay vì kể lại. |

## SS2 — NOMOS Tangente ↔ Junghans max bill (so ngôn ngữ thiết kế)

| Mục | Nội dung |
|---|---|
| Câu hỏi người đọc | "Hai chiếc Bauhaus của Đức đọc như thế nào trên tay — chữ số, mặt số, cấu trúc — và hai hãng diễn giải sự tối giản khác nhau ra sao?" |
| Nội dung hiện có | `src/content/mauIconic/vi/nomos-tangente.md` — excerpt "bán chạy liên tục hơn ba thập kỷ", mục kỹ thuật "tự làm bộ thoát NOMOS swing system", mục "Kỹ thuật phía sau" (calibre DUW 4001, 53 giờ). `src/content/mauIconic/vi/junghans-max-bill.md` — title "Thiết kế 1956 chưa từng đổi", body "Hai chiếc đồng hồ Max Bill đầu tiên ra đời **năm 1956**… **Max Bill là học trò Bauhaus, làm việc không dùng chi tiết trang trí thừa**". Hai bài đã có trường relation chung: "Hai cách tiếp nối tinh thần Bauhaus trong đồng hồ Đức…". Chỉ hai bài này của SS2 chưa có cặp EN trong nhóm. |
| Trùng–thiếu | Trùng: relation đã nối hai bài và đã đặt đúng khung "hai cách tiếp nối" (không phải quan hệ lịch sử). Thiếu: chưa có phần so chi tiết khả năng đọc mặt số và cấu trúc thiết kế. **Rủi ro claim phát hiện**: trang junghans.de (2026-09-15) chỉ xác nhận "học trò Bauhaus" và "remained almost unchanged for 60 years", **không có năm 1956 cho đồng hồ**; trang nomos-glashuette.com không nêu DUW 4001 (trang Tangente nêu DUW 6101/DUW 4601). Chi tiết ở `03-ho-so-claim.md` (SS2-03, SS2-05). |
| Đề nghị | Bài so sánh ngôn ngữ thiết kế — khả năng đọc — cấu trúc, đúng phạm vi danh mục; **không** biến ảnh hưởng thiết kế thành quan hệ lịch sử. Chặng 2 phải kèm việc thu hẹp 2 claim năm/calibre ở hai bài hiện có (hoặc ghi CAN-KIEM-CHUNG) trước khi so. |
| Phạm vi VI–EN | Hai bài gốc chưa có EN. Nếu so sánh làm cặp VI+EN thì kéo theo 2 cặp bài gốc — gói lớn; đề xuất được GPT Work cân nhắc phạm vi. |
| Giá trị bổ sung | Trung bình–cao; điều kiện là xử lý xong 2 claim rủi ro, nếu không bài so sánh sẽ nhân bản claim chưa chứng minh. |

## HD1 — Số chân kính (hiểu đúng)

| Mục | Nội dung |
|---|---|
| Câu hỏi người đọc | "Chân kính nhiều hơn có nghĩa là bộ máy tốt hơn không?" |
| Nội dung hiện có | `src/content/tuDien/vi/chan-kinh.md` — excerpt đã ghi "Số chân kính không tỷ lệ thuận với chất lượng"; mục "Cái bẫy của con số" giải thích đủ: dải 17–21 cho bộ máy ba kim, 25–40 thường đi kèm cơ cấu phức tạp chứ không phải chất lượng. **Chưa có trang EN** cho mục này trong tuDien. |
| Trùng–thiếu | Trùng gần như trọn câu hỏi — khối hiểu đúng này **đã tồn tại** ở mục từ điển. Thiếu: chưa có nguồn tham chiếu ngoài nào được dẫn (mục viết theo kinh nghiệm bộ máy, hợp lệ nhưng không có đối chiếu). |
| Đề nghị | **Ưu tiên bổ sung bài hiện có** (đúng điều kiện nghiệm thu danh mục): thêm dẫn nguồn quốc tế vào mục "Cái bẫy của con số" thay vì tạo URL mới. FHH có mục từ "Jewels" nêu "quality watch has between 15 and 21 jewels" — dùng đúng cách: trích kèm ngữ cảnh, không rút thành bảng số. Không tạo URL mới cho HD1 ở đợt thử. |
| Phạm vi VI–EN | Bổ sung trước ở VI; cặp EN chỉ khi duyệt (quy ước i18n hiện hành: chưa dịch thì ẩn ở English). |
| Giá trị bổ sung | Trung bình: giá trị nằm ở nguồn đối chiếu, không ở câu hỏi mới. |

## HD2 — Chỉ số chống nước (hiểu đúng)

| Mục | Nội dung |
|---|---|
| Câu hỏi người đọc | "Số 30 m/50 m/100 m trên mặt số hiểu thế nào, có bơi được không?" |
| Nội dung hiện có | `src/content/coChe/vi/chong-nuoc.md` — 9 mục, có sẵn "Vì sao không có bảng dùng chung?" và "Những hiểu lầm cần bỏ" (có cặp EN water-resistance). `src/content/huongDan/vi/muc-chong-nuoc.md` — "mỗi hãng công bố mức và điều kiện riêng" (có cặp EN). Nguồn Seiko/Omega của cụm đã hồ sơ ở P35. |
| Trùng–thiếu | Trùng hoàn toàn về câu hỏi — đây là chủ đề có nội dung sẵn dày nhất. Thiếu: một khung chuẩn quốc tế trung lập (hiện chỉ có nguồn hãng cụ thể). |
| Đề nghị | Bổ sung bài hiện có: dẫn FHH mục "Water-resistance" cho **khung phân loại theo nhóm chuẩn** — đồng hồ chống nước theo NIHS 92-10 (ISO-2281): dùng sinh hoạt thường ngày, gồm cả bơi giải trí, không dành cho lặn dưới nước; đồng hồ lặn theo NIHS 92-11 (ISO 6425): ngưỡng riêng từ 100 m. Chuẩn nói phạm vi sử dụng ở cấp nhóm, không thay thế hướng dẫn của hãng cho từng mẫu; không tự dựng bảng quy đổi m/ATM phổ quát nếu chưa có nguồn trực tiếp; không dùng FHH làm căn cứ cho khẳng định hay phủ nhận "bảng hành vi dùng chung". Cẩn trọng: mục "Waterproof" của FHH ("lý thuyết không vào nước tới 3 atm hoặc 30 m") dễ bị đọc thành quy tắc chung kiểu "30 m không bơi được" — nếu dẫn phải giữ khung "theo FHH", đúng chính sách cụm bảo dưỡng. |
| Phạm vi VI–EN | Cả hai trang đã có cặp EN — phương án bổ sung song ngữ khả thi, không phát sinh trang mới; thuộc quyết định phạm vi của GPT Work, chưa được duyệt. |
| Giá trị bổ sung | Trung bình: thêm khung phân loại chuẩn quốc tế cạnh nguồn hãng, giúp người đọc đặt số chống nước vào đúng nhóm phạm vi. |

## HD3 — Bộ máy in-house (hiểu đúng)

| Mục | Nội dung |
|---|---|
| Câu hỏi người đọc | "In-house nghĩa là gì, và nó tự nó nói lên điều gì về chiếc đồng hồ?" |
| Nội dung hiện có | **Chưa có khối tổng hợp** — thuật ngữ chỉ xuất hiện rải rác trong bài mẫu: nomos-tangente (swing system, DUW), fifty-fathoms (calibre 1315), breitling-navitimer, chopard-luc, cartier-tank, hajime-asaoka. TuDien chưa có mục từ cho "in-house"/"manufacture". Công cụ So sánh (G06-B) không có trường này. |
| Trùng–thiếu | **Thiếu thật** — chủ đề duy nhất trong 5 chưa có chỗ nào gánh được câu hỏi. Ứng viên URL mới mạnh nhất của đợt thử, nhưng phải thỏa đủ "câu hỏi độc lập + nguồn + liên kết biên tập". |
| Đề nghị | Bài/khối mới đặt khung định nghĩa: FHH "Manufacture" (ngữ cảnh ngành Thụy Sĩ — phải giữ đúng ngữ cảnh khi áp cho hãng Đức), NOMOS "twelfth caliber to be produced by NOMOS in-house" + "proprietary escapement" làm ví dụ có nguồn. Ranh giới cấm: không kéo sang giá trị, giữ giá, "đáng tiền hơn" (đúng điều kiện danh mục). Junghans chưa có tuyên bố in-house từ trang hãng ở lượt tra này — đề cương không đặt claim in-house cho Junghans. |
| Phạm vi VI–EN | Đề xuất: VI trước, cặp EN khi GPT Work duyệt phạm vi. |
| Giá trị bổ sung | Cao nhất trong 5 chủ đề về độ phủ mới, kèm rủi ro cao nhất về le thanh tài chính — cần khung ranh giới rõ ở đề cương. |

---

## Chú ý hiện trạng không thuộc 5 chủ đề nhưng chạm phạm vi

- Công cụ So sánh `/so-sanh` (G06-B) so được thông số mọi mẫu iconic: SS1/SS2 nếu làm bài so **không** thêm trường vào công cụ này (giới hạn đợt thử); frontmatter `movement:` của nomos-tangente.md có dây chuyền vào hiển thị công cụ — nếu chặng 2 sửa claim DUW 4001 phải kiểm cạnh hiển thị công cụ.
- Sơ đồ tiến hóa Submariner (`submarinerEvolution.ts`) và timeline.json: SS1 dẫn về, không sửa số mốc.
