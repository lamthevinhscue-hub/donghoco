// Đo mạng TRƯỚC/SAU cùng phương pháp (vòng sửa TXN-20260912-23):
//   - TRƯỚC: dist dựng từ worktree 234fa26 (nền), astro preview cổng 4327
//   - SAU  : dist bản sửa, astro preview cổng 4321
//   - Mỗi phép dùng CONTEXT MỚI (cache rỗng), cùng viewport 1280×900, cùng
//     waitUntil networkidle, không throttle (localhost).
//   - byte = kích thước THÂN response giải mã (resp.body()); header
//     content-length ghi riêng khi có. Không lấy được byte → ghi null, KHÔNG
//     coi là 0. Request lỗi (≥400) ghi riêng.
async (page) => {
  const browser = page.context().browser();
  const kq = { thoiGian: new Date().toISOString(), phap: 'context mới cache rỗng / viewport 1280×900 / networkidle / byte = thân response giải mã', phap: [] };

  const bases = [
    { ten: 'truoc', base: 'http://localhost:4327', nguon: 'worktree 234fa26 (dist nền)' },
    { ten: 'sau', base: 'http://localhost:4321', nguon: 'working tree bản sửa G04-B (dist vòng sửa)' },
  ];
  const routes = [
    { lang: 'vi', path: '/co-che/day-toc-banh-lac/' },
    { lang: 'en', path: '/en/mechanisms/balance-and-hairspring/' },
  ];

  for (const b of bases) {
    for (const r of routes) {
      const ctx = await browser.newContext();
      const p = await ctx.newPage();
      const reqs = [];
      p.on('response', async (resp) => {
        let bodyBytes = null;
        let layDuoc = false;
        try {
          bodyBytes = (await resp.body()).length;
          layDuoc = true;
        } catch {}
        const headers = resp.headers();
        reqs.push({
          url: resp.url(),
          status: resp.status(),
          type: resp.request().resourceType(),
          bodyBytes,
          byteLayDuoc: layDuoc,
          contentLength: headers['content-length'] ?? null,
          ngoai: !resp.url().startsWith(b.base),
        });
      });
      await p.setViewportSize({ width: 1280, height: 900 });
      await p.goto(b.base + r.path, { waitUntil: 'networkidle' });
      const cls = await p.evaluate(() => new Promise((res) => {
        let s = 0;
        new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) s += e.value; }).observe({ type: 'layout-shift', buffered: true });
        setTimeout(() => res(Math.round(s * 10000) / 10000), 300);
      }));
      await ctx.close();

      const local = reqs.filter((x) => !x.ngoai);
      const ngoaiList = reqs.filter((x) => x.ngoai);
      const loi = reqs.filter((x) => x.status >= 400);
      const khongLayDuoc = reqs.filter((x) => !x.byteLayDuoc);
      const tongLoai = {};
      for (const x of local) {
        const t = x.type;
        tongLoai[t] = (tongLoai[t] ?? 0) + (x.bodyBytes ?? 0);
        tongLoai[t + '_null'] = (tongLoai[t + '_null'] ?? 0) + (x.byteLayDuoc ? 0 : 1);
      }
      kq.phap.push({
        pha: b.ten, nguon: b.nguon, route: r.lang,
        url: b.base + r.path,
        soRequestLocal: local.length,
        soRequestNgoai: ngoaiList.length,
        tongByteLocal: local.reduce((s, x) => s + (x.bodyBytes ?? 0), 0),
        byteNullLocal: local.filter((x) => !x.byteLayDuoc).length,
        theoLoai: tongLoai,
        requestLoi: loi.map((x) => ({ url: x.url, status: x.status })),
        byteKhongLayDuoc: khongLayDuoc.map((x) => ({ url: x.url, status: x.status })),
        chiTiet: local,
        taiNguyenNgoai: ngoaiList.map((x) => ({ url: x.url, status: x.status, bodyBytes: x.bodyBytes, byteLayDuoc: x.byteLayDuoc })),
        cls,
      });
    }
  }

  // Tổng hợp chênh lệch theo loại (route VI/EN)
  const tongHop = [];
  for (const r of routes) {
    const truoc = kq.phap.find((x) => x.pha === 'truoc' && x.route === r.lang);
    const sau = kq.phap.find((x) => x.pha === 'sau' && x.route === r.lang);
    const loai = ['document', 'stylesheet', 'script', 'image', 'font', 'other'];
    const chenh = {};
    for (const l of loai) {
      const d = (sau.theoLoai[l] ?? 0) - (truoc.theoLoai[l] ?? 0);
      if (d !== 0 || (truoc.theoLoai[l] ?? 0) > 0) chenh[l] = `${truoc.theoLoai[l] ?? 0} → ${sau.theoLoai[l] ?? 0} (${d >= 0 ? '+' : ''}${d})`;
    }
    tongHop.push({
      route: r.lang,
      soRequestLocal: `${truoc.soRequestLocal} → ${sau.soRequestLocal}`,
      tongByteLocal: `${truoc.tongByteLocal} → ${sau.tongByteLocal}`,
      chenhTheLoai: chenh,
    });
  }
  kq.tongHop = tongHop;
  return kq;
}
