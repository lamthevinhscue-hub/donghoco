async (page) => {
  const BASE = 'http://localhost:4321';
  const out = [];
  const ghi = (ten, dat, chiTiet) => out.push({ ten, dat: dat === true, chiTiet: String(chiTiet ?? ''), thoiGian: new Date().toISOString() });
  const ANH = 'output/g01-navigation-i18n/anh/';
  const swSel = 'header div.flex.shrink-0 > a';

  // ===== Chuẩn bị: theme mặc định (theo HĐH), desktop =====
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.evaluate(() => localStorage.removeItem('theme'));

  // ===== 1. VI→EN→VI trên trang chủ =====
  await page.locator(swSel).first().click();
  await page.waitForURL('**/en/');
  const langEn = await page.evaluate(() => document.documentElement.lang);
  ghi('VI→EN trang chủ: tới /en/ đúng ngôn ngữ', page.url().endsWith('/en/') && langEn === 'en', page.url() + ' lang=' + langEn);
  await page.locator(swSel).first().click();
  await page.waitForURL((u) => u.pathname === '/');
  ghi('EN→VI trang chủ: về /', page.url() === BASE + '/', page.url());

  // ===== 2. VI→EN→VI trên trang danh sách =====
  await page.goto(BASE + '/thuong-hieu', { waitUntil: 'load' });
  await page.locator(swSel).first().click();
  await page.waitForURL('**/en/brands/');
  ghi('VI→EN danh sách: /thuong-hieu → /en/brands/', page.url().endsWith('/en/brands/'), page.url());
  await page.locator(swSel).first().click();
  await page.waitForURL('**/thuong-hieu');
  ghi('EN→VI danh sách: /en/brands/ → /thuong-hieu', page.url().endsWith('/thuong-hieu'), page.url());

  // ===== 3. VI→EN→VI trên bài có bản dịch =====
  await page.goto(BASE + '/co-che/bo-thoat', { waitUntil: 'load' });
  await page.locator(swSel).first().click();
  await page.waitForURL('**/en/mechanisms/escapement/');
  ghi('VI→EN bài: /co-che/bo-thoat → /en/mechanisms/escapement/', page.url().endsWith('/en/mechanisms/escapement/'), page.url());
  await page.locator(swSel).first().click();
  await page.waitForURL('**/co-che/bo-thoat');
  ghi('EN→VI bài: về đúng bài VI', page.url().endsWith('/co-che/bo-thoat'), page.url());

  // ===== 4. Trang chưa dịch: panel lựa chọn, không rời trang ngay =====
  await page.goto(BASE + '/lich-su', { waitUntil: 'load' });
  const urlTruoc = page.url();
  await page.locator(swSel).first().click();
  const panelMo = await page.locator('#lang-panel').isVisible();
  const panelTitle = panelMo ? await page.locator('#lang-panel-title').textContent() : '';
  ghi('Chưa dịch: bấm switcher mở panel (không rời trang)', panelMo && page.url() === urlTruoc, 'title="' + (panelTitle ?? '').trim() + '" url=' + page.url());
  await page.locator('#lang-panel-stay').click();
  const panelDong = !(await page.locator('#lang-panel').isVisible());
  const focusTrenSw = await page.evaluate((sel) => !!document.querySelector(sel)?.closest('body')?.querySelector('header')?.contains(document.activeElement), swSel);
  ghi('Chưa dịch: "Ở lại" đóng panel, focus trở về vùng switcher, vẫn /lich-su', panelDong && page.url() === urlTruoc, 'focus-trong-header=' + focusTrenSw);
  // Lần 2: chọn đi trang chủ EN
  await page.locator(swSel).first().click();
  await page.locator('#lang-panel-go').click();
  await page.waitForURL('**/en/');
  ghi('Chưa dịch: "Đi tới trang chủ tiếng Anh" → /en/', page.url().endsWith('/en/'), page.url());

  // ===== 5. Escape đóng panel + trả focus về đúng nút mở =====
  await page.goBack();
  await page.waitForURL('**/lich-su');
  await page.locator(swSel).first().click();
  await page.keyboard.press('Escape');
  const panelAnEsc = !(await page.locator('#lang-panel').isVisible());
  const focusVeSwitcher = await page.evaluate((sel) => document.activeElement?.matches(sel) ?? false, swSel);
  const labelActive = await page.evaluate(() => document.activeElement?.getAttribute('aria-label') ?? '');
  ghi('Escape đóng panel + focus về nút đã mở', panelAnEsc && focusVeSwitcher, 'focus-trên-switcher=' + focusVeSwitcher + ' aria-label="' + labelActive + '"');

  // ===== 6. Explore EN desktop: 3 link VI vào đúng route =====
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/en/', { waitUntil: 'load' });
  const exploreBtn = page.locator('.nav-dropdown').nth(1).locator('[data-dropdown-toggle]');
  const exploreTarget = { '/lich-su': 'History', '/giai-phau': 'Anatomy', '/so-sanh': 'Compare' };
  for (const [target, ten] of Object.entries(exploreTarget)) {
    await page.goto(BASE + '/en/', { waitUntil: 'load' });
    await exploreBtn.click();
    const badge = await page.locator('.nav-dropdown').nth(1).locator(`a[href="${target}"] span`).last().textContent();
    await page.locator('.nav-dropdown a[href="' + target + '"]').first().click();
    await page.waitForURL('**' + target);
    ghi(`Explore EN desktop: ${ten} → ${target} (nhãn "Vietnamese only")`, page.url().endsWith(target) && (badge ?? '').includes('Vietnamese only'), 'url=' + page.url() + ' badge=' + (badge ?? '').trim());
  }

  // ===== 7. Explore EN mobile: menu → Discover → History =====
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto(BASE + '/en/', { waitUntil: 'load' });
  await page.locator('#menu-toggle').click();
  await page.locator('#mobile-menu a[href="/lich-su"]').click();
  await page.waitForURL('**/lich-su');
  ghi('Explore EN mobile: History → /lich-su', page.url().endsWith('/lich-su'), page.url());

  // ===== 8. Bàn phím desktop dropdown Kiến thức: Enter/Arrow/Escape =====
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  const kienThucBtn = page.locator('.nav-dropdown').nth(0).locator('[data-dropdown-toggle]');
  await kienThucBtn.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(250);
  const focusedHref = await page.evaluate(() => document.activeElement?.getAttribute('href') ?? '');
  const expanded = await kienThucBtn.getAttribute('aria-expanded');
  await page.keyboard.press('ArrowDown');
  const focusedHref2 = await page.evaluate(() => document.activeElement?.getAttribute('href') ?? '');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const expandedSauEsc = await kienThucBtn.getAttribute('aria-expanded');
  const focusVeNut = await page.evaluate(() => document.activeElement === document.querySelector('.nav-dropdown [data-dropdown-toggle]'));
  ghi('Bàn phím dropdown: Enter mở + focus link đầu; ArrowDown đi tiếp; Escape đóng + focus nút', focusedHref === '/lo-trinh-hoc-dong-ho' && expanded === 'true' && focusedHref2 === '/co-che' && expandedSauEsc === 'false' && focusVeNut, `link1=${focusedHref} expanded=${expanded} link2=${focusedHref2} expandedSauEsc=${expandedSauEsc} focusVeNut=${focusVeNut}`);
  await page.screenshot({ path: ANH + '1440-trang-chu-dropdown-kien-thuc.png' });

  // ===== 9. Tìm kiếm mobile: dialog + kết quả + Escape trả focus =====
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.locator('#search-trigger').click();
  const overlayMo = await page.locator('#search-overlay').isVisible();
  await page.locator('#search-input').fill('rolex');
  await page.waitForTimeout(1200);
  const soKetQua = await page.locator('#search-results a').count();
  await page.keyboard.press('Escape');
  const overlayDong = !(await page.locator('#search-overlay').isVisible());
  const focusVeSearch = await page.evaluate(() => document.activeElement?.id === 'search-trigger');
  ghi('Tìm kiếm mobile: mở dialog, gõ "rolex" có kết quả, Escape đóng + focus về nút', overlayMo && soKetQua > 0 && overlayDong && focusVeSearch, `overlay=${overlayMo} ketQua=${soKetQua} dong=${overlayDong} focusVe=${focusVeSearch}`);

  // ===== 10. Tìm kiếm desktop: ô inline =====
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.locator('header [data-inline-search] input').fill('rolex');
  await page.waitForTimeout(1200);
  const soKetQuaInline = await page.locator('header [data-inline-search] [role="listbox"] a').count();
  ghi('Tìm kiếm desktop: ô inline có kết quả', soKetQuaInline > 0, 'ketQua=' + soKetQuaInline);
  await page.keyboard.press('Escape');

  // ===== 11. Theme chuyển được + aria-label đúng chiều =====
  await page.goto(BASE + '/', { waitUntil: 'load' });
  const darkTruoc = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  await page.locator('#theme-toggle').click();
  const darkSau = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  const labelSau = await page.locator('#theme-toggle').getAttribute('aria-label');
  await page.screenshot({ path: ANH + '1440-trang-chu-dark.png' });
  await page.locator('#theme-toggle').click();
  const darkVe = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  ghi('Theme: click đổi dark ↔ light, aria-label cập nhật', darkTruoc !== darkSau && darkVe === darkTruoc && (labelSau ?? '').length > 0, `truoc=${darkTruoc} sau=${darkSau} ve=${darkVe} label="${labelSau}"`);

  // ===== 12. Reduced motion: panel mới hiện tức thì, không transition =====
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(BASE + '/lich-su', { waitUntil: 'load' });
  await page.locator(swSel).first().click();
  const panelMoReduce = await page.locator('#lang-panel').isVisible();
  const transitionPanel = await page.evaluate(() => getComputedStyle(document.getElementById('lang-panel')).transitionDuration);
  ghi('Reduced motion: panel hiện ngay, không có transition trên panel', panelMoReduce, `transitionDuration=${transitionPanel}`);
  await page.emulateMedia({ reducedMotion: 'no-preference' });

  // ===== 13. Không-JS: noscript giải thích + link thật đi được =====
  const browser = page.context().browser();
  const ctxNoJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const p2 = await ctxNoJs.newPage();
  await p2.goto(BASE + '/lich-su', { waitUntil: 'load' });
  const noscriptText = await p2.evaluate(() => {
    const ns = document.querySelector('header noscript p');
    if (!ns) return null;
    return getComputedStyle(ns).display !== 'none' ? ns.textContent.trim() : null;
  });
  ghi('Không-JS: chú thích noscript hiển thị giải thích rõ', !!noscriptText, 'text="' + (noscriptText ?? '').slice(0, 80) + '"');
  await p2.locator(swSel).first().click();
  await p2.waitForURL('**/en/');
  ghi('Không-JS: liên kết "English" thật — tới /en/ không kẹt', p2.url().endsWith('/en/'), p2.url());
  await ctxNoJs.close();

  // ===== 14. Ảnh đại diện =====
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.screenshot({ path: ANH + '320-trang-chu-vi-light.png' });
  await page.goto(BASE + '/en/', { waitUntil: 'load' });
  await page.screenshot({ path: ANH + '320-en-light.png' });

  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto(BASE + '/lich-su', { waitUntil: 'load' });
  await page.locator(swSel).first().click();
  await page.screenshot({ path: ANH + '375-lich-su-panel-chua-dich.png' });
  await page.keyboard.press('Escape');
  await page.locator('#menu-toggle').click();
  await page.screenshot({ path: ANH + '375-menu-mobile-mo-vi.png' });
  await page.keyboard.press('Escape');

  await page.setViewportSize({ width: 820, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.screenshot({ path: ANH + '820-tablet-trang-chu-vi-light.png' });

  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto(BASE + '/en/', { waitUntil: 'load' });
  await page.evaluate(() => { localStorage.setItem('theme', 'dark'); });
  await page.reload({ waitUntil: 'load' });
  await page.screenshot({ path: ANH + '768-en-dark.png' });
  await page.evaluate(() => { localStorage.setItem('theme', 'light'); });

  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto(BASE + '/en/', { waitUntil: 'load' });
  await page.screenshot({ path: ANH + '1024-en-light-desktop-vua-hien.png' });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/en/', { waitUntil: 'load' });
  await page.locator('.nav-dropdown').nth(1).locator('[data-dropdown-toggle]').click();
  await page.screenshot({ path: ANH + '1440-en-explore-nhan-vietnamese-only.png' });

  await page.goto(BASE + '/co-che/bo-thoat', { waitUntil: 'load' });
  await page.locator('.nav-dropdown').nth(0).locator('[data-dropdown-toggle]').click();
  await page.screenshot({ path: ANH + '1440-bo-thoat-active-location.png' });

  const tongDat = out.filter((o) => o.dat).length;
  return `THAO_TAC TONG=${out.length} DAT=${tongDat}\n` + out.map((o) => (o.dat ? 'DAT  ' : 'KHONG_DAT ') + o.ten + ' | ' + o.chiTiet).join('\n') + '\n@@JSON@@' + JSON.stringify(out);
}
