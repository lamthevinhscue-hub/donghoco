// G06-A chặng 1 — A1: trang 2D mặc định, thao tác chọn/tách/đặt lại, bàn phím.
// Trả JSON từng phần kể cả khi có ca lỗi (try/catch từng mục).
async (page) => {
  const BASE = 'http://127.0.0.1:4405';
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => { K.push({ ca, dat: dat === true, chiTiet }); };
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });
  await page.waitForSelector('#tab-anatomy-2d', { timeout: 60000 });
  await page.waitForTimeout(500);

  // ===== 1. Trạng thái ban đầu =====
  const t0 = await page.evaluate(() => ({
    tab2d: document.getElementById('tab-anatomy-2d')?.getAttribute('aria-selected'),
    tab3dSel: document.getElementById('tab-anatomy-3d')?.getAttribute('aria-selected'),
    tab3dIdx: document.getElementById('tab-anatomy-3d')?.tabIndex,
    p2dHidden: document.getElementById('view-2d-wrapper')?.hidden,
    p3dHidden: document.getElementById('view-3d-wrapper')?.hidden,
    quick: document.querySelectorAll('.part-quick').length,
    svgParts: document.querySelectorAll('#exploded-svg [data-name]').length,
    mode: document.getElementById('mode-label')?.textContent,
    cardVi: document.getElementById('detail-name-vi')?.textContent,
    tocDo: document.getElementById('anatomy-tabs')?.getAttribute('aria-label'),
  }));
  ghi('2D mặc định: tab 2D selected, 3D tabIndex=-1, panel 3D hidden, 12 nút nhanh + 12 phần tử data-name, trạng thái "Đang ghép"',
    t0.tab2d === 'true' && t0.tab3dSel === 'false' && t0.tab3dIdx === -1 && t0.p2dHidden === false && t0.p3dHidden === true && t0.quick === 12 && t0.svgParts === 12 && t0.mode === 'Đang ghép (assembled)' && t0.cardVi === 'Chọn một bộ phận',
    JSON.stringify(t0));

  // ===== 2. Chọn bộ phận =====
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
  ghi('Chọn kim giây (nút nhanh): thẻ chi tiết VI/EN + role + link /co-che/bo-thoat + aria-pressed + highlight SVG',
    chon.vi === 'Kim giây' && chon.en === 'Second hand' && chon.link === '/co-che/bo-thoat' && chon.linkHien && chon.pressed === 'true' && chon.activeSvg >= 1,
    JSON.stringify(chon));

  // ===== 3. Tách lớp / đặt lại =====
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
  ghi('Tách lớp: nhãn "Đang tách (exploded)" + aria-pressed=true + lớp dời sâu (maxY≥900) + khung nới (≥860) + class exploded',
    tach.mode === 'Đang tách (exploded)' && tach.nhan === 'Ghép lại' && tach.pressed === 'true' && tach.maxY >= 900 && (tach.vbH ?? 0) >= 860 && tach.exploded === true,
    JSON.stringify(tach));

  await page.click('#reset-view');
  await page.waitForTimeout(1300);
  const datLai = await page.evaluate(() => ({
    mode: document.getElementById('mode-label')?.textContent,
    card: document.getElementById('detail-name-vi')?.textContent,
    maxY: Math.max(...[...document.querySelectorAll('.layer-group')].map((l) => parseFloat((l.getAttribute('transform') || '').match(/translate\(0, ([\d.]+)\)/)?.[1] ?? '0'))),
  }));
  ghi('Đặt lại: về "Đang ghép", thẻ chi tiết về mặc định, lớp thu về (maxY≤620)',
    datLai.mode === 'Đang ghép (assembled)' && datLai.card === 'Chọn một bộ phận' && datLai.maxY <= 620, JSON.stringify(datLai));

  await page.click('#exploded-svg [data-part="mainspring-barrel"]', { force: true });
  await page.waitForTimeout(200);
  const chonSvg = await page.evaluate(() => ({
    vi: document.getElementById('detail-name-vi')?.textContent,
    link: document.getElementById('detail-link')?.getAttribute('href'),
  }));
  ghi('Chọn qua SVG (thùng cót, force click phần tử SVG): thẻ cập nhật + link /co-che/tru-cot',
    chonSvg.vi === 'Thùng cót' && chonSvg.link === '/co-che/tru-cot', JSON.stringify(chonSvg));

  // ===== 4. Bàn phím: tablist (mở 3D rồi về 2D — chờ engine nạp xong hẳn) =====
  await page.focus('#tab-anatomy-2d');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(150);
  const kb1 = await page.evaluate(() => ({
    sel3d: document.getElementById('tab-anatomy-3d')?.getAttribute('aria-selected'),
    focus3d: document.activeElement?.id,
  }));
  ghi('Bàn phím tablist: ArrowRight → tab 3D selected + nhận focus', kb1.sel3d === 'true' && kb1.focus3d === 'tab-anatomy-3d', JSON.stringify(kb1));
  // chờ 3D nạp xong (hoặc lỗi) trước khi rời — không để mount dở dang
  const trangThai3D = await page.waitForFunction(() => {
    const an = document.getElementById('three-loading')?.classList.contains('hidden');
    const loi = !document.getElementById('anatomy-3d-error')?.classList.contains('hidden');
    return an || loi;
  }, null, { timeout: 45000 }).then(() => 'mo').catch(() => 'treo-hoac-loi');
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(300);
  const kb2 = await page.evaluate(() => ({
    sel2d: document.getElementById('tab-anatomy-2d')?.getAttribute('aria-selected'),
    focus2d: document.activeElement?.id,
    p3dHidden: document.getElementById('view-3d-wrapper')?.hidden,
  }));
  ghi('Bàn phím tablist: ArrowLeft → về 2D (selected + focus), panel 3D ẩn',
    kb2.sel2d === 'true' && kb2.focus2d === 'tab-anatomy-2d' && kb2.p3dHidden === true, JSON.stringify({ ...kb2, trangThai3D }));

  await page.focus('.part-quick[data-part-id="balance"]');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(200);
  const kb3 = await page.evaluate(() => ({
    vi: document.getElementById('detail-name-vi')?.textContent,
    link: document.getElementById('detail-link')?.getAttribute('href'),
    pressed: document.querySelector('.part-quick[data-part-id="balance"]')?.getAttribute('aria-pressed'),
  }));
  ghi('Bàn phím danh sách bộ phận: Enter chọn bánh lắc + link /co-che/day-toc-banh-lac (G04)',
    kb3.vi === 'Bánh lắc + dây tóc' && kb3.link === '/co-che/day-toc-banh-lac' && kb3.pressed === 'true', JSON.stringify(kb3));

  return { ketQua: K.every((k) => k.dat) ? 'DAT' : 'KHONG_DAT', tong: K.filter((k) => k.dat).length + '/' + K.length, ca: K };
}
