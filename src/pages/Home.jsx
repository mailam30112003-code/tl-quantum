import { useState, useMemo, useEffect } from "react";
import "../App.css";

import logo from "../assets/logo.jpg";
import banner from "../assets/banner.png";

import products from "../data/products";
import { useNavigate } from "react-router-dom";

function Home({ cart, setCart }) {

  /* ===========================
        STATE
  =========================== */
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] =
    useState("Tất cả sản phẩm");

  const [search, setSearch] =
    useState("");

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(window.innerWidth <= 768);
 
  const [showCart, setShowCart] = useState(false);
  const [addedId, setAddedId] = useState(null);

  /* ===========================
        WINDOW RESIZE
  =========================== */

  useEffect(() => {

    const handleResize = () => {

      setIsMobile(window.innerWidth <= 768);

      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }

    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

  /* ===========================
        CATEGORY
  =========================== */

  const categories = [
  "Tất cả sản phẩm",

  "Vi điều khiển",
    "Arduino",
    "ESP32",
    "STM32",
    "Raspberry Pi",

  "RF - Không dây",
    "LoRa",
    "Bluetooth",
    "RFID",

  "Cảm biến",

  "Hiển thị",

  "Nguồn",

  "Module",

  "Linh kiện cơ bản",
    "IC",
    "Transistor",
    "Diode",
    "Điện trở",
    "Tụ điện",
    "LED",

  "Relay & Driver",
    "Relay",
    "Motor",

  "Dụng cụ",

  "Phụ kiện",
];

  /* ===========================
        SEARCH
  =========================== */

  const normalize = (text) =>
    text
      .toLowerCase()
      .replace(/[\s-_]+/g, "");

  /* ===========================
        FILTER
  =========================== */

  const filteredProducts = useMemo(() => {

    return products.filter((p) => {

      let categoryMatch = false;

      if (selectedCategory === "Tất cả sản phẩm") {

        categoryMatch = true;

      }

      else if (selectedCategory === "Vi điều khiển") {

        categoryMatch = [

          "ESP32",

          "Arduino",

          "STM32",

          "Raspberry Pi",

        ].includes(p.category);

      }

      else {

        categoryMatch =
          p.category === selectedCategory;

      }

      if (!categoryMatch)
        return false;

      if (search.trim() === "")
        return true;

      return normalize(p.name)
        .includes(normalize(search));

    });

  }, [
    selectedCategory,
    search,
  ]);
  const addToCart = (product) => {
    setAddedId(product.id);

setTimeout(() => {
  setAddedId(null);
}, 1000);

  const exist = cart.find(
    item => item.id === product.id
  );

  if (exist) {

    setCart(

      cart.map(item =>

        item.id === product.id

          ? {
              ...item,
              quantity: item.quantity + 1,
            }

          : item

      )

    );

  } else {

    setCart([

      ...cart,

      {
        ...product,
        quantity: 1,
      },

    ]);

  }

};
  /* ===========================
        RENDER
  =========================== */

  return (
    <>

      {/* Top Bar */}

      <div className="topbar">

        <span>🚚 Giao hàng toàn quốc</span>

        <span>📞 Hotline: 0845 089 876</span>

      </div>

      {/* Header */}

      <header className="header">

        {/* Logo */}

        <div className="logo">

          <img
            src={logo}
            alt="TL Quantum"
          />

          <div className="logo-text">

            <h1>TL Quantum</h1>

            <p>
              Giải pháp linh kiện điện tử
            </p>

          </div>

        </div>

        {/* Search */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            maxWidth: 520,
          }}
        >

          <input
            className="search"
            placeholder="Tìm ESP32, STM32, Arduino..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button
            style={{
              width: 52,
              height: 42,
              border: "none",
              background: "#1950d1",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "0 6px 6px 0",
              fontSize: 18,
            }}
          >
            🔍
          </button>

        </div>

        {/* Cart */}

        <div 
          className="cart"
          onClick={() => navigate("/cart")}
          >

          🛒 Giỏ hàng ({cart.length})

        </div>

      </header>
      

      {/* Menu */}

      <nav className="menu">

        <span>TRANG CHỦ</span>

        <span>SẢN PHẨM</span>

        <span>DỰ ÁN</span>

        <span>BLOG</span>

        <span>HƯỚNG DẪN</span>

        <span>LIÊN HỆ</span>

      </nav>

      {/* Mobile Category */}

      {isMobile && (

        <div
          style={{
            padding: 12,
            background: "#fff",
            borderBottom: "1px solid #eee",
          }}
        >

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            style={{
              width: "100%",
              padding: 12,
              background: "#1950d1",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >

            ☰ Danh mục sản phẩm

          </button>

          {menuOpen && (

            <div
              style={{
                marginTop: 10,
                background: "#fff",
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid #eee",
              }}
            >

              {categories.map((item) => (

                <div
                  key={item}
                  className="category"
                  onClick={() => {

                    setSelectedCategory(item);

                    setMenuOpen(false);

                  }}
                  style={{
                    background:
                      selectedCategory === item
                        ? "#1950d1"
                        : "",

                    color:
                      selectedCategory === item
                        ? "#fff"
                        : "",
                  }}
                >

                  {item}

                </div>

              ))}

            </div>

          )}

        </div>

      )}

      {/* Layout */}

      <div className="container">
                {/* Sidebar Desktop */}

        {!isMobile && (

          <aside className="sidebar">

            <div className="sidebar-title">

              DANH MỤC SẢN PHẨM

            </div>

            {categories.map((item) => (

              <div
                key={item}
                className="category"
                onClick={() =>
                  setSelectedCategory(item)
                }
                style={{
                  background:
                    selectedCategory === item
                      ? "#1950d1"
                      : "",

                  color:
                    selectedCategory === item
                      ? "#fff"
                      : "",

                  fontWeight:
                    selectedCategory === item
                      ? "bold"
                      : "normal",
                }}
              >

                {item}

              </div>

            ))}

          </aside>

        )}

        {/* Main */}

        <main className="main">

          {/* Banner */}

          <div className="banner">

            <img
              src={banner}
              alt="TL Quantum Banner"
            />

          </div>

          {/* Title */}

          <div className="section-title">

            <div>

              {search
                ? `Kết quả tìm kiếm: "${search}"`
                : selectedCategory}

            </div>

            <span
              style={{
                fontSize: 14,
                color: "#777",
                fontWeight: "normal",
              }}
            >

              {filteredProducts.length} sản phẩm

            </span>

          </div>

          {/* Product Grid */}

          <div className="products">

            {filteredProducts.map((p) => (

              <div
                key={p.id}
                className="card"
              >

                <div className="product-image">

                  {p.image && (

                    <img
                      src={p.image}
                      alt={p.name}
                    />

                  )}

                </div>

                <div className="card-content">

                  <h3>

                    {p.name}

                  </h3>

                  <div className="price">

                    {Number(
                      p.price
                    ).toLocaleString("vi-VN")}đ

                  </div>

                  <p
                    style={{
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 8,
                    }}
                  >

                    Danh mục: {p.category}

                  </p>

                  <p
                    style={{
                      fontSize: 12,
                      color:
                        p.stock > 0
                          ? "green"
                          : "red",
                      marginBottom: 10,
                      fontWeight: "bold",
                    }}
                  >

                    {p.stock > 0
                      ? `Còn ${p.stock} sản phẩm`
                      : "Hết hàng"}

                  </p>

                  <button
                    className={`buy-btn ${
                        addedId === p.id ? "added" : ""
                    }`}
                    onClick={() => addToCart(p)}
                    >

                    {addedId === p.id
                        ? "✔ Đã thêm"
                        : "🛒 Thêm vào giỏ"}

                    </button>

                </div>

              </div>

            ))}
                      </div>
        </main>
      </div>

      {/* Bottom Navigation Mobile */}

      {isMobile && (

        <div
          className="bottom-nav"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 60,
            background: "#fff",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            borderTop: "1px solid #ddd",
            boxShadow: "0 -2px 10px rgba(0,0,0,.08)",
            zIndex: 999,
          }}
        >

          <div
            style={{
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 22 }}>
              🏠
            </div>

            <small>Trang chủ</small>

          </div>

          <div
            style={{
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >

            <div style={{ fontSize: 22 }}>
              🔍
            </div>

            <small>Tìm kiếm</small>

          </div>

          <div
            style={{
              textAlign: "center",
              cursor: "pointer",
            }}
          >

            <div style={{ fontSize: 22 }}>
              🛒
            </div>

            <small>Giỏ hàng</small>

          </div>

          <div
            style={{
              textAlign: "center",
              cursor: "pointer",
            }}
          >

            <div style={{ fontSize: 22 }}>
              👤
            </div>

            <small>Tài khoản</small>

          </div>

        </div>

      )}

    </>
  );

}

export default Home;