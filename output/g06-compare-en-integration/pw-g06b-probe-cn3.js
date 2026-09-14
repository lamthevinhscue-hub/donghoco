async (page) => {
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await page.goto('http://localhost:4321/so-sanh/?m=rolex-submariner,fifty-fathoms', { waitUntil: 'load' });
  const truoc = await page.evaluate(() => sessionStorage.getItem('compare-lang-switch'));
  await page.goto('http://localhost:4321/en/compare/?m=rolex-submariner', { waitUntil: 'load' });
  await page.waitForTimeout(150);
  const sau = await page.evaluate(() => sessionStorage.getItem('compare-lang-switch'));
  const note = await page.evaluate(() => document.getElementById('compare-missing-note')?.textContent);
  return { truoc, sau, note };
}
