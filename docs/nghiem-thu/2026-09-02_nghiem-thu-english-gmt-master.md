# Biên bản nghiệm thu — GMT-Master tiếng Anh + timeline song ngữ (Prompt 32)

- Ngày: 02/09/2026
- Chế độ quy ước i18n: **B (Bilingual content)** + **C (Shared feature)**
- Commit nền: `477163a` — *feat(i18n): add bilingual Submariner evolution timeline* (các tệp theo dõi của Prompt 31 đã commit; các tài liệu cũ chưa theo dõi nằm ngoài phạm vi)
- Trạng thái cuối: **CHỜ COMMIT** — không commit, không push

## 1. Tệp đã sửa/thêm (10 tệp thuộc gói Prompt 32: 8 tệp mã/nội dung + 2 tài liệu)

| Tệp | Thay đổi |
|-----|----------|
| `src/content/mauIconic/en/rolex-gmt-master.md` | **Mới** — bài English thật: frontmatter hợp schema (title/excerpt/custom_slug/brand/year/category/date/updated/sources), `custom_slug: "rolex-gmt-master"`; nội dung dịch cấu trúc bài Việt (origins, design signatures, GMT vs GMT-Master II, milestones, telling the versions apart, place in history); thuật ngữ chuẩn (GMT hand, 24-hour bezel, independently adjustable local hour hand, Bakelite bezel insert, calibre); 2 nguồn giữ nguyên URL HTTPS; `relatedModels/relatedMechanisms` để trống (nhãn quan hệ tiếng Việt chưa dịch) — liên kết nội bộ qua markdown chỉ trỏ `/en/iconic-watches/rolex-submariner/` (route tồn tại). Không ảnh mới — xử lý ảnh theo cách dự án hiện có. |
| `src/i18n/contentRoutes.ts` | Thêm đúng 1 cặp: `/mau-iconic/rolex-gmt-master` ↔ `/en/iconic-watches/rolex-gmt-master/` — switcher, hreflang, canonical, footer dùng cơ chế hiện có, không mapping rải rác. |
| `src/data/rolexGmtMasterEvolution.ts` | 8 mốc chuyển sang `LocalizedText {vi,en}` (title/intro/label/change/note); `publishedLangs: ['vi','en']`; year/reference số, sourceUrl, sourceName giữ nguyên — không thêm/bớt mốc; mốc 2005 có `reference` mô tả thế hệ (không phải số) chuyển thành DisplayText vi/en. Không dùng biệt danh sưu tầm (giữ quy tắc cũ). |
| `src/data/modelEvolution.ts` | `reference` mở kiểu thành `DisplayText` (số reference vẫn string — chỉ mốc mô-tả thế hệ cần song ngữ); chú thích cập nhật. |
| `src/components/ModelEvolution.astro` | Render `reference` qua `text()` (nút mốc + thẻ chi tiết + aria-label) — một component dùng chung, không tạo bản thứ hai. |
| `scripts/check-english-launch.mjs` | Thêm `/en/iconic-watches/rolex-gmt-master/` vào `REQUIRED_EN` (số kỳ vọng tự đếm từ mảng — không magic number). |
| `scripts/check-evolution-data.mjs` | Parser chấp nhận `reference` DisplayText; kiểm vi/en rỗng + EN không ký tự tiếng Việt cho reference mô tả. Giữ nguyên toàn bộ kiểm Prompt 31. |
| `scripts/check-evolution-routes.mjs` | Viết lại thành kiểm **generic theo `publishedLangs`**: quét mọi dataset, với dataset có `en` kiểm route VI+EN tồn tại, render `data-evolution`, nhãn "Xem nguồn"/"View source", khối EN không ký tự tiếng Việt, số nút mốc hai ngôn ngữ bằng nhau và đúng số mốc parse từ dataset (không magic number). Dataset chỉ `publishedLangs: ['vi']` là **trạng thái hợp lệ**: script vẫn kiểm route Việt có render timeline, rồi **bỏ qua kiểm timeline English** — không kết luận gì về việc route English của bài có tồn tại hay không. Dataset có `en` mới bắt buộc kiểm cả route Việt/Anh và timeline song ngữ. |

Không đụng: bài Việt GMT-Master, Submariner (dữ liệu/hiển thị), SubmarinerEvolution, cặp route cũ, canonical/hreflang cơ chế.

## 2. Hai URL GMT-Master

- Việt: `/mau-iconic/rolex-gmt-master/`
- English: `/en/iconic-watches/rolex-gmt-master/`

## 3. Timeline 8 mốc hai ngôn ngữ

Cả VI và EN render đủ **8/8 mốc** (6542 · 1675 · 16760 · 16710 · kỷ niệm 50 năm/50th anniversary · 116710BLNR · 116719BLRO · 126710BLRO); `year`/`sourceUrl`/`sourceName` giữ nguyên tuyệt đối; bản EN diễn đạt đúng dữ kiện VI, không làm mạnh, không dùng biệt danh sưu tầm. Hai nhãn hiển thị của mốc 2005 trong dataset: VI "GMT-Master II kỷ niệm 50 năm (bản vàng)" — EN "GMT-Master II 50th anniversary (gold)".

## 4. Kết quả từng lệnh (chạy lần lượt, nguyên văn tóm lược)

1. `npm run check` — không có dòng LỖI/KHÔNG ĐẠT (toàn bộ ĐẠT).
2. `npm run build` — `250 page(s) built` (+1 trang GMT EN); `Đã quét 250 trang HTML, 17386 link` (0 hỏng); kết thúc bằng `KẾT LUẬN: ĐẠT — mọi dataset song ngữ render đúng route, ngôn ngữ và số mốc.`
3. `node scripts/check-english-launch.mjs` — `KẾT LUẬN: ĐẠT — English launch pack đúng kiến trúc đa ngôn ngữ.` (đủ 24 route bắt buộc, giờ gồm GMT EN).
4. `node scripts/check-evolution-data.mjs` — `Rolex GMT-Master: 8 mốc · xuất bản: vi+en / Rolex Submariner: 8 mốc · xuất bản: vi+en` (exit 0).
5. `node scripts/check-evolution-routes.mjs` — `rolex-gmt-master (vi+en, 8 mốc): VI 8 · EN 8 — khớp dataset / rolex-submariner (vi+en, 8 mốc): VI 8 · EN 8 — khớp dataset / KẾT LUẬN: ĐẠT`.
6. `git diff --check` — sạch.
7. `git status --short` — đúng 8 tệp mã/nội dung và 2 tài liệu thuộc Prompt 32; các tài liệu `??` cũ và `output/` ngoài phạm vi.

Trong quá trình chạy, `check-evolution-routes` (trong build) bắt đúng một lỗi thật: mốc 2005 có `reference` mô tả tiếng Việt lọt vào timeline EN — xử lý bằng cách mở `reference` thành `DisplayText` (số reference không đổi cách xử lý), build lại qua.

## 5. Checklist cần kiểm thủ công trên preview/deploy

Các việc cần kiểm bằng thao tác thật trong trình duyệt — **tất cả chưa kiểm thủ công**:

| # | Việc cần kiểm | Trạng thái |
|---|---------------|-----------|
| 1 | Desktop: timeline Việt/Anh hiển thị và chuyển mốc đúng | CHƯA kiểm thủ công |
| 2 | Keyboard: Tab, Enter, Space và không có focus trap | CHƯA kiểm thủ công |
| 3 | Mobile 375px: không tràn ngang, nội dung đọc được | CHƯA kiểm thủ công |
| 4 | Dark mode | CHƯA kiểm thủ công |
| 5 | Reduced motion | CHƯA kiểm thủ công |
| 6 | Language switcher hai chiều | CHƯA kiểm thủ công |
| 7 | Production sau deploy | CHƯA kiểm thủ công |
| 8 | Trình đọc màn hình | CHƯA kiểm thủ công |

**Đã xác minh tự động sau build (phạm vi kiểm HTML tĩnh — không phải thao tác thật trong trình duyệt):**

- `check-evolution-routes.mjs`: route Việt/Anh tồn tại, timeline render `data-evolution`, nhãn nguồn theo ngôn ngữ, khối timeline EN không có ký tự tiếng Việt, số nút mốc hai ngôn ngữ khớp dataset.
- `check-english-launch.mjs`: canonical, hreflang, `og:locale`, JSON-LD `inLanguage`, language switcher và link nội bộ `/en/` đều tồn tại/đúng cấu trúc.

## 6. Xác nhận

- Không đổi URL/slug tiếng Việt, bài Việt GMT-Master, Submariner (dữ liệu + hiển thị).
- Không hreflang mới thủ công — cặp GMT đi qua cơ chế `getAlternates` hiện có vì route đã thêm vào bảng trung tâm.
- Không component timeline thứ hai, không copy CSS/JS, không thư viện mới.
- **Chưa commit, chưa push.**

## 7. Phân biệt tệp Prompt 32 khi stage

Tổng cộng **10 tệp thuộc gói Prompt 32** (8 tệp mã/nội dung + 2 tài liệu) — stage từng tên:

```
scripts/check-english-launch.mjs
scripts/check-evolution-data.mjs
scripts/check-evolution-routes.mjs
src/components/ModelEvolution.astro
src/content/mauIconic/en/rolex-gmt-master.md   (mới)
src/data/modelEvolution.ts
src/data/rolexGmtMasterEvolution.ts
src/i18n/contentRoutes.ts
docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md
docs/nghiem-thu/2026-09-02_nghiem-thu-english-gmt-master.md
```

Ngoài phạm vi Prompt 32 — KHÔNG stage: `output/` và toàn bộ tài liệu `??` cũ từ trước (không thuộc gói này).
