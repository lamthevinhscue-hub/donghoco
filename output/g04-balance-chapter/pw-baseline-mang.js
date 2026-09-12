// Đo cold-load request/byte + trạng thái 2 bài trước khi tích hợp G04-B
// Chạy trên astro preview của dist nền 234fa26 (dist build 16:02 12/09/2026).
async (page) => {
  const BASE = 'http://localhost:4321';
  const routes = [
    { name: 'vi', url: BASE + '/co-che/day-toc-banh-lac/' },
    { name: 'en', url: BASE + '/en/mechanisms/balance-and-hairspring/' },
  ];
  const ketqua = { thoiGian: new Date().toISOString(), nen: '234fa26 — dist build 16:02 12/09/2026 (log nền output/g03-audience-search-baseline/log-build.txt: 286 trang, 20.622 link)', moTruong: 'astro preview cục bộ', phap: [] };

  for (const r of routes) {
    const reqs = [];
    const onReq = (req) => reqs.push({ url: req.url(), method: req.method(), type: req.resourceType() });
    const onResp = async (resp) => {
      const m = reqs.find((x) => x.url === resp.url());
      if (m) {
        m.status = resp.status();
        try { const b = await resp.body(); m.bytes = b.length; } catch { m.bytes = null; }
      }
    };
    page.on('request', onReq);
    page.on('response', onResp);
    const t0 = Date.now();
    await page.goto(r.url, { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    const loadMs = Date.now() - t0;
    page.off('request', onReq);
    page.off('response', onResp);

    const dom = await page.evaluate(() => {
      const img = [...document.querySelectorAll('img')].map((i) => ({
        src: i.getAttribute('src'),
        alt: (i.getAttribute('alt') || '').slice(0, 80),
        w: i.getAttribute('width'),
        h: i.getAttribute('height'),
        hoanTat: i.complete && i.naturalWidth > 0,
      }));
      return {
        htmlBytes: document.documentElement.outerHTML.length,
        imgs: img,
        coSvgHairspring: !!document.getElementById('hairspring-svg'),
        introBlockquote: document.body.textContent.includes('Infographic động đã có'),
        h1: document.querySelector('h1')?.textContent?.trim().slice(0, 80),
      };
    });

    ketqua.phap.push({
      route: r.name,
      url: r.url,
      loadMs,
      soRequest: reqs.length,
      tongBytes: reqs.reduce((s, x) => s + (x.bytes || 0), 0),
      requests: reqs,
      dom,
    });
  }
  return ketqua;
}
