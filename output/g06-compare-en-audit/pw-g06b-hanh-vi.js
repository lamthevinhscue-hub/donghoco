// G06-B chặng 1 — kiểm hành vi nền công cụ /so-sanh trên bản dựng (không sửa mã).
// Chạy qua playwright-cli run-code (hàm nhận page); kết quả JSON in stdout,
// lưu log-kiem-hanh-vi.txt + ảnh shots/*.png
async (page) => {
  const BASE = 'http://localhost:4321';
  const URL = BASE + '/so-sanh/';
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => K.push({ ca, dat: dat === null ? null : dat === true, trangThai: dat === null ? 'QUAN_SAT' : (dat ? 'DAT' : 'KHONG_DAT'), chiTiet: String(chiTiet) });
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  const browser = page.context().browser();

  // ============ A. Trạng thái chọn: 0/1/2/3 mẫu + trùng + vượt giới hạn ============
  await page.setViewportSize({ width: 1280, height: 900 });
  const loi = [];
  page.on('pageerror', (e) => loi.push(String(e).slice(0, 120)));
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('#model-select', { timeout: 30000 });

  // A1: select đủ 69 mẫu + 1 placeholder
  const soOption = await page.evaluate(() => document.querySelectorAll('#model-select option').length);
  const placeholder = await page.evaluate(() => document.querySelector('#model-select option')?.value);
  ghi('A1 select có 70 option (69 mẫu + placeholder rỗng)', soOption === 70 && placeholder === '', `option=${soOption}, value đầu="${placeholder}"`);

  // A2/A3: trạng thái 0 mẫu
  const tb0 = await page.evaluate(() => document.getElementById('compare-empty-content')?.textContent ?? '');
  ghi('A2 0 mẫu: có thông báo mời chọn', tb0.includes('Chưa chọn mẫu nào'), `text="${tb0.slice(0, 60)}"`);
  const bang0An = await page.evaluate(() => document.getElementById('compare-table-wrap')?.classList.contains('hidden'));
  ghi('A3 0 mẫu: bảng ẩn', bang0An === true, `hidden=${bang0An}`);

  // A4/A5: 1 mẫu
  await page.selectOption('#model-select', 'rolex-submariner');
  await page.dispatchEvent('#model-select', 'change');
  await page.waitForTimeout(80);
  const st1 = await page.evaluate(() => ({
    panel: document.getElementById('compare-empty-content')?.textContent ?? '',
    bangAn: document.getElementById('compare-table-wrap')?.classList.contains('hidden'),
    url: location.search,
  }));
  ghi('A4 1 mẫu: panel Đã chọn + tên mẫu, bảng ẩn', st1.panel.includes('Đã chọn') && st1.panel.includes('Rolex Submariner') && st1.bangAn === true, `panel="${st1.panel.slice(0, 48)}…"`);
  ghi('A5 1 mẫu: URL có ?m=rolex-submariner', st1.url === '?m=rolex-submariner', `url="${st1.url}"`);

  // A6: 3 mẫu — bảng 4 cột × 7 hàng
  await page.selectOption('#model-select', 'omega-speedmaster');
  await page.dispatchEvent('#model-select', 'change');
  await page.selectOption('#model-select', 'cartier-tank');
  await page.dispatchEvent('#model-select', 'change');
  await page.waitForTimeout(80);
  const st3 = await page.evaluate(() => ({
    soCot: document.querySelectorAll('#compare-header th').length,
    bangHien: !document.getElementById('compare-table-wrap')?.classList.contains('hidden'),
    soHang: document.querySelectorAll('#compare-body tr').length,
    hangDau: Array.from(document.querySelectorAll('#compare-body tr')[0]?.cells ?? []).map((c) => c.textContent),
  }));
  ghi('A6 3 mẫu: bảng 4 cột × 7 hàng, hàng Năm đúng', st3.soCot === 4 && st3.soHang === 7 && st3.hangDau[1] === '1953' && st3.hangDau[2] === '1957' && st3.hangDau[3] === '1917', `cột=${st3.soCot} hàng=${st3.soHang} năm=[${st3.hangDau.slice(1).join('|')}]`);

  // A7: giá trị Submariner khớp frontmatter
  const cotSub = await page.evaluate(() => Array.from(document.querySelectorAll('#compare-body tr')).map((tr) => tr.cells[1]?.textContent));
  const dungSub = cotSub[0] === '1953' && cotSub[1] === 'Rolex' && cotSub[2] === 'Lặn' && cotSub[3] === 'Calibre 3230 / 3235' && cotSub[4] === '70 giờ' && cotSub[5] === '300m';
  ghi('A7 cột Submariner: 1953/Rolex/Lặn/3230-3235/70 giờ/300m', dungSub, cotSub.join(' | '));

  // A8: chọn trùng — không tăng cột
  await page.selectOption('#model-select', 'rolex-submariner');
  await page.dispatchEvent('#model-select', 'change');
  await page.waitForTimeout(60);
  const soCotSauTrung = await page.evaluate(() => document.querySelectorAll('#compare-header th').length);
  ghi('A8 chọn trùng: không tăng cột', soCotSauTrung === 4, `cột=${soCotSauTrung}`);

  // A9: vượt 3 mẫu — nút Thêm và change đều chặn
  await page.selectOption('#model-select', 'doxa-sub-300');
  await page.click('#add-model');
  await page.waitForTimeout(60);
  const soCotVuot = await page.evaluate(() => document.querySelectorAll('#compare-header th').length);
  const urlVuot = await page.evaluate(() => location.search);
  ghi('A9 vượt 3 mẫu: chặn cả hai đường (nút + change)', soCotVuot === 4 && ((urlVuot.match(/,/g) || []).length + (urlVuot.match(/%2C/g) || []).length) === 2, `cột=${soCotVuot}, url="${urlVuot}"`);

  // A10: URL slug sai — lọc bỏ
  await page.goto(URL + '?m=rolex-submariner,slug-khong-ton-tai,omega-speedmaster', { waitUntil: 'load' });
  const cotSai = await page.evaluate(() => document.querySelectorAll('#compare-header th').length);
  const tieuDeCot = await page.evaluate(() => Array.from(document.querySelectorAll('#compare-header th span')).map((s) => s.textContent));
  ghi('A10 URL slug sai: lọc bỏ, còn 2 cột đúng', cotSai === 3 && tieuDeCot.join('|').includes('Submariner') && tieuDeCot.join('|').includes('Speedmaster'), `cột=${cotSai} [${tieuDeCot.join(' | ')}]`);

  // A11: URL trùng lặp ?m=a,a,b — quan sát
  await page.goto(URL + '?m=rolex-submariner,rolex-submariner,omega-speedmaster', { waitUntil: 'load' });
  const dup = await page.evaluate(() => ({
    soCot: document.querySelectorAll('#compare-header th').length,
    soNutBo: document.querySelectorAll('#compare-header [data-remove]').length,
    url: location.search,
  }));
  ghi('A11 URL trùng lặp: QUAN SÁT — số cột/nút bỏ sinh ra', null, `cột=${dup.soCot}, nút bỏ=${dup.soNutBo}, url="${dup.url}"`);
  await page.click('#compare-header [data-remove]');
  await page.waitForTimeout(60);
  const dupSauBo = await page.evaluate(() => ({
    soCot: document.querySelectorAll('#compare-header th').length,
    url: location.search,
  }));
  ghi('A12 bấm bỏ khi còn trùng: QUAN SÁT hệ quả', null, `còn cột=${dupSauBo.soCot}, url="${dupSauBo.url}"`);

  // A13: URL 5 slug — slice còn 3
  await page.goto(URL + '?m=rolex-submariner,omega-speedmaster,cartier-tank,doxa-sub-300,fifty-fathoms', { waitUntil: 'load' });
  const vuotUrl = await page.evaluate(() => document.querySelectorAll('#compare-header th').length);
  ghi('A13 URL 5 slug: chỉ lấy 3 đầu', vuotUrl === 4, `cột=${vuotUrl}`);

  // A14: URL toàn sai — trạng thái rỗng
  await page.goto(URL + '?m=khong,co,gij', { waitUntil: 'load' });
  const saiHet = await page.evaluate(() => ({
    bangAn: document.getElementById('compare-table-wrap')?.classList.contains('hidden'),
    text: document.getElementById('compare-empty-content')?.textContent ?? '',
  }));
  ghi('A14 URL toàn sai: trạng thái rỗng hiện lại', saiHet.bangAn === true && saiHet.text.includes('Chưa chọn'), `hidden=${saiHet.bangAn}`);

  // A15: link chia sẻ ẩn khi chỉ khôi phục từ URL
  await page.goto(URL + '?m=rolex-submariner,omega-speedmaster', { waitUntil: 'load' });
  const shareRestore = await page.evaluate(() => !document.getElementById('share-link-wrap')?.classList.contains('hidden'));
  ghi('A15 khôi phục từ URL: link chia sẻ ẩn (chỉ hiện sau thao tác)', shareRestore === false, `hiện=${shareRestore}`);

  // A16: sau một thao tác — link chia sẻ hiện khớp URL
  await page.click('#compare-header [data-remove]');
  await page.waitForTimeout(60);
  const shareOps = await page.evaluate(() => ({
    hien: !document.getElementById('share-link-wrap')?.classList.contains('hidden'),
    link: document.getElementById('share-link')?.textContent ?? '',
    url: location.href,
  }));
  ghi('A16 sau thao tác: link chia sẻ hiện và khớp URL', shareOps.hien === true && shareOps.link === shareOps.url, `link="${shareOps.link}"`);

  // A17: aria-label nút bỏ — QUAN SÁT phân biệt mẫu
  await page.goto(URL + '?m=rolex-submariner,omega-speedmaster,cartier-tank', { waitUntil: 'load' });
  const nhanBo = await page.evaluate(() => Array.from(document.querySelectorAll('#compare-header [data-remove]')).map((b) => b.getAttribute('aria-label')));
  ghi('A17 aria-label nút bỏ: QUAN SÁT — có phân biệt mẫu không', null, `nhãn=[${nhanBo.join(' | ')}]`);

  // A18: focus sau bỏ mẫu — QUAN SÁT
  await page.focus('#compare-header [data-remove]');
  const focusTruoc = await page.evaluate(() => document.activeElement?.getAttribute('data-remove'));
  await page.keyboard.press('Enter');
  await page.waitForTimeout(60);
  const focusSau = await page.evaluate(() => `${document.activeElement?.tagName}#${document.activeElement?.id || '(không id)'}`);
  ghi('A18 focus sau bỏ mẫu: QUAN SÁT vị trí focus', null, `trước=remove(${focusTruoc}), sau=${focusSau}`);

  // A19: ô bảng chỉ chứa phần tử an toàn
  const domAnToan = await page.evaluate(() => {
    const cells = Array.from(document.querySelectorAll('#compare-body td'));
    return cells.every((cell) => Array.from(cell.children).every((c) => ['STRONG', 'BUTTON', 'DIV', 'SPAN', 'P'].includes(c.tagName)));
  });
  ghi('A19 ô bảng chỉ chứa phần tử an toàn (strong/div/span)', domAnToan, 'kiểm cấu trúc DOM');
  ghi('A20 không lỗi JS trong suốt phiên A', loi.length === 0, loi.join(' ; ') || 'sạch');

  // ============ B. Không-JS ============
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
    const p2 = await ctx.newPage();
    await p2.goto(URL, { waitUntil: 'load' });
    const noJs = await p2.evaluate(() => ({
      select: Boolean(document.getElementById('model-select')),
      nutThem: Boolean(document.getElementById('add-model')),
      boxRong: document.getElementById('compare-empty-content')?.textContent ?? '(rỗng)',
      bangAn: document.getElementById('compare-table-wrap')?.classList.contains('hidden'),
    }));
    ghi('B1 no-JS: QUAN SÁT — select/nút còn, hộp trạng thái trống chữ, bảng ẩn', null, `select=${noJs.select}, nút=${noJs.nutThem}, hộp="${noJs.boxRong}", bảng ẩn=${noJs.bangAn}`);
    await ctx.close();
  }

  // ============ C. Dark mode + bố cục 4 bề rộng ============
  for (const scheme of ['light', 'dark']) {
    for (const width of [320, 768, 1024, 1440]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
      const p3 = await ctx.newPage();
      await p3.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
      await p3.goto(URL + '?m=rolex-submariner,omega-speedmaster,cartier-tank', { waitUntil: 'load' });
      await p3.waitForTimeout(120);
      const doLuong = await p3.evaluate(() => {
        const tr0 = document.querySelector('#compare-body tr');
        const td0 = tr0?.cells[0];
        const td1 = tr0?.cells[1];
        const bg = (el) => (el ? getComputedStyle(el).backgroundColor : null);
        const wrap = document.getElementById('compare-table-wrap');
        const doc = document.scrollingElement;
        return {
          bgChan: bg(td0),
          mauChuChan: td0 ? getComputedStyle(td0).color : null,
          bgLe: bg(document.querySelectorAll('#compare-body tr')[1]?.cells[0]),
          mauChuGiaTri: td1 ? getComputedStyle(td1).color : null,
          wrapTran: wrap ? wrap.scrollWidth - wrap.clientWidth : null,
          trangTran: doc ? doc.scrollWidth - window.innerWidth : null,
        };
      });
      const tr_tran = Math.max(0, Number(doLuong.trangTran) || 0);
      ghi(`C ${scheme} ${width}px: trang không tràn ngang`, tr_tran === 0, `tràn=${doLuong.trangTran}px`);
      ghi(`C ${scheme} ${width}px: QUAN SÁT nền hàng + cuộn bảng`, null, `hàng chẵn=${doLuong.bgChan} chữ=${doLuong.mauChuChan} | lẻ=${doLuong.bgLe} | giá trị chữ=${doLuong.mauChuGiaTri} | cuộn wrap ngoài=${doLuong.wrapTran}px (cuộn thật đo ở log-hai-luong.txt)`);
      await p3.screenshot({ path: `output/g06-compare-en-audit/shots/nen-${scheme}-${width}.png`, fullPage: false });
      await ctx.close();
    }
  }

  // ============ D. Không nạp chunk 3D + switcher ============
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p4 = await ctx.newPage();
    const scripts = [];
    p4.on('response', (r) => { if (r.url().includes('/_astro/')) scripts.push(r.url().split('/').pop()); });
    await p4.goto(URL + '?m=rolex-submariner,omega-speedmaster', { waitUntil: 'networkidle' });
    const co3D = scripts.some((s) => /exploded|three|orbit/i.test(s));
    ghi('D1 /so-sanh không nạp chunk 3D', !co3D, `scripts _astro: ${scripts.join(', ') || '(không có)'}`);
    const sw = await p4.evaluate(() => {
      const a = Array.from(document.querySelectorAll('header a')).find((x) => x.getAttribute('hreflang') === 'en');
      return { href: a?.getAttribute('href'), coQuery: a?.getAttribute('href')?.includes('?m=') ?? null, coBatJS: a?.hasAttribute('data-lang-switch') ?? null };
    });
    ghi('D2 switcher trên /so-sanh?m=…: QUAN SÁT đích', null, `href="${sw.href}", giữ ?m=${sw.coQuery}, cờ untranslated=${sw.coBatJS}`);
    await ctx.close();
  }

  // ============ E. canonical/hreflang /so-sanh ============
  {
    const dau = await page.evaluate(() => ({
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      hreflangVi: document.querySelector('link[rel="alternate"][hreflang="vi"]')?.getAttribute('href'),
      hreflangEn: document.querySelector('link[rel="alternate"][hreflang="en"]')?.getAttribute('href'),
      title: document.title,
    }));
    ghi('E1 /so-sanh: canonical + hreflang QUAN SÁT (chưa có cặp EN)', null, JSON.stringify(dau));
  }

  return { tong: K.length, soDat: K.filter((x) => x.dat === true).length, soKhongDat: K.filter((x) => x.dat === false).length, soQuanSat: K.filter((x) => x.dat === null).length, ketQua: K };
}
