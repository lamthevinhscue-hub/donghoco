# BIÊN BẢN C3 — SỬA LỌC TÔ SÁNG Ô TÌM KIẾM

**Gói:** C3 — sửa bộ làm sạch đoạn trích tìm kiếm (giữ đúng cặp `<mark>`, an toàn innerHTML)
**Danh mục:** DHC-HOAN-THIEN-20261011 v1.0.0 — đợt 2 mở sớm theo lệnh anh Vinh 17/10
**Câu lệnh:** TXN-20261017-50 (GPT Work chọn C3, giao câu lệnh 7 mục); các vòng sửa: TXN-20261017-51, TXN-20261017-53, TXN-20261017-56 (mỗi vòng một "SỬA TỐI HẸP C3" kèm probe độc lập).
**Nền:** `26a82d4` = origin/main
**Bên thi công:** GLM. Bên nghiệm thu: GPT Work. **Chưa stage, chưa commit, chưa push.**
**Trình tái nghiệm thu:** TXN-20261017-59.

## Lịch sử vòng (kết quả cũ là lịch sử — số liệu hiện hành ở mục 3–5)

| Vòng | Gửi | Phán của GPT Work | Kết quả tự kiểm TẠI LÚC ĐÓ (lịch sử) |
|---|---|---|---|
| 1 | TXN-20261017-51 | CHƯA ĐẠT — hai lỗi: xử lý `<` trong script làm sai văn bản bên ngoài (leak "Trước &lt; sau" / nuốt " sau"); kết luận trình duyệt bỏ qua kiểm tìm kiếm (mất kqTim.dat, mất phép không-kết-quả); kèm kỳ vọng E2 sai, in cứng "18 ca" (thực 20), thiếu ca nháy/chú thích | checker 18 ca; bộ thử 5/5 |
| 2 | TXN-20261017-53 | CHƯA ĐẠT — hai lỗi: xử lý `<` trong script chưa đạt (probe `if (a < b)` / `if(a<b)x()`) và kết luận trình duyệt bỏ qua kiểm tìm kiếm; biên bản chưa đồng bộ tệp thật | checker 25 ca; bộ thử 7/7 |
| 3 | TXN-20261017-56 | CHƯA ĐẠT — phát hiện mới: nhận diện thẻ đóng chỉ khớp tiền tố (`</scriptx>` mở khóa làm lộ "LEAK"); M6 `false && …` không tái tạo lỗi; biên bản dòng 15 gán nhầm lịch sử | checker 27 ca; bộ thử 7/7 |
| 4 | TXN-20261017-58 | CHƯA ĐẠT — M6 vẫn `false && …` (không tái tạo "Trước LEAK sau"); biên bản dòng 15 vẫn sai lịch sử TXN-53 | checker 30 ca; bộ thử 8/8 (M6 sai cách) |
| 5 | TXN-20261017-59 (hồ sơ này) | — | checker 30 ca; bộ thử 8/8 (M6 đúng: tự xác minh mutant trả "Trước LEAK sau", checker bắt C3-H3) |

Ghi rõ theo từng phán: TXN-51 bắt hai lỗi xử lý `<` trong script và kết luận trình duyệt + kỳ vọng E2 sai; TXN-53 giữ hai lỗi đó (chưa đạt) — nhận diện tiền tố `</scriptx>` KHÔNG thuộc vòng này; TXN-56 mới phát hiện lỗi nhận diện tiền tố và bắt M6 sai cách + biên bản chưa đồng bộ; TXN-58 xác nhận hai điểm còn lại (M6 `false && …` không tái tạo lỗi; biên bản dòng 15) và yêu cầu M6 tự xác minh mutant trả "Trước LEAK sau" trước khi chạy checker.

## 1. Bằng chứng nền (trước sửa)

`output/c3-search-highlight-audit/neu-truoc-sua.mjs` chạy hàm hiện hành (nguyên văn dòng 96 `searchCore.ts` @ `26a82d4`: `raw.replace(/<\/?(?!mark\b)[^>]*>/gi, '')`) — `neu-truoc-sua.json`: `"Trước <mark>bánh lắc</mark> sau"` → mất thẻ đóng (regex backtrack ăn `</mark>`), tô sáng lan; `"<mark onclick=alert(1)>balance</mark>"` → còn onclick; `"<script>alert(1)</script>sau"` → nội dung script không bị bỏ; mark lồng → 2 mở 0 đóng.

## 2. Thi công

- `src/scripts/sanitizeSearchExcerpt.mjs` — **mới**, thuần JS không dependency (trình duyệt và Node cùng gọi ĐÚNG một hàm); quét ký tự theo trạng thái:
  - `<` chỉ mở thẻ khi theo sau là chữ hoặc `/`+chữ — **"5 < 6 & 7 > 2" là văn bản, textContent giữ nguyên văn**;
  - kết thúc thẻ **tôn trọng dấu nháy** — `>` trong thuộc tính nháy kép/đơn không kết thúc thẻ, thuộc tính bỏ trọn;
  - chú thích đọc tới `-->`; chưa đóng → bỏ tới hết; không lộ chữ/mark trong chú thích;
  - **script/style/template bỏ trọn nội dung**: trong vùng bỏ, `<` thường bị BỎ (không leak), chỉ thẻ đóng **khớp đầy đủ tên** (ký tự sau tên thuộc `[\s/>]` — `</scriptx>` không mở khóa) mới kết thúc vùng; sửa qua 2 vòng probe (`if (a < b)` → `</scriptx>`);
  - `<mark …>` mở → `<mark>` không thuộc tính; lồng gộp; thiếu đóng tự cân bằng; đóng dư bỏ;
  - văn bản giữ thực thể dạng chuẩn, escape `& < >` lẻ — đầu ra không thể sinh mã HTML/thực thi; không ném lỗi, không lặp vô hạn.
- `src/scripts/searchCore.ts` — bỏ hàm regex cục bộ, `import { sanitizeExcerpt } from './sanitizeSearchExcerpt.mjs'` (sản phẩm gọi chính hàm được kiểm). Giữ nguyên debounce, 8 kết quả, vô hiệu kết quả cũ, lọc VI/EN, fallback Pagefind, analytics.
- `scripts/check-c3-search-highlight.mjs` — **mới**: ca chức năng a–h khẳng định bằng parse5 (chỉ mark không thuộc tính + textContent nguyên văn), đọc module từ cây `--root`; `C3-ARG`/`C3-N0`.
- `package.json` — nối `check-c3-search-highlight.mjs` ngay trước C2 nguồn trong `npm run check` (1 chỗ).
- Biên bản này + `docs/giao-viec/THEO-DOI.md` (chỉ hàng C3). Phạm vi phát hành **đúng 6 tệp**.

## 3. Kết quả tự kiểm HIỆN HÀNH (trạng thái cuối, dẫn log đúng)

- **Checker `scripts/check-c3-search-highlight.mjs`: 30/30 ca chức năng (a–h) ĐẠT** exit 0 — 20 ca a–f (câu lệnh gốc) + 5 ca g (TXN-51) + 5 ca h (TXN-56: ba probe `</scriptx>`/`</stylex>`/`</templatex>` + 2 probe script cũ `if (a < b)` / `if(a<b)x()`). Kết quả hiện hành in `DAT bo kiem C3: 30/30 ca chuc nang (a-g) deu dap` (`npm-check.log` dòng 306, `npm-build.log` dòng 313).
- **Bộ thử sandbox `test-c3.mjs`: 8/8 ĐẠT** exit 0 (`log-cli/bo-thu-c3.log`) = **2 lượt sạch riêng + 6 mutation**: M1 regex cũ → C3-F1; M2 giữ thuộc tính → C3-C1; M3 bỏ mark → C3-A1; M4 mất văn bản (nuốt `< 6 & 7 >`) → C3-E2; M5 lộ chú thích → C3-D6; **M6 khôi phục nhận diện tiền tố cũ: bỏ điều kiện ký tự sau tên (`&& /[\s/>]/.test(kyTuSau)`) → `</scriptx>` mở khóa nhầm, "LEAK" lộ** — **tự xác minh trước khi chạy checker**: import module đã mutate, gọi với probe `Trước <script>ẩn</scriptx>LEAK</script> sau` phải trả đúng "Trước LEAK sau" (không đúng → M6 THAT BAI, theo TXN-58); sau đó checker phải thất bại đúng C3-H3. Mỗi ca: sandbox dựng riêng (toàn thư mục `src/scripts`), hoàn nguyên + SHA khớp, mã rule chỉ nhận dòng chẩn đoán chính thức (crash/timeout → ca thất bại, `chay()` có timeout 60 s), hash repo ghi trước — đối chiếu sau (không rò rỉ).
- `npm run check` exit 0 — astro check 211 tệp: **0 lỗi / 0 cảnh báo / 6 hints** (baseline).
- `npm run build` exit 0 — chuỗi C1 → A4 → C2 → A3 nguyên, A3 cuối ĐẠT, 361 trang.

## 4. Kiểm trình duyệt HIỆN HÀNH (trên dist build mới nhất)

`kiem-trinh-duyet-c3.mjs` chạy riêng **Chromium và WebKit** trên preview 127.0.0.1:4390 — **4/4 tổ hợp ĐẠT mỗi engine** (2 ngôn ngữ × 2 kích thước; JSON `kiem-trinh-duyet-{chromium,webkit}.json`, log `log-cli/kiem-{chromium,webkit}.log`):

- Bề mặt theo kích thước: **desktop 1280×800 = inline header** (hộp thoại ẩn `lg:hidden`); **390×844 = hộp thoại** (`#search-trigger` → `#search-input`, inline ẩn).
- Theme đặt **TRƯỚC tải** (context colorScheme) + xác minh class `dark` trên `<html>` khớp; ảnh chụp lúc **kết quả đang hiện** cả sáng/tối — **8 ảnh/engine, tổng 16**, tên theo engine (`c3-<bề-mặt>-<khổ>-<sang|toi>-<ng>-<engine>.png`).
- Truy vấn VI "bánh lắc" `/` và EN "balance" `/en/`: 8 kết quả; **mark nằm trong ĐÚNG excerpt** (`line-clamp-2` inline / `.search-result-excerpt` hộp thoại), không bao tiêu đề; **chữ mark khớp token truy vấn** (so không dấu); không thuộc tính; không lan (excerpt còn chữ ngoài mark); ngôn ngữ theo **pathname chuẩn hóa** (EN thuộc `/en/`, VI không).
- **ArrowDown/Enter mở đúng href kết quả ĐƯỢC CHỌN** (`aria-activedescendant` → href → URL khớp pathname) — áp dụng inline; **hộp thoại không có điều hướng mũi tên sẵn có** (GPT Work xác nhận tại TXN-56: "Không yêu cầu thêm tính năng đó trong C3; giữ kiểm Escape và thao tác hiện hữu") — ghi "không áp dụng", chỉ kiểm Escape. **Escape trên CẢ HAI bề mặt**.
- **Xóa truy vấn về rỗng**: dọn kết quả/mark cũ; **truy vấn vô nghĩa `qqzzxxwwvv`**: thông báo none, không còn `role="option"` (hai phép kiểm riêng biệt).
- **Tràn ngang đo KHI kết quả đang mở**: không tràn. **0 lỗi console**.

**CHƯA KIỂM:** Safari/iPhone thật (WebKit là giả lập Playwright); điều hướng mũi tên hộp thoại (không tồn tại sẵn — ngoài phạm vi, muốn thêm phải gói sửa SearchBox.astro riêng); hiệu năng tìm trên kho lớn.

## 5. Hai diff-check

Sau sửa mã và trước lúc trình: thay đổi đúng **6 tệp phạm vi** (M `searchCore.ts`, M `package.json` 1 chỗ chèn, M `THEO-DOI.md` hàng C3; ?? module mới, checker mới, biên bản; `output/` không commit). Không đụng sổ/biên bản gói khác, không gộp sửa dở A2/A3/A4/C1/C2.

## 6. Phạm vi phát hành đề nghị

`src/scripts/searchCore.ts`, `src/scripts/sanitizeSearchExcerpt.mjs`, `scripts/check-c3-search-highlight.mjs`, `package.json` (1 chỗ chèn), `docs/nghiem-thu/C3-to-sang-tim-kiem-2026-10-17.md`, `docs/giao-viec/THEO-DOI.md` (chỉ hàng C3, stage blob riêng trên nền HEAD). KHÔNG: output/, video/poster, dependency, lockfile, checker cũ, hồ sơ gói khác.

## 7. Ghi nhận minh bạch

- Số ca checker/bộ thử mỗi vòng là SỐ THỰC CHẠY tại vòng đó (18 → 25 → 27 → 30 ca chức năng; 5 → 7 → 8 ca bộ thử) — kết quả vòng trước gắn nhãn lịch sử ở bảng đầu hồ sơ, không trình bày như hiện hành.
- Hạn chế ghi nhận: WebKit là giả lập; điều hướng mũi tên hộp thoại ngoài phạm vi (xác nhận GPT Work tại TXN-56); hiệu năng kho lớn chưa đo.
