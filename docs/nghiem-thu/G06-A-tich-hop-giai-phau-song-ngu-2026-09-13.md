# G06-A chặng 2 — Tích hợp giải phẫu song ngữ (2026-09-13)

- **Giao dịch:** TXN-20260913-27 — danh mục DHC-G05G09-20260913 v1.0.0. Kế tục hồ sơ chặng 1 (TXN-20260913-18/19/21/23/25). Cổng nội dung và phạm vi **đã được GPT Work duyệt** (cong-noi-dung-claim.md bản 3 + pham-vi-tich-hop.md).
- **Nền:** `f42c11e` (main, khớp remote). Tracked sạch, staged trống khi bắt đầu; không đụng `output/playwright/` và tệp untracked ngoài gói.
- **Kết luận:** chặng 2 hoàn tất **vòng sửa 2 — phương pháp kiểm (TXN-20260913-32)** — DỪNG chờ GPT Work nghiệm thu độc lập. Không commit, không push, không deploy. Không chuyển G06-B/C, không triển khai nhân rộng mô hình G04. Trạng thái trung thực: các nhóm kiểm chính ĐẠT bằng phép đo đúng đối tượng (pixel giải mã / draw WebGL / decode ảnh); các giới hạn còn lại liệt kê §8 và ma-tran "Vòng đời".

## 0-bis. Vòng sửa 1 sau nghiệm thu TXN-20260913-30

GPT Work kiểm độc lập: **chưa đạt** — 0/0/**8 hints** vượt baseline; số ca check-g06 ghi sai; ma trận G6I-7…11 lệch nội dung/tham chiếu; thiếu bàn phím EN, RM 3D giữa phiên, các phép thử vòng đời. Đồng thời **chấp thuận bổ sung `scripts/check-motion-accessibility.mjs` vào phạm vi** (tệp thứ 13 đã hỏi) — nhưng lưu ý regex aria-label JSX chỉ là kiểm cấu trúc. Đã xử lý:

1. **Diagnostics**: bỏ 4 biến chết trong script bằng chứng (`mutation-g06.mjs`: tepDist/suaParts/ghiParts; `pw-g06-en.js`: nav) — không suppression, không nới tsconfig, không loại thư mục khỏi kiểm kiểu. **Build chốt v4** (`log-build-chang2-v4.txt`): exit 0, **0 lỗi/0 cảnh báo/4 hints = baseline** (lần build trung gian trước khi dọn bỏ 4 biến chết đo được 8 — lịch sử giữ trong log-build-chang2-v2/v3). Không đổi mã src trong vòng này (giữa v2 và v4 chỉ sửa output-scripts/log) — bằng chứng trình duyệt các lượt trước vẫn áp dụng cho dist v4 cùng nội dung.
2. **check-motion**: GPT Work chấp thuận vào phạm vi — biên bản bảng mục 2 bổ sung dòng này (12 tệp tracked sửa GỒM check-motion, không gọi là 13).
3. **Kiểm dist aria-label (mới)**: `check-g06` G6-D1/G6-D2 bổ sung — SVG `#exploded-svg` giữ `role="img"`, không `aria-hidden`; **aria-label render không rỗng/không toàn khoảng trắng, đúng ngôn ngữ** (VI đầu "Sơ đồ giải phẫu", EN đầu "Anatomy diagram"). Mutation thêm 2 ca: aria rỗng VI → G6-D1, aria rỗng EN → G6-D2 — **bộ mutation 10/10 ĐẠT** (`mutation-ket-qua.json`: C0 + C-b…C-f + C-g1/g2 + dọn).
4. **Số ca check-g06**: **7 nguồn + 6 dist = 13 ca tổng** (báo cáo trước ghi "nguồn 7/7 + dist 13/13" là sai cách đếm — đã sửa).
5. **Bổ sung bằng chứng tương tác** (mục 6 cập nhật): bàn phím EN, RM 3D trước tải/giữa phiên VI+EN, ẩn trang + WebGL (mô phỏng có ghi rõ), rời viewport (đã thử, blocker ghi rõ).
6. **Ma trận**: viết lại bảng kết quả theo ĐÚNG mã ca (G6I-7 chuỗi EN sau tương tác; G6I-8 = 2D; G6I-9 = 3D; G6I-10 = nhãn trợ năng; G6I-11 = bàn phím) — bảng dự kiến giữ làm lịch sử, bảng kết quả hiện hành không mâu thuẫn.
7. **Git**: 12 tệp tracked sửa GỒM check-motion (không gọi 13).

## 0-ter. Chốt giới hạn RM-D sau TXN-20260913-36

GPT Work chấp thuận giữ RM-D VI/EN ở trạng thái **"CHƯA ĐỦ BẰNG CHỨNG — GIỚI HẠN ĐƯỢC CHẤP THUẬN TRONG G06-A"**. Không yêu cầu thử máy khác trong vòng này. Logic chuyển động không thay đổi so với nền `f42c11e`; không chứng nhận khả năng khôi phục tween sau khi gỡ reduce. RM-B giữ quyết định giới hạn trước đây.

**Bằng chứng RM-D hiện hành (nhiều lượt thử, 2 ca VI/EN):**

| Tệp bằng chứng | Kết quả | Nguyên nhân |
|---|---|---|
| `pw-rm3-stdout.txt` (pixel giải mã) | 2 ca VI/EN **dat:false** — khac(ghép,trung) chỉ 3,39/3,34% (gần noise 2,81–3,14%), khac(trung,đích) = 0,00% | nền capture chưa ổn định tại thời điểm chụp; không phân biệt được tween vs noise |
| `pw-rmd3-stdout.txt` (CDP clip) | 2 ca **CHUA_KIEM** — `Page.captureScreenshot: Invalid parameters` | lỗi CDP clip trên headless |

**Không kết luận lỗi sản phẩm** từ phép đo chưa hợp lệ. Không gom hai nguyên nhân thành một.

**Bảng RM-D draw-count cũ (pw-g06-rm2.js RM-D) — ĐÃ THAY THẾ, không dùng để tính ĐẠT:**

| Ca cũ | Kết quả cũ | Ghi chú |
|---|---|---|
| RM-D (vi) draw-count | ĐẠT (cũ) | **THAY THẾ** — draw count không chứng minh vị trí lớp hay tween (pw-g06-rm2.js có banner đánh dấu) |
| RM-D (en) draw-count | ĐẠT (cũ) | **THAY THẾ** |

## 1. Mục tiêu và phạm vi thực hiện

Giữ `/giai-phau/` và tạo `/en/anatomy/` với đầy đủ trải nghiệm 2D/3D, nội dung, điều khiển, trợ năng, lỗi và đường đọc tiếp đúng ngôn ngữ; đồng thời sửa các câu VI đã duyệt để hai bản không mâu thuẫn. Chỉ đụng đúng danh sách tệp được phép — không cần tệp ngoài danh sách.

## 2. Danh sách tệp thật và lý do

**Tạo (4):**
| Tệp | Lý do |
|---|---|
| `src/data/anatomy-parts.ts` | Nguồn duy nhất 12 bộ phận hai ngôn ngữ (id, layer, icon, link {vi,en}, vi{name,role}, en{name,role}) + ANATOMY_LAYERS + ANATOMY_UI (chuỗi runtime). Câu theo bảng claim bản 3 |
| `src/components/anatomy/AnatomyExperience.astro` | Khuôn chung: hero, tablist 2D/3D, hộp lỗi, section 12 lớp + khối chữ ba vai (bỏ `#wev-energy` thay bằng khối chữ này), bảng tổng kết (bỏ cột vật liệu), CTA; blob `#anatomy-i18n`; script chọn tab + mở engine với lang |
| `src/pages/en/anatomy.astro` | Wrapper EN mỏng (title/description EN) |
| `scripts/check-g06-anatomy.mjs` | Bộ kiểm g06: nguồn G6-1…G6-7 + dist G6-D1…D6; `--source-only` cho mutation; esbuild transpile — không phụ thuộc Git |

**Sửa (12):**
| Tệp | Nội dung sửa |
|---|---|
| `src/components/WatchExplodedView.astro` | Nhận `lang`; dữ liệu từ anatomy-parts (data-name/data-name-alt/data-role/data-link theo lang); **bỏ `#wev-energy` + marker `wevArrowUp` + CSS opacity/reduced-motion liên quan**; nhãn lớp/kính/chuỗi truyền động/bánh lắc theo lang; script đọc chuỗi runtime từ blob |
| `src/components/WatchExplodedView3D.astro` | Nhận `lang`; nút nhanh từ anatomy-parts (data-name/role/link/icon); toàn bộ nhãn điều khiển/tải/ghi chú theo lang |
| `src/pages/giai-phau.astro` | Wrapper mỏng VI (BaseLayout + `AnatomyExperience lang="vi"`) |
| `src/scripts/exploded3d.ts` | `mountExploded3D(root, lang='vi')` + bảng chuỗi ENGINE_UI (canvas aria, thẻ mặc định, tách/ghép/mode, lỗi WebGL/khung) — 7 vị trí chuỗi, đúng kiểm kê §2.4 hồ sơ chặng 1 |
| `src/i18n/contentRoutes.ts` | +1 cặp `{ vi: '/giai-phau', en: '/en/anatomy/' }` vào STATIC_PAIRS |
| `src/i18n/ui.ts` | OG_IMAGE_MAP + `/en/anatomy` → og-lich-su.jpg (ảnh hiện có) |
| `scripts/check-3d-loading-budget.mjs` | Mục 2: điểm tìm dynamic import chuyển sang `AnatomyExperience.astro` (path `../../scripts/exploded3d`); mục 4: thêm route EN vào danh sách bảo vệ; mục 5: kiểm "không khởi tạo engine sớm" cho CẢ `/giai-phau/` và `/en/anatomy/`. Không xóa/làm yếu mục nào |
| `scripts/check-evolution-data.mjs` | SKIP_FILES += `anatomy-parts.ts` (chỉ mục này) |
| `scripts/check-g01-navigation.mjs` | Logic: +2 ca cặp giải phẫu hai chiều; dist: exploreViOnly còn `/so-sanh`, +ca anchor `/en/anatomy/` không nhãn (hai nav), +2 khối cặp giải phẫu (switcher/hreflang/aria-current), cập nhật 2 ca Explore trang escapement |
| `scripts/check-english-launch.mjs` | REQUIRED_EN += `/en/anatomy/` (61 → 62 mục) |
| `scripts/check-motion-accessibility.mjs` | **Bổ sung theo chấp thuận TXN-20260913-30**: quy tắc 4/5 chuyển điểm đọc sang `AnatomyExperience.astro` + xác nhận cả hai wrapper; chấp nhận aria-label dạng biểu thức JSX (kiểm dist mới ở check-g06 chứng minh nhãn render) |
| `package.json` | `check` + check-g06; `build` + check-g06 dist; lệnh `check:g06` |

**Hồ sơ:** `pham-vi-tich-hop.md` (dòng sót "Vật liệu điển hình — chờ duyệt" → **đã duyệt bỏ cả VI/EN**; dòng check-g06 bỏ "(chờ duyệt)"); ma-tran + kết quả chặng 2; `cong-noi-dung-claim.md` giữ bản 3 là hiện hành (lịch sử bản 1/2 đánh dấu THAY THẾ).

Không đụng: `astro.config.mjs`, `public/`, bài viết, CSP, analytics, hero trang chủ, `output/playwright/`.

## 3. Nội dung: đối chiếu câu duyệt → nơi render

Mọi câu theo `cong-noi-dung-claim.md` bản 3. Nơi render (kiểm bởi G6-D1/D2 đối chiếu data-role dist ↔ anatomy-parts, và G6-4 cấm chuỗi):

- C1 mặt số: VI "Hiển thị các chữ số, vạch khắc và thương hiệu — nơi người dùng đọc giờ trực tiếp." / EN "Shows the numerals, indices and brand — the surface you read the time from." → 2D data-role + 3D nút.
- C2 kính: "Lớp trong suốt bảo vệ mặt số và kim." / "The transparent layer that protects the dial and hands." → 2D + 3D.
- C3 kim giây, C8 kim giờ, C12 kim phút: mô tả chức năng, chu kỳ gắn sơ đồ ("trong sơ đồ này…") → 2D + 3D.
- C4 bánh răng: "Loạt bánh răng truyền năng lượng từ thùng cót đến bộ thoát và lái các kim." / EN tương ứng — không số, không "chia tốc".
- C5 hero: "Năng lượng đi từ thùng cót qua bộ bánh răng tới bộ thoát — nơi chuyển động của bộ bánh răng bị chặn và nhả theo từng nhịp để nuôi bộ điều tiết; kim ở trên cùng là phần hiển thị…" (bỏ "ở đáy", bỏ "tiêu hao (ma sát, tiếng tíc-tắc)"); cột năng lượng bỏ đoạn tiêu hao; cột thời gian tách ba vai (không "bộ thoát nhả bánh lắc", không "releases the balance").
- C6: "Sơ đồ tách lớp minh họa 12 bộ phận được chọn để giải thích cấu trúc; không đại diện đầy đủ cho một calibre cụ thể." (VI/EN) → section + thẻ mặc định 2D/3D + nhãn "12 bộ phận được chọn".
- C7 đáy vỏ: chỉ kiểu đáy + "kiểu đáy tự nó chưa đủ để kết luận khả năng chống nước" / "(an exhibition caseback)… does not determine water resistance".
- C9: bỏ "trái tim" — bộ thoát dùng định nghĩa FHH; CTA đổi "♥ Bộ thoát" / "♥ The escapement".
- C10 bánh lắc: "bộ điều tiết — mỗi chu kỳ qua lại (oscillation) gồm hai lần rung (vibration)." / "…form the regulating organ — each to-and-fro oscillation comprises two vibrations."
- Chốt nhãn: kính "KÍNH"/"CRYSTAL"; vai bảng "Điều tiết"/"Regulation", "Đóng vỏ"/"Case closure"; **bỏ cột "Vật liệu điển hình" cả VI/EN**.

## 4. Kết quả build và checker

- **Build chốt** (`log-build-chang2-v5.txt`, vòng sửa 2): `npm run build` **exit 0** — **288 HTML** (287+1 đúng dự kiến), **66 HTML EN**, sitemap-0 **287 URL** (đếm tách sitemap index), astro check **0 lỗi/0 cảnh báo/4 hints = baseline**, **20.967 link nội bộ 0 hỏng**, 0 dòng LỖI trong log.
- **check-g06** (**7 nguồn + 6 dist = 13 ca**): dữ liệu 12 bộ phận đủ hai ngôn ngữ; link cấu trúc đúng (bánh lắc = G04; crystal/dial/caseback null); cặp route; 16 chuỗi cấm sạch; blob + engine lang; nhãn chốt; dây nối byId/p.*; dist data-role khớp dữ liệu từng bộ phận; không rò tiếng Việt trên EN (loại tên riêng "ĐỒNG HỒ CƠ" + nhãn sitewide "Tiếng Việt"/"Lên đầu trang"); title/OG; link nội bộ; sitemap; 0 chunk engine trong HTML ban đầu.
- **check-3d**: mục 2 quét AnatomyExperience (dynamic import duy nhất); mục 4/5 bảo vệ cả `/giai-phau/` lẫn `/en/anatomy/` — ĐẠT.
- **Hồi quy**: toàn chuỗi check + build ĐẠT (G01/G02/G04/G05 và các route ngoài giải phẫu) — không làm yếu checker nào.

## 5. Mutation (sandbox cô lập, `mutation-g06.mjs` → `mutation-ket-qua.json`) — 10/10 ĐẠT

C0 bản sạch exit 0 · C-b xóa `en.role` bộ thoát → **G6-1** · C-c `data-role` chữ cứng thay byId → **G6-7** · C-d1 xóa cặp route → **G6-3** · C-d2 đích giả `/en/not-a-page/` trong `data-link` dist → **G6-D4** · C-e "80%" tái xuất hiện → **G6-4** · C-f chèn chunk engine vào HTML ban đầu → **G6-D6** · dọn sandbox. (Sandbox copy toàn bộ dist 22MB để D4/D6 kiểm đúng ngữ cảnh; không secret.)

Phát hiện nhờ mutation: G6-D4 ban đầu chỉ quét `href=` — link giả trong `data-link` (gán runtime) lọt; đã sửa D4 quét cả `href` + `data-link`, xác minh trên bản sạch (ĐẠT) và bản biến đổi (bắt đúng).

## 6. Kiểm trình duyệt (preview 127.0.0.1:4405; chặn Google Fonts — ghi rõ trong mọi phép đo mạng/ảnh)

- **VI 2D + bàn phím (pw-a1): 8/8 ĐẠT** (kỳ vọng cập nhật theo nguồn chung: đếm `data-name`; link bánh lắc G04).
- **VI 3D (pw-a2): 8/8 ĐẠT + 3 CHƯA KIỂM** (idle-capture đầu; rời viewport; ẩn trang — giới hạn phương pháp headless, giữ từ chặng 1).
- **Môi trường VI (pw-b): 5/5 ĐẠT** — RM 2D trước tải/giữa phiên; no-JS; lỗi engine + Thử lại.
- **EN (pw-en): 10/10 ĐẠT** — mặc định EN; chọn/thẻ/tách/đặt lại EN sau tương tác; menu Explore (Anatomy không nhãn, Compare còn nhãn); 3D EN (canvas aria EN, chọn thùng cót → /en/mechanisms/power-reserve/, Escape, tách/đặt lại); lỗi engine EN ("The 3D model could not load…", Retry) + gỡ chặn mở được.
- **Môi trường EN (pw-env-en): 4/4 ĐẠT** — RM 2D trước tải (lớp cuối tới đích 4ms — không transition); RM giữa phiên; RM 3D trước tải (tách 0ms; chuyển động bật chủ động vẫn chạy — thiết kế: RM không chặn thao tác người dùng, ghi rõ); no-JS EN.
- **Bổ sung vòng sửa 2 (TXN-20260913-32)** — RM 3D đo bằng SO PIXEL GIẢI MÃ (`pw-g06-rm3.js`, VI+EN, decode PNG → getImageData, ngưỡng kênh >24): RM-A tách dưới reduce: khung@150ms khác khung ghép 45,33% pixel, khung@150ms == khung@1200ms (0,00%) → **đến đích ngay, không tween**; RM-C ghép→tách lại cùng hành vi; RM-D (không reduce): **CHUA_KIEM** — hai phép thử VI/EN (pw-rm3: khac(trung,đích)=0,00% — trung gian==đích; pw-rmd3: Page.captureScreenshot Invalid parameters) không đủ bằng chứng; xem mục 0-ter bảng RM-D. RM-B: chuyển động người-dùng-bật TIẾP TỤC sau reduce giữa phiên — **GIỚI HẠN ĐƯỢC CHẤP THUẬN** theo TXN-20260913-30 (không chứng nhận tự dừng theo thay đổi tùy chọn).
- **Bổ sung vòng sửa 1** (`pw-bs-kb`, `pw-g06-rm3d`, `pw-g06-webgl`, `pw-bs-life2`):
  - Bàn phím EN 3/3 ĐẠT: End/Home roving tablist; Enter chọn Escapement (link /en/mechanisms/escapement/); Space chọn Gear train; Escape trên 2D không đổi chọn (chỉ đóng tooltip — thiết kế); reset qua phím → "Assembled".
  - RM 3D giữa phiên (chuyển động đang chạy) VI+EN: tách áp dụng ngay (mode "Đang tách" flip ≤150ms, nhãn "Ghép lại", aria-pressed=true); chuyển động người-dùng-bật GIỮ NGUYÊN trạng thái sau reduce (engine không có listener reduced-motion — hành vi hiện hành, ghi từ mã + aria).
  - RM 3D trước tải VI: bất thường — mode-flip timeout 5s sau một cú click (probe riêng cho thấy toggle hoạt động ổn định khi chạy độc lập) → **CHƯA KIỂM**, chờ xét; EN đã ĐẠT (env-en, 0ms).
  - WebGL không khả dụng (MÔ PHỎNG getContext→null trong phiên cô lập, ghi rõ): engine ném lỗi → role=alert đúng chữ + tự về 2D + nút Thử lại, không canvas — ĐẠT.
  - Rời viewport bằng captureBeyondViewport: **TREO** (blocker ghi biên bản) — CHƯA KIỂM.
  - Ẩn trang bằng override document.hidden + hashCanvas CDP: **TREO/flaky ở bước capture trong phiên này** — CHƯA KIỂM (phương án đã thử: CDP capture trong phiên; hash trước/sau; override getter).
- **RM 3D giữa phiên: CHƯA KIỂM** (chưa nằm trong kịch bản đã chạy — ghi ở ma trận G6I-16). **Rời viewport/ẩn trang/WebGL-thiếu: CHƯA KIỂM** — giới hạn phương pháp headless (CDP Frames vô dụng; document.hidden không lật; chưa có cách tắt WebGL), không suy chỉ máy GPU.

## 7. Bố cục và mạng

- **Bố cục 32 tổ hợp** (`boc-cuc-ket-qua.jsonl` + `shots/` 32 ảnh): 4 viewport (320/768/1024/1440) × 2 theme × 2 ngôn ngữ × **2 panel (2D và 3D)** — scrollWidth ≤ innerWidth mọi tổ hợp; đã tự mở xem ảnh mẫu (768-dark-EN-3D, 320-light-VI-2D…).
- **Đo mạng** (`do-tai-ket-qua.json`; phép đo CÓ chặn Google Fonts — ghi rõ, không phải tổng tải bình thường): cold **VI 6 request/235.702 B giải mã** và **EN 6 request/234.054 B** — **0 chunk 3D trước thao tác**; sau mở 3D **+2 request** (exploded3d 526.732 B + OrbitControls 19.798 B giải mã; gzip -9 từ dist: 133.665 + 4.440 = **138.105 B**). Byte truyền thực chưa đo được (chunked). Điều kiện duyệt "không nạp sớm 3D" đạt cả hai bản; tổng HTML/CSS/JS được đo và giải thích, không đặt điều kiện "tổng byte bằng nền".

## 8. Giới hạn và điểm ghi nhận

- **Cập nhật vòng sửa 2 → vòng sửa 3 (TXN-20260913-34)**: RM 3D kiểm bằng **SO PIXEL GIẢI MÃ** (`pw-g06-rm3.js` — decode PNG → getImageData → đếm pixel chênh kênh >24; bỏ hash base64 và chỉ-draw-count cho khía hình học):
  - RM-A trước tải VI/EN: khung@150ms khác khung ghép **45,33%** pixel và GIỐNG khung@1200ms (0,00%) → đến đích ngay, không tween (đã chứng minh bằng hình học render).
  - RM-C ghép → tách lại: cùng hành vi, đích trùng RM-A.
  - RM-B giữa phiên (chuyển động đang chạy): **GIỚI HẠN ĐƯỢC CHẤP THUẬN** — reduce giữa phiên KHÔNG tự tắt chuyển động người-dùng-bật (draw +327.680/1,5s tiếp tục; engine không có listener reduced-motion — đã tồn tại ở nền f42c11e, không do G06-A); không chứng nhận tự dừng theo thay đổi tùy chọn.
  - RM-D không-reduce: **CHUA_KIEM** — hai ca VI/EN nhiều lượt thử không đủ bằng chứng (chi tiết ở mục 0-ter); không kết luận tween hoạt động hay lỗi sản phẩm.
  - Rời viewport (cuộn thật): draw ngoài cuộn +0 → vào lại +61.440 — ĐẠT. Ẩn trang (MÔ PHỎNG document.hidden + visibilitychange): draw +0 khi ẩn → gỡ +81.880 — ĐẠT.
  - Phép thử hash/luôn-đúng cũ: KHÔNG ĐỦ CHỨNG MINH, đã thay thế (pw-bs-rm.js, pw-g06-bs.js có banner).
- Lần capture đầu sau mount trả bề mặt chưa tổng hợp — đã ghi chặng 1 (không còn ảnh hưởng: phép thử mới không dùng capture cho ca đó).
- ĐÃ KIỂM ĐẠT thêm ở vòng sửa 1: bàn phím EN 3/3 (End/Home/Enter/Space/Escape-2D/reset-phím); WebGL không khả dụng bằng MÔ PHỎNG getContext→null trong phiên cô lập (alert + tự về 2D + Thử lại) — ĐẠT.
- Environment: font ngoài bị chặn trong phép đo/ảnh (ghi rõ); tắt chuyển động bằng el.click ở một số ca (pipeline chuột chết đói khi vòng vẽ liên tục) — phân biệt thao tác thật/mô phỏng trong từng ca; 35 tiến trình chrome mồ côi từ các lượt crash đã làm méo các phép thử (đã dọn, ghi nhận ảnh hưởng).
- D4 checker đã siết sau mutation (quét thêm data-link) — không làm yếu, ngược lại mạnh hơn khuôn g05 cũ.
- Không nhận bằng chứng chặng 1 làm bằng chứng mã tích hợp: mọi phép thử chặng 2 chạy lại trên dist mới.

## 9. Trạng thái Git

- HEAD `f42c11e` — **KHÔNG commit, KHÔNG push, KHÔNG deploy; staged trống**; tracked modified đúng 12 tệp mục 2; tạo mới đúng 4 tệp mã + hồ sơ + `output/g06-anatomy-en-integration/`.
- `git diff --check` rỗng; whitespace 0 dòng (md/json/js/log); quét khuôn nhạy cảm (sk-/ghp_/AKIA/-----BEGIN): 0; không lưu cookie/token/storageState; PNG không đọc như văn bản.

## 10. Kết luận

**G06-A chặng 2 sau vòng sửa 2 (phương pháp kiểm, TXN-20260913-32/34/36): diagnostics = baseline (0 lỗi/0 cảnh báo/4 hints, log v5); RM-A/C VI+EN có bằng chứng pixel đã kiểm; RM-D VI/EN CHƯA ĐỦ BẰNG CHỨNG — GIỚI HẠN ĐƯỢC CHẤP THUẬN TRONG G06-A; không chứng nhận khôi phục tween sau gỡ reduce. RM-B giữ giới hạn đã chấp thuận. Vòng đời (rời viewport/ẩn trang/WebGL-mô phỏng) ĐẠT; các phép thử hash/luôn-đúng cũ đã thay thế và đánh dấu. DỪNG chờ GPT Work nghiệm thu độc lập.** Chưa commit/push/deploy. Không chuyển G06-B/C; đánh giá nhân rộng G04 do GPT Work phụ trách để trình anh Vinh.
