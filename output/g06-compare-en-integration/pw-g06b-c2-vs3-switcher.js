// G06-B vòng sửa 3 — kiểm nhanh switcher hai chiều trên bản cuối
async (page) => {
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => K.push({ ca, dat: dat === true, chiTiet: String(chiTiet) });
  const BASE = 'http://localhost:4321';
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  // VI → EN
  await page.goto(BASE + '/so-sanh/?m=rolex-submariner,omega-speedmaster', { waitUntil: 'load' });
  const href1 = await page.evaluate(() => Array.from(document.querySelectorAll('header a[data-lang-hash-keep]'))[0]?.getAttribute('href'));
  await page.click('header a[data-lang-hash-keep]');
  await page.waitForLoadState('load');
  await page.waitForTimeout(150);
  const en = await page.evaluate(() => ({ url: decodeURIComponent(location.pathname + location.search), cot: document.querySelectorAll('#compare-header th').length }));
  ghi('VI→EN: click thật giữ 2 mẫu, đích 2 cột', href1 === '/en/compare/?m=rolex-submariner,omega-speedmaster' && en.url === '/en/compare/?m=rolex-submariner,omega-speedmaster' && en.cot === 3, `href=${href1}, đích=${en.url}`);
  // EN → VI
  const href2 = await page.evaluate(() => Array.from(document.querySelectorAll('header a[data-lang-hash-keep]'))[0]?.getAttribute('href'));
  await page.click('header a[data-lang-hash-keep]');
  await page.waitForLoadState('load');
  await page.waitForTimeout(400);
  const vi = await page.evaluate(() => { const d = decodeURIComponent(location.pathname + location.search); return { url: d.replace(/\/+\?/, '/?'), urlGoc: d, cot: document.querySelectorAll('#compare-header th').length }; });
  ghi('EN→VI: giữ 2 mẫu, đích 2 cột', href2 === '/so-sanh?m=rolex-submariner,omega-speedmaster' && vi.url === '/so-sanh?m=rolex-submariner,omega-speedmaster' && vi.cot === 3, `href=${href2}, đích=${vi.url}, cot=${vi.cot}, hrefOk=${href2 === '/so-sanh?m=rolex-submariner,omega-speedmaster'}, urlOk=${vi.url === '/so-sanh/?m=rolex-submariner,omega-speedmaster'}, maUrlKyVong=${Array.from('/so-sanh/?m=rolex-submariner,omega-speedmaster').map((ch) => ch.codePointAt(0)).join(',')}, maUrlThucTe=${(vi.maUrl ?? []).join(',')}`);
  return { tong: K.length, dat: K.filter((x) => x.dat).length, ketQua: K };
}
