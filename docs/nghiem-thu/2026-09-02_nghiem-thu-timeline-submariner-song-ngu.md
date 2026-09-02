# Biên bản nghiệm thu — Bản song ngữ sơ đồ tiến hóa Rolex Submariner (Prompt 31)

- Ngày: 02/09/2026
- Chế độ quy ước i18n: **B (Bilingual content)** cho dữ liệu timeline + **C (Shared feature)** cho component/kiểm thử
- Commit nền: `7ea7587` — English launch pack (Prompt 30) đã được commit và push; gói này dựng tiếp, không đụng tệp ngoài phạm vi
- Trạng thái cuối: **CHỜ COMMIT** — không commit, không push

## 1. Tệp đã sửa/thêm

| Tệp | Thay đổi |
|-----|----------|
| `src/data/modelEvolution.ts` | Kiểu dữ liệu song ngữ: `LocalizedText {vi,en}`, `DisplayText = string \| LocalizedText`, helper `tText(value, lang)`; dataset khai báo `publishedLangs`; `getEvolutionDataset(slug, lang)` chỉ trả dataset khi ngôn ngữ trang nằm trong `publishedLangs` (GMT-Master `['vi']` → tiếp tục không render ở English; không đổi hành vi cũ, nhưng giờ do biên tập khai báo). |
| `src/data/submarinerEvolution.ts` | 8 mốc chuyển sang `LocalizedText`: title/intro/label/change/note có `vi` + `en` diễn đạt lại ĐÚNG dữ kiện bản vi; không thêm mốc, thông số, claim hay nhận định sưu tầm; `reference`/`sourceName` không dịch; URL nguồn giữ nguyên HTTPS. `intro.en` dùng ý dẫn đề: "…without treating this as a complete catalogue or a buying guide." |
| `src/data/rolexGmtMasterEvolution.ts` | Thêm đúng 1 dòng `publishedLangs: ['vi']` + ghi chú (không đụng nội dung mốc — chưa có bản English nên không render EN). |
| `src/components/ModelEvolution.astro` | Props `{ dataset, lang }` — mọi chữ người đọc qua `tText()`/`ui.ts` (`evolution_detail_aria`, `evolution_view_source`); bỏ 2 chuỗi tiếng Việt hard-code ("Chi tiết mốc", "Xem nguồn"). Logic/HTML/CSS/script tương tác giữ MỘT phiên bản dùng chung — không copy component. Keyboard/ARIA nguyên trạng và đủ: nút thật `type="button"` + `aria-pressed`, thẻ chi tiết `role="group"` + `aria-label` theo ngôn ngữ, không trap focus, reduced-motion tức thời, no-JS hiển thị danh sách dọc đầy đủ. |
| `src/components/templates/IconicArticle.astro` | Bỏ điều kiện `lang === 'vi' &&` — render timeline khi dataset cho phép ngôn ngữ trang; truyền `lang`. |
| `src/i18n/ui.ts` | Thêm 2 nhãn giao diện × 2 ngôn ngữ (`evolution_detail_aria`, `evolution_view_source`). |
| `scripts/check-evolution-data.mjs` | Mở rộng tiêu chí 1–8 của đề (chi tiết mục 3). |
| `scripts/check-evolution-routes.mjs` | **Mới** — tiêu chí 9 (route trong dist) tách riêng vì phải chạy SAU build; vào chuỗi `npm run build` sau `check-links`. |
| `package.json` | `npm run build` thêm `&& node scripts/check-evolution-routes.mjs`. |

Không đụng: canonical, hreflang, cặp route Submariner trong `contentRoutes.ts`, Article JSON-LD, URL tiếng Việt, `custom_slug`.

## 2. Dữ liệu vi/en tổ chức thế nào

Một tệp dataset = nguồn dữ kiện duy nhất cho cả hai ngôn ngữ. Dữ kiện kỹ thuật chung (year, reference, sourceUrl, sourceName) đứng một lần; các trường hiển thị là cặp `{ vi, en }` — bản `en` là diễn đạt lại của cùng dữ kiện, kiểm tự động chặn văn bản tiếng Việt lọt vào `en`. Dataset tự khai báo `publishedLangs`: Submariner `['vi','en']`, GMT-Master `['vi']` — điều kiện render nằm một chỗ (`getEvolutionDataset`), không rải điều kiện ngôn ngữ trong template.

## 3. Route đã kiểm tra

`/mau-iconic/rolex-submariner/` và `/en/iconic-watches/rolex-submariner/` — cả hai được kiểm tự động trên HTML build bằng `check-evolution-routes.mjs`, với nhãn và dữ liệu theo đúng ngôn ngữ. GMT-Master VI giữ nguyên; GMT EN không render timeline (đúng đề — không thêm vào trang English chưa có dữ liệu dịch).

## 4. Kết quả từng lệnh (nguyên văn tóm lược)

- `npm run check` — **0 dòng LỖI/KHÔNG ĐẠT** (toàn bộ script cũ + mới ĐẠT).
- `npm run build` — `249 page(s) built`; `Đã quét 249 trang HTML, 17300 link` (0 link hỏng); chuỗi build kết thúc bằng `KIỂM TRA ROUTE SƠ ĐỒ TIẾN HÓA SUBMARINER … KẾT LUẬN: ĐẠT`.
- `node scripts/check-english-launch.mjs` — `KẾT LUẬN: ĐẠT — English launch pack đúng kiến trúc đa ngôn ngữ.`
- `node scripts/check-evolution-data.mjs` (chạy riêng sau build) — `Sơ đồ tiến hóa hợp lệ (song ngữ theo publishedLangs): - Rolex GMT-Master: 8 mốc · xuất bản: vi - Rolex Submariner: 8 mốc · xuất bản: vi+en` (exit 0).
- `node scripts/check-evolution-routes.mjs` (cũng chạy riêng) — `Route VI: timeline render, nhãn "Xem nguồn" có mặt / Route EN: timeline render, nhãn "View source" có mặt / Route EN: khối timeline không còn văn bản tiếng Việt / Cả hai bản: đủ 8 mốc / KẾT LUẬN: ĐẠT`.

Chi tiết 9 tiêu chí của đề nằm trong hai script: (1) dataset EN đủ song ngữ; (2) mọi mốc đủ year/reference + label/change/note cả vi lẫn en; (3) không trùng tổ hợp năm+reference, năm tăng dần; (4) nguồn HTTPS; (5) link nội bộ trong dataset phải là route thật; (6) `en` không chứa ký tự tiếng Việt có dấu; (7) `vi` không chứa nhãn UI tiếng Anh ("View source"…); (8) component semantic/keyboard + cấm hard-code chữ; (9) hai route dist + timeline render + đủ 8 mốc + nhãn đúng ngôn ngữ.

## 5. Rà soát hiển thị cần thực hiện trên preview/deploy

Các kiểm tự động xác nhận route, nội dung, nhãn ngôn ngữ, số mốc và cấu trúc ARIA; trước khi phát hành production, nên kiểm tra thủ công các điểm sau trên cả hai route:

- Desktop: chọn một mốc bất kỳ, kiểm tra `aria-pressed` và thẻ chi tiết đổi theo mốc.
- Bàn phím: Tab, Enter và Space hoạt động trên toàn bộ tám nút mốc, không có focus trap.
- Mobile 375px: không tràn ngang; mọi thẻ chi tiết đọc được ở chế độ danh sách dọc.
- Giao diện tối và `prefers-reduced-motion`: màu đủ dễ đọc, chuyển trạng thái tức thời khi giảm chuyển động.

Các mục này là kiểm tra hiển thị thủ công sau build, không được coi là đã nghiệm thu chỉ bằng biên bản này.

## 6. Xác nhận

- Không thay đổi URL tiếng Việt, `custom_slug`, canonical, hreflang, cặp route trong `contentRoutes.ts` — `check-english-launch` ĐẠT và check-links 0 hỏng.
- Không tạo link English rỗng — GMT-Master EN không render timeline; chỉ Submariner (có bài EN thật) hiển thị.
- **Chưa commit, chưa push.** Tệp thay đổi (stage từng tên khi anh commit): `package.json`, `scripts/check-evolution-data.mjs`, `scripts/check-evolution-routes.mjs` (mới), `src/components/ModelEvolution.astro`, `src/components/templates/IconicArticle.astro`, `src/data/modelEvolution.ts`, `src/data/rolexGmtMasterEvolution.ts`, `src/data/submarinerEvolution.ts`, `src/i18n/ui.ts`.
