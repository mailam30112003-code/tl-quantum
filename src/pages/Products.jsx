import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import "../Products.css";

import products from "../data/products";

function Products() {

    const navigate = useNavigate();

    const [category, setCategory] =
        useState("Tất cả");

    const categories = [

        "Tất cả",

        "ESP32",

        "STM32",

        "Arduino",

        "Raspberry Pi",

        "LoRa",

        "Bluetooth",

        "Cảm biến",

        "Hiển thị",

        "Nguồn",

        "Module",

        "Linh kiện cơ bản",

        "Relay",

        "Motor",

        "Dụng cụ",

        "Phụ kiện"

    ];

    const filteredProducts = useMemo(() => {

        if (category === "Tất cả")
            return products;

        return products.filter(
            p => p.category === category
        );

    }, [category]);

    return (

        <div className="products-page">

            {/* Header */}

            <div className="products-top">

                <button
                    onClick={() => navigate("/")}
                >
                    ← Trang chủ
                </button>

                <h1>Sản phẩm</h1>

            </div>

            <div className="products-layout">

                {/* Sidebar */}

                <aside className="products-sidebar">

                    <h3>Danh mục</h3>

                    {
                        categories.map(item => (

                            <div

                                key={item}

                                className={
                                    category === item
                                    ? "sidebar-item active"
                                    : "sidebar-item"
                                }

                                onClick={() =>
                                    setCategory(item)
                                }

                            >

                                {item}

                            </div>

                        ))
                    }

                </aside>

                {/* Product */}

                <div className="products-grid">

                    {
                        filteredProducts.map(product => (

                            <div
                                key={product.id}
                                className="product-card"
                            >

                                <img
                                    src={product.image}
                                    alt={product.name}
                                />

                                <h4>

                                    {product.name}

                                </h4>

                                <p>

                                    {product.price.toLocaleString("vi-VN")}đ

                                </p>

                                <button>

                                    🛒 Thêm vào giỏ

                                </button>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default Products;