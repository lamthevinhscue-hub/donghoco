# Biên bản nghiệm thu — Cụm "Bảo dưỡng & sử dụng an toàn" (Prompt 29)

- Ngày: 02/09/2026
- Commit nền: `ed4181a` — *feat(content): hoàn thiện cụm chọn đồng hồ đầu tiên* (working tree sạch khi bắt đầu)
- Trạng thái cuối: **CHỜ COMMIT** — không commit, không push (theo quy trình)

## 1. Phạm vi thực hiện

Viết lại/chuẩn hoá theo nguồn 4 bài hướng dẫn, thêm DecisionMap cho bài bảo dưỡng, thêm script kiểm cụm vào `npm run check`, 3 tài liệu (hồ sơ nguồn, chiến lược SEO, biên bản này), cập nhật `LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` lên mốc mới.

## 2. Thay đổi theo tệp

| Tệp | Thay đổi |
|-----|----------|
| `src/content/huongDan/vi/bao-duong-dong-ho.md` | Viết lại toàn bộ. Title mới "Bảo dưỡng đồng hồ cơ: nhận biết nhu cầu service và làm việc với nơi sửa chữa"; `updated: 2026-09-02`; 4 nguồn HTTPS (3 Omega + 1 Rolex). Cấu trúc 7 mục: service là gì / khi nào liên hệ chuyên môn / chuẩn bị thông tin / đọc báo giá / bảo quản giữa các lần / việc không nên tự làm / checklist trước khi giao. Bỏ hoàn toàn: bảng tần suất 3–4/4–5 năm, bảng chi phí VN theo hãng (Seiko 1.5–3 triệu → Tourbillon 100+ triệu), "service đầy đủ 4–8 tuần" + "chạy thử 1–6 tuần", "sai số > 10–15 giây/ngày", "power reserve 70→30", "gấp 3–5 lần", "tăng giá trị khi bán", "rửa xà phòng" như quy tắc chung, phân loại chê "thợ sửa đồng hồ chung". **Vòng 2 siết thêm 6 câu vượt nguồn**: "các hãng khá giống nhau" → chỉ mô tả OMEGA/Rolex như ví dụ riêng; "hơi ẩm phá hoại bộ máy" → dấu hiệu nên liên hệ nơi có chuyên môn sớm; "service chính hãng thường bao gồm thay gioăng" → phạm vi khác theo hãng/tình trạng, hỏi báo giá; "vặn đến cảm nhận độ căng" → bỏ, dẫn hướng dẫn đúng mẫu + bài lên dây; "sấy/phơi nắng làm ẩm lan sâu hơn" → bỏ cơ chế, chỉ không dùng mẹo tự xử lý; "một vết trượt có thể…" → bỏ ví dụ cơ học. |
| `src/content/huongDan/vi/chon-co-dong-ho.md` | **Vòng 2 viết lại hoàn toàn**: loại bảng tra chu vi cổ tay → đường kính/vấu, mọi khoảng số đo (32-36/36-39/39-42/42-46mm, 8-9mm, 14mm), nhận định "cổ tay người Việt/Á", quy tắc cộng trừ mm, ý "vấu quan trọng hơn đường kính", quy tắc vấu tuyệt đối, quy đổi 30×40≈38mm. Cấu trúc mới: vì sao không có một cỡ đúng / đọc thông số của đúng mẫu (xem cùng nhau, không quy tắc ưu tiên) / phương pháp đối chiếu thực tế / checklist mua online / FAQ không số đo khuyến nghị. 2 nguồn Longines/TAG Heuer chỉ nâng ý "đo cổ tay + tham khảo thông số". `updated: 2026-09-02`; link 2 chiều với trụ cột P28 và link bảo dưỡng giữ. |
| `src/content/huongDan/vi/hop-xoay-dong-ho.md` | **Vòng 2 viết lại hoàn toàn thành khung quyết định trung tính** (title mới "Hộp xoay đồng hồ: xác định gì trước khi dùng"): mô tả thiết bị không hứa hẹn / 4 điều xác định trước / khi có thể không cần (không "hầu hết", "luôn", "thật sự cần") / trước khi sử dụng (chỉ theo tài liệu đúng mẫu, không tự đặt TPD/chiều quay/nhịp) / dấu hiệu bất thường thì đọc bài bảo dưỡng / FAQ ngắn không lời khuyên không nguồn. Bỏ toàn bộ: "phần lớn người chơi không cần", "ba trường hợp thật sự có ích", "giữ đồng hồ không dừng", "cổ tay bạn đã là hộp xoay", "một phút là xong", "chạy không nghỉ", "tăng cường độ vận hành", "một tư thế cố định", khuyến nghị "ngắt quãng", kết luận về chu kỳ bảo dưỡng. 2 nguồn FHH chỉ dùng cho mô tả cơ chế automatic/thùng cót. |
| `src/content/huongDan/vi/nhan-biet-dong-ho-gia.md` | **Vòng 2 viết lại hoàn toàn thành "Đồng hồ đã qua sử dụng: giới hạn của tự kiểm"**: không có danh sách dấu hiệu nhìn xác nhận thật/giả / đối chiếu reference = sàng lọc không phải xác thực / hộp-thẻ-serial-hóa đơn không tự chứng minh / câu hỏi nên hỏi người bán (reference, lịch sử, đổi trả, kiểm tra độc lập) / khi chưa xác minh thì dừng hoặc đặt điều kiện kiểm tra độc lập / FH là nguồn thông tin + phản ánh vi phạm, không phải dịch vụ xác thực / kết dẫn 2 bài cụm. Bỏ toàn bộ mục "dấu hiệu" (chất lượng in, kim giây, tiếng máy, trọng lượng, hoàn thiện, giá) và các claim "người làm giả đầu tư/bỏ qua", "chi phí kiểm tra nhỏ hơn rủi ro", "hãng không chịu trách nhiệm". 2 nguồn FH giữ với vai trò đúng. |
| `src/data/decisionMaps.ts` | Thêm `careMap` cho slug `bao-duong-dong-ho`: heading "Bạn đang gặp tình huống nào?", đúng 3 nhánh (dấu hiệu bất thường / chăm sóc hằng ngày / mua-nhận đã qua sử dụng), 7 link nội bộ; đăng ký vào `MAPS`. Đổi 4 nhãn cho khớp nội dung bài vòng 2 (mục 6.2 bên dưới): nhánh 3 map P28 "Làm việc với nơi sửa chữa đồng hồ" và "Giới hạn tự kiểm khi mua đã qua sử dụng"; nhãn trong careMap "Tìm hiểu thao tác lên dây theo đúng mẫu", "Giới hạn tự kiểm khi mua đã qua sử dụng", "Hộp xoay: xác định gì trước khi dùng". |
| `scripts/check-care-cluster.mjs` | Mới — kiểm 4 bài theo nguồn (frontmatter/nguồn/link bắt buộc/map/pattern cấm từng bài/semantics). **Vòng 2 mở rộng pattern cấm**: chon-co (bảng tra, khoảng mm, "cổ tay người Việt/Á", quy tắc vấu, quy đổi chữ nhật), hop-xoay (15 cụm claim lợi ích/cách cài/thời gian), nhan-biet (11 cụm claim tự kiểm bằng mắt), bảo dưỡng (+6 khái quát vượt nguồn) và kiểm dương trọng tâm nhan-biet ("không tự chứng minh", "không phải dịch vụ xác thực"). Đã vào cuối chuỗi `npm run check` trong `package.json`. |
| `docs/ho-so-nguon-bao-duong-va-su-dung-an-toan.md` | Mới — 10 nguồn, ngày + phương pháp xác minh, claim ↔ nguồn, tiêu chí loại. |
| `docs/chien-luoc-seo-cum-bao-duong-va-su-dung-an-toan.md` | Mới — tách rõ phần giả định cần kiểm chứng; không tuyên bố hiệu suất. |
| `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` | Mốc lần 10 (02/09/2026) — cập nhật số trang/link build, số bài huongDan có nguồn, thêm dòng Prompt 29. |

## 3. Kiểm tự động (bằng chứng)

### 3.1. `node scripts/check-care-cluster.mjs` — ĐẠT (9 tiêu chí, chạy trong `npm run check`)

```
4 bài tồn tại, frontmatter đủ title/excerpt/difficulty/date/updated
"bao-duong-dong-ho": 4 nguồn HTTPS, trong đó 4 nguồn chính hãng
"chon-co-dong-ho": 2 nguồn HTTPS
"hop-xoay-dong-ho": 2 nguồn HTTPS
"nhan-biet-dong-ho-gia": 2 nguồn HTTPS
Đủ 8 liên kết bắt buộc trong bài bảo dưỡng, mọi route tồn tại
DecisionMap bao-duong: heading đúng theo đề
DecisionMap bao-duong: đúng 3 nhánh
DecisionMap bao-duong: 7 link nội bộ đều tồn tại
DecisionMap chon-dong-ho-dau-tien: nguyên vẹn với 8 link
Bài bảo dưỡng: không còn chu kỳ cố định, bảng chi phí, "X tuần", "gấp X lần", xà phòng, sai số tuyệt đối
Bài nhan-biet: không còn kết luận tuyệt đối, có "không phải bằng chứng" + phần giới hạn tự kiểm
Không có link vòng (bài/map không tự trỏ chính nó)
DecisionMap.astro: <section> + H2 mang id + aria-labelledby + H3 nhánh — semantics nguyên vẹn
URL ngoài trong cả 4 bài đều dùng HTTPS
KẾT LUẬN: ĐẠT
```

### 3.2. `npm run check` — toàn bộ ĐẠT (15 script, gồm 2 script cụm mới + cũ), không có lỗi mới.

### 3.3. `npm run build` — ĐẠT

- Astro build: **222 trang**; Pagefind index 222 pages; sitemap OK.
- `check-3d-loading-budget`: ĐẠT (không route nào tải chunk 3D ban đầu).
- `check-links`: `OK: Không phát hiện link nội bộ hỏng. Đã quét 222 trang HTML, 15214 link.`

### 3.4. `git diff --check` — sạch (không lỗi whitespace).

## 4. Kiểm trình duyệt (Playwright, preview build production)

### 4.1. Trang bảo dưỡng `/huong-dan/bao-duong-dong-ho/` — desktop 1280

- HTTP 200; title + H1 đúng tiêu đề mới.
- DecisionMap: 1 khối; H2 "Bạn đang gặp tình huống nào?"; đúng 3 nhánh H3; 7 link đúng nhãn; `aria-labelledby` khớp id H2 (`dm-bao-duong-dong-ho-title`).
- 4 nguồn hiển thị đúng 4 URL (3 Omega + 1 Rolex).
- Overflow ngang: **0px** ở 1280px, 375px và 640px (mô phỏng zoom 200%).
- Tối: body `rgb(17,21,25)`, H2 map `rgb(208,178,123)`, card `rgb(32,39,45)` — đo sau khi chuyển đổi màu ổn định. Sáng: body `rgb(251,251,248)`, H2 map `rgb(138,106,53)`.
- Bàn phím: chuỗi focus đi đủ **7/7 link** của map đúng thứ tự DOM.
- Console: chỉ 404 `_vercel/insights/script.js` + `favicon.ico` — hiện tượng có sẵn của môi trường preview, không liên quan thay đổi.

### 4.2. Ba bài còn lại

- `chon-co-dong-ho`: h1=1, có bảng bọc `.table-scroll-wrap`, không có map (đúng — không đăng ký), overflow 0px.
- `hop-xoay-dong-ho`, `nhan-biet-dong-ho-gia`: h1=1, không map, overflow 0px.

### 4.3. Không suy giảm cụm P28

- `/huong-dan/chon-dong-ho-dau-tien/`: map nguyên vẹn 8 link; link tới bài bảo dưỡng hiển thị nhãn mới "Làm việc với nơi sửa chữa đồng hồ".

### 4.4. No-JS (CDP `setScriptExecutionDisabled`)

4 trang HTTP 200, H1 đúng, nội dung đầy đủ (9.544 / 5.013 / 5.172 / 6.831 ký tự), link nội bộ còn nguyên, DecisionMap hiển thị dạng tĩnh, bảng `chon-co` vẫn hiển thị.

## 5. Số liệu build trước/sau

| Chỉ số | Nền ed4181a | Sau vòng 1 | Sau vòng 2 (số cuối) | Chênh so nền |
|--------|-------------|------------|----------------------|--------------|
| Số trang build | 222 | 222 | **222** | 0 |
| Link nội bộ | 15198 | 15214 | **15189** | **−9** |

Giải thích vòng 1 (+16): DecisionMap mới đầu bài bảo dưỡng +7 link; 4 bài viết lại tạo thêm link markdown mới và mất một số link autolink thuật ngữ — ròng +9 từ phần bài.

Giải thích vòng 2 (−25 so vòng 1, ròng **−9** so nền): 3 bài được rút gọn theo yêu cầu làm chính xác nguồn — bài `chon-co` mất bảng tra (mất link autolink thuật ngữ gắn với bảng + FAQ cũ), bài `nhan-biet` bỏ các mục "dấu hiệu" (mất link vat-canh/vau-day/khoa-day/day-vo/bo-thoat), bài `hop-xoay` rút claim. Suy giảm số link là **hệ quả biên tập có chủ ý** của việc loại nội dung không nguồn; các link còn lại đều qua `check-links` (0 hỏng).

**Số bài huongDan có khối nguồn: 10/14 → 14/14** (đề tính 9/14 → 13/14; đối chiếu git trên nền `ed4181a`, nhóm 10 bài đã có nguồn sẵn gồm cả `doc-va-chinh-gmt`, `dung-tachymeter`, `dung-vanh-lan`, `hoan-thien-thu-cong-dong-ho`, `microbrand-la-gi` — các bài này không thuộc phạm vi Prompt 29).

## 6. Điểm cần anh lưu ý khi rà độc lập

1. **Nhãn link trong map P28 đã đổi**: nhánh 3 của map `chon-dong-ho-dau-tien` trỏ tới bài bảo dưỡng với nhãn cũ "Bảo dưỡng: chi phí sở hữu lâu dài" — bài mới bỏ hoàn toàn nội dung chi phí nên nhãn này sai với nội dung đích. Đã đổi thành "Làm việc với nơi sửa chữa đồng hồ". **Vòng 2 đổi thêm 2 nhãn nữa** cho khớp bài mới: "Nhận biết dấu hiệu đồng hồ giả" → "Giới hạn tự kiểm khi mua đã qua sử dụng" (bài nhan-biet không còn mục "dấu hiệu") và trong careMap "Lên dây đúng cách mỗi ngày" → "Tìm hiểu thao tác lên dây theo đúng mẫu", "Hộp xoay: khi nào cần, khi nào không" → "Hộp xoay: xác định gì trước khi dùng". Map P28 còn nguyên 8 link.
2. **Lần chạy đầu thiếu đăng ký map**: `careMap` được khai báo nhưng chưa có trong mảng `MAPS`, DecisionMap không render — phát hiện qua kiểm HTML build, đã sửa (`MAPS = [firstWatchMap, careMap]`) và build lại.
3. **Rolex chặn curl (403)**: nguồn Rolex xác minh qua trình đọc trang; hồ sơ nguồn ghi rõ hạn chế này — anh nên mở trực tiếp trên trình duyệt khi rà.
4. **"5–8 năm" của OMEGA có trong bài ở dạng trích dẫn có nguồn** (trang Interventions & Prices), không phải bảng khuyến nghị chung — đây là con số duy nhất về chu kỳ còn lại trong bài, kèm lưu ý tần suất phụ thuộc cách dùng.
5. Bài `nhan-biet` sau vòng 2 **không còn** link tới `/co-che/bo-thoat`, `/tu-dien/vat-canh`, `/tu-dien/vau-day`, `/tu-dien/khoa-day`, `/tu-dien/day-vo` (các mục "dấu hiệu" đã bỏ) — đây là nguyên nhân chính link tổng giảm so vòng 1; mọi link còn lại qua `check-links` (0 hỏng).

## 7. Trạng thái Git cuối phiên

```
M  package.json
M  src/content/huongDan/vi/bao-duong-dong-ho.md
M  src/content/huongDan/vi/chon-co-dong-ho.md
M  src/content/huongDan/vi/hop-xoay-dong-ho.md
M  src/content/huongDan/vi/nhan-biet-dong-ho-gia.md
M  src/data/decisionMaps.ts
?? scripts/check-care-cluster.mjs
?? docs/ho-so-nguon-bao-duong-va-su-dung-an-toan.md
?? docs/chien-luoc-seo-cum-bao-duong-va-su-dung-an-toan.md
?? docs/nghiem-thu/2026-09-02_nghiem-thu-cum-bao-duong-va-su-dung-an-toan.md
M  docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md
```

Gợi ý stage khi anh commit (từng tên tệp, không `git add .`): 6 tệp M trên + 4 tệp mới + LO-TRINH. Các tệp `??` cũ trong `docs/` không thuộc gói này — giữ nguyên.

## 8. Sửa sau rà soát độc lập (vòng 2 — Prompt sửa, cùng ngày 02/09/2026)

Nhận định vòng 1 **KHÔNG ĐẠT điều kiện commit** vì 3 bài còn khẳng định vượt nguồn. Sửa theo nguyên tắc "một nguồn chỉ nâng đỡ đúng điều nó nói":

### 8.1. Claim đã bỏ (theo từng bài)

- **`chon-co`**: bảng chu vi cổ tay → đường kính/vấu; các khoảng 32-36/36-39/39-42/42-46mm, 8-9mm, 14mm trở lên; "cộng thêm 2-4mm"; "cổ tay người Việt nhỏ hơn chuẩn quốc tế", "cổ tay người châu Á"; "lug-to-lug quan trọng hơn đường kính"; quy tắc "khoảng cách vấu nhỏ hơn hoặc bằng bề rộng cổ tay"; quy đổi 30×40mm ≈ tròn 38mm; title/excerpt không còn ngụ ý bảng tra.
- **`hop-xoay`**: "phần lớn người chơi không cần"; "ba trường hợp thật sự có ích"; "giữ đồng hồ không dừng"; "cổ tay bạn đã là hộp xoay"; "bỏ ra một phút là xong"; "chạy không nghỉ/24-7"; "tăng cường độ vận hành"; "một tư thế cố định"; khuyến nghị chế độ "ngắt quãng"; mọi kết luận về ảnh hưởng chu kỳ bảo dưỡng; khẳng định "dùng không đúng sẽ có rủi ro"; chữ "hầu hết", "luôn", "thật sự cần".
- **`nhan-biet`**: "giả thường lộ ở những chi tiết khó làm và tốn kém"; "người làm giả đầu tư vào thứ nhìn thấy ngay"; "kim giây của đồng hồ cơ chạy mượt liên tục"; "máy quartz gần như im lặng"; "kim loại chính hãng thường nặng tay"; toàn bộ mục "dấu hiệu" về in/hoàn thiện/ốc vít/đáy vỏ; "giá thấp bất thường là tín hiệu đáng dừng lại nhất"; "chi phí kiểm tra nhỏ hơn rất nhiều so với rủi ro"; "không hãng nào chịu trách nhiệm bảo dưỡng nó"; "chỉ hãng hoặc người tháo đáy vỏ xem bộ máy mới đưa ra xác nhận đáng tin".
- **`bao-duong`** (siết 6 câu): "khá giống nhau về bản chất"; "hơi ẩm phá hoại bộ máy"; "quy trình service chính hãng thường bao gồm thay gioăng và kiểm tra chống nước"; "vặn nhẹ nhàng đến khi cảm nhận độ căng"; "sấy/phơi nắng làm hơi ẩm lan sâu hơn"; "một vết trượt có thể xước vỏ hoặc để ốc rơi vào bộ máy".

### 8.2. Nguồn giữ/bỏ và vai trò ghi trong hồ sơ

- Giữ đủ 10 nguồn (không bỏ nguồn nào, không thêm nguồn mới). Vai trò viết lại trong `ho-so-nguon-bao-duong-va-su-dung-an-toan.md`: FHH **chỉ** nâng cơ chế automatic/thùng cót, **không** chứng minh khuyến nghị hộp xoay; Longines/TAG Heuer **chỉ** nâng "đo cổ tay + tham khảo thông số", không gán ngưỡng số; FH **chỉ** là nguồn thông tin + kênh phản ánh, không phải dịch vụ xác thực; OMEGA/Rolex là ví dụ quy trình riêng từng hãng, không khái quát mọi hãng.

### 8.3. Kiểm tra chạy lại thật sau vòng 2 (không ghi trước khi chạy)

- `git diff --check`: sạch.
- `node scripts/check-care-cluster.mjs`: **ĐẠT** — lần chạy đầu sau mở rộng bắt đúng 2 vi phạm (chữ "bảng tra" sót trong intro chon-co; pattern "thật sự cần" quá rộng khớp cả "thực sự cần" vốn là câu đề chỉ định) — đã sửa cả hai rồi chạy lại ĐẠT với đầy đủ các dòng báo cáo 4 bài.
- `npm run check`: toàn bộ **ĐẠT** (không có dòng KHÔNG ĐẠT/LỖI).
- `npm run build`: **222 trang**; `check-3d-loading-budget` ĐẠT; `check-links`: `OK: Không phát hiện link nội bộ hỏng. Đã quét 222 trang HTML, 15189 link.`
- HTML build 4 trang: mỗi trang đúng **1 H1**; `/huong-dan/bao-duong-dong-ho/` có DecisionMap với H2 "Bạn đang gặp tình huống nào?" + 3 H3 + 7 link + `aria-labelledby` khớp; **0 bảng** trong bài chon-co (grep "Chu vi cổ tay|Đường kính vỏ khuyên|Khoảng cách vấu tối đa|cổ tay người Việt|người châu Á|165-180" = 0 khớp); claim cấm hop-xoay (ngắt quãng/không nghỉ/tư thế cố định/ba trường hợp/phần lớn người chơi/chu kỳ bảo dưỡng/hầu hết) và nhan-biet (nặng tay/mượt/tíc tắc/quartz/giá thấp bất thường/khó làm và tốn kém) = **0 khớp** trong HTML; 4 nhãn map mới hiển thị đúng trên 2 trang có map.
- Playwright (preview build): HTTP 200; overflow **0px** ở 1280/375/640; dark body `rgb(17,21,25)`, light `rgb(251,251,248)`; bàn phím **7/7** link map; bảng cũ không còn.
- No-JS (CDP `setScriptExecutionDisabled`): 4 trang HTTP 200, H1 đúng (kể cả 2 title mới "…xác định gì trước khi dùng", "…giới hạn của tự kiểm"), nội dung đầy đủ (9.595/5.760/4.976/5.169 ký tự), map hiển thị tĩnh.
