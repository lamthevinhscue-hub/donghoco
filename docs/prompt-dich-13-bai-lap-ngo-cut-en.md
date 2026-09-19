# PROMPT GIAO GLM — DỊCH 13 BÀI LẤP NGÕ CỤT TRANG LỊCH SỬ TIẾNG ANH

**Ngày:** 19/09/2026
**Nền:** HEAD `521f5fa` *(đính chính H01: mốc tại thời điểm soạn; hiện hành `a715fd0`)*
**Cách dùng:** dán nguyên phần trong khung cho GLM, từng đợt một

> **Trạng thái tài liệu (đính chính gói H01, 19/09/2026):** danh sách 13 bài và phép đối chiếu 23 đích "Read more" đã được [Kế hoạch hợp nhất 19/09](KE-HOACH-PHAT-TRIEN-HOP-NHAT-2026-09-19.md) xác nhận đúng (mục 3.4). Văn bản này dùng làm **đầu vào chi tiết cho gói H03**, không phải lệnh thi công độc lập — giao việc theo H03-A/B/C trong [Bộ giao việc GLM 14 gói](BO-GIAO-VIEC-GLM-14-GOI-2026-09-19.md) kèm mục 3.4 và mục 5 kế hoạch hợp nhất. Vai trò từng tài liệu xem [Chỉ mục kế hoạch hiện hành](CHI-MUC-KE-HOACH-HIEN-HANH.md). Các đính chính ghi bằng nhãn "**Đính chính H01**"; phần prompt trong khung giữ nguyên, đọc kèm đính chính.

---

# VÌ SAO LÀ ĐÚNG 13 BÀI NÀY, KHÔNG PHẢI CON SỐ TRÒN

Tôi đối chiếu bằng máy giữa `src/data/timeline.json` và `ARTICLE_PAIRS` trong `src/i18n/contentRoutes.ts`.

Trang lịch sử có **23 đích "Read more"** khác nhau. Trong đó:

- **10 đích đã có bản tiếng Anh** — bấm vào là đọc được
- **13 đích chưa có** — người đọc tiếng Anh bấm vào thì không tới đâu

Đây không phải danh sách tôi chọn theo cảm tính. Đây là **đúng tập hợp các bài mà thiếu chúng thì lớp trải nghiệm tiếng Anh vừa dựng xong bị vô hiệu hóa một phần**.

## Danh sách 13 bài, theo thứ tự ưu tiên

**Đợt 1 — năm mẫu iconic của các mốc nổi tiếng nhất** (5 bài)

| # | Bài tiếng Việt | Đường dẫn EN đề xuất | Mốc lịch sử liên quan |
|---|---|---|---|
| 1 | `/mau-iconic/royal-oak` | `/en/iconic-watches/royal-oak/` | 1972 |
| 2 | `/mau-iconic/patek-nautilus` | `/en/iconic-watches/patek-nautilus/` | 1976 |
| 3 | `/mau-iconic/reverso` | `/en/iconic-watches/reverso/` | 1931 |
| 4 | `/mau-iconic/fifty-fathoms` | `/en/iconic-watches/fifty-fathoms/` | 1953 |
| 5 | `/mau-iconic/zenith-el-primero` | `/en/iconic-watches/zenith-el-primero/` | 1969 |

**Đợt 2 — hai mẫu iconic còn lại** (2 bài)

| # | Bài tiếng Việt | Đường dẫn EN đề xuất | Mốc lịch sử liên quan |
|---|---|---|---|
| 6 | `/mau-iconic/freak` | `/en/iconic-watches/freak/` | 2001 |
| 7 | `/mau-iconic/iwc-mark-xi` | `/en/iconic-watches/iwc-mark-xi/` | 1936 |

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.4):** mốc 1936 của timeline mô tả **Special Pilot's Watch**; bài `iwc-mark-xi` có năm **1948**. Bài này dùng làm đọc thêm về diễn tiến của dòng phi công, **không** gọi Mark XI là mẫu ra mắt năm 1936 — khi dịch (H03-B) làm rõ quan hệ trong nhãn hoặc ghi chú biên tập, giữ nguyên mốc lịch sử và nguồn của mốc.

**Đợt 3 — sáu hồ sơ thương hiệu** (6 bài)

| # | Bài tiếng Việt | Đường dẫn EN đề xuất | Mốc lịch sử liên quan |
|---|---|---|---|
| 8 | `/thuong-hieu/patek-philippe` | `/en/brands/patek-philippe/` | 1868 |
| 9 | `/thuong-hieu/cartier` | `/en/brands/cartier/` | 1904 |
| 10 | `/thuong-hieu/breguet` | `/en/brands/breguet/` | 1810 |
| 11 | `/thuong-hieu/blancpain` | `/en/brands/blancpain/` | 1735 |
| 12 | `/thuong-hieu/vacheron-constantin` | `/en/brands/vacheron-constantin/` | 1755 |
| 13 | `/thuong-hieu/tag-heuer` | `/en/brands/tag-heuer/` | 1963 |

**Cộng lại: 5 + 2 + 6 = 13.** Khớp đúng danh sách đo được.

*Hai chỗ đã sửa sau khi kiểm lại:*

- *Bản đầu ghi đợt 2 có ba bài và liệt kê `/mau-iconic/cartier-santos`. **Bài đó không tồn tại** — thư mục `src/content/mauIconic/vi/` chỉ có `cartier-tank.md`. Mốc 1904 trỏ tới `/thuong-hieu/cartier`, đã nằm ở đợt 3.*
- *Bản đầu đánh số tới 14 trong khi tổng là 13. Đã đánh số lại.*

---

# PROMPT DÁN CHO GLM — ĐỢT 1

> Dịch **năm bài mẫu iconic** từ tiếng Việt sang tiếng Anh. **Đây là việc dịch, không phải viết mới.** Không nghiên cứu nguồn mới, không thêm dữ kiện nào không có trong bản tiếng Việt.
>
> ---
>
> ## Danh sách năm bài
>
> | Tệp nguồn | Tệp đích | Đường dẫn EN |
> |---|---|---|
> | `src/content/mauIconic/vi/royal-oak.md` | `src/content/mauIconic/en/royal-oak.md` | `/en/iconic-watches/royal-oak/` |
> | `src/content/mauIconic/vi/patek-nautilus.md` | `src/content/mauIconic/en/patek-nautilus.md` | `/en/iconic-watches/patek-nautilus/` |
> | `src/content/mauIconic/vi/reverso.md` | `src/content/mauIconic/en/reverso.md` | `/en/iconic-watches/reverso/` |
> | `src/content/mauIconic/vi/fifty-fathoms.md` | `src/content/mauIconic/en/fifty-fathoms.md` | `/en/iconic-watches/fifty-fathoms/` |
> | `src/content/mauIconic/vi/zenith-el-primero.md` | `src/content/mauIconic/en/zenith-el-primero.md` | `/en/iconic-watches/zenith-el-primero/` |
>
> ---
>
> ## Khuôn mẫu bắt buộc
>
> Lấy `src/content/mauIconic/en/rolex-submariner.md` làm khuôn. Đọc tệp đó trước khi bắt đầu.
>
> ### Frontmatter
>
> | Trường | Xử lý |
> |---|---|
> | `title` | **Dịch.** Giữ đúng cấu trúc "Tên mẫu — mô tả ngắn" |
> | `custom_slug` | **Thêm mới**, bằng đúng slug của tệp tiếng Việt |
> | `excerpt` | **Dịch** |
> | `brand`, `year`, `references`, `movement` | **Giữ nguyên, không đổi một ký tự** |
> | `category` | **Giữ nguyên giá trị tiếng Việt** — đây là khóa phân loại, không phải chữ hiển thị. Khuôn `rolex-submariner.md` giữ `"lặn"`, làm y như vậy |
> | `power_reserve`, `water_resistance` | Dịch **đơn vị** thôi: "giờ" thành "hours", con số giữ nguyên |
> | `date` | **Giữ nguyên** ngày của bản tiếng Việt |
> | `updated` | Đặt là **`"2026-09-19"`** |

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.4):** nguyên tắc chung cho frontmatter: giữ URL nguồn, enum và mã tham chiếu; **dịch những trường thực sự là văn bản hiển thị** — không giữ máy móc nguyên một trường nếu nó chứa cả nội dung tiếng Việt cần dịch; kiểm schema và mẫu EN hiện tại của collection khi thực hiện. Riêng `updated`: đặt theo **ngày hoàn tất rà soát thực tế** của từng bài, không cố định `2026-09-19` khi triển khai muộn hơn.
> | `draft` | `false` |
> | `sources` | **Giữ nguyên toàn bộ URL.** Chỉ dịch phần `label` nếu nó là tiếng Việt; tên riêng và tên bài gốc tiếng Anh giữ nguyên |
> | `relatedModels`, `relatedMechanisms` | **Bỏ hẳn.** Không tệp EN nào hiện có hai trường này — kiểm lại `src/content/mauIconic/en/` để xác nhận |

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.4):** dòng "Bỏ hẳn" và mục "Không thêm `relatedModels` hay `relatedMechanisms` vào tệp EN" bên dưới đọc đúng là **không thêm quan hệ bài EN giả**. Việc các mẫu EN hiện chưa có hai trường này là mô tả hiện trạng, **không phải lệnh cấm lâu dài** — khi có quan hệ thật theo dữ liệu biên tập thì thêm bình thường.
>
> ### Phần thân bài
>
> Dịch toàn bộ, giữ nguyên:
>
> - Cấu trúc tiêu đề (số lượng và cấp bậc `##`, `###` phải khớp bản tiếng Việt)
> - Vị trí và số lượng danh sách gạch đầu dòng
> - Chữ in đậm ở đúng những chỗ bản tiếng Việt in đậm
>
> ---
>
> ## Bốn ràng buộc tuyệt đối
>
> ### 1. Bản tiếng Anh KHÔNG được mạnh hơn bản tiếng Việt
>
> Đây là ràng buộc quan trọng nhất của cả gói.
>
> - Chỗ nào bản tiếng Việt ghi **"theo hãng"**, bản tiếng Anh phải ghi **"according to the manufacturer"** hoặc **"per Rolex"** — **không được** dịch thành câu khẳng định trực tiếp
> - Chỗ nào bản tiếng Việt ghi **giới hạn** hoặc **điều chưa xác minh**, bản tiếng Anh phải ghi y hệt
> - Chỗ nào bản tiếng Việt dùng **"khoảng"**, **"ước"**, **"được ghi nhận"**, giữ nguyên sắc thái đó: "around", "approximately", "is recorded as"
>
> **Ví dụ sai:** bản Việt viết "theo hãng là đồng hồ lặn hiện đại đầu tiên" mà bản Anh viết "the first modern dive watch" — mất mất chữ "theo hãng", biến tuyên bố của hãng thành sự thật.
>
> **Ví dụ đúng:** "according to Blancpain, the first modern dive watch".
>
> ### 2. Không thêm dữ kiện nào
>
> Không thêm năm, không thêm tên calibre, không thêm thông số, không thêm reference. Kể cả khi biết chắc. Bản tiếng Anh có đúng bằng bản tiếng Việt, không hơn một chữ.
>
> Nếu trong lúc dịch phát hiện bản tiếng Việt có chỗ **sai hoặc nghi ngờ**: **không tự sửa.** Ghi vào `CAN-KIEM-CHUNG.md` và báo cáo, để người biên tập xử lý.
>
> ### 3. Không thêm nhận định
>
> Không thêm câu đánh giá, không thêm so sánh, không thêm lời dẫn mà bản tiếng Việt không có. Không viết theo giọng quảng cáo.
>
> ### 4. Không nhắc giá, không nhắc giữ giá, không nhắc đầu tư
>
> Nếu bản tiếng Việt có nhắc thì giữ đúng phạm vi bản tiếng Việt. Không mở rộng.
>
> ---
>
> ## Việc phải làm kèm — đăng ký năm cặp đường dẫn
>
> Mở `src/i18n/contentRoutes.ts`, tìm mảng `ARTICLE_PAIRS`, khu vực mẫu iconic (hiện có bốn dòng, quanh dòng 106 đến 109). **Thêm năm dòng:**
>
> ```
> { vi: '/mau-iconic/royal-oak', en: '/en/iconic-watches/royal-oak/' },
> { vi: '/mau-iconic/patek-nautilus', en: '/en/iconic-watches/patek-nautilus/' },
> { vi: '/mau-iconic/reverso', en: '/en/iconic-watches/reverso/' },
> { vi: '/mau-iconic/fifty-fathoms', en: '/en/iconic-watches/fifty-fathoms/' },
> { vi: '/mau-iconic/zenith-el-primero', en: '/en/iconic-watches/zenith-el-primero/' },
> ```
>
> Đây là bảng địa chỉ trung tâm — thiếu bước này thì bộ chuyển ngôn ngữ, thẻ `hreflang` và liên kết trên trang lịch sử đều không tìm ra bài mới.
>
> ---
>
> ## Việc KHÔNG được làm
>
> - Không sửa bất kỳ tệp tiếng Việt nào
> - Không sửa khuôn hiển thị (`src/components/templates/`)
> - Không đổi số liệu ghi trên trang chủ tiếng Anh — đó là việc riêng, làm sau khi đủ 13 bài
> - Không thêm `relatedModels` hay `relatedMechanisms` vào tệp EN
> - Không tạo bài EN nào ngoài năm bài trong danh sách
> - **Không `git add`, không commit, không push**
>
> ---
>
> ## NGHIỆM THU
>
> 1. Chạy `node scripts/scan-chars.mjs` — không lọt ký tự ngoài tiếng Việt và tiếng Anh
> 2. Chạy `npm run check` — qua sạch
> 3. Chạy `npm run build` — qua sạch
> 4. Mở lần lượt năm đường dẫn `/en/iconic-watches/...` trên bản xem trước — cả năm trả về 200, hiển thị đúng
> 5. Mở `/en/history/` — năm mốc 1972, 1976, 1931, 1953, 1969 đều có liên kết "Read more" **trỏ tới bài tiếng Anh**, không còn trỏ về bài tiếng Việt hay báo không có
> 6. Mở một bài EN bất kỳ trong năm bài, bấm nút chuyển sang tiếng Việt — phải tới **đúng bài tương ứng**, không về trang chủ
> 7. Làm ngược lại: mở bài tiếng Việt, bấm chuyển sang tiếng Anh — phải tới đúng bài EN
> 8. Xem mã nguồn một bài EN — thẻ `hreflang` trỏ đúng cặp
>
> ## BÁO CÁO
>
> 1. Năm tệp đã tạo, kèm số từ mỗi tệp và số từ của bản tiếng Việt tương ứng — **hai con số phải gần nhau**; chênh quá 25 phần trăm là dấu hiệu đã thêm hoặc bớt nội dung

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.4):** so sánh số từ VI–EN với ngưỡng 25% **không đáng tin để nghiệm thu**, vì cách phân tách từ khác nhau giữa hai ngôn ngữ; số từ chỉ để tham khảo. Tiêu chuẩn nghiệm thu là đối chiếu theo đoạn: luận điểm, con số, tên riêng, nguồn và mức dè dặt khớp bản tiếng Việt.
> 2. Danh sách mọi chỗ bản tiếng Việt dùng cách nói dè dặt ("theo hãng", "khoảng", "được ghi nhận") và **cách anh đã dịch từng chỗ** — đây là phần tôi sẽ soát kỹ nhất
> 3. Mọi chỗ nghi ngờ bản tiếng Việt sai, nếu có
> 4. Kết quả `npm run check` và `npm run build`
> 5. Kết quả tám mục nghiệm thu
>
> **Ràng buộc chung:** giữ nguyên đoạn khóa 7 điểm trong `docs/bo-prompt-glm-v2.md`.

> **Đính chính H01:** đoạn khóa trong `docs/bo-prompt-glm-v2.md` (gồm lệnh tự push và quy tắc slug tháng 8) **không còn là chỉ dẫn hiện hành** — bộ prompt tháng 8 không còn là lệnh thi công. Quy trình phát hành hiện hành ở mục 8 [Bộ giao việc GLM 14 gói](BO-GIAO-VIEC-GLM-14-GOI-2026-09-19.md); cơ chế route hiện hành là `src/i18n/contentRoutes.ts`.

---

# SAU KHI XONG ĐỢT 1

Tôi sẽ soát bản dịch, đặc biệt là mục 2 của báo cáo (cách xử lý các câu dè dặt). Đạt thì soạn prompt đợt 2 theo đúng khuôn này, chỉ đổi danh sách tệp.

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.4):** cách "chỉ đổi danh sách tệp" chỉ áp dụng cho **đợt 2** (cùng loại mẫu iconic). **Đợt 3 cần khuôn thương hiệu riêng** — frontmatter, cấu trúc và mẫu EN của `thuongHieu` khác `mauIconic`, không chỉ thay danh sách tệp trong khuôn mẫu iconic.

**Việc cần làm sau khi xong cả ba đợt, không làm sớm hơn:** cập nhật dòng số liệu trên trang chủ tiếng Anh. Hiện dòng đó ghi "3 brands - 4 iconic watches - 14 mechanism articles - 23 terms". Sau ba đợt sẽ thành 9 thương hiệu và 12 mẫu iconic. Để riêng thành một gói nhỏ, tránh sửa đi sửa lại ba lần.

> **Đính chính H01 (Kế hoạch hợp nhất mục 3.4):** hai điểm sửa ở đoạn trên — (1) sau ba đợt là **9 thương hiệu và 11 mẫu iconic** (4 có sẵn + 7 mới = 11; bản trước ghi nhầm 12); (2) dòng số liệu trên trang chủ **lấy tự động từ collection và lọc bản nháp theo môi trường** — không cần gói sửa số liệu thủ công, không tạo cơ chế sửa tay; chỉ kiểm con số tăng đúng sau từng đợt xuất bản.
