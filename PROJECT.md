# PROJECT.md — Bản kế hoạch website "Đồng Hồ Cơ"

> **GHI CHÚ TRẠNG THÁI (30/08/2026):** Tài liệu này là **bản kiến trúc và kế hoạch khởi đầu** của dự án — dùng để hiểu định vị, cấu trúc và hướng đi ban đầu. **Không dùng các checkbox và mốc giai đoạn trong tài liệu này để xác định tiến độ hiện tại** (chúng phản ánh thời điểm viết, không phản ánh hiện trạng). Trạng thái hiện hành — những gì đã hoàn thành, đang chờ, chưa làm — được quản lý tại [`docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md`](./docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md).

> **Tài liệu này là gì?**
> Đây là bản kế hoạch tổng thể (chưa có mã nguồn hoàn chỉnh). Nó cho biết website sẽ làm gì, gồm những gì, dùng công nghệ gì, đặt tên tệp ra sao và trông như thế nào. Khi bắt tay vào làm, mọi người cùng đọc tệp này để cùng hiểu một hướng đi.
>
> **Tên "Đồng Hồ Cơ" là tên ví dụ.** Khi bạn đã có tên thương hiệu thật, hãy thay chữ **"Đồng Hồ Cơ"** ở mọi nơi trong tệp này bằng tên của bạn. Tôi sẽ đánh dấu `← ĐỔI` ở những chỗ cần thay.

---

## 0. Cách đọc tệp này

Tài liệu chia làm nhiều phần. Bạn không cần đọc hết một lần — mỗi phần phục vụ một mục đích:

- **Phần 1–2:** Định vị và cấu trúc tổng thể → để hiểu *website làm gì, có những gì*.
- **Phần 3:** Hệ thống infographic → phần quan trọng nhất và đặc biệt nhất.
- **Phần 4–5:** Công nghệ và cấu trúc tệp → để hiểu *website được làm bằng gì*.
- **Phần 6:** Nguyên tắc thiết kế → để hiểu *website trông như thế nào*.
- **Phần 7:** Lộ trình chia giai đoạn → để biết *làm đến đâu rồi, bước tiếp theo là gì*.

> **Một thuật ngữ cần biết trước:** *Markdown* là cách viết nội dung bằng văn bản thuần (giống soạn email). Dùng dấu `#` cho tiêu đề, `**chữ in đậm**` cho chữ đậm. Mở tệp `.md`, gõ chữ, lưu lại là xong. Toàn bộ bài viết trên website của bạn sẽ dùng định dạng này.

---

## 1. Định vị và mục tiêu

### Định vị đã chốt
Website định vị là **một nền tảng nội dung tiếng Việt chuyên sâu về đồng hồ cơ**, với **điểm nhận diện khác biệt là hệ thống infographic động** giải thích cơ chế hoạt động. Không phải một blog viết chung chung, mà là một tài nguyên có bản sắc.

**Vì sao chọn hướng này?** Infographic chất lượng là thứ khó sao chép nhất — tạo ra bản sắc riêng cho trang, khó bị thay thế. Nội dung chữ (thương hiệu, mẫu iconic) là nền tảng, còn infographic là "vũ khí khác biệt".

### Mục tiêu
- Trở thành nguồn tài liệu tiếng Việt chất lượng cao về đồng hồ cơ.
- Giúp **người mới** hiểu được cơ chế, thuật ngữ cơ bản.
- Giúp **người chơi trung cấp** đọc chuyên sâu hơn về máy móc, lịch sử.
- Tạo ra một thư viện infographic giải thích cơ chế mà không nơi nào (tiếng Việt) có.

### Đối tượng người đọc
| Nhóm | Họ cần gì |
|------|-----------|
| **Người mới** (nhóm tăng trưởng nhanh nhất) | Giải thích đơn giản, infographic trực quan, thuật ngữ được định nghĩa dễ hiểu. |
| **Người chơi trung cấp** | Bài viết chuyên sâu, chi tiết kỹ thuật, lịch sử thương hiệu và mẫu iconic. |
| **Người đọc tiếng Việt (chính)** | Toàn bộ nội dung bằng tiếng Việt. |
| **Người đọc tiếng Anh (sau này)** | Sẵn sàng cấu trúc để thêm bản tiếng Anh mà không phải làm lại website. |

Website ưu tiên **tốc độ tải nhanh** và **hiển thị đẹp trên điện thoại**, vì phần lớn người đọc sẽ xem qua điện thoại.

---

## 2. Cấu trúc nội dung (sitemap)

> **Sitemap** (sơ đồ trang) là danh sách mọi trang trên website và đường dẫn (địa chỉ web) tới trang đó. Website được tổ chức thành **3 trụ cột chính** + các trang hỗ trợ.

```
Trang chủ                    /                     Lối vào 3 trụ cột, nội dung nổi bật

─── TRỤ CỘT 1: THƯ VIỆN THƯƠNG HIỆU ───
Danh sách thương hiệu        /thuong-hieu          Lọc theo quốc gia, phân khúc
  └─ Chi tiết thương hiệu    /thuong-hieu/[tên]    Lịch sử, triết lý, dòng sản phẩm, calibre tiêu biểu

─── TRỤ CỘT 2: CÁC MẪU ICONIC ───
Danh sách mẫu iconic         /mau-iconic           Kể chuyện các mẫu huyền thoại
  └─ Chi tiết mẫu iconic     /mau-iconic/[tên]     Bối cảnh ra đời, đặc điểm, thế hệ, bộ máy

─── TRỤ CỘT 3: CƠ CHẾ HOẠT ĐỘNG (INFOGRAPHIC) ───
Danh sách cơ chế             /co-che               Thư viện infographic
  └─ Chi tiết cơ chế         /co-che/[tên]         Infographic động + phần đọc sâu

─── TRỤ CỘT HỖ TRỢ ───
Từ điển thuật ngữ            /tu-dien              Tra cứu nhanh thuật ngữ
  └─ Chi tiết thuật ngữ      /tu-dien/[thuật-ngữ]
Hướng dẫn thực hành          /huong-dan            Lên dây, bảo dưỡng, đo sai số, chọn đồng hồ đầu tiên
  └─ Chi tiết hướng dẫn      /huong-dan/[tên]
Về chúng tôi                  /ve-chung-toi
Liên hệ                       /lien-he
```

### Giải thích 3 trụ cột chính

**Trụ cột 1 — Thư viện thương hiệu.** Mỗi thương hiệu có một trang riêng: lịch sử, triết lý chế tác, dòng sản phẩm chủ lực, *calibre in-house* (bộ máy do chính hãng tự làm) tiêu biểu, phân khúc giá. Có thể lọc theo quốc gia (Thụy Sĩ, Đức, Nhật, Pháp, Anh) và theo phân khúc (haute horlogerie, luxury, mid-range, entry-level, microbrand).

**Trụ cột 2 — Các mẫu iconic (huyền thoại).** Mỗi bài kể về một mẫu đồng hồ nổi tiếng: bối cảnh ra đời, đặc điểm thiết kế nhận diện, các *thế hệ* (reference), bộ máy sử dụng, vị trí trong lịch sử ngành. Danh sách khởi điểm: Rolex Submariner, Omega Speedmaster, Patek Philippe Nautilus, Audemars Piguet Royal Oak, Cartier Tank, Jaeger-LeCoultre Reverso, A. Lange & Söhne Lange 1, Seiko 62MAS, Grand Seiko Snowflake, IWC Mark XI.

**Trụ cột 3 — Cơ chế hoạt động (infographic).** Đây là phần đặc biệt nhất — xem chi tiết ở mục 3.

### Các trụ cột/trang hỗ trợ
- **Từ điển thuật ngữ (glossary):** vừa hữu ích cho người đọc tra cứu, vừa rất tốt cho SEO (khi người ta tìm trên Google).
- **Hướng dẫn thực hành:** cách lên dây, bảo dưỡng, đo sai số, chọn đồng hồ đầu tiên — những nội dung thực tế, ít cạnh tranh.

### Địa chỉ web (URL)
- Dùng **tiếng Việt không dấu** (ví dụ: `/tu-dien`, không phải `/từ-điển`) để dễ gõ, dễ chia sẻ, không bị lỗi ký tự.
- Tên tệp cũng theo quy tắc tương tự (xem mục 5).

---

## 3. Hệ thống infographic — hạng mục cốt lõi

> Đây là phần **quan trọng nhất** và cũng **khó nhất**. Nó là "điểm nhận diện" của website.

### Nguyên tắc thiết kế infographic
1. **Mỗi infographic giải thích đúng một khái niệm** trong vòng **60 giây** — đủ ngắn để không gây chán, đủ đầy đủ để hiểu ý chính.
2. Bên dưới infographic luôn có **phần văn bản đầy đủ** cho người muốn đọc sâu hơn.
3. **Không dùng video** — video nặng, khó cập nhật, kém tương tác. Thay vào đó dùng hình vẽ (SVG) có hoạt cảnh nhẹ theo thao tác cuộn trang (scroll-driven) hoặc theo từng bước bấm.

### Danh sách chủ đề theo thứ tự ưu tiên

| Nhóm | Chủ đề | Độ khó | Khi nào làm |
|------|--------|--------|-------------|
| Nền tảng | Chuỗi truyền động: dây cót → bánh răng → bộ thoát → bánh lắc | Trung bình | Giai đoạn 2 |
| Nền tảng | Bộ thoát (escapement) Thụy Sĩ — nguyên lý "tích tắc" | Cao | Giai đoạn 2 |
| Nền tảng | Bánh lắc & dây tóc — nguồn gốc tần số dao động (vph) | Trung bình | Giai đoạn 2 |
| Nền tảng | Cơ chế lên dây tự động (rotor, ly hợp một chiều) | Trung bình | Giai đoạn 2 |
| Chức năng | Chronograph — bánh răng cột (column wheel) so với cam | Cao | Giai đoạn 3 |
| Chức năng | Lịch vạn niên (perpetual calendar) | Cao | Giai đoạn 3 |
| Chức năng | GMT / múi giờ thứ hai | Thấp | Giai đoạn 2 |
| Chức năng | Trữ cót (power reserve) | Thấp | Giai đoạn 2 |
| Cao cấp | Tourbillon — nguyên lý và tranh luận về công dụng thực tế | Cao | Giai đoạn 3 |
| Cao cấp | Minute repeater — cơ chế điểm chuông | Rất cao | Giai đoạn 3 |
| Bổ trợ | Chống nước hoạt động thế nào | Thấp | Giai đoạn 2 |
| Bổ trợ | Chống từ và vật liệu silicon | Trung bình | Giai đoạn 2 |

> **Lưu ý kỹ thuật quan trọng:** Mỗi infographic được **thiết kế và lập trình riêng** (không dùng mẫu có sẵn). Do đó mỗi infographic mới đều cần một người có kỹ năng lập trình — **bạn không tự tạo/sửa được phần kỹ thuật của infographic**, chỉ tự sửa được phần chữ (nhan đề, nhãn, mô tả) nằm trong tệp Markdown bên cạnh.

### Cách thực hiện (phần kỹ thuật — tôi sẽ lo)
- **Hình vẽ:** SVG (vector, phóng to không mờ, nhẹ, dễ hoạt cảnh).
- **Hoạt cảnh:** GSAP ScrollTrigger hoặc Framer Motion cho SVG.
- **Phần chữ đi kèm:** Markdown, bạn tự sửa được.
- Mỗi infographic là một **component riêng** trong mã nguồn, có thể tái sử dụng và bảo trì độc lập.

---

## 4. Công nghệ sử dụng và lý do chọn

| Công nghệ | Nó làm gì | Vì sao chọn |
|-----------|-----------|-------------|
| **Astro** | Bộ công cụ tạo website tĩnh — biến bài viết của bạn thành các trang web (HTML) sẵn sàng tải. | Xuất ra HTML thuần nên **tải cực nhanh**, không cần máy chủ chạy liên tục, **chi phí rẻ** (miễn phí khi đặt trên Cloudflare Pages/Netlify). Phù hợp với trang nội dung, hỗ trợ tốt hoạt cảnh. |
| **Tailwind CSS** | Công cụ tạo giao diện (màu, chữ, khoảng cách, bố cục) bằng các lớp tiện ích. | Giúp giao diện **gọn, đồng nhất** toàn trang. Đổi phong cách chỉ cần chỉnh ở một chỗ. |
| **Markdown / MDX** | Cách viết nội dung bằng văn bản thuần (như soạn email). | **Bạn tự viết và sửa bài viết mà không cần biết lập trình.** Mở tệp `.md`, gõ chữ, lưu lại là xong. MDX cho phép chèn infographic (phần kỹ thuật) vào bài viết khi cần. |
| **GSAP / Framer Motion** | Thư viện tạo hoạt ảnh cho hình vẽ SVG. | Cho phép infographic "sống động" theo thao tác cuộn trang hoặc theo bước bấm. |
| **Cấu trúc đa ngôn ngữ** | Sắp xếp nội dung theo từng thư mục ngôn ngữ (`vi/`, `en/`). | **Sẵn sàng thêm tiếng Anh** sau này mà không phải thiết kế lại. |

### Hosting và tên miền
- **Hosting:** Cloudflare Pages hoặc Netlify — **miễn phí ở giai đoạn đầu**, tự động cập nhật mỗi khi bạn sửa nội dung.
- **Tên miền:** nên chọn tên ngắn, dễ nhớ, ưu tiên đuôi **.com** hoặc **.vn**.

**Tóm lại:** Astro + Tailwind + GSAP lo phần kỹ thuật. Markdown lo phần nội dung — phần bạn sẽ trực tiếp chỉnh sửa.

---

## 5. Quy ước đặt tên tệp và thư mục

> **Quy ước** là thỏa thuận chung về cách đặt tên để mọi người (và cả tôi) đều dễ tìm, dễ sửa.

### Cấu trúc thư mục chính
```
dong-ho-co/                      ← Thư mục gốc của website  ← ĐỔI
├── src/
│   ├── pages/                   Mỗi tệp ở đây = một trang web
│   │   ├── index.astro          → Trang chủ (/)
│   │   ├── ve-chung-toi.astro   → /ve-chung-toi
│   │   ├── lien-he.astro        → /lien-he
│   │   ├── thuong-hieu/         → Trụ cột 1
│   │   ├── mau-iconic/          → Trụ cột 2
│   │   ├── co-che/              → Trụ cột 3 (infographic)
│   │   ├── tu-dien/             → Từ điển thuật ngữ
│   │   └── huong-dan/           → Hướng dẫn thực hành
│   ├── content/                 TOÀN BỘ NỘI DUNG CỦA BẠN ở đây (Markdown)
│   │   ├── vi/                  Nội dung tiếng Việt
│   │   │   ├── thuong-hieu/     Mỗi tệp = một thương hiệu
│   │   │   ├── mau-iconic/      Mỗi tệp = một mẫu iconic
│   │   │   ├── co-che/          Mỗi tệp = một cơ chế (đi kèm infographic)
│   │   │   ├── tu-dien/         Mỗi tệp = một thuật ngữ
│   │   │   └── huong-dan/       Mỗi tệp = một bài hướng dẫn
│   │   └── en/                  Để dành cho tiếng Anh (sau này)
│   ├── components/              Các mảnh giao diện dùng lại
│   │   ├── infographics/        ← Các infographic riêng (phần kỹ thuật, tôi lo)
│   │   ├── Header.astro
│   │   └── Footer.astro
│   └── layouts/                 Bộ khung trang (phần đầu/chung quanh mọi trang)
├── public/                      Ảnh, biểu tượng, các tệp tĩnh
└── PROJECT.md                   Tệp này
```

**Hai thư mục bạn cần quan tâm nhất:**
- `src/content/` — nơi bạn **viết và sửa nội dung** (bài viết, thương hiệu, mẫu iconic, thuật ngữ...).
- `public/` — nơi bạn **đặt ảnh** để chèn vào bài.

Các thư mục còn lại (`pages`, `components`, `layouts`) là phần kỹ thuật, tôi sẽ lo, bạn ít khi đụng tới.

### Quy tắc đặt tên
- **Chữ thường toàn bộ** — tránh chữ HOA để không nhầm lẫn trên các hệ thống khác nhau.
- **Dùng dấu gạch ngang thay cho khoảng trắng** — ví dụ: `rolex-submariner.md` chứ không phải `Rolex Submariner.md`.
- **Không dấu** cho tên tệp và địa chỉ web — ví dụ: `tu-dien` (không phải `từ-điển`).
- **Tên gợi nhớ nội dung** — đặt tên tệp theo chủ đề, không dùng số thứ tự kiểu `bai1.md`.

**Ví dụ đúng:** `rolex-submariner.md`, `rolex-14060M.md`
**Ví dụ sai:** `Bài 1 - Rolex.md`, `Bài 1.md`, `bai 1.md`

### Frontmatter (thông tin đầu bài viết)
Mỗi tệp nội dung bắt đầu bằng một khối thông tin nhỏ (gọi là *frontmatter*) nằm giữa hai dòng `---`:
```
---
title: "Rolex Submariner — Huyền thoại lặn sâu"
slug: "rolex-submariner"
date: "2026-07-31"
excerpt: "Câu chuyện về mẫu đồng hồ lặn định hình toàn bộ thể loại."
brand: "Rolex"
cover_image: "/images/mau-iconic/rolex-submariner.jpg"
---
```
> Đừng lo nếu nhìn phức tạp — bạn chỉ cần điền các trường giữa hai dấu nháy. Khi tôi khởi tạo website, mỗi loại bài sẽ có một **bài mẫu** để bạn copy và dùng làm khuôn.

---

## 6. Nguyên tắc thiết kế (màu sắc, font chữ, khoảng cách)

> Phong cách tổng thể: **Sang trọng nhưng dễ đọc** — kết hợp cảm giác cao cấp của đồng hồ cơ với sự thoáng đãng, dễ đọc của một nền tảng kiến thức. Vì người đọc sẽ đọc lâu, nên ưu tiên sự thoải mái cho mắt hơn là hiệu ứng hào nhoáng.

### Màu sắc
Bảng màu được định nghĩa ở **một chỗ duy nhất** trong mã, nên khi muốn đổi tone, chỉ cần đổi vài dòng là toàn website cập nhật theo.

| Vai trò | Màu | Mã màu | Dùng cho |
|---------|-----|--------|----------|
| Nền chính | Kem sáng | `#FAF7F2` | Nền các trang (ấm và dịu mắt hơn trắng tuyết) |
| Chèn | Gần đen | `#1A1A1A` | Toàn bộ chữ nội dung |
| Điểm nhấn | Vàng đồng | `#B8893C` | Nút bấm, đường gạch dưới, chi tiết nổi bật |
| Màu phụ | Navy đậm | `#1F2D3D` | Tiêu đề lớn, chân trang, thanh menu |

> **Vì sao chọn tông này?** Vàng đồng và navy gợi nhớ đến kim loại và mặt số của đồng hồ cơ cao cấp, tạo cảm giác lâu đời, đáng tin — nhưng nền sáng giúp đọc lâu không mỏi mắt.

### Font chữ
- **Tiêu đề** (tiêu đề bài, tên trang): font **có chân (serif)** — thanh lịch, sang trọng. Ví dụ: *Playfair Display* hoặc *Lora*.
- **Nội dung** (đoạn chữ): font **không chân (sans-serif)** — sạch sẽ, dễ đọc. Ví dụ: *Inter*.

> Font được tải từ Google Fonts (miễn phí). Tải trước (preloading) để chữ hiện nhanh khi mở trang.

### Khoảng cách và bố cục
- **Ưu tiên điện thoại trước (mobile-first):** bố cục thiết kế cho màn điện thoại trước, rồi mới điều chỉnh cho máy tính. Vì phần đông người đọc xem bằng điện thoại.
- **Nhiều khoảng trắng:** lề rộng, khoảng cách giữa các đoạn thoáng để mắt được nghỉ.
- **Chiều rộng dòng đọc vừa phải:** trên máy tính, khối chữ không trải dài hết màn hình mà giới hạn ở mức dễ đọc (khoảng 65–75 ký tự mỗi dòng).
- **Bố cục nhất quán:** mọi trang dùng chung bộ khung (cùng thanh menu trên cùng, cùng chân trang dưới), chỉ phần giữa thay đổi.

### Ưu tiên tải nhanh
- Ảnh được tự động tối ưu (nén, đổi kích thước phù hợp).
- Hoạt cảnh (cho infographic) chỉ chạy khi cần, không cản trở việc tải trang.
- Bài viết tải gần như tức thì khi nhấp vào.

---

## 7. Lộ trình — chia giai đoạn

> Toàn bộ kế hoạch rất lớn với người không code. Để tránh rủi ro và đến kết quả từng bước, tôi chia làm **3 giai đoạn**. Mỗi giai đoạn có mục tiêu rõ ràng, bạn có thể dừng ở bất kỳ đâu và website vẫn dùng được.

### Giai đoạn 1 — Xây nền tảng (đang thực hiện) ✅
**Mục tiêu:** website chạy được, có cấu trúc đúng, có nội dung mẫu để bạn xem cách hoạt động.

- [x] Khởi tạo dự án Astro + Tailwind CSS
- [x] Cấu trúc đa ngôn ngữ (vi/en) sẵn sàng
- [x] Bộ khung giao diện (layout, header, footer, màu, font)
- [x] Nội dung mẫu cho 3 trụ cột (thương hiệu, mẫu iconic, từ điển) — bằng Markdown để bạn tự sửa
- [x] Trang chủ + các trang cốt lõi (về chúng tôi, liên hệ)
- [x] Website chạy được trên máy bạn
- [ ] Infographic (chưa có ở giai đoạn này — chuyển sang giai đoạn 2)

> **Kết quả:** Bạn có một website tiếng Việt về đồng hồ cơ, nội dung 3 trụ cột, tự sửa được bằng Markdown. Chưa có infographic — nhưng nền đã vững để thêm.

### Giai đoạn 2 — Cơ chế & infographic đầu tiên (kế tiếp)
**Mục tiêu:** ra mắt hạng mục đặc biệt nhất — thư viện infographic động.

- [ ] Thư viện infographic với các chủ đề "thấp/trung bình": chống nước, chống từ, trữ cót, GMT, chuỗi truyền động, lên dây tự động, bánh lắc & dây tóc.
- [ ] Mỗi infographic có phần chữ đi kèm (Markdown, bạn tự sửa được).
- [ ] Hoạt cảnh scroll-driven bằng GSAP.
- [ ] Đặt website lên mạng (Cloudflare Pages hoặc Netlify) để người khác xem được.

### Giai đoạn 3 — Chuyên sâu & mở rộng
**Mục tiêu:** nội dung đầy đủ, đa ngôn ngữ, phát triển cộng đồng.

- [ ] Các infographic khó nhất: bộ thoát Thụy Sĩ, chronograph, lịch vạn niên, tourbillon, minute repeater.
- [ ] Thêm tiếng Anh (đã sẵn sàng cấu trúc).
- [ ] Hướng dẫn thực hành đầy đủ.
- [ ] Mở rộng nội dung thương hiệu và mẫu iconic.
- [ ] Tối ưu SEO, theo dõi thống kê truy cập.

---

## Ghi chú cuối

- **Tệp này là bản kế hoạch tổng thể**, sẽ cập nhật khi dự án tiến triển.
- **Tên thương hiệu ví dụ** "Đồng Hồ Cơ" cần được thay bằng tên thật khi bạn chốt.
- **Bước tiếp theo ngay sau đây:** tôi khởi tạo cấu trúc website giai đoạn 1 (xem chi tiết mục 7).
