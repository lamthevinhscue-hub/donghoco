import io

p = 'scripts/check-g01-navigation.mjs'
s = io.open(p, encoding='utf-8').read()
n = 0

# 1) logic: +2 ca cặp giải phẫu
old = "  ['cặp lịch sử chiều ngược: /en/history/ → /lich-su', () => vietnamesePathFor('/en/history/') === '/lich-su', () => String(vietnamesePathFor('/en/history/'))],"
add = (
    "\n  ['cặp giải phẫu (G06-A): /giai-phau → /en/anatomy/', () => englishPathFor('/giai-phau') === '/en/anatomy/', () => String(englishPathFor('/giai-phau'))],"
    "\n  ['cặp giải phẫu chiều ngược: /en/anatomy/ → /giai-phau', () => vietnamesePathFor('/en/anatomy/') === '/giai-phau', () => String(vietnamesePathFor('/en/anatomy/'))],"
)
if old in s:
    s = s.replace(old, old + add, 1)
    n += 1

# 2) exploreViOnly
old2 = "  const exploreViOnly = ['/giai-phau', '/so-sanh'];"
new2 = "  const exploreViOnly = ['/so-sanh']; // /lich-su (/en/history/) và /giai-phau (/en/anatomy/) đã có bản EN — G05-B/G06-A"
if old2 in s:
    s = s.replace(old2, new2, 1)
    n += 1

# 3) anchor /en/anatomy/ sau anchor lịch sử
old3 = (
    "    const hisA = anchorWithHref(block, '/en/history/');\n"
    "    kiemDauRa(`Explore EN (${tenNav}): mục lịch sử trỏ route EN \"/en/history/\" (thẻ không mang nhãn VI-only)`, hisA !== null && !hisA.includes('Vietnamese only'), hisA === null ? 'không tìm thấy thẻ /en/history/' : 'thẻ còn nhãn VI-only');\n"
    "  }"
)
add3 = (
    "\n    const anaA = anchorWithHref(block, '/en/anatomy/');\n"
    "    kiemDauRa(`Explore EN (${tenNav}): mục Anatomy trỏ route EN \"/en/anatomy/\" (thẻ không mang nhãn VI-only)`, anaA !== null && !anaA.includes('Vietnamese only'), anaA === null ? 'không tìm thấy thẻ /en/anatomy/' : 'thẻ còn nhãn VI-only');\n"
    "  }"
)
if old3 in s:
    s = s.replace(old3, old3.replace('  }', '') + add3, 1)
    n += 1

# 4) hai khối dist cặp giải phẫu (chèn trước khối 404)
moc = "// ---- 404: Home không active ----"
khoi = (
    "// ---- Cặp giải phẫu G06-A: /giai-phau đã có bản dịch — switcher thẳng + hreflang thật ----\n"
    "if (has('/giai-phau/index.html')) {\n"
    "  const html = read('/giai-phau/index.html');\n"
    "  const swCount = (html.match(/data-lang-switch=\"untranslated\"/g) ?? []).length;\n"
    "  kiemDauRa('Cặp giải phẫu /giai-phau: bộ chuyển ngôn ngữ là link thẳng (không data-lang-switch)', swCount === 0, `count=${swCount}`);\n"
    "  kiemDauRa('Cặp giải phẫu /giai-phau: switcher trỏ \"/en/anatomy/\"', /href=\"\\/en\\/anatomy\\//\".test(html) || /href=\"\\/en\\/anatomy\\/\"/.test(html), 'không tìm thấy link /en/anatomy/');\n"
    "  kiemDauRa('Cặp giải phẫu /giai-phau: hreflang đủ vi \"/giai-phau/\" + en \"/en/anatomy/\" + x-default → \"/giai-phau/\"', () => {\n"
    "    const vi = /<link rel=\"alternate\" hreflang=\"vi\" href=\"https:\\/\\/www\\.kienthucdonghoco\\.vn\\/giai-phau\\/\">/.test(html);\n"
    "    const en = /<link rel=\"alternate\" hreflang=\"en\" href=\"https:\\/\\/www\\.kienthucdonghoco\\.vn\\/en\\/anatomy\\/\">/.test(html);\n"
    "    const xd = /<link rel=\"alternate\" hreflang=\"x-default\" href=\"https:\\/\\/www\\.kienthucdonghoco\\.vn\\/giai-phau\\/\">/.test(html);\n"
    "    return vi && en && xd;\n"
    "  }, 'cần 3 thẻ link alternate đúng URL');\n"
    "  kiemDauRa('Cặp giải phẫu /giai-phau: không còn noscript \"chưa có bản tiếng Anh\"', !/<noscript>[\\s\\S]*?chưa có bản tiếng Anh[\\s\\S]*?<\\/noscript>/.test(html), 'vẫn còn noscript trang chưa dịch');\n"
    "}\n"
    "\n"
    "// ---- Cặp giải phẫu G06-A: trang EN mới /en/anatomy/ ----\n"
    "if (has('/en/anatomy/index.html')) {\n"
    "  const html = read('/en/anatomy/index.html');\n"
    "  const desktop = desktopOf(html);\n"
    "  const mobile = mobileOf(html);\n"
    "  const swCount = (html.match(/data-lang-switch=\"untranslated\"/g) ?? []).length;\n"
    "  kiemDauRa('Cặp giải phẫu /en/anatomy: bộ chuyển ngôn ngữ là link thẳng về \"/giai-phau\"', swCount === 0 && /href=\"\\/giai-phau\"/.test(html), `count=${swCount}`);\n"
    "  // Khuôn hreflang hiện hành: chiều VI phát vi theo pathname (\"/giai-phau/\"),\n"
    "  // chiều EN phát vi theo giá trị bảng (\"/giai-phau\" không slash) — tiền tồn tại toàn site.\n"
    "  kiemDauRa('Cặp giải phẫu /en/anatomy: hreflang đủ vi \"/giai-phau\" + en \"/en/anatomy/\" + x-default → \"/giai-phau\" (khuôn getAlternates hiện hành)', () => {\n"
    "    const vi = /<link rel=\"alternate\" hreflang=\"vi\" href=\"https:\\/\\/www\\.kienthucdonghoco\\.vn\\/giai-phau\">/.test(html);\n"
    "    const en = /<link rel=\"alternate\" hreflang=\"en\" href=\"https:\\/\\/www\\.kienthucdonghoco\\.vn\\/en\\/anatomy\\/\">/.test(html);\n"
    "    const xd = /<link rel=\"alternate\" hreflang=\"x-default\" href=\"https:\\/\\/www\\.kienthucdonghoco\\.vn\\/giai-phau\">/.test(html);\n"
    "    return vi && en && xd;\n"
    "  }, 'cần 3 thẻ link alternate đúng URL');\n"
    "  kiemDauRa('Cặp giải phẫu /en/anatomy: không noscript trang chưa dịch (tiếng Việt hoặc tiếng Anh)', !/<noscript>[\\s\\S]*?(chưa có bản tiếng Anh|not translated yet)[\\s\\S]*?<\\/noscript>/.test(html), 'vẫn còn noscript trang chưa dịch');\n"
    "  kiemDauRa('Cặp giải phẫu /en/anatomy: mục Anatomy desktop aria-current=\"page\" (1)', countCurrent(desktop, '/en/anatomy/', 'page') === 1, `count=${countCurrent(desktop, '/en/anatomy/', 'page')}`);\n"
    "  kiemDauRa('Cặp giải phẫu /en/anatomy: mục Anatomy mobile aria-current=\"page\" (1)', countCurrent(mobile, '/en/anatomy/', 'page') === 1, `count=${countCurrent(mobile, '/en/anatomy/', 'page')}`);\n"
    "} else {\n"
    "  kiemDauRa('Cặp giải phẫu /en/anatomy (dist/en/anatomy/index.html)', false, 'thiếu tệp');\n"
    "}\n"
    "\n"
    + moc
)
if moc in s and 'Cặp giải phẫu /en/anatomy' not in s:
    s = s.replace(moc, khoi, 1)
    n += 1

io.open(p, 'w', encoding='utf-8').write(s)
print('đã áp', n, '/ 4 thay đổi (đổi nào có sẵn thì bỏ qua)')
