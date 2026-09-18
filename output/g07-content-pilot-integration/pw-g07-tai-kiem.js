// G07 — tái kiểm 2 ca: (a) mục đối chiếu ở bài Submariner (heading thật);
// (b) Pagefind chuỗi chính xác "DUW 4001" = 0 + bài mới có trong index
async (page) => {
  const goc = 'http://localhost:4399';
  const K = [];
  const D = 'DAT', ND = 'KHONG_DAT';
  const ghi = (ca, dung, chiTiet = '') => K.push({ ca, trangThai: dung === true ? D : ND, chiTiet: String(chiTiet) });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(goc + '/mau-iconic/rolex-submariner/', { waitUntil: 'load' });
  const muc = await page.getByRole('heading', { name: 'Fifty Fathoms — người đồng hành cùng thế hệ 1953' }).count();
  const noiDung = await page.getByText('không nói lên ai sao chép ai').count();
  ghi('C sub mục đối chiếu (heading thật + link + luận điểm)', muc === 1 && noiDung >= 1, `mục=${muc}, luận điểm=${noiDung}`);

  await page.goto(goc + '/', { waitUntil: 'load' });
  const pf = await page.evaluate(async () => {
    const mod = await import('/pagefind/pagefind.js');
    await mod.init();
    const k1 = await mod.search('"DUW 4001"');
    const k2 = await mod.search('bộ máy in-house nghĩa là gì');
    const ds2 = [];
    for (const r of k2.results.slice(0, 8)) {
      const d = await r.data();
      ds2.push(d.url);
    }
    return { chinhXac: k1.results.length, bmih: ds2.some((u) => u.includes('bo-may-in-house')), mau: ds2 };
  });
  ghi('F Pagefind chuỗi chính xác "DUW 4001" = 0', pf.chinhXac === 0, 'kết quả=' + pf.chinhXac);
  ghi('F Pagefind index có bài bo-may-in-house', pf.bmih === true, 'mẫu=' + JSON.stringify(pf.mau.slice(0, 4)));

  return { tong: K.length, dat: K.filter((k) => k.trangThai === D).length, chi_tiet: K };
}
