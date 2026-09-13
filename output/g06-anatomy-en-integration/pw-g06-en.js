// G06-A chặng 2 — bản EN /en/anatomy/: trạng thái mặc định, thao tác 2D, 3D,
// chuỗi EN SAU tương tác (chọn/reset/Escape/lỗi/thử lại), menu Explore EN.
async (page) => {
  const BASE = 'http://127.0.0.1:4405';
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => { K.push({ ca, dat: dat === true, chiTiet }); };
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(BASE + '/en/anatomy/', { waitUntil: 'commit', timeout: 60000 });
  await page.waitForSelector('#tab-anatomy-2d', { timeout: 60000 });
  await page.waitForTimeout(500);

  // ===== 1. Mặc định EN =====
  const t0 = await page.evaluate(() => ({
    tab2d: document.getElementById('tab-anatomy-2d')?.textContent?.trim(),
    tab3d: document.getElementById('tab-anatomy-3d')?.textContent?.trim(),
    quick: document.querySelectorAll('.part-quick').length,
    card: document.getElementById('detail-name-vi')?.textContent,
    mode: document.getElementById('mode-label')?.textContent,
    toggle: document.getElementById('toggle-label')?.textContent,
    h1: document.querySelector('h1')?.textContent,
    blobLang: JSON.parse(document.getElementById('anatomy-i18n')?.textContent ?? '{}').lang,
    p3dHidden: document.getElementById('view-3d-wrapper')?.hidden,
  }));
  ghi('EN mặc định: tab "2D diagram"/"3D model", 12 nút, thẻ "Pick a part", Assembled, blob lang=en, panel 3D ẩn',
    t0.tab2d === '2D diagram' && t0.tab3d === '3D model' && t0.quick === 12 && t0.card === 'Pick a part' && t0.mode === 'Assembled' && t0.toggle === 'Explode' && typeof t0.h1 === 'string' && t0.h1.includes('anatomy') && t0.blobLang === 'en' && t0.p3dHidden === true,
    JSON.stringify(t0));

  // ===== 2. Chọn bộ phận EN (nút + SVG) =====
  await page.click('.part-quick[data-part-id="second-hand"]');
  await page.waitForTimeout(200);
  const chon = await page.evaluate(() => ({
    vi: document.getElementById('detail-name-vi')?.textContent,
    role: document.getElementById('detail-role')?.textContent,
    link: document.getElementById('detail-link')?.getAttribute('href'),
    pressed: document.querySelector('.part-quick[data-part-id="second-hand"]')?.getAttribute('aria-pressed'),
  }));
  ghi('EN chọn kim giây: thẻ "Second hand" + role EN + link /en/mechanisms/escapement/ + aria-pressed',
    chon.vi === 'Second hand' && chon.role?.includes('one turn per 60 seconds') && chon.link === '/en/mechanisms/escapement/' && chon.pressed === 'true',
    JSON.stringify(chon));

  await page.click('#toggle-explode');
  await page.waitForTimeout(1300);
  const tach = await page.evaluate(() => ({
    mode: document.getElementById('mode-label')?.textContent,
    nhan: document.getElementById('toggle-label')?.textContent,
    pressed: document.getElementById('toggle-explode')?.getAttribute('aria-pressed'),
    maxY: Math.max(...[...document.querySelectorAll('.layer-group')].map((l) => parseFloat((l.getAttribute('transform') || '').match(/translate\(0, ([\d.]+)\)/)?.[1] ?? '0'))),
  }));
  ghi('EN tách lớp: "Exploded" + nút "Assemble" + aria-pressed=true + lớp dời sâu',
    tach.mode === 'Exploded' && tach.nhan === 'Assemble' && tach.pressed === 'true' && tach.maxY >= 900, JSON.stringify(tach));

  await page.click('#reset-view');
  await page.waitForTimeout(1300);
  const reset = await page.evaluate(() => ({
    mode: document.getElementById('mode-label')?.textContent,
    card: document.getElementById('detail-name-vi')?.textContent,
    role: document.getElementById('detail-role')?.textContent,
  }));
  ghi('EN đặt lại: "Assembled" + thẻ về mặc định EN (role chứa "12 selected parts")',
    reset.mode === 'Assembled' && reset.card === 'Pick a part' && reset.role?.includes('12 selected parts'), JSON.stringify(reset));

  // ===== 3. Menu Explore EN (desktop): anatomy không nhãn; so-sanh còn nhãn =====
  const menu = await page.evaluate(() => {
    const tim = (href) => {
      const a = [...document.querySelectorAll(`nav a[href="${href}"]`)].find((x) => x.textContent.length > 0);
      return a ? { co: true, viOnly: a.textContent.includes('Vietnamese only') } : { co: false };
    };
    return {
      anatomy: tim('/en/anatomy/'),
      soSanh: tim('/so-sanh'),
      switcher: [...document.querySelectorAll('a[href="/giai-phau"]')].length,
    };
  });
  ghi('Menu EN: mục Anatomy trỏ bản EN thật không nhãn "Vietnamese only"; Compare còn nhãn; switcher về /giai-phau',
    menu.anatomy.co && !menu.anatomy.viOnly && menu.soSanh.co && menu.soSanh.viOnly && menu.switcher >= 1, JSON.stringify(menu));

  // ===== 4. 3D EN: mở, chọn, tách, đặt lại — chuỗi EN sau tương tác =====
  await page.click('#tab-anatomy-3d');
  const mo = await page.waitForFunction(() => {
    const an = document.getElementById('three-loading')?.classList.contains('hidden');
    const loi = !document.getElementById('anatomy-3d-error')?.classList.contains('hidden');
    return an ? 'mo' : (loi ? 'loi' : null);
  }, null, { timeout: 60000 }).then((h) => h.jsonValue()).catch(() => 'treo');
  if (mo !== 'mo') {
    ghi('3D EN mở (chủ động)', false, 'không mở: ' + mo);
  } else {
    await page.waitForTimeout(2600);
    const mo3d = await page.evaluate(() => ({
      aria: (document.querySelector('#three-canvas-container canvas')?.getAttribute('aria-label') || '').slice(0, 30),
      loading: document.getElementById('three-loading')?.classList.contains('hidden'),
      motion: document.getElementById('motion-toggle-3d')?.getAttribute('aria-pressed'),
      mode: document.getElementById('mode-label-3d')?.textContent,
      motionLabel: (document.getElementById('motion-toggle-3d')?.textContent || '').trim(),
    }));
    ghi('3D EN mở: canvas aria EN ("A conceptual 3D model…"), loading ẩn, motion MẶC ĐỊNH OFF, mode "Assembled"',
      mo3d.aria.startsWith('A conceptual 3D model') && mo3d.loading === true && mo3d.motion === 'false' && mo3d.mode === 'Assembled' && mo3d.motionLabel === '3D motion',
      JSON.stringify(mo3d));

    await page.click('.part-quick-3d[data-part-id="mainspring-barrel"]');
    await page.waitForTimeout(250);
    const chon3d = await page.evaluate(() => ({
      vi: document.getElementById('detail-name-vi-3d')?.textContent,
      role: document.getElementById('detail-role-3d')?.textContent,
      link: document.getElementById('detail-link-3d')?.getAttribute('href'),
      pressed: document.querySelector('.part-quick-3d[data-part-id="mainspring-barrel"]')?.getAttribute('aria-pressed'),
    }));
    ghi('3D EN chọn thùng cót: "Mainspring barrel" + role EN + link /en/mechanisms/power-reserve/ + aria-pressed',
      chon3d.vi === 'Mainspring barrel' && chon3d.role?.includes('power source') && chon3d.link === '/en/mechanisms/power-reserve/' && chon3d.pressed === 'true',
      JSON.stringify(chon3d));

    await page.keyboard.press('Escape');
    await page.waitForTimeout(250);
    const esc = await page.evaluate(() => document.getElementById('detail-name-vi-3d')?.textContent);
    const roleEsc = await page.evaluate(() => document.getElementById('detail-role-3d')?.textContent);
    ghi('EN Escape: thẻ về "Pick a part" + role mặc định EN', esc === 'Pick a part' && roleEsc?.includes('Drag to spin'), 'thẻ="' + esc + '"');

    await page.evaluate(() => document.getElementById('toggle-explode-3d').click());
    await page.waitForTimeout(1400);
    const tach3d = await page.evaluate(() => ({
      mode: document.getElementById('mode-label-3d')?.textContent,
      nhan: document.getElementById('toggle-label-3d')?.textContent,
    }));
    await page.evaluate(() => document.getElementById('reset-view-3d').click());
    await page.waitForTimeout(1000);
    const reset3d = await page.evaluate(() => document.getElementById('mode-label-3d')?.textContent);
    ghi('3D EN tách (el.click): "Exploded"/"Assemble"; đặt lại về "Assembled"',
      tach3d.mode === 'Exploded' && tach3d.nhan === 'Assemble' && reset3d === 'Assembled', JSON.stringify({ tach3d, reset3d }));
  }

  // ===== 5. Lỗi tải engine + thử lại (EN) =====
  const ctx = page.context();
  const p2 = await ctx.newPage();
  await p2.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await p2.route(/exploded3d[^/]*\.js/, (r) => r.abort());
  await p2.setViewportSize({ width: 1280, height: 800 });
  await p2.goto(BASE + '/en/anatomy/', { waitUntil: 'commit', timeout: 60000 });
  await p2.waitForSelector('#tab-anatomy-2d', { timeout: 60000 });
  await p2.waitForTimeout(300);
  await p2.click('#tab-anatomy-3d');
  await p2.waitForSelector('#anatomy-3d-error:not(.hidden)', { timeout: 20000 });
  const loi = await p2.evaluate(() => ({
    chu: (document.getElementById('anatomy-3d-error')?.textContent || '').includes('The 3D model could not load'),
    nut: (document.getElementById('anatomy-3d-retry')?.textContent || '').trim(),
    tab2d: document.getElementById('tab-anatomy-2d')?.getAttribute('aria-selected'),
  }));
  await p2.click('#anatomy-3d-retry');
  await p2.waitForSelector('#anatomy-3d-error:not(.hidden)', { timeout: 30000 });
  const retry = await p2.evaluate(() => !document.getElementById('anatomy-3d-error')?.classList.contains('hidden'));
  await p2.unroute(/exploded3d[^/]*\.js/);
  await p2.click('#anatomy-3d-retry');
  const retryOk = await p2.waitForSelector('#three-canvas-container canvas', { timeout: 30000 }).then(() => true).catch(() => false);
  await ctx.close();
  ghi('EN lỗi engine + Thử lại: thông báo EN ("The 3D model could not load") + Retry + tự về 2D; gỡ chặn mở được',
    loi.chu && loi.nut === 'Retry' && loi.tab2d === 'true' && retry && retryOk, JSON.stringify({ ...loi, retry }));

  const dat = K.filter((k) => k.dat).length;
  return { ketQua: dat === K.length ? 'DAT' : 'KHONG_DAT', tong: dat + '/' + K.length, ca: K };
}
