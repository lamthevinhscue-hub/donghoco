// G06-B chặng 1 — đo nền TRÊN <tr> (lớp bg-white nằm ở hàng, không phải ô)
// Sửa phép đo của pw-g06b-hanh-vi.js phần C.
async (page) => {
  const K = [];
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  for (const scheme of ['light', 'dark']) {
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto('http://localhost:4321/so-sanh/?m=rolex-submariner,omega-speedmaster', { waitUntil: 'load' });
      await page.waitForTimeout(120);
      const d = await page.evaluate(() => {
        const hang = Array.from(document.querySelectorAll('#compare-body tr'));
        const doc = document.scrollingElement;
        return {
          lopHang0: hang[0]?.className,
          nenHang0: getComputedStyle(hang[0]).backgroundColor,
          nenHang1: getComputedStyle(hang[1]).backgroundColor,
          chuHang0: getComputedStyle(hang[0].cells[0]).color,
          chuGiaTriHang0: getComputedStyle(hang[0].cells[1]).color,
          trangTran: doc ? doc.scrollWidth - window.innerWidth : null,
          bangTran: (() => { const w = document.getElementById('compare-table-wrap'); return w ? w.scrollWidth - w.clientWidth : null; })(),
        };
      });
      K.push({ scheme, width, ...d });
    }
  }
  return K;
}
