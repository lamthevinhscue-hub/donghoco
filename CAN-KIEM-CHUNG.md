# CAN-KIEM-CHUNG.md — Tracker kiểm chứng số liệu nội dung

Tracker các con số/ghi nhận trong nội dung từng được ghi lại để kiểm chứng. Mỗi mục nội dung mang **một trong ba trạng thái xử lý**; ngoài ra một **cờ ưu tiên** có thể gắn vào một dữ kiện hoặc liên kết cụ thể **bên trong** một mục khi chi tiết đó còn hiển thị trên trang và có nguy cơ sai. Nguồn, ngày tháng và lịch sử xử lý của mọi mục giữ nguyên. Tài liệu này được rà lại và thống nhất ngày 30/08/2026 (commit `25b5df3`); **rà bổ sung ngày 01/09/2026** (xử lý ba liên kết nguồn chết — phần cờ ưu tiên gỡ hết; xem bảng lịch sử xử lý ở Bảng tổng hợp; mã commit của đợt này chưa có vì chưa commit).

---

## BẢNG TỔNG HỢP TRẠNG THÁI (rà 30/08/2026; rà bổ sung 01/09/2026)

### Ý nghĩa: ba trạng thái xử lý + một cờ ưu tiên

| Loại | Tên | Ý nghĩa |
|---|---|---|
| Trạng thái xử lý (cấp mục) | `ĐÃ GIẢI QUYẾT` | Đã kiểm chứng được, dữ liệu đúng đã lên trang. |
| Trạng thái xử lý (cấp mục) | `ĐÃ XỬ LÝ AN TOÀN` | Chi tiết chưa chắc chắn **đã bị ẩn hoặc đã bỏ khỏi phần hiển thị** (hoặc diễn đạt lại an toàn không kèm con số). Phần lớn mục này vẫn chờ nguồn để sau này bổ sung dữ liệu đầy đủ hơn. |
| Trạng thái xử lý (cấp mục) | `CHỜ NGUỒN` | Chưa có nguồn nhưng **không gây sai cho nội dung đang hiển thị** (ví dụ: trường thông số để trống, bảng tự ẩn dòng trống). |
| Cờ ưu tiên (gắn vào dữ kiện/liên kết bên trong mục) | `CẦN ƯU TIÊN KIỂM CHỨNG` | Chi tiết đó **còn hiển thị trên trang** và có nguy cơ sai hoặc hỏng — hiện tại: các liên kết nguồn đã chết đang hiện trong khối "Nguồn tham khảo". Một mục giữ nguyên trạng thái xử lý của nó; cờ chỉ gắn cho chi tiết bên trong. |

Ghi chú tương thích tên cũ: các mục ghi `ĐÃ XỬ LÝ BẰNG CÁCH GỠ KHỎI HIỂN THỊ` tương ứng trạng thái xử lý `ĐÃ XỬ LÝ AN TOÀN`; các mục ghi `VẪN TREO` đã được rà lại và xếp vào `ĐÃ XỬ LÝ AN TOÀN` hoặc `CHỜ NGUỒN` theo bản chất từng mục — dòng "VẪN TREO (ngày...)" giữ nguyên trong từng mục như một phần lịch sử.

### Số lượng sau khi rà

**48 mục nội dung** được phân loại theo ba trạng thái xử lý:

| Trạng thái xử lý | Số mục | Các mục |
|---|---:|---|
| ĐÃ GIẢI QUYẾT | **15** | 1, 8, 9, 10, 12, 13, 14, 16, 19, 20, 23, 40, 48, 49, 50 |
| ĐÃ XỬ LÝ AN TOÀN | **30** | 2, 3, 4, 5, 6, 7, 11, 15, 17, 18, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 41, 42, 43, 45, 47 |
| CHỜ NGUỒN | **3** | 22, 44, 46 |

**2 mục không thuộc nhóm nội dung cần phân loại:** mục 21 (dự phòng, trống) và mục 24 (giới hạn vận hành Formspree — ghi chú vận hành, không phải số liệu nội dung).

**Lịch sử: 3 liên kết từng mang cờ `CẦN ƯU TIÊN KIỂM CHỨNG`** — đây là **cờ `CẦN ƯU TIÊN KIỂM CHỨNG` từng gắn vào từng liên kết bên trong** các mục 23, 39 và 40 (không tính như ba mục độc lập; trạng thái xử lý của ba mục này không đổi). **Cả ba liên kết đã được thay bằng URL chính hãng hoạt động ngày 01/09/2026 và cờ ưu tiên đã gỡ — hiện tại không còn liên kết nguồn chết nào trong ba trường hợp đã biết đang được xuất bản:**

| Trang bị ảnh hưởng | URL 404 cũ (lịch sử phát hiện, giữ nguyên) | URL chính hãng mới (đã thay ngày 01/09/2026) | Ngày xử lý | Kết luận |
|---|---|---|---|---|
| `patek-philippe` và `patek-nautilus` (mục 23) | `https://www.patek.com/en/company/history` | `https://www.patek.com/en/manufacture/a-story-of-independence/anchored-in-geneva-and-switzerland` | 01/09/2026 | Đã gỡ cờ `CẦN ƯU TIÊN KIỂM CHỨNG` |
| `chronometer`, `metas`, `vph` (từ điển) và `do-sai-so` (hướng dẫn) — 4 trang (mục 40) | `https://www.cosc.swiss/chronometer-certified` | `https://www.cosc.swiss/certified-chronometer` | 01/09/2026 | Đã gỡ cờ `CẦN ƯU TIÊN KIỂM CHỨNG` |
| `hajime-asaoka` (mục 39) | `https://kuronotokyo.com/pages/5th-anniversary` | `https://kuronotokyo.com/pages/2024-anniversary-reiwa` | 01/09/2026 | Đã gỡ cờ `CẦN ƯU TIÊN KIỂM CHỨNG` |

Lịch sử phát hiện từng ghi theo dạng danh sách ba liên kết (trước 01/09/2026) được giữ lại trong từng mục 23, 39, 40 bên dưới; **bổ sung 01/09/2026: sau lần rà toàn bộ `src/content/`, phát hiện URL Patek cũ cũng xuất hiện ở bài `patek-nautilus.md` (mẫu iconic) — đã thay cùng ngày bằng URL chính hãng mới, do đó URL Patek cũ hiện không còn ở bất kỳ bài xuất bản nào trong `src/content/`; ba URL cũ chỉ còn trong hồ sơ này và biên bản nghiệm thu với vai trò lịch sử.**

Ngoài ba liên kết trên, **chưa xác định được chi tiết nào khác đủ điều kiện gắn cờ `CẦN ƯU TIÊN KIỂM CHỨNG`** — các mục còn lại đều đã ẩn, đã bỏ hoặc diễn đạt an toàn; không tự đoán thêm. *(Đoạn này xét các mục 1–50 — ba mục 48–50 đã được diễn đạt lại an toàn ngày 30/08/2026, xem ghi chú dưới.)*

**Bổ sung 30/08/2026 (hồ sơ dữ liệu Submariner):** hồ sơ nghiên cứu `docs/ho-so-du-lieu-tien-hoa-rolex-submariner.md` (cùng ngày) đối chiếu bài `src/content/mauIconic/vi/rolex-submariner.md` đang xuất bản với nguồn và phát hiện **3 dữ kiện vẫn hiển thị trên trang** chưa kiểm chứng được hoặc có nguồn mâu thuẫn — ghi vào ba mục mới 48, 49, 50 (lúc đó mang cờ `CẦN ƯU TIÊN KIỂM CHỨNG`, chưa tính vào bảng số lượng). **Cùng ngày 30/08/2026, cả ba mục đã ĐÃ GIẢI QUYẾT:** bài được diễn đạt lại theo nguồn, frontmatter bổ sung 3 nguồn tham khảo (Hodinkee Reference Points, Monochrome Part 1, Part 2) kèm `updated: "2026-08-30"`. Ba mục nay được tính vào bảng số lượng ở trên; cờ `CẦN ƯU TIÊN KIỂM CHỨNG` đã gỡ khỏi ba mục này. **Cập nhật 01/09/2026: ba liên kết nguồn chết (Patek Philippe, COSC, Kurono Tokyo) trước đó từng ghi là "chưa xử lý" đã được thay bằng URL chính hãng hoạt động và cờ ưu tiên đã gỡ hết — hiện không còn cờ ưu tiên mở nào trong toàn tracker.**

---

## 1. Năm đăng ký logo Longines — ĐÃ GIẢI QUYẾT

- **Vị trí:** `src/content/thuongHieu/vi/longines.md`
- **Trạng thái:** ĐÃ GIẢI QUYẾT (đợt 4, 03/08/2026).
- **Kết luận kiểm chứng:** 1867 là năm xây nhà máy, 1889 là năm đăng ký tên và logo — cả hai đều đúng, chỉ là hai sự kiện khác nhau.
- **Hành động đã làm:** khôi phục con số 1889 cho logo (giữ 1867 cho nhà máy). Trên trang ghi rõ logo đăng ký năm 1889.

---

## 2. Calibre Breguet 581, 777, 5335

- **Vị trí:** `src/content/thuongHieu/vi/breguet.md` — frontmatter `signature_calibres`
- **Tình trạng:** đang có sẵn từ phiên bản cũ. Không đối chiếu được với nguồn chính hãng.
- **Hành động tạm:** giữ nguyên như hiện trạng, không thêm calibre mới.
- **Trạng thái:** ĐÃ XỬ LÝ BẰNG CÁCH GỠ KHỎI HIỂN THỊ (08/08/2026). Slug `breguet` không nằm trong danh sách `CALIBRE_DISPLAY_SLUGS` (xem `src/i18n/ui.ts`) nên khối "Bộ máy in-house tiêu biểu" không hiện trên trang. Frontmatter vẫn giữ nguyên để sau này kiểm chứng được thì thêm slug vào danh sách là hiện lại.

---

## 3. Calibre Zenith Elite 670, El Primero 21

- **Vị trí:** `src/content/thuongHieu/vi/zenith.md` — frontmatter `signature_calibres`
- **Tình trạng:** đang có sẵn từ phiên bản cũ. Riêng El Primero 3600 đã kiểm chứng đầy đủ.
- **Hành động tạm:** giữ nguyên, không thêm calibre mới.
- **Trạng thái:** ĐÃ XỬ LÝ BẰNG CÁCH GỠ KHỎI HIỂN THỊ (08/08/2026). Slug `zenith` không nằm trong danh sách `CALIBRE_DISPLAY_SLUGS`. Frontmatter vẫn giữ nguyên để sau này kiểm chứng được thì hiện lại.

---

## 4. Calibre Glashütte Original 37, 90, 100

- **Vị trí:** `src/content/thuongHieu/vi/glashuette-original.md` — frontmatter `signature_calibres`
- **Tình trạng:** đang có sẵn từ phiên bản cũ. Riêng Calibre 36 và 36-13 đã kiểm chứng.
- **Hành động tạm:** giữ nguyên, không thêm calibre mới.
- **Trạng thái:** ĐÃ XỬ LÝ BẰNG CÁCH GỠ KHỎI HIỂN THỊ (08/08/2026). Slug `glashuette-original` không nằm trong danh sách `CALIBRE_DISPLAY_SLUGS`. Frontmatter vẫn giữ nguyên để sau này kiểm chứng được thì hiện lại.

---

## 5. Năm phát minh Breguet: lò xo chuông (gong spring), pare-chute, dây tóc đầu cong (overcoil)

- **Vị trí:** `src/content/thuongHieu/vi/breguet.md` — phần Triết lý/Những phát minh
- **Tình trạng:** ba phát minh có thật và quan trọng, nhưng năm chính xác không xác nhận được.
- **Hành động tạm:** nhắc tên **không kèm năm**. Không đưa vào bảng dòng chảy lịch sử (bảng bắt buộc phải có năm).
- **Trạng thái:** VẪN TREO (08/08/2026). Giữ nguyên cách viết hiện tại — nhắc tên ba phát minh không kèm năm.

---

## 6. Calibre F.P. Journe 1508

- **Vị trí:** `src/content/thuongHieu/vi/fp-journe.md` — frontmatter `signature_calibres`
- **Tình trạng:** Xác nhận được 1304 (Chronomètre Bleu) và 1499 (Résonance Souveraine). Riêng 1508 không đối chiếu được nguồn chính hãng.
- **Hành động tạm:** giữ nguyên frontmatter, không thêm không bớt.
- **Trạng thái:** ĐÃ XỬ LÝ BẰNG CÁCH GỠ KHỎI HIỂN THỊ (08/08/2026). Slug `fp-journe` không nằm trong danh sách `CALIBRE_DISPLAY_SLUGS`. Frontmatter vẫn giữ nguyên để sau này kiểm chứng được thì hiện lại.

---

## 7. Calibre Greubel Forsey GF01, 760, 960

- **Vị trí:** `src/content/thuongHieu/vi/greubel-forsey.md` — frontmatter `signature_calibres`
- **Tình trạng:** Không đối chiếu được với nguồn chính hãng.
- **Hành động tạm:** giữ nguyên frontmatter, không thêm không bớt.
- **Trạng thái:** ĐÃ XỬ LÝ BẰNG CÁCH GỠ KHỎI HIỂN THỊ (08/08/2026). Slug `greubel-forsey` không nằm trong danh sách `CALIBRE_DISPLAY_SLUGS`. Frontmatter vẫn giữ nguyên để sau này kiểm chứng được thì hiện lại.

---

## 8. Calibre Seiko NH/N4, 6R, 8L

- **Vị trí:** `src/content/thuongHieu/vi/seiko.md` — frontmatter `signature_calibres`
- **Tình trạng:** đang có sẵn từ phiên bản cũ. Không đối chiếu được với nguồn chính hãng.
- **Hành động tạm:** giữ nguyên frontmatter, không thêm không bớt.
- **Trạng thái:** ĐÃ GIẢI QUYẾT (08/08/2026). Kiểm chứng được ba calibre tiêu biểu và đã ghi thông số lên trang: **6R35** (sai số trừ 15 tới cộng 25 giây/ngày, trữ cót 70 giờ), **8L35** (sai số trừ 10 tới cộng 15 giây/ngày, trữ cót khoảng 50 giờ, 28.800 nhịp/giờ), **NH35** (21.600 nhịp/giờ, trữ cót 41 giờ, sai số trừ 20 tới cộng 40 giây/ngày).

---

## 9. Mốc Tudor 2015 — bộ máy in-house đầu tiên

- **Vị trí:** `src/content/thuongHieu/vi/tudor.md`
- **Tình trạng:** không xác nhận được mốc 2015. Mốc kiểm chứng được là **2016** (lập Kenissi và ra mắt MT5602).
- **Hành động tạm:** dùng mốc 2016. Ghi mục 2015 vào đây để anh Vinh rà.
- **Trạng thái:** ĐÃ GIẢI QUYẾT (rà lại 30/08/2026). Bài đã dùng mốc 2016 kiểm chứng được; mốc 2015 sai không còn xuất hiện trên trang.

---

## 10. Calibre IWC 52000, 89000, 32110, 52615

- **Vị trí:** `src/content/thuongHieu/vi/iwc.md` — frontmatter `signature_calibres`
- **Tình trạng:** chỉ xác nhận được hãng tự sản xuất bộ máy tại Schaffhausen và theo đuổi trữ cót nhiều ngày. Các mã cụ thể (52000, 89000, 32110) không đối chiếu được với nguồn chính hãng. Riêng **52615** đã bị bỏ khỏi phần chữ (không xác nhận).
- **Hành động tạm:** giữ nguyên frontmatter, không thêm không bớt.
- **Trạng thái:** ĐÃ GIẢI QUYẾT (08/08/2026). Mã `89000` sai — sửa thành **`89361`** trong `signature_calibres`. Kiểm chứng được ba họ và đã ghi thông số: **52000** (ra mắt 2015, tự động, hai thùng cót, 168 giờ/7 ngày, 4 Hz tức 28.800 nhịp/giờ, lên dây Pellaton, vấu lên dây + bánh xe tự động gốm đen, ổ trục rotor gốm trắng); **32000** (72 giờ, bánh thoát + ngựa silicon); **89361** (chronograph, 68 giờ, flyback, gộp bộ đếm giờ+phút ở 12 giờ). Mã 52615 vẫn không xác nhận — không đưa vào bài.

---

## 11. Các mốc IWC: 1936, 1939 (Portugieser), 1955 (Ingenieur), 1967 (Aquatimer), 1969 và 1985 (Da Vinci), 2002 (Big Pilot) — MỘT PHẦN ĐÃ GIẢI QUYẾT

- **Vị trí:** `src/content/thuongHieu/vi/iwc.md`
- **Đã giải quyết (đợt bổ sung lịch sử, 04/08/2026):** 1936, 1939, 1955, 1967, 1985 đều xác nhận được và đã đưa vào bảng lịch sử.
- **Vẫn chưa xác nhận:** mốc **1969** (Da Vinci) và **2002** (Big Pilot hiện đại). Không đưa hai mốc này vào bảng lịch sử.

---

## 12. Calibre Grand Seiko 9F (10 giây/năm) và 9RA2 (10 giây/tháng)

- **Vị trí:** `src/content/thuongHieu/vi/grand-seiko.md` (9F) và bảng đối chiếu của trang Rolex/Omega
- **Tình trạng:** chỉ xác nhận được calibre 9R65: trữ cót 72 giờ, sai số khoảng 1 giây mỗi ngày. Các thông số 9F (10 giây mỗi năm) và 9RA2 (10 giây mỗi tháng) không đối chiếu lại được.
- **Hành động tạm:** giữ nguyên hiện trạng ở các trang đã có, không thêm mới.
- **Trạng thái:** ĐÃ GIẢI QUYẾT (08/08/2026). Cả hai đều đúng và đã bổ sung chi tiết: **9F quartz** ra đời 1993, sai số cộng trừ 10 giây/năm, có cơ cấu khử rơ, đổi ngày tức thời, hệ xung kép, thạch anh ủ và tuyển chọn. **Mã đúng là 9RA5** (không phải 9RA2) — sai số cộng trừ 10 giây/tháng (≈0,5 giây/ngày), trữ cót 120 giờ/5 ngày. Đã sửa `9RA2 → 9RA5` trong `rolex.md`. **9R65** cũng xác nhận: cộng trừ 15 giây/tháng, trữ cót 72 giờ.

---

## 13. Chuẩn nội bộ Grand Seiko: cộng 5 trừ 3 giây mỗi ngày

- **Vị trí:** `src/content/thuongHieu/vi/grand-seiko.md`
- **Tình trạng:** trang cũ từng ghi, đợt 5 đã viết lại thành "chuẩn nội bộ riêng của Grand Seiko" không kèm con số. Con số +5/-3 giây/ngày không đối chiếu lại được.
- **Hành động tạm:** giữ nguyên cách viết mới (không kèm con số).
- **Trạng thái:** ĐÃ GIẢI QUYẾT (08/08/2026). Vẫn giữ nguyên cách viết "chuẩn nội bộ riêng" không kèm con số cụ thể +5/-3 (số này chưa đối chiếu lại được). Đã bổ sung các thông số kiểm chứng được của 9F/9RA5/9R65 vào mục calibre — đó là nguồn thông tin chính xác thay thế.

---

## 14. Calibre Cartier 1904 MC, 9907 MC, 430 MC

- **Vị trí:** `src/content/thuongHieu/vi/cartier.md` — frontmatter `signature_calibres`
- **Tình trạng:** đang có sẵn từ phiên bản cũ. Không đối chiếu được với nguồn chính hãng. Riêng **9912/9915** đã bị bỏ khỏi phần chữ (không có trong frontmatter, mâu thuẫn nội bộ).
- **Hành động tạm:** giữ nguyên frontmatter, không thêm không bớt.
- **Trạng thái:** ĐÃ GIẢI QUYẾT (08/08/2026). Phát hiện và sửa một lỗi: **`430 MC` không phải bộ máy Cartier tự phát triển** — đây là bản mang tên Cartier của **Piaget 430P** (siêu mỏng, lên dây tay, 1996), cùng tập đoàn Richemont. Đã viết lại phần calibre cho đúng: Cartier dùng cả bộ máy tự phát triển lẫn bộ máy từ hãng cùng tập đoàn. Bổ sung thông số **1904-PS MC** (tự động, 25,6mm, dày 4mm, 27 chân kính, 186 chi tiết, hai thùng cót, 28.800 nhịp/giờ, trữ cót 48 giờ). Mã `9907 MC` chưa kiểm chứng thêm — chưa ghi thông số riêng.

---

## 15. Năm 1974 SSIH mua lại Hamilton

- **Vị trí:** `src/content/thuongHieu/vi/hamilton.md`
- **Tình trạng:** trang cũ từng ghi. Chỉ xác nhận được Hamilton nay thuộc Swatch Group và đặt trụ sở tại Biel.
- **Hành động tạm:** đợt 6 đã bỏ mốc 1974 khỏi bảng lịch sử. Không đưa thành mốc mới.
- **Trạng thái:** VẪN TREO (08/08/2026). Mốc 1974 không đưa vào bài. Chỉ ghi Hamilton thuộc Swatch Group, trụ sở tại Biel.

---

## 16. Calibre Hamilton H-10 trữ cót 80 giờ, H-30, H-31

- **Vị trí:** `src/content/thuongHieu/vi/hamilton.md` — frontmatter `signature_calibres`
- **Tình trạng:** không đối chiếu được con số cụ thể (đặc biệt là 80 giờ trữ cót của H-10).
- **Hành động tạm:** giữ nguyên frontmatter. Trong bài chỉ ghi "trữ cót dài", không ghi con số 80 giờ.
- **Trạng thái:** ĐÃ GIẢI QUYẾT (08/08/2026). Kiểm chứng được **H-10**: phát triển trên nền **ETA 2824-2**, 25 chân kính, **21.600 nhịp/giờ tức 3 Hz**, **trữ cót 80 giờ** (đạt được nhờ hạ tần số xuống 3 Hz và thiết kế lại thùng cót). Đã ghi đủ thông số lên trang. H-30 và H-31 chưa kiểm chứng thêm — chưa ghi thông số riêng.

---

## 17. Calibre Frédérique Constant FC-700, FC-755, FC-735

- **Vị trí:** `src/content/thuongHieu/vi/frederique-constant.md` — frontmatter `signature_calibres`
- **Tình trạng:** chỉ xác nhận được FC-910 là bộ máy tự phát triển đầu tiên, ra mắt năm 2004. Các mã FC-700/FC-755/FC-735 không đối chiếu được với nguồn chính hãng.
- **Hành động tạm:** giữ nguyên frontmatter, không thêm không bớt.
- **Trạng thái:** ĐÃ XỬ LÝ BẰNG CÁCH GỠ KHỎI HIỂN THỊ (08/08/2026). Slug `frederique-constant` không nằm trong danh sách `CALIBRE_DISPLAY_SLUGS`. Đồng thời bỏ ba mã FC-700/FC-755/FC-735 khỏi phần chữ bài, giữ lại duy nhất FC-910 (đã kiểm chứng). Frontmatter vẫn giữ nguyên để sau này kiểm chứng được thì hiện lại.

---

## 18. Con số "hơn 500 bộ phim" của Hamilton

- **Vị trí:** `src/content/thuongHieu/vi/hamilton.md`
- **Tình trạng:** trang cũ từng ghi "hơn 500 bộ phim", không đối chiếu được.
- **Hành động tạm:** đợt 6 đã diễn đạt mềm hơn thành "hàng trăm bộ phim".
- **Trạng thái:** VẪN TREO (08/08/2026). Giữ nguyên cách viết "hàng trăm bộ phim", không dùng con số cụ thể.

---

## 19. Năm Cartier gia nhập Richemont, năm Crash/Panthère/Ballon Bleu, năm Ceratanium ra mắt — ĐÃ GIẢI QUYẾT

- **Vị trí:** `src/content/thuongHieu/vi/cartier.md`, `src/content/thuongHieu/vi/iwc.md`
- **Trạng thái:** ĐÃ GIẢI QUYẾT (đợt bổ sung lịch sử, 04/08/2026).
- **Kết luận kiểm chứng:**
  - Cartier gia nhập Richemont năm **1988** — Richemont nắm toàn quyền kiểm soát.
  - Crash ra mắt năm **1967**, do Cartier London giới thiệu.
  - Panthère ra mắt năm **1983**.
  - Ballon Bleu ra mắt năm **2007**.
  - Ceratanium ra mắt năm **2017**, trên một bản Aquatimer giới hạn của IWC.
- **Hành động đã làm:** đưa các mốc này vào bảng lịch sử; điền `year` cho Panthère/Crash/Ballon Bleu trong `collections` của Cartier.

---

## 20. Calibre Orient F6724 — chức năng và thông số

- **Vị trí:** `src/content/thuongHieu/vi/orient.md` — frontmatter `signature_calibres`
- **Tình trạng:** các nguồn mâu thuẫn nhau về việc F6724 có chức năng lên dây tay và dừng kim giây hay không (nhiều khả năng bộ máy đã được nâng cấp giữa chừng). Trữ cót và tần số cũng không thống nhất — nguồn ghi khoảng 40 giờ.
- **Hành động tạm:** giữ nguyên frontmatter. Trên trang chỉ ghi đây là bộ máy tự sản xuất dùng cho tuyến Bambino; **không nêu chức năng, không nêu con số trữ cót/tần số**. Riêng F6922 đã kiểm chứng (21.600 nhịp mỗi giờ, trữ cót khoảng 40 giờ) và được dùng đầy đủ.
- **Trạng thái:** ĐÃ GIẢI QUYẾT (08/08/2026). Calibre F6724 nay đã kiểm chứng đầy đủ: **tự động, trữ cót khoảng 40 giờ, có dừng kim giây và lên dây tay bằng núm**. Slug `orient` đã được thêm vào danh sách `CALIBRE_DISPLAY_SLUGS`, khối "Bộ máy in-house tiêu biểu" nay hiện trở lại trên trang. **Ghi chú về sự khác nhau giữa các đời máy:** hai chức năng dừng kim giây và lên dây tay chỉ có trên **các phiên bản đang bán hiện hành** — một số nguồn cũ ghi là không có, nhiều khả năng nói về đời máy trước. Trang ghi rõ "các phiên bản đang bán hiện hành", không khẳng định cho mọi đời. Riêng F6922 giữ nguyên thông số đã có (21.600 nhịp mỗi giờ, trữ cót khoảng 40 giờ).

---

## 21. (Dự phòng) — bổ sung thêm các số liệu khác khi phát hiện

---

## 22. Dữ liệu kỹ thuật còn thiếu trong frontmatter các bài mẫu iconic (mauIconic)

- **Vị trí:** `src/content/mauIconic/vi/` (26 bài)
- **Bối cảnh:** Từ đợt bổ sung khối "Thông số kỹ thuật" trên trang chi tiết mẫu iconic (SpecTable.astro), các trường `year`, `movement`, `power_reserve`, `water_resistance`, `references` được hiển thị trực tiếp lên trang. SpecTable tự bỏ dòng không có dữ liệu — không hiện dấu gạch ngang. Danh sách dưới đây ghi rõ bài nào thiếu trường nào, để anh Vinh kiểm chứng và điền sau.
- **Nguyên tắc:** **Tuyệt đối không tự điền.** Không tra cứu, không suy đoán, không lấy từ phần chữ bài viết ra. Việc điền số liệu chỉ do anh Vinh thực hiện sau khi kiểm chứng.

### Tổng hợp theo trường

- **Thiếu `year` (2 bài):**
  - `breguet-type-xx`
  - `orient-bambino`
- **Thiếu `movement` (6 bài):**
  - `breguet-type-xx`
  - `fc-heart-beat`
  - `greubel-double-tourbillon`
  - `hamilton-ventura`
  - `longines-lindbergh`
  - `tissot-prx`
- **Thiếu `power_reserve` (8 bài):**
  - `breguet-type-xx`
  - `dufour-simplicity`
  - `fc-heart-beat`
  - `fpjourne-chronometre-bleu`
  - `greubel-double-tourbillon`
  - `hamilton-ventura`
  - `longines-lindbergh`
  - `tissot-prx`
- **Thiếu `water_resistance` (8 bài):**
  - `breguet-type-xx`
  - `dufour-simplicity`
  - `fc-heart-beat`
  - `fpjourne-chronometre-bleu`
  - `greubel-double-tourbillon`
  - `hamilton-ventura`
  - `longines-lindbergh`
  - `tissot-prx`
- **Thiếu `references` (5 bài):**
  - `dufour-simplicity`
  - `fpjourne-chronometre-bleu`
  - `greubel-double-tourbillon`
  - `hamilton-ventura`
  - `longines-lindbergh`

### Chi tiết theo bài

- `breguet-type-xx` — thiếu: `year`, `movement`, `power_reserve`, `water_resistance`
- `cartier-tank` — đủ dữ liệu
- `dufour-simplicity` — thiếu: `power_reserve`, `water_resistance`, `references`
- `fc-heart-beat` — thiếu: `movement`, `power_reserve`, `water_resistance`
- `fifty-fathoms` — đủ dữ liệu
- `fpjourne-chronometre-bleu` — thiếu: `power_reserve`, `water_resistance`, `references`
- `freak` — đủ dữ liệu
- `glashuette-seaq` — đủ dữ liệu
- `grand-seiko-snowflake` — đủ dữ liệu
- `greubel-double-tourbillon` — thiếu: `movement`, `power_reserve`, `water_resistance`, `references`
- `hamilton-ventura` — thiếu: `movement`, `power_reserve`, `water_resistance`, `references`
- `iwc-mark-xi` — đủ dữ liệu
- `lange-1` — đủ dữ liệu
- `longines-lindbergh` — thiếu: `movement`, `power_reserve`, `water_resistance`, `references`
- `monaco` — đủ dữ liệu
- `omega-speedmaster` — đủ dữ liệu
- `orient-bambino` — thiếu: `year`
- `patek-nautilus` — đủ dữ liệu
- `reverso` — đủ dữ liệu
- `rolex-submariner` — đủ dữ liệu
- `royal-oak` — đủ dữ liệu
- `seiko-62mas` — đủ dữ liệu
- `tissot-prx` — thiếu: `movement`, `power_reserve`, `water_resistance`
- `tudor-black-bay` — đủ dữ liệu
- `vc-overseas` — đủ dữ liệu
- `zenith-el-primero` — đủ dữ liệu

- **Trạng thái:** VẪN TREO (10/08/2026). Chờ anh Vinh kiểm chứng và điền.

---

## 23. Các trang chưa có nguồn tham khảo (chờ anh Vinh soạn bổ sung)

- **Bối cảnh:** Từ đợt đưa khối "Nguồn tham khảo" lên trang (SourceList.astro), nguồn đã được chuyển từ 8 file `docs/` vào frontmatter `sources`. Tuy nhiên một số trang chưa có nguồn ghi lại — vì file `docs/` tương ứng không có mục "NGUỒN ĐÃ TRA CỨU", hoặc trang được dựng trước khi hệ thống ghi nguồn ra đời. Với những trang đó, `sources` để rỗng và khối nguồn không hiện — đúng như thiết kế.
- **Nguyên tắc:** không tự đi tìm nguồn thay thế, không lấy tạm liên kết cho có. Chờ anh Vinh soạn nguồn đã kiểm chứng rồi điền vào frontmatter.

### 10 trang thương hiệu chưa có nguồn — ĐÃ GIẢI QUYẾT (12/08/2026)

Anh Vinh đã soạn và điền nguồn cho cả 10 trang. Nay toàn bộ 26 trang thương hiệu trên site đều có khối "Nguồn tham khảo".

- `a-lange-soehne` — ĐÃ CÓ NGUỒN
- `audemars-piguet` — ĐÃ CÓ NGUỒN
- `blancpain` — ĐÃ CÓ NGUỒN
- `jaeger-lecoultre` — ĐÃ CÓ NGUỒN
- `omega` — ĐÃ CÓ NGUỒN
- `patek-philippe` — ĐÃ CÓ NGUỒN
- `rolex` — ĐÃ CÓ NGUỒN
- `tag-heuer` — ĐÃ CÓ NGUỒN
- `ulysse-nardin` — ĐÃ CÓ NGUỒN
- `vacheron-constantin` — ĐÃ CÓ NGUỒN

(Ghi chú: trong số này, `rolex`, `tag-heuer`, `ulysse-nardin` thuộc đợt 1 — file `docs/goi-du-lieu-thuong-hieu-dot-1.md` không có mục "NGUỒN ĐÃ TRA CỨU". Bảy hãng còn lại được dựng trước khi hệ thống ghi nguồn ra đời.)

### 23 trang mẫu iconic chưa có nguồn — ĐÃ GIẢI QUYẾT (16/08/2026, Gói D)

Cả 23 bài dưới đây đã được điền nguồn qua Gói D (17 bài nguồn riêng, 6 bài chép từ file thương hiệu tương ứng). Nay **26/26 bài mẫu iconic có khối "Nguồn tham khảo"**.

- `breguet-type-xx`
- `cartier-tank`
- `dufour-simplicity`
- `fifty-fathoms`
- `fpjourne-chronometre-bleu`
- `freak`
- `grand-seiko-snowflake`
- `greubel-double-tourbillon`
- `hamilton-ventura`
- `iwc-mark-xi`
- `lange-1`
- `longines-lindbergh`
- `monaco`
- `omega-speedmaster`
- `patek-nautilus`
- `reverso`
- `rolex-submariner`
- `royal-oak`
- `seiko-62mas`
- `tissot-prx`
- `tudor-black-bay`
- `vc-overseas`
- `zenith-el-primero`

### Lỗi chính tả địa chỉ cần lưu ý

- **Longines — Wikipedia:** file `docs/goi-du-lieu-thuong-hieu-dot-4.md` ghi địa chỉ `https://en.wikipedia.org/wikiLongines` (thiếu dấu `/` giữa `wiki` và `Longines`). Đã sửa thành `https://en.wikipedia.org/wiki/Longines` trên trang để liên kết không bị chết. Anh Vinh rà lại xem đó có phải lỗi gõ trong file gốc hay không.

- **Patek Philippe — /en/company/history (LIÊN KẾT CHẾT 404):** địa chỉ `https://www.patek.com/en/company/history` do anh Vinh cấp trả về **HTTP 404** (trang không tồn tại) khi kiểm chứng bằng cả HEAD lẫn GET. Đã chép nguyên văn theo quy tắc, **không tự thay địa chỉ**. Chờ anh Vinh cấp địa chỉ đúng cho trang lịch sử Patek Philippe (hai nguồn còn lại của hãng — `/the-founders` và `/the-stern-family` — đều trả về 200, hoạt động bình thường).

- **Trạng thái mục (rà 30/08/2026):** ĐÃ GIẢI QUYẾT cho phần nguồn — 10 trang thương hiệu (12/08/2026) và 23 trang mẫu iconic (16/08/2026, Gói D) đều đã có nguồn; tính đến ngày rà, toàn bộ **73/73 trang thương hiệu** và **66/66 bài mẫu iconic** đều có khối "Nguồn tham khảo". Câu "Phần 23 trang mẫu iconic dưới đây VẪN TREO" ghi trước Gói D đã lỗi thời và được sửa trong đợt rà này. **Vẫn treo duy nhất:** địa chỉ Patek Philippe 404 ở trên — **gắn cờ `CẦN ƯU TIÊN KIỂM CHỨNG` cho liên kết này bên trong mục** (xem bảng tổng hợp).
- **Cập nhật 01/09/2026 (xử lý liên kết Patek 404):** đã thay URL ngày 01/09/2026 trong `patek-philippe.md` — nhãn mới "Patek Philippe — Lịch sử tại Genève và Thụy Sĩ", URL mới là trang chính hãng về lịch sử Patek Philippe tại Genève và Thụy Sĩ (`/en/manufacture/a-story-of-independence/anchored-in-geneva-and-switzerland`, HTTP 200 khi kiểm trước khi thay). Liên kết mới đã được đưa lên trang `patek-philippe`; cờ ưu tiên của liên kết đã được gỡ. Hai nguồn còn lại (`/the-founders`, `/the-stern-family`) giữ nguyên. Lưu ý phạm vi: Prompt 21 **chỉ xử lý URL nguồn chết** — không phải đợt kiểm chứng lại toàn bộ dữ kiện trong bài Patek. **Bổ sung cùng ngày (rà toàn bộ `src/content/`):** phát hiện URL Patek cũ cũng xuất hiện ở bài mẫu iconic `patek-nautilus.md` — **đã thay cùng ngày 01/09/2026** bằng cùng URL chính hãng mới (nhãn "Patek Philippe — Lịch sử tại Genève và Thụy Sĩ", kèm `updated: "2026-09-01"`; `relatedModels`, thân bài, thông số giữ nguyên). URL Patek cũ hiện không còn ở bất kỳ bài xuất bản nào trong `src/content/`.

---

## 24. Giới hạn form liên hệ chạy trên Formspree gói miễn phí

- **Vị trí:** `src/pages/lien-he.astro` — form gửi qua Formspree endpoint, mã lấy từ biến môi trường `PUBLIC_FORMSPREE_ID`.
- **Giới hạn cần biết:**
  - **50 lượt gửi mỗi tháng** (gói miễn phí), tính cả thư rác lọt qua honeypot.
  - **Không có reCAPTCHA** ở gói miễn phí — chỉ có honeypot `_gotcha` chống bot cơ bản.
  - Khi vượt hạn mức 50 lượt, form **ngừng nhận** cho tới đầu tháng sau. Người đọc sẽ thấy lỗi gửi (trang báo "gửi không thành công"), không biết rõ nguyên nhân là đã hết hạn mức.
- **Hành động khi cần:** nếu lượng gửi tăng hoặc bị bot lạm dụng, nâng lên gói trả phí của Formspree, hoặc đổi endpoint mới (đổi biến `PUBLIC_FORMSPREE_ID` trên Vercel, không cần sửa mã).
- **Trạng thái:** ĐÃ GHI (11/08/2026). Giới hạn vận hành, không phải lỗi — chỉ cần lưu ý khi trang có nhiều người đọc hơn.

---

## 25. Trang Seagull — các dữ kiện cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/seagull.md`
- **Bối cảnh:** Trang được dựng ngày 15/08/2026 từ nguồn Grail Watch Reference và Wikipedia — Tianjin Seagull (do anh Vinh cấp). Ba nhóm dữ kiện dưới đây có mặt trong một số nguồn nhưng chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Năm thành lập nhà máy đồng hồ Thiên Tân và mốc chiếc đồng hồ đeo tay đầu tiên của Trung Quốc

- Các nguồn tra được có mâu thuẫn: một số ghi ngày 24 tháng 3 năm 1955 với tên gọi "Ngũ Tinh" (Five-Star), một số ghi tên "Wuyi" (Mùng Một tháng Năm) và mốc sản xuất hàng loạt năm 1958.
- Chưa xác định được nguồn nào chính xác.
- **Hành động đã làm:** không đưa mốc nào vào bài, và **không đặt trường `founded`** trong frontmatter.

### 2. Tần số dao động và cơ cấu bánh xe cột của ST19

- Có nguồn nhắc tới nhưng đều là blog thương mại, không phải tài liệu kỹ thuật. Grail Watch Reference không ghi các thông số này.
- **Hành động đã làm:** không đưa con số tần số vào bài.

### 3. Địa chỉ trang chính hãng của Seagull

- Tra cứu ra nhiều trang cùng tự nhận là cửa hàng chính hãng với tên miền khác nhau, không xác định được đâu là trang chính thức của Tianjin Seagull Watch Group.
- **Hành động đã làm:** không đưa liên kết chính hãng nào vào phần nguồn.

- **Trạng thái:** VẪN TREO (15/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 26. Trang Breitling, Panerai, Citizen — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/breitling.md`, `src/content/thuongHieu/vi/panerai.md`, `src/content/thuongHieu/vi/citizen.md`
- **Bối cảnh:** Ba trang được dựng ngày 15/08/2026 từ nguồn do anh Vinh cấp. Các dữ kiện dưới đây có mặt trong một số nguồn nhưng chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Năm Willy Breitling nộp bằng sáng chế nút bấm thứ hai

- Nguồn chính hãng mô tả sự kiện nhưng không nêu năm. Nhiều tài liệu bên ngoài ghi năm nhưng không thống nhất.
- **Hành động đã làm:** nêu sự kiện **không kèm năm** (thuộc phần Tổng quan), không đưa vào `lineHistory`.

### 2. Năm ra mắt dòng Radiomir và Luminor của Panerai

- Trang lịch sử chính hãng mô tả nguồn gốc tên gọi theo vật liệu phát quang, không nêu năm ra mắt dòng. Các con số phổ biến bên ngoài chưa đối chiếu được.
- **Hành động đã làm:** để trống trường `year` trong `collections`.

### 3. Năm ra mắt các dòng của Citizen

- Không xác nhận được từ trang chính hãng.
- **Hành động đã làm:** để trống trường `year`.

### 4. Mã bộ máy Miyota cụ thể

- Miyota là công ty con của Citizen — điều này đã kiểm chứng. Nhưng mã bộ máy cụ thể thì chưa đối chiếu được từ nguồn chính hãng.
- **Hành động đã làm:** nhắc Miyota ở mức vai trò, **không ghi mã bộ máy nào**.

### 5. Năm thành lập Miyota và năm gia nhập Citizen

- Chưa xác nhận được.
- **Hành động đã làm:** không nhắc năm.

### 6. Toàn bộ giá bán của cả ba hãng

- Giá lỗi thời nhanh, đúng quy tắc trong `CONTENT-GUIDE.md`.
- **Hành động đã làm:** mô tả định vị phân khúc thay vì con số.

### 7. Các dòng sản phẩm khác của Breitling ngoài Navitimer và Chronomat

- Chưa kiểm chứng được đặc điểm nhận diện từ nguồn chính hãng.
- **Hành động đã làm:** chỉ dựng hai dòng đã cấp.

- **Trạng thái:** VẪN TREO (15/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 27. Trang Oris, NOMOS Glashütte, Rado — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/oris.md`, `src/content/thuongHieu/vi/nomos-glashuette.md`, `src/content/thuongHieu/vi/rado.md`
- **Bối cảnh:** Ba trang đợt 9 được dựng ngày 16/08/2026 từ nguồn do anh Vinh cấp. Các dữ kiện dưới đây có mặt trong một số nguồn nhưng chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Mức chống từ tính bằng gauss của Oris Calibre 400

- Chỉ thấy ở nguồn thứ cấp, trang chính hãng không nêu con số.
- **Hành động đã làm:** ghi "chống từ cao" không kèm số.

### 2. Năm Oris gia nhập ASUAG

- Nguồn thứ cấp, chưa đối chiếu được.
- **Hành động đã làm:** không nhắc.

### 3. Mã calibre của Rado

- Không đối chiếu được từ nguồn chính hãng.
- **Hành động đã làm:** không đặt `signature_calibres`, không thêm `rado` vào `CALIBRE_DISPLAY_SLUGS`.

### 4. Năm ra mắt các dòng Oris và NOMOS

- Không xác nhận được.
- **Hành động đã làm:** để trống trường `year` trong `collections`.

### 5. Các calibre khác của Oris ngoài Calibre 400

- Có thấy tên ở nguồn thứ cấp nhưng chưa đối chiếu được thông số từ trang chính hãng.
- **Hành động đã làm:** chỉ đưa Calibre 400.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 28. Trang Hublot, Chopard, Girard-Perregaux — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/hublot.md`, `src/content/thuongHieu/vi/chopard.md`, `src/content/thuongHieu/vi/girard-perregaux.md`
- **Bối cảnh:** Ba trang đợt 10 được dựng ngày 16/08/2026 từ nguồn do anh Vinh cấp. Các dữ kiện dưới đây có mặt trong một số nguồn nhưng chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Năm gia đình Scheufele mua lại Chopard

- Trang chính hãng chỉ nói gia đình Scheufele đã dẫn dắt hãng, không nêu năm. Nguồn thứ cấp có nêu nhưng chưa đối chiếu được.
- **Hành động đã làm:** không đưa vào `lineHistory`.

### 2. Chủ sở hữu hiện tại của Girard-Perregaux

- Chưa đối chiếu được từ nguồn đáng tin.
- **Hành động đã làm:** để trống `parent_company`.

### 3. Mã calibre của Chopard và Girard-Perregaux

- Chưa đối chiếu được từ nguồn chính hãng.
- **Hành động đã làm:** không đặt `signature_calibres`, không thêm hai slug này vào `CALIBRE_DISPLAY_SLUGS`.

### 4. Năm ra mắt dòng Classic Fusion của Hublot và các dòng của Chopard

- Không xác nhận được.
- **Hành động đã làm:** để trống trường `year` trong `collections`.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 29. Trang Richard Mille, Piaget, Bvlgari — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/richard-mille.md`, `src/content/thuongHieu/vi/piaget.md`, `src/content/thuongHieu/vi/bvlgari.md`
- **Bối cảnh:** Ba trang đợt 11 được dựng ngày 16/08/2026 từ nguồn do anh Vinh cấp. Các dữ kiện dưới đây có mặt trong một số nguồn nhưng chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Năm thành lập hãng Richard Mille

- Nguồn nêu các năm khác nhau: có nguồn ghi 1999, trang chính hãng nói RM 001 ra mắt tại hội chợ Basel năm 2000, nguồn khác ghi 2001.
- **Hành động đã làm:** **không đặt `founded`**, chỉ giữ mốc 2000 cho RM 001 vì đó là điều trang chính hãng nói.

### 2. Chủ sở hữu hiện tại của Richard Mille

- Chưa đối chiếu được.
- **Hành động đã làm:** để trống `parent_company`.

### 3. Mã calibre của Richard Mille và Bvlgari

- Chưa đối chiếu được từ nguồn chính hãng.
- **Hành động đã làm:** không đặt `signature_calibres`, không thêm hai slug này vào `CALIBRE_DISPLAY_SLUGS`.

### 4. Năm ra mắt dòng Altiplano

- Trang chính hãng mô tả nguồn gốc tên gọi nhưng không nêu năm.
- **Hành động đã làm:** để trống trường `year`.

### 5. Các dòng hiện hành của Richard Mille

- Chưa đối chiếu được đặc điểm nhận diện.
- **Hành động đã làm:** để mảng `collections` rỗng.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 30. Trang Montblanc, Sinn, Junghans — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/montblanc.md`, `src/content/thuongHieu/vi/sinn.md`, `src/content/thuongHieu/vi/junghans.md`
- **Bối cảnh:** Ba trang đợt 12 được dựng ngày 16/08/2026 từ nguồn do anh Vinh cấp. Các dữ kiện dưới đây có mặt trong một số nguồn nhưng chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Năm thành lập Montblanc

- 1858 là năm khởi đầu xưởng Minerva, không phải năm thành lập Montblanc. Chưa đối chiếu được năm thành lập Montblanc từ nguồn chính hãng.
- **Hành động đã làm:** **không đặt `founded`**; giải thích rõ mối quan hệ Montblanc và Minerva trong phần Tổng quan.

### 2. Chính tả tên người sáng lập xưởng Villeret

- Nguồn chính hãng xuất hiện cả hai cách viết: Charles-Yvan Robert và Charles-Ivan Robert.
- **Hành động đã làm:** dùng cách viết thứ nhất (Charles-Yvan Robert), cần xác nhận lại sau.

### 3. Chủ sở hữu hiện tại của Montblanc và Junghans

- Chưa đối chiếu được.
- **Hành động đã làm:** để trống `parent_company`.

### 4. Mã calibre của cả ba hãng

- Chưa đối chiếu được từ nguồn chính hãng.
- **Hành động đã làm:** không đặt `signature_calibres`, không thêm slug nào vào `CALIBRE_DISPLAY_SLUGS`.

### 5. Năm các mốc kỹ thuật của Minerva

- Nguồn mô tả theo thập niên, không nêu năm.
- **Hành động đã làm:** viết theo thập niên trong nội dung, không đưa vào `lineHistory`.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 31. Trang H. Moser & Cie, MB&F, Urwerk — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/h-moser.md`, `src/content/thuongHieu/vi/mb-and-f.md`, `src/content/thuongHieu/vi/urwerk.md`
- **Bối cảnh:** Ba trang đợt 13 được dựng ngày 16/08/2026 từ nguồn do anh Vinh cấp. Các dữ kiện dưới đây có mặt trong một số nguồn nhưng chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Mã calibre của cả ba hãng

- Chưa đối chiếu được từ nguồn chính hãng.
- **Hành động đã làm:** không đặt `signature_calibres`, không thêm slug nào vào `CALIBRE_DISPLAY_SLUGS`.

### 2. Chủ sở hữu H. Moser & Cie

- Chưa đối chiếu được.
- **Hành động đã làm:** để trống `parent_company`.

### 3. Năm ra mắt dòng UR-105 và UR-220

- Nguồn không nêu năm rõ ràng.
- **Hành động đã làm:** để trống trường `year`.

### 4. Sản lượng hằng năm của MB&F và Urwerk

- Chỉ có số liệu của H. Moser (khoảng 60 nhân viên, hơn 1.500 chiếc mỗi năm — đã ghi vào bài).
- **Hành động đã làm:** không suy đoán cho hai hãng còn lại.

### 5. Năm ra mắt dòng Legacy Machines

- Chưa đối chiếu được.
- **Hành động đã làm:** để trống trường `year`.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 32. Trang Doxa, Bell & Ross, Universal Genève — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/doxa.md`, `src/content/thuongHieu/vi/bell-and-ross.md`, `src/content/thuongHieu/vi/universal-geneve.md`
- **Bối cảnh:** Ba trang đợt 14 được dựng ngày 16/08/2026 từ nguồn do anh Vinh cấp. Các dữ kiện dưới đây có mặt trong một số nguồn nhưng chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Chủ sở hữu hiện tại của Universal Genève và mốc hồi sinh

- Thông tin về việc hãng đổi chủ và trở lại thị trường chỉ thấy ở nguồn thứ cấp, chưa đối chiếu được từ trang chính hãng.
- **Hành động đã làm:** không đặt `parent_company`, không nêu năm hồi sinh, chỉ nói hãng đang trong giai đoạn trở lại.

### 2. Năm Gérald Genta thiết kế Polerouter và năm ra mắt Polerouter

- Chưa đối chiếu được từ trang chính hãng.
- **Hành động đã làm:** nhắc việc Genta khởi nghiệp tại đây, không kèm năm và không kèm tên mẫu cụ thể.

### 3. Năm Descombes qua đời và năm ra mắt Universal Watch Extra

- Nguồn chỉ nói "năm tiếp theo" mà không nêu năm gốc.
- **Hành động đã làm:** viết theo trình tự, không gán năm.

### 4. Danh mục hiện hành của Universal Genève

- Hãng đang trở lại, chưa đối chiếu được.
- **Hành động đã làm:** để `collections` rỗng.

### 5. Mã calibre của cả ba hãng

- Chưa đối chiếu được từ nguồn chính hãng.
- **Hành động đã làm:** không đặt `signature_calibres`, không thêm slug nào vào `CALIBRE_DISPLAY_SLUGS`.

### 6. Chủ sở hữu Doxa và Bell & Ross

- Chưa đối chiếu được.
- **Hành động đã làm:** để trống `parent_company`.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 33. Trang Timex, Swatch, Vostok — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/timex.md`, `src/content/thuongHieu/vi/swatch.md`, `src/content/thuongHieu/vi/vostok.md`
- **Bối cảnh:** Ba trang đợt 15 được dựng ngày 16/08/2026 từ nguồn do anh Vinh cấp. Cả ba hãng nổi tiếng nhất qua sản phẩm quartz hoặc điện tử — trang chỉ tập trung mảng cơ khí, quartz nhắc ở mức bối cảnh. Các dữ kiện dưới đây chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Năm thành lập Swatch

- Nguồn nói về các mẫu quartz đầu tiên năm 1983 nhưng không nêu rõ năm thành lập công ty.
- **Hành động đã làm:** **không đặt `founded`**, chỉ ghi mốc 1983 trong `lineHistory`.

### 2. Năm ra mắt Amphibia và tên các nhà thiết kế Vostok

- Chỉ thấy ở nguồn thứ cấp, không có ở trang giới thiệu chính thức.
- **Hành động đã làm:** không đưa vào `lineHistory`, không nêu tên người; viết trong nội dung với cách diễn đạt thận trọng ("được ghi nhận rộng rãi", không khẳng định như dữ kiện đã xác minh, không nêu năm cụ thể).

### 3. Năm ra mắt dòng Marlin của Timex

- Nguồn chính hãng chỉ ghi theo thập niên 1960.
- **Hành động đã làm:** viết theo thập niên trong nội dung, để trống trường `year`.

### 4. Chủ sở hữu Timex và Vostok

- Chưa đối chiếu được.
- **Hành động đã làm:** để trống `parent_company`.

### 5. Mã calibre của cả ba hãng

- Chưa đối chiếu được từ nguồn chính hãng.
- **Hành động đã làm:** không đặt `signature_calibres`, không thêm slug nào vào `CALIBRE_DISPLAY_SLUGS`.

### Ghi chú về nguồn Vostok

- Trang `vostok.watch` tự mô tả là **nhà bán lẻ được ủy quyền** của nhà máy Chistopol, không phải trang chính thức của nhà máy. Chỉ lấy phần lịch sử nhà máy ở mức cơ bản nhất, bỏ mọi chi tiết khác.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 34. Trang De Bethune, Laurent Ferrier, Voutilainen — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/de-bethune.md`, `src/content/thuongHieu/vi/laurent-ferrier.md`, `src/content/thuongHieu/vi/voutilainen.md`
- **Bối cảnh:** Ba trang đợt 16 được dựng ngày 16/08/2026 từ nguồn do anh Vinh cấp. Các dữ kiện dưới đây chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Năm thành lập hãng Laurent Ferrier

- Nguồn nêu mốc 1979 là năm quyết định làm đồng hồ, 2010 là năm mẫu đầu đoạt giải, nhưng không nêu rõ năm thành lập công ty.
- **Hành động đã làm:** **không đặt `founded`**.

### 2. Mã calibre của De Bethune và Voutilainen

- Chưa đối chiếu được đầy đủ từ nguồn chính hãng.
- **Hành động đã làm:** không đặt `signature_calibres`, không thêm slug nào vào `CALIBRE_DISPLAY_SLUGS`.

### 3. Danh mục hiện hành của De Bethune

- Chưa đối chiếu được đặc điểm từng dòng.
- **Hành động đã làm:** để `collections` rỗng.

### 4. Sản lượng hằng năm của cả ba hãng

- Không có số liệu từ nguồn chính hãng.
- **Hành động đã làm:** không suy đoán.

### 5. Chi tiết về xưởng làm mặt số riêng của Voutilainen

- Có nghe nhắc nhưng không xác nhận được từ trang chính hãng.
- **Hành động đã làm:** không nhắc tới.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 35. Trang Parmigiani Fleurier, Roger Dubuis, Credor — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/parmigiani-fleurier.md`, `src/content/thuongHieu/vi/roger-dubuis.md`, `src/content/thuongHieu/vi/credor.md`
- **Bối cảnh:** Ba trang đợt 17 được dựng ngày 16/08/2026 từ nguồn do anh Vinh cấp. Các dữ kiện dưới đây chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Mã calibre của cả ba hãng

- Chưa đối chiếu được từ nguồn chính hãng.
- **Hành động đã làm:** không đặt `signature_calibres`, không thêm slug nào vào `CALIBRE_DISPLAY_SLUGS`.

### 2. Năm ra mắt dòng Tonda và Excalibur

- Nguồn không nêu năm ra mắt dòng.
- **Hành động đã làm:** để trống trường `year`.

### 3. Sản lượng hằng năm của cả ba hãng

- Không có số liệu.
- **Hành động đã làm:** không suy đoán.

### 4. Vị trí chính xác của các xưởng Seiko khác

- Chỉ ghi Micro Artist Studio tại Shiojiri.
- **Hành động đã làm:** **không nhắc Shizukuishi** để tránh gây nhầm.

### 5. Quan hệ định vị chính xác giữa Credor và Grand Seiko

- Không có tuyên bố chính thức về thứ bậc.
- **Hành động đã làm:** mô tả Credor là nhánh cao cấp, **không khẳng định đứng trên hay dưới Grand Seiko bằng con số hay thứ hạng**.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 36. Trang Christopher Ward, Stowa, Mühle-Glashütte — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/christopher-ward.md`, `src/content/thuongHieu/vi/stowa.md`, `src/content/thuongHieu/vi/muehle-glashuette.md`
- **Bối cảnh:** Ba trang đợt 18 được dựng ngày 16/08/2026 từ nguồn do anh Vinh cấp. Các dữ kiện dưới đây chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Năm mẫu C1 Bel Canto đoạt giải GPHG

- Nguồn chỉ ghi "tháng Mười một" không kèm năm.
- **Hành động đã làm:** nêu giải thưởng **không kèm năm**.

### 2. Cơ chế điều chỉnh cổ chim gõ kiến của Mühle

- Chỉ thấy nhắc trong thông số một mẫu, không có trong phần lịch sử chính hãng.
- **Hành động đã làm:** không nhắc tới.

### 3. Mã calibre của Stowa và Mühle-Glashütte

- Chưa đối chiếu được.
- **Hành động đã làm:** không đặt `signature_calibres`, không thêm hai slug này vào `CALIBRE_DISPLAY_SLUGS`.

### 4. Chủ sở hữu Stowa và Mühle-Glashütte

- Chưa đối chiếu được.
- **Hành động đã làm:** để trống `parent_company`.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 37. Trang Mido, Certina, Alpina — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/mido.md`, `src/content/thuongHieu/vi/certina.md`, `src/content/thuongHieu/vi/alpina.md`
- **Bối cảnh:** Ba trang đợt 19 được dựng ngày 16/08/2026 từ nguồn do anh Vinh cấp. Các dữ kiện dưới đây chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Bốn nguyên tắc cụ thể của khái niệm Alpina 4

- Nguồn nhắc có bốn nguyên tắc nhưng không liệt kê chúng là gì.
- **Hành động đã làm:** nêu khái niệm, **không bịa ra bốn nguyên tắc**.

### 2. Năm ra mắt dòng Multifort và Ocean Star

- Nguồn chính hãng không nêu năm.
- **Hành động đã làm:** để trống trường `year`.

### 3. Quan hệ sở hữu giữa Alpina và Frederique Constant

- Chưa đối chiếu được từ nguồn chính hãng.
- **Hành động đã làm:** nhắc hai hãng thường bị nhầm lẫn, **không khẳng định quan hệ sở hữu**.

### 4. Mã calibre của cả ba hãng

- Chưa đối chiếu được.
- **Hành động đã làm:** không đặt `signature_calibres`, không thêm slug nào vào `CALIBRE_DISPLAY_SLUGS`.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 38. Trang Eterna, Chanel — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/eterna.md`, `src/content/thuongHieu/vi/chanel.md`
- **Bối cảnh:** Hai trang đợt 20 được dựng ngày 16/08/2026 từ nguồn do anh Vinh cấp. Các dữ kiện dưới đây chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**.

### 1. Chủ sở hữu và tình trạng hoạt động hiện tại của Eterna

- Không xác minh được từ nguồn đáng tin. Trang chính hãng còn truy cập được nhưng dòng bản quyền ghi năm 2021.
- **Hành động đã làm:** để trống `parent_company`, và **nói rõ trong nhận định rằng hiện trạng hoạt động chưa xác minh được**.

### 2. Năm ra mắt dòng Kontiki và dòng 1948 của Eterna

- Nguồn mô tả nguồn gốc tên gọi nhưng không nêu năm ra mắt dòng.
- **Hành động đã làm:** để trống trường `year`.

### 3. Mã calibre của Eterna

- Chưa đối chiếu được.
- **Hành động đã làm:** không đặt `signature_calibres`.

### 4. Năm thành lập nhà mốt Chanel

- Trang này chỉ nói về mảng đồng hồ lập năm 1987.
- **Hành động đã làm:** **không suy đoán năm thành lập nhà mốt**, giải thích rõ trong bài rằng 1987 là năm lập mảng đồng hồ.

### 5. Danh sách các hãng khác dùng bộ máy của xưởng Kenissi

- Chỉ xác minh được việc Chanel đồng sở hữu Kenissi.
- **Hành động đã làm:** **không nêu tên hãng nào khác**.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 39. Trang Minase, Hajime Asaoka, Beijing Watch Factory — số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** `src/content/thuongHieu/vi/minase.md`, `src/content/thuongHieu/vi/hajime-asaoka.md`, `src/content/thuongHieu/vi/beijing-watch-factory.md`
- **Bối cảnh:** Ba trang đợt 21 (đợt cuối) được dựng ngày 16/08/2026 từ nguồn do anh Vinh cấp. Các dữ kiện dưới đây chưa đạt chuẩn kiểm chứng nên **đã bị cố tình bỏ khỏi bài**. Riêng Beijing Watch Factory: không tìm được trang chính hãng tiếng Anh xác minh được — nguồn là Wikipedia và một tạp chí ngành, thấp hơn chuẩn các hãng khác; trang vì vậy viết ngắn hơn.

### 1. Năm thành lập Minase

- Nguồn nêu mốc 2005 cho chiếc Master Craft M1 nhưng không nêu năm thành lập hãng.
- **Hành động đã làm:** **không đặt `founded`**, chỉ giữ mốc 2005 trong `lineHistory`.

### 2. Năm thành lập công ty của Hajime Asaoka

- Đây là nhà chế tác cá nhân, không có năm thành lập công ty rõ ràng.
- **Hành động đã làm:** không đặt `founded`.

### 3. Quan hệ chính xác giữa Kyowa Seiko và thương hiệu Minase

- Nguồn nhắc tên công ty nhưng không mô tả rõ quan hệ.
- **Hành động đã làm:** chỉ nêu việc chiếc M1 do công ty này sản xuất.

### 4. Danh sách các dòng sản phẩm của Beijing Watch Factory

- Không đối chiếu được.
- **Hành động đã làm:** để `collections` rỗng.

### 5. Mã calibre của cả ba hãng

- Chưa đối chiếu được.
- **Hành động đã làm:** không đặt `signature_calibres`, không thêm slug nào vào `CALIBRE_DISPLAY_SLUGS`.

### 6. Các danh hiệu và thành tích của Hajime Asaoka ngoài AHCI và Gendai no Meiko

- Chỉ hai điều này xuất hiện nhất quán ở nhiều nguồn.
- **Hành động đã làm:** không nêu thêm.

### Ghi chú: liên kết chết phát hiện khi kiểm nguồn (Hajime Asaoka)

- **Kurono Tokyo — Năm năm thành lập:** địa chỉ `https://kuronotokyo.com/pages/5th-anniversary` do anh Vinh cấp trả về **HTTP 404** (trang không tồn tại). Đã chép nguyên văn theo quy tắc, **không tự thay địa chỉ**. Trang chủ kuronotokyo.com hiện chỉ liên kết tới `/pages/kurono-anniversary-malachite` — có thể là trang kỷ niệm đã đổi đường dẫn. Chờ anh Vinh cấp lại địa chỉ đúng.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.
- **Trạng thái mục (rà 30/08/2026):** phần số liệu ĐÃ XỬ LÝ AN TOÀN (các dữ kiện chưa chắc đã bị bỏ khỏi bài). Riêng liên kết Kurono Tokyo 404 **đang hiển thị trong khối nguồn trang `hajime-asaoka`** — **gắn cờ `CẦN ƯU TIÊN KIỂM CHỨNG` cho liên kết này bên trong mục** (trạng thái xử lý của mục không đổi; xem bảng tổng hợp).
- **Cập nhật 01/09/2026 (xử lý liên kết Kurono 404):** đã thay URL ngày 01/09/2026 trong `hajime-asaoka.md` — nhãn mới "Kurono Tokyo — Kỷ niệm 5 năm, 2024 Anniversary Reiwa", URL mới là trang chính hãng `https://kuronotokyo.com/pages/2024-anniversary-reiwa` (HTTP 200 khi kiểm trước khi thay). Trang mới xác nhận mốc thành lập Kurono Tokyo năm 2019 và kỷ niệm 5 năm vào năm 2024. Cờ ưu tiên của liên kết đã được gỡ ngày 01/09/2026. **Trạng thái mục vẫn là `ĐÃ XỬ LÝ AN TOÀN`** do các dữ kiện khác trong mục (mục 1–6 ở trên) vẫn được chủ động bỏ khỏi bài.

---

## 40. Gói A — nguồn cho 32 mục từ điển; liên kết chết phát hiện khi kiểm

- **Vị trí:** 32 file trong `src/content/tuDien/vi/` được điền trường `sources` ngày 16/08/2026 theo danh sách anh Vinh cấp (chép nguyên văn). Nay **33/33 mục từ điển** đều có nguồn (kể cả `microbrand` đã có từ trước).

### Liên kết chết: COSC — /chronometer-certified (404)

- Địa chỉ `https://www.cosc.swiss/chronometer-certified` trả về **HTTP 404**, không có redirect. Menu site COSC hiện liên kết tới `/certified-chronometer` — khả năng cao từ bị đảo thứ tự trong địa chỉ cấp.
- **Ảnh hưởng 4 file:** `chronometer.md` (nguồn 1/3), `metas.md` (nguồn 3/3), `vph.md` (nguồn 2/2), `do-sai-so.md` trong huongDan (nguồn 1/3 — Gói C).
- **Hành động đã làm:** giữ nguyên văn theo quy tắc, **không tự thay địa chỉ**. Chờ anh Vinh quyết định.

### Các nguồn còn lại

- 10 URL xác nhận 200 trực tiếp (COSC khác, METAS, Wikipedia, Roger Dubuis, 4 trang FHH).
- 17 URL FHH/journal bị chặn công cụ tự động nhưng xác nhận **đang sống** qua webReader (đại diện: trang tourbillon và trang journal decoration tải đầy đủ nội dung khớp).

- **Trạng thái:** ĐÃ LÀM (16/08/2026), một liên kết chết chờ anh Vinh xử lý.
- **Trạng thái mục (rà 30/08/2026):** ĐÃ GIẢI QUYẾT cho phần nguồn — 33/33 mục từ điển đã có nguồn, các URL còn lại xác nhận đang sống. Riêng liên kết COSC 404 **đang hiển thị trong khối nguồn của 4 trang** — **gắn cờ `CẦN ƯU TIÊN KIỂM CHỨNG` cho liên kết này bên trong mục** (trạng thái xử lý của mục không đổi; xem bảng tổng hợp).
- **Cập nhật 01/09/2026 (xử lý liên kết COSC 404):** đã thay đúng đường dẫn chính hãng `/certified-chronometer` (khả năng từ bị đảo thứ tự như ghi chú lịch sử ở trên đã chính xác) trong **đủ bốn bài bị ảnh hưởng** — `chronometer.md`, `metas.md`, `vph.md`, `do-sai-so.md`; nhãn nguồn giữ nguyên vì vẫn mô tả đúng nội dung. Cờ ưu tiên đã được gỡ ngày 01/09/2026. Không thay đổi nội dung chuyên môn của bốn bài trong đợt này; các URL COSC khác (`/cosc-chronograph-chronometer`, `/cosc-certifications`, `/cosc-faq`) không đụng tới.

---

## 41. Gói 1 — mười mẫu iconic mới; số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** 10 file mới trong `src/content/mauIconic/vi/`: `breitling-navitimer.md`, `panerai-luminor.md`, `rado-diastar.md`, `doxa-sub-300.md`, `bvlgari-octo-finissimo.md`, `piaget-altiplano.md`, `chanel-j12.md`, `hublot-big-bang.md`, `richard-mille-rm-001.md`, `girard-perregaux-tourbillon-ba-cau.md` (dựng ngày 16/08/2026 từ nguồn anh Vinh cấp)

### 1. Thông số kỹ thuật của chín trên mười mẫu

- Các trường `movement`, `power_reserve`, `water_resistance` không đối chiếu được từ nguồn chính hãng cho phần lớn mẫu. Chỉ Chanel J12 có `movement: Calibre 12.1`.
- **Hành động đã làm:** để trống các trường còn lại — bảng thông số tự bỏ dòng không có dữ liệu.

### 2. Các thế hệ tham chiếu của cả mười mẫu

- Không đối chiếu được danh sách reference từ nguồn chính hãng.
- **Hành động đã làm:** để trống `references`.

### 3. Năm ra mắt dòng Luminor và Altiplano

- Trang chính hãng mô tả nguồn gốc tên gọi nhưng không nêu năm ra mắt dòng.
- **Hành động đã làm:** không đặt `year` cho hai mẫu này.

### 4. Năm ra mắt DiaStar so với Captain Cook

- Nguồn nói cả hai cùng năm 1962 nhưng không nêu thứ tự.
- **Hành động đã làm:** không suy đoán mẫu nào trước.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 42. Gói 2 — mười sáu mẫu iconic mới; số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** 16 file mới trong `src/content/mauIconic/vi/` (dựng ngày 16/08/2026 từ nguồn anh Vinh cấp): `universal-geneve-polerouter.md`, `eterna-matic-1948.md`, `swatch-sistem51.md`, `vostok-amphibia.md`, `nomos-tangente.md`, `junghans-max-bill.md`, `stowa-flieger.md`, `bell-ross-br-01.md`, `oris-aquis-depth-gauge.md`, `seagull-1963.md`, `timex-marlin.md`, `montblanc-minerva-monopusher.md`, `roger-dubuis-excalibur.md`, `parmigiani-toric.md`, `chopard-luc.md`, `mido-multifort.md`

### 1. Thông số kỹ thuật của toàn bộ mười sáu mẫu

- Các trường `movement`, `power_reserve`, `water_resistance` không đối chiếu được từ nguồn chính hãng cho mẫu cụ thể.
- **Hành động đã làm:** để trống hết — bảng thông số tự bỏ dòng không có dữ liệu.

### 2. Các thế hệ tham chiếu

- Không đối chiếu được.
- **Hành động đã làm:** để trống `references`.

### 3. Năm ra mắt của tám mẫu

- Amphibia, Tangente, Aquis Depth Gauge, Marlin, Minerva Monopusher, Excalibur, L.U.C, Multifort — nguồn không nêu năm (đề ghi "bảy mẫu" nhưng liệt kê tám tên; thực tế bỏ year ở cả tám).
- **Hành động đã làm:** không đặt `year`.

### 4. Năm ra mắt Amphibia và tên các nhà thiết kế Vostok

- Chỉ có ở nguồn thứ cấp.
- **Hành động đã làm:** viết trong nội dung với cách diễn đạt thận trọng ("được ghi nhận rộng rãi"), **không nêu năm, không nêu tên người**.

### 5. Calibre dùng cho mẫu Oris Aquis Depth Gauge

- Không xác nhận được mẫu này dùng Calibre 400 hay bộ máy khác.
- **Hành động đã làm:** **không gán calibre cho mẫu**; bài chỉ nêu Calibre 400 như năng lực chung của hãng, có chú thích rõ.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 43. Gói 3 — chín mẫu iconic mới; số liệu cố tình bỏ khỏi bài vì chưa kiểm chứng được

- **Vị trí:** 9 file mới trong `src/content/mauIconic/vi/` (dựng ngày 16/08/2026 từ nguồn anh Vinh cấp): `mbf-horological-machine-1.md`, `urwerk-ur-105.md`, `de-bethune-db28.md`, `voutilainen-vingt-8.md`, `laurent-ferrier-galet-classic.md`, `hajime-asaoka-project-t.md`, `credor-eichi-2.md`, `minase-horizon.md`, `h-moser-streamliner.md`

### 1. Thông số kỹ thuật của toàn bộ chín mẫu

- Không đối chiếu được từ nguồn chính hãng.
- **Hành động đã làm:** để trống `movement`, `power_reserve`, `water_resistance`.

### 2. Năm ra mắt Project T

- Nguồn chính là hồ sơ AHCI nêu mốc 2009 cho chiếc tourbillon in-house đầu tiên, nhưng năm ra mắt riêng của Project T chỉ có ở nguồn thứ cấp.
- **Hành động đã làm:** không đặt `year`, chỉ nêu mốc 2009 trong nội dung.

### 3. Chi tiết Project T dùng vòng bi thay chân kính hồng ngọc

- Chỉ thấy ở nguồn thứ cấp, không có ở hồ sơ AHCI.
- **Hành động đã làm:** không nhắc tới.

### 4. Năm ra mắt UR-105, DB28, Horizon

- Nguồn không nêu.
- **Hành động đã làm:** không đặt `year`.

### 5. Sản lượng hằng năm của MB&F, Urwerk, De Bethune, Voutilainen, Laurent Ferrier

- Chỉ có số liệu của H. Moser.
- **Hành động đã làm:** không suy đoán cho các hãng còn lại.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 44. Bổ sung thông số kỹ thuật cho tám bài mẫu iconic — số liệu cố tình bỏ

- **Bối cảnh:** Ngày 16/08/2026 bổ sung `movement`/`power_reserve`/`water_resistance` cho 8 bài theo giá trị anh Vinh cấp (chép nguyên văn): tissot-prx, oris-aquis-depth-gauge, doxa-sub-300, chanel-j12, nomos-tangente, panerai-luminor, bvlgari-octo-finissimo, junghans-max-bill. Các mục dưới vẫn để trống vì chưa có con số thống nhất.

### 1. Mức chống nước của NOMOS Tangente

- Nguồn nêu khoảng 3 tới 5 atm tùy bản, không có con số thống nhất cho bản lên dây tay.
- **Hành động đã làm:** không đặt `water_resistance`.

### 2. Mức chống nước của Panerai Luminor

- Trang sản phẩm chính hãng không nêu trong phần tra được.
- **Hành động đã làm:** không đặt.

### 3. Mức chống nước của Bvlgari Octo Finissimo

- Trang sản phẩm chính hãng không nêu trong phần tra được.
- **Hành động đã làm:** không đặt.

### 4. Mức chống nước của Junghans max bill

- Cùng dòng nhưng có bản 5 bar, có bản 3 bar.
- **Hành động đã làm:** không lấy một bản làm đại diện.

### 5. Tên calibre của Doxa SUB 300

- Trang chính hãng mô tả bộ máy đạt chứng nhận COSC nhưng không nêu tên calibre.
- **Hành động đã làm:** không đặt `movement`; nội dung ghi "bộ máy ba kim tự lên dây đạt chứng nhận Chronometer của COSC".

### 6. Toàn bộ thông số của Stowa Flieger

- Dòng này có quá nhiều biến thể về cỡ vỏ, cấp bộ máy Sellita và mức chống nước. Không mẫu nào đại diện được cho cả dòng.
- **Hành động đã làm:** để trống toàn bộ.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 45. Đợt 2 bổ sung thông số — mười một bài mẫu iconic; số liệu cố tình bỏ

- **Bối cảnh:** Ngày 16/08/2026 bổ sung thông số cho 11 bài theo giá trị anh Vinh cấp (chép nguyên văn): breitling-navitimer, hublot-big-bang, breguet-type-xx, vostok-amphibia, hamilton-ventura, timex-marlin, rado-diastar, piaget-altiplano, swatch-sistem51, longines-lindbergh, fpjourne-chronometre-bleu. Các mục dưới vẫn để trống.

### 1. Mức chống nước của Piaget Altiplano

- Trang chính hãng chỉ nói chung rằng phần lớn đồng hồ Piaget chống nước ít nhất 30 mét, không có con số riêng cho Altiplano.
- **Hành động đã làm:** không đặt.

### 2. Mức chống nước của Swatch Sistem51

- Thay đổi theo từng bản trong dòng, không có con số chung.
- **Hành động đã làm:** không đặt.

### 3. Mức chống nước của F.P. Journe Chronomètre Bleu

- Trang chính hãng không nêu.
- **Hành động đã làm:** không đặt.

### 4. Tên calibre của Timex Marlin và Longines Lindbergh

- Trang sản phẩm mô tả bộ máy nhưng không nêu tên calibre.
- **Hành động đã làm:** không đặt `movement`.

- **Trạng thái:** VẪN TREO (16/08/2026). Chờ anh Vinh kiểm chứng thêm.

---

## 46. Mười một bài mẫu iconic không có thông số kỹ thuật — đã tra cứu và xác nhận không lấy được từ nguồn chính hãng

- **Bối cảnh:** Kết quả tra cứu ngày 11/08/2026. Các bài dưới đây **không được bổ sung thông số** trong các đợt điền thông số trước đó — không phải bỏ sót, mà là đã tra và không tìm được thông số đủ tin cậy. **Không sửa các bài này cho tới khi có dữ liệu kiểm chứng được.**

| Bài | Lý do |
|---|---|
| `bell-ross-br-01.md` | Trang chính hãng hiện chỉ còn thông số dòng **BR-03**, là bản vỏ nhỏ hơn. **Không gán thông số BR-03 cho bài về BR-01** |
| `greubel-double-tourbillon.md` | Có nhiều bản khác nhau, trữ cót chênh lệch lớn giữa các bản. Không bản nào đại diện được |
| `fc-heart-beat.md` | Calibre FC-810 tra được thuộc dòng **Monolithic**, không phải dòng Heart Beat. Các mẫu Heart Beat dùng dòng FC-310 nhưng không có bảng thông số chi tiết |
| `universal-geneve-polerouter.md` | Hãng đang trong giai đoạn trở lại thị trường, chưa có bảng thông số sản phẩm hiện hành |
| `eterna-matic-1948.md` | Tình trạng hoạt động của hãng không xác minh được, trang sản phẩm không cập nhật |
| `montblanc-minerva-monopusher.md` | Không tìm được trang sản phẩm riêng cho mẫu dùng bộ máy Minerva |
| `girard-perregaux-tourbillon-ba-cau.md` | Mẫu phức tạp cao cấp, trang sản phẩm không công bố bảng thông số đầy đủ |
| `seagull-1963.md` | Thông số bộ máy ST19 đã có trong bài thương hiệu Seagull, nhưng **không xác minh được mẫu 1963 dùng biến thể nào** trong dòng ST19 |
| `dufour-simplicity.md` | Philippe Dufour không có trang web chính thức |
| `richard-mille-rm-001.md` | Trang mẫu lịch sử mô tả quá trình chế tác nhưng không có bảng thông số |
| `stowa-flieger.md` | Dòng có quá nhiều biến thể về cỡ vỏ, cấp bộ máy Sellita và mức chống nước |

- **Ghi chú:** đây là kết quả tra cứu ngày 11/08/2026. Nếu sau này các hãng cập nhật trang sản phẩm, có thể tra lại.
- **Cập nhật 16/08/2026:** `seagull-1963.md` đã được điền `movement: ST19 / ST1901` kèm bảng thông số ST1901 lấy từ **Caliber Corner — nguồn cộng đồng, không phải chính hãng** (ngoại lệ đầu tiên trên trang, có ghi chú rõ trong bài và trong nhãn nguồn). Mười bài còn lại trong bảng trên vẫn trống.
- **Trạng thái:** VẪN TREO (16/08/2026). Chờ nguồn cập nhật rồi tra lại.

---

## 47. Mốc năm sản xuất Rolex Submariner reference 14060 và 14060M

- **Vị trí:** `src/content/mauIconic/vi/rolex-submariner.md` — mục "Các thế hệ tham chiếu (reference)"
- **Bối cảnh:** Bài vốn ghi `**14060M** (1989–2012)`. Khoảng năm này gộp hai reference khác nhau là 14060 và 14060M thành một, nên không chắc chắn áp cho reference nào.
- **Hành động đã làm (16/08/2026):** theo nguyên tắc bỏ số liệu không chắc chắn, đã bỏ hẳn khoảng năm trong ngoặc. Dòng mới: `**14060 và 14060M** — thế hệ "No Date" (không lịch), được yêu thích vì thiết kế đối xứng.`
- **Cần kiểm chứng:** mốc năm sản xuất chính xác của từng reference 14060 và 14060M.
- **Trạng thái:** VẪN TREO (16/08/2026). Chờ dữ kiện kiểm chứng được thì bổ sung lại từng reference.

---

## 48. Câu "mẫu đồng hồ lặn đầu tiên được sản xuất hàng loạt" trong bài Rolex Submariner

- **Vị trí:** `src/content/mauIconic/vi/rolex-submariner.md` — phần "Bối cảnh ra đời"
- **Câu/ý đang hiển thị:** "Rolex phản hồi bằng **Submariner** — mẫu đồng hồ lặn đầu tiên được sản xuất hàng loạt, ra mắt công chúng năm 1954."
- **Lý do cần kiểm chứng:** Rolex chính thức chỉ khẳng định mức hẹp hơn — đồng hồ lặn đầu tiên đạt 100m (trang mẫu + Newsroom Rolex, truy cập 30/08/2026). Hai nguồn chuyên ngành (Monochrome, Bob's Watches) ghi Fifty Fathoms của Blancpain ra mắt **vài tháng trước** trong cùng năm 1953. Cụm "sản xuất hàng loạt" không có trong nguồn nào. Riêng "ra mắt công chúng năm 1954" khớp nguồn (Monochrome: ra mắt hội chợ Basel 1954; Hodinkee: 1954 là thời điểm Rolex chính thức công bố và bán ra).
- **Dữ liệu đối chiếu:** `docs/ho-so-du-lieu-tien-hoa-rolex-submariner.md` (30/08/2026) — phần 5 "Rủi ro nội dung đang xuất bản".
- **Hành động đã làm (30/08/2026):** thay câu cũ bằng: "Rolex đáp lại bằng **Submariner** — theo Rolex, đây là đồng hồ lặn đầu tiên đạt mức chống nước 100m. Những chiếc reference 6204 sớm nhất được định ngày cuối năm 1953; Rolex công bố mẫu này tại Basel năm 1954." — chỉ khẳng định đúng phạm vi Rolex xác nhận (đồng hồ lặn đầu tiên đạt 100m), bỏ cụm "sản xuất hàng loạt", giữ mốc công bố Basel 1954.
- **Nguồn căn cứ khi sửa:** `docs/ho-so-du-lieu-tien-hoa-rolex-submariner.md` (nguồn S1 Rolex chính thức, S3 Monochrome, S7 Hodinkee, S8 Bob's Watches); frontmatter bài bổ sung Hodinkee Reference Points + Monochrome Part 1 + Part 2, kèm `updated: "2026-08-30"`.
- **Trạng thái:** ĐÃ GIẢI QUYẾT (30/08/2026). Đã diễn đạt lại theo nguồn, cờ `CẦN ƯU TIÊN KIỂM CHỨNG` gỡ khỏi mục này. Lịch sử lý do ban đầu giữ nguyên ở trên.

---

## 49. Dòng "6204 (1953) — thế hệ đầu tiên" trong bài Rolex Submariner

- **Vị trí:** `src/content/mauIconic/vi/rolex-submariner.md` — mục "Các thế hệ tham chiếu (reference)"
- **Câu/ý đang hiển thị:** "**6204** (1953) — thế hệ đầu tiên, dấu chấm gốc của mọi Submariner sau này."
- **Lý do cần kiểm chứng:** hai nguồn chuyên ngành ủng hộ câu này (Monochrome và Hodinkee Reference Points: 6204 là reference đầu tiên có chữ "Submariner" trên mặt số; mẫu sớm nhất định ngày cuối 1953 bằng số serial và tem nắp sau). Nhưng có nguồn thị trường/đấu giá (Rolex Passion Market) gọi **6200** là "chiếc Submariner đầu tiên" ra 1953, và năm sản xuất của 6200 còn ba dải khác nhau giữa các nguồn (1953 / 1954 / 1955–1956) — chưa chốt được vai trò "ai ra trước".
- **Dữ liệu đối chiếu:** `docs/ho-so-du-lieu-tien-hoa-rolex-submariner.md` (30/08/2026) — bảng 1 (6204), bảng 2 (6200) và phần 5.
- **Hành động đã làm (30/08/2026):** thay dòng cũ bằng: "**6204** (1953) — reference đầu tiên mang chữ "Submariner" trên mặt số; những mẫu sớm nhất được định ngày cuối năm 1953." — chỉ khẳng định điều đã kiểm chứng được cho 6204 (chữ trên mặt số + định ngày cuối 1953); bỏ các cụm "thế hệ đầu tiên" và "dấu chấm gốc của mọi Submariner" do nguồn còn khác biệt về vai trò và năm của reference 6200 (bảng 2 hồ sơ).
- **Nguồn căn cứ khi sửa:** `docs/ho-so-du-lieu-tien-hoa-rolex-submariner.md` (S3 Monochrome, S7 Hodinkee); frontmatter bài bổ sung Hodinkee Reference Points + Monochrome Part 1 + Part 2, kèm `updated: "2026-08-30"`.
- **Trạng thái:** ĐÃ GIẢI QUYẾT (30/08/2026). Đã diễn đạt lại theo nguồn, cờ `CẦN ƯU TIÊN KIỂM CHỨNG` gỡ khỏi mục này. Lịch sử lý do ban đầu giữ nguyên ở trên.

---

## 50. Cụm "thế hệ cổ điển được sưu tầm nhiều nhất" trong bài Rolex Submariner

- **Vị trí:** `src/content/mauIconic/vi/rolex-submariner.md` — mục "Các thế hệ tham chiếu (reference)", dòng 5513
- **Câu/ý đang hiển thị:** "**5513** (1962–1989) — thế hệ cổ điển được sưu tầm nhiều nhất."
- **Lý do cần kiểm chứng:** niên đại 1962–1989 đã khớp nguồn (Monochrome và Hodinkee đều ghi 5513 ra 1962, sản xuất liền 27 năm). Nhưng cụm "được sưu tầm nhiều nhất" là siêu tuyệt đối **không tìm thấy trong bất kỳ nguồn nào đã xem** — nguồn chuyên ngành chỉ mô tả 5513 là reference quan trọng và được chú ý cao của giới sưu tầm, không có bảng xếp hạng nào để căn cứ.
- **Dữ liệu đối chiếu:** `docs/ho-so-du-lieu-tien-hoa-rolex-submariner.md` (30/08/2026) — bảng 1 (5513) và phần 5.
- **Hành động đã làm (30/08/2026):** thay dòng cũ bằng: "**5513** (1962–1989) — bản không lịch, không chứng nhận chronometer, sản xuất liền 27 năm." — giữ đúng các dữ kiện có nguồn trực tiếp; bỏ cụm xếp hạng "được sưu tầm nhiều nhất" vì không tìm thấy trong bất kỳ nguồn nào đã xem.
- **Nguồn căn cứ khi sửa:** `docs/ho-so-du-lieu-tien-hoa-rolex-submariner.md` (S4 Monochrome, S7 Hodinkee — cùng ghi 5513 ra 1962, sản xuất liền 27 năm); frontmatter bài bổ sung Hodinkee Reference Points + Monochrome Part 1 + Part 2, kèm `updated: "2026-08-30"`.
- **Trạng thái:** ĐÃ GIẢI QUYẾT (30/08/2026). Đã diễn đạt lại theo nguồn, cờ `CẦN ƯU TIÊN KIỂM CHỨNG` gỡ khỏi mục này. Lịch sử lý do ban đầu giữ nguyên ở trên.


