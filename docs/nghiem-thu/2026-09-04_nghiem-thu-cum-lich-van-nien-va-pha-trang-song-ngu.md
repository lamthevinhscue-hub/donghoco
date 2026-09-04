# Biên bản nghiệm thu — cụm "Lịch vạn niên & pha trăng" (perpetual calendar & moon phase) song ngữ (Prompt 40)

- **Ngày nghiệm thu:** 04/09/2026
- **Phạm vi:** chuẩn hóa nguồn 3 bài tiếng Việt (`coChe/vi/perpetual-calendar.md`, `coChe/vi/pha-trang.md`, `tuDien/vi/perpetual-calendar.md`) và xuất bản 3 bài English mới (`coChe/en/perpetual-calendar.md` → `/en/mechanisms/perpetual-calendar/`, `coChe/en/moon-phase.md` → `/en/mechanisms/moon-phase/`, `tuDien/en/perpetual-calendar.md` → `/en/glossary/perpetual-calendar/`).
- **Tài liệu kèm theo:** hồ sơ nguồn `docs/ho-so-nguon-cum-lich-van-nien-va-pha-trang-song-ngu.md` (nguyên văn 4 mục FHH + phạm vi nâng đỡ + claim đã loại).
- **Trạng thái cuối phiên:** **chưa commit, chưa push** — 14 tệp (8 sửa + 6 tạo) chờ anh quyết định.

## 1. Tệp sửa / tạo (14)

**Sửa (8):**
1. `src/content/coChe/vi/perpetual-calendar.md` — viết lại theo nguồn
2. `src/content/coChe/vi/pha-trang.md` — viết lại theo nguồn
3. `src/content/tuDien/vi/perpetual-calendar.md` — viết lại theo nguồn (category đổi "phức tạp cao cấp" → "phức tạp")
4. `src/i18n/contentRoutes.ts` — +3 cặp (52 → 55 cặp)
5. `scripts/check-english-launch.mjs` — REQUIRED_EN 49 → 52
6. `package.json` — `check:calendar-complications` vào cuối `npm run check` + alias riêng
7. `src/data/glossary-terms.json` — sinh lại tự động bởi `generate-glossary-terms.mjs` khi build (khác biệt 1 dòng: mục perpetual-calendar theo excerpt mới) — đã giữ thay đổi
8. `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` — cập nhật lần 19

**Tạo (6):**
- `src/content/coChe/en/perpetual-calendar.md`
- `src/content/coChe/en/moon-phase.md`
- `src/content/tuDien/en/perpetual-calendar.md`
- `scripts/check-calendar-complications-cluster.mjs`
- `docs/ho-so-nguon-cum-lich-van-nien-va-pha-trang-song-ngu.md`
- `docs/nghiem-thu/2026-09-04_nghiem-thu-cum-lich-van-nien-va-pha-trang-song-ngu.md` (biên bản này)

Không đụng `output/`, không đụng các tệp `??` cũ của docs tháng 8, không sửa URL cũ/component/CSS/schema.

## 2. Nguồn (xác minh 04/09/2026, nguyên văn tại hồ sơ nguồn — đều là mục FHH trực tiếp)

| Mục FHH | Nâng được |
|---|---|
| Perpetual calendar | Tính đến đặc thù lịch Gregory; tự chỉnh tháng 30 ngày + tháng 2 28/29 ngày; trí nhớ cơ học lặp chuỗi **mỗi 48 tháng** theo chu kỳ nhuận; chỉ cần chỉnh cho các năm không-nhuận ngoại lệ — kế tiếp **2100 và 2400** |
| Annual Calendar | Lịch tự tính các tháng dưới 31 ngày nhưng **không tính năm nhuận**; **phải chỉnh một lần mỗi năm** — dùng phân biệt, không xếp hạng |
| Moon phases | Cơ cấu + hiển thị các pha trăng; một lunation dài **29 ngày 12 giờ 44 phút 2,8 giây**; chia **bốn pha**: new moon/first quarter/full moon/last quarter |
| Complication | Mọi chức năng ngoài giờ/phút/giây — khung thuật ngữ cho cả hai phức tạp |

Nguồn bị loại so với bài cũ: FHH glossary tổng + FHH library "Watch complications" (trang tổng/library, thay bằng mục trực tiếp); COSC (không dùng).

## 3. Claim cũ đã loại (chi tiết tại hồ sơ nguồn, mục 2)

- **Perpetual calendar:** "đắt nhất/tầng cao/ultra luxury/haute horlogerie", bảng 3 cấp lịch + cột giá tham khảo, "mãi mãi/không cần chỉnh/1 lần 100 năm", bánh cam 4 bậc xoay 90°/năm + cam 48 tháng 48 răng + chu trình 5 bước, Mudge 1762, Patek Philippe 1925 Thomas Packard, 482 năm/chu kỳ 400 năm, mục "Nhận biết" 3–4 sub-dials + leap indicator, relation gán bố cục/chức năng cho mẫu; link /lich-su, /thuong-hieu/patek-philippe.
- **Moon phase:** đĩa 2 mặt trăng, bánh 59 răng, 1 nấc/ngày, 29,5/29,53 ngày, sai 1 ngày sau 2 năm 7 tháng, bánh 135 răng sai sau trăm năm, lịch sử thế kỷ 16–17 + nông dân/thủy thủ/triều cường, "được yêu thích nhất/đẹp/lãng mạn/dress watch", cửa sổ vòm vị trí 6 giờ + 2 kiểu hiển thị, relation "một ngày sau 122 năm" của hãng.
- Giữ đúng phạm vi nguồn: 48 tháng, 2100, 2400, 29 ngày 12 giờ 44 phút 2,8 giây, bốn pha — tất cả cùng câu có "FHH".

## 4. Liên kết nội bộ hai chiều (đúng ngôn ngữ)

- vi perpetual (cơ chế) ↔ perpetual (từ điển), pha-trang, hien-thi-ngay, chuyen-dong-co
- vi pha-trang ↔ perpetual (cơ chế), hien-thi-ngay, chuyen-dong-co
- vi perpetual (từ điển) ↔ perpetual (cơ chế), pha-trang
- EN perpetual (cơ chế) ↔ /en/glossary/perpetual-calendar/, /en/mechanisms/moon-phase/, /en/glossary/movement/
- EN moon-phase ↔ /en/mechanisms/perpetual-calendar/, /en/mechanisms/how-a-mechanical-watch-works/, /en/glossary/movement/
- EN perpetual (từ điển) ↔ /en/mechanisms/perpetual-calendar/, /en/mechanisms/moon-phase/
- 3 relation Việt còn lại trung tính (do script R6 kiểm); không relatedModels English; không link vòng về chính bài.

## 5. Kết quả lệnh nghiệm thu (kết quả thật, theo thứ tự đề mục 8)

1. **`node scripts/check-calendar-complications-cluster.mjs`** — ĐẠT: 3 bài vi + 3 bài en; 3 cặp route; 17 liên kết bắt buộc có và đích tồn tại; R4 sạch; R5 sạch; R6: 3 relation Việt trung tính; hồ sơ + biên bản tồn tại. *(Vòng sửa: 2 lỗi thật — câu "48 tháng" và bullet "bốn pha/four phases" thiếu attribution FHH cùng dòng, heading EN chứa "four phases"; 2 false-positive pattern — chữ "Haute Horlogerie" trong tên tổ chức và regex relation thiếu indent. Test tiêm lỗi thật: chèn "Patek Philippe 1925, 59 răng, giá tham khảo + link vi" vào bài EN → script bắt đúng 3 lỗi R5 tại dòng 16 → khôi phục từ bản sao → ĐẠT. Vòng sửa biên tập thứ hai: đổi thuật ngữ pha trăng "quăng đầu/quăng cuối" thành "trăng thượng huyền/trăng hạ huyền" (bài vi + hồ sơ nguồn); script bổ sung R5 cấm "quăng" trên 6 bài và R6b bắt buộc 2 thuật ngữ "trăng thượng huyền (first quarter)" / "trăng hạ huyền (last quarter)" trong bài pha trăng Việt — kiểm tiêm lại: script bắt cả R5 lẫn R6b → khôi phục → ĐẠT.)*
2. **`npm run check`** — ĐẠT toàn bộ 10 cụm (cụm lịch vạn niên & pha trăng chạy cuối chuỗi).
3. **`npm run build`** — ĐẠT: **278 trang**, Pagefind index 278 trang, "OK: Không phát hiện link nội bộ hỏng", check 3D + timeline ĐẠT.
4. **`node scripts/check-english-launch.mjs`** (sau build) — ĐẠT: **đủ 52 route bắt buộc trong dist** (từ 49), 56 trang EN đúng lang/canonical/hreflang/switcher, 222 trang VI giữ canonical đúng URL.
5. **`node scripts/check-links.mjs`** (sau build) — OK: quét **278 trang HTML, 19.396 link**, không link hỏng.
6. **`node scripts/check-evolution-routes.mjs`** (sau build) — ĐẠT.
7. **Sitemap (đếm từ `dist/sitemap-0.xml` sau build):** 277 URL tổng, trong đó **56 URL `/en/`**.
8. **`git diff --check`** — sạch (exit 0).
9. **`git status --short`** — 13 tệp P39 đã được anh commit (`d0c1f52`); working tree hiện chỉ còn 14 tệp của P40 (mục 1) + `??` cũ của docs tháng 8 không đụng.

## 6. Chưa kiểm tra (giới hạn trung thực)

- Chưa nghiệm thu thủ công trên trình duyệt (desktop/mobile), bàn phím thật, trình đọc màn hình thật cho 3 route EN mới — bộ kiểm ở trên là kiểm tĩnh mã nguồn + HTML build.
- Chưa có dữ liệu Search Console/Analytics; cụm là nội dung theo nguồn, không cam kết hiệu quả SEO.

## 7. Xác nhận

**Chưa tự commit, chưa tự push.** Toàn bộ 14 tệp P40 chờ anh xem và commit.
