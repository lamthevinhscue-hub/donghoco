# BÁO CÁO RÀ SOÁT REPO (chỉ đọc)

**Ngày:** 2026-08-02
**Mục đích:** Báo cáo hiện trạng repo để Fable 5 rà trước khi giao việc tiếp theo.
**Phạm vi:** Toàn bộ repo `donghoco` (trang https://www.kienthucdonghoco.vn).

---

## Mục 1 — File gốc repo

Cả hai file **đã tồn tại** ở gốc repo:

**`CONTENT-GUIDE.md`** (7073 bytes)
- "Hiến pháp nội dung": quy định giọng văn (nhà sưu tầm, không PR), cấu trúc mẫu cho bài thương hiệu/iconic/cơ chế, danh sách thuật ngữ chuẩn.
- Quy định nguyên tắc biên tập: số liệu phải kiểm chứng, không dùng bội số giá secondary, không để lọt ký tự/từ ngoại lai.
- Có template frontmatter mẫu cho từng loại bài.

**`IMAGE-MANIFEST.md`** (6906 bytes)
- Danh sách ~96 vị trí cần ảnh: thương hiệu (logo + hero), mẫu iconic (hero), timeline (28 mốc), hướng dẫn.
- Phân ưu tiên theo giai đoạn, kèm nguồn ảnh hợp pháp (press page, tự chụp, CC-licensed).
- Ghi rõ constraint bản quyền: logo là trademark, dùng fair-use cho nhận diện.

---

## Mục 2 — Schema 3 content collection

**`thuongHieu`** (thương hiệu)
- `baseFields`: title, custom_slug, excerpt, date, cover_image, draft, tags
- `country` (string, bắt buộc)
- `tier` (enum 7 giá trị: haute horlogerie / ultra luxury / high-end luxury / mid-range luxury / entry-level luxury / consumer / microbrand)
- `founded` (number, tùy chọn)
- `parent_company` (string, tùy chọn)
- `signature_calibres` (mảng string, mặc định rỗng)
- `logo` (string, tùy chọn)
- `lineHistory` (mảng {year, title, detail}) — Khối 2
- `collections` (mảng {name, year?, identity, positioning, iconic_ref?}) — Khối 3
- `segmentComparison` (mảng {brand, slug?, strength, movement, value_retention, philosophy}) — Khối 4
- `collectorNote` (string, tùy chọn) — Khối 4 bổ sung

**`mauIconic`** (mẫu iconic)
- `baseFields`: title, custom_slug, excerpt, date, cover_image, draft, tags
- `brand` (string, bắt buộc)
- `year` (number, tùy chọn)
- `references` (mảng string, tùy chọn)
- `category` (enum 7 giá trị: lặn / chronograph / dress / pilot / gmt / sport-luxury / field, tùy chọn)
- `movement` (string, tùy chọn)
- `power_reserve` (string, tùy chọn)
- `water_resistance` (string, tùy chọn)

**`coChe`** (cơ chế)
- `baseFields`: title, custom_slug, excerpt, date, cover_image, draft, tags
- `category` (enum 4 giá trị: nền tảng / chức năng / cao cấp / bổ trợ)
- `difficulty` (enum 4 giá trị: thấp / trung bình / cao / rất cao)
- `has_infographic` (boolean, mặc định false)
- `interactive` (boolean, mặc định false)

---

## Mục 3 — 24 thương hiệu: đã/chưa đủ 5 khối

**ĐÃ đủ 5 khối (10 trang):**
1. A. Lange & Söhne
2. Audemars Piguet
3. Blancpain
4. Jaeger-LeCoultre
5. Omega
6. Patek Philippe
7. Rolex
8. TAG Heuer
9. Ulysse Nardin
10. Vacheron Constantin

**CHƯA đủ 5 khối (14 trang):**
1. Breguet
2. Cartier
3. F.P. Journe
4. Frédérique Constant
5. Glashütte Original
6. Grand Seiko
7. Greubel Forsey
8. Hamilton
9. IWC
10. Longines
11. Philippe Dufour
12. Seiko
13. Tudor
14. Zenith

*(Khối 5 "mẫu iconic liên quan" được auto-pull theo `brand`, nên không tính vào check frontmatter — 4 trường kiểm tra là lineHistory, collections, segmentComparison, collectorNote.)*

---

## Mục 4 — `/co-che`: 6 bài, chỉ 1 bài có tương tác thật

| Bài | has_infographic | interactive | Component | Tương tác thật? |
|-----|-----------------|-------------|-----------|-----------------|
| **bo-thoat** | true | **true** | Escapement (dùng MechanismAnimation) | **CÓ** — play/pause, tốc độ, từng bước |
| chong-nuoc | true | false | WaterResistance | Chỉ reveal (tĩnh) |
| chong-tu | true | false | AntiMagnetic | Chỉ reveal (tĩnh) |
| chuyen-dong-co | true | false | GearTrain | Chỉ reveal (tĩnh) |
| len-day-tu-dong | true | false | AutomaticWinding | Chỉ reveal (tĩnh) |
| tru-cot | true | false | PowerReserve | Chỉ reveal (tĩnh) |

**Kết luận:** 6/6 bài đều có infographic, nhưng chỉ **1 bài (bo-thoat)** thực sự có hoạt ảnh tương tác (MechanismAnimation với nút play/pause/speed/step). 5 bài còn lại chỉ có hiệu ứng "hiện dần khi cuộn" (Intersection Observer) — về bản chất là tĩnh.

*(Lưu ý: trong `/tu-dien` có thêm 5 infographic tương tác thật: Chronograph, Hairspring, GMT, Perpetual Calendar, Tourbillon — nhưng câu hỏi chỉ hỏi `/co-che`.)*

---

## Mục 5 — Ảnh thật vs placeholder

- **Ảnh thật trong `/public/images/`: 0 file.** Thư mục chỉ chứa 3 file `.gitkeep` (placeholder giữ cấu trúc thư mục) + 1 file `HƯỚNG-DẪN-ẢNH.md` (hướng dẫn, không phải ảnh).
- **Vị trí dùng placeholder (WatchImage):** 3 file component/layout gọi `WatchImage` (WatchExplodedView, BrandLayout, mau-iconic/[slug]).
- Trên thực tế **mọi vị trí ảnh đều đang hiển thị placeholder** vì chưa có file ảnh nào — gồm: ảnh bìa thương hiệu (24), ảnh bìa mẫu iconic (16), ảnh timeline (28 mốc), ảnh hướng dẫn (4) → tổng **~72 vị trí placeholder** theo IMAGE-MANIFEST.md (file ghi ~96 vị trí cần ảnh nhưng một số chưa có component gọi).

---

## Mục 6 — Link 404

**Không phát hiện link 404.** Kiểm tra:
- 18 link `internalLink` trong `timeline.json`: tất cả tồn tại.
- Link markdown `](/...)` trong toàn bộ `.md` + `.json`: tất cả tồn tại.
- File `BROKEN-LINKS.md` (tạo ở đợt rà trước) đã ghi nhận cùng kết luận: 0 link hỏng.

---

## Mục 7 — Tính năng

| Tính năng | Trạng thái | Chi tiết |
|-----------|------------|----------|
| **Tìm kiếm toàn trang** | ❌ CHƯA | Không có Pagefind hay giải pháp search nào. Có `search_placeholder` trong i18n nhưng chỉ là text giả trong Footer, không có input/chức năng thật. |
| **Dark mode** | ❌ CHƯA | Không có toggle dark mode, không có class `dark:` trong Tailwind config, không có theme switcher. |
| **Trang so sánh mẫu iconic** | ❌ CHƯA | Không có trang `/so-sanh` hay `/mau-iconic/so-sanh`. Chỉ có bảng so sánh trong từng trang thương hiệu (segmentComparison). |
| **sitemap.xml** | ❌ CHƯA | Không cài `@astrojs/sitemap`, không có `dist/sitemap.xml`. |
| **Structured data (JSON-LD)** | ❌ CHƯA | Không có `application/ld+json` hay schema.org ở bất kỳ đâu. |
| **Ảnh OG tự sinh** | ❌ CHƯA | Không có `og:image` tĩnh hay tự sinh (satori/vercel/og). |
| **Newsletter** | ⚠️ CÓ giao diện, KHÔNG có backend | Footer có form đăng ký (input email + nút "Đăng ký") nhưng `onsubmit="return false"` — chỉ là demo, không kết nối Mailchimp/ConvertKit/dịch vụ nào. |
| **Analytics** | ❌ CHƯA | Không có Google Analytics, Vercel Analytics, Plausible, Umami hay bất kỳ tracking nào. |

**Tóm tắt:** 8 tính năng — **0 hoàn chỉnh**. Newsletter có nửa vời (UI chỉ). 7 tính năng còn lại chưa bắt đầu.

---

## Phụ lục — Thống kê tổng

- **Tổng số trang build:** 76
- **Thương hiệu:** 24 (10 đủ 5 khối, 14 chưa)
- **Mẫu iconic:** 16
- **Cơ chế:** 6 (1 tương tác thật)
- **Từ điển:** 14 thuật ngữ (5 có infographic tương tác: Chronograph, Hairspring, GMT, Perpetual Calendar, Tourbillon)
- **Hướng dẫn:** 4
- **Trang tính năng:** /lich-su (timeline 28 mốc), /giai-phau (exploded view 12 bộ phận)
- **Ảnh thật:** 0
- **Link 404:** 0
- **Tính năng hoàn chỉnh:** 0/8
