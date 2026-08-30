# Báo cáo nghiệm thu — Chuẩn hóa thứ tự A–Z cho thư viện thương hiệu và mẫu iconic

- **Ngày nghiệm thu:** 30/08/2026
- **Phạm vi:** ba trang thư viện (`/thuong-hieu`, `/thuong-hieu/[slug]`, `/mau-iconic`). Không đụng hàm sắp xếp dùng chung trong `src/lib/content.ts`, không đổi tier/slug/nội dung, không đổi khối thương hiệu nổi bật ở trang chủ.
- **Kết luận: ĐẠT.**

## 1. Các file đã sửa

| File | Thay đổi |
|---|---|
| `src/pages/thuong-hieu/index.astro` | Thêm bộ so sánh `Intl.Collator` + sắp A–Z `items` trong TỪNG nhóm phân khúc (trang thương hiệu) |
| `src/pages/thuong-hieu/[slug].astro` | Sắp A–Z khối "Mẫu iconic của …" theo tên mẫu; sắp A–Z danh sách hãng cùng phân khúc TRƯỚC khi cắt 3 mục |
| `src/pages/mau-iconic/index.astro` | Sắp A–Z danh sách mẫu iconic theo tiêu đề hiển thị (bản sao mảng) |

## 2. Cách sắp xếp được áp dụng

- `new Intl.Collator(lang === 'vi' ? 'vi' : 'en', { sensitivity: 'accent', numeric: true })` — so sánh theo ngôn ngữ `vi`, không phân biệt hoa/thường (vẫn giữ phân biệt dấu tiếng Việt), hỗ trợ số trong tên (`numeric` — VD "Seagull 1963" xếp tự nhiên trước "Seagull 1963M").
- **Bản sao mảng trước khi sort:** ở trang thương hiệu, `items` là kết quả `entries.filter(...)` — bản là mảng mới, sort trên đó không đụng mảng cache gốc từ `getEntriesByLang`; ở trang mẫu iconic dùng tường minh `[...entries].sort(...)`.
- Thứ tự nút lọc không đổi: `categories`/`decades` vẫn tính từ mảng gốc TRƯỚC khi sắp danh sách hiển thị.
- Bộ lọc chạy client-side bằng ẩn/hiện DOM (không re-render từ dữ liệu) nên thứ tự A–Z lúc build được giữ nguyên khi lọc.
- Hàm `getEntriesByLang` dùng chung **không bị sửa** — các collection khác (từ điển, cơ chế, hướng dẫn, lịch sử) không ảnh hưởng.

## 3. Xác nhận giữ nguyên phân cấp thương hiệu

- Sáu nhóm phân khúc giữ nguyên thứ tự theo `TIER_ORDER`: Haute Horlogerie (9) → Ultra Luxury (10) → Cao cấp (25) → Tầm trung (17) → Entry-Level Luxury (8) → Consumer (4) — tổng 73 hãng.
- Chế độ "Tất cả" vẫn hiển thị đủ 6 nhóm (không phẳng hóa); A–Z áp dụng TRONG từng nhóm. Vì vậy khi bấm "Tất cả", toàn trang không phải một danh sách A–Z toàn cục — đúng thiết kế phân cấp.
- Tier/slug/tiêu đề/metadata của không một thương hiệu nào bị đổi (git diff chỉ gồm 3 trang nằm trong phạm vi).

## 4. Kết quả các lệnh kiểm tra

- `npm run check` — ĐẠT toàn bộ.
- `npm run build` — 218 trang, Complete!, 14.234 link nội bộ, 0 link hỏng.
- `git diff --check` — sạch.
- Prompt 10 gồm 3 file mã nguồn đã sửa và 1 báo cáo nghiệm thu mới. Các file docs/output chưa theo dõi khác đã tồn tại từ trước, ngoài phạm vi Prompt 10 và tuyệt đối không được đưa vào commit.
- Đã kiểm tra trực tiếp trên bản xem trước cục bộ; không phát hiện lỗi console mới.

## 5. Ví dụ thứ tự A–Z thực tế

**Trang `/thuong-hieu`** — Nhóm Xa xỉ đỉnh cao: `A. Lange & Söhne` → `Arnold & Son` → `Audemars Piguet` → `Breguet` … → `Vacheron Constantin`. Nhóm Haute Horlogerie: `De Bethune` → `F.P. Journe` → `Greubel Forsey` → `Hajime Asaoka` … → `Voutilainen`. Cả 6 nhóm đều đạt phép kiểm A–Z.

**Bấm lần lượt 7 nút lọc** (Tất cả + 6 phân khúc): mỗi phân khúc hiển thị đúng 1 nhóm, số thẻ khớp nhãn nút (9/10/25/17/8/4), danh sách còn lại A–Z đúng, hash URL cập nhật đúng (`#tier=haute-horlogerie`, `#tier=high-end-luxury`…), nút đang chọn `aria-pressed="true"` đúng.

**Trang `/mau-iconic`** — 66 mẫu, mặc định A–Z; ba mẫu đầu: `A. Lange & Söhne Lange 1 — Tuyên ngôn tái sinh` → `Arnold & Son Perpetual Moon — …` → `Audemars Piguet Royal Oak — …`. 66/66 thẻ có liên kết đúng. Lọc thể loại Sport-luxury: còn **7 mẫu**, đúng A–Z — ví dụ `Audemars Piguet Royal Oak …` → `…` → `Vacheron Constantin Overseas …`. Lọc riêng thập niên 1950s: **7 mẫu**, từ `Blancpain Fifty Fathoms …` đến `Universal Genève Polerouter …`, đúng A–Z. Nút đặt lại về đủ 66 mẫu.

**Trang thương hiệu** `/thuong-hieu/patek-philippe/` — khối "⑸ Mẫu iconic của Patek Philippe" hiển thị đúng 1 mẫu với liên kết `/mau-iconic/patek-nautilus` hoạt động.

## 6. Điểm ghi minh bạch

- **Không có thương hiệu nào hiện có từ hai mẫu iconic trở lên** (mỗi hãng đúng 1 mẫu trong 66 mẫu) — phép kiểm "trang có ≥2 mẫu xếp A–Z" vì vậy không khả thi; code sắp A–Z khối này vẫn được áp dụng và sẽ phát huy khi dữ liệu thêm mẫu mới. Khối "mẫu iconic" trên trang Patek Philippe được kiểm ở trạng thái 1 mẫu + liên kết đúng.
- **Khối "hãng cùng phân khúc"** chỉ render khi một hãng CHƯA có mẫu iconic nào — với dữ liệu hiện tại khối này không xuất hiện trên trang nào. Code đã sắp A–Z trước khi cắt 3 mục; sẽ có hiệu lực khi có hãng mới chưa có mẫu.
- Thẻ mẫu iconic trên `/mau-iconic` không dùng ảnh (thiết kế chữ nguyên bản, không phải mất ảnh do thay đổi này) — 66/66 liên kết nguyên vẹn, không chồng lấn.

## 7. Xác nhận

**Không commit, không push, không git reset/clean.** Đứng sau commit `f12c44e` (Zenith cao cấp) và chờ anh kiểm tra độc lập.
