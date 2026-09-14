// G06-B chặng 2 — M9: bàn phím THẬT (Tab/Enter/Arrow) + M10: bố cục 16 tổ hợp
// (2 route × 320/768/1024/1440 × sáng/tối) với tương phản computed thực tế.
async (page) => {
  const K = [];
  const ghi = (ca, dat, chiTiet = '') => K.push({ ca, dat: dat === true, chiTiet: String(chiTiet) });
  const BASE = 'http://localhost:4321';
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());

  // ============ M9 phím thật — luồng 1: nạp kèm ?m= (320px để bảng có tràn) ============
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(BASE + '/so-sanh/?m=rolex-submariner,omega-speedmaster,cartier-tank', { waitUntil: 'load' });
  await page.waitForTimeout(200);
  const l1 = await page.evaluate(() => ({ soVung: document.querySelectorAll('.table-scroll-wrap').length, tabindex: document.getElementById('compare-table-wrap')?.getAttribute('tabindex') }));
  // Tab thật tới vùng cuộn (vùng có tabindex=0 nên nằm trong chuỗi Tab)
  await page.evaluate(() => { document.body.focus(); });
  let gapVung = false;
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press('Tab');
    if (await page.evaluate(() => document.activeElement?.id === 'compare-table-wrap')) { gapVung = true; break; }
  }
  const l1t = gapVung ? await page.evaluate(() => document.getElementById('compare-table-wrap').scrollLeft) : -1;
  if (gapVung) {
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
  }
  const l1s = await page.evaluate(() => document.getElementById('compare-table-wrap').scrollLeft);
  ghi('M9a luồng ?m=: đúng 1 vùng .table-scroll-wrap (không bọc lồng) + Tab thật vào được + ArrowRight thật cuộn', l1.soVung === 1 && l1.tabindex === '0' && gapVung && l1s > l1t, `vùng=${l1.soVung}, tabVào=${gapVung}, scrollLeft ${l1t}→${l1s}`);

  // ============ M9 phím thật — luồng 2: thêm mẫu sau tải (chọn mẫu + bỏ mẫu bằng phím) ============
  await page.goto(BASE + '/so-sanh/', { waitUntil: 'load' });
  await page.evaluate(() => { document.body.focus(); });
  let gapSelect = false;
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press('Tab');
    if (await page.evaluate(() => document.activeElement?.id === 'model-select')) { gapSelect = true; break; }
  }
  // Chọn bằng phím thật: gõ chữ đầu + Enter (native select)
  await page.keyboard.press('KeyR');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(100);
  const sauChonPhim = await page.evaluate(() => ({ cot: document.querySelectorAll('#compare-header th').length, url: decodeURIComponent(location.search) }));
  const chonOk = sauChonPhim.cot >= 2; // Tiêu chí + >=1 mẫu
  // Bằng đường mã (MÔ PHỎNG — ghi rõ) dựng đủ 3 mẫu để thử focus nút bỏ
  await page.evaluate(() => {
    const sel = document.getElementById('model-select');
    for (const slug of ['omega-speedmaster', 'cartier-tank']) {
      sel.value = slug;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await page.waitForTimeout(100);
  // Bỏ mẫu GIỮA bằng phím thật: Tab tới nút bỏ thứ hai (rolex=1, omega=2, tank=3 theo thứ tự
  // bấm: rly? selected = [R (phím), omega, tank]) — focus nút bỏ của omega rồi Enter
  const truocBo = await page.evaluate(() => {
    const nut = Array.from(document.querySelectorAll('#compare-header [data-remove]'));
    nut[1].focus();
    return { soNut: nut.length, tenFocus: document.activeElement?.getAttribute('data-remove') };
  });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(100);
  const sauBo = await page.evaluate(() => {
    const nut = Array.from(document.querySelectorAll('#compare-header [data-remove]'));
    const tenFocus = document.activeElement?.getAttribute('data-remove') ?? document.activeElement?.id;
    return { soNut: nut.length, con: nut.map((n) => n.getAttribute('data-remove')), focus: tenFocus, focusLaNut: document.activeElement?.hasAttribute('data-remove') };
  });
  ghi('M9b luồng chọn tay: chọn mẫu bằng phím thật (native select); bỏ mẫu giữa bằng Enter thật → focus đậu nút bỏ kế tiếp cùng vị trí', gapSelect && chonOk && truocBo.soNut === 3 && sauBo.soNut === 2 && sauBo.focusLaNut === true && sauBo.con[1] === 'cartier-tank', `chọn=${sauChonPhim.cot} cột; trước=${truocBo.soNut} nút; sau=${sauBo.soNut} nút, focus=${sauBo.focus}`);
  // M9c: dựng lại 3 mẫu — mẫu thứ ba thêm bằng selectOption/dispatchEvent
  // (MÔ PHỎNG ĐƯỜNG MÃ, chỉ dựng trạng thái; phép thử focus phía dưới là phím
  // thật: focus nút bỏ thật rồi nhấn Enter). Bỏ nút CUỐI của 3 → còn 2 nút
  // hiển thị, không có nút kế cùng vị trí → focus nút TRƯỚC.
  await page.selectOption('#model-select', 'omega-speedmaster');
  await page.dispatchEvent('#model-select', 'change');
  await page.waitForTimeout(100);
  const truocM9c = await page.evaluate(() => ({
    soNut: Array.from(document.querySelectorAll('#compare-header [data-remove]')).filter((n) => n.offsetParent !== null).length,
  }));
  await page.evaluate(() => {
    const nut = Array.from(document.querySelectorAll('#compare-header [data-remove]')).filter((n) => n.offsetParent !== null);
    nut[nut.length - 1].focus();
  });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(100);
  const sauBoCuoi = await page.evaluate(() => {
    const nut = Array.from(document.querySelectorAll('#compare-header [data-remove]')).filter((n) => n.offsetParent !== null);
    return { soNutHien: nut.length, focusLaNut: document.activeElement?.hasAttribute('data-remove'), focusTen: document.activeElement?.getAttribute('data-remove') ?? document.activeElement?.id };
  });
  ghi('M9c với 3 mẫu: bỏ nút cuối (Enter thật) → còn 2 nút, không nút kế cùng vị trí → focus nút TRƯỚC', truocM9c.soNut === 3 && sauBoCuoi.soNutHien === 2 && sauBoCuoi.focusLaNut === true, JSON.stringify({ truoc: truocM9c, sau: sauBoCuoi }));
  // M9d: bỏ tiếp (2→1 mẫu, bảng ẩn) → không còn nút bỏ trong giao diện → focus về select
  await page.evaluate(() => {
    const nut = Array.from(document.querySelectorAll('#compare-header [data-remove]')).filter((n) => n.offsetParent !== null);
    nut[0].focus();
  });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(100);
  const sauBoDuyNhat = await page.evaluate(() => ({ focusSelect: document.activeElement?.id === 'model-select', bangAn: document.getElementById('compare-table-wrap')?.classList.contains('hidden') }));
  ghi('M9d bỏ tiếp (2→1, bảng ẩn): không còn nút bỏ hiển thị → focus về select', sauBoDuyNhat.focusSelect === true && sauBoDuyNhat.bangAn === true, JSON.stringify(sauBoDuyNhat));

  // ============ M10: 16 tổ hợp bố cục + tương phản computed ============
  // (Hàm tương phản/nền chạy bên trong page.evaluate — xem lumOf/nenThuc phía dưới.)
  const anh16 = [];
  for (const [route, path] of [['VI', '/so-sanh/'], ['EN', '/en/compare/']]) {
    for (const scheme of ['light', 'dark']) {
      for (const width of [320, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.goto(BASE + path + '?m=rolex-submariner,omega-speedmaster,cartier-tank', { waitUntil: 'load' });
        await page.waitForTimeout(120);
        const d = await page.evaluate(() => {
          const lumOf = (c) => {
            const [r, g, b] = c.match(/\d+/g).map(Number).map((v) => {
              const x = v / 255;
              return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
          };
          const tyLe = (fg, bg) => {
            const a = lumOf(fg);
            const b = lumOf(bg);
            return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
          };
          const nenThuc = (el) => {
            let cur = el;
            while (cur && cur !== document.documentElement) {
              const bgc = getComputedStyle(cur).backgroundColor;
              if (bgc && !bgc.startsWith('rgba(0, 0, 0, 0)')) return bgc;
              cur = cur.parentElement;
            }
            return 'rgb(255, 255, 255)';
          };
          const hang0 = document.querySelector('#compare-body tr');
          const oNhan = hang0?.cells[0];
          const oGiaTri = hang0?.cells[1];
          const doc = document.scrollingElement;
          const wrap = document.getElementById('compare-table-wrap');
          const mauNhan = oNhan ? getComputedStyle(oNhan).color : '';
          const mauGiaTri = oGiaTri ? getComputedStyle(oGiaTri).color : '';
          const nen = nenThuc(oNhan);
          const nen2 = nenThuc(oGiaTri);
          const cp = (f, b) => Math.round(tyLe(f, b) * 100) / 100;
          return {
            nenHangChan: getComputedStyle(hang0).backgroundColor,
            cpNhan: cp(mauNhan, nen),
            cpGiaTri: cp(mauGiaTri, nen2),
            trangTran: doc ? doc.scrollWidth - window.innerWidth : -1,
            bangCuonDuoc: (() => { wrap.scrollLeft = 9999; const s = wrap.scrollLeft; wrap.scrollLeft = 0; return s; })(),
          };
        });
        if (d.loi) { ghi(`M10 ${route} ${scheme} ${width}px: LỖI đo ${d.loi}`, false); continue; }
        const dat = d.trangTran === 0 && d.cpNhan >= 4.5 && d.cpGiaTri >= 4.5;
        ghi(`M10 ${route} ${scheme} ${width}px: không tràn + hàng chẵn tương phản ≥4,5 (nhãn ${d.cpNhan}:1, giá trị ${d.cpGiaTri}:1, nền ${d.nenHangChan})`, dat, `bảng cuộn=${d.bangCuonDuoc}px`);
        if (width === 320 || width === 1440) {
          const tenAnh = `c2-${route}-${scheme}-${width}.png`.toLowerCase();
          await page.screenshot({ path: `output/g06-compare-en-integration/shots/${tenAnh}` });
          anh16.push(tenAnh);
        }
      }
    }
  }
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });
  return { tong: K.length, dat: K.filter((x) => x.dat).length, khongDat: K.filter((x) => !x.dat).length, ketQua: K, anh: anh16 };
}
