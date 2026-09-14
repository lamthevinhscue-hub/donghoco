// G06-B chặng 2 — M11: đo tải /so-sanh/ (VI) TRƯỚC (4597: dist 9fa333e) và SAU
// (4321: preview dist mới) cùng một phương pháp; số tuyệt đối cho EN (4321).
// Đếm request + byte theo loại; ghi cả byte truyền (content-length khi có) và
// byte giải nén (độ dài body sau giải nén).
async (page) => {
  const doTai = async (goc, duong) => {
    const ctx = await page.context().browser().newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
    const reqs = [];
    p.on('response', async (r) => {
      try {
        const url = r.url();
        const duoi = (url.split('?')[0].match(/\.([a-z0-9]+)(?:$|\?)/i) ?? [])[1]?.toLowerCase() ?? (r.request().resourceType() === 'document' ? 'html' : 'khac');
        const loai = ['html', 'css', 'js', 'png', 'jpg', 'jpeg', 'webp', 'svg', 'woff2', 'woff'].includes(duoi) ? duoi : (r.request().resourceType() === 'image' ? 'anh-khac' : 'khac');
        let truyen = Number(r.headers()['content-length'] ?? -1);
        let giaiNen = -1;
        try { giaiNen = (await r.body()).length; } catch {}
        reqs.push({ loai, truyen, giaiNen });
      } catch {}
    });
    await p.goto(goc + duong, { waitUntil: 'networkidle' });
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
    const chiTiet = reqs.map((q) => `${q.loai}:${q.truyen >= 0 ? 'truyen=' + q.truyen : 'truyen=?'}:gn=${q.giaiNen}`);
    await ctx.close();
    return { ...ketQua, chiTiet };
  };

  const truoc = await doTai('http://127.0.0.1:4597', '/so-sanh/');
  const sau = await doTai('http://localhost:4321', '/so-sanh/');
  const en = await doTai('http://localhost:4321', '/en/compare/');
  // Không nạp sớm chunk 3D: danh sách script của hai trang
  const kiem3d = async (url) => {
    const ctx = await page.context().browser().newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    const scripts = [];
    p.on('response', (r) => { if (r.url().includes('/_astro/') && r.url().endsWith('.js')) scripts.push(r.url().split('/').pop()); });
    await p.goto(url, { waitUntil: 'networkidle' });
    await ctx.close();
    return scripts;
  };
  const jsVi = await kiem3d('http://localhost:4321/so-sanh/');
  const jsEn = await kiem3d('http://localhost:4321/en/compare/');
  const co3d = (ds) => ds.some((s) => /exploded|three|orbit/i.test(s));
  return { truoc, sau, en, khongNap3D: { jsVi, jsEn, vi: !co3d(jsVi), en: !co3d(jsEn) } };
}
