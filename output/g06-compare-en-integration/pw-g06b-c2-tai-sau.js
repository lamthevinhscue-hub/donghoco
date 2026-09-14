// G06-B vòng sửa 1 — đo tải SAU trên dist cuối: VI (/so-sanh/) và EN (/en/compare/).
// Số TRƯỚC kế thừa log-c2-tai.txt (dist 9fa333e dựng riêng, cùng phương pháp).
async (page) => {
  const doTai = async (duong) => {
    const ctx = await page.context().browser().newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
    const reqs = [];
    p.on('response', async (r) => {
      try {
        const url = r.url();
        const duoi = (url.split('?')[0].match(/\.([a-z0-9]+)(?:$|\?)/i) ?? [])[1]?.toLowerCase() ?? (r.request().resourceType() === 'document' ? 'html' : 'khac');
        const loai = ['html', 'css', 'js', 'png', 'jpg', 'jpeg', 'webp', 'svg', 'woff2', 'woff'].includes(duoi) ? duoi : (r.request().resourceType() === 'image' ? 'anh-khac' : 'khac');
        let giaiNen = -1;
        try { giaiNen = (await r.body()).length; } catch {}
        reqs.push({ loai, giaiNen });
      } catch {}
    });
    await p.goto('http://localhost:4321' + duong, { waitUntil: 'networkidle' });
    await p.waitForTimeout(300);
    const tom = () => {
      const r = { soRequest: reqs.length, html: 0, css: 0, js: 0, anh: 0, khac: 0, byteGiaiNen: 0 };
      for (const q of reqs) {
        if (q.loai === 'html') { r.html++; r.byteGiaiNen += Math.max(0, q.giaiNen); }
        else if (q.loai === 'css') { r.css++; r.byteGiaiNen += Math.max(0, q.giaiNen); }
        else if (q.loai === 'js') { r.js++; r.byteGiaiNen += Math.max(0, q.giaiNen); }
        else if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(q.loai)) { r.anh++; r.byteGiaiNen += Math.max(0, q.giaiNen); }
        else r.khac++;
      }
      return r;
    };
    const ketQua = tom();
    const chiTiet = reqs.map((q) => q.loai + ':gn=' + q.giaiNen);
    await ctx.close();
    return { ...ketQua, chiTiet };
  };
  const vi = await doTai('/so-sanh/');
  const en = await doTai('/en/compare/');
  const jsDs = [];
  const ctx = await page.context().browser().newContext({ viewport: { width: 1280, height: 900 } });
  const p2 = await ctx.newPage();
  p2.on('response', (r) => { if (r.url().includes('/_astro/') && r.url().endsWith('.js')) jsDs.push(r.url().split('/').pop()); });
  await p2.goto('http://localhost:4321/so-sanh/', { waitUntil: 'networkidle' });
  await ctx.close();
  return { viSau: vi, en: en, js: jsDs, khong3D: !jsDs.some((s) => /exploded|three|orbit/i.test(s)) };
}
