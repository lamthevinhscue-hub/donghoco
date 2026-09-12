# G02 — Chuẩn hóa nguồn lịch sử và dữ liệu tái sử dụng (timeline 28 mốc)

- Giao dịch: TXN-20260912-06 · Danh mục DHC-NEXT-20260912 v1.0.0
- Thực hiện: GLM thực thi · Ngày: 12/09/2026 · Nền: `7c7ff91` (nhánh `main`, G01 đã commit/push)
- Trạng thái: **đã thực hiện xong và tự kiểm trong phạm vi báo cáo; chưa commit, chưa push, chưa deploy. Dừng chờ GPT Work nghiệm thu độc lập. Chưa chuyển G03/G04.**

## 1. Git trước/sau

- HEAD trước và sau khi làm: `7c7ff91` (main) — không commit. Tracked working tree trước khi làm: sạch.
- Lớp thay đổi thuộc G02: 4 tệp sửa (`src/data/timeline.json`, `src/pages/lich-su.astro`, `src/pages/index.astro`, `package.json`) + 1 tệp mới (`scripts/check-g02-history-timeline.mjs`) + hồ sơ/biên bản/output (mục 8).
- `git diff --check`: sạch (exit 0).

## 2. Tệp sửa/tạo và lý do

| Tệp | Thao tác | Lý do |
| --- | --- | --- |
| `src/data/timeline.json` | sửa | Nguồn sự thật của 28 mốc: schema mới tách `year` (số) khỏi `timeLabel` (nhãn hiển thị), thêm `dayType`, `claimLevel`, `claimScope`, `limit`, `sources` (1–4 nguồn cấp mốc với URL HTTPS, ngày kiểm, nội dung chứng minh), đổi `internalLink` → `readMore` |
| `src/pages/lich-su.astro` | sửa | Render nhãn thời gian mới, hàng meta loại ngày + mức chứng minh, khối giới hạn, danh sách nguồn, nhãn "Chưa có bài đọc thêm"; **sửa bug điều hướng thập niên** (`parseInt("~1510")` trả NaN làm mốc đầu bị loại, nút đầu nhảy nhầm mốc 2) — nay dùng `year` số |
| `src/pages/index.astro` | sửa | Dải lịch sử trang chủ hiển thị `m.timeLabel` thay `m.year` (1 dòng) |
| `scripts/check-g02-history-timeline.mjs` | tạo | Bộ kiểm G02: 8 ca lớp JSON + 8 ca lớp dist (mục 5) |
| `package.json` | sửa | Nối lớp JSON của check G02 vào cuối chuỗi `check`; nối toàn bộ (lớp dist) vào cuối `build` sau `astro build` — không đổi dependency |

## 3. Nguyên tắc biên tập đã áp dụng

- Mỗi mốc có hồ sơ nguồn cấp mốc: slug, thứ tự, loại mốc, nhãn thời gian, năm số, **loại ngày** (phát minh / cấp bằng / nộp đơn / đặt hàng / ra mắt / thương mại hóa / giai đoạn / đăng ký / hợp đồng / chế tác / thời điểm ghi nhận), claim hiển thị, mức chứng minh + phạm vi, nguồn trực tiếp kèm **ngày kiểm 12/09/2026** và giải thích nguồn chứng minh gì, trạng thái đọc tiếp.
- Không dùng một link tổng quát hợp thức hóa nhiều claim — 52 nguồn rời, mỗi nguồn ghi riêng nó chứng minh điều gì. Nguồn ưu tiên: hãng (Blancpain, Vacheron, Breguet, Patek, Cartier, Rolex, Omega, TAG Heuer, Zenith, Seiko + bảo tàng Seiko, IWC Press, JLC, Ulysse Nardin, Fortis, AP Chronicles, Swatch Group, METAS), bảo tàng (GNM, Science Museum Group), lưu trữ học thuật (NDB), patent (Google Patents ×2), tổ chức chuyên môn (FHH), thứ cấp uy tín (Sotheby's, Europa Star). Không dùng Wikipedia. Không dùng Britannica làm nguồn duy nhất (bị 403, không trích được nguyên văn).
- Chi tiết từng mốc (giữ / thu hẹp / bỏ / sửa dữ kiện + trích dẫn nguyên văn): `output/g02-history-timeline/ho-so-nguon-28-moc.md`.

## 4. Tóm tắt xử lý claim theo từng mốc

| # | Slug | Xử lý chính |
| --- | --- | --- |
| 1 | peter-henlein | Thu hẹp "đầu tiên" → "được ghi nhận" (NDB + GNM); thêm giới hạn niên đại (chiếc "1510" nghi giả mạo, định niên đại ~1530) |
| 2 | huygens-hairspring | Thu hẹp: bỏ "hàng giờ xuống hàng phút", bỏ "nền tảng mọi đồng hồ cơ"; title tách con lắc 1657 / dây tóc 1675; thêm giới hạn tranh chấp Hooke |
| 3 | blancpain | Sửa: 1735 = sổ bộ làng Villeret; "lâu đời nhất thế giới" là tự tuyên bố; ghi giới hạn mâu thuẫn với tuyên bố Vacheron |
| 4 | vacheron-constantin | Sửa: 1755 = hợp đồng học việc ("giấy khai sinh" theo hãng); "vận hành liên tục lâu đời nhất" là tự tuyên bố |
| 5 | breguet-tourbillon | Sửa dữ kiện hiển thị 1795 → **1801** (ngày cấp bằng 26/6/1801); ý tưởng 1793–1795 theo Swatch Group |
| 6 | breguet-naples | Giữ + định ngữ "theo hồ sơ hãng"; bổ sung giao hàng 1812 |
| 7 | patek-first-wristwatch | Thu hẹp: "đầu tiên" giới hạn "đồng hồ đeo tay Thụy Sĩ" theo hãng; bổ sung hiện vật bảo tàng |
| 8 | cartier-santos | Bỏ "đồng hồ đeo tay nam hiện đại đầu tiên"; dùng "one of the first" (Cartier) + "chiếc Cartier đầu tiên cho nam" (FHH); thêm 1911 bán ra (FHH) |
| 9 | trench-watch | Bỏ "thay thế hẳn đồng hồ bỏ túi"; giữ "lan rộng" theo Science Museum Group; thêm phát đồng hồ của Bộ Chiến tranh Anh |
| 10 | harwood-automatic | Bổ sung hồ sơ: đơn Anh 7/7/1923 + Thụy Sĩ 16/10/1923, bằng 1924, sản xuất hàng loạt 13/7/1926 (Fortis); giới hạn: "1928" trong tài liệu phổ biến không khớp hồ sơ |
| 11 | rolex-oyster | Thêm "theo hãng"; bỏ chi tiết "núm vặn ren xoắn" (nguồn ghi "hermetically sealed case"); giữ Gleitze 1927 |
| 12 | rolex-perpetual | Bỏ "chuẩn mực... đến nay"; thay câu hãng "lõi của mọi đồng hồ tự động hiện đại" có nhãn nguồn |
| 13 | jlc-reverso | Bỏ "định danh một thể loại"; thêm nộp đơn 4/3/1931 (Paris, Chauvot); không dùng số bằng 712.868 (chưa kiểm chứng trực tiếp) |
| 14 | iwc-pilot | Bỏ "khai sinh thể loại"; "tiên phong" là tự đánh giá IWC; bỏ "kim quay ngược" (không có trong nguồn); thêm vành xoay + chống từ + kính chống vỡ |
| 15 | rolex-datejust | Sửa claim theo đúng hãng: "chronometer tự động chống nước đầu tiên hiển thị ngày trong cửa sổ"; bỏ "trở thành tiêu chuẩn" |
| 16 | fifty-fathoms | Bỏ "một chiều" (nguồn hãng ghi vành có khóa); 91 m ghi là quy đổi; bỏ "chuẩn mực mọi đồng hồ lặn sau này" |
| 17 | rolex-submariner | Sửa hiển thị "1953–54" → **"1953"** (Rolex ghi cả hai mẫu 1953); sửa Everest: đoàn mang "Oyster Perpetual"; giới hạn: nguồn ngoài ghi 1954 |
| 18 | rolex-gmt | Bỏ "khai sinh chức năng hai múi giờ"; "đồng hồ chính thức của nhiều hãng hàng không, trong đó có Pan Am" theo nguyên văn Rolex |
| 19 | omega-speedmaster | Giữ; bổ sung dòng Professional 1957 + NASA 1965 (nguồn hãng); "đầu tiên đeo trên Mặt Trăng" gắn "theo Omega" |
| 20 | heuer-carrera | Bỏ "định hình ngôn ngữ thiết kế thể thao"; thay claim hãng "chiếc chronograph đầu tiên thiết kế sẵn cho đua xe" |
| 21 | automatic-chronograph-race | Giữ "cùng năm 1969"; Project 99 ghi "Heuer dẫn xướng" (Breitling ghi vào giới hạn); Seiko 6139 "mùa xuân 1969" (bảo tàng Seiko); El Primero 36.000 vph dẫn mẫu hiện hành |
| 22 | seiko-astron | Giữ "quartz thương mại đầu tiên" (Seiko + FHH); "Khủng hoảng Quartz" → "cuộc cách mạng quartz" theo FHH; thêm giá 450.000 yên |
| 23 | ap-royal-oak | Bỏ "thể thao thép cao cấp đầu tiên" và "cứu cả phân khúc"; dùng dữ kiện AP Chronicles: Basel 1972, Genta một đêm, CHF 3.300, "casual chic" |
| 24 | patek-nautilus | Bỏ "thống trị đến hôm nay" + "cặp song sinh"; dùng "đồng hồ thể thao đầu tiên trong 137 năm lịch sử hãng" (Patek); bỏ "Jumbo" |
| 25 | swatch-1983 | Sửa vai trò Hayek ("được giao xây chiến lược, hợp nhất hai hãng", CEO ở khối 1983–1985); ngày 1/3/1983 dẫn Europa Star; "nuôi sống cơ" → "tia lửa phục hưng" theo Swatch Group |
| 26 | omega-coaxial | Giữ; trích đúng "bộ thoát cơ khí thực dụng mới đầu tiên sau 250 năm" (Swatch Group); bổ sung hồ sơ patent Daniels (ưu tiên 1979, cấp 1984) |
| 27 | un-freak | "Lần đầu dùng silicium" gắn "theo hãng"; ghi đúng "Dual Direct Escapement"; bỏ "mở kỷ nguyên silicon" khỏi mô tả |
| 28 | silicon-revival | "Phổ cập toàn ngành" → "nhiều hãng lớn ứng dụng" (Patek/Rolex/UN); 15.000 gauss gắn METAS-N001; Master Chronometer 2015 tách khỏi bộ máy 2013; bỏ "không còn là công cụ đo giờ"; không ghi năm Syloxi (chưa xác minh) |

## 5. Bộ kiểm G02 và kết quả — 16/16 ca ĐẠT (exit 0)

Lớp JSON (chạy trong `npm run check`): G2-1a đủ 28 mốc; G2-1b slug duy nhất; G2-1c `year` là số nguyên không giảm; G2-2 `timeLabel` nhãn hiển thị (chỉ-digits phải khớp year); G2-3 loại ngày + mức claim thuộc bộ hợp lệ + claimScope bắt buộc với mức claim + nguồn HTTPS có `name`/`checked` (YYYY-MM-DD)/`proves`; G2-4 mốc ~1510 giữ nhãn xấp xỉ kèm year=1510; G2-5 chữ "đầu tiên" chỉ được tồn tại khi claimLevel ∈ {first-known, brand-first, brand-claim, type-first}; G2-6 `readMore` chỉ là route nội bộ "/" hoặc null.

Lớp dist (chạy trong `npm run build` sau `astro build`): G2-7 render đủ 28 thẻ; G2-8/8b 52 link nguồn + 19 khối "Giới hạn:" hiển thị đúng số; G2-9 nhãn "Chưa có bài đọc thêm" đúng 3 lần; G2-10 nút điều hướng đầu tiên `data-jump-to="0"` + thẻ `milestone-0` tồn tại; G2-11 không link nội bộ hỏng (loại asset tĩnh); G2-12 dải trang chủ hiển thị timeLabel; G2-13 không còn trường cũ `internalLink`.

Bằng chứng: `output/g02-history-timeline/check-g02-ket-qua.json`, `log-check-g02.txt`.

### Mutation test — sandbox cô lập tại thư mục tạm, 5/5 ca ĐẠT

Sandbox là thư mục tạm do script tự tạo bằng `mkdtempSync` trong `os.tmpdir()` (bản sao src/public/cấu hình; node_modules resolve từ repo — không sao chép). Script **chỉ ghi/xóa trong thư mục tạm do chính nó tạo**, dọn bằng `try/finally` (kèm retries cho khóa tệp Windows) nên luôn dọn sạch kể cả khi một ca lỗi; JSON/log bằng chứng vẫn ghi vào `output/g02-history-timeline/`. Sau khi chạy không còn thư mục sandbox nào. Lỗi `EPERM` khi xóa sandbox tại `output/` ở vòng trước đã được xử lý theo cách này; các log sandbox được **chuẩn hóa trailing whitespace lúc ghi** (nội dung/thông điệp log giữ nguyên).

| Ca | Tiêm | Kỳ vọng | Kết quả |
| --- | --- | --- | --- |
| S1 | bản sạch (giữ ~, khoảng năm) | exit 0 | ĐẠT (0/0) |
| M1 | xóa `sources` mốc harwood | exit ≠ 0, bắt G2-3 | ĐẠT |
| M2 | `year` peter-henlein thành chuỗi "~1510" | exit ≠ 0, bắt G2-1c | ĐẠT |
| M3 | thêm câu "đầu tiên" vào mốc context trench-watch | exit ≠ 0, bắt G2-5 | ĐẠT |
| M4 | `readMore` blancpain → `/khong-ton-tai-123` | exit ≠ 0, bắt G2-11 | ĐẠT |

Bằng chứng: `kiem-thu-sandbox-ket-qua.json`, `sandbox-*-ket-qua.json`, `log-sandbox-*-stdout.txt`.

## 6. Kiểm tra trước bàn giao (cập nhật vòng sửa hồ sơ TXN-20260912-08)

| Lệnh | Kết quả |
| --- | --- |
| Đường cơ sở `npm run check` (trước khi sửa, nền 7c7ff91) | exit 0 — astro check 187 tệp 0 errors (`log-baseline-check.txt`) |
| `npm run check` (sau sửa) | exit 0 — astro check 188 tệp **0 errors / 0 warnings / 4 hints** |
| `npm run check:types` (riêng, vòng sửa hồ sơ) | **0 errors / 0 warnings / đúng 4 hints baseline**: `output/p3.1-image-audit/do-dinh-dang.mjs:16:16` ('basename'), `output/p3.2-svg-gradient-audit/phan-nhom.cjs:10:45` ('sig'), `output/p3.2-svg-gradient-audit/quet-gradient.cjs:27:9` ('lines'), `output/p3.3-cluster-script-audit/kiem-thu-hoi-quy.cjs:239:13` ('duongDan') — hint thứ 5 phát sinh từ hàm không dùng trong `kiem-thu-sandbox.mjs` đã được gỡ bỏ |
| `npm run build` (build nghiệm thu, lần 5 — sau mọi sửa hồ sơ) | exit 0 — **286 trang** (không tạo route mới), **20.622 link, 0 hỏng**; G01 checker **63/63 ĐẠT**, G02 checker **16/16 ĐẠT** (`log-build-nghiem-thu.txt`, đã chuẩn hóa trailing whitespace khi ghi) |
| Script G02 (lớp JSON + dist) | **16/16 ĐẠT** |
| Kiểm liên kết sau build | trong build: "Đã quét 286 trang HTML, 20622 link" — ĐẠT |
| Mutation sandbox — chạy độc lập **2 lần liên tiếp** | mỗi lượt **5/5 ca ĐẠT, exit 0**, sandbox dọn sạch, không để lại thư mục sandbox/tệp tạm |
| Quét trailing whitespace toàn bộ tệp văn bản G02 | **0 kết quả** (tệp PNG binary loại khỏi quét — xác nhận riêng magic bytes PNG nguyên vẹn) |
| `git diff --check` | sạch |

Phân rã liên kết riêng của G02: **+58 so với 20.564** (mốc sau G01) = **+52 link nguồn** (tổng số nguồn trong 28 mốc, mỗi nguồn một `<a href>` trên thẻ) + **6 link "Đọc chi tiết" mới** (mốc 2, 6, 11, 15, 22, 26) = khép kín 20.622. Nhãn "Chưa có bài đọc thêm" là văn bản, không phải link.

### Kiểm trình duyệt `/lich-su` — 40/40 ĐẠT (`trinh-duyet-ket-qua.json`, ảnh trong `anh/`; tái chạy lại trong vòng sửa hồ sơ sau khi 4 ảnh bị hỏng do lỗi công cụ quét — đã chụp lại và xác nhận PNG hợp lệ)

320px và 1440px × sáng/tối, theme đọc thật từ DOM:
- đủ 28 thẻ mốc; không tràn ngang; 28 ảnh timeline load hết (đã cuộn kích hoạt lazy-load trước khi đo);
- mốc đầu hiển thị nhãn "~1510";
- **nút điều hướng đầu tiên xuất hiện** ("1500s", trước đây bị lỗi NaN làm mất) và đưa tới đúng thẻ Peter Henlein — desktop click trực tiếp, mobile mở panel rồi bấm; bàn phím: focus nút + Enter nhảy tới mốc (4 tổ hợp);
- 52 nguồn hiển thị dạng link + ngày kiểm; 19 khối "Giới hạn:"; 25 link "Đọc chi tiết" + 3 nhãn "Chưa có bài đọc thêm" khớp dữ liệu;
- dark mode đúng (đọc `html.dark`).

## 7. Giới hạn, điểm chưa xử lý, điểm cần GPT Work lưu ý

1. **Chưa kiểm bằng trình đọc màn hình thật**; bàn phím đã tự động hóa qua DOM.
2. **Hành vi cuộn của nút điều hướng là mã hiện hành giữ nguyên** (`scrollIntoView` block "center" + smooth): sau khi nhảy, mép trên thẻ có thể hụt dưới header sticky một đoạn nhỏ ở một số viewport (top −22px tại 1440, −140px tại 320 sau phép đo chờ 2s). Điều kiện nghiệm thu "đưa tới đúng thẻ" đạt (đúng thẻ ~1510, ≥50% thẻ hiển thị trong màn hình, chi tiết top ghi trong JSON). Nếu muốn căn chuẩn hơn (ví dụ `scroll-margin-top` hoặc behavior "auto"), đó là chỉnh nhỏ ngoài dữ kiện — đề xuất riêng, không tự làm.
3. Thanh lọc sticky `top-16` của `/lich-su` cuộn khỏi viewport khi cuộn sâu — **hiện trạng nền đã ghi nhận ở G01** (đối chiếu worktree `4129437` trùng số), không thuộc phạm vi G02.
4. Các chi tiết ghi vào giới hạn trong dữ liệu (hiển thị cho người đọc): niên đại Henlein (1), tranh chấp Hooke (2), tuyên bố "lâu đời nhất" Blancpain/Vacheron (3, 4), "theo hồ sơ hãng" Naples (6), phạm vi "Thụy Sĩ" Patek 1868 (7), "one of the first" Santos + năm 1911 theo FHH (8), không "thay thế hẳn" (9), cảnh báo "1928" Harwood (10), câu hãng Perpetual (12), "tiên phong" IWC (14), vành Fifty Fathoms + quy đổi 91 m (16), Submariner 1953/1954 (17), Breitling-Project 99 + "mùa xuân 1969" Seiko (21), "first luxury sports watch" Royal Oak (23), vai trò Hayek/Thomke (25), hồ sơ patent Daniels (26), tuyên bố silicon Freak (27), METAS-N001 + Syloxi không ghi năm (28).
5. Những dữ kiện đã tra nhưng KHÔNG đưa vào hiển thị vì chưa đủ nguồn trong nhóm cho phép (không mất mát — lưu tại đây): ngày/tháng bơi Manche 1927; ngày giao 21/12/1812; số bằng Reverso 712.868; tháng công bố El Primero 1/1969 (chỉ có gián tiếp qua TAG Heuer); "tháng 5/1969" Seiko 6139; vai trò Breitling trong Project 99; năm phát minh Co-Axial của Daniels (1974/1976); năm ra mắt Rolex Syloxi.
6. Không sửa ảnh timeline, không tạo bài mới, không đụng nội dung thương hiệu/iconic ngoài timeline (chỉ đọc đối chiếu). Các bài thương hiệu/iconic liên quan đã có hàng rào P0–P1 — wording timeline mới không mạnh hơn bài (đối chiếu rolex.md/breguet.md/omega.md/seiko.md: timeline dùng mức bảo thủ hơn hoặc ngang).

## 8. Danh sách chính xác tệp thuộc gói (đề xuất commit)

1. `src/data/timeline.json` (sửa)
2. `src/pages/lich-su.astro` (sửa)
3. `src/pages/index.astro` (sửa)
4. `package.json` (sửa)
5. `scripts/check-g02-history-timeline.mjs` (mới)
6. `docs/nghiem-thu/G02-chuan-hoa-nguon-lich-su-2026-09-12.md` (mới — biên bản này)
7. `output/g02-history-timeline/` (23 tệp: hồ sơ nguồn, JSON + log kết quả (check-g02, build, baseline, sandbox 5 ca, trình duyệt), 2 công cụ (`kiem-thu-sandbox.mjs`, `pw-lich-su.js`), 4 ảnh trong `anh/`)

Tổng: 29 tệp. Không đưa tệp untracked có trước vào danh sách.

---

G02 đã thực hiện xong và tự kiểm trong phạm vi báo cáo; chưa commit, chưa push, chưa deploy. Dừng chờ GPT Work nghiệm thu độc lập. Chưa chuyển G03/G04.
