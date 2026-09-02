# Biên bản nghiệm thu — English launch pack (Prompt 30)

- Ngày: 02/09/2026
- Commit nền: `e8a2ff5` — trạng thái trước khi triển khai English launch pack.
- Trạng thái cuối: **CHỜ COMMIT** — không commit, không push.

## 1. Route `/en/` đã tạo (27 trang, build thật 249 trang tổng)

| Nhóm | Route |
|------|-------|
| Trang chủ + tĩnh | `/en/`, `/en/about/`, `/en/accessibility/`, `/en/contact/`, `/en/copyright/`, `/en/learning-path/` |
| Danh sách | `/en/brands/`, `/en/iconic-watches/`, `/en/mechanisms/`, `/en/glossary/`, `/en/guides/` |
| Bài chi tiết | 16 route — xem bảng bài bên dưới |

## 2. Bài tiếng Anh đã viết (16)

- **Guides**: `first-mechanical-watch` (khung quyết định — cùng chuẩn biên tập với bản vi: không tư vấn đầu tư, không "best").
- **Mechanisms**: `how-a-mechanical-watch-works`, `power-reserve`, `escapement`.
- **Glossary**: `movement`, `calibre`, `escapement` (bánh thoát), `hairspring`, `rotor`, `power-reserve`.
- **Brands**: `rolex`, `omega`, `seiko`.
- **Iconic Watches**: `rolex-submariner`, `omega-speedmaster`, `cartier-tank`.

Mỗi bài: `custom_slug` tiếng Anh, `title/excerpt/sources` đầy đủ (nguồn giữ nguyên URL từ bài vi, nhãn dịch), thuật ngữ horology chuẩn (mainspring, gear train, escapement, balance wheel, hairspring, rotor, power reserve), không dịch sát chữ, không khẳng định đầu tư/giá/"best". Phần tương tác nhãn tiếng Việt (infographic, DecisionMap, công cụ cầm tay, sơ đồ tiến hóa) **ẩn ở bản EN** theo đề — không hiển thị UI nửa dịch.

## 3. Mapping slug và chuyển ngôn ngữ

- **`src/i18n/contentRoutes.ts` (mới)** — nguồn sự thật duy nhất: `STATIC_PAIRS` + `INDEX_PAIRS` + `ARTICLE_PAIRS` (27 cặp vi↔en). Hàm: `englishPathFor`, `vietnamesePathFor`, `localizedHref(path, lang)` (undefined khi chưa dịch — nơi gọi không tự thêm `/en`), `switcherTarget(pathname)` (có cặp → trang dịch; không → trang chủ đích + cờ `translated` cho aria-label), `getAlternates` (hreflang; không có cặp thì không sinh), `collectionHref(collection, slug, lang)`.
- **`getSlug()` nâng cấp** (`src/lib/content.ts`): ưu tiên frontmatter `custom_slug`, không có thì tên file. Không file tiếng Việt nào có `custom_slug` (đã kiểm grep trên nền) → **mọi URL tiếng Việt giữ nguyên** (check-english-launch đối chiếu canonical 222 trang VI).
- Route EN là **wrapper mỏng** (`src/pages/en/{brands,iconic-watches,mechanisms,glossary,guides}/[slug].astro`) render **template dùng chung** (`src/components/templates/{Brand,Mechanism,Term,Guide,Iconic}Article.astro`); wrapper vi (`/co-che/[slug]` v.v.) cũng gọi đúng template đó — một thân trang, hai route, không copy song song. `EnCollectionIndex.astro` dùng chung cho 5 trang danh sách EN.

## 4. Navigation, giao diện

- **Header**: bộ chuyển ngôn ngữ là link thật (desktop + mục cuối menu mobile), `hreflang` attr, aria-label khi trang chưa dịch ("…trang này chưa có bản dịch; bạn sẽ tới trang chủ tiếng Anh"). Menu EN lọc theo bản dịch — cụm Khám phá (History/Anatomy/Compare) tự ẩn ở EN (đề cho phép đặt ngoài menu).
- **Footer**: links lọc theo bản dịch; 2 chỗ hard-code tiếng Việt (ghi chú bản tin, "Điều khoản bản quyền") chuyển sang i18n/ternary theo ngôn ngữ.
- **Nhãn EN**: wordmark `Mechanical Watch Knowledge`, tagline theo đề; menu EN đúng 12 nhãn đề yêu cầu.
- **searchCore**: `pagefind.search(q, { filters: { language: currentLang } })`; BaseLayout gắn `data-pagefind-filter="language"` trên mọi trang; `sectionOf` nhận diện route EN.

## 5. SEO quốc tế

- `<html lang>` theo URL (đã có sẵn cơ chế — xác nhận 27/27 trang EN).
- `og:locale` động `vi_VN`/`en_US`; JSON-LD WebSite + Article `inLanguage` động `vi-VN`/`en`; ngày hiển thị theo locale.
- Canonical là URL đúng ngôn ngữ (script đối chiếu 249 trang).
- `hreflang vi`/`en`/`x-default` chỉ khi cặp tồn tại thật (từ `getAlternates`); x-default trỏ bản VI.
- Sitemap: 27 URL `/en/` được đưa vào qua `customPages` sinh từ bảng routes (integration bỏ qua route i18n non-default do `pathname` undefined lúc hook — đã ghi trong astro.config comment). Không redirect tự động theo ngôn ngữ — switcher là link người dùng chủ động click.

## 6. Kiểm tra — kết quả nguyên văn

**`npm run check`** — toàn bộ ĐẠT (không dòng LỖI/KHÔNG ĐẠT). 1 script cũ chỉnh theo hướng đa ngôn ngữ, không giảm độ nghiêm ngặt: `check-content-accessibility.mjs` chấp nhận `ariaLabel` dạng biến (nhãn theo ngôn ngữ file) thay vì literal tiếng Việt — vẫn bắt buộc thuộc tính tồn tại.

**`npm run build`** — `249 page(s) built`; mọi script trong chuỗi ĐẠT; `check-links`: `OK: Không phát hiện link nội bộ hỏng. Đã quét 249 trang HTML, 17292 link.`

**`node scripts/check-english-launch.mjs`** — ĐẠT:
```
Đủ 23 route English launch pack trong dist
43 link nội bộ /en/... unique — tất cả tồn tại trong dist
27 trang EN đều có <html lang="en">
Canonical + og:locale (en_US) + inLanguage (en) đúng trên 27 trang EN
222 trang VI giữ canonical đúng URL (không đổi URL tiếng Việt)
Không còn văn bản tiếng Việt trong Header/Footer/title/H1/CTA của trang EN (trừ tên riêng cho phép)
Mọi hreflang (vi/en/x-default) đều trỏ tới trang tồn tại thật
Bộ chuyển ngôn ngữ: mọi link đều trỏ tới trang tồn tại
Pagefind: trang EN gắn filter language=en; mã tìm kiếm lọc theo ngôn ngữ trang
KẾT LUẬN: ĐẠT
```
(Lần chạy đầu script bắt đúng 3 lỗi thật — Footer render chưa dùng href đã lọc; ArticleLayout/Breadcrumb/Card cộng tiền tố `/en` hai lần — đã sửa và build lại.)

**Kiểm thử giao diện sau triển khai:** cần thực hiện riêng trên production hoặc preview có trình duyệt ổn định, gồm desktop/mobile, dark mode, bộ chuyển ngôn ngữ và kết quả Pagefind thực tế. Biên bản này chỉ ghi nhận các kiểm tra tự động đọc từ build; không coi các quan sát trình duyệt chưa tái lập được là bằng chứng nghiệm thu.

## 7. Chưa dịch — giữ ngoài trải nghiệm English

- **History** (`/lich-su`), **Anatomy** (`/giai-phau`), **Compare** (`/so-sanh`): ẩn khỏi menu EN, không hreflang, không link.
- Toàn bộ bài vi chưa có cặp trong `contentRoutes.ts`: switcher về trang chủ EN kèm aria giải thích; sitemap chỉ chứa route đã xuất bản.
- Infographic/công cụ tương tác (nhãn vi), sơ đồ tiến hóa, DecisionMap: chỉ render tiếng Việt.
- Featured/brand-groups/timeline trên trang chủ EN: chỉ gồm nội dung EN thật (3 iconic, 3 hãng), không khối rỗng.

## 8. Trạng thái Git

18 tệp sửa + các tệp mới (`scripts/check-english-launch.mjs`, `src/i18n/contentRoutes.ts`, `src/components/templates/` (6), `src/content/*/en/` (16), `src/pages/en/` (12)). Gợi ý stage khi anh commit: từng đường dẫn trên; `output/` và docs `??` cũ của anh giữ nguyên. **Lưu ý**: working tree đang chứa cả gói Prompt 29 (4 bài + care cluster) CHỜ COMMIT — anh có thể commit hai gói riêng biệt hoặc chung, stage từng tên tệp.
