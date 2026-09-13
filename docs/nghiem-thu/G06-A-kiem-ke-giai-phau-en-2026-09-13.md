# G06-A chặng 1 — Kiểm kê, chuẩn hóa đề xuất nội dung và xác lập phạm vi triển khai "Giải phẫu EN" (2026-09-13)

- **Giao dịch:** TXN-20260913-18 (giao việc) / 19 (bàn giao) / 21 (vòng sửa 1) — danh mục DHC-G05G09-20260913 v1.0.0. G06-A chặng 1: chỉ đọc mã/tài sản, kiểm chứng và tạo hồ sơ.
- **Nền:** `f42c11e` (main, khớp remote). Tracked sạch, staged trống, không đụng tệp untracked có trước (giữ nguyên `output/playwright/` của GPT Work).
- **Kết luận:** chặng 1 **chưa đạt lần gửi 1**; vòng sửa 1 (TXN-20260913-21) đã xử lý các điểm chặn — **DỪNG chờ GPT Work duyệt lại cổng nội dung và phạm vi.** Chưa tạo route EN, chưa sửa nội dung/mã website, chưa commit/push/deploy. Không mở G06-B/C, G07, G08, G09. G06-A CHƯA hoàn tất — chỉ hồ sơ chặng 1 này (sau duyệt lại) đạt.

## 0-bis. Vòng sửa 1 sau nghiệm thu TXN-20260913-21

GPT Work nghiệm thu lần 1: **chưa đạt** — không sửa mã, không commit/push. Các điểm chặn và cách xử lý (kết quả lịch sử bị thay thể đánh dấu rõ):

1. **Cổng nội dung viết lại** — `cong-noi-dung-claim.md` **bản 2 thay thế toàn bộ bản 1**: ba mức bằng chứng (nội dung repo / nguồn đọc trực tiếp / chưa xác minh); bổ sung **nguồn đọc trực tiếp ngày 2026-09-13**: FHH Escapement ("fitted between the gears and the regulating organ… suspend the gears' motion at regular intervals and to supply energy to the balance") + FHH Balance ("Combined with the spiral it forms the regulating organ… each oscillation comprises two vibrations"). Theo quyết định GPT Work: C1 bỏ 80% (mô tả chức năng); C2 mô tả tối thiểu — **không dùng "nearly scratch-proof / only diamond or another sapphire"** (bản 1 bị loại); C3 bỏ "trực tiếp", gắn sơ đồ; C4 bỏ số, không "chia tốc"; **C5 tách ba vai bộ truyền/bộ thoát/bộ điều tiết — bỏ chuỗi tuyến tính qua bánh lắc kết thúc ở kim; không viết "releases the balance"**; kèm đề xuất sửa hình `#wev-energy` (rút mũi tên về lớp 4 + nhánh "nhịp") — **phần hình này đã bị vòng 3 THAY THẾ bằng quyết chốt bỏ đường (xem "Bổ sung vòng 3")**; C6 **câu chuẩn không số** ("12 bộ phận được chọn… không đại diện đầy đủ cho một calibre cụ thể") — "hàng trăm"/"vài chục milimet"/"điển hình" của bản 1 đều bị loại; C7 chỉ kiểu đáy (bỏ cả "kín = chống nước tốt" lẫn "chỉ nằm ở gioăng"), dùng "exhibition caseback" không dịch "open"; C8 bỏ "ngắn và dày nhất"; C9 nhãn chức năng, bỏ "trái tim"; C10 "bộ điều tiết" + phân biệt oscillation/vibration; C11–C12 chức năng ngắn. Mọi cặp câu VI/EN soạn đầy đủ để duyệt; đã rà các câu còn lại (thùng cót, rotor, bảng tổng kết, tooltip…) cùng tiêu chuẩn.
2. **Phạm vi kỹ thuật chốt lại** — `pham-vi-tich-hop.md` **bản 2 thay thế bản 1**: component duy nhất `src/components/anatomy/AnatomyExperience.astro` (bỏ kiểu "hoặc" của bản 1); **đưa `exploded3d.ts` vào danh sách sửa với kiểm kê chuỗi động đầy đủ** (533–535, 562–565, 601–607, 611–619, aria-label 98–101, lỗi 66/91 — bản 1 ghi thiếu, chỉ nêu aria-label); **đưa `check-3d-loading-budget.mjs` vào phạm vi cập nhật** (đổi điểm tìm dynamic import sang component mới, bảo vệ CẢ `/giai-phau/` và `/en/anatomy/`, không xóa/làm yếu mục nào); đồng bộ `check-evolution-data` (SKIP_FILES riêng `anatomy-parts.ts`), `check-g01`, `check-english-launch` (61 → 62 mục — số 60 của lần đếm đầu là lỗi thước đo, bỏ sót mục gốc '/en/'), `package.json`; OG dùng ảnh hiện có; link bánh lắc chốt sang chương G04 (`/co-che/day-toc-banh-lac` ↔ `/en/mechanisms/balance-and-hairspring/`); không thêm link kính, không tạo bài EN mới.
3. **Ma trận viết lại** — `ma-tran-nghiem-thu-du-kien.md` **bản 2 thay thế bản 1**: sửa số liệu (65 HTML EN hiện có → dự kiến 66; tách khỏi REQUIRED_EN **61 mục hiện có → 62** (lần đếm đầu báo 60 là lỗi regex bỏ sót mục gốc '/en/')); tách điều kiện "0 chunk 3D trước thao tác" khỏi "tổng byte trang" (điều kiện duyệt là không nạp sớm 3D; tổng HTML/CSS/JS chỉ đo và giải thích); thêm hồi quy VI + viewport 320/768/1024/1440 × 2 theme × 2 bản; tách reduced-motion 2D/3D, trước tải/giữa phiên (4 ca); chuỗi EN kiểm sau tương tác/reset/Escape/lỗi/thử lại; các ca hạn chế giữ CHƯA KIỂM với mô tả đúng giới hạn phương pháp (không suy "máy GPU thật").
4. **Bằng chứng mạng ghi lại đúng giới hạn** — `do-tai-ket-qua.json` cập nhật: phép đo **có chặn Google Fonts** (không phải tổng tải trang bình thường); phân biệt body giải mã / gzip tính từ dist / byte truyền thực tế (**chưa đo được** — content-length null do chunked; bỏ chú thích sai "preview không nén" vì bản ghi có content-encoding: gzip); request beacon lỗi ghi **"chưa đo được"** thay vì 0 rồi cộng vào tổng; nêu giới hạn thời gian quan sát (2,5s/1,5s) và tài nguyên loại khỏi phép đo (font ngoài, request ngoài bộ lọc, favicon).
5. **Đính chính phạm vi phép thử**: bằng chứng reduced-motion 39ms là phép thử **2D** — ma trận bản 2 tách riêng RM 3D trước tải/giữa phiên thành ca chưa kiểm; ghi rõ ca nào chỉ kiểm 2D (B: RM, no-JS), ca nào chưa kiểm 3D (A2: rời viewport, ẩn trang, WebGL-thiếu, capture đầu).

Các mục 5–7, 10 dưới đây giữ nguyên trừ chỗ ghi đè bởi bản mới: bảng claim (mục 5) → xem `cong-noi-dung-claim.md` bản 2; bảng link (mục 6) bổ sung quyết bánh lắc/kính → `bang-link-vi-en.md` bản 2; số liệu mạng (mục 7) → kèm giới hạn ở trên; ma trận (liên kết mục 12) → bản 2.

**Bổ sung vòng 2 (TXN-20260913-23)** — bốn điểm chốt thêm:
1. REQUIRED_EN là **61 mục** (đếm lại bằng script liệt kê từng mục; lần đếm đầu báo 60 do regex `(/en/[^']+)` bỏ sót mục gốc `'/en/'`); sau thêm Anatomy = **62**. Đã sửa ở biên bản (mục này), `pham-vi-tich-hop.md` (dòng check-english-launch) và `ma-tran-nghiem-thu-du-kien.md` (Số liệu nền + G6I-21).
2. `pham-vi-tich-hop.md` bổ sung dòng còn thiếu: **`src/i18n/contentRoutes.ts`** (+1 cặp `{ vi: '/giai-phau', en: '/en/anatomy/' }` vào STATIC_PAIRS; astro.config không sửa vì sitemap tự nhận qua ALL_PAIRS).
3. `cong-noi-dung-claim.md` §C5 làm rõ phương án hình: mũi tên chính **đổi điểm đầu lên thùng cót (lớp 3)** — rút ngắn mà giữ điểm đầu vùng đáy vỏ là chưa đủ; đoạn chính kết thúc lớp 4; nhánh thứ hai từ bộ thoát sang bánh lắc **biểu diễn việc cấp năng lượng cho bánh lắc định kỳ** (FHH "supply energy to the balance"), vẽ khác kiểu đường chính — khía chặn-nhả (điều tiết) thể hiện bằng nhãn vai bộ thoát, không bằng nhánh vẽ.
4. `pw-g06-do-tai.js` dòng 4–5: chú thích sai "astro preview phục vụ KHÔNG nén" đã bị gỡ ở vòng 1 trong JSON nhưng **còn sót trong script** — đã sửa chú thích script (kèm ghi chú [Sửa chú thích ở vòng 2…] ngay tại chỗ; dữ liệu đo và log chạy gốc không đổi). `pw-g06-do-tai-stdout.txt` (stdout nguyên văn lượt chạy gốc) **giữ nguyên** — đó là bằng chứng lịch sử về mã đã chạy tại thời điểm đo; phần diễn giải đúng nằm ở script (đã sửa) + `do-tai-ket-qua.json`.

**Đính chính tuyên bố vòng 2:** báo cáo vòng 2 viết "cả 4 điểm đã xử lý" — **chính xác hơn là 3/4 nhóm** (số 61→62, contentRoutes.ts, chú thích đo mạng đã đúng; nhóm nội dung — C5 và các quyết kèm theo — chưa áp dụng đúng quyết định GPT Work). Đã xử lý ở vòng 3 dưới đây.

**Bổ sung vòng 3 (TXN-20260913-25)** — hoàn thiện nhóm nội dung còn thiếu:
1. **C5 hình — thay hai đề xuất vẽ bằng quyết định chốt** (`cong-noi-dung-claim.md` **bản 3** thay bản 2): khi tích hợp **bỏ riêng đường `#wev-energy`** (markup `<g id="wev-energy">` + marker `wevArrowUp` + CSS opacity/reduced-motion; marker chỉ bỏ nếu không còn nơi sử dụng); **giữ `#wev-axis` và hình các bộ phận**; dùng **khối chữ VI/EN cạnh sơ đồ** phân biệt bộ truyền/bộ thoát/bộ điều tiết theo C4/C9/C10; **không thêm sơ đồ dòng năng lượng mới, không thay hình học/hoạt ảnh 3D**; kiểm grep không để tham chiếu SVG mất đích.
2. **Câu C5 hoàn thiện**: hero VI/EN cùng đối tượng "thùng cót / mainspring barrel" — bỏ "ở đáy / at the bottom"; bỏ đoạn "tới nơi bị tiêu hao (ma sát, tiếng tíc-tắc)" và câu EN tương ứng; cặp câu hero + cột năng lượng/thời gian viết đầy đủ nguyên văn trong `cong-noi-dung-claim.md` bản 3 §C5.
3. **Chốt các mục kèm theo**: bỏ cột "Vật liệu điển hình" **cả VI và EN**; nhãn kính SVG **"KÍNH" (VI) / "CRYSTAL" (EN)**; vai bộ điều tiết **"Điều tiết" / "Regulation"**; vai đóng vỏ **"Đóng vỏ" / "Case closure"** — không còn "VI/EN dùng chung CRYSTAL", "Keeps the beat", "Seals the case" hay câu hỏi giữ/bỏ trong phương án hiện hành.
4. **Đồng bộ**: `pham-vi-tich-hop.md` (dòng WatchExplodedView + bullet hình chốt), `ma-tran-nghiem-thu-du-kien.md` (+ca G6I-4b hình, G6I-4c nhãn/bảng).

## 1. Mục tiêu và điểm dừng

Chuẩn bị hồ sơ đủ để GPT Work duyệt triển khai bản Giải phẫu EN gồm trải nghiệm 2D + 3D (không chỉ dịch menu). Điểm dừng đúng yêu cầu: mọi sửa đổi chỉ nằm trong `docs/nghiem-thu/G06-A-kiem-ke-giai-phau-en-2026-09-13.md` + `output/g06-anatomy-en-audit/`.

## 2. Kiểm tra nền

- HEAD `f42c11e0c3981d74a551e8657792fc676b42c0c5` = `origin/main` — khớp dự kiến, không reset/ghi đè gì.
- `git status --porcelain`: 0 tệp tracked modified; staged 0; untracked có trước giữ nguyên (gồm `output/playwright/`).
- Phân biệt bằng chứng: build nền và các phép thử trình duyệt/mạng dưới đây là **phép thử mới của chặng 1**; các con số raw/gzip chunk 3D từ `check-3d-loading-budget` trong log build là **kế thừa công cụ có sẵn** (đối chiếu chéo, không gọi là phép thử mới).

## 3. Phạm vi đọc và phát hiện cấu trúc

Đọc đủ các tệp bắt buộc: `giai-phau.astro`, `WatchExplodedView.astro`, `WatchExplodedView3D.astro`, `exploded3d.ts`, `contentRoutes.ts`, `ui.ts`, `Header.astro`, `check-3d-loading-budget.mjs`, `check-g01-navigation.mjs`, `check-english-launch.mjs` + các bài/nguồn link đích (bo-thoat, tru-cot, chuyen-dong-co, len-day-tu-dong, kinh-dong-ho, day-toc-banh-lac ×2, perpetual-calendar, chong-nuoc, muc-chong-nuoc, dung-vanh-lan). Chi tiết đầy đủ: `ke-kien-bang-chuoi.md`.

Phát hiện cấu trúc trọng yếu (đối chiếu cấu trúc mã thật, không theo comment):
1. **3 bản dữ liệu bộ phận độc lập đã lệch chữ**: mảng `parts` frontmatter 2D (chỉ cấp id/nameVi/icon cho nút nhanh), `data-role` trên SVG 2D (nguồn mô tả hiển thị), mảng `parts` 3D (cấp đầy đủ cho nút + engine đọc lại). Comment 3D viết "cùng nguồn với bản 2D" — **sai thực tế**. Khuyến nghị: `src/data/anatomy-parts.ts` một nguồn, hai ngôn ngữ.
2. Mô tả có độ mạnh khác nhau giữa 2D/3D (bánh lắc 3D nói "quyết định độ chính xác", 2D không; đáy vỏ 2D gán "chống nước tốt", 3D trung tính).
3. Engine 3D đọc dữ liệu từ DOM (data-* trên nút) — đổi nguồn dữ liệu không đụng engine; engine chỉ có 3 chuỗi riêng (DETAIL_DEFAULT_ROLE, canvas aria-label, thông báo lỗi).
4. Chưa có cặp route cho `/giai-phau` — switcher đang là hộp thoại "chưa dịch"; menu Explore EN gắn nhãn "Vietnamese only" (khuôn D2).

## 4. Kiểm kê bộ phận, chuỗi, thao tác

Bảng 12 bộ phận (2D↔3D, khác biệt từng dòng), toàn bộ chuỗi hiển thị/trợ năng theo tệp (Astro tĩnh, mảng frontmatter, data-* SVG, chuỗi TS động, Header/OG), nguồn phát sinh chuỗi, và bảng thao tác/trạng thái đối chiếu kết quả thật: **`ke-kien-bang-chuoi.md`**.

## 5. Cổng nội dung trước dịch

**Bản chờ duyệt hiện hành: `cong-noi-dung-claim.md` bản 2 (vòng sửa 1)** — 12 claim với quyết định cuối của GPT Work và cặp câu VI/EN đầy đủ; ba mức bằng chứng; nguồn đọc trực tiếp FHH Escapement/Balance (trích nguyên văn, URL, ngày 2026-09-13). Tóm tắt:

| Claim | Quyết định chốt |
|---|---|
| C1 80% diện mạo | bỏ số, mô tả chức năng |
| C2 sapphire | mô tả tối thiểu (lớp bảo vệ); vật liệu/hiệu năng cần nguồn trực tiếp đủ phạm vi |
| C3 kim giây | bỏ "trực tiếp"; "một vòng/phút" gắn sơ đồ |
| C4 "4 bánh răng" | bỏ số; bỏ "chia tốc" |
| C5 quan hệ nguyên lý | tách bộ truyền / bộ thoát (chặn-nhả bộ bánh răng theo chu kỳ, cấp năng lượng cho bánh lắc — FHH) / bộ điều tiết; bỏ tuyến tính "qua bánh lắc → kim"; **hình chốt: bỏ `#wev-energy`, dùng khối chữ ba vai** (vòng 3) |
| C6 số chi tiết/đường kính | câu chuẩn không số: "12 bộ phận được chọn… không đại diện đầy đủ cho một calibre cụ thể" |
| C7 đáy vỏ | chỉ kiểu đáy (kín / cửa sổ quan sát — "exhibition caseback"); không kết luận chống nước |
| C8 "ngắn và dày nhất" | bỏ; chức năng + chu kỳ gắn sơ đồ |
| C9 "trái tim" | nhãn chức năng (FHH + BT) |
| C10 độ chính xác | "bộ điều tiết"; phân biệt oscillation/vibration |
| C11/C12 | chức năng ngắn, bỏ kết cấu chưa có nguồn |

Sửa câu VI là **bắt buộc để tránh mâu thuẫn VI/EN** — liệt kê công khai, chờ GPT Work duyệt từng cặp. Không dùng AI/ảnh làm chứng cứ; không tự suy cấu hình riêng thành quy tắc chung.

## 6. Bảng link VI/EN

**Quyết chốt ở vòng sửa 1** (`bang-link-vi-en.md` bản 2): link bánh lắc chuyển sang chương G04 đúng cặp — `/co-che/day-toc-banh-lac` ↔ `/en/mechanisms/balance-and-hairspring/` (áp dụng khi gộp nguồn ở chặng tích hợp); kính giữ `link: null`, không tạo bài EN mới để lấp chỗ trống. Kiểm hiện trạng: 9/9 đích phát sinh đều có cặp EN thật (`kiem-link-ket-qua.json` — bo-thoat→escapement, chuyen-dong-co→how-a-mechanical-watch-works, tru-cot→power-reserve, tu-dien/day-toc-banh-lac→/en/glossary/hairspring, tu-dien/perpetual-calendar→/en/glossary/perpetual-calendar, len-day-tu-dong→automatic-winding, co-che→/en/mechanisms). Kiểm nội bộ dist ≠ kiểm HTTP nguồn ngoài.

## 7. Đường cơ sở kỹ thuật (phép thử mới, môi trường: astro preview cục bộ + Playwright headless)

**Build nền** (`log-build-nen.txt`): `npm run build` **exit 0** — 287 trang, sitemap 286 URL, astro check 0 lỗi/0 cảnh báo/**4 hints = baseline**, 20.846 link nội bộ 0 hỏng. Số raw/gzip chunk 3D trong log là **kế thừa** từ checker có sẵn: exploded3d 513,5 KB raw/131,4 KB gzip + OrbitControls 19,3 KB/4,4 KB = 135,7 KB gzip, chỉ tải khi mở tab.

**Kiểm trình duyệt** (preview 127.0.0.1:4404; chặn font ngoài vì môi trường kiểm không truy cập được — ảnh dùng font dự phòng):
- **2D + bàn phím (A1): 8/8 ĐẠT** — mặc định đúng khung roving-tablist; chọn bộ phận nút/SVG; tách/đặt lại (nhãn, aria-pressed, viewBox, class exploded); ArrowLeft/Right + Enter.
- **3D (A2): 8/8 ĐẠT + 3 CHƯA KIỂM** — mở chủ động (canvas + aria-label, loading ẩn, chuyển động mặc định TẮT); idle không vẽ lại; chọn nút + raycast click canvas; xoay nút ×8 (hash toàn canvas đổi), zoom (đổi), kéo chuật (đổi, đứng yên sau khi nhả); tách/đặt lại; chuyển động bật/tắt (bật = click thật, tắt = el.click mô phỏng — ghi rõ). CHƯA KIỂM: rời-viewport ngừng sinh khung (CDP Frames=0 cả khi đang vẽ — metric không phản ánh ở headless), ẩn trang (document.hidden không lật), và lần capture đầu sau mount trả bề mặt chưa tổng hợp.
- **Môi trường/reduced-motion/no-JS/lỗi engine (B): 5/5 ĐẠT** — RM 2D trước tải tách tức thì 39ms; RM 2D đổi giữa phiên áp dụng ngay; no-JS đọc được 2D, 3D không mở; chặn chunk exploded3d → role=alert + tự về 2D + Thử lại (reload + cờ phiên) → gỡ chặn mở được thật. **Lưu ý vòng sửa 1: RM 39ms là phép thử 2D — RM 3D (trước tải/giữa phiên) CHƯA KIỂM** (ma trận G6I-15/16). **WebGL-thiếu thật: CHƯA KIỂM** (chưa có phương pháp tắt WebGL trên trình duyệt kiểm hiện tại).
- **Bố cục: 6 ảnh** (`shots/`) 320/1440 × sáng/tối + 3D mở + hộp lỗi; scrollWidth ≤ innerWidth mọi ca; đã tự mở xem 4 ảnh.
- **Đo mạng** (`do-tai-ket-qua.json` — **đã ghi lại đúng giới hạn ở vòng sửa 1**): phép đo **CÓ CHẶN Google Fonts** — không phải tổng tải trang bình thường; cold load **6 request** (HTML 104.859 + 2 CSS + 2 JS giải mã; beacon lỗi **chưa đo được body — không cộng 0 vào tổng**), **0 request Three/chunk 3D**; sau khi bấm 3D **thêm đúng 2 request** (exploded3d 525.814 B + OrbitControls 19.798 B giải mã; gzip -9 từ dist: 133.302 + 4.438 = 137.740 B). Ba kích thước phân biệt: body giải mã / gzip từ dist / **byte truyền thực tế chưa đo được** (content-length null do chunked; server phát content-encoding: gzip). Giới hạn thời gian quan sát (2,5s/1,5s) và tài nguyên loại khỏi phép đo (font ngoài, request ngoài bộ lọc, favicon) ghi trong JSON. Điều kiện duyệt chặng tích hợp là **không nạp sớm 3D** — không đặt yêu cầu "tổng byte không tăng".

## 8. Lỗi tiền tồn tại ghi nhận (không sửa, không mở G09)

1. `/_vercel/insights/script.js` 404 trên preview — beacon chỉ có production, tiền tồn tại.
2. Nhãn chữ SVG 2D đè nhau ở một số khổ (thấy ở ảnh 1440: "Bánh răng trung gian" đè "Bộ thoát" vùng giữa) — đề xuất tối thiểu: rà vị trí nhãn khi tích hợp EN (mobile đã ẩn nhãn, desktop chưa).
3. OG `/giai-phau` dùng chung `og-lich-su.jpg` — ghi nhận; ảnh riêng là việc tạo ảnh (ngoài chặng 2, trừ khi anh duyệt).
Không chứng nhận accessibility toàn site từ ma trận này.

## 9. Đánh giá nhân rộng G04 (phục vụ GPT Work ở cổng G06-C — không tự quyết)

Phát hiện trực tiếp từ phạm vi giải phẫu: (a) dữ liệu 12 bộ phận sẽ tập trung 1 tệp → có thể tái dùng cho chương kể chuyện nếu mở sau; (b) phần phụ thuộc ngôn ngữ nằm ở: mảng dữ liệu, data-role SVG, nhãn mode/toggle, DETAIL_DEFAULT_ROLE, canvas aria-label, thông báo lỗi — liệt kê đủ trong `ke-kien-bang-chuoi.md` §2; (c) điểm chồng với bộ thoát/bánh lắc: claim C3 (kim giây–bộ thoát) và C10 (bánh lắc–độ chính xác) cần đồng bộ với bài cơ chế khi sửa. Chặng này KHÔNG kiểm kê hàng loạt cơ chế, không tạo ảnh, không thêm chương.

## 10. Giới hạn và điểm ghi nhận

- Môi trường kiểm: headless software-GL — CDP Frames không phản ánh; document.hidden không lật khi đổi tab; lần capture đầu sau mount chưa tổng hợp; thời gian khung đầu 3D biến động 4–>10s; WebGL-thiếu chưa có phương pháp thử. Các ca tương ứng ghi **CHƯA KIỂM** kèm bằng chứng đã thử — **giới hạn thuộc về phương pháp đo hiện tại, không suy chỉ rằng máy GPU thật là kiểm được** (ma trận bản 2 ghi đúng chữ này).
- Font ngoài bị chặn trong môi trường kiểm → ảnh chụp dùng font dự phòng (logo lệch nhẹ ở 320) — bố cục có thể lệch nhẹ so với production.
- Kiểm link là kiểm nội bộ dist — không đồng nghĩa kiểm HTTP nguồn ngoài.
- Tắt chuyển động 3D bằng sự kiện mô phỏng el.click (pipeline chuột thật chết đói khi vòng vẽ liên tục ở SwiftShader) — ghi rõ trong từng ca; lượt BẬT dùng click chuột thật.

## 11. Tệp tạo trong chặng 1 và trạng thái Git

- Biên bản: `docs/nghiem-thu/G06-A-kiem-ke-giai-phau-en-2026-09-13.md`.
- `output/g06-anatomy-en-audit/`: `ke-kien-bang-chuoi.md` (§2.4 mở rộng vòng sửa 1), `cong-noi-dung-claim.md` (bản 2), `bang-link-vi-en.md` (bản 2), `pham-vi-tich-hop.md` (bản 2), `ma-tran-nghiem-thu-du-kien.md` (bản 2 — 24 ca CHƯA KIỂM + bảng hạn chế phương pháp), `kiem-link.mjs` + `kiem-link-ket-qua.json`, `log-build-nen.txt`, `preview-nen.log`, `do-tai-ket-qua.json` (đã sửa giới hạn phép đo ở vòng sửa 1), `boc-cuc-ket-qua.json`, `thao-tac-2d-ket-qua.json`, `thao-tac-3d-ket-qua.json`, `moi-truong-ket-qua.json`, các kịch bản + stdout nguyên văn (`pw-g06-a1-2d.js`, `pw-g06-a2-3d.js`, `pw-g06-b.js`, `pw-g06-do-tai.js`, `pw-g06-chan-doan.js`, các tệp vá `vao-*.py`, các `*-stdout.txt`), `shots/` (6 PNG — không mở PNG như văn bản).
- **0 tệp tracked bị sửa**; staged trống; `git diff --check` rỗng; quét whitespace gồm tệp mới và log: 0 dòng (PNG không đụng); quét khuôn nhạy cảm (sk-/ghp_/AKIA/-----BEGIN): 0.
- Tool kiểm không phụ thuộc lịch sử Git trong đường build bắt buộc (kiem-link đọc dist + bảng cặp); không có sandbox cần dọn (không chạy mutation chặng này).

## 12. Chờ quyết định của GPT Work (cổng duyệt lại cổng nội dung và phạm vi)

1. Duyệt từng cặp câu VI/EN trong `cong-noi-dung-claim.md` bản 2 (C1–C12 + bảng rà câu còn lại) — các câu VI sẽ sửa để VI/EN không mâu thuẫn.
2. Duyệt quyết hình C5 đã chốt (vòng 3): bỏ `#wev-energy`, dùng khối chữ ba vai — không còn phương án vẽ hai nhánh.
3. Duyệt danh sách tệp chặng 2 (`pham-vi-tich-hop.md` bản 2): tạo `anatomy-parts.ts` + `AnatomyExperience.astro`; sửa `exploded3d.ts` (đa chuỗi), `check-3d-loading-budget.mjs` (đổi điểm tìm + bảo vệ hai bản), `check-g01`, `check-english-launch`, `check-evolution-data` (SKIP_FILES riêng `anatomy-parts.ts`), `package.json`.
4. Xác nhận khung ma trận tích hợp bản 2 (24 ca CHƯA KIỂM + bảng hạn chế phương pháp).
5. Đã chốt (vòng 3): bỏ cột "Vật liệu điển hình" cả VI/EN; nhãn kính "KÍNH"/"CRYSTAL"; vai "Điều tiết"/"Regulation", "Đóng vỏ"/"Case closure".

## 13. Kết luận

**G06-A chặng 1 vòng sửa 1 xong: cổng nội dung viết lại theo quyết định GPT Work (ba mức bằng chứng + nguồn FHH đọc trực tiếp), phạm vi kỹ thuật chốt (một component, engine đa chuỗi, check-3d vào phạm vi), ma trận và bằng chứng mạng sửa đúng giới hạn — DỪNG chờ GPT Work duyệt lại cổng nội dung và phạm vi. Chưa tạo route EN, chưa sửa mã/nội dung website, chưa commit/push/deploy.** Không mở G06-B/C, G07, G08, G09. Không tự kết luận G06 đã hoàn tất.
