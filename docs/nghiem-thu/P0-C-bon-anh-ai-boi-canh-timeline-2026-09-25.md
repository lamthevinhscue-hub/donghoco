# BIÊN BẢN GÓI P0-C — TÍCH HỢP 4 ẢNH AI BỐI CẢNH TIMELINE (ĐỢT 4)

**Mã gói:** P0-C — Đợt 4 kế hoạch sau H01–H14, giao dịch TXN-20260919-133
**Ngày thực hiện:** 25/09/2026 (+0700)
**HEAD lúc bắt đầu:** `16a5154` = `origin/main`, nhánh `main`; staged = 0; tracked sửa = 0; untracked có trước giữ nguyên
**Trạng thái:** vòng sửa 1 hoàn thành — **chờ GPT Work tái nghiệm thu**; chưa stage, chưa commit, chưa push, chưa deploy

## 0. Vòng sửa 1 — làm sạch diagnostics + khóa baseline G09 (theo phán quyết tái nghiệm)

1. **Diagnostics:** xóa khai báo không dùng `slugViTri` trong `output/p0-c-ai-timeline-context/kiem-trinh-duyet.js` — `npm run check:types` đạt đúng **0 errors / 0 warnings / 0 hints**.
2. **Baseline G09 khóa cứng:** `scripts/check-g09-id-unique.mjs` — `BASELINE_NGOAI_TIMELINE = 69` (chú thích nguồn: census P0-C sau khi bốn ảnh được thêm); D4 bắt buộc đồng thời `plateNgoai === 69`, plate hai route timeline bằng số mốc có ảnh (tính từ `timeline.json` + tệp JPG/SVG thật), tổng = `69 + số_mốc_có_ảnh × 2`, giữ nguyên D1–D3 (0 ID trùng, pattern/reference đúng). Số đo ngoài timeline từ dist **không** còn là kỳ vọng của chính nó. Thêm tham số đường dist tùy chọn cho mutation — **mặc định vẫn `dist/` của repo**, chuỗi build và lệnh không tham số không đổi (ghi rõ theo yêu cầu giao việc); route các trang tính `relative` từ thư mục dist truyền vào.
3. **Mutation dist tạm ngoài repo** (`D:\donghoco-worktrees\p0c-dist-tam`, đã dọn; log `sua1-mutation-dist-tam.log`): bản sao `dist` + chèn 1 technical plate hợp lệ (ID mới `guilloche-p0c-mut-01`, pattern/reference khớp) vào `/co-che/bo-thoat/` (không phải route timeline) → `check-g09 <dist-tam>` **exit 1, D4: "ngoài=70 (cần 69)"**, timeline=64 đúng; dọn cây; `check-g09` trên cây thật **exit 0** (133/133/133).

Không thay ảnh, không đổi `HistoryTimeline.astro`, nhãn AI, H07/H09; không mở H12-B.

## 0. Đặc điểm của bốn ảnh — đọc kỹ trước khi dùng

Bốn ảnh là **minh họa AI bối cảnh đã được anh Vinh duyệt trực quan** (đầu vào cố định, liệt kê nguyên tên tệp trong giao việc). Chúng **không phải ảnh tư liệu**, **không phải chứng cứ lịch sử hay kỹ thuật**; mọi dữ kiện lịch sử của mốc vẫn dựa hoàn toàn vào nguồn trong `timeline.json`. Nhãn minh bạch B3.2.4 gắn ở thẻ, trong alt và hộp phóng to để người đọc không nhầm. **H12-B không được mở** — gói này không tạo hay thay ảnh nào khác.

## 1. Phạm vi thực hiện

| # | Việc | Kết quả |
|---|---|---|
| 1 | Lưu PNG gốc + truy vết | 4 bản sao byte-đối-byte + SHA-256 + kích thước tại `output/p0-c-ai-timeline-context/ho-so-anh.md` (gốc 1448×1086 — đúng 4:3). Prompt nguồn không có tệp lưu trong repo — hồ sơ ghi rõ trạng thái, không đoán. |
| 2 | 4 JPG web | `public/images/timeline/{universal-time-1884,great-depression-1929,atomic-second-1967,oil-shock-1973}.jpg` — 1200×900 (4:3, scale LANCZOS, không crop), 148.767 / 146.203 / 149.365 / 143.035 bytes — cả 4 < 150.000 bytes. Rà trực quan 4/4: không chữ/logo/cờ/biển hiệu đọc được; không thêm chi tiết mới; không xóa/thay SVG nào. |
| 3 | `HistoryTimeline.astro` | `ANH_AI` thêm đúng 4 slug, giữ nguyên `trench-watch` — 5 mục. Nhãn đúng từng ký tự: VI `Minh họa AI tái dựng — không phải ảnh tư liệu`; EN `AI reconstruction — not a historical photograph`. Nhãn tự hiện: thẻ (`nhanAiOf`), hộp phóng to (`data-zoom-ai`), alt theo khuôn H12-A (`altFor` thêm "(minh họa AI tái dựng)" / "(AI reconstruction)"). |
| 4 | Checker H07 | W6 mới (nguồn): 4 JPG đúng slug + đọc kích thước JPEG từ header — phải 1200×900. W5-e mới (dist): 4 JPG render đúng cả VI/EN; nhãn AI đúng ngôn ngữ ×10 mỗi trang (5 mốc AI × 2 chỗ: thẻ + attr truyền hộp phóng to); không lẫn nhãn ngôn ngữ; alt khuôn H12-A ×10. Tiêu đề/nguồn/giới hạn — W5-b giữ nguyên, không gán ý nghĩa chứng cứ cho ảnh. |
| 5 | Checker H09 | H9-3: nhãn + số mốc không ảnh **tính từ dữ liệu + tệp ảnh thực tế** (bỏ ghi cứng "4 mốc"). H9-6 mới: map `ANH_AI` trích từ nguồn HistoryTimeline (không ghi cứng); mỗi slug phải có nhãn AI đúng ngôn ngữ ở thẻ + `data-zoom-ai` trên nút truyền vào hộp phóng to (×5 mỗi trang). H9-1/H9-2/H9-4/H9-5 giữ nguyên logic (số mốc có ảnh đã tính từ dữ liệu sẵn). |
| 6 | Checker G09 | Hai route timeline: số plate = số mốc có ảnh thực tế (`timeline.json` + tệp jpg/svg — 32, không còn cứng 28). D4 tổng toàn dist = baseline ngoài timeline + plate 2 route timeline (69 + 32×2 = 133) — kiểm chứng khi chạy, không ghi trước. D1–D3 giữ nguyên: 0 ID trùng, mỗi plate tham chiếu pattern của chính nó. |
| 7 | Biên bản | Tệp này + bằng chứng `output/p0-c-ai-timeline-context/` (không commit). |

`package.json` không sửa — dùng các checker đã nối trong chuỗi build.

## 2. Kết quả kiểm (số đo thật)

| Kiểm | Kết quả |
|---|---|
| Ảnh | Đúng 4 tệp JPG mới; mỗi tệp 1200×900 (đọc từ header trong W6); 143.035–149.365 bytes, tất cả < 150.000; 4/4 không chữ/logo/cờ/biển hiệu đọc được |
| Census G09 trước → sau | Trước: **125/125/125 plate/pattern/ref trên 68 trang** (lich-su 28, en/history 28). Sau: **133/133/133 trên 68 trang** (lich-su 32, en/history 32; 69 ngoài timeline + 32×2 timeline) — khớp dự đoán +8 (4 ảnh × 2 route), được checker kiểm chứng chứ không ghi trước |
| `npm run check:types` | 0 errors / 0 warnings / 0 hints, exit 0 |
| `npm run check`, `npm run build` | exit 0; 312 trang HTML; 23.341 link, 0 hỏng; sitemap 311 URL |
| H07 / H09 / G09 | ĐẠT 10/10 ca / ĐẠT 12/12 ca / ĐẠT (D1–D5, tổng 133/133/133) |
| Trình duyệt VI (`/lich-su/`) | 4 thẻ mới: img đúng JPG 1200×900 tải thật, nhãn AI ở thẻ; nút zoom mở dialog bằng bàn phím (Enter), dialog hiện nhãn AI + src đúng; Escape đóng và focus trả về đúng nút; 320px tràn 0px; zoom 200% tràn 0px |
| Trình duyệt EN (`/en/history/`) | 4 thẻ mới ảnh + nhãn EN; 0 nhãn VI lỗi sang; `data-zoom-ai="AI reconstruction…"` ×5 |
| No-JS | VI: 5/5 mốc AI (4 mới + trench-watch) vẫn có ảnh + nhãn AI, không khung rỗng; EN: ảnh + nhãn EN hiện đúng |
| `git diff --check` | exit 0 |

## 3. Mutation ngoài cây (`D:\donghoco-worktrees\p0c-mutation` + sandbox, đã dọn)

| Ca | Thao tác | Kết quả |
|---|---|---|
| Baseline | Cây tạm: HistoryTimeline + timeline.json + historyChapters + toàn bộ ảnh timeline | H07 ĐẠT 5/5, H09 ĐẠT 12/12 (dist thật dùng chỉ-đọc) |
| M1 xóa nhãn map AI (mục `atomic-second-1967`) | `check-h09` trên cây | **exit 1 [H9-6-VI/EN] "truyền=5" ≠ 4 slug** |
| M2 xóa JPG `atomic-second-1967` | `check-h07` trên cây | **exit 1 [W6] "thiếu tệp JPG"** |
| M3 sai ID pattern (2 trang dist chép sang sandbox, mọi plate chung 1 ID) | `check-g09 --quyen` | **exit 1 [D3] "guilloche-trung x32" (lich-su)** |
| Khôi phục | `cmp` từng tệp với bản gốc | khớp byte (0) mọi ca |
| Sạch cuối trên repo | H07 + H09 + G09 | cả ba exit 0 |

## 4. Tệp thay đổi

- **Ảnh mới (4):** bốn JPG `public/images/timeline/` như bảng mục 1.
- **Sửa (4):** `src/components/history/HistoryTimeline.astro` (mục 3); `scripts/check-h07-world-context.mjs` (W6 + W5-e); `scripts/check-h09-timeline-zoom.mjs` (H9-3 động + H9-6); `scripts/check-g09-id-unique.mjs` (theo dữ liệu + D4 tính từ baseline).
- **Biên bản:** tệp này. **Bằng chứng nội bộ (không commit):** `output/p0-c-ai-timeline-context/` — 4 PNG gốc đã duyệt, `ho-so-anh.md`, census trước/sau, logs build/check, code kiểm trình duyệt.

Không sửa: `timeline.json`, nội dung mốc, `WatchImage.astro`, CSS toàn cục, route, `package.json`, cấu hình, ảnh SVG hiện có, ảnh AI trench-watch, H14-B, bài mới/hub.

Dừng chờ GPT Work nghiệm thu. Chưa stage, chưa commit, chưa push, chưa deploy.
