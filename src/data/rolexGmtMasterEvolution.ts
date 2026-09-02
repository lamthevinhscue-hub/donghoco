// =============================================================================
// DỮ LIỆU SƠ ĐỒ TIẾN HÓA ROLEX GMT-MASTER (sơ đồ thứ hai)
// =============================================================================
// Nguồn dữ kiện DUY NHẤT của sơ đồ tiến hóa trên trang /mau-iconic/rolex-gmt-master/.
// Trích nguyên 8 mốc từ docs/ho-so-du-lieu-tien-hoa-rolex-gmt-master.md
// (ngày rà soát 01/09/2026) — mục "Đề xuất dataset cho sơ đồ".
//
// Quy tắc "thà thiếu còn hơn sai":
//   - Reference do Rolex không công bố trên trang chính hãng được đối chiếu qua
//     Hodinkee Reference Points (chuyên ngành) — xem hồ sơ dữ liệu, phần 3.
//   - 16750, 16700, bản thép 2007, các mốc 2022–2025 cố ý KHÔNG đưa — lý do ở
//     mục 5 của hồ sơ dữ liệu.
//   - Không dùng biệt danh sưu tầm ("Pepsi", "Batman"…): mô tả bằng tên màu.
//   - Không suy diễn thêm số liệu; muốn sửa/change dữ kiện phải sửa hồ sơ dữ
//     liệu trước, rồi mới sửa file này.
// =============================================================================

import type { ModelEvolutionDataset } from './modelEvolution';

export const rolexGmtMasterEvolution: ModelEvolutionDataset = {
  slug: 'rolex-gmt-master',
  name: 'Rolex GMT-Master',
  // Chỉ tiếng Việt: bản English của bài GMT-Master chưa có — dataset chưa được
  // dịch đầy đủ nên không render ở trang English (Prompt 31: chưa dịch thì ẩn).
  publishedLangs: ['vi'],
  title: 'Tiến hóa Rolex GMT-Master',
  intro:
    'Tám mốc được chọn từ hồ sơ kiểm chứng. Đây là lược đồ thay đổi thiết kế, không phải danh mục đầy đủ mọi reference.',
  milestones: [
    {
      year: 1955,
      reference: '6542',
      label: 'Ra mắt dòng',
      change: 'GMT-Master đầu tiên: vỏ Oyster, vành 24 giờ hai màu đỏ – xanh trên nền nhựa Bakelite',
      note: 'Thiết kế cho phi công hàng không đường dài; Rolex ghi năm ra mắt 1955 và ghi nhận phi công Pan Am lựa chọn',
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-gmt-master-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 1959,
      reference: '1675',
      label: 'Vành che núm xuất hiện',
      change: 'Thế hệ có vành che núm (crown guards), insert vành kim loại thay Bakelite',
      note: 'Dáng vỏ này giữ nguyên gần như trọn thế hệ sau đó',
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-gmt-master-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 1982,
      reference: '16760',
      label: 'Kim giờ chỉnh độc lập',
      change: 'GMT-Master II đầu tiên — kim giờ chỉnh độc lập từng giờ, không dừng máy',
      note: 'Rolex chính hãng ghi năm 1982; số reference do nguồn chuyên ngành đối chiếu',
      sourceUrl: 'https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii',
      sourceName: 'Rolex Newsroom',
    },
    {
      year: 1989,
      reference: '16710',
      label: 'Thế hệ 5 chữ số',
      change: 'GMT-Master II vỏ mỏng hơn với bộ máy 3185',
      note: 'Sản xuất dài 1989–2007 — một trong những GMT-Master II dài đời nhất',
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-gmt-master-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 2005,
      reference: 'GMT-Master II kỷ niệm 50 năm (bản vàng)',
      label: 'Cerachrom đầu tiên của dòng',
      change: 'Bezel gốm Cerachrom đơn màu đầu tiên của dòng GMT-Master',
      note: 'Nhân dịp 50 năm dòng GMT-Master; bản kỷ niệm đầu bằng vàng',
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-gmt-master-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 2013,
      reference: '116710BLNR',
      label: 'Cerachrom hai màu đơn khối',
      change: 'Insert gốm hai màu đầu tiên sản xuất đơn khối (xanh – đen)',
      note: 'Rolex chính hãng ghi đây là Cerachrom hai màu đơn khối đầu tiên',
      sourceUrl: 'https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii',
      sourceName: 'Rolex Newsroom',
    },
    {
      year: 2014,
      reference: '116719BLRO',
      label: 'Vành đỏ – xanh gốm',
      change: 'GMT-Master II vàng trắng với insert Cerachrom đỏ – xanh',
      note: 'Hồi sinh cặp màu của bản gốc trên vành gốm hiện đại',
      sourceUrl: 'https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii',
      sourceName: 'Rolex Newsroom',
    },
    {
      year: 2018,
      reference: '126710BLRO',
      label: 'Thép + calibre 3285',
      change: 'Vành đỏ – xanh trên bản thép; bộ máy 3285; dây Jubilee trở lại',
      note: 'Bộ máy 3285 trữ cót khoảng 70 giờ — nền của thế hệ đang bán',
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-gmt-master-reference-points',
      sourceName: 'Hodinkee',
    },
  ],
};
