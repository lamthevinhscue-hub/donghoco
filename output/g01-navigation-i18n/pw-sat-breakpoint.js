async (page) => {
  const BASE = 'http://localhost:4321';
  const VIEWPORTS = [1010, 1024, 1038];
  const ROUTES = ['/', '/en/'];
  const THEMES = ['light', 'dark'];
  const results = [];
  for (const theme of THEMES) {
    for (const vp of VIEWPORTS) {
      for (const route of ROUTES) {
        await page.setViewportSize({ width: vp, height: 900 });
        await page.goto(BASE + route, { waitUntil: 'load' });
        await page.evaluate((t) => localStorage.setItem('theme', t), theme);
        await page.reload({ waitUntil: 'load' });
        await page.waitForTimeout(100);
        const rec = { route, viewport: vp, theme, thoiGian: new Date().toISOString() };
        rec.domDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
        const mode = await page.evaluate(() => {
          const desktopNav = document.querySelector('header nav.hidden');
          const hamburger = document.getElementById('menu-toggle');
          const vis = (el) => {
            if (!el) return false;
            const st = getComputedStyle(el);
            return st.display !== 'none' && st.visibility !== 'hidden' && el.getBoundingClientRect().width > 0;
          };
          return { desktopNavHien: vis(desktopNav), hamburgerHien: vis(hamburger) };
        });
        rec.desktopNavHien = mode.desktopNavHien;
        rec.hamburgerHien = mode.hamburgerHien;
        rec.chefeDo = mode.desktopNavHien === (vp >= 1024) && mode.hamburgerHien === (vp < 1024);
        rec.scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        rec.clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        rec.ngangTran = rec.scrollWidth > rec.clientWidth + 1;
        results.push(rec);
      }
    }
  }
  const fail = results.filter((r) => !r.chefeDo || r.ngangTran);
  const t = ['SAT_BREAKPOINT TONG=' + results.length, 'KHONG_DAT=' + fail.length]
    .concat(fail.map((f) => 'KHONG_DAT ' + f.route + ' ' + f.viewport + 'px ' + f.theme));
  return t.join('\n') + '\n@@JSON@@' + JSON.stringify(results);
}
