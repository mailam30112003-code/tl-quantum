import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Layout.css";

// Thông báo nhỏ góc màn hình, thay cho popup che toàn trang.
export default function Toast() {
  const { toast, dismissToast } = useCart();
  const navigate = useNavigate();
  if (!toast) return null;

  const { product, message, type, key } = toast;
  return (
    <div className={`tq-toast ${type}`} key={key} role="status" aria-live="polite">
      {product.image ? <img src={product.image} alt="" /> : <span className="tq-toast-ph">📦</span>}
      <div className="tq-toast-body">
        <b>{type === "ok" ? "✔ " : "⚠ "}{message}</b>
        <span>{product.name}</span>
      </div>
      <button
        className="tq-toast-go"
        onClick={() => {
          dismissToast();
          navigate("/cart");
        }}
      >
        Xem giỏ
      </button>
      <button className="tq-toast-x" onClick={dismissToast} aria-label="Đóng">
        ×
      </button>
    </div>
  );
}
