# Biên bản nghiệm thu — Sơ đồ tiến hóa Rolex Submariner (thí điểm)

- **Ngày nghiệm thu:** 30/08/2026
- **Phạm vi:** bản thí điểm đầu tiên của sơ đồ tiến hóa mẫu iconic, hiển thị tại **duy nhất một trang**: `https://www.kienthucdonghoco.vn/mau-iconic/rolex-submariner/` — đặt ngay sau bảng thông số kỹ thuật, trước nội dung bài viết. Điều kiện tích hợp chặt theo `lang === 'vi' && slug === 'rolex-submariner'`; các mẫu iconic và trang thương hiệu khác không thay đổi.
- **Kết luận: ĐẠT ở mức preview.** Toàn bộ hạng mục kiểm trong đợt này đạt; những mục chưa kiểm liệt kê minh bạch ở phần 5.

## 1. Dữ liệu hiển thị — đúng 8 mốc, đúng nguồn

Nguồn dữ kiện duy nhất trong code: `src/data/submarinerEvolution.ts`, đối chiếu nguyên văn với `docs/ho-so-du-lieu-tien-hoa-rolex-submariner.md` (ngày rà 30/08/2026) mục "Đề xuất dataset cho sơ đồ thí điểm". Component không tự chép dữ kiện nào.

| Năm | Reference | Nhãn trên sơ đồ | Nguồn hiển thị | URL |
|---|---|---|---|---|
| 1953 | 6204 | Khởi đầu dòng | Hodinkee | https://www.hodinkee.com/articles/rolex-submariner-reference-points |
| 1959 | 5512 | Vành che núm xuất hiện | Hodinkee | https://www.hodinkee.com/articles/rolex-submariner-reference-points |
| 1962 | 5513 | Bản không lịch kinh điển | Hodinkee | https://www.hodinkee.com/articles/rolex-submariner-reference-points |
| 1969 | 1680 | Lịch ngày đầu tiên | Rolex Newsroom | https://newsroom.rolex.com/watches/oyster-collection/submariner |
| 1979 | 16800 | Kính sapphire + 300m | Monochrome | https://monochrome-watches.com/rolex-submariner-history-part-3-the-5-digit-references/ |
| 1988 | 16610 | Calibre 3135 | Monochrome | https://monochrome-watches.com/rolex-submariner-history-part-3-the-5-digit-references/ |
| 2012 | 114060 | Bezel gốm | Monochrome | https://monochrome-watches.com/rolex-submariner-history-part-4-modern-references/ |
| 2020 | 124060 | Thế hệ hiện tại 41mm | Rolex Newsroom | https://newsroom.rolex.com/watches/oyster-collection/submariner |

Mốc 1680 hiển thị đúng ghi chú biên tập: "Rolex chính thức ghi 1969; một số nguồn thương mại ghi 1966–1967 nên không dùng các năm đó làm dữ kiện" — không nêu 1966–1967 như một sự thật.

## 2. Kết quả kiểm tra tự động (Playwright trên preview local)

| Hạng mục | Kết quả |
|---|---|
| Cấu trúc | section có tiêu đề "Tiến hóa Rolex Submariner" + dòng giới thiệu đúng đề bài; `<ol>` 8 mục |
| 8 nút mốc | đủ 8, thứ tự năm/reference đúng: 1953·6204 → 2020·124060 |
| Mặc định | chọn 6204/1953 — `aria-pressed=true` ở nút đầu, chỉ thẻ chi tiết 1953 mở |
| Chọn mốc | bấm 16800 → chỉ thẻ 16800 mở, `aria-pressed` chuyển đúng một nút |
| 8 liên kết nguồn | đúng 4 URL gốc trong hồ sơ; tất cả `target="_blank"` + `rel="noopener noreferrer"` |
| 1440×900 sáng/tối | 0px tràn ngang; 0 cặp nút chồng lấn trên đường ray; thẻ chi tiết trải rộng dưới ray; chụp ảnh kiểm tra hình thức |
| 768×900 sáng/tối | 0px tràn ngang; 0 chồng lấn; 8 cột vừa khung bài |
| 375×812 sáng/tối | cả 8 thẻ chi tiết mở sẵn (không cần tương tác, không vuốt ngang); đường ray trang trí ẩn; nút cao nhất ≥47px; link nguồn ≥47px; 0px tràn ngang |
| Bàn phím | Tab tới mốc đầu sau 9 nhịp từ đầu trang; Enter chọn mốc; Tab kế rơi đúng vào link nguồn của thẻ đang mở (thứ tự DOM), Tab tiếp tới nút kế; Space chọn; focus-visible outline 2px solid |
| prefers-reduced-motion | transition computed xấp xỉ 0 (tắt hẳn — khớp cơ chế reduced-motion toàn cục của dự án) |
| Dark mode (class `.dark`) | nền than, chữ ngà, thẻ mốc đang chọn viền đồng trên bề mặt nổi — chụp 375/768/1440 cả sáng và tối |
| Console | chỉ 2 lỗi cố hữu đã biết từ trước (favicon.ico 404 + `/_vercel/insights/script.js` 404 — analytics chỉ chạy trên Vercel); không có lỗi nào từ sơ đồ |
| Trang đối chứng | `/mau-iconic/omega-speedmaster/` và `/mau-iconic/patek-nautilus/`: 0 sơ đồ |

## 3. Kiểm tra tĩnh + build

- `npm run check` — ĐẠT toàn bộ (scan ký tự lạ, contrast, keyboard, semantic, motion, content — 51 link template).
- `npm run build` — 218 trang, Complete!, 14.231 link nội bộ, 0 link hỏng (+8 so với trước đúng bằng 8 link nguồn mới).

## 4. Cố ý KHÔNG đưa vào sơ đồ (đúng đề bài và hồ sơ dữ liệu)

- **6200, 6538, 5510, 14060/14060M** — năm sản xuất còn mâu thuẫn giữa các nguồn hoặc chưa đủ nguồn (bảng "Cần kiểm chứng" trong hồ sơ dữ liệu); đề bài cấm dùng thêm reference ngoài 8 mốc.
- **Biệt danh sưu tầm** ("Big Crown", "Red Sub", "Starbucks"…) — không xuất hiện dưới bất kỳ dạng nào.
- **Giá, đầu tư, độ hiếm, "đáng mua", xếp hạng** — không có.
- **Ảnh đồng hồ giả, hiệu ứng 3D, carousel tự chạy, animation lặp** — không có; vạch bezel SVG chỉ trang trí, `aria-hidden="true"`, không chứa thông tin thiết yếu.

## 5. Chưa kiểm / giới hạn

- Chưa nghiệm thu trên **production thật** và **thiết bị cảm ứng thật** — đợt này kiểm ở mức preview local (đúng giới hạn của các biên bản trước).
- Chưa test với **screen reader thật** — mới kiểm cấu trúc (nút thật Tab/Enter/Space, `aria-pressed`, thẻ chi tiết có `role="group"` + `aria-label`, không tự cướp focus).
- Link nguồn ngoài đã xác nhận còn sống trong đợt rà nguồn 30/08/2026 (hồ sơ dữ liệu); đợt này chưa mở lại từng link trên mạng thật.
- `docs/nghiem-thu/README.md` **chưa** thêm dòng chỉ mục cho biên bản này — theo quy ước chỉ cập nhật khi được ra lệnh rõ ràng.

## 6. Tệp thuộc gói này

- Tạo: `src/data/submarinerEvolution.ts`, `src/components/SubmarinerEvolution.astro`, `docs/nghiem-thu/2026-08-30_nghiem-thu-so-do-tien-hoa-submariner.md`
- Sửa: `src/pages/mau-iconic/[slug].astro` (import + khối render có điều kiện), `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` (đánh dấu hoàn thành hai mục Ưu tiên 1 của sơ đồ tiến hóa)
- Không sửa: bài `rolex-submariner.md`, `CAN-KIEM-CHUNG.md`, layout dùng chung, schema
