# Biên bản I1 — hồ sơ nguồn năm mẫu biểu tượng toàn cầu

- Giao dịch: TXN-20260926-231 (danh mục TXN-20260926-230) — hồ sơ nguồn, ngày thực hiện 2026-09-26.
- Nền: xác nhận trước khi làm — HEAD = origin/main = `952964f`, staged 0, tracked sửa 0 (git log -5: 952964f → 84b1712); untracked có trước giữ nguyên.

## Phạm vi thực hiện

- Chỉ tạo 2 tệp tài liệu: `docs/ho-so-nguon-I1-nam-bieu-tuong-toan-cau-2026-09-26.md` + biên bản này; bằng chứng, checker, log tại `output/i1-iconic-source-audit/`.
- KHÔNG đụng `src/`, `public/`, `scripts/`, `package.json`, `vercel.json`, tài liệu kế hoạch; KHÔNG viết bài 1.200–2.000 từ, KHÔNG sửa bài hiện có, KHÔNG tạo ảnh.

## Kết quả 5 mẫu

- 5/5 SẴN SÀNG — kết quả bằng chứng (mỗi mẫu ≥2 URL chính hãng/archive truy cập được trong ngày 26/09), không phải mục tiêu đặt trước. Ranh giới từng claim nằm trong bảng claim + danh sách loại của hồ sơ.
- Ưu tiên Speedmaster: bằng chứng dày nhất — 6 URL omega chính hãng (catalog Moonwatch, 3 chronicle, heritage FOIS, FAQ) + 2 đối tượng Smithsonian (Stafford Gemini 6 1965, ASTP 1975); bài VI hiện có 356 từ là ngắn nhất.
- Bài VI hiện có: Submariner 556, Speedmaster 356, GMT-Master 675, Royal Oak 392, Nautilus 381 từ; cả 5 có bản EN song ngữ qua contentRoutes (`/en/iconic-watches/<slug>/`, 5 cặp đều có trong dist).

## Điểm đáng lưu ý / lệch đề ghi minh bạch

1. URL Smithsonian đề xuất ban đầu (`nasm_A19730048000`) trả 404 — đã thay bằng 2 URL đối tượng thật (Stafford Gemini 6 `nasm_A19771144000`, ASTP `nasm_A19771186000`), cả hai tải được với nguyên văn.
2. rolex.com + newsroom.rolex.com: mọi đường fetch tự động bị 403 (Akamai); nội dung thu qua công cụ đọc web từ trang sống. Hồ sơ phân hai mức bằng chứng: [đầy đủ] và [chốt-trình-duyệt] — các câu [chốt-trình-duyệt] nên mở bằng trình duyệt chốt nguyên văn trước khi viết bài.
3. FHH: không truy cập được entry nào có nội dung (entry Gérald Genta trả stub redirect 74 byte; entry encyclopedia 403) — I1 không có trích FHH nào.
4. Claim bị loại đáng chú ý: mọi reference thế hệ (6204/6536/6538/6542/3700), Speedmaster 1957 (chưa có nguyên văn chính hãng — mốc timeline 1957 giữ hiện trạng nguồn riêng G07), Silver Snoopy, Buzz Aldrin, "đầu tiên thế giới 2 múi giờ", giá Nautilus 1976 — chi tiết trong hồ sơ.
5. Frontmatter bài Submariner hiện có dùng Hodinkee/Monochrome — trong hồ sơ I1 xếp mức "báo chuyên ngành, chỉ đối chiếu"; nguồn chính hãng thay thế đã thu (newsroom 2020/2024 + PDP + features).

## Lý do không chạy build

I1 không thay đổi tệp nào thuộc đường build (`src/`, `public/`, `scripts/`, `package.json`, `vercel.json` untouched) — build không phản ánh thay đổi hồ sơ tài liệu trong `docs/`.

## Kiểm tra đã chạy

- Checker `output/i1-iconic-source-audit/kiem-i1.mjs` — kết quả trong `kiem-i1.log.txt`: đủ 5 mẫu + trạng thái; tổng cứng 5 SẴN SÀNG / 0 / 0; 27 URL khớp 2 danh sách (21 nguồn HTTPS + 6 không-làm-nguồn); truy cập lại 21 URL nguồn (2xx; URL không-2xx chỉ đạt khi nằm trong allowlist hẹp R4 có bằng chứng trong hồ sơ — ngoại lệ duy nhất: newsroom 2020 Submariner, mã 404; lỗi mạng/timeout luôn FAIL); mọi route nội bộ tồn tại trong dist (VI + EN + route dẫn); bảng chống trùng tổng hợp 5 dòng + R6b đồng bộ trạng thái với chi tiết; 2 tệp docs UTF-8 no BOM + newline cuối.
- Mutation ngoài repo: bản sao `D:/i1-mut` (hồ sơ + biên bản) với 2 lỗi cố ý — bỏ trạng thái M3, hỏng 1 route M2 — checker (env I1_ROOT/I1_DIST_ROOT) phải fail đúng các điểm đó; hoàn nguyên byte-đối-byte (SHA-256 khớp) rồi chạy sạch lại — log `kiem-i1-mutation.log.txt`.
- `node scripts/scan-chars.mjs`, `git diff --check`, `git diff --cached --check` — kết quả ghi dưới (báo cáo).

- VÒNG SỬA 1 (TXN-20260926-233): lỗi checker cũ — `DA_DOC_QUA_CONG_CU_DOC_WEB = URL_NGUON` cho phép mọi URL nguồn (kể cả 404, lỗi mạng) đều coi là đạt, và số liệu cũ ghi "22 nguồn + 4 không-làm-nguồn". Đã siết: allowlist hẹp chỉ chứa https://newsroom.rolex.com/watches/new-watches-2020/submariner với đúng mã 404 (bằng chứng đọc qua công cụ đọc web ghi trong hồ sơ); lỗi mạng/timeout luôn FAIL; thêm R2c — mỗi mẫu SẴN SÀNG phải có ≥2 URL thuộc danh sách nguồn trong chính khối của mẫu; đồng bộ số đúng **21 nguồn + 6 không làm nguồn = 27 URL** ở checker, hồ sơ, biên bản. Không đổi claim, URL nguồn, trạng thái 5/5 hay phạm vi viết — chỉ siết kiểm chứng và đồng bộ số liệu.

## Trạng thái Git cuối vòng

- 2 tệp docs mới (untracked) + `output/i1-iconic-source-audit/` (nội bộ, không commit); tracked sửa 0; staged 0; chưa commit, chưa push — DỪNG chờ GPT Work nghiệm thu.
