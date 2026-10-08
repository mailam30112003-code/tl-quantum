import { useMemo } from "react";
import logo from "../assets/logo.jpg";
import { makeArt } from "../utils/artSvg";
import { buildFrameSvg } from "../utils/frameSvg";
import { USE_ART, FORCE_PHOTO } from "../data/artConfig";
import { FRAME_MODE } from "../data/frameConfig";

const svgUri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

// Ảnh vẽ tự động (nếu loại này có), không thì dùng ảnh thật trong products.js.
export function getArt(product) {
  if (!USE_ART || !product || FORCE_PHOTO.includes(product.id)) return null;
  return makeArt(product);
}

// Nguồn ảnh: { kind: "art" | "photo", href, svg? } hoặc null nếu không có ảnh.
// mode: "auto" (mặc định) | "art" (ép ảnh vẽ) | "photo" (ép ảnh thật)
export function resolveSource(product, mode = "auto") {
  if (!product) return null;
  const art = mode === "photo" ? null : mode === "art" ? makeArt(product) : getArt(product);
  if (art) return { kind: "art", svg: art, href: svgUri(art) };
  if (product.image) return { kind: "photo", href: product.image };
  return null;
}

function wantFrame(src, framed) {
  if (!src) return false;
  if (framed !== undefined) return framed;
  return FRAME_MODE === "all" || (FRAME_MODE === "photo" && src.kind === "photo");
}

// Sản phẩm này có được bỏ vào khung TL Quantum không (để thẻ biết đổi tỉ lệ ảnh)
export function isFramed(product, mode = "auto") {
  return wantFrame(resolveSource(product, mode));
}

// variant: "card" (gọn) | "full" (đủ ô lợi ích). framed: ép bật / tắt khung.
export default function ProductImage({ product, mode = "auto", variant = "card", framed, className = "" }) {
  const src = useMemo(() => resolveSource(product, mode), [product, mode]);

  const frameSvg = useMemo(
    () => (wantFrame(src, framed) ? buildFrameSvg(product, { image: src.href, logo, variant }) : null),
    [product, src, framed, variant]
  );

  if (frameSvg) {
    return <div className={`tq-framed ${className}`} dangerouslySetInnerHTML={{ __html: frameSvg }} />;
  }
  if (src?.kind === "art") {
    return <div className={`tq-art ${className}`} dangerouslySetInnerHTML={{ __html: src.svg }} />;
  }
  if (src) {
    return <img src={src.href} alt={product.name} loading="lazy" className={className} />;
  }
  return <span className="tq-card-noimg" aria-hidden="true">📦</span>;
}
