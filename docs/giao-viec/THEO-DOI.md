# THEO DÕI THI CÔNG — Kế hoạch hoàn thiện kienthucdonghoco.vn (tháng 10–12/2026)

**Cập nhật:** 11/10/2026
**Quy tắc áp dụng:** `docs/giao-viec/00-DIEU-PHOI-TONG.md` mục 2 và 3; quyết định anh Vinh ở mục 0 kế hoạch cuối có hiệu lực cao nhất.
**Vòng đời một gói:** Đang chuẩn bị → GPT Work tạo câu lệnh → Đang thi công → biên bản → Chờ nghiệm thu → GPT Work ĐẠT → commit, push, kiểm trang thật → Hoàn tất. Gặp điểm cần anh quyết: Dừng chờ anh.
**Nguyên tắc commit:** chỉ commit khi GPT Work nghiệm thu ĐẠT và cho phép; stage đúng phạm vi tệp của gói; không commit đè việc đang dở; tệp điều phối (`docs/giao-viec/`, biên bản) chỉ commit khi câu lệnh của gói quy định.

Trạng thái dùng: Chưa mở / Đang chuẩn bị / Đang thi công / Chờ nghiệm thu / Yêu cầu sửa / Hoàn tất / Dừng chờ anh.

## Đợt 1 — tuần 12–18/10/2026

| Mã | Việc | Trạng thái | Biên bản | Nghiệm thu GPT Work | Commit | Ngày hoàn tất | Ghi chú |
|---|---|---|---|---|---|---|---|
| E1 | Đăng ký kế hoạch hiện hành | **Hoàn tất** | [Biên bản E1](../nghiem-thu/E1-dang-ky-ke-hoach-hien-hanh-2026-10-11.md) | ĐẠT (TXN-20261011-03, sau vòng sửa 1) | `97ed0af` | 11/10/2026 | 6 tệp, +804/−6; push `6e60c37..97ed0af` đã đối chiếu ls-remote; gói docs-only nên trang thật không đổi; vòng 1 CHƯA ĐẠT đã sửa (nhãn trước duyệt D4 + số phép kiểm) |
| C0 | Sửa phạm vi bộ kiểm tra (`tsconfig.json` loại `output`) | **Hoàn tất** | [Biên bản C0](../nghiem-thu/C0-pham-vi-bo-kiem-tra-2026-10-11.md) | ĐẠT (TXN-20261011-06, sau vòng sửa 1) | `09261e7` | 11/10/2026 | 7 tệp, +390/−6; push `97ed0af..09261e7`; astro check 332 hints → 0/0/0; fixture G08 tách khỏi output/ (885 tệp output/ tracked được phát hiện và giữ nguyên); vòng 1 CHƯA ĐẠT đã sửa (K1a đúng tập, build bản sao, tách kịch bản/lệnh, trả hàng Hồ sơ) |
| B1 + B2 | Sửa 8 lỗi chuyên môn, bỏ biểu tượng ✅⚠️❌💡 | **Hoàn tất** | [Biên bản B1+B2](../nghiem-thu/B1-B2-sua-loi-chuyen-mon-2026-10-11.md) | ĐẠT (TXN-20261011-12, sau 4 vòng sửa) | `405ff64` | 12/10/2026 | 34 tệp, +592/−87; push `09261e7..405ff64`; trang thật xác nhận nội dung mới + khối nguồn VI/EN (Mark 11/1949, điểm quay đầu, thợ đồng hồ, 2400 nhuận, Ghi chú không emoji); 4 vòng sửa: vá P0-D2, URL chính xác trong mảng sources, href trong section source-list, mutation hoàn nguyên SHA từng ca |
| B7 | Xuất bản 3 bài "Hiểu đúng" | **Hoàn tất** | [Biên bản B7](../nghiem-thu/B7-hieu-dung-2026-10-12.md) | ĐẠT (TXN-20261011-18, sau 5 vòng: dừng nguồn PA1 + 3 vòng sửa) | `cb9e567` | 12/10/2026 | 14 tệp, +1054/−9; push `405ff64..cb9e567`; production: 6/6 bài + 2 hub 200, nội dung + khối nguồn xác nhận (ổ đỡ, incabloc, thẻ hub); bộ thử 15/15 mutation + 2/2 U1 + 2/2 lượt sạch |
| A1 | Đẩy lập chỉ mục (15 địa chỉ) | **ĐẠT pha gửi yêu cầu 15/15 URL theo TXN-20261015-34 — chờ đo kết quả khoảng 29/10/2026** | [Biên bản A1](../nghiem-thu/A1-lap-chi-muc-2026-10-12.md) (mục 8–9) | TXN-20261011-20: 12/15 nhận 12/10; TXN-20261015-33: 3/3 nhận 15/10 sau khi anh xác thực phiên SC; TXN-20261015-34: ĐẠT pha gửi yêu cầu | — | — | Không ghi A1 Hoàn tất/da_hoan_tat — chưa miễn tiêu chí đo lại báo cáo "Trang" của SC (~29/10/2026), trình riêng khi đến hạn; "Google nhận yêu cầu" ≠ "đã lập chỉ mục" |
| A2 | Bật Speed Insights | **Chờ nghiệm thu** (vòng sửa TXN-05 xong) | [Biên bản A2](../nghiem-thu/A2-speed-insights-2026-10-12.md) | — | — | — | TXN-01 câu lệnh; TXN-02, TXN-03, TXN-04, TXN-05 bốn vòng siết checker + bộ thử (11 ca sandbox, bundle-chỉ-chú-thích) + đồng bộ hồ sơ; build exit 0 361 trang, hints 5. Hàng A1 giữ nguyên |
| A3 | Biểu tượng trang ICO, PNG, iPhone | **Chờ nghiệm thu** (vòng sửa TXN-14 xong) | [Biên bản A3](../nghiem-thu/A3-bieu-tuong-trang-2026-10-12.md) | — | — | — | TXN-10 câu lệnh; TXN-12 → SVG hash + ICO sharp pixel + alpha mọi pixel + 404; TXN-13 → ICO an toàn + payload pixel; TXN-14 → PNG signature+pixel+format; 13/13 mutation + 2/2 lượt sạch; hints 6 (1 ngoài A3). Hàng A1/A2 giữ nguyên |
| C1 (bước 1) | Khảo sát giảm dung lượng video | Chưa mở | — | — | — | — | Chỉ miễn phí; **dừng chờ anh duyệt** trước bước 2 |
| C1-B2 | Thi công nén video theo phương án duyệt | **Vòng v5 xong sau tái nghiệm thu TXN-30 — chờ tái nghiệm thu** | [Biên bản C1-B2](../nghiem-thu/C1-B2-nen-video-2026-10-14.md) (mục 10) | TXN-28/29/30 CHƯA ĐẠT (lần lượt 2/3/1 thiếu sót) → đã sửa đủ từng vòng | — (chưa commit; phạm vi tối đa 20 tệp giữ nguyên) | — | **Vòng v5 theo TXN-30 (sửa duy nhất phép thử hồi quy PTS):** bộ thử hồi quy bằng chuỗi PTS đầu vào hàm dùng chung (N=100; giãn giữa + nén cuối bù; tự xác minh 5 điều kiện: cùng frame/hữu hạn/thứ tự/đầu-cuối giống tuyệt đối/giữa lệch >100 ms — lệch thật 666,7 ms @frame 80); hàm thật FAIL, bản yếu (chỉ đầu/cuối) LỌT; bộ thử với bản yếu → "SAI KỲ VỌNG" exit 1, hàm thật exit 0 (exit-that=0/exit-yeu=1 đo không pipe); ca sạch + 2 ca thiếu PTS giữ nguyên; AM3 video giữ làm lịch sử (không gọi là bằng chứng cô lập); 2 diff-check exit 0; **hash 72/72 không đổi** — không encode/build/trình duyệt lại; **TXN-20261015-31 trình tái nghiệm thu** |
| Hồ sơ | Hai việc tồn đợt ảnh chia sẻ | Chưa mở | — | — | — | — | Commit `6e60c37` đã có; chỉ xác minh rồi ghi Hoàn tất |

## Đợt 2 — 19/10 đến 1/11/2026

| Mã | Việc | Trạng thái | Ghi chú |
|---|---|---|---|
| A4 | Mô tả trang chủ | **Hoàn tất** | [Biên bản A4](../nghiem-thu/A4-mo-ta-trang-chu-2026-10-15.md) (mục 7) | TXN-37/38/39/40 CHƯA ĐẠT (giảm dần 4→3→1→điểm cuối) → đã sửa đủ | — | — | **Vòng v6 (TXN-40): đối chứng 1 hoàn nguyên dist/index từ bak + đối chiếu SHA; thêm lượt xác minh toàn bộ src/dist khớp bản gốc trước lượt sạch cuối; bỏ nhận định "fail 1/1" (GPT kiểm exit 0 — thiếu sót là byte chưa hoàn nguyên, bộ thử tự phát hiện qua SHA); biên bản mục 1/3/4/6-7 đồng bộ; bộ thử **14/14 (9 mutation + 2 lượt sạch + 2 đối chứng + 1 xác minh toàn bộ)**; không build lại; **TXN-20261015-42 xác nhận hồ sơ — phát hành kèm commit này** |
| A1 (đợt 2) | Lập chỉ mục trang mới sửa | Chưa mở | Sau B1, B7 |
| C1 (bước 2) | Thi công phương án video | Chưa mở | Chỉ sau anh duyệt báo cáo bước 1 |
| C2 | Phụ đề và bản lời thuyết minh | **Chờ tái nghiệm thu** | [Biên bản C2](../nghiem-thu/C2-video-hoc-duoc-2026-10-15.md) | TXN-20261015-43 câu lệnh; TXN-44 CHƯA ĐẠT (4 nhóm); TXN-46 CHƯA ĐẠT (probe fixture/cue/tài sản/SHA/trình duyệt); TXN-20261016-47 CHƯA ĐẠT (M18 đạt giả do crash, getText đếm script, seeked không phân biệt timeout); **TXN-20261016-48 trình lại** | — | — | Vòng sửa TXN-47: checker getText bỏ script/style/template/comment (bản chữ giả trong script/chú thích bên trong details → FAIL C2-D1); dòng báo hình sai src bỏ tham chiếu biến chưa định nghĩa (hết crash); bộ thử 24/24 (2 lượt sạch + 20 mutation: thêm M19 lời đọc trong script JSON/M20 trong chú thích; +M21 tự kiểm crash với checker giả throw chứa C2-D1 phải bị từ chối; +M22 tự chứng minh SHA hai chế độ); mã rule chỉ nhận dòng chẩn đoán chính thức — crash → ca thất bại (M18 vòng trước ĐẠT GIẢ đã ghi rõ biên bản); trình duyệt Chromium+WebKit 36/36: hai chỗ chờ seek phân biệt seeked/timeout + tự kiểm timeout (mock không seeked → nhanDuoc=false + dọn listener), giữ cue đúng dự kiến/currentTime/3 cặp 390px/JS tắt đúng khối/mp4-trước-phát 0/req VTT 36 + hình 34/console 0; check/build exit 0 astro 0/0/6; CHƯA KIỂM: âm thanh, iPhone thật, production — ghi rõ biên bản |
| C3 | Sửa lọc tô sáng ô tìm kiếm | **Hoàn tất** | [Biên bản C3](../nghiem-thu/C3-to-sang-tim-kiem-2026-10-17.md) | TXN-20261017-50 câu lệnh; TXN-51/53/56/58 CHƯA ĐẠT (mỗi vòng một SỬA TỐI HẸP + probe độc lập); **TXN-20261017-59 ĐẠT — GPT Work xác nhận M6 tái tạo đúng "Trước LEAK sau" rồi checker bắt C3-H3** | — | — | sanitizeExcerpt tách module (thuần JS): `<` chỉ mở thẻ khi theo sau chữ, kết thúc thẻ tôn trọng nháy, comment tới `-->`, script/style/template bỏ trọn nội dung — thẻ đóng khớp đầy đủ tên, mark không thuộc tính tự cân bằng; checker 30/30 ca a–h; bộ thử 8/8 (M1-M6 gồm M4 mất văn bản→E2, M5 lộ chú thích→D6, M6 tiền tố→H3 với tự xác minh mutant; crash/timeout→thất bại; SHA; hash repo); trình duyệt Chromium+WebKit 4/4 tổ hợp mỗi engine; check/build 0/0/6; CHƯA KIỂM: iPhone thật, mũi tên hộp thoại (ngoài phạm vi) |
| C4 | Gộp trang từ điển trùng | **Đã áp repo thật — chờ GPT Work xác nhận + phép phát hành** | [Biên bản C4](../nghiem-thu/C4-gop-trang-tu-dien-trung-2026-10-17.md) | TXN-61 câu lệnh khảo sát; TXN-62 trình diff → GPT Work góp ý; TXN-64 trình vòng 2 (GPT Work xác nhận phần đúng + nêu 4 khoảng trống); TXN-65 duyệt cho áp; **TXN-66 trình kết quả vòng áp** (TXN-63 void do ghi nhầm) | — | — | Vòng 1 KHÔNG áp mã thật: alias `escapement.md` thêm draft:true (cơ chế lọc sẵn content.ts:53), vercel.json 2 redirect 308 → escape-wheel/, 5 liên kết nội bộ sửa theo ngữ nghĩa (inline cơ chế→mechanisms, danh sách→escape-wheel), protection-cluster đổi đích, english-launch gỡ alias, checker C4 mới (ARG+N1-N4+D1-D5: sitemap-index, hub, Pagefind .js/.json, tập route khớp 1-1, tham số; N1 cấm source trùng + điều kiện kèm has/regex); R7 regulating-cluster đổi nghĩa (kiểm redirect 308 thay đòi HTML alias); C2 N5 nới chuỗi dist; package.json: C4 nguồn 1 lần trước C2 nguồn + C4 --dist dist sau build trước A3 dist cuối; cả 5 liên kết EN → /en/mechanisms/escapement/ (phán TXN-62, không thêm câu chuyên môn); chuỗi kiểm 4 bước exit 0 (check → build → check lần 2 → C4 dist) + bộ thử âm tính **15/15** (M12 redirect trùng xung đột→N1, M13 redirect có điều kiện has:host→N1); TXN-65 GPT Work DUYỆT cho áp (chưa cho commit). **Đã áp 12 tệp** đúng danh sách; nền cố định nen-route-0702978.txt (361 route); chuỗi exit 0 (check → build → check lần 2 → C4 --dist --nen); dist 360 = 361 − alias; bộ thử 20/20 trên candidate thật (sự cố UNKNOWN ghi vercel.json sau M17 đã xử lý: phục hồi + ghiAnToan retry, chạy lại sạch, 0 tệp .an); Pagefind thật repo ĐẠT (0 alias, đích 200); Chromium+WebKit 0 lỗi; biên bản phụ lục vòng áp; KHÔNG commit — chờ phép phát hành |
| C5 | Kiểm tra tự động trên GitHub | Chưa mở | |
| C7 | Thay ảnh 1929 | Chưa mở | Chờ anh tạo ảnh mới |
| B3 (đợt 1–2) | Kiến thức video vào bài | Chưa mở | |
| B4 | Vòng đóng kiểm chứng hằng tuần | Chưa mở | |
| D10 | Nhật ký sai số dễ tìm | Chưa mở | |
| E3 | Khép việc treo (G03, V4, trang 374 KB) | Chưa mở | |
| D4 (đợt 1) | Dịch 8–10 thương hiệu đầu | Chưa mở | Sau B1 |

## Đợt 3 — 2/11 đến 22/11/2026

B3 (đợt 3), B6, B8 (lô 1), D4 (đợt 2–4), D9, D2 (1–2 bài). Trạng thái: Chưa mở — mở chi tiết khi tới đợt.

## Đợt 4 — tháng 12/2026

D4 (còn lại, đủ 73/73), B8 (các lô tiếp), A1 (đọc lại Search Console). Trạng thái: Chưa mở.

## Cân nhắc — hỏi anh khi tới đợt 3

B5, C6, D3, D5, D11.

## Hoãn theo quyết định anh 11/10

A5, A6, A7, D1, D6, D7, D8, C8; mẫu tiêu biểu chưa dịch tiếng Anh.

## Nhật ký tin nhắn GPT Work (chống gửi trùng)

| Ngày | TXN | Gói | Nội dung |
|---|---|---|---|
| 11/10 | TXN-20261011-01 | E1 | Thông báo kế hoạch mới; yêu cầu tạo câu lệnh thi công E1 |
