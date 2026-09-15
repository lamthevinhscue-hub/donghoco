// G06-C chặng 2 — RM/vòng đời mục 4 cho cặp Bộ thoát VI + EN
// R1 reduce TRƯỚC tải: không tự chạy; next/prev/reset dùng được, tư thế tức thì.
// R2 bật reduce KHI ĐANG PHÁT: dừng ngay, nút/aria đồng bộ, counter đứng > 2 chu kỳ.
// R3 Phát TRONG reduce: bị chặn, thông báo hiện.
// R4 gỡ reduce: thông báo ẩn, KHÔNG tự phát; next → tween thật (đầu/giữa/cuối);
//    Phát hoạt động trở lại.
// R5 rời viewport (cuộn thật): đang phát → ngoài view > 2 chu kỳ counter đứng →
//    quay lại chạy tiếp.
// Mỗi nhóm chạy cho VI và EN (nhãn đúng lang). Bộ phân loại 4 trạng thái + tự kiểm.
async (page) => {
  const K = [];
  const D = 'DAT', ND = 'KHONG_DAT', CK = 'CHUA_KIEM', QS = 'QUAN_SAT';
  const ghi = (ca, trangThai, chiTiet = '') => K.push({ ca, trangThai, chiTiet: String(chiTiet) });
  const ghiKQ = (ca, dung, chiTiet = '') => ghi(ca, dung === true ? D : ND, chiTiet);
  const tongKet = (ds) => ({
    tong: ds.length,
    dat: ds.filter((x) => x.trangThai === D).length,
    khongDat: ds.filter((x) => x.trangThai === ND).length,
    chuaKiem: ds.filter((x) => x.trangThai === CK).length,
    quanSat: ds.filter((x) => x.trangThai === QS).length,
  });
  const tk = [];
  const kt = (ten, dk) => tk.push({ ca: ten, trangThai: dk === true ? D : ND, chiTiet: '' });
  const a = tongKet([{ trangThai: D }, { trangThai: QS }]); kt('TK1', a.dat === 1 && a.quanSat === 1 && a.tong === 2);
  const b = tongKet([{ trangThai: D }, { trangThai: CK }]); kt('TK2', b.dat === 1 && b.chuaKiem === 1);
  const c = tongKet([{ trangThai: ND }]); kt('TK3', c.khongDat === 1);
  const d = tongKet([{ trangThai: CK }]); kt('TK4', d.dat === 0);
  const e = tongKet([]); kt('TK5', e.tong === 0 && e.dat === 0);
  if (tk.some((x) => x.trangThai !== D)) return { tuKiem: tk, LOI: 'Tự kiểm không đạt' };

  const BASE = 'http://localhost:4321';
  const TRANG = { vi: '/co-che/bo-thoat/', en: '/en/mechanisms/escapement/' };
  const NHAN = {
    vi: { play: 'Phát hoạt ảnh', pause: 'Tạm dừng hoạt ảnh', buoc1: 'Bước 1/5', thongBao: 'Đang giảm chuyển động' },
    en: { play: 'Play animation', pause: 'Pause animation', buoc1: 'Step 1/5', thongBao: 'Reduced motion is enabled' },
  };
  await page.setViewportSize({ width: 1280, height: 900 });

  const st = () => page.evaluate(() => ({
    pressed: document.querySelector('.mechanism-animation .play-btn')?.getAttribute('aria-pressed'),
    label: document.querySelector('.mechanism-animation .play-btn')?.getAttribute('aria-label'),
    counter: document.querySelector('.mechanism-animation .step-counter')?.textContent,
    notice: (() => { const n = document.querySelector('.rm-notice'); return n ? (n.classList.contains('hidden') ? 'an' : 'hien') : 'thieu'; })(),
    noticeText: document.querySelector('.rm-notice')?.textContent?.trim() ?? '',
    wheel: document.getElementById('escape-wheel-group')?.style.transform ?? '',
    mTransform: getComputedStyle(document.getElementById('escape-wheel-group')).transform,
    transition: getComputedStyle(document.getElementById('escape-wheel-group')).transitionDuration,
    ngoaiView: (() => { const r = document.getElementById('escapement-svg').getBoundingClientRect(); return r.bottom < 0 || r.top > window.innerHeight; })(),
  }));

  for (const lang of ['vi', 'en']) {
    const N = NHAN[lang];

    // ===== R1 reduce TRƯỚC tải =====
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(BASE + TRANG[lang], { waitUntil: 'load' });
    await page.waitForTimeout(250);
    const r1a = await st();
    await page.waitForTimeout(3000);
    const r1b = await st();
    ghiKQ(`R1 ${lang} reduce trước tải: không tự chạy (counter đứng ${r1a.counter})`, r1a.counter === N.buoc1 && r1b.counter === N.buoc1 && r1a.pressed === 'false', `${r1a.counter}→${r1b.counter}`);
    await page.click('.mechanism-animation .next-btn');
    await page.waitForTimeout(120);
    const r1c = await st();
    ghiKQ(`R1 ${lang} reduce: next dùng được, tư thế đích tức thì (transition 0s)`, r1c.wheel.includes('rotate(-8deg)') && r1c.transition === '0s', `${r1c.wheel} t=${r1c.transition}`);
    await page.click('.mechanism-animation .prev-btn');
    await page.waitForTimeout(120);
    const r1d = await st();
    ghiKQ(`R1 ${lang} reduce: prev dùng được (về bước 1)`, r1d.counter === N.buoc1 && r1d.wheel.includes('rotate(0deg)'), `${r1d.counter} ${r1d.wheel}`);
    await page.click('.mechanism-animation .next-btn');
    await page.waitForTimeout(120);
    await page.click('.mechanism-animation .reset-btn');
    await page.waitForTimeout(120);
    const r1e = await st();
    ghiKQ(`R1 ${lang} reduce: reset dùng được`, r1e.counter === N.buoc1 && r1e.wheel.includes('rotate(0deg)'), r1e.counter);

    // ===== R2 bật reduce KHI ĐANG PHÁT =====
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(BASE + TRANG[lang], { waitUntil: 'load' });
    await page.waitForTimeout(220);
    await page.click('.mechanism-animation .play-btn');
    await page.waitForTimeout(200);
    const r2a = await st();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(250);
    const r2b = await st();
    await page.waitForTimeout(6500);
    const r2c = await st();
    ghiKQ(`R2 ${lang} bật reduce khi đang phát: dừng ngay + nút/aria về Phát + thông báo hiện`, r2a.pressed === 'true' && r2b.pressed === 'false' && r2b.label === N.play && r2b.notice === 'hien' && r2b.noticeText.startsWith(N.thongBao), `pressed ${r2a.pressed}→${r2b.pressed}, nhãn=${r2b.label}, notice=${r2b.notice}`);
    ghiKQ(`R2 ${lang} reduce giữa phiên: counter đứng 6,5s (> 2 chu kỳ 2,6s)`, r2b.counter === r2c.counter, `${r2b.counter} → ${r2c.counter}`);

    // ===== R3 Phát TRONG reduce bị chặn =====
    await page.click('.mechanism-animation .play-btn');
    await page.waitForTimeout(300);
    const r3 = await st();
    ghiKQ(`R3 ${lang} Phát trong reduce bị chặn: pressed=false, counter không đổi, thông báo hiện`, r3.pressed === 'false' && r3.counter === r2c.counter && r3.notice === 'hien', JSON.stringify({ pressed: r3.pressed, counter: r3.counter, notice: r3.notice }));

    // ===== R4 gỡ reduce =====
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForTimeout(250);
    const r4a = await st();
    ghiKQ(`R4 ${lang} gỡ reduce: thông báo ẩn + KHÔNG tự phát lại`, r4a.notice === 'an' && r4a.pressed === 'false' && r4a.counter === r2c.counter, `notice=${r4a.notice}, pressed=${r4a.pressed}, counter=${r4a.counter}`);
    // tween thật: reset → bước 1 (0°) → next → bước 2 (-8°), lấy mẫu giữa
    await page.click('.mechanism-animation .reset-btn');
    await page.waitForTimeout(450);
    const m0 = await page.evaluate(() => getComputedStyle(document.getElementById('escape-wheel-group')).transform);
    await page.click('.mechanism-animation .next-btn');
    const m1 = await page.evaluate(() => getComputedStyle(document.getElementById('escape-wheel-group')).transform);
    await page.waitForTimeout(100);
    const m1b = await page.evaluate(() => getComputedStyle(document.getElementById('escape-wheel-group')).transform);
    await page.waitForTimeout(450);
    const r4b = await st();
    const m2 = r4b.mTransform;
    const mauGiua = [m1, m1b].find((m) => m !== m0 && m !== m2) || null;
    ghiKQ(`R4 ${lang} gỡ reduce: next tween thật (mẫu giữa khác cả 2 đầu) + transition 0.3s + đích -8°`, mauGiua !== null && r4b.transition === '0.3s' && r4b.wheel.includes('rotate(-8deg)'), `m0=${m0.slice(0, 30)} giữa=${mauGiua ? 'CÓ' : 'KHÔNG'} m2=${m2.slice(0, 30)} t=${r4b.transition}`);
    await page.click('.mechanism-animation .play-btn');
    await page.waitForTimeout(200);
    const r4c = await st();
    ghiKQ(`R4 ${lang} gỡ reduce: Phát hoạt động trở lại`, r4c.pressed === 'true' && r4c.label === N.pause, `pressed=${r4c.pressed}, nhãn=${r4c.label}`);
    // giữ trạng thái phát cho R5 (không bấm thêm lần nữa)

    // ===== R5 rời viewport (cuộn thật) — tiếp diễn từ R4 đang phát =====
    const r5a = await st();
    await page.waitForTimeout(3000);
    const r5b = await st();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    const r5c = await st();
    await page.waitForTimeout(6500);
    const r5d = await st();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const r5e = await st();
    await page.waitForTimeout(3000);
    const r5f = await st();
    ghiKQ(`R5 ${lang} rời viewport: đang phát chứng minh trước`, r5a.pressed === 'true' && r5a.counter !== r5b.counter, `${r5a.counter}→${r5b.counter}`);
    ghiKQ(`R5 ${lang} ngoài view 6,5s: counter đứng`, r5c.ngoaiView === true && r5c.counter === r5d.counter, `${r5c.counter}→${r5d.counter}, ngoàiView=${r5c.ngoaiView}`);
    ghiKQ(`R5 ${lang} quay lại: chạy tiếp`, r5e.counter === r5d.counter && r5f.counter !== r5e.counter, `${r5e.counter}→${r5f.counter}`);
  }

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  return { tuKiem: tk, tuKiemTongKet: tongKet(tk), tongKet: tongKet(K), ketQua: K };
}
