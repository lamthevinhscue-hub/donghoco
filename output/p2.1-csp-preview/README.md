# Bằng chứng chặng A — P2.1 CSP (TXN-20260909-07)

Ngày chụp: 09/09/2026. Nền repo: `82f450e` (nhánh main). Không chứa token, cookie, dữ liệu form hay nội dung nhạy cảm — chỉ có URL request (origin hoặc path), kiểu tài nguyên, và văn bản console đã cắt ngắn.

## Các tệp

| Tệp | Nội dung | Cách sinh |
| --- | --- | --- |
| `mang-localhost-6-route.json` | Mọi request + console error/warning khi tải 6 route trên `astro preview` (localhost:4321): `/`, `/en/`, `/thuong-hieu/rolex`, `/co-che/perpetual-calendar`, `/giai-phau`, `/lien-he`. Route `/lien-he` có bấm nút submit form khi còn trống (không gửi dữ liệu). | playwright-cli `run-code`, tổng hợp request theo origin/path, hàm async một dòng |
| `mang-localhost-tim-kiem-3d.json` | Request khi gõ "tourbillon" vào ô tìm kiếm header (Pagefind nạp toàn bộ) và khi bấm tab 3D tại `/giai-phau` (hai chunk 3D nạp sau click). Trường `search_results: -1` được ghi là **phép đo chưa hợp lệ**, không dùng làm kết quả tìm kiếm. | playwright-cli `run-code` + click `#tab-anatomy-3d`, fill `#header-search-input` |
| `production-header-console.json` | Response header của tài liệu tại `https://www.kienthucdonghoco.vn/` (có `Content-Security-Policy-Report-Only`, KHÔNG có `Content-Security-Policy`, KHÔNG có `Report-To`), toàn bộ request trên luồng tìm kiếm + 3D tại production, console error/warning (0 cảnh báo CSP — nghĩa là "chưa quan sát thấy vi phạm trong các luồng đã ghi nhận"). | playwright-cli `run-code` trên production, bắt `page.on('response')` cho tài liệu gốc |
| `dem-script-dist.mjs` + `dem-script-dist.json` | Phép đếm thẻ script trong dist có thể tái lập (vòng đính chính TXN-20260909-08): 286 trang, 1.622 thẻ, 286 có src, 1.336 không src = 735 JSON-LD + 601 inline; 601 inline thuộc 23 đoạn duy nhất (băm nội dung đã chuẩn hóa). Chạy: `node output/p2.1-csp-preview/dem-script-dist.mjs`. | Node script trong thư mục này |

## Ghi chú trung thực

- Một lượt chụp production đầu tiên ghi nhận 1 console lỗi "404" với URL không kịp bắt; lượt kiểm tra riêng sau đó (chỉ liệt kê response ≥ 400) không có bất kỳ 4xx/5xx nào. Không suy diễn nguyên nhân.
- Trên localhost, `/_vercel/insights/script.js` trả 404 — đây là hành vi đúng của môi trường không phải Vercel; trên production, script analytics được Vercel phục vụ tại `/{project-id}/script.js` (cùng origin).
- Không submit form thật ở bất kỳ bước nào; không đổi trạng thái production; không deploy.
