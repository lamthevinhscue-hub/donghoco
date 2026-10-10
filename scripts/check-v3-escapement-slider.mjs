// =============================================================================
// check-v3-escapement-slider.mjs — bảo vệ bản thử V3 (TXN-20261010-003)
// =============================================================================
// Chạy: node scripts/check-v3-escapement-slider.mjs [dist]
//   không tham số  — kiểm nguồn (mặc định)
//   tham số "dist" — thêm kiểm dist sau build
// Kiểm:
//   V3-1 phạm vi: chỉ đúng hai bài bộ thoát bật slider_video; mp4 thuyết minh
//        và has_infographic:false giữ nguyên.
//   V3-2 hành vi component: không autoplay/loop/tự phát; preload="none"; tải
//        chủ động; thanh trượt disabled đến khi metadata; mô hình đích chờ khi
//        seek; nhãn aria-live; ghi chú giản lược; noscript.
//   V3-3 ánh xạ pha: phas.json — 8 pha phủ đúng 0→8000ms, biên tăng đơn điệu;
//        component render bảng từ đúng nguồn JSON này.
//   V3-4 tài sản: webm + poster tồn tại, trong ngân sách; không ghi đè mp4 cũ.
//   V3-5 tích hợp: gate slug trong MechanismArticle; schema; gate G06 giữ
//        nguyên văn.
//   V3-6 dist: hai bài chứa khối v3esc với preload="none" và KHÔNG autoplay;
//        không bài nào khác chứa khối; tệp webm vào đúng nơi trong dist.
// Exit 1 nếu có hồi quy.
// =============================================================================
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const KIEM = [];
const kiem = (ma, ten, dung, chiTiet = '') => {
  KIEM.push({ ma, ten, dung, chiTiet });
  console.log(`  ${dung ? 'ĐẠT' : 'LỖI'} [${ma}] ${ten}${chiTiet ? ' — ' + chiTiet : ''}`);
};
const doc = (p) => readFileSync(p, 'utf8');

// ===== V3-1 phạm vi =====
const THU_MUC = {
  vi: 'src/content/coChe/vi',
  en: 'src/content/coChe/en',
};
const bat = [];
for (const [ngon, thu] of Object.entries(THU_MUC)) {
  for (const tep of readdirSync(thu)) {
    if (!tep.endsWith('.md')) continue;
    const nd = doc(join(thu, tep));
    if (/^slider_video:[ \t]*true/m.test(nd)) bat.push(`${ngon}/${tep.replace('.md', '')}`);
  }
}
kiem('V3-1', 'Chỉ đúng hai bài bộ thoát bật slider_video', bat.length === 2 && bat.includes('vi/bo-thoat') && bat.includes('en/escapement'), bat.join(', '));

const baiVi = doc('src/content/coChe/vi/bo-thoat.md');
const baiEn = doc('src/content/coChe/en/escapement.md');
kiem('V3-1', 'Bài VI giữ video thuyết minh mp4 cũ', /principle_video:[ \t]*"\/videos\/bo-thoat-nguyen-ly-vi\.mp4"/.test(baiVi));
kiem('V3-1', 'Bài EN giữ video thuyết minh mp4 cũ', /principle_video:[ \t]*"\/videos\/bo-thoat-nguyen-ly-en\.mp4"/.test(baiEn));
kiem('V3-1', 'Hai bài vẫn has_infographic: false (SVG chỉ bật kèm V3)', /^has_infographic:[ \t]*false$/m.test(baiVi) && /^has_infographic:[ \t]*false$/m.test(baiEn));

// ===== V3-2 hành vi component =====
const comp = doc('src/components/EscapementSliderVideo.astro');
kiem('V3-2', 'Không autoplay / loop / lệnh play()', !/\bautoplay\b/.test(comp) && !/\bloop\b/.test(comp) && !/\.play\s*\(/.test(comp));
kiem('V3-2', 'preload="none" — không yêu cầu video trước thao tác', /preload="none"/.test(comp));
kiem('V3-2', 'Video chỉ gán src khi bấm nút (tải chủ động)', /data-src=/.test(comp) && /video\.src\s*=\s*video\.dataset\.src/.test(comp) && /nut\.addEventListener\('click', batDauTai\)/.test(comp));
kiem('V3-2', 'Thanh trượt disabled đến khi metadata sẵn sàng', /disabled\s*\n/.test(comp.split('id="v3esc-thanh"')[1]?.slice(0, 400) || '') && /thanh\.disabled\s*=\s*false/.test(comp));
kiem('V3-2', 'Mô hình đích chờ khi seek (kéo nhanh/ngược không đè nhau)', /dichCho/.test(comp) && /video\.addEventListener\('seeked'/.test(comp) && /dichCho\s*=\s*null;\s*\n\s*capNhatNhan|dichCho = null;/.test(comp));
kiem('V3-2', 'Video luôn pause khi kéo (không tự phát)', /video\.pause\(\)/.test(comp));
kiem('V3-2', 'Nhãn pha aria-live + aria-valuetext', /aria-live="polite"/.test(comp) && /aria-valuetext/.test(comp));
kiem('V3-2', 'Ghi chú giản lược hiển thị theo ngôn ngữ', /PHAS\.ghiChuEn/.test(comp) && /PHAS\.ghiChuVi/.test(comp));
kiem('V3-2', 'noscript cho môi trường không JavaScript', /<noscript>/.test(comp));
kiem('V3-2', 'Xử lý lỗi tải video (thông báo, vẫn dùng được bảng pha)', /video\.addEventListener\('error'/.test(comp));

// ===== V3-3 ánh xạ pha =====
const phas = JSON.parse(doc('src/data/v3-escapement-phas.json'));
kiem('V3-3', 'phas.json: duration 8000ms, fps 30, 8 pha', phas.durationMs === 8000 && phas.fps === 30 && phas.phases.length === 8, `${phas.phases.length} pha`);
const bienTang = phas.phases.every((p, i) => p.startMs < p.endMs && (i === 0 || p.startMs === phas.phases[i - 1].endMs));
kiem('V3-3', 'Biên pha liên tục, tăng đơn điệu', bienTang);
kiem('V3-3', 'Pha phủ đúng 0 → 8000ms', phas.phases[0].startMs === 0 && phas.phases[phas.phases.length - 1].endMs === 8000);
kiem('V3-3', 'Component render bảng từ đúng nguồn phas.json', /import PHAS from '\.\.\/data\/v3-escapement-phas\.json'/.test(comp) && /data-phas=\{JSON\.stringify\(cacPha\)\}/.test(comp) && /cacPha\.map\(/.test(comp));
kiem('V3-3', 'Script dựng cảnh đọc cùng nguồn phas.json', /v3-escapement-phas\.json/.test(doc('scripts/v3-escapement/dung-canh.html')));
const duCanCu = phas.phases.length === 8 && phas.phases.every((p) => {
  const c = p.canCu || {};
  return typeof c.vi === 'string' && c.vi.length > 0 && typeof c.en === 'string' && c.en.length > 0 && c.vi !== c.en;
});
kiem('V3-7', 'Đủ 8 căn cứ song ngữ (VI + EN khác nhau, không rỗng)', duCanCu);
const chuaTiengViet = (chu) => /[ăâđêôơưàáảãạằẵèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵ]/i.test(chu);
const oEnLanVi = phas.phases.filter((p) => chuaTiengViet(p.canCu.en));
kiem('V3-7', 'Căn cứ EN không mang chữ tiếng Việt', oEnLanVi.length === 0, oEnLanVi.length ? 'ô lẫn VI: ' + oEnLanVi.map((p) => p.id).join(', ') : 'sạch 8/8');

// ===== V3-4 tài sản =====
const WEBM = 'public/videos/v3-escapement/bo-thoat-chu-ky-truot.webm';
const POSTER = 'public/videos/v3-escapement/poster.jpg';
if (existsSync(WEBM)) {
  const kichThuoc = statSync(WEBM).size;
  kiem('V3-4', 'Video webm trong ngân sách (≤ 1,2 MB)', kichThuoc <= 1_200_000, `${(kichThuoc / 1024).toFixed(0)} KB`);
} else kiem('V3-4', 'Video webm tồn tại', false, WEBM);
if (existsSync(POSTER)) {
  const kichThuoc = statSync(POSTER).size;
  kiem('V3-4', 'Poster trong ngân sách (≤ 120 KB)', kichThuoc <= 120_000, `${(kichThuoc / 1024).toFixed(0)} KB`);
} else kiem('V3-4', 'Poster tồn tại', false, POSTER);
kiem('V3-4', 'Không tệp mp4 nào trong thư mục V3 (không ghi đè mp4 cũ)', !readdirSync('public/videos/v3-escapement').some((t) => t.endsWith('.mp4')));
kiem('V3-4', 'Hai mp4 thuyết minh cũ còn nguyên', existsSync('public/videos/bo-thoat-nguyen-ly-vi.mp4') && existsSync('public/videos/bo-thoat-nguyen-ly-en.mp4'));

// ===== V3-5 tích hợp =====
const article = doc('src/components/templates/MechanismArticle.astro');
kiem('V3-5', 'Gate slug đúng hai bài trong MechanismArticle', /const V3_SLIDER_SLUGS = \['bo-thoat', 'escapement'\];/.test(article) && /data\.slider_video === true && V3_SLIDER_SLUGS\.includes\(slug\)/.test(article));
kiem('V3-5', 'V3 đặt cạnh SVG (render trước Infographic)', article.indexOf('sliderAllowed && <EscapementSliderVideo') < article.indexOf('<Infographic lang={lang} />'));
kiem('V3-5', 'Schema slider_video mặc định false', /slider_video: z\.boolean\(\)\.default\(false\)/.test(doc('src/content.config.ts')));
kiem('V3-5', 'Gate G06 nguyên văn còn (hồi quy)', article.includes("lang === 'en' && slug === 'escapement' && data.has_infographic && data.interactive") && article.includes('<Infographic lang={lang} />'));

// ===== V3-6 dist =====
if (process.argv[2] === 'dist') {
  const DIST = process.argv[3] || 'dist';
  const hai = [
    ['VI', join(DIST, 'co-che/bo-thoat/index.html')],
    ['EN', join(DIST, 'en/mechanisms/escapement/index.html')],
  ];
  for (const [ten, p] of hai) {
    if (!existsSync(p)) { kiem('V3-6', `${ten}: route tồn tại`, false, p); continue; }
    const html = doc(p);
    const vung = html.slice(html.indexOf('id="v3esc"'), html.indexOf('id="v3esc"') + 30000);
    kiem('V3-6', `${ten}: khối v3esc hiện với preload="none" + poster`, vung.includes('id="v3esc"') && vung.includes('preload="none"') && vung.includes('/videos/v3-escapement/poster.jpg'));
    // kiểm thuộc tính trên đúng thẻ <video> (văn bảng pha có thể chứa chữ "loop" — không phải thuộc tính)
    const theVideo = /<video[^>]*>/.exec(vung)?.[0] || '';
    kiem('V3-6', `${ten}: thẻ video không autoplay/loop`, theVideo.length > 0 && !/\bautoplay\b/.test(theVideo) && !/\bloop\b/.test(theVideo));
    const tenPha = ten === 'VI' ? 'Xung lực' : 'Impulse';
    kiem('V3-6', `${ten}: bảng pha hiện đúng ngôn ngữ`, vung.includes(tenPha));
    // căn cứ (Basis): đủ 8 ô nguyên văn đúng ngôn ngữ, không lẫn ngôn ngữ kia
    // (chuẩn hóa escape HTML để khớp nguyên văn chuỗi JSON)
    const vungKhongPhas = vung.replace(/data-phas="[^"]*"/, '');
    const htmlCanCu = vungKhongPhas.replace(/&#39;/g, "'").replace(/&amp;/g, '&');
    const oCanCu = phas.phases.map((p) => (ten === 'VI' ? p.canCu.vi : p.canCu.en));
    const thieuCanCu = oCanCu.filter((c) => !htmlCanCu.includes(c));
    kiem('V3-6', `${ten}: đủ 8 căn cứ đúng ngôn ngữ`, thieuCanCu.length === 0, thieuCanCu.length ? 'thiếu ' + thieuCanCu.length + '/8' : '8/8 nguyên văn');
    const oNguoc = phas.phases.map((p) => (ten === 'VI' ? p.canCu.en : p.canCu.vi)).filter((c) => htmlCanCu.includes(c));
    kiem('V3-6', `${ten}: không lẫn căn cứ ngôn ngữ kia`, oNguoc.length === 0, oNguoc.length ? 'lẫn ' + oNguoc.length + '/8 ô' : 'sạch');
    kiem('V3-6', `${ten}: SVG tương tác vẫn hiện kèm (so sánh)`, /id="escapement-svg"|data-mech-step-id="escapement"/.test(html));
    kiem('V3-6', `${ten}: mp4 thuyết minh vẫn được tham chiếu`, html.includes(ten === 'VI' ? 'bo-thoat-nguyen-ly-vi.mp4' : 'bo-thoat-nguyen-ly-en.mp4'));
  }
  // không bài nào khác chứa khối v3esc (ngoài đúng hai route của gói)
  const DUONG_HOP_LE = ['/co-che/bo-thoat/', '/en/mechanisms/escapement/'];
  const lac = [];
  const quet = (thu) => {
    for (const t of readdirSync(thu)) {
      const p = join(thu, t);
      if (statSync(p).isDirectory()) quet(p);
      else if (t === 'index.html' && doc(p).includes('id="v3esc"') && !DUONG_HOP_LE.some((d) => p.replace(/\\/g, '/').includes(d))) lac.push(p);
    }
  };
  quet(join(DIST, 'co-che'));
  quet(join(DIST, 'en'));
  kiem('V3-6', 'Không bài khác chứa khối v3esc', lac.length === 0, lac.join(', ') || 'sạch');
  kiem('V3-6', 'Webm được copy vào dist', existsSync(join(DIST, 'videos/v3-escapement/bo-thoat-chu-ky-truot.webm')));
}

// ===== Kết luận =====
const loi = KIEM.filter((k) => !k.dung);
console.log(`KẾT LUẬN V3: ${loi.length === 0 ? 'ĐẠT' : 'KHÔNG ĐẠT'} — ${KIEM.length - loi.length}/${KIEM.length} kiểm đạt${process.argv[2] === 'dist' ? ' (kèm dist)' : ' (nguồn)'}`);
if (loi.length > 0) process.exit(1);
