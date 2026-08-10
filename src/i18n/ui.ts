// =============================================================================
// HỖ TRỢ ĐA NGÔN NGỮ (i18n)
// =============================================================================
// Tệp này chứa các hàm nhỏ giúp website biết:
//   1. Đang hiển thị ngôn ngữ nào (vi hay en)
//   2. Cách tạo liên kết giữa tiếng Việt và tiếng Anh
//   3. Bản dịch các chữ giao diện cố định (như "Đọc tiếp", "Trang chủ"...)
//
// Bạn KHÔNG cần đụng tới tệp này trừ khi muốn THÊM chữ giao diện mới.
// =============================================================================

export const languages = {
  vi: 'Tiếng Việt',
  en: 'English',
} as const;

export const defaultLang = 'vi';

// =============================================================================
// THÔNG TIN TÁC GIẢ & NHÀ XUẤT BẢN (structured data)
// =============================================================================
// Nguồn duy nhất cho thông tin tác giả/nhà xuất bản — dùng trong JSON-LD ở
// BaseLayout. Khi cần đổi tên tác giả hay logo, chỉ sửa ở đây.
// =============================================================================

export const SITE_AUTHOR = {
  '@type': 'Person',
  name: 'Anh Vinh',
  url: 'https://donghoco1.vercel.app',
} as const;

export const SITE_PUBLISHER = {
  '@type': 'Organization',
  name: 'Đồng Hồ Cơ',
  url: 'https://donghoco1.vercel.app',
  logo: {
    '@type': 'ImageObject',
    url: 'https://donghoco1.vercel.app/og-default.jpg',
  },
} as const;

// =============================================================================
// ẢNH CHIA SẺ (OG image) THEO KHU VỰC
// =============================================================================
// Mỗi khu vực nội dung có một ảnh chia sẻ riêng. BaseLayout chọn ảnh dựa trên
// đường dẫn trang. Nếu bài có cover_image riêng thì dùng ảnh đó (ghi đè).
//
// Thêm khu vực mới: thêm entry vào mảng dưới. Thứ tự: mục đầu khớp trước.
// =============================================================================

export const OG_IMAGE_MAP: ReadonlyArray<{ match: string; image: string }> = [
  { match: '/thuong-hieu', image: '/images/og/og-thuong-hieu.jpg' },
  { match: '/mau-iconic', image: '/images/og/og-mau-iconic.jpg' },
  { match: '/co-che', image: '/images/og/og-co-che.jpg' },
  { match: '/tu-dien', image: '/images/og/og-co-che.jpg' },
  { match: '/huong-dan', image: '/images/og/og-co-che.jpg' },
  { match: '/lich-su', image: '/images/og/og-lich-su.jpg' },
  { match: '/giai-phau', image: '/images/og/og-lich-su.jpg' },
];

export const OG_DEFAULT_IMAGE = '/og-default.jpg';

/** Chọn ảnh OG theo đường dẫn trang. Ưu tiên cover_image (nếu có) > ảnh khu vực > mặc định. */
export function getOgImage(pathname: string, coverImage?: string): string {
  if (coverImage) return coverImage;
  for (const entry of OG_IMAGE_MAP) {
    if (pathname.startsWith(entry.match)) return entry.image;
  }
  return OG_DEFAULT_IMAGE;
}

export type Lang = keyof typeof languages;

// Lấy ngôn ngữ từ địa chỉ web (URL)
// Ví dụ: /en/blog  -> 'en'; /blog -> 'vi' (mặc định, không có tiền tố)
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

// Tạo đường dẫn có tiền tố ngôn ngữ khi cần
// Tiếng Việt: KHÔNG có tiền tố (/blog). Tiếng Anh: có tiền tố (/en/blog).
export function localizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return `/${lang}${clean === '/' ? '' : clean}`;
}

// Các chữ giao diện cố định, dịch sang từng ngôn ngữ
// Muốn thêm chữ mới: thêm vào đây cả 2 cột vi/en.
export const translations = {
  vi: {
    siteName: 'Đồng Hồ Cơ',
    siteTagline: 'Nền tảng nội dung tiếng Việt chuyên sâu về đồng hồ cơ',
    nav_home: 'Trang chủ',
    nav_brands: 'Thương hiệu',
    nav_iconic: 'Mẫu iconic',
    nav_mechanisms: 'Cơ chế',
    nav_history: 'Lịch sử',
    nav_glossary: 'Từ điển',
    nav_guides: 'Hướng dẫn',
    nav_about: 'Về chúng tôi',
    nav_contact: 'Liên hệ',
    nav_anatomy: 'Giải phẫu',
    nav_knowledge: 'Kiến thức',
    nav_explore: 'Khám phá',
    nav_compare: 'So sánh',
    read_more: 'Đọc tiếp',
    back_to_list: '← Về danh sách',
    featured: 'Nội dung nổi bật',
    latest: 'Mới nhất',
    pillar_brands: 'Thư viện thương hiệu',
    pillar_brands_desc: 'Lịch sử, triết lý chế tác và bộ máy tiêu biểu của các nhà sản xuất.',
    pillar_iconic: 'Những mẫu iconic',
    pillar_iconic_desc: 'Câu chuyện của những chiếc đồng hồ định hình cả một thể loại.',
    pillar_mechanisms: 'Cơ chế hoạt động',
    pillar_mechanisms_desc: 'Hiểu sâu về cách đồng hồ cơ đập, lên dây và đo thời gian.',
    footer_rights: 'Bản quyền',
    footer_made: 'Xây dựng bằng Astro & Tailwind CSS',
    switch_lang: 'English',
    search_placeholder: 'Tìm bài viết, thương hiệu, thuật ngữ...',
    subscribe_title: 'Nhận bài viết mới',
    subscribe_desc: 'Để lại email, tôi sẽ thông báo khi có bài mới.',
    // subscribe_email + subscribe_button: tạm không dùng (form bản tin đã vô hiệu hóa).
    // Giữ lại để khi bật tính năng bản tin thì chỉ cần khôi phục form trong Footer.astro.
    contact_name: 'Họ tên',
    contact_email: 'Email',
    contact_message: 'Nội dung',
    contact_button: 'Gửi liên hệ',
    lang_notice:
      'Nội dung tiếng Anh đang được chuẩn bị. Tạm thời chỉ có tiếng Việt.',
    // Khối "Thông số kỹ thuật" trên trang chi tiết mẫu iconic (SpecTable.astro)
    spec_title: 'Thông số kỹ thuật',
    spec_brand: 'Thương hiệu',
    spec_year: 'Năm ra mắt',
    spec_category: 'Thể loại',
    spec_movement: 'Bộ máy',
    spec_power_reserve: 'Trữ cót',
    spec_water_resistance: 'Chống nước',
    spec_references: 'Các thế hệ tham chiếu',
  },
  en: {
    siteName: 'Đồng Hồ Cơ',
    siteTagline: 'An in-depth Vietnamese platform about mechanical watches',
    nav_home: 'Home',
    nav_brands: 'Brands',
    nav_iconic: 'Iconic',
    nav_mechanisms: 'Mechanisms',
    nav_history: 'History',
    nav_glossary: 'Glossary',
    nav_guides: 'Guides',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_anatomy: 'Anatomy',
    nav_knowledge: 'Knowledge',
    nav_explore: 'Discover',
    nav_compare: 'Compare',
    read_more: 'Read more',
    back_to_list: '← Back to list',
    featured: 'Featured',
    latest: 'Latest',
    pillar_brands: 'Brand library',
    pillar_brands_desc: 'History, watchmaking philosophy and signature calibres.',
    pillar_iconic: 'Iconic watches',
    pillar_iconic_desc: 'Stories of the watches that defined entire categories.',
    pillar_mechanisms: 'How it works',
    pillar_mechanisms_desc: 'Go deep into how mechanical watches tick, wind and keep time.',
    footer_rights: 'All rights reserved',
    footer_made: 'Built with Astro & Tailwind CSS',
    switch_lang: 'Tiếng Việt',
    search_placeholder: 'Search articles, brands, terms...',
    subscribe_title: 'Get new articles',
    subscribe_desc: 'Leave your email and I will notify you when new content is published.',
    // subscribe_email + subscribe_button: tạm không dùng (form bản tin đã vô hiệu hóa).
    // Giữ lại để khi bật tính năng bản tin thì chỉ cần khôi phục form trong Footer.astro.
    contact_name: 'Name',
    contact_email: 'Email',
    contact_message: 'Message',
    contact_button: 'Send',
    lang_notice:
      'English content is being prepared. Vietnamese is currently the main language.',
    // "Technical specifications" block on the iconic model detail page (SpecTable.astro)
    spec_title: 'Specifications',
    spec_brand: 'Brand',
    spec_year: 'Year introduced',
    spec_category: 'Category',
    spec_movement: 'Movement',
    spec_power_reserve: 'Power reserve',
    spec_water_resistance: 'Water resistance',
    spec_references: 'References',
  },
} as const;

// Lấy bản dịch theo ngôn ngữ
export function t(lang: Lang) {
  return translations[lang] ?? translations[defaultLang];
}

// =============================================================================
// NHÃN HẠNG THƯƠNG HIỆU (tier labels)
// =============================================================================
// Dùng cho trang /thuong-hieu: nhóm và lọc theo hạng.
// Thứ tự mảng = thứ tự hiển thị (từ cao xuống thấp).
// =============================================================================

export const TIER_ORDER = [
  'haute horlogerie',
  'ultra luxury',
  'high-end luxury',
  'mid-range luxury',
  'entry-level luxury',
  'consumer',
  'microbrand',
] as const;

export type Tier = (typeof TIER_ORDER)[number];

const tierLabels: Record<Tier, { vi: string; en: string; desc: { vi: string; en: string } }> = {
  'haute horlogerie': {
    vi: 'Haute Horlogerie độc lập',
    en: 'Haute Horlogerie',
    desc: {
      vi: 'Các nhà chế tác độc lập sản lượng cực thấp — phần lớn công đoạn làm thủ công, mỗi năm chỉ vài chục chiếc rời xưởng.',
      en: 'The pinnacle of hand-crafted watchmaking.',
    },
  },
  'ultra luxury': {
    vi: 'Xa xỉ đỉnh cao',
    en: 'Ultra Luxury',
    desc: {
      vi: 'Siêu sang — Holy Trinity và các hãng đỉnh, giá từ ~$25K.',
      en: 'Super-luxury — the Holy Trinity and top maisons.',
    },
  },
  'high-end luxury': {
    vi: 'Cao cấp',
    en: 'High-End Luxury',
    desc: {
      vi: 'Sang trọng cao cấp — nổi tiếng toàn cầu, $5K–$25K.',
      en: 'High-end luxury — globally renowned, $5K–$25K.',
    },
  },
  'mid-range luxury': {
    vi: 'Tầm trung',
    en: 'Mid-Range Luxury',
    desc: {
      vi: 'Sang trọng tầm trung — chất lượng tốt, phổ biến, $2K–$5K.',
      en: 'Mid-range luxury — solid quality, popular, $2K–$5K.',
    },
  },
  'entry-level luxury': {
    vi: 'Nhập môn',
    en: 'Entry-Level Luxury',
    desc: {
      vi: 'Nhập môn sang trọng — cổng vào giới đồng hồ cơ, $500–$2K.',
      en: 'Entry-level luxury — gateway to mechanical watches, $500–$2K.',
    },
  },
  consumer: {
    vi: 'Consumer — Phổ thông',
    en: 'Consumer',
    desc: {
      vi: 'Phổ thông — dưới $500, dùng hàng ngày.',
      en: 'Consumer — under $500, everyday watches.',
    },
  },
  microbrand: {
    vi: 'Microbrand — Độc lập nhỏ',
    en: 'Microbrand',
    desc: {
      vi: 'Thương hiệu nhỏ độc lập — sáng tạo, direct-to-consumer.',
      en: 'Small independents — creative, direct-to-consumer.',
    },
  },
};

export function getTierLabel(tier: string, lang: Lang): string {
  return (tierLabels as any)[tier]?.[lang] ?? tier;
}

export function getTierDesc(tier: string, lang: Lang): string {
  return (tierLabels as any)[tier]?.desc?.[lang] ?? '';
}

// =============================================================================
// MÀU NHẤN PHÂN HẠNG (tier accent colors)
// =============================================================================
// Ánh xạ mỗi tier → mã màu Tailwind. Dùng cho viền trái tiêu đề nhóm, nhãn trên
// thẻ thương hiệu, và nút lọc khi đang bật trên /thuong-hieu.
// Trả về khóa màu (VD: 'tier-haute') — component tự thêm hậu tố -light cho dark mode.
// =============================================================================

const tierAccent: Record<string, string> = {
  'haute horlogerie': 'tier-haute',
  'ultra luxury': 'tier-ultra',
  'high-end luxury': 'tier-highend',
  'mid-range luxury': 'tier-midrange',
  'entry-level luxury': 'tier-entry',
  // Hai hạng thấp (consumer/microbrand) không nằm trong nhóm 5 màu chính;
  // về mặc định dùng brass để vẫn có điểm nhấn.
  consumer: 'brass',
  microbrand: 'brass',
};

export function getTierAccent(tier: string): string {
  return tierAccent[tier] ?? 'brass';
}

// =============================================================================
// DANH SÁCH THƯƠNG HIỆU ĐƯỢC HIỂN THỊ CALIBRE (calibre display allowlist)
// =============================================================================
// Chỉ các hãng có trong danh sách này mới hiện khối "Bộ máy in-house tiêu biểu"
// trên trang thương hiệu (trong BrandLayout). Lý do: mã calibre trong frontmatter
// của một số hãng chưa đối chiếu được với nguồn chính hãng — để tránh lan truyền
// số liệu chưa kiểm chứng, ta giấu khối đó đi cho đến khi kiểm chứng xong.
//
// Dữ liệu frontmatter `signature_calibres` vẫn GIỮ NGUYÊN trong các file .md
// (không xóa) để sau này kiểm chứng được thì chỉ cần thêm slug vào đây.
//
// Khi kiểm chứng thêm được hãng nào: thêm slug của hãng đó vào mảng dưới.
// Chi tiết từng mục xem CAN-KIEM-CHUNG.md.
// =============================================================================

export const CALIBRE_DISPLAY_SLUGS: ReadonlySet<string> = new Set([
  'iwc',
  'grand-seiko',
  'seiko',
  'hamilton',
  'cartier',
  'rolex',
  'omega',
  'tag-heuer',
  'ulysse-nardin',
  'patek-philippe',
  'vacheron-constantin',
  'a-lange-soehne',
  'audemars-piguet',
  'blancpain',
  'jaeger-lecoultre',
  'tudor',
  'longines',
  'tissot',
  'orient',
]);

// =============================================================================
// NHÃN NHÓM TỪ ĐIỂN (glossary categories)
// =============================================================================
// Dùng cho trang /tu-dien: nhóm và lọc theo nhóm thuật ngữ.
// Thứ tự mảng = thứ tự hiển thị (từ cơ bản đến nâng cao).
// =============================================================================

export const GLOSSARY_CATEGORY_ORDER = [
  'thiết kế',
  'bộ máy',
  'hoàn thiện',
  'phức tạp chức năng',
  'phức tạp cao cấp',
  'chứng nhận',
] as const;

export type GlossaryCategory = (typeof GLOSSARY_CATEGORY_ORDER)[number];

const glossaryCategoryLabels: Record<string, { vi: string; en: string }> = {
  'thiết kế': { vi: 'Thiết kế', en: 'Design' },
  'bộ máy': { vi: 'Bộ máy', en: 'Movement' },
  'hoàn thiện': { vi: 'Hoàn thiện', en: 'Finishing' },
  'phức tạp chức năng': { vi: 'Phức tạp — chức năng', en: 'Complications — function' },
  'phức tạp cao cấp': { vi: 'Phức tạp — cao cấp', en: 'Complications — high-end' },
  'chứng nhận': { vi: 'Chứng nhận & tiêu chuẩn', en: 'Certification & standards' },
};

export function getCategoryLabel(category: string, lang: Lang): string {
  return glossaryCategoryLabels[category]?.[lang] ?? category;
}

// =============================================================================
// NHÃN THỂ LOẠI MẪU ICONIC (iconic model categories)
// =============================================================================
// Dùng cho SpecTable.astro và các nơi khác cần dịch giá trị category của bài
// mẫu iconic (enum: lặn / chronograph / dress / pilot / sport-luxury).
// =============================================================================

const iconicCategoryLabels: Record<string, { vi: string; en: string }> = {
  'lặn': { vi: 'Lặn', en: 'Diver' },
  'chronograph': { vi: 'Chronograph', en: 'Chronograph' },
  'dress': { vi: 'Dress', en: 'Dress' },
  'pilot': { vi: 'Phi công', en: 'Pilot' },
  'sport-luxury': { vi: 'Sport-luxury', en: 'Sport-luxury' },
};

export function getIconicCategoryLabel(category: string, lang: Lang): string {
  return iconicCategoryLabels[category]?.[lang] ?? category;
}

// Tạo liên kết chuyển ngôn ngữ cho trang hiện tại
// (nếu đang ở /blog/bai-1 thì liên kết tiếng Anh là /en/blog/bai-1)
export function getLanguageSwitcherUrl(url: URL, targetLang: Lang): string {
  const currentLang = getLangFromUrl(url);
  const path = url.pathname;

  if (currentLang === defaultLang) {
    // Đang ở tiếng Việt (không tiền tố), thêm tiền tố ngôn ngữ đích
    if (targetLang === defaultLang) return path;
    return `/${targetLang}${path === '/' ? '' : path}`;
  }
  // Đang ở ngôn ngữ khác (có tiền tố), thay tiền tố
  const rest = path.replace(`/${currentLang}`, '') || '/';
  if (targetLang === defaultLang) return rest;
  return `/${targetLang}${rest === '/' ? '' : rest}`;
}
