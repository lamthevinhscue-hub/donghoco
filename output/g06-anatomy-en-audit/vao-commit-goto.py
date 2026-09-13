import io
import re

# A: thay khối goto bằng commit + waitForSelector, bỏ retry
p = 'output/g06-anatomy-en-audit/pw-g06-thao-tac.js'
s = io.open(p, encoding='utf-8').read()
old = """  // reset trạng thái điều hướng của page dùng chung rồi mới vào trang
  await page.goto('about:blank').catch(() => {});
  await page.waitForTimeout(300);
  try {
    await page.goto(BASE + '/giai-phau/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch {
    await page.goto(BASE + '/giai-phau/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  }"""
new = """  // goto commit (không chờ font/load) + chờ phần tử mốc — tránh race load-state
  await page.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });
  await page.waitForSelector('#tab-anatomy-2d', { timeout: 60000 });
  await page.waitForTimeout(400);"""
if 'waitUntil: ' + chr(39) + 'commit' + chr(39) not in s:
    assert old in s, 'A: không thấy khối goto cũ hoặc mới'
    s = s.replace(old, new, 1)
print('A:', 'đã vá' if old in s else 'đã có từ trước, bỏ qua')
io.open(p, 'w', encoding='utf-8').write(s)
print('A ok')

# B: sửa regex chèn route (newPage())); cuối dòng) + goto commit + chờ phần tử
p = 'output/g06-anatomy-en-audit/pw-g06-thao-tac-b.js'
s = io.open(p, encoding='utf-8').read()
for name in ['pageRM', 'pageRM2', 'pageNJ', 'pageErr']:
    moc = re.compile(r'(const ' + name + r' = await [^\n]*newPage\(\)\)*;\n)')
    m = moc.search(s)
    assert m, name
    if 'googleapis' not in m.group(1):
        chen = m.group(1) + '  await ' + name + '.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());\n'
        s = s[:m.start(1)] + chen + s[m.end(1):]
s = s.replace("{ waitUntil: 'domcontentloaded', timeout: 60000 }", "{ waitUntil: 'commit', timeout: 60000 }")
# chờ phần tử mốc sau từng goto trong B (mỗi đoạn dùng phần tử đầu tiên của mục)
chen_sau = [
    ("pageRM.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });", "  await pageRM.waitForSelector('#toggle-explode', { timeout: 60000 });\n"),
    ("pageRM2.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });", "  await pageRM2.waitForSelector('#toggle-explode', { timeout: 60000 });\n"),
    ("pageNJ.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });", "  await pageNJ.waitForSelector('#exploded-svg', { timeout: 60000 });\n"),
    ("pageErr.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });", "  await pageErr.waitForSelector('#tab-anatomy-2d', { timeout: 60000 });\n"),
]
for moc_dong, them in chen_sau:
    assert moc_dong in s, moc_dong[:40]
    s = s.replace(moc_dong, moc_dong + '\n' + them.rstrip('\n'), 1)
io.open(p, 'w', encoding='utf-8').write(s)
print('B ok')
