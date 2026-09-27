# T3 — Dịch phần tiếng Anh còn thiếu (15 cặp) — Biên bản thực hiện

- Giao dịch: TXN-20260926-290, danh mục DHC-GD3-20260925 v1.0.0, gói T3
- Ngày thực hiện: 27/09/2026; nền repo: `1813229` (= origin/main khi bắt đầu)
- Trạng thái: **VÒNG SỬA HẸP T3-10 (TXN-20260926-292) XONG — DỪNG CHỜ TÁI
  NGHIỆM THU — chưa stage, chưa commit, chưa push**

## 1. Phạm vi đã làm

Tạo đúng 15 tệp EN (10 mục từ điển dưới `src/content/tuDien/en/`, 5 bài cơ chế
dưới `src/content/coChe/en/`), khai báo đủ 15 cặp trong
`src/i18n/contentRoutes.ts`, thêm checker `scripts/check-t3-en-completeness.mjs`
nối vào cuối `npm run check` và cuối `npm run build`. Không sửa bất kỳ tệp VI
nào, không đụng schema, template, CSS, `term_fr`/`term_de`, T2, ảnh, CSP.

## 2. Bảng 15 cặp

| # | Collection | Slug VI | Route VI | Slug EN | Route EN |
|---|-----------|---------|----------|---------|----------|
| 1 | tuDien | bezel | /tu-dien/bezel | bezel | /en/glossary/bezel/ |
| 2 | tuDien | cau-may | /tu-dien/cau-may | bridge | /en/glossary/bridge/ |
| 3 | tuDien | day-vo | /tu-dien/day-vo | caseback | /en/glossary/caseback/ |
| 4 | tuDien | khoa-day | /tu-dien/khoa-day | clasp | /en/glossary/clasp/ |
| 5 | tuDien | lo-may | /tu-dien/lo-may | skeleton | /en/glossary/skeleton/ |
| 6 | tuDien | microbrand | /tu-dien/microbrand | microbrand | /en/glossary/microbrand/ |
| 7 | tuDien | ngua | /tu-dien/ngua | pallet-fork | /en/glossary/pallet-fork/ |
| 8 | tuDien | poincon-de-geneve | /tu-dien/poincon-de-geneve | geneva-seal | /en/glossary/geneva-seal/ |
| 9 | tuDien | vat-canh | /tu-dien/vat-canh | anglage | /en/glossary/anglage/ |
| 10 | tuDien | vau-day | /tu-dien/vau-day | lug | /en/glossary/lug/ |
| 11 | coChe | bo-may-in-house | /co-che/bo-may-in-house | in-house-movements | /en/mechanisms/in-house-movements/ |
| 12 | coChe | bo-thoat-dong-truc | /co-che/bo-thoat-dong-truc | co-axial-escapement | /en/mechanisms/co-axial-escapement/ |
| 13 | coChe | da-quang | /co-che/da-quang | lume | /en/mechanisms/lume/ |
| 14 | coChe | hien-thi-ngay | /co-che/hien-thi-ngay | date-display | /en/mechanisms/date-display/ |
| 15 | coChe | kinh-dong-ho | /co-che/kinh-dong-ho | watch-crystals | /en/mechanisms/watch-crystals/ |

Không trùng slug/route với bài EN nền (checker T3-1, T3-2 xác nhận; 97 cặp trong
ARTICLE_PAIRS sau gói, route EN duy nhất).

## 3. Số từ thân bài bản EN (phương pháp N2: bỏ frontmatter, code, URL, dấu
Markdown; giữ chữ trong link)

bezel 210 · bridge 239 · caseback 210 · clasp 273 · skeleton 273 ·
microbrand 226 · pallet-fork 255 · geneva-seal 228 · anglage 247 · lug 262 ·
in-house-movements 469 · co-axial-escapement 535 · lume 544 · date-display 571 ·
watch-crystals 537 — tất cả ≥ 150 (T3-5).

## 4. Thay đổi theo tệp

Mới (16):
- `src/content/tuDien/en/{bezel,bridge,caseback,clasp,skeleton,microbrand,pallet-fork,geneva-seal,anglage,lug}.md` (10)
- `src/content/coChe/en/{in-house-movements,co-axial-escapement,lume,date-display,watch-crystals}.md` (5)
- `scripts/check-t3-en-completeness.mjs` (1)

Sửa (2):
- `src/i18n/contentRoutes.ts`: +17 dòng (15 cặp kèm 2 dòng chú thích "T3"),
  đặt sau khối H14-B (cơ chế) và sau khối P0-D2 (từ điển)
- `package.json`: nối `node scripts/check-t3-en-completeness.mjs` vào cuối
  script `check`, nối `node scripts/check-t3-en-completeness.mjs dist` vào cuối
  script `build` (diff chỉ 2 dòng script, không tái định dạng)

Nội bộ, không phát hành: `output/t3-en-coverage-audit/` (build-full.log,
build-repro.log, check-full.log, check-types.log, kiem-t3-source.log,
kiem-t3-dist.log, scan-chars.log, mutation-t3.mjs, mutation-t3.log.txt,
do-so-lieu.mjs).

## 5. Quy ước dịch áp dụng

- Dữ kiện, ví dụ thương hiệu, con số và URL nguồn giữ nguyên từ bài VI; nhãn
  nguồn dịch sang tiếng Anh khớp trang đích; không thêm năm/calibre/thông số/
  thương hiệu/nguồn mới.
- `sourceNotes` (≥1 ghi chú mỗi bài) chuyển các giới hạn nguồn của bài VI: ví dụ
  co-axial (khoảng thay dầu 3–5 năm, thương mại hóa 1999, George Daniels là dữ
  kiện carried over từ nguồn Omega), geneva-seal (2 điều kiện + 12 tiêu chí,
  không trích nguyên văn toàn văn quy định), date-display (cửa sổ ăn khớp ~20h–4h),
  microbrand (guide dẫn trong bài chỉ có bản tiếng Việt nên nhắc tên không gắn link).
- Bản EN tắt infographic: `has_infographic: false`, `interactive: false` — theo
  quy ước sẵn có của `MechanismArticle.astro` ("Bản tiếng Anh: ẩn infographic").
  Hai blockquote ✅/💡 trong bài co-axial VI (bình luận theo hoạt ảnh) không
  chuyển sang EN vì EN không hiển thị hoạt ảnh.
- Link nội bộ trong bài EN chỉ trỏ route EN đã có cặp (gồm cả cặp mới của gói
  này); đích chưa dịch (NOMOS Tangente, guide microbrand) giữ nhắc tên bằng chữ,
  ghi rõ "in Vietnamese", không gắn link về route VI (T3-8 kiểm trên dist).
- `relatedModels` không đặt trong 5 bài cơ chế EN (đích chưa có cặp EN hoặc đã
  diễn đạt trong thân bài) — đồng bộ với bài EN nền như moon-phase.
- Không gắn `term_fr`/`term_de` ở vòng này. `term_en` chép nguyên từ bài VI.

## 6. Checker T3 (scripts/check-t3-en-completeness.mjs)

T3-1 bảng ánh xạ 15 cặp + slug khớp; T3-2 trọn vẹn bảng cặp (mọi tệp EN đều có
cặp, trừ whitelist 1 trang legacy `tuDien/en/escapement.md` — trang tương thích
không có bản VI từ G06-C; xóa/đổi cặp nền nào cũng bị bắt); T3-3 URL nguồn
khớp VI đúng thứ tự; T3-4 sạch tiếng Việt (thân bài + nhãn nguồn; danh sách tên
riêng đồng bộ check-english-launch, thêm đúng 1 cụm: tiêu đề guide tiếng Việt
được trích nguyên văn trong bài microbrand — kèm tự kiểm mỗi lần chạy);
T3-5 ≥150 từ; T3-6 term_en/category/difficulty đồng bộ, sourceNotes hiện diện,
EN tắt infographic; T3-7 dist: 1 H1, canonical, hreflang en/vi và TẤT CẢ nút
chuyển ngôn ngữ (header/footer/panel) hai chiều đúng cặp; T3-8 mọi link nội bộ
trong `<article>` là route /en/ tồn tại; T3-9 source-notes render trước
source-list; T3-10 Pagefind lập chỉ mục (giải nén 322 fragment .pf_fragment,
tìm đúng trang) + sitemap đủ 15 URL.

Chạy: không tham số = kiểm nguồn; `dist` = nguồn + dist. Biến môi trường
`T3_ROOT`/`T3_DIST` phục vụ mutation trên bản sao ngoài repo.

## 7. Kết quả kiểm

| Lệnh | Kết quả |
|---|---|
| `npm run check:types` | exit 0 — 0 errors, 0 warnings, 4 hints (= baseline, không thêm hint) |
| `npm run check` (40 lệnh + T3 nguồn) | exit 0 |
| `npm run build` (check + astro build + 21 checker dist + T3 dist) | exit 0 — log `output/t3-en-coverage-audit/build-full.log` (4306 dòng) |
| `check-t3-en-completeness.mjs` (nguồn) | ĐẠT — 61 dòng ĐẠT, log kiem-t3-source.log |
| `check-t3-en-completeness.mjs dist` | ĐẠT — 123 dòng ĐẠT, log kiem-t3-dist.log |
| `node scripts/scan-chars.mjs` | OK — 459 tệp |
| `git diff --check` / `git diff --cached --check` | sạch cả hai |
| check-english-launch (trong build) | ĐẠT — "English launch pack đúng kiến trúc đa ngôn ngữ" trên toàn bộ 114 trang EN (99 cũ + 15 mới) |
| check-k4 (trong build) | ĐẠT — "46 href duy nhất /en/glossary/ — đủ 46 mục" (36+10) |

Số đo dist (output/t3-en-coverage-audit/do-so-lieu.mjs): 355 tệp HTML
(114 trang /en/ = 99 + 15), 25.850 href, sitemap 354 URL /en/glossary chiếm 47
(46 mục + 1 index), Pagefind 322 fragment (+15 so với 307).

## 8. Mutation (bản sao `%TEMP%\t3-sandbox-*`, log mutation-t3.log.txt)

7/7 ca fail đúng mã kiểm, hoàn nguyên byte-đối-byte (so sha256), chạy sạch trong
từng ca exit 0, chạy sạch cuối exit 0. Ca chỉ ĐẠT khi đồng thời ba điều kiện:
fail đúng mã + hash khớp sau hoàn nguyên + cleanExit = 0:

- M1 bỏ cặp route /tu-dien/bezel khỏi ARTICLE_PAIRS → T3-2
- M2 làm sai URL nguồn trong geneva-seal.md → T3-3
- M3 chèn câu tiếng Việt thật vào thân bài lume.md → T3-4
- M4 phá nút chuyển ngôn ngữ trên dist bezel (đổi href cả 3 nút) → T3-7
- M5 phá canonical trên dist bezel → T3-7
- M6 làm sai URL sitemap của /en/glossary/bezel/ trong tệp sitemap → T3-10
- M7 xoá nội dung sourceNotes khỏi fragment Pagefind của đúng route (giải nén,
  thay content, nén lại) → T3-10

## 8b. Vòng sửa hẹp T3-10 (TXN-20260926-292) — chỉ đụng checker + mutation

**Báo cáo lỗi của nghiệm thu độc lập**: `check-t3-en-completeness.mjs dist` FAIL
T3-10 cho cả 15 cặp với `pagefind=false, sitemap=false`, trong khi kiểm trực
tiếp thấy `dist/sitemap-0.xml` có URL và fragment có nội dung sourceNotes.

**Tái lập**: trên dist hiện tại và trên lượt build lại từ đầu (`rm -rf dist &&
npm run build`) — cả hai đều PASS, không tái lập được trạng thái lỗi. Suy ra lỗi
nằm ở độ nhạy của logic T3-10 với biến thể dist/môi trường, không phải dist bị
thiếu dữ kiện. Bốn điểm yếu tiềm ẩn được tìm thấy trong logic cũ:

1. Danh sách tệp sitemap CỐ ĐỊNH `['sitemap.xml','sitemap-0.xml','sitemap-1.xml']`
   — build tách sitemap khác (sitemap-2…, tên khác) → toàn bộ URL đọc là thiếu
   → `sitemap=false` cho cả 15 cặp, đúng chữ ký báo lỗi.
2. Đường dẫn fragment CỐ ĐỊNH `dist/pagefind/fragment` — bố cục thư mục khác
   của pagefind → map rỗng → `pagefind=false` cho cả 15 cặp.
3. Chỉ dò 1 probe 6 từ từ ghi chú nguồn ĐẦU TIÊN, khóa map theo URL nguyên dạng
   (kèm dấu "/") — Pagefind cắt/thường hóa nội dung hoặc URL khác dấu "/" cuối
   là hỏng phép dò.
4. Khi fail không in bất kỳ bằng chứng nào về những gì đã tìm — không thể đối
   chiếu với dist thật.

**Sửa (tiêu chí cứng giữ nguyên, không miễn kiểm)**:

- Sitemap: đọc MỌI tệp khớp `sitemap*.xml` trong dist (readdirSync, không cố
  định tên/số phần), gom tập `<loc>` và so khớp đã chuẩn hóa dấu "/" cuối.
- Pagefind: quét ĐỆ QUY mọi `*.pf_fragment` dưới `dist/pagefind`, giải nén,
  khóa map theo URL đã chuẩn hóa; dò probe từ MỌI ghi chú nguồn × độ dài
  6/4/3 từ (chống cắt nội dung).
- Khi fail, dòng lỗi in kèm chẩn đoán: `dist/pagefind` có hay thiếu, số fragment
  đọc được/số lỗi, route có trong map hay không, danh sách tệp sitemap và số
  `<loc>` — lần sau có mismatch sẽ tự chỉ ra nguyên nhân.

**Mutation bổ sung 2 ca T3-10 (M6, M7)** như mục 8; cả hai fail đúng T3-10.
Kịch bản mutation nâng cấp: mutation hoạt động mức Buffer (fragment phải giải
nén/sửa/nén lại), mỗi ca in rõ cleanExit, và KHÔNG tính ĐẠT nếu cleanExit ≠ 0.

**Chạy lại sau sửa** (mục 7, lượt mới): check exit 0 (check:types 0/0/4
baseline); build exit 0 (build-full.log); checker dist trực tiếp exit 0;
mutation 7/7 ĐẠT trên sandbox copy chính dist cuối; scan-chars exit 0;
`git diff --check` và `git diff --cached --check` sạch.

## 9. Điểm chưa giải quyết / giới hạn ghi nhận

- N2 (check-n2-editorial-voice) không áp cho 15 tệp mới (ngưỡng R1–R4 chỉ chạy
  với date ≥ 2026-10-01 hoặc trong DANH_SACH_N3); bài mới vẫn tránh sẵn các cụm
  cấm N2 và heading "Limits".
- Số từ T3-5 đếm theo phương pháp N2, tính cả phần "Related reading"; khối
  sourceNotes nằm ở frontmatter nên không tính vào số từ.
- "Pagefind lập chỉ mục" được chứng minh bằng giải nén fragment (gzip JSON) và
  tra nội dung ghi chú nguồn trong fragment của đúng trang — tương đương trạng
  thái được index, không chạy trình duyệt.
- Phần EN của trang danh mục tự động gồm bài mới (không cần sửa index);
  `/en/glossary` có bộ lọc nhóm K4 hoạt động với 46 mục.

## 10. Trạng thái Git

- Tracked sửa: `package.json`, `src/i18n/contentRoutes.ts`
- Untracked mới trong phạm vi: 15 tệp nội dung EN + `scripts/check-t3-en-completeness.mjs`
- Untracked nội bộ: `output/t3-en-coverage-audit/`, biên bản này, các tệp untracked có trước
- Chưa stage, chưa commit, chưa push
- Đề nghị phát hành: 19 tệp = 15 nội dung EN + 1 checker + contentRoutes.ts +
  package.json + biên bản này (output/ giữ nội bộ)
