// =============================================================================
// DỮ LIỆU SƠ ĐỒ TIẾN HÓA JAEGER-LECOULTRE REVERSO (song ngữ — mốc có nguồn I4)
// =============================================================================
// Nguồn dữ kiện DUY NHẤT của sơ đồ tiến hóa trên /mau-iconic/reverso/ và
// /en/iconic-watches/reverso/. Sao nguyên văn từ
// docs/ho-so-du-lieu-tien-hoa-reverso.md (ngày kiểm nguồn 2026-09-26) —
// từng mốc V1–V4 với URL và trích nguyên văn trong hồ sơ; hồ sơ nền I2-M1.
// Cả bốn mốc dùng chung một URL lịch sử chính hãng Jaeger-LeCoultre.
//
// Song ngữ: title/intro/label/change/note là LocalizedText — bản en diễn đạt
// lại ĐÚNG dữ kiện của bản vi, không thêm mốc/thông số/claim mới.
// reference, sourceName là tên riêng — không dịch.
//
// Quy tắc "thà thiếu còn hơn sai":
//   - KHÔNG dùng "Cottier" — hãng ghi thiết kế là René-Alfred Chauvot.
//   - KHÔNG dùng etymology "Reverso = tiếng Latin" — không có nguyên văn.
//   - Tập mốc CHỐT theo hồ sơ (checker I4 kiểm cứng từng cặp năm+reference):
//     1930/Reverso, 1931/Reverso, 1994/Reverso Duoface, 1997/Reverso Duetto.
//     Soixantième 1991 có nguồn nhưng hồ sơ không chọn (quyết định biên tập
//     về số mốc — hồ sơ mục 2), không đưa vào dataset.
//   - Tên có dấu (César de Trey) chỉ nêu trong bản VI; bản EN diễn đạt không
//     dấu cùng dữ kiện (hồ sơ mục 1, giới hạn V1).
// =============================================================================

import type { ModelEvolutionDataset } from './modelEvolution';

export const jaegerLeCoultreReversoEvolution: ModelEvolutionDataset = {
  slug: 'reverso',
  name: 'Jaeger-LeCoultre Reverso',
  publishedLangs: ['vi', 'en'],
  title: {
    vi: 'Tiến hóa Jaeger-LeCoultre Reverso',
    en: 'Jaeger-LeCoultre Reverso evolution',
  },
  intro: {
    vi: 'Bốn mốc theo trang lịch sử chính hãng Jaeger-LeCoultre — từ sân polo đến hướng hai mặt số. Đây là lược đồ các bước chính, không phải danh mục đầy đủ.',
    en: 'Four milestones from Jaeger-LeCoultre’s own history page — from the polo field to the two-dial direction. This traces the major steps, not a complete catalogue.',
  },
  milestones: [
    {
      // V1 — 1930
      year: 1930,
      reference: 'Reverso',
      label: {
        vi: 'Thách thức trên sân polo',
        en: 'The polo challenge',
      },
      change: {
        vi: 'Doanh nhân César de Trey nhận thách thức tìm cách bảo vệ mặt kính đồng hồ cho người chơi polo',
        en: 'A businessman is challenged to find a way to protect a watch’s glass for polo players',
      },
      note: {
        vi: 'Ông nhờ Jacques-David LeCoultre chịu sản xuất và René-Alfred Chauvot thiết kế',
        en: 'Designer Chauvot is engaged to design it; Jacques-David LeCoultre produces the watch',
      },
      sourceUrl: 'https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history',
      sourceName: 'Jaeger-LeCoultre',
    },
    {
      // V2 — 1931
      year: 1931,
      reference: 'Reverso',
      label: {
        vi: 'Đơn sáng chế Paris',
        en: 'The Paris patent',
      },
      change: {
        vi: 'Ngày 4/3/1931, văn phòng sáng chế Paris nhận đơn đăng ký “a watch capable of sliding in its support and being completely turned over”',
        en: 'On 4 March 1931 the Paris patent office receives an application for “a watch capable of sliding in its support and being completely turned over”',
      },
      note: {
        vi: 'Những chiếc đầu tiên bán chưa đầy 9 tháng sau khi nộp đơn; tên Reverso được đăng ký vào tháng 11 cùng năm',
        en: 'The first pieces go on sale less than nine months after the filing; the Reverso name is registered that November',
      },
      sourceUrl: 'https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history',
      sourceName: 'Jaeger-LeCoultre',
    },
    {
      // V3 — 1994
      year: 1994,
      reference: 'Reverso Duoface',
      label: {
        vi: 'Hai mặt số, hai múi giờ',
        en: 'Two dials, two timezones',
      },
      change: {
        vi: 'Reverso Duoface ra đời — hai mặt số tương phản và múi giờ thứ hai',
        en: 'The Reverso Duoface is developed — two contrasting dials and a second timezone',
      },
      note: {
        vi: 'Trích trang lịch sử hãng: “Originally developed in 1994”',
        en: 'Per the brand’s history page: “Originally developed in 1994”',
      },
      sourceUrl: 'https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history',
      sourceName: 'Jaeger-LeCoultre',
    },
    {
      // V4 — 1997
      year: 1997,
      reference: 'Reverso Duetto',
      label: {
        vi: 'Duetto dành cho nữ',
        en: 'The Duetto for women',
      },
      change: {
        vi: 'Reverso Duetto ra mắt — được hãng thiết kế đặc biệt dành cho nữ',
        en: 'The Reverso Duetto is introduced, specially conceived for women',
      },
      note: {
        vi: 'Trích hãng: “Introduced in 1997, the Duetto has been specially conceived for women.”',
        en: 'Per the brand: “Introduced in 1997, the Duetto has been specially conceived for women.”',
      },
      sourceUrl: 'https://www.jaeger-lecoultre.com/us-en/jaeger-lecoultre-reverso-history',
      sourceName: 'Jaeger-LeCoultre',
    },
  ],
};
