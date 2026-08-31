# Biên bản nghiệm thu — Prompt 20 (thay thế): Hoàn thiện 10 bài iconic còn thiếu liên kết biên tập

- **Ngày:** 31/08/2026
- **Phạm vi:** 17 tệp nội dung sửa + 1 biên bản tạo mới (file này). Không sửa schema, component, template, CSS, thân bài, nguồn, thông số hay reference.

## 1. Mục tiêu của bảy cụm

Hoàn thiện mạng liên kết biên tập cho 10 bài mẫu iconic cuối cùng chưa có `relatedModels`, đưa toàn bộ thư viện lên **66/66 bài iconic tiếng Việt có ít nhất một liên kết**. Bảy cụm đọc:

| # | Cụm | Thành viên |
|---|---|---|
| 1 | Thiên văn và pha mặt trăng | arnold-and-son-perpetual-moon ⇄ de-bethune-db28 |
| 2 | Hai xuất phát điểm tại Fleurier | chopard-luc ⇄ parmigiani-toric |
| 3 | Mở rộng cụm chế tác độc lập kín đáo | fpjourne-chronometre-bleu với dufour-simplicity, voutilainen-vingt-8, laurent-ferrier-galet-classic |
| 4 | Ba cách diễn giải thiết kế đồng hồ Đức | junghans-max-bill, nomos-tangente, lange-1 (tam giác) |
| 5 | Di sản đồng hồ lặn nhà máy thời quốc doanh | glashuette-seaq ⇄ vostok-amphibia |
| 6 | Vật liệu và kiến trúc thể thao cao cấp hiện đại | richard-mille-rm-001 ⇄ hublot-big-bang |
| 7 | Cơ khí trở thành ngôn ngữ thị giác | roger-dubuis-excalibur ⇄ girard-perregaux-tourbillon-ba-cau |

Tổng **22 liên kết mới**: 11 cặp liên kết hai chiều, mỗi cặp có 2 hướng.

## 2. Bảng 17 bài — liên kết mới, liên kết cũ giữ, thứ tự

| # | Bài | Khối `relatedModels` sau khi sửa (đúng thứ tự) | Ghi chú |
|---|---|---|---|
| 1 | arnold-and-son-perpetual-moon | de-bethune-db28 | Mới (trước trống) + `updated: "2026-08-31"` |
| 2 | de-bethune-db28 | greubel-double-tourbillon → hajime-asaoka-project-t → **arnold-and-son-perpetual-moon (thứ 3, nối cuối)** | Giữ 2 mục cũ nguyên văn; updated có sẵn giữ nguyên |
| 3 | chopard-luc | parmigiani-toric | Mới |
| 4 | parmigiani-toric | chopard-luc | Mới |
| 5 | fpjourne-chronometre-bleu | dufour-simplicity → voutilainen-vingt-8 → laurent-ferrier-galet-classic | Mới (đúng thứ tự đề) |
| 6 | dufour-simplicity | voutilainen-vingt-8 → laurent-ferrier-galet-classic → **fpjourne-chronometre-bleu (thứ 3)** | Giữ 2 mục cũ |
| 7 | voutilainen-vingt-8 | dufour-simplicity → laurent-ferrier-galet-classic → **fpjourne-chronometre-bleu (thứ 3)** | Giữ 2 mục cũ |
| 8 | laurent-ferrier-galet-classic | dufour-simplicity → voutilainen-vingt-8 → **fpjourne-chronometre-bleu (thứ 3)** | Giữ 2 mục cũ |
| 9 | junghans-max-bill | nomos-tangente → lange-1 | Mới |
| 10 | nomos-tangente | junghans-max-bill → lange-1 | Mới |
| 11 | lange-1 | junghans-max-bill → nomos-tangente | Mới |
| 12 | glashuette-seaq | vostok-amphibia | Mới |
| 13 | vostok-amphibia | mido-multifort → oris-aquis-depth-gauge → **glashuette-seaq (thứ 3)** | Giữ 2 mục cũ |
| 14 | richard-mille-rm-001 | hublot-big-bang | Mới |
| 15 | hublot-big-bang | rado-diastar → chanel-j12 → **richard-mille-rm-001 (thứ 3)** | Giữ 2 mục cũ |
| 16 | roger-dubuis-excalibur | girard-perregaux-tourbillon-ba-cau | Mới |
| 17 | girard-perregaux-tourbillon-ba-cau | corum-golden-bridge → fc-heart-beat → **roger-dubuis-excalibur (thứ 3)** | Giữ 2 mục cũ |

Nhãn `relation` dùng đúng nguyên văn câu anh cấp cho từng cặp; 7 bài cũ không bị xóa, thay thế hay đổi thứ tự mục nào.

## 3. Xác nhận 66/66

Trước gói này: 56/66 bài iconic có `relatedModels`. Sau gói: kiểm bằng `grep -L "relatedModels:" src/content/mauIconic/vi/*.md` — **0 bài còn thiếu → 66/66 đều có ít nhất một liên kết biên tập**. 10 bài từng trống (arnold-and-son-perpetual-moon, chopard-luc, parmigiani-toric, fpjourne-chronometre-bleu, junghans-max-bill, nomos-tangente, lange-1, glashuette-seaq, richard-mille-rm-001, roger-dubuis-excalibur) đều có khối "Kết nối cùng chủ đề" trên bản build.

Không tạo liên kết ngoài bảy cụm; không liên kết chéo giữa các cụm; không slug thô, không HTML thô.

## 4. Mười tám tệp sửa/tạo

| # | Tệp | Thay đổi |
|---|---|---|
| 1–10 | 10 tệp bài trống (mục 2, cột "Mới") | +khối `relatedModels` + `updated: "2026-08-31"` ngay sau `draft: false` |
| 11–17 | 7 tệp bài có sẵn (mục 2, cột "thứ 3") | +1 mục nối cuối khối; `updated: "2026-08-31"` có sẵn giữ nguyên |
| 18 | `docs/nghiem-thu/2026-08-31_nghiem-thu-hoan-thien-lien-ket-iconic.md` | Tạo mới (biên bản này) |

`git diff --stat` trước khi tạo biên bản: **17 files changed, 75 insertions(+), 0 deletions** — chỉ frontmatter.

## 5. Kết quả kiểm tra thật

| Lệnh | Kết quả |
|---|---|
| `npm run check` | ĐẠT — "Tất cả kiểm tra nội dung tĩnh đạt" |
| `npm run build` | Thành công — 218 trang; sitemap tạo xong |
| Kiểm link nội bộ sau build | "OK: Không phát hiện link nội bộ hỏng. Đã quét 218 trang HTML, **14363 link**." |
| `git diff --check` | Không có lỗi khoảng trắng (exit 0) |
| `git status --short` | Đúng 17 file `M` như mục 4, cộng các file docs/output chưa theo dõi đã tồn tại từ trước — ngoài phạm vi, không đưa vào commit |
| `git diff --stat` | 17 files changed, 75 insertions(+) |
| Đối chiếu số liên kết | 14.341 → **14.363 = +22** — đúng 22 liên kết mới |
| `grep -L "relatedModels:" src/content/mauIconic/vi/*.md` | 0 tệp — xác nhận 66/66 bài có liên kết |

## 6. Kết quả kiểm tra hiển thị (bản xem trước cục bộ sau build)

Kiểm tự động cả 17 trang (số link, đích đến đúng thứ tự, updated 31/08, nhãn hợp lệ):

- **17/17 đạt, 0 thất bại**: mỗi trang status 200, đúng 1 khối "Kết nối cùng chủ đề", href khớp chính xác thứ tự yêu cầu (7 bài cũ có mục mới ở cuối khối), "Cập nhật: 31 tháng 8, 2026" đủ 17 trang, nhãn là tiêu đề bài thật + câu nguyên văn (không slug thô, không HTML).
- Bàn phím: Tab từ đầu trang Junghans đi tới được liên kết `/mau-iconic/nomos-tangente`.
- Sáng/tối: chụp 2 ảnh khối liên kết trang F.P. Journe (3 thẻ) — không chồng lấn, chữ đọc rõ cả hai chế độ.
- Console: 0 lỗi mới — log console chỉ còn hai 404 cố hữu của bản preview (`favicon.ico`, `/_vercel/insights/script.js` — analytics chỉ chạy production), đếm được 0 dòng 404 khác.

## 7. Cam kết

- Chưa commit, chưa push. Chờ chỉ thị riêng.
- Khi commit: chỉ stage 17 tệp nội dung ở mục 4 + biên bản này theo tên cụ thể; không dùng `git add .` / `git add -A`.
