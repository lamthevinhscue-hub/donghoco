// G06-B chặng 2 — kiểm hành vi chính /so-sanh/ + /en/compare/ (M2, M4-M9, RM-C1).
// Kết quả: JSON trả về qua run-code; log lưu log-c2-hanh-vi.txt; ảnh shots/.
async (page) => {
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => K.push({ ca, dat: dat === null ? null : dat === true, trangThai: dat === null ? 'QUAN_SAT' : (dat ? 'DAT' : 'KHONG_DAT'), chiTiet: String(chiTiet) });
  const BASE = 'http://localhost:4321';
  const CHUOI_VI_CAN = ['Thêm mẫu để so sánh:', '— Chọn một mẫu —', 'Chưa chọn mẫu nào', 'Tiêu chí', 'Link chia sẻ:', 'Chưa đủ dữ liệu để đối chiếu'];
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());

  // ============ EN: trạng thái + DOM sau tương tác (M4, M5, M6, M7, M8) ============
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(BASE + '/en/compare/', { waitUntil: 'load' });
  await page.waitForTimeout(150);

  // E1: trạng thái rỗng + no-VI-strings trong body text
  const e1 = await page.evaluate((chuoiVi) => {
    const body = document.body.innerText;
    const conVi = chuoiVi.filter((s) => body.includes(s));
    return {
      tbRong: document.getElementById('compare-empty-content')?.textContent ?? '',
      conVi,
      gioiHanHien: document.body.innerText.includes('Years and specifications are drawn from each'),
      chuThichHien: document.body.innerText.includes('not stated in the model'),
      phamViHien: document.body.innerText.includes('Only models with published English articles'),
      h1: document.querySelector('h1')?.textContent,
      nhap3D: document.querySelectorAll('#model-select option').length,
    };
  }, CHUOI_VI_CAN);
  ghi('E1 EN rỗng: tbRong EN + 0 chuỗi VI trong body + h1 + 5 option (4 mẫu EN + placeholder)', e1.tbRong.includes('No models selected yet') && e1.conVi.length === 0 && e1.h1 === 'Compare iconic models' && e1.nhap3D === 5, `conVi=${e1.conVi.length}, option=${e1.nhap3D}`);

  // E2: thêm 2 mẫu bằng phím thật? — ở đây dùng selectOption (MÔ PHỎNG) để dựng trạng thái,
  // phép thử bàn phím thật ở script riêng pw-g06b-c2-phim.js
  await page.selectOption('#model-select', 'cartier-tank');
  await page.dispatchEvent('#model-select', 'change');
  await page.selectOption('#model-select', 'omega-speedmaster');
  await page.dispatchEvent('#model-select', 'change');
  await page.waitForTimeout(100);
  const e2 = await page.evaluate(() => {
    const o = (tr, c) => document.querySelectorAll('#compare-body tr')[tr]?.cells[c]?.textContent ?? '';
    const nhanNut = Array.from(document.querySelectorAll('#compare-header [data-remove]')).map((b) => b.getAttribute('aria-label'));
    return {
      cot: document.querySelectorAll('#compare-header th').length,
      hang: document.querySelectorAll('#compare-body tr').length,
      nam: o(0, 1) + ' | ' + o(0, 2),
      tankThieu: [o(3, 1), o(4, 1), o(5, 1)],
      speedMoTa: o(6, 2),
      nhanNut,
      nenHang0: getComputedStyle(document.querySelectorAll('#compare-body tr')[0]).backgroundColor,
    };
  });
  ghi('E2 EN 2 mẫu: 3 th (Tiêu chí + 2 cột) × 7 hàng; Tank "1917 — Designed" + 3 ô Not enough data; Speedmaster câu Apollo; aria nút bỏ có tên mẫu', e2.cot === 3 && e2.hang === 7 && e2.nam.includes('1917 — Designed') && e2.nam.includes('1957') && e2.tankThieu.every((x) => x === 'Not enough data to compare') && e2.speedMoTa.trim() === "The chronograph associated with NASA's Apollo programme — one of the watches that went to the Moon." && e2.nhanNut.every((n) => /^Remove .+/.test(n)), JSON.stringify({ cot: e2.cot, hang: e2.hang, nam: e2.nam, tank: e2.tankThieu, moTa: e2.speedMoTa, nut: e2.nhanNut }));

  // E3: GMT không có ở EN; kiểm Speedmaster year KHÔNG kèm note
  const e3 = await page.evaluate(() => document.querySelectorAll('#compare-body tr')[0]?.cells[2]?.textContent);
  ghi('E3 Speedmaster year trần không kèm note', e3 === '1957', `year=${e3}`);

  // E4: thêm mẫu thứ 3 rồi vượt giới hạn (nút) — chặn. EN chỉ có 4 mẫu nên
  // mẫu thử vượt giới hạn là mẫu EN còn lại (rolex-gmt-master).
  await page.selectOption('#model-select', 'rolex-submariner');
  await page.dispatchEvent('#model-select', 'change');
  await page.selectOption('#model-select', 'rolex-gmt-master');
  await page.click('#add-model');
  await page.waitForTimeout(60);
  const e4 = await page.evaluate(() => ({ cot: document.querySelectorAll('#compare-header th').length, url: decodeURIComponent(location.search) }));
  ghi('E4 vượt 3 mẫu: nút chặn, URL giữ 3', e4.cot === 4 && (e4.url.match(/,/g) || []).length === 2, `cột=${e4.cot}, url=${e4.url}`);

  // E5: bỏ mẫu — focus tới nút bỏ kế tiếp cùng vị trí (không rơi BODY)
  await page.focus('#compare-header [data-remove]');
  await page.keyboard.press('Enter'); // phím thật để kích nút bỏ giữa
  await page.waitForTimeout(80);
  const e5 = await page.evaluate(() => {
    const nut = Array.from(document.querySelectorAll('#compare-header [data-remove]'));
    return { soNut: nut.length, focusLaNut: document.activeElement?.hasAttribute('data-remove'), focusKhongBody: document.activeElement?.tagName !== 'BODY' };
  });
  ghi('E5 bỏ mẫu bằng Enter thật: còn 2 nút bỏ, focus đậu trên nút bỏ (không BODY)', e5.soNut === 2 && e5.focusLaNut === true, `nút=${e5.soNut}, focus-nút=${e5.focusLaNut}`);

  // E6: URL trùng lặp giờ bị LOẠI TRÙNG (thay đổi so chặng 1) + slug sai lọc + 5 slug slice 3
  await page.goto(BASE + '/en/compare/?m=rolex-submariner,rolex-submariner,omega-speedmaster', { waitUntil: 'load' });
  const e6a = await page.evaluate(() => Array.from(document.querySelectorAll('#compare-header th span')).map((s) => s.textContent));
  ghi('E6a URL trùng: loại trùng còn 2 cột mẫu (2 span tiêu đề, tổng 3 th)', e6a.length === 2, `th span=${e6a.length}`);
  await page.goto(BASE + '/en/compare/?m=rolex-submariner,slug-sai,omega-speedmaster,doxa-sub-300,fifty-fathoms-en-sai', { waitUntil: 'load' });
  const e6b = await page.evaluate(() => document.querySelectorAll('#compare-header th').length);
  ghi('E6b slug sai lọc: input 5 slug chỉ 2 slug hợp lệ ở EN → 3 th (Tiêu chí + 2)', e6b === 3, `cột=${e6b}`);

  // E7: link chia sẻ hiển thị ngay khi khôi phục từ URL
  const e7 = await page.evaluate(() => ({ hien: !document.getElementById('share-link-wrap')?.classList.contains('hidden'), link: document.getElementById('share-link')?.textContent }));
  ghi('E7 link chia sẻ hiện ngay khi khôi phục, khớp URL', e7.hien === true && e7.link === page.url(), `link=${e7.link}`);

  // ============ VI: đối xứng + GMT "—" + câu VI ============
  await page.goto(BASE + '/so-sanh/?m=rolex-gmt-master,cartier-tank', { waitUntil: 'load' });
  await page.waitForTimeout(120);
  const v1 = await page.evaluate(() => {
    const o = (tr, c) => document.querySelectorAll('#compare-body tr')[tr]?.cells[c]?.textContent ?? '';
    return {
      gmtThieu: [o(3, 1), o(4, 1), o(5, 1)],
      gmtNam: o(0, 1),
      tankNam: o(0, 2),
      tankMoTa: o(6, 2),
      chuThich: document.body.innerText.includes('— = bài chưa ghi thông số này'),
      gioiHan: document.body.innerText.includes('Năm và thông số được trích từ hồ sơ từng mẫu'),
    };
  });
  ghi('V1 VI: GMT 3 ô "—" (khác nhãn Tank) + Tank "1917 — Thiết kế" + câu mô tả Tank + chú thích/câu giới hạn VI', v1.gmtThieu.every((x) => x === '—') && v1.gmtNam === '1955' && v1.tankNam === '1917 — Thiết kế' && v1.tankMoTa === 'Mẫu đồng hồ chữ nhật lấy cảm hứng từ xe tăng trong Thế chiến thứ nhất.' && v1.chuThich && v1.gioiHan, JSON.stringify({ gmt: v1.gmtThieu[0], tankNam: v1.tankNam }));

  // V2: Speedmaster VI câu chốt
  await page.selectOption('#model-select', 'omega-speedmaster');
  await page.dispatchEvent('#model-select', 'change');
  await page.waitForTimeout(80);
  const v2 = await page.evaluate(() => document.querySelectorAll('#compare-body tr')[6]?.cells[3]?.textContent);
  ghi('V2 Speedmaster VI: câu Apollo chốt ở ô mô tả', v2 === 'Chronograph gắn với chương trình Apollo của NASA — một trong những chiếc đồng hồ đã lên Mặt Trăng.', v2);

  // V3: cấu trúc vùng cuộn — đúng MỘT .table-scroll-wrap ở CẢ HAI luồng
  await page.goto(BASE + '/so-sanh/?m=rolex-submariner,omega-speedmaster,cartier-tank', { waitUntil: 'load' });
  const v3a = await page.evaluate(() => ({ soVung: document.querySelectorAll('.table-scroll-wrap').length, tabindex: document.getElementById('compare-table-wrap')?.getAttribute('tabindex'), role: document.getElementById('compare-table-wrap')?.getAttribute('role') }));
  await page.goto(BASE + '/so-sanh/', { waitUntil: 'load' });
  await page.selectOption('#model-select', 'rolex-submariner');
  await page.dispatchEvent('#model-select', 'change');
  await page.selectOption('#model-select', 'omega-speedmaster');
  await page.dispatchEvent('#model-select', 'change');
  await page.selectOption('#model-select', 'cartier-tank');
  await page.dispatchEvent('#model-select', 'change');
  await page.waitForTimeout(150);
  const v3b = await page.evaluate(() => ({ soVung: document.querySelectorAll('.table-scroll-wrap').length, tabindex: document.getElementById('compare-table-wrap')?.getAttribute('tabindex') }));
  ghi('V3 vùng cuộn tự quản: đúng 1 vùng .table-scroll-wrap cả hai luồng (không bọc lồng), tabindex=0', v3a.soVung === 1 && v3b.soVung === 1 && v3a.tabindex === '0' && v3b.tabindex === '0', JSON.stringify({ url: v3a, tay: v3b }));

  // V4: đã chuyển sang pw-g06b-c2-phim-bocuc.js đo ở 320px (1280px bảng vừa, không có tràn → không cuộn)
  // V5: menu/switcher trên trang VI (M2)
  const v5 = await page.evaluate(() => {
    const sw = Array.from(document.querySelectorAll('header a')).find((x) => x.getAttribute('hreflang') === 'en');
    return { swHref: sw?.getAttribute('href'), khongViOnly: !document.querySelector('header')?.innerText.includes('Vietnamese only') };
  });
  // ============ RM-C1: reduced-motion — thao tác như thường ============
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(BASE + '/so-sanh/', { waitUntil: 'load' });
  await page.selectOption('#model-select', 'rolex-submariner');
  await page.dispatchEvent('#model-select', 'change');
  await page.selectOption('#model-select', 'omega-speedmaster');
  await page.dispatchEvent('#model-select', 'change');
  await page.waitForTimeout(100);
  const rm = await page.evaluate(() => ({ cot: document.querySelectorAll('#compare-header th').length, url: decodeURIComponent(location.search), nam0: document.querySelectorAll('#compare-body tr')[0]?.cells[1]?.textContent }));
  ghi('RM-C1 reduce: thêm mẫu như thường, trạng thái cuối giống thường', rm.cot === 3 && rm.nam0 === '1953', `cột=${rm.cot}, url=${rm.url}`);
  await page.emulateMedia({ reducedMotion: 'no-preference' });

  return { tong: K.length, dat: K.filter((x) => x.dat === true).length, khongDat: K.filter((x) => x.dat === false).length, quanSat: K.filter((x) => x.dat === null).length, ketQua: K, v5 };
}
