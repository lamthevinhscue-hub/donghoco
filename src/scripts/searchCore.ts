// =============================================================================
// SEARCH CORE — controller Pagefind dùng chung cho mọi ô tìm kiếm trên trang
// =============================================================================
// Một instance Pagefind, một chuỗi debounce, một bảng trạng thái — mọi UI
// (dialog toàn màn hình, ô inline trong header, ô lớn ở hero trang chủ) đều
// subscribe cùng một nguồn này nên không bao giờ có hai hệ thống tìm kiếm
// độc lập chạy song song.
//
// Trạng thái phát về listener:
//   idle      — query dưới 2 ký tự (chưa tìm, dọn kết quả)
//   preparing — Pagefind đang tải và đã chờ quá 300ms (hiện "Đang chuẩn bị…")
//   ready     — có kết quả (hits tối đa 8)
//   none      — không có kết quả
//   error     — lỗi tải hoặc lỗi tìm
// =============================================================================

export type SearchStatus = 'idle' | 'preparing' | 'ready' | 'none' | 'error';

export interface SearchHit {
  url: string;
  title: string;
  /** Excerpt đã làm sạch — chỉ giữ thẻ <mark> nhấn từ khóa */
  excerptHtml: string;
  /** Nhãn nhóm nội dung suy từ URL (Từ điển, Cơ chế, Thương hiệu...) */
  section: string;
}

export interface SearchState {
  status: SearchStatus;
  query: string;
  hits: SearchHit[];
  total: number;
  shown: number;
}

export type SearchListener = (state: SearchState) => void;

// ----- Nhãn nhóm nội dung (truyền từ component qua init để giữ i18n) --------
let sectionLabels: Record<string, string> = {};
// Ngôn ngữ của trang đang chạy (vi | en) — dùng lọc kết quả Pagefind theo
// bộ lọc "language" gắn ở BaseLayout (data-pagefind-filter="language").
let currentLang: string = 'vi';

export function initSearchCore(labels: Record<string, string>, lang?: string) {
  sectionLabels = labels;
  if (lang) currentLang = lang;
}

function sectionOf(url: string): string {
  if (url.includes('/tu-dien')) return sectionLabels.glossary ?? 'Từ điển';
  if (url.includes('/co-che')) return sectionLabels.mechanism ?? 'Cơ chế';
  if (url.includes('/thuong-hieu')) return sectionLabels.brand ?? 'Thương hiệu';
  if (url.includes('/mau-iconic')) return sectionLabels.iconic ?? 'Mẫu iconic';
  if (url.includes('/huong-dan')) return sectionLabels.guide ?? 'Hướng dẫn';
  if (url.includes('/lich-su')) return sectionLabels.history ?? 'Lịch sử';
  if (url.includes('/giai-phau')) return sectionLabels.anatomy ?? 'Giải phẫu';
  // Các đường dẫn tiếng Anh của English launch pack
  if (url.includes('/en/glossary')) return sectionLabels.glossary ?? 'Glossary';
  if (url.includes('/en/mechanisms')) return sectionLabels.mechanism ?? 'Mechanisms';
  if (url.includes('/en/brands')) return sectionLabels.brand ?? 'Brands';
  if (url.includes('/en/iconic-watches')) return sectionLabels.iconic ?? 'Iconic watch';
  if (url.includes('/en/guides')) return sectionLabels.guide ?? 'Guides';
  return sectionLabels.article ?? 'Bài viết';
}

// Chỉ giữ thẻ <mark>…</mark>, loại bỏ mọi thẻ khác (phòng thủ theo chiều sâu)
function sanitizeExcerpt(raw: string): string {
  return raw.replace(/<\/?(?!mark\b)[^>]*>/gi, '');
}

// ----- Instance Pagefind duy nhất ------------------------------------------------
let pagefindInstance: any = null;
let loadPromise: Promise<void> | null = null;

function trackPagefindError(stage: string, error: unknown) {
  const msg = error instanceof Error ? error.message : String(error);
  console.warn('Pagefind lỗi (' + stage + '):', msg);
  try {
    if (typeof (window as any).va === 'function') {
      (window as any).va('event', {
        name: 'pagefind_error',
        data: { stage, message: msg.substring(0, 200) },
      });
    }
  } catch { /* Analytics không có — không sao */ }
}

async function ensureLoaded() {
  if (pagefindInstance) return;
  if (loadPromise) { await loadPromise; return; }
  loadPromise = (async () => {
    try {
      pagefindInstance = await import(/* @vite-ignore */ '/pagefind/pagefind-ui.js');
      await pagefindInstance.init();
    } catch (e) {
      try {
        pagefindInstance = await import(/* @vite-ignore */ '/pagefind/pagefind.js');
        await pagefindInstance.options({});
        await pagefindInstance.init();
      } catch (e2) {
        trackPagefindError('init', e2);
      }
    }
  })();
  await loadPromise;
}

// ----- Trạng thái + listener -----------------------------------------------------
const listeners = new Set<SearchListener>();
let state: SearchState = { status: 'idle', query: '', hits: [], total: 0, shown: 0 };

function emit(patch: Partial<SearchState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l(state));
}

export function subscribeSearch(listener: SearchListener): () => void {
  listeners.add(listener);
  listener(state); // phát trạng thái hiện tại ngay để UI mới đồng bộ
  return () => listeners.delete(listener);
}

// ----- Yêu cầu tìm (debounce 200ms đặt TRONG core — mọi UI cùng một nhịp) ------
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let preparingTimer: ReturnType<typeof setTimeout> | null = null;
let searchSeq = 0;

export function requestSearch(query: string) {
  const q = query.trim();
  if (debounceTimer) clearTimeout(debounceTimer);
  if (preparingTimer) { clearTimeout(preparingTimer); preparingTimer = null; }
  if (q.length < 2) {
    searchSeq++; // vô hiệu mọi promise đang bay
    emit({ status: 'idle', query: q, hits: [], total: 0, shown: 0 });
    return;
  }
  debounceTimer = setTimeout(() => runSearch(q), 200);
}

async function runSearch(q: string) {
  const seq = ++searchSeq;
  // Nếu Pagefind chưa sẵn sàng mà chờ quá 300ms thì báo "đang chuẩn bị" —
  // không để vùng kết quả trắng không phản hồi.
  if (!pagefindInstance) {
    preparingTimer = setTimeout(() => {
      if (seq === searchSeq && !pagefindInstance) {
        emit({ status: 'preparing', query: q });
      }
    }, 300);
  }

  await ensureLoaded();
  if (seq !== searchSeq) return;
  if (preparingTimer) { clearTimeout(preparingTimer); preparingTimer = null; }

  if (!pagefindInstance) {
    emit({ status: 'error', query: q });
    return;
  }

  try {
    // Lọc kết quả theo ngôn ngữ trang hiện tại (bộ lọc "language" được gắn
    // trên mọi trang qua BaseLayout) — tìm kiếm tiếng Anh không trả trang
    // tiếng Việt và ngược lại.
    const search = await pagefindInstance.search(q, {
      filters: { language: currentLang },
    });
    const top = search.results.slice(0, 8);
    const rendered = await Promise.all(top.map((r: any) => r.data()));
    if (seq !== searchSeq) return;
    const hits: SearchHit[] = rendered.map((r: any) => ({
      url: r.url,
      title: r.meta?.title || r.url,
      excerptHtml: sanitizeExcerpt(r.excerpt || r.meta?.excerpt || ''),
      section: sectionOf(r.url),
    }));
    emit({
      status: hits.length ? 'ready' : 'none',
      query: q,
      hits,
      total: search.results.length,
      shown: hits.length,
    });
  } catch {
    if (seq === searchSeq) emit({ status: 'error', query: q });
  }
}
