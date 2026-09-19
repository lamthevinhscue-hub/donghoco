# QUY CHUẨN HÌNH ẢNH — ĐỒNG HỒ CƠ

**Ban hành:** 19/09/2026 *(đính chính H01: đọc đúng là **đề xuất trình chủ dự án duyệt** — chưa được phê duyệt chỉ vì tài liệu ghi "Ban hành"; gói **H04** hoàn thiện và phát hành lại theo các đính chính dưới đây)*
**Nền đo:** HEAD `521f5fa` *(đính chính H01: mốc tại thời điểm đo; hiện hành `a715fd0`)*
**Phạm vi áp dụng:** mọi hình mới của trang — SVG dòng thời gian, infographic cơ chế, sơ đồ giải phẫu và tiến hóa, ảnh AI bối cảnh
**Nguyên tắc chung:** văn bản này **ghi lại** ngôn ngữ hình đang có chỗ nào đã tốt, và **chốt** chỗ nào đang lệch. Không phải đề xuất phong cách mới.

> **Trạng thái tài liệu (đính chính gói H01, 19/09/2026):** đây là tài liệu nguồn đã được thẩm định bởi [Kế hoạch phát triển hợp nhất 19/09](KE-HOACH-PHAT-TRIEN-HOP-NHAT-2026-09-19.md) (mục 3.3), giữ để truy vết. Trạng thái đúng là **"đề xuất trình duyệt"**; gói **H04** xử lý chi tiết để không có hai quy tắc đối nghịch. Lệnh thi công hiện hành là [Bộ giao việc GLM 14 gói](BO-GIAO-VIEC-GLM-14-GOI-2026-09-19.md); vai trò từng tài liệu xem [Chỉ mục kế hoạch hiện hành](CHI-MUC-KE-HOACH-HIEN-HANH.md).

---

# PHẦN A — HIỆN TRẠNG ĐO ĐƯỢC

Trước khi chốt quy chuẩn, đây là con số thật, đếm bằng máy trên toàn bộ tài sản hình.

## A1. Bộ SVG dòng thời gian — đã rất nhất quán

28 tệp trong `public/images/timeline/`:

| Chỉ tiêu | Kết quả đo | Nhận xét |
|---|---|---|
| Khung hình | **28/28 dùng `viewBox="0 0 800 600"`** | Tuyệt đối thống nhất, tỷ lệ 4:3 |
| Số màu dùng | **Đúng 3 màu** | Kỷ luật cao hơn phần lớn trang chuyên ngành |
| Nền | `#1F2D3D` (29 lần) | Navy đậm |
| Nét chính | `#B8893C` (501 lần) | Đồng thau |
| Nét sáng | `#FAF7F2` (283 lần) | Trắng ngà |
| Độ dày nét | 3 / 1.75 / 1 / 0.75 / 0.25-0.4 | Phân cấp rõ, có chủ đích |

**Kết luận:** bộ này không cần sửa gì về ngôn ngữ hình. Nó đã là chuẩn.

## A2. Bộ infographic cơ chế — đây là chỗ lệch

Thư mục `src/components/infographics/` có 13 component. Trong đó `MechanismAnimation.astro` chỉ chứa **chín biểu tượng nhỏ** khung `24x24` — đây là icon, không phải sơ đồ, nên **loại khỏi phép đo**. Còn lại **12 tệp có sơ đồ thật**.

| Chỉ tiêu | Kết quả đo | Vấn đề |
|---|---|---|
| Khung hình sơ đồ chính | **11 tỷ lệ khác nhau trên 12 sơ đồ** — chỉ `600x400` lặp lại hai lần (Escapement, ShockProtection) | Không có tỷ lệ chuẩn nào |
| Sơ đồ phụ | Thêm 2 khung nữa: `400x135` (GearTrain), `500x200` (WaterResistance) | Cũng không theo chuẩn |
| Hệ token màu | **Cả 12 tệp đều gọi `var()` của cả hai hệ** `--ig-*` và `--obs-*` | Hai bảng màu chồng nhau |

Danh sách khung chính, đo bằng máy:

`600x340` · `400x392` · `600x420` · `600x360` · `500x400` · `600x400` · `800x320` · `500x380` · `500x360` · `400x360` · `600x400` · `400x380`

## A3. Phát hiện quan trọng nhất: hai bộ hình đang đảo ngược nhau

Đây là nguyên nhân thật của cảm giác trang chưa thống nhất.

| | Nền | Nét chính |
|---|---|---|
| **SVG dòng thời gian** | `#1F2D3D` navy đậm | `#B8893C` đồng thau + `#FAF7F2` ngà |
| **Infographic cơ chế** | `--ig-bg` = `#FAF7F2` ngà | `--ig-stroke` = `#1F2D3D` navy đậm |

**Hai bộ dùng đúng cùng hai màu, nhưng gán ngược vai trò cho nhau.** Trang lịch sử là nét sáng trên nền tối; trang cơ chế là nét tối trên nền sáng.

**Mức nghiêm trọng khác nhau giữa hai chế độ** — điểm này tôi đã bỏ sót ở bản đầu và bổ sung sau khi đo lại:

| | Nền trang | Nền infographic | Nền SVG lịch sử |
|---|---|---|---|
| Chế độ sáng | `#FBFBF8` | `#FAF7F2` — gần như trùng nền trang | `#1F2D3D` — **tương phản mạnh** |
| Chế độ tối | `#111519` | `#20272D` — nổi nhẹ một nấc | `#1F2D3D` — hòa vào nền |

Nghĩa là: **ở chế độ tối hai bộ khá hài hòa; ở chế độ sáng thì 28 ô navy đậm nổi hẳn lên giữa trang nền giấy.** Đây là chỗ người đọc cảm nhận rõ nhất sự thiếu thống nhất.

## A4. Hai hệ token đang chồng lấn

`--obs-*` được đưa vào lúc nâng cấp bộ thoát, với ghi chú trong `global.css` là "không thay thế `--ig-*`". Nhưng đến nay nó đã lan vào cả 12 tệp sơ đồ. Kết quả là **cùng một chi tiết có hai màu khác nhau tùy tệp**:

| Chi tiết | Token cũ | Token mới | Chênh lệch |
|---|---|---|---|
| Chân kính rubi | `--ig-rubi` `#9B2C2C` | `--obs-ruby` `#A33B3B` | Hai sắc đỏ khác nhau |
| Chi tiết thép | `--ig-steel` `#4A5568` | `--obs-steel` `#7D8791` | Hai sắc xám khác nhau |
| Chi tiết thép sáng | `--ig-steel-soft` `#5A6878` | `--obs-steel-soft` `#9AA5AF` | Hai sắc xám khác nhau |

## A5. Chế độ tối

- **Infographic:** dùng `var(--ig-*)` và `var(--obs-*)`, nên **đổi màu đúng** khi chuyển sang chế độ tối.
- **SVG dòng thời gian:** **0/28 tệp dùng `var()`** — toàn bộ là mã màu cứng. Bộ này **không phản ứng với chế độ tối**.

Đây không hẳn là lỗi: nền navy vốn đã tối, nên ở chế độ tối trông vẫn chấp nhận được. Nhưng ở chế độ sáng, 28 ô navy đậm nằm giữa trang nền giấy là một khối tương phản mạnh, và đó là chủ ý thiết kế hay là hệ quả ngoài ý muốn thì hiện chưa có văn bản nào nói rõ. Quy chuẩn này chốt lại ở mục B6.

---

# PHẦN B — QUY CHUẨN CHÍNH THỨC

## B1. Bảng màu — một hệ duy nhất

Kể từ nay, **`--obs-*` là hệ chính thức** cho mọi hình mới. Lý do: nó có đủ ba nấc sáng, thường và tối cho mỗi chất liệu, nên dựng được chuyển sắc kim loại; `--ig-*` chỉ có một nấc.

| Vai trò | Token dùng | Sáng | Tối |
|---|---|---|---|
| Nền mực, bóng đổ | `--obs-graphite` | `#111418` | (giữ) |
| Trắng ngà, vùng sáng | `--obs-ivory` | `#F4F2ED` | (giữ) |
| Thép — thân chi tiết | `--obs-steel` | `#7D8791` | `#A6B1BD` |
| Thép — mép bắt sáng | `--obs-steel-soft` | `#9AA5AF` | `#C2CBD4` |
| Thép — mép tối | `--obs-steel-deep` | `#4A545F` | `#717D89` |
| Đồng — đường truyền năng lượng, điểm nhấn | `--obs-brass` | `#B89254` | `#D9BC8B` |
| Đồng — phản chiếu | `--obs-brass-soft` | `#D9BC8B` | `#E6D0A5` |
| Đồng — vùng tối | `--obs-brass-deep` | `#8A6A35` | `#B08F55` |
| Chân kính rubi | `--obs-ruby` | `#A33B3B` | `#C86A6A` |
| Rubi bắt sáng | `--obs-ruby-soft` | `#C85858` | `#F0AFAF` |
| Rubi rìa tối | `--obs-ruby-deep` | `#741F1F` | `#9C3A3A` |
| Dạ quang | `--obs-lume` | `#B8E8CE` | (giữ) |

**Quy tắc màu nghĩa — bắt buộc:**

- **Đồng thau** chỉ dùng cho đường truyền năng lượng và điểm nhấn cần mắt bám theo. Không dùng làm màu trang trí. *(Đính chính H01: quy tắc này đúng phạm vi **sơ đồ cơ chế**; trong ảnh lịch sử, đồng thau còn thuộc bảng màu thẩm mỹ — Kế hoạch hợp nhất mục 3.3 điểm 3.)*
- **Rubi** chỉ dùng cho chân kính thật. Không dùng làm màu cảnh báo hay màu nhấn chung.
- **Dạ quang** chỉ dùng khi hình đang nói về dạ quang thật.

**Về `--ig-*`:** giữ nguyên trong các tệp cũ, **không dùng cho hình mới**. Không làm đợt chuyển đổi hàng loạt — rủi ro hồi quy cao hơn lợi ích. Khi nào một infographic cũ được nâng cấp vì lý do khác thì mới chuyển hệ cho tệp đó.

## B2. Độ dày nét — bốn cấp

Theo đúng phân cấp mà bộ SVG dòng thời gian đã dùng, quy về bốn cấp trên khung 800x600. Khung khác thì quy đổi theo tỷ lệ.

| Cấp | Độ dày | Dùng cho |
|---|---:|---|
| Đường bao chính | **3** | Đường viền ngoài của chi tiết chính |
| Nét cấu tạo | **1.75** | Nét chính của mọi chi tiết cơ khí |
| Nét phụ | **1** | Chi tiết phụ, đường dẫn chú thích |
| Vân bề mặt | **0.25 đến 0.4** | Hoa văn guilloche, gạch khắc, vân vải |

Không dùng độ dày ngoài bốn cấp này. Hiện có hai chỗ lệch trong bộ cũ (`0.5` và `4`, mỗi loại một lần) — để nguyên, không sửa.

## B3. Khung hình — ba tỷ lệ, không hơn

Đây là chỗ cần siết nhất, vì hiện có 13 tỷ lệ khác nhau.

| Tỷ lệ | Kích thước viewBox | Dùng cho |
|---|---|---|
| **4:3** | `0 0 800 600` | Hình mốc dòng thời gian, ảnh AI bối cảnh, hình dẫn đầu chương |
| **3:2** | `0 0 900 600` | Infographic cơ chế cần chiều ngang (bánh răng, chuỗi truyền động) |
| **5:2** | `0 0 1000 400` | Dải ngang: thanh dự trữ năng lượng, dải so sánh, dòng thời gian con |

Infographic mới phải chọn một trong ba. Infographic cũ giữ nguyên tỷ lệ hiện tại cho tới khi được nâng cấp vì lý do khác.

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.3, H04 xử lý chi tiết):** ba tỷ lệ khung ở B3 và bốn cấp nét ở B2 là **mặc định, có ngoại lệ** khi có lý do về nội dung và khả năng đọc trên mobile; nét vân quá mảnh (0,25 đến 0,4) cần kiểm ở kích thước hiển thị thật, không chỉ ở khung gốc.

## B4. Ánh sáng và chất liệu

- **Một nguồn sáng duy nhất, chiếu từ phía trên bên trái.** Mọi hình trong trang phải thống nhất hướng này. Mép trên và mép trái của chi tiết bắt sáng (`*-soft`), mép dưới và mép phải tối (`*-deep`).
- **Chuyển sắc kim loại** dựng bằng ba nấc token, không dùng màu ngoài bảng.
- **Bóng đổ** dùng `--obs-graphite` với độ mờ thấp; không dùng bóng nhiều lớp.
- **Không dùng hiệu ứng làm mờ nền (blur) trong SVG** — tốn tài nguyên vẽ và hiển thị khác nhau giữa các trình duyệt.

## B5. Chữ trong hình — cấm tuyệt đối

**Không đặt bất kỳ chữ, số, nhãn hay chú thích nào bên trong tệp hình.** Mọi nhãn phải nằm trong HTML bên ngoài.

Ba lý do, cả ba đều đã được chứng minh trong dự án:

1. **Dịch được.** Trang song ngữ. Chữ nằm trong SVG hoặc trong ảnh thì phải dựng hai bộ hình.
2. **Đọc được bằng công cụ hỗ trợ.** Chương Bánh lắc và dây tóc đã làm đúng: SVG đặt `aria-hidden`, toàn bộ thông tin có bản chữ HTML thật kèm vùng thông báo trạng thái.
3. **Tránh trùng ID.** Gói G09 ngày 19/09 vừa phải sửa lỗi trùng ID pattern trong `WatchImage`. Chữ và nhãn trong SVG làm vấn đề này nặng thêm.

Kèm theo: **SVG không đặt thuộc tính `id`** và **không tham chiếu gradient theo `id`**, để tránh xung đột khi nhiều hình cùng có mặt trên một trang.

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.3, H04 xử lý chi tiết):** hai quy tắc của B5 nới theo hướng sau — (1) **ưu tiên nhãn HTML** để dịch và đọc bằng công cụ hỗ trợ, nhưng không khẳng định chữ trong SVG không dịch được hay không thể tiếp cận; (2) **không cấm toàn bộ `id`**: SVG nhúng được phép dùng ID duy nhất theo từng instance cho gradient, mask, `title`/`description`, kèm kiểm tra trùng ID — cơ chế ID theo instance đã chạy trong `WatchImage` từ gói G09-B. Chữ trong SVG tự nó không gây trùng ID. Checklist ở Phần C cần đọc kèm đính chính này.

## B6. Chế độ sáng và tối

| Loại hình | Quy tắc |
|---|---|
| Infographic và sơ đồ nhúng trong bài | **Bắt buộc dùng `var(--obs-*)`** để đổi màu theo chế độ |
| SVG mốc dòng thời gian | **Giữ nền navy cố định** (`#1F2D3D`), mã màu cứng, không đổi theo chế độ |
| Ảnh AI bối cảnh | Không đổi theo chế độ (bản chất là ảnh raster) |

**Chốt chủ ý cho nhóm dòng thời gian:** nền navy cố định là **có chủ đích**, không phải sơ suất. Lý do: 28 ô navy tạo thành một dải liên tục chạy dọc trang lịch sử, giúp người đọc nhận ra ngay "đây là dòng thời gian" và phân biệt với nội dung bài. Đổi màu theo chế độ sẽ làm mất hiệu ứng dải đó ở chế độ sáng.

Từ nay bất kỳ hình mới nào thuộc trang lịch sử cũng theo quy ước này, kể cả ảnh AI: **ảnh AI phải có tông tối, không được sáng hơn dải navy xung quanh.**

## B7. Mô tả thay thế và chú thích

Mọi hình, không trừ hình nào, phải có:

| Thành phần | Bắt buộc | Nội dung |
|---|---|---|
| Mô tả thay thế tiếng Việt | Có | Tả **hình vẽ gì**, không lặp lại tiêu đề mốc |
| Mô tả thay thế tiếng Anh | Có | Bản dịch tương đương, không mạnh hơn bản Việt |
| Chú thích hiển thị | Chỉ với ảnh AI | Xem B8 |

Mô tả thay thế không được để trống và không được là chuỗi rỗng. Đây là quy tắc đã công bố trong `CONTENT-GUIDE.md` mục 2.5.

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.3, H04 xử lý chi tiết):** quy tắc "mọi hình phải có mô tả thay thế không rỗng" **có ngoại lệ**: hình cung cấp thông tin riêng cần mô tả phù hợp ngôn ngữ trang; hình trang trí hoặc hình đã có nội dung tương đương đầy đủ ngay bên cạnh **có thể** ẩn khỏi công cụ hỗ trợ (`alt=""` hoặc `aria-hidden="true"` theo trường hợp) — theo [hướng dẫn W3C WAI về ảnh trang trí](https://www.w3.org/WAI/tutorials/images/decorative/) và đúng như `CONTENT-GUIDE.md` mục 2.5 đã quy định (cho phép `aria-hidden` khi thông tin đã có ở phần chữ). H04 phân loại chi tiết cho từng nhóm hình; không bắt mọi hình có alt không rỗng.

## B8. Ảnh AI — quy tắc riêng

Quy tắc dưới đây rút ra từ chương Bánh lắc và dây tóc đã nghiệm thu, không phải đề xuất mới.

### Được dùng khi nào

| Nhóm mốc | Trường `claimLevel` | Ảnh AI |
|---|---|---|
| Bối cảnh lịch sử, không có sản phẩm | `context` | **Được** |
| Phát minh, cơ chế | `first-known`, `recorded` | **Không** — SVG truy được về nguồn, ảnh thì không |
| Gắn sản phẩm có nhãn hiệu | `brand-claim`, `brand-first` | **Không** — hai lý do độc lập, xem dưới |

**Hai lý do loại nhóm nhãn hiệu:**

1. **Chuyên môn:** mô hình sinh ảnh vẽ sai vành bezel, sai hình dáng kim, sai mặt cắt vấu. Người chơi lâu năm nhận ra ngay, và một tấm sai làm hỏng uy tín của toàn bộ hệ thống dẫn nguồn mà trang đã dày công xây.
2. **Sở hữu trí tuệ:** đây là hình sản phẩm mang nhãn hiệu đang được bảo hộ. Rủi ro này **chưa được thẩm định**, và trang không có lý do gì phải nhận nó để đổi lấy một tấm hình đẹp hơn.

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.3):** phân loại ảnh AI theo **chức năng của ảnh**, không chỉ theo `claimLevel`. Ba mốc `context` hiện có (`trench-watch`, `swatch-1983`, `silicon-revival`) vẫn có thể gắn thương hiệu hoặc chi tiết kỹ thuật — không tự động coi cả ba đều phù hợp để tạo ảnh. Ảnh bối cảnh đặt **cạnh** mốc phát minh (như chương Bánh lắc đã làm) là lựa chọn biên tập; ảnh AI không dùng làm chứng cứ cấu tạo hay hình sản phẩm chính xác. Việc loại nhóm nhãn hiệu là thận trọng biên tập với rủi ro chưa thẩm định, **không phải kết luận pháp lý rằng mọi ảnh có nhãn hiệu đều bị cấm**.

### Nguyên tắc phân vai — không được vi phạm

> Ảnh AI **chỉ** tạo bối cảnh. Mọi chi tiết cơ khí nằm ở SVG riêng, suy từ nguồn. **Không suy cấu tạo từ ảnh.**

Nghĩa là: nếu người đọc cần nhìn rõ một chi tiết máy, chi tiết đó phải nằm ở SVG. Ảnh AI đặt cạnh, làm nền tâm trạng, và trong ảnh đó đồng hồ phải **nhỏ trong khung và hơi mờ**.

### Đoạn mô tả phong cách — dùng nguyên văn, không sửa

```
Editorial illustration in the style of a hand-tinted metal engraving.
Restrained palette: deep navy and warm brass as the dominant tones,
with muted neutrals. Soft directional light from the upper left. Fine
engraved hatching for shading. Detail fades toward the edges of the
frame. Atmospheric and quiet, not dramatic. No text, no letters, no
numbers, no logos, no brand marks anywhere in the image.
Aspect ratio 4:3.
```

Nếu mỗi tấm mô tả phong cách một kiểu thì mười tấm sẽ như mười họa sĩ khác nhau.

### Bốn câu kiểm trước khi dùng

Không đạt một câu thì tạo lại, không dùng tạm.

| Kiểm | Vì sao |
|---|---|
| Có chữ hoặc số nào trong ảnh không? | Lỗi phổ biến nhất của mô hình sinh ảnh |
| Đồng hồ có bị vẽ quá rõ không? | Thấy rõ vạch số và kim nghĩa là mô hình đã tự bịa chi tiết |
| Có chi tiết nào sai thời đại không? | Dây da hiện đại, vỏ thép bóng, kính cong |
| Tông màu có tối bằng dải navy xung quanh không? | Ảnh sáng hơn sẽ phá dải liên tục của trang lịch sử |

### Quy cách tệp

| Mục | Yêu cầu |
|---|---|
| Tỷ lệ | 4:3 |
| Định dạng | JPEG chất lượng 80 |
| Dung lượng | **Dưới 150 KB** ở kích thước dùng thật |
| Tên tệp | Trùng `slug` của mốc trong `timeline.json` |
| Vị trí | `public/images/timeline/<slug>.jpg` |

Hạ tầng đã sẵn: `src/pages/lich-su.astro` tự ưu tiên tệp `.jpg` nếu có, không thì dùng `.svg`. Không ưng thì xóa tệp là xong, 27 mốc còn lại không bị ảnh hưởng.

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.3):** hai nhận xét trên cần đọc đúng hiện trạng mã nguồn — (1) cơ chế ưu tiên JPG đang nằm ở **`src/components/history/HistoryTimeline.astro`** (hàm `hasImage` và phần chọn `imageSrc`), thẻ mốc render qua `WatchImage`, **không phải** trực tiếp trong `lich-su.astro` như ghi trên; (2) hiện chưa có cơ chế chú thích AI riêng cho JPG: **thêm tệp `.jpg` chưa đủ** — phải kèm loại ảnh, mô tả/chú thích hai ngôn ngữ và hồ sơ đi kèm (phần việc của H04 và H12). Giữ SVG để tra cứu và phục hồi: nếu chọn mô hình "ảnh bối cảnh cạnh sơ đồ" thì phải triển khai đúng hai lớp; cơ chế JPG thay SVG hiện có chỉ là **thay ảnh**, không tự tạo hai lớp.

### Ghi nhãn — bắt buộc, không có ngoại lệ

Mỗi ảnh AI phải hiển thị chú thích, ở cả hai ngôn ngữ, theo đúng mẫu đã dùng ở chương bánh lắc:

- Tiếng Việt: **"Minh họa AI tái dựng — không phải ảnh tư liệu"**
- Tiếng Anh: **"AI reconstruction — not a historical photograph"**

Không được giấu, không được viết mờ, không được đặt ngoài tầm nhìn. Trang đã công bố quy trình biên tập minh bạch — giấu đi là tự mâu thuẫn với chính mình.

### Lưu vết

Mỗi ảnh phải lưu vào hồ sơ: câu nội dung đã dùng, ngày tạo, số lần tạo lại, và lý do chọn bản này. Để sau này truy được và tạo lại được nếu cần.

---

# PHẦN C — DANH MỤC KIỂM TRƯỚC KHI ĐƯA HÌNH LÊN TRANG

> **Đính chính H01:** checklist dưới đây áp dụng kèm các đính chính ở B1 (đồng thau trong ảnh lịch sử), B2–B3 (mặc định có ngoại lệ), B5 (ID theo instance), B6 (timeline giữ mã màu cố định) và B7 (ngoại lệ ảnh trang trí); H04 phát hành lại checklist thống nhất.

Dùng cho mọi hình mới, không phân biệt loại.

- [ ] Khung hình thuộc một trong ba tỷ lệ ở B3
- [ ] Chỉ dùng token `--obs-*`, không thêm màu ngoài bảng B1
- [ ] Độ dày nét thuộc bốn cấp ở B2
- [ ] Ánh sáng chiếu từ trên bên trái
- [ ] **Không có chữ, số hay nhãn nào bên trong tệp hình**
- [ ] SVG không đặt thuộc tính `id`, không tham chiếu gradient theo `id`
- [ ] Có mô tả thay thế tiếng Việt và tiếng Anh, không trống
- [ ] Đổi màu đúng khi chuyển chế độ sáng và tối (trừ nhóm dòng thời gian)
- [ ] Nếu là ảnh AI: qua đủ bốn câu kiểm ở B8, có chú thích hai ngôn ngữ, dưới 150 KB, đã lưu vết
- [ ] Chạy `node scripts/scan-chars.mjs` — không lọt ký tự ngoài tiếng Việt và tiếng Anh
- [ ] Chạy `npm run check` và `npm run build` — không lỗi mới

---

# PHẦN D — NHỮNG GÌ VĂN BẢN NÀY KHÔNG YÊU CẦU

Nêu rõ để tránh phát sinh công việc ngoài ý muốn:

- **Không** yêu cầu chuyển 12 infographic cũ từ `--ig-*` sang `--obs-*`. Rủi ro hồi quy cao hơn lợi ích.
- **Không** yêu cầu đổi tỷ lệ khung của infographic cũ.
- **Không** yêu cầu động vào `MechanismAnimation.astro` — tệp này chứa chín biểu tượng `24x24`, không phải sơ đồ, và nằm ngoài phạm vi quy chuẩn này.
- **Không** yêu cầu 28 SVG dòng thời gian chuyển sang dùng `var()`.
- **Không** yêu cầu gộp gradient — quyết định giữ nguyên đã chốt ở gói P3.2.
- **Không** yêu cầu tạo thêm bất kỳ tấm ảnh AI nào. Việc tạo ảnh là quyết định riêng của chủ dự án.

Văn bản này chỉ ràng buộc **hình mới**. Hình cũ chỉ phải theo khi được nâng cấp vì một lý do khác.
