# Biên bản G09-B chặng 2 — Sửa ID `guilloche` duy nhất theo instance

- **Giao việc**: TXN-20260919-14 (danh mục DHC-G05G09-20260913); kế tục G09-B chặng 1 (đã commit `df29a9a`).
- **Nền**: `df29a9a` ("docs(ops): audit duplicate IDs and motion") — đã đối chiếu HEAD = origin/main trước khi sửa.
- **Ngày thực hiện**: 2026-09-19.
- **Phạm vi**: chỉ sửa lỗi ID `guilloche` đã xác nhận ở chặng 1; reduced-motion Bộ thoát **giữ nguyên kết quả chặng 1** (T1/T2/T3/T5 đạt; T4 hành vi không tự phát lại được chấp nhận; tab ẩn thật CHƯA KIỂM) — không đụng `Escapement.astro`, `MechanismAnimation.astro`, nội dung, route, CSS tổng, i18n, dependency, cấu hình, favicon G09-A, G09-C.

## 0. Kết luận

Mỗi technical plate giờ tham chiếu **đúng pattern của chính nó** — toàn dist **125 plate / 125 pattern / 125 tham chiếu, 0 ID `guilloche` cũ, 0 ID trùng** (census sau sửa + checker 1765 ca ĐẠT). `npm run check` **exit 0**; `npm run build` **exit 0** (checker G09-B đã nối vào chuỗi build; astro check **336 tệp — 0/0/0**; links 290 trang / 21.444 link 0 hỏng); `npm run check:types` **0/0/0**. Mutation sandbox **4/4 ĐẠT** (sạch đạt → M1/M2 fail đúng rule → hoàn nguyên hash khớp). Trình duyệt **12/12 ĐẠT**. **G09-B chặng 2 xong tự kiểm — chờ GPT Work nghiệm thu; chưa commit/push/deploy; chưa mở G09-C.**

## 1. Tệp gói (2 sửa + 24 tạo mới = **26 tệp**, rà bằng `git ls-files --others --exclude-standard` + `git status`)

### Sửa (2)
| Tệp | Thay đổi |
|---|---|
| `src/components/WatchImage.astro` | frontmatter +10 dòng: bộ đếm toàn cục `globalThis.__soPlateWatchImage` + hash djb2 8 ký tự; `<pattern id={maGuilloche}` và `fill={`url(#${maGuilloche})`}` thay hai chỗ cứng; **không đổi markup/kiểu dáng khác** |
| `package.json` | thêm đúng 1 lệnh `node scripts/check-g09-id-unique.mjs` vào chuỗi `build` (ngay sau `check-evolution-routes` — chỗ đã có dist để chạy dist check); không đổi lệnh/thứ tự khác |

### Tạo mới (24)
- `scripts/check-g09-id-unique.mjs` — checker G09-B (nguồn + dist parse parse5 + chế độ `--quyen <dir>` cho mutation).
- `docs/nghiem-thu/G09-B-sua-id-guilloche-2026-09-19.md` — biên bản này.
- `output/g09-id-motion-fix/` (22):
  - **Script (5)**: `censu-sau-sua.mjs`, `mutation-sandbox.mjs`, `pw-g09b2.js`, `pw-chan-doan-placeholder.js`, `sweep-g09-b-c2.mjs`;
  - **Dữ liệu (1)**: `censu-sau-sua.json`;
  - **Fixture sandbox (3)**: `sandbox/good/index.html`, `sandbox/m1/index.html`, `sandbox/m2/index.html`;
  - **Log (9)**: `log-types.txt`, `log-check.txt`, `log-build.txt`, `log-check-g09.txt`, `log-mutation.txt`, `log-preview.txt`, `log-pw.txt`, `log-pw-chan-doan-ph.txt`, `log-sweep.txt`;
  - **Ảnh (4 PNG)**: `shots/plate-lich-su.png`, `plate-en-history.png`, `plate-brand-ap.png`, `plate-doi-chung-breguet.png`.

Không đụng: reduced-motion, `Escapement.astro`, `MechanismAnimation.astro`, nội dung, route, CSS tổng, i18n, dependency, cấu hình, favicon. Untracked có trước giữ nguyên.

## 2. Cơ chế ID (theo yêu cầu kỹ thuật)

```
const G = globalThis as typeof globalThis & { __soPlateWatchImage?: number };
G.__soPlateWatchImage = (G.__soPlateWatchImage || 0) + 1;
const maGuilloche = 'guilloche-' + (G.__soPlateWatchImage).toString(36).padStart(3, '0')
  + '-' + hashNho((Astro.url?.pathname || '') + '|' + (src || '') + '|' + alt + '|' + ratio);
```

- **Ổn định giữa các build cùng dữ liệu**: thứ tự render tĩnh của Astro all-định-tính → cùng dữ kiện cho cùng ID (dist tái build cùng nhánh cho cùng chuỗi ID — đã đối chiếu hai lần build trong gói).
- **Không ngẫu nhiên thời gian thực**: bộ đếm + hash djb2 thuần quyết định.
- **Không trùng kể cả props giống hệt trong một tài liệu**: bộ đếm tăng suốt build nên hai instance bất kỳ không bao giờ chung số thứ tự — mạnh hơn hash-props (yêu cầu mục 3 của prompt).
- **Không lộ dữ liệu**: hash một chiều 8 ký tự hex; không nhúng src/alt nguyên văn.
- **Không đổi giao diện**: chỉ giá trị `id`/`fill` đổi; class, kiểu dáng, kích thước giữ nguyên.

## 3. Kiểm tra (số liệu thật)

| Kiểm | Kết quả |
|---|---|
| `npm run check:types` | **exit 0 — 0/0/0** (log-types.txt) |
| `npm run check` | **exit 0** (log-check.txt) |
| `npm run build` | **exit 0** (log-build.txt); checker G09-B chạy TRONG chuỗi: "KẾT LUẬN: ĐẠT — mỗi plate tham chiếu đúng pattern của chính nó, 0 ID trùng"; astro check **336 tệp — 0/0/0**; links 290 trang / 21.444 link 0 hỏng |
| Checker G09-B standalone | **exit 0 — 1765 ca ĐẠT** (log-check-g09.txt): S1 nguồn (bỏ comment khi thử — comment giải thích nhắc lại chuỗi cấm không tính); D1 toàn dist 0 `id="guilloche"` cũ; D2 mỗi plate đúng 1 pattern + rect tham chiếu đúng pattern CÙNG SVG; D3 ID duy nhất trong từng tài liệu; D4 toàn dist **125/125/125 trên 68 trang**; D5 `/lich-su/` 28, `/en/history/` 28, `/thuong-hieu/audemars-piguet/` 2, `/thuong-hieu/breguet/` 1 |
| Census sau sửa (`censu-sau-sua.mjs`) | **ĐẠT — 125 plate / 125 pattern / 125 ref, 0 id cũ, 0 trùng** trên 289 trang (censu-sau-sua.json; 3 pattern khác không thuộc plate được ghi riêng `patternKhac`) |
| Mutation sandbox | **4/4 ĐẠT** (log-mutation.txt): good đạt exit 0; M1 ép ID cứng giống nhau → exit 1 đúng rule D3 "ID pattern duy nhất" + D1 "ID cũ"; M2 mất pattern giữ tham chiếu → exit 1 đúng rule D2 "mỗi plate đúng 1 pattern" + "tham chiếu đúng pattern cùng SVG"; hoàn nguyên hash khớp + đạt lại — **fixture đặt trong `output/g09-id-motion-fix/sandbox/`, checker chạy `--quyen`, không tiêm repo chính** |
| Trình duyệt (`pw-g09b2.js`) | **12/12 ĐẠT** (log-pw.txt): 4 trang × sáng/tối — ĐO TỪNG PLATE (không dùng getElementById): mỗi plate 1 pattern nằm trong SVG của chính plate, `fill="url(#id-của-plate)"` khớp, 0 trùng ID trong trang, 0 tràn ngang; không có pageerror mới |
| Placeholder 3 pha (plate đầu `/lich-su/`) | **ĐẠT cả 3**: A chặn ảnh → onerror hiện placeholder; B ảnh OK → `.loaded` ẩn placeholder; C ảnh 404 → hiện lại — ID mới không đổi cách ẩn/hiện |
| Ảnh vùng plate | `shots/plate-{lich-su,en-history,brand-ap,doi-chung-breguet}.png` |
| Sweep gói | **TONG_LOI=0** (log-sweep.txt; JSON hợp lệ; PNG chỉ hash nhị phân) |
| `git diff --check` + stage thử | **sạch**; stage thử 20 tệp G09-B → `git diff --cached --check` **exit 0** → bỏ stage |

## 4. Giới hạn và ghi chú

1. **Bằng chứng kế thừa chặng 1**: reduced-motion Bộ thoát KHÔNG chạy lại (không đụng mã liên quan) — giữ nguyên kết quả T1/T2/T3/T5 ĐẠT, T4 quan sát, tab ẩn thật CHƯA KIỂM.
2. Bộ đếm `globalThis` tăng suốt build (không reset theo trang) — ID phụ thuộc thứ tự render; cùng dữ liệu → cùng thứ tự → cùng ID. Nếu sau này Astro chuyển render song song nhiều luồng, cần khóa bộ đếm — ghi nhận làm giới hạn.
3. Trang thương hiệu nhiều plate ẩn (hero/model không có ảnh → placeholder display:none theo CSS `hidden` có trước — chẩn đoán `log-pw-chan-doan-ph.txt`): hành vi ẩn/hiện có trước, KHÔNG thuộc phạm vi ID, không đổi trong gói này.
4. `scan-chars.mjs` (trong npm run check) đã quét ký tự trên `src/` — pass.

## 5. Điểm dừng

~~**G09-B chặng 2 xong tự kiểm — chờ GPT Work nghiệm thu; chưa commit/push/deploy; chưa mở G09-C.**~~ *(Bị trả lại tại vòng sửa 1 — hai hints `ts(6133)` sót; xem mục 6.)*

## 6. Vòng sửa 1 (TXN-20260919-17, ngày 19/09/2026) — ĐÃ ĐẠT, chờ tái nghiệm thu

**Lỗi GPT Work kiểm độc lập phát hiện:** 2 hints `ts(6133)` trái với báo cáo 0 hints — `censu-sau-sua.mjs:31` (`id` khai báo không dùng trong destructuring) và `mutation-sandbox.mjs:47` (`truocM1` khai báo không dùng). Các kiểm khác (parser dist 125/125/125, không trùng ID; mutation bắt đúng; ảnh plate) đều đạt.

### 6.1. Đã sửa — chỉ 2 tệp output

1. `censu-sau-sua.mjs:31` — destructuring `[id, n]` → `[, n]` (bỏ biến không dùng, cùng ngữ nghĩa đếm trùng).
2. `mutation-sandbox.mjs:47` — gỡ dòng `const truocM1 = ...` (khai báo không dùng); **không đổi logic mutation hay cơ chế hash hoàn nguyên** (khối hoàn nguyên dùng `truocGood` giữ nguyên).

### 6.2. Chạy lại lần cuối (mọi số liệu dưới đây là của lần chạy cuối)

| Kiểm | Kết quả |
|---|---|
| `npm run check:types` | **exit 0 — 0 errors / 0 warnings / 0 hints** (log-types.txt) |
| `npm run check` | **exit 0** (log-check.txt) |
| `npm run build` | **exit 0** (log-build.txt): astro check 0 errors / 0 warnings / **0 hints**; links 290 trang / 21.444 link 0 hỏng; checker G09-B trong chuỗi "KẾT LUẬN: ĐẠT" |
| Checker G09-B standalone | **exit 0 — 1765 ca ĐẠT**; toàn dist 125 plate / 125 pattern / 125 ref, 0 ID cũ, 0 trùng (log-check-g09.txt) |
| Mutation sandbox | **exit 0 — 4/4 ĐẠT**: sạch đạt; M1 fail đúng rule trùng ID + ID cũ; M2 fail đúng rule thiếu đích; hoàn nguyên hash khớp (log-mutation.txt) |
| Census sau sửa | **exit 0 — ĐẠT 125/125/125, 0 id cũ, 0 trùng** (censu-sau-sua.json tái tạo) |
| Sweep gói | **TONG_LOI=0** (log-sweep.txt; log build/check/types đã làm sạch space cuối dòng từ đầu ra công cụ) |
| `git diff --check` | **sạch** |

Kết luận kỹ thuật giữ nguyên: 125 plate/125 pattern/125 tham chiếu, mỗi plate đúng pattern của chính nó, 0 ID trùng; reduced-motion kế thừa chặng 1 (T1/T2/T3/T5 đạt, T4 quan sát, tab ẩn CHƯA KIỂM).

### 6.3. Điểm dừng vòng sửa 1

**G09-B chặng 2 xong tự kiểm — chờ GPT Work nghiệm thu; chưa commit/push/deploy; chưa mở G09-C.** HEAD = origin/main = `df29a9a`.
