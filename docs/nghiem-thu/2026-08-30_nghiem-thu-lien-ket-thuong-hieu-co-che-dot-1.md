# Biên bản nghiệm thu — Prompt 12: Liên kết thương hiệu → cơ chế, đợt 1

- **Ngày:** 30/08/2026
- **Phạm vi:** 3 file thương hiệu + 1 biên bản (file này). Không sửa component, layout, schema, URL, slug, tier, thân bài hay file dữ liệu khác.

## 1. Bốn file thuộc phạm vi Prompt 12

| # | File | Thay đổi |
|---|---|---|
| 1 | `src/content/thuongHieu/vi/breguet.md` | +`relatedMechanisms` (1 liên kết), +`updated: "2026-08-30"`, +1 nguồn Breguet cuối mảng `sources` |
| 2 | `src/content/thuongHieu/vi/omega.md` | +`relatedMechanisms` (1 liên kết), +`updated: "2026-08-30"` — không thêm nguồn (xem mục 3) |
| 3 | `src/content/thuongHieu/vi/zenith.md` | +`relatedMechanisms` (1 liên kết) — `updated: "2026-08-30"` giữ nguyên như đã có từ prompt Zenith, `tier: "high-end luxury"` không đổi |
| 4 | `docs/nghiem-thu/2026-08-30_nghiem-thu-lien-ket-thuong-hieu-co-che-dot-1.md` | Tạo mới (biên bản này) |

`git diff --stat` trước khi tạo biên bản: **3 files changed, 19 insertions(+), 0 deletions** (breguet +8, omega +6, zenith +5) — chỉ thêm dòng frontmatter, không xóa hay đổi dòng nào.

## 2. Ba liên kết đã thêm

| # | Trang nguồn | Slug đích | Nhãn hiển thị (nguyên văn frontmatter) |
|---|---|---|---|
| 1 | `/thuong-hieu/breguet` | `tourbillon` | "Tourbillon được Abraham-Louis Breguet cấp bằng sáng chế năm 1801 — xem nguyên lý lồng xoay" |
| 2 | `/thuong-hieu/omega` | `bo-thoat-dong-truc` | "Omega thương mại hóa biến thể Co-Axial của George Daniels từ năm 1999 — xem nguyên lý hoạt động" |
| 3 | `/thuong-hieu/zenith` | `chronograph` | "El Primero là chronograph tự động tích hợp tần số cao — xem cấu trúc cơ chế bấm giờ" |

Cả ba hiển thị trong khối "Kết nối cùng chủ đề" với nhãn loại "CƠ CHẾ". Không dùng "đầu tiên tuyệt đối", "duy nhất" hay khẳng định rộng hơn nguồn hiện có.

## 3. Cơ sở biên tập và nguồn chính thức

| Liên kết | Cơ sở | Nguồn |
|---|---|---|
| Breguet → Tourbillon | Mốc `lineHistory` 1801 có sẵn trong bài ("Nhận bằng sáng chế tourbillon… 26/6/1801"); nhãn chỉ khẳng định điều nguồn chứng minh. | Nguồn mới thêm vào **cuối** mảng `sources`: "Breguet — Tourbillon và bằng sáng chế năm 1801" (`breguet.com/en/tourbillon`) — kiểm tra trước khi thêm: HTTP 200. Tám nguồn Breguet hiện có giữ nguyên vị trí và nội dung (đã đếm từng URL trong HTML build: 8 URL cũ + 1 URL mới, mỗi URL đúng 1 lần). |
| Omega → Bộ thoát đồng trục | Mốc `lineHistory` 1999 có sẵn trong bài: "Ý tưởng của George Daniels (1976) được Omega sản xuất hàng loạt". Nhãn nói đúng vai trò: Daniels phát minh, Omega thương mại hóa từ 1999. | **Không thêm nguồn mới** — đề bài quy định không thêm nếu nguồn hiện có đã bao gồm `omegawatches.com/world-of-omega/history`; bài Omega đã có đúng URL này ("Omega — Lịch sử thương hiệu"). Bốn nguồn Omega hiện có giữ nguyên. |
| Zenith → Chronograph | Thân bài có sẵn: El Primero 36.000 nhịp/giờ (5 Hz), chronograph tích hợp (không phải module gắn thêm). Nhãn dừng đúng mức "chronograph tự động tích hợp tần số cao". | Nguồn hiện có của bài Zenith (Zenith Timeline chính hãng, Chrono24 Magazine…) giữ nguyên, không thêm bớt. |

## 4. Xác nhận phạm vi

- **Không sửa** `src/content/config.ts` — dùng đúng trường `relatedMechanisms` (`z.array(relatedLink)`) và `updated` đã có sẵn trong schema thương hiệu.
- **Không sửa** component (`RelatedEditorial.astro`), layout (`BrandLayout.astro`), giao diện, URL, slug.
- **Không sửa** `tier` của hãng nào; phân khúc Breguet ("ultra luxury"), Omega ("high-end luxury"), Zenith ("high-end luxury") nguyên trạng.
- **Không sửa thân bài** của cả 3 file (đặc biệt thân bài Omega có dữ kiện Co-Axial liên quan nhưng giữ nguyên theo đề).
- **Không xoá/sửa/đổi thứ tự** bất kỳ nguồn hiện có nào.

Lưu ý minh bạch: trang thương hiệu (BrandLayout) từ trước **không truyền** schema Article/dateModified và không hiển thị dòng "Cập nhật" — trường `updated` thêm vào frontmatter là dữ liệu chuẩn SEO hợp lệ theo schema, hiện chưa ra giao diện hay JSON-LD (đúng hành vi đã ghi nhận từ prompt Zenith trước đó).

## 5. Kết quả các lệnh kiểm tra

| Lệnh | Kết quả |
|---|---|
| `npm run check` | ĐẠT — "Tất cả kiểm tra nội dung tĩnh đạt" |
| `npm run build` | Thành công — 218 trang; sitemap tạo xong |
| Kiểm link nội bộ sau build | "OK: Không phát hiện link nội bộ hỏng. Đã quét 218 trang HTML, 14242 link." |
| `git diff --check` | Không có lỗi (exit 0) |
| `git status --short` (trước khi tạo biên bản) | Đúng 3 file `M` như bảng mục 1, cộng các file docs/output chưa theo dõi đã tồn tại từ trước — ngoài phạm vi Prompt 12, không đưa vào commit. |

## 6. Kết quả kiểm tra hiển thị (bản xem trước cục bộ sau build)

Kiểm tra bằng trình duyệt tự động trên preview local, 3 trang, cả sáng và tối:

**`/thuong-hieu/breguet/`**
- Khối "Kết nối cùng chủ đề" xuất hiện đúng 1 lần.
- 1 liên kết tới `/co-che/tourbillon` — "Tourbillon — Lồng xoay bù sai số trọng lực", nhãn loại "CƠ CHẾ".
- Nhãn hiển thị đúng mốc: "Tourbillon được Abraham-Louis Breguet cấp bằng sáng chế năm 1801 — xem nguyên lý lồng xoay".
- Nguồn mới "Breguet — Tourbillon và bằng sáng chế năm 1801" hiển thị cuối khối nguồn; 8 nguồn cũ còn đủ.

**`/thuong-hieu/omega/`**
- 1 liên kết tới `/co-che/bo-thoat-dong-truc` — "Bộ thoát đồng trục — Ít dầu, chính xác lâu hơn".
- Nhãn nói đúng vai trò hai bên: "Omega thương mại hóa biến thể Co-Axial của George Daniels từ năm 1999 — xem nguyên lý hoạt động".
- Không có liên kết trùng (mỗi href đúng 1 lần trong khối).

**`/thuong-hieu/zenith/`**
- 1 liên kết tới `/co-che/chronograph` — "Chronograph — Cơ chế bấm giờ và bánh răng cột".
- Nhãn đúng: "El Primero là chronograph tự động tích hợp tần số cao — xem cấu trúc cơ chế bấm giờ".
- Phân khúc giữ nguyên: frontmatter `tier: "high-end luxury"` vẫn hiện trên trang; bảng đối chiếu còn đủ IWC, Grand Seiko, Omega (3 liên kết đối chiếu đếm được trên trang).

**Chung cho cả 3 trang:**
- Ba trang đích trả HTTP 200 khi điều hướng trực tiếp: `/co-che/tourbillon/`, `/co-che/bo-thoat-dong-truc/`, `/co-che/chronograph/`.
- Bàn phím: Tab từ đầu trang `/thuong-hieu/breguet/` đi tới được liên kết `/co-che/tourbillon`.
- Sáng/tối: chụp 6 ảnh khối liên kết (3 trang × 2 chế độ) — khối không chồng lấn, chữ đọc rõ cả hai chế độ (nhãn Omega xuống 2 dòng gọn gàng).
- Console: 0 lỗi mới — log console chỉ còn hai 404 cố hữu của bản preview (`favicon.ico` và `/_vercel/insights/script.js` — analytics chỉ chạy production), đếm được 0 dòng 404 khác.

## 7. Cam kết

- Chưa commit, chưa push. Chờ chỉ thị riêng.
- Khi commit: chỉ stage 3 file thương hiệu ở mục 1 + biên bản này theo tên cụ thể; không dùng `git add .` / `git add -A`.
