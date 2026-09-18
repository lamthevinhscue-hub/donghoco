// G09-B chặng 2 — census sau sửa: 125 plate/pattern/tham chiếu, 0 ID trùng, 0 id cũ
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'parse5';

let soTrang = 0, plates = 0, patterns = 0, refs = 0, idCu = 0, idTrung = 0, patternKhac = 0;
const trangLech = [];

const phanTich = (html) => {
  const cay = parse(html);
  const tanSuat = new Map();
  let plate = 0, pattern = 0, ref = 0, cu = 0, patternKhac = 0;
  const dem = (node) => {
    if (node.tagName) {
      const a = Object.fromEntries((node.attrs || []).map((x) => [x.name, x.value]));
      if (node.tagName === 'figure' && /watch-image/.test(a.class || '')) plate++;
      if (node.tagName === 'pattern') {
        patternKhac++;
        if (typeof a.id === 'string' && a.id.startsWith('guilloche')) {
          pattern++;
          if (a.id === 'guilloche') cu++;
          if (a.id) tanSuat.set(a.id, (tanSuat.get(a.id) || 0) + 1);
        }
      }
      if (node.tagName === 'rect' && typeof a.fill === 'string' && /^url\(#guilloche/.test(a.fill)) ref++;
    }
    for (const con of node.childNodes || []) dem(con);
  };
  dem(cay);
  let trung = 0;
  for (const [, n] of tanSuat) if (n > 1) trung++;
  return { plate, pattern, ref, cu, trung, patternKhac };
};

const duyet = (d) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) duyet(p);
    else if (e.name === 'index.html') {
      soTrang++;
      const k = phanTich(readFileSync(p, 'utf8'));
      plates += k.plate; patterns += k.pattern; refs += k.ref; idCu += k.cu; idTrung += k.trung; patternKhac += k.patternKhac;
      if (k.trung > 0 || k.cu > 0) trangLech.push(p);
    }
  }
};
duyet('dist');

const dat = plates === 125 && patterns === 125 && refs === 125 && idCu === 0 && idTrung === 0;
const baoCao = { ngay: "2026-09-19", nen: "df29a9a", soTrang, plates, patterns, refs, patternKhac, idGuillocheCu: idCu, idTrung, trangLech, dat };
writeFileSync('output/g09-id-motion-fix/censu-sau-sua.json', JSON.stringify(baoCao, null, 2) + '\n');
console.log(`Trang: ${soTrang} · plate ${plates} · pattern ${patterns} · ref ${refs} · id cũ ${idCu} · trang có id trùng ${idTrung}`);
console.log(dat ? 'KẾT LUẬN: ĐẠT — 125/125/125, 0 id cũ, 0 trùng' : 'KẾT LUẬN: KHÔNG ĐẠT');
process.exit(dat ? 0 : 1);
