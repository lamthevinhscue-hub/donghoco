// G05-B vòng sửa 2 (TXN-20260913-14) — kiểm hash hai chiều qua switcher.
// 12 tình huống × 2 chiều (VI→EN, EN→VI) = 24 ca khẳng định:
//   hợp lệ  → hash được giữ, ID đích tồn tại, trang cuộn tới đích (scrollY > 0)
//   không hợp lệ / không hash → hash bị bỏ, ở đầu trang đích (scrollY = 0)
// + 2 dòng quan sát tải trực tiếp hash không hợp lệ (không khẳng định — hành vi
//   mặc định của trình duyệt: giữ hash trong URL, không có ID đích, không cuộn).
// Ghi URL cuối, hash, ID đích tồn tại, vị trí cuộn vào pw-hash-keep-ket-qua.json.
async (page) => {
  const PORT = 4402;
  const BASE = `http://localhost:${PORT}`;
  const HOP_LE = ['milestone-0', 'milestone-12', 'milestone-27', 'chuong-c1', 'chuong-c6'];
  const SAI = ['milestone-00', 'milestone-01', 'milestone-028', 'milestone-999', 'chuong-c7', 'hash-sai'];
  const TAT_CA = [...HOP_LE, ...SAI, ''];
  const CHIEU = [['VI→EN', '/lich-su', '/en/history'], ['EN→VI', '/en/history', '/lich-su']];
  const ketQua = [];

  await page.setViewportSize({ width: 1280, height: 800 });

  for (const [tenChieu, di, den] of CHIEU) {
    for (const h of TAT_CA) {
      const hopLe = HOP_LE.includes(h);
      const tuUrl = BASE + di + (h ? `#${h}` : '');
      await page.goto(tuUrl, { waitUntil: 'load' });
      // đợi hook gắn href cho switcher (hợp lệ → href có #hash; sai/không hash → không #)
      let hrefKe = null;
      for (let i = 0; i < 40; i++) {
        hrefKe = await page.evaluate(() => {
          const a = document.querySelector('[data-lang-hash-keep]');
          return a ? a.getAttribute('href') : null;
        });
        const coHash = hrefKe ? hrefKe.includes('#') : false;
        if ((h !== '') === coHash) break;
        await page.waitForTimeout(250);
      }
      await page.locator('[data-lang-hash-keep]').first().click();
      await page.waitForURL((u) => u.pathname.startsWith(den), { timeout: 10000 });
      await page.waitForTimeout(900); // chờ cuộn neo ổn định
      const thucTe = await page.evaluate((hashMong) => ({
        url: location.href,
        hash: location.hash,
        scrollY: Math.round(window.scrollY),
        dichTonTai: hashMong ? !!document.getElementById(hashMong) : null,
      }), h);
      const dat = hopLe
        ? (thucTe.hash === `#${h}` && thucTe.dichTonTai === true && thucTe.scrollY > 0)
        : (thucTe.hash === '' && thucTe.scrollY === 0);
      ketQua.push({
        loai: hopLe ? 'hợp lệ' : (h === '' ? 'không hash' : 'không hợp lệ'),
        chieu: tenChieu, tu: di + (h ? `#${h}` : ''),
        hrefTruocClick: hrefKe, urlCuoi: thucTe.url, hashCuoi: thucTe.hash,
        idDichTonTai: thucTe.dichTonTai, scrollY: thucTe.scrollY, dat,
      });
    }
  }

  // Quan sát (không khẳng định): tải trực tiếp hash không hợp lệ
  for (const [ten, duong] of [['VI', '/lich-su'], ['EN', '/en/history']]) {
    await page.goto(BASE + duong + '#milestone-00', { waitUntil: 'load' });
    await page.waitForTimeout(600);
    const obs = await page.evaluate(() => ({
      url: location.href, hash: location.hash,
      scrollY: Math.round(window.scrollY),
      tonTai: !!document.getElementById('milestone-00'),
    }));
    ketQua.push({ loai: 'quan sát tải trực tiếp (không khẳng định)', chieu: `${ten} tải #milestone-00`, urlCuoi: obs.url, hashCuoi: obs.hash, idDichTonTai: obs.tonTai, scrollY: obs.scrollY });
  }

  const khangDinh = ketQua.filter((k) => k.loai !== 'quan sát tải trực tiếp (không khẳng định)');
  const dat = khangDinh.filter((k) => k.dat).length;
  const out = {
    ketQua: dat === khangDinh.length ? 'DAT' : 'KHONG_DAT',
    tong: `${dat}/${khangDinh.length} ca khẳng định đạt + ${ketQua.length - khangDinh.length} quan sát`,
    thoiGian: new Date().toISOString(), ca: ketQua,
  };
  return out;
}
