// Ma trận chương G04-B: 2 route × 320/768/1440 × sáng/tối
// Theme đặt bằng localStorage (cách website lưu lựa chọn), đọc lại từ DOM (html.dark).
async (page) => {
  const BASE = 'http://localhost:4321';
  const OUT = 'output/g04-balance-chapter/shots';
  const routes = [
    { lang: 'vi', url: BASE + '/co-che/day-toc-banh-lac/' },
    { lang: 'en', url: BASE + '/en/mechanisms/balance-and-hairspring/' },
  ];
  const viewports = [320, 768, 1440];
  const themes = ['sang', 'toi'];
  const records = [];

  for (const r of routes) {
    for (const w of viewports) {
      for (const th of themes) {
        await page.setViewportSize({ width: w, height: 900 });
        await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
        await page.evaluate((t) => localStorage.setItem('theme', t === 'toi' ? 'dark' : 'light'), th);
        await page.goto(r.url, { waitUntil: 'load' });
        await page.waitForTimeout(900);
        const dom = await page.evaluate(() => {
          const root = document.querySelector('[data-bhc-root]');
          const de = document.documentElement;
          const svg = root?.querySelector('svg.bhc-svg');
          const lb = svg?.querySelector('.bhc-lb');
          const img = root?.querySelector('img');
          const status = root?.querySelector('[data-bhc-status]')?.textContent ?? '';
          const rootRect = root?.getBoundingClientRect();
          // kéo chương vào giữa màn để chụp (tránh sticky header đè mép trên)
          const y = rootRect ? window.scrollY + rootRect.top - 76 : 0;
          window.scrollTo(0, y);
          return {
            dark: de.classList.contains('dark'),
            trànNgang: de.scrollWidth > de.clientWidth,
            scrollWidth: de.scrollWidth,
            clientWidth: de.clientWidth,
            coChuong: !!root,
            svgLabels: lb ? getComputedStyle(lb).display : 'không-thấy-svg',
            imgOk: img ? img.complete && img.naturalWidth > 0 : false,
            imgKichThuoc: img ? img.naturalWidth + 'x' + img.naturalHeight : '',
            status,
          };
        });
        await page.waitForTimeout(250);
        const shot = `${OUT}/${r.lang}-${w}-${th}.png`;
        await page.locator('[data-bhc-root]').screenshot({ path: shot });
        records.push({
          route: r.lang, viewport: w, theme: th, url: page.url(),
          thoiGian: new Date().toISOString(), shot, ...dom,
        });
      }
    }
  }
  const tatDat = records.every((x) => x.coChuong && !x.trànNgang && x.imgOk && x.dark === (x.theme === 'toi') && x.status.length > 0);
  return { thoiGian: new Date().toISOString(), soO: records.length, tatDat, records };
}
