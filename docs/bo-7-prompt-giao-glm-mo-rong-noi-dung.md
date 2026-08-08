# BỘ 7 PROMPT GIAO GLM — MỞ RỘNG NỘI DUNG VÀ BẢO VỆ BẢN QUYỀN

**Ngày soạn:** 06/08/2026
**Người soạn:** Claude (Cowork)
**Căn cứ:** `docs/ke-hoach-mo-rong-noi-dung-va-bao-ve-ban-quyen.md`

## Cách dùng

Mỗi mục dưới đây là **một phiên làm việc độc lập**. Copy nguyên khối trong ô trích dẫn, dán vào GLM. **Làm theo thứ tự, mỗi gói push riêng.**

| Gói | Nội dung | Khối lượng | Cần tôi cấp thêm dữ liệu không |
|---|---|---|---|
| 1 | Sửa dữ liệu calibre theo kết quả kiểm chứng | Nhẹ | Không — dữ liệu nằm trong prompt |
| 2 | Bảo vệ nội dung: robots.txt, trang bản quyền, thông tin tác giả | Nhẹ | Không |
| 3 | 10 mẫu iconic | Nặng | **Có** — 3 mẫu chờ tôi soạn gói dữ liệu riêng |
| 4 | 18 mục từ điển | Vừa | Không — định nghĩa nằm trong prompt |
| 5 | 8 bài hướng dẫn thực hành | Nặng | Không |
| 6 | 7 bài cơ chế | Nặng | Không |
| 7 | Sửa 4 hình minh họa | Nhẹ | Không |

---

# GÓI 1 — SỬA DỮ LIỆU CALIBRE THEO KẾT QUẢ KIỂM CHỨNG

> Tôi đã tra cứu xong toàn bộ danh sách chờ trong `CAN-KIEM-CHUNG.md`. Kết quả chia hai nhóm: nhóm xác nhận được thì sửa cho đúng và ghi rõ, nhóm không xác nhận được thì gỡ khỏi phần hiển thị. Làm đúng theo bảng dưới, **không tự thêm mã hay con số nào ngoài tài liệu này**.
>
> ## A. Nhóm đã xác nhận — sửa cho đúng và bổ sung thông số
>
> **A1. IWC Schaffhausen** (`src/content/thuongHieu/vi/iwc.md`)
>
> - `signature_calibres` hiện là `["52000", "89000", "32110"]`. **Mã `89000` sai**, mã đúng là **`89361`**. Sửa thành `["52000", "89361", "32110"]`.
> - Trong phần chữ, được phép ghi các thông số sau vì đã kiểm chứng:
>   - **Họ 52000:** ra mắt năm 2015, tự động, hai thùng cót cho **trữ cót 168 giờ tức 7 ngày**, tần số 4 Hz tương đương 28.800 nhịp mỗi giờ, lên dây hai chiều theo hệ Pellaton. Vấu lên dây và bánh xe tự động làm bằng **gốm đen**, ổ trục rotor bằng **gốm trắng**.
>   - **Họ 32000:** trữ cót **72 giờ**, bánh thoát và ngựa làm bằng **silicon**.
>   - **Calibre 89361:** chronograph, trữ cót **68 giờ**, có chức năng flyback, gộp bộ đếm giờ và phút ở vị trí 12 giờ.
> - Chi tiết gốm và silicon nối rất tốt với mạch vật liệu đã kể trên trang (titan 1980, gốm 1986, Ceratanium 2017) — nên tận dụng.
>
> **A2. Grand Seiko** (`src/content/thuongHieu/vi/grand-seiko.md`)
>
> - `signature_calibres` hiện là `["9S", "9F", "9R (Spring Drive)"]`. Giữ nguyên.
> - **Xác nhận hai con số đang có trên trang đều đúng.** Được phép ghi rõ:
>   - **9F quartz:** ra đời năm **1993**, sai số **cộng trừ 10 giây mỗi năm**. Có cơ cấu khử rơ để kim giây không rung, đổi ngày tức thời, hệ xung kép cho phép kim vươn sát rìa mặt số, tinh thể thạch anh được ủ và tuyển chọn từng viên.
>   - **9RA5 Spring Drive:** sai số **cộng trừ 10 giây mỗi tháng**, tương đương 0,5 giây mỗi ngày; **trữ cót 120 giờ tức 5 ngày**.
>   - **9R65 Spring Drive:** sai số cộng trừ 15 giây mỗi tháng, trữ cót 72 giờ.
> - **Lưu ý mã:** nếu trên trang hay trong bảng đối chiếu của trang khác đang ghi `9RA2` thì **sửa thành `9RA5`**. Rà cả `rolex.md` và `omega.md`.
>
> **A3. Seiko** (`src/content/thuongHieu/vi/seiko.md`)
>
> - Được phép ghi các thông số sau:
>   - **6R35:** sai số trừ 15 tới cộng 25 giây mỗi ngày ở nhiệt độ 5 tới 35 độ C, **trữ cót 70 giờ**.
>   - **8L35:** sai số trừ 10 tới cộng 15 giây mỗi ngày, trữ cót khoảng 50 giờ, tần số 28.800 nhịp mỗi giờ.
>   - **NH35:** 21.600 nhịp mỗi giờ, **trữ cót 41 giờ**, sai số công bố trừ 20 tới cộng 40 giây mỗi ngày.
>
> **A4. Hamilton** (`src/content/thuongHieu/vi/hamilton.md`)
>
> - Được phép ghi: **calibre H-10 phát triển trên nền ETA 2824-2**, 25 chân kính, **21.600 nhịp mỗi giờ tức 3 Hz**, **trữ cót 80 giờ**. Trữ cót dài đạt được nhờ **hạ tần số xuống 3 Hz và thiết kế lại thùng cót**.
> - Chi tiết này củng cố cách viết hiện tại của trang: hãng không tự sản xuất bộ máy mà dùng bộ máy trong tập đoàn có chỉnh sửa. Giữ nguyên tinh thần đó.
>
> **A5. Cartier** (`src/content/thuongHieu/vi/cartier.md`) — **có một lỗi cần sửa**
>
> - **`430 MC` không phải bộ máy Cartier tự phát triển.** Đây là bản mang tên Cartier của bộ máy **Piaget 430P**, siêu mỏng, lên dây tay, phát triển năm 1996. Hai hãng cùng thuộc Richemont nên chuyện này bình thường trong ngành, nhưng **hiện trang đang liệt nó vào mục calibre tự sản xuất tiêu biểu** — sai.
> - Sửa cách diễn đạt: nêu rõ Cartier dùng cả bộ máy tự phát triển lẫn bộ máy từ các hãng trong cùng tập đoàn. Xử lý y hệt cách đã làm với L888 của Longines và Powermatic 80 của Tissot.
> - **`1904-PS MC` thì đúng là bộ máy tự sản xuất của Cartier.** Được phép ghi: tự động, đường kính 25,6mm, dày 4mm, **27 chân kính, 186 chi tiết, hai thùng cót, 28.800 nhịp mỗi giờ, trữ cót 48 giờ**.
>
> ## B. Nhóm không xác nhận được — gỡ khỏi phần hiển thị
>
> Bảy hãng sau có mã calibre trong frontmatter mà tôi **không tìm được nguồn đủ tin cậy**. Với nhóm này áp dụng cách gọn: **giữ dữ liệu trong frontmatter nhưng không hiển thị ra giao diện.**
>
> Các hãng: **Breguet, Zenith, Glashütte Original, F.P. Journe, Greubel Forsey, Frédérique Constant, Orient.**
>
> Cách làm:
>
> 1. **Không xóa trường `signature_calibres`** khỏi frontmatter của bảy file này — giữ nguyên dữ liệu để sau này còn dùng.
> 2. Trong `src/layouts/BrandLayout.astro`, khối hồ sơ nhanh đang hiển thị `signature_calibres`. Thêm một **danh sách các slug được phép hiển thị calibre**, và chỉ hiện khối đó khi slug nằm trong danh sách. Danh sách được phép gồm các hãng đã kiểm chứng: `iwc`, `grand-seiko`, `seiko`, `hamilton`, `cartier`, `rolex`, `omega`, `tag-heuer`, `ulysse-nardin`, `patek-philippe`, `vacheron-constantin`, `a-lange-soehne`, `audemars-piguet`, `blancpain`, `jaeger-lecoultre`, `tudor`, `longines`, `tissot`.
> 3. **Đặt danh sách này trong `src/i18n/ui.ts` hoặc một file cấu hình riêng, kèm chú thích giải thích vì sao** — để sau này khi kiểm chứng được thêm hãng nào thì chỉ cần thêm slug vào danh sách.
> 4. Rà phần chữ của bảy trang trên: nếu có nhắc mã calibre cụ thể trong bài thì **bỏ mã, giữ mô tả định tính**. Ví dụ thay "calibre FC-700" bằng "bộ máy tự phát triển của hãng".
>
> ## C. Cập nhật `CAN-KIEM-CHUNG.md`
>
> Đánh dấu các mục sau là **đã giải quyết**, ghi rõ kết luận, **không xóa dòng** để giữ dấu vết:
>
> - Mục 8 (calibre Seiko), mục 10 (calibre IWC), mục 12 (calibre Grand Seiko), mục 13 (chuẩn nội bộ Grand Seiko), mục 14 (calibre Cartier), mục 16 (calibre Hamilton).
>
> Đánh dấu các mục sau là **đã xử lý bằng cách gỡ khỏi hiển thị**: mục 2, 3, 4, 6, 7, 17, 20.
>
> Ba mục vẫn treo, giữ nguyên: mục 5 (năm phát minh của Breguet), mục 15 (năm 1974 SSIH mua Hamilton), mục 18 (con số hơn 500 bộ phim của Hamilton).
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. Chạy `npm run build`, push và báo mã commit.

---

# GÓI 2 — BẢO VỆ NỘI DUNG

> Ba việc về bảo vệ nội dung. **Không làm gì ảnh hưởng tới trải nghiệm người đọc** — cụ thể là không chặn chuột phải, không chặn bôi đen chữ, không làm rối mã nguồn. Những cách đó vô tác dụng mà lại phá trải nghiệm và phá trình đọc màn hình cho người khiếm thị.
>
> ## A. Tạo `public/robots.txt`
>
> Site hiện **chưa có file này**. Tạo mới, với nguyên tắc: **giữ các bộ máy tìm kiếm để có người đọc, chặn các trình thu thập dữ liệu huấn luyện AI.**
>
> - **Cho phép đầy đủ:** `Googlebot`, `Bingbot`, và mọi bot khác theo mặc định.
> - **Chặn toàn bộ** các tác nhân sau, mỗi tác nhân một khối riêng với `Disallow: /`:
>   `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `CCBot`, `ClaudeBot`, `anthropic-ai`, `Claude-Web`, `Google-Extended`, `Applebot-Extended`, `Bytespider`, `PerplexityBot`, `Amazonbot`, `meta-externalagent`, `FacebookBot`, `Diffbot`, `Omgilibot`, `ImagesiftBot`, `Timpibot`
> - Khai báo đường dẫn sitemap ở cuối file, trỏ tới sitemap mà `@astrojs/sitemap` đang sinh ra.
> - Thêm chú thích ngắn ở đầu file bằng tiếng Việt giải thích mục đích, để sau này anh Vinh đọc lại còn hiểu.
>
> ## B. Trang điều khoản bản quyền
>
> Tạo trang mới `/ban-quyen` trong `src/content/trang/vi/`, dùng đúng collection `trang` đã có.
>
> Nội dung cần nêu, viết bằng tiếng Việt rõ ràng, giọng điềm đạm không đe dọa:
>
> 1. **Ai giữ quyền** đối với nội dung chữ, hình minh họa và mã nguồn giao diện.
> 2. **Bộ 28 minh họa vector** trên trang Lịch sử là tác phẩm gốc, được bảo hộ như tác phẩm mỹ thuật.
> 3. **Phạm vi cho phép:** được trích dẫn ngắn kèm dẫn nguồn và liên kết về trang gốc; **không được sao chép toàn bộ bài**, không được dùng lại hình minh họa, **không được dùng nội dung để huấn luyện mô hình ngôn ngữ hay bất kỳ hệ thống máy học nào**.
> 4. **Cách liên hệ** khi muốn xin phép dùng lại.
> 5. Một dòng nêu rằng nội dung được biên soạn có dẫn nguồn, và trang hoan nghênh việc chỉ ra sai sót.
>
> Thêm liên kết tới trang này ở **chân trang**, cạnh dòng bản quyền hiện có.
>
> ## C. Bổ sung thông tin tác giả vào structured data
>
> Trong `src/layouts/BaseLayout.astro`, khối `ld+json` hiện có `WebSite` và `BreadcrumbList` nhưng **chưa có thông tin tác giả và nhà xuất bản**.
>
> - Bổ sung trường `author` và `publisher` vào khối structured data.
> - Với các trang bài viết, bổ sung `datePublished` lấy từ trường `date` trong frontmatter.
> - Thêm `copyrightHolder` và `copyrightYear`.
>
> Thông tin tác giả để một chỗ duy nhất trong `src/i18n/ui.ts` hoặc file cấu hình, không viết cứng rải rác.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. Chạy `npm run build`, kiểm `dist/robots.txt` đã sinh đúng, push và báo mã commit.

---

# GÓI 3 — 10 MẪU ICONIC

> **Đọc kỹ phần này trước khi bắt tay:** gói này chia **hai phiên**. Phiên A làm ngay được vì dữ liệu đã có sẵn. Phiên B chờ tôi cấp dữ liệu riêng.
>
> ## PHIÊN A — 7 mẫu có dữ liệu sẵn
>
> Viết 7 bài mẫu iconic mới, đặt trong `src/content/mauIconic/vi/`, theo đúng cấu trúc bài mẫu iconic quy định ở `CONTENT-GUIDE.md` mục 3.2: bối cảnh ra đời, đặc điểm thiết kế nhận diện, các thế hệ tham chiếu, bộ máy, vị trí trong lịch sử.
>
> | Tên file | Mẫu | Thương hiệu | Lấy dữ liệu từ |
> |---|---|---|---|
> | `breguet-type-xx.md` | Type XX | Breguet | `docs/goi-du-lieu-thuong-hieu-dot-2.md` |
> | `fpjourne-chronometre-bleu.md` | Chronomètre Bleu | F.P. Journe | `docs/goi-du-lieu-thuong-hieu-dot-3.md` |
> | `greubel-double-tourbillon.md` | Double Tourbillon 30° | Greubel Forsey | `docs/goi-du-lieu-thuong-hieu-dot-3.md` |
> | `dufour-simplicity.md` | Simplicity | Philippe Dufour | `docs/goi-du-lieu-thuong-hieu-dot-3.md` |
> | `longines-lindbergh.md` | Lindbergh Hour Angle | Longines | `docs/goi-du-lieu-thuong-hieu-dot-4.md` |
> | `hamilton-ventura.md` | Ventura | Hamilton | `docs/goi-du-lieu-thuong-hieu-dot-6.md` |
> | `tissot-prx.md` | PRX | Tissot | `docs/goi-du-lieu-thuong-hieu-dot-7.md` |
>
> **Quy tắc tuyệt đối:** mọi dữ kiện phải **truy được về đúng gói dữ liệu tương ứng**. Không thêm năm, tên calibre, thông số hay giải thưởng nào ngoài các gói đó. Các gói này đều có mục "số liệu cố tình bỏ" — tôn trọng, không tự điền lại.
>
> **Frontmatter:** trường `brand` phải **khớp tuyệt đối** với trường `title` của trang thương hiệu tương ứng, nếu không Khối 5 sẽ không nhận ra. Kiểm lại từng cặp trước khi push.
>
> **Trường `movement`, `power_reserve`, `water_resistance`:** chỉ điền nếu gói dữ liệu có nêu. **Để trống nếu không có**, đừng đoán.
>
> **Trường `category`:** chọn trong danh sách hợp lệ ở `src/content/config.ts`. Gợi ý: Type XX là `chronograph`, Chronomètre Bleu là `dress`, Double Tourbillon và Simplicity là `dress`, Lindbergh là `pilot`, Ventura là `dress`, PRX là `sport-luxury`.
>
> **Về cân bằng danh mục:** 16 mẫu hiện có đang lệch nặng về đồng hồ lặn và chronograph, chỉ 3 dress watch. Bảy mẫu này sửa đúng chỗ lệch đó — nên khi viết, **không cần cố làm chúng nghe thể thao**; đây phần lớn là đồng hồ thanh lịch và công cụ chuyên dụng, viết đúng bản chất của chúng.
>
> Xong Phiên A: chạy `npm run build`, kiểm Khối 5 của 7 trang thương hiệu tương ứng đã hiện mẫu iconic chưa, push và báo mã commit. **Dừng lại, chưa làm Phiên B.**
>
> ## PHIÊN B — 3 mẫu còn lại
>
> Ba mẫu `Glashütte Original SeaQ`, `Frédérique Constant Classics Heart Beat`, `Orient Bambino` **chưa có dữ liệu kiểm chứng**. Tôi sẽ cấp gói dữ liệu riêng cho ba mẫu này. **Chưa viết ba bài đó cho tới khi có gói.**
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

---

# GÓI 4 — 18 MỤC TỪ ĐIỂN

> Bổ sung 18 mục vào `src/content/tuDien/vi/`, nâng từ điển từ 14 lên 32 mục. Đây không chỉ là thêm trang: từ điển là **nguồn của hệ thống liên kết chéo tự động**, nên mỗi mục thêm vào làm dày mạng lưới liên kết của cả site.
>
> ## Danh sách 18 mục, chia bốn nhóm
>
> **Nhóm 1 — Bộ phận cơ bản.** Đây là nhóm thiếu nghiêm trọng nhất: mọi bài viết đều nhắc tới các bộ phận này mà chưa có mục nào giải thích.
>
> | Tên file | Thuật ngữ | Tiếng Anh | Ý cốt lõi cần giải thích |
> |---|---|---|---|
> | `day-cot.md` | Dây cót | mainspring | Dải thép cuộn, tích năng lượng khi lên dây, nhả dần ra để chạy đồng hồ. Nguồn năng lượng duy nhất của đồng hồ cơ |
> | `thung-cot.md` | Thùng cót | barrel | Hộp tròn chứa dây cót. Nhiều thùng cót thì trữ cót dài hơn — lý do các mẫu 7 ngày thường có hai thùng |
> | `chan-kinh.md` | Chân kính | jewel | Viên đá tổng hợp làm ổ đỡ trục, giảm ma sát và mài mòn. Số chân kính không tỷ lệ thuận với chất lượng |
> | `banh-thoat.md` | Bánh thoát | escape wheel | Bánh răng cuối chuỗi truyền động, bị ngựa chặn và nhả từng nấc — nguồn của tiếng tíc tắc |
> | `ngua.md` | Ngựa | pallet fork | Chi tiết hình mỏ neo, chặn và nhả bánh thoát, đồng thời truyền xung lực cho bánh lắc |
> | `cau-may.md` | Cầu máy | bridge | Thanh kim loại giữ đầu trên các trục. Là nơi thợ thể hiện tay nghề hoàn thiện rõ nhất |
>
> **Nhóm 2 — Chi tiết bên ngoài.** Nhóm phục vụ người mua hàng.
>
> | Tên file | Thuật ngữ | Tiếng Anh | Ý cốt lõi |
> |---|---|---|---|
> | `vau-day.md` | Vấu dây | lug | Phần nhô ra để gắn dây. **Khoảng cách giữa hai vấu quyết định bề rộng dây**, và độ cong của vấu quyết định đồng hồ có ôm cổ tay hay không |
> | `num-van.md` | Núm vặn | crown | Dùng lên dây và chỉnh giờ. Loại vặn ren giúp chống nước tốt hơn nhưng phải nhớ vặn lại |
> | `day-vo.md` | Đáy vỏ | caseback | Mặt sau vỏ. Loại đặc bảo vệ tốt hơn, loại kính sapphire cho nhìn bộ máy |
> | `khoa-day.md` | Khóa dây | clasp | Các kiểu khóa và ưu nhược. Khóa gập an toàn hơn khóa kim |
> | `tachymeter.md` | Thang tachymeter | tachymeter | Thang trên vành dùng cùng chronograph để đo tốc độ. **Thang không chia đều, thưa dần về cuối** |
>
> **Nhóm 3 — Hoàn thiện và trang trí.** Nhóm nâng chất các bài về haute horlogerie.
>
> | Tên file | Thuật ngữ | Tiếng Anh | Ý cốt lõi |
> |---|---|---|---|
> | `guilloche.md` | Guilloché | guilloché | Hoa văn khắc bằng máy tiện hoa. Ban đầu để chống chói, sau thành thẩm mỹ. Gắn với Breguet |
> | `vat-canh.md` | Vát cạnh | anglage | Vát và đánh bóng cạnh cầu máy. **Góc vát trong là chỗ máy không làm được, phải làm tay** — dấu hiệu nhận biết hoàn thiện thủ công thật |
> | `perlage.md` | Perlage | perlage | Hoa văn vòng tròn chồng lấn trên mặt máy, vừa trang trí vừa giữ bụi |
> | `lo-may.md` | Lộ máy | skeleton | Cắt bỏ vật liệu thừa để nhìn xuyên bộ máy. Khó ở chỗ giảm vật liệu mà vẫn giữ độ cứng |
>
> **Nhóm 4 — Chứng nhận và tiêu chuẩn.** Nhóm người đọc gặp liên tục mà ít nơi giải thích tử tế bằng tiếng Việt.
>
> | Tên file | Thuật ngữ | Tiếng Anh | Ý cốt lõi |
> |---|---|---|---|
> | `chronometer.md` | Chronometer và COSC | chronometer | Chứng nhận độ chính xác do tổ chức độc lập cấp, kiểm bộ máy rời chứ không phải đồng hồ hoàn thiện. **Khác hẳn nghĩa thông thường của chữ này** |
> | `poincon-de-geneve.md` | Poinçon de Genève | Geneva Seal | Dấu chứng nhận của bang Genève, đòi hỏi cả nơi sản xuất lẫn tiêu chuẩn hoàn thiện |
> | `metas.md` | Master Chronometer | METAS | Chuẩn của viện đo lường Thụy Sĩ, kiểm **đồng hồ đã lắp vỏ** qua tám bài, gồm chống từ 15.000 gauss |
>
> ## Quy tắc viết
>
> - Mỗi mục **ngắn gọn**, khoảng 150 tới 250 từ. Từ điển là nơi tra nhanh, không phải nơi đọc sâu — bài sâu để dành cho `/co-che`.
> - Frontmatter đủ: `title`, `excerpt`, `term_en`, `category`, `date`, `draft: false`. Trường `category` gom theo bốn nhóm ở trên.
> - **Không đặt `custom_slug`.**
> - Có link chéo tới bài `/co-che` liên quan nếu có.
> - **Chỉ giải thích nguyên lý chung, không nêu dữ kiện thương hiệu cụ thể** — không năm, không tên calibre, không thông số của hãng nào. Nếu thấy cần nêu ví dụ thương hiệu, chỉ nêu tên hãng mà không kèm số liệu.
>
> ## Hai việc kỹ thuật kèm theo
>
> 1. **Đặt trần số link tự động mỗi bài.** Với 32 thuật ngữ, một bài dài có thể bị bọc hàng chục link thành rối mắt. Sửa `src/plugins/remark-glossary-autolink.ts`: **tối đa 8 link mỗi bài**, ưu tiên thuật ngữ xuất hiện sớm nhất trong bài.
> 2. **Thêm bộ lọc theo nhóm cho trang `/tu-dien`.** Với 32 mục, danh sách phẳng quá dài. Dùng chung kiểu nút lọc đang có ở `/thuong-hieu`.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. Chạy `npm run build`, kiểm tooltip hoạt động và số link mỗi bài không vượt 8, push và báo mã commit.

---

# GÓI 5 — 8 BÀI HƯỚNG DẪN THỰC HÀNH

> Bổ sung 8 bài vào `src/content/huongDan/vi/`, nâng từ 4 lên 12 bài.
>
> **Điểm khác biệt cốt lõi của gói này:** bốn bài hiện có đều là bài kiến thức chung. Tám bài này phải thuộc loại **"cầm chiếc đồng hồ trên tay và làm theo từng bước"**. Ở bài cơ chế người đọc **xem**; ở đây người đọc **tự làm**.
>
> ## Nhóm 1 — Bốn bài thao tác, có thành phần tương tác
>
> Bốn bài này dùng lại component `MechanismAnimation` nhưng theo hướng khác: **người đọc điều khiển, không phải xem chạy tự động.**
>
> | Tên file | Bài | Nội dung cốt lõi | Thành phần tương tác bắt buộc |
> |---|---|---|---|
> | `dung-vanh-lan.md` | Cách dùng vành lặn để đo thời gian | Xoay mốc 0 về vị trí kim phút, đọc số phút đã trôi trên vành. Giải thích vì sao vành **chỉ xoay một chiều**: nếu vô tình xoay ngược thì thời gian đọc được sẽ **dài hơn thực tế**, tức là an toàn cho thợ lặn | **Vành xoay được bằng chuột hoặc ngón tay**, kim phút chạy, hiện số phút đã trôi |
> | `doc-va-chinh-gmt.md` | Cách đọc và chỉnh đồng hồ GMT | Kim GMT quay một vòng mỗi 24 giờ. Phân biệt hai kiểu: loại chỉnh được kim GMT riêng, và loại chỉnh được kim giờ riêng theo từng nấc một giờ. Cách dùng vành 24 giờ để đọc múi giờ thứ ba | Hai kim chỉnh được, vành 24 giờ xoay được, hiện ba múi giờ cùng lúc |
> | `dung-tachymeter.md` | Cách dùng thang tachymeter | Bấm chạy khi bắt đầu, dừng sau khi đi đúng một đơn vị quãng đường, đọc con số kim giây đang chỉ — đó là tốc độ trung bình. Giải thích vì sao **thang không chia đều** | Nhập quãng đường, bấm chạy và dừng, hiện kết quả tốc độ |
> | `chinh-lich-an-toan.md` | Cách chỉnh lịch và khung giờ nguy hiểm | Cơ cấu lịch bắt đầu ăn khớp từ khoảng 20 giờ tối tới 4 giờ sáng. Chỉnh ngày trong khoảng đó **có thể làm hỏng bánh răng lịch** — lỗi tốn tiền mà rất nhiều người mắc. Cách an toàn: đưa kim về khoảng 6 giờ rồi mới chỉnh ngày | Mặt số quay được, **vùng nguy hiểm tô đỏ** khi kim vào khoảng cấm, có cảnh báo hiện ra |
>
> ## Nhóm 2 — Bốn bài quyết định
>
> | Tên file | Bài | Nội dung cốt lõi |
> |---|---|---|
> | `chon-co-dong-ho.md` | Chọn kích cỡ đồng hồ theo cổ tay | Đo chu vi cổ tay, đối chiếu đường kính vỏ và **khoảng cách giữa hai vấu** — vấu quan trọng hơn đường kính. Lưu ý riêng: cổ tay người Việt trung bình nhỏ hơn chuẩn quốc tế nên lời khuyên nước ngoài thường không hợp. **Nên có bảng tra đơn giản** |
> | `hop-xoay-dong-ho.md` | Hộp xoay đồng hồ: khi nào cần, khi nào không | Nói thẳng: **phần lớn người chơi không cần**. Chỉ thực sự có ích với đồng hồ lịch vạn niên hoặc khi có nhiều đồng hồ luân phiên. Nêu cả mặt trái: chạy liên tục làm dầu phân bố không đều và tăng hao mòn |
> | `muc-chong-nuoc.md` | Mức chống nước: được làm gì, không được làm gì | Bảng tra thực dụng theo từng mức. Nhấn mạnh **hiểu lầm nguy hiểm nhất**: con số mét là áp suất tĩnh trong phòng thí nghiệm, không phải độ sâu bơi được. Nêu các việc làm hỏng gioăng: nước nóng, xông hơi, xà phòng, bấm nút khi đang ướt |
> | `nhan-biet-dong-ho-gia.md` | Nhận biết đồng hồ giả | **Viết cẩn trọng.** Chỉ nêu các dấu hiệu kỹ thuật khách quan mà người mua kiểm được: chất lượng in mặt số, độ trơn của kim giây, tiếng máy, trọng lượng, chất lượng hoàn thiện vấu và khóa, giấy tờ và mã tham chiếu. **Tuyệt đối không viết theo hướng chỉ ra cách làm giả tinh vi hơn.** Kết bài bằng lời khuyên thực tế nhất: mua từ đại lý chính hãng hoặc nơi bán lại có uy tín |
>
> ## Quy tắc viết chung
>
> - Giọng văn theo `CONTENT-GUIDE.md`, nhưng **thiên về hướng dẫn từng bước** hơn các bài khác. Dùng danh sách đánh số cho các thao tác.
> - Frontmatter đủ, có trường `difficulty` chọn trong `người mới`, `trung cấp`, `nâng cao`.
> - **Không đặt `custom_slug`.**
> - **Không nêu dữ kiện thương hiệu cụ thể, không nêu giá.** Đây là bài hướng dẫn chung, không phải bài đánh giá sản phẩm.
> - Link chéo tới bài `/co-che` và mục `/tu-dien` liên quan.
> - Bốn bài nhóm 2 **không cần thành phần tương tác**, chỉ cần bảng tra và sơ đồ rõ ràng.
>
> ## Cách làm
>
> **Chia hai phiên:** phiên đầu làm bốn bài nhóm 2 (nhẹ hơn, không có tương tác), phiên sau làm bốn bài nhóm 1. Push riêng từng phiên.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. Với các bài có tương tác, **kiểm kỹ trên điện thoại** — vành xoay và kim chỉnh phải dùng được bằng ngón tay, không chỉ bằng chuột.

---

# GÓI 6 — 7 BÀI CƠ CHẾ

> Bổ sung 7 bài vào `src/content/coChe/vi/`, nâng từ 11 lên 18 bài.
>
> **Ba khoảng trống lớn nhất của danh mục hiện tại:** chưa có bài nào về hiển thị ngày và lịch (phức tạp phổ biến nhất, gần như đồng hồ nào cũng có), chưa có bài nào về pha trăng (phức tạp được yêu thích nhất về thẩm mỹ), và chưa có bài nào về điểm chuông (phức tạp danh giá ngang tourbillon).
>
> ## Bảy bài, làm theo thứ tự này
>
> | # | Tên file | Bài | `category` | `difficulty` | Nội dung cốt lõi |
> |---|---|---|---|---|---|
> | 1 | `hien-thi-ngay.md` | Hiển thị ngày và cơ cấu lịch | nền tảng | thấp | Đĩa ngày 31 vị trí, bánh răng đẩy một nấc mỗi 24 giờ. Phân biệt lịch nhảy tức thời và lịch bò dần. **Giải thích khung giờ nguy hiểm** và dẫn link sang bài hướng dẫn chỉnh lịch |
> | 2 | `pha-trang.md` | Pha trăng | phức tạp | trung bình | Đĩa có **hai mặt trăng**, bánh răng **59 răng** đẩy một nấc mỗi ngày. Chu kỳ trăng thực là 29,53 ngày nên cơ cấu thường **sai một ngày sau khoảng 2 năm 7 tháng**. Loại chính xác cao dùng bánh răng nhiều răng hơn, sai một ngày sau hơn một trăm năm |
> | 3 | `da-quang.md` | Dạ quang | bổ trợ | thấp | Nguyên lý lân quang: hấp thụ ánh sáng rồi phát lại. Ba thế hệ vật liệu: **radium** (phóng xạ, đã bỏ), **tritium** (yếu hơn nhiều, tự phát sáng), **Super-LumiNova** (không phóng xạ, cần nạp sáng). Nhắc chuyện các nữ công nhân sơn radium đầu thế kỷ 20 — **kể ở mức tôn trọng, không kể chi tiết bệnh tật** |
> | 4 | `kinh-dong-ho.md` | Kính đồng hồ | bổ trợ | thấp | Ba loại: **acrylic** (dẻo, không vỡ vụn, đánh bóng lại được, dễ xước), **khoáng** (cứng vừa, rẻ), **sapphire** (rất cứng, gần như không xước, giòn hơn, chống chói phải phủ thêm lớp). Nêu thẳng: sapphire không phải luôn tốt nhất, đồng hồ vintage và đồng hồ quân đội thường dùng acrylic có lý do |
> | 5 | `chong-soc.md` | Chống sốc | bổ trợ | trung bình | Trục bánh lắc rất mảnh nên dễ gãy khi va đập. Hệ chống sốc cho chân kính **lùi lại rồi bật về nhờ lò xo hình sao**, phân tán lực. Đây là lý do đồng hồ rơi mà không hỏng. Dẫn link tới mục từ điển Incabloc |
> | 6 | `diem-chuong.md` | Điểm chuông | phức tạp | rất cao | Gõ giờ bằng âm thanh: búa nhỏ đập vào **thanh cộng hưởng cuộn quanh bộ máy**. Phân biệt **điểm chuông theo yêu cầu** (phải bấm mới kêu) và **điểm chuông tự động** (tự gõ theo giờ). Vì sao khó: âm thanh phụ thuộc vào vỏ, vào cách gắn thanh, vào tay nghề chỉnh của từng thợ — hai chiếc cùng mẫu vẫn kêu khác nhau |
> | 7 | `bo-thoat-dong-truc.md` | Bộ thoát đồng trục | phức tạp | cao | Bộ thoát Thụy Sĩ truyền lực bằng **ma sát trượt** nên cần dầu, mà dầu xuống cấp là sai số tăng. Bộ thoát đồng trục truyền lực bằng **lực đẩy gần như thẳng góc**, giảm ma sát, nên giữ được độ chính xác lâu hơn giữa hai lần bảo dưỡng. Dẫn link tới bài bộ thoát và tới mốc 1999 trong trang Lịch sử |
>
> ## Về hoạt ảnh
>
> - **Bốn bài đầu không cần hoạt ảnh tương tác** — một sơ đồ tĩnh tốt là đủ, và làm vậy giữ được nhịp làm việc nhanh. Đặt `has_infographic: false`.
> - **Ba bài cuối nên có hoạt ảnh**, dùng component `MechanismAnimation` như các bài đã có.
> - **Bài pha trăng là bài dễ làm hoạt ảnh đẹp nhất trong cả bảy:** chỉ cần một đĩa xoay với hai mặt trăng, cửa sổ hình vòm che bớt, và thanh trượt cho người đọc tua qua một chu kỳ trăng. Nếu chỉ làm được một hoạt ảnh trong đợt này thì làm bài này.
>
> ## Quy tắc viết
>
> - Cấu trúc theo `CONTENT-GUIDE.md` mục 3.3: hiện tượng, nguyên lý, ý nghĩa lịch sử.
> - **Chỉ giải thích nguyên lý chung.** Không nêu năm, tên calibre hay thông số của hãng cụ thể. Nếu cần nêu ví dụ thương hiệu thì chỉ nêu tên hãng, không kèm số liệu.
> - Cập nhật trang `/co-che` để 7 bài mới vào đúng chặng trong lộ trình đọc ba chặng đã có.
> - **Không đặt `custom_slug`.** Đăng ký component hoạt ảnh vào bảng `infographics` trong `src/pages/co-che/[slug].astro` nếu bài có hoạt ảnh.
>
> ## Cách làm
>
> **Chia ba phiên:** phiên 1 làm bài 1 tới 4 (không hoạt ảnh), phiên 2 làm bài 5 và 7, phiên 3 làm bài 6 và hoạt ảnh pha trăng. Push riêng từng phiên.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

---

# GÓI 7 — SỬA 4 HÌNH MINH HỌA BỊ LẶP

> **Việc này không gấp.** Nếu anh Vinh định bổ sung ảnh chụp thật cho nhóm mốc hiện đại thì bỏ qua hẳn gói này — ảnh thật sẽ thay minh họa và vấn đề tự hết.
>
> ## Vấn đề
>
> Từ mốc 1953 trở đi trên trang Lịch sử, khoảng tám tới mười hình cùng là **một mặt số tròn đặt giữa khung**. Nửa sau của trang bị đều đều.
>
> ## Cách sửa: đổi cỡ nhìn, không vẽ lại từ đầu
>
> Chỉ cần **bốn hình đổi cỡ nhìn** là nhịp cả nhóm khác hẳn:
>
> | File | Hiện tại | Đổi thành |
> |---|---|---|
> | `fifty-fathoms.svg` | Mặt số tròn giữa khung | **Nhìn nghiêng từ dưới nước**: đồng hồ đặt chếch góc, bọt khí và cột nước chiếm nửa khung, mặt số chỉ chiếm khoảng một phần ba |
> | `rolex-gmt.svg` | Mặt số tròn giữa khung | **Chỉ vẽ vành 24 giờ trải phẳng thành dải ngang**, như tháo vành ra duỗi thẳng; kim GMT nhỏ đặt bên cạnh. Nửa dải gạch dày đặc, nửa để trống, phân biệt ngày và đêm |
> | `heuer-carrera.svg` | Mặt số tròn giữa khung | **Cận cảnh nghiêng vào phần vát mặt số** nơi có vòng chia phút — đúng chi tiết làm nên mẫu này |
> | `omega-coaxial.svg` | Sơ đồ tròn giữa khung | **Bố cục hai nửa trái phải**: nửa trái bộ thoát truyền thống một tầng, nửa phải bộ thoát đồng trục hai tầng, có đường phân cách dọc ở giữa |
>
> Bốn hình này sửa xong thì nhóm mốc hiện đại có đủ nhịp: một cảnh nghiêng, một dải ngang, một cận cảnh, một bố cục đôi — xen giữa các mặt số tròn còn lại.
>
> ## Ràng buộc
>
> Giữ nguyên toàn bộ hệ thống thị giác đã quy định ở `docs/prompt-glm-28-minh-hoa-svg-timeline.md` Phần 1: `viewBox="0 0 800 600"`, ba màu `#1F2D3D` nền, `#B8893C` nét chính, `#FAF7F2` nét sáng; bốn mức độ dày nét 3px, 1.75px, 1px, 0.75px; gạch tạo khối 1px cách nhau 4 tới 6px, mỗi hình ít nhất hai vùng; hoa văn nền bước lặp 40px opacity 0.10 đến 0.12; không thẻ `<text>`; không logo; dưới 15KB.
>
> **Tự kiểm bắt buộc:** render cả 28 hình ra ảnh nhỏ, xếp thành bảng và nhìn. Nhóm mốc từ 1953 trở đi có còn cảm giác lặp không?
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. Chạy `npm run build`, push và báo mã commit.

---

# VIỆC TÔI CÒN NỢ ANH VINH

Một gói dữ liệu duy nhất chưa soạn: **ba mẫu iconic của Glashütte Original SeaQ, Frédérique Constant Classics Heart Beat và Orient Bambino** — phần Phiên B của Gói 3. Ba mẫu này cần tra cứu mới. Anh nhắc là tôi soạn.
