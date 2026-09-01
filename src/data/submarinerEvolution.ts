// =============================================================================
// DỮ LIỆU SƠ ĐỒ TIẾN HÓA ROLEX SUBMARINER (thí điểm — sơ đồ đầu tiên)
// =============================================================================
// Nguồn dữ kiện DUY NHẤT của sơ đồ tiến hóa trên trang /mau-iconic/rolex-submariner/.
// Trích nguyên 8 mốc từ docs/ho-so-du-lieu-tien-hoa-rolex-submariner.md
// (ngày rà soát 30/08/2026) — mục "Đề xuất dataset cho sơ đồ thí điểm".
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
  title: 'Tiến hóa Rolex Submariner',
  intro:
    'Tám mốc được chọn từ hồ sơ kiểm chứng. Đây là lược đồ thay đổi thiết kế, không phải danh mục đầy đủ mọi reference.',
  milestones: [
    {
      year: 1953,
      reference: '6204',
      label: 'Khởi đầu dòng',
      change: 'Reference đầu tiên có chữ “Submariner” trên mặt số, chống nước 100m',
      note: 'Rolex công bố năm 1954, nhưng những chiếc sớm nhất được định ngày cuối 1953 bằng số serial',
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-submariner-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 1959,
      reference: '5512',
      label: 'Vành che núm xuất hiện',
      change: 'Submariner đầu tiên có vành che núm bảo vệ mão vặn',
      note: 'Từ đây dáng Submariner gần như giữ nguyên tới ngày nay',
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-submariner-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 1962,
      reference: '5513',
      label: 'Bản không lịch kinh điển',
      change: 'Bản không lịch, không chứng nhận chronometer, của cùng dáng vỏ 5512',
      note: 'Sản xuất liền 27 năm',
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-submariner-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 1969,
      reference: '1680',
      label: 'Lịch ngày đầu tiên',
      change: 'Submariner đầu tiên có lịch ngày, bộ máy 1575',
      note: 'Rolex chính thức ghi 1969; một số nguồn thương mại ghi 1966–1967 nên không dùng các năm đó làm dữ kiện',
      sourceUrl: 'https://newsroom.rolex.com/watches/oyster-collection/submariner',
      sourceName: 'Rolex Newsroom',
    },
    {
      year: 1979,
      reference: '16800',
      label: 'Kính sapphire + 300m',
      change: 'Submariner Date đầu tiên có kính sapphire và mức chống nước 300m',
      note: 'Rolex ghi mức 300m của bản Date từ 1979',
      sourceUrl: 'https://monochrome-watches.com/rolex-submariner-history-part-3-the-5-digit-references/',
      sourceName: 'Monochrome',
    },
    {
      year: 1988,
      reference: '16610',
      label: 'Calibre 3135',
      change: 'Bộ máy 3135 thay 3035',
      note: 'Thế hệ 5 chữ số cuối cùng của Submariner Date, sản xuất tới 2010',
      sourceUrl: 'https://monochrome-watches.com/rolex-submariner-history-part-3-the-5-digit-references/',
      sourceName: 'Monochrome',
    },
    {
      year: 2012,
      reference: '114060',
      label: 'Bezel gốm',
      change: 'Bản không lịch chuyển sang bezel gốm Cerachrom và vỏ Super Case',
      note: 'Thế hệ gốm đầu tiên của bản không lịch',
      sourceUrl: 'https://monochrome-watches.com/rolex-submariner-history-part-4-modern-references/',
      sourceName: 'Monochrome',
    },
    {
      year: 2020,
      reference: '124060',
      label: 'Thế hệ hiện tại 41mm',
      change: 'Vỏ 41mm, bộ máy 3230, trữ cót khoảng 70 giờ',
      note: 'Ra mắt tháng 9/2020; bản không lịch đang bán',
      sourceUrl: 'https://newsroom.rolex.com/watches/oyster-collection/submariner',
      sourceName: 'Rolex Newsroom',
    },
  ],
};
