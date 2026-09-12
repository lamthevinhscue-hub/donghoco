// Kiểm ID tài liệu + url(#), CLS, cold-load request/byte sau tích hợp,
// fallback ảnh lỗi và chế độ không có JS — cả 2 route.
async (page) => {
  const BASE = 'http://localhost:4321';
  const OUT = 'output/g04-balance-chapter/shots';
  const kq = { thoiGian: new Date().toISOString(), phap: {} };

  const routes = [
    { lang: 'vi', url: BASE + '/co-che/day-toc-banh-lac/' },
    { lang: 'en', url: BASE + '/en/mechanisms/balance-and-hairspring/' },
  ];

  // Đo cold-load: đếm request + byte (không cache: bỏ qua 304) + layout-shift
  for (const r of routes) {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.addInitScript(() => {
      window.__cls = 0;
      window.__lsLogs = [];
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (!e.hadRecentInput) {
            window.__cls += e.value;
            window.__lsLogs.push({ value: e.value, sources: (e.sources ?? []).map((s) => s.node?.nodeName ?? '?') });
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
    const reqs = [];
    const onResp = async (resp) => {
      const u = resp.url();
      if (resp.status() === 304) return;
      let bytes = null;
      try { bytes = (await resp.body()).length; } catch {}
      reqs.push({ url: u, status: resp.status(), type: resp.request().resourceType(), bytes });
    };
    page.on('response', onResp);
    await page.goto(r.url, { waitUntil: 'networkidle' });
    page.off('response', onResp);
    const cls = await page.evaluate(() => ({ cls: window.__cls, logs: window.__lsLogs }));
    const local = reqs.filter((x) => x.url.startsWith(BASE));
    kq.phap[r.lang + '-coldload'] = {
      soRequestLocal: local.length,
      tongByteLocal: local.reduce((s, x) => s + (x.bytes || 0), 0),
      requests: local,
      anh: reqs.filter((x) => x.url.includes('banh-lac-day-toc-hero')).map((x) => ({ status: x.status, bytes: x.bytes })),
      cls,
    };
    await page.evaluate(() => localStorage.clear());
  }

  // ID trùng + url(#) — trên trang VI (đại diện 1 trang đầy đủ) và EN
  for (const r of routes) {
    await page.goto(r.url, { waitUntil: 'load' });
    const ids = await page.evaluate(() => {
      const all = [...document.querySelectorAll('[id]')].map((e) => e.id);
      const seen = new Set(); const dup = new Set();
      for (const id of all) { if (seen.has(id)) dup.add(id); seen.add(id); }
      const refs = new Set();
      for (const el of document.querySelectorAll('*')) {
        for (const attr of Object.values(el.attributes ?? {})) {
          for (const m of (attr.value ?? '').matchAll(/url\(#([^)]+)\)/g)) refs.add(m[1]);
        }
      }
      return { soId: all.length, trung: [...dup], urlRefs: [...refs], refThieu: [...refs].filter((x) => !seen.has(x)) };
    });
    kq.phap[r.lang + '-id'] = ids;
  }

  // Fallback ảnh lỗi: chặn request ảnh → ảnh ẩn, khối dự phòng hiện, chú thích còn
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.route('**/banh-lac-day-toc-hero.jpg', (route) => route.abort());
  await page.goto(routes[0].url, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  const fallback = await page.evaluate(() => {
    const root = document.querySelector('[data-bhc-root]');
    const img = root.querySelector('img');
    const box = img.nextElementSibling;
    const cap = root.querySelector('figcaption');
    return {
      anhAn: getComputedStyle(img).display === 'none',
      boxHien: getComputedStyle(box).display !== 'none',
      chuThich: cap?.textContent?.trim() ?? '',
    };
  });
  await page.locator('[data-bhc-root] figure').screenshot({ path: OUT + '/fallback-anh-loi-vi.png' });
  kq.phap.fallbackAnhLoi = fallback;
  await page.unroute('**/banh-lac-day-toc-hero.jpg');

  // Không có JS: nội dung chương vẫn hiện (SVG tĩnh, legend, nút trơ)
  const ctxNoJs = await page.context().browser().newContext({ javaScriptEnabled: false });
  const pNoJs = await ctxNoJs.newPage();
  await pNoJs.setViewportSize({ width: 1280, height: 900 });
  await pNoJs.goto(routes[0].url, { waitUntil: 'load' });
  const noJs = await pNoJs.evaluate(() => {
    const root = document.querySelector('[data-bhc-root]');
    const spring = root.querySelector('[data-bhc-spring]');
    return {
      coChuong: !!root,
      coDuongXoanTinh: (spring?.getAttribute('d') ?? '').startsWith('M 336.0 215.0'),
      soLegend: root.querySelectorAll('ul li').length,
      soNut: root.querySelectorAll('button').length,
      anh: (() => { const i = root.querySelector('img'); return !!i && i.getAttribute('src').includes('banh-lac-day-toc-hero'); })(),
      h2: [...root.querySelectorAll('h2')].map((h) => h.textContent.trim()),
    };
  });
  await pNoJs.locator('[data-bhc-root]').screenshot({ path: OUT + '/khong-js-vi.png' });
  kq.phap.khongJs = noJs;
  await ctxNoJs.close();

  kq.tatDat =
    kq.phap['vi-id'].trung.length === 0 && kq.phap['en-id'].trung.length === 0 &&
    kq.phap['vi-id'].refThieu.length === 0 && kq.phap['en-id'].refThieu.length === 0 &&
    kq.phap.fallbackAnhLoi.anhAn && kq.phap.fallbackAnhLoi.boxHien && kq.phap.fallbackAnhLoi.chuThich.length > 0 &&
    kq.phap.khongJs.coDuongXoanTinh && kq.phap.khongJs.soLegend === 4;
  return kq;
}
