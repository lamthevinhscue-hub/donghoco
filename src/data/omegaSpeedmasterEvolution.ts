// =============================================================================
// DỮ LIỆU SƠ ĐỒ TIẾN HÓA OMEGA SPEEDMASTER (song ngữ — mốc có nguồn G08-A)
// =============================================================================
// Nguồn dữ kiện DUY NHẤT của sơ đồ tiến hóa trên /mau-iconic/omega-speedmaster/
// và /en/iconic-watches/omega-speedmaster/. Sao nguyên văn từ
// docs/ho-so-du-lieu-tien-hoa-omega-speedmaster.md (ngày kiểm nguồn 18/09/2026)
// — từng mốc có hoSoId N1–N7 với URL và trích nguyên văn trong hồ sơ.
//
// Song ngữ: title/intro/label/change/note là LocalizedText — bản en diễn đạt
// lại ĐÚNG dữ kiện của bản vi, không thêm mốc/thông số/claim mới.
// reference, sourceName là tên riêng — không dịch.
//
// Quy tắc "thà thiếu còn hơn sai":
//   - KHÔNG thêm reference/mốc ngoài hồ sơ (Ed White/105.003, Silver Snoopy,
//     năm của 3570.50… chưa đủ nguồn — xem hồ sơ mục 2–3).
//   - Không suy diễn số liệu ngoài trích dẫn; muốn sửa dữ kiện phải sửa hồ sơ
//     trước, rồi mới sửa tệp này.
//   - Không giá, độ hiếm, đầu tư, khuyến nghị mua hay xếp hạng.
// =============================================================================

import type { ModelEvolutionDataset } from './modelEvolution';

export const omegaSpeedmasterEvolution: ModelEvolutionDataset = {
  slug: 'omega-speedmaster',
  name: 'Omega Speedmaster',
  publishedLangs: ['vi', 'en'],
  title: {
    vi: 'Tiến hóa Omega Speedmaster',
    en: 'Omega Speedmaster evolution',
  },
  intro: {
    vi: 'Bảy mốc được chọn từ hồ sơ kiểm chứng. Đây là lược đồ các thay đổi chính của dòng, không phải danh mục đầy đủ mọi reference.',
    en: 'Seven milestones selected from the verified research file. This traces the major changes of the line, not a complete catalogue of references.',
  },
  milestones: [
    {
      // N1 — 1957
      year: 1957,
      reference: { vi: 'CK 2915', en: 'CK 2915' },
      label: {
        vi: 'Chiếc Speedmaster đầu tiên',
        en: 'The first Speedmaster',
      },
      change: {
        vi: 'Chronograph lên dây tay với thang tachymeter đặt trên vành bezel — công dụng bấm giờ cho người đua xe',
        en: 'A hand-wound chronograph for car racers, with a tachymeter scale on the external bezel',
      },
      note: {
        vi: 'Ra mắt trong bộ ba đồng hồ dụng cụ năm 1957 của Omega; sản xuất 1957–1959 với ba reference',
        en: 'Launched in Omega’s 1957 trilogy of instrument watches; produced 1957–1959 across three references',
      },
      sourceUrl: 'https://monochrome-watches.com/a-guide-to-the-evolution-of-the-omega-speedmaster-moonwatch-reference-by-reference/',
      sourceName: 'Monochrome',
    },
    {
      // N2 — 1962
      year: 1962,
      reference: { vi: 'CK 2998', en: 'CK 2998' },
      label: {
        vi: 'Omega đầu tiên lên không gian',
        en: 'First OMEGA in space',
      },
      change: {
        vi: 'Walter Schirra đeo Speedmaster trên nhiệm vụ Sigma 7 — chiếc Omega đầu tiên trong không gian',
        en: 'Walter Schirra wore a Speedmaster on the Sigma 7 mission — the first OMEGA in space',
      },
      note: {
        vi: 'Nhiệm vụ ngày 3/10/1962; tái bản “First OMEGA in Space” hiện nay dựa trên mẫu gốc CK-2998',
        en: 'The mission date was 3 October 1962; today’s “First OMEGA in Space” re-edition is based on the original CK-2998',
      },
      sourceUrl: 'https://www.omegawatches.com/en-us/watches/speedmaster/heritage-models/first-omega-in-space/product',
      sourceName: 'OMEGA',
    },
    {
      // N3 — 1965
      year: 1965,
      reference: { vi: 'Speedmaster Professional', en: 'Speedmaster Professional' },
      label: {
        vi: 'NASA chứng nhận',
        en: 'NASA qualification',
      },
      change: {
        vi: 'Ngày 1/3/1965, NASA chứng nhận cho mọi nhiệm vụ có người lái và hoạt động ngoài tàu (EVA)',
        en: 'On 1 March 1965, NASA qualified it for all manned space missions and Extravehicular Activity (EVA)',
      },
      note: {
        vi: 'Omega là một trong bốn hãng được mời nộp máy thử; chỉ một mẫu sống sót qua các bài thử',
        en: 'OMEGA was one of four watch brands invited to submit timepieces; only one watch survived the tests',
      },
      sourceUrl: 'https://www.omegawatches.com/chronicle/1965-nasa-tests-and-qualifies-the-speedmaster',
      sourceName: 'OMEGA',
    },
    {
      // N4 — 1968
      year: 1968,
      reference: { vi: 'ST 145.022-68', en: 'ST 145.022-68' },
      label: {
        vi: 'Calibre 861',
        en: 'Calibre 861',
      },
      change: {
        vi: 'Calibre 861 thay thế calibre 321',
        en: 'Calibre 861 phases out and replaces calibre 321',
      },
      note: {
        vi: 'Mẫu đầu tiên mang calibre 861 là ST 145.022-68',
        en: 'The ST 145.022-68 was the first model to host the new 861 calibre',
      },
      sourceUrl: 'https://monochrome-watches.com/a-guide-to-the-evolution-of-the-omega-speedmaster-moonwatch-reference-by-reference/',
      sourceName: 'Monochrome',
    },
    {
      // N5 — 1969
      year: 1969,
      reference: { vi: 'Speedmaster Professional', en: 'Speedmaster Professional' },
      label: {
        vi: 'Moonwatch',
        en: 'Moonwatch',
      },
      change: {
        vi: 'Đồng hồ đầu tiên được đeo trên Mặt Trăng trong hạ cánh Apollo 11 — từ đó mang tên “Moonwatch”',
        en: 'The first watch worn on the Moon during the Apollo 11 landing — known as the “Moonwatch” ever since',
      },
      note: {
        vi: 'Bước chân đầu tiên lên Mặt Trăng lúc 02:56 GMT ngày 21/7/1969',
        en: 'The first steps on the Moon were at 02:56 GMT on 21 July 1969',
      },
      sourceUrl: 'https://www.omegawatches.com/chronicle/1969-the-first-journey-to-the-moon',
      sourceName: 'OMEGA',
    },
    {
      // N6 — 1970
      year: 1970,
      reference: { vi: 'Speedmaster', en: 'Speedmaster' },
      label: {
        vi: 'Apollo 13',
        en: 'Apollo 13',
      },
      change: {
        vi: 'Phi hành đoàn dùng Speedmaster bấm giờ thành công đợt đốt động cơ chỉnh hướng 14 giây trên hành trình quay về',
        en: 'The crew used their Speedmaster watches to successfully time a 14-second burn aligning the craft for its return',
      },
      note: {
        vi: 'Apollo 13 phóng ngày 11/4/1970 và hạ xuống biển ngày 17/4 — 142 giờ 54 phút sau khi phóng',
        en: 'Apollo 13 launched on 11 April 1970 and splashed down on 17 April — 142 hours and 54 minutes after launch',
      },
      sourceUrl: 'https://www.omegawatches.com/chronicle/1970-lucky-13',
      sourceName: 'OMEGA',
    },
    {
      // N7 — 2021
      year: 2021,
      reference: { vi: 'Moonwatch Professional', en: 'Moonwatch Professional' },
      label: {
        vi: 'Thế hệ 3861',
        en: 'The 3861 generation',
      },
      change: {
        vi: 'Thế hệ Moonwatch mới dùng calibre 3861 Co-Axial Master Chronometer, thay calibre 1861',
        en: 'The new Moonwatch generation is powered by the Co-Axial Master Chronometer caliber 3861, replacing caliber 1861',
      },
      note: {
        vi: 'Bộ máy kế thừa Calibre 321 — bộ máy của đồng hồ đã lên Mặt Trăng',
        en: 'The movement descends from the Calibre 321 that went to the Moon',
      },
      sourceUrl: 'https://www.hodinkee.com/articles/omega-speedmaster-3861-complete-buyers-guide',
      sourceName: 'Hodinkee',
    },
  ],
};
