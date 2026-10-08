import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useCart } from "../context/CartContext";
import "./Layout.css";

const links = [
  { to: "/", label: "Trang chủ", end: true },
  { to: "/products", label: "Sản phẩm" },
  { to: "/projects", label: "Dự án" },
  { to: "/blog", label: "Blog" },
  { to: "/guide", label: "Hướng dẫn" },
  { to: "/contact", label: "Liên hệ" },
];

export default function Header() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { count } = useCart();
  const [q, setQ] = useState(params.get("q") || "");

  // Giữ ô tìm kiếm khớp với URL (ví dụ khi bấm Back)
  useEffect(() => {
    setQ(params.get("q") || "");
  }, [params]);

  const submit = (e) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/?q=${encodeURIComponent(term)}#catalog` : "/");
  };

  return (
    <header className="tq-header">
      <div className="tq-topbar">
        <div className="tq-container tq-topbar-inner">
          <span>🚚 Giao hàng toàn quốc</span>
          <a href="tel:0845089876">📞 Hotline: 0845 089 876</a>
        </div>
      </div>

      <div className="tq-mainbar">
        <div className="tq-container tq-mainbar-inner">
          <Link to="/" className="tq-logo" aria-label="TL Quantum - Trang chủ">
            <img src={logo} alt="" />
            <span className="tq-logo-text">
              <strong>TL Quantum</strong>
              <small>Giải pháp linh kiện điện tử</small>
            </span>
          </Link>

          <form className="tq-search" onSubmit={submit} role="search">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm ESP32, STM32, Arduino, cảm biến..."
              aria-label="Tìm kiếm sản phẩm"
            />
            <button type="submit" aria-label="Tìm kiếm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </form>

          <Link to="/cart" className="tq-cart-btn" aria-label={`Giỏ hàng, ${count} sản phẩm`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.1a2 2 0 0 0 2-1.5L21.5 8H6" />
            </svg>
            <span className="tq-cart-label">Giỏ hàng</span>
            {count > 0 && <span className="tq-badge">{count > 99 ? "99+" : count}</span>}
          </Link>
        </div>
      </div>

      <nav className="tq-nav" aria-label="Menu chính">
        <div className="tq-container tq-nav-inner">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? "active" : "")}>
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
