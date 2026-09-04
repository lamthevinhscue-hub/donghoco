# Biên bản nghiệm thu — cụm "Bộ điều chỉnh nhịp & bộ thoát" song ngữ (Prompt 39)

- **Ngày nghiệm thu:** 04/09/2026
- **Phạm vi:** chuẩn hóa nguồn 5 bài tiếng Việt (`coChe/vi/bo-thoat.md`, `coChe/vi/day-toc-banh-lac.md`, `tuDien/vi/banh-thoat.md`, `tuDien/vi/day-toc-banh-lac.md`, `tuDien/vi/vph.md`); rà lại 2 bài English có sẵn (`coChe/en/escapement.md`, `tuDien/en/hairspring.md`); xuất bản 3 bài English mới (`coChe/en/balance-and-hairspring.md` → `/en/mechanisms/balance-and-hairspring/`, `tuDien/en/escape-wheel.md` → `/en/glossary/escape-wheel/`, `tuDien/en/beat-rate.md` → `/en/glossary/beat-rate/`).
- **Tài liệu kèm theo:** hồ sơ nguồn `docs/ho-so-nguon-cum-bo-dieu-chinh-nhip-song-ngu.md` (nguyên văn 5 mục FHH + phạm vi nâng đỡ + claim đã loại).
- **Trạng thái cuối phiên:** **chưa commit, chưa push** — 19 tệp (13 sửa + 6 tạo) chờ anh quyết định; 5 tệp Prompt 37 đã khôi phục nguyên vẹn tại HEAD.

## 1. Tệp sửa / tạo

**Sửa (13):**
1. `src/content/coChe/vi/bo-thoat.md` — viết lại theo nguồn
2. `src/content/coChe/vi/day-toc-banh-lac.md` — viết lại theo nguồn
3. `src/content/tuDien/vi/banh-thoat.md` — viết lại theo nguồn
4. `src/content/tuDien/vi/day-toc-banh-lac.md` — viết lại theo nguồn
5. `src/content/tuDien/vi/vph.md` — viết lại theo nguồn
6. `src/content/coChe/en/escapement.md` — viết lại theo nguồn + thêm `interactive: false`
7. `src/content/tuDien/en/hairspring.md` — viết lại theo nguồn + thêm `interactive: false`
8. `src/i18n/contentRoutes.ts` — thay cặp sai của `/tu-dien/banh-thoat` (trỏ `/en/glossary/escapement/` từ launch pack) thành `/en/glossary/escape-wheel/` + thêm 2 cặp mới; `/en/glossary/escapement/` **không tạo cặp thứ hai** — nó là route tương thích
9. `scripts/check-english-launch.mjs` — thêm 3 route mới của cụm + giữ lại `/en/glossary/escapement/` (46 → 49)
10. `package.json` — `check:regulating` vào cuối `npm run check` + alias riêng
11. `src/data/glossary-terms.json` — sinh lại tự động bởi `generate-glossary-terms.mjs` khi build
12. `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` — cập nhật lần 18
13. `src/content/tuDien/en/escapement.md` — **viết lại thành trang tương thích**: giữ URL cũ tránh 404, thay toàn bộ nội dung cũ có claim không nguồn bằng trang ngắn trung tính có 2 nguồn FHH, trỏ rõ về bài hiện hành `/en/glossary/escape-wheel/`; không claim kỹ thuật mới, không bảng, không số, không lịch sử, không hãng, không vật liệu

**Tạo (6):**
- `src/content/coChe/en/balance-and-hairspring.md`
- `src/content/tuDien/en/escape-wheel.md`
- `src/content/tuDien/en/beat-rate.md`
- `scripts/check-regulating-cluster.mjs` (có R7: kiểm route legacy tạo HTML sau build và trỏ tới route hiện hành)
- `docs/ho-so-nguon-cum-bo-dieu-chinh-nhip-song-ngu.md`
- `docs/nghiem-thu/2026-09-04_nghiem-thu-cum-bo-dieu-chinh-nhip-song-ngu.md` (biên bản này)

**Ngoài phạm vi — giữ nguyên vẹn tại HEAD (5 tệp, đã `git restore --source=HEAD`):**
`scripts/check-protection-cluster.mjs`, `src/content/coChe/en/anti-magnetism.md`, `src/content/coChe/en/shock-protection.md`, `src/content/tuDien/en/incabloc.md`, `src/content/tuDien/en/calibre.md` — **không còn diff nào** ở 5 tệp này; các link `/en/glossary/escapement/` của chúng hợp lệ trở lại nhờ trang tương thích được khôi phục.

Không đụng `output/`, không đụng các tệp `??` cũ của docs tháng 8.

## 2. Nguồn (xác minh 04/09/2026, nguyên văn tại hồ sơ nguồn — đều là mục FHH trực tiếp)

| Mục FHH | Nâng được |
|---|---|
| Escapement | Cơ cấu giữa chuỗi bánh răng và bộ điều tiết; chặn-nhả định kỳ + cấp năng lượng cho bánh lắc; 3 nhóm (recoil/dead-beat/detached); lever "by far the most common today" (trích có attribution) |
| Assortiment | Bộ thoát gồm 3 phần: escape-wheel, lever, roller |
| Balance | Bánh lắc dao động quanh trục; + dây tóc = regulating organ; chia thời gian thành các phần bằng nhau nghiêm ngặt; 1 oscillation = 2 vibrations; "tick-tock" |
| Balance spring | Lò xo rất mảnh, "heart" của đồng hồ cơ (trích); hai đầu gắn balance + balance-cock; đàn hồi → dao động đều; chiều dài dây tóc + moment quán tính bánh lắc quyết định thời lượng; thay đổi chiều dài để điều tiết |
| Frequency | Số dao động/giây đo bằng Hertz; trích nguyên văn "The higher the frequency, the more accurate the watch: 21,600 vph (3 Hz), 28,800 vph (4 Hz), 36,000 vph (5 Hz)" — chỉ dùng kèm attribution FHH, không bảng, không hãng |

Nguồn bị loại so với bài cũ: FHH glossary tổng (trang tổng), COSC trong vph.md (không nói về tần số).

## 3. Claim cũ đã loại (chi tiết tại hồ sơ nguồn, mục 2)

- **bo-thoat / escapement:** "phát minh quan trọng nhất", 28.800/36.000 vph + Rolex/Omega/Grand Seiko, Mudge ~1755, "hơn 250 năm chưa gì thay thế", Omega Co-Axial (Daniels 1999), Ulysse Nardin Freak (2001, silicon), chu trình 5 bước chi tiết, Mohs 9/10, Verneuil 1902, 17–21–30 jewels, cảm nhận âm thanh theo hãng (Rolex trầm/Tudor giòn/Spring Drive/Co-Axial).
- **day-toc-banh-lac (cơ chế) / balance-and-hairspring:** Glucydur/màu đỏ, so sánh con lắc, bảng tần số + "cao hơn hao dầu/service sớm", Invar/Elinvar/Nivarox/silicon/Silinvar/Si14 + Patek/Rolex/Omega, Breguet overcoil 1795, Huygens 1657–1675, "350 năm", link /lich-su.
- **banh-thoat / escape-wheel:** "15 răng hình móc", "nguồn của tiếng tíc tắc" như chắc chắn, "xung lực yếu → chạy sai", "khó chế tạo nhất, hãng cao cấp cải tiến nhiều nhất".
- **day-toc-banh-lac (từ điển) / hairspring:** mục "Nhận biết" (màu, caseback, tai), Glucydur, "chu kỳ cố định do tính chất vật lý" → sửa theo FHH, "không có chúng không đo được thời gian".
- **vph / beat-rate:** bảng 18.000/21.600/28.800/36.000 + Zenith El Primero + "tiêu chuẩn cao cấp", "kim mượt hơn/ma sát hao mòn/bảo dưỡng thường hơn", công thức 1 Hz = 7.200 vph, nguồn COSC.

## 4. Liên kết nội bộ hai chiều (đúng ngôn ngữ)

- escapement ↔ hairspring/balance ↔ escape wheel ↔ beat rate, kèm movement/how-a-mechanical-watch-works/power-reserve/chuỗi truyền động — 31 link bắt buộc do script cụm kiểm (vi + en), không link vòng về chính bài.
- Không relatedModels English; relation vi (freak, laurent-ferrier) viết lại trung tính.

## 5. Kết quả lệnh nghiệm thu (kết quả thật, theo thứ tự đề mục 7 của đề sửa)

1. **`git diff --check`** — sạch (exit 0).
2. **`node scripts/check-protection-cluster.mjs`** (bản nguyên vẹn tại HEAD) — ĐẠT: các link `/en/glossary/escapement/` của 3 bài P37 hợp lệ trở lại nhờ trang tương thích được khôi phục.
3. **`node scripts/check-regulating-cluster.mjs`** — ĐẠT: 5 bài vi + 6 bài en (5 nội dung + 1 legacy); 3 cặp route; 32 liên kết bắt buộc có và đích tồn tại (gồm legacy trỏ tới `/en/glossary/escape-wheel/`); R4 sạch; R5 sạch; **R7: route legacy `/en/glossary/escapement/` tạo HTML sau build và trang trỏ tới `/en/glossary/escape-wheel/`**. *(Vòng sửa trước đó: sai map đích how-a-mechanical-watch-works → sửa thành coChe/en. Test tiêm lỗi thật: chèn dòng chứa "Rolex… 28.800 vph (4 Hz)" và một markdown link vi vào beat-rate.md → script bắt đúng R5 (Rolex, 28.800) + R4 (link vi) tại dòng 24 → khôi phục từ bản sao → ĐẠT.)*
4. **`npm run check`** — ĐẠT toàn bộ 9 cụm.
5. **`npm run build`** — ĐẠT: **275 trang**, Pagefind index 275 trang, "OK: Không phát hiện link nội bộ hỏng", check 3D + timeline ĐẠT; `dist/en/glossary/escapement/index.html` được tạo thật và chứa `href="/en/glossary/escape-wheel/"`.
6. **`node scripts/check-english-launch.mjs`** (sau build) — ĐẠT: **đủ 49 route bắt buộc trong dist** (gồm cả route legacy), 53 trang EN đúng lang/canonical/hreflang/switcher, 222 trang VI giữ canonical đúng URL.
7. **`node scripts/check-links.mjs`** (sau build) — OK: quét **275 trang HTML, 19.233 link**, không link hỏng.
8. **`node scripts/check-evolution-routes.mjs`** (sau build) — ĐẠT.
9. **Sitemap (đếm từ `dist/sitemap-0.xml` sau build):** 274 URL tổng, trong đó **53 URL `/en/`**.
10. **`git diff --check`** — sạch; **`git status --short`** — 19 tệp P39 (mục 1); 5 tệp Prompt 37 không còn diff; `??` cũ của docs tháng 8 không đụng.

**Số liệu sau sửa, khớp đề sửa:** **52 cặp vi↔en**; **53 trang English**; **275 trang HTML tổng**; sitemap 274 URL gồm 53 URL `/en/`. `/en/glossary/escapement/` là **route tương thích** được giữ để tránh 404 cho liên kết/bookmark đã công bố trước đây; `/en/glossary/escape-wheel/` là **route hiện hành** của cặp Việt–Anh (`/tu-dien/banh-thoat` ↔ `/en/glossary/escape-wheel/`).

## 6. Chưa kiểm tra (giới hạn trung thực)

- Chưa nghiệm thu thủ công trên trình duyệt (desktop/mobile), bàn phím thật, trình đọc màn hình thật cho 3 route EN mới — bộ kiểm ở trên là kiểm tĩnh mã nguồn + HTML build.
- Chưa có dữ liệu Search Console/Analytics; cụm là nội dung theo nguồn, không cam kết hiệu quả SEO.

## 7. Xác nhận

**Chưa tự commit, chưa tự push.** Toàn bộ 19 tệp P39 chờ anh xem và commit.
