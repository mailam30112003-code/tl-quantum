import { lookupSpecs } from "../data/specsDb";
import { parseOhm, parseCap, resistorBandNames } from "./artSvg";

// Thông số chỉ lấy từ TÊN sản phẩm và dữ liệu có sẵn, không tự bịa thêm.
export function getSpecs(p) {
  const n = p.name;
  const rows = [];
  const add = (k, v) => v && rows.push([k, v]);

  add("Mã sản phẩm", p.sku);
  add("Danh mục", p.category);

  if (p.category === "Điện trở") {
    add("Trị số", (n.match(/([\d.,]+\s*[KkMm]?Ω)/) || [])[1]);
    add("Công suất", (n.match(/(1\/4W|\d+W)/) || [])[1]);
    if (/sứ/i.test(n)) add("Loại", "Điện trở sứ");
    const bands = parseOhm(n) ? resistorBandNames(n) : null;
    if (bands && !/sứ/i.test(n)) add("Vạch màu (4 vạch)", bands.join(" – "));
  } else if (p.category === "Tụ điện") {
    const c = parseCap(n);
    add("Điện dung", c?.text);
    add("Điện áp", (n.match(/(\d+)\s*V\b/i) || [])[1] && `${(n.match(/(\d+)\s*V\b/i) || [])[1]}V`);
    add("Mã in trên tụ", (n.match(/\((\d{2,3})\)/) || [])[1]);
    if (/Tụ hóa/i.test(n)) add("Loại", "Tụ hóa");
    else if (/Tụ gốm/i.test(n)) add("Loại", "Tụ gốm");
    else if (/CBB/i.test(n)) add("Loại", "Tụ film CBB");
  } else if (p.category === "Diode") {
    add("Mã linh kiện", (n.match(/(KBU\d+|1N\d+[A-Z]?|\d+A10)/i) || [])[1]?.toUpperCase());
    const z = n.match(/(\d+(?:[.,]\d)?V)\s*(\d+W)/i);
    if (z) {
      add("Loại", "Diode Zener");
      add("Điện áp Zener", z[1]);
      add("Công suất", z[2]);
    }
  } else if (p.category === "Transistor") {
    add("Mã linh kiện", n.replace(/\(.*?\)|–.*$/g, "").trim().split(/\s/)[0].toUpperCase());
    add("Kiểu chân", /TO-126/i.test(n) ? "TO-126" : /IRF/i.test(n) ? "TO-220" : /D718|B688/i.test(n) ? "" : "TO-92");
  } else if (p.category === "IC") {
    const d = n.match(/DIP-?(\d+)/i);
    add("Kiểu chân", d ? `DIP-${d[1]}` : "");
  } else if (p.category === "Quạt") {
    const m = n.match(/(\d{2})(\d{2})/);
    add("Kích thước", m ? `${m[1]}×${m[1]}×${m[2]}mm` : "");
    add("Điện áp", (n.match(/(\d+)\s*V/i) || [])[1] && `${(n.match(/(\d+)\s*V/i) || [])[1]}V`);
  } else {
    add("Điện áp", (n.match(/(\d+(?:\.\d)?)\s*V\b/) || [])[1] && `${(n.match(/(\d+(?:\.\d)?)\s*V\b/) || [])[1]}V`);
    add("Công suất", (n.match(/(\d+)\s*W\b/) || [])[1] && `${(n.match(/(\d+)\s*W\b/) || [])[1]}W`);
    add("Kích thước", (n.match(/(\d+x\d+x[\d.]+mm|\d+[×x]\d+cm)/i) || [])[1]?.replace(/x/gi, "×"));
    add("Chiều dài", (n.match(/(\d+)\s*cm/i) || [])[1] && `${(n.match(/(\d+)\s*cm/i) || [])[1]}cm`);
  }

  // Thông số kỹ thuật theo datasheet cho module / vi điều khiển / cảm biến
  (lookupSpecs(n) || []).forEach(([k, v]) => {
    const i = rows.findIndex((r) => r[0] === k);
    if (i >= 0) rows.splice(i, 1); // số liệu datasheet thay cho giá trị đoán từ tên
    add(k, v);
  });
  const xtal = n.match(/Thạch anh\s*([\d.]+)\s*MHz/i);
  if (xtal) add("Tần số", `${xtal[1]}MHz`);

  const pack = n.match(/(\d+)\s*(con|cái)/i);
  add("Quy cách", pack ? `${pack[1]} ${pack[2]}` : "");
  add("Tình trạng", p.stock > 0 ? `Còn ${p.stock} sản phẩm` : "Tạm hết hàng");
  return rows;
}
