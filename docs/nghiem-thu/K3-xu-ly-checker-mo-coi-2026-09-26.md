# Biên bản K3 — xử lý ba checker mồ côi

- Ngày: 2026-09-26
- Danh mục: DHC-GD3-20260925 v1.0.0 · Giao dịch: TXN-20260926-210
- Nền: HEAD = origin/main = `8e223c6`, nhánh `main`, staged = 0, không tracked sửa khi bắt đầu
- Kết cục vòng 1: **DỪNG CHỜ QUYẾT GPT WORK** — có mâu thuẫn giữa phán quyết "hai checker còn chạy được" và kết quả đo thực tế: `check-english-launch.mjs` KHÔNG ĐẠT trên dist hiện hành.
- Kết cục vòng sửa 1 (TXN-20260926-213): **DỪNG CHỜ TÁI NGHIỆM THU** — đã thực hiện đúng và đủ 3 sửa được phép (checker + 1 dòng md + nối package.json); `check-english-launch.mjs` vẫn KHÔNG ĐẠT với **đúng 1 lỗi duy nhất còn lại: "Chronométrie"** — tên thương hiệu `Chronométrie Ferdinand Berthoud` không thuộc 5 chuỗi allowlist được đề và tệp `isochronism.md` nằm ngoài phạm vi sửa (chi tiết mục 1bis).
- Kết cục vòng sửa hẹp (TXN-20260926-215): **ĐÃ XỬ LÝ XONG, DỪNG CHỜ TÁI NGHIỆM THU** — bổ sung đúng cụm `Chronométrie Ferdinand Berthoud` vào allowlist kèm 3 tự kiểm hẹp; `check-english-launch.mjs` ĐẠT exit 0; **`npm run build` exit 0 xanh trọn chuỗi** với English launch rồi G08 chạy ở cuối (mục 1ter).

## 1. Kết quả chạy riêng hai checker giữ lại (trước sửa, dist hiện hành)

| Checker | Kết quả | Log |
|---|---|---|
| `scripts/check-g08-speedmaster-evolution.cjs` | **ĐẠT, exit 0** | `output/k3-orphan-checkers-audit/g08-truoc.log` |
| `scripts/check-english-launch.mjs` | **KHÔNG ĐẠT, exit 1** | `output/k3-orphan-checkers-audit/en-launch-truoc.log` |

### Phân rã hai lỗi của check-english-launch (bằng chứng nguyên văn trong log)

Lỗi 1 — nhóm 2 (link nội bộ): `/en/rss.xml` bị coi là 404.

- Endpoint **tồn tại thật**: `dist/en/rss.xml` (37.5 KB, sinh từ `src/pages/en/rss.xml.ts`).
- Nguồn link: `<link rel="alternate" type="application/rss+xml" …>` (tính năng RSS H08) trong hai trang tĩnh `dist/en/about/` và `dist/en/accessibility/`.
- Nguyên nhân checker: `routeExistsInDist()` chỉ nhận diện `dist/<route>/index.html` và `dist/<route>.html`, không nhận diện tệp phi-HTML → false positive kỹ thuật. (Link RSS discovery trong `<head>` các trang còn lại dùng URL tuyệt đối kèm domain nên không bị regex `href="(/en/…)` quét trúng.)

Lỗi 2 — nhóm 6 (chữ Việt trong EN): 6 trang bị bắt, gồm hai loại nguyên nhân khác nhau:

- **2a. Thuật ngữ tiếng Pháp chủ đích** (cùng bản chất với `PROPER_NOUNS` hiện có: Côtes de Genève, Guilloché, Poinçon, Perlage, và ngoại lệ "Métiers d'Art" theo TXN-20260914-13) — các bài EN này sinh sau khi checker bị gỡ khỏi chuỗi nên chưa được liệt kê:
  - `en/mechanisms/ebauche-supply-chain/` — "Ébauche" trong `<title>` và `<h1>`;
  - `en/mechanisms/manufacture-etablisseur/` — "établisseur" trong `<title>` và `<h1>`;
  - `en/glossary/isochronism/` — "chronomètre" trong anchor mục lục "One chronomètre maker's view";
  - `en/mechanisms/eta-sellita/` + `en/mechanisms/` — anchor liên kết bài mang title "Ébauche — the unfinished movement in the supply chain".
- **2b. Chữ Việt thật hiển thị** (lỗi nội dung, không phải lỗi checker): anchor `<a href="/en/mechanisms/moon-phase/">Pha trăng — the moon-phase complication</a>` trên `en/glossary/annual-calendar/` — chữ "Pha trăng" hiện cho người đọc trang EN. Ngoài phạm vi K3 (cấm sửa `src/`), cần gói nội dung riêng.

Regex nhóm 6 (`viCharRe`) bắt cả ký tự é/è/É — nên từ tiếng Pháp có dấu bị khớp. Checker chỉ lọc `<script>`/`<style>`, không lọc HTML comment (các comment tiếng Việt trong header/footer không bị bắt vì nằm trong tag; chữ bị bắt nêu trên đều là văn bản hiển thị).

### Mâu thuẫn và cách xử lý

Phán quyết chốt "hai checker vẫn hữu ích và **chạy được** sau build". Đo thực tế: English KHÔNG ĐẠT với 2 nhóm lỗi như trên. Nếu nối vào chuỗi build, `npm run build` sẽ exit 1 và phá chuỗi kiểm mọi gói sau; không có cách nào trong phạm vi được phép (cấm sửa nội dung cả ba checker, cấm sửa `src/`) khiến nó ĐẠT. → **`package.json` chưa được sửa**, chờ quyết GPT Work (mở quyền sửa checker English cho đúng thiết kế, hoặc tách gói nội dung sửa "Pha trăng" trước, hoặc phương án khác).

## 1bis. Vòng sửa 1 (TXN-20260926-213) — sửa checker English + hoàn tất nối build

### Nguyên nhân từng sửa và giới hạn

| Sửa | Nội dung | Vị trí |
|---|---|---|
| 1a | `routeExistsInDist()` nhận thêm endpoint tĩnh có đuôi tệp (`/en/rss.xml` ↔ `dist/en/rss.xml`) khi segment cuối có đuôi tệp và tệp tồn tại trực tiếp; giữ nguyên kiểm route HTML | dòng ~52 |
| 1b | `stripInvisible()` bỏ HTML comment `<!-- … -->` trước quét văn bản nhóm 6; giữ kiểm script/style | dòng ~224 |
| 1c | Allowlist hẹp theo chuỗi đầy đủ: `Ébauche`, `ébauche`, `établisseur`, `Établisseur`, `chronomètre` — đúng 5 chuỗi đề cho, không nới regex, không miễn trang | `PROPER_NOUNS` |
| 2 | Nhãn anchor dòng 32 `annual-calendar.md`: "Pha trăng — the moon-phase complication" → "Moon phase — the moon-phase complication", giữ nguyên URL `/en/mechanisms/moon-phase/` | `src/content/tuDien/en/annual-calendar.md` |
| 3 | Nối `&& node scripts/check-english-launch.mjs && node scripts/check-g08-speedmaster-evolution.cjs` vào cuối chuỗi build, sau `check-u1-myth-series.mjs dist`; chuỗi `check` giữ nguyên | `package.json` |

### Tự kiểm trong checker (chạy mỗi lần, sai là checker tự báo lỗi)

(a) `/en/rss.xml` được chấp nhận khi tệp XML thật tồn tại; (b) URL XML không tồn tại (`/en/k3-selftest-khong-ton-tai.xml`) vẫn bị từ chối; (c) `Ébauche`/`établisseur`/`chronomètre` đúng allowlist không bị bắt; (d) thuật ngữ Pháp đặt cạnh chữ Việt thật (`Ébauche trăng giả`) vẫn bị bắt; (e) chuỗi Việt thật "Pha trăng" trong anchor mô phỏng pipeline nhóm 6 vẫn bị bắt. Đã chạy: `node --check` cú pháp OK, khối tự kiểm không báo sai.

### Kết quả kiểm bắt buộc sau sửa

| Kiểm | Kết quả |
|---|---|
| `check-english-launch.mjs` trên dist cũ (trước rebuild) | nhóm 2 sạch: "168 link nội bộ /en/... unique — tất cả tồn tại"; còn 2 lỗi: annual-calendar "trăng" (giải bằng sửa md) và isochronism "Chronométrie" (mâu thuẫn — xem dưới) |
| `npm run check:types` | exit 0 — 0 lỗi / 0 cảnh báo / 1 hint cũ (`output/playwright/audit-2026-09-25.mjs`) |
| `npm run check` | exit 0 — 236 ca ĐẠT |
| `npm run build` | **exit 1**: astro build thành công (Pagefind indexed 338), U1 dist ĐẠT, chuỗi có đủ 2 checker cuối (in nguyên văn trong `build-v1.log`); `check-english-launch.mjs` KHÔNG ĐẠT với **đúng 1 lỗi**: `en/glossary/isochronism/ (từ mẫu: "Chronométrie")` → G08 bị `&&` chặn; G08 chạy độc lập trên dist mới: **exit 0 ĐẠT** (`g08-sau-build.log`) |
| `git diff --check` | exit 0 |
| Lỗi "Pha trăng" trên annual-calendar | **đã hết** sau rebuild — không còn trong danh sách lỗi |

### Mâu thuẫn còn lại — "Chronométrie" (chờ quyết GPT Work)

`Chronométrie` là **tên thương hiệu thật** — `Chronométrie Ferdinand Berthoud` (tên pháp lý của nhà chế tác Ferdinand Berthoud), có trong `src/content/tuDien/en/isochronism.md` dòng 12 (frontmatter `label` nguồn) và dòng 29 (trích dẫn); trong dist xuất hiện qua anchor nhãn nguồn → bị nhóm 6 bắt qua tập "buttons". Không thuộc 5 chuỗi allowlist được đề K3 vòng 1; tệp `isochronism.md` nằm ngoài phạm vi sửa được phép. Từ này bị che khuất ở vòng 1 vì regex lấy từ mẫu bắt từ đầu tiên ("chronomètre") — khi allowlist gỡ từ đó, "Chronométrie" lộ ra. Không có cách nào hợp phạm vi khiến checker ĐẠT. Chờ quyết: (a) thêm `Chronométrie` (đề xuất cả cụm `Chronométrie Ferdinand Berthoud`) vào allowlist — cùng bản chất tên riêng đã có sẵn; hoặc (b) cho phép sửa `isochronism.md`; hoặc (c) phương án khác của GPT Work.

### Mutation ngoài cây (bản sao `D:/k3-mut`: dist + toàn bộ src + JSON hồ sơ; đã dọn)

| Ca | Hỏng | Kết quả | Hoàn nguyên (SHA-256 trước = sau) |
|---|---|---|---|
| 1 | `href="/en/rss.xml"` → `"/en/k3-mut-thieu-feed.xml"` trong `en/about/` | exit 1, nhóm 2 bắt đúng `/en/k3-mut-thieu-feed.xml` | `6038504f489ae8c0…` khớp (`hash-ca1-rss.txt`) |
| 2 | chèn anchor "Pha trăng — the moon-phase complication" vào `en/guides/` | exit 1, nhóm 6 bắt đúng `en/guides/index.html (từ mẫu: "trăng")` | `702a6bcdb556b37a…` khớp (`hash-ca2-pha-trang.txt`) |
| 3 | 1 trong 7 `class="evol-btn"` → `x-evol-btn` tại `mau-iconic/omega-speedmaster/` (VI) | G08 exit 1 — "KHÔNG ĐẠT G5 vi có đúng 7 nút mốc — 6 nút" (en đối chứng ĐẠT 7) | `6ab0c16545618e9e…` khớp (`hash-ca3-evol-btn.txt`) |

Sau hoàn nguyên: G08 exit 0; English về baseline exit 1 với đúng 1 lỗi nền (Chronométrie) — mọi lỗi tiêm biến mất. Baseline đỏ có chủ đích của English không làm mất giá trị mutation: lỗi tiêm xuất hiện khi hỏng và biến mất khi hoàn nguyên, tách bạch rõ với lỗi nền.

### Vòng sửa hẹp TXN-20260926-215 — allowlist đúng cụm `Chronométrie Ferdinand Berthoud`

Quyết định GPT Work: cho phép thêm **đúng cụm đầy đủ** `Chronométrie Ferdinand Berthoud` vào allowlist tên riêng của `check-english-launch.mjs`; **không** cho phép `Chronométrie` đứng riêng; **không** sửa `isochronism.md`; không mở gói nội dung mới.

Bằng chứng tên nguồn đầy đủ: `src/content/tuDien/en/isochronism.md` dòng 12 (frontmatter `label: "Chronométrie Ferdinand Berthoud — FB 1.2.3 (maker's page)"`) và dòng 29 (trích dẫn hãng) — là tên pháp lý của nhà chế tác Ferdinand Berthoud.

Sửa thực hiện (`scripts/check-english-launch.mjs`, đúng 1 tệp):

- `PROPER_NOUNS` + `'Chronométrie Ferdinand Berthoud'` (kèm chú thích giới hạn: từ riêng không được phép);
- Tự kiểm hẹp thêm 3 mệnh đề (f)(g)(h), nối vào điều kiện và message của khối tự kiểm K3:
  - (f) cụm đầy đủ `Chronométrie Ferdinand Berthoud — FB 1.2.3` được loại khỏi kiểm tiếng Việt (không còn ký tự dấu sau strip);
  - (g) `Chronométrie` đứng riêng **vẫn bị bắt** (cụm không khớp → `é` còn lại);
  - (h) cụm đầy đủ đứng cạnh `Pha trăng` **vẫn bị bắt** do còn chữ Việt thật (`ă`).

Kết quả tự kiểm + kiểm bắt buộc sau sửa hẹp:

| Kiểm | Kết quả |
|---|---|
| `node --check` + khối tự kiểm (a)–(h) | cú pháp OK; tự kiểm không báo sai |
| `node scripts/check-english-launch.mjs` | **exit 0 ĐẠT** — `en-launch-sau-215.log` |
| `node scripts/check-g08-speedmaster-evolution.cjs` | **exit 0 ĐẠT** — `g08-sau-215.log` |
| `npm run check:types` | exit 0 — 0 lỗi / 0 cảnh báo / 1 hint cũ (`output/playwright/audit-2026-09-25.mjs`) |
| `npm run check` | exit 0 — 236 ca ĐẠT |
| `npm run build` | **exit 0** — astro build thành công (Pagefind indexed 338), U1 dist ĐẠT, rồi **English launch ĐẠT và G08 ĐẠT ở cuối chuỗi** (nguyên văn trong `build-215.log`) |
| `git diff --check` | exit 0 |

## 2. Lưu trữ G09 favicon/hints — ĐÃ LÀM

- `git mv scripts/check-g09-favicon-hints.mjs scripts/archive/check-g09-favicon-hints.mjs` — nội dung nguyên vẹn, **hash byte-đối-byte khớp**:
  - trước: `290dea473a564486a67379f07715ffcbf033303de1c2a9e38d27234ce21a6d2a`
  - sau: `290dea473a564486a67379f07715ffcbf033303de1c2a9e38d27234ce21a6d2a`
- Đường dẫn cũ trong `scripts/` không còn (đã kiểm `ls`).
- Không còn tham chiếu chạy G09-favicon trong `package.json` (tham chiếu "g09" duy nhất là `check-g09-id-unique.mjs` — checker G09-B khác, còn sống trong chuỗi build).
- Do `git mv` tự tạo staged rename, đã `git restore --staged` cả hai đường dẫn để giữ cam kết "không stage": hiện trạng ` D scripts/check-g09-favicon-hints.mjs` + `?? scripts/archive/`. Khi phát hành sẽ stage cả hai đường dẫn để Git nhận rename.

Lý do lưu trữ (theo phán quyết): checker phụ thuộc hồ sơ bằng chứng lịch sử trong `output/` và tự đòi `astro check` 0/0/0, trong khi nền có 1 hint cũ đã ghi nhận ngoài phạm vi (`output/playwright/audit-2026-09-25.mjs`). Không làm yếu checker để ép chạy.

Điều kiện xem xét khôi phục G09 trong tương lai:

1. Hồ sơ bằng chứng lịch sử trong `output/` mà checker đòi hỏi được tái lập/khả dụng tại đúng đường dẫn;
2. Nền đạt `astro check` 0 lỗi / 0 cảnh báo / 0 hints thật (hint cũ được xử lý bằng gói riêng);
3. Có hồ sơ nguồn riêng phê duyệt trước khi nối lại chuỗi, đồng bộ cấu trúc hiện hành (favicon.svg, BaseLayout) như lúc viết checker.

## 3. Mutation — G08 (bằng chứng checker còn sức bắt lỗi)

Trên bản sao **ngoài cây repo** `D:/k3-mut` (đã dọn sau ca): `dist/` (robocopy /MIR) + toàn bộ `src/` + `output/g08-speedmaster-evolution-audit/du-kien-g08-a.json`; chạy checker bằng đường dẫn tuyệt đối, cwd = `D:/k3-mut`.

| Ca | Hành động | Kết quả | Log |
|---|---|---|---|
| Baseline | chạy nguyên trạng | **exit 0 ĐẠT** | `g08-mut-baseline.log` |
| Baseline English (đối chứng) | chạy nguyên trạng | exit 1, đúng 2 nhóm lỗi như trong repo → lỗi tái lập độc lập môi trường | `en-mut-baseline.log` |
| Hỏng | thay 1 trong 7 `class="evol-btn"` → `class="x-evol-btn"` tại `dist/mau-iconic/omega-speedmaster/index.html` (bản sao) | **exit 1** — "KHÔNG ĐẠT G5 vi có đúng 7 nút mốc — 6 nút"; đối chứng en vẫn ĐẠT 7 nút | `mutation-g08.log` |
| Hoàn nguyên | khôi phục từ backup | hash trước/sau khớp `6ab0c16545618e9ed31be3be939d609bd0cd9090f1f032d5d027a3bb7ca33335`; chạy lại **exit 0 ĐẠT** | `mutation-g08-hash.txt`, `g08-mut-sach.log` |

Mutation English không tiến hành: baseline đã đỏ sẵn (mục 1) — thêm hỏng nữa không phân biệt được gì; đợi quyết xử lý checker trước.

## 4. Kiểm bắt buộc sau sửa

| Lệnh | Kết quả | Ghi chú |
|---|---|---|
| `npm run check:types` | exit 0 — 0 lỗi / 0 cảnh báo / 1 hint | hint cũ duy nhất `output/playwright/audit-2026-09-25.mjs` (ngoài phạm vi, có trước) |
| `npm run check` | exit 0 — 236 ca ĐẠT | chuỗi `check` giữ nguyên |
| `npm run build` | exit 0 — 338 trang, Pagefind indexed 338 | chuỗi build hiện hành giữ nguyên, kết thúc `check-u1-myth-series.mjs dist` ĐẠT; **chưa có checker mới cuối chuỗi** (chờ quyết — xem mục 1) |
| `git diff --check` | exit 0 | sạch lỗi định dạng |

## 5. Trạng thái Git cuối

- HEAD = origin/main = `8e223c65117de1ba99d231b071bc0763ee8b64d7`, staged = 0
- Tracked sửa: 1 — ` D scripts/check-g09-favicon-hints.mjs` (nửa rename của `git mv`, đã unstage)
- Untracked mới của gói: `scripts/archive/check-g09-favicon-hints.mjs`, `docs/nghiem-thu/K3-xu-ly-checker-mo-coi-2026-09-26.md`, `output/k3-orphan-checkers-audit/` (bằng chứng nội bộ — không phát hành)
- Toàn bộ untracked có trước giữ nguyên; không stage, không commit, không push

## 6. Danh sách tệp đề nghị phát hành (vòng sửa 1 — chờ tái nghiệm thu)

| # | Tệp | Ghi chú |
|---|---|---|
| 1 | `scripts/check-english-launch.mjs` | sửa 3 điểm + khối tự kiểm K3 (mục 1bis) |
| 2 | `src/content/tuDien/en/annual-calendar.md` | đúng 1 dòng 32 — nhãn anchor "Moon phase", giữ URL |
| 3 | `package.json` | nối 2 lệnh cuối chuỗi build |
| 4 | `scripts/check-g09-favicon-hints.mjs` → `scripts/archive/check-g09-favicon-hints.mjs` | rename qua `git mv`, hash `290dea473a…` khớp byte-đối-byte |
| 5 | `docs/nghiem-thu/K3-xu-ly-checker-mo-coi-2026-09-26.md` | biên bản này |

Không phát hành: `output/k3-orphan-checkers-audit/` (bằng chứng nội bộ).

## 7. Điểm chưa giải quyết — KHÔNG CÒN

Cả hai mâu thuẫn của K3 đã xử lý xong: (1) anchor "Pha trăng" trên `annual-calendar` EN — sửa nhãn theo TXN-20260926-213; (2) "Chronométrie" — allowlist đúng cụm đầy đủ theo TXN-20260926-215. `npm run build` xanh trọn chuỗi với English launch + G08 chạy cuối. **Dừng chờ GPT Work tái nghiệm thu.**
