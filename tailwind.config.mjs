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
  ],
  theme: {
    extend: {
      colors: {
        // Bảng màu sáng - tất cả màu được định nghĩa ở đây, đổi 1 lần cập nhật toàn trang
        cream: '#FAF7F2',        // Nền chính (kem sáng, dịu mắt)
        ink: '#1A1A1A',          // Chữ nội dung (gần đen)
        brass: '#B8893C',        // Điểm nhấn (vàng đồng)
        navy: '#1F2D3D',         // Màu phụ (navy đậm)
        'brass-light': '#D4A85A',
        'navy-light': '#3A4D63',
        'ink-soft': '#4A4A4A',
        'cream-dark': '#F0EAE0',
        // Bảng màu tối — sang trọng như hộp đựng đồng hồ
        'dark-bg': '#1A1D23',        // Nền than chì
        'dark-surface': '#252830',   // Nền thẻ/bảng
        'dark-border': '#3A3F4B',    // Viền mờ
        'dark-text': '#E8DCC4',      // Chữ ngà
        'dark-text-soft': '#A8A095', // Chữ phụ
        'dark-brass': '#D4A85A',     // Ánh kim đồng (sáng hơn brass cho nổi trên nền tối)
        // --- 5 màu nhấn cho 5 phân hạng thương hiệu (sáng) ---
        // Thứ tự: Haute Horlogerie → Xa xỉ đỉnh cao → Cao cấp → Tầm trung → Nhập môn.
        // Chọn dải trầm ấm, cùng tông với brass/navy để hài hòa.
        'tier-haute': '#6B4E8E',       // Tím hoàng gia — hiếm, thủ công độc lập
        'tier-ultra': '#7A1F2B',       // Rượu vang đậm — quyền quý, Holy Trinity
        'tier-highend': '#1F4E5F',     // Navy teal — cao cấp, tin cậy (gần navy sẵn có)
        'tier-midrange': '#5C6B3E',    // Olive xám — thực dụng, phổ biến
        'tier-entry': '#8A5A2B',       // Nâu đồng — ấm, dễ tiếp cận (gần brass)
        // --- Biến thể sáng hơn cho chế độ tối (đủ tương phản trên dark-surface) ---
        'tier-haute-light': '#B89BD6',
        'tier-ultra-light': '#D69BA3',
        'tier-highend-light': '#7FB8C9',
        'tier-midrange-light': '#A8B88A',
        'tier-entry-light': '#D4A56F',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],   // Tiêu đề
        sans: ['Inter', 'system-ui', 'sans-serif'],          // Nội dung
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
