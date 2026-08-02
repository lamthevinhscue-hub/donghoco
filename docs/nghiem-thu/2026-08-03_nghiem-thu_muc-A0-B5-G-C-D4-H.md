# ĐỢT 2 — NGHIỆM THU MỤC A0, B5, G, C, D4, H

> **NGÀY NGHIỆM THU: 03/08/2026**
> **Loại:** Nghiệm thu kết quả bàn giao của GLM
> **Đối tượng kiểm:** Commit `39efcc6` cùng 63 file chưa commit trong thư mục làm việc
> **Kết quả tóm tắt:** Đạt Mục A0 (6 trên 7), B5, G, H. Chưa làm F0 và E0. Mục D4 không hoạt động. Phát sinh 3 ký tự Trung Quốc mới
> **Trạng thái:** CHƯA DUYỆT — chờ GLM sửa 5 nhóm việc nêu ở cuối biên bản

---

**Ngày kiểm:** 03/08/2026
**Người kiểm:** Claude (Cowork) — đối chiếu trực tiếp mã nguồn, không sửa file nào
**Phạm vi giao:** Mục A0, B5, G, F0, E0, C, D4, H theo `docs/bo-prompt-glm-v2.md`
**Commit kiểm tra:** `39efcc6` — "Gộp đợt lớn: rà soát đợt 2, 5 bài cơ chế mới, plugin glossary autolink, hiển thị ảnh, 3 quy ước cấu trúc"

---

## KẾT LUẬN TỔNG

| Mục | Kết quả | Ghi chú |
|---|---|---|
| **A0** — Sửa gấp | **Đạt 6/7** | Ký tự lạ cũ đã hết, nhưng phát sinh lỗi mới ở bài vừa viết |
| **B5** — Dọn rà soát còn sót | **Đạt** | 0 link 404, đủ 3 file báo cáo |
| **G** — Chốt hai file nền | **Đạt** | |
| **F0** — Thẻ chia sẻ mạng xã hội | **Chưa làm** | 0/82 trang có thẻ `og:` hoặc `canonical` |
| **E0** — Chốt danh mục phân loại | **Chưa làm** | Không có báo cáo; GLM tự đặt `category` cho 5 bài mới mà chưa hỏi |
| **C** — 5 bài cơ chế | **Đạt phần lớn, cần sửa** | Tái dùng component đúng, nhưng có lỗi ký tự và chính tả |
| **D4** — Từ điển liên kết chéo | **KHÔNG HOẠT ĐỘNG** | Xem mục ưu tiên 1 bên dưới |
| **H** — Hiển thị ảnh thương hiệu | **Đạt** | |

**Hai vấn đề phải xử lý trước khi duyệt:** D4 chạy rỗng, và ba ký tự Trung Quốc mới phát sinh đang hiển thị công khai.

---

## ƯU TIÊN 1 — Mục D4 không hoạt động, và nguyên nhân kéo theo nhiều rủi ro

### Hiện tượng

Toàn site có **0 tooltip từ điển**. Plugin `remark-glossary-autolink` chạy nhưng không bọc được thuật ngữ nào.

Kiểm chứng: quét 82 file HTML trong `dist/`, số link `/tu-dien/...` có thuộc tính `title=` (tooltip) là **0**. 42 link `/tu-dien/` còn lại đều là link viết tay sẵn trong bài.

### Nguyên nhân gốc

File `src/data/glossary-terms.json` đang là mảng rỗng `[]` (2 byte). Script sinh file này báo `✓ Đã sinh 0 thuật ngữ` và thoát với mã 0 — tức **build vẫn "thành công" trong khi tính năng chết hoàn toàn**.

Lý do: `scripts/generate-glossary-terms.mjs` dòng 24 dùng biểu thức

```
content.match(/^---\n([\s\S]*?)\n---/)
```

Biểu thức này chỉ khớp khi file dùng ký tự xuống dòng kiểu LF. Nhưng **toàn bộ 14 file trong `src/content/tuDien/vi/` hiện đã chuyển sang kiểu CRLF**, nên không file nào khớp, tất cả bị bỏ qua.

### Vì sao các file đổi sang CRLF

`git status` đang có **63 file chưa commit**, thống kê `3865 dòng thêm / 3865 dòng xóa`. Chạy `git diff --ignore-all-space` cho kết quả **rỗng** — nghĩa là **không có một chữ nào thay đổi thật**, toàn bộ chỉ là đổi ký tự xuống dòng từ LF sang CRLF.

Repo hiện **không có file `.gitattributes`**, nên Git không chuẩn hóa được, và mỗi lần GLM lưu file trên Windows là sinh ra một khối thay đổi giả 63 file.

### Ba hệ quả

1. Tính năng D4 chết mà không báo lỗi.
2. Mọi lần xem `git diff` từ nay đều bị 63 file nhiễu che mất thay đổi thật — rất khó soát bài.
3. 63 file đó **chưa được commit**, tức bản trên GitHub và bản trên máy đang lệch nhau.

### Đề nghị xử lý

Sửa cả hai đầu: thêm `.gitattributes` để chuẩn hóa xuống dòng, và sửa biểu thức trong script cho chấp nhận cả hai kiểu. Prompt cụ thể ở cuối biên bản.

---

## ƯU TIÊN 2 — Ký tự ngoài tiếng Việt và tiếng Anh phát sinh MỚI

Bốn vị trí cũ đã sửa đúng. Nhưng **bài mới GLM vừa viết lại lọt ký tự Trung Quốc**, và đang hiển thị công khai tại `/co-che/day-toc-banh-lac`:

| File | Dòng | Nội dung lỗi |
|---|---|---|
| `src/content/coChe/vi/day-toc-banh-lac.md` | 55 | `Nhưng代价 là ma sát nhiều hơn` — hai chữ Hán 代价 |
| `src/content/coChe/vi/day-toc-banh-lac.md` | 59 | `và là战 trường vật liệu suốt 3 thế kỷ` — chữ Hán 战 |

Đây là lần thứ ba loại lỗi này tái diễn (đợt 1 chữ Trung, đợt 2 chữ Kirin và Ả Rập, đợt 3 chữ Trung). Ràng buộc "tự quét lại trước khi push" trong đoạn khóa **chưa được thực hiện**.

---

## CHI TIẾT TỪNG MỤC

### Mục A0 — Sửa gấp

| Việc | Kết quả |
|---|---|
| 1. Bốn vị trí ký tự Kirin và Ả Rập | **Đã sửa đủ 4** |
| 2. Link `glashutte-original` ở trang Blancpain | **Đã sửa** |
| 3. Xóa ba `custom_slug` lệch tên file | **Đã xóa đủ 3** |
| 4. Ẩn trang `/en` | **Đã làm đúng cả ba bước** — xóa `src/pages/en/index.astro`, thêm hai dòng chuyển hướng trong `vercel.json`, dọn nút chuyển ngôn ngữ trong `Header.astro` |
| 5. Đồng bộ `brand` và `title` | **Đã sửa** — quét lại 16 mẫu iconic đối chiếu 24 thương hiệu, 0 cặp lệch |
| 6. Nhãn phân hạng dùng chung `getTierLabel` | **Đã sửa** ở cả `BrandLayout.astro` và `thuong-hieu/[slug].astro` |
| 7. Frédérique Constant, `site`, gỡ `gsap` | **Đã sửa đủ 3** — `site` nay là `https://donghoco1.vercel.app` |

**Trừ điểm:** yêu cầu "tự quét lại toàn bộ file vừa sửa để xác nhận không còn ký tự lạ" đã được báo là làm xong, nhưng bài mới vẫn lọt chữ Hán.

### Mục B5 — Dọn rà soát còn sót

| Việc | Kết quả |
|---|---|
| 1. Lỗi thời đại "Đông Đức" — 3 vị trí | **Đã sửa đủ**, và giữ đúng chỗ hợp lệ ở `glashuette-original.md` dòng 15 |
| 2. Danh xưng "lâu đời nhất" — Zenith, Longines | **Đã sửa**, bỏ con số 1867 đúng như yêu cầu |
| 3. Vacheron 270 và 271 năm mâu thuẫn | **Đã bỏ cả hai con số** |
| 4. `attitude` và lỗi thừa dấu cách ở AP | **Đã sửa** |
| 5. Mục B2 điểm 4 — rà 24 thẻ | **Đã làm**, có bảng `foundedLabel` xử lý trường hợp Philippe Dufour |
| 6. Ba file báo cáo | **Đủ cả ba** — `RA-SOAT-DOT-2.md`, `BROKEN-LINKS.md` cập nhật lại, `CAN-KIEM-CHUNG.md` ghi đúng vụ năm logo Longines |

**Kiểm chứng độc lập:** quét lại toàn bộ 82 file HTML trong `dist/` — **0 link nội bộ 404**. Con số 10 link hỏng trước đây đã hết sạch.

### Mục G — Chốt hai file nền

- `CONTENT-GUIDE.md` đã có mục **"6. QUY TẮC CHỐNG SAI SÓT"**, dung lượng tăng từ 7.073 lên 12.843 byte.
- `IMAGE-MANIFEST.md` đã có cột trạng thái và ghi rõ vị trí nào đã có chỗ hiển thị, tăng từ 6.906 lên 14.573 byte.

### Mục F0 — Thẻ chia sẻ mạng xã hội: **chưa làm**

`src/layouts/BaseLayout.astro` vẫn không có thẻ `og:` hay `canonical` nào. Kiểm 82 trang trong `dist/`: **0/82** có `og:title`, **0/82** có `canonical`.

Đây là mục xếp thứ 4 trong thứ tự đề nghị, đứng trước Mục C. GLM đã bỏ qua để nhảy sang C.

### Mục E0 — Chốt danh mục phân loại: **chưa làm**

Không có báo cáo nào về danh mục `category`. Đáng lo hơn: GLM **đã tự đặt `category` cho 5 bài cơ chế mới** trong khi mục E0 yêu cầu báo cáo trước, chờ anh chốt rồi mới sửa schema:

| Bài mới | `category` GLM tự đặt | `difficulty` |
|---|---|---|
| chronograph | `chức năng` | cao |
| tourbillon | `cao cấp` | rất cao |
| day-toc-banh-lac | `nền tảng` | cao |
| gmt | `chức năng` | trung bình |
| perpetual-calendar | (cần kiểm) | (cần kiểm) |

Nếu sau này anh chốt bộ danh mục ba nhóm (`nền tảng` / `bổ trợ` / `phức tạp`) như kế hoạch ban đầu, cả 11 bài cơ chế sẽ phải gán lại.

### Mục C — Năm bài cơ chế mới

**Làm đúng:**

- Đủ 5 bài: `chronograph`, `tourbillon`, `day-toc-banh-lac`, `gmt`, `perpetual-calendar`.
- **Tái sử dụng đúng component có sẵn**, không viết lại SVG. Đã đăng ký đủ 5 vào bảng `infographics` trong `co-che/[slug].astro`.
- **Không đặt `custom_slug`** — tuân thủ quy ước mới.
- **Chống trùng lặp làm tốt:** các bài từ điển đã được rút gọn về đúng phần định nghĩa (146–220 từ), bài cơ chế đi sâu (675–1.040 từ), và cả 5 bài từ điển đều đã có link chéo sang bài cơ chế tương ứng.

**Cần sửa:**

1. **Ba ký tự Hán** ở `day-toc-banh-lac.md` (đã nêu ở Ưu tiên 2).
2. **Lỗi chính tả** `gmt.md` dòng 3: `cách bezem cho phép đọc múi giờ thứ ba` → phải là `bezel`. Lỗi này nằm trong `excerpt`, tức **hiển thị ra trang danh sách `/co-che`**.
3. **Tiếng Anh đứng đơn lẻ giữa câu tiếng Việt** — vi phạm quy tắc vừa đưa vào `CONTENT-GUIDE.md`:
   - `gmt.md`: chữ `bezel` xuất hiện đơn lẻ ở 6 vị trí (dòng 3, 14, 31, 35, 39 hai lần, 41); `Caller GMT` và `Flyer GMT` không kèm giải thích tiếng Việt.
   - `chronograph.md` dòng 3: `three-phase` và `Start/Stop/Reset` đứng đơn lẻ trong `excerpt`.
4. **Infographic tương tác đang hiện ở cả hai nơi.** Năm bài từ điển vẫn giữ `has_infographic: true` và `interactive: true`, nên cùng một hoạt ảnh chạy ở cả `/tu-dien/tourbillon` lẫn `/co-che/tourbillon`. Nội dung chữ thì đã tách tốt, nhưng phần hoạt ảnh vẫn song trùng. Anh cần quyết: giữ ở cả hai (chấp nhận trùng) hay chỉ giữ ở `/co-che` và để bài từ điển làm định nghĩa thuần.

**Về quy trình:** yêu cầu là "làm lần lượt từng bài, mỗi phiên một bài". GLM làm cả 5 bài cộng thêm D4 và H trong **một commit duy nhất**. Điều này khiến anh không kiểm được từng bài trước khi sang bài kế, và chính là lý do lỗi chữ Hán lọt qua.

### Mục D4 — Từ điển liên kết chéo: **không hoạt động** (xem Ưu tiên 1)

Phần mã viết đúng ý: plugin 153 dòng, có xử lý alias, chỉ bọc lần đầu, không bọc trong chính bài từ điển, sinh slug từ tên file. Nhưng do file dữ liệu đầu vào rỗng nên **chưa từng chạy được lần nào**.

### Mục H — Hiển thị ảnh thương hiệu: **đạt**

- Logo hiển thị ở đầu trang chi tiết (`BrandLayout.astro` dòng 66–67) và trên thẻ ở trang danh sách (`Card.astro` dòng 48–49).
- Ảnh hero hiển thị qua `WatchImage` (dòng 59–61), tự ra placeholder khi chưa có ảnh.
- Ảnh bìa mẫu iconic dùng `cover_image`, có dự phòng `WatchImage`.
- `IMAGE-MANIFEST.md` đã ghi chú lại các vị trí này.

---

## PROMPT SỬA LỖI — dán cho GLM

> Sửa 5 nhóm việc sau. **Làm theo đúng thứ tự**, mỗi nhóm báo lại file nào, dòng nào, sửa thành gì.
>
> **1. Chuẩn hóa ký tự xuống dòng — làm trước tiên, vì đang làm hỏng một tính năng**
>
> Repo chưa có `.gitattributes`, khiến 63 file bị đổi từ LF sang CRLF, tạo ra khối thay đổi giả `3865 dòng thêm / 3865 dòng xóa` mà không có một chữ nào thay đổi thật.
>
> - Tạo file `.gitattributes` ở gốc repo với nội dung: `* text=auto eol=lf`, cộng dòng riêng cho các đuôi `.md`, `.astro`, `.ts`, `.mjs`, `.json`, `.css`.
> - Chạy `git add --renormalize .` để chuẩn hóa lại toàn bộ, rồi commit riêng một commit với thông điệp rõ là chỉ chuẩn hóa xuống dòng.
> - Xác nhận `git status` sạch sau khi commit.
>
> **2. Sửa `scripts/generate-glossary-terms.mjs` — tính năng D4 đang chạy rỗng**
>
> Script đang sinh ra `src/data/glossary-terms.json` **rỗng** (`[]`), khiến plugin `remark-glossary-autolink` không bọc được thuật ngữ nào. Toàn site hiện có **0 tooltip từ điển**.
>
> Nguyên nhân: dòng 24 dùng `content.match(/^---\n([\s\S]*?)\n---/)` — chỉ khớp file dùng LF, trong khi 14 file trong `src/content/tuDien/vi/` đang là CRLF.
>
> - Sửa biểu thức chấp nhận cả hai kiểu, ví dụ `/^---\r?\n([\s\S]*?)\r?\n---/`. Rà cả các biểu thức khác trong file có cùng vấn đề.
> - **Quan trọng:** thêm bước kiểm tra — nếu số thuật ngữ sinh ra bằng 0, script phải **thoát với mã lỗi** và làm build thất bại. Hiện script báo `✓ Đã sinh 0 thuật ngữ` rồi thoát bình thường, nên tính năng chết mà build vẫn báo thành công.
> - Chạy lại script, xác nhận sinh ra **14 thuật ngữ**.
> - Build lại, mở `/co-che/tourbillon` và `/thuong-hieu/rolex`, xác nhận thuật ngữ đầu tiên trong bài đã thành link có tooltip, các lần sau không lặp link.
>
> **3. Ba ký tự Trung Quốc trong bài vừa viết — đang hiển thị công khai**
>
> | File | Dòng | Lỗi | Sửa thành |
> |---|---|---|---|
> | `src/content/coChe/vi/day-toc-banh-lac.md` | 55 | `Nhưng代价 là ma sát nhiều hơn` | `Nhưng cái giá phải trả là ma sát nhiều hơn` |
> | `src/content/coChe/vi/day-toc-banh-lac.md` | 59 | `và là战 trường vật liệu suốt 3 thế kỷ` | `và là chiến trường vật liệu suốt ba thế kỷ` |
>
> Sau đó **quét lại toàn bộ 11 bài trong `src/content/coChe/vi/`** cùng mọi file vừa tạo trong đợt này, xác nhận không còn ký tự ngoài bảng chữ Latin và chữ Việt có dấu. **Dán kết quả quét vào báo cáo** — đây là lần thứ ba loại lỗi này tái diễn.
>
> **4. Lỗi chính tả và tiếng Anh đứng đơn lẻ trong 5 bài cơ chế mới**
>
> - `gmt.md` dòng 3: `cách bezem cho phép` → `cách vành bezel cho phép`. Lỗi này nằm trong `excerpt` nên đang hiển thị ở trang danh sách `/co-che`.
> - `gmt.md`: chữ `bezel` đứng đơn lẻ ở các dòng 3, 14, 31, 35, 39 (hai lần), 41 → đổi thành `vành bezel` hoặc `vành xoay (bezel)` ở lần đầu, các lần sau dùng `vành bezel`.
> - `gmt.md`: `Caller GMT` và `Flyer GMT` cần kèm giải thích tiếng Việt ngắn ở lần xuất hiện đầu.
> - `chronograph.md` dòng 3: `three-phase` và `Start/Stop/Reset` trong `excerpt` → Việt hóa thành `ba pha` và `chạy, dừng, đặt lại`.
> - Rà nốt `tourbillon.md`, `perpetual-calendar.md`, `day-toc-banh-lac.md` theo cùng quy tắc.
>
> **5. Quyết định về hoạt ảnh song trùng — báo cáo, chưa sửa**
>
> Hiện cả 5 bài từ điển (`chronograph`, `tourbillon`, `day-toc-banh-lac`, `gmt`, `perpetual-calendar`) vẫn giữ `has_infographic: true` và `interactive: true`, nên cùng một hoạt ảnh tương tác chạy ở **cả hai** trang `/tu-dien/<slug>` và `/co-che/<slug>`.
>
> Phần nội dung chữ đã tách tốt (bài từ điển 146–220 từ, bài cơ chế 675–1.040 từ, có link chéo). Chỉ riêng hoạt ảnh là trùng.
>
> **Chưa sửa gì.** Hãy báo cáo cho tôi: nếu gỡ hoạt ảnh khỏi 5 bài từ điển thì các trang đó còn lại gì, và có làm trang từ điển trở nên quá trống không. Tôi quyết rồi anh mới làm.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. Riêng đợt này, **làm và push từng nhóm một**, không gộp 5 nhóm vào một commit — đợt vừa rồi gộp bảy mục vào một commit chính là lý do lỗi lọt qua.

---

## SAU KHI SỬA XONG, QUAY LẠI ĐÚNG THỨ TỰ

GLM đã nhảy cóc qua F0 và E0 để làm C, D4, H. Sau đợt sửa lỗi trên, đề nghị quay lại:

1. **F0** — thẻ Open Graph và canonical. Thay đổi nhỏ, ảnh hưởng mọi lượt chia sẻ. `astro.config.mjs` đã sửa `site` đúng nên không còn vướng gì.
2. **E0** — báo cáo danh mục `category`, chốt trước khi làm bộ lọc. Nay đã có 11 bài cơ chế nên càng nên chốt sớm, tránh phải gán lại lần nữa.
3. Rồi mới sang **E1** (tìm kiếm) và **E2** (bộ lọc).
