# ĐÁNH GIÁ TOÀN DIỆN VÀ HƯỚNG PHÁT TRIỂN TIẾP THEO

**Ngày rà soát:** 19/09/2026
**Nền đối chiếu:** repo `D:\Watch web build`, HEAD `521f5fa`, 266 commit *(Đính chính H01: đây là mốc tại thời điểm rà sáng 19/09; hiện hành đã là `a715fd0`, 268 commit. Không dùng lại HEAD và số commit của lần rà này làm số hiện hành — Kế hoạch hợp nhất mục 3.1.)*
**Phạm vi:** toàn bộ mã nguồn, nội dung, dòng thời gian lịch sử, trang production và bản tiếng Anh
**Người rà:** Claude

> **Trạng thái tài liệu (đính chính gói H01, 19/09/2026):** đây là tài liệu nguồn đã được thẩm định bởi [Kế hoạch phát triển hợp nhất 19/09](KE-HOACH-PHAT-TRIEN-HOP-NHAT-2026-09-19.md) (mục 3.1), giữ để truy vết và làm đầu vào chi tiết. **Lệnh thi công hiện hành** là [Bộ giao việc GLM 14 gói](BO-GIAO-VIEC-GLM-14-GOI-2026-09-19.md) cùng kế hoạch hợp nhất; vai trò và trạng thái từng tài liệu xem [Chỉ mục kế hoạch hiện hành](CHI-MUC-KE-HOACH-HIEN-HANH.md). Các chỗ sai đã được xác nhận được ghi đính chính ngay tại chỗ bằng nhãn "**Đính chính H01**".

---

# PHẦN 0 — BA ĐIỀU TÔI ĐÃ NÓI SAI, ĐÍNH CHÍNH TRƯỚC

Bản `docs/KE-HOACH-PHAT-TRIEN-FINAL-2026-09-12.md` của GPT Work bác ba nhận định của tôi. Tôi đã đo lại hôm nay và **GPT Work đúng cả ba**.

| Tôi đã nói | Đo lại ngày 19/09 | Kết luận |
|---|---|---|
| "Khoảng 82 chỗ ép kiểu `as any`" | `grep -rn "as any" src/` cho **0 kết quả** | Tôi sai |
| "`astro check` chưa nối vào chuỗi build" | `check:types` nằm trong chuỗi `check`; `build` gọi `check` đầu tiên | Tôi sai |
| "Ảnh AI chưa thử, thư mục timeline có 28 SVG và 0 JPG" | Đúng về thư mục timeline, nhưng **sai về việc chưa thử**: ảnh AI đã tạo, đã tích hợp và đã nghiệm thu từ 13/09 tại chương Bánh lắc và dây tóc | Tôi sai ở phần quan trọng |

**Nguyên nhân:** tôi lấy số liệu của lần rà 05/09 làm hiện trạng thay vì đo lại. Đây là lỗi của tôi, không phải của GLM hay GPT Work. Tôi nêu ngay đầu tài liệu vì anh đã từng ra quyết định dựa trên các con số đó.

Đồng thời tôi cũng phải rút lại **bốn cách nói vượt bằng chứng** mà GPT Work chỉ ra ở mục 3 bản kế hoạch: "không còn lỗi chuyên môn", "đạt WCAG AA", "SVG hiện tại đúng đặc điểm lịch sử", "không có nhãn hiệu thì không có rủi ro". Không câu nào trong bốn câu đó được chứng minh. Tài liệu này không dùng lại chúng.

---

# PHẦN 1 — TRANG ĐÃ LÀM ĐƯỢC NHỮNG GÌ

## 1.1. Thư viện nội dung

| Nhóm | Tiếng Việt | Tiếng Anh |
|---|---:|---:|
| Thương hiệu | 73 | 3 |
| Mẫu iconic | 69 | 4 |
| Từ điển | 33 | 23 |
| Cơ chế | 19 | 14 |
| Hướng dẫn | 14 | 9 |
| Trang pháp lý | 1 | 0 |
| **Tổng** | **209** | **53** |

Cộng 262 tệp Markdown. Về quy mô tiếng Việt, đây đã là thư viện đồng hồ cơ có hệ thống lớn nhất mà tôi biết bằng tiếng Việt. *(Đính chính H01 theo Kế hoạch hợp nhất mục 3.1: chưa có khảo sát đối chiếu đủ để xếp hạng so với các trang khác; kết luận giữ được là thư viện có hệ thống với kỷ luật ghi nguồn và ghi giới hạn khẳng định rõ ràng.)*

## 1.2. Lớp trải nghiệm — thành tựu lớn nhất của bảy ngày qua

Từ `4129437` (10/09) đến `521f5fa` (19/09) có **21 commit** (`git rev-list --count 4129437..HEAD`). Gần như toàn bộ là lớp trải nghiệm song ngữ, không phải bài viết:

| Ngày | Hạng mục | Commit |
|---|---|---|
| 12/09 | Sửa điều hướng và chuyển ngôn ngữ (G01) | `7c7ff91` |
| 12/09 | Chuẩn hóa nguồn 28 mốc lịch sử (G02) | `a65580d` |
| 12/09 | Đường cơ sở người xem và tìm kiếm (G03) | `234fa26` |
| 13/09 | Chương Bánh lắc và dây tóc song ngữ (G04) | `2f322dc` |
| 13/09 | Hành trình lịch sử sáu chương song ngữ (G05) | `f42c11e` |
| 14/09 | Trải nghiệm giải phẫu song ngữ (G06-A) | `9838fb3` |
| 14/09 | So sánh mẫu iconic song ngữ (G06-B) | `ced15b8` |
| 15/09 | Infographic bộ thoát có dẫn dắt, song ngữ (G06-C) | `cf650b3` |
| 18/09 | Bài thử nội dung G07 | `d5c2eed` |
| 19/09 | Sơ đồ tiến hóa Speedmaster (G08, bộ thứ ba) | `403a8e3` |
| 19/09 | Favicon, ID trùng, kiểm khuyến cáo phụ thuộc (G09) | `cbf1850`, `60b303e`, `521f5fa` |

Nói cho đúng: **toàn bộ chín gói G01 đến G09 của kế hoạch 12/09 đã được thực hiện trong bảy ngày.** Đây là tốc độ rất cao. Tôi không có nhận xét tiêu cực nào về phần thực thi.

## 1.3. Chất lượng dữ kiện lịch sử — kỷ luật dẫn nguồn là lợi thế rõ rệt

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.1):** tiêu đề ban đầu của mục này là "chỗ trang vượt chuẩn quốc tế" — chưa có khảo sát đối chiếu đủ để xếp hạng. Phép so dưới đây là quan sát trực tiếp một trang (FHH) tại một thời điểm; kết luận giữ được là trang có kỷ luật dẫn nguồn, phân mức xác quyết và ghi giới hạn dữ kiện rõ ràng, không phải xếp hạng tổng thể.

Đo trực tiếp `src/data/timeline.json` hôm nay:

- **28 mốc**, **52 nguồn** kèm ngày kiểm và trường `proves` nói rõ nguồn đó chứng minh điều gì
- **19/28 mốc** ghi rõ giới hạn của dữ kiện
- **6 mức xác quyết** phân biệt rạch ròi: `first-known` (3), `recorded` (5), `brand-claim` (14), `context` (3), `brand-first` (2), `type-first` (1)
- Tách `year` và `timeLabel` thành hai trường riêng để giữ được dấu xấp xỉ ("~1510", "1914-1918")

Hôm nay tôi đọc trực tiếp dòng thời gian của **Fondation de la Haute Horlogerie** (`hautehorlogerie.org/en/watches-and-culture/history`) để đối chiếu. Kết quả:

| Tiêu chí | FHH | Trang này |
|---|---|---|
| Trích nguồn từng mốc | **Không có mốc nào** | 52 nguồn, có ngày kiểm |
| Phân biệt mức xác quyết | **Không có** | 6 mức |
| Ghi giới hạn của dữ kiện | **Không có** | 19/28 mốc |
| Mốc sau năm 2000 | **Không có** (dừng ở 1999) | Có (2001, 2013 đến nay) |
| Số mốc | **133** (71 mốc chế tác + 62 sự kiện thế giới) | 28 |
| Hình minh họa | Ảnh tư liệu bảo tàng, chân dung, tranh | SVG tự dựng |
| Video nhúng | Có ở vài mốc | Không |
| Luồng song song | **Có** — "World Events" chạy cạnh "History of time" | Không (3/28 mốc thuộc loại văn hóa) |

*Cách đo, thực hiện trên trang FHH ngày 19/09: đếm nhãn "History of time" và "World Events" trong nội dung trang. Về trích nguồn — toàn trang chỉ có **ba liên kết ra ngoài**, và cả ba đều là bản đồ, Instagram và LinkedIn của chính FHH; không có một liên kết nguồn nào cho bất kỳ mốc nào. Trang cũng không xuất hiện từ "Source" hay "Reference".*

Đây là kết quả đáng chú ý: **về kỷ luật dẫn nguồn, trang vượt tổ chức chuẩn của ngành.** Về mật độ mốc và sự phong phú của hình ảnh thì còn cách xa. *(Đính chính H01: so sánh trên quan sát một trang FHH tại một thời điểm; chưa đủ cơ sở kết luận xếp hạng tổng thể — xem ghi chú đầu mục 1.3.)*

## 1.4. Kỹ thuật

- **0** chỗ ép kiểu `as any` trong `src/`
- `npm run check` chạy **31 script** kiểm; sau `astro build` chạy thêm **14 script** nữa
- `check:types` (`astro check`) nằm trong chuỗi bắt buộc
- `robots.txt` phân hai chính sách rõ ràng: chặn 13 bot huấn luyện, mở cho bot tìm kiếm và bot đọc theo yêu cầu
- Trang khả năng tiếp cận đã công bố
- Tìm kiếm Pagefind chạy thuần trên máy người đọc, truy vấn không rời trình duyệt

---

# PHẦN 2 — BA CHỖ HỞ LỚN NHẤT

## 2.1. Đo lường — đã sửa lại sau khi kiểm production

**Bản đầu tiên của mục này kết luận sai.** Tôi đã viết rằng trang "không đo được gì" và nguyên nhân "gần như chắc chắn là Web Analytics chưa bật trên Vercel". Sau khi mở production bằng trình duyệt thật và đo, kết luận đó **không đúng**.

### Vercel Analytics đang chạy bình thường

| Kiểm trên production ngày 19/09 | Kết quả |
|---|---|
| Thẻ `<vercel-analytics>` trong HTML | **Có** |
| `window.va` | Đã định nghĩa |
| `window.vam` | `production` |
| Script đã tải | `/8353d7638e565049/script.js`, `data-sdkn="@vercel/analytics/astro"` v2.0.1 |
| Beacon lượt xem trang | `/8353d7638e565049/view` — **HTTP 200**, 302 byte |

Dữ liệu đang được thu thập, và có thể đã tích lũy từ lâu.

### Vì sao cả tôi và báo cáo G03 đều nhìn sót

Khi Web Analytics được bật, Vercel **không** phục vụ script ở `/_vercel/insights/script.js` như tài liệu mô tả. Nó sinh một **đường dẫn ngẫu nhiên** — ở đây là `/8353d7638e565049/` — chứa cả script lẫn ba điểm nhận dữ liệu, để trình chặn quảng cáo không nhận diện được theo tên.

Hệ quả: **mọi phép đo lọc theo chuỗi "insights" đều trả về 0, dù dữ liệu vẫn đang chảy.** Báo cáo G03 lọc đúng như vậy. Sáng nay tôi đọc mã trong bản build cục bộ rồi suy ra nguyên nhân mà không mở production kiểm. Và ngay cả lần đầu đo trên production, tôi cũng lọc theo "insights" và cũng nhận 0 — chỉ khi liệt kê toàn bộ tài nguyên đã tải, không lọc gì, mới thấy.

Ba lần nhìn sót cùng một chỗ, vì cùng một giả định. Cách đo đúng cho lần sau là liệt kê hết rồi đọc, đừng lọc theo tên mình đoán trước.

### Khoảng trống thật còn lại

Chỉ còn **Google Search Console** — vẫn chưa xác minh được là đã thiết lập hay chưa, vì không ai trong nhóm có quyền đăng nhập.

Đây vẫn là việc chỉ anh làm được, nhưng mức độ nhẹ hơn tôi báo ban đầu: trang **không** mù hoàn toàn. Nó đã biết người vào đọc gì; chỉ chưa biết người ta gõ gì trên Google để tìm ra nó.

## 2.2. Bản tiếng Anh: vỏ đã đủ, ruột còn thiếu

Trang chủ tiếng Anh tự ghi rõ, rất trung thực:

> Open library: 3 brands - 4 iconic watches - 14 mechanism articles - 23 terms

Toàn bộ lớp trải nghiệm đã song ngữ: lịch sử sáu chương, giải phẫu, so sánh, infographic bộ thoát, lộ trình học. Nhưng **tệp bài tiếng Anh mới nhất được thêm vào ngày 04/09** (commit `90d7ceb` và `20d0aa1`) — hai tuần rưỡi không có bài EN mới nào.

*Nói cho chính xác: nội dung EN không phải hoàn toàn đứng yên. Từ 12/09 có **bốn tệp EN được sửa** (`balance-and-hairspring`, `escapement`, `water-resistance`, `omega-speedmaster`) như một phần của các gói trải nghiệm. Nhưng đó là cập nhật bài cũ, không phải bài mới.*

Hệ quả cụ thể: một người nước ngoài vào `/en/history/`, thấy hành trình sáu chương làm rất tốt, bấm "Read more" ở mốc Submariner thì có bài; bấm ở mốc Reverso, Royal Oak, Nautilus, El Primero, Freak thì **không có bài EN nào**. Trải nghiệm tốt dẫn thẳng vào ngõ cụt.

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.1):** các mốc chưa có bài EN **không dẫn vào ngõ cút**. `HistoryTimeline.astro` giữ liên kết tới bản tiếng Việt kèm nhãn minh bạch "Vietnamese only — no English version yet" (hằng `viOnly` trong component). Vấn đề đúng là **thiếu bản dịch**, không phải liên kết hỏng hay trang 404.

Đây là chỗ mất cân đối lớn nhất của trang hiện nay: hạ tầng trình bày ở mức quốc tế, thư viện phía sau ở mức 3 thương hiệu. *(Đính chính H01: nhận xét "mức quốc tế" là cảm nhận chưa có khảo sát đối chiếu — xem ghi chú đầu mục 1.3.)*

## 2.3. Sản lượng bài viết đã chậm hẳn lại

Bảy ngày qua có **đúng một bài mới**: `src/content/coChe/vi/bo-may-in-house.md`.

Tôi không coi đây là lỗi — các gói trải nghiệm ngốn rất nhiều công và giá trị của chúng là có thật. Nhưng cần nhìn thẳng: trang đang đầu tư gần như toàn bộ nguồn lực vào cách trình bày nội dung đã có, chứ không mở rộng nội dung.

## 2.4. Bốn việc kỹ thuật còn treo (mức độ thấp hơn)

| Việc | Hiện trạng đo ngày 19/09 |
|---|---|
| Nguồn cấp tin RSS | Chưa có. `public/` chỉ gồm `favicon.svg`, `images/`, `og-default.jpg`, `robots.txt` |
| Tệp `llms.txt` | Chưa có |
| Ảnh định dạng mới (webp/avif) | Chưa có. `public/images` nặng 1,2 MB; tấm lớn nhất là `og/hero-bg.jpg` 318 KB |
| CSP | Vẫn `Content-Security-Policy-Report-Only` và **không có `report-uri`** — tức là vừa không chặn, vừa không báo cáo |

Lưu ý về prompt đã soạn: `docs/prompt-goi-ky-thuat-rss-llms-typecheck.md` **đã lỗi thời ở Việc A** (phần `astro check`), vì việc đó đã xong. Nếu dùng lại thì phải bỏ Việc A, chỉ giữ Việc B và C.

---

# PHẦN 3 — ĐỀ XUẤT VỀ NỘI DUNG

Thứ tự dưới đây xếp theo **giá trị trên mỗi giờ công**, không theo mức độ thú vị.

## 3.1. Ưu tiên 1 — Dịch bài lấp ngõ cút tiếng Anh (đính chính H01: đúng 13 bài — 7 mẫu biểu tượng + 6 thương hiệu)

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.1):** danh sách 15 bài iconic bên dưới đã được đối chiếu máy lại với `timeline.json` và `ARTICLE_PAIRS`: tập cần dịch là **13 bài gồm 7 mẫu biểu tượng và 6 thương hiệu** (đợt 1: 5 iconic, đợt 2: 2 iconic, đợt 3: 6 thương hiệu — xem [prompt-dich-13-bai-lap-ngo-cut-en.md](prompt-dich-13-bai-lap-ngo-cut-en.md) và mục 5 kế hoạch hợp nhất). Danh sách 15 giữ nguyên để truy vết cách chọn ban đầu; giao việc theo gói H03, không theo danh sách này.

**Vì sao đứng đầu:** không phải viết mới, không phải nghiên cứu nguồn mới. Bài tiếng Việt đã qua kiểm chứng, đã có nguồn, đã có liên kết biên tập. Việc còn lại thuần là dịch và soát.

**Vì sao cấp bách:** đây là thứ chặn toàn bộ giá trị của lớp trải nghiệm EN vừa dựng xong. Bỏ tiền dựng nhà rồi không có gì bày bên trong.

**Đề xuất chọn 15 mẫu theo đúng những mốc đã có trong dòng thời gian**, để mọi liên kết "Read more" trên trang lịch sử EN đều có đích thật:

Reverso, IWC Mark XI, Fifty Fathoms, Rolex GMT-Master, Royal Oak, Patek Nautilus, Zenith El Primero, Freak, Cartier Santos, Speedmaster (đã có), Submariner (đã có), Cartier Tank (đã có), Explorer, Datejust, Heuer Carrera.

**Điều kiện:** bản EN không được mạnh hơn bản VI. Chỗ nào bản VI ghi giới hạn thì bản EN phải ghi y hệt.

## 3.2. Ưu tiên 2 — Bài "Swiss Made"

Hồ sơ nguồn đã xong từ 12/09 (`docs/ho-so-nguon-swiss-made.md`), ba nguồn đều là văn bản pháp luật và cơ quan nhà nước. Chỉ còn chờ anh xác nhận hai điểm ở mục 6 của hồ sơ đó.

Đây là món rẻ nhất còn tồn đọng: dàn ý đã có, nguồn đã có, chỗ đặt đã đề xuất (mục Hướng dẫn).

## 3.3. Ưu tiên 3 — Thêm lớp "Bối cảnh thế giới" vào dòng thời gian

Đây là ý mới rút ra từ việc đọc FHH hôm nay, và là **cách tăng chiều sâu rẻ nhất mà tôi thấy**.

FHH chạy hai luồng song song trong cùng một dòng thời gian: "History of time" (mốc chế tác) và "World Events" (sự kiện thế giới). Người đọc thấy ngay đồng hồ bỏ túi thu nhỏ vào lúc Columbus đi tìm châu Mỹ, thấy Harwood nộp bằng tự động vào lúc Baird trình diễn truyền hình.

Trang này **đã có sẵn hạ tầng**: trường `type` đã hỗ trợ giá trị `culture`, bộ lọc trên giao diện đã có nút "Văn hóa". Nhưng hiện chỉ có **3/28 mốc** thuộc loại đó.

**Đề xuất:** thêm khoảng 10 đến 12 mốc bối cảnh thế giới, mỗi mốc một câu, không cần bài đọc thêm. Không phải viết bài, chỉ là thêm dòng vào `timeline.json` kèm nguồn. Ghi chú của nhà sưu tầm ở cuối trang lịch sử hiện đã mời người đọc "để ý cách các mốc văn hóa định hình lại máy móc và thương hiệu" — nhưng dữ liệu chưa đủ để lời mời đó có nghĩa.

## 3.4. Ưu tiên 4 — Hai bài còn lại của loạt "hiểu đúng"

Bài về bộ máy in-house đã làm. Còn hai bài:

- Số chân kính nói được và không nói được điều gì
- Vì sao chỉ số chống nước không tự quyết định mọi hoạt động sử dụng

Lưu ý ràng buộc GPT Work đã đặt và tôi đồng ý: không đặt tiêu đề kiểu "30 m không bơi được" như một quy tắc chung.

## 3.5. Ưu tiên 5 trở xuống — giữ nguyên danh mục đã chốt, chưa mở

Nghề tráng men (cần dựng mục "Nghề chế tác" trước), bốn phức tạp chưa có bài, vật liệu vỏ và dây tóc, cấu trúc ngành. Bốn cụm này đều cần hồ sơ nguồn riêng. Không nên mở khi ba ưu tiên trên chưa xong.

---

# PHẦN 4 — ĐỀ XUẤT VỀ KỸ THUẬT TRÌNH BÀY

## 4.1. Việc cần làm trước mọi việc khác: chốt một bản quy chuẩn hình ảnh

Câu hỏi của anh là "thống nhất toàn trang". Muốn thống nhất thì phải có một văn bản để đối chiếu, mà hiện nay chưa có.

Hiện trang đang dùng **bốn ngôn ngữ hình khác nhau**, mỗi loại hình thành ở một thời điểm khác nhau:

| Loại | Nơi dùng | Đặc điểm hiện tại |
|---|---|---|
| SVG dòng thời gian | 28 mốc lịch sử | Nền navy, nét đồng thau, hoa văn guilloche, gạch khắc |
| Infographic cơ chế | Các bài cơ chế | Đã nâng chất liệu một phần (bộ thoát), phần còn lại chưa |
| Ảnh AI | 1 tấm, chương bánh lắc | Navy và đồng thau, ánh sáng một phía |
| Sơ đồ giải phẫu và tiến hóa | Trang giải phẫu, ba bộ tiến hóa | Ngôn ngữ riêng |

**Đề xuất:** soạn `docs/QUY-CHUAN-HINH-ANH.md` chốt đúng bảy điều, rồi mọi hình mới phải theo:

1. Bảng màu (mã màu cụ thể cho nền, nét chính, nét phụ, điểm nhấn, ở cả chế độ sáng và tối)
2. Độ dày nét theo cấp (nét chính, nét phụ, nét ghi chú)
3. Hướng ánh sáng và kiểu bóng
4. Tỷ lệ khung chuẩn cho từng vị trí sử dụng
5. Quy tắc chữ trong hình: **không có chữ trong hình**, mọi nhãn đặt ở HTML để dịch được và đọc được bằng công cụ hỗ trợ (chương bánh lắc đã làm đúng điều này)
6. Quy tắc mô tả thay thế và chú thích
7. Quy tắc ảnh AI: khi nào được dùng, phải ghi nhãn thế nào, lưu prompt ở đâu

Việc này mất khoảng nửa ngày và sẽ tiết kiệm rất nhiều lần sửa về sau. **Tôi soạn được bản này nếu anh muốn.**

## 4.2. Hai kỹ thuật của FHH đáng học

**Học: cho phóng to hình.** FHH gắn mỗi hình nhỏ với một bản lớn hơn, bấm vào là mở. SVG của trang này vẽ rất kỹ nhưng hiển thị ở khổ thẻ nhỏ, người đọc không thấy được chi tiết. Thêm lớp phóng to là việc nhẹ và hiệu quả rõ.

**Học: hai luồng song song** — đã nêu ở mục 3.3.

## 4.3. Hai kỹ thuật của FHH **không** nên học

**Không nhúng video bên thứ ba.** FHH nhúng YouTube ở vài mốc. Làm vậy sẽ kéo theo: phụ thuộc nền tảng ngoài, phải nới CSP, thêm cookie theo dõi của bên thứ ba, và tốc độ tải xấu đi. Trang đang có chính sách quyền riêng tư sạch (tìm kiếm không gửi truy vấn đi đâu) — không nên đánh đổi.

**Không chạy theo mật độ mốc.** FHH có 133 mốc nhưng không mốc nào có nguồn. Trang này có 28 mốc với 52 nguồn. Đổi 28 lấy 133 mà mất kỷ luật nguồn là đi lùi, không phải tiến.

## 4.4. Việc kỹ thuật nên giao GLM, xếp theo thứ tự

1. **RSS và `llms.txt`** — dùng lại `docs/prompt-goi-ky-thuat-rss-llms-typecheck.md` nhưng **bỏ hẳn Việc A** (đã xong). Chân trang đang hứa "tính năng nhận bài mới qua thư đang được chuẩn bị"; RSS là cách thực hiện lời hứa đó mà không phải dựng hệ thống gửi thư.

   > **Đính chính H01 (Kế hoạch hợp nhất mục 3.1):** RSS là kênh theo dõi qua **trình đọc tin**, không phải dịch vụ gửi email — chân trang cần được sửa cách nói theo hướng đó khi làm H08. `llms.txt` hạ xuống **thử nghiệm ưu tiên thấp** (gói H13), không làm kèm RSS.

2. **Phóng to hình dòng thời gian** — theo mục 4.2.
3. **Chuyển ảnh sang webp** với fallback jpg — 1,2 MB ảnh hiện nay chưa phải vấn đề lớn, nhưng nếu nhân rộng ảnh AI thì phải làm trước.
4. **CSP** — hoặc bổ sung `report-uri` để Report-Only có tác dụng thật, hoặc chuyển sang chế độ chặn. Giữ nguyên như hiện nay là trạng thái vô nghĩa: không chặn, không báo. Đây là quyết định vận hành, GPT Work đã đề nghị chỉ làm sau khi anh phê chuẩn riêng — tôi đồng ý.

   > **Đính chính H01 (Kế hoạch hợp nhất mục 3.1):** Report-Only hiện không cưỡng chế và chưa có endpoint nhận báo cáo tập trung, nhưng vẫn hỗ trợ quan sát vi phạm trên trình duyệt từng máy — gọi "vô nghĩa" là quá mức. Việc CSP thuộc gói H11, có kiểm trên môi trường có header thật trước khi bật cưỡng chế.

---

# PHẦN 5 — CÓ THỂ THAY TOÀN BỘ ẢNH LỊCH SỬ BẰNG AI KHÔNG?

## Trả lời ngắn: không. Và lần này câu trả lời đến từ chính dự án, không phải từ suy đoán của tôi.

## 5.1. Bằng chứng nằm trong mã nguồn của chính anh

Chương Bánh lắc và dây tóc đã chạy xong và đã nghiệm thu. Đọc phần ghi chú đầu tệp `src/components/history/BalanceHairspringChapter.astro`, dòng 5 đến 13:

> Chương mẫu ghép ba lớp: (1) ảnh AI tái dựng bối cảnh, (2) bối cảnh lịch sử đúng phạm vi nguồn G02, (3) sơ đồ nguyên lý SVG tương tác.
>
> Nguyên tắc: ảnh AI **CHỈ** tạo bối cảnh; mọi chi tiết cơ khí nằm ở SVG riêng, suy từ nguồn — **KHÔNG suy cấu tạo từ ảnh**.

Và chú thích hiển thị cho người đọc, ở cả hai ngôn ngữ:

- Tiếng Việt: "Minh họa AI tái dựng — không phải ảnh tư liệu"
- Tiếng Anh: "AI reconstruction — not a historical photograph"

Đây chính là câu trả lời, đã được dự án tự rút ra qua thực hành: **AI làm được không khí, không làm được cơ cấu.** Đó là ranh giới, và nó đã được mã hóa thành nguyên tắc vận hành chứ không còn là ý kiến.

## 5.2. Áp ranh giới đó vào 28 mốc

Tôi phân loại lại theo trường `claimLevel` thật trong dữ liệu, không ước lượng:

| Nhóm | Số mốc | AI có dùng được không |
|---|---:|---|
| `brand-claim` và `brand-first` — gắn với một sản phẩm có nhãn hiệu cụ thể | **16** | **Không.** Hai lý do độc lập |
| `context` — bối cảnh lịch sử, không có sản phẩm | 3 | Được |
| `first-known` và `recorded` — phát minh và cơ chế | 8 | Nên giữ SVG |
| `type-first` | 1 | Tùy mốc |

**Vì sao 16 mốc nhãn hiệu là không:**

- **Lý do chuyên môn:** AI vẽ sai vành bezel, sai hình dáng kim, sai mặt cắt vấu. Người chơi hai mươi năm nhìn ra trong ba giây. Một tấm ảnh Submariner sai vành làm hỏng uy tín của cả 52 nguồn mà trang đã dày công dẫn.
- **Lý do sở hữu trí tuệ:** đây là hình sản phẩm mang nhãn hiệu đang được bảo hộ. GPT Work đã cảnh báo đúng rằng tài liệu trước của tôi diễn giải điều khoản của nhà cung cấp AI quá chắc chắn. Tôi rút lại cách nói đó. Cách nói đúng: **đây là rủi ro chưa được thẩm định, và trang không có lý do gì phải nhận rủi ro đó để đổi lấy một tấm hình đẹp hơn.**

**Vì sao 8 mốc cơ chế nên giữ SVG:** SVG được dựng từ nguồn kỹ thuật, có thể đối chiếu từng chi tiết với tài liệu. Ảnh AI không truy được về nguồn nào. Với một trang lấy dẫn nguồn làm giá trị cốt lõi, đây là khác biệt về nguyên tắc, không phải về thẩm mỹ. *(Đính chính H01: khả năng truy nguồn là lợi thế của SVG; độ chính xác của từng hình vẫn cần thẩm định riêng, không coi "dựng từ nguồn" là "đúng" tự động — Kế hoạch hợp nhất mục 3.1.)*

## 5.3. Cách đặt câu hỏi đúng hơn

Thay vì "thay toàn bộ", nên hỏi: **"thêm một lớp ảnh bối cảnh bên cạnh lớp SVG kỹ thuật, ở những mốc mà bối cảnh có ý nghĩa"**.

Mỗi mốc có thể có hai hình:

- **Lớp kỹ thuật (giữ nguyên SVG):** cho biết cái gì đã thay đổi trong cỗ máy
- **Lớp bối cảnh (thêm ảnh AI khi hợp):** cho biết điều đó xảy ra trong thế giới nào

Chương bánh lắc đã chứng minh mô hình hai lớp này chạy được, và trông tốt. Nhân rộng mô hình đó là hợp lý. Thay thế thì không.

## 5.4. Chi phí thực tế nếu nhân rộng, để anh cân nhắc

Đây là phần tôi chưa nói rõ trong các tài liệu trước, và nó quan trọng cho quyết định.

Mỗi tấm ảnh AI đưa lên trang cần:

1. Viết câu nội dung riêng cho mốc đó (đoạn phong cách thì dùng chung)
2. Tạo, xem, thường phải tạo lại hai đến ba lần
3. Kiểm bốn câu: có chữ lọt vào không, chi tiết có quá rõ không, có sai thời đại không, tông màu có khớp không
4. Cắt về tỷ lệ chuẩn, nén xuống dưới 150 KB
5. Viết mô tả thay thế bằng cả hai ngôn ngữ
6. Viết chú thích bằng cả hai ngôn ngữ
7. Lưu prompt và bản chọn vào hồ sơ để sau này truy được

Ước tính **30 đến 45 phút một tấm** với người đã quen tay. Mười tấm là **năm đến bảy giờ làm việc của anh** — và **không giao được cho GLM**, vì người duyệt hình phải là anh, không phải mô hình.

Vì vậy tôi đề nghị: **làm thêm ba tấm trước, không làm mười tấm.** Ba mốc `context` đã có sẵn trong dữ liệu là điểm khởi đầu tự nhiên. Xem ba tấm đó đứng cạnh nhau trên trang lịch sử thế nào rồi mới quyết định có đi tiếp không.

---

# PHẦN 6 — ĐỀ XUẤT THỨ TỰ TRIỂN KHAI

| Thứ tự | Việc | Ai làm | Ước lượng |
|---|---|---|---|
| **1** | Xác minh Search Console; đọc số Vercel Analytics đã có sẵn | **Anh Vinh** | 20 phút |
| **2** | Dịch 15 bài iconic sang tiếng Anh *(đính chính H01: đúng 13 bài = 7 iconic + 6 thương hiệu, ba đợt 5 + 2 + 6 theo H03)* | GLM, tôi soát | 2 đến 3 đợt |
| **3** | RSS và `llms.txt` (bỏ Việc A khỏi prompt cũ) *(đính chính H01: RSS là H08; `llms.txt` là H13, thử nghiệm ưu tiên thấp)* | GLM | 1 gói |
| **4** | Bản quy chuẩn hình ảnh | Tôi soạn, anh duyệt | Nửa ngày |
| **5** | Thêm 10 đến 12 mốc bối cảnh thế giới vào dòng thời gian | Tôi soạn hồ sơ nguồn, GLM đưa vào | 1 gói |
| **6** | Bài Swiss Made (VI, cân nhắc EN cùng lúc) | Tôi soạn, GLM đưa lên | 1 gói |
| **7** | Ba tấm ảnh AI cho ba mốc bối cảnh | Anh tạo, GLM tích hợp | 2 giờ của anh |
| **8** | Phóng to hình dòng thời gian | GLM | 1 gói nhỏ |
| **9** | Hai bài "hiểu đúng" còn lại | Tôi soạn | 2 gói |
| **10** | Quyết định về CSP | Anh quyết, GLM thực hiện | Sau khi có mục 1 |

Việc số 1 đứng đầu không phải vì nó khó, mà vì **chừng nào chưa có nó thì chín việc còn lại đều không đo được kết quả.**

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.1):** thiếu Search Console vẫn nghiệm thu được độ bao phủ EN, lỗi route, tốc độ trong phòng thử và khả năng sử dụng; Search Console bổ sung bằng chứng tìm kiếm chứ không phải điều kiện tiên quyết của mọi việc còn lại (kế hoạch hợp nhất mục 4: H11 không phụ thuộc Search Console; H02 có thể chạy song song với H03/H04).

---

# PHẦN 7 — NĂM CÂU HỎI CẦN ANH TRẢ LỜI

1. **Về đo lường:** Vercel Analytics đã chạy sẵn — anh vào tab Analytics đọc số giúp tôi. Còn Search Console thì anh tự xác minh hay cần hướng dẫn chi tiết hơn?

2. **Về bản tiếng Anh:** anh có đồng ý đặt việc dịch 15 bài iconic lên trước mọi nội dung mới không? Nếu có, anh muốn chia làm mấy đợt? *(Đính chính H01: tập chính xác là 13 bài = 7 iconic + 6 thương hiệu, chia ba đợt 5 + 2 + 6 theo gói H03-A/B/C.)*

3. **Về lớp bối cảnh thế giới:** anh có muốn thêm 10 đến 12 mốc sự kiện thế giới vào dòng thời gian theo cách FHH làm không? Nếu có, tôi soạn hồ sơ nguồn trước.

4. **Về bản quy chuẩn hình ảnh:** anh có muốn tôi soạn `docs/QUY-CHUAN-HINH-ANH.md` trước khi vẽ thêm hình nào không?

5. **Về bài Swiss Made:** hai câu hỏi ở mục 6 của `docs/ho-so-nguon-swiss-made.md` vẫn chờ anh — xếp vào mục Hướng dẫn có đúng ý anh không, và có viết bản tiếng Anh cùng lúc không?

---

# PHỤ LỤC — BẢNG XÁC MINH SAU BA LƯỢT KIỂM

Tài liệu này đã qua **ba lượt kiểm** theo yêu cầu. Bảng dưới ghi từng kết luận, cách đo và trạng thái cuối, để lần rà sau không phải đo lại từ đầu.

## Đã sửa vì sai

| Kết luận ban đầu | Đúng là | Cách phát hiện |
|---|---|---|
| Trang không đo được gì; Web Analytics chưa bật | **Analytics đang chạy**, beacon `/view` trả HTTP 200 | Mở production bằng trình duyệt, liệt kê **toàn bộ** tài nguyên đã tải thay vì lọc theo chuỗi `insights` |
| 25 commit từ `4129437` | **21 commit** | `git rev-list --count 4129437..HEAD` |
| 13 tỷ lệ khung infographic | **11 tỷ lệ trên 12 sơ đồ** | Đếm `viewBox` theo từng tệp; loại 9 icon `24x24` của `MechanismAnimation.astro` |
| Đợt 2 có 3 bài, gồm `cartier-santos` | **2 bài**; `cartier-santos` không tồn tại | `ls src/content/mauIconic/vi/ | grep cartier` cho đúng `cartier-tank.md` |
| FHH có khoảng 120 mốc | **133 mốc** (71 chế tác + 62 sự kiện thế giới) | Đếm nhãn trực tiếp trên trang FHH |
| Hai bộ hình đảo ngược nhau | Đúng nhưng **chỉ rõ rệt ở chế độ sáng** | Đối chiếu `--c-page`, `--ig-bg` và nền SVG ở cả hai chế độ |

## Đã xác minh là đúng

| Kết luận | Cách đo | Kết quả |
|---|---|---|
| Không còn ép kiểu `as any` | `grep -rn "as any" src/` | 0 |
| `astro check` nằm trong chuỗi build | Đọc `package.json` | `build` gọi `check`, `check` gọi `check:types` |
| 28 SVG dòng thời gian rất nhất quán | Đếm `viewBox` và mọi dạng mã màu | 28/28 khung `800x600`, đúng 3 màu |
| SVG dòng thời gian không theo chế độ tối | Đếm tệp có `var(--` | 0/28 |
| 12 sơ đồ trộn hai hệ token | Đếm `var(--ig-*)` và `var(--obs-*)` riêng từng tệp | 12/12 dùng cả hai |
| 209 bài VI, 53 bài EN | Đếm tệp `.md` theo thư mục `vi/` và `en/` | Khớp con số trang chủ EN tự công bố |
| 23 đích "Read more", 13 thiếu bản EN | Đối chiếu `timeline.json` với `ARTICLE_PAIRS` bằng mã | 10 có, 13 thiếu |
| 16/28 mốc gắn nhãn hiệu | Đếm `claimLevel` | `brand-claim` 14 + `brand-first` 2 |
| 52 nguồn, 19 mốc ghi giới hạn | Đếm trường `sources` và `limit` | Khớp |
| FHH không trích nguồn mốc nào | Đếm liên kết ra ngoài trên trang FHH | Đúng 3 liên kết, cả ba là bản đồ và mạng xã hội của FHH |
| Chưa có RSS, chưa có `llms.txt` | Gọi thẳng trên production | `/rss.xml`, `/en/rss.xml`, `/llms.txt` đều **404** |
| Sơ đồ trang hoạt động | Gọi `/sitemap-index.xml` | **200** |
| Ảnh AI chưa áp vào dòng thời gian | Gọi hai đường dẫn | `trench-watch.jpg` **404**, `trench-watch.svg` **200** |
| CSP không chặn và không báo cáo | Đọc `vercel.json` | `Report-Only`, không có `report-uri`, không có `report-to` |
| Bảy ngày chỉ thêm một bài VI | `git log --since=2026-09-12 --diff-filter=A` | Đúng một tệp: `bo-may-in-house.md` |

## Vẫn chưa xác minh được

| Mục | Vì sao |
|---|---|
| Google Search Console đã thiết lập chưa | Không có quyền đăng nhập. Repo không có thẻ `google-site-verification`, nhưng xác minh kiểu Domain dùng bản ghi DNS chứ không dùng thẻ — **nên sự vắng mặt này không chứng minh điều gì** |
| Số liệu Vercel Analytics đã tích lũy | Không có quyền đăng nhập bảng điều khiển. Chỉ xác nhận được là dữ liệu **đang được gửi** |
| Kỹ thuật trình bày của các trang quốc tế khác | Chỉ mở trực tiếp được FHH trong phiên này |

---

**Ghi chú về giới hạn của tài liệu này:**

- **Bản này đã qua ba lượt kiểm ngày 19/09.** Sáu chỗ sai đã sửa, xem bảng phụ lục ngay trên.
- Tôi **không** đăng nhập được bảng điều khiển nào — mọi nhận định về Search Console đều dừng ở mức "chưa quan sát được", không phải "bằng không".
- Tôi **chỉ xem trực tiếp được một** trang quốc tế trong lượt này (FHH). Các trang khác không mở được trong phiên làm việc hôm nay, nên tôi không đưa nhận xét về chúng vào tài liệu.
- Mọi con số về mã nguồn và nội dung trong tài liệu này đều được đo lại hôm nay trên HEAD `521f5fa`, không kế thừa từ các lần rà trước.
