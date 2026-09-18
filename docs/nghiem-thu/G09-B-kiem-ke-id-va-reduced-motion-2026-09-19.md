# Biên bản G09-B chặng 1 — Kiểm kê ID pattern `guilloche` và reduced-motion Bộ thoát

- **Giao việc**: TXN-20260919-9 (danh mục DHC-G05G09-20260913); kế tục G09-A (đã commit `403a8e3`).
- **Nền**: `cbf1850` ("fix(ops): add favicon and clear diagnostics") — đã đối chiếu HEAD = origin/main trước khi làm.
- **Ngày thực hiện**: 2026-09-19.
- **Phạm vi chặng 1**: CHỈ đọc mã, build/test và tạo hồ sơ — **chưa sửa bất kỳ tệp website nào** (`src/`, `public/`, `scripts/`, `package.json`, cấu hình, checker hiện có đều nguyên vẹn — `git status`: 0 tệp M). Tệp gói chỉ gồm biên bản này + `output/g09-id-motion-audit/`.

## 0. Kết luận

**ID `guilloche`:** trùng ID là **lỗi chuẩn HTML có thật, được tái hiện và định lượng bằng parser + DOM trình duyệt** — toàn dist có **125 phần tử `id="guilloche"` + 125 tham chiếu `url(#guilloche)`** trên 68 trang; 5 trang nhiều instance (`/lich-su/` 28, `/en/history/` 28, ba thương hiệu **audemars-piguet / patek-philippe / rolex** mỗi trang 2 — khớp hồ sơ P3.2 và bổ sung phát hiện mới `/en/history/` mà P3.2 chưa có). Thử nghiệm cô lập (ngoài route xuất bản) chứng minh bằng ảnh: **mọi `url(#guilloche)` đều vẽ từ pattern ĐẦU TiÊN trong tài liệu** — va chạm tham chiếu có thật; **tác động hiển thị hiện tại = không** vì mọi pattern giống hệt nhau (trùng danh nghĩa + HTML không hợp lệ; sẽ thành lỗi vẽ sai nếu pattern phân kỳ hoặc instance đầu bị gỡ). **Reduced-motion Bộ thoát: 4/4 tình huống ĐẠT theo thiết kế** (Phát bị chặn khi reduce; Bước đổi tư thế tức thời; Phát chạy thật khi không reduce; bật reduce giữa phiên dừng chuyển động ngay; gỡ reduce không tự phát lại nhưng bấm Phát lại chạy bình thường — QUAN SÁT). Tab ẩn thật: **CHƯA KIỂM** (blocker headless). **Chưa sửa mã — chờ GPT Work duyệt phạm vi chặng 2.**

## 1. Tệp gói (chỉ tạo mới — **24 tệp**, rà bằng `git ls-files --others --exclude-standard` trên đúng hai đường dẫn G09-B)

- `docs/nghiem-thu/G09-B-kiem-ke-id-va-reduced-motion-2026-09-19.md` — biên bản này (1).
- `output/g09-id-motion-audit/` (23):
  - **Script đo/kiểm (9)**: `censu-dist-guilloche.mjs`, `dung-thu-nhieu-instance.mjs`, `rut-ket-qua-reduced-motion.mjs`, `sweep-g09-b-c1.mjs`, `pw-guilloche-ma-tran.js`, `pw-thu-nhieu-instance.js`, `pw-reduced-motion-bo-thoat.js`, `pw-chan-doan-phat.js`, `pw-t5-phat-lai.js`;
  - **Dữ liệu (3)**: `censu-guilloche.json`, `ket-qua-reduced-motion.json`, `thu-nhieu-instance.html` (trang cô lập file://);
  - **Ảnh bằng chứng (3 PNG)**: `shots/cach-lap-baseline.png`, `shots/cach-lap-todo-pattern-dau.png`, `shots/cach-lap-go-pattern-dau.png`;
  - **Log (8)**: `log-build-nen.txt`, `log-preview.txt`, `log-sweep.txt`, `log-pw-guilloche.txt`, `log-pw-cach-lap.txt`, `log-pw-reduced-motion.txt`, `log-pw-chan-doan.txt`, `log-pw-t5.txt`.

*(9 script + 3 dữ liệu + 3 PNG + 8 log = 23 trong output; cộng biên bản = **24 tệp gói**. Danh sách đủ theo `git ls-files --others --exclude-standard`, không tính untracked có trước.)*

## 2. Phần A — ID pattern `guilloche`

### 2.1. Nguồn (đọc mã, không suy từ regex cũ)

`src/components/WatchImage.astro`: dòng 74 `<pattern id="guilloche" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">` (trong `<defs>` của SVG technical plate) và dòng 85 `<rect width="200" height="200" fill="url(#guilloche)" opacity="0.05" class="guilloche-stroke" />`. Placeholder luôn render trong DOM kể cả khi ảnh thật đã tải (chỉ ẩn bằng CSS `.loaded .placeholder { display:none }` — dòng 148-150) — nghĩa là **mọi instance WatchImage đều phát một `id="guilloche"` vào tài liệu**. Không phải `data-*` — đây là ID thật trên phần tử SVG `<pattern>`.

### 2.2. Census toàn dist bằng parser (parse5 — không regex)

Kết quả đầy đủ: `censu-guilloche.json`. Số liệu: **289 tệp index.html quét** (290 trang build — trang 404 không phải index.html); **68 trang có WatchImage/guilloche**; **125 id + 125 tham chiếu** (tỉ lệ 1:1 — mỗi plate một pattern + một rect tham chiếu). Trang nhiều instance:

| Route | id | tham chiếu | WatchImage |
|---|---:|---:|---:|
| `/lich-su/` | 28 | 28 | 28 |
| `/en/history/` | 28 | 28 | 28 |
| `/thuong-hieu/audemars-piguet/` | 2 | 2 | 2 |
| `/thuong-hieu/patek-philippe/` | 2 | 2 | 2 |
| `/thuong-hieu/rolex/` | 2 | 2 | 2 |

Khớp hồ sơ P3.2 (LO-TRINH dòng 97: `/lich-su/` 28 + 3 thương hiệu × 2) **và bổ sung phát hiện mới: `/en/history/` 28 lần** — P3.2 đo trước English launch nên chưa có. 63 trang còn lại có đúng 1 instance (trang đối chứng đã dùng: `/thuong-hieu/breguet/`).

### 2.3. Ma trận DOM trình duyệt (playwright — `log-pw-guilloche.txt`)

Với mỗi trang: `document.querySelectorAll('#guilloche').length`, số `[fill="url(#guilloche)"]`, số `figure.watch-image`, kết quả `document.getElementById('guilloche')` và thứ tự DOM:

| Trang | id | ref | WatchImage | getElementById trả về | thứ tự DOM (theo WatchImage) |
|---|---:|---:|---:|---|---|
| `/lich-su/` | 28 | 28 | 28 | **instance thứ 0 (WatchImage thứ 1)** | 1…28 |
| `/en/history/` | 28 | 28 | 28 | **instance thứ 0** | 1…28 |
| `/thuong-hieu/audemars-piguet/` | 2 | 2 | 2 | **instance thứ 0** | 1, 2 |
| `/thuong-hieu/patek-philippe/` | 2 | 2 | 2 | **instance thứ 0** | 1, 2 |
| `/thuong-hieu/rolex/` | 2 | 2 | 2 | **instance thứ 0** | 1, 2 |
| `/thuong-hieu/breguet/` (đối chứng) | 1 | 1 | 1 | instance thứ 0 (duy nhất) | 1 |

(`mau-iconic/rolex-submariner` được thử trước làm đối chứng nhưng không có WatchImage nào — đã thay bằng breguet theo census.)

### 2.4. Thử nghiệm nhiều instance cô lập (ngoài route xuất bản — file://, không tạo route)

`dung-thu-nhieu-instance.mjs` tách SVG placeholder thật từ `dist/lich-su/index.html`, dựng `thu-nhieu-instance.html` với 3 instance cùng id: **C** (pattern "phân kỳ" — nét `#16323b`, đặt **ĐẦU tài liệu**) + **A, B** (bản sao sản phẩm — `currentColor`, CSS màu hợp kim). Kết quả (`log-pw-cach-lap.txt` + 3 ảnh `shots/`):

1. `getElementById('guilloche')` → **phần tử thứ 0 (C)** — đúng đặc tả HTML (ID trùng: trả về phần tử đầu).
2. **Probe phóng đại**: tô đỏ + nét dày 8 cho pattern ĐẦU (C) → ảnh `cach-lap-todo-pattern-dau.png` cho thấy **cả ba plate cùng hiện lưới đỏ** — A và B vẽ từ pattern của C, không phải pattern của mình. **Va chạm tham chiếu là có thật, chứng minh bằng ảnh.**
3. Gỡ SVG chứa pattern đầu → 2 id còn lại, tham chiếu giảm 3 → 2 (bản sao chép `log-pw-cach-lap.txt`).
4. **Tác động hiển thị hiện tại = KHÔNG**: trên production mọi pattern giống hệt nhau (cùng markup, màu qua cùng CSS `.watch-image .guilloche-stroke`) nên vẽ từ instance đầu hay từ mình là như nhau. Nhưng: HTML không hợp lệ (ID trùng), và nếu pattern phân kỳ (ai đó đổi mẫu cho một plate) hoặc instance đầu bị gỡ/đổi, mọi plate sau sẽ vẽ sai/không có hoa văn.

### 2.5. Đề xuất sửa tối thiểu (CHƯA áp dụng — chờ duyệt)

- **Tệp dự kiến: duy nhất `src/components/WatchImage.astro`** (không đụng layout/content).
- **Cơ chế ID duy nhất ổn định**: đặt `const maPattern = 'guilloche-' + (src ? hash-ngắn-của-src : hash-ngắn-của-alt + '-' + chỉ-số-ổn-định)` — hash thuần từ props (không random per-render để giữ dist ổn định giữa hai lần build); `<pattern id={maPattern}` + `fill={`url(#${maPattern})`}`. Phương án dự phòng nếu tránh hash: `useId()`-style từ Astro — cần kiểm tính ổn định build-sang-build trước khi chốt.
- **Hồi quy chặng 2**: census parser chạy lại = 0 id trùng trên toàn dist (125 → 125 id duy nhất); ma trận DOM: `getElementById` của từng plate trỏ đúng pattern của plate đó; ảnh sáng/tối cả plate nhiều instance (`/lich-su/`, 1 trang thương hiệu 2 instance, 1 trang 1 instance); VI/EN.
- **Mutation cần có**: (m1) ép hai plate dùng cùng id cứng → check census phải fail "trùng id"; (m2) xóa khai báo pattern một plate → check phải fail "fill tham chiếu id không tồn tại".

## 3. Phần B — Reduced-motion infographic Bộ thoát

**Đối tượng**: `Escapement.astro` (trong wrapper `MechanismAnimation` với `reduceInteractive={true}`) trên `/co-che/bo-thoat/` + `/en/mechanisms/escapement/`. **Không trộn** kết quả MechanismAnimation-chronograph của G06-C — mọi số dưới đây đo trên Bộ thoát; không có bằng chứng hồi quy nào ghi nhận.
**Đo trực tiếp**: góc rotate trong `style.transform` của `#balance-group` (phần tử SVG quay thật; `Escapement.astro` dòng 471 gán qua `guidedApi.apply`), lấy mẫu 100 ms — không chụp ảnh toàn trang, không suy từ CSS của step-bar.
**Công cụ**: playwright-cli — HeadlessChrome/152 (Win64), viewport 1440×900, `emulateMedia({ reducedMotion })`; cửa sổ quan sát T1 2,2 s / T2 6,2 s / T3 3,4+4,2 s / T4 4,2 s. JSON tổng hợp: `ket-qua-reduced-motion.json`; log thô: `log-pw-reduced-motion.txt`, `log-pw-t5.txt`, `log-pw-chan-doan.txt`.

| Ca | Tình huống | Kết quả đo (VI + EN) | Phân loại |
|---|---|---|---|
| T1 | Reduce bật **trước tải** → bấm Phát rồi Bước sau | Phát **bị chặn** (nhãn nút không đổi "Phát hoạt ảnh"/"Play animation"; 21 mẫu/2,2 s chỉ 1 góc −24 — không chuyển động); Bước sau đổi tư thế **tức thời** −24 → −10 (không trượt 300 ms) | **ĐẠT** (đúng thiết kế reduceInteractive) |
| T2 | Không reduce → bấm Phát | Hoạt ảnh **chạy thật**: 60 mẫu/6,2 s có 3 góc riêng biệt [−24, −10, −1] | **ĐẠT** |
| T3 | Đang Phát → **bật reduce giữa phiên** | Chuyển động **dừng ngay**: trước 2 góc [−24, −10]; sau bật 4,2 s chỉ 1 góc [−10] | **ĐẠT** |
| T4 | **Gỡ reduce** giữa phiên | **Không tự phát lại** (1 góc trong 4,2 s) — phát đã hủy khi bật reduce; an toàn, không kẹt | **QUAN SÁT** (hành vi chủ đích) |
| T5 | Gỡ reduce rồi **bấm Phát lại** | Chạy lại bình thường (3 góc [−24, −10, −1] cả VI/EN) | **ĐẠT** |
| — | **Tab ẩn thật** | **CHƯA KIỂM** — headless không lật `document.hidden` đáng tin (blocker như G06-C2); chưa có môi trường headed ổn định; không thay bằng mô phỏng | **CHƯA KIỂM** |

Ghi chú đo: lần đo đầu T2 dùng cửa sổ 2,6 s và thấy "không chuyển động" — chẩn đoán (`log-pw-chan-doan.txt`) cho thấy bước nhảy đầu tiên xảy ra sau ~2,5–3 s nên đã kéo dài cửa sổ (mốc thời gian từng bước ~2–3 s/lần); dữ liệu cuối cùng trong `ket-qua-reduced-motion.json`. Selector thông báo reduce của tôi không bắt được phần tử thông báo (`null`) — việc chặn Phát được chứng minh bằng nhãn nút + dữ liệu chuyển động, không phụ thuộc thông báo.

## 4. Phân loại tổng hợp + cổng chặng 2

| # | Phát hiện | Phân loại |
|---|---|---|
| 1 | Trùng ID `guilloche` nhiều instance (125 id/68 trang; 5 trang ≥2) — vi phạm chuẩn HTML | **KHÔNG ĐẠT** (chuẩn) |
| 2 | Tác động hiển thị hiện tại của trùng ID | **ĐẠT** (không — mọi pattern giống hệt; bằng chứng DOM + ảnh cô lập) |
| 3 | Va chạm tham chiếu khi pattern phân kỳ/instance đầu gỡ | **KHÔNG ĐẠT** (cấu trúc — ảnh cô lập) |
| 4 | Reduced-motion T1/T2/T3/T5 Bộ thoát VI/EN | **ĐẠT** |
| 5 | Gỡ reduce không tự phát lại (T4) | **QUAN SÁT-GIỚI HẠN** (chủ đích, cần GPT Work xác nhận chấp nhận hành vi) |
| 6 | Tab ẩn thật + media query HĐH thật | **CHƯA KIỂM** |

**Nếu GPT Work duyệt sửa ID (chặng 2):** tệp dự kiến chỉ `src/components/WatchImage.astro` + checker mới (vd `scripts/check-g09-id-unique.mjs` nối `npm run check` — cần GPT Work cho phép sửa `package.json`); kiểm bắt buộc: census 0 trùng id toàn dist, `url(#)` trỏ đúng instance (ma trận DOM 5 trang ≥2 instance + đối chứng), ảnh plate sáng/tối VI/EN, mutation m1/m2 nêu mục 2.5.
**Nếu reduced-motion cần sửa:** hiện KHÔNG có lỗi chuyển động nào được chứng minh — chỉ có mục 5 (T4) cần quyết định chấp nhận hành vi; nếu GPT Work yêu cầu "gỡ reduce tự tiếp tục phát" thì chặng 2 kiểm thêm: reduce trước tải, đổi giữa phiên, Phát/Bước/Đặt lại, bàn phím, hai ngôn ngữ (như mục 3).

## 5. Tự kiểm tối thiểu

1. Build nền `npm run build` **exit 0** (astro check **0 errors / 0 warnings / 0 hints** — dẫn `log-build-nen.txt` dòng `- 0 hints`; **không** gọi 4 hints là baseline vì G09-A đã gỡ hết hints và commit tại `cbf1850`; 290 trang / 21.444 link 0 hỏng).
2. Mọi script hồ sơ chạy lại được (đã chạy ít nhất một lần thành công); 2 JSON (`censu-guilloche.json`, `ket-qua-reduced-motion.json`) **parse hợp lệ**.
3. Whitespace/EOF sạch trong tệp gói (`log-sweep.txt` TONG_LOI=0); `git diff --check` **sạch**.
4. Gói không chứa untracked có trước; `git status`: 0 tệp M, 0 staged.
5. Chặng 1 **chưa sửa website**; **chưa mở G09-C**; **G09 chưa hoàn tất**.

## 6. Điểm dừng

~~**G09-B chặng 1 xong kiểm kê — chờ GPT Work duyệt phạm vi sửa; chưa commit/push/deploy; chưa mở G09-C.**~~ *(Bị trả lại tại vòng sửa 1 — bốn lỗi tái tạo được; xem mục 7.)*

---

## 7. Vòng sửa 1 (TXN-20260919-12, ngày 19/09/2026) — sửa hồ sơ và công cụ, ĐÃ ĐẠT

**Bốn lỗi GPT Work có bằng chứng (tái tạo được):** (1) biên bản ghi diagnostics `0/0/4 hints nền` trong khi `log-build-nen.txt` cùng gói ghi `- 0 hints` — 4 hints đã được G09-A gỡ hết trước khi commit `cbf1850`; (2) biên bản khai 12 tệp, thực tế 24; (3) census ghi route Windows `/en\history/` thay vì URL chuẩn; (4) chạy lại census làm `censu-guilloche.json` thiếu newline cuối, sweep trả TONG_LOI=1.

### 7.1. Đã sửa

1. **Diagnostics** (mục 5.1): `0/0/4 hints nền` → **0 errors / 0 warnings / 0 hints**, dẫn `log-build-nen.txt` dòng 277 `- 0 hints`; ghi rõ không gọi 4 hints là baseline sau commit G09-A.
2. **Số tệp gói** (mục 1): 12 → **24 tệp**, rà bằng `git ls-files --others --exclude-standard` đúng hai đường dẫn G09-B (1 biên bản + 23 output: 9 script + 3 dữ liệu + 3 PNG + 8 log); không tính untracked có trước.
3. **`censu-dist-guilloche.mjs`**: chuẩn hóa separator về `/` TRƯỚC khi tạo route (`p.split(/[\\/]+/).join('/')`) — route chuẩn URL trên Windows lẫn môi trường khác; và `writeFileSync(... + '\n')` — **luôn đúng một newline cuối JSON**.
4. **Tái tạo**: chạy lại census (không sửa tay JSON): 289 trang · 68 trang có guilloche · **125 ID · 125 tham chiếu** · 5 trang nhiều instance với route chuẩn `/lich-su/`, `/en/history/`, `/thuong-hieu/audemars-piguet/`, `/thuong-hieu/patek-philippe/`, `/thuong-hieu/rolex/`; chạy ngay `sweep-g09-b-c1.mjs` → **TONG_LOI=0** ngay sau tái tạo.

### 7.2. Kiểm lại bắt buộc

| Kiểm | Kết quả |
|---|---|
| Census tái chạy | **289 trang · 68 trang có guilloche · 125 ID · 125 tham chiếu · 5 trang nhiều instance — route chuẩn slash** (censu-guilloche.json tái tạo) |
| Hai JSON hợp lệ | `censu-guilloche.json` + `ket-qua-reduced-motion.json` parse OK; newline cuối đúng 1 |
| Sweep toàn gói | **TONG_LOI=0** ngay sau tái tạo (log-sweep.txt) |
| `git diff --check` | **sạch** |
| Kết luận kỹ thuật | **Giữ nguyên**: ID trùng là lỗi cấu trúc đã xác nhận; reduced-motion T1/T2/T3/T5 đạt; T4 là quan sát; tab ẩn thật chưa kiểm |

Đây là **sửa hồ sơ/tái tạo công cụ** — mã website không đổi nên **không build lại, không chạy lại trình duyệt**.

### 7.3. Điểm dừng vòng sửa 1

**G09-B chặng 1 sửa hồ sơ xong — chờ GPT Work tái nghiệm thu; chưa commit/push/deploy; chưa mở G09-C.** HEAD = origin/main = `cbf1850`.
