// G09-B chặng 2 — trình duyệt: DOM từng plate (không chỉ getElementById) + placeholder 3 pha
async (page) => {
  const goc = 'http://localhost:4399';
  const kq = [];
  let dat = 0, tat = 0;
  const xet = (ten, ok, chiTiet) => { kq.push(`${ok ? 'ĐẠT' : 'KHONG_DAT'} ${ten}${chiTiet ? ' — ' + chiTiet : ''}`); ok ? dat++ : tat++; };
  const loiConsole = [];
  page.on('console', (msg) => { if (msg.type() === 'error') loiConsole.push(msg.text().slice(0, 90)); });
  page.on('pageerror', (err) => loiConsole.push('pageerror: ' + String(err).slice(0, 90)));

  const kiemPlate = () => page.evaluate(() => {
    const plates = [...document.querySelectorAll('figure.watch-image')];
    const chiTiet = plates.map((fig, i) => {
      const svg = fig.querySelector('svg');
      const patterns = svg ? [...svg.querySelectorAll('pattern')] : [];
      const rect = svg ? svg.querySelector('rect[fill^="url(#"]') : null;
      const id = patterns[0]?.id || null;
      const fillDung = rect ? rect.getAttribute('fill') === `url(#${id})` : false;
      const patternTrongCungSvg = patterns.length === 1 && !!rect; // pattern nằm trong svg của chính plate
      return { thu: i + 1, id, soPattern: patterns.length, fillDung, patternTrongCungSvg };
    });
    const ids = chiTiet.map((c) => c.id);
    const idTrung = ids.some((id, i) => id && ids.indexOf(id) !== i);
    const tran = document.documentElement.scrollWidth - window.innerWidth;
    return { soPlate: plates.length, chiTiet, idTrung, tran, tatCaDung: chiTiet.every((c) => c.soPattern === 1 && c.fillDung && c.patternTrongCungSvg && c.id?.startsWith('guilloche-')) };
  });

  const TRANG = [['lich-su', '/lich-su/', 28], ['en-history', '/en/history/', 28], ['brand-ap', '/thuong-hieu/audemars-piguet/', 2], ['doi-chung-breguet', '/thuong-hieu/breguet/', 1]];
  for (const [ten, url, soMong] of TRANG) {
    for (const mau of ['light', 'dark']) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ colorScheme: mau, reducedMotion: 'no-preference' });
      await page.goto(goc + url, { waitUntil: 'load' });
      await page.waitForTimeout(300);
      const d = await kiemPlate();
      xet(`${ten}/${mau}: ${soMong} plate, mỗi plate đúng pattern cùng SVG, 0 trùng, 0 tràn`,
        d.soPlate === soMong && d.tatCaDung && !d.idTrung && d.tran <= 0,
        `plate=${d.soPlate} tatCaDung=${d.tatCaDung} idTrung=${d.idTrung} tran=${d.tran}`);
      if (mau === 'light') {
        const fig = page.locator('figure.watch-image').first();
        await fig.screenshot({ path: `output/g09-id-motion-fix/shots/plate-${ten}.png` });
      }
    }
  }

  // Placeholder 3 pha trên plate ĐẦU của /lich-su/ (ảnh thật /images/timeline/*)
  const urlLS = goc + '/lich-su/';
  const trangThaiPlateDau = () => page.evaluate(() => {
    const fig = document.querySelector('figure.watch-image');
    const ph = fig?.querySelector('.placeholder');
    const svg = ph?.querySelector('svg');
    const id = svg?.querySelector('pattern')?.id || null;
    const hien = ph ? getComputedStyle(ph).display !== 'none' : false;
    const img = fig?.querySelector('img');
    return { hien, id, imgHien: img ? getComputedStyle(img).display : null };
  });

  // Pha A — chặn ảnh timeline: onerror → placeholder hiện
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.route('**/images/timeline/*', (r) => r.abort());
  await page.goto(urlLS, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const phaA = await trangThaiPlateDau();
  xet('Pha A chặn ảnh: placeholder hiện (onerror) + ID guilloche riêng', phaA.hien && !!phaA.id && phaA.id.startsWith('guilloche-'), JSON.stringify(phaA));

  // Pha B — ảnh tải thành công: .loaded → placeholder ẩn
  await page.unroute('**/images/timeline/*');
  await page.goto(urlLS, { waitUntil: 'load' });
  await page.waitForTimeout(900);
  const phaB = await trangThaiPlateDau();
  xet('Pha B ảnh OK: placeholder ẩn, cơ chế ID giữ nguyên', !phaB.hien && !!phaB.id, JSON.stringify(phaB));

  // Pha C — ảnh 404: onerror → placeholder hiện lại
  await page.route('**/images/timeline/*', (r) => r.fulfill({ status: 404, body: 'khong co' }));
  await page.goto(urlLS, { waitUntil: 'load' });
  await page.waitForTimeout(500);
  const phaC = await trangThaiPlateDau();
  xet('Pha C ảnh 404: placeholder hiện lại (fallback onerror)', phaC.hien && !!phaC.id, JSON.stringify(phaC));
  await page.unroute('**/images/timeline/*');

  // Console: lỗi tài nguyên ở pha chặn/404 là kỳ vọng (kích hoạt onerror); chỉ fail khi có pageerror
  const loiPage = loiConsole.filter((l) => l.startsWith('pageerror'));
  xet('Không có pageerror mới từ WatchImage', loiPage.length === 0, JSON.stringify(loiPage.slice(0, 3)));

  return `G09-B chặng 2 trình duyệt: ${dat}/${dat + tat} ĐẠT\n` + kq.join('\n');
}
