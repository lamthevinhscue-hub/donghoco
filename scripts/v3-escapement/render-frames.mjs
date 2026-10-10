// =============================================================================
// render-frames.mjs — dựng 240 frame PNG từ cảnh Three.js (dung-canh.html)
// =============================================================================
// Chạy: node scripts/v3-escapement/render-frames.mjs
// Render frame-by-frame, chia 8 lượt (mỗi lượt 30 frame trong 1 tab riêng)
// để mỗi context WebGL chỉ sống vài giây — tránh hiện tượng crash render
// liên tục đã ghi ở hồ sơ V1. Kết quả: frames/f0000.png … f0239.png
// =============================================================================
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { homedir } from 'node:os';

const GOC_REPO = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const THU_MUC_FRAMES = join(GOC_REPO, 'output/v3-escapement-slider/frames');
const PORT = 4617;
const TONG = Number(process.env.SO_FRAME || 240);
const MOT_LUOT = 30;
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

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.png': 'image/png' };
const server = createServer(async (req, res) => {
  const duong = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const tep = join(GOC_REPO, duong);
  try {
    const noiDung = await readFile(tep);
    res.writeHead(200, { 'content-type': MIME[extname(tep)] || 'application/octet-stream' });
    res.end(noiDung);
  } catch {
    res.writeHead(404); res.end('không thấy');
  }
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));
mkdirSync(THU_MUC_FRAMES, { recursive: true });

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const URL_TRANG = `http://127.0.0.1:${PORT}/scripts/v3-escapement/dung-canh.html`;

let soCa = 0;
for (let dau = 0; dau < TONG; dau += MOT_LUOT) {
  const soLuong = Math.min(MOT_LUOT, TONG - dau);
  let thanhCong = false;
  for (const lanThu of [1, 2]) {
    soCa++;
    const page = await browser.newPage({ viewport: { width: 1024, height: 640 } });
    page.on('console', (m) => { if (m.type() === 'error') console.log(`  [console] ${m.text().slice(0, 200)}`); });
    page.on('pageerror', (e) => console.log(`  [pageerror] ${String(e).slice(0, 200)}`));
    try {
      await page.goto(URL_TRANG, { waitUntil: 'load' });
      await page.waitForFunction(() => !!window.__v3, null, { timeout: 20000 });
      await page.evaluate(() => window.__v3.khoiTao());
      const mang = await page.evaluate(async ({ dau, soLuong }) => {
        const ketQua = [];
        for (let i = dau; i < dau + soLuong; i++) ketQua.push(await window.__v3.renderFrame(i));
        return ketQua;
      }, { dau, soLuong });
      for (let k = 0; k < mang.length; k++) {
        const base64 = mang[k].split(',')[1];
        await writeFile(join(THU_MUC_FRAMES, `f${String(dau + k).padStart(4, '0')}.png`), Buffer.from(base64, 'base64'));
      }
      console.log(`OK lượt ${dau}–${dau + soLuong - 1} (${soCa} ca)`);
      thanhCong = true;
      break;
    } catch (e) {
      console.log(`LỖI lượt ${dau} lần ${lanThu}: ${String(e).slice(0, 160)}`);
    } finally {
      await page.close().catch(() => {});
    }
  }
  if (!thanhCong) { console.log(`DỪNG: lượt ${dau} thất bại cả 2 lần`); process.exit(1); }
}
await browser.close();
server.close();
console.log(`XONG ${TONG} frame tại ${THU_MUC_FRAMES}`);
