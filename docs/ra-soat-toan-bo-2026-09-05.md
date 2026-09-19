# RÀ SOÁT TOÀN BỘ DỰ ÁN ĐỒNG HỒ CƠ

**Ngày rà soát:** 05/09/2026  
**Phạm vi:** thư mục local `D:\Watch web build`, `origin/main` của `lamthevinhscue-hub/donghoco`, cấu hình Vercel và ba route production đại diện.  
**Nguyên tắc phiên này:** chỉ đọc, chạy kiểm tra và lập báo cáo. Không thay đổi mã nguồn hoặc nội dung xuất bản.

## 1. Kết luận điều hành

Mã nguồn đang ở trạng thái tốt và build thành công. Local và `origin/main` hoàn toàn trùng nhau tại commit `1c650d8` ngày 05/09/2026. Không có thay đổi đã theo dõi chưa commit, không có commit local chưa push và cũng không có commit trên GitHub chưa về local.

Bản production hiện phục vụ qua cả `https://www.kienthucdonghoco.vn/` và `https://donghoco1.vercel.app/`; hai địa chỉ trả cùng nội dung Vercel. Ba route đã đối chiếu có tiêu đề và H1 khớp bản build local. Tuy nhiên, không thể xác nhận tuyệt đối commit deploy chỉ từ HTTP response vì Vercel không công khai SHA của build trong header; kết quả route là bằng chứng chức năng, không phải bằng chứng commit.

Rủi ro cần xử lý trước khi phát triển tiếp không phải là lỗi build. Đó là: 51 tài liệu dự án chưa được Git theo dõi; tài liệu lộ trình có mâu thuẫn về số bài tiếng Anh; ảnh nội dung thực tế chưa được bổ sung; CSP đang ở chế độ Report-Only không có endpoint báo cáo; và build chưa có bước kiểm kiểu TypeScript đầy đủ.

## 2. Đồng bộ local, GitHub và deploy

### 2.1. Git local so với GitHub

- Đã chạy `git fetch origin` thành công.
- Nhánh: `main`.
- `HEAD`: `1c650d8ae412efaa78f681b10886561531da2ce8` - `fix(i18n): dịch nhãn tiêu đề khối bài liên quan sang tiếng Anh`.
- `origin/main`: cùng SHA `1c650d8ae412efaa78f681b10886561531da2ce8`.
- `git log origin/main..HEAD`: rỗng. Không có commit local chưa push.
- `git log HEAD..origin/main`: rỗng. Không có commit trên GitHub chưa về local.
- Không có tệp đã sửa hoặc staged trong phần Git đang theo dõi: `git diff --name-only` và `git diff --cached --name-only` đều rỗng.

Năm commit gần nhất đều đã có trên `origin/main`: `1c650d8`, `4a557bf`, `90d7ceb`, `20d0aa1`, `12d01b3`.

### 2.2. Tệp chưa theo dõi

Trước khi tạo báo cáo này, local có 135 tệp chưa theo dõi: 51 tệp trong `docs/`, 83 tệp kiểm thử Playwright trong `output/` (tổng khoảng 4,49 MB), và `AGENTS.md`. Báo cáo này là tệp thứ 52 trong `docs/` cần được đưa vào commit tài liệu nếu được duyệt.

**51 tài liệu chưa theo dõi có trước báo cáo này:**

```text
docs/bao-cao-nguon-huong-dan-2026-08-22.md
docs/bo-3-prompt-nang-chuan-bach-khoa.md
docs/bo-6-prompt-glm-toi-uu-giao-dien-2026-08-16.md
docs/checklist-thuong-hieu-can-bo-sung.md
docs/chinh-trang-cong-bo-truoc-khi-commit.md
docs/danh-gia-toan-dien-2026-08-28.md
docs/danh-gia-va-ke-hoach-2026-08-17.md
docs/danh-gia-wcag-2026-08-23.md
docs/de-xuat-mau-iconic-42-hang.md
docs/de-xuat-nang-chat-luong-svg-infographic.md
docs/goi-du-lieu-nguon-10-hang-dot-1.md
docs/goi-du-lieu-seagull-va-microbrand.md
docs/goi-du-lieu-thuong-hieu-dot-12-13-14.md
docs/goi-du-lieu-thuong-hieu-dot-15-16-17.md
docs/goi-du-lieu-thuong-hieu-dot-18-19-20-21.md
docs/goi-du-lieu-thuong-hieu-dot-8.md
docs/goi-du-lieu-thuong-hieu-dot-9-10-11.md
docs/goi-mau-iconic-0-va-1.md
docs/goi-mau-iconic-2-va-3.md
docs/goi-nguon-tham-khao-86-bai.md
docs/goi-robots-txt-mo-bot-doc-theo-yeu-cau.md
docs/goi-thi-diem-nang-chat-luong-escapement.md
docs/goi-thong-so-ky-thuat-dot-1.md
docs/goi-thong-so-ky-thuat-dot-2-va-3.md
docs/goi-thong-so-ky-thuat-dot-4-caliber-corner.md
docs/goi-wcag-w1-chinh-role-button.md
docs/goi-wcag-w1-con-lai.md
docs/goi-wcag-w1-sua-loi.md
docs/goi-wcag-w2-trang-cong-bo.md
docs/huong-dan-len-ten-mien-rieng.md
docs/huong-dan-thiet-lap-search-console.md
docs/ke-hoach-quang-ba-quoc-te.md
docs/lo-trinh-con-lai-2026-08-28.md
docs/nghiem-thu-goi-a-va-chinh-bo-sung.md
docs/nghiem-thu-goi-tham-my-escapement.md
docs/nghiem-thu-mo-khoa-tieng-anh-va-loi-con-sot.md
docs/nghiem-thu-prompt-2-giai-phau.md
docs/nghiem-thu/2026-08-11_nghiem-thu_formspree-va-3-goi-bach-khoa.md
docs/nghiem-thu/2026-08-16_danh-gia-tong-the-noi-dung-giao-dien-code.md
docs/prompt-commit-nhan-doc-tiep.md
docs/prompt-commit-push-goi-a.md
docs/prompt-commit-push-goi-b.md
docs/prompt-doi-phan-hang-zenith.md
docs/prompt-glm-form-lien-he-formspree.md
docs/prompt-mo-khoa-phien-ban-tieng-anh.md
docs/ra-soat-danh-gia-gpt-va-bo-prompt-p0.md
docs/ra-soat-ma-nguon-2026-09-05.md
docs/ra-soat-tien-do-ke-hoach-2026-08-23.md
docs/so-sanh-doi-thu-va-lo-trinh.md
docs/so-sanh-mo-hinh-bach-khoa-2-trang.md
docs/sua-loi-nguon-longines-lindbergh.md
```

`output/playwright/` gồm ảnh chụp, script và kết quả kiểm thử từ các đợt 30/08 đến 01/09. Đây là bằng chứng QA hữu ích trong ngắn hạn nhưng không phù hợp để commit mặc định cùng mã nguồn. Cần quyết định rõ: lưu có chọn lọc như biên bản nghiệm thu, hoặc thêm `output/` vào `.gitignore` sau khi đã lưu phần cần giữ ở nơi phù hợp. Không được xóa trong phiên này.

`AGENTS.md` là hướng dẫn vận hành quan trọng nhưng chưa theo dõi. Cần xác nhận chủ ý của chủ dự án trước khi commit, vì đây là tệp chỉ dẫn nội bộ chứ không phải nội dung website.

### 2.3. Kiểm tra `.gitignore`

`.gitignore` chỉ loại trừ các đầu ra và dữ liệu nhạy cảm hợp lý: `node_modules/`, `dist/`, `.astro/`, `.vercel/`, `.zcode/`, `.playwright-cli/`, log và các biến thể `.env`. Không có quy tắc nào đang loại nhầm `docs/`, `src/`, `public/`, cấu hình Vercel hoặc dữ liệu nội dung quan trọng.

Điểm cần cân nhắc là `output/` chưa bị loại trừ nên toàn bộ 83 artifact Playwright đang liên tục xuất hiện là untracked. Đây là bất tiện Git, không phải lỗi triển khai.

### 2.4. Deploy Vercel

- `astro.config.mjs` đặt `site` là `https://www.kienthucdonghoco.vn`.
- `vercel.json` dùng Astro, `npm ci`, `npm run build`, output `dist` và bộ header bảo mật.
- `https://www.kienthucdonghoco.vn/` và `https://donghoco1.vercel.app/` cùng trả HTTP 200, cùng `Content-Length` 83.388 byte, cùng ETag `8cebe8a6cdf3214a2d6e334a20f67474`, Vercel cache HIT; do đó `donghoco1.vercel.app` đang là alias của production hiện hành.
- Header production xác nhận Last-Modified `05/09/2026 03:52:36 UTC` tại thời điểm rà.
- Đối chiếu nội dung build local với production:
  - `/`: title và H1 khớp.
  - `/co-che/chronograph/`: title và H1 khớp.
  - `/en/iconic-watches/rolex-gmt-master/`: title và H1 khớp.

## 3. Lộ trình và quy mô thực tế

### 3.1. Mục tiêu và nguyên tắc

Mục tiêu là nền tảng tiếng Việt chuyên sâu về đồng hồ cơ cho người mới và người chơi trung cấp, khác biệt bằng hệ thống infographic và nội dung có nguồn. Giọng viết phải là nhà sưu tầm am hiểu, tránh văn quảng cáo; dữ kiện năm, calibre và thông số không chắc phải bỏ khỏi nội dung và ghi tracker kiểm chứng.

Ba trụ cột là thương hiệu, mẫu iconic và cơ chế. Hướng dẫn, từ điển, lộ trình học, so sánh và timeline là các phần hỗ trợ. Tiếng Việt là ngôn ngữ mặc định; tiếng Anh phải có route và nội dung độc lập, không tự trỏ về route tiếng Việt.

### 3.2. Đã hoàn thành và đang hoạt động

- Build local tạo 286 trang HTML: 222 tiếng Việt và 64 trang `/en/`.
- Có 207 bài Markdown tiếng Việt: 73 thương hiệu, 69 mẫu iconic, 18 cơ chế, 33 thuật ngữ, 14 hướng dẫn.
- Có 53 bài Markdown tiếng Anh: 14 cơ chế, 23 thuật ngữ, 9 hướng dẫn, 4 mẫu iconic, 3 thương hiệu. Kiểm tra English launch đạt đủ 60 route bắt buộc, 109 link `/en/` hợp lệ, hreflang/canonical/Pagefind/đổi ngôn ngữ đều đúng.
- 28 mốc timeline có 28 SVG hiển thị dự phòng; hai sơ đồ tiến hóa Submariner và GMT-Master đã có bản Việt và Anh.
- Hạ tầng liên kết biên tập đạt 131 liên kết mẫu-iconic tới mẫu-iconic trên 69 bài, cùng 29 quan hệ cơ chế - mẫu iconic hai chiều.
- Tìm kiếm Pagefind, sơ đồ giải phẫu 2D/3D tải theo yêu cầu, dark mode, sitemap, structured data, OG cơ bản và các kiểm tra WCAG tĩnh đã có.
- Các cụm kiến thức GMT, Chronograph/Tachymeter, sử dụng an toàn, automatic, bảo vệ bộ máy, độ chính xác/chứng nhận, điều chỉnh nhịp/bộ thoát, lịch vạn niên/pha trăng, tourbillon/điểm chuông và hoàn thiện bộ máy đã qua kiểm tự động song ngữ.
- Tracker `CAN-KIEM-CHUNG.md` hiện không có cờ ưu tiên kiểm chứng đang mở: 15 mục đã giải quyết, 30 mục đã xử lý an toàn, 3 mục chờ nguồn nhưng không gây sai nội dung hiển thị.

### 3.3. Đang dở hoặc còn thiếu

- `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` hiện ghi sai tại phần đa ngôn ngữ là “0 bài trong các bộ sưu tập en”. Điều này mâu thuẫn với 53 file Markdown English, 64 trang English và chính các đoạn khác trong tài liệu về English launch. Đây là lỗi tài liệu trạng thái, cần sửa trước khi dùng tài liệu làm căn cứ điều hành.
- English chưa phủ toàn bộ kho Việt: hiện 53/207 bài có bản English tương ứng và các frontmatter English về cơ chế/từ điển đang để `has_infographic` hoặc `interactive` là `false`. Kiến trúc i18n đạt, nhưng mức độ nội dung/đồ họa song ngữ chưa hoàn chỉnh.
- `IMAGE-MANIFEST.md` cập nhật 02/08 và không phản ánh hoàn toàn hiện trạng. 28 SVG timeline hiện đã có; 6 asset OG cũng có. Tuy vậy, không có ảnh bìa, logo hay hero thực tế được khai báo trong các frontmatter content; 16 ảnh mẫu iconic, 4 ảnh hướng dẫn, 6 ảnh cơ chế, 24 logo và 24 hero thương hiệu trong manifest vẫn chưa được bổ sung. Các trang đang dựa vào placeholder hoặc minh họa SVG theo cơ chế dự phòng.
- Chưa có bằng chứng nghiệm thu production thủ công đủ trên mobile/desktop, sáng/tối, zoom 200%, bàn phím và trình đọc màn hình. Tự động tĩnh không thay thế bước này.
- Analytics, Search Console, Core Web Vitals và newsletter chưa có vận hành/số liệu thực để đánh giá.

## 4. Kết quả kiểm tra chất lượng

### 4.1. Đạt

`npm run check` đạt toàn bộ 24 lớp kiểm. Các điểm chính:

- Quét 373 file `src/`: không có ký tự không hợp lệ, class trùng hoặc văn bản ẩn.
- WCAG tự động: 35/35 cặp token tương phản đạt; kiểm tĩnh bàn phím, ngữ nghĩa, chuyển động và nội dung đều đạt.
- Dữ liệu timeline, 3 lộ trình học với 17 bước, cụm chọn đồng hồ đầu tiên, cụm bảo dưỡng và liên kết biên tập đều đạt.
- Toàn bộ cụm kiến thức kiểm bằng script đều đạt, gồm GMT, Chronograph, chăm sóc hằng ngày, automatic, chống từ/chống sốc, COSC/METAS, bộ điều chỉnh nhịp, lịch vạn niên/pha trăng, tourbillon/điểm chuông và hoàn thiện bộ máy.

`npm run build` đạt sau khi môi trường được cấp quyền tạo cấu hình telemetry của Astro. Đây là giới hạn quyền của máy, không phải lỗi dự án. Kết quả sau build:

- 286 trang HTML và 19.822 liên kết nội bộ được quét; không có link nội bộ hỏng.
- Hai sơ đồ tiến hóa render đúng cả route, ngôn ngữ và số mốc.
- Ngân sách 3D đạt: Three.js chỉ tải sau khi người dùng chủ động bật 3D trên `/giai-phau`; chunk 3D tổng 135,7 KB gzip, không vào luồng tải đầu của các route được kiểm.
- `check-english-launch.mjs` cũng đạt toàn bộ tiêu chí kiến trúc i18n.

### 4.2. Danh sách vấn đề theo mức độ

| Mức độ | Vấn đề | Ảnh hưởng | Hướng xử lý |
|---|---|---|---|
| Chặn build | Không có | Build và toàn bộ kiểm tra project đang đạt. | Không cần xử lý khẩn. |
| Cao | 51 tài liệu vận hành/nội dung chưa được Git theo dõi, ngoài ra báo cáo này cũng cần được theo dõi. | Mất lịch sử và không đồng bộ được dữ liệu thương hiệu, nguồn, checklist, nghiệm thu. | Duyệt, rà phạm vi rồi commit riêng tài liệu. |
| Cao | Lộ trình chính thức mâu thuẫn với mã nguồn về English: ghi 0 bài trong khi có 53 bài và 64 trang. | Quyết định theo lộ trình có thể sai thứ tự ưu tiên. | Cập nhật số liệu, ngày rà và trạng thái i18n từ mã nguồn. |
| Trung bình | CSP production là `Content-Security-Policy-Report-Only` nhưng không có `report-uri`/`report-to`. | Không chặn CSP và cũng không tập trung báo cáo vi phạm. | Sau khi kiểm thử, đổi sang CSP thực thi hoặc bổ sung endpoint report rồi theo dõi. |
| Trung bình | Quy trình build không có `@astrojs/check`/`astro check`. | Lỗi kiểu TypeScript có thể không bị chặn trước deploy. | Chuẩn hóa kiểu `getEntriesByLang`, cài check, xử lý lỗi hiện có rồi đưa vào CI/build. |
| Trung bình | 74 vị trí ảnh bìa/logo/hero ưu tiên chưa có dữ liệu ảnh; manifest cũng cũ. | Website thiếu chiều sâu thị giác và manifest gây hiểu nhầm hiện trạng. | Lập đợt ảnh hợp pháp, điền frontmatter, cập nhật manifest sau mỗi đợt. |
| Cảnh báo | `output/playwright/` có 83 artifact untracked. | Status Git nhiễu, có nguy cơ commit nhầm 4,49 MB file test. | Quy định nơi lưu bằng chứng QA hoặc loại trừ `output/` bằng `.gitignore`. |
| Cảnh báo | A11y đã đạt kiểm tĩnh, chưa có chứng cứ kiểm production thủ công. | Chưa thể khẳng định tuân thủ WCAG đầy đủ trên thiết bị thật. | Nghiệm thu mobile/desktop, 200% zoom, dark/light, bàn phím và screen reader. |

## 5. Việc cần commit và push

### 5.1. Khuyến nghị thực hiện ngay sau khi duyệt

Commit riêng 52 tài liệu trong `docs/`, gồm 51 tệp hiện tồn và báo cáo này. Không bao gồm `output/` hoặc `AGENTS.md` khi chưa có quyết định chủ sở hữu.

```powershell
git add docs
git status --short
git diff --cached --stat
git commit -m "docs: add project records and full audit 2026-09-05"
git push origin main
git status --short
```

Trước `git commit`, cần rà `git diff --cached --stat` để xác nhận không có tài liệu cá nhân, dữ liệu không được phép công bố hoặc tệp quá lớn. Nếu một phần 51 tài liệu chỉ là ghi chú tạm, tách chúng ra thay vì commit theo lệnh trên.

### 5.2. Quyết định tách riêng

- `AGENTS.md`: chỉ commit nếu đây là chỉ dẫn dự án được thống nhất chia sẻ trong repository. Lệnh khi đã chốt: `git add AGENTS.md; git commit -m "docs: add project operating instructions"; git push origin main`.
- `output/`: không commit toàn bộ. Sau khi quyết định chính sách lưu artifact, mới cập nhật `.gitignore` hoặc chuyển các biên bản cần giữ vào `docs/nghiem-thu/`, rồi commit ở một thay đổi riêng.

## 6. Backlog hoàn thiện theo ưu tiên

### Ưu tiên 1 - Làm nền tảng tin cậy và hồ sơ dự án (1-2 ngày)

1. Commit bộ `docs/`, sửa lộ trình trạng thái bằng số liệu đếm trực tiếp, và làm rõ chính sách `AGENTS.md`/`output/`. Khối lượng: nhỏ, nhưng cần duyệt phạm vi tài liệu.
2. Chuyển CSP sang chế độ thực thi sau khi kiểm trên preview; kiểm các tài nguyên font, Formspree, Vercel Analytics, tìm kiếm và 3D. Khối lượng: nhỏ.
3. Chuẩn hóa `getEntriesByLang`, đưa `@astrojs/check`/`astro check` vào quy trình kiểm, sửa toàn bộ lỗi kiểu phát hiện ở lần đầu. Khối lượng: trung bình.

### Ưu tiên 2 - Hoàn thiện giá trị biên tập và trải nghiệm (5-10 ngày, chia đợt)

1. Thực hiện một đợt ảnh hợp pháp ưu tiên: 16 mẫu iconic, 4 hướng dẫn, 6 cơ chế, sau đó 24 logo và 24 hero thương hiệu. Mỗi đợt phải có quyền sử dụng, alt text, đường dẫn và frontmatter. Khối lượng: lớn, phụ thuộc nguồn ảnh.
2. Cập nhật `IMAGE-MANIFEST.md` thành dữ liệu trạng thái thật: có ảnh, fallback SVG, placeholder, quyền sử dụng và vị trí render. Khối lượng: trung bình.
3. Nghiệm thu production thủ công theo ma trận route/thiết bị: trang chủ, cơ chế tương tác, mẫu iconic có evolution, `/en/`, form liên hệ; kiểm light/dark, keyboard, 200% zoom và mobile. Khối lượng: trung bình.
4. Tiếp tục i18n theo cụm hoàn chỉnh, không dịch rời lẻ: ưu tiên các cụm có nhiều truy cập hoặc đường đọc đã có, đồng thời đánh giá có cần phiên bản đồ họa English tương ứng không. Khối lượng: lớn.

### Ưu tiên 3 - Tăng trưởng có dữ liệu và tái cấu trúc có kiểm soát (2-4 tuần)

1. Kích hoạt và thiết lập nhịp theo dõi Search Console, Analytics và Core Web Vitals; dùng dữ liệu đó chọn cụm SEO tiếp theo. Khối lượng: trung bình, cần thời gian tích lũy dữ liệu.
2. Mở rộng sơ đồ tiến hóa chỉ cho dòng có hồ sơ nguồn đầy đủ. Khối lượng: trung bình mỗi dòng.
3. Tái cấu trúc 11 script cụm và các gradient SVG chỉ sau khi type check ổn định; giữ nguyên các hàng rào kiểm hiện có, thực hiện từng gói. Khối lượng: trung bình đến lớn.
4. Newsletter chỉ bắt đầu khi có công cụ gửi, chính sách dữ liệu và lịch nội dung rõ ràng. Khối lượng: trung bình, có phụ thuộc vận hành.

## 7. Điều chưa làm trong phiên này

Không sửa mã, không sửa nội dung xuất bản, không commit, không push, không thay `.gitignore`, không thay cấu hình CSP và không xóa artifact. Mọi thay đổi sau báo cáo này chờ duyệt.

## 8. Bản kế hoạch tiếp nối ngày 19/09/2026

Đã có [Kế hoạch phát triển hợp nhất ngày 19/09/2026](KE-HOACH-PHAT-TRIEN-HOP-NHAT-2026-09-19.md), đối chiếu lại bốn tài liệu về đánh giá tổng thể, đo lường, quy chuẩn hình ảnh và 13 bài tiếng Anh trên HEAD `a715fd0`. Dùng bản kế hoạch mới để xác định công việc tiếp theo; các số liệu và backlog ở báo cáo 05/09 là lịch sử, không phải hiện trạng. Bản mới phân biệt việc đã hoàn thành, nhận xét cần sửa, tác dụng, khối lượng và tiêu chí nghiệm thu của từng đề xuất. Chưa triển khai các đề xuất.

Từ gói H01 (19/09/2026), lệnh thi công hiện hành là [bộ giao việc 14 gói](BO-GIAO-VIEC-GLM-14-GOI-2026-09-19.md) và chỉ dẫn vào từng tài liệu hiện hành/lịch sử nằm ở [Chỉ mục kế hoạch hiện hành](CHI-MUC-KE-HOACH-HIEN-HANH.md); báo cáo này giữ nguyên như một mốc lịch sử.
