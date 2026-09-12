async (page) => {
  const BASE = 'http://localhost:4321';
  const out = [];
  const ghi = (ten, dat, chiTiet) => out.push({ ten, dat: dat === true, chiTiet: String(chiTiet ?? '') });

  // ===== Bổ sung 1: Desktop dropdown — Tab đi qua links rồi rời menu tự nhiên (không trap) =====
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  const kienBtn = page.locator('.nav-dropdown').nth(0).locator('[data-dropdown-toggle]');
  await kienBtn.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(250);
  // Menu có 4 link: Tab 3 lần → link cuối; Tab lần 4 → rời dropdown → menu tự đóng
  for (let i = 0; i < 3; i += 1) await page.keyboard.press('Tab');
  const focusCuoi = await page.evaluate(() => document.activeElement?.getAttribute('href') ?? '');
  await page.keyboard.press('Tab');
  await page.waitForTimeout(250);
  const st1 = await page.evaluate(() => {
    const dd0 = document.querySelectorAll('.nav-dropdown')[0];
    const btn = dd0.querySelector('[data-dropdown-toggle]');
    const focusRoiKhoiMenu0 = !dd0.contains(document.activeElement);
    return { expanded: btn.getAttribute('aria-expanded'), focusRoiKhoiMenu0 };
  });
  ghi('Desktop dropdown: Tab hết 4 link → rời menu tự đóng, focus không mắc kẹt', st1.expanded === 'false' && st1.focusRoiKhoiMenu0, `linkCuoi=${focusCuoi} ` + JSON.stringify(st1));

  // ===== Bổ sung 2: Mobile menu — mở bằng Enter (bàn phím), Escape đóng + focus về hamburger =====
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.locator('#menu-toggle').focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(150);
  const menuMo = await page.evaluate(() => !document.getElementById('mobile-menu').classList.contains('hidden'));
  const focusTrongMenu = await page.evaluate(() => !!document.activeElement?.closest('#mobile-menu'));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  const menuDong = await page.evaluate(() => document.getElementById('mobile-menu').classList.contains('hidden'));
  const focusTrenHamburger = await page.evaluate(() => document.activeElement?.id === 'menu-toggle');
  ghi('Mobile menu: Enter mở (focus vào menu), Escape đóng + focus về hamburger', menuMo && focusTrongMenu && menuDong && focusTrenHamburger, `mo=${menuMo} focusTrong=${focusTrongMenu} dong=${menuDong} focusHamburger=${focusTrenHamburger}`);

  // ===== Bổ sung 3: Panel chưa dịch — Tab xoay vòng giữa 2 điều khiển =====
  await page.goto(BASE + '/lich-su', { waitUntil: 'load' });
  await page.locator('header div.flex.shrink-0 > a').first().click();
  const panel = page.locator('#lang-panel');
  const panelMo = await panel.isVisible();
  const focusDau = await page.evaluate(() => document.activeElement?.id ?? '');
  await page.keyboard.press('Tab'); // stay → go
  const focusGiua = await page.evaluate(() => document.activeElement?.id ?? '');
  await page.keyboard.press('Tab'); // go → xoay về stay
  const focusXoay = await page.evaluate(() => document.activeElement?.id ?? '');
  await page.keyboard.press('Escape');
  ghi('Panel: Tab xoay vòng stay↔go, focus vào "Ở lại" khi mở, Escape đóng', panelMo && focusDau === 'lang-panel-stay' && focusGiua === 'lang-panel-go' && focusXoay === 'lang-panel-stay', `mo=${panelMo} dau=${focusDau} giua=${focusGiua} xoay=${focusXoay}`);

  const dat = out.filter((o) => o.dat).length;
  return 'BAN_PHIM BS TONG=' + out.length + ' DAT=' + dat + '\n' + out.map((o) => (o.dat ? 'DAT  ' : 'KHONG_DAT ') + o.ten + ' | ' + o.chiTiet).join('\n') + '\n@@JSON@@' + JSON.stringify(out);
}
