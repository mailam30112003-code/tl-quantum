import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Guide from "./pages/Guide";
import Contact from "./pages/Contact";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
              <Checkout
                  cart={cart}
                  setCart={setCart}
              />
          }
      />
      <Route
        path="/products"
        element={<Products />}
      />

      <Route
        path="/projects"
        element={<Projects />}
      />

      <Route
        path="/blog"
        element={<Blog />}
      />

      <Route
        path="/guide"
        element={<Guide />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;