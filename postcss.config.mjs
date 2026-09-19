// Pipeline PostCSS cho Astro 7: @astrojs/tailwind không còn bản tương thích
// (peer chỉ khai astro ^3||^4||^5), chuyển sang nạp tailwindcss + autoprefixer
// qua PostCSS — đúng hai plugin mà @astrojs/tailwind 5.1.5 từng kéo ngầm trong
// dependencies (postcss ^8.5.1, autoprefixer ^10.4.20, postcss-load-config).
// Astro tự nhận postcss.config.mjs ở gốc repo và chạy trên mọi stylesheet.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
