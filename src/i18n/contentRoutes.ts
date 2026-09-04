// =============================================================================
// CONTENT ROUTES — BẢNG ĐỊA CHỈ ĐA NGÔN NGỮ TẬP TRUNG
// =============================================================================
// Nguồn sự thật DUY NHẤT cho câu hỏi "bài X tiếng Việt có bản tiếng Anh ở đâu?".
// Mọi nơi cần chuyển ngôn ngữ (bộ chuyển ngôn ngữ, hreflang, link trong template,
// footer) đều đi qua các hàm ở đây — không suy đoán bằng cách thêm/xóa "/en".
//
// Cặp nào không có trong bảng = chưa có bản dịch tương ứng; các hàm trả về
// undefined và nơi gọi phải tự xử lý (ẩn link, hoặc về trang chủ ngôn ngữ đích).
// Script scripts/check-english-launch.mjs kiểm mọi cặp trong bảng tồn tại
// thật trong dist/ sau build.
// =============================================================================

import type { Lang } from './ui';

export interface RoutePair {
  /** Đường dẫn tiếng Việt (không tiền tố — tiếng Việt là mặc định) */
  vi: string;
  /** Đường dẫn tiếng Anh (luôn bắt đầu bằng /en/) */
  en: string;
}

// Trang chủ + trang tĩnh
// =============================================================================
export const STATIC_PAIRS: RoutePair[] = [
  { vi: '/', en: '/en/' },
  { vi: '/ve-chung-toi', en: '/en/about/' },
  { vi: '/kha-nang-tiep-can', en: '/en/accessibility/' },
  { vi: '/lien-he', en: '/en/contact/' },
  { vi: '/ban-quyen', en: '/en/copyright/' },
  { vi: '/lo-trinh-hoc-dong-ho', en: '/en/learning-path/' },
];

// Trang danh sách (index) từng khu vực nội dung
// =============================================================================
export const INDEX_PAIRS: RoutePair[] = [
  { vi: '/thuong-hieu', en: '/en/brands/' },
  { vi: '/mau-iconic', en: '/en/iconic-watches/' },
  { vi: '/co-che', en: '/en/mechanisms/' },
  { vi: '/tu-dien', en: '/en/glossary/' },
  { vi: '/huong-dan', en: '/en/guides/' },
];

// Bài nội dung đã có bản tiếng Anh (English launch pack)
// =============================================================================
export const ARTICLE_PAIRS: RoutePair[] = [
  // Hướng dẫn
  { vi: '/huong-dan/chon-dong-ho-dau-tien', en: '/en/guides/first-mechanical-watch/' },
  { vi: '/huong-dan/doc-va-chinh-gmt', en: '/en/guides/reading-and-setting-gmt/' },
  { vi: '/huong-dan/dung-tachymeter', en: '/en/guides/using-a-tachymeter/' },
  { vi: '/huong-dan/len-day-dong-ho', en: '/en/guides/winding-a-mechanical-watch/' },
  { vi: '/huong-dan/muc-chong-nuoc', en: '/en/guides/water-resistance/' },
  { vi: '/huong-dan/chinh-lich-an-toan', en: '/en/guides/setting-the-date-safely/' },
  { vi: '/huong-dan/hop-xoay-dong-ho', en: '/en/guides/watch-winders/' },
  { vi: '/huong-dan/do-sai-so', en: '/en/guides/accuracy-tracking/' },
  // Cơ chế
  { vi: '/co-che/chuyen-dong-co', en: '/en/mechanisms/how-a-mechanical-watch-works/' },
  { vi: '/co-che/tru-cot', en: '/en/mechanisms/power-reserve/' },
  { vi: '/co-che/bo-thoat', en: '/en/mechanisms/escapement/' },
  { vi: '/co-che/gmt', en: '/en/mechanisms/gmt/' },
  { vi: '/co-che/chronograph', en: '/en/mechanisms/chronograph/' },
  { vi: '/co-che/chong-nuoc', en: '/en/mechanisms/water-resistance/' },
  { vi: '/co-che/len-day-tu-dong', en: '/en/mechanisms/automatic-winding/' },
  { vi: '/co-che/chong-tu', en: '/en/mechanisms/anti-magnetism/' },
  { vi: '/co-che/chong-soc', en: '/en/mechanisms/shock-protection/' },
  { vi: '/co-che/day-toc-banh-lac', en: '/en/mechanisms/balance-and-hairspring/' },
  { vi: '/co-che/perpetual-calendar', en: '/en/mechanisms/perpetual-calendar/' },
  { vi: '/co-che/pha-trang', en: '/en/mechanisms/moon-phase/' },
  { vi: '/co-che/tourbillon', en: '/en/mechanisms/tourbillon/' },
  { vi: '/co-che/diem-chuong', en: '/en/mechanisms/minute-repeater/' },
  // Từ điển
  { vi: '/tu-dien/movement', en: '/en/glossary/movement/' },
  { vi: '/tu-dien/calibre', en: '/en/glossary/calibre/' },
  { vi: '/tu-dien/banh-thoat', en: '/en/glossary/escape-wheel/' },
  { vi: '/tu-dien/day-toc-banh-lac', en: '/en/glossary/hairspring/' },
  { vi: '/tu-dien/rotor', en: '/en/glossary/rotor/' },
  { vi: '/tu-dien/power-reserve', en: '/en/glossary/power-reserve/' },
  { vi: '/tu-dien/gmt', en: '/en/glossary/gmt/' },
  { vi: '/tu-dien/chronograph', en: '/en/glossary/chronograph/' },
  { vi: '/tu-dien/tachymeter', en: '/en/glossary/tachymeter/' },
  { vi: '/tu-dien/num-van', en: '/en/glossary/crown/' },
  { vi: '/tu-dien/day-cot', en: '/en/glossary/mainspring/' },
  { vi: '/tu-dien/thung-cot', en: '/en/glossary/barrel/' },
  { vi: '/tu-dien/incabloc', en: '/en/glossary/incabloc/' },
  { vi: '/tu-dien/chronometer', en: '/en/glossary/chronometer/' },
  { vi: '/tu-dien/metas', en: '/en/glossary/master-chronometer/' },
  { vi: '/tu-dien/vph', en: '/en/glossary/beat-rate/' },
  { vi: '/tu-dien/perpetual-calendar', en: '/en/glossary/perpetual-calendar/' },
  { vi: '/tu-dien/tourbillon', en: '/en/glossary/tourbillon/' },
  { vi: '/tu-dien/minute-repeater', en: '/en/glossary/minute-repeater/' },
  { vi: '/tu-dien/guilloche', en: '/en/glossary/guilloche/' },
  { vi: '/tu-dien/perlage', en: '/en/glossary/perlage/' },
  { vi: '/tu-dien/cotes-de-geneve', en: '/en/glossary/geneva-stripes/' },
  { vi: '/huong-dan/hoan-thien-thu-cong-dong-ho', en: '/en/guides/movement-finishing/' },
  // Thương hiệu
  { vi: '/thuong-hieu/rolex', en: '/en/brands/rolex/' },
  { vi: '/thuong-hieu/omega', en: '/en/brands/omega/' },
  { vi: '/thuong-hieu/seiko', en: '/en/brands/seiko/' },
  // Mẫu iconic
  { vi: '/mau-iconic/rolex-submariner', en: '/en/iconic-watches/rolex-submariner/' },
  { vi: '/mau-iconic/omega-speedmaster', en: '/en/iconic-watches/omega-speedmaster/' },
  { vi: '/mau-iconic/cartier-tank', en: '/en/iconic-watches/cartier-tank/' },
  { vi: '/mau-iconic/rolex-gmt-master', en: '/en/iconic-watches/rolex-gmt-master/' },
];

export const ALL_PAIRS: RoutePair[] = [...STATIC_PAIRS, ...INDEX_PAIRS, ...ARTICLE_PAIRS];

const byVi = new Map(ALL_PAIRS.map((p) => [p.vi.replace(/\/$/, ''), p]));
const byEn = new Map(ALL_PAIRS.map((p) => [p.en.replace(/\/$/, ''), p]));

const norm = (p: string) => p.replace(/\/$/, '') || '/';

/** Đường dẫn tiếng Anh tương ứng của một trang tiếng Việt (undefined = chưa dịch) */
export function englishPathFor(viPath: string): string | undefined {
  return byVi.get(norm(viPath))?.en;
}

/** Đường dẫn tiếng Việt tương ứng của một trang tiếng Anh (undefined = không có cặp) */
export function vietnamesePathFor(enPath: string): string | undefined {
  return byEn.get(norm(enPath))?.vi;
}

/**
 * Địa chỉ của cùng nội dung ở ngôn ngữ khác. path truyền vào LUÔN là đường dẫn
 * tiếng Việt gốc (không tiền tố). Trả về undefined khi chưa có bản dịch —
 * nơi gọi không được tự chế URL (ví dụ chỉ thêm /en) trong trường hợp này.
 */
export function localizedHref(viPath: string, lang: Lang): string | undefined {
  if (lang === 'vi') return norm(viPath) === '/' ? '/' : viPath;
  return englishPathFor(viPath);
}

/**
 * Đích của nút chuyển ngôn ngữ cho trang hiện tại.
 * - Có cặp: về đúng trang dịch (translated = true).
 * - Chưa dịch: về trang chủ của ngôn ngữ đích (translated = false) — nơi gọi
 *   phải nói rõ điều này bằng aria-label, không dẫn tới URL rỗng/404.
 */
export function switcherTarget(pathname: string): { href: string; translated: boolean } {
  const isEn = norm(pathname).startsWith('/en');
  if (isEn) {
    const vi = vietnamesePathFor(pathname);
    return { href: vi ?? '/', translated: vi !== undefined };
  }
  const en = englishPathFor(pathname);
  return { href: en ?? '/en/', translated: en !== undefined };
}

/**
 * Các bản ngôn ngữ thay thế (cho hreflang) của một đường dẫn hiện tại.
 * Chỉ trả en khi cặp thật sự tồn tại — không bao giờ hreflang "giả".
 * x-default do nơi dùng tự thêm, luôn trỏ về bản tiếng Việt.
 */
export function getAlternates(pathname: string): { vi: string; en?: string } {
  const n = norm(pathname);
  if (n.startsWith('/en')) {
    const vi = vietnamesePathFor(pathname);
    return { vi: vi ?? '/', en: vi ? pathname : undefined };
  }
  const en = englishPathFor(pathname);
  return { vi: pathname === '/' ? '/' : pathname, en };
}

// --- Đường dẫn danh sách (collection route) theo ngôn ngữ --------------------

const EN_COLLECTION_ROUTES: Record<string, string> = {
  thuongHieu: '/en/brands',
  mauIconic: '/en/iconic-watches',
  coChe: '/en/mechanisms',
  tuDien: '/en/glossary',
  huongDan: '/en/guides',
};

const VI_COLLECTION_ROUTES: Record<string, string> = {
  thuongHieu: '/thuong-hieu',
  mauIconic: '/mau-iconic',
  coChe: '/co-che',
  tuDien: '/tu-dien',
  huongDan: '/huong-dan',
};

/** Đường dẫn một bài trong collection theo ngôn ngữ (slug đã là slug của ngôn ngữ đó) */
export function collectionHref(collection: string, slug: string, lang: Lang): string {
  const base =
    lang === 'en'
      ? EN_COLLECTION_ROUTES[collection] ?? `/${collection}`
      : VI_COLLECTION_ROUTES[collection] ?? `/${collection}`;
  return `${base}/${slug}`;
}
