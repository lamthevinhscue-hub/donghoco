// G06-A vòng sửa 1 — Ẩn trang (MÔ PHỎNG document.hidden) + WebGL không khả dụng (MÔ PHỎNG getContext)
// Phần "rời viewport bằng captureBeyondViewport" đã TREO (blocker ghi trong biên bản) — không chạy ở đây.
async (page) => {
  const BASE = 'http://127.0.0.1:4405';
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => { K.push({ ca, dat: dat === true, chiTiet }); };
  const browser = page.context().browser();

  // ===== Ẩn trang: override document.hidden trong phiên (MÔ PHỎNG) =====
  {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
    await p.setViewportSize({ width: 900, height: 900 });
    await p.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });
    await p.waitForSelector('#tab-anatomy-3d', { timeout: 60000 });
    await p.waitForTimeout(300);
    await p.click('#tab-anatomy-3d');
    const mo = await p.waitForFunction(() => document.getElementById('three-loading')?.classList.contains('hidden'), null, { timeout: 90000 }).then(() => true).catch(() => false);
    if (!mo) { ghi('Ẩn trang (mô phỏng document.hidden)', false, '3D không mở'); }
    else {
      const cdp = await p.context().newCDPSession(p);
      await cdp.send('Page.enable');
      const hashCanvas = async () => {
        await p.evaluate(() => document.querySelector('#three-canvas-container').scrollIntoView({ block: 'center' }));
        await p.waitForTimeout(300);
        const cb = await p.evaluate(() => {
          const r = document.querySelector('#three-canvas-container canvas').getBoundingClientRect();
          return { x: r.left, y: r.top, width: r.width, height: r.height };
        });
        const shot = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: cb.x, y: cb.y, width: Math.min(cb.width, 380), height: Math.min(cb.height, 300), scale: 1 } });
        let h = 0; for (let i = 0; i < shot.data.length; i += 997) h = (h * 31 + shot.data.charCodeAt(i)) % 1000000007;
        return h;
      };
      // bật chuyển động (mô phỏng el.click) → canvas đổi khung liên tục
      await p.evaluate(() => document.getElementById('motion-toggle-3d').click());
      await p.waitForTimeout(300);
      const h0 = await hashCanvas(); await p.waitForTimeout(700); const h1 = await hashCanvas();
      const vang = h0 !== h1;
      // override hidden=true (mô phỏng ẩn trang)
      await p.evaluate(() => Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }));
      const h2 = await hashCanvas(); await p.waitForTimeout(900); const h3 = await hashCanvas();
      // gỡ override → chuyển động tiếp tục
      await p.evaluate(() => { delete document.hidden; });
      const h4 = await hashCanvas(); await p.waitForTimeout(900); const h5 = await hashCanvas();
      ghi('Ẩn trang (MÔ PHỎNG document.hidden): khi ẩn canvas đứng yên; gỡ mô phỏng → tiếp tục đổi khung',
        vang && h2 === h3 && h4 !== h5, 'đang-chạy ' + h0 + '/' + h1 + ' đổi=' + vang + '; khi ẩn ' + h2 + ' vs ' + h3 + ' đứng-yên=' + (h2 === h3) + '; gỡ ' + h4 + ' vs ' + h5 + ' đổi=' + (h4 !== h5));
    }
    await ctx.close();
  }

  // ===== WebGL không khả dụng: override getContext (MÔ PHỎNG môi trường) =====
  {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
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
    await ctx.close();
    ghi('WebGL không khả dụng (MÔ PHỎNG getContext→null): engine ném lỗi → role=alert đúng chữ + tự về 2D + nút Thử lại, không canvas',
      kq.alert === 'alert' && kq.chu && kq.canvas === false && kq.tab2d === 'true' && kq.p2d && kq.retry, JSON.stringify(kq));
  }

  return K;
}
