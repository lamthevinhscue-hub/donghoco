// Vòng đời trang (vòng sửa TXN-20260912-23):
//   1) Rời trang THẬT (navigate đi trang khác → pagehide) rồi quay lại
//      (goBack) → điều khiển vẫn hoạt động (Phát chạy được).
//   2) SAU khi quay lại: mô phỏng sự kiện ẩn tab (defineProperty document.hidden
//      + visibilitychange) → cơ chế dừng vẫn hoạt động. GHI ĐÚNG: đây là MÔ
//      PHỎNG SỰ KIỆN, không phải chuyển tab thật.
//   3) Mô phỏng pageshow persisted=true (phục hồi bfcache) → UI đồng bộ lại.
async (page) => {
  const URL = 'http://localhost:4321/co-che/day-toc-banh-lac/';
  const bam = (a) => page.locator(`[data-bhc-action="${a}"]`).click();
  const trangThai = () => page.evaluate(() => ({
    status: document.querySelector('[data-bhc-status]')?.textContent ?? '(mất)',
    tf: document.querySelector('[data-bhc-rot]')?.getAttribute('transform') ?? '(mất)',
  }));
  const doi = (ms) => page.waitForTimeout(ms);
  const kq = { thoiGian: new Date().toISOString(), ghiChu: 'bước 2-3 là mô phỏng sự kiện bằng script; bước 1 là điều hướng thật', thu: {} };

  await page.setViewportSize({ width: 1280, height: 900 });

  // 1) Điều hướng thật đi rồi quay lại
  await page.goto(URL, { waitUntil: 'load' });
  await page.locator('[data-bhc-root]').scrollIntoViewIfNeeded();
  await bam('play');
  await doi(400);
  await page.goto('http://localhost:4321/co-che/bo-thoat/', { waitUntil: 'load' }); // pagehide thật
  await doi(300);
  await page.goBack({ waitUntil: 'load' }); // quay lại (có thể qua bfcache)
  await page.locator('[data-bhc-root]').scrollIntoViewIfNeeded();
  await doi(400);
  const r1 = await trangThai();
  await bam('play');
  const r1a = await trangThai();
  await doi(450);
  const r1b = await trangThai();
  kq.thu.quayLai = {
    conTrangThai: r1.status !== '(mất)',
    statusQuayLai: r1.status,
    phatDuoc: r1a.tf !== r1b.tf,
    statusSauPhat: r1b.status,
  };

  // 2) SAU quay lại — mô phỏng sự kiện ẩn tab: cơ chế dừng còn hoạt động?
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await doi(300);
  const r2a = await trangThai();
  await doi(450);
  const r2b = await trangThai();
  kq.thu.tabAnMoPhong = {
    status: r2a.status,
    dungThat: r2a.tf === r2b.tf,
  };
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
    document.dispatchEvent(new Event('visibilitychange'));
    delete document.hidden;
  });

  // 3) Mô phỏng pageshow persisted=true (phục hồi bfcache)
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
  await doi(200);
  const r3 = await trangThai();
  kq.thu.pageshowMoPhong = { status: r3.status, conTrangThai: r3.status !== '(mất)' };

  // Người dùng chủ động Phát lại sau chuỗi sự kiện
  await bam('play');
  const r4a = await trangThai();
  await doi(450);
  const r4b = await trangThai();
  kq.thu.phatLai = { chay: r4a.tf !== r4b.tf, status: r4b.status };

  kq.tatDat =
    kq.thu.quayLai.conTrangThai && kq.thu.quayLai.phatDuoc &&
    kq.thu.tabAnMoPhong.dungThat && kq.thu.pageshowMoPhong.conTrangThai &&
    kq.thu.phatLai.chay;
  return kq;
}
