# BIÊN BẢN C5 — KIỂM TRA TỰ ĐỘNG TRÊN GITHUB (vòng thi công)

**Gói:** C5 — GitHub Actions chạy `npm run check` + `npm run build` mỗi push main / PR vào main; dùng runner tiêu chuẩn miễn phí
**Danh mục:** DHC-HOAN-THIEN-20261011 v1.0.0
**Câu lệnh:** TXN-20261017-67 (GPT Work giao cấu hình trọn, action SHA đã đối chiếu nguồn 17/10/2026)
**Nền:** `0397f12` = origin/main (C4 đã phát hành)
**Bên thi công:** GLM. Bên nghiệm thu: GPT Work (đối chiếu run thật xanh trên GitHub mới được đánh dấu hoàn tất).

## 1. Phạm vi thi công (đúng câu lệnh)

| Tệp | Hành động |
|---|---|
| `.github/workflows/ci.yml` | **Tạo mới** — đúng YAML giao (mục 2) |
| `docs/nghiem-thu/C5-github-actions-2026-10-17.md` | **Tạo mới** — biên bản này |
| `docs/giao-viec/THEO-DOI.md` | **Sửa — chỉ hàng C5** |

Không đụng: package.json, lockfile, checker, generator, mã website, dependabot.yml, vercel.json, hồ sơ gói khác. Không đổi thiết lập GitHub/Vercel, không secrets, không artifact, không continue-on-error, không `|| true`, không `pull_request_target`, không matrix/schedule, không larger runner.

## 2. Workflow `ci.yml` — cấu hình đã tạo

- `name: CI`; trigger `push` (branches [main], paths-ignore `docs/**`, `output/**`) + `pull_request` (branches [main], cùng paths-ignore) + `workflow_dispatch`.
- `permissions: contents: read` duy nhất; `concurrency.group = ${{ github.workflow }}-${{ github.event_name }}-${{ github.event.pull_request.number || github.ref }}`, `cancel-in-progress: true`.
- Một job `check-build`: `runs-on: ubuntu-24.04`, `timeout-minutes: 30`, `shell: bash`, `ASTRO_TELEMETRY_DISABLED: '1'`.
- 6 bước: Checkout `actions/checkout@d23441a48e516b6c34aea4fa41551a30e30af803` (v6; fetch-depth 1, persist-credentials false) → Setup Node `actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38` (v6; Node 24, cache npm, cache-dependency-path package-lock.json) → Tool versions → `npm ci` → `npm run check` → `npm run build`.
- Cache npm là cache **tải gói**, không cache node_modules/dist/output; cache miss lần đầu là bình thường.
- Build đã tự chạy check lần nữa trong chuỗi package.json — giữ nguyên hợp đồng, chấp nhận chạy lặp (đúng chỉ dẫn, không tối ưu bằng sửa chuỗi cũ).

## 3. Tự kiểm đã chạy (mục 5 câu lệnh)

**a) Parse YAML bằng thư viện có sẵn** — `output/c5-github-actions-audit/kiem-cau-truc-ci.mjs` (yaml 2.9.1 trong node_modules, không thêm dependency) → **ĐẠT** (`kiem-cau-truc-ci.json`): on push/PR [main] + hai paths-ignore + workflow_dispatch; permissions contents:read; concurrency; 1 job đúng runner/timeout/shell/env; 6 bước đúng thứ tự; hai action khóa đúng SHA; không secrets/deploy/artifact/continue-on-error/`|| true`/pull_request_target/matrix/schedule. (Lỗi đã va khi dựng checker: mẫu cấm `PAT` không biên từ khớp nhầm "paths-ignore" — đã sửa `\bPAT\b`.)

**b) Bảng đối chiếu trigger (KIỂM CẤU HÌNH — chưa phải sự kiện Actions thật):**

| Kịch bản push/PR | paths-ignore áp dụng | CI chạy? |
|---|---|---|
| Chỉ `docs/**` | bỏ toàn bộ | Không |
| Chỉ `output/**` | bỏ toàn bộ | Không |
| `docs/**` + `output/**` | bỏ toàn bộ | Không |
| `docs/**` + `src/**` | có tệp ngoài nhóm bỏ | Có |
| `.github/workflows/ci.yml` | tệp ngoài nhóm bỏ | Có |
| `package-lock.json` / `scripts/**` / `public/**` | ngoài nhóm bỏ | Có |
| `CONTENT-GUIDE.md` (gốc) | ngoài nhóm bỏ | Có |
| Giao diện GitHub "Run workflow" | workflow_dispatch | Có (thủ công) |

**c) Bản sao sạch từ commit `0397f12`** (git archive — không phải working tree, không node_modules/dist máy) + candidate ci.yml, tại `D:/v5-kiem-chung`:
- `npm ci` → exit 0 (`san-sach-npm-ci.log`)
- `npm run check` → exit 0 (`san-sach-check.log`)
- `npm run build` → exit 0, dist/index.html có (`san-sach-build.log`)
- Môi trường thật: **Windows 10 (win32 10.0.26200), Node v24.18.0, npm 11.16.0**. **Windows chạy xanh KHÔNG chứng minh Linux runner chạy xanh** — run thật trên `ubuntu-24.04` là bằng chứng quyết định (mục 6).
- WSL/Docker trên máy: Docker không có; kiểm Linux bổ sung không bắt buộc — không cài act/Docker chỉ cho gói này.

**d) actionlint:** máy chưa có → **chưa chạy** (ghi đúng thực tế; YAML parse không thay thế lần chạy GitHub thật).

**e) Diff-check trên repo làm việc:** `npm run check` exit 0; `git status` xác nhận thay đổi đúng **3 tệp** phạm vi (ci.yml + biên bản + THEO-DOI hàng C5).

## 4. Ý nghĩa và giới hạn (mục 4 câu lệnh)

- CI phát hiện lỗi trên GitHub; **không bảo đảm Vercel đợi CI** trước khi triển khai — không đổi quan hệ này trong C5.
- Không gọi lượt bị path-ignore bỏ qua là "đã kiểm đạt"; chưa bật required check/chặn merge.
- Hạn mức: repo **public** → runner tiêu chuẩn miễn phí; cấu hình không dùng larger runner.

## 5. Điều kiện dừng (chưa va)

Chưa cần sửa mã/checker cho Linux, chưa thêm dependency/secret, chưa đụng thiết lập GitHub/Vercel.

## 6. Đề xuất

GPT Work nghiệm thu cấu hình (biên bản + audit `output/c5-github-actions-audit/`) → duyệt phạm vi phát hành (ci.yml + biên bản + THEO-DOI hàng C5) theo khuôn E → sau push, GPT Work đối chiếu **run thật xanh trên GitHub** (workflow_dispatch hoặc push sau phát hành) → mới đánh dấu C5 hoàn tất. Nếu run đỏ: dừng báo, không tự đẩy bản sửa khi chưa có phép.

## 7. Phát hành + run thật trên GitHub (khuôn E sau phép TXN-68)

- THEO-DOI stage **blob riêng = HEAD + chỉ hàng C5**; staged đúng **3 tệp** (ci.yml, biên bản C5, THEO-DOI); remote còn `0397f12` trước commit; output/ không phát hành.
- **Commit `0e28e79742e69f937414b138b2eaa29ed39b0bf5`** — "feat(ci): add check and build workflow for push and PR" — push main (`0397f12..0e28e79`). Push chạm ci.yml (ngoài paths-ignore) → **run CI tự tạo ngay**.
- **Run thật trên GitHub: `CI` | head `0e28e79` | completed | success** — https://github.com/lamthevinhscue-hub/donghoco/actions/runs/39017564739
- Job "Check and build" — **toàn bộ bước success trên Linux (ubuntu-24.04)**: Set up job, Checkout, Setup Node, Tool versions, Install dependencies, **Check**, **Build**, Post Setup Node, Post Checkout, Complete job.
- Linux chạy xanh đã được chứng minh bởi run thật — không còn là giới hạn của mục 3c.
- Trạng thái gói: "Đã phát hành workflow — chờ xác nhận CI" → run xanh đạt, trình GPT Work xác nhận khép.
