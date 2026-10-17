# BIÊN BẢN E3 — KHÉP CÁC VIỆC TREO (G03, V4, TRANG 374 KB)

**Gói:** E3 — khép hồ sơ G03; ghi hoãn V4; ghi hoãn tối ưu "trang 374 KB"; đồng bộ danh mục cũ
**Danh mục:** DHC-HOAN-THIEN-20261011 v1.0.0 · **Câu lệnh:** TXN-20261017-70 (GPT Work)
**Nền:** `0e28e79` = origin/main · **Ngày:** 17/10/2026
**Bên thi công:** GLM. Bên nghiệm thu: GPT Work. **Phạm vi: chỉ tài liệu — không mở triển khai kỹ thuật, không biến khép hồ sơ thành xác nhận đã hoàn thành việc chưa làm.**

## 1. G03 — xác minh Git rồi đính chính, đề nghị khép hồ sơ

**Xác minh bằng Git (trước khi sửa):**
- Commit phát hành: **`234fa2644faa3e2b6ab3b2721a3409b3c4d90123`** — "docs(analytics): record audience and search baseline" — chứa biên bản G03 và **7 tệp bằng chứng** `output/g03-audience-search-baseline/` (3 script playwright, 3 JSON kết quả, 1 log build). `git ls-files` xác nhận 7 tệp đã tracked; `git status` trước khi sửa: **không có sửa đổi nào** dưới thư mục đó → **nguyên SHA**, không phát hành lại.
- **Phân biệt:** nền đo = `02309e6` (main 12/09/2026); commit lưu hồ sơ = `234fa26` — hai mốc khác nhau, không trùng.

**Đính chính trong `docs/nghiem-thu/G03-duong-co-so-nguoi-xem-va-tim-kiem-2026-09-12.md`:**
1. Dòng trạng thái đầu trang: giữ nguyên làm lịch sử, gắn **cập nhật hiện hành** — 8 tệp đã phát hành trong `234fa26`; các câu "chưa commit/chờ nghiệm thu/chưa chuyển G04" là trạng thái lịch sử 12/09.
2. **Đính chính hạn chế phương pháp Analytics (mục 1.2, đúng văn bản chỉ dẫn):** phép kiểm ngày 12/09 chỉ tìm một số chuỗi tên đường dẫn nên có thể bỏ sót tài nguyên/request Analytics. Quan sát được ghi trong tài liệu 19/09 (`docs/huong-dan-bat-do-luong-2026-09-19.md`, đính chính H01) cho thấy hạn chế của phương pháp này; **không đủ để kết luận Analytics ngày 12/09 có hoặc không hoạt động, cũng không xác lập nguyên nhân của kết quả 0**. Bảng cũ đọc đúng mức "không phát hiện theo phép tìm chuỗi" và "0 request trong tập lọc" — không để "Không có" mang nghĩa kiểm kê đầy đủ; mục 1.3 không suy 404 localhost thành xác nhận preview không gửi dữ liệu. Endpoint HTTP 200 không thay thế bằng chứng dashboard; dữ liệu Speed Insights không thay thế Web Analytics.
3. Mục 2: blocker đăng nhập là tình trạng phiên GLM ngày 12/09 — không suy quyền hiện nay, không suy traffic.
4. Mục 3: số 452/326 ms là **phép đo preview lịch sử** 12/09, không phải hiệu năng production hiện tại.
5. Mục 4: ô KPI thiết bị/ngôn ngữ đổi căn cứ từ "beacon không phát" sang "chưa quan sát beacon trong tập lọc; trạng thái hoạt động thật chưa xác định".
6. **Phụ lục 9 mới** tổng hợp các đính chính trên.

**Kết luận khép (đề nghị):** *"Khép hồ sơ kiểm kê/đo lịch sử G03 sau đính chính E3; chưa xác lập bộ KPI người xem đầy đủ hay chứng minh hiệu quả 28 ngày."* — không cài event, không đọc dashboard mới, không yêu cầu lập chỉ mục, không mở lại A1; phép đo SC khoảng 29/10 vẫn thuộc A1.

## 2. V4 — ghi hoãn, không mở Q9

Trong `docs/ke-hoach-bo-sung-hinh-anh-hoat-anh-2026-09-26.md`:
- Bảng gói: thêm **trạng thái hiện hành V4** ngay dưới hàng V4 — *"Hoãn theo kế hoạch hoàn thiện 11/10/2026; chưa duyệt ngân sách, nhà cung cấp hay quyền sử dụng; chỉ mở lại bằng quyết định riêng của anh Vinh."*
- Bảng quyết định Q9: chú giải *"Q9 chưa mở — V4 hoãn theo kế hoạch 11/10/2026"*.
- Khảo sát 08/10/2026: **theo báo cáo điều phối TXN-20261017-70, chưa đối chiếu được hồ sơ khảo sát trong kho Git** — ghi là khảo sát lịch sử; con số "thuê freelance, trần 3.000 USD, 4-6 tuần" chỉ trình bày như đề xuất điều phối, **không trình như báo giá hay ngân sách đã được xác minh/duyệt**.
- Ghi rõ: V3 đã hoàn tác bằng `77ae889` — không đồng nghĩa V4 được triển khai. Không mua, đặt cọc, liên hệ freelance, xin token, dựng mô hình hay sửa code.

## 3. "Trang 374 KB" — truy vết rồi ghi hoãn

**Căn cứ truy vết được:**
- Kế hoạch hiện hành `KE-HOACH-HOAN-THIEN-CUOI-2026-10-11.md` mục E3: nhãn **"trang nặng nhất 374 KB HTML"**, ghi "Nên làm: đóng G03, hoãn V4 và tối ưu trang 374 KB" (được anh duyệt 11/10) → **hoãn là quyết định đã có trong kế hoạch, không cần chờ Q9**.
- `docs/ra-soat-doc-lap-va-lo-trinh-tiep-2026-09-25.md` mục 7: "HTML lịch sử lấy trực tiếp khoảng 370 KB [chưa nén]" — nguồn ghi số gần truy vết được sớm nhất.

**Phép đo mới (17/10/2026, `output/e3-closeout-audit/dem-html-nang.json`) — không thay thế số lịch sử:** dist sau commit `0e28e79` có **360 trang HTML, tổng 25,8 MB thô**; top 5 nặng nhất:

| Tệp | Byte | kB (thập phân) | KiB |
|---|---|---|---|
| `lich-su/index.html` | 385 344 | 385,3 | 376,3 |
| `en/history/index.html` | 378 657 | 378,7 | 369,8 |
| `mau-iconic/index.html` | 219 654 | 219,7 | 214,5 |
| `thuong-hieu/index.html` | 189 266 | 189,3 | 184,8 |
| `giai-phau/index.html` | 115 064 | 115,1 | 112,4 |

Giới hạn ghi rõ: đây là **HTML thô trên đĩa, chưa nén truyền**; không đo thời gian tải; **không gọi kích thước HTML thô là dung lượng truyền nén hay bằng chứng trang chậm**; truy nguyên từng byte về commit build không làm trong gói này. Số 374 KB lịch sử chưa nối được trực tiếp về một URL/đo cụ thể trong hồ sơ — **metadata còn thiếu được ghi rõ**, không gán chắc cho URL nào.

**Trạng thái cuối:** *"Hoãn tối ưu HTML trang Lịch sử theo kế hoạch 11/10; nhãn 374 KB là số lịch sử, metadata còn thiếu được ghi rõ."* — không cắt HTML/SVG, không đổi ảnh/font, không sửa template, không mở C6, không build chỉ để đóng việc này.

## 4. Phạm vi tệp (đúng câu lệnh — tối đa 5 tệp docs)

1. `docs/nghiem-thu/G03-duong-co-so-nguoi-xem-va-tim-kiem-2026-09-12.md` — sửa (đính chính + phụ lục 9)
2. `docs/ke-hoach-bo-sung-hinh-anh-hoat-anh-2026-09-26.md` — sửa (V4 + Q9)
3. `docs/CHI-MUC-KE-HOACH-HIEN-HANH.md` — sửa (dòng lịch sử 17/10 + nhãn V4 ở dòng kế hoạch 26/09)
4. `docs/giao-viec/THEO-DOI.md` — sửa (**chỉ hàng E3**)
5. `docs/nghiem-thu/E3-khep-viec-treo-2026-10-17.md` — **mới** (biên bản này)

Bằng chứng trong `output/e3-closeout-audit/` — không phát hành. **Không gom** trạng thái A2/A3/A4/C1/C2/C3/C4/C5 hay phụ lục phát hành đang sửa dở vào đợt phát hành E3.

## 5. Tự kiểm (mục 6 câu lệnh)

`output/e3-closeout-audit/kiem-khep-e3.mjs` — kiểm nội bộ có mã kiểm, exit 0 khi ĐẠT; kết quả tại `kiem-khep-e3.json`:

| Mã | Nội dung kiểm |
|---|---|
| E3-S1 | Ba việc có trạng thái cuối nhất quán giữa các docs được sửa |
| E3-S2 | G03 ghi đúng nền đo `02309e6` / commit phát hành `234fa26`; không còn câu "chưa commit" mang nghĩa hiện hành |
| E3-S3 | Không còn kết luận Analytics vượt bằng chứng (cấm "beacon không phát"/"script không được nhúng" như khẳng định đã xác minh; chấp nhận văn bản chuẩn "không đủ để kết luận Analytics ngày 12/09 có hoặc không hoạt động") |
| E3-S4 | Bảy tệp bằng chứng G03 nguyên SHA (đối chiếu git status + git ls-files) |
| E3-S5 | V4/Q9 không bị ghi thành "đã duyệt" hoặc "đã triển khai" (loại mệnh đề phủ định "chưa/nếu/không phải" trước khi thử; Q9 chấp nhận chú giải dưới bảng) |
| E3-S6 | 374 KB phân biệt lịch sử/đo mới, byte thô/dung lượng truyền |
| E3-S7 | Liên kết docs mới thêm có đích được Git theo dõi; không tạo liên kết GitHub tới tài liệu untracked |
| E3-S8 | Diff chỉ trong phạm vi 5 tệp (chỉ soi tracked-modified, whitelist sửa dở có trước A2/A3/A4/C1-B2/C4/C5); UTF-8; newline cuối tệp |
| E3-S9 | Hai diff-check sạch (`npm run check` + `git diff --check`) |
| E3-S10 | Văn bản đính chính Analytics đúng chuẩn chỉ dẫn ở G03 + biên bản E3; cấm các khẳng định quá mức ("khi Web Analytics được bật, Vercel…", "luôn ra 0", "dù dữ liệu đang chạy", "nạp script từ đường dẫn ngẫu nhiên", "xác nhận preview không gửi dữ liệu gì"); bảng 1.2 không còn ô "Không có" mang nghĩa kiểm kê đầy đủ |
| E3-S11 | Cấu trúc bảng Markdown qua remark-parse + remark-gfm: mọi bảng số ô đồng nhất với tiêu đề; bảng chứa hàng V4 phải còn hàng D1 (bảng không bị cắt) |
| E3-S12 | Nguồn V4: cấm "đề xuất có nguồn"; bắt buộc ghi "chưa đối chiếu được hồ sơ khảo sát"; không trình số như ngân sách đã xác minh/duyệt |

**Thử âm tính trên bản sao (không mutate docs thật):** bản sao G03/biên bản có khẳng định quá mức → S10 bắt; bản sao ke-hoach chèn đoạn giữa V4 và D1 (cắt bảng) → S11 bắt; bản sao khôi phục "đề xuất có nguồn" → S12 bắt.

**Lỗi đã va khi dựng checker (ghi truy vết):** remark AST đặt `**V4**` thành node `strong` — phải lấy chữ đệ quy xuống text node, không đọc `.value` trực tiếp; dấu phân cách hàng bảng là `¶` (không phải `§`); S5/S12 phải loại mệnh đề phủ định ("chưa/nếu/không phải") trước khi thử; S8 ban đầu quét nhầm hàng trăm tệp untracked có sẵn.

## 5b. Vòng sửa tối hạn sau TXN-71 (GPT Work: E3 CHƯA ĐẠT — 3 nhóm)

1. **Analytics khẳng định quá mức** → thay toàn bộ bằng văn bản chỉ dẫn ("Phép kiểm ngày 12/09 chỉ tìm một số chuỗi tên đường dẫn nên có thể bỏ sót tài nguyên/request Analytics. Quan sát được ghi trong tài liệu 19/09 cho thấy hạn chế của phương pháp này; không đủ để kết luận Analytics ngày 12/09 có hoặc không hoạt động, cũng không xác lập nguyên nhân của kết quả 0.") tại G03 (đính chính + kết luận 1.2 + mục 1.3 + mục 4 + phụ lục 9) và biên bản E3; bỏ mọi cụm "khi bật thì Vercel không phục vụ…", "luôn/đều trả 0", "dù dữ liệu đang chạy"; bảng 1.2 đổi ô "Không có" → "Không phát hiện theo phép tìm chuỗi" và "0 request" → "0 request trong tập lọc"; mục 1.3 không suy 404 localhost thành xác nhận preview không gửi dữ liệu.
2. **Bảng Markdown hỏng** → dời ghi chú V4 + Q9 ra **ngoài toàn bộ bảng** ke-hoach (blockquote sau bảng quyết định); trả hàng Q9 về nguyên bản 4 ô; nhãn V4 trong CHI-MUC ghép vào **ô Ghi chú hiện có** (hàng giữ đúng 3 ô); S11 xác minh bằng parser (tất cả bảng số ô đồng nhất, V4–D1 cùng một bảng).
3. **Nguồn V4** → bỏ "đề xuất có nguồn"; ghi "theo báo cáo điều phối TXN-20261017-70, chưa đối chiếu được hồ sơ khảo sát"; số 3.000 USD/4-6 tuần không trình như báo giá hay ngân sách đã xác minh/duyệt.

## 6. Rủi ro và quay lại

- Thay đổi chỉ ở docs — quay lại bằng revert commit phát hành E3.
- Rủi ro hiểu nhầm: mọi câu kết luận đã được hạ đúng mức bằng chứng; số đo mới được nhãn rõ "phép đo mới, không thay thế số lịch sử".
