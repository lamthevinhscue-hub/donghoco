// =============================================================================
// ANATOMY PARTS — nguồn dữ liệu DUY NHẤT 12 bộ phận sơ đồ giải phẫu (hai ngôn ngữ)
// =============================================================================
// G06-A chặng 2 (TXN-20260913-27). Cấp dữ liệu cho: SVG 2D (data-*), nút nhanh
// 2D/3D, tooltip, thẻ chi tiết và engine 3D — trước đây ba bản dữ liệu độc lập
// đã lệch chữ (mảng frontmatter 2D + data-role SVG + mảng 3D).
//
// Câu chữ theo hồ sơ claim đã duyệt: output/g06-anatomy-en-audit/cong-noi-dung-claim.md
// bản 3 (C1–C12 + bảng rà). Không đưa trở lại số chi tiết thật, kích thước,
// vật liệu/hiệu năng hay quan hệ kết cấu đã loại.
// =============================================================================

import type { Lang } from '../i18n/ui';

export interface AnatomyPartLang {
  name: string;
  role: string;
}

export interface AnatomyPart {
  id: string;
  /** Lớp bố cục 0–6 (kính → đáy vỏ) */
  layer: number;
  icon: string;
  /** Link đọc tiếp theo ngôn ngữ; null = chưa có bài (không hiện CTA) */
  link: { vi: string; en: string } | null;
  vi: AnatomyPartLang;
  en: AnatomyPartLang;
}

export const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: 'crystal',
    layer: 0,
    icon: '◈',
    link: null,
    vi: { name: 'Kính cường lực', role: 'Lớp trong suốt bảo vệ mặt số và kim.' },
    en: { name: 'Crystal', role: 'The transparent layer that protects the dial and hands.' },
  },
  {
    id: 'second-hand',
    layer: 1,
    icon: '→',
    link: { vi: '/co-che/bo-thoat', en: '/en/mechanisms/escapement/' },
    vi: { name: 'Kim giây', role: 'Kim hiển thị giây — trong sơ đồ này, quay một vòng mỗi 60 giây.' },
    en: { name: 'Second hand', role: 'The hand that shows the seconds — in this diagram, one turn per 60 seconds.' },
  },
  {
    id: 'minute-hand',
    layer: 1,
    icon: '↛',
    link: { vi: '/co-che/chuyen-dong-co', en: '/en/mechanisms/how-a-mechanical-watch-works/' },
    vi: { name: 'Kim phút', role: 'Kim chỉ phút — trong sơ đồ này, quay một vòng mỗi 60 phút.' },
    en: { name: 'Minute hand', role: 'The hand that shows the minutes — in this diagram, one turn every 60 minutes.' },
  },
  {
    id: 'hour-hand',
    layer: 1,
    icon: '⏰',
    link: { vi: '/co-che/chuyen-dong-co', en: '/en/mechanisms/how-a-mechanical-watch-works/' },
    vi: { name: 'Kim giờ', role: 'Kim chỉ giờ — trong sơ đồ này, quay một vòng mỗi 12 giờ.' },
    en: { name: 'Hour hand', role: 'The hand that shows the hours — in this diagram, one turn every 12 hours.' },
  },
  {
    id: 'dial',
    layer: 2,
    icon: '◔',
    link: null,
    vi: { name: 'Mặt số', role: 'Hiển thị các chữ số, vạch khắc và thương hiệu — nơi người dùng đọc giờ trực tiếp.' },
    en: { name: 'Dial', role: 'Shows the numerals, indices and brand — the surface you read the time from.' },
  },
  {
    id: 'subdial',
    layer: 2,
    icon: '○',
    link: { vi: '/tu-dien/perpetual-calendar', en: '/en/glossary/perpetual-calendar/' },
    vi: { name: 'Mặt số phụ', role: 'Mặt số nhỏ hiển thị chức năng phụ, ví dụ giây chạy hoặc lịch.' },
    en: { name: 'Sub-dial', role: 'A small dial showing a secondary function, such as running seconds or a date.' },
  },
  {
    id: 'mainspring-barrel',
    layer: 3,
    icon: '◎',
    link: { vi: '/co-che/tru-cot', en: '/en/mechanisms/power-reserve/' },
    vi: { name: 'Thùng cót', role: 'Nguồn năng lượng! Chứa dây cót xoắn — lên dây là vặn cót.' },
    en: { name: 'Mainspring barrel', role: 'The power source! It holds the coiled mainspring — winding the watch tightens it.' },
  },
  {
    id: 'gear-train',
    layer: 3,
    icon: '⚙',
    link: { vi: '/co-che/chuyen-dong-co', en: '/en/mechanisms/how-a-mechanical-watch-works/' },
    vi: { name: 'Bánh răng trung gian', role: 'Loạt bánh răng truyền năng lượng từ thùng cót đến bộ thoát và lái các kim.' },
    en: { name: 'Gear train', role: 'A train of gears that carries power from the barrel to the escapement and drives the hands.' },
  },
  {
    id: 'escapement',
    layer: 4,
    icon: '♥',
    link: { vi: '/co-che/bo-thoat', en: '/en/mechanisms/escapement/' },
    vi: { name: 'Bộ thoát', role: 'Nằm giữa bộ bánh răng và bộ điều tiết: chặn và nhả chuyển động của bộ bánh răng theo chu kỳ, cấp năng lượng cho bánh lắc.' },
    en: { name: 'Escapement', role: 'Fitted between the gear train and the regulator: it stops and releases the gears\' motion at regular intervals and supplies energy to the balance.' },
  },
  {
    id: 'balance',
    layer: 4,
    icon: '✺',
    // G04: chương bánh lắc + dây tóc song ngữ (quyết TXN-20260913-23)
    link: { vi: '/co-che/day-toc-banh-lac', en: '/en/mechanisms/balance-and-hairspring/' },
    vi: { name: 'Bánh lắc + dây tóc', role: 'Bánh lắc và dây tóc tạo thành bộ điều tiết — mỗi chu kỳ qua lại (oscillation) gồm hai lần rung (vibration).' },
    en: { name: 'Balance & Hairspring', role: 'The balance and hairspring form the regulating organ — each to-and-fro oscillation comprises two vibrations.' },
  },
  {
    id: 'rotor',
    layer: 5,
    icon: '◐',
    link: { vi: '/co-che/len-day-tu-dong', en: '/en/mechanisms/automatic-winding/' },
    vi: { name: 'Rotor (lên dây tự động)', role: 'Quả nặng xoay theo cổ tay → tự động lên dây cót.' },
    en: { name: 'Rotor', role: 'A swinging weight that follows the wrist\'s motion and winds the mainspring automatically.' },
  },
  {
    id: 'caseback',
    layer: 6,
    icon: '▣',
    link: null,
    vi: { name: 'Đáy vỏ', role: 'Nắp đáy — có loại kín, có loại gắn cửa sổ quan sát bộ máy (đáy kính); kiểu đáy tự nó chưa đủ để kết luận khả năng chống nước.' },
    en: { name: 'Caseback', role: 'The caseback — closed, or fitted with a window over the movement (an exhibition caseback); the caseback style alone does not determine water resistance.' },
  },
];

/** Tên lớp bố cục theo ngôn ngữ (nhãn "Lớp N · …" trong SVG 2D) */
export const ANATOMY_LAYERS: Array<{ vi: string; en: string }> = [
  { vi: 'Kính', en: 'Crystal' },
  { vi: 'Kim', en: 'Hands' },
  { vi: 'Mặt số', en: 'Dial' },
  { vi: 'Bộ máy', en: 'Movement' },
  { vi: 'Bộ thoát', en: 'Escapement' },
  { vi: 'Rotor', en: 'Rotor' },
  { vi: 'Đáy vỏ', en: 'Caseback' },
];

/**
 * Chuỗi runtime cho script trang + engine (nhãn đổi theo thao tác: tách/ghép,
 * mode, thẻ chi tiết về mặc định…). Serialize vào JSON blob `#anatomy-i18n`
 * trong component khuôn; engine nhận `lang` và dùng bảng riêng cùng nghĩa.
 */
export const ANATOMY_UI: Record<Lang, {
  toggle: { explode: string; assemble: string };
  mode2d: { assembled: string; exploded: string };
  mode3d: { assembled: string; exploded: string };
  detail: { icon: string; title: string; hint2d: string; hint3d: string; role2d: string; role3d: string };
  tipLink: string;
}> = {
  vi: {
    toggle: { explode: 'Tách lớp', assemble: 'Ghép lại' },
    mode2d: { assembled: 'Đang ghép (assembled)', exploded: 'Đang tách (exploded)' },
    mode3d: { assembled: 'Đang ghép', exploded: 'Đang tách' },
    detail: {
      icon: '👆',
      title: 'Chọn một bộ phận',
      hint2d: 'Chạm hoặc bấm vào bất kỳ bộ phận nào trong sơ đồ bên cạnh',
      hint3d: 'Chạm hoặc bấm vào bộ phận trong mô hình, hoặc chọn từ danh sách',
      role2d: 'Sơ đồ giải phẫu này cho thấy <strong>12 bộ phận được chọn</strong> của một chiếc đồng hồ cơ — từ kính đến đáy vỏ. Bấm <strong>"Tách lớp"</strong> để xem từng lớp riêng biệt, hoặc chạm/bấm trực tiếp bộ phận để đọc vai trò và link bài chi tiết.',
      role3d: 'Kéo để xoay mô hình 360 độ. Bấm <strong>"Tách lớp"</strong> để phân rã thành từng lớp. Chạm hoặc bấm từng bộ phận (trong mô hình hoặc trong danh sách) để hiểu vai trò.',
    },
    tipLink: '→ Chạm hoặc bấm để đọc bài',
  },
  en: {
    toggle: { explode: 'Explode', assemble: 'Assemble' },
    mode2d: { assembled: 'Assembled', exploded: 'Exploded' },
    mode3d: { assembled: 'Assembled', exploded: 'Exploded' },
    detail: {
      icon: '👆',
      title: 'Pick a part',
      hint2d: 'Tap or click any part in the diagram next to this card',
      hint3d: 'Tap or click a part in the model, or pick one from the list',
      role2d: 'This anatomy diagram shows <strong>12 selected parts</strong> of a mechanical watch, from the crystal to the caseback. Press <strong>"Explode"</strong> to spread the layers apart, or tap a part directly to read its role and the full article.',
      role3d: 'Drag to spin the model 360 degrees. Press <strong>"Explode"</strong> to pull the layers apart. Tap any part (in the model or in the list) to learn its role.',
    },
    tipLink: '→ Tap or click to read the article',
  },
};
