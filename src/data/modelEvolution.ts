// =============================================================================
// HẠ TẦNG SƠ ĐỒ TIẾN HÓA MẪU ICONIC (dùng chung cho nhiều mẫu)
// =============================================================================
// Kiểu dữ liệu chung + sổ đăng ký dataset. Mỗi dòng đồng hồ có một tệp dataset
// riêng trong src/data/ (đặt theo mẫu <brand>-<model>Evolution.ts), là nguồn
// dữ kiện DUY NHẤT của sơ đồ tương ứng. Component ModelEvolution.astro chỉ
// render dataset được truyền vào — không chứa dữ kiện nào.
//
// Quy trình thêm sơ đồ mới:
//   1. Lập hồ sơ dữ liệu có nguồn ở docs/ho-so-du-lieu-tien-hoa-<slug>.md
//      ("thà thiếu còn hơn sai" — mốc nào chưa chốt thì không vào dataset).
//   2. Tạo tệp dataset theo kiểu ModelEvolutionDataset ở dưới.
//   3. Đăng ký vào DATASETS ở cuối tệp này.
//
// Điều kiện render nằm ở một chỗ duy nhất: hàm getEvolutionDataset() — chỉ
// tiếng Việt (vi), chỉ slug có dataset đăng ký. Trang khác không hiện section.
// =============================================================================

export interface ModelEvolutionMilestone {
  /** Năm hiển thị — đã kiểm chứng trong hồ sơ dữ liệu */
  year: number;
  /** Reference hoặc tên thế hệ — ghi rõ khi chưa có số reference được kiểm chứng */
  reference: string;
  /** Nhãn ngắn trên đường thời gian */
  label: string;
  /** Thay đổi chính — một câu, đúng hồ sơ dữ liệu */
  change: string;
  /** Giải thích ngắn cho người mới */
  note: string;
  /** Nguồn xác nhận (URL HTTPS, truy cập được tại ngày ghi trong hồ sơ) */
  sourceUrl: string;
  /** Tên tổ chức nguồn, hiện cho người đọc bên cạnh "Xem nguồn" */
  sourceName: string;
}

export interface ModelEvolutionDataset {
  /** Slug bài mẫu iconic gắn với sơ đồ — khóa điều kiện render */
  slug: string;
  /** Tên ngắn của dòng, dùng trong báo cáo kiểm tra và nhãn trợ đọc */
  name: string;
  /** Tiêu đề hiển thị của sơ đồ */
  title: string;
  /** Câu giới thiệu dưới tiêu đề */
  intro: string;
  /** Các mốc theo thứ tự thời gian tăng dần */
  milestones: ModelEvolutionMilestone[];
}

// --- Sổ đăng ký: thêm dataset mới vào mảng này (giữ thứ tự alphabet theo slug)
import { rolexGmtMasterEvolution } from './rolexGmtMasterEvolution';
import { submarinerEvolution } from './submarinerEvolution';

const DATASETS: ModelEvolutionDataset[] = [rolexGmtMasterEvolution, submarinerEvolution];

/** Lấy dataset sơ đồ tiến hóa cho một slug bài iconic. Chỉ tiếng Việt — ngôn ngữ khác trả về undefined. */
export function getEvolutionDataset(slug: string, lang: string): ModelEvolutionDataset | undefined {
  if (lang !== 'vi') return undefined;
  return DATASETS.find((d) => d.slug === slug);
}
