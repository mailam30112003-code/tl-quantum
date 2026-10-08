// ============================================================
// Vẽ ảnh minh họa linh kiện bằng SVG, tự sinh theo tên + danh mục.
// - Điện trở: vạch màu tính đúng theo trị số.
// - Tụ hóa / tụ gốm: in đúng điện dung, điện áp (tụ gốm có mã 104, 102...).
// - Diode, transistor, IC, LED, quạt, breadboard, header, dây cắm, nút nhấn.
// Thêm sản phẩm mới vào products.js thì ảnh tự có, không cần chụp hay chỉnh ảnh.
// Hàm trả về chuỗi SVG, hoặc null nếu loại này chưa có ảnh vẽ (khi đó dùng ảnh thật).
// ============================================================

const FONT = "Inter, system-ui, -apple-system, 'Segoe UI', Arial, sans-serif";
const BG = "#f4f6fb"; // màu "lỗ" nhìn xuyên qua (khớp nền thẻ)
const METAL = "#aeb3bd";
const GOLD = "#d4af37";
const SILVER = "#c9ced8";
const INK = "#1b2333";
const MUTED = "#6b7587";

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const text = (x, y, str, size, fill, extra = "") =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="${FONT}" font-size="${size}" fill="${fill}" ${extra}>${esc(str)}</text>`;

const shadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="9" fill="rgba(16,24,40,.12)"/>`;

const lead = (d, w = 6) =>
  `<path d="${d}" stroke="${METAL}" stroke-width="${w}" stroke-linecap="round" fill="none"/>` +
  `<path d="${d}" stroke="#f1f3f7" stroke-width="${Math.max(1.5, w / 3)}" stroke-linecap="round" fill="none" opacity=".7" transform="translate(-.8,-.8)"/>`;

function badge(name) {
  const m = name.match(/(\d+)\s*(con|cái)/i);
  if (!m) return "";
  return (
    `<rect x="316" y="18" width="68" height="30" rx="15" fill="#1950d1"/>` +
    text(350, 39, `×${m[1]}`, 17, "#fff", 'font-weight="800"')
  );
}

const wrap = (inner, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" role="img" aria-label="${esc(label)}" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;

const num = (s) => parseFloat(String(s).replace(",", "."));

// ---------------------------------------------------------- ĐIỆN TRỞ
const COLORS = ["#161616", "#7a4a21", "#e53935", "#fb8c00", "#fdd835", "#43a047", "#1e88e5", "#8e24aa", "#9e9e9e", "#fafafa"];
const COLOR_NAMES = ["Đen", "Nâu", "Đỏ", "Cam", "Vàng", "Xanh lá", "Xanh dương", "Tím", "Xám", "Trắng"];

export function parseOhm(name) {
  const m = name.match(/([\d.,]+)\s*([KkMm]?)\s*Ω/);
  if (!m) return null;
  const mult = { "": 1, k: 1e3, m: 1e6 }[m[2].toLowerCase()];
  return num(m[1]) * mult;
}

// Trả về chỉ số màu: [chữ số 1, chữ số 2, nhân] (nhân: -1 vàng, -2 bạc)
function bandIndexes(ohm) {
  if (!(ohm > 0)) return null;
  let e = Math.floor(Math.log10(ohm + 1e-9)) - 1;
  let d = Math.round(ohm / Math.pow(10, e));
  if (d >= 100) {
    d = Math.round(d / 10);
    e += 1;
  }
  return [Math.floor(d / 10), d % 10, e];
}
const bandColor = (i) => (i === -1 ? GOLD : i === -2 ? SILVER : COLORS[i]);

// Tên các vạch màu (hiển thị ở trang chi tiết)
export function resistorBandNames(name) {
  const ohm = parseOhm(name);
  const b = bandIndexes(ohm);
  if (!b) return null;
  const mult = b[2] === -1 ? "Nhũ vàng" : b[2] === -2 ? "Nhũ bạc" : COLOR_NAMES[b[2]];
  return [COLOR_NAMES[b[0]], COLOR_NAMES[b[1]], mult, "Nhũ vàng"];
}

function resistor(p, u) {
  const n = p.name;
  const idx = bandIndexes(parseOhm(n));
  if (!idx) return null;
  const cols = [bandColor(idx[0]), bandColor(idx[1]), bandColor(idx[2])];
  const cap = (n.match(/([\d.,]+\s*[KkMm]?Ω)/) || [])[1] || "";
  const kind = /sứ/i.test(n) ? "ceramic" : /3W/.test(n) ? "w3" : "q";
  let body = "";
  let sub = "";

  if (kind === "q") {
    sub = "Điện trở 1/4W";
    body =
      `<defs><clipPath id="c${u}"><rect x="118" y="108" width="164" height="44" rx="21"/></clipPath>` +
      `<linearGradient id="g${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1dfb8"/><stop offset=".55" stop-color="#d9bf8a"/><stop offset="1" stop-color="#b99a62"/></linearGradient></defs>` +
      lead("M60 130H122M278 130H340") +
      `<rect x="118" y="108" width="164" height="44" rx="21" fill="url(#g${u})"/>` +
      `<g clip-path="url(#c${u})">` +
      `<rect x="146" y="100" width="13" height="60" fill="${cols[0]}"/>` +
      `<rect x="172" y="100" width="13" height="60" fill="${cols[1]}"/>` +
      `<rect x="198" y="100" width="13" height="60" fill="${cols[2]}"/>` +
      `<rect x="246" y="100" width="13" height="60" fill="${GOLD}"/>` +
      `<rect x="118" y="112" width="164" height="9" fill="#fff" opacity=".32"/></g>`;
  } else if (kind === "w3") {
    sub = "Điện trở 3W";
    body =
      `<defs><clipPath id="c${u}"><rect x="100" y="98" width="200" height="64" rx="18"/></clipPath>` +
      `<linearGradient id="g${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe3f1"/><stop offset=".55" stop-color="#8db7d6"/><stop offset="1" stop-color="#5f8fb3"/></linearGradient></defs>` +
      lead("M66 130H104M296 130H334", 7) +
      `<rect x="100" y="98" width="200" height="64" rx="18" fill="url(#g${u})"/>` +
      `<g clip-path="url(#c${u})">` +
      `<rect x="130" y="90" width="17" height="80" fill="${cols[0]}"/>` +
      `<rect x="160" y="90" width="17" height="80" fill="${cols[1]}"/>` +
      `<rect x="190" y="90" width="17" height="80" fill="${cols[2]}"/>` +
      `<rect x="250" y="90" width="17" height="80" fill="${GOLD}"/>` +
      `<rect x="100" y="104" width="200" height="11" fill="#fff" opacity=".35"/></g>`;
  } else {
    sub = "Điện trở sứ 5W";
    const printed = `5W ${cap}`;
    body =
      `<defs><linearGradient id="g${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf9f3"/><stop offset=".6" stop-color="#e6e1d3"/><stop offset="1" stop-color="#c9c3b1"/></linearGradient></defs>` +
      lead("M62 130H96M304 130H338", 7) +
      `<rect x="92" y="92" width="216" height="76" rx="7" fill="url(#g${u})" stroke="#bdb6a2" stroke-width="1.5"/>` +
      `<rect x="92" y="92" width="216" height="12" rx="6" fill="#fff" opacity=".55"/>` +
      text(200, 138, printed + " J", 24, "#3a3a36", 'font-weight="700" letter-spacing="1"');
  }

  return wrap(
    `<g transform="translate(200,120) scale(1.25) translate(-200,-130)">` + shadow(200, 166, 112) + body + `</g>` +
      text(200, 248, cap, 42, INK, 'font-weight="800"') + text(200, 276, sub, 17, MUTED),
    n
  );
}

// ---------------------------------------------------------- TỤ HÓA
function elec(uf, v, tf = "") {
  const lg = Math.log10(Math.max(uf, 1));
  const W = Math.round(84 + 22 * lg);
  const H = Math.round(95 + 26 * lg);
  const dark = v >= 35;
  const c1 = dark ? "#0f172a" : "#16306e";
  const c2 = dark ? "#374151" : "#2f58c4";
  const txt = dark ? "#f2d27a" : "#e5ecff";
  const id = `e${uf}x${v}${tf}`.replace(/[^\w]/g, "");
  const x0 = -W / 2;
  return (
    `<g transform="${tf}">` +
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c1}"/><stop offset=".35" stop-color="${c2}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs>` +
    lead(`M-18 0V62`, 5) +
    lead(`M18 0V80`, 5) +
    `<rect x="${x0}" y="${-H}" width="${W}" height="${H}" rx="9" fill="url(#${id})"/>` +
    `<rect x="${x0}" y="-12" width="${W}" height="12" rx="6" fill="#000" opacity=".28"/>` +
    // vạch cực âm
    `<rect x="${x0}" y="${-H + 6}" width="${W * 0.17}" height="${H - 18}" fill="${SILVER}" opacity=".92"/>` +
    [0.78, 0.55, 0.32]
      .map((k) => `<rect x="${x0 + W * 0.045}" y="${-H * k - 2}" width="${W * 0.08}" height="4" rx="2" fill="#2a2f3a"/>`)
      .join("") +
    // chữ dọc thân
    `<text transform="translate(${x0 + W * 0.44},${-H / 2}) rotate(-90)" text-anchor="middle" font-family="${FONT}" font-size="${Math.round(W * 0.15)}" font-weight="800" fill="${txt}">${uf}µF</text>` +
    `<text transform="translate(${x0 + W * 0.7},${-H / 2}) rotate(-90)" text-anchor="middle" font-family="${FONT}" font-size="${Math.round(W * 0.13)}" font-weight="700" fill="${txt}" opacity=".9">${v}V</text>` +
    // nắp trên
    `<ellipse cx="0" cy="${-H}" rx="${W / 2}" ry="12" fill="#d7dbe3"/>` +
    `<ellipse cx="0" cy="${-H}" rx="${W / 2 - 6}" ry="8" fill="#eef0f5"/>` +
    `<path d="M${-W / 4} ${-H - 3}L${W / 4} ${-H + 3}M${W / 4} ${-H - 3}L${-W / 4} ${-H + 3}" stroke="#9aa1ae" stroke-width="2" opacity=".7"/>` +
    `<rect x="${x0 + W * 0.58}" y="${-H + 10}" width="5" height="${H - 24}" rx="2.5" fill="#fff" opacity=".18"/>` +
    `</g>`
  );
}

// ---------------------------------------------------------- TỤ GỐM
function ceramicCode(pF) {
  if (pF < 100) return String(Math.round(pF));
  const e = Math.floor(Math.log10(pF + 1e-9)) - 1;
  const d = Math.round(pF / Math.pow(10, e));
  return `${d}${e}`;
}

export function parseCap(name) {
  const m = name.match(/([\d.,]+)\s*(pF|nF|µF|uF)/i);
  if (!m) return null;
  const k = { pf: 1, nf: 1e3, "µf": 1e6, uf: 1e6 }[m[2].toLowerCase()];
  return { pF: num(m[1]) * k, text: `${m[1]}${m[2].replace("u", "µ")}` };
}

function disc(code, volt, tf, color = ["#f7bd55", "#dc8d22"], size = 50) {
  const id = `d${code}${tf}`.replace(/[^\w]/g, "");
  return (
    `<g transform="${tf}">` +
    `<defs><radialGradient id="${id}" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="${color[0]}"/><stop offset="1" stop-color="${color[1]}"/></radialGradient></defs>` +
    lead("M-17 -14V40M17 -14V40", 5) +
    `<ellipse cx="0" cy="-16" rx="24" ry="11" fill="${color[1]}"/>` +
    `<circle cx="0" cy="${-size - 14}" r="${size}" fill="url(#${id})"/>` +
    `<ellipse cx="-16" cy="${-size - 32}" rx="${size * 0.4}" ry="${size * 0.2}" fill="#fff" opacity=".28" transform="rotate(-25 -16 ${-size - 32})"/>` +
    `<text x="0" y="${-size - 6}" text-anchor="middle" font-family="${FONT}" font-size="${Math.round(size * 0.62)}" font-weight="800" fill="#5b3a0b">${esc(code)}</text>` +
    (volt ? `<text x="0" y="${-size + 16}" text-anchor="middle" font-family="${FONT}" font-size="${Math.round(size * 0.3)}" font-weight="700" fill="#7a5214">${esc(volt)}</text>` : "") +
    `</g>`
  );
}

function film(name) {
  const m = name.match(/([\d.,]+)\s*µ?F\s*(\d+)V/i);
  const label = m ? `${m[1]}µF ${m[2]}V` : "CBB";
  return (
    `<defs><linearGradient id="fm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c2271a"/><stop offset=".4" stop-color="#ee4a37"/><stop offset="1" stop-color="#b21f14"/></linearGradient></defs>` +
    lead("M165 190V262M235 190V262", 5) +
    `<rect x="120" y="60" width="160" height="134" rx="10" fill="url(#fm)"/>` +
    `<rect x="132" y="68" width="10" height="118" rx="5" fill="#fff" opacity=".2"/>` +
    text(200, 112, "CBB", 30, "#fff3d6", 'font-weight="800" letter-spacing="3"') +
    text(200, 148, label, 24, "#ffe9b8", 'font-weight="800"') +
    text(200, 176, "Tụ film", 15, "#ffd9a8", 'opacity=".9"')
  );
}

function capacitor(p, u) {
  const n = p.name;
  if (/CBB/i.test(n)) return wrap(shadow(200, 270, 80) + film(n) + badge(n), n);

  if (/Tụ hóa/i.test(n)) {
    if (/các loại/i.test(n)) {
      const inner =
        shadow(200, 268, 150) +
        elec(1000, 25, "translate(112,204) scale(.72)") +
        elec(100, 50, "translate(288,204) scale(.72)") +
        elec(220, 16, "translate(200,214) scale(.9)");
      return wrap(inner, n);
    }
    const m = n.match(/([\d.,]+)\s*[uµ]F\s*(\d+)V/i);
    if (!m) return null;
    const uf = num(m[1]);
    const v = parseInt(m[2], 10);
    const H = 95 + 26 * Math.log10(Math.max(uf, 1));
    const s = H > 175 ? 0.9 : 1;
    return wrap(shadow(200, 270, 90) + elec(uf, v, `translate(200,${Math.round(205 * (s === 1 ? 1 : 1))}) scale(${s})`), n);
  }

  // tụ gốm
  const cols = { a: ["#f7bd55", "#dc8d22"], b: ["#9fd0ec", "#4f9cc6"], c: ["#e7c9a1", "#b88a55"] };
  if (/các loại/i.test(n)) {
    const inner =
      shadow(200, 268, 150) +
      disc("22", "", "translate(104,216) scale(.62)", cols.b) +
      disc("104", "50V", "translate(200,226) scale(.82)", cols.a) +
      disc("471", "", "translate(296,216) scale(.62)", cols.c);
    return wrap(inner, n);
  }
  const c = parseCap(n);
  if (!c) return null;
  const explicit = (n.match(/\((\d{2,3})\)/) || [])[1];
  const code = explicit || ceramicCode(c.pF);
  const vv = (n.match(/(\d+)\s*V\b/i) || [])[1];
  return wrap(shadow(200, 262, 70) + disc(code, vv ? `${vv}V` : "", "translate(200,208) scale(1.18)", cols.a) + text(200, 292, c.text, 18, MUTED, 'font-weight="700"'), n);
}

// ---------------------------------------------------------- DIODE
function diode(p, u) {
  const n = p.name;
  const tok = (n.match(/(KBU\d+|1N\d+[A-Z]?|\d+A10)/i) || [])[1];
  if (!tok) return null;

  if (/KBU/i.test(n)) {
    return wrap(
      shadow(200, 272, 100) +
        [140, 180, 220, 260].map((x) => lead(`M${x} 168V258`, 6)).join("") +
        `<defs><linearGradient id="k${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a404c"/><stop offset="1" stop-color="#14171d"/></linearGradient></defs>` +
        `<rect x="110" y="64" width="180" height="108" rx="8" fill="url(#k${u})"/>` +
        `<rect x="116" y="70" width="168" height="10" rx="5" fill="#fff" opacity=".12"/>` +
        text(200, 112, tok.toUpperCase(), 26, "#e8ecf4", 'font-weight="800"') +
        text(200, 150, "10A · Cầu diode", 15, "#aab2c0") +
        [["~", 140], ["+", 180], ["−", 220], ["~", 260]].map(([t, x]) => text(x, 164, t, 17, "#e8ecf4", 'font-weight="700"')).join(""),
      n
    );
  }

  const big = /6A10|10A10/i.test(n);
  const x1 = big ? 120 : 138;
  const x2 = big ? 280 : 262;
  const h = big ? 70 : 38;
  const y = 130 - h / 2;
  const bandW = big ? 20 : 15;
  const spec = n.match(/(\d+(?:[.,]\d)?V)\s*(\d+W)/i);
  const sub = spec ? `Zener ${spec[1]} · ${spec[2]}` : /1N581|1N5817|1N5819/i.test(tok) ? "Schottky" : big ? "Diode công suất" : "Diode";
  return wrap(
    shadow(200, 192, 118) +
      `<defs><linearGradient id="d${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a505c"/><stop offset=".5" stop-color="#1d2128"/><stop offset="1" stop-color="#0d0f14"/></linearGradient></defs>` +
      lead(`M26 130H${x1 + 6}M${x2 - 6} 130H374`, big ? 8 : 6) +
      `<rect x="${x1}" y="${y}" width="${x2 - x1}" height="${h}" rx="${big ? 12 : 9}" fill="url(#d${u})"/>` +
      `<rect x="${x2 - bandW - 6}" y="${y}" width="${bandW}" height="${h}" fill="#dfe3ea"/>` +
      `<rect x="${x1 + 8}" y="${y + 5}" width="${x2 - x1 - bandW - 24}" height="5" rx="2.5" fill="#fff" opacity=".18"/>` +
      text((x1 + x2 - bandW - 6) / 2 + 2, 136, tok.toUpperCase(), big ? 22 : 16, "#f2f4f8", 'font-weight="800"') +
      text(200, 238, tok.toUpperCase(), 38, INK, 'font-weight="800"') +
      text(200, 266, sub, 17, MUTED) +
      badge(n),
    n
  );
}

// ---------------------------------------------------------- TRANSISTOR
function to92(tok, tf = "") {
  const id = `t${tok}${tf}`.replace(/[^\w]/g, "");
  return (
    `<g transform="${tf}">` +
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#14171d"/><stop offset=".35" stop-color="#3b414d"/><stop offset="1" stop-color="#14171d"/></linearGradient></defs>` +
    [-30, 0, 30].map((x) => lead(`M${x} 0V90`, 5)).join("") +
    `<path d="M-50 0V-52A50 50 0 0 1 50 -52V0Z" fill="url(#${id})"/>` +
    `<path d="M-50 0V-52A50 50 0 0 1 50 -52V0Z" fill="none" stroke="#000" stroke-opacity=".25"/>` +
    `<rect x="-50" y="-8" width="100" height="8" fill="#000" opacity=".25"/>` +
    `<text x="0" y="-38" text-anchor="middle" font-family="${FONT}" font-size="${tok.length > 6 ? 17 : 22}" font-weight="800" fill="#f2f4f8">${esc(tok)}</text>` +
    `<text x="0" y="-18" text-anchor="middle" font-family="${FONT}" font-size="11" fill="#aab2c0">TO-92</text>` +
    `</g>`
  );
}

function to220(tok, tf = "", pkg = "TO-220") {
  const id = `m${tok}${tf}`.replace(/[^\w]/g, "");
  return (
    `<g transform="${tf}">` +
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9aa1ae"/><stop offset=".45" stop-color="#eef0f5"/><stop offset="1" stop-color="#8b92a0"/></linearGradient></defs>` +
    [-35, 0, 35].map((x) => lead(`M${x} 0V82`, 6)).join("") +
    `<rect x="-62" y="-150" width="124" height="62" rx="4" fill="url(#${id})"/>` +
    `<circle cx="0" cy="-124" r="10" fill="${BG}" stroke="#8b92a0" stroke-width="2"/>` +
    `<rect x="-60" y="-90" width="120" height="90" rx="4" fill="#181b22"/>` +
    `<rect x="-60" y="-90" width="120" height="8" fill="#fff" opacity=".1"/>` +
    `<text x="0" y="-42" text-anchor="middle" font-family="${FONT}" font-size="${tok.length > 6 ? 19 : 23}" font-weight="800" fill="#f2f4f8">${esc(tok)}</text>` +
    `<text x="0" y="-20" text-anchor="middle" font-family="${FONT}" font-size="11" fill="#aab2c0">${pkg}</text>` +
    `</g>`
  );
}

function to126(tok, tf = "") {
  return (
    `<g transform="${tf}">` +
    [-30, 0, 30].map((x) => lead(`M${x} 0V84`, 5)).join("") +
    `<rect x="-54" y="-128" width="108" height="128" rx="5" fill="#1b1e25"/>` +
    `<rect x="-54" y="-128" width="108" height="10" rx="4" fill="#fff" opacity=".1"/>` +
    `<circle cx="0" cy="-102" r="8" fill="${BG}" stroke="#4b5260" stroke-width="2"/>` +
    `<text x="0" y="-48" text-anchor="middle" font-family="${FONT}" font-size="24" font-weight="800" fill="#f2f4f8">${esc(tok)}</text>` +
    `<text x="0" y="-26" text-anchor="middle" font-family="${FONT}" font-size="11" fill="#aab2c0">TO-126</text>` +
    `</g>`
  );
}

function transistor(p, u) {
  const n = p.name;
  const clean = n.replace(/\(.*?\)|–.*$/g, "").trim();
  if (/D718/i.test(n) && /B688/i.test(n)) {
    return wrap(shadow(200, 272, 150) + to220("D718", "translate(120,176) scale(.78)", "") + to220("B688", "translate(282,176) scale(.78)", ""), n);
  }
  if (/IRF/i.test(n)) {
    const tok = clean.split(/\s/)[0].toUpperCase();
    return wrap(shadow(200, 272, 80) + to220(tok, "translate(200,180)") + badge(n), n);
  }
  if (/B772|D882/i.test(n)) {
    const tok = clean.split(/\s/)[0].toUpperCase();
    return wrap(shadow(200, 274, 80) + to126(tok, "translate(200,170)") + badge(n), n);
  }
  const tok = clean.split(/\s/)[0].toUpperCase();
  if (!tok) return null;
  return wrap(shadow(200, 272, 70) + to92(tok, "translate(200,160) scale(1.25)") + badge(n), n);
}

// ---------------------------------------------------------- IC & ĐẾ IC
function pinCount(n) {
  const sock = n.match(/DIP-?(\d+)/i);
  if (sock) return parseInt(sock[1], 10);
  if (/ULN2803/i.test(n)) return 18;
  if (/74HC|ULN2003/i.test(n)) return 16;
  return 8;
}

function ic(p, u) {
  const n = p.name;
  const isSocket = /^Đế IC/i.test(n);
  const pins = pinCount(n);
  const k = pins / 2;
  const W = Math.min(300, k * 28 + 28);
  const L = 200 - W / 2;
  const R = 200 + W / 2;
  const tok = isSocket
    ? `DIP-${pins}`
    : (n.replace(/\(.*?\)|–.*$/g, "").trim().split(/\s/)[0] || "IC").toUpperCase();
  const px = (i) => L + 12 + ((i + 0.5) * (W - 24)) / k;

  let out = shadow(200, 214, W / 2 + 10);
  if (isSocket) {
    out +=
      `<rect x="${L}" y="96" width="${W}" height="84" rx="6" fill="#2b3039"/>` +
      `<rect x="${L + 10}" y="108" width="${W - 20}" height="60" rx="4" fill="#12151b"/>` +
      Array.from({ length: k }, (_, i) => `<rect x="${px(i) - 5}" y="112" width="10" height="10" rx="2" fill="${GOLD}"/><rect x="${px(i) - 5}" y="154" width="10" height="10" rx="2" fill="${GOLD}"/>`).join("") +
      `<rect x="${L + 14}" y="132" width="${W - 28}" height="8" rx="4" fill="#2b3039"/>` +
      `<circle cx="${L}" cy="138" r="9" fill="${BG}"/>`;
  } else {
    const fs = tok.length > 9 ? 18 : tok.length > 6 ? 22 : 26;
    out +=
      Array.from({ length: k }, (_, i) => {
        const x = px(i) - 5;
        return `<rect x="${x}" y="80" width="10" height="20" rx="2" fill="${METAL}"/><rect x="${x}" y="176" width="10" height="20" rx="2" fill="${METAL}"/>`;
      }).join("") +
      `<defs><linearGradient id="i${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b414d"/><stop offset=".5" stop-color="#1b1e25"/><stop offset="1" stop-color="#101216"/></linearGradient></defs>` +
      `<rect x="${L}" y="98" width="${W}" height="80" rx="6" fill="url(#i${u})"/>` +
      `<rect x="${L + 8}" y="102" width="${W - 16}" height="7" rx="3.5" fill="#fff" opacity=".12"/>` +
      `<circle cx="${L}" cy="138" r="9" fill="${BG}"/>` +
      `<circle cx="${L + 22}" cy="164" r="4" fill="#4b5260"/>` +
      text(200 + 6, 146, tok, fs, "#f2f4f8", 'font-weight="800"');
  }
  out += text(200, 250, isSocket ? `Đế IC ${pins} chân` : tok, 34, INK, 'font-weight="800"');
  out += text(200, 276, isSocket ? "Đế cắm IC DIP" : `DIP-${pins}`, 17, MUTED);
  return wrap(out + badge(n), n);
}

// ---------------------------------------------------------- LED
function led(color, tf, id) {
  return (
    `<g transform="${tf}">` +
    `<defs><radialGradient id="${id}" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="${color}"/><stop offset="1" stop-color="${color}" stop-opacity=".78"/></radialGradient></defs>` +
    lead("M-8 0V74", 4) +
    lead("M8 0V96", 4) +
    `<rect x="-27" y="-9" width="54" height="9" rx="2" fill="${color}" opacity=".85"/>` +
    `<path d="M-22 -9V-60A22 22 0 0 1 22 -60V-9Z" fill="url(#${id})" stroke="rgba(0,0,0,.12)"/>` +
    `<ellipse cx="-9" cy="-62" rx="5" ry="12" fill="#fff" opacity=".5"/>` +
    `</g>`
  );
}

function ledCombo(p, u) {
  const n = p.name;
  const cols = ["#ef4444", "#facc15", "#22c55e", "#3b82f6", "#dfe5ee", "#fb923c"];
  const s = /3mm/i.test(n) ? 0.72 : 0.9;
  const size = (n.match(/(\d)mm/i) || [])[1];
  return wrap(
    shadow(200, 262, 150) +
      cols.map((c, i) => led(c, `translate(${73 + i * 54},${176}) scale(${s})`, `l${u}${i}`)).join("") +
      text(200, 288, `LED ${size || ""}mm · 6 màu`, 17, MUTED),
    n
  );
}

// ---------------------------------------------------------- QUẠT
function fan(p, u) {
  const n = p.name;
  const m = n.match(/(\d{2})(\d{2})/);
  const volt = (n.match(/(\d+)\s*V/i) || [])[1];
  const blades = Array.from({ length: 7 }, (_, i) =>
    `<path d="M0 -16C26 -26 58 -52 46 -82C22 -72 -6 -52 -12 -16Z" fill="#4b5563" transform="rotate(${(i * 360) / 7})"/>`
  ).join("");
  return wrap(
    shadow(200, 262, 100) +
      `<rect x="100" y="36" width="200" height="200" rx="20" fill="#1f2937"/>` +
      `<circle cx="200" cy="136" r="88" fill="#0b1220"/>` +
      `<g transform="translate(200,136)">${blades}<circle r="24" fill="#111827"/><circle r="15" fill="#e5e7eb"/>${volt ? `<text y="5" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="800" fill="#1f2937">${volt}V</text>` : ""}</g>` +
      [[118, 54], [282, 54], [118, 218], [282, 218]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${BG}" stroke="#374151" stroke-width="2"/>`).join("") +
      text(200, 276, m ? `${m[1]}×${m[1]}×${m[2]}mm${volt ? ` · ${volt}V` : ""}` : n, 18, MUTED, 'font-weight="700"'),
    n
  );
}

// ---------------------------------------------------------- PHỤ KIỆN
function breadboard(p, u) {
  return wrap(
    shadow(200, 262, 150) +
      `<defs><pattern id="p${u}" width="12" height="12" patternUnits="userSpaceOnUse"><rect x="4" y="4" width="4" height="4" rx="1" fill="#374151"/></pattern></defs>` +
      `<rect x="50" y="52" width="300" height="196" rx="10" fill="#f8f9fb" stroke="#cfd4de" stroke-width="2"/>` +
      `<rect x="50" y="144" width="300" height="14" fill="#e5e8ee"/>` +
      `<line x1="68" y1="68" x2="332" y2="68" stroke="#ef4444" stroke-width="3"/>` +
      `<line x1="68" y1="82" x2="332" y2="82" stroke="#3b82f6" stroke-width="3"/>` +
      `<line x1="68" y1="218" x2="332" y2="218" stroke="#ef4444" stroke-width="3"/>` +
      `<line x1="68" y1="232" x2="332" y2="232" stroke="#3b82f6" stroke-width="3"/>` +
      `<rect x="68" y="96" width="264" height="48" fill="url(#p${u})"/>` +
      `<rect x="68" y="160" width="264" height="48" fill="url(#p${u})"/>` +
      text(200, 282, /MB-102/i.test(p.name) ? "Breadboard MB-102" : "Breadboard", 16, MUTED, 'font-weight="700"'),
    p.name
  );
}

function header(p, u) {
  const female = /Header cái/i.test(p.name);
  const pins = Array.from({ length: 40 }, (_, i) => 56 + i * 7.2);
  const inner = female
    ? `<rect x="46" y="112" width="308" height="62" rx="4" fill="#161a21"/>` +
      pins.map((x) => `<rect x="${x - 2.6}" y="138" width="5.2" height="5.2" fill="#0a0c10" stroke="${GOLD}" stroke-width="1.2"/>`).join("") +
      `<rect x="46" y="112" width="308" height="8" rx="3" fill="#fff" opacity=".1"/>`
    : pins.map((x) => `<rect x="${x - 1.5}" y="84" width="3" height="56" fill="${GOLD}"/><rect x="${x - 1.5}" y="160" width="3" height="40" fill="${GOLD}"/>`).join("") +
      `<rect x="46" y="138" width="308" height="24" rx="3" fill="#161a21"/>` +
      `<rect x="46" y="138" width="308" height="6" rx="3" fill="#fff" opacity=".12"/>`;
  const pitch = /2\.0mm/i.test(p.name) ? "2.0mm" : "2.54mm";
  return wrap(
    shadow(200, 232, 150) + inner + text(200, 266, `${female ? "Header cái" : "Pin header đực"} · 40 chân · ${pitch}`, 16, MUTED, 'font-weight="700"') + badge(p.name),
    p.name
  );
}

function jumper(p, u) {
  const cols = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#92400e", "#6b7280", "#e5e7eb", "#161616"];
  const len = (p.name.match(/(\d+)\s*cm/i) || [])[1];
  return wrap(
    shadow(200, 252, 140) +
      cols.map((c, i) => `<path d="M72 ${74 + i * 13}C150 ${74 + i * 13 + 34},250 ${74 + i * 13 - 34},328 ${74 + i * 13}" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>`).join("") +
      `<rect x="48" y="62" width="30" height="150" rx="6" fill="#161a21"/><rect x="322" y="62" width="30" height="150" rx="6" fill="#161a21"/>` +
      [48, 322].map((x) => `<rect x="${x + 2}" y="64" width="26" height="8" rx="3" fill="#fff" opacity=".12"/>`).join("") +
      text(200, 276, len ? `Dây cắm ${len}cm` : "Dây cắm", 18, MUTED, 'font-weight="700"'),
    p.name
  );
}

function tactile(p, u) {
  const dim = ((p.name.match(/(\d+x\d+x[\d.]+mm)/i) || [])[1] || "").replace(/x/gi, "×");
  return wrap(
    shadow(200, 232, 90) +
      [[142, 104], [142, 176], [246, 104], [246, 176]].map(([x, y]) => `<rect x="${x}" y="${y}" width="14" height="8" rx="2" fill="${METAL}"/>`).join("") +
      `<defs><linearGradient id="t${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d7dbe3"/><stop offset="1" stop-color="#8b92a0"/></linearGradient></defs>` +
      `<rect x="150" y="90" width="100" height="100" rx="9" fill="url(#t${u})" stroke="#7a8190"/>` +
      `<circle cx="200" cy="140" r="31" fill="#1f2530"/><circle cx="200" cy="140" r="31" fill="none" stroke="#3b4350" stroke-width="3"/>` +
      `<ellipse cx="190" cy="128" rx="11" ry="7" fill="#fff" opacity=".22"/>` +
      text(200, 262, dim ? `Nút nhấn ${dim}` : "Nút nhấn", 17, MUTED, 'font-weight="700"') +
      badge(p.name),
    p.name
  );
}

function accessory(p, u) {
  const n = p.name;
  if (/Breadboard/i.test(n)) return breadboard(p, u);
  if (/Header|Pin header/i.test(n)) return header(p, u);
  if (/dây cắm/i.test(n)) return jumper(p, u);
  if (/Nút nhấn/i.test(n)) return tactile(p, u);
  return null;
}

// ---------------------------------------------------------- ĐIỂM VÀO
export function makeArt(p) {
  if (!p || !p.name) return null;
  const u = `a${p.id}`;
  try {
    switch (p.category) {
      case "Điện trở":
        return resistor(p, u);
      case "Tụ điện":
        return capacitor(p, u);
      case "Diode":
        return diode(p, u);
      case "Transistor":
        return transistor(p, u);
      case "IC":
        return ic(p, u);
      case "LED":
        return /combo/i.test(p.name) ? ledCombo(p, u) : null;
      case "Quạt":
        return fan(p, u);
      case "Phụ kiện":
        return accessory(p, u);
      default:
        return null;
    }
  } catch {
    return null;
  }
}
