async (page) => {
  const BASE = 'http://127.0.0.1:4404';
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await page.setViewportSize({ width: 900, height: 900 });
  await page.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });
  await page.waitForSelector('#tab-anatomy-2d', { timeout: 60000 });
  await page.waitForTimeout(400);
  const cdpShot = await page.context().newCDPSession(page);
  await cdpShot.send('Page.enable');
  const hashToanCanvas = async () => {
    await page.evaluate(() => document.querySelector('#three-canvas-container').scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(400);
    const cb2 = await page.locator('#three-canvas-container canvas').boundingBox({ timeout: 10000 });
    const shot = await cdpShot.send('Page.captureScreenshot', { format: 'png', clip: { x: cb2.x, y: cb2.y, width: cb2.width, height: cb2.height, scale: 1 } });
    let h = 0;
    for (let i = 0; i < shot.data.length; i += 997) h = (h * 31 + shot.data.charCodeAt(i)) % 1000000007;
    return h;
  };
  await page.click('#tab-anatomy-3d');
  await page.waitForFunction(() => document.getElementById('three-loading')?.classList.contains('hidden'), null, { timeout: 60000 });
  await page.waitForTimeout(1200);
  const h0 = await hashToanCanvas();
  await page.locator('#rot-left-3d').scrollIntoViewIfNeeded();
  for (let i = 0; i < 8; i++) await page.click('#rot-left-3d', { force: true });
  await page.waitForTimeout(600);
  const h1 = await hashToanCanvas();
  await page.locator('#zoom-in-3d').scrollIntoViewIfNeeded();
  await page.click('#zoom-in-3d', { force: true });
  await page.waitForTimeout(600);
  const h2 = await hashToanCanvas();
  return { truocXoay: h0, sauXoay8x: h1, xoayCoDoiKhong: h0 !== h1, sauZoom: h2, zoomCoDoiKhong: h1 !== h2 };
}
