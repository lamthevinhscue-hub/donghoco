// G09-B chặng 2 — chẩn đoán placeholder: ảnh hero có tồn tại? pattern abort khớp gì?
async (page) => {
  const kq = [];
  const cacAnh = [];
  page.on('request', (r) => { if (/\.(jpg|jpeg|png|webp|avif)/.test(r.url())) cacAnh.push(r.url().replace('http://localhost:4399', '')); });
  await page.goto('http://localhost:4399/thuong-hieu/rolex/', { waitUntil: 'load' });
  await page.waitForTimeout(600);
  const trang = await page.evaluate(() => {
    const plates = [...document.querySelectorAll('figure.watch-image')].map((fig, i) => {
      const img = fig.querySelector('img');
      const ph = fig.querySelector('.placeholder');
      return { thu: i + 1, coImg: !!img, src: img ? img.getAttribute('src') : null, imgHienThi: img ? getComputedStyle(img).display : null, phDisplay: ph ? getComputedStyle(ph).display : null, loaded: fig.classList.contains('loaded') };
    });
    return { soPlate: plates.length, plates };
  });
  kq.push('rolex: ' + JSON.stringify(trang));
  kq.push('anh da goi: ' + JSON.stringify(cacAnh));
  // đối chiếu audemars-piguet
  const cacAnh2 = [];
  page.on('request', (r) => { if (/\.(jpg|jpeg|png|webp|avif)/.test(r.url())) cacAnh2.push(r.url().replace('http://localhost:4399', '')); });
  await page.goto('http://localhost:4399/thuong-hieu/audemars-piguet/', { waitUntil: 'load' });
  await page.waitForTimeout(600);
  const trang2 = await page.evaluate(() => {
    const plates = [...document.querySelectorAll('figure.watch-image')].map((fig, i) => {
      const img = fig.querySelector('img');
      const ph = fig.querySelector('.placeholder');
      return { thu: i + 1, coImg: !!img, src: img ? img.getAttribute('src') : null, phDisplay: ph ? getComputedStyle(ph).display : null };
    });
    return { soPlate: plates.length, plates };
  });
  kq.push('ap: ' + JSON.stringify(trang2));
  kq.push('anh ap da goi: ' + JSON.stringify(cacAnh2));
  return kq.join('\n');
}
