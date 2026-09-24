# BIÊN BẢN GÓI H14-A — HỒ SƠ CHỌN CỤM NỘI DUNG MỚI

**Mã gói:** H14-A — danh mục DHC-H14-20260919 v1.0.0, giao dịch TXN-20260919-105
**Ngày thực hiện:** 20/09/2026 (+0700)
**Trạng thái:** hồ sơ lựa chọn hoàn thành — **chờ GPT Work nghiệm thu + anh Vinh quyết (chọn/bác hướng khuyến nghị; có mở H14-B)**; chưa viết bài xuất bản, chưa tạo URL; chưa stage/commit/push/deploy
**HEAD lúc bắt đầu:** `5bae113` = `origin/main`, nhánh `main`; không tracked đang sửa
**Phạm vi:** chỉ hồ sơ + công cụ kiểm nội bộ (`output/h14-a-cluster-proposal/`). **Không sửa** `src/`, `public/`, `scripts/`, `package.json`, cấu hình, route, navigation, sitemap, RSS, CAN-KIEM-CHUNG.md.

## 1. Ba hướng đã rà (thư viện đối chiếu trực tiếp với `src`)

### Hướng 1 — Nghề chế tác và chuỗi sản xuất (manufacture, établisseur, ébauche, ETA/Sellita, giới hạn "in-house")
- **Độc giả mục tiêu:** người mới đã hiểu bộ máy cơ bản, đang bị nhiễu bởi từ khoá "in-house", "manufacture", "ETA" trong quảng cáo và diễn đàn — cần biết ai thực sự làm ra chiếc đồng hồ và từ ngữ có nghĩa gì.
- **Câu hỏi cần trả lời:** "Hãng tự làm hết thì tốt hơn?" — "Établisseur/finishing shop là gì?" — "ETA/Sellita là gì, bộ máy 'chung' có kém?" — "Ébauche nghĩa là gì?"
- **Hiện có liên quan:** `/co-che/bo-may-in-house` (VI — định nghĩa in-house theo FHH Manufacture, "không tự động tốt hơn"), `/tu-dien/calibre` (VI+EN), `/tu-dien/movement`. **Thiếu:** manufacture/établisseur/ébauche/chuỗi sản xuất/ETA-Sellita.
- **Nguy cơ trùng:** có — bài in-house hiện có đã chạm định nghĩa FHH. Xử lý: cụm mới đặt vai trò **mở rộng chuỗi sản xuất**, liên kết chéo về bài in-house, KHÔNG lặp luận điểm "in-house không tốt hơn".
- **Nguồn chính thức đã truy cập 20/09 (5 nguồn, trích nguyên văn trong `output/h14-a-cluster-proposal/ho-so-huong-1-chuoi-san-xuat.md`):** FHH Encyclopedia/Manufacture; FHH Encyclopedia/Ebauche; FHH Encyclopedia/Etablisseur; sellita.ch (tin tức SW200-1/SW200-2 Power+ 65 giờ, địa chỉ La Chaux-de-Fonds); eta.ch/fr/entreprise/histoire (Ebauches SA → ETA 1985, "motoriste du temps" của Swatch Group, ébauches Fontainemelon 1793).
- **Công duy trì:** thấp — claim chủ yếu định nghĩa/lịch sử đã chốt, ít thông số thay đổi.

### Hướng 2 — Vật liệu (vỏ, dây tóc, giới hạn diễn giải)
- **Độc giả mục tiêu:** người mới so sánh vỏ gốm/thép/bronze và nghe "dây tóc silicon".
- **Câu hỏi:** "Gốm có dễ vỡ không?", "Silicon khác kim loại chỗ nào, có cần bôi trơn?", "Vật liệu ảnh hưởng bảo dưỡng ra sao?"
- **Hiện có:** `/co-che/kinh-dong-ho`, `/co-che/day-toc-banh-lac` (VI+EN), `/co-che/da-quang`, mốc `silicon-revival` (nguồn Omega/METAS/Patek). **Thiếu:** bài tổng hợp vật liệu dây tóc/vỏ.
- **Nguy cơ:** claim vật liệu dễ trượt thành chứng cứ kỹ thuật; một nguồn hãng (Rolex Syloxi) đã ghi "chưa xác minh được" trong hồ sơ H07-A → rủi ro lặp lại. Nguồn Omega/METAS/Patek fetch lần 12/09 — **chưa fetch lại hôm nay**.
- **Công duy trì:** trung bình–cao.

### Hướng 3 — Phức tạp còn thiếu (rattrapante, giờ thế giới, giờ nhảy, phương trình thời gian)
- **Độc giả mục tiêu:** người đã đọc bài chronograph/GMT muốn mở rộng.
- **Câu hỏi:** "Rattrapante khác chronograph thường?", "Giờ thế giới khác GMT?", "Giờ nhảy hoạt động thế nào?", "Phương trình thời gian là gì?"
- **Hiện có:** chronograph, gmt, perpetual-calendar, pha-trang, diem-chuong, tourbillon (VI+EN). **Thiếu:** cả 4 chủ đề trên.
- **Nguy cơ:** 4 chủ đề **rời nhau** — khó thành một cụm liền mạch; "giờ thế giới" phải phân biệt với GMT (trùng một phần có kiểm soát); nguồn lịch sử chính thức cho worldtime/giờ nhảy khó truy cập (nhiều nguồn wiki/blog không dùng được theo quy chuẩn); một số mẫu gắn thương hiệu → rủi ro tái tạo sản phẩm. **Chưa fetch nguồn nào của hướng này.**
- **Công duy trì:** trung bình.

## 2. Bảng so sánh và khuyến nghị

| Tiêu chí | H1 Chuỗi sản xuất | H2 Vật liệu | H3 Phức tạp thiếu |
|---|---|---|---|
| Khoảng trống biên tập | Lớn, liền mạch (chưa ai viết manufacture/établisseur/ébauche/ETA) | Lớn nhưng rải (nhiều mảnh nhỏ) | Lớn, rời nhau (4 chủ đề độc lập) |
| Nguồn chính thức đã xác minh hôm nay | **5 nguồn (FHH ×3 + Sellita + eta.ch)** | 0 (nguồn cũ 12/09 cần fetch lại) | 0 |
| Nguy cơ trùng lặp | Trung bình (bài in-house — xử lý được bằng liên kết chéo) | Thấp–trung bình | GMT trùng một phần |
| Nguy cơ "chứng cứ kỹ thuật/sản phẩm" | Thấp (định nghĩa + chuỗi giá trị) | Trung bình | Trung bình |
| Công duy trì | **Thấp** | Trung bình–cao | Trung bình |
| Điểm nối vào thư viện hiện hữu | Nhiều (in-house, calibre, chronometer, movement) | Trung bình (kinh-dong-ho, day-toc) | Trung bình (chronograph, gmt) |
| Cần cấu trúc/nav mới | **Không** (nằm trong `/co-che/`) | Không | Không |

**Khuyến nghị: HƯỚNG 1 — nghề chế tác và chuỗi sản xuất.** Lý do: nguồn chính thức xác minh được ngay trong lượt này (3 nguồn, nguyên văn); khối trống lớn nhất và liền mạch nhất; công duy trì thấp; đã có sẵn điểm nối mạnh (bài in-house + calibre + chronometer).

## 2b. Vòng sửa 1 (TXN-20260919-107) — tách claim theo đúng nguồn chứng minh

GPT Work xác nhận: (1) trang ETA không chứng minh định nghĩa ébauche — chỉ chứng minh lịch sử Ebauches SA/Fontainemelon 1793/ETA 1985/Swatch Group; (2) runner cũ ghi JSON ngoài phạm vi (docs/nghiem-thu/) và chỉ giữ kết quả tệp chạy cuối.

Đã sửa: bổ sung 2 nguồn FHH chuyên biệt (Ebauche, Etablisseur) cho định nghĩa; thu hẹp claim ETA đúng 4 điểm lịch sử/vị trí; viết lại runner quét MỘT lượt cả 3 tệp cố định và xuất MỘT JSON tổng hợp trong output/h14-a-cluster-proposal/; xóa tệp JSON lạc; thêm mutation chèn route ma trên cây tạm.

## 2c. Vòng sửa 2 (TXN-20260919-110, ngày 24/09/2026) — đồng bộ số đo và tách loại URL

GPT Work xác nhận 3 lỗi có bằng chứng: (1) mục 6 ghi 16 route và 5 URL nguồn, checker thực chạy báo 12 route và 7 URL; (2) chỉ số "route dự kiến loại trừ" chứa `/co-che` và `/en/mechanisms` — hai route HIỆN HỮU, không phải route dự kiến; (3) 7 URL checker đếm gồm cả 2 URL được ghi rõ chưa truy cập/404, không được gọi chung là nguồn đã xác minh.

Đã sửa: mục 6 ghi đúng số đo thực (12 route hiện hữu; 5 nguồn đã xác minh + 2 URL tham khảo tách riêng); xóa hẳn chỉ số "route dự kiến loại trừ" khỏi checker vì hồ sơ chưa nêu route mới cụ thể (chưa mở H14-B); checker phân loại URL theo hai tập chuẩn cứng — đúng 5 URL đã truy cập và dùng cho claim tính là nguồn đã xác minh, đúng 2 URL tham khảo (chưa truy cập/404) tính riêng, mọi URL khác → lỗi; cụm "route dự kiến dưới `/co-che/` và `/en/mechanisms/`" ở mục 3 đổi thành diễn đạt không gắn path hiện hữu với vai trò route dự kiến.

## 3. Cụm đề xuất (3 bài + 1 phương án mở rộng; VI+EN mỗi bài)

| # | Bài (VI dưới `/co-che/`, EN dưới `/en/mechanisms/` — hai thư mục hiện hữu; slug cụ thể chờ H14-B, chưa nêu route mới nào) | Mục tiêu không trùng |
|---|---|---|
| 1 | "Manufacture và établisseur — ai thực sự làm ra chiếc đồng hồ" (bài mẫu — dàn ý mục 4) | Định nghĩa hai vai trò theo FHH, phân biệt với finishing shop |
| 2 | "Ébauche — bộ máy bán thành phẩm và chuỗi cung ứng" | Giải thích ébauche + nguồn gốc xưởng ébauches (nguồn eta.ch) |
| 3 | "ETA và Sellita — bộ máy 'chung' trong ngành" | Nhà cung cấp bộ máy: ETA (Swatch Group) và Sellita (La Chaux-de-Fonds, SW200-1/SW200-2) |
| (4, tuỳ) | "Giới hạn của 'in-house' — bổ sung góc nhìn chuỗi sản xuất" | Chỉ làm nếu anh Vinh muốn; phải phối hợp bài `/co-che/bo-may-in-house` để không lặp |

**Liên kết dự kiến vào thư viện hiện hữu:** bài 1 → `/co-che/bo-may-in-house` (về), `/tu-dien/calibre`, `/tu-dien/movement`; bài 2 → `/tu-dien/calibre`, `/en/glossary/calibre/`; bài 3 → `/co-che/chronograph`, `/tu-dien/chronometer`. Không cần mục điều hướng hay cấu trúc mới — cụm nằm trong `/co-che/` (VI) và `/en/mechanisms/` (EN) theo cấu trúc hiện hành; nếu muốn trang gom cụm (hub), chỉ mô tả: cần thêm 1 route + 1 mục navigation — **chờ anh quyết, không tự làm**.

## 4. Bài mẫu đầu tiên — bài 1: "Manufacture và établisseur — ai thực sự làm ra chiếc đồng hồ cơ?"

**Dàn ý VI:**
1. Mở — câu hỏi "hãng tự làm hết?" không có câu trả lời nhị phân (FHH phân ba vai trò: manufacture, finishing shop, établisseur).
2. Manufacture là gì — nguyên văn FHH ("manufactures a watch almost in its entirety") + giới hạn (FHH không nêu tiêu chí bộ máy riêng; mỗi hãng dùng từ trong thực tế khác nhau — ghi là quan sát, không trích).
3. Finishing shop và établisseur — établisseur theo nguyên văn FHH Etablisseur ("a watchmaker who buys ébauches and parts to then assemble them") — giới hạn: trang chỉ nêu lắp ráp.
4. Ébauche — nguyên văn FHH Ebauche: "An unfinished movement sold as such"; định nghĩa hiện đại "always without its regulating organ, mainspring, dial and hands"; trước ~1850 chỉ gồm đế, cầu, fusee, hộp cót; còn gọi blanc roulant.
5. Ví dụ hiện đại — Sellita (La Chaux-de-Fonds; SW200-1; SW200-2 Power+ 65 giờ) + **giới hạn**: trang chính thức hiện chỉ có tin tức, không có mô tả vai trò đầy đủ.
6. ETA trong hệ sinh thái Swatch Group — lịch sử Ebauches SA → ETA một công ty 1985; "motoriste du temps" (nguyên văn eta.ch; giới hạn: ETA chỉ chứng minh các claim lịch sử/vị trí này).
7. Về từ "in-house" — liên kết `/co-che/bo-may-in-house` (đã có bài chuyên sâu; bài này KHÔNG lặp luận điểm chất lượng).
8. Tóm tắt — tên vai trò ≠ nhãn chất lượng; chuỗi giá trị nhiều bên.
9. Đọc thêm — in-house, calibre, chronometer.

**Dàn ý EN:** tương đương từng mục (What a manufacture is — per the FHH; finishing shops and établisseurs; ébauche; a modern example — Sellita; ETA inside the Swatch Group ecosystem; where "in-house" fits; in short; further reading).

**Hồ sơ claim từng mục** (URL, trích, ngày kiểm, mức chắc chắn, giới hạn): `output/h14-a-cluster-proposal/ho-so-huong-1-chuoi-san-xuat.md` — 6 claim tách theo đúng nguồn chứng minh (vòng sửa 1): định nghĩa ébauche → FHH Ebauche; định nghĩa établisseur → FHH Etablisseur; lịch sử Ebauches SA/Fontainemelon 1793/ETA 1985/motoriste Swatch Group → eta.ch; manufacture → FHH Manufacture; Sellita mức **trung bình** (đã ghi giới hạn). **Không đoán năm, calibre, thông số:** mọi năm (1793, 1985, 65 giờ) đều nằm trong câu trích đã nêu; không giữ claim nào mà URL được nêu không chứng minh trực tiếp; không dùng nguồn không truy cập được.

## 5. Quyết định còn chờ anh Vinh

1. Chọn **hướng khuyến nghị (H1 chuỗi sản xuất)** hoặc bác/chọn hướng khác (H2/H3).
2. Có mở **H14-B** để viết cụm 3 bài (VI+EN) hay không; nếu mở, có thêm bài thứ 4 ("Giới hạn của in-house") không.
3. Nếu muốn trang gom cụm (hub) riêng cho cụm: quyết định sau khi H14-B có bài — hiện chưa làm gì.

## 6. Tự kiểm (kết quả thật)

| Kiểm | Cách | Kết quả |
|---|---|---|
| Mọi route nêu trong hồ sơ tồn tại thật | `output/h14-a-cluster-proposal/kiem-route.mjs` — tách bỏ URL tuyệt đối, trích route từ biên bản + 2 tệp hồ sơ, đối chiếu `dist` | **ĐẠT** — 12 route hiện hữu × 3 tệp, 0 route ma (vòng sửa 2: bỏ chỉ số "route dự kiến loại trừ" — hồ sơ chưa nêu route mới cụ thể; `/co-che` và `/en/mechanisms` là route hiện hữu, không phân loại là dự kiến) |
| URL nguồn HTTPS + không dữ liệu nội bộ | cùng script — phân loại theo hai tập chuẩn: đúng 5 URL đã truy cập 20/09 và dùng cho claim tính là **nguồn đã xác minh**; đúng 2 URL tham khảo (chưa truy cập/404, mục dự phòng hồ sơ hướng 1) tính **riêng**; URL khác → lỗi | **ĐẠT** — 5 nguồn đã xác minh (FHH ×3 + Sellita + eta.ch) + 2 URL tham khảo tách riêng, 0 URL lạ chưa phân loại; 0 chuỗi cấm |
| UTF-8/EOF/whitespace | `git diff --check` + đọc tệp | Sạch; 2 tệp .md mới có newline cuối |
| Build | Không chạy — **không thay website** (đúng quy tắc gói) | — |

## 7. Tệp thay đổi

| Tệp | Thay đổi |
|---|---|
| `docs/nghiem-thu/H14-A-de-xuat-cum-noi-dung-2026-09-20.md` | Tạo mới — biên bản/hồ sơ lựa chọn |
| `output/h14-a-cluster-proposal/` | Nội bộ: `ho-so-huong-1-chuoi-san-xuat.md`, `ho-so-huong-2-va-3.md`, `kiem-route.mjs`, `kiem-route-ket-qua.json` |

Không tệp nào dưới `src/`, `public/`, `scripts/`, `package.json` bị thay đổi. Dừng chờ GPT Work nghiệm thu + quyết định của anh Vinh.
