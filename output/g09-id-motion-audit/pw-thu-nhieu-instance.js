// G09-B chặng 1 — đo thử nghiệm cô lập nhiều instance (file:// — ngoài route xuất bản)
// B1 baseline; B2 tô đỏ pattern ĐẦU (getElementById) → cả A lẫn B có đỏ cùng không;
// B3 chụp ảnh bằng chứng; trả về số đo DOM.
async (page) => {
  const tep = 'file:///D:/Watch%20web%20build/output/g09-id-motion-audit/thu-nhieu-instance.html';
  await page.setViewportSize({ width: 860, height: 640 });
  await page.goto(tep, { waitUntil: 'load' });
  await page.evaluate(() => window.__doKhoiTao());
  const truoc = await page.evaluate(() => {
    const cacId = [...document.querySelectorAll('#guilloche')];
    const first = document.getElementById('guilloche');
    const cacRef = [...document.querySelectorAll('[fill="url(#guilloche)"]')];
    return {
      soId: cacId.length,
      soRef: cacRef.length,
      getElementById_thu: cacId.indexOf(first),
      mauVongTronPatternDau: getComputedStyle(first.querySelector('circle')).stroke,
    };
  });
  await page.screenshot({ path: 'output/g09-id-motion-audit/shots/cach-lap-baseline.png' });

  // B2: phóng đại pattern ĐẦU (element mà getElementById trả về): đỏ + nét dày 8
  // → nếu khung nào vẽ từ pattern đầu thìplate của khung đó hiện lưới đỏ đậm
  await page.evaluate(() => {
    const first = document.getElementById('guilloche');
    first.querySelectorAll('circle').forEach((c) => {
      c.setAttribute('stroke', '#d43737');
      c.setAttribute('stroke-width', '8');
    });
  });
  await page.waitForTimeout(200);
  const sau = await page.evaluate(() => {
    const cacKhu = [...document.querySelectorAll('.watch-image')];
    const mauRieng = cacKhu.map((khu) => {
      const c = khu.querySelector('#guilloche circle');
      return c ? getComputedStyle(c).stroke + ' / w=' + getComputedStyle(c).strokeWidth : null;
    });
    return { mauPatternRiengTungKhung: mauRieng };
  });
  await page.screenshot({ path: 'output/g09-id-motion-audit/shots/cach-lap-todo-pattern-dau.png' });

  // B3: đúng nghĩa tham chiếu — gỡ pattern ĐẦU khỏi DOM rồi đọc lại fill còn resolve được không
  const goDau = await page.evaluate(() => {
    const first = document.getElementById('guilloche');
    const cha = first.closest('svg');
    const soRefTruoc = document.querySelectorAll('[fill="url(#guilloche)"]').length;
    cha.remove(); // gỡ cả svg chứa pattern đầu (giả lập instance đầu bị lấy khỏi DOM)
    const conRef = document.querySelectorAll('[fill="url(#guilloche)"]').length;
    return { soRefTruoc, conRef, idConLai: document.querySelectorAll('#guilloche').length };
  });
  await page.screenshot({ path: 'output/g09-id-motion-audit/shots/cach-lap-go-pattern-dau.png' });

  return 'THỬ NGHIỆM CÔ LẬP:\n' + JSON.stringify({ truoc, sauTotoDo: sau, goPatternDau: goDau }, null, 1);
}
