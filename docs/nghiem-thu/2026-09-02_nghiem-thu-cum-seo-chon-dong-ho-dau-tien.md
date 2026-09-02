# Biên bản nghiệm thu — Nâng cấp cụm SEO "Chọn đồng hồ cơ đầu tiên" theo hướng người đọc

- **Ngày:** 02/09/2026
- **Commit nền khi bắt đầu gói:** `87c82a2` — "perf(3d): tách tải mô hình giải phẫu" (working tree sạch tại thời điểm bắt đầu).
- **Trạng thái cuối gói: CHƯA COMMIT, CHƯA PUSH** — chờ anh Vinh kiểm độc lập.

---

## 1. Nội dung đã sửa và lý do

Bài `/huong-dan/chon-dong-ho-dau-tien/` được viết lại thành **khung quyết định** cho người mới — giữ nguyên slug/URL. Toàn bộ rà nguồn và quyết định giữ/bỏ/làm mềm được ghi chi tiết tại `docs/ho-so-nguon-chon-dong-ho-co-dau-tien.md`. Tóm tắt:

**Đã bỏ hoàn toàn (không đủ nguồn hoặc sai bản chất trang kiến thức):**
- Mục "Khoảng ngân sách" (Dưới 5 triệu: Seiko 5… Trên 100 triệu: Patek Philippe) — bảng giá thị trường không nguồn.
- "Đầu tư / giữ giá? Cần thương hiệu mạnh, mẫu iconic" — tư vấn đầu tư; thay bằng tuyên ngôn minh bạch trang không tư vấn đầu tư/dự đoán bán lại.
- Cột "Ví dụ điển hình" trong bảng phong cách (Rolex Submariner, Seiko 5, Cartier Tank…) — gợi mẫu cụ thể.
- "Bảo dưỡng 4–5 năm/lần (vài triệu đồng)" — chu kỳ cố định + chi phí không nguồn.
- "Phiên bản giới hạn… không phải LE nào cũng giữ giá".
- Bảng kích thước "Dưới 36 / 36–40 / Trên 40mm" và "quy tắc không nhô khỏi cổ tay" — khẳng định tuyệt đối theo đường kính.
- Cách gọi "gray market (tuồn)" và việc xếp hạng kênh mua.

**Đã viết lại theo cấu trúc đề bài:** Mở đầu (khung quyết định + minh bạch không tư vấn đầu tư + ba câu hỏi) → 1. Xác định vai trò (4 nhu cầu, không gắn giá/mẫu) → 2. Vừa tay (lug-to-lug, độ dày, độ cong vấu, thử đeo; dẫn bài đo cổ tay, không lặp bảng) → 3. Trải nghiệm vận hành (lên tay/tự động trung tính + điều cần biết hằng ngày) → 4. Môi trường + chống nước (ký hiệu ≠ giấy phép; ISO được nhắc đúng phạm vi nguồn) → 5. Mua mới/đã qua sử dụng/giới hạn tự kiểm (5 câu hỏi về chiếc cụ thể, không xếp hạng kênh) → 6. Checklist 6 dòng (không checkbox lưu dữ liệu, không thu email) → Kết (dẫn Lộ trình học + Từ điển + 2 CTA thực hành).

Title đổi đúng đề: **"Chọn đồng hồ cơ đầu tiên: khung quyết định cho người mới"**; excerpt viết lại theo hướng trung thực; `updated: "2026-09-02"`.

## 2. Danh sách nguồn

| Nguồn | URL | Loại | Phục vụ ý |
|---|---|---|---|
| ISO 22810:2010 — chuẩn đồng hồ chống nước | https://www.iso.org/standard/45334.html | Tổ chức tiêu chuẩn quốc tế | Chống nước: ký hiệu do chuẩn định nghĩa |
| ISO 6425:2018 — chuẩn đồng hồ lặn | https://www.iso.org/standard/66517.html | Tổ chức tiêu chuẩn quốc tế | Nhắc cùng ý trên (nguồn đã kiểm chứng từ bài mức chống nước) |
| Fondation de la Haute Horlogerie — Núm vặn | https://www.hautehorlogerie.org/en/watches-and-culture/watchmaking-knowledge/encyclopedia/crown-watchmaking | Tổ chức chuyên môn phi thương mại | Lên dây/chỉnh giờ qua núm vặn |

Frontmatter bài có đúng 2 nguồn HTTPS (ISO 22810 + FHH crown) — cả hai đã tồn tại và được kiểm chứng trong các bài khác của dự án trước đó.

## 3. Các dữ kiện/claim bị bỏ hoặc làm mềm

Xem bảng chi tiết ở hồ sơ nguồn mục 2. Tổng: **7 cụm bỏ hẳn, 3 cụm làm mềm** ("tốt nhất", "nên chọn tự động", "quy tắc cổ tay").

## 4. Liên kết cụm đã tạo

- **Trụ cột → hỗ trợ (9 liên kết bắt buộc):** chon-co-dong-ho, chuyen-dong-co, len-day-dong-ho, len-day-tu-dong (cơ chế), muc-chong-nuoc, bao-duong-dong-ho, nhan-biet-dong-ho-gia (huong-dan), lo-trinh-hoc-dong-ho, tu-dien — mỗi link có anchor mô tả đích.
- **Bàn quyết định (DecisionMap):** 8 link theo nhu cầu — nhánh 1: chon-co-dong-ho, muc-chong-nuoc, len-day-tu-dong; nhánh 2: chuyen-dong-co, len-day-dong-ho, giai-phau; nhánh 3: nhan-biet-dong-ho-gia, bao-duong-dong-ho.
- **Hỗ trợ → trụ cột:** 5 bài (chon-co-dong-ho, muc-chong-nuoc, len-day-dong-ho, nhan-biet-dong-ho-gia, bao-duong-dong-ho) có một đoạn chuyển tiếp cuối bài dẫn về khung — chèn vào chỗ tự nhiên sau FAQ, không nhồi.

## 5. Các file đã đổi

| File | Thao tác |
|---|---|
| `src/content/huongDan/vi/chon-dong-ho-dau-tien.md` | Viết lại (title mới, nội dung mới, sources, updated) |
| `src/data/decisionMaps.ts` | **Tạo** — dữ liệu DecisionMap (slug-keyed, hàm `getDecisionMap`) |
| `src/components/DecisionMap.astro` | **Tạo** — component tổng quát, HTML/CSS tĩnh, không script |
| `src/pages/huong-dan/[slug].astro` | Tích hợp `getDecisionMap` + render `DecisionMap` trước `<Content />` |
| `src/content/huongDan/vi/{chon-co-dong-ho, muc-chong-nuoc, len-day-dong-ho, nhan-biet-dong-ho-gia, bao-duong-dong-ho}.md` | Thêm 1 đoạn chuyển tiếp cuối bài link về trụ cột |
| `scripts/check-first-watch-cluster.mjs` | **Tạo** — kiểm 7 tiêu chí cụm |
| `package.json` | Thêm script cụm vào `npm run check` |
| `scripts/check-evolution-data.mjs` | Thêm `decisionMaps.ts` vào SKIP_FILES (tệp data của script khác — như đã làm với learningPaths.ts) |
| `docs/ho-so-nguon-chon-dong-ho-co-dau-tien.md` | **Tạo** — hồ sơ nguồn |
| `docs/chien-luoc-seo-cum-chon-dong-ho-dau-tien.md` | **Tạo** — chiến lược cụm (giả định cần kiểm chứng) |
| `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` | Mốc lần 9 |

## 6. Vị trí DecisionMap — ghi nhận cách làm

Component được render **ngay sau tiêu đề và khối thông tin bài, trước phần mở đầu markdown** (không phải "ngay sau đoạn mở đầu" theo đúng chữ). Lý do: bài viết là markdown thuần, hạ tầng hiện tại không tách được một component vào giữa Content mà không viết remark plugin mới (ngoài phạm vi hạ tầng hiện có); vị trí đặt trước đảm bảo bản đồ được thấy ngay khi vào bài và không phụ thuộc JavaScript. Đề cho phép "chỉ dùng nếu hạ tầng hiện tại cho phép sạch sẽ" — đây là phương án sạch nhất trong hạ tầng hiện tại, ghi rõ để anh quyết có chấp nhận vị trí này không.

## 7. Kết quả kiểm tra

- `node scripts/check-first-watch-cluster.mjs` — **ĐẠT cả 7 tiêu chí** (slug giữ nguyên; frontmatter đủ + 2 nguồn HTTPS; đủ 9 link bắt buộc + route tồn tại; không còn bảng giá/giữ giá/đầu tư/chu kỳ bảo dưỡng/bảng kích thước; URL ngoài đều HTTPS; DecisionMap 8 link tồn tại; đủ 5 bài hỗ trợ link về).
- `npm run check` — ĐẠT toàn chuỗi.
- `npm run build` — ĐẠT: **222 trang, 15.197 liên kết nội bộ** (+21 so 15.176: 8 link DecisionMap + 9 link bắt buộc thay cho link cũ của bài + 5 link hỗ trợ trở về + 2 CTA kết; số chênh khớp theo tổng), script ngân sách 3D vẫn ĐẠT, check-links "OK: Không phát hiện link nội bộ hỏng".
- `git diff --check` — sạch.

### Nghiệm thu trình duyệt (Playwright trên preview sau build)

| Phép kiểm | Kết quả |
|---|---|
| 1 H1 đúng title mới; H2 đủ 6 phần + kết + Nguồn tham khảo | ĐẠT |
| DecisionMap: heading "Bắt đầu từ nhu cầu của bạn", 3 nhánh, 8 link đúng URL | ĐẠT |
| Nội dung cũ (ngân sách/giữ giá/triệu) không còn trên trang | ĐẠT |
| 9 link bắt buộc trên trang; 5/5 bài hỗ trợ có link về trụ cột | ĐẠT |
| Bàn phím qua DecisionMap: 8/8 link focus được, vùng bấm nhỏ nhất 60px, outline `solid` | ĐẠT |
| Sáng/tối: nhánh map `rgb(35,74,115)` ↔ `rgb(238,240,237)` | ĐẠT |
| Mobile 375px và zoom 200% (viewport 640): không tràn | ĐẠT |
| Không JavaScript (chặn script qua CDP): đủ 8 link map + 1 H1 + toàn bộ bài đọc được | ĐẠT |
| SEO: title đúng, meta description từ excerpt, canonical đúng | ĐẠT |

## 8. Giới hạn còn lại

1. **Chưa có dữ liệu Search Console/Analytics** — mọi nhận định về ý định tìm kiếm là giả định ghi trong tài liệu chiến lược; chưa thể kết luận hiệu quả SEO của cụm.
2. **Vị trí DecisionMap trước phần mở đầu** (không phải ngay sau đoạn mở đầu) — do hạ tầng markdown; xem mục 6.
3. Hai bài cụm (`bao-duong-dong-ho`, `nhan-biet-dong-ho-gia`) hiện **không có khối nguồn** trong frontmatter — trạng thái treo cũ từ trước (tracker mục 23), không đụng trong gói này.
4. DecisionMap hiện chỉ dùng cho 1 bài — hạ tầng tái sử dụng đã sẵn (đăng ký map mới trong `decisionMaps.ts`) nhưng chưa có hướng dẫn thứ hai dùng nó.

## 9. Sửa sau rà soát độc lập (02/09/2026, theo yêu cầu anh)

Không đổi số trang (222), số link theo ý nghĩa cụm, hay phạm vi cụm nội dung. Các sửa:

1. **DecisionMap đã có ngữ nghĩa heading đúng:** wrapper đổi từ `<div>` sang `<section>`; tiêu đề khối "Bắt đầu từ nhu cầu của bạn" là **`<h2>` mang chính id `dm-chon-dong-ho-dau-tien-title`** mà `aria-labelledby` trỏ tới (trước đó id không tồn tại trong DOM và tiêu đề là `<p>` — lỗi accessibility); ba nhánh giữ `<h3>` — thứ bậc H1 bài → H2 bàn quyết định → H3 nhánh. Thiết kế, responsive, dark mode và hành vi không-JavaScript giữ nguyên.
2. **Câu automatic đã sửa theo nguyên tắc trữ cót tùy từng mẫu:** bỏ diễn đạt tuyệt đối "tháo ra để qua đêm là nó dừng" và đoạn hướng dẫn cứng ("không vặn ngược khi đang siết", "không chỉnh lịch ngày trong khung giờ cơ cấu lịch đang ăn khớp"); thay bằng "thời gian đồng hồ còn chạy phụ thuộc vào lượng cót còn lại và mức trữ cót của từng mẫu" và khuyến nghị đọc hướng dẫn của đúng mẫu — các link tới bài cơ chế/lên dây giữ nguyên.
3. **Đã bỏ khái quát hóa về người mua lần đầu** trong `nhan-biet-dong-ho-gia.md` ("nhóm dễ bị lừa nhất") — thay bằng câu trung tính mời người mua lần đầu đọc khung quyết định; đồng thời label nhánh DecisionMap "đeo là chạy" đổi thành "Tìm hiểu cơ chế lên dây tự động" (bỏ cách nói tuyệt đối).
4. **Script cụm bổ sung 4 kiểm semantics** (`check-first-watch-cluster.mjs`): `<section` hiện diện; `aria-labelledby` dùng đúng id danh nghĩa; `<h2>` mang chính id đó; không chấp nhận `<p>` mang id — KẾT LUẬN ĐẠT.
5. Ghi nhận: số liên kết nội bộ build 15.197 → **15.198** (+1) — câu diễn đạt mới cho xuất hiện cụm "núm vặn" liền nhau và plugin tự động link hóa thuật ngữ từ điển (`/tu-dien/num-van`) theo đúng cơ chế `remark-glossary-autolink` hiện có; link hợp lệ, không phải lỗi.

## 10. Xác nhận

- **CHƯA COMMIT, CHƯA PUSH.** Tệp thuộc gói: 6 tạo (`decisionMaps.ts`, `DecisionMap.astro`, `check-first-watch-cluster.mjs`, hồ sơ nguồn, chiến lược SEO, biên bản này) + 8 sửa (bài trụ cột, 5 bài hỗ trợ, template huong-dan, `package.json`, `check-evolution-data.mjs`, `LO-TRINH`). Khi commit, `git add` từng tên tệp, không dùng `git add .` hay `git add -A`.
