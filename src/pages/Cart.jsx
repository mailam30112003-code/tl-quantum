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

        <div className="cart-header">

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            ← Tiếp tục mua
          </button>

          <h1>🛒 Giỏ hàng</h1>

        </div>

        {cart.length === 0 ? (

          <div className="cart-empty">

            <h2>🛒 Giỏ hàng đang trống</h2>

            <p>
              Hãy thêm sản phẩm vào giỏ hàng của bạn.
            </p>

            <button
              className="continue-btn"
              onClick={() => navigate("/")}
            >
              Mua sắm ngay
            </button>

          </div>

        ) : (

          <div className="cart-layout">

            <div className="cart-list">

              {cart.map((item) => (

                <div
                  className="cart-card"
                  key={item.id}
                >

                  <div className="cart-left">

                    <div className="cart-image">

                      {item.image ? (

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                      ) : (

                        <div className="no-image">
                          📦
                        </div>

                      )}

                    </div>

                    <div className="cart-info">

                      <h3>{item.name}</h3>

                      <p>
                        SKU : {item.sku}
                      </p>

                      <div className="cart-price">

                        {item.price.toLocaleString(
                          "vi-VN"
                        )}đ

                      </div>

                    </div>

                  </div>

                  <div className="cart-right">

                    <div className="quantity-box">

                      <button
                        onClick={() =>
                          decrease(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increase(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                    <div className="line-total">

                      {(item.price *
                        item.quantity).toLocaleString(
                        "vi-VN"
                      )}
                      đ

                    </div>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      🗑 Xóa
                    </button>

                  </div>

                </div>

              ))}

            </div>
                        <div className="cart-summary">

              <h2>Tóm tắt đơn hàng</h2>

              <div className="summary-row">

                <span>Tạm tính</span>

                <b>
                  {total.toLocaleString("vi-VN")}đ
                </b>

              </div>

              <div className="summary-row">

                <span>Phí vận chuyển</span>

                git add .

              </div>

              <div className="summary-row">

                <span>Voucher</span>

                <button className="voucher-btn">
                  Chọn mã giảm giá
                </button>

              </div>

              <hr />

              <div className="summary-total">

                <span>Tổng thanh toán</span>

                <b>
                  {(total + 0).toLocaleString("vi-VN")}đ
                </b>

              </div>

              <button className="checkout-btn">

                Thanh toán ngay

              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default Cart;