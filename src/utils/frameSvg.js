// ============================================================
// Khung ảnh thương hiệu TL Quantum (SVG 900×900, theo mẫu ESP32 DevKit).
// Dùng chung cho: thẻ sản phẩm, trang chi tiết và tải ảnh PNG.
//   buildFrameSvg(product, { image, logo, variant })
//     image   : đường dẫn / data-URI ảnh sản phẩm (ảnh thật hoặc ảnh vẽ)
//     logo    : đường dẫn / data-URI logo
//     variant : "card" (gọn, ảnh to) hoặc "full" (đủ ô lợi ích + ý nổi bật)
// ============================================================

import { BRAND, SHOW_TESTED_BADGE, SHOW_GENUINE_BADGE, BENEFITS, FOOTER } from "../data/frameConfig";
import { FRAME_TITLE, FRAME_PILL, FRAME_HIGHLIGHTS } from "../data/frameInfo";
import { findGroup } from "../data/categories";

const FONT = "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif";
const NAVY = "#13307a";
const BLUE = "#1747b8";
const INK = "#101828";
const GREY = "#5d6b82";

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---------------------------------------------------------- ICON (lưới 24×24)
const ICONS = {
  shield: '<path d="M12 2.5 4.5 5.6v5.6c0 4.9 3.2 8.7 7.5 10.3 4.3-1.6 7.5-5.4 7.5-10.3V5.6L12 2.5Z"/><path d="m8.6 12 2.4 2.4 4.4-4.8"/>',
  box: '<path d="M20.5 7.8 12 3 3.5 7.8v8.4L12 21l8.5-4.8V7.8Z"/><path d="m3.7 7.9 8.3 4.7 8.3-4.7M12 12.6V21"/>',
  code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4.5l-4 15"/>',
  headset: '<path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"/><path d="M4.5 14h3v5h-1.5a1.5 1.5 0 0 1-1.5-1.5V14ZM19.5 14h-3v5h1.5a1.5 1.5 0 0 0 1.5-1.5V14Z"/><path d="M18 19c0 1.6-2.4 2.2-5.5 2.2"/>',
  wifi: '<path d="M2.8 9.2a13 13 0 0 1 18.4 0M5.8 12.4a8.7 8.7 0 0 1 12.4 0M8.8 15.6a4.4 4.4 0 0 1 6.4 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/>',
  chip: '<rect x="6.5" y="6.5" width="11" height="11" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 3v3.5M15 3v3.5M9 17.5V21M15 17.5V21M3 9h3.5M3 15h3.5M17.5 9H21M17.5 15H21"/>',
  usb: '<rect x="3" y="8.5" width="18" height="7" rx="3.5"/><path d="M7.5 12h9"/>',
  pins: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9.3 4v16M14.7 4v16M4 9.3h16M4 14.7h16"/>',
  cloud: '<path d="M7 18a4 4 0 0 1-.6-7.95A6 6 0 0 1 18 9.2 4.4 4.4 0 0 1 17.6 18H7Z"/>',
  home: '<path d="M3 11.2 12 3l9 8.2M5.5 9.8V20h13V9.8M10 20v-5.5h4V20"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1"/>',
  infinity: '<path d="M7.2 8.8c-2.3 0-3.7 1.4-3.7 3.2s1.4 3.2 3.7 3.2c4.4 0 5.6-6.4 9.6-6.4 2.3 0 3.7 1.4 3.7 3.2s-1.4 3.2-3.7 3.2c-4 0-5.2-6.4-9.6-6.4Z"/><path d="M5.8 12h2.4M7 10.8v2.4M16 12h2.4"/>',
};

function icon(name, x, y, size, color, sw = 1.7) {
  const d = ICONS[name];
  if (!d) return "";
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" color="${color}">${d}</svg>`;
}

const text = (x, y, str, size, fill, extra = "") =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" fill="${fill}" ${extra}>${esc(str)}</text>`;

// Ngắt chữ theo số ký tự tối đa mỗi dòng
function wrapText(str, maxChars) {
  const words = String(str).split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if (!cur) cur = w;
    else if ((cur + " " + w).length <= maxChars) cur += " " + w;
    else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// ---------------------------------------------------------- TIÊU ĐỀ
const TITLE_W = 330;
const CW = 0.62; // độ rộng ký tự / cỡ chữ (chữ in hoa, đậm)

function fitTitle(lines) {
  const longest = Math.max(...lines.map((l) => l.length));
  const fs = Math.max(40, Math.min(112, Math.floor(TITLE_W / (longest * CW))));
  return { lines, fs };
}

function autoTitle(name) {
  const raw = name
    .replace(/\(.*?\)/g, "")
    .replace(/\s*[–-]\s*\d+\s*(con|cái).*$/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase()
    // viết hoa xong thì trả lại đơn vị đúng chuẩn (uF → µF, mm, mAh...)
    .replace(/(\d)UF\b/g, "$1µF")
    .replace(/(\d)NF\b/g, "$1nF")
    .replace(/(\d)PF\b/g, "$1pF")
    .replace(/(\d)MM\b/g, "$1mm")
    .replace(/(\d)MAH\b/g, "$1mAh")
    .replace(/MHZ\b/g, "MHz");
  const words = raw.split(" ");
  let best = null;
  for (const fs of [112, 96, 82, 70, 60, 52, 44]) {
    const maxChars = Math.floor(TITLE_W / (fs * CW));
    const lines = wrapText(raw, maxChars);
    if (lines.length <= 3 && words.every((w) => w.length <= maxChars)) {
      best = { lines, fs };
      break;
    }
  }
  return best || { lines: wrapText(raw, 9).slice(0, 4), fs: 44 };
}

function pillText(p) {
  if (FRAME_PILL[p.id]) return FRAME_PILL[p.id];
  const pin = p.name.match(/(\d+)\s*chân/i);
  if (pin) return `${pin[1]} PIN`;
  const cat = p.category.toUpperCase();
  return cat.length <= 14 ? cat : (findGroup(p.category)?.name || p.category).toUpperCase().slice(0, 14);
}

// ---------------------------------------------------------- KHUNG
export function buildFrameSvg(p, { image, logo, variant = "card" } = {}) {
  if (!image) return null;
  const full = variant === "full";
  const u = `f${p.id}${full ? "f" : "c"}`;
  const group = findGroup(p.category)?.name;

  const { lines, fs } = FRAME_TITLE[p.id] ? fitTitle(FRAME_TITLE[p.id]) : autoTitle(p.name);
  const lh = fs * 1.0;
  const base0 = 196 + fs * 0.86;
  const lastBase = base0 + (lines.length - 1) * lh;

  let out = "";

  // nền
  out += `<defs>
    <linearGradient id="bg${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f3f6fc"/></linearGradient>
    <linearGradient id="gold${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe49a"/><stop offset=".5" stop-color="#d9a52e"/><stop offset="1" stop-color="#a8741a"/></linearGradient>
    <linearGradient id="bar${u}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1747b8"/><stop offset="1" stop-color="#0f3396"/></linearGradient>
    <linearGradient id="pill${u}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1c55d6"/><stop offset="1" stop-color="#1342ad"/></linearGradient>
  </defs>`;
  out += `<rect width="900" height="900" fill="url(#bg${u})"/>`;

  // ---- đầu khung: logo + tên
  if (logo) out += `<image href="${esc(logo)}" x="26" y="20" width="104" height="104" preserveAspectRatio="xMidYMid meet"/>`;
  out += text(142, 68, BRAND.name, 32, NAVY, 'font-weight="800"');
  out += text(143, 98, BRAND.tagline, 14, NAVY, 'font-weight="600"');

  // ---- ô "ĐÃ KIỂM ĐỊNH"
  if (SHOW_TESTED_BADGE) {
    const w = SHOW_GENUINE_BADGE ? 262 : 400;
    out += `<rect x="434" y="34" width="${w}" height="76" rx="14" fill="url(#pill${u})"/>`;
    out += `<circle cx="472" cy="72" r="22" fill="#fff"/>` + icon("shield", 459, 59, 26, BLUE, 2);
    out += text(506, 66, "ĐÃ KIỂM ĐỊNH", 21, "#fff", 'font-weight="800"');
    out += text(506, 90, "TEST 100% TRƯỚC KHI GIAO", 13, "#dbe6ff", 'font-weight="600"');
  }

  // ---- huy hiệu vàng
  if (SHOW_GENUINE_BADGE) {
    out += `<path d="M752 146 738 214 768 200 784 150Z" fill="${BLUE}"/><path d="M828 146 842 214 812 200 796 150Z" fill="#0f3396"/>`;
    out += `<circle cx="790" cy="92" r="72" fill="url(#gold${u})"/><circle cx="790" cy="92" r="62" fill="${NAVY}"/><circle cx="790" cy="92" r="56" fill="none" stroke="#e8c15f" stroke-width="1.5" stroke-dasharray="2 4"/>`;
    out += text(790, 66, "HÀNG", 13, "#f4d77e", 'font-weight="800" text-anchor="middle" letter-spacing="1.5"');
    out += text(790, 82, "CHÍNH HÃNG", 15, "#f4d77e", 'font-weight="800" text-anchor="middle"');
    out += text(790, 118, "100%", 36, "url(#gold" + u + ")", 'font-weight="900" text-anchor="middle"');
    out += text(790, 134, "★ ★ ★ ★ ★", 9.5, "#f4d77e", 'text-anchor="middle"');
  }

  // ---- ảnh sản phẩm
  const box = full ? { x: 340, y: 160, w: 360, h: 630 } : { x: 330, y: 200, w: 540, h: 590 };
  out += `<image href="${esc(image)}" x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" preserveAspectRatio="xMidYMid meet" style="mix-blend-mode:multiply"/>`;

  // ---- tiêu đề
  lines.forEach((l, i) => {
    out += text(46, base0 + i * lh, l, fs, i === 0 ? BLUE : INK, 'font-weight="800" letter-spacing="-1"');
  });

  // ---- nhãn xanh
  const pill = pillText(p);
  const pfs = 34;
  const pw = Math.round(pill.length * pfs * 0.66 + 56);
  const py = Math.round(lastBase + 28);
  out += `<rect x="46" y="${py}" width="${pw}" height="58" rx="14" fill="url(#pill${u})"/>`;
  out += text(46 + pw / 2, py + 40, pill, pfs, "#fff", 'font-weight="800" text-anchor="middle"');

  // ---- ý nổi bật (chỉ bản full)
  const hl = FRAME_HIGHLIGHTS[p.id];
  if (full && hl) {
    let y = py + 58 + 36;
    for (const h of hl) {
      if (y + 56 > 800) break;
      out += `<rect x="46" y="${y}" width="56" height="56" rx="12" fill="#fff" stroke="#c9d6f3" stroke-width="1.6"/>` + icon(h.icon, 56, y + 10, 36, BLUE, 1.6);
      out += text(118, y + 24, h.t, 21, NAVY, 'font-weight="800"');
      wrapText(h.d || "", 24)
        .slice(0, 2)
        .forEach((l, i) => (out += text(118, y + 46 + i * 18, l, 15.5, GREY, 'font-weight="500"')));
      y += 76;
    }
  }

  // ---- ô lợi ích bên phải (chỉ bản full)
  if (full) {
    const items = BENEFITS.filter((b) => !b.groups || b.groups.includes(group));
    items.forEach((b, i) => {
      const y = 232 + i * 134;
      out += `<rect x="712" y="${y}" width="150" height="124" rx="14" fill="#fff" stroke="#d3def5" stroke-width="1.6"/>`;
      out += icon(b.icon, 712 + 75 - 20, y + 12, 40, BLUE, 1.6);
      const tl = wrapText(b.t, 13).slice(0, 3);
      tl.forEach((l, j) => (out += text(787, y + 70 + j * 18, l, 15.5, NAVY, 'font-weight="800" text-anchor="middle"')));
      if (b.d) {
        wrapText(b.d, 22)
          .slice(0, 2)
          .forEach((l, j) => (out += text(787, y + 70 + tl.length * 18 + 2 + j * 14, l, 11.5, GREY, 'text-anchor="middle"')));
      }
    });
  }

  // ---- chân khung
  out += `<rect y="822" width="900" height="78" fill="url(#bar${u})"/>`;
  const slot = 900 / FOOTER.length;
  FOOTER.forEach((f, i) => {
    const cx = slot * i + slot / 2;
    const tw = f.t.length * 22 * 0.58;
    const start = cx - (36 + 10 + tw) / 2;
    out += icon(f.icon, start, 843, 36, "#fff", 1.7);
    out += text(start + 46, 869, f.t, 22, "#fff", 'font-weight="700"');
    if (i > 0) out += `<line x1="${slot * i}" y1="842" x2="${slot * i}" y2="880" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" role="img" aria-label="${esc(p.name)}" preserveAspectRatio="xMidYMid meet">${out}</svg>`;
}
