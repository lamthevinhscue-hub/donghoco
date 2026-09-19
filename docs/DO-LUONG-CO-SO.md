# ĐO LƯỜNG CƠ SỞ — KỲ 28 NGÀY ĐẦU TIÊN

**Ngày lập:** 19/09/2026 (gói H02, danh mục DHC-H14-20260919, giao dịch TXN-20260919-06)
**Nền:** HEAD `23cc961` = `origin/main`; production `https://www.kienthucdonghoco.vn`
**Múi giờ ghi số:** +0700 (Asia/Ho_Chi_Minh)
**Tài liệu bổ trợ:** [hướng dẫn Search Console một trang](huong-dan-search-console-mot-trang-2026-09-19.md), [kế hoạch hợp nhất mục 3.2](KE-HOACH-PHAT-TRIEN-HOP-NHAT-2026-09-19.md), [chỉ mục kế hoạch hiện hành](CHI-MUC-KE-HOACH-HIEN-HANH.md)

## 1. Quy tắc đọc tài liệu này

1. Chỉ ghi **số quan sát thực tế** kèm nguồn và ngày chụp. Không suy số từ beacon, từ URL cũ hay từ lần đo trước.
2. **Thiếu dữ liệu không phải 0** — ô chưa đo được ghi "chưa có dữ liệu" kèm lý do.
3. Phân tích bản tiếng Anh theo **nhóm URL `/en/`**, không theo quốc gia: người ở Việt Nam có thể đọc EN, người ở nước ngoài có thể đọc VI. Quốc gia chỉ là chiều phân tích phụ.
4. Analytics và Search Console đo **hai tập dữ liệu khác nhau**: pageview (Analytics) và hiển thị/nhấp trên kết quả tìm kiếm (Search Console). Không ép số hai bên khớp nhau.
5. Không quyết định dừng hay tiếp tục một hướng nội dung từ một tuần ít dữ liệu; đánh giá theo các kỳ 28 ngày tương đương.

## 2. Analytics (Vercel Web Analytics)

### 2.1. Bảng cơ sở số liệu — kỳ 28 ngày

| Chỉ số | Kỳ | Giá trị | Nguồn và ngày chụp |
|---|---|---|---|
| Lượt xem trang — nhóm VI (theo URL) | 28 ngày | **Chưa có dữ liệu — chưa truy cập dashboard** | Cần quyền đọc tab Analytics trên Vercel |
| Lượt xem trang — nhóm `/en/` | 28 ngày | **Chưa có dữ liệu — chưa truy cập dashboard** | Như trên |
| Nguồn truy cập (referrer) | 28 ngày | **Chưa có dữ liệu — chưa truy cập dashboard** | Như trên |
| Thiết bị (di động/máy tính) | 28 ngày | **Chưa có dữ liệu — chưa truy cập dashboard** | Như trên |

Kỳ cơ sở đề xuất: 28 ngày liên tục bắt đầu từ ngày gần nhất mà chủ dự án mở được dashboard; các kỳ sau so với kỳ đầu cùng độ dài, cùng cách tách nhóm VI/EN.

### 2.2. Trạng thái hệ thống đo — quan sát trực tiếp ngày 19/09/2026 (giờ +0700)

Kiểm bằng trình duyệt tự động (headless) trên 6 route: `/`, `/lich-su/`, `/co-che/bo-thoat/`, `/en/`, `/en/history/`, `/en/mechanisms/escapement/`. Toàn bộ request được liệt kê rồi mới lọc (không lọc trước theo tên); bằng chứng thô trong `output/h02-measurement-baseline/`.

| Kiểm | Kết quả | Ý nghĩa |
|---|---|---|
| Script Analytics tải trên 6/6 route | HTTP 200, loại `script`, URL `https://www.kienthucdonghoco.vn/8353d7638e565049/script.js`, nguồn khởi tạo là tài liệu trang (referer trỏ về URL trang) | Hệ đo được nạp trên cả route VI và `/en/` tại thời điểm đo |
| `window.va` | Là hàm (đã khởi tạo) trên `/` và `/en/` | Script chạy tới nơi chạy tới đoạn khởi tạo |
| `window.vam` | `production` | Chế độ production |
| Beacon lượt xem (`/view`) | **Không quan sát được** trong cửa sổ đo headless (kể cả đợi thêm 6 giây, cả trong danh sách response lẫn Performance Resource Timing) | Chưa có bằng chứng gửi beacon trong môi trường đo này; không suy ra hệ đo hỏng cũng như dashboard có dữ liệu |

Ghi chú bắt buộc kèm kết quả trên:

- Đường dẫn `/8353d7638e565049/` là **quan sát tại một thời điểm**. Không hardcode vào script hay tài liệu, không khẳng định mọi dự án Vercel luôn dùng đường dẫn dạng này.
- Beacon HTTP 200 được ghi nhận trong lần quan sát trình duyệt thật sáng 19/09 (tài liệu hướng dẫn đo lường) chỉ chứng minh **một lần gửi được chấp nhận**; chưa chứng minh dashboard có dữ liệu đầy đủ hay đã tích lũy từ lâu.
- Đuôi `/view` tự nó chưa chứng minh đó là analytics; kết luận dứt khoát cần xem Network với trạng thái, nội dung request và nguồn khởi tạo — đúng cách đo đã dùng ở bảng trên.

## 3. Google Search Console

### 3.1. Bảng cơ sở số liệu — kỳ 28 ngày

| Chỉ số | Kỳ | Giá trị | Nguồn và ngày chụp |
|---|---|---|---|
| Impressions (hiển thị) | 28 ngày | **Chưa có dữ liệu — chưa có quyền truy cập tài khoản/property để lấy số liệu và xác nhận trạng thái** | Cần chủ dự án mở property (xem hướng dẫn một trang) |
| Clicks (nhấp) | 28 ngày | **Chưa có dữ liệu** | Như trên |
| CTR | 28 ngày | **Chưa có dữ liệu** | Như trên |
| Trang đích hàng đầu | 28 ngày | **Chưa có dữ liệu** | Như trên |
| Truy vấn hàng đầu | 28 ngày | **Chưa có dữ liệu** | Như trên |
| Trạng thái Pages/Page indexing | — | **Chưa có dữ liệu** | Như trên; tên báo cáo hiện hành là Pages/Page indexing, không dùng tên cũ "Coverage" |

### 3.2. Bằng chứng công khai liên quan xác minh — quan sát 19/09/2026

**Kết luận đúng:** GLM **chưa có quyền truy cập tài khoản/property** để lấy số liệu và xác nhận trạng thái Search Console. Các kiểm công khai dưới đây chỉ chứng minh **không quan sát được hai phương thức xác minh phổ biến** tại thời điểm tra, không đủ kết luận property "chưa được xác minh" nói chung vì vẫn còn các phương thức và quyền truy cập không quan sát công khai được.

| Kiểm | Kết quả | Đọc đúng cách |
|---|---|---|
| Nameserver có thẩm quyền của `kienthucdonghoco.vn` | `ns1.dotvndns.vn`, `ns2.dotvndns.vn` | Nơi cần thêm bản ghi TXT (nếu làm theo hướng dẫn) là **dotVNDNS**, không phải Vercel (www trỏ CNAME sang Vercel, khác chỗ quản lý DNS) |
| Bản ghi TXT ở apex | **Chưa thấy bản ghi TXT nào** (tra công khai) | Không quan sát được phương thức xác minh kiểu Domain qua DNS tại thời điểm tra — không suy thêm |
| Thẻ `google-site-verification` trong HTML trang chủ | Không có | Không quan sát được phương thức xác minh kiểu URL-prefix bằng thẻ meta — không suy thêm |
| `robots.txt` | Cho phép bot tìm kiếm (`User-agent: * Allow: /`), chặn nhóm bot huấn luyện | Không có rào cản thu thập từ phía trang |

## 4. Sitemap, canonical, khả năng index — quan sát 19/09/2026

Phương pháp đếm: tải tệp sitemap về, đếm số thẻ `<loc>` (mỗi thẻ một URL) và số URL bắt đầu bằng `/en/`; phép đếm được cố định trong script tự kiểm `output/h02-measurement-baseline/kiem-h02.mjs` chạy trên từng tệp đã tải, **bắt buộc** đạt đúng 289 tổng và 67 `/en/` — lệch là lỗi, thoát mã 1. Lưu ý đếm bằng số dòng khớp (`grep -c`) không phù hợp vì XML chỉ có một dòng (tối đa trả 1) — phải đếm số kết quả khớp sau khi tách từng thẻ.

| Kiểm | Kết quả |
|---|---|
| `https://www.kienthucdonghoco.vn/sitemap-index.xml` | HTTP 200; trỏ tới một sitemap con `sitemap-0.xml` |
| Số URL trong sitemap | **289, trong đó 67 URL `/en/` và 222 URL tiếng Việt** (xem ghi chú phương pháp dưới) |
| Canonical route mẫu `/lich-su/` | Tự trỏ đúng `https://www.kienthucdonghoco.vn/lich-su/` |
| Canonical route mẫu `/en/history/` | Tự trỏ đúng; hreflang hai chiều `vi`/`en` + `x-default` đúng cặp |
| Meta robots | Không chặn index (mặc định cho phép) |

**Phương pháp đếm và lỗi đã sửa (vòng sửa 1, siết lại vòng 2):** phép đếm đầu của lượt lập tài liệu cho kết quả sai "0 URL `/en/`" vì hai lý do cộng lại: (1) **phương pháp đếm không phù hợp** — tệp sitemap chỉ có một dòng (0 ký tự xuống dòng) nên đếm bằng số dòng khớp như `grep -c` trực tiếp trên tệp tối đa trả 1, không phải số URL; đếm hợp lệ phải tách từng thẻ rồi đếm từng kết quả khớp; (2) pattern bắt đầu bằng dấu gạch (`/en/`) khi truyền qua Git Bash **bị biến đổi đối số** thành đường dẫn Windows (MSYS path conversion), nên pattern tới grep không còn là `/en/`. Phép đếm chuẩn được cố định trong script tự kiểm `output/h02-measurement-baseline/kiem-h02.mjs` bằng regex đếm từng thẻ: `<loc>` cho tổng và `<loc>https://www.kienthucdonghoco.vn/en/` cho nhóm `/en/`; script **bắt buộc** mỗi tệp đạt đúng 289 tổng và 67 `/en/`, lệch là tăng lỗi, nêu tệp và số thực tế, thoát mã 1 (đã xác minh: fixture có số `/en/` sai khiến checker thất bại). Ba tệp sitemap tải từ hai domain tại ba thời điểm (19:30, 19:57, 19:58 +0700, byte-identical, sha256 `12fda7fe89a6b7c20…`, ETag `a5c067741eed27ee127cfde7a075d387`, Last-Modified 19:34:49 +0700) đều cho **289 URL, 67 URL `/en/`** — khớp phán quyết GPT Work. Minh họa đếm dòng lệnh hợp lệ (đếm từng kết quả khớp, không dùng `grep -c`): `grep -o '<loc>[^<]*</loc>' sitemap-0.xml | wc -l` cho 289 và `grep -o '<loc>[^<]*</loc>' sitemap-0.xml | grep 'vn/en/' | wc -l` cho 67.

Không có phát hiện thiếu URL `/en/` nào; không cần gói kỹ thuật sửa sitemap. Hướng dẫn nộp sitemap URL đầy đủ giữ nguyên (mục 4 hướng dẫn một trang).

Chi tiết nhỏ ghi nhận thêm: ở trang `/en/history/`, nhãn hreflang `vi` trỏ tới `/lich-su` (không có dấu gạch cuối); URL này vẫn trả 200 nên không phải liên kết gãy.

## 5. Nhịp theo dõi đề xuất

1. **Hằng tuần** (cùng một ngày trong tuần): mở Search Console đọc impressions, clicks, CTR, truy vấn, trang đích; tách nhóm `/en/` với VI; mở Vercel Analytics đọc lượt xem theo nhóm URL. Ghi số kèm ngày chụp vào bảng mục 2 và 3 (thêm cột tuần).
2. **Theo kỳ 28 ngày**: so kỳ sau với kỳ đầu cùng độ dài; chỉ kết luận khi kỳ đã khép và các bài mới đã có mặt đủ thời gian thu thập.
3. **Không** đưa quyết định dừng hoặc thu hẹp nội dung EN từ một tuần ít dữ liệu.
4. Khi có dữ liệu đủ (sau ít nhất một kỳ 28 ngày hoàn chỉnh), cập nhật tài liệu này thành kỳ thứ hai thay vì lập tệp mới.

## 6. Việc chỉ chủ dự án làm được (không cần gửi mật khẩu hay mã xác thực cho ai)

1. Xác minh Search Console property theo [hướng dẫn một trang](huong-dan-search-console-mot-trang-2026-09-19.md) — bản ghi TXT thêm tại dotVNDNS (nameserver đang có thẩm quyền).
2. Nộp sitemap bằng URL đầy đủ `https://www.kienthucdonghoco.vn/sitemap-index.xml`.
3. Mở tab Analytics trên Vercel (đăng nhập bằng tài khoản dự án) và đọc số theo bảng mục 2; không cần cung cấp thông tin tài khoản cho ai.

## 7. Giới hạn của lượt lập này

- Chưa có quyền truy cập tài khoản/property trên Vercel Analytics và Search Console — toàn bộ ô số liệu trong mục 2.1 và 3.1 là "chưa có dữ liệu" với lý do rõ ràng; đây không phải số 0. Các kiểm công khai về xác minh chỉ phản ánh hai phương thức không quan sát được, không kết luận trạng thái property nói chung.
- Beacon lượt xem không quan sát được trong môi trường headless; bằng chứng gửi được chấp nhận dừng ở quan sát trình duyệt thật sáng 19/09.
- Kết luận xếp hạng hay so sánh với website khác không thuộc tài liệu này.
