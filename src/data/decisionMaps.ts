// =============================================================================
// DỮ LIỆU "BÀN QUYẾT ĐỊNH" (DecisionMap) cho các bài hướng dẫn
// =============================================================================
// Bản đồ điều hướng đầu bài: người đọc chọn nhánh theo nhu cầu và được dẫn tới
// các bài/trang hiện có. KHÔNG phải quiz, không chấm điểm, không gợi ý sản phẩm.
// Mọi href là route nội bộ thật (script check-first-watch-cluster.mjs kiểm).
//
// Tái sử dụng: thêm map mới cho một hướng dẫn khác bằng cách đăng ký vào MAPS
// (key theo slug bài + ngôn ngữ vi). Trang/template gọi getDecisionMap().
// =============================================================================

export interface DecisionBranchLink {
  /** Đường dẫn nội bộ tuyệt đối (chưa kèm tiền tố ngôn ngữ) */
  href: string;
  /** Nhãn link mô tả rõ nội dung đích */
  label: string;
}

export interface DecisionBranch {
  /** Tên nhánh — nhu cầu của người đọc */
  title: string;
  /** Một câu giải thích ngắn */
  description: string;
  /** Các link dẫn tới bài/trang hiện có phục vụ nhánh này */
  links: DecisionBranchLink[];
}

export interface DecisionMapData {
  /** Slug bài gắn với map — khóa điều kiện render */
  slug: string;
  heading: string;
  /** Một câu dẫn ngắn dưới heading */
  intro: string;
  branches: DecisionBranch[];
}

const firstWatchMap: DecisionMapData = {
  slug: 'chon-dong-ho-dau-tien',
  heading: 'Bắt đầu từ nhu cầu của bạn',
  intro: 'Chọn một nhánh gần nhất với lý do bạn muốn mua — trang sẽ dẫn bạn tới đúng bài cần đọc.',
  branches: [
    {
      title: 'Tôi cần một chiếc đeo hằng ngày',
      description: 'Ưu tiên vừa tay, chịu được dùng thường xuyên và tiện mỗi ngày.',
      links: [
        { href: '/huong-dan/chon-co-dong-ho', label: 'Đo cổ tay và đọc kích thước vỏ' },
        { href: '/huong-dan/muc-chong-nuoc', label: 'Hiểu mức chống nước trước khi đeo ra mưa' },
        { href: '/co-che/len-day-tu-dong', label: 'Tìm hiểu cơ chế lên dây tự động' },
      ],
    },
    {
      title: 'Tôi muốn hiểu và ngắm cơ chế',
      description: 'Bắt đầu từ nguyên lý vận hành — nền tảng để ngắm bộ máy hiểu chỗ.',
      links: [
        { href: '/co-che/chuyen-dong-co', label: 'Chuỗi truyền động: dây cót đến bánh lắc' },
        { href: '/huong-dan/len-day-dong-ho', label: 'Lên dây tay — nghi thức hằng ngày' },
        { href: '/giai-phau', label: 'Giải phẫu 12 bộ phận của chiếc đồng hồ cơ' },
      ],
    },
    {
      title: 'Tôi đang cân nhắc đồng hồ đã qua sử dụng',
      description: 'Tình trạng và giấy tờ quan trọng hơn giá — và biết giới hạn tự kiểm.',
      links: [
        { href: '/huong-dan/nhan-biet-dong-ho-gia', label: 'Nhận biết dấu hiệu đồng hồ giả' },
        { href: '/huong-dan/bao-duong-dong-ho', label: 'Bảo dưỡng: chi phí sở hữu lâu dài' },
      ],
    },
  ],
};

const MAPS: DecisionMapData[] = [firstWatchMap];

/** Lấy bàn quyết định cho một slug bài hướng dẫn. Chỉ tiếng Việt. */
export function getDecisionMap(slug: string, lang: string): DecisionMapData | undefined {
  if (lang !== 'vi') return undefined;
  return MAPS.find((m) => m.slug === slug);
}
