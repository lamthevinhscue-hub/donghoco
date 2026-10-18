# BIÊN BẢN A4 — Mô tả trang chủ VI/EN cho kết quả tìm kiếm

**Gói:** A4 — mô tả trang chủ cho kết quả tìm kiếm (đợt 2, được anh Vinh duyệt làm sớm 15/10)
**Danh mục:** DHC-HOAN-THIEN-20261011 v1.0.0
**Câu lệnh:** TXN-20261015-36 (GPT Work chọn A4 và giao câu lệnh 9 mục)
**Ngày giao lệnh:** 15/10/2026 · **Ngày thi công thực tế:** 15/10/2026 (duyệt làm sớm của anh)
**Nền:** `f526a61` = origin/main (đúng nền giao việc)
**Bên thi công:** GLM. Bên nghiệm thu: GPT Work. **Chưa stage, chưa commit, chưa push.**

## 1. Thay đổi theo tệp (8 tệp phạm vi)

1. **`src/i18n/ui.ts`** — thêm đúng 2 khóa mới, không đụng khóa hiện có:
   - khối `vi` (sau siteTagline): `home_meta_description: 'Kiến thức đồng hồ cơ bằng tiếng Việt: bộ máy hoạt động ra sao, lịch sử, thương hiệu và mẫu tiêu biểu, giải thích dễ hiểu và có dẫn nguồn.'` — **137 ký tự**;
   - khối `en` (sau siteTagline EN): `home_meta_description: 'Mechanical watch knowledge in Vietnamese and English: how movements work, watch history, brands and iconic models, explained clearly with sources.'` — **146 ký tự**;
   - `siteTagline` VI/EN giữ nguyên từng ký tự.
2. **`src/layouts/BaseLayout.astro`** — `Props` thêm `meta_description?: string` (kèm chú thích mục đích); destructure thêm (không mặc định); thêm `const homeMetaDescription = meta_description ? truncateMeta(meta_description) : metaDescription;`; **chỉ** thẻ `<meta name="description">` đổi content thành `{homeMetaDescription}`. og:description, twitter:description, JSON-LD (`tr.siteTagline`), title, canonical giữ nguyên. `truncateMeta` không đổi (137/146 < 165 — không cắt).
3. **`src/pages/index.astro`** dòng 130: `<BaseLayout meta_description={tr.home_meta_description}>`.
4. **`src/pages/en/index.astro`** dòng 55: `<BaseLayout meta_description={tr.home_meta_description}>`.
5. **`scripts/check-a4-home-description.mjs`** — mới, 2 chế độ `--root`/`--dist`, arg nghiêm (lạ/thiếu giá trị → exit 1 mã `A4-ARG`):
   - N1 nguồn: tách khối `vi:`/`en:` trong ui.ts (bóc chú thích JS) — 2 khóa đúng nguyên văn + siteTagline VI/EN giữ nguyên;
   - N2 nguồn: hai trang chủ truyền đúng 1 lần `meta_description={tr.home_meta_description}` (bóc chú thích); quét toàn bộ src/pages — không trang khác dùng prop;
   - N3 dist: dist/index.html + dist/en/index.html có đúng 1 meta name="description" trong head **thật** (bóc chú thích HTML), giá trị đúng nguyên văn sau giải mã entity, phân tích theo thuộc tính;
   - N4 dist: quét toàn bộ .html — không trang nào khác nhận nhầm hai câu mới.
6. **`package.json`** — nối `check-a4-home-description.mjs` ngay **trước checker A2** trong `check`; `build` giữ thứ tự **C1 `--dist dist` → A4 `--dist dist` → `check-a3-icons.mjs dist` cuối chuỗi** (A4 ngay trước A3; ràng buộc A3).
7. **`docs/giao-viec/THEO-DOI.md`** — chỉ hàng A4 (chưa stage cùng lượt này).
8. **`docs/nghiem-thu/A4-mo-ta-trang-chu-2026-10-15.md`** — biên bản này.

Bằng chứng, baseline, bộ thử: `output/a4-home-description-audit/` (baseline HTML 2 trang chủ + metadata.json; phuong-an-thi-cong.md; test-a4.mjs; run-kiem-a4.cjs; ảnh a4-*.png) — không đề nghị commit output/.

## 2. Baseline → candidate (so sánh đo thật)

| Trường | VI `/` | EN `/en/` |
|---|---|---|
| meta description | 53 ký tự (tagline) → **137 ký tự (câu mới)** | 90 ký tự (tagline) → **146 ký tự (câu mới)** |
| title | không đổi | không đổi |
| og:description / twitter:description | không đổi (vẫn tagline) | không đổi |
| canonical | không đổi | không đổi |
| hreflang (3) / JSON-LD (1 khối) | không đổi | không đổi |

So sánh tự động baseline/candidate: khác duy nhất trường `meta` ở cả hai trang; title/OG/Twitter/canonical/hreflang/JSON-LD không đổi. Metadata trang khác: N4 quét toàn dist — không trang nào nhận hai câu mới.

## 3. Kiểm (kết quả chạy thật)

| Kiểm | Kết quả |
|---|---|
| `npm run check` (gồm checker A4 nguồn nối trước A2) | exit 0 |
| `npm run build` đầy đủ (A4 `--dist dist` nối trước C1 dist; A3 dist cuối giữ nguyên) | exit 0 — log có cả hai dòng "DAT bo kiem A4" (nguồn + dist meta description đúng nguyên văn) |
| `astro check` | 0 lỗi / 0 cảnh báo / **6 hints** (baseline; đã dọn 1 hint `statSync` không dùng phát sinh từ checker A4) |
| Checker A4 nguồn + dist (chạy lẻ) | exit 0 |
| Bộ thử `test-a4.mjs` — LỊCH SỬ v1: 8/8 (6 mutation + 2 lượt sạch) — **không đủ theo TXN-37/38; xem mục 6 hiện hành 14/14** |
| Hai diff-check | exit 0 |
| Trình duyệt — LỊCH SỬ v1 (kịch bản cũ: theme sau tải, thiếu xác minh dark/nền, bỏ qua EN): kết quả này KHÔNG dùng làm bằng chứng; xem mục 6 trình duyệt v2 hiện hành | (lịch sử) |

Bài học ghi cho vòng sau: kịch bản chuyển ngôn ngữ phải đi theo switcher nội bộ tương đối (`a[href^="/en"]`) — lần đầu đi theo hreflang canonical (URL production tuyệt đối) dẫn sang production chưa có A4 và so sai giả; đã sửa và chạy lại.

## 4. Phạm vi phát hành đề nghị — đúng 8 tệp (chờ GPT Work chốt)

1. `src/i18n/ui.ts`
2. `src/pages/index.astro`
3. `src/pages/en/index.astro`
4. `src/layouts/BaseLayout.astro`
5. `scripts/check-a4-home-description.mjs`
6. `package.json` — chỉ 2 chỗ nối checker A4
7. `docs/giao-viec/THEO-DOI.md` — chỉ hàng A4 (blob riêng trên nền HEAD)
8. `docs/nghiem-thu/A4-mo-ta-trang-chu-2026-10-15.md`

Biên bản A2/A3/C1-B2 và các hàng sổ ngoài A4 giữ nguyên trạng thái chưa commit, không nằm trong phạm vi này.

## 5. Điểm chưa kiểm / giới hạn bằng chứng

- Chưa kiểm iPhone thật; không cần thử lại video (A4 không đụng).
- Chưa nghe/phát anything ngoài tiêu chí — A4 chỉ đụng head metadata.
- Google có hiển thị nguyên văn hai câu hay không do Google quyết — câu lệnh cấm cam kết.

## 6. Vòng sửa theo tái nghiệm thu TXN-20261015-37 (CHƯA ĐẠT → đã sửa)

GPT Work xác nhận phần thay mô tả đúng (build 361 trang exit 0, chỉ meta description đổi, bộ thử 6+2 đạt) nhưng chỉ ra 4 thiếu sót có bằng chứng (probe `gpt-probe-a4.mjs`): checker nguồn nhận prop trong chú thích HTML; checker dist nhận meta giả trong `<script type="application/json">` (regex trên toàn chuỗi head); bộ thử trình duyệt dark giả (emulateMedia sau load, ảnh sáng/tối giống hash) và bỏ qua `so_sanh.dung_cau` của EN; chưa đối chiếu metadata các trang khác với baseline (N4 không thay được phép so). Kèm: A4 dist phải đặt ngay trước A3 dist cuối.

Đã sửa:

1. **Checker v2:** tách `.astro` thành frontmatter/markup — frontmatter bóc chú thích JS, **markup bóc chú thích HTML**; prop CHỈ tính trong markup có hiệu lực (probe "prop trong chú thích HTML + `<BaseLayout>` trống" giờ FAIL đúng); quét trang khác áp cùng cách (không báo lỗi vì prop chỉ trong chú thích). **Dist đọc DOM thật bằng parse5** (có sẵn node_modules, không thêm dependency): chỉ phần tử `<meta>` trong `<head>` tính; KHÔNG duyệt vào script/template — meta giả trong script JSON/body/chú thích không tính; N3/N4 cùng cách đọc; giữ đúng 1 thẻ, giá trị giải mã entity, theo thuộc tính. Probe của GPT Work giờ FAIL đúng cả hai.
2. **Bộ thử v3 (hiện hành): 14/14 ĐẠT** — lượt sạch trước + **9 mutation**: M1 VI trả **đúng tagline cũ** (không kèm "(bị sửa)" — theo TXN-38); M2 EN thay VI; M3 siteTagline sửa; M4 meta chỉ còn trong chú thích HTML (N3); M5 hai meta (N3); M6 câu mới áp nhầm trang khác (N4); M7 prop chỉ còn trong chú thích HTML → N2; M8 meta chỉ trong script JSON → N3; M9 meta chỉ trong body → N3; **2 lượt sạch đối chứng**: đổi thứ tự thuộc tính (content trước name — checker theo thuộc tính, PASS) và meta giả trong script của trang khác (không rò, PASS); lượt sạch cuối. Mỗi lượt đối chứng **hoàn nguyên tệp từ bak + xác minh SHA trước lượt sạch cuối** (sửa theo TXN-39/40). Cleanup finally + SHA src/dist; không mutate repo thật. Log trình duyệt và hai phép tự kiểm lưu ổn định tại `output/a4-home-description-audit/log-cli/`.
3. **Bộ thử trình duyệt v2 (`run-kiem-a4.cjs`):** theme đặt **trước khi tải trang** (emulateMedia persists qua goto); xác minh `class="dark"` trên `<html>` và **màu nền body tính toán khác nhau** giữa sáng/tối (không chỉ ghi nhãn); điều kiện đạt kiểm **cả câu VI lẫn câu EN** (EN sai → bộ thử thất bại); switcher nội bộ `a[href^="/en"]` **bắt buộc** (không fallback — thiếu switcher là FAIL); route `/en/` xác nhận; lọc lỗi nền tảng theo `location().url`. Kết quả chạy: dat=true — VI 137/EN 146 ký tự đúng, dark class + nền khác thật, 0 lỗi console gói; kết quả trình duyệt cũ (v1) đánh dấu lịch sử.
4. **Đối chiếu metadata ngoài trang chủ (mục 5 câu lệnh):** dựng bản sao sạch nền `f526a61` (git worktree + junction node_modules) → build đầy đủ exit 0 → so metadata **toàn bộ 361 route** (title/meta/og/twitter/canonical/hreflang/JSON-LD): **khác duy nhất trường `meta` của đúng 2 trang chủ; ngoài 2 trang chủ: 0 khác biệt** (`doi-chieu-metadata-ngoai-trang-chu.json`). N4 chỉ là lưới chống rò hai câu mới, không thay phép so này.
5. **package.json:** xác nhận/thiết lập thứ tự **C1 dist → A4 `--dist dist` → A3 dist cuối** (A4 ngay trước A3 như câu lệnh gốc TXN-36; C1 đầy đủ phía trước).

Kiểm cuối vòng: `npm run check` exit 0; `npm run build` exit 0 (A4 nguồn + A4 dist DOM trong chuỗi); astro check 0/0/6; hai diff-check exit 0; 14 MP4/58 tài sản không đụng. Worktree bằng chứng nền cũ: `output/a4-home-description-audit/worktree-base/` (dist base) + `build-base.log` — giữ cho kiểm độc lập, không commit; sẽ dọn sau khi gói khép.

## 7. Vòng sửa theo tái nghiệm thu TXN-20261015-38 (CHƯA ĐẠT → đã sửa — chỉ bộ thử trình duyệt + hồ sơ)

GPT Work phát hiện tệp `run-kiem-a4.cjs` trên đĩa vẫn là bản v1 (lần ghi v2 thất bại âm thầm — Write bị chặn "file modified" nhưng không được phát hiện): dòng 28 fallback `/en/`, dòng 43 theme sau tải, dòng 52 bỏ qua `so_sanh.dung_cau` của EN; ảnh sáng/tối giống byte. Câu lệnh: sửa và LƯU bản thật, chạy lại từ chính tệp vừa lưu, tự kiểm EN sai/thiếu switcher phải thất bại, đồng bộ hồ sơ.

Đã sửa:

1. **`run-kiem-a4.cjs` v2 (bản thật trên đĩa, `node --check` qua):** kết luận chung bắt buộc kiểm **cả câu VI lẫn câu EN** (`dieu_kien.vi_dung_cau` + `en_dung_cau`); **thiếu switcher nội bộ → THẤT BẠI** (không fallback — trả lý do "không tìm thấy switcher nội bộ"); theme đặt **trước khi tải** + xử lý trạng thái theme lưu trước đó (xóa `localStorage.theme`, tái áp class `dark` theo prefers-color-scheme); xác minh `class="dark"` trên `<html>` và **màu nền body tính toán** khác nhau giữa sáng/tối; xác nhận route `/en/`; chụp lại 4 ảnh 390px.
2. **Kết quả chạy thật từ chính tệp vừa lưu** (lưu `/tmp/a4-browser7.log`): dat=true với đủ 8 điều kiện — VI 137 ký tự đúng (sáng: nền rgb(251,251,248), dark_class=false; tối: rgb(17,21,25), dark_class=true), EN 146 ký tự đúng qua switcher `/en/` route `/en/`, 1 meta/trang, 0 lỗi console gói; 4 ảnh chụp lại.
3. **Tự kiểm 2 phép (chạy thật):** bản inject CAU_EN sai → `"dat":false`; bản mô phỏng thiếu switcher → "THẤT BẠI: không tìm thấy switcher nội bộ". Cả hai đúng kỳ vọng.
4. **Hồ sơ đồng bộ:** mục 3 bảng kiểm trình duyệt gắn nhãn LỊCH SỬ v1 (mục này); mục 6 ghi kết quả chạy mới từ tệp thật; mục 1 sửa đúng thứ tự build C1 → A4 → A3; mục 4 liệt kê đúng 8 tệp phát hành. Nhãn bộ thử đúng **9 mutation + 2 lượt sạch + 2 lượt đối chứng + 1 lượt xác minh toàn bộ = 14/14**, các lượt đối chứng hoàn nguyên **trước** lượt sạch cuối.

Không build lại (mã phát hành không đổi; build độc lập TXN-38 của GPT Work exit 0 vẫn áp dụng).

## 8. Phát hành và kiểm production (khép gói)

- **Commit `1aaf8e99124351e1ee1d68191843e98b7d5f9403`** "feat(home): add vi/en meta description for homepages" — push main `f526a61..1aaf8e9`, đối chiếu ls-remote khớp. Đúng 8 tệp theo phép; THEO-DOI stage dạng blob riêng chỉ THAY hàng A4 trên nền HEAD (dòng "Hoàn tất", ghi "commit A4 này" thay self-hash).
- **Kiểm production sau deploy (15/10/2026):** `/` meta description = câu VI nguyên văn 137 ký tự; `/en/` = câu EN nguyên văn 146 ký tự — đúng hai câu đã duyệt.
- **Sổ điều phối:** record-acceptance A4 = `1aaf8e9` pushed=true; mark-package A4 da_hoan_tat (đi đủ chuỗi qua chờ nghiệm thu). Giao dịch báo cáo sau phát hành không phát sinh (pre-flight chặn đúng quy tắc gói hoàn tất).
- Google có hiển thị nguyên văn hai câu hay không do Google quyết — không cam kết (theo câu lệnh).
