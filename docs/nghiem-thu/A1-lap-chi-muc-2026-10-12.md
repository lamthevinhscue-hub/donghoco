# BIÊN BẢN A1 — Chuẩn bị 15 địa chỉ để GPT thao tác Search Console

**Gói:** A1 — đẩy lập chỉ mục Google (đợt 1: 15 địa chỉ)
**Danh mục:** DHC-HOAN-THIEN-20261011 v1.0.0
**Giao dịch:** TXN-20261011-19 (câu lệnh của GPT Work; Bên thao tác Search Console: GPT theo quyết định mục 0 kế hoạch 11/10 — anh cho phép)
**Ngày kiểm:** 12/10/2026
**Nền:** HEAD `ebd12af` = `origin/main`
**Bên chuẩn bị hồ sơ:** GLM. Bên nghiệm thu/trực tiếp Search Console: GPT Work.

## 1. Phạm vi

- Đúng 15 địa chỉ, giữ thứ tự đầu vào `docs/giao-viec/dot-1/A1-A4-lap-chi-muc-va-mo-ta.md` (đợt 1). Không thêm đợt 2/3 hay bài B7.
- Hai tệp được sửa/tạo: biên bản này + `docs/giao-viec/THEO-DOI.md` (riêng hàng A1). Bằng chứng tại `output/a1-indexing-audit/`, không commit.
- Gói docs-only — không cần build.

## 2. Bảng 15 địa chỉ — kết quả kiểm ngày 12/10/2026

Dạng rút gọn, tiền tố `https://www.kienthucdonghoco.vn`. Kiểm bằng curl (theo redirect, -m 20): HTTP, URL cuối, canonical trong HTML, meta robots/googlebot, header X-Robots-Tag. Nhật ký thô: `kiem-15-dia-chi.txt`, `kiem-x-robots.txt`.

| STT | URL HTTPS đầy đủ | HTTP | URL cuối | Canonical | robots meta/X-Robots-Tag | Ngày giờ kiểm | Ghi chú |
|---|---|---|---|---|---|---|---|
| 1 | https://www.kienthucdonghoco.vn/ | 200 | (không redirect) | https://www.kienthucdonghoco.vn/ | không có | 12/10/2026 | — |
| 2 | https://www.kienthucdonghoco.vn/co-che | 200 | (không redirect) | …/co-che/ | không có | 12/10/2026 | canonical thêm `/` |
| 3 | https://www.kienthucdonghoco.vn/lich-su | 200 | (không redirect) | …/lich-su/ | không có | 12/10/2026 | canonical thêm `/` |
| 4 | https://www.kienthucdonghoco.vn/co-che/day-toc-banh-lac | 200 | (không redirect) | …/co-che/day-toc-banh-lac/ | không có | 12/10/2026 | canonical thêm `/` |
| 5 | https://www.kienthucdonghoco.vn/co-che/bo-thoat | 200 | (không redirect) | …/co-che/bo-thoat/ | không có | 12/10/2026 | canonical thêm `/` |
| 6 | https://www.kienthucdonghoco.vn/co-che/chuyen-dong-co | 200 | (không redirect) | …/co-che/chuyen-dong-co/ | không có | 12/10/2026 | canonical thêm `/` |
| 7 | https://www.kienthucdonghoco.vn/lo-trinh-hoc-dong-ho | 200 | (không redirect) | …/lo-trinh-hoc-dong-ho/ | không có | 12/10/2026 | canonical thêm `/` |
| 8 | https://www.kienthucdonghoco.vn/huong-dan/chon-dong-ho-dau-tien | 200 | (không redirect) | …/huong-dan/chon-dong-ho-dau-tien/ | không có | 12/10/2026 | canonical thêm `/` |
| 9 | https://www.kienthucdonghoco.vn/huong-dan/len-day-dong-ho | 200 | (không redirect) | …/huong-dan/len-day-dong-ho/ | không có | 12/10/2026 | canonical thêm `/` |
| 10 | https://www.kienthucdonghoco.vn/huong-dan/muc-chong-nuoc | 200 | (không redirect) | …/huong-dan/muc-chong-nuoc/ | không có | 12/10/2026 | canonical thêm `/` |
| 11 | https://www.kienthucdonghoco.vn/co-che/len-day-tu-dong | 200 | (không redirect) | …/co-che/len-day-tu-dong/ | không có | 12/10/2026 | canonical thêm `/` |
| 12 | https://www.kienthucdonghoco.vn/co-che/chong-nuoc | 200 | (không redirect) | …/co-che/chong-nuoc/ | không có | 12/10/2026 | canonical thêm `/` |
| 13 | https://www.kienthucdonghoco.vn/giai-phau | 200 | (không redirect) | …/giai-phau/ | không có | 12/10/2026 | canonical thêm `/` |
| 14 | https://www.kienthucdonghoco.vn/thuong-hieu | 200 | (không redirect) | …/thuong-hieu/ | không có | 12/10/2026 | canonical thêm `/` |
| 15 | https://www.kienthucdonghoco.vn/mau-iconic | 200 | (không redirect) | …/mau-iconic/ | không có | 12/10/2026 | canonical thêm `/` |

Ghi chú chung: mọi URL đều cùng miền `www.kienthucdonghoco.vn`; canonical dùng dấu `/` cuối (khớp nhận xét của GPT Work); không có meta robots/googlebot chặn; header X-Robots-Tag không có ở cả 15; không phát hiện redirect khi truy cập dạng không-gạch-cuối (server phục vụ trực tiếp).

## 3. Kết quả GPT thao tác trực tiếp Search Console — TXN-20261011-20

Đã xác nhận đúng tài sản miền `kienthucdonghoco.vn`. Thao tác ngày 12/10/2026, từ 03:12 đến 03:26; giờ dưới đây là thời điểm kiểm tra phiên bản hoạt động hiển thị trên Search Console, không phải thời điểm Google lập chỉ mục. Dùng URL canonical có dấu `/` cuối. Không đổi quyền, cài đặt hay sơ đồ trang.

| STT | URL | Trạng thái lập chỉ mục trước thao tác | Kiểm tra trực tiếp | canonical Google chọn (nếu có) | Yêu cầu lập chỉ mục | Thời điểm | Thông báo/lý do dừng |
|---|---|---|---|---|---|---|---|
| 1 | https://www.kienthucdonghoco.vn/ | Đã lập chỉ mục | Google có thể lập chỉ mục | https://www.kienthucdonghoco.vn/ | Đã yêu cầu lập chỉ mục | 12/10/2026 03:12 | Được thêm vào hàng đợi ưu tiên thu thập dữ liệu |
| 2 | https://www.kienthucdonghoco.vn/co-che/ | Đã phát hiện thấy – hiện chưa được lập chỉ mục | Google có thể lập chỉ mục | Không áp dụng | Đã yêu cầu lập chỉ mục | 12/10/2026 03:15 | Được thêm vào hàng đợi ưu tiên thu thập dữ liệu |
| 3 | https://www.kienthucdonghoco.vn/lich-su/ | Đã phát hiện thấy – hiện chưa được lập chỉ mục | Google có thể lập chỉ mục | Không áp dụng | Đã yêu cầu lập chỉ mục | 12/10/2026 03:16 | Được thêm vào hàng đợi ưu tiên thu thập dữ liệu |
| 4 | https://www.kienthucdonghoco.vn/co-che/day-toc-banh-lac/ | Đã phát hiện thấy – hiện chưa được lập chỉ mục | Google có thể lập chỉ mục | Không áp dụng | Đã yêu cầu lập chỉ mục | 12/10/2026 03:16 | Được thêm vào hàng đợi ưu tiên thu thập dữ liệu |
| 5 | https://www.kienthucdonghoco.vn/co-che/bo-thoat/ | Đã phát hiện thấy – hiện chưa được lập chỉ mục | Google có thể lập chỉ mục | Không áp dụng | Đã yêu cầu lập chỉ mục | 12/10/2026 03:17 | Được thêm vào hàng đợi ưu tiên thu thập dữ liệu |
| 6 | https://www.kienthucdonghoco.vn/co-che/chuyen-dong-co/ | Đã phát hiện thấy – hiện chưa được lập chỉ mục | Google có thể lập chỉ mục | Không áp dụng | Đã yêu cầu lập chỉ mục | 12/10/2026 03:18 | Được thêm vào hàng đợi ưu tiên thu thập dữ liệu |
| 7 | https://www.kienthucdonghoco.vn/lo-trinh-hoc-dong-ho/ | Đã phát hiện thấy – hiện chưa được lập chỉ mục | Google có thể lập chỉ mục | Không áp dụng | Đã yêu cầu lập chỉ mục | 12/10/2026 03:20 | Được thêm vào hàng đợi ưu tiên thu thập dữ liệu |
| 8 | https://www.kienthucdonghoco.vn/huong-dan/chon-dong-ho-dau-tien/ | Đã phát hiện thấy – hiện chưa được lập chỉ mục | Google có thể lập chỉ mục | Không áp dụng | Đã yêu cầu lập chỉ mục | 12/10/2026 03:21 | Được thêm vào hàng đợi ưu tiên thu thập dữ liệu |
| 9 | https://www.kienthucdonghoco.vn/huong-dan/len-day-dong-ho/ | Đã phát hiện thấy – hiện chưa được lập chỉ mục | Google có thể lập chỉ mục | Không áp dụng | Đã yêu cầu lập chỉ mục | 12/10/2026 03:22 | Được thêm vào hàng đợi ưu tiên thu thập dữ liệu |
| 10 | https://www.kienthucdonghoco.vn/huong-dan/muc-chong-nuoc/ | Đã phát hiện thấy – hiện chưa được lập chỉ mục | Google có thể lập chỉ mục | Không áp dụng | Đã yêu cầu lập chỉ mục | 12/10/2026 03:23 | Được thêm vào hàng đợi ưu tiên thu thập dữ liệu |
| 11 | https://www.kienthucdonghoco.vn/co-che/len-day-tu-dong/ | Đã phát hiện thấy – hiện chưa được lập chỉ mục | Google có thể lập chỉ mục | Không áp dụng | Đã yêu cầu lập chỉ mục | 12/10/2026 03:24 | Được thêm vào hàng đợi ưu tiên thu thập dữ liệu |
| 12 | https://www.kienthucdonghoco.vn/co-che/chong-nuoc/ | Google không xác định được URL | Google có thể lập chỉ mục | Không áp dụng | Đã yêu cầu lập chỉ mục | 12/10/2026 03:25 | Được thêm vào hàng đợi ưu tiên thu thập dữ liệu |
| 13 | https://www.kienthucdonghoco.vn/giai-phau/ | Google không xác định được URL | Google có thể lập chỉ mục | Không áp dụng | Chưa được nhận — vượt hạn ngạch | 12/10/2026 03:26 | Google: Đã vượt hạn ngạch; thử gửi lại vào ngày mai |
| 14 | https://www.kienthucdonghoco.vn/thuong-hieu/ | Chưa kiểm tra | Chưa kiểm tra | Chưa kiểm tra | Chưa gửi | — | Dừng theo hạn ngạch tại URL 13 |
| 15 | https://www.kienthucdonghoco.vn/mau-iconic/ | Chưa kiểm tra | Chưa kiểm tra | Chưa kiểm tra | Chưa gửi | — | Dừng theo hạn ngạch tại URL 13 |

Kết cục lượt này: **12/15 yêu cầu được Google nhận; còn URL 13–15 chưa gửi thành công.** Không gửi lại hay thử vượt giới hạn. Bằng chứng ảnh nội bộ: `output/a1-indexing-audit/gpt-co-che-request.jpg` (xác nhận nhận yêu cầu) và `output/a1-indexing-audit/gpt-quota-2026-10-12.jpg` (hạn ngạch). URL chính tắc do Google chọn là dữ liệu trước thao tác; không suy từ canonical HTML khi Search Console ghi Không áp dụng.

**Phán quyết:** hồ sơ đúng tập 15 URL, thao tác đã có bằng chứng trực tiếp; A1 chưa khép vì còn 3 URL. Khi Google cho phép lượt mới, tiếp tục từ URL 13 theo thứ tự 13, 14, 15; kiểm tra trực tiếp lại trước khi yêu cầu, không gửi lại URL 1–12. Bước đo kết quả sau khoảng hai tuần vẫn riêng, không đồng nhất việc nhận yêu cầu với đã lập chỉ mục.

Lưu ý: số "1/354 trang được lập chỉ mục" là quan sát lịch sử ngày 11/10, không phải số liệu hiện hành; không điền "đã yêu cầu/đã lập chỉ mục" suy từ HTTP 200.

## 4. Rà liên kết nội bộ (mức đọc — không tự sửa)

- Trang chủ (`/`) có liên kết tới các trang trung tâm và khối bài nổi bật (đối chiếu ở mức đọc: khối "Bài mới" và menu Kiến thức), gồm `/co-che`, `/lich-su`, `/thuong-hieu`, `/mau-iconic`, `/lo-trinh-hoc-dong-ho` và các bài cơ chế trong `/co-che` — đạt ở mức đọc.
- Các trang trung tâm `/co-che`, `/thuong-hieu`, `/mau-iconic` liệt kê bài con (gồm số 4–6, 11, 12); `/lich-su` là trang trung tâm lịch sử; trang `/huong-dan` (không nằm trong 15) liệt kê bài 8–10.
- Không phát hiện thiếu liên kết nội bộ giữa 15 trang ở mức đọc; nếu GPT thấy cần bổ sung liên kết cụ thể, báo lại để xử theo gói riêng (không tự sửa trong A1).

## 5. Việc chưa thực hiện (LỊCH SỬ lượt 12/10 — trạng thái hiện hành xem mục 8)

- Chưa stage, chưa commit, chưa push (gói docs-only 2 tệp; phạm vi commit do GPT Work chốt khi nghiệm thu).
- GPT đã thao tác Search Console theo mục 3; còn URL 13–15 chờ lượt mới do hạn ngạch hàng ngày. Chưa cho phép commit/push hoặc ghi A1 Hoàn tất tại lượt này.
- Đo lại sau khoảng hai tuần (số trang được lập chỉ mục) là bước riêng, sẽ trình anh khi tới hạn.

## 6. Phụ lục 13/10 — kiểm lại 3 URL còn thiếu trên production

Trước lượt gửi tiếp của GPT Work. Nhật ký thô: `output/a1-indexing-audit/kiem-lai-13-10.txt`. Curl theo redirect (-m 20) trên production hiện hành `a837e66`, ngày 13/10/2026.

| STT | URL | HTTP | Canonical | robots meta | X-Robots-Tag |
|---|---|---|---|---|---|
| 13 | https://www.kienthucdonghoco.vn/giai-phau | 200 | …/giai-phau/ | không có | không có |
| 14 | https://www.kienthucdonghoco.vn/thuong-hieu | 200 | …/thuong-hieu/ | không có | không có |
| 15 | https://www.kienthucdonghoco.vn/mau-iconic | 200 | …/mau-iconic/ | không có | không có |

Ba URL vẫn sạch rào cản lập chỉ mục như lượt kiểm 12/10 (HTTP 200, canonical dấu `/` cuối, không robots meta, không X-Robots-Tag). GPT Work khi có lượt hạn ngạch mới: gửi đúng thứ tự 13, 14, 15, kiểm tra trực tiếp lại trên Search Console trước khi yêu cầu, không gửi lại URL 1–12 (giữ nguyên mục 3).

## 7. Phụ lục 14/10 — lượt GPT Work tiếp URL 13 và điểm dừng reCAPTCHA (theo TXN-20261014-26)

GPT Work thử lại URL 13 `/giai-phau/` lúc 23:16 ngày 14/10: live test báo "Google có thể lập chỉ mục URL này"; khi bấm yêu cầu, Google báo **không thể kết nối dịch vụ reCAPTCHA** — yêu cầu **chưa được nhận** (không tính vào 13→14→15 đã gửi). Chưa gửi 14–15; không gửi lại 1–12.

**Điểm dừng chờ anh Vinh:** khôi phục kết nối reCAPTCHA hoặc thao tác phần xác thực trên phiên Search Console đang giữ (`https://search.google.com/u/2/search-console?resource_id=sc-domain%3Akienthucdonghoco.vn`). Sau khi anh xong: GPT Work tiếp đúng thứ tự **13 → 14 → 15**, kiểm tra trực tiếp lại từng URL trước khi yêu cầu, không gửi lại 1–12, không ghi nhận thành công trước khi Google xác nhận nhận yêu cầu.

Bằng chứng GLM kiểm lại 3 URL trên production ngày 13/10 (mục 6) vẫn hiện hành: 3/3 HTTP 200 + canonical dấu `/` cuối + sạch robots/X-Robots-Tag (`output/a1-indexing-audit/kiem-lai-13-10.txt`).

## 8. Hoàn thành 13→14→15 ngày 15/10 (TXN-20261015-33) — đủ 15/15 địa chỉ (giờ Việt Nam, UTC+7)

Anh Vinh xác thực xong phiên Search Console (xóa lỗi reCAPTCHA) và GPT Work thực hiện ngay, đúng thứ tự và quy tắc (kiểm trực tiếp trước khi yêu cầu; không gửi lại 1–12):

| STT | URL | Trạng thái trước thao tác | Live test đạt lúc | Xác nhận nhận yêu cầu |
|---|---|---|---|---|
| 13 | https://www.kienthucdonghoco.vn/giai-phau/ | Chưa lập chỉ mục — Google không xác định được URL | 06:46:26 | 06:47 |
| 14 | https://www.kienthucdonghoco.vn/thuong-hieu/ | Đã phát hiện thấy — hiện chưa được lập chỉ mục | 06:47:50 | 06:48 |
| 15 | https://www.kienthucdonghoco.vn/mau-iconic/ | Đã phát hiện thấy — hiện chưa được lập chỉ mục | 06:49:10 | 06:50 |

- Cả ba live test: "Google có thể lập chỉ mục URL này"; tìm nạp thành công, được phép thu thập và lập chỉ mục; canonical người dùng khai báo đúng dấu `/` cuối; canonical Google chọn: "Không áp dụng" (trước thao tác) / "Chỉ được xác định sau khi lập chỉ mục" (live test).
- Sau mỗi yêu cầu: "Đã yêu cầu lập chỉ mục" — vào hàng đợi ưu tiên thu thập dữ liệu. **Không phải xác nhận đã được lập chỉ mục** — đo lại bằng báo cáo "Trang" của Search Console sau ~2 tuần là bước riêng.
- Không gửi lại URL 1–12; không gặp lại lỗi reCAPTCHA hay hạn ngạch sau khi làm mới phiên.

**Kết cục A1: đủ 15/15 địa chỉ đợt 1 có yêu cầu được Google nhận** (12 URL ngày 12/10 + 3 URL ngày 15/10). Phần đo kết quả lập chỉ mục thực tế là bước riêng theo tiêu chí nghiệm thu, sẽ trình anh khi tới hạn (~2 tuần từ 15/10).

## 9. Kết luận hiện hành (TXN-20261015-34)

**ĐẠT pha gửi yêu cầu 15/15 URL theo TXN-20261015-34 — chờ đo kết quả khoảng 29/10/2026.** Google nhận cả 15 yêu cầu (12 URL ngày 12/10 + 3 URL ngày 15/10). "Google nhận yêu cầu" không đồng nghĩa "đã lập chỉ mục" — tiêu chí đo lại bằng báo cáo "Trang" của Search Console chưa được miễn; phép đo khoảng 29/10/2026 là việc còn lại của A1, trình riêng khi đến hạn.
