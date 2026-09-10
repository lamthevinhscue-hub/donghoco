// P3.2 — Thư viện chung: nhận diện phần tử có ID trong HTML (bản sửa TXN-20260910-22)
// Được dùng bởi quet-gradient.cjs (kiểm kê dist) và kiem-thu-cong-cu.cjs (kiểm thử cô lập).
// Quy tắc:
//   1. Bỏ qua nội dung KHÔNG phải DOM thật: comment HTML <!-- … --> và khối <script …>…</script>
//      (kể cả script type="application/ld+json" — dữ liệu có cấu trúc, không phải phần tử hiển thị).
//   2. Chỉ nhận thuộc tính `id` đứng độc lập (trước nó là khoảng trắng hoặc đầu thẻ) —
//      không nhận nhầm data-part-id, data-id, aria-labelledby…

const RE_COMMENT = /<!--[\s\S]*?-->/g;
const RE_SCRIPT = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
const RE_TAG = /<([a-zA-Z][a-zA-Z0-9-]*)((?:\s[^<>]*?)?)>/g;
const RE_ID_ATTR = /(?:^|\s)id\s*=\s*"([^"]*)"/;

/** Loại bỏ comment HTML và khối script — phần còn lại là markup DOM thật. */
function markupThatDom(text) {
  return text.replace(RE_COMMENT, '').replace(RE_SCRIPT, '');
}

/** Quét toàn bộ phần tử có thuộc tính id trong markup DOM: [{ tag, id, index }]. */
function scanIdInventory(html) {
  const dom = markupThatDom(html);
  const out = [];
  let m;
  RE_TAG.lastIndex = 0;
  while ((m = RE_TAG.exec(dom)) !== null) {
    const attrs = m[2] || '';
    const idm = attrs.match(RE_ID_ATTR);
    if (idm) out.push({ tag: m[1], id: idm[1], index: m.index });
  }
  return out;
}

module.exports = { markupThatDom, scanIdInventory };
