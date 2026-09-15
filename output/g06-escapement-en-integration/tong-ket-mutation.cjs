#!/usr/bin/env node
// Tổng kết mutation G06-C chặng 2 (vòng sửa TXN-20260915-11).
// Đầu vào: sandbox-info.json (M2-1/M2-2 tầng nguồn + hash từng ca) và các file
// log-dom-*.json (metrics RAW từng bước đo — bộ kiểm GIỐNG NHAU mọi trạng thái).
// Phân loại 4 trạng thái; mỗi ca mutation: sạch-qua → vá-fail-đúng-lý-do →
// hoàn nguyên (hash khớp) → đạt-trở-lại.
const fs = require('node:fs');
const path = require('node:path');
const thuMuc = __dirname;
const info = JSON.parse(fs.readFileSync(path.join(thuMuc, 'sandbox-info.json'), 'utf8'));

const docJson = (ten) => {
  const s = fs.readFileSync(path.join(thuMuc, ten), 'utf8');
  const b = s.indexOf('{');
  let depth = 0, e = -1, inStr = false, esc = false;
  for (let i = b; i < s.length; i++) {
    const c = s[i];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { e = i + 1; break; } }
  }
  return JSON.parse(s.slice(b, e));
};

// Bộ kiểm chung (kỳ vọng trạng thái SẠCH — áp cho mọi phép đo):
const sachQua = (m) =>
  m.counter === 'Step 1/5' &&
  !m.panelVI && m.panel.startsWith("The part's English name") &&
  m.thieu.length === 0 && m.soRefs > 0 &&
  m.role === 'img' && (m.ariaHidden === null || m.ariaHidden === false) &&
  m.nhanEnDung;

const D = 'DAT', ND = 'KHONG_DAT';
const K = [...info.nguon];

// mutation hàm dùng chung demTrangEnKhac (D5): hàm nguyên vẹn exit 0; vô hiệu
// hóa phát hiện khung → tự kiểm D5 (b) thất bại đúng lý do
if (info.hamQuet) {
  const hq = info.hamQuet;
  K.push({
    ca: 'Ham-quet vô hiệu hóa phát hiện khung trong hàm dùng chung → D5 tự kiểm (b) thất bại đúng lý do',
    trangThai: hq.hamNguyenExit === 0 && hq.hamVoHieuExit !== 0 && hq.batDungLyDo ? D : ND,
    chiTiet: `hàm nguyên vẹn exit=${hq.hamNguyenExit}; hàm vô hiệu exit=${hq.hamVoHieuExit}; bắt 'D5 tự kiểm (b)'=${hq.batDungLyDo}`,
  });
}

// mốc sạch (đo trước các ca vá + đo lại sau hoàn nguyên từng ca)
const sach0 = docJson('log-dom-sach.json');
K.push({ ca: 'Baseline bản sạch qua bộ kiểm chung (trước mọi ca vá)', trangThai: sachQua(sach0) ? D : ND, chiTiet: `counter='${sach0.counter}', panel='${sach0.panel.slice(0, 34)}', thiếu đích=${sach0.thieu.length}, nhãn=${sach0.nhan ? 'có' : 'rỗng'}` });

const CA = [
  ['m3', 'vá render-only lộ VI (text panel tiếng Việt)', (m) => m.panelVI, 'panel lộ chuỗi VI'],
  ['m4', 'xóa id escSteel → tham chiếu mất đích', (m) => m.thieu.includes('escSteel'), 'thiếu đích escSteel'],
  ['m5', 'nhãn SVG rỗng (aria-label="")', (m) => m.nhan === '', 'nhãn rỗng'],
  ['m6', 'nhãn SVG sai ngôn ngữ (nhãn VI trên trang EN)', (m) => !m.nhanEnDung && (m.nhan ?? '').length > 0, 'nhãn không phải bản EN duyệt'],
  ['m7', 'xung đột aria-hidden trên SVG role=img', (m) => m.ariaHidden === 'true', 'aria-hidden=true xung đột role=img'],
];

for (const [ca, moTa, batLoi, lyDo] of CA) {
  const st = info.ca[ca];
  const va = docJson(`log-dom-${ca}-va.json`);
  const hoan = docJson(`log-dom-${ca}-hoan.json`);
  const daVaBiBat = !sachQua(va) && batLoi(va);
  const phucQua = sachQua(hoan) && st.daHoanNguyen === true;
  K.push({
    ca: `${ca} ${moTa}`,
    trangThai: daVaBiBat && phucQua ? D : ND,
    chiTiet: `vá: fail-đúng-lý-do (${lyDo})=${daVaBiBat}; hoàn nguyên: hash khớp=${st.daHoanNguyen}, đo lại đạt=${sachQua(hoan)}`,
  });
}

const dem = (t) => K.filter((x) => x.trangThai === t).length;
const tongKet = { tong: K.length, dat: dem(D), khongDat: dem(ND), chuaKiem: K.filter((x) => x.trangThai === 'CHUA_KIEM').length, quanSat: K.filter((x) => x.trangThai === 'QUAN_SAT').length };
console.log(JSON.stringify({ tongKet, ketQua: K }, null, 1));
if (tongKet.khongDat > 0) process.exit(1);
