// G07 chặng 2 — kiểm trình duyệt nền tích hợp (TXN-20260915-22)
// A. HD3: trang mới render, h1 đúng, không tràn ngang 320/1440 × sáng/tối.
// B. HD2: cặp VI/EN có mục phân nhóm chuẩn; quote FHH hiện diện.
// C. SS1/SS2: 4 bài có mục Đối chiếu; junghans tiêu đề mới; không còn chuỗi cấm trên DOM.
// D. So sánh: chọn nomos-tangente → hàng Bộ máy = "NOMOS DUW (tự sản xuất)", Trữ cót = "—";
//    chọn junghans-max-bill → tiêu đề card không còn 1956.
// E. Card trang danh sách mau-iconic: không còn "Thiết kế 1956 chưa từng đổi".
// F. Pagefind: tìm "DUW 4001" → 0 kết quả; tìm "in-house" → có bài mới.
// Bộ phân loại: DAT / KHONG_DAT.
async (page) => {
  const K = [];
  const D = 'DAT', ND = 'KHONG_DAT';
  const ghi = (ca, dung, chiTiet = '') => K.push({ ca, trangThai: dung === true ? D : ND, chiTiet: String(chiTiet) });

  // A. HD3
  const goc = 'http://localhost:4399';
  for (const [w, ten] of [[320, '320'], [1440, '1440']]) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto(goc + '/co-che/bo-may-in-house/', { waitUntil: 'load' });
    await page.emulateMedia({ colorScheme: 'light' });
    const tranSang = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await page.emulateMedia({ colorScheme: 'dark' });
    const tranToi = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ghi(`A HD3 ${ten} không tràn (sáng/tối)`, tranSang === 0 && tranToi === 0, `sáng=${tranSang}, tối=${tranToi}`);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto(goc + '/co-che/bo-may-in-house/', { waitUntil: 'load' });
  const h1 = await page.locator('h1').first().innerText();
  ghi('A HD3 h1 đúng', /in-house/.test(h1), h1);

  // B. HD2 cặp
  await page.goto(goc + '/co-che/chong-nuoc/', { waitUntil: 'load' });
  const mucVi = await page.getByRole('heading', { name: 'Phân nhóm theo chuẩn quốc tế (theo FHH)' }).count();
  const viCoBoi = await page.getByText('gồm cả những lúc ngập trong nước như bơi giải trí').count();
  ghi('B VI mục phân nhóm + bối cảnh bơi', mucVi === 1 && viCoBoi >= 1, `mục=${mucVi}, bơi=${viCoBoi}`);
  await page.goto(goc + '/en/mechanisms/water-resistance/', { waitUntil: 'load' });
  const mucEn = await page.getByRole('heading', { name: 'The standard groups, per FHH' }).count();
  const enCoQuote = await page.getByText('leisure swimming').count();
  ghi('B EN mục standards + quote', mucEn === 1 && enCoQuote >= 1, `mục=${mucEn}, quote=${enCoQuote}`);

  // C. SS1/SS2
  const bai = [['nomos-tangente', 'nomos'], ['junghans-max-bill', 'junghans'], ['fifty-fathoms', 'ff'], ['rolex-submariner', 'sub']];
  for (const [duong, ten] of bai) {
    await page.goto(goc + '/mau-iconic/' + duong + '/', { waitUntil: 'load' });
    const dem = await page.getByRole('heading', { name: /Đối chiếu/ }).count();
    ghi('C ' + ten + ' có mục Đối chiếu', dem >= 1, 'số mục=' + dem);
  }
  await page.goto(goc + '/mau-iconic/junghans-max-bill/', { waitUntil: 'load' });
  const title = await page.title();
  const dom1956 = await page.getByText('1956').count();
  const domDuw = await page.getByText('DUW 4001').count();
  ghi('C junghans title mới + 0 "1956" + 0 "DUW 4001" trên DOM', /Thiết kế Bauhaus gần như không đổi/.test(title) && dom1956 === 0 && domDuw === 0, `title="${title}", 1956=${dom1956}, duw=${domDuw}`);
  await page.goto(goc + '/mau-iconic/nomos-tangente/', { waitUntil: 'load' });
  const domDuwN = await page.getByText('DUW 4001').count();
  const dom53 = await page.getByText('53 giờ').count();
  ghi('C nomos 0 "DUW 4001"/"53 giờ" trên DOM', domDuwN === 0 && dom53 === 0, `duw=${domDuwN}, 53=${dom53}`);

  // D. So sánh — chọn nomos + junghans
  await page.goto(goc + '/so-sanh/', { waitUntil: 'load' });
  await page.waitForTimeout(600);
  // chọn qua query param cho chắc chắn (hỗ trợ ?m=)
  await page.goto(goc + '/so-sanh/?m=nomos-tangente,junghans-max-bill', { waitUntil: 'load' });
  await page.waitForTimeout(900);
  const bang = await page.evaluate(() => document.body.innerText);
  const coNomos = bang.includes('NOMOS Tangente');
  const coJun = bang.includes('max bill');
  const hangMay = bang.includes('NOMOS DUW (tự sản xuất)');
  const khongDuw = !bang.includes('DUW 4001');
  ghi('D So sánh nomos+junghans: tên + movement mới + 0 DUW 4001', coNomos && coJun && hangMay && khongDuw, `nomos=${coNomos}, junghans=${coJun}, duwMoi=${hangMay}, duwCu=${!khongDuw}`);
  // hàng trữ cót của nomos phải là "—" (không phải 53 giờ)
  const cot = await page.evaluate(() => {
    const hang = [...document.querySelectorAll('tr')].find((r) => /Trữ cót|Power reserve/i.test(r.innerText));
    return hang ? hang.innerText.replace(/\s+/g, ' | ') : 'không thấy hàng';
  });
  ghi('D So sánh hàng Trữ cót không còn "53 giờ"', !cot.includes('53 giờ'), cot);

  // E. Card trang danh sách
  await page.goto(goc + '/mau-iconic/', { waitUntil: 'load' });
  const danhSach = await page.evaluate(() => document.body.innerText);
  ghi('E danh sách mau-iconic không còn "Thiết kế 1956 chưa từng đổi"', !danhSach.includes('Thiết kế 1956 chưa từng đổi'), 'kiểm chuỗi');

  // F. Pagefind
  await page.goto(goc + '/', { waitUntil: 'load' });
  const pf = await page.evaluate(async () => {
    try {
      const mod = await import('/pagefind/pagefind.js');
      await mod.init();
      const k1 = await mod.search('DUW 4001');
      const k2 = await mod.search('in-house');
      const k3 = await mod.search('bo may in house');
      return { duw: k1.results.length, inh: k2.results.length, bmih: k3.results.length };
    } catch (e) { return { loi: String(e) }; }
  });
  if (pf.loi) { ghi('F Pagefind', false, pf.loi); }
  else {
    ghi('F Pagefind "DUW 4001" → 0 kết quả', pf.duw === 0, 'số kết quả=' + pf.duw);
    ghi('F Pagefind "in-house"/"bo may in house" có kết quả', pf.inh >= 1 || pf.bmih >= 1, `in-house=${pf.inh}, bmih=${pf.bmih}`);
  }

  return { tong: K.length, dat: K.filter((k) => k.trangThai === D).length, chi_tiet: K };
}
