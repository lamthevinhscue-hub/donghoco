async (page) => {
  const BASE = 'http://127.0.0.1:4405';
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => { K.push({ ca, dat: dat === true, chiTiet }); };
  const them = (ca, chiTiet) => { K.push({ ca, trangThai: 'CHUA_KIEM', chiTiet }); };
  const browser = page.context().browser();
  const pGiu = await browser.newContext().then((c) => c.newPage());
  // đồng hồ bảo hiểm toàn phiên: treo quá 4 phút vẫn trả kết quả phần đã chạy
  const baoCao = await Promise.race([
    (async () => {
  // ===== A) Bàn phím EN =====
  {
    const p = await browser.newContext().then((c) => c.newPage());
    await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
    await p.setViewportSize({ width: 1280, height: 800 });
    await p.goto(BASE + '/en/anatomy/', { waitUntil: 'commit', timeout: 60000 });
    await p.waitForSelector('#tab-anatomy-2d', { timeout: 60000 });
    await p.waitForTimeout(400);
    try {
      await p.focus('#tab-anatomy-2d');
      await p.keyboard.press('End');
      const kb1 = await p.evaluate(() => ({ sel: document.getElementById('tab-anatomy-3d')?.getAttribute('aria-selected'), focus: document.activeElement?.id }));
      await p.keyboard.press('Home');
      const kb2 = await p.evaluate(() => ({ sel: document.getElementById('tab-anatomy-2d')?.getAttribute('aria-selected'), focus: document.activeElement?.id }));
      ghi('Bàn phím EN tablist: End → tab 3D selected+focus; Home → tab 2D', kb1.sel === 'true' && kb1.focus === 'tab-anatomy-3d' && kb2.sel === 'true' && kb2.focus === 'tab-anatomy-2d', JSON.stringify({ kb1, kb2 }));

      // Enter chọn bộ phận qua danh sách (bàn phím thật)
      await p.focus('.part-quick[data-part-id="escapement"]');
      await p.keyboard.press('Enter');
      const kb3 = await p.evaluate(() => ({
        vi: document.getElementById('detail-name-vi')?.textContent,
        link: document.getElementById('detail-link')?.getAttribute('href'),
        pressed: document.querySelector('.part-quick[data-part-id="escapement"]')?.getAttribute('aria-pressed'),
      }));
      // Space chọn bộ phận khác (bàn phím thật)
      await p.focus('.part-quick[data-part-id="gear-train"]');
      await p.keyboard.press(' ');
      const kb4 = await p.evaluate(() => ({
        vi: document.getElementById('detail-name-vi')?.textContent,
        pressed: document.querySelector('.part-quick[data-part-id="gear-train"]')?.getAttribute('aria-pressed'),
      }));
      ghi('Bàn phím EN danh sách: Enter chọn Escapement (link /en/mechanisms/escapement/); Space chọn Gear train',
        kb3.vi === 'Escapement' && kb3.link === '/en/mechanisms/escapement/' && kb3.pressed === 'true' && kb4.vi === 'Gear train' && kb4.pressed === 'true',
        JSON.stringify({ kb3, kb4 }));

      // Escape bỏ chọn
      await p.keyboard.press('Escape');
      const esc = await p.evaluate(() => document.getElementById('detail-name-vi')?.textContent);
      // Reset qua bàn phím: focus + Enter
      await p.focus('#reset-view');
      await p.keyboard.press('Enter');
      const rst = await p.evaluate(() => document.getElementById('mode-label')?.textContent);
      ghi('Bàn phím EN: Escape trên 2D không đổi chọn (chỉ đóng tooltip — thiết kế); reset qua phím → Assembled', esc === 'Gear train' && rst === 'Assembled', 'esc="' + esc + '", mode="' + rst + '"');
    } catch (e) { them('Bàn phím EN', 'lỗi: ' + String(e).slice(0, 140)); }
    await p.context().close();
  }


  return { ketQua: 'CHAY-XONG', ca: K };

    })(),
    pGiu.waitForTimeout(240000).then(() => ({ ketQua: 'TREO', tong: 'quá 4 phút', ca: K.concat([{ ca: 'TREO-PHIEN', chiTiet: 'phiên quá 4 phút — các ca sau chưa chạy' }]) })),
  ]);
  return baoCao;
}
