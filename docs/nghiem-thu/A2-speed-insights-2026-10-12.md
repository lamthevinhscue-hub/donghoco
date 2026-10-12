# BIÊN BẢN THI CÔNG A2 — Speed Insights

**Gói:** A2 — bật Speed Insights (miễn phí)
**Danh mục:** DHC-HOAN-THIEN-20261011 v1.0.0
**Giao dịch:** TXN-20261012-01 (câu lệnh thi công của GPT Work)
**Ngày thi công:** 12/10/2026 · **Nền:** HEAD `ebd12af` = `origin/main`
**Bên thi công:** GLM (phiên điều phối ZCode). Bên nghiệm thu: GPT Work.

## 1. Nền

- Git sạch ngoại trừ `docs/giao-viec/THEO-DOI.md` (M — hàng A1 do GPT Work cập nhật "Đang thực hiện — chờ hạn ngạch Google", tiếp nhận nguyên trạng; trong lượt A2 không đụng hàng A1).
- Nguồn xác minh ngày 12/10/2026: [giá và giới hạn Vercel Speed Insights](https://vercel.com/docs/speed-insights/limits-and-pricing) (tầng miễn phí đủ dùng; Plus là tầng trả phí — ngoài phạm vi), [quickstart](https://vercel.com/docs/speed-insights/quickstart), [component Astro chính thức](https://github.com/vercel/speed-insights/blob/main/packages/web/src/astro/index.astro). Phiên bản npm kiểm ngày 12/10/2026: 2.0.0.

## 2. Thay đổi theo từng tệp (đúng 6 tệp của câu lệnh)

1. **`package.json`** — thêm duy nhất `"@vercel/speed-insights": "2.0.0"` vào dependencies (cài `--save-exact`); không cập nhật dependency khác, không audit fix/force. **Dependency gián tiếp mới: không có** (npm ls chỉ đúng gói; giải thích: gói không kéo thêm gói nào).
2. **`package-lock.json`** — npm đồng bộ; khóa `node_modules/@vercel/speed-insights` phiên bản 2.0.0.
3. **`src/layouts/BaseLayout.astro`** — thêm `import SpeedInsights from '@vercel/speed-insights/astro';` ngay sau import Analytics; thêm đúng một `<SpeedInsights />` ngay sau `<Analytics />`, trong body. Không client:load, không script chép tay, không endpoint tùy biến, cấu hình mặc định.
4. **`scripts/check-a2-speed-insights.mjs`** — mới, hai chế độ (siết theo TXN-20261012-02): nguồn (N1 dependency 2.0.0; **N2 lockfile kiểm bằng JSON — gốc + node_modules khớp package.json**; N3 import có hiệu lực **sau khi bóc chú thích JS + HTML**; N4 đúng một SpeedInsights, ngay sau Analytics, **thực sự trong <body>**; N5 **quét toàn bộ src/** tìm chèn thứ hai) + dist (**bóc chú thích HTML trước khi đếm phần tử**; mỗi trang: đúng 1 phần tử thật + data-pathname đúng + mã khởi tạo phải nằm trong `<script>` chạy được hoặc bundle được tham chiếu — không nhận chuỗi trong chú thích). **Không có phép kiểm always-true (A2-D0 cũ đã bỏ khỏi số đạt).** Đường dẫn /en/escapement/ trong câu lệnh không tồn tại — dùng thật /en/mechanisms/escapement/ (GPT Work chấp nhận).
5. **`docs/giao-viec/THEO-DOI.md`** — chỉ hàng A2 theo vòng đời; hàng A1 giữ nguyên trạng thái GPT Work cập nhật (khi phát hành: stage riêng hàng A2, hàng A1 unstaged).
6. **`docs/nghiem-thu/A2-speed-insights-2026-10-12.md`** — biên bản này.

Bộ thử nằm `output/a2-speed-insights-audit/test-a2-speed-insights.mjs` — ngoài phạm vi 6 tệp phát hành (trình bày riêng; astro check không quét output).

Không sửa astro.config.mjs, vercel.json, tsconfig, template khác, nội dung bài, checker cũ.

## 3. Đọc mã component đã cài (phiên bản 2.0.0)

`node_modules/@vercel/speed-insights/dist/astro/component.ts` re-export `./index.astro`; `index.astro` render `<vercel-speed-insights data-props data-params data-pathname={Astro.url.pathname}>` + script module `customElements.define('vercel-speed-insights', …)` gọi `injectSpeedInsights(...)`. **Dấu hiệu đầu ra thật:** phần tử custom element + script inline trong từng trang (Astro không đưa vào `_astro/*.js` vì script nhỏ) — đã đối chiếu với dist thật, không suy từ tài liệu.

## 4. Kết quả kiểm (LỊCH SỬ — candidate trước vòng TXN-02; hiện hành xem mục 11)

| Kiểm | Kết quả |
|---|---|
| `npm run check` | exit 0 |
| `npm run build` đầy đủ | exit 0 — Pagefind 361 trang; **hints thực tế: 5** (như trước A2, không phát sinh hint mới; GPT Work cũng đo 5 hints độc lập) |
| Checker A2 nguồn | ĐẠT 5/5 |
| Checker A2 dist | ĐẠT 7/7 (lịch sử — D0 + 6 trang; **hiện hành: 6 phép kiểm trang, không D0** — xem mục 11) |
| `git diff --check` / `--cached --check` | sạch |
| Trình duyệt (playwright-cli Chromium, `astro preview` 127.0.0.1:4322) | VI + EN trang chủ: đúng 1 `vercel-speed-insights` + 1 `vercel-analytics`; menu header còn; liên kết chuyển ngôn ngữ còn; **0 pageerror JavaScript mới** |

Lưu ý môi trường: preview không phục vụ `/_vercel/speed-insights/script.js` (**localhost preview không phục vụ endpoint Vercel**; deployment preview trên Vercel không phải localhost) — lỗi mạng đó ghi nhận riêng, không coi là bằng chứng nhận dữ liệu cũng không che lỗi khác (console không có lỗi nào ngoài 404 script nền tảng này).

## 5. Bộ thử (LỊCH SỬ — vị trí và số ca cũ; **hiện hành: `output/a2-speed-insights-audit/test-a2-speed-insights.mjs`, 11 ca**, xem mục 11)

M1 bỏ dependency → KHÔNG ĐẠT A2-N1; M2 bỏ component → A2-N4; M3 nhân đôi component → A2-N4; M4 bỏ phần tử khởi tạo khỏi dist trang chủ (regex) → "số phần tử=0"; M5 đổi script khởi tạo → "trang không có script khởi tạo". Mỗi ca: sao lưu + SHA-256 → mutate → tự xác minh exit + rule → hoàn nguyên từ bản gốc → đối chiếu SHA. Hai lượt sạch cuối (nguồn + dist) exit 0, tính riêng. Sai kỳ vọng làm bộ thử exit 1 (đã gặp thật: M4 viết bằng chuỗi thường không xóa được phần tử — bộ thử báo THẤT BẠI đúng cơ chế, sửa thành regex rồi chạy lại ĐẠT).

## 6. Vercel (mức kiểm tra) và việc còn chờ

- **Kết quả GPT Work đã đọc dashboard (12/10):** đúng dự án `donghoco1`, team Hobby, bộ lọc Production hiện "No events collected" — ghi theo kết quả đã xác minh, không suy thêm. Không bấm Plus/trial/upgrade.
- Sau phát hành (khi được phép): kiểm trang production tải script, request đo thật, và dashboard nhận dữ liệu — tiêu chí khép A2 theo câu lệnh mục 6; nếu dashboard chưa nhận được ngay, ghi "Đã phát hành — chờ xác nhận dữ liệu".

## 7. Việc chưa thực hiện

- Chưa stage, chưa commit, chưa push — chờ GPT Work nghiệm thu và chốt phạm vi stage (6 tệp + xử lý hàng A1 trong THEO-DOI riêng).
- Phần sửa dở A1 trong THEO-DOI (hàng A1 "Đang thực hiện — chờ hạn ngạch Google", 12/15 nhận) **không thuộc phạm vi A2** — trình GPT chốt riêng.

## 8. Vòng sửa theo tái nghiệm thu TXN-20261012-02 (CHƯA ĐẠT → đã sửa)

1. **Checker nguồn siết:** bóc chú thích JS (ngoài chuỗi) + HTML trước khi đếm import/component; N4 thêm điều kiện thực sự trong `<body>` và "ngay sau Analytics" (giữa hai thẻ không có phần tử khác); N2 lockfile kiểm bằng JSON (`packages[""].dependencies` + `packages["node_modules/…"].version` khớp); N5 quét toàn bộ `src/` (astro/ts/js/mjs/html) tìm chèn thứ hai có hiệu lực.
2. **Checker dist siết:** bóc chú thích HTML trước khi đếm phần tử; mã khởi tạo phải nằm trong khối `<script>` chạy được hoặc bundle được tham chiếu (regex nhận backtick — bản minify dùng backtick); bỏ A2-D0 always-true.
3. **Bộ thử chuyển ra `output/a2-speed-insights-audit/test-a2-speed-insights.mjs`** với sandbox riêng (bản sao package.json/lockfile/BaseLayout + 6 trang dist; chạy checker với cwd = sandbox) — không mutate repo thật; hoàn nguyên trong finally + SHA từng ca; **8 ca**: 5 cũ + component-chỉ-trong-chú-thích + component-ngoài-body + script-bị-xóa-nhưng-chuỗi-còn-trong-chú-thích (bọc chú thích toàn khối — trang có thể có nhiều bản script nên xóa all-match). Kết quả: **8/8 + 2/2 lượt sạch cuối exit 0**.
4. **Biên bản đồng bộ:** hints đo lại sau khi chuyển tệp thử — **5 hints** (6 hints trước đó có 1 từ tệp bộ thử ngoài phạm vi); câu "endpoint chỉ tồn tại trên production" sửa thành "localhost preview không phục vụ endpoint Vercel"; ghi kết quả GPT Work đọc dashboard: dự án `donghoco1`, team Hobby, bộ lọc Production hiện "No events collected" (chưa ghi "chưa bật" như trạng thái đã xác minh).
5. **Chạy lại candidate mới:** npm run check exit 0 (5 hints); npm run build exit 0 (361 trang); checker nguồn+dist ĐẠT; trình duyệt VI/EN 6/6; hai diff-check sạch. Khi phát hành: THEO-DOI stage riêng hàng A2 (hàng A1 giữ unstaged — dùng git add -p).

## 9. Vòng sửa theo tái nghiệm thu TXN-20261012-03 (đồng bộ một phần — phần biên bản còn lại hoàn tất ở mục 11 bổ sung)

1. **Checker dist phân biệt script dữ liệu:** chỉ `<script>` không type hoặc `type="module"` được tính (application/json, ld+json… loại khác bỏ); nội dung script phải còn chứa define **sau khi bóc chú thích JS** (boChuJS theo dõi cả template literal backtick — URL `https://…` trong backtick không bị cắt nhầm); bundle tham chiếu cũng áp cùng chuẩn. Hai phép thử trong `gpt-probe-v2.mjs` của GPT Work giờ fail đúng rule (CLEAN exit=0, INIT-IN-DATA exit=1, INIT-IN-JS-COMMENT exit=1).
2. **Bộ thử 10 ca** (đếm từ kết quả chạy thật): 5 cũ + M7 đổi-tên-khởi-tao (khôi phục từ bộ thử cũ) + M8 script-dữ-liệu + M9 mã-khởi-tạo-trong-chú-thích-JS (bọc /* */ ĐÚNG CẶP) + M10 toàn-khối-script-vào-chú-thích-HTML (regex escape đầy đủ, chuỗi vẫn còn trong tệp). Số ca in từ biến đếm chạy thật (SO_DAT/SO_CHAY), không in cứng. Lượt sạch trước/sau chạy trên chính sandbox, nguồn/dist riêng; hoàn nguyên finally + SHA từng ca.
3. **Biên bản đồng bộ:** danh sách 6 tệp phát hành gồm THEO-DOI; bộ thử output trình bày riêng; không còn "D0 + 6 trang"; sửa "astro check"; đường dẫn bộ thử mới; Vercel ghi đúng trạng thái đã xác minh (donghoco1, Hobby, Production "No events collected").
4. **Chạy lại candidate:** npm run check exit 0 (**5 hints** — đo thật); npm run build exit 0 (361 trang); checker nguồn+dist ĐẠT; bộ thử 10/10 + 2/2 lượt sạch (trước/sau trên sandbox) exit 0; hai diff-check sạch; trình duyệt VI/EN 6/6.

### Bổ sung vòng TXN-03 (theo tái nghiệm thu gửi lại 12/10): đồng bộ 4 dòng lịch sử còn mang nghĩa hiện hành

- Mục 4 dòng "Checker A2 dist": gắn nhãn lịch sử, ghi rõ hiện hành là 6 phép kiểm trang không D0.
- Mục 4 lưu ý môi trường: đổi thành "localhost preview không phục vụ endpoint Vercel" (deployment preview trên Vercel không phải localhost).
- Mục 5 tiêu đề: đánh dấu lịch sử; tại thời điểm vòng này hiện hành là bộ thử 10 ca (vòng sau nâng lên 11 ca — xem mục 11).
- Mục 6: thay "chưa bật Speed Insights" (chưa xác minh) bằng kết quả dashboard GPT Work đã đọc: donghoco1, team Hobby, Production "No events collected".

## 11. Hiện hành sau vòng TXN-20261012-05 (tổng hợp trạng thái mới nhất)

- Checker nguồn: 5 phép kiểm (N1–N5) — ĐẠT; checker dist: 6 phép kiểm trang (không D0) — ĐẠT; script bundle tham chiếu áp bóc chú thích JS như script inline.
- Bộ thử hiện hành: `output/a2-speed-insights-audit/test-a2-speed-insights.mjs`, sandbox riêng, **11 ca mutation (M1–M10 + M11 một-ca-thống-nhất: bundle tồn tại chỉ chứa chú thích khởi tạo, gỡ script inline, nối bundle vào HTML — cả ba điều kiện xác minh trước khi chạy; kèm lượt đối chứng bundle CÓ init hợp lệ phải exit 0)** + lượt sạch trước/sau trên sandbox — 11/11 ĐẠT + hoàn nguyên SHA từng ca; bộ thử tự-thất-bại khi thay checker bằng bản bỏ bóc-chú-thích-bundle (đã thử theo yêu cầu GPT Work).
- Hints: 5 (đo thật sau khi bộ thử chuyển ra output/).
- Vercel: donghoco1, team Hobby, Production "No events collected" (theo GPT Work đọc 12/10); dashboard nhận dữ liệu là kiểm sau phát hành.
