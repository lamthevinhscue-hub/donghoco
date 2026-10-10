# V3 — Thử bộ thoát dựng sẵn điều khiển bằng thanh trượt — Biên bản thực hiện

- Giao dịch: **TXN-20261010-003 = gói V3** (danh mục DHC-ANH-HOAT-ANH-20260926
  v1.0.0); căn cứ mở gói **TXN-20261010-001** — quyết định của anh Vinh
  "V1 miễn tiêu chí + mở V3"
- Ngày thực hiện: 10/10/2026; nền repo: **HEAD = `7a0b27f` = origin/main**
  (commit V1 đã có trên main — điều kiện mở gói đạt)
- Trạng thái: **HOÀN TẤT TRIỂN KHAI VÀ KIỂM THỬ — DỪNG CHỜ GPT WORK NGHIỆM
  THU. Chưa stage, chưa commit, chưa push.** Có **một mâu thuẫn phạm vi giữa
  đề V3 và checker G06 hiện hành** cần GPT Work quyết (mục 8)
- **Vòng TXN-20261010-007 (vá G06)**: GPT Work chọn phương án 1 và cho phép
  soạn bản vá hẹp `check-g06-escapement-en.mjs`. **ĐÃ SOẠN XONG DIFF ĐỀ XUẤT
  — DỪNG CHỜ DUYỆT, CHƯA ÁP DỤNG** (mục 12)

## 1. Đã dựng gì

Một chu kỳ bộ thoát đòn bẩy kiểu Thụy Sĩ (không thương hiệu) dựng bằng cảnh
Three.js, xuất thành **video dựng sẵn 8 giây (WebM VP9, 960×540, 30 khung/giây,
817 KB)** — người đọc kéo thanh trượt để đi qua từng pha: khóa, nhả, xung lực,
khóa lại, cho **cả hai đá pallet = trọn một dao động (hai rung)**. Video KHÔNG
nhúng chữ; nhãn pha, giải thích và bảng pha đặt bằng HTML dịch được VI/EN.
Đặt cạnh SVG tương tác hiện có trên đúng hai bài bộ thoát để so sánh.

Đây là mô hình nguyên lý giản lược, không phải mô hình bộ máy chuyên nghiệp
(V4 không mở). Dừng sau triển khai + kiểm thử chờ nghiệm thu.

## 2. Danh sách tệp

Mới:
1. `public/videos/v3-escapement/bo-thoat-chu-ky-truot.webm` — video 817 KB
   (một tệp dùng chung, không nhúng chữ)
2. `public/videos/v3-escapement/poster.jpg` — 23 KB (khung đầu)
3. `src/components/EscapementSliderVideo.astro` — component trình đọc
4. `src/data/v3-escapement-phas.json` — **nguồn duy nhất bảng pha** (component,
   script dựng và checker cùng đọc)
5. `scripts/check-v3-escapement-slider.mjs` — checker V3 (nối cuối `check` và
   cuối `build`)
6. `output/v3-escapement-slider/` — script dựng để tái tạo (nội bộ):
   `dung-canh.html` (cảnh Three.js), `render-frames.mjs` (render chia 8 lượt),
   `encode.html` + `encode-webm.mjs` (WebCodecs VP9 + muxer WebM tự viết),
   `kiem-video.mjs` + `kiem-video.html` (kiểm seek độc lập),
   `browser-test-v3.mjs` (10 kịch bản trình duyệt), `mutation-v3.mjs`,
   `so-sanh.mjs` (ảnh so sánh), `frames/` (240 PNG), `anh/` (ảnh kiểm + so sánh)

Sửa hẹp (tracked):
1. `src/content.config.ts` — khóa `slider_video` (boolean, default false)
2. `src/components/templates/MechanismArticle.astro` — gate `V3_SLIDER_SLUGS`
   khóa đúng 2 slug; khi bật, render V3 ngay trước SVG tương tác
3. `src/content/coChe/vi/bo-thoat.md` + `src/content/coChe/en/escapement.md` —
   thêm `slider_video: true`

Không đụng: video thuyết minh mp4 VI/EN (vẫn phát hành nguyên trạng), V1,
timeline, CSS toàn cục, checker cũ (chỉ sửa lỗi thật trong checker V3 mới của
gói — mục 6c).

## 3. Cách dựng và xuất (tái tạo được)

1. **Cảnh** (`dung-canh.html`): bánh thoát 15 răng (Shape 2D + ExtrudeGeometry,
   mũi răng chạm đá trên vòng R=25/30,5), ngựa hai đá ruby với pivot tính NGƯỢC
   từ điểm chạm (bảo đảm tiếp xúc tại tư thế khóa), bánh lắc vành + nan + roller
   + pin + dây tóc xoắn giản lược; **hai tầng z** (ngựa + roller tầng thấp
   z=−7, vành balance tầng trên z=+3) như cấu tạo thật; PCFShadowMap +
   RoomEnvironment PMREM, không tải tài sản ngoài.
2. **Động học** đọc trực tiếp `v3-escapement-phas.json`: bánh thoát luôn tiến
   **24°/rung** (giống vật lý SVG đã duyệt), ngựa đổi chiều mỗi rung
   (±6°), bánh lắc dao động cos ±140° (giản lược); cửa sổ cơ khí gọn quanh vị
   trí giữa của bánh lắc: nhả (u 0,445–0,475) → xung lực (0,475–0,545) → rơi
   (0,545–0,575) — **xung lực diễn ra đúng lúc pin quét qua khe hàm ngựa**.
3. **Render frame-by-frame**: 240 frame PNG, chia 8 lượt × 30 frame, mỗi lượt
   một tab riêng (context WebGL sống vài giây — tránh hiện tượng crash render
   liên tục đã ghi ở hồ sơ V1). Mọi lượt render thành công, không crash.
4. **Encode**: WebCodecs VP9 (`vp09.00.10.08`, keyframe mỗi giây) + **muxer
   WebM (EBML) tự viết** trong Chrome — không cần ffmpeg (máy không có
   ffmpeg/Blender, không thêm dependency).
5. **Kiểm sản phẩm độc lập** (`kiem-video.mjs`): duration đọc lại **8000 ms
   chính xác**; seek 9 mốc khớp ±0 ms; khung các mốc phân biệt được; seek ngược
   7900→890 chính xác.

## 4. Nguồn nguyên lý

- **Trong repo (căn cứ chính)**: SVG `Escapement.astro` 5 bước đã duyệt qua
  cổng G06-C (về-giữa → Unlock → Impulse → Lock → Reversal) cùng vật lý đã
  chốt: bánh thoát 24°/nhịp easeOutCubic, ngựa đổi chiều mỗi nhịp, bánh lắc
  một nửa dao động mỗi nhịp. V3 mở rộng thành đủ hai rung bằng đối xứng.
- **FHH glossary** (tải nguyên văn 557 mục, 10/10/2026, lưu
  `output/v3-escapement-slider/fhh-glossary-*.json`): *Impulse* — "hành động
  của răng bánh thoát lên mặt xung lực của đá" (nguyên văn mục từ);
  *Pallet* — đá vào/đá ra, khối ruby/sapphire/garnet trên hai nhánh ngựa;
  *Safety roller* — đĩa trên trục bánh lắc mang pin, nhận xung lực từ ngựa;
  *Oscillation* — một dao động = hai rung; *Escapement* — chặn chuỗi bánh
  răng + cấp năng lượng cho bánh lắc; *Lever* — truyền năng lượng tới bánh lắc.
- Bảng pha hiển thị trên trang ghi căn cứ từng hàng (FHH mục từ cụ thể +
  bước SVG tương ứng) — đọc được ở cả hai ngôn ngữ.

## 5. Giới hạn mô hình (công khai trên trang + tại đây)

Ghi chú giản lược hiển thị ngay trong khối (VI/EN, từ phas.json): góc quay và
thời điểm minh họa trình tự, không phải thông số thiết kế; không đại diện
calibre cụ thể. Chi tiết giản lược thêm (bổ sung cho biên bản): (1) mặt khóa /
mặt xung lực của đá là khối hộp nghiêng, không vẽ profile đá thật; (2) khoảng
rơi (drop) 2° khó thấy bằng mắt; (3) dây tóc không "thở" như thật; (4) roller
giản lược một đĩa + pin, không tách safety roller riêng; (5) thời điểm pin chạm
hàm được giản lược trùng cửa sổ cơ khí.

**Đoạn thử biểu diễn CẢ CHU KỲ**: một dao động đầy đủ (hai rung, 8 pha,
0→8000 ms) — không gọi nửa chu kỳ thành chu kỳ đầy đủ. Frame cuối khớp tư thế
frame đầu (răng lặp chu kỳ 24°) nên vòng lặp mượt.

## 6. Kết quả kiểm

### 6a. Checker V3 (`scripts/check-v3-escapement-slider.mjs`)

- Nguồn: **ĐẠT 27/27** — V3-1 phạm vi đúng 2 bài (mp4 cũ + has_infographic
  false giữ nguyên); V3-2 không autoplay/loop/play(), preload="none", tải chủ
  động, slider disabled đến metadata, mô hình đích chờ khi seek, aria-live +
  aria-valuetext, ghi chú giản lược, noscript, xử lý lỗi; V3-3 ánh xạ pha
  (8 pha phủ 0→8000ms, biên liên tục, một nguồn phas.json); V3-4 ngân sách
  (webm 798 KB ≤ 1,2 MB; poster 23 KB ≤ 120 KB; không mp4 trong thư mục V3;
  mp4 cũ còn nguyên); V3-5 tích hợp + gate G06 nguyên văn.
- Dist (bản sao kiểm chứng sạch): **ĐẠT 39/39** (V3-6: hai route chứa khối đúng
  preload/poster, thẻ video không autoplay/loop, bảng pha đúng ngôn ngữ, SVG
  hiện kèm, mp4 vẫn tham chiếu; không bài khác chứa khối; webm vào đúng chỗ).
  *Hai dương tính giả của checker V3 (chữ "loop" trong câu giải thích trúng
  regex thuộc tính; quét lộ trình thiếu route EN) đã sửa đúng đối tượng kiểm —
  checker V3 là tệp mới của gói, không đụng checker cũ.*
- Nối cuối `npm run check` + cuối `npm run build` (package.json).

### 6b. Mutation (`output/v3-escapement-slider/mutation-v3.mjs`)

**6/6 ca ĐẠT + 1 lượt chạy sạch cuối exit 0** (đếm riêng; sandbox mkdtemp ngoài
repo, hoàn nguyên byte-đối-byte, log `mutation-v3.log.txt`):
MUT-1 biên pha đứt → V3-3; MUT-2 mất aria-valuetext → V3-2; MUT-3 thêm
autoplay → V3-2; MUT-4 bật slider_video trên bài khác → V3-1; MUT-5 preload
"auto" → V3-2; MUT-6 principle_video trỏ sai → V3-1.

### 6c. Trình duyệt (Chrome hệ thống 153, dist bản sao kiểm chứng sạch — 10 kịch bản)

| Kịch bản | Kết quả |
|---|---|
| vi — trước thao tác | **0 request webm**; slider disabled; nút hiện; SVG + mp4 cũ còn; không tràn ngang |
| vi — tải + kéo | video tải đúng 1 lần; kéo tới 2040 ms → nhãn "Pha 3/8 — Xung lực (1,9–2,2 s)" đúng; video luôn paused |
| vi — kéo nhanh/ngược | 7900→200→7000→500→7900 → **currentTime chốt 7900 = giá trị cuối** (đích mới nhất thắng) |
| vi — bàn phím | đặt 1000 → ArrowRight ×5 → +500 ms đúng step, seek khớp ≤150 ms |
| vi — 390px | không tràn ngang; bảng 8 hàng đọc được |
| vi — dark | html.dark bật; không tràn |
| en | nhãn tiếng Anh "Phase 3/8 — Impulse" đúng |
| en — 390 + dark | không tràn; bảng đọc được |
| reduced motion | mọi chuyển động do người đọc kéo; video paused; kéo hoạt động |
| lỗi video | chặn request webm → thông báo "Không tải được video…" + bảng + SVG giữ nguyên |
| JavaScript tắt | 0 request video; bảng pha + SVG + poster vẫn có |

Console mọi kịch bản sạch (chỉ 404 `/_vercel/insights` của môi trường preview —
không thuộc V3, được phép bỏ qua theo tiền lệ V1).

### 6d. Hồi quy — chạy trên **bản sao kiểm chứng sạch** (mục 7)

- Chuỗi `npm run check` (worktree sạch): mọi checker chạy **ĐẠT** tới điểm
  G06 (gồm V1 nguồn ĐẠT, V3 nguồn 27/27, scan-chars, N2, …).
- `astro check` (worktree sạch, không output/): **0 lỗi / 0 cảnh báo / 0 gợi ý**
  (373 tệp).
- `astro build`: **exit 0** — dist dựng đủ (293 trang); checker dist chạy qua
  budget 3D ĐẠT, V1 dist ĐẠT, **V3 dist 39/39 ĐẠT**.
- Trên máy làm việc gốc: `npm run build` hiện **không chạy được** vì 111 lỗi
  astro check từ thư mục untracked **của đợt khác**: 108 lỗi
  `output/video-reverso-skeleton/ma-nguon/src/Reverso.ts` (mã remotion không
  có module cài) + 3 lỗi release-check dist history — **không một lỗi nào từ
  tệp tracked hay tệp V3**; đã xử lý đúng đề bài mục 5C: dùng bản sao kiểm
  chứng sạch, không sửa cấu hình toàn repo, không đụng tệp đợt khác.
- Repo gốc: `node scripts/scan-chars.mjs` OK 464 tệp;
  `git diff --check` + `git diff --cached --check` sạch.

## 7. Bản sao kiểm chứng sạch — cách chạy (ghi rõ theo đề)

`npm run build` trên máy gốc chết ở astro check vì untracked output/ của đợt
khác. Cách tái tạo môi trường sạch đã dùng:

1. `git worktree add D:/v3-kiem-chung HEAD` (HEAD = `7a0b27f`).
2. Overlay 9 tệp gói V3 + copy `output/v3-escapement-slider/dung-canh.html`
   vào worktree (checker V3-3 cần).
3. Copy node_modules (robocopy; junction khiến npm không resolve bin).
4. `npm run build` trong worktree.

Worktree `D:/v3-kiem-chung` giữ lại (dist + node_modules) để GPT Work tái kiểm
trực tiếp; gỡ bằng `git worktree remove` khi khép gói. `git worktree list`
hiện 2 worktree — không đụng lịch sử git của repo chính.

## 8. Mâu thuẫn phạm vi — cần GPT Work quyết định

**Đề V3 yêu cầu "Giữ SVG có thể thao tác để so sánh" trên đúng hai bài bộ
thoát (VI + EN) — tức bật lại SVG Escapement trên hai trang. Nhưng checker
`check-g06-escapement-en.mjs` (từ 02/10/2026, commit c454654) khóa NGƯỢC LẠI:
"khung infographic đã rút khỏi cả hai trang, thay bằng video thuyết minh" —
D1/D3 hai trang KHÔNG khung; D2/D3d không còn chuỗi hiển thị khung
(`escapement-svg`, "Bước 1/5"…); D7 tổng trang render khung = 5 (0 co-che).**

Bằng chứng: build sạch chạy qua mọi checker rồi **fail đúng 5 lỗi D1, D2, D3,
D3d, D7 của G06-dist** (`build-sach-log.txt`); mọi kiểm khác (kể cả V3 dist
39/39, V1 dist, budget, links) ĐẠT khi chạy riêng.

Em **không tự sửa checker G06** (đề cấm thay đổi checker cũ; và đây là kiểm
công bố của gói G06-C trước đây). Hai lựa chọn trình GPT Work:

1. **(Khuyến nghị)** Phê duyệt cập nhật G06 đúng phạm vi: khi `slider_video:
   true` bật trên đúng hai bài, hai trang được phép có khung SVG kèm V3 —
   D1/D3 thêm ngoại lệ có điều kiện, D2/D3d chỉ cấm khung khi V3 KHÔNG bật,
   D7 đếm lại (5 → 7 trang khi V3 bật). Em soạn bản vá G06 để GPT Work duyệt
   nguyên văn trước khi nối vào build.
2. Giữ G06 nguyên trạng → V3 không thể "đặt cạnh SVG" như đề — cần GPT Work
   định lại cách so sánh (ví dụ chụp ảnh SVG tĩnh nhúng trong khối V3).

## 9. Dung lượng và thời gian tải

- Video 817 KB (≤ 1,2 MB ngân sách checker); poster 23 KB.
- Trạng thái chưa bấm nút: **0 byte video** (preload="none", src chỉ gán khi
  bấm — browser test đếm request = 0).
- Sau bấm: 1 request; seek hoạt động tức thì sau metadata (server test hỗ trợ
  Range 206); kéo nhanh/ngược chốt đúng đích cuối.

## 10. Ảnh

- `output/v3-escapement-slider/anh/so-sanh-v3-svg.png` — **ảnh so sánh cạnh
  nhau cho anh Vinh**: bản V3 (video + slider + nhãn pha + bảng) | SVG hiện có
  (khung 2D, chụp ở tư thế mặc định).
- `anh/` gồm thêm: vi-chua-tai, vi-tai-keo, vi-390, vi-dark, en-tai-keo,
  en-390-dark, reduced, loi-video, js-tat.

## 11. Điểm cần anh Vinh / GPT Work quyết

1. **Mâu thuẫn G06** (mục 8) — blocker duy nhất trước khi `npm run build` xanh
   tròn chuỗi. Chọn phương án 1 hoặc 2.
2. Định dạng WebM: Chrome/Edge/Firefox phát tốt; Safari iOS chỉ từ 17.4+.
   Nếu cần MP4 H.264 phủ rộng hơn: máy không có ffmpeg — đề xuất cho phép cài
   công cụ build (ngoài bundle) ở gói sau, hoặc giữ WebM + fallback đã có.
3. Nếu nghiệm thu ĐẠT: đề nghị phát hành 6 tệp (5 tệp mới + 4 tệp tracked sửa —
   liệt kê mục 2; output/ giữ nội bộ). Script dựng trong output/ có thể chuyển
   vào repo theo yêu cầu tái tạo nếu GPT Work chỉ định vị trí.

*Chưa stage, chưa commit, chưa push. Dừng chờ GPT Work kiểm độc lập và anh
Vinh xem bản thử.*

## 12. Vòng TXN-20261010-007 — bản vá G06 đề xuất (CHỜ DUYỆT, CHƯA ÁP DỤNG)

GPT Work chọn phương án 1 (mục 8) và cho phép soạn bản vá hẹp checker G06.
Điểm dừng của vòng này: **gửi diff + danh sách nguồn chuyển — chờ duyệt rồi
mới áp dụng và chạy hồi quy.**

### 12a. Diff đề xuất

- Tệp: `output/v3-escapement-slider/va-g06-de-xuat.diff` (211 dòng, 3 hunk)
- Bản vá mô phỏng nguyên bản: `output/v3-escapement-slider/g06-de-xuat-vap.mjs`
- Đã kiểm: `git apply --check` ĐẠT (áp được lên scripts/check-g06-escapement-en.mjs
  hiện hành); `node --check` cú pháp OK; **chạy thử bản vá trên worktree dist
  hiện hành (hai cờ bật): 0 lỗi — mọi kiểm ĐẠT** gồm S10d, D1/D1v/D2 EN,
  D3/D3v/D3d VI, D5 + 3 tự kiểm, D7 tập 7 trang. Checker gốc trong repo
  **nguyên trạng** (git status sạch tệp này).

Nội dung 3 hunk — đối chiếu 5 điều kiện của đề:

1. **Ngoại lệ theo cờ, không suy từ HTML** (hunk 1 — thêm S10d sau S10c):
   quét frontmatter `src/content/coChe/{vi,en}/*.md`, chỉ chấp nhận đúng
   `en/escapement` + `vi/bo-thoat` bật `slider_video: true`; bài khác bật →
   S10d fail. `v3EnBat`/`v3ViBat` là cờ duy nhất dẫn nhánh D-tier. S10/S10b
   giữ nguyên — has_infographic/interactive vẫn false, V3 không dùng hai cờ đó.
2. **D1/D3 hai nhánh** (hunk 2+3): cờ tắt → giữ nguyên văn kiểm "không khung"
   hiện hành; cờ bật → bắt buộc CÓ `data-mechanism` + `data-mech-step-id=
   "escapement"` + `id="escapement-svg"` + khối `id="v3esc"`, cộng thêm D1v/D3v:
   khối V3 phải trỏ đúng webm + poster V3 và preload="none" (không chỉ "có
   khung").
3. **D2/D3d hai nhánh**: cờ tắt → nguyên văn danh sách cấm chuỗi hiện hành;
   cờ bật → 6 chuỗi PHẢI CÓ đúng ngôn ngữ (nhãn khung, counter "Step 1/5"/
   "Bước 1/5", desc, ghi chú giản lược nguyên văn, id SVG, step-id) + 3 chuỗi
   cấm lẫn ngôn ngữ kia. Không bỏ kiểm bằng điều kiện luôn đúng — chuỗi cấm
   ngược ngôn ngữ vẫn chạy ở nhánh bật.
4. **D7 so tập đường dẫn**: thay đếm tổng=5 bằng Set đối chiếu — 5 trang từ
   điển nền liệt kê tường minh (chronograph, day-toc-banh-lac, gmt,
   perpetual-calendar, tourbillon) + đúng các trang bộ thoát bật. Bắt cả
   "thiếu" lẫn "thừa" → trường hợp tổng đúng nhưng khung chuyển trang bị bắt.
5. **Giữ nguyên các bảo vệ khác**: D1b/D1c/D3b/D3c (video thuyết minh + poster
   đúng ngôn ngữ, không lẫn clip — chạy ở cả hai nhánh), S1–S8b/S15 (nguồn chữ
   SVG đã duyệt), S13 (reduced motion), D5 + 3 tự kiểm (không khung ở trang EN
   khác — hàm đã loại đúng trang Bộ thoát EN), D6 (G04), D8, D10 (không 3D),
   S9 gate nguyên văn, S10/S10b/S10c, S11/S12/S14.

### 12b. Phép thử sandbox dự kiến (bước 2 — sau khi diff được duyệt)

6 ca mới cho G06: (1) hai cờ tắt giữ hành vi cũ — vá phải chạy ĐẠT trên trạng
thái dựng từ HEAD không V3; (2) cờ bật nhưng dist thiếu khối V3 → D1/D3 fail;
(3) cờ bật nhưng thiếu SVG (chỉ có V3) → D1/D3 fail; (4) slider_video true trên
bài khác → S10d fail; (5) tổng khung giữ nguyên nhưng một trang bộ thoát đổi
sang trang từ điển khác → D7 fail (thiếu+thừa); (6) mất/sai video thuyết minh
→ D1b/D3b fail. Giữ nguyên 6 mutation V3; báo riêng số ca mới / tổng / lượt
chạy sạch (lượt sạch không tính là mutation).

### 12c. Danh sách nguồn chuyển output/ → scripts/v3-escapement/ (đề xuất)

Chuyển (mã dựng/xuất + kiểm sản phẩm — 6 tệp):
| Hiện tại (output/v3-escapement-slider/) | Đích (scripts/v3-escapement/) | Vai trò |
|---|---|---|
| dung-canh.html | dung-canh.html | cảnh Three.js dựng chu kỳ (checker V3-3 đọc trực tiếp) |
| render-frames.mjs | render-frames.mjs | render 240 frame chia 8 tab |
| encode.html | encode.html | WebCodecs VP9 + muxer WebM |
| encode-webm.mjs | encode-webm.mjs | điều phối encode + xuất poster |
| kiem-video.mjs | kiem-video.mjs | kiểm độc lập duration/seek/ngược |
| kiem-video.html | kiem-video.html | trang kiểm video (kiem-video.mjs dùng) |

Cập nhật đường dẫn kèm theo (nếu duyệt): checker V3 kiểm V3-3 đọc
`scripts/v3-escapement/dung-canh.html` (thay đường dẫn output/); mutation-v3
sandbox copy theo đường dẫn mới; render-frames.mjs/encode-webm.mjs giữ thư mục
trung gian (frames/, anh/) trong output/ vì không phát hành.

Chuyển thêm (đề xuất — mutation thuộc chuỗi kiểm tái tạo): `mutation-v3.mjs`
→ `scripts/v3-escapement/mutation-v3.mjs` (bước 2 sẽ mở rộng thêm 6 ca G06).

Giữ lại output/ (nội bộ, không phát hành): browser-test-v3.mjs, so-sanh.mjs
(công cụ kiểm trình duyệt — đường dẫn hard-code worktree kiểm chứng, tái tạo
theo hướng dẫn biên bản), frames/ (240 PNG), anh/ (ảnh kiểm + so sánh),
fhh-glossary-*.json (bằng chứng nguồn), các log, g06-de-xuat-vap.mjs +
va-g06-de-xuat.diff (hồ sơ duyệt bản vá).

Đáp ứng yêu cầu: sau khi chuyển, checker V3 chạy được trên checkout mới có đủ
các tệp dự kiến phát hành — không cần sao chép tệp từ output/ (khác lần chạy
trước phải copy dung-canh.html sang worktree).

### 12d. Chưa làm trong vòng này (chờ duyệt)

Chưa áp diff, chưa soạn/ca phép thử sandbox, chưa chạy lại `npm run build`
trọn chuỗi, chưa kiểm lại trình duyệt sau vá — toàn bộ thuộc bước 2 sau khi
diff được duyệt. Không stage, không commit, không push.

## 13. Vòng TXN-20261010-009 — diff cuối + bảy tệp sau chuyển (CHỜ DUYỆT)

### 13a. Diff v2 cuối

- `output/v3-escapement-slider/va-g06-de-xuat.diff` — **229 dòng, 3 hunk**;
  `git apply --check` ĐẠT; bản vá chạy trên worktree dist (hai cờ bật):
  **0 lỗi**; checker gốc `scripts/check-g06-escapement-en.mjs` **nguyên trạng**.
- Khác diff v1 theo hai điểm phán quyết:
  1. **Chú thích đầu checker** (hunk 1): thêm khối lịch sử V3 giải thích hai
     nhánh cờ và các bảo vệ giữ nguyên ở cả hai nhánh.
  2. **D1v/D3v kiểm trên ĐÚNG thẻ** `<video id="v3esc-video">` (regex tag):
     webm + poster + preload="none" phải nằm ngay trên thẻ này — preload=
     "none" ở thẻ khác (video thuyết minh) không được tính thay.
- Cộng dồn chỉnh sửa nội dung so với v1: **S10d nới** — chấp nhận 0/1/2 bài
  bật miễn mọi bài bật thuộc tập cho phép {en/escapement, vi/bo-thoat} (tắt cả
  hai = trạng thái cũ hợp lệ, đúng phép thử PT-1); **D7 chiTiet in cả thiếu
  lẫn thừa** cùng lúc (v1 chỉ in thiếu khi cả hai cùng lệch).

### 13b. Phép thử sandbox G06 — 7/7 ĐẠT

`output/v3-escapement-slider/phep-thu-g06.mjs` (log `phep-thu-g06.log.txt`),
chạy BẢN VÁ trong cây giả mkdtemp, không đụng checker gốc:

| Ca | Tình huống | Kết quả bắt đúng |
|---|---|---|
| PT-1 | hai cờ TẮT + dist rút khung | G06 ĐẠT (exit 0) — hành vi cũ |
| PT-2 | cờ TẮT nhưng dist còn SVG/khung | D1/D3/D7 thất bại |
| PT-3 | thẻ video V3 sai preload, nơi khác có preload="none" | D1v/D3v vẫn bắt (kiểm theo tag) |
| PT-4 | cờ BẬT thiếu khối V3 | D1/D3 thất bại |
| PT-5 | cờ BẬT thiếu khung SVG | D1/D2/D3/D3d/D7 thất bại |
| PT-6 | tổng khung giữ nguyên nhưng chronograph → vph | D7 bắt thiếu + thừa |
| PT-7 | EN tham chiếu clip VI | D1c thất bại |

### 13c. Bảy tệp sau chuyển — đã chuyển + đã chạy thật

`scripts/v3-escapement/`: dung-canh.html, render-frames.mjs, encode.html,
encode-webm.mjs, kiem-video.mjs, kiem-video.html, mutation-v3.mjs.
Bản output/ đã xóa bản copy (tránh hai bản); frames/, anh/, log vẫn output/.

Cập nhật trong tệp sau chuyển:
- URL trang dựng/encode/kiểm: `/scripts/v3-escapement/dung-canh.html` /
  `encode.html` / `kiem-video.html`.
- **Bỏ hard-code Playwright/Chrome** (đường `C:/Users/Admin/...`): ba script
  render-frames/encode-webm/kiem-video nhúng hàm tìm động — ưu tiên biến môi
  trường `PLAYWRIGHT_CORE_PATH` / `PLAYWRIGHT_CHROME_PATH`, sau đó quét cache
  npx (`%LOCALAPPDATA%\npm-cache\_npx\*\node_modules\playwright-core`) và đường
  cài Chrome chuẩn + cache ms-playwright; không thấy thì báo lỗi hướng dẫn đặt
  biến. Không cài dependency mới.
- `mutation-v3.mjs`: sandbox copy `scripts/v3-escapement/dung-canh.html`.
- Checker V3: kiểm V3-3 đọc `scripts/v3-escapement/dung-canh.html`.

Chạy thật sau chuyển (từ repo, không copy tệp nào từ output/): kiem-video ĐẠT
(duration 8000ms, seek ±0ms); render-frames chạy thử 30 frame OK (URL mới);
mutation-v3 **6/6 + chạy sạch**; checker V3 nguồn **27/27**.

### 13d. Hướng dẫn chạy bảy tệp sau chuyển (để duyệt + tái tạo)

Điều kiện: repo checkout có đủ tệp dự kiến phát hành + `npm install` đã chạy
(node_modules); Chrome hoặc biến `PLAYWRIGHT_CHROME_PATH`. Video sản phẩm
`public/videos/v3-escapement/bo-thoat-chu-ky-truot.webm` đã có — các lệnh 2–4
chỉ tái tạo lại khi cần đổi cảnh:

1. Kiểm sản phẩm video (nhanh): `node scripts/v3-escapement/kiem-video.mjs`
   — kỳ vọng: duration ĐẠT 8000ms, seek ĐẠT, khung phân biệt ĐẠT, seek ngược
   ĐẠT (đã chạy: ĐẠT toàn bộ).
2. Dựng lại frames (tùy chọn): `node scripts/v3-escapement/render-frames.mjs`
   — xuất `output/v3-escapement-slider/frames/f0000.png…f0239.png` (240 frame,
   8 lượt × 30); biến `SO_FRAME` để thử ít frame hơn (đã chạy thử SO_FRAME=30
   OK).
3. Encode lại video + poster (tùy chọn):
   `node scripts/v3-escapement/encode-webm.mjs` — ghi
   `public/videos/v3-escapement/bo-thoat-chu-ky-truot.webm` + poster.jpg.
4. Hồi quy mutation: `node scripts/v3-escapement/mutation-v3.mjs` — 6/6 +
   chạy sạch (đã chạy sau chuyển: ĐẠT).
5. Checker V3: `node scripts/check-v3-escapement-slider.mjs [dist]` — nguồn
   27/27; dist 39/39 (đã chạy).
6. Checker G06 gốc (chưa vá): hành vi hiện hành — sẽ KHÔNG ĐẠT trên trang V3
   cho tới khi diff được duyệt và áp; bản vá chạy thử bằng
   `output/v3-escapement-slider/g06-de-xuat-vap.mjs dist [thuMucDist]`.
7. Phép thử sandbox vá: `node output/v3-escapement-slider/phep-thu-g06.mjs`
   — 7/7 ĐẠT (kết quả 13b).

### 13e. Chưa làm (chờ duyệt diff v2)

Áp diff vào checker gốc; bổ sung mutation G06/vá thành chuỗi kiểm chính thức
(nếu GPT Work yêu cầu); chạy lại `npm run build` trọn chuỗi trên bản sao sạch
và kiểm lại trình duyệt sau vá. Không stage, không commit, không push.

## 14. Vòng TXN-20261010-011 — đồng bộ ba bản có hash (CHỜ DUYỆT BƯỚC 2)

### 14a. Đối chiếu thực tế (GPT Work kiểm đúng ba lệch — đã xử lý trên tệp thật)

1. **Frontmatter**: S10d trước đây test cờ trên TOÀN tệp .md — thân bài chứa
   chuỗi "slider_video: true" sẽ khớp oan. Đã sửa: hàm `trichFrontmatter()`
   cắt phần giữa `---` đầu và `---` thứ hai, chỉ test cờ trên frontmatter.
2. **Thẻ video**: D1v/D3v trước đây regex thẻ `<video id="v3esc-video">` trên
   TOÀN trang. Đã sửa: trích ĐÚNG khối `<figure id="v3esc">…</figure>` rồi mới
   tìm thẻ video BÊN TRONG figure; preload="none" ở thẻ khác không tính thay.
3. **Nguồn scripts/v3-escapement/**: kiểm thực tệp cho thấy lệnh chuyển vòng
   trước đã copy đè bản đã sửa bằng bản output/ cũ — `mutation-v3.mjs` (dòng
   Chạy + CAY) và **`check-v3-escapement-slider.mjs` (kiểm V3-3 vẫn đọc
   `output/…/dung-canh.html`)** chưa chuyển hẳn. Đã sửa trên tệp thật:
   mutation-v3 (Chạy + CAY → scripts/v3-escapement/), checker V3 (V3-3 →
   scripts/v3-escapement/dung-canh.html). **Xóa 7 bản cũ trong output/**
   (biên bản mục 13c ghi "đã xóa" trước đó SAI — mới xóa thật ở vòng này).
   Chạy chứng minh không cần output cũ: mutation 6/6 + chạy sạch ĐẠT; checker
   V3 nguồn 27/27 — đều chạy sau khi output/…/dung-canh.html không còn.

### 14b. Phép thử — 8/8 ĐẠT (thêm PT-0 + fixture sạch nền)

- **PT-0 (mới, chạy TRƯỚC đột biến)**: hai cờ BẬT, dist đầy đủ V3 + SVG →
  G06 **exit 0** và không một dòng LỖI — fixture mang lỗi nền sẽ lộ ngay đây.
- Fixture `trangBat` bọc video V3 trong `<figure id="v3esc">` như trang thật
  (trước đây thiếu figure — lỗi nền D1/D3 ở PT-6 bắt được nhờ PT-0 design).
- Mọi ca đột biến siết `khongLoiNen`: mọi dòng LỖI phải thuộc nhóm chủ đích —
  PT-2 [D1,D2,D3,D3d,D7]; PT-3 [D1v,D3v]; PT-4 [D1,D1v,D3,D3v]; PT-5
  [D1,D1v,D2,D3,D3v,D3d,D7]; PT-6 [D7]; PT-7 [D1c]. Kết quả: **8/8 ĐẠT**
  (PT-0..PT-7), log `phep-thu-g06.log.txt`.

### 14c. Ba bản đồng bộ — hash

| Bản | SHA-256 |
|---|---|
| Bản mô phỏng `output/v3-escapement-slider/g06-de-xuat-vap.mjs` | `b53114d6ddbba272495e61f0beb6b989b006a0361e9e026b56d79424e4e07dbf` |
| `output/v3-escapement-slider/va-g06-moi.mjs` (nguồn sinh diff) | `b53114d6…` (đủ: b53114d6ddbba272495e61f0beb6b989b006a0361e9e026b56d79424e4e07dbf) |
| Áp diff lên checker gốc (cây thử `patch -p1`) | `b53114d6…` (đủ: b53114d6ddbba272495e61f0beb6b989b006a0361e9e026b56d79424e4e07dbf) |

Diff cuối: `output/v3-escapement-slider/va-g06-de-xuat.diff` — **236 dòng,
3 hunk**, `git apply --check` ĐẠT (dùng `patch -p1` khi áp trong thư mục con —
`git apply` từ thư mục con của repo bị "Skipped"). Checker gốc
`scripts/check-g06-escapement-en.mjs` **nguyên trạng** (hash `8ac83ff7…`,
git status trống).

### 14d. Chờ duyệt

Duyệt diff v3 (hoặc hash ba bản) → bước 2: áp vá vào checker gốc, bổ sung
mutation G06 vào chuỗi kiểm nếu được yêu cầu, chạy `npm run build` trọn chuỗi
trên bản sao sạch và kiểm lại trình duyệt sau vá. Không stage, không commit,
không push.

## 15. Vòng TXN-20261010-013 — bước 2: áp vá + build trọn + kiểm trình duyệt lại

### 15a. Áp diff đã duyệt

- `git apply` diff `va-g06-de-xuat.diff` (duyệt TXN-20261010-011) lên
  `scripts/check-g06-escapement-en.mjs` — **hash kết quả
  `b53114d6ddbba272495e61f0beb6b989b006a0361e9e026b56d79424e4e07dbf` = đúng
  bản mô phỏng đã duyệt**; cú pháp OK; `git status` tracked M đúng 1 tệp này.

### 15b. Phép thử G06 vào bộ kiểm có quản lý phiên bản

- `output/v3-escapement-slider/phep-thu-g06.mjs` → **`scripts/v3-escapement/phep-thu-g06.mjs`**
  (tệp thứ 8 trong thư mục — do đề bài vòng này yêu cầu đưa phép thử vào bộ
  kiểm; bản output + log cũ đã rút).
- Chạy **checker chính thức sau vá** (`scripts/check-g06-escapement-en.mjs`) —
  không phụ thuộc bản đề xuất trong output/.
- Kết quả **8/8**: **2 lượt sạch** PT-0 (hai cờ bật, dist đầy đủ → exit 0, không
  một dòng LỖI) + PT-1 (hai cờ tắt, dist rút khung → exit 0); **6 ca âm tính**
  PT-2..PT-7 (đột biến → thất bại đúng nhóm chủ đích, không lỗi nền —
  `khongLoiNen` siết từng ca). Log `output/v3-escapement-slider/phep-thu-g06.log.txt`.

### 15c. `npm run build` TRỌN CHUỖI trên bản sao sạch — exit 0

Worktree `D:/v3-kiem-chung` cập nhật: checker G06 đã vá, 8 tệp
`scripts/v3-escapement/`, checker V3 mới (V3-3 trỏ `scripts/v3-escapement/`);
xóa sạch output worktree. Kết quả `npm run build` (log
`output/v3-escapement-slider/build-vay-log.txt`):

- **exit 0 toàn chuỗi** — qua mọi checker nguồn, astro build, toàn bộ checker
  dist (budget 3D, links, G06 nguồn + dist, V1, V3…).
- astro check: **0 lỗi / 0 cảnh báo / 0 gợi ý** (sau khi dọn 2 khai báo không
  dùng trong `kiem-video.mjs` — tàn dư sửa trang kiểm; kiem-video chạy lại
  ĐẠT: duration 8000ms, seek ±0ms, seek ngược chuẩn).
- **G06 sau vá: 0 lỗi** ở tầng nguồn lẫn tầng dist — S10d ĐẠT, D7 "7 trang
  đúng tập (5 từ điển nền + Bộ thoát VI + Bộ thoát EN)".
- V1 nguồn + dist ĐẠT; V3 nguồn 27/27 + dist 39/39 ĐẠT.

### 15d. Kiểm trình duyệt lại sau vá — 10 kịch bản, 28/28 điểm ĐẠT

Chrome hệ thống trên dist worktree (kết quả `anh/ket-qua-*.json`): vi (0 request
webm trước thao tác, slider khóa, SVG + mp4 cũ còn, không tràn), vi-tai (nhãn
pha đúng, kéo nhanh/ngược chốt 7900=7900, bàn phím +500ms seek khớp, luôn
paused), vi-phim (không autoplay), vi-390, vi-dark, en (nhãn Impulse),
en-390-dark, reduced motion, lỗi video (thông báo + bảng + SVG giữ), JS tắt
(bảng + SVG + poster) — **mọi điểm kiểm ĐẠT**; console chỉ 404 insights
(môi trường preview, không thuộc V3).

### 15e. Danh sách tệp phát hành thực tế (đề nghị — CHỜ NGHIỆM THU ĐỘC LẬP)

Tracked sửa (6):
1. `scripts/check-g06-escapement-en.mjs` — vá V3 đã duyệt (hash b53114d6…)
2. `package.json` — nối checker V1 + V3 vào cuối `check` và `build`
3. `src/components/templates/MechanismArticle.astro` — gate V3_SLIDER_SLUGS
4. `src/content.config.ts` — khóa `slider_video` (default false)
5. `src/content/coChe/vi/bo-thoat.md` — `slider_video: true`
6. `src/content/coChe/en/escapement.md` — `slider_video: true`

Mới (14):
7. `src/components/EscapementSliderVideo.astro`
8. `src/data/v3-escapement-phas.json`
9. `scripts/check-v3-escapement-slider.mjs`
10–17. `scripts/v3-escapement/`: dung-canh.html, render-frames.mjs, encode.html,
encode-webm.mjs, kiem-video.mjs, kiem-video.html, mutation-v3.mjs,
phep-thu-g06.mjs
18–19. `public/videos/v3-escapement/bo-thoat-chu-ky-truot.webm` (817 KB) +
`poster.jpg` (23 KB)
20. `docs/nghiem-thu/V3-thu-bo-thoat-truot-2026-10-10.md` (biên bản này)

`output/` giữ nội bộ (frames, ảnh, log, bằng chứng nguồn FHH, browser-test-v3,
so-sanh). `docs/CHI-MUC-KE-HOACH-HIEN-HANH.md` — đợt điều phối, phát hành
riêng như các vòng trước.

### 15f. Trạng thái

Chưa stage, chưa commit, chưa push. HEAD vẫn `7a0b27f` = origin/main khi bắt
đầu vòng. Dừng chờ GPT Work nghiệm thu độc lập V3. V1, chỉ mục điều phối và
các gói khác giữ nguyên.

## 16. Vòng TXN-20261010-015 — song ngữ cột căn cứ bảng pha (CHỜ TÁI NGHIỆM THU)

### 16a. Sửa nội dung

- `src/data/v3-escapement-phas.json`: `canCu` (chuỗi VI duy nhất) → **đối tượng
  `{ vi, en }` cho đủ 8 pha** — dịch trung thành, không thêm claim/nguồn mới
  (cùng bộ căn cứ FHH + SVG bước tương ứng; ô "đối xứng" giữ cách dẫn cũ).
- `src/components/EscapementSliderVideo.astro`: cột Căn cứ render
  `laEn ? pha.canCu.en : pha.canCu.vi` — không đổi thời gian pha, video, hình
  học hay hành vi thanh trượt.
- Phát hiện minh bạch: worktree kiểm chứng có sẵn một phiên bản `canCu` đơn
  mở rộng (dấu phẩy) không rõ nguồn sửa — đã thay bằng bản song ngữ chuẩn của
  vòng này khi build; nếu GPT Work muốn kiểu dấu phẩy sẽ chỉnh riêng sau.

### 16b. Checker V3 mở rộng

- **V3-7 (nguồn, mới)**: đủ 8 pha có `canCu.vi` + `canCu.en` không rỗng và
  khác nhau; căn cứ EN không mang chữ tiếng Việt.
- **V3-6 (dist, mở rộng)**: mỗi trang VI/EN phải chứa nguyên văn **đủ 8 ô
  căn cứ đúng ngôn ngữ** và **không lẫn ô ngôn ngữ kia** (chuẩn hóa escape
  HTML, bỏ attribute `data-phas` khỏi vùng quét để không đếm dữ liệu JSON).
- Kết quả: nguồn **29/29 ĐẠT** (27 cũ + 2 mới); dist **45/45 ĐẠT**.

### 16c. Mutation — 7/7 ĐẠT + 1 lượt chạy sạch (đếm riêng)

Thêm **MUT-7**: `canCu.en` của pha 1 bị thay bằng text VI → fail đúng V3-7
("ô lẫn VI"). Giữ nguyên 6 mutation cũ: **MUT-1..MUT-7 = 7/7 ĐẠT**, kèm 1 lượt
chạy sạch cuối exit 0 (không tính là mutation). Ghi chú: đột biến đầu tiên
thử ở tầng render (component) không được checker nguồn bắt — đã đưa về tầng
nguồn phas.json nơi rule mới trông giữ.

### 16d. Build trọn + trình duyệt + hồi quy

- `npm run build` TRỌN CHUỖI trên bản sao sạch: **exit 0**; astro check
  **0/0/0**; G06 sau vá 0 lỗi (nguồn + dist); V1 ĐẠT; V3 nguồn 29/29 + dist
  45/45 (log `build-v15-log.txt`).
- Trình duyệt 10 kịch bản: **31/31 điểm ĐẠT** — thêm điểm mới "đủ 8 căn cứ
  đúng ngôn ngữ" (DOM) ở vi/vi-tai/en: VI 8/8 ô VI, EN 8/8 ô EN; tải chủ động,
  kéo nhanh tiến/ngược (7900=7900), bàn phím (+500ms khớp), luôn paused giữ
  nguyên.
- scan-chars OK 464 tệp; hai diff-check sạch; checker G06 sau vá nguyên hash
  `b53114d6…` (không đụng bản vá G06 và bộ phép thử của nó — phép thử chạy lại
  8/8 trên checker chính thức).

### 16e. Trạng thái

Chưa stage, chưa commit, chưa push. Danh sách tệp phát hành giữ như mục 15e
(20 tệp). Dừng chờ GPT Work tái nghiệm thu.
