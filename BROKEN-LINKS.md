# BROKEN-LINKS.md — Nhật ký rà soát link nội bộ

**Cập nhật lần cuối:** 2026-08-02 (rà sau đợt sửa lỗi 2)
**Phương pháp:** Script Python quét toàn bộ `src/` (.md, .mdx, .astro, .json) tìm link dạng `](/path)`, `href="/path"`, `"internalLink": "/path"`, đối chiếu với danh sách trang thực sự được build trong `dist/`.

---

## Kết luận

**0 link 404 thật** trên website đã deploy.

Tổng cộng quét được **31 link nội bộ** trong mã nguồn:
- ✅ 29 link hợp lệ (dẫn tới trang thực sự tồn tại).
- ⚠️ 2 link dẫn tới `/images/ten-anh.jpg` và `/images/tên-ảnh.jpg` — **không phải link thật**, chỉ là ví dụ minh họa trong file hướng dẫn `src/assets/README.md` (dòng 59 và 87). Không hiển thị trên trang công khai, không cần sửa.

---

## Chi tiết các nhóm link đã kiểm

### 1. Timeline `/lich-su` (28 mốc, trường `internalLink` trong `src/data/timeline.json`)
Tất cả 18 link nội bộ đều tồn tại: /thuong-hieu/blancpain, /thuong-hieu/cartier, /thuong-hieu/patek-philippe, /thuong-hieu/tag-heuer, /thuong-hieu/vacheron-constantin, /mau-iconic/fifty-fathoms, /mau-iconic/freak, /mau-iconic/iwc-mark-xi, /mau-iconic/omega-speedmaster, /mau-iconic/patek-nautilus, /mau-iconic/reverso, /mau-iconic/rolex-submariner, /mau-iconic/royal-oak, /mau-iconic/zenith-el-primero, /co-che/chong-tu, /co-che/len-day-tu-dong, /tu-dien/gmt, /tu-dien/tourbillon.

### 2. Bài `/co-che/bo-thoat`
Tất cả 4 link nội bộ đều tồn tại: /tu-dien/vph, /lich-su, /co-che/tru-cot, /co-che/chuyen-dong-co.

### 3. Link markdown `](/...)` trong toàn bộ content
Tất cả tồn tại (sau khi đã sửa slug Glashütte ở Blancpain trong đợt rà trước).

### 4. Redirect `/en`
Trang `/en` đã bị xóa (chưa có nội dung tiếng Anh). `vercel.json` cấu hình redirect `/en` và `/en/:path*` về `/` (permanent) → các link cũ không rơi vào 404.

---

## Lưu ý kỹ thuật cho lần rà sau

- Hàm `getSlug()` trong `src/lib/content.ts` dùng **tên file** (không phải `custom_slug`) để tạo URL. Do đó tên file phải khớp với slug mà các bài khác link tới. Lần trước lỗi Blancpain → Glashütte xuất phát từ đây.
- Script rà bằng `grep -P` trên Git Bash **không tin cậy** với ký tự multi-byte (Cyrillic, Arabic, CJK) — phải dùng Python hoặc Node script để scan chính xác.
