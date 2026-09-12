# G04-B — Chương mẫu "Bánh lắc và dây tóc" song ngữ

- Giao dịch: TXN-20260912-21 (làm lần đầu) + TXN-20260912-23 (vòng sửa sau nghiệm thu lần 1) + TXN-20260912-25 (vòng sửa màu SVG sau tái nghiệm thu) · Danh mục DHC-NEXT-20260912 v1.0.0
- Thực hiện: GLM thực thi · Ngày: 12/09/2026 · Nền: `234fa26` (main; tracked working tree chỉ có sửa đổi thuộc gói này)
- Phạm vi: chương mẫu trên **đúng hai route hiện có** — `/co-che/day-toc-banh-lac/` và `/en/mechanisms/balance-and-hairspring/`. Không tạo route mới, không commit, không push, không deploy.

## 0-bis. Vòng sửa màu SVG TXN-20260912-25

Bốn phát hiện của GPT Work ở vòng trước đã được kiểm và chấp nhận (hình học, bộ đếm, cờ EN, phương pháp đo mạng) — không viết lại. Lỗi còn lại: bốn vị trí trong component dùng `fill:var(--ig-steel-deep)` — token **không được khai báo** trong global.css → fill rơi về màu mặc định `rgb(0,0,0)` trên nền tối `rgb(32,39,45)` (dòng 303, 304, 319, 325 thời điểm giao việc: đầu vít giá đỡ, khối ghim điểm gắn, trục bánh lắc, collet).

Xử lý (chỉ sửa component chương, không đụng hệ màu site):
- Thay 4 fill bằng token **`--ig-steel` đã tồn tại** (sáng #4A5568 / tối #8C99A6 — khai báo đủ hai theme trong global.css) và **bổ sung viền halo 2px màu nền SVG `--ig-bg`** cho từng phần tử — viền tách rõ khỏi bộ phận liền kề (đầu vít + khối ghim nằm trên cánh tay giá đỡ `--ig-edge`; trục nằm trên nan hoa `--ig-steel-soft`; collet nằm cạnh trục).
- **Màu tính toán thực tế** (getComputedStyle, cả hai theme, cả VI/EN — `mau-svg-ket-qua.json`): sáng fill = rgb(74, 85, 104), tương phản với nền SVG rgb(250, 247, 242) = **7,04:1**; tối fill = rgb(140, 153, 166), tương phản với nền rgb(32, 39, 45) = **5,2:1** — đều ≥ 3:1; cả bốn phần tử đều có stroke halo ≠ none/≠ màu fill. Không còn fill rgb(0,0,0).
- **Rà toàn bộ biến CSS** component dùng: 8 token (`--obs-brass`, `--ig-steel`, `--ig-bg`, `--ig-text`, `--ig-stroke-soft`, `--ig-edge`, `--ig-steel-soft`, `--ig-rubi`) — **0 thiếu**. Thêm **G4-9** vào `check-g04` (lớp nguồn): quét mọi `var(--…)` trong component, phải được khai báo trong global.css; tự kiểm bằng cách tiêm lại `--ig-steel-deep` vào 4 chỗ → missing → G4-9 FAIL (bắt được lỗi).
- **Ảnh kiểm riêng vùng SVG** (cuộn hình vào viewport, chụp đúng `svg.bhc-svg`): VI/EN × 320/1440 × sáng/tối = 8 ảnh `shots/svg-*.png` — đã mở xem: điểm gắn, đầu vít, trục, collet rõ ở cả hai theme, tách khỏi cánh tay/nan hoa nhờ viền halo.
- Hành vi không đổi: Phát chạy (2 mẫu transform khác nhau), Bước hữu hạn, Tĩnh về góc gốc, Đặt lại về "dao động thứ 1" (`thu-nhanh-hanh-vi-ket-qua.json`).
- Build toàn chuỗi sau sửa: **exit 0 — 286 trang, 20.630 link, astro check 210 tệp 0 lỗi/0 cảnh báo/4 hints nguyên baseline**.
- Số đo mạng lượt SAU được **đo lại** sau vòng màu (HTML +120 byte/route do thuộc tính stroke): VI 10 request/304.819 B, EN 10/299.343 B; CSS 111.059, JS 32.605, ảnh 87.456 không đổi (`do-mang-sau-loi-mau-ket-qua.json`; số 304.699/299.223 trước vòng màu thuộc phiên bản trước, đã cập nhật vào `do-mang-truoc-sau-ket-qua.json`).

## 0. Vòng sửa TXN-20260912-23 — bốn phát hiện của GPT Work và cách xử lý

| Phát hiện GPT Work | Xử lý của vòng sửa | Kết quả kiểm |
| --- | --- | --- |
| Đầu ngoài dây tóc trôi khỏi điểm gắn (công thức cũ: số vòng `5 + 0,75·sin(2πp)` làm góc cuối đổi theo pha; GPT Work đo được (385,1; 149,9) → (320; 307) → (254,9; 149,9)) | Đổi mô hình thành **hai đầu ghim**: độ quét = `A_STUD − phi + 2π·N_COILS` với `N_COILS = 5` **nguyên** (đầu = `phi + độ quét ≡ A_STUD` mọi pha); hiệu ứng co/giãn chuyển sang **phối lại vòng xoắn ở giữa** bằng `WIND_K·w·sin(pi·t)` với `sin(pi·t)` triệt tiêu tại cả hai đầu (`g(0)=g(1)=0`). Path tĩnh không-JS **không phải đổi** — công thức mới tại p=0 cho đúng chuỗi cũ (đối chứng bằng `kiem-cong-thuc.py`) | `pw-hinh-hoc-day-toc.js`: 24 pha (2 chu kỳ bằng Bước) + 3 mẫu khi Phát — **lệch điểm gắn = 0 px tuyệt đối**; đầu path khớp collet (phần quay) mọi pha; bán kính tăng đơn điệu, bước góc lớn nhất 28,6°, không đoạn gãy; công thức cũ dự báo trôi **183,2 px** → ca hồi quy này bắt được nó |
| Nút Tĩnh mất bộ đếm sau Phát (play tăng `phase` liên tục, chỉ Bước gói phần tròn vào `oscBase`; Tĩnh đặt `phase=0` làm mất dao động tích lũy) | Thống nhất: **vòng lặp Phát gói phần tròn vào `oscBase` mỗi khung** (`oscBase += Math.floor(phase); phase %= 1`); `phase` luôn thuộc [0,1). Tĩnh = về tư thế đầu, **giữ nguyên `oscBase`**; Đặt lại = về trạng thái khởi tạo (`oscBase = 0`) | `pw-bo-dem-tinh.js`: Phát 9 giây (2,25 chu kỳ) → Tạm dừng "dao động thứ 3" → Tĩnh **vẫn "thứ 3"** + tư thế đầu; Phát → Bước (tự tạm dừng, hữu hạn); 26 bước → "thứ 5" → Tĩnh giữ "thứ 5" → Phát tiếp từ "thứ 5"; Đặt lại → "dao động thứ 1". Quy ước ghi rõ: **"dao động thứ n" = đang ở lần thứ n (đã hoàn thành n−1); "dao động thứ 1" = đã hoàn thành 0** |
| Bằng chứng mạng không so sánh được (baseline nhiều 304/byte null; JS đổi 6.700 → 9.838 byte); kết luận "chỉ tăng một ảnh" vô căn cứ | Bác kết luận cũ. Dựng lại **nền 234fa26 trong worktree cô lập** (`D:\dhc-nen-234fa26`, node_modules junction, `npm run build` exit 0 — 286 trang/20.622 link khớp mốc), đo lại **TRƯỚC/SAU cùng phương pháp**: context mới cache rỗng, viewport 1280×900, networkidle, byte = thân response giải mã, header content-length ghi riêng, byte không lấy được ghi null (không coi là 0), request lỗi ghi riêng | Số thật (VI / EN): **HTML 78.599 → 73.579 (−5.020) / 53.012 → 68.103 (+15.091)**; **CSS 110.295 → 111.059 (+764) cả hai**; **JS 29.420 → 32.605 (+3.185) cả hai**; **ảnh 0 → 87.456 (+87.456) cả hai**; request local 9 → 10 (thêm đúng 1 ảnh). Tổng thêm: VI +86.385 B, EN +106.551 B. Ngoài site: Google Fonts (VI 15 response, EN 7) xuất hiện ở cả hai pha; `/_vercel/insights/script.js` **404** trên preview ở cả hai pha. Kết luận cũ "thay đổi duy nhất +1 ảnh" **đã loại bỏ** |
| Cờ EN cần phản ánh tính năng thật | Theo **quyết định của GPT Work**: `has_infographic: true` + `interactive: true` cho DUY NHẤT `src/content/coChe/en/balance-and-hairspring.md`; nới **R1 của `scripts/check-regulating-cluster.mjs` hẹp đúng tệp này** (bảng `FLAG_TRUE_FILES` + regex cờ theo tệp), các bài EN khác vẫn yêu cầu false, không bỏ kiểm cờ, không miễn nguyên R1. Chương render qua nhánh riêng nên infographic cũ EN vẫn không bật (Infographic = null do `!hasBalanceChapter`) | Hồi quy `kiem-hoi-quy-r1.mjs` (biến đổi tạm + khôi phục, 5 ca): nguyên trạng PASS; đích `has_infographic: false` → bị bắt; đích `interactive: false` → bị bắt; escapement `interactive: true` → bị bắt; escapement `has_infographic: true` → bị bắt; khôi phục xong checker PASS. **5/5 ĐẠT** |

Ghi chú vòng đời (cùng vòng sửa): `pagehide` trước đây gỡ listener/observer — nếu trình duyệt phục hồi trang từ bfcache thì mất cơ chế dừng. Đổi thành: `pagehide` chỉ **dừng vòng lặp + đóng băng**, giữ listener (trang tĩnh sống chết cùng tài liệu, không rò rỉ); thêm `pageshow` đồng bộ lại UI. Thử `pw-vong-doi-trang.js`: điều hướng đi rồi `goBack` thật → điều khiển còn, Phát chạy được; **mô phỏng sự kiện** ẩn tab (defineProperty `document.hidden` + phát `visibilitychange` — KHÔNG phải chuyển tab thật) sau khi quay lại → vẫn dừng đúng; **mô phỏng** `pageshow persisted=true` → UI đồng bộ. Alt ảnh đổi theo màu nhìn thấy: VI "Bánh lắc màu đồng và dây tóc xoắn màu bạc nổi trên nền bàn chế tác mờ — minh họa AI tái dựng", EN "A gold-coloured balance wheel and a silver-coloured coiled hairspring against a softly blurred workbench — AI reconstruction" (không suy vật liệu). CLS chỉ được nêu là **quan sát trong điều kiện thử** (các phép đo lần này ghi được 0,0105–0,1032 tùy ô, do thời điểm nạp Google Fonts; ảnh có width/height nên phần ảnh không góp shift) — không tuyên bố CLS=0 phổ quát.

## 1. Kết quả sau vòng sửa

- `npm run build` (26 lệnh kiểm + `check:types` + astro build + 6 kiểm sau build, gồm check-g01, check-g02 dist, check-g04 dist): **exit 0**.
- Trang: **286 HTML — không tạo route mới**. Link: **20.630, 0 hỏng** (nền `234fa26` 20.622 → +8 khép kín: VI +2 link nội bộ (từ điển, /lich-su) + 2 nguồn ngoài (FHH, SMG); EN +2 link nội bộ (glossary hairspring, beat-rate) + 2 nguồn ngoài (FHH, SMG)).
- Astro check (build sau vòng sửa màu): **210 tệp: 0 lỗi / 0 cảnh báo / 4 hints** — 4 hints là ts(6133) từ tệp công cụ P3.1–P3.3 đã commit (nguyên trạng baseline; số tệp tăng do các script kiểm `output/` của gói được quét thêm, không sinh hint mới — 2 hint phát sinh tạm từ script của gói đã được gỡ biến trước khi chốt).
- G01 63/63, G02 16/16, toàn bộ cụm khác giữ ĐẠT (log: `output/g04-balance-chapter/log-build-g04b.txt`).

## 2. Manifest — tách đúng nguồn gốc (gồm cả hồ sơ quyết định hướng)

### 2a. Hồ sơ quyết định + tài sản G04-A có trước — GPT Work tạo, GLM không đụng nội dung

| Tệp | Ghi chú |
| --- | --- |
| `docs/nghiem-thu/G04-quyet-dinh-huong-ket-hop-va-prompt-G04-B-2026-09-12.md` | hồ sơ quyết định hướng A+B + prompt giao G04-B (GPT Work) |
| `docs/nghiem-thu/G04-A-thiet-ke-banh-lac-day-toc-2026-09-12.md` | hồ sơ thiết kế G04-A (GLM soạn ban đầu) — **được GLM bổ sung khối "CẬP NHẬT HIỆN HÀNH"** ở đầu, mục 8 giữ nguyên làm vết lịch sử thiếu công cụ |
| `output/g04-banh-lac-day-toc-design/drafts/huong-a.png` (1.524.582 B), `huong-b.png` (2.100.583 B), `huong-c.png` (1.852.048 B), `huong-ab-v1.png` (1.741.517 B) | bốn PNG gốc — **bảo toàn nguyên trạng**, chỉ `huong-ab-v1.png` được GLM **đọc** để tạo bản web |
| `output/g04-banh-lac-day-toc-design/prompt-ba-huong.md` | GLM soạn ban đầu — **được GLM thêm dòng cập nhật hiện hành** (có ảnh, đã chọn A+B) |
| `output/g04-banh-lac-day-toc-design/drafts/README.txt` | GLM soạn ban đầu — **được GLM bổ sung** trạng thái mới + manifest ảnh + quyền/giới hạn |
| `output/g04-banh-lac-day-toc-design/drafts/prompt-thuc-te-2026-09-12.md` | GPT Work tạo — **được GLM thêm khối cập nhật** (ảnh kết hợp, thông số bản web, quyền dùng) |

### 2b. G04-B do GLM sửa (tracked có trước)

| Tệp | Sửa gì |
| --- | --- |
| `src/components/templates/MechanismArticle.astro` | import chương + hằng `G04_BALANCE_CHAPTER_SLUGS` (đúng 2 slug) + gate `!hasBalanceChapter` cho infographic cũ + render `<BalanceHairspringChapter />` |
| `src/content/coChe/vi/day-toc-banh-lac.md` | bỏ khối giới thiệu lặp; `updated` → 2026-09-12; `has_infographic: true`, `interactive: true` giữ nguyên |
| `src/content/coChe/en/balance-and-hairspring.md` | **hai cờ → true theo quyết định GPT Work (TXN-20260912-23)**; `updated` → 2026-09-12 |
| `scripts/check-regulating-cluster.mjs` | **nới R1 hẹp đúng 1 tệp** (quyền bổ sung theo phản hồi TXN-20260912-23): `FLAG_TRUE_FILES` + regex cờ theo tệp + dòng report đổi "false-flags" → "cờ theo quy tắc từng tệp"; các quy tắc R2–R7 và các bài EN khác không đụng |
| `package.json` | thêm `check:g04`; nối `node scripts/check-g04-balance-chapter.mjs` cuối chuỗi `check` và `… dist` cuối chuỗi `build` |

### 2c. G04-B do GLM tạo mới (tracked + khu vực bằng chứng)

| Tệp | Nội dung |
| --- | --- |
| `src/components/history/BalanceHairspringChapter.astro` | component chương (mục 3) — duy nhất một tệp mới trong `src/`; không cần helper/style thêm |
| `scripts/check-g04-balance-chapter.mjs` | kiểm G04: G4-1…G4-9 (nguồn + dist; G4-9 hồi quy token var(--…) thiếu khai báo — vòng màu TXN-20260912-25) |
| `public/images/history/balance-hairspring/banh-lac-day-toc-hero.jpg` | bản web ảnh chủ đạo — 1200×675, JPEG quality 84, **87.456 byte ≤ 150 KB** |
| `docs/nghiem-thu/G04-B-chuong-banh-lac-day-toc-2026-09-12.md` | biên bản này |
| `output/g04-balance-chapter/` (41 tệp + thư mục `shots/` 15 ảnh) | script kiểm + log UTF-8 + JSON kết quả + ảnh chụp — mục 7 |

## 3. Thiết kế đã triển khai (đối chiếu storyboard G04-A 6 cảnh)

1. **Ảnh AI chủ đạo duy nhất (cảnh 1/3)** — một ảnh A+B: desktop chữ trái (5 cột) – ảnh phải (7 cột); mobile chữ trên, ảnh dưới full-rộng giữ trọn khung 16:9 (không crop). Tiêu đề hỏi mở đầu + chú thích là HTML dịch được, nằm ngoài ảnh. Chú thích bắt buộc: "Minh họa AI tái dựng — không phải ảnh tư liệu" / "AI reconstruction — not a historical photograph". Alt mô tả **màu nhìn thấy** (đồng/bạc), không suy vật liệu (mục 0).
2. **Bối cảnh lịch sử gọn (cảnh 2)** — hai mốc đúng số liệu G02: 1657 (Huygens áp dụng con lắc vào đồng hồ — FHH History) và 1675 (dây tóc xoắn áp dụng lên bánh lắc đồng hồ bỏ túi; phút được chỉ báo đáng tin cậy — SMG Tompion co33); nhãn giai đoạn "1657–1675"; giới hạn Hooke ("strongly contested" — SMG); câu phạm vi "không có nghĩa là … thay thế con lắc tức thì, hay phổ cập toàn ngành ngay sau đó" / EN tương đương. Biểu tượng con lắc → bánh lắc–dây tóc là SVG trang trí aria-hidden.
3. **SVG nguyên lý riêng (cảnh 4)** — bánh lắc (vành + nan + vít + chấm đồng đánh dấu góc), dây tóc xoắn, điểm gắn cố định (giá đỡ balance-cock đứng yên) và phần chuyển động. **Mô hình hai đầu ghim** (mục 0): đầu ngoài LUÔN tại góc −45° mọi pha; đầu trong quay cùng bánh lắc; vòng giữa phối lại theo pha (sin(pi·t) triệt tiêu tại hai đầu) — không scale toàn lò xo, không suy cấu tạo từ ảnh AI. Nguồn dựng hình: bài VI/EN + FHH. Path tĩnh không-JS = công thức tại p=0 (chuỗi tính sẵn, đối chứng `kiem-cong-thuc.py`). Nhãn VI/EN trong SVG (ẩn dưới 640px — tên bộ phận luôn có ở legend HTML 4 mục). SVG `aria-hidden="true"`, không id, không url(#). Ghi chú bắt buộc: "mô hình giản lược minh họa nguyên lý — không phải phép đo và không phải cơ cấu theo tỷ lệ" / EN.
4. **Một dao động = hai lần rung (cảnh 5)** — trạng thái đếm "dao động thứ n · lần rung x/2" theo quy ước mục 0; caption "Một dao động đầy đủ gồm hai lần rung…". Không thêm VPH/vật liệu/độ chính xác/xếp hạng vào chương.
5. **Điều khiển** — Tĩnh / Phát / Tạm dừng / Bước / Đặt lại (EN: Static / Play / Pause / Step / Reset), khởi tạo **tĩnh**. Bước tiến đúng 1/12 dao động (12 bước = tròn một dao động); đang phát thì tự tạm dừng trước. **Tĩnh**: tư thế đầu + giữ đếm đang hiển thị; **Đặt lại**: về "dao động thứ 1" (đã hoàn thành 0) + tư thế đầu. Trạng thái `role="status" aria-live="polite"`; nút ≥44px, focus-visible rõ.
6. **Reduced-motion + vòng đời** — RM bật trước tải: Phát không chạy, hiện ghi chú khuyên dùng Bước; Bước vẫn tiến. RM bật giữa phiên khi đang phát: dừng thật. Rời viewport: dừng + ghi chú, quay lại không tự phát. `pagehide` dừng vòng lặp + đóng băng (không gỡ listener — phục hồi bfcache vẫn còn đủ cơ chế); `pageshow` đồng bộ lại (mục 0). Một vòng rAF duy nhất, hủy khi dừng.
7. **Nguồn, giới hạn, đọc tiếp** — nguồn lịch sử dẫn trực tiếp FHH History + SMG (rel="noopener noreferrer" target="_blank"); đọc tiếp VI: `/tu-dien/day-toc-banh-lac` + `/lich-su`; EN: `/en/glossary/hairspring` + `/en/glossary/beat-rate` — route thật theo ngôn ngữ, không tạo trang lịch sử EN giả (check G4-7 chặn `/lich-su` trong trang EN). Nội dung đọc được khi JS tắt (SVG tĩnh giữ path) và khi ảnh lỗi (ảnh ẩn, khối dự phòng hiện, chú thích còn).

## 4. Nguồn từng claim trong chương

| Claim | Nguồn | Ghi trong |
| --- | --- | --- |
| Huygens áp dụng con lắc vào đồng hồ (1657) | FHH — History: "Christiaan Huygens adapts the pendulum to the clock" | timeline.json mốc `huygens-hairspring`; chương thẻ 1657 |
| Dây tóc xoắn áp dụng lên bánh lắc; phút chỉ báo đáng tin cậy (1675) | Science Museum Group — Tompion co33: "applied the spiral spring to the balance of a watch… Minutes were now able to be reliably indicated" | timeline.json; chương thẻ 1675 |
| Quyền phát minh bị Hooke tranh chấp | SMG co33: "Robert Hooke strongly contested Huygens' claim" | timeline.json limit; chương khối giới hạn |
| Bộ điều tiết chia thời gian thành phần bằng nhau; oscillation = 2 vibrations; chu kỳ do chiều dài dây tóc + quán tính bánh lắc | FHH — Balance / Balance spring (3 link frontmatter cả 2 bài) | legend + caption chương |
| Ảnh AI tái dựng bối cảnh | Image Generation của GPT Work theo prompt trong hồ sơ quyết định — **không phải nguồn lịch sử** | nhãn bắt buộc trên ảnh |

## 5. Cách ghép ảnh

Pillow 12.2.0 (`output/g04-balance-chapter/tao-anh-web.py`): `huong-ab-v1.png` (1672×941) → RGB → resize LANCZOS 1200×675 (không crop) → JPEG progressive quality 84 → 87.456 byte (bảng thử: `manifest-anh-web.json`). Không tạo ảnh AI mới, không dùng 3 ảnh rời, không chỉnh nội dung ảnh.

## 6. Kết quả từng tiêu chí (bằng chứng `output/g04-balance-chapter/`, mọi phép chạy lại trên dist build cuối)

- **(a) Baseline** — nền `234fa26` dựng lại trong **worktree cô lập** `D:\dhc-nen-234fa26` (node_modules junction, không đụng working tree/dist chính): `npm run build` exit 0 — **286 trang, 20.622 link** (`log-build-nen-worktree.txt`, `log-preview-nen.txt`) — khớp log nền G03. Phép đo mạng vòng 1 (`baseline-mang-ket-qua.json`, `coldload-sau-ket-qua.json`) **giữ làm vết nhưng vô hiệu so sánh** (cache 304/null ≠ cold-load) — thay bằng phép đo mục (i).
- **(b) Build + checker** — mục 1: exit 0; G01/G02/cụm giữ ĐẠT; route giữ nguyên; +8 link khép kín; diagnostics nguyên baseline.
- **(c) Kiểm G04 tĩnh + hồi quy R1** — check-g04 nguồn + dist toàn ĐẠT (chương chỉ ở 2 trang đích; infographic cũ rời 2 trang, **còn nguyên ở `/tu-dien/day-toc-banh-lac`**; EN không rò chữ VI hiển thị, 6 nút thuần tiếng Anh; khởi tạo tĩnh trong HTML tĩnh); R1 nới hẹp đúng 1 tệp với **5/5 ca hồi quy ĐẠT** (`kiem-hoi-quy-r1.mjs`, `log-hoi-quy-r1.txt`); **G4-9** (vòng màu): 8 token var(--…) của component đều khai báo trong global.css — tiêm lại `--ig-steel-deep` 4 chỗ → G4-9 FAIL (bắt được).
- **(d) Ma trận trình duyệt** — 2 route × 320/768/1440 × sáng/tối = **12/12 ĐẠT** (`ma-tran-chuong-ket-qua.json`): theme từ DOM khớp, **0 tràn ngang**, ảnh hoàn tất 1200×675 mọi ô, nhãn SVG ẩn 320 / hiện từ 768, trạng thái đầu đúng ngôn ngữ; 15 ảnh `shots/` đã mở kiểm trực quan.
- **(e) Hình học dây tóc (mới vòng sửa)** — `hinh-hoc-day-toc-ket-qua.json`: 24 pha bằng Bước + 3 mẫu khi Phát — **đầu ngoài lệch điểm gắn 0 px**; đầu path khớp collet mọi pha; bán kính đơn điệu, góc bước ≤ 28,6°, đoạn nhỏ nhất > 6 px (không gãy); công thức cũ dự báo trôi 183,2 px → **ca hồi quy bắt được**.
- **(f) Bộ đếm + từng nút (chuột + bàn phím)** — `bo-dem-tinh-ket-qua.json` (mục 0) + `nut-ban-phim-ket-qua.json`: Phát làm attr transform + attr d đổi thật qua 3 mẫu; Tạm dừng đóng băng; Bước hữu hạn; Tĩnh giữ đếm; Đặt lại về "thứ 1"; focus + Enter hoạt động; Shift+Tab/Tab đi giữa 5 nút; giống hệt trên EN.
- **(g) Reduced-motion / viewport / vòng đời trang** — `giam-chuyen-dong-ket-qua.json`: RM trước tải — đứng yên 3 mẫu, Bước chạy (0°→20°); RM giữa phiên — dừng thật; rời viewport — dừng + ghi chú, quay lại không tự phát, Phát thủ công chạy lại. `vong-doi-trang-ket-qua.json`: điều hướng đi + `goBack` thật → điều khiển còn, Phát chạy được; **mô phỏng sự kiện** ẩn tab sau quay lại → dừng đúng; **mô phỏng** `pageshow persisted` → UI đồng bộ (ghi rõ là mô phỏng, không gọi là chuyển tab thật).
- **(h) ID + ảnh + fallback + no-JS** — `id-fallback-cls-ket-qua.json`: 0 id trùng (VI 29/EN 27), 0 tham chiếu url(#); ảnh load hoàn tất; chặn ảnh → ảnh ẩn + khối dự phòng hiện + chú thích còn; tắt JS → path xoắn tĩnh nguyên + 4 legend + 5 nút trơ. CLS ghi được 0,0105–0,1032 tùy phép (nạp font) — **quan sát trong điều kiện thử, không phải bảo đảm phổ quát**.
- **(i) Mạng trước/sau cùng phương pháp** — `do-mang-truoc-sau-ket-qua.json` + `log-do-mang-truoc-sau.txt`: context mới cache rỗng, viewport 1280×900, networkidle; byte = thân response giải mã (content-length ghi riêng; không có byte null trong các phép này; request lỗi ghi riêng). Kết quả gốc: **VI** 9 → 10 request local, tổng 218.314 → 304.699 B (HTML −5.020, CSS +764, JS +3.185, ảnh +87.456); **EN** 9 → 10, tổng 192.727 → 299.223 B. Tài nguyên ngoài: **Google Fonts** (VI 15 response, EN 7 — xuất hiện cả hai pha); endpoint preview `/_vercel/insights/script.js` **404** ở cả hai pha (ghi trong request lỗi).
  Sau vòng sửa màu, lượt SAU được **đo lại** cùng phương pháp (`do-mang-sau-loi-mau-ket-qua.json`): **VI 10 request / 304.819 B; EN 10 / 299.343 B** (HTML +120 B/route do thuộc tính stroke halo; CSS 111.059, JS 32.605, ảnh 87.456 không đổi). Số 304.699/299.223 thuộc phiên bản trước vòng màu.
- **(k) Whitespace + bí mật** — quét trailing whitespace tệp văn bản gói = 0 (3 dòng thừa trong log build do công cụ đã cắt trong vòng 1; vòng này log sạch); `git diff --check` sạch; quét pattern bí mật = 0 khớp; không lưu cookie/storageState, không gửi form/sự kiện ra dịch vụ ngoài.

## 7. Danh sách bằng chứng `output/g04-balance-chapter/` (50 tệp + `shots/` 23 ảnh)

- Kịch bản trình duyệt (14): `pw-baseline-mang.js`*, `pw-chup-chuong.js`, `pw-ma-tran-chuong.js`, `pw-nut-ban-phim.js`, `pw-giam-chuyen-dong.js`, `pw-id-fallback-cls.js`, `pw-coldload-sau.js`*, `pw-do-mang-truoc-sau.js`, `pw-do-mang-sau-loi-mau.js`, `pw-hinh-hoc-day-toc.js`, `pw-bo-dem-tinh.js`, `pw-vong-doi-trang.js`, `pw-mau-svg.js`, `pw-thu-nhanh-hanh-vi.js`
- Script công cụ (3): `tao-anh-web.py`, `kiem-cong-thuc.py`, `kiem-hoi-quy-r1.mjs`
- Kết quả JSON (14): `baseline-mang-ket-qua.json`*, `coldload-sau-ket-qua.json`*, `do-mang-truoc-sau-ket-qua.json`, `do-mang-sau-loi-mau-ket-qua.json`, `ma-tran-chuong-ket-qua.json`, `nut-ban-phim-ket-qua.json`, `giam-chuyen-dong-ket-qua.json`, `id-fallback-cls-ket-qua.json`, `hinh-hoc-day-toc-ket-qua.json`, `bo-dem-tinh-ket-qua.json`, `vong-doi-trang-ket-qua.json`, `mau-svg-ket-qua.json`, `thu-nhanh-hanh-vi-ket-qua.json`, `manifest-anh-web.json`
- Log UTF-8 (19): `log-build-g04b.txt`, `log-build-nen-worktree.txt`, `log-preview-nen.txt`, `log-preview-sau.txt`, `log-preview-baseline.txt`, `log-do-mang-truoc-sau.txt`, `log-do-mang-sau-loi-mau.txt`, `log-hoi-quy-r1.txt`, `log-hinh-hoc-day-toc.txt`, `log-bo-dem-tinh.txt`, `log-vong-doi-trang.txt`, `log-mau-svg.txt`, `log-thu-nhanh-hanh-vi.txt`, `log-ma-tran-chuong.txt`, `log-nut-ban-phim.txt`, `log-giam-chuyen-dong.txt`, `log-id-fallback-cls.txt`, `log-baseline-mang.txt`, `log-coldload-sau.txt`
- `shots/` (23): 12 ảnh ma trận + 8 ảnh riêng vùng SVG vòng màu `svg-{vi|en}-{320|1440}-{sang|toi}.png` + `nhanh-vi-1440-chuong.png`, `fallback-anh-loi-vi.png`, `khong-js-vi.png`

*(Dấu * = phép đo vòng 1 vô hiệu so sánh — giữ làm vết, đã thay bằng `do-mang-truoc-sau`.)*

## 8. Giới hạn và điểm còn lại

1. R1 đã nới **hẹp đúng 1 tệp** theo quyết định GPT Work — hai cờ EN của bài đích phải true; các bài EN khác vẫn false; hồi quy 5 ca chốt.
2. Không sửa Hairspring.astro, MechanismAnimation, Header, i18n map, schema timeline, CSP/Analytics, dependency; không autoplay/âm thanh/3D/thư viện hoạt ảnh; không nới checker nào ngoài R1 theo đúng quyền đã cho; không đổi dữ kiện ngoài 2 bài mẫu.
3. **Quan sát ngoài phạm vi (không sửa, ghi nhận theo phản hồi)**: ScrollToTop còn nhãn `aria-label` tiếng Việt trên trang EN.
4. Thử tab ẩn/pageshow là **mô phỏng sự kiện bằng script** (document.hidden override + dispatch) — chuyển tab/bfcache thật chưa chứng minh được trong môi trường này.
5. CLS là quan sát theo điều kiện thử (nạp font), không phải bảo đảm phổ quát.
6. Hiệu lực: sau khi GPT Work nghiệm thu, chương vẫn **DỪNG chờ anh Vinh duyệt** trực tiếp; không mở G05–G09; không gọi G04 hoặc danh mục hoàn tất.

## 9. Đường hoàn nguyên (phân biệt trước/sau commit)

- **Trước commit** (hiện trạng hiện tại): hoàn nguyên gói bằng
  `git restore src/components/templates/MechanismArticle.astro src/content/coChe/vi/day-toc-banh-lac.md src/content/coChe/en/balance-and-hairspring.md scripts/check-regulating-cluster.mjs package.json`
  rồi xóa tệp mới: `rm src/components/history/BalanceHairspringChapter.astro scripts/check-g04-balance-chapter.mjs public/images/history/balance-hairspring/banh-lac-day-toc-hero.jpg` (+ dọn thư mục rỗng), và làm mồi `docs/nghiem-thu/G04-B…md` + `output/g04-balance-chapter/`; 4 tệp cập nhật trạng thái ở mục 2a là untracked — muốn về trước cả G04-A thì hoàn nguyên tay từng tệp.
- **Sau commit**: `git restore …/tệp` về HEAD **không còn** hoàn nguyên được gói (gói đã nằm trong commit). Khi đó phải dùng `git revert <commit>` (tạo commit ngược) hoặc một commit sửa/xóa tệp theo danh sách mục 2b–2c; các tệp untracked (docs/output) vẫn xóa trực tiếp được.
- Bản gốc ảnh trong `output/g04-banh-lac-day-toc-design/drafts/` không bao giờ bị đụng — hoàn nguyên bản web không mất tư liệu. Trong vòng sửa này **không chạy lệnh hoàn nguyên/git clean nào**.

---

**G04-B xong vòng sửa TXN-20260912-23, tự kiểm đạt — chờ GPT Work nghiệm thu; chưa commit/push/deploy.**
