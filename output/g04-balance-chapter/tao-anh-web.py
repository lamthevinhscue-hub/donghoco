# G04-B — Tạo bản web tối ưu cho ảnh hero chương "Bánh lắc và dây tóc"
# Nguồn: output/g04-banh-lac-day-toc-design/drafts/huong-ab-v1.png (ảnh gốc GPT Work, 1672×941)
# Đích: public/images/history/balance-hairspring/banh-lac-day-toc-hero.jpg
# Mục tiêu dung lượng ≤ 150 KB ở kích thước dùng thật (render tối đa ~1152px rộng).
# Không crop — giữ trọn khung gốc để không mất bánh lắc.
from PIL import Image
import os, json

SRC = "output/g04-banh-lac-day-toc-design/drafts/huong-ab-v1.png"
DST_DIR = "public/images/history/balance-hairspring"
DST = os.path.join(DST_DIR, "banh-lac-day-toc-hero.jpg")
TARGET = 150 * 1024

os.makedirs(DST_DIR, exist_ok=True)

img = Image.open(SRC).convert("RGB")
w0, h0 = img.size
ketqua = {"nguon": SRC, "kichThuocGoc": [w0, h0], "thu": []}

# Thử giảm dần: width 1200 → 1080 → 960, quality 84 → 80 → 76 → 72
for width in (1200, 1080, 960):
    for q in (84, 80, 76, 72):
        h = round(h0 * width / w0)
        im = img.resize((width, h), Image.LANCZOS)
        im.save(DST, "JPEG", quality=q, optimize=True, progressive=True)
        size = os.path.getsize(DST)
        ketqua["thu"].append({"width": width, "height": h, "quality": q, "bytes": size})
        if size <= TARGET:
            ketqua["chon"] = {"width": width, "height": h, "quality": q, "bytes": size}
            ketqua["datNguong"] = True
            break
    if size <= TARGET:
        break

if not ketqua.get("datNguong"):
    ketqua["datNguong"] = False

print(json.dumps(ketqua, indent=2, ensure_ascii=False))
with open("output/g04-balance-chapter/manifest-anh-web.json", "w", encoding="utf-8") as f:
    json.dump(ketqua, f, indent=2, ensure_ascii=False)
    f.write("\n")
