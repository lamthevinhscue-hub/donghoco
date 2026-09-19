// RSS tiếng Anh — gói H08. Cùng chính sách với feed VI (src/pages/rss.xml.ts):
// 5 collection bài viết, loại trang chuyển hướng tương thích và bản nháp.
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

import { getEntriesByLang, getSlug, type ContentCollectionName } from '../../lib/content';
import { collectionHref } from '../../i18n/contentRoutes';

const BO_BAI: ContentCollectionName[] = ['mauIconic', 'thuongHieu', 'coChe', 'tuDien', 'huongDan'];
const CHUOI_COMPAT = 'Compatibility address';

export const GET: APIRoute = async (context) => {
  const site = context.site ?? new URL('https://www.kienthucdonghoco.vn');
  const cacMuc: Array<{ title: string; description: string; pubDate: Date; link: string }> = [];
  const daLoai: string[] = [];

  for (const ten of BO_BAI) {
    const entries = await getEntriesByLang(ten, 'en');
    for (const e of entries) {
      const slug = getSlug(e);
      const duLieu = e.data as { title?: string; excerpt?: string; date?: string };
      if (typeof duLieu.excerpt === 'string' && duLieu.excerpt.startsWith(CHUOI_COMPAT)) {
        daLoai.push(`${ten}/en/${slug}: compatibility redirect page`);
        continue;
      }
      const ngay = duLieu.date ? new Date(duLieu.date) : null;
      if (!ngay || Number.isNaN(ngay.getTime())) {
        daLoai.push(`${ten}/en/${slug}: missing or invalid date`);
        continue;
      }
      cacMuc.push({
        title: duLieu.title ?? slug,
        description: duLieu.excerpt ?? '',
        pubDate: ngay,
        link: `${collectionHref(ten, slug, 'en')}/`,
      });
    }
  }

  // Mới nhất lên đầu; trùng ngày thì xếp theo path tăng dần (tie-break cố định)
  cacMuc.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime() || (a.link < b.link ? -1 : a.link > b.link ? 1 : 0));

  const phanHoi = await rss({
    title: 'Đồng Hồ Cơ — mechanical watch knowledge',
    description: 'New articles on mechanical watches: brands, iconic models, mechanisms, glossary and guides.',
    site,
    items: cacMuc,
    customData: '<language>en-us</language>',
  });

  // MIME chuẩn RSS (phán quyết H08): application/rss+xml
  return new Response(phanHoi.body, {
    status: 200,
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
