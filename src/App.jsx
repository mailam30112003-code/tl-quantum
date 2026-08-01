import { useMemo, useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/logo.jpg";
import banner from "./assets/banner.png";
import products from "./data/products";

function App() {

  /* ===========================
      STATE
  =========================== */

  const [selectedCategory, setSelectedCategory] =
    useState("Tất cả sản phẩm");

  const [search, setSearch] =
    useState("");

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(window.innerWidth <= 768);

  /* ===========================
      WINDOW RESIZE
  =========================== */

  useEffect(() => {

    const handleResize = () => {

      setIsMobile(window.innerWidth <= 768);

      if(window.innerWidth > 768){

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

  const filteredProducts =
    useMemo(() => {

      return products.filter((p) => {

        let categoryMatch = false;

        if (
          selectedCategory ===
          "Tất cả sản phẩm"
        ) {

          categoryMatch = true;

        }

        else if (
          selectedCategory ===
          "Vi điều khiển"
        ) {

          categoryMatch = [

            "ESP32",

            "Arduino",

            "STM32",

            "Raspberry Pi",

          ].includes(p.category);

        }

        else {

          categoryMatch =
            p.category ===
            selectedCategory;

        }

        if (!categoryMatch)
          return false;

        if (
          search.trim() === ""
        )
          return true;

        return normalize(
          p.name
        ).includes(
          normalize(search)
        );

      });

    }, [
      selectedCategory,
      search,
    ]);
    return (
<>
  <div className="topbar">
    <span>🚚 Giao hàng toàn quốc</span>
    <span>📞 Hotline: 0845 089 876</span>
  </div>

  <header className="header">

    <div className="logo">

      <img src={logo} alt="TL Quantum" />

      <div className="logo-text">
        <h1>TL Quantum</h1>
        <p>Giải pháp linh kiện điện tử</p>
      </div>

    </div>

    <div>

      <input
        className="search"
        placeholder="Tìm ESP32, STM32, Arduino..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      <button>
        🔍
      </button>

    </div>

    <div className="cart">
      🛒 Giỏ hàng
    </div>

  </header>

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
        padding:"12px",
        background:"#fff",
        borderBottom:"1px solid #eee",
      }}
    >

      <button
        onClick={()=>setMenuOpen(!menuOpen)}
        style={{
          width:"100%",
          background:"#1950d1",
          color:"#fff",
          border:"none",
          borderRadius:"8px",
          padding:"12px",
          fontSize:"16px",
          fontWeight:"bold",
        }}
      >
        ☰ Danh mục sản phẩm
      </button>

      {menuOpen && (

        <div
          style={{
            marginTop:"10px",
            border:"1px solid #eee",
            borderRadius:"8px",
            overflow:"hidden",
            background:"#fff",
          }}
        >

          {categories.map((item,index)=>(

            <div
              key={index}
              className="category"
              onClick={()=>{
                setSelectedCategory(item);
                setMenuOpen(false);
              }}
              style={{
                background:
                  selectedCategory===item
                  ?"#1950d1"
                  :"",

                color:
                  selectedCategory===item
                  ?"white"
                  :"",
              }}
            >

              {item}

            </div>

          ))}

        </div>

      )}

    </div>

  )}

  <div className="container">
    <div className="container">

  {/* Sidebar chỉ hiện trên Desktop */}

  {!isMobile && (

    <aside className="sidebar">

      <div className="sidebar-title">
        DANH MỤC SẢN PHẨM
      </div>

      {categories.map((item,index)=>(

        <div
          key={index}
          className="category"
          onClick={()=>{
            setSelectedCategory(item);
          }}
          style={{
            background:
              selectedCategory===item
              ?"#1950d1"
              :"",

            color:
              selectedCategory===item
              ?"white"
              :"",

            fontWeight:
              selectedCategory===item
              ?"bold"
              :"normal",
          }}
        >

          {item}

        </div>

      ))}

    </aside>

  )}

  {/* Main */}

  <main className="main">

    <div className="banner">

      <img
        src={banner}
        alt="Banner"
      />

    </div>

    <div className="section-title">

      <div>

        {search
          ? `Kết quả: "${search}"`
          : selectedCategory}

      </div>

      <span>

        {filteredProducts.length} sản phẩm

      </span>

    </div>

    <div className="products">

      {filteredProducts.map((p)=>(

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

              {Number(p.price).toLocaleString("vi-VN")}đ

            </div>

            <p
              style={{
                fontSize:12,
                color:"#666",
                marginBottom:8,
              }}
            >

              Danh mục: {p.category}

            </p>

            <p
              style={{
                fontSize:12,
                color:
                  p.stock>0
                  ?"green"
                  :"red",
                marginBottom:10,
                fontWeight:"bold",
              }}
            >

              {p.stock>0
                ?`Còn ${p.stock} sản phẩm`
                :"Hết hàng"}

            </p>

            <button className="buy-btn">

              Thêm vào giỏ

            </button>

          </div>

        </div>

      ))}

    </div>

  </main>

</div>
      {/* Bottom Navigation chỉ hiện trên Mobile */}

      {isMobile && (
        <div
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
            zIndex: 9999,
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 22 }}>🏠</div>
            Trang chủ
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: 12,
              cursor: "pointer",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div style={{ fontSize: 22 }}>🔍</div>
            Tìm kiếm
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 22 }}>🛒</div>
            Giỏ hàng
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 22 }}>👤</div>
            Tài khoản
          </div>
        </div>
      )}
    </>
  );
}

export default App;