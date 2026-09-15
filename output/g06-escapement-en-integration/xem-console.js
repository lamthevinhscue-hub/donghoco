async (page) => {
  const loiMang = [];
  page.on('response', (r) => { if (r.status() >= 400) loiMang.push(r.status() + ' ' + r.url()); });
  page.on('requestfailed', (r) => loiMang.push('FAILED ' + r.url()));
  await page.goto('http://localhost:4321/co-che/chong-nuoc/', { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  return loiMang;
}
