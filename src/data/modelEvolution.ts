// =============================================================================
// HẠ TẠNG SƠ ĐỒ TIẾN HÓA MẪU ICONIC (dùng chung cho nhiều mẫu, song ngữ)
// =============================================================================
// Kiểu dữ liệu chung + sổ đăng ký dataset. Mỗi dòng đồng hồ có một tệp dataset
// riêng trong src/data/ (đặt theo mẫu <brand>-<model>Evolution.ts), là nguồn
// dữ kiện DUY NHẤT của sơ đồ tương ứng. Component ModelEvolution.astro chỉ
// render dataset được truyền vào kèm ngôn ngữ trang — không chứa dữ kiện hay
// chữ hiển thị nào.
//
// Song ngữ (Prompt 31): mọi trường hiển thị cho người đọc là DisplayText —
//   - string  : chỉ tiếng Việt (dataset chưa có bản dịch đầy đủ);
//   - LocalizedText { vi, en }: song ngữ, hai giá trị phải cùng một dữ kiện.
// `publishedLangs` khai báo ngôn ngữ dataset được xuất bản — do biên tập quyết.
// getEvolutionDataset() chỉ trả dataset khi ngôn ngữ trang nằm trong
// publishedLangs: dataset chưa đủ bản dịch KHÔNG hiện ở trang English.
//
// Quy trình thêm sơ đồ mới:
//   1. Lập hồ sơ dữ liệu có nguồn ở docs/ho-so-du-lieu-tien-hoa-<slug>.md
//      ("thà thiếu còn hơn sai" — mốc nào chưa chốt thì không vào dataset).
//   2. Tạo tệp dataset theo kiểu ModelEvolutionDataset ở dưới.
//   3. Đăng ký vào DATASETS ở cuối tệp này.
// =============================================================================

export interface LocalizedText {
  vi: string;
  en: string;
}

/** Văn bản hiển thị: string = chỉ vi (legacy); LocalizedText = song ngữ. */
export type DisplayText = string | LocalizedText;

/** Lấy văn bản hiển thị theo ngôn ngữ trang. */
export function tText(value: DisplayText, lang: 'vi' | 'en'): string {
  if (typeof value === 'string') return value;
  return lang === 'en' ? value.en : value.vi;
}

export interface ModelEvolutionMilestone {
  /** Năm hiển thị — đã kiểm chứng trong hồ sơ dữ liệu */
  year: number;
  /** Reference hoặc tên thế hệ — ghi rõ khi chưa có số reference được kiểm chứng. Không dịch. */
  reference: string;
  /** Nhãn ngắn trên đường thời gian */
  label: DisplayText;
  /** Thay đổi chính — một câu, đúng hồ sơ dữ liệu */
  change: DisplayText;
  /** Giải thích ngắn cho người mới */
  note: DisplayText;
  /** Nguồn xác nhận (URL HTTPS, truy cập được tại ngày ghi trong hồ sơ) */
  sourceUrl: string;
  /** Tên tổ chức nguồn (tên riêng — không dịch), hiện bên cạnh "Xem nguồn" */
  sourceName: string;
}

export interface ModelEvolutionDataset {
  /** Slug bài mẫu iconic gắn với sơ đồ — khóa điều kiện render */
  slug: string;
  /** Tên ngắn của dòng (tên riêng — không dịch), dùng trong báo cáo kiểm tra và nhãn trợ đọc */
  name: string;
  /** Các ngôn ngữ dataset được xuất bản — ngôn ngữ khác không render section */
  publishedLangs: ReadonlyArray<'vi' | 'en'>;
  /** Tiêu đề hiển thị của sơ đồ */
  title: DisplayText;
  /** Câu giới thiệu dưới tiêu đề */
  intro: DisplayText;
  /** Các mốc theo thứ tự thời gian tăng dần */
  milestones: ModelEvolutionMilestone[];
}

// --- Sổ đăng ký: thêm dataset mới vào mảng này (giữ thứ tự alphabet theo slug)
import { rolexGmtMasterEvolution } from './rolexGmtMasterEvolution';
import { submarinerEvolution } from './submarinerEvolution';

const DATASETS: ModelEvolutionDataset[] = [rolexGmtMasterEvolution, submarinerEvolution];

/**
 * Lấy dataset sơ đồ tiến hóa cho một slug bài iconic, theo ngôn ngữ trang.
 * Dataset chỉ render ở ngôn ngữ nằm trong publishedLangs của nó —
 * dataset chưa có bản dịch đầy đủ sẽ không hiện ở trang English.
 */
export function getEvolutionDataset(slug: string, lang: string): ModelEvolutionDataset | undefined {
  const dataset = DATASETS.find((d) => d.slug === slug);
  if (!dataset) return undefined;
  if (!(dataset.publishedLangs as readonly string[]).includes(lang)) return undefined;
  return dataset;
}
