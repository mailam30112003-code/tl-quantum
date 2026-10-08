import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import products from "../data/products";
import { findGroup } from "../data/categories";
import { useCart } from "../context/CartContext";
import ProductImage, { getArt, isFramed } from "../components/ProductImage";
import { downloadFramePng } from "../utils/frameExport";
import ProductCard from "../components/ProductCard";
import { getSpecs } from "../utils/productInfo";
import "./ProductDetail.css";

const formatPrice = (n) => Number(n).toLocaleString("vi-VN") + "đ";
const catLink = (name) => `/?cat=${encodeURIComponent(name)}#catalog`;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = useMemo(() => products.find((p) => String(p.id) === id), [id]);

  const [view, setView] = useState("art");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [saving, setSaving] = useState(false);

  // Mỗi lần mở sản phẩm khác thì đặt lại số lượng và ảnh
  useEffect(() => {
    setQty(1);
    setAdded(false);
    setView("art");
  }, [id]);

  useEffect(() => {
    if (product) document.title = `${product.name} | TL Quantum`;
    return () => {
      document.title = "TL Quantum";
    };
  }, [product]);

  const related = useMemo(() => {
    if (!product) return [];
    const same = products.filter((p) => p.id !== product.id && p.category === product.category);
    const group = findGroup(product.category);
    const near = group
      ? products.filter((p) => p.id !== product.id && p.category !== product.category && group.match.includes(p.category))
      : [];
    return [...same, ...near]
      .sort((a, b) => (b.stock > 0) - (a.stock > 0))
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="tq-container pd-missing">
        <div>🔍</div>
        <h1>Không tìm thấy sản phẩm</h1>
        <p>Sản phẩm này có thể đã bị xóa hoặc đường dẫn không đúng.</p>
        <Link to="/" className="pd-btn primary">Về trang chủ</Link>
      </div>
    );
  }

  const p = product;
  const out = p.stock <= 0;
  const hasArt = !!getArt(p);
  const hasPhoto = !!p.image;
  const group = findGroup(p.category);
  const specs = getSpecs(p);
  const mode = view === "photo" && hasPhoto ? "photo" : hasArt ? "art" : "photo";

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(p.stock, q + 1));
  const onQty = (e) => {
    const v = parseInt(e.target.value, 10);
    setQty(Number.isNaN(v) ? 1 : Math.min(p.stock, Math.max(1, v)));
  };

  const handleAdd = () => {
    if (addToCart(p, qty)) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1400);
    }
  };
  const handleDownload = async () => {
    setSaving(true);
    try {
      await downloadFramePng(p, mode);
    } catch {
      alert("Không tạo được ảnh. Bạn thử lại hoặc tải lại trang nhé.");
    } finally {
      setSaving(false);
    }
  };
  const handleBuyNow = () => {
    addToCart(p, qty);
    navigate("/cart");
  };

  return (
    <div className="pd">
      <div className="tq-container">
        <nav className="pd-crumb" aria-label="Breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          {group && (
            <>
              <Link to={catLink(group.name)}>{group.name}</Link>
              <span>/</span>
            </>
          )}
          {(!group || group.name !== p.category) && (
            <>
              <Link to={catLink(p.category)}>{p.category}</Link>
              <span>/</span>
            </>
          )}
          <b>{p.name}</b>
        </nav>

        <section className="pd-main">
          {/* ---------- Ảnh ---------- */}
          <div className="pd-gallery">
            <div className={`pd-stage ${isFramed(p, mode) ? "framed" : ""}`}>
              {out && <span className="tq-tag tag-out">Hết hàng</span>}
              <ProductImage product={p} mode={mode} variant="full" />
            </div>
            {hasArt && hasPhoto && (
              <div className="pd-thumbs">
                <button className={mode === "art" ? "on" : ""} onClick={() => setView("art")} aria-label="Xem hình minh họa">
                  <ProductImage product={p} mode="art" framed={false} />
                  <span>Minh họa</span>
                </button>
                <button className={mode === "photo" ? "on" : ""} onClick={() => setView("photo")} aria-label="Xem ảnh thực tế">
                  <ProductImage product={p} mode="photo" framed={false} />
                  <span>Ảnh thực tế</span>
                </button>
              </div>
            )}
            {isFramed(p, mode) && (
              <button className="pd-save" onClick={handleDownload} disabled={saving}>
                {saving ? "Đang tạo ảnh..." : "⬇ Tải ảnh PNG (khung TL Quantum)"}
              </button>
            )}
            {mode === "art" && <p className="pd-note">Hình minh họa vẽ theo thông số sản phẩm, hình dáng thực tế có thể khác đôi chút.</p>}
          </div>

          {/* ---------- Thông tin ---------- */}
          <div className="pd-info">
            <span className="pd-cat">{p.category}</span>
            <h1>{p.name}</h1>

            <div className="pd-meta">
              {p.sku && <span>Mã: <b>{p.sku}</b></span>}
              {p.rating > 0 && (
                <span className="pd-rate">★ <b>{p.rating}</b>{p.reviews > 0 && <em> ({p.reviews} đánh giá)</em>}</span>
              )}
              {p.sold > 0 && <span>Đã bán <b>{p.sold}</b></span>}
            </div>

            <div className="pd-price">{formatPrice(p.price)}</div>

            <div className={`pd-stock ${out ? "bad" : "good"}`}>
              <i />
              {out ? "Tạm hết hàng" : p.stock <= 3 ? `Chỉ còn ${p.stock} sản phẩm` : `Còn hàng (${p.stock} sản phẩm)`}
            </div>

            {!out && (
              <div className="pd-qty">
                <label htmlFor="pd-qty">Số lượng</label>
                <div className="pd-stepper">
                  <button onClick={dec} disabled={qty <= 1} aria-label="Giảm">−</button>
                  <input id="pd-qty" type="number" min="1" max={p.stock} value={qty} onChange={onQty} />
                  <button onClick={inc} disabled={qty >= p.stock} aria-label="Tăng">+</button>
                </div>
                <span className="pd-total">Tạm tính: <b>{formatPrice(p.price * qty)}</b></span>
              </div>
            )}

            <div className="pd-actions">
              <button className={`pd-btn ${added ? "ok" : "ghost"}`} onClick={handleAdd} disabled={out}>
                {added ? "✔ Đã thêm vào giỏ" : "🛒 Thêm vào giỏ"}
              </button>
              <button className="pd-btn primary" onClick={handleBuyNow} disabled={out}>
                Mua ngay
              </button>
            </div>

            <ul className="pd-perks">
              <li>🚚 Giao hàng toàn quốc</li>
              <li>📞 Tư vấn chọn linh kiện: <a href="tel:0845089876">0845 089 876</a></li>
            </ul>
          </div>
        </section>

        {/* ---------- Thông số ---------- */}
        <section className="pd-card">
          <h2>Thông số</h2>
          <table className="pd-specs">
            <tbody>
              {specs.map(([k, v]) => (
                <tr key={k}>
                  <th>{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="pd-note">Thông số theo tài liệu của chip/module, lô hàng thực tế có thể khác đôi chút. Cần chắc chắn trước khi mua, hãy gọi <a href="tel:0845089876">0845 089 876</a>.</p>
        </section>

        <section className="pd-card">
          <h2>Mô tả</h2>
          <p className="pd-desc">
            {p.name} thuộc nhóm {group ? group.name.toLowerCase() : p.category.toLowerCase()}, có bán tại TL Quantum.
            Nếu chưa chắc chọn đúng loại cho mạch của mình, bạn gọi hotline <a href="tel:0845089876">0845 089 876</a> để
            được tư vấn trước khi đặt hàng.
          </p>
        </section>

        {related.length > 0 && (
          <section className="pd-related">
            <div className="hm-head">
              <h2>Sản phẩm liên quan</h2>
              <Link to={catLink(p.category)} className="hm-more">Xem thêm →</Link>
            </div>
            <div className="hm-grid">
              {related.map((r) => (
                <ProductCard key={r.id} product={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
