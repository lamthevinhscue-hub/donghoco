# Biên bản nghiệm thu — cụm "Độ chính xác & chứng nhận" (COSC / Master Chronometer) song ngữ (Prompt 38)

- **Ngày nghiệm thu:** 04/09/2026
- **Phạm vi:** chuẩn hóa nguồn 3 bài tiếng Việt (`huongDan/vi/do-sai-so.md`, `tuDien/vi/chronometer.md`, `tuDien/vi/metas.md`) và xuất bản 3 bài English mới (`huongDan/en/accuracy-tracking.md` → `/en/guides/accuracy-tracking/`, `tuDien/en/chronometer.md` → `/en/glossary/chronometer/`, `tuDien/en/master-chronometer.md` → `/en/glossary/master-chronometer/`).
- **Tài liệu kèm theo:** hồ sơ nguồn `docs/ho-so-nguon-cum-do-chinh-xac-chung-nhan-song-ngu.md` (nguyên văn từng nguồn + phạm vi nâng đỡ + claim đã loại + ghi nhận N001 PDF không tải được tự động).
- **Trạng thái cuối phiên:** **chưa commit, chưa push** — 14 tệp sửa/tạo chờ anh quyết định.

## 1. Tệp sửa / tạo (14)

**Sửa (8):**
1. `src/content/huongDan/vi/do-sai-so.md` — viết lại thành hướng dẫn ghi nhận trung tính
2. `src/content/tuDien/vi/chronometer.md` — viết lại theo nguồn COSC
3. `src/content/tuDien/vi/metas.md` — viết lại theo nguồn METAS
4. `src/i18n/contentRoutes.ts` — +3 cặp (47 → 50 cặp)
5. `scripts/check-english-launch.mjs` — REQUIRED_EN 43 → 46
6. `package.json` — `check:precision-certification` vào cuối `npm run check` + alias riêng
7. `src/data/glossary-terms.json` — sinh lại tự động bởi `generate-glossary-terms.mjs` khi build (thay đổi 10 dòng: mục từ chronometer/metas theo title/excerpt mới)
8. `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` — cập nhật lần 17 (mốc, commit nền `7eeebc1`, số liệu build thật 272 trang/19.084 link/50 URL `/en/`, 46 route, launch pack 50 cặp, hồ sơ + biên bản P38)

**Tạo (6):**
9. `src/content/huongDan/en/accuracy-tracking.md`
10. `src/content/tuDien/en/chronometer.md`
11. `src/content/tuDien/en/master-chronometer.md`
12. `scripts/check-precision-certification-cluster.mjs`
13. `docs/ho-so-nguon-cum-do-chinh-xac-chung-nhan-song-ngu.md`
14. `docs/nghiem-thu/2026-09-04_nghiem-thu-cum-do-chinh-xac-chung-nhan-song-ngu.md` (biên bản này)

Không đụng `output/`, không đụng các tệp `??` cũ của docs tháng 8.

## 2. Nguồn (xác minh 04/09/2026, nguyên văn tại hồ sơ nguồn)

| Nguồn | Nâng được |
|---|---|
| COSC — Chronometer Certified | Cơ quan trung lập + ISO 3159; số duy nhất khắc trên bộ máy; 12–20 ngày tùy loại; FAQ: máy cơ 15 ngày, 5 vị trí, 8/23/38°C, Average Daily Rate −4/+6 s/ngày; 7 tiêu chí; kết quả thuộc hãng; giấy chứng nhận tùy hãng; danh hiệu có giá trị suốt đời dù hiệu năng có thể thay đổi |
| COSC — Chronograph or Chronometer? | Định nghĩa chronograph (chức năng bấm giờ) ↔ chronometer (chứng nhận); chưa có chuẩn riêng cho chronograph; FAQ gợi ý quan sát: đồng hồ nguyên tử/radio-controlled ("extremely precise sources of time"), quan sát nhiều ngày, thử vị trí/nhiệt độ |
| COSC — COSC certifications | Hai cấp: Chronometer Certified ("generally tested on the movement") và Excellence Chronometer Certified (kiểm đồng hồ hoàn thiện) |
| METAS — trang MASTER CHRONOMETER | Kiểm trên watch head (đồng hồ hoàn thiện); phạm vi: chống nước, hiệu năng chronometric, chống từ, trữ cót; mở cho mọi hãng Swiss Made + bộ máy chronometer ISO 3159; N001 → 1,5 T (15 000 G) |
| METAS N001 (PDF) | **Không tải được tự động** (301 lỗi → HTTP 502) — mọi claim về N001 chỉ lấy từ trang METAS; không rút thêm chi tiết nào (kể cả số "8 bài kiểm") |

## 3. Claim cũ đã loại (chi tiết tại hồ sơ nguồn, mục 2)

- **do-sai-so:** bảng rate ±0–30 s/ngày + nhãn "xuất sắc/tốt/cần service"; amplitude 270–320°/200–240°/180°; beat error 0.0–0.8 ms; app WatchTracker/WatchAccuracy/Kello/Tool Stryi + micro điện thoại; timegrapher 1–2 triệu VND Shopee; khung "24 giờ/7 ngày"; "+2 s/ngày sau 5 ngày"; "giờ internet chính xác tuyệt đối"; cơ chế nguyên nhân (trọng lực/mức cót/từ trường → nhiễm từ) + tourbillon; mẹo 8 giờ/ngày, đặt úp/lộn mặt để sửa, vặn quá căng, dầu khô; bảng "khi nào cần can thiệp" + demagnetize; FAQ toàn bộ (±5–10, Rolex/Omega, regulator, khử từ vài trăm nghìn).
- **chronometer:** "15 ngày" không attribution → sửa thành có nguồn (12–20 ngày tùy loại; FAQ 15 ngày/5 vị trí/3 nhiệt độ); "Hạn chế của COSC… chuẩn cao hơn sinh ra" → hai phạm vi, không xếp hạng; bỏ "số liệu riêng của từng chiếc" sai phạm vi → số duy nhất khắc trên bộ máy + kết quả thuộc hãng.
- **metas:** "tám bài kiểm" (không xác minh được); "chạy đúng sau khi chịu từ trường ngang nam châm y tế"; "loa, điện thoại, còng máy tính bảng là nguồn sai số phổ biến"; "xếp chồng lên COSC… qua hai vòng kiểm độc lập"; "chuẩn nghiêm ngặt nhất", "độ chính xác thực tế", "đeo trên tay thật", "bắt nguồn từ một hãng" — toàn bộ loại.

## 4. Liên kết nội bộ hai chiều (đúng ngôn ngữ)

- vi do-sai-so ↔ chronometer, metas, chong-tu, bao-duong-dong-ho
- vi chronometer ↔ chronograph, metas
- vi metas ↔ day-cot, chronometer
- EN accuracy-tracking ↔ /en/glossary/chronometer/, /en/glossary/master-chronometer/, /en/mechanisms/anti-magnetism/
- EN chronometer ↔ /en/glossary/chronograph/, /en/glossary/master-chronometer/
- EN master-chronometer ↔ /en/glossary/mainspring/, /en/glossary/chronometer/, /en/mechanisms/anti-magnetism/
- Không relatedModels; không link EN về route Việt.

## 5. Kết quả lệnh nghiệm thu (kết quả thật, theo thứ tự đề yêu cầu)

1. **`node scripts/check-precision-certification-cluster.mjs`** — ĐẠT: 3 bài vi + 3 bài en; 3 cặp route; 16 liên kết bắt buộc có và đích tồn tại; R4 sạch; R5 sạch; hồ sơ + biên bản tồn tại. *(Vòng sửa: lỗi cú pháp regex `Range out of order` ở pattern −4/+6 — đã sửa character class. Test tiêm lỗi thật: chèn vào accuracy-tracking.md dòng chứa link `/tu-dien/day-cot` + "±15 giây/ngày là bình thường" → script bắt đúng 3 lỗi ở dòng 39 (R4 + 2 R5), exit 1 → khôi phục từ bản sao → ĐẠT lại, file kết thúc đúng 1 ký tự xuống dòng.)*
2. **`npm run check`** — ĐẠT toàn bộ (cụm độ chính xác & chứng nhận chạy cuối chuỗi, "KẾT LUẬN: ĐẠT").
3. **`npm run build`** — ĐẠT: **272 trang** (222 tiếng Việt + 50 tiếng Anh), Pagefind index 272 trang, "OK: Không phát hiện link nội bộ hỏng", check 3D + check route timeline ĐẠT. `generate-glossary-terms.mjs` trong chuỗi sinh khác biệt tại glossary-terms.json (10 dòng) — đã giữ thay đổi này.
4. **`node scripts/check-english-launch.mjs`** (sau build) — ĐẠT: **đủ 46 route bắt buộc trong dist** (từ 43), 83 link nội bộ `/en/` unique đều tồn tại, **50 trang EN** đúng lang/canonical/hreflang/switcher, **222 trang VI giữ canonical đúng URL**.
5. **`node scripts/check-links.mjs`** (sau build) — OK, không link hỏng: quét **272 trang HTML, 19.084 link**.
6. **`node scripts/check-evolution-routes.mjs`** (sau build) — ĐẠT: Submariner + GMT-Master vi/en 8 mốc khớp dataset.
7. **Sitemap (đếm từ `dist/sitemap-0.xml` sau build):** 271 URL tổng, trong đó **50 URL `/en/`**.
8. **`git diff --check`** — sạch (exit 0).
9. **`git status --short`** — 8 tệp `M` + 6 tệp mới của P38 (mục 1); các `??` cũ của docs tháng 8 giữ nguyên không đụng.

## 6. Chưa kiểm tra (giới hạn trung thực)

- Chưa nghiệm thu thủ công trên trình duyệt (desktop/mobile), bàn phím thật, trình đọc màn hình thật cho 3 route EN mới — bộ kiểm ở trên là kiểm tĩnh mã nguồn + HTML build.
- Chưa có dữ liệu Search Console/Analytics; cụm là nội dung theo nguồn, không cam kết hiệu quả SEO.
- METAS N001 PDF chưa đọc trực tiếp được (502) — chi tiết N001 chỉ dừng ở tiêu đề tài liệu mà trang METAS công bố.

## 7. Xác nhận

**Chưa tự commit, chưa tự push.** Toàn bộ 14 tệp chờ anh xem và commit.
