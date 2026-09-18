# Hồ sơ dữ liệu tiến hóa Omega Speedmaster — G08-A

Mục đích: hồ sơ nguồn cho sơ đồ tiến hóa Speedmaster (G08-B, chưa tích hợp), tái dùng khuôn `src/data/modelEvolution.ts` như hai sơ đồ Submariner và GMT-Master đã xuất bản. Nguyên tắc "thà thiếu còn hơn sai": mốc nào chưa chốt nguồn thì không vào dataset.

- **Ngày tra cứu:** 2026-09-18. **Phương thức truy cập:** WebFetch (HTTP GET có tóm tắt máy, trích nguyên văn do công cụ trả về từ nội dung trang; KHÔNG chạy JavaScript). Nền làm việc: `d5c2eed`.
- **Nguyên tắc:** chỉ dùng mốc có URL HTTPS trực tiếp và nội dung nguồn chứng minh đúng từng năm/reference/thay đổi; nguồn cấp một (Omega, Smithsonian) ưu tiên; nguồn thứ cấp (Monochrome, Hodinkee) chỉ dùng khi nguồn cấp một không đủ, ghi rõ mức.
- **Khuôn tham chiếu:** `src/data/submarinerEvolution.ts` và `src/data/rolexGmtMasterEvolution.ts` (cùng dùng nguồn thứ cấp có tên khi nguồn hãng không đủ).

---

## 1. Các mốc ĐƯỢC CHỌN (7) — nguồn từng mốc

### N1 — 1957: Chiếc Speedmaster đầu tiên (CK 2915)

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://monochrome-watches.com/a-guide-to-the-evolution-of-the-omega-speedmaster-moonwatch-reference-by-reference/` |
| Tên nguồn / mức | Monochrome (nguồn thứ cấp chuyên ngành, bài 21/04/2020, tác giả Rebecca Doulton) |
| Ngày kiểm / phương thức | 2026-09-18 / WebFetch |
| Trích nguyên văn | "The most coveted of all Speedmasters, the CK 2915 was the first reference"; "Launched in 1957 as part of the Master Trilogy, the Speedmaster was the first chronograph"; "the first chronograph of its kind to feature a tachymetre scale on the external bezel"; "the Speedmaster CK 2915 with stopwatch functionality for car racers et al."; "In production for three years from 1957-1959 with three references" |
| Chứng minh | năm 1957; reference CK 2915 là reference đầu tiên; tachymeter trên bezel ngoài; công dụng đua xe; ba reference trong 1957–1959 |
| Nguồn cấp một kèm theo | `https://www.omegawatches.com/en-us/watches/speedmaster/heritage-models/speedmaster-57/catalog` (OMEGA, kiểm 2026-09-18): "Born in 1957, this classic watch was first known for its precision, strength, and reliability." — chứng minh năm 1957 của dòng, không nêu reference |
| Giới hạn | lý do dùng nguồn thứ cấp: các trang Omega dạng bộ sưu tập không viết câu "chiếc đầu tiên" kèm reference; "Master Trilogy" là cách gọi của bài Monochrome — dataset không liệt kê tên hai mẫu kia (nguồn đã thu không nêu) |

### N2 — 1962: Omega đầu tiên lên không gian (Sigma 7)

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://www.omegawatches.com/en-us/watches/speedmaster/heritage-models/first-omega-in-space/product` |
| Tên nguồn / mức | OMEGA (trang sản phẩm chính hãng) — nguồn cấp một |
| Ngày kiểm / phương thức | 2026-09-18 / WebFetch |
| Trích nguyên văn | "The Speedmaster became the first OMEGA in space during Astronaut Walter Schirra's groundbreaking Sigma 7 mission in 1962."; chú thích mặt lưng: "engraved 'THE FIRST OMEGA IN SPACE' and the mission date 'OCTOBER 3, 1962'"; "Today's watch is based on the original CK-2998 model."; "This pivotal 9-hour, 13-minute, and 11-second flight saw Schirra orbit Earth six times" |
| Chứng minh | 1962; Sigma 7; Walter Schirra; ngày nhiệm vụ 3/10/1962; **mẫu gốc của mốc 1962 là CK-2998 — mức chứng minh TRỰC TIẾP từ trang chính hãng** |
| Giới hạn | *(Đính chính vòng sửa 1, TXN-20260918-8)* Lần xếp đầu đã ghi "gián tiếp" — SAI MỨC: câu "Today's watch is based on the original CK-2998 model." nằm ngay mục "HISTORY WAS MADE", liền sau phần kể sứ mệnh Schirra trên cùng trang — trang chính hãng xác nhận trực tiếp sứ mệnh 1962 và gọi CK-2998 là mẫu gốc. Dataset giữ reference CK 2998; câu VI/EN chỉ dùng đúng mức nguồn xác nhận (ngày nhiệm vụ + tái bản dựa trên mẫu gốc CK-2998) |

### N3 — 1965: NASA chứng nhận (1/3/1965)

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://www.omegawatches.com/chronicle/1965-nasa-tests-and-qualifies-the-speedmaster` |
| Tên nguồn / mức | OMEGA (Chronicle chính hãng) — nguồn cấp một |
| Ngày kiểm / phương thức | 2026-09-18 / WebFetch |
| Trích nguyên văn | "NASA TESTS AND QUALIFIES THE SPEEDMASTER"; "1965" + "1 March"; "OMEGA was one of four watch brands invited to submit timepieces for NASA qualification"; "Only one watch survived and was then qualified for all manned space missions and Extravehicular Activity (EVA)"; "the original Speedmaster Professional is still the only watch qualified by NASA, and other international space agencies, for Extravehicular Activity (EVA)" |
| Chứng minh | ngày 1/3/1965; bốn hãng được mời; chỉ một mẫu sống sót; chứng nhận cho mọi nhiệm vụ có người lái + EVA; cách gọi "Speedmaster Professional" cho chiếc được chứng nhận |
| Nguồn cấp một kèm theo | `https://www.omegawatches.com/en-us/watches/speedmaster/moonwatch-professional/catalog` (kiểm 2026-09-18): "Chosen by NASA in 1965 for all manned space missions" |
| Giới hạn | trang không nêu số reference (105.003) và không liệt kê chi tiết từng bài thử — dataset không dùng các chi tiết đó |

### N4 — 1968: Calibre 861 thay 321

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://monochrome-watches.com/a-guide-to-the-evolution-of-the-omega-speedmaster-moonwatch-reference-by-reference/` |
| Tên nguồn / mức | Monochrome (nguồn thứ cấp chuyên ngành) |
| Ngày kiểm / phương thức | 2026-09-18 / WebFetch |
| Trích nguyên văn | "In 1968, calibre 321 was eventually phased out and replaced with calibre 861."; "ST 145.022-68 was the first model to host the new 861 calibre." |
| Chứng minh | năm 1968 chuyển 321 → 861; mẫu đầu mang 861 là ST 145.022-68 |
| Giới hạn | chưa tìm được trang Omega chính hãng nêu năm chuyển calibre (trang Chronicle theo năm không trích được nội dung — xem mục 6); nguồn cấp một gián tiếp hiện có chỉ nói "descended from the OMEGA Calibre 321 that went to the moon" (trang Moonwatch Professional) — không nói năm |

### N5 — 1969: Đồng hồ đầu tiên trên Mặt Trăng — "Moonwatch"

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://www.omegawatches.com/chronicle/1969-the-first-journey-to-the-moon` |
| Tên nguồn / mức | OMEGA (Chronicle chính hãng) — nguồn cấp một |
| Ngày kiểm / phương thức | 2026-09-18 / WebFetch |
| Trích nguyên văn | "the first human beings walked onto the Moon at 02:56 GMT on 21 July 1969"; "After the Apollo 11 landing, the Speedmaster became forever known as \"the Moonwatch\"."; "An essential part of each astronaut's space kit was the OMEGA Speedmaster Professional."; "each with an OMEGA Speedmaster strapped to his spacesuit with a Velcro strap" |
| Chứng minh | ngày giờ 02:56 GMT 21/7/1969; tên "Moonwatch"; chiếc trong bộ đồ phi hành gia là "OMEGA Speedmaster Professional" |
| Nguồn cấp một kèm theo | (1) `https://airandspace.si.edu/collection-objects/chronograph-armstrong-apollo-11/nasm_A19731247000` (Smithsonian National Air and Space Museum — bảo tàng, kiểm 2026-09-18): "NASA issued this Omega Speedmaster chronograph to astronaut Neil Armstrong for use during the Apollo 11 mission of July 1969." — chứng minh NASA phát Speedmaster cho Armstrong dùng trong Apollo 11; trang KHÔNG nêu số reference. (2) `https://www.omegawatches.com/en-us/watches/speedmaster/moonwatch-professional/catalog`: "became the first watch worn on the moon during the Apollo 11 lunar landing in 1969" |
| Giới hạn | trang Chronicle 1969 cố ý không nêu tên Armstrong/Aldrin ("the first human beings"); số reference của các chiếc lên Mặt Trăng KHÔNG có trong các nguồn đã thu — dataset không gán số |

### N6 — 1970: Apollo 13, bấm giờ đốt động cơ 14 giây

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://www.omegawatches.com/chronicle/1970-lucky-13` |
| Tên nguồn / mức | OMEGA (Chronicle chính hãng) — nguồn cấp một |
| Ngày kiểm / phương thức | 2026-09-18 / WebFetch |
| Trích nguyên văn | "On 11 April, at 13:13 Houston time, Apollo 13 was launched, destined for the Moon."; "Using their Speedmaster watches the crew successfully timed a 14-second burn"; "manually firing an engine to correctly align the damaged craft for re-entry into the Earth's atmosphere"; "splash down to much relief on 17 April – 142 hours and 54 minutes after launch" |
| Chứng minh | phóng 11/4/1970; phi hành đoàn dùng Speedmaster bấm giờ đốt động cơ 14 giây; hạ xuống biển 17/4 — 142 giờ 54 phút sau phóng |
| Giới hạn | reference của mốc chỉ dùng **"Speedmaster"** — đúng cách gọi trực tiếp của nguồn ("Using their Speedmaster watches…"); không ghép "Speedmaster Professional" từ mốc khác vào mốc này *(thu hẹp theo TXN-20260918-8)* |

### N7 — 2021: Thế hệ Moonwatch calibre 3861 Master Chronometer

| Trường | Nội dung |
|---|---|
| URL đã kiểm | `https://www.hodinkee.com/articles/omega-speedmaster-3861-complete-buyers-guide` |
| Tên nguồn / mức | Hodinkee (nguồn thứ cấp chuyên ngành; "The Complete Buyer's Guide To The New Omega Speedmaster", James Stacey, đăng January 07, 2021) |
| Ngày kiểm / phương thức | 2026-09-18 / WebFetch |
| Trích nguyên văn | "a brand new caliber 3861 Co-Axial-equipped Speedmaster Pro"; "the caliber 1861 Speedy Pro is out and the new caliber 3861 is in"; tên chính hãng được dẫn: "Moonwatch Professional Co-Axial Master Chronometer" |
| Chứng minh | năm ra mắt thế hệ mới đầu 2021; 3861 thay 1861; tên thế hệ |
| Nguồn cấp một kèm theo | `https://www.omegawatches.com/en-us/watches/speedmaster/moonwatch-professional/catalog` (kiểm 2026-09-18): "the manual-winding OMEGA Calibre 3861, the latest Master Chronometer certified version"; "a movement descended from the OMEGA Calibre 321 that went to the moon" — chứng minh 3861 là thế hệ hiện hành và nguồn gốc 321, KHÔNG nêu năm ra mắt |
| Giới hạn | lý do dùng nguồn thứ cấp: thông cáo chính hãng có năm (Swatch Group 5/1/2021) không truy xuất được URL trực tiếp trong lượt này (mẫu URL thử 404); trang Omega hiện hành không ghi năm — nên year 2021 lấy từ Hodinkee, phần tính chất bộ máy lấy từ trang Omega |

---

## 2. Tra được nhưng BỎ QUA (có nguồn một phần, không đưa vào dataset)

| Chủ đề | Lý do bỏ qua |
|---|---|
| Ed White đeo Speedmaster trong EVA đầu tiên của Mỹ (1965), reference 105.003 | các nguồn đã thu (Chronicle 1965, Smithsonian) không nêu Ed White hay 105.003 — không bịa reference; muốn dùng phải tra nguồn riêng |
| Tên "Professional" gắn vào dòng từ 1966 | không tìm được nguồn cấp một nêu năm đặt tên — chỉ có cách gọi ở trang 1965/1969 (dùng làm tên thế hệ, không làm mốc) |
| Apollo 8 (1968) và các phiên bản kỷ niệm (Dark Side of the Moon…) | ngoài phạm vi "các thay đổi chính của dòng Moonwatch" — không phải thay đổi thiết kế/bộ máy của dòng chính |
| Chi tiết "Armstrong để đồng hồ trong tàu vì bộ hẹn giờ tàu hỏng" | có trong bài hiện có nhưng KHÔNG có trong các nguồn đã thu — đưa vào danh sách ràng buộc G08-B (mục 5), không đưa vào sơ đồ |
| Silver Snoopy (1970) | xếp vào "chưa đủ nguồn" — xem mục 3 |

## 3. Chưa đủ nguồn (không đưa, chờ nguồn bổ sung)

1. **Silver Snoopy Award 1970** — không tìm được trang NASA/Omega kiểm chứng được trong lượt này cho năm và nội dung giải thưởng.
2. **Trang nasa.gov về Speedmaster** — công cụ tìm không trả kết quả nào trong miền nasa.gov ở lượt tra 2026-09-18 (đã thử nhiều truy vấn, lọc miền); vai trò "cơ quan có thẩm quyền" hiện do Smithsonian đảm nhiệm. Nếu GPT Work có URL NASA sẵn, bổ sung hồ sơ rồi mới tăng mức chứng minh các mốc N3/N5.
3. **Các năm của thế hệ 3570.50 (1996–2014) và 310.30.42** — chưa tra nguồn; không thuộc 7 mốc đề xuất.
4. **Chi tiết từng bài thử NASA (sốc/chân không/nhiệt/độ ẩm)** — Chronicle 1965 chỉ viết chung "challenges that were intended to almost test them to destruction"; bài hiện có đang liệt kê chi tiết → ràng buộc G08-B.

## 4. Đề xuất dataset (7 mốc)

Bản dữ liệu đầy đủ từng trường (năm, reference, nhãn VI/EN, thay đổi VI/EN, ghi chú VI/EN, URL nguồn, tên nguồn) nằm ở `output/g08-speedmaster-evolution-audit/du-kien-g08-a.json` — sao nguyên văn thành `src/data/omegaSpeedmasterEvolution.ts` khi G08-B được duyệt.

- slug: `omega-speedmaster`; name: `Omega Speedmaster`; publishedLangs: `['vi','en']`.
- Hai ngôn ngữ cùng một phạm vi dữ kiện từng mốc; reference ("CK 2915", "CK 2998", "ST 145.022-68") và tên nguồn không dịch; "Speedmaster Professional" / "Moonwatch Professional" là tên thế hệ giữ nguyên văn.
- Không giá, độ hiếm, giữ giá, đầu tư, khuyến nghị mua, bảng thắng-thua; không dùng hình AI phân biệt reference.
- Ghi chú từng mốc KHÔNG chứa dữ kiện ngoài các trích dẫn ở mục 1 (script kiểm máy đối chiếu `hoSoId` + `sourceUrl` với hồ sơ này).

## 5. Ràng buộc cho G08-B từ rà bài hiện có (KHÔNG sửa trong G08-A)

Đối chiếu bài `src/content/mauIconic/vi/omega-speedmaster.md` + bản EN với các nguồn mục 1 — các câu sau cần thu hẹp/bổ sung nguồn KHI MỞ G08-B (hoặc gói riêng); chặng này không sửa:

| Câu hiện có (VI/EN) | Vấn đề theo nguồn đã thu |
|---|---|
| Excerpt: "Đồng hồ chuyên nghiệp duy nhất từng lên Mặt Trăng" / "The only professional watch ever worn on the Moon" | nguồn nói "first watch worn on the moon" — "duy nhất từng" (only ever) không có trong nguồn đã thu; "duy nhất" chỉ có ở mức chứng nhận EVA ("still the only watch qualified by NASA… for EVA") |
| "NASA đã bí mật mua nhiều mẫu đồng hồ…" / "quietly bought watches" | nguồn nói Omega "one of four watch brands invited to submit" — không có "bí mật/mua"; cần thu hẹp theo cách nói nguồn |
| Liệt kê bài thử "sốc, chân không, nhiệt độ cực đoan, độ ẩm" / "shocks, vacuum, extreme temperatures, humidity" | nguồn chỉ viết chung "challenges that were intended to almost test them to destruction" — danh sách cụ thể chưa có nguồn |
| "105.012 / 145.012 (1964–1969) — chính các thế hệ này đã lên Mặt Trăng" | không nguồn nào đã thu nêu các số reference này; Smithsonian không nêu reference — cần nguồn hoặc bỏ số |
| "CK2915 (1957) — thế hệ đầu tiên, cực hiếm và được sưu tầm mạnh" / "rare and eagerly collected" | "cực hiếm" thuộc nhóm cấm (độ hiếm); "được sưu tầm mạnh" nếu giữ thì hạ về mức trích Monochrome "The most coveted of all Speedmasters" kèm tên nguồn |
| "3570.50 (1996–2014)" | hai năm chưa có nguồn (mục 3.3) |
| "(Neil Armstrong đã để đồng hồ lại tàu vì bộ hẹn giờ của tàu bị hỏng)" / "(…after the lander's onboard timer had failed)" | chi tiết không có trong nguồn đã thu — cần nguồn hoặc bỏ |
| "trong môi trường không trọng lực, rotor của automatic không hoạt động" | quan hệ nhân quả không có trong nguồn đã thu — cần nguồn hoặc bỏ |
| Frontmatter `year: 1957`, `movement: "Calibre 3861"` | khớp nguồn (N1, N7) — giữ |

Ngoài danh sách trên, các câu khác của bài (thiết kế mặt số/bezel tachymeter, bộ thoát Co-Axial của 3861…) khớp hoặc không thuộc phạm vi sơ đồ — không rà tiếp để tránh biến thành audit toàn bộ Omega.

## 6. Giới hạn chung của lượt tra cứu

- WebFetch KHÔNG chạy JavaScript: các trang Omega dạng `/chronicle/chapters`, `/chronicle/1951`, `/chronicle/2001`, `/chronicle` trả về khung rỗng — chỉ ba bài Chronicle bài viết riêng (1965, 1969, 1970) và các trang sản phẩm/catalog render tĩnh được trích nguyên văn.
- Máy tìm không trả URL trực tiếp cho: thông cáo Swatch Group 5/1/2021 (mẫu URL thử trả 404), bài Hodinkee "Introducing…" 5/1/2021 (slug không đúng) — bài buyer's guide 7/1/2021 truy xuất được thay thế.
- Mọi truy cập là đọc công khai; không có dữ kiện nhạy cảm trong gói.
