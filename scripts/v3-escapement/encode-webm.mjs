// =============================================================================
// encode-webm.mjs — ghép 240 frame PNG thành video WebM (VP9) + poster
// =============================================================================
// Chạy: node scripts/v3-escapement/encode-webm.mjs
// Encode bằng WebCodecs trong Chrome (không cần ffmpeg); muxer WebM tự viết
// trong encode.html. Kết quả:
//   public/videos/v3-escapement/bo-thoat-chu-ky-truot.webm  (~video dùng chung)
//   public/videos/v3-escapement/poster.jpg                  (khung đầu)
// =============================================================================
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { homedir } from 'node:os';

const GOC_REPO = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const DUONG_DAN_VIDEO = join(GOC_REPO, 'public/videos/v3-escapement/bo-thoat-chu-ky-truot.webm');
const DUONG_DAN_POSTER = join(GOC_REPO, 'public/videos/v3-escapement/poster.jpg');
const PORT = 4618;
// Tìm playwright-core + trình duyệt mà không hard-code đường máy: ưu tiên biến
// môi trường (PLAYWRIGHT_CORE_PATH / PLAYWRIGHT_CHROME_PATH), sau đó quét cache
// npx và các đường cài Chrome chuẩn.
const timPlaywrightCore = () => {
  if (process.env.PLAYWRIGHT_CORE_PATH) return pathToFileURL(process.env.PLAYWRIGHT_CORE_PATH).href;
  const cache = join(process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local'), 'npm-cache', '_npx');
  if (existsSync(cache)) {
    for (const muc of readdirSync(cache)) {
      const tep = join(cache, muc, 'node_modules', 'playwright-core', 'index.mjs');
      if (existsSync(tep)) return pathToFileURL(tep).href;
    }
  }
  throw new Error('Không thấy playwright-core — đặt biến PLAYWRIGHT_CORE_PATH trỏ tới index.mjs');
};
const timTrinhDuyet = () => {
  if (process.env.PLAYWRIGHT_CHROME_PATH) return process.env.PLAYWRIGHT_CHROME_PATH;
  const ungCu = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
  ];
  for (const duong of ungCu) if (duong && existsSync(duong)) return duong;
  const pw = join(process.env.LOCALAPPDATA || '', 'ms-playwright');
  if (existsSync(pw)) {
    for (const muc of readdirSync(pw)) {
      if (!muc.startsWith('chromium-')) continue;
      const tep = join(pw, muc, 'chrome-win', 'chrome.exe');
      if (existsSync(tep)) return tep;
    }
  }
  throw new Error('Không thấy Chrome — đặt biến PLAYWRIGHT_CHROME_PATH trỏ tới chrome.exe');
};

const { chromium } = await import(timPlaywrightCore());
const EXE = timTrinhDuyet();

const MIME = { '.html': 'text/html', '.png': 'image/png', '.json': 'application/json', '.js': 'text/javascript' };
const server = createServer(async (req, res) => {
  const tep = join(GOC_REPO, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  try {
    const noiDung = await readFile(tep);
    res.writeHead(200, { 'content-type': MIME[extname(tep)] || 'application/octet-stream' });
    res.end(noiDung);
  } catch (e) {
    console.log(`[server 404] ${req.url.slice(0, 120)} — ${e.code || e.message} | tep: ${tep.slice(-60)}`);
    res.writeHead(404); res.end('không thấy');
  }
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));
mkdirSync(join(GOC_REPO, 'public/videos/v3-escapement'), { recursive: true });

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage();
page.on('pageerror', (e) => console.log(`[pageerror] ${String(e).slice(0, 300)}`));
page.on('console', (m) => { if (m.type() === 'error') console.log(`[console] ${m.text().slice(0, 300)}`); });
await page.goto(`http://127.0.0.1:${PORT}/scripts/v3-escapement/encode.html`, { waitUntil: 'load' });
// waitForFunction hay kẹt với trang này — poll thủ công như script debug
let sanSang = false;
for (let i = 0; i < 40 && !sanSang; i++) {
  await page.waitForTimeout(500);
  sanSang = await page.evaluate(() => typeof window.__batDau === 'function');
}
if (!sanSang) { console.log('LỖI: trang encode không sẵn sàng'); process.exit(1); }
await page.evaluate(() => window.__batDau());
let xong = false;
for (let i = 0; i < 600 && !xong; i++) {
  await page.waitForTimeout(500);
  xong = await page.evaluate(() => window.__encodeXong === true || window.__loi !== null);
  if (i % 20 === 19) console.log('  …', await page.evaluate(() => window.__tienDo));
}
if (!xong) { console.log('LỖI: encode quá 300 giây'); process.exit(1); }
const loi = await page.evaluate(() => window.__loi);
if (loi) { console.log('LỖI ENCODE:', loi.slice(0, 400)); process.exit(1); }
const tienDo = await page.evaluate(() => window.__tienDo);
console.log('encode xong:', tienDo);

// Lấy buffer webm về (chia khối base64 để tránh giới hạn evaluate)
const tong = await page.evaluate(() => window.__webm.length);
console.log('kích thước webm:', tong, 'bytes');
const KHoi = 1 << 20;
const cacPhan = [];
for (let o = 0; o < tong; o += KHoi) {
  const phan = await page.evaluate(([o, n]) => {
    const cat = window.__webm.subarray(o, o + n);
    let nhiPhan = '';
    for (let i = 0; i < cat.length; i += 8192) nhiPhan += String.fromCharCode(...cat.subarray(i, i + 8192));
    return btoa(nhiPhan);
  }, [o, Math.min(KHoi, tong - o)]);
  cacPhan.push(phan);
}
await browser.close();
server.close();

const webm = Buffer.from(cacPhan.join(''), 'base64');
await writeFile(DUONG_DAN_VIDEO, webm);
console.log('đã ghi:', DUONG_DAN_VIDEO, webm.length, 'bytes');

// Poster từ frame đầu (sharp có sẵn theo astro)
const sharp = (await import('sharp')).default;
await sharp(join(GOC_REPO, 'output/v3-escapement-slider/frames/f0000.png'))
  .jpeg({ quality: 82 })
  .toFile(DUONG_DAN_POSTER);
console.log('đã ghi poster:', DUONG_DAN_POSTER);
