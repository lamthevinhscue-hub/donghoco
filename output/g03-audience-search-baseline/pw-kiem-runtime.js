async (page) => {
  const out = { thoiGian: new Date().toISOString(), beaconProduction: [], beaconPreview: [], blocker: [] };

  // ===== 1. Beacon Vercel Analytics trên PRODUCTION (truy cập mức xem công khai) =====
  const ctx1 = await page.context().browser().newContext({ viewport: { width: 1280, height: 900 } });
  const p1 = await ctx1.newPage();
  const req1 = [];
  p1.on('request', (r) => { if (r.url().includes('/_vercel/insights')) req1.push({ url: r.url().replace(/\?.*$/, ''), method: r.method() }); });
  await p1.goto('https://donghoco1.vercel.app/', { waitUntil: 'load' });
  await p1.waitForTimeout(5000);
  out.beaconProduction = req1;
  await ctx1.close();

  // ===== 2. Beacon trên PREVIEW cục bộ =====
  const ctx2 = await page.context().browser().newContext({ viewport: { width: 1280, height: 900 } });
  const p2 = await ctx2.newPage();
  const req2 = [];
  const resp2 = [];
  p2.on('request', (r) => { if (r.url().includes('/_vercel/insights')) req2.push({ url: r.url().replace(/\?.*$/, ''), method: r.method() }); });
  p2.on('response', (r) => { if (r.url().includes('/_vercel/insights')) resp2.push({ url: r.url().replace(/\?.*$/, ''), status: r.status() }); });
  await p2.goto('http://localhost:4321/', { waitUntil: 'load' });
  await p2.waitForTimeout(4000);
  out.beaconPreview = { requests: req2, responses: resp2 };
  await ctx2.close();

  // ===== 3. Blocker dashboard: context SẠCH không đăng nhập — chỉ ghi bề mặt =====
  const ctx3 = await page.context().browser().newContext({ viewport: { width: 1280, height: 900 } });
  const p3 = await ctx3.newPage();
  for (const [ten, url] of [
    ['Google Search Console', 'https://search.google.com/search-console'],
    ['Google Analytics', 'https://analytics.google.com/'],
    ['Vercel dashboard', 'https://vercel.com/dashboard'],
  ]) {
    try {
      await p3.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await p3.waitForTimeout(2500);
      out.blocker.push({
        beme: ten,
        urlYeuCau: url,
        urlCuoi: page_url_an_toan(p3.url()),
        tieuDeTrang: (await p3.title()).slice(0, 80),
        ghiChu: 'Context không có phiên đăng nhập — không thử đăng nhập, không dùng cookie/session có sẵn',
      });
    } catch (e) {
      out.blocker.push({ beme: ten, urlYeuCau: url, urlCuoi: '', tieuDeTrang: '', ghiChu: 'Lỗi tải: ' + String(e.message).slice(0, 80) });
    }
  }
  await ctx3.close();

  function page_url_an_toan(u) {
    // che mọi tham số truy vấn (có thể chứa token tiếp tục đăng nhập)
    return u.split('?')[0];
  }

  return '@@KETQUA@@' + JSON.stringify(out);
}
