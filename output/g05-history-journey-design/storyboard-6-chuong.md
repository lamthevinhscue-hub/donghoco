# G05-A — Storyboard 6 chương (dự thảo, chờ anh Vinh duyệt)

- Giao dịch TXN-20260913-01, nền `2f322dc`. Đây là **khung trình duyệt**, không phải kết luận lịch sử mới.
- Mọi nội dung dữ kiện giữ nguyên theo `src/data/timeline.json` (G02); storyboard chỉ thêm lớp tổ chức: câu hỏi mở chương, nhãn chương, cách xếp mốc và đường đọc.

## 0. Cấu trúc trang khuyến nghị (áp cho cả VI và EN)

Giữ route VI hiện có `/lich-su/` và đề xuất thêm 1 route EN `/en/history/` để hai route tạo thành một cặp (tên "history" theo quy ước thư mục EN hiện hành: `en/brands`, `en/guides`, `en/iconic-watches`, `en/mechanisms`, `en/glossary`). Bên trong mỗi trang:

```
[Tiêu đề trang + đoạn dẫn hiện hành giữ nguyên]
[Thanh lọc 3 lớp hiện hành giữ nguyên — sticky top-16]
[THÊM MỚI: dải 6 thẻ chương (chip) — bấm cuộn tới đầu chương]
[Timeline 28 mốc hiện hành giữ nguyên thẻ milestone-card, anchor #milestone-{i}]
  ├── Section chương C1: đề mục h2 + câu hỏi + 1 câu giới hạn chương
  │     └── mốc 0–4 (milestone-card nguyên trạng)
  ├── Section chương C2 ... mốc 5–8
  ├── Section chương C3 ... mốc 9–14
  ├── Section chương C4 ... mốc 15–20
  ├── Section chương C5 ... mốc 21–24
  └── Section chương C6 ... mốc 25–27
[Điều hướng bên (desktop) + panel mobile: THÊM nhóm "Chương" phía trên nhóm thập niên hiện hành]
[Ghi chú nhà sưu tầm cuối trang giữ nguyên]
```

Lý do chọn 1 trang 6 section (không tách 6 trang riêng): giữ nguyên trạng thái hoạt động của lọc lớp, nhảy mốc, scroll spy và anchor `#milestone-{i}` đang được `check-g02-history-timeline.mjs` giữ; không tạo 6 route mới; khối lượng dịch chỉ thêm 6 đề mục + câu hỏi + câu giới hạn chương. Phương án 6 trang riêng chỉ cần khi anh Vinh muốn đường đọc riêng từng chương — chi phí: 6 cặp route, hreflang, sitemap, bộ lọc phải quyết định phạm vi áp dụng; chưa thấy trở ngại thực tế bắt buộc phải tách.

## 1. Storyboard từng chương

### C1 — Đồng hồ trở nên mang theo được và điều hòa nhịp ra sao?

- **VI:** "Làm sao để thời gian rời khỏi mặt đất, tòa tháp và túi áo — để chạy đều trong lòng bàn tay?" — người đọc cần hiểu: thu nhỏ máy + tìm nhịp điều hòa là hai bài toán khác nhau, giải trong 5 mốc này.
- **EN draft:** "How did timekeeping become portable and rhythm-regulated?" — cần hiểu: miniaturisation và một nhịp ổn định là hai bài toán riêng.
- **Luồng:** mở chương (câu hỏi + 1 câu giới hạn) → mốc 0 peter-henlein (mang theo được — "được ghi nhận", có giới hạn chiếc "1510" nghi vấn) → mốc 1 huygens-hairspring (điều hòa nhịp — dẫn đọc tiếp chương G04 `/co-che/day-toc-banh-lac`) → mốc 2–3 blancpain, vacheron-constantin (bối cảnh nghề chế tác — cùng mức "tự tuyên bố hãng") → mốc 4 breguet-tourbillon (mốc cấp bằng 1801) → ảnh hỗ trợ: SVG hiện có của từng mốc → đọc tiếp + nguồn ở từng thẻ (nguyên trạng).
- **Câu giữ chương:** VI — "Hai mốc lập xưởng bổ sung bối cảnh nghề chế tác; hồ sơ không xác lập quan hệ nhân quả với các phát minh điều hòa." EN — "The two workshop milestones add watchmaking context; this record does not establish a causal link with the regulator inventions."
- **Bố cục:** desktop — đề mục chương chiếm chiều rộng 2 cột của lưới timeline so le hiện hành, câu hỏi cỡ h2, câu giới hạn chữ nhỏ dưới đề mục; mobile — đề mục + câu hỏi một cột, câu giới hạn thu gọn trong khung viền brass nhạt.
- **Điều người đọc cần hiểu ở mức claim:** blancpain/vacheron là brand-claim (tự tuyên bố) — nhãn mức chứng minh hiện hành trên thẻ đủ để phân biệt, không thêm kết luận.

### C2 — Đồng hồ đến cổ tay trong những bối cảnh nào?

- **VI:** "Không một phát minh đơn lẻ nào đưa đồng hồ lên cổ tay — ai đã đeo nó, vì nhu cầu gì?" — cung đình, đơn hàng cá nhân, hàng không, chiến tranh: bốn bối cảnh khác nhau, không nối thành một dòng tiến.
- **EN draft:** "In which settings did the watch reach the wrist?" — court commission, private order, aviation, war: four distinct settings, not one straight line.
- **Luồng:** mở chương → mốc 5 breguet-naples (1810, theo hồ sơ hãng; giao 1812 nằm trong phần giới hạn) → mốc 6 patek-first-wristwatch (1868, thu hẹp "Thụy Sĩ" theo hãng) → mốc 7 cartier-santos (1904; "one of the first" — FHH) → mốc 8 trench-watch (1914–1918, "lan rộng") → SVG + đọc tiếp nguyên trạng.
- **Câu giữ chương:** VI — "Đồng hồ bỏ túi không biến mất khi đồng hồ đeo tay lan rộng; hai hình thức song song suốt nhiều thập kỷ." EN — "Pocket watches did not vanish as wristwatches spread; the two forms coexisted for decades."

### C3 — Thiết kế đáp ứng nhu cầu sử dụng hằng ngày ra sao?

- **VI:** "Mặc lên cổ tay rồi — những nhu cầu sử dụng hằng ngày nào đã định hình thiết kế của nó?" — sáu mốc trả lời bằng thiết kế: tự động, vỏ kín, rotor, mặt lật, buồng phi công, cửa sổ lịch. (Câu hỏi không ngụ ý đồng hồ tự động không cần chăm sóc — bài bảo dưỡng và sử dụng an toàn hiện có giữ vai trò riêng.)
- **EN draft:** "How did design answer everyday use?" — automatic winding, sealed case, rotor, flip case, pilot legibility, date window.
- **Luồng:** mở chương → mốc 9 harwood (1923, hai đơn 1923, giới hạn "1928" sai) → mốc 10 oyster (1926, "theo hãng"; Gleitze 1927) → mốc 11 perpetual (1931, rotor 360°) → mốc 12 reverso (1931, thể thao) → mốc 13 iwc-pilot (1936, "tiên phong" là tự đánh giá IWC) → mốc 14 datejust (1945, claim hãng đúng nguyên văn) → SVG + đọc tiếp nguyên trạng.
- **Câu giữ chương:** VI — "Các mốc này giải bài toán hằng ngày của thời họ; thông số chống nước và mức an toàn của hôm nay cần đọc ở bài chuyên sâu, không suy ngược từ đây." EN — "These milestones solved their era's daily problems; today's water-resistance ratings and safety levels are covered in dedicated guides, not inferred from history."
- **Lưu ý biên tập:** mọi liên kết "đọc chuyên sâu" trong chương này chỉ trỏ bài hướng dẫn hiện có (`/huong-dan/muc-chong-nuoc` v.v.) — nếu bài chưa có bản EN thì hiển thị trạng thái chưa dịch theo quy tắc chung.

### C4 — Khi nhu cầu lặn, múi giờ và bấm giờ định hình đồng hồ?

- **VI:** "Ba nhu cầu chuyên biệt — lặn sâu, bay qua múi giờ, đo thời gian — đã sinh ra những dòng đồng hồ riêng thế nào?" — sáu mốc 1953–1969 theo ba nhu cầu.
- **EN draft:** "When did diving, time zones and timing shape the watch?" — six milestones from 1953 to 1969 across three needs.
- **Luồng:** mở chương (nhóm 3 nhãn nhỏ: lặn / múi giờ / bấm giờ) → mốc 15 fifty-fathoms → mốc 16 rolex-submariner (cùng 1953 — ghi rõ "cùng năm", không suy ai trước ai ngoài nguồn) → mốc 17 rolex-gmt (1955) → mốc 18 speedmaster (1957; NASA 1965 là đoạn sau trong cùng thẻ) → mốc 19 carrera (1963) → mốc 20 automatic-chronograph-race (1969, "cùng năm 1969" nhiều bên) → SVG + đọc tiếp nguyên trạng.
- **Câu giữ chương:** VI — "Cùng năm 1953 có hai đồng hồ lặn ra đời — điều đó không nói lên ai sao chép ai; mỗi thẻ giữ đúng nguồn của nó." EN — "Two dive watches arrived in the same year 1953 — that alone says nothing about copying; each card keeps its own sources."
- **Lưu ý:** không ghép thông số reference hiện đại vào mẫu lịch sử (giữ khung GPT Work); Speedmaster không được xử lý như "đã chọn cho G08" — G08 là cổng riêng.

### C5 — Quartz, thiết kế mới và tái cấu trúc ngành diễn ra thế nào?

- **VI:** "Giữa 1969 và 1983, quartz, thiết kế mới và tái cấu trúc ngành diễn ra thế nào?" — bốn mốc cùng thời; hồ sơ không gán quan hệ nhân quả giữa chúng, mỗi thẻ giữ đúng mức nguồn.
- **EN draft:** "How did quartz, new design and industry restructuring unfold between 1969 and 1983?" — four milestones of the same years, without assigning causation between them.
- **Luồng:** mở chương → mốc 21 seiko-astron (25/12/1969; "cuộc cách mạng quartz" theo FHH) → mốc 22 royal-oak (1972, Basel; không "cứu phân khúc") → mốc 23 nautilus (1976, claim "đầu tiên trong 137 năm" theo hãng) → mốc 24 swatch-1983 (1/3/1983; Hayek làm CEO SMH giữa thập niên 1980 — không ngay 1983) → SVG + đọc tiếp nguyên trạng.
- **Câu giữ chương:** VI — "Cách mạng quartz và tái cấu trúc ngành là hai việc xảy ra cùng thời; hồ sơ này ghi từng việc ở đúng mức nguồn của nó." EN — "The quartz revolution and the industry restructuring happened in the same years; this record keeps each at its own level of sourcing."

### C6 — Cơ khí tiếp tục thay đổi ở bộ thoát và vật liệu ra sao?

- **VI:** "Câu chuyện chưa kết thúc: bộ thoát và vật liệu mới đã thay đổi cỗ máy cơ khí thế nào sau 1999?" — ba mốc: Co-Axial và Freak ở mức "theo hãng" (brand-claim), silicon-revival ở mức bối cảnh (context) theo timeline.json.
- **EN draft:** "How did mechanics keep changing — escapements and materials?" — two brand-claim milestones (Co-Axial, Freak) and one context-level milestone (silicon-revival).
- **Luồng:** mở chương → mốc 25 omega-coaxial (trích đúng "bộ thoát cơ khí thực dụng mới đầu tiên sau 250 năm") → mốc 26 un-freak (Dual Direct Escapement; silicium "theo hãng") → mốc 27 silicon-revival (2013–nay; "nhiều hãng lớn ứng dụng") → kết nối về ghi chú cuối trang hiện hành ("phát minh → khủng hoảng → phục hưng").
- **Câu giữ chương:** VI — "Ứng dụng của một hãng không tự thành chuẩn chung của ngành — mỗi thẻ nói đúng phạm vi của nó." EN — "One brand's adoption is not an industry standard — each card states its own scope."

## 2. Tương tác, trạng thái và accessibility (mọi chương)

- **Đọc danh sách:** giữ nguyên thẻ mốc dọc trang; chương không ẩn mốc, chỉ nhóm thị giác. Lọc lớp (3 nút + "Tất cả") hoạt động xuyên chương như hiện hành; đếm "N / 28 mốc" giữ nguyên.
- **Lọc không có kết quả:** hiện trạng chưa có trạng thái riêng. Theo dữ liệu thật của timeline.json: mechanism 12, brand 13, culture 3 — mỗi lớp luôn có ≥1 mốc nên không thể ra 0 khi bật riêng một lớp. Khi thêm chip chương: chip chương là liên kết neo, không tham gia lọc — không sinh trường hợp rỗng mới.
- **Hành vi đề nghị khi đang lọc rồi nhảy chương/mốc (đề nghị triển khai cho G05-B, chưa kiểm):**
  1. Đề mục chương là section tĩnh — luôn hiển thị, không tham gia lọc; nút nav chương luôn hoạt động.
  2. Nhảy tới mốc đang bị ẩn bởi lọc: giữ hành vi hiện hành (`jumpToMilestone` bỏ qua mốc có `layer-hidden`) — không tự bật lại lớp.
  3. Nút nav chương hiển thị thêm "k/N" (số mốc đang hiển thị trong chương / tổng mốc chương) khi lọc đang ẩn bớt, để người đọc thấy còn gì bị ẩn; khi "Tất cả" thì chỉ hiện số tổng. Khuôn nhãn cụ thể G05-B quyết khi dựng. Ghi nhận đây là quan sát hiện trạng, chưa phải ca đã kiểm.
- **Nhảy mốc:** nhóm thập niên hiện hành giữ nguyên; thêm nhóm "Chương" (6 nút, cuộn tới đề mục chương). Bấm nhảy tới mốc bị ẩn bởi lọc: giữ hành vi hiện hành (bỏ qua — `jumpToMilestone` kiểm `layer-hidden`).
- **Anchor hiện hành:** giữ `#milestone-{i}` không đổi (không đổi id; anchor này đã chung cho cả hai ngôn ngữ). Đề mục chương dùng **ID chung hai ngôn ngữ** `#chuong-c1` … `#chuong-c6` — đề xuất dùng đúng một chuỗi ở cả bản VI và EN (ID là định danh kỹ thuật, không phải nội dung dịch), nhờ vậy hash giữ nguyên khi chuyển ngôn ngữ mà không cần bảng quy đổi. Phương án dự phòng nếu anh Vinh muốn anchor tiếng Anh (`#chapter-c1` ở bản EN): phải thêm map chuyển `#chuong-cX ↔ #chapter-cX` vào cơ chế đổi ngôn ngữ — chi phí code thêm, rủi ro lệch; không khuyến nghị.
- **Đổi ngôn ngữ khi đang ở chương/mốc (hành vi đề nghị cho G05-B):** vì mọi anchor đều là ID chung hai ngôn ngữ (`#milestone-{i}` hiện hành, `#chuong-cX` đề xuất), switcher từ `/lich-su#milestone-12` đề nghị giữ nguyên hash khi sang `/en/history/#milestone-12` — hash hợp lệ ở cả hai bản, không cần map. Trường hợp hash trỏ ID không tồn tại ở bản đích (ví dụ link cũ sâu bên ngoài): đề nghị bỏ hash và về đầu trang, không để trình duyệt đứng yên. Cơ chế switcher hiện hành giữ hash hay bỏ hash CHƯA quan sát — G05-B kiểm và dựng theo hành vi đề nghị này (ma trận M3-4); không sửa âm thầm.
- **Thứ tự thời gian ≠ nhân quả:** mỗi chương có 1 câu giữ chương (mục 1); thẻ mốc giữ nguyên nhãn ngày loại (`dayType`) để không biến "đặt hàng" thành "phát minh".
- **Bàn phím / no-JS / reduced-motion:** chương là `section` + `h2` tĩnh — mọi thứ đọc được khi tắt JS; không thêm chuyển động; giữ `prefers-reduced-motion` hiện hành của reveal.
- **Tái dùng chương G04 (bánh lắc — dây tóc):** KHÔNG nhúng lại component `BalanceHairspringChapter` vào trang lịch sử. Lý do: component đã sống trong bài `/co-che/day-toc-banh-lac` (và bản EN); nhúng thêm vào timeline nhân bản điều khiển + `aria-live` + 87 KB ảnh trong một trang dài, chi phí tải và độ phức tạp bàn phím không tương xứng. Cách dùng đúng: mốc 1 (huygens) đã dẫn `/co-che/day-toc-banh-lac` qua `readMore` — bản EN trỏ `/en/mechanisms/balance-and-hairspring/`. Nếu anh Vinh vẫn muốn nhúng: phải tính lại ngân sách tải + hai instance đồng thời, quyết định riêng ngoài hồ sơ này.

## 3. Bố cục theo bề rộng (mô tả văn bản)

- **1440px:** như khung mục 0; đề mục chương và câu hỏi căn với lưới 2 cột; nav phải có 2 nhóm: Chương (6 nút) rồi thập niên.
- **1024px:** nav phải còn (breakpoint `lg` hiện hành); chip chương co lại thành chấm màu + số.
- **768px:** nav phải ẩn, dùng panel mobile hiện hành; thêm nhóm Chương vào panel (cuộn dọc max-h hiện hành).
- **375/320px:** thẻ mốc một cột nguyên trạng; đề mục chương chữ h1→h2 cỡ hiện hành; câu giới hạn chương bọc khung, không tràn ngang.
