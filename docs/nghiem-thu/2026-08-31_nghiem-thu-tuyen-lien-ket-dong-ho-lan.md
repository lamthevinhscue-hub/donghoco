# Biên bản nghiệm thu — Prompt 14: Tuyến liên kết biên tập "dòng chảy đồng hồ lặn"

- **Ngày:** 31/08/2026
- **Phạm vi:** 3 tệp nội dung sửa + 1 biên bản tạo mới (file này). Không sửa component, schema, template trang, CSS, cấu hình hay tệp nội dung nào khác.

## 1. Mục tiêu của tuyến liên kết

Tạo tuyến đọc có chủ đích giữa bốn cột mốc diver đang có trên trang:

**Blancpain Fifty Fathoms ⇄ Rolex Submariner ⇄ Seiko 62MAS ⇄ Doxa SUB 300**

Mỗi cặp kế tiếp đi được theo cả hai chiều, và mỗi liên kết giải thích **quan hệ lịch sử hoặc khác biệt thiết kế** — người đọc đi từ một mẫu sang mẫu kế tiếp hiểu được vì sao hai mẫu đứng cạnh nhau, không chỉ thấy một danh sách link.

## 2. Bảng 4 mẫu và liên kết đi/đến

| Mẫu | Liên kết đi (relatedModels) | Liên kết đến (từ mẫu khác) |
|---|---|---|
| Blancpain Fifty Fathoms | → Submariner: "Ra đời cùng năm 1953 — hai cột mốc quan trọng của đồng hồ lặn hiện đại" | ← từ Submariner (cùng nhãn) |
| Rolex Submariner | → Fifty Fathoms: "Ra đời cùng năm 1953 — hai cột mốc quan trọng của đồng hồ lặn hiện đại"; → 62MAS: "62MAS (1965) mở rộng lịch sử đồng hồ lặn cơ sang Nhật Bản, hơn một thập niên sau Submariner" | ← từ Fifty Fathoms, ← từ 62MAS |
| Seiko 62MAS | → Submariner: "Submariner (1953) là một cột mốc sớm của diver hiện đại; 62MAS (1965) mở đầu hành trình đồng hồ lặn của Seiko"; → SUB 300: "Hai hướng tiếp cận diver đáng chú ý của thập niên 1960 — 62MAS mở đầu di sản Seiko diver, SUB 300 nhấn vào khả năng đọc sâu và thang lặn" | ← từ Submariner, ← từ SUB 300 |
| Doxa SUB 300 | → 62MAS: "Hai hướng tiếp cận diver đáng chú ý của thập niên 1960 — 62MAS mở đầu di sản Seiko diver, SUB 300 nhấn vào khả năng đọc sâu và thang lặn" (thay câu cũ "Hai mốc diver nổi bật của thập niên 1960") | ← từ 62MAS |

Ba cặp kế tiếp đều hai chiều: Fifty Fathoms ⇄ Submariner, Submariner ⇄ 62MAS, 62MAS ⇄ SUB 300. Không có liên kết vòng lặp, không có slug không tồn tại, không có nhãn chung chung kiểu "Xem thêm"/"Liên quan".

## 3. Vì sao tuyến có ý nghĩa với người đọc

Bốn mẫu kể trọn ba chặng của dòng chảy đồng hồ lặn cơ: **1953** — chuẩn mực hiện đại ra đời gần như đồng thời ở hai bên Atlantico (Fifty Fathoms và Submariner, bài Fifty Fathoms và bài Submariner đều đã có dữ kiện này có nguồn); **1965** — dòng chảy sang Nhật với 62MAS, mở đầu di sản Seiko diver; **1967** — Doxa SUB 300 chọn hướng khác: đọc sâu dưới nước với mặt số cam và vành xoay có chủ đích. Đi hết tuyến, người đọc thấy không phải bốn mẫu rời rạc mà là các cách trả lời khác nhau cho cùng một bài toán: đọc được giờ dưới nước, bền với áp suất, và đáng tin trên cổ tay của người làm việc thật dưới biển.

## 4. Bốn tệp được thay đổi/tạo mới

| # | Tệp | Thay đổi |
|---|---|---|
| 1 | `src/content/mauIconic/vi/rolex-submariner.md` | +`relatedModels` (2 liên kết) trước `sources`; `updated` đổi `"2026-08-30"` → `"2026-08-31"`. Thân bài, `sources`, references, dữ kiện giữ nguyên |
| 2 | `src/content/mauIconic/vi/seiko-62mas.md` | +`relatedModels` (2 liên kết) ngay sau `draft: false` + `updated: "2026-08-31"`. Thân bài, `sources`, references, dữ kiện giữ nguyên |
| 3 | `src/content/mauIconic/vi/doxa-sub-300.md` | Giữ nguyên slug `seiko-62mas`, thay `relation` cũ bằng câu mới đúng văn bản; +`updated: "2026-08-31"` sau khối. Không thêm link mới, thân bài/`sources`/thông số giữ nguyên |
| 4 | `docs/nghiem-thu/2026-08-31_nghiem-thu-tuyen-lien-ket-dong-ho-lan.md` | Tạo mới (biên bản này) |

Fifty Fathoms **không cần sửa**: liên kết → Submariner với đúng nhãn anh cấp đã tồn tại từ đợt trước.

`git diff --stat`: **3 files changed, 16 insertions(+), 2 deletions(-)** — 2 dòng xóa chính là `updated` cũ của Submariner và `relation` cũ của Doxa; không có dòng thân bài nào bị đụng.

## 5. Kết quả kiểm tra

| Lệnh | Kết quả |
|---|---|
| `npm run check` | ĐẠT — toàn bộ kiểm tra tĩnh về khả năng tiếp cận đạt ("Tất cả kiểm tra nội dung tĩnh đạt"); không lỗi Markdown/frontmatter (frontmatter sai schema sẽ làm check/build lỗi) |
| `npm run build` | Thành công — 218 trang, không lỗi build; sitemap tạo xong |
| Kiểm link nội bộ sau build | "OK: Không phát hiện link nội bộ hỏng. Đã quét 218 trang HTML, 14248 link." (+4 link so với trước Prompt 14 — đúng 4 liên kết mới: 2 từ Submariner, 2 từ 62MAS; Doxa chỉ đổi chữ nhãn nên không tăng) |
| `git diff --check` | Không có lỗi khoảng trắng (exit 0) |
| `git status --short` | Đúng 3 tệp `M` như bảng mục 4, cộng các file docs/output chưa theo dõi đã tồn tại từ trước — ngoài phạm vi Prompt 14, không đưa vào commit |

## 6. Kết quả kiểm tra hiển thị (bản xem trước cục bộ sau build)

**`/mau-iconic/fifty-fathoms/`**
- Có khối "Kết nối cùng chủ đề" với liên kết tới `/mau-iconic/rolex-submariner`, nhãn "Ra đời cùng năm 1953 — hai cột mốc quan trọng của đồng hồ lặn hiện đại".

**`/mau-iconic/rolex-submariner/`**
- Có khối "Kết nối cùng chủ đề".
- Đúng hai liên kết: Fifty Fathoms và Seiko 62MAS, mỗi link hiển thị đúng câu giải thích theo văn bản.
- Dòng "Cập nhật: 31 tháng 8, 2026".

**`/mau-iconic/seiko-62mas/`**
- Có khối "Kết nối cùng chủ đề".
- Đúng hai liên kết: Rolex Submariner và Doxa SUB 300, mỗi link đúng câu giải thích theo văn bản.
- Dòng "Cập nhật: 31 tháng 8, 2026".

**`/mau-iconic/doxa-sub-300/`**
- Có liên kết tới `/mau-iconic/seiko-62mas` với câu giải thích mới đúng văn bản.
- Câu cũ "Hai mốc diver nổi bật…" không còn xuất hiện (đếm trực tiếp trên trang: 0 lần).
- Dòng "Cập nhật: 31 tháng 8, 2026".

**Chung:**
- Bàn phím: Tab từ đầu trang Submariner đi tới được liên kết `/mau-iconic/fifty-fathoms`.
- Sáng/tối: chụp 2 ảnh khối liên kết trên trang Submariner (2 thẻ) — không chồng lấn, chữ đọc rõ cả hai chế độ.
- Console: 0 lỗi mới — log console chỉ còn hai 404 cố hữu của bản preview (`favicon.ico`, `/_vercel/insights/script.js` — analytics chỉ chạy production), đếm được 0 dòng 404 khác.

## 7. Cam kết

- Chưa commit, chưa push. Chờ chỉ thị riêng.
- Khi commit: chỉ stage 3 tệp nội dung ở mục 4 + biên bản này theo tên cụ thể; không dùng `git add .` / `git add -A`.
