// G07 vòng sửa 2 (TXN-20260917-26) — kiểm lại Tangente / HD3 / So sánh sau build
// Sau khi gỡ "rất ít hãng ở tầm giá này" + "nhà chế tác thật, không phải nền mua ngoài"
// và trung tính hóa relatedMechanisms.
async (page) => {
  const K = [];
  const D = 'DAT', ND = 'KHONG_DAT';
  const ghi = (ca, dung, chiTiet = '') => K.push({ ca, trangThai: dung === true ? D : ND, chiTiet: String(chiTiet) });
  const goc = 'http://localhost:4399';

  const tran = async () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  const demChu = (chu) => page.getByText(chu).count();

  // 1. Tangente 320/1440 — không tràn
  for (const [w, ten] of [[320, '320'], [1440, '1440']]) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto(goc + '/mau-iconic/nomos-tangente/', { waitUntil: 'load' });
    await page.emulateMedia({ colorScheme: 'light' });
    const ts = await tran();
    await page.emulateMedia({ colorScheme: 'dark' });
    const td = await tran();
    ghi(`1 Tangente ${ten} không tràn (sáng/tối)`, ts === 0 && td === 0, `sáng=${ts}, tối=${td}`);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto(goc + '/mau-iconic/nomos-tangente/', { waitUntil: 'load' });

  // 2. DOM 0 cụm bị gỡ + giữ mức SS2-03 có "theo hãng"
  const c1 = await demChu('rất ít hãng');
  const c2 = await demChu('nhà chế tác thật');
  const c3 = await demChu('nền mua ngoài');
  const c4 = await demChu('biểu hiện rõ nhất');
  const c5 = await demChu('Tangente hưởng lợi');
  ghi('2 Tangente DOM 0 cụm bị gỡ', c1 === 0 && c2 === 0 && c3 === 0 && c4 === 0 && c5 === 0, `rhat=${c1}, nct=${c2}, nmo=${c3}, brn=${c4}, hl=${c5}`);
  const mucSS03 = await demChu('theo hãng, hầu như không hãng nào khác trên thế giới thực hiện được');
  ghi('2 Tangente giữ SS2-03 đúng mức "theo hãng"', mucSS03 >= 1, 'số khớp=' + mucSS03);

  // 3. Khối liên kết HD3 — relation trung tính mới + link còn hoạt động
  const lienKetHd3 = await page.locator('a[href="/co-che/bo-may-in-house"]').count();
  const relationMoi = await demChu('Bài giải thích khái niệm in-house và giới hạn của khái niệm');
  ghi('3 Tangente link HD3 + relation trung tính mới', lienKetHd3 >= 1 && relationMoi >= 1, `link=${lienKetHd3}, relation=${relationMoi}`);

  // 4. HD3 tải bình thường sau sửa liên kết ngược (không đổi nội dung tệp)
  await page.goto(goc + '/co-che/bo-may-in-house/', { waitUntil: 'load' });
  const h1 = await page.locator('h1').first().innerText();
  const caoNhat = await demChu('mức tự chủ cao nhất');
  ghi('4 HD3 h1 đúng + 0 "mức tự chủ cao nhất"', /in-house/.test(h1) && caoNhat === 0, 'h1="' + h1 + '", caoNhat=' + caoNhat);

  // 5. So sánh — hàng Bộ máy giữ nguyên mức đã duyệt
  await page.goto(goc + '/so-sanh/?m=nomos-tangente,junghans-max-bill', { waitUntil: 'load' });
  await page.waitForTimeout(900);
  const bang = await page.evaluate(() => document.body.innerText);
  ghi('5 So sánh hàng Bộ máy "NOMOS DUW (tự sản xuất)"', bang.includes('NOMOS DUW (tự sản xuất)'), 'kiểm chuỗi');

  // 6. Ảnh bằng chứng
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(goc + '/mau-iconic/nomos-tangente/', { waitUntil: 'load' });
  await page.screenshot({ path: 'output/g07-content-pilot-integration/shots/vs2-tangente-1440-sang.png', fullPage: false });
  ghi('6 ảnh bằng chứng vs2 đã lưu', true, 'shots/vs2-tangente-1440-sang.png');

  return { tong: K.length, dat: K.filter((k) => k.trangThai === D).length, chi_tiet: K };
}
