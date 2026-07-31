import { defineCollection, z } from 'astro:content';

// =============================================================================
// CẤU HÌNH CONTENT COLLECTIONS (Các bộ sưu tập nội dung)
// =============================================================================
// Tệp này quy định CÁC LOẠI bài viết trên website và mỗi loại có những trường
// thông tin gì. Astro dùng nó để kiểm tra nội dung của bạn có hợp lệ không
// (ví dụ: nếu quên điền tiêu đề, Astro sẽ báo lỗi ngay khi chạy).
//
// Khi bạn viết bài mới, chỉ cần mở một bài mẫu cùng loại rồi copy khung đầu bài
// (phần nằm giữa hai dòng ---). Không cần đụng tới tệp này.
// =============================================================================

// Trường dùng chung cho mọi loại bài (để đỡ lặp lại)
const baseFields = {
  title: z.string(),                  // Tiêu đề bài viết
  custom_slug: z.string().optional(), // Ghi đè địa chỉ web (nếu bỏ trống, dùng tên tệp)
  excerpt: z.string(),                // Đoạn tóm tắt ngắn (hiện ở trang danh sách)
  date: z.string().or(z.date()).optional(),  // Ngày đăng
  cover_image: z.string().optional(),        // Ảnh bìa
  draft: z.boolean().default(false),         // true = bản nháp, không hiện trên web
};

// --- Trụ cột 1: Thương hiệu ---
const thuongHieu = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      ...baseFields,
      country: z.string(),                          // Quốc gia (VD: "Thụy Sĩ")
      tier: z.enum([                                // Phân khúc (theo đồng thuận cộng đồng)
        'haute horlogerie',       // Đỉnh cao chế tác thủ công (F.P. Journe, Dufour, Greubel Forsey)
        'ultra luxury',           // Siêu sang (Patek, Lange, Vacheron, AP, Breguet)
        'high-end luxury',        // Sang trọng cao cấp (Rolex, Omega, JLC, IWC, Grand Seiko)
        'mid-range luxury',       // Sang trọng tầm trung (Tudor, Breitling, Longines, Oris, Zenith)
        'entry-level luxury',     // Nhập môn sang trọng (Seiko Presage, Tissot, Hamilton)
        'consumer',               // Phổ thông (Casio, Timex)
        'microbrand',             // Indie nhỏ (Baltic)
      ]),
      founded: z.number().optional(),               // Năm thành lập
      logo: z.string().optional(),                  // Đường dẫn logo (VD: "/images/thuong-hieu/logos/rolex.png")
    }),
});

// --- Trụ cột 2: Mẫu iconic ---
const mauIconic = defineCollection({
  type: 'content',
  schema: z.object({
    ...baseFields,
    brand: z.string(),                              // Thương hiệu (VD: "Rolex")
    year: z.number().optional(),                    // Năm ra mắt
    references: z.array(z.string()).optional(),     // Các thế hệ tham chiếu (reference)
  }),
});

// --- Trụ cột 3: Cơ chế (đi kèm infographic - giai đoạn 2) ---
const coChe = defineCollection({
  type: 'content',
  schema: z.object({
    ...baseFields,
    category: z.enum(['nền tảng', 'chức năng', 'cao cấp', 'bổ trợ']),  // Nhóm
    difficulty: z.enum(['thấp', 'trung bình', 'cao', 'rất cao']),       // Độ khó
    has_infographic: z.boolean().default(false),    // Có infographic động chưa?
  }),
});

// --- Từ điển thuật ngữ ---
const tuDien = defineCollection({
  type: 'content',
  schema: z.object({
    ...baseFields,
    term_en: z.string().optional(),                 // Tên tiếng Anh (nếu có)
    category: z.string().default('chung'),          // Phân nhóm thuật ngữ
    has_infographic: z.boolean().default(false),    // Có infographic minh họa chưa?
  }),
});

// --- Hướng dẫn thực hành ---
const huongDan = defineCollection({
  type: 'content',
  schema: z.object({
    ...baseFields,
    difficulty: z.enum(['người mới', 'trung cấp', 'nâng cao']).default('người mới'),
  }),
});

// --- Trang tĩnh (giới thiệu, liên hệ...) ---
const trang = defineCollection({
  type: 'content',
  schema: z.object({
    ...baseFields,
  }),
});

export const collections = {
  thuongHieu,
  mauIconic,
  coChe,
  tuDien,
  huongDan,
  trang,
};
