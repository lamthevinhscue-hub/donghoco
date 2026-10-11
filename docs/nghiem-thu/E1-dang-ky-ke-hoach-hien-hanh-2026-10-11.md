# BIÊN BẢN THI CÔNG E1 — Đăng ký kế hoạch hiện hành

**Gói:** E1 — đăng ký kế hoạch hoàn thiện 11/10/2026 làm kế hoạch điều phối duy nhất
**Danh mục:** DHC-HOAN-THIEN-20261011 v1.0.0
**Giao dịch:** TXN-20261011-01 (câu lệnh thi công của GPT Work)
**Ngày thi công:** 11/10/2026
**Bên thi công:** GLM (phiên điều phối ZCode). Bên nghiệm thu: GPT Work.

## 1. Nền và trạng thái ban đầu

- Git: nhánh `main`, HEAD `6e60c37` = `origin/main` ("docs(image): note OG image set and fix L3 expectation").
- **Sửa dở được tiếp nhận:** `docs/CHI-MUC-KE-HOACH-HIEN-HANH.md` có sửa chưa commit từ phiên điều phối trước (chuyển kế hoạch giai đoạn 3 sang "Tạm dừng có điều kiện"; thêm kế hoạch 26/09 vào mục 1 làm hiện hành — nội dung đã thống nhất với GPT Work tại TXN-320, chưa được commit, chưa phát hành lần nào). Theo câu lệnh, sửa dở này được giữ làm nền truy vết, không reset, không ghi đè bằng bản HEAD.
- Hash SHA-256 các tệp trước sửa: `output/e1-plan-index-audit/hash-truoc-sua.txt`; diff ban đầu của CHI-MUC: `output/e1-plan-index-audit/chimuc-sua-do-ban-dau.diff`.
- Không dọn tệp untracked; không đụng tệp ngoài phạm vi.

## 2. Thay đổi theo từng tệp (phạm vi 6 tệp của câu lệnh)

### 2.1 `docs/KE-HOACH-HOAN-THIEN-CUOI-2026-10-11.md` (đồng bộ tối hẹp)

- Mục 4 dòng đợt 1: bỏ A5 khỏi danh sách thi công ("A1, A2, A3, A5; …" → "A1, A2, A3; …") vì A5 đã hoãn theo mục 0. Không đổi ô khác của dòng.
- Mục 5: gắn nhãn tiêu đề — "## 5. Câu hỏi để anh quyết định (lịch sử — anh Vinh đã trả lời tại mục 0 ngày 11/10/2026; mục 0 điều hành hiện tại)".
- Mục 5: tách câu hỏi 4 và 5 bị dính dòng ("…cần anh đồng ý rõ.5. **Chuyên mục Ghi chép (D1):**…" → hai dòng riêng). Không đổi chữ câu hỏi.
- Mục 0 giữ nguyên văn toàn bộ.

### 2.2 `docs/giao-viec/00-DIEU-PHOI-TONG.md` (đồng bộ tối hẹp — phân vai A1)

- Hàng GLM bảng phân vai: "(3) thao tác Search Console" → "(3) chuẩn bị đầu vào gói A1 (danh sách địa chỉ)".
- Hàng GPT Work: thêm "; **thao tác Search Console cho gói A1** theo quyết định mục 0 kế hoạch cuối (anh cho phép 11/10/2026)".
- Không sửa mục khác.

### 2.3 `docs/CHI-MUC-KE-HOACH-HIEN-HANH.md`

- Dòng đầu: thêm dòng "**Cập nhật:** 11/10/2026 (gói E1, danh mục DHC-HOAN-THIEN-20261011, giao dịch TXN-20261011-01, nền HEAD `6e60c37`)"; giữ nguyên ngày lập và nền H01.
- Mục 1: thay bảng — ba dòng bộ điều phối mới (kế hoạch 11/10/2026 "Hiện hành — anh Vinh duyệt 11/10/2026"; điều phối tổng `giao-viec/00-DIEU-PHOI-TONG.md`; bảng theo dõi `giao-viec/THEO-DOI.md`) + dòng "Tệp này" (thêm E1 vào cột gói liên quan). Bốn dòng cũ (kế hoạch giai đoạn 3, kế hoạch 26/09, bộ giao việc H01–H14, kế hoạch phát triển hợp nhất) chuyển xuống mục 4.
- Câu quy tắc sau bảng mục 1: thay "ngoài hai kế hoạch điều phối nêu trên…" bằng quy tắc thi công theo bộ mới (vòng đời mục 2 của điều phối tổng; commit chỉ khi GPT Work nghiệm thu ĐẠT và cho phép phạm vi tệp; tài liệu cũ chỉ để truy vết).
- Mục 2: đổi tiêu đề thành "Số liệu và quy tắc đã chốt tại gói H01 (19/09/2026) — lịch sử truy vết" + dòng lưu ý E1; nội dung 7 điểm giữ nguyên.
- Mục 4: thêm 4 dòng lịch sử đầu bảng (kế hoạch giai đoạn 3 — giữ mã DHC-GD3-20260925, tạm dừng có điều kiện 27/09; kế hoạch 26/09 — giữ mã DHC-ANH-HOAT-ANH-20260926 + ngày duyệt 28/09 + kết quả V1 `7a0b27f`, D5, V3 rút lại `7250239`→`77ae889`; bộ giao việc H01–H14; kế hoạch phát triển hợp nhất — hai dòng ghi "chuyển khỏi bảng điều phối hiện hành tại gói E1").
- Mục 7: thêm dòng lưu ý E1 — danh sách phát hành lịch sử của H01, không phải phạm vi commit hiện hành.
- Mục 8: thêm bullet quy tắc phát hành mới + theo dõi ở THEO-DOI/DHC-HOAN-THIEN-20261011.
- Mục 9: thêm dòng 11/10/2026 — E1, ghi rõ giao dịch, các chuyển mục 1→4, việc tiếp nhận sửa dở (không tính là một lần phát hành), và việc lưu Git cùng đợt các đích liên kết.

### 2.4 `docs/giao-viec/THEO-DOI.md`

- Hàng E1: "Đang chuẩn bị" → "Đang thi công" (khi nhận câu lệnh) → "Chờ nghiệm thu" (khi xong biên bản), cột biên bản dẫn liên kết tương đối `../nghiem-thu/E1-dang-ky-ke-hoach-hien-hanh-2026-10-11.md`, ghi chú câu lệnh theo TXN-20261011-01. Không đổi hàng gói khác.

### 2.5 `docs/ke-hoach-bo-sung-hinh-anh-hoat-anh-2026-09-26.md`

- **Nguyên trạng** (hash trước = hash sau, xem mục 4) — đưa vào danh sách đề nghị commit để liên kết lịch sử từ CHI-MUC mở được trên GitHub; không thêm hiệu lực điều phối.

### 2.6 `docs/nghiem-thu/E1-dang-ky-ke-hoach-hien-hanh-2026-10-11.md`

- Mới — biên bản này.

## 3. Lệnh kiểm và kết quả

- `node output/e1-plan-index-audit/check-e1.mjs` — checker nội bộ 25 phép kiểm (mục 7 câu lệnh; số phép kiểm được script tự đếm ở T8 và đối chiếu với biên bản, không khóa cứng một số): kết quả chạy thật ghi ở mục 4.
- `git diff --check` — kiểm whitespace.
- `git diff --cached --check` — kiểm whitespace vùng stage (kỳ vọng sạch vì chưa stage).
- `node scripts/scan-chars.mjs` — lưu ý theo câu lệnh: script này quét `src/`, không chứng minh chất lượng docs; chất lượng ký tự của 6 tệp docs do checker E1 kiểm riêng (UTF-8 không BOM + newline cuối).

## 4. Kết quả chạy thật

| Lệnh | Kết quả |
|---|---|
| `node output/e1-plan-index-audit/check-e1.mjs` | **ĐẠT 25/25, exit 0** — T1 mục 1/mục 4 (7), T2 đích liên kết (3), T3 mục 9, T4 phân vai A1 + A5 tuần 1 + mục 0 nguyên văn, T5 hàng E1 + biên bản, T6 sáu tệp UTF-8 không BOM + newline cuối (6), T7 nhãn trước duyệt hai đề nghị dịch cũ (2), T8 số phép kiểm biên bản khớp script |
| `git diff --check` | exit 0 (không cảnh báo whitespace) |
| `git diff --cached --check` | exit 0 (chưa stage gì nên sạch) |
| `node scripts/scan-chars.mjs` | exit 0 — "OK: Không phát hiện ký tự ngoài tiếng Việt/Anh trong src/. Đã quét 462 file." (script quét `src/`, không chứng minh docs — 6 tệp docs do checker E1 kiểm riêng) |
| Đối chiếu hash trước/sau | `docs/ke-hoach-bo-sung-hinh-anh-hoat-anh-2026-09-26.md` **nguyên trạng** (SHA-256 trước = sau: `507882a7…`); các tệp còn lại đổi đúng theo mục 2; hash lưu `output/e1-plan-index-audit/hash-truoc-sua.txt` và `hash-sau-sua.txt` |

## 5. Việc chưa thực hiện

- Chưa stage, chưa commit, chưa push — chờ GPT Work nghiệm thu ĐẠT và cho phép phạm vi tệp.
- Không chạy build/`astro check`/`check:types`: gói chỉ sửa tệp trong `docs/`, không ảnh hưởng mã nguồn hoặc trang dựng (theo đúng câu lệnh mục 7).
- Không sửa thêm quyết định ở mục 0 của kế hoạch cuối; không mở gói khác.

## 6. Vòng sửa

### Vòng 1 (theo tái nghiệm thu TXN-20261011-02 — GPT Work phán CHƯA ĐẠT ngày 11/10/2026)

1. `docs/KE-HOACH-HOAN-THIEN-CUOI-2026-10-11.md`: gắn nhãn lịch sử trước duyệt cho hai nhận định còn mang nghĩa hiện hành — ô "Hệ quả" của dòng "Khách nước ngoài" (bổ sung "(nhận định trước duyệt — quyết định hiện hành tại mục 0: dịch toàn bộ 64 thương hiệu còn thiếu)") và dòng nhãn in nghiêng dưới tiêu đề "Điểm hai bên khác nhau và cách tôi đề nghị" (nêu rõ quyết định hiện hành D4: dịch toàn bộ 64 thương hiệu còn thiếu; mẫu tiêu biểu chưa dịch). Giữ nguyên số liệu quan sát và mục 0.
2. Biên bản: sửa "25 tiêu chí" theo số phép kiểm thật của script (đồng bộ tự động, xem T8); mô tả đúng đường dẫn liên kết biên bản trong THEO-DOI là `../nghiem-thu/…`.
3. Checker bổ sung: T7a/T7b bắt hai đề nghị dịch cũ còn mang nghĩa hiện hành; T8 kiểm số tiêu chí ghi trong biên bản khớp số phép kiểm chạy thật (đếm theo `ketQua` — T8 là phép kiểm cuối nên tổng bằng `ketQua.length + 1`).
4. Chạy lại checker, scan-chars và hai diff-check; kết quả thật ở mục 4.
