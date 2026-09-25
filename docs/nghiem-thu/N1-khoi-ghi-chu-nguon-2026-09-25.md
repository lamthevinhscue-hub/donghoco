# BIÊN BẢN GÓI N1 — KHỐI "GHI CHÚ NGUỒN" THU GỌN

**Ngày:** 25/09/2026
**Giao dịch:** TXN-20260925-162 — danh mục DHC-GD3-20260925 v1.0.0
**Nền Git:** HEAD = `origin/main` = `6f19c02` (`6f19c028e96504df4d264b0f37555c058e5072a3`), nhánh `main`, staged = 0, tracked sửa 0 khi bắt đầu
**Căn cứ:** `docs/KE-HOACH-HOP-NHAT-GIAI-DOAN-3-2026-09-25.md` mục N1 + Phụ lục D2 + prompt GPT Work N1
**Trạng thái:** đã làm xong, CHƯA stage, CHƯA commit, CHƯA push — chờ GPT Work nghiệm thu

---

## 1. Tệp thay đổi (8 sửa + 1 mới)

| # | Tệp | Thay đổi |
|---|---|---|
| 1 | `src/content.config.ts` | thêm `sourceNotes: z.array(z.string()).optional()` (kèm 1 dòng comment) vào **đúng 4 collection**: `mauIconic`, `coChe`, `tuDien`, `huongDan`. Không đụng `thuongHieu`, `trang`, enum, slug, route, trường hiện hữu |
| 2 | `src/i18n/ui.ts` | thêm đúng khóa `source_notes_heading` ở cả hai bảng: VI `'Ghi chú nguồn'` (ngay sau `sources_title`), EN `'Source notes'` (ngay sau `sources_title`). Không sửa nhãn khác |
| 3 | `src/components/SourceNotes.astro` (**mới**) | khối thu gọn: `<details>`/`<summary>` HTML native, mặc định đóng, không JavaScript; chỉ render khi mảng có ít nhất một ghi chú khác rỗng (lọc `trim()`); tiêu đề từ `tr.source_notes_heading` (tự suy ngôn ngữ trang như SourceList); viền/nền token hiện có `brass`/`dark-brass`, `focus-visible:ring` trên summary; nội dung HTML tĩnh trong DOM để Pagefind lập chỉ mục (không `data-pagefind-ignore`) |
| 4 | `src/layouts/ArticleLayout.astro` | import SourceNotes; thêm prop `sourceNotes?: string[]`; render `<SourceNotes notes={sourceNotes} />` **ngay trước** `<SourceList>` (sau nội dung bài) |
| 5 | `src/components/templates/MechanismArticle.astro` (coChe) | truyền `sourceNotes={data.sourceNotes}` vào ArticleLayout |
| 6 | `src/components/templates/TermArticle.astro` (tuDien) | truyền `sourceNotes={data.sourceNotes}` vào ArticleLayout |
| 7 | `src/components/templates/IconicArticle.astro` (mauIconic) | truyền `sourceNotes={data.sourceNotes}` vào ArticleLayout |
| 8 | `src/components/templates/GuideArticle.astro` (huongDan) | truyền `sourceNotes={data.sourceNotes}` vào ArticleLayout |
| 9 | `src/content/coChe/vi/manufacture-etablisseur.md` | thêm khối `sourceNotes:` vào frontmatter với **một** ghi chú: "Các nguồn trích trong bài không đưa ra thước đo hay so sánh về chất lượng sản phẩm." — chép sát câu giới hạn sẵn có của bài (mục "Đọc thêm": "Các nguồn này không đưa ra thước đo hay so sánh về chất lượng sản phẩm."); không bổ sung dữ kiện. Không sửa thân bài, `sources`, liên kết, nhãn "Bài liên quan" |

Ghi chú khuôn: bốn collection đều render qua `ArticleLayout`, nên chỉ cần một layout + một component + 4 lệnh truyền prop; `BrandLayout` (thương hiệu) và collection `thuongHieu` không thuộc phạm vi nên không đụng. Không sửa `package.json`, dependency, route, CSS toàn cục, ảnh, CSP, Pagefind config.

## 2. Kết quả kiểm

### 2.1. Kiểu nội dung và schema

- `astro check` (qua `npm run check:types` riêng và trong `npm run check`): 0 lỗi, 0 cảnh báo, 1 hint có trước (output/playwright — ngoài phạm vi, xem mục 4).
- Schema nhận `sourceNotes` ở đúng 4 collection: bài thử có frontmatter qua sync/build không lỗi; collection khác không thay đổi hành vi (build trọn vẹn 336 trang, số link không đổi).

### 2.2. Trang mẫu trên dist sau build (`dist/co-che/manufacture-etablisseur/index.html`)

- Đúng **một** khối `<details class="source-notes …">` (đếm bằng grep: 1).
- Vị trí: offset của khối nhỏ hơn offset của `<section class="source-list">` — **ngay trước** "Nguồn tham khảo", sau nội dung bài và khối "Đọc thêm".
- Tiêu đề "Ghi chú nguồn" từ i18n; mặc định đóng (không thuộc tính `open`).
- Nhãn "Bài liên quan" vẫn nguyên trên trang.
- Nội dung ghi chú có mặt dạng HTML tĩnh: "Các nguồn trích trong bài không đưa ra thước đo hay so sánh về chất lượng sản phẩm." (1 lần).

### 2.3. Trang không có `sourceNotes` không sinh khung

`grep -c 'source-notes'` = **0** trên `dist/co-che/chronograph/`, `dist/tu-dien/bien-do/`, `dist/mau-iconic/reverso/`, `dist/huong-dan/do-sai-so/` — không `<details>`, không tiêu đề, không khung rỗng.

### 2.4. Pagefind sau build

Nạp module `dist/pagefind/pagefind.js` bằng Node (vá `fetch` đọc tệp trong `dist/` — script ghi kèm biên bản, chạy lặp lại được, không cần server) và tra từ khóa ghi chú: **trang `/co-che/manufacture-etablisseur/` trả về với nội dung ghi chú có mặt trong index** (`true`). Log: `output/n1-source-notes-audit/pagefind-check.log`.

### 2.5. Trình duyệt (bàn phím, sáng/tối, mobile 390 px)

Chạy `astro preview` trên `dist` + `playwright-cli run-code` (một hàm `run(page)`; log + JSON kết quả tại `output/n1-source-notes-audit/browser-check.log`):

| Phép kiểm | Kết quả |
|---|---|
| Khối tồn tại, đúng 1 | ĐẠT |
| Mặc định đóng (không `open`) | ĐẠT |
| Enter trên `summary` mở | ĐẠT |
| Ghi chú đọc được khi mở (sáng, desktop 1280) | ĐẠT |
| Space đóng lại | ĐẠT |
| Mở được ở chế độ tối (class `dark`) + ghi chú đọc được | ĐẠT |
| Mobile 390 px mở được | ĐẠT |
| Mobile 390 px không tràn ngang (`scrollWidth ≤ 390`) | ĐẠT |

Ảnh chụp (nội bộ `output/n1-source-notes-audit/`): `n1-vi-light-closed-desktop.png`, `n1-vi-light-open-desktop.png`, `n1-vi-dark-open-desktop.png`, `n1-vi-light-open-mobile390.png`, `n1-vi-dark-open-mobile390.png` — đã đối chiếu trực quan: khối đặt ngay trên "Nguồn tham khảo", viền/nền đọc được cả sáng và tối, mobile không tràn, nhãn "Bài liên quan" nguyên vẹn.

### 2.6. Kiểm tổng

| Lệnh | Kết quả |
|---|---|
| `node scripts/scan-chars.mjs` | OK — quét 436 tệp, không ký tự ngoài tiếng Việt/Anh |
| `npm run check` | exit 0 — 225 ca ĐẠT, không LỖI/KHÔNG ĐẠT |
| `npm run build` | exit 0 — 336 trang, 25.371 link, "OK: Không phát hiện link nội bộ hỏng" |
| `git diff --check` | exit 0 |

## 3. Rà diff

`git status`: 8 tệp modified + 2 untracked mới (`src/components/SourceNotes.astro`, `output/n1-source-notes-audit/`) — đúng phạm vi; toàn bộ untracked có trước giữ nguyên. Không có thay đổi nào ngoài danh sách mục 1.

## 4. Điểm cần GPT Work lưu ý

1. **1 hint `ts(6133)` tại `output/playwright/audit-2026-09-25.mjs:17`** — tệp bằng chứng untracked có trước ngày 25/09 (GPT Work đã xác minh và phán để nguyên ở lượt phát hành S1). `check:types` exit 0 (0 lỗi, 0 cảnh báo).
2. Dữ liệu thử **chỉ phía VI** (`manufacture-etablisseur.md`); bản EN cùng bài chưa có `sourceNotes` — đúng phạm vi ("không thêm vào bất kỳ bài nào khác, kể cả bản EN").
3. Nút đổi giao diện sáng/tối của site theo class `dark` trên `<html>`; phép kiểm tối dùng cách thêm class này (kèm ảnh chụp), không đụng CSS toàn cục.

## 5. Trạng thái Git cuối

- Nhánh `main`; HEAD = `origin/main` = `6f19c02` (chưa tạo commit mới).
- `git status`: 8 modified, 0 staged; untracked 102 (100 có trước + `src/components/SourceNotes.astro` + `output/n1-source-notes-audit/`).
- Chưa stage, chưa commit, chưa push.
