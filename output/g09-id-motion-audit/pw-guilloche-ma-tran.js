// G09-B chặng 1 — ma trận DOM thật cho ID "guilloche" trên các trang nhiều instance + đối chứng
async (page) => {
  const goc = 'http://localhost:4399';
  const TRANG = [
    ['lich-su', '/lich-su/'],
    ['en-history', '/en/history/'],
    ['brand-ap', '/thuong-hieu/audemars-piguet/'],
    ['brand-patek', '/thuong-hieu/patek-philippe/'],
    ['brand-rolex', '/thuong-hieu/rolex/'],
    ['doi-chung-1-instance', '/thuong-hieu/breguet/'],
  ];
  const kq = [];
  for (const [ten, url] of TRANG) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(goc + url, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    const d = await page.evaluate(() => {
      const cacId = [...document.querySelectorAll('#guilloche')];
      const cacRef = [...document.querySelectorAll('[fill="url(#guilloche)"]')];
      const anh = [...document.querySelectorAll('figure.watch-image')];
      const first = document.getElementById('guilloche');
      const viTriTrongAnh = (el) => {
        const fig = el.closest('figure.watch-image');
        return fig ? anh.indexOf(fig) : -1;
      };
      return {
        soId: cacId.length,
        soRef: cacRef.length,
        soWatchImage: anh.length,
        getElementById_la: first ? ('instance_thu_' + cacId.indexOf(first) + ' (WatchImage thứ ' + (viTriTrongAnh(first) + 1) + ')') : null,
        thuTuDom: cacId.map((el) => viTriTrongAnh(el) + 1),
        refThuocAnh: cacRef.map((el) => viTriTrongAnh(el) + 1),
      };
    });
    kq.push(ten + ' [' + url + '] ' + JSON.stringify(d));
  }
  return 'MA TRẬN GUILLOCHE (DOM thật):\n' + kq.join('\n');
}
