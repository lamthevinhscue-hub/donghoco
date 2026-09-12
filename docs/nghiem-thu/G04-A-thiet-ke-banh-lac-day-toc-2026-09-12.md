# G04-A — Thiết kế chương mẫu "Bánh lắc và dây tóc"

- Giao dịch: TXN-20260912-17 · Danh mục DHC-NEXT-20260912 v1.0.0
- Thực hiện: GLM thực thi · Ngày: 12/09/2026 · Nền: `234fa26` (main, khớp `origin/main`; tracked working tree sạch)
- Trạng thái: **hồ sơ thiết kế + storyboard + ba hướng nghệ thuật + prompt ảnh ĐÃ HOÀN THIẾT. ẢNH THỬ CHƯA CÓ — môi trường GLM không có công cụ sinh ảnh theo quy tắc sử dụng (mục 5). G04-A "chưa đủ ảnh thử để chủ dự án chọn" — dừng tại cổng thiết kế, chờ anh Vinh chọn hướng và quyết phương án tạo ảnh.**

> **CẬP NHẬT HIỆN HÀNH 12/09/2026 (G04-B):** mục 8 dưới đây là **lịch sử thời điểm bàn giao G04-A** — giữ nguyên làm vết về việc GLM thiếu công cụ sinh ảnh. Sau đó: (1) anh Vinh cho phép, GPT Work tạo đủ 3 ảnh thử A/B/C bằng Image Generation (mục "Tài sản chuyển giao" trong `G04-quyet-dinh-huong-ket-hop-va-prompt-G04-B-2026-09-12.md`); (2) anh chọn **kết hợp A+B**; (3) ảnh kết hợp `huong-ab-v1.png` đã tạo, nén thành bản web 87.456 byte và tích hợp vào hai bài mẫu qua gói **G04-B** (biên bản: `G04-B-chuong-banh-lac-day-toc-2026-09-12.md`).

## 1. Mục tiêu học tập

Sau khi đọc chương, người đọc phải: (1) hiểu **bánh lắc và dây tóc cùng tạo thành bộ điều tiết (regulating organ)** — chia thời gian thành các phần bằng nhau nghiêm ngặt (theo FHH); (2) phân biệt được phần nào của hình là **nguyên lý cơ khí (SVG)** và phần nào chỉ là **bối cảnh/cảm xúc (ảnh AI tái dựng)**; (3) biết các mốc lịch sử ở đúng mức chứng minh: con lắc 1657, dây tóc-bánh lắc 1675, quyền phát minh dây tóc bị Robert Hooke tranh chấp.

## 2. Nguồn nội dung — đúng mức G02 đã xác nhận

| Claim trong chương | Nguồn (đường dẫn G02) | Phạm vi claim |
| --- | --- | --- |
| Con lắc áp dụng vào đồng hồ, 1657 | `src/data/timeline.json` mốc `huygens-hairspring` → Science Museum Group (hiện vật co66177) + FHH history | "adapts the pendulum to the clock" — dữ kiện được ghi nhận |
| Dây tóc xoắn áp dụng lên bánh lắc, 1675; phút được chỉ báo đáng tin cậy | timeline.json (nguồn SMG co33) + `src/content/coChe/vi/day-toc-banh-lac.md` | giới hạn: quyền phát minh **bị Robert Hooke tranh chấp** ("strongly contested" — SMG) |
| Bánh lắc: vành + nan hoa, dao động quanh trục | FHH — Balance encyclopedia (link trong `day-toc-banh-lac.md` frontmatter) | định nghĩa bộ phận, không claim lịch sử |
| Dây tóc: lò xo rất mảnh, "trái tim" của đồng hồ; hai đầu gắn bánh lắc và balance-cock | FHH — Balance spring encyclopedia (link trong cả 2 bài) | định nghĩa bộ phận |
| Bộ điều tiết chia thời gian thành phần bằng nhau; oscillation = 2 vibrations | FHH Balance/Balance spring; bài VI mục "Bộ điều tiết chia thời gian..." | định nghĩa kỹ thuật theo FHH |
| Chu kỳ do chiều dài dây tóc và quán tính bánh lắc quy định | FHH Balance spring (excerpt của bài VI đã chuẩn hóa) | theo FHH |

Bản EN dùng cùng nguồn: `src/content/coChe/en/balance-and-hairspring.md` (frontmatter sources trùng 3 link FHH).

**Không bổ sung**: năm khác, chân dung Huygens, hiện vật cụ thể, trang phục, xưởng, dụng cụ lịch sử như dữ kiện — nếu storyboard cần hình ảnh cho các mục này thì đó là **ảnh AI tái dựng bối cảnh**, được gắn nhãn, không phải dữ kiện.

## 3. Cấu trúc chương dự kiến cho G04-B (không tạo route mới)

G04-B tích hợp **vào đúng 2 bài đã có**:
- VI: `/co-che/day-toc-banh-lac/` (`src/content/coChe/vi/day-toc-banh-lac.md` — đã có `has_infographic: true`, `interactive: true`)
- EN: `/en/mechanisms/balance-and-hairspring/` (`src/content/coChe/en/balance-and-hairspring.md` — hiện `has_infographic: false`; việc bật component EN là quyết định riêng của G04-B, không mở trong G04-A)

## 4. Storyboard 6 cảnh

| # | Cảnh | Nội dung + nguồn | Hình thức | Nhãn/alt dự kiến |
| --- | --- | --- | --- | --- |
| 1 | Câu hỏi mở đầu | "Điều gì khiến đồng hồ cơ biết giữ nhịp?" (VI) / "What makes a mechanical watch keep time?" (EN) — câu hỏi mở, không claim | Hero tĩnh (ảnh AI bối cảnh theo hướng đã chọn) | Chú thích: "Minh họa AI tái dựng — không phải ảnh tư liệu" / "AI reconstruction — not a historical photograph"; alt VI: "Bánh lắc đồng hồ cơ chụp cận cảnh trong ánh sáng studio" (theo ảnh thật khi có) |
| 2 | Bối cảnh lịch sử có giới hạn | Con lắc 1657 → dây tóc-bánh lắc 1675; minute giữ được tin cậy (SMG); giới hạn Hooke | Khối văn bản ngắn + dòng thời gian mini (SVG tĩnh 2 điểm, dùng `timeLabel` "1657–1675" từ timeline.json) | Nhãn giới hạn: "Quyền phát minh dây tóc bị Robert Hooke tranh chấp"; alt: mô tả dòng thời gian 2 mốc |
| 3 | Cảnh AI tái dựng bối cảnh | Ảnh AI theo hướng đã chọn — chỉ tạo không khí/đặt vấn đề, không mang dữ kiện | Ảnh raster duy nhất của chương | Chú thích bắt buộc như cảnh 1; alt theo ảnh thật |
| 4 | Vùng SVG nguyên lý | Bánh lắc (vành + nan hoa) + dây tóc xoắn (2 đầu: bánh lắc ↔ balance-cock) — mối quan hệ cấu tạo và nhịp; nguồn FHH Balance/Balance spring | **SVG tương tác**: Tĩnh / Phát / Tạm dừng / Bước / Đặt lại (kết xuất VI + EN); không dùng ảnh AI cho vùng này | Nhãn điều khiển VI: "Tĩnh / Phát / Tạm dừng / Bước / Đặt lại"; EN: "Static / Play / Pause / Step / Reset"; alt/aria: mô tả quan hệ cấu tạo theo FHH |
| 5 | Chu kỳ dao động | Oscillation = 2 vibrations; chu kỳ do chiều dài dây tóc + quán tính bánh lắc (FHH) | SVG phụ tĩnh (biểu đồ quan hệ, không số liệu chưa có nguồn) | alt: "Sơ đồ quan hệ chiều dài dây tóc — chu kỳ dao động" |
| 6 | Nguồn + giới hạn + đọc tiếp | 3 link FHH (balance, balance spring, escapement) + SMG (từ timeline) + ghi "Minh họa AI tái dựng" lặp lại; link chéo VI↔EN 2 bài | Khối nguồn chuẩn SourceList hiện hành | — |

## 5. Ba hướng nghệ thuật (cùng một nội dung, khác cách nhìn)

### Hướng A — Minh họa biên tập tối giản
- **Mục đích**: đặt nguyên lý làm trung tâm thị giác; ảnh AI chỉ đóng khung không khí trừu tượng, hạn chế tối đa rủi ro sai lịch sử vì gần như không có chi tiết thời đại.
- **Bố cục**: desktop — ảnh rộng hero 16:9 đặt cảnh 1, vật thể (bánh lắc trừu tượng) lệch phải, khoảng trống bên trái cho chữ; mobile — crop vuông, vật thể giữa.
- **Bảng màu**: xanh đậm (#1F2D3D nền), đồng ấm (#B8893C/#D4A85A nhấn), nền kem nhạt; không gradient rực.
- **Điểm đặt ảnh**: chỉ cảnh 1 (mở đầu). Cảnh 2–6 không dùng ảnh.
- **AI làm được**: bối cảnh trừu tượng, ánh sáng, chất liệu kim loại mờ. **Bắt buộc SVG**: mọi chi tiết cơ khí có ý nghĩa nguyên lý (nan hoa, lò xo xoắn, điểm gắn).
- **Rủi ro sai lịch sử**: thấp nhất — vật thể trừu tượng không được đọc là hiện vật thật.
- **Nhãn AI**: bắt buộc mọi ảnh. **Alt VI/EN**: mô tả "minh họa trừu tượng bánh lắc" (không mô tả thời đại).
- **Fallback**: khối nền đơn sắc + tiêu đề chữ (không mất nội dung). **Hoàn nguyên**: xóa thẻ ảnh khỏi cảnh 1, phần còn lại của chương hoạt động độc lập.

### Hướng B — Bàn làm việc tái dựng không người
- **Mục đích**: tạo cảm giác "cỗ máy được chế tác bằng tay" — phục vụ câu chuyện 1657/1675 mà không cần nhân vật.
- **Bố cục**: desktop — ảnh 16:9 cảnh 3 (tái dựng), góc nhìn nghiêng 30°, dụng cụ và vật thể không định danh rải có chủ đích; mobile — crop dọc lấy trung tâm bàn.
- **Bảng màu**: gỗ ấm trầm, đồng, nền tối ấm; ánh sáng một hướng từ trái.
- **Điểm đặt ảnh**: cảnh 3 (tái dựng bối cảnh). Cảnh 1 dùng SVG tĩnh đơn giản.
- **AI làm được**: bàn, ánh sáng, chất liệu. **Bắt buộc SVG**: nguyên lý (cảnh 4, 5) — tuyệt đối không lấy chi tiết cơ khí từ ảnh.
- **Rủi ro sai lịch sử**: trung bình — ảnh có thể bị hiểu là "xưởng năm 1675". Kiểm soát bằng: không người, không văn bản/ngày trong ảnh, chú thích "tái dựng hiện đại theo phong cách" + nhãn AI bắt buộc.
- **Alt VI/EN**: "Tái dựng hiện đại bàn làm việc thợ đồng hồ phong cách thế kỷ 17 — ảnh minh họa AI, không phải tư liệu" / "Modern reconstruction of a period-style watchmaker's bench — AI illustration, not a historical photograph".
- **Fallback**: khối màu nền + chú thích. **Hoàn nguyên**: như hướng A.

### Hướng C — Kể chuyện biểu tượng: quả lắc ↔ cơ cấu bỏ túi
- **Mục đích**: kể mạch "từ tháp chuông lên cổ tay" — nối con lắc (1657) với đồng hồ bỏ túi (1675) bằng biểu tượng, mạnh về cảm xúc.
- **Bố cục**: desktop — ảnh 16:9 hai khối đối ứng (quả lắc bên trái, đồng hồ bỏ túi biểu tượng bên phải) nối bằng dải sáng; mobile — xếp dọc 2 khối.
- **Bảng màu**: xanh đêm, ánh vàng đồng, điểm sáng trắng ấm cho con lắc.
- **Điểm đặt ảnh**: cảnh 1 + lặp lại thu nhỏ ở cảnh 2 (cùng ảnh, caption khác).
- **AI làm được**: hai đối tượng biểu tượng, ánh sáng, không khí. **Bắt buộc SVG**: cảnh 4, 5 — và ảnh hướng C **không được dùng làm sơ đồ nguyên lý** hay dẫn chứng lịch sử.
- **Rủi ro sai lịch sử**: cao nhất trong ba hướng — đồng hồ quả lắc và bỏ túi trong ảnh có thể bị đọc là "chiếc của Huygens". Kiểm soát: vật thể không có chi tiết định danh (không chữ số, không chữ khắc, không kiểu dáng gắn thời kỳ cụ thể), chú thích AI bắt buộc + câu "hình mang tính biểu tượng".
- **Alt VI/EN**: "Bố cục biểu tượng giữa đồng hồ quả lắc và đồng hồ bỏ túi — minh họa AI" / "Symbolic composition of a pendulum clock and a pocket watch — AI illustration".
- **Fallback**: như hướng A. **Hoàn nguyên**: như hướng A.

**Chung cho ba hướng**: cùng tỷ lệ khung so sánh (16:9), không chữ/logo/ten hãng/watermark/chân dung nhận diện/chữ ký; không mô phỏng phong cách nghệ sĩ còn bản quyền; mọi ảnh ghi "AI reconstruction".

## 6. Ranh giới kỹ thuật G04-B (chưa viết mã)

1. Ảnh AI chỉ đảm nhiệm **cảnh, ánh sáng, chất liệu, bối cảnh** (cảnh 1/3 tùy hướng).
2. **SVG riêng** minh họa mối quan hệ nguyên lý bánh lắc–dây tóc–nhịp (cảnh 4/5); mọi chi tiết kỹ thuật suy từ dữ liệu FHH, **không suy từ ảnh AI**.
3. Fallback tĩnh khi ảnh/SVG lỗi; **reduced-motion là trạng thái tĩnh thật** (không animation, không autoplay); nếu có vòng lặp phát thì **dừng khi ra ngoài viewport** (IntersectionObserver).
4. Điều khiển: Tĩnh/Phát/Tạm dừng/Bước/Đặt lại, đầy đủ VI/EN, bàn phím dùng được, trạng thái phát trong `aria-pressed`/nhãn.
5. Phép đo bắt buộc sau tích hợp (chưa đo — không hứa số): số request + byte mạng thêm; bố cục 320/1440; VI/EN; sáng/tối; điều hướng bàn phím; trạng thái từng nút điều khiển; giảm chuyển động.
6. Không hứa chỉ số hiệu năng hay hiệu quả học tập trước khi có phép đo.

## 7. Nguồn và quyền

- Mọi claim lịch sử trong storyboard dẫn về nguồn G02 (mục 2) kèm phạm vi claim; nguồn lịch sử **tách bạch** với prompt/tài sản AI (prompt không phải nguồn lịch sử — ghi ở mọi hồ sơ ảnh).
- Ảnh thử/tích hợp đều ghi **"AI reconstruction"**; không dùng tên/mô phỏng phong cách nghệ sĩ còn bản quyền; **không tạo chân dung trình bày là Christiaan Huygens thật**, không dùng ảnh người thật/công chúng.

## 8. Trạng thái ảnh thử — CHƯA CÓ (điểm dừng bắt buộc)

- Môi trường GLM **không có công cụ sinh ảnh theo quy tắc sử dụng**: công cụ built-in `image_gen` của skill imagegen không tồn tại trong phiên; đường CLI fallback yêu cầu `OPENAI_API_KEY` và theo đúng quy tắc skill chỉ được dùng khi được xác nhận rõ ràng — khóa API thuộc loại thông tin nhạy cảm G03/G04 cấm chạm, nên GLM không tự kích hoạt.
- Theo phương án dự phòng của prompt: hồ sơ/prompt/storyboard đã hoàn thiện (prompt đầy đủ + negative prompt cho cả ba hướng tại `output/g04-banh-lac-day-toc-design/prompt-ba-huong.md`), **ghi rõ G04-A "chưa đủ ảnh thử để chủ dự án chọn"**.
- Không tải ảnh mạng, không dùng ảnh có bản quyền, không thay bằng ảnh giả.

## 9. Kiểm chứng nền và danh sách bàn giao

- **Kết quả kiểm chứng nền** (chạy trên nền `234fa26`, trước bàn giao — G04-A **không đổi mã website** nên đây là kiểm chứng nền cho thấy mã vẫn đạt):
  - `npm run build`: **exit 0** — **286 trang**, **20.622 liên kết, 0 liên kết hỏng**.
  - Astro check 193 tệp: **0 lỗi / 0 cảnh báo / 4 hints có sẵn** (4 hints từ tệp công cụ P3.1–P3.3 đã commit — nguyên trạng).
  - `git diff --check`: sạch.
- **Danh sách bàn giao G04-A — đúng 3 tệp mới** (không sửa tệp có sẵn nào):
  1. `docs/nghiem-thu/G04-A-thiet-ke-banh-lac-day-toc-2026-09-12.md` (mới — biên bản này)
  2. `output/g04-banh-lac-day-toc-design/prompt-ba-huong.md` (mới — 3 prompt + negative prompt + thông số lưu bằng chứng)
  3. `output/g04-banh-lac-day-toc-design/drafts/README.txt` (mới — ghi trạng thái thư mục ảnh thử trống)

---

**Câu hỏi cho anh Vinh (cổng G04-A):**

1. **Anh chọn hướng nghệ thuật nào cho chương "Bánh lắc và dây tóc": A (minh họa biên tập tối giản), B (bàn làm việc tái dựng không người), hay C (kể chuyện biểu tượng quả lắc ↔ bỏ túi)?**
2. Kèm theo đó, anh quyết phương án tạo 3 ảnh thử (vì môi trường GLM hiện không có công cụ sinh ảnh): (a) cho phép dùng đường CLI/API với `OPENAI_API_KEY` do anh tự cấu hình, hoặc (b) GPT Work dùng công cụ sinh ảnh của mình với 3 prompt đã chuẩn bị trong `output/g04-banh-lac-day-toc-design/prompt-ba-huong.md`.

Sau khi anh chọn, G04-B mới được mở theo quyết định riêng.
