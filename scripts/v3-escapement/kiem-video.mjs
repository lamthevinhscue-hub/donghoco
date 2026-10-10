// =============================================================================
// kiem-video.mjs — kiểm sản phẩm webm bằng chính <video> của Chrome
// =============================================================================
// Kiểm: metadata đọc được; duration ≈ 8 s; seek tới giữa từng pha đều
// 'seeked' và cho khung hình khác nhau (không đen, không trùng nhau);
// seek ngược nhanh vẫn tới đúng điểm cuối.
// Chạy: node scripts/v3-escapement/kiem-video.mjs
// =============================================================================
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { homedir } from 'node:os';

const GOC_REPO = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const PORT = 4621;

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

const server = createServer(async (req, res) => {
  const tep = join(GOC_REPO, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  const laVideo = tep.endsWith('.webm');
  try {
    const nd = await readFile(tep);
    if (laVideo && req.headers.range) {
      const m = /bytes=(\d+)-(\d*)/.exec(req.headers.range);
      const dau = Number(m[1]), cuoi = m[2] ? Number(m[2]) : nd.length - 1;
      res.writeHead(206, {
        'content-type': 'video/webm',
        'content-range': `bytes ${dau}-${cuoi}/${nd.length}`,
        'accept-ranges': 'bytes',
      });
      res.end(nd.subarray(dau, cuoi + 1));
    } else {
      res.writeHead(200, {
        'content-type': laVideo ? 'video/webm' : 'text/html; charset=utf-8',
        'accept-ranges': 'bytes',
      });
      res.end(nd);
    }
  } catch {
    res.writeHead(404); res.end();
  }
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage();
await page.goto(`http://127.0.0.1:${PORT}/scripts/v3-escapement/kiem-video.html`, { waitUntil: 'load' });
const thongTin = await page.evaluate(async () => { await window.__chay(); return window.__kq; });
await browser.close();
server.close();

console.log(JSON.stringify(thongTin, null, 1));
const dur = thongTin.duration;
const dung = thongTin.ketQua && thongTin.ketQua.every((k) => Math.abs(k.thucTe - k.ms) <= 150 && k.hash > 0);
const khacNhau = new Set(thongTin.ketQua?.map((k) => k.hash)).size >= thongTin.ketQua.length - 2;
const durDung = typeof dur === 'number' && dur >= 7700 && dur <= 8300;
const nguocDung = thongTin.seekNguoc && thongTin.seekNguoc.ve <= 1000;
console.log(`KẾT LUẬN: duration ${durDung ? 'ĐẠT' : 'TRƯỢT'} (${dur}ms) — seek ${dung ? 'ĐẠT' : 'TRƯỢT'} — khung phân biệt ${khacNhau ? 'ĐẠT' : 'TRÙNG'} — seek ngược ${nguocDung ? 'ĐẠT' : 'TRƯỢT'}`);
if (!(durDung && dung && khacNhau && nguocDung)) process.exit(1);
