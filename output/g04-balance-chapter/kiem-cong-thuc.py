# Vòng sửa TXN-20260912-23 — xác minh công thức dây tóc trước khi sửa component
import math, re

cx, cy, r0, R, A_STUD, N_COILS, K = 320.0, 215.0, 16.0, 92.0, -math.pi / 4, 5.0, math.pi
N = 72

# 1) path tĩnh mới (p=0) phải khớp HỆT SPRING_STATIC hiện có (không phải đổi chuỗi tĩnh)
pts = []
for i in range(N + 1):
    t = i / N
    a = t * (A_STUD + 2 * math.pi * N_COILS)  # phi=0, w=0
    r = r0 + (R - r0) * t
    pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
d_new = 'M ' + ' L '.join(f'{x:.1f} {y:.1f}' for x, y in pts)
src = open('src/components/history/BalanceHairspringChapter.astro', encoding='utf-8').read()
m = re.search(r"const SPRING_STATIC =\s*'([^']+)'", src)
print('path tĩnh khớp công thức mới tại p=0:', d_new == m.group(1))

# 2) đầu ngoài CŨ trôi theo pha (bằng chứng GPT Work đúng)
for p in (0, 0.25, 0.5):
    phi = math.radians(40 * math.sin(2 * math.pi * p))
    coils = 5 + 0.75 * math.sin(2 * math.pi * p)
    ae = phi + (A_STUD - phi + 2 * math.pi * coils)
    print(f'CŨ  p={p}: đầu ngoài = ({cx + R * math.cos(ae):.1f}, {cy + R * math.sin(ae):.1f})')

# 3) đầu ngoài MỚI ghim tại stud mọi pha; đầu trong = góc quay hiện tại
for p in (0, 0.125, 0.25, 0.375, 0.5):
    phi = math.radians(40 * math.sin(2 * math.pi * p))
    ae = phi + (A_STUD - phi + 2 * math.pi * N_COILS) + K * math.sin(2 * math.pi * p) * math.sin(math.pi * 1.0)
    print(f'MỚI p={p}: đầu ngoài = ({cx + R * math.cos(ae):.1f}, {cy + R * math.sin(ae):.1f}) | đầu trong góc = {math.degrees(phi):.1f}°')
