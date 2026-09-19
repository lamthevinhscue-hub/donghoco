# KẾ HOẠCH PHÁT TRIỂN HỢP NHẤT — KIẾN THỨC ĐỒNG HỒ CƠ

Ngày lập: 19/09/2026. Nền kiểm chứng: `D:\Watch web build`, HEAD `a715fd0`, 268 commit trên `origin/main` ở lượt rà soát trong phiên này.

Trạng thái: báo cáo đề xuất để chủ dự án duyệt; chưa triển khai các gói dưới đây. Đây là bản kế hoạch tiếp nối báo cáo 05/09 và kế hoạch 12/09, hợp nhất bốn tài liệu ngày 19/09 sau khi thẩm định. Những nội dung đã hoàn thành không được giao lại như công việc mới.

Bộ hướng dẫn thực hiện dành cho GLM: [14 gói giao việc, thứ tự gửi và mẫu nghiệm thu](BO-GIAO-VIEC-GLM-14-GOI-2026-09-19.md). Chủ dự án chỉ cần gửi câu lệnh bắt đầu trong bộ hướng dẫn; chưa cần thao tác code.

## 1. Định hướng và kết quả kỳ vọng

Phát triển kienthucdonghoco.vn thành thư viện học đồng hồ cơ đáng tin cậy, có đường đọc rõ ràng, lịch sử trực quan và nội dung Việt–Anh tương ứng ở những hành trình trọng tâm. Ba giá trị cần củng cố là độ tin cậy chuyên môn, khả năng học và tra cứu, cùng sự nhất quán trong trải nghiệm.

Giai đoạn tiếp theo tập trung hoàn thiện 13 bài EN đang thiếu trên hành trình lịch sử; vận hành đo lường; bổ sung nội dung giải thích có nguồn; chuẩn hóa hình ảnh và khả năng tiếp cận. Việc tăng số trang, thêm ảnh AI hoặc thêm tương tác chỉ có ý nghĩa khi phục vụ các mục tiêu này.

Kết quả có thể nghiệm thu trực tiếp: 23/23 đích đọc thêm hiện có của timeline có bài EN tương ứng; thư viện EN tăng từ 53 lên 66 tệp nếu không có thay đổi khác; hình mới có hồ sơ nguồn hoặc nhãn tái dựng; các gói vượt qua kiểm tra và kiểm thử thủ công phù hợp. Tăng lưu lượng và thứ hạng là kết quả cần theo dõi, không phải cam kết của kế hoạch.

## 2. Nền tảng đã có và giới hạn bằng chứng

| Hạng mục | Hiện trạng | Ý nghĩa |
|---|---|---|
| Nội dung VI | 73 thương hiệu, 69 mẫu biểu tượng, 19 cơ chế, 33 thuật ngữ, 14 hướng dẫn, 1 trang pháp lý | Đã có cơ sở để tổ chức các hành trình học chuyên sâu |
| Nội dung EN | 3 thương hiệu, 4 mẫu biểu tượng, 14 cơ chế, 23 thuật ngữ, 9 hướng dẫn | Hạ tầng song ngữ đã có; cần bổ sung bài theo đường đọc |
| Lịch sử | 28 mốc, 52 mục nguồn, 19 mốc có giới hạn dữ kiện | Có cơ chế minh bạch phạm vi khẳng định; số mục nguồn không đồng nghĩa 52 nguồn độc lập |
| Trải nghiệm | Sáu chương lịch sử, giải phẫu, so sánh, bộ thoát có dẫn dắt; ba bộ tiến hóa song ngữ | Có thể khai thác thêm giá trị bằng nội dung phù hợp |
| Kỹ thuật | Astro 7.3.3; `astro check` nằm trong chuỗi kiểm và build; không tìm thấy `as any` trong `src` | Các nhận xét cũ yêu cầu bổ sung type check đã lỗi thời |
| Bản build đã kiểm trong phiên | 290 trang HTML, 67 trang EN; kiểm 21.154 liên kết nội bộ không phát hiện liên kết gãy | Bằng chứng kiểm tự động tại thời điểm rà soát, không chứng minh mọi nội dung đúng hoặc đạt toàn bộ WCAG |
| Git | Local và `origin/main` cùng HEAD ở lượt fetch trước; nhiều tài liệu còn untracked | Cần chọn lọc lưu hồ sơ chính thức, tránh mất tài liệu và dùng nhầm prompt cũ |

Lượt này đọc lại bốn tài liệu, đối chiếu mã nguồn, đếm dữ liệu và tham khảo tài liệu chính thức. Không chạy lại toàn bộ build vì chỉ bổ sung báo cáo; kết quả build phía trên kế thừa lượt kiểm trong cùng phiên. Không truy cập dashboard riêng của Vercel hoặc Google. Việc kiểm production ở lượt trước là kiểm mẫu, không xác nhận SHA đang triển khai.

## 3. Kết luận thẩm định bốn tài liệu

### 3.1. `danh-gia-toan-dien-va-huong-phat-trien-2026-09-19.md`

Chấp nhận định hướng ưu tiên EN, nội dung có nguồn, đo lường, hình bối cảnh kết hợp sơ đồ và chuẩn hóa hình mới. Các số lượng nội dung và dữ liệu timeline đã được đếm lại, phù hợp. Cần điều chỉnh:

| Nhận xét trong tài liệu | Kết luận dùng trong kế hoạch |
|---|---|
| HEAD `521f5fa`, 266 commit | Là mốc cũ; hiện tại `a715fd0`, 268 commit. Không dùng lại số commit theo khoảng thời gian như số hiện hành |
| Dịch 15 mẫu iconic | Thay bằng tập hợp chính xác 13 bài: 7 mẫu biểu tượng và 6 thương hiệu |
| Người đọc EN bấm thì không tới đâu | `HistoryTimeline.astro` giữ link VI và hiện “Vietnamese only — no English version yet”. Thiếu bản dịch, không phải 404 |
| Vượt chuẩn quốc tế; thư viện lớn nhất tiếng Việt | Chưa có khảo sát đủ để xếp hạng. Chỉ kết luận website có cách ghi nguồn và giới hạn khẳng định rõ ràng |
| SVG đã dựng từ nguồn nên đúng | Khả năng kiểm chứng của SVG là lợi thế; độ chính xác từng hình vẫn cần thẩm định |
| RSS thực hiện lời hứa nhận bài qua thư | RSS là kênh theo dõi bằng trình đọc tin; không phải dịch vụ gửi email |
| `llms.txt` nên làm ngay cùng RSS | Đưa xuống thử nghiệm ưu tiên thấp. Không có bằng chứng tại dự án rằng tệp này tăng tìm kiếm hay lượt trích dẫn AI |
| CSP report-only không có tác dụng | Chưa cưỡng chế và chưa có endpoint nhận báo cáo tập trung. Vẫn có thể hỗ trợ kiểm vi phạm trên trình duyệt; không nên gọi là vô nghĩa |
| Thiếu Search Console thì không đo được mọi việc còn lại | Vẫn nghiệm thu được độ bao phủ EN, lỗi route, tốc độ trong phòng thử và khả năng sử dụng. Search Console bổ sung bằng chứng tìm kiếm |

Tham chiếu mã: `src/i18n/contentRoutes.ts`, `src/components/history/HistoryTimeline.astro`, `src/pages/en/index.astro`, `package.json`, `vercel.json`.

### 3.2. `huong-dan-bat-do-luong-2026-09-19.md`

Giữ hướng dẫn kiểm property hiện có trước, ưu tiên Domain property cho toàn tên miền, giữ bản ghi xác minh và xem số liệu thực tế. Bổ sung các điểm sau trước khi dùng:

- Beacon HTTP 200 được tài liệu ghi nhận là bằng chứng một lần gửi được chấp nhận; chưa chứng minh dashboard có dữ liệu đầy đủ hay đã tích lũy từ lâu. Lượt này không tái đo beacon và không đăng nhập dashboard.
- Đường dẫn `/8353d7638e565049/` là quan sát tại một thời điểm. Không hardcode và không khẳng định mọi dự án Vercel luôn dùng đường dẫn ngẫu nhiên hoặc suy mục đích của cơ chế khi thiếu tài liệu xác nhận.
- Khi kiểm, xem Network với trạng thái, nội dung request và nguồn khởi tạo. Danh sách Performance Resource Timing chỉ hỗ trợ tìm tài nguyên; đuôi `/view` tự nó chưa chứng minh đó là analytics.
- Nơi quản lý DNS là nhà cung cấp DNS có nameserver đang có thẩm quyền; có thể khác nơi mua tên miền và có thể là Vercel dù mua tên miền ở nơi khác.
- Với Domain property, dùng URL sitemap đầy đủ: `https://www.kienthucdonghoco.vn/sitemap-index.xml`. Không hứa trạng thái Success sau vài phút hoặc dữ liệu sau đúng 2–3 ngày.
- Dùng tên báo cáo hiện hành Pages/Page indexing thay vì phụ thuộc tên cũ Coverage. Khi URL chưa được index, kiểm khả năng index, canonical và lý do loại trừ trước khi yêu cầu index.
- Search Console giúp quan sát và chẩn đoán; việc tạo property không trực tiếp quyết định website có xuất hiện trên Google hay không.
- Phân tích EN bằng nhóm URL `/en/`; quốc gia chỉ là chiều phân tích phụ. Người ở Việt Nam có thể đọc EN, người ở nước ngoài có thể đọc VI.
- Không quyết định dừng EN từ một tuần ít dữ liệu. Đánh giá sau khi các bài đã xuất bản, được thu thập dữ liệu và có khoảng quan sát đủ dài.

Nguồn đối chiếu: [Google về property](https://support.google.com/webmasters/answer/34592), [xác minh quyền sở hữu](https://support.google.com/webmasters/answer/9008080), [Vercel troubleshooting](https://vercel.com/docs/analytics/troubleshooting).

### 3.3. `QUY-CHUAN-HINH-ANH.md`

Chấp nhận làm cơ sở thiết kế: giữ navy–đồng thau–ngà; ưu tiên `--obs-*` cho sơ đồ mới; ba tỷ lệ khung mặc định; giữ timeline nền navy; ghi nhãn AI; lưu hồ sơ; nâng cấp hình cũ khi có nhu cầu cụ thể. Tuy nhiên đây là quy ước đề xuất cần duyệt, không phải bằng chứng chủ dự án đã phê duyệt chỉ vì tài liệu ghi “ban hành”.

Các điều chỉnh cần áp dụng trong gói chuẩn hóa:

1. Hình cung cấp thông tin phải có mô tả phù hợp ngôn ngữ trang. Hình trang trí hoặc hình đã có nội dung tương đương đầy đủ ngay bên cạnh có thể dùng `alt=""` hoặc cách ẩn khỏi công cụ hỗ trợ phù hợp. Không bắt mọi hình có alt không rỗng. [W3C về hình trang trí](https://www.w3.org/WAI/tutorials/images/decorative/).
2. Ưu tiên nhãn HTML để dịch và đọc dễ dàng; không khẳng định chữ SVG không dịch được hay không thể tiếp cận. Không cấm toàn bộ `id`: SVG nhúng được phép dùng ID duy nhất theo từng instance cho gradient, mask, title/description; cần kiểm trùng ID. Chữ trong SVG tự nó không gây trùng ID.
3. Checklist “mọi hình chỉ dùng `--obs-*`” phải có ngoại lệ cho SVG timeline mã màu cố định và ảnh raster, đúng phạm vi từng loại hình. Màu đồng thau chỉ mang nghĩa năng lượng trong sơ đồ cơ chế; trong ảnh lịch sử nó còn thuộc bảng màu thẩm mỹ.
4. Ba tỷ lệ khung và bốn cấp nét là mặc định. Cho phép ngoại lệ có lý do về nội dung và khả năng đọc trên mobile. Nét vân quá mảnh cần kiểm ở kích thước hiển thị thật.
5. Phân loại AI theo chức năng của ảnh, không chỉ theo `claimLevel`. Ba mốc `context` hiện là `trench-watch`, `swatch-1983`, `silicon-revival`; chúng vẫn có thể liên quan thương hiệu hoặc chi tiết kỹ thuật. Không tự động coi cả ba đều phù hợp để tạo ảnh.
6. Ảnh bối cảnh có thể đặt cạnh mốc phát minh như chương Bánh lắc đã làm; không dùng ảnh AI làm chứng cứ cấu tạo hay hình sản phẩm chính xác. Đây là lựa chọn biên tập, không phải kết luận pháp lý rằng mọi ảnh có nhãn hiệu đều bị cấm.
7. Cơ chế ưu tiên JPG hiện ở `HistoryTimeline.astro`, không còn nằm trực tiếp trong wrapper `lich-su.astro`. Thẻ mốc mới chỉ render `WatchImage`; chưa thấy cơ chế chú thích AI riêng cho JPG. Vì vậy thêm JPG chưa đủ: phải có loại ảnh, chú thích hai ngôn ngữ và hồ sơ đi kèm.
8. Giữ SVG để tra cứu và phục hồi. Nếu chọn mô hình “ảnh bối cảnh cạnh sơ đồ”, cần triển khai đúng hai lớp; cơ chế JPG thay SVG hiện có chỉ là thay ảnh, không tự tạo hai lớp.

Không suy ra chất lượng nội dung hoặc chất lượng giao diện cao hơn website quốc tế chỉ từ số màu, số tỷ lệ khung hay số nguồn.

### 3.4. `prompt-dich-13-bai-lap-ngo-cut-en.md`

Danh sách 13 bài đúng với phép đối chiếu 23 đích `readMore` duy nhất và bảng cặp ngôn ngữ: 10 có EN, 13 chưa có. Cần sửa prompt trước khi giao:

- Sau ba đợt: 9 thương hiệu và **11 mẫu biểu tượng** EN, do 4 + 7 = 11; không phải 12.
- Trang chủ EN lấy số lượng từ collection và lọc bản nháp theo môi trường. Không cần gói sửa số liệu thủ công; kiểm con số tăng đúng sau từng đợt xuất bản.
- Mốc IWC 1936 mô tả Special Pilot's Watch; bài Mark XI có năm 1948. Có thể dùng bài này làm đọc thêm về dòng phát triển, nhưng không gọi Mark XI là mẫu ra mắt năm 1936. Cần làm rõ quan hệ trong nhãn hoặc ghi chú biên tập.
- So số từ VI–EN với ngưỡng 25% không đáng tin để nghiệm thu: cách phân tách từ khác nhau. Dùng đối chiếu theo đoạn, luận điểm, con số, tên riêng, nguồn và mức dè dặt; số từ chỉ để tham khảo.
- Giữ URL nguồn, enum và mã tham chiếu; dịch những trường thực sự là văn bản hiển thị. Không giữ máy móc nguyên một trường nếu nó chứa cả nội dung tiếng Việt cần dịch. Kiểm schema và mẫu hiện tại khi thực hiện.
- `updated` dùng ngày hoàn tất rà soát thực tế, không cố định 19/09 khi triển khai muộn hơn.
- Nếu phát hiện nghi vấn ở bản VI, ghi vào danh sách cần kiểm và xử lý biên tập trước xuất bản phần có vấn đề. Không xuất bản một nghi vấn đã biết chỉ vì yêu cầu dịch nguyên văn.
- Không thêm quan hệ bài EN giả. Việc chưa có `relatedModels`/`relatedMechanisms` ở các mẫu EN hiện tại là mô tả hiện trạng, không phải lệnh cấm lâu dài.
- Tài liệu mới có prompt đầy đủ cho đợt 1. Đợt 3 cần khuôn thương hiệu riêng, không chỉ thay danh sách tệp trong khuôn mẫu iconic.

## 4. Danh mục thực hiện và tác dụng

Ước lượng dưới đây là giờ công tập trung của biên tập và kỹ thuật cộng lại, chưa tính chờ duyệt, DNS/indexing hoặc nghiên cứu lại dữ kiện có tranh chấp. Đây là dự toán kế hoạch, không phải thời gian đo thực tế.

| Mã / ưu tiên | Công việc và đầu ra | Tác dụng đối với website | Nghiệm thu | Giờ công |
|---|---|---|---|---:|
| H01 / P1 | Chọn bản kế hoạch chính thức; ghi các đính chính; rà và chọn docs cần lưu Git | Giảm giao việc theo prompt cũ, lưu được tài sản biên tập | Có danh sách tài liệu còn hiệu lực, trạng thái và phiên bản; không đưa toàn bộ output vào Git | 2–4 |
| H02 / P1 | Xác minh quyền truy cập Search Console; đọc Analytics; lập bảng cơ sở 28 ngày theo VI/EN | Chọn nội dung dựa trên nhu cầu, phát hiện vấn đề index | Phân biệt rõ số quan sát được và số chưa có; sitemap được nộp/kiểm trạng thái; có ngày chụp số liệu | 3–5 |
| H03 / P1 | Dịch 13 bài thành ba đợt 5 + 2 + 6, đăng ký cặp route và soát nguồn | Hoàn thiện hành trình EN, khai thác giá trị lớp trải nghiệm đã đầu tư | 23/23 đích hiện tại có bài EN thật; 9 brands, 11 iconic; route, switcher, hreflang, tìm kiếm đúng | 24–40 |
| H04 / P1 | Hoàn thiện quy chuẩn hình theo các sửa đổi ở mục 3.3; mẫu kiểm cho từng loại hình | Đồng nhất nhận diện và giảm sửa đi sửa lại; giữ khả năng tiếp cận | Có mẫu timeline, sơ đồ, ảnh bối cảnh; rõ ngoại lệ alt/ID/màu; kiểm light/dark và mobile | 4–7 |
| H05 / P2 | Bài Swiss Made trong Hướng dẫn, đề xuất VI và EN; cập nhật hồ sơ pháp lý trước biên soạn | Giúp phân biệt chỉ dẫn nguồn gốc với chất lượng; tăng chiều sâu nội dung đánh giá thông tin | Nguồn chính thức còn hiệu lực, diễn giải đúng phạm vi; nối bài chọn đồng hồ và thuật ngữ chứng nhận | 8–12 |
| H06 / P2 | Hai bài hiểu đúng: chân kính và chống nước; đối chiếu bài hiện có trước | Trả lời nhầm lẫn phổ biến, củng cố độ tin cậy và đường đọc cơ chế–hướng dẫn | Không trùng bài cũ; có thể nâng cấp bài hiện có thay vì tạo URL mới; không dùng quy tắc chống nước tuyệt đối | 10–16 |
| H07 / P2 | Thí điểm 3–4 mốc bối cảnh có liên hệ rõ với đồng hồ; mở rộng tối đa 10–12 khi hữu ích | Giúp người đọc hiểu vì sao kỹ thuật thay đổi; tăng chiều sâu lịch sử | Mỗi mốc có nguồn và liên hệ được chứng minh; không suy quan hệ nhân quả chỉ vì trùng thời gian; cập nhật hai ngôn ngữ và mô tả số mốc | 8–14 cho cả gói |
| H08 / P2 | RSS VI/EN từ nội dung đã xuất bản; liên kết khám phá feed rõ ràng | Tạo kênh theo dõi bài mới, hỗ trợ người đọc quay lại | Feed hợp lệ, URL chuẩn, ngày đúng, không có draft; nội dung footer không gọi RSS là email | 3–5 |
| H09 / P2 | Phóng to hình lịch sử; dùng cùng cách chú thích và điều khiển | Cho xem chi tiết sơ đồ trên desktop/mobile, tăng giá trị học từ hình | Mở/đóng bàn phím, Escape, quản lý và trả focus, phóng to không tràn màn hình; hoạt động cả VI/EN | 4–7 |
| H10 / P2 | Ảnh responsive, nén theo kích thước dùng; WebP/AVIF khi có lợi; cập nhật manifest | Giảm dữ liệu tải và hạn chế dịch chuyển bố cục khi tăng ảnh | So dung lượng thực tải, kích thước và chất lượng; có width/height; không trì hoãn ảnh quan trọng đầu trang; kiểm browser và fallback | 3–6 |
| H11 / P2 | Rà CSP, cơ chế nhận báo cáo và kiểm preview trước enforce | Tăng khả năng phát hiện, hạn chế một số đường thực thi tài nguyên không mong muốn | Tìm kiếm, Analytics, Formspree, font, 3D hoạt động; phân loại vi phạm; có cách khôi phục cấu hình | 4–8 |
| H12 / P3 | Thử 1 ảnh AI bối cảnh phù hợp, sau đó tối đa 3 nếu đạt | Tăng sức gợi lịch sử và điểm nhớ thị giác | Duyệt từng ảnh, không sai thời đại; nhãn VI/EN; không dùng làm chứng cứ kỹ thuật; lưu prompt và SVG; tổng tải không tăng quá ngân sách đã chốt | 4–8 |
| H13 / P3 | Thử `llms.txt` với danh mục chuẩn nếu còn nguồn lực | Có thêm bản chỉ mục tiện tham khảo cho một số công cụ | Link còn hiệu lực, không công bố dữ liệu riêng, không mâu thuẫn robots; không coi là bảo đảm SEO/AI | 1–2 |
| H14 / P3 | Chọn một cụm mới: nghề chế tác, vật liệu hoặc phức tạp còn thiếu | Mở rộng chiều sâu có chủ đề, tránh thư viện dàn trải | Hồ sơ nguồn, đối tượng đọc, bài trụ cột và liên kết liên quan được xác định trước | 12–24/cụm |

H11 không phụ thuộc việc có Search Console. H02 có thể chạy song song với H03/H04; thiếu dashboard không chặn việc hoàn thiện nội dung đã xác định rõ. H12 phụ thuộc H04 và cơ chế chú thích ảnh; H14 bắt đầu sau khi đã đánh giá đợt EN và nhu cầu đọc.

## 5. Phạm vi chi tiết gói EN

| Đợt | Bài | Số lượng | EN sau đợt nếu xuất bản đủ |
|---|---|---:|---|
| 1 | Royal Oak, Patek Nautilus, Reverso, Fifty Fathoms, Zenith El Primero | 5 iconic | 3 brands, 9 iconic; 58 tệp EN |
| 2 | Freak, IWC Mark XI | 2 iconic | 3 brands, 11 iconic; 60 tệp EN |
| 3 | Patek Philippe, Cartier, Breguet, Blancpain, Vacheron Constantin, TAG Heuer | 6 brands | 9 brands, 11 iconic; 66 tệp EN |

Mỗi đợt: đọc bản VI và schema đang dùng; dịch giữ phạm vi nguồn; soát tên, năm, thông số và các câu “theo hãng”, “khoảng”, “được ghi nhận”; xử lý nghi vấn; thêm cặp vào `ARTICLE_PAIRS`; chạy check/build; kiểm bài thật, timeline, switcher hai chiều, hreflang và Pagefind trên preview. Sau phát hành mới xác nhận route production. Không dùng kết quả build local làm bằng chứng production đã cập nhật.

13 bài chỉ khép tập hợp đích đọc thêm của 28 mốc hiện tại. Chúng không hoàn thiện toàn bộ thư viện EN, không lấp các mốc vốn có `readMore: null`, và không bảo đảm mọi liên kết trong thân bài đều có bản EN. Liên kết chưa dịch cần tiếp tục minh bạch ngôn ngữ hoặc chọn bài liên quan đã tồn tại.

## 6. Tiến độ và phân công đề xuất

- Tuần 1: H01, H02, H04 và bắt đầu H03 đợt 1. Đồng thời lập phạm vi kiểm CSP; chưa thay đổi cấu hình production trong gói báo cáo này.
- Tuần 2–3: hoàn tất H03 theo từng đợt đã soát; H08; bắt đầu H05. Không trì hoãn xuất bản đợt đạt chỉ để đợi đủ 13 bài.
- Tuần 4–5: H05/H06, H07 thí điểm, H09/H10; H11 khi preview đủ bằng chứng.
- Tuần 6: đánh giá số liệu và nghiệm thu toàn giai đoạn; quyết định H12–H14 dựa trên giá trị và nguồn lực.

Tổng P1: 33–56 giờ. P2: 40–68 giờ. P1 + P2: 73–124 giờ, tương đương khoảng 4–7 tuần nếu dành 20 giờ/tuần cho dự án, chưa tính thời gian chờ. Mốc sáu tuần là lịch tham khảo; có thể giảm khối lượng H07/H09 để giữ nhịp nội dung.

GLM phụ trách triển khai code và bản thảo theo gói. GPT Work rà soát độc lập kiểm nguồn, bản dịch và kết quả thực tế. Chủ dự án chốt định hướng, hỗ trợ quyền truy cập dashboard, duyệt các lựa chọn hình ảnh và quyết định phát hành. Việc commit và push do GLM thực hiện khi GPT Work đã thông báo gói đủ điều kiện nghiệm thu và cho phép phát hành. Báo cáo này không tự giao việc hay cấp quyền commit/push.

## 7. Đo tác dụng sau triển khai

| Mục tiêu | Chỉ số và cách đo | Thời điểm / tiêu chí |
|---|---|---|
| Khép đường đọc EN | Đếm đích timeline có route EN xuất bản và cặp ngôn ngữ đúng | Từ 10/23 lên 23/23 sau H03 |
| Chất lượng dịch | Đối chiếu từng đoạn, dữ kiện và mức xác quyết; danh sách nghi vấn đã xử lý | 13/13 bài đạt trước phát hành; không dùng số từ làm tiêu chuẩn chính |
| Khả năng tìm thấy | Search Console: click, impression, CTR, trang được index, tách `/en/` và VI | Ghi cơ sở 28 ngày; so các khoảng 28 ngày tương đương sau xuất bản; thiếu dữ liệu thì kéo dài quan sát |
| Mức quan tâm | Analytics: lượt xem theo route, nguồn giới thiệu, thiết bị; phân biệt tổng view và người xem | Theo tuần, đánh giá sau 4–8 tuần; không coi pageview là đọc hết hoặc học tốt |
| Đường đọc lịch sử sang bài | Event nhấp đọc thêm chỉ khi công cụ/gói tài khoản hỗ trợ và đã triển khai rõ ràng | Đây là phép đo bổ sung, chưa mặc định đã có; không gửi truy vấn tìm kiếm hay dữ liệu cá nhân |
| Hình ảnh và tốc độ | Dung lượng thực tải, bố cục, LCP/CLS/INP khi có dữ liệu; tách đo phòng thử và người dùng thật | Kiểm trước/sau cùng điều kiện; không nhân dung lượng cả thư mục ảnh thành dung lượng mỗi trang |
| Khả năng tiếp cận | Bàn phím, zoom 200%, mobile, light/dark, giảm chuyển động; kiểm screen reader mẫu | Không có lỗi chặn tác vụ trên các mẫu đã thử; chưa tuyên bố chứng nhận WCAG toàn site |
| Kỷ luật biên tập | Ngày kiểm nguồn, claim/limit, ảnh có hồ sơ, tài liệu còn hiệu lực | Soát trước xuất bản và định kỳ hằng tháng |

Chưa đặt mục tiêu tăng traffic theo phần trăm khi chưa biết đường cơ sở. Sau H02 mới chốt mục tiêu phù hợp. Search Console và Analytics đo các tập dữ liệu khác nhau, không buộc số click và pageview khớp tuyệt đối.

## 8. Tham khảo quốc tế và giới hạn áp dụng

Học cách gắn lịch sử chế tác với sự kiện thế giới từ [FHH](https://www.hautehorlogerie.org/en/watches-and-culture/history); đưa vào H07 với nguồn riêng cho từng mốc. Không dùng số mốc hoặc việc không thấy liên kết nguồn trên giao diện để kết luận chất lượng chuyên môn toàn bộ FHH thấp hơn DongHoCo.

Tham khảo cách tuyển chọn nội dung và bố cục bài của [HODINKEE](https://www.hodinkee.com/articles/new-and-improved-hodinkee), cùng phân nhóm [Monochrome Editorial](https://monochrome-watches.com/sections/editorial/). Áp dụng dưới dạng nhóm bài, thứ bậc tiêu đề, khung hình và đường đọc; không sao chép giao diện hoặc mặc định cần tăng mật độ tin tức.

Theo [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features), không cần thêm tệp văn bản AI đặc biệt để đủ điều kiện xuất hiện trong các tính năng AI của Google Search. Vì vậy H13 có mức ưu tiên thấp hơn nội dung, liên kết, khả năng index và trải nghiệm trang.

Thiết kế CSP dựa trên [tài liệu header Report-Only](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy-Report-Only), dùng giai đoạn quan sát trước khi cưỡng chế. Không xem việc đổi một header là đã bảo đảm an toàn toàn website.

## 9. Phạm vi hồ sơ thay đổi trong lượt này

Tạo báo cáo hợp nhất này và thêm chỉ dẫn bản kế hoạch mới vào cuối `docs/ra-soat-toan-bo-2026-09-05.md`. Giữ bốn tài liệu nguồn để truy vết; các sửa đổi cần áp dụng đã ghi ở mục 3. Khi giao GLM, phải đưa kèm mục 3 hoặc cập nhật prompt nguồn trước, không dán nguyên bản cũ.

Chưa sửa code, bài xuất bản, cấu hình, ảnh; chưa commit, push hay deploy. Các công việc H01–H14 là kế hoạch trình duyệt, không phải báo cáo đã thực hiện.
