// G05-B — Ma trận bố cục 20 tổ hợp + 8 ảnh đại diện (run-code: một biểu thức hàm)
async (page) => {
const PORT = 4399;
const outDir = 'output/g05-history-journey/shots';
const VIEWPORTS = [[320, 700], [375, 812], [768, 1024], [1024, 768], [1440, 900]];
const ROUTES = [['lich-su', '/lich-su/'], ['history', '/en/history/']];
const ketQua = [];
  for (const [routeKey, path] of ROUTES) {
    for (const [vw, vh] of VIEWPORTS) {
      for (const theme of ['light', 'dark']) {
        await page.setViewportSize({ width: vw, height: vh });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
        await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' });
        const dom = await page.evaluate(() => ({
          lang: document.documentElement.lang,
          theme: document.documentElement.classList.contains('dark') ? 'toi' : 'sang',
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          cards: document.querySelectorAll('.milestone-card').length,
          chuong: document.querySelectorAll('.chuong-section').length,
          navChapter: document.querySelectorAll('a[data-chapter-link]').length,
        }));
        await page.evaluate(() => { const el = document.querySelector('#chuong-c3'); if (el) el.scrollIntoView(); });
        await page.waitForTimeout(250);
        const jump = await page.evaluate(() => {
          const r = document.querySelector('#chuong-c3-title').getBoundingClientRect();
          const hr = document.querySelector('header').getBoundingClientRect();
          return { top: Math.round(r.top), headerBottom: Math.round(hr.bottom), thay: r.top >= hr.bottom - 2 };
        });
        const shot = `${outDir}/boc-cuc-${routeKey}-${vw}-${theme}.png`;
        await page.screenshot({ path: shot });
        ketQua.push({
          toHop: `${routeKey} ${vw}x${vh} ${theme}`, ...dom, jump, shot,
          dat: dom.cards === 28 && dom.chuong === 6 && dom.lang === (routeKey === 'history' ? 'en' : 'vi')
            && dom.theme === (theme === 'light' ? 'sang' : 'toi') && !dom.overflow && dom.navChapter === 6 && jump.thay,
        });
      }
    }
  }

  // 8 ảnh đại diện vùng chương/thẻ: VI/EN × 320/1440 × sáng/tối (đúng vùng, tránh header)
  for (const [routeKey, path] of ROUTES) {
    for (const [vw, vh] of [[320, 700], [1440, 900]]) {
      for (const theme of ['light', 'dark']) {
        await page.setViewportSize({ width: vw, height: vh });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
        await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' });
        await page.evaluate(() => { document.querySelector('#chuong-c1').scrollIntoView(); });
        await page.waitForTimeout(200);
        const clip = await page.evaluate(() => {
          const sec = document.querySelector('#chuong-c1');
          const card = sec.querySelector('.milestone-card');
          const r = sec.getBoundingClientRect();
          const cr = card.getBoundingClientRect();
          return { y: Math.max(0, Math.round(r.top)), h: Math.max(300, Math.min(560, Math.round(cr.bottom - r.top + 40))) };
        });
        await page.screenshot({
          path: `${outDir}/dai-dien-${routeKey}-${vw}-${theme}.png`,
          clip: { x: 0, y: clip.y, width: vw, height: clip.h },
        });
      }
    }
  }
  return { tong: ketQua.length, dat: ketQua.filter((k) => k.dat).length, chiTiet: ketQua };

}
