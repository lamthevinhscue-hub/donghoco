import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import remarkGlossaryAutolink from './src/plugins/remark-glossary-autolink';

// Tải danh sách thuật ngữ từ điển (sinh bởi scripts/generate-glossary-terms.mjs)
// File này được cập nhật trước mỗi lần build (xem package.json script "build").
const glossaryTerms = JSON.parse(
  readFileSync('./src/data/glossary-terms.json', 'utf-8'),
);

// Cấu hình Astro
// - site: địa chỉ website khi đưa lên mạng
// - tailwind: tự động nạp Tailwind CSS vào mọi trang
// Output: static (website tĩnh - phù hợp blog nội dung, tải nhanh, deploy đơn giản)
export default defineConfig({
  site: 'https://donghoco1.vercel.app',
  integrations: [tailwind(), pagefind(), sitemap()],
  markdown: {
    remarkPlugins: [
      [remarkGlossaryAutolink, { terms: glossaryTerms }],
    ],
  },
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
