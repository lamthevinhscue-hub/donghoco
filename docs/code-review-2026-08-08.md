# CODE REVIEW — DỰ ÁN "ĐỒNG HỒ CƠ"

**Ngày review:** 08/08/2026
**Người review:** Senior Software Engineer
**Phạm vi:** Toàn bộ `src/`, `scripts/`, `astro.config.mjs`, `vercel.json` — **67 file, 12.838 dòng mã**
**Đối chiếu:** OWASP Top 10, OWASP Secure Headers Project, Clean Code, kiến trúc web tĩnh hiện đại

---

## TÓM TẮT ĐIỀU HÀNH

Đây là một **static site generator project** dựng bằng Astro, xuất ra HTML tĩnh hoàn toàn, **không có backend, không có cơ sở dữ liệu, không có xác thực người dùng**. Đặc điểm kiến trúc này **loại bỏ ngay từ đầu phần lớn nhóm rủi ro OWASP Top 10** — không có SQL Injection, không có Broken Access Control, không có Server-Side Request Forgery, vì không có server xử lý yêu cầu.

Phần còn lại tập trung vào ba nhóm: **HTTP security headers**, **DOM-based XSS**, và **chất lượng mã**.

| Nhóm | Số phát hiện |
|---|---|
| **Lỗi nghiêm trọng — bắt buộc sửa trước khi merge** | **3** |
| **Đề xuất cải thiện — nên cân nhắc** | **7** |
| **Thực hành tốt — giữ nguyên** | **6** |

**Đánh giá tổng thể:** chất lượng trên mức trung bình cho một dự án cá nhân. Không có lỗ hổng nào cho phép chiếm quyền hay rò rỉ dữ liệu. Ba lỗi nghiêm trọng đều thuộc loại **cấu hình thiếu** và **mẫu mã không an toàn**, sửa nhanh, không cần tái kiến trúc.

---

# NHÓM 1 — LỖI NGHIÊM TRỌNG (bắt buộc sửa trước khi merge)

## 🔴 CRIT-01 — Thiếu toàn bộ HTTP Security Headers

**File:** `vercel.json` — toàn file
**Phân loại OWASP:** A05:2021 Security Misconfiguration

### Bản chất vấn đề

`vercel.json` hiện chỉ có `redirects`, **không khai báo một security header nào**. Trang đang phục vụ mà không có:

| Header thiếu | Hậu quả |
|---|---|
| `Content-Security-Policy` | Không có lớp phòng thủ nào nếu một script lạ lọt vào DOM |
| `X-Content-Type-Options: nosniff` | Trình duyệt có thể đoán sai kiểu nội dung, mở đường cho MIME confusion |
| `Referrer-Policy` | Địa chỉ trang đầy đủ bị gửi sang site bên thứ ba khi người dùng bấm link ra ngoài |
| `Strict-Transport-Security` | Không ép HTTPS ở lần truy cập sau, để hở khoảng trống cho tấn công hạ cấp giao thức |
| `X-Frame-Options` hoặc `frame-ancestors` | Trang có thể bị nhúng trong iframe của site khác — nền cho clickjacking |
| `Permissions-Policy` | Không giới hạn quyền truy cập camera, micro, định vị |

Đây là nhóm phát hiện **đứng đầu mọi bản quét bảo mật tự động**. Với một trang công khai chuẩn bị công bố, đây là thứ đầu tiên người ta kiểm.

### Phương án khắc phục

Bổ sung khối `headers` vào `vercel.json`. Đề xuất cấu hình khởi điểm:

```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
      { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
      { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
      { "key": "Content-Security-Policy", "value": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; connect-src 'self' https://formspree.io https://va.vercel-scripts.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://formspree.io" }
    ]
  }
]
```

### ⚠️ Cảnh báo triển khai — đọc kỹ trước khi áp

CSP ở trên **sẽ làm hỏng chức năng tìm kiếm** nếu áp nguyên trạng, vì lý do trình bày ở CRIT-02. **Phải sửa CRIT-02 trước, hoặc tạm thêm `'unsafe-eval'` vào `script-src`** — nhưng thêm `unsafe-eval` làm giảm đáng kể giá trị của CSP, nên hướng đúng là sửa CRIT-02.

Ngoài ra, đề nghị **triển khai CSP theo hai bước**: bật `Content-Security-Policy-Report-Only` trước, theo dõi báo cáo vi phạm vài ngày, rồi mới chuyển sang chế độ chặn thật. Bật thẳng rất dễ làm vỡ tính năng mà không ai biết.

---

## 🔴 CRIT-02 — Dùng `new Function` để né bundler, phá vỡ CSP

**File:** `src/components/SearchBox.astro` — **dòng 94**

```ts
const dynamicImport = new Function('url', 'return import(url)') as (url: string) => Promise<any>;
```

**Phân loại OWASP:** A03:2021 Injection (mẫu mã nguy hiểm), A05:2021 Security Misconfiguration

### Bản chất vấn đề

Đoạn này tạo hàm từ chuỗi lúc chạy — tương đương `eval`. Chú thích trong mã nói rõ mục đích: né việc Vite cố phân giải đường dẫn lúc build.

Hai vấn đề:

1. **Không thể áp CSP nghiêm túc.** Bất kỳ CSP nào không có `'unsafe-eval'` sẽ chặn `new Function`, làm chết chức năng tìm kiếm. Nghĩa là dòng này **trực tiếp ngăn CRIT-01 được khắc phục đúng cách**.
2. **Đây là mẫu mã bị mọi công cụ quét gắn cờ.** Dù ở đây tham số là hằng số do lập trình viên viết ra, không phải đầu vào người dùng, nên **không khai thác được trên thực tế** — nhưng nó tạo tiền lệ nguy hiểm trong codebase.

### Phương án khắc phục

Astro và Vite có cách chính thức để bỏ qua phân giải lúc build:

```ts
const mod = await import(/* @vite-ignore */ '/pagefind/pagefind-ui.js');
```

Chỉ thị `@vite-ignore` báo cho bundler để nguyên đường dẫn, đúng mục đích mà `new Function` đang phục vụ, nhưng **không dùng tới eval**. Sau khi đổi, CSP không cần `'unsafe-eval'`.

Nếu vì lý do nào đó cách trên không chạy, phương án hai là khai `/pagefind/pagefind-ui.js` vào `vite.build.rollupOptions.external` trong `astro.config.mjs`.

---

## 🔴 CRIT-03 — Newsletter gửi dữ liệu tới endpoint không tồn tại

**File:** `src/components/Footer.astro` — **dòng 61**

```html
<form id="newsletter-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Phân loại:** Lỗi chức năng nghiêm trọng, kèm rủi ro quyền riêng tư

### Bản chất vấn đề

`YOUR_FORM_ID` là **placeholder chưa thay**. Hệ quả:

1. **Người đọc nhập email và bấm gửi sẽ nhận lỗi**, hoặc bị chuyển tới trang lỗi của Formspree. Trải nghiệm hỏng hoàn toàn.
2. **Nghiêm trọng hơn về quyền riêng tư:** địa chỉ email của người đọc **vẫn được gửi đi** trong yêu cầu POST tới máy chủ Formspree, dù không có form nào nhận. Đây là việc thu thập dữ liệu cá nhân mà không có nơi lưu trữ hợp lệ và không có thông báo cho người dùng.
3. Chú thích ngay trong mã đã thừa nhận: *"Cho đến khi thay, form vẫn hoạt động nhưng không lưu email đi đâu."*

### Phương án khắc phục

**Chọn một trong hai, không được để nguyên trạng:**

- **Phương án A — nếu chưa sẵn sàng:** vô hiệu hóa form. Thay bằng một dòng chữ "Tính năng đang hoàn thiện", hoặc ẩn hẳn khối. **Không để form thu thập email khi chưa có nơi nhận.**
- **Phương án B — nếu triển khai luôn:** thay `YOUR_FORM_ID` bằng ID thật, **đưa vào biến môi trường** thay vì viết cứng, bổ sung xử lý phản hồi bằng JavaScript để hiện thông báo thành công ngay trên trang thay vì chuyển hướng, và **thêm liên kết tới trang chính sách quyền riêng tư** cạnh nút gửi.

Khuyến nghị: **Phương án A** cho tới khi anh thực sự cần bản tin.

---

# NHÓM 2 — ĐỀ XUẤT CẢI THIỆN

## 🟡 IMP-01 — Ghép chuỗi HTML thay vì tạo phần tử DOM

**File:** `src/components/SearchBox.astro` — **dòng 145 tới 153**

```ts
resultsContainer.innerHTML = rendered.map((r: any) => {
  const excerpt = r.excerpt || (r.meta?.excerpt || '');
  return `<a href="${r.url}" class="search-result block">
      <div class="search-result-title">${r.meta?.title || r.url}</div>
      <div class="search-result-excerpt">${excerpt}</div>
    </a>`;
}).join('');
```

### Phân tích chính xác về mức rủi ro

Tôi đã truy nguồn dữ liệu và **kết luận: hiện tại KHÔNG khai thác được.** Lý do:

- `r.url`, `r.meta.title`, `r.excerpt` đều đến từ **chỉ mục Pagefind sinh lúc build** từ chính nội dung của trang.
- Nội dung trang là các file Markdown do tác giả kiểm soát, **không có nội dung do người dùng gửi lên**.
- Từ khóa người dùng gõ **không được nội suy thẳng** vào chuỗi này.

Vì vậy tôi **không xếp đây là lỗi nghiêm trọng**, khác với kết luận mà một công cụ quét tự động sẽ đưa ra.

### Vì sao vẫn nên sửa

Đây là **lỗ hổng tiềm ẩn theo thiết kế**. Rủi ro hiện thực hóa ngay khi một trong ba điều sau xảy ra:

1. Có bài viết nào chứa dấu nháy kép hoặc thẻ HTML trong `title` — sẽ phá vỡ thuộc tính `href` và có thể chèn thuộc tính lạ.
2. Sau này thêm bình luận, đóng góp nội dung, hay bất kỳ dữ liệu nào từ bên ngoài.
3. Chỉ mục Pagefind bị thay thế bằng nguồn tìm kiếm khác.

### Phương án khắc phục

Chuyển sang tạo phần tử DOM và gán qua `textContent`:

```ts
resultsContainer.replaceChildren(
  ...rendered.map((r: any) => {
    const a = document.createElement('a');
    a.href = r.url;                          // trình duyệt tự xử lý an toàn
    a.className = 'search-result block';
    const t = document.createElement('div');
    t.className = 'search-result-title';
    t.textContent = r.meta?.title || r.url;  // không diễn giải HTML
    a.append(t);
    // excerpt của Pagefind CÓ chứa thẻ <mark> hợp lệ, cần giữ:
    const e = document.createElement('div');
    e.className = 'search-result-excerpt';
    e.innerHTML = sanitizeMarkOnly(r.excerpt ?? '');
    a.append(e);
    return a;
  })
);
```

**Lưu ý quan trọng:** `excerpt` của Pagefind **cố ý chứa thẻ `<mark>`** để tô đậm từ khóa. Không được `textContent` thẳng, sẽ mất tính năng. Viết một hàm lọc nhỏ chỉ cho phép đúng thẻ `<mark>`, loại mọi thẻ khác.

## 🟡 IMP-02 — Nội suy chuỗi vào `innerHTML` ở trang so sánh

**File:** `src/pages/so-sanh.astro` — **dòng 146, 147, 167, 168**

Cùng loại với IMP-01. **Điểm khác biệt đáng ghi nhận:** dữ liệu ở đây đã được **kiểm tra bằng danh sách cho phép** ở dòng 115 (xem BEST-02), nên an toàn hơn hẳn. Vẫn nên chuyển sang `textContent` cho nhất quán và để phòng về sau.

## 🟡 IMP-03 — Tải cùng một collection nhiều lần trong một trang

**File:** `src/pages/thuong-hieu/[slug].astro` — **dòng 20, 32, 50**

```ts
const entries = await getEntriesByLang('thuongHieu', lang);   // dòng 20, trong getStaticPaths
const entries = await getEntriesByLang('thuongHieu', lang);   // dòng 32, lặp lại
const iconicEntries = await getEntriesByLang('mauIconic', lang); // dòng 50
```

**Phân tích độ phức tạp:** với `B` thương hiệu và `I` mẫu iconic, mẫu hiện tại là **O(B × (B + I))** — mỗi trang duyệt lại toàn bộ hai collection. Với 26 và 26 thì tổng khoảng 1.352 phép duyệt, **không đáng kể**, và vì là dựng tĩnh nên người dùng không chịu chi phí này.

**Không phải lỗi hiệu năng thực tế.** Nhưng là mẫu mã sẽ thành vấn đề nếu danh mục lên hàng trăm mục.

**Đề xuất:** thêm một lớp cache trong `src/lib/content.ts`:

```ts
const cache = new Map<string, CollectionEntry<any>[]>();
export async function getEntriesByLang(collection, lang) {
  const key = `${collection}:${lang}`;
  if (cache.has(key)) return cache.get(key)!;
  // ... logic hiện tại
  cache.set(key, filtered);
  return filtered;
}
```

Sửa một chỗ, mọi trang hưởng lợi. Đây là cải thiện **thời gian build**, không phải thời gian tải trang.

## 🟡 IMP-04 — Vi phạm Single Responsibility ở component lớn

**File:** `src/components/WatchExplodedView.astro` — **594 dòng**, cùng nhóm `WaterResistance.astro` (500), `GearTrain.astro` (448), `AntiMagnetic.astro` (436)

Mỗi file gộp bốn trách nhiệm: **dữ liệu bộ phận**, **hình vẽ SVG**, **định kiểu CSS**, **logic tương tác**. `WatchExplodedView.astro` có 13 hàm và một khối `<script>` bắt đầu từ dòng 436.

**Đây là điểm yếu lớn nhất về khả năng bảo trì của codebase.** File 594 dòng gộp bốn mối quan tâm là loại file mà sáu tháng sau không ai dám sửa.

**Đề xuất tách:**

```
src/components/anatomy/
  ├── parts.data.ts        ← dữ liệu 12 bộ phận, tách khỏi trình bày
  ├── AnatomySvg.astro     ← chỉ hình vẽ
  └── anatomy.client.ts    ← chỉ logic tương tác
```

Mức ưu tiên **thấp** — mã đang chạy đúng, đây là nợ kỹ thuật chứ không phải lỗi. Nhưng nên làm trước khi thêm tính năng vào nhóm file này.

## 🟡 IMP-05 — Lặp chuỗi class Tailwind

**Phát hiện:** 5 chuỗi class dài trên 120 ký tự lặp lại từ 4 tới 5 lần trong codebase.

Vi phạm nguyên tắc DRY. Sửa một chỗ thì bốn chỗ kia vẫn sai — đúng loại lỗi khó phát hiện nhất.

**Đề xuất:** trích thành `@apply` trong `global.css`, hoặc tách thành component nhỏ dùng lại.

## 🟡 IMP-06 — Class dark mode bị nhân đôi

**Phát hiện:** **77 chỗ** có `dark:text-dark-text dark:text-dark-text` lặp hai lần liền nhau, và 3 chỗ tương tự với `dark:hover:text-dark-brass`.

Ví dụ tại `src/pages/so-sanh.astro` dòng 167:

```html
<span class="font-serif text-base text-navy dark:text-dark-text dark:text-dark-text">
```

Không gây lỗi hiển thị — CSS bỏ qua bản trùng — nhưng là **dấu vết của thao tác tìm và thay thế tự động không kiểm lại**, làm phình HTML và gây nghi ngờ về độ cẩn thận của phần còn lại.

**Đề xuất:** chạy một lượt tìm thay bỏ trùng, **kiểm lại bằng mắt** thay vì thay thế mù.

## 🟡 IMP-07 — `catch` nuốt lỗi im lặng

**File:** `src/components/SearchBox.astro` — **dòng 103 tới 112**

Khối `try` lồng `try`, và nhánh trong cùng chỉ `console.warn`. Nếu Pagefind không tải được, người dùng thấy "Tìm kiếm chưa sẵn sàng" mà **lập trình viên không có cách nào biết chuyện này xảy ra bao nhiêu lần trên máy người thật**.

**Đề xuất:** ghi nhận sự kiện lỗi này qua Vercel Analytics đã tích hợp sẵn. Nếu tìm kiếm hỏng trên một nhóm trình duyệt nào đó, anh cần biết.

---

# NHÓM 3 — THỰC HÀNH TỐT (giữ nguyên)

## ✅ BEST-01 — Kiến trúc tĩnh loại bỏ phần lớn bề mặt tấn công

Chọn Astro với đầu ra tĩnh hoàn toàn là **quyết định kiến trúc đúng** cho loại nội dung này. Không server, không cơ sở dữ liệu, không phiên đăng nhập, không tải lên tệp — nghĩa là **không có bề mặt tấn công cho phần lớn OWASP Top 10**. Rất nhiều dự án tương tự chọn nền tảng động không cần thiết rồi phải gánh cả núi rủi ro đi kèm.

## ✅ BEST-02 — Kiểm tra đầu vào URL bằng danh sách cho phép

**File:** `src/pages/so-sanh.astro` — **dòng 115**

```ts
selected = m.split(',')
  .filter((s) => modelsData.find((md) => md.slug === s))   // ← chỉ nhận slug có thật
  .slice(0, MAX);                                          // ← chặn trần số lượng
```

**Đây là đoạn mã bảo mật tốt nhất trong toàn bộ dự án.** Nó làm đúng ba việc:

1. **Danh sách cho phép, không phải danh sách chặn** — chỉ giá trị khớp dữ liệu có thật mới qua. Đây là nguyên tắc đúng mà OWASP khuyến nghị.
2. **Giới hạn số lượng** — `slice(0, MAX)` chặn tấn công gây cạn tài nguyên bằng cách nhồi hàng nghìn slug vào tham số URL.
3. **Thất bại an toàn** — giá trị lạ bị loại bỏ im lặng thay vì gây lỗi.

Người viết đoạn này hiểu vấn đề. **Giữ nguyên, và nên dùng làm mẫu** cho mọi chỗ đọc tham số URL về sau.

## ✅ BEST-03 — Script build thất bại đúng cách

**File:** `scripts/generate-glossary-terms.mjs` — **dòng cuối**

```js
if (terms.length === 0) {
  console.error('LỖI: Script không sinh được thuật ngữ nào...');
  process.exit(1);          // ← chặn build
}
main().catch((e) => { console.error(...); process.exit(1); });
```

**Fail loudly, fail fast.** Đây là bản sửa cho một lỗi từng khiến tính năng liên kết chéo chạy rỗng mà build vẫn báo thành công — loại lỗi tệ nhất, vì nó im lặng. Nay script chặn build khi kết quả bằng 0.

## ✅ BEST-04 — Cấu hình tập trung, không rải rác

**File:** `src/i18n/ui.ts` — 375 dòng

Nhãn giao diện, thứ tự phân hạng, danh sách hãng được hiển thị calibre, ánh xạ nhóm từ điển — **đều đặt một chỗ, có chú thích giải thích lý do**.

Đặc biệt `CALIBRE_DISPLAY_SLUGS` có khối chú thích nói rõ **vì sao** một số hãng bị ẩn và **khi nào** thì thêm lại. Đây là loại chú thích giá trị nhất: giải thích **ý định**, không mô tả lại cú pháp.

## ✅ BEST-05 — Không có bí mật trong mã nguồn

Quét toàn bộ `src/` và cấu hình: **không tìm thấy khóa API, token hay mật khẩu nào**. Không có file `.env` bị commit, và `.gitignore` có khai loại trừ.

Với dự án tĩnh thì đây là điều đương nhiên, nhưng vẫn đáng ghi nhận — rất nhiều dự án vô tình commit khóa dịch vụ phân tích hoặc khóa gửi thư.

## ✅ BEST-06 — Chú thích bằng tiếng Việt, viết cho người bảo trì

Toàn bộ mã có chú thích tiếng Việt giải thích mục đích, kèm nhiều dòng dạng *"Bạn KHÔNG cần đụng tới tệp này"*. Với dự án cá nhân mà chủ dự án không phải lập trình viên chuyên nghiệp, **đây là quyết định đúng** và nâng đáng kể khả năng bảo trì lâu dài.

---

# THỨ TỰ XỬ LÝ ĐỀ NGHỊ

| Bước | Việc | Lý do |
|---|---|---|
| 1 | **CRIT-03** — vô hiệu hóa form newsletter | Đang thu thập email người đọc mà không có nơi nhận. Vấn đề quyền riêng tư, sửa trong năm phút |
| 2 | **CRIT-02** — bỏ `new Function` | Phải làm trước bước 3, nếu không CSP sẽ làm chết tìm kiếm |
| 3 | **CRIT-01** — thêm security headers | Bật ở chế độ chỉ báo cáo trước, theo dõi vài ngày rồi mới chặn thật |
| 4 | **IMP-01, IMP-02** — bỏ ghép chuỗi HTML | Phòng thủ theo chiều sâu |
| 5 | **IMP-06** — dọn class trùng | Nhẹ, làm lúc rảnh |
| 6 | **IMP-03, IMP-04, IMP-05, IMP-07** | Nợ kỹ thuật, không gấp |

---

# GHI CHÚ CUỐI CỦA NGƯỜI REVIEW

Ba điều tôi muốn nói thẳng:

**Thứ nhất — về mức rủi ro thực tế.** Không có lỗi nào trong báo cáo này cho phép kẻ tấn công chiếm quyền, đọc dữ liệu người dùng, hay phá hoại nội dung. Đây là trang tĩnh không lưu gì của ai. Ba lỗi "nghiêm trọng" nghiêm trọng theo nghĩa **cần sửa trước khi công bố**, không phải theo nghĩa đang bị khai thác.

**Thứ hai — về công cụ quét tự động.** Nếu anh chạy một công cụ quét bảo mật lên codebase này, nó sẽ gắn cờ đỏ cho `new Function` và mọi chỗ `innerHTML`. Báo cáo này **cố tình phân biệt** giữa "mẫu mã bị gắn cờ" và "lỗ hổng khai thác được" — tôi đã truy nguồn dữ liệu từng chỗ trước khi phân loại. Đừng để công cụ quét làm anh hoảng, nhưng cũng đừng bỏ qua vì "không khai thác được" — mẫu mã xấu là nợ, và nợ thì có ngày phải trả.

**Thứ ba — điểm mạnh thật sự.** Đoạn kiểm tra đầu vào ở `so-sanh.astro` dòng 115 và cách xử lý thất bại ở script build là mã của người **hiểu vấn đề**, không phải người chép mẫu. Nếu phần còn lại của codebase được nâng lên cùng mức đó thì đây sẽ là một dự án rất sạch.
