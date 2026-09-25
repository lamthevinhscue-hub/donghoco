# BIÊN BẢN P0-E — CHỐT SỔ KẾ HOẠCH SAU H01–H14 (ĐỢT 6, BÀN GIAO CÓ KIỂM CHỨNG)

**Mã gói:** P0-E — Đợt 6, giao dịch TXN-20260919-151
**Ngày thực hiện:** 25/09/2026 (+0700)
**HEAD lúc bắt đầu:** `56ca787` = `origin/main`, nhánh `main`; staged = 0; tracked sửa = 0; untracked có trước giữ nguyên (gồm mọi `output/`, hồ sơ P0-D1, tài liệu chưa theo dõi)
**Trạng thái:** hoàn thành — **chờ GPT Work nghiệm thu**; chưa stage, chưa commit, chưa push, chưa deploy
**Bản chất gói:** chỉ xác nhận trạng thái đã đạt và ghi các việc chưa làm/tạm hoãn cùng điều kiện mở lại. Danh sách tạm hoãn **không** được biến thành công việc mới.

## 1. Sáu đợt — đối chiếu Git thực tế

Mọi hash dưới đây đã được script chốt sổ xác nhận tồn tại trong `git log` (kiểm prefix trên full hash của 500 commit gần nhất):

| Đợt | Nội dung | Hash / kết quả |
|---|---|---|
| Đợt 0 | Đo lường công khai H02 | Hoàn thành trước đó; **giới hạn quyền Analytics/Search Console vẫn thuộc chủ dự án** |
| Đợt 1 | P0-A — sửa lỗi danh mục từ điển, dữ liệu, chân trang | `327c7c1` |
| Đợt 2 | P0-B — thử nghiệm sáu tiêu đề từ điển | Hoàn nguyên toàn bộ; **không phát hành** |
| Đợt 3 | H14-B — cụm nghề chế tác và chuỗi sản xuất | `16a5154` |
| Đợt 4 | P0-C — bốn ảnh AI bối cảnh timeline (đã duyệt) | `6d98f91` |
| Đợt 5 | P0-D1 hồ sơ nguồn (nội bộ) + P0-D2 viết 12 mục song ngữ | P0-D1 giữ nội bộ; P0-D2 = `56ca787` |

## 2. Số liệu đo lại từ cây nguồn và bản build hiện hành

**Phương pháp:** mọi số dưới đây do `output/p0-e-final-handover/chot-so.cjs` sinh trực tiếp từ cây nguồn và git (kết quả lưu `chot-so.json`); script **lỗi (exit 1)** nếu thiếu một hash bắt buộc, nếu sáu tiêu đề P0-B lệch, hoặc nếu số đếm lệch kỳ vọng. Build hiện hành exit 0 và **không thay đổi tệp theo dõi nào**.

| Chỉ số | Giá trị đo được |
|---|---|
| HEAD / origin/main | `56ca7877041c3897ded033ab5abdbc07ae76890a` / cùng giá trị (nhánh `main`) |
| Số mục từ điển VI | 45 |
| Số mục từ điển EN | 36 |
| Số cặp route từ điển (VI↔EN) | 35 |
| Bài H14-B | 3 cặp VI/EN (manufacture-etablisseur; ebauche VI + EN ebauche-supply-chain; eta-sellita) |
| Mốc timeline có ảnh | 32 / 32 mốc |
| Nhãn AI minh bạch (map ANH_AI) | 5 mục (trench-watch + 4 mốc H07-A) |
| P0-B | Sáu tiêu đề gốc còn nguyên trong cây nguồn (đối chiếu chuỗi chính xác từng tệp) |
| Build | exit 0; 336 trang HTML; sitemap 335 URL; 25.368 link 0 hỏng; không tệp tracked thay đổi sau build |

Ghi chú biên tập: 45 mục VI nhưng chỉ 35 cặp route VI↔EN — 10 mục VI cũ chưa có bản EN; đây là hiện trạng, không phải lỗi, và thuộc danh mục tạm hoãn "bản EN còn thiếu".

## 3. Danh mục tạm hoãn (chốt sổ)

| Mục | Trạng thái | Lý do | Điều kiện mở lại | Thẩm quyền quyết |
|---|---|---|---|---|
| Sáu đổi tiêu đề từ điển Việt | Không thực hiện | P0-B vượt ngưỡng liên kết (+79/+30 trang trên hai slug) | Anh Vinh duyệt phương án alias tay hoặc thay đổi số lượng liên kết | Anh Vinh (sau phương án GPT Work) |
| Lệch nhịp (beat error) | Chưa đủ nguồn | Chỉ có nguồn Witschi — một tổ chức, không định nghĩa | Hồ sơ nguồn mới với nguồn định nghĩa độc lập thứ hai | GPT Work nghiệm thu hồ sơ; anh Vinh duyệt viết |
| Lực không đổi (constant force) | Chưa đủ nguồn | Chỉ 1 nguồn (A. Lange & Söhne); FHH/Patek không có mục | Hồ sơ nguồn mới (đề xuất thử vacheron-constantin.com, montblanc.com, ferdinandberthoud.fr) | GPT Work nghiệm thu hồ sơ; anh Vinh duyệt viết |
| Pha trăng (moon phase) | Hoãn | Trùng mạnh bài cơ chế `/co-che/pha-trang` hiện có | Anh Vinh duyệt dạng mục ngắn dẫn bài, không lặp số liệu | Anh Vinh |
| Các mục từ điển còn lại (tiến tới mục tiêu 69) | Chưa mở | Chỉ mở từng đợt sau hồ sơ nguồn riêng | Hồ sơ nguồn đợt tiếp + phán quyết GPT Work | Anh Vinh duyệt đợt; GPT Work giao việc |
| Bản EN còn thiếu (10 mục VI cũ), ba mốc lịch sử còn thiếu, đợt ảnh AI tiếp theo, bài thứ tư/hub cụm H14 | Chưa mở | Cần gói và phán quyết riêng; không tự mở | Gói riêng được lập và anh Vinh duyệt | Anh Vinh (duyệt) + GPT Work (giao việc) |
| Ba tiêu đề bài cơ chế nêu trong đánh giá 24/09 | Chờ quyết | Cần quyết định biên tập riêng, không thuộc gói kỹ thuật | Anh Vinh quyết định biên tập | Anh Vinh |
| Search Console và Vercel Analytics | Chờ chủ dự án | Phần xác minh/tài khoản thuộc chủ dự án; GLM không truy cập, đăng ký hay suy diễn số liệu | Anh Vinh cấp quyền/tài khoản và cung cấp dữ liệu | Anh Vinh |
| Bộ lọc chữ cái cho từ điển | Chưa mở | Chỉ xem xét khi số mục vượt khoảng 80; hiện 45 mục | Số mục vượt ngưỡng ~80 và anh Vinh yêu cầu | Anh Vinh |

## 4. Giới hạn không phải lỗi (ghi nhận chốt sổ)

1. Số liệu local/build trong biên bản này **không thay thế kiểm chứng production** — nghiệm thu production chỉ có giá trị sau deploy trên miền công cộng.
2. **Không suy diễn** số liệu Analytics hoặc Search Console khi chưa có quyền tài khoản.
3. Mọi ảnh AI bổ sung phải được **anh Vinh duyệt trực quan** trước khi tích hợp (đúng quy trình P0-C/H12-A).
4. Hồ sơ nguồn là **điều kiện trước** khi xuất bản nội dung kỹ thuật mới — không có hồ sơ thì không viết.

## 5. Tệp tạo mới

- `docs/nghiem-thu/P0-E-chot-so-ke-hoach-sau-H01-H14-2026-09-25.md` — biên bản này (duy nhất tệp được phát hành).
- `output/p0-e-final-handover/chot-so.cjs`, `chot-so.json`, `build-log.log` — bằng chứng nội bộ, không commit.

Không tệp nào dưới `src/`, `public/`, `scripts/`, `package.json`, `vercel.json`, `CAN-KIEM-CHUNG.md` hoặc tài liệu kế hoạch cũ bị thay đổi. Không mở H07-B, H12-B, H14 mới hay bất kỳ gói nội dung nào khác.

Dừng chờ GPT Work nghiệm thu. Chưa stage, chưa commit, chưa push, chưa deploy.
