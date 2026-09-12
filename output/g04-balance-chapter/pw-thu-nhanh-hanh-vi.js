// Kiểm nhanh sau sửa màu: Phát / Bước / Tĩnh không đổi hành vi (VI, 1280)
async (page) => {
  const URL = 'http://localhost:4321/co-che/day-toc-banh-lac/';
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(URL, { waitUntil: 'load' });
  await page.locator('[data-bhc-root]').scrollIntoViewIfNeeded();
  const tf = () => page.evaluate(() => document.querySelector('[data-bhc-rot]').getAttribute('transform'));
  const status = () => page.evaluate(() => document.querySelector('[data-bhc-status]').textContent);
  const bam = (a) => page.locator(`[data-bhc-action="${a}"]`).click();
  const kq = { thoiGian: new Date().toISOString(), thu: {} };

  const t0 = await tf();
  await bam('play');
  await page.waitForTimeout(450);
  const t1 = await tf(); await page.waitForTimeout(450); const t2 = await tf();
  kq.thu.phat = { chay: t0 !== t1 && t1 !== t2 };
  await bam('step');
  const s1 = await tf();
  kq.thu.buoc = { doiHuuHan: s1 !== t2 };
  await bam('static');
  const st = await tf(); const ss = await status();
  kq.thu.tinh = { veGoc: st === t0, status: ss };
  await bam('reset');
  const rs = await status();
  kq.thu.datLai = { status: rs };
  kq.tatDat = kq.thu.phat.chay && kq.thu.buoc.doiHuuHan && kq.thu.tinh.veGoc;
  return kq;
}
