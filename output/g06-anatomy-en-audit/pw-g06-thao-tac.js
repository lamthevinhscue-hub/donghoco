// G06-A chặng 1 — kiểm thao tác /giai-phau/ (2D, 3D, bàn phím, RM, no-JS, lỗi engine, ẩn trang).
// MỘT biểu thức hàm cho playwright-cli run-code. Trả JSON — bắt stdout ghi tệp.
async (page) => {
  const BASE = 'http://127.0.0.1:4404';
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => { K.push({ ca, dat: dat === true, chiTiet }); };

  // ===== 1. 2D mặc định + thao tác chọn/tách/đặt lại =====
  await page.setViewportSize({ width: 1280, height: 800 });
  // Moi truong kiem khong truy cap font ngoai — chan de fonts.ready khong treo
  // (screenshot/goto cho font). Chup dung font du phong: bo cuc co the lech nhe
  // so voi production — ghi trong bien ban.
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  // goto commit (không chờ font/load) + chờ phần tử mốc — tránh race load-state
  await page.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });
  await page.waitForSelector('#tab-anatomy-2d', { timeout: 60000 });
  await page.waitForTimeout(400);
  const t0 = await page.evaluate(() => ({
    tab2d: document.getElementById('tab-anatomy-2d')?.getAttribute('aria-selected'),
    tab3dSel: document.getElementById('tab-anatomy-3d')?.getAttribute('aria-selected'),
    tab3dIdx: document.getElementById('tab-anatomy-3d')?.tabIndex,
    p2dHidden: document.getElementById('view-2d-wrapper')?.hidden,
    p3dHidden: document.getElementById('view-3d-wrapper')?.hidden,
    quick: document.querySelectorAll('.part-quick').length,
    svgParts: document.querySelectorAll('#exploded-svg [data-name-vi]').length,
    mode: document.getElementById('mode-label')?.textContent,
    cardVi: document.getElementById('detail-name-vi')?.textContent,
  }));
  ghi('2D mặc định: tab 2D selected, 3D không, panel 3D hidden, 12 nút nhanh, 12 phần tử data-name-vi',
    t0.tab2d === 'true' && t0.tab3dSel === 'false' && t0.tab3dIdx === -1 && t0.p2dHidden === false && t0.p3dHidden === true && t0.quick === 12 && t0.svgParts === 12 && t0.mode === 'Đang ghép (assembled)' && t0.cardVi === 'Chọn một bộ phận',
    JSON.stringify(t0));

  // Chọn bộ phận qua nút nhanh (kim giây)
  await page.click('.part-quick[data-part-id="second-hand"]');
  await page.waitForTimeout(200);
  const chon = await page.evaluate(() => ({
    vi: document.getElementById('detail-name-vi')?.textContent,
    en: document.getElementById('detail-name-en')?.textContent,
    role: document.getElementById('detail-role')?.textContent,
    link: document.getElementById('detail-link')?.getAttribute('href'),
    linkHien: !document.getElementById('detail-link')?.classList.contains('hidden'),
    pressed: document.querySelector('.part-quick[data-part-id="second-hand"]')?.getAttribute('aria-pressed'),
    activeSvg: document.querySelectorAll('#exploded-svg [data-part="second-hand"].active').length,
  }));
  ghi('Chọn kim giây (nút nhanh): thẻ chi tiết + link /co-che/bo-thoat + aria-pressed + highlight SVG',
    chon.vi === 'Kim giây' && chon.en === 'Second hand' && chon.link === '/co-che/bo-thoat' && chon.linkHien && chon.pressed === 'true' && chon.activeSvg >= 1,
    JSON.stringify(chon));

  // Tách lớp
  await page.click('#toggle-explode');
  await page.waitForTimeout(1300);
  const tach = await page.evaluate(() => {
    const ls = [...document.querySelectorAll('.layer-group')];
    return {
      mode: document.getElementById('mode-label')?.textContent,
      nhan: document.getElementById('toggle-label')?.textContent,
      pressed: document.getElementById('toggle-explode')?.getAttribute('aria-pressed'),
      maxY: Math.max(...ls.map((l) => parseFloat((l.getAttribute('transform') || '').match(/translate\(0, ([\d.]+)\)/)?.[1] ?? '0'))),
      vbH: document.getElementById('exploded-svg')?.viewBox.baseVal.height,
      exploded: document.getElementById('exploded-svg')?.classList.contains('exploded'),
    };
  });
  ghi('Tách lớp: nhãn "Đang tách (exploded)" + aria-pressed=true + lớp dời sâu + khung nới + class exploded',
    tach.mode === 'Đang tách (exploded)' && tach.nhan === 'Ghép lại' && tach.pressed === 'true' && tach.maxY >= 900 && (tach.vbH ?? 0) >= 860 && tach.exploded === true,
    JSON.stringify(tach));

  // Đặt lại
  await page.click('#reset-view');
  await page.waitForTimeout(1300);
  const datLai = await page.evaluate(() => ({
    mode: document.getElementById('mode-label')?.textContent,
    card: document.getElementById('detail-name-vi')?.textContent,
    maxY: Math.max(...[...document.querySelectorAll('.layer-group')].map((l) => parseFloat((l.getAttribute('transform') || '').match(/translate\(0, ([\d.]+)\)/)?.[1] ?? '0'))),
  }));
  ghi('Đặt lại: về "Đang ghép", thẻ chi tiết về mặc định, lớp thu về',
    datLai.mode === 'Đang ghép (assembled)' && datLai.card === 'Chọn một bộ phận' && datLai.maxY <= 620, JSON.stringify(datLai));

  // Chọn qua SVG click (thùng cót)
  await page.click('#exploded-svg [data-part="mainspring-barrel"]', { force: true });
  await page.waitForTimeout(200);
  const chonSvg = await page.evaluate(() => ({
    vi: document.getElementById('detail-name-vi')?.textContent,
    link: document.getElementById('detail-link')?.getAttribute('href'),
  }));
  ghi('Chọn qua SVG (thùng cót): thẻ cập nhật + link /co-che/tru-cot', chonSvg.vi === 'Thùng cót' && chonSvg.link === '/co-che/tru-cot', JSON.stringify(chonSvg));

  // ===== 2. Bàn phím =====
  await page.focus('#tab-anatomy-2d');
  await page.keyboard.press('ArrowRight');
  const kb1 = await page.evaluate(() => ({
    sel3d: document.getElementById('tab-anatomy-3d')?.getAttribute('aria-selected'),
    focus3d: document.activeElement?.id,
  }));
  ghi('Bàn phím tablist: ArrowRight → tab 3D selected + focus', kb1.sel3d === 'true' && kb1.focus3d === 'tab-anatomy-3d', JSON.stringify(kb1));
  await page.waitForTimeout(900); // cho 3D mở (tiện bước sau)
  await page.keyboard.press('ArrowLeft');
  const kb2 = await page.evaluate(() => ({
    sel2d: document.getElementById('tab-anatomy-2d')?.getAttribute('aria-selected'),
    focus2d: document.activeElement?.id,
    p3dHidden: document.getElementById('view-3d-wrapper')?.hidden,
  }));
  ghi('Bàn phím tablist: ArrowLeft → về 2D, panel 3D ẩn', kb2.sel2d === 'true' && kb2.focus2d === 'tab-anatomy-2d' && kb2.p3dHidden === true, JSON.stringify(kb2));
  // Nút nhanh nhận focus + Enter
  await page.focus('.part-quick[data-part-id="balance"]');
  await page.keyboard.press('Enter');
  const kb3 = await page.evaluate(() => ({
    vi: document.getElementById('detail-name-vi')?.textContent,
    link: document.getElementById('detail-link')?.getAttribute('href'),
    pressed: document.querySelector('.part-quick[data-part-id="balance"]')?.getAttribute('aria-pressed'),
  }));
  ghi('Bàn phím danh sách bộ phận: Enter chọn bánh lắc + link /tu-dien/day-toc-banh-lac', kb3.vi === 'Bánh lắc + dây tóc' && kb3.link === '/tu-dien/day-toc-banh-lac' && kb3.pressed === 'true', JSON.stringify(kb3));

  // Hash khung canvas qua CDP Page.captureScreenshot — bypass font-wait của
  // Playwright (screenshot chuẩn treo khi font ngoài bị chặn). Hash rẻ, chỉ
  // để so KHÁC/NHƯNG giữa hai trạng thái, không phải so sánh ảnh.
  const cdpShot = await page.context().newCDPSession(page);
  await cdpShot.send('Page.enable');
  const chup = async () => {
    const cb2 = await page.locator('#three-canvas-container canvas').boundingBox();
    const shot = await cdpShot.send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: cb2.x, y: cb2.y, width: Math.min(cb2.width, 400), height: Math.min(cb2.height, 300), scale: 1 },
    });
    const b64 = shot.data;
    let h = 0;
    for (let i = 0; i < b64.length; i += 997) h = (h * 31 + b64.charCodeAt(i)) % 1000000007;
    return h;
  };

  // ===== 3. Render-on-demand bằng đầu-ra thật (hash canvas) =====
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

  const dat = K.filter((k) => k.dat).length;
  return { ketQua: dat === K.length ? 'DAT' : 'KHONG_DAT', tong: `${dat}/${K.length}`, ca: K };
}
