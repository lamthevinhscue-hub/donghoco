# BIÊN BẢN C4 — GỘP TRANG TỪ ĐIỂN TRÙNG (vòng 3 trên cây tái tạo từ 0702978)

**Gói:** C4 — `/en/glossary/escapement/` trùng `/en/glossary/escape-wheel/` → 308 về đích duy nhất, loại alias khỏi tập công khai
**Danh mục:** DHC-HOAN-THIEN-20261011 v1.0.0 — đợt 2 mở sớm theo lệnh anh Vinh 17/10
**Lịch sử trình:** TXN-61 câu lệnh khảo sát → TXN-62 trình diff (GPT Work góp ý) → TXN-64 trình vòng 2 (GPT Work xác nhận các phần đã đúng + nêu 4 khoảng trống) → **vòng này xử lý trọn 4 khoảng trống trên cây tái tạo mới từ 0702978, trình TXN-65**
**Nền:** `0702978` = origin/main (C3 đã phát hành)
**Bên thi công:** GLM. Bên duyệt diff + nghiệm thu: GPT Work. **Chưa áp diff vào repo thật, chưa stage/commit/push.**

## 1. Khảo sát — bảng ảnh hưởng thực tế (ngày đọc 17/10/2026)

| Đối tượng | Hiện trạng | Ảnh hưởng nếu gộp |
|---|---|---|
| `src/content/tuDien/en/escapement.md` | Bài "tương thích" — thân chỉ dẫn sang escape-wheel, có sẵn `draft: false`, `custom_slug: "escapement"` | Thêm `draft: true` → `getEntriesByLang` (src/lib/content.ts:53 lọc `draft !== true` khi PROD) loại khỏi route/hub/sitemap/Pagefind; **giữ tệp để truy vết** |
| `src/content/tuDien/en/escape-wheel.md` | Bài nội dung maintained, có sẵn liên kết sang /en/mechanisms/escapement/ | Không đổi |
| `/en/glossary/[slug].astro` + `index.astro` | Sinh route + hub từ `getEntriesByLang('tuDien', 'en')` | Tự loại alias khi draft — không sửa template |
| `src/lib/content.ts` | Chứa cơ chế lọc draft sẵn có | Không đổi |
| `astro.config.mjs` | @astrojs/sitemap sinh từ route đã build | Alias hết trang → hết sitemap tự nhiên |
| Pagefind | Index dist sau build | Hết trang → hết kết quả tự nhiên |
| `vercel.json` | **Không có** redirect nào cho glossary/escapement | Thêm 2 mục 308 |
| Liên kết nội bộ tới alias | **4 tệp, 5 liên kết** (anti-magnetism ×2, shock-protection ×1, calibre ×1, incabloc ×1) — cả năm mang nhãn "escapement" và nói về cơ chế | Đổi đích `/en/mechanisms/escapement/` theo phán TXN-62 (không đổi thành escape-wheel chỉ để bỏ alias) |
| Autolink plugin (`remark-glossary-autolink`) | glossary-terms.json **không** tham chiếu alias | Không đổi |
| Checker ràng buộc | regulating-cluster (R7 đòi HTML alias tồn tại — **mâu thuẫn draft, phải đổi**), protection-cluster (3 liên kết bắt buộc trỏ alias — phải đổi), t3-en-completeness (whitelist — giữ vì tệp vẫn tồn tại làm truy vết), english-launch (danh sách bắt buộc có alias — phải gỡ), check-c2-video-learning (chuỗi dist — phải nới cho C4 dist) | Xem mục 2 |

## 2. Đề xuất diff (vòng 3 — chờ GPT Work duyệt lại, chưa áp)

Kịch bản áp tự động: `output/c4-glossary-redirect-audit/apply-c4-diff.mjs <root>` — các bước A, B, C, D, E, E2, E3, F, G; **tự kiểm trọn vẹn (bước A–G đều báo lỗi dừng nếu anchor không khớp)**; **E2 nhúng khối R7 mới inline (không còn đọc tệp `../r7-moi.txt` theo vị trí cây — khoảng trống 4 của TXN-64)**. Phạm vi mã phát hành đề nghị: **12 tệp** — (1) escapement.md, (2) vercel.json, (3–6) 4 tệp nội dung EN (anti-magnetism, shock-protection, calibre, incabloc), (7) check-protection-cluster.mjs, (8) check-regulating-cluster.mjs, (9) check-english-launch.mjs, (10) check-c2-video-learning.mjs, (11) check-c4-glossary-merge.mjs (mới), (12) package.json:

1. `src/content/tuDien/en/escapement.md` — `draft: false` → `draft: true` (thay khóa có sẵn; chèn thêm sẽ tạo duplicated YAML key vỡ build — đã va thật ở sandbox).
2. `vercel.json` — 2 redirect **308 thuần** (chỉ 3 khóa source/destination/permanent — không `has`/`missing`/`regex`, không trùng source, không wildcard): `/en/glossary/escapement` và `/en/glossary/escapement/` → `/en/glossary/escape-wheel/`.
3. 4 tệp nội dung EN — **cả 5 liên kết đều sang `/en/mechanisms/escapement/`** (phán TXN-62). Giữ nguyên câu chuyên môn, chỉ thay đích; không thêm khẳng định mới về chống sốc/bánh thoát.
4. `scripts/check-protection-cluster.mjs` — 3 liên kết bắt buộc đổi đích sang `/en/mechanisms/escapement/`; giữ mapping truy vết cho tệp escapement.md (vẫn tồn tại dạng draft).
5. `scripts/check-regulating-cluster.mjs` — R7 đổi nghĩa: kiểm vercel.json có redirect 308 vĩnh viễn cho cả hai biến thể alias → đích, ghi rõ "HTML alias đã loại khỏi build".
6. `scripts/check-english-launch.mjs` — gỡ alias khỏi danh sách trang EN bắt buộc.
7. `scripts/check-c2-video-learning.mjs` — N5 nới chuỗi dist: cho phép C4 dist đứng giữa C2 dist và A3 dist (không đổi điều kiện nguồn C2).
8. `scripts/check-c4-glossary-merge.mjs` — **checker C4 mới** (nguồn + `--dist` + `--nen` tùy chọn): `C4-ARG` tham số bắt buộc có giá trị, không crash; N1 mỗi source alias **đúng 1 mục**, đích đúng, `permanent: true`, **cấm điều kiện kèm** (`has`/`missing`/`scheme`/`host`…), cấm `regex`, cấm source lạ; **N2 đọc draft từ FRONTMATTER thật** (giữa `---` mở và `---` đóng; draft ở thân bài không được tính — mutation M14 bắt đúng); **N3 thiếu tệp nội dung = FAIL** (M15 bắt đúng); N4 trang đích tồn tại, frontmatter không draft; **D2 đọc sitemap-index**: mọi sitemap con được tham chiếu phải tồn tại (M16 bắt đúng), không chứa alias, ít nhất một con chứa trang đích; **D3 hub đối chiếu TẬP THẺ** (href `/en/glossary/<slug>/`) đủ và đúng tập slug công khai, không chỉ tìm chuỗi alias (M17 bắt đúng); D4 tripwire chuỗi pagefind/*.js|json — **bằng chứng Pagefind thật do kịch bản kiểm riêng đảm nhiệm (mục 3), rule này không được ghi là đã chứng minh Pagefind sạch**; D5 tập route `/en/glossary/` khớp 1-1 tập slug; **D6 (khi có `--nen`)**: đối chiếu TOÀN BỘ tập route (.html) với nền 0702978 — chỉ được mất đúng route alias, không mất/thêm route khác (M18 bắt đúng).
9. `package.json` — C4 nguồn **đúng một lần ngay trước C2 nguồn**; C4 `--dist dist` chạy thật sau dựng, **trước A3 dist cuối** (giữ các thứ tự đã duyệt).
10. Giữ nguyên: escape-wheel.md, bài VI, t3 whitelist, SearchInline/SearchBox, schema.

## 3. Kiểm trên cây tái tạo mới từ 0702978 (đáp 4 khoảng trống TXN-64)

**Tái tạo:** `dung-cay.mjs <đích>` sao chép đúng **1.952 tệp git-tracked** từ HEAD `0702978` + junction node_modules → `apply-c4-diff.mjs sandbox` áp diff → sinh checker F. **Không chỉnh tay sandbox sau áp.**

**Đối chiếu byte (khoảng trống 4):** 11 tệp diff (trừ checker F) **khớp byte 11/11** với cây đã kiểm vòng trước — diff nguồn tái tạo đúng trạng thái đã duyệt.

**Chuỗi kiểm 4 bước** (sandbox, tất cả exit 0):

1. `npm run check` (lần 1) — mọi checker cũ ĐẠT (R7 mới, protection đổi đích, english-launch gỡ alias, C2 N5 nới chuỗi, t3 giữ whitelist); astro check **0 lỗi / 0 cảnh báo / 7 hints**.
2. `npm run build` — dist mới: alias không có bài, đích có, **360 trang** so với nền repo dist **361 trang = đúng trừ một alias**.
3. `npm run check` (lần 2, trên dist mới) — exit 0.
4. `node scripts/check-c4-glossary-merge.mjs --dist dist --nen <dist repo 0702978>` — ĐẠT (D1–D6, trong đó D6 đối chiếu route nền).

**Bộ thử âm tính `test-c4.mjs` v2: 20/20 ĐẠT** exit 0 (`log-cli/bo-thu-c4.log`) — 2 lượt sạch riêng (nguồn; dist+nền) + **18 mutation**, tất cả trong cùng khuôn: snapshot mọi tệp bị đụng (kể cả `dist/pagefind/*.js`) chụp lúc nạp, mutate → checker → đối chiếu dòng chẩn đoán chính thức → phục hồi từ bản sao gốc → **so byte/SHA ngay sau từng ca**; crash/timeout = ca thất bại; đối chiếu toàn bộ vùng thử trước lượt sạch cuối; không còn bước "dọn chuỗi Pagefind" ngoài khuôn.

| Ca | Mutation | Rule bắt |
|---|---|---|
| M1 | thiếu redirect | C4-N1 |
| M2 | permanent:false | C4-N1 |
| M3 | sai đích | C4-N1 |
| M4 | alias chèn sitemap con | C4-D2 |
| M5 | mất trang đích | C4-N4 |
| M6 | alias hồi draft:false | C4-N2 |
| M7 | khôi phục liên kết alias (incabloc) | C4-N3 |
| M8 | thiếu sitemap-index | C4-D2 |
| M9 | hub chèn liên kết alias | C4-D3 |
| M10 | Pagefind chèn alias (file js — có trong snapshot) | C4-D4 |
| M11 | gọi checker thiếu giá trị `--root` | C4-ARG |
| M12 | redirect trùng source khác đích (xung đột) | C4-N1 |
| M13 | redirect kèm điều kiện `has: host` | C4-N1 |
| M14 | draft chỉ ở thân bài, ngoài frontmatter | C4-N2 |
| M15 | thiếu tệp nội dung (calibre.md) | C4-N3 |
| M16 | sitemap con thiếu nhưng index còn trỏ | C4-D2 |
| M17 | hub mất thẻ một bài công khai (cả 2 href escape-wheel) | C4-D3 |
| M18 | mất route ngoài alias (movement/index.html) | C4-D6 |

**Kiểm Pagefind THẬT (khoảng trống 1) — `kiem-pagefind-that.mjs`: ĐẠT** (`log-cli/kiem-pagefind-that.log`): phục vụ `sandbox/dist` qua HTTP localhost tạm; chạy **API tìm kiếm thật của Pagefind** (import pagefind.js, vá fetch ánh xạ về server); tra `"escapement"` → 15 kết quả, tra `"escape wheel"` → 6 kết quả — **0 URL alias** trong cả hai; chuẩn hóa pathname từ dữ liệu kết quả; `GET /en/glossary/escape-wheel/` → **200**; `GET /en/glossary/escapement/` → **404 trên dist tĩnh** (308 do Vercel đảm nhiệm khi phát hành). D4 trong checker chỉ là tripwire chuỗi — bằng chứng Pagefind sạch là kịch bản này.

**Giới hạn ghi nhận đúng thực tế:** HTTP 308 trên production Vercel và tra Pagefind trên production **chưa kiểm** — làm ở vòng áp sau phát hành theo câu lệnh; kiểm trình duyệt UI hub làm khi áp.

## 4. Phản hồi GPT Work — xử lý qua các vòng

**TXN-62 (6 nhóm, vòng 2 khép):** R7 đổi nghĩa kiểm redirect 308 ✓; câu kiến thức ngoài phạm vi gỡ + cả 5 liên kết → mechanisms ✓; nối package.json đúng thứ tự ✓; checker bổ sung D2/D3/D4/D5/ARG ✓ (nâng tiếp ở vòng 3); hồ sơ đồng bộ ✓.

**TXN-64 (4 khoảng trống, vòng này):**

| Khoảng trống | Xử lý vòng 3 |
|---|---|
| 1. Pagefind phải kiểm thật qua API trên dist phục vụ HTTP (quét chuỗi .js/.json không đủ — 327 .pf_fragment nhị phân) | `kiem-pagefind-that.mjs`: API Pagefind thật + HTTP localhost — ĐẠT (mục 3); D4 hạ vai trò tripwire, biên bản không ghi D4 là bằng chứng Pagefind sạch |
| 2. M10/M12/M13 ngoài khuôn; Pagefind js không nằm trong snapshot; dọn chuỗi ở cuối | test-c4 v2: mọi ca trong khuôn `ca()` (exit + dòng chẩn đoán chính thức + từ chối crash/timeout); snapshot gồm pagefind/*.js + calibre.md + movement/index.html; phục hồi từ bản sao gốc + so SHA ngay sau từng ca; bỏ dọn chuỗi; đối chiếu vùng thử trước lượt sạch cuối |
| 3. Checker lọt: N2 draft toàn tệp; N3 bỏ qua tệp thiếu; D2 chưa kiểm sitemap con; D3 chưa kiểm tập thẻ/count; D5 chưa đối chiếu route nền | Checker v3: N2 phân tích frontmatter thật (M14); N3 thiếu tệp = fail (M15); D2 đọc sitemap-index + con + chứa đích (M16); D3 tập thẻ == tập slug (M17); D6 `--nen` đối chiếu toàn bộ route với nền 0702978, chỉ mất đúng alias (M18); bổ sung đủ mutation tương ứng, số ca báo theo thực chạy = 20 |
| 4. Chưa có diff tái tạo đối chiếu byte; E2 đọc `../r7-moi.txt` theo vị trí cây | E2 nhúng inline; dựng cây mới từ 0702978 bằng `dung-cay.mjs` (1.952 tệp) → áp diff → đối chiếu byte 11/11 khớp cây đã kiểm; mọi kiểm vòng 3 chạy trên cây tái tạo, không chỉnh tay sau áp |

**Được GPT Work xác nhận độc lập ở TXN-64 (giữ nguyên):** draft alias; hai redirect thuần 308; năm đích liên kết mechanisms; nghĩa R7 mới; bộ thử 15/15 vòng 2; C4-ARG bắt đúng.

## 5. Rủi ro và quay lại

- Rủi ro: người dùng cũ đánh dấu `/en/glossary/escapement` (không dấu `/`) — đã phủ cả hai biến thể; công cụ tìm kiếm cần thời gian xử lý 308.
- Quay lại: revert commit phát hành C4 (diff không xóa tệp nội dung nào; escapement.md chỉ đổi 1 khóa).

## 6. Việc chưa kiểm (sẽ làm ở vòng áp sau khi duyệt diff)

- HTTP 308 thực tế trên production Vercel (không dùng astro preview làm bằng chứng redirect — theo câu lệnh).
- Pagefind tra từ "escapement" trên production sau loại alias.
- Kiểm trình duyệt UI hub /en/glossary/ (hub sinh từ tập đã lọc — sandbox build đã xác nhận tập thẻ đúng bằng D3, kiểm UI trình bày khi áp).

## 7. Đề xuất

GPT Work duyệt lại diff vòng 3 (`apply-c4-diff.mjs`; đối chứng mục 3: cây tái tạo 0702978, đối chiếu byte 11/11, chuỗi 4 bước exit 0, bộ thử 20/20, Pagefind thật ĐẠT) → vòng sau GLM áp vào repo thật theo đúng diff đã duyệt, chạy checker + build + hai diff-check, trình nghiệm thu phát hành.

---

# PHỤ LỤC — VÒNG ÁP VÀO REPO THẬT (theo phép TXN-20261017-65)

**Phép:** GPT Work duyệt diff vòng 3 — "cho phép GLM áp vào repo thật. Chưa cho phép stage, commit hoặc push." Kèm 6 mục chỉ dẫn vòng áp.

## A1. Trước khi áp

- Pre-flight: HEAD `0702978` = `origin/main` ✓; sửa dở ngoài C4 (5 tệp docs/: THEO-DOI + 4 biên bản A2/A3/A4/C1-B2 từ các vòng trước) **bảo toàn nguyên, không đụng**.
- **Bằng chứng nền cố định đã lưu trước khi build ghi đè dist:** `output/c4-glossary-redirect-audit/nen-route-0702978.txt` — 361 route (.html) của dist repo bản dựng C3 `0702978`.
- Đối chiếu theo nội dung commit: nền là **dist đã dựng từ HEAD 0702978** (chính là bản dựng C3 phát hành), không phải bản sao working-tree; sai khác LF/CRLF working-tree không ảnh hưởng (git chuẩn hóa lúc commit).
- `dung-cay.mjs` đã thêm chặn an toàn: từ chối đích chứa `.git` hoặc trùng repo thật.

## A2. Áp diff — đúng 12 tệp đã duyệt

`node apply-c4-diff.mjs 'D:/Watch web build'` → `C4-APPLY: đã áp đủ A–G`. `git status`: **11 tệp sửa + 1 tệp mới (scripts/check-c4-glossary-merge.mjs)** = đúng 12 tệp duyệt; ngoài ra chỉ các tệp docs sửa dở có trước. Bằng chứng diff từng tệp: `log-cli/repo-diff-12-tep.txt`.

- `vercel.json`: +2 redirect 308 đúng; phần còn lại của diff là **định dạng lại toàn tệp** (JSON.stringify nới object 1 dòng thành nhiều dòng) — nội dung headers/CSP giữ nguyên, thuộc trạng thái sandbox đã duyệt.
- `check-c2-video-learning.mjs`: đúng **1 dòng** (chuỗi dist thêm C4 dist giữa C2 dist và A3 dist); working-tree lệch LF/CRLF với blob — git chuẩn hóa LF lúc commit, logic không đổi (đúng như GPT Work ghi nhận ở vòng duyệt).
- Bộ thử đã vá theo chỉ dẫn mục 4: **hoàn nguyên cả trạng thái tên tệp** (M5/M15 để lại `.an` — GPT Work bắt đúng; phucHoi giờ xóa tệp sót + đối chiếu danh mục tệp từng thư mục sau mỗi ca).

## A3. Chuỗi kiểm trên candidate thật — tất cả exit 0

1. `npm run check` (lần 1) → 0.
2. `npm run build` → 0; **dist 360 route = nền 361 − đúng một alias**; sitemap-0.xml: 0 `glossary/escapement<`, có `glossary/escape-wheel/`, `/en/mechanisms/escapement/` vẫn có (đúng — trang khác).
3. `npm run check` (lần 2, trên dist mới) → 0.
4. `node scripts/check-c4-glossary-merge.mjs --dist dist --nen nen-route-0702978.txt` → ĐẠT (D1–D6, nền dạng tệp danh sách route — checker đã nới nhận cả thư mục lẫn .txt).

## A4. Bộ thử 20/20 trên candidate thật

`C4_TARGET=<repo> C4_NEN=<tệp nền> node test-c4.mjs` → **20/20 ĐẠT** exit 0 (`log-cli/bo-thu-c4-repo.log`), 0 tệp `.an` sót.

**Sự cố đã xử lý (ghi minh bạch):** lượt chạy đầu, sau M17, `phucHoi` văng `UNKNOWN: unknown error, open vercel.json` (errno -4094 — khóa tệp thoáng trên Windows) → M18 vừa mutate (xóa `dist/en/glossary/movement/index.html`) chưa được phục hồi thì process chết. Xử lý: (1) hub đối chiếu **byte-khớp** sandbox (df3eb0cb…) — M17 đã khép trọn; (2) `movement/index.html` phục hồi từ sandbox (cùng nguồn build, byte-khớp); (3) vá `ghiAnToan` — ghi thử lại 3 lần cách 300 ms; (4) chạy lại → 20/20 sạch. C4-D6 sau phục hồi: ĐẠT.

## A5. Pagefind thật + kiểm trình duyệt Chromium/WebKit

- **Pagefind thật trên dist repo** (`log-cli/kiem-pagefind-that-repo.log`): tra "escapement" 15 kết quả, "escape wheel" 6 kết quả — **0 URL alias**; `GET /en/glossary/escape-wheel/` → 200; `GET /en/glossary/escapement/` → 404 trên dist tĩnh (308 do Vercel khi phát hành).
- **Chromium + WebKit** (`kiem-trinh-duyet.mjs`, bằng chứng `log-cli/kiem-trinh-duyet.json`): **0 lỗi mỗi engine** — hub EN không alias + đủ thẻ escape-wheel; trang đích canonical/hreflang/link chuyển ngôn ngữ đúng; anti-magnetism + shock-protection có liên kết `/en/mechanisms/escapement/` hoạt động; tìm kiếm pagefind trong trình duyệt không trả alias; không console lỗi thuộc gói. Ghi chú kỹ thuật: chromium chạy qua `executablePath` chromium-1228 đã cài (playwright 1.64.1 mặc định đòi 1248); webkit-2368 chuẩn.

## A6. Điểm dừng — đúng chỉ dẫn mục 6

- **KHÔNG stage, commit, push, deploy** trong lượt này.
- HTTP 308 production và Pagefind production **chưa kiểm** — thực hiện sau khi có phép phát hành.
- Trình GPT Work xác nhận kết quả áp (TXN-20261017-66) → chờ phép phát hành.

**Đồng bộ số đo theo phán TXN-66 (GPT Work):** astro check trên candidate `0 lỗi / 0 cảnh báo / 7 hints` — hint tăng thêm so với lượt sandbox là biến `legacyHtml` không còn dùng trong R7 regulating-cluster; theo phán GPT Work **không phải lỗi chức năng, không cần sửa mã ở lượt này**.

## A7. Phát hành — khuôn E (theo phép TXN-66 của GPT Work)

- Đồng bộ biên bản trước stage: astro check 0 lỗi / 0 cảnh báo / **7 hints** (hint thêm = biến `legacyHtml` không dùng trong R7 — phán GPT Work: không phải lỗi chức năng, không sửa mã lượt này).
- THEO-DOI stage **blob riêng trên nền HEAD + chỉ hàng C4** (các hàng khác của các vòng khác giữ trong working tree, không stage).
- Staged **đúng 14 đường dẫn** theo phạm vi được phép; remote còn `0702978` trước commit.
- **Commit `0397f12e625b77cf814884ce40fcd4beeb78d93c`** — "feat(glossary): redirect duplicate escapement page to escape-wheel" — push main thành công (`0702978..0397f12`), ls-remote xác nhận.

## A8. Kiểm production sau triển khai — ĐẠT

| Kiểm | Kết quả |
|---|---|
| `GET /en/glossary/escapement` | **308** → `/en/glossary/escape-wheel/?kt=1` |
| `GET /en/glossary/escapement/` | **308** → `/en/glossary/escape-wheel/?kt=1` |
| `GET /en/glossary/escape-wheel/` | **200** |
| sitemap-0.xml production | 0 alias; có `glossary/escape-wheel/` |
| hub `/en/glossary/` production (cache-bust) | 0 href alias; **2 href escape-wheel** |
| Pagefind + trình duyệt production (Chromium, `log-cli/kiem-trinh-duyet-san-xuat.mjs` → `kiem-trinh-duyet-production.json`) | **ĐẠT** — tìm kiếm không trả alias, hub/đích/canonical đúng, 0 console lỗi |
