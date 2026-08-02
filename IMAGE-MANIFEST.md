# IMAGE-MANIFEST.md — Bảng tổng hợp ảnh toàn site

**Cập nhật lần cuối:** 2026-08-02
**Ảnh thật hiện có trong `/public/images/`:** 0 file (toàn bộ đang placeholder).

Bảng liệt kê **mọi vị trí cần ảnh** trên website, kèm trạng thái render thực tế.
Cột "Đã có chỗ hiển thị" rất quan trọng — nhiều vị trí frontmatter có sẵn nhưng **giao diện chưa render**, nên bỏ ảnh vào cũng không hiện (cần dựng giao diện trước).

**Chú thích cột:**
- **Đường dẫn file** — vị trí ảnh nên nằm trong `/public/images/...`
- **Đối tượng** — thương hiệu/mẫu/mốc tương ứng
- **Kích thước đề nghị** — tỷ lệ khung hình (dùng cho `cover` / `object-fit`)
- **Trang hiển thị** — URL nơi ảnh sẽ xuất hiện
- **Trạng thái ảnh** — `chưa có` (placeholder) / `đã có`
- **Đã có chỗ hiển thị** — `CÓ` (giao diện render sẵn, chỉ cần điền đường dẫn vào frontmatter) / `CHƯA` (phải dựng giao diện trước)

---

## A. ẢNH ĐANG PLACEHOLDER + ĐÃ CÓ CHỖ HIỂN THỊ (chỉ cần bỏ ảnh vào)

| Đường dẫn file | Đối tượng | Kích thước | Trang hiển thị | Ảnh | Chỗ hiển thị |
|---|---|---|---|---|---|
| `/images/mau-iconic/cartier-tank.jpg` | Cartier Tank | 4/3 | `/mau-iconic/cartier-tank` | chưa có | ✅ CÓ |
| `/images/mau-iconic/fifty-fathoms.jpg` | Blancpain Fifty Fathoms | 4/3 | `/mau-iconic/fifty-fathoms` | chưa có | ✅ CÓ |
| `/images/mau-iconic/freak.jpg` | Ulysse Nardin Freak | 4/3 | `/mau-iconic/freak` | chưa có | ✅ CÓ |
| `/images/mau-iconic/grand-seiko-snowflake.jpg` | Grand Seiko Snowflake | 4/3 | `/mau-iconic/grand-seiko-snowflake` | chưa có | ✅ CÓ |
| `/images/mau-iconic/iwc-mark-xi.jpg` | IWC Mark XI | 4/3 | `/mau-iconic/iwc-mark-xi` | chưa có | ✅ CÓ |
| `/images/mau-iconic/lange-1.jpg` | A. Lange & Söhne LANGE 1 | 4/3 | `/mau-iconic/lange-1` | chưa có | ✅ CÓ |
| `/images/mau-iconic/monaco.jpg` | TAG Heuer Monaco | 4/3 | `/mau-iconic/monaco` | chưa có | ✅ CÓ |
| `/images/mau-iconic/omega-speedmaster.jpg` | Omega Speedmaster | 4/3 | `/mau-iconic/omega-speedmaster` | chưa có | ✅ CÓ |
| `/images/mau-iconic/patek-nautilus.jpg` | Patek Philippe Nautilus | 4/3 | `/mau-iconic/patek-nautilus` | chưa có | ✅ CÓ |
| `/images/mau-iconic/reverso.jpg` | Jaeger-LeCoultre Reverso | 4/3 | `/mau-iconic/reverso` | chưa có | ✅ CÓ |
| `/images/mau-iconic/rolex-submariner.jpg` | Rolex Submariner | 4/3 | `/mau-iconic/rolex-submariner` | chưa có | ✅ CÓ |
| `/images/mau-iconic/royal-oak.jpg` | Audemars Piguet Royal Oak | 4/3 | `/mau-iconic/royal-oak` | chưa có | ✅ CÓ |
| `/images/mau-iconic/seiko-62mas.jpg` | Seiko 62MAS | 4/3 | `/mau-iconic/seiko-62mas` | chưa có | ✅ CÓ |
| `/images/mau-iconic/tudor-black-bay.jpg` | Tudor Black Bay | 4/3 | `/mau-iconic/tudor-black-bay` | chưa có | ✅ CÓ |
| `/images/mau-iconic/vc-overseas.jpg` | Vacheron Constantin Overseas | 4/3 | `/mau-iconic/vc-overseas` | chưa có | ✅ CÓ |
| `/images/mau-iconic/zenith-el-primero.jpg` | Zenith El Primero | 4/3 | `/mau-iconic/zenith-el-primero` | chưa có | ✅ CÓ |
| `/images/timeline/peter-henlein.jpg` | Mốc ~1510 Peter Henlein | 4/3 | `/lich-su` | chưa có | ✅ CÓ |
| `/images/timeline/huygens-hairspring.jpg` | Mốc 1657–1675 Huygens | 4/3 | `/lich-su` | chưa có | ✅ CÓ |
| `/images/timeline/blancpain.jpg` | Mốc 1735 Blancpain | 4/3 | `/lich-su` | chưa có | ✅ CÓ |
| `/images/timeline/vacheron.jpg` | Mốc 1755 Vacheron | 4/3 | `/lich-su` | chưa có | ✅ CÓ |
| `/images/timeline/...` (28 mốc) | 28 mốc lịch sử | 4/3 | `/lich-su` | chưa có | ✅ CÓ |
| `/images/huong-dan/chon-dong-ho-dau-tien.jpg` | HD Chọn đồng hồ đầu tiên | 16/10 | `/huong-dan/chon-dong-ho-dau-tien` | chưa có | ✅ CÓ |
| `/images/huong-dan/len-day-dong-ho.jpg` | HD Lên dây | 16/10 | `/huong-dan/len-day-dong-ho` | chưa có | ✅ CÓ |
| `/images/huong-dan/bao-duong-dong-ho.jpg` | HD Bảo dưỡng | 16/10 | `/huong-dan/bao-duong-dong-ho` | chưa có | ✅ CÓ |
| `/images/huong-dan/do-sai-so.jpg` | HD Đo sai số | 16/10 | `/huong-dan/do-sai-so` | chưa có | ✅ CÓ |
| `/images/co-che/bo-thoat.jpg` | Bộ thoát | 16/10 | `/co-che/bo-thoat` | chưa có | ✅ CÓ |
| `/images/co-che/tru-cot.jpg` | Trữ cót | 16/10 | `/co-che/tru-cot` | chưa có | ✅ CÓ |
| `/images/co-che/chong-nuoc.jpg` | Chống nước | 16/10 | `/co-che/chong-nuoc` | chưa có | ✅ CÓ |
| `/images/co-che/chong-tu.jpg` | Chống từ | 16/10 | `/co-che/chong-tu` | chưa có | ✅ CÓ |
| `/images/co-che/chuyen-dong-co.jpg` | Chuỗi truyền động | 16/10 | `/co-che/chuyen-dong-co` | chưa có | ✅ CÓ |
| `/images/co-che/len-day-tu-dong.jpg` | Lên dây tự động | 16/10 | `/co-che/len-day-tu-dong` | chưa có | ✅ CÓ |

*(Danh sách 28 mốc timeline đầy đủ: peter-henlein, huygens-hairspring, blancpain, vacheron, breguet-tourbillon, lever-escapement, mudge, breguet-kim, sotheby, permis, henlein-repetition, lange, waltham, wristlet-ww1, rolex-oyster, rolex-perpetual, rolex-datejust, blancpain-fifty-fathoms, rolex-explorer-sub, rolex-gmt, omega-speedmaster, heuer-carrera, monaco, quartz-crisis, ap-royal-oak, patek-nautilus, swatch, co-axial, silicon-freak, spring-drive — đặt tên tệp theo trường `slug` trong `timeline.json`.)*

---

## B. ẢNH THƯƠNG HIỆU — ĐÃ CÓ CHỖ HIỂN THỊ (cần điền frontmatter)

Giao diện đã render sẵn cả logo (Card + BrandLayout) và hero (BrandLayout). Chỉ cần:
1. Bỏ file ảnh vào đúng đường dẫn.
2. Điền `logo:` và `cover_image:` trong frontmatter mỗi brand.

| Đường dẫn file | Đối tượng | Kích thước | Trang hiển thị | Ảnh | Chỗ hiển thị |
|---|---|---|---|---|---|
| `/images/thuong-hieu/hero/a-lange-soehne.jpg` | A. Lange & Söhne hero | 16/9 | `/thuong-hieu/a-lange-soehne` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/audemars-piguet.jpg` | Audemars Piguet hero | 16/9 | `/thuong-hieu/audemars-piguet` | chưa có | ✅ CÓ |
| `/images/thuong-hieu/hero/blancpain.jpg` | Blancpain hero | 16/9 | `/thuong-hieu/blancpain` | chưa có | ✅ CÓ |
| `/images/thuong-hieu/hero/breguet.jpg` | Breguet hero | 16/9 | `/thuong-hieu/breguet` | chưa có | ✅ CÓ |
| `/images/thuong-hieu/hero/cartier.jpg` | Cartier hero | 16/9 | `/thuong-hieu/cartier` | chưa có | ✅ CÓ |
| `/images/thuong-hieu/hero/fp-journe.jpg` | F.P. Journe hero | 16/9 | `/thuong-hieu/fp-journe` | chưa có | ✅ CÓ |
| `/images/thuong-hieu/hero/frederique-constant.jpg` | Frédérique Constant hero | 16/9 | `/thuong-hieu/frederique-constant` | chưa có | ✅ CÓ |
| `/images/thuong-hieu/hero/glashuette-original.jpg` | Glashütte Original hero | 16/9 | `/thuong-hieu/glashuette-original` | chưa có | ✅ CÓ |
| `/images/thuong-hieu/hero/grand-seiko.jpg` | Grand Seiko hero | 16/9 | `/thuong-hieu/grand-seiko` | chưa có | ✅ CÓ |
| `/images/thuong-hieu/hero/greubel-forsey.jpg` | Greubel Forsey hero | 16/9 | `/thuong-hieu/greubel-forsey` | chưa có | ✅ CÓ |
| `/images/thuong-hieu/hero/hamilton.jpg` | Hamilton hero | 16/9 | `/thuong-hieu/hamilton` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/iwc.jpg` | IWC Schaffhausen hero | 16/9 | `/thuong-hieu/iwc` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/jaeger-lecoultre.jpg` | Jaeger-LeCoultre hero | 16/9 | `/thuong-hieu/jaeger-lecoultre` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/longines.jpg` | Longines hero | 16/9 | `/thuong-hieu/longines` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/omega.jpg` | Omega hero | 16/9 | `/thuong-hieu/omega` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/patek-philippe.jpg` | Patek Philippe hero | 16/9 | `/thuong-hieu/patek-philippe` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/philippe-dufour.jpg` | Philippe Dufour hero | 16/9 | `/thuong-hieu/philippe-dufour` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/rolex.jpg` | Rolex hero | 16/9 | `/thuong-hieu/rolex` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/seiko.jpg` | Seiko hero | 16/9 | `/thuong-hieu/seiko` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/tag-heuer.jpg` | TAG Heuer hero | 16/9 | `/thuong-hieu/tag-heuer` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/tudor.jpg` | Tudor hero | 16/9 | `/thuong-hieu/tudor` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/ulysse-nardin.jpg` | Ulysse Nardin hero | 16/9 | `/thuong-hieu/ulysse-nardin` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/vacheron-constantin.jpg` | Vacheron Constantin hero | 16/9 | `/thuong-hieu/vacheron-constantin` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/hero/zenith.jpg` | Zenith hero | 16/9 | `/thuong-hieu/zenith` | chưa có | ✅ CÓ (BrandLayout hero) |
| `/images/thuong-hieu/logos/a-lange-soehne.png` | A. Lange & Söhne logo | 1/1 | `/thuong-hieu` + `/` + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/audemars-piguet.png` | Audemars Piguet logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/blancpain.png` | Blancpain logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/breguet.png` | Breguet logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/cartier.png` | Cartier logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/fp-journe.png` | F.P. Journe logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/frederique-constant.png` | Frédérique Constant logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/glashuette-original.png` | Glashütte Original logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/grand-seiko.png` | Grand Seiko logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/greubel-forsey.png` | Greubel Forsey logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/hamilton.png` | Hamilton logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/iwc.png` | IWC Schaffhausen logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/jaeger-lecoultre.png` | Jaeger-LeCoultre logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/longines.png` | Longines logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/omega.png` | Omega logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/patek-philippe.png` | Patek Philippe logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/philippe-dufour.png` | Philippe Dufour logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/rolex.png` | Rolex logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/seiko.png` | Seiko logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/tag-heuer.png` | TAG Heuer logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/tudor.png` | Tudor logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/ulysse-nardin.png` | Ulysse Nardin logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/vacheron-constantin.png` | Vacheron Constantin logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |
| `/images/thuong-hieu/logos/zenith.png` | Zenith logo | 1/1 | /thuong-hieu + / + trang chi tiết | chưa có | ✅ CÓ (Card + BrandLayout) |

---

## C. TÓM TẮT & ƯU TIÊN

**Tổng vị trí cần ảnh:** ~93 (31 nhóm A có chỗ render + 24 logo + 24 hero + các mốc timeline).

**Ưu tiên 1 — Bỏ ảnh là hiện ngay (nhóm A):**
- 16 ảnh mẫu iconic (cover_image) → điền vào frontmatter `cover_image:` của từng bài.
- 28 ảnh mốc timeline → bỏ vào `/public/images/timeline/<slug>.jpg` (WatchImage tự nhận).
- 4 ảnh hướng dẫn + 6 ảnh cơ chế → điền `cover_image` trong frontmatter.

**Ưu tiên 2 — Cần điền frontmatter (logo + hero thương hiệu):**
- 24 logo → bỏ file vào `/public/images/thuong-hieu/logos/`, điền `logo:` trong frontmatter. Card (trang danh sách + trang chủ) và BrandLayout (trang chi tiết) đều đã render sẵn.
- 24 ảnh hero → bỏ file vào `/public/images/thuong-hieu/hero/`, điền `cover_image:` trong frontmatter. BrandLayout đã render hero qua WatchImage (tự placeholder khi chưa có ảnh).

---

## D. NGUỒN ẢNH HỢP PHÁP

- **Press/Media page** của hãng (Rolex.com/press, Omega.com, Patek.com/service/media) — cấp quyền cho báo chí.
- **Tự chụp** đồng hồ thật (an toàn nhất, không lo bản quyền).
- **CC-licensed** (Flickr Creative Commons, Wikimedia Commons).
- **Free stock** (Unsplash, Pexels) — chất lượng đồng hồ cơ hạn chế.
- **Không** auto-tải từ brand website bằng bot — vi phạm bản quyền.
- **Logo** là trademark — chỉ dùng fair-use cho nhận diện (nhỏ, cạnh tên hãng).
