# Biên bản nghiệm thu — Prompt 16: Mạng liên kết "chronograph công cụ: hàng không, tính toán bay và không gian"

- **Ngày:** 31/08/2026
- **Phạm vi:** 4 tệp nội dung sửa + 1 biên bản tạo mới (file này). Không sửa component, schema, template trang, CSS, cấu hình hay tệp nội dung nào khác.

## 1. Mục tiêu và ý nghĩa biên tập

Kết nối hai chiều giữa bài cơ chế **Chronograph** (nguyên lý Start–Stop–Reset) và ba mẫu iconic tiêu biểu, đồng thời hoàn thiện liên kết ngang giữa ba mẫu:

**Breguet Type XX ⇄ Breitling Navitimer ⇄ Omega Speedmaster**, cùng **Chronograph ⇄ từng mẫu**.

Người đọc đi từ nguyên lý chung sang ba ứng dụng lịch sử khác nhau của cùng một chức năng: flyback cho hàng không quân sự Pháp (Type XX), thước tính bay cho phi công (Navitimer), và hành trình từ đường đua tới chương trình không gian (Speedmaster). Ba mẫu **không** được mô tả dùng cùng loại cơ cấu chronograph, cùng calibre hay cùng kiến trúc bánh răng cột; **không** nói ba mẫu "tương đương" về chức năng hay giá trị sưu tầm — mỗi nhãn chỉ mô tả đúng ứng dụng lịch sử đã có căn cứ trong chính bài hiện hữu.

## 2. Bảng 4 bài — liên kết đi/đến và lý do

| Bài | Liên kết đi | Liên kết đến |
|---|---|---|
| Breguet Type XX (`mauIconic`) | → Navitimer (giữ nguyên); → cơ chế `chronograph`: "Xem nguyên lý chạy, dừng và đặt lại của chronograph — nền tảng của chức năng bấm giờ trên Type XX" | ← từ Navitimer, ← từ Chronograph |
| Breitling Navitimer (`mauIconic`) | → Type XX: "Hai chuẩn mực chronograph hàng không thập niên 1950 — Type XX gắn với yêu cầu quân sự Pháp, Navitimer gắn với việc tính toán cho phi công" (mới, đối ứng câu Type XX đã có); → Speedmaster: "Hai chronograph công cụ — Navitimer gắn với tính toán hàng không, Speedmaster gắn với không gian"; → cơ chế `chronograph`: "Xem nguyên lý chạy, dừng và đặt lại của cơ chế bấm giờ trên đồng hồ cơ" | ← từ Type XX, ← từ Speedmaster, ← từ Chronograph |
| Omega Speedmaster (`mauIconic`) | → Navitimer (giữ nguyên câu cũ); → cơ chế `bo-thoat-dong-truc` (giữ nguyên, Prompt 11); → cơ chế `chronograph` (mới, mục thứ hai ngay sau Co-Axial): "Speedmaster khởi đầu là chronograph cho đua xe — xem nguyên lý chạy, dừng và đặt lại của cơ chế bấm giờ" | ← từ Navitimer, ← từ Chronograph |
| Chronograph (`coChe`) | → Type XX: "Ứng dụng chronograph flyback trong di sản hàng không quân sự Pháp"; → Navitimer: "Chronograph kết hợp thước tính để phi công thực hiện các phép tính bay"; → Speedmaster: "Chronograph từ đường đua trở thành dụng cụ đạt chuẩn NASA trong hành trình không gian" | ← từ cả ba mẫu |

Sau khi sửa: Speedmaster có đúng **1** liên kết mẫu iconic (Navitimer) và đúng **2** liên kết cơ chế (Co-Axial trước, Chronograph sau). Không vòng lặp, không slug chết, không nhãn chung chung.

## 3. Phân biệt ba ứng dụng

- **Hàng không quân sự (Type XX):** chronograph flyback theo đơn hàng không quân Pháp từ thập niên 1950 — đặt lại ngay khi đang chạy, đúng bài Type XX đang viết.
- **Tính toán bay (Navitimer):** thước tính logarit trên vành xoay theo đề nghị hiệp hội phi công AOPA — các phép tính bay ngay trên cổ tay, đúng bài Navitimer đang viết.
- **Không gian (Speedmaster):** khởi đầu chronograph đua xe, sau trở thành dụng cụ đạt chuẩn NASA, đúng bài Speedmaster đang viết.

Không thêm năm, thông số kỹ thuật, nguồn mới, reference mới hay dữ kiện chuyên môn mới — mọi nhãn chỉ diễn đạt lại quan hệ từ nội dung có sẵn của các bài.

## 4. Năm tệp thay đổi/tạo mới

| # | Tệp | Thay đổi |
|---|---|---|
| 1 | `src/content/mauIconic/vi/breguet-type-xx.md` | +`relatedMechanisms` (1 liên kết `chronograph`) sau khối `relatedModels` + `updated: "2026-08-31"`. Thân bài, `sources`, thông số, reference, câu liên kết Navitimer giữ nguyên |
| 2 | `src/content/mauIconic/vi/breitling-navitimer.md` | +`relatedModels` (2 liên kết) + `relatedMechanisms` (1 liên kết) + `updated: "2026-08-31"`, ngay sau `draft: false`. Thân bài, `sources`, thông số giữ nguyên |
| 3 | `src/content/mauIconic/vi/omega-speedmaster.md` | +1 mục `chronograph` trong `relatedMechanisms` ngay sau Co-Axial; `updated` đổi `"2026-08-30"` → `"2026-08-31"`. `relatedModels` Navitimer và liên kết Co-Axial giữ nguyên. Thân bài, `sources`, thông số, reference giữ nguyên |
| 4 | `src/content/coChe/vi/chronograph.md` | +`relatedModels` (3 liên kết) + `updated: "2026-08-31"`, ngay sau `draft: false`. Nội dung Markdown, infographic, nguồn, liên kết thủ công giữ nguyên |
| 5 | `docs/nghiem-thu/2026-08-31_nghiem-thu-mang-lien-ket-chronograph-cong-cu.md` | Tạo mới (biên bản này) |

`git diff --stat`: **4 files changed, 28 insertions(+), 1 deletion(-)** — 1 dòng xóa là `updated` cũ của Speedmaster; không có dòng thân bài nào bị đụng.

## 5. Kết quả kiểm tra

| Lệnh | Kết quả |
|---|---|
| `npm run check` | ĐẠT — toàn bộ kiểm tra tĩnh về khả năng tiếp cận đạt; không lỗi build/schema/frontmatter |
| `npm run build` | Thành công — 218 trang; sitemap tạo xong |
| Kiểm link nội bộ sau build | "OK: Không phát hiện link nội bộ hỏng. Đã quét 218 trang HTML, 14259 link." (+8 so với trước — đúng 8 liên kết mới: Type XX +1, Navitimer +3, Speedmaster +1, Chronograph +3) |
| `git diff --check` | Không có lỗi khoảng trắng (exit 0) |
| `git status --short` | Đúng 4 tệp `M` như bảng mục 4, cộng các file docs/output chưa theo dõi đã tồn tại từ trước — ngoài phạm vi Prompt 16, không đưa vào commit |

## 6. Kết quả kiểm tra hiển thị (bản xem trước cục bộ sau build)

**`/mau-iconic/breguet-type-xx/`**
- Khối "Kết nối cùng chủ đề" đúng 2 liên kết, đúng thứ tự: Navitimer → Chronograph.
- Link Chronograph đúng câu giải thích theo văn bản.
- Dòng "Cập nhật: 31 tháng 8, 2026".

**`/mau-iconic/breitling-navitimer/`**
- Đúng 3 liên kết, đúng thứ tự: Type XX → Speedmaster → Chronograph.
- Ba câu giải thích đúng nguyên văn, mỗi href 1 lần.
- Dòng "Cập nhật: 31 tháng 8, 2026".

**`/mau-iconic/omega-speedmaster/`**
- Đúng 3 liên kết, đúng thứ tự: Navitimer → Co-Axial → Chronograph.
- Liên kết Co-Axial hiện có vẫn hoạt động với câu cũ nguyên văn; nhãn Navitimer giữ câu cũ.
- Dòng "Cập nhật: 31 tháng 8, 2026".

**`/co-che/chronograph/`**
- Có khối "Kết nối cùng chủ đề" (lần đầu tiên trang cơ chế này hiện khối, nhờ `relatedModels` mới có từ Prompt 13) với đúng 3 link: Type XX → Navitimer → Speedmaster.
- Ba câu giải thích đúng nguyên văn.
- Dòng "Cập nhật: 31 tháng 8, 2026".

**Chung:**
- Bàn phím: Tab từ đầu trang Type XX đi tới được liên kết `/co-che/chronograph`; các link là `<a>` chuẩn của component có vòng focus rõ.
- Sáng/tối: chụp 2 ảnh khối liên kết Navitimer (3 thẻ) — không chồng lấn, chữ đọc rõ cả hai chế độ.
- Console: 0 lỗi mới — log console chỉ còn hai 404 cố hữu của bản preview (`favicon.ico`, `/_vercel/insights/script.js` — analytics chỉ chạy production), đếm được 0 dòng 404 khác.

## 7. Cam kết

- Chưa commit, chưa push. Chờ chỉ thị riêng.
- Khi commit: chỉ stage 4 tệp nội dung ở mục 4 + biên bản này theo tên cụ thể; không dùng `git add .` / `git add -A`.
