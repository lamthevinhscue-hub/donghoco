// =============================================================================
// CẤU HÌNH CONTENT COLLECTIONS (Astro 7 — content layer + glob loader)
// =============================================================================
// Di trú từ src/content/config.ts (legacy `type: 'content'`) sang cấu hình
// chính thức Astro 7: mỗi collection dùng glob loader của astro/loaders, schema
// GIỮ NGUYÊN hệt bản legacy — không đổi trường, kiểu, giá trị mặc định.
//
// Cấu trúc thư mục giữ nguyên: src/content/<collection>/<lang>/<slug>.md
// → id entry có dạng "vi/rolex" / "en/rolex" (không đuôi file).
//   getSlug (src/lib/content.ts) tách slug từ id — cho cả hai dạng có/không
//   đuôi, nên URL công khai không đổi.
// `z` lấy từ astro/zod theo khuyến nghị Astro 7 (astro:content z và
// astro:schema đều deprecated).
// =============================================================================

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Trường dùng chung cho mọi loại bài (để đỡ lặp lại)
const baseFields = {
  title: z.string(),                  // Tiêu đề bài viết
  custom_slug: z.string().optional(), // Ghi đè địa chỉ web (nếu bỏ trống, dùng tên file)
  excerpt: z.string(),                // Đoạn tóm tắt ngắn (hiện ở trang danh sách)
  date: z.string().or(z.date()).optional(),  // Ngày đăng
  cover_image: z.string().optional(),        // Ảnh bìa
  draft: z.boolean().default(false),         // true = bản nháp, không hiện trên web
  tags: z.array(z.string()).default([]),     // Thẻ tự do, dùng cho tìm kiếm/lọc
  // Nguồn tham khảo — hiện ở cuối bài qua SourceList.astro.
  // Mặc định rỗng để mọi bài hiện có vẫn dựng được bình thường.
  sources: z.array(z.object({
    label: z.string(),   // Tên nguồn hiển thị, VD: "Breguet — trang chính hãng"
    url: z.string(),     // Địa chỉ đầy đủ
  })).default([]),
  // Ngày cập nhật nội dung (SEO — Prompt 4): nguồn của schema.org dateModified.
  // Trống = bài chưa từng cập nhật sau khi đăng.
  updated: z.string().or(z.date()).optional(),
};

// Liên kết biên tập: một bài dẫn tới bài khác kèm nhãn giải thích mối quan hệ
// (VD: "Cùng thiết kế bởi Gérald Genta"). Khác với gợi ý tự động theo category —
// đây là liên kết do biên tập chọn, hiển thị trong khối "Kết nối cùng chủ đề".
const relatedLink = z.object({
  slug: z.string(),     // Slug của bài đích (theo collection tương ứng)
  relation: z.string(), // Nhãn quan hệ — một câu ngắn tiếng Việt giải thích lý do
});

// --- Trụ cột 1: Thương hiệu ---
const thuongHieu = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thuongHieu' }),
  schema: () =>
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
      parent_company: z.string().optional(),        // Tập đoàn mẹ (VD: "Swatch Group", "Richemont", "LVMH")
      signature_calibres: z.array(z.string()).default([]), // Bộ máy in-house tiêu biểu (VD: ["3235", "4130"])
      logo: z.string().optional(),                  // Đường dẫn logo (VD: "/images/thuong-hieu/logos/rolex.png")
      // --- Bước 2.1: dữ liệu cho template thế hệ mới (5 khối) ---
      lineHistory: z.array(z.object({               // Khối 2: Mini-timeline dọc của riêng thương hiệu
        year: z.number(),
        title: z.string(),
        detail: z.string(),
      })).default([]),
      collections: z.array(z.object({               // Khối 3: Các dòng đồng hồ (Collections)
        name: z.string(),
        year: z.number().optional(),
        identity: z.string(),                       // Đặc tính nhận diện (vỏ, mặt số, bộ máy)
        positioning: z.string(),                    // Định vị trong danh mục thương hiệu
        iconic_ref: z.string().optional(),          // Mẫu tiêu biểu (reference)
      })).default([]),
      segmentComparison: z.array(z.object({         // Khối 4: So sánh với đối thủ cùng phân khúc
        brand: z.string(),                          // Tên đối thủ
        slug: z.string().optional(),                // Slug đối thủ (nếu có bài)
        strength: z.string(),                       // Thế mạnh chế tác
        movement: z.string(),                       // Bộ máy
        value_retention: z.string().optional(),    // Ô so sánh tùy chọn — chỉ hiện khi trang đặt value_retention_label
        philosophy: z.string(),                     // Triết lý
      })).default([]),
      value_retention_label: z.string().optional(), // Nhãn riêng để hiện dòng value_retention trong bảng đối chiếu — thiếu nhãn thì không render hàng (VD: "Vật liệu" của Rado)
      movement_label: z.string().optional(),        // Nhãn tùy chỉnh cho dòng "Bộ máy" trong bảng đối chiếu (VD: "Cách hiển thị giờ" của Urwerk)
      strength_label: z.string().optional(),        // Nhãn tùy chỉnh cho dòng "Thế mạnh chế tác" (VD: "Gốc gác" của Chanel)
      philosophy_label: z.string().optional(),      // Nhãn tùy chỉnh cho dòng "Triết lý" (VD: "Vật liệu đặc trưng" của Chanel)
      collectorNote: z.string().optional(),         // Nhận định nhà sưu tầm: chọn khi nào
      featured_rank: z.number().optional(),         // Ưu tiên lên trang chủ (số nhỏ đứng trước) — do biên tập tự chọn
      // Liên kết biên tập (tùy chọn): dẫn tới các bài cơ chế liên quan chuyên môn của hãng.
      relatedMechanisms: z.array(relatedLink).default([]),
    }),
});

// --- Trụ cột 2: Mẫu iconic ---
const mauIconic = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/mauIconic' }),
  schema: z.object({
    ...baseFields,
    brand: z.string(),                              // Thương hiệu (VD: "Rolex")
    year: z.number().optional(),                    // Năm ra mắt
    references: z.array(z.string()).optional(),     // Các thế hệ tham chiếu (reference)
    category: z.enum([                              // Thể loại (để lọc + so sánh)
      'lặn',          // diver
      'chronograph',  // bấm giờ
      'dress',        // thanh lịch
      'pilot',        // phi công
      'sport-luxury', // thể thao sang trọng (Royal Oak, Nautilus)
      'chế tác độc lập', // tác phẩm của các nhà chế tác độc lập sản lượng rất thấp
      'siêu mỏng',    // đồng hồ mà độ mỏng là đặc tính cốt lõi
      'vật liệu',     // đồng hồ mà đóng góp chính nằm ở vật liệu mới
      'phức tạp cao cấp', // đồng hồ có phức tạp cao cấp là trọng tâm (VD tourbillon)
    ]).optional(),
    movement: z.string().optional(),                // Bộ máy (VD: "Calibre 3235")
    power_reserve: z.string().optional(),           // Trữ cót (VD: "70 giờ")
    water_resistance: z.string().optional(),        // Chống nước (VD: "300m")
    featured_rank: z.number().optional(),           // Ưu tiên lên trang chủ (số nhỏ đứng trước) — do biên tập tự chọn
    // Liên kết biên tập (tùy chọn): dẫn tới mẫu iconic / cơ chế liên quan kèm nhãn quan hệ.
    // Trống = bài không có liên kết biên tập, khối "Kết nối cùng chủ đề" không hiện.
    relatedModels: z.array(relatedLink).default([]),      // → các bài mẫu iconic khác
    relatedMechanisms: z.array(relatedLink).default([]),  // → các bài cơ chế (/co-che)
    // Ghi chú giới hạn nguồn (N1) — khối "Ghi chú nguồn" thu gọn cuối bài (SourceNotes.astro)
    sourceNotes: z.array(z.string()).optional(),
  }),
});

// --- Trụ cột 3: Cơ chế (đi kèm infographic - giai đoạn 2) ---
const coChe = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/coChe' }),
  schema: z.object({
    ...baseFields,
    category: z.enum(['nền tảng', 'phức tạp', 'bổ trợ']),  // Nhóm
    difficulty: z.enum(['thấp', 'trung bình', 'cao', 'rất cao']),       // Độ khó
    has_infographic: z.boolean().default(false),    // Có infographic động chưa?
    interactive: z.boolean().default(false),        // Infographic có tương tác (play/pause) chưa?
    // Liên kết biên tập (tùy chọn): bài cơ chế dẫn tới mẫu iconic ứng dụng nguyên lý này.
    relatedModels: z.array(relatedLink).default([]),
    // Ghi chú giới hạn nguồn (N1) — khối "Ghi chú nguồn" thu gọn cuối bài (SourceNotes.astro)
    sourceNotes: z.array(z.string()).optional(),
  }),
});

// --- Từ điển thuật ngữ ---
const tuDien = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tuDien' }),
  schema: z.object({
    ...baseFields,
    term_en: z.string().optional(),                 // Tên tiếng Anh (nếu có)
    // Bí danh tay (S3) — script sinh JSON sẽ gộp vào danh sách alias tự sinh,
    // dùng để giữ liên kết tự động khi đổi title sang "Việt trước, Anh sau".
    aliases: z.array(z.string()).optional(),
    // Phân nhóm — enum khớp GLOSSARY_CATEGORY_ORDER (src/i18n/ui.ts).
    // Không default: thiếu/sai category → lỗi schema khi sync/check (chặn tái
    // diễn lỗi 3 bài "phức tạp" rơi khỏi trang /tu-dien).
    category: z.enum([
      'thiết kế',
      'bộ máy',
      'hoàn thiện',
      'phức tạp chức năng',
      'phức tạp cao cấp',
      'chứng nhận',
      'độ chính xác và điều chỉnh',
    ]),
    has_infographic: z.boolean().default(false),    // Có infographic minh họa chưa?
    interactive: z.boolean().default(false),        // Infographic có tương tác (play/pause) chưa?
    // Ghi chú giới hạn nguồn (N1) — khối "Ghi chú nguồn" thu gọn cuối bài (SourceNotes.astro)
    sourceNotes: z.array(z.string()).optional(),
  }),
});

// --- Hướng dẫn thực hành ---
const huongDan = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/huongDan' }),
  schema: z.object({
    ...baseFields,
    difficulty: z.enum(['người mới', 'trung cấp', 'nâng cao']).default('người mới'),
    // Ghi chú giới hạn nguồn (N1) — khối "Ghi chú nguồn" thu gọn cuối bài (SourceNotes.astro)
    sourceNotes: z.array(z.string()).optional(),
  }),
});

// --- Trang tĩnh (giới thiệu, liên hệ...) ---
const trang = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trang' }),
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
