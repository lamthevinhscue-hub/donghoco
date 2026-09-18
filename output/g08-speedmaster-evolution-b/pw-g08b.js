// G08-B — ma trận trình duyệt sơ đồ tiến hóa Speedmaster (chạy trên preview 4399)
async (page) => {
  const goc = 'http://localhost:4399';
  const URLS = [
    'https://monochrome-watches.com/a-guide-to-the-evolution-of-the-omega-speedmaster-moonwatch-reference-by-reference/',
    'https://www.omegawatches.com/en-us/watches/speedmaster/heritage-models/first-omega-in-space/product',
    'https://www.omegawatches.com/chronicle/1965-nasa-tests-and-qualifies-the-speedmaster',
    'https://monochrome-watches.com/a-guide-to-the-evolution-of-the-omega-speedmaster-moonwatch-reference-by-reference/',
    'https://www.omegawatches.com/chronicle/1969-the-first-journey-to-the-moon',
    'https://www.omegawatches.com/chronicle/1970-lucky-13',
    'https://www.hodinkee.com/articles/omega-speedmaster-3861-complete-buyers-guide',
  ];
  const kq = [];
  let dat = 0, tat = 0;
  const xet = (ten, ok, chiTiet) => {
    kq.push(`${ok ? 'ĐẠT' : 'KHONG_DAT'} ${ten}${chiTiet ? ' — ' + chiTiet : ''}`);
    ok ? dat++ : tat++;
  };
  const mo = async (lang, mau, w, h) => {
    await page.setViewportSize({ width: w, height: h });
    await page.emulateMedia({ colorScheme: mau, reducedMotion: 'no-preference' });
    await page.goto(goc + (lang === 'vi' ? '/mau-iconic/omega-speedmaster/' : '/en/iconic-watches/omega-speedmaster/'), { waitUntil: 'load' });
    await page.waitForTimeout(300);
  };
  const soNut = () => page.locator('.evol-btn').count();
  const tran = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

  // C1–C12: VI/EN × sáng/tối × 320/768/1440 — sơ đồ render, 7 nút, không tràn ngang
  for (const lang of ['vi', 'en']) {
    for (const mau of ['light', 'dark']) {
      for (const w of [320, 768, 1440]) {
        await mo(lang, mau, w, w === 320 ? 700 : 900);
        const n = await soNut();
        const t = await tran();
        xet(`C ${lang}/${mau}/${w}: 7 nút + 0 tràn`, n === 7 && t <= 0, `nút=${n} tràn=${t}`);
      }
    }
  }

  // C13 ngôn ngữ khớp trang
  await mo('vi', 'light', 1440, 900);
  let t = await page.evaluate(() => document.body.innerText);
  xet('C13 VI: nhãn "Xem nguồn:" + title vi, không "View source"',
    t.includes('Xem nguồn') && t.includes('Tiến hóa Omega Speedmaster') && !t.includes('View source'));
  await mo('en', 'light', 1440, 900);
  t = await page.evaluate(() => document.body.innerText);
  xet('C13 EN: nhãn "View source" + title en, không "Xem nguồn"',
    t.includes('View source') && t.includes('Omega Speedmaster evolution') && !t.includes('Xem nguồn'));

  // C14 trạng thái đầu: mốc 0 aria-pressed=true, chi tiết 0 hiện
  const st0 = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('.evol-btn')];
    const cur = document.querySelector('.evol-detail[data-current="true"]');
    return { p0: btns[0]?.getAttribute('aria-pressed'), p1: btns[1]?.getAttribute('aria-pressed'), cur: cur ? cur.getAttribute('data-index') : null };
  });
  xet('C14 đầu: mốc 0 chọn sẵn', st0.p0 === 'true' && st0.p1 === 'false' && st0.cur === '0', JSON.stringify(st0));

  // C15 bàn phím: Tab đi qua link nguồn trong chi tiết 0 rồi tới nút mốc 2; Enter kích hoạt
  await page.locator('.evol-btn').nth(0).focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  const st1 = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('.evol-btn')];
    const cur = document.querySelector('.evol-detail[data-current="true"]');
    return { focusLaBtn: document.activeElement?.classList.contains('evol-btn'), focusIdx: document.activeElement?.getAttribute('data-index'),
      p1: btns[1]?.getAttribute('aria-pressed'), p0: btns[0]?.getAttribute('aria-pressed'), cur: cur?.getAttribute('data-index') };
  });
  xet('C15 bàn phím: Tab×2 tới nút mốc 2 + Enter chọn', st1.focusLaBtn && st1.focusIdx === '1' && st1.p1 === 'true' && st1.p0 === 'false' && st1.cur === '1', JSON.stringify(st1));

  // C16 reduced-motion: reduce = chuyển tức thời (Chrome có báo 0s dạng 1e-05s), no-preference = 120ms
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const td0 = await page.evaluate(() => getComputedStyle(document.querySelector('.evol-btn')).transitionDuration);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const td1 = await page.evaluate(() => getComputedStyle(document.querySelector('.evol-btn')).transitionDuration);
  const gap = (s) => s.split(',').every((v) => parseFloat(v) < 0.001);
  xet('C16 reduced-motion: reduce tức thời (0s, Chrome ghi 1e-05s), no-preference=120ms', gap(td0) && !gap(td1), `reduce=${td0} no-pref=${td1}`);

  // C17 nguồn ngoài: 7 link đúng URL hồ sơ, target=_blank, rel có noopener
  const links = await page.evaluate(() => [...document.querySelectorAll('.evol-detail a')].map((a) => ({ href: a.href, target: a.target, rel: a.rel })));
  const du7 = URLS.every((u) => links.some((l) => l.href === u));
  const anToan = links.every((l) => l.target === '_blank' && l.rel.includes('noopener'));
  xet('C17 7 link nguồn đúng URL + target/rel an toàn', links.length === 7 && du7 && anToan, `số link=${links.length} du7=${du7} anToan=${anToan}`);

  // C18 no-JS: ngữ cảnh mới tắt JS — danh sách dọc, mọi chi tiết mở, không data-js
  try {
    const browser = page.context().browser();
    const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
    const p2 = await ctx.newPage();
    await p2.goto(goc + '/mau-iconic/omega-speedmaster/', { waitUntil: 'load' });
    const nj = await p2.evaluate(() => {
      const sec = document.querySelector('[data-evolution]');
      const details = [...document.querySelectorAll('.evol-detail')];
      return { dataJs: sec?.getAttribute('data-js'), mo: details.filter((d) => d.offsetHeight > 0).length, tong: details.length };
    });
    xet('C18 no-JS: không data-js, 7/7 chi tiết luôn mở', nj.dataJs === null && nj.mo === 7 && nj.tong === 7, JSON.stringify(nj));
    await ctx.close();
  } catch (e) {
    xet('C18 no-JS', false, 'lỗi tạo context: ' + e.message);
  }

  // C19 hồi quy nhanh: Submariner + GMT vẫn render sơ đồ
  for (const [slug, n] of [['mau-iconic/rolex-submariner', 8], ['mau-iconic/rolex-gmt-master', 8]]) {
    await page.goto(goc + '/' + slug + '/', { waitUntil: 'load' });
    const k = await soNut();
    xet(`C19 hồi quy ${slug}: ${n} nút`, k === n, `nút=${k}`);
  }

  await mo('vi', 'light', 1440, 900);
  await page.screenshot({ path: 'output/g08-speedmaster-evolution-b/shots/g08b-vi-1440-sang.png', fullPage: false });

  return `G08-B trình duyệt: ${dat}/${dat + tat} ĐẠT\n` + kq.join('\n');
}
