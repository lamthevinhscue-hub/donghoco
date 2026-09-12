async (page) => {
  const BASE = 'http://localhost:4321';
  const out = [];
  for (const vp of [375, 820, 1440]) {
    await page.setViewportSize({ width: vp, height: 900 });
    await page.goto(BASE + '/lich-su', { waitUntil: 'load' });
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(250);
    const st = await page.evaluate(() => {
      const header = document.querySelector('header');
      const headerBottom = header.getBoundingClientRect().bottom;
      const loc = document.querySelector('main .sticky.top-16');
      const locRect = loc ? loc.getBoundingClientRect() : null;
      const nut = loc ? loc.querySelector('button, a') : null;
      const nutRect = nut ? nut.getBoundingClientRect() : null;
      return {
        headerH: Math.round(headerBottom * 10) / 10,
        locTop: locRect ? Math.round(locRect.top * 10) / 10 : null,
        locBiChe: locRect ? locRect.top < headerBottom - 1 : null,
        nutBamDuoc: nutRect ? nutRect.top >= headerBottom - 1 : null,
        locClass: loc ? loc.className.slice(0, 50) : 'KHONG_THAY',
      };
    });
    out.push({ viewport: vp, ...st });
  }
  const fail = out.filter((o) => o.locBiChe || o.nutBamDuoc === false || o.locClass === 'KHONG_THAY');
  return 'STICKY LICH-SU TONG=' + out.length + ' KHONG_DAT=' + fail.length + '\n' + out.map((o) => JSON.stringify(o)).join('\n');
}
