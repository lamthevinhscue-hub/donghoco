# Biên bản nghiệm thu — cụm "Tourbillon & điểm chuông" (Minute Repeater) song ngữ (Prompt 41)

- **Ngày nghiệm thu:** 04/09/2026
- **Phạm vi:** chuẩn hóa nguồn 4 bài tiếng Việt (`coChe/vi/tourbillon.md`, `coChe/vi/diem-chuong.md`, `tuDien/vi/tourbillon.md`, `tuDien/vi/minute-repeater.md`) và xuất bản 4 bài English mới (`coChe/en/tourbillon.md` → `/en/mechanisms/tourbillon/`, `coChe/en/minute-repeater.md` → `/en/mechanisms/minute-repeater/`, `tuDien/en/tourbillon.md` → `/en/glossary/tourbillon/`, `tuDien/en/minute-repeater.md` → `/en/glossary/minute-repeater/`).
- **Tài liệu kèm theo:** hồ sơ nguồn `docs/ho-so-nguon-cum-tourbillon-va-diem-chuong-song-ngu.md` (nguyên văn 3 mục FHH + phạm vi nâng đỡ + claim đã loại).
- **Trạng thái cuối phiên:** **chưa commit, chưa push** — 16 tệp (8 sửa + 8 tạo) chờ anh quyết định.

## 1. Tệp sửa / tạo (16)

**Sửa (8):**
1. `src/content/coChe/vi/tourbillon.md` — viết lại theo nguồn
2. `src/content/coChe/vi/diem-chuong.md` — viết lại theo nguồn
3. `src/content/tuDien/vi/tourbillon.md` — viết lại theo nguồn (category "phức tạp cao cấp" → "phức tạp")
4. `src/content/tuDien/vi/minute-repeater.md` — viết lại theo nguồn (category đổi như trên, `interactive` đổi thành false)
5. `src/i18n/contentRoutes.ts` — +4 cặp (55 → 59 cặp)
6. `scripts/check-english-launch.mjs` — REQUIRED_EN 52 → 56
7. `package.json` — `check:high-complications` vào cuối `npm run check` + alias riêng
8. `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` — cập nhật lần 20

**Tạo (8):**
- `src/content/coChe/en/tourbillon.md`
- `src/content/coChe/en/minute-repeater.md`
- `src/content/tuDien/en/tourbillon.md`
- `src/content/tuDien/en/minute-repeater.md`
- `scripts/check-high-complications-cluster.mjs`
- `docs/ho-so-nguon-cum-tourbillon-va-diem-chuong-song-ngu.md`
- `docs/nghiem-thu/2026-09-04_nghiem-thu-cum-tourbillon-va-diem-chuong-song-ngu.md` (biên bản này)

Cùng `src/data/glossary-terms.json` — sinh lại tự động bởi `generate-glossary-terms.mjs` khi build (khác biệt 2 dòng: mục tourbillon/minute-repeater theo excerpt mới) — đã giữ thay đổi; **tổng 16 tệp**.

Không đụng `output/`, không đụng các tệp `??` cũ của docs tháng 8, không sửa URL cũ/component/CSS/schema/infographic.

## 2. Nguồn (xác minh 04/09/2026, nguyên văn tại hồ sơ nguồn — đều là mục FHH trực tiếp)

| Mục FHH | Nâng được |
|---|---|
| Tourbillon | Do Abraham-Louis Breguet nghĩ ra và **đăng ký sáng chế 1801**; bù sai số do trọng lực ở **vị trí thẳng đứng**; bộ thoát trong **lồng xoay**, bánh lắc ở tâm; lồng **thông thường quay một vòng mỗi phút**; phạm vi lịch sử là **đồng hồ bỏ túi**; lever hoặc detent escapement; karussel = phương án thay thế đơn giản/chắc chắn hơn (lồng dẫn từ bánh thứ ba) |
| Repeater | Điểm giờ **theo yêu cầu** qua **pushpiece hoặc slide**; minute repeater (chỉ định số phút) xuất hiện **đầu thế kỷ 18 (1700–1710)**, phần lớn **miền nam nước Đức**, Thomas Mudge được ghi nhận truyền thống ~1750; **grande sonnerie** (tự điểm giờ+quý tại mỗi quý) vs **petite sonnerie** (không lặp giờ tại mỗi quý); cần gạt **"all or nothing"/"silent"**; "passing strike" = tự động |
| Complication | Mọi chức năng ngoài giờ/phút/giây — khung thuật ngữ cho cả hai |

Nguồn bị loại so với bài cũ: FHH glossary tổng + FHH library "Watch complications"; Patek Philippe "The Patek Philippe Sound" (không còn claim nào cần nguồn hãng).

## 3. Claim cũ đã loại (chi tiết tại hồ sơ nguồn, mục 2)

- **Tourbillon:** "đẹp và đắt nhất/đỉnh cao chế tác", "trung bình về 0/tự bù hoàn toàn" + phép ví đĩa cân, "1 vòng/24 giây", hiệu quả trên đồng hồ đeo tay, titan/nhôm/70 chi tiết/0,001 g/lắp thủ công hàng tuần, Flying/Double/Triple Axis (Greubel, Gyrotourbillon), "tourbillon dân chủ hóa" Trung Quốc, link /lich-su + Breguet thương hiệu.
- **Điểm chuông/minute repeater:** "danh giá nhất ngang tourbillon/khó chế tạo nhất/đắt nhất", búa/gong (hai-ba gong)/thanh cuộn quanh bộ máy/gắn thanh tay nghề/vỏ cộng hưởng, quy ước đọc giờ qua tiếng (3 giờ 34/3 giờ 37 phút), "gõ cả đêm/công tắc tắt tiếng" (giữ đúng "silent slide" theo FHH), "trước khi có điện/quý tộc thế kỷ 18-19/tuyên ngôn chế tác/vài hãng mỗi năm vài chục chiếc", "mỗi chiếc kêu khác nhau/nghe thử/chỉnh tai từng chiếc/listening room", Robert Robin 1750, Patek/F.P. Journe/Lange/Vacheron trong thân bài, bảng so sánh Alarm/Repeater/Grand Sonnerie, cần gạt bên trái/dress watch, 100+ linh kiện.
- Giữ đúng phạm vi nguồn (cùng câu có "FHH"): Breguet 1801; một vòng mỗi phút; bù sai số vị trí thẳng đứng của đồng hồ bỏ túi; lever/detent; karussel; 1700–1710 miền nam nước Đức; Mudge ~1750; grande/petite sonnerie; silent slide.

## 4. Liên kết nội bộ hai chiều (đúng ngôn ngữ)

- vi tourbillon (cơ chế) ↔ tourbillon (từ điển), day-toc-banh-lac, bo-thoat, chuyen-dong-co
- vi diem-chuong (cơ chế) ↔ tourbillon (cơ chế), minute-repeater (từ điển), chuyen-dong-co
- vi tourbillon (từ điển) ↔ tourbillon (cơ chế); vi minute-repeater (từ điển) ↔ diem-chuong, tourbillon
- EN tourbillon (cơ chế) ↔ /en/glossary/tourbillon/, /en/glossary/hairspring/, /en/mechanisms/escapement/, /en/mechanisms/minute-repeater/
- EN minute-repeater (cơ chế) ↔ /en/mechanisms/tourbillon/, /en/glossary/minute-repeater/, /en/mechanisms/how-a-mechanical-watch-works/
- EN tourbillon + minute-repeater (từ điển) ↔ bài cơ chế tương ứng và nhau
- 4 relation Việt trung tính (script R6 kiểm); không relatedModels English; không link vòng về chính bài.

## 5. Kết quả lệnh nghiệm thu (kết quả thật, theo thứ tự đề mục 8)

1. **`npm run check:high-complications`** (`node scripts/check-high-complications-cluster.mjs`) — ĐẠT: 4 bài vi + 4 bài en; 4 cặp route; 21 liên kết bắt buộc có và đích tồn tại; R4 sạch; R5 sạch; R6: 4 relation Việt trung tính; hồ sơ + biên bản tồn tại. *(Vòng sửa: 12 lỗi attribution thật — các câu/bullet "một vòng mỗi phút", "thế kỷ 18 (1700–1710)", "passing strike", "Grande/Petite sonnerie", "karussel" thiếu FHH cùng dòng; 1 từ cấm trong câu phủ định blockquote ("buying advice"); va chạm pattern "thế kỷ 18" với mốc có nguồn → chuyển vào cửa sổ FHH cùng dòng; bổ sung pattern "giá tham khảo". Test tiêm lỗi thật: chèn "Patek… 360… 60 giây, giá tham khảo + link vi" vào bài EN → script bắt đúng R5 (360, Patek) → khôi phục từ bản sao → ĐẠT.)*
2. **`npm run check`** — ĐẠT toàn bộ 11 cụm (cụm tourbillon & điểm chuông chạy cuối chuỗi).
3. **`npm run build`** — ĐẠT: **282 trang**, Pagefind index 282 trang, "OK: Không phát hiện link nội bộ hỏng", check 3D + timeline ĐẠT.
4. **`node scripts/check-english-launch.mjs`** (sau build) — ĐẠT: **đủ 56 route bắt buộc trong dist** (từ 52), 60 trang EN đúng lang/canonical/hreflang/switcher, 222 trang VI giữ canonical đúng URL.
5. **`node scripts/check-links.mjs`** (sau build) — OK: quét **282 trang HTML, 19.560 link**, không link hỏng.
6. **`node scripts/check-evolution-routes.mjs`** (sau build) — ĐẠT.
7. **Sitemap (đếm từ `dist/sitemap-0.xml` sau build):** 281 URL tổng, trong đó **60 URL `/en/`**.
8. **`git diff --check`** — sạch (exit 0).
9. **`git status --short`** — 14 tệp P40 đã được anh commit (`12d01b3`); working tree hiện chỉ còn tệp của P41 (mục 1) + `??` cũ của docs tháng 8 không đụng.

## 6. Chưa kiểm tra (giới hạn trung thực)

- Chưa nghiệm thu thủ công trên trình duyệt (desktop/mobile), bàn phím thật, trình đọc màn hình thật cho 4 route EN mới — bộ kiểm ở trên là kiểm tĩnh mã nguồn + HTML build.
- Chưa có dữ liệu Search Console/Analytics; cụm là nội dung theo nguồn, không cam kết hiệu quả SEO.

## 7. Xác nhận

**Chưa tự commit, chưa tự push.** Toàn bộ 16 tệp P41 chờ anh xem và commit.
