# Biên bản nghiệm thu — Trang hub "Lộ trình học đồng hồ cơ"

- **Ngày:** 01/09/2026
- **Commit nền khi bắt đầu gói:** `2e77f1b` — "feat(visual): mở rộng sơ đồ tiến hóa" (working tree sạch tại thời điểm bắt đầu).
- **Trạng thái cuối gói: CHƯA COMMIT, CHƯA PUSH** — chờ anh Vinh kiểm độc lập.

---

## 1. Mục tiêu

Người mới vào website chưa có bản đồ học đầy đủ; trang chủ chỉ có hai lộ trình ngắn. Gói này xây trang hub `/lo-trinh-hoc-dong-ho/` **tổ chức lại đường đọc từ 207 bài tiếng Việt đã tồn tại** cho ba nhóm người đọc — không tạo dữ kiện lịch sử, thông số, thương hiệu hay bài viết mới; không thêm thư viện hay dependency.

## 2. Ba lộ trình và từng URL đã dùng (nguyên bản, không tự tạo slug)

### Lộ trình 1 — Bắt đầu chơi đồng hồ cơ (5 bước)
1. `/huong-dan/chon-dong-ho-dau-tien` — Chọn đồng hồ cơ đầu tiên
2. `/co-che/chuyen-dong-co` — Chuỗi truyền động: dây cót đến bánh lắc
3. `/huong-dan/len-day-dong-ho` — Lên dây cho đồng hồ cơ
4. `/huong-dan/muc-chong-nuoc` — Mức chống nước: được làm gì, không được làm gì
5. `/huong-dan/bao-duong-dong-ho` — Bảo dưỡng đồng hồ cơ

### Lộ trình 2 — Hiểu bộ máy và cơ chế (6 bước)
1. `/co-che/chuyen-dong-co` — Chuỗi truyền động (bài nền, dùng chung có chủ đích)
2. `/co-che/tru-cot` — Trữ cót (Power Reserve)
3. `/co-che/bo-thoat` — Bộ thoát (Escapement)
4. `/co-che/day-toc-banh-lac` — Dây tóc & bánh lắc
5. `/co-che/len-day-tu-dong` — Cơ chế lên dây tự động
6. `/co-che/gmt` — GMT — hai múi giờ và kim 24 giờ

### Lộ trình 3 — Tư duy người sưu tầm (6 bước)
1. `/lich-su` — Lịch sử đồng hồ (28 mốc)
2. `/mau-iconic/rolex-submariner` — Rolex Submariner
3. `/mau-iconic/omega-speedmaster` — Omega Speedmaster
4. `/mau-iconic/royal-oak` — Audemars Piguet Royal Oak
5. `/huong-dan/hoan-thien-thu-cong-dong-ho` — Hoàn thiện thủ công
6. `/thuong-hieu` — Thư viện thương hiệu

Tổng 17 bước / 16 URL duy nhất (chuỗi truyền động dùng ở hai lộ trình với lý do đọc khác nhau — có chủ đích). Mỗi bước có nhãn rõ + một câu "vì sao nên đọc ở bước này". Cấu trúc 5 bước lộ trình 1 đúng yêu cầu "5 bước trở lên"; lộ trình 2–3 có 6 bước vì trình tự khớp nối cơ khí và bức tranh sưu tầm cần thêm một điểm dừng — hợp lệ theo đề ("từ 5 bước trở lên").

## 3. Các file thay đổi

| File | Thao tác | Nội dung |
|---|---|---|
| `src/data/learningPaths.ts` | **tạo** | Dữ liệu duy nhất của trang hub: 3 lộ trình, mỗi bước `{href, label, why}`; comment ghi quy ước (href không kèm ngôn ngữ, không thời lượng đọc, không giá/biệt danh) |
| `src/pages/lo-trinh-hoc-dong-ho.astro` | **tạo** | Trang hub: BaseLayout, 1 H1, `nav` mục lục 3 nhánh (aria-label), 3 `section` (H2) với `ol` bước, CTA "Bắt đầu lộ trình này" trỏ bước đầu, khối "Chưa biết tra thuật ngữ nào?" → `/tu-dien`; dấu thị giác "đường truyền năng lượng" bằng HTML/CSS thuần (đường kẻ nối + vòng tròn số); không script, không animation |
| `src/i18n/ui.ts` | sửa | Thêm `nav_learning_path`: vi "Lộ trình học" / en "Learning path" |
| `src/components/Header.astro` | sửa | Mục "Lộ trình học" đứng đầu nhóm "Kiến thức" (desktop dropdown + mobile menu dùng chung mảng; trạng thái active kế thừa `isActive`) |
| `src/pages/index.astro` | sửa | CTA phụ sau hai lộ trình ngắn: "Muốn bản đồ đầy đủ? Lộ trình học đồng hồ cơ gom ba hướng đọc…" — giữ nguyên hai lộ trình cũ |
| `scripts/check-learning-paths.mjs` | **tạo** | Kiểm dữ liệu lộ trình (chi tiết mục 4) |
| `package.json` | sửa | Thêm `check-learning-paths.mjs` vào `npm run check` (sau evolution-data, trước editorial-links) |
| `scripts/check-evolution-data.mjs` | sửa 1 dòng | Loại `learningPaths.ts` khỏi phạm vi quét dataset tiến hóa (trước đó script báo lỗi sai vì quét toàn bộ `src/data/*.ts` — tệp lộ trình không phải dataset tiến hóa; mọi quy tắc kiểm giữ nguyên) |
| `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` | sửa | Mốc lần 7 (nền `2e77f1b`), số build thật 222 trang / 15.176 link, thêm dòng hoàn thành trang hub |

Không đụng: nội dung bài viết, component khác, tệp docs/ cũ và `output/` của anh.

## 4. Script kiểm `check-learning-paths.mjs`

Kiểm đúng 6 tiêu chí đề bài: đúng 3 lộ trình; mỗi lộ trình ≥5 bước; không trùng URL trong cùng lộ trình; URL nội bộ dạng hợp lệ và **tồn tại trong tập route nội dung hiện có** (trang tĩnh `src/pages` hoặc slug bài trong bộ sưu tập tương ứng — kiểm từ nguồn, không cần build); nhãn và mô tả (why) không rỗng; không có URL ngoài. Kết quả chạy độc lập:

```text
Lộ trình học hợp lệ:
  - bat-dau-choi: 5 bước
  - hieu-bo-may: 6 bước
  - tu-duy-suu-tam: 6 bước
  Tổng: 3 lộ trình, 17 bước — mọi route nội bộ đều tồn tại.
```

Đã vào `npm run check`. Không làm yếu script nào đang có (phạm vi quét của `check-evolution-data.mjs` được siết đúng đối tượng — xem mục 3).

## 5. Kết quả kiểm tra

- `npm run check` — **ĐẠT toàn chuỗi** (gồm script mới).
- `npm run build` — **ĐẠT: 222 trang** (+1 trang hub), "OK: Không phát hiện link nội bộ hỏng", **15.176 liên kết nội bộ** (+509 so với 14.667 trước gói: 24 link nội dung của trang hub + 2 điểm vào mới trong menu trên mọi trang + khối liên kết giao diện của trang mới; số chênh khớp theo tổng).
- `git diff --check` — sạch.

### Nghiệm thu trình duyệt (Playwright trên preview sau build, port 4321)

| Phép kiểm | Kết quả |
|---|---|
| Trang hub: đúng 1 H1 "Lộ trình học đồng hồ cơ"; 3 H2 lộ trình + H2 khối từ điển; mục lục 3 nhánh (`nav[aria-label]`); 3 section id đúng neo | ĐẠT |
| 17 bước render đúng 16 route như bảng trên; 3 CTA "Bắt đầu lộ trình này" trỏ đúng bước đầu tiên (`/huong-dan/chon-dong-ho-dau-tien` cho lộ trình 1) | ĐẠT |
| Vùng bấm: bước thấp nhất 77px, CTA 47px (≥44px) | ĐẠT |
| Menu desktop: "Lộ trình học" xuất hiện đầu nhóm "Kiến thức", href đúng | ĐẠT |
| Menu mobile (mở hamburger): mục "Lộ trình học" có, href đúng | ĐẠT |
| CTA trang chủ: link trong main → `/lo-trinh-hoc-dong-ho`, cao 66px, nội dung nêu "bản đồ đầy đủ… ba hướng đọc" | ĐẠT |
| Mobile 375px và 320px: scrollWidth = innerWidth (không tràn) | ĐẠT |
| Sáng/tối: body `rgb(251,251,248)` ↔ `rgb(17,21,25)`; nhãn bước `rgb(21,25,29)` ↔ `rgb(238,240,237)`; đường kẻ dùng token line `rgba(102,117,138,0.9)` | ĐẠT (phép đo đầu sai do đo giữa transition — đã đo lại sau 400ms) |
| Bàn phím: Tab tới mục lục → outline `solid 2px` hiển thị | ĐẠT |
| **Không có JavaScript** (chặn script qua CDP rồi reload): đủ 17 bước + 3 mục lục + 3 CTA trong HTML tĩnh | ĐẠT |
| 404 mới: 0 (chỉ lỗi cố hữu `/_vercel/insights`) | ĐẠT |

## 6. SEO và ngữ nghĩa

- Title: "Lộ trình học đồng hồ cơ — Đồng Hồ Cơ" (BaseLayout ghép); meta description tự nhiên, không nhồi từ khóa.
- Một H1 duy nhất; ba lộ trình là `section` có H2; các bước dùng `<ol>` đúng thứ tự học; mục lục dùng `<nav aria-label="Mục lục ba lộ trình">` + `<ol>`.
- Không thêm structured data mới (trang hub không khớp một schema loại nào hoàn toàn — không tạo breadcrumb/FAQ giả); kế thừa meta/OG mặc định của BaseLayout.

## 7. Giới hạn còn lại

1. **Giá trị của gói là tổ chức đường đọc từ nội dung hiện có** — chưa có và chưa thể chứng minh bất kỳ kết quả SEO (thứ hạng, click) hay Analytics (hành vi đọc) thực tế nào; cần dữ liệu production sau khi triển khai.
2. Trang hub chỉ có bản tiếng Việt — nhãn tiếng Anh trong i18n chỉ là fallback giao diện; người đọc bản `/en/` (khi có) sẽ không có trang này (đúng hiện trạng đa ngôn ngữ của dự án: 0 bài en).
3. Chưa ghi thời lượng đọc mỗi bước — dự án chưa có dữ liệu thời lượng tính thật (đúng quy tắc đề).
4. Trạng thái "đang đọc lộ trình nào" chưa có — người đọc quay lại trang không thấy tiến độ; có thể cân nhắc sau nếu cần (không thuộc phạm vi gói).
5. CTA trang chủ dùng đoạn văn tĩnh; chưa A/B so với phương án khác (không thuộc phạm vi).

## 8. Xác nhận

- **CHƯA COMMIT, CHƯA PUSH.** Toàn bộ thay đổi nằm trong working tree chờ anh kiểm độc lập.
- Tệp thuộc gói: 4 tệp tạo (`learningPaths.ts`, `lo-trinh-hoc-dong-ho.astro`, `check-learning-paths.mjs`, biên bản này) + 6 tệp sửa (`ui.ts`, `Header.astro`, `index.astro`, `package.json`, `check-evolution-data.mjs`, `LO-TRINH`). Khi commit, `git add` từng tên tệp, không dùng `git add .` hay `git add -A`.
