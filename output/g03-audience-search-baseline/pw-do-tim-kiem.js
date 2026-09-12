async (page) => {
  const BASE = 'http://localhost:4321';
  const VP = { width: 1280, height: 900 };
  const results = { thoiGian: new Date().toISOString(), moiTruong: 'astro preview cục bộ, dist build nền 02309e6', viewport: VP, phap: [] };

  async function doPhim(lang, truyVan) {
    const url = lang === 'vi' ? BASE + '/' : BASE + '/en/';
    await page.setViewportSize(VP);
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(400);
    const phap = { lang, truyVan, url, thoiGian: new Date().toISOString() };
    // Lượt "tải đầu": Pagefind index chưa nạp trong phiên trang (trang vừa reload;
    // cache HTTP trình duyệt đang bật — bundle JS/css có thể phục vụ từ cache đĩa)
    const lanh = await page.evaluate((q) => {
      return new Promise((resolve) => {
        const input = document.querySelector('[data-inline-search] input[role="combobox"]');
        if (!input) { resolve({ ms: -2, soKetQua: 0, loi: 'không thấy ô nhập' }); return; }
        const listbox = document.getElementById(input.getAttribute('aria-controls'));
        input.focus();
        const t0 = performance.now();
        input.value = q;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        const obs = new MutationObserver(() => {
          if (!listbox.classList.contains('hidden') && listbox.querySelectorAll('a').length >= 1) {
            obs.disconnect();
            resolve({ ms: Math.round(performance.now() - t0), soKetQua: listbox.querySelectorAll('a').length });
          }
        });
        obs.observe(listbox, { attributes: true, childList: true, subtree: true });
        setTimeout(() => { obs.disconnect(); resolve({ ms: Math.round(performance.now() - t0), soKetQua: listbox.querySelectorAll('a').length, hetHan: true }); }, 20000);
      });
    }, truyVan);
    phap.lanTaiDau = lanh;
    // Hai lượt "tiếp theo" (Pagefind index đã nạp trong cùng phiên)
    for (let i = 1; i <= 2; i += 1) {
      await page.waitForTimeout(300);
      const warm = await page.evaluate((q) => {
        return new Promise((resolve) => {
          const input = document.querySelector('[data-inline-search] input[role="combobox"]');
          const listbox = document.getElementById(input.getAttribute('aria-controls'));
          input.value = '';
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.focus();
          const t0 = performance.now();
          input.value = q;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          const obs = new MutationObserver(() => {
            if (!listbox.classList.contains('hidden') && listbox.querySelectorAll('a').length >= 1) {
              obs.disconnect();
              resolve({ ms: Math.round(performance.now() - t0), soKetQua: listbox.querySelectorAll('a').length });
            }
          });
          obs.observe(listbox, { attributes: true, childList: true, subtree: true });
          setTimeout(() => { obs.disconnect(); resolve({ ms: Math.round(performance.now() - t0), soKetQua: listbox.querySelectorAll('a').length, hetHan: true }); }, 20000);
        });
      }, truyVan);
      phap['lanTiep' + i] = warm;
    }
    results.phap.push(phap);
  }

  await doPhim('vi', 'bộ thoát');
  await doPhim('en', 'escapement');

  return '@@KETQUA@@' + JSON.stringify(results);
}
