# BIÊN BẢN D10 — NHẬT KÝ SAI SỐ DỄ TÌM

**Gói:** D10 — điểm vào lộ trình + hướng dẫn lần đầu + giải thích lưu cục bộ/sao lưu cho /nhat-ky-sai-so
**Danh mục:** DHC-HOAN-THIEN-20261011 v1.0.0 · **Câu lệnh:** TXN-20261017-74 + tiếp tục TXN-20261017-75 (duyệt mở rộng C2-N5)
**Nền:** `87a80e7` = origin/main · **Ngày:** 17/10/2026
**Bên thi công:** GLM. Bên nghiệm thu: GPT Work. **Chưa stage/commit/push.**

## 1. Phạm vi (9 tệp — 8 của TXN-74 + 1 được duyệt thêm tại TXN-75)

1. `src/data/learningPaths.ts` — thêm bước 6 "Nhật ký sai số" (`/nhat-ky-sai-so`, lý do chuẩn) cuối lộ trình bat-dau-choi; mô tả "năm bước" → "sáu bước"; không đụng hai lộ trình khác
2. `src/pages/en/learning-path.astro` — bước 4 "Accuracy log — record the offsets you observe and keep your own backup" (`/en/accuracy-log/`) cuối Route 1; giữ nguyên các bước cũ
3. `src/i18n/ui.ts` — 6 khóa `acc_guide_first_*` đủ VI/EN; hoàn thiện `acc_notice_local` (+không tự đồng bộ sang trình duyệt/thiết bị/địa chỉ khác) và `acc_notice_backup` (+CSV chỉ chứa bản ghi đã lưu, không phải bản sao đầy đủ, nhập lại không khôi phục toàn bộ trạng thái)
4. `src/components/AccuracyLog.astro` — khối hướng dẫn lần đầu HTML tĩnh (ol 5 ý, render qua `tr.acc_guide_first_*`) đặt trước phần acc-nojs — đọc được khi tắt JavaScript; **không đụng script vận hành, khóa c1-accuracy-log-v1, cấu trúc dữ liệu, nhập/xuất CSV, tên tệp tải xuống**
5. `scripts/check-c2-video-learning.mjs` — **được duyệt thêm tại TXN-75**: chỉ sửa 2 điều kiện chuỗi C2-N5 + thông báo (nguồn `C2 → D10 → A4 → A2`; dist `C2 → C4 → D10 → A3`); giữ nguyên C1 dist → A4 dist và mọi kiểm khác; không nhánh OR cho thứ tự cũ
6. `scripts/check-d10-accuracy-discovery.mjs` — **mới** (checker D10)
7. `package.json` — nối D10 nguồn đúng một lần trước A4 nguồn (A4 giữ trước A2); nối `D10 --dist dist` ngay trước A3 dist cuối
8. `docs/nghiem-thu/D10-nhat-ky-sai-so-de-tim-2026-10-17.md` — **mới** (biên bản này)
9. `docs/giao-viec/THEO-DOI.md` — **chỉ hàng D10**

Bằng chứng trong `output/d10-accuracy-discovery-audit/` — không phát hành.

## 2. Nội dung hướng dẫn lần đầu (5 ý bắt buộc — song ngữ tương đương VI/EN qua khóa)

1. Nhập tên và chọn "Thêm đồng hồ"
2. Chọn đồng hồ, ngày quan sát, nhập độ lệch giây so với mốc tham chiếu đã chọn; thêm ghi chú nếu muốn rồi lưu bản ghi
3. Ví dụ minh họa: nhập +5 nếu đồng hồ đang hiển thị nhanh hơn mốc tham chiếu 5 giây — **số giả định để hướng dẫn nhập, không phải mức chuẩn hay kết luận về bộ máy**
4. Bấm "Xuất CSV" để tải các bản ghi về máy và giữ tệp ở nơi người đọc tự quản lý
5. Khi cần, chọn tệp CSV đã xuất và dùng chức năng nhập hiện có; nhập chỉ thêm, không thay thế toàn bộ dữ liệu đang có

Không gọi độ lệch quan sát là sai số "mỗi ngày". Giới hạn phát biểu chỉ vào dữ liệu nhật ký — không tuyên bố toàn website không gửi request hay không có Analytics.

## 3. Checker D10 (`check-d10-accuracy-discovery.mjs`)

- Tham số: nguồn mặc định repo; `--root` cho sandbox; `--dist <dir>`; tham số lạ/thiếu → `KHONG DAT D10-ARG`, không crash.
- Nguồn: N1 lộ trình VI (bước + lý do chuẩn + "sáu bước"); N2 Route 1 EN dẫn `/en/accuracy-log/` nhãn "Accuracy log"; N3 khóa `acc_guide_first_*` đúng 2 ngôn ngữ + notice không tự đồng bộ + giới hạn CSV; N4 AccuracyLog hiển thị khối bằng khóa `tr.*` **ngoài HTML comment**.
- Dist: D1 hai điểm vào VI (bài đo sai số + lộ trình) dẫn `/nhat-ky-sai-so`, đích tồn tại; D2 hai điểm vào EN dẫn `/en/accuracy-log/`, EN không dẫn nhầm nhật ký VI; D3 nội dung hướng dẫn/ví dụ/lưu cục bộ/CSV là văn bản hiển thị thật trong trang nhật ký (bỏ comment/script/style/tags).

## 4. Kết quả chạy (repo thật)

- `npm run check` → **exit 0**; astro check **0 lỗi / 0 cảnh báo / 7 hints** (nguồn từng hint: 4 B7, 1 A3, 1 U1, 1 regulating-cluster/C4 — phán TXN-66 giữ; không tự bỏ qua)
- `npm run build` → **exit 0**
- `check-d10-accuracy-discovery.mjs` nguồn → ĐẠT; `--dist dist` → ĐẠT
- `check-learning-paths` và `check-c1-accuracy-log` (nguồn/dist) ĐẠT trong chuỗi
- `git diff --check` sạch; hai diff-check đạt

## 5. Bộ thử sandbox (`bo-thu-d10.mjs`) — **19/19 ĐẠT** exit 0 (kết quả hiện hành; 9/9, 10/10, 14/14, 16/16 là lịch sử các vòng trước)

Sandbox dựng từ working tree (git ls-files + tệp mới gói D10); khuôn: mutate → checker → dòng chẩn đoán chính thức → phục hồi từ SNAPSHOT → kiểm byte sau từng ca; crash/timeout = ca thất bại; lượt sạch trước/sau riêng; hash repo ghi TRƯỚC ca đầu và đối chiếu trong process.on(exit). Số ca theo thực chạy: **2 lượt sạch + 17 mutation = 19**:

| Ca | Mutation | Rule bắt |
|---|---|---|
| C2-M1 | gỡ D10 nguồn khỏi chuỗi | C2-N5 |
| C2-M2 | đặt D10 dist SAU A3 | C2-N5 |
| C2-M3 | gỡ D10 dist | C2-N5 |
| D10-M1 | mất liên kết lộ trình VI | D10-N1 |
| D10-M2 | EN dẫn nhầm nhật ký VI | D10-N2 |
| D10-M3 | thiếu hướng dẫn một ngôn ngữ | D10-N3 |
| D10-M4 | nội dung chỉ nằm trong HTML comment | D10-N4 |
| D10-M5 | mất cảnh báo mất dữ liệu/xuất CSV | D10-N3 |
| D10-M6 | đổi khóa lưu trữ trong script vận hành | D10-N5 |
| D10-M7 | sửa script vận hành (chèn dòng) | D10-N5 |
| FIX-M1 | liên kết lộ trình VI trong HTML comment (dist) | D10-D1 |
| FIX-M2 | khối hướng dẫn trong <template> (dist) | D10-D3 |
| FIX-M3 | xóa bước 2 của khối hướng dẫn (dist) | D10-D3 |
| FIX-M4 | chuyển khối hướng dẫn ra ngoài section[data-accuracy-log] (dist) | D10-D3 |
| FIX-M5 | mục xuất CSV EN thay bằng "Choose anything." (dist) | D10-D3 |
| FIX-M6 | xóa giới hạn ví dụ VI "số giả định…không phải mức chuẩn" (dist) | D10-D3 |
| FIX-M7 | xóa giới hạn ví dụ EN "assumed number…verdict on the movement" (dist) | D10-D3 |

Bổ sung phép thử C2 theo TXN-75: chuỗi mới đầy đủ C2 đạt (lượt sạch); gỡ D10 nguồn / gỡ D10 dist / đặt sau A3 đều thất bại đúng C2-N5.

## 6. Kiểm trình duyệt (v3 — kiem-trinh-duyet.mjs → kiem-trinh-duyet.json) — **ĐẠT, 0 lỗi cả 4 tổ hợp Chromium/WebKit × VI/EN**

- **Thực sự click** 4 điểm vào (bài đo sai số + lộ trình, VI/EN) — so pathname **tuyệt đối sau chuẩn hóa dấu "/" cuối** (không startsWith)
- Bàn phím: **focus + Enter** trên liên kết mới (bước lộ trình cuối) — waitForURL xác nhận điều hướng đúng
- 390px sáng/tối **cả VI/EN**: xác minh **theme thật** (class dark + computed background) + không tràn ngang + hướng dẫn hiển thị
- Tắt JavaScript: hướng dẫn + ghi chú vẫn hiện (**cả VI/EN**)
- **Mỗi engine × ngôn ngữ** context thử riêng (không đụng dữ liệu thật): tạo đồng hồ, thêm bản ghi ngày hiện tại + độ lệch +5 + ghi chú, **reload → chọn đúng đồng hồ → xác nhận đủ ngày/độ lệch/ghi chú**; xuất CSV đúng tên (nhat-ky-sai-so.csv / accuracy-log.csv), **đọc theo cột** đối chiếu watch_name/date/offset_seconds=5/note; nhập context sạch → đối chiếu lại các trường trong kho
- Bộ thu lỗi chung mọi trang/context: pageerror + console + HTTP≥400, **lưu riêng status/URL/context**; phân loại là hàm thuần có **tự kiểm** (404 endpoint nền tảng → loại; 500 cùng endpoint → giữ; 404 tài sản khác → giữ; console-404 chỉ miễn trừ khi cùng context có 404 nền tảng ứng với nó — không dùng tổng số 404 để miễn trừ lỗi từ context khác); tổ hợp thật: 32 lỗi 404 /_vercel/insights|speed-insights/script.js mỗi tổ hợp — nền tảng, đã loại đúng
- Ghi chú kỹ thuật: chromium qua executablePath chromium-1228 đã cài (playwright 1.64.1 đòi 1248); webkit-2368 chuẩn. Không coi WebKit giả lập là iPhone thật.

## 7. Giới hạn chưa kiểm + nguồn hints

- Không chạy Safari/iPhone thật; không test dữ liệu người dùng thật; không kiểm hành vi trên mọi trình duyệt/phiên bản
- **Hints còn lại (7, nguồn ghi rõ — không sửa hint của gói khác):** 3× `scripts/test-b7-myth-articles.mjs` + 1× `scripts/check-b7-myth-articles.mjs` (gói B7 cũ), 1× `scripts/check-a3-icons.mjs` (A3), 1× `scripts/check-u1-myth-series.mjs` (U1), 1× `scripts/check-regulating-cluster.mjs` (C4 — phán TXN-66: biến legacyHtml không phải lỗi chức năng, giữ). Hint của chính D10 (`require` không đọc — checker dùng biến `napGoi`) **đã tự sửa** trong vòng này.
- UI vẽ lại danh sách bản ghi của đồng hồ vừa nhập sau khi người dùng tự chọn đồng hồ (hành vi hiện có của tool, không đổi trong gói này)

## 7b. Vòng sửa tối hạn sau TXN-20261017-76 (GPT Work: D10 CHƯA ĐẠT — 4 lỗi có bằng chứng)

1. **Checker nhận nội dung không hiển thị** (probe: nội dung VI vào `<template>` vẫn đạt; liên kết vào HTML comment vẫn đạt; đổi khóa lưu trữ vẫn đạt) → **checker v2**: dist dùng **parse5** — chỉ nhận `<a href>` thật ngoài comment/template/hidden; nội dung hướng dẫn là văn bản hiển thị (bỏ comment/script/style/template/hidden) đủ 5 ý + notice cho cả VI/EN; nguồn xác định **bước CUỒI** bat-dau-choi và Route 1 EN sau khi bỏ comment; **N5 mới**: hash khối script vận hành AccuracyLog đối chiếu nền `87a80e7` = `9f1db1e0306c…` (chuẩn hóa CRLF→LF, không dựa Git history); bỏ import `readdirSync` không dùng; tự sửa hint `require` của mình (đổi biến `napGoi`).
2. **Mutation bổ sung** (đều bắt đúng rule, không crash): D10-M6 đổi khóa lưu trữ → D10-N5; D10-M7 sửa script vận hành → D10-N5; FIX-M1 liên kết dist vào comment → D10-D1; FIX-M2 hướng dẫn vào `<template>` → D10-D3. (Lỗi đã va: `c1-accuracy-log-v1` và cụm hướng dẫn xuất hiện nhiều chỗ — mutation phải `replaceAll`; parse5 đặt `**bold**` trong node `strong` — lấy chữ đệ quy.)
3. **Bộ thử sửa**: hash repo ghi **trước ca đầu**, đối chiếu trong `process.on('exit')`; hoàn nguyên từ snapshot + kiểm byte sau từng ca; nhãn số ca đồng bộ thực chạy (2 lượt sạch + 12 mutation + lượt sạch cuối = 14).
4. **Trình duyệt hoàn thiện** (`kiem-trinh-duyet.mjs` v2 → `kiem-trinh-duyet.json` — **ĐẠT, 0 lỗi cả 4 tổ hợp engine×ngôn ngữ**): thực sự **click** 4 điểm vào + xác nhận pathname đích; bàn phím **focus + Enter** trên liên kết mới (waitForURL); VI/EN 390px sáng/tối xác minh **theme thật** (nen.dark class + computed background) + không tràn; tắt JS đọc được hướng dẫn/ghi chú **cả VI/EN**; VI/EN trên **mỗi engine**: context riêng tạo bản ghi → reload còn → xuất CSV đúng tên/dữ liệu → nhập context sạch hiển thị (chọn đồng hồ đã nhập); thu pageerror/console error mọi trang + **phân loại endpoint nền tảng** (404 `/_vercel/*`/favicon xếp nền tảng, không tính lỗi gói).

**Phân biệt kết quả lịch sử với kết quả hiện hành:** 9/9, 10/10, 14/14, **16/16**, "6 hints"/"8 hints", kiểm tabIndex, kiểm href-chuỗi, chỉ-Chromium-VI là **kết quả lịch sử các vòng trước** (đã thay thế). Kết quả hiện hành: **checker v3 (D3 scope section + toàn văn 5 mục) + bộ thử 19/19 = 2 lượt sạch + 17 mutation (mục 5) + npm run check exit 0 (0/0/7 hints — mục 4) + build exit 0 + trình duyệt v3 ĐẠT 4 tổ hợp (mục 6)**.

## 8. Rủi ro và quay lại

- Quay lại: revert commit phát hành D10 (không xóa tệp nội dung; không đổi dữ liệu người dùng).
- Nếu checker cũ khác chặn ở các nền sau: dừng báo như TXN-75, không tự mở phạm vi.

## 7c. Vòng sửa tối hạn sau TXN-20261017-78 (GPT Work: CHƯA ĐẠT — 3 điểm có bằng chứng)

1. **D3 toàn văn**: đối chiếu toàn văn 5 mục VI/EN (chuẩn hóa khoảng trắng/entity, không dùng tiền tố ngắn như "Choose"); mutation mới FIX-M5 (EN xuất CSV → "Choose anything."), FIX-M6 (xóa giới hạn ví dụ VI), FIX-M7 (xóa giới hạn ví dụ EN) — tất cả FAIL đúng D10-D3. (Lỗi đã va: mutation chạm nhầm bản JSON trong attribute data-tr vô hình — matcher phải trúng <li> render thật.)
2. **Phân loại lỗi thuần hàm**: lưu riêng status/URL/context; chỉ loại HTTP 404 tại endpoint nền tảng đã xác minh — HTTP 500 cùng endpoint và 404 tài sản khác GIỮ là lỗi; console-404 chỉ miễn trừ trong cùng context; tự kiểm trên dữ liệu mẫu ngay trong bộ kiểm trình duyệt.
3. **Hồ sơ đồng bộ**: tiêu đề mục 7 lặp đã gộp; công thức đếm ca đúng (2 lượt sạch + 17 mutation = 19); mục 7b nhãn lịch sử tường minh; hints ghi nguồn (7 = 4 B7 + 1 A3 + 1 U1 + 1 regulating/C4).
