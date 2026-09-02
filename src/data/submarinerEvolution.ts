// =============================================================================
// DỮ LIỆU SƠ ĐỒ TIẾN HÓA ROLEX SUBMARINER (thí điểm — sơ đồ đầu tiên, song ngữ)
// =============================================================================
// Nguồn dữ kiện DUY NHẤT của sơ đồ tiến hóa trên /mau-iconic/rolex-submariner/
// và /en/iconic-watches/rolex-submariner/. Trích nguyên 8 mốc từ
// docs/ho-so-du-lieu-tien-hoa-rolex-submariner.md (ngày rà soát 30/08/2026) —
// mục "Đề xuất dataset cho sơ đồ thí điểm".
//
// Song ngữ (Prompt 31): title/intro/label/change/note là LocalizedText — bản
// en diễn đạt lại ĐÚNG dữ kiện của bản vi, không thêm mốc/thông số/claim mới.
// reference, sourceName là tên riêng — không dịch.
//
// Quy tắc "thà thiếu còn hơn sai":
//   - KHÔNG thêm reference khác vào đây (6200, 6538, 14060, 14060M... cố ý
//     không đưa vì năm còn mâu thuẫn giữa các nguồn — xem bảng "Cần kiểm
//     chứng" trong hồ sơ dữ liệu).
//   - Không suy diễn thêm số liệu từ kiến thức bên ngoài; muốn sửa/change
//     dữ kiện phải sửa hồ sơ dữ liệu trước, rồi mới sửa file này.
//   - Không đưa giá, đầu tư, độ hiếm hay biệt danh sưu tầm.
// =============================================================================

import type { ModelEvolutionDataset } from './modelEvolution';

export const submarinerEvolution: ModelEvolutionDataset = {
  slug: 'rolex-submariner',
  name: 'Rolex Submariner',
  publishedLangs: ['vi', 'en'],
  title: {
    vi: 'Tiến hóa Rolex Submariner',
    en: 'Rolex Submariner evolution',
  },
  intro: {
    vi: 'Tám mốc được chọn từ hồ sơ kiểm chứng. Đây là lược đồ thay đổi thiết kế, không phải danh mục đầy đủ mọi reference.',
    en: 'Eight milestones selected from the verified research file. Follow the major reference changes without treating this as a complete catalogue or a buying guide.',
  },
  milestones: [
    {
      year: 1953,
      reference: '6204',
      label: {
        vi: 'Khởi đầu dòng',
        en: 'Where the line begins',
      },
      change: {
        vi: 'Reference đầu tiên có chữ “Submariner” trên mặt số, chống nước 100m',
        en: 'First reference to carry “Submariner” on the dial, water-resistant to 100m',
      },
      note: {
        vi: 'Rolex công bố năm 1954, nhưng những chiếc sớm nhất được định ngày cuối 1953 bằng số serial',
        en: 'Rolex presented it in 1954, but the earliest examples are dated to late 1953 by serial number',
      },
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-submariner-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 1959,
      reference: '5512',
      label: {
        vi: 'Vành che núm xuất hiện',
        en: 'Crown guards appear',
      },
      change: {
        vi: 'Submariner đầu tiên có vành che núm bảo vệ mão vặn',
        en: 'First Submariner with crown guards protecting the winding crown',
      },
      note: {
        vi: 'Từ đây dáng Submariner gần như giữ nguyên tới ngày nay',
        en: 'From here the Submariner silhouette has barely changed to this day',
      },
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-submariner-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 1962,
      reference: '5513',
      label: {
        vi: 'Bản không lịch kinh điển',
        en: 'The classic no-date',
      },
      change: {
        vi: 'Bản không lịch, không chứng nhận chronometer, của cùng dáng vỏ 5512',
        en: 'No-date and non-chronometer, sharing the 5512 case',
      },
      note: {
        vi: 'Sản xuất liền 27 năm',
        en: 'Produced for 27 consecutive years',
      },
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-submariner-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 1969,
      reference: '1680',
      label: {
        vi: 'Lịch ngày đầu tiên',
        en: 'The first Date',
      },
      change: {
        vi: 'Submariner đầu tiên có lịch ngày, bộ máy 1575',
        en: 'First Submariner with a date, calibre 1575',
      },
      note: {
        vi: 'Rolex chính thức ghi 1969; một số nguồn thương mại ghi 1966–1967 nên không dùng các năm đó làm dữ kiện',
        en: 'Rolex officially dates it to 1969; some commercial sources cite 1966–1967, so those years are not used as facts',
      },
      sourceUrl: 'https://newsroom.rolex.com/watches/oyster-collection/submariner',
      sourceName: 'Rolex Newsroom',
    },
    {
      year: 1979,
      reference: '16800',
      label: {
        vi: 'Kính sapphire + 300m',
        en: 'Sapphire crystal + 300m',
      },
      change: {
        vi: 'Submariner Date đầu tiên có kính sapphire và mức chống nước 300m',
        en: 'First Submariner Date with a sapphire crystal and a 300m water-resistance rating',
      },
      note: {
        vi: 'Rolex ghi mức 300m của bản Date từ 1979',
        en: 'Rolex lists the 300m rating for the Date from 1979',
      },
      sourceUrl: 'https://monochrome-watches.com/rolex-submariner-history-part-3-the-5-digit-references/',
      sourceName: 'Monochrome',
    },
    {
      year: 1988,
      reference: '16610',
      label: {
        vi: 'Calibre 3135',
        en: 'Calibre 3135',
      },
      change: {
        vi: 'Bộ máy 3135 thay 3035',
        en: 'Calibre 3135 replaces 3035',
      },
      note: {
        vi: 'Thế hệ 5 chữ số cuối cùng của Submariner Date, sản xuất tới 2010',
        en: 'The last five-digit Submariner Date generation, produced until 2010',
      },
      sourceUrl: 'https://monochrome-watches.com/rolex-submariner-history-part-3-the-5-digit-references/',
      sourceName: 'Monochrome',
    },
    {
      year: 2012,
      reference: '114060',
      label: {
        vi: 'Bezel gốm',
        en: 'Ceramic bezel',
      },
      change: {
        vi: 'Bản không lịch chuyển sang bezel gốm Cerachrom và vỏ Super Case',
        en: 'The no-date moves to the Cerachrom ceramic bezel and the Super Case',
      },
      note: {
        vi: 'Thế hệ gốm đầu tiên của bản không lịch',
        en: 'The no-date\u2019s first ceramic generation',
      },
      sourceUrl: 'https://monochrome-watches.com/rolex-submariner-history-part-4-modern-references/',
      sourceName: 'Monochrome',
    },
    {
      year: 2020,
      reference: '124060',
      label: {
        vi: 'Thế hệ hiện tại 41mm',
        en: 'The current 41mm generation',
      },
      change: {
        vi: 'Vỏ 41mm, bộ máy 3230, trữ cót khoảng 70 giờ',
        en: '41mm case, calibre 3230, power reserve of roughly 70 hours',
      },
      note: {
        vi: 'Ra mắt tháng 9/2020; bản không lịch đang bán',
        en: 'Introduced in September 2020; the no-date currently in the catalogue',
      },
      sourceUrl: 'https://newsroom.rolex.com/watches/oyster-collection/submariner',
      sourceName: 'Rolex Newsroom',
    },
  ],
};
