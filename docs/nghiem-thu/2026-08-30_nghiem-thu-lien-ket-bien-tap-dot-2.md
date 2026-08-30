# Biên bản nghiệm thu — Prompt 11: Liên kết biên tập đợt 2

- **Ngày:** 30/08/2026
- **Phạm vi:** 3 bài mẫu iconic + 1 biên bản (file này). Không sửa schema, component, layout, bài cơ chế, bài thương hiệu hay file dữ liệu khác.

## 1. Bốn file thuộc phạm vi Prompt 11

| # | File | Thay đổi |
|---|---|---|
| 1 | `src/content/mauIconic/vi/panerai-luminor.md` | +`relatedModels` (1 liên kết), +`updated: "2026-08-30"` |
| 2 | `src/content/mauIconic/vi/universal-geneve-polerouter.md` | +`relatedModels` (1 liên kết), +`updated: "2026-08-30"` |
| 3 | `src/content/mauIconic/vi/omega-speedmaster.md` | +`relatedMechanisms` (1 liên kết), +`updated: "2026-08-30"`, +1 nguồn Omega trong `sources` |
| 4 | `docs/nghiem-thu/2026-08-30_nghiem-thu-lien-ket-bien-tap-dot-2.md` | Tạo mới (biên bản này) |

`git diff --stat` trước khi tạo biên bản: **3 files changed, 17 insertions(+), 0 deletions** — chỉ thêm dòng frontmatter, không xóa hay đổi dòng nào.

## 2. Ba liên kết đã thêm

| # | Bài nguồn | Slug đích | Nhãn quan hệ (nguyên văn frontmatter) |
|---|---|---|---|
| 1 | `panerai-luminor` | `fifty-fathoms` | "Cùng nguồn gốc quân sự — người nhái quân sự Ý và người nhái chiến đấu Pháp" |
| 2 | `universal-geneve-polerouter` | `royal-oak` | "Một thiết kế lớn đầu sự nghiệp Gérald Genta (1954) — trước Royal Oak năm 1972" |
| 3 | `omega-speedmaster` | `bo-thoat-dong-truc` (trường `relatedMechanisms`) | "Calibre 3861 của Moonwatch hiện đại dùng bộ thoát Co-Axial — xem nguyên lý hoạt động" |

`omega-speedmaster.md` giữ nguyên `relatedModels` cũ (Breitling Navitimer, nhãn không đổi). Không dùng "đầu tiên", "duy nhất", "mẫu đầu tay" trong bất kỳ nhãn nào.

## 3. Nguồn chính thức làm cơ sở

| Liên kết | Nguồn chính thức |
|---|---|
| Panerai ↔ Fifty Fathoms | Panerai — Lịch sử thương hiệu (`panerai.com/en/world-of-panerai/history.html`, đã có sẵn trong bài nguồn): đồng hồ phục vụ người nhái Hải quân Ý. Blancpain — Bộ sưu tập Fifty Fathoms (`blancpain.com/en/collections/fifty-fathoms-collection`, trong bài đích): gắn với người nhái chiến đấu Pháp. Nhãn chỉ nói "cùng nguồn gốc quân sự", không suy diễn quan hệ thiết kế trực tiếp. |
| Polerouter → Royal Oak | Universal Genève — "Gérald Genta và chiếc đồng hồ mở đầu sự nghiệp" (`universalgeneve.com/en/magazine/gerald-genta-and-watch-launched-his-career`, đã có sẵn trong bài nguồn): Polerouter là thiết kế lớn đầu tiên của Genta, năm 1954, khi ông 23 tuổi. Nhãn ghi đúng mốc 1954 và Royal Oak 1972. |
| Speedmaster → Bộ thoát đồng trục | Omega — Hướng dẫn Moonwatch Calibre 3861 và bộ thoát Co-Axial (`media.omegawatches.com/documents/manuals/31032425004001_User_Manual_EN.pdf`). Kiểm tra nguồn trước khi thêm: HTTP 200, `Content-Type: application/pdf`, 2,1 MB (Last-Modified 07/04/2025). |

Nguồn Omega mới được thêm vào **cuối** mảng `sources` với nhãn: "Omega — Hướng dẫn Moonwatch Calibre 3861 và bộ thoát Co-Axial". Ba nguồn Omega hiện có (Moonwatch Professional, Bộ sưu tập Speedmaster, Chronicle) giữ nguyên, không đổi thứ tự.

## 4. Xác nhận phạm vi

- **Không sửa** `src/content/config.ts` — schema dùng lại đúng trường `relatedModels` / `relatedMechanisms` (`z.array(relatedLink)`) và `updated` đã có sẵn.
- **Không sửa** component (`RelatedEditorial.astro`), layout, giao diện, URL, slug.
- **Không sửa** thân bài (nội dung Markdown) của cả 3 file — diff chỉ nằm trong frontmatter.
- **Không sửa** các nguồn hiện có; chỉ thêm 1 nguồn Omega mới.

## 5. Kết quả các lệnh kiểm tra

| Lệnh | Kết quả |
|---|---|
| `npm run check` | ĐẠT — "Tất cả kiểm tra nội dung tĩnh đạt" |
| `npm run build` | Thành công — 218 trang; Pagefind index 218 trang; sitemap tạo xong |
| Kiểm link nội bộ sau build | "OK: Không phát hiện link nội bộ hỏng. Đã quét 218 trang HTML, 14238 link." |
| `git diff --check` | Không có lỗi (exit 0) |
| `git status --short` (trước khi tạo biên bản) | Đúng 3 file `M` như bảng mục 1, cộng các file docs/output chưa theo dõi đã tồn tại từ trước. Các file `??` đó ngoài phạm vi Prompt 11, tuyệt đối không đưa vào commit. |

## 6. Kết quả kiểm tra hiển thị (bản xem trước cục bộ sau build)

Kiểm tra bằng trình duyệt tự động trên preview local, 3 trang, cả sáng và tối:

**`/mau-iconic/panerai-luminor/`**
- Khối "Kết nối cùng chủ đề" xuất hiện đúng 1 lần (không trùng).
- 1 liên kết tới `/mau-iconic/fifty-fathoms`, tiêu đề "Blancpain Fifty Fathoms — Cột mốc của đồng hồ lặn hiện đại".
- Nhãn hiển thị đúng từng chữ: "Cùng nguồn gốc quân sự — người nhái quân sự Ý và người nhái chiến đấu Pháp".
- Dòng "Cập nhật: 30 tháng 8, 2026" xuất hiện dưới tiêu đề; `dateModified` trong HTML build = "2026-08-30".

**`/mau-iconic/universal-geneve-polerouter/`**
- 1 liên kết tới `/mau-iconic/royal-oak`.
- Nhãn nói rõ mốc 1954 và Royal Oak 1972: "Một thiết kế lớn đầu sự nghiệp Gérald Genta (1954) — trước Royal Oak năm 1972".
- Không có chữ "mẫu đầu tay" trên toàn trang.

**`/mau-iconic/omega-speedmaster/`**
- Vẫn giữ liên kết Breitling Navitimer với nhãn cũ nguyên văn.
- Thêm liên kết tới `/co-che/bo-thoat-dong-truc` (nhãn "CƠ CHẾ"), đúng "Calibre 3861 … bộ thoát Co-Axial".
- Khối "Kết nối cùng chủ đề" đúng 1 lần; nguồn mới 3861 hiển thị trong khối Nguồn cuối bài, các nguồn Omega cũ còn nguyên.
- `dateModified` = "2026-08-30".

**Chung cho cả 3 trang:**
- Ba trang đích trả HTTP 200 khi điều hướng trực tiếp (không liên kết chết): `/mau-iconic/fifty-fathoms/`, `/mau-iconic/royal-oak/`, `/co-che/bo-thoat-dong-truc/`.
- Bàn phím: Tab từ đầu trang `/mau-iconic/panerai-luminor/` đi tới được liên kết `/mau-iconic/fifty-fathoms` (vùng chạm ≥44px theo component hiện có, không đổi).
- Sáng/tối: chụp 6 ảnh khối liên kết (3 trang × 2 chế độ) — chữ đọc rõ, không chồng lấn ở cả hai chế độ.
- Console: không có lỗi mới. Hai lỗi 404 cố hữu trên bản xem trước (favicon.ico và `/_vercel/insights/script.js` — script analytics chỉ chạy trên production) vẫn như trước, không liên quan Prompt 11.

## 7. Cam kết

- Chưa commit, chưa push. Chờ chỉ thị riêng.
- Khi commit: chỉ stage 3 file mã nguồn ở mục 1 + biên bản này theo tên cụ thể; không dùng `git add .` / `git add -A`.
