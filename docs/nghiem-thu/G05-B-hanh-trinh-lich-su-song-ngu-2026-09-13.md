# G05-B — Triển khai hành trình lịch sử song ngữ (2026-09-13)

- **Giao dịch:** TXN-20260913-08/09 — danh mục DHC-G05G09-20260913 v1.0.0. G05-B được mở theo phê duyệt của anh Vinh.
- **Nền:** `aba250c` (main — gồm G05-A đã commit). GLM thực hiện, tự kiểm và bàn giao. KHÔNG commit, KHÔNG push, KHÔNG deploy. Staged trống.
- **Kết luận:** G05-B hoàn tất vòng sửa 2 TXN-20260913-14 (nội dung đạt kiểm chứng độc lập GPT Work) + hoàn thiện định dạng TXN-20260913-16 — chờ GPT Work commit/push; chưa commit/push/deploy. Không mở G06, không triển khai nhân rộng mô hình G04.

## 0-bis. Vòng sửa sau nghiệm thu TXN-20260913-11

GPT Work nghiệm thu lần 1: **chưa đạt** — build exit 0 nhưng Playwright độc lập bắt 4 lỗi thực tế. Quyết định GPT Work: **chấp nhận** thêm riêng `historyChapters.ts` vào `SKIP_FILES` của `check-evolution-data.mjs` (không mở rộng danh sách, không đổi logic).

**L1 — Nhãn thời gian trang VI (HistoryTimeline.astro:154):** `timeLabelOf` cũ ưu tiên `timeLabel_en` cho cả hai ngôn ngữ → `/lich-su/` hiển thị "2013–present" (bị bắt trên `#milestone-27`). Sửa: VI dùng `timeLabel`, EN dùng `timeLabel_en ?? timeLabel`. Kiểm dist CẢ HAI bản mới (G5-D1 v2: VI có "2013–nay", không "2013–present"; G5-D2: EN "2013–present"); runtime: VI27/EN27 đúng từng bản.

**L2 — No-JS mờ toàn bộ thẻ (HistoryTimeline.astro:502):** CSS cũ mặc định `.milestone-card { opacity: 0 }`, JS mới hiện → tắt JS cả 28/28 thẻ computed opacity=0 (ảnh kiểm độc lập: vùng mốc trống). Sửa progressive enhancement: mặc định HIỂN THỊ; chỉ ẩn qua `.reveal-pending` do JS thêm khi `!prefers-reduced-motion`; observer gỡ pending khi cuộn tới; **bỏ bộ hẹn giờ 3000ms** (nội dung không phụ thuộc timer); reduced-motion không ẩn. Kiểm lại no-JS bằng computed style (28/28 opacity=1, visible, không display:none — VI lẫn EN) + chụp ảnh đầu/cuối timeline (anchor `#milestone-27` trực tiếp) và tự mở xem: chữ, khung hình, nguồn hiển thị thật.

**L3 — Hash đúng khuôn nhưng ID không tồn tại:** `keepHistoryHash` cũ chỉ kiểm regex `milestone-\d+` → `#milestone-999`/`#milestone-028` được giữ vào href switcher. Sửa: chỉ giữ `#chuong-c1…6` và `#milestone-0…27` (số 0 dẫn đầu bị loại vì parse vượt 27); hash không tồn tại → switcher về đầu trang đích. Kiểm 7 tình huống hai chiều (không hash, mốc hợp lệ, chương hợp lệ, #hash-sai, #milestone-999, #milestone-028, EN→VI #milestone-20) — ghi URL cuối + hash + scrollY: 7/7 ĐẠT.

**L4 — k/N thiếu ở nav mobile:** `data-chapter-kn` trước đây chỉ ở nav desktop. Sửa: mobile thêm cùng span; JS cập nhật chung số theo chương. Kiểm VI/EN với panel mobile THỰC SỰ MỞ (viewport 375, bấm nút toggle): tắt mechanism → C1 2/5, C2 đủ 4/4 (rỗng theo thiết kế), C3 2/6, C4 4/6, C5 đủ 4/4 (rỗng), C6 0/3 — hai ngôn ngữ cùng số; "Tất cả" khôi phục k/N rỗng.

**L5 — Bộ kiểm bắt đúng lỗi (check-g05):**
- G5-5: đối chiếu **từng ranh giới đã duyệt** `[[0,5],[5,9],[9,15],[15,21],[21,25],[25,28]]` (trước đây chỉ kiểm liên tiếp phủ 28).
- G5-6b: đổi tên đúng khả năng — "điều kiện cần lớp nguồn: cặp có dạng `/en/`"; đích THẬT kiểm ở lớp dist G5-D4 (routeExists).
- G5-4 tách: giữ kiểm cấu trúc (https/ngày/proves/name_en); thêm **G5-4b bằng chứng bảo toàn** — so từng trường VI + sources với `git show aba250c:src/data/timeline.json` (cơ chế này đổi sang fixture ở vòng sửa 2 — xem mục 0-ter E2).
- G5-D1 v2: thêm nhãn "2013–nay" + vắng "2013–present" trang VI; `data-chapter-kn` ×12 (hai nav).
- G5-8 v2: reveal ẩn-mặc định = false (progressive, không setTimeout).
- Mutation mở rộng **10/10 ĐẠT**: 6 ca cũ + M6 ranh giới lệch duyệt (c2 [5,10]/c3 [10,15] vẫn phủ 28 → G5-5); M7 đích EN giả `/en/not-a-real-page/` giữ số cặp → G5-D4 ở **lớp dist**; M8 VI hiển thị "2013–present" (dist) → G5-D1. Không tiêm repo chính; sandbox dist chỉ copy các tệp check-g05 đọc.

**Bằng chứng v2 (build lại exit 0):** `log-build-sau-v2.txt` — 287 trang, 20.846 link, hints 4 (baseline); thao tác **20/20** (`thao-tac-ket-qua.json`); bố cục **20/20** chạy lại trên dist v2 (`boc-cuc-ket-qua.json`); đo lại tải — `/lich-su/` 883.461 B (nền 869.850 → +13.611 B ≈ +1,6%), `/en/history/` 678.772 B (`do-tai-ket-qua.json`). Ma trận 31 ca cập nhật: M1-4/M2-2/M3-3/M3-4/M5-2 **thay kết quả** (kết quả cũ giữ trong `ketQuaCu` — trước đây ghi 31/31 ĐẠT không phản ánh kết quả độc lập), M6-2 đo lại.

## 0-ter. Vòng sửa 2 sau tái nghiệm thu TXN-20260913-14

GPT Work tái nghiệm thu: **chưa đạt** — hai lỗi đã kiểm chứng độc lập (HEAD vẫn `aba250c`, staged trống, build trong repo đạt). Sửa đúng hai điểm, không mở rộng phạm vi.

**E1 — Whitelist hash nhận số 0 dẫn đầu (HistoryTimeline.astro, hàm `hashHopLe`):** `#milestone-00`/`#milestone-01` vẫn được giữ qua switcher cả VI→EN lẫn EN→VI trong khi ID đích không tồn tại (ID thật là `milestone-0`/`milestone-1`) — chặn cũ `Number(m[1]) <= 27` cho `Number('00') = 0` đi qua. Sửa: điều kiện **dạng chuẩn** `String(Number(chuỗi)) === chuỗi` (loại `00`/`01`/`028`) + chặn `> 27` (loại `999`); `#chuong-c1…6` giữ nguyên. Không thay hành vi switcher ngoài cặp lịch sử.

**E2 — G5-4b phụ thuộc lịch sử Git (check-g05-history-journey.mjs:83):** checker gọi `git show aba250c:…` → chạy trên bản sao nguồn không có `.git` thì thất bại riêng G5-4b (`fatal: not a git repository`) — lỗi phụ thuộc kiểm, **không phải kết luận production đang lỗi**. Sửa theo hướng fixture được phép của prompt:
- Thêm fixture cố định `scripts/fixtures/timeline-baseline-aba250c.json` — trích **nguyên văn từng byte** từ `git show aba250c:src/data/timeline.json`. **Đối chiếu nguồn gốc một lần** (ghi tại đây): sha256 `git show aba250c:src/data/timeline.json` = sha256 tệp fixture = `762d461c43ec406f6061be66baded42952ec2b9f0cec72d4f577fe367316a465`; fixture có 28 mốc, không trường dịch EN.
- G5-4b đọc fixture bằng `readFileSync` (không gọi Git); quét theo **khóa của fixture** — fixture không có trường EN nên đúng các trường VI + sources được so, các trường dịch EN (`title_en`/`description_en`/`dayType_en`/`claimScope_en`/`limit_en`/`timeLabel_en`/`name_en`) là khác biệt được phép duy nhất. Không tự sinh baseline từ dữ liệu đang kiểm; **thiếu fixture = LỖI rõ nguyên nhân** ("thiếu fixture baseline … — kiểm bảo toàn KHÔNG được bỏ qua"), không bỏ qua kiểm.
- Hồi quy mới **G5-8b** (lớp nguồn): trích đúng hàm `hashHopLe` từ nguồn component (đếm ngoặc) rồi chạy 12 tình huống trên hàm thật — bắt đúng lỗi zero dẫn đầu.

**Chứng minh G5-4b 7/7 ĐẠT** (`proof-g54b-khong-git.mjs` → `proof-g54b-ket-qua.json`; sandbox ở thư mục tạm ngoài repo, không `.git` tổ tiên — script tự kiểm, tự dọn):
1. P1 repo chính có lịch sử Git → đạt;
2. P2 bản sao không `.git`, không thể tìm Git ở thư mục cha → đạt;
3. P3 sửa một trường VI (title mốc 0) → thất bại đúng G5-4b;
4. P3b sửa một URL nguồn (còn https, G5-4 vẫn đạt) → thất bại đúng G5-4b;
5. P4 xóa fixture → exit 1 + thông báo rõ "thiếu fixture";
6. P5 khôi phục fixture + dữ liệu sạch trong cùng bản sao → đạt trở lại;
7. P6 hồi quy zero dẫn đầu: hàm cũ giữ nhầm đúng `#milestone-00`/`#milestone-01` (khớp bằng chứng GPT Work) → bị bắt; hàm mới trích từ component đạt 12/12.

**Kiểm trình duyệt hash 24/24 ca khẳng định ĐẠT + 2 quan sát** (`pw-hash-keep.js` → `pw-hash-keep-ket-qua.json`; preview port 4402, click switcher thật, ghi URL cuối + hash + ID đích + scrollY): 12 tình huống × 2 chiều —
- Hợp lệ (`milestone-0`, `milestone-12`, `milestone-27`, `chuong-c1`, `chuong-c6`): hash giữ nguyên, ID đích tồn tại, cuộn tới đích (scrollY 349–14.099).
- Không hợp lệ (`milestone-00`, `milestone-01`, `milestone-028`, `milestone-999`, `chuong-c7`, `hash-sai`) + không hash: hash **bị bỏ khỏi URL đích**, scrollY = 0 (đầu trang đích).
- Quan sát (không khẳng định): tải trực tiếp `#milestone-00` — URL giữ hash (hành vi mặc định của trình duyệt), không có ID đích, không cuộn; không phải hành vi G05-B thêm vào.
- Console preview chỉ có lỗi tiền tồn tại cục bộ: `/_vercel/insights/script.js` 404 (beacon production) + favicon — không quy cho G05-B.

**Mutation chạy lại trên checker cuối 10/10 ĐẠT** (`mutation-ket-qua-v4.json`; bản v3 trước khi gỡ 1 hàm chết — kết quả tương tự, bị thay thế): sandbox copy thêm `scripts/fixtures/`; C3 (url http://) bắt G5-4 như cũ và từ vòng này **G5-4b kích hoạt phụ** (URL là trường bảo toàn) — đúng luật; các ca C1/C2/C4/C5/M6-M8 vẫn đúng lý do cũ.

**Build v4 — bản cuối** (`log-build-sau-v4.txt`; v3 là bản trung gian còn 1 hint do hàm chết `boEn` — đã gỡ, bị thay thế): `npm run build` EXIT 0, 0 dòng LỖI trong log, 287 trang, sitemap 286 URL, astro check 0 lỗi/0 cảnh báo/**4 hints = baseline**, 20.846 link nội bộ 0 hỏng, check-g05 **16/16** (11 nguồn gồm G5-8b + 5 dist).

**Tệp đổi trong vòng này:** `src/components/history/HistoryTimeline.astro` (hàm `hashHopLe` + chú thích); `scripts/check-g05-history-journey.mjs` (G5-4b theo fixture + G5-8b + chú thích phạm vi so); tạo `scripts/fixtures/timeline-baseline-aba250c.json`; `output/g05-history-journey/` thêm `proof-g54b-khong-git.mjs` + `proof-g54b-ket-qua.json` + `pw-hash-keep.js` + `pw-hash-keep-stdout.txt` + `pw-hash-keep-ket-qua.json` + `mutation-ket-qua-v3.json` (thay thế) + `mutation-ket-qua-v4.json` + `log-build-sau-v3.txt` (thay thế) + `log-build-sau-v4.txt` + `preview-g05-v3.log` + `ap-dung-vong-2.cjs`; `mutation-g05.mjs` (sandbox copy fixture). Ma trận: M3-4 thay bằng chứng (cũ giữ `ketQuaCu`), M2-7 ghi chú cơ chế fixture, `dienGiai` nối vòng sửa 2.

## 0-quater. Hoàn thiện định dạng hồ sơ (TXN-20260913-16)

GPT Work xác nhận hai lỗi chức năng E1/E2 **đạt kiểm chứng độc lập** (hash zero dẫn đầu bị loại cả hai chiều; fixture khớp commit gốc; checker chạy không cần Git và bắt đúng dữ liệu sửa/thiếu fixture; build exit 0, check-g05 16/16, diagnostics 0 lỗi/0 cảnh báo/4 hints) — hồ sơ chỉ còn lỗi định dạng: `git diff --cached --check` trên đúng 79 tệp G05-B trả exit 1.

**Đính chính:** phép quét whitespace ghi ở mục 10 trước đây chỉ phủ src/ + scripts/ + fixtures/ + biên bản, **chưa bao phủ các log trong `output/g05-history-journey/`**. Đã chuẩn hóa định dạng, **không thay nội dung/thời gian/thông điệp log — kết quả log không đổi**:
- 18 dòng khoảng trắng cuối dòng (mỗi dòng bỏ đúng 1 byte dấu cách): `log-build-nen-g05b.txt` 293/332/358, `log-build-nen.txt` 293/332/358, `log-build-sau-v2.txt` 293/343/369, `log-build-sau-v3.txt` 298/349/375, `log-build-sau-v4.txt` 293/344/370, `log-build-sau.txt` 293/342/368.
- 3 log preview (`preview-g05-v3.log`, `preview-nen.log`, `preview-sau.log`): bỏ 1 dòng trống EOF (dòng 6), giữ 1 newline kết thúc tệp.
- Không build lại (chỉ đổi định dạng) — build độc lập của GPT Work tại lượt này đã đạt; 30 PNG trong `shots/` **nguyên hash sha256 trước/sau** (không xử lý như văn bản, không chụp lại).
- Xác nhận sau chuẩn hóa: quét lại toàn bộ 79 tệp gói (49 văn bản + 30 PNG) — **0 dòng khoảng trắng cuối, 0 dòng trống EOF**; stage đủ 79 tệp → `git diff --cached --check` **exit 0** → bỏ stage, working tree giữ nguyên.
- Ghi nhận ngoài phạm vi (không sửa theo giới hạn "chỉ bỏ … nêu trên"): 7 tệp JSON/md **thiếu newline cuối tệp** (`bang-28-moc-vi-en.md`, `boc-cuc-ket-qua.json`, `do-tai-ket-qua.json`, `ma-tran-31-ca-ket-qua.json`, `proof-g54b-ket-qua.json`, `pw-hash-keep-ket-qua.json`, `thao-tac-ket-qua.json`) — `git diff --check` không bắt lỗi dạng này; nếu GPT Work muốn bổ sung newline kết thúc, GLM làm ở vòng sau theo chỉ định.

## 1. Phạm vi thực hiện

Cải tổ `/lich-su/` thành 6 chương (giữ đủ 28 mốc) + thêm **một** trang `/en/history/` dịch đầy đủ; dùng khuôn chung `HistoryTimeline.astro` với 2 wrapper mỏng; giữ nguyên 28 SVG timeline, không thêm ảnh/hoạt ảnh; giữ đọc danh sách/lọc loại/nhảy mốc; lối vào lịch sử trên 2 trang chủ; không nhúng lại chương G04 (giữ đường đọc tiếp tới đúng bài VI/EN).

## 2. Danh sách tệp thật và lý do

| Tệp | Hành động | Lý do |
|---|---|---|
| `src/data/timeline.json` | sửa (+136 dòng) | Thêm `title_en`/`description_en`/`dayType_en`/`claimScope_en` ×28, `limit_en` ×19, `timeLabel_en` ×1 ("2013–present"), `name_en` ×4 nguồn; trường VI bảo toàn nguyên trạng (đối chiếu `git show aba250c` — 0 lệch); `sources[].proves` giữ nguyên (hồ sơ nguồn, không mở UI) |
| `src/data/historyChapters.ts` | tạo | Dữ liệu 6 chương song ngữ dùng chung (ranh giới đã duyệt G05-A: 5+4+6+6+4+3) |
| `src/components/history/HistoryTimeline.astro` | tạo | Khuôn chung VI/EN — toàn bộ lọc/nav/reveal/anchor viết một lần; chứa hook giữ hash cặp lịch sử + nhãn trạng thái đọc tiếp |
| `src/pages/lich-su.astro` | sửa (wrapper mỏng) | Chỉ còn BaseLayout + title/description VI nguyên trạng + `<HistoryTimeline lang="vi" />` |
| `src/pages/en/history.astro` | tạo (wrapper mỏng) | Bản EN `/en/history/` |
| `src/i18n/contentRoutes.ts` | sửa (+1 cặp) | `{ vi: '/lich-su', en: '/en/history/' }` vào STATIC_PAIRS |
| `src/components/Header.astro` | sửa hẹp | Thêm attribute `data-lang-hash-keep` trên 2 switcher (điểm nối giữ hash); không đổi hành vi switcher toàn site |
| `src/i18n/ui.ts` | sửa (+1 dòng) | OG image map: `/en/history` dùng `og-lich-su.jpg` (cùng khu vực) |
| `src/pages/en/index.astro` | sửa (+1 section) | Lối vào EN gọn sau Reading paths: khối "Five centuries…" trỏ `/en/history/` + 6 chip chương; không đụng hero |
| `scripts/check-g01-navigation.mjs` | sửa | Đảo ca `/lich-su` nay có bản dịch (logic: englishPathFor/localizedHref/switcherTarget/getAlternates; dist: menu Explore EN trỏ `/en/history/`, hreflang, noscript); thêm khối ca `/en/history/`; giữ nguyên các kiểm âm cho `/giai-phau`, `/so-sanh` |
| `scripts/check-english-launch.mjs` | sửa (+1 dòng) | `/en/history/` vào REQUIRED_EN |
| `scripts/check-evolution-data.mjs` | sửa (+1 tên trong SKIP_FILES) | **Tệp ngoài danh sách được phép — nêu rõ:** script quét mọi `.ts` trong `src/data` và bắt nhầm `historyChapters.ts` là dataset tiến hóa ("không tìm thấy trường slug") làm build vỡ; thêm tên tệp vào danh sách đã có của khuôn (`modelEvolution/learningPaths/decisionMaps`) — không đổi logic kiểm. GPT Work **đã chấp nhận** ở TXN-20260913-11 (chỉ riêng tệp này, không mở rộng danh sách) |
| `scripts/check-g05-history-journey.mjs` | tạo | Bộ kiểm G05: 9 ca nguồn (G5-1…G5-8) + 5 ca dist (G5-D1…D5); hỗ trợ `--source-only` cho mutation |
| `package.json` | sửa (chỉ nối kiểm) | `check` + `node scripts/check-g05-history-journey.mjs`; `build` + `… dist`; lệnh riêng `check:g05` |
| `docs/nghiem-thu/G05-B-hanh-trinh-lich-su-song-ngu-2026-09-13.md` | tạo | Biên bản này |
| `output/g05-history-journey/` | tạo | Bằng chứng: log build nền/sau, boc-cuc-ket-qua.json + shots/ (28 ảnh), thao-tac-ket-qua.json, do-tai-ket-qua.json, ma-tran-31-ca-ket-qua.json, mutation-ket-qua.json, ap-dung-dich.py, bang-28-moc-vi-en.md |

Không sửa: `public/` (28 SVG nguyên hash — `git status public/` rỗng), dependency/lockfile, CSP, analytics, bài cơ chế, component G04, các tệp G05-A đã commit.

## 3. Tổ chức 6 chương + bảng 28 mốc VI/EN

Ranh giới khớp bảng ánh xạ G05-A: C1 mốc 0–4, C2 5–8, C3 9–14, C4 15–20, C5 21–24, C6 25–27. Mỗi chương có: nhãn "Chương N/Chapter N", tiêu đề, câu hỏi mở, đoạn dẫn/giới hạn (câu giữ chương theo G05-A: không gán nhân quả từ thứ tự thời gian; không gọi tourbillon là đỉnh cao; giữ mức claim + tranh chấp G02). Câu chữ dự thảo được chỉnh cho tự nhiên, không đổi ý, không thêm claim.

Bảng 28 mốc VI/EN (nguyên văn từ `timeline.json`; bản chi tiết: `output/g05-history-journey/bang-28-moc-vi-en.md`):

| # | Slug | Tiêu đề VI | Tiêu đề EN | Chương | Đọc tiếp |
|---|---|---|---|---|---|
| 0 | peter-henlein | Peter Henlein — những cỗ máy thời gian bỏ túi đầu tiên | Peter Henlein — the first pocket timepieces | C1 | chưa có bài |
| 1 | huygens-hairspring | Huygens — con lắc (1657) và dây tóc-bánh lắc (1675) | Huygens — the pendulum clock (1657) and the balance spring (1675) | C1 | cặp EN: /en/mechanisms/balance-and-hairspring/ |
| 2 | blancpain | Blancpain lập xưởng tại Villeret | Blancpain sets up a workshop in Villeret | C1 | chỉ VI |
| 3 | vacheron-constantin | Vacheron mở xưởng tại Geneva | Vacheron opens a workshop in Geneva | C1 | chỉ VI |
| 4 | breguet-tourbillon | Breguet sáng chế tourbillon | Breguet patents the tourbillon | C1 | cặp EN: /en/glossary/tourbillon/ |
| 5 | breguet-naples | Breguet chế tác đồng hồ đeo tay cho Hoàng hậu Naples | Breguet makes a wristwatch for the Queen of Naples | C2 | chỉ VI |
| 6 | patek-first-wristwatch | Patek Philippe làm đồng hồ đeo tay cho Nữ bá tước Koscowicz | Patek Philippe makes a wristwatch for Countess Koscowicz | C2 | chỉ VI |
| 7 | cartier-santos | Cartier Santos ra đời | The Cartier Santos is born | C2 | chỉ VI |
| 8 | trench-watch | Thế chiến I — đồng hồ đeo tay lan rộng trong quân đội | World War I — the wristwatch spreads through the armies | C2 | chưa có bài |
| 9 | harwood-automatic | John Harwood — cơ chế tự động lên cót | John Harwood — the self-winding mechanism | C3 | cặp EN: /en/mechanisms/automatic-winding/ |
| 10 | rolex-oyster | Rolex Oyster — vỏ chống nước đầu tiên | Rolex Oyster — the first waterproof case | C3 | cặp EN: /en/brands/rolex/ |
| 11 | rolex-perpetual | Rolex Perpetual — rotor tự động xoay 360° | Rolex Perpetual — the 360° self-winding rotor | C3 | cặp EN: /en/mechanisms/automatic-winding/ |
| 12 | jlc-reverso | Jaeger-LeCoultre Reverso | Jaeger-LeCoultre Reverso | C3 | chỉ VI |
| 13 | iwc-pilot | IWC ra mắt dòng Pilot's Watch | IWC launches the Pilot’s Watch line | C3 | chỉ VI |
| 14 | rolex-datejust | Rolex Datejust — lịch ngày trên cửa sổ mặt số | Rolex Datejust — a date window on the dial | C3 | cặp EN: /en/brands/rolex/ |
| 15 | fifty-fathoms | Blancpain Fifty Fathoms — đồng hồ lặn hiện đại đầu tiên | Blancpain Fifty Fathoms — the first modern dive watch | C4 | chỉ VI |
| 16 | rolex-submariner | Rolex Explorer & Submariner ra đời | Rolex Explorer & Submariner are born | C4 | cặp EN: /en/iconic-watches/rolex-submariner/ |
| 17 | rolex-gmt | Rolex GMT-Master — kim 24 giờ | Rolex GMT-Master — the 24-hour hand | C4 | cặp EN: /en/glossary/gmt/ |
| 18 | omega-speedmaster | Omega Speedmaster ra mắt | The Omega Speedmaster is launched | C4 | cặp EN: /en/iconic-watches/omega-speedmaster/ |
| 19 | heuer-carrera | Heuer Carrera ra đời | The Heuer Carrera is born | C4 | chỉ VI |
| 20 | automatic-chronograph-race | Cuộc đua chronograph tự động | The automatic chronograph race | C4 | chỉ VI |
| 21 | seiko-astron | Seiko Astron — đồng hồ quartz thương mại đầu tiên | Seiko Astron — the first commercial quartz watch | C5 | cặp EN: /en/brands/seiko/ |
| 22 | ap-royal-oak | Audemars Piguet Royal Oak | Audemars Piguet Royal Oak | C5 | chỉ VI |
| 23 | patek-nautilus | Patek Philippe Nautilus | Patek Philippe Nautilus | C5 | chỉ VI |
| 24 | swatch-1983 | Swatch ra đời, ngành Thụy Sĩ tái cấu trúc | Swatch is born, the Swiss industry restructures | C5 | chưa có bài |
| 25 | omega-coaxial | Omega thương mại hóa bộ thoát Co-Axial | Omega industrialises the Co-Axial escapement | C6 | cặp EN: /en/brands/omega/ |
| 26 | un-freak | Ulysse Nardin Freak — kỷ nguyên silicon | Ulysse Nardin Freak — the silicon era | C6 | chỉ VI |
| 27 | silicon-revival | Silicon trong bộ máy — cơ khí phục hưng | Silicon in the movement — the mechanical revival | C6 | cặp EN: /en/mechanisms/anti-magnetism/ |

## 4. Dữ liệu và bản dịch

- Đầy đủ per mốc: `title_en`, `description_en`, `dayType_en`, `claimScope_en` (×28); `limit_en` đúng 19 mốc có giới hạn; `timeLabel_en` chỉ mốc silicon-revival ("2013–present"); `name_en` đúng 4 tên nguồn có phần tiếng Việt ("(brand press release)", "(Bracelets section)", "issue 13", "Press release for 40 years of the Nautilus"). URL nguồn, tên riêng, ngày kiểm giữ nguyên; không tự ghi ngày kiểm mới.
- Alt theo cấu trúc: `title(ngôn ngữ) + " — minh họa cho mốc này"/" — illustration for this milestone"` (mô tả trung tính, không suy chi tiết từ hình).
- Trang EN dịch đầy đủ: đoạn dẫn, ghi chú cuối, metadata, nhãn loại/mức chứng minh/nguồn/ngày kiểm, bộ lọc, đếm, nav chương/thập niên, aria-label, trạng thái.
- Đọc tiếp ở EN theo đếm **theo mốc/lần dẫn**: 12 link bản EN thật + 13 link VI kèm nhãn "Vietnamese only — no English version yet" + 3 "No further reading for this milestone yet". (Không gọi đây là số URL duy nhất.)
- Khối lượng bản dịch cuối: tự nhiên theo nội dung G02, KHÔNG viết để đạt chỉ tiêu ước lượng 3.400–4.000 từ (ước lượng của G05-A chỉ dùng lập kế hoạch).
- Không dùng quét dấu tiếng Việt làm bằng chứng dịch đầy đủ: đối chiếu nội dung từng mốc đã làm ở lớp kiểm G5-2/G5-4 + rà "theo hãng", loại ngày, giới hạn trong ảnh chụp và grep có chủ đích; tên riêng kiểu Pháp ("Métiers d'Art", "René-Alfred Chauvot", "Gérald Genta") được loại khỏi kiểm rò.

## 5. Điều hướng và trải nghiệm

- Giữ `#milestone-0…27`; anchor chương **ID chung hai ngôn ngữ** `#chuong-c1…6`; nav chương là liên kết neo thật (dùng được không-JS — đã kiểm).
- Lọc xuyên chương: số lớp mechanism 12 / brand 13 / culture 3; "Tất cả" về 28; đề mục chương luôn hiển thị; nav chương hiện k/N khi lọc ẩn bớt (rỗng khi đủ); nhảy mốc bị ẩn giữ hành vi cũ — bỏ qua, không tự bật lớp.
- Đổi ngôn ngữ: thêm đúng 1 cặp; hook giữ hash **chỉ cho cặp lịch sử** (nằm trong script component trang lịch sử — nạp cùng bundle với script Header; nghe cả `hashchange` để bắt điều hướng cùng-trang): hash hợp lệ → gắn vào href switcher; hash sai → về đầu trang. Không-JS: link switcher vẫn tới trang đích thật (giới hạn: giữ hash động cần JS — ghi rõ theo yêu cầu).
- Menu EN: mục History trỏ `/en/history/` và mất nhãn "Vietnamese only"; Anatomy/Compare giữ nhãn hiện hành; không làm Home/mục khác gạch sai (check-g01 aria-current toàn dist đạt).
- Cuộn: `scroll-margin-top` cho section chương (7.5rem) và thẻ mốc (7rem); nhảy chương thấy tiêu đề cả 20 tổ hợp; không sửa sticky toàn site; không khóa cuộn, không thêm hiệu ứng hàng loạt.
- Không thêm biến màu chưa khai báo (astro check 4 hints = baseline); nội dung 28 mốc/6 chương đọc được khi tắt JS hoặc bật reduced-motion (đã kiểm).

## 6. Bộ kiểm

- **G01:** cập nhật ca lịch sử nay có bản dịch; giữ kiểm âm cho 2 mục chưa dịch khác, root mapping, active nav, aria-current toàn dist — không xóa kiểm âm.
- **G02:** giữ nguyên 16 ca bảo vệ dữ liệu VI (28 mốc, 52 lần dẫn nguồn, 19 giới hạn, nhãn "Chưa có bài đọc thêm") — khuôn component giữ nguyên class/data-* nên ca dist cũ đạt nguyên trạng; không bỏ kiểm tương ứng.
- **G05 (mới):** lớp nguồn chạy trước build trong `npm run check` (G5-1…G5-8); lớp dist chạy sau `astro build` trong `npm run build` (G5-D1…D5) — phân biệt rõ hai lệnh; không dùng dist cũ chứng minh mã mới (dist build lại từ đầu mỗi lần).
- **English launch:** thêm `/en/history/` vào route bắt buộc, giữ các route cũ (60 → 61).
- **Mutation 5 ca cô lập** (`output/g05-history-journey/mutation-g05.mjs`, sandbox riêng không chứa secret, đã dọn): bản sạch exit 0; C1 thiếu dịch → bắt G5-2; C2 lệch chương → G5-5; C3 nguồn VI hỏng → G5-4; C4 cặp EN giả → G5-6; C5 lệch timeLabel → G5-3. Kết quả: `mutation-ket-qua.json` — **6/6 ĐẠT đúng lý do**. Không tiêm repo chính.

## 7. Nghiệm thu và bằng chứng

**Ma trận 31 ca G05-A → kết quả thật: 31/31 ĐẠT** — `output/g05-history-journey/ma-tran-31-ca-ket-qua.json` (mỗi ca kèm đường dẫn bằng chứng). Giới hạn giữ đúng: check-links chỉ kiểm nội bộ (scripts/check-links.mjs:47); nguồn ngoài chỉ đối chiếu bảo toàn với G02, không truy cập HTTP; kiểm máy không thay đối chiếu nghĩa bản dịch (câu giữ chương/mức claim được rà thủ công + ảnh chụp).

**Ma trận bố cục: 20/20 tổ hợp ĐẠT** — 2 route × 320/375/768/1024/1440 × sáng/tối (`boc-cuc-ket-qua.json`): theme/lang đọc từ DOM thật, overflow=false mọi tổ hợp, nav chương=6, nhảy chương C4 thấy tiêu đề. 28 ảnh chụp trong `shots/`; **8 ảnh đại diện VI/EN × 320/1440 × sáng/tối đã tự mở xem** — đúng vùng chương/thẻ (đề mục + câu hỏi + thẻ mốc, không chụp nhầm footer).

**Kiểm thao tác: 15/15 ĐẠT** (`thao-tac-ket-qua.json`): lọc 3 lớp + đếm + k/N; nhảy mốc ẩn bỏ qua; nhảy chương không bị che; switcher 2 chiều với không-hash / #milestone-12 / #chuong-c5 / #milestone-20 / hash sai; bàn phím focus; no-JS; reduced-motion; fallback ảnh lỗi (context mới); nguồn + trạng thái không bị giấu sau hình.

**Đo tải** (`do-tai-ket-qua.json`; cùng viewport/cache sạch/điều kiện; preview 2 server cùng khuôn):

| Lượt | Request | Byte giải mã | HTML | CSS | JS | Ảnh |
|---|---|---|---|---|---|---|
| TRƯỚC nền `aba250c` `/lich-su/` (4398) | 26 | 869.850 | 286.237 | 111.247 | 20.172 | 452.194 (20 req) |
| SAU G05-B `/lich-su/` (4399) | 26 | 882.481 | 288.001 | 111.591 | 21.921 | 460.968 (20 req) |
| SAU G05-B `/en/history/` (4399, route mới) | 17 | 677.788 | 287.404 | 111.591 | 21.921 | 256.872 (11 req) |

- `/lich-su/`: +12.631 B (~+1,5%). `/en/history/`: số tuyệt đối, không lấy 404/trang khác làm baseline. Byte đĩa: 288.001/287.404 B (stat). content-length null ghi riêng (13/12/12) — không cộng 0; bodyNull=0. Ảnh lazy đo sau kích hoạt cuộn; ảnh chưa kích hoạt không bị coi là hỏng. Request lỗi duy nhất mọi lượt: `/_vercel/insights/script.js` 404 — beacon chỉ có trên production, tiền tồn tại ở cả nền. **0 request ảnh AI; 28 SVG giữ hash nguyên (`git status public/` rỗng).**

**Build cuối:** `npm run build` EXIT 0 — 287 trang (286 → **+1 HTML route đúng kỳ vọng**), 20.846 link nội bộ 0 hỏng, astro check 0/0/**4 hints = baseline**, sitemap `sitemap-0.xml` 285 → **286 URL** (+1 trang, đếm tệp sitemap-0, không cộng sitemap index). G04 hai bài cơ chế giữ nguyên (check-g04 toàn ĐẠT trong chuỗi); hồi quy điều hướng/trang chủ đạt. Không tuyên bố đạt accessibility/bảo mật toàn site. **Bản đo cuối cùng của gói là build v4 (mục 0-ter) — cùng các số này, log `log-build-sau-v4.txt`.**

## 8. Yêu cầu bổ sung — chờ GPT Work đánh giá

Phần phê duyệt của anh có nhắc "bổ sung vào kế hoạch phần ảnh AI kết hợp một chương kể chuyện đầy đủ như G04 áp dụng cho mọi cơ chế (có thể đánh giá để xem xét áp dụng)". Theo đúng phân vai ghi trong prompt: đây là **yêu cầu ĐÁNH GIÁ, không phải quyền tích hợp** — GLM không kiểm kê/sửa hàng loạt cơ chế, không tạo ảnh, không tự thêm mã gói. Mục này ghi nhận để **GPT Work đánh giá khả năng áp dụng theo cơ chế, nguồn, khối lượng, rủi ro và phần giao với G06-C**, trình anh Vinh quyết trước khi nhân rộng. T1/T2 trong hồ sơ G05-A chưa được mở.

## 9. Giới hạn và điểm ghi nhận

- Hook giữ hash cần JS; khi tắt JS link switcher vẫn tới trang đích thật (không hash) — ghi rõ theo yêu cầu.
- URL VI khi chuyển từ EN là `/lich-su` (không slash cuối) — giá trị bảng cặp hiện hành, server phục vụ bình thường; khuôn chung toàn site, không phải riêng G05-B.
- hreflang hai chiều có chênh dấu slash cuối (`/lich-su/` từ pathname trang VI, `/lich-su` từ giá trị bảng ở trang EN) — hành vi tiền tồn tại của `getAlternates` toàn site, ghi nhận, không sửa âm thầm.
- Đo tải: request `/​_vercel/insights/script.js` 404 trên preview — tiền tồn tại cả nền lẫn sau.
- Biên dịch không ép theo chỉ tiêu từ; các số ước lượng G05-A không dùng làm chuẩn nghiệm thu.

## 10. Trạng thái Git

- HEAD `aba250c` trên `main` — KHÔNG commit, KHÔNG push, KHÔNG deploy; **staged trống** (`git status --porcelain`: 10 tệp tracked modified đúng mục 2 + untracked mới đúng danh sách tạo gồm thêm `scripts/fixtures/timeline-baseline-aba250c.json` (vòng sửa 2) + `output/g05-history-journey/`).
- `git diff --check` rỗng; quét whitespace: phép quét trước (src/ + scripts/ + fixtures/ + biên bản) **chưa phủ log output — đã đính chính và chuẩn hóa 9 tệp log theo TXN-20260913-16 (mục 0-quater)**; quét lại toàn bộ 79 tệp gói: 0 dòng khoảng trắng cuối, 0 dòng trống EOF; `git diff --cached --check` trên 79 tệp stage = exit 0 (đã bỏ stage sau kiểm); quét khuôn nhạy cảm (sk-/ghp_/AKIA/-----BEGIN): 0 — không in giá trị bí mật.
- Hoàn nguyên sau khi commit (nếu cần): `git revert` commit G05-B; trước commit: `git checkout -- <các tệp tracked>` + xóa các tệp tạo mới (gồm `scripts/fixtures/`) + `output/g05-history-journey/`.

## 11. Kết luận

**G05-B xong vòng sửa 2 TXN-20260913-14 (whitelist hash dạng chuẩn + G5-4b theo fixture không phụ thuộc Git), tự kiểm đạt — chờ GPT Work tái nghiệm thu; chưa commit/push/deploy.** Không mở G06, không triển khai nhân rộng ảnh AI cho các cơ chế.
