# Hai bản preview chặng B (TXN-20260909-10) — 09/09/2026

Cả hai deploy từ bản sao `C:\Users\Admin\.zcode-cli-tmp\p21-preview-copy` (HEAD `82f450e`), lệnh `vercel deploy --target=preview --scope vinh-lam --yes` (CLI 59.14.0). Không `--prod`, không promote/alias/domain, không `--prebuilt`, không đụng project settings.

## Deploy 1 — chỉ đổi tên header (enforcement, CHƯA có wasm-unsafe-eval)

- URL: `https://donghoco1-jc7sec1h5-vinh-lam.vercel.app`
- Deployment ID: `dpl_FKQEuE6QigextX1G5eFMXufMQMbx` · target `preview` · status Ready · tạo 22:20:16 (+07), Ready in 2m
- Cấu hình: `Content-Security-Policy` (enforcement) — giá trị nguyên văn như Report-Only cũ; `script-src 'self' 'unsafe-inline'`
- Build Vercel: chuỗi `npm run build` đầy đủ ĐẠT — 286 trang, 19.827 link, Pagefind index, ngân sách 3D ĐẠT (OrbitControls 4,4 KB + exploded3d 131,4 KB gzip)
- Header: HTML `/` và `/giai-phau/` trả `Content-Security-Policy` 200 OK (không Report-Only); `/pagefind/pagefind-worker.js` cũng mang enforcement CSP; `X-Robots-Tag: noindex` (preview không index). Chi tiết: `preview-header-qua-cli.txt`
- **Kết quả kiểm tìm kiếm: THẤT BẠI với vi phạm CSP thật** (xem dưới) → kích hoạt điều kiện được phép tạo deploy 2

### Vi phạm WASM (bằng chứng đủ điều kiện thêm wasm-unsafe-eval)

- Trang: `/` (chủ VI), hành vi: gõ "tourbillon" vào ô tìm kiếm header
- Console error nguyên văn (đã cắt 200 ký tự):
  `Failed to load the Pagefind WASM:\nCompileError: WebAssembly.instantiate(): Compiling or instantiating WebAssembly module violates the following Content Security policy directive because 'unsafe-eval'…`
- Ngữ cảnh: lỗi xuất hiện trong console trang sau khi Pagefind nạp `pagefind.js` + `wasm.unknown.pagefind` (cùng origin); số kết quả tìm kiếm = 0. Trang/worker liên quan: SearchInline chạy trong trang; Pagefind có thêm `pagefind-worker.js` (worker riêng, response của worker cũng mang CSP enforcement — đã chụp header)
- Đối chiếu: cùng thao tác trên production (Report-Only) KHÔNG có lỗi này và có nạp fragment kết quả → sai khác đúng nằm ở enforcement

## Deploy 2 — enforcement + 'wasm-unsafe-eval' (thay đổi hẹp được phép khi có bằng chứng)

- Cấu hình: như deploy 1 + `'wasm-unsafe-eval'` trong `script-src` (diff: `diff-ban-sao-deploy-2-wasm.diff`)
- URL: `https://donghoco1-3iqxqo0ji-vinh-lam.vercel.app`
- Deployment ID: `dpl_JCLoQ4mJbsJi1Bnraetyg5GKAD7P` · target `preview` · status Ready · tạo 22:43:02 (+07)
- Ma trận kiểm thử chạy trên bản này — lưới đầy đủ: `ma-tran-day-du-4-to-hop.md`; bằng chứng WASM: `bang-chung-wasm-co-the-tai-kiem.md`

## Lưu ý an toàn đã phát sinh (GPT Work cần biết)

1. Preview nằm sau **Deployment Protection (SSO)** — trình duyệt không đăng nhập nhận 302 → `vercel.com/sso-api`. Đã dùng `vercel curl` (bypass tự động chính thức của CLI) và một **bypass token do CLI tự sinh** để chạy kiểm thử tự động. Bảo vệ SSO cho người dùng thường vẫn nguyên; **nên revoke bypass token trong dashboard sau nghiệm thu**. Trong quá trình bấm máy, **~6–8 ký tự đầu của secret đã lọt vào log phiên** (lỗi thao tác cắt của tôi) — lý do thêm để revoke token này sau khi kết thúc.
2. Production đối chứng trước/sau deploy: cả `www.kienthucdonghoco.vn` lẫn `donghoco1.vercel.app` vẫn chỉ có `Content-Security-Policy-Report-Only` (tệp `production-header-truoc-deploy.txt`, `header-sau-deploy.txt`).
