# BIÊN BẢN GÓI S4 — BẢNG QUÉT CÂU SO SÁNH TUYỆT ĐỐI TRONG BÀI TIẾNG VIỆT CŨ

**Ngày:** 26/09/2026
**Giao dịch:** TXN-20260926-184 — danh mục DHC-GD3-20260925 v1.0.0; **vòng sửa 1 (hiệu chỉnh phân loại nguồn): TXN-20260926-185**
**Nền Git:** HEAD = `origin/main` = `7fd1625` (`7fd16250ba3900e63ac621ff5ba47141d89036ef`), nhánh `main`, staged = 0, tracked sửa 0 khi bắt đầu
**Căn cứ:** `docs/KE-HOACH-HOP-NHAT-GIAI-DOAN-3-2026-09-25.md` mục S4; prompt GPT Work S4 + vòng sửa 1
**Trạng thái:** đã làm xong vòng sửa 1, CHƯA stage, CHƯA commit, CHƯA push — chờ GPT Work tái nghiệm thu và trình anh Vinh duyệt hướng sửa từng câu

---

## 1. Tính chất gói

Gói **kiểm kê, chỉ đọc**: quét toàn bộ Markdown tiếng Việt dưới `src/content/*/vi/`, lập bảng các câu ứng viên có thể là so sánh hoặc khẳng định tuyệt đối chưa có căn cứ hiển thị trong chính bài. **Không sửa bất kỳ tệp nội dung nào**, không đề xuất câu thay thế, không kết luận đúng/sai chuyên môn. Biên bản này chỉ ghi phạm vi, câu trước/sau (bảng), kết quả tự kiểm và trạng thái Git; **không liên quan đến việc tạo hay duyệt ảnh mới, không chạy build vì không có thay đổi website**.

## 2. Phương pháp quét (cố định, chạy lặp lại)

- Công cụ: `output/s4-absolute-claims-audit/quet-s4.mjs` (nội bộ) — quét 225 tệp `.md` trong năm thư mục `src/content/{coChe,huongDan,mauIconic,thuongHieu,tuDien}/vi/` (collection `trang` không có nhánh `vi/`); bỏ frontmatter và khối code fence; tìm 7 cụm không phân biệt hoa thường: `nhất thế giới`, `hơn mọi`, `duy nhất`, `tốt nhất`, `đầu tiên`, `chuẩn mực`, `số một`; ghi theo dòng.
- Với mỗi dòng ứng viên, công cụ gắn cờ heuristic quy chiếu (câu hoặc dòng liền kề chứa "theo …"/URL) — **chỉ dùng để lập danh sách rà, không dùng để tự quyết**; quyết định cuối là đọc nguyên câu và đoạn liền kề, đối chiếu thủ công từng dòng.
- Danh sách thô: `output/s4-absolute-claims-audit/tho-s4.json` (197 dòng ứng viên) + bản đọc `tho-s4-doc.md`. Bảng trong biên bản sinh từ danh sách thô bằng `sinh-bien-ban.mjs` với bản phân loại thủ công từng dòng (mapping theo key `tệp:dòng:cụm`), rồi **đã đối chiếu thủ công lại từng dòng bảng chính với tệp nguồn** (đúng tệp, đúng dòng, đúng nguyên văn).

### Quy tắc phân loại nguồn (áp từ vòng sửa 1, TXN-20260926-185)

1. Câu có nguồn/quy chiếu rõ **và nguồn phù hợp** → chuyển sang "Loại trừ có chủ đích", ghi tệp, dòng, cụm, lý do cụ thể.
2. Câu có dẫn chiếu nhưng **nguồn không đạt chuẩn dự án** (ví dụ Wikipedia) → giữ bảng chính, cột nguồn ghi `Có — nguồn được nêu là Wikipedia, cần Claude soát chất lượng nguồn`.
3. Câu có "theo" nhưng **không phải quy chiếu nguồn** (ví dụ "theo đuổi", "theo người đeo") → giữ hoặc loại tùy nghĩa thực tế; cột bằng chứng ghi đúng nghĩa, không coi đó là nguồn.
4. Mọi dòng còn lại trong bảng chính có trạng thái nguồn đúng một trong: `Có` / `Có, nhưng nguồn chưa đạt chuẩn` / `Không thấy` / `Trích dẫn hoặc phản biện`.

## 3. Tổng số ứng viên theo cụm (trước phân loại)

| Cụm | Số dòng ứng viên |
|---|---:|
| nhất thế giới | 13 |
| hơn mọi | 1 |
| duy nhất | 40 |
| tốt nhất | 10 |
| đầu tiên | 127 |
| chuẩn mực | 11 |
| số một | 2 |
| **Tổng mục cụm** | **204** (một số dòng chứa nhiều hơn một cụm, nên mục cụm > số dòng: 197 dòng) |

## 4. Bảng chính — các câu ứng viên cần Claude soát

Số dòng bảng chính: **104** (được tính lại tự động từ dữ liệu sau hiệu chỉnh phân loại, không ghi tay).

| Tệp | Dòng | Vị trí | Cụm kích hoạt | Câu nguyên văn đầy đủ | Có nguồn trực tiếp trong câu/đoạn liền kề? | Bằng chứng hoặc lý do | Trạng thái chờ soát |
|---|---:|---|---|---|---|---|---|
| coChe/vi/chong-soc.md | 64 | Bài cơ chế — thân bài | đầu tiên | - **1929** — Bằng sáng chế Thụy Sĩ đầu tiên (số 141098) được đăng ký. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| coChe/vi/da-quang.md | 40 | Bài cơ chế — thân bài | đầu tiên | Nhưng radium **phóng xạ mạnh**, và những nữ công nhân sơn radium — những người đầu tiên — đã trả giá. Họ có thói quen liếm cọ sơn cho nhọn đầu, không biết radium nguy hiểm. Câu chuyện của họ là một trong những thảm kỷ niệm sớm nhất về an toàn lao động trong công nghiệp, và là lý do ngành đồng hồ bỏ radium hoàn toàn. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| huongDan/vi/chon-co-dong-ho.md | 42 | Bài hướng dẫn — thân bài | hơn mọi | - **Thử đeo khi có thể** — cảm giác thực trên cổ tay bạn là tiêu chuẩn cuối cùng, hơn mọi con số. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| huongDan/vi/chon-co-dong-ho.md | 44 | Bài hướng dẫn — thân bài | tốt nhất | - **So thông số với chiếc đồng hồ bản thân đã đeo thoải mái** — nếu bạn có một chiếc đã ưng, thông số của nó là mốc so sánh tốt nhất: chiếc mới nên đọc thông số cùng nhóm để biết nó sẽ nằm lớn hơn hay nhỏ hơn trên tay. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/baume-mercier-riviera.md | 29 | Hồ sơ iconic — thân bài | chuẩn mực | Năm **1973**, Baume & Mercier giới thiệu Riviera do Jean-Claude Gueit thiết kế. Trong thời điểm dress watch vàng vẫn là chuẩn mực quen thuộc, Riviera chọn vỏ thép và một dáng thể thao-thanh lịch có thể theo người đeo từ thành phố đến hoạt động cuối tuần. | Không thấy | Câu chứa "theo người đeo" — "theo" ở đây không phải quy chiếu nguồn; không thấy nguồn trực tiếp | Cần Claude soát |
| mauIconic/vi/bvlgari-octo-finissimo.md | 29 | Hồ sơ iconic — thân bài | nhất thế giới | Kỷ lục đáng nói nhất: **Octo Finissimo Ultra COSC dày tổng cộng 1,70mm** — vừa là **đồng hồ cơ mỏng nhất từng được sản xuất**, vừa là **chronometer đạt chuẩn COSC mỏng nhất thế giới**. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/credor-eichi-2.md | 33 | Hồ sơ iconic — thân bài | duy nhất | **Được làm, lắp ráp và hoàn thiện hoàn toàn bằng tay.** Chi tiết đáng nói nhất: **cả mười hai vạch chỉ giờ lẫn các chữ cái tên Credor đều được vẽ tay lên mặt số sứ bởi một người thợ của chính xưởng** — một người duy nhất, không dây chuyền, không máy in. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/credor-eichi-2.md | 43 | Hồ sơ iconic — thân bài | nhất thế giới | Eichi II chứng minh rằng mức hoàn thiện thủ công cao nhất thế giới không chỉ nằm ở Thụy Sĩ — nó có thể sinh ra từ một xưởng Nhật Bản với sự kiên nhẫn tương tự. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/de-bethune-db28.md | 44 | Hồ sơ iconic — thân bài | đầu tiên | De Bethune còn là **nhà chế tác đầu tiên đưa pha mặt trăng dạng cầu vào đồng hồ đeo tay** — thành tựu được cấp bằng sáng chế. DB28 gói gọn triết lý của hãng: nghiên cứu vật lý và vật liệu như một hình thức chế tác. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/doxa-sub-300.md | 29 | Hồ sơ iconic — thân bài | đầu tiên | Năm 1967, tại hội chợ Basel, Doxa giới thiệu khái niệm SUB. SUB 300 được xem là **chiếc đồng hồ lặn đầu tiên thiết kế có chủ đích và bán rộng rãi cho công chúng**, với **vành xoay được cấp bằng sáng chế** và mặt số cam đặc trưng. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/doxa-sub-300.md | 33 | Hồ sơ iconic — thân bài | tốt nhất | Đây không phải lựa chọn thẩm mỹ. **Nghiên cứu cho thấy màu cam cho khả năng đọc tốt nhất ở độ sâu**, nơi ánh sáng tắt nhanh và màu sắc bắt đầu biến mất. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/dufour-simplicity.md | 40 | Hồ sơ iconic — thân bài | chuẩn mực | - **Bộ máy lên dây tay** — hoàn thiện tới mức được cả ngành lấy làm **chuẩn mực**. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/fc-heart-beat.md | 33 | Hồ sơ iconic — thân bài | duy nhất | Đây là bài duy nhất trong toàn bộ danh mục mẫu iconic mà **chủ thể là một ý tưởng thiết kế, không phải một chiếc đồng hồ cụ thể**. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/fc-heart-beat.md | 37 | Hồ sơ iconic — thân bài | duy nhất | - **Ô lộ máy ở vị trí 12 giờ**, để thấy [bánh lắc](/tu-dien/day-toc-banh-lac) dao động. Đây là chi tiết duy nhất cần nhớ về dòng này. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/fc-heart-beat.md | 39 | Hồ sơ iconic — thân bài | duy nhất | - Phần còn lại của mặt số giữ ngôn ngữ đồng hồ thanh lịch cổ điển: tối giản, cọc số mảnh, không trang trí thừa. Ô lộ máy là điểm nhấn duy nhất, và chính sự tiết chế xung quanh làm nó nổi bật. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/fifty-fathoms.md | 42 | Hồ sơ iconic — thân bài | chuẩn mực | Cùng năm ra đời **không nói lên ai sao chép ai** — 1953 là thời điểm ý tưởng đồng hồ lặn chuyên nghiệp đã chín ở hai bên bờ Đại Tây Dương, đúng như phần lặn của [hành trình lịch sử](/lich-su/) cũng đặt vấn đề. So sánh chi tiết đòi hỏi đi vào từng reference cụ thể của từng mẫu; ở cấp dòng lịch sử, hai mẫu xứng đáng đọc song hành: mỗi bên góp một đường đi riêng vào chuẩn mực đồng hồ lặn sau này. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/fifty-fathoms.md | 46 | Hồ sơ iconic — thân bài | chuẩn mực | **1 fathom (sải) = 1,8288 mét**. Năm mươi fathoms = **91,4 mét** — mức chống nước mà Maloubier tính toán là tối đa một thợ lặn có thể đi xuống với bình khí thời đó mà không chết. Con số này trở thành chuẩn mực đồng hồ lặn nhiều năm sau. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/fpjourne-chronometre-bleu.md | 37 | Hồ sơ iconic — thân bài | đầu tiên | Đây là **cửa vào danh mục** của F.P. Journe — mẫu dễ tiếp cận nhất và cũng là mẫu **được yêu thích nhất** của hãng. Với một nhà chế tác độc lập mà mỗi bộ máy đều tự thiết kế và chế tạo, việc có một "cửa vào" quan trọng: đó là chiếc đồng hồ đầu tiên nhiều người đeo mang tên Journe trên cổ tay. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/freak.md | 41 | Hồ sơ iconic — thân bài | đầu tiên | - **Dùng silic** — một trong những đồng hồ đầu tiên dùng silic trong movement thương mại. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/freak.md | 57 | Hồ sơ iconic — thân bài | đầu tiên | 1. **Silic thương mại** — dây tóc và bộ phận escape bằng silic, một trong những ứng dụng đầu tiên. Nay silic phổ biến (Omega Master, Tudor) nhưng Freak tiên phong. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/girard-perregaux-tourbillon-ba-cau.md | 44 | Hồ sơ iconic — thân bài | duy nhất | - **Tourbillon ở vị trí 6 giờ** — nơi thứ duy nhất còn lại cho bộ phận này trong bố cục ba cầu. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/hajime-asaoka-project-t.md | 32 | Hồ sơ iconic — thân bài | đầu tiên | **Năm 2009, ông làm ra chiếc đồng hồ đeo tay đầu tiên của Nhật Bản có bộ máy tourbillon in-house** — cột mốc đưa ông thành người mở đường cho giới chế tác độc lập Nhật Bản. **Năm 2011 ông bắt đầu bán đồng hồ dưới tên riêng**, mang tên HAJIME ASAOKA Tokyo Japan. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/hajime-asaoka-project-t.md | 42 | Hồ sơ iconic — thân bài | đầu tiên | Ít ai minh họa rõ hơn cho câu "nghề làm đồng hồ có thể học được": một nhà thiết kế công nghiệp tự học từ sách và video, làm ra tourbillon in-house đầu tiên của một nước có nền công nghiệp đồng hồ lớn. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/hamilton-ventura.md | 38 | Hồ sơ iconic — thân bài | đầu tiên | Năm **1957**, [Hamilton](/thuong-hieu/hamilton) ra mắt **Ventura** — **chiếc đồng hồ đeo tay chạy pin đầu tiên trên thế giới**. Riêng bộ máy chạy pin đã mất khoảng **một thập kỷ** để phát triển — đây không phải một vụ trót ăn may mà là kết quả của một dự án dài. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/hamilton-ventura.md | 48 | Hồ sơ iconic — thân bài | đầu tiên | - **Bộ máy chạy pin** — Ventura sinh ra để đánh dấu lần đầu tiên đồng hồ đeo tay chạy bằng pin; đây là đóng góp lịch sử lớn nhất của Hamilton. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/hamilton-ventura.md | 53 | Hồ sơ iconic — thân bài | đầu tiên | Ventura năm 1957 dùng **bộ máy chạy pin** — loại đầu tiên trong đồng hồ đeo tay. Việc phát triển bộ máy này mất khoảng một thập kỷ trước khi ra mắt. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/hamilton-ventura.md | 61 | Hồ sơ iconic — thân bài | đầu tiên | Ventura quan trọng ở hai tầng. Trước hết, nó là **cột mốc kỹ thuật**: chiếc đồng hồ đeo tay chạy pin đầu tiên thế giới — một bước ngoặt lớn như chiếc Quartz Astron của Seiko mười hai năm sau đó. Thứ hai, nó là **cột mốc thiết kế**: vỏ phi đối xứng của Arbib đến nay vẫn độc nhất, và việc Elvis Presley chọn nó đã đưa Ventura vượt ra khỏi giới đồng hồ để trở thành biểu tượng văn hóa đại chúng. Với Hamilton — hãng có gốc gác từ đồng hồ đường sắt Mỹ, nay thuộc Swatch Group và đặt trụ sở tại Biel, Thụy Sĩ — Ventura là bằng chứng hãng từng dám đi trước thời đại cả về kỹ thuật lẫn thẩm mỹ. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/iwc-mark-xi.md | 48 | Hồ sơ iconic — thân bài | chuẩn mực | Mark XI trở thành đồng hồ tiêu chuẩn cho phi công RAF và các không lực Khối Thịnh vượng chung trong hơn 30 năm. Đây là mẫu định nghĩa **"pilot watch"** — chuẩn mực cho mọi đồng hồ phi công sau này. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/mbf-horological-machine-1.md | 31 | Hồ sơ iconic — thân bài | đầu tiên | Bối cảnh: MB&F do **Maximilian Büsser lập năm 2005**, là **phòng thí nghiệm ý niệm đồng hồ đầu tiên trên thế giới**, ra đời từ ý muốn **tháo rời chế tác truyền thống thành nghệ thuật động ba chiều**. Trước đó Büsser có **bảy năm trong ban lãnh đạo cấp cao Jaeger-LeCoultre**, rồi **bảy năm làm giám đốc điều hành Harry Winston Rare Timepieces** từ năm 1998 khi mới 31 tuổi. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/mido-multifort.md | 26 | Hồ sơ iconic — thân bài | đầu tiên | Multifort là **một trong những đồng hồ chống từ đầu tiên có bộ máy tự lên dây**, đồng thời **chống nước và chống sốc tích hợp ngay trong thiết kế** — và là **mẫu bán chạy nhất của Mido từ thập niên 1930 tới thập niên 1950**. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/mido-multifort.md | 32 | Hồ sơ iconic — thân bài | duy nhất | Ba tính năng — chống từ, chống nước, chống sốc — ngày nay là chuyện đương nhiên, nhưng **gộp cả ba vào một chiếc đồng hồ giá phổ thông ở thập niên 1930 là điều hiếm**. Multifort làm được điều đó trong một thiết kế duy nhất, là lời giải cho câu hỏi: đồng hồ của người thường dùng hằng ngày cần chống lại những gì? Câu trả lời: mọi thứ. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/monaco.md | 35 | Hồ sơ iconic — thân bài | đầu tiên | Năm 1969 — **năm của chronograph tự động**. Ba nhóm cùng tranh đua: Zenith (El Primero), Heuer-Breitling (Calibre 11), và Seiko. Heuer (sau này là TAG Heuer) hợp tác với Breitling, Hamilton và Dubois Depraz phát triển **Calibre 11** — một trong những chronograph tự động đầu tiên thế giới. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/monaco.md | 53 | Hồ sơ iconic — thân bài | đầu tiên | ## Calibre 11 — chronograph tự động đầu tiên | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/monaco.md | 55 | Hồ sơ iconic — thân bài | đầu tiên | Monaco nguyên bản dùng **Calibre 11** — một trong những chronograph tự động đầu tiên thế giới, phát triển với Breitling và Dubois Depraz. Đặc điểm: | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/montblanc-minerva-monopusher.md | 28 | Hồ sơ iconic — thân bài | đầu tiên | **Đầu thế kỷ 20**, xưởng này đi tiên phong với **một trong những chronograph một nút bấm lên dây tay đầu tiên làm cho đồng hồ đeo tay**. **Khoảng một thập kỷ sau**, calibre **17.29** ra mắt — một trong những chronograph một nút bấm **mỏng nhất, chỉ cao 5,6mm**. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/montblanc-minerva-monopusher.md | 32 | Hồ sơ iconic — thân bài | duy nhất | Monopusher — bấm bắt đầu, dừng và đặt về không bằng **duy nhất một nút** tích hợp trong núm vặn. Đây là bố cục chronograph cổ xưa nhất, đòi hỏi logic cơ khí gọn hơn hai nút quen thuộc ngày nay — và là bố cục mà dòng 1858 Monopusher ngày nay nối lại từ di sản Minerva. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/nomos-tangente.md | 31 | Hồ sơ iconic — thân bài | đầu tiên | Tangente **bán chạy liên tục hơn ba mươi năm** và là gương mặt nhận diện của NOMOS Glashütte. Đây là **mẫu đồng hồ đầu tiên** của hãng (theo hãng), ra từ nguyên lý thiết kế "hình thức theo công dụng". | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/omega-speedmaster.md | 43 | Hồ sơ iconic — thân bài | đầu tiên | Không ai ngờ rằng 12 năm sau, Speedmaster sẽ trở thành chiếc đồng hồ đầu tiên được đeo trên Mặt Trăng. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/omega-speedmaster.md | 62 | Hồ sơ iconic — thân bài | đầu tiên | - **CK2915** (1957) — thế hệ đầu tiên của dòng. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/orient-bambino.md | 33 | Hồ sơ iconic — thân bài | tốt nhất | Đây là mẫu đưa rất nhiều người Việt tới với đồng hồ cơ lần đầu — không phải vì nó đẹp nhất hay tốt nhất, mà vì nó là **chiếc đồng hồ thanh lịch dùng bộ máy do chính hãng làm ra**. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/orient-bambino.md | 59 | Hồ sơ iconic — thân bài | đầu tiên | Bambino không phải mẫu đột phá về kỹ thuật hay thiết kế. Vị trí của nó nằm ở chỗ khác: **đây là cánh cửa vào**. Với rất nhiều người, Bambino là chiếc đồng hồ đầu tiên họ thấy kim giây trôi mượt thay vì nhảy từng nấc, là lần đầu họ đeo một thứ chạy bằng [dây cót](/tu-dien/day-cot) chứ không phải pin. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/parmigiani-toric.md | 25 | Hồ sơ iconic — thân bài | đầu tiên | **Toric QP Retrograde là chiếc đồng hồ đeo tay đầu tiên mang tên thương hiệu Parmigiani Fleurier**, ra mắt năm 1996 — cùng năm thương hiệu chính thức ra đời. **Lễ ra mắt thương hiệu tổ chức tại Beau-Rivage Palace ở Lausanne ngày 29 tháng 5 năm 1996**, với bộ sưu tập đầu tiên gồm 52 mẫu. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/patek-nautilus.md | 46 | Hồ sơ iconic — thân bài | đầu tiên | - **3700/1A** (1976–1990) — thế hệ đầu tiên, "Jumbo" 42mm, cực hiếm. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/patek-philippe-grandmaster-chime.md | 38 | Hồ sơ iconic — thân bài | đầu tiên | Chi tiết gây choáng đầu tiên không phải âm thanh mà là **vỏ lật được** (reversible double-sided case): bấm một nút, vỏ xoay trục và lật mặt. Mỗi mặt phục vụ một việc: | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/piaget-altiplano.md | 28 | Hồ sơ iconic — thân bài | nhất thế giới | Nền tảng của dòng là hai cột mốc trước đó: **calibre 9P lên dây tay siêu mỏng năm 1957**, gây tiếng vang tại hội chợ Basel và đưa Piaget lên vị trí trung tâm ở lĩnh vực bộ máy siêu mỏng; và **calibre 12P năm 1960 — bộ máy tự động mỏng nhất thế giới** thời điểm ra đời. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/piaget-altiplano.md | 41 | Hồ sơ iconic — thân bài | duy nhất | Piaget là ví dụ hiếm về **một hãng chọn một chiều kỹ thuật duy nhất và theo đuổi tới cùng** — và Altiplano là nơi chiều kỹ thuật đó trở thành sản phẩm hoàn chỉnh. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/rado-diastar.md | 30 | Hồ sơ iconic — thân bài | đầu tiên | Năm 1962, Rado ra mắt **DiaStar — chiếc đồng hồ chống xước đầu tiên trên thế giới**. Cùng năm đó hãng cũng giới thiệu mẫu lặn Captain Cook: một năm định hình cả hướng đi của thương hiệu. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/richard-mille-rm-001.md | 37 | Hồ sơ iconic — thân bài | chuẩn mực | RM 001 mở ra cả một phân khúc mới: đồng hồ siêu sang thể thao dùng vật liệu và kết cấu của ngành hàng không — thứ sau này trở thành chuẩn mực của cả một lớp thương hiệu. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/rolex-gmt-master.md | 34 | Hồ sơ iconic — thân bài | chuẩn mực | Cái tên **GMT** lấy từ **Greenwich Mean Time** — giờ trung bình kinh tuyến Greenwich, chuẩn mực được chọn làm kinh tuyến gốc từ năm **1884**. Giữ một kim chạy theo giờ Greenwich là giữ một mốc thời gian cố định giữa các múi giờ. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/rolex-submariner.md | 47 | Hồ sơ iconic — thân bài | đầu tiên | Năm 1953, khi lặn bình khí (scuba diving) đang phát triển mạnh, thế giới cần những chiếc đồng hồ có thể chịu được áp suất nước sâu. Rolex đáp lại bằng **Submariner** — theo Rolex, đây là đồng hồ lặn đầu tiên đạt mức chống nước 100m. Những chiếc reference 6204 sớm nhất được định ngày cuối năm 1953; Rolex công bố mẫu này tại Basel năm 1954. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/rolex-submariner.md | 49 | Hồ sơ iconic — thân bài | chuẩn mực | Submariner không phải là đồng hồ lặn đầu tiên, nhưng nó đã đặt ra **chuẩn mực** cho toàn thể loại: vỏ xoay một chiều, độ chống nước 100m trở lên, mặt số dễ đọc trong bóng tối. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/rolex-submariner.md | 76 | Hồ sơ iconic — thân bài | nhất thế giới | Submariner không chỉ là đồng hồ lặn. Nó xuất hiện trên cổ tay James Bond (các phim đầu thập niên 1960), trở thành biểu tượng của sự nam tính và phiêu lưu, và là **mẫu đồng hồ thể thao sang trọng được nhận diện rộng rãi nhất thế giới**. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/royal-oak.md | 62 | Hồ sơ iconic — thân bài | nhất thế giới | Royal Oak "Jumbo" dùng calibre tự động siêu mỏng **7121** (thế hệ mới, 2022), chỉ dày 3.2mm, trữ cót 52 giờ. Đây là một trong những calibre automatic mỏng nhất thế giới. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/seagull-1963.md | 64 | Hồ sơ iconic — thân bài | duy nhất | Vì sao quan trọng: ST19 là **bộ máy chronograph cơ có bánh xe cột (column wheel) ở tầm giá thấp nhất thị trường**. Với người mới, đây thường là cách duy nhất để sở hữu một chronograph cơ thật còn mới mà không phải mua đồ cũ — và là cách một thiết kế lịch sử tiếp tục sống qua hãng đã cứu nó. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/seiko-62mas.md | 58 | Hồ sơ iconic — thân bài | tốt nhất | - Lume (chấm phát quang) của Seiko đặc biệt sáng và lâu — một trong những lume tốt nhất ngành. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/swatch-sistem51.md | 28 | Hồ sơ iconic — thân bài | duy nhất | Sistem51 ra mắt năm 2013. Đây là **bộ máy cơ tự động đầu tiên và duy nhất mà toàn bộ quá trình sản xuất được tự động hóa hoàn toàn** — không bàn tay người can thiệp ở công đoạn lắp ráp. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/swatch-sistem51.md | 28 | Hồ sơ iconic — thân bài | đầu tiên | Sistem51 ra mắt năm 2013. Đây là **bộ máy cơ tự động đầu tiên và duy nhất mà toàn bộ quá trình sản xuất được tự động hóa hoàn toàn** — không bàn tay người can thiệp ở công đoạn lắp ráp. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/swatch-sistem51.md | 30 | Hồ sơ iconic — thân bài | duy nhất | Cấu tạo: **51 chi tiết được gom thành năm khối lắp sẵn**, trong đó có **một con vít duy nhất** giữ quả lắc của bộ phận tự động. Mọi chi tiết khác đều ghép khối — không tháo, không chỉnh từng con vít như bộ máy truyền thống. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/universal-geneve-polerouter.md | 42 | Hồ sơ iconic — thân bài | đầu tiên | Polerouter dùng một trong những bộ máy micro-rotor đầu tiên trên thế giới, **cao chỉ 4,1mm** — thuộc nhóm calibre tự động mỏng nhất thị trường khi đó. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/urwerk-ur-105.md | 38 | Hồ sơ iconic — thân bài | duy nhất | UR-105 là hiện thân tinh gọn của ngôn ngữ Urwerk: gần ba mươi năm theo đuổi một cách hiển thị duy nhất, không phân tán, không nhượng bộ thị trường truyền thống. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/zenith-el-primero.md | 31 | Hồ sơ iconic — thân bài | đầu tiên | Năm 1969 là **năm quan trọng nhất** của chronograph hiện đại. Ba nhóm cùng tranh đua để ra mắt chronograph tự động đầu tiên: Heuer-Breitling-Hamilton (Caliber 11), Seiko, và Zenith. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/zenith-el-primero.md | 33 | Hồ sơ iconic — thân bài | đầu tiên | Zenith ra mắt **El Primero** (tiếng Tây Ban Nha: "đầu tiên") — và đó thực sự là một bước nhảy vọt kỹ thuật. Không chỉ là chronograph tự động, El Primero còn **tích hợp** (movement được thiết kế chronograph từ đầu, không phải module gắn thêm) và hoạt động ở tần số cao **36.000 vph** (5 Hz) — cao gấp rưỡi movement thông thường. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| mauIconic/vi/zenith-el-primero.md | 37 | Hồ sơ iconic — thân bài | đầu tiên | - **Chronograph tự động tích hợp** — một trong những movement đầu tiên như vậy. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/a-lange-soehne.md | 125 | Trang thương hiệu — thân bài | duy nhất | - **Zeitwerk** — đồng hồ số nhảy cơ học duy nhất trên thế giới. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/audemars-piguet.md | 106 | Trang thương hiệu — thân bài | đầu tiên | AP tự định vị là **bậc thầy đồng hồ phức tạp**. Hãng tiên phong trong minute repeater (điểm chuông), perpetual calendar (lịch vạn niên) và skeleton (lộ máy). AP cũng là hãng đầu tiên đưa phức tạp vào đồng hồ đeo tay (năm 1882). | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/baume-et-mercier.md | 74 | Trang thương hiệu — thân bài | duy nhất | Riviera hợp với người muốn một chiếc duy nhất đi từ cuối tuần tới văn phòng. Clifton hợp với nhu cầu dress watch truyền thống. Hampton là lựa chọn dành cho ai muốn vỏ chữ nhật nhưng thích sự mềm mại hơn một thiết kế quá nghiêm nghị. Với cả ba, hãy ưu tiên thử trên tay: Baume & Mercier mạnh ở tỷ lệ và cảm giác đeo hơn là cuộc đua thông số. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/beijing-watch-factory.md | 54 | Trang thương hiệu — thân bài | duy nhất | Điểm đáng nói: đây là **nơi duy nhất ở Trung Quốc làm được các phức tạp ở mức này**, với mức giá thấp hơn nhiều so với đồng hồ cùng loại của châu Âu. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/blancpain.md | 84 | Trang thương hiệu — thân bài | nhất thế giới | Blancpain tự xưng là **nhà chế tác đồng hồ lâu đời nhất thế giới**, thành lập năm **1735** tại Villeret (Thụy Sĩ) bởi Jehan-Jacques Blancpain. Hãng thuộc Swatch Group và được định vị là **"vương miện" (crown jewel)** của tập đoàn — đứng ở đỉnh cao, trên cả Breguet và Omega. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/blancpain.md | 97 | Trang thương hiệu — thân bài | đầu tiên | - **Fifty Fathoms** (1953) — đồng hồ lặn **hiện đại đầu tiên**, ra đời trước cả Rolex Submariner. Xem chi tiết tại [bài Fifty Fathoms](/mau-iconic/fifty-fathoms). | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/blancpain.md | 99 | Trang thương hiệu — thân bài | chuẩn mực | - **Classic & Ultra-slim** — dress watch siêu mỏng, chuẩn mực thanh lịch. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/breguet.md | 110 | Trang thương hiệu — thân bài | chuẩn mực | Breguet không đơn thuần là một thương hiệu — đây là **cái tên đã viết ra phần lớn từ vựng của ngành đồng hồ**. Kim Breguet, số Breguet, dây tóc Breguet, tourbillon: bốn thứ mang tên ông đều là chuẩn mực cả ngành dùng đến nay. Abraham-Louis Breguet làm đồng hồ cho những cái tên định hình châu Âu thời ông sống: Hoàng hậu Marie Antoinette, Napoleon Bonaparte, Sa hoàng Alexander I, Công tước Wellington. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/breguet.md | 122 | Trang thương hiệu — thân bài | đầu tiên | Dây tóc Breguet (Breguet balance spring) nâng cao độ chính xác; kim pomme (Breguet hands) hình quả táo trở thành "kim Breguet" đặc trưng đến nay. Chiếc đồng hồ đeo tay đầu tiên được ghi nhận trong lịch sử — làm cho Hoàng hậu Naples, đặt hàng năm 1810 — cũng mang tên ông. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/bvlgari.md | 59 | Trang thương hiệu — thân bài | nhất thế giới | Nhưng ở một chỉ tiêu cụ thể, hãng nhà kim hoàn này đang dẫn đầu toàn ngành. Trong khoảng một thập kỷ, dòng Octo Finissimo đã **lập chín kỷ lục** về độ mỏng. Kỷ lục đáng nói nhất: **Octo Finissimo Ultra COSC dày tổng cộng 1,70mm** — vừa là **đồng hồ cơ mỏng nhất từng được sản xuất**, vừa là **chronometer đạt chuẩn COSC mỏng nhất thế giới**. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/cartier.md | 167 | Trang thương hiệu — thân bài | số một | - **Tank** (1917) — dòng biểu tượng số một, vỏ chữ nhật. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/cartier.md | 170 | Trang thương hiệu — thân bài | duy nhất | - **Ballon Bleu** — tuyến tròn duy nhất trong nhóm biểu tượng. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/corum.md | 69 | Trang thương hiệu — thân bài | duy nhất | Corum là kiểu thương hiệu nên đọc bằng các biểu tượng hơn là bằng một công thức sản phẩm duy nhất. Admiral dùng cờ hiệu hải quân. Golden Bridge dùng bộ máy baguette thẳng. Bubble dùng kính vòm phóng đại. Ba hướng này rất khác nhau, nhưng có chung một ý: **chiếc đồng hồ phải có một dấu hiệu thị giác riêng**. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/credor.md | 63 | Trang thương hiệu — thân bài | duy nhất | **Eichi II được làm, lắp ráp và hoàn thiện hoàn toàn bằng tay.** Chi tiết đáng nói nhất: **cả mười hai vạch chỉ giờ lẫn các chữ cái tên Credor đều được vẽ tay lên mặt số sứ bởi một người thợ của chính xưởng** — một người duy nhất, không phải dây chuyền, không phải máy in. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/de-bethune.md | 61 | Trang thương hiệu — thân bài | đầu tiên | De Bethune là **nhà chế tác đầu tiên đưa pha mặt trăng dạng cầu vào một chiếc đồng hồ đeo tay**, và đây là **thành tựu được cấp bằng sáng chế**. Khác với pha mặt trăng thông thường vẽ trên đĩa phẳng, đây là một khối cầu quay thật. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/doxa.md | 56 | Trang thương hiệu — thân bài | đầu tiên | Nhưng tên tuổi hãng hôm nay gắn liền với năm 1967: **SUB 300 ra mắt tại hội chợ Basel** — được xem là chiếc đồng hồ lặn đầu tiên thiết kế có chủ đích và bán rộng rãi cho công chúng, với vành xoay được cấp bằng sáng chế và mặt số cam đặc trưng. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/doxa.md | 60 | Trang thương hiệu — thân bài | tốt nhất | Đây không phải lựa chọn thẩm mỹ. **Nghiên cứu cho thấy màu cam cho khả năng đọc tốt nhất ở độ sâu**, nơi ánh sáng tắt nhanh và màu sắc bắt đầu biến mất. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/hajime-asaoka.md | 71 | Trang thương hiệu — thân bài | đầu tiên | Rồi ở tuổi bốn mươi — năm 2005 — ông bắt đầu chế tạo đồng hồ, **tự học chỉ dựa vào cuốn sách của George Daniels và các video trên mạng**. Bốn năm sau, năm 2009, ông làm ra **chiếc đồng hồ đeo tay đầu tiên của Nhật Bản có bộ máy tourbillon in-house** — cột mốc đưa ông thành người mở đường cho giới chế tác độc lập Nhật Bản. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/hajime-asaoka.md | 83 | Trang thương hiệu — thân bài | đầu tiên | Đặt cạnh ba nhà chế tác ở bảng đối chiếu, điểm khác biệt của Asaoka nằm ở con đường vào nghề: Philippe Dufour học nghề chính quy tại Thụy Sĩ, F.P. Journe lớn lên trong gia đình làm đồng hồ, Greubel Forsey lập từ nền tảng kỹ thuật. Asaoka **tự học nghề ở tuổi bốn mươi**, xuất phát từ ngành thiết kế công nghiệp — không trường đồng hồ, không gia đình làm nghề. Với tourbillon in-house đầu tiên của Nhật Bản làm từ khởi điểm đó, con đường của ông không giống bất kỳ ai trong nhóm. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/hublot.md | 60 | Trang thương hiệu — thân bài | đầu tiên | Hublot ra đời năm 1980 từ một ý tưởng bị coi là trái khoáy: **ghép vàng quý với cao su**. Doanh nhân người Ý Carlo Crocco tạo ra một chiếc đồng hồ thiết thực, chịu được thời tiết — thương hiệu đầu tiên ghép vàng quý với cao su hiện đại phát triển ngay tại xưởng riêng, điều chưa ai nghĩ tới khi đó. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/junghans.md | 59 | Trang thương hiệu — thân bài | nhất thế giới | Ít ai nhớ rằng Junghans từng **trở thành một trong những nhà sản xuất đồng hồ lớn nhất thế giới** — từ năm 1903, khi hãng lập tại Schramberg, vùng Rừng Đen, đã đặt yêu cầu cao về thiết kế và chất lượng. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/mb-and-f.md | 62 | Trang thương hiệu — thân bài | đầu tiên | MB&F là **phòng thí nghiệm ý niệm đồng hồ đầu tiên trên thế giới** — cách tự gọi không phải ngôn từ tiếp thị, mà là mô hình vận hành: hãng làm **các loạt rất nhỏ đồng hồ ý niệm cấp tiến**, tập hợp những người có tay nghề cùng chia sẻ một hệ giá trị. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/mido.md | 59 | Trang thương hiệu — thân bài | đầu tiên | **Dòng Multifort** là cột mốc lớn: một trong những **đồng hồ chống từ đầu tiên có bộ máy tự lên dây, đồng thời chống nước và chống sốc ngay trong thiết kế**. Đây là **mẫu bán chạy nhất của hãng từ thập niên 1930 tới thập niên 1950** — hai mươi năm giữ vị trí đó. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/montblanc.md | 52 | Trang thương hiệu — thân bài | đầu tiên | - **Đầu thế kỷ 20:** xưởng đi tiên phong với một trong những chronograph một nút bấm lên dây tay đầu tiên làm cho đồng hồ đeo tay. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/muehle-glashuette.md | 54 | Trang thương hiệu — thân bài | duy nhất | Ngày 22 tháng 4 năm 1869, ông mở xưởng cơ khí chính xác tại Glashütte: ban đầu làm dụng cụ đo cho các nhà chế tác đồng hồ ở Glashütte, sau đó làm thêm đồng hồ tốc độ và đồng hồ đo vòng quay. Xưởng của ông về sau **trở thành nơi duy nhất cung cấp dụng cụ đo cho các công ty chế tác đồng hồ ở Glashütte và cho Trường Dạy nghề Đồng hồ Đức**. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/omega.md | 100 | Trang thương hiệu — thân bài | duy nhất | Omega được thành lập năm 1848 tại La Chaux-de-Fonds (Thụy Sĩ) bởi Louis Brandt. Trải qua một lịch sử lâu dài, hãng đã gắn tên mình với những sự kiện lịch sử vĩ đại: từ việc là đồng hồ chính thức của Olympic, đến đồng hồ duy nhất từng chạm tới Mặt Trăng. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/orient.md | 92 | Trang thương hiệu — thân bài | đầu tiên | Với người Việt mới chơi, Orient thường là **chiếc đồng hồ cơ đầu tiên** — mức giá thấp tới mức việc thử không có rủi ro gì. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/parmigiani-fleurier.md | 63 | Trang thương hiệu — thân bài | duy nhất | Và khác với phần lớn ngành, hãng **sản xuất trọn vẹn mọi chiếc đồng hồ trong một trung tâm chế tác duy nhất**, từ thiết kế tới thành phẩm — nhờ tập hợp các xưởng thủ công Thụy Sĩ cùng nằm dưới **Quỹ gia đình Sandoz**. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/patek-philippe.md | 98 | Trang thương hiệu — thân bài | nhất thế giới | Patek Philippe, thành lập năm 1839 tại Genève, được xem là một trong những thương hiệu đồng hồ danh giá nhất thế giới — thuộc "Holy Trinity" (Tam đỉnh) cùng Audemars Piguet và Vacheron Constantin. Câu slogan huyền thoại: *"You never actually own a Patek Philippe. You merely look after it for the next generation."* | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/patek-philippe.md | 108 | Trang thương hiệu — thân bài | chuẩn mực | - **Calatrava** — dress watch thanh lịch cổ điển, chuẩn mực của sự tinh tế. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/patek-philippe.md | 113 | Trang thương hiệu — thân bài | nhất thế giới | Patek tự làm **tất cả** bộ máy, từ những calibre đơn giản đến những bộ máy phức tạp bậc nhất thế giới (như Calibre 89 — từng là đồng hồ phức tạp nhất thế giới với 1.728 bộ phận). Dòng **26-330** (với phiên bản HACKO) và **30-255** đều được đánh giá cao. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/piaget.md | 53 | Trang thương hiệu — thân bài | nhất thế giới | Piaget là ví dụ hiếm về một hãng **chọn một chiều kỹ thuật duy nhất và theo đuổi tới cùng**: độ mỏng. Từ calibre 9P năm 1957 tới 12P năm 1960 — bộ máy tự động mỏng nhất thế giới khi ra đời — Piaget dựng cả bản sắc trên một con số càng nhỏ càng tốt. | Không thấy | Câu chứa "theo đuổi tới cùng" — "theo" ở đây không phải quy chiếu nguồn; không thấy nguồn trực tiếp | Cần Claude soát |
| thuongHieu/vi/piaget.md | 53 | Trang thương hiệu — thân bài | duy nhất | Piaget là ví dụ hiếm về một hãng **chọn một chiều kỹ thuật duy nhất và theo đuổi tới cùng**: độ mỏng. Từ calibre 9P năm 1957 tới 12P năm 1960 — bộ máy tự động mỏng nhất thế giới khi ra đời — Piaget dựng cả bản sắc trên một con số càng nhỏ càng tốt. | Không thấy | Câu chứa "theo đuổi tới cùng" — "theo" ở đây không phải quy chiếu nguồn; không thấy nguồn trực tiếp | Cần Claude soát |
| thuongHieu/vi/rado.md | 68 | Trang thương hiệu — thân bài | đầu tiên | Đóng góp của Rado cho ngành **nằm ở vật liệu, không phải ở bộ máy**: chiếc đồng hồ chống xước đầu tiên thế giới năm 1962, rồi gốm công nghệ cao từ năm 1986. Đây là điểm khiến hãng khác hẳn mọi hãng cùng tầm giá trên trang này — nơi các hãng khác cạnh tranh bằng calibre hay di sản, Rado cạnh tranh bằng chính chất liệu làm nên chiếc đồng hồ. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/seagull.md | 22 | Trang thương hiệu — thân bài | nhất thế giới | Seagull là **nhà sản xuất bộ máy cơ lớn nhất thế giới xét theo sản lượng**. Theo Wikipedia, kể từ khi quay lại chỉ sản xuất bộ máy cơ năm 1997, hãng làm ra khoảng **một phần tư số bộ máy cơ của toàn thế giới**. | Có — nguồn được nêu là Wikipedia, cần Claude soát chất lượng nguồn | Câu liền sau ghi rõ "Theo Wikipedia, kể từ khi quay lại chỉ sản xuất bộ máy cơ năm 1997, hãng làm ra khoảng một phần tư số bộ máy cơ của toàn thế giới" | Cần Claude soát |
| thuongHieu/vi/seagull.md | 44 | Trang thương hiệu — thân bài | duy nhất | **Vì sao điều này quan trọng:** ST19 là **bộ máy chronograph cơ có bánh xe cột (column wheel) ở tầm giá thấp nhất thị trường**. Với người mới, đây thường là cách duy nhất để sở hữu một chronograph cơ thật còn mới, mà không phải trả tiền cho một chiếc đồng hồ cũ. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/seiko.md | 78 | Trang thương hiệu — thân bài | tốt nhất | Seiko là thương hiệu **vừa gây ra khủng hoảng lớn nhất lịch sử ngành đồng hồ cơ, vừa là một trong những người bảo vệ nó tốt nhất hôm nay**. Chiếc Quartz Astron năm 1969 — đồng hồ đeo tay quartz đầu tiên thế giới — gần như xóa sổ ngành Thụy Sĩ, nhưng cũng chính Seiko chưa bao giờ ngừng làm đồng hồ cơ. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/seiko.md | 78 | Trang thương hiệu — thân bài | đầu tiên | Seiko là thương hiệu **vừa gây ra khủng hoảng lớn nhất lịch sử ngành đồng hồ cơ, vừa là một trong những người bảo vệ nó tốt nhất hôm nay**. Chiếc Quartz Astron năm 1969 — đồng hồ đeo tay quartz đầu tiên thế giới — gần như xóa sổ ngành Thụy Sĩ, nhưng cũng chính Seiko chưa bao giờ ngừng làm đồng hồ cơ. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/swatch.md | 55 | Trang thương hiệu — thân bài | duy nhất | **51 chi tiết được gom thành năm khối lắp sẵn**, trong đó có **một con vít duy nhất** giữ quả lắc của bộ phận tự động. Đây là **bộ máy cơ tự động Thụy Sĩ tự lên dây** mà quá trình sản xuất **được tự động hóa hoàn toàn** — điều chưa từng có trước đó. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/vacheron-constantin.md | 100 | Trang thương hiệu — thân bài | nhất thế giới | Vacheron Constantin thành lập năm **1755** tại Genève bởi Jean-Marc Vacheron — là **nhà chế tác hoạt động liên tục lâu đời nhất thế giới**. Hãng thuộc "Holy Trinity" (Tam đỉnh) cùng Patek Philippe và Audemars Piguet. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |
| thuongHieu/vi/zenith.md | 106 | Trang thương hiệu — thân bài | đầu tiên | Năm 1969, Zenith ra mắt **El Primero** (tiếng Tây Ban Nha: "đầu tiên") — một trong những **chronograph tự động tích hợp đầu tiên thế giới**, cùng tranh đua với Calibre 11 và Seiko 6139. Điểm đặc biệt: tần số 36.000 nhịp mỗi giờ (5 Hz), chronograph tích hợp, và độ tin cậy — vẫn được sản xuất và sử dụng đến nay. | Không thấy | Không thấy nguồn trực tiếp trong câu hoặc đoạn liền kề | Cần Claude soát |

## 5. Loại trừ có chủ đích — 100 trường hợp

Phân loại theo lý do; không có trường hợp thuộc nhóm code fence (quét không ghi nhận cụm nào nằm trong khối ```).

**Loại trừ (c) — "đầu tiên" đã có gắn nguồn/quy chiếu rõ trong câu — 13 trường hợp:**

- `src/content/coChe/vi/chronograph.md:77:đầu tiên` — Câu có "theo FHH" — nguồn ngay trong câu
- `src/content/coChe/vi/diem-chuong.md:33:đầu tiên` — Câu có "FHH nêu riêng" — nguồn ngay trong câu
- `src/content/coChe/vi/ebauche-chuoi-cung-ung.md:47:đầu tiên` — Câu quy chiếu "trang lịch sử chính thức của ETA" + trích nguyên văn tiếng Pháp
- `src/content/coChe/vi/eta-sellita.md:49:đầu tiên` — Câu có "theo trang lịch sử chính thức của ETA"
- `src/content/mauIconic/vi/audemars-piguet-royal-oak-perpetual-calendar.md:29:đầu tiên` — Câu quy chiếu nguồn "Theo…" ngay sau mệnh đề chứa cụm
- `src/content/mauIconic/vi/fifty-fathoms.md:39:đầu tiên` — Câu có "theo Blancpain"
- `src/content/mauIconic/vi/fifty-fathoms.md:40:đầu tiên` — Câu có "theo Rolex"
- `src/content/mauIconic/vi/junghans-max-bill.md:43:đầu tiên` — Câu có "(theo hãng)" hai lần
- `src/content/mauIconic/vi/rolex-submariner.md:53:đầu tiên` — Trích Blancpain "đồng hồ lặn hiện đại đầu tiên" của hãng + "theo Blancpain"
- `src/content/tuDien/vi/day-cot.md:19:đầu tiên` — Câu có "Theo FHH"
- `src/content/tuDien/vi/flyback.md:37:đầu tiên` — Câu có "theo FHH"
- `src/content/tuDien/vi/minute-repeater.md:20:đầu tiên` — Câu có "Theo FHH"
- `src/content/tuDien/vi/tinh-dang-thoi.md:27:đầu tiên` — Trích nguyên văn nguồn Berthoud trong câu

**Loại trừ (a) — nguồn, quy chiếu hoặc bằng chứng cụ thể hiển thị trong câu/đoạn liền kề — 13 trường hợp:**

- `src/content/coChe/vi/eta-sellita.md:25:đầu tiên` — Trích nguyên văn nguồn ETA (câu tiếng Pháp kèm dịch) hiển thị trong câu
- `src/content/coChe/vi/eta-sellita.md:27:duy nhất` — Quy chiếu rõ "chính câu trên ghi mốc" — nguồn trích ngay phía trên
- `src/content/coChe/vi/eta-sellita.md:49:duy nhất` — Câu có "theo trang lịch sử eta.ch" — nguồn chính hãng ETA ngay trong câu
- `src/content/huongDan/vi/chinh-lich-an-toan.md:31:duy nhất` — Câu chỉ rõ nguồn: "manual của đúng calibre"
- `src/content/huongDan/vi/chinh-lich-an-toan.md:51:duy nhất` — Câu chỉ rõ nguồn: Seiko 6L37 ghi trong manual; "chuẩn duy nhất: manual"
- `src/content/huongDan/vi/hop-xoay-dong-ho.md:30:duy nhất` — Câu chỉ rõ nguồn: "tài liệu của hãng/nhà sản xuất bộ máy"
- `src/content/huongDan/vi/len-day-dong-ho.md:19:đầu tiên` — Câu quy chiếu "hướng dẫn sử dụng của từng hãng"
- `src/content/huongDan/vi/len-day-dong-ho.md:46:duy nhất` — Câu chỉ rõ nguồn: "hướng dẫn của từng hãng (Omega ghi trong user manual…)"
- `src/content/huongDan/vi/muc-chong-nuoc.md:26:duy nhất` — Câu chỉ rõ nguồn: "manual của đúng mẫu" + hướng dẫn Seiko
- `src/content/huongDan/vi/muc-chong-nuoc.md:58:duy nhất` — Câu chỉ rõ nguồn: "manual của đúng mẫu"
- `src/content/tuDien/vi/chronometer.md:23:duy nhất` — Câu chỉ rõ nguồn: "theo trang chính thức của COSC… theo tiêu chuẩn ISO 3159"
- `src/content/tuDien/vi/incabloc.md:38:đầu tiên` — Bằng chứng hiển thị trong câu: số bằng sáng chế Thụy Sĩ 141098
- `src/content/tuDien/vi/incabloc.md:45:duy nhất` — Câu chỉ rõ nguồn: "thông số hoặc tài liệu của mẫu đó"

**Loại trừ (d) — trích dẫn hoặc câu phản biện/phủ định, không phải khẳng định của bài — 10 trường hợp:**

- `src/content/coChe/vi/eta-sellita.md:26:duy nhất` — Trích dẫn nguyên văn nguồn ETA, không phải khẳng định của bài
- `src/content/coChe/vi/kinh-dong-ho.md:50:tốt nhất` — Heading câu hỏi phản biện ("Vì sao… không phải luôn tốt nhất?")
- `src/content/coChe/vi/kinh-dong-ho.md:52:tốt nhất` — Thuật lại quan điểm sai ("tin rằng…") để phản biện
- `src/content/coChe/vi/kinh-dong-ho.md:58:tốt nhất` — Câu phủ định ("không có loại nào tốt nhất tuyệt đối")
- `src/content/huongDan/vi/chon-dong-ho-dau-tien.md:17:tốt nhất` — Câu phủ định: "không phải danh sách đồng hồ tốt nhất"
- `src/content/huongDan/vi/chon-dong-ho-dau-tien.md:39:duy nhất` — Câu phủ định: "không phải con số duy nhất"
- `src/content/huongDan/vi/hoan-thien-thu-cong-dong-ho.md:57:duy nhất` — Trích quy định Poinçon de Genève kèm "(theo Poinçon de Genève)"; câu phủ định "chứ không phải một họa tiết duy nhất"
- `src/content/mauIconic/vi/baume-mercier-riviera.md:31:duy nhất` — Câu phủ định: "không phải một bộ máy duy nhất"
- `src/content/mauIconic/vi/rolex-submariner.md:49:đầu tiên` — Câu phủ định: "không phải là đồng hồ lặn đầu tiên"
- `src/content/tuDien/vi/cotes-de-geneve.md:24:duy nhất` — Trích quy định Poinçon de Genève kèm "(theo Poinçon de Genève)"; câu phủ định "không gắn chất lượng vào một họa tiết duy nhất"

**Loại trừ (e) — cụm dùng theo nghĩa thường/thứ tự biên tập hoặc bắt nhầm substring, không phải khẳng định tuyệt đối — 64 trường hợp:**

- `src/content/coChe/vi/chong-tu.md:48:duy nhất` — "Dấu hiệu duy nhất" — nghĩa thường (đếm được), không phải so sánh tuyệt đối
- `src/content/huongDan/vi/bao-duong-dong-ho.md:100:đầu tiên` — "Chiếc đồng hồ cơ đầu tiên" của người đọc — thứ tự cá nhân, không phải khẳng định ngành
- `src/content/huongDan/vi/chon-co-dong-ho.md:71:đầu tiên` — Thứ tự trong khung quyết định, nói về chiếc đầu tiên của người đọc
- `src/content/huongDan/vi/chon-dong-ho-dau-tien.md:17:đầu tiên` — "Đồng hồ cơ đầu tiên" của người đọc
- `src/content/huongDan/vi/chon-dong-ho-dau-tien.md:28:đầu tiên` — "Câu đầu tiên" — thứ tự câu hỏi của bài
- `src/content/huongDan/vi/chon-dong-ho-dau-tien.md:39:đầu tiên` — "Con số đầu tiên ai cũng nói đến" — thứ tự biên tập
- `src/content/huongDan/vi/chon-dong-ho-dau-tien.md:96:đầu tiên` — "Hai bước thực hành đầu tiên" — thứ tự hướng dẫn
- `src/content/huongDan/vi/len-day-dong-ho.md:97:đầu tiên` — Liên kết khung quyết định — chiếc đầu tiên của người đọc
- `src/content/huongDan/vi/muc-chong-nuoc.md:71:đầu tiên` — "Chiếc đồng hồ cơ đầu tiên" của người đọc
- `src/content/huongDan/vi/nhan-biet-dong-ho-gia.md:56:đầu tiên` — "Lần đầu bạn mua đồng hồ cơ" — người đọc
- `src/content/huongDan/vi/swiss-made.md:63:đầu tiên` — Liên kết bài "Chọn đồng hồ cơ đầu tiên" — người đọc
- `src/content/huongDan/vi/swiss-made.md:64:đầu tiên` — Liên kết bài — người đọc
- `src/content/mauIconic/vi/arnold-and-son-perpetual-moon.md:44:số một` — Bắt nhầm substring "thông **số một** cách máy móc" — không phải cụm "số một" nghĩa tuyệt đối
- `src/content/mauIconic/vi/baume-mercier-riviera.md:42:đầu tiên` — "Thế hệ đầu tiên" nội bộ hãng (Riviera 73)
- `src/content/mauIconic/vi/breguet-type-xx.md:34:đầu tiên` — Nội bộ dòng Type XX (mốc 2023/2024 hiển thị)
- `src/content/mauIconic/vi/chanel-j12.md:32:đầu tiên` — "Đầu tiên của Chanel" — phạm vi hãng, mốc 2000 hiển thị
- `src/content/mauIconic/vi/chopard-luc.md:24:đầu tiên` — Lịch sử nội bộ hãng ("Quảng cáo đầu tiên… năm 1913" — có mốc hiển thị)
- `src/content/mauIconic/vi/chopard-luc.md:30:đầu tiên` — "Bộ máy in-house đầu tiên" nội bộ hãng
- `src/content/mauIconic/vi/credor-eichi-2.md:29:đầu tiên` — Lịch sử nội bộ ("Credor Eichi đầu tiên ra đời năm 2008")
- `src/content/mauIconic/vi/fc-heart-beat.md:29:đầu tiên` — Nội bộ hãng ("Heart Beat đầu tiên ra mắt năm 1994")
- `src/content/mauIconic/vi/fc-heart-beat.md:50:đầu tiên` — "Bộ máy tự phát triển đầu tiên của hãng" — phạm vi hãng
- `src/content/mauIconic/vi/fpjourne-chronometre-bleu.md:35:đầu tiên` — "Chiếc đồng hồ đầu tiên của hãng dùng vỏ tantalum" — phạm vi hãng
- `src/content/mauIconic/vi/fpjourne-chronometre-bleu.md:56:đầu tiên` — "Bước vào thế giới F.P. Journe" — góc nhìn người đọc
- `src/content/mauIconic/vi/greubel-double-tourbillon.md:39:đầu tiên` — "Chiếc đầu tiên" của thương hiệu (ra mắt Baselworld 2004)
- `src/content/mauIconic/vi/greubel-double-tourbillon.md:57:đầu tiên` — "Mở đầu Greubel Forsey" — thứ tự nội bộ thương hiệu
- `src/content/mauIconic/vi/hublot-big-bang.md:48:đầu tiên` — "Chronograph in-house đầu tiên mang tên Unico" — nội bộ hãng
- `src/content/mauIconic/vi/iwc-mark-xi.md:67:đầu tiên` — "Mark XII (1994) — phiên bản dân sự đầu tiên" — nội bộ dòng, có năm
- `src/content/mauIconic/vi/lange-1.md:35:đầu tiên` — "Bộ sưu tập đầu tiên" (1994) — lịch sử nội bộ có năm
- `src/content/mauIconic/vi/lange-1.md:54:đầu tiên` — "101.021 (1994) — thế hệ đầu tiên" — có reference và năm
- `src/content/mauIconic/vi/laurent-ferrier-galet-classic.md:35:đầu tiên` — "Mẫu đầu tiên mang tên hãng" — nội bộ hãng
- `src/content/mauIconic/vi/mbf-horological-machine-1.md:29:đầu tiên` — "Horological Machine đầu tiên của hãng" — nội bộ hãng
- `src/content/mauIconic/vi/mbf-horological-machine-1.md:41:đầu tiên` — "Bằng chứng đầu tiên cho thấy mô hình…" — thứ tự nội bộ thương hiệu
- `src/content/mauIconic/vi/richard-mille-rm-001.md:33:đầu tiên` — "Giai đoạn đầu" của hãng — thứ tự nội bộ
- `src/content/mauIconic/vi/rolex-submariner.md:64:đầu tiên` — "6204 (1953) — reference đầu tiên" — có reference và năm
- `src/content/mauIconic/vi/seagull-1963.md:38:đầu tiên` — Lịch sử nội bộ ("Nguyên mẫu đầu tiên hoàn thành năm 1963")
- `src/content/mauIconic/vi/seagull-1963.md:42:đầu tiên` — Lịch sử nội bộ ("Lô thử nghiệm đầu tiên… 1.400 chiếc giao năm 1966")
- `src/content/mauIconic/vi/seiko-62mas.md:31:đầu tiên` — "Mẫu đồng hồ lặn đầu tiên của mình" — phạm vi hãng
- `src/content/mauIconic/vi/swatch-sistem51.md:34:đầu tiên` — "Các mẫu quartz Swatch đầu tiên" (1983) — lịch sử nội bộ có năm
- `src/content/mauIconic/vi/tudor-black-bay.md:53:đầu tiên` — "Tudor diver đầu tiên" — nội bộ dòng, có năm 2023
- `src/content/thuongHieu/vi/a-lange-soehne.md:110:đầu tiên` — "Bộ sưu tập đầu tiên" (1994) — lịch sử nội bộ có năm
- `src/content/thuongHieu/vi/baume-et-mercier.md:72:đầu tiên` — Heading "Chọn chiếc đầu tiên" — góc nhìn người đọc
- `src/content/thuongHieu/vi/beijing-watch-factory.md:48:đầu tiên` — Lịch sử nhà máy — mốc 1958 hiển thị
- `src/content/thuongHieu/vi/beijing-watch-factory.md:50:đầu tiên` — "Bộ máy tourbillon in-house đầu tiên" của nhà máy (1996) — nội bộ
- `src/content/thuongHieu/vi/bvlgari.md:57:đầu tiên` — Lịch sử nội bộ ("cửa hàng đầu tiên… năm 1884", có địa chỉ)
- `src/content/thuongHieu/vi/chanel.md:73:đầu tiên` — "Bộ máy in-house đầu tiên" của hãng (2016)
- `src/content/thuongHieu/vi/chopard.md:57:đầu tiên` — "Bộ máy in-house đầu tiên" của hãng — nội bộ
- `src/content/thuongHieu/vi/christopher-ward.md:56:đầu tiên` — "Những sản phẩm đầu tiên" của hãng — nội bộ
- `src/content/thuongHieu/vi/credor.md:59:đầu tiên` — Lịch sử xưởng (2000/2008) — nội bộ
- `src/content/thuongHieu/vi/fp-journe.md:84:đầu tiên` — Tiểu sử có mốc 1983 hiển thị
- `src/content/thuongHieu/vi/fp-journe.md:90:đầu tiên` — "Những chiếc đầu tiên" — bảo dưỡng nội bộ hãng
- `src/content/thuongHieu/vi/franck-muller.md:70:đầu tiên` — "Khi chọn chiếc đầu tiên" — góc nhìn người đọc
- `src/content/thuongHieu/vi/hamilton.md:86:đầu tiên` — "Danh tiếng đầu tiên của hãng" — thứ tự nội bộ
- `src/content/thuongHieu/vi/montblanc.md:51:đầu tiên` — "Calibre in-house đầu tiên" của hãng — nội bộ
- `src/content/thuongHieu/vi/panerai.md:70:đầu tiên` — Lịch sử nội bộ ("mở cửa hàng đầu tiên năm 1860", có địa chỉ)
- `src/content/thuongHieu/vi/parmigiani-fleurier.md:59:đầu tiên` — "Bộ sưu tập đầu tiên gồm 52 mẫu" (1996) — nội bộ có số liệu
- `src/content/thuongHieu/vi/parmigiani-fleurier.md:61:đầu tiên` — "Chiếc đeo tay đầu tiên mang tên thương hiệu" — nội bộ
- `src/content/thuongHieu/vi/richard-mille.md:48:đầu tiên` — "Những chiếc đầu tiên ấy" — tiền sản xuất nội bộ
- `src/content/thuongHieu/vi/seagull.md:40:đầu tiên` — Lịch sử nội bộ ("Nguyên mẫu đầu tiên hoàn thành năm 1963")
- `src/content/thuongHieu/vi/swatch.md:59:đầu tiên` — "Các mẫu quartz đầu tiên của hãng" (1983) — nội bộ
- `src/content/thuongHieu/vi/timex.md:60:đầu tiên` — "Mẫu tự động đầu tiên" của hãng — nội bộ
- `src/content/thuongHieu/vi/tissot.md:108:đầu tiên` — "Năm đầu tiên họ bán…" — thứ tự lịch sử nội bộ, có số liệu hiển thị
- `src/content/thuongHieu/vi/tissot.md:110:đầu tiên` — "Sở hữu đầu tiên trong đời" — góc nhìn người đọc
- `src/content/tuDien/vi/thung-cot.md:17:đầu tiên` — "Bánh nhông đầu tiên của chuỗi truyền động" — mô tả vị trí cấu trúc, không phải khẳng định tuyệt đối
- `src/content/tuDien/vi/vau-day.md:18:đầu tiên` — "Thông số đầu tiên cần đo" — thứ tự hướng dẫn người đọc


## 6. Kết quả kiểm tra

| Kiểm | Kết quả |
|---|---|
| Công cụ quét lưu danh sách thô (tệp, dòng, cụm, câu) | đạt — `output/s4-absolute-claims-audit/tho-s4.json` (chạy lại ở vòng sửa 1: cùng 197 dòng) |
| Rà thủ công toàn bộ dòng bảng chính có cờ quy chiếu từ công cụ thô | đạt — 14 dòng có cờ được đọc nguyên câu + đoạn liền kề; riêng `coChe/vi/eta-sellita.md:49` ("theo trang lịch sử eta.ch") chuyển sang loại trừ (a) — lỗi "Không thấy" của vòng đầu đã sửa |
| Không còn dòng ghi "Không thấy" nếu câu/đoạn liền kề có nguồn hoặc quy chiếu rõ | đạt — riêng `thuongHieu/vi/seagull.md:22` nguồn được nêu là Wikipedia → giữ bảng chính với trạng thái nguồn "Có — … cần Claude soát chất lượng nguồn" theo quy tắc 2 |
| "Đầu tiên" có "theo hãng/theo [nguồn]" phân loại đúng | đạt — các dòng loại trừ (c) ghi rõ nguồn từng câu |
| "Theo" không phải quy chiếu nguồn được ghi đúng nghĩa | đạt — ví dụ `baume-mercier-riviera.md:29` ("theo người đeo"), `piaget.md:53` ("theo đuổi") ghi "Không thấy" kèm lý do |
| Tổng bảng chính, tổng loại trừ, bảng thống kê tính lại tự động từ dữ liệu | đạt — 104 + 100 = 204 mục cụm |
| Bảng không chứa đề xuất sửa/câu viết lại/kết luận chuyên môn | đạt |
| `node scripts/scan-chars.mjs` | OK — quét 436 tệp; exit 0 |
| `git diff --check` | exit 0 |
| `npm run check` / `npm run build` | không chạy — gói chỉ-đọc, không thay đổi website (theo đúng prompt) |
| Rà `git status` | chỉ `docs/nghiem-thu/S4-bang-quet-so-sanh-tuyet-doi-2026-09-26.md` (mới) và `output/s4-absolute-claims-audit/` (nội bộ) |

## 7. Điểm chưa giải quyết

Không có. Bảng chính trình GPT Work soát; hướng sửa từng câu chờ anh Vinh duyệt (tuần 3 theo kế hoạch).

## 8. Trạng thái Git cuối

- Nhánh `main`; HEAD = `origin/main` = `7fd1625` (chưa tạo commit mới).
- `git status`: 0 modified, 0 staged; untracked 103 (102 có trước + biên bản S4 này) và `output/s4-absolute-claims-audit/` là bằng chứng nội bộ — không đưa vào commit.
- Chưa stage, chưa commit, chưa push.
