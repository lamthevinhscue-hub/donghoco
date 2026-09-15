// G06-C chặng 2 — hồi quy khung dùng chung: 21 route VI còn lại (16 cơ chế +
// 5 từ điển, ĐỀU chế cũ) theo bảng nhận diện đã duyệt; kiểm nhãn/điều khiển/
// chuyển động/console THEO CHẾ ĐỘ THỰC SỰ RENDER (chế cũ: Phát/Từng bước/Đặt lại/
// Tốc độ, không áp máy móc "bốn nút/Bước x/n"). Riêng 2 route chương Bánh lắc
// G04: khung KHÔNG render, chương data-bhc-root render, không trùng.
async (page) => {
  const BASE = 'http://localhost:4321';
  const K = [];
  const D = 'DAT', ND = 'KHONG_DAT';
  const ghiKQ = (ca, dung, chiTiet = '') => K.push({ ca, trangThai: dung === true ? D : ND, chiTiet: String(chiTiet).slice(0, 260) });

  const ROUTE_CU = [
    '/co-che/chong-nuoc/', '/co-che/tru-cot/', '/co-che/chong-tu/', '/co-che/chuyen-dong-co/',
    '/co-che/len-day-tu-dong/', '/co-che/chronograph/', '/co-che/tourbillon/', '/co-che/gmt/',
    '/co-che/perpetual-calendar/', '/co-che/chong-soc/', '/co-che/bo-thoat-dong-truc/',
    '/co-che/pha-trang/', '/co-che/hien-thi-ngay/', '/co-che/da-quang/', '/co-che/kinh-dong-ho/',
    '/co-che/diem-chuong/',
    '/tu-dien/tourbillon/', '/tu-dien/perpetual-calendar/', '/tu-dien/chronograph/',
    '/tu-dien/gmt/', '/tu-dien/day-toc-banh-lac/',
  ];

  for (const route of ROUTE_CU) {
    const loiConsole = [];
    const loiMang = [];
    const ngheConsole = (msg) => {
      if (msg.type() !== 'error') return;
      // thông điệp "Failed to load resource" không mang URL — lỗi mạng được
      // kiểm riêng qua listener response/requestfailed (xem dưới)
      if (msg.text().startsWith('Failed to load resource')) return;
      loiConsole.push(msg.text().slice(0, 80));
    };
    const ngheMang = (r) => {
      const url = typeof r.url === 'function' ? r.url() : '';
      const status = typeof r.status === 'function' ? r.status() : 0;
      if (url && status >= 400) loiMang.push(`${status} ${url}`);
    };
    const ngheThatBai = (r) => loiMang.push(`FAILED ${r.url()}`);
    page.on('console', ngheConsole);
    page.on('response', ngheMang);
    page.on('requestfailed', ngheThatBai);
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(BASE + route, { waitUntil: 'load' });
    await page.waitForTimeout(320);
    const s = await page.evaluate(() => {
      const root = document.querySelector('[data-mechanism]');
      const play = root?.querySelector('.play-btn');
      const stepBtn = root?.querySelector('.step-btn');
      const slider = root?.querySelector('.speed-slider');
      const legend = root?.querySelector('.mech-legend');
      const nhan = root?.querySelector('span')?.textContent?.trim() ?? '';
      return {
        coKhung: !!root,
        cheEnhanced: root?.getAttribute('data-enhanced') ?? 'khong',
        coPlay: !!play,
        playAria: play?.getAttribute('aria-label') ?? '',
        coStepBtn: !!stepBtn,
        stepAria: stepBtn?.getAttribute('aria-label') ?? '',
        coSlider: !!slider,
        legendTrangThai: !legend ? 'khong' : legend.querySelector(':scope > span') ? 'span' : 'khac',
        legendText: legend?.querySelector(':scope > span')?.textContent?.trim() ?? '',
        nhan,
      };
    });
    // điều khiển + chuyển động: bấm Phát → aria-pressed=true (chế cũ có stepFn mới chạy)
    let playChay = false;
    if (s.coPlay) {
      await page.evaluate(() => document.querySelector('[data-mechanism] .play-btn')?.click());
      await page.waitForTimeout(400);
      playChay = await page.evaluate(() => document.querySelector('[data-mechanism] .play-btn')?.getAttribute('aria-pressed')) === 'true';
      await page.evaluate(() => document.querySelector('[data-mechanism] .play-btn')?.click());
    }
    // lỗi mạng chỉ được phép là script analytics production-only (preview 404)
    const mangChiVercel = loiMang.every((u) => u.includes('/_vercel/insights/script.js'));
    // legend: 'span' = khung sinh chip thay thế VI; 'khong' = component không có
    // [data-part] (khung xóa legend rỗng — hợp lệ); 'khac' = bất thường
    const dung = s.coKhung && s.cheEnhanced === 'khong' && s.coPlay && s.playAria === 'Phát hoạt ảnh'
      && s.coStepBtn && s.stepAria === 'Từng bước một' && s.coSlider && s.legendTrangThai !== 'khac' && playChay
      && loiConsole.length === 0 && mangChiVercel;
    ghiKQ(`Hồi quy ${route} (chế cũ): khung + nhãn VI + Phát/Từng bước/Tốc độ + play chạy + console sạch`, dung, `nhan=${s.nhan}, playChay=${playChay}, console=${loiConsole.length}, chiVercel=${mangChiVercel}, legend=${s.legendTrangThai}${s.legendText ? ' (' + s.legendText.slice(0, 30) + ')' : ''}`);
    page.off('console', ngheConsole);
    page.off('response', ngheMang);
    page.off('requestfailed', ngheThatBai);
  }

  // 2 route chương G04 — không render khung, chương render riêng, không trùng
  for (const [route, ten] of [['/co-che/day-toc-banh-lac/', 'VI'], ['/en/mechanisms/balance-and-hairspring/', 'EN']]) {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(BASE + route, { waitUntil: 'load' });
    await page.waitForTimeout(350);
    const g = await page.evaluate(() => ({
      khung: !!document.querySelector('[data-mechanism]'),
      chuong: !!document.querySelector('[data-bhc-root]'),
      play: !!document.querySelector('[data-bhc-action="play"]'),
      pressedInit: document.querySelector('[data-bhc-action="play"]')?.getAttribute('aria-pressed') ?? '',
      hairspringCu: !!document.getElementById('hairspring-svg'),
    }));
    ghiKQ(`G04 ${ten} ${route}: không khung + chương render + Phát init tĩnh + không trùng infographic cũ`, g.khung === false && g.chuong === true && g.play === true && g.pressedInit === 'false' && g.hairspringCu === false, JSON.stringify(g));
  }

  const dat = K.filter((x) => x.trangThai === D).length;
  return { tong: K.length, dat, khongDat: K.length - dat, ketQua: K };
}
