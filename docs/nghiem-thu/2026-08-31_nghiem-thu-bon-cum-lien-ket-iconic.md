# Biên bản nghiệm thu — Prompt 18: Bốn cụm liên kết biên tập — phi công, siêu mỏng, hiển thị avant-garde và dáng chữ nhật

- **Ngày:** 31/08/2026
- **Phạm vi:** 10 tệp nội dung sửa + 1 biên bản tạo mới (file này). Không sửa component, schema, template trang, CSS, cấu hình, nguồn, thông số, reference hay tệp nội dung nào khác.

## 1. Mục tiêu và ý nghĩa biên tập của từng cụm

| Cụm | Thành viên | Ý nghĩa đọc |
|---|---|---|
| 1. Phi công công cụ | IWC Mark XI, Stowa Flieger, Longines Lindbergh | Ba dụng cụ hàng không với ba mục đích khác nhau: bền và đọc được trong buồng lái (Mark XI cho RAF), đọc giờ tức thì theo ngôn ngữ Flieger Đức thập niên 1940 (Stowa), và hỗ trợ tính vị trí thiên văn kèm kính lục phân (Lindbergh Hour Angle). |
| 2. Siêu mỏng | Piaget Altiplano, Bvlgari Octo Finissimo | Hai cách theo đuổi độ mỏng: nối tiếp truyền thống calibre mỏng của Piaget, đối lập đẩy giới hạn bằng kiến trúc vỏ-bộ máy hiện đại của Bvlgari. |
| 3. Avant-garde | Ulysse Nardin Freak, Urwerk UR-105, MB&F HM N°1 | Ba cách thoát khỏi mặt số quen thuộc: bộ máy quay làm mặt số (Freak), giờ vệ tinh (UR-105), bố cục cỗ máy điêu khắc ba chiều (HM1). |
| 4. Chữ nhật | Cartier Tank, Jaeger-LeCoultre Reverso | Hai biểu tượng vỏ chữ nhật với hai điểm xuất phát khác nhau: xe tăng 1917 và bảo vệ mặt số khi chơi polo. |

Bốn cụm là bốn không gian đọc riêng — **không có liên kết xuyên cụm** (không nối IWC với Navitimer, không nối Tank với Altiplano, v.v.).

## 2. Bảng 10 bài — liên kết đi/đến

| # | Bài | Liên kết đi (đúng thứ tự) | Liên kết đến |
|---|---|---|---|
| 1 | IWC Mark XI | → Stowa Flieger (nhãn đối ứng); → Lindbergh (nhãn đối ứng) | ← từ Stowa, ← từ Lindbergh |
| 2 | Stowa Flieger | → Mark XI (đối ứng); → Lindbergh ("Flieger ưu tiên đọc giờ tức thì, Lindbergh… hệ thống tính vị trí") | ← từ Mark XI, ← từ Lindbergh |
| 3 | Longines Lindbergh | → Mark XI (đối ứng); → Stowa (đối ứng) | ← từ Mark XI, ← từ Stowa |
| 4 | Piaget Altiplano | → Octo Finissimo ("Altiplano nối tiếp truyền thống calibre mỏng… Octo Finissimo đẩy giới hạn…") | ← từ Octo Finissimo |
| 5 | Bvlgari Octo Finissimo | → Altiplano (nhãn đối ứng chính xác) | ← từ Altiplano |
| 6 | Ulysse Nardin Freak | → UR-105 ("Freak dùng bộ máy quay như mặt số, UR-105 dùng vệ tinh…"); → HM1 ("đưa bộ máy thành trải nghiệm thị giác ba chiều…") | ← từ UR-105, ← từ HM1 |
| 7 | Urwerk UR-105 | → Freak (đối ứng); → HM1 ("UR-105… giờ vệ tinh, HM1… bố cục cỗ máy điêu khắc") | ← từ Freak, ← từ HM1 |
| 8 | MB&F HM N°1 | → Freak (đối ứng); → UR-105 (đối ứng) | ← từ Freak, ← từ UR-105 |
| 9 | Cartier Tank | → Reverso ("Tank… xe tăng năm 1917, Reverso… bảo vệ mặt số khi chơi polo") | ← từ Reverso |
| 10 | JLC Reverso | → Tank (nhãn đối ứng chính xác) | ← từ Tank |

Cụm 1 và cụm 3: tam giác hai chiều đủ 6 liên kết mỗi cụm. Cụm 2 và 4: cặp đôi hai chiều. Tổng **16 liên kết mới**, đúng khớp mức tăng link nội bộ sau build. Không vòng lặp, không slug chết, không nhãn chung chung.

## 3. Không có liên kết xuyên cụm — xác nhận

16 liên kết chỉ nằm trong phạm vi cụm của mình: cụm 1 các cặp Mark XI–Stowa–Lindbergh; cụm 2 Altiplano–Finissimo; cụm 3 Freak–UR-105–HM1; cụm 4 Tank–Reverso. Không liên kết nào chạm bài của cụm khác hay bài ngoài danh sách (Navitimer, Altiplano, các mẫu diver… đều không xuất hiện trong 10 bài này).

## 4. Kiểm soát tuyên bố — giới hạn đã tuân thủ

- **Không gán sai chức năng/nguồn gốc:** Stowa Flieger không bị mô tả là đồng hồ RAF (chỉ Mark XI gắn RAF, đúng bài); Mark XI không bị mô tả là dụng cụ tính vị trí thiên văn (chỉ Lindbergh); Lindbergh không bị gán vai trò buồng lái của Mark XI.
- **Không gộp đặc tính kỹ thuật:** cụm 2 không nói hai mẫu cùng độ mỏng, cùng kỷ lục, cùng calibre hay cùng khả năng bảo dưỡng; nhãn tách rõ hai cách tiếp cận.
- **Cụm 3:** HM1 không bị gán hiển thị giờ vệ tinh (chỉ UR-105); UR-105 không bị phủ nhận kim/mặt số; Freak không bị gọi là tourbillon.
- **Cụm 4:** Tank không bị gọi là "đồng hồ Art Deco" (chỉ nêu cảm hứng xe tăng 1917, đúng bài); Reverso không bị gán cảm hứng xe tăng; không khẳng định hai mẫu cùng loại bộ máy hay cùng mục đích sử dụng.
- Không dùng "tốt nhất", "đỉnh nhất", "vượt trội", "cao hơn"; không thêm nguồn, số liệu, reference, thông số, giá hay nhận định thị trường mới.

## 5. Mười một tệp thay đổi/tạo mới

| # | Tệp | Thay đổi |
|---|---|---|
| 1 | `src/content/mauIconic/vi/iwc-mark-xi.md` | +`relatedModels` (2 liên kết) + `updated: "2026-08-31"` sau `draft: false` |
| 2 | `src/content/mauIconic/vi/stowa-flieger.md` | +`relatedModels` (2 liên kết) + `updated` |
| 3 | `src/content/mauIconic/vi/longines-lindbergh.md` | +`relatedModels` (2 liên kết) + `updated` |
| 4 | `src/content/mauIconic/vi/piaget-altiplano.md` | +`relatedModels` (1 liên kết) + `updated` |
| 5 | `src/content/mauIconic/vi/bvlgari-octo-finissimo.md` | +`relatedModels` (1 liên kết) + `updated` |
| 6 | `src/content/mauIconic/vi/freak.md` | +`relatedModels` (2 liên kết) + `updated` |
| 7 | `src/content/mauIconic/vi/urwerk-ur-105.md` | +`relatedModels` (2 liên kết) + `updated` |
| 8 | `src/content/mauIconic/vi/mbf-horological-machine-1.md` | +`relatedModels` (2 liên kết) + `updated` |
| 9 | `src/content/mauIconic/vi/cartier-tank.md` | +`relatedModels` (1 liên kết) + `updated` |
| 10 | `src/content/mauIconic/vi/reverso.md` | +`relatedModels` (1 liên kết) + `updated` |
| 11 | `docs/nghiem-thu/2026-08-31_nghiem-thu-bon-cum-lien-ket-iconic.md` | Tạo mới (biên bản này) |

`git diff --stat`: **10 files changed, 62 insertions(+), 0 deletions** — chỉ frontmatter; không có dòng thân bài, nguồn, thông số hay reference nào bị đụng.

## 6. Kết quả kiểm tra

| Lệnh | Kết quả |
|---|---|
| `npm run check` | ĐẠT — toàn bộ kiểm tra tĩnh về khả năng tiếp cận đạt; không lỗi build/Markdown/frontmatter/schema |
| `npm run build` | Thành công — 218 trang; sitemap tạo xong |
| Kiểm link nội bộ sau build | "OK: Không phát hiện link nội bộ hỏng. Đã quét 218 trang HTML, 14281 link." (+16 so với trước — đúng 16 liên kết mới) |
| `git diff --check` | Không có lỗi khoảng trắng (exit 0) |
| `git status --short` | Đúng 10 tệp `M` như bảng mục 5, cộng các file docs/output chưa theo dõi đã tồn tại từ trước — ngoài phạm vi Prompt 18, không đưa vào commit |

## 7. Kết quả kiểm tra hiển thị (bản xem trước cục bộ sau build)

Cả 10 trang đều đạt, khớp bảng yêu cầu:

| Trang | Số khối | Số link + đích theo thứ tự | Cập nhật 31/08 |
|---|---|---|---|
| `/mau-iconic/iwc-mark-xi/` | 1 | 2 — Stowa Flieger → Longines Lindbergh | ✓ |
| `/mau-iconic/stowa-flieger/` | 1 | 2 — IWC Mark XI → Longines Lindbergh | ✓ |
| `/mau-iconic/longines-lindbergh/` | 1 | 2 — IWC Mark XI → Stowa Flieger | ✓ |
| `/mau-iconic/piaget-altiplano/` | 1 | 1 — Bvlgari Octo Finissimo | ✓ |
| `/mau-iconic/bvlgari-octo-finissimo/` | 1 | 1 — Piaget Altiplano | ✓ |
| `/mau-iconic/freak/` | 1 | 2 — Urwerk UR-105 → MB&F HM1 | ✓ |
| `/mau-iconic/urwerk-ur-105/` | 1 | 2 — Ulysse Nardin Freak → MB&F HM1 | ✓ |
| `/mau-iconic/mbf-horological-machine-1/` | 1 | 2 — Ulysse Nardin Freak → Urwerk UR-105 | ✓ |
| `/mau-iconic/cartier-tank/` | 1 | 1 — Jaeger-LeCoultre Reverso | ✓ |
| `/mau-iconic/reverso/` | 1 | 1 — Cartier Tank | ✓ |

- Câu giải thích hiển thị đúng nguyên văn trên mọi trang; liên kết là tiêu đề bài thật (không slug thô, không mã HTML).
- Bàn phím: Tab từ đầu trang Lindbergh đi tới được lần lượt cả 2 liên kết (iwc-mark-xi, stowa-flieger); các link là `<a>` chuẩn của component với vòng focus rõ.
- Sáng/tối: chụp 2 ảnh khối liên kết trang IWC Mark XI — không chồng lấn, chữ đọc rõ cả hai chế độ.
- Console: 0 lỗi mới — log console chỉ còn hai 404 cố hữu của bản preview (`favicon.ico`, `/_vercel/insights/script.js` — analytics chỉ chạy production), đếm được 0 dòng 404 khác.

## 8. Cam kết

- Chưa commit, chưa push. Chờ chỉ thị riêng.
- Khi commit: chỉ stage 10 tệp nội dung ở mục 5 + biên bản này theo tên cụ thể; không dùng `git add .` / `git add -A`.
