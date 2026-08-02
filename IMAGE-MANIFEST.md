# IMAGE-MANIFEST — Danh mục ảnh cần chuẩn bị

> **Mục đích:** Tệp này liệt kê **toàn bộ ảnh** cần có cho website, kèm đường dẫn, kích thước, vị trí hiển thị.
> Khi bạn (anh Vinh) tải ảnh về, đặt đúng tên file vào đúng thư mục → ảnh tự hiển thị.
> Chưa có ảnh → website hiện placeholder gọn gàng (component `WatchImage`).
>
> **Quy ước đặt tên:** chữ thường, không dấu, đuôi `.jpg` (ảnh) hoặc `.png` (logo nền trong).
> **Kích thước khuyến nghị:** ngang tối thiểu 1200px, tỷ lệ 16:10 hoặc 4:3.
> **Nén ảnh:** dùng https://tinypng.com trước khi upload (< 300KB/ảnh).

---

## 1. Ảnh thương hiệu (Logo + Hero)

Đặt vào: `public/images/thuong-hieu/<slug>/`

| Thương hiệu | Logo (`logo.png`) | Hero (`hero.jpg`) | Ghi chú |
|-------------|-------------------|-------------------|---------|
| A. Lange & Söhne | `a-lange-soehne/logo.png` | `a-lange-soehne/hero.jpg` | Logo PNG nền trong |
| Audemars Piguet | `audemars-piguet/logo.png` | `audemars-piguet/hero.jpg` | |
| Blancpain | `blancpain/logo.png` | `blancpain/hero.jpg` | |
| Breguet | `breguet/logo.png` | `breguet/hero.jpg` | |
| Cartier | `cartier/logo.png` | `cartier/hero.jpg` | |
| F.P. Journe | `fp-journe/logo.png` | `fp-journe/hero.jpg` | |
| Frédérique Constant | `frederique-constant/logo.png` | `frederique-constant/hero.jpg` | |
| Glashütte Original | `glashuette-original/logo.png` | `glashuette-original/hero.jpg` | |
| Grand Seiko | `grand-seiko/logo.png` | `grand-seiko/hero.jpg` | |
| Greubel Forsey | `greubel-forsey/logo.png` | `greubel-forsey/hero.jpg` | |
| Hamilton | `hamilton/logo.png` | `hamilton/hero.jpg` | |
| IWC Schaffhausen | `iwc/logo.png` | `iwc/hero.jpg` | |
| Jaeger-LeCoultre | `jaeger-lecoultre/logo.png` | `jaeger-lecoultre/hero.jpg` | |
| Longines | `longines/logo.png` | `longines/hero.jpg` | |
| Omega | `omega/logo.png` | `omega/hero.jpg` | |
| Patek Philippe | `patek-philippe/logo.png` | `patek-philippe/hero.jpg` | |
| Philippe Dufour | `philippe-dufour/logo.png` | `philippe-dufour/hero.jpg` | |
| Rolex | `rolex/logo.png` | `rolex/hero.jpg` | |
| Seiko | `seiko/logo.png` | `seiko/hero.jpg` | |
| TAG Heuer | `tag-heuer/logo.png` | `tag-heuer/hero.jpg` | |
| Tudor | `tudor/logo.png` | `tudor/hero.jpg` | |
| Ulysse Nardin | `ulysse-nardin/logo.png` | `ulysse-nardin/hero.jpg` | |
| Vacheron Constantin | `vacheron-constantin/logo.png` | `vacheron-constantin/hero.jpg` | |
| Zenith | `zenith/logo.png` | `zenith/hero.jpg` | |

**Tổng:** 24 logo + 24 hero = **48 ảnh**

---

## 2. Ảnh mẫu iconic (Hero)

Đặt vào: `public/images/mau-iconic/<slug>/`

| Mẫu iconic | Hero (`hero.jpg`) | Ảnh chi tiết (tùy chọn) |
|------------|-------------------|--------------------------|
| Cartier Tank | `cartier-tank/hero.jpg` | `detail-1.jpg` (mặt số gần) |
| Fifty Fathoms | `fifty-fathoms/hero.jpg` | `detail-1.jpg` (bezel cong) |
| Freak | `freak/hero.jpg` | `detail-1.jpg` (movement lộ) |
| Grand Seiko Snowflake | `grand-seiko-snowflake/hero.jpg` | `detail-1.jpg` (mặt số texture) |
| IWC Mark XI | `iwc-mark-xi/hero.jpg` | |
| Lange 1 | `lange-1/hero.jpg` | `detail-1.jpg` (big date) |
| Monaco | `monaco/hero.jpg` | `detail-1.jpg` (vỏ vuông) |
| Omega Speedmaster | `omega-speedmaster/hero.jpg` | `detail-1.jpg` (3 mắt phụ) |
| Patek Nautilus | `patek-nautilus/hero.jpg` | `detail-1.jpg` (mặt số vân) |
| Reverso | `reverso/hero.jpg` | `detail-1.jpg` (mặt sau khắc) |
| Rolex Submariner | `rolex-submariner/hero.jpg` | `detail-1.jpg` (bezel + kim Mercedes) |
| Royal Oak | `royal-oak/hero.jpg` | `detail-1.jpg` (tapisserie mặt số) |
| Seiko 62MAS | `seiko-62mas/hero.jpg` | |
| Tudor Black Bay | `tudor-black-bay/hero.jpg` | `detail-1.jpg` (kim snowflake) |
| VC Overseas | `vc-overseas/hero.jpg` | `detail-1.jpg` (bezel Maltese) |
| Zenith El Primero | `zenith-el-primero/hero.jpg` | `detail-1.jpg` (3 màu mắt phụ) |

**Tổng:** 16 hero + ~12 detail = **~28 ảnh**

---

## 3. Ảnh Timeline lịch sử (Bước 1.1)

Đặt vào: `public/images/timeline/`

| Tên file | Nội dung ảnh cần tìm | Mốc lịch sử |
|----------|----------------------|-------------|
| `breguet-naples.jpg` | Breguet No. 2639 / Reine de Naples | 1810 — Đeo tay đầu tiên |
| `cartier-santos.jpg` | Cartier Santos đời đầu | 1904 — Đeo tay nam đầu tiên |
| `trench-watch.jpg` | Trench watch Thế chiến I | 1914–1918 |
| `rolex-oyster-1926.jpg` | Rolex Oyster đời đầu | 1926 — Chống nước đầu tiên |
| `jlc-reverso.jpg` | Jaeger-LeCoultre Reverso | 1931 — Mặt lật chơi polo |
| `iwc-pilot-1936.jpg` | IWC Special Pilot's Watch | 1936 — Pilot watch |
| `rolex-datejust.jpg` | Rolex Datejust | 1945 — Lịch ngày đầu tiên |
| `fifty-fathoms.jpg` | Blancpain Fifty Fathoms đời đầu | 1953 — Diver hiện đại đầu tiên |
| `rolex-submariner.jpg` | Rolex Submariner đời đầu | 1953–54 |
| `rolex-gmt.jpg` | Rolex GMT-Master (bezel Pepsi) | 1954 — GMT cho phi công |
| `omega-speedmaster.jpg` | Omega Speedmaster Professional | 1957 — Moonwatch |
| `heuer-carrera.jpg` | Heuer Carrera 1963 | 1963 — Chronograph đua xe |
| `zenith-el-primero.jpg` | Zenith El Primero A386 | 1969 — Chronograph tự động |
| `seiko-astron.jpg` | Seiko Quartz Astron 1969 | 1969 — Khủng hoảng Quartz |
| `ap-royal-oak.jpg` | AP Royal Oak "Jumbo" | 1972 — Thép sang trọng |
| `patek-nautilus.jpg` | Patek Nautilus 3700/5711 | 1976 — Sport-luxury |
| `swatch-1983.jpg` | Swatch thế hệ đầu 1983 | 1983 — Cứu ngành Thụy Sĩ |
| `omega-coaxial.jpg` | Bộ máy Omega Co-Axial | 1999 — Bộ thoát mới |
| `un-freak.jpg` | Ulysse Nardin Freak | 2001 — Kỷ nguyên silicon |
| `silicon-hairspring.jpg` | Dây tóc silicon (macro) | 2013+ — Phổ cập silicon |

**Tổng:** 20 ảnh (8 mốc còn lại dùng SVG/biểu tượng)

---

## TỔNG KẾT

| Nhóm | Số ảnh |
|------|--------|
| Logo thương hiệu | 24 |
| Hero thương hiệu | 24 |
| Hero mẫu iconic | 16 |
| Detail iconic (tùy chọn) | ~12 |
| Timeline | 20 |
| **Tổng** | **~96 ảnh** |

---

## Checklist khi thêm ảnh

- [ ] Tôi có **quyền sử dụng** ảnh (từ Press hãng / tự chụp / CC / free).
- [ ] Tôi đã **ghi nguồn** trong bài (nếu giấy phép yêu cầu).
- [ ] Ảnh đã **nén** (< 300KB) qua tinypng.com.
- [ ] Tên file: **chữ thường, không dấu, .jpg/.png**.
- [ ] Đặt đúng **thư mục** theo bảng trên.

> **Lưu ý bản quyền:** Logo là nhãn hiệu đã đăng ký — dùng để nhận diện khi giới thiệu thương hiệu (fair use). Ảnh sản phẩm từ trang hãng cần kiểm tra điều khoản Press/Media. Ảnh tự chụp = an toàn tuyệt đối.
