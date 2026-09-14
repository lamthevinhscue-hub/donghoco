// G06-B chặng 1 — khai thác vì sao wrap không cuộn dù bảng 640px
async (page) => {
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('http://localhost:4321/so-sanh/?m=rolex-submariner,omega-speedmaster,cartier-tank', { waitUntil: 'load' });
  await page.waitForTimeout(200);
  return await page.evaluate(() => {
    const wrap = document.getElementById('compare-table-wrap');
    const bang = wrap.querySelector('table');
    const cs = getComputedStyle(wrap);
    // dòng cha tới body — ai đặt overflow?
    const day = [];
    let el = wrap;
    while (el && el !== document.body) {
      const s = getComputedStyle(el);
      day.push({ the: el.tagName + (el.id ? '#' + el.id : ''), display: s.display, overflowX: s.overflowX, width: s.width, maxWidth: s.maxWidth });
      el = el.parentElement;
    }
    return {
      wrapDisplay: cs.display,
      wrapOverflow: cs.overflowX + '/' + cs.overflowY,
      tableDisplay: getComputedStyle(bang).display,
      tableParent: bang.parentElement.id,
      scrollWidthSauReflow: (wrap.getBoundingClientRect(), wrap.scrollWidth),
      dayCha: day,
    };
  });
}
