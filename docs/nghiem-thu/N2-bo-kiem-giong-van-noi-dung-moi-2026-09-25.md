# BIÊN BẢN GÓI N2 — BỘ KIỂM GIỌNG VĂN NỘI DUNG MỚI

**Ngày:** 25/09/2026
**Giao dịch:** TXN-20260925-166 — danh mục DHC-GD3-20260925 v1.0.0; **vòng sửa 1 (parser scalar frontmatter + mutation lại): TXN-20260925-167, cùng ngày**
**Nền Git:** HEAD = `origin/main` = `cc89468` (`cc894680fa95bd5cf4dcff7dbe675aa55e11dec9`), nhánh `main`, staged = 0, tracked sửa 0 khi bắt đầu
**Căn cứ:** `docs/KE-HOACH-HOP-NHAT-GIAI-DOAN-3-2026-09-25.md` mục N2 + Phụ lục D2 + prompt GPT Work N2 + vòng sửa 1
**Trạng thái:** đã làm xong vòng sửa 1, CHƯA stage, CHƯA commit, CHƯA push — chờ GPT Work tái nghiệm thu

> **Ghi chú vòng sửa 1 (TXN-20260925-167):** sửa hàm đọc scalar frontmatter (`trichTruong`) — nguyên nhân, cách sửa và mutation làm lại xem mục 6. Không sửa nội dung website hay tệp cấu hình nào ngoài `package.json` đã đổi từ vòng đầu.
> **Ghi chú vòng sửa 2 (TXN-20260925-169):** bỏ đúng hai biến destructuring không dùng `duong` và `lyDo` tại vòng lặp R1–R3 (dòng 154) của checker — không đụng logic. `check:types` sau sửa: 0 lỗi, 0 cảnh báo, **hint duy nhất** `ts(6133) 'k'` tại `output/playwright/audit-2026-09-25.mjs:17` (untracked có trước, ngoài phạm vi, đã phán giữ nguyên); checker trực tiếp, `npm run check`, `npm run build`, `git diff --check` đều exit 0.

---

## 1. Tệp thay đổi (1 sửa + 1 mới + biên bản)

| # | Tệp | Thay đổi |
|---|---|---|
| 1 | `scripts/check-n2-editorial-voice.mjs` (**mới, untracked của gói**) | bộ kiểm giọng văn — chi tiết mục 2; vòng sửa 1 chỉnh hàm đọc scalar — mục 6 |
| 2 | `package.json` | nối duy nhất `&& node scripts/check-n2-editorial-voice.mjs` vào **cuối** chuỗi `npm run check` (sau `check-h07-world-context`); không sửa dependency, lockfile, script khác (diff đối chiếu — chỉ đúng phần nối) |
| 3 | `docs/nghiem-thu/N2-bo-kiem-giong-van-noi-dung-moi-2026-09-25.md` | **biên bản này (mới, untracked của gói)** — tính vào thống kê tệp mới của gói cùng checker và `output/` |

Bằng chứng nội bộ: `output/n2-editorial-voice-audit/` (9 tệp log + 2 tệp hash) — không đưa vào commit.

## 2. Thiết kế checker

- **Phạm vi áp dụng** — tệp `.md` dưới `src/content/` thỏa ít nhất một: (a) frontmatter `date` hoặc `updated` từ `2026-10-01` trở đi (so chuỗi phần `YYYY-MM-DD`); (b) nằm trong `DANH_SACH_N3` — **danh sách tường minh đặt ngay đầu script, hiện rỗng**, ghi chú rõ N3 bổ sung, không tự thêm bài cũ.
- **Tách frontmatter/thân bài** trước khi kiểm: quy tắc R1–R4 chỉ xét thân bài; `sources`, `sourceNotes`, URL, link Markdown (giữ text liên kết), comment HTML và dữ liệu frontmatter không bị quét vào quy tắc thân bài.
- **R1** — heading ATX bắt đầu `Giới hạn` (bản VI) hoặc `Limits` (bản EN), bỏ ký tự nhấn Markdown trước khi so.
- **R2** — cụm cấm trong thân bài, không phân biệt hoa thường: VI `bài này không`, `trang nguồn`, `câu nguồn`, `không suy thêm`; EN `this article does not`, `the source page`, `the source sentence`. Báo kèm số lần.
- **R3** — số từ thân bài tối thiểu: `mauIconic` 1.200; `tuDien` 150; `huongDan` có tag `hieu-dung` (trường `tags`, block hoặc inline list) 600; `coChe`/`huongDan` không tag không có ngưỡng.
- **R4** — bản EN dài hơn bản VI quá 25% (`EN > VI × 1,25`) khi cặp `{ vi: '…', en: '…' }` tồn tại trong `src/i18n/contentRoutes.ts` và ít nhất một bản thuộc phạm vi. Map tiền tố route → collection: `/co-che/`↔`/en/mechanisms/`, `/tu-dien/`↔`/en/glossary/`, `/mau-iconic/`↔`/en/iconic-watches/`, `/huong-dan/`↔`/en/guides/`, `/thuong-hieu/`↔`/en/brands/`; tìm tệp theo slug cuối của route (ưu tiên `<slug>.md`, phụ quét `custom_slug`); cặp route ngoài 4 collection (trang tĩnh, lịch sử…) bỏ qua.
- **Đếm từ** dùng chung một phương pháp cho VI và EN: bỏ frontmatter, comment HTML, URL trần, phần địa chỉ của link Markdown (giữ text), ký tự Markdown trang trí; đếm cụm chứa chữ/số (Unicode property).
- **Root tạm:** biến môi trường `N2_ROOT` (mặc định cwd) — dùng cho mutation ngoài repo.
- Báo lỗi nêu mã quy tắc + tệp + số đo thực tế; lỗi → exit 1.

## 3. Kiểm trực tiếp trên repo

`node scripts/check-n2-editorial-voice.mjs` → **ĐẠT, exit 0** — "Tệp thuộc phạm vi: 0" (chưa có tệp nào date/updated ≥ 2026-10-01) và danh sách N3 rỗng. `npm run check` gọi được checker ở cuối chuỗi (log dòng "N2 checker … Tệp thuộc phạm vi: 0 … ĐẠT"); toàn chuỗi exit 0.

## 4. Mutation — bản sao ngoài repo `D:\donghoco-worktrees\n2-mut\`

Không mutation trực tiếp trong `D:\Watch web build`. Cây tạm chứa: checker, `src/i18n/contentRoutes.ts`, toàn bộ `src/content/` (308 tệp). Baseline và sau mỗi ca khôi phục đều chạy lại checker.

| Ca | Thao tác trên cây tạm | Kết quả | Khôi phục |
|---|---|---|---|
| Baseline | chạy trên cây nguyên bản | **exit 0 — ĐẠT, 0 tệp thuộc phạm vi** (`baseline.log`) | — |
| 1 — heading | tạo `tuDien/vi/n2-mut-ca1.md` (date `2026-10-01`, heading `## Giới hạn đọc hiểu`, thân 339 từ) và `tuDien/en/n2-mut-ca1-en.md` (heading `## Limits on reading`, thân 154 từ) | **exit 1** — `[R1] …vi/n2-mut-ca1.md: heading "Giới hạn đọc hiểu"` + `[R1] …en/n2-mut-ca1-en.md: heading "Limits on reading"`; R3 không báo (339/154 ≥ 150) (`ca1.log`) | xóa 2 tệp; chạy lại exit 0 (`sach-ca1.log`) |
| 2 — cụm cấm | tạo `n2-mut-ca2.md` VI (chứa "bài này không", thân đủ từ) + `n2-mut-ca2-en.md` (chứa "this article does not", "the source page") | **exit 1** — `[R2] VI: "bài này không" ×1`; `[R2] EN: "this article does not" ×1`; `[R2] EN: "the source page" ×1`; kèm `[R3] EN 25 từ < 150` (tệp EN ca cố ý viết ngắn — đúng quy tắc) (`ca2.log`) | xóa 2 tệp; chạy lại exit 0; **hash toàn cây khớp baseline** (`sach-ca2.log`) |
| 3 — thiếu số từ | tạo `n2-mut-ca3.md` VI (~20 từ, sạch) | **exit 1** — `[R3] …19 từ < ngưỡng 150 từ của tuDien` (`ca3.log`) | xóa tệp; chạy lại exit 0 (`sach-ca3.log`) |
| 4 — EN vượt 125% | thêm `updated: "2026-10-01"` vào `tuDien/vi/bien-do.md` (đưa vào phạm vi) và chèn đoạn dài vào `en/amplitude.md` | **exit 1** — `[R4] en/amplitude.md: EN 343 từ > 125% (297) của VI 237 từ — cặp /tu-dien/bien-do ↔ /en/glossary/amplitude/` (`ca4.log`); kèm `[R1]+[R2]` trên bien-do.md VI — đúng logic (bài cũ này vốn có heading "Giới hạn đọc hiểu" và câu "bài này không…" — chính là lối viết N3 sẽ viết lại) | khôi phục 2 tệp từ bản gốc repo; `sha256sum -c` OK (`hash-ca4-truoc.txt`: bien-do `21cd22f1…`, amplitude `5a08d8c5…`); chạy lại exit 0 (`sach-ca4.log`); **hash TOÀN CÂY khớp baseline byte-đối-byte** |

Dọn dẹp: cây tạm xóa sau khi hoàn tất; 11 tệp log/hash lưu `output/n2-editorial-voice-audit/` (nội bộ, không phát hành).

### Sửa trong quá trình ca 1 (minh bạch)

Lần chạy đầu ca 1, checker bỏ sót heading EN — nguyên nhân: `relPosix` đã chuẩn hóa dấu `/` nhưng vòng R1/R3 còn dò `${path.sep}en${path.sep}` (backslash trên Windows) và tách collection bằng `path.sep`. Đã sửa trong checker (dò `/en/`, tách `/`) **trước** khi các ca mutation chính thức chạy; log ca 1, 2, 3, 4 đều là kết quả của bản checker đã sửa. Bản checker trong repo và trong cây tạm là cùng một tệp (copy mỗi lần chạy).

## 5. Kiểm tổng

| Lệnh | Kết quả |
|---|---|
| `node scripts/check-n2-editorial-voice.mjs` (trực tiếp) | ĐẠT — 0 tệp thuộc phạm vi, N3 rỗng; exit 0 |
| `npm run check` | exit 0 — 226 ca ĐẠT (gồm N2 checker ở cuối chuỗi) |
| `npm run build` | exit 0 — 336 trang, 25.371 link, 0 link nội bộ hỏng |
| `node scripts/scan-chars.mjs` | OK — 436 tệp |
| `git diff --check` | exit 0 |
| `git diff package.json` | chỉ đúng phần nối checker vào cuối chuỗi `check` |
| Rà `git status` | không có tệp nội dung/schema/template/cấu hình nào ngoài phạm vi |

## 6. Vòng sửa 1 (TXN-20260925-167) — sửa parser scalar frontmatter

**Nguyên nhân lỗi:** trong bản đầu, hàm `trichTruong` viết biểu thức chính quy trong template literal với đoạn kết thúc `` `\s*$` `` — JavaScript hiểu `\s` trong chuỗi thành chữ `s` (escape không hợp lệ bị bỏ backslash), nên regex thực tế là `s*$` thay vì "khoảng trắng rồi cuối dòng". Với scalar có khoảng trắng cuối dòng, nhóm bắt giá trị còn nuốt cả dấu nháy (ví dụ đọc được `"2026-10-01"` kèm nháy), khiến việc nhận dạng ngày ISO thất bại và tệp **bị bỏ sót khỏi phạm vi kiểm**.

**Cách sửa:** hàm `trichTruong` viết lại — bắt nguyên phần sau `tên trường:` bằng `[ \t]*(.*)$` theo dòng, `trim()` hai đầu, rồi bỏ cặp nháy đơn/kép bao ngoài (nếu có) và trim lần nữa; trả `null` khi rỗng. Nhận giá trị có hoặc không có nháy, chấp nhận khoảng trắng trước/sau, trả đúng `date`/`updated` dạng ISO. Không đổi quy tắc R1–R4.

**Chứng minh trên đúng scalar của ca kiểm (3 khoảng trắng cuối dòng):**

- Parser cũ: giá trị đọc được `null` → ngày ISO `null` → **bị bỏ sót phạm vi** (lỗi).
- Parser mới: giá trị đọc được `"2026-10-01"` → vào phạm vi (đúng).
- Log: `output/n2-editorial-voice-audit/vong-sua-1/parser-fix.log`.

**Mutation làm lại** trên cây tạm mới `D:\donghoco-worktrees\n2-mut-v1\` (cấu trúc như mục 4; không mutation trong repo). Baseline: **exit 0 — ĐẠT, 0 tệp thuộc phạm vi**. Năm ca:

| Ca | Thao tác trên cây tạm | Kết quả | Khôi phục |
|---|---|---|---|
| P — phạm vi qua parser (R1) | tạo `tuDien/vi/n2-mut-p.md` với `updated: "2026-10-01"   ` (**kèm 3 khoảng trắng cuối dòng**, xác nhận bằng `cat -A`) + heading `## Giới hạn đọc hiểu` + thân 339 từ | **exit 1** — "Tệp thuộc phạm vi: 1" và `[R1] heading "Giới hạn đọc hiểu"` (`ca-phamvi.log`) — checker thực sự đưa tệp vào phạm vi và bắt đúng R1 | xóa tệp; chạy lại exit 0 (`sach-caP.log`) |
| R2 — cụm cấm thuần | tạo `n2-mut-r2.md` VI (chứa "bài này không", thân đủ ngưỡng) + `n2-mut-r2-en.md` EN (chứa "this article does not", thân đủ ngưỡng) | **exit 1** — đúng 2 lỗi `[R2]` (VI "bài này không" ×1; EN "this article does not" ×1), không kèm R3 (`caR2.log`) | xóa 2 tệp; chạy lại exit 0 (`sach-caR2.log`) |
| R3 — mục từ điển | tạo `n2-mut-ca3.md` VI ~19 từ | **exit 1** — `[R3] 19 từ < ngưỡng 150 từ của tuDien` (`caR3.log`) | xóa tệp; chạy lại exit 0 (`sach-caR3.log`) |
| R3 — huongDan tag `hieu-dung` | tạo `huongDan/vi/n2-mut-hd.md` với `tags:` block list `- hieu-dung`, date `2026-10-01`, thân 37 từ | **exit 1** — `[R3] 37 từ < ngưỡng 600 từ của huongDan (tag hieu-dung)` — đúng nhánh kiểm tag (`caR3.log`) | xóa tệp; chạy lại exit 0 (`sach-caR3.log`) |
| R4 — EN vượt 125% VI | thêm `updated: "2026-10-01"` vào `tuDien/vi/bien-do.md` + chèn 2 đoạn dài vào `en/amplitude.md` | **exit 1** — `[R4] EN 343 từ > 125% (297) của VI 237 từ — cặp /tu-dien/bien-do ↔ /en/glossary/amplitude/`; kèm `[R1]+[R2]` trên bien-do.md (bài cũ vốn có lối viết biên bản — đúng logic, xem mục 7) (`caR4.log`) | khôi phục 2 tệp từ repo; `sha256sum -c` OK (`hash-caR4-truoc.txt`: bien-do `21cd22f1…`, amplitude `5a08d8c5…`); chạy lại exit 0 (`sach-caR4.log`) |

Sau ca cuối: **hash toàn cây khớp baseline byte-đối-byte** (`find src scripts -type f | sha256sum | diff` với `hash-baseline.txt` — 310 tệp). Cây tạm xóa; 12 tệp log/hash lưu `output/n2-editorial-voice-audit/vong-sua-1/` (nội bộ, không phát hành).

**Chạy lại sau sửa:** `node scripts/check-n2-editorial-voice.mjs` (exit 0 — 0 tệp phạm vi), `node scripts/scan-chars.mjs` (OK 436 tệp), `npm run check` (exit 0 — N2 checker được gọi, 226 ca ĐẠT), `npm run build` (exit 0 — 336 trang, 25.371 link, 0 hỏng), `git diff --check` (exit 0).

## 7. Điểm cần GPT Work lưu ý

1. **Bài cũ khi lọt phạm vi sẽ fail ngay R1/R2** (chứng minh ở ca 4 với `bien-do.md`: heading "Giới hạn đọc hiểu" + "bài này không…"). Đây là hành vi đúng của thiết kế (điều kiện ngày là "hoặc" cùng danh sách N3) — các bài thuộc diện N3 bắt buộc phải được đưa vào `DANH_SACH_N3` hoặc có date/updated mới, và khi đó checker sẽ chặn cho tới khi viết lại xong.
2. `huongDan` hiện chưa có trường `tags` trong schema — checker đọc trường `tags` từ frontmatter thủ công (block/inline list); gói U1 gắn tag `hieu-dung` sẽ tự được checker nhận.
3. Ngưỡng R3 chỉ áp 3 nhóm theo prompt (`mauIconic`, `tuDien`, `huongDan` tag `hieu-dung`); `coChe` không ngưỡng.

## 8. Trạng thái Git cuối

- Nhánh `main`; HEAD = `origin/main` = `cc89468` (chưa tạo commit mới).
- `git status`: 1 modified (`package.json`), 0 staged; untracked 104 — gồm 101 có trước và **3 mục của gói N2 chưa được Git theo dõi: `scripts/check-n2-editorial-voice.mjs`, biên bản N2 (tệp này), `output/n2-editorial-voice-audit/` (nội bộ)** — thống kê tệp untracked của gói tính cả biên bản, không chỉ checker và `output/`.
- Chưa stage, chưa commit, chưa push.
