// =============================================================================
// historyChapters.ts — Dữ liệu 6 chương của hành trình lịch sử (G05-B)
// =============================================================================
// Nguồn duy nhất cho khung chương VI/EN, dùng chung bởi HistoryTimeline.astro
// qua hai trang /lich-su/ và /en/history/.
//
// Ranh giới chương theo H07-A (20/09/2026): thêm 4 mốc bối cảnh thế giới → 32 mốc.
//   C1: mốc 0–4 (5) · C2: 5–11 (7) · C3: 12–16 (5) · C4: 17–22 (6) ·
//   C5: 23–28 (6) · C6: 29–31 (3) — tổng 32, thứ tự mốc trong timeline.json
//   không đổi. `range` là [bắt-đầu, kết-thúc) theo chỉ số mốc.
//
// Quy tắc biên tập (theo hồ sơ G05-A đã duyệt): không gán quan hệ nhân quả từ
// thứ tự thời gian; giữ đúng mức claim của G02; không thêm sự kiện mới.
// =============================================================================

export interface HistoryChapterText {
  /** Tên chương — hiển thị ở đề mục và nav chương */
  title: string;
  /** Tên rút gọn cho nav (cột phải hẹp / panel mobile) */
  short: string;
  /** Câu hỏi mở chương */
  question: string;
  /** Đoạn dẫn/giới hạn ngắn của chương (câu giữ chương: thời gian ≠ nhân quả) */
  lead: string;
}

export interface HistoryChapter {
  /** ID chung hai ngôn ngữ cho anchor — dùng nguyên trạng: #chuong-c1…#chuong-c6 */
  id: 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6';
  /** [bắt-đầu, kết-thúc) theo chỉ số mốc trong timeline.json */
  range: [number, number];
  vi: HistoryChapterText;
  en: HistoryChapterText;
}

export const HISTORY_CHAPTERS: HistoryChapter[] = [
  {
    id: 'c1',
    range: [0, 5],
    vi: {
      title: 'Mang theo được và điều hòa nhịp',
      short: 'Điều hòa nhịp',
      question: 'Làm sao để thời gian rời khỏi mặt đất, tòa tháp và túi áo — để chạy đều trong lòng bàn tay?',
      lead: 'Hai mốc lập xưởng bổ sung bối cảnh nghề chế tác; hồ sơ không xác lập quan hệ nhân quả với các phát minh điều hòa.',
    },
    en: {
      title: 'Portable time and a steady heartbeat',
      short: 'A steady heartbeat',
      question: 'How did timekeeping become portable and rhythm-regulated?',
      lead: 'The two workshop milestones add watchmaking context; this record does not establish a causal link with the regulator inventions.',
    },
  },
  {
    id: 'c2',
    range: [5, 12],
    vi: {
      title: 'Đồng hồ đến cổ tay',
      short: 'Đến cổ tay',
      question: 'Không một phát minh đơn lẻ nào đưa đồng hồ lên cổ tay — ai đã đeo nó, vì nhu cầu gì?',
      lead: 'Đồng hồ bỏ túi không biến mất khi đồng hồ đeo tay lan rộng; hai hình thức song song suốt nhiều thập kỷ. Mốc 1884 (giờ chuẩn, theo FHH) là bối cảnh cách thế giới thống nhất cách tính giờ — không phải bước đưa đồng hồ lên cổ tay.',
    },
    en: {
      title: 'The watch reaches the wrist',
      short: 'To the wrist',
      question: 'No single invention put the watch on the wrist — who wore it there, and why?',
      lead: 'Pocket watches did not vanish as wristwatches spread; the two forms coexisted for decades. The 1884 milestone (standard time, per the FHH) is context on how the world standardised timekeeping — not a step towards putting the watch on the wrist.',
    },
  },
  {
    id: 'c3',
    range: [12, 17],
    vi: {
      title: 'Thiết kế cho ngày thường',
      short: 'Ngày thường',
      question: 'Mặc lên cổ tay rồi — những nhu cầu sử dụng hằng ngày nào đã định hình thiết kế của nó?',
      lead: 'Các mốc này giải bài toán hằng ngày của thời họ; thông số chống nước và mức an toàn của hôm nay có bài chuyên sâu riêng, không suy ngược từ đây. Mốc Đại khủng hoảng 1929 là bối cảnh kinh tế của giai đoạn; hồ sơ không gán vai trò nhân quả cho nó.',
    },
    en: {
      title: 'Design for everyday life',
      short: 'Everyday design',
      question: 'Once on the wrist — which everyday needs shaped its design?',
      lead: 'These milestones solved their era\u2019s daily problems; today\u2019s water-resistance ratings and safety levels are covered in dedicated guides, not inferred from history. The 1929 Great Depression milestone is the period\u2019s economic context; this record assigns it no causal role.',
    },
  },
  {
    id: 'c4',
    range: [17, 23],
    vi: {
      title: 'Lặn, múi giờ, bấm giờ',
      short: 'Lặn · GMT · bấm giờ',
      question: 'Ba nhu cầu chuyên biệt — lặn sâu, bay qua múi giờ, đo thời gian — đã sinh ra những dòng đồng hồ riêng thế nào?',
      lead: 'Cùng năm 1953 có hai đồng hồ lặn ra đời — điều đó không nói lên ai sao chép ai; mỗi thẻ giữ đúng nguồn của nó. Mốc định nghĩa giây nguyên tử (1967) là bối cảnh đo lường đặt cạnh các mốc 1969; cùng thời không tự thành nhân quả.',
    },
    en: {
      title: 'Diving, time zones, timing',
      short: 'Dive · GMT · chrono',
      question: 'Three specialised needs — deep diving, crossing time zones, measuring time — how did each give rise to its own kind of watch?',
      lead: 'Two dive watches arrived in the same year 1953 — that alone says nothing about copying; each card keeps its own sources. The 1967 atomic-second milestone is metrological context beside the 1969 milestones; simultaneity alone is not causation.',
    },
  },
  {
    id: 'c5',
    range: [23, 29],
    vi: {
      title: 'Quartz và tái cấu trúc',
      short: 'Quartz',
      question: 'Giữa 1969 và 1983, quartz, thiết kế mới và tái cấu trúc ngành diễn ra thế nào?',
      lead: 'Cách mạng quartz và tái cấu trúc ngành là hai việc xảy ra cùng thời; hồ sơ ghi từng việc ở đúng mức nguồn của nó. Mốc cú sốc dầu 1973 là bối cảnh kinh tế của thập niên; không được gán làm nguyên nhân của quartz hay tái cấu trúc.',
    },
    en: {
      title: 'Quartz and restructuring',
      short: 'Quartz',
      question: 'Between 1969 and 1983, how did quartz, new design and industry restructuring unfold?',
      lead: 'The quartz revolution and the industry restructuring happened in the same years; this record keeps each at its own level of sourcing. The 1973 oil-shock milestone is the decade\u2019s economic context; it is not assigned as the cause of quartz or the restructuring.',
    },
  },
  {
    id: 'c6',
    range: [29, 32],
    vi: {
      title: 'Bộ thoát và vật liệu mới',
      short: 'Bộ thoát · vật liệu',
      question: 'Câu chuyện chưa kết thúc: bộ thoát và vật liệu mới đã thay đổi cỗ máy cơ khí thế nào sau 1999?',
      lead: 'Ứng dụng của một hãng không tự thành chuẩn chung của ngành — mỗi thẻ nói đúng phạm vi của nó.',
    },
    en: {
      title: 'Escapements and new materials',
      short: 'Escapements · materials',
      question: 'The story is not over: how have new escapements and materials changed the mechanical movement since 1999?',
      lead: 'One brand\u2019s adoption is not an industry standard — each card states its own scope.',
    },
  },
];
