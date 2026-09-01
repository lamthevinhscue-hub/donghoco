# Biên bản nghiệm thu — Prompt 23: Hoàn thiện mạng liên kết cơ chế ↔ mẫu iconic và kiểm chứng tự động

- **Ngày:** 01/09/2026
- **Commit nền:** `7e4e1fc` — "feat(content): mở rộng liên kết cơ chế"
- **Chưa commit, chưa push.**

## 1. Mục tiêu và nguyên tắc biên tập

Hoàn thiện có chọn lọc mạng liên kết hai chiều giữa 18 bài cơ chế và các mẫu iconic: mỗi liên kết phải có căn cứ nguyên văn trong nội dung đang xuất bản của **cả hai bài** (đã grep xác minh từng căn cứ trước khi nhập); không liên kết cho đủ số; quan hệ cơ chế ↔ mẫu iconic bắt buộc hai chiều; thêm script kiểm tự động để các quy tắc này được bảo vệ vĩnh viễn trong `npm run check`.

## 2. Các cặp cơ chế ↔ mẫu iconic đã thêm trong gói này (11 cặp = 22 hướng)

| Cơ chế | Mẫu iconic | Nhãn chiều cơ chế → mẫu (tóm tắt) | Căn cứ xác minh bằng grep |
|---|---|---|---|
| chong-nuoc | rolex-submariner | "Submariner được nhắc trong bài làm ví dụ chuẩn ISO 6425…" | "200m Diver's (như Submariner)" nguyên văn trong bài cơ chế; "70 giờ"/300m trong bài mẫu |
| chong-nuoc | vostok-amphibia | "Amphibia minh họa cách dùng chính áp lực nước để làm kín vỏ…" | "áp lực" ×6 trong bài mẫu |
| chong-nuoc | oris-aquis-depth-gauge | "Aquis Depth Gauge dùng áp suất nước để tạo số đọc độ sâu…" | "rãnh" ×4 trong bài mẫu |
| tru-cot | rolex-submariner | "Submariner dùng trữ cót 'weekend' 70 giờ…" | "70 giờ" ×2 trong bài mẫu; bảng 70 giờ "Rolex 32xx" trong bài cơ chế |
| tru-cot | tissot-prx | "PRX chạy Powermatic 80 — mức 80 giờ được bài nêu…" | "Powermatic" ×6 trong bài mẫu; "Powermatic 80 (Tissot)" trong bảng bài cơ chế |
| chong-tu | iwc-mark-xi | "Mark XI là đại diện kinh điển của cách chống từ lồng sắt mềm…" | "IWC Mark XI" ×2 trong bài cơ chế; "chống từ/từ trường" ×3 trong bài mẫu |
| chuyen-dong-co | corum-golden-bridge | "Golden Bridge cho thấy nguyên chuỗi dây cót → bánh răng → bộ thoát…" | "baguette/trục thẳng" ×3 trong bài mẫu |
| day-toc-banh-lac | laurent-ferrier-galet-classic | "Galet Classic dùng dây tóc kép…" | "dây tóc kép" ×2 trong bài mẫu |
| chong-soc | panerai-luminor | "Luminor dùng hệ chống sốc Incabloc…" | "Incabloc" ×1 trong bảng thông số bài mẫu; "Incabloc" nguyên văn trong bài cơ chế |
| hien-thi-ngay | lange-1 | "Cửa sổ ngày lớn của Lange 1 là một cách diễn giải nổi bật từ đĩa ngày 31 vị trí…" | "cửa sổ ngày" ×4 trong bài mẫu |
| kinh-dong-ho | omega-speedmaster | "Speedmaster giữ kính Hesalite acrylic…" | "Hesalite" ×1 trong bài mẫu; bài cơ chế phân tích ưu nhược kính acrylic |

Mỗi cặp đều có chiều ngược trong `relatedMechanisms` của bài mẫu (nhãn riêng cho từng mẫu, đặt cuối khối).

## 3. Tổng số cặp hợp lệ trước và sau (cách đếm)

- **Đếm bằng script** `scripts/check-editorial-links.mjs` (đọc frontmatter, chỉ tính cặp hai chiều khớp).
- **Trước gói:** 13 cặp (chronograph ⇄ 3 mẫu; tourbillon ⇄ 3; pha-trang ⇄ 1; lên-dây ⇄ 1; dạ-quang ⇄ 1; Co-Axial ⇄ Speedmaster 1; chronograph cũ 3 mục đi khớp 3 mục ngược đã có — tổng khớp 13 mục `relatedMechanisms` đếm được trước gói).
- **Sau gói:** **24 cặp** (13 + 11 mới). Script in: "Cặp quan hệ cơ chế ↔ mẫu iconic hợp lệ hai chiều: 24".
- Số liệu frontmatter đếm bằng script độc lập: `relatedModels` từ bài cơ chế **24 mục / 14 bài**; `relatedMechanisms` trên bài iconic **24 mục / 21 bài**; `relatedModels` mẫu ↔ mẫu giữ nguyên **125 mục / 66 bài**.

## 4. Bảng 18 cơ chế — số mẫu đã liên kết và lý do nếu trống

| Cơ chế | Số mẫu liên kết | Ghi chú / lý do nếu trống |
|---|---:|---|
| chuyen-dong-co | 1 | Mới: golden-bridge (chuỗi truyền động lộ thẳng hàng) |
| len-day-tu-dong | 1 | eterna-matic-1948 (có từ Prompt 22, giữ nguyên) |
| bo-thoat | **0** | Chưa có bài mẫu nào đặt bộ thoát Swiss lever làm điểm nhấn riêng; Co-Axial đã có bài cơ chế riêng và đã liên kết — không gán mẫu đại diện theo cảm tính |
| chronograph | 6 | Giữ nguyên 6 liên kết (3 cũ Prompt 16 + 3 mới Prompt 22) |
| tourbillon | 3 | Giữ nguyên (Prompt 22) |
| day-toc-banh-lac | 1 | Mới: laurent-ferrier-galet-classic (dây tóc kép) |
| gmt | **0** | Kho chưa có bài mẫu iconic hai múi giờ/GMT — thêm khi có bài phù hợp |
| perpetual-calendar | **0** | Chưa có bài mẫu iconic lịch vạn niên (bài Arnold là pha trăng, không phải QP — không gán nhầm) |
| chong-soc | 1 | Mới: panerai-luminor (Incabloc trong bảng thông số) |
| bo-thoat-dong-truc | 1 | omega-speedmaster (có từ Prompt 13, giữ nguyên) |
| pha-trang | 1 | arnold-and-son-perpetual-moon (Prompt 22, giữ nguyên) |
| hien-thi-ngay | 1 | Mới: lange-1 (cửa sổ ngày lớn) |
| da-quang | 1 | panerai-luminor (Prompt 22, giữ nguyên) |
| kinh-dong-ho | 1 | Mới: omega-speedmaster (Hesalite) |
| diem-chuong | **0** | Chưa có bài mẫu iconic điểm chuông/repeater trong kho |
| chong-nuoc | 3 | Mới: rolex-submariner (ISO 6425), vostok-amphibia (áp lực nước), oris-aquis-depth-gauge (đo độ sâu) |
| tru-cot | 2 | Mới: rolex-submariner (70 giờ), tissot-prx (Powermatic 80) |
| chong-tu | 1 | Mới: iwc-mark-xi (lồng sắt mềm) |

Tổng: 24 mục `relatedModels` trên 14/18 bài cơ chế; 4 bài cơ chế để trống có lý do rõ ở trên.

## 5. Các tệp mã, nội dung và tài liệu đã sửa

**Nội dung (18 tệp):**
- 8 bài cơ chế thêm/đổi: `chong-nuoc` (+3), `tru-cot` (+2), `chong-tu` (+1), `chuyen-dong-co` (+1), `day-toc-banh-lac` (+1), `chong-soc` (+1), `hien-thi-ngay` (+1), `kinh-dong-ho` (+1) — tất cả +`updated: "2026-09-01"`.
- 10 bài iconic thêm chiều ngược: `rolex-submariner` (+2 `relatedMechanisms`), `vostok-amphibia` (+1), `oris-aquis-depth-gauge` (+1), `tissot-prx` (+1), `iwc-mark-xi` (+1), `corum-golden-bridge` (+1), `laurent-ferrier-galet-classic` (+1), `panerai-luminor` (+1, nối vào `relatedMechanisms` có sẵn), `lange-1` (+1), `omega-speedmaster` (+1, mục thứ ba sau Co-Axial và Chronograph) — tất cả `updated: "2026-09-01"`.

**Mã và tài liệu:**
- `scripts/check-editorial-links.mjs` — tạo mới.
- `package.json` — thêm `node scripts/check-editorial-links.mjs` vào cuối chuỗi `npm run check`.
- `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` — mốc 01/09/2026 (commit nền `7e4e1fc`), số đếm nguồn vs build, hạ tầng kiểm tự động, phần 5 và Ưu tiên 1.

## 6. Kết quả kiểm tra tự động mới

`node scripts/check-editorial-links.mjs` → ĐẠT (exit 0):

```text
KIỂM TRA LIÊN KẾT BIÊN TẬP (cơ chế ↔ mẫu iconic)
  Bài cơ chế (coChe/vi):        18
  Bài mẫu iconic (mauIconic/vi): 66
  Cặp quan hệ cơ chế ↔ mẫu iconic hợp lệ hai chiều: 24
ĐẠT — không có slug hỏng, trùng lặp, thiếu relation hay thiếu chiều ngược.
```

Script đã phát hiện và giúp sửa một bug trong chính nó (lần chạy đầu áp nhầm bắt buộc hai chiều cho mạng mẫu ↔ mẫu — 3 báo cáo sai; đã sửa: quy tắc hai chiều chỉ áp cho cơ chế ↔ mẫu, mạng mẫu ↔ mẫu chỉ kiểm tồn tại/trùng/rỗng đúng đề).

## 7. Kết quả `npm run check`

ĐẠT — toàn bộ chuỗi kiểm (gồm script mới ở cuối chuỗi) không có lỗi.

## 8. Kết quả `npm run build`

Thành công — **218 trang**, không lỗi; kiểm link nội bộ: "OK: Không phát hiện link nội bộ hỏng. Đã quét 218 trang HTML, **14403 link**." (14.381 → 14.403, tăng đúng **+22** = 11 cặp × 2 hướng).

## 9. Kết quả kiểm tra giao diện thủ công (trình duyệt trên preview local)

- **Cơ chế nhiều mẫu** — `/co-che/chronograph/`: 6 thẻ đúng thứ tự và nguyên văn (3 cũ + 3 mới).
- **Cơ chế không có liên kết** — `/co-che/gmt/` và `/co-che/bo-thoat/`: không hiện khối rỗng (0 section).
- **Iconic nhiều liên kết** — `/mau-iconic/omega-speedmaster/`: 4 thẻ (navitimer → Co-Axial → chronograph → kính), mục mới ở cuối.
- **Iconic vừa thêm** — `/mau-iconic/lange-1/` (2 mẫu + hiển thị ngày), `/mau-iconic/iwc-mark-xi/` (2 mẫu + chống từ), `/mau-iconic/tissot-prx/` (nautilus + trữ cót): đúng href và thứ tự.
- **Sáng/tối**: chụp khối liên kết `/co-che/chong-nuoc/` cả hai chế độ — chữ rõ, không chồng lấn.
- **Mobile 375px**: `/co-che/chong-nuoc/`, `/mau-iconic/omega-speedmaster/`, `/mau-iconic/lange-1/` — không tràn ngang (scrollWidth ≤ 376), khối xếp dọc gọn.
- **Bàn phím**: Tab từ đầu `/co-che/tru-cot/` tới được `/mau-iconic/tissot-prx`.
- **Console**: 0 lỗi mới (chỉ hai 404 cố hữu preview: favicon + script analytics production).

## 10. Giới hạn còn lại và đề xuất bước tiếp theo

- 4 cơ chế (`bo-thoat`, `gmt`, `perpetual-calendar`, `diem-chuong`) chưa có liên kết vì kho bài chưa có mẫu phù hợp — **khoảng trống nội dung**, không phải lỗi; viết bài mẫu phù hợp (GMT hai múi giờ, lịch vạn niên, điểm chuông) rồi nối theo đúng quy tắc hai chiều — script tự động sẽ bắt thiếu chiều ngược.
- Đã rà `CAN-KIEM-CHUNG.md` và `PROJECT.md`: không có số liệu mâu thuẫn với trạng thái mới → không sửa (tài liệu lịch sử giữ nguyên).
- Chưa nghiệm thu production (môi trường local) — vẫn thuộc Ưu tiên 2 của lộ trình.
- Gói thương hiệu → mẫu iconic (Prompt 20 gốc) vẫn dừng chờ quyết định hạ tầng schema/template thương hiệu.

## 11. Kết luận

**ĐẠT** — 11 cặp mới hai chiều có căn cứ, 24/24 cặp hợp lệ được script tự động bảo vệ, số đếm đồng bộ, không sửa ngoài phạm vi. Chưa commit, chưa push — chờ Codex kiểm tra độc lập.
