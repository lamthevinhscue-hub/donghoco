import io

# ============ check-3d-loading-budget.mjs: điểm tìm mới + bảo vệ 2 route ============
p = 'scripts/check-3d-loading-budget.mjs'
s = io.open(p, encoding='utf-8').read()

old = (
    "// ===== 2. Trang giải phẫu chỉ mở engine bằng dynamic import =====\n"
    "const giaiPhauSrc = readFileSync('src/pages/giai-phau.astro', 'utf8');\n"
    "const hasDynamic = /import\\(\\s*['\"]\\.\\./scripts/exploded3d['\"]\\s*\\)/.test(giaiPhauSrc);\n"
    "// import tĩnh bị cấm, TRỪ import type (biên dịch xóa — không tạo dependency runtime)\n"
    "const staticImport = giaiPhauSrc.match(/^[ \\t]*import\\s+(?!type\\b)[^;]*from\\s+['\"][^'\"]*exploded3d['\"]/m);\n"
    "if (!hasDynamic) {\n"
    "  errors.push('giai-phau.astro: không tìm thấy dynamic import \"../scripts/exploded3d\" — engine có thể bị tải tĩnh');\n"
    "}\n"
    "if (staticImport) {\n"
    "  errors.push(`giai-phau.astro: phát hiện import tĩnh (không phải import type): ${staticImport[0].trim()}`);\n"
    "}\n"
    "if (hasDynamic && !staticImport) {\n"
    "  report.push('OK  giai-phau.astro: engine chỉ mở bằng dynamic import (import tĩnh duy nhất là import type — đã xóa lúc biên dịch)');\n"
    "}"
)
new = (
    "// ===== 2. Trang giải phẫu chỉ mở engine bằng dynamic import =====\n"
    "// G06-A chặng 2: logic chuyển sang component khuôn chung (dùng cho CẢ /giai-phau/ và /en/anatomy/)\n"
    "const expSrc = readFileSync('src/components/anatomy/AnatomyExperience.astro', 'utf8');\n"
    "const hasDynamic = /import\\(\\s*['\"]\\.\\./\\.\\./scripts/exploded3d['\"]\\s*\\)/.test(expSrc);\n"
    "// import tĩnh bị cấm, TRỪ import type (biên dịch xóa — không tạo dependency runtime)\n"
    "const staticImport = expSrc.match(/^[ \\t]*import\\s+(?!type\\b)[^;]*from\\s+['\"][^'\"]*exploded3d['\"]/m);\n"
    "if (!hasDynamic) {\n"
    "  errors.push('AnatomyExperience.astro: không tìm thấy dynamic import \"../../scripts/exploded3d\" — engine có thể bị tải tĩnh');\n"
    "}\n"
    "if (staticImport) {\n"
    "  errors.push(`AnatomyExperience.astro: phát hiện import tĩnh (không phải import type): ${staticImport[0].trim()}`);\n"
    "}\n"
    "if (hasDynamic && !staticImport) {\n"
    "  report.push('OK  AnatomyExperience.astro: engine chỉ mở bằng dynamic import (import tĩnh duy nhất là import type — đã xóa lúc biên dịch)');\n"
    "}"
)
assert old in s, 'muc2'
s = s.replace(old, new, 1)

old = "  ['Giải phẫu — 2D mặc định', 'giai-phau/index.html'],\n];"
new = "  ['Giải phẫu — 2D mặc định', 'giai-phau/index.html'],\n  ['Giải phẫu EN — 2D mặc định', 'en/anatomy/index.html'],\n];"
assert old in s, 'routes'
s = s.replace(old, new, 1)

old = (
    "  // ===== 5. /giai-phau ban đầu: không khởi tạo engine trước khi chọn tab =====\n"
    "  const giaiPhauHtml = readFileSync(join(DIST, 'giai-phau/index.html'), 'utf8');\n"
    "  if (giaiPhauHtml.includes('mountExploded3D')) {\n"
    "    errors.push('giai-phau/index.html: có khởi tạo/tên hàm mountExploded3D trong HTML ban đầu (phải nằm trong chunk động)');\n"
    "  } else {\n"
    "    report.push('OK  /giai-phau/ HTML ban đầu: không khởi tạo engine 3D — chỉ bấm tab mới tải');\n"
    "  }"
)
new = (
    "  // ===== 5. Giải phẫu ban đầu (VI + EN): không khởi tạo engine trước khi chọn tab =====\n"
    "  for (const route of ['giai-phau/index.html', 'en/anatomy/index.html']) {\n"
    "    const html = readFileSync(join(DIST, route), 'utf8');\n"
    "    if (html.includes('mountExploded3D')) {\n"
    "      errors.push(`${route}: có khởi tạo/tên hàm mountExploded3D trong HTML ban đầu (phải nằm trong chunk động)`);\n"
    "    } else {\n"
    "      report.push(`OK  /${route.replace('/index.html', '/')}/ HTML ban đầu: không khởi tạo engine 3D — chỉ bấm tab mới tải`);\n"
    "    }\n"
    "  }"
)
assert old in s, 'muc5'
s = s.replace(old, new, 1)

s = s.replace(
    '// check-3d-loading-budget.mjs — Chống hồi quy hiệu năng phần 3D /giai-phau',
    '// check-3d-loading-budget.mjs — Chống hồi quy hiệu năng phần 3D giải phẫu (/giai-phau + /en/anatomy)',
    1,
)
io.open(p, 'w', encoding='utf-8').write(s)
print('check-3d OK')

# ============ check-english-launch.mjs: REQUIRED_EN += /en/anatomy/ ============
p = 'scripts/check-english-launch.mjs'
s = io.open(p, encoding='utf-8').read()
old = "  '/en/history/',"
new = "  '/en/history/',\n  '/en/anatomy/',"
assert old in s
s = s.replace(old, new, 1)
io.open(p, 'w', encoding='utf-8').write(s)
print('check-english-launch OK')
