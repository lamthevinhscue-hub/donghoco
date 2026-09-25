# QUY CHUẨN HÌNH ẢNH — ĐỒNG HỒ CƠ (BẢN H04)

**Phiên bản:** 2 (phát hành lại bởi gói H04, 19/09/2026 — thay bản 19/09/2026 và các đính chính H01 rải trong bản đó)
**Trạng thái: ĐỀ XUẤT TRÌNH DUYỆT.** Văn bản này **chưa được chủ dự án phê duyệt**; hiệu lực áp dụng bắt đầu sau khi anh duyệt. Đến khi đó, các hình đang có trên website giữ nguyên hiện trạng, không phải sửa cho khớp văn bản này.
**Nền đối chiếu:** HEAD `345ab35`, đo lại ngày 19/09/2026
**Căn cứ thẩm định:** mục 3.3 của [Kế hoạch phát triển hợp nhất](KE-HOACH-PHAT-TRIEN-HOP-NHAT-2026-09-19.md), các đính chính H01, [Chỉ mục kế hoạch hiện hành](CHI-MUC-KE-HOACH-HIEN-HANH.md), [Bộ giao việc H04](BO-GIAO-VIEC-GLM-14-GOI-2026-09-19.md)
**Nguyên tắc chung:** văn bản này ghi lại ngôn ngữ hình đang có, thống nhất chỗ đang lệch, và nêu rõ ngoại lệ ngay trong từng quy tắc. Không còn mệnh đề tuyệt đối trái với thực tế website.

---

# PHẦN A — HIỆN TRẠNG ĐO ĐƯỢC (19/09/2026)

Số liệu đếm bằng máy trên toàn bộ tài sản hình, là căn cứ để các quy tắc ở Phần B không mô tả sai hiện trạng.

## A1. Bộ SVG dòng thời gian — 28 tệp, nhất quán

| Chỉ tiêu | Đo được |
|---|---|
| Số tệp `public/images/timeline/*.svg` | 28 |
| Khung hình | 28/28 dùng `viewBox="0 0 800 600"` (tỷ lệ 4:3) |
| Mã màu | Đúng 3 màu: `#1F2D3D` (nền navy), `#B8893C` (đồng thau), `#FAF7F2` (ngà) |
| Dùng `var(--…)` | 0/28 tệp — toàn bộ mã màu cứng, không đổi theo chế độ sáng/tối |
| Thuộc tính `id` | 32 ID trên toàn bộ tập, **mỗi tên xuất hiện đúng một lần** (ví dụ `gui-trench-watch`, `tapisserie-ap`) — không trùng giữa các tệp |
| Tệp JPG cùng thư mục | 0 — chưa có mốc nào dùng ảnh thay SVG |

## A2. Bộ infographic cơ chế — 12 sơ đồ + 1 bộ icon

Thư mục `src/components/infographics/` có 13 component; `MechanismAnimation.astro` chỉ chứa 9 biểu tượng khung `24x24` (icon, không phải sơ đồ). Còn lại **12 sơ đồ thật**:

| Chỉ tiêu | Đo được |
|---|---|
| Khung hình chính | 11 tỷ lệ khác nhau trên 12 sơ đồ; chỉ `600x400` lặp lại (Escapement, ShockProtection) |
| Token màu | Cả 12 sơ đồ dùng cả hai hệ `--obs-*` và `--ig-*` (ví dụ Escapement: 26 gọi `--obs-`, 8 gọi `--ig-`) |

Hệ quả: cùng một chi tiết (chân kính, thép) có hai sắc khác nhau tùy tệp, vì hai hệ token định nghĩa giá trị khác nhau. Chuyển hàng loạt sang một hệ là việc có rủi ro hồi quy, văn bản này không yêu cầu (xem Phần F).

## A3. Ảnh raster và ảnh AI bối cảnh — 1 tấm AI duy nhất

| Tài sản | Đo được |
|---|---|
| Ảnh AI bối cảnh | `public/images/history/balance-hairspring/banh-lac-day-toc-hero.jpg` — duy nhất, dùng trong `src/components/history/BalanceHairspringChapter.astro` |
| Nhãn ảnh AI | Có đầy đủ hai ngôn ngữ trong component: "Minh họa AI tái dựng — không phải ảnh tư liệu" / "AI reconstruction — not a historical photograph" (tại `aiCaption` VI và EN) |
| Ảnh raster khác | Bộ ảnh OG (`public/images/og/`), ảnh mẫu/thương hiệu theo manifest; không thuộc hệ token sơ đồ |
| Cơ chế JPG mốc timeline | Hàm `hasImage` và phần chọn `imageSrc` trong `src/components/history/HistoryTimeline.astro`: có `public/images/timeline/<slug>.jpg` thì ưu tiên JPG, không thì dùng SVG. Thẻ mốc render qua `WatchImage`; **chưa có cơ chế nhãn AI hay chú thích riêng cho JPG** |

## A4. Cơ chế ID của `WatchImage`

`src/components/WatchImage.astro` sinh ID duy nhất theo từng instance (bộ đếm trên `globalThis`, hash djb2) từ gói G09-B, sau khi id cứng gây trùng ID và mọi tham chiếu gradient vẽ từ pattern đầu tiên của tài liệu. Đây là mẫu tham chiếu cho quy tắc ID ở mục B4.

---

# PHẦN B — QUY TẮC THEO BA NHÓM HÌNH

Văn bản này tách ba nhóm vì mỗi nhóm có ràng buộc khác nhau; áp đúng nhóm là điều kiện của mọi quy tắc dưới đây.

- **Nhóm 1 — sơ đồ và infographic cơ chế:** SVG nhúng trong bài hoặc component, ở `src/components/infographics/` và các sơ đồ mới tương tự.
- **Nhóm 2 — SVG dòng thời gian:** 28 tệp `public/images/timeline/*.svg` và hình mốc timeline mới.
- **Nhóm 3 — ảnh raster và ảnh AI bối cảnh:** JPG/PNG/WebP, kể cả ảnh OG và ảnh bối cảnh AI.

## B1. Nhóm 1 — sơ đồ và infographic cơ chế

### B1.1. Bảng màu và token

- **Sơ đồ mới dùng `--obs-*`** làm hệ ưu tiên (đủ ba nấc sáng–thường–tối cho mỗi chất liệu, dựng được chuyển sắc kim loại). `--ig-*` giữ nguyên trong tệp cũ; khi một infographic cũ được nâng cấp vì lý do khác thì tệp đó chuyển sang `--obs-*` trong chính lần nâng cấp đó, không làm đợt chuyển đổi hàng loạt.
- **Màu nghĩa — áp trong sơ đồ cơ chế:** đồng thau chỉ cho đường truyền năng lượng và điểm nhấn cần mắt bám theo; rubi chỉ cho chân kính thật; dạ quang chỉ khi hình nói về dạ quang thật. **Nghĩa này không mở rộng sang nhóm 2 và 3** — trong SVG timeline và ảnh lịch sử, đồng thau còn là màu thẩm mỹ của bảng màu navy–đồng thau.

| Vai trò | Token | Sáng | Tối |
|---|---|---|---|
| Nền mực, bóng đổ | `--obs-graphite` | `#111418` | (giữ) |
| Trắng ngà, vùng sáng | `--obs-ivory` | `#F4F2ED` | (giữ) |
| Thép — thân chi tiết | `--obs-steel` | `#7D8791` | `#A6B1BD` |
| Thép — mép bắt sáng | `--obs-steel-soft` | `#9AA5AF` | `#C2CBD4` |
| Thép — mép tối | `--obs-steel-deep` | `#4A545F` | `#717D89` |
| Đồng — đường năng lượng, điểm nhấn | `--obs-brass` | `#B89254` | `#D9BC8B` |
| Đồng — phản chiếu | `--obs-brass-soft` | `#D9BC8B` | `#E6D0A5` |
| Đồng — vùng tối | `--obs-brass-deep` | `#8A6A35` | `#B08F55` |
| Chân kính rubi | `--obs-ruby` | `#A33B3B` | `#C86A6A` |
| Rubi bắt sáng | `--obs-ruby-soft` | `#C85858` | `#F0AFAF` |
| Rubi rìa tối | `--obs-ruby-deep` | `#741F1F` | `#9C3A3A` |
| Dạ quang | `--obs-lume` | `#B8E8CE` | (giữ) |

### B1.2. Khung hình — ba tỷ lệ mặc định, có ngoại lệ

| Tỷ lệ | viewBox | Dùng cho |
|---|---|---|
| 4:3 | `0 0 800 600` | Hình dẫn đầu chương, sơ đồ cân |
| 3:2 | `0 0 900 600` | Sơ đồ cần chiều ngang (bánh răng, chuỗi truyền động) |
| 5:2 | `0 0 1000 400` | Dải ngang: dự trữ năng lượng, so sánh, dòng thời gian con |

Ba tỷ lệ này là **mặc định, không phải cấm tuyệt đối**. Sơ đồ mới lệch chuẩn được khi có lý do về nội dung hoặc khả năng đọc trên mobile, ghi lý do trong hồ sơ hình hoặc bình luận gần viewBox. Sơ đồ cũ giữ nguyên tỷ lệ hiện tại (hiện 11 tỷ lệ, xem A2) cho tới khi được nâng cấp.

### B1.3. Độ dày nét — bốn cấp mặc định

| Cấp | Độ dày | Dùng cho |
|---|---:|---|
| Đường bao chính | 3 | Viền ngoài chi tiết chính |
| Nét cấu tạo | 1.75 | Nét chính chi tiết cơ khí |
| Nét phụ | 1 | Chi tiết phụ, đường dẫn chú thích |
| Vân bề mặt | 0.25 đến 0.4 | Guilloche, gạch khắc, vân vải |

Bốn cấp là mặc định, có ngoại lệ có lý do. **Nét vân mảnh phải kiểm ở kích thước hiển thị thực trên trang** (không chỉ ở khung gốc): vân 0.25 ở khung 800 vẽ xuống khoảng 350px màn hình mỏng hơn nửa — nếu mất chi tiết thì tăng cấp nét hoặc giảm mật độ vân.

### B1.4. Ánh sáng

Một nguồn sáng chính chiếu từ phía trên bên trái là mặc định thẩm mỹ cho sơ đồ dựng mới (mép `*-soft` phía trên-trái, `*-deep` phía dưới-phải). Không phải quy tắc kỹ thuật bắt buộc tuyệt đối; sơ đồ có lý do đặc thù (ví dụ minh họa ánh sáng thật của dạ quang) được lệch khi ghi rõ.

### B1.5. Chữ trong sơ đồ — ưu tiên HTML, không cấm tuyệt đối

- **Ưu tiên nhãn HTML** ngoài hình: dịch được, đọc được bằng công cụ hỗ trợ, đổi ngôn ngữ không phải dựng lại hình. Sơ đồ mới mặc định đặt nhãn ở HTML.
- **Chữ SVG không bị cấm tuyệt đối**: được dùng khi có lý do (ví dụ nhãn nằm trong chi tiết nhỏ, hoặc giữ tệp dùng được độc lập); khi đó chữ phải có trong `title`/`description` hoặc được phần chữ HTML bên cạnh phủ nội dung tương đương, và phải xuất hiện ở cả hai ngôn ngữ hoặc là tên riêng không cần dịch.
- Sơ đồ trang trí hoặc đã có nội dung tương đương bằng chữ bên cạnh được ẩn khỏi công cụ hỗ trợ (`aria-hidden="true"`) theo `CONTENT-GUIDE.md` mục 2.5.

### B1.6. ID trong SVG nhúng — cho phép theo instance, bắt buộc kiểm trùng

SVG nhúng **được phép đặt `id`** duy nhất theo từng instance cho gradient, mask, `title`, `description`, pattern — mẫu thực tiễn là `WatchImage` (A4) và 32 ID không trùng của bộ timeline (A1). Điều kiện kèm theo:

- Mỗi ID phải duy nhất **trên trang** (không chỉ trong tệp): dùng hậu tố theo instance, bộ đếm hoặc hash dữ liệu.
- Bắt buộc chạy kiểm trùng ID (script kiểm hiện hành hoặc so sánh tên ID giữa các tệp dùng chung một trang) trước khi đưa hình mới lên.
- Chữ trong SVG tự nó không gây trùng ID; cấm ID vì lo trùng là quy tắc cũ đã bỏ.

## B2. Nhóm 2 — SVG dòng thời gian

| Quy tắc | Nội dung |
|---|---|
| Nền và mã màu | **Giữ nền navy `#1F2D3D` cố định, mã màu cứng** (không `var()`), ba màu như A1. Đây là chủ ý thiết kế: dải navy liên tục chạy dọc trang lịch sử giúp nhận diện dòng thời gian ở cả chế độ sáng |
| Khung hình | 4:3, `viewBox="0 0 800 600"` — mặc định; ngoại lệ có lý do được phép |
| Độ dày nét | Phân cấp như B1.3, quy đổi theo tỷ lệ |
| ID | Các tệp hiện có ID riêng không trùng (A1); hình mới đặt ID theo quy tắc instance ở B1.6 và kiểm trùng |
| Chữ | Như B1.5 — ưu tiên HTML; chữ khắc trang trí (phi chức năng) trong SVG được phép |
| Chế độ sáng/tối | Không đổi theo chế độ — mã cứng là quy tắc của nhóm này, không phải vi phạm B1.1 |

Ví dụ áp dụng: `public/images/timeline/trench-watch.svg` (khung 800x600, 3 màu, ID `gui-trench-watch`) hiển thị tại trang `/lich-su/` mốc trench-watch.

## B3. Nhóm 3 — ảnh raster và ảnh AI bối cảnh

### B3.1. Quy tắc chung nhóm ảnh

- **Không áp token màu hay tỷ lệ khung của sơ đồ** cho ảnh raster: ảnh không đổi theo chế độ sáng/tối, không quy về `--obs-*`; tỷ lệ ảnh phục vụ bố cục trang và chống nhảy bố cục (width/height khai báo đủ).
- Ảnh trang trí hoặc ảnh có nội dung tương đương bằng chữ bên cạnh: `alt=""` hoặc `aria-hidden` phù hợp; ảnh có thông tin riêng: mô tả đúng ngôn ngữ trang (xem Phần C.1).

### B3.2. Ảnh AI bối cảnh — chỉ bối cảnh, không chứng cứ

1. **Chức năng duy nhất của ảnh AI là bối cảnh** (không khí thời đại, nền tâm trạng). Ảnh AI **không** là chứng cứ cấu tạo và không phải ảnh sản phẩm chính xác; mọi chi tiết cơ khí phải nằm ở SVG riêng suy từ nguồn.
2. **Phân loại theo chức năng thực tế của từng ảnh, không theo nhãn `claimLevel` một chiều.** Ba mốc `context` hiện có (`trench-watch`, `swatch-1983`, `silicon-revival`) vẫn có thể gắn thương hiệu hoặc chi tiết kỹ thuật — mỗi mốc phải xét riêng trước khi cho tạo ảnh; không tự động coi cả ba đều đủ điều kiện.
3. Ảnh AI đặt **cạnh** mốc phát minh (mô hình chương Bánh lắc) là lựa chọn biên tập hợp lệ; không phải kết luận pháp lý rằng mọi ảnh có nhãn hiệu đều cấm — nhưng rủi ro sở hữu trí tuệ với hình sản phẩm mang nhãn hiệu **chưa được thẩm định**, nên thận trọng biên tập là giữ ảnh ngoài nhóm đó cho tới khi có thẩm định riêng.
4. **Nhãn bắt buộc hai ngôn ngữ**, nguyên văn theo mẫu đang chạy: "Minh họa AI tái dựng — không phải ảnh tư liệu" / "AI reconstruction — not a historical photograph"; không giấu, không viết mờ, có cùng nhãn khi mở phóng to (khi tính năng đó có).
5. **Hồ sơ tạo ảnh** mỗi tấm: mục đích, sự kiện nguồn, chi tiết thời đại, prompt, nội dung cần tránh, alt/chú thích VI/EN, vị trí render, ngày tạo, số lần tạo lại, lý do chọn bản; quyền sử dụng ghi khi liên quan.
6. **Kiểm trước khi dùng** (một câu không đạt thì tạo lại): có chữ/số lọt vào ảnh; đồng hồ bị vẽ quá rõ (thấy vạch số, kim); chi tiết sai thời đại; bảng màu trầm, bão hòa thấp, một nguồn sáng ấm chủ đạo; đặt cạnh ảnh chiến hào v3 không lạc tông; không dùng màu rực, không phong cách hoạt hình.
7. **Quy cách tệp cho ảnh bối cảnh mốc timeline:** tỷ lệ 4:3, JPEG chất lượng 80, dưới 150 KB ở kích thước dùng thật, tên trùng `slug` trong `timeline.json`, đặt tại `public/images/timeline/<slug>.jpg`. Đây là khuyến nghị cho tệp mới; không phải điều kiện tối thượng nếu bố cục trang đích cần khác và có ghi lý do.

### B3.3. Hiện trạng cơ chế JPG — phải hiểu đúng khi thêm ảnh

Cơ chế ưu tiên JPG nằm trong **`src/components/history/HistoryTimeline.astro`** (hàm `hasImage`, phần chọn `imageSrc`), thẻ mốc render qua `WatchImage`. Hệ quả biên tập:

- Thả một tệp `.jpg` vào `public/images/timeline/` **chỉ thay ảnh hiển thị** — không tự tạo nhãn AI, không tự tạo chú thích hai ngôn ngữ, không tự tạo mô hình hai lớp ảnh–sơ đồ.
- Muốn có hai lớp "ảnh bối cảnh cạnh sơ đồ" như chương Bánh lắc thì phải triển khai component riêng theo mẫu đó; việc thay JPG theo cơ chế hiện có là **thay ảnh**, không phải nhân rộng mô hình hai lớp.
- Mọi ảnh AI thêm vào phải đi kèm loại ảnh, nhãn/chú thích hai ngôn ngữ và hồ sơ theo B3.2 — việc này thuộc phạm vi H12 khi được mở, không làm trong gói hình khác.

Ví dụ áp dụng: `public/images/history/balance-hairspring/banh-lac-day-toc-hero.jpg` trong `BalanceHairspringChapter.astro` — ảnh AI có nhãn VI/EN đầy đủ, cơ cấu nằm ở SVG tương tác riêng.

---

# PHẦN C — QUY TẮC CHUNG MỌI NHÓM

## C.1. Mô tả thay thế — phân loại theo chức năng

| Loại hình | Yêu cầu |
|---|---|
| Có thông tin riêng (sơ đồ không có bản chữ tương đương, ảnh tư liệu, ảnh AI bối cảnh) | `alt` hoặc `aria-label` mô tả nội dung hình bằng ngôn ngữ trang (VI và EN tương đương, bản EN không mạnh hơn VI) |
| Trang trí hoặc đã có nội dung tương đương đầy đủ ngay bên cạnh | Có thể dùng `alt=""` hoặc `aria-hidden="true"` phù hợp — đúng [hướng dẫn W3C WAI về ảnh trang trí](https://www.w3.org/WAI/tutorials/images/decorative/) và `CONTENT-GUIDE.md` mục 2.5 |

Không bắt mọi hình có alt không rỗng; cũng không ẩn tùy tiện hình có thông tin riêng. Chú thích hiển thị (caption) bắt buộc với ảnh AI theo B3.2.

## C.2. Kiểm trùng ID

Mọi SVG nhúng mới hoặc sửa ID phải qua kiểm trùng ID trên trang; tham chiếu cách làm ở B1.6 và A4.

## C.3. Ký tự và kiểm tự động

Hình nằm trong `src/` (component, sơ đồ nhúng) chịu chuỗi kiểm hiện hành: `node scripts/scan-chars.mjs` (không lọt ký tự ngoài tiếng Việt và tiếng Anh), `npm run check` và `npm run build`. Tệp trong `public/` (SVG timeline, ảnh) không vào chuỗi build — kiểm bằng script kiểm kê tài sản hình hoặc đối chiếu thủ công khi thêm mới.

---

# PHẦN D — ĐỐI CHIẾU QUY TẮC CŨ VỚI QUY TẮC H04

Bảng dưới liệt kê từng mệnh đề của bản trước (hoặc mâu thuẫn giữa bản trước với đính chính H01) và cách H04 chốt lại, kèm ngoại lệ và cách kiểm. Bảng đầy đủ của đợt thẩm định nằm trong `output/h04-image-standard-audit/doi-chieu-quy-tac.md`.

| Quy tắc cũ hoặc mâu thuẫn | Quy tắc H04 | Ngoại lệ hoặc cách kiểm |
|---|---|---|
| "Ban hành" làm như đã được phê duyệt | Trạng thái **đề xuất trình duyệt** ở đầu tài liệu | Anh duyệt thì hiệu lực mới bắt đầu |
| B5: "Không đặt bất kỳ chữ nào bên trong tệp hình" (tuyệt đối) | Ưu tiên nhãn HTML; chữ SVG được phép khi có lý do, phải có phủ nội dung tương đương | Kiểm hai ngôn ngữ hoặc là tên riêng; `aria-hidden` khi trang trí |
| B5: "SVG không đặt thuộc tính `id`" (tuyệt đối) | ID duy nhất theo instance cho gradient/mask/title/description | Kiểm trùng ID trên trang; mẫu: `WatchImage`, 32 ID timeline |
| B7: "Mô tả thay thế không được để trống" áp mọi hình | Phân loại: có thông tin riêng thì mô tả; trang trí/lặp nội dung được `alt=""`/`aria-hidden` | Đối chiếu W3C WAI + `CONTENT-GUIDE.md` 2.5 |
| B1/Phần C: "Chỉ dùng token `--obs-*`, không thêm màu ngoài bảng" áp mọi hình | Chỉ nhóm 1 (sơ đồ mới); timeline giữ mã cứng; ảnh raster không qua token | Đúng phạm vi nhóm ở B1.1, B2, B3.1 |
| B1.1: đồng thau "chỉ dùng cho đường truyền năng lượng" (không ghi phạm vi) | Thêm đúng phạm vi sơ đồ cơ chế; ảnh lịch sử dùng đồng thau như màu thẩm mỹ | Đọc nghĩa màu theo nhóm |
| B2/B3: bốn cấp nét, ba tỷ lệ (ngầm cấm tuyệt đối) | Mặc định có ngoại lệ có lý do nội dung hoặc đọc mobile | Nét mảnh kiểm ở kích thước hiển thị thực |
| B8: "Hạ tầng đã sẵn: `src/pages/lich-su.astro` tự ưu tiên JPG" (sai vị trí, ngầm coi thêm JPG là đủ) | Cơ chế ở `HistoryTimeline.astro`; thêm JPG chỉ là thay ảnh, không tự có nhãn hay hai lớp | Đọc `hasImage`/`imageSrc` trong component; ảnh AI thêm phải kèm hồ sơ B3.2 |
| B8: bảng cho phép ảnh AI theo `claimLevel` (`context` thì "Được") | Phân loại theo chức năng thực tế từng ảnh; mốc `context` xét riêng | Hồ sơ tạo ảnh + bốn câu kiểm trước khi dùng |
| Mâu thuẫn bản trước: quy tắc chính "cấm tuyệt đối" trong khi đính chính H01 nới — hai bộ quy tắc song song | Bản H04 dệt đính chính vào quy tắc chính, chỉ còn một bộ | Rà lại bằng phần D này và checklist Phần E |

---

# PHẦN E — CHECKLIST TRƯỚC KHI ĐƯA HÌNH LÊN TRANG

Checklist tách theo nhóm; áp đúng nhóm của hình. Không còn quy tắc đối nghịch với phần quy tắc nào ở trên.

**Nhóm 1 — sơ đồ/infographic cơ chế (SVG mới trong `src/`):**

- [ ] Token `--obs-*` cho hình mới; màu nghĩa đúng phạm vi sơ đồ (đồng thau là năng lượng, rubi là chân kính, dạ quang là dạ quang)
- [ ] Tỷ lệ khung thuộc ba tỷ lệ mặc định, hoặc lệch có lý do đã ghi
- [ ] Độ dày nét thuộc bốn cấp mặc định, hoặc lệch có lý do; nét vân mảnh đã xem ở kích thước hiển thị thực
- [ ] Nhãn ưu tiên đặt ở HTML; nếu dùng chữ SVG thì có phủ nội dung tương đương và xử lý hai ngôn ngữ
- [ ] ID (nếu có) duy nhất theo instance; đã chạy kiểm trùng ID trên trang
- [ ] Đổi màu đúng theo chế độ sáng/tối (dùng `var(--obs-*)`)
- [ ] Alt/aria theo phân loại C.1 (mô tả khi có thông tin riêng; ẩn hợp lệ khi trang trí)
- [ ] Qua `scan-chars.mjs`, `npm run check`, `npm run build` không lỗi mới

**Nhóm 2 — SVG dòng thời gian (mốc mới hoặc sửa mốc):**

- [ ] Nền navy `#1F2D3D`, ba màu cứng, không `var()` — giữ dải liên tục
- [ ] Khung 4:3 `800x600` mặc định, hoặc lệch có lý do
- [ ] ID đặt theo instance, không trùng với ID nào trên cùng trang
- [ ] Chữ khắc trang trí phi chức năng được phép; nhãn chức năng ưu tiên HTML
- [ ] Kiểm trùng ID; kiểm ký tự nếu tệp chứa chữ

**Nhóm 3 — ảnh raster và ảnh AI bối cảnh:**

- [ ] Không áp token/tỷ lệ sơ đồ; width/height khai báo đủ chống nhảy bố cục
- [ ] Alt theo phân loại C.1 đúng ngôn ngữ trang
- [ ] Ảnh AI: chỉ làm bối cảnh; mốc ứng viên xét riêng theo chức năng (không dán nhãn `context` là đủ); nhãn VI/EN nguyên văn theo B3.2; hồ sơ tạo ảnh đầy đủ; qua bốn câu kiểm; vị trí render ghi rõ; quyền sử dụng ghi khi liên quan
- [ ] Ảnh bối cảnh mốc timeline: 4:3, JPEG 80, dưới 150 KB, tên trùng slug, đặt `public/images/timeline/<slug>.jpg` — hoặc lệch có lý do ghi trong hồ sơ
- [ ] Biết rằng thêm JPG chỉ thay ảnh (B3.3); nhu cầu hai lớp ảnh–sơ đồ phải làm component riêng theo mẫu chương Bánh lắc

---

# PHẦN F — NHỮNG GÌ VĂN BẢN NÀY KHÔNG YÊU CẦU

- Không chuyển 12 infographic cũ từ `--ig-*` sang `--obs-*` hàng loạt; chỉ chuyển kèm lần nâng cấp từng tệp vì lý do khác.
- Không đổi tỷ lệ khung của infographic cũ (hiện 11 tỷ lệ, giữ nguyên).
- Không động vào `MechanismAnimation.astro` (9 biểu tượng icon 24x24, ngoài phạm vi).
- Không yêu cầu 28 SVG dòng thời gian chuyển sang `var()` — mã cứng là quy tắc của nhóm.
- Không gộp gradient (quyết định giữ nguyên từ P3.2).
- Không tạo ảnh AI nào trong gói hình; việc tạo ảnh là quyết định riêng của chủ dự án, thuộc H12 khi được mở.
- Không thay hàng loạt hình đang có trên website; hình cũ chỉ áp quy tắc khi nâng cấp vì lý do khác.

---

# LỊCH SỬ PHIÊN BẢN

| Ngày | Phiên bản | Ghi chú |
|---|---|---|
| 19/09/2026 | 1 | Bản đầu (nền `521f5fa`); sau đó được thẩm định bởi kế hoạch hợp nhất mục 3.3 và áp đính chính H01 |
| 19/09/2026 | 2 (H04) | Phát hành lại: tách ba nhóm hình, dệt đính chính vào quy tắc chính, thêm ví dụ thật từng nhóm và bảng đối chiếu Phần D; loại mọi mệnh đề tuyệt đối mâu thuẫn. Trạng thái: đề xuất trình duyệt |
| 26/09/2026 | 2.1 (S2) | Đồng bộ quy chuẩn với năm ảnh AI bối cảnh đã được chủ dự án duyệt: sửa câu kiểm số 6 tại B3.2 |
