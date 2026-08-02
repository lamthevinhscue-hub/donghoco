# MỤC A — BÁO CÁO KIỂM KÊ HIỆN TRẠNG

**Ngày thực hiện:** 02/08/2026
**Người thực hiện:** Claude (Cowork) — đọc trực tiếp mã nguồn repo `D:\Watch web build`
**Commit tại thời điểm quét:** `4d120dd` — "Nâng cấp 3 trang thương hiệu (TAG Heuer, Ulysse Nardin, Rolex) theo dữ liệu đợt 1"
**Phạm vi:** Chỉ đọc và báo cáo. **Không sửa bất kỳ file nào trong repo.**

---

## CÂU 1 — Hai file nền `CONTENT-GUIDE.md` và `IMAGE-MANIFEST.md`

Cả hai file **đã tồn tại ở gốc repo**.

### `CONTENT-GUIDE.md` (7.073 byte, cập nhật 02/08/2026)

- Quy định giọng văn "nhà sưu tầm am hiểu": kể chuyện có cảm xúc nhưng chính xác kỹ thuật, xưng "tôi" với độc giả "bạn", nêu cả ưu lẫn nhược điểm, không viết như bài bán hàng.
- Đặt nguyên tắc nội dung: thuật ngữ lần đầu phải có giải thích tiếng Việt, số liệu kỹ thuật phải truy được nguồn, bắt buộc link chéo sang từ điển, quy ước ảnh.
- Cung cấp khung cấu trúc chuẩn cho ba loại bài (thương hiệu, mẫu iconic, cơ chế), quy tắc chính tả — định dạng, và tiêu chí duyệt nội dung.

**Lưu ý:** file này **chưa có mục "Quy tắc chống sai sót"** như Mục G1 yêu cầu.

### `IMAGE-MANIFEST.md` (6.906 byte, cập nhật 02/08/2026)

- Liệt kê toàn bộ ảnh cần chuẩn bị theo ba nhóm: logo và hero của 24 thương hiệu, ảnh hero của các mẫu iconic, ảnh 28 mốc timeline lịch sử.
- Quy định đặt tên file (chữ thường, không dấu), kích thước tối thiểu 1200px, tỷ lệ 16:10 hoặc 4:3, dung lượng dưới 300KB.
- Có phần tổng kết số lượng và checklist khi thêm ảnh.

**Lưu ý:** bảng hiện **chưa có cột "trạng thái (đã có ảnh / đang placeholder)"** như Mục G2 yêu cầu.

---

## CÂU 2 — Schema của các content collection

Nguồn: `src/content/config.ts`. Thực tế repo có **6 collection**, không phải 3.

### Trường dùng chung (`baseFields`) — áp cho mọi collection

| Trường | Kiểu | Bắt buộc |
|---|---|---|
| `title` | chuỗi | Có |
| `custom_slug` | chuỗi | Không |
| `excerpt` | chuỗi | Có |
| `date` | chuỗi hoặc ngày | Không |
| `cover_image` | chuỗi | Không |
| `draft` | luận lý, mặc định `false` | Không |
| `tags` | mảng chuỗi, mặc định rỗng | Không |

### `thuongHieu` — thêm các trường

| Trường | Kiểu | Ghi chú |
|---|---|---|
| `country` | chuỗi | Bắt buộc |
| `tier` | 7 giá trị cố định: `haute horlogerie`, `ultra luxury`, `high-end luxury`, `mid-range luxury`, `entry-level luxury`, `consumer`, `microbrand` | Bắt buộc |
| `founded` | số | Không bắt buộc |
| `parent_company` | chuỗi | Không bắt buộc |
| `signature_calibres` | mảng chuỗi | Mặc định rỗng |
| `logo` | chuỗi | Không bắt buộc |
| `lineHistory` | mảng đối tượng `{ year, title, detail }` | Khối 2 |
| `collections` | mảng đối tượng `{ name, year?, identity, positioning, iconic_ref? }` | Khối 3 |
| `segmentComparison` | mảng đối tượng `{ brand, slug?, strength, movement, value_retention, philosophy }` | Khối 4 |
| `collectorNote` | chuỗi | Ghi chú nhà sưu tầm dưới bảng đối chiếu |

### `mauIconic` — thêm các trường

`brand` (chuỗi, bắt buộc) • `year` (số) • `references` (mảng chuỗi) • `category` (7 giá trị: `lặn`, `chronograph`, `dress`, `pilot`, `gmt`, `sport-luxury`, `field`) • `movement` (chuỗi) • `power_reserve` (chuỗi) • `water_resistance` (chuỗi).

### `coChe` — thêm các trường

`category` (4 giá trị: `nền tảng`, `chức năng`, `cao cấp`, `bổ trợ`) • `difficulty` (4 giá trị: `thấp`, `trung bình`, `cao`, `rất cao`) • `has_infographic` (luận lý, mặc định `false`) • `interactive` (luận lý, mặc định `false`).

### Ba collection còn lại

- `tuDien`: `term_en`, `category` (mặc định "chung"), `has_infographic`, `interactive`.
- `huongDan`: `difficulty` (`người mới` / `trung cấp` / `nâng cao`).
- `trang`: chỉ dùng trường chung.

### Điểm cần lưu ý về schema

1. **Nhóm cơ chế trong schema lệch với yêu cầu Mục E2.** Schema hiện là `nền tảng / chức năng / cao cấp / bổ trợ`, còn Mục E2 yêu cầu lọc theo `nền tảng / bổ trợ / phức tạp`. Cần thống nhất trước khi làm bộ lọc.
2. **`category` của `mauIconic` dùng `pilot`, không phải `phi công`** như Mục E2 mô tả — cũng cần thống nhất.
3. **Trường `custom_slug` hiện không có tác dụng tạo địa chỉ trang.** Hàm `getStaticPaths` dùng `getSlug()` (lấy theo tên file), nên `custom_slug` bị bỏ qua. Chi tiết ở Câu 6.

---

## CÂU 3 — 24 trang thương hiệu: trang nào đủ 5 khối, trang nào chưa

Đối chiếu hai chiều: dữ liệu frontmatter trong `src/content/thuongHieu/vi/` và HTML đã render trong `dist/` (đánh dấu `data-block=`).

### Nhóm ĐÃ đủ 5 khối — **10 trang**

| # | Thương hiệu | Số mốc lịch sử | Số dòng đồng hồ | Số đối thủ đối chiếu |
|---|---|---|---|---|
| 1 | A. Lange & Söhne | 12 | 6 | 3 |
| 2 | Audemars Piguet | 11 | 5 | 3 |
| 3 | Blancpain | 8 | 4 | 3 |
| 4 | Jaeger-LeCoultre | 13 | 5 | 3 |
| 5 | Omega | 10 | 4 | 3 |
| 6 | Patek Philippe | 11 | 5 | 3 |
| 7 | Rolex | 17 | 10 | 3 |
| 8 | TAG Heuer | 13 | 6 | 3 |
| 9 | Ulysse Nardin | 10 | 5 | 3 |
| 10 | Vacheron Constantin | 11 | 5 | 3 |

Cả 10 trang đều có `collectorNote` và đều hiển thị đủ Khối 5 (mẫu iconic liên quan).

### Nhóm CHƯA đủ 5 khối — **14 trang**

Các trang này **chỉ có Khối 1 (hồ sơ nhanh)** và phần nội dung Markdown ngắn (khoảng 275–385 từ). Hoàn toàn **trống Khối 2, 3, 4**:

1. Breguet
2. Cartier
3. F.P. Journe
4. Frederique Constant
5. Glashütte Original
6. Grand Seiko
7. Greubel Forsey
8. Hamilton
9. IWC Schaffhausen
10. Longines
11. Philippe Dufour
12. Seiko
13. Tudor
14. Zenith

Trong 14 trang trên, **6 trang có Khối 5** (do tự động kéo từ mẫu iconic): Cartier, Grand Seiko, Seiko, Tudor, Zenith và... IWC thì **không** — xem lỗi bên dưới.

### Lỗi phát hiện thêm ở Câu 3

- **Trang IWC mất Khối 5 do lệch tên.** Bài `iwc-mark-xi.md` ghi `brand: "IWC"`, còn trang thương hiệu ghi `title: "IWC Schaffhausen"`. Hàm so khớp yêu cầu trùng khít (sau khi bỏ dấu cách, gạch nối, dấu chấm) nên không nhận ra nhau. Kết quả: trang IWC hiển thị dòng "Chưa có mẫu iconic nào của IWC Schaffhausen trên website", dù bài IWC Mark XI đã tồn tại.
- **Tên "Frederique Constant" thiếu dấu.** Trong `frederique-constant.md` ghi `title: "Frederique Constant"`, trong khi `IMAGE-MANIFEST.md` ghi đúng là "Frédérique Constant". Thuộc nhóm lỗi dấu tên riêng ở Mục B4 điểm 5.
- **Nhãn phân hạng trong `BrandLayout.astro` chưa được Việt hóa.** File này vẫn dùng "Ultra Luxury (siêu sang)", "High-End Luxury (sang trọng cao cấp)"… trong khi trang danh sách `/thuong-hieu` đã đổi sang "Xa xỉ đỉnh cao", "Cao cấp"… theo Mục B2. Hai trang đang gọi tên khác nhau cho cùng một phân hạng.

---

## CÂU 4 — Thư mục `/co-che`: số bài và mức độ tương tác

**Có 6 bài** trong `src/content/coChe/vi/`, cả 6 đều đã render thành trang trong `dist/`.

| # | Bài | Địa chỉ | Nhóm | Độ khó | Infographic | Có tương tác thật? |
|---|---|---|---|---|---|---|
| 1 | Bộ thoát (Escapement) | `/co-che/bo-thoat` | nền tảng | cao | `Escapement` | **Có** — dùng `MechanismAnimation` |
| 2 | Chuỗi truyền động | `/co-che/chuyen-dong-co` | nền tảng | trung bình | `GearTrain` | Không |
| 3 | Cơ chế lên dây tự động | `/co-che/len-day-tu-dong` | nền tảng | trung bình | `AutomaticWinding` | Không |
| 4 | Trữ cót (Power Reserve) | `/co-che/tru-cot` | bổ trợ | thấp | `PowerReserve` | Không |
| 5 | Chống nước | `/co-che/chong-nuoc` | bổ trợ | thấp | `WaterResistance` | Không |
| 6 | Chống từ (Anti-Magnetic) | `/co-che/chong-tu` | bổ trợ | trung bình | `AntiMagnetic` | Không |

### Giải thích "có tương tác thật"

Chỉ **1 trong 6 bài** — Bộ thoát — dùng component `MechanismAnimation`, tức là có đầy đủ nút play/pause, nút từng bước và thanh trượt tốc độ. Đây cũng là bài duy nhất trong `/co-che` đặt `interactive: true` ở frontmatter.

Năm bài còn lại **không phải chỉ có chữ**, nhưng cũng **không tương tác**: mỗi bài có một khối SVG tĩnh kèm hiệu ứng hiện dần khi cuộn tới (`data-anim`). Không có `addEventListener`, không có `requestAnimationFrame`, không có nút điều khiển hay thanh trượt nào.

### Năm bài cơ chế Mục C yêu cầu — hiện chưa tồn tại trong `/co-che`

Chronograph, Tourbillon, Dây tóc và bánh lắc, GMT, Lịch vạn niên **chưa có bài nào trong `/co-che`**. Tuy nhiên **hoạt ảnh tương tác của cả 5 cơ chế này đã được dựng xong** và đang chạy ở trang Từ điển:

| Cơ chế | Component đã có | Đang hiển thị tại |
|---|---|---|
| Chronograph | `glossary/Chronograph.astro` (397 dòng) | `/tu-dien/chronograph` |
| Tourbillon | `glossary/Tourbillon.astro` (309 dòng) | `/tu-dien/tourbillon` |
| Dây tóc và bánh lắc | `glossary/Hairspring.astro` (300 dòng) | `/tu-dien/day-toc-banh-lac` |
| GMT | `glossary/GMT.astro` (356 dòng) | `/tu-dien/gmt` |
| Lịch vạn niên | `glossary/PerpetualCalendar.astro` (339 dòng) | `/tu-dien/perpetual-calendar` |

**Cả 5 component đều đã dùng `MechanismAnimation`.** Nghĩa là khối lượng công việc nặng nhất của Mục C đã hoàn thành từ Bước 1.3 — phần còn lại chủ yếu là viết bài `/co-che/<slug>` theo cấu trúc hiện tượng → nguyên lý → ý nghĩa lịch sử và tái sử dụng component có sẵn, chứ không phải dựng lại hoạt ảnh từ đầu. Đề nghị cân nhắc lại khối lượng Mục C trước khi giao GLM.

Ngoài ra, thư mục Từ điển còn 4 infographic tĩnh không tương tác: `Incabloc`, `MinuteRepeater`, `Rotor`, `VPH`.

---

## CÂU 5 — Ảnh trong `/public/images/`

### Số ảnh thật: **0**

Toàn bộ `public/` chỉ có 4 file, không có file ảnh nào:

```
public/images/HƯỚNG-DẪN-ẢNH.md
public/images/mau-iconic/.gitkeep
public/images/thuong-hieu/logos/.gitkeep
public/images/timeline/.gitkeep
```

### Số vị trí đang hiển thị placeholder: **28 vị trí đang gọi ảnh + 4 vùng dự phòng**

**28 thẻ ảnh cụ thể** trên trang `/lich-su`, toàn bộ trỏ tới `/images/timeline/` và toàn bộ đang rơi vào placeholder "Ảnh đang cập nhật":

`ap-royal-oak.jpg` • `automatic-chronograph-race.jpg` • `blancpain.jpg` • `breguet-naples.jpg` • `breguet-tourbillon.jpg` • `cartier-santos.jpg` • `fifty-fathoms.jpg` • `harwood-automatic.jpg` • `heuer-carrera.jpg` • `huygens-hairspring.jpg` • `iwc-pilot.jpg` • `jlc-reverso.jpg` • `omega-coaxial.jpg` • `omega-speedmaster.jpg` • `patek-first-wristwatch.jpg` • `patek-nautilus.jpg` • `peter-henlein.jpg` • `rolex-datejust.jpg` • `rolex-gmt.jpg` • `rolex-oyster.jpg` • `rolex-perpetual.jpg` • `rolex-submariner.jpg` • `seiko-astron.jpg` • `silicon-revival.jpg` • `swatch-1983.jpg` • `trench-watch.jpg` • `un-freak.jpg` • `vacheron-constantin.jpg`

**Ngoài ra**, Khối 5 của `BrandLayout` dùng `WatchImage` làm ảnh dự phòng cho mỗi thẻ mẫu iconic — hiện toàn bộ 16 mẫu iconic đều không có `cover_image`, nên tất cả thẻ mẫu iconic trên các trang thương hiệu cũng đang hiển thị placeholder.

**Chưa có vị trí nào gọi logo hoặc hero của thương hiệu**, dù `IMAGE-MANIFEST.md` đã liệt kê 24 cặp `logo.png` + `hero.jpg`. Nghĩa là kể cả khi anh bổ sung ảnh vào đúng thư mục, giao diện hiện tại vẫn chưa hiển thị chúng — cần bổ sung phần render trước.

---

## CÂU 6 — Link nội bộ trỏ tới trang không tồn tại (404)

Đã quét toàn bộ 76 file HTML trong `dist/`, đối chiếu từng `href` nội bộ với danh sách trang thực tế.

### Phát hiện **10 địa chỉ hỏng**, chia làm hai nhóm:

#### Nhóm 1 — Lỗi trên trang thương hiệu (1 lỗi, ảnh hưởng trực tiếp người đọc)

| Link hỏng | Xuất hiện tại | Nguyên nhân |
|---|---|---|
| `/thuong-hieu/glashutte-original` | Trang `/thuong-hieu/blancpain`, cột đối chiếu phân khúc | `blancpain.md` dòng 65 ghi `slug: "glashutte-original"`, nhưng địa chỉ thật là `/thuong-hieu/glashuette-original` (theo tên file `glashuette-original.md`) |

#### Nhóm 2 — Toàn bộ menu trên trang tiếng Anh (9 lỗi)

Trang `/en` tồn tại nhưng **không có trang con tiếng Anh nào được dựng** (thư mục `src/content/*/en/` trống). Thanh menu vẫn render đủ 9 mục với tiền tố `/en/`, toàn bộ dẫn tới 404:

`/en/co-che` • `/en/giai-phau` • `/en/huong-dan` • `/en/lich-su` • `/en/lien-he` • `/en/mau-iconic` • `/en/thuong-hieu` • `/en/tu-dien` • `/en/ve-chung-toi`

Đề nghị: hoặc ẩn trang `/en` khỏi bản phát hành, hoặc chỉ hiển thị mục menu khi có nội dung tương ứng.

### Nguyên nhân gốc — trường `custom_slug` bị vô hiệu

`getStaticPaths` sinh địa chỉ trang bằng `getSlug()` (lấy theo **tên file**), trong khi hàm `getFullEntry()` lại ưu tiên `custom_slug`. Hai cách hiểu khác nhau về địa chỉ trang đang cùng tồn tại. Hiện có **3 file khai `custom_slug` khác tên file**, tức 3 địa chỉ "ma" không bao giờ tồn tại:

| File | `custom_slug` khai báo | Địa chỉ thật |
|---|---|---|
| `thuongHieu/a-lange-soehne.md` | `a-lange-sohne` | `/thuong-hieu/a-lange-soehne` |
| `thuongHieu/glashuette-original.md` | `glashutte-original` | `/thuong-hieu/glashuette-original` |
| `coChe/chuyen-dong-co.md` | `chuoi-truyen-dong` | `/co-che/chuyen-dong-co` |

**Lưu ý cho Mục B3:** prompt hiện ghi địa chỉ là `/thuong-hieu/a-lange-sohne` — địa chỉ này **không tồn tại**. Địa chỉ đúng là `/thuong-hieu/a-lange-soehne`.

### Đối chiếu với `BROKEN-LINKS.md`

File `BROKEN-LINKS.md` (ngày 01/08/2026) kết luận "Không phát hiện link hỏng (404)". **Kết luận này đã lỗi thời** — lỗi `glashutte-original` phát sinh sau đó, khi khối đối chiếu phân khúc của Blancpain được thêm vào. Đề nghị cập nhật lại file này.

---

## CÂU 7 — Trạng thái 8 tính năng nền tảng

| # | Tính năng | Trạng thái | Bằng chứng |
|---|---|---|---|
| 1 | Tìm kiếm toàn trang | **Chưa có** | Không có `pagefind` trong `package.json`, không có mã tìm kiếm trong `src/`, không có ô tìm kiếm trên `Header.astro` |
| 2 | Dark mode | **Chưa có** | `tailwind.config.mjs` không khai `darkMode`; không có biến thể `dark:` nào trong toàn bộ `src/`; không có nút chuyển chế độ. Các kết quả tìm chữ "dark" chỉ là tên màu `cream-dark`, `brass-dark` |
| 3 | Trang so sánh mẫu iconic | **Chưa có** | Không có `src/pages/so-sanh.astro`; không có nút "So sánh" trên thẻ ở `/mau-iconic` |
| 4 | `sitemap.xml` | **Chưa có** | Không cài `@astrojs/sitemap`; `dist/` không sinh `sitemap-index.xml` hay `robots.txt` |
| 5 | Structured data (schema.org) | **Chưa có** | Không có khối `application/ld+json` nào trong `src/` lẫn `dist/` |
| 6 | Ảnh OG tự sinh | **Chưa có** | `BaseLayout.astro` chỉ có `<title>` và `<meta name="description">`. **Không có bất kỳ thẻ `og:` hoặc `twitter:` nào** — chia sẻ lên Facebook/Zalo hiện hiển thị trống |
| 7 | Kết nối newsletter | **Chưa có** | Form ở `Footer.astro` dòng 53 đặt `onsubmit="return false;"` — bấm gửi không có tác dụng, không gọi dịch vụ nào |
| 8 | Analytics | **Chưa có** | Không có Vercel Analytics, Umami hay bất kỳ mã đo lường nào trong `src/` và `dist/` |

**Tóm lại: cả 8 tính năng đều chưa có.** Toàn bộ Mục E và Mục F còn nguyên.

Vấn đề số 6 (thiếu thẻ Open Graph) đáng ưu tiên sớm nhất trong nhóm này: mỗi lần trang được chia sẻ lên mạng xã hội hiện đều hiển thị trống, ảnh hưởng trực tiếp tới việc lan truyền nội dung.

---

## PHỤ LỤC — Bốn phát hiện ngoài phạm vi 7 câu hỏi

### 1. Ký tự ngoài tiếng Việt và tiếng Anh vẫn còn trong 4 file

Vòng rà soát đợt 1 đã sửa một phần nhưng **chưa hết**. Còn 4 vị trí:

| File | Dòng | Nội dung lỗi | Ghi chú |
|---|---|---|---|
| `CONTENT-GUIDE.md` | 36 | "Bezel (vành **кольệp** quanh mặt số)" | Chữ Kirin (Nga) — nằm ngay trong chính file quy định |
| `src/content/tuDien/vi/bezel.md` | 4 và 11 | "Vành **кольệp** quanh mặt số" | Chữ Kirin — **hiển thị ra trang `/tu-dien/bezel`** |
| `src/content/thuongHieu/vi/a-lange-soehne.md` | 31 | "đúng ngày **компании** ông nội ra đời" | Chữ Kirin — **hiển thị ra trang** |
| `src/components/infographics/glossary/Chronograph.astro` | 353 | "các cột phải **دقی** chính xác" | Chữ Ả Rập — **hiển thị ra trang `/tu-dien/chronograph`** |

Ba trong bốn lỗi này đang hiển thị công khai trên bản deploy. Đây là nhóm lỗi nên xử lý trước Mục B.

### 2. Thư viện `gsap` cài nhưng không dùng

`package.json` khai `gsap ^3.15.0`, nhưng không file nào trong `src/` gọi tới. Có thể gỡ để giảm dung lượng cài đặt.

### 3. Cấu hình `site` trong `astro.config.mjs` còn là địa chỉ mẫu

Đang để `https://dong-ho-co.example`. Cần đổi thành tên miền thật **trước khi** làm sitemap, ảnh OG và structured data ở Mục F1 — vì cả ba đều lấy địa chỉ gốc từ đây.

### 4. Trang `/thuong-hieu` và trang chi tiết gọi tên phân hạng khác nhau

Đã nêu ở Câu 3. Sau khi Mục B2 đổi tên hạng ở trang danh sách, `BrandLayout.astro` chưa được cập nhật theo — cùng một hãng, trang danh sách ghi "Cao cấp", trang chi tiết ghi "High-End Luxury (sang trọng cao cấp)".

---

## KIẾN NGHỊ ĐIỀU CHỈNH THỨ TỰ THỰC HIỆN

Dựa trên hiện trạng thực tế, đề nghị anh cân nhắc ba điểm:

1. **Tách nhóm lỗi ký tự lạ ra làm việc ngay**, trước Mục B. Bốn vị trí, sửa trong vài phút, nhưng đang hiển thị công khai.
2. **Xem lại khối lượng Mục C.** Năm hoạt ảnh tương tác đã dựng xong ở Từ điển. Công việc còn lại là viết bài `/co-che` và tái sử dụng component, nhẹ hơn nhiều so với dự kiến ban đầu.
3. **Đưa việc sửa thẻ Open Graph lên sớm hơn Mục F1.** Đây là thay đổi nhỏ trong `BaseLayout.astro` nhưng ảnh hưởng ngay tới mọi lượt chia sẻ trang.
