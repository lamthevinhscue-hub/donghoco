# L2-B — Tích hợp 5 ảnh AI bối cảnh vào dòng thời gian — Biên bản thực hiện

- Giao dịch: TXN-20260926-315, danh mục DHC-GD3-20260925, gói L2-B
- Ngày thực hiện: 27/09/2026; nền repo: `01eac53` (= origin/main khi bắt đầu)
- Trạng thái: **GPT WORK TÁI NGHIỆM THU ĐẠT — CHO PHÉP PHÁT HÀNH 10 TỆP
  (commit theo phán quyết)**
- Đầu vào duyệt: 5 PNG trong `output/l2-ai-drafts/` — anh Vinh duyệt cả 5
  ngày 27/09/2026 (manifest và bảng duyệt đã ghi kết quả).

## 1. Đã làm gì

Đưa đúng 5 ảnh AI bối cảnh (rolex-oyster, jlc-reverso, rolex-submariner,
heuer-carrera, patek-nautilus) vào `/lich-su/` và `/en/history/` theo khuôn
hiện hành của `HistoryTimeline.astro` (ảnh .jpg ưu tiên + `ANH_AI` + hộp phóng
to H09). Không đổi timeline.json, nội dung mốc, SVG hiện có, route, CSS toàn
cục; không mở nút chuyển ảnh/SVG; không tạo lại ảnh; không thêm ảnh cho 18
mốc còn lại.

## 2. Ảnh web xuất từ bản duyệt

`public/images/timeline/<slug>.jpg` — sharp resize 1200×900 (gốc 1600×1200 đã
4:3, không crop), mozjpeg quality 80:

| slug | Kích thước | Dung lượng | sha256 (16 đầu) |
|---|---|---|---|
| rolex-oyster.jpg | 1200×900 | 101 KB | d0151250dccfd22d |
| jlc-reverso.jpg | 1200×900 | 91 KB | 5b0368990b7860ee |
| rolex-submariner.jpg | 1200×900 | 102 KB | 63c4c064215fdfe9 |
| heuer-carrera.jpg | 1200×900 | 125 KB | 9327daa127898004 |
| patek-nautilus.jpg | 1200×900 | 90 KB | 4ec8b29b11cc938c |

Không tạo WebP: HTML dòng thời gian không dùng `srcset`/WebP (WebP chỉ có ở
chương Bánh lắc với `srcset` riêng) — đúng điều kiện "chỉ tạo khi được render".

## 3. Cơ chế hiển thị (HistoryTimeline.astro)

- Thêm đúng 5 slug vào `ANH_AI`, nhãn nguyên văn: VI "Minh họa AI tái dựng —
  không phải ảnh tư liệu" / EN "AI reconstruction — not a historical
  photograph" (như 5 mục hiện có).
- Thêm `ALT_AI_MO_RONG` — mô tả thay thế VI/EN nguyên văn của từng mốc lấy từ
  tài liệu nguồn (mục 12/15/19/22/28); `altFor` ưu tiên mô tả thay thế này cho
  5 slug mới kèm nhận diện "(minh họa AI tái dựng)" / "(AI reconstruction)";
  4 mốc H07-A giữ nguyên khuôn cũ (title + hậu tố + nhận diện).
- Alt áp dụng đồng nhất cho thẻ `<img>`, `data-zoom-alt`, và nhãn hiển thị ở
  thẻ + `data-zoom-ai` cho hộp phóng to (khuôn H09 có sẵn).

## 4. Checker L2 (scripts/check-l2-timeline-ai.mjs)

Nguồn (L2-1..L2-4): 5 ảnh 1200×900 JPEG ≤150 KB hash riêng; JPG ↔ `ANH_AI`
hai chiều (10 tệp = 10 mục sau gói); 5 slug có nhãn nguyên văn + mô tả thay
thế; checker nối cuối cả `check` và `build`. Dist (L2-5..L2-6): tách theo
khối `<article>` — mỗi trang 5 mốc có ảnh jpg + alt khớp mô tả thay thế +
nhãn AI ở caption và `data-zoom-ai` + `data-zoom-alt`; không ảnh timeline
.jpg nào ngoài 10 slug cho phép. Env `L2B_ROOT`/`L2B_DIST` cho mutation.

## 5. Mutation (bản sao %TEMP%\l2b-sandbox-*, log mutation-l2b.log.txt)

4/4 ca ĐẠT (fail đúng mã, hoàn nguyên byte-đối-byte so sha256, chạy sạch trong
ca và cuối cùng exit 0): MUT-1 xoá JPG → L2-1; MUT-2 bỏ mục nhãn AI một slug
→ L2-2; MUT-3 alt sai ngôn ngữ trên dist /lich-su/ → L2-5; MUT-4 thêm tệp jpg
không có trong `ANH_AI` → L2-2.

## 6. Kiểm bắt buộc

| Lệnh | Kết quả |
|---|---|
| `npm run check:types` | exit 0 — 0 errors, 0 warnings, 4 hints (= baseline; một biến không dùng trong checker đã gỡ) |
| `npm run check` | exit 0 (gồm checker L2 nguồn) |
| `npm run build` | exit 0 (build-full.log) |
| checker L2 nguồn / dist | ĐẠT cả hai (check-l2-dist.log) |
| `node scripts/scan-chars.mjs` | OK |
| `git diff --check` / `git diff --cached --check` | sạch cả hai |

**Kiểm trình duyệt** (playwright-cli, preview dist; screenshots trong
`output/l2-b-timeline-integration/screens/`):

- VI `/lich-su/` desktop sáng: cả 5 ảnh lazy-load 1200×900 sau cuộn; nhãn AI
  hiển thị 10 chỗ (5 caption + 5 data-zoom; gồm 5 mốc cũ); Enter trên nút zoom
  mở hộp phóng to với ảnh lớn; screenshot vi-desktop-sang.png,
  vi-desktop-sang-5anh.png.
- VI tối: `dark=true`, nhãn AI có (vi-desktop-toi.png). VI 390px: ảnh hiển thị
  (vi-390.png). VI no-JS (CDP tắt script): ảnh tĩnh + nhãn tĩnh vẫn hiển thị —
  hộp phóng to là tiến bộ tăng dần (vi-390-nojs.png).
- Đối chứng SVG: `peter-henlein.svg` vẫn render bình thường cạnh các ảnh AI.
- EN `/en/history/`: nhãn EN 10 chỗ; nautilus 1200×900, alt EN đúng; không alt
  tiếng Việt sót lại; 390px tối đúng (en-desktop-sang.png, en-390-toi.png);
  EN no-JS: ảnh + nhãn tĩnh hiển thị.

## 7. Giới hạn ghi nhận

- Hộp phóng to là tính năng JS: với no-JS, ảnh + nhãn + alt tĩnh vẫn hiển thị
  đầy đủ trên thẻ, hộp phóng to không mở (tiến bộ tăng dần, đúng khuôn H09).
- WebP không tạo — HTML timeline không tiêu thụ WebP; nếu sau này thêm
  `srcset` sẽ làm ở gói riêng.

## 8. Vòng sửa hồi quy H07 W5-e (TXN-20260926-317)

**Bằng chứng độc lập:** `npm run build` dừng tại
`scripts/check-h07-world-context.mjs` W5-e — checker hard-code
`soMocAi = MOC_MOI.length + 1` = 5 trong khi `ANH_AI` đã có 10 mục sau L2-B;
dist thực tế 20 nhãn VI/20 nhãn EN, W5-e đòi 10.

**Sửa (chỉ `scripts/check-h07-world-context.mjs`):** W5-e suy tổng số mốc AI
**động** từ bảng `ANH_AI` trong `HistoryTimeline.astro` (parse số mục trong
khối `const ANH_AI = new Map([...])` — 10 sau gói), bỏ số 5 cố định.

**Ranh giới H07 giữ chặt:**
- Vẫn bắt buộc 4 JPG H07-A (`universal-time-1884`, `great-depression-1929`,
  `atomic-second-1967`, `oil-shock-1973`) render trên cả dist VI và EN — 5 ảnh
  L2 KHÔNG bị tính vào điều kiện "4 ảnh H07-A".
- Với toàn bộ slug trong `ANH_AI` (10): nút zoom phải có `data-zoom-src` trỏ
  đúng ảnh slug kèm `data-zoom-ai` nguyên văn theo ngôn ngữ trang
  (`data-zoom-src="...slug.jpg" ... data-zoom-ai="NHAN"` cùng thẻ); tổng nhãn
  VI/EN = số mốc AI × 2 (caption + attr); hậu tố alt ×2; cấm lẫn VI/EN.
- Không bỏ kiểm nhãn/alt, không giảm còn kiểm một trang.

**Mutation H07 mới** (`mutation-h07-w5e.mjs`, sandbox dist + src + public
timeline; log mutation-h07-w5e.log.txt) — 3/3 ĐẠT trên trạng thái 10 ảnh AI:
HM-1 sai `data-zoom-ai` của rolex-oyster → W5-e; HM-2 sai `data-zoom-src`
trỏ nhầm ảnh → W5-e; HM-3 xoá caption nhãn của jlc-reverso → W5-e. Mutation
L2 4/4 giữ nguyên, chạy lại ĐẠT.

**Chạy lại sau sửa:** `node scripts/check-h07-world-context.mjs dist` ĐẠT
10/10 ("10 mốc AI suy từ ANH_AI — nhãn AI ×20, data-zoom-ai ×10,
data-zoom-src đúng slug"); checker L2 nguồn/dist ĐẠT; mutation L2 4/4 +
mutation H07 3/3; `npm run check` exit 0; `npm run build` exit 0 trọn chuỗi
(W5-e pass giữa chuỗi, checker L2 dist chạy sau); `npm run check:types`
0/0/**4 hints baseline**; scan-chars OK; hai diff-check sạch.

## 9. Trạng thái Git

- HEAD = `01eac53` = origin/main; tracked sửa 3 (package.json,
  src/components/history/HistoryTimeline.astro,
  scripts/check-h07-world-context.mjs); untracked mới: 5 JPG,
  `scripts/check-l2-timeline-ai.mjs`, biên bản; output/ nội bộ.
- Chưa stage, chưa commit, chưa push.
- Đề nghị phát hành: 10 tệp = 5 JPG + HistoryTimeline.astro + package.json +
  checker L2 + checker H07 + biên bản (output/ giữ nội bộ).
