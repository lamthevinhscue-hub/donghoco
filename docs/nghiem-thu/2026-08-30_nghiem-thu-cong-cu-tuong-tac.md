# BIÊN BẢN NGHIỆM THU — BỐN CÔNG CỤ TƯƠNG TÁC

**Ngày:** 30/08/2026
**Commit baseline:** `9915a58` — "feat(interactive): nâng cấp công cụ GMT và tachymeter" (nhánh `main`)
**Phạm vi:** nghiệm thu nhóm hoàn chỉnh bốn công cụ tương tác sau khi nâng cấp qua các prompt trước; không thêm hiệu ứng hay tính năng mới.

---

## 1. Phạm vi và route đã kiểm

| Công cụ | Tệp | Route |
|---|---|---|
| Vành lặn | `src/components/interactive/BezelDiver.astro` | `/huong-dan/dung-vanh-lan` |
| Chỉnh lịch an toàn | `src/components/interactive/DateSafety.astro` | `/huong-dan/chinh-lich-an-toan` |
| Đọc GMT | `src/components/interactive/GmtReader.astro` | `/huong-dan/doc-va-chinh-gmt` |
| Tachymeter | `src/components/interactive/TachymeterTool.astro` | `/huong-dan/dung-tachymeter` |

Cách kiểm: bản preview sau `npm run build` (astro preview), trình duyệt tự động (Playwright) — viewport **375×812** (mobile) và **1440×900** (desktop), chế độ **sáng và tối**; thao tác được thực thi thật (bấm nút, kéo giá trị thanh trượt, bàn phím Tab/Enter) chứ không chỉ đọc mã.

## 2. Kết quả hiển thị và chức năng theo route

| Route | Mobile 375 · sáng | Mobile 375 · tối | Desktop 1440 · sáng | Desktop 1440 · tối |
|---|---|---|---|---|
| `/huong-dan/dung-vanh-lan` | PASS | PASS | PASS | PASS |
| `/huong-dan/chinh-lich-an-toan` | PASS | PASS | PASS | PASS |
| `/huong-dan/doc-va-chinh-gmt` | PASS | PASS | PASS | PASS |
| `/huong-dan/dung-tachymeter` | PASS | PASS | PASS | PASS |

Tiêu chí PASS mỗi ô: không tràn ngang (đo `scrollWidth − clientWidth = 0px` ở cả hai viewport), không có chữ/kim/nhãn chồng lấn hoặc chìm vào nền, ảnh chụp sáng/tối đều đọc được.

## 3. Kết quả chức năng đặc thù

| Kiểm tra chức năng | Kết quả | Bằng chứng |
|---|---|---|
| Vành lặn — xoay bằng nút và đọc số phút | PASS | Nút "Giả lập va chạm" → trạng thái "Vành bị xoay theo chiều an toàn 5 phút. Số đọc hiện là 55 phút…"; không sinh giá trị âm/vô lý |
| Vành lặn — đặt mốc 0, chạy/dừng mô phỏng | PASS | "Đặt mốc 0" → 0 phút; nút chạy có `aria-pressed` đổi đúng |
| Chỉnh lịch — phân biệt vùng an toàn/ăn khớp bằng chữ | PASS | 22:00 → "Không chỉnh lịch lúc này" + live "22:00. Cơ cấu lịch có thể đang ăn khớp…"; 06:00 → "Có thể chỉnh lịch"; có lưu ý "quy tắc thận trọng phổ biến… xem hướng dẫn của mẫu đồng hồ cụ thể" |
| GMT — ba múi giờ cập nhật đúng cơ chế | PASS | Khởi đầu 12/12/12; kim GMT +1 → 12:00/13:00/13:00; vành tiến 1 → 12:00/13:00/12:00; kim giờ +1 → chỉ địa phương đổi; ví dụ "bay qua 7 múi giờ" → 09:00/16:00/18:00 |
| Tachymeter — ví dụ chuẩn 1 km / 30 giây | PASS | Kết quả `120 km/h`, trạng thái giải thích đọc số 120 trên thang |
| Tachymeter — dưới 9 giây | PASS | Đo 1,3 giây → **không** hiện kết quả; trạng thái "Mới đo 1.3 giây. Mô phỏng này chỉ có vạch từ 9 đến 60 giây…"; kim và thời gian giữ nguyên |
| Tachymeter — trên 60 giây | PASS | Tự dừng ở 60 giây, không hiện kết quả, trạng thái giải thích thang không còn đọc trực tiếp; không để lại kết quả cũ |
| Tachymeter — dừng khi chưa bắt đầu / reset | PASS | "Chưa có phép đo nào đang chạy…"; reset về 0.0 giây và ẩn kết quả |

## 4. Bàn phím, reduced motion, console

| Hạng mục | Kết quả | Bằng chứng |
|---|---|---|
| Tab tới nút đầu của từng công cụ | PASS | 8–10 lần Tab từ đầu trang (qua điều hướng trước đó — thứ tự hợp lý), không nhảy ra ngoài, không kẹt |
| Focus nhìn thấy | PASS | `focus-visible` = true trên nút được focus ở cả bốn công cụ |
| Enter kích hoạt nút | PASS | Bezel: trạng thái đổi thành câu giả lập va chạm; Date: giá trị giờ đổi (6); GMT: trạng thái cập nhật; Tachymeter: bắt đầu đo |
| Reduced motion — Tachymeter | PASS | Nút thành "Tiến 5 giây"; 2 lần tiến → dừng → `360 km/h`; không chạy kim liên tục |
| Reduced motion — Bezel | PASS | Nút thành "Tiến 5 phút"; 1 lần bấm → 5 phút, không vòng lặp |
| Console / page error | PASS | Không có lỗi console hoặc pageerror trong bốn luồng thao tác (trừ 404 cố hữu của preview local: `/_vercel/insights/script.js`, favicon — không liên quan component) |

## 5. Lỗi phát hiện và xử lý

**Không phát hiện lỗi hồi quy trong phạm vi đã kiểm.** Bốn component đạt toàn bộ điều kiện chức năng ở mục 3 và mục 4 ngay trong vòng nghiệm thu này; không chỉnh code sau vòng kiểm.

(Trạng thái working tree tại thời điểm nghiệm thu: các thay đổi duy nhất thuộc tài liệu — `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` và biên bản này; bốn component đã được commit trong `9c39352` và `9915a58`.)

## 6. Kết quả lệnh kiểm

- `git diff --check`: **đạt** (không lỗi whitespace).
- `npm run check`: **đạt** — "Tất cả kiểm tra nội dung tĩnh đạt".
- `npm run build`: **đạt** — 218 trang, `Complete!`, không EPERM, 0 liên kết nội bộ hỏng (14.223 link).

## 7. CHƯA KIỂM

Các việc dưới đây **CHƯA KIỂM** trong biên bản này vì thiếu công cụ/thiết bị phù hợp — không suy đoán kết quả:

- **Thiết bị cảm ứng thật** (điện thoại/máy tính bảng thật): thao tác kéo vành/kéo kim được kiểm bằng pointer events mô phỏng chuột, chưa kiểm trên màn cảm ứng thật.
- **Trình đọc màn hình thật** (NVDA/VoiceOver): vùng `role="status"` được xác nhận có mặt và cập nhật bằng văn bản, chưa nghe thử output thật.
- **Production thật** (kienthucdonghoco.vn sau deploy): mọi phép thử chạy trên preview local sau build.
- **Bàn phím phần cứng + công cụ hỗ trợ của hệ điều hành**: kiểm bằng bàn phím ảo của trình duyệt tự động.
- **Hiệu năng** (Core Web Vitals) và **Search Console/Analytics**: thuộc ưu tiên theo dõi dữ liệu thực, chưa có số liệu.

## 8. Kết luận

**GO** — không còn lỗi chặn sử dụng trong phạm vi đã kiểm; `npm run check` và `npm run build` đều đạt. Bốn công cụ tương tác coi như hoàn tất nâng cấp và nghiệm thu ở mức preview; các mục ở mục 7 chuyển vào danh sách nghiệm thu production của ưu tiên 2 trong `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md`.
