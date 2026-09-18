// G09-B chặng 1 — đo reduced-motion infographic Bộ thoát (đối tượng thật /co-che/bo-thoat/ + /en/mechanisms/escapement/)
// Đo TRỰC TIẾP style.transform của #balance-group (góc rotate), lấy mẫu 100ms/lần.
async (page) => {
  const goc = 'http://localhost:4399';
  const kq = [];
  const mo = async (lang, reduce) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: reduce ? 'reduce' : 'no-preference' });
    await page.goto(goc + (lang === 'vi' ? '/co-che/bo-thoat/' : '/en/mechanisms/escapement/'), { waitUntil: 'load' });
    await page.waitForTimeout(400);
  };
  const gocQuay = () => page.evaluate(() => {
    const el = document.getElementById('balance-group');
    if (!el) return null;
    const m = /rotate\((-?[\d.]+)deg\)/.exec(el.style.transform || '');
    return m ? Number(m[1]) : 0;
  });
  const layMau = async (ms) => {
    const mau = await page.evaluate(async (tong) => {
      const el = document.getElementById('balance-group');
      const doc = [];
      const batDau = Date.now();
      while (Date.now() - batDau < tong) {
        const m = /rotate\((-?[\d.]+)deg\)/.exec(el.style.transform || '');
        doc.push({ t: Date.now() - batDau, goc: m ? Number(m[1]) : 0 });
        await new Promise((r) => setTimeout(r, 100));
      }
      const gocRieng = [...new Set(doc.map((d) => d.goc))];
      return { soMau: doc.length, soGocRieng: gocRieng.length, goc: gocRieng, dau: doc.slice(0, 6) };
    }, ms);
    return mau;
  };
  const nutPhat = () => page.locator('button[aria-label^="Phát"], button[aria-label^="Play"]').first();
  const nutSau = () => page.locator('button[aria-label^="Bước tiếp"], button[aria-label^="Next"]').first();
  const nhanPhat = async () => {
    const b = page.locator('button[aria-label^="Phát"], button[aria-label^="Play"]').first();
    return b.getAttribute('aria-label');
  };

  // T1 — reduce bật TRƯỚC tải: Phát + Bước sau, đo 2200ms
  for (const lang of ['vi', 'en']) {
    await mo(lang, true);
    const truocPhat = await gocQuay();
    await nutPhat().click();
    await page.waitForTimeout(250);
    const nhanSauClick = await nhanPhat();
    const mau1 = await layMau(2200);
    const nutSauOk = await nutSau().click().then(() => true).catch(() => false);
    await page.waitForTimeout(200);
    const sauBuoc = await gocQuay();
    const thongBao = await page.evaluate(() => {
      const el = document.querySelector('[data-reduce-notice], .mech-reduce-notice');
      return el ? (el.textContent || '').trim().slice(0, 90) : null;
    });
    kq.push(`T1-${lang} reduce-trước-tải: góc-trước-Phát=${truocPhat} nhãn-nút-sau-click="${nhanSauClick}" mẫu=${JSON.stringify(mau1)} Bước-sau-click=${nutSauOk} góc-sau-Bước=${sauBuoc} thông-báo=${JSON.stringify(thongBao)}`);
  }

  // T2 — không reduce: Phát chạy thật, đo 2600ms
  for (const lang of ['vi', 'en']) {
    await mo(lang, false);
    await nutPhat().click();
    const mau = await layMau(6200);
    kq.push(`T2-${lang} không-reduce-Phát: mẫu=${JSON.stringify(mau)}`);
  }

  // T3 — đang Phát rồi bật reduce GIỮA PHIÊN; T4 — gỡ reduce tiếp tục đo
  for (const lang of ['vi', 'en']) {
    await mo(lang, false);
    await nutPhat().click();
    const truoc = await layMau(3400);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const sauReduce = await layMau(4200);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    const sauGo = await layMau(4200);
    kq.push(`T3-${lang} bật-reduce-giữa-phiên: trước=${JSON.stringify({ soGocRieng: truoc.soGocRieng, goc: truoc.goc })} sau-reduce=${JSON.stringify({ soGocRieng: sauReduce.soGocRieng, goc: sauReduce.goc, dau: sauReduce.dau.slice(0, 4) })}`);
    kq.push(`T4-${lang} gỡ-reduce-tiếp-tục: sau-gỡ=${JSON.stringify({ soGocRieng: sauGo.soGocRieng, goc: sauGo.goc, dau: sauGo.dau.slice(0, 4) })}`);
  }

  // Ghi log môi trường
  const ua = await page.evaluate(() => navigator.userAgent);
  kq.push('MÔI TRƯỜNG: ' + ua);

  return 'ĐO REDUCED-MOTION BỘ THOÁT:\n' + kq.join('\n');
}
