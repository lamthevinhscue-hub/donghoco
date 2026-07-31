import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Cấu hình Astro
// - site: địa chỉ website khi đưa lên mạng (thay bằng tên miền thật của bạn)
// - tailwind: tự động nạp Tailwind CSS vào mọi trang
// Output: static (website tĩnh - phù hợp blog nội dung, tải nhanh, deploy đơn giản)
export default defineConfig({
  site: 'https://dong-ho-co.example',   // ← ĐỔI: thay bằng tên miền thật khi có
  integrations: [tailwind()],
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    routing: {
      prefixDefaultLocale: false,        // tiếng Việt KHÔNG có tiền tố /vi/, tiếng Anh sẽ có /en/
    },
  },
});
