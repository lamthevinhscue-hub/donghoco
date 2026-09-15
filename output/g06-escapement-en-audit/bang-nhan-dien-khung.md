# G06-C chặng 1 — Bảng nhận diện khung MechanismAnimation (vòng sửa 2)

Sinh bởi `kiem-ke-khung-render.cjs` từ mã nguồn (map `MechanismArticle.astro`, `TermArticle.astro`, `ARTICLE_PAIRS` trong `contentRoutes.ts`) đối chiếu HTML dist hiện hành trên nền `ced15b8`. "Thực sự render" = HTML tĩnh dist có `data-mechanism`; chế độ đọc từ `data-enhanced` của dist.

**Kết quả: 22 trang thực sự render khung = 17 trang /co-che/ + 5 trang /tu-dien/.** 18 component import khung; import KHÔNG đồng nghĩa render.

| Component | Import khung? | Consumer | Route | Cặp EN (ARTICLE_PAIRS) | Thực sự render (dist) | Chế độ (data-enhanced) |
|---|---|---|---|---|---|---|
| WaterResistance | ✓ | MechanismArticle (chong-nuoc) | /co-che/chong-nuoc/ | /en/mechanisms/water-resistance/ | ✓ /co-che/chong-nuoc/ | cũ |
| PowerReserve | ✓ | MechanismArticle (tru-cot) | /co-che/tru-cot/ | /en/mechanisms/power-reserve/ | ✓ /co-che/tru-cot/ | cũ |
| AntiMagnetic | ✓ | MechanismArticle (chong-tu) | /co-che/chong-tu/ | /en/mechanisms/anti-magnetism/ | ✓ /co-che/chong-tu/ | cũ |
| GearTrain | ✓ | MechanismArticle (chuyen-dong-co) | /co-che/chuyen-dong-co/ | /en/mechanisms/how-a-mechanical-watch-works/ | ✓ /co-che/chuyen-dong-co/ | cũ |
| AutomaticWinding | ✓ | MechanismArticle (len-day-tu-dong) | /co-che/len-day-tu-dong/ | /en/mechanisms/automatic-winding/ | ✓ /co-che/len-day-tu-dong/ | cũ |
| Escapement | ✓ | MechanismArticle (bo-thoat) | /co-che/bo-thoat/ | /en/mechanisms/escapement/ | ✓ /co-che/bo-thoat/ | enhanced |
| Chronograph | ✓ | MechanismArticle (chronograph) | /co-che/chronograph/ | /en/mechanisms/chronograph/ | ✓ /co-che/chronograph/ | cũ |
| Tourbillon | ✓ | MechanismArticle (tourbillon) | /co-che/tourbillon/ | /en/mechanisms/tourbillon/ | ✓ /co-che/tourbillon/ | cũ |
| Hairspring | ✓ | MechanismArticle (day-toc-banh-lac) | /co-che/day-toc-banh-lac/ | /en/mechanisms/balance-and-hairspring/ | ✗ /co-che/day-toc-banh-lac/ (không data-mechanism) — hasBalanceChapter (G04-B thay khung riêng) | — |
| GMT | ✓ | MechanismArticle (gmt) | /co-che/gmt/ | /en/mechanisms/gmt/ | ✓ /co-che/gmt/ | cũ |
| PerpetualCalendar | ✓ | MechanismArticle (perpetual-calendar) | /co-che/perpetual-calendar/ | /en/mechanisms/perpetual-calendar/ | ✓ /co-che/perpetual-calendar/ | cũ |
| ShockProtection | ✓ | MechanismArticle (chong-soc) | /co-che/chong-soc/ | /en/mechanisms/shock-protection/ | ✓ /co-che/chong-soc/ | cũ |
| CoAxial | ✓ | MechanismArticle (bo-thoat-dong-truc) | /co-che/bo-thoat-dong-truc/ | — (VI-only hoặc không áp) | ✓ /co-che/bo-thoat-dong-truc/ | cũ |
| MoonPhase | ✓ | MechanismArticle (pha-trang) | /co-che/pha-trang/ | /en/mechanisms/moon-phase/ | ✓ /co-che/pha-trang/ | cũ |
| DateDisplay | ✓ | MechanismArticle (hien-thi-ngay) | /co-che/hien-thi-ngay/ | — (VI-only hoặc không áp) | ✓ /co-che/hien-thi-ngay/ | cũ |
| Lume | ✓ | MechanismArticle (da-quang) | /co-che/da-quang/ | — (VI-only hoặc không áp) | ✓ /co-che/da-quang/ | cũ |
| Crystal | ✓ | MechanismArticle (kinh-dong-ho) | /co-che/kinh-dong-ho/ | — (VI-only hoặc không áp) | ✓ /co-che/kinh-dong-ho/ | cũ |
| MinuteRepeaterAnim | ✓ | MechanismArticle (diem-chuong) | /co-che/diem-chuong/ | /en/mechanisms/minute-repeater/ | ✓ /co-che/diem-chuong/ | cũ |
| Tourbillon | ✓ | TermArticle (tourbillon) | /tu-dien/tourbillon/ | — (VI-only hoặc không áp) | ✓ /tu-dien/tourbillon/ | cũ |
| MinuteRepeater | — | TermArticle (minute-repeater) | /tu-dien/minute-repeater/ | — (VI-only hoặc không áp) | ✗ /tu-dien/minute-repeater/ (không data-mechanism) | — |
| PerpetualCalendar | ✓ | TermArticle (perpetual-calendar) | /tu-dien/perpetual-calendar/ | — (VI-only hoặc không áp) | ✓ /tu-dien/perpetual-calendar/ | cũ |
| VPH | — | TermArticle (vph) | /tu-dien/vph/ | — (VI-only hoặc không áp) | ✗ /tu-dien/vph/ (không data-mechanism) | — |
| Incabloc | — | TermArticle (incabloc) | /tu-dien/incabloc/ | — (VI-only hoặc không áp) | ✗ /tu-dien/incabloc/ (không data-mechanism) | — |
| Rotor | — | TermArticle (rotor) | /tu-dien/rotor/ | — (VI-only hoặc không áp) | ✗ /tu-dien/rotor/ (không data-mechanism) | — |
| Chronograph | ✓ | TermArticle (chronograph) | /tu-dien/chronograph/ | — (VI-only hoặc không áp) | ✓ /tu-dien/chronograph/ | cũ |
| GMT | ✓ | TermArticle (gmt) | /tu-dien/gmt/ | — (VI-only hoặc không áp) | ✓ /tu-dien/gmt/ | cũ |
| Hairspring | ✓ | TermArticle (day-toc-banh-lac) | /tu-dien/day-toc-banh-lac/ | — (VI-only hoặc không áp) | ✓ /tu-dien/day-toc-banh-lac/ | cũ |

## Đối chiếu con số vòng trước

- Vòng sửa 1 ghi "18 consumer /co-che/ + 9 /tu-dien/" — **SAI ở tầng render**: 18 là số SLUG trong map MechanismArticle, nhưng `/co-che/day-toc-banh-lac/` KHÔNG render khung (gate `hasBalanceChapter` — chương G04 thay bằng mô hình riêng); TermArticle có 9 slug nhưng chỉ 5 component trong số đó import khung và có trang render.
- GPT Work quét dist: **17 trang /co-che/ + 5 trang /tu-dien/ = 22** — script này tái tạo đúng 22.
- Hai cặp "?" trong bảng nhân rộng G04 đã xác định: `chuyen-dong-co ↔ how-a-mechanical-watch-works`, `len-day-tu-dong ↔ automatic-winding` (ARTICLE_PAIRS).
- MoonPhase (glossary) import khung và render ở `/co-che/pha-trang/`; TermArticle KHÔNG dùng MoonPhase.
- Hairspring render 1 route (`/tu-dien/day-toc-banh-lac/`), bị chặn ở `/co-che/day-toc-banh-lac/`.
