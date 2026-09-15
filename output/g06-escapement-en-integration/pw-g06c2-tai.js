// G06-C chặng 2 — đo tải 3 lượt CÙNG PHƯƠNG PHÁP:
//   T1 VI trước tích hợp (nền aaea528 — preview worktree, cổng 4475)
//   T2 VI sau tích hợp (cây làm việc, cổng 4321)
//   T3 EN sau tích hợp (cây làm việc, cổng 4321)
// Điều kiện ghi rõ: context trình duyệt kiểm, xóa cache qua CDP trước mỗi
// lượt (không dùng cache); KHÔNG chặn font; đếm byte GIẢI NÉN từ response.body()
// (preview không gửi content-length — không suy ra byte truyền); ghi request
// thất bại kèm lỗi; kiểm không nạp chunk 3D.
async (page) => {
  const mucTieu = [
    { ten: 'T1 VI trước (aaea528)', url: 'http://localhost:4475/co-che/bo-thoat/' },
    { ten: 'T2 VI sau (cây làm việc)', url: 'http://localhost:4321/co-che/bo-thoat/' },
    { ten: 'T3 EN sau (cây làm việc)', url: 'http://localhost:4321/en/mechanisms/escapement/' },
  ];
  const ketQua = [];
  for (const mt of mucTieu) {
    const reqs = [];
    const thatBai = [];
    const onResponse = async (r) => {
      try {
        const url = r.url();
        const kieu = (r.headers()['content-type'] || '').split(';')[0];
        let bytes = 0;
        if (kieu.startsWith('image/') || kieu.includes('font')) {
          bytes = (await r.body()).length;
        } else {
          bytes = (await r.text()).length;
        }
        reqs.push({ url, kieu, bytes, status: r.status() });
      } catch { reqs.push({ url: r.url(), kieu: 'loidoc', bytes: 0, status: r.status() }); }
    };
    const onFail = (r) => thatBai.push({ url: r.url(), loi: r.failure()?.errorText ?? 'khong-ro' });
    page.on('response', onResponse);
    page.on('requestfailed', onFail);
    try {
      const cdp = await page.context().newCDPSession(page);
      await cdp.send('Network.clearBrowserCache');
      await page.goto(mt.url, { waitUntil: 'load' });
      await page.waitForTimeout(2500);
    } catch (e) {
      ketQua.push({ ten: mt.ten, trangThai: 'LOI_PHIEN', loi: String(e).slice(0, 120), soReqDaBat: reqs.length, thatBai });
      page.off('response', onResponse);
      page.off('requestfailed', onFail);
      continue;
    }
    page.off('response', onResponse);
    page.off('requestfailed', onFail);
    const theoKieu = {};
    let tong = 0;
    for (const r of reqs) {
      tong += r.bytes;
      const nhom = r.kieu.includes('html') ? 'html' : r.kieu.includes('css') ? 'css' : r.kieu.includes('javascript') ? 'js' : r.kieu.startsWith('image/') ? 'anh' : r.kieu.includes('font') ? 'font' : 'khac';
      theoKieu[nhom] = (theoKieu[nhom] || 0) + r.bytes;
    }
    const co3d = reqs.some((r) => /exploded3d|three/i.test(r.url));
    ketQua.push({
      ten: mt.ten,
      trangThai: 'OK',
      request: reqs.length,
      thatBai: thatBai.length,
      chiTietThatBai: thatBai,
      tongByteGiaiNen: tong,
      theoKieu,
      co3D: co3d,
    });
  }
  return ketQua;
}
