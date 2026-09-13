import io
import re

# A: chèn route chặn font ngay sau setViewportSize đầu tiên
p = 'output/g06-anatomy-en-audit/pw-g06-thao-tac.js'
s = io.open(p, encoding='utf-8').read()
old = '  await page.setViewportSize({ width: 1280, height: 800 });'
new = (
    '  await page.setViewportSize({ width: 1280, height: 800 });\n'
    '  // Moi truong kiem khong truy cap font ngoai — chan de fonts.ready khong treo\n'
    '  // (screenshot/goto cho font). Chup dung font du phong: bo cuc co the lech nhe\n'
    '  // so voi production — ghi trong bien ban.\n'
    '  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());'
)
assert old in s, 'A: khong thay moc'
if 'googleapis' not in s:
    s = s.replace(old, new, 1)
    io.open(p, 'w', encoding='utf-8').write(s)
print('A ok')

# B: chèn route sau mỗi lần newPage()
p = 'output/g06-anatomy-en-audit/pw-g06-thao-tac-b.js'
s = io.open(p, encoding='utf-8').read()
count = 0
for name in ['pageRM', 'pageRM2', 'pageNJ', 'pageErr']:
    moc = re.compile(r'(const ' + name + r' = await [^\n]*newPage\(\);\n)')
    m = moc.search(s)
    assert m, name
    if 'googleapis' not in m.group(1):
        chen = m.group(1) + '  await ' + name + '.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());\n'
        s = s[:m.start(1)] + chen + s[m.end(1):]
        count += 1
io.open(p, 'w', encoding='utf-8').write(s)
print('B ok, da chen', count)
