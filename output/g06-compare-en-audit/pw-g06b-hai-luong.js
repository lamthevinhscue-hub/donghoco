// G06-B chặng 1 — so sánh hai luồng: khôi phục ?m= (bọc lại lúc load) vs chọn tay sau load
async (page) => {
  const K = {};
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await page.setViewportSize({ width: 320, height: 900 });

  // Luồng 1: khôi phục từ URL trước load
  await page.goto('http://localhost:4321/so-sanh/?m=rolex-submariner,omega-speedmaster,cartier-tank', { waitUntil: 'load' });
  await page.waitForTimeout(250);
  K.luongUrl = await page.evaluate(() => {
    const inner = document.querySelector('#compare-table-wrap .table-scroll-wrap');
    const outer = document.getElementById('compare-table-wrap');
    const cuon = (el) => { if (!el) return null; el.scrollLeft = 99999; const s = el.scrollLeft; el.scrollLeft = 0; return s; };
    return {
      coInner: Boolean(inner),
      innerTabindex: inner?.getAttribute('tabindex'),
      innerRole: inner?.getAttribute('role'),
      innerAria: inner?.getAttribute('aria-label')?.slice(0, 40),
      innerCuonDuoc: cuon(inner),
      outerCuonDuoc: cuon(outer),
      goiYKeoNgang: document.querySelector('#compare-table-wrap ~ p.table-scroll-hint, #compare-table-wrap p.table-scroll-hint')?.textContent ?? '(không có)',
      hintTrongWrap: Boolean(document.querySelector('#compare-table-wrap > p.table-scroll-hint')),
    };
  });

  // Luồng 2: nạp không ?m= rồi chọn tay (render sau load)
  await page.goto('http://localhost:4321/so-sanh/', { waitUntil: 'load' });
  await page.waitForTimeout(250);
  await page.selectOption('#model-select', 'rolex-submariner');
  await page.dispatchEvent('#model-select', 'change');
  await page.selectOption('#model-select', 'omega-speedmaster');
  await page.dispatchEvent('#model-select', 'change');
  await page.selectOption('#model-select', 'cartier-tank');
  await page.dispatchEvent('#model-select', 'change');
  await page.waitForTimeout(250);
  K.luongChonTay = await page.evaluate(() => {
    const inner = document.querySelector('#compare-table-wrap .table-scroll-wrap');
    const outer = document.getElementById('compare-table-wrap');
    const cuon = (el) => { if (!el) return null; el.scrollLeft = 99999; const s = el.scrollLeft; el.scrollLeft = 0; return s; };
    return {
      coInner: Boolean(inner),
      outerTabindex: outer?.getAttribute('tabindex'),
      outerRole: outer?.getAttribute('role'),
      outerCuonDuoc: cuon(outer),
      goiYKeoNgang: document.querySelector('p.table-scroll-hint')?.textContent ?? '(không có)',
    };
  });
  return K;
}
