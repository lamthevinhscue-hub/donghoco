// Thử từng nút điều khiển bằng chuột và bàn phím trên cả 2 route.
// Chứng minh chuyển động thật: đọc attr transform của nhóm bánh lắc và attr d
// của dây tóc ở các mẫu thời gian — không suy từ aria-pressed.
async (page) => {
  const BASE = 'http://localhost:4321';
  const ketqua = { thoiGian: new Date().toISOString(), moTruong: 'astro preview cục bộ', phap: [] };

  const layTrangThai = () => page.evaluate(() => {
    const root = document.querySelector('[data-bhc-root]');
    const rot = root.querySelector('[data-bhc-rot]');
    const spring = root.querySelector('[data-bhc-spring]');
    return {
      transform: rot.getAttribute('transform'),
      dDau: spring.getAttribute('d').slice(0, 40),
      d: spring.getAttribute('d'),
      status: root.querySelector('[data-bhc-status]').textContent,
      pressed: root.querySelector('[data-bhc-action="play"]').getAttribute('aria-pressed'),
    };
  });

  const bam = (action) => page.locator(`[data-bhc-root] [data-bhc-action="${action}"]`).click();
  const doi = (ms) => page.waitForTimeout(ms);

  for (const r of [{ lang: 'vi', url: BASE + '/co-che/day-toc-banh-lac/' }, { lang: 'en', url: BASE + '/en/mechanisms/balance-and-hairspring/' }]) {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(r.url, { waitUntil: 'load' });
    await page.locator('[data-bhc-root]').scrollIntoViewIfNeeded();
    await doi(300);
    const p = { route: r.lang, url: r.url, thu: {} };

    // 0) khởi tạo tĩnh
    p.thu.khoiTao = { ...(await layTrangThai()), roiVat: await page.evaluate(() => document.querySelector('[data-bhc-root]').querySelector('[data-bhc-rot]').getAttribute('transform')) };

    // 1) Phát — 3 mẫu thời gian phải khác nhau (chuyển động thật của SVG)
    await bam('play');
    const m1 = await layTrangThai(); await doi(420); const m2 = await layTrangThai(); await doi(420); const m3 = await layTrangThai();
    p.thu.phat = {
      m1: m1.transform, m2: m2.transform, m3: m3.transform,
      doiBit: m1.transform !== m2.transform && m2.transform !== m3.transform,
      dayTocThayDoi: m1.d !== m2.d && m2.d !== m3.d,
      status: m3.status, pressed: m3.pressed,
    };

    // 2) Tạm dừng — đóng băng tại pha hiện tại
    await bam('pause');
    const d1 = await layTrangThai(); await doi(500); const d2 = await layTrangThai();
    p.thu.tamDung = { dungY: d1.transform === d2.transform && d1.d === d2.d, status: d2.status, pressed: d2.pressed, pha: d1.transform };

    // 3) Bước — tiến một pha hữu hạn, xác định
    const truocStep = await layTrangThai();
    await bam('step');
    const sauStep = await layTrangThai();
    p.thu.buoc1 = { thayDoi: truocStep.transform !== sauStep.transform, status: sauStep.status };

    // 4) Bước ×11 nữa → tròn một dao động (12 pha)
    for (let i = 0; i < 11; i++) await bam('step');
    const sau12 = await layTrangThai();
    p.thu.buoc12 = { status: sau12.status };

    // 5) Tĩnh — về tư thế đầu, GIỮ bộ đếm
    await bam('static');
    const sauTinh = await layTrangThai();
    p.thu.tinh = { veGoc: sauTinh.transform === p.thu.khoiTao.roiVat, status: sauTinh.status };

    // 6) Phát rồi Đặt lại — về trạng thái đầu, bộ đếm về 0
    await bam('play'); await doi(600);
    await bam('reset');
    const sauReset = await layTrangThai();
    p.thu.datLai = { veGoc: sauReset.transform === p.thu.khoiTao.roiVat, status: sauReset.status, pressed: sauReset.pressed };

    // 7) Bàn phím: Tab tới nút Bước rồi Enter — pha phải tiến hữu hạn
    await bam('static');
    const stepBtn = page.locator(`[data-bhc-root] [data-bhc-action="step"]`);
    await stepBtn.focus();
    const fTruoc = await layTrangThai();
    await page.keyboard.press('Enter');
    const fSau = await layTrangThai();
    p.thu.banPhimEnter = { focus: await page.evaluate(() => document.activeElement?.getAttribute('data-bhc-action')), thayDoi: fTruoc.transform !== fSau.transform, status: fSau.status };
    // Tab giữa các nút điều khiển — focus di chuyển trong nhóm
    await page.keyboard.press('Shift+Tab');
    const tab1 = await page.evaluate(() => document.activeElement?.getAttribute('data-bhc-action'));
    await page.keyboard.press('Tab');
    const tab2 = await page.evaluate(() => document.activeElement?.getAttribute('data-bhc-action'));
    p.thu.banPhimTab = { shiftTabToi: tab1, tabVeLai: tab2 };

    ketqua.phap.push(p);
  }
  return ketqua;
}
