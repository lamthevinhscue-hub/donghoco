# Biên bản I4 — Ba sơ đồ tiến hóa: Royal Oak, Fifty Fathoms, Reverso

- Giao dịch: TXN-20260926-258 (danh mục DHC-GD3-20260925 v1.0.0)
- Ngày thực hiện: 26/09/2026
- Nền đầu phiên: HEAD = origin/main = `68e0a6b4636fc3ddb92c008b35e4cbbda06dc4b0` (`feat(glossary): add English category filter`), staged = 0
- **TRẠNG THÁI: có MỘT điểm mâu thuẫn chưa giải quyết — hai ca kiểm trong `scripts/check-g08-speedmaster-evolution.cjs` (tệp NGOÀI phạm vi I4) báo KHÔNG ĐẠT vì hard-code trạng thái trước I4. Dừng chờ quyết định GPT Work (chi tiết mục 7).**

## 1. Tệp đã sửa / tạo

| Tệp | Thay đổi |
| --- | --- |
| `docs/ho-so-du-lieu-tien-hoa-royal-oak.md` | Mới — hồ sơ dữ liệu 4 mốc R1–R4, nguồn I1-M4 tái kiểm cùng ngày |
| `docs/ho-so-du-lieu-tien-hoa-fifty-fathoms.md` | Mới — hồ sơ dữ liệu 4 mốc F1–F4, nguồn I2-M3 tái kiểm cùng ngày |
| `docs/ho-so-du-lieu-tien-hoa-reverso.md` | Mới — hồ sơ dữ liệu 4 mốc V1–V4, nguồn I2-M1 tái kiểm cùng ngày |
| `src/data/audemarsPiguetRoyalOakEvolution.ts` | Mới — dataset 4 mốc, slug `royal-oak`, publishedLangs `['vi','en']` |
| `src/data/blancpainFiftyFathomsEvolution.ts` | Mới — dataset 4 mốc, slug `fifty-fathoms`, publishedLangs `['vi','en']` |
| `src/data/jaegerLeCoultreReversoEvolution.ts` | Mới — dataset 4 mốc, slug `reverso`, publishedLangs `['vi','en']` |
| `src/data/modelEvolution.ts` | Chỉ import + đăng ký ba dataset mới vào mảng DATASETS (theo thứ tự alphabet slug; comment quy trình giữ nguyên) |
| `scripts/check-i4-model-evolution.mjs` | Mới — checker 2 chế độ source / source+dist, env `I4_ROOT` cho sandbox |
| `package.json` | Nối checker I4 vào cuối `npm run check` (source) và cuối `npm run build` (source + dist) |
| `docs/nghiem-thu/I4-ba-so-do-tien-hoa-2026-09-26.md` | Biên bản này |
| `output/i4-model-evolution-audit/` | Bằng chứng nội bộ (log kiểm, log trình duyệt, script đo, mutation) — không phát hành |

Không đụng: Markdown bài Royal Oak/Fifty Fathoms/Reverso (VI lẫn EN) và mọi bài khác, `ModelEvolution.astro` (khuôn hiện có đáp ứng đủ — không sửa), route/schema/frontmatter/ảnh/CSS toàn cục/timeline lịch sử/bộ lọc-tìm kiếm, dependency.

## 2. Số mốc và danh sách năm/reference theo từng sơ đồ (tổng 12 mốc)

| Sơ đồ | Mốc (năm · reference · nhãn chính) | Nguồn từng mốc |
| --- | --- | --- |
| Royal Oak | 1970 · Royal Oak · ba nhà phân phối đề xuất đồng hồ thép thể thao thanh lịch | AP Chronicles — birth-of-an-icon |
| | 1971 · Royal Oak · đơn hàng đầu 1.000 vỏ thép 19/5/1971 (lớn nhất hãng) | AP Chronicles — birth-of-an-icon |
| | 1972 · Royal Oak · ra mắt Basel Fair 4/1972, "đồng hồ thép đắt nhất thế giới" đương thời; CHF 3.300 | AP Chronicles — birth-of-an-icon |
| | 1976 · Royal Oak II · phiên bản nữ đầu tiên, Model 8638 | AP Chronicles — royal-oak-2 |
| Fifty Fathoms | 1953 · Fifty Fathoms · ra mắt — "đồng hồ lặn hiện đại đầu tiên" (theo Blancpain); note Maloubier/Riffaud | blancpain.com collections |
| | 1999 · Fifty Fathoms · mẫu mới sau gần 20 năm — bộ ba Trilogy, thời Biver | Lettres du Brassus issue-13 |
| | 2003 · Anniversary Fifty Fathoms · ba loạt giới hạn × 50 chiếc | Lettres du Brassus issue-13 |
| | 2007 · Fifty Fathoms Collection · bộ sưu tập đầy đủ ra đời | Lettres du Brassus issue-13 |
| Reverso | 1930 · Reverso · thách thức bảo vệ mặt kính polo; de Trey — LeCoultre — Chauvot | JLC reverso-history |
| | 1931 · Reverso · đơn sáng chế Paris 4/3/1931; bán < 9 tháng sau đơn; đăng ký tên tháng 11 | JLC reverso-history |
| | 1994 · Reverso Duoface · hai mặt số tương phản + múi giờ thứ hai | JLC reverso-history |
| | 1997 · Reverso Duetto · thiết kế dành cho nữ | JLC reverso-history |

*(Vòng sửa 1 — TXN-20260926-260: bảng này đã sửa cho khớp dataset — vòng đầu ghi nhầm V3=1991 Soixantième/V4=1994; tập mốc chốt thống nhất là 1930/1931/1994/1997 như trên.)*

Tất cả mốc tái kiểm trực tiếp ngày 2026-09-26 (WebFetch 5 URL + web_reader 1 URL — WebFetch quá hạn 2 lượt với jaeger-lecoultre.com, đổi công cụ không đổi nguồn). Trích nguyên văn từng mốc nằm trong ba hồ sơ dữ liệu.

## 3. Dữ kiện/mốc bị LOẠI kèm lý do

**Royal Oak:**
- "Đồng hồ thể thao thép cao cấp đầu tiên" — CẤM theo đề bài; hồ sơ I1 không có câu nguồn trực tiếp (chỉ có mô tả yêu cầu thiết kế "never done before" của AP)
- Reference 5402/14802/15202/16202 (có trong bài hiện có) — hồ sơ I1 không chốt số nào; chỉ Model 8638 được chốt
- Biệt danh "Jumbo" 39 mm — I1 có nguồn nhưng không có năm mốc riêng; không trộn biệt danh vào reference
- Bản phác thảo Genta qua đêm — không gắn năm riêng trong trích
- 1974 Agnelli đeo; 1992 kỷ niệm 20 năm; "equipped Jumbo until end of 2021" — không phải mốc thay đổi của dòng / không đủ cấu trúc mốc
- Jacqueline Dimier thiết kế 8638 — trích có ở birth-of-an-icon nhưng mốc R4 đã đủ từ trang royal-oak-2 (một mốc một nguồn)
- Royal Oak Offshore 1993 — không có URL/archive trong lượt tra (mục "chưa đủ nguồn" hồ sơ)

**Fifty Fathoms:**
- "Unidirectional / vành xoay một chiều" — CẤM; nguồn archive chỉ xác nhận vành xoay + cơ chế khóa chống xoay nhầm có bằng sáng chế (Fiechter)
- Quy đổi 50 fathoms ≈ 91 m / 300 ft — không con số trong nguồn
- US Navy 1959 (HARDTACK), Milspec 1964/1966 — chi tiết quân sự ngoài "các thay đổi chính của dòng"; I2-M3 giới hạn "không thêm chi tiết quân đội khác"
- 1950–1980 Fiechter CEO / 1980 rời — sự kiện nhân sự
- Năm 1952 đề bài ban đầu Maloubier/Riffaud — archive không gắn năm; kể trong note mốc 1953 không kèm năm
- Bathyscaphe 1956 — chưa tra được nguồn trong lượt này (mục "chưa đủ nguồn")

**Reverso:**
- "Reverso = tiếng Latin 'I turn round'" — không nguyên văn trong nguồn (I2-M1 cấm)
- Tên "Cottier" — sai; hãng ghi Chauvot (I2-M1 cấm)
- Tháng 7/1931 de Trey mua quyền thiết kế — giao dịch nội bộ, không làm mốc
- Reverso Soixantième 1991 — **CÓ nguồn trực tiếp nhưng không chọn** (lý do biên tập về số mốc: hồ sơ chốt bốn mốc, chọn Duoface 1994 + Duetto 1997 làm hai đại diện hướng phát triển sau 1990); KHÔNG viện dẫn ràng buộc ký tự — *(đính chính vòng sửa 1 TXN-260: bản đầu ghi sai lý do "checker ký tự"; thực chất vòng đầu là lệch hồ sơ–dataset, đã đồng bộ hồ sơ theo dataset)*
- Calibre 854/844 và các thông số bộ máy — ngoài phạm vi mốc
- 1833 Antoine LeCoultre — bối cảnh hãng, không phải mốc dòng

**Giới hạn diễn đạt ghi trong hồ sơ:** EN tránh mọi ký tự có dấu → tên có dấu (César de Trey) chỉ nêu ở bản VI; bản EN diễn đạt cùng dữ kiện không dấu ("a businessman", "Chauvot", "Jacques-David LeCoultre"). "first modern diver's watch" ghi kèm "theo Blancpain/in the brand's own words" — tuyên bố hãng, không sự thật tuyệt đối. "largest ever placed by the brand" giữ đúng phạm vi nội bộ hãng.

## 4. Kết quả kiểm bắt buộc

| Kiểm | Kết quả |
| --- | --- |
| `npm run check:types` | 442 tệp — 0 errors / 0 warnings / **4 hints (đúng baseline)** |
| `npm run check` (chứa checker I4 source) | exit 0 |
| `npm run build` | **exit 0 (sau vòng sửa 1 — G08 checker G4/G5 được mở hẹp sửa theo phán quyết)**; cuối chuỗi: G08 "KẾT LUẬN: ĐẠT — sơ đồ Speedmaster khớp hồ sơ, đúng route, sạch claim cũ" + I4 source + I4 dist đều ĐẠT |
| `node scripts/check-g08-speedmaster-evolution.cjs` | exit 0 — 6 slug đăng ký / 12 route VI+EN; Speedmaster 7 nút + 7 URL; Submariner + GMT 8 nút mỗi ngôn ngữ |
| `node scripts/check-evolution-data.mjs` | exit 0 — 6 dataset: I4 4+4+4 mốc, cũ 7+8+8, vi+en |
| `node scripts/check-evolution-routes.mjs` | exit 0 — 6 cặp route VI/EN đúng số mốc, khớp dataset |
| `node scripts/check-i4-model-evolution.mjs` | exit 0 — 10 nhóm kiểm ĐẠT (source), gồm I4-10 kiểm cứng tập mốc Reverso 1930/1931/1994/1997 |
| `node scripts/check-i4-model-evolution.mjs dist` | exit 0 — 10 nhóm kiểm ĐẠT (source + dist): 6 route render, 4 nút/route, nhãn "Xem nguồn"/"View source", canonical/hreflang/switcher, khối EN sạch ký tự Việt, sạch claim cấm, sơ đồ chỉ trên đúng 12 route đăng ký |
| `node scripts/scan-chars.mjs` | OK — 441 tệp |
| `git diff --check` + `git diff --cached --check` | sạch |

Số trang / sitemap / link trước–sau: I4 không tạo route mới (ba bài VI + EN có từ trước — chỉ thêm khối sơ đồ trong trang): dist 337 index.html; sitemap 337 URL (66 URL iconic — mỗi bài VI+EN=2, gồm cả 3 bài I4); hash SHA-256 `dist/mau-iconic/rolex-submariner/index.html`, `dist/en/iconic-watches/rolex-submariner/index.html`, `dist/tu-dien/index.html` trước = sau build (`hash-truoc-build.txt` trong output) — trang cũ byte-đối-byte.

## 5. Kiểm trình duyệt (playwright-cli, astro preview localhost:4324 — log `kiem-trinh-duyet.log.txt`)

| Ca | Kết quả |
| --- | --- |
| 3 bài VI desktop | 4 nút mỗi sơ đồ; khởi tạo mốc 0; bấm nút → aria-pressed + data-selected + chi tiết đổi đúng năm (1972/2003/1994); không tải lại trang |
| 3 bài EN desktop | tiêu đề/intro/nhãn "View source: AP Chronicles · Blancpain · Jaeger-LeCoultre" đúng EN; bấm nút 1 → chi tiết 1971/1999/1931 |
| Bàn phím (reverso VI) | 13 Tab tới nút mốc (focus ring 2px solid); Enter chọn mốc 0; Space chọn mốc 3 |
| 390 px | tràn ngang 0; 4/4 chi tiết mở (danh sách dọc); 4 link nguồn |
| Dark mode | nút đang chọn nền surface-raised rgb(32,39,45) phân biệt nút thường; năm màu alloy rgb(208,178,123); tràn 0 |
| No-JS (CDP) | 3 bài: sơ đồ render đủ, 4/4 chi tiết mở, 4 link HTTPS, tràn 0 |
| Đối chứng | patek-nautilus VI+EN, cartier-tank VI — KHÔNG có `[data-evolution]` |

## 6. Mutation ngoài cây (bản sao `%TEMP%\i4-sandbox-*` — log `kiem-i4-mutation-vs2.log.txt`, cập nhật vòng sửa hẹp cuối)

9 ca, đều FAIL đúng rule kỳ vọng, hoàn nguyên byte-đối-byte hash khớp, chạy sạch cuối trong sandbox (I4 dist + G08 cùng exit 0):

| Ca | Phép đột biến | Kết quả checker |
| --- | --- | --- |
| M-A | Bỏ Speedmaster khỏi registry (import + dòng mảng) | G08 **G4** FAIL: "KHÔNG ĐẠT G4 import + DATASETS đăng ký Speedmaster" |
| M-B | Chèn sơ đồ vào route patek-nautilus (không dataset) | G08 **G5** FAIL: "KHÔNG ĐẠT G5 không sơ đồ nào lọt route khác" |
| M-H | **Bỏ Reverso khỏi mảng DATASETS nhưng giữ tệp dataset** | G08 **G5** FAIL: "lọt — mau-iconic/reverso · en/iconic-watches/reverso" (sơ đồ render nhưng không thuộc registry) |
| M-I | **Thêm dataset đăng ký GIẢ (`gia-model`, import + mảng) không có route render** | G08 **G5** FAIL: "render đủ mọi slug đăng ký — đăng ký 7 slug · thấy 12 route" |
| M-C | Lệch mốc Reverso đã chốt (1997 → 1996) | I4-10 FAIL: "Reverso lệch tập mốc chốt — dataset […1996/Reverso Duetto] ≠ hồ sơ […1997/Reverso Duetto]" |
| M-D | Xóa một nút mốc trong dist royal-oak VI | I4-7 FAIL: "route VI 3 nút mốc ≠ dataset 4" |
| M-E | Hạ sourceUrl 1953 về HTTP | I4-2 + I4-4 FAIL: không HTTPS + lệch allowlist |
| M-F | Chèn tiếng Việt vào label.en (Royal Oak) | I4-3 FAIL: "label.en còn ký tự tiếng Việt" |
| M-G | Gán sơ đồ sang route patek-nautilus trong dist | I4-8 FAIL: "Sơ đồ xuất hiện trên bài iconic ngoài danh sách" |

Sandbox đã xóa sạch. Lỗi quy trình đã sửa qua các vòng: (vòng đầu) hai ca đột biến dist chạy thiếu đối số `dist` và checker I4-1 thiếu nhánh fail; (vòng sửa 1) G5 dùng `endsWith('.Evolution.ts')` sai → quét rỗng 0 slug mà ca vẫn ĐẠT (0=0); (vòng sửa hẹp cuối) G5 đổi hẳn sang suy slug từ registry DATASETS — M-H/M-I chứng minh hai chiều "render mà không đăng ký" và "đăng ký mà không render" đều bị chặn.

## 6b. Vòng sửa 1 (TXN-20260926-260) — hai nội dung sửa

**1. Đồng bộ hồ sơ Reverso ↔ dataset:** vòng đầu hồ sơ chọn V3=1991 Soixantième/V4=1994 Duoface nhưng dataset hiển thị 1994 Duoface/1997 Duetto — mâu thuẫn dữ liệu. Phán quyết giữ dataset; hồ sơ đã sửa khớp: mục 1 bảng V3=1994 Duoface + V4=1997 Duetto (nguyên văn Duetto đã có từ lượt web_reader 2026-09-26); Soixantième 1991 chuyển mục 2 "CÓ nguồn nhưng không chọn" với lý do biên tập số mốc — không viện dẫn ký tự; mục 4/5 đồng bộ. Dataset thêm kiểm cứng **I4-10** đúng tập 1930/Reverso, 1931/Reverso, 1994/Reverso Duoface, 1997/Reverso Duetto — lệch một mốc là fail (mutation M-C chứng minh).

**2. Sửa hồi quy checker G08 (phán quyết phương án a), không làm yếu kiểm Speedmaster:**
- G4: chỉ kiểm `import { omegaSpeedmasterEvolution }` và việc `omegaSpeedmasterEvolution` có mặt trong mảng DATASETS — bỏ điều kiện đứng đầu mảng.
- G5: tập slug có sơ đồ suy từ `src/data/*.Evolution.ts` (bỏ hard-code ba slug); thêm ca "tập slug đăng ký không rỗng"; ca render yêu cầu mọi slug đăng ký × VI/EN (hiện 6 slug/12 route).
- Giữ nguyên: G1–G3, G6, G7, Speedmaster 7 nút + 7 URL nguồn, hồi quy Submariner/GMT-Master 8 nút mỗi ngôn ngữ.


## 6c. Vòng sửa hẹp cuối (TXN-20260926-262) — G5 suy slug đúng từ registry

Phán quyết: G5 vòng trước quét mọi `src/data/*Evolution.ts` rồi gọi là "slug đăng ký" — chưa đúng cơ chế. Đã sửa: G5 parse các `import { X } from './X';` và phần tử thực tế của mảng `DATASETS` trong `src/data/modelEvolution.ts`, chỉ dataset được mảng đăng ký mới thuộc tập; dataset nằm trên đĩa mà không được đăng ký thì route của nó bị tính "lọt".

G5 hiện kiểm: (1) tập registry không rỗng; (2) mọi slug đăng ký render `data-evolution` ở cả VI và EN (hiện 6 slug/12 route); (3) không route iconic nào ngoài tập registry render sơ đồ; (4) giữ nguyên Speedmaster 7 mốc/7 URL, Submariner + GMT-Master 8 nút mỗi ngôn ngữ; G4 giữ nguyên logic "import + có mặt trong mảng". Không dùng danh sách slug hard-code. Mutation M-H (bỏ khỏi mảng, giữ tệp) và M-I (đăng ký giả không route) chứng minh cả hai chiều đều fail.

## 7. Điểm chưa giải quyết

Không còn. Mâu thuẫn G08 đã xử lý trọn qua hai lượt: vòng sửa 1 (phương án a) gỡ khóa vị trí đầu mảng và hard-code ba slug; vòng sửa hẹp cuối đưa G5 về suy slug đúng từ registry `DATASETS` — `npm run build` exit 0 trọn chuỗi, G08 trực tiếp exit 0, mutation 9/9 có M-A/M-B/M-H/M-I chứng minh mọi hướng đều bị chặn.

`npm run build` exit 1 do `scripts/check-g08-speedmaster-evolution.cjs` (G08, đã phát hành `403a8e3` — tệp KHÔNG thuộc phạm vi I4 được phép sửa) có hai ca hard-code trạng thái trước I4:

1. **G4 "import + DATASETS đăng ký Speedmaster"** — pattern `/DATASETS[^;]*\[omegaSpeedmasterEvolution,/` đòi Speedmaster đứng ĐẦU mảng DATASETS trong `modelEvolution.ts`. I4 đăng ký ba dataset mới theo alphabet → omega không còn đứng đầu → ca fail.
2. **G5 "không sơ đồ nào lọt route khác"** — danh sách slug có dataset hard-code = 3 mẫu cũ (omega-speedmaster, rolex-submariner, rolex-gmt-master); 6 route I4 mới (royal-oak, fifty-fathoms, reverso × VI/EN) render `data-evolution` và bị tính là "lọt".

Cả hai ca là ràng buộc hard-code trạng thái thời G08 — cứ thêm sơ đồ mới là chặn. Bằng chứng: chạy `node scripts/check-g08-speedmaster-evolution.cjs` sau build → "KHÔNG ĐẠT (2 ca)" (`build.log.txt` dòng 3885, 3890). Mọi phần khác của chuỗi build (astro build + toàn bộ checker dist khác) ĐẠT; dist mới đầy đủ và các kiểm dist chạy riêng đều xanh.

Theo quy tắc "không tự sửa tệp ngoài phạm vi để làm xanh kiểm tra", I4 KHÔNG đụng tệp .cjs này và DỪNG chờ quyết định GPT Work, ví dụ: (a) cho phép một gói sửa nhỏ G08 checker (G4 nhận mảng đa dòng/đa dataset; G5 suy danh sách slug từ registry như check-evolution-routes đã làm), hoặc (b) phương án khác GPT Work thấy phù hợp.

## 8. Trạng thái Git cuối phiên

- HEAD = origin/main = `68e0a6b4636fc3ddb92c008b35e4cbbda06dc4b0` — chưa commit, chưa push, staged = 0
- Tracked sửa 2: `package.json`, `src/data/modelEvolution.ts`
- Tạo mới: 3 hồ sơ dữ liệu docs/, 3 dataset `src/data/`, `scripts/check-i4-model-evolution.mjs`, biên bản này, `output/i4-model-evolution-audit/`
- Untracked có trước giữ nguyên
- `git diff --check` sạch; `git diff --cached --check` sạch (không có gì staged)
