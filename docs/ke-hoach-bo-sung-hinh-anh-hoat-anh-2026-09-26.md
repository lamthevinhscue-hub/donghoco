# KẾ HOẠCH BỔ SUNG — MINH HỌA AI, HOẠT ẢNH THỰC HƠN VÀ NỘI DUNG CHO NGƯỜI SƯU TẦM

**Ngày lập:** 26/09/2026
**Nền đối chiếu:** HEAD `c18a313`
**Người lập:** Claude
**Trạng thái:** dự thảo trình anh Vinh duyệt. Đây là **phần bổ sung** cho `docs/KE-HOACH-HOP-NHAT-GIAI-DOAN-3-2026-09-25.md`, không thay thế kế hoạch đó.

**Căn cứ:**

- Đề xuất "người chơi lâu năm cần gì thêm" ngày 26/09
- Chỉ đạo của anh Vinh ngày 26/09: **không dùng ảnh của hãng, không dùng ảnh chụp**; dùng tạo ảnh của ChatGPT để làm bản vẽ mô phỏng; hoạt ảnh hiện tại "mã tốt nhưng tương tác bất tiện, không thực, không đẹp"

---

# PHẦN 0 — TIẾN ĐỘ GIAI ĐOẠN 3 SAU HAI NGÀY

Từ `3192133` đến `c18a313` có **10 commit**. Theo thông điệp commit, gần như toàn bộ việc tuần 1 và một phần tuần 2 đã xong:

| Gói | Commit |
|---|---|
| S1 — sửa 12 lỗi ưu tiên 1 | `6f19c02` |
| N1 — khối "Ghi chú nguồn" | `cc89468` |
| N2 — bộ kiểm giọng văn | `57ecd2b` |
| S2 — sửa tiêu chí màu ảnh AI | `0229a7a` |
| S3 — bí danh tay và tiêu đề "Việt trước" | `7fd1625` |
| S4 — bảng quét câu so sánh tuyệt đối | `fb64aa9` |
| N3 — viết lại bài và mục từ điển mới | `84b1712` |
| U1 — khung loạt "Hiểu đúng" | `8e223c6` |
| K3 — nối các script mồ côi | `4ba159c` |
| K2 — tự lưu phông chữ | `c18a313` |

Tôi chưa soát chi tiết nội dung từng commit; sẽ làm trong lượt nghiệm thu riêng.

---

# PHẦN 1 — BẢNG KẾ HOẠCH TIẾP THEO

Bốn nhóm mới, không trùng mã với giai đoạn 3 (S, N, I, U, T, L, C, K):

- **M** — minh họa bằng ảnh AI
- **V** — hoạt ảnh và tương tác thực hơn
- **D** — dữ liệu tra cứu cho người sưu tầm
- **G** — ghi chép và kết nối với người đọc

| Mã | Việc | Kết quả mong đợi | Ai làm | Phụ thuộc | Ưu tiên |
|---|---|---|---|---|---|
| **M1** | Quy chuẩn minh họa AI và đợt thử 9 ảnh | Ba phong cách ảnh được anh duyệt, kèm bảng kiểm | Claude soạn câu lệnh; anh hoặc GPT Work tạo ảnh; anh duyệt | Không | **Cao** |
| **M2** | Hạ tầng quản lý ảnh AI toàn trang | Một bảng khai báo duy nhất cho mọi ảnh AI; bộ kiểm tự động bảo đảm ảnh nào cũng có nhãn | GLM | M1 | **Cao** |
| **M3** | 10 ảnh kiểu dáng theo nhóm đồng hồ | Minh họa cho từ điển, hướng dẫn, "Hiểu đúng", trang mẫu iconic | Anh hoặc GPT Work tạo; GLM tích hợp | M1, M2 | Cao |
| **M4** | 10 ảnh cận cảnh chất liệu và hoàn thiện | Minh họa cho nhóm từ điển Hoàn thiện và từ vựng mặt số | Như M3 | M1, M2 | Cao |
| **M5** | Bản vẽ phác 15 mẫu iconic | Mỗi hồ sơ chuyên sâu có một bản vẽ | Như M3; **anh kiểm độ chính xác** | M1 đạt riêng phần thử bản vẽ mẫu | Trung bình |
| **M6** | Minh họa cho 10 bài "Hiểu đúng" | Mỗi bài một ảnh khái niệm | Như M3 | M1, M2 | Trung bình |
| **V1** | Nâng cấp mô hình 3D hiện có | Bánh răng có răng thật, dây tóc xoắn, vật liệu kim loại thực, ánh sáng môi trường | GLM | Không | **Cao** |
| **V2** | Sửa cách tương tác của mọi hoạt ảnh | Kéo để xoay, thanh trượt để tua chậm, chạm để xem tên bộ phận; bớt nút bấm | GLM | Không | **Cao** |
| **V3** | Thử nghiệm bộ thoát dựng sẵn điều khiển bằng thanh trượt | So sánh trực tiếp với bản SVG hiện tại | GLM | V1 | Trung bình |
| **V4** | Mô hình 3D chuyên nghiệp dùng chung | Một bộ máy và vỏ dựng chuẩn, dùng cho 3D, video và ảnh minh họa | Người dựng 3D thuê ngoài hoặc mô hình mua có giấy phép | **Anh quyết ngân sách** | Tùy quyết định |
| **D1** | Trang riêng cho từng calibre | 10 calibre đầu tiên: thông số, đời trước đời sau, mẫu nào dùng | Claude hồ sơ nguồn; GLM dựng khung trang | Không | Cao |
| **D2** | Tra cứu theo số reference | Người đọc gõ số reference, thấy đời, calibre, biến thể | GLM, từ dữ liệu sơ đồ tiến hóa | Nhóm I của giai đoạn 3 | Trung bình |
| **D3** | Từ vựng giới sưu tầm đồng hồ cổ | 12 mục từ điển: tritium, radium, mặt số tropical, mặt số in chữ vàng, mặt số thay thế khi bảo dưỡng... | Claude hồ sơ nguồn và viết | T1 của giai đoạn 3 | Cao |
| **D4** | Kiến thức nhận biết đồng hồ cổ | Bài về dạ quang qua các thời kỳ, ký hiệu mặt số, chữ khắc nắp đáy | Claude | D3 | Trung bình |
| **D5** | Bảng chính sách bảo dưỡng chính hãng | Chu kỳ khuyến nghị và bảo hành theo công bố của từng hãng | Claude hồ sơ nguồn; GLM dựng bảng | Không | Cao |
| **D6** | Bảng tổng hợp công bố của hãng về chịu nước, chịu từ, điều kiện sử dụng | Đặt cạnh nhau cho dễ so | Như D5 | D5 | Thấp |
| **D7** | Công cụ "Đọc bộ máy" | Chạm vào từng vùng trên hình bộ máy để biết tên và vai trò | GLM | V1 hoặc V4 | Trung bình |
| **G1** | Chuyên mục "Ghi chép nhà sưu tầm" | Bài trải nghiệm cá nhân của anh, tách rõ khỏi phần kiến thức | **Anh viết**, Claude biên tập | Không | **Cao** |
| **G2** | Loạt "Đồng hồ trong đời sống người Việt" | Lời kể của nhà sưu tầm và thợ lâu năm, kèm ảnh bối cảnh AI | Anh thu thập lời kể; Claude biên tập | M1 | Trung bình |
| **G3** | Chuyên mục "Hỏi nhà sưu tầm" | Câu hỏi người đọc gửi qua trang Liên hệ, trả lời thành bài | Anh chọn câu hỏi; Claude soạn nháp | Không | Trung bình |

**Những việc chủ động không làm:** thêm thương hiệu mới, tin tức sản phẩm, giá cả và gợi ý đầu tư. Kết quả các phiên đấu giá nổi tiếng chỉ xuất hiện như dữ kiện lịch sử có nguồn, nếu anh muốn.

---

# PHẦN 2 — MINH HỌA BẰNG ẢNH AI (NHÓM M)

## 2.1. Nói rõ trước về rủi ro

Dùng ảnh AI **tránh được** vấn đề bản quyền của ảnh chụp và ảnh hãng. Nhưng **không tự động tránh** hai vấn đề khác, nhất là khi vẽ một mẫu đồng hồ cụ thể:

1. **Độ chính xác.** Mô hình sinh ảnh thường vẽ sai những chi tiết mà người chơi lâu năm nhận ra ngay: vạch trên vành, hình dáng kim, tỉ lệ vấu, vị trí núm. Một bản vẽ sai làm giảm uy tín của cả hệ thống dẫn nguồn.
2. **Kiểu dáng sản phẩm.** Kiểu dáng của một số mẫu nổi tiếng có thể được pháp luật bảo hộ, bất kể hình được chụp hay được vẽ. Dùng cho mục đích giáo dục, phi thương mại, không có logo và không có tên hãng trong hình thì rủi ro thấp hơn, nhưng **không phải bằng không**. Tôi không phải luật sư; nếu anh muốn chắc chắn, nên hỏi ý kiến người có chuyên môn về sở hữu trí tuệ trước khi làm đợt M5.

Vì vậy kế hoạch **xếp các loại ảnh theo mức rủi ro** và làm loại an toàn trước.

## 2.2. Bốn loại ảnh, xếp từ an toàn nhất

| Loại | Ví dụ | Rủi ro chính xác | Rủi ro kiểu dáng | Gói |
|---|---|---|---|---|
| **Cận cảnh chất liệu** | Vân guilloché, perlage, Côtes de Genève, vát cạnh, men, mặt số ngả màu | Thấp — hoa văn chung | Không có | M4 |
| **Kiểu dáng theo nhóm** | "Đồng hồ lặn kiểu thập niên 1950", "đồng hồ phi công", "dress watch mặt chữ nhật" — không phải mẫu nào cụ thể | Trung bình | Rất thấp | M3 |
| **Ảnh khái niệm** | Điện thoại đặt cạnh đồng hồ (bài chống từ), kính sapphire có vết xước (bài kính) | Thấp | Không có | M6 |
| **Bản vẽ phác một mẫu cụ thể** | Bản vẽ mặt trước theo mô tả chữ của hồ sơ Submariner | **Cao** | **Có** | M5 |

**Không dùng ảnh AI cho:** sơ đồ cấu tạo bộ máy (mô hình sinh ảnh vẽ bánh răng vô nghĩa — phần này thuộc nhóm V), và bất kỳ hình nào cần làm bằng chứng kỹ thuật.

## 2.3. Ba phong cách, dùng cố định

Mỗi phong cách có một đoạn mở đầu dán nguyên văn vào ChatGPT ở đầu cuộc trò chuyện, để các tấm cùng loại nhất quán với nhau.

### Phong cách 1 — Bản vẽ kỹ thuật (cho M3, M5)

```
I am going to ask you for a series of technical watch illustrations for an
educational website. Every image must share one consistent look: a watchmaker's
drafting sheet, fine dark ink linework with soft graphite shading and a restrained
wash of steel grey and warm brass, on warm off-white paper texture. Straight-on
front view unless I say otherwise, centered, generous margins, 4:3 landscape.
Absolutely no brand names, no logos, no text, no signatures, no watermarks. Hour
markers are plain shapes; do not write any numerals unless I explicitly ask for
them. Please confirm, then wait for my first subject.
```

### Phong cách 2 — Cận cảnh chất liệu (cho M4)

```
I am going to ask you for a series of macro close-up images of watch finishing
and dial textures for an educational website. Every image must share one
consistent look: photorealistic macro view, very shallow depth of field, soft
directional light from the upper left, neutral grey and warm metal tones, no
background clutter, 4:3 landscape. No brand names, no logos, no text, no
numerals, no watermarks. Please confirm, then wait for my first subject.
```

### Phong cách 3 — Bối cảnh lịch sử (cho dòng thời gian, G2)

Giữ nguyên phong cách chiến hào v3 anh đã duyệt, câu lệnh đầy đủ ở `docs/bo-cau-lenh-anh-ai-dong-thoi-gian-2026-09-24.md` Phần 3.

## 2.4. Câu lệnh mẫu

**Kiểu dáng theo nhóm — đồng hồ lặn kiểu thập niên 1950 (M3):**

```
Subject: a generic 1950s-style dive watch, not any specific brand or model. Round
steel case, black rotating bezel with a simple 60-minute scale shown only as tick
marks, a single triangle at the top of the bezel, black dial with large round and
bar-shaped luminous markers, simple sword hands, a plain crown at 3 o'clock, a
three-link steel bracelet. No numerals, no text, no logo.
```

**Cận cảnh chất liệu — perlage (M4):**

```
Subject: perlage finishing on a watch movement main plate — many small, evenly
overlapping circular grained spots covering a flat nickel-silver surface, catching
the light. Only the surface texture, no parts, no screws, no text.
```

**Ảnh khái niệm — bài "Điện thoại và nam châm có làm đồng hồ cơ chạy sai?" (M6):**

```
Subject: a generic mechanical wristwatch lying on a wooden desk next to a
smartphone and a small magnetic phone mount, soft morning light, calm composition,
photorealistic. The watch dial is softly out of focus with no readable numerals.
No brand names, no logos, no screen content, no text.
```

**Bản vẽ phác một mẫu cụ thể (M5) — chỉ làm sau khi đợt thử đạt:** câu lệnh không nêu tên hãng, mà mô tả từng đặc điểm nhận diện đã có nguồn trong hồ sơ chuyên sâu. Claude soạn cho từng mẫu khi tới đợt.

## 2.5. Bảng kiểm trước khi nhận một ảnh

| # | Câu hỏi | Áp cho |
|---|---|---|
| 1 | Có chữ, số, logo, chữ ký, hình mờ nào không? | Tất cả |
| 2 | Có khuôn mặt nhận diện được không? | Tất cả |
| 3 | Có chi tiết sai thời đại hoặc sai kỹ thuật lộ rõ không? | Tất cả |
| 4 | Tông màu có đúng phong cách đã chốt không? | Tất cả |
| 5 | Các đặc điểm nhận diện ghi trong hồ sơ có vẽ đúng không? Anh kiểm từng điểm | M5 |
| 6 | Có vô tình giống hệt một mẫu cụ thể khi ta muốn ảnh chung chung không? | M3 |

Không đạt một câu thì tạo lại. **Với M5: tạo ba lần vẫn sai một đặc điểm nhận diện thì bỏ, dùng ảnh kiểu dáng theo nhóm thay thế.**

## 2.6. Nhãn và lưu vết

- Nhãn hiển thị: **"Minh họa AI mô phỏng — không phải ảnh sản phẩm"** / **"AI illustration — not a product photograph"**. Ảnh bối cảnh lịch sử giữ nhãn đang dùng.
- **Không bao giờ tải ảnh của hãng hoặc ảnh trên mạng lên ChatGPT làm mẫu.** Chỉ mô tả bằng chữ. Dùng ảnh của người khác làm đầu vào là tạo ra tác phẩm phái sinh từ ảnh có bản quyền.
- Mỗi ảnh lưu: câu lệnh, ngày tạo, số lần tạo lại, lý do chọn, người kiểm.

## 2.7. M1 — Đợt thử 9 ảnh

| Loại | Ba ảnh thử |
|---|---|
| Kiểu dáng theo nhóm | Đồng hồ lặn thập niên 1950; đồng hồ phi công; dress watch mặt chữ nhật |
| Cận cảnh chất liệu | Perlage; Côtes de Genève; vân guilloché |
| Bản vẽ phác mẫu cụ thể | Ba mẫu có đặc điểm nhận diện rõ, chọn trong đợt 1 iconic |

**Điểm dừng:** anh xem 9 ảnh cạnh nhau, quyết định phong cách nào giữ, và **có làm M5 hay không**.

## 2.8. M2 — Hạ tầng quản lý ảnh AI toàn trang

**Vấn đề:** hiện nhãn AI được khai báo trong một bảng nằm riêng trong `HistoryTimeline.astro`, chỉ dùng cho dòng thời gian. Khi ảnh AI xuất hiện ở từ điển, bài iconic, "Hiểu đúng", cách này không còn đủ.

**Giải pháp:** một tệp khai báo duy nhất (ví dụ `src/data/ai-images.json`), mỗi ảnh một dòng: đường dẫn, loại ảnh, nhãn VI/EN, mô tả thay thế VI/EN, mã hồ sơ câu lệnh. Một component hiển thị ảnh AI dùng chung, tự gắn nhãn. Bộ kiểm tự động: mọi ảnh trong các thư mục ảnh AI phải có trong tệp khai báo, và ngược lại.

---

# PHẦN 3 — HOẠT ẢNH VÀ TƯƠNG TÁC THỰC HƠN (NHÓM V)

## 3.1. Vì sao hiện tại trông không thực — đo trên mã

Tôi mở mô hình 3D trên trang Giải phẫu và đọc mã `src/scripts/exploded3d.ts`:

- Toàn bộ mô hình dựng từ **khối hình học cơ bản**: 15 hình trụ, 3 hình hộp, 2 hình xuyến. Bánh răng là đĩa trơn không có răng; kim là thanh dẹt.
- Vật liệu dùng `MeshStandardMaterial` nhưng **không có ánh sáng môi trường** (không thấy `RoomEnvironment` hay bản đồ môi trường). Kim loại thật trông "thật" chủ yếu nhờ phản chiếu môi trường; thiếu phần này, thép và đồng trông như nhựa.
- Tương tác đi qua nút bấm ("Tách lớp", "Chuyển động", "Phát", "Bước", "Đặt lại") thay vì thao tác trực tiếp lên vật thể.

Các infographic 2D là SVG vẽ tay bằng mã: chuẩn về nguyên lý nhưng đơn giản hóa hình khối, chuyển động theo công thức đều, thiếu quán tính.

Nói cách khác: **mã tốt, nhưng thiếu "tài sản hình"** — hình khối chính xác, vật liệu, ánh sáng. Đây là việc của công cụ dựng hình, không phải việc viết thêm mã.

## 3.2. Các công cụ hiện có và nên dùng vào việc gì

| Công cụ | Làm được gì | Phù hợp cho | Không phù hợp cho |
|---|---|---|---|
| **Three.js nâng cấp** (đang dùng) | Bánh răng có răng thật dựng bằng thuật toán, dây tóc xoắn, vật liệu kim loại có độ nhám, ánh sáng môi trường, bóng đổ | Nâng cấp ngay mô hình hiện có, không cần người ngoài | Chi tiết cực nhỏ như vít, vân hoàn thiện |
| **Blender** (miễn phí) | Dựng mô hình 3D chính xác, dựng hình chất lượng điện ảnh, xuất mô hình GLB hoặc video | Tài sản 3D dùng chung, video bộ thoát, ảnh bộ máy chính xác | Người không quen dựng 3D tự làm |
| **Mô hình GLB + `<model-viewer>`** (công cụ mã nguồn mở của Google) | Hiển thị mô hình 3D chất lượng cao, kéo xoay, chụm phóng, điểm chú thích | Trình xem 3D đơn giản, ổn định trên điện thoại | Hoạt ảnh cơ khí phức tạp |
| **Rive** | Hoạt ảnh vector tương tác có máy trạng thái, mượt, nhà thiết kế chỉnh được | Thay các infographic SVG 2D: bộ thoát, chuỗi bánh răng, lịch | 3D |
| **Video dựng sẵn điều khiển bằng thanh trượt** | Chất lượng hình thực nhất; người đọc kéo thanh trượt để tua chậm từng pha | Chu kỳ bộ thoát, dao động bánh lắc, tách lớp | Xoay tự do theo mọi góc |
| **Tạo video bằng AI** (các công cụ tạo video hiện nay) | Cảnh không khí đẹp | Đoạn mở đầu, cảnh bối cảnh | **Không dùng cho cơ chế** — sai chuyển động như ảnh AI sai bánh răng |
| **Tạo mô hình 3D bằng AI từ chữ hoặc ảnh** | Mô hình thô nhanh | Vỏ đồng hồ trang trí | **Không dùng cho bộ máy** — lưới hình thô, không chính xác |

## 3.3. Ba phương án, từ ít tốn đến nhiều tốn

### Phương án 1 — Nâng cấp tại chỗ bằng Three.js (V1 + V2)

**GLM làm được, không cần người ngoài, không tốn chi phí.**

- Bánh răng dựng có răng thật theo biên dạng; bánh lắc có nan và vành; dây tóc là đường xoắn ốc thật; chân kính đỏ trong suốt
- Thêm ánh sáng môi trường, vật liệu kim loại có độ nhám khác nhau (thép đánh bóng, đồng mạ, thép chải xước), bóng đổ mềm
- Chuyển động bánh lắc có quán tính, đúng nhịp: một nhịp là nửa dao động
- Tương tác (V2): kéo để xoay; chụm hoặc cuộn để phóng; **thanh trượt tốc độ** từ chuyển động thật tới tua chậm; chạm vào bộ phận để hiện tên và liên kết bài; bớt còn một nút chính
- Giữ nguyên ngân sách tải hiện có (script `check-3d-loading-budget.mjs`) và chế độ giảm chuyển động

**Kỳ vọng:** thực hơn rõ rệt, nhưng vẫn là "mô hình giáo khoa", không đạt độ thực của ảnh dựng điện ảnh.

### Phương án 2 — Thử bộ thoát dựng sẵn (V3)

Dựng chu kỳ bộ thoát bằng Blender (hoặc bằng chính cảnh Three.js của phương án 1), xuất thành đoạn video ngắn. Trên trang, người đọc **kéo thanh trượt** để đi qua từng pha: khóa, nhả, xung lực, khóa lại. Chữ giải thích mỗi pha đặt bằng HTML bên cạnh, dịch được, đọc được bằng công cụ hỗ trợ.

**Làm thử một cơ chế** rồi đặt cạnh bản SVG hiện tại để anh so.

### Phương án 3 — Một mô hình 3D chuyên nghiệp dùng chung (V4)

**Điều quan trọng nhất trong phần này:** đầu tư **một** mô hình 3D chính xác của một bộ máy tự động kiểu Thụy Sĩ phổ thông và một vỏ đồng hồ **không mang thương hiệu nào**, rồi dùng lại cho nhiều việc:

- Trình xem 3D tương tác trên trang Giải phẫu
- Video dựng sẵn cho bộ thoát, bánh lắc, lên dây tự động, tách lớp
- **Ảnh bộ máy chính xác** cho công cụ "Đọc bộ máy" (D7) và cho bài viết — giải quyết đúng chỗ mà ảnh AI không làm được

Vì là mô hình chung, không thương hiệu, do mình đặt làm hoặc mua có giấy phép, nên **không vướng bản quyền ảnh và không vướng kiểu dáng sản phẩm**.

**Hai cách có mô hình:**

1. **Thuê người dựng 3D tự do** — chính xác nhất, trang sở hữu toàn quyền
2. **Mua mô hình trên các chợ mô hình 3D** — nhanh hơn, nhưng phải đọc kỹ giấy phép: có cho phép hiển thị trên web và cho người xem xoay mô hình không

Tôi chưa kiểm giá hiện hành của hai cách, nên không nêu con số ở đây.

## 3.4. Khuyến nghị

Làm **phương án 1 ngay** (V1, V2) vì không tốn gì và cải thiện rõ. Song song, **làm thử phương án 2** trên bộ thoát (V3) để anh thấy độ thực của hình dựng sẵn. Sau đó anh quyết có đầu tư **phương án 3** hay không.

## 3.5. Nguyên tắc tương tác áp cho mọi hoạt ảnh mới

1. **Thao tác trực tiếp** lên vật thể thay vì bấm nút ở chỗ khác
2. **Một hành động chính** mỗi màn hình; các tùy chọn khác thu gọn
3. **Thanh trượt tốc độ và thanh trượt thời gian** cho mọi chuyển động cơ khí — người học cần xem chậm
4. **Chạm để hiện tên**, không bắt người đọc dò chú thích ở chỗ khác
5. **Điện thoại trước**: vùng chạm đủ lớn, cử chỉ quen thuộc
6. **Tự chạy khi cuộn tới, dừng khi rời màn hình**; tôn trọng chế độ giảm chuyển động
7. **Chữ giải thích bằng HTML**, không vẽ vào hình — giữ đúng quy chuẩn hình ảnh

---

# PHẦN 4 — THỨ TỰ ĐỀ XUẤT

| Đợt | Việc | Điểm dừng anh duyệt |
|---|---|---|
| **1** | M1 đợt thử 9 ảnh; V1 và V2 nâng cấp 3D và tương tác; G1 bài ghi chép đầu tiên của anh | Duyệt phong cách ảnh; xem mô hình 3D mới; quyết có làm M5 |
| **2** | M2 hạ tầng ảnh AI; V3 thử bộ thoát dựng sẵn; D1 trang calibre (5 calibre đầu); D5 bảng bảo dưỡng chính hãng | So bộ thoát dựng sẵn với SVG; **quyết phương án 3 và ngân sách** |
| **3** | M3, M4 (20 ảnh); D3 từ vựng sưu tầm cổ; G3 "Hỏi nhà sưu tầm" | Duyệt 20 ảnh |
| **4** | M5 nếu được duyệt, theo đúng nhịp các đợt iconic của giai đoạn 3; M6 theo nhịp "Hiểu đúng"; D2 tra cứu reference; D4 | Duyệt từng đợt |
| **5** | V4 nếu được duyệt; D7 "Đọc bộ máy"; D6; G2 | Nghiệm thu |

Các đợt này **chạy xen với giai đoạn 3**, không chờ giai đoạn 3 xong. Nhóm M3, M5, M6 gắn thẳng với các đợt iconic và "Hiểu đúng".

---

# PHẦN 5 — BA QUYẾT ĐỊNH CẦN ANH ĐƯA RA

| Mã | Quyết định | Khuyến nghị | Khi nào |
|---|---|---|---|
| **Q8** | Có làm bản vẽ phác từng mẫu cụ thể (M5) không | Chờ xem kết quả đợt thử M1; cân nhắc hỏi ý kiến người có chuyên môn sở hữu trí tuệ | Sau M1 |
| **Q9** | Có đầu tư mô hình 3D chuyên nghiệp (V4) không, ngân sách bao nhiêu | Quyết sau khi xem V1 và V3 | Sau đợt 2 |
| **Q10** | Tên và vị trí chuyên mục "Ghi chép nhà sưu tầm" | Mục riêng, ghi rõ là trải nghiệm cá nhân, không trộn với phần kiến thức có dẫn nguồn | Trước G1 |

---

# GHI CHÚ VỀ GIỚI HẠN

- Nhận định về mô hình 3D dựa trên mã `exploded3d.ts` và một lần xem trên production ngày 26/09.
- Tôi không đưa giá của dịch vụ dựng 3D, chợ mô hình hay công cụ Rive vì chưa kiểm giá hiện hành.
- Phần rủi ro kiểu dáng sản phẩm ở mục 2.1 là nhận định chung, **không phải tư vấn pháp lý**.
- Không tệp mã nguồn nào bị sửa trong lượt này.
