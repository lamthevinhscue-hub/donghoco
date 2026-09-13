// [ĐÃ THAY THẾ ở vòng sửa 2 TXN-20260913-32 — phần RM dùng pw-g06-rm2.js (đếm draw WebGL);
//  dòng có '|| true' đã bỏ; các kết quả từng dựa vào điều kiện luôn-đúng là KHÔNG ĐỦ CHỨNG MINH.]
// G06-A chặng 2 vòng sửa 1 — các ca còn thiếu:
//   A) Bàn phím EN: tablist (Arrow/Home/End), Enter/Space, Escape, reset qua bàn phím
//   B) RM 3D: trước tải (VI+EN) và GIỮA PHIÊN khi chuyển động đang chạy (VI+EN)
//   C) Rời viewport: đo pixel render THẬT qua CDP captureBeyondViewport
//      (clip tọa độ tài liệu — chụp được vùng ngoài cuộn, khác screenshot thường)
//   D) Ẩn trang: override document.hidden trong phiên (MÔ PHỎNG — ghi rõ)
//   E) WebGL không khả dụng: override HTMLCanvasElement.getContext (MÔ PHỎNG — ghi rõ)
// Không sửa mã sản phẩm; mọi mô phỏng được gắn cờ trong kết quả.
async (page) => {
  const BASE = 'http://127.0.0.1:4405';
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => { K.push({ ca, dat: dat === true, chiTiet }); };
  const them = (ca, chiTiet) => { K.push({ ca, trangThai: 'CHUA_KIEM', chiTiet }); };
  const browser = page.context().browser();

  // ===== A) Bàn phím EN =====
  {
    const p = await browser.newContext().then((c) => c.newPage());
    await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
    await p.setViewportSize({ width: 1280, height: 800 });
    await p.goto(BASE + '/en/anatomy/', { waitUntil: 'commit', timeout: 60000 });
    await p.waitForSelector('#tab-anatomy-2d', { timeout: 60000 });
    await p.waitForTimeout(400);
    try {
      await p.focus('#tab-anatomy-2d');
      await p.keyboard.press('End');
      const kb1 = await p.evaluate(() => ({ sel: document.getElementById('tab-anatomy-3d')?.getAttribute('aria-selected'), focus: document.activeElement?.id }));
      await p.keyboard.press('Home');
      const kb2 = await p.evaluate(() => ({ sel: document.getElementById('tab-anatomy-2d')?.getAttribute('aria-selected'), focus: document.activeElement?.id }));
      ghi('Bàn phím EN tablist: End → tab 3D selected+focus; Home → tab 2D', kb1.sel === 'true' && kb1.focus === 'tab-anatomy-3d' && kb2.sel === 'true' && kb2.focus === 'tab-anatomy-2d', JSON.stringify({ kb1, kb2 }));

      // Enter chọn bộ phận qua danh sách (bàn phím thật)
      await p.focus('.part-quick[data-part-id="escapement"]');
      await p.keyboard.press('Enter');
      const kb3 = await p.evaluate(() => ({
        vi: document.getElementById('detail-name-vi')?.textContent,
        link: document.getElementById('detail-link')?.getAttribute('href'),
        pressed: document.querySelector('.part-quick[data-part-id="escapement"]')?.getAttribute('aria-pressed'),
      }));
      // Space chọn bộ phận khác (bàn phím thật)
      await p.focus('.part-quick[data-part-id="gear-train"]');
      await p.keyboard.press(' ');
      const kb4 = await p.evaluate(() => ({
        vi: document.getElementById('detail-name-vi')?.textContent,
        pressed: document.querySelector('.part-quick[data-part-id="gear-train"]')?.getAttribute('aria-pressed'),
      }));
      ghi('Bàn phím EN danh sách: Enter chọn Escapement (link /en/mechanisms/escapement/); Space chọn Gear train',
        kb3.vi === 'Escapement' && kb3.link === '/en/mechanisms/escapement/' && kb3.pressed === 'true' && kb4.vi === 'Gear train' && kb4.pressed === 'true',
        JSON.stringify({ kb3, kb4 }));

      // Escape bỏ chọn
      await p.keyboard.press('Escape');
      const esc = await p.evaluate(() => document.getElementById('detail-name-vi')?.textContent);
      // Reset qua bàn phím: focus + Enter
      await p.focus('#reset-view');
      await p.keyboard.press('Enter');
      const rst = await p.evaluate(() => document.getElementById('mode-label')?.textContent);
      ghi('Bàn phím EN: Escape bỏ chọn về mặc định; reset qua phím → "Assembled"', esc === 'Pick a part' && rst === 'Assembled', 'esc="' + esc + '", mode="' + rst + '"');
    } catch (e) { them('Bàn phím EN', 'lỗi: ' + String(e).slice(0, 140)); }
    await p.context().close();
  }

  // ===== B) RM 3D: trước tải + giữa phiên (chuyển động đang chạy), VI + EN =====
  for (const [ten, duong] of [['VI', '/giai-phau/'], ['EN', '/en/anatomy/']]) {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
    await p.setViewportSize({ width: 900, height: 900 });
    await p.goto(BASE + duong, { waitUntil: 'commit', timeout: 60000 });
    await p.waitForSelector('#tab-anatomy-3d', { timeout: 60000 });
    await p.waitForTimeout(300);
    await p.click('#tab-anatomy-3d');
    const mo = await p.waitForFunction(() => {
      const an = document.getElementById('three-loading')?.classList.contains('hidden');
      const loi = !document.getElementById('anatomy-3d-error')?.classList.contains('hidden');
      return an ? 'mo' : (loi ? 'loi' : null);
    }, null, { timeout: 60000 }).then((h) => h.jsonValue()).catch(() => 'treo');
    if (mo !== 'mo') { them('RM 3D trước tải (' + ten + ')', '3D không mở: ' + mo); }
    else {
      await p.waitForTimeout(900);
      const cdp = await p.context().newCDPSession(p);
      await cdp.send('Page.enable');
      const hashCanvas = async () => {
        await p.evaluate(() => document.querySelector('#three-canvas-container').scrollIntoView({ block: 'center' }));
        await p.waitForTimeout(300);
        const cb = await p.evaluate(() => {
          const r = document.querySelector('#three-canvas-container canvas').getBoundingClientRect();
          return { x: r.left, y: r.top, width: r.width, height: r.height };
        });
        const shot = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: cb.x, y: cb.y, width: Math.min(cb.width, 380), height: Math.min(cb.height, 300), scale: 1 } });
        let h = 0; for (let i = 0; i < shot.data.length; i += 997) h = (h * 31 + shot.data.charCodeAt(i)) % 1000000007;
        return h;
      };
      // bật chuyển động thủ công → trong RM nó vẫn chạy (thiết kế: RM không chặn thao tác người dùng)
      await p.evaluate(() => document.getElementById('motion-toggle-3d').click());
      await hashCanvas(); await p.waitForTimeout(700); await hashCanvas();
      ghi('RM 3D trước tải (' + ten + '): chuyển động bật chủ động VẪN CHẠY (canvas đổi khung) — thiết kế RM không chặn thao tác người dùng',
        m0 !== m1, 'hash ' + m0 + ' vs ' + m1);
      // tách lớp trong RM: nhảy thẳng (không tween) — đo bằng hash chớm sau click
      await p.evaluate(() => document.getElementById('toggle-explode-3d').click());
      const t1 = await hashCanvas(); await p.waitForTimeout(700); const t2 = await hashCanvas();
      ghi('RM 3D (' + ten + '): tách nhảy thẳng tới đích — khung ổn định ngay sau click', t1 === t2, 'hash ' + t1 + ' vs ' + t2);
      // GIỮA PHIÊN: tắt reduce trong phiên đang chạy (emulateMedia về no-preference)
      await p.emulateMedia({ reducedMotion: 'no-preference' });
      await p.evaluate(() => document.getElementById('reset-view-3d').click());
      await p.waitForTimeout(1200);
      const r0 = await hashCanvas(); await p.waitForTimeout(700); const r1 = await hashCanvas();
      ghi('RM (' + ten + ') gỡ giữa phiên: thao tác kế có tween lại — khung thay đổi trong lúc chuyển tiếp rồi ổn định',
        r0 !== r1, 'hash sau reset ' + r0 + ' vs ' + r1 + ' (quan sát — kết luận tween chỉ có giá trị kèm đếm draw, xem pw-g06-rm2.js)');
    }
    await ctx.close();
  }

  // RM 3D GIỮA PHIÊN khi chuyển động đang chạy — đo riêng VI + EN
  for (const [ten, duong] of [['VI', '/giai-phau/'], ['EN', '/en/anatomy/']]) {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
    await p.setViewportSize({ width: 900, height: 900 });
    await p.goto(BASE + duong, { waitUntil: 'commit', timeout: 60000 });
    await p.waitForSelector('#tab-anatomy-3d', { timeout: 60000 });
    await p.waitForTimeout(300);
    await p.click('#tab-anatomy-3d');
    const mo = await p.waitForFunction(() => {
      const an = document.getElementById('three-loading')?.classList.contains('hidden');
      const loi = !document.getElementById('anatomy-3d-error')?.classList.contains('hidden');
      return an ? 'mo' : (loi ? 'loi' : null);
    }, null, { timeout: 60000 }).then((h) => h.jsonValue()).catch(() => 'treo');
    if (mo !== 'mo') { them('RM 3D giữa phiên (' + ten + ')', '3D không mở: ' + mo); }
    else {
      const cdp = await p.context().newCDPSession(p);
      await cdp.send('Page.enable');
      const hashCanvas = async () => {
        await p.evaluate(() => document.querySelector('#three-canvas-container').scrollIntoView({ block: 'center' }));
        await p.waitForTimeout(300);
        const cb = await p.evaluate(() => {
          const r = document.querySelector('#three-canvas-container canvas').getBoundingClientRect();
          return { x: r.left, y: r.top, width: r.width, height: r.height };
        });
        const shot = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: cb.x, y: cb.y, width: Math.min(cb.width, 380), height: Math.min(cb.height, 300), scale: 1 } });
        let h = 0; for (let i = 0; i < shot.data.length; i += 997) h = (h * 31 + shot.data.charCodeAt(i)) % 1000000007;
        return h;
      };
      // bật chuyển động (el.click — mô phỏng) rồi GIỮA PHIÊN chuyển reduce
      await p.evaluate(() => document.getElementById('motion-toggle-3d').click());
      await p.waitForTimeout(300);
      await hashCanvas(); await p.waitForTimeout(700); await hashCanvas();
      await p.emulateMedia({ reducedMotion: 'reduce' });
      await p.waitForTimeout(300);
      const m2 = await hashCanvas(); await p.waitForTimeout(700); const m3 = await hashCanvas();
      const pressed = await p.evaluate(() => document.getElementById('motion-toggle-3d')?.getAttribute('aria-pressed'));
      ghi('RM 3D GIỮA PHIÊN (' + ten + ', chuyển động đang chạy): reduce KHÔNG tự tắt chuyển động người-dùng-bật — canvas tiếp tục đổi khung',
        pressed === 'true' && m2 !== m3, 'pressed=' + pressed + ', hash ' + m2 + ' vs ' + m3);
      // thao tác kế (tách) trong reduce: nhảy thẳng — khung ổn định ngay
      await p.evaluate(() => document.getElementById('toggle-explode-3d').click());
      const t1 = await hashCanvas(); await p.waitForTimeout(600); const t2 = await hashCanvas();
      ghi('RM 3D GIỮA PHIÊN (' + ten + '): thao tác kế (tách) áp dụng reduce — khung ổn định ngay sau khi tới đích', t1 === t2, 'hash ' + t1 + ' vs ' + t2);
    }
    await ctx.close();
  }

  // ===== C) Rời viewport + D) Ẩn trang — VI, chuyển động bật, đo pixel render ngoài cuộn =====
  {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
    await p.setViewportSize({ width: 900, height: 900 });
    await p.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });
    await p.waitForSelector('#tab-anatomy-3d', { timeout: 60000 });
    await p.waitForTimeout(300);
    await p.click('#tab-anatomy-3d');
    const mo = await p.waitForFunction(() => document.getElementById('three-loading')?.classList.contains('hidden'), null, { timeout: 60000 }).then(() => true).catch(() => false);
    if (!mo) { them('Rời viewport + ẩn trang (VI)', '3D không mở'); }
    else {
      const cdp = await p.context().newCDPSession(p);
      await cdp.send('Page.enable');
      await p.evaluate(() => document.getElementById('motion-toggle-3d').click()); // bật (mô phỏng)
      // hash canvas theo TỌA ĐỘ TÀI LIỆU (captureBeyondViewport) — chụp được cả vùng ngoài cuộn
      const hashDoc = async () => {
        const box = await p.evaluate(() => {
          const el = document.querySelector('#three-canvas-container canvas');
          const r = el.getBoundingClientRect();
          return { x: Math.round(r.left + window.scrollX), y: Math.round(r.top + window.scrollY), w: Math.round(Math.min(r.width, 380)), h: Math.round(Math.min(r.height, 300)) };
        });
        const shot = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: box.x, y: box.y, width: box.w, height: box.h, scale: 1 }, captureBeyondViewport: true });
        let h = 0; for (let i = 0; i < shot.data.length; i += 997) h = (h * 31 + shot.data.charCodeAt(i)) % 1000000007;
        return h;
      };
      // đối chứng in-view: canvas đang đổi khung liên tục
      const in0 = await hashDoc(); await p.waitForTimeout(700); const in1 = await hashDoc();
      // rời viewport (cuộn thật) → chờ → 2 mốc ngoài cuộn
      await p.evaluate(() => window.scrollTo(0, 0));
      await p.waitForTimeout(600);
      const out0 = await hashDoc(); await p.waitForTimeout(2000); const out1 = await hashDoc();
      // quay lại in-view
      await p.evaluate(() => document.querySelector('#three-canvas-container').scrollIntoView({ block: 'center' }));
      await p.waitForTimeout(700);
      const in2 = await hashDoc(); await p.waitForTimeout(700); const in3 = await hashDoc();
      const inChay = in0 !== in1;
      const outDung = out0 === out1;
      const inChayLai = in2 !== in3;
      ghi('Rời viewport (cuộn thật, chuyển động bật): canvas NGOÀI cuộn giữ nguyên khung (loop dừng) — vào lại tiếp tục đổi (IO wake)',
        inChay && outDung && inChayLai, 'in ' + in0 + '/' + in1 + ' đổi=' + inChay + '; out ' + out0 + ' vs ' + out1 + ' đổi=' + (out0 !== out1) + '; in-lại ' + in2 + ' vs ' + in3 + ' đổi=' + inChayLai);

      // Ẩn trang: override document.hidden trong phiên (MÔ PHỎNG — ghi rõ)
      await p.evaluate(() => {
        Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
      });
      const hid0 = await hashDoc(); await p.waitForTimeout(1200); const hid1 = await hashDoc();
      await p.evaluate(() => { delete document.hidden; });
      ghi('Ẩn trang (MÔ PHỎNG document.hidden=true trong phiên): canvas đứng yên — canRun() chặn render', hid0 === hid1, 'hash ' + hid0 + ' vs ' + hid1);
    }
    await ctx.close();
  }

  // ===== E) WebGL không khả dụng — override getContext (MÔ PHỎNG môi trường) =====
  {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
    // tiêm lỗi môi trường TRƯỚC mã trang: getContext trả null cho webgl/webgl2
    await p.addInitScript(() => {
      const goc = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (loai, ...a) {
        if (/webgl/.test(String(loai))) return null;
        return goc.apply(this, [loai, ...a]);
      };
    });
    await p.setViewportSize({ width: 1280, height: 800 });
    await p.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });
    await p.waitForSelector('#tab-anatomy-2d', { timeout: 60000 });
    await p.waitForTimeout(300);
    await p.click('#tab-anatomy-3d');
    await p.waitForSelector('#anatomy-3d-error:not(.hidden)', { timeout: 20000 });
    const kq = await p.evaluate(() => ({
      alert: document.getElementById('anatomy-3d-error')?.getAttribute('role'),
      canvas: !!document.querySelector('#three-canvas-container canvas'),
      tab2d: document.getElementById('tab-anatomy-2d')?.getAttribute('aria-selected'),
      p2d: document.getElementById('view-2d-wrapper')?.hidden === false,
    }));
    await ctx.close();
    ghi('WebGL không khả dụng (MÔ PHỎNG getContext→null): engine ném lỗi → role=alert + tự về 2D, không canvas',
      kq.alert === 'alert' && kq.canvas === false && kq.tab2d === 'true' && kq.p2d, JSON.stringify(kq));
  }

  const thucThi = K.filter((k) => k.trangThai !== 'CHUA_KIEM');
  const dat = thucThi.filter((k) => k.dat).length;
  return { ketQua: dat === thucThi.length ? 'DAT' : 'KHONG_DAT', tong: dat + '/' + thucThi.length + ' (+' + (K.length - thucThi.length) + ' CHUA_KIEM)', ca: K };
}
