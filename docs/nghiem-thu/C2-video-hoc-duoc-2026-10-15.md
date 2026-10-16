# BIÊN BẢN C2 — VIDEO "HỌC ĐƯỢC" (phụ đề, bản lời thuyết minh, hình tóm tắt)

**Gói:** C2 — phụ đề và bản lời thuyết minh cho video nguyên lý (đợt 2, được anh Vinh duyệt mở sớm 15/10)
**Danh mục:** DHC-HOAN-THIEN-20261011 v1.0.0
**Câu lệnh:** TXN-20261015-43 (nguyên văn: `output/c2-video-learning-audit/cau-lenh-C2-nguyen-van.md`); vòng sửa TXN-20261015-44; vòng sửa TXN-20261015-46 ("Câu lệnh sửa tối hạn C2", 5 mục); vòng sửa TXN-20261016-47 ("SỬA TỐI HẸP C2", 4 mục). Hồ sơ này trình tái nghiệm thu TXN-20261016-48.
**Nền:** `1aaf8e9` = origin/main
**Bên thi công:** GLM. Bên nghiệm thu: GPT Work. **Chưa stage, chưa commit, chưa push.**

Lịch sử vòng (theo phán quyết thật, ghi ở sổ giao dịch):
- TXN-20261015-44 (CHƯA ĐẠT): theo bản ghi giao dịch — (1) checker nguồn nhận ma trong chú thích HTML; (2) probe nội dung giả trong script mà checker vẫn đạt; (3) bộ thử SHA lệch chỉ nối thông báo không làm ca thất bại; (4) checker gọi ffprobe đường dẫn Windows cá nhân khiến chuỗi build không dùng được trên môi trường khác; kiểm Chromium/WebKit + phụ đề nạp thật + JS tắt + tải chủ động chưa hoàn thành. Vòng sửa TXN-44 đã xử lý 4 nhóm này.
- TXN-20261015-46 (CHƯA ĐẠT): GPT Work xác nhận phần vòng trước đã đúng ("Nhãn track, vị trí nối C2, việc khôi phục C1 và bỏ ffprobe cá nhân đã đúng") nhưng probe độc lập (`gpt-probe-c2-v2.mjs`, `gpt-probe-sha-proof.mjs`) còn phát hiện: cue VTT sai chữ checker vẫn đạt; xóa fixture trong cây `--root` checker vẫn đạt (đọc fixture repo thật); dist không có tài sản VTT/hình checker vẫn đạt; bộ tự chứng minh exit 1 cả khi hoàn nguyên đúng (chưa chứng minh SHA là nguyên nhân); log trình duyệt chưa đối chiếu cue/text dự kiến, ảnh hai engine ghi đè tên nhau. Vòng này sửa đủ 5 mục câu lệnh sửa tối hạn.
- TXN-20261016-47 (CHƯA ĐẠT): GPT Work xác nhận "checker nguồn/dist đạt, bộ thử 21/21 đạt; ba probe vòng trước nay bị chặn đúng", nhưng còn 2 lỗi chứng minh được trên bản sao dist: (1) bản chữ giả vẫn lọt — thay lời đọc trong details bằng `<script type="application/json">` thì checker vẫn đạt vì getText() đếm cả nội dung script; (2) mutation M18 đạt giả — hình sai src làm checker crash (tham chiếu biến chưa định nghĩa) và bộ thử tính ĐẠT vì stack trace chứa chuỗi C2-D1; ngoài ra hai chỗ chờ seek trong script trình duyệt chưa phân biệt "đã nhận seeked" và "timeout". Vòng này sửa đủ 4 mục; **ghi rõ: M18 vòng trước là ĐẠT GIẢ do crash — không phải bằng chứng bắt đúng rule.**

## 1. Bước đối chiếu bắt buộc — bảng 36 dòng

`output/c2-video-learning-audit/bang-doi-chieu.mjs` → `bang-36-dong.json`: 36/36 MP4 tồn tại, thời lượng 21,08–96 s, ngôn ngữ theo hậu tố tệp, route bài tương ứng. Ánh xạ phiên bản VTT — lời đọc — nguồn dựng (không chọn theo tên gần giống):

| Nhóm | Video (18 tiền tố) | Lời đọc (loi-doc.json) | VTT nguồn nhãn hình |
|---|---|---|---|
| Quay sơ đồ v3 | bo-thoat | bo-thoat-nguyen-ly-v3 | output/video-bo-thoat/bo-thoat-v3-phu-de-* (bỏ bản v1 cũ) |
| Quay sơ đồ v2 | day-toc-banh-lac | day-toc-banh-lac-v2 | output/video-day-toc/day-toc-v2-phu-de-* (bỏ bản v1 cũ) |
| Điện ảnh v1 | chong-nuoc, chong-soc, chong-tu, chuyen-dong-co, da-quang, gmt, hien-thi-ngay, len-day-tu-dong, tourbillon, tru-cot (10 tiền tố) | *-dien-anh-v1 | output/video-*/dien-anh-v1/*-dien-anh-phu-de-* |
| Quay sơ đồ v1 khác | bo-thoat-dong-truc, chronograph, diem-chuong, lich-van-nien (slug perpetual-calendar), pha-trang | *-v1 | output/video-*/ tương ứng |
| Kính đồng hồ | kinh-dong-ho | narration riêng 4 đoạn VI/EN | không dùng VTT tập trung |

GMT: các tệp `gmt-01/02/03/tong-hop-v1` là VTT của video kh_piece khác — không dùng cho `gmt-nguyen-ly`.

**Về VTT có sẵn trong output/**: mỗi phiên bản khác nhau — một số tệp chỉ 3–4 nhãn hình rút gọn, riêng Bộ thoát v3 có 16 cue tới 52 giây; chúng là **phụ đề nhãn hình/đồng hành hình**, không phải bản chép lời thuyết minh (phân biệt theo nội dung thực của tệp, không suy từ số cue). Vì `loi-doc.json` lưu nguyên văn lời đọc đã duyệt kèm mốc giây nguồn, phụ đề C2 được **dựng trung thành từ lời đọc đã duyệt** (không sáng tác).

## 2. Tài sản phát hành (đề nghị)

- `public/videos/captions/` — 36 VTT dựng từ `loi-doc.json` (`dung-vtt.mjs`, truy vết `truy-vet-vtt.json`): UTF-8 không BOM, WEBVTT, từng cue khớp mốc + nguyên văn đoạn lời đọc; 2 VTT kính từ `narration/*.txt` + kênh thời gian.
- `public/images/video-summaries/` — 36 hình tĩnh trích khung từ MP4 hiện hành (`trich-khung.mjs`, mốc chọn tại cue nhãn sơ đồ cùng phiên bản; kính 8,5 s ba cột phép thử; truy vết `truy-vet-hinh.json`).
- `src/data/c2-video-learning.json` — ánh xạ 36 MP4: ngôn ngữ, phụ đề, lời đọc (mốc + nguyên văn), hình tóm tắt + alt, truy vết nguồn.
- `src/components/PrincipleVideo.astro` — khi src có dữ liệu C2: thêm `<track kind="subtitles" srclang label>` (nhãn VI "Tiếng Việt", EN "English"); khối `<details>` bản lời đọc (đọc được không cần JavaScript); `<figure>` hình tóm tắt `loading="lazy"` + width/height + alt. Không đụng controls/playsinline/preload="none"/poster/fallback.
- `scripts/check-c2-video-learning.mjs` — mới (mục 3).
- `scripts/fixtures/c2-baseline-sha.json` — fixture mới: SHA-256 36 MP4 + 36 poster và thời lượng thật 36 video; checker đọc từ cây `--root` (không phải repo chứa script).
- `package.json` — đúng 2 chỗ chèn: checker nguồn C2 đứng ngay trước A4 nguồn (A4 giữ ngay trước A2, trước check:types); dist C2 đứng giữa A4 dist và A3 dist cuối (thứ tự build C1 → A4 → C2 → A3). Entry cuối `check` là `check-c1-videos.mjs` **khôi phục nguyên trạng HEAD**.
- `docs/giao-viec/THEO-DOI.md` — chỉ hàng C2; `docs/nghiem-thu/C2-video-hoc-duoc-2026-10-15.md` — biên bản này.

Không sửa: MP4/JPG hiện hành (SHA giữ nguyên so baseline), schema, bài viết, checker cũ (check-c1-videos.mjs / encode-c1-videos.mjs byte-khớp HEAD), dependency, lockfile.

## 3. Checker `check-c2-video-learning.mjs`

- N0 fixture: đọc **từ cây `--root`** (`<root>/scripts/fixtures/c2-baseline-sha.json`); thiếu, hỏng JSON hoặc thiếu nhóm mp4/jpg/thoi_luong → FAIL `C2-N0`.
- N1 dữ liệu: đúng tập 36 MP4 (không thiếu/trùng/giao ngôn ngữ); mỗi mục đủ phụ đề + nguồn phụ đề, bản chữ không rỗng, hình tóm tắt + alt, truy vết.
- N2 VTT: 36 tệp, UTF-8 không BOM, WEBVTT; **phân tích từng cue — số cue bằng số đoạn, mốc đầu/cuối từng cue khớp `bat_dau`/`ket_thuc`, nguyên văn cue khớp `chu` trong dữ liệu C2**; mốc hợp lệ tăng dần, cue cuối ≤ thời lượng đọc từ fixture; MP4 + poster giữ SHA-256 so baseline, lệch là FAIL. Cue sai chữ, mất cue, khối hỏng đều FAIL.
- N3 hình tóm tắt 36 tệp tồn tại.
- N4 PrincipleVideo nạp dữ liệu C2, có track/details/hình lazy, không autoplay, giữ preload="none"; hai trang chủ giữ prop A4 `meta_description` — chỉ tính trong markup **đã bỏ chú thích HTML**.
- N5 vị trí nối: chuỗi nguồn `check-c2-video-learning.mjs && check-a4 && check-a2` phải tồn tại; dist C2 phải đứng ngay trước `check-a3-icons.mjs dist`; C1 dist phải chạy trước C2/A4 dist.
- D1 (parse5 DOM, --dist): với từng route VI/EN, định vị khối video theo đúng `<source src="/videos/<tên>.mp4">` của bài; track đúng 1, kind/srclang/label ("Tiếng Việt"/"English")/src khớp; bản chữ là `details` **trong cùng figure** với video, chứa **đủ toàn bộ đoạn** đúng thứ tự; **hình tóm tắt trong khối phải đúng tuyệt đối `src` của ánh xạ** (không chỉ chứa chuỗi "video-summaries") + alt/lazy/width/height; fallback href đúng MP4.
- D2: chéo 18 cặp — trang EN không chứa câu đầu lời đọc VI và ngược lại.
- D3: không autoplay, preload="none", controls/playsinline còn.
- **D4: dist phải có tài sản thật — 36 VTT + 36 hình trong `dist/videos/captions` + `dist/images/video-summaries` byte-match (SHA-256) với public.**
- Nội dung giả đặt trong `<script>`/`<style>`/`<template>`, chú thích HTML hoặc ngoài khối video không được tính — getText() chỉ đếm nút chữ đọc được, bỏ script/style/template/comment.

## 4. Bộ thử sandbox 24/24 (số thực chạy — log `log-cli/bo-thu-24ca.log`)

`output/c2-video-learning-audit/test-c2.mjs` — **2 lượt sạch riêng (nguon + dist) + 20 mutation + 1 ca tự kiểm crash + 1 ca tự chứng minh SHA**, tất cả đi qua CÙNG hàm `ca()` (sandbox dựng lại riêng từ tệp thật — MP4/poster **copy full, không hardlink**; mutate → chạy checker → hoàn nguyên → đối chiếu SHA từng subtree; hash repo gốc ghi **trước ca đầu**, đối chiếu **sau tất cả**).

**Khung chấp nhận mã rule (mới theo TXN-20261016-47):** mã rule chỉ được nhận trong **dòng chẩn đoán chính thức** của checker (`C2-…:` / `KHONG DAT C2-…`); đầu ra chứa ReferenceError/TypeError/SyntaxError/stack (`at file://`, `node:internal`) → ca THẤT BẠI (không tính ĐẠT). Bài học vòng trước: **M18 bị tính đạt giả vì stack trace crash chứa chuỗi C2-D1** — dòng báo hình sai src tham chiếu biến chưa định nghĩa khiến checker crash; vòng này đã sửa dòng báo (dùng biến dữ liệu hiệu lực) và bộ thử tự từ chối crash.

Mutations: M1 thiếu ánh xạ (N1); M2 đổi srclang (D1); M3 xóa VTT (N2); M4 cue vượt thời lượng (N2); M5 mất khối bản chữ (D1); M6 mất hình/alt (N1); M7 autoplay (D3); M8 preload→auto (D3); M9 nhãn track sai (D1); M10 mất đoạn sau câu đầu (D1); M11 preload→metadata (D3); M12 mất attr preload (D3); M13 nội dung giả ngoài khối (D1); M14 phụ đề SAI CHU (N2); M15 mất 1 cue (N2); M16 thiếu fixture --root (N0); M17 thiếu tài sản dist (D4); M18 hình sai src trong dist (D1); **M19 lời đọc chỉ còn trong `<script type="application/json">` bên trong details → FAIL C2-D1 (probe TXN-47)**; **M20 lời đọc chỉ còn trong chú thích HTML bên trong details → FAIL C2-D1**.

M21 tự kiểm crash (theo phán TXN-20261016-47): checker giả `throw ReferenceError('m is not defined (C2-D1)')` — bộ thử phải TỪ CHỐN ca (báo crash, không tính ĐẠT); chế độ `--tu-kiem-crash` kỳ vọng ca THAT BAI vì crash → exit 0 khi đúng.

M22 tự chứng minh SHA (theo phán TXN-46 — phải qua cùng cơ chế `ca()`, không có exit mặc định):
- Chế độ `--sha-le`: ca xóa VTT + hoàn nguyên HỎNG (bỏ qua subtree public/videos) → ca THẤT BẠI **DO SHA** (thông báo "SHA lệch sau hoàn nguyên") → tiến trình con exit 1.
- Chế độ `--sha-le-khong-cha`: cùng ca đó với bộ chặn SHA bị bỏ → ca QUA → exit 0.
- Cặp chế độ chứng minh: thất bại là do bộ chặn SHA, hoàn nguyên đúng thì ca đạt. Kết quả: **24/24 ĐẠT, exit 0**; không rò rỉ repo.

## 5. Kiểm nghiệm thu

**ĐÃ KIỂM (script + log trong repo):**

- `npm run check` exit 0 — C2 nguồn chạy đúng 1 lần (dòng "DAT bo kiem C2 … 36 VTT khớp nguyên văn" trong `log-cli/npm-check.log`), entry cuối chuỗi là C1; astro check 211 tệp: **0 lỗi / 0 cảnh báo / 6 hints (baseline)**.
- `npm run build` exit 0 — C2 nguồn (dòng 313) + C2 dist "…+ 36/36 cặp tài sản dist byte-match" (dòng 4487) trước A3 dist cuối (`log-cli/npm-build.log`).
- Trình duyệt Chromium **và** WebKit (`kiem-trinh-duyet-c2.mjs`, log `log-cli/kiem-chromium-36.log`, `kiem-webkit-36.log`, kết luận `kiem-trinh-duyet-{chromium,webkit}.json`), chạy lại sau mọi sửa:
  - **36/36 track mỗi engine** — cấu trúc khối đúng bài (source MP4 đúng route, track kind/srclang/label/src, bản chữ đủ số đoạn trong cùng figure, hình đúng tuyệt đối src + alt/lazy/width/height).
  - **Cue đầu/giữa/cuối đối chiếu ĐÚNG cue dự kiến với dữ liệu C2**: số cue bằng số đoạn; tại mốc `bat_dau` tìm được cue, nguyên văn cue khớp `chu`; seek tới giữa cue dự kiến, **chờ sự kiện seeked và phân biệt rõ "đã nhận seeked" với "timeout"** (không nhận seeked → trang KHÔNG ĐẠT), kiểm currentTime (±0,15 s) trước khi kết luận; cue active phải đúng cue dự kiến (không phải cue bất kỳ); script có **phép tự kiểm timeout** trước khi chạy (mock không bao giờ seeked → phải nhận nhanDuoc=false + dọn listener/timer trong cả hai trường hợp).
  - **Tải chủ động: mp4-trước-phát 0/36 mỗi engine; request VTT 36 + hình 34 mỗi engine (ghi riêng, xuất vào JSON — 2 hình lazy dưới nếp chưa được request là đúng hành vi `loading="lazy"`).**
  - 3 cặp Bộ thoát/Dây tóc/Kính VI/EN 390×844: mở bản chữ bằng bàn phím (focus summary + Enter), không tràn ngang; **chụp sáng/tối lưu riêng theo engine** (`c2-*-390-{chromium,webkit}.png`, `-toi-`, `-phude-`) và **xác minh lớp tối thật** (class `dark` trên `<html>` đúng ở chế độ tối, tắt ở chế độ sáng); phụ đề bật tại cue giữa ĐÚNG nguyên văn.
  - Tắt JavaScript: tách **đúng khối figure chứa `<video>`** khỏi HTML tĩnh (không phải details/img bất kỳ trên trang) — trong khối có `<details>`, hình đúng src ánh xạ, track trỏ đúng VTT, câu đầu lời đọc.
  - 0 lỗi console (loại nguồn _vercel/).
- Hai diff-check: lần 1 sau mọi sửa mã, lần 2 trước lúc trình TXN-20261016-48 — cả hai chỉ chứa đúng phạm vi phát hành mục 2 (không đụng sổ/biên bản gói khác).

**CHƯA KIỂM (ghi rõ):**

- Chưa nghe âm thanh các video (không có khả năng nghe); lời đọc bản chữ lấy nguyên văn từ nguồn đã duyệt — không tự sửa khác âm thanh.
- WebKit là giả lập Playwright, không phải iPhone thật; chưa kiểm thiết bị thật.
- Chưa kiểm trên production sau phát hành (chỉ dist cục bộ).

## 6. Phạm vi phát hành đề nghị (đúng câu lệnh)

`src/components/PrincipleVideo.astro`, `src/data/c2-video-learning.json`, `public/videos/captions/` (36 VTT), `public/images/video-summaries/` (36 hình), `scripts/check-c2-video-learning.mjs`, `scripts/fixtures/c2-baseline-sha.json`, `package.json` (đúng 2 chỗ chèn, C1 nguyên trạng), biên bản + THEO-DOI hàng C2. KHÔNG: output/, MP4/JPG, biên bản gói khác, hàng sổ khác.

## 7. Ghi nhận minh bạch

- Sổ TXN-43 đóng sớm với tóm tắt phản hồi lượt 1 trước khi câu lệnh C2 đến trong chat; câu lệnh lưu nguyên văn tại tệp và làm căn cứ thi công — không che giấu lệch sổ.
- Lịch sử hai vòng CHƯA ĐẠT ghi đầu hồ sơ theo phán quyết thật (TXN-44 theo bản ghi giao dịch; TXN-46 theo nội dung phản hồi nguyên văn của GPT Work).
- Nếu GPT Work cần đối chiếu thêm phiên bản VTT/lời đọc nào, các tệp nguồn gốc còn nguyên trong output/video-*/.
