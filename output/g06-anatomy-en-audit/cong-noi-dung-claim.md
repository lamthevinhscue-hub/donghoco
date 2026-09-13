# G06-A chặng 1 vòng sửa 3 — Cổng nội dung trước dịch: hồ sơ claim và câu VI/EN (bản 3 — CHỐT)

Ngày sửa: 2026-09-13 · Nền `f42c11e` · **Lịch sử phiên bản:** bản 1 (đề xuất ban đầu) và bản 2 (vòng sửa 1) **đã bị THAY THẾ**; các đề xuất "chờ duyệt" trong bản 2 về C5 (vẽ hai nhánh), cột vật liệu, nhãn kính, bảng vai trò **không còn giá trị** — quyết định hiện hành là nội dung bản 3 này theo TXN-20260913-25.

## Ba mức bằng chứng (áp dụng cho mọi claim)

1. **Nội dung repo** — trích đoạn trong bài đã duyệt của website (nguồn sơ cấp mà bài dẫn: FHH…).
2. **Nguồn đã đọc trực tiếp** trong chặng này — ghi URL, thời điểm truy cập, trích nguyên văn.
3. **Chưa xác minh** — không có bằng chứng mức 1 hoặc 2: không được đưa vào mô tả; nếu muốn giữ phải kiểm bổ sung trước.

**Nguồn đã đọc trực tiếp (mức 2):**
- FHH Escapement — `https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/escapement` (truy cập 2026-09-13): "A mechanism that is fitted between the gears and the regulating organ." · "Its function is to suspend the gears' motion at regular intervals and to supply energy to the balance."
- FHH Balance — `https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/balance` (truy cập 2026-09-13): "A circular, moving part which oscillates on its rotational axis." · "Combined with the spiral it forms the regulating organ of the watch." · "Each to-and-fro movement ("tick-tock") is called an oscillation, and each oscillation comprises two vibrations."

**Nội dung repo dùng đối chiếu (mức 1):** CDC = `co-che/vi/chuyen-dong-co.md` (nguồn FHH Movement/Calibre; "một loạt bánh răng", "cuối cùng lái các kim giây/phút/giờ", "giảm tốc"); CN = `co-che/vi/chong-nuoc.md` (gioăng tại núm, nút, kính, nắp lưng; gioăng lão hóa — Omega/Seiko); BT = `co-che/vi/bo-thoat.md` (định nghĩa theo FHH: "nằm giữa chuỗi bánh răng và bộ điều tiết — chặn-nhả chuyển động định kỳ và cấp năng lượng cho bánh lắc"); DTBL = `co-che/vi/day-toc-banh-lac.md` + `tu-dien/vi/day-toc-banh-lac.md` (FHH Balance spring).

Quy tắc chung: một câu trong bài repo KHÔNG tự động là bằng chứng sơ cấp đủ — phải khớp phạm vi của claim. Mô tả mặc định là **mô tả chức năng**; vật liệu/hiệu năng/số lượng chỉ thêm khi có nguồn trực tiếp đủ phạm vi.

## Bảng claim — quyết định và cặp câu VI/EN đầy đủ

### C1 — Mặt số ("Quyết định 80% diện mạo")
- Quyết định: **bỏ 80%**; mô tả chức năng; không biến "định hình diện mạo" thành kết luận tuyệt đối.
- VI: "Hiển thị các chữ số, vạch khắc và thương hiệu — nơi người dùng đọc giờ trực tiếp."
- EN: "Shows the numerals, indices and brand — the surface you read the time from."

### C2 — Kính (bỏ "9/10", "chống xước gần như tuyệt đối", "only diamond or another sapphire")
- Quyết định: **mô tả tối thiểu**; vật liệu/hiệu năng phải có nguồn trực tiếp đủ phạm vi mới thêm; không sửa bài kính ngoài gói.
- VI: "Lớp trong suốt bảo vệ mặt số và kim."
- EN: "The transparent layer that protects the dial and hands."
- Ghi: bài `kinh-dong-ho.md` nói "gần như không xước" nhưng phạm vi bài là so sánh ba loại kính — vẫn KHÔNG đủ làm nguồn cho một câu định nghĩa trên sơ đồ; ghi **chưa xác minh** nếu muốn nói sapphire/độ cứng.

### C3 — Kim giây (bỏ "liên kết trực tiếp với bộ thoát")
- Quyết định: **bỏ quan hệ trực tiếp**; mô tả chức năng hiển thị giây; "một vòng/phút" gắn với sơ đồ đang minh họa.
- VI: "Kim hiển thị giây — trong sơ đồ này, quay một vòng mỗi 60 giây."
- EN: "The hand that shows the seconds — in this diagram, one turn per 60 seconds."

### C4 — Bộ bánh răng (bỏ "chuỗi 4 bánh răng"; không tự diễn giải "chia tốc")
- Quyết định: **bỏ số**; phân biệt truyền năng lượng (tới bộ thoát) với dẫn chuyển động hiển thị (lái kim — CDC có "cuối cùng lái các kim giây/phút/giờ"); KHÔNG dùng "chia tốc/chia tỷ lệ cho kim" (chưa có nguồn đúng phạm vi).
- VI: "Loạt bánh răng truyền năng lượng từ thùng cót đến bộ thoát và lái các kim."
- EN: "A train of gears that carries power from the barrel to the escapement and drives the hands."

### C5 — Quan hệ nguyên lý (hero + cột năng lượng/thời gian + đường `#wev-energy`)

- Quyết định đã chốt: **bỏ chuỗi tuyến tính "…→ bánh lắc → …→ kim"**; tách ba vai: bộ truyền (dẫn năng lượng), bộ thoát (nằm giữa bộ bánh răng và bộ điều tiết — chặn và nhả chuyển động bộ bánh răng theo chu kỳ, cấp năng lượng cho bánh lắc — FHH, mức 2), bộ điều tiết (bánh lắc + dây tóc — FHH Balance, mức 2). KHÔNG viết "bộ thoát nhả bánh lắc" / "releases the balance". Kim là phần hiển thị (CDC).
- **Cặp câu hero cuối cùng (VI):** "Một chiếc đồng hồ cơ không phải là một khối đặc — nó là tòa tháp xếp lớp các chi tiết được vít chặt vào nhau. Sơ đồ tách lớp minh họa 12 bộ phận được chọn để giải thích cấu trúc; không đại diện đầy đủ cho một calibre cụ thể. Năng lượng đi từ thùng cót qua bộ bánh răng tới bộ thoát — nơi chuyển động của bộ bánh răng bị chặn và nhả theo từng nhịp để nuôi bộ điều tiết; kim ở trên cùng là phần hiển thị giờ-phút-giây của cùng một cỗ máy."
- **Cặp câu hero cuối cùng (EN):** "A mechanical watch is not a solid block — it is a tower of parts screwed tightly together. This exploded diagram shows 12 selected parts to explain the structure; it is not a complete representation of any specific calibre. Energy flows from the mainspring barrel, through the gear train to the escapement — where the gears' motion is stopped and released beat by beat to keep the regulator swinging. The hands at the top are the display end of the same machine."
- **Cột "Dòng năng lượng" cuối cùng — VI:** "Rotor → thùng cót → bộ bánh răng → bộ thoát — đường đi của năng lượng cơ học trong bộ máy." — **EN:** "Rotor → mainspring barrel → gear train → escapement — the path of mechanical energy through the movement."
- **Cột "Dòng thời gian" cuối cùng — VI:** "Bộ thoát chặn và nhả chuyển động của bộ bánh răng theo từng nhịp, cấp năng lượng cho bánh lắc; bộ điều tiết chia thời gian thành các phần bằng nhau, và các kim hiển thị kết quả." — **EN:** "The escapement stops and releases the gear train's motion beat by beat and supplies energy to the balance; the regulator divides time into equal parts, and the hands display the result."
- **Quyết định HÌNH (chốt, không phải đề xuất):** khi tích hợp **bỏ riêng đường mũi tên `#wev-energy`** đang gây hiểu nhầm; **giữ trục bố cục (`#wev-axis`) và hình các bộ phận**; dùng **khối chữ VI/EN cạnh sơ đồ** để phân biệt bộ truyền, bộ thoát, bộ điều tiết theo C4/C9/C10 đã duyệt. **Không thêm sơ đồ dòng năng lượng mới, không thay hình học/hoạt ảnh 3D.**
- **Danh sách markup/CSS/marker liên quan dự kiến bỏ** (khi tích hợp, khỏi `WatchExplodedView.astro`):
  - Markup: khối `<g id="wev-energy" pointer-events="none">` (chứa path năng lượng + `<marker id="wevArrowUp">` lồng bên trong) và khối comment "ĐƯỜNG NĂNG LƯỢNG…" (dòng 230–238 vùng hiện tại).
  - CSS: quy tắc `#wev-energy { opacity: 0; transition: opacity 0.38s ease; }`, `#exploded-svg.exploded #wev-energy { opacity: 0.9; }`, và tên `#wev-energy` trong danh sách chuyển động-tắt của `@media (prefers-reduced-motion: reduce)`.
  - Marker `wevArrowUp`: chỉ được tham chiếu bởi path trong `#wev-energy` (`marker-end="url(#wevArrowUp)"`) — bỏ cùng khối; **marker chỉ bỏ nếu không còn nơi sử dụng** (kiểm lại lúc tích hợp bằng grep cả component).
  - Kiểm không để tham chiếu SVG mất đích: sau khi bỏ, grep toàn component phải không còn `wev-energy` / `wevArrowUp`; `#wev-axis` và các gradient (`wevSteel`, `wevBrass`, `wevRuby`, `wevDial`, `wevSapphire`) còn dùng — giữ nguyên.
  - Khối chữ VI/EN cạnh sơ đồ: viết theo cột "Dòng năng lượng"/"Dòng thời gian"/"Dòng thông tin" đã duyệt ở trên (không vẽ thêm hình).

### C6 — Số chi tiết thật / đường kính ("hơn 100 chi tiết", "30-40mm", "hàng trăm", "vài chục milimet", "điển hình" — tất cả bị loại)
- Quyết định: **không dùng bất kỳ con số/bằng chứng nào về cấu tạo thật chưa có nguồn**; dùng câu chuẩn:
- VI: "Sơ đồ tách lớp minh họa 12 bộ phận được chọn để giải thích cấu trúc; không đại diện đầy đủ cho một calibre cụ thể."
- EN: "This exploded diagram shows 12 selected parts to explain the structure; it is not a complete representation of any specific calibre."
- Vị trí áp dụng: hero (thay "hơn 100 chi tiết siêu nhỏ… 30-40mm"); thẻ chi tiết mặc định 2D ("12 bộ phận **chính** của một chiếc đồng hồ cơ" → "12 bộ phận **được chọn**…"); nội dung cùng nghĩa ở thẻ 3D. Ghi chú 3D hiện có "không mô phỏng một calibre cụ thể" — giữ, cùng chuẩn.

### C7 — Đáy vỏ (bỏ cả "kín = chống nước tốt" lẫn "chống nước chỉ nằm ở gioăng")
- Quyết định: **chỉ mô tả kiểu đáy**; kiểu đáy tự nó chưa đủ kết luận khả năng chống nước; KHÔNG dịch exhibition caseback thành "open" (gây hiểu đáy hở).
- VI: "Nắp đáy — có loại kín, có loại gắn cửa sổ quan sát bộ máy (đáy kính); kiểu đáy tự nó chưa đủ để kết luận khả năng chống nước."
- EN: "The caseback — closed, or fitted with a window over the movement (an exhibition caseback); the caseback style alone does not determine water resistance."
- Ghi: câu cũ "chống nước nằm ở hệ gioăng" (bản 1) cũng bị loại khỏi mô tả bộ phận — nội dung gioăng vẫn nằm ở bài chống nước đúng phạm vi.

### C8 — Kim giờ (bỏ "ngắn và dày nhất")
- Quyết định: **mô tả chức năng**; chu kỳ 12 giờ gắn với sơ đồ.
- VI: "Kim chỉ giờ — trong sơ đồ này, quay một vòng mỗi 12 giờ."
- EN: "The hand that shows the hours — in this diagram, one turn every 12 hours."

### C9 — Bộ thoát (bỏ ẩn dụ "TRÁI TIM ĐẬP"; ưu tiên nhãn chức năng)
- Quyết định: **nhãn chức năng** theo FHH (mức 2) + BT (mức 1, cùng định nghĩa).
- VI: "Bộ thoát — nằm giữa bộ bánh răng và bộ điều tiết: chặn và nhả chuyển động của bộ bánh răng theo chu kỳ, cấp năng lượng cho bánh lắc."
- EN: "The escapement — fitted between the gear train and the regulator: it stops and releases the gears' motion at regular intervals and supplies energy to the balance."
- CTA cuối trang: "♥ Bộ thoát (trái tim)" → **"Bộ thoát"** (nhãn chức năng; mô tả dài không cần trên nút).

### C10 — Bánh lắc + dây tóc ("quyết định độ chính xác" bị loại; phân biệt oscillation/vibration)
- Quyết định: **"bánh lắc và dây tóc tạo thành bộ điều tiết"** (FHH Balance, mức 2); nếu nói dao động phải phân biệt oscillation/vibration, không dùng "beat" thay tùy tiện.
- VI: "Bánh lắc và dây tóc tạo thành bộ điều tiết — mỗi chu kỳ qua lại (oscillation) gồm hai lần rung (vibration)."
- EN: "The balance and hairspring form the regulating organ — each to-and-fro oscillation comprises two vibrations."
- Ghi: câu 2D cũ "biến năng lượng thành nhịp thời gian" cũng thay bằng câu trên để hai bản đồng nhất.

### C11 — Mặt số phụ (chức năng ngắn, bỏ liệt kê kết cấu chưa có nguồn)
- VI: "Mặt số nhỏ hiển thị chức năng phụ, ví dụ giây chạy hoặc lịch."
- EN: "A small dial showing a secondary function, such as running seconds or a date."
- Link `/tu-dien/perpetual-calendar` giữ nguyên.

### C12 — Kim phút (bỏ "bánh răng phút của chuỗi truyền động")
- VI: "Kim chỉ phút — trong sơ đồ này, quay một vòng mỗi 60 phút."
- EN: "The hand that shows the minutes — in this diagram, one turn every 60 minutes."

### Rà các câu còn lại cùng tiêu chuẩn

| Bộ phận/câu | Hiện trạng | Đánh giá | Cặp câu chốt |
|---|---|---|---|
| Thùng cót: "Nguồn năng lượng! Chứa dây cót xoắn — lên dây là vặn cót." (2D) / rút gọn 3D | chức năng, khớp CDC/tru-cot | GIỮ, đồng nhất mức 2D | VI giữ; EN: "The power source! It holds the coiled mainspring — winding the watch tightens it." |
| Rotor: "Quả nặng xoay theo cổ tay → tự động lên dây cót." | khớp bài len-day-tu-dong | GIỮ | VI giữ ("quả nặng xoay theo cổ tay → tự động lên dây cót"); EN: "A swinging weight that follows the wrist's motion and winds the mainspring automatically." |
| Nhãn hình "SAPPHIRE CRYSTAL" (SVG) | gán vật liệu — vi phạm chuẩn mới | **CHỐT: đổi nhãn hình** — VI "KÍNH", EN "CRYSTAL" | VI: "KÍNH"; EN: "CRYSTAL" |
| Nhãn lớp "Lớp N · …" (0 Kính…6 Đáy vỏ) | cấu trúc minh họa | GIỮ | EN: "Layer 0 · Crystal" … "Layer 6 · Caseback" |
| Bảng tổng kết cột "Vai trò cốt lõi": Bảo vệ / Hiển thị giờ / Giao diện / Dự trữ + truyền năng lượng / **Đo thời gian** / Lên dây tự động / **Đóng gói** | chức năng ngắn | GIỮ trừ hai ô đã chốt: vai bộ điều tiết = **"Điều tiết"**; vai đóng vỏ = **"Đóng vỏ"** | EN: Protection / Shows the time / Interface / Power store and transmission / **Regulation** / Automatic winding / **Case closure** |
| Bảng tổng kết cột "Vật liệu điển hình" | cột vật liệu không có nguồn từng ô | **CHỐT: BỎ cả cột ở cả VI và EN** (không còn câu hỏi giữ/bỏ) | — |
| Cột "Dòng thông tin": "Mặt số + kim là 'giao diện người dùng'…" | ẩn dụ chức năng, không claim kỹ thuật | GIỮ | EN: "The dial and hands are the user interface — they turn the movement's invisible motion into readable information. Sub-dials add functions (chronograph, calendar)." |
| Hero "Bấm 'Tách lớp'… 12 bộ phận từ kính đến đáy vỏ" | tự tham chiếu sơ đồ | GIỮ (đảm bảo khớp C6) | EN: "Press "Explode" to spread the watch into its 12 selected parts, from the crystal to the caseback. Tap any part to see its role and read the full article." |
| Tooltip "→ Chạm hoặc bấm để đọc bài" | UI | GIỮ | EN: "→ Tap or click to read the article" |
| "Mẹo: … Mũi tên ↓ chỉ hướng trọng lực" | UI | GIỮ | EN giữ ý |
| Nhãn 3D "Mô hình khái niệm… không mô phỏng một calibre cụ thể." | cùng chuẩn C6 | GIỮ | EN: "A conceptual model illustrating the structure — it does not replicate a specific calibre." |

Chính tả: đã rà các tệp hồ sơ khi cập nhật (ký tự lạ/ký tự ngoài tiếng Việt và tiếng Anh được quét bằng script trước bàn giao).

## Tổng hợp quyết định cuối

| Claim | Quyết định GPT Work | Xuất hiện cần sửa |
|---|---|---|
| C1 | bỏ 80%, mô tả chức năng | 2D SVG + 3D |
| C2 | tối thiểu, không vật liệu/hiệu năng | 2D SVG + mảng 2D |
| C3 | bỏ "trực tiếp", gắn sơ đồ | 2D SVG + 3D + mảng 2D |
| C4 | bỏ số, không "chia tốc" | 2D SVG + 3D |
| C5 | tách bộ truyền/thoát/điều tiết, bỏ tuyến tính qua bánh lắc→kim; hình: **bỏ `#wev-energy`, dùng khối chữ 3 vai** | hero + cột năng lượng/thời gian + bỏ `#wev-energy` (markup/CSS/marker) |
| C6 | câu chuẩn không số | hero + thẻ mặc định 2D/3D |
| C7 | chỉ kiểu đáy, "exhibition caseback" | 2D SVG + mảng 2D (3D "kín hoặc lộ máy" cũng sửa cùng) |
| C8 | bỏ "ngắn và dày nhất" | 2D SVG |
| C9 | nhãn chức năng, bỏ "trái tim" | 2D SVG + 3D + CTA |
| C10 | bộ điều tiết + oscillation/vibration | 2D SVG + 3D |
| C11 | chức năng ngắn | mảng 2D + 3D |
| C12 | bỏ "bánh răng phút" | mảng 2D |

Mọi cặp câu và quyết định hình/bảng ở trên là **bản chốt chờ GPT Work duyệt lại lần cuối** — chưa sửa mã. Sau duyệt, các câu áp dụng cho CẢ bản VI (để VI/EN không mâu thuẫn).
