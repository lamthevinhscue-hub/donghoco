# Chuẩn bị công cụ Vercel + bản sao preview (TXN-20260909-08) — 09/09/2026

Không chứa token/cookie/secret. Chưa deploy, chưa bật enforcement.

## CLI

- **Vercel CLI 59.14.0**, cài tạm ngoài repo: `C:\Users\Admin\.zcode-cli-tmp\vercel-p21` (`npm i vercel@59.14.0` vào thư mục riêng, không đụng `package.json`/`package-lock.json` của repo).
- Lệnh gọi đúng: `node node_modules/vercel/dist/index.js <lệnh>` — shim `node_modules/.bin/vercel` chạy qua Git Bash bị lỗi spawn worker nội bộ (`Worker timed out… EPIPE`), gọi thẳng qua node thì ổn.
- Đăng nhập: **đã có phiên đăng nhập sẵn trên máy** — `vercel whoami` trả về account `lamthevinhscue-4860`. Không đọc/hiện token. Không cần anh Vinh xác thực thêm cho bước này.

## Project xác định (chỉ đọc)

- Account có 10 project; project của website là **duy nhất** và rõ: **`donghoco1`** | id `prj_v3n9Ofk1lfr9OVuarXpgikeabdJV` | team `vinh-lam` (`team_kwGPE2zFx2wiqU9KNI082hjl`) | production `https://donghoco1.vercel.app` (khớp AGENTS.md). Các project còn lại không liên quan website.
- Không tạo project mới, không đổi settings/domain/biến môi trường.

## Biến môi trường cho form (chỉ tên, KHÔNG đọc giá trị)

`vercel env ls` (trong bản sao đã link): `PUBLIC_FORMSPREE_ID` — **environments: Preview, Production** (giá trị "Hidden"/Secret, không mở).

→ **Form sẽ hiển thị trên bản preview** — điều kiện để kiểm validation + luồng mạng form ở chặng B đã đủ, không cần cấp thêm cấu hình. Vẫn giữ giới hạn: không submit form thật.

## Bản sao sạch phục vụ chặng B

- Đường dẫn: `C:\Users\Admin\.zcode-cli-tmp\p21-preview-copy` (ngoài mọi repo dự án).
- Nguồn: `git clone` từ `D:\Watch web build` tại HEAD **`82f450e`**; working tree sạch sau clone; **không mang** `.env`, `node_modules`, `dist`, `.vercel` (đã kiểm `ls`).
- Đã `vercel link --yes --project donghoco1` **trong bản sao** → `.vercel/project.json` của bản sao: `{projectId: prj_v3n9Ofk1lfr9OVuarXpgikeabdJV, orgId: team_kwGPE2zFx2wiqU9KNI082hjl, projectName: donghoco1}`. Repo chính **không** được link.
- `vercel.json` trong bản sao: đã đổi **đúng 1 key** `Content-Security-Policy-Report-Only` → `Content-Security-Policy`, giá trị giữ nguyên; JSON hợp lệ sau sửa. Diff: `chinh-sua-vercel-json-ban-sao.diff`.
- Tác dụng phụ do CLI sinh trong bản sao (ghi nhận, không xóa): `.env.local` (do `vercel link` kéo về — gitignored trong bản sao, không upload, không mở nội dung) và một dòng thêm vào `.gitignore` của bản sao. Cả hai nằm ngoài git của bản sao dưới dạng thay đổi cục bộ chưa commit — bản thân diff vercel.json không bị ảnh hưởng.
- Chưa chạy deploy, chưa chạy build trên Vercel. Bản sao và preview (khi có) để dành cho GPT Work nghiệm thu độc lập — không xóa trước khi kiểm tra xong.
