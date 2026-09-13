// G06-A chặng 1 — đo mạng /giai-phau/: cold load (context mới, cache riêng của
// context) → danh sách request; sau đó mở 3D chủ động → tài nguyên tải thêm.
// Cách đo: mỗi response ghi (a) dung lượng body giải mã (response.body().length),
// (b) header content-length, (c) header content-encoding. PHẠM VI PHÉP ĐO: script
// chủ động CHẶN Google Fonts (route abort) — không phải tổng tải trang bình thường;
// server phát content-encoding: gzip và content-length null (chunked) nên byte
// truyền thực tế CHƯA đo được; gzip tham chiếu tính gzip -9 từ dist (đã đối chiếu
// check-3d-loading-budget trong log-build-nen.txt).
// [Sửa chú thích ở vòng 2, TXN-20260913-23: dòng cũ viết "astro preview phục vụ
// KHÔNG nén" — sai so với bản ghi content-encoding: gzip; chỉ sửa chú thích này,
// dữ liệu đo và log chạy gốc không đổi.]
async (page) => {
  const BASE = 'http://127.0.0.1:4404';
  const ctx = await page.context().browser().newContext();
  const p = await ctx.newPage();
  const banGhi = [];
  p.on('response', async (res) => {
    try {
      const yeuCau = res.request();
      if (yeuCau.resourceType() === 'document' || /\.(js|css|json|woff2?|svg|png|jpg|webp|ico)(\?|$)/.test(res.url()) || res.url().includes('pagefind')) {
        let decoded = -1;
        try { const b = await res.body(); decoded = b.length; } catch { decoded = -1; }
        banGhi.push({
          url: res.url().replace(BASE, ''),
          loai: yeuCau.resourceType(),
         giaiMa: decoded,
          contentLength: res.headers()['content-length'] ? Number(res.headers()['content-length']) : null,
          nen: res.headers()['content-encoding'] ?? 'không',
        });
      }
    } catch {}
  });
  await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await p.setViewportSize({ width: 1440, height: 900 });
  await p.goto(BASE + '/giai-phau/', { waitUntil: 'commit', timeout: 60000 });
  await p.waitForSelector('#exploded-svg', { timeout: 60000 });
  await p.waitForTimeout(2500);
  const cold = banGhi.slice();
  // mở 3D chủ động
  banGhi.length = 0;
  await p.click('#tab-anatomy-3d');
  await p.waitForFunction(() => document.getElementById('three-loading')?.classList.contains('hidden'), null, { timeout: 60000 });
  await p.waitForTimeout(1500);
  const sau3d = banGhi.slice();
  await ctx.close();
  return { cold, sau3d };
}
