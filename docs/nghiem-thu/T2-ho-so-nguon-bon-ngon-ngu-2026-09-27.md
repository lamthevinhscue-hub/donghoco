# Biên bản T2 — Hồ sơ nguồn tên gọi bốn thứ tiếng, 20 mục

- Giao dịch: TXN-20260926-280 (danh mục DHC-GD3-20260925 v1.0.0)
- Ngày thực hiện: 27/09/2026
- Nền đầu phiên: HEAD = origin/main = `3b6a70e1869eac3517c9fd32f69ac07999f21d19` (`docs(history): add L1 historical source dossier`), staged = 0, tracked sửa 0
- Gói chỉ tạo hồ sơ nguồn + bằng chứng nội bộ ngoài đường build — **không chạy `npm run check`/build** vì không đụng `src/`, `public/`, `scripts/`, `package.json` hay tệp nào nằm trong chuỗi build; kiểm thay thế: script tự kiểm + `scan-chars` + hai diff check

## 1. Tệp tạo

| Tệp | Nội dung |
| --- | --- |
| `docs/ho-so-nguon-T2-bon-ngon-ngu-20-muc-2026-09-27.md` | Hồ sơ nguồn: bảng tên gọi 20 mục + bảng bằng chứng 40 dòng (20 FR + 20 DE) + giới hạn |
| `docs/nghiem-thu/T2-ho-so-nguon-bon-ngon-ngu-2026-09-27.md` | Biên bản này |
| `output/t2-multilingual-glossary-audit/kiem-t2.mjs` | Script tự kiểm (7 nhóm) |
| `output/t2-multilingual-glossary-audit/kiem-t2.log.txt` | Log chạy tự kiểm |
| `output/t2-multilingual-glossary-audit/kiem-t2-mutation.log.txt` | Log 5 ca mutation trên bản sao tạm |
| `output/t2-multilingual-glossary-audit/mutation-t2.mjs` | Kịch bản mutation |

Không đụng: mọi tệp `src/` (kể cả dữ liệu từ điển, i18n, template), `public/`, `scripts/`, `package.json`, cấu hình, CSS. Vòng này KHÔNG tạo `term_fr`/`term_de` trong frontmatter.

## 2. Kết quả thu nguồn

**Vòng sửa chuẩn nguồn Đức (TXN-20260926-282):** ba mục DE từng dựa trên Watch-Wiki (wiki chỉnh sửa cộng đồng — không đạt chuẩn nguồn) đã xử lý: `incabloc/de` thay bằng trang chính hãng gốc **Incabloc SA** (incabloc.ch — nguyên văn: "Incabloc SA est le leader incontesté sur le marché des amortisseurs de chocs depuis près d'un siècle."); `cotes-de-geneve/de` (Genfer Streifen) và `guilloche/de` (Guillochierung) **KHÔNG tìm được trang chính hãng/bảo tàng đạt chuẩn** (các hãng Glashütte không phủ hai tên này dưới dạng tiếng Đức; Beyer không truy cập được DNS trong lượt) → hạ **CHƯA ĐỦ NGUỒN**, tên đề xuất giữ để tham khảo, không đưa vào vòng sau sửa frontmatter. Kết quả DE: **18/20 SẴN SÀNG, 2/20 CHƯA ĐỦ NGUỒN**.

- **term_fr 20/20 SẴN SÀNG** — toàn bộ từ FHH bản tiếng Pháp (hautehorlogerie.org, mục encyclopedia/glossaire tiếng Pháp). Ghi chú kỹ thuật: glossaire cũ `/fr/encyclopaedia/glossaire-de-lhorlogerie/` đã redirect về `/en`; cấu trúc mới `/fr/watches-and-culture/glossaire` nạp JSON cùng domain
- **term_de 18/20 SẴN SÀNG, 2/20 CHƯA ĐỦ NGUỒN** — 18 mục từ trang chính hãng Đức (NOMOS Glashütte ×4, A. Lange & Söhne ×10 — trong đó 1 từ trang báo chí chính thức press.alange-soehne.com, Glashütte Original ×3) và Incabloc SA (incabloc.ch — trang chính hãng gốc cho tên riêng Incabloc); **2 mục CHƯA ĐỦ NGUỒN: cotes-de-geneve/de (Genfer Streifen) và guilloche/de (Guillochierung)** — nguồn Watch-Wiki bị loại hoàn toàn theo TXN-282 (wiki chỉnh sửa cộng đồng, không đạt chuẩn nguồn)
- Không dùng Wikipedia, diễn đàn, cửa hàng, snippet tìm kiếm; không tự dịch; không suy từ tiếng Anh

## 3. Giới hạn và ghi chú quan trọng

- `cotes-de-geneve` (fr): tên mục FHH nguyên văn "Côtes ou vagues de Genève" — `term_fr` đề xuất theo tên mục, kèm biến thể
- `day-cot` (fr): FHH không có mục riêng "Ressort moteur" — tên xác nhận qua định nghĩa mục Barillet ("contient le ressort moteur")
- `flyback` (fr): tên mục FHH "Fly-back ou retour en vol"; trích phụ: 1936 Longines breveter "flyback" trên montre-bracelet
- `gmt` (de): các trang hãng Đức dùng dạng tách "zweite Zeitzone" — từ ghép "Zweitzeitzone" KHÔNG có trong nguồn đã kiểm; (fr) FHH giữ nguyên "GMT"
- `guilloche` (fr): FHH dùng danh từ "guillochage" và động từ "guillocher" — không có mục "guilloché"
- `incabloc`: tên riêng thương mại — giữ nguyên dạng (FHH ghi "Incabloc®"); nguồn `incabloc/de` là trang chính hãng Incabloc SA (incabloc.ch) — chỉ chứng minh tên riêng giữ nguyên dạng, KHÔNG phải chứng cứ về một bản dịch tiếng Đức
- `minute-repeater` (fr): tên mục glossaire "Répétition minute" (số ít); trang cùng nguồn dùng "Répétiteur minute"
- `perpetual-calendar` (fr): tên mục "Quantième Perpétuel"; title trang "Calendrier Perpétuel" — cả hai của FHH
- `chan-kinh` (de): nguồn xác nhận dạng "Rubine"; dạng "Steine" không xuất hiện trên trang hãng đã kiểm
- `movement` (fr): trích gốc FHH có lỗi chính tả "lers" [sic] — trích hồ sơ cắt trước đoạn đó
- Ô trích chứa ký tự `|` (hàng minute-repeater/fr) đã escape chuẩn bảng Markdown thành `\|`; script unescape trước khi đếm từ

## 4. Đối chiếu với bài hiện có

Title VI và term_en trong bảng tên gọi chép nguyên từ `src/data/glossary-terms.json` và frontmatter `src/content/tuDien/vi/<slug>.md` — 20/20 khớp, không đổi title, `term_en`, alias, category, URL hay nội dung.

## 5. Tự kiểm và mutation

| Kiểm | Kết quả |
| --- | --- |
| `node output/t2-multilingual-glossary-audit/kiem-t2.mjs` | exit 0 — **T2-1..T2-7 (7 nhóm) ĐẠT** (log `kiem-t2.log.txt`): T2-6 suy tổng kết từ từng dòng chứng cứ (không hard-code), T2-2 chặn miền wiki cộng đồng bị loại |
| Mutation vòng sửa | **5/5 FAIL đúng** — M1 xóa URL tên SẴN SÀNG; M2 lệch tổng kết; M3 HTTP; **M-J2 đổi mục DE CHƯA ĐỦ NGUỒN thành SẴN SÀNG không chứng cứ; M-K chèn lại URL Watch-Wiki** (log `kiem-t2-mutation.log.txt`) |
| `node scripts/scan-chars.mjs` | OK |
| `git diff --check` + `git diff --cached --check` | sạch |

Mutation trên bản sao tạm `%TEMP%\t2-sandbox-*` (log `kiem-t2-mutation.log.txt`): **5 ca, mỗi ca FAIL đúng**, hoàn nguyên byte-đối-byte, chạy sạch cuối exit 0 — M1 xóa URL của một tên SẴN SÀNG; M2 làm sai trạng thái tổng kết; M3 thay HTTPS thành HTTP; **M-J2** đổi mục DE CHƯA ĐỦ NGUỒN thành SẴN SÀNG khi không có chứng cứ; **M-K** chèn lại URL Watch-Wiki vào mục DE SẴN SÀNG.

## 6. Trạng thái Git cuối phiên

- HEAD = origin/main = `3b6a70e1869eac3517c9fd32f69ac07999f21d19` — chưa commit, chưa push, staged = 0
- Tracked sửa 0; tệp mới: 2 tệp docs (trên) + `output/t2-multilingual-glossary-audit/` (nội bộ)
- Untracked có trước giữ nguyên

Điểm chưa giải quyết: không có.
