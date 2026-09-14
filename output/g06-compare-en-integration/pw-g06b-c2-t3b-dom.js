// G06-B chặng 2 vòng sửa 2 — T3b-render bằng CÙNG MỘT hàm kiểm DOM cho ba
// trạng thái: bản sạch (preview 4321), bản render lỗi (server tĩnh 4599 — CHỈ
// vá đường render, blob Tank giữ nguyên rỗng + cờ che), bản khôi phục (4598 —
// bản vá đã được hoàn nguyên về byte gốc).
// Kỳ vọng duy nhất: ba ô Tank (bộ máy/trữ cót/chống nước) = nhãn đã duyệt theo
// ngôn ngữ. Bản sạch + khôi phục phải ĐẠT; bản lỗi phải KHÔNG ĐẠT với chi tiết
// ngôn ngữ/hàng/kỳ vọng/thực tế.
async (page) => {
  const NHAN = {
    vi: 'Chưa đủ dữ liệu để đối chiếu',
    en: 'Not enough data to compare',
  };
  const HANG = {
    vi: ['Bộ máy', 'Trữ cót', 'Chống nước'],
    en: ['Movement', 'Power reserve', 'Water resistance'],
  };
  // Cùng một hàm kiểm DOM cho mọi trạng thái/ngôn ngữ (nhãn hàng theo ngôn ngữ)
  const kiemOnTank = async (base, lang) => {
    const duong = lang === 'vi' ? '/so-sanh/' : '/en/compare/';
    const ctx = await page.context().browser().newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    await p.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
    await p.goto(base + duong + '?m=cartier-tank,rolex-submariner,omega-speedmaster', { waitUntil: 'load' });
    await p.waitForTimeout(150);
    const doc = await p.evaluate((hangTen) => {
      const hang = Array.from(document.querySelectorAll('#compare-body tr'));
      return hangTen.map((ten) => {
        const tr = hang.find((x) => x.cells[0]?.textContent.trim() === ten);
        const cot = tr ? { 'cartier-tank': tr.cells[1]?.textContent.trim(), 'rolex-submariner': tr.cells[2]?.textContent.trim(), 'omega-speedmaster': tr.cells[3]?.textContent.trim() } : null;
        return { hang: ten, cot };
      });
    }, HANG[lang]);
    await ctx.close();
    const kyVong = NHAN[lang];
    const ca = doc.map((x) => ({ hang: x.hang, kyVong, thucTe: x.cot ? x.cot['cartier-tank'] : '(không có hàng)' }));
    const dat = ca.every((x) => x.thucTe === kyVong);
    return { lang, dat, ca, chiTiet: ca.map((x) => `${x.hang}: kỳ vọng="${x.kyVong}" thực tế="${x.thucTe}"`).join(' ; ') };
  };

  const K = [];
  const ketQua = { sach: {}, loi: {}, khoiPhuc: {} };

  // 1) Bản sạch (preview 4321)
  for (const lang of ['vi', 'en']) {
    const r = await kiemOnTank('http://localhost:4321', lang);
    ketQua.sach[lang] = r;
    K.push({ trangThai: 'ĐẠT/KHÔNG ĐẠT', ca: `sạch ${lang.toUpperCase()}: ba ô Tank = nhãn đã duyệt`, dat: r.dat, chiTiet: r.chiTiet });
  }

  // 2) Bản render lỗi (chỉ vá đường render — blob giữ nguyên)
  for (const lang of ['vi', 'en']) {
    const r = await kiemOnTank('http://127.0.0.1:4599', lang);
    ketQua.loi[lang] = r;
    K.push({ trangThai: 'QUAN SÁT — bộ kiểm THẤT BẠI trên bản lỗi (đúng mong đợi của mutation)', ca: `lỗi ${lang.toUpperCase()}: bộ kiểm phát hiện ô sai nhãn`, dat: !r.dat, chiTiet: r.chiTiet });
  }

  // 3) Bản khôi phục (hoàn nguyên về byte gốc)
  for (const lang of ['vi', 'en']) {
    const r = await kiemOnTank('http://127.0.0.1:4598', lang);
    ketQua.khoiPhuc[lang] = r;
    K.push({ trangThai: 'ĐẠT/KHÔNG ĐẠT', ca: `khôi phục ${lang.toUpperCase()}: đạt trở lại`, dat: r.dat, chiTiet: r.chiTiet });
  }

  const tongDat = K.filter((x) => x.dat).length;
  return {
    tong: K.length,
    dat: tongDat,
    khongDat: K.length - tongDat,
    // mutation ĐẠT khi: sạch ĐẠT + lỗi bị THẤT BẠI (4/4 phiến) + khôi phục ĐẠT
    mutationDat: tongDat === K.length && Object.values(ketQua.loi).every((x) => x.dat === false),
    ketQua,
    phanLoai: K,
  };
}
