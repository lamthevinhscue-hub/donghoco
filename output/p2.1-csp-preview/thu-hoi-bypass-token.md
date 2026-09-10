# Thu hồi bypass token — TXN-20260909-12 (09/09/2026) · ĐÍNH CHÍNH TXN-20260909-14 (10/09/2026)

> **Đính chính vòng 14** (giữ nguyên nội dung gốc bên dưới, các mục sai được sửa/kèm chú thích [ĐC14]):
> 1. Phân loại đúng: **#1 = token gốc** (vercel curl tạo cho thử nghiệm); **#2–#5 = token tạo ngoài ý muốn** (các PATCH body-rỗng của GLM); **#2–#4 đã thu hồi có xác minh**; **#1 và #5 còn chờ xác minh việc thu hồi** (chưa thu hồi được qua API).
> 2. Câu "trước 22:27 project không có bypass token nào" **sai mức chứng cứ** — chỉ có bằng chứng CLI tự sinh một token lúc 22:27:57; **chưa có kiểm kê token trước thời điểm đó → ghi: CHƯA XÁC MINH** có token từ trước hay không (nếu anh Vinh tắt tính năng trong dashboard thì mọi token hiện bị xóa, cũng không tái tạo được kiểm kê quá khứ).
> 3. Kết luận "secret CÓ được gửi tới origin Google Fonts" **bỏ** — bằng chứng preflight chỉ cho thấy TÊN header bị nêu trong yêu cầu thăm dò và bị chặn; **chưa xác định giá trị secret có tới origin ngoài hay không** (nghi vấn thấp vì request thực không được gửi sau preflight thất bại, nhưng không có bằng chứng từng request).
> 4. Câu "Token liên quan đã thu hồi" và cách nói "rủi ro còn lại thấp" **bỏ** — token #1 **còn hiệu lực** ở thời điểm chốt hồ sơ; khi secret đầy đủ còn dùng được thì **không đánh giá rủi ro là thấp**.
> 5. Trạng thái dashboard: **CHƯA có xác nhận** anh Vinh đã tắt "Protection Bypass for Automation" của `donghoco1` tại thời điểm bàn giao (10/09). Việc tắt công tắc (khi xảy ra) **không tự động coi là bằng chứng thu hồi thành công** — cần kiểm chứng riêng bằng replay secret cũ hoặc xác nhận dashboard hiển thị không còn token. [ĐÃ CẬP NHẬT — xem mục "Cập nhật TXN-20260910-04" và "Cập nhật TXN-20260910-08" bên dưới: blocker đã đóng theo phương pháp dashboard.]

## Cập nhật 10/09 sáng (+07) — sau xác nhận của anh Vinh

- **Xác nhận từ điều phối**: anh Vinh đã tắt "Protection Bypass for Automation" của `donghoco1` (giữ Vercel Authentication/SSO và các bảo vệ khác) đêm 10/09; theo anh, 2 token còn lại bị xóa theo.
- **GLM không thao tác API token nào** để kiểm chứng (đúng giới hạn): không PATCH/POST/DELETE, không `vercel curl`, không tạo token.
- **Giới hạn xác minh ghi rõ**: tệp secret cũ đã xóa an toàn + cấm tìm lại từ lịch sử chat → **không kiểm replay riêng từng secret được**.
- **Đối chứng mức project/dashboard từ phía GLM — bị chặn bởi phân quyền**: `GET /v9/projects/donghoco1` trả **403** (06:19:53 +07 10/09) dù phiên CLI còn hoạt động (`whoami` = lamthevinhscue-4860; `projects ls` OK nhưng không chứa trường protectionBypass) → **GLM không tự đọc được trạng thái dashboard**. Trạng thái dashboard dựa trên xác nhận của anh Vinh + GPT Work ở mức điều phối.
- Quan sát hành vi 06:17 +07 10/09: request không thông tin đăng nhập tới deploy 2 vẫn **302 → vercel.com/login** (SSO/Vercel Authentication còn bật) — nhất quán với "bypass đã gỡ, SSO giữ", nhưng một mình quan sát này không chứng minh token đã bị xóa.
- **Trạng thái chốt — CẬP NHẬT TXN-20260910-08: BLOCKER ĐÃ ĐÓNG.** GPT Work đã chấp nhận **ảnh dashboard anh Vinh cung cấp**: danh sách bypass secret **trống**, **Require Log In bật (Standard Protection)**, đúng project `donghoco1`. Phương pháp: xem ảnh dashboard do chủ dự án cung cấp; không truy cập dashboard trực tiếp, không replay secret cũ. Giới hạn giữ nguyên: **không replay từng secret cũ được** — xác minh dựa trên dashboard hiện hành chứ không phải kiểm chứng kỹ thuật độc lập của GLM. Lịch sử sự cố và các giới hạn trên giữ nguyên.

## Cập nhật TXN-20260910-04 (10/09)

- GPT Work **chấp thuận xác minh thay thế bằng dashboard hiện hành** (không bắt buộc replay secret đã xóa), với điều kiện: đúng project `donghoco1`; Automation Bypass đã tắt và không còn secret hoạt động theo dashboard; Vercel Authentication/SSO vẫn bật; ghi thời điểm + người kiểm tra + giới hạn không replay. **GLM không tự ghi "đã xác minh độc lập"** từ xác nhận điều phối — chờ GPT Work tự kiểm dashboard hoặc anh Vinh cung cấp ảnh dashboard không chứa secret.
- Lưu ý ghi nhận: HTTP 403 trên `GET /v9/projects/donghoco1` từ token CLI **không được dùng để suy** điều gì về quyền chủ tài khoản hay trạng thái công tắc — chỉ ghi "GLM không đọc được".

## Định danh token (trước khi thu hồi)

- Nguồn tạo: Vercel CLI 59.14.0 `vercel curl` (22:27:57 +07, log CLI "Successfully generated deployment protection bypass token for project prj_v3n9Ofk1lfr9OVuarXpgikeabdJV") và các lệnh PATCH của GLM trong vòng này (23:28–23:31 +07 — lỗi quy trình, xem mục Sự cố).
- API quản lý: `PATCH /v1/projects/{id}/protection-bypass` — metadata từng token: `scope=automation-bypass`, `createdAt`, `createdBy`, `isEnvVar`. **Không in secret hay tiền tố khi định danh**; so khớp tiền tố làm trong script, chỉ in kết quả ĐÚNG/SAI.
- [ĐC14] Trạng thái token **trước** 22:27:57 +07: **CHƯA XÁC MINH** — chỉ có bằng chứng CLI tự sinh một token tại thời điểm đó; chưa có kiểm kê token trước đó (không suy từ thông báo "generating one now").
- Tại thời điểm thu hồi project có **5 token** scope automation-bypass: **#1 token gốc** (vercel curl; khớp tiền tố vết rò rỉ — đối chiếu trong script: CÓ) + **#2–#5 token tạo ngoài ý muốn** (các PATCH body-rỗng của GLM tạo thêm — PATCH không có `revoke`/`generate` sẽ sinh secret mới — đã xác minh từ mã CLI và tài liệu REST).

## Kết quả thu hồi

| Token | Thời điểm tạo (UTC) | Kết quả | Bằng chứng |
| --- | --- | --- | --- |
| #2 (23:28:57 +07) | PATCH định danh | **ĐÃ THU HỒI** — HTTP 200 lúc 16:45:05Z | curl thường sau thu hồi: **302 → sso-api** |
| #3 (23:29:48 +07) | PATCH định danh | **ĐÃ THU HỒI** — HTTP 200 lúc 16:45:05Z | curl thường sau thu hồi: **302 → sso-api** |
| #4 (23:31:58 +07) | PATCH định danh | **ĐÃ THU HỒI** — HTTP 200 lúc 16:45:06Z | curl thường sau thu hồi: **302 → sso-api** |
| #1 (22:27:57 +07, token khớp vết rò rỉ) | vercel curl | **CHƯA THU HỒI ĐƯỢC** — HTTP 400 "One bypass must be the VERCEL_AUTOMATION_BYPASS_SECRET Environment Variable set on deployments" (cả khi thử gỡ cờ isEnvVar) | curl thường: vẫn 200 (còn hiệu lực) |
| #5 (token thứ 5 chưa lưu tệp, sinh bởi PATCH đếm 23:45) | PATCH đếm | **CHƯA THU HỒI ĐƯỢC** — cùng lỗi 400 | trong danh sách còn lại trên project |

Xác minh **không dùng `vercel curl`** (CLI có thể tự cấp token mới) mà bằng `curl` thường gắn secret cũ vào header — tệp `xac-minh-thu-hoi-token.txt`.

## Blocker cần anh Vinh / GPT Work quyết

Vercel bắt buộc khi tính năng **"Protection Bypass for Automation"** đang bật: phải còn ít nhất một token làm `VERCEL_AUTOMATION_BYPASS_SECRET`. Thu hồi nốt 2 token còn lại đòi hỏi tắt tính năng này trong **Project Settings → Deployment Protection** — là thay đổi cấu hình bảo vệ, ngoài phạm vi được giao của GLM. Do secret của cả 2 token này đã lộ vào log phiên (xem Sự cố), đề xuất **anh Vinh tắt "Protection Bypass for Automation" trong dashboard sớm** (SSO Deployment Protection cho preview vẫn giữ nguyên — không bị ảnh hưởng), sau đó 2 token tự vô hiệu.

## Sự cố bảo mật đã phát sinh (khai báo đầy đủ)

1. Lần đầu: ~6–8 ký tự đầu của token #1 lọt vào log phiên (lỗi lệnh cắt khi đọc trace curl).
2. Vòng này: khi parse response PATCH, lệnh in `Object.keys` của GLM đã in **nguyên văn 2 secret (32 ký tự mỗi secret)** vào log phiên. Sau đó GLM đã dừng in, trích secret vào tệp để dùng, và thu hồi được 3/5; 2 token còn lại chờ dashboard (blocker trên). Cả hai secret lộ đều thuộc nhóm chờ thu hồi.
3. Đã xóa tệp secret tạm sau khi dùng (không nằm trong tệp bàn giao).

## Rà phương pháp gắn header toàn cục (yêu cầu mục 1) — [ĐC14]

Có bằng chứng: trong phép thử đầu (đã sửa), header bypass được gắn **toàn cục** cho mọi request, kể cả request chéo origin tới Google Fonts — console đợt đó ghi các lỗi CORS preflight bị chặn trên request font tới `fonts.gstatic.com` nêu hành vi chặn do header tùy chỉnh (log đợt A). Kết luận sửa lại: **CHƯA XÁC ĐỊNH giá trị secret có tới origin ngoài hay không** — preflight chỉ mang TÊN header và đã bị chặn nên có cơ sở cho rằng request thực (chứa giá trị) không được gửi, nhưng không có bằng chứng từng request để khẳng định. Không in lại secret để kiểm tra thêm; token #1 (liên quan phép thử này) **còn hiệu lực, chờ xử lý dashboard** — khi secret đầy đủ còn dùng được thì không đánh giá rủi ro là thấp.
