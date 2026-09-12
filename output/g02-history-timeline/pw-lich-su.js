async (page) => {
  const BASE = 'http://localhost:4321';
  const out = [];
  const ghi = (ten, dat, chiTiet) => out.push({ ten, dat: dat === true, chiTiet: String(chiTiet ?? '') });
  const ANH = 'output/g02-history-timeline/anh/';

  for (const theme of ['light', 'dark']) {
    for (const vp of [320, 1440]) {
      await page.setViewportSize({ width: vp, height: 900 });
      await page.goto(BASE + '/lich-su', { waitUntil: 'load' });
      await page.evaluate((t) => localStorage.setItem('theme', t), theme);
      await page.reload({ waitUntil: 'load' });
      await page.waitForTimeout(3200); // chờ reveal-all (fallback 3000ms)
      // Kích hoạt lazy-load ảnh: cuộn tuần tự tới đáy (chậm để lazy kịp tải) rồi về đầu
      await page.evaluate(async () => {
        const buoc = Math.floor(window.innerHeight * 0.6);
        for (let y = 0; y < document.body.scrollHeight; y += buoc) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 300));
        }
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((r) => setTimeout(r, 1000));
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1000);
      const tag = vp + '-' + theme;

      // đủ 28 mốc + không tràn ngang + ảnh không hỏng
      const coBan = await page.evaluate(() => {
        const cards = document.querySelectorAll('.milestone-card');
        const anh = [...document.querySelectorAll('.milestone-card img')];
        const anhHong = anh.filter((im) => !im.complete || im.naturalWidth === 0).map((im) => im.getAttribute('src'));
        return {
          soThe: cards.length,
          soAnh: anh.length,
          anhHong,
          scrollW: document.documentElement.scrollWidth,
          clientW: document.documentElement.clientWidth,
          domDark: document.documentElement.classList.contains('dark'),
          soNguon: document.querySelectorAll('.milestone-card a[rel="noopener noreferrer"]').length,
          soGioiHan: [...document.querySelectorAll('.milestone-card p')].filter((p) => p.textContent.includes('Giới hạn:')).length,
          soChuaCoBai: [...document.querySelectorAll('.milestone-card p')].filter((p) => p.textContent.includes('Chưa có bài đọc thêm')).length,
          soDocChiTiet: [...document.querySelectorAll('.milestone-card a')].filter((a) => a.textContent.includes('Đọc chi tiết')).length,
          timeLabelDau: document.querySelector('.milestone-year')?.textContent?.trim(),
        };
      });
      ghi(`[${tag}] đủ 28 mốc`, coBan.soThe === 28, `soThe=${coBan.soThe}`);
      ghi(`[${tag}] không tràn ngang`, coBan.scrollW <= coBan.clientW + 1, `scroll=${coBan.scrollW} client=${coBan.clientW}`);
      ghi(`[${tag}] ảnh timeline không hỏng (${coBan.soAnh} ảnh)`, coBan.anhHong.length === 0 && coBan.soAnh >= 28, `hỏng=${coBan.anhHong.join(',') || 'không'}`);
      ghi(`[${tag}] nguồn hiển thị trên thẻ`, coBan.soNguon >= 28, `soLinkNguon=${coBan.soNguon}`);
      ghi(`[${tag}] nhãn giới hạn hiển thị`, coBan.soGioiHan === 19, `soGioiHan=${coBan.soGioiHan}`);
      ghi(`[${tag}] đọc tiếp/chưa có bài (25 link + 3 nhãn)`, coBan.soDocChiTiet === 25 && coBan.soChuaCoBai === 3, `docChiTiet=${coBan.soDocChiTiet} chuaCo=${coBan.soChuaCoBai}`);
      ghi(`[${tag}] theme thật từ DOM`, coBan.domDark === (theme === 'dark'), `dark=${coBan.domDark}`);
      ghi(`[${tag}] mốc đầu hiển thị nhãn ~1510`, coBan.timeLabelDau === '~1510', `label="${coBan.timeLabelDau}"`);

      // điều hướng mốc ~1510: nút ĐẦU của nav ĐANG HIỂN THỊ theo viewport
      // (desktop ≥1024: aside #timeline-nav; dưới 1024: mở panel mobile rồi bấm)
      await page.evaluate(() => window.scrollTo(0, 0));
      let viTri = null;
      if (vp >= 1024) {
        const nutDau = page.locator('#timeline-nav [data-jump-to="0"]').first();
        if ((await nutDau.count()) > 0) {
          await nutDau.click();
          await page.waitForTimeout(2000); // smooth scroll cần thời gian ở trang dài
          viTri = await page.evaluate(() => {
            const card = document.getElementById('milestone-0');
            const r = card.getBoundingClientRect();
            const tyLe = r.height > 0 ? Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0) : 0;
            return {
              cardLabel: card.querySelector('.milestone-year')?.textContent?.trim(),
              trongManHinh: tyLe >= r.height * 0.5,
              top: Math.round(r.top),
            };
          });
        }
      } else {
        await page.locator('#timeline-nav-toggle').click();
        const nutMob = page.locator('#timeline-nav-mobile [data-jump-to="0"]').first();
        const moDuoc = (await nutMob.count()) > 0 && (await nutMob.isVisible());
        if (moDuoc) {
          await nutMob.click();
          await page.waitForTimeout(2000);
          viTri = await page.evaluate(() => {
            const card = document.getElementById('milestone-0');
            const r = card.getBoundingClientRect();
            const panelDong = document.getElementById('timeline-nav-mobile').classList.contains('hidden');
            const tyLe = r.height > 0 ? Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0) : 0;
            return {
              cardLabel: card.querySelector('.milestone-year')?.textContent?.trim(),
              trongManHinh: tyLe >= r.height * 0.5,
              panelDong,
              top: Math.round(r.top),
            };
          });
        }
      }
      if (viTri) {
        // Tiêu chí: cuộn tới ĐÚNG thẻ Peter Henlein (~1510) và thẻ lọt màn hình
        ghi(`[${tag}] nút điều hướng đầu → thẻ Peter Henlein ~1510`, viTri.cardLabel === '~1510' && viTri.trongManHinh, JSON.stringify(viTri));
      } else {
        ghi(`[${tag}] nút điều hướng đầu tồn tại và bấm được`, false, 'không tìm thấy nút theo viewport');
      }

      // bàn phím: focus nút điều hướng ĐANG HIỂN THỊ → Enter nhảy mốc
      await page.evaluate(() => window.scrollTo(0, 0));
      const tabDa = await page.evaluate((desktop) => {
        const nav = desktop ? document.getElementById('timeline-nav') : document.getElementById('timeline-nav-mobile');
        const toggle = document.getElementById('timeline-nav-toggle');
        if (desktop) {
          if (!nav) return { co: false };
          nav.querySelector('button[data-jump-to]').focus();
          return { co: true, focusTrenNut: document.activeElement === nav.querySelector('button[data-jump-to]') };
        }
        // mobile: panel phải mở mới bấm được nút trong đó
        toggle?.click();
        const btn = nav?.querySelector('button[data-jump-to]');
        if (!btn) return { co: false };
        btn.focus();
        return { co: true, focusTrenNut: document.activeElement === btn };
      }, vp >= 1024);
      if (tabDa.co) {
        await page.keyboard.press('Enter');
        await page.waitForTimeout(900);
        const sau = await page.evaluate(() => {
          const card = document.getElementById('milestone-0');
          const r = card.getBoundingClientRect();
          return { trongManHinh: r.top < window.innerHeight && r.bottom > 0 };
        });
        ghi(`[${tag}] bàn phím: focus nút + Enter nhảy tới mốc`, tabDa.focusTrenNut && sau.trongManHinh, JSON.stringify({ ...tabDa, ...sau }));
      } else {
        ghi(`[${tag}] bàn phím: có nút điều hướng để focus`, false, 'không tìm thấy nav theo viewport');
      }

      await page.screenshot({ path: ANH + `lich-su-${tag}.png` });
    }
  }

  const dat = out.filter((o) => o.dat).length;
  return `TRINH-DUYET /lich-su TONG=${out.length} DAT=${dat}\n` + out.map((o) => (o.dat ? 'DAT  ' : 'KHONG_DAT ') + o.ten + (o.dat ? '' : ' | ' + o.chiTiet)).join('\n') + '\n@@JSON@@' + JSON.stringify(out);
}
