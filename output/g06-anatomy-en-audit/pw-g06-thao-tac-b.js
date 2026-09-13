// G06-A chặng 1 — kiểm thao tác /giai-phau/ (2D, 3D, bàn phím, RM, no-JS, lỗi engine, ẩn trang).
// MỘT biểu thức hàm cho playwright-cli run-code. Trả JSON — bắt stdout ghi tệp.
async (page) => {
  const BASE = 'http://127.0.0.1:4404';
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => { K.push({ ca, dat: dat === true, chiTiet }); };

  // ===== 6. Reduced motion: trước tải + đổi giữa phiên =====
  const ctxRM = page.context().browser();
  const pageRM = await ctxRM.newContext({ reducedMotion: 'reduce' }).then((c) => c.newPage());
  await pageRM.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await pageRM.setViewportSize({ width: 1280, height: 800 });
  await pageRM.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });
  await pageRM.waitForSelector('#toggle-explode', { timeout: 60000 });
  const tR0 = Date.now();
  await pageRM.click('#toggle-explode');
  const tR1 = await pageRM.evaluate(() => new Promise((res) => {
    const kiem = () => {
      const m = document.getElementById('mode-label')?.textContent;
      if (m === 'Đang tách (exploded)') res(performance.now());
      else setTimeout(kiem, 30);
    };
    kiem();
  }));
  const dorongRM = tR1 - tR0;
  const viTriRM = await pageRM.evaluate(() => Math.max(...[...document.querySelectorAll('.layer-group')].map((l) => parseFloat((l.getAttribute('transform') || '').match(/translate\(0, ([\d.]+)\)/)?.[1] ?? '0'))));
  await pageRM.close();
  const pageRM2 = await ctxRM.newContext().then((c) => c.newPage());
  await pageRM2.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await pageRM2.setViewportSize({ width: 1280, height: 800 });
  await pageRM2.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });
  await pageRM2.waitForSelector('#toggle-explode', { timeout: 60000 });
  await pageRM2.emulateMedia({ reducedMotion: 'reduce' });
  await pageRM2.click('#toggle-explode');
  await pageRM2.waitForTimeout(120);
  const doiGiua = await pageRM2.evaluate(() => {
    const ls = [...document.querySelectorAll('.layer-group')];
    const daDich = ls.every((l) => { const m = (l.getAttribute('transform') || '').match(/translate\(0, ([\d.]+)\)/); return m && parseFloat(m[1]) >= 90; });
    return { daDich, mode: document.getElementById('mode-label')?.textContent };
  });
  await pageRM2.close();
  ghi('Reduced motion trước tải: tách là tức thì (≤120ms), lớp tới đích',
    dorongRM <= 120 && viTriRM >= 900, `độ trễ=${Math.round(dorongRM)}ms, maxY=${viTriRM}`);
  ghi('Reduced motion đổi giữa phiên: lần tách kế tiếp áp dụng ngay (không stagger)',
    doiGiua.daDich && doiGiua.mode === 'Đang tách (exploded)', JSON.stringify(doiGiua));

  // ===== 7. No-JS =====
  const ctxNJ = await ctxRM.newContext({ javaScriptEnabled: false });
  const pageNJ = await ctxNJ.newPage();
  await pageNJ.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await pageNJ.setViewportSize({ width: 1280, height: 800 });
  await pageNJ.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });
  await pageNJ.waitForSelector('#exploded-svg', { timeout: 60000 });
  const nojs = await pageNJ.evaluate(() => ({
    svgHien: !!document.getElementById('exploded-svg') && document.getElementById('exploded-svg').getBoundingClientRect().height > 100,
    p3dHidden: document.getElementById('view-3d-wrapper')?.hidden,
    card: document.getElementById('detail-name-vi')?.textContent,
    nhanTach: document.getElementById('toggle-label')?.textContent,
  }));
  await pageNJ.click('#tab-anatomy-3d').catch(() => {});
  await pageNJ.waitForTimeout(300);
  const nojsTab = await pageNJ.evaluate(() => ({
    p3dVanHidden: document.getElementById('view-3d-wrapper')?.hidden,
    canvas: !!document.querySelector('#three-canvas-container canvas'),
  }));
  await pageNJ.close(); await ctxNJ.close();
  ghi('No-JS: sơ đồ 2D + thẻ mặc định đọc được; tab 3D không mở (panel vẫn ẩn, không canvas)',
    nojs.svgHien && nojs.p3dHidden === true && nojs.card === 'Chọn một bộ phận' && nojsTab.p3dVanHidden === true && nojsTab.canvas === false,
    JSON.stringify({ ...nojs, ...nojsTab }));

  // ===== 8. Lỗi tải engine (cô lập: chặn chunk exploded3d) =====
  const ctxErr = await ctxRM.newContext();
  const pageErr = await ctxErr.newPage();
  await pageErr.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await pageErr.setViewportSize({ width: 1280, height: 800 });
  await pageErr.route(/exploded3d[^/]*\.js/, (r) => r.abort());
  await pageErr.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });
  await pageErr.waitForSelector('#tab-anatomy-2d', { timeout: 60000 });
  await pageErr.click('#tab-anatomy-3d');
  await pageErr.waitForSelector('#anatomy-3d-error:not(.hidden)', { timeout: 15000 });
  const loi = await pageErr.evaluate(() => ({
    alert: document.getElementById('anatomy-3d-error')?.getAttribute('role'),
    chu: document.getElementById('anatomy-3d-error')?.textContent?.includes('Không mở được mô hình 3D'),
    tab2dSel: document.getElementById('tab-anatomy-2d')?.getAttribute('aria-selected'),
    p2dHien: document.getElementById('view-2d-wrapper')?.hidden === false,
    retry: !!document.getElementById('anatomy-3d-retry'),
  }));
  ghi('Lỗi tải engine (chặn chunk): hộp role=alert hiện + tự về 2D + có nút Thử lại',
    loi.alert === 'alert' && loi.chu && loi.tab2dSel === 'true' && loi.p2dHien && loi.retry, JSON.stringify(loi));
  // Thử lại → reload + tự mở lại 3D → vẫn lỗi (route vẫn chặn) → hộp lại hiện
  await pageErr.click('#anatomy-3d-retry');
  await pageErr.waitForLoadState('domcontentloaded');
  await pageErr.waitForSelector('#anatomy-3d-error:not(.hidden)', { timeout: 20000 });
  const retry = await pageErr.evaluate(() => ({
    errHien: !document.getElementById('anatomy-3d-error')?.classList.contains('hidden'),
    tab2dSel: document.getElementById('tab-anatomy-2d')?.getAttribute('aria-selected'),
  }));
  // gỡ chặn → thử lại lần nữa → 3D mở thật
  await pageErr.unroute(/exploded3d[^/]*\.js/);
  await pageErr.click('#anatomy-3d-retry');
  await pageErr.waitForSelector('#three-canvas-container canvas', { timeout: 20000 });
  const retryOk = await pageErr.evaluate(() => !!document.querySelector('#three-canvas-container canvas'));
  await pageErr.close(); await ctxErr.close();
  ghi('Thử lại sau lỗi: reload → tự mở lại 3D → vẫn lỗi (module map) → gỡ chặn thì mở được',
    retry.errHien && retry.tab2dSel === 'true' && retryOk === true, JSON.stringify({ ...retry, retryOk }));

  const dat = K.filter((k) => k.dat).length;
  return { ketQua: dat === K.length ? 'DAT' : 'KHONG_DAT', tong: `${dat}/${K.length}`, ca: K };
}
