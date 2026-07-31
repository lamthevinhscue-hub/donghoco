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
    nav_glossary: 'Từ điển',
    nav_guides: 'Hướng dẫn',
    nav_about: 'Về chúng tôi',
    nav_contact: 'Liên hệ',
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
    subscribe_email: 'Email của bạn',
    subscribe_button: 'Đăng ký',
    contact_name: 'Họ tên',
    contact_email: 'Email',
    contact_message: 'Nội dung',
    contact_button: 'Gửi liên hệ',
    lang_notice:
      'Nội dung tiếng Anh đang được chuẩn bị. Tạm thời chỉ có tiếng Việt.',
  },
  en: {
    siteName: 'Đồng Hồ Cơ',
    siteTagline: 'An in-depth Vietnamese platform about mechanical watches',
    nav_home: 'Home',
    nav_brands: 'Brands',
    nav_iconic: 'Iconic',
    nav_mechanisms: 'Mechanisms',
    nav_glossary: 'Glossary',
    nav_guides: 'Guides',
    nav_about: 'About',
    nav_contact: 'Contact',
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
    subscribe_email: 'Your email',
    subscribe_button: 'Subscribe',
    contact_name: 'Name',
    contact_email: 'Email',
    contact_message: 'Message',
    contact_button: 'Send',
    lang_notice:
      'English content is being prepared. Vietnamese is currently the main language.',
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
    vi: 'Haute Horlogerie',
    en: 'Haute Horlogerie',
    desc: {
      vi: 'Đỉnh cao chế tác thủ công — phức tạp cực cao, sản lượng cực thấp.',
      en: 'The pinnacle of hand-crafted watchmaking.',
    },
  },
  'ultra luxury': {
    vi: 'Ultra Luxury — Siêu sang',
    en: 'Ultra Luxury',
    desc: {
      vi: 'Siêu sang — Holy Trinity và các hãng đỉnh, giá từ ~$25K.',
      en: 'Super-luxury — the Holy Trinity and top maisons.',
    },
  },
  'high-end luxury': {
    vi: 'High-End Luxury — Cao cấp',
    en: 'High-End Luxury',
    desc: {
      vi: 'Sang trọng cao cấp — nổi tiếng toàn cầu, $5K–$25K.',
      en: 'High-end luxury — globally renowned, $5K–$25K.',
    },
  },
  'mid-range luxury': {
    vi: 'Mid-Range Luxury — Tầm trung',
    en: 'Mid-Range Luxury',
    desc: {
      vi: 'Sang trọng tầm trung — chất lượng tốt, phổ biến, $2K–$5K.',
      en: 'Mid-range luxury — solid quality, popular, $2K–$5K.',
    },
  },
  'entry-level luxury': {
    vi: 'Entry-Level Luxury — Nhập môn',
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
] as const;

export type GlossaryCategory = (typeof GLOSSARY_CATEGORY_ORDER)[number];

const glossaryCategoryLabels: Record<string, { vi: string; en: string }> = {
  'thiết kế': { vi: 'Thiết kế', en: 'Design' },
  'bộ máy': { vi: 'Bộ máy', en: 'Movement' },
  'hoàn thiện': { vi: 'Hoàn thiện', en: 'Finishing' },
  'phức tạp chức năng': { vi: 'Phức tạp — chức năng', en: 'Complications — function' },
  'phức tạp cao cấp': { vi: 'Phức tạp — cao cấp', en: 'Complications — high-end' },
};

export function getCategoryLabel(category: string, lang: Lang): string {
  return glossaryCategoryLabels[category]?.[lang] ?? category;
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
