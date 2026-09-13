async (page) => {
  const ctx = await page.context().browser().newContext({ javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.setViewportSize({ width: 1280, height: 900 });
  // đầu timeline: goto gốc — đầu trang chính là mốc 0 (đợi ảnh nạp)
  await p.goto('http://localhost:4399/lich-su/', { waitUntil: 'load' });
  await p.waitForTimeout(2500);
  const dau = await p.evaluate(() => {
    const c = document.querySelector('#milestone-0');
    const img = c.querySelector('img');
    return {
      opacity: getComputedStyle(c).opacity,
      anhHien: img ? img.getBoundingClientRect().height > 20 && img.naturalWidth > 0 : false,
      chu: c.innerText.includes('Peter Henlein'),
      nguon: c.querySelectorAll('a[rel="noopener noreferrer"]').length,
    };
  });
  await p.screenshot({ path: 'output/g05-history-journey/shots/nojs-dau-lich-su.png' });
  // cuối timeline: goto thẳng anchor #milestone-27 (trình duyệt neo, hoạt động no-JS)
  await p.goto('http://localhost:4399/lich-su/#milestone-27', { waitUntil: 'load' });
  await p.waitForTimeout(2500);
  const cuoi = await p.evaluate(() => {
    const c = document.querySelector('#milestone-27');
    const r = c.getBoundingClientRect();
    const img = c.querySelector('img');
    return {
      opacity: getComputedStyle(c).opacity,
      top: Math.round(r.top),
      trongVung: r.top > -50 && r.top < 900,
      chu: c.innerText.includes('Silicon'),
      nguon: c.querySelectorAll('a[rel="noopener noreferrer"]').length,
      anhHien: img ? img.getBoundingClientRect().height > 20 && img.naturalWidth > 0 : false,
    };
  });
  await p.screenshot({ path: 'output/g05-history-journey/shots/nojs-cuoi-lich-su.png' });
  await ctx.close();
  return { dau, cuoi };
}
