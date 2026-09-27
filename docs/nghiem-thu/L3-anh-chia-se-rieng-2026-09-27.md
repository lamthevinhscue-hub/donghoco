# L3 — Ảnh chia sẻ riêng cho mốc lịch sử và mẫu iconic — Biên bản thực hiện

- Giao dịch: TXN-20260926-304 (vòng sửa 1: TXN-20260926-306), danh mục
  DHC-GD3-20260925, gói L3
- Ngày thực hiện: 27/09/2026; nền repo: `156fab4` (= origin/main khi bắt đầu)
- Trạng thái: **VÒNG SỬA 1 XONG — DỪNG CHỜ TÁI NGHIỆM THU — chưa stage, chưa
  commit, chưa push**

## 1. Đã làm gì

Sinh đúng **46 ảnh OG JPEG 1200×630** (32 mốc lịch sử + 14 mẫu iconic active)
lúc build bằng mã nguồn cục bộ; gán OG riêng cho các trang mẫu iconic đích
(14 VI + 9 EN); sửa `og:image:alt` của các trang đích theo tiêu đề riêng của
trang thay cho chuỗi dùng chung. **Orient Bambino là mẫu deferred: không có
ảnh L3, không mapping OG riêng, quay về OG khu vực (`og-mau-iconic.jpg`) +
alt chung — chờ hồ sơ nguồn riêng xác minh năm trước khi được thêm trở lại.**
Không tạo route mới, không đổi nội dung Markdown (trừ không đụng gì), không
đổi schema, timeline data, thứ tự mẫu; không dùng ảnh AI/Internet/ảnh có bản
quyền; không thêm dependency (dùng `sharp` có sẵn trong node_modules qua
astro@7.3.3 — sharp 0.35.4, libvips 8.18.6).

## 2. Nguồn dữ liệu duy nhất

`src/data/l3-share-images.json` — thư mục ảnh (`/images/og/l3`), quy ước tên
tệp (`og-lich-su-{slug}.jpg`, `og-mau-{slug}.jpg`), 15 mẫu kế hoạch (14 active
+ 1 deferred: orient-bambino, `deferredReason: "Chờ hồ sơ nguồn riêng xác
minh năm"`). Không rải hard-code: generator (`scripts/generate-l3-og-images.mjs`)
và checker (`scripts/check-l3-og-images.mjs`) cùng đọc JSON này; 32 mốc lấy
thẳng từ `src/data/timeline.json` (slug, timeLabel, title); năm và tên hiển
thị của mẫu active đọc từ frontmatter VI của chính bài mẫu (title cắt trước
dấu "—", year 4 chữ số). **Đã bỏ hoàn toàn fallback category và
`fallbackModelLabel`** — mẫu active thiếu năm là lỗi dừng build, không có nhãn
nào thay thế năm.

## 3. Thiết kế ảnh

Vector/typographic tự dựng: SVG nội tuyến (nền gradient xanh đêm, mặt số cách
diệu góc phải, thanh đồng thau trái) → sharp render JPEG quality 84, 4:4:4.
Mỗi ảnh có: nhãn site "ĐỒNG HỒ CƠ", năm/thời gian lớn màu đồng thau (mốc dùng
timeLabel, ví dụ "~1510"), tên/tiêu đề trắng xuống dòng tối đa 2 dòng, footer
kienthucdonghoco.vn + nhãn khu vực. Chữ tiếng Việt có dấu render đúng — đã đo
thử trước khi viết: ảnh có chữ mean kênh 243,72 vs nền trống 255,00 (glyph vẽ
thật). Việc sinh quyết định hoàn toàn từ dữ liệu: chạy 2 lần cho 46 hash
sha256 riêng, không đổi (đã kiểm); script xoá ảnh cũ trong thư mục trước khi
ghi (ảnh Orient Bambino cũ đã bị xoá khỏi public và dist).

## 4. Cơ chế chọn OG

`BaseLayout.astro`: trước logic cũ, tra ảnh L3 theo pathname
(`/mau-iconic/<slug>` hoặc `/en/iconic-watches/<slug>`) qua JSON dữ liệu,
**bỏ qua mẫu deferred**; nếu trang thuộc 14 mẫu active → `og:image`,
`twitter:image` trỏ ảnh riêng (VI/EN cùng một file) và `og:image:alt` +
`twitter:image:alt` = tiền tố ngôn ngữ + tiêu đề riêng (`tr.og_share_alt_prefix`
mới trong `src/i18n/ui.ts`: VI "Ảnh chia sẻ: ", EN "Share image: "). Các trang
khác — trong đó có Orient Bambino — đi qua nhánh cũ nguyên vẹn
(`getOgImage` — cover_image > khu vực > mặc định) với alt chung cũ. Không đụng
canonical, hreflang, RSS, schema, meta khác.

## 5. Tệp thay đổi

Mới (2 + 46 ảnh): `src/data/l3-share-images.json`,
`scripts/generate-l3-og-images.mjs`, `scripts/check-l3-og-images.mjs`,
`public/images/og/l3/*.jpg` (46), biên bản này.
Sửa (3): `src/layouts/BaseLayout.astro` (khối chọn OG + alt + lọc deferred,
~20 dòng), `src/i18n/ui.ts` (2 khóa og_share_alt_prefix), `package.json`
(1 dòng: generator chạy trước `astro build` trong script build).
Nội bộ: `output/l3-share-og-audit/` (build-full.log, check-l3-source.log,
check-l3-dist.log, check-types.log, check-full.log, scan-chars.log,
doc-html-thu-cong.log, mutation-l3.mjs, mutation-l3.log.txt).

## 6. Kiểm bắt buộc

| Lệnh | Kết quả |
|---|---|
| `npm run check:types` | exit 0 — 0 errors, 0 warnings, 4 hints (= baseline) |
| `npm run check` | exit 0 |
| `npm run build` | exit 0 — generator sinh lại 46 ảnh trước astro build (build-full.log) |
| checker L3 nguồn | ĐẠT — L3-1..L3-5 (check-l3-source.log) |
| checker L3 dist | ĐẠT — L3-6..L3-8 (check-l3-dist.log) |
| `node scripts/scan-chars.mjs` | OK |
| `git diff --check` / `git diff --cached --check` | sạch cả hai |

Số liệu ảnh: **46 tệp**, tổng ~2.389 KB, lớn nhất `og-lich-su-huygens-hairspring.jpg`
(~68 KB), nhỏ nhất `og-mau-cartier-tank.jpg` (~41 KB). Không còn tệp
`og-mau-orient-bambino.jpg` trong public/ và dist/ (checker xác nhận). Kiểm
HTML dist thủ công: submariner VI/EN (cùng một ảnh, alt hai ngôn ngữ), monaco
VI, zenith-el-primero EN, và 3 trang đối chứng — orient-bambino VI
(`og-mau-iconic.jpg` + alt chung), bo-thoat VI (`og-co-che.jpg`),
glossary/movement EN (`og-default.jpg`) — log `doc-html-thu-cong.log`.

## 7. Checker L3 (hai chế độ)

- Nguồn (L3-1..L3-5): JSON đúng 15 mẫu kế hoạch = 14 active + đúng một mẫu
  deferred là orient-bambino kèm lý do; slug active khớp danh sách phê duyệt
  cứng của checker (không slug thừa/thiếu, slugEn đúng 9 bài EN có thật);
  timeline đúng 32 mốc slug duy nhất; **rule năm: 14 mẫu active đều có year 4
  chữ số từ frontmatter VI — cấm fallback category, cấm
  `fallbackModelLabel`**; 46 định danh ảnh duy nhất; script nối build trước
  `astro build`; JSON không chứa URL ngoài repo; mapping chỉ trỏ bài có thật;
  public/images/og/l3 đúng 46 tệp.
- Dist (L3-6..L3-8): 46 ảnh JPEG thật (đọc SOF) đúng 1200×630, hash riêng
  không trùng, không tệp nghi trống (<20 KB); **23 trang đích** (14 VI + 9 EN)
  og:image tuyệt đối trỏ đúng file riêng + width/height/type + twitter:image
  khớp + alt = tiền tố ngôn ngữ + og:title; **3 trang đối chứng** giữ OG cũ +
  alt chung (bo-thoat, glossary/movement EN, orient-bambino); quét 354 trang —
  không trang nào ngoài tập đích dùng ảnh `/images/og/l3/`.

## 8. Mutation (bản sao %TEMP%\l3-sandbox-*, log mutation-l3.log.txt)

8/8 ca ĐẠT (fail đúng mã, hoàn nguyên byte-đối-byte so sha256, chạy sạch trong
ca và cuối cùng exit 0): MUT-1 xoá một ảnh → L3-6; MUT-2 sửa byte SOF 630→629
→ L3-6; MUT-3 map sai slugVi → L3-1; MUT-4 ảnh L3 vào trang đối chứng → L3-8;
MUT-5 trả alt trang mẫu về chuỗi chung → L3-7; MUT-6 đè ảnh bằng byte ảnh khác
→ L3-6 (hash trùng); **MUT-7 xoá năm của mẫu active (tissot-prx) → L3-1 (rule
năm)**; **MUT-8 đưa `fallbackModelLabel` vào mapping → L3-1 (cấm fallback)**.

## 9. Giới hạn ghi nhận / điểm chưa giải quyết

- **32 thẻ lịch sử chỉ là tài sản chia sẻ thủ công**: mốc chưa có route độc
  lập, không fragment # nào có OG metadata riêng, không tạo cơ chế giả lập
  server-side theo hash — đúng giới hạn đề.
- **6 mẫu chỉ có bản VI** (monaco, grand-seiko-snowflake, seiko-62mas,
  tudor-black-bay, tissot-prx, orient-bambino-deferred) — trong đó 5 mẫu active
  chỉ VI, tổng trang đích 23 (14 VI + 9 EN). Khi EN mở thêm, trang mới tự trỏ
  đúng ảnh (cùng JSON).
- **Orient Bambino chờ hồ sơ nguồn riêng xác minh năm** — khi có hồ sơ, thêm
  lại mapping (bỏ cờ deferred) và build tự sinh bổ sung ảnh cho mẫu này.

## 10. Trạng thái Git

- HEAD = `156fab4` = origin/main; tracked sửa 3 (package.json, ui.ts,
  BaseLayout.astro); untracked mới trong phạm vi: JSON dữ liệu, 2 script,
  46 ảnh, biên bản; output/ nội bộ.
- Chưa stage, chưa commit, chưa push.
- Đề nghị phát hành: 3 tệp sửa + 4 tệp/mục mới trong repo (JSON, 2 script,
  46 ảnh, biên bản) — chốt danh sách sau tái nghiệm thu.
