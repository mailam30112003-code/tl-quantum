import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider, useCart } from "./context/CartContext";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Guide from "./pages/Guide";ụ
import Contact from "./pages/Contact";

// Cart và Checkout hiện vẫn nhận props `cart` / `setCart`,
// nên lấy từ Context truyền xuống để không phải sửa hai file đó.
function CartPage() {
  const { cart, setCart } = useCart();
  return <Cart cart={cart} setCart={setCart} />;
}

function CheckoutPage() {
  const { cart, setCart } = useCart();
  return <Checkout cart={cart} setCart={setCart} />;
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
