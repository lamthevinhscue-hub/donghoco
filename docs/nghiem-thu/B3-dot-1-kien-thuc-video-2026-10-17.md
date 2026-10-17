# B3 đợt 1 — Đưa kiến thức video vào bài kèm nguồn: chống từ + chống nước

- **Giao dịch:** TXN-20261017-82 (danh mục DHC-HOAN-THIEN-20261011) — câu lệnh thi công do GPT Work soạn trên nền HEAD `2031976`; phán quyết bổ sung trong phiên: "PHÁN QUYẾT TIẾP TỤC B3 ĐỢT 1 — NGOẠI LỆ NGUỒN ROLEX".
- **Ngày thi công:** 17/10/2026. **Trạng thái: CHỜ NGHIỆM THU (đợt 1/3 — chưa khép gói B3).**
- **Bảng nguồn truy vết (nguyên văn + ngày đọc thật):** `output/b3-batch1-content-audit/../b3-video-kien-thuc/bang-nguon-dot-1.md` — 7 ý chống từ (4 đưa, 3 hoãn), 6 ý chống nước (4 đưa + 1 sửa attribution hiện hữu, 1 hoãn).

## 1. Phạm vi đã sửa (10 tệp — theo câu lệnh tối đa 9 + 1 tệp được duyệt bổ sung)

| # | Tệp | Thay đổi |
|---|---|---|
| 1 | `src/content/coChe/vi/chong-tu.md` | +3 nguồn (Seiko sg-en, IWC press, ISO 764:2020; thay URL METAS); +bullet IWC vỏ sắt mềm; +đoạn vai trò ISO 764 (không nêu số); +đoạn Seiko nhanh-hoặc-chậm; bullet khử từ nơi chuyên môn; `updated` → 2026-10-17 |
| 2 | `src/content/coChe/en/anti-magnetism.md` | đối xứng VI; thêm câu sửa câu "this article does not" (N2 R2 bắt khi `updated` mới đưa bài vào phạm vi) |
| 3 | `src/content/coChe/vi/chong-nuoc.md` | +3 nguồn (ISO 6425:2018, NOAA, Rolex); +mục "Áp suất tăng theo độ sâu" (xấp xỉ, phân biệt phần tăng thêm, không suy hoạt động); +nguồn ISO trực tiếp cạnh 100 m + câu không suy ngược; tách van helium khỏi câu "Theo Omega" (Omega FAQ không nêu helium — lỗi attribution hiện hữu được sửa); diễn giải van helium theo Rolex; sửa câu "1 bar bằng 1 atm" thành cách nói làm tròn; `updated` → 2026-10-17 |
| 4 | `src/content/coChe/en/water-resistance.md` | đối xứng VI |
| 5 | `scripts/check-protection-cluster.mjs` | ngoại lệ hẹp (2 bài chống từ, 2 rule): CHỈ miễn TỪNG match thuộc đúng nhóm thuật ngữ đã duyệt (Ingenieur/sắt mềm/soft-iron; khử từ/demagnetiz) trên dòng có attribution Seiko/IWC; nguồn = parse YAML, chỉ nhận mảng `sources` đúng khóa, URL khớp tuyệt đối phần tử url; match khác cùng rule (KIF, VND, milgauss…) vẫn FAIL kể cả cùng dòng |
| 6 | `scripts/check-b3-batch1-content.mjs` | MỚI — N1 URL trong khối sources; N2 10 nhóm ý VI/EN (30 chuỗi); N3 7 nhóm ý hoãn/khung tuyệt đối; D1 dist `<article>` (bỏ details/phụ đề C2, ghép node không chèn khoảng trắng, chuẩn hóa nháy cong) + href trong source-list; D2 video -vi/-en; tham số `--dist` bắt buộc + `--root`, lạ/thiếu → exit 2 có chẩn đoán |
| 7 | `scripts/check-daily-care-cluster.mjs` | ngoại lệ có cấu trúc theo phán quyết GPT Work: chỉ 2 bài chống nước; chỉ phần tử sources có ĐÚNG URL Rolex được miễn chuỗi "waterproofness" trong URL + tiêu đề "Mastering waterproofness" trong label của chính phần tử đó; thân bài (kể cả dòng vừa claim vừa URL), phần còn lại của label, URL sai đường dẫn, bài khác, component → kiểm như cũ |
| 8 | `CAN-KIEM-CHUNG.md` | +6 mục 62–67 (ý hoãn đợt 1) |
| 9 | `docs/nghiem-thu/B3-dot-1-kien-thuc-video-2026-10-17.md` | biên bản này |
| 10 | `docs/giao-viec/THEO-DOI.md` | chỉ hàng B3 → "Đợt 1 — Chờ nghiệm thu" |

Không sửa package.json (checker B3 chạy riêng), không sửa video/phụ đề/template/schema, không đụng các gói khác. Sửa dở ngoài gói (THEO-DOI các hàng hoàn tất, phụ lục biên bản C4/C5, A2/A3/A4/C1-B2) giữ nguyên.

## 2. Đã kiểm (kết quả script đối chiếu được trong repo — vòng 2, sau lệnh "SỬA TỐI HẸP")

| Kiểm | Kết quả |
|---|---|
| `npm run check` | exit 0 — 24/24 kiểm ĐẠT (bao gồm protection + daily-care sau ngoại lệ, N2 giọng văn) |
| `npm run build` | exit 0 — dist 360 tệp HTML = 359 trang thường + 404.html; 4 route đích có index.html |
| `astro check` | 0 errors, 0 warnings, **7 hints = baseline** (không hint mới từ gói) |
| `node scripts/check-b3-batch1-content.mjs --dist dist` | ĐẠT — N1 14 URL khớp TUYỆT ĐỐI phần tử mảng `sources` (parse YAML js-yaml); N2 10 nhóm/30 chuỗi VI+EN; D1 4 trang: văn bản hiển thị trong `<article>` đủ ý + `section.source-list` PHẢI nằm trong article, chỉ đếm `<a href>` thật; N3 7 nhóm hoãn vắng mặt; D2 video -vi/-en: frontmatter + tệp dist + **src render thật trong article** |
| `git diff --check` | sạch (exit 0) |
| Bộ thử sandbox `output/b3-batch1-content-audit/bo-thu-b3-dot-1.mjs` (vòng 3, 29 ca thực chạy) | **29/29 DAT**: 2 lượt sạch riêng (trước/sau) × 3 checker + 27 ca mutation (M1–M11, PA–PC, PD–PE, R1–R5, PF–PG, Q1–Q2, PH1–PH2); mỗi ca XÁC MINH mutation tạo đúng trạng thái rồi mới chạy; nhận rule từ DÒNG CHẨN ĐOÁN CHÍNH THỨC (`[R5]`/`[N1]`/`[D1]`/`[D2]` + từ khóa match `"KIF"`/`"Ingenieur"`/`"khử từ"`); crash/timeout/mutation sai trạng thái = thất bại; hoàn nguyên byte từng ca; hash 7 tệp gói trước/sau khớp (repo không rò rỉ) |
| Probe GPT Work đã thành mutation | 6/6 probe của vòng tái nghiệm giờ bị bắt đúng: PA (URL IWC giả + URL đúng ở khóa `auditNote` → protection `[R5]` + B3 `[N1]`); PB ("IWC sắt mềm KIF." → match `"KIF"` FAIL); PC ("Seiko: tự khử từ tại nhà, 500 VND." → match `"VND"` FAIL); PD (URL Rolex cộng đuôi → không khớp tuyệt đối → FAIL); PE (đổi khóa `sources`→`auditSources` → cả hai FAIL); PF (source-list ra ngoài article → `[D1]`); PG (trang VI render video EN → `[D2]`) |
| Kiểm trình duyệt `output/b3-batch1-content-audit/kiem-trinh-duyet.mjs` (vòng 2 — byte nội dung 4 bài và dist KHÔNG đổi qua vòng 3, bằng chứng giữ cho đúng bản này) | **16/16 DAT**: 4 route × {chromium, webkit} × {sáng, tối} ở 390px — ghi URL từng lượt; HTTP 200; đoạn mới hiển thị qua article.innerText; link nguồn mới đọc được; tràn ngang 0px; switcher đúng cặp; **xác minh theme thật: `html.dark` đúng trạng thái từng lượt + màu nền sáng `rgb(251, 251, 248)` ≠ tối `rgb(17, 21, 25)` ở 4/4 cặp**; 0 pageerror/console/request-failed ngoài 404 `_vercel/insights/script.js` + `_vercel/speed-insights/script.js` (chỉ miễn đúng HTTP 404 hai endpoint này; console 404 chỉ được đối trừ khi khớp 404 HTTP đã xác minh cùng context) |
| Bảng đếm từ (phương pháp N2) | chong-tu 756 ↔ anti-magnetism 603 (0,798 ≤ 1,25); chong-nuoc 1613 ↔ water-resistance 1369 (0,849 ≤ 1,25) |

## 3. Chưa kiểm / giới hạn

- Chưa kiểm screen reader thật (chưa từng nằm trong chuỗi hiện hành).
- Nguồn ISO đọc qua web reader vì iso.org chặn WebFetch (403); nguyên văn abstract đã ghi bảng nguồn; phần thân chuẩn (4.800 A/m, 125%) không có trong nguồn công khai → hoãn theo CAN-KIEM 65/66.
- 404 `_vercel/insights|speed-insights/script.js` trên preview localhost: bộ kiểm chỉ miễn đúng HTTP 404 hai endpoint này; **không dùng làm bằng chứng "endpoint chỉ tồn tại trên production"** (chưa đối chiếu production — ghi nhận là hành vi preview chưa giải thích thêm).
- Lỗi attribution van helium gán cho Omega trong bài cũ: đã sửa trong đợt này (tách câu); nguồn Omega FAQ giữ nguyên vai trò cho phần gioăng.
- Số liệu trình duyệt là preview localhost, không phải production.

## 4. Phần hoãn (ghi CAN-KIEM-CHUNG.md, không đưa lên bài)

62 — cơ chế vòng dây dính nhau; 63 — silicon/hợp kim thuận từ; 64 — "nhiều phút mỗi ngày"; 65 — ISO 764 số 4.800 A/m/60 gauss; 66 — ISO 6425 mức 125%; 67 — gioăng chữ O ép dẹt.

## 5. Lịch sử vòng của đợt 1

1. Khảo sát 6 video GHI-CHU + kiểm nhanh ISO → TXN-82 xin câu lệnh.
2. Câu lệnh đợt 1 (9 tệp): thi công theo bảng nguồn; N2 bắt 1 câu EN cũ ("this article does not") do `updated` mới đưa bài vào phạm vi — sửa tối hẹp.
3. `npm run check` còn 4 lỗi "waterproof" ở frontmatter (URL Rolex trang gốc chứa slug) → trình GPT Work; phán quyết: không duyệt allow cả dòng, duyệt ngoại lệ có cấu trúc + thêm 1 tệp phạm vi (daily-care checker) → triển khai, scope phát hành tối đa 10 tệp.
4. Sửa 3 lỗi thiết kế checker (vòng quét article bỏ details/phụ đề C2, ghép node không chèn khoảng trắng, chuẩn hóa nháy cong của remark); bỏ 1 hint astro check mới; bộ thử 18/18 sau 4 vòng chỉnh ca.
5. **TXN-83 trình tái nghiệm → CHƯA ĐẠT.** GPT Work chạy lại checker sạch (đạt) + bộ thử 18/18 (đạt) + hai diff-check (sạch), nhưng 6 probe độc lập trên bản sao chứng minh 2 ngoại lệ còn rộng hơn phép duyệt: URL đúng giấu ở khóa `auditNote` vẫn qua; dòng "IWC sắt mềm KIF." lọt cả KIF; "Seiko: tự khử từ tại nhà, 500 VND." lọt cả VND; URL Rolex đúng tiền tố cộng đuôi vẫn khớp; đổi khóa `sources`→`auditSources` vẫn qua; source-list ra ngoài article vẫn qua; ngoài ra trang VI render video EN không bị phát hiện, bộ thử nhận rule theo từ khóa "waterproof" thay vì dòng chẩn đoán, trình duyệt chưa xác minh class dark/nền thật, biên bản gọi lỗi localhost preview là "endpoint chỉ có ở production" mà không có bằng chứng.
6. **Lệnh "SỬA TỐI HẸP B3 ĐỢT 1"** (giữ phạm vi 10 tệp): (a) cả 3 checker parse YAML frontmatter bằng js-yaml, chỉ nhận mảng `sources` đúng khóa, so URL tuyệt đối từng phần tử; (b) protection chỉ miễn TỪNG match thuộc nhóm thuật ngữ duyệt (KIF/VND/milgauss cùng dòng vẫn FAIL); (c) daily-care chỉ miễn 2 dòng label/url của CHÍNH phần tử hợp lệ (định vị trong khối `sources:`, so dòng nguyên văn); (d) B3 D1 bắt buộc `section.source-list` trong article, D2 đối chiếu src video render thật theo ngôn ngữ; (e) bộ thử 23 ca mutation gồm cả 6 probe trên, nhận rule từ dòng chẩn đoán chính thức, xác minh mutation trước khi chạy; (f) trình duyệt ghi URL/lượt, xác minh `html.dark` + màu nền sáng/tối khác nhau 4/4 cặp; (g) biên bản đính chính phần preview/production.
7. TXN-84 tái nghiệm lần 2 → **CHƯA ĐẠT** với 2 lỗ hổng mới được xác nhận trên bản sao: (a) dòng "Seiko: tự khử từ tại nhà." không kèm chi phí vẫn lọt — ca PC trước chỉ pass nhờ bắt VND, ngoại lệ dựa vào tên Seiko trên dòng, chưa gắn đúng đoạn đã duyệt; (b) bọc source-list trong `<div hidden>` vẫn exit 0 — bộ tìm section đi qua vùng ẩn.
8. **Lệnh "SỬA TỐI HẸP B3 ĐỢT 1 — sau TXN-20261017-84"** (giữ nguyên nội dung 4 bài + phạm vi 10 tệp; không cần chạy lại trình duyệt vì byte sản phẩm không đổi): (a) protection — cửa sổ rule 4 đòi DÒNG chứa cả hướng dẫn chuyên môn ("Seiko hướng dẫn mang tới trung tâm dịch vụ của hãng để" / "Seiko's guidance is to have the watch demagnetized at a service centre") VÀ giới hạn không tự thực hiện ("không phải thao tác tự làm tại nhà" / "not a do-it-yourself step at home"); thêm 2 ca Q1/Q2 chỉ tự khử từ không kèm chi phí → FAIL đúng R5; đoạn gốc hợp lệ vẫn PASS; giữ hồi quy KIF/VND và nguồn có cấu trúc; (b) B3 D1 — bộ tìm section.source-list bỏ toàn bộ subtree ẩn (hidden/display:none/aria-hidden) trên đường đi; thêm 2 ca PH1 (div hidden) / PH2 (display:none) → FAIL đúng D1; giữ kiểm section trong article + class token + href thật; (c) biên bản ghi rõ PC vòng trước bắt VND chứ chưa bảo vệ riêng hành vi tự khử từ, cập nhật số ca theo thực chạy.
9. Kết quả vòng 8 (mục 2 bảng trên): mọi kiểm ĐẠT — chờ GPT Work tái nghiệm lần 3.

## 6. Bước tiếp

Trình GPT Work tái nghiệm độc lập đợt 1. Đợt 2 (GMT + dạ quang) và đợt 3 (dây tóc) làm tiếp sau khi đợt 1 được duyệt theo tiêu chí "nghiệm thu theo từng đợt".
