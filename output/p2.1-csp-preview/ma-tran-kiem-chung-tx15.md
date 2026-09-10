# Kiểm chứng từng ô ma trận theo bản ghi cụ thể — TXN-20260909-12/14 · hoàn tất TXN-20260910-04 (10/09/2026)

Mỗi ô đối chiếu với bản ghi thô trong `logs-tho/` (20 tệp) và `so-pixel-3d.json`. Phiên trình duyệt: HeadlessChrome/152.0.0.0, **SSO do anh Vinh đăng nhập trong cửa sổ playwright** (10/09 sáng), truy cập deploy 2 `https://donghoco1-3iqxqo0ji-vinh-lam.vercel.app`.

Ký hiệu: **ĐẠT [tệp]** = có bản ghi cụ thể · **CHƯA KIỂM** · **CHƯA ĐỦ BC** · **CHƯA QUAN SÁT**.

## Chủ VI

| Hạng mục | 1440 sáng | 1440 tối | 320 sáng | 320 tối |
| --- | --- | --- | --- | --- |
| Theme đúng chế độ | ĐẠT [R1a] | ĐẠT [R2] | ĐẠT [R3] | ĐẠT [F1] |
| Menu | ĐẠT [R1a] | ĐẠT [T1] | ĐẠT [R3, bàn phím] | ĐẠT [B, bàn phím] |
| Switcher VI→EN | ĐẠT [D2] | ĐẠT [G] | ĐẠT [R3] | ĐẠT [G] |
| Tìm kiếm có kết quả | ĐẠT [R1a: 16] | ĐẠT [R2: 16] | ĐẠT [R3/C: hero 16] | ĐẠT [F1: 16] |
| Bấm mở đúng route | ĐẠT [R1a] | ĐẠT [T1] | ĐẠT [R3] | ĐẠT [Q2] |

## Chủ EN

| Hạng mục | 1440 sáng | 1440 tối | 320 sáng | 320 tối |
| --- | --- | --- | --- | --- |
| Theme đúng chế độ | ĐẠT [EN-1440S-theme-menu.json: htmlDark=false] | ĐẠT [F1] | ĐẠT [F2b] | ĐẠT [R4] |
| Menu | ĐẠT [EN-1440S-theme-menu.json: nav hiển + ảnh en-menu-1440S.png] | ĐẠT [EN-1440T-menu.json: nav hiển + ảnh en-menu-1440T.png] | ĐẠT [P, bàn phím] | ĐẠT [R4/Q2, bàn phím] |
| Switcher EN→VI | ĐẠT [D2: về "/"] | ĐẠT [T1: về "/"] | ĐẠT [P: về "/"] | ĐẠT [Q2: về "/"] |
| Tìm kiếm có kết quả | ĐẠT [R1b: 16] | ĐẠT [T1: 16] | ĐẠT [F2b/P: 16] | ĐẠT [R4/Q2: 16] |
| Bấm mở đúng route | ĐẠT [R1b] | ĐẠT [T1] | ĐẠT [P] | ĐẠT [R4] |

## Các luồng khác

| Hạng mục | 1440 sáng | 1440 tối | 320 sáng | 320 tối |
| --- | --- | --- | --- | --- |
| Bài cơ chế — nút Phát | ĐẠT [D2] | ĐẠT [T1] | ĐẠT [P] | ĐẠT [R4] |
| /giai-phau — tải ban đầu + mở 3D | ĐẠT [D2] | ĐẠT [R2] | ĐẠT [F2c/P: canvas 284px] | ĐẠT [G/Q2] |
| /giai-phau — kéo-quay đổi hình thật (so pixel giải mã + kiểm soát chuyển động tự động) | ĐẠT [so-pixel-3d.json (đính chính TXN-20260910-05): nền nghỉ pixel giống nhau → KHÔNG tự động; kéo **276.646/352.560 pixel = 78,47%**] | ĐẠT [nền giống; kéo **276.604/352.560 = 78,46%**] | ĐẠT [nền giống; kéo **45.330/91.800 = 49,38%**] | ĐẠT [nền giống; kéo **45.093/91.800 = 49,12%**] |
| Form VI — hiển thị + validation | ĐẠT [R1e] | ĐẠT [R2] | ĐẠT [R3] | ĐẠT [B] |
| Form VI — email sai typeMismatch | — | — | — | ĐẠT [B2] |
| Form EN — hiển thị + validation | ĐẠT [R1e] | ĐẠT [G] | ĐẠT [F2b] | ĐẠT [R4] |
| Không POST Formspree | ĐẠT [mọi đợt] | ĐẠT | ĐẠT | ĐẠT |
| 320px không tràn ngang | — | — | ĐẠT [R3] | ĐẠT [B] |
| Bàn phím tìm kiếm (focus/gõ/Escape xóa chữ) | ĐẠT [D2] | ĐẠT [T2] | ĐẠT [P] | ĐẠT [Q2] |
| JSON-LD hiện diện + JSON hợp lệ (phép đo không phụ thuộc kích thước/chế độ; phạm vi: home + 1 bài) | ĐẠT [A3/D2] | — | — | — |
| Ảnh /lich-su — trạng thái từng ảnh (kích hoạt lazy, chờ tải) | ĐẠT [IMG-lich-su-1440S-28-anh.json: **28/28 ok, 0 hỏng**, danh sách 28 mục tên tệp+kích thước+thuộc tính lazy] | ĐẠT [T2: 28/28 ok, 0 hỏng] | ĐẠT [P: 28/28 ok, 0 hỏng] | ĐẠT [Q2: 28/28 ok, 0 hỏng] |
| Beacon vitals.vercel-insights.com | CHƯA QUAN SÁT | CHƯA QUAN SÁT | CHƯA QUAN SÁT | CHƯA QUAN SÁT |
| WASM tìm kiếm | Deploy 1: CHƯA ĐẠT [WASM-deploy1: vi phạm CSP + 0 kết quả] · Deploy 2: ĐẠT [A3/R1b: 16 + mở đúng route] | — | — | — |

Ghi chú phạm vi: danh sách 28 mục riêng (tên tệp, kích thước, lazy) chụp ở 1440 sáng; ba tổ hợp còn lại ghi tổng hợp 28/28 ok / 0 hỏng (cùng một trang, cùng 28 tệp ảnh — [T2/P/Q2]).

## Tổng kết sau khi lấp ô (TXN-20260910-04)

- **Ô ĐẠT có bản ghi cụ thể: 77/77 ô có thể kiểm** (52 ô có sẵn từ vòng trước + 20 ô CHƯA KIỂM đã kiểm + 5 ô CHƯA ĐỦ BC đã thu lại theo tiêu chí).
- **Ô CHƯA KIỂM: 0. Ô CHƯA ĐỦ BẰNG CHỨC: 0.**
- **CHƯA QUAN SÁT: beacon analytics (4 ô)** — script analytics nạp bình thường; beacon chưa xuất hiện trong các phiên; không tự thêm miền CSP hay sửa analytics.
- Hành vi ngoài CSP ghi nhận (chưa xác định có từ trước — cùng code chạy trên production): Escape lần 1 xóa chữ nhưng panel kết quả chưa ẩn.
- Toàn bộ các đợt trên deploy 2: **0 CSP violation, 0 console error, 0 request thất bại, 0 POST Formspree.**
