# RA-SOAT-DOT-2.md — Báo cáo sửa lỗi đợt 2

**Ngày:** 2026-08-02
**Phạm vi:** 6 nhóm lỗi theo yêu cầu. Mỗi dòng ghi file / dòng / nội dung cũ / nội dung mới.

---

## Nhóm 1 — Lỗi thời đại "Đông Đức"

| File | Dòng | Cũ | Mới |
|------|------|-----|-----|
| `src/content/thuongHieu/vi/a-lange-soehne.md` | 104 | `một ngôi làng nhỏ ở vùng Erzgebirge, đông Đức` | `một ngôi làng nhỏ ở vùng núi Erzgebirge thuộc Sachsen, miền đông nước Đức` |
| `src/content/thuongHieu/vi/blancpain.md` | 66 | `Đại diện xuất sắc Đông Đức` (mô tả Glashütte Original) | `Đại diện xuất sắc của chế tác Đức vùng Glashütte` |
| `src/content/thuongHieu/vi/glashuette-original.md` | 3 | `chế tác Đông Đức — mặt số và movement đẹp độc đáo, với ba phần tư (3/4) plate đặc trưng` | `chế tác Đức vùng Glashütte — mặt số và bộ máy (movement) đẹp độc đáo, với bản đĩa ba phần tư (three-quarter plate) đặc trưng` |

**Giữ nguyên đúng:** `glashuette-original.md` dòng 16 ("dưới chế độ Đông Đức" cho giai đoạn sau 1945 — đúng bối cảnh lịch sử).

---

## Nhóm 2 — Danh xưng "lâu đời nhất" + movement/counting/55 năm

| File | Dòng | Cũ | Mới |
|------|------|-----|-----|
| `src/content/mauIconic/vi/zenith-el-primero.md` | 50 | `El Primero là một trong những movement **lâu đời nhất thế giới vẫn được sản xuất** — 55 năm và vẫn counting. Nó chứng minh...` | `El Primero là một trong những bộ máy chronograph **lâu đời nhất vẫn còn được sản xuất**. Nó chứng minh...` |
| `src/content/thuongHieu/vi/longines.md` | 16 | `logo lâu đời nhất thế giới vẫn còn nguyên hình dáng (1867)` | `một trong những logo đồng hồ lâu đời nhất thế giới vẫn còn nguyên hình dáng` |

**Kiểm chứng Longines 1867:** Nguồn không thống nhất — 1867 là năm xây nhà máy tại khu "Les Longines"; 1889 là năm đăng ký trademark "Longines". Vì không chắc, **bỏ con số** và ghi vào `CAN-KIEM-CHUNG.md`.

**Giữ nguyên đúng:** "trước Patek 16 năm", "trước AP 120 năm", "trước Lange 90 năm" — đây là **khoảng cách năm thành lập** (hằng số), không phải tuổi → không sai theo thời gian.

---

## Nhóm 3 — Bỏ "X năm" tính từ năm thành lập (sai theo thời gian)

| File | Dòng | Cũ | Mới |
|------|------|-----|-----|
| `src/content/thuongHieu/vi/vacheron-constantin.md` | 92 | `(1755, 271 năm liên tục)` | `(1755)` |
| `src/content/thuongHieu/vi/vacheron-constantin.md` | 97 | `là **nhà chế tác hoạt động liên tục lâu đời nhất thế giới** (270 năm)` | `là **nhà chế tác hoạt động liên tục lâu đời nhất thế giới**` (bỏ hẳn con số) |
| `src/content/thuongHieu/vi/tag-heuer.md` | 15 | `khởi đầu hơn 165 năm gắn liền với đo thời gian thể thao` | `khởi đầu một di sản gắn liền với đo thời gian thể thao` |
| `src/content/thuongHieu/vi/omega.md` | 89 | `Trải qua hơn 175 năm, hãng đã gắn tên mình...` | `Trải qua một lịch sử lâu dài, hãng đã gắn tên mình...` |

**Giữ nguyên (hợp lệ):**
- "hơn 250 năm" (bo-thoat, tuổi của Swiss lever escapement từ 1755) — tuổi kỹ thuật, an toàn nhiều thế kỷ.
- "hơn 130 năm sau" (tag-heuer oscillating pinion 1887) — tuổi phát minh cụ thể, an toàn.
- "3-5 năm", "1-2 năm", "30 năm" — khoảng thời gian cụ thể, không phải tuổi thương hiệu.

---

## Nhóm 4 — Tiếng Anh lẫn giữa câu tiếng Việt

| File | Dòng | Cũ | Mới |
|------|------|-----|-----|
| `src/content/thuongHieu/vi/audemars-piguet.md` | 92 | `ai muốn ' Royal Oak đeo 50 năm vẫn hiện đại'` (thừa dấu cách) | `ai muốn một chiếc Royal Oak mang khí chất đeo 50 năm vẫn hiện đại` |
| `src/content/thuongHieu/vi/audemars-piguet.md` | 92 | `'attitude'` (lẫn tiếng Anh) | `khí chất` |
| `src/content/thuongHieu/vi/fp-journe.md` | 18 | `**vỏ Bridge mỏng**` | `**vỏ cầu máy mỏng**` |
| `src/content/thuongHieu/vi/tudor.md` | 24 | `**Movement in-house từ 2015**` | `**Bộ máy tự sản xuất từ 2015**` |
| 12 file thương hiệu | thân bài | `movement` (26 vị trí) | `bộ máy` |

**12 file sửa "movement"→"bộ máy":** audemars-piguet (1), breguet (1), fp-journe (5), glashuette-original (1), grand-seiko (1), greubel-forsey (1), hamilton (3), iwc (1), jaeger-lecoultre (3), tudor (2), vacheron-constantin (1), zenith (6).

**Giữ nguyên (hợp lệ):**
- "Classic", "American Classic", "Heritage Classic" — tên dòng sản phẩm chính thức.
- "Elegance is an attitude" (Longines) — slogan + đã dịch ngay sau.
- "Traditionnelle" (Vacheron) — tên dòng sản phẩm tiếng Pháp chính thức.
- "avant-garde" (TAG Heuer) — trong ngoặc + slogan.
- "3/4 plate" trong ngoặc sau "Ba phần tư plate" — chú thích tiếng Anh cho thuật ngữ.

---

## Nhóm 5 — Rà 24 thẻ thương hiệu vs trang chi tiết

**Kết quả: 0 lệch.**

So sánh năm thành lập (`founded`) trong frontmatter với năm đầu tiên nhắc đến trong thân bài — 24/24 khớp (hoặc thân bài không nhắc năm dạng văn bản, chỉ có trong lineHistory YAML).

3 file đánh dấu "LỆCH" ban đầu đều **hợp lệ sau khi kiểm tra context**:
- `glashuette-original.md`: "1969" là năm SeaQ Spezimatic (sản phẩm), không phải năm thành lập. founded=1845 đúng.
- `philippe-dufour.md`: "1992" là năm Grande Sonnerie (tác phẩm đầu tiên). founded=1978 đúng.
- `tag-heuer.md`: "1985" là năm TAG mua Heuer. founded=1860 đúng.

Tier: trang danh sách và trang chi tiết đều dùng chung `getTierLabel()` → đồng bộ, không thể lệch.

---

## Nhóm 6 — Link 404

**0 link 404 thật.** Rà 31 link nội bộ trong src/ (markdown + .astro + .json):
- 29 link hợp lệ.
- 2 link "404" là `/images/ten-anh.jpg` và `/images/tên-ảnh.jpg` — **ví dụ minh họa** trong `src/assets/README.md` (file hướng dẫn), không phải link thật trên trang.

Xem chi tiết trong `BROKEN-LINKS.md` (đã cập nhật).

---

## Phụ lục — File kiểm chứng

Tạo `CAN-KIEM-CHUNG.md` ghi các số liệu chưa kiểm chứng được (xem file).
