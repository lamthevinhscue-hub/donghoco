# GÓI DỮ LIỆU MẪU ICONIC — ĐỢT 2 (Phiên B của Gói 3)
## Glashütte Original SeaQ • Frédérique Constant Heart Beat • Orient Bambino

**Ngày soạn:** 06/08/2026
**Người soạn:** Claude (Cowork) — mọi dữ kiện đã tra cứu kiểm chứng, nguồn ở Phần 6
**Bổ sung cho:** `docs/bo-7-prompt-giao-glm-mo-rong-noi-dung.md`, Gói 3 Phiên B

**Nguyên tắc bắt buộc:** GLM 5.2 **chỉ được dùng dữ kiện trong tài liệu này**. Không tự thêm số liệu, tên calibre, năm tháng hay thông số nào ngoài tài liệu. Được biên tập câu chữ theo `CONTENT-GUIDE.md`, nhưng mọi dữ kiện phải truy được về đây.

**Sau gói này, cả 26 thương hiệu trên site đều có ít nhất một mẫu iconic.** Khối 5 không còn trang nào trống.

---

## PHÁT HIỆN ẢNH HƯỞNG TỚI GÓI 1 — ĐỌC TRƯỚC

Khi tra cứu Bambino, tôi **xác nhận được calibre Orient F6724** — mục 20 trong `CAN-KIEM-CHUNG.md` mà trước đây tôi phải bỏ vì các nguồn mâu thuẫn nhau.

Kết quả: **F6724 tự động, trữ cót khoảng 40 giờ, có dừng kim giây và lên dây tay bằng núm** trên các phiên bản đang bán. Nguồn cũ ghi không có hai chức năng đó nhiều khả năng nói về đời máy trước.

**Nghĩa là Gói 1 cần chỉnh một chỗ:** trong danh sách các hãng được phép hiển thị calibre, **thêm `orient`**. Danh sách đầy đủ nay là 19 slug thay vì 18. Sáu hãng còn lại trong nhóm gỡ hiển thị giữ nguyên: Breguet, Zenith, Glashütte Original, F.P. Journe, Greubel Forsey, Frédérique Constant.

Gói 1 đã chạy xong, nên đây là **một prompt sửa riêng, rất nhẹ**. Dán trước khi làm ba bài mẫu iconic.

### PROMPT SỬA GÓI 1 — dán riêng, làm trước

> Tôi vừa kiểm chứng được thêm một calibre trong danh sách chờ ở `CAN-KIEM-CHUNG.md`, cần cập nhật hai chỗ.
>
> **1. Bổ sung `orient` vào danh sách hiển thị calibre**
>
> Trong `src/i18n/ui.ts`, thêm `'orient'` vào `CALIBRE_DISPLAY_SLUGS`. Danh sách sau khi sửa có **19 slug**.
>
> **2. Cập nhật trang Orient**
>
> `src/content/thuongHieu/vi/orient.md` hiện có `signature_calibres: ["F6922", "F6724"]` nhưng khối này đang bị ẩn. Sau khi thêm slug thì khối sẽ hiện — kiểm lại phần chữ của trang cho khớp.
>
> Với **calibre F6724**, nay được phép ghi các thông số sau vì đã kiểm chứng: **tự động, trữ cót khoảng 40 giờ, có dừng kim giây và lên dây tay bằng núm**.
>
> **Lưu ý quan trọng về cách diễn đạt:** hai chức năng dừng kim giây và lên dây tay có trên **các phiên bản đang bán**. Một số nguồn cũ ghi là không có, nhiều khả năng nói về đời máy trước. Vì vậy **phải ghi rõ là các bản hiện hành**, không khẳng định cho mọi đời máy.
>
> Calibre **F6922** giữ nguyên thông số đã có: 21.600 nhịp mỗi giờ, trữ cót khoảng 40 giờ.
>
> **3. Cập nhật `CAN-KIEM-CHUNG.md`**
>
> Đánh dấu **mục 20 (calibre Orient F6724) là đã giải quyết**, ghi rõ kết luận và ghi chú về sự khác nhau giữa các đời máy. **Không xóa dòng**, giữ dấu vết như các mục đã xử lý trước.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. Chạy `npm run build`, mở `/thuong-hieu/orient` kiểm khối bộ máy đã hiện, push và báo mã commit.

---

## PROMPT DÁN CHO GLM 5.2

> Viết 3 bài mẫu iconic mới, đặt trong `src/content/mauIconic/vi/`, theo đúng cấu trúc bài mẫu iconic quy định ở `CONTENT-GUIDE.md` mục 3.2: bối cảnh ra đời, đặc điểm thiết kế nhận diện, các thế hệ tham chiếu, bộ máy, vị trí trong lịch sử.
>
> **Toàn bộ dữ kiện lấy từ file `docs/goi-du-lieu-mau-iconic-dot-2.md` tôi cung cấp kèm theo — không tự thêm bất kỳ dữ kiện, tên riêng, con số nào ngoài file.**
>
> Ba bài: `glashuette-seaq.md`, `fc-heart-beat.md`, `orient-bambino.md`.
>
> **Trường `brand` phải khớp tuyệt đối** với `title` của trang thương hiệu tương ứng, nếu không Khối 5 sẽ không nhận ra. Ba giá trị đúng là: `Glashütte Original`, `Frédérique Constant`, `Orient`.
>
> **Đọc kỹ mục "Phát hiện ảnh hưởng tới Gói 1"** ở đầu file — có một sửa nhỏ cần làm kèm.
>
> Nội dung đánh dấu [GHI CHÚ NỘI BỘ] **không hiển thị ra trang**.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. **Làm và push từng bài một.**

---

# 1. GLASHÜTTE ORIGINAL SEAQ

## 1.1. Frontmatter

```
title: "Glashütte Original SeaQ — Đồng hồ lặn Đức nối lại mạch đứt"
brand: "Glashütte Original"
year: 2019
category: "lặn"
movement: "Calibre 39-11"
power_reserve: "40 giờ"
water_resistance: "200m"
references: ["SeaQ 39,5mm", "SeaQ Panorama Date"]
```

[GHI CHÚ NỘI BỘ] Trường `references` chỉ ghi hai bản đã xác nhận. Không thêm mã tham chiếu dạng số vì tôi không đối chiếu được.

**Phần tóm tắt gợi ý:** *"Ra mắt 2019, đúng năm mươi năm sau chiếc đồng hồ lặn thời quốc doanh — mẫu đưa Glashütte Original trở lại một mảng hãng từng bỏ dở."*

## 1.2. Bối cảnh ra đời

- SeaQ ra mắt năm **2019**, tôn vinh chiếc **Spezimatik Type RP TS 200 năm 1969** — chiếc đồng hồ lặn do xí nghiệp quốc doanh GUB làm thời Đông Đức. Hai mốc cách nhau **đúng năm mươi năm**.
- Đây là chi tiết đáng kể về mặt câu chuyện: hãng không mượn di sản của người khác mà **nối lại chính mạch của mình**, một mạch từng bị đứt khi ngành đồng hồ Glashütte bị quốc hữu hóa rồi tan rã.
- Trang thương hiệu Glashütte Original đã kể phần lịch sử GUB và việc tư nhân hóa năm 1994. **Bài này phải nối vào đó**, dẫn link sang trang thương hiệu.

## 1.3. Đặc điểm thiết kế nhận diện

- **Vỏ thép đường kính 39,5mm, dày 12,5mm, khoảng cách vấu tới vấu 47mm.** Đây là kích thước hiếm gặp ở đồng hồ lặn hiện đại — phần lớn to hơn nhiều.
- **Vành xoay một chiều gắn miếng gốm đen.**
- **Núm vặn ren và nắp lưng vặn ren**, chống nước **200m**.
- Đạt cả hai chuẩn đồng hồ lặn **ISO 6425** và **DIN 8306**. Chuẩn DIN là chuẩn Đức — chi tiết nhỏ nhưng đúng tinh thần một chiếc đồng hồ lặn Đức.
- Đáy vỏ có hai lựa chọn: **thép đặc có cơ cấu vặn ở giữa, lấy cảm hứng trực tiếp từ chiếc Spezimatik 1969**, hoặc kính sapphire để nhìn bộ máy.

[GHI CHÚ NỘI BỘ] Chi tiết đáy vỏ thép là điểm nối trực tiếp với mẫu 1969 — nên nhấn, vì đây là thứ phân biệt SeaQ với mọi đồng hồ lặn khác cùng tầm.

## 1.4. Bộ máy

**Calibre 39-11**, tự động, **trữ cót 40 giờ**, tần số **28.800 nhịp mỗi giờ**.

Điểm đáng nói: dù nằm khuất sau đáy vỏ thép ở bản tiêu chuẩn, bộ máy vẫn được hoàn thiện đầy đủ theo trường phái Glashütte — **vát cạnh, vân sọc Glashütte, cần tinh chỉnh hình cổ thiên nga, rotor lộ**.

[GHI CHÚ NỘI BỘ] Đây là chi tiết hay để kết bài: hãng hoàn thiện kỹ cả phần người mua không nhìn thấy. Nhưng **viết ở mức nhận xét, đừng thổi phồng thành đạo đức nghề nghiệp**.

## 1.5. Vị trí trong lịch sử

- SeaQ là mẫu đưa Glashütte Original trở lại **mảng đồng hồ lặn** sau nhiều thập kỷ vắng bóng.
- Ý nghĩa lớn hơn nằm ở chỗ khác: đây là một trong số rất ít mẫu đồng hồ hiện đại **lấy cảm hứng từ di sản thời quốc doanh Đông Đức** thay vì né tránh giai đoạn đó. Phần lớn các hãng Đức chọn kể về thời trước chiến tranh và sau thống nhất, bỏ qua khoảng giữa.

---

# 2. FRÉDÉRIQUE CONSTANT HEART BEAT

## 2.1. Frontmatter

```
title: "Frédérique Constant Heart Beat — Ô cửa nhìn thấy nhịp đập"
brand: "Frédérique Constant"
year: 1994
category: "dress"
references: ["Classics Heart Beat", "Classics Heart Beat Manufacture"]
```

[GHI CHÚ NỘI BỘ] **Để trống `movement`, `power_reserve`, `water_resistance`.** Lý do ở mục 2.4: dòng này trải qua nhiều bộ máy khác nhau, ghi một mã sẽ sai với phần lớn phiên bản.

**Phần tóm tắt gợi ý:** *"Năm 1994, một hãng trẻ mở một ô nhỏ trên mặt số để lộ bánh lắc đang dao động — và tìm ra thứ nhận diện riêng mà tiền không mua được."*

## 2.2. Bối cảnh ra đời

- Chiếc Heart Beat đầu tiên ra mắt **năm 1994**, khi Frédérique Constant mới sáu tuổi.
- Ý tưởng đơn giản tới mức lạ: **khoét một ô trên mặt số ngay chỗ bánh lắc**, để người đeo nhìn thấy bộ phận đang dao động.
- Điều đáng nói là bối cảnh: đây là hãng còn rất trẻ, ngân sách nhỏ, không có di sản để dựa vào. Thứ họ tìm ra không phải một công nghệ mà là **một cách nhìn** — và nó thành chi tiết nhận diện theo hãng tới hôm nay.

[GHI CHÚ NỘI BỘ] Đây là bài duy nhất trong toàn bộ danh mục mẫu iconic mà **chủ thể là một ý tưởng thiết kế, không phải một chiếc đồng hồ cụ thể**. Viết đúng theo hướng đó, đừng cố biến nó thành bài về một mẫu máy.

## 2.3. Đặc điểm thiết kế nhận diện

- **Ô lộ máy ở vị trí 12 giờ**, để thấy bánh lắc dao động. Đây là chi tiết duy nhất cần nhớ về dòng này.
- Bản **Manufacture** năm 2004 có ô **hình dấu phẩy**, để lộ bộ thoát thay vì chỉ bánh lắc.
- Phần còn lại của mặt số giữ ngôn ngữ đồng hồ thanh lịch cổ điển: tối giản, cọc số mảnh, không trang trí thừa. Ô lộ máy là điểm nhấn duy nhất, và chính sự tiết chế xung quanh làm nó nổi bật.

## 2.4. Bộ máy — điểm cần viết cẩn thận

Dòng Heart Beat **trải qua nhiều bộ máy khác nhau**, và đây là chỗ dễ viết sai nhất:

| Bộ máy | Bản dùng | Đặc điểm |
|---|---|---|
| **FC-910** | Classics Heart Beat Manufacture, ra mắt **2004** | **Bộ máy tự phát triển đầu tiên của hãng.** Ô hình dấu phẩy lộ bộ thoát |
| **FC-310** | Classics Heart Beat Automatic | **Phát triển trên nền bộ máy Sellita SW200**, 26 chân kính, **trữ cót 38 giờ**, 28.800 nhịp mỗi giờ, trang trí Colimaçon, rotor mạ vàng |
| **FC-945** | Bản phức tạp | Tự động, có lịch, **pha trăng** và hiển thị 24 giờ; bánh thoát, ngựa và con lăn kép bằng **silicon** |

**Cách viết bắt buộc:** nêu rõ **chỉ dòng Manufacture mới dùng bộ máy tự phát triển**, các bản còn lại dùng bộ máy mua ngoài có chỉnh sửa. Đây đúng cách trang thương hiệu Frédérique Constant đã viết — phải nhất quán.

[GHI CHÚ NỘI BỘ] Không được viết chung chung kiểu "Heart Beat dùng bộ máy in-house". Sai với phần lớn phiên bản, và mâu thuẫn ngay với trang thương hiệu.

## 2.5. Vị trí trong lịch sử

- Heart Beat cho thấy một điều đáng suy nghĩ: **một hãng không có di sản vẫn tạo được nhận diện**, bằng một quyết định thiết kế đủ rõ và đủ kiên trì.
- Với người mới chơi, ô lộ máy này thường là **lần đầu họ nhìn thấy bánh lắc dao động bằng mắt thường** — và với nhiều người, đó là khoảnh khắc bắt đầu thích đồng hồ cơ. Giá trị đó lớn hơn thông số của bất kỳ bộ máy nào.

---

# 3. ORIENT BAMBINO

## 3.1. Frontmatter

```
title: "Orient Bambino — Chiếc đồng hồ cơ đầu tiên của rất nhiều người"
brand: "Orient"
year: 2013
category: "dress"
movement: "Calibre F6724"
power_reserve: "40 giờ"
water_resistance: "30m"
references: ["Bambino cỡ lớn 40,5mm", "Bambino 38mm"]
```

[GHI CHÚ NỘI BỘ] **Năm 2013 là con số tôi KHÔNG xác nhận được chính xác.** Nguồn chỉ nói dòng này "có mặt hơn một thập kỷ". **Bỏ hẳn trường `year` khỏi frontmatter** thay vì đoán. Tôi để lại đây để anh Vinh biết là đã cân nhắc, không phải bỏ sót.

**Phần tóm tắt gợi ý:** *"Kính vòm, mặt số sạch, bộ máy do chính hãng làm — và mức giá thấp tới mức việc thử không có rủi ro gì."*

## 3.2. Bối cảnh ra đời

- Bambino có mặt **hơn một thập kỷ**, và trong suốt thời gian đó gần như không đổi công thức: **kính vòm, tỷ lệ tiết chế, bộ máy do chính Orient sản xuất**.
- Đây là mẫu đưa rất nhiều người Việt tới với đồng hồ cơ lần đầu — không phải vì nó đẹp nhất hay tốt nhất, mà vì nó là **chiếc đồng hồ thanh lịch rẻ nhất mà bộ máy vẫn do chính hãng làm ra**.

## 3.3. Đặc điểm thiết kế nhận diện

- **Kính khoáng vòm** — chi tiết quan trọng nhất. Độ cong làm mặt số méo nhẹ ở rìa khi nhìn chếch, tạo cảm giác đồng hồ cổ. Đây là thứ khiến Bambino trông đắt hơn giá của nó.
- **Vỏ 40,5mm, dày 11,8mm, vấu tới vấu 46mm, bề rộng dây 21mm.** Bản **38mm** ra mắt năm **2022** cho cổ tay nhỏ.
- Chống nước **30m** — mức của đồng hồ lịch sự, không phải để bơi. Nên nói rõ điều này, và dẫn link sang bài hướng dẫn mức chống nước.
- Mặt số sạch, cọc số mảnh, không trang trí thừa.

## 3.4. Các thế hệ tham chiếu

Dòng này có nhiều đời, và cách phân biệt hay gây lẫn:

- **Các phiên bản** đánh số từ V1 tới V7 — phân biệt nhau bằng **thiết kế mặt số**.
- **Các thế hệ** phân biệt bằng **dòng chữ in trên mặt số**: đời một ghi `Water Resist`, đời hai ghi `Water Resistance`. Đây là mẹo nhận biết mà giới chơi hay dùng.

[GHI CHÚ NỘI BỘ] Chi tiết chữ trên mặt số rất hữu ích cho người mua lại hàng cũ. Nên đưa vào, viết như một mẹo thực dụng.

## 3.5. Bộ máy

**Calibre F6724**, tự động, **trữ cót khoảng 40 giờ**, có **dừng kim giây** và **lên dây tay bằng núm**.

[GHI CHÚ NỘI BỘ] Hai chức năng dừng kim giây và lên dây tay **có trên các phiên bản đang bán**. Một số nguồn cũ ghi là không có — nhiều khả năng nói về đời máy trước. Nếu viết, **ghi rõ là các bản hiện hành**, đừng khẳng định cho mọi đời.

Điểm đáng nhấn: ở mức giá này, **gần như mọi hãng khác đều mua bộ máy sẵn**. Orient tự thiết kế và sản xuất — mở nắp lưng ra, thứ nhìn thấy là do chính hãng làm.

## 3.6. Vị trí trong lịch sử

- Bambino không phải mẫu đột phá về kỹ thuật hay thiết kế. Vị trí của nó nằm ở chỗ khác: **đây là cánh cửa vào**.
- Với rất nhiều người, Bambino là chiếc đồng hồ đầu tiên họ thấy kim giây trôi mượt thay vì nhảy từng nấc, là lần đầu họ đeo một thứ chạy bằng dây cót chứ không phải pin.
- **Nói thẳng phần hạn chế:** hoàn thiện vỏ chỉ ở mức chấp nhận được, sai số dao động rộng, kính khoáng dễ xước hơn sapphire, và gần như không có giá trị bán lại. Đây là chiếc đồng hồ **để học và để đeo, không phải để giữ giá**.

[GHI CHÚ NỘI BỘ] Đoạn nói thẳng ở trên là bắt buộc. Site đã giữ nguyên tắc nêu cả ưu lẫn nhược từ đầu, và với mẫu nhập môn thì việc này còn quan trọng hơn — người đọc nhóm này dễ bị dẫn dắt nhất.

---

# 4. ẢNH CẦN CHUẨN BỊ

| Đường dẫn | Ảnh cần tìm |
|---|---|
| `mau-iconic/glashuette-seaq.jpg` | SeaQ 39,5mm, ưu tiên góc thấy rõ vành gốm đen |
| `mau-iconic/fc-heart-beat.jpg` | Classics Heart Beat, cận mặt số thấy rõ ô lộ bánh lắc |
| `mau-iconic/orient-bambino.jpg` | Bambino nhìn chếch để thấy độ cong của kính vòm |

[GHI CHÚ NỘI BỘ] Ảnh Bambino nên chụp chếch, vì kính vòm là đặc điểm chính mà nhìn thẳng thì không thấy.

---

# 5. CHECKLIST NGHIỆM THU

- [ ] Ba bài đủ cấu trúc theo `CONTENT-GUIDE.md` mục 3.2.
- [ ] **Không xuất hiện dữ kiện, tên riêng, con số nào NGOÀI tài liệu này.**
- [ ] Trường `brand` khớp tuyệt đối: `Glashütte Original`, `Frédérique Constant`, `Orient`.
- [ ] Bài Bambino **không có trường `year`** trong frontmatter.
- [ ] Bài Heart Beat **để trống `movement`, `power_reserve`, `water_resistance`**.
- [ ] Bài Heart Beat ghi rõ **chỉ dòng Manufacture mới dùng bộ máy tự phát triển** — nhất quán với trang thương hiệu.
- [ ] Bài SeaQ dẫn link sang trang thương hiệu Glashütte Original và nối vào phần lịch sử GUB đã kể ở đó.
- [ ] Bài Bambino có đoạn nói thẳng về hạn chế.
- [ ] **Đã thêm `orient` vào danh sách hãng được phép hiển thị calibre** theo mục đầu tài liệu.
- [ ] Mở ba trang thương hiệu tương ứng, **Khối 5 đã hiện mẫu iconic**.
- [ ] Không có ký tự ngoài tiếng Việt và tiếng Anh; không lẫn từ tiếng Anh đứng đơn lẻ giữa câu; không có giá bằng đô la.
- [ ] `npm run build` không lỗi.

---

# 6. NGUỒN ĐÃ TRA CỨU

[GHI CHÚ NỘI BỘ] Không đưa lên trang.

**Glashütte Original SeaQ** — ra mắt 2019, kế thừa Spezimatik Type RP TS 200 năm 1969, thông số vỏ 39,5mm và calibre 39-11: [Monochrome — Glashütte Original SeaQ 39.5mm Review](https://monochrome-watches.com/glashutte-original-seaq-39-5mm-review-price/), [Fratello — Taking A Fresh Look At The 39.5mm SeaQ](https://www.fratellowatches.com/taking-a-fresh-look-at-the-39-5mm-glashutte-original-seaq/), [Exquisite Timepieces — SeaQ Blue Dial 39.5mm](https://www.exquisitetimepieces.com/glashutte-original-seaq-blue-dial-39-5mm-1-39-11-09-81-70.html)

**Frédérique Constant Heart Beat** — chiếc đầu tiên 1994, calibre FC-910 năm 2004, thông số FC-310 và FC-945: [Frédérique Constant — Men's Heart Beat chính hãng](https://us.frederiqueconstant.com/collection/mens-heart-beat/), [Monochrome — Classics Heart Beat Manufacture](https://monochrome-watches.com/frederique-constant-updates-the-classics-heart-beat-manufacture-specs-price/), [WatchBase — Calibre FC-945](https://watchbase.com/frederique-constant/caliber/fc-945)

**Orient Bambino** — các thế hệ và phiên bản, bản 38mm năm 2022, thông số vỏ và calibre F6724: [Monochrome — Orient Bambino 38 No-Date](https://monochrome-watches.com/introducing-orient-bambino-38-no-date-and-new-colours-2026-bambino-classic-date-specs-price/), [WatchRanker — Orient Bambino Complete Guide](https://watchranker.com/orient-bambino-watches-guide/), [Relojes Wiki — Orient Bambino, all versions](https://relojes.wiki/en/orient-bambino/)
