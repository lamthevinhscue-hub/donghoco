async (page) => {
  const out = [];
  for (const [ten, BASE] of [['NEN-4129437', 'http://localhost:4322'], ['G01-SAU-SUA', 'http://localhost:4321']]) {
    for (const vp of [375, 820, 1440]) {
      await page.setViewportSize({ width: vp, height: 900 });
      await page.goto(BASE + '/lich-su', { waitUntil: 'load' });
      await page.evaluate(() => window.scrollTo(0, 900));
      await page.waitForTimeout(250);
      const st = await page.evaluate(() => {
        const header = document.querySelector('header');
        const headerRect = header.getBoundingClientRect();
        const loc = document.querySelector('main .sticky.top-16');
        const locRect = loc ? loc.getBoundingClientRect() : null;
        return {
          headerH: Math.round(headerRect.height * 10) / 10,
          locTop: locRect ? Math.round(locRect.top * 10) / 10 : null,
        };
      });
      out.push(ten + ' ' + vp + 'px headerH=' + st.headerH + ' locTop=' + st.locTop);
    }
  }
  return out.join('\n');
}
