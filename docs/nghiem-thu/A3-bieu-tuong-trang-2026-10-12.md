# BIÊN BẢN THI CÔNG A3 — Biểu tượng trang ICO, PNG, iPhone

**Gói:** A3 — biểu tượng trang ICO/PNG/iPhone
**Danh mục:** DHC-HOAN-THIEN-20261011 v1.0.0
**Giao dịch:** TXN-20261012-10 (câu lệnh thi công của GPT Work)
**Ngày thi công:** 12/10/2026 · **Nền:** HEAD `a6e5b8c` = `origin/main`
**Bên thi công:** GLM (phiên điều phối ZCode). Bên nghiệm thu: GPT Work.

## 1. Nền

- Git sạch ngoại trừ `docs/giao-viec/THEO-DOI.md` (M — hàng A1 GPT cập nhật + hàng A2 phát hành; tiếp nhận nguyên trạng).
- `sharp 0.35.4` có sẵn trong node_modules (không thêm dependency).
- Nguồn kiểm ngày 12/10/2026: Apple Safari Web Content guide (apple-touch-icon 180×180), Sharp API output, Chromium ICO tools (cấu trúc ICONDIR/ICONDIRENTRY).

## 2. Thay đổi theo từng tệp (đúng 9 tệp của câu lệnh)

**Tạo:**

1. `public/favicon.ico` — ICO thật: ICONDIR (type=1, count=3) + 3 ICONDIRENTRY (16/32/48) + payload PNG sharp-generated. Không đổi đuôi PNG.
2. `public/favicon-32x32.png` — PNG 32×32, RGBA, nền trong suốt.
3. `public/apple-touch-icon.png` — PNG 180×180, nền kín #16323b, SVG 144×144 đặt giữa (lề 18px/cạnh), không bo góc, không chữ.
4. `scripts/generate-a3-icons.mjs` — generator đọc trực tiếp `public/favicon.svg` qua sharp; sinh 3 tệp trên; hash lặp lại xác nhận (chạy 3 lần cho cùng bytes).
5. `scripts/check-a3-icons.mjs` — mới, hai chế độ nguồn và dist.
6. `docs/nghiem-thu/A3-bieu-tuong-trang-2026-10-12.md` — biên bản này.

**Sửa:**

7. `src/layouts/BaseLayout.astro` — khối favicon: thêm 3 thẻ mới (ICO + PNG + apple-touch-icon), giữ nguyên SVG; thứ tự attribute: rel→type→sizes→href (khớp checker regex); chú thích cập nhật G09-A+A3.
8. `package.json` — nối generator đầu build (`node scripts/generate-a3-icons.mjs &&`), checker nguồn vào `npm run check` (sau A2), checker dist cuối build.
9. `docs/giao-viec/THEO-DOI.md` — chỉ hàng A3.

Không sửa favicon.svg, astro.config, vercel.json, tsconfig, template khác, nội dung bài, dependency, checker cũ, A1/A2.

## 3. Kết quả kiểm (LỊCH SỬ — candidate trước vòng TXN-02; hiện hành xem mục 11)

| Kiểm | Kết quả |
|---|---|
| Generator chạy 3 lần | hash ba đầu ra khớp (lặp lại OK) |
| ICO giải mã | ICONDIR type=1 count=3; entries 16x16@54+630, 32x32@684+1132, 48x48@1816+1869; từng payload PNG signature 89504e47, kích thước thực khớp khai báo |
| Apple icon | 180×180, alpha min=255 (nền kín), góc #16323b, giữa #D9BC8B (vàng thương hiệu SVG) |
| Checker A3 nguồn | ĐẠT 9/9 (lịch sử) |
| Checker A3 dist | ĐẠT (3 asset byte-match + 360 trang đủ 4 thẻ) (lịch sử) |
| `npm run check` | exit 0 (5 hints — lịch sử; hiện hành 6 hints) |
| `npm run build` | exit 0, Pagefind 361 trang (lịch sử) |
| `git diff --check` / `--cached --check` | sạch |
| Trình duyệt (playwright, preview 4322) | /favicon.ico 200, /favicon-32x32.png 200, /apple-touch-icon.png 200; head trên / /en/ /co-che/bo-thoat/ /en/mechanisms/escapement/ đủ 4 thẻ; SVG giữ nguyên |

## 4. Bộ thử — 5/5 ca ĐẠT (LỊCH SỬ — candidate trước vòng TXN-12; hiện hành xem mục 11)

| Ca | Thao tác | Kỳ vọng | Kết quả |
|---|---|---|---|
| M1 | PNG 32→64 | fail A3 tệp | ĐẠT |
| M2 | ICO type icon→cursor | fail "không giải mã được" | ĐẠT |
| M3 | count 3→2 | fail "KHÔNG ĐẠT A3 ICO header" | ĐẠT |
| M4 | thẻ apple-touch vào chú thích HTML | fail "thiếu trong head" | ĐẠT |
| M5 | xóa favicon.ico khỏi dist | fail "thiếu hoặc lệch bytes" | ĐẠT |

Mỗi ca: sao lưu + SHA-256 → mutate → chạy checker → tự xác minh exit + rule → hoàn nguyên từ bản gốc → đối chiếu SHA. Hai lượt sạch trước/sau trên sandbox, tính riêng.

## 5. Kiểm trình duyệt (playwright, preview 4322)

- /favicon.ico, /favicon-32x32.png, /apple-touch-icon.png: HTTP 200, Content-Type image/x-icon + image/png, body khớp tài sản (không nhận HTML fallback).
- Head trên /, /en/, /co-che/bo-thoat/, /en/mechanisms/escapement/: đủ 4 thẻ.
- Ghi đúng là Chromium mô phỏng — KHÔNG tuyên bố đã kiểm Add to Home Screen trên iPhone thật.

## 6. Việc chưa thực hiện

- Chưa stage, chưa commit, chưa push — chờ GPT Work nghiệm thu và chốt phạm vi stage (9 tệp + THEO-DOI chỉ hàng A3 split hunk).
- Không thêm manifest/service worker/PWA (theo câu lệnh).

## 8. Vòng sửa theo tái nghiệm thu TXN-20261012-12 (CHƯA ĐẠT → đã sửa)

1. **SVG hash khóa:** N0 kiểm `public/favicon.svg` SHA-256 = `be34cebf…` (GPT Work cung cấp), bắt buộc trong chuỗi check/build.
2. **ICO siết đầy đủ:** docIco kiểm header (res=0, type=1), count 1–32, entry không chồng lấn (offset+size ≤ tệp, cách đều), ngoài giới hạn tệp; từng payload giải mã **bằng sharp tới pixel** (không chỉ signature + IHDR); hỏng → fail đúng rule (không crash).
3. **Apple icon alpha mọi pixel:** duyệt toàn bộ pixel (không lấy mẫu cách 4).
4. **Thẻ head dist:** bóc chú thích HTML trước khi đếm; quét TẤT CẢ .html trong dist (gồm 404.html); báo số trang và các trang thiếu có căn cứ.
5. **Nối generator/checker:** kiểm trong checker (generator đầu build, checker nguồn sau A2 trước check:types, dist cuối build).
6. **Mutation bổ sung:** M6 đổi màu SVG (N0 fail); M7 phá payload PNG trong ICO (sharp fail); M8 pixel trong suốt apple icon; M9 thẻ apple trong dist vào chú thích; M10 404.html thiếu thẻ. Mỗi ca hoàn nguyên SHA; lượt sạch trước/sau riêng. Kết quả chạy thật: 10/10 mutation + 2/2 lượt sạch.
7. **Hints:** 6 (tăng 1 từ `scripts/test-b7-myth-articles.mjs` có `existsSync` import không dùng — KHÔNG thuộc A3, không sửa vì ngoài phạm vi).

### Vòng sửa theo tái nghiệm thu TXN-20261012-13 (CHƯA ĐẠT → đã sửa)

1. **ICO payload giải mã tới pixel:** `sharp(payload).raw().toBuffer()` thay `sharp(payload).metadata()` — IDAT hỏng sẽ fail ở giải mã pixel dù header đúng; kiểm pixel length khớp width×height×channels.
2. **ICO an toàn:** docIco kiểm độ dài tệp ≥ 6 (ICONDIR) trước khi đọc; directory `6 + count×16` trong tệp; `size > 0`; offset sau directory; entry không chồng lấn và trong giới hạn tệp. Tệp cắt ngắn → `null` → "không giải mã được".
3. **Mutation M7/M8 mutate public (source mode):** M7 phá IDAT (sau 'IDAT' chunk) giữ header → sharp pixel fail; M8 alpha=128 tại pixel (5,5) không trên lưới lấy mẫu cũ → "KHÔNG ĐẠT A3 apple icon". Thêm M9 ICO cắt ngắn (10 bytes) → "không giải mã được". Ca "script-vào-chú-thích" chuyển thành M10.
4. **Biên bản:** không ghi "giải mã tới pixel" khi chỉ metadata — mục hiện hành ghi đúng sharp.raw() pixel.
5. **Chạy lại:** bộ thử 11 ca (11/11 ĐẠT) + 2/2 lượt sạch exit 0; npm run check exit 0 (6 hints — 1 từ B7 test file ngoài phạm vi); npm run build exit 0 (361 trang); hai diff-check sạch.

### Vòng sửa theo tái nghiệm thu TXN-20261012-14 (CHƯA ĐẠT → đã sửa)

1. **PNG độc lập siết:** signature hex 89504e47 bắt buộc + sharp.raw().toBuffer() giải mã tới pixel + pixel length khớp; JPEG đổi đuôi → "không phải PNG" fail; IDAT hỏng → "sharp không giải mã được" fail. Sharp lỗi → "sharp không giải mã được" thay vì crash.
2. **Bộ thử 13 ca:** M1-M5 cũ + M6 SVG màu + M7 ICO IDAT (public, source) + M8 alpha (5,5) (public, source) + M9 ICO cắt ngắn + M10 thẻ dist chú thích + M11 PNG IDAT (public, source) + M12 JPEG-đổi-đuôi + M13 404.html thiếu thẻ. Kết quả: 13/13 ĐẠT + hoàn nguyên SHA từng ca + 2/2 lượt sạch.
3. **Biên bản đồng bộ:** kết quả cũ gắn nhãn lịch sử; hiện hành: nguồn 11 phép kiểm + dist 4 phép kiểm (3 asset + 361 trang thẻ); mutation 13/13; hints 6 (1 từ B7 test file ngoài A3). Sửa "astro check" typo.

## 11. Hiện hành (tổng hợp sau vòng TXN-20261012-16)

- **Checker nguồn: 11 phép kiểm** — SVG hash; 2 tệp PNG kích thước + signature + sharp pixel; ICO header + directory + payload sharp pixel; apple alpha mọi pixel; 4 thẻ BaseLayout; generator/checker nối chuỗi.
- **Checker dist: 4 phép kiểm bổ sung** — 3 asset byte-match public; 361 trang (gồm 404.html) đủ 4 thẻ trong head.
- **Bộ thử: 13/13 mutation ĐẠT** (M1-M13) + hoàn nguyên SHA từng ca + 2/2 lượt sạch (trước/sau trên sandbox).
- **Build:** exit 0, 361 trang, 0 lỗi/0 cảnh báo/**6 hints** (5 trước A3 + 1 hint biến `info` không dùng trong checker A3 — không sửa mã để bỏ hint).
- **Vercel:** donghoco1, team Hobby, Production "No events collected" (GPT Work đọc 12/10) — dashboard nhận dữ liệu là kiểm sau phát hành.

## 12. Phụ lục 13/10 — kiểm production đối chiếu hash (A3 đã phát hành trong `a837e66`)

Kiểm bằng curl ngày 13/10/2026 trên production hiện hành `a837e66`; nhật ký thô và bản tải về tại `output/a3-icons-audit/kiem-production-13-10.txt`, `prod-*`.

| Tài sản | HTTP / Content-Type | SHA-256 production vs `public/` |
|---|---|---|
| `/favicon.ico` | 200 · image/vnd.microsoft.icon (3.685 B) | khớp `5b8a6a5b…` |
| `/favicon-32x32.png` | 200 · image/png (1.132 B) | khớp `754288d3…` |
| `/apple-touch-icon.png` | 200 · image/png (6.236 B) | khớp `42f7da92…` |
| `/favicon.svg` | 200 · image/svg+xml (887 B) | khớp `be34cebf…` (đúng hash khóa N0) |

Head trang chủ trên production đủ 4 thẻ, đúng thứ tự attribute rel→type→sizes→href như BaseLayout: `<link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48" href="/favicon.ico">`, `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`, `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`, `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`.

Bốn tài sản trên production byte-match repo — phần GLM của kiểm trang thật đã có; nghiệm thu chốt và khép A3 thuộc GPT Work.
