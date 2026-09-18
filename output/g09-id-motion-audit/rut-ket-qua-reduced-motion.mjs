// G09-B chặng 1 — rút kết quả đo reduced-motion từ log pw thành JSON có cấu trúc
import { readFileSync, writeFileSync } from 'node:fs';

const log = readFileSync('output/g09-id-motion-audit/log-pw-reduced-motion.txt', 'utf8');
const logT5 = readFileSync('output/g09-id-motion-audit/log-pw-t5.txt', 'utf8');
const doc = log.slice(log.indexOf('T1-vi'), log.indexOf('MÔI TRƯỜNG')).split('\\n');
const docT5 = logT5.slice(logT5.indexOf('T5-vi')).split('\\n');

const docGhi = {};
for (const dong of doc) {
  const m = dong.match(/^(T[1-4]-[a-z]+)[^:]*: (.*)$/);
  if (m) docGhi[m[1]] = m[2].replace(/\\+/g, '').trim();
}
const t5 = {};
for (const dong of docT5) {
  const m = dong.match(/^(T5-[a-z]+): (.*)$/);
  if (m) t5[m[1]] = m[2].replace(/\\+/g, '').trim();
}

const ketQua = {
  ngay: '2026-09-19',
  nen: 'cbf1850',
  doiTuong: 'Escapement.astro trên /co-che/bo-thoat/ (VI) và /en/mechanisms/escapement/ (EN)',
  chiTieuDo: 'góc rotate trong style.transform của #balance-group (phần tử SVG quay thật của infographic)',
  congCu: 'playwright-cli — HeadlessChrome/152 (Win64), viewport 1440x900, lấy mẫu 100ms, emulateMedia reducedMotion',
  gioiHan: 'headless không lật document.hidden đáng tin; emulateMedia là giả lập media query của trình duyệt; tab ẩn thật = CHƯA KIỂM',
  T1: {
    moTa: 'reduce bật TRƯỚC tải — bấm Phát rồi Bước sau',
    vi: docGhi['T1-vi'], en: docGhi['T1-en'],
    ketLuan: 'Phát bị chặn khi reduce (nhãn nút không đổi "Phát hoạt ảnh"/"Play animation"; 21 mẫu/2,2s chỉ 1 góc -24 — không chuyển động); Bước sau đổi tư thế tức thời -24 → -10 (không trượt 300ms)',
  },
  T2: {
    moTa: 'không reduce — bấm Phát',
    vi: docGhi['T2-vi'], en: docGhi['T2-en'],
    ketLuan: 'hoạt ảnh chạy thật: 60 mẫu/6,2s có 3 góc riêng biệt [-24, -10, -1] — bước nhảy ~2-3s/lần',
  },
  T3: {
    moTa: 'đang Phát rồi bật reduce GIỮA PHIÊN (emulateMedia)',
    vi: docGhi['T3-vi'], en: docGhi['T3-en'],
    ketLuan: 'chuyển động DỪNG ngay khi bật reduce (trước: 2 góc [-24,-10]; sau: 1 góc [-10] trong 4,2s quan sát)',
  },
  T4: {
    moTa: 'gỡ reduce giữa phiên (sau T3)',
    vi: docGhi['T4-vi'], en: docGhi['T4-en'],
    ketLuan: 'KHÔNG tự phát lại sau khi gỡ reduce (1 góc trong 4,2s) — phát đã bị hủy khi bật reduce; hành vi an toàn theo thiết kế reduceInteractive, không phải kẹt',
  },
  T5: {
    moTa: 'sau khi gỡ reduce, bấm Phát lại',
    vi: t5['T5-vi'], en: t5['T5-en'],
    ketLuan: 'Phát chạy lại bình thường (3 góc [-24,-10,-1] cả VI lẫn EN) — không kẹt vĩnh viễn',
  },
  tabAnThat: 'CHƯA KIỂM — headless không lật document.hidden đáng tin (blocker như G06-C2); chưa có môi trường headed ổn định cho ca này',
};
writeFileSync('output/g09-id-motion-audit/ket-qua-reduced-motion.json', JSON.stringify(ketQua, null, 2));
JSON.parse(readFileSync('output/g09-id-motion-audit/ket-qua-reduced-motion.json', 'utf8'));
console.log('Đã ghi + xác thực JSON: output/g09-id-motion-audit/ket-qua-reduced-motion.json');
