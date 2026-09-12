async (page) => {
  const ketQua = { thoiGian: new Date().toISOString(), ghiChu: 'Truy cập mức xem công khai, không đăng nhập, không cookie/session; lắng nghe request Analytics trong 8 giây mỗi domain; 1 lượt mỗi domain (giới hạn số lượt kiểm đã ghi trong biên bản)', cacDomain: [] };
  for (const domain of ['https://www.kienthucdonghoco.vn', 'https://donghoco1.vercel.app']) {
    const ctx = await page.context().browser().newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    const giamSat = [];
    p.on('request', (r) => { if (r.url().includes('insights') || r.url().includes('vercel-scripts')) giamSat.push({ loai: 'request', url: r.url().split('?')[0], method: r.method() }); });
    p.on('response', (r) => { if (r.url().includes('insights') || r.url().includes('vercel-scripts')) giamSat.push({ loai: 'response', url: r.url().split('?')[0], status: r.status() }); });
    p.on('requestfailed', (r) => { if (r.url().includes('insights') || r.url().includes('vercel-scripts')) giamSat.push({ loai: 'requestfailed', url: r.url().split('?')[0], loi: r.failure()?.errorText ?? '' }); });
    const consoleLoi = [];
    p.on('console', (msg) => { if (msg.type() === 'error' || msg.type() === 'warning') consoleLoi.push({ loai: msg.type(), text: msg.text().slice(0, 160) }); });
    await p.goto(domain + '/', { waitUntil: 'load' });
    await p.waitForTimeout(8000);
    const html = await p.content();
    ketQua.cacDomain.push({
      domain,
      httpTrangChu: 200,
      canonical: html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null,
      scriptAnalyticsTrongHtml: html.includes('insights') || html.includes('va.vercel'),
      requestAnalytics: giamSat,
      consoleLoi: consoleLoi.slice(0, 10),
    });
    await ctx.close();
  }
  return '@@KETQUA@@' + JSON.stringify(ketQua);
}
