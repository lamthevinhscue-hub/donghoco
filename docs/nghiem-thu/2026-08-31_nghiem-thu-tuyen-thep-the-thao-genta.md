# Biên bản nghiệm thu — Prompt 15: Tuyến "thép thể thao, dây liền vỏ và dấu ấn Gérald Genta"

- **Ngày:** 31/08/2026
- **Phạm vi:** 2 tệp nội dung sửa + 1 biên bản tạo mới (file này). Không sửa component, schema, template trang, CSS, cấu hình hay tệp nội dung nào khác.

## 1. Mục tiêu và ý nghĩa biên tập của tuyến

Hoàn thiện liên kết hai chiều giữa năm mẫu iconic:

**Universal Genève Polerouter ⇄ Audemars Piguet Royal Oak ⇄ Patek Philippe Nautilus ⇄ Tissot PRX**, kèm nhánh **Baume & Mercier Riviera ⇄ Royal Oak**.

Tuyến kể một câu chuyện liền mạch: Polerouter (1954) là một thiết kế lớn đầu sự nghiệp Gérald Genta; Royal Oak (1972) và Nautilus (1976) — hai tác phẩm Genta — định hình thể loại sport-luxury thép; Riviera (1973) và PRX (1978) là hai diễn giải riêng về thép thể thao/vỏ-dây tích hợp thập niên 1970 (Riviera cùng thế hệ với Royal Oak; PRX đưa ngôn ngữ đó tới mức giá dễ tiếp cận hơn). Người đọc đi hết tuyến hiểu được dây quan hệ lịch sử và thiết kế, không thấy một danh sách link tràn lan.

## 2. Bảng 5 mẫu — liên kết đi/đến và lý do

| Mẫu | Liên kết đi (relatedModels) | Liên kết đến (từ mẫu khác) |
|---|---|---|
| Universal Genève Polerouter | → Royal Oak: "Một thiết kế lớn đầu sự nghiệp Gérald Genta (1954) — trước Royal Oak năm 1972" (có từ Prompt 11, giữ nguyên) | ← từ Royal Oak |
| Audemars Piguet Royal Oak | → Nautilus: "Cùng thiết kế bởi Gérald Genta — Royal Oak (1972) và Nautilus (1976)" (giữ nguyên); → Polerouter: "Polerouter (1954) là một thiết kế lớn đầu sự nghiệp Gérald Genta, trước Royal Oak năm 1972" (mới); → Riviera: "Riviera (1973) là một hướng thể thao-thanh lịch bằng thép song hành cùng Royal Oak đầu thập niên 1970" (mới) | ← từ Polerouter, ← từ Nautilus, ← từ Riviera |
| Patek Philippe Nautilus | → Royal Oak: "Cùng bút pháp Gérald Genta — Nautilus ra đời bốn năm sau Royal Oak" (giữ nguyên); → PRX: "PRX (1978) đưa ngôn ngữ vỏ và dây tích hợp thập niên 1970 tới mức giá dễ tiếp cận hơn" (mới) | ← từ Royal Oak, ← từ PRX |
| Baume & Mercier Riviera | → Royal Oak: "Hai thiết kế thép thể thao đáng chú ý đầu thập niên 1970" (có sẵn, giữ nguyên) | ← từ Royal Oak |
| Tissot PRX | → Nautilus: "Cùng gợi lại ngôn ngữ vỏ và dây tích hợp phổ biến trong thập niên 1970 — PRX là cách tiếp cận dễ tiếp cận hơn về giá" (có sẵn, giữ nguyên) | ← từ Nautilus |

**Hai nhánh của tuyến:**
- Nhánh chính: Polerouter ⇄ Royal Oak ⇄ Nautilus ⇄ PRX (ba cặp kế tiếp đều hai chiều).
- Nhánh phụ: Riviera ⇄ Royal Oak.

Không thêm link trực tiếp giữa Riviera–Nautilus, PRX–Royal Oak hay Polerouter–Nautilus (đúng đề). Không vòng lặp, không slug chết, không nhãn chung chung.

## 3. Không gán sai tác giả thiết kế

Xác nhận rõ: **không nói hoặc ám chỉ Riviera, PRX do Gérald Genta thiết kế.** Trong ba nhãn mới thêm, tên Gérald Genta chỉ xuất hiện ở nhãn Polerouter (mối quan hệ sự nghiệp, có nguồn Universal Genève chính hãng trong bài Polerouter) — nhãn Riviera và PRX chỉ dùng quan hệ thẩm mỹ/lịch sử (thể thao-thanh lịch bằng thép; vỏ và dây tích hợp thập niên 1970) đã có căn cứ trong nội dung hai bài đó. Không thêm năm, reference, thông số, nguồn mới hay khẳng định chuyên môn mới.

## 4. Ba tệp thay đổi/tạo mới

| # | Tệp | Thay đổi |
|---|---|---|
| 1 | `src/content/mauIconic/vi/royal-oak.md` | Thêm 2 mục vào `relatedModels` (sau mục Nautilus giữ nguyên, thứ tự cuối: patek-nautilus → universal-geneve-polerouter → baume-mercier-riviera — đúng 3 liên kết) + `updated: "2026-08-31"` ngay sau `date`. Thân bài, `sources`, thông số, reference giữ nguyên |
| 2 | `src/content/mauIconic/vi/patek-nautilus.md` | Thêm 1 mục vào `relatedModels` (thứ tự cuối: royal-oak → tissot-prx — đúng 2 liên kết) + `updated: "2026-08-31"` ngay sau `date`. Thân bài, `sources`, thông số, reference giữ nguyên |
| 3 | `docs/nghiem-thu/2026-08-31_nghiem-thu-tuyen-thep-the-thao-genta.md` | Tạo mới (biên bản này) |

Các tệp đối ứng **không sửa, chỉ xác minh**: `universal-geneve-polerouter.md` → `royal-oak` ✓; `baume-mercier-riviera.md` → `royal-oak` ✓; `tissot-prx.md` → `patek-nautilus` ✓; Royal Oak ⇄ Nautilus hai chiều ✓.

`git diff --stat`: **2 files changed, 8 insertions(+), 0 deletions** (royal-oak +5, patek-nautilus +3) — chỉ frontmatter.

## 5. Kết quả kiểm tra

| Lệnh | Kết quả |
|---|---|
| `npm run check` | ĐẠT — toàn bộ kiểm tra tĩnh về khả năng tiếp cận đạt; không lỗi frontmatter/schema |
| `npm run build` | Thành công — 218 trang, không lỗi build; sitemap tạo xong |
| Kiểm link nội bộ sau build | "OK: Không phát hiện link nội bộ hỏng. Đã quét 218 trang HTML, 14251 link." (+3 so với trước — đúng 3 liên kết mới: Royal Oak +2, Nautilus +1) |
| `git diff --check` | Không có lỗi khoảng trắng (exit 0) |
| `git status --short` | Đúng 2 tệp `M` như bảng mục 4, cộng các file docs/output chưa theo dõi đã tồn tại từ trước — ngoài phạm vi Prompt 15, không đưa vào commit |

## 6. Kết quả kiểm tra hiển thị (bản xem trước cục bộ sau build)

**`/mau-iconic/royal-oak/`**
- Có khối "Kết nối cùng chủ đề" với đúng 3 liên kết, đúng thứ tự: Nautilus → Polerouter → Riviera.
- Cả ba câu giải thích hiển thị đúng nguyên văn (mỗi href 1 lần, không trùng).
- Dòng "Cập nhật: 31 tháng 8, 2026".

**`/mau-iconic/patek-nautilus/`**
- Đúng 2 liên kết: Royal Oak và Tissot PRX; câu mô tả PRX đúng nguyên văn.
- Dòng "Cập nhật: 31 tháng 8, 2026".

**`/mau-iconic/universal-geneve-polerouter/`** — vẫn chỉ 1 liên kết: → Royal Oak.
**`/mau-iconic/baume-mercier-riviera/`** — vẫn chỉ 1 liên kết: → Royal Oak.
**`/mau-iconic/tissot-prx/`** — vẫn chỉ 1 liên kết: → Nautilus.

**Chung:**
- Bàn phím: Tab từ đầu trang Royal Oak đi tới được lần lượt cả 3 liên kết (patek-nautilus, universal-geneve-polerouter, baume-mercier-riviera) — vòng focus rõ theo component hiện có.
- Sáng/tối: chụp 2 ảnh khối liên kết Royal Oak (3 thẻ) — không chồng lấn, chữ đọc rõ cả hai chế độ (thẻ dài nhất xuống dòng gọn gàng).
- Console: 0 lỗi mới — log console chỉ còn hai 404 cố hữu của bản preview (`favicon.ico`, `/_vercel/insights/script.js` — analytics chỉ chạy production), đếm được 0 dòng 404 khác.

## 7. Cam kết

- Chưa commit, chưa push. Chờ chỉ thị riêng.
- Khi commit: chỉ stage 2 tệp nội dung ở mục 4 + biên bản này theo tên cụ thể; không dùng `git add .` / `git add -A`.
