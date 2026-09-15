# G06-C chặng 2 — Tích hợp infographic Bộ thoát song ngữ (2026-09-15)

- Giao dịch: TXN-20260915-8 (prompt tiêu đề ghi TXN-20260915-9 — chênh lệch số ghi nhận, nội dung chỉ đạo là một) | Danh mục: DHC-G05G09-20260913 v1.0.0
- Nền: **`aaea528caf7b`** (main = origin/main, commit duyệt hồ sơ chặng 1). Tracked sửa **8 tệp** (6 đúng danh sách gốc + 2 được chấp thuận mở ở vòng sửa) + staged 0; untracked gói = 2 vùng (biên bản này + `output/g06-escapement-en-integration/`).
- Phạm vi: không route mới, không sửa bảng cặp/sitemap, không ảnh AI, không đụng production/CSP/analytics/3D.
- Hồ sơ chặng 1 (`G06-C-kiem-ke-infographic-bo-thoat-en-2026-09-14.md`) là bằng chứng kế thừa — không gọi lại thành phép kiểm mới của chặng 2.

## 0. Kết luận (đồng bộ vòng sửa checker TXN-20260915-14)

Tích hợp xong và **tự kiểm đạt**: `npm run build` **TRỌN CHUỖI exit 0** (289 trang / 67 EN / sitemap 288 URL / links 21.033 (+0) / diagnostics **0 lỗi / 0 cảnh báo / 4 hints**); checker `check-g06-escapement-en.mjs`: **55 ca nguồn + 36 ca dist**; trình duyệt nền **27/27 ĐẠT**; reduced-motion + vòng đời **26/26 ĐẠT**; hồi quy khung **23/23 ĐẠT**; mutation **11 ca ĐẠT** (2 nguồn G06-C + 2 đối chứng mục 7 + ham-quet + baseline sạch + 5 ca dist m3–m7 hoàn nguyên có hash); đo tải **3 lượt cùng phương pháp**, không 3D.

**Hai checker được chấp thuận mở — trạng thái sau vòng sửa checker:**
1. `check-motion-accessibility.mjs` **mục 7 — NGOẠI LỆ NHÃN ĐỘNG ĐÃ THU HẸP**: chỉ SVG `id="escapement-svg"` trong `Escapement.astro` được chuyển trách nhiệm kiểm nhãn sang tầng dist (D11 hai ngôn ngữ + mutation m5/m6/m7); tầng nguồn vẫn bắt **thiếu role="img"** (nhánh riêng cho escapement-svg) và **xung đột aria-hidden** với mọi SVG; SVG nhãn động **ngoài** ngoại lệ → bị bắt với thông báo "cần bổ sung checker dist tương ứng", không tự tuyên bố đã được kiểm. Đối chứng mutation: mục 7a (tiêm `aria-label={''}` vào WaterResistance → bắt đúng lý do, khôi phục exit 0), mục 7b (Bộ thoát sạch qua exit 0).
2. `check-g04-balance-chapter.mjs` **G4-4**: đồng bộ comment/tên biến/thông báo với chính sách hiện hành — ngoại lệ R1 gồm ĐÚNG 2 tệp (Bánh lắc G04 + Bộ thoát G06-C), các bài EN khác vẫn kiểm false. `check-regulating-cluster.mjs` gộp về một Set 2 tệp (bỏ cấu trúc 2-Set chỉ tồn tại để khớp thông báo cũ).

**Tự kiểm D5 qua đúng hàm thật (mới):** hàm quét tách thành `demTrangEnKhac` cấp module dùng chung — dist thật lẫn cây thử đều đi qua cùng một đường chạy; ba cây thử (sạch 1/0; chèn khung EN khác dù tổng khung không đổi 1/1; cây không có trang nào 0/0); thêm ca **Ham-quet**: vô hiệu hóa phát hiện khung **trong hàm dùng chung** (bản sao sandbox) → D5 tự kiểm (b) thất bại đúng lý do trong khi hàm nguyên vẹn trên cùng dist exit 0.

**Giới hạn còn lại:** tab ẩn THẬT **CHƯA KIỂM** — hai lần thử (`pw-g06c2-tab-that.js`: headless và `--headed`, 2 trang + `bringToFront`) đều ghi `visibilityState: 'visible'` cho trang nền; KHÔNG cộng vào 26 ca ĐẠT; chưa đủ cơ sở miễn tiêu chí hoặc kết luận lỗi sản phẩm — GPT Work xét riêng khi hai điểm checker được đóng.

## 1. Danh sách tệp thực tế và lý do

### Sửa (8)

| Tệp | Lý do |
|---|---|
| `src/components/infographics/Escapement.astro` | Nhận prop `lang`; steps VI/EN theo câu CHỐT bảng cổng vòng sửa 3 (GK-3…7, GK-3e = "Towards the centre" đồng bộ); label/desc (GK-1/2), aria/desc SVG (GK-9/9d), beat (GK-8) hai ngôn ngữ; PART_INFO role VI chốt + `roleEn` (GK-11a…e); panel/tooltip rẽ nhánh lang (GK-15); GK-16a/16b render dưới khung qua slot `footnote`; `data-lang` trên SVG; POSES beat đổi khóa trung tính `tick/tock`. Hình học/POSES góc giữ nguyên — không sửa hình để hợp thức hóa "một răng". |
| `src/components/infographics/MechanismAnimation.astro` | Prop `lang` (mặc định 'vi') + `reduceInteractive` (mặc định false); nhãn enhanced hai ngôn ngữ cả markup lẫn JS (`la`/`laJS`); thông báo RM VI/EN (role=status); guard `data-mech-init`; legend chip EN-only theo `data-lang` (GK-15); slot `footnote`; RM tương tác (matchMedia → dừng giữa phiên/chặn Phát, canRun `!reduceActive`). |
| `src/components/templates/MechanismArticle.astro` | Ngoại lệ EN DUY NHẤT `enEscapementAllowed` (slug 'escapement' + hai cờ); gate VI giữ nguyên văn regex G4-1 (tách biến `viInfographic`); khóa map `'escapement': Escapement` (trang EN tra theo custom_slug); truyền `lang` cho Infographic. |
| `src/content/coChe/en/escapement.md` | Bật `has_infographic: true` + `interactive: true`; `updated: "2026-09-15"`. Không sửa thân bài/nguồn. |
| `scripts/check-regulating-cluster.mjs` | Ngoại lệ cờ: một Set gồm 2 tệp (Bánh lắc G04 + Bộ thoát G06-C) — vòng sửa gộp lại từ cấu trúc 2-Set; các bài EN khác vẫn false. |
| `package.json` | `check:g06c` mới; nối `check-g06-escapement-en.mjs` vào `check` (nguồn) và `build` (tầng dist). |
| `scripts/check-motion-accessibility.mjs` *(mở được chấp thuận; thu hẹp ở vòng sửa checker TXN-20260915-14)* | Mục 7: ngoại lệ nhãn động DUY NHẤT là `Escapement.astro` + SVG `escapement-svg` (chuyển kiểm nhãn sang D11, đếm riêng); tầng nguồn vẫn bắt thiếu role="img" (nhánh riêng) và xung đột aria-hidden với mọi SVG; SVG nhãn động ngoài ngoại lệ → bắt với thông báo "cần bổ sung checker dist tương ứng". |
| `scripts/check-g04-balance-chapter.mjs` *(mở được chấp thuận, vòng sửa)* | G4-4 đồng bộ: ngoại lệ R1 đúng 2 tệp (Bánh lắc + Bộ thoát), đổi tên biến `escapementVanCoQuyTacSchema`, thông báo mới; kiểm bảo vệ G04 giữ nguyên, không nới bài khác. |

### Tạo mới (2 + thư mục output)

| Tệp | Nội dung |
|---|---|
| `scripts/check-g06-escapement-en.mjs` | Checker chống hồi quy: S1–S15 nguồn + D1–D11 dist (mục 3). |
| `docs/nghiem-thu/G06-C-tich-hop-infographic-bo-thoat-en-2026-09-15.md` | Biên bản này. |
| `output/g06-escapement-en-integration/` (54 tệp: 46 text + 8 PNG) | Công cụ + bằng chứng: 6 script trình duyệt, mutation theo luồng hoàn nguyên, log build/check/tải/mutation/hồi quy, ảnh. |

## 2. Nội dung áp dụng — đối chiếu GK (chuẩn: bang-cong-noi-dung.md vòng sửa 3)

| GK | Áp dụng | Bằng chứng |
|---|---|---|
| GK-1/2 | label + desc khung VI/EN | S1/S2; D2 |
| GK-3/3d (+3e) | "Bánh lắc chuyển động về phía giữa" / "Trong mô hình, …"; đề phụ EN đồng bộ "Towards the centre" | S3/S4; D2; ảnh en-light-tren |
| GK-4/4d | giữ t; d = "Bánh thoát rời vị trí bị khóa…" | S3/S4 |
| GK-5/5d | ĐỊNH TÍNH ("quay một nhịp nhỏ") — không sửa POSES (−13° giữ nguyên) | S3/S4; D2 |
| GK-6/6d | d đã bỏ "phát tiếng 'tíc'" → "dừng lại ở vị trí khóa" | S4; quét cấm "phát tiếng" |
| GK-7/7d | d EN/VI mới khớp hành vi mã (quay lại bước đầu, không mô phỏng nửa đối diện) | S3/S4 |
| GK-8 | ● TÍC/TẮC ↔ ● TICK/TOCK qua khóa trung tính + map | D2/D3/D4; ảnh |
| GK-9/9d | aria-label + desc SVG hai ngôn ngữ — **nhãn render thật được chứng minh ở D11 (dist VI/EN: role, không aria-hidden, nhãn đúng lang)** + mutation m5/m6/m7 | S6; D11 |
| GK-10/10d/10e | panel "Bộ phận/Part" + mặc định; EN không nhắc tên tiếng Việt | D2; ảnh |
| GK-11a…e | role VI chốt + roleEn nguyên văn; cấm chuỗi cũ | S7 |
| GK-12 | 5 cặp data-name giữ nguyên dữ liệu; hiển thị theo GK-15 | S15; S8 |
| GK-13 | nhãn khung VI/EN cả markup + JS; thông báo RM VI/EN nguyên văn | S8b; D2/D4 |
| GK-15 | panel/tooltip/legend EN không tên VI — đo sau tương tác | pw-g06c2-nen: E, F ĐẠT |
| GK-16a/16b | hai nhãn render dưới khung (slot footnote), đúng lang, không nằm trong tooltip | S5; D2/D4; ảnh (cả 8) |
| CL-1/CL-2 | CL-1 qua nhãn GK-16a; CL-2 qua nhãn GK-16b | S5 |

## 3. Kiểm tra bắt buộc — kết quả từng ca

### A. Nguồn và build

- `check:g06c` nối `check` + `build` (S12). Checker nguồn: **55 ca ĐẠT** (S1…S15, nhiều ca liệt kê từng chuỗi). Checker dist (`dist <dir>`): **36 ca ĐẠT** — D1 khung EN; D2 chuỗi EN tĩnh (11); D3 KHÔNG rò VI trên markup (16 chuỗi, **đã loại nội dung `<script>`** — script inline dùng chung hai ngôn ngữ, không phải chữ hiển thị); D4 VI nguyên trạng; **D5 qua hàm dùng chung `demTrangEnKhac`** (path.relative + chuẩn hóa `sep`; ghi số trang thực sự quét: **66 trang EN ngoài Bộ thoát, 0 dính khung**; ca "quét khác 0" kiểm riêng) + **ba cây thử tự kiểm qua CÙNG hàm**: (a) sạch 1/0, (b) chèn khung EN khác dù tổng khung giữ nguyên 1/1, (c) cây không trang nào 0/0; D6 G04 giữ nguyên; D7 tổng **23 trang render khung = 17+5+1**; D8 dist không chứa legend (legend sinh bằng JS — KHÔNG chứng nhận bằng dist); D9 aria EN tĩnh; D10 không 3D; **D11 phân loại SVG dist VI/EN** (role="img", không aria-hidden, nhãn không rỗng, đúng ngôn ngữ — 5 ca).
- **`npm run build` TRỌN CHUỖI: exit 0** (log-build-c2-v3.txt; 305 dòng ĐẠT; check-motion mục 7 qua với đúng 1 SVG G06-C nhãn động chuyển tầng dist; check-g04 nguồn+dist ĐẠT). English launch riêng: **EXIT 0** (log-english-launch-c2-v3.txt). Diagnostics: **0/0/4**.
- Liên kết: 21.033 (nền 21.033, chênh lệch +0); "Không phát hiện link nội bộ hỏng".

### B. Trình duyệt hai route — `pw-g06c2-nen.js` + `log-g06c2-nen.txt`: 27/27 ĐẠT

A bố cục VI/EN × 320/768/1440 × sáng/tối = 12 ca (theme DOM khớp, tràn 0, counter đúng lang, hai nhãn giới hạn hiện đọc được); B chuột VI (next → rotate(-8deg); reset → w=0; Phát → pressed + nhãn Tạm dừng + tự tăng); C bàn phím thật VI+EN; D POES thật EN (bước 3 −21°, bước 5 −24° + ● TOCK); E legend 5 mục EN-only + panel sau chọn không VI; F tooltip VI 2 dòng / EN dòng chính EN + phụ rỗng; G ID trùng/thiếu đích = 0; H no-JS đọc được.

- Ảnh: **8 tệp** (vi/en × sáng/tối × trên/dưới, 734×809/900) — đã tự mở từng ảnh; tiêu đề rõ (offset −90px né header dính), đủ sơ đồ/điều khiển/panel/legend/hai nhãn giới hạn; theme DOM đúng.

### C. Reduced-motion/vòng đời — `pw-g06c2-rm.js` + log: **26/26 ĐẠT** (VI+EN, R1–R5)

R1 reduce trước tải (không tự chạy; next/prev/reset dùng được, transition 0s); R2 bật reduce khi đang phát (dừng ngay, aria/nút đồng bộ, thông báo hiện, counter đứng 6,5s > 2 chu kỳ 2,6s); R3 Phát trong reduce bị chặn; R4 gỡ reduce (thông báo ẩn, KHÔNG tự phát; next → tween thật mẫu giữa khác cả 2 đầu + transition 0.3s + đích −8°; Phát hoạt động lại); R5 rời viewport cuộn thật (đang phát chứng minh trước; ngoài view 6,5s counter đứng; quay lại chạy tiếp).

- **Tab ẩn thật: CHƯA KIỂM** — `pw-g06c2-tab-that.js` hai phiên (headless + `--headed`): `visibilityState` trang nền = 'visible' cả hai lần (log-g06c2-tab-that.txt). Điểm cần quyết ở tái nghiệm thu.

### D. Hồi quy khung dùng chung — `pw-g06c2-hoi-quy.js` + log: **23/23 ĐẠT**

21 route VI (16 cơ chế + 5 từ điển, đều chế cũ thực sự render) + 2 route chương G04. Ngoại lệ có ghi chú: 404 `/_vercel/insights/script.js` (analytics production-only — xuất hiện trên mọi trang). Đính chính cách diễn đạt ma trận cũ: kiểm theo chế độ thực sự render; legend 'span' hoặc 'khong' (khung tự xóa legend rỗng khi component không có [data-part] — 6 trang) đều hợp lệ, chỉ 'khac' là lỗi.

### E. Mutation — `mutation-g06c2.cjs` + `pw-g06c2-mutation-dom.js` + `tong-ket-mutation.cjs`: **11/11 ĐẠT**

Sandbox `os.tmpdir()` (đã xóa sau chạy); một bản `dist-live` phục vụ bởi server tĩnh cổng 4480; **bộ kiểm chung mỗi phép đo**: counter EN, text mặc định panel EN (không VI), tham chiếu SVG đầy đủ, phân loại SVG (role/aria-hidden/nhãn đúng lang). Luồng từng ca: **sạch qua (baseline đo trước) → vá (ghi hash-sau-vá) → kiểm thất bại ĐÚNG LÝ DO → HOÀN NGUYÊN CHÍNH BẢN ĐÃ VÁ (ghi lại nội dung gốc) → hash-sau-hoàn-nguyên KHỚP hash-gốc → kiểm đạt trở lại.**

| Ca | Vá | Bắt đúng lý do |
|---|---|---|
| M2-1 (nguồn) | gỡ `data-name-en` một bộ phận | S15 bắt |
| M2-2 (nguồn) | gate `'chronograph'` (chưa dịch) | S9 bắt |
| Mục 7a (nguồn, vòng sửa checker) | tiêm `<svg aria-label={''}></svg>` vào WaterResistance (ngoài ngoại lệ) | check-motion bắt: "SVG nhãn động NGOÀI ngoại lệ G06-C" (+[thiếu role="img"]) |
| Mục 7b (nguồn, đối chứng) | Bộ thoát sạch qua check-motion | exit 0 — ngoại lệ duy nhất hoạt động |
| Ham-quet (vòng sửa checker) | vô hiệu hóa phát hiện khung TRONG hàm dùng chung `demTrangEnKhac` (bản sao sandbox src+scripts+dist) | D5 tự kiểm (b) thất bại đúng lý do; hàm nguyên vẹn trên cùng dist exit 0 |
| m3 | text mặc định panel → chuỗi VI | bộ kiểm DOM: panel lộ VI |
| m4 | xóa id `escSteel` | bộ kiểm DOM: thiếu đích escSteel |
| m5 | nhãn SVG rỗng | bộ kiểm DOM: nhãn rỗng |
| m6 | nhãn SVG VI trên trang EN | bộ kiểm DOM: nhãn sai ngôn ngữ |
| m7 | xung đột `aria-hidden="true"` + role=img | bộ kiểm DOM: aria-hidden xung đột |

Hash sha256 ghi trong `sandbox-info.json` (`hashGoc` / `hashDaVa` / `hashSauHoanNguyen` — khớp gốc mọi ca). **Phép thử cũ của vòng trước (đo lại server 4470 hai lần) được đánh dấu đúng bản chất: ĐỐI CHỨNG BẢN SẠCH — không gọi là hoàn nguyên.**

## 4. Đo tải — `pw-g06c2-tai.js` + `log-g06c2-tai.txt` (3 lượt CÙNG PHƯƠNG PHÁP)

Điều kiện: context kiểm, **xóa cache qua CDP** trước mỗi lượt; **không chặn font** (không so chéo với lượt chặn font của chặng 1); đếm **byte giải nén** (preview không gửi content-length — không phải byte truyền); ghi request thất bại kèm lỗi; kiểm 3D theo URL.

| Lượt | Route | Request | Thất bại | Byte giải nén | 3D |
|---|---|---|---|---|---|
| T1 VI trước (nền aea528, worktree + preview 4475) | /co-che/bo-thoat/ | 25 | 1 | 670.576 (html 84.431 / css 118.220 / js 32.413 / font 435.512) | không |
| T2 VI sau | /co-che/bo-thoat/ | 25 | 1 | 674.132 (+3.556: html +2.785 = nhãn giới hạn + thông báo RM; js +771 = nhãn lang + RM) | không |
| T3 EN sau | /en/mechanisms/escapement/ | 16 | 1 | 470.199 (font EN subset nhỏ hơn) | không |

- Thất bại duy nhất mỗi lượt: `/_vercel/insights/script.js` (analytics production-only); request thất bại = 1 (đếm thật, không ghi 0, không suy đoán nguyên nhân khác).
- So sánh chỉ giữa T1↔T2. Giới hạn tải chặng 1 không dùng làm chứng cứ chặng 2.

## 5. Vấn đề phát hiện giữa chặng (đã xử lý trong phạm vi)

- Trang EN không render khung ở lần build đầu: map `infographics` khóa theo slug VI; trang EN tra custom_slug 'escapement' → undefined. Sửa: thêm khóa `'escapement': Escapement` (gate vẫn khóa riêng).
- G4-1 regex literal: tái cấu trúc gate tách biến `viInfographic` giữ nguyên chuỗi — check-g04 ĐẠT.
- Beat VI lọt HTML EN qua script inline dùng chung → POSES đổi khóa trung tính tick/tock + map hiển thị theo lang; D3 siết: quét markup sau khi loại `<script>`.
- 3 biến chết tự tạo (astro check 5–7 hints) → dọn về baseline 4.
- **Đã xử lý ở vòng sửa:** D5 phụ thuộc dấu `\` Windows → path.relative + chuẩn hóa sep + tự kiểm cây giả + ghi số trang quét (66); mutation thiếu hoàn nguyên → luồng hoàn nguyên thật có hash (mục 3E); G4-4 thông báo/comment lỗi thời → đồng bộ chính sách 2 tệp; số ca nguồn/dist ghi trộn (55+82) → sửa thành 55 nguồn + 33 dist (đo lại sau khi thêm D5/D11); "mục 6" → đúng là **mục 7** của checker motion.
- **Đã xử lý ở vòng sửa checker (TXN-20260915-14):** mục 7 motion bỏ qua MỌI SVG nhãn động (kể cả ngoài Bộ thoát; nhãn rỗng/thiếu role không bị bắt) → thu hẹp ngoại lệ còn `Escapement.astro`/`escapement-svg`, bắt thiếu role + báo "cần bổ sung checker dist" cho SVG khác (đối chứng mục 7a/7b); D5 tự kiểm dùng `quetGia` chép riêng (vô hiệu hóa hàm thật không làm tự kiểm fail) → tách hàm dùng chung `demTrangEnKhac`, ba cây thử qua cùng hàm + ca **Ham-quet** chứng minh mutation hàm làm tự kiểm thất bại đúng lý do; số ca dist đo lại 33 → 36.

## 6. Giới hạn và trạng thái

| Giới hạn | Trạng thái |
|---|---|
| Tab ẩn thật | **CHƯA KIỂM** — hai phiên thử đều visible (bằng chứng giữ); điểm cần quyết tái nghiệm thu; KHÔNG cộng vào ca ĐẠT |
| request thất bại khi đo tải | = 1 mỗi lượt (`/_vercel/insights/script.js`, production-only) — đếm thật |
| Byte truyền | không đo được (preview không gửi content-length) — báo byte giải nén |
| Ảnh | đủ vùng + tiêu đề (offset né header); không gọi "toàn khung không che" |
| `npm run check`/`build` trọn | **ĐẠT — exit 0** (v3, sau khi mục 7 thu hẹp ngoại lệ) |
| Môi trường kiểm | preview 4321/4475, server tĩnh 4470–4472/4480, chrome playwright, worktree `g06c2-wt`, sandbox tmpdir `g06c2-mut-*` — đã tắt/gỡ/xóa |

Tách bằng chứng: mục 2–6 là bằng chứng MỚI của chặng 2; hồ sơ chặng 1 chỉ kế thừa làm căn cứ câu chữ (bảng cổng vòng sửa 3). Phép thử mutation cũ (đo lại server sạch) = đối chứng bản sạch, không phải hoàn nguyên — bộ mutation hiện hành là mục 3E.

## 7. Kiểm hành vi bàn giao

- Số tệp gói: **68** = 8 tệp sửa + `check-g06-escapement-en.mjs` + biên bản này + 58 tệp (50 text + 8 PNG) trong `output/g06-escapement-en-integration/`. GPT Work đính chính phép cộng khi nghiệm thu TXN-20260915-15; không thêm/bớt tệp sản phẩm.
- JSON hợp lệ: `sandbox-info.json` parse OK (chứa hash sha256 gốc/vá/hoàn nguyên từng ca).
- Whitespace/EOF: quét toàn bộ tệp gói dạng text (60 tệp kể cả log) — **SẠCH** (đã chuẩn hóa các tệp log/info mới).
- PNG: 8/8 magic bytes đúng.
- Quét nhạy cảm: sạch.
- Git: HEAD `aaea528caf7b` = origin/main; tracked sửa **8 tệp** (6 danh sách gốc + 2 được chấp thuận); staged **0**; untracked gói = biên bản + `output/g06-escapement-en-integration/`.
- Dọn tiến trình: preview 4321/4475, server tĩnh 4470–4472/4480, chrome playwright, worktree `g06c2-wt`, sandbox tmpdir `g06c2-mut-*` — đã tắt/gỡ/xóa.
- `dist/` hiện hành là bản tích hợp, build bằng `npm run build` trọn chuỗi.

## 8. Điểm dừng

**G06-C chặng 2 (vòng sửa) hoàn tất tự kiểm, chờ GPT Work tái nghiệm thu độc lập; chưa commit/push/deploy.** Điểm cần quyết duy nhất còn lại: **tab ẩn thật CHƯA KIỂM** (hai bằng chứng thử nghiệm kèm log) — chọn phương án kiểm môi trường thật hoặc cách xử lý khác ở lần tái nghiệm thu.

## 9. Nghiệm thu GPT Work — TXN-20260915-15

G06-C chặng 2 ĐẠT trong phạm vi tích hợp Bộ thoát song ngữ, với giới hạn tab ẩn thật dưới đây được chấp thuận. Trạng thái chờ ở mục 8 là lịch sử bàn giao trước nghiệm thu.

- Build độc lập trọn chuỗi: exit 0; 289 trang, diagnostics 317 tệp / 0 lỗi / 0 cảnh báo / 4 hints baseline. English launch chạy riêng exit 0: 63 route bắt buộc, 67 trang EN. Checker G06-C qua các tầng nguồn/dist, quét thực tế 66 trang EN ngoài Bộ thoát.
- Đã đọc độc lập hai checker sửa cuối: ngoại lệ nhãn động khóa đúng tệp và ID Bộ thoát; D5 dùng một hàm cho cây thật và cây tự kiểm, kèm kiểm số trang quét khác 0. Tái hiện bằng bộ nhớ: cây sạch check-motion exit 0; tiêm SVG nhãn động rỗng thiếu role vào WaterResistance bị bắt exit 1. Không tiêm vào mã sản phẩm.
- Đã rà công cụ mutation, kết quả thô và tái tính tổng kết 11/11 từ bằng chứng lưu; không gọi đây là chạy lại toàn bộ trình duyệt mutation. Các kết quả giao diện/RM không đổi mã sản phẩm được kế thừa với giới hạn đã ghi.
- Kiểm Playwright độc lập, headed, preview 127.0.0.1:4490, trang EN: thấy đủ nhãn/legend/giới hạn EN; Phát đổi counter thật. Mở tab riêng about:blank rồi bringToFront: trang kiểm vẫn hidden=false, visibilityState=visible; counter Step 2/5 → Step 4/5 sau 6,5 giây → Step 5/5 sau trở lại. Đây là phép thử không tạo được trạng thái ẩn, KHÔNG phải bằng chứng lỗi hay đạt tiêu chí dừng khi tab ẩn.
- Quyết định: chấp thuận TAB ẨN THẬT CHƯA KIỂM như giới hạn của G06-C; không chứng nhận tự dừng khi tab ẩn, không cộng ca này vào ĐẠT và không chuyển mô phỏng thành kiểm thật. Không mở gói mới để xử lý giới hạn này.
- GPT Work sửa phép cộng 69 → 68 và bỏ dòng trống cuối hai log preview; không thay kết quả đo hoặc PNG. Danh sách commit chỉ 68 tệp G06-C; không đưa output/playwright hay tệp có trước ngoài gói vào commit.

Nghiệm thu này không mở infographic EN hàng loạt, không mở chương AI mới hoặc G07/G08/G09. Điều phối xác minh commit/push rồi cập nhật sổ cái; giới hạn trên phải được giữ khi đóng G06-C.
