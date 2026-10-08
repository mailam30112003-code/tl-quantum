import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Layout.css";

// Thanh điều hướng đáy, chỉ hiện trên mobile (xử lý bằng CSS, không cần JS resize).
export default function MobileNav() {
  const { count } = useCart();
  const item = ({ isActive }) => "tq-mnav-item" + (isActive ? " active" : "");

  return (
    <nav className="tq-mnav" aria-label="Điều hướng nhanh">
      <NavLink to="/" end className={item}>
        <span>🏠</span>
        <small>Trang chủ</small>
      </NavLink>
      <NavLink to="/products" className={item}>
        <span>📦</span>
        <small>Sản phẩm</small>
      </NavLink>
      <NavLink to="/cart" className={item}>
        <span className="tq-mnav-cart">
          🛒
          {count > 0 && <i>{count > 99 ? "99+" : count}</i>}
        </span>
        <small>Giỏ hàng</small>
      </NavLink>
      <NavLink to="/contact" className={item}>
        <span>💬</span>
        <small>Liên hệ</small>
      </NavLink>
    </nav>
  );
}
