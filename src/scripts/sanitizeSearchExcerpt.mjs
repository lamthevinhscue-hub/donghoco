// =============================================================================
// SANITIZE SEARCH EXCERPT — bộ làm sạch đoạn trích Pagefind (C3)
// =============================================================================
// Đầu vào là excerpt HTML do Pagefind trả về (có thể lệch thẻ, chứa thuộc tính
// hoặc thẻ lạ). Đầu ra là HTML chỉ gồm VĂN BẢN đã chuẩn hóa thực thể và cặp
// <mark>…</mark> KHÔNG thuộc tính, luôn cân bằng — an toàn cho chỗ gán
// excerpt.innerHTML (SearchInline.astro, SearchBox.astro).
//
// Quy tắc (theo câu lệnh C3 + sửa sau nghiệm thu TXN-20261017-51):
//  - '<' chỉ mở thẻ khi theo sau là chữ hoặc '/' + chữ (giống bộ phân tích
//    HTML: "5 < 6 & 7 > 2" là VĂN BẢN — textContent giữ nguyên văn); '<' khác
//    được escape thành &lt;.
//  - Kết thúc thẻ tôn trọng dấu nháy: '>' trong thuộc tính có nháy không kết
//    thúc thẻ — thuộc tính bị bỏ trọn, không rò thành chữ.
//  - Chú thích đọc tới '-->' (kể cả '>' bên trong); chưa đóng → bỏ tới hết
//    chuỗi; không xuất chữ hay mark bên trong chú thích.
//  - <mark …> mở → xuất <mark> (bỏ mọi thuộc tính); mark lồng được gộp; thiếu
//    đóng ở cuối được tự cân bằng; đóng dư bị bỏ.
//  - Thẻ khác bị bóc (giữ văn bản bên trong); script/style/template bỏ trọn
//    nội dung; doctype/xử lý '?' bỏ như thẻ.
//  - Văn bản: giữ thực thể dạng chuẩn (&amp; &#39; &#x1F600;…), escape & < >
//    lẻ — không thể sinh mã HTML/thực thi từ đầu ra.
// Module thuần JavaScript không dependency — searchCore.ts (sản phẩm) và bộ
// kiểm C3 (Node) cùng gọi ĐÚNG hàm này.
// =============================================================================

const THAY_THE = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };

// Giữ thực thể dạng chuẩn, escape & < > lẻ (kể cả "&wedge" không kết thúc ;)
function chuanHoaVanBan(doan) {
  return doan.replace(/&([a-zA-Z][a-zA-Z0-9]*;|#[0-9]+;|#[xX][0-9a-fA-F]+;)|[&<>]/g, (khop, thucThe) => (thucThe ? '&' + thucThe : THAY_THE[khop]));
}

// Vị trí SAU '>' kết thúc thẻ bắt đầu tại 'tu' — tôn trọng dấu nháy đơn/kép
// ( '>' trong thuộc tính có nháy không kết thúc thẻ). Không tìm thấy → -1.
function timKetThucThe(s, tu) {
  let i = tu;
  while (i < s.length) {
    const ch = s[i];
    if (ch === '"' || ch === "'") {
      const dong = s.indexOf(ch, i + 1);
      if (dong === -1) return -1; // nháy không đóng → thẻ dang dở
      i = dong + 1;
      continue;
    }
    if (ch === '>') return i + 1;
    i++;
  }
  return -1;
}

export function sanitizeExcerpt(raw) {
  if (typeof raw !== 'string' || raw === '') return '';
  let out = '';
  let i = 0;
  let sauMark = 0; // độ sâu mark đang mở (chỉ mở một cấp ở đầu ra)
  let boNoiDung = null; // tên thẻ đang bỏ trọn nội dung (script|style|template)
  const n = raw.length;
  while (i < n) {
    if (boNoiDung) {
      // đang bỏ trọn nội dung script/style/template: mọi '<' không mở đúng thẻ
      // đóng tên đó đều là nội dung bị bỏ (kể cả "if (a < b)" hay "<b)") —
      // không được leak ra ngoài, cũng không được nuốt phần văn bản sau thẻ đóng.
      if (raw[i] !== '<') {
        const ket = raw.indexOf('<', i);
        if (ket === -1) break;
        i = ket;
        continue;
      }
      const phanDau = raw.slice(i, i + 2 + boNoiDung.length).toLowerCase();
      const kyTuSau = raw[i + 2 + boNoiDung.length] ?? '';
      const moTheDong = phanDau === '</' + boNoiDung && /[\s/>]/.test(kyTuSau); // khớp ĐẦY ĐỦ tên — </scriptx> không mở khóa
      if (!moTheDong) { i++; continue; }
      const j = timKetThucThe(raw, i + 1);
      if (j === -1) break; // thẻ đóng dang dở → phần còn lại thuộc nội dung bị bỏ
      boNoiDung = null;
      i = j;
      continue;
    }
    const c = raw[i];
    if (c === '<') {
      const keTiep = raw[i + 1] ?? '';
      if (keTiep === '!') {
        if (raw.startsWith('<!--', i)) {
          // chú thích: đọc tới '-->' (không dừng tại '>' đầu tiên); chưa đóng → bỏ tới hết
          const ket = raw.indexOf('-->', i + 4);
          if (ket === -1) break;
          i = ket + 3;
          continue;
        }
        const jDoctype = timKetThucThe(raw, i + 1); // doctype/xử lý — bỏ như thẻ
        if (jDoctype === -1) { out += chuanHoaVanBan(raw.slice(i)); break; }
        i = jDoctype;
        continue;
      }
      if (!/^[a-zA-Z/?]/.test(keTiep)) { out += '&lt;'; i++; continue; } // '<' không mở thẻ → văn bản ("5 < 6")
      const j = timKetThucThe(raw, i + 1);
      if (j === -1) { out += chuanHoaVanBan(raw.slice(i)); break; } // không có '>' (kể cả trong nháy) → văn bản
      const the = raw.slice(i + 1, j - 1);
      const laDong = the[0] === '/';
      const ten = (laDong ? the.slice(1) : the).trim().split(/[\s/]/)[0].toLowerCase();
      if (ten === 'mark') {
        if (!laDong) { sauMark++; if (sauMark === 1) out += '<mark>'; }
        else if (sauMark > 0) { sauMark--; if (sauMark === 0) out += '</mark>'; }
      } else if (!laDong && (ten === 'script' || ten === 'style' || ten === 'template')) {
        boNoiDung = ten;
      }
      i = j;
      continue;
    }
    const ket = raw.indexOf('<', i);
    const doan = ket === -1 ? raw.slice(i) : raw.slice(i, ket);
    if (doan) out += chuanHoaVanBan(doan);
    i += doan.length;
  }
  if (sauMark > 0) out += '</mark>'; // thiếu đóng → tự cân bằng, không lan
  return out;
}
