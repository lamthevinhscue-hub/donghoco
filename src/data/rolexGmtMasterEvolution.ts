// =============================================================================
// DỮ LIỆU SƠ ĐỒ TIẾN HÓA ROLEX GMT-MASTER (sơ đồ thứ hai — song ngữ)
// =============================================================================
// Nguồn dữ kiện DUY NHẤT của sơ đồ tiến hóa trên /mau-iconic/rolex-gmt-master/
// và /en/iconic-watches/rolex-gmt-master/. Trích nguyên 8 mốc từ
// docs/ho-so-du-lieu-tien-hoa-rolex-gmt-master.md (ngày rà soát 01/09/2026) —
// mục "Đề xuất dataset cho sơ đồ".
//
// Song ngữ (Prompt 32): title/intro/label/change/note là LocalizedText — bản
// en diễn đạt lại ĐÚNG dữ kiện của bản vi, không làm mạnh hơn hay suy diễn.
// reference, sourceName là tên riêng — không dịch.
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
  publishedLangs: ['vi', 'en'],
  title: {
    vi: 'Tiến hóa Rolex GMT-Master',
    en: 'Rolex GMT-Master evolution',
  },
  intro: {
    vi: 'Tám mốc được chọn từ hồ sơ kiểm chứng. Đây là lược đồ thay đổi thiết kế, không phải danh mục đầy đủ mọi reference.',
    en: 'Eight milestones selected from the verified research file. Follow the major reference changes without treating this as a complete catalogue or a buying guide.',
  },
  milestones: [
    {
      year: 1955,
      reference: '6542',
      label: {
        vi: 'Ra mắt dòng',
        en: 'Where the line begins',
      },
      change: {
        vi: 'GMT-Master đầu tiên: vỏ Oyster, vành 24 giờ hai màu đỏ – xanh trên nền nhựa Bakelite',
        en: 'The first GMT-Master: Oyster case, red-and-blue 24-hour Bakelite bezel insert',
      },
      note: {
        vi: 'Thiết kế cho phi công hàng không đường dài; Rolex ghi năm ra mắt 1955 và ghi nhận phi công Pan Am lựa chọn',
        en: 'Designed for long-haul pilots; Rolex dates the launch to 1955 and notes the choice of Pan Am pilots',
      },
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-gmt-master-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 1959,
      reference: '1675',
      label: {
        vi: 'Vành che núm xuất hiện',
        en: 'Crown guards appear',
      },
      change: {
        vi: 'Thế hệ có vành che núm (crown guards), insert vành kim loại thay Bakelite',
        en: 'This generation adds crown guards and a metal bezel insert in place of Bakelite',
      },
      note: {
        vi: 'Dáng vỏ này giữ nguyên gần như trọn thế hệ sau đó',
        en: 'This case shape stays essentially unchanged through the following generation',
      },
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-gmt-master-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 1982,
      reference: '16760',
      label: {
        vi: 'Kim giờ chỉnh độc lập',
        en: 'Independently adjustable hour hand',
      },
      change: {
        vi: 'GMT-Master II đầu tiên — kim giờ chỉnh độc lập từng giờ, không dừng máy',
        en: 'The first GMT-Master II — the local hour hand sets independently, hour by hour, without stopping the movement',
      },
      note: {
        vi: 'Rolex chính hãng ghi năm 1982; số reference do nguồn chuyên ngành đối chiếu',
        en: 'Rolex officially dates it to 1982; the reference number is cross-checked through specialist sources',
      },
      sourceUrl: 'https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii',
      sourceName: 'Rolex Newsroom',
    },
    {
      year: 1989,
      reference: '16710',
      label: {
        vi: 'Thế hệ 5 chữ số',
        en: 'The five-digit generation',
      },
      change: {
        vi: 'GMT-Master II vỏ mỏng hơn với bộ máy 3185',
        en: 'A slimmer GMT-Master II with calibre 3185',
      },
      note: {
        vi: 'Sản xuất dài 1989–2007 — một trong những GMT-Master II dài đời nhất',
        en: 'Produced from 1989 to 2007 — one of the longest-lived GMT-Master II generations',
      },
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-gmt-master-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 2005,
      reference: {
        vi: 'GMT-Master II kỷ niệm 50 năm (bản vàng)',
        en: 'GMT-Master II 50th anniversary (gold)',
      },
      label: {
        vi: 'Cerachrom đầu tiên của dòng',
        en: 'The line\u2019s first Cerachrom',
      },
      change: {
        vi: 'Bezel gốm Cerachrom đơn màu đầu tiên của dòng GMT-Master',
        en: 'The GMT-Master line\u2019s first single-colour Cerachrom ceramic bezel',
      },
      note: {
        vi: 'Nhân dịp 50 năm dòng GMT-Master; bản kỷ niệm đầu bằng vàng',
        en: 'Marking 50 years of the GMT-Master line; the first anniversary version in gold',
      },
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-gmt-master-reference-points',
      sourceName: 'Hodinkee',
    },
    {
      year: 2013,
      reference: '116710BLNR',
      label: {
        vi: 'Cerachrom hai màu đơn khối',
        en: 'A two-colour Cerachrom in one piece',
      },
      change: {
        vi: 'Insert gốm hai màu đầu tiên sản xuất đơn khối (xanh – đen)',
        en: 'The first two-colour ceramic insert produced as a single piece (blue and black)',
      },
      note: {
        vi: 'Rolex chính hãng ghi đây là Cerachrom hai màu đơn khối đầu tiên',
        en: 'Rolex officially describes it as the first single-piece two-colour Cerachrom',
      },
      sourceUrl: 'https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii',
      sourceName: 'Rolex Newsroom',
    },
    {
      year: 2014,
      reference: '116719BLRO',
      label: {
        vi: 'Vành đỏ – xanh gốm',
        en: 'The red-and-blue ceramic bezel',
      },
      change: {
        vi: 'GMT-Master II vàng trắng với insert Cerachrom đỏ – xanh',
        en: 'A white-gold GMT-Master II with a red-and-blue Cerachrom insert',
      },
      note: {
        vi: 'Hồi sinh cặp màu của bản gốc trên vành gốm hiện đại',
        en: 'The original colour pairing revived on a modern ceramic bezel',
      },
      sourceUrl: 'https://newsroom.rolex.com/watches/oyster-collection/gmt-master-ii',
      sourceName: 'Rolex Newsroom',
    },
    {
      year: 2018,
      reference: '126710BLRO',
      label: {
        vi: 'Thép + calibre 3285',
        en: 'Steel + calibre 3285',
      },
      change: {
        vi: 'Vành đỏ – xanh trên bản thép; bộ máy 3285; dây Jubilee trở lại',
        en: 'The red-and-blue bezel on a steel version; calibre 3285; the Jubilee bracelet returns',
      },
      note: {
        vi: 'Bộ máy 3285 trữ cót khoảng 70 giờ — nền của thế hệ đang bán',
        en: 'Calibre 3285 offers a power reserve of around 70 hours — the base of the current generation',
      },
      sourceUrl: 'https://www.hodinkee.com/articles/rolex-gmt-master-reference-points',
      sourceName: 'Hodinkee',
    },
  ],
};
