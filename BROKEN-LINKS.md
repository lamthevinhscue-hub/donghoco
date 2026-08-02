# BROKEN-LINKS.md — Nhật ký rà soát link nội bộ

**Ngày rà soát:** 2026-08-01
**Phạm vi:** Tất cả link nội bộ trong `/lich-su` (timeline) + bài `/co-che/bo-thoat` + toàn bộ content.

## Kết quả

**Không phát hiện link hỏng (404).** Không cần ẩn link nào.

## Chi tiết kiểm tra

### 1. Timeline `/lich-su` (28 mốc, trường `internalLink` trong `src/data/timeline.json`)

Tất cả 18 link nội bộ đều tồn tại:

| Link | Trạng thái |
|------|-----------|
| /thuong-hieu/blancpain | ✅ |
| /thuong-hieu/cartier | ✅ |
| /thuong-hieu/patek-philippe | ✅ |
| /thuong-hieu/tag-heuer | ✅ |
| /thuong-hieu/vacheron-constantin | ✅ |
| /mau-iconic/fifty-fathoms | ✅ |
| /mau-iconic/freak | ✅ |
| /mau-iconic/iwc-mark-xi | ✅ |
| /mau-iconic/omega-speedmaster | ✅ |
| /mau-iconic/patek-nautilus | ✅ |
| /mau-iconic/reverso | ✅ |
| /mau-iconic/rolex-submariner | ✅ |
| /mau-iconic/royal-oak | ✅ |
| /mau-iconic/zenith-el-primero | ✅ |
| /co-che/chong-tu | ✅ |
| /co-che/len-day-tu-dong | ✅ |
| /tu-dien/gmt | ✅ |
| /tu-dien/tourbillon | ✅ |

### 2. Bài `/co-che/bo-thoat`

Tất cả 4 link nội bộ đều tồn tại:

| Link | Trạng thái |
|------|-----------|
| /tu-dien/vph | ✅ |
| /lich-su | ✅ |
| /co-che/tru-cot | ✅ |
| /co-che/chuyen-dong-co | ✅ |

### 3. Quét toàn bộ content (tất cả file `.md`, `.astro`, `.json`)

Không phát hiện thêm link nào dẫn tới trang không tồn tại.

## Ghi chú

- Tất cả link "Đọc chi tiết" trong timeline được render từ trường `internalLink` trong `timeline.json` — không có link hardcode trong `lich-su.astro`.
- Hàm `getSlug()` dùng tên file (không phải `custom_slug`) → cần lưu ý khi đổi tên file thương hiệu (VD: `a-lange-soehne.md` tạo URL `/thuong-hieu/a-lange-soehne`, dù `custom_slug` ghi `a-lange-sohne`).
