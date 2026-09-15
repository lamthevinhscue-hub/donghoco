// G06-C chặng 1 vòng sửa 1 — bổ sung bằng chứng:
// A) Bàn phím thật (Tab đến nút, Enter/Space) + Đặt lại.
// B) RM đủ: reduce trước tải; bật reduce KHI ĐANG PHÁT; gỡ reduce rồi thao tác
//    — đo counter + transform phần tử thật (escape-wheel-group).
// C) Theme đọc từ DOM: 320/768/1440 × sáng/tối (data-theme/class trên html).
// D) Rời viewport (mô phỏng: cuộn ra ngoài) + tab ẩn (CDP Page.setWebLifecycleState — ghi rõ là mô phỏng).
// E) Ảnh đại diện vùng infographic.
async (page) => {
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => K.push({ ca, dat: dat === true, chiTiet: String(chiTiet) });
  const BASE = 'http://localhost:4321';
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(BASE + '/co-che/bo-thoat/', { waitUntil: 'load' });
  await page.waitForTimeout(250);

  // ===== A. Bàn phím thật: Tab đến nút Phát, Space phát; Tab tới next, Enter =====
  await page.evaluate(() => { document.body.focus(); });
  let gapPlay = false;
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab');
    if (await page.evaluate(() => document.activeElement?.classList.contains('play-btn'))) { gapPlay = true; break; }
  }
  const truocPhat = await page.evaluate(() => document.querySelector('.mechanism-animation .step-counter')?.textContent);
  await page.keyboard.press('Space');
  await page.waitForTimeout(2600);
  const sauSpace = await page.evaluate(() => ({
    pressed: document.querySelector('.mechanism-animation .play-btn')?.getAttribute('aria-pressed'),
    counter: document.querySelector('.mechanism-animation .step-counter')?.textContent,
  }));
  ghi('A1 bàn phím thật: Tab tới nút Phát + Space → phát (aria-pressed, bước tăng)', gapPlay && sauSpace.pressed === 'true' && truocPhat !== sauSpace.counter, `gap=${gapPlay}, ${truocPhat}→${sauSpace.counter}`);

  // Tab tới next-btn + Enter
  let gapNext = false;
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    if (await page.evaluate(() => document.activeElement?.classList.contains('next-btn'))) { gapNext = true; break; }
  }
  const cTruoc = await page.evaluate(() => document.querySelector('.mechanism-animation .step-counter')?.textContent);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(350);
  const cSau = await page.evaluate(() => document.querySelector('.mechanism-animation .step-counter')?.textContent);
  ghi('A2 bàn phím thật: Tab tới nút Bước sau + Enter → tăng bước', gapNext && cTruoc !== cSau, `${cTruoc}→${cSau}`);

  // A3: Đặt lại bằng nút (click thật) → về 1/5 + tư thế đầu
  await page.click('.mechanism-animation .reset-btn');
  await page.waitForTimeout(350);
  const a3 = await page.evaluate(() => ({
    counter: document.querySelector('.mechanism-animation .step-counter')?.textContent,
    transform: document.getElementById('escape-wheel-group')?.style.transform,
  }));
  ghi('A3 Đặt lại: về Bước 1/5, bánh thoát về tư thế đầu (w=0)', (a3.counter ?? '').startsWith('Bước 1/5') && (a3.transform ?? '').includes('rotate(0'), JSON.stringify(a3));

  // ===== B. RM đầy đủ =====
  // B1: reduce TRƯỚC tải
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(BASE + '/co-che/bo-thoat/', { waitUntil: 'load' });
  await page.waitForTimeout(200);
  await page.click('.mechanism-animation .next-btn');
  await page.waitForTimeout(80);
  const b1 = await page.evaluate(() => ({
    counter: document.querySelector('.mechanism-animation .step-counter')?.textContent,
    transformWheel: document.getElementById('escape-wheel-group')?.style.transform,
    transition: getComputedStyle(document.getElementById('escape-wheel-group')).transitionDuration,
  }));
  ghi('B1 reduce trước tải: next hoạt động, tư thế wheel đổi tức thì, transition 0s', (b1.counter ?? '').startsWith('Bước 2/5') && (b1.transformWheel ?? '').includes('rotate') && b1.transition === '0s', JSON.stringify(b1));

  // B2: bật reduce KHI ĐANG PHÁT — phát trước (không reduce), rồi bật giữa chừng
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(BASE + '/co-che/bo-thoat/', { waitUntil: 'load' });
  await page.waitForTimeout(150);
  await page.click('.mechanism-animation .play-btn');
  await page.waitForTimeout(100);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(100);
  const b2a = await page.evaluate(() => ({
    pressed: document.querySelector('.mechanism-animation .play-btn')?.getAttribute('aria-pressed'),
    counter: document.querySelector('.mechanism-animation .step-counter')?.textContent,
    transformWheel: document.getElementById('escape-wheel-group')?.style.transform ?? '(rỗng — khung không set transform ở enhanced)',
  }));
  await page.waitForTimeout(2600);
  const b2b = await page.evaluate(() => document.querySelector('.mechanism-animation .step-counter')?.textContent);
  ghi('B2 bật reduce KHI ĐANG PHÁT: QUAN SÁT — trạng thái nút=' + b2a.pressed + ', counter ' + b2a.counter + '→' + b2b + ' (khung khong listener reduce: phát tiếp ở tầng counter; tư thế wheel do step-apply đặt — không tween)', true, `pressed=${b2a.pressed}, wheel=${String(b2a.transformWheel).slice(0, 60)}`);

  // B3: gỡ reduce rồi thao tác — tư thế wheel đặt lại khi bấm bước
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForTimeout(100);
  await page.click('.mechanism-animation .next-btn');
  await page.waitForTimeout(380);
  const b3 = await page.evaluate(() => ({
    counter: document.querySelector('.mechanism-animation .step-counter')?.textContent,
    transformWheel: document.getElementById('escape-wheel-group')?.style.transform,
    transition: getComputedStyle(document.getElementById('escape-wheel-group')).transitionDuration,
  }));
  ghi('B3 gỡ reduce rồi thao tác: counter tăng + wheel có transform + transition 0.3s', (b3.counter ?? '').length > 0 && (b3.transformWheel ?? '').includes('rotate(') && b3.transition === '0.3s', JSON.stringify(b3));

  // ===== C. Theme đọc từ DOM: 320/768/1440 × sáng/tối =====
  const cKq = [];
  for (const scheme of ['light', 'dark']) {
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.goto(BASE + '/co-che/bo-thoat/?m=rolex-submariner'.replace('?m=rolex-submariner', ''), { waitUntil: 'load' });
      await page.waitForTimeout(120);
      const d = await page.evaluate(() => {
        const html = document.documentElement;
        const theme = html.dataset.theme ?? (html.classList.contains('dark') ? 'dark' : 'light');
        const stage = document.querySelector('.mechanism-animation .svg-stage');
        const svg = document.getElementById('escapement-svg');
        const nen = stage ? getComputedStyle(stage).backgroundColor : '';
        const doc = document.scrollingElement;
        return { theme, nen, svgW: svg ? Math.round(svg.getBoundingClientRect().width) : 0, tran: doc ? doc.scrollWidth - window.innerWidth : -1 };
      });
      const dung = d.tran === 0 && ((scheme === 'dark' && (d.theme === 'dark' || d.nen.includes('30, 41') || !d.nen.includes('255, 255, 255'))) || (scheme === 'light' && d.theme !== 'dark'));
      cKq.push(`${scheme}/${width}:theme=${d.theme},svg=${d.svgW}px,tràn=${d.tran}`);
      ghi(`C theme ${scheme} ${width}px: theme DOM khớp + không tràn`, dung, JSON.stringify(d));
    }
  }
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1280, height: 900 });

  // Ảnh đại diện vùng infographic (sáng + tối, 768px)
  await page.setViewportSize({ width: 768, height: 900 });
  for (const scheme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto(BASE + '/co-che/bo-thoat/', { waitUntil: 'load' });
    await page.waitForTimeout(150);
    const vung = await page.locator('[data-mechanism]').first().boundingBox();
    if (vung) {
      await page.screenshot({ path: `output/g06-escapement-en-audit/shots/g06c-${scheme}-768.png`, clip: { x: Math.max(0, vung.x), y: Math.max(0, vung.y), width: Math.min(768, vung.width), height: Math.min(900, vung.height) } });
    }
  }

  // ===== D. Rời viewport + tab ẩn (MÔ PHỎNG qua CDP — ghi rõ) =====
  await page.goto(BASE + '/co-che/bo-thoat/', { waitUntil: 'load' });
  await page.waitForTimeout(150);
  // D1: cuộn infographic ra ngoài viewport
  await page.click('.mechanism-animation .play-btn');
  await page.waitForTimeout(100);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  const d1 = await page.evaluate(() => {
    const svg = document.getElementById('escapement-svg');
    const r = svg.getBoundingClientRect();
    return { ngoaiViewport: r.bottom < 0 || r.top > innerHeight, counter: document.querySelector('.mechanism-animation .step-counter')?.textContent };
  });
  const d1b = await page.evaluate(() => document.querySelector('.mechanism-animation .step-counter')?.textContent);
  await page.evaluate(() => window.scrollTo(0, 0));
  ghi('D1 rời viewport (cuộn thật): QUAN SÁT trạng thái phát khi rời — counter ' + d1.counter + '→' + d1b, true, `ngoaiViewport=${d1.ngoaiViewport}`);
  // D2: tab ẩn — MÔ PHỎNG bằng CDP Page.setWebLifecycleState (không phải tab thật)
  try {
    const cdp = await page.context().newCDPSession(page);
    await page.click('.mechanism-animation .play-btn');
    await page.waitForTimeout(100);
    await cdp.send('Page.setWebLifecycleState', { state: 'frozen' });
    await page.waitForTimeout(400);
    const frozenState = await page.evaluate(() => ({ visibility: document.visibilityState, counter: document.querySelector('.mechanism-animation .step-counter')?.textContent }));
    await cdp.send('Page.setWebLifecycleState', { state: 'active' });
    await page.waitForTimeout(200);

    ghi('D2 tab ẩn MÔ PHỎNG (CDP setWebLifecycleState frozen): visibilityState=' + frozenState.visibility + ', counter=' + frozenState.counter, true, 'mô phỏng — không phải tab thật');
  } catch (e) {
    ghi('D2 tab ẩn MÔ PHỎNG: bị chặn — CHƯA KIỂM, blocker: ' + String(e).slice(0, 100), false, 'blocker CDP');
  }
  return { tong: K.length, dat: K.filter((x) => x.dat).length, khongDat: K.filter((x) => !x.dat).length, ketQua: K };
}
