import io

p = 'output/g06-anatomy-en-audit/pw-g06-thao-tac.js'
s = io.open(p, encoding='utf-8').read()
i = s.index('  // ===== 3. Đo rAF (probe) — nền 2D idle =====')
j = s.index('  const dat = K.filter')

new_block = r'''  // ===== 3. Render-on-demand bằng đầu-ra thật (hash canvas) =====
  // Lưu ý môi trường: headless bắn rAF ~60fps cho MỌI trang nên đếm rAF không
  // phân biệt hoạt động của site — dùng hash khung canvas (screenshot):
  // không vẽ lại → hash giữ nguyên; có vẽ lại → hash đổi.
  await page.click('#tab-anatomy-3d');
  await page.waitForSelector('#three-canvas-container canvas', { timeout: 20000 });
  await page.waitForFunction(() => document.getElementById('three-loading')?.classList.contains('hidden'), null, { timeout: 20000 });
  await page.waitForTimeout(900);
  const id0 = await chup();
  await page.waitForTimeout(700);
  const id1 = await chup();
  ghi('3D idle trong khung (chưa bật chuyển động): canvas KHÔNG vẽ lại — hash giữ nguyên (render theo yêu cầu)',
    id0 === id1, 'hash ' + id0 + ' vs ' + id1);
  const mo3d = await page.evaluate(() => ({
    canvas: !!document.querySelector('#three-canvas-container canvas'),
    ariaCanvas: document.querySelector('#three-canvas-container canvas')?.getAttribute('aria-label')?.slice(0, 40),
    loadingAn: document.getElementById('three-loading')?.classList.contains('hidden'),
    chuyenDongPressed: document.getElementById('motion-toggle-3d')?.getAttribute('aria-pressed'),
    status: document.getElementById('mode-label-3d')?.textContent,
  }));
  ghi('3D mở: canvas có + aria-label + loading ẩn + chuyển động MẶC ĐỊNH TẮT (aria-pressed=false)',
    mo3d.canvas && typeof mo3d.ariaCanvas === 'string' && mo3d.loadingAn === true && mo3d.chuyenDongPressed === 'false' && mo3d.status === 'Đang ghép', JSON.stringify({ ...mo3d, ariaCanvas: (mo3d.ariaCanvas || '').slice(0, 30) }));

  // chọn bộ phận 3D qua nút + highlight
  await page.click('.part-quick-3d[data-part-id="rotor"]');
  await page.waitForTimeout(200);
  const chon3d = await page.evaluate(() => ({
    vi: document.getElementById('detail-name-vi-3d')?.textContent,
    en: document.getElementById('detail-name-en-3d')?.textContent,
    link: document.getElementById('detail-link-3d')?.getAttribute('href'),
    pressed: document.querySelector('.part-quick-3d[data-part-id="rotor"]')?.getAttribute('aria-pressed'),
  }));
  ghi('3D chọn rotor: thẻ chi tiết + link /co-che/len-day-tu-dong + aria-pressed', chon3d.vi === 'Rotor' && chon3d.en === 'Rotor' && chon3d.link === '/co-che/len-day-tu-dong' && chon3d.pressed === 'true', JSON.stringify(chon3d));

  // xoay bằng NÚT (điều khiển sẵn có) — canvas phải đổi khung
  const px0 = await chup();
  await page.click('#rot-left-3d');
  await page.click('#rot-left-3d');
  await page.waitForTimeout(600);
  const px1 = await chup();
  ghi('3D xoay bằng nút ←: canvas đổi khung (mô hình quay)', px0 !== px1, 'hash ' + px0 + ' → ' + px1);
  await page.click('#zoom-in-3d');
  await page.waitForTimeout(500);
  const px2 = await chup();
  ghi('3D zoom bằng nút +: canvas đổi khung', px1 !== px2, 'hash ' + px1 + ' → ' + px2);

  // kéo xoay trên canvas (thao tác thật)
  const cb = await page.locator('#three-canvas-container canvas').boundingBox();
  await page.mouse.move(cb.x + cb.width / 2, cb.y + cb.height / 2);
  await page.mouse.down();
  await page.mouse.move(cb.x + cb.width / 2 + 120, cb.y + cb.height / 2, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(700);
  const px3 = await chup();
  ghi('3D kéo xoay (thao tác chuột thật): canvas đổi khung', px2 !== px3, 'hash ' + px2 + ' → ' + px3);

  // ===== 4. Chuyển động 3D: bật → canvas tự đổi khung liên tục; tắt → dừng =====
  await page.click('#motion-toggle-3d', { force: true });
  await page.waitForTimeout(150);
  const batM = await page.evaluate(() => document.getElementById('motion-toggle-3d')?.getAttribute('aria-pressed'));
  const m0 = await chup();
  await page.waitForTimeout(500);
  const m1 = await chup();
  await page.waitForTimeout(500);
  const m2 = await chup();
  // TẮT bằng sự kiện mô phỏng el.click() (isTrusted=false): vòng vẽ liên tục ở
  // headless software-GL làm pipeline nhập chuột thật chết đói — thao tác chuột
  // thật đã chứng minh ở lượt BẬT ngay trên (force click thành công).
  await page.evaluate(() => document.getElementById('motion-toggle-3d').click());
  await page.waitForTimeout(600);
  const tatM = await page.evaluate(() => document.getElementById('motion-toggle-3d')?.getAttribute('aria-pressed'));
  const m3 = await chup();
  await page.waitForTimeout(700);
  const m4 = await chup();
  ghi('Chuyển động 3D BẬT (click chuột thật): aria-pressed=true + canvas tự đổi khung liên tục',
    batM === 'true' && m0 !== m1 && m1 !== m2, 'pressed=' + batM + ', hash ' + m0 + '/' + m1 + '/' + m2);
  ghi('Chuyển động 3D TẮT (el.click mô phỏng — ghi rõ): aria-pressed=false + canvas đứng yên',
    tatM === 'false' && m3 === m4, 'pressed=' + tatM + ', hash ' + m3 + ' vs ' + m4);

  // tách lớp 3D
  await page.click('#toggle-explode-3d');
  await page.waitForTimeout(1300);
  const tach3d = await page.evaluate(() => ({
    mode: document.getElementById('mode-label-3d')?.textContent,
    nhan: document.getElementById('toggle-label-3d')?.textContent,
    pressed: document.getElementById('toggle-explode-3d')?.getAttribute('aria-pressed'),
  }));
  ghi('3D tách lớp: "Đang tách" + nhãn "Ghép lại" + aria-pressed=true', tach3d.mode === 'Đang tách' && tach3d.nhan === 'Ghép lại' && tach3d.pressed === 'true', JSON.stringify(tach3d));

  // Escape bỏ chọn
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const esc = await page.evaluate(() => document.getElementById('detail-name-vi-3d')?.textContent);
  ghi('Escape bỏ chọn bộ phận 3D (về thẻ mặc định)', esc === 'Chọn một bộ phận', 'thẻ="' + esc + '"');

  // đặt lại 3D
  await page.click('#reset-view-3d');
  await page.waitForTimeout(900);
  const reset3d = await page.evaluate(() => document.getElementById('mode-label-3d')?.textContent);
  ghi('3D đặt lại: về "Đang ghép"', reset3d === 'Đang ghép', 'mode="' + reset3d + '"');

  // ===== 5. Rời viewport (cuộn thật) — đo Frames metric của renderer qua CDP =====
  // bật lại chuyển động để luôn có việc vẽ — rồi so Frames/s trong khung vs ngoài khung
  await page.evaluate(() => document.getElementById('motion-toggle-3d').click());
  await page.waitForTimeout(300);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Performance.enable');
  const layFrame = async () => {
    const ms = (await cdp.send('Performance.getMetrics')).metrics;
    return ms.find((m) => m.name === 'Frames').value;
  };
  const f0 = await layFrame();
  await page.waitForTimeout(2000);
  const f1 = await layFrame();
  await page.evaluate(() => document.querySelector('[data-exploded-3d-root]').scrollIntoView(false));
  await page.waitForTimeout(700);
  const f2 = await layFrame();
  await page.waitForTimeout(2000);
  const f3 = await layFrame();
  const fpsIn = (f1 - f0) / 2;
  const fpsOut = (f3 - f2) / 2;
  await page.evaluate(() => document.querySelector('[data-exploded-3d-root]').scrollIntoView(true));
  // tab ẩn: headless không lật document.hidden khi tab khác front — ghi CHƯA KIỂM
  const p2 = await page.context().newPage();
  await p2.goto('about:blank');
  await p2.bringToFront();
  await page.waitForTimeout(700);
  const hiddenState = await page.evaluate(() => ({ hidden: document.hidden, vis: document.visibilityState }));
  await p2.close();
  await page.bringToFront();
  ghi('Rời viewport (cuộn thật, chuyển động đang bật): renderer ngừng sinh khung (Frames/s giảm sâu)',
    fpsIn >= 15 && fpsOut <= Math.max(2, fpsIn * 0.15), 'Frames/s trong khung=' + Math.round(fpsIn) + ', ngoài khung=' + Math.round(fpsOut));
  K.push({ ca: 'Ẩn trang (tab khác front): engine dừng theo document.hidden', trangThai: 'CHUA_KIEM', chiTiet: 'headless bringToFront không lật document.hidden (thực đo hidden=' + hiddenState.hidden + '/' + hiddenState.vis + '); hành vi canRun() kiểm document.hidden — chỉ ghi nhận từ mã, chưa phải phép thử trình duyệt thật' });

'''
s = s[:i] + new_block + s[j:]
io.open(p, 'w', encoding='utf-8').write(s)
print('da thay khoi 3-5')
