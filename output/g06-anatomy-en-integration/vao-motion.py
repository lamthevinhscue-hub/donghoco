import io

p = 'scripts/check-motion-accessibility.mjs'
s = io.open(p, encoding='utf-8').read()
n = 0

# Quy tắc 4: 2D mặc định — chuyển điểm đọc sang component khuôn + kiểm cả 2 wrapper
old4 = (
    "  // Bản 2D vẫn còn là phương án thay thế\n"
    "  const g = read('src/pages/giai-phau.astro');\n"
    "  if (/WatchExplodedView(\\s|\\/>)/.test(g) && /tab-anatomy-2d/.test(g)) {\n"
    "    ok('giai-phau: giữ bản 2D làm chế độ mặc định + phương án thay thế 3D');\n"
    "  } else {\n"
    "    fail('giai-phau: thiếu bản 2D mặc định');\n"
    "  }"
)
new4 = (
    "  // Bản 2D vẫn còn là phương án thay thế (G06-A: logic chuyển vào khuôn chung\n"
    "  // AnatomyExperience — kiểm khuôn + xác nhận cả hai wrapper gọi khuôn)\n"
    "  const g = read('src/components/anatomy/AnatomyExperience.astro');\n"
    "  const wVi = read('src/pages/giai-phau.astro');\n"
    "  const wEn = read('src/pages/en/anatomy.astro');\n"
    "  if (/WatchExplodedView(\\s|\\/>)/.test(g) && /tab-anatomy-2d/.test(g)\n"
    "      && /AnatomyExperience/.test(wVi) && /AnatomyExperience/.test(wEn)) {\n"
    "    ok('giai-phau: giữ bản 2D làm chế độ mặc định + phương án thay thế 3D (khuôn chung, cả VI/EN)');\n"
    "  } else {\n"
    "    fail('giai-phau: thiếu bản 2D mặc định');\n"
    "  }"
)
if old4 in s:
    s = s.replace(old4, new4, 1)
    n += 1

# Quy tắc 5: chấp nhận aria-label dạng chuỗi tĩnh hoặc biểu thức JSX (khuôn hai ngôn ngữ)
old5 = 'else if (/id="exploded-svg"[^>]*role="img"[^>]*aria-label="[^"]+"/.test(s) || /id="exploded-svg"[^>]*aria-label="[^"]+"[^>]*role="img"/.test(s)) ok('
new5 = 'else if (/id="exploded-svg"[^>]*role="img"[^>]*aria-label=("[^"]+"|\\{)/.test(s) || /id="exploded-svg"[^>]*aria-label=("[^"]+"|\\{)[^>]*role="img"/.test(s)) ok('
if old5 in s:
    s = s.replace(old5, new5, 1)
    n += 1

io.open(p, 'w', encoding='utf-8').write(s)
print('check-motion:', n, '/2 thay đổi')
