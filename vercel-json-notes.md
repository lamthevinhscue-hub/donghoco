# Ghi chú cấu hình vercel.json

## Strict-Transport-Security (HSTS)

`vercel.json` đang đặt:

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

**Cảnh báo quan trọng về `includeSubDomains` + `preload`:**

- `includeSubDomains` buộc **mọi tên miền con** phải dùng HTTPS trong 2 năm.
- Trình duyệt **ghi nhớ** điều này — **không gỡ được** bằng cách sửa lại cấu hình.
- Nếu sau này dựng một tên miền con chưa có HTTPS, tên miền con đó **sẽ không truy cập được**.
- `preload` danh sách của Chrome/Google càng khó gỡ hơn nữa.
- Tắt preload chỉ ảnh hưởng trình duyệt **chưa thăm trang**; trình duyệt đã thăm vẫn nhớ.

**Đừng thay đổi giá trị này nếu chưa hiểu rõ hệ quả.**

---

Lý do ghi chú ở file riêng thay vì trong `vercel.json`: JSON không hỗ trợ comment,
và Vercel reject khóa lạ (đã từng gây lỗi deploy khi thêm `_hsts_note` vào vercel.json).
