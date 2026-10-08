import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import products from "../data/products";

const CartContext = createContext(null);
const STORAGE_KEY = "tlq_cart_v1";

// Chỉ lưu {id, quantity}; thông tin sản phẩm (ảnh, giá...) luôn lấy lại từ products.js
// để tránh hỏng đường dẫn ảnh sau mỗi lần build.
const byId = new Map(products.map((p) => [p.id, p]));

function loadLines() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return raw.filter((l) => byId.has(l.id) && l.quantity > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadLines);
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* bỏ qua nếu trình duyệt chặn localStorage */
    }
  }, [lines]);

  // `cart` giữ đúng định dạng cũ (mảng sản phẩm + quantity) để Cart.jsx / Checkout.jsx dùng tiếp.
  const cart = useMemo(
    () => lines.map((l) => ({ ...byId.get(l.id), quantity: l.quantity })),
    [lines]
  );

  // Tương thích với code cũ: setCart(mảng) hoặc setCart(fn)
  const setCart = useCallback((next) => {
    setLines((prev) => {
      const prevCart = prev.map((l) => ({ ...byId.get(l.id), quantity: l.quantity }));
      const value = typeof next === "function" ? next(prevCart) : next;
      return value
        .filter((i) => byId.has(i.id) && i.quantity > 0)
        .map((i) => ({ id: i.id, quantity: i.quantity }));
    });
  }, []);

  const showToast = useCallback((payload) => {
    clearTimeout(timer.current);
    setToast({ ...payload, key: Date.now() });
    timer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const addToCart = useCallback(
    (product, qty = 1) => {
      if (!product || product.stock <= 0) return false;
      let capped = false;
      setLines((prev) => {
        const found = prev.find((l) => l.id === product.id);
        const current = found ? found.quantity : 0;
        const nextQty = Math.min(current + qty, product.stock);
        capped = nextQty === current;
        if (capped) return prev;
        return found
          ? prev.map((l) => (l.id === product.id ? { ...l, quantity: nextQty } : l))
          : [...prev, { id: product.id, quantity: nextQty }];
      });
      showToast(
        capped
          ? { type: "warn", product, message: "Đã đạt số lượng tối đa trong kho" }
          : { type: "ok", product, message: "Đã thêm vào giỏ hàng" }
      );
      return !capped;
    },
    [showToast]
  );

  const updateQty = useCallback((id, quantity) => {
    const max = byId.get(id)?.stock ?? 1;
    setLines((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, quantity: Math.min(quantity, max) } : l))
        .filter((l) => l.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback(
    (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
    []
  );

  const clearCart = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((s, l) => s + l.quantity, 0), [lines]);
  const total = useMemo(
    () => cart.reduce((s, i) => s + Number(i.price) * i.quantity, 0),
    [cart]
  );

  const value = {
    cart,
    setCart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    count,
    total,
    toast,
    dismissToast: () => setToast(null),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart phải được dùng bên trong <CartProvider>");
  return ctx;
}
