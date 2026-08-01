import { useMemo, useState } from "react";
import "./App.css";
import logo from "./assets/logo.jpg";
import banner from "./assets/banner.png";
import products from "./data/products";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả sản phẩm");
  const [search, setSearch] = useState("");

  const categories = [
    "Tất cả sản phẩm",
    "Vi điều khiển",
    "Arduino",
    "ESP32",
    "STM32",
    "Raspberry Pi",
    "LoRa",
    "Bluetooth",
    "RFID",
    "Cảm biến",
    "Hiển thị",
    "Nguồn",
    "Module",
    "Relay",
    "Motor",
    "IC",
    "Transistor",
    "Diode",
    "Tụ điện",
    "LED",
    "Dụng cụ",
    "Phụ kiện",
  ];

  const normalize = (text) =>
    text.toLowerCase().replace(/[\s-_]+/g, "");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      let categoryMatch = false;

      if (selectedCategory === "Tất cả sản phẩm") {
        categoryMatch = true;
      } else if (selectedCategory === "Vi điều khiển") {
        categoryMatch = [
          "ESP32",
          "Arduino",
          "STM32",
          "Raspberry Pi",
        ].includes(p.category);
      } else {
        categoryMatch = p.category === selectedCategory;
      }

      if (!categoryMatch) return false;

      if (search.trim() === "") return true;

      return normalize(p.name).includes(normalize(search));
    });
  }, [selectedCategory, search]);

  return (
    <>
      <div className="topbar">
        <span>🚚 Giao hàng toàn quốc</span>
        <span>📞 0845 089 876</span>
      </div>

      <div className="header">
        <div className="logo">
          <img src={logo} alt="TL Quantum" />

          <div className="logo-text">
            <h1>TL Quantum</h1>
            <p>Linh kiện & Giải pháp điện tử</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            className="search"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              borderRadius: "6px 0 0 6px",
            }}
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

        <div className="cart">
          🛒 Giỏ hàng
        </div>
      </div>

      <div className="menu">
        <span>TRANG CHỦ</span>
        <span>SẢN PHẨM</span>
        <span>DỰ ÁN</span>
        <span>BLOG</span>
        <span>HƯỚNG DẪN</span>
        <span>LIÊN HỆ</span>
      </div>

      <div className="container">
        <div className="sidebar">
          <div className="sidebar-title">
            DANH MỤC SẢN PHẨM
          </div>
                    {categories.map((item, index) => (
            <div
              key={index}
              className="category"
              onClick={() => setSelectedCategory(item)}
              style={{
                cursor: "pointer",
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
        </div>

        <div className="main">
          <div className="banner">
            <img
              src={banner}
              alt="TL Quantum Banner"
            />
          </div>

          <div className="section-title">
            {search
              ? `Kết quả tìm kiếm: "${search}"`
              : selectedCategory}

            <span
              style={{
                float: "right",
                fontSize: "14px",
                color: "#777",
                fontWeight: "normal",
              }}
            >
              {filteredProducts.length} sản phẩm
            </span>
          </div>

          <div className="products">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="card"
              >
                <div className="product-image">
                </div>

                <div className="card-content">
                  <h3>{p.name}</h3>

                  <div className="price">
                    {Number(
                      p.price
                    ).toLocaleString(
                      "vi-VN"
                    )}
                    đ
                  </div>

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginBottom: "8px",
                    }}
                  >
                    Danh mục: {p.category}
                  </p>

                  <p
                    style={{
                      fontSize: "12px",
                      color:
                        p.stock > 0
                          ? "green"
                          : "red",
                      marginBottom: "10px",
                    }}
                  >
                    {p.stock > 0
                      ? `Còn ${p.stock} sản phẩm`
                      : "Hết hàng"}
                  </p>

                  <button className="buy-btn">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
          </>
  );
}

export default App;