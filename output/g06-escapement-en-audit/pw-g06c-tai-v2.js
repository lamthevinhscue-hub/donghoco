// G06-C vòng sửa 2 — đo tải đúng phương pháp (bản thuần trình duyệt, không require):
// ghi URL, status, loại tài nguyên, phân biệt request thất bại; KHÔNG chặn font.
// Đối chiếu chunk 3D bằng node riêng (chunk-3d-bang-chung.json).
async (page) => {
  const reqs = [];
  const ctx = await page.context().browser().newContext({ viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  p.on('response', (r) => {
    reqs.push({ url: r.url(), status: r.status(), loai: r.request().resourceType() });
  });
  p.on('requestfailed', (r) => {
    reqs.push({ url: r.url(), status: 'FAILED:' + (r.failure()?.errorText ?? '?'), loai: r.request().resourceType() });
  });
  await p.goto('http://localhost:4321/co-che/bo-thoat/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  await ctx.close();

  const tong = { request: reqs.length, thatBai: 0, html: 0, css: 0, js: 0, anh: 0, font: 0, khac: 0 };
  const chiTiet = [];
  for (const q of reqs) {
    const thatBai = String(q.status).startsWith('FAILED');
    if (thatBai) tong.thatBai += 1;
    const duoi = (q.url.split('?')[0].match(/\.([a-z0-9]+)(?:$|\?)/i) ?? [])[1]?.toLowerCase() ?? '';
    const laDoc = q.loai === 'document';
    if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(duoi)) tong.anh += 1;
    else if (duoi === 'css') tong.css += 1;
    else if (duoi === 'js' || duoi === 'mjs') tong.js += 1;
    else if (duoi === 'woff2' || duoi === 'woff') tong.font += 1;
    else if (laDoc) tong.html += 1;
    else tong.khac += 1;
    chiTiet.push({ url: q.url.split('?')[0].slice(-70), status: q.status, nhom: duoi || q.loai, thatBai });
  }
  return { dieuKien: 'đo ĐẦY ĐỦ — không chặn Google Fonts; status/URL từng request; request thất bại ghi riêng', tong, chiTiet };
}
