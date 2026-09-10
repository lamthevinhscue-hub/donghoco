# README — P3.2 chặng A: kiểm kê gradient SVG (TXN-20260910-19)

Ngày chạy: 10/09/2026. Nền: `f33b4f0`. Build dùng cho phép thử trình duyệt: build 12:12–12:14 (+07 10/09), exit 0.

## Cách chạy lại

```bash
node output/p3.2-svg-gradient-audit/quet-gradient.cjs   # quét src + public SVG + dist → kiem-ke-gradient.json
node output/p3.2-svg-gradient-audit/phan-nhom-id.cjs    # phân nhóm chữ ký + ID trùng + url(#) missing (in console)
node output/p3.2-svg-gradient-audit/phan-nhom.cjs       # sinh nhom-gradient.json
```

Đo truyền tải (nếu cần, cho ảnh — không áp dụng gradient vì gradient là markup inline, không phải tệp tải riêng): xem `do-luong-truyen-tai.json` ở gói P3.1 cùng thư mục output.

## Các tệp

| Tệp | Nội dung |
| --- | --- |
| `quet-gradient.cjs` | Công cụ quét (chỉ đọc): định nghĩa linearGradient/radialGradient (kèm biến màu CSS trong `style="stop-color:var(--…)"`), tham chiếu `url(#…)` và `href` — quét src/ (astro/ts/mjs/css/md), public/ (svg ngoài), dist/ (html/css/js) |
| `kiem-ke-gradient.json` | Dữ liệu thô: 117 định nghĩa (51 src + 66 render trong dist/28 route), 484 tham chiếu url(#), 0 href |
| `phan-nhom-id.cjs` | Phân nhóm chữ ký + kiểm ID trùng trong cùng tài liệu + url(#) missing |
| `phan-nhom.cjs` | Sinh `nhom-gradient.json` |
| `nhom-gradient.json` | 19 nhóm chữ ký: 7 nhóm trùng hoàn toàn (39 định nghĩa), 12 nhóm độc lập (12 định nghĩa) + 5 cặp gần trùng (chênh offset) |

## Ảnh bằng chứng ma trận (24 PNG)

| Route | Nhóm gradient đại diện | Ảnh |
| --- | --- | --- |
| /co-che/chronograph/ | steel-dọc --obs (11 thành viên), brass-chéo --obs (11), ruby radial (6), chronoPress (độc lập) | chronograph-{1440S,1440T,320S,320T}.png |
| /tu-dien/incabloc/ | steel-dọc --ig (5 — họ token khác --obs), brass-dọc-A, ruby | incabloc-{1440S,1440T,320S,320T}.png |
| /tu-dien/gmt/ | dial radial --ig (2), steel-dọc --obs, ruby | gmt-{1440S,1440T,320S,320T}.png |
| /co-che/pha-trang/ | brass-dọc-B (2), mph-moon độc lập | phatrang-{1440S,1440T,320S,320T}.png |
| /co-che/bo-thoat/ | Escapement: steel CHÉO (độc lập), brass-chéo, ruby, escBalance, marker escArrow | bothoat-{1440S,1440T,320S,320T}.png |
| /giai-phau/ | WatchExplodedView 5 defs + CSS filter gradient | giaiphau-2d.png |
| Reduced motion | reduce-truoc.png, reduce-play-1.png, reduce-play-2.png (thử nghiệm sau tương tác — xem ma-tran-bang-chung.json) | reduce-*.png |

Mỗi ảnh: element screenshot của đúng SVG infographic (không phải footer/trắng — đã tự mở kiểm tra bằng mắt). Trạng thái theme ghi trong `ma-tran-bang-chung.json` (html.dark xác minh từng ô; các ô tối đều đã xóa localStorage theme trước khi reload).

## Giới hạn

- `quet-gradient.cjs` quét src, public SVG và dist HTML/CSS/JS; thu thuộc tính href trên từng gradient và các tham chiếu url(#). Công cụ này dùng `lib-id.cjs` lập bảng ID cho HTML dist chứa tham chiếu. `phan-nhom-id.cjs` đọc bảng đó để phân loại đích và kiểm trùng/thiếu; kết quả tại `ket-qua-kiem-tra-tham-chieu.json`. Đây là phép quét snapshot bằng regex, không phải parser HTML tổng quát hay kiểm DOM sống trên mọi route.
- Kiểm tên tệp ảnh (`hero-bg.jpg`, `guilloche-tile.png`) trong src JSON và dist JS/JSON: làm bằng grep riêng — bản ghi lệnh + kết quả: `ban-ghi-kiem-tra-them.txt` (cùng thư mục này).
- Không route nào hiện có 2 instance cùng component → kịch bản "nhiều instance cần ID duy nhất" chưa tồn tại để kiểm; theo quyết định TXN-20260910-21 đã không tái cấu trúc nên không cần phép thử nhiều instance giả lập.
- Hai trường hợp `url(#…)` "missing" ban đầu là false positive của phiên scanner cũ (chỉ lập tập ID từ gradient, thiếu `<marker>`/`<filter>`/`<clipPath>`) — phiên `phan-nhom-id.cjs` đã sửa, chạy thật: **0 url(#) thiếu đích**.
