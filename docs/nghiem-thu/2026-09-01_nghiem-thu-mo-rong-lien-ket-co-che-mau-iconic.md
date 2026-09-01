# Biên bản nghiệm thu — Prompt 22: Mở rộng liên kết hai chiều Cơ chế ↔ Mẫu iconic

- **Ngày:** 01/09/2026
- **Phạm vi:** 14 tệp nội dung sửa (5 bài cơ chế + 9 bài mẫu iconic) + `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` + biên bản này. Không sửa schema, component, template, CSS, JavaScript, slug, URL, ảnh, thân bài hay nguồn hiện có.

## 1. Mục tiêu và nguyên tắc biên tập

Mở rộng hệ thống "Kết nối cùng chủ đề" giữa bài cơ chế và mẫu iconic theo **năm cụm rõ ràng: chronograph, tourbillon, pha trăng, lên dây tự động và dạ quang**. Mỗi quan hệ hai chiều, nhãn trung tính, chỉ dùng dữ kiện đã có trong hai bài; không dùng từ tuyệt đối, không tạo liên kết trùng, không sửa các liên kết editorial đúng từ các Prompt trước.

## 2. Mốc Git trước khi thực hiện

- Prompt 22 bắt đầu từ commit **`f00b4fc` — "fix(content): thay nguồn tham khảo bị chết"**. Đây là HEAD khi thực hiện và kiểm tra Prompt 22.
- Nhánh `main`. Không commit, không push trong suốt gói.

## 3. Danh sách toàn bộ tệp thay đổi (14 + 2 tài liệu + biên bản)

| # | Tệp | Thay đổi |
|---|---|---|
| 1 | `src/content/coChe/vi/chronograph.md` | Nối 3 mục mới vào `relatedModels` (giữ nguyên 3 mục cũ); `updated` → 2026-09-01 |
| 2 | `src/content/coChe/vi/tourbillon.md` | +khối `relatedModels` 3 mục + `updated: "2026-09-01"` |
| 3 | `src/content/coChe/vi/pha-trang.md` | +khối `relatedModels` 1 mục + `updated: "2026-09-01"` |
| 4 | `src/content/coChe/vi/len-day-tu-dong.md` | +khối `relatedModels` 1 mục + `updated: "2026-09-01"` |
| 5 | `src/content/coChe/vi/da-quang.md` | +khối `relatedModels` 1 mục + `updated: "2026-09-01"` |
| 6 | `src/content/mauIconic/vi/monaco.md` | +khối `relatedMechanisms` 1 mục; `updated` → 2026-09-01 |
| 7 | `src/content/mauIconic/vi/zenith-el-primero.md` | +khối `relatedMechanisms` 1 mục; +`updated: "2026-09-01"` |
| 8 | `src/content/mauIconic/vi/seagull-1963.md` | +khối `relatedMechanisms` 1 mục; `updated` → 2026-09-01 |
| 9 | `src/content/mauIconic/vi/girard-perregaux-tourbillon-ba-cau.md` | +khối `relatedMechanisms` 1 mục; `updated` → 2026-09-01 |
| 10 | `src/content/mauIconic/vi/greubel-double-tourbillon.md` | +khối `relatedMechanisms` 1 mục; `updated` → 2026-09-01 |
| 11 | `src/content/mauIconic/vi/hajime-asaoka-project-t.md` | +khối `relatedMechanisms` 1 mục; `updated` → 2026-09-01 |
| 12 | `src/content/mauIconic/vi/arnold-and-son-perpetual-moon.md` | +khối `relatedMechanisms` 1 mục; `updated` → 2026-09-01 |
| 13 | `src/content/mauIconic/vi/eterna-matic-1948.md` | +khối `relatedMechanisms` 1 mục; `updated` → 2026-09-01 |
| 14 | `src/content/mauIconic/vi/panerai-luminor.md` | +khối `relatedMechanisms` 1 mục (giữ nguyên liên kết Fifty Fathoms); `updated` 2026-08-30 → 2026-09-01 |
| 15 | `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` | Cập nhật số đếm thực tế phần hiện trạng + Ưu tiên 1 |
| 16 | `docs/nghiem-thu/2026-09-01_nghiem-thu-mo-rong-lien-ket-co-che-mau-iconic.md` | Tạo mới (biên bản này) |

## 4. Bảng 18 liên kết mới

### Chiều bài cơ chế → mẫu iconic (9 liên kết mới; sau gói là 13 mục relatedModels trong 6 bài cơ chế)

| # | Bài cơ chế (nguồn) | Bài đích | Nhãn quan hệ (nguyên văn) |
|---|---|---|---|
| 1 | chronograph | monaco | "Chronograph tự động Calibre 11 đưa Monaco năm 1969 thành một biểu tượng khác biệt bằng vỏ vuông" |
| 2 | chronograph | zenith-el-primero | "El Primero là ví dụ chronograph tự động tích hợp tần số cao 36.000 vph" |
| 3 | chronograph | seagull-1963 | "ST19 cho thấy chronograph cơ bánh xe cột ở một điểm tiếp cận dễ hơn với người mới chơi" |
| 4 | tourbillon | girard-perregaux-tourbillon-ba-cau | "Tourbillon với Ba Cầu Vàng đưa lồng xoay và kết cấu bộ máy thành trung tâm của mặt số" |
| 5 | tourbillon | greubel-double-tourbillon | "Double Tourbillon 30° phát triển ý tưởng tourbillon bằng hai lồng xoay lồng nhau" |
| 6 | tourbillon | hajime-asaoka-project-t | "Project T là một ứng dụng tourbillon in-house trong chế tác độc lập Nhật Bản" |
| 7 | pha-trang | arnold-and-son-perpetual-moon | "Perpetual Moon là ví dụ trực tiếp về cơ cấu hiển thị tuần trăng với độ chính xác được hãng công bố một ngày sau 122 năm" |
| 8 | len-day-tu-dong | eterna-matic-1948 | "Eterna-Matic 1948 là ví dụ lịch sử về rotor đặt trên vòng bi trong cơ chế lên dây tự động" |
| 9 | da-quang | panerai-luminor | "Luminor cho thấy cách một vật liệu phát quang lịch sử trở thành tên gọi nhận diện của cả một dòng đồng hồ" |

### Chiều mẫu iconic → bài cơ chế (9 mục `relatedMechanisms` mới)

| # | Bài iconic (nguồn) | Bài đích | Nhãn quan hệ |
|---|---|---|---|
| 10 | monaco | chronograph | "Xem cơ chế chạy, dừng và đặt lại đằng sau chronograph tự động của Monaco" |
| 11 | zenith-el-primero | chronograph | "Xem nguyên lý chronograph và cấu trúc chronograph tích hợp của El Primero" |
| 12 | seagull-1963 | chronograph | "Xem nguyên lý cơ chế bấm giờ và vai trò bánh xe cột trong Seagull 1963" |
| 13 | girard-perregaux-tourbillon-ba-cau | tourbillon | "Xem nguyên lý lồng xoay bù sai số trọng lực — nền của bố cục Ba Cầu Vàng trên mặt số" |
| 14 | greubel-double-tourbillon | tourbillon | "Xem nguyên lý lồng xoay gốc mà Double Tourbillon 30° phát triển thành hai lồng xoay lồng nhau" |
| 15 | hajime-asaoka-project-t | tourbillon | "Xem nguyên lý lồng xoay mà Project T đưa vào chế tác độc lập Nhật Bản" |
| 16 | arnold-and-son-perpetual-moon | pha-trang | "Xem cơ cấu bánh răng và đĩa tuần trăng phía sau hiển thị thiên văn của Perpetual Moon" |
| 17 | eterna-matic-1948 | len-day-tu-dong | "Xem rotor và hệ lên dây tự động phía sau cải tiến vòng bi của Eterna-Matic" |
| 18 | panerai-luminor | da-quang | "Xem nguyên lý vật liệu phát quang phía sau tên gọi Luminor và khả năng đọc giờ trong bóng tối" |

Tổng **18 liên kết mới**: **9 liên kết mới** theo chiều bài cơ chế → mẫu iconic và **9 liên kết mới** theo chiều bài mẫu iconic → cơ chế. Sau Prompt 22, tổng `relatedModels` từ bài cơ chế là **13 mục trong 6 bài cơ chế**, gồm 9 mục mới của Prompt 22, cộng 3 mục Chronograph đã có từ trước (breguet-type-xx, breitling-navitimer, omega-speedmaster) và 1 mục Co-Axial → Speedmaster đã có từ trước — hai nhóm cũ không phải liên kết mới của Prompt 22. Cả 9 nhãn ngược mô tả đúng vai trò riêng của từng mẫu; không nhãn nào nói tourbillon làm đồng hồ đeo tay chính xác tuyệt đối; không dùng cụm "Navy SEAL Pháp".

## 5. Xác nhận không sửa ngoài frontmatter

Không sửa thân bài, `sources`, thông số, reference, ảnh, schema, component, template, CSS/JS hay bất kỳ URL/slug nào. Các liên kết cũ giữ nguyên vị trí và nguyên văn: 3 mục chronograph cũ (type-xx/navitimer/speedmaster), Co-Axial ở Speedmaster, liên kết Fifty Fathoms ở Panerai Luminor, toàn bộ `relatedModels` của 9 bài iconic (mục ngược thêm ở cuối khối hoặc khối `relatedMechanisms` riêng mới). `git diff --stat` xác nhận chỉ 16 tệp trong phạm vi.

## 6. Số đếm sau khi sửa (node script đếm trực tiếp từ frontmatter, 01/09/2026)

| Đại lượng | Giá trị |
|---|---|
| `relatedModels` giữa các mẫu iconic | **125 mục / 66 bài** (giữ nguyên) |
| `relatedMechanisms` trên bài mẫu iconic | **13 mục / 12 bài** (3 chronograph cũ + 1 Co-Axial + 9 mới) |
| `relatedModels` từ bài cơ chế | **13 mục / 6 bài** (chronograph 6, tourbillon 3, pha-trang 1, len-day-tu-dong 1, da-quang 1, bo-thoat-dong-truc 1 có từ Prompt 13) |

Khớp đúng mốc dự kiến của đề.

## 7. Kết quả kiểm tra kỹ thuật

| Lệnh | Kết quả |
|---|---|
| `npm run check` | ĐẠT — "Tất cả kiểm tra nội dung tĩnh đạt" |
| `npm run build` | Thành công — **218 trang**, không lỗi; sitemap tạo xong |
| Kiểm link nội bộ sau build | "OK: Không phát hiện link nội bộ hỏng. Đã quét 218 trang HTML, **14381 link**." — tăng đúng **+18** từ 14.363 |
| `git diff --check` | Không có lỗi (exit 0) |
| `git status --short` / `git diff --stat` | Đúng các tệp mục 3, cộng các tệp docs/output chưa theo dõi sẵn có của chủ dự án — không đụng |
| Slug đích | Cả 9 slug mẫu + 5 slug cơ chế tồn tại thực trong `src/content/` |
| Trùng lặp | Không có slug trùng trong một khối; không hai liên kết cùng href trong một khối (kiểm tự động trên 14 trang) |

## 8. Kết quả kiểm tra hiển thị local (preview sau build)

Kiểm tự động 14 trang (5 cơ chế + 9 iconic):

- **14/14 đạt, 0 thất bại**: mỗi trang status 200, đúng 1 khối "Kết nối cùng chủ đề", href khớp chính xác thứ tự yêu cầu (mục ngược nằm cuối khối sau các mục cũ), không liên kết trùng.
- Loại nội dung hiển thị đúng: trang chronograph 6 thẻ đều nhãn "MẪU ICONIC"; trang monaco 2 "MẪU ICONIC" + 1 "CƠ CHẾ".
- Bàn phím: Tab từ đầu trang `/co-che/da-quang/` đi tới được liên kết `/mau-iconic/panerai-luminor`; các link là `<a>` chuẩn với vòng focus rõ.
- Sáng/tối: chụp 2 ảnh khối liên kết trang chronograph (6 thẻ) — không chồng lấn, chữ đọc rõ cả hai chế độ.
- Console: 0 lỗi mới — log console chỉ còn hai 404 cố hữu của bản preview (`favicon.ico`, `/_vercel/insights/script.js` — analytics chỉ chạy production), đếm được 0 dòng 404 khác.

## 9. Giới hạn

Đây là **liên kết biên tập dựa trên nội dung đã có** — các câu quan hệ chỉ diễn đạt lại dữ kiện đang có trong hai bài của mỗi quan hệ (đã grep xác minh "Calibre 11", "36.000", "bánh xe cột" hiện diện nguyên văn trong bài gốc trước khi nhập); **không phải đợt kiểm chứng lại toàn bộ dữ kiện lịch sử** của 14 bài.

## 10. Kết luận

**ĐẠT** — đủ 18 liên kết mới đúng chiều, không trùng, không slug hỏng; lộ trình phản ánh số đếm thực tế; check/build/git đạt; 14381 link khớp dự kiến. Chưa commit, chưa push — chờ Codex kiểm tra độc lập. Không ghi mã commit mới.
