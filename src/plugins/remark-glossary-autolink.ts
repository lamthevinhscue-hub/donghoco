// =============================================================================
// remark-glossary-autolink — Tự động bọc link + tooltip cho thuật ngữ từ điển
// =============================================================================
// Quét thân bài markdown: lần xuất hiện ĐẦU TIÊN của mỗi thuật ngữ có trong
// collection tuDien được bọc thành link tới /tu-dien/<slug> kèm tooltip (title)
// hiện định nghĩa ngắn (excerpt) khi rê chuột / chạm.
//
// Quy tắc:
// - Chỉ bọc lần ĐẦU TIÊN trong mỗi bài (không rối mắt).
// - Không bọc nếu thuật ngữ xuất hiện trong chính bài từ điển của nó (tránh link tự trỏ).
// - Slug sinh từ TÊN FILE (không dùng custom_slug).
// - Không bọc bên trong link/heading/code có sẵn.
//
// Danh sách thuật ngữ được truyền vào từ astro.config.mjs.
// =============================================================================

import type { Plugin } from 'unified';
import type { Root, Text, PhrasingContent } from 'mdast';
import { visit, SKIP } from 'unist-util-visit';

export interface GlossaryTerm {
  title: string;
  slug: string;
  excerpt: string;
  aliases?: string[];
}

export interface GlossaryOptions {
  terms: GlossaryTerm[];
}

interface ProcessedTerm {
  slug: string;
  excerpt: string;
  /** Các regex ứng với từng alias */
  regexes: { regex: RegExp; display: string }[];
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Bọc thuật ngữ trong 1 chuỗi text, trả về mảng phrasing content
function wrapInString(
  text: string,
  terms: ProcessedTerm[],
  used: Set<string>,
): PhrasingContent[] {
  if (!text) return [];

  // Tìm tất cả match, lấy match sớm nhất của thuật ngữ chưa dùng
  let best: { index: number; display: string; slug: string; excerpt: string } | null = null;

  for (const term of terms) {
    if (used.has(term.slug)) continue;
    for (const { regex, display } of term.regexes) {
      const m = regex.exec(text);
      if (m && (best === null || m.index < best.index)) {
        best = { index: m.index, display, slug: term.slug, excerpt: term.excerpt };
      }
    }
  }

  if (!best) {
    return text ? [{ type: 'text', value: text }] : [];
  }

  const { index, display, slug, excerpt } = best;
  const matchedText = text.substring(index, index + display.length);
  const before = text.substring(0, index);
  const after = text.substring(index + display.length);

  used.add(slug);

  const result: PhrasingContent[] = [];
  if (before) result.push({ type: 'text', value: before });
  result.push({
    type: 'link',
    url: `/tu-dien/${slug}`,
    title: excerpt,
    data: { hProperties: { className: 'glossary-autolink' } },
    children: [{ type: 'text', value: matchedText }],
  });
  if (after) result.push(...wrapInString(after, terms, used));

  return result;
}

const remarkGlossaryAutolink: Plugin<[GlossaryOptions], Root> = (options) => {
  const processed: ProcessedTerm[] = options.terms
    .filter((t) => t.title && t.title.length >= 3)
    .map((t) => {
      const aliases = t.aliases && t.aliases.length > 0 ? t.aliases : [t.title];
      // Sắp xếp alias theo độ dài giảm dần (ưu tiên cụm dài)
      const sortedAliases = [...aliases].sort((a, b) => b.length - a.length);
      return {
        slug: t.slug,
        excerpt: t.excerpt,
        regexes: sortedAliases.map((alias) => ({
          regex: new RegExp(
            `(?<![\\p{L}\\p{N}])${escapeRegex(alias)}(?![\\p{L}\\p{N}])`,
            'iu',
          ),
          display: alias,
        })),
      };
    })
    // Sắp xếp: thuật ngữ có alias dài nhất lên trước (tránh khớp "bezel" trước "bezel insert")
    .sort((a, b) => {
      const aMax = Math.max(...a.regexes.map((r) => r.display.length));
      const bMax = Math.max(...b.regexes.map((r) => r.display.length));
      return bMax - aMax;
    });

  return (tree, file) => {
    // Slug bài từ điển hiện tại (nếu đang render bài từ điển) → tránh link tự trỏ
    const pathMatch = (file.path || '').match(/tuDien[\/\\][^\/\\]+[\/\\]([^\/\\]+)\.md$/);
    const currentSlug = pathMatch ? pathMatch[1] : null;

    const used = new Set<string>();
    if (currentSlug) used.add(currentSlug); // tránh link tự trỏ về chính bài từ điển

    visit(tree, (node, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      if (node.type !== 'text') return;

      // Bỏ qua nếu đang trong link/heading/code
      if (
        parent.type === 'link' ||
        parent.type === 'linkReference' ||
        parent.type === 'heading' ||
        parent.type === 'code' ||
        parent.type === 'inlineCode'
      ) {
        return SKIP;
      }

      const textNode = node as Text;
      const value = textNode.value;
      if (!value || value.trim().length < 3) return;

      const wrapped = wrapInString(value, processed, used);
      if (wrapped.length === 1 && wrapped[0].type === 'text' && (wrapped[0] as Text).value === value) {
        return; // không thay đổi
      }

      parent.children.splice(index, 1, ...wrapped);
      return [SKIP, index + wrapped.length];
    });
  };
};

export default remarkGlossaryAutolink;
