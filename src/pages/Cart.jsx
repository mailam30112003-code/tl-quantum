import { useNavigate } from "react-router-dom";
import "../Cart.css";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const increase = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrease = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">🛒 Giỏ hàng</h1>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <h2>Giỏ hàng đang trống</h2>

            <button
              className="continue-btn"
              onClick={() => navigate("/")}
            >
              Tiếp tục mua hàng
            </button>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-card" key={item.id}>
                  <div className="cart-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="cart-info">
                    <h3>{item.name}</h3>

                    <p>SKU: {item.sku}</p>

                    <div className="cart-price">
                      {item.price.toLocaleString("vi-VN")}đ
                    </div>
                  </div>

                  <div className="cart-action">
                    <div className="quantity-box">
                      <button
                        onClick={() => decrease(item.id)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increase(item.id)}
                      >
                        +
                      </button>
                    </div>

                    <div className="line-total">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Tạm tính</span>

                <b>
                  {total.toLocaleString("vi-VN")}đ
                </b>
              </div>

              <div className="summary-row">
                <span>Phí vận chuyển</span>

                <b>30.000đ</b>
              </div>

              <hr />

              <div className="summary-total">
                <span>Tổng thanh toán</span>

                <b>
                  {(total + 30000).toLocaleString("vi-VN")}đ
                </b>
              </div>

              <div className="cart-buttons">
                <button
                  className="continue-btn"
                  onClick={() => navigate("/")}
                >
                  ← Tiếp tục mua
                </button>

                <button className="checkout-btn">
                  Thanh toán
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;