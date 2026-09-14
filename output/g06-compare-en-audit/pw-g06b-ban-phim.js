// G06-B chặng 1 vòng sửa 1 (TXN-20260914-4) — phép thử BÀN PHÍM THẬT cho vùng
// cuộn bảng /so-sanh ở 320px, hai luồng: nạp kèm ?m= (BaseLayout bọc .table-scroll-wrap
// lúc load) và chọn mẫu sau load (chỉ wrap ngoài).
// Khác bản trước (log-hai-luong.txt chỉ gán scrollLeft bằng mã — chỉ chứng minh
// khả năng cuộn bằng mã, KHÔNG chứng minh chuột/cảm ứng/bàn phím): bản này dùng
// keyboard.press thật, ghi activeElement, vùng nhận focus, scrollLeft trước/sau,
// phím đã dùng. selectOption/dispatchEvent ở script hành vi trước là MÔ PHỎNG
// đường mã — không tính là phép thử bàn phím.
async (page) => {
  const K = {};
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await page.setViewportSize({ width: 320, height: 900 });
  const BASE = 'http://localhost:4321';

  // ---- Luồng 1: nạp kèm ?m= (bọc .table-scroll-wrap tabindex=0 lúc load) ----
  await page.goto(BASE + '/so-sanh/?m=rolex-submariner,omega-speedmaster,cartier-tank', { waitUntil: 'load' });
  await page.waitForTimeout(250);
  K.luongUrl = await page.evaluate(() => {
    const vung = document.querySelector('#compare-table-wrap .table-scroll-wrap');
    return {
      coVung: Boolean(vung),
      tabindex: vung?.getAttribute('tabindex') ?? null,
      role: vung?.getAttribute('role') ?? null,
    };
  });
  // Tab thật từ đầu trang: đếm số lần Tab tới khi gặp vùng cuộn (tối đa 80 nhịp)
  await page.evaluate(() => { document.body.focus(); });
  let soTabL1 = 0;
  let gapVung = false;
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab');
    soTabL1++;
    const kq = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        mo: el ? el.tagName + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').slice(0, 2).join('.') : '') : '(không)',
        laVung: Boolean(el && el.classList && el.classList.contains('table-scroll-wrap')),
      };
    });
    if (kq.laVung) { gapVung = true; K.luongUrl.activeElementSauTab = kq.mo; break; }
  }
  K.luongUrl.soTabToiVung = gapVung ? soTabL1 : 'không gặp sau ' + soTabL1 + ' Tab';
  K.luongUrl.tabVaoDuocVung = gapVung;
  if (gapVung) {
    // ArrowRight/ArrowLeft thật trên vùng đang focus
    const truocPhai = await page.evaluate(() => document.querySelector('#compare-table-wrap .table-scroll-wrap').scrollLeft);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(120);
    const sauPhai = await page.evaluate(() => document.querySelector('#compare-table-wrap .table-scroll-wrap').scrollLeft);
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(120);
    const sauTrai = await page.evaluate(() => document.querySelector('#compare-table-wrap .table-scroll-wrap').scrollLeft);
    const activeCuoi = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? el.tagName + (el.id ? '#' + el.id : '') + (el.classList.contains('table-scroll-wrap') ? '.table-scroll-wrap' : '') : '(không)';
    });
    K.luongUrl.muiTen = { phim: 'ArrowRight ×2 rồi ArrowLeft ×1', scrollLeftTruoc: truocPhai, sauHaiPhai: sauPhai, sauMotTrai: sauTrai, cuonBangPhim: sauPhai > truocPhai, activeElementSauCung: activeCuoi };
  }

  // ---- Luồng 2: chọn mẫu SAU load (không được bọc lại; wrap ngoài không tabindex) ----
  await page.goto(BASE + '/so-sanh/', { waitUntil: 'load' });
  await page.waitForTimeout(250);
  K.luongChonTay = {};
  // Chọn bằng bàn phím thật: Tab tới select (thay vì selectOption mô phỏng)
  await page.evaluate(() => { document.body.focus(); });
  let soTabL2 = 0;
  let gapSelect = false;
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press('Tab');
    soTabL2++;
    const laSelect = await page.evaluate(() => document.activeElement && document.activeElement.id === 'model-select');
    if (laSelect) { gapSelect = true; break; }
  }
  K.luongChonTay.tabToiSelect = gapSelect ? soTabL2 : 'không gặp sau ' + soTabL2 + ' Tab';
  if (gapSelect) {
    // Chọn mẫu bằng bàn phím thật: gõ ký tự đầu nhảy option (hành vi native select)
    // rồi Enter — hoặc ArrowDown + Enter. Dùng keyboard thật hoàn toàn.
    await page.keyboard.press('KeyR'); // nhảy tới option bắt đầu R (Rolex ...)
    await page.waitForTimeout(80);
    await page.keyboard.press('Enter'); // xác nhận (hộp select đóng/mở tùy trình duyệt)
    await page.waitForTimeout(120);
    const sauChon1 = await page.evaluate(() => ({ soCot: document.querySelectorAll('#compare-header th').length, url: location.search }));
    K.luongChonTay.chonBangPhimR = sauChon1; // quan sát: select native có phát change khi Enter không
  }
  // Luồng dự phòng: nếu native select không phát change khi chọn bằng phím,
  // dùng chuột thật (click) — ghi rõ là phép thử chuột, KHÔNG tính bàn phím.
  const soCotHienTai = await page.evaluate(() => document.querySelectorAll('#compare-header th').length);
  if (soCotHienTai < 4) {
    await page.selectOption('#model-select', 'rolex-submariner');
    await page.selectOption('#model-select', 'omega-speedmaster');
    await page.selectOption('#model-select', 'cartier-tank');
    await page.dispatchEvent('#model-select', 'change');
    await page.selectOption('#model-select', 'doxa-sub-300');
    await page.dispatchEvent('#model-select', 'change');
    await page.waitForTimeout(150);
    K.luongChonTay.duongDuPhong = 'selectOption/dispatchEvent = MÔ PHỎNG ĐƯỜNG MÃ (không phải bàn phím) — chỉ để đưa trang về trạng thái 3 mẫu đo vùng cuộn';
  }
  await page.waitForTimeout(200);
  K.luongChonTay.cauTruc = await page.evaluate(() => {
    const trong = document.querySelector('#compare-table-wrap .table-scroll-wrap');
    const ngoai = document.getElementById('compare-table-wrap');
    return { coVungTrong: Boolean(trong), tabindexNgoai: ngoai?.getAttribute('tabindex') ?? null, roleNgoai: ngoai?.getAttribute('role') ?? null };
  });
  // Tab thật: vùng cuộn có xuất hiện trong chuỗi focus không
  await page.evaluate(() => { document.body.focus(); });
  let gapVungL2 = false;
  let soTabL2b = 0;
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab');
    soTabL2b++;
    const laVung = await page.evaluate(() => {
      const el = document.activeElement;
      return Boolean(el && el.classList && (el.classList.contains('table-scroll-wrap') || el.id === 'compare-table-wrap'));
    });
    if (laVung) { gapVungL2 = true; K.luongChonTay.activeElementSauTab = await page.evaluate(() => document.activeElement.tagName + '#' + (document.activeElement.id || '')); break; }
  }
  K.luongChonTay.tabVaoDuocVung = gapVungL2;
  K.luongChonTay.soTabToiVung = gapVungL2 ? soTabL2b : 'không gặp sau ' + soTabL2b + ' Tab';
  if (gapVungL2) {
    const truoc = await page.evaluate(() => document.getElementById('compare-table-wrap').scrollLeft);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(120);
    const sau = await page.evaluate(() => document.getElementById('compare-table-wrap').scrollLeft);
    K.luongChonTay.muiTen = { phim: 'ArrowRight ×1', scrollLeftTruoc: truoc, sau: sau, cuonBangPhim: sau > truoc };
  } else {
    // focus() trực tiếp lên div không tabindex — trình duyệt có nhận không
    const focusTrucTiep = await page.evaluate(() => {
      const el = document.getElementById('compare-table-wrap');
      el.focus();
      return document.activeElement === el;
    });
    K.luongChonTay.focusTrucTiepLenWrap = focusTrucTiep;
    K.luongChonTay.ketLuanPhim = 'thiếu thuộc tính hỗ trợ (không tabindex) — không có đường Tab vào vùng; hành vi mũi tên chưa xác minh được vì vùng không thể nhận focus';
  }
  return K;
}
