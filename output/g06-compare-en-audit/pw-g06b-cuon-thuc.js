// G06-B chặng 1 — thử cuộn thật của wrap bảng ở 320px (scrollLeft + rect)
async (page) => {
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('http://localhost:4321/so-sanh/?m=rolex-submariner,omega-speedmaster,cartier-tank', { waitUntil: 'load' });
  await page.waitForTimeout(200);
  return await page.evaluate(() => {
    const wrap = document.getElementById('compare-table-wrap');
    const bang = wrap.querySelector('table');
    const rWrap = wrap.getBoundingClientRect();
    const rBang = bang.getBoundingClientRect();
    const truoc = wrap.scrollLeft;
    wrap.scrollLeft = 99999;
    const sau = wrap.scrollLeft;
    wrap.scrollLeft = 0;
    return {
      rectWrap: { w: Math.round(rWrap.width), x: Math.round(rWrap.x) },
      rectBang: { w: Math.round(rBang.width), x: Math.round(rBang.x) },
      scrollTruoc: truoc,
      scrollMaxSau: sau,
      cuonDuoc: sau > 10,
      wrapScrollWidth: wrap.scrollWidth,
      wrapClientWidth: wrap.clientWidth,
      kieuChay: getComputedStyle(wrap).overflowX,
    };
  });
}
