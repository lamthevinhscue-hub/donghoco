/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  // Safelist: các class màu tier được tạo động trong Card.astro / index.astro
  // (VD bg-tier-haute/10) — Tailwind không thấy class nguyên vẹn nên phải liệt kê.
  // Bao gồm cả biến thể dark: vì cũng được ghép động (dark:text-tier-*-light).
  safelist: [
    'bg-tier-haute', 'bg-tier-ultra', 'bg-tier-highend', 'bg-tier-midrange', 'bg-tier-entry',
    'bg-tier-haute/10', 'bg-tier-ultra/10', 'bg-tier-highend/10', 'bg-tier-midrange/10', 'bg-tier-entry/10',
    'bg-brass', 'bg-brass/10',
    'text-tier-haute', 'text-tier-ultra', 'text-tier-highend', 'text-tier-midrange', 'text-tier-entry',
    'text-tier-haute-light', 'text-tier-ultra-light', 'text-tier-highend-light', 'text-tier-midrange-light', 'text-tier-entry-light',
    'text-brass', 'text-brass-light',
    'border-tier-haute', 'border-tier-ultra', 'border-tier-highend', 'border-tier-midrange', 'border-tier-entry',
    'border-tier-haute-light', 'border-tier-ultra-light', 'border-tier-highend-light', 'border-tier-midrange-light', 'border-tier-entry-light',
    'border-brass', 'border-brass-light',
    // Biến thể dark: (ghép động qua dark:text-${accent}-light / dark:border-${accent}-light)
    'dark:text-tier-haute-light', 'dark:text-tier-ultra-light', 'dark:text-tier-highend-light', 'dark:text-tier-midrange-light', 'dark:text-tier-entry-light',
    'dark:border-tier-haute-light', 'dark:border-tier-ultra-light', 'dark:border-tier-highend-light', 'dark:border-tier-midrange-light', 'dark:border-tier-entry-light',
    // Biến thể dark cho accent brass — dùng bởi hai hạng consumer/microbrand (getTierAccent trong ui.ts)
    'dark:text-brass-light', 'dark:border-brass-light',
  ],
  theme: {
    extend: {
      colors: {
        // =====================================================================
        // TOKEN NGỮ NGHĨA — "Hồ sơ calibre của người thợ đồng hồ"
        // Giá trị là biến CSS (dạng "R G B") định nghĩa trong src/styles/global.css,
        // tự đổi theo .dark nên code mới KHÔNG cần viết cặp dark: variant.
        // Cú pháp <alpha-value> giữ nguyên khả năng dùng bg-steel/10 v.v.
        // =====================================================================
        page: 'rgb(var(--c-page) / <alpha-value>)',              // nền trang
        'surface-tech': 'rgb(var(--c-surface-tech) / <alpha-value>)', // bề mặt kỹ thuật (dải, khối phụ)
        'surface-raised': 'rgb(var(--c-surface-raised) / <alpha-value>)', // bề mặt nổi (thẻ, panel)
        primary: 'rgb(var(--c-primary) / <alpha-value>)',        // chữ chính
        secondary: 'rgb(var(--c-secondary) / <alpha-value>)',    // chữ phụ
        steel: 'rgb(var(--c-steel) / <alpha-value>)',            // xanh thép nung — tương tác, tiêu đề
        ruby: 'rgb(var(--c-ruby) / <alpha-value>)',              // đỏ rubi — điểm cần chú ý
        alloy: 'rgb(var(--c-alloy) / <alpha-value>)',            // hợp kim ấm — chi tiết di sản
        line: 'rgb(var(--c-line) / <alpha-value>)',              // đường viền
        // =====================================================================
        // ALIAS CŨ — giữ tên cũ để không phải sửa hàng trăm file một lần.
        // Giá trị tĩnh ánh xạ sang bảng màu mới; hành vi dark: variant giữ nguyên.
        // =====================================================================
        cream: '#FBFBF8',        // = page (sáng)
        'cream-dark': '#CCD1CE', // = line (sáng) — dùng làm viền + nền dải mờ
        ink: '#15191D',          // = primary (sáng)
        'ink-soft': '#4F5962',   // = secondary (sáng)
        navy: '#234A73',         // = steel (sáng) — nền khối đậm + tiêu đề
        'navy-light': '#3A4D63', // gradient infographic (giữ hệ cũ)
        brass: '#8A6A35',        // = alloy (sáng)
        'brass-light': '#D0B27B',
        'dark-bg': '#111519',        // = page (tối)
        'dark-surface': '#20272D',   // = surface-raised (tối)
        'dark-border': '#39434A',    // = line (tối)
        'dark-text': '#EEF0ED',      // = primary (tối)
        'dark-text-soft': '#B7C0C6', // = secondary (tối)
        'dark-brass': '#D0B27B',     // = alloy (tối)
        // --- 5 màu nhấn cho 5 phân hạng thương hiệu (giữ nguyên, đã đạt AA) ---
        // Thứ tự: Haute Horlogerie → Xa xỉ đỉnh cao → Cao cấp → Tầm trung → Nhập môn.
        'tier-haute': '#6B4E8E',       // Tím hoàng gia — hiếm, thủ công độc lập
        'tier-ultra': '#7A1F2B',       // Rượu vang đậm — quyền quý, Holy Trinity
        'tier-highend': '#1F4E5F',     // Navy teal — cao cấp, tin cậy
        'tier-midrange': '#5C6B3E',    // Olive xám — thực dụng, phổ biến
        'tier-entry': '#8A5A2B',       // Nâu đồng — ấm, dễ tiếp cận
        // --- Biến thể sáng hơn cho chế độ tối (đủ tương phản trên dark-surface) ---
        'tier-haute-light': '#B89BD6',
        'tier-ultra-light': '#D69BA3',
        'tier-highend-light': '#7FB8C9',
        'tier-midrange-light': '#A8B88A',
        'tier-entry-light': '#D4A56F',
      },
      fontFamily: {
        // Newsreader: tiêu đề/editorial; Be Vietnam Pro: nội dung + UI (hỗ trợ tiếng Việt tốt)
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      maxWidth: {
        // Chiều rộng tối ưu cho việc đọc (khoảng 65-75 ký tự mỗi dòng)
        prose: '68ch',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
};
