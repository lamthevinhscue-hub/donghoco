// =============================================================================
// historyChapters.ts — Dữ liệu 6 chương của hành trình lịch sử (G05-B)
// =============================================================================
// Nguồn duy nhất cho khung chương VI/EN, dùng chung bởi HistoryTimeline.astro
// qua hai trang /lich-su/ và /en/history/.
//
// Ranh giới chương khớp đúng bảng ánh xạ G05-A (đã anh Vinh duyệt):
//   C1: mốc 0–4 (5) · C2: 5–8 (4) · C3: 9–14 (6) · C4: 15–20 (6) ·
//   C5: 21–24 (4) · C6: 25–27 (3) — tổng 28, thứ tự mốc trong timeline.json
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
    range: [5, 9],
    vi: {
      title: 'Đồng hồ đến cổ tay',
      short: 'Đến cổ tay',
      question: 'Không một phát minh đơn lẻ nào đưa đồng hồ lên cổ tay — ai đã đeo nó, vì nhu cầu gì?',
      lead: 'Đồng hồ bỏ túi không biến mất khi đồng hồ đeo tay lan rộng; hai hình thức song song suốt nhiều thập kỷ.',
    },
    en: {
      title: 'The watch reaches the wrist',
      short: 'To the wrist',
      question: 'No single invention put the watch on the wrist — who wore it there, and why?',
      lead: 'Pocket watches did not vanish as wristwatches spread; the two forms coexisted for decades.',
    },
  },
  {
    id: 'c3',
    range: [9, 15],
    vi: {
      title: 'Thiết kế cho ngày thường',
      short: 'Ngày thường',
      question: 'Mặc lên cổ tay rồi — những nhu cầu sử dụng hằng ngày nào đã định hình thiết kế của nó?',
      lead: 'Các mốc này giải bài toán hằng ngày của thời họ; thông số chống nước và mức an toàn của hôm nay có bài chuyên sâu riêng, không suy ngược từ đây.',
    },
    en: {
      title: 'Design for everyday life',
      short: 'Everyday design',
      question: 'Once on the wrist — which everyday needs shaped its design?',
      lead: 'These milestones solved their era\u2019s daily problems; today\u2019s water-resistance ratings and safety levels are covered in dedicated guides, not inferred from history.',
    },
  },
  {
    id: 'c4',
    range: [15, 21],
    vi: {
      title: 'Lặn, múi giờ, bấm giờ',
      short: 'Lặn · GMT · bấm giờ',
      question: 'Ba nhu cầu chuyên biệt — lặn sâu, bay qua múi giờ, đo thời gian — đã sinh ra những dòng đồng hồ riêng thế nào?',
      lead: 'Cùng năm 1953 có hai đồng hồ lặn ra đời — điều đó không nói lên ai sao chép ai; mỗi thẻ giữ đúng nguồn của nó.',
    },
    en: {
      title: 'Diving, time zones, timing',
      short: 'Dive · GMT · chrono',
      question: 'Three specialised needs — deep diving, crossing time zones, measuring time — how did each give rise to its own kind of watch?',
      lead: 'Two dive watches arrived in the same year 1953 — that alone says nothing about copying; each card keeps its own sources.',
    },
  },
  {
    id: 'c5',
    range: [21, 25],
    vi: {
      title: 'Quartz và tái cấu trúc',
      short: 'Quartz',
      question: 'Giữa 1969 và 1983, quartz, thiết kế mới và tái cấu trúc ngành diễn ra thế nào?',
      lead: 'Cách mạng quartz và tái cấu trúc ngành là hai việc xảy ra cùng thời; hồ sơ ghi từng việc ở đúng mức nguồn của nó.',
    },
    en: {
      title: 'Quartz and restructuring',
      short: 'Quartz',
      question: 'Between 1969 and 1983, how did quartz, new design and industry restructuring unfold?',
      lead: 'The quartz revolution and the industry restructuring happened in the same years; this record keeps each at its own level of sourcing.',
    },
  },
  {
    id: 'c6',
    range: [25, 28],
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
