// =============================================================================
// DỮ LIỆU SƠ ĐỒ TIẾN HÓA BLANCPAIN FIFTY FATHOMS (song ngữ — mốc có nguồn I4)
// =============================================================================
// Nguồn dữ kiện DUY NHẤT của sơ đồ tiến hóa trên /mau-iconic/fifty-fathoms/ và
// /en/iconic-watches/fifty-fathoms/. Sao nguyên văn từ
// docs/ho-so-du-lieu-tien-hoa-fifty-fathoms.md (ngày kiểm nguồn 2026-09-26) —
// từng mốc F1–F4 với URL và trích nguyên văn trong hồ sơ; hồ sơ nền I2-M3.
//
// Song ngữ: title/intro/label/change/note là LocalizedText — bản en diễn đạt
// lại ĐÚNG dữ kiện của bản vi, không thêm mốc/thông số/claim mới.
// reference, sourceName là tên riêng — không dịch.
//
// Quy tắc "thà thiếu còn hơn sai":
//   - KHÔNG gọi vành xoay "một chiều/unidirectional" — nguồn archive chỉ xác
//     nhận vành xoay kèm cơ chế khóa chống xoay nhầm có bằng sáng chế.
//   - KHÔNG quy đổi "50 fathoms ≈ 91 m/300 ft" — không con số trong nguồn.
//   - KHÔNG suy ý nghĩa "kỷ niệm 50 năm" của Anniversary — archive không viết.
//   - KHÔNG thêm chi tiết quân sự ngoài Maloubier/Riffaud ở note mốc 1953.
// =============================================================================

import type { ModelEvolutionDataset } from './modelEvolution';

export const blancpainFiftyFathomsEvolution: ModelEvolutionDataset = {
  slug: 'fifty-fathoms',
  name: 'Blancpain Fifty Fathoms',
  publishedLangs: ['vi', 'en'],
  title: {
    vi: 'Tiến hóa Blancpain Fifty Fathoms',
    en: 'Blancpain Fifty Fathoms evolution',
  },
  intro: {
    vi: 'Bốn mốc theo nguồn chính hãng Blancpain và archive Lettres du Brassus. Khoảng cách giữa các mốc phản ánh đúng những gì nguồn ghi lại, không phải danh mục đầy đủ.',
    en: 'Four milestones from Blancpain’s own pages and the Lettres du Brassus archives. The gaps between milestones reflect what the sources record — this is not a complete catalogue.',
  },
  milestones: [
    {
      // F1 — 1953
      year: 1953,
      reference: 'Fifty Fathoms',
      label: {
        vi: 'Đồng hồ lặn hiện đại đầu tiên (theo Blancpain)',
        en: 'The first modern diver’s watch (per Blancpain)',
      },
      change: {
        vi: 'Blancpain giới thiệu Fifty Fathoms — theo hãng là đồng hồ lặn hiện đại đầu tiên',
        en: 'Blancpain presents the Fifty Fathoms — the first modern diver’s watch, in the brand’s own words',
      },
      note: {
        vi: 'Dòng sinh ra từ nhu cầu của Captain Robert “Bob” Maloubier và Lieutenant Claude Riffaud, đoàn thợ lặn chiến đấu Pháp — kể theo archive hãng',
        en: 'Born from the needs of Captain Robert “Bob” Maloubier and Lieutenant Claude Riffaud of the French combat diving corps, per the brand’s archives',
      },
      sourceUrl: 'https://www.blancpain.com/en/collections/fifty-fathoms-collection',
      sourceName: 'Blancpain',
    },
    {
      // F2 — 1999
      year: 1999,
      reference: 'Fifty Fathoms',
      label: {
        vi: 'Mẫu mới sau gần 20 năm',
        en: 'A new model after nearly 20 years',
      },
      change: {
        vi: 'Mẫu Fifty Fathoms mới đầu tiên xuất hiện — thuộc bộ ba Trilogy Collection, trong thời Jean-Claude Biver',
        en: 'A new Fifty Fathoms appears — the one from the Trilogy Collection, in the Jean-Claude Biver era',
      },
      note: {
        vi: 'Archive hãng: “Not until nearly 20 years later, in 1999, did another model appear”',
        en: 'Per the archives: “Not until nearly 20 years later, in 1999, did another model appear”',
      },
      sourceUrl: 'https://lettresdubrassus.blancpain.com/en/issue-13/history-and-legend',
      sourceName: 'Lettres du Brassus',
    },
    {
      // F3 — 2003
      year: 2003,
      reference: 'Anniversary Fifty Fathoms',
      label: {
        vi: 'Anniversary Fifty Fathoms',
        en: 'Anniversary Fifty Fathoms',
      },
      change: {
        vi: 'Ra mắt Anniversary Fifty Fathoms — ba loạt giới hạn, mỗi loạt 50 chiếc',
        en: 'Launch of the Anniversary Fifty Fathoms — three limited series of 50 watches each',
      },
      note: {
        vi: 'Archive gọi đây là “lời dạo đầu” cho sự trở lại đầy đủ của bộ sưu tập',
        en: 'The archives call it an overture to the collection’s full re-establishment',
      },
      sourceUrl: 'https://lettresdubrassus.blancpain.com/en/issue-13/history-and-legend',
      sourceName: 'Lettres du Brassus',
    },
    {
      // F4 — 2007
      year: 2007,
      reference: 'Fifty Fathoms Collection',
      label: {
        vi: 'Bộ sưu tập chính thức ra đời',
        en: 'The collection debuts',
      },
      change: {
        vi: 'Bộ sưu tập Fifty Fathoms đầy đủ chính thức ra đời',
        en: 'The full Fifty Fathoms Collection debuts',
      },
      note: {
        vi: 'Archive: Anniversary 2003 chỉ là “overture” cho sự trở lại đầy đủ của bộ sưu tập năm 2007',
        en: 'Per the archives, the 2003 Anniversary was the overture to the collection’s full return in 2007',
      },
      sourceUrl: 'https://lettresdubrassus.blancpain.com/en/issue-13/history-and-legend',
      sourceName: 'Lettres du Brassus',
    },
  ],
};
