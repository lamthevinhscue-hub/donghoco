# Biên bản nghiệm thu — Prompt 13: Liên kết hai chiều Cơ chế ↔ Mẫu iconic (Co-Axial ↔ Speedmaster)

- **Ngày:** 31/08/2026
- **Phạm vi:** 3 file sửa + 1 biên bản tạo mới (file này). Không sửa component dùng chung, `ArticleLayout`, dữ liệu mẫu iconic, dữ liệu thương hiệu, URL hay slug hiện có.

## 1. Bốn file thuộc phạm vi Prompt 13

| # | File | Thay đổi |
|---|---|---|
| 1 | `src/content/config.ts` | +2 dòng: trường `relatedModels` cho **riêng** collection `coChe`, dùng lại `relatedLink` có sẵn, kèm comment tiếng Việt |
| 2 | `src/pages/co-che/[slug].astro` | +20 dòng: import `RelatedEditorial`, resolve `relatedModels` sang liên kết (bỏ qua an toàn nếu slug không tồn tại), render khối ngay sau khối nội dung |
| 3 | `src/content/coChe/vi/bo-thoat-dong-truc.md` | +7 dòng: `relatedModels` → `omega-speedmaster`, `updated: "2026-08-31"`, +1 nguồn Omega cuối mảng `sources` |
| 4 | `docs/nghiem-thu/2026-08-31_nghiem-thu-lien-ket-co-che-mau-iconic.md` | Tạo mới (biên bản này) |

`git diff --stat`: **3 files changed, 29 insertions(+), 0 deletions** (config.ts +2, [slug].astro +20, bo-thoat-dong-truc.md +7) — không xóa hay đổi dòng nào.

## 2. Thay đổi schema tối thiểu

Trong collection `coChe` của `src/content/config.ts`:

```ts
// Liên kết biên tập (tùy chọn): bài cơ chế dẫn tới mẫu iconic ứng dụng nguyên lý này.
relatedModels: z.array(relatedLink).default([]),
```

- Đặt cạnh các trường metadata của `coChe` (sau `interactive`).
- Dùng lại `relatedLink = z.object({ slug, relation })` đã có — không định nghĩa kiểu tương tự.
- Schema của `thuongHieu`, `mauIconic`, `tuDien`, `huongDan`, `trang` không đổi.
- `default([])` nên mọi bài cơ chế khác không phát sinh liên kết (đã kiểm chứng ở mục 6 với trang `/co-che/tourbillon/`).

## 3. Hiển thị trên trang chi tiết cơ chế

`src/pages/co-che/[slug].astro`:

- Import `RelatedEditorial` (component hiện có — không tạo giao diện mới).
- Lấy `mauIconic` theo ngôn ngữ hiện tại; với mỗi mục trong `data.relatedModels`, chỉ tạo liên kết khi slug tồn tại; nếu không thì bỏ qua (trang không lỗi).
- Mỗi liên kết dạng `{ href: '/mau-iconic/{slug}', title, kind: 'Mẫu iconic', relation }`.
- `<RelatedEditorial links={editorialLinks} />` đặt ngay sau khối `<Content />`, trước kết thúc layout.
- Khối "Đọc tiếp" tự động (`relatedArticles`), infographic, nội dung, nguồn và mọi thành phần khác giữ nguyên thứ tự.

## 4. Liên kết hai chiều và nhãn hiển thị

| Chiều | Trang nguồn | Trang đích | Nhãn hiển thị |
|---|---|---|---|
| → | `/co-che/bo-thoat-dong-truc` | `/mau-iconic/omega-speedmaster` | "Calibre 3861 của Moonwatch hiện đại dùng bộ thoát Co-Axial — xem một ứng dụng thực tế" (nhãn loại "MẪU ICONIC", tiêu đề "Omega Speedmaster — Chiếc đồng hồ của Mặt Trăng") |
| ← (Prompt 11, giữ nguyên) | `/mau-iconic/omega-speedmaster` | `/co-che/bo-thoat-dong-truc` | "Calibre 3861 của Moonwatch hiện đại dùng bộ thoát Co-Axial — xem nguyên lý hoạt động" (nhãn loại "CƠ CHẾ") |

`omega-speedmaster.md` không bị sửa trong Prompt 13.

## 5. Nguồn chính thức làm cơ sở

Nguồn bổ sung vào **cuối** mảng `sources` của `bo-thoat-dong-truc.md` (bài chưa có URL này):

```yaml
  - label: "Omega — Hướng dẫn Moonwatch Calibre 3861 và bộ thoát Co-Axial"
    url: "https://media.omegawatches.com/documents/manuals/31032425004001_User_Manual_EN.pdf"
```

(Trạng thái nguồn: HTTP 200, `application/pdf`, 2,1 MB — đã kiểm tra ở Prompt 11 khi thêm cùng URL cho bài Speedmaster; không kiểm lại vì cùng ngày.) Hai nguồn Omega hiện có ("Lịch sử thương hiệu và bộ thoát Co-Axial", "Chronicle") giữ nguyên vị trí và nội dung. Nội dung Markdown của bài không đổi.

## 6. Kết quả kiểm tra lệnh

| Lệnh | Kết quả |
|---|---|
| `npm run check` | ĐẠT — "Tất cả kiểm tra nội dung tĩnh đạt" |
| `npm run build` | Thành công — 218 trang; sitemap tạo xong |
| Kiểm link nội bộ sau build | "OK: Không phát hiện link nội bộ hỏng. Đã quét 218 trang HTML, 14244 link." |
| `git diff --check` | Không có lỗi (exit 0) |
| `git status --short` (trước khi tạo biên bản) | Đúng 3 file `M` như bảng mục 1, cộng các file docs/output chưa theo dõi đã tồn tại từ trước — ngoài phạm vi Prompt 13, không đưa vào commit. |

## 7. Kết quả kiểm tra hiển thị (bản xem trước cục bộ sau build)

**`/co-che/bo-thoat-dong-truc/`**
- Đúng một khối "Kết nối cùng chủ đề".
- Liên kết tới `/mau-iconic/omega-speedmaster`, tiêu đề đúng "Omega Speedmaster — Chiếc đồng hồ của Mặt Trăng", nhãn loại "MẪU ICONIC".
- Nhãn hiển thị đúng từng chữ: "Calibre 3861 của Moonwatch hiện đại dùng bộ thoát Co-Axial — xem một ứng dụng thực tế".
- Dòng cập nhật dưới tiêu đề: "Cập nhật: 31 tháng 8, 2026".

**`/mau-iconic/omega-speedmaster/`**
- Vẫn có liên kết ngược tới `/co-che/bo-thoat-dong-truc` với nhãn "nguyên lý hoạt động" của Prompt 11, kèm liên kết Breitling Navitimer cũ.
- Khối "Kết nối cùng chủ đề" đúng 1 lần, không có liên kết trùng (mỗi href 1 lần).

**`/co-che/tourbillon/`**
- KHÔNG có khối "Kết nối cùng chủ đề" (0 section) — schema mới với `default([])` không làm bài cơ chế khác phát sinh liên kết rỗng hay khối thừa.

**Chung:**
- Trang đích `/mau-iconic/omega-speedmaster/` trả HTTP 200.
- Bàn phím: Tab từ đầu trang `/co-che/bo-thoat-dong-truc/` đi tới được liên kết `/mau-iconic/omega-speedmaster`.
- Sáng/tối: chụp 2 ảnh khối liên kết trên trang cơ chế — không chồng lấn, chữ đọc rõ cả hai chế độ.
- Console: 0 lỗi mới — log console chỉ còn hai 404 cố hữu của bản preview (`favicon.ico`, `/_vercel/insights/script.js` — analytics chỉ chạy production), đếm được 0 dòng 404 khác.

## 8. Xác nhận phạm vi và cam kết

- Không bài cơ chế nào khác bị thêm `relatedModels` (diff chỉ chạm đúng 3 file trên; các file coChe khác không có thay đổi trong `git status`).
- Không sửa `omega-speedmaster.md`, không sửa component dùng chung, `ArticleLayout`, giao diện chung, URL, slug, ảnh, infographic, schema collection khác.
- Chưa commit, chưa push. Chờ chỉ thị riêng.
- Khi commit: chỉ stage 3 file mã nguồn ở mục 1 + biên bản này theo tên cụ thể; không dùng `git add .` / `git add -A`.
