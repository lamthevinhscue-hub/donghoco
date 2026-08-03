/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
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
