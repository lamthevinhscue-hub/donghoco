// G07 — chẩn đoán: (a) mục ở bài Submariner; (b) Pagefind "DUW 4001" trả trang nào
async (page) => {
  const goc = 'http://localhost:4399';
  const kq = [];
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(goc + '/mau-iconic/rolex-submariner/', { waitUntil: 'load' });
  const cacMuc = await page.evaluate(() => [...document.querySelectorAll('h2')].map((h) => h.textContent.trim()));
  kq.push('submariner h2: ' + JSON.stringify(cacMuc));
  await page.goto(goc + '/', { waitUntil: 'load' });
  const pf = await page.evaluate(async () => {
    const mod = await import('/pagefind/pagefind.js');
    await mod.init();
    const k = await mod.search('DUW 4001');
    const ds = [];
    for (const r of k.results.slice(0, 5)) {
      const d = await r.data();
      ds.push(d.url + ' | ' + d.meta.title);
    }
    const k2 = await mod.search('"DUW 4001"');
    const ds2 = [];
    for (const r of k2.results.slice(0, 5)) {
      const d = await r.data();
      ds2.push(d.url);
    }
    return { thuong: ds, chinhXac: ds2 };
  });
  kq.push('pagefind thường: ' + JSON.stringify(pf.thuong));
  kq.push('pagefind chuỗi chính xác: ' + JSON.stringify(pf.chinhXac));
  return kq.join('\n');
}
