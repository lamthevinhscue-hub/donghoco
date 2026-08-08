# PROMPT SINH ẢNH — NHÓM OG VÀ NỀN

**Ngày soạn:** 08/08/2026
**Người soạn:** Claude (Cowork)
**Dùng cho:** công cụ sinh ảnh của ChatGPT
**Phạm vi:** chỉ ảnh trang trí. **Không dùng cho ảnh sản phẩm đồng hồ** — lý do đã nêu ở phần trao đổi trước.

---

# PHẦN 1 — MỘT LỖI CẦN BIẾT TRƯỚC

Thẻ chia sẻ trong `BaseLayout.astro` đang trỏ tới:

```
https://donghoco1.vercel.app/og-default.jpg
```

**File này không tồn tại.** Nghĩa là hiện tại mỗi lần trang được chia sẻ lên Facebook hay Zalo đều hiển thị ảnh hỏng — một số nền tảng còn thể hiện tệ hơn là không có ảnh nào.

Vậy nên ảnh OG mặc định là **ảnh cần làm trước tiên** trong danh sách dưới đây.

---

# PHẦN 2 — BẢY ẢNH CẦN SINH

| # | Tên file | Kích thước | Dùng ở đâu |
|---|---|---|---|
| 1 | `og-default.jpg` | 1200 × 630 | Ảnh chia sẻ mặc định toàn site — **ưu tiên số một** |
| 2 | `og-thuong-hieu.jpg` | 1200 × 630 | Chia sẻ các trang thương hiệu |
| 3 | `og-mau-iconic.jpg` | 1200 × 630 | Chia sẻ các trang mẫu iconic |
| 4 | `og-co-che.jpg` | 1200 × 630 | Chia sẻ các bài cơ chế và từ điển |
| 5 | `og-lich-su.jpg` | 1200 × 630 | Chia sẻ trang Lịch sử |
| 6 | `hero-bg.jpg` | 2400 × 1200 | Nền phần đầu trang chủ, dùng ở độ mờ thấp |
| 7 | `guilloche-tile.png` | 1000 × 1000 | Hoa văn lặp, nền các khối |

Đặt cả bảy vào `public/images/og/`, trừ file số 1 đặt thẳng ở `public/` vì đường dẫn hiện tại đang trỏ vào gốc.

---

# PHẦN 3 — SÁU QUY TẮC ÁP CHO MỌI PROMPT

Sáu điều này quyết định ảnh có hòa vào trang hay trông như dán từ nơi khác.

**1. Khóa bảng màu ba tông.** Đúng ba màu của site, không thêm màu thứ tư:

- Navy đậm `#1F2D3D` — nền
- Vàng đồng `#B8893C` — nét và điểm nhấn
- Kem `#FAF7F2` — chi tiết sáng

**2. Tuyệt đối không có chữ trong ảnh.** Mô hình sinh ảnh viết chữ rất hay bị méo và sai chính tả, mà ảnh OG lại là thứ người ta nhìn đầu tiên. Nếu anh muốn có tên trang trên ảnh, **thêm bằng phần mềm chỉnh ảnh sau**, đừng nhờ mô hình viết.

**3. Không vẽ đồng hồ của hãng cụ thể, không vẽ logo.** Chỉ vẽ chi tiết cơ khí chung: bánh răng, dây tóc, cầu máy, mặt số không nhãn.

**4. Không vẽ khuôn mặt người.** Giữ nhất quán với bộ 28 minh họa timeline — cả bộ không có gương mặt nào.

**5. Phong cách: bản khắc, không phải ảnh chụp.** Nét mảnh, mảng phẳng, gạch tạo khối. Đây là ngôn ngữ thị giác đã dựng cho cả site.

**6. Chừa khoảng trống cho chữ.** Với năm ảnh OG, để **một phần ba bên trái hoặc phía dưới tương đối trống** — nền tảng chia sẻ sẽ đè tiêu đề lên đó, và cũng để anh thêm tên trang nếu muốn.

---

# PHẦN 4 — BẢY PROMPT DÁN CHO CHATGPT

[GHI CHÚ] Các prompt viết bằng tiếng Anh vì mô hình sinh ảnh cho kết quả sát hơn với tiếng Anh. Phần mô tả ý đồ bằng tiếng Việt ở trên mỗi prompt để anh biết mình đang yêu cầu gì.

---

## Ảnh 1 — `og-default.jpg` (ưu tiên số một)

**Ý đồ:** ảnh đại diện cho cả site. Một bộ máy đồng hồ nhìn từ trên xuống, vẽ kiểu bản khắc, phần bên trái để trống cho chữ.

> Create a 1200×630 horizontal image. Style: fine engraved line illustration, like a technical plate from a 19th-century horological treatise. Flat vector-like linework, no photorealism, no gradients, no glow.
>
> Subject: the movement of a mechanical watch seen from above — bridges, gear wheels, a balance wheel with its spiral hairspring, jewel bearings. Rendered entirely as thin outlines with parallel-line hatching for shading. Do not depict any specific real watch model.
>
> Colour palette — use only these three: deep navy `#1F2D3D` as the background, warm brass `#B8893C` for all primary linework, ivory `#FAF7F2` for a few bright accents. No fourth colour.
>
> Composition: the movement sits on the RIGHT third of the frame, partially cropped by the right edge. The LEFT two-thirds is quiet — plain navy with a very faint concentric-circle guilloché texture at about 8% opacity. This empty area is intentional.
>
> Absolutely no text, no letters, no numbers, no logos, no watermarks, no human figures, no hands.

---

## Ảnh 2 — `og-thuong-hieu.jpg`

**Ý đồ:** đại diện cho khu vực thương hiệu. Gợi ý xưởng chế tác và dụng cụ, không gợi một hãng nào.

> Create a 1200×630 horizontal image. Style: fine engraved line illustration, 19th-century technical plate aesthetic. Flat linework with parallel hatching, no photorealism, no gradients.
>
> Subject: a watchmaker's bench arrangement seen from slightly above — a loupe, tweezers, a small screwdriver, a movement holder, and a few loose gear wheels arranged on a surface. Purely tools and generic components.
>
> Colour palette — only these three: deep navy `#1F2D3D` background, warm brass `#B8893C` linework, ivory `#FAF7F2` highlights. No fourth colour.
>
> Composition: objects grouped in the RIGHT half, arranged along a diagonal. LEFT half quiet navy with faint concentric guilloché texture at 8% opacity.
>
> Absolutely no text, no letters, no numbers, no brand logos, no human figures, no hands, no faces.

---

## Ảnh 3 — `og-mau-iconic.jpg`

**Ý đồ:** đại diện cho khu vực mẫu iconic. Gợi sự đa dạng hình dáng vỏ — tròn, vuông, chữ nhật, thùng — mà không vẽ mẫu có thật.

> Create a 1200×630 horizontal image. Style: fine engraved line illustration, technical plate aesthetic. Flat outlines, parallel-line hatching, no photorealism.
>
> Subject: five generic watch case silhouettes in different shapes — round, square with rounded corners, elongated rectangle, oval, and barrel — arranged in a loose overlapping row, each drawn as a clean outline with a plain unmarked dial. They must look like abstract shape studies, not like any real watch model.
>
> Colour palette — only these three: deep navy `#1F2D3D` background, warm brass `#B8893C` outlines, ivory `#FAF7F2` for a few dial details. No fourth colour.
>
> Composition: the row of cases occupies the LOWER RIGHT, receding slightly toward the right edge. UPPER LEFT area quiet navy with faint guilloché texture at 8% opacity.
>
> Absolutely no text, no letters, no numbers, no logos, no brand names on dials, no human figures.

---

## Ảnh 4 — `og-co-che.jpg`

**Ý đồ:** đại diện cho khu vực cơ chế và từ điển. Gợi bản vẽ kỹ thuật có chú giải, nhưng không có chữ.

> Create a 1200×630 horizontal image. Style: exploded technical diagram in fine engraved linework, like an old patent drawing. Flat outlines, parallel hatching, no photorealism, no gradients.
>
> Subject: an escapement mechanism drawn exploded — an escape wheel, a pallet fork, a balance wheel with hairspring, and a bridge, separated slightly in space with thin leader lines connecting them, as if in an assembly drawing. Purely mechanical, generic, not from any specific brand.
>
> Colour palette — only these three: deep navy `#1F2D3D` background, warm brass `#B8893C` linework, ivory `#FAF7F2` for leader lines and highlights. No fourth colour.
>
> Composition: the exploded assembly centred slightly RIGHT of frame. LEFT third quiet navy with faint guilloché texture at 8% opacity.
>
> Important: the leader lines must NOT end in text labels — leave them ending in small empty circles. Absolutely no text, no letters, no numbers, no logos, no human figures.

---

## Ảnh 5 — `og-lich-su.jpg`

**Ý đồ:** đại diện cho trang Lịch sử. Gợi dòng thời gian và sự chuyển hóa từ đồng hồ bỏ túi sang đồng hồ đeo tay.

> Create a 1200×630 horizontal image. Style: fine engraved line illustration, 19th-century technical plate aesthetic. Flat linework with parallel hatching, no photorealism.
>
> Subject: a horizontal progression of three generic timepiece forms from left to right — an egg-shaped Renaissance pocket clock, a round pocket watch on a chain, and a simple wristwatch on a strap. They sit along a thin horizontal rule that runs across the frame, suggesting a timeline. All generic, no real models.
>
> Colour palette — only these three: deep navy `#1F2D3D` background, warm brass `#B8893C` linework, ivory `#FAF7F2` highlights. No fourth colour.
>
> Composition: the three objects sit in the LOWER portion along the rule, spaced apart. The UPPER half is quiet navy with faint concentric guilloché texture at 8% opacity.
>
> Absolutely no text, no letters, no numbers, no dates, no logos, no human figures.

---

## Ảnh 6 — `hero-bg.jpg`

**Ý đồ:** nền phần đầu trang chủ. Sẽ dùng ở độ mờ rất thấp nên phải là **hoa văn phủ đều**, không có chủ thể nổi bật.

> Create a 2400×1200 horizontal image. Style: an abstract engine-turned guilloché pattern, like the decorative engraving on an antique watch dial. Purely ornamental, no objects, no scene.
>
> Subject: dense concentric circular waves radiating from a point slightly LEFT of centre, overlaid with a fine crosshatch grid. The pattern should be even and calm across the whole frame, with no strong focal point and no area that draws the eye more than another.
>
> Colour palette — only two: deep navy `#1F2D3D` as background, warm brass `#B8893C` for the pattern lines. Keep the contrast LOW — this image will be displayed at very low opacity behind text, so it must read as a subtle texture, not a bold graphic.
>
> Absolutely no text, no letters, no numbers, no objects, no watches, no logos, no human figures.

---

## Ảnh 7 — `guilloche-tile.png`

**Ý đồ:** hoa văn lặp được, dùng làm nền các khối. Yêu cầu quan trọng nhất là **ghép được liền mạch bốn cạnh**.

> Create a 1000×1000 square SEAMLESS TILING pattern. The image must tile perfectly — the left edge must continue into the right edge, and the top edge into the bottom edge, with no visible seam when repeated.
>
> Style: fine guilloché engraving — a regular grid of small concentric circle motifs, each about one tenth of the frame wide, drawn in thin precise lines.
>
> Colour palette — only two: deep navy `#1F2D3D` background, warm brass `#B8893C` lines. Very low contrast — this is a subtle background texture, not a feature.
>
> The pattern must be perfectly regular and repeating, with no unique element, no focal point, no variation across the frame.
>
> Absolutely no text, no letters, no numbers, no objects, no logos.

---

# PHẦN 5 — KIỂM ẢNH TRƯỚC KHI DÙNG

Mô hình sinh ảnh hay bỏ qua một vài yêu cầu. Kiểm năm điểm sau với **từng ảnh**, sai điểm nào thì yêu cầu sinh lại:

1. **Có chữ lọt vào không?** Đây là lỗi hay gặp nhất — mô hình thường tự thêm chữ nhòe méo vào ảnh kỹ thuật. Phóng to xem kỹ các góc.
2. **Có đúng ba màu không?** Nếu thấy màu xanh lá, đỏ, tím hay xám lạ thì sai.
3. **Có mặt người hay bàn tay không?**
4. **Với năm ảnh OG: phần trống có thật sự trống không?** Nếu chi tiết tràn kín khung thì chữ đè lên sẽ không đọc được.
5. **Riêng ảnh số 7:** ghép thử bốn ô cạnh nhau xem có thấy đường nối không. Đây là yêu cầu mô hình hay làm hỏng nhất.

Nếu sinh lại vài lần vẫn không đạt, **giảm bớt yêu cầu trong prompt** thay vì thêm — mô tả càng dài thì mô hình càng dễ bỏ sót.

---

# PHẦN 6 — PROMPT GIAO GLM SAU KHI CÓ ẢNH

> Anh Vinh đã chuẩn bị xong bộ ảnh trang trí. Lắp vào trang theo các bước sau.
>
> ## A. Sửa lỗi ảnh chia sẻ đang hỏng
>
> `BaseLayout.astro` đang trỏ `og:image` tới `/og-default.jpg` nhưng **file đó chưa từng tồn tại**, nên mọi lượt chia sẻ hiện đang hiển thị ảnh hỏng. File nay đã có, đặt tại `public/og-default.jpg`. Kiểm lại đường dẫn khớp và ảnh tải được.
>
> ## B. Ảnh chia sẻ riêng theo khu vực
>
> Bốn ảnh sau đặt tại `public/images/og/`: `og-thuong-hieu.jpg`, `og-mau-iconic.jpg`, `og-co-che.jpg`, `og-lich-su.jpg`.
>
> Trong `BaseLayout.astro`, chọn ảnh theo khu vực của trang đang dựng:
>
> | Đường dẫn bắt đầu bằng | Ảnh dùng |
> |---|---|
> | `/thuong-hieu` | `og-thuong-hieu.jpg` |
> | `/mau-iconic` | `og-mau-iconic.jpg` |
> | `/co-che`, `/tu-dien`, `/huong-dan` | `og-co-che.jpg` |
> | `/lich-su`, `/giai-phau` | `og-lich-su.jpg` |
> | còn lại | `og-default.jpg` |
>
> **Đặt bảng ánh xạ này trong `src/i18n/ui.ts` hoặc file cấu hình riêng**, không viết cứng rải rác trong layout.
>
> Giữ nguyên khả năng ghi đè: nếu một bài có `cover_image` riêng thì dùng ảnh đó thay vì ảnh khu vực.
>
> ## C. Nền trang chủ
>
> `public/images/og/hero-bg.jpg` dùng làm nền phần đầu trang chủ.
>
> - Đặt **dưới** lớp nội dung, độ mờ khoảng **8 tới 12 phần trăm**.
> - **Giữ nguyên lớp hoa văn SVG hiện có** — ảnh mới bổ sung chiều sâu, không thay thế.
> - Ở **chế độ tối** cần giảm độ mờ xuống thấp hơn nữa, khoảng 5 phần trăm, vì nền tối làm hoa văn nổi hơn.
> - Dùng `loading="lazy"` không phù hợp ở đây vì là ảnh đầu trang — dùng `eager` và nén ảnh xuống dưới 200KB.
>
> ## D. Hoa văn lặp
>
> `public/images/og/guilloche-tile.png` dùng làm nền cho **khối số liệu nền navy** ở trang chủ, đặt `background-repeat: repeat` với độ mờ thấp.
>
> ## E. Kiểm sau khi lắp
>
> 1. Dán địa chỉ **năm trang khác khu vực nhau** vào công cụ kiểm thẻ chia sẻ của Facebook — mỗi trang phải ra đúng ảnh của khu vực đó.
> 2. Kiểm tổng dung lượng ảnh: nếu bộ bảy ảnh vượt **1,5 MB** thì nén lại. Trang này trước nay rất nhẹ, đừng để ảnh trang trí làm chậm.
> 3. Kiểm trang chủ ở cả hai chế độ màu — nền không được làm chữ khó đọc.
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`. **Quét ký tự lạ trước khi push.** Chạy `npm run build`, push và báo mã commit.
