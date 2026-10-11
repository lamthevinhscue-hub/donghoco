# BIÊN BẢN THI CÔNG C0 — Sửa phạm vi bộ kiểm tra mã

**Gói:** C0 — loại bản thử nghiệm và lịch sử dựng trong `output/` khỏi kiểm kiểu; tách dữ liệu chuẩn G08 khỏi `output/`
**Danh mục:** DHC-HOAN-THIEN-20261011 v1.0.0
**Giao dịch:** TXN-20261011-04 (câu lệnh thi công của GPT Work); vòng sửa 1 theo TXN-20261011-05
**Ngày thi công:** 11/10/2026
**Nền:** HEAD `97ed0af` = `origin/main` (sau khi E1 phát hành)
**Bên thi công:** GLM (phiên điều phối ZCode). Bên nghiệm thu: GPT Work.

## 1. Nền

- Git sạch ngoại trừ `docs/giao-viec/THEO-DOI.md` (M — kết cục phát hành E1 ghi trong phiên, được câu lệnh yêu cầu tiếp nhận: "Tiếp nhận sửa dở THEO-DOI ghi kết quả phát hành E1, không reset hoặc mất nội dung đó").
- Trước sửa: `tsconfig.json` `exclude: ["dist"]` → astro check quét cả `output/`; số đo thật trước: **332 hints, 100% sinh từ các tệp `output/history-*-release-check/dist` dựng đợt 04–05/10/2026, 0 hint từ tệp tracked** (đối chiếu GPT Work đo bản sao sạch 0/0/0).
- G08 (`check-g08-speedmaster-evolution.cjs`) đọc hồ sơ 7 mốc từ `output/g08-speedmaster-evolution-audit/du-kien-g08-a.json` — chuỗi check/build phụ thuộc dữ liệu trong `output/`.
- **Phát hiện trong vòng sửa 1:** tại nền `97ed0af`, `output/` có **885 tệp đã được Git theo dõi** (bằng chứng lịch sử các gói trước). Bản sao nghiệm thu vì vậy phải chủ động loại thư mục này khỏi danh sách tệp Git quản lý (mục 5).
- Hash tệp sau sửa lưu `output/c0-check-scope-audit/hash-c0.txt`.

## 2. Thay đổi theo từng tệp (đúng 7 tệp của câu lệnh)

1. **`tsconfig.json`** — dòng 4: `"exclude": ["dist"]` → `"exclude": ["dist", "output"]`. `extends` và `include` giữ nguyên.
2. **`scripts/fixtures/g08-speedmaster-source-baseline.json`** (mới) — sao **nguyên byte** từ `output/g08-speedmaster-evolution-audit/du-kien-g08-a.json`; `cmp` xác nhận giống hệt; SHA-256 nguồn = đích = `96f5106389d5ed9801fe1276a7d23d11e3f7e75d85215bb3ed477e20c1355bea` (khớp hash GPT Work kiểm tại lượt giao việc; đối chiếu lại cuối vòng sửa: vẫn khớp). Tệp nguồn giữ nguyên trạng, không xóa.
3. **`scripts/check-g08-speedmaster-evolution.cjs`** — chỉ 2 chỗ: dòng chú thích nguồn sự thật (6) và hằng `JSON_HO_SO` (22) trỏ sang `scripts/fixtures/g08-speedmaster-source-baseline.json`. Không đổi logic kiểm G1–G7, không thêm fallback về `output/`.
4. **`scripts/check-c0-check-scope.mjs`** (mới) — checker C0, **9 phép kiểm**: K1a exclude **đúng tập** `["dist", "output"]` (thêm/bớt mẫu nào khác — ví dụ `src` — đều FAIL); K1b `extends`/`include` khớp nguyên văn cấu hình đã duyệt; K2a G08 trỏ fixture chuẩn; K2b G08 không còn tham chiếu `output/` trong mã sống (bỏ chú thích trước khi tìm); K3 fixture tồn tại + JSON hợp lệ + đúng 7 mốc + hash khớp chuẩn; K4a checker chạy trước `check:types` trong chuỗi check; K4b `check:types` vẫn là `astro check`; K4c build vẫn gọi G08 + G09; K5 quét toàn bộ 59 script của chuỗi check/build — không script nào đọc `output/` trong mã sống, hai ngoại lệ có chủ đích: dòng `const CAM = [` của check-h13-llms.mjs (danh sách CẤM rò dữ liệu, không phải đọc tệp) và chính checker này (chuỗi tìm kiếm làm logic kiểm).
5. **`package.json`** — chèn `node scripts/check-c0-check-scope.mjs &&` vào `npm run check` **ngay trước `npm run check:types`**. Không đổi mắt xích nào khác của check/build.
6. **`docs/giao-viec/THEO-DOI.md`** — chỉ hai hàng được phép: E1 (tiếp nhận kết cục phát hành `97ed0af`) và C0 (vòng đời đến "Chờ nghiệm thu" + liên kết biên bản + ghi chú vòng sửa). Hàng "Hồ sơ" đã **trả về trạng thái trước C0** (bản "Chưa mở" như trong commit `97ed0af`) sau khi GPT Work chỉ phạm vi.
7. **`docs/nghiem-thu/C0-pham-vi-bo-kiem-tra-2026-10-11.md`** — mới, biên bản này.

Không đụng `scripts/check-g09-id-unique.mjs` và baseline 69; không đụng `scripts/archive/`; không đụng nội dung bài, giao diện, dữ liệu công khai, dependency.

## 3. Số đo thật trước/sau (repo thật)

| Đo lường | Trước sửa | Sau sửa (chạy lần cuối vòng sửa 1) |
|---|---|---|
| astro check | 332 hints (100% từ `output/`) | **0 errors / 0 warnings / 0 hints** |
| `npm run check` | không có checker C0; phụ thuộc output/ qua G08 | **exit 0** (log `check-vong-sua-1.log`) |
| `npm run build` | — | **exit 0**, Pagefind indexed 355 pages (log `build-sau-sua.log`, chạy sau sửa chính) |
| G08 trên dist mới | đọc hồ sơ từ output/ | **ĐẠT** — G3/G4/G5/G6/G7 đủ, "vi có đúng 7 nút mốc — 7 nút", 12 route render đúng (log build) |
| G09 trên dist mới | — | **ĐẠT exit 0** — "mỗi plate tham chiếu đúng pattern của chính nó, 0 ID trùng" (chạy lại trực tiếp trên dist mới) |
| scan-chars | — | OK, 462 tệp, không phát hiện ký tự ngoài tiếng Việt/Anh |
| git diff --check / --cached --check | — | đều sạch |

**Ghi nhận về telemetry (không quy kết là lỗi C0):** lượt build của GPT Work trong phiên nghiệm thu gặp lỗi quyền ghi telemetry, GPT Work đã tắt telemetry cho phiên kiểm và build **exit 0** — lỗi đó là của môi trường phiên, không phải mã C0.

## 4. Phép thử sandbox — 6 kịch bản, 8 lệnh (log `phep-thu-am-tinh.log`)

Sandbox: bản sao working tree (trừ node_modules/dist/output/.astro/.git) + junction node_modules; dọn sạch sau. **Phân loại: 1 kịch bản kỳ vọng THÀNH CÔNG (1 lệnh); 5 kịch bản kỳ vọng THẤT BẠI (7 lệnh).**

| Kịch bản | Lệnh | Kỳ vọng | Kết quả thật |
|---|---|---|---|
| KB1 lỗi `.astro` trong `output/` vô hình (THÀNH CÔNG) | astro check | exit 0, không nhắc tệp | **exit 0, 0/0/0, không nhắc** |
| KB2 cùng lỗi vào `src/` | astro check | thất bại, đúng tệp | **exit 1, trỏ đúng src/thu-thu-loi.astro** |
| KB3 bỏ `output` khỏi exclude | C0 + astro check (2 lệnh) | cả hai thất bại | **C0 exit 1 (K1a); astro check exit 1 thấy output/thu-thu-loi.astro** |
| KB4 thiếu fixture G08 | G08 | thất bại, không fallback | **exit 1 (lỗi đọc tệp fixture)** |
| KB5 đổi năm một mốc fixture (1957→1958) | G08 + C0 (2 lệnh) | G08 thất bại đúng kiểm dữ liệu; C0 bắt hash lệch | **G08 exit 1 "KHÔNG ĐẠT G2 mốc N1 (1958)"; C0 exit 1 K3 sha256=5aaf0205… lệch** (G08 còn nhắc thiếu dist do sandbox không có dist — nguyên nhân chính là lệch dữ liệu, xuất hiện trước) |
| KB6 thêm `src` vào exclude | C0 | thất bại đúng K1a | **exit 1 "KHÔNG ĐẠT K1a exclude đúng tập — [dist, output, src]"** |

**Lượt sạch (repo thật, tách riêng với sandbox):** TRƯỚC phép thử — `npm run check` + `npm run build` exit 0 (mục 3); SAU phép thử và sau vòng sửa — `npm run check` exit 0, 0/0/0 (log `check-vong-sua-1.log`). Kèm một chấm tra nhanh ngoài sandbox (đã khôi phục ngay): tạm thêm `src` vào exclude của tsconfig thật → K1a FAIL → trả nguyên trạng → ĐẠT.

## 5. Bằng chứng build trên bản sao không có `output/` (log `build-ban-sao-khong-output.log`)

- Cách chuẩn bị: `git archive 97ed0af` (đúng danh sách tệp Git quản lý tại nền, **1.844 tệp**) giải nén vào thư mục mới **ngoài repo**, rồi **loại toàn bộ `output/`** (885 tệp tracked là bằng chứng lịch sử — bị loại theo yêu cầu "bản sao chỉ gồm tệp Git quản lý, loại toàn bộ output/"); đè **đúng 7 tệp C0** từ working tree; junction `node_modules` có sẵn (không cài dependency).
- Xác nhận bản sao không mang `output/`: kiểm thư mục sau giải nén — **"OK: ban sao KHONG co output/"**; cũng không mang tệp untracked khác (archive chỉ chứa tracked).
- **`npm run build` đầy đủ tại bản sao: exit 0**; không có dòng KHÔNG ĐẠT trong log; G08 chạy bằng fixture chuẩn **ĐẠT**; **G09 chạy lại trên dist vừa dựng: exit 0, "0 ID trùng"**. Không dùng `astro build` riêng, không bỏ mắt xích kiểm.

## 6. Việc chưa thực hiện và điểm dừng

- Chưa stage, chưa commit, chưa push — chờ GPT Work tái nghiệm thu ĐẠT và cho phép phạm vi tệp.
- Không phát hiện phụ thuộc `output/` nào khác trong chuỗi check/build cần sửa ngoài allowlist (K5 quét 59 script sạch) — không cần mở phạm vi.
- Không đụng baseline G09 (69) hay bất kỳ tiêu chí nghiệp vụ checker nào; không xóa tệp nguồn G08 trong `output/`.

## 7. Vòng sửa

### Vòng 1 (theo tái nghiệm thu TXN-20261011-05 — GPT Work phán CHƯA ĐẠT ngày 11/10/2026)

1. **Siết K1** thành K1a (exclude **đúng tập** `["dist", "output"]` — thêm `src` phải FAIL) + K1b (extends/include khớp nguyên văn, không chỉ "có chứa"); thêm kịch bản sandbox KB6 chứng minh. Số phép kiểm checker: 8 → **9** (biên bản trước ghi nhầm "9" khi thật là 8 — nay khớp theo số thật sau sửa).
2. **Bổ sung bằng chứng build không mang `output/`**: mục 5 — bản sao git archive 97ed0af loại 885 tệp output/ tracked, đè đúng 7 tệp C0, build đầy đủ exit 0, G08/G09 ĐẠT trên dist mới.
3. **Đồng bộ biên bản**: tách 6 kịch bản / 8 lệnh / kỳ vọng thành công–thất bại / lượt sạch (mục 4); bổ sung mục 5 và ghi nhận telemetry; sửa số phép kiểm theo số thật.
4. **Thu hẹp THEO-DOI**: trả hàng "Hồ sơ" về bản committed (Chưa mở); chỉ giữ hai hàng E1 (kết cục phát hành) và C0.
5. Kiểm cuối vòng sửa: checker C0 ĐẠT 9/9; sandbox 6 kịch bản đúng kỳ vọng; lượt sạch check exit 0 (0/0/0); scan-chars + hai diff-check sạch; hash fixture nguồn/đích vẫn `96f51063…`.
