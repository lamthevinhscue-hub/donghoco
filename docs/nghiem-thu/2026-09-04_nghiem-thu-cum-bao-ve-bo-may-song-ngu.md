# Biên bản nghiệm thu — cụm "Bảo vệ bộ máy: chống từ, chống sốc & Incabloc" song ngữ (Prompt 37)

- **Ngày nghiệm thu:** 04/09/2026
- **Phạm vi:** chuẩn hóa nguồn 3 bài tiếng Việt (`coChe/vi/chong-tu.md`, `coChe/vi/chong-soc.md`, `tuDien/vi/incabloc.md`) và xuất bản 3 bài English mới (`coChe/en/anti-magnetism.md` → `/en/mechanisms/anti-magnetism/`, `coChe/en/shock-protection.md` → `/en/mechanisms/shock-protection/`, `tuDien/en/incabloc.md` → `/en/glossary/incabloc/`).
- **Tài liệu kèm theo:** hồ sơ nguồn `docs/ho-so-nguon-cum-bao-ve-bo-may-song-ngu.md` (nguyên văn từng nguồn + phạm vi nâng đỡ + claim đã loại).
- **Trạng thái cuối phiên:** **chưa commit, chưa push** — 14 tệp sửa/tạo chờ anh quyết định.

## 1. Tệp sửa / tạo (14)

**Sửa (8):**
1. `src/content/coChe/vi/chong-tu.md` — viết lại theo nguồn
2. `src/content/coChe/vi/chong-soc.md` — viết lại theo nguồn
3. `src/content/tuDien/vi/incabloc.md` — viết lại theo nguồn
4. `src/i18n/contentRoutes.ts` — +3 cặp
5. `scripts/check-english-launch.mjs` — REQUIRED_EN 40 → 43
6. `package.json` — script mới vào cuối `npm run check` + alias `check:protection`
7. `src/data/glossary-terms.json` — sinh lại tự động bởi `generate-glossary-terms.mjs` khi build (mục từ Incabloc theo excerpt mới)
8. `docs/LO-TRINH-PHAT-TRIEN-HIEN-TAI.md` — cập nhật lần 16 (mốc, commit nền `17693d1`, số liệu build thật, launch pack 47 cặp/43 route, hồ sơ + biên bản P37)

**Tạo (6):**
9. `src/content/coChe/en/anti-magnetism.md`
10. `src/content/coChe/en/shock-protection.md`
11. `src/content/tuDien/en/incabloc.md`
12. `scripts/check-protection-cluster.mjs`
13. `docs/ho-so-nguon-cum-bao-ve-bo-may-song-ngu.md`
14. `docs/nghiem-thu/2026-09-04_nghiem-thu-cum-bao-ve-bo-may-song-ngu.md` (biên bản này)

Không đụng `output/`, không đụng các tệp `??` cũ của docs tháng 8.

## 2. Nguồn (xác minh 04/09/2026, nguyên văn tại hồ sơ nguồn)

| Nguồn | Nâng được |
|---|---|
| METAS — trang chứng nhận MASTER CHRONOMETER | Chống từ là tiêu chí chứng nhận; 1,5 T = 15.000 gauss là tiêu chí của chứng nhận đó; mở cho mọi hãng thỏa ISO 3159 |
| Oris — trang Calibre 400 | Máy cơ có thể nhiễm từ ảnh hưởng độ chính xác; 30+ linh kiện phi từ; 2.250 gauss lệch <10 s/ngày; vượt ISO 764 (theo Oris) |
| Incabloc SA — trang sản phẩm Shock absorbers | Cơ cấu hệ Incabloc (khối đỡ, nón kép, lyre spring, hai pha); 5.000 g khi rơi ~1 m; ngưỡng phản ứng ~35 g — theo hãng |
| Incabloc SA — trang History | 1928 nghiên cứu (Fritz Marti, "movable balance jewels"), 1929 sáng chế đầu, 1931 công ty (Portescap 1963), 1933 sản xuất + thương hiệu 06/07/1933, 1938 lyre spring |
| Incabloc SA — trang Expertise | "Phần lớn máy cơ sản xuất tại Thụy Sĩ được lắp hệ này" — theo hãng, phạm vi Thụy Sĩ |
| FHH — mục bách khoa Shock absorber | Định nghĩa khái niệm; "The majority of watches today use the Incabloc® system" (trích dẫn có attribution) |
| FHH — mục bách khoa Anti-magnetic | Định nghĩa anti-magnetic |
| (Bỏ) FHH glossary tổng, Sinn TEGIMENT | Trang tổng không phải bài trực tiếp; TEGIMENT không nâng claim nào sau chuẩn hóa |

## 3. Claim đã loại (chi tiết tại hồ sơ nguồn, mục 2)

- **Chống từ:** story điện thoại qua đêm + "chạy nhanh vài chục giây = nhiễm từ"; mức 60–600 gauss; bảng 4 mức gauss kèm model; danh sách thiết bị + "tuyệt đối không đeo"; khử từ 1 phút/vài trăm nghìn VND; khuyên mua Master Chronometer/silicon; lịch sử Milgauss 1956 CERN/IWC Ingenieur; cơ chế "dây tóc dính vào nhau"; "silicon hiệu quả tới 15.000 gauss"; soft iron cage + Nivachron/Spron/Syloxi.
- **Chống sốc:** "trước thập niên 1930 chuyện không tưởng"; trục 0,1 mm; "nguyên nhân gãy phổ biến nhất"; mô tả lùi dọc/dịch ngang tự suy; "(điển hình là Incabloc)"; pare-chute Breguet/Kif/Etachoc; "tiêu chuẩn toàn ngành — gần như mọi đồng hồ"; "đồ đeo hằng ngày chịu va đập"; relation "Luminor dùng Incabloc".
- **Incabloc:** "tiêu chuẩn nhất/hầu hết đồng hồ cơ" không attribution; "chịu được vài nghìn lần trọng lực" không attribution; mốc 1934 + Portescap sai so với nguồn; Kif (Rolex, Patek)/Etachoc (ETA)/Diashock; nhận biết bằng mắt "hình chữ thập"; "đeo tennis không lo hỏng".
- Thay bằng: con số chỉ kèm attribution đúng phạm vi (calibre/chứng nhận/hệ); lịch sử Incabloc theo chính hãng (1928/1929/1931/1933/1938); hướng "không tự chẩn đoán, theo tài liệu hãng/nơi có chuyên môn".

## 4. Liên kết nội bộ hai chiều (đúng ngôn ngữ)

- vi chong-tu ↔ day-toc-banh-lac, movement, do-sai-so
- vi chong-soc ↔ chan-kinh, incabloc
- vi incabloc ↔ chong-soc, day-toc-banh-lac
- EN anti-magnetism ↔ /en/glossary/hairspring/, /en/glossary/escapement/, /en/glossary/movement/
- EN shock-protection ↔ /en/glossary/incabloc/, /en/glossary/escapement/, /en/glossary/hairspring/, /en/glossary/movement/
- EN incabloc ↔ /en/mechanisms/shock-protection/, /en/glossary/hairspring/, /en/glossary/escapement/
- Không có relatedModels EN trỏ mẫu iconic chưa có bản EN; relation vi (iwc-mark-xi, panerai-luminor) viết lại trung tính.

## 5. Kết quả lệnh nghiệm thu (kết quả thật)

1. **`node scripts/check-protection-cluster.mjs`** — ĐẠT: 3 bài EN frontmatter hợp lệ; 3 cặp route; 16 liên kết bắt buộc có và đích tồn tại; R4 sạch; R5 sạch; hồ sơ + biên bản tồn tại. *(Vòng sửa: lần chạy đầu bắt thiếu link `/en/glossary/escapement/` ở shock-protection.md — đã bổ sung mục Related reading. R4 test bằng tiêm lỗi thật: chèn `](/tu-dien/day-toc-banh-lac)` vào `tuDien/en/incabloc.md` → script bắt đúng dòng 35, exit 1 → khôi phục bằng xóa dòng tiêm → ĐẠT lại.)*
2. **`npm run check`** — ĐẠT toàn bộ (script cụm bảo vệ bộ máy chạy cuối chuỗi, in đủ 6 dòng kiểm tra + "KẾT LUẬN: ĐẠT").
3. **`npm run build`** — ĐẠT: **269 trang** (222 tiếng Việt + 47 tiếng Anh), Pagefind index 269 trang, **18.880 liên kết nội bộ**, "OK: Không phát hiện link nội bộ hỏng", check 3D + check route timeline ĐẠT.
4. **`node scripts/check-english-launch.mjs`** — ĐẠT: **đủ 43 route bắt buộc trong dist** (từ 40), 77 link nội bộ `/en/` unique đều tồn tại, **47 trang EN** đúng `lang`/canonical/hreflang/switcher, **222 trang VI giữ canonical đúng URL** (không đổi URL tiếng Việt).
5. **Sitemap (đếm từ `dist/sitemap-0.xml` sau build):** 268 URL tổng, trong đó **47 URL `/en/`**.
6. **`git diff --check`** — sạch (exit 0).
7. **`git status --short`** — 8 tệp `M` + 6 tệp mới của P37 (mục 1); các `??` cũ của docs tháng 8 giữ nguyên không đụng.

## 6. Chưa kiểm tra (giới hạn trung thực)

- Chưa nghiệm thu trên trình duyệt thật (desktop/mobile), bàn phím thật, trình đọc màn hình thật cho 3 route EN mới — bộ kiểm ở trên là kiểm tĩnh mã nguồn + HTML build.
- Chưa có dữ liệu Search Console/Analytics; cụm là nội dung theo nguồn, không cam kết hiệu quả SEO.

## 7. Xác nhận

**Chưa tự commit, chưa tự push.** Toàn bộ 14 tệp chờ anh xem và commit.
