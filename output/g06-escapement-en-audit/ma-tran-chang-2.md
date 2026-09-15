# G06-C chặng 1 — Ma trận tích hợp dự kiến chặng 2 (TOÀN BỘ CHƯA KIỂM)

**Vòng sửa 3:** mã chuẩn = bảng chi tiết `bang-cong-noi-dung.md` — **GK-9/9d = aria-label + desc SVG (Escapement.astro, T2-1); GK-12 = data-name ×5 tên bộ phận; GK-13 = nhãn khung chung (MechanismAnimation, T2-2)**; nhãn giới hạn GK-16a (giản lược) + GK-16b (roller) đã CHỐT nguyên văn. Cột căn cứ HÌNH/NGUỒN/DỊCH áp cho mọi câu chốt.

**Vòng sửa 2:** mã cổng thống nhất **GK-1…16** + claim **CL-1/2**; mã mutation thống nhất **M2-1…M2-4**. **Legend là nút sinh bằng JS từ `[data-part]`** (dist tĩnh KHÔNG có `data-part-target` — đã kiểm) nên mọi tiêu chí legend thuộc tầng TRÌNH DUYỆT sau tương tác, không xếp vào kiểm HTML tĩnh.

| Ca | Tầng | Tiêu chí đo được | Trạng thái |
|---|---|---|---|
| T2-1 | nguồn | Escapement.astro có chuỗi EN theo cổng GK-1…8, **GK-9/9d (aria-label + desc SVG)**, GK-10…12 (GK-12 = data-name), GK-15, GK-16a/16b (steps.t/e/d, PART_INFO.role, aria-label/desc, beat, nhãn giới hạn CHỐT) | CHƯA KIỂM |
| T2-2 | nguồn | MechanismAnimation nhận prop lang (**GK-13 nhãn khung chung**), mặc định 'vi' — nhãn VI bảo toàn cho 21 trang render còn lại (đều chế cũ) | CHƯA KIỂM |
| T2-3 | nguồn | MechanismArticle gate mở EN **CHỈ đúng cặp Bộ thoát (bo-thoat ↔ escapement)** khi cờ bật; tiêu chí **không bật infographic EN khác** (grep map slug → component — bảng `bang-nhan-dien-khung.md`); GK-14 banner giữ hành vi VI | CHƯA KIỂM |
| T2-4 | nguồn | frontmatter EN has_infographic/interactive = true (sau khi nội dung đạt) | CHƯA KIỂM |
| T2-5 | nguồn | không route mới, không Three.js, không ảnh AI (git status phủ nhận) | CHƯA KIỂM |
| D2-1 | dist (tĩnh) | /en/mechanisms/escapement/ có [data-mechanism][data-enhanced], SVG + chuỗi EN tĩnh (KHÔNG gồm legend — legend là JS) | CHƯA KIỂM |
| D2-2 | dist (tĩnh) | 0 chuỗi VI lọt trang EN (counter/nút/panel/bước — các chuỗi render tĩnh) | CHƯA KIỂM |
| D2-3 | dist (tĩnh) | sitemap + REQUIRED_EN giữ 63+, links 0 hỏng | CHƯA KIỂM |
| B2-1 | trình duyệt | EN: next/prev/play/pause/reset như VI | CHƯA KIỂM |
| B2-2 | trình duyệt | EN: legend 5 nút EN + panel + tooltip EN (không tên VI — GK-15) — legend JS → kiểm sau tương tác | CHƯA KIỂM |
| B2-3 | trình duyệt | RM hai chiều trên EN; reduce trước tải; bật reduce khi đang phát (so sánh B2 nền) | CHƯA KIỂM |
| B2-4 | trình duyệt | hồi quy 21 trang render VI khác: nhãn/counter VI không đổi (danh sách dưới) | CHƯA KIỂM |
| B2-5 | trình duyệt | EN: ngoài viewport (cuộn thật) + tab ẩn mô phỏng — lặp đúng phép đo D1/D2 của nền (vs3) | CHƯA KIỂM |
| M2-1 | mutation | gỡ nhãn EN một nút → dist bắt | CHƯA KIỂM |
| M2-2 | mutation | gate sai / cờ frontmatter true khi EN chưa có bản dịch → nguồn bắt | CHƯA KIỂM |
| M2-3 | mutation | render lộ chuỗi VI trên EN → trình duyệt bắt (render-only) | CHƯA KIỂM |
| M2-4 | mutation | mất đích SVG (xóa id) → trình duyệt bắt | CHƯA KIỂM |
| RM-N | nền (gói này) | ngoài viewport/tab ẩn ĐÃ ĐO trên VI: D1 DAT (đứng ngoài view 6,5s, chạy lại khi quay vào); D2 QUAN_SAT (mô phỏng hidden, tab thật CHƯA KIỂM) — log-g06c-vs3-phan-loai.txt | ĐÃ ĐO (nền VI) |

## Hồi quy khung chung — 21 trang render VI khác bo-thoat (đủ danh sách, vòng trước thiếu 4)

16 trang /co-che/ (chế cũ): chong-nuoc, tru-cot, chong-tu, chuyen-dong-co, len-day-tu-dong, chronograph, tourbillon, gmt, perpetual-calendar, chong-soc, bo-thoat-dong-truc, pha-trang, hien-thi-ngay, da-quang, kinh-dong-ho, diem-chuong. (Vòng trước liệt kê 12 route — thiếu chong-soc, gmt, perpetual-calendar, diem-chuong; đã THAY THẾ.)
5 trang /tu-dien/ (chế cũ): tourbillon, perpetual-calendar, chronograph, gmt, day-toc-banh-lac.

Sau đổi khung theo lang, chạy kiểm nhanh mỗi trang: nhãn VI "Bước trước/Phát hoạt ảnh/Bước tiếp theo/Đặt lại" + counter "Bước x/n" (chế cũ: nhãn "Tốc độ/Từng bước"), 4 nút hoạt động, không lỗi console. Nguồn: `bang-nhan-dien-khung.md`.
