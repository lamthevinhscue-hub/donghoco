# Biên bản nghiệm thu — Cụm "Automatic & năng lượng cơ học" song ngữ (Prompt 36)

Ngày: 04/09/2026
Phạm vi đề: chuẩn hóa theo nguồn và xuất bản cụm song ngữ automatic & năng lượng cơ học — 6 bài tiếng Việt, rà 3 bài English hiện có, 3 bài English mới, contentRoutes +3 cặp, check-english-launch 37→40, script chống hồi quy cụm, hồ sơ nguồn, biên bản.

## 1. Tệp sửa / tạo

Sửa (nội dung chuẩn hóa):

| Tệp | Thay đổi chính |
|---|---|
| `src/content/coChe/vi/len-day-tu-dong.md` | Bỏ lịch sử Harwood/Rolex 1931, "gần như mọi cao cấp", ly hợp một chiều 2 kiểu, "chỉ cần đeo là tự chạy", declutching, khuyến nghị winder; viết lại theo FHH Rotor + Automatic; relatedModels Eterna viết lại trung tính |
| `src/content/coChe/vi/tru-cot.md` | Xóa bảng 38–100+ giờ, mục "Weekend Power Reserve", danh sách hãng (ETA/Rolex/Tudor/Powermatic/IWC/Panerai/Glashütte, Hublot/Panerai/Tudor, Lange/JLC/Oris), "8 giờ/ngày", "20–30 vòng", dầu khô/biến dạng, winder ">2 chiếc"; mức trữ cót = thông số từng calibre |
| `src/content/tuDien/vi/rotor.md` | Bỏ Perrelet 1777/Rolex 1931, danh sách hãng micro-rotor, mục vật liệu + nhận định thép, vân Genève; "ly hợp một chiều" → "hệ truyền cụ thể của từng bộ máy" |
| `src/content/tuDien/vi/thung-cot.md` | Bỏ "38–50 giờ", "7 ngày hai thùng", "song song", "hai thùng ổn định lực", "vòng tròn lớn nhất"; thêm FHH barrel arbor; số thùng = thiết kế của calibre |
| `src/content/tuDien/vi/power-reserve.md` | Xóa bảng + weekend + danh sách hãng + "cách tăng" + "đắt hơn"; mức trữ cót = thông số từng calibre |
| `src/content/huongDan/vi/hop-xoay-dong-ho.md` | Sửa link sai `[thùng cót](/tu-dien/day-cot)` → `/tu-dien/thung-cot` (chữ là thùng cót nhưng đích là bài dây cót); updated 2026-09-04 |
| `src/content/coChe/en/power-reserve.md` | Chuẩn hóa song song bản vi (bảng, weekend, Hublot/Panerai/Tudor, "more expensive" bị loại); thêm `interactive: false` |
| `src/content/tuDien/en/rotor.md` | Chuẩn hóa song song bản vi; đổi nguồn sang 2 URL FHH encyclopedia đã tra nguyên văn |
| `src/content/tuDien/en/power-reserve.md` | Chuẩn hóa song song bản vi; thêm nguồn Barrel (2 nguồn); thêm `has_infographic/interactive: false` |

Tạo mới (English):

| Tệp | custom_slug |
|---|---|
| `src/content/coChe/en/automatic-winding.md` | `automatic-winding` |
| `src/content/tuDien/en/barrel.md` | `barrel` |
| `src/content/huongDan/en/watch-winders.md` | `watch-winders` |

Hạ tầng:

- `src/i18n/contentRoutes.ts` — +3 cặp: `/co-che/len-day-tu-dong` ↔ `/en/mechanisms/automatic-winding/`, `/tu-dien/thung-cot` ↔ `/en/glossary/barrel/`, `/huong-dan/hop-xoay-dong-ho` ↔ `/en/guides/watch-winders/`.
- `scripts/check-english-launch.mjs` — REQUIRED_EN 37 → 40 route.
- `scripts/check-automatic-energy-cluster.mjs` — mới (R1–R6, khuôn check-daily-care-cluster).
- `package.json` — script cụm vào cuối `npm run check` + alias `check:automatic-energy`.
- `docs/ho-so-nguon-cum-automatic-nang-luong-song-ngu.md` — hồ sơ nguồn.

## 2. Nguồn và giới hạn từng nguồn

Bốn nguồn FHH đã tra nguyên văn bằng web_reader ngày 04/09/2026 (nguyên văn đầy đủ trong hồ sơ nguồn, mục 1):

1. **FHH — Rotor** (encyclopedia/rotor): "semi-circular disc that freely rotates with each movement of the arm", "Its own weight returns it to a vertical position", "A specific system multiplies its rotations".
2. **FHH — Automatic self-winding** (encyclopedia/automatic-self-winding): "winds the mainspring by using the movement of the arm", "via specific gears".
3. **FHH — Barrel** (encyclopedia/barrel): dây móc ngoài-vào-thùng/trong-vào-trục, bánh thùng ăn khớp bánh nhông đầu, quay 1/9–1/6 vòng/giờ.
4. **FHH — Barrel arbor** (encyclopedia/barrel-arbor): trục đỡ thùng và dây, móc đầu trong, chốt trên hình vuông cho bánh lên cót.

Giới hạn: 4 nguồn này **không** nói gì về lịch sử Harwood/Perrelet/Rolex/Eterna, hiệu quả theo hướng quay, số giờ trữ cót của calibre nào, vật liệu rotor, hay cấu hình hộp xoay — nên các phần đó bị loại hoặc viết trung tính (chi tiết bảng claim → quyết định trong hồ sơ nguồn, mục 2).

## 3. Claim đã loại (tổng hợp)

- Lịch sử/năm: Harwood 1923, Rolex Perpetual 1931, Perrelet 1777, Eterna-Matic 1948 (relation viết lại trung tính, không mốc).
- Khái quát: "gần như mọi đồng hồ cơ cao cấp đều automatic", "hầu hết automatic vẫn lên tay được", "chỉ cần đeo là tự chạy", "không cần vặn tay mỗi ngày".
- Kỹ thuật không nguồn: rotor một chiều "có hiệu quả", hai kiểu ly hợp (bánh răng/bi), declutching bảo vệ, hai barrel "song song"/"ổn định lực", "7 ngày thường hai barrel", "barrel là vòng tròn lớn nhất", vật liệu rotor + hiệu suất, "đắt hơn/phức tạp hơn" khi trữ cót dài.
- Bảng/danh sách: bảng 38–42/48–50/70/80/100+ giờ + model hãng (cả bản vi lẫn EN), "weekend power reserve" như quy tắc, danh sách hãng micro-rotor, danh sách hãng chỉ số trữ cót.
- Số hoạt động: "đeo đủ 8 giờ/ngày", "vặn tay 20–30 vòng", "dầu khô → cót nhả nhanh", "dây cót để lâu biến dạng", winder "chỉ cần nếu >2 chiếc".
- Hộp xoay: không đưa TPD/chiều xoay như cấu hình chung (chỉ trong cửa sổ "đừng tự đặt — theo tài liệu"); không hứa giữ đầy cót/tránh dừng.

## 4. Kiểm chứng chống hồi quy

`scripts/check-automatic-energy-cluster.mjs`: R1 frontmatter 6 bài EN; R2 3 cặp route; R3 liên kết bắt buộc + đích; R4 EN không link vi; R5 cấm pattern (quét phần thân, loại frontmatter) + bảng giờ trữ cót + cửa sổ TPD; R6 hồ sơ + biên bản. Đã vào cuối `npm run check` và có alias `check:automatic-energy`.

R4 được kiểm bằng tiêm lỗi thật: chèn tạm một link vi vào một bài EN cụm, chạy script, xác nhận bắt đúng dòng, rồi khôi phục (ghi nhận ở mục 8).

## 5. Kết quả từng lệnh nghiệm thu (chạy thật 04/09/2026)

| Lệnh | Kết quả |
|---|---|
| `npm run check:automatic-energy` | ĐẠT — 6 bài EN frontmatter hợp lệ; 3 cặp route; 59 liên kết bắt buộc có đích; R4 sạch; R5 sạch các nhóm cấm; hồ sơ + biên bản tồn tại |
| `npm run check` | ĐẠT — toàn chuỗi 17 script, kết thúc bằng cụm automatic-energy ĐẠT (các cụm GMT/Chronograph/Daily-care vẫn ĐẠT) |
| `npm run build` | ĐẠT — 266 trang dựng trong 33,82 s; check-links: 18.690 link nội bộ, không hỏng; ngân sách 3D + route tiến hóa ĐẠT |
| `node scripts/check-english-launch.mjs` | ĐẠT — "Đủ 40 route English launch pack trong dist" (37 → 40); 44 trang EN có lang/canonical/og:locale/inLanguage đúng; 222 trang VI giữ canonical; hreflang + switcher không 404 |
| `git diff --check` | Sạch (không whitespace lỗi) |
| `git status --short` | 13 M + các ??; đúng 6 tệp ?? mới của P36 (3 bài EN mới, script cụm, hồ sơ, biên bản); các ?? cũ (docs tháng 8, output/) không đụng tới |

## 6. Số route English trước/sau

- Trước P36: **37** route bài + tĩnh trong REQUIRED_EN (41 URL /en/ tổng trong sitemap gồm 6 static + 5 index đã tính sẵn).
- Sau P36: **40** route trong REQUIRED_EN — `check-english-launch` in "Đủ 40 route English launch pack trong dist".

## 7. Ba cặp route mới

| vi | en |
|---|---|
| `/co-che/len-day-tu-dong` | `/en/mechanisms/automatic-winding/` |
| `/tu-dien/thung-cot` | `/en/glossary/barrel/` |
| `/huong-dan/hop-xoay-dong-ho` | `/en/guides/watch-winders/` |

Tự kiểm dist: `dist/en/mechanisms/automatic-winding/index.html`, `dist/en/glossary/barrel/index.html`, `dist/en/guides/watch-winders/index.html` tồn tại; nội dung render đúng ("semi-circular disc that freely rotates", "one-ninth to one-sixth of a revolution per hour", "Only per the manual for your model"); `dist/tu-dien/thung-cot/index.html` có hreflang en → `/en/glossary/barrel/`.

## 8. Kiểm chứng R4 bằng tiêm lỗi thật

Chèn tạm `[dây cót](/tu-dien/day-cot)` vào cuối `src/content/tuDien/en/barrel.md` → chạy script → `KHÔNG ĐẠT` với đúng một lỗi `[R4] src/content/tuDien/en/barrel.md:19 — link nội bộ về route vi: /tu-dien/day-cot`, exit 1. Khôi phục tệp (xóa dòng tiêm) → chạy lại → ĐẠT.

## 9. Phần chưa kiểm

Chưa test trình duyệt thật (không có yêu cầu trong đề): chưa mở trang mới trên browser, chưa chạy screen reader. Trang mới đi qua cùng template + bộ kiểm tự động như các trang EN hiện có; kiểm tương tác (bộ chuyển ngôn ngữ, Pagefind trên trang mới) để dành cho đợt nghiệm thu bằng trình duyệt nếu anh yêu cầu.

## 10. Trạng thái

- **Chưa commit, chưa push** — 19 tệp P36 (13 sửa + 6 tạo mới) đang chờ anh quyết định.
- `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` không nằm trong phạm vi liệt kê của Prompt 36 nên không đụng — số route English trong tài liệu đó sẽ lệch (37 → 40 thực tế) cho tới khi một gói sau cập nhật.
