# Biên bản nghiệm thu — Prompt 19: Mở rộng mạng liên kết biên tập iconic — 10 cụm / 30 bài / 60 liên kết

- **Ngày:** 31/08/2026
- **Phạm vi:** 30 tệp nội dung sửa + 1 biên bản tạo mới (file này). Không sửa thân bài, nguồn, thông số, reference, component, schema, CSS hay template.

## 1. Mục tiêu của 10 cụm

Mở rộng mạng lưới đọc giữa các mẫu iconic bằng 10 cụm chủ đề độc lập, mỗi cụm 3 bài, mỗi bài dẫn đúng 2 bài còn lại trong cụm qua `relatedModels` — tam giác hai chiều hoàn chỉnh (A ⇄ B, A ⇄ C, B ⇄ C). Mỗi cụm là một không gian đọc riêng:

| # | Cụm | Thành viên |
|---|---|---|
| 1 | Ba góc nhìn về chronograph di sản | monaco, montblanc-minerva-monopusher, seagull-1963 |
| 2 | Phá vỡ quy ước hình dáng và cách đọc giờ | bell-ross-br-01, hamilton-ventura, franck-muller-crazy-hours |
| 3 | Vật liệu là điểm xuất phát của thiết kế | rado-diastar, chanel-j12, hublot-big-bang |
| 4 | Khi cơ khí trở thành hình ảnh chính | corum-golden-bridge, girard-perregaux-tourbillon-ba-cau, fc-heart-beat |
| 5 | Ba biểu đạt của chế tác Nhật Bản đương đại | credor-eichi-2, grand-seiko-snowflake, minase-horizon |
| 6 | Những cánh cửa tiếp cận đồng hồ cơ | orient-bambino, timex-marlin, swatch-sistem51 |
| 7 | Đồng hồ công cụ và các lời giải kỹ thuật | mido-multifort, vostok-amphibia, oris-aquis-depth-gauge |
| 8 | Nhà chế tác độc lập và tư duy kỹ thuật | de-bethune-db28, greubel-double-tourbillon, hajime-asaoka-project-t |
| 9 | Cải tiến kiến trúc lên cót tự động | eterna-matic-1948, universal-geneve-polerouter, carl-f-bucherer-manero-peripheral |
| 10 | Ba diễn giải sport-luxury có bản sắc riêng | vc-overseas, h-moser-streamliner, baume-mercier-riviera |

## 2. Bảng 30 bài — liên kết mới và liên kết cũ giữ lại

Nhãn `relation` dùng đúng nguyên văn câu anh cấp cho từng cặp, cả hai chiều giống nhau.

| # | Bài (slug nguồn) | 2 liên kết mới (đúng thứ tự trong khối) | Liên kết cũ giữ lại |
|---|---|---|---|
| 1 | monaco | montblanc-minerva-monopusher, seagull-1963 | — |
| 2 | montblanc-minerva-monopusher | monaco, seagull-1963 | — |
| 3 | seagull-1963 | monaco, montblanc-minerva-monopusher | — |
| 4 | bell-ross-br-01 | hamilton-ventura, franck-muller-crazy-hours | — |
| 5 | hamilton-ventura | bell-ross-br-01, franck-muller-crazy-hours | — |
| 6 | franck-muller-crazy-hours | bell-ross-br-01, hamilton-ventura | — |
| 7 | rado-diastar | chanel-j12, hublot-big-bang | — |
| 8 | chanel-j12 | rado-diastar, hublot-big-bang | — |
| 9 | hublot-big-bang | rado-diastar, chanel-j12 | — |
| 10 | corum-golden-bridge | girard-perregaux-tourbillon-ba-cau, fc-heart-beat | — |
| 11 | girard-perregaux-tourbillon-ba-cau | corum-golden-bridge, fc-heart-beat | — |
| 12 | fc-heart-beat | corum-golden-bridge, girard-perregaux-tourbillon-ba-cau | — |
| 13 | credor-eichi-2 | grand-seiko-snowflake, minase-horizon | — |
| 14 | grand-seiko-snowflake | credor-eichi-2, minase-horizon | — |
| 15 | minase-horizon | credor-eichi-2, grand-seiko-snowflake | — |
| 16 | orient-bambino | timex-marlin, swatch-sistem51 | — |
| 17 | timex-marlin | orient-bambino, swatch-sistem51 | — |
| 18 | swatch-sistem51 | orient-bambino, timex-marlin | — |
| 19 | mido-multifort | vostok-amphibia, oris-aquis-depth-gauge | — |
| 20 | vostok-amphibia | mido-multifort, oris-aquis-depth-gauge | — |
| 21 | oris-aquis-depth-gauge | mido-multifort, vostok-amphibia | — |
| 22 | de-bethune-db28 | greubel-double-tourbillon, hajime-asaoka-project-t | — |
| 23 | greubel-double-tourbillon | de-bethune-db28, hajime-asaoka-project-t | — |
| 24 | hajime-asaoka-project-t | de-bethune-db28, greubel-double-tourbillon | — |
| 25 | eterna-matic-1948 | universal-geneve-polerouter, carl-f-bucherer-manero-peripheral | — |
| 26 | universal-geneve-polerouter | eterna-matic-1948, carl-f-bucherer-manero-peripheral | **royal-oak (vị trí đầu, nguyên văn)** |
| 27 | carl-f-bucherer-manero-peripheral | eterna-matic-1948, universal-geneve-polerouter | — |
| 28 | vc-overseas | h-moser-streamliner, baume-mercier-riviera | — |
| 29 | h-moser-streamliner | vc-overseas, baume-mercier-riviera | — |
| 30 | baume-mercier-riviera | vc-overseas, h-moser-streamliner | **royal-oak (vị trí đầu, nguyên văn)** |

## 3. Xác nhận 10 cụm độc lập — không liên kết xuyên cụm

60 liên kết mới chỉ nằm trong phạm vi cụm của mình (mỗi cụm 6 liên kết hai chiều). Không mục nào trỏ tới bài thuộc cụm khác hay bài ngoài danh sách. Hai bài đặc biệt giữ đúng 1 liên kết cũ: Polerouter → royal-oak (câu "Một thiết kế lớn đầu sự nghiệp Gérald Genta (1954) — trước Royal Oak năm 1972") và Riviera → royal-oak (câu "Hai thiết kế thép thể thao đáng chú ý đầu thập niên 1970") — cả hai ở **vị trí đầu tiên** của khối, nguyên văn, không xóa/sửa/đổi thứ tự. Hai bài này có tổng 3 liên kết mỗi bài.

## 4. Kiểm soát tuyên bố

- Mọi nhãn chỉ dùng dữ kiện đã có trong chính ba bài của cụm; không thêm năm, giá, calibre, thông số, nguồn, thành tích hay tuyên bố lịch sử mới.
- Không dùng "tốt nhất", "đỉnh nhất", "vượt trội", "cao hơn"; không dùng "đầu tiên" ngoài những chỗ đã có sẵn trong bài gốc (các nhãn không dùng từ này).
- Không có nhãn chung chung kiểu "Xem thêm"/"Liên quan"; mỗi nhãn ghi rõ điểm gặp và điểm khác.

## 5. Bảng 31 tệp thay đổi/tạo mới

28 tệp thêm khối `relatedModels` (2 mục) + `updated: "2026-08-31"`: monaco, montblanc-minerva-monopusher, seagull-1963, bell-ross-br-01, hamilton-ventura, franck-muller-crazy-hours, rado-diastar, chanel-j12, hublot-big-bang, corum-golden-bridge, girard-perregaux-tourbillon-ba-cau, fc-heart-beat, credor-eichi-2, grand-seiko-snowflake, minase-horizon, orient-bambino, timex-marlin, swatch-sistem51, mido-multifort, vostok-amphibia, oris-aquis-depth-gauge, de-bethune-db28, greubel-double-tourbillon, hajime-asaoka-project-t, eterna-matic-1948, carl-f-bucherer-manero-peripheral, vc-overseas, h-moser-streamliner — toàn bộ dưới `src/content/mauIconic/vi/`.

2 tệp có khối sẵn: `universal-geneve-polerouter.md` (giữ mục royal-oak, nối 2 mục mới, `updated` đổi "2026-08-30" → "2026-08-31") và `baume-mercier-riviera.md` (giữ mục royal-oak, nối 2 mục mới, thêm `updated: "2026-08-31"`).

1 tệp tạo mới: `docs/nghiem-thu/2026-08-31_nghiem-thu-mang-lien-ket-iconic-mo-rong.md` (biên bản này).

Tổng: **30 files changed, 208 insertions(+), 1 deletion(-)** — 1 dòng xóa là `updated` cũ của Polerouter; không có dòng thân bài nào bị đụng.

## 6. Kết quả kiểm tra thật

| Lệnh | Kết quả |
|---|---|
| `npm run check` | ĐẠT — "Tất cả kiểm tra nội dung tĩnh đạt" (không lỗi build/Markdown/frontmatter/schema) |
| `npm run build` | Thành công — 218 trang; sitemap tạo xong |
| Kiểm link nội bộ sau build | "OK: Không phát hiện link nội bộ hỏng. Đã quét 218 trang HTML, **14341 link**." |
| `git diff --check` | Không có lỗi khoảng trắng (exit 0) |
| `git status --short` | Đúng **30 file `M`** như mục 5, cộng các file docs/output chưa theo dõi đã tồn tại từ trước — ngoài phạm vi Prompt 19, không đưa vào commit |
| `git diff --stat` | 30 files changed, 208 insertions(+), 1 deletion(-) |

**Đối chiếu số liên kết:** 14.281 → **14.341 = +60** — đúng 60 liên kết mới (10 cụm × 6 liên kết). Không link hỏng.

## 7. Kết quả kiểm tra hiển thị (bản xem trước cục bộ sau build)

Kiểm tự động cả **30 trang** với bộ kỳ vọng theo từng bài (số link, đích đến đúng thứ tự, updated 31/08, nhãn hợp lệ):

- **30/30 đạt, 0 thất bại**: mỗi trang status 200, đúng 1 khối "Kết nối cùng chủ đề", đúng số liên kết (28 bài 2 link; Polerouter và Riviera 3 link với royal-oak ở vị trí đầu), href khớp chính xác thứ tự yêu cầu, dòng "Cập nhật: 31 tháng 8, 2026" đủ 30 trang.
- Nhãn hiển thị là tiêu đề bài thật + câu quan hệ nguyên văn (không slug thô, không mã HTML — kiểm tự động trên span nhãn của mọi liên kết).
- Bàn phím: Tab từ đầu trang Riviera đi tới được liên kết `/mau-iconic/royal-oak` (link đầu khối); các link là `<a>` chuẩn của component với vòng focus rõ.
- Sáng/tối: chụp 2 ảnh khối liên kết trang Monaco (2 nhãn dài xuống dòng gọn) — không chồng lấn, chữ đọc rõ cả hai chế độ.
- Console: 0 lỗi mới — log console chỉ còn hai 404 cố hữu của bản preview (`favicon.ico`, `/_vercel/insights/script.js` — analytics chỉ chạy production), đếm được 0 dòng 404 khác.

## 8. Cam kết

- Chưa commit, chưa push. Chờ chỉ thị riêng.
- Khi commit: chỉ stage 30 tệp nội dung ở mục 5 + biên bản này theo tên cụ thể; không dùng `git add .` / `git add -A`.
