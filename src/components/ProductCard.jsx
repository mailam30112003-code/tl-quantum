import { memo, useState } from "react";
import { Link } from "react-router-dom";
import ProductImage, { isFramed } from "./ProductImage";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const formatPrice = (n) => Number(n).toLocaleString("vi-VN") + "đ";

// Chỉ hiển thị khi sản phẩm có dữ liệu thật (p.sold, p.rating, p.reviews).
// Không có dữ liệu thì để trống, nhưng vẫn giữ chiều cao hàng để các thẻ thẳng hàng.
function Stars({ value }) {
  return (
    <span className="tq-stars" aria-label={`${value} trên 5 sao`}>
      <span className="tq-stars-bg">★★★★★</span>
      <span className="tq-stars-fg" style={{ width: `${(value / 5) * 100}%` }}>★★★★★</span>
    </span>
  );
}

function ProductCard({ product: p }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const out = p.stock <= 0;
  const low = !out && p.stock <= 3;

  const handleAdd = () => {
    if (addToCart(p)) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    }
  };

  return (
    <article className={`tq-card ${out ? "is-out" : ""}`}>
      <div className={`tq-card-img ${isFramed(p) ? "framed" : ""}`}>
        {out && <span className="tq-tag tag-out">Hết hàng</span>}
        {low && <span className="tq-tag tag-low">Chỉ còn {p.stock}</span>}
        <Link to={`/product/${p.id}`} className="tq-card-imglink" aria-label={`Xem ${p.name}`}>
          <ProductImage product={p} />
        </Link>
      </div>

      <div className="tq-card-body">
        <span className="tq-card-cat">{p.category}</span>
        <h3 title={p.name}><Link to={`/product/${p.id}`}>{p.name}</Link></h3>

        <div className="tq-card-meta">
          {p.rating > 0 && (
            <span className="tq-rate">
              <Stars value={p.rating} />
              {p.reviews > 0 && <em>({p.reviews})</em>}
            </span>
          )}
          {p.sold > 0 && <span className="tq-sold">Đã bán {p.sold}</span>}
        </div>

        <div className="tq-card-price">{formatPrice(p.price)}</div>

        <button
          className={`tq-card-btn ${added ? "added" : ""}`}
          onClick={handleAdd}
          disabled={out}
        >
          {out ? "Hết hàng" : added ? "✔ Đã thêm vào giỏ" : "🛒 Thêm vào giỏ"}
        </button>
      </div>
    </article>
  );
}

export default memo(ProductCard);
