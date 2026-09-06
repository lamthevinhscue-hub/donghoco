// Pagefind runtime được sinh lúc build (dist/pagefind/*.js) — không có
// declaration chính thức. Khai báo đúng phần API mà src/scripts/searchCore.ts
// đang dùng; instance được gán vào interface PagefindAPI tại đó.
declare module '/pagefind/pagefind-ui.js' {
  export interface PagefindSearchResult {
    data(): Promise<{
      url: string;
      meta?: { title?: string; excerpt?: string };
      excerpt?: string;
    }>;
  }
  export interface PagefindSearchResponse {
    results: PagefindSearchResult[];
    totalResults?: number;
  }
  export class PagefindUI {
    constructor(options: Record<string, unknown>);
    init(): Promise<void>;
    options(opts: Record<string, unknown>): Promise<void>;
    search(
      query: string,
      opts?: { filters?: Record<string, string> }
    ): Promise<PagefindSearchResponse>;
  }
}
declare module '/pagefind/pagefind.js' {
  export interface PagefindSearchResult {
    data(): Promise<{
      url: string;
      meta?: { title?: string; excerpt?: string };
      excerpt?: string;
    }>;
  }
  export interface PagefindSearchResponse {
    results: PagefindSearchResult[];
    totalResults?: number;
  }
  export class Pagefind {
    init(): Promise<void>;
    options(opts: Record<string, unknown>): Promise<void>;
    search(
      query: string,
      opts?: { filters?: Record<string, string> }
    ): Promise<PagefindSearchResponse>;
  }
}
