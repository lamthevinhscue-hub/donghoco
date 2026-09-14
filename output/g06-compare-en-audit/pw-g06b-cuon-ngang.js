// G06-B chặng 1 — chẩn đoán cuộn ngang bảng ở 320px (đo sau khi bảng hiển thị)
async (page) => {
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('http://localhost:4321/so-sanh/?m=rolex-submariner,omega-speedmaster,cartier-tank', { waitUntil: 'load' });
  await page.waitForTimeout(200);
  return await page.evaluate(() => {
    const wrap = document.getElementById('compare-table-wrap');
    const bang = wrap?.querySelector('table');
    const cs = bang ? getComputedStyle(bang) : null;
    return {
      wrapClass: wrap?.className,
      wrapHidden: wrap?.classList.contains('hidden'),
      wrapClient: wrap?.clientWidth,
      wrapScroll: wrap?.scrollWidth,
      bangMinWidth: cs?.minWidth,
      bangWidth: cs?.width,
      bangOffset: bang?.offsetWidth,
      trangTran: document.scrollingElement.scrollWidth - window.innerWidth,
    };
  });
}
