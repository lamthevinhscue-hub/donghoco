# Biên bản nghiệm thu — Prompt 17: Cụm liên kết "chế tác độc lập và hoàn thiện thủ công"

- **Ngày:** 31/08/2026
- **Phạm vi:** 3 tệp nội dung sửa + 1 biên bản tạo mới (file này). Không sửa component, schema, template trang, CSS, cấu hình, nguồn hay tệp nội dung nào khác.

## 1. Mục tiêu và ý nghĩa của cụm đọc

Tạo cụm đọc hai chiều hoàn chỉnh giữa ba mẫu chế tác độc lập:

**Philippe Dufour Simplicity ⇄ Kari Voutilainen Vingt-8 ⇄ Laurent Ferrier Galet Classic**

Mỗi bài dẫn tới hai bài còn lại, nhãn giải thích rõ **điểm gặp** (cùng là chế tác độc lập, vẻ ngoài cổ điển kín đáo, hoàn thiện thủ công bậc cao) và **điểm khác** (hướng kỹ thuật mỗi xưởng chọn). Cụm này **không phải bảng xếp hạng**: không mẫu nào "tốt hơn" mẫu nào — ba xưởng trả lời ba cách cho cùng một câu hỏi về làm đồng hồ một cách độc lập, và mỗi nhãn chỉ mô tả đúng những gì bài hiện hữu đã có nguồn. Không khẳng định ba mẫu có chung calibre, chung loại bộ thoát, chung mức sản lượng hay chung giá trị thị trường.

## 2. Bảng ba mẫu — liên kết đi/đến và lý do

| Mẫu | Liên kết đi (relatedModels) | Liên kết đến |
|---|---|---|
| Philippe Dufour Simplicity | → Vingt-8: "Hai chuẩn tham chiếu của chế tác độc lập: Simplicity đặt trọng tâm ở hoàn thiện thủ công truyền thống, Vingt-8 kết hợp hoàn thiện với bộ thoát do xưởng phát triển"; → Galet Classic: "Hai hướng chế tác độc lập kín đáo: Simplicity tôn vinh sự giản dị ba kim, Galet Classic đưa kỹ thuật phức tạp hơn vào vỏ tròn cổ điển" | ← từ Vingt-8, ← từ Galet Classic |
| Voutilainen Vingt-8 | → Simplicity (nhãn đối ứng chính xác); → Galet Classic: "Hai nhà chế tác độc lập theo đuổi vẻ ngoài cổ điển kín đáo, nhưng khác hướng kỹ thuật: Vingt-8 nổi bật bởi bộ máy và bộ thoát của xưởng, Galet Classic bởi cấu trúc tourbillon và dây tóc kép" | ← từ Simplicity, ← từ Galet Classic |
| Laurent Ferrier Galet Classic | → Simplicity (nhãn đối ứng chính xác); → Vingt-8 (nhãn đối ứng chính xác) | ← từ Simplicity, ← từ Vingt-8 |

Ba cặp đều hai chiều, sáu liên kết tổng cộng, không vòng lặp, không slug chết, không nhãn chung chung.

## 3. Ba cách tiếp cận — đối chiếu ngắn (chỉ dùng thông tin đã có trên trang)

| Mẫu | Đặc trưng theo bài hiện hữu |
|---|---|
| Simplicity | Ba kim, không phức tạp; hoàn thiện thủ công truyền thống do một đôi tay thực hiện trọn vẹn — bài không mô tả mẫu có tourbillon, dây tóc kép hay bộ thoát do xưởng phát triển (nhãn giữ đúng giới hạn này). |
| Vingt-8 | Bộ máy và bộ thoát do chính xưởng phát triển, mức hoàn thiện thủ công được coi là chuẩn mực — bài không mô tả mẫu có tourbillon hay dây tóc kép (nhãn giữ đúng giới hạn này). |
| Galet Classic | Vỏ tròn cổ điển kín đáo; kỹ thuật phức tạp hơn (tourbillon, dây tóc kép) — nhãn **không** mô tả mẫu này là đồng hồ ba kim. |

Các nhãn không dùng "tốt nhất", "đỉnh nhất", "vượt trội", "cao hơn" hay bất kỳ từ xếp hạng nào; không thêm năm, sản lượng, giá, reference, thông số, nguồn mới hay dữ kiện chuyên môn mới.

## 4. Bốn tệp thay đổi/tạo mới

| # | Tệp | Thay đổi |
|---|---|---|
| 1 | `src/content/mauIconic/vi/dufour-simplicity.md` | +`relatedModels` (2 liên kết) + `updated: "2026-08-31"`, ngay sau `draft: false`. Thân bài, `sources`, năm, thông số giữ nguyên |
| 2 | `src/content/mauIconic/vi/voutilainen-vingt-8.md` | +`relatedModels` (2 liên kết) + `updated: "2026-08-31"`, ngay sau `draft: false`. Thân bài, `sources`, năm, thông số giữ nguyên |
| 3 | `src/content/mauIconic/vi/laurent-ferrier-galet-classic.md` | +`relatedModels` (2 liên kết) + `updated: "2026-08-31"`, ngay sau `draft: false`. Thân bài, `sources`, năm, thông số giữ nguyên |
| 4 | `docs/nghiem-thu/2026-08-31_nghiem-thu-cum-che-tac-doc-lap.md` | Tạo mới (biên bản này) |

`git diff --stat`: **3 files changed, 21 insertions(+), 0 deletions** — chỉ frontmatter, không có dòng thân bài nào bị đụng.

## 5. Kết quả kiểm tra

| Lệnh | Kết quả |
|---|---|
| `npm run check` | ĐẠT — toàn bộ kiểm tra tĩnh về khả năng tiếp cận đạt; không lỗi build/frontmatter/schema/Markdown |
| `npm run build` | Thành công — 218 trang; sitemap tạo xong |
| Kiểm link nội bộ sau build | "OK: Không phát hiện link nội bộ hỏng. Đã quét 218 trang HTML, 14265 link." (+6 so với trước — đúng 6 liên kết mới, mỗi bài 2) |
| `git diff --check` | Không có lỗi khoảng trắng (exit 0) |
| `git status --short` | Đúng 3 tệp `M` như bảng mục 4, cộng các file docs/output chưa theo dõi đã tồn tại từ trước — ngoài phạm vi Prompt 17, không đưa vào commit |

## 6. Kết quả kiểm tra hiển thị (bản xem trước cục bộ sau build)

**`/mau-iconic/dufour-simplicity/`**
- Khối "Kết nối cùng chủ đề" với đúng 2 link, đúng thứ tự: Voutilainen Vingt-8 → Laurent Ferrier Galet Classic.
- Hai câu giải thích hiển thị đúng nguyên văn; liên kết là đường dẫn thật (tiêu đề bài, không phải slug thô hay mã HTML).
- Dòng "Cập nhật: 31 tháng 8, 2026".

**`/mau-iconic/voutilainen-vingt-8/`**
- Đúng 2 link, đúng thứ tự: Philippe Dufour Simplicity → Laurent Ferrier Galet Classic; hai câu đúng nguyên văn.
- Dòng "Cập nhật: 31 tháng 8, 2026".

**`/mau-iconic/laurent-ferrier-galet-classic/`**
- Đúng 2 link, đúng thứ tự: Philippe Dufour Simplicity → Voutilainen Vingt-8; hai câu đúng nguyên văn.
- Dòng "Cập nhật: 31 tháng 8, 2026".

**Chung:**
- Bàn phím: Tab từ đầu trang Dufour đi tới được lần lượt cả 2 liên kết (voutilainen-vingt-8, laurent-ferrier-galet-classic) — vòng focus rõ theo component hiện có.
- Sáng/tối: chụp 2 ảnh khối liên kết Dufour (2 thẻ, nhãn dài xuống dòng gọn) — không chồng lấn, chữ đọc rõ cả hai chế độ.
- Console: 0 lỗi mới — log console chỉ còn hai 404 cố hữu của bản preview (`favicon.ico`, `/_vercel/insights/script.js` — analytics chỉ chạy production), đếm được 0 dòng 404 khác.

## 7. Cam kết

- Chưa commit, chưa push. Chờ chỉ thị riêng.
- Khi commit: chỉ stage 3 tệp nội dung ở mục 4 + biên bản này theo tên cụ thể; không dùng `git add .` / `git add -A`.
