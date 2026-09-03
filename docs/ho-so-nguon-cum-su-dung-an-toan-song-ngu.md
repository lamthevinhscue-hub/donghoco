# Hồ sơ nguồn — Cụm "Sử dụng an toàn hằng ngày" song ngữ (Prompt 35)

Ngày rà soát: 03/09/2026

Phạm vi: 6 bài tiếng Việt (`huongDan/vi/len-day-dong-ho.md`, `huongDan/vi/muc-chong-nuoc.md`, `huongDan/vi/chinh-lich-an-toan.md`, `coChe/vi/chong-nuoc.md`, `tuDien/vi/num-van.md`, `tuDien/vi/day-cot.md`) chuẩn hóa trước, rồi dịch thành 6 bài tiếng Anh (`huongDan/en/winding-a-mechanical-watch.md`, `huongDan/en/water-resistance.md`, `huongDan/en/setting-the-date-safely.md`, `coChe/en/water-resistance.md`, `tuDien/en/crown.md`, `tuDien/en/mainspring.md`), cùng hồ sơ này và biên bản nghiệm thu.

Ngoài 6 bài, cụm có 1 công cụ tương tác `src/components/interactive/DateSafety.astro` (chỉ render tiếng Việt) — **ngoài phạm vi Prompt 35, không sửa**. Bài vi diễn đạt lại tham chiếu dụng cụ ("khoảng 20:00–04:00 là ví dụ minh họa") để không mâu thuẫn với nguyên tắc "khung giờ tùy calibre" — đây là điểm cần theo dõi ở gói sau nếu muốn chuẩn hóa cả dụng cụ.

## 1. Nguồn đã tra và nguyên văn nâng đỡ

### OMEGA — FAQ "Using your OMEGA watch" (web_reader 03/09/2026)

URL: <https://www.omegawatches.com/en-us/customer-service/faq/using-your-omega-watch>

Nâng đỡ (nguyên văn chính):

- Chu kỳ bảo dưỡng (kèm phạm vi hãng): "We recommend that you have the **water-resistance checked every year** and a **full service performed every 5 to 8 years**."
- Chống nước theo điều kiện: "All current OMEGA watches are water resistant **to the depth defined by the model specifications, provided that the components ensuring the water resistance are intact**."
- Gioăng: "the water resistance of a watch is ensured by **gaskets** placed between the **crown, the pushers, the crystal, and the watch case**. These gaskets **deteriorate over time** under the influence of external factors such as temperature variations, pollution or chemicals and **must be regularly replaced**."
- Va chạm: "**heavy impacts** on the crown, pushers or helium valve are known to **affect the water resistance** and should be avoided."
- 5 mẹo chính hãng: kiểm tra chống nước hằng năm tại trung tâm bảo trì chính hãng; "Always **rinse your watch with tap water after swimming in salt water**"; screw-in crown — "always **screw it in after handling it**"; núm thường — đẩy sát vỏ; "Avoid operating the **chronograph pushers under water**… Exceptions: the **Seamaster 300M and 600M chronographs** are equipped with pushers that **can be operated under water**."
- Nhiệt độ vận hành tối ưu: "between **0°C and 60°C**."
- Lên dây: "Instructions for **winding your watch can be found in the user manual**." — Omega không công bố con số vòng áp dụng chung.
- Chiều vặn và tiếng tách (kèm phạm vi hãng): "When winding the crown **clockwise**, do you hear or feel a clicking? **Mechanical OMEGA watches** produce a clicking sound or feel when the crown is wound."
- Automatic trữ cót thiếu: "If your watch **has not been worn for several days** or if your **wrist movement is insufficient**… the power reserve of your watch will be **less than its maximum capacity**. In this case, it is **necessary to wind it manually, following the instructions given in the user manual**."
- Watch winder: có thể dùng để giữ trữ cót trong khuyến nghị của calibre.

### SEIKO — FAQ "Water Resistance" (web_reader 03/09/2026)

URL: <https://www.seikowatches.com/us-en/customerservice/faq/general-information-8>

Nâng đỡ:

- Chống nước không vĩnh viễn: "A watch's water resistance is **not permanently guaranteed**. It is affected by the **ageing of gaskets** or **deformation of watch parts due to accidental shock**."
- Bảng dùng được **của Seiko cho sản phẩm Seiko** (theo BAR khắc trên vỏ): 3BAR — tia nước văng, mưa; 5BAR — thêm bơi, du thuyền, **tắm vòi sen**; 10/15/20BAR — thêm tắm, lặn nông; Diver's 200m — thêm lặn bình khí; Professional Diver's 1000m — thêm lặn bão hòa.
- Chăm sóc: lau khô bằng vải mềm; "After using a water resistant watch in ocean water, **wash it in fresh water**"; "**Do not wash a water resistant watch while the crown is pulled out**"; "**Avoid washing a water resistant watch directly under running water** — wash it in still water in a sink or a receptacle."

**Điểm quan trọng**: bảng Seiko **cho phép tắm vòi sen từ 5BAR** — khác khuyến cáo phổ thông "50m không nên tắm" đang có trong bài Việt. Cùng một con số, các hãng công bố khác nhau (Omega: mức theo thông số mẫu, kèm điều kiện gioăng nguyên vẹn; Seiko: bảng theo BAR). Vì vậy bảng "mức → được làm gì" **không thể trình bày như dữ kiện khách quan dùng chung** — phải gắn "theo công bố của từng hãng" và "manual của đúng mẫu là chuẩn".

### SEIKO — Hướng dẫn chỉnh giờ/ngày Caliber 6L37 (web_reader 03/09/2026)

URL: <https://www.seikowatches.com/instructions/html/SEIKO_6L37_D_EN/BONDSYcuynbssw>

Nâng đỡ (nguyên văn chính):

- "The date changes around 12 o'clock midnight."
- "**CAUTION: Do not set the date between 9:00 p.m. and 1:00 a.m.** Amending the date during this time period may cause problems such as the date failing to change the next day."
- "**Avoid amending the date when the watch is displaying between 9 PM and 1 AM. Doing so may cause damage.**"
- "Return the screw down crown fully to its original position."

**Điểm quan trọng**: khung giờ nên tránh của Seiko 6L37 là **21:00–01:00** — khác khoảng "20:00–04:00" đang được bài Việt trình bày như dữ kiện chung. Đây là bằng chứng trực tiếp cho nguyên tắc: **khung giờ nên tránh tùy calibre, chỉ manual của đúng bộ máy là chuẩn; không tạo một "khung giờ cấm" phổ quát**.

### Fondation de la Haute Horlogerie — Crown (web_reader 03/09/2026)

URL: <https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/crown-watchmaking>

Nâng đỡ: định nghĩa núm vặn — "a **knurled or fluted button** of various shapes, held between the thumb and forefinger and **used to wind the watch**"; một số núm tích hợp nút bấm cho chronograph. (Lịch sử núm vặn — John Arnold, Breguet, Adrien Philippe — có trong trang nhưng cụm này không dùng làm claim trong bài.)

### Fondation de la Haute Horlogerie — Barrel (web_reader 03/09/2026)

URL: <https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/barrel>

Nâng đỡ: "The barrel, which **contains the mainspring**, turns freely on its arbor. The mainspring is **hooked to the barrel at its outer extremity and to the arbor at its inner extremity**. The barrel wheel **meshes with the first pinion of the geartrain**. As it slowly rotates, its arc varies from **one-ninth to one-sixth of a revolution per hour**."

### Nguồn tham chiếu nêu tên nhưng không trích nguyên văn được

- **ISO 22810 / ISO 6425**: các URL iso.org hiện có trong 2 bài chống nước trả **HTTP 403 cho công cụ truy cập tự động** — không trích được nguyên văn nội dung. Vì vậy các chi tiết số của chuẩn (ví dụ "test 125% áp suất") **không được dùng làm claim trong bài**; bài chỉ nêu tên chuẩn lặn chuyên biệt như một khái niệm và nâng phần mô tả bằng bảng công khai của Seiko (mức BAR + hoạt động) và câu điều kiện của Omega. Các URL ISO giữ trong `sources` với vai trò tham chiếu tên chuẩn.

## 2. Claim không đủ nguồn — đã bỏ hoặc viết lại

| Claim cũ trong 6 bài Việt | Quyết định | Căn cứ |
|---|---|---|
| "vặn 20–40 vòng / 20–30 vòng / 10–15 vòng" | **Bỏ toàn bộ con số vòng** — không hãng nào công bố số vòng áp dụng chung; chỉ còn "theo manual của từng hãng" + nguyên tắc an toàn (chậm, đều, dừng khi gặp lực cản rõ, không ép) | OMEGA: "Instructions for winding… in the user manual" |
| "vặn đến khi cảm thấy căng nhẹ/cứng hơn" như mục tiêu | Bỏ mục tiêu "vặn đến căng"; chỉ giữ cảnh báo dừng khi lực cản tăng rõ | Đề + không nguồn |
| "đeo đủ 8 giờ/ngày là tự đầy"; "bỏ ra trên 2 ngày"; "70h power reserve" | Bỏ các con số; viết có điều kiện theo manual | Không nguồn |
| "vặn mỗi ngày vào cùng một giờ → chính xác hơn" | Bỏ khuyến nghị giờ cố định | Không nguồn |
| "cầm lơ lửng dễ cong núm"; "vặn chậm tránh ma sát sinh nhiệt"; "để cạn lâu làm biến dạng dây" | Bỏ 3 lý do không nguồn; giữ ý vặn cẩn thận/đều | Không nguồn |
| "hầu hết đồng hồ không lên cót khi vặn ngược" | Hạ thành "một số thiết kế chỉ lên cót một chiều — xem manual" | Không nguồn khái quát |
| "automatic có slipping mainspring chống vặn quá" | Hạ thành "một số thiết kế có biện pháp riêng của hãng" | Không nguồn trong cụm |
| "khi rút núm chỉnh giờ, bánh lắc dừng (stop-seconds)" | Bỏ mục | Không nguồn trong cụm |
| Bảng "30m/50m/100m → được làm gì" như dữ kiện chung | Giữ bảng nhưng đặt tiêu đề **bảng quy đổi phổ thông tham khảo**, gắn kèm **bảng công bố của Seiko theo BAR** (nguyên văn mức) và câu "manual của đúng mẫu luôn chuẩn"; Omega công bố theo điều kiện sản phẩm nguyên vẹn | Seiko bảng BAR; OMEGA "provided that the components… are intact" |
| "vung tay tạo áp suất cỡ vài ATM"; "nhảy từ thuyền áp suất gấp nhiều lần" | Bỏ số và khẳng định vật lý không nguồn | Không nguồn |
| "gioăng FKM/Viton — Rolex, Omega dùng loại này"; danh sách NBR/FKM/Teflon | Bỏ vật liệu và tên hãng; chỉ giữ "gioăng lão hóa theo thời gian, phải thay định kỳ" | OMEGA gaskets "deteriorate over time… must be regularly replaced" |
| Quy trình test "giữ 24 giờ"; dry test/wet test chi tiết; "đồng hồ cao cấp test cả hai" | Bỏ chi tiết quy trình; chỉ còn "mang tới trung tâm bảo trì/thợ có thiết bị kiểm tra áp suất" | Không nguồn chi tiết |
| "gioăng già 3–5 năm"; "kiểm tra hàng năm / hai năm một lần" | Bỏ số tự đặt; dùng khuyến nghị có nguồn kèm phạm vi: "OMEGA khuyến nghị kiểm tra chống nước hằng năm và full service 5–8 năm cho sản phẩm Omega; các hãng khác có khuyến nghị riêng" | OMEGA nguyên văn |
| ISO 6425 "test 125% áp suất, nhiều vị trí, nhiệt độ, từ trường, sốc" | Bỏ các con số chi tiết; chỉ nêu tên chuẩn lặn chuyên biệt | ISO không trích được nguyên văn (403) |
| "200m Diver's (như Submariner) thì thực sự tin được để lặn"; relatedModels Submariner "chuẩn ISO 6425" | Viết lại theo công bố của hãng mẫu; relation Submariner đổi thành "đồng hồ lặn minh họa cách đọc hiểu mức chống nước và điều kiện của hãng" | Không nguồn ISO trực tiếp |
| "khung giờ nguy hiểm 20:00–04:00" như dữ kiện chung; "coi cả khoảng 20:00–04:00 là cấm"; "quy tắc 6 giờ… tránh 100%" | Viết lại: khung giờ nên tránh **tùy calibre**, nêu nguyên văn Seiko 6L37 (21:00–01:00); nguyên tắc phòng ngừa "đưa kim giờ ra khỏi vùng đổi quanh nửa đêm (ví dụ về khoảng 6 giờ)" trình bày như biện pháp an toàn khi chưa tra được manual, **không thay thế manual** | SEIKO 6L37 nguyên văn |
| "💡 Trong dụng cụ: vùng đỏ (20:00–04:00)" như khung chuẩn | Ghi rõ dụng cụ dùng khoảng **ví dụ minh họa**; khoảng thật tùy calibre | SEIKO 6L37 |
| "quartz cũng có khung giờ nguy hiểm… vẫn áp quy tắc 6 giờ"; "lịch tuần cũng cấm" | Hạ thành "theo manual của sản phẩm; một số hướng dẫn quartz và lịch tuần cũng nêu vùng nên tránh" | Không nguồn khái quát |
| "cơ cấu có dung sai nhất định" (FAQ lỡ chỉnh) | Hạ thành "một lần chưa chắc gây hỏng — nếu dấu hiệu bất thường, mang thợ" | Không nguồn |
| "bảo vệ tốt hơn nhiều so với núm đẩy" (num-van) | Hạ thành "giúp niêm phong khi được vặn kín đúng cách — phải nhớ vặn lại" | OMEGA "always screw it in after handling" |
| "chịu được cuộn–nhả hàng nghìn lần"; "thép hiện đại tốt hơn nhiều so với xưa"; "(giảm lực khi gần hết cót)" (day-cot) | Bỏ số và so sánh lịch sử; giữ nguyên lý tích/nhả năng lượng + liên hệ trữ cót | FHH Barrel; không nguồn phần còn lại |
| "5 điểm niêm phong" như danh sách chuẩn | Viết theo nguyên văn Omega: gioăng ở crown, pushers, crystal, case; một số mẫu có thêm van helium | OMEGA |
| "tuyệt đối không bấm nút dưới nước" | Giữ khuyến nghị kèm nguồn + **ngoại lệ có nguồn**: Omega ghi rõ Seamaster 300M/600M chronograph bấm được dưới nước | OMEGA nguyên văn |
| "xông hơi regardless mức chống nước"; "nước nóng làm gioăng giãn nở" | Hạ thành khuyến nghị thận trọng có điều kiện ("một số hướng dẫn hãng khuyên tránh nơi nóng; Omega nêu nhiệt độ vận hành tối ưu 0–60°C") | OMEGA nhiệt độ; Seiko cautions |
| "vintage coi như không chống nước" | Hạ thành "khả năng chống nước chưa được kiểm chứng cho tới khi được test lại" | Seiko "not permanently guaranteed" |

## 3. Giới hạn nguồn được ghi nhận

- Khuyến nghị chu kỳ (1 năm / 5–8 năm) chỉ có nguồn **OMEGA cho sản phẩm Omega** — mọi câu trong bài kèm chủ ngữ hãng, không áp chung.
- Bảng mức → hoạt động có nguồn công khai **Seiko theo BAR cho sản phẩm Seiko**; bảng quy đổi mét/ATM trong bài là **bảng phổ thông tham khảo**, luôn thua manual của đúng mẫu.
- Không có con số vòng lên dây từ bất kỳ nguồn nào — bài không chứa số vòng.
- Không có khung giờ cấm chỉnh lịch áp chung — chỉ có nguyên văn Seiko 6L37 (21:00–01:00) làm **ví dụ một calibre**, và nguyên tắc phòng ngừa đưa kim giờ ra vùng đổi ngày.
- Không dùng nguồn đấu giá/sưu tầm; không có lời khuyên giá trị bán lại, đầu tư, chẩn đoán từ xa.
- `DateSafety.astro` — mô phỏng nguyên lý chu trình đổi ngày; vùng tô 20:00–04:00 là ví dụ trực quan, không xác định khung giờ cho đồng hồ của người đọc (chi tiết mục 4).

## 4. Vòng sửa sau kiểm tra (03/09/2026) — hạ mọi quy tắc chung về mức calibre/mẫu

Nguyên tắc xuyên suốt: **không để người đọc áp một quy tắc chung cho mọi calibre hoặc mọi mức chống nước.** Nếu một claim không có nguồn trích nguyên văn trong hồ sơ này, claim bị bỏ thay vì suy diễn.

**Chỉnh lịch (2 bài + DateSafety):**

- Giữ nguyên văn Seiko 6L37 (21:00–01:00) và luôn ghi "của calibre 6L37".
- **Bỏ quy trình chỉnh lịch chung**: "đưa kim về khoảng 6 giờ", "rút núm ra nấc cuối", chuỗi "đẩy vào/rút ra nấc chỉnh ngày", 6 bước thao tác — không nguồn cho mọi đồng hồ. Thay bằng: xác định đúng mẫu/calibre → tìm manual của hãng → không có manual thì nhờ dịch vụ có chuyên môn; không suy ra vùng an toàn từ hướng dẫn chung.
- **Bỏ** các khẳng định không nguồn: "một lần chỉnh sai chưa chắc gây hỏng / cơ cấu có dung sai", "càng cố chỉnh càng hỏng", danh sách dấu hiệu hỏng cụ thể (lịch đổi lệch giờ, số kẹt nửa chừng, tiếng lạch cạch, lịch đứng vì bánh răng gãy). Thay bằng nguyên tắc hành vi: "bình thường theo quan sát → không can thiệp; bất thường → ngừng chỉnh, mang dịch vụ có chuyên môn".
- **DateSafety.astro đổi thành mô phỏng nguyên lý**: bỏ "khung thận trọng phổ biến", "Có thể chỉnh lịch", "Không chỉnh lịch lúc này", "Ví dụ nguy hiểm", "ngoài khung thận trọng"; mọi nhãn/aria-label/trạng thái động/nút/mô tả nói rõ "vùng minh họa", không thay thế manual; dòng "20:00–04:00 · ví dụ" đặt cạnh đồ họa; chân công cụ dẫn về manual của đúng calibre và nêu ví dụ 6L37.

**Chống nước (4 bài):**

- **Xóa bảng quy đổi chung 30m/50m/100m/200m/300m gắn hoạt động** — dù có dòng "tra manual", dạng bảng vẫn gợi phép dùng chung. Giữ bảng BAR của Seiko với ghi rõ "cho đồng hồ Seiko", và câu Seiko yêu cầu đọc ký hiệu trên vỏ đúng chiếc đồng hồ.
- **Bỏ claim không nguồn**: "xà phòng/hóa chất không nằm trong điều kiện thử của bất kỳ hãng nào"; "nhiều hướng dẫn hãng khuyên tránh sauna/nước nóng"; "nước làm đồng hồ chạy sai vì ảnh hưởng dây cót/dầu"; "nước trong bộ máy gây rỉ sét, chi phí sửa vượt xa kiểm tra".
- Giữ với phạm vi hãng rõ: rửa nước sạch sau biển (Omega + Seiko), không rửa trực tiếp dưới vòi chảy (Seiko), screw-in crown luôn vặn lại (Omega), không bấm nút dưới nước + ngoại lệ Seamaster (Omega), 0–60°C (Omega), check hằng năm + 5–8 năm (Omega, cho Omega).
- Mục mới "Những gì các hãng đã công bố — và những gì chưa": tách bạch công bố có nguồn khỏi phần không có công bố (xà phòng/sauna) và kết luận "không suy ra quy tắc — tra manual hoặc hỏi dịch vụ".

**Lên dây (2 bài):**

- Giữ phân biệt manual/automatic theo nguyên văn Omega.
- **Bỏ quy trình chung**: chiều mở núm ren, "xoay theo chiều kim đồng hồ" như quy tắc chung, "dừng khi gặp lực cản rõ" như luật, "tiếng tách bình thường" không phạm vi, "vặn chậm đều bằng ngón cái trỏ", FAQ "vị trí đóng — rút núm là để chỉnh".
- Giữ với phạm vi Omega rõ (nguyên văn bổ sung vào mục 1): vặn theo chiều kim đồng hồ + tiếng tách là mô tả của Omega cho **đồng hồ cơ Omega**; bài dẫn kèm "cho đồng hồ của hãng… mẫu của bạn: xem manual".
- Nguyên tắc thay thế: số vòng, chiều xoay, điểm dừng theo manual của đúng mẫu; cảm giác bất thường → dừng và liên hệ dịch vụ phù hợp; không ép vặn.

**Script (`check-daily-care-cluster.mjs`):**

- Sửa lỗi R4: điều kiện cũ `f.endsWith('/en/')` không bao giờ đúng với đường dẫn tệp → thay bằng `FILES.en.includes(f)`; đã xác minh bằng cách tiêm link vi thử vào một bài EN — script bắt đúng tệp và dòng, khôi phục xong trở lại ĐẠT.
- Mở rộng quét `DateSafety.astro` (R5b): từ chối các nhãn kết luận ("khung thận trọng phổ biến", "Có thể chỉnh lịch", "Không chỉnh lịch lúc này", "Ví dụ nguy hiểm", "ngoài khung thận trọng"), từ chối ngôn ngữ cấm thao tác gắn vùng 20:00–04:00, yêu cầu hiện diện nhãn "vùng minh họa" và từ "manual".
- Từ chối "bảng quy đổi / conversion table" và mọi dòng bảng m-level gắn hoạt động trong 4 bài chống nước; từ chối "về 6 giờ / around 6 o'clock" trong 2 bài chỉnh lịch.
