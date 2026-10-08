import logo from "../assets/logo.jpg";
import { buildFrameSvg } from "./frameSvg";
import { resolveSource } from "../components/ProductImage";

// Đổi ảnh (đường dẫn) thành data-URI để nhúng thẳng vào SVG trước khi vẽ ra PNG
async function toDataUri(url) {
  if (url.startsWith("data:")) return url;
  const blob = await (await fetch(url)).blob();
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}

const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

// Tải ảnh PNG 1800×1800 của sản phẩm trong khung TL Quantum (dùng đăng Shopee, Facebook...)
export async function downloadFramePng(product, mode = "auto", size = 1800) {
  const src = resolveSource(product, mode);
  if (!src) throw new Error("Sản phẩm chưa có ảnh");
  const svg = buildFrameSvg(product, {
    image: await toDataUri(src.href),
    logo: await toDataUri(logo),
    variant: "full",
  });
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    canvas.getContext("2d").drawImage(img, 0, 0, size, size);
    const png = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    const a = document.createElement("a");
    a.href = URL.createObjectURL(png);
    a.download = `tl-quantum-${slug(product.name)}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  } finally {
    URL.revokeObjectURL(url);
  }
}
