// G07 — chụp ảnh chứng cứ 3 trang
async (page) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4399/co-che/bo-may-in-house/', { waitUntil: 'load' });
  await page.screenshot({ path: 'output/g07-content-pilot-integration/shots/hd3-1440-sang.png' });
  await page.goto('http://localhost:4399/mau-iconic/junghans-max-bill/', { waitUntil: 'load' });
  await page.screenshot({ path: 'output/g07-content-pilot-integration/shots/junghans-1440-sang.png' });
  await page.goto('http://localhost:4399/so-sanh/?m=nomos-tangente,junghans-max-bill', { waitUntil: 'load' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'output/g07-content-pilot-integration/shots/so-sanh-nomos-junghans.png' });
  return 'OK 3 anh';
}
