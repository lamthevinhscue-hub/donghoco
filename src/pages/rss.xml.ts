// RSS tiếng Việt — gói H08.
// Chỉ lấy bài đã xuất bản của 5 collection bài viết (loại collection `trang`:
// trang pháp lý tĩnh, không phải bài theo dòng thời gian; loại trang chuyển
// hướng tương thích và bản nháp — xem docs/nghiem-thu/H08-2026-09-20.md).
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

import { getEntriesByLang, getSlug, getCollectionRoute, type ContentCollectionName } from '../lib/content';

const BO_BAI: ContentCollectionName[] = ['mauIconic', 'thuongHieu', 'coChe', 'tuDien', 'huongDan'];
const CHUOI_COMPAT = 'Compatibility address';

export const GET: APIRoute = async (context) => {
  const site = context.site ?? new URL('https://www.kienthucdonghoco.vn');
  const cacMuc: Array<{ title: string; description: string; pubDate: Date; link: string }> = [];
  const daLoai: string[] = [];

  for (const ten of BO_BAI) {
    const entries = await getEntriesByLang(ten, 'vi');
    const route = getCollectionRoute(ten);
    for (const e of entries) {
      const slug = getSlug(e);
      const duLieu = e.data as { title?: string; excerpt?: string; date?: string };
      if (typeof duLieu.excerpt === 'string' && duLieu.excerpt.startsWith(CHUOI_COMPAT)) {
        daLoai.push(`${ten}/vi/${slug}: trang chuyển hướng tương thích`);
        continue;
      }
      const ngay = duLieu.date ? new Date(duLieu.date) : null;
      if (!ngay || Number.isNaN(ngay.getTime())) {
        daLoai.push(`${ten}/vi/${slug}: thiếu ngày hoặc ngày không hợp lệ`);
        continue;
      }
      cacMuc.push({
        title: duLieu.title ?? slug,
        description: duLieu.excerpt ?? '',
        pubDate: ngay,
        link: `${route}/${slug}/`,
      });
    }
  }

  // Mới nhất lên đầu; trùng ngày thì xếp theo path tăng dần (tie-break cố định)
  cacMuc.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime() || (a.link < b.link ? -1 : a.link > b.link ? 1 : 0));

  const phanHoi = await rss({
    title: 'Đồng Hồ Cơ — kiến thức đồng hồ cơ',
    description: 'Bài mới về đồng hồ cơ: thương hiệu, mẫu biểu tượng, cơ chế, từ điển và hướng dẫn.',
    site,
    items: cacMuc,
    customData: '<language>vi-vn</language>',
  });

  // MIME chuẩn RSS (phán quyết H08): application/rss+xml
  return new Response(phanHoi.body, {
    status: 200,
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
