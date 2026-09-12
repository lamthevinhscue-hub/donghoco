// Cold-load sạch: context mới (cache rỗng) cho từng route — đo request/byte
// và kiểm ảnh load hoàn tất. So với nền: dist cũ có cùng bộ JS/CSS, 0 ảnh.
async (page) => {
  const BASE = 'http://localhost:4321';
  const browser = page.context().browser();
  const kq = { thoiGian: new Date().toISOString(), phap: {} };
  const routes = [
    { lang: 'vi', url: BASE + '/co-che/day-toc-banh-lac/' },
    { lang: 'en', url: BASE + '/en/mechanisms/balance-and-hairspring/' },
  ];
  for (const r of routes) {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    const reqs = [];
    p.on('response', async (resp) => {
      let bytes = null;
      try { bytes = (await resp.body()).length; } catch {}
      reqs.push({ url: resp.url(), status: resp.status(), type: resp.request().resourceType(), bytes });
    });
    await p.setViewportSize({ width: 1280, height: 900 });
    await p.goto(r.url, { waitUntil: 'networkidle' });
    const img = await p.evaluate(() => {
      const i = document.querySelector('[data-bhc-root] img');
      return i ? { complete: i.complete, w: i.naturalWidth, h: i.naturalHeight } : null;
    });
    const local = reqs.filter((x) => x.url.startsWith(BASE));
    kq.phap[r.lang] = {
      soRequestLocal: local.length,
      tongByteLocal: local.reduce((s, x) => s + (x.bytes || 0), 0),
      chiTiet: local,
      anh: img,
      soRequestTatCa: reqs.length,
    };
    await ctx.close();
  }
  return kq;
}
