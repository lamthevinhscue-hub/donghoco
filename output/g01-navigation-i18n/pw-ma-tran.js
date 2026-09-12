async (page) => {
  const BASE = 'http://localhost:4321';
  const ROUTES = ['/', '/en/', '/thuong-hieu', '/en/brands/', '/co-che/bo-thoat', '/en/mechanisms/escapement/', '/lich-su', '/404.html'];
  const VIEWPORTS = [320, 375, 768, 820, 1024, 1440];
  const THEMES = ['light', 'dark'];

  const rectOf = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  };
  const visible = (el) => {
    if (!el) return false;
    const st = getComputedStyle(el);
    return st.display !== 'none' && st.visibility !== 'hidden' && el.getBoundingClientRect().width > 0;
  };

  const results = [];
  for (const theme of THEMES) {
    for (const vp of VIEWPORTS) {
      for (const route of ROUTES) {
        const rec = { route, viewport: vp, theme, thoiGian: new Date().toISOString() };
        await page.setViewportSize({ width: vp, height: 900 });
        await page.goto(BASE + route, { waitUntil: 'load' });
        // Đặt theme như người dùng thật (localStorage là nơi website lưu lựa chọn),
        // tải lại rồi ĐỌC trạng thái theme thật từ DOM (html.dark).
        await page.evaluate((t) => localStorage.setItem('theme', t), theme);
        await page.reload({ waitUntil: 'load' });
        await page.waitForTimeout(120);
        rec.domDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
        rec.htmlLang = await page.evaluate(() => document.documentElement.lang);

        rec.scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        rec.clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        rec.ngangTran = rec.scrollWidth > rec.clientWidth + 1;

        const geo = await page.evaluate(({ rectOfSrc, visibleSrc }) => {
          // các hàm helper được truyền dạng nguồn để chạy trong trang
          const evalFn = new Function('el', 'return (' + rectOfSrc + ')(el)');
          const visFn = new Function('el', 'return (' + visibleSrc + ')(el)');
          const header = document.querySelector('header');
          const logo = header.querySelector('a[aria-label]');
          const logoSpan = logo ? logo.querySelector('span') : null;
          const desktopNav = header.querySelector('nav.hidden');
          const mobileMenu = document.getElementById('mobile-menu');
          const hamburger = document.getElementById('menu-toggle');
          const headerSearch = header.querySelector('[data-inline-search]');
          const searchBtn = document.getElementById('search-trigger');
          const switcher = header.querySelector('div.flex.shrink-0 > a');
          const themeBtn = document.getElementById('theme-toggle');
          const rec = {};
          rec.logo = evalFn(logo);
          rec.logoHien = visFn(logo);
          rec.logoSpanTran = logoSpan ? logoSpan.scrollWidth - logoSpan.clientWidth : null;
          rec.desktopNav = evalFn(desktopNav);
          rec.desktopNavHien = visFn(desktopNav);
          rec.hamburger = evalFn(hamburger);
          rec.hamburgerHien = visFn(hamburger);
          rec.searchInlineHien = visFn(headerSearch);
          rec.searchBtnHien = visFn(searchBtn);
          rec.switcher = evalFn(switcher);
          rec.switcherHien = visFn(switcher);
          rec.themeBtn = evalFn(themeBtn);
          const nut = [switcher, themeBtn, hamburger, searchBtn].filter(visFn);
          rec.nutNhoNhatPx = nut.length ? Math.round(Math.min(...nut.map((el) => Math.min(el.getBoundingClientRect().width, el.getBoundingClientRect().height))) * 10) / 10 : null;
          rec.chong = [];
          const logoRect = evalFn(logo);
          for (const [ten, el] of [['desktopNav', desktopNav], ['hamburger', hamburger], ['switcher', switcher], ['themeBtn', themeBtn], ['searchBtn', searchBtn]]) {
            const ov = 0; // tính dưới bằng giá trị trả về
            void ov;
            const r = evalFn(el);
            if (logoRect && r) {
              const w = Math.min(logoRect.x + logoRect.w, r.x + r.w) - Math.max(logoRect.x, r.x);
              const h = Math.min(logoRect.y + logoRect.h, r.y + r.h) - Math.max(logoRect.y, r.y);
              if (w > 0.5 && h > 0.5) rec.chong.push({ voi: ten, dienTich: Math.round(w * h * 10) / 10 });
            }
          }
          // trạng thái active từng nav RIÊNG (desktop + mobile), kèm hiển thị hay không
          const actives = (root) => root ? [...root.querySelectorAll('a[aria-current]')].map((a) => ({ href: a.getAttribute('href'), value: a.getAttribute('aria-current') })) : [];
          rec.activeDesktop = actives(desktopNav);
          rec.activeMobile = actives(mobileMenu);
          rec.mobileMenuDangMo = mobileMenu ? !mobileMenu.classList.contains('hidden') : false;
          return rec;
        }, {
          rectOfSrc: rectOf.toString(),
          visibleSrc: visible.toString(),
        });
        Object.assign(rec, geo);
        rec.hopLe = !rec.ngangTran && rec.chong.length === 0 && rec.logoHien && (rec.logoSpanTran ?? 0) <= 0 && (rec.nutNhoNhatPx === null || rec.nutNhoNhatPx >= 40);
        results.push(rec);
      }
    }
  }
  const fail = results.filter((r) => !r.hopLe);
  const tomTat = ['TONG_SO=' + results.length, 'SO_KHONG_DAT=' + fail.length]
    .concat(fail.map((f) => 'KHONG_DAT ' + f.route + ' ' + f.viewport + 'px ' + f.theme + ' tran=' + f.ngangTran + ' chong=' + JSON.stringify(f.chong) + ' logoSpanTran=' + f.logoSpanTran + ' nutMin=' + f.nutNhoNhatPx));
  return tomTat.join('\n') + '\n@@JSON@@' + JSON.stringify(results);
}
