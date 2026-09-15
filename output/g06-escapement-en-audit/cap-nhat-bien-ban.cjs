// G06-C vòng sửa 1 — đồng bộ biên bản (một lần, mọi thay đổi)
const fs = require('fs');
const p = 'docs/nghiem-thu/G06-C-kiem-ke-infographic-bo-thoat-en-2026-09-14.md';
let s = fs.readFileSync(p, 'utf8');
const thay = [];

function thayThe(tu, thanh, moTa) {
  if (!s.includes(tu)) { thay.push('KHÔNG THẤY: ' + moTa); return; }
  s = s.split(tu).join(thanh);
  thay.push('OK: ' + moTa);
}

// 1) Header: vòng sửa 1
thayThe(
  '- Phạm vi: chỉ tạo biên bản này + `output/g06-escapement-en-audit/`. Không sửa `src/`, `public/`, `scripts/`, `package.json`.',
  '- **Vòng sửa 1 (TXN-20260915-1)**: (a) kiểm kê đúng 18 component import MechanismAnimation (12 gốc + 6 glossary — bỏ sót nhóm glossary ở vòng đầu); (b) cổng nội dung viết lại nguyên văn đầy đủ + hồ sơ nguồn FHH truy cập thật (JSON endpoint) + rà 6 claim + roller; (c) bổ sung bằng chứng bàn phím thật/reset/RM đầy đủ/theme DOM/viewport-tab ẩn/ảnh đại diện; (d) sửa phép đo tải; (e) khóa phạm vi chặng 2 (package.json + check-regulating-cluster + gate riêng Bộ thoát).\n- Phạm vi: chỉ tạo biên bản này + `output/g06-escapement-en-audit/`. Không sửa `src/`, `public/`, `scripts/`, `package.json`.',
  'header vòng sửa 1'
);

// 2) 18 component + consumer
thayThe(
  '**Bên dùng chung khung `MechanismAnimation` (phạm vi hồi quy chặng 2):** 13 infographic — AntiMagnetic, AutomaticWinding, CoAxial, Crystal, DateDisplay, Escapement, GearTrain, Lume, MinuteRepeaterAnim, PowerReserve, ShockProtection, WaterResistance (+ khung tự tham chiếu). Mọi nhãn khung đang VI: "Bước trước", "Phát hoạt ảnh", "Bước tiếp theo", "Đặt lại (hoạt ảnh)", "Bước 1/n", "Tốc độ", "Từng bước một", "Đặt lại về bước đầu".',
  '**Bên dùng chung khung `MechanismAnimation`: 18 component import thật** (grep src/, loại khung tự tham chiếu) — 12 gốc (AntiMagnetic, AutomaticWinding, CoAxial, Crystal, DateDisplay, Escapement, GearTrain, Lume, MinuteRepeaterAnim, PowerReserve, ShockProtection, WaterResistance) + 6 glossary (Chronograph, GMT, Hairspring, MoonPhase, PerpetualCalendar, Tourbillon — nhóm bị bỏ sót ở vòng đầu).\n\n**Consumer và gate:** (a) `MechanismArticle` dùng cả 18 qua map slug → component, render `/co-che/[slug]` (18 bài VI, 0 draft) với gate `lang === \'vi\'`; (b) `TermArticle` dùng 9 glossary component (Tourbillon, MinuteRepeater, PerpetualCalendar, VPH, Incabloc, Rotor, Chronograph, Hairspring, GMT — 6 trong số đó import MechanismAnimation) cho `/tu-dien/[slug]` VI, gate `lang === \'vi\'` nên EN glossary không render infographic. Kết luận: hiện KHÔNG có trang EN nào render MechanismAnimation.\n\n**Nhãn khung đang VI** (18 component chia sẻ): "Bước trước", "Phát hoạt ảnh", "Bước tiếp theo", "Đặt lại (hoạt ảnh)", "Bước 1/n", "Tốc độ", "Từng bước một", "Đặt lại về bước đầu". Chặng 2 đổi khung theo lang phải hồi quy cả 18 route /co-che/ VI và 9 route /tu-dien/ VI.',
  '18 component + consumer + gate'
);

// 3) Bài VI/EN + cặp
thayThe(
  '| `src/content/coChe/vi/bo-thoat.md` (63 dòng) | `has_infographic: true`, `interactive: true`; nguồn FHH; relatedModels freak |',
  '| `src/content/coChe/vi/bo-thoat.md` (63 dòng) | `has_infographic: true`, `interactive: true`; nguồn FHH; relatedModels freak |',
  'giữ nguyên dòng bo-thoat'
);
thayThe(
  '| `src/content/coChe/en/escapement.md` (51 dòng, custom_slug escapement) | `has_infographic: false`, `interactive: false`; FHH EN; liên kết balance-and-hairspring + glossary |',
  '| `src/content/coChe/en/escapement.md` (51 dòng, custom_slug escapement) | `has_infographic: false`, `interactive: false`; FHH EN; liên kết balance-and-hairspring + glossary |\n\n**Số liệu bài cơ chế (đếm từ đĩa, 0 draft):** 18 bài VI, 14 bài EN; bảng ARTICLE_PAIRS có đúng **14 cặp /co-che/ ↔ /en/mechanisms/**; 4 bài VI chưa có cặp EN: bo-thoat-dong-truc, da-quang, hien-thi-ngay, kinh-dong-ho.',
  'số liệu 18/14/14 cặp/4 VI-only'
);

// 4) Tổng kết trình duyệt: 14 bản ghi thật + phân loại lại E1
thayThe(
  'Trình duyệt nền: **14/15 ca ĐẠT**, 1 ca QUAN SÁT (banner fallback chỉ render VI — phát hiện hồ sơ, không phải lỗi chức năng). RM đúng nghĩa hai chiều; không chunk 3D. Chưa sửa gì.',
  'Trình duyệt nền: **14 bản ghi thật** = 10 ĐẠT (pw-g06c-nen) + **1 KHÔNG ĐẠT** (E1 — kỳ vọng sai của GLM:banner fallback KHÔNG render trên EN vì điều kiện lang=\'vi\'; đã đính chính công khai, phân loại lại thành QUAN SÁT hiện trạng) + **3 ĐẠT bổ sung** (pw-g06c-rm-tai: RM 2 chiều + đo tải). Cộng thêm vòng sửa 1 (pw-g06c-vs2-bo-sung): **14/14 ĐẠT** (bàn phím thật/reset/RM đầy đủ/theme DOM/viewport-tab ẩn). Không cộng QUAN SÁT vào ĐẠT. RM hai chiều; không chunk 3D (bằng chứng import + dist). Chưa sửa gì.',
  'tổng kết trình duyệt'
);

// 5) mục 4: đọc tiếp VI/EN — giữ, thêm 18/14 đã có ở mục 2

// 6) mục 5: T3b cũ đã thay thế — đã có; bổ sung package.json + regulating
thayThe(
  '(6) check-english-launch: REQUIRED_EN giữ nguyên (route đã có).',
  '(6) check-english-launch: REQUIRED_EN giữ nguyên (route đã có). (7) `package.json`: nối checker mới vào `check`/`build` + lệnh `check:g06c`. (8) `check-regulating-cluster.mjs`: hiện chỉ cho hai cờ `true` ở bài day-toc-banh-lac/balance-and-hairspring — cần **ngoại lệ hẹp cho đúng bài escapement** (không mở rộng cho bài EN khác). Gate khóa riêng: chỉ `bo-thoat` ↔ `escapement` được bật; ca hồi quy chứng minh không bật nhầm component khác (grep map slug → component). Legend sinh bằng JS: kiểm sau tương tác (DOM), không xếp vào kiểm HTML tĩnh.',
  'mục 5 package.json + regulating + gate + legend'
);

// 7) mục 7: bỏ ghost log-preview-vs3, cập nhật bảng bằng chứng
thayThe(
  'pw-g06c-nen.js + log-g06c-nen.txt (11 ca nền); pw-g06c-rm-tai.js + log-g06c-rm-tai.txt (RM 2 ca + đo tải); log-preview-vs3.txt (server); bang-cong-noi-dung.md (bảng cổng đầy đủ); ma-tran-chang-2.md (ma trận dự kiến CHƯA KIỂM); bang-nhan-rong-g04.md (bảng hỗ trợ).',
  'log-build-nen.txt (build nền ced15b8: exit 0, 0/0/4 hints, 289 HTML/21.033 link, g06-compare dist 14/14); log-english-launch.txt (EXIT 0, đủ 63 route); pw-g06c-nen.js + log-g06c-nen.txt (11 ca: 10 ĐẠT + 1 KHÔNG ĐẠT kỳ vọng sai đã đính chính); pw-g06c-rm-tai.js + log-g06c-rm-tai.txt (RM 2 chiều + đo tải lượt 1 — điều kiện chặn font đã ghi); pw-g06c-tai-v2.js + log-g06c-tai-v2.txt (đo tải đúng phương pháp — bị chặn phiên, trạng thái ghi do-tai-trang-thai.json); pw-g06c-vs2-bo-sung.js + log-g06c-vs2-bo-sung.txt (14/14 bàn phím thật/RM đầy đủ/theme DOM/viewport-tab/ảnh); fhh-*.json + fhh-tu-khoa.json (hồ sơ nguồn FHH JSON endpoint); shots/g06c-{light,dark}-768.png (ảnh đại diện đã xem); bang-cong-noi-dung.md (nguyên văn đầy đủ + 6 claim + roller); ma-tran-chang-2.md (CHƯA KIỂM); bang-nhan-rong-g04.md (bảng hỗ trợ).',
  'mục 7 bảng bằng chứng'
);

// 8) mục 8: cập nhật giới hạn (FHH đã truy cập; đo tải bị chặn)
thayThe(
  '- FHH chưa truy cập trực tiếp trong phiên này — trích dẫn dựa trên bài VI/EN đã có nguồn FHH trong frontmatter; không dựng trích dẫn mới.',
  '- FHH ĐÃ truy cập thật qua JSON endpoint (2026-09-15, nguyên văn 3 mục N1–N3); trang HTML SPA fetch rỗng — không dựng trích dẫn từ trang HTML.\n- Đo tải lượt 2 (không chặn font, requestfailed listener) nhất quán làm sập phiên playwright — **CHƯA KIỂM**, blocker: xung đột tài nguyên trình duyệt; số có được từ lượt 1 (điều kiện chặn font đã ghi).',
  'mục 8 giới hạn'
);

fs.writeFileSync(p, s);
console.log(thay.join('\n'));
console.log('TỔNG: ' + thay.filter(t => t.startsWith('OK')).length + '/' + thay.length + ' thay đổi OK');
