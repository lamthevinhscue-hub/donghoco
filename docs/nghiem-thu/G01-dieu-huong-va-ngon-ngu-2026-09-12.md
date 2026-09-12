# G01 — Điều hướng và chuyển ngôn ngữ rõ ràng

- Giao dịch: TXN-20260912-02 · Danh mục DHC-NEXT-20260912 v1.0.0
- Thực hiện: GLM thực thi · Ngày: 12/09/2026 · Nền: `4129437` (nhánh `main`)
- Trạng thái: **đã thực hiện xong và tự kiểm trong phạm vi báo cáo; chưa commit, chưa push, chưa deploy. Dừng chờ GPT Work nghiệm thu độc lập. Chưa chuyển G02.**

## 1. Git trước/sau

- HEAD trước khi làm: `412943708778b1a761468e543076933fc3a68db5` (main, trùng origin/main theo đối chiếu đầu phiên). HEAD sau khi làm: **không đổi** — không commit.
- Tracked modifications (7 tệp, đúng phạm vi tệp chính của prompt): `package.json`, `src/components/Footer.astro`, `src/components/Header.astro`, `src/components/SearchBox.astro`, `src/components/SearchInline.astro`, `src/i18n/contentRoutes.ts`, `src/i18n/ui.ts`.
- Untracked có trước (docs/, AGENTS.md, kế hoạch…) giữ nguyên, không đưa vào danh sách tệp của G01.
- Tệp mới thuộc gói: `scripts/check-g01-navigation.mjs`, `docs/nghiem-thu/G01-dieu-huong-va-ngon-ngu-2026-09-12.md`, thư mục `output/g01-navigation-i18n/` (39 tệp — mục 8).
- `git diff --check`: sạch (exit 0).

## 2. Tệp tạo/sửa và lý do

| Tệp | Thao tác | Lý do |
| --- | --- | --- |
| `src/i18n/contentRoutes.ts` | sửa | Khóa gốc của bug ánh xạ: bảng băm tạo khóa bằng `replace(/\/$/, '')` (trang chủ thành `""`) trong khi tra cứu chuẩn hóa `"/"` → cặp trang chủ mất; thêm `isEnglishPath` kiểm ranh giới segment |
| `src/components/Header.astro` | sửa | Sửa active/aria-current; đổi breakpoint desktop menu md→lg; cụm Khám phá EN theo D2; hộp thoại "chưa có bản dịch"; chú thích noscript |
| `src/components/SearchInline.astro` | sửa | Đồng bộ ô tìm kiếm trực tiếp với breakpoint mới (lg) và nhường bề rộng cho logo ở 1024px |
| `src/components/SearchBox.astro` | sửa | Nút mở dialog đổi từ `sm:hidden` sang `lg:hidden` — hai chế độ tìm kiếm không cùng chiếm chỗ, không cùng biến mất |
| `src/components/Footer.astro` | sửa | Hệ quả trực tiếp của helper mới: link logo + mục "Home" footer đi qua `localizedHref('/')` → EN nhận `/en/` (route thật) thay vì `/en` thiếu slash; import bỏ `localizedPath` không còn dùng |
| `src/i18n/ui.ts` | sửa | Khóa nhãn mới: `nav_vi_only`, `lang_panel_title/desc/stay/go_home`, `lang_noscript_note` (cả vi + en) |
| `scripts/check-g01-navigation.mjs` | tạo | Bộ kiểm G01: gọi thẳng logic `contentRoutes.ts` (transpile bằng esbuild có sẵn) + kiểm đầu ra HTML trong dist |
| `package.json` | sửa | Thêm lệnh `check:g01`; nối `check-g01-navigation.mjs` vào cuối chuỗi `build` (sau `astro build` — script cần dist; không đụng `check`, không đổi dependency) |

Không sửa BaseLayout: helper `getAlternates` sửa xong là đủ — BaseLayout đã render vi/en/x-default khi `alternates.en` tồn tại. Không sửa ThemeToggle (không cần). Không đụng vercel.json/CSP/dependency/lockfile.

## 3. Nguyên nhân gốc và cách sửa bốn nhóm vấn đề

### 3.1 Trang chủ bị đánh dấu đang chọn trên mọi trang
Nguyên nhân: `isActive('/')` dùng `currentPath.startsWith(path.endsWith('/') ? path : path + '/')` — với path `/` thì nhánh đầu cho `'/'` và mọi pathname đều `startsWith('/')`.
Cách sửa: chuẩn hóa pathname (bỏ mọi slash cuối, `""` → `"/"`) dùng chung cho trang hiện tại và mục menu; so khớp **chính xác** hoặc theo ranh giới segment (`target + "/"`); Trang chủ xử lý riêng so chính xác với `homeHref` của ngôn ngữ hiện hành → Home VI chỉ active tại `/`, Home EN tại `/en` và `/en/`. Trang 404 (`/404.html`) không khớp mục nào.

### 3.2 Ánh xạ trang chủ VI–EN sai
Nguyên nhân: hai quy ước chuẩn hóa lệch nhau trong cùng tệp — `byVi`/`byEn` tạo khóa `p.vi.replace(/\/$/, '')` (trang chủ → khóa `""`), còn `norm()` tra cứu trả `"/"` → `englishPathFor('/')` trả `undefined` dù cặp `{ vi: '/', en: '/en/' }` có trong bảng. Hệ quả: hreflang trang chủ VI mất hẳn (một chiều), switcher trang chủ VI báo "chưa dịch" dù có bản dịch, footer EN mất mục Home.
Cách sửa: một hàm `norm` duy nhất (bỏ slash cuối, `""` → `"/"`) dùng cho **cả lúc tạo map và lúc tra cứu**. Các hàm xác định khu vực EN (`switcherTarget`, `getAlternates`) dùng `isEnglishPath` mới: chỉ `/en` và `/en/...` là EN — `/english`, `/en-other` không bị nhầm. `getAlternates('/en')` chuẩn hóa về `/en/` để không khai báo hreflang trỏ URL không tồn tại. Trang chưa dịch vẫn trả `en: undefined` — không hreflang giả.

### 3.3 Header co/chồng ở tablet
Nguyên nhân: desktop menu bật từ `md` (768px) trong khi từ 640px đã có ô tìm kiếm trực tiếp (w-52 = 208px) — ở 768–1023px tổng bề rộng vượt hàng, logo `min-w-0` bị ép co, nội dung chèn lên nhau.
Cách sửa: chọn **breakpoint desktop menu = lg (1024px)** theo nội dung thực tế của hàng header; dưới lg dùng menu hamburger (đã có đầy đủ các mục + cụm Khám phá). Ô tìm kiếm trực tiếp chuyển sang `hidden … lg:block`, nút mở dialog chuyển sang `lg:hidden` — đúng một chế độ hiện tại mọi bề rộng. Đo lại hai lỗi tràn logo trang EN (mục 5.4) và xử lý bằng chữ logo EN hạ `text-xs` dưới 340px + padding hàng `px-2` dưới 340px, ô tìm kiếm `w-48 xl:w-64` — không dùng overflow-hidden/clip/ellipsis.

### 3.4 Mất nhóm Khám phá / bị đưa về trang chủ khi đổi ngôn ngữ
Nguyên nhân: cụm Khám phá chỉ render khi `exploreNav.length > 0`, mà `localizedHref` trả `undefined` cho 3 route `/lich-su`, `/giai-phau`, `/so-sanh` ở EN → cụm biến mất hoàn toàn trên menu EN; switcher trang chưa dịch đi thẳng trang chủ đích chỉ nói bằng aria-label.
Cách sửa theo **D2 đã duyệt**: mục chưa dịch vẫn hiện trên menu EN, trỏ thẳng route tiếng Việt, kèm **nhãn hiển thị** "Vietnamese only" (badge viền, cả dropdown desktop và menu mobile) + `hreflang="vi"`; accessible name tự nhiên gồm chữ "Vietnamese only". Không thêm vào bảng cặp, không tạo hreflang/URL giả. Switcher trang chưa dịch: link thật giữ nguyên href (không-JS vẫn đi được), JS chặn mặc định và mở **hộp thoại nhỏ** (role="dialog", aria-labelledby) với lời giải thích + hai lựa chọn: "Ở lại trang tiếng Việt" và "Đi tới trang chủ tiếng Anh" — không rời trang trước khi chọn. Áp dụng cho cả switcher header lẫn switcher trong menu mobile; mở panel từ menu mobile sẽ đóng menu trước (không hai lớp tương tác cùng mở).

## 4. Quyết định triển khai

- **Breakpoint: lg (1024px)** — bảng thêm/sửa: desktop nav `hidden lg:flex`; `#mobile-menu` + `#menu-toggle` `lg:hidden`; SearchInline `hidden w-48 lg:block xl:w-64`; SearchBox `lg:hidden` (icon-only, bỏ chữ placeholder + kbd `/` chỉ có nghĩa khi nút hiện ở desktop cũ). Sát breakpoint đo 1010/1024/1038 (mục 5.5).
- **Active/aria-current**: `page` = link đúng trang (gạch brass + `font-semibold`); `location` = mục danh sách cha chứa trang (gạch brass, `font-medium`); nút nhóm xổ chỉ đổi màu chữ, **không gạch, không aria-current**; mục dropdown active gạch bằng `underline decoration-2`; mobile active = brass + `font-semibold` + gạch dưới chữ, khác rõ viền phân cách (viền nhạt full-width mờ `border-cream-dark/60`, chỉ báo là chữ brass đậm có gạch). Không bỏ focus outline. Không gắn aria-current cho nút mở dropdown (kiểm toàn dist: 0 nút xổ mang aria-current).
- **D2**: Explore EN = 3 link VI (`/lich-su`, `/giai-phau`, `/so-sanh`) + nhãn hiển thị "Vietnamese only"; hoạt động desktop (dropdown) và mobile (menu); có `hreflang="vi"`; không vào `contentRoutes` bảng cặp, không hreflang alternate.
- **Fallback không-JS**: switcher là `<a href>` thật (trang chưa dịch → trang chủ đích); khi chưa dịch render thêm `<noscript>` chú thích ngay dưới hàng header giải thích liên kết dẫn đi đâu. Menu hamburger vẫn cần JS để mở (hiện trạng từ trước, không thuộc luồng chuyển ngôn ngữ).
- **Panel (dialog nhỏ)**: `role="dialog"` + `aria-modal="true"` + `aria-labelledby="lang-panel-title"`; mở focus vào nút "Ở lại"; Tab xoay vòng 2 điều khiển; Escape đóng và trả focus về đúng nút đã mở; bấm nền mờ đóng; không thêm thư viện; không có transition trên panel (reduced-motion không phát sinh chuyển động mới).

## 5. Kết quả kiểm

### 5.1 Kiểm tự động `scripts/check-g01-navigation.mjs` — 63/63 ĐẠT (exit 0)
- Lớp 1 (24 ca): gọi **thẳng hàm** trong `src/i18n/contentRoutes.ts` (transpile bằng esbuild 0.21.5 có sẵn trong node_modules — không sao chép hàm "đúng" vào test): root hai chiều `/` ↔ `/en/`, có/không slash cuối, bài có cặp, `/english` `/en-other` không coi là EN, trang chưa dịch không sinh URL/hreflang giả, switcherTarget/getAlternates/localizedHref từng ca.
- Lớp 2 (39 ca): đọc HTML trong dist — hreflang trang chủ VI + EN đủ vi/en/x-default; aria-current từng nav **desktop và mobile tách riêng theo khối `<nav>`** (không đếm bản ẩn thay bản hiển thị — hiển thị runtime do ma trận trình duyệt chịu, mục 5.3); Home không active trên danh sách/bài con/404; `location` đúng trên `/thuong-hieu/rolex`, `/co-che/bo-thoat`, `/en/mechanisms/escapement`; nút nhóm cha không gạch không aria-current; Explore EN đủ 3 link VI có nhãn ở cả hai nav; switcher trang chủ EN là link thẳng; trang chưa dịch có `data-lang-switch` ở cả hai switcher + panel `#lang-panel-go href="/en/"` + noscript + không hreflang en; toàn dist 286 trang aria-current chỉ nhận `page|location`.
- Bằng chứng: `output/g01-navigation-i18n/check-g01-ket-qua.json`, `log-check-g01.txt`.
- Tích hợp: `npm run build` chạy script này sau `astro build`; lệnh riêng `npm run check:g01`.

### 5.2 Chứng minh test bắt lỗi — sandbox cô lập, 3/3 ĐẠT
Sandbox `output/g01-navigation-i18n/sandbox` (bản sao src/public/cấu hình; node_modules resolve từ repo — không sao chép node_modules; không tiêm vào repo chính). Sau mỗi ca xóa dist sandbox; kết thúc xóa toàn bộ sandbox.

| Ca | Tiêm | Kỳ vọng | Thực tế |
| --- | --- | --- | --- |
| S1 | bản sạch | exit 0 build + check | ĐẠT (0/0) |
| M1 | mô phỏng đúng bug gốc: map tạo khóa `p.vi.replace(/\/$/,'')` trong khi tra cứu dùng `norm` → mất cặp root | exit ≠ 0, bắt ca root/hreflang | ĐẠT — exit 1, 3 ca root/hreflang bị bắt |
| M2 | `isHome = true` (Home khớp mọi pathname) | exit ≠ 0, bắt ca Home active sai | ĐẠT — exit 1, 5 ca Home bị bắt |

Ghi chú: lần tiêm đầu M1 bỏ `|| '/'` ở `norm` — cả hai phía cùng lệch nên vẫn nhất quán, check qua sạch (đúng thiết kế — đây không phải bug); đã sửa tiêm đúng mã lệch hai quy ước của bug gốc. Bằng chứng: `kiem-thu-sandbox-ket-qua.json`, `sandbox-*-ket-qua.json`, `log-sandbox-*.txt` (stdout/stderr riêng từng ca).

### 5.3 Ma trận trình duyệt — 96/96 ĐẠT
8 trang (`/`, `/en/`, `/thuong-hieu`, `/en/brands/`, `/co-che/bo-thoat`, `/en/mechanisms/escapement/`, `/lich-su`, `/404.html`) × 6 viewport (320/375/768/820/1024/1440) × 2 theme. Theme đặt bằng localStorage (cách website lưu lựa chọn) rồi **đọc trạng thái thật từ DOM (`html.dark`)**. Mỗi ô đo: `scrollWidth` vs `clientWidth`; hình học header (logo, desktop nav, hamburger, switcher, theme, search) — chồng lấn bbox logo×các mục = 0 ở mọi ô; logo hiển thị và không tràn box chữ; nút chức năng nhỏ nhất ≥ 40px (thực đo 46.8px); trạng thái active ghi **riêng cho từng nav** kèm cờ hiển thị; menu đúng chế độ theo viewport. Số đo: `ma-tran-trinh-duyet.json` (96 bản ghi đầy đủ), `ma-tran-tom-tat.txt`.

### 5.4 Hai vòng sửa logo EN trong quá trình ma trận
Vòng 1: 12/96 không đạt — logo trang EN ("Mechanical Watch Knowledge", từ dài "Mechanical") tràn box 23px ở 320px và 14px ở 1024px (chữ vẽ tràn có thể chạm viền nút tìm kiếm). Vòng 2 (text-sm dưới 400px): còn 6/96 (320px tràn 16px). Vòng 3 (chốt): EN logo `text-base max-[339px]:text-xs`, hàng header `px-4 max-[339px]:px-2`, SearchInline `w-48 xl:w-64` → **96/96 ĐẠT**. VI sạch 100% ngay vòng 1.

### 5.5 Sát breakpoint — 12/12 ĐẠT
1010/1024/1038 × `/` + `/en/` × sáng/tối: dưới 1024 chỉ hamburger hiện, từ 1024 chỉ desktop nav hiện, không tràn ngang. `sat-breakpoint.json`.

### 5.6 Ma trận thao tác — 24/24 ĐẠT
`pw-thao-tac.js` (21 ca) + `pw-ban-phim-bs.js` (3 ca), kết quả `thao-tac-ket-qua.json`, `ban-phim-bs-ket-qua.json`:
- VI→EN→VI qua switcher trên trang chủ, danh sách (`/thuong-hieu` ↔ `/en/brands/`), bài có dịch (`/co-che/bo-thoat` ↔ `/en/mechanisms/escapement/`) — 6 ca.
- Trang chưa dịch `/lich-su`: bấm switcher → panel mở, URL không đổi; "Ở lại" → đóng, vẫn ở trang; mở lại → "Đi tới trang chủ tiếng Anh" → `/en/`; Escape → đóng + focus về đúng switcher — 4 ca.
- Explore EN: History/Anatomy/Compare vào đúng `/lich-su`, `/giai-phau`, `/so-sanh` kèm nhãn "Vietnamese only" (desktop 3 ca + mobile 1 ca).
- Bàn phím: dropdown Enter mở + focus link đầu, ArrowDown đi tiếp, Tab hết 4 link → menu tự đóng + focus rời menu (không mắc kẹt), Escape đóng + focus về nút; mobile menu Enter mở + focus vào menu, Escape đóng + focus về hamburger; panel Tab xoay vòng stay↔go — 4 ca.
- Tìm kiếm: mobile dialog mở, gõ "rolex" 8 kết quả, Escape đóng + focus về nút; desktop ô inline 8 kết quả — 2 ca.
- Theme: click đổi sáng↔tối, aria-label cập nhật đúng chiều — 1 ca.
- Reduced motion (`prefers-reduced-motion: reduce`): panel hiện tức thì, `transitionDuration` 0 trên panel mới — 1 ca.
- Không-JS (`javaScriptEnabled: false`, context riêng): chú thích noscript hiển thị giải thích rõ; click "English" — liên kết thật dẫn tới `/en/`, không mắc kẹt — 2 ca.
- Thanh điều khiển sticky của `/lich-su`: đo ở 375/820/1440 sau cuộn 900px — **giống hệt nền `4129437`** (header height 81.8/81.8/81.8→83.8; vị trí sticky thanh lọc trùng số nền) — không phải hồi quy G01; hiện trạng thanh lọc cuộn khỏi viewport ghi ở mục 7.
- Ảnh đại diện 11 tệp (`output/g01-navigation-i18n/anh/`): 320 VI/EN, 375 panel chưa dịch, 375 menu mobile, 768 EN tối, 820 tablet VI, 1024 EN desktop vừa bật, 1440 dropdown Kiến thức (mục "Cơ chế" gạch location, nút cha chỉ đổi màu), 1440 Explore EN nhãn "Vietnamese only", 1440 dark. GLM đã mở từng ảnh xác nhận đúng đối tượng (không nhầm footer), 2 ảnh dropdown chụp lại bằng hover + chờ 500ms vì lần đầu chụp trúng frame transition.

### 5.7 Kiểm toàn repo cuối gói (build nghiệm thu: lần 5 trong phiên)
- `npm run build`: **exit 0** — chuỗi gồm 25 lệnh kiểm + `check:types`; `astro check` **187 tệp: 0 errors / 0 warnings / 4 hints** (4 hints là ts(6133) từ tệp công cụ P3.1–P3.3 đã commit — nguyên trạng mốc; hint thứ 5 phát sinh tạm từ `pw-ma-tran.js` của chính gói đã được dọn trước khi chốt). Trang: **286 HTML — không tạo route mới**. Link: **20.564, 0 hỏng**.
- `node scripts/check-english-launch.mjs`: **ĐẠT, exit 0** (`log-check-english-launch.txt`). Một vòng trước đó KHÔNG ĐẠT do 2 comment HTML mới trong Header chứa chuỗi `<a href>` khiến bộ quét văn bản EN bắt nhầm chữ tiếng Việt trong comment — sửa comment (không sửa script kiểm, không làm yếu bộ kiểm) rồi build lại.
- `node scripts/check-g01-navigation.mjs`: **63/63 ĐẠT, exit 0**.
- `git diff --check`: sạch.
- Build dùng cho nghiệm thu: build lần 5 (~10:05 +07 12/09/2026). Sau build này chỉ sửa tệp công cụ trong `output/` (không thuộc dist) — mã website không đổi.

### 5.8 Phân rã chênh lệch liên kết 19.827 → 20.564 (+737, khép kín)
`phan-ra-link.mjs` → `phan-ra-link.json` (đếm trực tiếp trên dist):

| Cấu phần mới | Số link | Giải thích |
| --- | --- | --- |
| Explore EN (3 link × 2 nav × 64 trang EN) | +384 | Trước đây cụm ẩn hoàn toàn ở EN |
| `#lang-panel-go` (link trang chủ đích trong panel) | +286 | Markup panel render mọi trang (hiện/ẩn bằng class hidden) |
| Footer EN mục "Home" (× 64 trang EN) | +64 | `localizedHref('/')` giờ trả `/en/` thay vì ẩn |
| hreflang trang chủ VI (vi + en + x-default) | +3 | Trước đây 0 do bug map mất cặp root |
| **Tổng** | **+737** | 19.827 + 737 = 20.564 — khớp đúng số check-links |

Thuộc tính `data-lang-switch` (320 = 2 × 160 trang chưa dịch: 158 trang VI + 404 + legacy `/en/glossary/escapement`) là attribute, không phải link mới.

## 6. Tóm tắt exit code

| Lệnh | Exit | Kết quả |
| --- | --- | --- |
| `npm run build` (lần 5) | 0 | 286 trang, 20.564 link 0 hỏng, astro check 187 tệp 0/0/**4 hints** |
| `node scripts/check-english-launch.mjs` | 0 | ĐẠT |
| `node scripts/check-g01-navigation.mjs` | 0 | 63/63 ĐẠT |
| `npm run check:g01` (lệnh mới) | 0 | trùng script trên |
| `git diff --check` | 0 | sạch |
| Sandbox S1/M1/M2 | 0 / 1 / 1 | ĐẠT đúng kỳ vọng (M1/M2 phải FAIL) |
| Ma trận trình duyệt | — | 96/96 + 12/12 sát breakpoint + 24/24 thao tác ĐẠT |

## 7. Giới hạn, ô chưa kiểm, điểm cần quyết

1. **CHƯA KIỂM bằng trình đọc màn hình thật** — chỉ kiểm aria-current/aria-label/role/qua DOM + bàn phím tự động; chưa chạy NVDA/VoiceOver.
2. **Hiện trạng cần GPT Work quyết (ngoài phạm vi tệp G01)**: thanh lọc sticky `top-16` và `timeline-nav` của `/lich-su` cuộn khỏi viewport khi cuộn sâu (locTop âm ở mọi viewport) — đo đối chiếu **trên worktree nền `4129437`**: header height và vị trí sticky trùng số nền, tức hành vi có sẵn từ trước, G01 không gây và không làm nặng thêm; sửa cần đụng `src/pages/lich-su.astro` (ngoài danh sách tệp được phép) — báo trước theo quy định, chờ quyết.
3. Menu hamburger vẫn cần JS để mở (hiện trạng từ trước). Luồng chuyển ngôn ngữ không-JS đã đảm bảo bằng link thật + noscript.
4. Route `/en` (không slash cuối) không được tạo thành trang — `getAlternates` chuẩn hóa hreflang về `/en/`; request `/en` ngoài production là hành vi hosting (ngoài phạm vi, không đổi vercel.json).
5. Chưa kiểm production/Vercel — bằng chứng dùng `astro preview` bản build G01 tại localhost (production chưa cập nhật, không dùng làm bằng chứng kết quả sửa).
6. Nhãn panel EN (`lang_panel_*` bản en) không bao giờ hiển thị thực tế vì hiện tại mọi trang EN đều có bản VI — mã viết đối xứng cho đủ, đã kiểm logic qua build (markup render đúng ngôn ngữ trang).
7. `astro check` quét cả tệp công cụ trong `output/` — số tệp 187 (mốc cũ 176) tăng do các tệp công cụ/log của gói; diagnostics giữ nguyên 0/0/4.

## 8. Danh sách chính xác tệp thuộc gói (đề xuất commit)

1. `src/i18n/contentRoutes.ts` (sửa)
2. `src/components/Header.astro` (sửa)
3. `src/components/SearchInline.astro` (sửa)
4. `src/components/SearchBox.astro` (sửa)
5. `src/components/Footer.astro` (sửa)
6. `src/i18n/ui.ts` (sửa)
7. `package.json` (sửa)
8. `scripts/check-g01-navigation.mjs` (mới)
9. `docs/nghiem-thu/G01-dieu-huong-va-ngon-ngu-2026-09-12.md` (mới — biên bản này)
10. `output/g01-navigation-i18n/` (39 tệp: 9 công cụ `*.mjs`/`*.js`, 18 JSON + log, 11 ảnh trong `anh/` — danh sách đúng như `git status --porcelain output/g01-navigation-i18n`)

Tổng: 48 tệp. Không đưa tệp untracked có trước vào danh sách này.

---

G01 đã thực hiện xong và tự kiểm trong phạm vi báo cáo; chưa commit, chưa push, chưa deploy. Dừng chờ GPT Work nghiệm thu độc lập. Chưa chuyển G02.
