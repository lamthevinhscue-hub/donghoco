// G06-B chặng 2 — T4: mutation PHỤC VỤ THẬT qua trình duyệt.
// Bản vá: restoreFromUrl bỏ lọc → ?m=a,a,b sinh cột trùng (lỗi tái hiện).
// Bản sạch: không cột trùng. Server tĩnh phục vụ hai dist (sạch/đã vá).
// Chạy qua playwright-cli run-code (page dùng làm nguyên liệu tạo context).
async (page) => {
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => K.push({ ca, dat: dat === true, chiTiet: String(chiTiet) });
  const browser = page.context().browser();

  const doCot = async (url) => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'load' });
    await p.waitForTimeout(150);
    const r = await p.evaluate(() => Array.from(document.querySelectorAll('#compare-header th span')).map((s) => s.textContent));
    await ctx.close();
    return r;
  };

  // Bản sạch qua server tĩnh (4598): không cột trùng với ?m=a,a,b
  const sach = await doCot('http://127.0.0.1:4598/so-sanh/?m=rolex-submariner,rolex-submariner,omega-speedmaster');
  ghi('T4-sạch: ?m=a,a,b → 2 cột mẫu (đã loại trùng)', sach.length === 2, JSON.stringify(sach));

  // Bản vá qua server tĩnh (4599): lỗi tái hiện — cột trùng xuất hiện
  const va = await doCot('http://127.0.0.1:4599/so-sanh/?m=rolex-submariner,rolex-submariner,omega-speedmaster');
  ghi('T4-vá: lọc bị bỏ → 3 cột mẫu có TRÙNG (mutation tái hiện được)', va.length === 3 && va[0] === va[1], JSON.stringify(va));

  return { tong: K.length, dat: K.filter((x) => x.dat).length, ketQua: K };
}
