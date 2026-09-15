// G06-C chặng 1 vòng sửa 2 — kiểm nền với BỘ PHÂN LOẠI 4 TRẠNG THÁI:
//   DAT / KHONG_DAT / CHUA_KIEM / QUAN_SAT (quan sát KHÔNG cộng vào đạt).
// Tự kiểm bộ tổng kết 5 ca (TK1..TK5) chạy trước; hỏng thì không chạy ca thật.
// Ca thật:
//   A1-A3 bàn phím thật + Đặt lại (giữ từ vòng sửa 1, phân loại lại DAT).
//   B1 reduce trước tải (DAT); B2 bật reduce KHI ĐANG PHÁT (QUAN_SAT — lấy mẫu
//      cách nhau > chu kỳ bước 2,6s, không tiêu chí đạt); B3 gỡ reduce — đo
//      TRƯỚC/SAU + mẫu giữa chuyển tiếp (computed transform) chứng minh tween,
//      tư thế đích đúng POSES; không chứng minh được thì CHUA_KIEM.
//   C theme: tiêu chí NGHIÊM — theme DOM khớp + nền khớp giá trị đo chuẩn của
//      theme đó (không có điều kiện "nền không trắng thì qua").
//   D1 rời viewport (cuộn thật): chứng minh ĐANG PHÁT trước; ngoài view lấy mẫu
//      cách nhau 6,5s (> 2× chu kỳ bước); QUAY LẠI kiểm riêng.
//   D2 tab ẩn MÔ PHỎNG: override document.hidden/visibilityState (đọc lại xác
//      nhận trạng thái ẩn) + phản ứng ứng dụng (counter đứng) + phục hồi chạy
//      lại — QUAN_SAT vì là mô phỏng; tab thật CHUA_KIEM ghi riêng.
//   E ảnh: chụp TOÀN PHẦN tử .mechanism-animation (không cắt phần dưới).
async (page) => {
  const K = [];
  const D = 'DAT', ND = 'KHONG_DAT', CK = 'CHUA_KIEM', QS = 'QUAN_SAT';
  const ghi = (ca, trangThai, chiTiet = '') => K.push({ ca, trangThai, chiTiet: String(chiTiet) });
  const ghiKQ = (ca, dung, chiTiet = '') => ghi(ca, dung === true ? D : ND, chiTiet);
  const tongKet = (danhSach) => ({
    tong: danhSach.length,
    dat: danhSach.filter((x) => x.trangThai === D).length,
    khongDat: danhSach.filter((x) => x.trangThai === ND).length,
    chuaKiem: danhSach.filter((x) => x.trangThai === CK).length,
    quanSat: danhSach.filter((x) => x.trangThai === QS).length,
  });

  // ===== Tự kiểm bộ tổng kết (5 ca bắt buộc) =====
  const tk = [];
  const kt = (ten, dieuKien) => tk.push({ ca: ten, trangThai: dieuKien === true ? D : ND, chiTiet: '' });
  const r1 = tongKet([{ trangThai: D }, { trangThai: QS }]);
  kt('TK1 đạt+quan sát: quanSat KHÔNG cộng vào dat', r1.dat === 1 && r1.quanSat === 1 && r1.tong === 2 && r1.khongDat === 0 && r1.chuaKiem === 0);
  const r2 = tongKet([{ trangThai: D }, { trangThai: CK }]);
  kt('TK2 đạt+chưa kiểm: hai trạng thái tách biệt', r2.dat === 1 && r2.chuaKiem === 1 && r2.quanSat === 0 && r2.tong === 2);
  const r3 = tongKet([{ trangThai: ND }, { trangThai: D }]);
  kt('TK3 có lỗi: khongDat đếm đúng, không nuốt', r3.khongDat === 1 && r3.dat === 1);
  const r4 = tongKet([{ trangThai: CK }, { trangThai: CK }]);
  kt('TK4 tất cả chưa kiểm: dat = 0', r4.dat === 0 && r4.chuaKiem === 2);
  const r5 = tongKet([]);
  kt('TK5 danh sách rỗng: 0 mọi trạng thái, không sập', r5.tong === 0 && r5.dat === 0 && r5.khongDat === 0 && r5.chuaKiem === 0 && r5.quanSat === 0);
  const tkLoi = tk.filter((x) => x.trangThai !== D);
  if (tkLoi.length) {
    return { tuKiem: tk, LOI: 'Tự kiểm bộ tổng kết KHÔNG ĐẠT — dừng, không chạy ca thật', tongKet: tongKet(tk) };
  }

  const BASE = 'http://localhost:4321';
  const counterOf = () => page.evaluate(() => document.querySelector('.mechanism-animation .step-counter')?.textContent ?? null);
  const playState = () => page.evaluate(() => ({
    pressed: document.querySelector('.mechanism-animation .play-btn')?.getAttribute('aria-pressed') ?? null,
    label: document.querySelector('.mechanism-animation .play-btn')?.getAttribute('aria-label') ?? null,
  }));
  await page.route(/fonts[.](googleapis|gstatic)[.]com/, (r) => r.abort());
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(BASE + '/co-che/bo-thoat/', { waitUntil: 'load' });
  await page.waitForTimeout(300);

  // ===== A. Bàn phím thật + Đặt lại =====
  await page.evaluate(() => { document.body.focus(); });
  let gapPlay = false;
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab');
    if (await page.evaluate(() => document.activeElement?.classList.contains('play-btn'))) { gapPlay = true; break; }
  }
  const truocPhat = await counterOf();
  await page.keyboard.press('Space');
  await page.waitForTimeout(3000);
  const sauSpace = await playState();
  const sauSpaceCounter = await counterOf();
  ghiKQ('A1 bàn phím thật: Tab tới nút Phát + Space → phát (aria-pressed=true, nhãn Tạm dừng, bước tăng)', gapPlay && sauSpace.pressed === 'true' && sauSpace.label === 'Tạm dừng hoạt ảnh' && truocPhat !== sauSpaceCounter, `gap=${gapPlay}, ${truocPhat}→${sauSpaceCounter}`);

  let gapNext = false;
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    if (await page.evaluate(() => document.activeElement?.classList.contains('next-btn'))) { gapNext = true; break; }
  }
  const cTruoc = await counterOf();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(350);
  const cSau = await counterOf();
  ghiKQ('A2 bàn phím thật: Tab tới nút Bước sau + Enter → tăng bước', gapNext && !!cTruoc && !!cSau && cTruoc !== cSau, `${cTruoc}→${cSau}`);

  await page.click('.mechanism-animation .reset-btn');
  await page.waitForTimeout(350);
  const a3 = await page.evaluate(() => ({
    counter: document.querySelector('.mechanism-animation .step-counter')?.textContent,
    transform: document.getElementById('escape-wheel-group')?.style.transform,
  }));
  ghiKQ('A3 Đặt lại: về Bước 1/5, bánh thoát về tư thế đầu w=0', (a3.counter ?? '').startsWith('Bước 1/5') && (a3.transform ?? '').includes('rotate(0'), JSON.stringify(a3));

  // ===== B. RM =====
  // B1: reduce TRƯỚC tải
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(BASE + '/co-che/bo-thoat/', { waitUntil: 'load' });
  await page.waitForTimeout(200);
  await page.click('.mechanism-animation .next-btn');
  await page.waitForTimeout(80);
  const b1 = await page.evaluate(() => ({
    counter: document.querySelector('.mechanism-animation .step-counter')?.textContent,
    transformWheel: document.getElementById('escape-wheel-group')?.style.transform,
    transition: getComputedStyle(document.getElementById('escape-wheel-group')).transitionDuration,
  }));
  ghiKQ('B1 reduce trước tải: next hoạt động, tư thế đích w=-8deg tức thì, transition 0s', (b1.counter ?? '').startsWith('Bước 2/5') && (b1.transformWheel ?? '').includes('rotate(-8deg)') && b1.transition === '0s', JSON.stringify(b1));

  // B2: bật reduce KHI ĐANG PHÁT — QUAN_SAT, lấy mẫu cách nhau > chu kỳ bước (2,6s)
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(BASE + '/co-che/bo-thoat/', { waitUntil: 'load' });
  await page.waitForTimeout(150);
  await page.click('.mechanism-animation .play-btn');
  await page.waitForTimeout(100);
  const b2Truoc = await playState();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(150);
  const b2s0 = await page.evaluate(() => ({
    counter: document.querySelector('.mechanism-animation .step-counter')?.textContent,
    transition: getComputedStyle(document.getElementById('escape-wheel-group')).transitionDuration,
  }));
  await page.waitForTimeout(3000);
  const b2s1Counter = await counterOf();
  ghi('B2 bật reduce KHI ĐANG PHÁT (QUAN_SAT — quan sát hiện trạng, không tiêu chí đạt): pressed=' + b2Truoc.pressed + ' giữ nguyên, counter ' + b2s0.counter + '→' + b2s1Counter + ' cách 3s (> chu kỳ 2,6s), transition wheel=' + b2s0.transition + ' (khung không có listener reduce — CSS tự chuyển 0s)', QS, 'quan sát thiết kế hiện hành; phương án chặng 2: thêm listener reduce → dừng phát/tween tức thì');

  // B3: gỡ reduce — đo TRƯỚC/SAU + mẫu giữa chuyển tiếp chứng minh tween thật
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForTimeout(150);
  await page.click('.mechanism-animation .reset-btn');
  await page.waitForTimeout(450);
  const b3Truoc = await page.evaluate(() => ({
    counter: document.querySelector('.mechanism-animation .step-counter')?.textContent,
    m0: getComputedStyle(document.getElementById('escape-wheel-group')).transform,
  }));
  await page.click('.mechanism-animation .next-btn');
  const b3m1 = await page.evaluate(() => getComputedStyle(document.getElementById('escape-wheel-group')).transform);
  await page.waitForTimeout(90);
  const b3m1b = await page.evaluate(() => getComputedStyle(document.getElementById('escape-wheel-group')).transform);
  await page.waitForTimeout(460);
  const b3Sau = await page.evaluate(() => ({
    counter: document.querySelector('.mechanism-animation .step-counter')?.textContent,
    style: document.getElementById('escape-wheel-group')?.style.transform,
    m2: getComputedStyle(document.getElementById('escape-wheel-group')).transform,
    transition: getComputedStyle(document.getElementById('escape-wheel-group')).transitionDuration,
  }));
  const tweenBatDuoc = b3Truoc.m0 !== b3m1 && b3m1 !== b3Sau.m2 ? 'm1' : (b3Truoc.m0 !== b3m1b && b3m1b !== b3Sau.m2 ? 'm1b' : null);
  const b3Dung = (b3Sau.counter ?? '').startsWith('Bước 2/5') && (b3Sau.style ?? '').includes('rotate(-8deg)') && b3Sau.transition === '0.3s' && tweenBatDuoc !== null;
  ghi('B3 gỡ reduce rồi thao tác: tween thật (mẫu giữa chuyển tiếp khác 2 đầu) + tư thế đích w=-8deg + transition 0.3s', tweenBatDuoc === null && (b3Sau.counter ?? '').startsWith('Bước 2/5') ? CK : (b3Dung ? D : ND), JSON.stringify({ ...b3Truoc, m1: b3m1, m1b: b3m1b, ...b3Sau, mauGiua: tweenBatDuoc ?? 'KHÔNG BẮT ĐƯỢC — không chứng minh tween bằng mẫu này' }));

  // ===== C. Theme — tiêu chí nghiêm: nền khớp giá trị đo chuẩn của theme đó =====
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const nenChuan = {};
  for (const scheme of ['light', 'dark']) {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto(BASE + '/co-che/bo-thoat/', { waitUntil: 'load' });
    await page.waitForTimeout(150);
    nenChuan[scheme] = await page.evaluate(() => getComputedStyle(document.querySelector('.mechanism-animation .svg-stage')).backgroundColor);
  }
  const cKq = [];
  for (const scheme of ['light', 'dark']) {
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto(BASE + '/co-che/bo-thoat/', { waitUntil: 'load' });
      await page.waitForTimeout(150);
      const d = await page.evaluate(() => {
        const html = document.documentElement;
        const theme = html.dataset.theme ?? (html.classList.contains('dark') ? 'dark' : 'light');
        const stage = document.querySelector('.mechanism-animation .svg-stage');
        const svg = document.getElementById('escapement-svg');
        const nen = stage ? getComputedStyle(stage).backgroundColor : '';
        const doc = document.scrollingElement;
        return { theme, nen, svgW: svg ? Math.round(svg.getBoundingClientRect().width) : 0, tran: doc ? doc.scrollWidth - window.innerWidth : -1 };
      });
      const dung = d.theme === scheme && d.tran === 0 && d.nen === nenChuan[scheme] && nenChuan.light !== nenChuan.dark;
      cKq.push(`${scheme}/${width}:theme=${d.theme},nền=${d.nen},chuẩn=${nenChuan[scheme]},svg=${d.svgW}px,tràn=${d.tran}`);
      ghiKQ(`C theme ${scheme} ${width}px: theme DOM khớp + nền khớp chuẩn theme (không phải điều kiện "không trắng") + không tràn`, dung, `chuẩn light=${nenChuan.light} / dark=${nenChuan.dark}`);
    }
  }
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });

  // ===== E. Ảnh: chụp TOÀN PHẦN tử khung (SVG + điều khiển + legend + panel) =====
  await page.setViewportSize({ width: 768, height: 900 });
  for (const scheme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await page.goto(BASE + '/co-che/bo-thoat/', { waitUntil: 'load' });
    await page.waitForTimeout(200);
    const khung = page.locator('.mechanism-animation').first();
    await khung.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await khung.screenshot({ path: `output/g06-escapement-en-audit/shots/g06c-${scheme}-768-day.png` });
  }
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });

  // ===== D1. Rời viewport (cuộn thật) — DAT: chứng minh phát → đứng ngoài view → chạy lại =====
  await page.goto(BASE + '/co-che/bo-thoat/', { waitUntil: 'load' });
  await page.waitForTimeout(200);
  await page.click('.mechanism-animation .play-btn');
  await page.waitForTimeout(120);
  const d1Play = await playState();
  const d1c0 = await counterOf();
  await page.waitForTimeout(3000);
  const d1c1 = await counterOf();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  const d1Ngoai = await page.evaluate(() => {
    const r = document.getElementById('escapement-svg').getBoundingClientRect();
    return r.bottom < 0 || r.top > window.innerHeight;
  });
  const d1c2 = await counterOf();
  await page.waitForTimeout(6500);
  const d1c3 = await counterOf();
  const d1PlayNgoai = await playState();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const d1c4 = await counterOf();
  await page.waitForTimeout(3000);
  const d1c5 = await counterOf();
  const d1Dung = d1Play.pressed === 'true' && d1c0 !== d1c1 && d1Ngoai === true && d1c2 === d1c3 && d1c4 !== d1c5;
  ghi('D1 rời viewport (cuộn thật): đang phát chứng minh trước (cách 3s); ngoài view 6,5s (> 2× chu kỳ 2,6s) counter đứng ' + d1c2 + '→' + d1c3 + '; quay lại kiểm riêng: chạy tiếp ' + d1c4 + '→' + d1c5, d1Ngoai !== true ? CK : (d1Dung ? D : ND), `pressed=${d1Play.pressed}/${d1PlayNgoai.pressed}, ngoàiView=${d1Ngoai}, chuỗi: ${d1c0},${d1c1} | ${d1c2},${d1c3} | ${d1c4},${d1c5}`);

  // ===== D2. Tab ẩn MÔ PHỎNG (override hidden/visibilityState) — QUAN_SAT =====
  const d2DangPhat = await playState();
  if (d2DangPhat.pressed !== 'true') {
    await page.click('.mechanism-animation .play-btn');
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { get: () => true, configurable: true });
    Object.defineProperty(document, 'visibilityState', { get: () => 'hidden', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.waitForTimeout(300);
  const d2TrangThai = await page.evaluate(() => ({ hidden: document.hidden, vis: document.visibilityState }));
  const d2h0 = await counterOf();
  await page.waitForTimeout(6500);
  const d2h1 = await counterOf();
  await page.evaluate(() => {
    delete document.hidden;
    delete document.visibilityState;
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.waitForTimeout(3000);
  const d2h2 = await counterOf();
  const d2An = d2TrangThai.hidden === true && d2TrangThai.vis === 'hidden';
  ghi('D2 tab ẩn MÔ PHỎNG (QUAN_SAT — override + đọc lại xác nhận hidden=' + d2TrangThai.hidden + '/' + d2TrangThai.vis + '; phản ứng ứng dụng: counter đứng ' + d2h0 + '→' + d2h1 + ' 6,5s, phục hồi chạy lại ' + d2h1 + '→' + d2h2 + '); TAB THẬT CHUA_KIEM (headless một trang không có tab thật)', d2An && d2h0 === d2h1 && d2h1 !== d2h2 ? QS : CK, `mô phỏng bằng defineProperty + dispatchEvent; CDP frozen vòng trước KHÔNG dùng lại (visibilityState=visible — không phải bằng chứng)`);
  ghi('D2b tab ẩn THẬT: không kiểm được trong phiên headless một trang', CK, 'thuộc chặng 2 nếu cần (thiết bị/tab thật)');

  return { tuKiem: tk, tuKiemTongKet: tongKet(tk), tongKet: tongKet(K), ketQua: K };
}
