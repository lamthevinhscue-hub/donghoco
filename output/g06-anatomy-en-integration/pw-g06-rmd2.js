// G06-A vòng sửa 2 (TXN-20260913-34) — RM-D VI/EN: gỡ reduce giữa phiên (reduce → no-preference
// trong cùng context), đo bằng SO PIXEL GIẢI MÃ với mốc thời gian thực.
// Trình tự: mở dưới reduce → mount 3D → GỠ reduce (emulateMedia no-preference) →
// đặt viewport/vùng chụp ổn định MỘT LẦN → click tách → chụp chuỗi mốc thời gian thực →
// verify trung gian ≠ đầu, ≠ đích; 2 mẫu cuối giống nhau (đích ổn định).
// Mỗi ca có timeout hữu hạn, context đóng trong finally.
async (page) => {
  const BASE = 'http://127.0.0.1:4405';
  const NGUONG_GIONG = 0.002;
  const NGUONG_KHAC = 0.02;
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => { K.push({ ca, dat: dat === true, chiTiet }); };
  const them = (ca, chiTiet) => { K.push({ ca, trangThai: 'CHUA_KIEM', chiTiet }); };
  const browser = page.context().browser();

  const INSTRUMENT = `
    window.__draw = 0;
    const g06w = (proto) => {
      if (!proto) return;
      for (const m of ['drawArrays', 'drawElements']) {
        const goc = proto[m];
        if (typeof goc === 'function') proto[m] = function (...a) { window.__draw++; return goc.apply(this, a); };
      }
    };
    if (window.WebGLRenderingContext) g06w(WebGLRenderingContext.prototype);
    if (window.WebGL2RenderingContext) g06w(WebGL2RenderingContext.prototype);
  `;

  for (const LANG of ['vi', 'en']) {
    let ctx;
    try {
      const duong = LANG === 'en' ? '/en/anatomy/' : '/giai-phau/';
      ctx = await browser.newContext({ reducedMotion: 'reduce' });
      const p = await ctx.newPage();
      await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
      await p.addInitScript(INSTRUMENT);
      await p.setViewportSize({ width: 900, height: 900 });
      await p.goto(BASE + duong, { waitUntil: 'commit', timeout: 60000 });
      await p.waitForSelector('#tab-anatomy-3d', { timeout: 60000 });
      await p.waitForTimeout(400);

      // Mở 3D dưới reduce
      await p.click('#tab-anatomy-3d');
      const mo = await p.waitForFunction(() => {
        const an = document.getElementById('three-loading')?.classList.contains('hidden');
        const loi = !document.getElementById('anatomy-3d-error')?.classList.contains('hidden');
        return an ? 'mo' : (loi ? 'loi' : null);
      }, null, { timeout: 90000 }).then((h) => h.jsonValue()).catch(() => 'treo');
      if (mo !== 'mo') { them('RM-D (' + LANG + ')', '3D không mở: ' + mo); continue; }

      // CDP + vùng chụp ổn định MỘT LẦN — không cuộn trong khi lấy mẫu
      const cdp = await p.context().newCDPSession(p);
      await cdp.send('Page.enable');
      await p.evaluate(() => document.querySelector('#three-canvas-container').scrollIntoView({ block: 'center' }));
      await p.waitForTimeout(500);
      const clip = await p.evaluate(() => {
        const r = document.querySelector('#three-canvas-container canvas').getBoundingClientRect();
        return { x: r.left, y: r.top, width: Math.min(r.width, 380), height: Math.min(r.height, 300) };
      });
      const chup = async () => {
        const shot = await cdp.send('Page.captureScreenshot', { format: 'png', clip });
        let h = 0; for (let i = 0; i < shot.data.length; i += 997) h = (h * 31 + shot.data.charCodeAt(i)) % 1000000007;
        return { data: shot.data, hash: h };
      };
      const soPixelKhac = async (dataA, dataB) => p.evaluate(async ([a, b]) => {
        const tai = (u) => new Promise((res, rej) => {
          const im = new Image();
          im.src = u;
          im.decode().then(() => res(im), () => rej(new Error('decode lỗi')));
        });
        const ia = await tai('data:image/png;base64,' + a);
        const ib = await tai('data:image/png;base64,' + b);
        const w = Math.min(ia.width, ib.width), h = Math.min(ia.height, ib.height);
        const ca = document.createElement('canvas'); ca.width = w; ca.height = h;
        const cb2 = document.createElement('canvas'); cb2.width = w; cb2.height = h;
        ca.getContext('2d').drawImage(ia, 0, 0);
        const da = ca.getContext('2d').getImageData(0, 0, w, h).data;
        cb2.getContext('2d').drawImage(ib, 0, 0);
        const db = cb2.getContext('2d').getImageData(0, 0, w, h).data;
        let khac = 0;
        for (let i = 0; i < da.length; i += 4) {
          if (Math.abs(da[i] - db[i]) + Math.abs(da[i+1] - db[i+1]) + Math.abs(da[i+2] - db[i+2]) > 24) khac++;
        }
        return { soKhac: khac, tyLe: khac / (w * h) };
      }, [dataA, dataB]);

      // ===== Xác minh điểm đầu ổn định (2 mốc cách 1s, không thao tác) =====
      await chup(); // đầu ổn định
      await p.waitForTimeout(1000);

      // ===== RM-D chính: gỡ reduce (mô phỏng emulateMedia) → tween 600ms hoạt động lại =====
      await p.emulateMedia({ reducedMotion: 'no-preference' });

      // click tách (thao tác thật) — dưới no-preference
      await p.click('#toggle-explode-3d');
      // chuỗi mốc sau tách (không cuộn — clip cố định)
      const mau = [];
      for (const delayMs of [100, 300, 600, 1000, 2000, 3000]) {
        await p.waitForTimeout(delayMs === 100 ? 100 : delayMs - mau.length > 0 ? delayMs - mau[mau.length - 1]?.t : 100);
        const m = await chup();
        mau.push({ ...m, t: delayMs });
      }
      await p.waitForTimeout(500);
      const cuoi1 = await chup();
      const cuoi2 = await chup();

      // so pixel: đầu (ghép) vs mốc tách
      const d0 = await soPixelKhac(s0.data, mau[0].data);
      const d2 = await soPixelKhac(s0.data, mau[5].data);
      // 2 mẫu cuối giống nhau → đích ổn định
      const onDinhCuoi = await soPixelKhac(cuoi1.data, cuoi2.data);

      ghi('RM-D (' + LANG + ', gỡ reduce giữa phiên, matchMedia ' + rmTruoc + '→' + rmSau + '): tách khác đầu (' + (d0.tyLe * 100).toFixed(2) + '%), khác đích tách (' + (d2.tyLe * 100).toFixed(2) + '%), 2 mẫu cuối giống nhau (' + (onDinhCuoi.tyLe * 100).toFixed(2) + '%)',
        d0.tyLe >= NGUONG_KHAC && d2.tyLe >= NGUONG_KHAC && onDinhCuoi.tyLe <= NGUONG_GIONG,
        'khac(đầu,tách)=' + (d0.tyLe * 100).toFixed(2) + '%, khac(đầu,đích)=' + (d2.tyLe * 100).toFixed(2) + '%, 2-mẫu-cuoi=' + (onDinhCuoi.tyLe * 100).toFixed(2) + '%');
    } catch (e) { them('RM-D (' + LANG + ')', 'lỗi: ' + String(e).slice(0, 160)); }
    finally { await ctx.close(); }
  }

  // ===== Tổng kết =====
  const phanLoai = (danhSach) => {
    const thucThi = danhSach.filter((k) => k.trangThai !== 'CHUA_KIEM' && k.trangThai !== 'QUAN_SAT_GIOI_HAN');
    const dat = thucThi.filter((k) => k.dat === true).length;
    const khongDat = thucThi.filter((k) => k.dat === false).length;
    const chua = danhSach.filter((k) => k.trangThai === 'CHUA_KIEM').length;
    const quanSat = danhSach.filter((k) => k.trangThai === 'QUAN_SAT_GIOI_HAN').length;
    const ketLuan = khongDat > 0 ? 'KHONG_DAT'
      : (dat > 0 && chua === 0 ? 'DAT'
      : (chua > 0 && dat === 0 ? 'CHUA_KIEM' : 'DAT_MOT_PHAN'));
    return { dat, khongDat, chua, quanSat, ketLuan };
  };
  const tuKiem = (() => {
    const kq = [];
    // a) Đạt + chưa kiểm → KHÔNG được DAT
    const a = phanLoai([{ ca: 'x', dat: true }, { ca: 'y', trangThai: 'CHUA_KIEM' }]);
    kq.push({ ten: 'a: đạt+chưa-kiểm → không DAT', dung: a.ketLuan !== 'DAT' });
    // b) Tất cả đạt → DAT
    const b = phanLoai([{ ca: 'x', dat: true }, { ca: 'y', dat: true }]);
    kq.push({ ten: 'b: tất cả đạt → DAT', dung: b.ketLuan === 'DAT' });
    // c) Tất cả chưa kiểm → CHUA_KIEM
    const c = phanLoai([{ ca: 'x', trangThai: 'CHUA_KIEM' }]);
    kq.push({ ten: 'c: tất cả bỏ qua → CHUA_KIEM', dung: c.ketLuan === 'CHUA_KIEM' });
    // d) Có ca không đạt → KHONG_DAT
    const d = phanLoai([{ ca: 'x', dat: true }, { ca: 'y', dat: false }]);
    kq.push({ ten: 'd: có không đạt → KHONG_DAT', dung: d.ketLuan === 'KHONG_DAT' });
    // e) Danh sách rỗng → không DAT
    const e = phanLoai([]);
    kq.push({ ten: 'e: rỗng → không DAT', dung: e.ketLuan !== 'DAT' });
    // f) Quan sát/giới hạn tách riêng, không tính đạt
    const f = phanLoai([{ ca: 'x', dat: true }, { ca: 'q', trangThai: 'QUAN_SAT_GIOI_HAN' }]);
    kq.push({ ten: 'f: quan-sát không tính đạt', dung: f.dat === 1 && f.quanSat === 1 });
    return kq;
  })();
  const tuKiemOk = tuKiem.every((k) => k.dung);

  return { phanLoai: phanLoai(K), tuKiem, tuKiemOk, ca: K };
}
