# MD1 — Di trú cấu hình Markdown hết deprecation Astro 7 (TXN-20260920-10)

- Danh mục: DHC-MD-DEPRECATION-20260920 v1.0.0
- Nền: `HEAD = origin/main = e96b2e9` ("chore(astro): migrate to Astro 7 content layer"), tracked sạch khi bắt đầu; node_modules đã astro 7.3.3 + @astrojs/markdown-remark 7.3.1
- Không commit/push/deploy; KHÔNG stage (theo yêu cầu prompt)
- Tệp thay đổi: **duy nhất `astro.config.mjs`** — không đụng package.json/lockfile, plugin, checker, nội dung

## 1. Thay đổi `astro.config.mjs`

- Thêm `import { unified } from '@astrojs/markdown-remark';`
- Thay khối `markdown: { remarkPlugins: [...], rehypePlugins: [...] }` (deprecated) bằng:

```js
markdown: {
  processor: unified({
    remarkPlugins: [
      [remarkGlossaryAutolink, { terms: glossaryTerms, enLinks: glossaryEnLinks }],
    ],
    rehypePlugins: [rehypeWrapTables],
  }),
},
```

- Cú pháp lấy từ **types cài sẵn của chính @astrojs/markdown-remark 7.3.1** (`dist/processor.d.ts` có ví dụ chính thức `processor: unified({ remarkPlugins: [remarkToc] })`; `UnifiedProcessorOptions` nhận `remarkPlugins`/`rehypePlugins`/`remarkRehype`; kiểu phần tử `(plugin | [plugin, any])[]`).
- Thứ tự xử lý giữ nguyên: `remark-glossary-autolink` tầng remark (cùng `glossaryTerms` + `glossaryEnLinks`), `rehype-wrap-tables` tầng rehype. `remarkRehype` không truyền (dự án không dùng).
- Không sửa plugin, checker, package.json/lockfile, nội dung, CSS, i18n, Pagefind.

## 2. Kết quả — cảnh báo deprecation về 0

| Chạy | Nền e96b2e9 (trước) | Sau MD1 |
|---|---|---|
| `npm run check:types` | exit 0, **cảnh báo deprecation ×1** | exit 0, **0 cảnh báo**, Result (359 files) 0/0/0 |
| `npm run build` | exit 0, **cảnh báo deprecation ×1** (tại astro build) | exit 0, **0 cảnh báo** |
| Trang | 290 · Pagefind 290 · sitemap 289 · link 21.154 · 0 hỏng | **giống hệt từng số** |
| G09-B | 125/125/125 trên 68 trang | giống hệt |
| G01 | 99/99 | giống hệt |

Bằng chứng: `log-types-truoc.txt` / `log-types-sau.txt` / `log-build-nen.txt` / `log-build-sau.txt` (grep `deprecated` = 0 sau di trú).

## 3. Glossary + bọc bảng — dist và trình duyệt

Bài kiểm tra chọn từ dist: glossary `/co-che/bo-thoat/` (VI) + `/en/mechanisms/escapement/` (EN); bảng `/huong-dan/len-day-dong-ho/` (VI) + `/en/guides/winding-a-mechanical-watch/` (EN) — 6 trang có bảng bọc tĩnh toàn site: len-day-dong-ho, winding-a-mechanical-watch, panerai-luminor, seagull-1963, panerai, seagull.

**Dist:**
- VI: link `/tu-dien/day-cot`, `/tu-dien/banh-thoat`… kèm `title` tooltip tiếng Việt; EN: `/en/glossary/mainspring/`, `/en/glossary/crown/`, `/en/glossary/movement/` — đích route EN, KHÔNG tooltip VI (quy ước i18n giữ nguyên).
- Wrapper bọc tại build: `<div class="table-scroll-wrap overflow-x-auto" tabindex="0" role="region" aria-label="Bảng dữ liệu — dùng phím mũi tên trái và phải để xem thêm cột">` (VI) / `aria-label="Data table — use the left and right arrow keys to see more columns"` (EN) — đúng ngôn ngữ từng tệp.

**Trình duyệt (preview 4398, playwright):**
- Glossary VI: đích `/tu-dien/day-cot` HTTP 200; EN: `/en/glossary/mainspring/` HTTP 200 trong vùng `/en/`. 0 pageerror.
- Wrapper `tabIndex=0` + `role=region` + nhãn đúng ngôn ngữ; focus bằng bàn phím được; bảng 2 cột không tràn (không có gì để cuộn — hành vi đúng); bảng rộng `/thuong-hieu/seagull/` ở viewport 375px tràn 59px → focus + **End cuộn tới 59, Home về 0** — vùng cuộn bàn phím hoạt động thật.
- **No-JS** (context `javaScriptEnabled: false`): wrapper vẫn bọc tại build (tabindex/role/nhãn đủ), nội dung bảng đọc được ("Tình huống / Nguyên tắc…"), glossary vẫn `<a href>` tĩnh có tooltip.
- `node scripts/check-content-accessibility.mjs`: exit 0 — rule rehype-wrap-tables + BaseLayout bàn phím ĐẠT (`log-check-content-a11y.txt`).

## 4. Mutation cô lập ngoài repo chính

Worktree tạm `$TEMP/md1-mut` (detached từ e96b2e9, **node_modules junction** tới repo chính, đã dọn bằng `git worktree remove --force` sau chặng). Phép kiểm chuẩn `kiem-md1.mjs`: R1 = 6 trang phải có wrapper bảng tĩnh + tabIndex/role/nhãn đúng ngôn ngữ; R2 = 2 bài glossary phải có link đích đúng ngôn ngữ, VI có tooltip, EN không.

| Bước | astro.config trong worktree tạm | build | `kiem-md1.mjs` |
|---|---|---|---|
| Baseline | nguyên bản (unified + 2 plugin) | exit 0 | **ĐẠT** — 6 wrapper / 7 link |
| M1 bỏ plugin glossary (`remarkPlugins: []`) | exit 0 | **THẤT BẠI R2** — 2 bài mất sạch glossary-autolink |
| M2 khôi phục glossary, bỏ wrap-tables (`rehypePlugins: []`) | exit 0 | **THẤT BẠI R1** — 0/6 wrapper, 6 trang lỗi |
| M3 khôi phục nguyên bản (`git checkout -- astro.config.mjs`) | exit 0 | **ĐẠT** — 6 wrapper / 7 link |

Log: `log-mutation-baseline.txt` / `log-mutation-m1.txt` / `log-mutation-m2.txt` / `log-mutation-m3.txt`.

## 5. Kiểm định dạng

`git diff --check` sạch; sweep whitespace/EOF/JSON/bí mật TONG_LOI=0 (`log-sweep.txt` — sweep.mjs quét biên bản + astro.config.mjs + toàn bộ tệp output của gói; log-* miễn kyLa vì npm/astro in ANSI).

## 6. Giới hạn còn lại

- Warning "LegacyContentConfig"-type không còn tồn tại; các cảnh báo còn lại của build: không có. Preview/chỉ số dist là máy cục bộ; production/CSP/Analytics giữ nguyên (nhánh riêng).
- Mutation chạy trên worktree tạm với node_modules junction — node_modules của repo chính không bị đụng.

## 7. Kết luận

MD1 xong tự kiểm — loại bỏ hoàn toàn cảnh báo Markdown deprecation bằng `unified({...})` chính thức, hành vi glossary + bọc bảng bảo toàn tuyệt đối (đối chiếu số nền từng chỉ số) — chờ GPT Work nghiệm thu độc lập; chưa stage/commit/push/deploy.
