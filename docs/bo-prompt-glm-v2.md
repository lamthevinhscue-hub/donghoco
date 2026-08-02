# BỘ PROMPT GIAO GLM 5.2 — BẢN 2 (đồng bộ hiện trạng thực tế)

**Cập nhật:** 02/08/2026
**Thay thế cho:** `docs/bo-prompt-glm-phan-con-lai.md` (bản 1 — đã lỗi thời ở nhiều mục)
**Căn cứ:** Kiểm kê trực tiếp mã nguồn tại commit `4d120dd`, xem `docs/MUC-A-KIEM-KE-HIEN-TRANG.md`

---

## Cách dùng tài liệu này

Mỗi mục là **một phiên làm việc độc lập**. Dán nguyên khối trong ô trích dẫn, không gộp nhiều mục vào một lần. Sau mỗi mục, kiểm theo phần "Nghiệm thu" rồi mới sang mục kế tiếp.

### Đoạn khóa bắt buộc — dán vào cuối MỌI prompt gửi GLM

> **Ràng buộc chung:**
>
> 1. Tuân thủ `CONTENT-GUIDE.md`.
> 2. **Chỉ dùng ký tự tiếng Việt và tiếng Anh.** Tuyệt đối không để lọt ký tự Kirin, Ả Rập, Trung, Nhật, Hàn hay bất kỳ hệ chữ nào khác. Trước khi push, tự quét lại toàn bộ file vừa sửa để xác nhận.
> 3. Không đưa tên bước, số giai đoạn hay ghi chú quy trình vào giao diện người dùng.
> 4. **Không tự bịa dữ kiện.** Mọi năm, tên calibre, thông số kỹ thuật nếu không chắc chắn thì **bỏ hẳn** và ghi vào `CAN-KIEM-CHUNG.md` ở gốc repo (tạo file nếu chưa có), tuyệt đối không đoán.
> 5. **Không đặt `custom_slug` khác tên file.** Địa chỉ trang được sinh từ **tên file**, nên `custom_slug` lệch sẽ tạo link chết. Nếu cần đổi địa chỉ, hãy đổi tên file.
> 6. Chỉ sửa đúng phạm vi được giao, không đụng phần khác.
> 7. Xong việc: chạy `npm run build` xác nhận thành công, **tự kiểm lại toàn bộ link nội bộ trong file vừa sửa có trỏ đúng địa chỉ tồn tại không**, liệt kê file đã sửa kèm số dòng, push lên nhánh `main` và báo lại mã commit.

---

## TRẠNG THÁI NỀN (đã kiểm chứng bằng mã nguồn)

- Repo `lamthevinhscue-hub/donghoco`, nhánh `main`, deploy Vercel dự án `donghoco1` — đường ống hoạt động bình thường.
- 76 trang được dựng. 24 thương hiệu, 16 mẫu iconic, 6 bài cơ chế, 14 thuật ngữ, 4 hướng dẫn.
- 0 ảnh thật trong `public/images/`.
- 10 link nội bộ đang 404.
- 0/8 tính năng nền tảng (tìm kiếm, dark mode, so sánh, sitemap, structured data, ảnh OG, newsletter, analytics).

---

## ĐÃ HOÀN THÀNH — KHÔNG LÀM LẠI

| Hạng mục | Trạng thái |
|---|---|
| Bước 0.2 — hệ thống ảnh + component `WatchImage` | Xong |
| Bước 0.3 — `CONTENT-GUIDE.md` | Xong (còn thiếu mục "Quy tắc chống sai sót" — xem Mục G1) |
| Bước 1.1 — timeline 28 mốc `/lich-su` | Xong |
| Bước 1.2 — infographic Bộ thoát | Xong |
| Bước 1.3 — 5 infographic tương tác (Chronograph, Tourbillon, Dây tóc, GMT, Lịch vạn niên) | Xong — đang chạy ở `/tu-dien` |
| Bước 1.4 — Giải phẫu 12 bộ phận `/giai-phau` | Xong |
| Bước 2.1 — template thương hiệu 5 khối (`BrandLayout.astro`) | Xong |
| Bước 2.2 — nâng cấp 10/24 thương hiệu | Xong 10 hãng, còn 14 |
| Bộ lọc phân hạng `/thuong-hieu` | Xong |
| Mục A (bản 1) — kiểm kê hiện trạng | Xong, có `BAO-CAO-RA-SOAT.md` |
| Mục B1 — 4 điểm trang `/lich-su` | Xong |
| Mục B2 — tên hạng tiếng Việt, mô tả Haute, nhãn Dufour | Xong điểm 1–3, **còn điểm 4** |
| Mục B3 — sửa số liệu trang A. Lange | Xong, **còn sót 1 điểm** (xem Mục B5) |
| Mục B4 — rà soát đồng loạt toàn site | Làm một phần, **còn sót** (xem Mục B5) |
| Mục D1 — nâng cấp TAG Heuer, Ulysse Nardin, Rolex | Xong |

**Lưu ý về `BAO-CAO-RA-SOAT.md`:** báo cáo GLM tự làm kết luận "0 link 404" và không phát hiện các ký tự ngoại lai còn sót. Cả hai kết luận đó **sai**. Mục A0 dưới đây xử lý phần bị bỏ lọt.

---

# MỤC A0 — SỬA GẤP (làm đầu tiên, một phiên duy nhất)

Toàn bộ đều là lỗi đang hiển thị công khai hoặc chặn các bước sau. Ước tính dưới một giờ.

> Sửa 7 nhóm lỗi sau. Mỗi nhóm báo lại rõ file nào, dòng nào, sửa thành gì.
>
> **1. Ký tự ngoài tiếng Việt và tiếng Anh — 4 vị trí còn sót**
>
> | File | Dòng | Lỗi | Sửa thành |
> |---|---|---|---|
> | `CONTENT-GUIDE.md` | 36 | `vành кольệp` (chữ Kirin) | `vành kim loại` |
> | `src/content/tuDien/vi/bezel.md` | 4 và 11 | `vành кольệp` (chữ Kirin) | `vành kim loại` |
> | `src/content/thuongHieu/vi/a-lange-soehne.md` | 31 | `đúng ngày компании ông nội ra đời` (chữ Kirin) | `đúng ngày hãng của ông nội ra đời` |
> | `src/components/infographics/glossary/Chronograph.astro` | 353 | `các cột phải دقی chính xác` (chữ Ả Rập) | `các cột phải gia công chính xác` |
>
> Sau khi sửa xong, chạy một lượt quét toàn repo (`src/`, các file `.md` ở gốc) để xác nhận không còn ký tự nào ngoài bảng chữ Latin, chữ Việt có dấu, dấu câu, mũi tên và biểu tượng. Báo lại kết quả quét.
>
> **2. Link 404 trên trang Blancpain**
>
> File `src/content/thuongHieu/vi/blancpain.md`, dòng 65: `slug: "glashutte-original"` → sửa thành `slug: "glashuette-original"` (đúng theo tên file `glashuette-original.md`).
>
> **3. Ba `custom_slug` lệch tên file — xóa hẳn**
>
> Trường `custom_slug` hiện không được `getStaticPaths` dùng tới, nên khai lệch chỉ gây nhầm lẫn và sinh link chết. Xóa dòng `custom_slug` ở ba file sau:
>
> - `src/content/thuongHieu/vi/a-lange-soehne.md` (đang ghi `a-lange-sohne`)
> - `src/content/thuongHieu/vi/glashuette-original.md` (đang ghi `glashutte-original`)
> - `src/content/coChe/vi/chuyen-dong-co.md` (đang ghi `chuoi-truyen-dong`)
>
> **4. Ẩn hẳn trang tiếng Anh `/en`**
>
> Trang `/en` hiện dựng ra 9 link menu trỏ tới các trang tiếng Anh không tồn tại (`/en/thuong-hieu`, `/en/co-che`, `/en/lich-su`, `/en/tu-dien`, `/en/mau-iconic`, `/en/giai-phau`, `/en/huong-dan`, `/en/ve-chung-toi`, `/en/lien-he`) — toàn bộ đều 404. Xử lý:
>
> - Xóa file `src/pages/en/index.astro`.
> - Xóa khối nút chuyển ngôn ngữ đang bị chú thích trong `src/components/Header.astro` (dòng 51–62) cùng biến `langSwitchUrl`, `langSwitchLabel` không còn dùng.
> - Trong `vercel.json`, thêm chuyển hướng `/en` và `/en/(.*)` về `/` để các link cũ không rơi vào trang lỗi.
> - **Giữ nguyên** `i18n` trong `astro.config.mjs` và toàn bộ hạ tầng đa ngôn ngữ trong `src/i18n/ui.ts` — chỉ ẩn lối vào, không gỡ nền tảng, để sau này bật lại dễ.
>
> **5. Trang IWC mất khối "Mẫu iconic liên quan"**
>
> Bài `src/content/mauIconic/vi/iwc-mark-xi.md` ghi `brand: "IWC"`, còn `src/content/thuongHieu/vi/iwc.md` ghi `title: "IWC Schaffhausen"`. Hàm so khớp ở `src/pages/thuong-hieu/[slug].astro` yêu cầu trùng khít nên không nhận ra nhau, khiến trang IWC hiện dòng "Chưa có mẫu iconic nào".
>
> Sửa `iwc-mark-xi.md` thành `brand: "IWC Schaffhausen"`. Sau đó rà toàn bộ 16 file trong `src/content/mauIconic/vi/`, đối chiếu trường `brand` với `title` của 24 file trong `src/content/thuongHieu/vi/` — liệt kê mọi cặp còn lệch và sửa cho khớp.
>
> **6. Nhãn phân hạng ở trang chi tiết chưa đồng bộ với trang danh sách**
>
> `src/layouts/BrandLayout.astro` dòng 42–51 đang tự khai một bảng `tierLabels` riêng với các nhãn cũ ("Ultra Luxury (siêu sang)", "High-End Luxury (sang trọng cao cấp)"…), trong khi `src/i18n/ui.ts` đã có `getTierLabel()` với nhãn tiếng Việt mới ("Xa xỉ đỉnh cao", "Cao cấp"…). Kết quả: cùng một hãng, trang danh sách và trang chi tiết gọi tên phân hạng khác nhau.
>
> Xóa bảng `tierLabels` cục bộ trong `BrandLayout.astro`, thay bằng `getTierLabel(data.tier, lang)` nhập từ `../i18n/ui`.
>
> Đồng thời sửa `src/pages/thuong-hieu/[slug].astro` dòng 45: biến `meta` đang nối thẳng `data.tier` (giá trị thô như "ultra luxury") — đổi sang `getTierLabel(data.tier, lang)`.
>
> **7. Tên riêng thiếu dấu và cấu hình còn để mẫu**
>
> - `src/content/thuongHieu/vi/frederique-constant.md`: `title: "Frederique Constant"` → `title: "Frédérique Constant"`. Rà cả nội dung bài và mọi nơi khác trên site nhắc tới hãng này.
> - `astro.config.mjs`: `site: 'https://dong-ho-co.example'` → `site: 'https://donghoco1.vercel.app'`. Bắt buộc sửa trước khi làm sitemap, ảnh OG và structured data — cả ba đều lấy địa chỉ gốc từ đây.
> - `package.json`: gỡ dependency `gsap` (đã cài nhưng không file nào trong `src/` dùng tới). Chạy lại `npm install` và xác nhận build vẫn thành công.

**Nghiệm thu Mục A0:**

- Quét toàn repo không còn ký tự ngoài tiếng Việt và tiếng Anh.
- Mở `/thuong-hieu/blancpain`, bấm cột "Glashütte Original" trong bảng đối chiếu → vào đúng trang, không lỗi.
- Mở `/thuong-hieu/iwc` → thấy khối "Mẫu iconic của IWC Schaffhausen" có thẻ IWC Mark XI.
- Mở `/thuong-hieu` rồi bấm vào một hãng bất kỳ → tên phân hạng ở hai trang giống hệt nhau.
- Vào `/en` → chuyển hướng về trang chủ.
- `npm run build` thành công.

---

# MỤC B5 — DỌN NỐT PHẦN RÀ SOÁT CÒN SÓT

Vòng B3 và B4 đã làm phần lớn nhưng còn sót ở phần thân bài (chỉ sửa frontmatter). Đây là các trường hợp cụ thể đã xác định được — không phải quét lại từ đầu.

> Sửa các điểm sau, mỗi điểm báo lại file, dòng, nội dung cũ và mới:
>
> **1. Lỗi thời đại — "Đông Đức"**
>
> | File | Dòng | Vấn đề | Hướng sửa |
> |---|---|---|---|
> | `thuongHieu/vi/a-lange-soehne.md` | 105 | Thân bài vẫn ghi *"vùng Erzgebirge, đông Đức"* cho mốc 1845 — năm 1845 chưa tồn tại khái niệm Đông Đức | *"vùng núi Erzgebirge thuộc Sachsen, miền đông nước Đức"* (đồng bộ với dòng 16 đã sửa đúng) |
> | `thuongHieu/vi/blancpain.md` | 66 | Cột đối chiếu mô tả Glashütte Original là *"Đại diện xuất sắc Đông Đức"* — hãng thành lập 1994, sau khi Đông Đức không còn tồn tại | *"Đại diện xuất sắc của chế tác Đức vùng Glashütte"* |
> | `thuongHieu/vi/glashuette-original.md` | 4 | Phần tóm tắt ghi *"chế tác Đông Đức"* — sai thời đại tương tự, lại còn lẫn chữ `movement` và `plate` giữa câu tiếng Việt | *"chế tác Đức vùng Glashütte — mặt số và bộ máy (movement) đẹp độc đáo, với bản đĩa ba phần tư (three-quarter plate) đặc trưng"* |
>
> Riêng `glashuette-original.md` dòng 16 nhắc "dưới chế độ Đông Đức" cho giai đoạn sau 1945 — **đúng, giữ nguyên**.
>
> **2. Danh xưng "lâu đời nhất" dùng sai**
>
> Quy tắc: chỉ Blancpain được gọi là *"thương hiệu đồng hồ lâu đời nhất (1735)"*; chỉ Vacheron Constantin được gọi là *"nhà chế tác hoạt động liên tục lâu đời nhất (1755)"*.
>
> - `mauIconic/vi/zenith-el-primero.md` dòng 50: *"một trong những movement lâu đời nhất thế giới vẫn được sản xuất"* → *"một trong những bộ máy chronograph lâu đời nhất vẫn còn được sản xuất"*. Câu này còn hai lỗi khác: chữ `movement` đứng một mình giữa câu tiếng Việt, và cụm *"55 năm và vẫn counting"* lẫn tiếng Anh — sửa thành *"và vẫn đang tiếp tục"*. **Bỏ hẳn con số năm** nếu không kiểm chứng được (El Primero ra mắt 1969, tính đến 2026 là 57 năm, không phải 55).
> - `thuongHieu/vi/longines.md` dòng 16: cụm *"logo lâu đời nhất thế giới vẫn còn nguyên hình dáng (1867)"* — **năm này cần kiểm chứng**, nguồn phổ biến ghi thương hiệu Longines được đăng ký năm 1889. Nếu không chắc, bỏ hẳn con số và ghi vào `CAN-KIEM-CHUNG.md`.
>
> **3. Số liệu mâu thuẫn trong cùng một trang**
>
> `thuongHieu/vi/vacheron-constantin.md`: dòng 92 ghi *"271 năm liên tục"*, dòng 97 ghi *"(270 năm)"*. Bỏ hẳn con số ở cả hai chỗ, chỉ giữ năm thành lập 1755 — vì số năm sẽ tự sai theo thời gian. Rà toàn site tìm các cụm "X năm" tính từ năm thành lập và xử lý tương tự.
>
> **4. Còn lẫn tiếng Anh giữa câu tiếng Việt**
>
> `thuongHieu/vi/audemars-piguet.md` dòng 92: cụm *"'attitude'"* đứng một mình → Việt hóa thành *"khí chất"*. Cùng dòng có lỗi thừa dấu cách: `' Royal Oak đeo 50 năm` → `'Royal Oak đeo 50 năm`.
>
> Sau đó quét lại toàn bộ `src/content/` tìm các từ tiếng Anh đứng đơn lẻ giữa câu tiếng Việt (không nằm trong ngoặc đơn sau từ tiếng Việt tương ứng) và Việt hóa. Chú ý các từ hay lọt: `movement`, `bridge`, `plate`, `retail`, `secondary`, `counting`, `attitude`, `crown jewel`, `in-house`.
>
> **5. Mục B2 điểm 4 — chưa làm**
>
> Rà lại toàn bộ 24 thẻ ở trang `/thuong-hieu`: năm thành lập và phân hạng hiển thị trên thẻ có khớp với nội dung bên trong trang chi tiết không? Liệt kê mọi trường hợp lệch, sửa theo trang chi tiết.
>
> **6. Xuất báo cáo**
>
> Ghi toàn bộ kết quả ra file `RA-SOAT-DOT-2.md` ở gốc repo: mỗi dòng ghi file nào, dòng nào, nội dung cũ, nội dung mới. Đồng thời cập nhật lại `BROKEN-LINKS.md` theo kết quả rà link mới nhất — file hiện tại đang kết luận sai là "0 link hỏng".

**Nghiệm thu Mục B5:** Có `RA-SOAT-DOT-2.md`; `BROKEN-LINKS.md` đã cập nhật; `CAN-KIEM-CHUNG.md` liệt kê các con số bị gỡ để anh kiểm.

---

# MỤC G — CHỐT HAI FILE NỀN

Chạy ngay sau B5, nhằm ngăn lỗi tái diễn ở các mục sau.

## G1. Siết chặt `CONTENT-GUIDE.md`

> Cập nhật `CONTENT-GUIDE.md`, bổ sung mục **"Quy tắc chống sai sót"** gồm:
>
> - **Danh xưng độc quyền:** Blancpain = thương hiệu đồng hồ lâu đời nhất (1735); Vacheron Constantin = nhà chế tác hoạt động liên tục lâu đời nhất (1755). Không hãng nào khác được dùng cụm "lâu đời nhất thế giới".
> - **Ký tự:** chỉ dùng tiếng Việt và tiếng Anh. Không để lọt bất kỳ hệ chữ nào khác. Kiểm lại trước mỗi lần push.
> - **Thuật ngữ tiếng Anh** chỉ được đặt trong ngoặc đơn sau từ tiếng Việt, không đứng một mình giữa câu.
> - **Không dùng bội số giá thị trường thứ cấp**; chỉ mô tả định tính (giữ giá rất tốt / tốt / trung bình).
> - **Không viết số năm tính từ mốc lịch sử** (kiểu "270 năm lịch sử") vì sẽ tự sai theo thời gian — chỉ ghi năm mốc.
> - **Mọi năm, tên calibre, thông số kỹ thuật phải truy được về nguồn**; không chắc thì bỏ và ghi vào `CAN-KIEM-CHUNG.md`.
> - **Tên riêng giữ nguyên dấu:** Gérald Genta, A. Lange & Söhne, Glashütte, Vallée de Joux, Métiers d'Art, Frédérique Constant.
> - **Tên địa danh và quốc gia phải đúng với thời điểm được nhắc tới** (không dùng "Đông Đức" cho mốc trước 1949 hay sau 1990, không dùng "Liên bang Nga" cho mốc trước 1991).
> - **Quy ước địa chỉ trang:** địa chỉ sinh từ tên file. Không đặt `custom_slug` khác tên file.
> - **Tên hãng phải thống nhất tuyệt đối** giữa `title` của bài thương hiệu và trường `brand` của bài mẫu iconic — lệch một ký tự là khối "Mẫu iconic liên quan" biến mất.
> - Không đưa tên bước, số giai đoạn, ghi chú quy trình vào giao diện.
>
> Trong khi cập nhật, sửa luôn lỗi chữ Kirin ở dòng 36 nếu Mục A0 chưa xử lý.

## G2. Cập nhật `IMAGE-MANIFEST.md`

> Quét lại toàn site, cập nhật `IMAGE-MANIFEST.md` thành một bảng duy nhất gồm các cột: **đường dẫn file | thương hiệu hoặc mẫu tương ứng | kích thước đề nghị | trang hiển thị | trạng thái (đã có ảnh / đang placeholder) | đã có chỗ hiển thị chưa**.
>
> Cột cuối rất quan trọng: hiện `IMAGE-MANIFEST.md` liệt kê 24 cặp `logo.png` + `hero.jpg` cho thương hiệu, nhưng **giao diện chưa có chỗ nào render chúng** — anh Vinh có bỏ ảnh vào cũng không hiện. Đánh dấu rõ nhóm này để biết cần dựng giao diện trước.
>
> Sắp xếp các dòng còn thiếu ảnh lên đầu.

---

# MỤC C — BÀI CƠ CHẾ CÒN THIẾU (đã rút gọn khối lượng)

**Đọc kỹ trước khi giao:** khác với bản 1, **toàn bộ 5 hoạt ảnh tương tác đã dựng xong** từ Bước 1.3 và đang chạy ở trang Từ điển. Không dựng lại từ đầu.

| Cơ chế | Component đã có | Đang chạy tại |
|---|---|---|
| Chronograph | `infographics/glossary/Chronograph.astro` | `/tu-dien/chronograph` |
| Tourbillon | `infographics/glossary/Tourbillon.astro` | `/tu-dien/tourbillon` |
| Dây tóc và bánh lắc | `infographics/glossary/Hairspring.astro` | `/tu-dien/day-toc-banh-lac` |
| GMT | `infographics/glossary/GMT.astro` | `/tu-dien/gmt` |
| Lịch vạn niên | `infographics/glossary/PerpetualCalendar.astro` | `/tu-dien/perpetual-calendar` |

Làm **lần lượt từng bài, mỗi phiên một bài**. Thứ tự đề nghị: Chronograph → Tourbillon → Dây tóc và bánh lắc → GMT → Lịch vạn niên.

**Mẫu prompt (thay tên cơ chế, slug và tên component tương ứng):**

> Tạo bài mới `src/content/coChe/vi/<slug>.md` về cơ chế **[TÊN]**.
>
> **Về hoạt ảnh:** component `[TÊN COMPONENT].astro` trong `src/components/infographics/glossary/` đã có sẵn và đã dùng `MechanismAnimation` (đủ play/pause, thanh trượt tốc độ, nút từng bước). **Tái sử dụng đúng component đó**, không viết SVG mới. Đăng ký nó vào bảng `infographics` trong `src/pages/co-che/[slug].astro` theo đúng cách 6 bài hiện có đang làm.
>
> **Frontmatter:** đặt `has_infographic: true` và `interactive: true`. Chọn `category` và `difficulty` đúng theo danh sách giá trị hợp lệ trong `src/content/config.ts`. **Không đặt `custom_slug`.**
>
> **Nội dung bài:** theo cấu trúc hiện tượng → nguyên lý → ý nghĩa lịch sử, đúng giọng nhà sưu tầm theo `CONTENT-GUIDE.md`. Có liên kết chéo tới các bài cơ chế liên quan, tới thuật ngữ tương ứng trong `/tu-dien`, và tới mốc tương ứng trong trang `/lich-su`.
>
> **Tránh trùng lặp:** bài `/tu-dien/<slug>` hiện có đã giải thích thuật ngữ ở mức định nghĩa. Bài `/co-che` phải đi sâu hơn hẳn về nguyên lý vận hành, không chép lại. Nếu thấy nội dung hai bài chồng lấn nhiều, rút gọn bài từ điển về đúng phần định nghĩa và dẫn link sang bài cơ chế.
>
> Thêm bộ phận này vào trang `/giai-phau` nếu phù hợp.

**Nghiệm thu mỗi bài:** Mở `/co-che/<slug>` trên điện thoại — hoạt ảnh chạy, nút play/pause và thanh trượt hoạt động, chạm vào bộ phận thì sáng lên; bài từ điển cùng chủ đề không lặp nội dung.

---

# MỤC D — HOÀN THIỆN NỘI DUNG THƯƠNG HIỆU

## D2. Nâng cấp 14 thương hiệu còn lại (theo dữ liệu được cấp)

14 hãng chưa đủ 5 khối: **Breguet, Cartier, F.P. Journe, Frédérique Constant, Glashütte Original, Grand Seiko, Greubel Forsey, Hamilton, IWC Schaffhausen, Longines, Philippe Dufour, Seiko, Tudor, Zenith.**

> Nâng cấp 3 trang thương hiệu `[SLUG 1]`, `[SLUG 2]`, `[SLUG 3]` theo đúng template 5 khối. **Toàn bộ dữ kiện lấy từ file `goi-du-lieu-thuong-hieu-dot-[N].md` tôi cung cấp kèm theo — không tự thêm bất kỳ dữ kiện, tên riêng, con số nào ngoài file.** Được biên tập lại câu chữ cho mượt theo `CONTENT-GUIDE.md`. Nội dung nào trong file đánh dấu [GHI CHÚ NỘI BỘ] thì không hiển thị ra trang.

*(Anh cấp dữ liệu theo từng đợt 3 hãng. GLM không tự viết dữ kiện thương hiệu mới.)*

## D3. Cân lại tỷ trọng phân khúc

Hiện 24 hãng lệch về cao cấp: 17 hãng ở ba hạng trên, chỉ 7 hãng tầm trung và nhập môn — trong khi độc giả Việt tìm nhiều nhất ở nhóm nhập môn.

> **Lưu ý:** Seiko, Grand Seiko, Hamilton, Longines **đã có trang** (dù chưa đủ 5 khối). Chỉ tạo khung mới cho hai hãng chưa có: **Orient** và **Tissot**.
>
> Chỉ tạo **khung trang trống** — frontmatter đầy đủ theo schema, cộng 5 khối rỗng có placeholder "Nội dung đang hoàn thiện". **Không tự viết nội dung.** Tôi sẽ cấp dữ liệu cho từng hãng sau.
>
> Đề xuất thêm cho tôi danh sách 4–6 hãng nhập môn và tầm trung nên bổ sung tiếp (kèm lý do ngắn về mức độ phổ biến tại Việt Nam), nhưng **chưa tạo trang** cho tới khi tôi duyệt.

## D4. Từ điển liên kết chéo tự động

> Viết một tiện ích (remark plugin hoặc script build) tự động quét thân bài: lần xuất hiện **đầu tiên** của mỗi thuật ngữ có trong Từ điển được bọc thành link kèm tooltip hiện định nghĩa ngắn khi rê chuột hoặc chạm. Chỉ áp dụng cho lần đầu trong mỗi bài để không rối mắt.
>
> Danh sách thuật ngữ lấy tự động từ collection `tuDien`, không hard-code. Địa chỉ link phải sinh từ **tên file** của bài từ điển, không dùng `custom_slug`.
>
> Không bọc link cho thuật ngữ xuất hiện trong chính bài từ điển của nó (tránh link tự trỏ về mình).

**Nghiệm thu:** Mở 3 bài bất kỳ, thuật ngữ đầu tiên có tooltip, lần sau không lặp link; tooltip hoạt động trên điện thoại; không có link tự trỏ.

---

# MỤC E — TRẢI NGHIỆM NGƯỜI DÙNG

## E0. Thống nhất danh mục phân loại trước khi làm bộ lọc

**Bắt buộc làm trước E2.** Schema hiện tại lệch với mô tả trong kế hoạch, nếu không chốt sẽ phải làm lại bộ lọc.

> Trong `src/content/config.ts`, collection `coChe` đang khai `category` gồm 4 giá trị: `nền tảng` / `chức năng` / `cao cấp` / `bổ trợ`. Kế hoạch ban đầu lại mô tả 3 nhóm: `nền tảng` / `bổ trợ` / `phức tạp`.
>
> Tương tự, `mauIconic` khai `category: pilot` trong khi kế hoạch ghi "phi công".
>
> Hãy **báo cáo cho tôi** (chưa sửa): với 6 bài cơ chế và 16 mẫu iconic hiện có, mỗi bài đang mang giá trị gì, và anh đề xuất bộ danh mục nào gọn nhất. Tôi chốt xong anh mới sửa schema và cập nhật đồng loạt các bài.

## E1. Tìm kiếm toàn trang

> Tích hợp **Pagefind** vào trang Astro: đánh index toàn bộ nội dung tiếng Việt, ô tìm kiếm đặt trên header với phím tắt "/", kết quả hiện dạng overlay ngay khi gõ. Bắt buộc hỗ trợ **tìm không dấu** (gõ "tru cot" ra được bài "Trữ cót").
>
> Lưu ý: trong `src/i18n/ui.ts` đã có sẵn khóa `search_placeholder` nhưng hiện chỉ là chữ trang trí ở Footer, chưa gắn với chức năng nào — hãy dùng lại khóa này thay vì tạo mới.

## E2. Bộ lọc cho hai trang danh sách còn lại

> Trang `/thuong-hieu` đã có bộ lọc phân hạng. Bổ sung tương tự, dùng chung đúng kiểu nút đó:
>
> - `/mau-iconic`: lọc theo **thể loại** và **thập niên ra đời**.
> - `/co-che`: lọc theo **nhóm** và **độ khó**.
>
> Danh mục thể loại và nhóm lấy theo kết quả đã chốt ở Mục E0. Lọc chạy phía client, không tải lại trang, dữ liệu lấy từ frontmatter. URL giữ trạng thái lọc để chia sẻ được.

## E3. Công cụ so sánh mẫu iconic

> Tạo trang `/so-sanh`: người dùng chọn 2–3 mẫu iconic, hiển thị bảng đối chiếu gồm năm ra đời, thương hiệu, thể loại, bộ máy, trữ cót, chống nước, và một dòng "câu chuyện định danh". Dữ liệu lấy từ frontmatter, không nhập tay.
>
> **Lưu ý về dữ liệu:** schema `mauIconic` hiện **không có trường tần số (vph) và chất liệu vỏ**. Trước khi dựng, hãy kiểm 16 bài xem bao nhiêu bài đủ dữ liệu cho từng cột, báo lại cho tôi. Cột nào thiếu dữ liệu ở quá nửa số bài thì bỏ khỏi bảng, đừng hiển thị ô trống. Không tự điền số liệu.
>
> Trạng thái lựa chọn lưu trên URL để chia sẻ. Giao diện xếp dọc gọn gàng trên điện thoại. Thêm nút "So sánh" trên mỗi thẻ ở trang `/mau-iconic`.

## E4. Dark mode

> Thêm chế độ tối: nút chuyển trên header, ghi nhớ lựa chọn, mặc định theo cài đặt hệ điều hành.
>
> Bảng màu tối phải sang trọng như bên trong hộp đựng đồng hồ: nền than chì, chữ ngà, điểm nhấn ánh kim đồng.
>
> **Khối lượng thực tế cần lưu ý:** hiện `tailwind.config.mjs` chưa bật `darkMode` và toàn bộ `src/` không có một biến thể `dark:` nào — nghĩa là phải rà lại từng file. Bắt buộc chỉnh cả timeline `/lich-su`, 11 component infographic SVG, `WatchExplodedView` ở trang `/giai-phau`, và component `WatchImage` (nền placeholder hiện là gradient xanh đậm, sẽ chìm vào nền tối). Kiểm từng trang, không để chữ hoặc nét vẽ chìm vào nền.
>
> Làm theo hai phiên: phiên 1 dựng hạ tầng và các trang chữ; phiên 2 xử lý riêng nhóm SVG và infographic.

---

# MỤC F — NỀN TẢNG TĂNG TRƯỞNG

## F0. Thẻ chia sẻ mạng xã hội (làm sớm, tách khỏi F1)

Hiện `BaseLayout.astro` **không có bất kỳ thẻ `og:` hay `twitter:` nào**. Mỗi lần trang được chia sẻ lên Facebook hoặc Zalo đều hiển thị trống. Đây là thay đổi nhỏ nhưng ảnh hưởng ngay tới việc lan truyền nội dung.

> Bổ sung vào `<head>` của `src/layouts/BaseLayout.astro`: `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`, `og:locale`, cùng bộ `twitter:card` tương ứng. Lấy dữ liệu từ props `title` và `description` sẵn có.
>
> Tạm thời dùng **một ảnh OG mặc định** cho toàn site (nền nhận diện của trang kèm tên "Đồng Hồ Cơ"), đặt tại `public/images/og-default.jpg`, kích thước 1200×630. Ảnh OG tự sinh theo từng bài để lại Mục F1.
>
> Thêm thẻ `canonical` cho mọi trang, lấy từ `Astro.url` và `site` trong `astro.config.mjs`. **Kiểm tra `site` đã được sửa thành tên miền thật ở Mục A0 chưa** — nếu chưa thì dừng và báo lại.

**Nghiệm thu:** Dán địa chỉ 3 trang bất kỳ vào công cụ kiểm tra thẻ chia sẻ của Facebook — thấy đúng tiêu đề, mô tả và ảnh.

## F1. SEO kỹ thuật

> Bổ sung:
>
> - `sitemap.xml` tự sinh (cài `@astrojs/sitemap`).
> - Meta description riêng cho từng bài, không dùng chung. Rà lại xem bài nào đang dùng mô tả mặc định.
> - Structured data schema.org: `Article` cho bài viết, `BreadcrumbList` cho điều hướng, `Organization` cho trang chủ.
> - Ảnh OG tự sinh cho mỗi bài gồm tiêu đề bài và tên thương hiệu trên nền nhận diện của trang, thay cho ảnh mặc định ở Mục F0.
>
> Kiểm tra thẻ canonical không bị trùng lặp.

## F2. Newsletter hoạt động thật

> Form "Nhận bài viết mới" ở `src/components/Footer.astro` dòng 53 hiện đặt `onsubmit="return false;"` — bấm gửi không có tác dụng.
>
> Kết nối với dịch vụ miễn phí (đề xuất Buttondown hoặc Formspree): đăng ký thật, có trang cảm ơn, có chống spam cơ bản, báo lỗi rõ ràng khi nhập sai định dạng email. Hướng dẫn tôi các bước tạo tài khoản và lấy khóa API nếu cần.

## F3. Đo lường

> Gắn analytics nhẹ và tôn trọng quyền riêng tư (Vercel Analytics hoặc Umami): theo dõi trang được đọc nhiều nhất, nguồn truy cập, thời gian ở lại. Không dùng Google Analytics.

---

# MỤC H — HIỂN THỊ ẢNH THƯƠNG HIỆU

Mục mới, không có trong bản 1. Phát hiện trong quá trình kiểm kê.

`IMAGE-MANIFEST.md` liệt kê 24 cặp `logo.png` và `hero.jpg` cho thương hiệu, nhưng **giao diện chưa có chỗ nào render chúng**. Anh Vinh có bỏ ảnh vào đúng thư mục cũng không hiện ra.

> Bổ sung vị trí hiển thị ảnh thương hiệu:
>
> - **Logo** trên thẻ ở trang `/thuong-hieu` và ở đầu trang chi tiết. Dùng trường `logo` đã có sẵn trong schema.
> - **Ảnh hero** ở đầu trang chi tiết thương hiệu, đặt trên khối hồ sơ nhanh.
> - **Ảnh bìa** cho mẫu iconic — dùng trường `cover_image` đã có sẵn.
>
> Tất cả đều đi qua component `WatchImage` để tự hiện placeholder gọn gàng khi chưa có ảnh. Không được để khung vỡ hay khoảng trắng lớn khi thiếu ảnh.
>
> Làm xong thì cập nhật `IMAGE-MANIFEST.md` đánh dấu các vị trí này là "đã có chỗ hiển thị".

---

# THỨ TỰ THỰC HIỆN ĐỀ NGHỊ

| Thứ tự | Mục | Lý do ưu tiên |
|---|---|---|
| 1 | **A0** | Lỗi đang hiển thị công khai, và `astro.config` chặn F0/F1 |
| 2 | **B5** | Dọn nốt phần rà soát bị sót ở đợt trước |
| 3 | **G** | Chốt quy tắc để các bước sau không lặp lỗi |
| 4 | **F0** | Thay đổi nhỏ, ảnh hưởng ngay tới mọi lượt chia sẻ |
| 5 | **E0** | Chốt danh mục trước, tránh làm lại bộ lọc |
| 6 | **C** | Hoàn thiện điểm độc bản, nay đã nhẹ hơn dự kiến |
| 7 | **E1, E2** | Trang đã nhiều nội dung, cần tìm kiếm và lọc |
| 8 | **H** | Mở đường để ảnh anh chuẩn bị hiển thị được |
| 9 | **D2** | Nâng cấp 14 hãng còn lại, theo từng đợt dữ liệu |
| 10 | **E3, E4** | Nâng trải nghiệm |
| 11 | **D3, D4** | Mở rộng nội dung, liên kết chéo |
| 12 | **F1, F2, F3** | Chuẩn bị cho giai đoạn 2 của dự án |

**Quy trình chất lượng mỗi mục:** GLM làm → push → anh xem bản live trong cửa sổ ẩn danh → gửi ảnh chụp để rà nội dung chuyên môn → GLM sửa nếu cần → duyệt → sang mục kế tiếp.

---

## PHỤ LỤC — Ba quy ước kỹ thuật GLM hay vi phạm

1. **Địa chỉ trang sinh từ tên file, không phải `custom_slug`.** `getStaticPaths` dùng `getSlug()` (lấy theo tên file), trong khi `getFullEntry()` lại ưu tiên `custom_slug`. Hai cách hiểu này đang cùng tồn tại trong `src/lib/content.ts`. Cho tới khi thống nhất, quy ước là: **tên file quyết định địa chỉ**, không khai `custom_slug` lệch.
2. **Tên hãng phải trùng khít giữa hai collection.** `title` của bài thương hiệu và `brand` của bài mẫu iconic được so khớp sau khi bỏ dấu cách, gạch nối, dấu chấm và dấu &. Lệch một chữ là khối "Mẫu iconic liên quan" biến mất im lặng, không báo lỗi build.
3. **Nhãn hiển thị phải lấy từ một nguồn duy nhất.** Mọi nhãn phân hạng dùng `getTierLabel()` trong `src/i18n/ui.ts`, mọi nhãn nhóm từ điển dùng `getCategoryLabel()`. Không khai bảng nhãn cục bộ trong từng layout.
