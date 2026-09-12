# G03 — Đường cơ sở người xem và tìm kiếm

- Giao dịch: TXN-20260912-12 · Danh mục DHC-NEXT-20260912 v1.0.0
- Thực hiện: GLM thực thi · Ngày: 12/09/2026 · Nền: `02309e6` (main, khớp `origin/main`; commit chỉ refresh evidence G02, không đụng mã website)
- Trạng thái: **đã thực hiện xong phép kiểm kê/đo trong phạm vi quyền có sẵn; chưa commit, chưa push. Dừng chờ GPT Work nghiệm thu. Chưa chuyển G04.** Báo cáo này là báo cáo kiểm kê — không gọi G03 "hoàn tất" trước khi được nghiệm thu.

## 1. Xác minh hiện trạng dựa trên kiểm tra thực tế (không suy từ tài liệu)

### 1.1. Mã nguồn và build (nền `02309e6`)

- Nền tảng analytics duy nhất có trong mã: `@vercel/analytics` v2.0.1, nhúng qua component `<Analytics />` trong `src/layouts/BaseLayout.astro` (dòng 16 import, dòng 187 render).
- **Không có** Google Analytics/gtag/GTM, Meta Pixel, Plausible, Matomo, Umami hay script tracking nào khác trong `src/`, `astro.config.mjs`, `vercel.json` (grep 12/09/2026).
- Tìm kiếm: Pagefind, chạy thuần trên trình duyệt. `src/scripts/searchCore.ts` không có lệnh `fetch`/`sendBeacon` — truy vấn tìm kiếm không rời máy người đọc (đối chiếu mã, 12/09/2026). Có bộ lọc ngôn ngữ `data-pagefind-filter="language"`.
- **Event trong mã**: `src/scripts/searchCore.ts` (dòng 101–115) định nghĩa `trackPagefindError` — event **`pagefind_error`** gửi qua `window.va` (Vercel Analytics), **chỉ phát khi Pagefind lỗi và `window.va` tồn tại**; dữ liệu gửi đi: `stage` + thông điệp lỗi cắt ngắn 200 ký tự, **không gửi chuỗi truy vấn**. Hiệu lực runtime chưa xác nhận (Analytics production chưa được quan sát phát — mục 1.2).
- Hệ quả: ngoài Vercel Analytics (page-view tự động + event `pagefind_error` khi lỗi), website **không có event hành vi nào khác** có trong mã.

### 1.2. Runtime production — hai domain (chỉ đọc mức công khai; 12/09/2026, curl + hai lượt trình duyệt thật)

| Kiểm | `https://www.kienthucdonghoco.vn` (domain chính/canonical) | `https://donghoco1.vercel.app` (Vercel alias) |
| --- | --- | --- |
| HTTP trang chủ | 200 | 200 |
| Canonical trong HTML | `https://www.kienthucdonghoco.vn/` | `https://www.kienthucdonghoco.vn/` |
| Script insights trong HTML xuất bản | **Không có** | **Không có** |
| Request Analytics khi tải trang (1 lượt trình duyệt/domain, chờ 8s) | **0 request** | **0 request** |
| Endpoint `/_vercel/insights/script.js` | **HTTP 200** (~3,1 KB) | **HTTP 200** (~3,1 KB) |
| Lỗi console trong lượt kiểm | 1 (không liên quan Analytics) | 0 |

Bằng chứng: `production-lot-2-ket-qua.json` (kết quả lượt kiểm sâu cả hai domain), `kiem-runtime-ket-qua.json` (lượt đầu), script `pw-production-sau.js`. Giới hạn: mỗi domain mới 1 lượt trình duyệt — số lượt kiểm nhỏ, kết quả "0 request" là **chưa quan sát** trong các lượt đó, không khẳng định trạng thái mọi lượt truy cập.

**Kết luận hiện trạng (theo đúng bằng chứng):** component `<Analytics />` có trong mã nhưng script insights **không xuất hiện trong HTML production của cả hai domain** và **chưa quan sát thấy beacon nào** trong các lượt kiểm. Endpoint trả 200 chỉ chứng minh nền Vercel sẵn sàng serve, **không chứng minh Analytics đang thu dữ liệu**; không có script/request trong các lượt kiểm chỉ là **chưa quan sát** — không khẳng định nguyên nhân hay trạng thái cấu hình dashboard. Nguyên nhân script không được chèn cần điều tra riêng — **ngoài phạm vi G03 (không sửa mã/cấu hình)**.

### 1.3. Runtime preview cục bộ

`/_vercel/insights/script.js` → **HTTP 404** (endpoint chỉ tồn tại trên Vercel) — hành vi đúng của môi trường cục bộ, không phải lỗi; đồng thời xác nhận preview không gửi dữ liệu gì.

## 2. Blocker quyền đọc dashboard (không vượt, không đăng nhập)

Kiểm lúc 08:03 UTC 12/09/2026 bằng trình duyệt tự động với context **không có phiên đăng nhập** (không dùng cookie/session có sẵn, không thử mật khẩu):

| Bề mặt | Kết quả |
| --- | --- |
| Google Search Console (`search.google.com/search-console`) | chuyển tới `/about` — không đọc được property nào |
| Google Analytics (`analytics.google.com`) | chuyển tới `accounts.google.com/v3/signin/identifier` |
| Vercel dashboard (`vercel.com/dashboard`) | chuyển tới `vercel.com/login` |

Bằng chứng: `kiem-runtime-ket-qua.json` (ghi URL yêu cầu/URL cuối/tiêu đề; đã che tham số truy vấn).

→ **Search Console, Google Analytics, Vercel Analytics dashboard: CHƯA QUAN SÁT ĐƯỢC dữ liệu** trong gói này (blocker: không có phiên đăng nhập trong môi trường GLM). Không suy "traffic bằng 0" — chỉ ghi "chưa có dữ liệu được đọc". Việc đọc số từ dashboard cần anh Vinh cung cấp quyền phiên (hoặc GPT Work đọc và tổng hợp) — tách khỏi G03.

## 3. Đo tìm kiếm trên bản build cục bộ

Điều kiện đo: `astro preview` cục bộ (localhost:4321) trên dist của build nền `02309e6` (build 12/09/2026, exit 0); viewport 1280×900; cache HTTP trình duyệt bật (bundle có thể phục vụ từ cache đĩa); ô tìm kiếm trực tiếp trong header; đo từ lúc bắn sự kiện `input` tới khi danh sách kết quả hiển thị ≥1 mục; chờ tối đa 20s; truy vấn là **truy vấn của người kiểm** (không phải dữ liệu người dùng). Thời điểm: 12/09/2026 ~08:10 UTC.

| Ngôn ngữ | Truy vấn | Lượt tải đầu (Pagefind chưa nạp trong phiên) | Lượt tiếp theo 1 | Lượt tiếp theo 2 |
| --- | --- | --- | --- | --- |
| VI | "bộ thoát" | **452 ms** — 8 kết quả | 222 ms — 8 kết quả | 223 ms — 8 kết quả |
| EN | "escapement" | **326 ms** — 8 kết quả | 204 ms — 8 kết quả | 219 ms — 8 kết quả |

Bằng chứng: `do-tim-kiem-ket-qua.json` (ghi thời điểm từng phép), script `pw-do-tim-kiem.js`.

Đọc kết quả đúng mức: lần tải đầu chậm hơn lần sau ở cả hai ngôn ngữ (phù hợp cơ chế Pagefind nạp index theo nhu cầu). **Không quan sát thấy lượt nào không ra kết quả trong 6 phép** — không kết luận về "lỗi chậm ở một mốc đơn lẻ" vì không có bằng chứng lặp lại; và các số này chỉ áp dụng cho môi trường preview cục bộ (production CDN có thể khác — chưa đo). Không thay đổi Pagefind/UI/kiến trúc tìm kiếm.

## 4. Bảng KPI trước/sau — khung đo (chưa có số "trước")

| KPI | Nguồn dữ liệu hiện có | Đo được ngay? | Giới hạn | Cách đo đề nghị |
| --- | --- | --- | --- | --- |
| Lượt nhấp tự nhiên, hiển thị, CTR theo truy vấn/trang đích | Google Search Console | **Không** — blocker đăng nhập (mục 2) | Chỉ GSC có dữ liệu tự nhiên | GPT Work/anh Vinh đọc dashboard Performance, xuất tổng hợp 28 ngày (truy vấn, trang đích, thiết bị, quốc gia) — mức tổng hợp |
| Thiết bị/ngôn ngữ người xem | Vercel Analytics | **Không** — beacon không phát (mục 1.2) | Cần Analytics hoạt động thật trước | Xác nhận script được nhúng (mục 6) rồi đọc dashboard theo kỳ 28 ngày |
| Chuyển từ Lịch sử sang bài Cơ chế | Chưa có kênh dữ liệu hành vi | **Không** — không event click nào tồn tại | Pagefind/timeline đều client | Event tổng hợp đếm click "Đọc chi tiết" trên thẻ timeline (danh sách đề nghị E2) |
| Sử dụng tương tác (tìm kiếm, lọc lớp, infographic) | Pagefind chạy client, không telemetry; event `pagefind_error` trong mã chỉ phát khi lỗi — không đủ cho KPI sử dụng | **Không** | Truy vấn không rời máy — không có số | Event tổng hợp đếm lượt tìm kiếm (danh sách đề nghị E1) + đếm mở infographic (E3) |
| Người đọc quay lại | Cần nền tảng có phân tách phiên/người | **Không** — chưa có nền tảng hoạt động | Rủi ro riêng tư cao nhất trong các KPI | Vercel Analytics audience (nếu bật) — ghi rõ mức tổng hợp; không dùng định danh cá nhân |

## 5. Hai danh sách tách biệt

### 5.1. Event/tín hiệu HIỆN CÓ (chỉ ghi khi có bằng chứng mã/runtime)

| Tín hiệu | Bằng chứng | Trạng thái |
| --- | --- | --- |
| Vercel Analytics (auto page-view) | component `<Analytics />` trong BaseLayout (mã); **nhưng** script không có trong HTML production của cả hai domain + 0 beacon quan sát (mục 1.2) | Có trong mã — **hiệu lực chưa xác nhận** |
| Event `pagefind_error` | định nghĩa trong `searchCore.ts` (qua `window.va`): chỉ phát khi Pagefind lỗi; dữ liệu = `stage` + thông điệp lỗi cắt 200 ký tự, không gửi truy vấn | **Được định nghĩa trong mã, chỉ phát khi lỗi** — hiệu lực runtime chưa xác nhận (phụ thuộc Analytics hoạt động) |
| Tìm kiếm Pagefind phía client | mã `searchCore.ts`, không gửi truy vấn đi; đo được hành vi cục bộ (mục 3) | Hoạt động — không telemetry |
| Bộ lọc ngôn ngữ tìm kiếm | `data-pagefind-filter="language"` trong BaseLayout + searchCore lọc theo ngôn ngữ | Hoạt động — không telemetry |
| Event hành vi khác (click, scroll, chuyển trang nội bộ) | không tìm thấy trong mã — event duy nhất được định nghĩa là `pagefind_error` (hàng trên) | Không tồn tại |

### 5.2. Event ĐỀ NGHỊ (chưa cài — chờ anh Vinh quyết; tất cả mức tổng hợp, không lưu chuỗi truy vấn thô, không định danh cá nhân)

| Mã đề nghị | Mục đích | Dữ liệu thu | Rủi ro riêng tư | Nền tảng cần | Điểm chờ quyết |
| --- | --- | --- | --- | --- | --- |
| E0 — Xác nhận Vercel Analytics hoạt động | Có kênh page-view cơ bản trước khi nói mọi KPI khác | Page-view tổng hợp (do nền tảng tự thu) | Thấp (nhà cung cấp quản lý, không cookie theo mặc định) | Vercel Analytics trên project | Điều tra vì sao script không nhúng vào HTML (cần quyền đổi cấu hình build/cấu hình component — ngoài G03) |
| E1 — Đếm lượt tìm kiếm | Đo "sử dụng tương tác" | Số lượt + ngôn ngữ trang; **không lưu** chuỗi truy vấn | Thấp | Vercel Analytics custom event (cần E0) | Anh Vinh duyệt cài |
| E2 — Đếm click "Đọc chi tiết" từ timeline | KPI chuyển Lịch sử → Cơ chế/bài đích | Số lượt + slug đích | Thấp | Vercel Analytics custom event | Anh Vinh duyệt cài |
| E3 — Đếm lượt mở infographic/mechanism animation | Đo sử dụng tương tác | Số lượt + tên component | Thấp | Vercel Analytics custom event | Anh Vinh duyệt cài |
| GSC-đọc | Lượt tự nhiên + CTR | Tổng hợp dashboard 28 ngày | Thuần tổng hợp | Quyền phiên GSC của anh Vinh/GPT Work | Cần anh Vinh cấp đọc hoặc tự tổng hợp |

## 6. Những gì CHƯA kiểm / CHƯA quan sát (bắt buộc ghi)

- **Chưa quan sát**: bất kỳ số liệu GSC/GA/Vercel dashboard nào (blocker đăng nhập, mục 2); beacon analytics trên production (0 beacon trong các lượt kiểm trên cả hai domain — nguyên nhân script không nhúng chưa xác định, không khẳng định trạng thái cấu hình); hành vi người dùng thật.
- **Chưa đo**: tìm kiếm trên production (chỉ preview cục bộ); Core Web Vitals; các truy vấn ngoài 2 truy vấn kiểm; thiết bị di động thật.
- **Chưa đủ dữ liệu**: mọi KPI mục 4 — ghi "chưa có dữ liệu được đọc", không suy traffic.
- Không cài event mới, không sửa mã, không đổi cấu hình — đúng giới hạn.

## 7. Build và Git

- `npm run build` trên nền `02309e6` (không đổi mã): **exit 0** — astro check 190 tệp **0 errors / 0 warnings / 4 hints** (baseline P3.1–P3.3); **286 trang**; **20.622 link, 0 hỏng**; G01 checker 63/63, G02 checker 16/16 ĐẠT (`log-build.txt`).
- `git diff --check`: sạch.
- Tracked modified: **0 tệp** (nền không đổi). Tệp mới chỉ gồm 2 khu vực được phép: biên bản này + `output/g03-audience-search-baseline/` (7 tệp: 3 script playwright, 3 JSON kết quả, 1 log build — xem danh sách dưới).
- Không chứa token, cookie, session, storage state, dữ liệu cá nhân; không ảnh dashboard; truy vấn trong bằng chứng là truy vấn kiểm của người thực hiện.

## 8. Danh sách chính xác tệp thuộc gói G03 (đề xuất commit)

1. `docs/nghiem-thu/G03-duong-co-so-nguoi-xem-va-tim-kiem-2026-09-12.md` (mới — biên bản này)
2. `output/g03-audience-search-baseline/` (7 tệp): `kiem-runtime-ket-qua.json`, `production-lot-2-ket-qua.json`, `do-tim-kiem-ket-qua.json`, `log-build.txt`, `pw-kiem-runtime.js`, `pw-production-sau.js`, `pw-do-tim-kiem.js` — danh sách đúng như `git status --porcelain output/g03-audience-search-baseline`.

Tổng: 8 tệp mới, 0 tệp sửa.

---

G03 đã thực hiện xong phép kiểm kê/đo trong phạm vi quyền và tự kiểm trong phạm vi báo cáo; chưa commit, chưa push, chưa deploy. Dừng chờ GPT Work nghiệm thu độc lập. Chưa chuyển G04.
