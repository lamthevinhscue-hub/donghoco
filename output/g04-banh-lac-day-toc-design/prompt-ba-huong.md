# Prompt ảnh thử — ba hướng nghệ thuật (G04-A)

- **Cập nhật hiện hành 12/09/2026 (G04-B):** ảnh thử A/B/C đã do GPT Work tạo bằng Image Generation theo cho phép của anh Vinh (prompt thực tế và thông số tại `drafts/prompt-thuc-te-2026-09-12.md`). Chủ dự án xem ảnh và chọn **kết hợp A+B**; ảnh kết hợp `drafts/huong-ab-v1.png` đã tạo và được G04-B nén thành bản web tích hợp vào chương. Trạng thái "chưa tạo ảnh thử" dưới đây là **lịch sử thời điểm GLM soạn hồ sơ** (GLM không có công cụ sinh ảnh theo quy tắc skill) — giữ nguyên làm vết.
- Trạng thái: **chưa tạo ảnh thử** — môi trường GLM không có công cụ sinh ảnh theo quy tắc skill (built-in `image_gen` không khả dụng; CLI fallback cần `OPENAI_API_KEY` + xác nhận rõ ràng của chủ dự án, và khóa API là thông tin nhạy cảm GLM không chạm). Ba prompt dưới đây đã hoàn thiện, sẵn sàng chạy khi anh Vinh quyết phương án tạo ảnh (CLI/API có key, hoặc GPT Work dùng công cụ sinh ảnh của mình).
- Quy tắc chung mọi prompt: tỷ lệ 16:9 (1536×864 hoặc 1024×576 khi chạy thử), không chữ, không logo/tên hãng, không watermark, không chân dung nhận diện, không chữ ký, không bản vẽ kỹ thuật chính xác, không mô phỏng phong cách nghệ sĩ còn bản quyền. Ảnh thành phẩm ghi "AI reconstruction — not a historical photograph".
- Model dự kiến (nếu chạy CLI): gpt-image-2, quality high, 1536×1024 rồi crop 16:9 — chỉ khi được anh Vinh cho phép dùng đường CLI/API.

## Hướng A — Minh họa biên tập tối giản

```text
Use case: stylized-concept
Asset type: hero illustration for a watchmaking history chapter (editorial style)
Primary request: minimalist editorial illustration of a mechanical watch balance wheel with a fine coiled hairspring, abstract and calm
Scene/backdrop: deep navy background with generous empty space on the left for text
Subject: a stylized balance wheel (rim with thin spokes) with a delicate spiralling hairspring, rendered as abstract metal shapes
Style/medium: flat editorial illustration with subtle metallic sheen, clean vector-like shapes
Composition/framing: balance wheel placed right of center, wide 16:9, large empty left area
Lighting/mood: soft, quiet, precise; warm brass rim light
Color palette: deep navy #1F2D3D background, warm brass #B8893C and #D4A85A accents, soft cream highlights
Materials/textures: muted brushed-metal feel, no gloss
Constraints: abstract mechanical shapes only; no readable clock face details; calm negative space
Avoid: any text, letters, numbers, logos, watermarks, signatures, human figures, portraits, brand names, photorealistic technical drawing accuracy, dates, ornate baroque details
```

Negative prompt (nếu công cụ hỗ trợ): `text, letters, numbers, watermark, logo, brand, signature, portrait, face, human, photograph of a real historical object, technical blueprint, dates, ornate baroque`

## Hướng B — Bàn làm việc tái dựng không người

```text
Use case: historical-scene
Asset type: context illustration for a watchmaking history chapter (modern reconstruction of a period-style workbench)
Primary request: a contemporary studio photograph of an empty watchmaker-style workbench, modern reconstruction evoking hand craftsmanship, no people
Scene/backdrop: quiet workshop corner, one-directional warm light from the left
Subject: wooden bench with a few unidentified metal tools and parts laid out with intention; no identifiable clock face, no readable text anywhere
Style/medium: realistic photography, shallow depth of field
Composition/framing: 30-degree angle over the bench, 16:9, central objects in focus
Lighting/mood: single warm light source, calm, meditative
Color palette: warm muted wood tones, brass, dark warm background
Materials/textures: aged wood, brass and steel surfaces
Constraints: clearly a modern reconstruction; no people; no readable text or dates on objects; no identifiable historical artifact; no clock with visible hands or dial markings
Avoid: text, letters, numbers, watermark, logo, signature, human figures, portraits, dates, claim of authenticity, ornate 17th-century clothing or identifiable period props
```

Negative prompt: `text, letters, numbers, watermark, logo, signature, person, face, hands, portrait, historical document, dated object, brand, technical blueprint`

## Hướng C — Kể chuyện biểu tượng: quả lắc ↔ đồng hồ bỏ túi

```text
Use case: stylized-concept
Asset type: storytelling illustration for a watchmaking history chapter (symbolic composition)
Primary request: symbolic composition contrasting a grand pendulum clock silhouette on the left and an abstract pocket watch on the right, connected by a warm arc of light, evoking the journey from tower pendulums to pocket watches
Scene/backdrop: deep night-blue gradient, abstract space, no architecture details
Subject: simplified iconic pendulum clock shape (no dial numbers, no hands detail) and a plain rounded pocket watch shape (no engraving, no readable dial)
Style/medium: editorial illustration, soft glow, gentle grain
Composition/framing: two mirrored focal blocks, 16:9, light arc bridging them
Lighting/mood: contemplative, warm brass glow against night blue
Color palette: night blue, warm brass highlights, soft white-warm light
Materials/textures: matte, minimal texture
Constraints: purely symbolic objects; no identifiable period style; no readable dials; no dates; the image must not read as a schematic or a historical artifact
Avoid: text, letters, numbers, watermark, logo, signature, human figures, portraits, photographs of real artifacts, technical drawing accuracy, brand names
```

Negative prompt: `text, letters, numbers, watermark, logo, brand, signature, portrait, face, human, real artifact photo, blueprint, readable clock dial, dates, ornate baroque`

## Thông số lưu khi tạo ảnh (áp dụng cho mỗi hướng)

- Lưu prompt đầy đủ + negative prompt + công cụ/model + ngày tạo + kích thước gốc + dung lượng gốc.
- Bản xuất thử web: cùng tỷ lệ 16:9, mục tiêu ≤ 150 KB tại kích thước dùng dự kiến (~1200px rộng); nếu nén làm hỏng chất lượng thì ghi số thật và trình lại, không nén mù.
- Kiểm bằng mắt từng ảnh: lỗi chữ AI, vật thể mơ hồ, chi tiết cơ khí sai, nguy cơ bị hiểu là ảnh tư liệu — ghi rõ từng mục.
- Đặt tên: `drafts/huong-a.png`, `huong-b.png`, `huong-c.png` (+ bản web `huong-*-web.jpg`) — chỉ trong `output/g04-banh-lac-day-toc-design/drafts/`, không đặt vào `public/`.
