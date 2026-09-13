// G06-A vòng sửa 1 — WebGL không khả dụng (MÔ PHỎNG getContext→null, chạy độc lập nhanh)
async (page) => {
  const BASE = 'http://127.0.0.1:4405';
  const p = await page.context().newPage();
  await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await p.addInitScript(() => {
    const goc = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (loai, ...a) {
      if (/webgl/.test(String(loai))) return null;
      return goc.apply(this, [loai, ...a]);
    };
  });
  await p.setViewportSize({ width: 1280, height: 800 });
  await p.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });
  await p.waitForSelector('#tab-anatomy-2d', { timeout: 60000 });
  await p.waitForTimeout(300);
  await p.click('#tab-anatomy-3d');
  await p.waitForSelector('#anatomy-3d-error:not(.hidden)', { timeout: 20000 });
  const kq = await p.evaluate(() => ({
    alert: document.getElementById('anatomy-3d-error')?.getAttribute('role'),
    chu: (document.getElementById('anatomy-3d-error')?.textContent || '').includes('Không mở được mô hình 3D'),
    canvas: !!document.querySelector('#three-canvas-container canvas'),
    tab2d: document.getElementById('tab-anatomy-2d')?.getAttribute('aria-selected'),
    p2d: document.getElementById('view-2d-wrapper')?.hidden === false,
    retry: !!document.getElementById('anatomy-3d-retry'),
  }));
  await p.context().close();
  return { kq };
}
