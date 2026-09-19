# CHỈ MỤC KẾ HOẠCH HIỆN HÀNH — ĐỒNG HỒ CƠ

**Ngày lập:** 19/09/2026 (gói H01, danh mục DHC-H14-20260919, giao dịch TXN-20260919-02)
**Nền:** HEAD `a715fd0` = `origin/main`
**Vai trò của tệp này:** điểm vào duy nhất để biết tài liệu nào đang điều phối công việc, tài liệu nào là lịch sử hoặc tham khảo. Khi có kế hoạch mới, cập nhật tệp này trước rồi mới bổ sung tệp kế hoạch vào `docs/`. Chỉ mục không xóa tài liệu lịch sử.

---

## 1. Tài liệu điều phối hiện hành — bộ duy nhất

| Tài liệu | Vai trò | Trạng thái | Gói liên quan | Căn cứ |
|---|---|---|---|---|
| [Bộ giao việc GLM 14 gói](BO-GIAO-VIEC-GLM-14-GOI-2026-09-19.md) | Hướng dẫn thực hiện H01–H14: thứ tự gửi, quy tắc chung, mẫu báo cáo, câu lệnh phát hành mục 8 | **Hiện hành** | H01 đến H14 | Soạn 19/09/2026; chưa được Git theo dõi, đề nghị lưu cùng đợt H01 |
| [Kế hoạch phát triển hợp nhất](KE-HOACH-PHAT-TRIEN-HOP-NHAT-2026-09-19.md) | Kế hoạch đã thẩm định trên HEAD `a715fd0`; **mục 3 là bản đính chính chính thức của bốn tài liệu nguồn**; mục 5 là phạm vi chi tiết gói EN | **Hiện hành** | H01 đến H14 | Soạn 19/09/2026; chưa được Git theo dõi, đề nghị lưu cùng đợt H01 |
| Tệp này (CHI-MUC-KE-HOACH-HIEN-HANH.md) | Chỉ mục phân biệt hiện hành với lịch sử | **Hiện hành** | H01 (tạo), các gói sau (cập nhật) | Gói H01 |

Mọi lệnh thi công khác ngoài ba tệp trên **không còn hiệu lực**, kể cả các bộ prompt và kế hoạch đã dẫn ở mục 4 và 5.

## 2. Số liệu và quy tắc hiện hành đã chốt — đọc trước khi dùng tài liệu nào khác

Các điểm dưới đây theo mục 3 của kế hoạch hợp nhất; tài liệu nguồn đã được ghi đính chính ngay tại chỗ (19/09/2026, gói H01):

1. **H03 là đúng 13 bài: 7 mẫu biểu tượng và 6 thương hiệu** (đợt 1: 5 iconic, đợt 2: 2 iconic, đợt 3: 6 thương hiệu). Mọi chỗ ghi "15 bài iconic" là cách chọn ban đầu, đã bị thay.
2. **Sau H03 hoàn tất có 11 mẫu iconic EN** (4 có sẵn + 7 mới), 9 thương hiệu EN (3 + 6), 66 tệp EN nếu không có thay đổi khác. Không phải 12 iconic.
3. **Số liệu trên trang chủ (VI và EN) lấy tự động** từ collection kèm lọc bản nháp theo môi trường. Không tạo cơ chế sửa tay; sau từng đợt chỉ kiểm con số tăng đúng.
4. **Bài chưa có EN không phải 404 và không phải ngõ cút**: liên kết giữ về bản tiếng Việt kèm nhãn minh bạch "Vietnamese only — no English version yet" (hằng `viOnly` trong `src/components/history/HistoryTimeline.astro`). Vấn đề đúng là thiếu bản dịch.
5. **Đo lường (H02) chỉ ghi số quan sát thực tế** kèm ngày chụp và phạm vi; không suy số từ beacon hay từ URL cũ; không coi thiếu dữ liệu là số 0.
6. **`docs/QUY-CHUAN-HINH-ANH.md` là đề xuất cần duyệt**, chưa phải quy chuẩn đã ban hành; gói **H04** xử lý chi tiết và phát hành lại để không có hai quy tắc đối nghịch.
7. **Prompt tháng 8 và mọi lệnh tự push cũ không còn là lệnh thi công** (xem mục 5). Phát hành chỉ theo mục 8 bộ giao việc, sau khi GPT Work thông báo đủ điều kiện nghiệm thu và cho phép.

## 3. Bốn tài liệu nguồn đã thẩm định — giữ để truy vết, không tự là lệnh thi công

| Tài liệu | Vai trò | Trạng thái | Gói liên quan | Tài liệu thay thế khi làm việc |
|---|---|---|---|---|
| [danh-gia-toan-dien-va-huong-phat-trien-2026-09-19.md](danh-gia-toan-dien-va-huong-phat-trien-2026-09-19.md) | Rà toàn diện 19/09 trên nền `521f5fa`; đầu vào của nhiều đề xuất | Tham khảo — đã áp đính chính H01 | H02, H03, H07, H12, H14 | Kế hoạch hợp nhất (mục 3.1) |
| [huong-dan-bat-do-luong-2026-09-19.md](huong-dan-bat-do-luong-2026-09-19.md) | Hướng dẫn thao tác Vercel Analytics và Search Console cho chủ dự án | Tham khảo — đã áp đính chính H01 | H02 | Kế hoạch hợp nhất (mục 3.2) |
| [QUY-CHUAN-HINH-ANH.md](QUY-CHUAN-HINH-ANH.md) | Đề xuất quy chuẩn hình ảnh (bảng màu, khung, chữ, alt, ảnh AI) | **Đề xuất trình duyệt** — đã áp đính chính H01 | H04 (hoàn thiện), H12 (ảnh AI) | Bản H04 phát hành lại |
| [prompt-dich-13-bai-lap-ngo-cut-en.md](prompt-dich-13-bai-lap-ngo-cut-en.md) | Danh sách 13 bài và khuôn dịch từng đợt | Tham khảo — đã áp đính chính H01 | H03-A/B/C | Bộ giao việc H03 + kế hoạch hợp nhất (mục 3.4, mục 5) |

Bốn tệp này đều chưa được Git theo dõi tại thời điểm lập chỉ mục; đề nghị lưu Git cùng đợt H01 (xem mục 7 và biên bản H01).

## 4. Tài liệu kế hoạch, lộ trình và đánh giá lịch sử

Trạng thái chung của mục này: **lịch sử hoặc tham khảo** — số liệu chỉ đúng tại thời điểm mỗi tệp ghi; không dùng làm căn cứ thi công. Tài liệu thay thế luôn là bộ điều phối ở mục 1.

| Tài liệu | Vai trò tại thời điểm lập | Ghi chú |
|---|---|---|
| [LO-TRINH-PHAT-TRIEN-HIEN-TAI.md](LO-TRINH-PHAT-TRIEN-HIEN-TAI.md) | Tài liệu trạng thái chính thức tới mốc lần 22 (05/09/2026) | Lịch sử; số trang, số link là mốc cũ. H01 không sửa tệp này — cập nhật khi có lượt rà trạng thái mới |
| [KE-HOACH-PHAT-TRIEN-FINAL-2026-09-12.md](KE-HOACH-PHAT-TRIEN-FINAL-2026-09-12.md) | Kế hoạch đợt G01–G09 | Lịch sử; G01–G09 đã thực hiện xong 12 đến 19/09/2026 (xem git log) |
| [ra-soat-toan-bo-2026-09-05.md](ra-soat-toan-bo-2026-09-05.md) | Rà toàn bộ dự án 05/09 | Lịch sử; mục 8 đã dẫn kế hoạch mới và chỉ mục này |
| [ket-luan-tham-dinh-va-prompt-glm-final-2026-09-05.md](ket-luan-tham-dinh-va-prompt-glm-final-2026-09-05.md) | Kết luận thẩm định và prompt đợt 05/09 | Lịch sử |
| [danh-gia-website-va-huong-phat-trien-2026-09-12.md](danh-gia-website-va-huong-phat-trien-2026-09-12.md), [danh-gia-doi-chieu-chuan-quoc-te-2026-09-12.md](danh-gia-doi-chieu-chuan-quoc-te-2026-09-12.md), [danh-gia-va-de-xuat-minh-hoa-2026-09-12.md](danh-gia-va-de-xuat-minh-hoa-2026-09-12.md), [cap-nhat-tien-do-va-de-xuat-noi-dung-moi-2026-09-12.md](cap-nhat-tien-do-va-de-xuat-noi-dung-moi-2026-09-12.md) | Các đánh giá đầu vào của kế hoạch 12/09 | Lịch sử/tham khảo |
| Đánh giá và kế hoạch tháng 8: [danh-gia-va-ke-hoach-2026-08-17.md](danh-gia-va-ke-hoach-2026-08-17.md), [danh-gia-wcag-2026-08-23.md](danh-gia-wcag-2026-08-23.md), [ra-soat-tien-do-ke-hoach-2026-08-23.md](ra-soat-tien-do-ke-hoach-2026-08-23.md), [ra-soat-danh-gia-gpt-va-bo-prompt-p0.md](ra-soat-danh-gia-gpt-va-bo-prompt-p0.md), [ra-soat-ma-nguon-2026-09-05.md](ra-soat-ma-nguon-2026-09-05.md), [danh-gia-toan-dien-2026-08-28.md](danh-gia-toan-dien-2026-08-28.md), [ke-hoach-hoan-thien-donghoco.md](ke-hoach-hoan-thien-donghoco.md), [ke-hoach-mo-rong-noi-dung-va-bao-ve-ban-quyen.md](ke-hoach-mo-rong-noi-dung-va-bao-ve-ban-quyen.md), [ke-hoach-topic-cluster.md](ke-hoach-topic-cluster.md), [ke-hoach-quang-ba-quoc-te.md](ke-hoach-quang-ba-quoc-te.md), [lo-trinh-con-lai-2026-08-28.md](lo-trinh-con-lai-2026-08-28.md), [bao-cao-nguon-huong-dan-2026-08-22.md](bao-cao-nguon-huong-dan-2026-08-22.md), [so-sanh-doi-thu-va-lo-trinh.md](so-sanh-doi-thu-va-lo-trinh.md), [so-sanh-mo-hinh-bach-khoa-2-trang.md](so-sanh-mo-hinh-bach-khoa-2-trang.md), [code-review-2026-08-08.md](code-review-2026-08-08.md), [security-assessment-2026-08-08.md](security-assessment-2026-08-08.md) | Đánh giá, kế hoạch, so sánh giai đoạn đầu | Lịch sử |
| `docs/nghiem-thu/` (toàn thư mục) | Biên bản nghiệm thu từng gói | Bằng chứng lịch sử; tra cứu theo gói khi cần truy vết |

## 5. Bộ prompt và lệnh thi công cũ — không còn là lệnh hiện hành

| Tài liệu | Tình trạng | Đọc gì thay thế |
|---|---|---|
| [bo-prompt-glm-v2.md](bo-prompt-glm-v2.md) | Bộ prompt đợt trước; **đoạn khóa 7 điểm gồm lệnh tự push và quy tắc slug tháng 8 không còn áp dụng** | Mục 8 bộ giao việc (phát hành) và `src/i18n/contentRoutes.ts` (route hiện hành) |
| [bo-6-prompt-glm-toi-uu-giao-dien-2026-08-16.md](bo-6-prompt-glm-toi-uu-giao-dien-2026-08-16.md), [bo-3-prompt-nang-chuan-bach-khoa.md](bo-3-prompt-nang-chuan-bach-khoa.md), [bo-7-prompt-giao-glm-mo-rong-noi-dung.md](bo-7-prompt-giao-glm-mo-rong-noi-dung.md), [bo-prompt-glm-cung-co-nen-tang.md](bo-prompt-glm-cung-co-nen-tang.md), [bo-prompt-glm-phan-con-lai.md](bo-prompt-glm-phan-con-lai.md), [bo-prompt-glm-sau-ra-soat-toan-dien-2026-09-05.md](bo-prompt-glm-sau-ra-soat-toan-dien-2026-09-05.md), [bo-prompt-glm-sua-loi-code-review.md](bo-prompt-glm-sua-loi-code-review.md) | Các bộ prompt đã thi công xong hoặc đã thay bằng bộ giao việc mới | Bộ giao việc 14 gói |
| [prompt-goi-ky-thuat-rss-llms-typecheck.md](prompt-goi-ky-thuat-rss-llms-typecheck.md) | Lỗi thời một phần: Việc A (`astro check`) đã xong từ trước; việc RSS và `llms.txt` nay thuộc gói H08 và H13 | H08, H13 trong bộ giao việc |
| [prompt-commit-push-goi-a.md](prompt-commit-push-goi-a.md), [prompt-commit-push-goi-b.md](prompt-commit-push-goi-b.md), [prompt-commit-nhan-doc-tiep.md](prompt-commit-nhan-doc-tiep.md) | Khuôn lệnh phát hành cũ | Mục 8 bộ giao việc |
| [prompt-mo-khoa-phien-ban-tieng-anh.md](prompt-mo-khoa-phien-ban-tieng-anh.md), [prompt-glm-28-minh-hoa-svg-timeline.md](prompt-glm-28-minh-hoa-svg-timeline.md), [prompt-glm-form-lien-he-formspree.md](prompt-glm-form-lien-he-formspree.md), [prompt-glm-hoan-thien-hoat-anh-co-che.md](prompt-glm-hoan-thien-hoat-anh-co-che.md), [prompt-glm-sua-tieu-de-dark-mode.md](prompt-glm-sua-tieu-de-dark-mode.md), [prompt-sinh-anh-og-va-nen.md](prompt-sinh-anh-og-va-nen.md), [prompt-doi-phan-hang-zenith.md](prompt-doi-phan-hang-zenith.md), [goi-robots-txt-mo-bot-doc-theo-yeu-cau.md](goi-robots-txt-mo-bot-doc-theo-yeu-cau.md), [goi-wcag-w1-chinh-role-button.md](goi-wcag-w1-chinh-role-button.md), [goi-wcag-w1-con-lai.md](goi-wcag-w1-con-lai.md), [goi-wcag-w1-sua-loi.md](goi-wcag-w1-sua-loi.md), [goi-wcag-w2-trang-cong-bo.md](goi-wcag-w2-trang-cong-bo.md), [goi-thi-diem-nang-chat-luong-escapement.md](goi-thi-diem-nang-chat-luong-escapement.md) | Prompt đợt cũ đã thi công | Không cần; truy vết qua git log và biên bản nghiệm thu |

## 6. Tài liệu dữ liệu và hồ sơ nguồn — đầu vào biên tập, kiểm ngày trước khi dùng

| Nhóm | Vai trò | Trạng thái | Gói liên quan |
|---|---|---|---|
| `docs/ho-so-nguon-*.md` (hồ sơ nguồn các cụm song ngữ) và [ho-so-nguon-swiss-made.md](ho-so-nguon-swiss-made.md) | Hồ sơ claim–nguồn–giới hạn–ngày kiểm của từng cụm nội dung | Tham khảo đầu vào; đọc lại và kiểm ngày trước khi viết | H05 (chỉ định dùng hồ sơ Swiss Made), H06, H07, H14 |
| [ho-so-du-lieu-tien-hoa-rolex-submariner.md](ho-so-du-lieu-tien-hoa-rolex-submariner.md), [ho-so-du-lieu-tien-hoa-rolex-gmt-master.md](ho-so-du-lieu-tien-hoa-rolex-gmt-master.md), [ho-so-du-lieu-tien-hoa-omega-speedmaster.md](ho-so-du-lieu-tien-hoa-omega-speedmaster.md) | Hồ sơ nguồn ba bộ sơ đồ tiến hóa đã xuất bản | Tham khảo | Nhân rộng sơ đồ tiến hóa (theo hồ sơ riêng) |
| `docs/goi-du-lieu-*.md`, [goi-mau-iconic-0-va-1.md](goi-mau-iconic-0-va-1.md), [goi-mau-iconic-2-va-3.md](goi-mau-iconic-2-va-3.md), `docs/goi-thong-so-*.md`, [goi-nguon-tham-khao-86-bai.md](goi-nguon-tham-khao-86-bai.md), [de-xuat-mau-iconic-42-hang.md](de-xuat-mau-iconic-42-hang.md) | Gói dữ liệu thương hiệu, mẫu, thông số đã đưa vào nội dung | Lịch sử dữ liệu; tra cứu khi soát nội dung | Không gói nào phụ thuộc trực tiếp |
| [de-xuat-nang-chat-luong-svg-infographic.md](de-xuat-nang-chat-luong-svg-infographic.md), [de-xuat-font-va-bo-cuc-lich-su.md](de-xuat-font-va-bo-cuc-lich-su.md), [de-xuat-lien-ket-bien-tap-v1.md](de-xuat-lien-ket-bien-tap-v1.md) | Đề xuất đã thi công hoặc đã kế thừa | Tham khảo | H04 đối chiếu khi chuẩn hóa hình |
| [checklist-thuong-hieu-can-bo-sung.md](checklist-thuong-hieu-can-bo-sung.md), [chien-luoc-seo-cum-bao-duong-va-su-dung-an-toan.md](chien-luoc-seo-cum-bao-duong-va-su-dung-an-toan.md), [chien-luoc-seo-cum-chon-dong-ho-dau-tien.md](chien-luoc-seo-cum-chon-dong-ho-dau-tien.md), [chi-so-ky-thuat-web.md](chi-so-ky-thuat-web.md), [chinh-trang-cong-bo-truoc-khi-commit.md](chinh-trang-cong-bo-truoc-khi-commit.md), [template-ho-so-suu-tam.md](template-ho-so-suu-tam.md), [sua-loi-nguon-longines-lindbergh.md](sua-loi-nguon-longines-lindbergh.md), [huong-dan-tao-anh-ai-moc-1916.md](huong-dan-tao-anh-ai-moc-1916.md) | Tài liệu biên tập và kỹ thuật đơn lẻ | Tham khảo | H12 (ảnh AI), H04 |
| [huong-dan-len-ten-mien-rieng.md](huong-dan-len-ten-mien-rieng.md), [huong-dan-thiet-lap-search-console.md](huong-dan-thiet-lap-search-console.md), [huong-dan-search-console.md](huong-dan-search-console.md) | Hướng dẫn vận hành tên miền và Search Console | Tham khảo; hai tệp Search Console cần đối chiếu với hướng dẫn đo lường 19/09 (đã đính chính) | H02 |

Ngoài `docs/`, ba tệp gốc cũng thuộc hệ tài liệu: `AGENTS.md` (chỉ dẫn dự án), `CONTENT-GUIDE.md` (chuẩn nội dung, đang theo dõi Git), `CAN-KIEM-CHUNG.md` (tracker kiểm chứng, chưa theo dõi Git).

## 7. Danh sách đề nghị lưu Git khi H01 đạt — tách riêng với bằng chứng nội bộ

**Đề nghị lưu Git (tệp thuộc hoặc phụ thuộc H01):**

1. `docs/CHI-MUC-KE-HOACH-HIEN-HANH.md` — mới, tệp này.
2. `docs/nghiem-thu/H01-2026-09-20.md` — mới, biên bản H01.
3. `docs/danh-gia-toan-dien-va-huong-phat-trien-2026-09-19.md` — đã sửa đính chính.
4. `docs/huong-dan-bat-do-luong-2026-09-19.md` — đã sửa đính chính.
5. `docs/QUY-CHUAN-HINH-ANH.md` — đã sửa đính chính.
6. `docs/prompt-dich-13-bai-lap-ngo-cut-en.md` — đã sửa đính chính.
7. `docs/ra-soat-toan-bo-2026-09-05.md` — bổ sung hai câu liên kết điều phối ở mục 8.
8. `docs/BO-GIAO-VIEC-GLM-14-GOI-2026-09-19.md` và `docs/KE-HOACH-PHAT-TRIEN-HOP-NHAT-2026-09-19.md` — tồn tại từ trước, chưa theo dõi Git; chỉ mục dẫn tới hai tệp này nên cần lưu cùng đợt để liên kết không hỏng.

**Chỉ dùng nội bộ, không đưa vào đề nghị commit:** toàn bộ `output/h01-plan-index-audit/` (bằng chứng kiểm kê) và các tệp `output/` khác.

## 8. Quy tắc duy trì chỉ mục

- Khi có kế hoạch hoặc bộ gói mới: thêm vào mục 1, chuyển tài liệu bị thay thế xuống mục 4 hoặc 5, không xóa tệp lịch sử.
- Mục 4 đến 6 liệt kê theo tệp cho nhóm điều phối và theo nhóm cho dữ liệu; thư mục `docs/nghiem-thu/` tra theo tên gói.
- Chỉ mục lập tại H01 trên danh sách 112 tệp `docs/*.md`; tệp mới phát sinh sau H01 do gói tương ứng tự khai báo trong biên bản của mình.

## 9. Lịch sử cập nhật

| Ngày | Việc | Gói |
|---|---|---|
| 19/09/2026 | Lập chỉ mục; áp đính chính cho bốn tài liệu nguồn; bổ sung liên kết điều phối vào `ra-soat-toan-bo-2026-09-05.md` | H01 |
