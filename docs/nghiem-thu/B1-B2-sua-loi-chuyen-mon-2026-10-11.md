# BIÊN BẢN THI CÔNG B1+B2 — Sửa 8 nhóm lỗi chuyên môn + bỏ 4 biểu tượng

**Gói:** B1+B2 — sửa lỗi chuyên môn còn tồn và ký tự ngoài quy tắc
**Danh mục:** DHC-HOAN-THIEN-20261011 v1.0.0
**Giao dịch:** TXN-20261011-07 (câu lệnh thi công của GPT Work)
**Ngày thi công:** 11/10/2026 · **Nền:** HEAD `09261e7` = `origin/main`
**Bên thi công:** GLM (phiên điều phối ZCode). Bên nghiệm thu: GPT Work.

## 1. Tổng quan phạm vi

- **27 bài nội dung** sửa (15 bài B1 theo bảng câu lệnh — 8 nhóm; 12 bài B2 theo bảng đầu vào), **không phải 27 cặp**.
- **5 tệp hỗ trợ:** CAN-KIEM-CHUNG.md (đóng 57, 59; mở 60), scripts/check-b1b2-editorial-fixes.mjs (mới), package.json (chỉ nối checker), docs/giao-viec/THEO-DOI.md, biên bản này.
- **Điểm dừng đã giải quyết (vòng 1):** scripts/check-p0-d2-glossary-expansion.mjs ngoài phạm vi ban đầu — GPT Work **duyệt vá allowlist** tại TXN-20261011-08 và vá đã áp (mục 10.1); phạm vi phát hành thành **34 tệp** (mục 9).

## 2. Thay đổi theo từng nhóm (câu trước → sau, theo câu lệnh mục 3)

**B1-1 IWC Mark XI (VI+EN)** — frontmatter: bỏ `power_reserve`/`water_resistance`, `references: ["Mark 11", "Mark XX"]`; câu chống từ "bảo vệ khỏi từ trường tới ~1.000 gauss." → "bảo vệ bộ máy (movement) khỏi từ trường — yêu cầu chống từ là điểm RAF đặt ra riêng cho mẫu này, theo IWC."; mục tiến hóa thay toàn bộ (Mark 11 theo IWC Press: calibre 89, giao 11/1949, tới 1981, tritium 1963; dòng khái quát các thế hệ dân sự; Mark XX IW328208/40 mm/32111/120 giờ/10 bar); mục bộ máy: "JLC 889, rồi ETA 2892 chỉnh sửa" → "Mark XX hiện hành dùng calibre 32111 do IWC sản xuất". Thêm 2 nguồn IWC. **Không đưa thông số Mark XX vào frontmatter mẫu gốc.**

**B1-2 Biên độ (VI+EN)** — excerpt mới; thêm đoạn quy ước đo hẹp: "theo tài liệu của Witschi, đó là góc từ **vị trí cân bằng** của bánh lắc tới **điểm quay đầu** — tức chỉ một phía của dao động. Vì vậy máy báo 280° nghĩa là bánh lắc quay khoảng 280° về một phía, rồi lặp lại dao động về phía kia." (bỏ chi tiết "chân xung lực giữa hai sừng" — không có nguồn riêng; không lấy tolerance 200–330° làm chuẩn); "Bộ phận **nhận** xung lực" → "**truyền** xung lực tới bánh lắc"; thêm nguồn WAIO.

**B1-3 Swiss Made (VI+EN)** — nhãn nguồn `SR 817.021.51` → `SR 232.119` (URL Fedlex giữ nguyên; rà thân bài không còn 817).

**B1-4 Patek Seal (VI+EN)** — "chuẩn nội bộ riêng, khắt khe hơn dấu ấn Genève, áp dụng cho…" → "chuẩn nội bộ riêng của hãng, áp dụng cho cả chiếc đồng hồ hoàn thiện chứ không chỉ bộ máy." (EN tương ứng); thêm nguồn the-patek-philippe-seal.

**B1-5 Lịch vạn niên (VI+EN)** — nhãn FHH bỏ "điểm chỉnh 2100/2400"; thân: "Theo FHH… kế tiếp là 2100 và 2400" → hai phần: FHH ghi các năm không-nhuận ngoại lệ; phần giải thích "chỉ phải chỉnh vào những năm tròn thế kỷ không nhuận — kế tiếp là 2100, rồi 2200 và 2300. Năm 2400 chia hết cho 400 nên vẫn là năm nhuận theo quy tắc lịch Gregory (quy tắc năm nhuận thế kỷ — nguồn USNO), nằm ngoài nhóm ngoại lệ thế kỷ ấy. Mục từ của FHH ghi cả 2400 vào danh sách cần chỉnh; bài này không theo điểm đó." Thay nguồn Wikipedia bằng USNO. **Không viết "không cần chỉnh"/"đúng mãi mãi".**

**B1-6 Chronograph (VI)** — "thợ hồ" → "thợ đồng hồ". EN giữ nguyên.

**B1-7 Hiển thị ngày (VI+EN)** — (a) đĩa ngày "nằm ngay dưới mặt số; qua lưng kính thường không nhìn thấy…"; (b) mục đổi tên "Ngón đẩy và cá nhảy"/"The finger and the date jumper": bánh dẫn lịch quay 1 vòng/24h mang **ngón đẩy**, **cá nhảy** (date jumper) là lò xo định vị giữ đĩa; "cách tích và nhả năng lượng tùy thiết kế từng bộ máy" (bỏ claim "cá nhảy búng đĩa" — không dẫn ETA vì tài liệu không truy cập được, xem mục 5); (c) lịch bò dần: bỏ "cổ hơn, đắt cơ cấu ít hơn" và mốc "2-3 giờ" — mô tả "số có thể nằm giữa hai vị trí trong lúc chuyển"; (d) khung giờ: "trong **vài giờ quanh nửa đêm**… Khung giờ cụ thể khác nhau theo bộ máy"; bỏ 20:00–04:00 làm quy tắc và bỏ lời chỉ "đưa kim về 6 giờ"; hướng "tra hướng dẫn của hãng đúng mẫu và calibre; nếu không có tài liệu, chưa nên dùng chức năng chỉnh nhanh ngày". sourceNotes EN đồng bộ (bỏ gán khung giờ cho FHH). Công cụ mô phỏng trong bài chỉnh lịch giữ nhãn "ví dụ trực quan".

**B1-8 Dạ quang (VI+EN)** — excerpt mới; tiêu đề "Nguyên lý — hai cách phát sáng"/"two ways to glow"; đoạn nguyên lý hai cách (lân quang nạp sáng vs radioluminescence); radium/tritium: sửa "tự phát sáng… tự bức xạ" thành "chất phóng xạ liên tục kích thích chất phát quang trộn trong sơn — nguyên tố không tự phát ánh sáng nhìn thấy được" (bỏ "mãi mãi"/"forever"); "thảm kỷ niệm" → "bài học đau xót" (EN "tragedies" → "painful lessons"); thêm nguồn RC Tritec + Luminox. Câu phủ định "vật liệu **không tự phát sáng**" (Super-LumiNova) giữ nguyên — phủ định hợp lệ.

**B2 — 12 tệp** theo bảng đầu vào: `⚠️ ` → `Lưu ý: `/`Note: ` (chong-tu, anti-magnetism); tru-cot **xóa cả dòng** "Infographic động đã có"; 7 chỗ `> 💡 ` → `> **Ghi chú:** `/`**Note:**` (bo-thoat-dong-truc, chong-soc, chinh-lich-an-toan, setting-the-date-safely, doc-va-chinh-gmt ×2, dung-tachymeter, dung-vanh-lan ×2); 6 chỗ `- ❌ **X**` → `- **Tránh: x**`/`- **Avoid: x**` (len-day-dong-ho ×3, winding-a-mechanical-watch ×3). Quét lại toàn `src/content/`: **sạch 4 biểu tượng** (không quét tài liệu quản trị).

**CAN-KIEM-CHUNG:** mục 57 → `ĐÃ GIẢI QUYẾT` (bullet cập nhật 11/10); mục 59 → `ĐÃ GIẢI QUYẾT` (nguồn WAIO trang in 44); thêm **mục 60** `CHỜ NGUỒN` (thông số Mark XII–XVIII); dòng "Bổ sung 11/10/2026" trong phần tổng kết.

## 3. Nguồn — ngày đọc 2026-10-11, trích nguyên văn tại `output/b1b2-editorial-audit/nguon-nguyen-van.md`

IWC Press (6 mệnh đề Mark 11 đủ); IWC IW328208 (spec table — qua proxy đọc trang do Akamai chặn curl); Witschi WAIO **trang in 44** ("angle between the equilibrium position (rest position of the balance) and the maximum rotation (turning point)"); Fedlex ("Ordonnance 232.119…", "232.119" ×8); Patek Seal ("applies to the entire watch…"; trang KHÔNG so sánh Geneva Seal); USNO (quy tắc chia hết 400 + ví dụ 1700/1800/1900/2000 — **trang không nêu riêng 2100–2400**, cách gán nguồn trong bài đã ghi "(quy tắc… — nguồn USNO)" để không qui sai); RC Tritec ("radium-activated zinc sulphide… free of any radioactivity"); Luminox ("needs to be charged by light").

## 4. Kiểm hồi quy — checker mới `check-b1b2-editorial-fixes.mjs`

- Hai chế độ: nguồn (15 phép kiểm = rule B1-1…B1-8 × ngôn ngữ + B2 quét) và dist (16 phép kiểm, soi đúng `<article>` của từng route, không tìm trên toàn HTML).
- Nguồn: **ĐẠT 15/15, exit 0**. Dist (dist mới): **ĐẠT 16/16, exit 0**. Nguồn mới hiển thị trong khối nguồn dist (URL kiểm trực tiếp trong article).
- Đã nối: `npm run check` (nguồn, sau checker C0, trước check:types) và cuối `npm run build` (dist).

## 5. Mutation và phép thử (kết quả vòng 0 — lịch sử trước vòng sửa 1)

- **9 ca mutation trong sandbox** (`mutation-va-build-sandbox.log`): M1–M9 phá đúng một rule chủ đích (B1-1…B1-8, B2) — **9/9 exit 1 đúng rule**; lượt sạch sau mutation: checker nguồn exit 0 (tách riêng khỏi số mutation).
- **Build đầy đủ trong sandbox có vá P0-D2 đề nghị: exit 0** (0/0/0, Pagefind 355 trang), checker dist ĐẠT — chứng minh vướng duy nhất của build thật là allowlist P0-D2 (mục 6). Sandbox dọn sạch.
- Repo thật: `npm run check` **exit 0**; G08 **ĐẠT** ("khớp hồ sơ, đúng route, sạch claim cũ") và G09 **ĐẠT** ("0 ID trùng") chạy trực tiếp trên dist mới; scan-chars 462 tệp OK; hai diff-check sạch.

## 6. Điểm dừng — xin duyệt vá P0-D2 (lịch sử — đã được duyệt và áp tại vòng sửa 1)

- `npm run build` thật dừng tại **`scripts/check-p0-d2-glossary-expansion.mjs` R3**: hai bài bien-do/amplitude có URL mới WAIO chưa thuộc allowlist mục (URL do chính câu lệnh chỉ định làm nguồn B1-2). Diff đề nghị 1 dòng: `p0-d2-allowlist-de-xuat.diff` — thêm `'https://www.hswalsh.com/usercontent/doc/30780/HWAIO%20-%20Witschi%20WAIO%20Operating%20Instructions.pdf'` vào `allow` của mục `bien-do/amplitude` (dòng 32). Tại thời điểm biên bản vòng 0: chưa áp; **vòng sửa 1 đã áp theo phán quyết duyệt vá của GPT Work (TXN-20261011-08)**. Không lách bằng attribution giả.
- **Không cần vá** checker lịch R5: cách diễn đạt B1-5 tránh các cụm cấm, checker lịch **ĐẠT** trong `npm run check` thật.

## 7. Preview allowlist route

`astro preview` (port 4322): **27/27 route trong allowlist trả 200**; nội dung mới và khối nguồn kiểm bằng checker dist ở mục 4 (cùng thư mục dist). Ghi chú trung thực: kiểm HTTP qua preview server + tệp dist, không dùng trình duyệt.

## 8. Giới hạn chưa giải quyết

1. Tài liệu ETA (shopb2b) **không truy cập được** (Akamai chặn TLS) → không dẫn, câu tùy-thiết kế viết khái quát không trích nguồn.
2. Khung giờ chỉnh ngày cụ thể không nêu trong bài (theo tắc câu lệnh); manual Seiko 6L37 có cửa sổ 21:00–01:00 **riêng calibre đó** đã đọc nhưng không đưa vào để tránh thành quy tắc chung.
3. USNO không nêu riêng các năm 2100–2400 — bài đã tách rõ "quy tắc" (USNO) khỏi "áp vào 2400" (suy từ quy tắc).
4. Mục 60 CAN-KIEM-CHUNG chờ nguồn IWC cho Mark XII–XVIII.

## 9. Danh sách commit đề nghị (34 tệp theo phán quyết vòng 1)

27 bài nội dung (15 B1 + 12 B2 như bảng câu lệnh) + CAN-KIEM-CHUNG.md + scripts/check-b1b2-editorial-fixes.mjs (mới) + package.json + docs/giao-viec/THEO-DOI.md + biên bản này + **scripts/check-p0-d2-glossary-expansion.mjs** (vá allowlist đã được GPT Work duyệt tại TXN-20261011-08) + **src/data/glossary-terms.json** (build sinh lại, đúng 1 dòng — excerpt bien-do theo nội dung mới, đã đối chiếu diff). **Chưa stage, chưa commit, chưa push.**

## 10. Vòng sửa

### Vòng 1 (theo tái nghiệm thu TXN-20261011-08 — GPT Work phán CHƯA ĐẠT ngày 11/10)

1. **Áp vá P0-D2 đã duyệt**: thêm đúng URL WAIO vào allowlist mục bien-do/amplitude (dòng 32), không mở domain, không đổi tiêu chí khác; checker P0-D2 **ĐẠT** sau vá.
2. **CAN-KIEM-CHUNG đồng bộ**: mục 57 và 59 — heading và dòng "Trạng thái" chuyển hiện hành thành **ĐÃ GIẢI QUYẾT (11/10/2026)**; dòng trạng thái cũ gắn nhãn "lịch sử 20/09–25/09" và ghi chú ràng buộc "Checker H03-B" là lịch sử, không còn là ràng buộc hiện hành (đã rà: không còn script H03-B nào đang chặn). Mục 60 giữ CHỜ NGUỒN; không đổi mục khác.
3. **Siết checker**:
   - Nguồn mới kiểm **URL chính xác** trong khối sources frontmatter (`url: "<URL>"` nguyên văn) cả VI/EN — phép thử tấn công của GPT Work (đổi URL WAIO giữ nhãn) nay **fail đúng B1-2** (đã mô phỏng lại: exit 1, "KHÔNG ĐẠT B1-2 biên độ VI").
   - Dist kiểm **href nguồn thật** (`href="<URL>"`) trong article của đúng bài/ngôn ngữ.
   - Trích article **fail cứng** khi thiếu `<article>` (bỏ fallback toàn HTML); báo "KHÔNG tìm thấy <article>".
4. **Mutation 12 ca** (9 cũ + 3 mới: M10 đổi URL giữ nhãn → B1-2; M11 gỡ href nguồn dist giữ nhãn → B1-2 dist; M12 strip `<article>` giữ chuỗi → báo thiếu article) — **12/12 đúng kỳ vọng exit code lẫn rule; bộ thử tự kiểm**: bất kỳ ca sai kỳ vọng làm chính bộ thử exit 1 (đã chạy: exit 0 = mọi ca khớp). Lượt sạch tách riêng: sau mutation nguồn exit 0; build sandbox exit 0.
5. **Phạm vi đồng bộ**: glossary-terms.json kiểm tra diff = đúng 1 dòng excerpt bien-do (sinh lại bởi `generate-glossary-terms.mjs` trong build); tổng danh sách phát hành **34 tệp** như mục 9.
6. **Kiểm lại trọn bộ (repo thật)**: `npm run check` exit 0; `npm run build` đầy đủ **exit 0** (0/0/0, Pagefind 355 trang, B1B2 dist ĐẠT cuối chuỗi); checker nguồn 15/15 + dist 16/16; scan-chars 462 tệp OK; hai diff-check sạch; fixture G08 nguyên hash `96f51063…`.
7. **Preview + meta**: astro preview **27/27 route 200** (bằng chứng HTTP/dist — **không phải kiểm trình duyệt**); 15/15 route B1 đủ `rel="canonical"` + `hreflang`; liên kết VI/EN và đọc thêm kiểm qua nội dung dist trong checker (rule B1-1…B1-8 soi đúng article từng route).

### Vòng sửa 2 (theo tái nghiệm thu TXN-20261011-09 — GPT Work phán CHƯA ĐẠT ngày 11/10)

1. **Checker nguồn — đọc đúng mảng sources**: `mangNguonFm()` tách khối `sources:` của frontmatter, thu thập trường `url:` của TỪNG PHẦN TỬ; URL bắt buộc phải nằm trong tập đó — URL giấu ở `auditNote`, `sourceNotes`, chú thích hay trường khác không được tính. Phép thử của GPT Work (đổi URL sources thành URL giả + đặt URL đúng ở auditNote) nay **fail đúng B1-2** (mutation M13).
2. **Checker dist — href chỉ đếm trong section khối nguồn**: tìm `<section class="source-list…">…</section>` trong article; `href` nguồn bắt buộc phải nằm trong section này; thiếu section là lỗi riêng. Phép thử của GPT Work (gỡ href khỏi khối nguồn + chèn liên kết cùng URL vào đoạn thân) nay **fail đúng B1-2 dist** (mutation M14). Không sửa SourceList.astro/template.
3. **Mutation 14 ca** (11 nguồn: M1–M10, M13 + 3 dist: M11, M14, M12) — **14/14 đúng kỳ vọng exit code lẫn rule; bộ thử tự kiểm** (sai kỳ vọng → bộ thử exit 1; lần chạy này exit 0). Lượt sạch nguồn/dist tách riêng.
4. **Đồng bộ biên bản**: mục 5, 6 gắn nhãn "lịch sử trước vòng sửa 1"; mục 6 ghi rõ vá đã áp.
5. **Kiểm lại repo thật**: `npm run check` exit 0; `npm run build` đầy đủ exit 0 (0/0/0, Pagefind 355, B1B2 dist ĐẠT cuối chuỗi); checker nguồn 15/15 + dist 16/16; hai diff-check sạch; scan-chars OK. **Phạm vi giữ nguyên 34 tệp — vòng này chỉ sửa checker B1B2, biên bản, THEO-DOI và bộ thử output/.**

### Vòng sửa 3 (sửa cuối tối hẹp theo tái nghiệm thu TXN-20261011-10 — GPT Work phán CHƯA ĐẠT ngày 11/10: chỉ còn bộ mutation và biên bản)

1. **Bộ mutation tự hoàn nguyên có kiểm chứng**: mỗi ca (a) sao lưu bản gốc + ghi SHA-256 trước; (b) mutate; (c) kiểm với tự xác minh exit code lẫn rule; (d) hoàn nguyên và **đối chiếu SHA-256 byte-đối-byte** — lệch SHA là lỗi bộ thử. Lỗi tạo/hoàn nguyên mutation làm bộ thử thất bại (đã gặp thật: ca M13 viết sai chuỗi khôi phục khiến build và các ca dist lỗi dây chuyền — bộ thử báo THẤT BẠI đúng cơ chế, đã sửa rồi chạy lại).
2. **Sau cả 14 ca: hai lượt sạch cuối bắt buộc** trên cây đã hoàn nguyên — nguồn exit 0 + dist exit 0, ghi riêng trong log (`LUOT SACH CUOI nguon/dist`), không tính vào số mutation.
3. **Bỏ lệnh dist cuối bỏ qua exit code** và chú thích cho phép giữ tệp bị strip article; ba ca dist (M11, M14, M12) đều hoàn nguyên byte-đối-byte sau từng ca.
4. **Kết quả chạy thật:** 14/14 ca đúng kỳ vọng + hoàn nguyên SHA khớp + 2/2 lượt sạch cuối exit 0 (`mutation-va-build-sandbox.log`). `npm run check` exit 0; `npm run build` đầy đủ exit 0. Phạm vi giữ 34 tệp; vòng này chỉ sửa bộ thử output/, biên bản, hàng B1+B2 trong THEO-DOI.

### Vòng sửa 4 (sửa cuối theo tái nghiệm thu TXN-20261011-11 — GPT Work phán CHƯA ĐẠT: M13 chưa qua cơ chế sao lưu+SHA)

1. M13 chuyển vào cùng khuôn `mut` chung: sao lưu bản gốc + SHA-256 trước, mutate, kiểm tự xác minh, hoàn nguyên từ bản sao gốc và đối chiếu SHA byte-đối-byte — khôi phục bằng chuỗi ngược đã bỏ hẳn.
2. Chạy lại đủ 14 ca + hai lượt sạch cuối: **14/14 ca đúng kỳ vọng, mọi ca "da hoan nguyen, SHA khop" (gồm M13), 2/2 lượt sạch cuối exit 0**; nhãn phần nguồn: **11 ca nguồn (M1–M10, M13) + 3 ca dist = 14 mutation; hai lượt sạch cuối tính riêng**. Phạm vi giữ 34 tệp; vòng này chỉ sửa bộ thử output/, biên bản (kể cả sửa chính tả "THẤT BẠI"), hàng B1+B2 trong THEO-DOI.
