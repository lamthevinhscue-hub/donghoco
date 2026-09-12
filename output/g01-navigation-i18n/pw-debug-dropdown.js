async (page) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4321/co-che/bo-thoat', { waitUntil: 'load' });
  const btn = page.locator('.nav-dropdown').nth(0).locator('[data-dropdown-toggle]');
  await btn.hover();
  await page.waitForTimeout(500);
  const st = await page.evaluate(() => {
    const m = document.querySelector('#nav-dropdown-knowledge');
    return getComputedStyle(m).opacity + '/' + getComputedStyle(m).visibility;
  });
  await page.screenshot({ path: 'output/g01-navigation-i18n/anh/1440-bo-thoat-active-location.png' });
  return 'kien-thuc=' + st;
}
