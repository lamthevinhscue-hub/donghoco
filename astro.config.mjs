import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { readFileSync } from 'node:fs';
import remarkGlossaryAutolink from './src/plugins/remark-glossary-autolink';
import rehypeWrapTables from './src/plugins/rehype-wrap-tables.mjs';
import { ARTICLE_PAIRS } from './src/i18n/contentRoutes';
import { ALL_PAIRS } from './src/i18n/contentRoutes';

// Tải danh sách thuật ngữ từ điển (sinh bởi scripts/generate-glossary-terms.mjs)
// File này được cập nhật trước mỗi lần build (xem package.json script "build").
const glossaryTerms = JSON.parse(
  readFileSync('./src/data/glossary-terms.json', 'utf-8'),
);

// Cặp thuật ngữ từ điển có bản tiếng Anh (slug VI → URL EN), lấy từ bảng
// contentRoutes — dùng cho autolink trên trang EN (quy ước i18n: thuật ngữ
// chưa dịch thì không tự chế link về route tiếng Việt).
const glossaryEnLinks = Object.fromEntries(
  ARTICLE_PAIRS
    .filter((p) => p.vi.startsWith('/tu-dien/'))
    .map((p) => [p.vi.replace('/tu-dien/', ''), p.en]),
);

const SITE = 'https://www.kienthucdonghoco.vn';

// Cấu hình Astro
// - site: địa chỉ website khi đưa lên mạng
// - Tailwind: nạp qua postcss.config.mjs (tailwindcss + autoprefixer) —
//   @astrojs/tailwind không còn bản tương thích Astro 7 (peer chỉ khai
//   astro ^3||^4||^5) nên chuyển pipeline PostCSS, giữ nguyên tailwindcss 3.4
//   và tailwind.config.mjs. Base styles nạp qua src/styles/global.css mà
//   BaseLayout import (@tailwind base/components/utilities).
// Output: static (website tĩnh - phù hợp blog nội dung, tải nhanh, deploy đơn giản)
// MIME hai feed RSS: astro preview là server tĩnh, không có cơ chế per-path MIME
// (hook configurePreviewServer của Vite plugin không được gọi — đã thử nghiệm).
// Production đặt header qua hai rule trong vercel.json (H08).

export default defineConfig({
  site: SITE,

  integrations: [
    pagefind(),
    sitemap({
      // Integration không thấy các route i18n non-default (pathname undefined
      // lúc astro:build:done) — đưa URL /en/ vào sitemap qua bảng routes trung tâm.
      customPages: ALL_PAIRS.map((p) => `${SITE}${p.en}`),
    }),
  ],
  markdown: {
    // Cú pháp chính thức Astro 7 (theo types cài sẵn của @astrojs/markdown-remark
    // 7.3.1): plugin truyền qua processor unified({...}) — các khóa
    // markdown.remarkPlugins/rehypePlugins/remarkRehype đã deprecated.
    // Thứ tự xử lý giữ nguyên: remark-glossary-autolink ở tầng remark,
    // rehype-wrap-tables ở tầng rehype sau khi Markdown thành HTML.
    processor: unified({
      remarkPlugins: [
        [remarkGlossaryAutolink, { terms: glossaryTerms, enLinks: glossaryEnLinks }],
      ],
      rehypePlugins: [rehypeWrapTables],
    }),
  },
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Pagefind sinh file JS sau build — Vite không được phân giải lúc build.
  // External hóa để import() chạy lúc runtime (trình duyệt), không lúc build.
  vite: {
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind-ui.js', '/pagefind/pagefind.js'],
      },
    },
  },
});
