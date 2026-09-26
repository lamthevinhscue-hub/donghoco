# Biên bản U2 — hồ sơ nguồn đợt 1 loạt "Hiểu đúng"

- Giao dịch: TXN-20260926-243 (danh mục DHC-GD3-20260925 v1.0.0) — hồ sơ nguồn, ngày thực hiện 2026-09-26.
- Nền: xác nhận trước khi làm — HEAD = origin/main = `2e5820b`, staged 0, tracked sửa 0 (git log -5: 2e5820b → 4ba159c); untracked có trước giữ nguyên.

## Phạm vi thực hiện

- Chỉ tạo 2 tệp tài liệu: `docs/ho-so-nguon-U2-hieu-dung-dot-1-2026-09-26.md` + biên bản này; công cụ tự kiểm, log, bằng chứng tại `output/u2-myths-source-audit/`.
- KHÔNG đụng `src/`, `public/`, `scripts/`, `package.json`, `vercel.json`, `src/i18n/`, schema, route, giao diện; KHÔNG tạo bài VI/EN, không thẻ `hieu-dung`, không đổi hub `/hieu-dung` hoặc `/en/myths/`; không giá/đầu tư/hàng xách tay/thuế/nhập khẩu; không mở gói khác.

## Kết quả 5 chủ đề

- **4 SẴN SÀNG (chủ đề 1, 2, 3, 5) — 1 CẦN THU HẸP (chủ đề 4 Kính sapphire)** — 0 GỘP — 0 CHƯA ĐỦ NGUỒN. Không ép đủ năm mục.
- Chủ đề 4 CẦN THU HẸP vì: nửa "chống trầy" có nguồn chính hãng (Seiko "resistant to scratches"), nhưng nửa "có thể vỡ/mép" (cốt lõi để phản myth "không vỡ") và Mohs 9 chưa có câu nguyên văn nào từ nguồn trong phạm vi được phép — nâng SẴN SÀNG khi tìm được nguồn đó.

## Nguồn và giới hạn chính (chi tiết trong hồ sơ)

- Chủ đề 1: FHH jewels (15–21 jewels cho máy chất lượng) + FHH stone (đá tổng hợp, giảm ma sát) + Incabloc stones-sapphires/shock-absorbers/bushings (giảm ma sát, oil sump giữ dầu) — 5 URL.
- Chủ đề 2: Omega FAQ (không đeo vài ngày → power reserve giảm → lên dây tay; khuyến nghị watch winder gắn hãng) + Seiko 8R46 (~45 giờ; không đeo thì lên dây đủ mỗi ngày) + Seiko 5R65 (đeo 12 giờ/ngày × 3–5 ngày) + FHH crown/barrel/automatic/rotor — 7 URL.
- Chủ đề 3: Oris ("Swiss watch movements can magnetise, affecting accuracy"; 2.250 gauss vượt ISO 764) + METAS (Master Chronometer, N001 ngưỡng 1,5 T = 15.000 G) + Omega FAQ (nguồn từ sinh hoạt: loa, tủ lạnh, kẹp túi/ốp máy tính bảng — KHÔNG có "điện thoại") + FHH anti-magnetic — 4 URL.
- Chủ đề 5: Seiko bảng 3BAR (chỉ × cột "Accidental Splashes and Contact with Rain") + ISO 22810:2010 catalogue/abstract (rà soát 2021, còn hiện hành) + Omega FAQ (gioăng/va đập) — 3 URL.
- **Mâu thuẫn nguồn bắt buộc ghi trung thực**: Omega FAQ viết "water resistant to 30 metres can be worn for swimming at depths of up to 30 metres" — NGƯỢC tiền đề phổ biến và khác bảng Seiko 3BAR; hồ sơ cấm trích Omega cho mệnh đề "30 m không được bơi" và yêu cầu bài viết trình bày mệnh đề từng hãng kèm đúng nguồn.
- URL đề sai đã xác minh: `iso.org/standard/34536.html` thực chất là ISO/TS 10303-25:2005 (tự động hóa công nghiệp), KHÔNG phải ISO 764 — đưa vào không-làm-nguồn; nội dung ISO 764 không trích.

## Điểm trùng bài cũ (chỉ dẫn lại, không lặp)

- Chủ đề 1: `/tu-dien/chan-kinh/` (định nghĩa), `/co-che/chong-soc/` (cơ chế chống sốc), `/co-che/bo-may-in-house/`.
- Chủ đề 2: `/huong-dan/len-day-dong-ho/` (thủ tục), `/huong-dan/hop-xoay-dong-ho/` (hộp xoay), `/co-che/len-day-tu-dong/` (rotor).
- Chủ đề 3: `/co-che/chong-tu/` (cơ chế + chuẩn), `/huong-dan/do-sai-so/` (theo dõi sai số).
- Chủ đề 4: `/co-che/kinh-dong-ho/` (ba loại kính), `/huong-dan/chon-dong-ho-dau-tien/`.
- Chủ đề 5: `/huong-dan/muc-chong-nuoc/` (bảng mức), `/co-che/chong-nuoc/` (cơ chế gioăng).
- Cả 11 route đề + 1 route đọc thêm đều tồn tại trong dist (đã kiểm).

## Lý do không chạy `npm run check` / `npm run build`

U2 chỉ tạo hồ sơ/bằng chứng — không đụng `src/`, `public/`, `scripts/`, `package.json` — check/build không phản ánh thay đổi tài liệu trong `docs/`.

## Kiểm tra đã chạy

- Checker `output/u2-myths-source-audit/kiem-u2.mjs` — kết quả trong `kiem-u2.log.txt`: đủ 5 chủ đề + trạng thái; tổng cứng 4 SẴN SÀNG / 1 CẦN THU HẸP / 0 / 0; R2c mỗi chủ đề SẴN SÀNG ≥2 URL nguồn trong khối; 22 URL khớp 2 danh sách (19 nguồn HTTPS + 3 không-làm-nguồn, kiểm cứng R3d); truy cập lại 19 URL nguồn (2xx, hoặc đúng ngoại lệ allowlist hẹp theo từng URL + mã + bằng chứng ghi trong hồ sơ; lỗi mạng/timeout ngoài allowlist luôn FAIL); 12 route nội bộ tồn tại trong dist; bảng chống trùng 5 dòng + đồng bộ trạng thái với chi tiết; 2 tệp docs UTF-8 no BOM + newline cuối.
- Mutation ngoài repo (bản sao `D:/u2-mut`): bỏ URL nguồn khỏi chủ đề 1 SẴN SÀNG (bỏ 4, còn 1 — ngưỡng R2c là ≥2) → checker phải fail đúng `M1 chỉ có 1 URL nguồn trong khối`; hoàn nguyên byte-đối-byte (SHA-256 khớp) rồi chạy lại đạt — log `kiem-u2-mutation.log.txt`.
- `node scripts/scan-chars.mjs`, `git diff --check`, `git diff --cached --check` — kết quả ghi dưới (báo cáo).

## Trạng thái Git cuối vòng

- 2 tệp docs mới (untracked) + `output/u2-myths-source-audit/` (nội bộ, không commit); tracked sửa 0; staged 0; chưa commit, chưa push — DỪNG chờ GPT Work nghiệm thu.
