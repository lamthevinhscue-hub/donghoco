# G04 — Quyết định hướng kết hợp và prompt giao GLM G04-B

Ngày 12/09/2026. Danh mục DHC-NEXT-20260912 v1.0.0. Nền đã kiểm: 234fa26, main, không có sửa đổi tracked khi chuẩn bị bàn giao.

## Quyết định của chủ dự án

Anh Vinh đã xem các ảnh A/B/C, đồng ý hướng kết hợp được GPT Work đề xuất và yêu cầu tiếp tục:
- A+B: một ảnh chủ đạo có bánh lắc–dây tóc lớn, nền bàn chế tác mờ, xanh đậm và đồng ấm.
- C: chỉ mượn cách kể chuyện con lắc → bánh lắc–dây tóc bằng dòng thời gian và SVG; bỏ hành tinh/phong cảnh kỳ ảo.
- Phần nguyên lý dùng SVG tương tác; ảnh AI dùng tạo bối cảnh.

Cổng lựa chọn hướng G04-A đã được chủ dự án quyết định. Đây không phải nghiệm thu mã G04-B, không phải xác nhận G04 đã commit/push. Ảnh kết hợp v1 do GPT Work tạo sau quyết định này sẽ được xem trong bản tích hợp; không ghi rằng chủ dự án đã duyệt từng pixel ảnh mới.

## Tài sản chuyển giao

Ảnh gốc: output/g04-banh-lac-day-toc-design/drafts/huong-ab-v1.png.
Ba bản A/B/C giữ làm lịch sử lựa chọn. Công cụ tạo: Image Generation tích hợp; không trả định danh model. Ngày tạo: 12/09/2026. Chú thích hiển thị bắt buộc: “Minh họa AI tái dựng — không phải ảnh tư liệu” / “AI reconstruction — not a historical photograph”.

Đã mở kiểm ảnh: chủ thể lớn bên phải, nền bàn chế tác mờ, khoảng trống trái; không thấy chữ đọc được hoặc logo. Dây tóc và điểm gắn trong ảnh không phải cơ sở dựng hình kỹ thuật. Chưa đo bản web, crop mobile hoặc hiệu năng tích hợp.

Prompt thực tế:

Create a single polished landscape 16:9 editorial hero image for the educational chapter Balance wheel and hairspring. Approved hybrid A+B: a large, clearly visible abstract brass watch balance wheel and delicate coiled hairspring in the right foreground, floating as an intentional editorial visual, against a softly blurred modern watchmaker workbench with just a few indistinct tools. Left third calm deep navy negative space for future HTML headline. Warm one-direction studio illumination, muted brushed brass and steel, navy #1F2D3D and warm brass #B8893C/#D4A85A, restrained realistic material texture, dignified craftsmanship, shallow depth of field. The foreground has visual clarity and the background remains subordinate. A conceptual AI reconstruction, not a mechanically certified schematic, not a specific artifact or workshop of 1675. Do not add planets, fantasy landscape, light trails, pendulum clocks, pocket watches or extra narrative objects. No people, hands, portraits, readable text, labels, dates, numbers, logos, engraving, watermark or signature. No caption inside image. The mechanical teaching will be supplied by separate SVG on the webpage. One coherent composition, not a collage of panels.

## Prompt thực hiện G04-B — gửi nguyên mục này cho GLM

Bạn là GLM thực thi dự án Đồng Hồ Cơ trong D:\Watch web build. Đọc AGENTS.md, CONTENT-GUIDE.md tại vị trí thực tế, kế hoạch final 12/09, hồ sơ G04-A và quyết định hướng kết hợp trong tài liệu này. Kiểm git log/status trước mọi sửa đổi; bảo toàn toàn bộ tệp untracked có trước. Không commit, push, deploy; xong bàn giao GPT Work nghiệm thu độc lập.

### Mục tiêu và phạm vi

Triển khai một chương mẫu song ngữ “Bánh lắc và dây tóc” trên đúng hai route hiện có:
- /co-che/day-toc-banh-lac/
- /en/mechanisms/balance-and-hairspring/

Phạm vi tệp:
- src/components/templates/MechanismArticle.astro: chỉ nhánh tích hợp dành cho hai bài này.
- Component mới src/components/history/BalanceHairspringChapter.astro; helper/style cùng thư mục nếu thực sự cần, liệt kê rõ.
- Hai bài Markdown coChe VI/EN tương ứng: đồng bộ nguồn lịch sử, cờ tương tác và bỏ lời giới thiệu bị lặp nếu cần; giữ nội dung kỹ thuật và liên kết đã được duyệt.
- public/images/history/balance-hairspring/: bản web tối ưu từ huong-ab-v1.png.
- scripts/check-g04-balance-chapter.mjs; package.json chỉ thêm lệnh kiểm G04 phù hợp và nối vào chuỗi hiện hành.
- docs/nghiem-thu/G04-B-chuong-banh-lac-day-toc-2026-09-12.md, output/g04-balance-chapter/ cho bằng chứng.
- Hồ sơ G04-A và README/prompt trong output/g04-banh-lac-day-toc-design/: cập nhật trạng thái hiện hành có ảnh và đã chọn hướng, giữ rõ lịch sử GLM từng thiếu công cụ. Bổ sung manifest ảnh, thông số thực tế, quyền sử dụng/giới hạn và bản chọn; không xóa bản A/B/C.

Không sửa component Hairspring.astro đang dùng chung trên các route khác, không sửa MechanismAnimation dùng chung. Tạo component chương riêng và chỉ thay thế việc render infographic cũ trên đúng hai bài mẫu; tránh hai infographic cùng xuất hiện. Không bật toàn bộ infographic EN. Nếu cần sửa tệp ngoài phạm vi để hoàn thành thì báo lý do và dừng phần phụ thuộc.

### Thiết kế cần thực hiện

1. Một ảnh AI chủ đạo A+B duy nhất. Tiêu đề và chú thích là HTML dịch được. Mobile ưu tiên chủ thể còn rõ; có thể đưa chữ ra ngoài ảnh. Không ép crop làm mất bánh lắc. Không tạo ảnh AI mới hoặc dùng ba ảnh rời cùng lúc.
2. Bối cảnh lịch sử gọn: hai mốc 1657/1675 đúng timeLabel và phạm vi nguồn G02; giữ giới hạn tranh chấp Hooke. Biểu tượng con lắc → bánh lắc–dây tóc, không khẳng định thay thế tức thì/phổ cập toàn ngành.
3. SVG nguyên lý riêng, có nhãn VI/EN: bánh lắc, dây tóc, điểm gắn cố định và phần chuyển động. Nguồn là bài VI/EN và hồ sơ G02/FHH, tuyệt đối không suy cấu tạo từ ảnh AI. Đầu ngoài dây tóc đứng yên, đầu trong gắn với phần quay; không dùng scale cả lò xo làm điểm cố định chạy theo. Mô hình giản lược phải ghi là minh họa, không phải phép đo hoặc cơ cấu theo tỷ lệ.
4. Giải thích một dao động đầy đủ gồm hai lần rung theo nội dung đã duyệt; không thêm mốc VPH, vật liệu, độ chính xác hoặc xếp hạng chưa có nguồn.
5. Điều khiển Tĩnh/Phát/Tạm dừng/Bước/Đặt lại và bản EN đầy đủ. Khởi tạo tĩnh. Bước tiến một pha xác định khi đang tạm dừng; Đặt lại trở về trạng thái đầu. Có hiển thị trạng thái, focus rõ, tên truy cập đúng.
6. Reduced-motion: khi bật hoặc đổi preference giữa phiên, dừng chuyển động liên tục thật; vẫn cho phép bước rời rạc. Dừng khi ra ngoài viewport hoặc tab bị ẩn; chỉ phát lại khi người dùng chủ động yêu cầu. Dọn vòng lặp/listener đúng cách.
7. Nguồn, giới hạn và đọc tiếp dùng route thật theo ngôn ngữ; không tạo trang EN lịch sử giả. Nội dung vẫn đọc được khi JS tắt, ảnh lỗi hoặc chưa tải.

### Giới hạn

Không nâng dependency, thay CSP/Analytics, sửa Header/i18n map, schema timeline, thay 28 hình lịch sử hay xử lý backlog G03/G05-G09. Không thêm autoplay, âm thanh, 3D, thư viện hoạt ảnh. Không nới checker hiện có, bỏ rule, thêm suppression hoặc any để làm kiểm tra qua. Không thay đổi dữ kiện ngoài hai bài mẫu.

### Kiểm chứng và tiêu chí nghiệm thu

- Lưu baseline trước sửa: diagnostics, số route/link, ảnh/request/byte và trạng thái hai bài. Tận dụng log nền có thật khi mã vẫn khớp; không lặp build không cần thiết.
- npm run build đạt với toàn bộ checker hiện hành; G01/G02 vẫn qua. Không tăng lỗi/cảnh báo/hints so baseline đã đo. Giữ tập route hiện có; link tăng phải giải thích từ thay đổi thật.
- Kiểm G04: component chỉ xuất hiện trên hai bài đích, không lặp infographic cũ; đủ nội dung/nhãn/caption VI/EN, nguồn/link tồn tại, tài sản ảnh tồn tại; không rò nội dung VI trong điều khiển EN.
- Trình duyệt thật: hai route × 320/768/1440 × sáng/tối. Ghi URL, thời gian, viewport, theme thực từ DOM; không tràn ngang, chữ và chủ thể đọc được. Mở kiểm các screenshot đúng chương.
- Thử từng nút bằng chuột và bàn phím. Chứng minh Phát làm phần tử SVG chuyển động, Tạm dừng/Tĩnh/Đặt lại đúng, Bước thay đổi pha hữu hạn; không suy chuyển động chỉ từ aria-pressed.
- Reduced-motion và ngoài viewport/tab ẩn: so transform/path hoặc pixel của chính bộ phận chuyển động qua nhiều mẫu thời gian, kiểm trạng thái vòng lặp. Có thử thay preference khi đang phát. Không dùng probe phần tử cha đứng yên để kết luận phần tử con đã dừng.
- Kiểm ID toàn tài liệu và url(#) cho hai route; ID component mới không trùng. Thử cô lập hai instance nếu component dùng ID, không tạo route thử production.
- Chụp cùng đối tượng trước/sau, kiểm ảnh load hoàn tất, fallback ảnh lỗi và không JS. Không cần tuyên bố đã test screen reader thật nếu không thực hiện.
- Bản web mục tiêu ≤150 KB ở kích thước dùng thật, đo số byte thực; bản gốc PNG giữ trong drafts. Nếu không đạt chất lượng ở ngưỡng này, báo số thật và trình tradeoff. Ghi width/height, responsive sizing, đo request/byte cold-load trước/sau và layout shift quan sát được; không hứa tăng hiệu năng/học tập.
- Kiểm whitespace cả untracked và diff; quét bí mật; không lưu cookie/storageState/token, không gửi form hay sự kiện thử ra dịch vụ ngoài.

### Bàn giao

Biên bản tự chứa: nền, manifest chính xác tệp thuộc gói (tách G04-A có trước/GPT Work tạo và G04-B do GLM sửa), cách ghép ảnh, nguồn từng claim, kết quả từng tiêu chí, các giới hạn, đường hoàn nguyên. Lưu script kiểm và log UTF-8 dễ tái chạy; không ghi “đạt” từ log thiếu.

Kết thúc báo “G04-B xong tự kiểm — chờ GPT Work nghiệm thu; chưa commit/push/deploy”. Không gọi G04 hoặc danh mục hoàn tất. Sau nghiệm thu chương mẫu vẫn dừng để anh Vinh duyệt, không mở G05-G09.
