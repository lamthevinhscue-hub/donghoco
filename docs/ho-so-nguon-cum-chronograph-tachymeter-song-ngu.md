# Hồ sơ nguồn — Cụm Chronograph & Tachymeter song ngữ (Prompt 34)

Ngày rà soát: 03/09/2026

Phạm vi: 4 bài tiếng Việt (`coChe/vi/chronograph.md`, `huongDan/vi/dung-tachymeter.md`, `tuDien/vi/chronograph.md`, `tuDien/vi/tachymeter.md`) được chuẩn hóa trước, rồi dịch thành 4 bài tiếng Anh (`coChe/en/chronograph.md`, `huongDan/en/using-a-tachymeter.md`, `tuDien/en/chronograph.md`, `tuDien/en/tachymeter.md`), cùng hồ sơ này và biên bản nghiệm thu.

Ngoài 8 bài trên, cụm có 1 công cụ tương tác `src/components/interactive/TachymeterTool.astro` (chỉ render tiếng Việt): rà cho thấy công cụ đã mô tả đúng "tốc độ trung bình trên một quãng đường đã biết", ghi rõ thang minh họa 60–400 tương ứng 9–60 giây và chỉ đọc trực tiếp khi đo đúng một đơn vị — không cần sửa, không đưa vào tệp nội dung của script kiểm.

## 1. Nguồn đã tra và nguyên văn nâng đỡ

### Fondation de la Haute Horlogerie — Watch complications (rà các đợt trước, curl 200)

URL: <https://www.hautehorlogerie.org/en/watches-and-culture/library/watch-complications>

Nâng đỡ:

- Định nghĩa: "A chronograph is a watch that measures short periods of time by means of additional hands."
- Ba thao tác độc lập với giờ: "The chronograph mechanism can be started, stopped and reset to zero without affecting the watch's timekeeping."
- Hai nút là **tổng quát có điều kiện**: "A chronograph is **generally** operated by two pushers in the side of the case. They actuate a **clutch** which connects or disconnects the chronograph mechanism from the movement's wheel train."
- Hiển thị: kim giây trung tâm + mắt phụ đếm phút "(and, on certain chronograph watches, hours)"; "There are **numerous other layouts** but all come down to the same principle".
- Tần số và độ chia thời gian: "For a chronograph to measure tenths of a second, the movement must beat at 5 Hz or 36,000 vph (10 vibrations per second)."
- Flyback: "devised for use by pilots"; "A single push of a button simultaneously resets and restarts the mechanism, without stopping first."
- Chronograph trong nhóm phức tạp hữu dụng ("Useful complications" có chronograph).

### Fondation de la Haute Horlogerie — Encyclopedia "Chronograph" (web_reader 03/09/2026)

URL: <https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/chronograph-complications>

Nâng đỡ (nguyên văn chính):

- Định nghĩa: "a timepiece which, along with telling the time, serves to measure short times using at least one additional hand. The latter can be started, stopped and reset to zero without disturbing the smooth running of the movement, by means of a control system, **generally composed of pushbuttons**."
- Phân biệt với bấm giờ rời: "If the chronograph function is not associated with a watch as such, the instrument is simply referred to as a **timer (or sometimes a stopwatch)**."
- Số nút không cố định: "controlled via **one or several pushbuttons, generally located on the side of the case**".
- Bố cục đa dạng: "Chronograph displays have given rise to **countless interpretations**, chiefly governed by the space available on the dial."
- Cơ chế: "a control system (pushers, levers and control wheel) commands a **coupling clutch**, which engages or disengages the chronograph with the movement going train. The coupling clutch may be either **horizontal – also known as lateral – or vertical**. As for the control system… two varieties: **column wheel (the traditional technique) or cam-type (a more rational system)**. Zero-resetting is done via **hammers that strike 'heart cams'** fixed to the chronograph hand arbors."
- Tích hợp vs module: "the chronograph mechanism can be either **built into the watch movement, or mounted on the latter in the form of an add-on module**. The former solution is considered nobler and involves greater development costs, while reducing flexibility… the latter is less expensive…"
- Thang đo gắn kèm: "Some mechanisms are also associated with **measurement scales: tachymeter, telemeter, pulsometer, asthmometer and slide rule**."
- Chronograph vs chronometer: chronometer là bộ máy có độ chính xác "certified in accordance with official standards. A chronograph may therefore be chronometer-certified, but not all chronometers are chronographs."
- Lịch sử — Moinet 1816: "In 1816… Louis Moinet developed what he called a **compteur de tierces**… displayed **sixtieths of a second**… beating at **216,000 vph (30 Hz)**… **two pushers** to start, stop and reset… designed for **astronomical instruments**… vanished until 2013."
- Lịch sử — Rieussec 1821: "In 1821… Nicolas Mathieu Rieussec – **watchmaker by appointment to the King of France** – unveiled at an **equestrian competition** a device capable of measuring the time taken to complete a horse race. Accurate to the nearest **fifth of a second**, it placed on demand a **drop of ink** on a rotating enamel dial… gave rise to the name **'chronograph' (from the Greek for 'writing time')**… Rieussec was considered the father of the chronograph until the **2013 rediscovery** of Louis Moinet's compteur de tierces."
- Lịch sử — thế kỷ 20: Pouzait 1776 (bấm giây start/stop không làm gián đoạn bộ máy); "The first modern version dates back to circa **1861**… Henri-Ferréol Piguet… on behalf of Nicole & Capt".
- Lịch sử — 1969: "the **1969 launches of the first self-winding chronograph movements**: the **Chronomatic, produced by Dépraz-Bürgen for Breitling and Heuer-Leonidas**; and the **El Primero from Zenith, the first self-winding chronograph to beat at 36,000 vph**."

### Fondation de la Haute Horlogerie — Encyclopedia Louis Moinet và Nicolas Mathieu Rieussec (web_reader 03/09/2026)

- Moinet: <https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/louis-moinet> — "In 1816 he produced the 'Compteur de Tierces' **(making him the inventor of the chronograph)** for his observations of celestial bodies."
- Rieussec: <https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/nicolas-mathieu-rieussec> — trình diễn thiết bị đo đua ngựa; "1822: awarded a five-year patent" cho "seconds chronograph" chính xác tới 1/5 giây.

### OMEGA — trang Speedmaster và trang biên niên 1969 (web_reader 03/09/2026)

- Collection Speedmaster: <https://www.omegawatches.com/watches/speedmaster/> — "The **first watch worn on the moon**, the OMEGA Speedmaster is one of the most iconic chronographs on Earth."
- Chronicle 1969: <https://www.omegawatches.com/en-us/chronicle/1969-the-first-watch-worn-on-the-moon> — "the first human beings walked onto the Moon at 02:56 GMT on **21 July 1969**. An essential part of each astronaut's space kit was the OMEGA Speedmaster Professional… After the Apollo 11 landing, the Speedmaster became forever known as **'the Moonwatch'**."

→ Nâng: Speedmaster là đồng hồ đeo trên Mặt Trăng 1969 (Apollo 11) — khẳng định theo nguồn chính hãng Omega, đưa vào `sources` của bài.

### OMEGA — định nghĩa tachymeter (web_reader 03/09/2026)

URL trang sản phẩm có chú giải thuật ngữ: <https://www.omegawatches.com/en-us/watch-omega-speedmaster-day-date-38233011>

Nguyên văn: "**A tachymeter watch has a function for measuring speed. It is a chronograph with a graduated dial on which speed can be read in kilometres per hour based on a 1000 metre distance.**"

→ Nâng: tachymeter là thang khắc trên đồng hồ chronograph; số đọc là **tốc độ theo km/h dựa trên một quãng đường cố định (1000 m)** — tức tốc độ trung bình trên quãng chuẩn. Trang Chronoscope của Omega (<https://www.omegawatches.com/en-us/watches/speedmaster/two-counters/chronoscope/product>) cũng ghi thang tachymeter "for measuring speed or distance".

### TAG Heuer — Vintage Heuer Monaco (web_reader 03/09/2026)

URL: <https://www.tagheuer.com/us/en/vintage-collection/vintage-heuer-monaco.html>

Nâng đỡ:

- Monaco ra mắt 1969 với Calibre 11: mô tả trang "launched in **1969** with the **world's first automatic chronograph movement, the Calibre 11**" — đây là **tự xưng của hãng**, được trình bày trong bài kèm chủ ngữ "theo TAG Heuer", không dùng làm dữ kiện khách quan duy nhất.
- Nền Calibre 11 từ dự án chung "Project 99" (Heuer cùng Breitling); vỏ vuông: lúc bấy giờ vỏ vuông chỉ dùng cho đồng hồ dress watch vì khó chống nước đầy đủ — Monaco đi cùng vỏ vuông Piquerez chống nước.
- Heuer Carrera: "Dating from 1962 and 1963, the Autavia and the **Carrera**…" — nâng mốc Carrera 1963.

### SEIKO — trang Heritage (web_reader 03/09/2026)

URL: <https://www.seikowatches.com/us-en/special/heritage>

Nguyên văn: "Introduction of **cal. 6139**, the **world's first automatic chronograph watch equipped with both vertical clutch and column wheel**" (1969); trang nói rõ "**this may have been the world's first such timepiece**" — Seiko tự dùng chữ "may have been"; trình bày trong bài kèm chủ ngữ "theo Seiko".

### COSC (curl 200)

URL: <https://www.cosc.swiss/cosc-chronograph-chronometer> — phân biệt chronograph (bấm giờ) và chronometer (độ chính xác được chứng nhận). Nguồn phụ trợ cho mục phân biệt trong từ điển; FHH encyclopedia đã nâng rõ nên COSC giữ ở `sources` như nguồn tra cứu thêm.

## 2. Mâu thuẫn đã xử lý và quyết định

| Mâu thuẫn / claim cũ | Quyết định | Căn cứ |
|---|---|---|
| coChe vi: "**1817** Rieussec tạo chronograph 'viết mực' cho vua Louis XVIII xem đua ngựa" vs tuDien vi: "phiên bản đầu tiên của Rieussec (**1821**)" | Chuẩn hóa **1821** — trình diễn tại cuộc đua ngựa; 1817 không phải năm tạo chronograph; nếu nhắc nhà vua thì đúng mệnh đề FHH "thợ hồ được nhà vua bổ nhiệm". Bổ sung 1822 cấp bằng sáng chế (entry Rieussec riêng) | FHH encyclopedia Chronograph + Rieussec |
| coChe vi: "1816 Louis Moinet chế tạo chronograph đầu tiên" | Giữ 1816 nhưng viết đúng dữ kiện: "compteur de tierces" đo 1/60 giây, 216.000 vph (30 Hz), 2 nút, phục vụ quan sát thiên văn; nói "FHH coi đây là phát minh của chronograph" thay vì khẳng định tuyệt đối không dẫn nguồn | FHH encyclopedia Chronograph + entry Louis Moinet "(making him the inventor of the chronograph)" |
| "1969 — cuộc đua chronograph tự động với **3 dự án về đích cùng năm** — Zenith El Primero, Calibre 11 (**Heuer–Breitling–Hamilton**), Seiko 6139" | Viết lại theo từng nguồn: Chronomatic do Dépraz-Bürgen phát triển cho Breitling và Heuer-Leonidas + El Primero (Zenith, đầu tiên chạy 36.000 vph) theo FHH; Seiko 6139 kèm chủ ngữ "theo Seiko… may have been the world's first". **Bỏ mệnh đề "3 dự án về đích cùng năm" và tên Hamilton** (không nguồn trong cụm) | FHH encyclopedia Chronograph (1969); SEIKO Heritage |
| "Speedmaster — đồng hồ đầu tiên lên Mặt Trăng 1969" | Giữ, kèm nguồn Omega chính hãng trong `sources` | OMEGA Speedmaster page + Chronicle 1969 |
| Bảng "Column wheel vs Cam" gồm hàng **Chế tạo / Cảm giác bấm / Độ bền / Phân khúc** với tên calibre (Rolex 4130, Patek CH 29, Valjoux 7750) | Thay bằng so sánh có nguồn: column wheel = "kỹ thuật truyền thống", cam = "hệ thống hợp lý hơn"; ly hợp ngang (lateral) hay dọc (vertical) tùy thiết kế; tích hợp trong bộ máy vs module gắn ngoài ("cao quý hơn / tốn kém phát triển hơn" vs "ít tốn kém hơn"). Bỏ cảm giác bấm, độ bền, phân khúc, tên calibre, và mọi nhận định sưu tầm | FHH encyclopedia Chronograph (cơ chế + module) |
| "các 'cột' trụ đứng (**thường 9 cột**)", "xoay đúng **1 bước (≈40°)**" | Bỏ 2 con số — không nguồn; giữ mô tả định tính (xoay một bước mỗi lần bấm) | Không có nguồn trong hồ sơ |
| "từng là công cụ của **bác sĩ đo mạch, phi công tính lộ trình, tài xế đua**" | Viết lại theo dữ kiện có nguồn: khoa học thể thao và hàng không thúc đẩy các biến thể (flyback cho phi công); các thang đo pulsometer/tachymeter/telemeter/slide rule gắn cùng chronograph | FHH complications + encyclopedia |
| "Trước đó, **mọi chronograph** đều lên dây tay" | Bỏ câu khái quát; chỉ nói các bộ tự động đầu tiên ra mắt 1969 theo FHH | FHH "the first self-winding chronograph movements" |
| "Chronograph là một trong số ít phức tạp **thực sự hữu dụng**" / "tinh tế bậc nhất đồng hồ cơ" | Hạ xuống trung tính: "một trong những phức tạp phổ biến, có ứng dụng trực tiếp" — FHH xếp chronograph vào nhóm hữu dụng nhưng không so bậc | FHH complications |
| tuDien vi: "Cách nhận biết: **2 nút bấm**… sub-dials" như dấu hiệu chuẩn | Viết có điều kiện: "one or several pushbuttons, generally located on the side of the case"; bố cục "countless interpretations" — dạng phổ biến là 2 nút + mắt phụ, không phải quy tắc | FHH encyclopedia |
| tachymeter "**đo tốc độ**" (tuDien excerpt + mở đầu guide) | Thay bằng "đọc **tốc độ trung bình** dựa trên thời gian đi hết **một quãng đường cố định**"; nêu rõ định nghĩa Omega: km/h dựa trên quãng 1000 m | OMEGA tachymeter definition |
| "Số trên thang **thường chạy từ khoảng 60 xuống 400**" | Bỏ khái quát dải số; chỉ nói dải của **thang minh họa trong trang** (60–400 tương ứng 9–60 giây) và dải thật tùy mẫu | Không có nguồn dải số; TachymeterTool đã ghi đúng |
| guide + tuDien tachymeter: "**tốc độ = 3600 / thời gian (giây)**" như công thức chung | Giữ ở mức phép tính của **thang chuẩn quãng 1 đơn vị**: là suy toán số học từ định nghĩa Omega (km/h dựa trên 1000 m → 1 km trong t giây cho trung bình 3600/t km/h); ghi rõ công thức không có nguyên văn trong nguồn. Ví dụ 30 giây / 1 km → 120 km/h là phép tính từ định nghĩa | OMEGA định nghĩa + quy ước thang chuẩn 1 đơn vị |
| "dưới ~60 km/h thang đã **khó đọc chính xác**… **vô dụng**" | Thay bằng điều kiện đọc: thời gian đo nằm ngoài dải số khắc trên thang thì không đọc trực tiếp được; bỏ nhận định độ chính xác | Cấu trúc thang theo định nghĩa; bỏ nhận định không nguồn |
| "đo người đi bộ" bị loại tuyệt | Viết có điều kiện: các hoạt động chậm thường nằm ngoài dải thang minh họa; không khẳng định mục đích thiết kế | Cấu trúc thang |
| FAQ guide: "đó là **di sản từ thời đồng hồ là công cụ đo**" | Bỏ mệnh đề lịch sử không nguồn; giữ ý "phần lớn người đeo không dùng hằng ngày" | Không có nguồn trong hồ sơ |
| relatedModels seagull-1963: "ST19 cho thấy chronograph cơ **bánh xe cột**" | Bỏ "bánh xe cột" (không nguồn trong cụm): "ST19 là ví dụ chronograph cơ ở một điểm tiếp cận dễ hơn với người mới chơi" | Không có nguồn trong hồ sơ |

## 3. Giới hạn nguồn được ghi nhận

- Các claim "đầu tiên" (Calibre 11 theo TAG Heuer; El Primero theo Zenith/FHH; 6139 theo Seiko) là **tự công bố của từng hãng**, mỗi bên nói về bộ máy của mình — bài viết luôn kèm chủ ngữ "theo hãng" hoặc dẫn FHH, không ghép thành một dữ kiện khách quan duy nhất.
- Công thức 3600/t và ví dụ 30 giây → 120 km/h được ghi rõ trong bài là phép tính của thang chuẩn quãng một đơn vị (từ định nghĩa Omega), không phải trích dẫn nguyên văn từ nguồn.
- Không dùng nguồn thương mại/đấu giá/sưu tầm; không có số liệu giá, độ hiếm, đầu tư, hiệu năng beyond nguồn trong cụm.
- FHH glossary (trang từ điển thuật ngữ) render bằng JavaScript nên không trích được nguyên văn trực tiếp — thay vào đó dùng encyclopedia FHH (đã trích nguyên văn) và định nghĩa Omega cho tachymeter.
- `src/data/timeline.json` (trang /lich-su, mốc 1969) **ngoài phạm vi Prompt 34** — mô tả mốc 1969 ở đó kể theo cách riêng ("ba dự án", Hamilton) của trang lịch sử; các bài trong cụm này không lặp lại các mệnh đề đó. Nếu sau này muốn đồng bộ mốc 1969, cần hồ sơ nguồn riêng.

## 4. Vòng sửa sau kiểm tra (03/09/2026) — hình học thang tachymeter và khẳng định cấu trúc

**Bản chất: sửa lỗi DIỄN ĐẠT về vị trí các vạch trên mặt số — KHÔNG thay đổi công thức.** Công thức thang chuẩn `tốc độ (km/h) = 3600 ÷ thời gian (giây)` giữ nguyên; thay đổi là cách mô tả quan hệ giữa khoảng cách vạch và độ chênh giá trị.

Lỗi đã sửa (bản trước vòng này):

- Guide Việt viết "Thời gian ngắn → tốc độ cao, vạch dày" nhưng kết luận "vạch xa"; "Thời gian dài → tốc độ thấp, vạch thưa" nhưng kết luận "vạch sát nhau" — hai câu tự mâu thuẫn và ngược chiều.
- Guide Anh viết "Short time → high speed, marks spread out" và "Long time → low speed, marks bunch up" — ngược chiều.

Nguyên lý đúng (đã áp đồng nhất Việt–Anh): kim giây trên mặt số **quay đều theo thời gian**, nên khoảng cách vạch đi theo thời gian; giá trị tốc độ khắc cạnh vạch thì thay đổi theo phép chia nghịch đảo. Cụ thể: 5 giây và 6 giây cách nhau **6°** trên mặt số — hai vạch **nằm gần nhau**, dù giá trị chênh 720 → 600 km/h; 50 giây và 55 giây cách nhau **30°** — hai vạch **nằm xa nhau**, dù giá trị chỉ chênh 72 → khoảng 65 km/h. Kết luận: vùng thời gian ngắn/tốc độ cao có các vạch **đặt gần nhau** (giá trị thay đổi nhiều); vùng thời gian dài/tốc độ thấp có các vạch **đặt xa nhau** (giá trị thay đổi ít). Không nhầm "khoảng cách vạch trên mặt số" với "độ chênh giá trị tốc độ".

Các khẳng định cấu trúc đã hạ xuống trung tính (nguồn không nâng tỷ lệ):

- Bỏ "vòng số ngoài cùng" / "the outermost ring" và "trên vành phổ biến hơn" — mô tả trung tính: thang có thể đặt trên bezel, rehaut hoặc mặt số **tùy mẫu**; cách đọc phụ thuộc thang và kim đo thời gian của đúng mẫu.
- Bỏ "tachymeter bắt buộc cần chronograph" / "không có chronograph thì chỉ là trang trí" — viết: để đọc trực tiếp trên đồng hồ cần một kim/thiết bị đo thời gian; chronograph là cách kết hợp phổ biến; một thang đơn lẻ không tự đo thời gian.
- Ví dụ 1 dặm giữ ở mức nguyên tắc "mỗi thang gắn với đúng đơn vị quãng đường của nó" — định nghĩa Omega chỉ nói km/h dựa trên 1000 m, không nâng ví dụ dặm.
- Title hai bài cơ chế đổi thành "Chronograph — Cơ chế bấm giờ" / "Chronograph — the timing mechanism" (bỏ "và bánh răng cột" / "and the column wheel" — column wheel chỉ là một trong hai cách điều khiển, không phải bộ phận của mọi chronograph). Câu đầu từ điển chronograph dùng "một hoặc nhiều nút bấm, thường ở cạnh vỏ".

Chống tái phát: `scripts/check-chronograph-cluster.mjs` bổ sung R6 — bắt cặp ngược chiều ("thời gian ngắn"+"vạch xa", "thời gian dài"+"vạch sát", "short time"+"marks spread", "long time"+"marks bunch"), các khẳng định tuyệt đối ("requires a chronograph", "chỉ là trang trí", "just decoration", "only means something") và title cũ; chỉ quét 8 bài, không áp lên hồ sơ/biên bản vì hai tài liệu này cần ghi nhận lỗi đã sửa.
