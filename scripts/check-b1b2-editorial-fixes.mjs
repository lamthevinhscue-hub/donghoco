// =============================================================================
// check-b1b2-editorial-fixes.mjs — B1+B2 (TXN-20261011-07): hồi quy 8 nhóm sửa
// lỗi chuyên môn + cấm 4 biểu tượng ✅ ⚠️ ❌ 💡
// =============================================================================
// Dùng:
//   node scripts/check-b1b2-editorial-fixes.mjs        — chế độ NGUỒN (src/content)
//   node scripts/check-b1b2-editorial-fixes.mjs dist   — chế độ DIST (trang đã dựng,
//     kiểm đúng <article> của từng route — không tìm chuỗi trên toàn HTML)
// Mỗi nhóm B1-1…B1-8 một rule: nội dung đúng phải có ở đúng bài/ngôn ngữ, lỗi cũ
// vắng mặt, nguồn mới hiển thị trong khối nguồn. B2 quét toàn bộ src/content
// (không quét tài liệu quản trị). Exit 1 nếu có lỗi.
// =============================================================================
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const cheDoDist = process.argv[2] === 'dist';
const errors = [];
const dat = (ten, ok, chiTiet) => {
  console.log(`${ok ? 'ĐẠT' : 'KHÔNG ĐẠT'} ${ten}${chiTiet ? ' — ' + chiTiet : ''}`);
  if (!ok) errors.push(ten);
};

const doc = (d) => readFileSync(d, 'utf8');
// Nguồn phải là URL CHÍNH XÁC của MỘT PHẦN TỬ trong MẢNG sources của
// frontmatter — không tính chuỗi URL nằm ở auditNote, sourceNotes, chú thích
// hay trường khác (chống đổi URL giữ nhãn và chống giấu URL ở trường khác).
const mangNguonFm = (frontmatterText) => {
  const urls = [];
  let trong = false;
  for (const dong of frontmatterText.split('\n')) {
    if (/^sources:\s*$/.test(dong)) {
      trong = true;
      continue;
    }
    if (trong && /^[A-Za-z_]/.test(dong)) trong = false; // khóa cấp cao kế tiếp
    if (trong) {
      const m = dong.match(/^\s+url:\s*"([^"]+)"/);
      if (m) urls.push(m[1]);
    }
  }
  return urls;
};
const coNguonFm = (frontmatterText, url) => mangNguonFm(frontmatterText).includes(url);
const vungArticle = (html) => {
  const m = html.match(/<article[\s\S]*?<\/article>/i);
  return m ? m[0] : null; // không fallback toàn HTML — thiếu <article> là lỗi
};

// ===== B2: cấm 4 biểu tượng (có variation selector) trong toàn bộ src/content
const EMOJI = /[\u2705\u26A0\uFE0F\u274C\u{1F4A1}]/u;
const quetEmoji = (thuGoc, ketQua) => {
  for (const ten of readdirSync(thuGoc)) {
    const duong = join(thuGoc, ten);
    if (statSync(duong).isDirectory()) quetEmoji(duong, ketQua);
    else if (/\.(md|markdown)$/.test(ten)) {
      const dong = doc(duong).split('\n');
      for (let i = 0; i < dong.length; i++) {
        if (EMOJI.test(dong[i])) ketQua.push(`${duong.replace(/\\/g, '/')}:${i + 1}`);
      }
    }
  }
};

if (!cheDoDist) {
  // ---------------- CHẾ ĐỘ NGUỒN ----------------
  const vi = (d) => doc(join('src/content', d));
  const frontmatter = (t) => {
    const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    return m ? m[1] : '';
  };

  // B1-1 — IWC
  const iwcVi = vi('mauIconic/vi/iwc-mark-xi.md');
  const iwcEn = vi('mauIconic/en/iwc-mark-xi.md');
  dat(
    'B1-1 IWC VI',
    iwcVi.includes('từ tháng 11/1949 và phục vụ tới năm 1981') &&
      iwcVi.includes('calibre 32111 do IWC sản xuất') &&
      iwcVi.includes('bảo vệ bộ máy (movement) khỏi từ trường — yêu cầu chống từ là điểm RAF đặt ra riêng') &&
      !iwcVi.includes('~1.000 gauss') &&
      !frontmatter(iwcVi).includes('power_reserve') &&
      !frontmatter(iwcVi).includes('water_resistance') &&
      frontmatter(iwcVi).includes('references: ["Mark 11", "Mark XX"]') &&
      coNguonFm(frontmatter(iwcVi), 'https://press.iwc.com/iwc-sihh2019-historicalreferences-en/') &&
      coNguonFm(frontmatter(iwcVi), 'https://www.iwc.com/us-en/watches/pilot-watches/iw328208-pilots-watch-mark-xx'),
    'Mark 11/Mark XX tách đúng, gỡ gauss, nguồn IWC có'
  );
  dat(
    'B1-1 IWC EN',
    iwcEn.includes('from November 1949 and stayed in service until 1981') &&
      iwcEn.includes('IWC-manufactured calibre 32111') &&
      iwcEn.includes('a requirement the RAF specified for this watch') &&
      !iwcEn.includes('1,000 gauss') &&
      !frontmatter(iwcEn).includes('power_reserve') &&
      !frontmatter(iwcEn).includes('water_resistance') &&
      frontmatter(iwcEn).includes('references: ["Mark 11", "Mark XX"]') &&
      coNguonFm(frontmatter(iwcEn), 'https://press.iwc.com/iwc-sihh2019-historicalreferences-en/') &&
      coNguonFm(frontmatter(iwcEn), 'https://www.iwc.com/us-en/watches/pilot-watches/iw328208-pilots-watch-mark-xx'),
    'Mark 11/Mark XX tách đúng, gỡ gauss, nguồn IWC có'
  );

  // B1-2 — biên độ
  const bienDoVi = vi('tuDien/vi/bien-do.md');
  const bienDoEn = vi('tuDien/en/amplitude.md');
  dat(
    'B1-2 biên độ VI',
    bienDoVi.includes('góc bánh lắc quay từ vị trí cân bằng tới điểm quay đầu trong mỗi nhịp dao động') &&
      bienDoVi.includes('từ **vị trí cân bằng** của bánh lắc tới **điểm quay đầu**') &&
      coNguonFm(frontmatter(bienDoVi), 'https://www.hswalsh.com/usercontent/doc/30780/HWAIO%20-%20Witschi%20WAIO%20Operating%20Instructions.pdf') &&
      bienDoVi.includes('Witschi — WAIO Operating Instructions') &&
      bienDoVi.includes('Bộ phận truyền xung lực tới bánh lắc qua ngựa') &&
      !bienDoVi.includes('khoảng góc giữa hai vị trí cực đại của cán bánh lắc') &&
      !bienDoVi.includes('Bộ phận nhận xung lực từ bánh lắc'),
    'định nghĩa hẹp Witschi tách khỏi FHH, chiều xung lực đúng'
  );
  dat(
    'B1-2 biên độ EN',
    bienDoEn.includes('the angle the balance turns from its rest position to its turning point') &&
      bienDoEn.includes("from the balance's **rest position** to its **turning point**") &&
      coNguonFm(frontmatter(bienDoEn), 'https://www.hswalsh.com/usercontent/doc/30780/HWAIO%20-%20Witschi%20WAIO%20Operating%20Instructions.pdf') &&
      bienDoEn.includes('Witschi — WAIO Operating Instructions') &&
      !bienDoEn.includes('angular distance between the two extreme points of an oscillation'),
    'định nghĩa hẹp Witschi tách khỏi FHH'
  );

  // B1-3 — Swiss Made
  const swissVi = vi('huongDan/vi/swiss-made.md');
  const swissEn = vi('huongDan/en/swiss-made.md');
  dat(
    'B1-3 Swiss Made SR',
    swissVi.includes("SR 232.119") && swissEn.includes("SR 232.119") &&
      !swissVi.includes('817.021.51') && !swissEn.includes('817.021.51') &&
      swissVi.includes('www.fedlex.admin.ch') && swissEn.includes('www.fedlex.admin.ch'),
    'mã văn bản pháp lý đúng ở cả hai bản, URL Fedlex giữ nguyên'
  );

  // B1-4 — Patek Seal
  const patekVi = vi('thuongHieu/vi/patek-philippe.md');
  const patekEn = vi('thuongHieu/en/patek-philippe.md');
  dat(
    'B1-4 Patek Seal VI',
    !patekVi.includes('khắt khe hơn') &&
      patekVi.includes('chuẩn nội bộ riêng của hãng, áp dụng cho cả chiếc đồng hồ hoàn thiện chứ không chỉ bộ máy') &&
      coNguonFm(frontmatter(patekVi), 'https://www.patek.com/en/manufacture/a-story-of-independence/the-patek-philippe-seal'),
    'bỏ so sánh chưa có căn cứ, thêm nguồn Seal'
  );
  dat(
    'B1-4 Patek Seal EN',
    !patekEn.includes('stricter') &&
      patekEn.includes("the brand's own internal standard, covering the finished watch rather than the movement alone") &&
      coNguonFm(frontmatter(patekEn), 'https://www.patek.com/en/manufacture/a-story-of-independence/the-patek-philippe-seal'),
    'bỏ so sánh chưa có căn cứ, thêm nguồn Seal'
  );

  // B1-5 — lịch vạn niên
  const perVi = vi('coChe/vi/perpetual-calendar.md');
  const perEn = vi('coChe/en/perpetual-calendar.md');
  dat(
    'B1-5 lịch vạn niên VI',
    perVi.includes('chỉ phải chỉnh vào những năm tròn thế kỷ không nhuận — kế tiếp là 2100') &&
      perVi.includes('Năm 2400 chia hết cho 400') &&
      perVi.includes('bài này không theo điểm đó') &&
      coNguonFm(frontmatter(perVi), 'https://aa.usno.navy.mil/faq/calendars') &&
      !/2100 và 2400/.test(perVi) &&
      !perVi.includes('không cần chỉnh') &&
      !perVi.includes('mãi mãi'),
    '2400 là năm nhuận theo Gregory, tách rõ điểm FHH không theo'
  );
  dat(
    'B1-5 lịch vạn niên EN',
    perEn.includes('the next being 2100**, then 2200 and 2300') &&
      perEn.includes('The year 2400 is divisible by 400 and remains a leap year') &&
      perEn.includes('does not follow that point') &&
      coNguonFm(frontmatter(perEn), 'https://aa.usno.navy.mil/faq/calendars') &&
      !/2100 and 2400/.test(perEn) &&
      !perEn.includes('never needs') &&
      !perEn.includes('no correction needed'),
    '2400 là năm nhuận theo Gregory, tách rõ điểm FHH không theo'
  );

  // B1-6 — chronograph
  const chronoVi = vi('coChe/vi/chronograph.md');
  dat(
    'B1-6 chronograph',
    chronoVi.includes('thợ đồng hồ được nhà vua Pháp bổ nhiệm') && !chronoVi.includes('thợ hồ'),
    'thợ hồ → thợ đồng hồ'
  );

  // B1-7 — hiển thị ngày
  const ngayVi = vi('coChe/vi/hien-thi-ngay.md');
  const ngayEn = vi('coChe/en/date-display.md');
  dat(
    'B1-7 hiển thị ngày VI',
    ngayVi.includes('nằm ngay dưới mặt số') &&
      ngayVi.includes('### Ngón đẩy và cá nhảy') &&
      ngayVi.includes('**cá nhảy** (date jumper) giữ đĩa đứng đúng vị trí suốt cả ngày') &&
      ngayVi.includes('trong **vài giờ quanh nửa đêm**') &&
      ngayVi.includes('tra hướng dẫn chỉnh ngày của hãng đúng mẫu và calibre') &&
      !ngayVi.includes('khoảng 20 giờ tối') &&
      !ngayVi.includes('đưa kim giờ về khoảng 6 giờ') &&
      !ngayVi.includes('đắt cơ cấu ít hơn') &&
      !ngayVi.includes('khoảng 2-3 giờ') &&
      !ngayVi.includes('bánh răng đẩy ngày'),
    'đĩa ngày phía mặt số, ngón đẩy/cá nhảy tách đúng, bỏ khung giờ cứng'
  );
  dat(
    'B1-7 hiển thị ngày EN',
    ngayEn.includes('sitting just beneath the dial') &&
      ngayEn.includes('### The finger and the date jumper') &&
      ngayEn.includes('holds the disk in position all day') &&
      ngayEn.includes('for **a few hours around midnight**') &&
      ngayEn.includes("maker's manual for your specific model and calibre") &&
      !ngayEn.includes('around 8 pm') &&
      !ngayEn.includes("about 6 o'clock") &&
      !ngayEn.includes('mechanically cheaper') &&
      !ngayEn.includes('2–3 hours') &&
      !ngayEn.includes('from about 8 pm to about 4 am'),
    'đĩa ngày phía mặt số, finger/jumper tách đúng, bỏ khung giờ cứng'
  );

  // B1-8 — dạ quang
  const lumeVi = vi('coChe/vi/da-quang.md');
  const lumeEn = vi('coChe/en/lume.md');
  dat(
    'B1-8 dạ quang VI',
    lumeVi.includes('Ba thế hệ vật liệu dạ quang: radium và tritium tự sáng nhờ phóng xạ kích thích chất phát quang') &&
      lumeVi.includes('## Nguyên lý — hai cách phát sáng') &&
      lumeVi.includes('radioluminescence') &&
      lumeVi.includes('bài học đau xót') &&
      coNguonFm(frontmatter(lumeVi), 'https://www.rctritec.com/en/superluminova/history-of-luminous-pigments') &&
      coNguonFm(frontmatter(lumeVi), 'https://luminox.com/pages/super-luminova') &&
      !lumeVi.includes('thảm kỷ niệm') &&
      !lumeVi.includes('mãi mãi') &&
      !lumeVi.includes('tự phát sáng liên tục'),
    'hai cách phát sáng tách rõ, bỏ "mãi mãi"/thảm kỷ niệm, nguồn đủ'
  );
  dat(
    'B1-8 dạ quang EN',
    lumeEn.includes('Three generations of lume: radium and tritium glow by themselves because radiation excites a phosphor') &&
      lumeEn.includes('## The principle — two ways to glow') &&
      lumeEn.includes('radioluminescence') &&
      lumeEn.includes('earliest painful lessons') &&
      coNguonFm(frontmatter(lumeEn), 'https://www.rctritec.com/en/superluminova/history-of-luminous-pigments') &&
      coNguonFm(frontmatter(lumeEn), 'https://luminox.com/pages/super-luminova') &&
      !lumeEn.includes('glowed forever') &&
      !lumeEn.includes('safety tragedies') &&
      !lumeEn.includes('glows by itself'),
    'hai cách phát sáng tách rõ, bỏ "forever"/tragedies, nguồn đủ'
  );

  // B2 — quét biểu tượng toàn src/content
  const emojiHit = [];
  quetEmoji('src/content', emojiHit);
  dat(
    'B2 biểu tượng src/content',
    emojiHit.length === 0,
    emojiHit.length ? 'còn: ' + emojiHit.slice(0, 5).join(' | ') : 'src/content sạch ✅⚠️❌💡 (không quét tài liệu quản trị)'
  );
} else {
  // ---------------- CHẾ ĐỘ DIST ----------------
  const distDoc = (r) => {
    const d = join('dist', r, 'index.html');
    if (!existsSync(d)) return null;
    return vungArticle(doc(d));
  };

  const kiemDist = (ten, route, phaiCo, phaiKhong, nguonUrl = []) => {
    const dTep = join('dist', route, 'index.html');
    const html = distDoc(route);
    if (html === null) {
      dat(ten, false, existsSync(dTep) ? `dist/${route}: KHÔNG tìm thấy <article> — không fallback toàn HTML` : `thiếu dist/${route}/index.html`);
      return;
    }
    const thieu = phaiCo.filter((s) => !html.includes(s));
    const con = phaiKhong.filter((s) => html.includes(s));
    // href nguồn CHỈ được đếm trong section khối nguồn (class source-list)
    // nằm trong article — liên kết cùng URL ở đoạn thân/menu không được tính.
    const vungNguon = html.match(/<section class="source-list[^"]*"[\s\S]*?<\/section>/i);
    if (!vungNguon) {
      dat(ten, false, 'dist/' + route + ': article không có section khối nguồn (source-list)');
      return;
    }
    const vung = vungNguon[0];
    const thieuNguon = nguonUrl.filter((u) => !vung.includes(`href="${u}"`));
    const ok = thieu.length === 0 && con.length === 0 && thieuNguon.length === 0;
    const moTa = thieu.length ? 'thiếu: ' + thieu.join(' | ') : con.length ? 'còn: ' + con.join(' | ') : thieuNguon.length ? 'khối nguồn thiếu liên kết: ' + thieuNguon.join(' | ') : 'article đủ nội dung mới, sạch lỗi cũ, khối nguồn đủ liên kết';
    dat(ten, ok, moTa);
  };

  kiemDist('B1-1 IWC VI dist', 'mau-iconic/iwc-mark-xi',
    ['từ tháng 11/1949 và phục vụ tới năm 1981', 'calibre 32111 do IWC sản xuất'],
    ['~1.000 gauss'],
    ['https://press.iwc.com/iwc-sihh2019-historicalreferences-en/', 'https://www.iwc.com/us-en/watches/pilot-watches/iw328208-pilots-watch-mark-xx']);
  kiemDist('B1-1 IWC EN dist', 'en/iconic-watches/iwc-mark-xi',
    ['from November 1949 and stayed in service until 1981', 'IWC-manufactured calibre 32111'],
    ['1,000 gauss'],
    ['https://press.iwc.com/iwc-sihh2019-historicalreferences-en/', 'https://www.iwc.com/us-en/watches/pilot-watches/iw328208-pilots-watch-mark-xx']);
  kiemDist('B1-2 biên độ VI dist', 'tu-dien/bien-do',
    ['tới điểm quay đầu', 'Witschi — WAIO Operating Instructions'],
    ['khoảng góc giữa hai vị trí cực đại'],
    ['https://www.hswalsh.com/usercontent/doc/30780/HWAIO%20-%20Witschi%20WAIO%20Operating%20Instructions.pdf']);
  kiemDist('B1-2 biên độ EN dist', 'en/glossary/amplitude',
    ['rest position', 'turning point', 'Witschi — WAIO Operating Instructions'],
    ['angular distance between the two extreme points'],
    ['https://www.hswalsh.com/usercontent/doc/30780/HWAIO%20-%20Witschi%20WAIO%20Operating%20Instructions.pdf']);
  kiemDist('B1-3 Swiss Made VI dist', 'huong-dan/swiss-made', ['SR 232.119'], ['817.021.51']);
  kiemDist('B1-3 Swiss Made EN dist', 'en/guides/swiss-made', ['SR 232.119'], ['817.021.51']);
  kiemDist('B1-4 Patek VI dist', 'thuong-hieu/patek-philippe',
    ['chuẩn nội bộ riêng của hãng'], ['khắt khe hơn'],
    ['https://www.patek.com/en/manufacture/a-story-of-independence/the-patek-philippe-seal']);
  kiemDist('B1-4 Patek EN dist', 'en/brands/patek-philippe',
    ['the brand’s own internal standard'], ['stricter'],
    ['https://www.patek.com/en/manufacture/a-story-of-independence/the-patek-philippe-seal']);
  kiemDist('B1-5 lịch vạn niên VI dist', 'co-che/perpetual-calendar',
    ['Năm 2400 chia hết cho 400'], ['2100 và 2400', 'không cần chỉnh'],
    ['https://aa.usno.navy.mil/faq/calendars']);
  kiemDist('B1-5 lịch vạn niên EN dist', 'en/mechanisms/perpetual-calendar',
    ['The year 2400 is divisible by 400'], ['2100 and 2400', 'no correction needed'],
    ['https://aa.usno.navy.mil/faq/calendars']);
  kiemDist('B1-6 chronograph VI dist', 'co-che/chronograph',
    ['thợ đồng hồ được nhà vua Pháp bổ nhiệm'], ['thợ hồ']);
  kiemDist('B1-7 hiển thị ngày VI dist', 'co-che/hien-thi-ngay',
    ['nằm ngay dưới mặt số', 'Ngón đẩy và cá nhảy', 'vài giờ quanh nửa đêm'],
    ['khoảng 20 giờ tối', 'về khoảng 6 giờ', 'bánh răng đẩy ngày', 'đắt cơ cấu ít hơn']);
  kiemDist('B1-7 hiển thị ngày EN dist', 'en/mechanisms/date-display',
    ['sitting just beneath the dial', 'The finger and the date jumper', 'a few hours around midnight'],
    ['around 8 pm', 'mechanically cheaper', '2–3 hours']);
  kiemDist('B1-8 dạ quang VI dist', 'co-che/da-quang',
    ['Nguyên lý — hai cách phát sáng', 'radioluminescence'],
    ['thảm kỷ niệm', 'mãi mãi'],
    ['https://www.rctritec.com/en/superluminova/history-of-luminous-pigments', 'https://luminox.com/pages/super-luminova']);
  kiemDist('B1-8 dạ quang EN dist', 'en/mechanisms/lume',
    ['two ways to glow', 'radioluminescence'],
    ['glowed forever', 'safety tragedies'],
    ['https://www.rctritec.com/en/superluminova/history-of-luminous-pigments', 'https://luminox.com/pages/super-luminova']);

  // B2 dist: 12 bài không còn biểu tượng trong article
  const dist12 = [
    'co-che/chong-tu', 'en/mechanisms/anti-magnetism', 'co-che/tru-cot', 'co-che/bo-thoat-dong-truc',
    'co-che/chong-soc', 'huong-dan/chinh-lich-an-toan', 'en/guides/setting-the-date-safely',
    'huong-dan/doc-va-chinh-gmt', 'huong-dan/dung-tachymeter', 'huong-dan/dung-vanh-lan',
    'huong-dan/len-day-dong-ho', 'en/guides/winding-a-mechanical-watch',
  ];
  const emojiHitDist = [];
  for (const r of dist12) {
    const html = distDoc(r);
    if (html === null) {
      emojiHitDist.push(`${r}: thiếu dist`);
      continue;
    }
    if (EMOJI.test(html)) emojiHitDist.push(r);
  }
  dat(
    'B2 biểu tượng dist 12 bài',
    emojiHitDist.length === 0,
    emojiHitDist.length ? 'còn: ' + emojiHitDist.join(' | ') : '12 bài dist sạch biểu tượng'
  );
}

if (errors.length) {
  console.log(`=> B1B2 THẤT BẠI (${cheDoDist ? 'dist' : 'nguồn'}): ${errors.length} phép kiểm (${errors.join('; ')})`);
  process.exit(1);
}
console.log(`=> B1B2 ĐẠT (${cheDoDist ? 'dist' : 'nguồn'}).`);
