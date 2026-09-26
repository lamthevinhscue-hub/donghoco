// =============================================================================
// DỮ LIỆU SƠ ĐỒ TIẾN HÓA AUDEMARS PIGUET ROYAL OAK (song ngữ — mốc có nguồn I4)
// =============================================================================
// Nguồn dữ kiện DUY NHẤT của sơ đồ tiến hóa trên /mau-iconic/royal-oak/ và
// /en/iconic-watches/royal-oak/. Sao nguyên văn từ
// docs/ho-so-du-lieu-tien-hoa-royal-oak.md (ngày kiểm nguồn 2026-09-26) —
// từng mốc R1–R4 với URL và trích nguyên văn trong hồ sơ; hồ sơ nền I1-M4.
//
// Song ngữ: title/intro/label/change/note là LocalizedText — bản en diễn đạt
// lại ĐÚNG dữ kiện của bản vi, không thêm mốc/thông số/claim mới.
// reference, sourceName là tên riêng — không dịch.
//
// Quy tắc "thà thiếu còn hơn sai":
//   - KHÔNG dùng khẳng định "đồng hồ thể thao thép cao cấp đầu tiên" (đề bài
//     I4 và hồ sơ I1 không có câu nguồn trực tiếp).
//   - KHÔNG thêm reference 5402/14802/15202/16202 (hồ sơ không chốt số nào);
//     số reference duy nhất được chốt là Model 8638 của mốc 1976.
//   - KHÔNG dùng biệt danh "Jumbo"; không suy ra năm của bản phác thảo Genta.
//   - Không giá ngoài CHF 3.300 của mốc 1972 (claim I1-M4 đã nghiệm thu).
// =============================================================================

import type { ModelEvolutionDataset } from './modelEvolution';

export const audemarsPiguetRoyalOakEvolution: ModelEvolutionDataset = {
  slug: 'royal-oak',
  name: 'Audemars Piguet Royal Oak',
  publishedLangs: ['vi', 'en'],
  title: {
    vi: 'Tiến hóa Audemars Piguet Royal Oak',
    en: 'Audemars Piguet Royal Oak evolution',
  },
  intro: {
    vi: 'Bốn mốc theo archive hãng AP Chronicles — từ yêu cầu của nhà phân phối đến phiên bản nữ đầu tiên. Đây là lược đồ các bước mở đầu của dòng, không phải danh mục đầy đủ mọi reference.',
    en: 'Four milestones from the brand’s own AP Chronicles archives — from a distributor’s brief to the first feminine model. This traces the opening steps of the line, not a complete catalogue of references.',
  },
  milestones: [
    {
      // R1 — 1970
      year: 1970,
      reference: 'Royal Oak',
      label: {
        vi: 'Ý tưởng từ nhà phân phối',
        en: 'The distributors’ brief',
      },
      change: {
        vi: 'Ba nhà phân phối Audemars Piguet đề xuất hãng làm một đồng hồ thép vừa thể thao vừa thanh lịch',
        en: 'Three Audemars Piguet distributors ask the brand for a steel watch that is both sporty and elegant',
      },
      note: {
        vi: 'Theo archive hãng, yêu cầu này mở đầu quá trình hình thành Royal Oak',
        en: 'Per the brand’s own archives, this request set the Royal Oak in motion',
      },
      sourceUrl: 'https://apchronicles.audemarspiguet.com/en/article/birth-of-an-icon',
      sourceName: 'AP Chronicles',
    },
    {
      // R2 — 1971
      year: 1971,
      reference: 'Royal Oak',
      label: {
        vi: 'Đơn hàng vỏ thép lớn nhất hãng',
        en: 'The largest steel-case order',
      },
      change: {
        vi: 'Ngày 19/5/1971, hãng ký đơn hàng đầu tiên 1.000 vỏ thép — đơn hàng lớn nhất từng có của hãng lúc đó',
        en: 'On 19 May 1971 a first order for 1,000 steel cases was signed — the largest the brand had ever placed',
      },
      note: {
        vi: 'Một năm trước đó, ba nhà phân phối vừa đặt ra yêu cầu về đồng hồ thép thể thao',
        en: 'A year earlier, the distributors had set out the brief for a sporty steel watch',
      },
      sourceUrl: 'https://apchronicles.audemarspiguet.com/en/article/birth-of-an-icon',
      sourceName: 'AP Chronicles',
    },
    {
      // R3 — 1972
      year: 1972,
      reference: 'Royal Oak',
      label: {
        vi: 'Ra mắt tại Basel Fair',
        en: 'Basel Fair launch',
      },
      change: {
        vi: 'Trình làng tháng 4/1972 tại Basel Fair — “đồng hồ thép đắt nhất thế giới” đương thời, gây xôn xao',
        en: 'Presented at the Basel Fair in April 1972 as “the most expensive steel watch in the world”, causing a sensation',
      },
      note: {
        vi: 'Giá ra đời CHF 3.300, theo archive hãng',
        en: 'It sold for CHF 3,300 at launch, per the brand’s archives',
      },
      sourceUrl: 'https://apchronicles.audemarspiguet.com/en/article/birth-of-an-icon',
      sourceName: 'AP Chronicles',
    },
    {
      // R4 — 1976
      year: 1976,
      reference: 'Royal Oak II',
      label: {
        vi: 'Phiên bản nữ đầu tiên',
        en: 'The first feminine model',
      },
      change: {
        vi: 'Ra mắt Royal Oak II — Model 8638, phiên bản nữ đầu tiên của dòng',
        en: 'Launch of Royal Oak II, Model 8638 — the first feminine Royal Oak',
      },
      note: {
        vi: 'Ra mắt tại nhà trang sức FRED ở Paris trước khi trình làng tại Basel Fair',
        en: 'Launched at the Parisian jeweller FRED before being presented at the Basel Fair',
      },
      sourceUrl: 'https://apchronicles.audemarspiguet.com/en/article/royal-oak-2-birth-of-the-first-women-s-model',
      sourceName: 'AP Chronicles',
    },
  ],
};
