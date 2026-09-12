// Đo lại lượt SAU sau vòng sửa màu TXN-20260912-25 (HTML đổi do thêm thuộc
// tính stroke halo; CSS/JS/ảnh không đổi). Cùng phương pháp với
// pw-do-mang-truoc-sau.js: context mới cache rỗng, viewport 1280×900, networkidle.
async (page) => {
  const browser = page.context().browser();
  const BASE = 'http://localhost:4321';
  const routes = [
    { lang: 'vi', path: '/co-che/day-toc-banh-lac/' },
    { lang: 'en', path: '/en/mechanisms/balance-and-hairspring/' },
  ];
  const kq = { thoiGian: new Date().toISOString(), ghiChu: 'đo lại lượt SAU sau vòng sửa màu; cùng phương pháp pw-do-mang-truoc-sau.js', phap: [] };
  for (const r of routes) {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    const reqs = [];
    p.on('response', async (resp) => {
      let bodyBytes = null;
      let layDuoc = false;
      try { bodyBytes = (await resp.body()).length; layDuoc = true; } catch {}
      reqs.push({ url: resp.url(), status: resp.status(), type: resp.request().resourceType(), bodyBytes, byteLayDuoc: layDuoc, ngoai: !resp.url().startsWith(BASE) });
    });
    await p.setViewportSize({ width: 1280, height: 900 });
    await p.goto(BASE + r.path, { waitUntil: 'networkidle' });
    await ctx.close();
    const local = reqs.filter((x) => !x.ngoai);
    const theoLoai = {};
    for (const x of local) {
      const t = x.type;
      theoLoai[t] = (theoLoai[t] ?? 0) + (x.bodyBytes ?? 0);
    }
    kq.phap.push({
      pha: 'sau-loi-mau', route: r.lang,
      soRequestLocal: local.length,
      tongByteLocal: local.reduce((s, x) => s + (x.bodyBytes ?? 0), 0),
      theoLoai,
      chiTiet: local,
    });
  }
  return kq;
}
