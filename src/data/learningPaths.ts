// =============================================================================
// DỮ LIỆU "LỘ TRÌNH HỌC ĐỒNG HỒ CƠ" — trang hub /lo-trinh-hoc-dong-ho/
// =============================================================================
// Nguồn dữ kiện DUY NHẤT của trang hub. Ba lộ trình chỉ TỔ CHỨC LẠI đường đọc
// từ các bài/trang đã tồn tại — KHÔNG tạo bài viết, dữ kiện lịch sử hay thông
// số mới. Mọi href phải là route nội bộ thật (script check-learning-paths.mjs
// kiểm trong npm run check).
//
// Quy ước:
//   - href: đường dẫn nội bộ tuyệt đối, KHÔNG kèm tiền tố ngôn ngữ (trang sẽ
//     đi qua localizedPath()).
//   - label: tên hiển thị của bước, rút gọn tự nhiên từ tiêu đề bài gốc.
//   - why: một câu giải thích vì sao đọc ở bước đó.
//   - Không ghi thời lượng đọc (dự án chưa có dữ liệu thời lượng tính thật).
//   - Không giá, đầu tư, độ hiếm, biệt danh sưu tầm.
// =============================================================================

export interface LearningPathStep {
  /** Đường dẫn nội bộ tuyệt đối (chưa có tiền tố ngôn ngữ) */
  href: string;
  /** Tên hiển thị của bước */
  label: string;
  /** Vì sao nên đọc bài này ở bước này — một câu */
  why: string;
}

export interface LearningPath {
  /** Định danh neo cho mục lục (không dấu, không khoảng trắng) */
  id: string;
  /** Số thứ tự lộ trình — thứ tự học có ý nghĩa thật */
  number: number;
  title: string;
  description: string;
  /** Đối tượng phù hợp */
  audience: string;
  /** Các bước theo thứ tự học */
  steps: LearningPathStep[];
}

export const learningPaths: LearningPath[] = [
  {
    id: 'bat-dau-choi',
    number: 1,
    title: 'Bắt đầu chơi đồng hồ cơ',
    description:
      'Từ chọn chiếc đồng hồ cơ đầu tiên đến biết giữ nó chạy đúng — năm bước cần thiết nhất cho người mới, không đòi hỏi kiến thức nền.',
    audience: 'Người chưa có hoặc vừa có chiếc đồng hồ cơ đầu tiên.',
    steps: [
      {
        href: '/huong-dan/chon-dong-ho-dau-tien',
        label: 'Chọn đồng hồ cơ đầu tiên',
        why: 'Quyết định đầu tiên quan trọng nhất — tiêu chí chọn theo nhu cầu và ngân sách giúp tránh mua sai ngay từ đầu.',
      },
      {
        href: '/co-che/chuyen-dong-co',
        label: 'Chuỗi truyền động: dây cót đến bánh lắc',
        why: 'Hiểu chiếc đồng hồ mình chọn chạy bằng gì, trước khi học các thao tác sử dụng.',
      },
      {
        href: '/huong-dan/len-day-dong-ho',
        label: 'Lên dây cho đồng hồ cơ',
        why: 'Thao tác hằng ngày đầu tiên của người đeo — làm đúng để không hỏng trục lên dây.',
      },
      {
        href: '/huong-dan/muc-chong-nuoc',
        label: 'Mức chống nước: được làm gì, không được làm gì',
        why: 'Con số chống nước dễ đọc sai — biết giới hạn của chiếc đồng hồ giúp dùng nó an toàn mỗi ngày.',
      },
      {
        href: '/huong-dan/bao-duong-dong-ho',
        label: 'Bảo dưỡng đồng hồ cơ',
        why: 'Chăm sóc lâu dài: bảo dưỡng khi nào, ở đâu và chi phí khoảng bao nhiêu để chiếc đầu tiên bền.',
      },
    ],
  },
  {
    id: 'hieu-bo-may',
    number: 2,
    title: 'Hiểu bộ máy và cơ chế',
    description:
      'Đi dọc đường truyền năng lượng bên trong bộ máy — từ dây cót tới phức tạp hai múi giờ. Sáu bài đọc liền mạch theo đúng thứ tự khớp nối cơ khí.',
    audience: 'Người đã đeo đồng hồ cơ và muốn biết bên trong nó vận hành thế nào.',
    steps: [
      {
        href: '/co-che/chuyen-dong-co',
        label: 'Chuỗi truyền động: dây cót đến bánh lắc',
        why: 'Bài nền của cả lộ trình — năng lượng đi từ đâu, qua đâu và đến đâu trong bộ máy.',
      },
      {
        href: '/co-che/tru-cot',
        label: 'Trữ cót (Power Reserve)',
        why: 'Tiếp nối chuỗi truyền động: bộ máy tích được bao nhiêu năng lượng và chạy được bao lâu.',
      },
      {
        href: '/co-che/bo-thoat',
        label: 'Bộ thoát (Escapement)',
        why: 'Bộ phận chia nhỏ năng lượng thành nhịp — nguồn gốc tiếng tíc-tắc và trái tim của đồng hồ cơ.',
      },
      {
        href: '/co-che/day-toc-banh-lac',
        label: 'Dây tóc & bánh lắc',
        why: 'Cuối chuỗi truyền động là bộ dao động quyết định độ chính xác — hiểu nó là hiểu vì sao đồng hồ chạy sai.',
      },
      {
        href: '/co-che/len-day-tu-dong',
        label: 'Cơ chế lên dây tự động',
        why: 'Vì sao đeo tay là đủ để lên dây — cơ chế quay ngược chuỗi truyền động quen thuộc.',
      },
      {
        href: '/co-che/gmt',
        label: 'GMT — hai múi giờ và kim 24 giờ',
        why: 'Một phức tạp phổ biến để thấy các nguyên lý vừa học ghép lại thành tính năng thật như thế nào.',
      },
    ],
  },
  {
    id: 'tu-duy-suu-tam',
    number: 3,
    title: 'Tư duy người sưu tầm',
    description:
      'Đặt một mẫu cụ thể vào bức tranh lớn: lịch sử ngành, ba huyền thoại định hình thể loại, tay nghề hoàn thiện và bản đồ thương hiệu.',
    audience: 'Người muốn đọc hiểu một mẫu đồng hồ theo bối cảnh lịch sử và tay nghề, thay vì theo giá.',
    steps: [
      {
        href: '/lich-su',
        label: 'Lịch sử đồng hồ — 28 mốc',
        why: 'Khung thời gian chung trước tiên: một mẫu chỉ có nghĩa khi đặt đúng thập niên của nó.',
      },
      {
        href: '/mau-iconic/rolex-submariner',
        label: 'Rolex Submariner — huyền thoại lặn sâu',
        why: 'Bài mẫu cho cách đọc một mẫu iconic: bối cảnh ra đời, thiết kế nhận diện, các thế hệ tham chiếu.',
      },
      {
        href: '/mau-iconic/omega-speedmaster',
        label: 'Omega Speedmaster — chiếc đồng hồ của Mặt Trăng',
        why: 'So sánh với một huyền thoại cùng thời nhưng ngành nghề khác — luyện tư duy "mẫu gắn với mục đích".',
      },
      {
        href: '/mau-iconic/royal-oak',
        label: 'Audemars Piguet Royal Oak',
        why: 'Nhánh thứ ba của thập niên 1970 — hiểu ranh giới thể thao sang trọng và thép giá ngang vàng.',
      },
      {
        href: '/huong-dan/hoan-thien-thu-cong-dong-ho',
        label: 'Hoàn thiện thủ công: vát cạnh, đánh bóng, vân trang trí',
        why: 'Sau lịch sử là tay nghề — đọc giá trị chế tác nằm ở chi tiết nhỏ nhất của bộ máy.',
      },
      {
        href: '/thuong-hieu',
        label: 'Thư viện thương hiệu',
        why: 'Bản đồ 73 thương hiệu để đặt mọi thứ vừa đọc vào vị trí của từng hãng trong kỹ nghệ.',
      },
    ],
  },
];
