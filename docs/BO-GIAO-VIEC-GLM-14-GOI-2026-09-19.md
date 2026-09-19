# BỘ GIAO VIỆC GLM — 14 GÓI PHÁT TRIỂN KIẾN THỨC ĐỒNG HỒ CƠ

Ngày soạn: 19/09/2026. Căn cứ: `KE-HOACH-PHAT-TRIEN-HOP-NHAT-2026-09-19.md`. Nền tham chiếu: commit `a715fd0`; GLM phải kiểm tra hiện trạng khi bắt đầu từng gói.

Tài liệu này là hướng dẫn thực hiện để chủ dự án không cần biết code. Việc soạn bộ giao việc chưa đồng nghĩa các gói đã được làm hoặc được đưa lên website.

## 1. Anh Vinh dùng tài liệu này như thế nào?

1. Gửi câu lệnh bắt đầu ở mục 2 cho GLM đang làm việc trong `D:\Watch web build`.
2. GLM tự đọc tài liệu, thực hiện gói được chỉ định, kiểm tra và gửi báo cáo. Anh không cần tự chạy lệnh hay kiểm code.
3. Gửi báo cáo và đường dẫn file nghiệm thu của GLM lại cho GPT Work để kiểm độc lập trên file thực tế. Với gói giao diện/ảnh, anh xem thêm hình trước–sau và bản xem thử do GLM cung cấp.
4. Nếu cần sửa, giao GLM sửa đúng gói đó. Khi GPT Work thông báo gói đủ điều kiện nghiệm thu và cho phép commit/push, anh quyết định có đưa lên website hay chưa; câu lệnh phát hành mẫu nằm ở mục 8, GLM thực hiện commit và push theo lệnh đó.
5. Gửi câu “Thực hiện gói ... theo bộ giao việc” để chuyển sang lượt tiếp theo. GLM không tự chạy hết 14 gói trong một phiên.

Anh chỉ cần tham gia ở những việc GLM không thể tự quyết: đăng nhập tài khoản riêng, duyệt hình và lựa chọn phát hành. Phần chọn cấu trúc code, chạy kiểm tra, sửa lỗi thuộc gói và lập báo cáo là trách nhiệm của GLM.

### Thứ tự gửi việc

| Lượt | Mã gửi GLM | Kết quả anh sẽ nhận | Khối lượng dự kiến |
|---|---|---|---|
| 1 | H01 | Một danh mục tài liệu chính thức, biết rõ việc nào đã xong/còn lại | 2–4 giờ |
| 2 | H02 | Bảng đo lường hoặc danh sách thao tác đăng nhập thật sự cần anh hỗ trợ | 3–5 giờ, chưa tính chờ dữ liệu |
| 3 | H04 | Quy chuẩn hình ảnh đã sửa các mâu thuẫn, có ví dụ để đối chiếu | 4–7 giờ |
| 4 | H03-A | 5 bài mẫu đồng hồ tiếng Anh | Trong tổng H03: 24–40 giờ |
| 5 | H03-B | 2 bài mẫu đồng hồ tiếng Anh | Như trên |
| 6 | H03-C | 6 hồ sơ thương hiệu tiếng Anh và nghiệm thu cả 13 bài | Như trên |
| 7 | H08 | Kênh RSS theo dõi bài mới bằng tiếng Việt và tiếng Anh | 3–5 giờ |
| 8 | H05 | Bài Swiss Made song ngữ có hồ sơ nguồn | 8–12 giờ |
| 9 | H06 | Hai chủ đề hiểu đúng: chân kính và chống nước | 10–16 giờ |
| 10 | H07-A, sau đó H07-B nếu duyệt mở rộng | 3–4 mốc bối cảnh trước; tối đa 10–12 mốc cho toàn gói | 8–14 giờ |
| 11 | H09 | Xem phóng to hình lịch sử bằng chuột, bàn phím và điện thoại | 4–7 giờ |
| 12 | H10 | Ảnh tải gọn hơn, có bảng trước–sau | 3–6 giờ |
| 13 | H11 | Cấu hình bảo vệ được thử nghiệm, báo cáo ảnh hưởng và cách khôi phục | 4–8 giờ |
| 14 | H12-A, sau đó H12-B nếu duyệt mở rộng | Một ảnh AI mẫu; tối đa ba ảnh trong toàn gói | 4–8 giờ |
| 15 | H13 | Tệp chỉ dẫn nội dung cho công cụ đọc tự động | 1–2 giờ |
| 16 | H14-A, sau đó H14-B theo kết quả | Hồ sơ một cụm nội dung mới và một bài mẫu song ngữ | 12–24 giờ/cụm |

Có 14 gói, nhưng H03 cần ba lượt; H07/H12/H14 có bước thử trước mở rộng. Tổng P1 + P2 vẫn là 73–124 giờ công. H12–H14 là phần mở rộng. Nếu H02 thiếu quyền dashboard, hoàn thành phần có thể kiểm và tiếp tục H04/H03; không để các gói nội dung chờ tài khoản.

## 2. Câu lệnh bắt đầu — anh chỉ cần sao chép

```text
Bạn làm việc tại D:\Watch web build. Hãy đọc toàn bộ docs/BO-GIAO-VIEC-GLM-14-GOI-2026-09-19.md và docs/KE-HOACH-PHAT-TRIEN-HOP-NHAT-2026-09-19.md.

Thực hiện H01 theo đúng phạm vi, quy tắc chung và mẫu báo cáo trong bộ giao việc. Tôi không biết code: bạn tự kiểm tra, thực hiện, kiểm chứng và trình bày kết quả bằng tiếng Việt dễ hiểu. Không chỉ đưa ra kế hoạch rồi dừng. Kết thúc H01 thì báo cáo và chờ giao gói tiếp theo. Chưa commit, push hoặc deploy.
```

Cho các lượt sau, dùng câu này và thay mã gói:

```text
Thực hiện H03-A theo docs/BO-GIAO-VIEC-GLM-14-GOI-2026-09-19.md, áp dụng toàn bộ mục 3 và mục 7. Kiểm tra lại hiện trạng và kết quả gói trước để không làm trùng. Tự hoàn thành phần được giao, kiểm chứng, lập báo cáo rồi dừng. Chưa commit, push hoặc deploy.
```

## 3. Quy tắc chung bắt buộc cho GLM — áp dụng mọi gói

### 3.1. Kiểm tra trước khi làm

- Đọc `AGENTS.md`, `CONTENT-GUIDE.md`, kế hoạch hợp nhất và phần gói được giao. Kiểm tra `git log`, nhánh, trạng thái sửa dở và tệp liên quan trước khi sửa.
- Ghi HEAD, ngày thực hiện và phạm vi dự kiến vào báo cáo. Nếu công việc đã hoàn thành, xác minh rồi ghi “đã có, không làm lại”. Không khôi phục số liệu 19/09 nếu repo đã thay đổi.
- Bảo toàn thay đổi sẵn có. Không ghi đè, reset hoặc xóa file của người khác. Chỉ hỏi khi có xung đột thực sự không thể xử lý trong phạm vi; vẫn hoàn thành các phần độc lập.
- `src/content.config.ts` là vị trí schema ở nền hiện tại; tìm lại nếu đã chuyển. `src/lib/content.ts` và `src/i18n/contentRoutes.ts` là căn cứ route. Không dùng đường dẫn/schema của prompt tháng 8 mà chưa kiểm tra.

### 3.2. Nội dung và quyền thay đổi

- Thực hiện trọn gói được chỉ định ở local, gồm sửa lỗi do gói gây ra. Không tự chạy gói kế tiếp, nâng framework, đổi cấu trúc lớn hoặc thêm dịch vụ trả phí.
- Giọng nhà sưu tầm am hiểu; không quảng cáo, không thêm nhận định đầu tư/giữ giá. Tiếng Việt và tiếng Anh tự nhiên, không để lọt hệ chữ ngoài phạm vi dự án. Không hiển thị ghi chú công việc trên website.
- Năm, calibre, thông số và tuyên bố lịch sử phải có nguồn. Chỗ không chắc ghi `CAN-KIEM-CHUNG.md`; không tự điền. Một nguồn hãng chỉ chứng minh phạm vi nguồn đó nói; giữ “theo hãng” khi cần.
- Với dịch thuật: không thêm dữ kiện. Với nội dung mới: kiểm nguồn chính thức trước và lưu hồ sơ claim–nguồn–giới hạn–ngày kiểm. Không thể xác minh thì giữ phần đó ở bản thảo, tiếp tục phần có nguồn.
- Không áp dụng nguyên đoạn khóa cũ trong `bo-prompt-glm-v2.md`: lệnh tự push và quy tắc slug tháng 8 không còn là chỉ dẫn cho các gói này. Dùng cơ chế route đang chạy; không đổi URL đang tồn tại nếu gói không yêu cầu.
- Chưa `git add`, commit, push, tạo deployment hay thay cấu hình dịch vụ ngoài máy khi chỉ nhận lệnh thực hiện gói. Việc commit và push chỉ thực hiện khi nhận lệnh phát hành (mục 8) sau khi GPT Work đã thông báo gói đủ điều kiện nghiệm thu và cho phép phát hành.

### 3.3. Kiểm chứng và bàn giao

- Gói chỉ tài liệu: kiểm đường dẫn tham chiếu, tính nhất quán, số lượng và diff; không bắt buộc build nếu không ảnh hưởng website.
- Gói sửa code hoặc nội dung xuất bản: chạy chuỗi kiểm và build hiện hành, ghi mã thoát và lỗi/cảnh báo. Nếu build đã gọi check thì có thể dùng log đầy đủ của lần build thành công để tránh chạy trùng không cần thiết.
- Không bỏ script kiểm, hạ tiêu chuẩn hoặc sửa số kỳ vọng chỉ để “pass”. Nếu dữ liệu hợp lệ thay đổi số lượng, giải thích và cập nhật kiểm tra tương ứng.
- Kiểm route thật trên bản xem trước. Giao diện/tương tác phải kiểm mobile, desktop, sáng/tối, bàn phím và giảm chuyển động khi liên quan. Lưu ảnh minh chứng trong `output/`, không tự đưa ảnh kiểm thử vào Git.
- Không có trình duyệt hoặc quyền truy cập thì ghi đúng phần chưa kiểm, không tuyên bố đã nghiệm thu. Không dùng HTTP 200 để thay cho việc kiểm nội dung trang.
- Cuối mỗi gói, tạo `docs/nghiem-thu/Hxx-YYYY-MM-DD.md` với mã gói/lượt và ngày thật; nếu đã có báo cáo cùng tên thì bổ sung phiên bản, không xóa bằng chứng trước. Báo cáo dùng mẫu mục 7.

## 4. Các gói nền tảng và tiếng Anh

### H01 — Thống nhất hồ sơ để không giao sai việc

**Giao GLM:** thực hiện kiểm kê và cập nhật tài liệu, chưa sửa nội dung website.

1. Đọc kế hoạch hợp nhất và bốn file nguồn được thẩm định trong mục 3 của kế hoạch. Kiểm tra hiện trạng các nhận xét quan trọng trước khi sửa tài liệu.
2. Tạo `docs/CHI-MUC-KE-HOACH-HIEN-HANH.md`: tài liệu, vai trò, tình trạng còn hiệu lực/lịch sử, gói phụ trách và bằng chứng. Đặt bộ giao việc này và kế hoạch hợp nhất là tài liệu điều phối đợt mới; cập nhật lộ trình hiện tại bằng liên kết, giữ lịch sử cũ.
3. Sửa các lỗi đã xác nhận trong bốn tài liệu nguồn: 13 bài = 7 iconic + 6 brands; sau gói có 11 iconic EN; số trang chủ lấy tự động; liên kết thiếu EN vẫn có fallback VI; các điều chỉnh đo lường. Với quy chuẩn ảnh, đánh dấu chờ H04 xử lý chi tiết, tránh ban hành hai quy tắc đối nghịch.
4. Ghi rõ prompt tháng 8 không phải lệnh thi công hiện tại. Không xóa tài liệu lịch sử và không sửa lại toàn bộ thư mục docs.
5. Lập danh sách file đề nghị lưu vào Git và file chỉ dùng nội bộ/output; kiểm dữ liệu riêng trước. Chỉ lập danh sách, chưa stage/commit.

**Đạt khi:** một mục lục dẫn được tới tài liệu đúng; lỗi số lượng không còn trong hướng dẫn hiện hành; giữ bằng chứng lịch sử; báo cáo nói rõ file/dòng đã thay. Anh đọc bản tóm tắt là biết phải giao gói nào tiếp.

### H02 — Đo được người đọc và nhu cầu tìm kiếm

**Giao GLM:** xác lập dữ liệu cơ sở và hướng dẫn thao tác tài khoản, tận dụng công cụ đã có.

1. Đọc hướng dẫn đo lường cùng các đính chính trong kế hoạch. Kiểm production bằng Network: tài nguyên Analytics, request, trạng thái và nguồn khởi tạo; không đoán đường dẫn hoặc chỉ lọc “insights”. Không tự tạo lưu lượng hàng loạt.
2. Nếu đã được cấp quyền, đọc dashboard Vercel và Search Console hiện có. Không có quyền thì đánh dấu chưa truy cập; không coi dữ liệu thiếu là số 0.
3. Tạo `docs/DO-LUONG-CO-SO.md`: kỳ 28 ngày, số liệu VI/EN theo URL, lượt xem, nguồn truy cập, thiết bị; Search Console gồm impression/click/CTR, trang đích/truy vấn, trạng thái index. Mục chưa có ghi “chưa có dữ liệu”. Không công khai thông tin tài khoản.
4. Chuẩn bị hướng dẫn tối đa một trang để anh kiểm property; nếu chưa có, đề nghị Domain property và TXT tại nhà cung cấp DNS có thẩm quyền. Chỉ chủ tài khoản hoặc người đã được giao quyền thực hiện thay đổi tài khoản/DNS; GLM không xin mật khẩu hoặc mã xác thực trong chat.
5. Hướng dẫn nộp sitemap đầy đủ `https://www.kienthucdonghoco.vn/sitemap-index.xml`, kiểm canonical/indexability trước Request Indexing. Không hứa thời gian index.
6. Đề xuất nhịp đọc số hàng tuần và đánh giá theo 28 ngày; không tạo automation hoặc cài hệ đo mới trong gói này.

**Đạt khi:** có bảng cơ sở với nguồn/ngày/phạm vi, hoặc bảng thiếu dữ liệu minh bạch và thao tác tài khoản cụ thể. Đánh dấu “hoàn thành phần kiểm công khai, chờ tài khoản” nếu phù hợp; H03/H04 vẫn tiếp tục.

### H03 — Dịch 13 bài, giao riêng ba lượt

**Đọc chung:** schema hiện hành, bộ lấy nội dung, bảng cặp route, mẫu EN cùng collection và các bản VI trong danh sách. Áp dụng quy tắc dịch trong kế hoạch hợp nhất. Không dùng số từ VI/EN làm tiêu chuẩn đạt; đối chiếu đoạn, dữ kiện và cách nói dè dặt.

| Lượt | Collection | Slug nguồn VI và đích EN đề xuất |
|---|---|---|
| H03-A | `mauIconic` | `royal-oak`, `patek-nautilus`, `reverso`, `fifty-fathoms`, `zenith-el-primero` |
| H03-B | `mauIconic` | `freak`, `iwc-mark-xi` |
| H03-C | `thuongHieu` | `patek-philippe`, `cartier`, `breguet`, `blancpain`, `vacheron-constantin`, `tag-heuer` |

**Giao GLM cho từng lượt:**

1. Chỉ dịch danh sách thuộc lượt được gọi, từ `src/content/<collection>/vi/<slug>.md` sang thư mục `en`. Nếu đã có bản EN thì kiểm thiếu gì, không ghi đè bản tốt.
2. Lấy mẫu EN đã chạy trong đúng collection. Giữ enum, mã reference, giá trị số và URL nguồn; dịch văn bản hiển thị, đơn vị phù hợp và label nguồn tiếng Việt. Tên hãng phải khớp cách liên kết dữ liệu đang dùng. Ngày cập nhật là ngày soát thực tế.
3. Giữ nguyên phạm vi của “theo hãng”, “khoảng”, “được ghi nhận” và giới hạn dữ kiện. Không thêm thông số hoặc ca ngợi. Ghi nghi vấn VI và không xuất bản đoạn đã biết có vấn đề khi chưa xử lý.
4. Thêm cặp thật vào `ARTICLE_PAIRS`: iconic dùng `/en/iconic-watches/<slug>/`, thương hiệu dùng `/en/brands/<slug>/`; bản VI giữ đường dẫn hiện có. Không tạo hreflang tới bài chưa xuất bản.
5. Link thân bài ưu tiên EN đã tồn tại. Khi chỉ có VI, cho biết ngôn ngữ một cách phù hợp. Không thêm quan hệ bài giả; không sửa template rộng ngoài nhu cầu gói.
6. Với H03-B, làm rõ đọc thêm Mark XI (1948) là diễn tiến của dòng phi công, không phải Special Pilot's Watch (1936). Nếu cần, chỉ sửa ghi chú đọc thêm song ngữ tối thiểu; giữ nguyên mốc lịch sử và nguồn của mốc.
7. Giữ số lượng trang chủ tự sinh. Sau H03-A dự kiến 9 iconic EN; sau B là 11; sau C là 9 brands và 11 iconic, tổng 66 tệp EN nếu không có thay đổi khác.

**Nghiệm thu mỗi lượt:** các route mới trả đúng bài; switcher hai chiều đúng bài; canonical/hreflang đúng; Pagefind tìm thấy bài ở ngôn ngữ phù hợp; timeline dẫn tới EN tương ứng; nguồn và sắc thái đối chiếu từng đoạn; check/build đạt. H03-C kiểm cả tập 23 đích duy nhất của timeline gốc đã có EN; nếu timeline đã mở rộng thì tách tập cũ và tập mới trong báo cáo.

**Bàn giao:** bảng VI–EN của từng câu cần dè dặt, các file đã tạo, nghi vấn còn lại, kết quả kiểm thực tế. Không chỉ báo “đã dịch xong”.

### H04 — Hoàn thiện quy chuẩn hình ảnh

**Giao GLM:** cập nhật `docs/QUY-CHUAN-HINH-ANH.md` theo mục 3.3 của kế hoạch hợp nhất; chưa thay hàng loạt hình trên website.

1. Tách quy định cho sơ đồ cơ chế, SVG timeline và ảnh raster. `--obs-*` là hệ ưu tiên cho sơ đồ mới; timeline giữ bảng navy cố định. Ba tỷ lệ khung là mặc định, có ngoại lệ được giải thích.
2. Sửa quy tắc alt: hình có thông tin riêng cần mô tả; hình trang trí/nội dung lặp có thể ẩn phù hợp. Ưu tiên chữ HTML nhưng không cấm SVG có chữ hoặc ID duy nhất theo instance. Giữ kiểm tra trùng ID.
3. Quy định AI theo mục đích ảnh; không tự cho phép mọi mốc `context`. Giữ nhãn VI/EN, hồ sơ tạo ảnh, kiểm thời đại, vị trí render và quyền sử dụng khi liên quan.
4. Ghi rõ cơ chế JPG hiện ở `HistoryTimeline.astro` và chưa tự cung cấp nhãn AI. Quy chuẩn phải phân biệt thay ảnh với hiển thị hai lớp ảnh–sơ đồ.
5. Lập trang tài liệu minh họa bằng các hình sẵn có, có đường dẫn hoặc ảnh chụp ví dụ tốt. Không tạo route production chỉ để trưng bày quy chuẩn.

**Đạt khi:** không có mâu thuẫn giữa checklist và ngoại lệ; mỗi loại hình có ví dụ, quy tắc và cách kiểm; ghi trạng thái “đề xuất trình duyệt” nếu chưa có phê duyệt. Anh chỉ cần xem ví dụ để quyết định phong cách.

## 5. Các gói nội dung và trải nghiệm

### H05 — Giải thích Swiss Made bằng hai ngôn ngữ

**Giao GLM:** thực hiện bài trong mục Hướng dẫn, VI và EN. Đây là phạm vi mặc định của gói, không hỏi lại lựa chọn vị trí và ngôn ngữ đã nêu.

1. Đọc `docs/ho-so-nguon-swiss-made.md`, kiểm lại văn bản chính thức đang có hiệu lực; lập bảng từng luận điểm–nguồn–ngày kiểm–giới hạn trước khi viết. Không dựa riêng vào bản ghi cũ.
2. Viết bài giải thích nhãn nói gì và không nói gì, phân biệt chỉ dẫn nguồn gốc với chứng nhận chất lượng. Không so sánh pháp luật nước khác, không nêu hãng vi phạm, không mở rộng sang tư vấn pháp lý.
3. Kiểm tra nội dung cùng chủ đề trước, chọn slug ổn định, tuân schema; tạo cặp ngôn ngữ. Kết nối chọn đồng hồ đầu tiên, nhận biết thông tin sản phẩm và thuật ngữ chứng nhận khi bài đích tồn tại.
4. Nếu nguồn không truy cập được hoặc chưa đủ chứng minh một tiêu chí, giữ luận điểm đó trong hồ sơ cần kiểm, không điền từ trí nhớ. Chuẩn bị đầy đủ phần có nguồn để soát.

**Đạt khi:** có bài VI/EN, bảng đối chiếu nguồn, không đánh đồng Swiss Made với “tốt hơn”; route/liên kết/hreflang/check/build đúng. Bài chờ kiểm nguồn phải ghi rõ trạng thái bản thảo.

### H06 — Hai nội dung hiểu đúng về chân kính và chống nước

**Giao GLM:** rà các bài hiện có, rồi hoàn thiện hai chủ đề ở phạm vi vừa đủ, VI và EN.

1. Tìm bài từ điển, cơ chế và hướng dẫn liên quan. Chọn nâng cấp bài cũ nếu mục đích đọc đã trùng; không tạo bài mới chỉ để tăng số lượng.
2. Lập hồ sơ nguồn cho “số chân kính nói được/không nói được gì” và “chỉ số chống nước không tự quyết định mọi hoạt động sử dụng”. Không suy chất lượng từ số chân kính; không áp một ngưỡng mét thành quy tắc sử dụng tuyệt đối cho mọi đồng hồ.
3. Ưu tiên hướng dẫn nhà sản xuất theo mẫu/cấu hình và điều kiện sử dụng khi nói về thao tác. Không tự thêm khoảng bảo dưỡng, độ sâu hay hạn mức chưa có nguồn.
4. Hoàn thiện văn bản song ngữ, liên kết giữa định nghĩa–nguyên lý–hướng dẫn, giữ URL cũ; cập nhật cặp route nếu có bài mới. Không xây tương tác mới trong gói này.

**Đạt khi:** người đọc phân biệt được điều thông số cho biết và giới hạn; không có hai bài trùng mục đích; nguồn truy được; hai ngôn ngữ tương đương; check/build và các kiểm cụm liên quan đạt.

### H07 — Bối cảnh thế giới giúp hiểu lịch sử đồng hồ

**H07-A — Giao GLM:** chọn và triển khai thử 3–4 mốc mới có nguồn. Đọc timeline, khung chương và kiểm dữ liệu hiện hành; tìm những khoảng lịch sử thực sự cần giải thích.

- Mỗi mốc phải có ngày hoặc khoảng thời gian chính xác theo nguồn, mô tả VI/EN, nguồn chứng minh, phạm vi/giới hạn nếu cần, vị trí chương. Phân biệt sự kiện diễn ra cùng thời với quan hệ nhân quả.
- Chỉ dùng `type`/`claimLevel` đúng nghĩa; không ép tất cả vào một nhãn để vượt kiểm. Không bắt buộc có bài đọc thêm nếu chưa có bài phù hợp.
- Không tạo ảnh AI ở gói này. Dùng fallback hiện hành nếu phù hợp và không gây hiểu nhầm; không lấy ảnh ngoài chưa rõ quyền.
- Cập nhật số mốc đang hiển thị trong tiêu đề/mô tả VI/EN, cấu trúc chương và kiểm tra tương ứng theo dữ liệu mới; tránh mã hóa thêm số lượng cố định không cần thiết.

**Đạt khi:** mỗi mốc giải thích được vì sao hữu ích với người học đồng hồ; nguồn hỗ trợ đúng luận điểm; timeline và bộ lọc không hỏng; hai ngôn ngữ khớp; kiểm tự động và xem thử đạt.

**H07-B:** chỉ thực hiện khi anh yêu cầu mở rộng sau bản thử. Bổ sung để tổng toàn gói tối đa 10–12 mốc mới, không thêm 10–12 mốc nữa. Nếu không đủ mốc có giá trị và nguồn, báo số thực tế, không chạy theo chỉ tiêu.

### H08 — RSS để theo dõi bài mới

**Giao GLM:** tạo feed VI/EN theo nội dung xuất bản thực tế, tái sử dụng kiến trúc Astro đang có.

1. Kiểm thư viện hiện có; ưu tiên giải pháp gọn. Nếu cần dependency, kiểm tương thích phiên bản hiện tại, chỉ thêm phần phục vụ RSS.
2. Tạo `/rss.xml` và `/en/rss.xml`: URL tuyệt đối theo site canonical, tiêu đề/mô tả đúng ngôn ngữ, ngày hợp lệ, ID ổn định, sắp xếp nhất quán; không đưa draft hoặc tài liệu docs vào feed. Chọn mô tả ngắn thay vì đưa HTML tương tác phức tạp vào RSS.
3. Thêm liên kết khám phá feed trong head và footer cùng ngôn ngữ. Ghi “Theo dõi qua RSS” và giải thích ngắn; không coi RSS là đăng ký nhận thư và không tạo form email giả.
4. Kiểm escaping XML, bài có dấu tiếng Việt, bài không có ngày, thứ tự và link của item; quy định rõ xử lý cập nhật bài cũ để tránh đẩy bài lên đầu tùy tiện.

**Đạt khi:** hai feed đọc được bằng bộ phân tích XML/trình đọc feed, chỉ chứa bài đúng ngôn ngữ, link thật, MIME phù hợp; check/build đạt; không làm mất chức năng footer.

### H09 — Phóng to hình lịch sử

**Giao GLM:** thêm xem phóng to cho hình timeline ở VI/EN, dùng component chung và cách triển khai nhẹ.

- Người dùng mở được bằng bàn phím và chạm; có nút đóng rõ, Escape, quản lý focus trong hộp xem và trả focus đúng điểm mở. Nội dung nền không bị tương tác nhầm khi hộp mở.
- Tên hình, alt và chú thích theo ngôn ngữ trang; nhãn AI phải giữ khi phóng to nếu có. Hình vừa màn hình điện thoại, hỗ trợ thao tác phóng to trình duyệt, không khóa khả năng tiếp cận.
- Hình vẫn xem được và trang vẫn đọc được khi JavaScript không chạy; tránh thư viện lớn và không thêm tải ảnh lớn cho mọi mốc ngay lần mở trang.
- Kiểm desktop/mobile, sáng/tối, zoom 200%, giảm chuyển động và thao tác bàn phím; lưu ảnh trước–sau.

**Đạt khi:** thao tác mở/đóng liên tiếp nhiều hình không mất focus, không tràn ngang, không che nút đóng; bộ kiểm hiện hành vẫn đạt.

### H10 — Tối ưu ảnh có số đo trước–sau

**Giao GLM:** lập bảng tài sản ảnh thực sự được tải trên các trang mẫu, rồi tối ưu những ảnh có lợi ích rõ.

1. Đo trang chủ, lịch sử, một bài cơ chế, một mẫu biểu tượng và các bản EN liên quan: loại ảnh, kích thước hiển thị, byte truyền, ảnh đầu trang và ảnh dưới màn hình. Không dùng tổng dung lượng thư mục làm tải trọng trang.
2. Tạo bản WebP/AVIF khi cải thiện thực tế, giữ bản gốc và đường phục hồi. Dùng kích thước responsive phù hợp; không nén lại SVG như ảnh raster; không làm mất sơ đồ rõ nét.
3. Bảo toàn `WatchImage`, kích thước/tỷ lệ chống nhảy bố cục; chỉ lazy-load ảnh dưới màn hình. Giữ định dạng chia sẻ mạng xã hội tương thích; không đổi OG sang định dạng mới một cách máy móc.
4. Cập nhật `IMAGE-MANIFEST.md` với file, nơi render, trạng thái, nguồn/quyền và dung lượng; không tự xác nhận quyền cho ảnh không có hồ sơ.

**Đạt khi:** báo số trước–sau cùng điều kiện, hình không sai màu/mất chi tiết, không URL gãy; các trang mẫu hoạt động cả sáng/tối/mobile. Nếu một ảnh không giảm đáng kể thì giữ nguyên và giải thích.

### H11 — Kiểm và chuẩn bị cấu hình bảo vệ CSP

**Giao GLM:** chuẩn bị cấu hình và kiểm thử local/bản xem thử đã được cấp; chưa bật chế độ chặn trên production.

1. Kiểm cấu hình thật trong `vercel.json`, tài nguyên/script/styles, font, Analytics, Formspree, Pagefind và 3D. Phân biệt vi phạm website với extension trình duyệt.
2. Soạn phương án report-only có nơi nhận báo cáo nếu hạ tầng đã có và được phép dùng; không tự đăng ký dịch vụ ngoài, không ghi endpoint giả. Nếu chưa có endpoint, nêu giới hạn và dùng kiểm trình duyệt phù hợp.
3. Chuẩn bị chính sách enforce tối thiểu phù hợp cùng lý do từng quyền; không chỉ đổi tên header rồi coi hoàn tất. Không tự mở rộng `*` để che lỗi hoặc loại inline script hàng loạt ngoài phạm vi.
4. Kiểm trên môi trường có áp header thật. Astro preview thông thường không tự chứng minh header Vercel; nếu chưa có môi trường tương đương, ghi chưa kiểm triển khai. Việc tạo Vercel preview cần chỉ định phát hành riêng.
5. Lập cách khôi phục đúng cấu hình trước gói, tiêu chí quan sát và điều kiện đưa lên production. Báo rõ phần nào đã sửa local và phần nào mới là cấu hình đề xuất.

**Đạt khi:** có ma trận chức năng–kết quả, cấu hình kiểm được và giới hạn minh bạch; không làm mất gửi liên hệ, tìm kiếm hoặc 3D. Thiếu kiểm header thực thì trạng thái “chờ thử trên môi trường triển khai”, không ghi hoàn tất bảo vệ.

## 6. Các gói mở rộng có kiểm soát

### H12 — Một ảnh AI bối cảnh trước, tối đa ba ảnh

**H12-A — Giao GLM:** dùng quy chuẩn sau H04, chọn một bối cảnh phù hợp, ưu tiên xem xét mốc `trench-watch`; kiểm nguồn và hình sẵn có trước. Giữ phạm vi là bối cảnh, không tái tạo sản phẩm thương hiệu hoặc chi tiết máy chính xác.

1. Lập hồ sơ hình: mục đích, sự kiện nguồn, chi tiết thời đại, prompt, nội dung cần tránh, alt/chú thích VI/EN và vị trí hiển thị. Không coi nhãn `context` là đủ điều kiện.
2. Nếu có công cụ tạo ảnh được cấp thì tạo mẫu và tự rà chất lượng. Nếu không có, bàn giao prompt hoàn chỉnh và vị trí nhận file để GPT Work tạo bằng ImageGen; không yêu cầu anh tự biết tạo ảnh, không lấy ảnh mạng thay thế. Khi thiếu ảnh thật, phần tích hợp cần ảnh được ghi chờ, không giả báo xong.
3. Chuẩn bị bản xem thử ảnh bối cảnh cạnh hoặc gắn với sơ đồ theo quy chuẩn; giữ SVG và khả năng phục hồi. Phải có metadata/chú thích riêng, không chỉ thêm JPG để cơ chế tự thay ảnh.
4. Chú thích hiển thị rõ: “Minh họa AI tái dựng — không phải ảnh tư liệu” và “AI reconstruction — not a historical photograph”. Có cùng nhãn khi mở phóng to.
5. Tối ưu tỷ lệ 4:3 và dung lượng mục tiêu dưới 150 KB ở kích thước sử dụng; lưu bản gốc, bản dùng trên web, prompt và ngày tạo. Không đánh đổi khả năng đọc để đạt dung lượng.

**Đạt khi:** có ảnh thật để anh xem, không chữ lỗi/chi tiết sai thời đại nổi bật, phong cách nhất quán, nhãn không bị giấu; preview và kiểm liên quan đạt. Chờ anh duyệt hình trước khi nhân rộng.

**H12-B:** sau khi anh duyệt mẫu và yêu cầu mở rộng, chọn tối đa hai ảnh nữa. Không mặc định dùng `swatch-1983`/`silicon-revival` chỉ vì cùng `claimLevel`; báo lý do từng ảnh. Tổng gói tối đa ba ảnh, không thay toàn bộ 28 SVG.

### H13 — Tệp chỉ dẫn nội dung `llms.txt`

**Giao GLM:** tạo tệp ngắn chỉ dẫn tới các phần nội dung công khai quan trọng, ưu tiên cập nhật được từ nguồn dữ liệu có sẵn.

- Đặt ở `/llms.txt`; mô tả website, ngôn ngữ, nhóm nội dung, đường dẫn chính và quy trình biên tập công khai. Chỉ đưa URL thật của trang xuất bản.
- Không đưa docs nội bộ, tài khoản, thông tin riêng hoặc nội dung draft; không tạo tuyên bố cấp phép mới, không thay `robots.txt`.
- Không viết lời bảo đảm tăng thứ hạng hoặc được AI trích dẫn. Đây là thử nghiệm hỗ trợ khám phá nội dung, mức ưu tiên thấp.
- Kiểm tất cả URL, định dạng văn bản UTF-8 và build. Nếu phải duy trì thủ công thì ghi ai/cách cập nhật khi đổi đường dẫn.

**Đạt khi:** tệp công khai sạch, link đúng, không mâu thuẫn chính sách hiện tại, có cách tránh lỗi thời.

### H14 — Chọn một cụm mới và làm một bài mẫu

**H14-A — Giao GLM:** rà kho bài, nhu cầu từ H02 nếu có, so sánh ba hướng: nghề chế tác, vật liệu và phức tạp còn thiếu. Lập hồ sơ đề xuất, chưa tạo danh mục hoặc nhiều trang trống.

1. Mỗi hướng ghi độc giả, câu hỏi cần trả lời, nội dung đang có, phần còn thiếu, nguồn chính thức khả dụng và công duy trì.
2. Chọn một hướng khuyến nghị và phác thảo cụm 3–4 bài có mục đích riêng, liên kết vào thư viện hiện tại; chọn một bài mẫu đầu tiên. Không có analytics vẫn có thể dùng khoảng trống biên tập, nhưng phải ghi đó là căn cứ biên tập.
3. Làm hồ sơ nguồn và dàn ý VI/EN cho bài mẫu. Nếu cần cấu trúc mục mới, mô tả rõ tác động và phương án dùng mục hiện có; không tự tái cấu trúc navigation.

**Đạt khi:** anh hiểu cụm đó giúp người đọc điều gì, khác bài cũ ở đâu, và được xem một dàn ý có nguồn đủ để quyết định.

**H14-B:** khi anh chọn hướng và giao thực hiện, hoàn thiện đúng một bài mẫu song ngữ, liên kết và kiểm thử như H05/H06. Báo kết quả trước khi giao các bài còn lại; ước lượng 12–24 giờ/cụm là dự toán ban đầu, cập nhật theo phạm vi thực đã chọn.

## 7. Mẫu báo cáo bắt buộc — GLM gửi sau mỗi lượt

```text
Gói: Hxx / lượt ...
Trạng thái: hoàn thành local / hoàn thành một phần / chờ dữ liệu hoặc quyền / đã kiểm production.
HEAD lúc bắt đầu, ngày thực hiện:

1. Người đọc website được lợi gì? Tối đa ba câu, ngôn ngữ thông thường.
2. Đã làm gì? Danh sách việc trong gói, kèm kết quả thật.
3. File đã tạo/sửa và vị trí dòng; thay đổi thuộc gói hay đã có từ trước.
4. Địa chỉ xem thử, ảnh trước–sau nếu có thay đổi giao diện.
5. Kiểm tra đã chạy: kết quả, mã thoát, lỗi/cảnh báo; kiểm thủ công nào đã/chưa làm.
6. Bằng chứng nguồn/bản dịch/số liệu trước–sau theo yêu cầu riêng của gói.
7. Còn thiếu gì? Tác động và cách giải quyết; không giấu phần chưa kiểm.
8. Có cần anh Vinh thao tác tài khoản, duyệt hình hoặc quyết định phát hành không? Chỉ nêu việc thật sự cần.
9. Đường dẫn file nghiệm thu; danh sách file dự kiến đưa vào lần phát hành.
10. Gói tiếp theo đề nghị; chưa tự thực hiện.

Xác nhận: đã/chưa commit; đã/chưa push; đã/chưa deploy. Không gộp ba trạng thái thành “đã xong”.
```

## 8. Câu lệnh phát hành — chỉ dùng sau khi anh chọn phát hành

```text
GPT Work đã kiểm độc lập, thông báo gói [mã gói/lượt] đủ điều kiện nghiệm thu và cho phép commit/push theo báo cáo [đường dẫn báo cáo]. Tôi đồng ý phát hành gói này.

Kiểm tra lại thay đổi hiện tại và tình trạng local/GitHub. Chỉ chọn các file thuộc gói đã nghiệm thu; không dùng git add . và không đưa thay đổi khác vào. Nếu có nội dung thay đổi sau nghiệm thu, kiểm lại phần đó trước. Commit và push theo quy trình nhánh hiện hành của dự án; không force push, không ghi đè công việc người khác. Nếu việc đưa lên main cần merge, chỉ merge phần gói đã được duyệt sau các kiểm tra bắt buộc.

Theo dõi kết quả triển khai Vercel nếu có quyền, kiểm các route production liên quan và báo mã commit, trạng thái deployment, kết quả kiểm thực tế. Chưa xác minh được production thì nói rõ, không coi push thành công là deploy thành công. Với H11, chỉ áp cấu hình enforce đã được thử và nêu trong báo cáo được duyệt; cấu hình khôi phục phải sẵn.
```

Không dùng câu lệnh này ở lần giao H01 đầu tiên. Trong đợt hiện tại, thứ anh cần gửi ngay là câu lệnh bắt đầu ở mục 2.
