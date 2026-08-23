# Chỉ số kỹ thuật cần theo dõi — Core Web Vitals

Ngày lập: 23/08/2026. Mục tiêu theo dõi định kỳ cho Kiến Thức Đồng Hồ Cơ.

## Ngưỡng mục tiêu

| Chỉ số | Mục tiêu | Nghĩa |
|---|---|---|
| LCP (Largest Contentful Paint) | ≤ 2,5 giây | Thời gian phần tử lớn nhất (thường là tiêu đề hoặc ảnh hero) hiện ra |
| INP (Interaction to Next Paint) | ≤ 200 ms | Độ trễ phản hồi khi người dùng chạm/bấm |
| CLS (Cumulative Layout Shift) | ≤ 0,1 | Mức độ bố cục nhảy trong khi tải |

Quy tắc đo:

- **Không lấy Lighthouse làm bằng chứng duy nhất** — đây là bài kiểm mô phỏng trong phòng thí nghiệm. Bằng chứng chính là **dữ liệu người dùng thật (field data)** từ: Chrome UX Report / Core Web Vitals report trong Google Search Console (khi đã xác minh domain — xem `huong-dan-search-console.md`), hoặc PageSpeed Insights ở tab "Dữ liệu thực tế".
- Lighthouse chỉ dùng để chẩn đoán nguyên nhân khi số thật chưa đạt.

## Các quyết định kỹ thuật đã có trên site (giữ nguyên)

1. **Font**: Newsreader + Be Vietnam Pro tải từ Google Fonts với `display=swap`, đã `preconnect` tới fonts.googleapis.com và fonts.gstatic.com — chữ hiện ngay bằng font dự phòng, không chặn vẽ (tránh LCP xấu vì font).
2. **Ảnh**:
   - Ảnh dưới fold: `loading="lazy"` + `decoding="async"` (WatchImage mặc định lazy).
   - Ảnh LCP (ảnh bìa đầu bài): `loading="eager"` — KHÔNG lazy-load ảnh đầu màn hình.
   - Khung ảnh có `aspect-...` cố định + attr `width`/`height` danh nghĩa theo tỷ lệ → không xảy ra CLS khi ảnh tải về.
   - Chưa có ảnh thật trong nội dung (placeholder là SVG) — khi thêm ảnh thật phải giữ nguyên quy tắc khung tỷ lệ này.
3. **Animation**:
   - Mọi hoạt ảnh cơ chế dừng `requestAnimationFrame` khi ra khỏi viewport và khi tab ẩn (MechanismAnimation — đã nghiệm thu Prompt 1).
   - Animation trang trí chạy hữu hạn rồi dừng (CalibreMap 3 chu kỳ; mũi tên intro nảy 3 lần) — không còn animation vô hạn nào trên site.
   - `prefers-reduced-motion` tắt toàn bộ chuyển động trang trí (rule toàn cục trong global.css).
4. **Transitions** dùng `transform`/`opacity` (GPU) — không animate `width`/`top` gây jank (INP).

## Kiểm tra định kỳ (không cần code)

1. Mỗi tháng, vào https://pagespeed.web.dev → dán `https://www.kienthucdonghoco.vn` → xem tab **"Dữ liệu thực tế"** (nếu đã đủ người dùng) và ghi 3 số LCP/INP/CLS vào bảng theo tháng (cùng bảng với Search Console).
2. Khi Search Console đã có dữ liệu: mở **Trải nghiệm trang cốt lõi (Core Web Vitals)** trong mục Trải nghiệm — xem tỷ lệ URL "Tốt".
3. Nếu một chỉ số tụt: chạy tab "Chẩn đoán hiệu năng" (Lighthouse) của đúng trang đó để tìm nguyên nhân, nhưng quyết định sửa dựa trên số thật sau 28 ngày.

## Rủi ro đã biết, cần để ý khi site lớn lên

- Thêm ảnh thật nội dung: phải giữ khung tỷ lệ + lazy dưới fold — nếu quên sẽ vỡ CLS.
- Thêm font weight/mục mới: chỉ tải weight đang dùng (hiện 400–700 Be Vietnam Pro; Newsreader 500–700).
- Nhúng video/iframes (nếu sau này): cần `loading="lazy"` và khung tỷ lệ cố định.
