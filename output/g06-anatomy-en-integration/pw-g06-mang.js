// G06-A chặng 2 — đo mạng CẢ HAI bản: cold load (context mới) → mở 3D chủ động.
// Phép đo CÓ CHẶN Google Fonts (route abort) — không phải tổng tải trang bình thường.
// Ba kích thước phân biệt: body giải mã (response.body().length) / gzip -9 từ dist /
// byte truyền thực tế (content-length null do chunked — CHƯA đo được).
async (page) => {
  const BASE = 'http://127.0.0.1:4405';
  const ketQua = {};
  for (const [ten, duong] of [['VI', '/giai-phau/'], ['EN', '/en/anatomy/']]) {
    const ctx = await page.context().browser().newContext();
    const p = await ctx.newPage();
    const banGhi = [];
    p.on('response', async (res) => {
      try {
        const yeuCau = res.request();
        if (yeuCau.resourceType() === 'document' || /\.(js|css|json|woff2?|svg|png|jpg|webp|ico)(\?|$)/.test(res.url()) || res.url().includes('pagefind')) {
          let decoded = null;
          try { const b = await res.body(); decoded = b.length; } catch { decoded = null; }
          banGhi.push({
            url: res.url().replace(BASE, ''),
            loai: yeuCau.resourceType(),
            giaiMa: decoded,
            nen: res.headers()['content-encoding'] ?? 'không',
          });
        }
      } catch {}
    });
    await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
    await p.setViewportSize({ width: 1440, height: 900 });
    await p.goto(BASE + duong, { waitUntil: 'commit', timeout: 60000 });
    await p.waitForSelector('#exploded-svg', { timeout: 60000 });
    await p.waitForTimeout(2500);
    const cold = banGhi.slice();
    banGhi.length = 0;
    await p.click('#tab-anatomy-3d');
    await p.waitForFunction(() => document.getElementById('three-loading')?.classList.contains('hidden'), null, { timeout: 60000 });
    await p.waitForTimeout(1500);
    const sau3d = banGhi.slice();
    await ctx.close();
    ketQua[ten] = {
      cold_soRequest: cold.length,
      cold: cold,
      sau3d_soRequest: sau3d.length,
      sau3d: sau3d,
      chunk3dTruocThaoTac: cold.filter((r) => /exploded3d|OrbitControls/i.test(r.url)).length,
    };
  }
  return ketQua;
}
