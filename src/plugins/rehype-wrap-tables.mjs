// =============================================================================
// rehype-wrap-tables — Bọc mọi <table> trong Markdown bằng vùng cuộn ngang
// =============================================================================
// Reflow WCAG 1.4.10 / 1.4.12: bảng dữ liệu rộng (và cả bảng hẹp khi người
// dùng tăng letter/word-spacing) không được làm TRANG tràn ngang — bảng phải
// cuộn trong wrapper riêng. Bọc tại BUILD (không phụ thuộc JS chạy lúc load)
// vì trạng thái spacing của người dùng không thể biết trước.
//
// Wrapper khớp class JS markOverflowTables() ở BaseLayout (table-scroll-wrap)
// nên không bị bọc hai lần.
//
// Ngôn ngữ: nhãn region cho trình đọc màn hình theo ngôn ngữ của FILE đang xử
// lý (đường dẫn chứa /en/ = tiếng Anh) — hoạt động cả khi JavaScript tắt.
// =============================================================================

export default function rehypeWrapTables() {
  return (tree, file) => {
    const sourcePath = String(file?.history?.[0] ?? file?.path ?? '').split('\\').join('/');
    const isEn = sourcePath.split('/').includes('en');
    const ariaLabel = isEn
      ? 'Data table — use the left and right arrow keys to see more columns'
      : 'Bảng dữ liệu — dùng phím mũi tên trái và phải để xem thêm cột';

    const replaceIn = (node) => {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type === 'element' && child.tagName === 'table') {
          node.children[i] = {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['table-scroll-wrap', 'overflow-x-auto'],
              // Vùng cuộn nhận focus bằng bàn phím (WCAG 2.1.1) + tên cho SR
              tabIndex: 0,
              role: 'region',
              ariaLabel,
            },
            children: [child],
          };
        } else {
          replaceIn(child);
        }
      }
    };
    replaceIn(tree);
  };
}
