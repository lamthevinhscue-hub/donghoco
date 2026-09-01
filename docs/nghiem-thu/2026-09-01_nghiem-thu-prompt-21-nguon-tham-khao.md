# Biên bản nghiệm thu — Prompt 21: Xử lý ba nguồn tham khảo bị chết và đồng bộ lộ trình

- **Ngày:** 01/09/2026
- **Phạm vi:** 7 bài xuất bản thay URL + `CAN-KIEM-CHUNG.md` + `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` + biên bản này. Không sửa schema, component, template, CSS, thân bài, thông số hay cấu hình.

## 1. Mục tiêu

Thay ba nguồn chính hãng đang trả về 404 bằng địa chỉ chính hãng đang hoạt động trong đủ bảy bài bị ảnh hưởng; gỡ ba cờ `CẦN ƯU TIÊN KIỂM CHỨNG` trong tracker mà vẫn giữ nguyên lịch sử phát hiện; đồng bộ lộ trình phát triển với kết quả các Prompt 19, 20 và 21.

## 2. Mốc Git trước khi làm

- `git log -1 --oneline`: **`5a597a1` "feat(content): hoàn thiện liên kết iconic"** — khớp mốc dự kiến của đề (chủ dự án đã tự commit gói Prompt 20 thay thế).
- `git status --short` trước khi làm: **0 tệp thay đổi** (chỉ các tệp docs/output chưa theo dõi sẵn có của chủ dự án) — không có thay đổi nào trong các tệp thuộc phạm vi Prompt 21 do người khác tạo; không cần dừng theo điều kiện mục 1.
- Nhánh `main`. Không dùng `git add .`/`-A`, không commit, không push trong suốt gói.

## 3. Danh sách tệp đã thay đổi (9 tệp + biên bản)

| # | Tệp | Thay đổi |
|---|---|---|
| 1 | `src/content/thuongHieu/vi/patek-philippe.md` | Thay nhãn + URL nguồn 1; +`updated: "2026-09-01"` |
| 2 | `src/content/thuongHieu/vi/hajime-asaoka.md` | Thay nhãn + URL nguồn Kurono; +`updated: "2026-09-01"` |
| 3 | `src/content/mauIconic/vi/patek-nautilus.md` | Thay nhãn + URL nguồn 2/2 (phát hiện bổ sung khi rà toàn bộ `src/content/`); `updated` cập nhật "2026-08-31" → "2026-09-01"; `relatedModels`, thân bài, thông số, reference giữ nguyên |
| 4 | `src/content/tuDien/vi/chronometer.md` | Thay URL COSC; +`updated: "2026-09-01"` |
| 5 | `src/content/tuDien/vi/metas.md` | Thay URL COSC (nguồn 3/3); +`updated: "2026-09-01"` |
| 6 | `src/content/tuDien/vi/vph.md` | Thay URL COSC (nguồn 2/2); +`updated: "2026-09-01"` |
| 7 | `src/content/huongDan/vi/do-sai-so.md` | Thay URL COSC (nguồn 1/3); +`updated: "2026-09-01"` |
| 8 | `CAN-KIEM-CHUNG.md` | Rà bổ sung 01/09/2026: bảng lịch sử xử lý thay danh sách treo; cập nhật hồ sơ Submariner; bổ sung mục 23/39/40 — lịch sử phát hiện giữ nguyên toàn bộ |
| 9 | `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` | Mốc kiểm tra 01/09/2026; liên kết biên tập 66/66 + 125 mục; nguồn chết đã xử lý; các việc tiếp theo giữ trạng thái treo |
| 10 | `docs/nghiem-thu/2026-09-01_nghiem-thu-prompt-21-nguon-tham-khao.md` | Tạo mới (biên bản này) |

Schema kiểm tra trước khi kết luận: cả ba collection (`thuongHieu`, `tuDien`, `huongDan`) dùng `baseFields` có sẵn trường `updated` trong `src/content/config.ts` — trường hợp lệ, **không phải sửa schema**.

## 4. Bảng ánh xạ ba URL cũ → mới (đều curl kiểm trước khi thay)

| URL cũ (404, xác minh bằng curl HEAD) | URL mới (200, xác minh bằng curl HEAD) | Bài áp dụng |
|---|---|---|
| `https://www.patek.com/en/company/history` | `https://www.patek.com/en/manufacture/a-story-of-independence/anchored-in-geneva-and-switzerland` | `patek-philippe`, `patek-nautilus` |
| `https://www.cosc.swiss/chronometer-certified` | `https://www.cosc.swiss/certified-chronometer` | `chronometer`, `metas`, `vph`, `do-sai-so` |
| `https://kuronotokyo.com/pages/5th-anniversary` | `https://kuronotokyo.com/pages/2024-anniversary-reiwa` | `hajime-asaoka` |

Hai nguồn Patek còn lại (`/the-founders`, `/the-stern-family`) và hai nguồn Kurono còn lại giữ nguyên. Các nhãn COSC giữ nguyên vì vẫn mô tả đúng nội dung. Các URL COSC khác (`/cosc-chronograph-chronometer`, `/cosc-certifications`, `/cosc-faq`) không đụng tới. Không tạo nguồn trùng lặp.

## 5. Bảy bài xuất bản bị ảnh hưởng

1. `/thuong-hieu/patek-philippe/` — nguồn 1/3 thay.
2. `/mau-iconic/patek-nautilus/` — nguồn 2/2 thay (phát hiện bổ sung khi rà toàn bộ `src/content/`).
3. `/thuong-hieu/hajime-asaoka/` — nguồn 3/3 thay.
4. `/tu-dien/chronometer/` — nguồn 1/3 thay.
5. `/tu-dien/metas/` — nguồn 3/3 thay.
6. `/tu-dien/vph/` — nguồn 2/2 thay.
7. `/huong-dan/do-sai-so/` — nguồn 1/3 thay.

## 6. Kết quả kiểm tra từng URL trong mã nguồn (sau khi sửa)

| Kiểm tra | Kết quả |
|---|---|
| URL cũ Patek (`/en/company/history`) trong `src/content/` | **0 lần** |
| URL cũ COSC (`/chronometer-certified`) trong `src/content/` | **0 lần** |
| URL cũ Kurono (`/pages/5th-anniversary`) trong `src/content/` | **0 lần** |
| URL Patek mới | đúng 1 lần trong mỗi tệp `patek-philippe.md` và `patek-nautilus.md` |
| URL COSC mới | đúng 1 lần trong mỗi tệp `chronometer.md`, `metas.md`, `vph.md`, `do-sai-so.md` |
| URL Kurono mới | đúng 1 lần trong `hajime-asaoka.md` |
| `updated: "2026-09-01"` | đủ 7 bài, đúng 1 lần mỗi bài |
| Nguồn trùng lặp trong cùng một bài | không có |
| URL viết thành mã HTML thô | không có (URL nằm đúng trường `url:` YAML) |
| Các URL cũ trong `CAN-KIEM-CHUNG.md` và biên bản này | còn — đúng quy định, đó là hồ sơ lịch sử |

## 7. Kết quả kiểm tra tracker và lộ trình

**`CAN-KIEM-CHUNG.md`:**
- Phần đầu ghi rõ rà bổ sung 01/09/2026; giữ nguyên lần chuẩn hóa 30/08/2026 và commit `25b5df3`; không tự điền mã commit mới (chưa commit).
- Bảng tổng hợp: danh sách ba nguồn treo thay bằng **bảng lịch sử xử lý** (trang bị ảnh hưởng / URL 404 cũ / URL chính hãng mới / ngày 01/09/2026 / kết luận gỡ cờ); URL cũ vẫn giữ trong bảng với vai trò lịch sử.
- Hồ sơ Submariner cập nhật: không còn ghi ba nguồn chết "chưa xử lý".
- Mục 23: giữ nguyên lịch sử phát hiện 404; bổ sung đã thay URL 01/09/2026, URL mới là trang chính hãng lịch sử Genève/Thụy Sĩ, liên kết đã lên trang `patek-philippe`, cờ đã gỡ; **không tuyên bố kiểm chứng lại toàn bộ dữ kiện bài Patek**. Bổ sung thêm: rà toàn bộ `src/content/` phát hiện URL cũ còn ở bài `patek-nautilus.md` — đã thay cùng ngày 01/09/2026; URL Patek cũ không còn ở bất kỳ bài xuất bản nào.
- Mục 39: giữ lịch sử; bổ sung trang mới `2024 Anniversary Reiwa` xác nhận thành lập 2019 + kỷ niệm 5 năm 2024; cờ gỡ 01/09/2026; trạng thái vẫn `ĐÃ XỬ LÝ AN TOÀN`.
- Mục 40: giữ lịch sử; bổ sung đã thay đúng `/certified-chronometer` đủ bốn bài, cờ gỡ 01/09/2026, không đổi nội dung chuyên môn bốn bài.
- Bảng đếm **15/30/3 giữ nguyên** — chỉ xử lý cờ bên trong mục, không đổi trạng thái cấp mục.

**`docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md`:**
- Mục liên kết biên tập: **66/66 bài iconic có `relatedModels`, tổng 125 mục** — đếm trực tiếp từ frontmatter bằng script ngày 01/09/2026 (không đoán); các trang thương hiệu tự lấy mẫu iconic qua đối chiếu tên thương hiệu, không cần thêm thủ công cho 73 bài; `relatedMechanisms` **chưa hoàn thành** — ghi đúng thực tế **4 mục trong 3 bài** (breguet-type-xx, breitling-navitimer, omega-speedmaster); `coChe` đã có trường và dùng thí điểm 1 liên kết.
- Hạng mục mở rộng liên kết giữa các mẫu iconic: đánh dấu **hoàn tất ở phạm vi hiện tại** (Ưu tiên 1 cập nhật tương ứng).
- Ưu tiên 2: ba nguồn chết đã xử lý 01/09/2026, tracker không còn cờ mở cho ba URL; ba việc tiếp theo (nghiệm thu production, Search Console/Analytics/CWV, cụm nội dung SEO) **giữ trạng thái chưa thực hiện — không đánh dấu hoàn thành vì chưa có bằng chứng**.
- Mốc kiểm tra cập nhật 01/09/2026, HEAD `5a597a1`, kèm số build thực tế (mục dưới).

## 8. Kết quả `npm run check`

ĐẠT — "Tất cả kiểm tra nội dung tĩnh đạt" (chạy hai lần: sau khi hoàn tất 7 bài và lần cuối sau mọi thay đổi của gói; cả hai đều đạt, không lỗi schema/TypeScript/Astro).

## 9. Kết quả `npm run build`

Thành công, không lỗi (chạy hai lần như trên; lần cuối sau mọi thay đổi của gói).

## 10. Số trang build

**218 trang** — khớp dự kiến.

## 11. Số liên kết nội bộ

**14.363 liên kết nội bộ hợp lệ** — giữ nguyên so với trước gói (việc thay URL nguồn ngoài không làm đổi số liên kết nội bộ), khớp dự kiến.

## 12. Kết quả `git diff --check`

Không có lỗi (exit 0). `git status --short`: đúng **9 tệp `M`** như mục 3 + 1 biên bản tạo mới chưa theo dõi — tổng cộng **10 tệp thuộc gói Prompt 21**; các tệp docs/output chưa theo dõi khác là tài liệu sẵn có của chủ dự án — không đụng, không đưa vào phạm vi. `git diff --stat` (chạy lần cuối sau mọi chỉnh sửa của gói, đo 9 tệp đang theo dõi; biên bản là tệp mới nên không tính vào stat): **9 files changed, 40 insertions(+), 26 deletions(-)**.

## 13. Giới hạn của Prompt 21

- Chỉ xử lý **URL nguồn chết** — không phải đợt kiểm chứng lại toàn bộ nội dung của bảy bài; các dữ kiện khác trong hai bài Patek, bốn bài COSC/METAS/VPH và bài Hajime Asaoka giữ nguyên trạng thái kiểm chứng như tracker ghi.
- Chưa thực hiện nghiệm thu production — mọi kiểm tra hiển thị trong gói này là trên môi trường local (check/build); chưa đụng bản đã triển khai thật.
- Không tuyên bố `relatedMechanisms` hoàn thành (thực tế 4 mục/3 bài); gói thương hiệu → mẫu iconic (Prompt 20 gốc) đang dừng chờ quyết định hạ tầng, đã ghi trung thực trong lộ trình.

## 14. Kết luận

**ĐẠT đầy đủ** — cả ba URL chết đã thay bằng URL chính hãng trong đủ bảy bài bị ảnh hưởng (bao gồm phát hiện bổ sung `patek-nautilus` khi rà toàn bộ `src/content/`); ba URL cũ xuất hiện 0 lần trong `src/content/`; tracker giữ lịch sử, gỡ đủ ba cờ và không còn mâu thuẫn; lộ trình đồng bộ đúng số đếm thực; check/build/git đạt. Chưa commit, chưa push — **sẵn sàng để Codex kiểm tra độc lập trước commit**.
