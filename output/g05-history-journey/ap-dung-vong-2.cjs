// Áp dụng cập nhật ma trận 31 ca — vòng sửa 2 TXN-20260913-14.
// Chỉ chạm 2 ca chịu ảnh hưởng sửa đổi: M3-4 (switcher + hash — thay bằng chứng
// mới, kết quả cũ giữ ketQuaCu) và M2-7 (bảo toàn nguồn — ghi chú cơ chế fixture).
// Không đổi các ca khác, không đổi tongCa/dat.
const fs = require('fs');
const path = 'output/g05-history-journey/ma-tran-31-ca-ket-qua.json';
const d = JSON.parse(fs.readFileSync(path, 'utf8'));
const tim = (ma) => d.ca.find((r) => r.ma === ma);

// M3-4 — switcher + hash: bằng chứng mới pw-hash-keep-ket-qua.json (24/24) + G5-8b
const m34 = tim('M3-4');
m34.ketQuaCu = m34.ketQuaCu ?? { bangChung: m34.bangChung, ghiChu: m34.ghiChu || '' };
m34.bangChung = 'pw-hash-keep-ket-qua.json 24/24 ca khẳng định ĐẠT: 12 tình huống × 2 chiều qua click switcher thật — hợp lệ (milestone-0/12/27, chuong-c1/c6) giữ hash + ID đích tồn tại + cuộn tới đích (scrollY 349–14099); không hợp lệ (milestone-00/01/028/999, chuong-c7, hash-sai) + không hash → hash bị bỏ khỏi URL đích, scrollY=0. +2 quan sát tải trực tiếp #milestone-00 (không khẳng định — hành vi mặc định trình duyệt). Hồi quy nguồn [G5-8b] 12/12 trên đúng hàm trong component (check-g05 nguồn 11/11)';
m34.ghiChu = 'Vòng sửa 2 TXN-20260913-14: whitelist hash siết dạng chuẩn (không số 0 dẫn đầu) sau khi GPT Work bắt #milestone-00/01 vẫn được giữ; kết quả 7 tình huống của vòng trước giữ trong ketQuaCu (chưa phủ zero dẫn đầu)';

// M2-7 — bảo toàn nguồn: ghi chú cơ chế mới (fixture, không phụ thuộc Git)
const m27 = tim('M2-7');
m27.bangChung = '[G5-4b] 52 nguồn + mọi trường VI khớp fixture baseline scripts/fixtures/timeline-baseline-aba250c.json (trích nguyên văn git show aba250c — sha256 762d461c43ec406f6061be66baded42952ec2b9f0cec72d4f577fe367316a465 hai phía) — không phụ thuộc Git: đạt cả trên bản sao không .git (proof-g54b-ket-qua.json 7/7). Giới hạn đã nói: KHÔNG truy cập HTTP nguồn ngoài; không coi kiểm nội bộ là kiểm HTTP nguồn ngoài';
m27.ghiChu = 'Vòng sửa 2 TXN-20260913-14: đối chiếu chuyển từ gọi git show sang fixture cố định (cơ chế cũ: đối chiếu git show aba250c trực tiếp — kết quả không đổi). Nếu G05-B sau này thử truy cập: ghi thời điểm, URL cuối, trạng thái thật; 403/timeout là giới hạn truy cập';

d.dienGiai += ' — cập nhật vòng sửa 2 TXN-20260913-14: M3-4 thay bằng chứng hash hai chiều 24/24 (cũ giữ ketQuaCu), M2-7 ghi chú cơ chế fixture; build v4 exit 0 (log-build-sau-v4.txt), mutation 10/10 (mutation-ket-qua-v4.json), proof G5-4b 7/7, kiểm trình duyệt hash 24/24 + G5-8b hồi quy';
d.capNhat = { vong: 'TXN-20260913-14', thoiGian: new Date().toISOString(), tepMoi: ['pw-hash-keep-ket-qua.json', 'proof-g54b-ket-qua.json', 'mutation-ket-qua-v4.json', 'log-build-sau-v4.txt'] };

fs.writeFileSync(path, JSON.stringify(d, null, 2), 'utf8');
console.log('M3-4:', m34.trangThai, '| ketQuaCu:', !!m34.ketQuaCu);
console.log('M2-7:', m27.trangThai, '| fixture:', m27.bangChung.includes('fixture'));
console.log('tổng ca:', d.ca.length, '| ĐẠT:', d.ca.filter((r) => r.trangThai === 'ĐẠT').length);
