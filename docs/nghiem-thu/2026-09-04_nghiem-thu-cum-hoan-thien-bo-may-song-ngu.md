# Biên bản nghiệm thu — cụm "Hoàn thiện bộ máy: Guilloché, Perlage và Côtes de Genève" song ngữ (Prompt 42)

- **Ngày:** 04/09/2026
- **Commit nền:** `12d01b3` (16 tệp của gói tourbillon & điểm chuông — lần 20 — vẫn đang chờ commit trên cùng nền này; gói hiện tại chồng lên gói trước, chưa có commit mới).
- **Chế độ i18n:** A (Việt-first) — tiếng Việt là ngôn ngữ mặc định, mọi URL tiếng Việt giữ nguyên; English thêm 4 route mới qua bảng cặp `contentRoutes.ts`.

## 1. Phạm vi đã thực hiện

### 1.1 Chuẩn hóa 4 bài tiếng Việt (viết lại theo nguồn)

1. `src/content/huongDan/vi/hoan-thien-thu-cong-dong-ho.md` — viết lại theo 4 trụ của đề: (1) hoàn thiện là gì trong giới hạn nguồn (FHH định nghĩa finishing là công đoạn cuối của một quy trình; FHH liệt kê các kỹ thuật xử lý bề mặt; Poinçon de Genève công bố điều ước theo nhóm linh kiện); (2) ba thuật ngữ mô tả loại xử lý bề mặt nào (guilloché: khắc tay hoặc máy, đường giao nhau, hướng di chuyển ngang/dọc khác flinqué bán kính — theo FHH; perlage: các vòng tròn đồng tâm chồng mép, FHH gọi stippling/circular-grained, Poinçon de Genève gắn với hoàn thiện hốc trên bản máy/cầu máy; Côtes de Genève: đường lượn sóng, ví dụ của dạng đường song song cách đều tạo bằng guối gỗ và máy tiện — theo FHH); (3) bốn lý do không suy từ thuật ngữ/ảnh ra chất lượng vận hành, nguồn gốc, giá trị; (4) đối chiếu tài liệu kỹ thuật của đúng mẫu và bộ quy định công bố của tổ chức liên quan. Loại bỏ hoàn toàn: phần "đọc bộ máy qua ảnh" (raking light, checklist mua, phân biệt góc trong), phân biệt "làm tay so làm máy", Dufour Simplicity, các claim chất lượng/tay nghề.
2. `src/content/tuDien/vi/guilloche.md` — định nghĩa theo mục từ FHH; loại lịch sử chống chói/Breguet/thế kỷ 18, mục "thật và giả", claim giá.
3. `src/content/tuDien/vi/perlage.md` — định nghĩa theo FHH (stippling) + phạm vi trong quy định công bố của Poinçon de Genève (creusures perlées hoặc hoàn thiện khác xóa dấu gia công); loại claim "giữ dầu/bụi", "dấu hiệu tỉ mỉ", "perlage giả/chạm tay".
4. `src/content/tuDien/vi/cotes-de-geneve.md` — định nghĩa theo FHH (đường lượn sóng; đường song song cách đều, boxwood pad + máy tiện) + Poinçon de Genève (mặt trên cầu máy: Geneva stripes hoặc trang trí khác xóa dấu gia công); loại "dấu hiệu cao cấp", "chỉ thấy ở đồng hồ tốt", danh sách hãng Poinçon, "8 quy tắc", Patek 2009, mục "nhận biết".

### 1.2 Tạo 4 bài English (custom_slug, flags false, ≥2 nguồn HTTPS)

5. `src/content/huongDan/en/movement-finishing.md` (slug `movement-finishing`)
6. `src/content/tuDien/en/guilloche.md` (slug `guilloche`)
7. `src/content/tuDien/en/perlage.md` (slug `perlage`)
8. `src/content/tuDien/en/geneva-stripes.md` (slug `geneva-stripes` — route EN của cặp Côtes de Genève)

Mỗi bài có blockquote/ghi chú biên tập "chỉ trình bày những gì nguồn nêu", không bảng Markdown, không link về route tiếng Việt, không nhắc công cụ tương tác.

### 1.3 Hạ tầng

9. `src/i18n/contentRoutes.ts` — +4 cặp: `/huong-dan/hoan-thien-thu-cong-dong-ho → /en/guides/movement-finishing/`, `/tu-dien/guilloche → /en/glossary/guilloche/`, `/tu-dien/perlage → /en/glossary/perlage/`, `/tu-dien/cotes-de-geneve → /en/glossary/geneva-stripes/` (tổng 63 cặp).
10. `scripts/check-english-launch.mjs` — REQUIRED_EN +4 (56 → 60 route bắt buộc); bổ sung tên riêng horology gốc Pháp (`Guilloché`, `guilloché`, `Poinçon de Genève`, `Poinçon`, `Genève`) vào PROPER_NOUNS để quét rò rỉ tiếng Việt không bắt nhầm thuật ngữ/tên tổ chức (trước đó `Côtes de Genève`, `Côtes` đã có sẵn từ gói trước).
11. `package.json` — `check:movement-finishing` + nối cuối chuỗi `npm run check`.
12. `src/data/glossary-terms.json` — sinh lại bằng `scripts/generate-glossary-terms.mjs` (script chạy tự động trong chuỗi build, trước astro build); excerpt 3 thuật ngữ cập nhật theo frontmatter mới. Ghi minh bạch: excerpt của `vat-canh` và `poincon-de-geneve` vẫn giữ câu cũ mang claim đã loại — 2 bài này ngoài phạm vi 8 bài của đề nên không đụng.

### 1.4 Kiểm + tài liệu

13. `scripts/check-movement-finishing-cluster.mjs` (mới) — R1 đủ 4+4 bài; R2 frontmatter EN (custom_slug khớp tệp, false-flags, enum, ≥2 nguồn HTTPS); R3 đủ 4 cặp route; R4 33 liên kết bắt buộc + đích tồn tại; R5 EN không link route vi; R6 cấm bảng Markdown trong 8 bài; R7 cấm claim giá/phân khúc/thẩm mỹ/chất lượng tổng thể/chính xác-bền/làm tay-máy tuyệt đối/mua bán/nhận biết bằng ảnh (có cửa sổ `allow: /Fondation/i` cho tên tổ chức FHH); R8 cấm lịch sử/kỹ thuật chưa nguồn (Breguet, thế kỷ, chống chói, dầu/bụi, "thật/giả", ba chiều/chạm, số tiêu chí Poinçon, tên hãng/chứng nhận riêng); R9 relation vi trung tính (4 bài vi không có relation → 0 mục được quét); R10 hồ sơ + biên bản tồn tại. Tự kiểm tiêm lỗi: chèn vào 2 bài EN các câu "superior quality movements… holds its value… Patek… Geneva Seal… by hand only… more accurate", một bảng Markdown, và "keeps dust… before you buy…" kèm link `/tu-dien/perlage` → script bắt đúng R5/R6/R7/R8 (khôi phục bằng `cp` từ bản sao, không dùng sed); bổ sung pattern `more accurate` sau tiêm (lọt ở lần đầu).
14. `docs/ho-so-nguon-cum-hoan-thien-bo-may-song-ngu.md` (mới) — 6 nguồn với trích nguyên văn, claim dùng được, claim đã loại (mục 3.9 ghi rõ cụm "superior quality movements" có trong nguyên văn mục từ FHH Côtes de Genève nhưng bị loại khỏi bài theo quy tắc đề).
15. `docs/nghiem-thu/2026-09-04_nghiem-thu-cum-hoan-thien-bo-may-song-ngu.md` (mới — biên bản này).
16. `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` — lần 21 (mốc, commit nền, npm run check, build, dòng English launch pack).

Tổng: **16 tệp** (9 M + 7 ??).

## 2. Nguồn

- FHH (mục từ/bài trực tiếp, URL cấu trúc mới `/en/watches-and-culture/watchmaking-knowledge/encyclopedia/…`): engine-turning-guilloche; cotes-or-vagues-de-geneve; finishing-finissage; decorating-and-engraving-the-movement.
- Poinçon de Genève (bản EN của trang quy định do cơ quan này công bố): baseplates-plates-additional-mechanisms-and-bridges; shaped-parts-and-supplies.
- Chi tiết trích nguyên văn + phân loại claim: `docs/ho-so-nguon-cum-hoan-thien-bo-may-song-ngu.md`.

## 3. Lệch so với giả định đề

1. **REQUIRED_EN:** đề mục 5 ghi "60 → 64 route bắt buộc"; trạng thái thực tế trước gói là **56** (sau Prompt 41 — tracker đã ghi "đủ 56 route bắt buộc trong dist" từ lần 20). Cập nhật thực hiện **56 → 60**, đúng đích "60 route English bắt buộc" ở mục 7 của đề.
2. **FHH đổi cấu trúc site:** URL glossary cũ (`…/glossary-of-watchmaking/s/…`) nay chuyển hướng về `/en`; mục từ nằm ở `/en/watches-and-culture/watchmaking-knowledge/encyclopedia/…`. Bài FHH Journal "decoration-of-watches-and-movements" (nguồn cũ của 2 bài từ điển) trả HTTP 503 → bỏ. FHH không có mục từ "perlage" riêng trong toàn bộ 564 mục từ glossary → perlage dựa trên bài encyclopedia "decorating-and-engraving-the-movement" (stippling/spotting, circular-grained) và quy định công bố của Poinçon de Genève. Các nguồn cũ AHCI, SVMA, Anglage.ch, Grand Seiko, Breguet craftsmanship bỏ theo quy tắc nguồn của đề.
3. **Thuật ngữ trên trang EN:** `Guilloché`/`Poinçon de Genève`/`Genève` là từ horology gốc Pháp viết nguyên dấu trong văn bản tiếng Anh; quét rò rỉ tiếng Việt của `check-english-launch.mjs` bắt nhầm → thêm vào danh sách tên riêng cho phép (như `Côtes de Genève` từ trước).

## 4. Kết quả kiểm tra bắt buộc (kết quả lệnh thật, exit 0 toàn bộ)

| Lệnh | Kết quả |
| --- | --- |
| `npm run check:movement-finishing` | ĐẠT — 4 bài vi + 4 bài en; 4 cặp route; 33 liên kết bắt buộc + đích tồn tại; R5/R6/R7/R8/R9 sạch |
| `npm run check` | ĐẠT — 12 cụm chống hồi quy (gồm mới nhất: hoàn thiện bộ máy), kiểm nội dung tĩnh + WCAG tự động không lỗi |
| `npm run build` | 286 trang (222 vi + 64 en); check-3d-loading-budget ĐẠT; check-links OK; check-evolution-routes ĐẠT |
| `node scripts/check-english-launch.mjs` | ĐẠT — đủ 60 route bắt buộc trong dist; 64 trang EN `lang="en"`; hreflang/switcher/Pagefind đúng |
| `node scripts/check-links.mjs` | OK — 286 trang HTML, 19.822 link nội bộ hợp lệ, không link hỏng |
| `node scripts/check-evolution-routes.mjs` | ĐẠT — Submariner + GMT-Master vi+en khớp dataset |
| `git diff --check` | Sạch, không lỗi whitespace |
| `git status --short` | 16 tệp thuộc gói (9 M + 7 ??), không đụng `output/` và các `??` docs cũ |

Sitemap (đếm từ `dist/sitemap-0.xml` sau build): 285 URL tổng, trong đó **64 URL `/en/`**.

## 5. Trạng thái

**Chưa commit, chưa push.** Toàn bộ 16 tệp của gói nằm trong working tree chờ duyệt.
