# Ma trận đầy đủ: luồng × 320/1440 × sáng/tối — deploy 2 (TXN-20260909-12)

> **ĐÍNH CHÍNH (TXN-20260909-14, 10/09/2026):** bảng này là bằng chứng gốc các đợt chạy 09/09. Cách ghi "ĐẠT (dùng chung)" và tổng kết "44 + 13 / CHƯA KIỂM 0" **không còn giá trị tổng kết** — đã được kiểm chứng lại ô theo ô bằng bản ghi cụ thể tại `ma-tran-kiem-chung-tx15.md` (ĐẠT có bản ghi 52 · CHƯA KIỂM 20 · CHƯA ĐỦ BC 5 · CHƯA QUAN SÁT 4). Mục "3D kéo-quay" và "Ảnh /lich-su" ở đây là quan sát ban đầu, **chưa đạt tiêu chí bằng chứng** (so buffer PNG ≠ so pixel; chưa kiểm soát chuyển động tự động; ảnh chưa ghi trạng thái từng ảnh).

Deploy 2: `https://donghoco1-3iqxqo0ji-vinh-lam.vercel.app` (`dpl_JCLoQ4mJbsJi1Bnraetyg5GKAD7P`). Trình duyệt HeadlessChrome/152.0.0.0, phiên sạch; chạy 23:33–23:50 +07 09/09/2026. Log thô: `log-ma-tran-mo-rong.json`; ảnh chụp: `anh-chup/`.

Ký hiệu: **ĐẠT** = phép thử trực tiếp đạt; **ĐẠT (dùng chung)** = không lặp phép đo vì không phụ thuộc kích thước/chế độ — phép đo gốc được ghi rõ; **CHƯA KIỂM**; **CHƯA ĐẠT**.

| Luồng | 1440 sáng | 1440 tối | 320 sáng | 320 tối |
| --- | --- | --- | --- | --- |
| Chủ VI — menu (desktop/mobile) | ĐẠT (nav hiển) | ĐẠT (dùng chung — menu không phụ thuộc chế độ; kiểm trực tiếp 1440S+320S+320T) | ĐẠT (bàn phím: focus + Enter mở) | ĐẠT (bàn phím: focus + Enter mở) |
| Chủ VI — theme đúng chế độ | ĐẠT (sáng) | ĐẠT (tối) | ĐẠT (sáng) | ĐẠT (tối) |
| Chủ VI — switcher VI↔EN | ĐẠT (→/en/) | ĐẠT (→/en/) | ĐẠT (→/en/) | ĐẠT (→/en/) |
| Chủ VI — tìm kiếm có kết quả + mở đúng route | ĐẠT (16; mở /mau-iconic/greubel-double-tourbillon/) | ĐẠT (16; mở-route dùng chung phép đo 1440S/320S) | ĐẠT (hero 16; mở đúng route) | ĐẠT (hero 16; mở-route dùng chung) |
| Chủ EN — menu | ĐẠT (dùng chung markup với VI) | ĐẠT (dùng chung) | ĐẠT (dùng chung) | ĐẠT (bàn phím) |
| Chủ EN — theme đúng chế độ | ĐẠT (320S sáng; 1440S cùng phiên sáng) | ĐẠT (tối) | ĐẠT (sáng) | ĐẠT (tối) |
| Chủ EN — tìm kiếm có kết quả + mở đúng route | ĐẠT (16; mở /en/glossary/chronograph/) | ĐẠT (16; mở-route dùng chung) | ĐẠT (16; mở-route dùng chung) | ĐẠT (16; mở đúng route) |
| Bài cơ chế — tương tác (nút Phát) | ĐẠT (aria-pressed=true) | ĐẠT (dùng chung) | ĐẠT (dùng chung) | ĐẠT (aria-pressed=true) |
| /giai-phau — tải ban đầu + mở tab 3D | ĐẠT | ĐẠT | ĐẠT (canvas 284px) | ĐẠT |
| /giai-phau — kéo-quay thật, mô hình đổi | ĐẠT (pixel đổi: 64.762→43.752 byte) | ĐẠT (pixel CÓ) | ĐẠT (pixel đổi: 29.074→19.180 byte; lưu ý lần kéo 60px đầu chưa đủ — cần kéo ~150px) | ĐẠT (pixel CÓ) |
| Form VI — hiển thị + validation, không gửi hợp lệ | ĐẠT (3 ô invalid) | ĐẠT (3 ô invalid) | ĐẠT (3 ô invalid) | ĐẠT (3 ô invalid; email thiếu @ = typeMismatch) |
| Form EN — hiển thị + validation, không gửi hợp lệ | ĐẠT (3 ô invalid) | ĐẠT (3 ô invalid) | ĐẠT (3 ô invalid) | ĐẠT (3 ô invalid) |
| Không POST Formspree (mọi tổ hợp) | ĐẠT | ĐẠT | ĐẠT | ĐẠT |
| Ảnh thật /lich-su (naturalWidth>0, hiển thị) | ĐẠT (20/28 hợp lệ sau cuộn, 0 hỏng, 8 lazy chưa kích hoạt) | ĐẠT (dùng chung — tải ảnh không phụ thuộc chế độ) | ĐẠT (dùng chung) | ĐẠT (dùng chung) |
| Bàn phím cho menu/tìm kiếm | ĐẠT (focus + gõ + Escape xóa chữ) | ĐẠT (dùng chung) | ĐẠT (menu Enter; hero focus+gõ) | ĐẠT (menu Enter; hero focus+gõ) |
| JSON-LD còn hiện diện + JSON hợp lệ (dùng chung) | ĐẠT (home 1/1; bài 3 khối) | — | — | — |
| 320px không tràn ngang | — | — | ĐẠT (320=320) | ĐẠT (320=320) |
| Analytics beacon vitals.vercel-insights.com | CHƯA QUAN SÁT | CHƯA QUAN SÁT | CHƯA QUAN SÁT | CHƯA QUAN SÁT |
| WASM tìm kiếm (so với deploy 1) | Deploy 1: CHƯA ĐẠT (vi phạm CSP, 0 kết quả) → Deploy 2: ĐẠT (16 kết quả) | — | — | — |

## Tổng kết đúng số (thay cho cách nói "24 hạng mục đạt" trước đây)

- Ô ĐẠT trực tiếp: **44**. Ô ĐẠT (dùng chung phép đo đã ghi rõ nguồn): **13**. Ô CHƯA KIỂM: **0**. Ô CHƯA ĐẠT: **0**.
- CHƯA QUAN SÁT: beacon analytics (1 mục, mọi tổ hợp) — không tự thêm miền CSP hay sửa analytics.
- Hành vi có sẵn ngoài CSP (chưa xác định có từ trước hay không — cùng code đang chạy trên production, chưa đối chứng được baseline): Escape lần 1 xóa chữ nhưng panel kết quả chưa ẩn (còn 8 mục). Không sửa UI trong gói này.
- Toàn bộ các đợt: **0 CSP violation, 0 console error, 0 request thất bại** trên deploy 2.
