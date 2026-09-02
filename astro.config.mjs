import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import remarkGlossaryAutolink from './src/plugins/remark-glossary-autolink';
import rehypeWrapTables from './src/plugins/rehype-wrap-tables.mjs';
import { ALL_PAIRS } from './src/i18n/contentRoutes';

// Tải danh sách thuật ngữ từ điển (sinh bởi scripts/generate-glossary-terms.mjs)
// File này được cập nhật trước mỗi lần build (xem package.json script "build").
const glossaryTerms = JSON.parse(
  readFileSync('./src/data/glossary-terms.json', 'utf-8'),
);

const SITE = 'https://www.kienthucdonghoco.vn';

// Cấu hình Astro
// - site: địa chỉ website khi đưa lên mạng
// - tailwind: tự động nạp Tailwind CSS vào mọi trang
// Output: static (website tĩnh - phù hợp blog nội dung, tải nhanh, deploy đơn giản)
export default defineConfig({
  site: SITE,
  integrations: [
    tailwind(),
    pagefind(),
    sitemap({
      // Integration không thấy các route i18n non-default (pathname undefined
      // lúc astro:build:done) — đưa URL /en/ vào sitemap qua bảng routes trung tâm.
      customPages: ALL_PAIRS.map((p) => `${SITE}${p.en}`),
    }),
  ],
  markdown: {
    remarkPlugins: [
      [remarkGlossaryAutolink, { terms: glossaryTerms }],
    ],
    rehypePlugins: [rehypeWrapTables],
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
