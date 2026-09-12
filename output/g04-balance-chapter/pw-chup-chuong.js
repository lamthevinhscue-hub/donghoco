// Chụp vùng chương + toàn trang đầu ở một viewport/theme — kiểm trực quan nhanh
async (page) => {
  const OUT = 'output/g04-balance-chapter/shots';
  const url = 'http://localhost:4321/co-che/day-toc-banh-lac/';
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  const root = page.locator('[data-bhc-root]');
  await root.screenshot({ path: OUT + '/nhanh-vi-1440-chuong.png' });
  return { chup: 'nhanh-vi-1440-chuong.png' };
}
