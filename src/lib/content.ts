// =============================================================================
// THƯ VIỆN LẤY NỘI DUNG THEO NGÔN NGỮ
// =============================================================================
// Tệp này chứa các hàm giúp lấy bài viết từ content collections theo ngôn ngữ
// hiện tại. Cấu trúc thư mục: src/content/<collection>/<lang>/<slug>.md
//
// Bạn KHÔNG cần đụng tới tệp này.
// =============================================================================

import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

// Danh sách các collection có nội dung đa ngôn ngữ
export type ContentCollectionName =
  | 'thuongHieu'
  | 'mauIconic'
  | 'coChe'
  | 'tuDien'
  | 'huongDan'
  | 'trang';

// Đường dẫn gốc (không tính tiền tố ngôn ngữ) cho từng collection
const COLLECTION_ROUTES: Record<ContentCollectionName, string> = {
  thuongHieu: '/thuong-hieu',
  mauIconic: '/mau-iconic',
  coChe: '/co-che',
  tuDien: '/tu-dien',
  huongDan: '/huong-dan',
  trang: '', // trang tĩnh: mỗi bài có route riêng (VD: /ban-quyen), không có tiền tố chung
};

export function getCollectionRoute(name: ContentCollectionName): string {
  return COLLECTION_ROUTES[name];
}

// Lấy tất cả bài viết của một collection, lọc theo ngôn ngữ
// id có dạng: "vi/rolex.md" hoặc "en/rolex.md"
//
// Cache: cùng collection + lang gọi nhiều lần trong một lần build chỉ tải một.
// Khóa theo `${collection}:${lang}`. Rõ ràng trong cùng một quá trình build.
const _entriesCache = new Map<string, CollectionEntry<ContentCollectionName>[]>();

export async function getEntriesByLang(
  collection: ContentCollectionName,
  lang: Lang,
): Promise<CollectionEntry<ContentCollectionName>[]> {
  const cacheKey = `${collection}:${lang}`;
  const cached = _entriesCache.get(cacheKey);
  if (cached) return cached;

  const all = await getCollection(collection, ({ data }) => {
    // Bỏ qua bản nháp khi build production
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  // Lọc theo ngôn ngữ: id bắt đầu bằng "vi/" hoặc "en/"
  const filtered = all.filter((entry) => entry.id.startsWith(`${lang}/`));

  // Sắp xếp: bài mới nhất lên đầu (nếu có ngày), ngược lại theo tên
  const sorted = filtered.sort((a, b) => {
    const dateA = a.data.date;
    const dateB = b.data.date;
    if (dateA && dateB) {
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    }
    return a.data.title.localeCompare(b.data.title);
  });

  _entriesCache.set(cacheKey, sorted);
  return sorted;
}

// Trích xuất slug (địa chỉ web) từ một entry
// id = "vi/rolex.md" -> slug = "rolex"
export function getSlug(entry: CollectionEntry<ContentCollectionName>): string {
  return entry.id.split('/').pop()?.replace(/\.(md|mdx)$/, '') ?? entry.id;
}

// Lấy MỘT entry đầy đủ (có khả năng render .Content) theo slug và ngôn ngữ.
// Slug LUÔN lấy từ tên file (getSlug), không dùng custom_slug — quy ước thống nhất.
// Trả về trực tiếp entry từ getCollection (đã có đầy đủ .Content),
// không gọi lại getEntry (có vấn đề với id có đường dẫn con).
export async function getFullEntry(
  collection: ContentCollectionName,
  slug: string,
  lang: Lang,
): Promise<CollectionEntry<ContentCollectionName> | undefined> {
  const entries = await getEntriesByLang(collection, lang);
  const found = entries.find((entry) => getSlug(entry) === slug);
  return found; // entry này đã có đầy đủ .Content từ getCollection
}
