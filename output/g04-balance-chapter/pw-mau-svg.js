// Kiểm màu TÍNH TOÁN thực tế (vòng sửa màu TXN-20260912-25):
//   - 4 phần tử từng dùng --ig-steel-deep (đầu vít, khối ghim, trục, collet):
//     đọc getComputedStyle().fill ở CẢ HAI theme — fill phải ≠ rgb(0,0,0)
//     (màu mặc định khi token thiếu) và khớp token --ig-steel.
//   - Tương phản fill vs nền SVG (rect --ig-bg) ≥ 3:1, tính từ giá trị computed.
//   - Viền halo (stroke = màu nền) phân biệt với bộ phận liền kề: kiểm stroke
//     computed ≠ 'none' và ≠ màu fill.
//   - Chụp riêng vùng SVG: VI/EN × 320/1440 × sáng/tối (8 ảnh), cuộn hình vào
//     viewport trước khi chụp (tránh sticky header che).
async (page) => {
  const BASE = 'http://localhost:4321';
  const OUT = 'output/g04-balance-chapter/shots';
  const doi = (ms) => page.waitForTimeout(ms);

  const lum = (rgb) => {
    const f = (v) => {
      const x = v / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]);
  };
  const contrast = (a, b) => {
    const la = lum(a), lb = lum(b);
    const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
    return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
  };
  const parseRgb = (s) => (String(s).match(/\d+/g) ?? []).slice(0, 3).map(Number);

  const doc = () => page.evaluate(() => {
    const parseRgb = (s) => (String(s).match(/\d+/g) ?? []).slice(0, 3).map(Number);
    const svg = document.querySelector('svg.bhc-svg');
    const nen = parseRgb(getComputedStyle(svg.querySelector('rect')).fill);
    const phanTu = {
      dauVit: svg.querySelector('circle[cx="544"]'),
      khoiGhim: svg.querySelector('rect[x="376"]'),
      truc: svg.querySelector('circle[cx="320"][r="11"]'),
      collet: svg.querySelector('[data-bhc-collet]'),
    };
    const ketqua = { nen };
    for (const [ten, el] of Object.entries(phanTu)) {
      const cs = getComputedStyle(el);
      ketqua[ten] = { fill: cs.fill, stroke: cs.stroke, strokeW: cs.strokeWidth };
    }
    return ketqua;
  });

  const kq = { thoiGian: new Date().toISOString(), phap: [], shots: [] };
  const BLACK = 'rgb(0, 0, 0)';
  let tatDat = true;

  for (const r of [{ lang: 'vi', path: '/co-che/day-toc-banh-lac/' }, { lang: 'en', path: '/en/mechanisms/balance-and-hairspring/' }]) {
    for (const theme of ['sang', 'toi']) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
      await page.evaluate((t) => localStorage.setItem('theme', t === 'toi' ? 'dark' : 'light'), theme);
      await page.goto(BASE + r.path, { waitUntil: 'load' });
      await page.locator('svg.bhc-svg').scrollIntoViewIfNeeded();
      await doi(400);
      const m = await doc();
      const nenRgb = parseRgb(m.nen);
      const chiTiet = {};
      let datTheme = true;
      for (const ten of ['dauVit', 'khoiGhim', 'truc', 'collet']) {
        const fillStr = String(m[ten].fill);
        const fillRgb = parseRgb(fillStr);
        const coMau = fillRgb.length === 3; // computed trả được màu rgb thật
        const laDen = fillStr === BLACK || (fillRgb.length === 3 && fillRgb.every((v) => v === 0));
        const ct = coMau ? contrast(fillRgb, nenRgb) : -1;
        const strokeStr = String(m[ten].stroke);
        const strokeRgb = parseRgb(strokeStr);
        const coHalo = strokeStr !== 'none' && strokeStr !== fillStr && strokeRgb.length === 3;
        chiTiet[ten] = { fill: fillStr, coMau, khacDen: !laDen, tuongPhanNen: ct, halo: coHalo, stroke: strokeStr };
        if (!coMau || laDen || ct < 3 || !coHalo) datTheme = false;
      }
      chiTiet.nen = m.nen;
      // chụp riêng vùng SVG (cuộn vào viewport trước)
      await page.evaluate(() => {
        const svg = document.querySelector('svg.bhc-svg');
        window.scrollTo(0, window.scrollY + svg.getBoundingClientRect().top - 90);
      });
      await doi(200);
      const shot = `${OUT}/svg-${r.lang}-1440-${theme}.png`;
      await page.locator('svg.bhc-svg').screenshot({ path: shot });
      kq.shots.push(shot);
      kq.phap.push({ route: r.lang, theme, datTheme, chiTiet });
      if (!datTheme) tatDat = false;
    }

    // viewport 320 — chỉ chụp (SVG co theo, màu không đổi theo viewport)
    for (const theme of ['sang', 'toi']) {
      await page.setViewportSize({ width: 320, height: 900 });
      await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
      await page.evaluate((t) => localStorage.setItem('theme', t === 'toi' ? 'dark' : 'light'), theme);
      await page.goto(BASE + r.path, { waitUntil: 'load' });
      await page.locator('svg.bhc-svg').scrollIntoViewIfNeeded();
      await doi(400);
      await page.evaluate(() => {
        const svg = document.querySelector('svg.bhc-svg');
        window.scrollTo(0, window.scrollY + svg.getBoundingClientRect().top - 60);
      });
      await doi(200);
      const shot = `${OUT}/svg-${r.lang}-320-${theme}.png`;
      await page.locator('svg.bhc-svg').screenshot({ path: shot });
      kq.shots.push(shot);
    }
  }
  kq.tatDat = tatDat;
  return kq;
}
