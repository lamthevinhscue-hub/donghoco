# Bằng chứng WASM có thể tái kiểm — deploy 1 vs deploy 2 (TXN-20260909-12)

## Điều kiện chung

- Trình duyệt: **HeadlessChrome/152.0.0.0** (Playwright CLI, Windows NT 10.0, Win64, x64) — `navigator.userAgent` ghi lúc chạy.
- Phiên sạch, không tiện ích. Preview sau Deployment Protection (SSO); truy cập tự động bằng bypass header **chỉ gắn cho request cùng origin** (route handler — không gắn toàn cục).
- Thao tác chuẩn: mở trang → gõ "tourbillon" vào `#header-search-input` (trang chủ VI) hoặc `#hero-search-input-en` (`/en/`) → chờ 4 giây → đếm `.search-result` → mở kết quả đầu.

## Deploy 1 — `https://donghoco1-jc7sec1h5-vinh-lam.vercel.app` (`dpl_FKQEuE6QigextX1G5eFMXufMQMbx`)

- Thời điểm tái hiện: **2026-09-09T16:33:25Z** (23:33:25 +07).
- Hành động: goto `/` (status 200) → gõ "tourbillon" → chờ 4s.
- **Số kết quả tìm kiếm: 0.**
- **Thông điệp lỗi console ĐẦY ĐỦ** (nguyên văn, không chứa dữ liệu nhạy cảm):

```
Failed to load the Pagefind WASM:
CompileError: WebAssembly.instantiate(): Compiling or instantiating WebAssembly module violates the following Content Security policy directive because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self' 'unsafe-inline'".
```

- Ngữ cảnh: Pagefind đã nạp `pagefind.js` và `wasm.unknown.pagefind` (cùng origin) trước khi biên dịch; lỗi phát sinh ở bước biên dịch WASM. Header CSP của deploy 1: `script-src 'self' 'unsafe-inline'` (không có `wasm-unsafe-eval`).

## Deploy 2 — `https://donghoco1-3iqxqo0ji-vinh-lam.vercel.app` (`dpl_JCLoQ4mJbsJi1Bnraetyg5GKAD7P`)

- Thời điểm: 2026-09-09T16:34–16:42Z (các đợt ma trận).
- Header riêng cho deploy 2 (tệp `deploy-2-header-html-va-worker.txt`): HTML `/` và worker `/pagefind/pagefind-worker.js` đều mang `Content-Security-Policy` với `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'`; `X-Robots-Tag: noindex`.
- Cùng thao tác VI: **16 kết quả**, mở `/mau-iconic/greubel-double-tourbillon/` (không 404).
- Cùng thao tác EN ("chronograph"): **16 kết quả**, mở `/en/glossary/chronograph/` (không 404).
- Console/runtime/CSP: **0 lỗi, 0 vi phạm** trong toàn bộ các đợt.

## Cách tái kiểm (người nghiệm thu)

1. Cần truy cập preview: đăng nhập Vercel SSO trong trình duyệt (deploy còn sống, chưa xóa) HOẶC cấp bypass riêng theo quy trình của GPT Work.
2. Mở URL deploy tương ứng → F12 console → gõ "tourbillon" vào ô tìm kiếm → đọc console + số kết quả.
3. Đối chiếu header: `curl -sI <url>/` và `curl -sI <url>/pagefind/pagefind-worker.js` (kèm bypass nếu chưa đăng nhập).
