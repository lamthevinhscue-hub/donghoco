# PROMPT GIAO GLM — 28 MINH HỌA SVG GỐC CHO TRANG LỊCH SỬ

**Ngày soạn:** 04/08/2026
**Người soạn:** Claude (Cowork)
**Mục tiêu:** Lấp đủ 28 ô ảnh trên trang `/lich-su` bằng minh họa vector gốc, không vướng bản quyền, đồng bộ với ngôn ngữ thị giác đã có của site.

---

## PROMPT DÁN CHO GLM 5.2 — ĐỢT 1 (5 hình mẫu)

> Trang `/lich-su` có 28 mốc lịch sử, cả 28 ô ảnh đều đang trống. Chúng ta sẽ lấp bằng **minh họa vector gốc do anh tự vẽ**, không dùng ảnh tải về, để tránh vướng bản quyền và để 28 ô đồng nhất về phong cách.
>
> **Đọc kỹ toàn bộ file `docs/prompt-glm-28-minh-hoa-svg-timeline.md` tôi cung cấp kèm theo trước khi vẽ nét đầu tiên.** File quy định hệ thống thị giác chung ở Phần 1 và bản mô tả chi tiết từng hình ở Phần 3.
>
> **Đợt này chỉ làm 5 hình:** `peter-henlein`, `huygens-hairspring`, `breguet-tourbillon`, `rolex-oyster`, `ap-royal-oak`. Đây là 5 hình mẫu trải đều các thời kỳ và các kiểu chủ thể — làm xong thì **dừng lại chờ tôi duyệt phong cách**, chưa làm tiếp 23 hình còn lại.
>
> Bốn điều quan trọng nhất, nhắc lại ở đây để anh không phải tra:
>
> 1. **Đây là một bộ, không phải 5 hình rời.** Tuân thủ tuyệt đối hệ thống ở Phần 1: khung `viewBox="0 0 800 600"`, đúng ba màu `#1F2D3D` nền, `#B8893C` nét chính, `#FAF7F2` nét sáng; bốn mức độ dày nét 3px, 1.75px, 1px, 0.75px; lớp hoa văn guilloché dùng chung.
> 2. **Vẽ theo lối khắc nét, không theo lối ảnh chụp.** Tạo khối bằng gạch song song, không chuyển sắc, không đổ bóng, không làm mờ.
> 3. **Không vẽ logo, chữ ký hay tên thương hiệu. Không dùng thẻ `<text>`** — file nằm ở `public/` nên nạp như tài liệu độc lập, chữ sẽ vỡ font. Ký tự nào cần thì vẽ bằng path.
> 4. **Không sao chép mã SVG từ bất kỳ nguồn nào trên mạng.** Toàn bộ phải tự dựng từ mô tả trong file.
>
> Đặt file tại `public/images/timeline/<slug>.svg`, tên khớp tuyệt đối với trường `slug` trong `src/data/timeline.json`. Mỗi file dưới 15KB, có `<title>` tiếng Việt và thuộc tính `role="img"`, định danh `id` của hoa văn nền khác nhau giữa các file.
>
> **Chưa sửa `lich-su.astro` ở đợt này** — việc đó để đợt cuối, theo mục 1.7.
>
> Xong việc: tự kiểm theo checklist ở Phần 4, đặc biệt là **thu nhỏ hình xuống 320px chiều ngang xem còn đọc ra chủ thể không**. Chạy `npm run build` xác nhận không lỗi, push và báo lại mã commit kèm nhận xét ngắn về những chỗ anh thấy khó vẽ nhất.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

---

## PROMPT DÁN CHO GLM 5.2 — ĐỢT 2 (5 hình)

> **Đợt 1 đã duyệt.** Vòng sửa vừa rồi đạt: vỏ trứng Peter Henlein nay khép đúng với nắp có bản lề, lồng tourbillon đã thành ba nan cong với mũi tên ôm quanh, Rolex Oyster đã thấy được ren răng cưa, vòng đệm sáng và bánh răng bên trong. Gạch tạo khối và hoa văn nền nay đã đọc được. Giữ nguyên đúng phong cách đó cho đợt này.
>
> **Đợt 2 làm 5 hình:** `blancpain`, `vacheron-constantin`, `breguet-naples`, `patek-first-wristwatch`, `cartier-santos`.
>
> Bản mô tả chi tiết từng hình ở **Phần 3, mục 3 đến mục 8** của file `docs/prompt-glm-28-minh-hoa-svg-timeline.md`. Đọc kỹ trước khi vẽ.
>
> **Ba điều riêng của đợt này — quan trọng hơn cả phần kỹ thuật:**
>
> **1. Hai hình đầu là BỐI CẢNH, không phải đồ vật.** Đây là kiểu chủ thể anh chưa vẽ bao giờ trong bộ này.
>
> - `blancpain` là một căn gác xưởng thợ đồng hồ vùng Jura: cửa sổ nhiều ô kính chiếm phần lớn tường, bàn thợ, mái dốc.
> - `vacheron-constantin` là bàn tay thợ cả đặt trên bản hợp đồng học nghề, có bút lông ngỗng và vài bánh răng.
>
> Với hai hình này, **phối cảnh và tỷ lệ quan trọng hơn chi tiết**. Một căn phòng vẽ sai phối cảnh sẽ hỏng ngay, trong khi một chiếc đồng hồ vẽ thiếu chi tiết thì vẫn đọc được. Dựng khối lớn trước, chi tiết sau.
>
> **Tuyệt đối không vẽ khuôn mặt người.** Cả bộ 28 hình không có gương mặt nào. Với `vacheron-constantin` chỉ vẽ bàn tay, không vẽ người.
>
> **2. Ba hình sau là ba chiếc đồng hồ đeo tay đời đầu, nằm liền nhau trên timeline — phải nhìn là thấy khác nhau ngay.** Đây là cái bẫy giống hệt cặp 1923 với 1931 mà tôi đã cảnh báo:
>
> | Hình | Năm | Dáng bắt buộc | Tinh thần |
> |---|---|---|---|
> | `breguet-naples` | 1810 | **Ô-van dẹt kéo dài rõ rệt**, dây quấn cổ tay bện | Vật lạ, chưa có tiền lệ |
> | `patek-first-wristwatch` | 1868 | **Chữ nhật nhỏ nạm đá**, vòng đeo dạng lắc kim loại bản to | Đồ trang sức của phụ nữ |
> | `cartier-santos` | 1904 | **Vuông bo góc, tám ốc lộ trên vành**, dây da | Dụng cụ cho phi công |
>
> Ba hình này đặt cạnh nhau phải kể được một câu chuyện: đồng hồ đeo tay đi từ **vật kỳ lạ** sang **đồ trang sức** rồi mới thành **dụng cụ**. Nếu ba hình trông na ná nhau thì câu chuyện đó mất.
>
> **3. Nhắc lại thông số đã sửa sau đợt 1** — dùng đúng bản mới, đừng lấy lại thông số cũ:
>
> - Gạch tạo khối: **1px**, các nét cách nhau **4 tới 6px**, mỗi vùng rộng tối thiểu **40×40px**, mỗi hình **ít nhất hai vùng**.
> - Hoa văn nền: bước lặp **40px**, opacity **0.10 đến 0.12**.
> - Bốn mức độ dày nét: 3px, 1.75px, 1px, 0.75px.
> - Ba màu: `#1F2D3D` nền, `#B8893C` nét chính, `#FAF7F2` nét sáng. Không màu thứ tư.
>
> **Các ràng buộc kỹ thuật giữ nguyên như đợt 1:** `viewBox="0 0 800 600"`, lề an toàn 60px, đặt tại `public/images/timeline/<slug>.svg` đúng tên slug, dưới 15KB, có `<title>` tiếng Việt và `role="img"`, định danh hoa văn khác nhau giữa các file, **không thẻ `<text>`**, không logo, không chép mã SVG từ mạng.
>
> **Chưa sửa `lich-su.astro`** — để đợt cuối.
>
> **Tự kiểm bắt buộc trước khi push:** render mỗi hình ra ảnh chiều ngang **320px** và nhìn. Nếu không đọc ra chủ thể thì chưa xong — đợt 1 anh bỏ qua bước này nên `rolex-oyster` lọt lưới. Riêng đợt này kiểm thêm: **đặt ba hình đồng hồ cạnh nhau ở cỡ 320px, có phân biệt được ngay không?**
>
> Xong việc: chạy `npm run build`, push và báo mã commit.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

---

## PROMPT DÁN CHO GLM 5.2 — ĐỢT 3 (5 hình)

> **Đợt 3 làm 5 hình:** `trench-watch`, `harwood-automatic`, `rolex-perpetual`, `jlc-reverso`, `iwc-pilot`.
>
> Bản mô tả chi tiết từng hình ở **Phần 3, mục 9 đến mục 14** của file `docs/prompt-glm-28-minh-hoa-svg-timeline.md`. Đọc kỹ trước khi vẽ.
>
> **Ba điều riêng của đợt này:**
>
> **1. Cặp `harwood-automatic` (1923) và `rolex-perpetual` (1931) là cái bẫy lớn nhất đợt này.** Hai mốc này nằm sát nhau trên timeline và cùng nói về cơ chế lên dây tự động, nhưng khác nhau ở đúng một điểm — và chính điểm đó mới là nội dung lịch sử:
>
> | Hình | Chi tiết bắt buộc | Điều tuyệt đối không được vẽ |
> |---|---|---|
> | `harwood-automatic` | Khối con lắc hình quạt **chỉ quét được nửa vòng**, có **hai chốt chặn ở hai đầu hành trình**, cung mũi tên **hai chiều** | Không vẽ rotor xoay tròn |
> | `rolex-perpetual` | Rotor **bán nguyệt gắn trục giữa**, cung mũi tên **tròn khép kín đủ 360 độ** | Không vẽ chốt chặn |
>
> Đặt hai hình cạnh nhau, người xem phải thấy ngay: một bên **bị chặn hai đầu**, một bên **quay tự do trọn vòng**.
>
> **2. `jlc-reverso` phải vẽ ở trạng thái đang lật dở**, không vẽ nằm phẳng. Toàn bộ ý nghĩa của mẫu này nằm ở động tác lật: một nửa vỏ đã xoay, một nửa còn trên khung trượt, có trục xoay và cung mũi tên chỉ chuyển động. Đây là hình khó nhất đợt này vì phải diễn tả chuyển động bằng hình tĩnh — dựng khối và phối cảnh trước, chi tiết sau.
>
> **3. `trench-watch` — lưu ý về nội dung.** Mốc này gắn với Thế chiến thứ nhất, nhưng **chỉ vẽ vật thể**: chiếc đồng hồ bỏ túi được hàn thêm hai quai để đeo tay, có lồng lưới bảo vệ mặt kính, dây vải bạt. **Không vẽ cảnh chiến tranh, không vẽ vũ khí, không vẽ bất cứ thứ gì gợi bạo lực.**
>
> **Nhắc lại thông số chuẩn của bộ:**
>
> - Ba màu: `#1F2D3D` nền, `#B8893C` nét chính, `#FAF7F2` nét sáng. Không màu thứ tư.
> - Bốn mức độ dày nét: **3px, 1.75px, 1px, 0.75px**.
> - Gạch tạo khối: **1px**, các nét cách nhau **4 tới 6px**, mỗi vùng rộng tối thiểu **40×40px**, mỗi hình **ít nhất hai vùng**.
> - Hoa văn nền: bước lặp **40px**, opacity **0.10 đến 0.12**.
>
> **Ràng buộc kỹ thuật:** `viewBox="0 0 800 600"`, lề an toàn 60px, đặt tại `public/images/timeline/<slug>.svg` đúng tên slug, dưới 15KB, có `<title>` tiếng Việt và `role="img"`, định danh hoa văn khác nhau giữa các file, **không thẻ `<text>`**, không logo, không chép mã SVG từ mạng. **Chưa sửa `lich-su.astro`.**
>
> **Tự kiểm bắt buộc trước khi push:** render mỗi hình ra ảnh chiều ngang **320px** và nhìn. Nếu không đọc ra chủ thể thì chưa xong. Riêng đợt này kiểm thêm: **đặt `harwood-automatic` cạnh `rolex-perpetual` ở cỡ 320px, có thấy ngay sự khác nhau giữa nửa vòng và trọn vòng không?**
>
> Xong việc: chạy `npm run build`, push và báo mã commit.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

---

## PROMPT DÁN CHO GLM 5.2 — ĐỢT 4 (5 hình)

> **Đợt 4 làm 5 hình:** `rolex-datejust`, `fifty-fathoms`, `rolex-submariner`, `rolex-gmt`, `omega-speedmaster`.
>
> Bản mô tả chi tiết từng hình ở **Phần 3, mục 15 đến mục 19** của file `docs/prompt-glm-28-minh-hoa-svg-timeline.md`. Đọc kỹ trước khi vẽ.
>
> **Đây là đợt rủi ro nhất của cả dự án.** Năm mốc này đều thuộc thập niên 1945–1957, bốn trong năm là đồng hồ thể thao có vành xoay, ba trong năm cùng một hãng. Nếu vẽ theo bản năng, cả năm hình sẽ ra **năm cái mặt số tròn có vành khía** giống hệt nhau, và một phần tư trang Lịch sử sẽ trông như lỗi lặp.
>
> **Cách chống lặp: mỗi hình một cỡ nhìn khác nhau.** Đây là ràng buộc bắt buộc của đợt này:
>
> | Hình | Cỡ nhìn | Bố cục bắt buộc |
> |---|---|---|
> | `rolex-datejust` | **Cận cảnh chi tiết** | Chỉ vẽ ô cửa sổ ngày và khối kính lúp hình vòm phía trên. **Không vẽ cả chiếc đồng hồ.** Thấy đĩa ngày bên dưới đang xoay dở, nửa con số trước và nửa con số sau |
> | `fifty-fathoms` | **Cảnh dưới nước** | Mặt số lặn đặt trong môi trường: bọt khí nhỏ dần khi lên cao, vài nét sóng ngang mờ. Vành xoay **một chiều**, có chấm tam giác ở mốc 0 |
> | `rolex-submariner` | **Hai vật thể** | Hai chiếc đặt cạnh nhau, một chiếc chếch sau. Chiếc trước có vành lặn, chiếc sau là mặt số ba kim tối giản. **Hai chiếc phải khác nhau rõ** — mốc này nói về hai hướng đi tách ra cùng lúc |
> | `rolex-gmt` | **Đồ họa phẳng, chính diện** | Tập trung vào vành 24 vạch: nửa vành gạch dày đặc, nửa vành để trống, phân biệt ngày và đêm bằng **mật độ gạch chứ không bằng màu**. Kim GMT có **đầu hình tam giác rỗng**, khác hẳn kim giờ |
> | `omega-speedmaster` | **Vật thể có nền** | Ba mắt phụ tròn đối xứng, hai nút bấm bên núm vặn, vành tachymeter vạch chia **thưa dần theo đúng quy luật thật**; vành trăng khuyết vẽ mờ ở nền |
>
> **Hai điểm dễ sai về kiến thức:**
>
> - Vành đồng hồ lặn **chỉ xoay được một chiều** — đây là điểm an toàn cốt lõi, vẽ thành hai chiều là sai nguyên lý.
> - Thang tachymeter **không chia đều**: vạch thưa dần về cuối thang. Vẽ chia đều là người am hiểu thấy ngay.
>
> **Không vẽ phi hành gia, không vẽ tàu vũ trụ** ở hình Speedmaster. Chỉ gợi bằng vành trăng mờ ở nền.
>
> **Nhắc lại thông số chuẩn của bộ:**
>
> - Ba màu: `#1F2D3D` nền, `#B8893C` nét chính, `#FAF7F2` nét sáng. Không màu thứ tư.
> - Bốn mức độ dày nét: **3px, 1.75px, 1px, 0.75px**.
> - Gạch tạo khối: **1px**, các nét cách nhau **4 tới 6px**, mỗi vùng rộng tối thiểu **40×40px**, mỗi hình **ít nhất hai vùng**.
> - Hoa văn nền: bước lặp **40px**, opacity **0.10 đến 0.12**.
>
> **Ràng buộc kỹ thuật:** `viewBox="0 0 800 600"`, lề an toàn 60px, đặt tại `public/images/timeline/<slug>.svg` đúng tên slug, dưới 15KB, có `<title>` tiếng Việt và `role="img"`, định danh hoa văn khác nhau giữa các file, **không thẻ `<text>`**, không logo, không chép mã SVG từ mạng. **Chưa sửa `lich-su.astro`.**
>
> **Tự kiểm bắt buộc trước khi push:** render cả năm hình ra ảnh chiều ngang **320px**, **xếp cạnh nhau thành một dải và nhìn**. Nếu có hai hình nào trông na ná nhau thì phải sửa. Đây là bước quan trọng nhất của đợt này.
>
> Xong việc: chạy `npm run build`, push và báo mã commit.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

---

## PROMPT DÁN CHO GLM 5.2 — ĐỢT 5 (4 hình)

> **Đợt 5 làm 4 hình:** `heuer-carrera`, `automatic-chronograph-race`, `seiko-astron`, `patek-nautilus`.
>
> Bản mô tả chi tiết từng hình ở **Phần 3, mục 20 đến mục 24** của file `docs/prompt-glm-28-minh-hoa-svg-timeline.md`. Đọc kỹ trước khi vẽ.
>
> **Bốn điều riêng của đợt này:**
>
> **1. `automatic-chronograph-race` là hình trừu tượng nhất cả bộ.** Mốc 1969 nói về **ba dự án chronograph tự động cùng về đích một năm**, không nói về một chiếc đồng hồ cụ thể. Vẽ **ba bộ máy cách điệu chạy song song như ba vận động viên**: ba cụm hình tròn **kích thước bằng nhau**, đặt lệch nhau theo phương ngang, mỗi cụm có một chi tiết nhận diện riêng, cùng ba vạch đích thẳng đứng bên phải.
>
> **Tuyệt đối không làm một cụm nổi bật hơn hai cụm kia.** Đây là cuộc đua hòa, hình phải giữ thế cân bằng — nếu một cụm to hơn hoặc đậm hơn là kể sai lịch sử.
>
> **2. `patek-nautilus` phải phân biệt rõ với `ap-royal-oak` đã vẽ ở đợt 1.** Hai mốc này cách nhau bốn năm và nằm sát nhau trên timeline, cùng là đồng hồ thể thao vỏ liền dây:
>
> | Hình | Dáng bắt buộc |
> |---|---|
> | `ap-royal-oak` (đã có) | **Bát giác đều tám cạnh**, tám ốc lộ ở góc, mặt số hoa văn ô vuông |
> | `patek-nautilus` (làm đợt này) | **Tròn bo trong khung chữ nhật**, có **hai chi tiết bản lề nhô ra hai bên** như cửa sổ khoang tàu, mặt số **gân ngang song song** |
>
> Mở file `public/images/timeline/ap-royal-oak.svg` ra xem trước khi vẽ Nautilus, để chắc chắn hai hình không giống nhau.
>
> **3. `seiko-astron` phải đối lập hẳn với mọi hình cơ khí xung quanh.** Đây là mốc quartz, mốc gây ra khủng hoảng cho cả ngành cơ khí. Vẽ **tinh thể thạch anh hình âm thoa hai nhánh** (đây là hình dạng thật của tinh thể dao động), các đường sóng phát ra từ nó, và **kim giây vẽ ở ba vị trí rời rạc** để nói lên bước nhảy từng giây, khác hẳn chuyển động trôi của đồng hồ cơ.
>
> Giữ hình này **tối giản hơn hẳn các hình khác** — sự tương phản chính là nội dung. Không vẽ mạch điện tử phức tạp.
>
> **4. `heuer-carrera` — chi tiết cốt lõi dễ bị bỏ sót.** Vòng chia phút phải đặt **trên phần vát nghiêng ở rìa ngoài mặt số**, không đặt phẳng trên mặt số. Đây chính là ý tưởng làm nên mẫu này: giúp người lái đọc nhanh khi đang cầm vô lăng. Nền phía sau chỉ gợi bằng **hai đường cong khúc cua**, không vẽ xe đua.
>
> **Nhắc lại thông số chuẩn của bộ:**
>
> - Ba màu: `#1F2D3D` nền, `#B8893C` nét chính, `#FAF7F2` nét sáng. Không màu thứ tư.
> - Bốn mức độ dày nét: **3px, 1.75px, 1px, 0.75px**.
> - Gạch tạo khối: **1px**, các nét cách nhau **4 tới 6px**, mỗi vùng rộng tối thiểu **40×40px**, mỗi hình **ít nhất hai vùng**.
> - Hoa văn nền: bước lặp **40px**, opacity **0.10 đến 0.12**.
>
> **Ràng buộc kỹ thuật:** `viewBox="0 0 800 600"`, lề an toàn 60px, đặt tại `public/images/timeline/<slug>.svg` đúng tên slug, dưới 15KB, có `<title>` tiếng Việt và `role="img"`, định danh hoa văn khác nhau giữa các file, **không thẻ `<text>`**, không logo, không chép mã SVG từ mạng. **Chưa sửa `lich-su.astro`.**
>
> **Tự kiểm bắt buộc trước khi push:** render mỗi hình ra ảnh chiều ngang **320px** và nhìn. Riêng đợt này kiểm thêm: **đặt `patek-nautilus` cạnh `ap-royal-oak` ở cỡ 320px, có phân biệt được ngay không?**
>
> Xong việc: chạy `npm run build`, push và báo mã commit.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

---

## PROMPT DÁN CHO GLM 5.2 — ĐỢT 6, ĐỢT CUỐI (4 hình + sửa mã)

> **Đợt 6 làm nốt 4 hình cuối:** `swatch-1983`, `omega-coaxial`, `un-freak`, `silicon-revival`. **Kèm một việc sửa mã** ở cuối prompt.
>
> Bản mô tả chi tiết từng hình ở **Phần 3, mục 25 đến mục 28** của file `docs/prompt-glm-28-minh-hoa-svg-timeline.md`. Đọc kỹ trước khi vẽ.
>
> **Bốn điều riêng của đợt này:**
>
> **1. `silicon-revival` phải khác rõ với `huygens-hairspring` đã vẽ ở đợt 1.** Hai hình này là **hai đầu của cùng một câu chuyện dây tóc kéo dài 350 năm** — cùng chủ thể nhưng phải khác hẳn về chất liệu:
>
> | Hình | Chất | Đặc điểm hình học |
> |---|---|---|
> | `huygens-hairspring` (đã có) | Thép, **mềm và hữu cơ** | Xoắn ốc đường cong mượt |
> | `silicon-revival` (làm đợt này) | Silicon, **sắc và hình học** | Xoắn ốc **cạnh sắc, góc vuông vức**, phủ **hoa văn lưới tinh thể mảnh** |
>
> Thêm vài dây tóc thép truyền thống vẽ mờ ở nền để đối chiếu. Mở `public/images/timeline/huygens-hairspring.svg` ra xem trước khi vẽ.
>
> **2. `swatch-1983` cố ý vẽ khác phong cách phần còn lại.** Đây là mốc về sự phá cách, về việc giảm số linh kiện xuống mức tối thiểu để cứu ngành đồng hồ Thụy Sĩ. Vẽ vỏ nhựa nhìn xuyên thấu với **rất ít chi tiết bên trong** — chỉ vài bánh răng — và **nét vẽ phóng khoáng hơn các hình khác**, mang tinh thần vui vẻ.
>
> Nhưng vẫn **giữ đúng ba màu của bộ**. Thể hiện sự vui tươi bằng **nhịp nét**, không bằng màu — ta không có màu thứ tư.
>
> **3. `omega-coaxial` — chi tiết quyết định toàn bộ nội dung.** Phải vẽ **hai bánh thoát xếp chồng đồng trục**. Chữ "đồng trục" chính là tên gọi và cũng là toàn bộ nội dung của phát minh này; vẽ thành một tầng là hình mất nghĩa hoàn toàn. Thêm ba viên đá trên ngựa, mũi tên chỉ hướng truyền lực, và **một khung nhỏ ở góc vẽ bộ thoát truyền thống một tầng để đối chiếu**.
>
> **4. `un-freak` — vẽ đúng cái nó KHÔNG có.** Chiếc đồng hồ này nổi tiếng vì **không kim, không mặt số thường, không núm vặn**. Vẽ bộ máy dạng băng chuyền xoay nằm ngay trên mặt số, cầu máy dài nằm ngang đóng vai trò kim chỉ phút, bánh răng lộ hoàn toàn, vành ngoài trơn không núm. **Tuyệt đối không vẽ kim giờ và kim phút thông thường.** Thêm một chi tiết vẽ bằng nét mảnh hơn hẳn phần còn lại để gợi linh kiện silicon.
>
> **Nhắc lại thông số chuẩn của bộ:**
>
> - Ba màu: `#1F2D3D` nền, `#B8893C` nét chính, `#FAF7F2` nét sáng. Không màu thứ tư.
> - Bốn mức độ dày nét: **3px, 1.75px, 1px, 0.75px**.
> - Gạch tạo khối: **1px**, các nét cách nhau **4 tới 6px**, mỗi vùng rộng tối thiểu **40×40px**, mỗi hình **ít nhất hai vùng**.
> - Hoa văn nền: bước lặp **40px**, opacity **0.10 đến 0.12**.
>
> **Ràng buộc kỹ thuật:** `viewBox="0 0 800 600"`, lề an toàn 60px, đặt tại `public/images/timeline/<slug>.svg` đúng tên slug, dưới 15KB, có `<title>` tiếng Việt và `role="img"`, định danh hoa văn khác nhau giữa các file, **không thẻ `<text>`**, không logo, không chép mã SVG từ mạng.
>
> ---
>
> **VIỆC SỬA MÃ — chỉ làm ở đợt này**
>
> `src/pages/lich-su.astro` hiện viết cứng đuôi `.jpg`:
>
> ```
> const imageSrc = `/images/timeline/${m.slug}.jpg`;
> ```
>
> Sửa thành logic **ưu tiên ảnh thật, lùi về minh họa**: kiểm tại thời điểm dựng trang xem `public/images/timeline/<slug>.jpg` có tồn tại không; có thì dùng file `.jpg`, không thì dùng file `.svg`. Dùng module `node:fs` trong phần frontmatter của trang — đây là trang tĩnh nên kiểm lúc dựng là đủ.
>
> Mục đích: sau này khi có ảnh chụp thật, chỉ cần bỏ file `.jpg` vào đúng thư mục là ảnh tự lên thay minh họa, **không phải sửa mã lần nữa**.
>
> ---
>
> **Tự kiểm bắt buộc trước khi push — đợt cuối nên kiểm kỹ hơn:**
>
> 1. Render mỗi hình ra ảnh chiều ngang **320px** và nhìn.
> 2. **Đặt `silicon-revival` cạnh `huygens-hairspring`** — có thấy rõ một bên mềm hữu cơ, một bên sắc hình học không?
> 3. **Render cả 28 hình ra ảnh nhỏ, xếp thành một bảng và nhìn tổng thể.** Đây là bài kiểm quan trọng nhất của cả dự án: 28 hình có trông như **một bộ** không, hay vẫn còn hình nào lạc lõng? Báo lại cho tôi những hình anh thấy chưa hòa vào bộ.
> 4. Thử tạm một file `.jpg` bất kỳ trong `public/images/timeline/` để xác nhận logic ưu tiên ảnh thật chạy đúng, rồi xóa đi.
> 5. Mở `/lich-su` kiểm trên cả máy tính lẫn điện thoại, cả chế độ sáng lẫn tối.
>
> Xong việc: chạy `npm run build`, push và báo mã commit kèm nhận xét tổng thể về cả bộ 28 hình.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

---

## ĐỌC TRƯỚC — BỐN ĐIỀU QUYẾT ĐỊNH CHẤT LƯỢNG CẢ BỘ

**1. Đây là một bộ, không phải 28 hình rời.** Người đọc cuộn qua trang Lịch sử sẽ thấy cả 28 ô nối nhau. Nếu mỗi hình một phong cách thì trang trông như ảnh vơ vét từ nhiều nguồn — đúng thứ ta đang tránh. **Phần 1 quy định hệ thống chung, phải tuân thủ tuyệt đối cho cả 28 hình.**

**2. Vẽ theo lối khắc nét, không vẽ theo lối ảnh chụp.** Mục tiêu là "bản khắc trong sách chuyên khảo", không phải "ảnh sản phẩm". Lối khắc nét vừa đẹp, vừa đồng nhất được 28 hình, vừa tránh được rủi ro pháp lý.

**3. Không vẽ logo, không vẽ chữ ký thương hiệu, không vẽ chữ.** Kiểu dáng đồng hồ hiện đại có thể được bảo hộ. Vẽ **nguyên lý kỹ thuật hoặc bối cảnh lịch sử** của mốc đó, không sao chép y nguyên một sản phẩm đang bán. Với các mẫu hiện đại, vẽ đặc điểm nhận diện ở mức gợi ý, cách điệu, đủ để người am hiểu nhận ra mà không phải bản vẽ kỹ thuật của sản phẩm thật.

**4. Không dùng thẻ `<text>` trong SVG.** File nằm ở `public/` nên được nạp như tài liệu độc lập, không kế thừa font của trang — chữ sẽ hiển thị sai font hoặc vỡ. Nếu bắt buộc phải có ký tự (ví dụ cọc số La Mã trên mặt số), **vẽ bằng path**, không dùng `<text>`.

---

# PHẦN 1 — HỆ THỐNG THỊ GIÁC CHUNG (bắt buộc cho cả 28 hình)

## 1.1. Khung và kích thước

- `viewBox="0 0 800 600"` — tỷ lệ 4:3, khớp với `ratio="4/3"` mà `WatchImage` đang dùng ở trang Lịch sử.
- Không đặt `width` và `height` cố định; để SVG tự co giãn.
- **Lề an toàn 60px mỗi phía.** Chủ thể chính nằm gọn trong vùng 680×480 ở giữa. Trang Lịch sử cắt ảnh theo `object-cover` nên mép ngoài có thể bị xén.

## 1.2. Bảng màu — đúng ba màu, không hơn

| Vai trò | Mã màu | Dùng cho |
|---|---|---|
| Nền | `#1F2D3D` | Nền toàn khung, phủ kín |
| Nét chính | `#B8893C` | Đường viền chủ thể, chi tiết chính |
| Nét phụ và sáng | `#FAF7F2` | Điểm nhấn, chi tiết sáng, tối đa 15% tổng lượng nét |

Ba màu này lấy đúng từ `tailwind.config.mjs` (`navy`, `brass`, `cream`). Được phép dùng thêm **độ mờ** của ba màu đó (ví dụ `#B8893C` ở opacity 0.3) để tạo lớp sâu, **nhưng không thêm màu thứ tư**.

**Không chuyển sắc, không đổ bóng, không làm mờ.** Chỉ nét và mảng phẳng.

**Về chế độ tối:** nền của hình vốn đã là navy đậm nên hoạt động tốt ở cả hai chế độ. Không cần xử lý gì thêm, và **không được** dùng `@media (prefers-color-scheme)` vì site dùng dark mode theo class, hai cơ chế không khớp nhau sẽ gây lệch.

## 1.3. Nét vẽ — phân cấp bốn mức

| Mức | Độ dày | Dùng cho |
|---|---|---|
| Chính | 3px | Đường bao chủ thể |
| Phụ | 1.75px | Chi tiết bên trong |
| Mảnh | 1px | Nét gạch tạo khối |
| Rất mảnh | 0.75px | Hoa văn nền |

Luôn đặt `stroke-linecap="round"` và `stroke-linejoin="round"`. Dùng `fill="none"` làm mặc định — đây là bộ hình bằng **nét**, không phải bằng mảng đặc.

**Tạo khối bằng gạch song song** (hatching) theo lối khắc gỗ, không bằng chuyển sắc. Gạch dày lên ở vùng tối, thưa ra ở vùng sáng.

**Bắt buộc:** mỗi hình có **ít nhất hai vùng gạch** — một vùng tối đậm, một vùng chuyển tiếp thưa hơn. Mỗi vùng rộng tối thiểu **40×40px**, các nét cách nhau **4 tới 6px**. Gạch quá mảnh và quá thưa thì render ra không thấy gì, và cả bộ sẽ trông như bản vẽ CAD thay vì bản khắc — đây là lỗi đã xảy ra ở đợt 1.

## 1.4. Hoa văn nền dùng chung

Cả 28 hình dùng **cùng một lớp nền guilloché** — các đường tròn đồng tâm, để bộ hình có mạch chung và nối được với ô giữ chỗ mặt số trong `WatchImage.astro`:

```
<pattern id="gui" width="40" height="40" patternUnits="userSpaceOnUse">
  các đường tròn đồng tâm bán kính 3, 7, 12 — stroke #B8893C, opacity tổng thể 0.10 đến 0.12
</pattern>
```

Phủ hoa văn này lên toàn khung, **dưới** chủ thể chính. Định danh `id` phải **khác nhau giữa các file** (ví dụ `gui-peter-henlein`) để tránh đụng nhau nếu sau này nhúng nhiều SVG vào một trang.

## 1.5. Bố cục

- **Một chủ thể chính duy nhất**, đặt giữa hoặc lệch nhẹ theo tỷ lệ vàng.
- Tối đa **hai yếu tố phụ** làm bối cảnh. Đừng nhồi.
- Trong một hình, tổng số chi tiết nhìn thấy được **không quá 40 nét riêng biệt**. Ô ảnh trên điện thoại chỉ rộng khoảng 320px — hình quá chi tiết sẽ thành một mớ rối.
- **Kiểm bắt buộc:** thu nhỏ hình xuống 320×240 và nhìn. Nếu không còn đọc ra chủ thể là gì thì phải giản lược lại.

## 1.6. Yêu cầu kỹ thuật của file

- Đặt tại `public/images/timeline/<slug>.svg`, **tên file lấy đúng trường `slug` trong `src/data/timeline.json`** — danh sách đầy đủ ở Phần 3.
- Mỗi file **dưới 15KB**. Làm gọn số thập phân của tọa độ xuống tối đa 2 chữ số.
- Mở đầu mỗi file bằng `<title>` mô tả ngắn bằng tiếng Việt, phục vụ trình đọc màn hình.
- Thêm `role="img"` trên thẻ `<svg>`.
- **Chỉ dùng tiếng Việt và tiếng Anh** trong mọi chú thích và định danh, theo đúng đoạn khóa của dự án.

## 1.7. Sửa mã để trang Lịch sử nhận file SVG

`src/pages/lich-su.astro` dòng 117 hiện đang viết cứng đuôi `.jpg`:

```
const imageSrc = `/images/timeline/${m.slug}.jpg`;
```

Sửa thành logic **ưu tiên ảnh thật, lùi về minh họa**: kiểm tại thời điểm dựng trang xem `public/images/timeline/<slug>.jpg` có tồn tại không; có thì dùng, không thì dùng `<slug>.svg`. Dùng module `node:fs` trong phần frontmatter của trang, đây là trang tĩnh nên kiểm lúc dựng là đủ.

Làm vậy thì sau này anh Vinh bỏ ảnh thật vào là ảnh tự lên thay minh họa, **không cần sửa mã lần nữa**.

---

# PHẦN 2 — QUY TRÌNH LÀM

**Chia làm 6 đợt, mỗi đợt push riêng.** Không làm cả 28 hình trong một lần.

| Đợt | Các mốc | Ghi chú |
|---|---|---|
| 1 | 5 hình đầu tiên: `peter-henlein`, `huygens-hairspring`, `breguet-tourbillon`, `rolex-oyster`, `ap-royal-oak` | **Đợt mẫu.** Năm hình này trải đều các thời kỳ và các kiểu chủ thể. Dừng lại sau đợt này để tôi duyệt phong cách trước khi làm tiếp |
| 2 | `blancpain`, `vacheron-constantin`, `breguet-naples`, `patek-first-wristwatch`, `cartier-santos` | |
| 3 | `trench-watch`, `harwood-automatic`, `rolex-perpetual`, `jlc-reverso`, `iwc-pilot` | |
| 4 | `rolex-datejust`, `fifty-fathoms`, `rolex-submariner`, `rolex-gmt`, `omega-speedmaster` | |
| 5 | `heuer-carrera`, `automatic-chronograph-race`, `seiko-astron`, `patek-nautilus` | |
| 6 | `swatch-1983`, `omega-coaxial`, `un-freak`, `silicon-revival` + sửa `lich-su.astro` theo mục 1.7 | |

Sau mỗi đợt: chạy `npm run build` xác nhận không lỗi, mở `/lich-su` kiểm trên cả máy tính lẫn điện thoại, báo lại mã commit.

---

# PHẦN 3 — BẢN MÔ TẢ TỪNG HÌNH

Mỗi mục gồm: **chủ thể chính**, **chi tiết bắt buộc có**, và **điều cần tránh**.

---

### 1. `peter-henlein` — khoảng 1510, những cỗ máy thời gian bỏ túi đầu tiên

- **Chủ thể:** một chiếc đồng hồ quả trứng kiểu Nuremberg — vỏ đồng hình trứng đứng, nắp trên bản lề đang mở hé.
- **Bắt buộc có:** mặt số chỉ có **một kim giờ duy nhất** (thời đó chưa có kim phút); vòng cọc số khắc kiểu La Mã vẽ bằng path; vòng đai vỏ có lỗ thoát tiếng; một sợi dây đeo cổ mảnh vắt qua.
- **Tránh:** vẽ thành đồng hồ bỏ túi tròn dẹt thế kỷ 19. Hình này phải toát ra sự thô mộc của đồ kim hoàn thời Phục hưng.

### 2. `huygens-hairspring` — 1657–1675, dây tóc kết hợp bánh lắc

- **Chủ thể:** cận cảnh cụm dây tóc và bánh lắc, nhìn chếch từ trên.
- **Bắt buộc có:** dây tóc xoắn ốc Archimedes đủ 12–14 vòng, khoảng cách giữa các vòng đều tuyệt đối; vành bánh lắc tròn có nan chữ thập; trục và chân kính đá; **ba cung nét mảnh mờ dần ở hai bên** gợi chuyển động dao động qua lại.
- **Tránh:** vẽ cả bộ máy. Hình này phải cô lập đúng một cơ cấu và phóng to nó.

### 3. `blancpain` — 1735, xưởng tại Villeret

- **Chủ thể:** bối cảnh, không phải sản phẩm — một căn gác xưởng thợ đồng hồ vùng Jura.
- **Bắt buộc có:** cửa sổ nhiều ô kính nhỏ chiếm phần lớn tường (thợ đồng hồ thời đó làm việc bằng ánh sáng tự nhiên); một bàn thợ với kính lúp đeo mắt và vài dụng cụ nhỏ; đường nét mái nhà dốc.
- **Tránh:** vẽ nhà máy hiện đại, vẽ logo, vẽ biển hiệu.

### 4. `vacheron-constantin` — 1755, xưởng tại Geneva

- **Chủ thể:** bàn tay thợ cả đang hướng dẫn, đặt trên một bản hợp đồng học nghề trải mở.
- **Bắt buộc có:** tờ giấy có nếp gấp và các dòng kẻ gợi chữ viết tay (**vẽ bằng nét lượn, không dùng chữ thật**); một chiếc bút lông ngỗng; vài bánh răng nhỏ đặt cạnh.
- **Tránh:** vẽ chân dung có khuôn mặt. Cả bộ hình này không có gương mặt người nào.

### 5. `breguet-tourbillon` — 1795, sáng chế tourbillon

- **Chủ thể:** lồng tourbillon nhìn chính diện, tách khỏi bộ máy.
- **Bắt buộc có:** lồng thép ba nan cong đặc trưng; bánh lắc nằm trong lồng; bánh thoát và ngựa; **một mũi tên cong quanh lồng** chỉ chiều xoay; cầu máy phía trên có đầu vát.
- **Tránh:** vẽ lồng nhiều trục kiểu hiện đại. Đây là tourbillon một trục nguyên bản.

### 6. `breguet-naples` — 1810, chiếc đồng hồ đeo tay đầu tiên

- **Chủ thể:** một chiếc đồng hồ vỏ ô-van dẹt gắn trên dây quấn cổ tay bện từ tóc và sợi vàng.
- **Bắt buộc có:** dáng vỏ ô-van kéo dài rõ rệt; mặt số kiểu Breguet với **cọc số Ả Rập mảnh vẽ bằng path** và nền guilloché vẽ bằng gạch chéo; kim đầu rỗng hình quả táo.
- **Tránh:** vẽ thành đồng hồ đeo tay tròn hiện đại. Điểm nhấn của hình này là sự lạ mắt của vật thể.

### 7. `patek-first-wristwatch` — 1868, đồng hồ đeo tay đầu tiên của Patek Philippe

- **Chủ thể:** một chiếc đồng hồ đeo tay dạng trang sức dành cho nữ, vỏ nhỏ nạm đá.
- **Bắt buộc có:** vỏ chữ nhật nhỏ; vòng đeo dạng lắc kim loại bản to có hoa văn; các viên đá vẽ thành hình kim cương nhiều mặt cắt bằng nét.
- **Tránh:** vẽ đồng hồ nam cỡ lớn. Mốc này quan trọng vì đồng hồ đeo tay khi đó **là đồ trang sức của phụ nữ** — hình phải nói được điều đó.

### 8. `cartier-santos` — 1904, Cartier Santos

- **Chủ thể:** vỏ vuông bo góc với các ốc vít lộ trên vành, đặt trước một cánh máy bay hai tầng cánh vẽ mờ ở nền.
- **Bắt buộc có:** hình vuông bo góc rõ; **tám con ốc lộ** trên vành; dây da có khóa; cánh máy bay chỉ vẽ bằng nét mảnh ở opacity thấp làm bối cảnh.
- **Tránh:** vẽ mặt số chi tiết tới mức thành bản sao sản phẩm hiện hành. Giữ mặt số tối giản.

### 9. `trench-watch` — 1914–1918, đồng hồ chiến hào

- **Chủ thể:** một chiếc đồng hồ bỏ túi được hàn thêm hai quai để đeo tay, có lồng lưới bảo vệ mặt kính.
- **Bắt buộc có:** hai quai hàn thô, thấy rõ mối hàn; lồng lưới kim loại che mặt số; dây vải bạt; mặt số có **cọc số dạ quang vẽ thành chấm tròn nhỏ**.
- **Tránh:** vẽ cảnh chiến tranh, vũ khí, hay bất cứ thứ gì gợi bạo lực. Chỉ vẽ vật thể.

### 10. `harwood-automatic` — 1923, cơ chế tự động lên cót

- **Chủ thể:** sơ đồ cắt lớp cơ cấu lên cót bằng con lắc lắc lư.
- **Bắt buộc có:** khối con lắc hình quạt **chỉ quét được nửa vòng** (đây là điểm khác biệt then chốt với rotor xoay tròn ở mốc 1931); hai chốt chặn ở hai đầu hành trình; cung mũi tên hai chiều; thùng cót nối vào.
- **Tránh:** vẽ rotor xoay tròn 360 độ. Hai mốc 1923 và 1931 phải **nhìn là thấy khác nhau ngay**.

### 11. `rolex-oyster` — 1926, vỏ chống nước đầu tiên

- **Chủ thể:** mặt cắt dọc của vỏ đồng hồ, thấy rõ cơ cấu vặn ren.
- **Bắt buộc có:** đường ren vẽ rõ ở **cả ba chỗ**: núm vặn, nắp lưng và vành; các vòng đệm kín vẽ thành nét đậm; **vài nét nước cong ở nền** gợi môi trường ngập.
- **Tránh:** vẽ vỏ nhìn từ ngoài. Sức mạnh của hình này nằm ở chỗ nó cho thấy bên trong.

### 12. `rolex-perpetual` — 1931, rotor xoay tròn 360 độ

- **Chủ thể:** rotor bán nguyệt nhìn từ mặt lưng bộ máy.
- **Bắt buộc có:** rotor hình bán nguyệt gắn trục giữa; **cung mũi tên tròn đủ 360 độ** bao quanh; bánh răng đảo chiều; cầu máy có gạch trang trí Genève vẽ bằng nét mảnh song song.
- **Tránh:** vẽ giống mốc 1923. Điểm phân biệt là vòng tròn khép kín so với cung nửa vòng.

### 13. `jlc-reverso` — 1931, Jaeger-LeCoultre Reverso

- **Chủ thể:** vỏ chữ nhật đang trong **trạng thái lật dở** — một nửa đã xoay, một nửa còn trên khung trượt.
- **Bắt buộc có:** ba đường gờ ngang ở đầu và cuối vỏ; khung trượt và trục xoay vẽ rõ; **cung mũi tên chỉ chuyển động lật**; mặt sau để trơn.
- **Tránh:** vẽ vỏ nằm phẳng. Toàn bộ ý nghĩa của mẫu này nằm ở động tác lật.

### 14. `iwc-pilot` — 1936, dòng đồng hồ phi công

- **Chủ thể:** mặt số phi công cỡ lớn với núm vặn hình củ hành.
- **Bắt buộc có:** **tam giác định hướng ở vị trí 12 giờ có hai chấm hai bên**; cọc số Ả Rập cỡ lớn vẽ bằng path; kim kiếm; núm vặn to để vặn được khi đeo găng; vòng phút chia vạch rõ.
- **Tránh:** vẽ logo, vẽ chữ trên mặt số.

### 15. `rolex-datejust` — 1945, lịch ngày tự nhảy

- **Chủ thể:** cận cảnh ô cửa sổ ngày trên mặt số, có kính lúp hình vòm phía trên.
- **Bắt buộc có:** khối kính lúp vẽ thành hình vòm nổi rõ, có nét phản chiếu; **đĩa ngày bên dưới đang xoay dở**, thấy nửa con số trước và nửa con số sau (vẽ bằng path); vành khía quanh mép.
- **Tránh:** vẽ cả chiếc đồng hồ. Đây là hình cận cảnh một chi tiết.

### 16. `fifty-fathoms` — 1953, đồng hồ lặn hiện đại đầu tiên

- **Chủ thể:** mặt số lặn với vành xoay một chiều, đặt trong khung cảnh dưới nước.
- **Bắt buộc có:** vành xoay chia vạch phút có **chấm tam giác ở mốc 0**; kim và cọc số dạ quang bản to; **các bọt khí nhỏ dần khi lên cao** ở nền; vài nét sóng ngang mờ.
- **Tránh:** vẽ vành xoay hai chiều — điểm an toàn cốt lõi của đồng hồ lặn là vành **chỉ xoay được một chiều**.

### 17. `rolex-submariner` — 1953–54, Explorer và Submariner

- **Chủ thể:** hai chiếc đồng hồ đặt cạnh nhau, một chiếc hơi chếch sau.
- **Bắt buộc có:** chiếc trước có vành xoay lặn; chiếc sau có mặt số ba kim tối giản với **cọc số 3, 6, 9 vẽ bằng path**; đường phân biệt rõ giữa hai kiểu dây.
- **Tránh:** vẽ hai chiếc giống hệt nhau. Mốc này nói về **hai hướng đi tách ra cùng lúc**.

### 18. `rolex-gmt` — 1954, kim 24 giờ

- **Chủ thể:** mặt số có hai kim giờ và vành 24 giờ.
- **Bắt buộc có:** vành chia **24 vạch**, nửa vành gạch dày đặc và nửa vành để trống, phân biệt ngày và đêm; **kim GMT có đầu hình tam giác rỗng**, khác hẳn kim giờ thường; hai kim chỉ về hai hướng khác nhau.
- **Tránh:** tô hai màu cho vành — ta chỉ có ba màu, dùng mật độ gạch để phân biệt ngày đêm.

### 19. `omega-speedmaster` — 1957, Omega Speedmaster

- **Chủ thể:** chronograph ba mắt phụ, đặt trước một vành trăng khuyết vẽ mờ ở nền.
- **Bắt buộc có:** **ba mắt phụ tròn** bố trí đối xứng; hai nút bấm hai bên núm vặn; **vành ngoài có thang tachymeter vẽ bằng vạch chia thưa dần** theo đúng quy luật thật; vành trăng ở nền chỉ vẽ bằng nét mảnh opacity thấp.
- **Tránh:** vẽ phi hành gia, vẽ tàu vũ trụ. Giữ hình ở mức tiết chế.

### 20. `heuer-carrera` — 1963, Heuer Carrera

- **Chủ thể:** chronograph mặt số sạch với vòng phút nghiêng ở rìa ngoài.
- **Bắt buộc có:** **vòng chia phút đặt trên phần vát nghiêng của mặt số** — đây là ý tưởng cốt lõi của mẫu này, giúp đọc nhanh khi đang lái; hai mắt phụ; kim mảnh dài; nền phía sau có **hai đường cong gợi khúc cua đường đua**.
- **Tránh:** vẽ xe đua. Chỉ gợi bằng hai đường cong trừu tượng.

### 21. `automatic-chronograph-race` — 1969, cuộc đua chronograph tự động

- **Chủ thể:** **ba bộ máy cách điệu chạy song song** như ba vận động viên trên đường chạy.
- **Bắt buộc có:** ba cụm hình tròn kích thước bằng nhau, đặt lệch nhau theo phương ngang; mỗi cụm có một chi tiết nhận diện riêng (một bánh xe cột, một rotor, một cụm mô đun); **ba vạch đích thẳng đứng ở bên phải**.
- **Tránh:** làm một cụm nổi bật hơn hai cụm kia. Mốc này nói ba dự án **về đích cùng năm** — hình phải giữ thế cân bằng.

### 22. `seiko-astron` — 1969, đồng hồ quartz thương mại đầu tiên

- **Chủ thể:** một tinh thể thạch anh hình âm thoa, đặt cạnh mặt số.
- **Bắt buộc có:** **hình âm thoa hai nhánh** rõ ràng (đây là hình dạng thật của tinh thể dao động); các đường sóng phát ra từ nó; **kim giây vẽ ở ba vị trí rời rạc**, không liên tục, để nói lên bước nhảy từng giây khác với chuyển động trôi của đồng hồ cơ.
- **Tránh:** vẽ mạch điện tử phức tạp. Giữ tối giản, đối lập hẳn với các hình cơ khí xung quanh.

### 23. `ap-royal-oak` — 1972, Audemars Piguet Royal Oak

- **Chủ thể:** vành bát giác nhìn chính diện, dây liền vỏ thu dần.
- **Bắt buộc có:** **hình bát giác đều tám cạnh**; **tám con ốc lộ** đặt đúng các góc; mặt số có **hoa văn ô vuông nhỏ đều nhau** vẽ bằng lưới nét mảnh; các mắt dây thu nhỏ dần khi ra xa vỏ.
- **Tránh:** vẽ quá chi tiết tới mức thành bản vẽ kỹ thuật của sản phẩm đang bán. Giữ ở mức đồ họa, cách điệu.

### 24. `patek-nautilus` — 1976, Patek Philippe Nautilus

- **Chủ thể:** vỏ dáng cửa sổ tàu thủy với hai "tai" bản lề hai bên.
- **Bắt buộc có:** dáng vỏ tròn bo trong khung chữ nhật; **hai chi tiết bản lề nhô ra hai bên** — đây là điểm nhận diện gốc, lấy ý từ cửa sổ khoang tàu; mặt số có **các đường gân ngang song song**; dây liền vỏ.
- **Tránh:** vẽ giống hình bát giác của mốc 1972. Hai mốc này cạnh nhau trên timeline nên phải phân biệt được ngay.

### 25. `swatch-1983` — 1983, Swatch ra đời

- **Chủ thể:** một chiếc đồng hồ nhựa mỏng nhìn xuyên thấu, thấy được ít chi tiết bên trong.
- **Bắt buộc có:** đường bao đơn giản gợi vỏ nhựa; **rất ít chi tiết bên trong** — chỉ vài bánh răng — để nói lên việc giảm số linh kiện xuống mức tối thiểu; nét vẽ **cố ý phóng khoáng hơn** các hình khác, mang tinh thần vui vẻ.
- **Tránh:** vẽ hoa văn sặc sỡ. Ta chỉ có ba màu; thể hiện sự vui tươi bằng nhịp nét, không bằng màu.

### 26. `omega-coaxial` — 1999, bộ thoát Co-Axial

- **Chủ thể:** sơ đồ bộ thoát đồng trục, phóng to.
- **Bắt buộc có:** **hai bánh thoát xếp chồng đồng trục** — đây là điểm khác biệt cốt lõi so với bộ thoát Thụy Sĩ thường; ba viên đá trên ngựa; mũi tên chỉ hướng truyền lực; **một khung nhỏ ở góc vẽ bộ thoát truyền thống một tầng để đối chiếu**.
- **Tránh:** vẽ sai số tầng. Chi tiết "đồng trục" chính là toàn bộ nội dung của mốc này.

### 27. `un-freak` — 2001, Ulysse Nardin Freak và kỷ nguyên silicon

- **Chủ thể:** bộ máy dạng băng chuyền xoay nằm ngay trên mặt số, **không có kim, không có núm vặn**.
- **Bắt buộc có:** cầu máy dài nằm ngang đóng vai trò kim chỉ phút; bánh răng lộ hoàn toàn; **một chi tiết vẽ bằng nét mảnh hơn hẳn phần còn lại** để gợi linh kiện silicon; vành ngoài trơn không núm.
- **Tránh:** vẽ kim giờ và kim phút thông thường. Chiếc đồng hồ này nổi tiếng chính vì **không có** chúng.

### 28. `silicon-revival` — 2013 đến nay, silicon phổ cập

- **Chủ thể:** một dây tóc silicon nhìn cận, có cấu trúc hình học đều tuyệt đối.
- **Bắt buộc có:** vòng xoắn ốc với **các cạnh sắc, góc vuông vức** thay vì đường cong mềm của dây tóc thép; **hoa văn lưới tinh thể mảnh phủ trên bề mặt**; vài dây tóc thép truyền thống vẽ mờ ở nền để đối chiếu.
- **Tránh:** vẽ giống hệt hình số 2 (`huygens-hairspring`). Hai hình này là hai đầu của cùng một câu chuyện kéo dài 350 năm — phải **cùng chủ đề nhưng khác chất liệu rõ rệt**: hình số 2 mềm và hữu cơ, hình này sắc và hình học.

---

# PHẦN 4 — NGHIỆM THU MỖI ĐỢT

- [ ] Mỗi file dưới 15KB, đặt đúng tại `public/images/timeline/<slug>.svg`, tên khớp tuyệt đối với trường `slug` trong `timeline.json`.
- [ ] Chỉ dùng ba màu đã quy định, không có màu thứ tư, không chuyển sắc, không đổ bóng.
- [ ] Không có thẻ `<text>` trong bất kỳ file nào.
- [ ] Không có logo, chữ ký thương hiệu hay chữ viết của bất kỳ hãng nào.
- [ ] Mỗi file có `<title>` tiếng Việt và thuộc tính `role="img"`.
- [ ] Định danh `id` của hoa văn nền khác nhau giữa các file.
- [ ] **Thu nhỏ xuống 320px chiều ngang vẫn đọc ra chủ thể.**
- [ ] Xem cả 28 hình (hoặc các hình đã làm) cạnh nhau: **trông như một bộ, không phải hình rời rạc.**
- [ ] Các cặp hình dễ lẫn đã phân biệt rõ: 1923 với 1931, 1972 với 1976, hình số 2 với hình số 28.
- [ ] `npm run build` không lỗi; mở `/lich-su` kiểm cả máy tính lẫn điện thoại, cả chế độ sáng lẫn tối.

---

# PHẦN 5 — ĐOẠN KHÓA

> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. Riêng đợt này bổ sung ba điều:
>
> 1. **Không sao chép mã SVG từ bất kỳ nguồn nào trên mạng.** Toàn bộ phải do anh tự dựng từ mô tả trong tài liệu này. Nếu có tham khảo hình mẫu để hiểu hình dáng vật thể, đó là để hiểu, không phải để chép.
> 2. **Không vẽ logo, chữ ký hay tên thương hiệu.**
> 3. **Làm và push từng đợt một.** Dừng lại sau đợt 1 chờ duyệt phong cách rồi mới làm tiếp — nếu phong cách lệch thì sửa 5 hình dễ hơn sửa 28 hình.
