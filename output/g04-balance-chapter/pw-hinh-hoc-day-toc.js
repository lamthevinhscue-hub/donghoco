// Hình học dây tóc (vòng sửa TXN-20260912-23): kiểm TRÊN PATH SVG thật
//   - đầu ngoài BẤT BIẾN tại điểm gắn (385.1, 149.9) qua nhiều pha + khi Phát
//   - đầu trong khớp phần quay: điểm đầu path == vị trí collet (góc quay hiện tại)
//   - đường xoắn không gãy: bán kính từ tâm tăng đơn điệu, bước góc giữa hai
//     đoạn liên tiếp bị chặn, độ dài đoạn > 0
//   - ca hồi quy phải bắt được CÔNG THỨC CŨ: công thức cũ (coils theo pha)
//     dự báo đầu ngoài trôi — script tính sẵn để đối chứng.
async (page) => {
  const URL = 'http://localhost:4321/co-che/day-toc-banh-lac/';
  const bam = (action) => page.locator(`[data-bhc-action="${action}"]`).click();
  const doc = () => page.evaluate(() => {
    const d = document.querySelector('[data-bhc-spring]').getAttribute('d');
    const col = document.querySelector('[data-bhc-collet]');
    const nums = d.match(/-?\d+(\.\d+)?/g).map(Number);
    const pts = [];
    for (let i = 0; i < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
    const CX = 320, CY = 215;
    // bán kính + bước góc
    let rTruoc = -1, rTangDonDieu = true, gocLonNhat = 0, doDaiNhoNhat = Infinity;
    for (let i = 0; i < pts.length; i++) {
      const [x, y] = pts[i];
      const r = Math.hypot(x - CX, y - CY);
      if (rTruoc >= 0 && r <= rTruoc - 0.001) rTangDonDieu = false;
      if (i > 0) {
        const [px, py] = pts[i - 1];
        const dd = Math.hypot(x - px, y - py);
        if (dd < doDaiNhoNhat) doDaiNhoNhat = dd;
        const a1 = Math.atan2(py - CY, px - CX), a2 = Math.atan2(y - CY, x - CX);
        let da = Math.abs(a2 - a1);
        if (da > Math.PI) da = 2 * Math.PI - da;
        if (da > gocLonNhat) gocLonNhat = da;
      }
      rTruoc = r;
    }
    const dau = pts[0], cuoi = pts[pts.length - 1];
    return {
      dau, cuoi,
      collet: [Number(col.getAttribute('cx')), Number(col.getAttribute('cy'))],
      rTangDonDieu, doDaiNhoNhat: Math.round(doDaiNhoNhat * 100) / 100,
      gocLonNhatDeg: Math.round((gocLonNhat * 180) / Math.PI * 10) / 10,
    };
  });

  const STUD = [385.1, 149.9];
  const xa = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

  // Công thức CŨ (coils = 5 + 0.75·sin(2πp)) dự báo đầu ngoài trôi — dùng làm
  // đối chứng rằng ca kiểm này BẮT được công thức cũ.
  const cuoiCongThucCu = (p) => {
    const phiDeg = 40 * Math.sin(2 * Math.PI * p);
    const phi = (phiDeg * Math.PI) / 180;
    const coils = 5 + 0.75 * Math.sin(2 * Math.PI * p);
    const a = phi + ((-Math.PI / 4) - phi + 2 * Math.PI * coils);
    return [320 + 92 * Math.cos(a), 215 + 92 * Math.sin(a)];
  };

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(URL, { waitUntil: 'load' });
  await page.locator('[data-bhc-root]').scrollIntoViewIfNeeded();

  const mauPha = [];
  const PHA = 24; // 2 chu kỳ đầy đủ bằng Bước (mỗi bước 1/12 dao động)
  for (let k = 0; k < PHA; k++) {
    if (k > 0) await bam('step');
    const m = await doc();
    mauPha.push({
      pha: k,
      cuoi: [Math.round(m.cuoi[0] * 10) / 10, Math.round(m.cuoi[1] * 10) / 10],
      lechStud: Math.round(xa(m.cuoi, STUD) * 100) / 100,
      dauKhopCollet: xa(m.dau, m.collet) < 0.5,
      rTangDonDieu: m.rTangDonDieu,
      gocLonNhatDeg: m.gocLonNhatDeg,
      doDaiNhoNhat: m.doDaiNhoNhat,
    });
  }

  // Khi Phát liên tục: 3 mẫu — đầu ngoài vẫn bất biến
  await bam('static');
  await bam('play');
  const mauPhat = [];
  for (let i = 0; i < 3; i++) {
    await page.waitForTimeout(450);
    const m = await doc();
    mauPhat.push({ cuoi: [Math.round(m.cuoi[0] * 10) / 10, Math.round(m.cuoi[1] * 10) / 10], lechStud: Math.round(xa(m.cuoi, STUD) * 100) / 100 });
  }
  await bam('static');

  const lechPhaNhoNhat = Math.max(...mauPha.map((m) => m.lechStud));
  const lechPhat = Math.max(...mauPhat.map((m) => m.lechStud));
  const dauKhop = mauPha.every((m) => m.dauKhopCollet);
  const khongGay = mauPha.every((m) => m.rTangDonDieu && m.gocLonNhatDeg <= 60 && m.doDaiNhoNhat > 0.5);
  const lechDuBaoCongThucCu = Math.max(...[0, 0.125, 0.25].map((p) => xa(cuoiCongThucCu(p), STUD)));
  const batDuocCongThucCu = lechDuBaoCongThucCu > 50; // công thức cũ trôi >50px → bị ca này bắt

  return {
    thoiGian: new Date().toISOString(),
    stud: STUD,
    lechPhaNhoNhat,
    lechPhat,
    dauKhapColletMoiPha: dauKhop,
    khongGay,
    lechDuBaoCongThucCu: Math.round(lechDuBaoCongThucCu * 10) / 10,
    batDuocCongThucCu,
    tatDat: lechPhaNhoNhat <= 1 && lechPhat <= 1 && dauKhop && khongGay && batDuocCongThucCu,
    mauPha,
    mauPhat,
  };
}
