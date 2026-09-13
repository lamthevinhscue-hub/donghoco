// Template bố cục — placeholder __W__ __THEME__ __LANG__ __PANEL__ được bash thay trước khi chạy
async (page) => {
  const BASE = 'http://127.0.0.1:4405';
  const duong = '__LANG__' === 'en' ? '/en/anatomy/' : '/giai-phau/';
  await page.setViewportSize({ width: __W__, height: 900 });
  await page.emulateMedia({ colorScheme: '__THEME__' });
  await page.goto(BASE + duong, { waitUntil: 'commit', timeout: 60000 });
  await page.waitForSelector('#exploded-svg', { timeout: 60000 });
  await page.waitForTimeout(700);
  if ('__PANEL__' === '3d') {
    await page.click('#tab-anatomy-3d');
    await page.waitForFunction(() => document.getElementById('three-loading')?.classList.contains('hidden'), null, { timeout: 60000 });
    await page.evaluate(() => document.querySelector('#three-canvas-container').scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(1200);
  }
  return await page.evaluate(() => ({
    tran: document.documentElement.scrollWidth <= window.innerWidth + 1,
    sw: document.documentElement.scrollWidth,
    iw: window.innerWidth,
  }));
}
